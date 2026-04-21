document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('langSelect');

    function canviarIdioma(idioma) {
        document.documentElement.lang = idioma;

        const elements = document.querySelectorAll('[i18n]');
        console.log(elements)
        elements.forEach(element => {
            const text = element.dataset[idioma];
            if (text !== undefined) {
                element.textContent = text;
            }
        });
    }

    if (selector) {
        selector.addEventListener('change', function () {
            canviarIdioma(this.value);
        });

        canviarIdioma(selector.value);
    }
});