import React from 'react';
import styles from './styles.module.css';

const footerLinks = {
  Product: [
    { label: "OAuth 2.1", href: "/coming-soon" },
    { label: "mTLS", href: "/coming-soon" },
    { label: "External Secrets", href: "/coming-soon" },
    { label: "MFA", href: "/coming-soon" }
  ],
  Developers: [
    { label: "Documentation", href: "https://authsec.ai/docs" },
    { label: "API Reference", href: "https://apidocs.authsec.ai/" },
    { label: "SDKs", href: "https://docs.authsec.dev/sdk/" },
    { label: "Changelog", href: "https://authsec.ai/changelog" },
  ],
  Company: [
    { label: "About", href: "https://authsec.ai/about" },
    { label: "Blog", href: "https://authsec.ai/blogs" },
    { label: "Contact", href: "https://authsec.ai/contact" }
  ],
  'Why Authsec': [
    { label: "Authsec Vs WorkOS", href: "https://authsec.ai/compare/authsec-vs-workos" },
    { label: "Authsec Vs Stytch", href: "https://authsec.ai/compare/authsec-vs-stytch" },
    { label: "Authsec Vs Auth0", href: "https://authsec.ai/compare/authsec-vs-auth0" },
  ],
};

const socialIcons = [
  {
    label: "X",
    href: "https://x.com/Authsec_AI",
    path: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    label: "GitHub",
    href: "/coming-soon",
    path: (
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "/coming-soon",
    path: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main footer content */}
        <div className={styles.mainContent}>
          {/* Logo + tagline + social */}
          <div className={styles.brandSection}>
            <a href="https://authsec.ai" target="_blank" rel="noopener noreferrer" className={styles.logoWrapper}>
              <img
                src="/img/logo.png"
                alt="AuthSec"
                className={styles.logo}
              />
              <span className={styles.brandName}>AuthSec</span>
            </a>
            <p className={styles.tagline}>
              Enterprise-grade authentication and authorization for AI agents and autonomous
              workloads.
            </p>
            <div className={styles.socialIcons}>
              {socialIcons.map((icon) => {
                const isComingSoon = icon.href === "/coming-soon";
                return (
                  <div key={icon.label} className={styles.socialIconWrapper}>
                    {isComingSoon ? (
                      <>
                        <span
                          aria-label={icon.label}
                          className={styles.socialIconDisabled}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            {icon.path}
                          </svg>
                        </span>
                        <div className={styles.tooltip}>
                          Coming Soon
                          <div className={styles.tooltipArrow}></div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={icon.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={icon.label}
                        className={styles.socialIcon}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          {icon.path}
                        </svg>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Compliance Badges */}
            <div className={styles.complianceBadges}>
              {/* SOC 2 */}
              <div className={styles.badge}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.badgeIcon}
                >
                  <path
                    d="M12 3L5 6V10.5C5 14.625 7.875 18.375 12 19.5C16.125 18.375 19 14.625 19 10.5V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M8.5 11.5L10.5 13.5L15.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.badgeText}>SOC 2</span>
              </div>

              {/* GDPR */}
              <div className={styles.badge}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.badgeIcon}
                >
                  <path
                    d="M12 3L5 6V10.5C5 14.625 7.875 18.375 12 19.5C16.125 18.375 19 14.625 19 10.5V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <rect
                    x="9.5"
                    y="11"
                    width="5"
                    height="4"
                    rx="0.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M10.5 11V9.5C10.5 8.67157 11.1716 8 12 8C12.8284 8 13.5 8.67157 13.5 9.5V11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className={styles.badgeText}>GDPR</span>
              </div>
            </div>
          </div>

          {/* Footer links columns */}
          <div className={styles.linksGrid}>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className={styles.linkColumn}>
                <h4 className={styles.linkColumnTitle}>
                  {title}
                </h4>
                <ul className={styles.linkList}>
                  {links.map((link) => {
                    const linkData = typeof link === 'string' ? { label: link, href: '#' } : link;
                    const isComingSoon = linkData.href === "/coming-soon";

                    return (
                      <li key={linkData.label} className={styles.linkItem}>
                        {isComingSoon ? (
                          <>
                            <span className={styles.linkDisabled}>
                              {linkData.label}
                            </span>
                            <div className={styles.tooltip}>
                              Coming Soon!
                              <div className={styles.tooltipArrow}></div>
                            </div>
                          </>
                        ) : (
                          <a
                            href={linkData.href}
                            className={styles.link}
                          >
                            {linkData.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className={styles.legalRow}>
          <p className={styles.copyright}>© 2026 AuthSec. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="https://authsec.ai/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </a>
            <a href="https://authsec.ai/terms-and-conditions" className={styles.legalLink}>
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
