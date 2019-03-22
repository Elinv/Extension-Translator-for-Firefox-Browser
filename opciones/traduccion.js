/* eslint-disable max-len */
(function() {
    // Matriz bidimensional contiene id y texto del elemento
    const opcTrad = [
        // titulo
        ['idBordesSombreado', 'Preparar_Idiomas'],
        // idiomas
        ['titIdiomaOrigen', 'Idioma_Origen'],
        ['titIdiomaDestino', 'Idioma_Destino'],
        ['idGrabar1', 'Grabar'],
        ['searchBox', 'buscador'],
        ['searchBox1', 'buscador'],
        ['idTitDefinic', 'msgDefinicionSinMas'],
        ['idBuscarGoogle', 'msgBuscarGoogle'],
        ['idDefinicGoogle', 'msgDefinicGoogle'],
    ];

    /**
    * función para la traducción
    */
    function tradIdioma() {
        // bucle sobre matriz bidimensional
        for (let i = 0; i < opcTrad.length; i++) {
            // obtenemos la traducción de esta palabra o frase
            const grabarVar = chrome.i18n.getMessage(opcTrad[i][1]);
            // asignamos al id la frase traduccida o la original por defecto
            if (opcTrad[i][0] == 'searchBox' || opcTrad[i][0] == 'searchBox1') {
                try {
                    document.getElementById(opcTrad[i][0]).placeholder = grabarVar || opcTrad[i][1];
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
})();
