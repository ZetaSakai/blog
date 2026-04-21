document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('langSelect');

    function canviarIdioma(idioma) {
        // persist selection
        try { localStorage.setItem('siteLang', idioma); } catch (e) { /* ignore */ }
        document.documentElement.lang = idioma;

        // translate text nodes with i18n dataset
        const elements = document.querySelectorAll('[i18n]');
        elements.forEach(element => {
            const text = element.dataset[idioma];
            if (text !== undefined) element.textContent = text;

            // translate common attributes if data exists (placeholder, alt, title, value)
            const placeholderKey = idioma + 'Placeholder';
            const altKey = idioma + 'Alt';
            const titleKey = idioma + 'Title';
            const valueKey = idioma + 'Value';

            if (element.dataset[placeholderKey] !== undefined) element.setAttribute('placeholder', element.dataset[placeholderKey]);
            if (element.dataset[altKey] !== undefined) element.setAttribute('alt', element.dataset[altKey]);
            if (element.dataset[titleKey] !== undefined) element.setAttribute('title', element.dataset[titleKey]);
            if (element.dataset[valueKey] !== undefined) element.value = element.dataset[valueKey];
        });

        // translate any inputs/textareas that use data-*-placeholder attributes but may not have i18n
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(inp => {
            const placeholderKey = idioma + 'Placeholder';
            if (inp.dataset[placeholderKey] !== undefined) inp.setAttribute('placeholder', inp.dataset[placeholderKey]);
            const valueKey = idioma + 'Value';
            if (inp.dataset[valueKey] !== undefined) inp.value = inp.dataset[valueKey];
        });

        // translate images and other elements with data-*-alt or data-*-title even if not i18n
        const els = document.querySelectorAll('[data-ca-alt], [data-es-alt], [data-en-alt], [data-ca-title], [data-es-title], [data-en-title]');
        els.forEach(el => {
            const altKey = idioma + 'Alt';
            const titleKey = idioma + 'Title';
            if (el.dataset[altKey] !== undefined) el.setAttribute('alt', el.dataset[altKey]);
            if (el.dataset[titleKey] !== undefined) el.setAttribute('title', el.dataset[titleKey]);
        });
    }

    // per-section translate controls removed — translations handled only by global selector

    if (selector) {
        // decide initial language: localStorage -> html lang -> selector default
        let lang = null;
        try { lang = localStorage.getItem('siteLang'); } catch (e) { lang = null; }
        if (!lang) lang = document.documentElement.lang || selector.value;
        if (lang) selector.value = lang;

        selector.addEventListener('change', function () {
            canviarIdioma(this.value);
        });

        // initialize page language from stored value
        canviarIdioma(selector.value);
    }

    // per-section controls are disabled — global selector handles translations
});