/* eslint-disable require-jsdoc */
(function() {
    // -----------------------------------------------------------------------
    // Variables y funciones para mover el corrector en la pantalla
    let xInic;
    let yInic;
    let estaPulsado = false;

    /**
     * Pulsado el ratón
     * @param {evt} evt Detección de evento
     */
    function ratonPulsado(evt) {
        // Obtener la posición de inicio
        xInic = evt.clientX;
        yInic = evt.clientY;
        estaPulsado = true;
        // Para Internet Explorer
        document.getElementById('dialogElv').unselectable = true;
    }
    /**
     * Si se ha movido el ratón
     * @param {evt} evt Detección de evento
     */
    function ratonMovido(evt) {
        if (estaPulsado) {
            // Calcular la diferencia de posición
            const xActual = evt.clientX;
            const yActual = evt.clientY;
            const xInc = xActual - xInic;
            const yInc = yActual - yInic;
            xInic = xActual;
            yInic = yActual;
            // Establecer la nueva posición
            const elemento = document.getElementById('dialogElv');
            const position = getPosicion(elemento);
            elemento.style.top = position[0] + yInc + 'px';
            elemento.style.left = position[1] + xInc + 'px';
        }
    }
    /**
     * Si se ha soltado el ratón
     * @param {evt} evt Detección de evento
     */
    function ratonSoltado(evt) {
        estaPulsado = false;
    }
    /**
     * Función para obtener la posición en la que se encuentra el
     * elemento indicado como parámetro.
     * Retorna un array con las coordenadas x e y de la posición
     * @param {elemento} elemento Detección de evento
     * @return {int} posición del cursor.
     */
    function getPosicion(elemento) {
        const posicion = new Array(2);
        if (document.defaultView && document.defaultView.getComputedStyle) {
            posicion[0] = parseInt(
                document.defaultView
                    .getComputedStyle(elemento, null)
                    .getPropertyValue('top')
            );
            posicion[1] = parseInt(
                document.defaultView
                    .getComputedStyle(elemento, null)
                    .getPropertyValue('left')
            );
        } else {
            // Para Internet Explorer
            posicion[0] = parseInt(elemento.currentStyle.top);
            posicion[1] = parseInt(elemento.currentStyle.left);
        }
        return posicion;
    }
    // -----------------------------------------------------------------------
    /**
     * Creamos el estilo
     * @param {string} codigo => contiene el estilo
     */
    function crearEstiloOnline(codigo) {
        const estilos = document.createElement('style');
        estilos.type = 'text/css';

        if (estilos.styleSheet) {
            estilos.styleSheet.cssText = codigo;
        } else {
            estilos.appendChild(document.createTextNode(codigo));
        }

        document.getElementsByTagName('head')[0].appendChild(estilos);
    }
    // Estilo para nuestro textarea
    crearEstiloOnline(
        '#corrector {' +
            'background: url(elinv.png) center center no-repeat;' +
            'background:#009E37;' +
            'color:#FFFFFF;' +
            'border:4px solid #962626;' +
            'border-radius:24px ;' +
            'font-size:18px ;' +
            'width: 170px ;' +
            'height: 360px' +
            'padding: 25px ;' +
            'box-shadow: 8px 7px 15px #000000;' +
            '-webkit-box-shadow: 8px 7px 15px #000000;' +
            '-moz-box-shadow: 8px 7px 15px #000000;' +
            ' z-index: 1000000;' +
            'overflow-y: auto;' +
            '}' +
            '#corrector:focus {' +
            'background: rgb(202, 200, 200);' +
            'color: #000000;' +
            'box-shadow: 5px 5px 15px 5px #000000;' +
            'outline: none;' +
            '}'
    );
    // -----------------------------------------------------------------------

    /**
     * función para crear el corrector
     * @param {funcion} callback
     */
    function crearCorrector(callback) {
        const div = document.createElement('div');
        div.textContent = '';
        div.setAttribute('id', 'dialogElv');

        div.style['top'] = '150px';
        div.style['left'] = '27px';
        div.style.position = 'fixed';

        div.style.visibility = 'hidden';
        // agregamos último
        document.body.appendChild(div);
        // agregamos primero
        // document.body.prepend(div);

        const x = document.createElement('TEXTAREA');
        const t = document.createTextNode(
            chrome.i18n.getMessage('corrector_Help')
        ); //

        x.appendChild(t);
        x.setAttribute('id', 'corrector');
        x.setAttribute('cols', 30);
        x.setAttribute('rows', 13);

        const divCorrect = document.getElementById('dialogElv');
        divCorrect.appendChild(x);

        callback();
    }
    // forma de usar
    crearCorrector(correctorCargado);
    // --------------------------------------------------
    /**
     * Si se ha cargado el corrector ejecutamos
     */
    function correctorCargado() {
        // asignamos funcionalidad
        document
            .getElementById('corrector')
            .addEventListener('dblclick', vaciarTA);

        const el = document.getElementById('dialogElv');
        if (el.addEventListener) {
            el.addEventListener('mousedown', ratonPulsado, false);
            el.addEventListener('mouseup', ratonSoltado, false);
            document.addEventListener('mousemove', ratonMovido, false);
        } else {
            // Para IE
            el.attachEvent('onmousedown', ratonPulsado);
            el.attachEvent('onmouseup', ratonSoltado);
            document.attachEvent('onmousemove', ratonMovido);
        }

        // --------------------------------------------------------------
        // Para grabación y recuperación en storage local
        // --------------------------------------------------------------
        const contentBox = document.querySelector('#corrector');

        // cuando pierde el foco, graba
        contentBox.addEventListener('blur', () => {
            // solo si hay información
            if (contentBox.value !== '') {
                grabarNota();
            }
        });
        // cuando recupera el foco, actualizar contenido desde el storage local
        contentBox.addEventListener('focus', () => {
            recuperarNota();
        });

        const baseElv = browser.storage.local;
        /**
         * informa cualquier error
         * @param {String} error
         */
        function onError(error) {
            alert(error);
        }
        /**
         * Intercambiar title document provisionalmente
         */
        function setItem() {
            // titulo original del documento
            const titOrig = document.title;
            // titulo que durará 5 segundos
            document.title = chrome.i18n.getMessage('recordatorioSaveMiniPad');
            setTimeout(function() {
                // volvemos al titulo original
                document.title = titOrig;
            }, 5000);
        }
        /**
         * función para grabar la nota en local storage
         */
        function grabarNota() {
            // el texto a grabar
            paramNota = contentBox.value;
            // variable y objeto
            const elvURL = window.location;
            const elvOBJETO = {};
            elvOBJETO[elvURL] = paramNota;
            // grabamos el objeto
            baseElv.set(elvOBJETO).then(setItem, onError);
        }

        // ----------------------------------------
        /**
         * función para recuperarnota en local storage
         */
        function recuperarNota() {
            baseElv.get(function(result) {
                const paramUrl = window.location;
                contentBox.value = '';
                for (const i in result) {
                    // eslint-disable-next-line max-len
                    // Si i es igual a la url completa y el resultado no es nulo o indefinido
                    if (i.localeCompare(paramUrl) === 0) {
                        contentBox.value = result[i];
                    }
                }
            });
        }

        // ----------------------------------------
        // cleanStorage();
        /*
        function cleanStorage() {
            baseElv.clear();
        }
        */
        // --------------------------------------------------------------
    }

    /**
     * Vaciar el textArea.
     */
    function vaciarTA() {
        document.getElementById('corrector').value = '';
    }
    // -----------------------------------------------------------------------
})();
