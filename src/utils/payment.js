export async function initializePayments() {
    const config = {
        stripe: {
            publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
            locale: 'auto'
        },
        paypal: {
            clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: 'SAR'
        }
    };
    
    window.PaymentHandler = {
        async processPayment(method, product, amount) {
            try {
                // Show loading state
                this.showProcessing();
                
                // Simulate API call for development
                if (import.meta.env.NODE_ENV === 'development') {
                    await this.simulatePayment(method, product, amount);
                    return;
                }
                
                const response = await fetch('/api/payments/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        method,
                        product,
                        amount,
                        currency: 'SAR'
                    })
                });
                
                if (!response.ok) throw new Error('Payment failed');
                
                const result = await response.json();
                this.showSuccess(result);
                return result;
            } catch (error) {
                this.showError(error);
                throw error;
            }
        },
        
        async simulatePayment(method, product, amount) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                this.showSuccess({
                    transactionId: 'tx_' + Date.now(),
                    amount,
                    currency: 'SAR',
                    method,
                    product
                });
                
                // Close modal after success
                setTimeout(() => {
                    window.BrainSAIT?.closePaymentModal();
                }, 2000);
            } else {
                throw new Error('Payment simulation failed');
            }
        },
        
        showProcessing() {
            const buttons = document.querySelectorAll('#payment-modal button');
            buttons.forEach(btn => {
                if (btn.onclick && btn.onclick.toString().includes('processPayment')) {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i><span data-i18n="payment.processing">Processing...</span>';
                }
            });
        },
        
        showSuccess(result) {
            console.log('Payment successful:', result);
            window.BrainSAIT?.showToast(window.i18n?.t('payment.success') || 'Payment successful!', 'success');
            
            // Track conversion
            if (window.gtag) {
                window.gtag('event', 'purchase', {
                    transaction_id: result.transactionId,
                    value: result.amount,
                    currency: result.currency,
                    items: [{
                        item_id: result.product,
                        item_name: result.product,
                        category: 'Healthcare AI',
                        quantity: 1,
                        price: result.amount
                    }]
                });
            }
        },
        
        showError(error) {
            console.error('Payment error:', error);
            window.BrainSAIT?.showToast(window.i18n?.t('payment.error') || 'Payment failed. Please try again.', 'error');
            
            // Reset button states
            const buttons = document.querySelectorAll('#payment-modal button');
            buttons.forEach(btn => {
                if (btn.disabled) {
                    btn.disabled = false;
                    // Restore original button text (this could be improved)
                    if (btn.innerHTML.includes('processPayment')) {
                        btn.innerHTML = btn.innerHTML.replace(/.*<span/, '<span');
                    }
                }
            });
        },
        
        // Stripe integration
        async initializeStripe() {
            if (!config.stripe.publicKey) return;
            
            try {
                // Load Stripe SDK dynamically
                if (!window.Stripe) {
                    await this.loadScript('https://js.stripe.com/v3/');
                }
                
                window.stripe = window.Stripe(config.stripe.publicKey);
                console.log('Stripe initialized');
            } catch (error) {
                console.error('Failed to initialize Stripe:', error);
            }
        },
        
        // PayPal integration
        async initializePayPal() {
            if (!config.paypal.clientId) return;
            
            try {
                // Load PayPal SDK dynamically
                if (!window.paypal) {
                    await this.loadScript(`https://www.paypal.com/sdk/js?client-id=${config.paypal.clientId}&currency=${config.paypal.currency}`);
                }
                
                console.log('PayPal initialized');
            } catch (error) {
                console.error('Failed to initialize PayPal:', error);
            }
        },
        
        loadScript(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
    };
    
    // Initialize payment providers
    await Promise.all([
        window.PaymentHandler.initializeStripe(),
        window.PaymentHandler.initializePayPal()
    ]);
    
    console.log('Payment systems initialized');
}