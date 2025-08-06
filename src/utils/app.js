export function initializeApp() {
    // Core application logic
    const app = {
        config: {
            language: localStorage.getItem('language') || 'en',
            theme: localStorage.getItem('theme') || 'light'
        },
        
        init() {
            this.setupEventListeners();
            this.loadUserPreferences();
            this.renderApp();
        },
        
        setupEventListeners() {
            // Navigation
            document.addEventListener('click', (e) => {
                if (e.target.dataset.navigate) {
                    this.navigate(e);
                }
            });
            
            // Language toggle
            document.addEventListener('click', (e) => {
                if (e.target.id === 'lang-toggle' || e.target.closest('#lang-toggle')) {
                    this.toggleLanguage();
                }
            });
            
            // Payment buttons
            document.addEventListener('click', (e) => {
                if (e.target.dataset.product) {
                    this.openPaymentModal(e.target.dataset.product);
                }
            });
        },
        
        toggleLanguage() {
            this.config.language = this.config.language === 'en' ? 'ar' : 'en';
            window.setLanguage(this.config.language);
        },
        
        navigate(event) {
            event.preventDefault();
            const target = event.target.dataset.navigate;
            const section = document.getElementById(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        openPaymentModal(productId) {
            const modal = document.getElementById('payment-modal');
            if (modal) {
                modal.dataset.product = productId;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        },
        
        closePaymentModal() {
            const modal = document.getElementById('payment-modal');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        },
        
        showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 5000);
        },
        
        loadUserPreferences() {
            // Set initial language
            if (this.config.language) {
                window.setLanguage(this.config.language);
            }
        },
        
        renderApp() {
            const app = document.getElementById('app');
            if (app) {
                app.innerHTML = this.getAppHTML();
            }
        },
        
        getAppHTML() {
            return `
                ${this.getNavigationHTML()}
                ${this.getHeroHTML()}
                ${this.getProductsHTML()}
                ${this.getFooterHTML()}
                ${this.getPaymentModalHTML()}
            `;
        },
        
        getNavigationHTML() {
            return `
                <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between h-16">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <h1 class="text-2xl font-bold gradient-text">BrainSAIT</h1>
                                </div>
                                <div class="hidden md:block">
                                    <div class="ml-10 flex items-baseline space-x-4">
                                        <a href="#home" data-navigate="home" data-i18n="nav.home" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                        <a href="#expertise" data-navigate="expertise" data-i18n="nav.expertise" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Expertise</a>
                                        <a href="#solutions" data-navigate="solutions" data-i18n="nav.solutions" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Solutions</a>
                                        <a href="#contact" data-navigate="contact" data-i18n="nav.contact" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <button id="lang-toggle" class="text-sm font-medium text-gray-700 hover:text-primary" data-i18n="nav.language">
                                    العربية
                                </button>
                                <a href="https://id.brainsait.io" class="btn-primary" data-i18n="nav.signin">Sign In</a>
                            </div>
                        </div>
                    </div>
                </nav>
            `;
        },
        
        getHeroHTML() {
            return `
                <section id="home" class="pt-20 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 fade-in-up" data-i18n="hero.title">
                                Revolutionizing Healthcare Through AI
                            </h1>
                            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto fade-in-up" data-i18n="hero.subtitle">
                                Bridging complex technical concepts with real-world healthcare solutions
                            </p>
                            <div class="space-x-4 fade-in-up">
                                <button data-navigate="solutions" class="btn-primary" data-i18n="hero.cta_primary">
                                    Explore Solutions
                                </button>
                                <a href="#contact" class="btn-secondary" data-i18n="hero.cta_secondary">
                                    Get Consultation
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        },
        
        getProductsHTML() {
            return `
                <section id="solutions" class="py-20 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-i18n="products.title">Our Solutions</h2>
                            <p class="text-xl text-gray-600 max-w-3xl mx-auto" data-i18n="products.subtitle">
                                Cutting-edge healthcare AI tools designed for the Saudi Arabian market
                            </p>
                        </div>
                        <div class="grid md:grid-cols-2 gap-8">
                            ${this.getProductCardHTML('fhir')}
                            ${this.getProductCardHTML('nphies')}
                        </div>
                    </div>
                </section>
            `;
        },
        
        getProductCardHTML(productId) {
            return `
                <div class="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4" data-i18n="products.${productId}.name">
                        Product Name
                    </h3>
                    <p class="text-gray-600 mb-6" data-i18n="products.${productId}.description">
                        Product Description
                    </p>
                    <div class="text-3xl font-bold text-primary mb-6" data-i18n="products.${productId}.price">
                        Price
                    </div>
                    <ul class="space-y-2 mb-8">
                        <li class="flex items-center text-gray-600">
                            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            <span data-i18n="products.${productId}.features.0">Feature 1</span>
                        </li>
                        <li class="flex items-center text-gray-600">
                            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            <span data-i18n="products.${productId}.features.1">Feature 2</span>
                        </li>
                        <li class="flex items-center text-gray-600">
                            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            <span data-i18n="products.${productId}.features.2">Feature 3</span>
                        </li>
                    </ul>
                    <button data-product="${productId}" class="btn-primary w-full" data-i18n="products.cta">
                        Purchase Now
                    </button>
                </div>
            `;
        },
        
        getFooterHTML() {
            return `
                <footer class="bg-gray-900 text-white py-12">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid md:grid-cols-4 gap-8">
                            <div>
                                <h3 class="text-2xl font-bold mb-4" data-i18n="footer.company">BrainSAIT</h3>
                                <p class="text-gray-400" data-i18n="footer.description">Revolutionary Healthcare AI Solutions</p>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold mb-4">Links</h4>
                                <ul class="space-y-2">
                                    <li><a href="https://thefadil.site" class="text-gray-400 hover:text-white" data-i18n="footer.links.about">About Dr. Fadil</a></li>
                                    <li><a href="#" class="text-gray-400 hover:text-white" data-i18n="footer.links.privacy">Privacy Policy</a></li>
                                    <li><a href="#" class="text-gray-400 hover:text-white" data-i18n="footer.links.terms">Terms of Service</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold mb-4" data-i18n="footer.links.contact">Contact Us</h4>
                                <p class="text-gray-400">support@brainsait.io</p>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold mb-4">Social</h4>
                                <div class="flex space-x-4">
                                    <a href="#" class="text-gray-400 hover:text-white">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" class="text-gray-400 hover:text-white">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
                            <p class="text-gray-400" data-i18n="footer.copyright">© 2024 BrainSAIT. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
        },
        
        getPaymentModalHTML() {
            return `
                <div id="payment-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div class="bg-white rounded-lg max-w-md w-full p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold" data-i18n="payment.title">Complete Your Purchase</h3>
                            <button onclick="window.BrainSAIT.closePaymentModal()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <p class="text-gray-600 mb-6" data-i18n="payment.subtitle">Secure payment processing with Saudi Riyal support</p>
                        <div class="space-y-4">
                            <button onclick="window.PaymentHandler.processPayment('stripe', 'product', 1499)" class="w-full btn-primary">
                                <i class="fas fa-credit-card mr-2"></i>
                                <span data-i18n="payment.methods.stripe">Credit Card</span>
                            </button>
                            <button onclick="window.PaymentHandler.processPayment('paypal', 'product', 1499)" class="w-full btn-secondary">
                                <i class="fab fa-paypal mr-2"></i>
                                <span data-i18n="payment.methods.paypal">PayPal</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    };
    
    app.init();
    window.BrainSAIT = app;
}