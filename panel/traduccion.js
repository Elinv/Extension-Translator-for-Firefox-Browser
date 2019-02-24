let tradElinvTraduccPanel = function () {
    // Matriz bidimensional contiene id y texto del elemento
    var opcTrad = [
        ["idTitMultitrad", "msgTitMultitrad"],
        ["idSelectMultitrad", "msgSeleccMultitrad"],
        ["idIdiomasMultitrad", "msgIdiomMultitrad"],
        ["idResultEnviar", "msgEnviarMultitrad"]
    ];

    // función para la traducción
    function tradIdioma() {
        // bucle sobre matriz bidimensional
        for (var i = 0; i < opcTrad.length; i++) {
            // obtenemos la traducción de esta palabra o frase
            var grabarVar = chrome.i18n.getMessage(opcTrad[i][1]);
            // asignamos al id la frase traduccida o la original por defecto
            if (opcTrad[i][0] == "idResultEnviar") {
                try {
                    document.getElementById(opcTrad[i][0]).value = grabarVar || opcTrad[i][1];
                } catch (err) {}

            } else {
                try {
                    document.getElementById(opcTrad[i][0]).textContent = grabarVar || opcTrad[i][1];
                } catch (err) {}
            }
        }
    }

    // Ejecutamos la función
    tradIdioma();
}();