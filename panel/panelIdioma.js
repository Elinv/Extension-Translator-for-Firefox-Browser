/* eslint-disable max-len */
(function() {
    // Códigos idioma destino
    const codigoDestinoArr = [
        'af', 'sq', 'de', 'ar', 'hy', 'az', 'bn', 'be', 'my', 'bs', 'bg',
        'ca', 'ceb', 'cs', 'ny', 'zh-CN', 'zh-TW', 'ko', 'ht', 'hr', 'da',
        'sk', 'sl', 'es', 'eo', 'et', 'tl', 'fi', 'fr', 'cy', 'gl', 'ka', 'el',
        'gu', 'ha', 'iw', 'hi', 'hmn', 'nl', 'hu', 'ig', 'id', 'en', 'ga', 'is',
        'it', 'ja', 'jw', 'km', 'kn', 'kk', 'lo', 'la', 'lv', 'lt', 'mk', 'ml',
        'ms', 'mg', 'mt', 'mi', 'mr', 'mn', 'ne', 'no', 'fa', 'pl', 'pt', 'pa',
        'ro', 'ru', 'sr', 'st', 'si', 'so', 'sv', 'su', 'sw', 'th', 'tg', 'ta',
        'te', 'tr', 'uk', 'ur', 'uz', 'eu', 'vi', 'yi', 'yo', 'zu',
    ];
    // Idiomas Destino
    const idiomaDestinoArr = [
        'Afrikaans', 'Albanés', 'Alemán', 'Arabe', 'Armenio', 'Azerbaiyani',
        'Bengalí', 'Bielorruso', 'Birmano', 'Bosnio', 'Búlgaro', 'Catalán',
        'cebuano', 'Checo', 'Chichewa', 'Chino (Tradicional)', 'Chino (Simplificado)',
        'Coreano', 'Criollo Haitiano', 'Croata', 'Danés', 'Eslovaco', 'Esloveno',
        'Español', 'Esperanto', 'Estonio', 'Filipino', 'Finlandés', 'Francés', 'Galés',
        'Gallego', 'Georgiano', 'Griego', 'Gujaratí', 'Hausa', 'Hebreo', 'Hindi',
        'Hmong', 'Holandés', 'Húngaro', 'Igbo', 'Indonesio', 'Inglés', 'Irlandés',
        'Islandés', 'Italiano', 'Japonés', 'Javanés', 'Jemer', 'Kannada', 'Kazajo',
        'Lao', 'Latín', 'Letón', 'Lituano', 'Macedonio', 'Malayalam', 'Malayo', 'Malgache',
        'Maltés', 'Maorí', 'Maratí', 'Mongol', 'Nepalés', 'Noruego', 'Persa', 'Polaco',
        'Portugues', 'Punjabí', 'Rumano', 'Ruso', 'Serbio', 'Sesotho', 'Singalés',
        'Somalí', 'Sueco', 'Sundanés', 'Swahili', 'Tailandés', 'Tajik', 'Tamil', 'Telugu',
        'Turco', 'Ucraniano', 'Urdu', 'Uzbeco', 'Vasco', 'Vietnamita', 'Yiddish',
        'Yoruba', 'Zulú',
    ];

    let idiomaOption = document.getElementById('idiomas');
    idiomaOption.addEventListener('change', Mostrar);

    for (i = 0; i < idiomaDestinoArr.length; i++) {
        idiomaOption.options[i] = new Option(idiomaDestinoArr[i], codigoDestinoArr[i]);
    }

    // -------------------------------------------------------------
    /**
    * Para ir mostrando los idiomas seleccionados
    */
    function Mostrar() {
        const idiomas = document.getElementById('idiomas');
        const seleccionados = document.getElementById('seleccionados');
        // Vaciamos el select destino
        seleccionados.options.length = 0;
        // De acuerdo a si esta seleccionado lo mostramos
        let x = 0;
        let y = 0;
        // Llenamos el array
        for (x = 0; x < idiomas.length; x++) {
            if (y >= 10) {
                alert(chrome.i18n.getMessage('msgTopeMultiIdiomas'));
                break;
            }
            if (idiomas[x].selected) {
                seleccionados.options[y++] = new Option(idiomas[x].text, idiomas[x].value, 'holas');
            }
        }
    }
    // -------------------------------------------------------------

    // boton devolver el array conteniendo los idiomas seleccionados
    // -------------------------------------------------------------
    idiomaOption = document.getElementById('idResultEnviar');
    idiomaOption.addEventListener('click', devuelveIdiomas);
    /**
    * Devuelve idiomas
    */
    function devuelveIdiomas() {
        const selec = document.getElementById('seleccionados');
        const opc = [];
        const codOpc = [];
        for (let i = 0; i < selec.length; i++) {
            opc.push(selec[i].textContent);
            codOpc.push(selec[i].value);
        }
        // enviamos la información al background
        chrome.runtime.sendMessage({
            'idiomasMultitrad': opc,
            'codigoOpciones': codOpc,
        });
    }
    // -------------------------------------------------------------
})();
