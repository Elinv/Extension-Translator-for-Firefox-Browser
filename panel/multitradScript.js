(function() {
    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            if (typeof message.codIdiomSelRec !== 'undefined') {
                iniciaMultitraduccion(message.codIdiomSelRec);
            }
        });

    // texto a traducir variable global
    let textos;
    // contendrá el array de códigos
    let codId;
    // para la devolución del texto traducido.
    let resulTRAD = '';

    /**
    * función principal para iniciar la multitraducción
    * @param {string} paramCod => contiene los códigos de los idiomas
    */
    function iniciaMultitraduccion(paramCod) {
        // separamos cod de idiomas de los textos seleccionados.
        const partes = paramCod.split('~');
        // ahora enviamos a un array los codigos de idiomas
        codId = partes[0].split(',');
        // y cada texto seleccionado
        textos = partes[1].split(',');
        run();
    }

    // si la pagina ha sido cargada?
    let pageisloaded = false;
    /**
    * async y await
    * @param {int} value integer identifica cada codigo de lenguaje en un array
    * @return {Promise} Promise
    */
    function promiseTradElv(value) {
        return new Promise(function(fulfill, reject) {
            // cargamos la pagina y traducimos
            window.location = '#auto/' + codId[value] + '/' + textos.toString();
            // una vez que se ha cargado el documento
            if (pageisloaded) {
                obtenerResultado(fulfill);
            } else {
                // alternativa a DOMContentLoaded
                document.onreadystatechange = function() {
                    if (document.readyState == 'complete') {
                        obtenerResultado(fulfill);
                        pageisloaded = true;
                    }
                };
            }
        });
    }
    /**
    * Recorre todos los lenguajes seleccionados
    * para la multitraducción.
    */
    async function run() {
        for (let n = 0; n < codId.length; n++) {
            // eslint-disable-next-line no-unused-vars
            const obj = await promiseTradElv(n);
        }
        // enviamos la información al background
        chrome.runtime.sendMessage({
            'url': window.location.href,
            'datos': 'traductor Elinv',
            'setResultMultiTrad': resulTRAD,
        });
    }

    /**
    * Obtenemos la traducción
    * @param {string} fulfill
    */
    function obtenerResultado(fulfill) {
        setTimeout(function() {
            // obtenemos el valor traducido
            // eslint-disable-next-line max-len
            const res2 = document.getElementsByClassName('result-shield-container');
            if (resulTRAD === '') {
                resulTRAD = res2[0].textContent;
            } else {
                resulTRAD += ' ~ ' + res2[0].textContent; ;
            }
            fulfill({
                result: resulTRAD,
            });
        }, 3000);
    }
})();
