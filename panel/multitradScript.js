let tradElinvMultiTraducc = function () {
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (typeof message.codIdiomSelRec !== "undefined") {
            iniciaMultitraduccion(message.codIdiomSelRec);
        }
    });

    // texto a traducir variable global
    var textos;
    // contendrá el array de códigos
    var codId;
    // para la devolución del texto traducido.
    var resulTRAD = "";

    // función principal
    function iniciaMultitraduccion(paramCod) {
        var partes;
        // separamos cod de idiomas de los textos seleccionados.
        partes = paramCod.split("~");
        // ahora enviamos a un array los codigos de idiomas
        codId = partes[0].split(",");
        // y cada texto seleccionado
        textos = partes[1].split(",");
        run();
    }

    // si la pagina ha sido cargada?
    var pageisloaded = false;
    // async y await
    function promiseTradElv(value) {
        return new Promise(function (fulfill, reject) {
            // cargamos la pagina y traducimos
            window.location = "#auto/" + codId[value] + "/" + textos.toString();
            // una vez que se ha cargado el documento
            if (pageisloaded) {
                obtenerResultado(fulfill);
            } else {
                // alternativa a DOMContentLoaded
                document.onreadystatechange = function () {
                    if (document.readyState == "complete") {
                        obtenerResultado(fulfill);
                        pageisloaded = true;
                    }
                }
            }
        });
    }
    async function run() {
        for (var n = 0; n < codId.length; n++) {
            var obj = await promiseTradElv(n);
        }
        // enviamos la información al background
        chrome.runtime.sendMessage({
            "url": window.location.href,
            "datos": "traductor Elinv",
            "setResultMultiTrad": resulTRAD
        });
    }

    // obtenemos la traducción
    function obtenerResultado(fulfill) {
        setTimeout(function () {
            // obtenemos el valor traducido
            let res2 = document.getElementsByClassName('result-shield-container');
            if (resulTRAD === "") {
                resulTRAD = res2[0].textContent;
            } else {
                resulTRAD += " ~ " + res2[0].textContent;;
            }
            fulfill({
                result: resulTRAD
            });
        }, 3000);
    }
}();