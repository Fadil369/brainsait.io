# BrainSAIT Healthcare AI Website

A production-ready healthcare AI solutions website with bilingual support (English/Arabic), secure payment integration, and optimized performance for the Saudi Arabian market.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── index.html          # Main HTML template
├── main.js            # Application entry point
├── styles/
│   └── main.css       # Main styles with Tailwind
├── components/        # Reusable UI components
├── locales/           # Translation files
│   ├── en.json        # English translations
│   └── ar.json        # Arabic translations
├── utils/             # Utility functions
│   ├── app.js         # Core application logic
│   ├── i18n.js        # Internationalization
│   ├── payment.js     # Payment processing
│   └── analytics.js   # Analytics tracking
└── api/               # API configurations
```

## 🌍 Features

- **Bilingual Support**: Full English/Arabic localization with RTL support
- **Payment Integration**: Stripe and PayPal with Saudi Riyal support
- **Modern Build System**: Vite with hot module replacement
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Analytics**: Google Analytics 4 and Cloudflare Web Analytics
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Security**: CSP headers and secure payment processing
- **Performance**: Optimized for Lighthouse score > 95

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm 9+

### Environment Setup

1. Copy environment template:
```bash
cp .env.example .env
```

2. Configure your environment variables:
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_GA_ID=G-XXXXXXXXXX
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm run test` - Run tests

## 🐳 Docker Deployment

```bash
# Build Docker image
npm run docker:build

# Run locally
npm run docker:run

# Access at http://localhost:8080
```

## ☁️ Cloudflare Deployment

```bash
# Login to Cloudflare
npx wrangler login

# Deploy to production
npm run deploy
```

## 🌐 Internationalization

The application supports Arabic and English with:

- RTL layout for Arabic
- Localized content and UI
- Currency formatting for SAR
- Date/time localization

### Adding Translations

1. Add keys to `src/locales/en.json` and `src/locales/ar.json`
2. Use in HTML: `<span data-i18n="key.path">Default text</span>`
3. Use in JS: `window.i18n.t('key.path')`

## 💳 Payment Integration

Supports secure payments with:

- **Stripe**: Credit/debit cards
- **PayPal**: PayPal accounts
- **Currency**: Saudi Riyal (SAR)
- **Security**: PCI DSS compliant

## 📊 Analytics

Tracks user interactions with:

- Page views and navigation
- Button clicks and form interactions
- Payment conversions
- Language preferences
- Performance metrics

## 🔒 Security

- Content Security Policy (CSP) headers
- HTTPS enforcement
- Secure payment processing
- Input validation and sanitization
- CORS configuration

## 🎯 Performance Optimizations

- Code splitting and lazy loading
- Image optimization
- CSS and JS minification
- Gzip compression
- CDN delivery
- Caching strategies

## 📱 Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

## 📈 Monitoring

- Uptime monitoring
- Error tracking
- Performance monitoring
- Analytics dashboards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Email: support@brainsait.io
- Website: https://brainsait.io
- Documentation: https://docs.brainsait.io

---

Built with ❤️ for the Saudi Arabian healthcare market