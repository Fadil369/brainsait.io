export function setupAnalytics() {
    const config = {
        ga: {
            id: import.meta.env.VITE_GA_ID
        },
        cloudflare: {
            beacon: import.meta.env.VITE_CF_BEACON
        }
    };
    
    // Google Analytics 4
    if (config.ga.id) {
        initializeGA4(config.ga.id);
    }
    
    // Cloudflare Web Analytics
    if (config.cloudflare.beacon) {
        initializeCloudflareAnalytics(config.cloudflare.beacon);
    }
    
    // Custom event tracking
    setupCustomTracking();
    
    console.log('Analytics initialized');
}

function initializeGA4(gaId) {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', gaId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
    });
    
    // Track page views
    gtag('config', gaId, {
        page_title: document.title,
        page_location: window.location.href
    });
}

function initializeCloudflareAnalytics(beacon) {
    // Load Cloudflare Web Analytics
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: beacon }));
    document.head.appendChild(script);
}

function setupCustomTracking() {
    // Track language changes
    window.addEventListener('languagechange', (e) => {
        if (window.gtag) {
            window.gtag('event', 'language_change', {
                new_language: e.detail.language,
                old_language: e.detail.oldLanguage || 'unknown'
            });
        }
    });
    
    // Track button clicks
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-primary, .btn-secondary')) {
            const buttonText = e.target.textContent.trim();
            const section = e.target.closest('section')?.id || 'unknown';
            
            if (window.gtag) {
                window.gtag('event', 'button_click', {
                    button_text: buttonText,
                    section,
                    page_location: window.location.href
                });
            }
        }
        
        // Track navigation clicks
        if (e.target.dataset.navigate) {
            if (window.gtag) {
                window.gtag('event', 'navigation_click', {
                    target_section: e.target.dataset.navigate,
                    source_section: e.target.closest('section')?.id || 'navigation'
                });
            }
        }
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    const scrollDepthMarkers = [25, 50, 75, 90, 100];
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;
            
            // Track milestone markers
            scrollDepthMarkers.forEach(marker => {
                if (scrollPercent >= marker && maxScrollDepth < marker) {
                    if (window.gtag) {
                        window.gtag('event', 'scroll_depth', {
                            percent: marker,
                            page_location: window.location.href
                        });
                    }
                }
            });
        }
    }, 250));
    
    // Track form interactions
    document.addEventListener('focus', (e) => {
        if (e.target.matches('input, textarea, select')) {
            if (window.gtag) {
                window.gtag('event', 'form_interaction', {
                    field_type: e.target.type || e.target.tagName.toLowerCase(),
                    field_name: e.target.name || e.target.id || 'unnamed'
                });
            }
        }
    }, true);
    
    // Track errors
    window.addEventListener('error', (e) => {
        if (window.gtag) {
            window.gtag('event', 'javascript_error', {
                error_message: e.message,
                error_filename: e.filename,
                error_lineno: e.lineno
            });
        }
    });
    
    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
        if (window.gtag) {
            window.gtag('event', 'promise_rejection', {
                error_message: e.reason?.message || 'Unknown promise rejection'
            });
        }
    });
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Track page load performance
window.addEventListener('load', () => {
    setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation && window.gtag) {
            window.gtag('event', 'page_load_time', {
                value: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
                custom_parameter: {
                    dns_time: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
                    connect_time: Math.round(navigation.connectEnd - navigation.connectStart),
                    response_time: Math.round(navigation.responseEnd - navigation.responseStart),
                    dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)
                }
            });
        }
    }, 0);
});