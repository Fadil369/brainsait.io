const translations = {};

export async function loadTranslations() {
    try {
        // Import translation files
        const enModule = await import('../locales/en.json');
        const arModule = await import('../locales/ar.json');
        
        translations.en = enModule.default;
        translations.ar = arModule.default;
        
        window.i18n = {
            t(key, lang = getCurrentLanguage()) {
                const keys = key.split('.');
                let value = translations[lang];
                
                for (const k of keys) {
                    value = value?.[k];
                }
                
                return value || translations.en[key] || key;
            },
            
            getCurrentLanguage,
            setLanguage,
            getSupportedLanguages: () => ['en', 'ar']
        };
        
        console.log('Translations loaded successfully');
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
}

function getCurrentLanguage() {
    return document.documentElement.lang || localStorage.getItem('language') || 'en';
}

function setLanguage(lang) {
    if (!['en', 'ar'].includes(lang)) return;
    
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', lang);
    
    // Update content
    updateContent();
    
    // Dispatch language change event
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const translatedText = window.i18n.t(key);
        
        if (el.tagName === 'INPUT' && el.type === 'submit') {
            el.value = translatedText;
        } else if (el.hasAttribute('placeholder')) {
            el.placeholder = translatedText;
        } else {
            el.textContent = translatedText;
        }
    });
}

// Export for use in other modules
window.setLanguage = setLanguage;