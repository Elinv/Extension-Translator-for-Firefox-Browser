/* eslint-disable max-len */
(function() {
    // variable Global id Tab Traductor google
    let idGoogleIN;
    // variable Global id Tab destino de la traducción
    let idTabDestino;
    let winIdTabDestino;
    // variables globales contienen las letras de los idiomas
    let codigoDestinoVar = '';
    let seletRapida = false;

    // ---------------------------------------------------
    // solo en googleeditorconfig
    const tradEnGoogleArr = {
        traduce_en_el_lugar: 0,
        traduce_en_google: 1,
        traduce_web_completa: 2,
        multitraduccion: 3,
        demas_formas_de_info_posible: 4,
    };
    let tradEnGoogle = tradEnGoogleArr.traduce_en_el_lugar;
    // ---------------------------------------------------
    // texto seleccionado
    let textoSelectMultitrad = [];
    // Array con los idiomas a traducir en la multitraducción
    let idiomSelRec = [];
    // Array con los códigos
    let codIdiomSelRec = [];
    // tab de eleccion de idiomas
    let tabTrad = -1;
    // ---------------------------------------------------
    // para otro tipo de información sobre el texto seleccionado
    const tipoDeInformArr = {
        buscar_en_google: 'buscar_en_google',
        definicion_en_google: 'definicion_en_google',
        buscar_en_wikipedia: 'buscar_en_wikipedia',
        wordreference: 'wordreference',
        que_significa: 'que_significa',
    };
    let tipoDeInform = '';
    // ---------------------------------------------------
    /**
     * Establece en selección el idioma destino de traducción
     */
    function obtieneIdiomas() {
        // variables matriz bidimensional con idioma destino.
        const idiomasDestinoArr = [
            ['xx', 'Elegir Idioma'],
            ['auto', 'Browser language'],
            ['af', 'Afrikaans'],
            ['sq', 'Albanés'],
            ['de', 'Alemán'],
            ['ar', 'Arabe'],
            ['hy', 'Armenio'],
            ['az', 'Azerbaiyani'],
            ['bn', 'Bengalí'],
            ['be', 'Bielorruso'],
            ['my', 'Birmano'],
            ['bs', 'Bosnio'],
            ['bg', 'Búlgaro'],
            ['ca', 'Catalán'],
            ['ceb', 'cebuano'],
            ['cs', 'Checo'],
            ['ny', 'Chichewa'],
            ['zh-CN', 'Chino (Tradicional)'],
            ['zh-TW', 'Chino (Simplificado)'],
            ['ko', 'Coreano'],
            ['ht', 'Criollo Haitiano'],
            ['hr', 'Croata'],
            ['da', 'Danés'],
            ['sk', 'Eslovaco'],
            ['sl', 'Esloveno'],
            ['es', 'Español'],
            ['eo', 'Esperanto'],
            ['et', 'Estonio'],
            ['tl', 'Filipino'],
            ['fi', 'Finlandés'],
            ['fr', 'Francés'],
            ['cy', 'Galés'],
            ['gl', 'Gallego'],
            ['ka', 'Georgiano'],
            ['el', 'Griego'],
            ['gu', 'Gujaratí'],
            ['ha', 'Hausa'],
            ['iw', 'Hebreo'],
            ['hi', 'Hindi'],
            ['hmn', 'Hmong'],
            ['nl', 'Holandés'],
            ['hu', 'Húngaro'],
            ['ig', 'Igbo'],
            ['id', 'Indonesio'],
            ['en', 'Inglés'],
            ['ga', 'Irlandés'],
            ['is', 'Islandés'],
            ['it', 'Italiano'],
            ['ja', 'Japonés'],
            ['jw', 'Javanés'],
            ['km', 'Jemer'],
            ['kn', 'Kannada'],
            ['kk', 'Kazajo'],
            ['lo', 'Lao'],
            ['la', 'Latín'],
            ['lv', 'Letón'],
            ['lt', 'Lituano'],
            ['mk', 'Macedonio'],
            ['ml', 'Malayalam'],
            ['ms', 'Malayo'],
            ['mg', 'Malgache'],
            ['mt', 'Maltés'],
            ['mi', 'Maorí'],
            ['mr', 'Maratí'],
            ['mn', 'Mongol'],
            ['ne', 'Nepalés'],
            ['no', 'Noruego'],
            ['fa', 'Persa'],
            ['pl', 'Polaco'],
            ['pt', 'Portugues'],
            ['pa', 'Punjabí'],
            ['ro', 'Rumano'],
            ['ru', 'Ruso'],
            ['sr', 'Serbio'],
            ['st', 'Sesotho'],
            ['si', 'Singalés'],
            ['so', 'Somalí'],
            ['sv', 'Sueco'],
            ['su', 'Sundanés'],
            ['sw', 'Swahili'],
            ['th', 'Tailandés'],
            ['tg', 'Tajik'],
            ['ta', 'Tamil'],
            ['te', 'Telugu'],
            ['tr', 'Turco'],
            ['uk', 'Ucraniano'],
            ['ur', 'Urdu'],
            ['uz', 'Uzbeco'],
            ['eu', 'Vasco'],
            ['vi', 'Vietnamita'],
            ['yi', 'Yiddish'],
            ['yo', 'Yoruba'],
            ['zu', 'Zulú'],
        ];
        // ---------------------------------------------------
        // idiomas -> select name="idOrigen"
        const cslGet = chrome.storage.local.get;
        // select name="idDestino"
        // idioma de destino de la traducción conforme elección del usuario
        cslGet('idDestino', (res) => {
            i = res.idDestino || 1;
            // si aun no seleccionó ninguna opción,
            // le asignamos el por defecto del navegador
            if (i == 1) {
                // obtenemos el lenguaje del navegador
                let idioma = navigator.language || navigator.userLanguage;
                // solo las dos primeras letras
                idioma = idioma.substring(0, 2);
                // asignamos
                codigoDestinoVar = idioma;
                // hallamos el nombre del lenguaje del navegador en base a su clave
                for (prop in idiomasDestinoArr) {
                    if (idiomasDestinoArr[prop][0] === 'es') {
                        break;
                    }
                }
            } else {
                // sino selección del usuario
                codigoDestinoVar = idiomasDestinoArr[i][0];
            }
        });
    }

    // preparación a futuro
    // Organizamos el código de acuerdo al tipo de equipo donde se ejecutará
    // ---------------------------------------------------
    if (navigator.userAgent.match(/Tablet|iPad/i)) {
        // Es una table
    } else if (
        navigator.userAgent.match(
            // eslint-disable-next-line max-len
            /Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i
        )
    ) {
        // Es un móvil
    } else {
        // Escritorio
        escritorio();
    }
    // -------------------------------------------
    /**
     * si nuestra extensión se ejecuta en una plataforma de escritorio
     */
    function escritorio() {
        // ------------------------------------------------------
        /**
         * Para preparar las opciones
         */
        function handleClick() {
            // chrome.runtime.openOptionsPage();
            /**
             * Si Options Page fue abierto
             */
            function onOpened() {
                // console.log(`Options page opened`);
            }
            /**
             * Si en la apertura de Options Page se produjo un error
             * @param {string} error => El error.
             */
            function onError(error) {
                // console.log(`Error: ${error}`);
            }

            const opening = browser.runtime.openOptionsPage();
            opening.then(onOpened, onError);
        }
        chrome.browserAction.onClicked.addListener(handleClick);
        // ------------------------------------------------------

        // ------------------------------------------------------
        // funciones para tab.executeScript
        // MARK: gSE
        const gSE = `var gSE = (opc) => {
         let cfg = { ta: "TEXTAREA", inp: "INPUT", txt: "text", ifr: "IFRAME" };
         let docA = document.activeElement;
         let getSel = window.getSelection();
         if (getSel && docA) {
            if (docA.nodeName == cfg.ta ||
               (docA.nodeName == cfg.inp &&
               docA.getAttribute("type").toLowerCase() == cfg.txt)) {
                  let result = opc === 0 ? docA.value.substring(docA.selectionStart, docA.selectionEnd) : docA;
                  return result;
               // si es un iframe
            } else if (docA.nodeName == cfg.ifr) {
               // si tenemos el id del iframe
               var ifr = document.getElementById(document.activeElement.id);
               // si el id es nulo vemos por el name[0]
               if(!ifr){
                  ifr = document.getElementsByName(document.activeElement.name)[0];
               }
               let txtPro = ifr.contentDocument.getSelection().toString();               
               if (txtPro.length > 0) {
                  let result = opc === 0 ? txtPro : ifr;
                  return result;
               } else {
                  let iDocAE = ifr.contentDocument.activeElement;
                  if (
                     iDocAE.nodeName == cfg.ta ||
                     (iDocAE.nodeName == cfg.inp &&
                        iDocAE.getAttribute("type").toLowerCase() == cfg.txt)
                  ) {
                     // texto seleccionado en control textarea de iframe
                     let textSelIfr = iDocAE.value.substring(iDocAE.selectionStart,iDocAE.selectionEnd);
                     let result = opc === 0 ? textSelIfr : iDocAE;
                     return result;
                  }
                  // si es otro iframe adentro
                  if (iDocAE.nodeName == cfg.ifr){
                     let ifrOtro = iDocAE.contentDocument;
                     let txtIfrOtro = iDocAE.contentDocument.getSelection().toString();
                     if (txtIfrOtro.length > 0) {
                        let result = opc === 0 ? txtIfrOtro : iDocAE;
                        return result;
                     }
                  }
               }
            } else {
               let result = opc === 0 ? getSel : document;
               return result;
            }
         }
      };`;
        // ------------------------------------------------------
        // MARK: insertText
        const insertText = `
         function insertText(input, text) {
            if (input == undefined) {
               return;
            }
            var scrollPos = input.scrollTop;
            var pos = 0;
            var browser = ((input.selectionStart || input.selectionStart == '0') ?
            'ff' : (document.selection ? 'ie' : false));
            if (browser == 'ff') {
               pos = input.selectionStart
            };
            var front = (input.value).substring(0, pos);
            var back = (input.value).substring(pos, input.value.length);
            input.value = front + "✅" + text + "🌀️" + back;
            pos = pos + text.length;
            if (browser == 'ff') {
               input.selectionStart = pos;
               input.selectionEnd = pos;
               input.focus();
            }
            input.scrollTop = scrollPos;
         }
         `;
        // ------------------------------------------------------

        // ------------------------------------------------------
        // ACCIONES DEL MENU CONTEXTUAL
        // ------------------------------------------------------
        // El detector de eventos click del menu contextual.
        chrome.contextMenus.onClicked.addListener(function(info, tab) {
            // vaciamos la matriz de idiomas
            idiomSelRec = [];
            switch (info.menuItemId) {
            case 'trad_Selec_elinv_IN':
                // obtenemos el idioma destino actualizado para traducir.
                if (seletRapida == false) {
                    obtieneIdiomas();
                }
                idTabDestino = tab.id;
                winIdTabDestino = tab.windowId;
                tradEnGoogle = tradEnGoogleArr.traduce_en_el_lugar;
                obtieneSeleccion();
                break;
            case 'trad_Selec_elinv_OUT':
                // obtenemos el idioma destino actualizado para traducir.
                if (seletRapida == false) {
                    obtieneIdiomas();
                }
                tradEnGoogle = tradEnGoogleArr.traduce_en_google;
                obtieneSeleccion();
                break;
            case 'trad_Pag_elinv':
                // obtenemos el idioma destino actualizado para traducir.
                if (seletRapida == false) {
                    obtieneIdiomas();
                }
                tradEnGoogle = tradEnGoogleArr.traduce_web_completa;
                traducirWebEntera();
                break;
            case 'multitraduccion':
                idTabDestino = tab.id;
                winIdTabDestino = tab.windowId;
                tradEnGoogle = tradEnGoogleArr.multitraduccion;
                obtieneSeleccion();
                break;
            case 'buscar_en_google':
                tradEnGoogle = tradEnGoogleArr.demas_formas_de_info_posible;
                tipoDeInform = tipoDeInformArr.buscar_en_google;
                obtieneSeleccion('buscar_en_google');
                break;
            case 'definicion_en_google':
                tradEnGoogle = tradEnGoogleArr.demas_formas_de_info_posible;
                tipoDeInform = tipoDeInformArr.definicion_en_google;
                obtieneSeleccion('definicion_en_google');
                break;
            case 'buscar_en_wikipedia':
                tradEnGoogle = tradEnGoogleArr.demas_formas_de_info_posible;
                tipoDeInform = tipoDeInformArr.buscar_en_wikipedia;
                obtieneSeleccion('buscar_en_wikipedia');
                break;
            case 'wordreference':
                tradEnGoogle = tradEnGoogleArr.demas_formas_de_info_posible;
                tipoDeInform = tipoDeInformArr.wordreference;
                obtieneSeleccion('wordreference');
                break;
            case 'que_significa':
                tradEnGoogle = tradEnGoogleArr.demas_formas_de_info_posible;
                tipoDeInform = tipoDeInformArr.que_significa;
                obtieneSeleccion('que_significa');
                break;
            }
        });
        // ---------------------------------------------------

        // ---------------------------------------------------
        // ELEMENTOS DEL MENU CONTEXTUAL
        // ---------------------------------------------------
        // Function arrow autoejecutable
        (() => {
            // Elemento visible solo si existe selección
            // para traducir selección y reemplazar en el mismo lugar
            chrome.contextMenus.create(
                {
                    id: 'trad_Selec_elinv_IN', // Identificador
                    icons: {
                        '256': 'ico/selectIN.png',
                    },
                    title: chrome.i18n.getMessage('trad_sel'), // traducción
                    contexts: ['selection'], // "all" "page", "selection", "image", "link"
                },
                onCreated
            );
            // Elemento visible solo si existe selección
            // para traducir selección en la página de google
            chrome.contextMenus.create(
                {
                    id: 'trad_Selec_elinv_OUT', // Identificador
                    icons: {
                        '256': 'ico/selectOUT.png',
                    },
                    title: chrome.i18n.getMessage('trad_sel_OUT'), // traducción
                    contexts: ['selection'],
                },
                onCreated
            );
            // Elemento permanente para traducir web entera
            chrome.contextMenus.create(
                {
                    id: 'trad_Pag_elinv', // Identificador
                    icons: {
                        '256': 'ico/firefox.png',
                    },
                    title: chrome.i18n.getMessage('trad_pag'), // traducción
                    contexts: ['all'],
                },
                onCreated
            );
            // idiomas para selección rápida
            const idiDestArrSelRap = [
                ['sinSel', 'Quick Selection'],
                ['en', 'English ~ Inglés'],
                ['es', 'Spanish ~ Español'],
                ['fr', 'French ~ Francés'],
                ['it', 'Italian ~ Italiano'],
                ['zh-CN', 'Chinese (Traditional) ~ Chino (Tradicional)'],
                ['zh-TW', 'Chinese (Simplified) ~ Chino (Simplificado)'],
                ['ko', 'Korean ~ Coreano'],
                ['ja', 'Japanese ~ Japonés'],
                ['ru', 'Russian ~ Ruso'],
                ['nl', 'Dutch ~ Holandés'],
                ['tr', 'Turkish ~ Turco'],
                ['pt', 'Portuguese ~ Portugues'],
                ['pl', 'Polish ~ Polaco'],
                ['af', 'Afrikaans ~ Afrikaans'],
                ['de', 'German ~ Alemán'],
                ['ar', 'Arab ~ Arabe'],
                ['ca', 'Catalan ~ Catalán'],
                ['gl', 'Galician ~ Gallego'],
                ['iw', 'Hebrew ~ Hebreo'],
            ];

            // aqui van los idiomas
            browser.contextMenus.create({
                id: 'languages_Translator_Elinv',
                title: 'Languages (Quick selection)',
                contexts: ['all'],
            });

            // recorrer array de idiomas
            const tot = idiDestArrSelRap.length;
            for (let i = 0; i < tot; i++) {
                browser.contextMenus.create({
                    id: 'iTE_' + idiDestArrSelRap[i][1],
                    parentId: 'languages_Translator_Elinv',
                    title: '' + idiDestArrSelRap[i][1],
                    contexts: ['all'],
                    type: 'radio',
                    onclick: function() {
                        codigoDestinoVar = idiDestArrSelRap[i][0];
                        // sin selección rapida
                        const sinSel = 'sinSel';
                        if (idiDestArrSelRap[i][0] == sinSel) {
                            seletRapida = false;
                        } else {
                            seletRapida = true;
                        }
                    },
                });
            }
            // Elemento visible solo si existe selección
            // Multitraducción
            chrome.contextMenus.create(
                {
                    id: 'multitraduccion',
                    icons: {
                        '256': 'ico/lampara.png',
                    },
                    title: chrome.i18n.getMessage('multitraduccion'),
                    contexts: ['selection'],
                },
                onCreated
            );
            // ---------------------------------------------------
            // ---------------------------------------------------
            // ZONA DE INFORMACION -> SOLO si existe selección
            // Buscar en Google
            chrome.contextMenus.create(
                {
                    id: 'buscar_en_google',
                    icons: {
                        '256': 'ico/google.png',
                    },
                    title: chrome.i18n.getMessage('buscar_en_google'),
                    contexts: ['selection'],
                },
                onCreated
            );
            // Definición en Google
            chrome.contextMenus.create(
                {
                    id: 'definicion_en_google',
                    icons: {
                        '256': 'ico/google1.png',
                    },
                    title: chrome.i18n.getMessage('definicion_en_google'),
                    contexts: ['selection'],
                },
                onCreated
            );
            // Buscar en wikipedia
            chrome.contextMenus.create(
                {
                    id: 'buscar_en_wikipedia',
                    icons: {
                        '256': 'ico/wikipedia.png',
                    },
                    title: chrome.i18n.getMessage('buscar_en_wikipedia'),
                    contexts: ['selection'],
                },
                onCreated
            );
            // En wordreference
            chrome.contextMenus.create(
                {
                    id: 'wordreference',
                    icons: {
                        '256': 'ico/wordreference.png',
                    },
                    title: chrome.i18n.getMessage('wordreference'),
                    contexts: ['selection'],
                },
                onCreated
            );
            // En que_significa
            chrome.contextMenus.create(
                {
                    id: 'que_significa',
                    icons: {
                        '256': 'ico/Argentina.png',
                    },
                    title: chrome.i18n.getMessage('que_significa'),
                    contexts: ['selection'],
                },
                onCreated
            );
        })();
        // ---------------------------------------------------

        // ---------------------------------------------------
        /**
         * Para obtener  el texto seleccionado por el usuario
         */
        function obtieneSeleccion() {
            /**
             * Resultado de browser.tabs.executeScript.
             * @param {string} result => contendrá la selección del usuario.
             */
            function ejecutado(result) {
                // Para el item Multitraducción
                if (tradEnGoogle === tradEnGoogleArr.multitraduccion) {
                    // solo si existe una palabra o párrafo seleccionado
                    if (result[0].split('~').length === 2) {
                        multitraductor('obtenida_Seleccion', result);
                    } else {
                        // mensaje al usuario
                    }
                    // para todas las formas de traducción posible
                } else if (
                    tradEnGoogle ===
                    tradEnGoogleArr.demas_formas_de_info_posible
                ) {
                    infoELINV(result.toString());
                } else {
                    // MARK: TRADUCION CORREGIR
                    // traduce automáticamente detectando el idioma del texto original al
                    // idioma del navegador si no se ha seleccionado en las opciones otro idioma
                    const urlTRADUC =
                        'https://translate.google.com/?elinv=traduc&hl=auto&sl=auto' +
                        '&tl=' +
                        codigoDestinoVar +
                        '&text=' +
                        result.toString();

                    chrome.tabs.create(
                        {
                            url: chrome.extension.getURL(urlTRADUC),
                        },
                        function(tab) {
                            // tab.id translate google
                            idGoogleIN = tab.id;
                        }
                    );
                }
            }
            // -----
            const seleccion = `
                           var provi = 0; ${gSE}
                           var sel = gSE(0);
                           if (sel.rangeCount) {
                              var container = document.createElement(\"div\");
                              var len = sel.rangeCount;
                              for (var i = 0; i < len; ++i) {
                                 container.appendChild(sel.getRangeAt(i).cloneContents());
                                 var espacio = document.createTextNode(\"~\");
                                 container.appendChild(espacio);
                              }
                              provi = container.textContent;
                           }else{
                              provi = sel;
                           }
                           `;
            const ejecutaScript = browser.tabs.executeScript({
                code: seleccion,
            });
            ejecutaScript.then(ejecutado, conError);
        }
        // ---------------------------------------------------

        // ---------------------------------------------------
        /**
         * Función para traducir web integra
         */
        function traducirWebEntera() {
            /**
             * resultado del browser.tabs.executeScript
             * para obtener la url a traducir como web entera.
             * @param {string} result => contendrá la url a traducir.
             */
            function ejecutado(result) {
                // console.log(result.toString());
            }
            const seleccion = `
                           var res = window.location.href;
                           chrome.runtime.sendMessage({
                              url: res
                           });
                           `;
            const ejecutaScript = browser.tabs.executeScript({
                code: seleccion,
            });
            ejecutaScript.then(ejecutado, conError);
        }
        // ---------------------------------------------------

        // MENSAJES DEL TAB TRANSLATE.GOOGLE.COM
        // ---------------------------------------------------
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            // make sure the status is 'complete' and it's the right tab
            if (
                tab.url.indexOf(
                    'https://translate.google.com/?elinv=traduc&'
                ) != -1 &&
                changeInfo.status == 'complete' &&
                tradEnGoogle !== tradEnGoogleArr.multitraduccion
            ) {
                // traduce en el lugar de origen
                let respuesta;
                if (tradEnGoogle === tradEnGoogleArr.traduce_en_el_lugar) {
                    respuesta = `
                                 // obtener los nodos traducidos
                                 function obtTrad(ant="") {
                                    var resp = '';
                                    setTimeout(function () {
                                       var res2 = document.getElementsByClassName('result-shield-container');
                                       if (res2[0]) {
                                          resp = res2[0].textContent;
                                          if (ant === resp) {
                                             chrome.runtime.sendMessage({
                                                datos: resp
                                             });
                                             return;
                                          }
                                          obtTrad(resp);
                                       } else {
                                       obtTrad();
                                       }
                                    }, 1000);
                                 }
                                 // inicio
                                 obtTrad();                    
                                 `;
                } else if (tradEnGoogle === tradEnGoogleArr.traduce_en_google) {
                    // traduce en la pagina de Google
                    respuesta = `
                        var source = document.getElementById("source").value;
                        // nuestro tag por el salto de linea
                        var saltodelinea = source.replace(/~/gi, "\\n");
                        // asignamos el resultado al campo source del traductor
                        document.getElementById("source").value = saltodelinea;                        
                        `;
                }
                const ejecutaScript = browser.tabs.executeScript({
                    code: respuesta,
                });
                ejecutaScript.then(ejecutado, conError);
                /**
                 * resultado de browser.tabs.executeScript anterior
                 * @param {string} result => contendrá texto traducido.
                 */
                function ejecutado(result) {
                    // console.log(result.toString());
                }
            }
        });
        // ---------------------------------------------------

        // ---------------------------------------------------
        /**
         * Controlando datos recibidos
         * @param {string} message => puede contener url o datos
         */
        function mensajes(message) {
            // traducir web entera
            if (tradEnGoogle === tradEnGoogleArr.traduce_web_completa) {
                // traducimos
                const pagInglesEsp =
                    'http://translate.google.com/translate?elinv=traduc&sl=auto&tl=' +
                    codigoDestinoVar +
                    '&u=' +
                    encodeURIComponent(message.url);
                try {
                    /**
                     * Si el tab fue creado
                     * @param {string} tab => info del tab creado
                     */
                    function onCreated(tab) {
                        // console.log(`Created new tab: ${tab.id}`)
                    }
                    // crea el tab de traducción
                    const creating = browser.tabs.create({
                        url: pagInglesEsp,
                    });
                    creating.then(onCreated, conError);
                } catch (err) {
                    // console.log("Error: " & err.message);
                }
            } else if (tradEnGoogle === tradEnGoogleArr.traduce_en_el_lugar) {
                // Traduce en el lugar
                // foco al tab y win que origina la solicitud
                // ------------------------------------------
                browser.windows.update(winIdTabDestino, {
                    focused: true,
                });
                const updating = browser.tabs.update(idTabDestino, {
                    active: true,
                });
                // si se produjo el foco entonces...
                updating.then(onUpdated, conError);
                // accionamos
                /**
                 * Si se actualizó algún tab
                 * @param {string} tab => info del tab actualizado
                 */
                function onUpdated(tab) {
                    // console.log(`Updated tab: ${tab.id}`);
                    // console.log(message.datos);
                    /**
                     * Resultado de browser.tabs.executeScript.
                     * @param {string} result => información acerca de la inserción de resultados.
                     */
                    function ejecutado(result) {
                        // console.log(result.toString());
                    }
                    const seleccion =
                        // MARK: GET SELECCION
                        `
                    // obtenemos la variable
                    var respuesta ="${message.datos}";
                    // separamos para respuesta
                    var res = respuesta.split("~");
                    // aquí los elementos previamente seleccionados
                    ${gSE}
                    var sel = gSE(0);
                    //console.log(sel.rangeCount);
                     if (sel.rangeCount) {
                        // total de elementos
                        var tot = sel.rangeCount;                
                        // ahora reemplazamos por la traducción
                        for (var i = 0; i < tot; ++i) {
                           let rango = sel.getRangeAt(i);
                           // texto original a traducir
                           let textOriginal = rango.toString();
                           rango.deleteContents();                    
                           html =
                              '<a title= "😊 ' +
                              textOriginal +
                              '" href="https://www.google.com.ar/search?q=' +
                              textOriginal +
                              '+definition" target="_blank">✅' +
                              res[i].trim() +
                              "</a>";    
                           // texto traducido
                           let node = rango.createContextualFragment(html);
                           rango.insertNode(node);    
                        }
                     }else{
                        ${insertText}
                        var elem = gSE(1);
                        // si es un iframe
                        if(elem.nodeName == "IFRAME"){
                           let sel = elem.contentDocument.getSelection();
                           let rango = sel.getRangeAt(0);
                           // texto original a traducir
                           let textOriginal = rango.toString();  
                           rango.deleteContents();
                           let html =
                              '<a title= "😊 ' +
                              textOriginal +
                              '" href="https://www.google.com.ar/search?q=' +
                              textOriginal +
                              '+definition" target="_blank">✅' +
                              respuesta +
                              "</a>";                            
                           let node = rango.createContextualFragment(html);
                           rango.insertNode(node);
                        }else{
                           insertText(elem, " " + respuesta + " ");
                        }
                     }
                  `;
                    const ejecutaScript = browser.tabs.executeScript({
                        code: seleccion,
                    });
                    ejecutaScript.then(ejecutado, conError);
                }
                // ------------------------------------------
                // chrome.tabs.remove(idGoogleIN, onRemoved());
                const removing = browser.tabs.remove(idGoogleIN);
                removing.then(onRemoved, conError);
            } else if (tradEnGoogle === tradEnGoogleArr.multitraduccion) {
                // foco al tab y win que origina la solicitud
                // ------------------------------------------
                browser.windows.update(winIdTabDestino, {
                    focused: true,
                });
                const updating = browser.tabs.update(idTabDestino, {
                    active: true,
                });
                // si se produjo el foco entonces...
                updating.then(onUpdatedMultitrad, conError);
                // accionamos
                /**
                 * Se recibe el resultado de la multitraducción
                 * @param {string} tab => info del tab
                 */
                function onUpdatedMultitrad(tab) {
                    if (message.setResultMultiTrad) {
                        /**
                        * Si el reemplazo se produjo exitosamente.
                        * @param {string} result => resultado obtenido.
                        */
                        function ejecutadoMultitrad(result) {
                            // console.log(result.toString());
                        }
                        // MARK: multitraduccion
                        const selecMultitrad = `
                     // obtenemos la multitraducción
                     var respuesta = '${message.setResultMultiTrad}';
                     // separamos para respuesta
                     var res = respuesta.split('~');
                     // aquí el elemento previamente seleccionado
                     ${gSE}
                     var sel = gSE(0);                            
                     // total de idiomas traducidos
                     var tot = ${idiomSelRec.length};
                     // para crear los párrafos de inserción
                     var html = '';
                     // palabra o texto seleccionado
                     var rango = sel.getRangeAt(0);
                     // texto original a traducir
                     var textOriginal = rango.toString();                                                    
                     rango.deleteContents();
                     // idiomas y codigos seleccionados a string
                     var idiomSelRecExEsc = '${idiomSelRec.toString()}';
                     var codIdiomSelRecExEsc = '${codIdiomSelRec.toString()}';
                     // una vez inyectado nuevamente en arrays
                     var idiomSelRecExEscArr = idiomSelRecExEsc.split(',');
                     var codIdiomSelRecExEscArr = codIdiomSelRecExEsc.split(',');                          
                     // ahora creamos reemplazos traducción
                     for (var i = 0; i < tot; ++i) {
                        // formamos el link reemplazo
                        html += '<a title= "' +
                           textOriginal + ' => 😊 ' + idiomSelRecExEscArr[i] + '(' + codIdiomSelRecExEscArr[i] + ')' +
                           '" href="https://www.google.com.ar/search?q=' +
                           textOriginal +
                           '+definition" target="_blank">️️✅ ' +
                           res[i].trim() +
                           '</a>  | ';
                     }
                     // agrega links con textos traducidos y title ayuda
                     var node = rango.createContextualFragment(html);
                     rango.insertNode(node);
                     `;
                        const ejecutaScriptMultitrad = browser.tabs.executeScript(
                            {
                                code: selecMultitrad,
                            }
                        );
                        ejecutaScriptMultitrad.then(
                            ejecutadoMultitrad,
                            conError
                        );
                    }
                }
                // ------------------------------------------
                // ------------------------------------------
                /**
                * Si el tab de google utilizado para traducir fué removido.
                * @param {string} msgResultado => resultado de la operación
                */
                function onRemoved(msgResultado) {
                    // console.log("Resultado " + msgResultado);
                }
                // multitraducción
                // si se trata de una multitraducción
                if (typeof message.idiomasMultitrad !== 'undefined') {
                    // Array con idiomas y los códigos
                    idiomSelRec = message.idiomasMultitrad;
                    codIdiomSelRec = message.codigoOpciones;
                    multitraductor(
                        'obtenido_Idiomas',
                        idiomSelRec,
                        codIdiomSelRec
                    );
                }
                if (typeof message.url == 'undefined') {
                    // console.log("message.url es undefined");
                } else {
                    const urlTraduce = message.url.toString();
                    const indice = urlTraduce.indexOf('translate.google');
                    if (message.datos == 'traductor Elinv' && indice > 0) {
                        // removemos el tab usado para traducir solo si
                        if (idGoogleIN >= 0) {
                            chrome.tabs.remove(
                                idGoogleIN,
                                onRemoved(message.setResult)
                            );
                        }
                    }
                }
            }
        }
        chrome.runtime.onMessage.addListener(mensajes);
        // ---------------------------------------------------

        // ---------------------------------------------------------------------
        // INICIO APARTADO MULTITRADUCCION
        // ---------------------------------------------------------------------
        // función propiamente
        /**
        * Función propiamente dicha del apartado de multitraducción
        * @param {string} estado => si fue obtenida la selección.
        * @param {string} infoMultitrad => texto a traducir.
        * @param {string} info1Multitrad => claves idiomas destino.
        */
        function multitraductor(estado, infoMultitrad, info1Multitrad = 0) {
            // ---------------------------------------------------------------------
            // primera etapa obtenida la selección, buscamos los idiomas a traducir
            if (estado.localeCompare('obtenida_Seleccion') === 0) {
                // pasamos la selección a la variable global
                textoSelectMultitrad = infoMultitrad;
                // Obtener el array destino que contiene
                // todos los idiomas para traducir
                // -> panel.html --> script de acción -> selIdiomas.js

                try {
                    /**
                    * si fue creado el tab de traducción
                    * @param {string} tab => info del tab
                    */
                    function onCreated(tab) {
                        // console.log(`Panel de Idiomas: ${tab.id}`)
                        tabTrad = tab.id;
                    }
                    // crea el tab de traducción
                    const creating = browser.tabs.create({
                        url: './panel/panel.html',
                    });
                    creating.then(onCreated, conError);
                } catch (err) {
                    // console.log("Error: " & err.message);
                }
            }
            // segunda etapa obtenemos los idiomas destinos
            if (estado.localeCompare('obtenido_Idiomas') === 0) {
                // obtenemos las claves
                codIdiomSelRec = info1Multitrad;
                // console.log(info1Multitrad); // claves
                // console.log(textoSelectMultitrad); // texto seleccionado
                // console.log(infoMultitrad.toString()); // idiomas
                // obtenida la información cerramos el tab
                if (tabTrad >= 0) {
                    chrome.tabs.remove(tabTrad, onRemoved());
                }
                // idioma de origen detecta automático
                const urlTRAD = 'https://translate.google.com/';
                try {
                    /**
                    * Abrimos el tab de traducción
                    * @param {objeto} tab => id del tab a la variable global.
                    */
                    function onCreatedMultitrad(tab) {
                        // asignamos el id del tab a la variable global google
                        idGoogleIN = tab.id;

                        browser.tabs.executeScript(
                            tab.id,
                            {
                                file: './panel/multitradScript.js',
                            },
                            function() {
                                chrome.tabs.sendMessage(tab.id, {
                                    codIdiomSelRec:
                                        codIdiomSelRec +
                                        '~' +
                                        textoSelectMultitrad,
                                });
                            }
                        );
                    }
                    // crea el tab de traducción
                    const creating = browser.tabs.create({
                        url: urlTRAD,
                    });
                    creating.then(onCreatedMultitrad, conError);
                } catch (err) {
                    // console.log("Error: " & err.message);
                }
            }
        }
        // ---------------------------------------------------------------------
        // --------------------------------------------------------------------

        // --------------------------------------------------------------------
        // FIN APARTADO MULTITRADUCCION
        // ---------------------------------------------------------------------

        // ---------------------------------------------
        // INICIO CORRECTOR ORTOGRAFICO
        // ---------------------------------------------
        // Function arrow autoejecutable
        (() => {
            // tecla abreviada para el corrector ortográfico -> Ctrl+Shift+U
            const gettingAllCommands = browser.commands.getAll();
            gettingAllCommands.then((commands) => {
                // eslint-disable-next-line no-unused-vars
                for (const command of commands) {
                    // console.log(command);
                }
            });

            browser.commands.onCommand.addListener((command) => {
                /**
                * Información recibida.
                * @param {string} result
                */
                function ejecutado(result) {
                    // discriminamos la información recibida
                    const partes = result.toString().split(' ');
                    // solo lo cargamos una vez al script
                    if (partes[1].localeCompare('false') === 0) {
                        inyectaCorrector();
                    }
                    // comprobamos estado de visibilidad y establecemos la variable
                    let estadoVisual = 'hidden';
                    if (partes[0].localeCompare('hidden') === 0) {
                        estadoVisual = 'visible';
                    } else {
                        estadoVisual = 'hidden';
                    }
                    // enviamos a la pagina la orden
                    /**
                    * control de errores y solo si el elemento existe
                    * @param {string} result
                    */
                    function onExecEstVisual(result) {
                        // console.log(`Con éxito`);
                    }
                    //  control de errores y solo si el elemento existe
                    const makeEstVisual = `
                                 try{
                                    if(typeof document.getElementById("dialogElv")!=="undefined"){
                                       document.getElementById("dialogElv").style.visibility = "${estadoVisual}";
                                    }
                                 }catch(e){}
                                 `;

                    const executing = browser.tabs.executeScript({
                        code: makeEstVisual,
                    });
                    executing.then(onExecEstVisual, conError);
                }
                // -----
                const seleccion = `var respuesta = "";
                            if (document.getElementById("dialogElv")) {
                                respuesta = document.getElementById("dialogElv").style.visibility.toString();
                                respuesta += " true";
                            } else {
                                respuesta = "hidden";
                                respuesta += " false";
                            }
                            `;
                const ejecutaScript = browser.tabs.executeScript({
                    code: seleccion,
                });
                ejecutaScript.then(ejecutado, conError);
            });
            /**
            * Inyecta corrector ortográfico
            */
            function inyectaCorrector() {
                /**
                * Resultado de la creación del corrector ortográfico
                * @param {int} result
                */
                function ejecutado(result) {
                    // con la selección obtenida mostramos el tipo de información
                    // console.log(result.toString());
                }
                const executing = browser.tabs.executeScript({
                    file: './scripts/creaElemCorrector.js',
                    allFrames: true,
                });
                executing.then(ejecutado, conError);
            }
        })();
        // ---------------------------------------------
        // FIN CORRECTOR ORTOGRAFICO
        // ---------------------------------------------

        // ---------------------------------------------
        // CONTROLAR TODAS LAS FORMAS DE INFORMACIÓN PARA EL TEXTO SELECCIONADO
        // ---------------------------------------------
        /**
        * Otras formas de información del usuario.
        * @param {string} texto => selección de texto a tratar
        */
        function infoELINV(texto) {
            // url donde buscaremos
            let urlElinv = '';
            switch (tipoDeInform) {
            case 'buscar_en_google':
                urlElinv = 'https://www.google.com/search?q=' + texto;
                break;
            case 'definicion_en_google':
                urlElinv =
                        'https://www.google.com/search?q=' +
                        texto +
                        '+significado&oq=' +
                        texto +
                        '+significado';
                break;
            case 'buscar_en_wikipedia':
                urlElinv = 'https://es.wikipedia.org/wiki/' + texto;
                break;
            case 'wordreference':
                urlElinv =
                        'http://www.wordreference.com/sinonimos/' + texto;
                break;
            case 'que_significa':
                urlElinv =
                        'https://que-significa.com/significado.php?termino=' +
                        texto;
                break;
            }
            // Producimos la información
            try {
                /**
                * Tab donde será tratada la información
                * @param {string} tab => info del tab
                */
                function onCreated(tab) {
                    // console.log(`Created new tab: ${tab.id}`)
                }
                // crea el tab de traducción
                const creating = browser.tabs.create({
                    url: urlElinv,
                });
                creating.then(onCreated, conError);
            } catch (err) {
                // console.log("Error: " & err.message);
            }
        }
        // ---------------------------------------------
        // FIN CONTROLAR TODAS LAS FORMAS DE INFORMACIÓN PARA EL TEXTO SELECCIONADO
        // ---------------------------------------------

        // FUNCIONES DE USO GENERAL
        // ---------------------------------------------------
        /**
        * Remover tab tradución
        * @param {string} msgResultado => resultado.
        */
        function onRemoved(msgResultado) {
            try {
                // console.log("Resultado " + msgResultado);
            } catch (error) {
                // console.log(`Error: ${error}`);
            }
        }
        // ---------------------------------------------------
        /**
        * Se ha creado el objeto o no
        * @param {string} n
        */
        function onCreated(n) {
            if (chrome.runtime.lastError) {
                // console.log("error en la creación del elemento:" + chrome.runtime.lastError);
            } else {
                // console.log("elemento creado con éxito!");
            }
        }
        // ---------------------------------------------------
        /**
        * Errores mensajes
        * @param {string} error => error en string producido
        */
        function conError(error) {
            // console.log(`Error: ${error}`);
        }
        // ---------------------------------------------------
    }
    // -------------------------------------------
})();
