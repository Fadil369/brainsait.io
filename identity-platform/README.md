# BrainSAIT Identity Platform

[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-orange?style=flat-square&logo=cloudflare)](https://id.brainsait.io)
[![Security](https://img.shields.io/badge/Security-HIPAA%20Ready-green?style=flat-square&logo=security)](https://id.brainsait.io)
[![Integration](https://img.shields.io/badge/Integration-Dr.%20Fadil%20Profile-blue?style=flat-square&logo=user)](https://thefadil.site)

🔐 **Live Platform**: [id.brainsait.io](https://id.brainsait.io)

## Overview

The BrainSAIT Identity Platform serves as the unified login gateway for the entire healthcare ecosystem. This platform integrates with Dr. Mohamed El Fadil's professional profile and provides secure access to all BrainSAIT services.

## Features

### 🔐 **Multi-Factor Authentication**
- **Biometric Authentication** - WebAuthn support for fingerprint/face recognition
- **QR Code Login** - Mobile app integration for secure authentication
- **Hospital SSO** - Single sign-on integration with healthcare institutions
- **Traditional Login** - Email/password with enhanced security

### 🏥 **Healthcare Integration**
- **UIDL Core** - Universal Identity Digital Layer
- **Hospital Systems** - Integration with existing EHR/EMR systems
- **Mobile Apps** - Seamless mobile authentication
- **API Gateway** - Secure access to all BrainSAIT services

### 🛡️ **Security Features**
- **HIPAA Compliant** - Healthcare data protection standards
- **End-to-End Encryption** - Military-grade security
- **Zero-Knowledge Architecture** - Privacy-first design
- **Security Headers** - Comprehensive protection against common attacks

### 🔗 **Platform Integration**
- **Main Platform**: [brainsait.io](https://brainsait.io) - Healthcare ecosystem
- **Dr. Fadil Profile**: [thefadil.site](https://thefadil.site) - Founder's professional profile
- **Identity Platform**: [id.brainsait.io](https://id.brainsait.io) - Unified login system

## Deployment

### 🚀 **Cloudflare Pages Setup**

1. **Create Cloudflare Pages Project**
   ```bash
   npx wrangler pages project create brainsait-identity
   ```

2. **Deploy from Git**
   - Connect to GitHub repository
   - Set build settings:
     - Framework preset: `None`
     - Build command: `` (empty)
     - Build output directory: `/`
     - Root directory: `/identity-platform`

3. **Configure Custom Domain**
   - Add `id.brainsait.io` in Cloudflare Pages
   - Update DNS records to point to Cloudflare Pages

### 🔧 **Environment Configuration**

```bash
# Set environment variables
wrangler pages secret put MAIN_SITE
wrangler pages secret put PROFILE_SITE
wrangler pages secret put PLATFORM_NAME
```

### 📋 **Domain Setup**

```bash
# DNS Records (in Cloudflare DNS)
CNAME id brainsait-identity.pages.dev

# Or if using A records:
A id 192.0.2.1
AAAA id 2001:db8::1
```

## Integration with Dr. Fadil Profile

The identity platform is designed to work seamlessly with the existing Dr. Fadil professional profile:

### 🔗 **Cross-Platform Navigation**
- Header navigation includes link to Dr. Fadil's profile
- Profile site includes references to the identity platform
- Unified branding and design language

### 👤 **Profile Integration Points**
1. **Authentication Context** - Users can learn about the founder
2. **Trust Building** - Professional credentials enhance platform credibility  
3. **Contact Integration** - Direct links to consultation booking
4. **Brand Cohesion** - Consistent visual identity across platforms

### 📱 **User Flow**
```
thefadil.site (Learn about founder)
    ↓
id.brainsait.io (Secure login)
    ↓
brainsait.io (Healthcare dashboard)
```

## Security Configuration

### 🛡️ **Security Headers**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: [Comprehensive policy]
```

### 🔐 **Authentication Methods**
- **WebAuthn API** for biometric authentication
- **TOTP** for two-factor authentication
- **OAuth 2.0** for third-party integrations
- **SAML** for enterprise SSO

## Development

### 🚧 **Local Development**
```bash
# Serve locally
python -m http.server 8000
# or
npx serve

# Preview with Wrangler
npx wrangler pages dev
```

### 🧪 **Testing**
```bash
# Test authentication flows
npm test

# Security testing
npm run security-test

# Performance testing
npm run perf-test
```

## File Structure

```
identity-platform/
├── index.html          # Main login interface
├── _redirects          # Cloudflare Pages routing & headers
├── wrangler.toml       # Cloudflare Workers configuration
├── README.md           # This file
└── assets/             # Static assets (if needed)
    ├── images/
    ├── icons/
    └── manifest.json   # PWA manifest (optional)
```

## API Integration

### 🔌 **Authentication Endpoints**
```javascript
// Login
POST /api/auth/login
{
  "email": "doctor@hospital.com",
  "password": "secure_password"
}

// Biometric authentication
POST /api/auth/webauthn
{
  "credential": "...",
  "clientDataJSON": "..."
}

// SSO integration
GET /api/auth/sso/hospital
```

## Monitoring & Analytics

### 📊 **Key Metrics**
- Login success/failure rates
- Authentication method usage
- Security incident tracking
- Performance monitoring

### 🔍 **Logging**
- Authentication attempts
- Security events
- Performance metrics
- Error tracking

## Support & Documentation

### 📚 **Resources**
- **Main Documentation**: Available at brainsait.io/docs
- **API Reference**: Available at brainsait.io/api
- **Security Guide**: Available at brainsait.io/security
- **Integration Guide**: Available at brainsait.io/integration

### 💬 **Support Channels**
- **Email**: support@brainsait.io
- **Documentation**: brainsait.io/help
- **Professional Contact**: [Dr. Fadil's Profile](https://thefadil.site)

## License

© 2025 BrainSAIT LTD. All rights reserved.
HIPAA Compliant | SOC2 Ready | Enterprise Grade Security
