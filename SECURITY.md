Reporting a Vulnerability
If you discover a security vulnerability in this repository, please report it by emailing security@brainsait.io or by opening a private issue (if available).
Please include as much detail as possible, including:

A description of the vulnerability
Steps to reproduce
Impact (data affected, possible exploit paths)
Any relevant logs or screenshots
We aim to respond to all reports within 3 business days.

Supported Versions
We currently support and patch the following versions:

Version	Supported
main	✔️
For older or archived branches, please coordinate via the contact methods above.

Security Standards
This project follows industry best practices, especially for healthcare and insurance data:

Data Protection: All sensitive information (e.g., PHI, PII) must be encrypted at rest and in transit.
Dependency Management: Dependencies are regularly scanned for vulnerabilities.
Access Control: Secrets and credentials are never hardcoded. Use environment variables and .env files.
Audit Trails: Changes to sensitive logic are reviewed and logged.
Disclosure Policy
Please do not disclose security issues publicly until they have been reviewed and resolved. Responsible disclosure helps keep our users safe.

Additional Resources
CONTRIBUTING.md for code guidelines
GitHub Security Documentation
