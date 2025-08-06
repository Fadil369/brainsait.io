// Main application entry point
import './styles/main.css';
import { initializeApp } from './utils/app';
import { loadTranslations } from './utils/i18n';
import { setupAnalytics } from './utils/analytics';
import { initializePayments } from './utils/payment';

// Initialize application
async function bootstrap() {
    try {
        // Load translations
        await loadTranslations();
        
        // Initialize core systems
        initializeApp();
        setupAnalytics();
        await initializePayments();
        
        // Start application
        console.log('BrainSAIT initialized successfully');
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}