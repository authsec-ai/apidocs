import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Multi-Tenant User Management',
    image: '🔐',
    description: (
      <>
        Complete user lifecycle management with multi-tenant isolation, RBAC permissions,
        and comprehensive admin controls. Manage both admin and end users seamlessly.
      </>
    ),
  },
  {
    title: 'Advanced Authentication',
    image: '🛡️',
    description: (
      <>
        Secure authentication flows with JWT tokens, refresh tokens, password reset,
        and OTP verification. Built-in support for modern auth standards.
      </>
    ),
  },
  {
    title: 'Multi-Factor Authentication',
    image: '🔑',
    description: (
      <>
        Enhanced security with TOTP, WebAuthn, and CIBA authentication methods.
        Flexible MFA options to protect your users and applications.
      </>
    ),
  },
  {
    title: 'Directory Synchronization',
    image: '🔄',
    description: (
      <>
        Seamlessly sync with Active Directory and Microsoft Entra ID.
        Automate user provisioning and maintain directory consistency.
      </>
    ),
  },
  {
    title: 'RESTful API Design',
    image: '⚡',
    description: (
      <>
        Clean, intuitive REST API with comprehensive documentation.
        Fast, reliable, and built for modern applications.
      </>
    ),
  },
  {
    title: 'Developer-Friendly',
    image: '💻',
    description: (
      <>
        Detailed API documentation, code examples, and interactive testing.
        Everything you need to integrate quickly and efficiently.
      </>
    ),
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <span className={styles.iconEmoji}>{image}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
