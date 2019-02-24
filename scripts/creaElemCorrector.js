let tradElinvTraducc = function () {
    // -----------------------------------------------------------------------
    // Variables y funciones para mover el corrector en la pantalla
    var xInic, yInic;
    var estaPulsado = false;

    // Pulsado el ratón
    function ratonPulsado(evt) {
        //Obtener la posición de inicio
        xInic = evt.clientX;
        yInic = evt.clientY;
        estaPulsado = true;
        //Para Internet Explorer
        document.getElementById("dialogElv").unselectable = true;
    }

    function ratonMovido(evt) {
        if (estaPulsado) {
            //Calcular la diferencia de posición
            var xActual = evt.clientX;
            var yActual = evt.clientY;
            var xInc = xActual - xInic;
            var yInc = yActual - yInic;
            xInic = xActual;
            yInic = yActual;
            //Establecer la nueva posición
            var elemento = document.getElementById("dialogElv");
            var position = getPosicion(elemento);
            elemento.style.top = (position[0] + yInc) + "px";
            elemento.style.left = (position[1] + xInc) + "px";
        }
    }

    function ratonSoltado(evt) {
        estaPulsado = false;
    }
    /*
     * Función para obtener la posición en la que se encuentra el
     * elemento indicado como parámetro.
     * Retorna un array con las coordenadas x e y de la posición
     */

    function getPosicion(elemento) {
        var posicion = new Array(2);
        if (document.defaultView && document.defaultView.getComputedStyle) {
            posicion[0] = parseInt(document.defaultView.getComputedStyle(elemento, null).getPropertyValue("top"));
            posicion[1] = parseInt(document.defaultView.getComputedStyle(elemento, null).getPropertyValue("left"));
        } else {
            //Para Internet Explorer
            posicion[0] = parseInt(elemento.currentStyle.top);
            posicion[1] = parseInt(elemento.currentStyle.left);
        }
        return posicion;
    }
    // -----------------------------------------------------------------------
    // creamos el estilo 
    function crearEstiloOnline(codigo) {
        var estilos = document.createElement("style");
        estilos.type = "text/css";

        if (estilos.styleSheet) {
            estilos.styleSheet.cssText = codigo;
        } else {
            estilos.appendChild(document.createTextNode(codigo));
        }

        document.getElementsByTagName("head")[0].appendChild(estilos);
    }
    // Estilo para nuestro textarea
    crearEstiloOnline("#corrector {" +
        "background: url(elinv.png) center center no-repeat;" +
        "background:#009E37;" +
        "color:#FFFFFF;" +
        "border:4px solid #962626;" +
        "border-radius:24px ;" +
        "font-size:18px ;" +
        "width: 170px ;" +
        "height: 360px" +
        "padding: 25px ;" +
        "box-shadow: 8px 7px 15px #000000;" +
        "-webkit-box-shadow: 8px 7px 15px #000000;" +
        "-moz-box-shadow: 8px 7px 15px #000000;" +
        " z-index: 1000000;" +
        "overflow-y: auto;" +
        "}" +
        "#corrector:focus {" +
        "background: rgb(202, 200, 200);" +
        "color: #000000;" +
        "box-shadow: 5px 5px 15px 5px #000000;" +
        "outline: none;" +
        "}"
    );
    // -----------------------------------------------------------------------


    // función para crear el corrector
    function crearCorrector(callback) {
        var div = document.createElement("div");
        div.textContent = "";
        div.setAttribute('id', 'dialogElv');

        div.style['top'] = "150px";
        div.style['left'] = "27px";
        div.style.position = "fixed";

        div.style.visibility = "hidden";
        // agregamos último
        document.body.appendChild(div);
        // agregamos primero
        //document.body.prepend(div);

        var x = document.createElement("TEXTAREA");
        var t = document.createTextNode(chrome.i18n.getMessage("corrector_Help")); //

        x.appendChild(t);
        x.setAttribute('id', 'corrector');
        x.setAttribute('cols', 30);
        x.setAttribute('rows', 13);

        var divCorrect = document.getElementById("dialogElv");
        divCorrect.appendChild(x);

        callback();
    }
    // forma de usar
    crearCorrector(correctorCargado);
    // --------------------------------------------------
    function correctorCargado() {
        // asignamos funcionalidad
        document.getElementById("corrector").addEventListener("dblclick", vaciarTA);

        var el = document.getElementById("dialogElv");
        if (el.addEventListener) {
            el.addEventListener("mousedown", ratonPulsado, false);
            el.addEventListener("mouseup", ratonSoltado, false);
            document.addEventListener("mousemove", ratonMovido, false);
        } else { //Para IE
            el.attachEvent('onmousedown', ratonPulsado);
            el.attachEvent('onmouseup', ratonSoltado);
            document.attachEvent('onmousemove', ratonMovido);
        }

        // --------------------------------------------------------------
        // Para grabación y recuperación en storage local
        // --------------------------------------------------------------
        var contentBox = document.querySelector("#corrector");

        // cuando pierde el foco, graba
        contentBox.addEventListener("blur", () => {
            // solo si hay información
            if (contentBox.value !== "") {
                grabarNota();
            }
        });
        // cuando recupera el foco, actualizar contenido desde el storage local
        contentBox.addEventListener("focus", () => {
            recuperarNota();
        });

        const baseElv = browser.storage.local;
        // informa cualquier error
        function onError(error) {
            alert(error);
        }

        function setItem() {
            // titulo original del documento
            var titOrig = document.title;
            // titulo que durará 5 segundos
            document.title = chrome.i18n.getMessage("recordatorioSaveMiniPad");
            setTimeout(function () {
                // volvemos al titulo original
                document.title = titOrig;
            }, 5000)
        }
        // función para grabar la nota
        function grabarNota() {
            // el texto a grabar
            paramNota = contentBox.value;
            // variable y objeto
            var elvURL = window.location;
            var elvOBJETO = {};
            elvOBJETO[elvURL] = paramNota;
            // grabamos el objeto
            baseElv.set(elvOBJETO)
                .then(setItem, onError);
        }

        // ----------------------------------------
        function recuperarNota() {
            baseElv.get(function (result) {
                var paramUrl = window.location;
                contentBox.value = "";
                for (var i in result) {
                    // Si i es igual a la url completa y el resultado no es nulo o indefinido
                    if (i.localeCompare(paramUrl) === 0) {
                        contentBox.value = result[i];
                    }
                }
            });
        }

        //limpiar storage
        //cleanStorage();
        // ----------------------------------------
        function cleanStorage() {
            baseElv.clear();
        }
        // --------------------------------------------------------------
        // --------------------------------------------------------------    
    }

    // Vaciamos el textArea
    function vaciarTA() {
        document.getElementById("corrector").value = "";
    }
    // -----------------------------------------------------------------------
}();