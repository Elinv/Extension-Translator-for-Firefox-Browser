let tradElinvOpciones = function () {
    var idiomasOrigen = [
        ["xx", "Elegir Idioma"],
        ["af", "Afrikaans"],
        ["sq", "Albanés"],
        ["de", "Alemán"],
        ["ar", "Árabe"],
        ["hy", "Armenio"],
        ["az", "Azerbaiyani"],
        ["bn", "Bengalí"],
        ["be", "Bielorruso"],
        ["my", "Birmano"],
        ["bs", "Bosnio"],
        ["bg", "Búlgaro"], //10
        ["ca", "Catalán"],
        ["ceb", "cebuano"],
        ["cs", "Checo"],
        ["ny", "Chichewa"],
        ["zh-CN", "Chino"],
        ["ko", "Coreano"],
        ["ht", "Criollo Haitiano"],
        ["hr", "Croata"],
        ["da", "Danés"],
        ["sk", "Eslovaco"], //20
        ["sl", "Esloveno"],
        ["es", "Español"],
        ["eo", "Esperanto"],
        ["et", "Estonio"],
        ["tl", "Filipino"],
        ["fi", "Finlandés"],
        ["fr", "Francés"],
        ["cy", "Galés"],
        ["gl", "Gallego"],
        ["ka", "Georgiano"], //30
        ["el", "Griego"],
        ["gu", "Gujaratí"],
        ["ha", "Hausa"],
        ["iw", "Hebreo"],
        ["hi", "Hindi"],
        ["hmn", "Hmong"],
        ["nl", "Holandés"],
        ["hu", "Húngaro"],
        ["ig", "Igbo"],
        ["id", "Indonesio"], //40
        ["en", "Inglés"],
        ["ga", "Irlandés"],
        ["is", "Islandés"],
        ["it", "Italiano"],
        ["ja", "Japonés"],
        ["jw", "Javanés"],
        ["km", "Jemer"],
        ["kn", "Kannada"],
        ["kk", "Kazajo"],
        ["lo", "Lao"], //50
        ["la", "Latín"],
        ["lv", "Letón"],
        ["lt", "Lituano"],
        ["mk", "Macedonio"],
        ["ml", "Malayalam"],
        ["ms", "Malayo"],
        ["mg", "Malgache"],
        ["mt", "Maltés"],
        ["mi", "Maorí"],
        ["mr", "Maratí"], //60
        ["mn", "Mongol"],
        ["ne", "Nepalés"],
        ["no", "Noruego"],
        ["fa", "Persa"],
        ["pl", "Polaco"],
        ["pt", "Portugues"],
        ["pa", "Punjabí"],
        ["ro", "Rumano"],
        ["ru", "Ruso"],
        ["sr", "Serbio"], //70
        ["st", "Sesotho"],
        ["si", "Singalés"],
        ["so", "Somalí"],
        ["sv", "Sueco"],
        ["su", "Sundanés"],
        ["sw", "Swahili"],
        ["th", "Tailandés"],
        ["tg", "Tajik"],
        ["ta", "Tamil"],
        ["te", "Telugu"], //80
        ["tr", "Turco"],
        ["uk", "Ucraniano"],
        ["ur", "Urdu"],
        ["uz", "Uzbeco"],
        ["eu", "Vasco"],
        ["vi", "Vietnamita"],
        ["yi", "Yiddish"],
        ["yo", "Yoruba"],
        ["zu", "Zulú"],
    ];

    var idiomasDestino = [
        ["xx", "Elegir Idioma"],
        ["af", "Afrikaans"],
        ["sq", "Albanés"],
        ["de", "Alemán"],
        ["ar", "Arabe"],
        ["hy", "Armenio"],
        ["az", "Azerbaiyani"],
        ["bn", "Bengalí"],
        ["be", "Bielorruso"],
        ["my", "Birmano"],
        ["bs", "Bosnio"],
        ["bg", "Búlgaro"], //10
        ["ca", "Catalán"],
        ["ceb", "cebuano"],
        ["cs", "Checo"],
        ["ny", "Chichewa"],
        ["zh-CN", "Chino (Tradicional)"],
        ["zh-TW", "Chino (Simplificado)"],
        ["ko", "Coreano"],
        ["ht", "Criollo Haitiano"],
        ["hr", "Croata"],
        ["da", "Danés"], //20
        ["sk", "Eslovaco"],
        ["sl", "Esloveno"],
        ["es", "Español"],
        ["eo", "Esperanto"],
        ["et", "Estonio"],
        ["tl", "Filipino"],
        ["fi", "Finlandés"],
        ["fr", "Francés"],
        ["cy", "Galés"],
        ["gl", "Gallego"], //30
        ["ka", "Georgiano"],
        ["el", "Griego"],
        ["gu", "Gujaratí"],
        ["ha", "Hausa"],
        ["iw", "Hebreo"],
        ["hi", "Hindi"],
        ["hmn", "Hmong"],
        ["nl", "Holandés"],
        ["hu", "Húngaro"],
        ["ig", "Igbo"], //40
        ["id", "Indonesio"],
        ["en", "Inglés"],
        ["ga", "Irlandés"],
        ["is", "Islandés"],
        ["it", "Italiano"],
        ["ja", "Japonés"],
        ["jw", "Javanés"],
        ["km", "Jemer"],
        ["kn", "Kannada"],
        ["kk", "Kazajo"], //50
        ["lo", "Lao"],
        ["la", "Latín"],
        ["lv", "Letón"],
        ["lt", "Lituano"],
        ["mk", "Macedonio"],
        ["ml", "Malayalam"],
        ["ms", "Malayo"],
        ["mg", "Malgache"],
        ["mt", "Maltés"],
        ["mi", "Maorí"], //60
        ["mr", "Maratí"],
        ["mn", "Mongol"],
        ["ne", "Nepalés"],
        ["no", "Noruego"],
        ["fa", "Persa"],
        ["pl", "Polaco"],
        ["pt", "Portugues"],
        ["pa", "Punjabí"],
        ["ro", "Rumano"],
        ["ru", "Ruso"], //70
        ["sr", "Serbio"],
        ["st", "Sesotho"],
        ["si", "Singalés"],
        ["so", "Somalí"],
        ["sv", "Sueco"],
        ["su", "Sundanés"],
        ["sw", "Swahili"],
        ["th", "Tailandés"],
        ["tg", "Tajik"],
        ["ta", "Tamil"], //80
        ["te", "Telugu"],
        ["tr", "Turco"],
        ["uk", "Ucraniano"],
        ["ur", "Urdu"],
        ["uz", "Uzbeco"],
        ["eu", "Vasco"],
        ["vi", "Vietnamita"],
        ["yi", "Yiddish"],
        ["yo", "Yoruba"],
        ["zu", "Zulú"] //90
    ];
    // llenamos select idiomas origen
    var x = document.getElementById("idOrigen");
    for (var i = 0; i < idiomasOrigen.length; i++) {
        try {
            var option = document.createElement("option");
            option.value = idiomasOrigen[i][0];
            option.text = idiomasOrigen[i][1];
            x.add(option);
        } catch (err) {}
    }
    // llenamos select idiomas destino
    var x = document.getElementById("idDestino");
    for (var i = 0; i < idiomasDestino.length; i++) {
        try {
            var option = document.createElement("option");
            option.value = idiomasDestino[i][0];
            option.text = idiomasDestino[i][1];
            x.add(option);
        } catch (err) {}
    }

    // Grabar opciones
    function saveOptions(e) {
        // Salvamos los input type select
        // -------------------------------------------------------------------------
        // select name="idOrigen"
        chrome.storage.local.set({
            idOrigen: document.querySelector('select[name="idOrigen"]').selectedIndex
        });
        // select name="idDestino"
        chrome.storage.local.set({
            idDestino: document.querySelector('select[name="idDestino"]').selectedIndex
        });
        // -------------------------------------------------------------------------      
        // enviamos mensaje al background de que 
        // se han grabado cambios en los idiomas para su refresco y 
        // puesta en uso inmediatamente.
        browser.runtime.sendMessage({
            "refresh": "renovado idiomas"
        });
    }

    //Recuperar opciones grabadas
    function restoreOptions() {
        // recuperamos los input type select
        // ---------------------------------------------------
        var cslGet = chrome.storage.local.get;
        var estadoSel = -1;
        // select name="idOrigen" 1ra.Ejecución por defecto = 0
        cslGet('idOrigen', (res) => {
            if (typeof (res.idOrigen) === 'undefined' || res.idOrigen === null || res.idOrigen === 0) {
                estadoSel = 0;
                var idIdiomaOrigen = 0;
                for (var i = 0; i < idiomasOrigen.length; i++) {
                    if (idiomasOrigen[i][0] == "en") {
                        idIdiomaOrigen = i;
                        break;
                    }
                }
                chrome.storage.local.set({
                    idOrigen: idIdiomaOrigen
                });
            } else {
                estadoSel = res.idOrigen;
            }
            document.querySelector('select[name="idOrigen"]').selectedIndex = estadoSel;
        });

        // select name="idDestino" 1ra.Ejecución por defecto = 0
        cslGet('idDestino', (res) => {
            if (typeof (res.idDestino) === 'undefined' || res.idDestino === null || res.idDestino === 0) {
                estadoSel = 0;
                // obtenemos el lenguaje del navegador
                var idioma = navigator.language || navigator.userLanguage;
                // solo las dos primeras letras
                idioma = idioma.substring(0, 2);
                var idIdiomaDestino = 0;
                for (var i = 0; i < idiomasDestino.length; i++) {
                    if (idiomasDestino[i][0] == idioma) {
                        idIdiomaDestino = i;
                        break;
                    }
                }
                chrome.storage.local.set({
                    idDestino: idIdiomaDestino
                });
            } else {
                estadoSel = res.idDestino;
            }
            document.querySelector('select[name="idDestino"]').selectedIndex = estadoSel;
        });
        // ---------------------------------------------------
    }

    try {
        //Eventos
        document.addEventListener('DOMContentLoaded', restoreOptions);
        document.querySelector("form").addEventListener("submit", saveOptions);
        //Buscar idioma de origen
        searchBox = document.querySelector("#searchBox");
        //You can change this to keydown, keypress or change
        searchBox.addEventListener("keyup", function (e) {
            idiomOrigen = document.querySelector("#idOrigen");
            buscar(e, idiomOrigen);
        });
        searchBox.addEventListener("blur", function (e) {
            searchBox.value = "";
        });
        //Buscar idioma destino
        searchBox1 = document.querySelector("#searchBox1");
        //You can change this to keydown, keypress or change
        searchBox1.addEventListener("keyup", function (e) {
            idiomDestino = document.querySelector("#idDestino");
            buscar(e, idiomDestino);
        });
        searchBox1.addEventListener("blur", function (e) {
            searchBox1.value = "";
        });
    } catch (err) {}

    function buscar(e, select) {
        var text = e.target.value; //searchBox value
        var options = select.options; //select options
        for (var i = 0; i < options.length; i++) {
            var option = options[i]; //current option
            var optionText = option.text; //option text ("palabra")
            var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
            var lowerText = text.toLowerCase(); //searchBox value lowercased for case insensitive testing
            var regex = new RegExp("^" + text, "i"); //regExp, explained in post
            var match = optionText.match(regex); //test if regExp is true
            var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
            if (match || contains) { //if one or the other goes through
                option.selected = true; //select that option
                return; //prevent other code inside this event from executing
            }
            e.selectedIndex = 0; //if nothing matches it selects the default option
        }
    }

    // funciones para mostrar la ayuda
    // -------------------------------
    function openCity(ayuda) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(ayuda).style.display = "block";
        //evt.currentTarget.className += " active";
    }

    // acciones de botones de ayuda
    var idioma = "ES";
    document.getElementById("tradES").style.backgroundColor = "lightblue";
    // -------------------------------
    document.getElementById("ayuda1").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('ayuda1ScreenES');
        } else if (idioma === "EN") {
            openCity('ayuda1ScreenEN');
        }
    });
    document.getElementById("ayuda2").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('ayuda2ScreenES');
        } else if (idioma === "EN") {
            openCity('ayuda2ScreenEN');
        }
    });
    document.getElementById("ayuda3").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('ayuda3ScreenES');
        } else if (idioma === "EN") {
            openCity('ayuda3ScreenEN');
        }
    });
    document.getElementById("ayuda4").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('ayuda4ScreenES');
        } else if (idioma === "EN") {
            openCity('ayuda4ScreenEN');
        }
    });
    // -------------------------------
    // Acciones botones video
    // -------------------------------    
    document.getElementById("tutorialVideoInGoogle").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('tutorialVidTradInGoogle');
        } else if (idioma === "EN") {
            openCity('tutorialVidTradInGoogle');
        }
    });
    document.getElementById("tutorialVideoInSitu").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('tutorialVidTradInSitu');
        } else if (idioma === "EN") {
            openCity('tutorialVidTradInSitu');
        }
    });
    document.getElementById("tutorialVideoMultitrad").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('tutorialVidTradMultitrad');
        } else if (idioma === "EN") {
            openCity('tutorialVidTradMultitrad');
        }
    });
    document.getElementById("tutorialVideoPagEntera").addEventListener("click", function () {
        if (idioma === "ES") {
            openCity('tutorialVidTradPagEntera');
        } else if (idioma === "EN") {
            openCity('tutorialVidTradPagEntera');
        }
    });            
    // -------------------------------

    document.getElementById("tradES").addEventListener("click", function () {
        idioma = "ES";
        document.getElementById("tradES").style.backgroundColor = "lightblue";
        document.getElementById("tradEN").style.backgroundColor = "white";
        document.getElementById("titHelp").innerHTML = "Ayuda Traductor Elinv @ 2019";
        document.getElementById("ayuda1").innerHTML = "Acerca";
        document.getElementById("ayuda2").innerHTML = "Funciones";
        document.getElementById("ayuda3").innerHTML = "Mas";
        document.getElementById("ayuda4").innerHTML = "Soporte";
        document.getElementById("tradES").innerHTML = "Español";
        document.getElementById("tradEN").innerHTML = "Inglés";
    });
    document.getElementById("tradEN").addEventListener("click", function () {
        idioma = "EN";
        document.getElementById("tradEN").style.backgroundColor = "lightblue";
        document.getElementById("tradES").style.backgroundColor = "white";
        document.getElementById("titHelp").innerHTML = "Help Translator Elinv @ 2019";
        document.getElementById("ayuda1").innerHTML = "About";
        document.getElementById("ayuda2").innerHTML = "Functions";
        document.getElementById("ayuda3").innerHTML = "More";
        document.getElementById("ayuda4").innerHTML = "Support";
        document.getElementById("tradES").innerHTML = "Spanish";        
        document.getElementById("tradEN").innerHTML = "English";        
    });
    // acciones de botones cerrar display ayuda
    // -------------------------------
    // Español
    document.getElementById("cierraHelp1ES").addEventListener("click", function () {
        document.getElementById("ayuda1ScreenES").style.display = "none";
    });
    document.getElementById("cierraHelp2ES").addEventListener("click", function () {
        document.getElementById("ayuda2ScreenES").style.display = "none";
    });
    document.getElementById("cierraHelp3ES").addEventListener("click", function () {
        document.getElementById("ayuda3ScreenES").style.display = "none";
    });
    document.getElementById("cierraHelp4ES").addEventListener("click", function () {
        document.getElementById("ayuda4ScreenES").style.display = "none";
    });
    // -------------------------------
    // Acciones botones close video
    // -------------------------------      
    document.getElementById("closeTutorialVidTradInGoogle").addEventListener("click", function () {
        document.getElementById("tutorialVidTradInGoogle").style.display = "none";
    });
    document.getElementById("closeTutorialVidTradInSitu").addEventListener("click", function () {
        document.getElementById("tutorialVidTradInSitu").style.display = "none";
    });
    document.getElementById("closeTutorialVidTradMultitrad").addEventListener("click", function () {
        document.getElementById("tutorialVidTradMultitrad").style.display = "none";
    });
    document.getElementById("closeTutorialVidTradPagEntera").addEventListener("click", function () {
        document.getElementById("tutorialVidTradPagEntera").style.display = "none";
    });
    // -------------------------------
    // Ingles
    document.getElementById("cierraHelp1EN").addEventListener("click", function () {
        document.getElementById("ayuda1ScreenEN").style.display = "none";
    });
    document.getElementById("cierraHelp2EN").addEventListener("click", function () {
        document.getElementById("ayuda2ScreenEN").style.display = "none";
    });
    document.getElementById("cierraHelp3EN").addEventListener("click", function () {
        document.getElementById("ayuda3ScreenEN").style.display = "none";
    });
    document.getElementById("cierraHelp4EN").addEventListener("click", function () {
        document.getElementById("ayuda4ScreenEN").style.display = "none";
    });

}();