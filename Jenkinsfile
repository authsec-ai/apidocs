pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/authsec-ai/apidocs.git'
        GITHUB_BRANCH = 'main'
        DOCKER_REGISTRY = 'docker-repo.authsec.ai'
        DOCKER_REGISTRY_CREDENTIALS = credentials('authsec-repo')
        DOCKER_IMAGE = 'docker-repo.authsec.ai/apidocs:latest'
        AZURE_CLIENT_ID = credentials('clientid')
        AZURE_CLIENT_SECRET = credentials('secretid')
        AZURE_TENANT_ID = credentials('tenantid')
        AZURE_SUBSCRIPTION_ID = credentials('subscriptionIdauthsec')
        AKS_CLUSTER = 'authsec'
        RESOURCE_GROUP = 'Authnull'
        K8S_NAMESPACE = 'authsec-prod'        
        //GITHUB_TOKEN = credentials('github-token')
    }

    triggers {
        githubPush()
    }
    
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '10', daysToKeepStr: '', numToKeepStr: '10')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                // Force authenticated remote to avoid anonymous fetches
                //sh 'git remote set-url origin https://oauth2:${GITHUB_TOKEN}@github.com/authsec-ai/user-flow.git || true'
            }
        }
        
        stage('OSV Scanner - Source Code') {
            steps {
                script {
                    // Use returnStatus to continue even if vulnerabilities found
                    def scanExit = sh(
                        script: 'osv-scanner scan --recursive --output osv-source-scan.json .',
                        returnStatus: true
                    )
                    
                    if (scanExit != 0) {
                        echo "⚠️  OSV Scanner found vulnerabilities in source code (exit code: ${scanExit})"
                        echo "Continuing pipeline to evaluate severity..."
                    } else {
                        echo "✅ No vulnerabilities found in source code"
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                        --build-arg VITE_API_URL=https://apidocs.authsec.ai \
                        --build-arg VITE_APP_NAME="AuthSec Enterprise IAM" \
                        -t ${DOCKER_IMAGE} .
                '''
            }
        }
        
        stage('OSV Scanner - Docker Image') {
            steps {
                script {
                    // Use returnStatus to continue even if vulnerabilities found
                    def scanExit = sh(
                        script: "osv-scanner scan image ${DOCKER_IMAGE} --output osv-docker-scan.json",
                        returnStatus: true
                    )
                    
                    if (scanExit != 0) {
                        echo "⚠️  OSV Scanner found vulnerabilities in Docker image (exit code: ${scanExit})"
                        echo "Continuing to evaluate severity in next stage..."
                    } else {
                        echo "✅ No vulnerabilities found in Docker image"
                    }
                }
            }
        }
        
        stage('Vulnerability Quality Gate') {
            steps {
                script {
                    def sourceCriticalCount = 0
                    def sourceHighCount = 0
                    def dockerCriticalCount = 0
                    def dockerHighCount = 0
                    
                    // Check source code scan results
                    if (fileExists('osv-source-scan.json')) {
                        def sourceJsonContent = readFile('osv-source-scan.json')
                        sourceCriticalCount = sourceJsonContent.count('"severity":"CRITICAL"')
                        sourceHighCount = sourceJsonContent.count('"severity":"HIGH"')
                    }
                    
                    // Check Docker image scan results
                    if (fileExists('osv-docker-scan.json')) {
                        def dockerJsonContent = readFile('osv-docker-scan.json')
                        dockerCriticalCount = dockerJsonContent.count('"severity":"CRITICAL"')
                        dockerHighCount = dockerJsonContent.count('"severity":"HIGH"')
                    }
                    
                    def totalCritical = sourceCriticalCount + dockerCriticalCount
                    def totalHigh = sourceHighCount + dockerHighCount
                    
                    echo "=== VULNERABILITY SUMMARY ==="
                    echo "SOURCE CODE:"
                    echo "  Critical: ${sourceCriticalCount}, High: ${sourceHighCount}"
                    echo "DOCKER IMAGE:"
                    echo "  Critical: ${dockerCriticalCount}, High: ${dockerHighCount}"
                    echo "TOTAL:"
                    echo "  Critical: ${totalCritical}, High: ${totalHigh}"
                    
                    // Quality gates - only fail on critical vulnerabilities
                    if (totalCritical > 0) {
                        error "❌ BUILD FAILED: ${totalCritical} CRITICAL vulnerabilities found. Fix before deployment."
                    }
                    
                    if (totalHigh > 0) {
                        currentBuild.result = 'UNSTABLE'
                        echo "⚠️  WARNING: ${totalHigh} HIGH severity vulnerabilities found"
                        echo "Build marked as UNSTABLE but continuing deployment..."
                    }
                    
                    if (totalCritical == 0 && totalHigh == 0) {
                        echo "✅ No critical or high vulnerabilities found. Build can proceed."
                    }
                    
                    currentBuild.description = "Vulns: C${totalCritical} H${totalHigh}"
                }
            }
        }
        
        stage('Login to Docker Artifactory') {
            steps {
                sh 'echo ${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login ${DOCKER_REGISTRY} -u ${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                sh 'docker push ${DOCKER_IMAGE}'
            }
        }
        
        stage('Logout from Docker Artifactory') {
            steps {
                sh 'docker logout ${DOCKER_REGISTRY}'
            }
        }

        stage('Remove Docker Image') {
            steps {
                sh 'docker rmi ${DOCKER_IMAGE}'
            }
        }
        
        stage('Authenticate to AKS') {
             steps {
                sh '''
                    az login --service-principal -u "$AZURE_CLIENT_ID" -p "$AZURE_CLIENT_SECRET" --tenant "$AZURE_TENANT_ID"
                    az account set --subscription "$AZURE_SUBSCRIPTION_ID"
                    az aks get-credentials --resource-group "$RESOURCE_GROUP" --admin --name "$AKS_CLUSTER"
                '''
            }
        }
        
        stage('Delete Existing Pods') {
            steps {
                sh 'kubectl delete pods -l app=dev-ui -n ${K8S_NAMESPACE} --ignore-not-found' 
            }
        }
    }
    
    post {
        always {
            // Archive security scan reports
            archiveArtifacts artifacts: 'osv-*.json', fingerprint: true
            
            // Generate readable summary
            sh '''
                echo "=== OSV Security Scan Report ===" > security-summary.txt
                echo "Scan completed: $(date)" >> security-summary.txt
                echo "Project: hydra-service" >> security-summary.txt
                echo "Docker Image: ${DOCKER_IMAGE}" >> security-summary.txt
                echo "--------------------------------" >> security-summary.txt
                
                if [ -f "osv-source-scan.json" ]; then
                    SRC_CRITICAL=$(grep -o '"severity":"CRITICAL"' osv-source-scan.json | wc -l)
                    SRC_HIGH=$(grep -o '"severity":"HIGH"' osv-source-scan.json | wc -l)
                    echo "Source Code Vulnerabilities:" >> security-summary.txt
                    echo "  Critical: $SRC_CRITICAL" >> security-summary.txt
                    echo "  High: $SRC_HIGH" >> security-summary.txt
                fi
                
                if [ -f "osv-docker-scan.json" ]; then
                    DOCKER_CRITICAL=$(grep -o '"severity":"CRITICAL"' osv-docker-scan.json | wc -l)
                    DOCKER_HIGH=$(grep -o '"severity":"HIGH"' osv-docker-scan.json | wc -l)
                    echo "Docker Image Vulnerabilities:" >> security-summary.txt
                    echo "  Critical: $DOCKER_CRITICAL" >> security-summary.txt
                    echo "  High: $DOCKER_HIGH" >> security-summary.txt
                fi
            '''
            archiveArtifacts artifacts: 'security-summary.txt', fingerprint: true
        }
        
        success {
            echo "✅ Build completed successfully"
        }
        
        failure {
            echo "❌ Build failed due to critical security vulnerabilities"
        }
        
        unstable {
            echo "⚠️  Build unstable - high vulnerabilities detected"
        }
    }
}
