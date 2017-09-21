/********************************************************
 * R-Quiz - JavaScript-Framework for interactive quizzes *
 *********************************************************
 *
 * V 3.0 (2017/05/01)
 *
 * This script converts parts of a web page into interactive quizzes.
 * In order to achieve that this script searches for certain class names
 * which it uses as container elements for a quiz.
 * This approach was chosen to enable content editors to design quiz
 * exercises with regular rich text editing tools so the text contents
 * then can get converted into quizzes by this JavaScript.
 *
 * SOFTWARE LICENSE: LGPL
 * (C) 2007 Felix Riesterer
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * Felix Riesterer (felix-riesterer.de)
 */
(function() {
    'use strict';

    var q = {

        /*======================*
         * framework properties *
         *======================*/

        /**
         * list of all quizzes
         *
         * @var Array
         */
        allQuizzes: [],

        /**
         * directory in which this script file is located
         *
         * @var String
         */
        baseURL: "",

        /**
         * class names for backwards compatibility with older versions of
         * this script
         *
         * @var Object
         */
        compatibilityClassNames: {
            "zuordnungs-quiz": "rquiz-matching",
            "lueckentext-quiz": "rquiz-gapfill",
            "memo-quiz": "rquiz-memo",
            "multiplechoice-quiz": "rquiz-multichoice",
            "schuettel-quiz": "rquiz-wordjumble",
            "kreuzwort-quiz": "rquiz-crossword",
            "suchsel-quiz": "rquiz-wordsearch",
            "buchstabenraten-quiz": "rquiz-wordguess"
        },

        /**
         * functions to execute after the CSS file has been loaded
         *
         * @var Array of functions
         */
        functionsAfterCssReady: [],

        /**
         * string messages sorted by language
         *
         * @var Object
         */
        i18n: {

            de: {
                allFound: "Alle Sets found!",
                attemptLastTime: "Das letzte Mal hatten Sie nur einen Versuch benötigt.",
                attemptsLastTime: "Das letzte Mal hatten Sie %n Versuche benötigt.",
                check: "prüfen!",
                endOfQuiz: "Quiz ist zuende.",
                enter: "eintragen",
                enterNotice: "Benutzen Sie zur Eingabe die Tastatur. Eventuell müssen sie zuerst ein Eingabefeld durch Anklicken aktivieren.",
                enterNoticeWordGuessing: "Benutzen Sie die Tastatur zur Eingabe! Eventuell müssen Sie erst in das Quiz klicken, um es zu aktivieren.",
                foundWords: "Erkannte Wörter",
                guessedChars: "Bereits geratene Buchstaben",
                horizontal: "Waagrecht",
                howAboutNewRound: "Wie wär's mit einer neuen Runde?",
                input: "Eingabe",
                percentageResult: "Die Antworten sind zu %n% richtig.",
                praise1: "Ausgezeichnet!",
                praise2: "Gut gemacht!",
                praise3: "Das war nicht schlecht!",
                remainingTries: "Sie haben noch %n Versuche übrig!",
                restart: "neu starten",
                result1: "Die Aufgabe wurde gleich beim ersten Versuch erfolgreich gelöst!",
                result2: "Die Aufgabe wurde nach nur zwei Versuchen erfolgreich gelöst!",
                result3: "Die Aufgabe wurde nach %n Versuchen erfolgreich gelöst!",
                startQuiz: "Quiz starten.",
                tempText: "Text...",
                vertical: "Senkrecht"
            },

            da: {
                allFound: "Du har fundet alle sættene!",
                attemptLastTime: "Sidste gang brugte du kun ét forsøg.",
                attemptsLastTime: "Sidste gang brugte du %n forsøg.",
                check: "Tjek dine svar!",
                endOfQuiz: "Quizzen er slut.",
                enter: "Indsæt",
                enterNotice: "Brug tastaturet til at indtaste bogstaverne. Du skal muligvis aktiverer boksen først ved at klikke på den.",
                enterNoticeWordGuessing: "Brug tastaturet til at indtaste bogstaverne. Du skal muligvis klikke et sted i denne quiz først for at aktivere den.",
                foundWords: "Fundne ord",
                guessedChars: "Bogstaver allerede fundet",
                horizontal: "Horizontal",
                howAboutNewRound: "Hvad med endnu en omgang?",
                input: "Input",
                percentageResult: "Svarene er %n% korrekte.",
                praise1: "Alletiders!",
                praise2: "Flot klaret!",
                praise3: "Det var godt!",
                remainingTries: "Du har %n forsøg tilbage!",
                restart: "Prøv igen",
                result1: "Du løste det hele i første forsøg!",
                result2: "Du løste det hele på kun to forsøg!",
                result3: "Du løste det hele efter %n forsøg!",
                startQuiz: "Start quizzen.",
                tempText: "tekst...",
                vertical: "Vertikal"
            },

            en: {
                allFound: "You've found all sets!",
                attemptLastTime: "Last time you only needed a single attempt.",
                attemptsLastTime: "Last time you needed %n attempts.",
                check: "check it!",
                endOfQuiz: "Quiz is over.",
                enter: "fill in",
                enterNotice: "Use the keyboard to enter letters. You may need to first activate a box by clicking it.",
                enterNoticeWordGuessing: "Use the keyboard to enter letters. You may need to first click somewhere into this quiz in oder to activate it.",
                foundWords: "Found Words",
                guessedChars: "Already Guessed Characters",
                horizontal: "Horizontal",
                howAboutNewRound: "How about another round?",
                input: "Input",
                percentageResult: "The answers are %n% correct.",
                praise1: "Brilliant!",
                praise2: "Well done!",
                praise3: "That was nice!",
                remainingTries: "You have %n tries left!",
                restart: "restart",
                result1: "You solved everything on your first try!",
                result2: "You solved everything with only two tries!",
                result3: "You solved everything after trying %n times!",
                startQuiz: "Start quiz.",
                tempText: "text...",
                vertical: "Vertical"
            },

            // Spanish messages by Ulrike Weinmann
            es: {
                allFound: "¡Encontraste todos los juegos!",
                attemptLastTime: "Last time you only needed a single attempt.",
                attemptsLastTime: "Last time you needed %n attempts.",
                check: "¡Chequear!",
                endOfQuiz: "Fin de juego",
                enter: "insertar",
                enterNotice: "Usa el teclado para entrar letras. Quizás tienes que hacer clic en una caja primero para activárla.",
                enterNoticeWordGuessing: "Usa el teclado para entrar letras. Quizás tienes que hacer clic en el quiz primero para activárla.",
                foundWords: "Palabras encontradas",
                guessedChars: "Letras ya probadas",
                howAboutNewRound: "¿Otra vez?",
                horizontal: "Horizontal",
                input: "Entrada",
                percentageResult: "Porcentaje de respuestas correctas: %n%.",
                praise1: "¡Muy bien hecho!",
                praise2: "¡Bien hecho!",
                praise3: "¡Correcto!",
                remainingTries: "¡Usted no tiene que dejan 7 intentos!",
                restart: "otra vez",
                result1: "¡Resolviste el ejercicio al primer intento!",
                result2: "¡Resolviste el ejercicio al segundo intento!",
                result3: "Intentaste resolver el ejercicio %n veces y ¡lo lograste!",
                startQuiz: "Empezar quiz.",
                tempText: "Texto...",
                vertical: "Vertical"
            },

            // French messages by Otto Ebert
            fr: {
                allFound: 'Tu as trouvé tous les "sets".',
                attemptLastTime: "Last time you only needed a single attempt.",
                attemptsLastTime: "Last time you needed %n attempts.",
                check: "verifier!",
                endOfQuiz: "Quiz est finis.",
                enter: "inscrire",
                enterNotice: "Utilisez le clavier pour inscrire des lettres. Vous devez probablement d'abord activer une boîte en le claquant.",
                enterNoticeWordGuessing: "Utilisez le clavier pour inscrire des lettres. Vous devez probablement d'abord activer le quiz en le claquant.",
                foundWords: "Mots trouvés",
                guessedChars: "Lettres déjà essayées",
                horizontal: "Horizontal",
                howAboutNewRound: "Alors tu veux recommencer?",
                input: "Entrée",
                percentageResult: "Les réponses sont %n% correctes.",
                praise1: "Excellent! Super!",
                praise2: "Bien fait!",
                praise3: "Ce n'était pas mal",
                remainingTries: "Vous n'avez pas %n tentatives gauche!",
                restart: "recommencer",
                result1: "Ton essai était tout de suite un succès.",
                result2: "Tu as résoulu le devoir après deux tentatives seulement!",
                result3: "Tu as résoulu le devoir après %n tentatives.",
                startQuiz: "Commencer le quiz.",
                tempText: "Text...",
                vertical: "Vértical"
            },

            // Roman Latin messages by Ralf Altgeld and Ulrike Weinmann
            la: {
                allFound: "Omnes partes repperisti.",
                attemptLastTime: "Last time you only needed a single attempt.",
                attemptsLastTime: "Last time you needed %n attempts.",
                check: "probare",
                endOfQuiz: "Factum est.",
                enter: "complere",
                enterNotice: "Utere clavibus ad verba scribenda. Fortasse tibi capsa eligenda est.",
                enterNoticeWordGuessing: "Utere clavibus ad verba scribenda. Fortasse tibi aenigma eligendum est.",
                foundWords: "Verba iam reperta",
                guessedChars: "Litterae iam temptatae",
                horizontal: "directe",
                howAboutNewRound: "Ludum novum vis?",
                input: "implere",
                percentageResult: "%n% centesimae responsorum rectae sunt.",
                praise1: "optime!",
                praise2: "bene!",
                praise3: "Id non male fecisti.",
                remainingTries: "Et non sunt derelicti %n conatusque prohibebit!",
                restart: "novum vis",
                result1: "Pensum statim in primo conatu feliciter absolutum est!",
                result2: "Pensum cam post duos conatus feliciter absolutum est.",
                result3: "Pensum cam post %n conatus feliciter absolutum est.",
                startQuiz: "Incipere aenigma.",
                tempText: "scriptum...",
                vertical: "perpendiculariter"
            },

            // Italian messages by Ihor Bilaniuk
            it: {
                allFound: "Tutti i sets sono stati risolti!",
                attemptLastTime: "Last time you only needed a single attempt.",
                attemptsLastTime: "Last time you needed %n attempts.",
                check: "controllare!",
                endOfQuiz: "Il quiz è sopra .",
                enter: "immettere",
                enterNotice: "Utilizzi la tastiera per entrare nelle lettere. Potete avere bisogno di in primo luogo di attivare una scatola scattandola.",
                enterNoticeWordGuessing: "Utilizzi la tastiera per entrare nelle lettere. Potete avere bisogno di in primo luogo di scattarti in qualche luogo in questo quiz per attivarlo.",
                foundWords: "Parole trovate ",
                guessedChars: "Lettere già indovinate",
                howAboutNewRound: "Ancora una volta?",
                horizontal: "Orizontale",
                input: "Input",
                percentageResult: "Le tue risposte sono il %n per cento giuste.",
                praise1: "Ottimo!",
                praise2: "Benissimo!",
                praise3: "Bene!",
                remainingTries: "Non si dispone di %n tentativi di sinistra!",
                restart: "ancora una volta",
                result1: "Il compito è stato risolto al primo passo!",
                result2: "Il compito è stato risolto dopo la seconda prova!",
                result3: "Il compito è stato risolto dopo %n prove.",
                startQuiz: "Inizi il quiz.",
                tempText: "Testo...",
                vertical: "Verticale"
            },

            // Polish messages by Pitr Wójs www.merula.pl
            pl: {
                allFound: "Znalazłaś/łeś wszystkie pary!",
                attemptLastTime: "Last time you only needed a single attempt.",
                attemptsLastTime: "Last time you needed %n attempts.",
                check: "Sprawdź!",
                endOfQuiz: "Koniec quizu.",
                enter: "Wpisz",
                enterNotice: "Aby wpisać rozwiązanie użyj klawiatury. Kliknij pole, aby wprowadzić text!",
                enterNoticeWordGuessing: "Aby wpisać rozwiązanie użyj klawiatury. Kliknij pole, aby wprowadzić text!",
                foundWords: "Rozpoznane słówka",
                guessedChars: "Odgadnięte litery",
                horizontal: "Poziomo",
                howAboutNewRound: "Co powiesz na drugą rundę? Spróbuj jeszcze raz!",
                input: "Wprowadzanie",
                percentageResult: "Odpowiedzi są poprawne w %n procentach.",
                praise1: "Celująco!",
                praise2: "Bardzo dobrze!",
                praise3: "Nieźle!",
                remainingTries: "Nie masz %n% prób w lewo!",
                restart: "restart",
                result1: "Zadanie rozwiązałaś/łeś poprawnie za pierwszym razem!",
                result2: "Zadanie rozwiązałaś/łeś poprawnie za drugim razem!",
                result3: "Zadanie zostało rozwiązane poprawnie po %n próbach !",
                startQuiz: "Start quizu.",
                tempText: "Tekst...",
                vertical: "Pionowo"
            },

            // Turkish messages by Dilan Memili
            tr: {
                allFound: "Tüm setler bulunmus bulunmaktadir!",
                attemptLastTime: "Son seferde yalnizca bir deneme yapmaniz gerekti.",
                attemptsLastTime: "Son seferde %n deneme yapmaniz gerekti.",
                check: "Kontrol ediniz!",
                endOfQuiz: "Test bitmistir.",
                enter: "Giriniz",
                enterNotice: "Giris icin klavyeyi kullaniniz. Belki öncelikle tiklayarak bir giris alani etkinlestirmeniz gerekmektedir.",
                enterNoticeWordGuessing: "Giris icin klavyeyi kullaniniz! Testi etkinlestirmek icin belki öncelikle testi tiklamalisiniz.",
                foundWords: "Taninan kelimeler",
                guessedChars: "Simdiden bulunan harfler",
                horizontal: "Yatay",
                howAboutNewRound: "Yeni bir tura ne dersiniz?",
                input: "Giris",
                percentageResult: "Cevaplar %n% dogru.",
                praise1: "Mükemmel!",
                praise2: "Iyi yaptiniz!",
                praise3: "Bu fena degildi!",
                remainingTries: "%n denemeniz kaldi",
                restart: "Yeniden baslat",
                result1: "Ödev ilk denemede basari ile cözüldü!",
                result2: "Ödev yalnizca iki denemeden sonra basari ile cözüldü!",
                result3: "Ödev %n denemeden sonra basari ile cözüldü!",
                startQuiz: "Testi baslat.",
                tempText: "metin...",
                vertical: "dikey"
            }
        },

/**
 * flag for the framework initialization
 *
 * If this flag is set certain changes won't be done again by
 * the framework's begin method upon being called yet again.
 *
 * @var bool
 */

        initialized: false,

        /**
         * list of UTF-8 characters that can be simplified into upper-case
         * ASCII as needed with some quizzes like a crossword quiz
         *
         * @var Object
         */
        utf8Replacements: {
            A: [
                '\u0041', // a
                '\u0061', // A
                '\u00c0', // À
                '\u00c1', // Á
                '\u00c2', // Â
                '\u00c3', // Ã
                '\u00c5', // Å
                '\u00e0', // à
                '\u00e1', // á
                '\u00e2', // â
                '\u00e3', // ã
                '\u00e5' // å
            ],
            AE: [
                '\u00c4', // Ä
                '\u00c6', // Æ
                '\u00e4', // ä
                '\u00e6' // æ
            ],
            B: [
                '\u0042', // B
                '\u0062' // b
            ],
            C: [
                '\u0043', // C
                '\u0063', // c
                '\u00c7', // Ç
                '\u00e7' // ç
            ],
            D: [
                '\u0044', // D
                '\u0064' // d
            ],
            E: [
                '\u0045', // E
                '\u0065', // e
                '\u00c8', // È
                '\u00c9', // É
                '\u00ca', // Ê
                '\u00cb', // Ë
                '\u00e8', // è
                '\u00e9', // é
                '\u00ea', // ê
                '\u00eb' // ë
            ],
            F: [
                '\u0046', // F
                '\u0066' // f
            ],
            G: [
                '\u0047', // G
                '\u0067' // g
            ],
            H: [
                '\u0048', // H
                '\u0068' // h
            ],
            I: [
                '\u0049', // I
                '\u0069', // i
                '\u00cc', // Ì
                '\u00cd', // Í
                '\u00ce', // Î
                '\u00cf', // Ï
                '\u00ec', // ì
                '\u00ed', // í
                '\u00ee', // î
                '\u00ef' // ï
            ],
            J: [
                '\u004a', // J
                '\u006a' // j
            ],
            K: [
                '\u004b', // K
                '\u006b' // k
            ],
            L: [
                '\u004c', // L
                '\u006c' // l
            ],
            M: [
                '\u004d', // M
                '\u006d' // m
            ],
            N: [
                '\u004e', // N
                '\u006e', // n
                '\u00d1', // Ñ
                '\u00f1' // ñ
            ],
            O: [
                '\u004f', // O
                '\u006f', // o
                '\u00d2', // Ò
                '\u00d3', // Ó
                '\u00d4', // Ô
                '\u00d5', // Õ
                '\u00f2', // ò
                '\u00f3', // ó
                '\u00f4', // ô
                '\u00f5' // õ
            ],
            OE: [
                '\u00d6', // Ö
                '\u00f6' // ö
            ],
            P: [
                '\u0050', // P
                '\u0070' // p
            ],
            Q: [
                '\u0051', // Q
                '\u0071' // q
            ],
            R: [
                '\u0052', // R
                '\u0072' // r
            ],
            S: [
                '\u0053', // S
                '\u0073' // s
            ],
            SS: [
                '\u00df' // ß
            ],
            T: [
                '\u0054', // T
                '\u0074' // t
            ],
            U: [
                '\u0055', // U
                '\u0075', // u
                '\u00d9', // Ù
                '\u00da', // Ú
                '\u00db', // Û
                '\u00f9', // ù
                '\u00fa', // ú
                '\u00fb' // û
            ],
            UE: [
                '\u00dc', // Ü
                '\u00fc' // ü
            ],
            V: [
                '\u0056', // V
                '\u0076' // v
            ],
            W: [
                '\u0057', // W
                '\u0077' // w
            ],
            X: [
                '\u0058', // X
                '\u0078' // x
            ],
            Y: [
                '\u0059', // Y
                '\u0079', // y
                '\u00dd', // Ý
                '\u00fd' // ý
            ],
            Z: [
                '\u005a', // Z
                '\u007a' // z
            ]
        },

        /**
         * constructor functions for quiz objects
         *
         * @var Object
         */
        quizConstructors: {},

        /*===================*
         * framework methods *
         *===================*/

        /**
         * function to start the conversion of container elements into
         * real quizzes
         *
         * This function gets exposed to the browser's window object
         * so a script loader may call it from outside this IIFE.
         */
        begin: function() {

            /* Only do the following if no quiz has been created yet
             * in order to deflect multiple calls to this function since
             * it will be exposed to the browser's window object.
             */
            if (!q.initialized) {

                // mark this framework as initialized
                q.initialized = true;

                // make quiz constructors inherit from an abstract base class
                q.each(q.quizConstructors, function(o, s) {

                    if (s != "_abstractQuiz") {
                        o.prototype = Object.create(q.quizConstructors._abstractQuiz);
                        o.prototype.constructor = q.quizConstructors[s];
                        o.prototype.type = s;
                    }
                });

                /* turn all elements into quizzes
                 * which have a suitable class name */
                q.each(
                    document.querySelectorAll('[class^="rquiz-"], [class$="-quiz"]'),
                    function(element) {

                        /* compatibility with older versions of this script:
                         * replace old class names with corresponding new ones */
                        q.each(q.compatibilityClassNames, function(_new, _old) {

                            if (element.classList.contains(_old)) {
                                element.classList.remove(_old);
                                element.classList.add(_new);
                            }
                        });

                        // decide if the element can be a quiz container
                        q.each(q.quizConstructors, function(o, s) {

                            if (element.classList.contains("rquiz-" + s) &&
                                s != "_abstractQuiz"
                            ) {
                                // make a quiz
                                new q.quizConstructors[s](element);
                            }
                        });
                    }
                );

                // enable display of quizzes
                document.body.classList.add("rquiz");
            }
        },

        /**
         * more complex document.createElement functionality
         *
         * params has this structure: {
         *	tagName : "p", // results in a <p>
         * 	text : "simple plain text" // textNode as child node
         * 	... // more (native) properties (like id, className etc.)
         * }
         *
         * @param Object
         */
        create: function(params) {
            var el, p;

            if (params.tagName && params.tagName.match(/[a-z]/)) {
                el = document.createElement(params.tagName);
                for (p in params) {
                    if (p.match(/^text/i)) {
                        el.appendChild(document.createTextNode(params[p]));
                    } else {
                        if (!p.match(/^tagname$/i)) {
                            el[p] = params[p];
                        }
                    }
                }
            }

            return el;
        },

        /**
         * do things after the CSS file has loaded
         *
         * This function should execute when the CSS file has been
         * loaded. It then executes any functions that have been
         * collected in the frameworks functionsAfterCssReady array.
         */
        onCssReady: function() {
            q.each(q.functionsAfterCssReady, function(f) {
                f();
            });
        },

        /**
         * iterator function for more than just arrays
         * taken from the TinyMCE project (tinymce.com)
         *
         * @param Object
         * @param function callback
         * @param Object this context
         * @return int (to be used as false-ish or true-ish)
         */
        each: function(o, cb, s) {
            var n, l;

            if (!o) {
                return 0;
            }

            s = s || o;

            if (o.length !== undefined) {
                // Indexed arrays, needed for Safari
                for (n = 0, l = o.length; n < l; n++) {
                    if (cb.call(s, o[n], n, o) === false) {
                        return 0;
                    }
                }

            } else {

                // Hashtables
                for (n in o) {
                    if (o.hasOwnProperty(n)) {
                        if (cb.call(s, o[n], n, o) === false) {
                            return 0;
                        }
                    }
                }
            }

            return 1;
        },

        /**
         * entry function which initializes the script like setting
         * a base URL and loading the neccessary CSS file
         *
         * Since this script supports MediaWiki which in turn uses a
         * script loader and also provides for the loading of needed
         * CSS files, this initialization function may fail in this
         * regard.
         */
        init: function() {
            var h = document.querySelector("head"),
                l;

            // find this script's <script> element to determine a base URL
            q.each(document.getElementsByTagName("script"), function(s) {

                if (s.src && s.src.match(/\/rquiz.js\b/)) {
                    q.baseURL = s.src.substr(0, s.src.lastIndexOf("js/"));
                }
            });

            // load CSS file
            if (q.baseURL && h) {

                l = h.appendChild(q.create({
                    href: q.baseURL + "css/quiz.css",
                    rel: "stylesheet",
                    tagName: "link"
                }));

                l.addEventListener("load", function() {
                    q.onCssReady();
                });
            }

            // set up quizzes when page has finished loading
            document.addEventListener("DOMContentLoaded", function() {
                q.begin();
            });
        },

        /**
         * function to shuffle an array
         *
         * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#answer-25984542
         *
         * @param Array input
         */
        shuffleArray: function(array) {
            var count = array.length,
                r, temp;

            while (count) {
                r = Math.random() * count-- | 0;
                temp = array[count];
                array[count] = array[r];
                array[r] = temp;
            }
        },

        /**
         * function to trim whitespaces at the beginning and at the end
         * of a string like PHP's trim function
         *
         * @param String input
         * @return String output
         */
        trim: function(s) {
            var c = "[" +
                String.fromCharCode(32) +
                String.fromCharCode(160) +
                "\t\r\n" +
                "]+";

            return s
                // remove whitespaces from the left end
                .replace(new RegExp("^" + c, "g"), "")
                // remove whitespaces from the right end
                .replace(new RegExp(c + "$", "g"), "");
        },

        /**
         * function to turn all characters of a UTF-8 encoded string
         * into an upper-case ASCII representation as defined in
         * q.utf8Replacements above
         *
         * @param String input
         * @return String output
         */
        utf8NormalizeToUpper: function(s) {
            var r = "",
                z, i, j;

            for (i = 0; i < s.length; i++) {

                if (s[i] == String.fromCharCode(160) ||
                    s[i] == String.fromCharCode(32)
                ) {

                    r += String.fromCharCode(160);

                } else {

                    for (z in q.utf8Replacements) {

                        if (z.match(/^[A-Z][A-Z]?$/)) {

                            for (j = 0; j < q.utf8Replacements[z].length; j++) {

                                if (s.substr(i, 1) == q.utf8Replacements[z][j]) {
                                    r += z;
                                }
                            }
                        }
                    }
                }
            }

            return r;
        }
    };

    /**
     * abstract quiz class
     *
     * This class provides drag&drop functionality.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors._abstractQuiz = function(element) {
        var t = this;

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * a user's number of attempts to solve the quiz
         *
         * @param int
         */
        t.attempts = 0;

        /**
         * a quiz's container element
         *
         * The container element is any block element with a
         * suitable class name. The framework's begin method
         * will recognize this class name and instantiate a
         * quiz object with a reference to this block element
         * as argument for the constructor.
         */
        t.container = element;

        /**
         * a quiz's data
         *
         * We are going to analyze a <table> element for its
         * columns. The columns' contents of every row get
         * stored in an array. These arrays get stored in the
         * this.data array.
         */
        t.data = [];

        /**
         * class name for draggable elements
         *
         * @var String
         */
        t.draggableClass = "rquiz-draggable";

        /**
         * class name for dragged elements
         *
         * @var String
         */
        t.draggingClass = "rquiz-dragging";

        /**
         * element to be dragged
         *
         * @var Object HTMLElement
         */
        t.dragElm = null;

        /**
         * flag for drag element in motion
         *
         * @var bool
         */
        t.dragging = false;

        /**
         * flag for drag&drop mode
         *
         * @var bool
         */
        t.dragMode = false;

        /**
         * class name for elements marked as error
         *
         * @var String
         */
        t.errorClass = "rquiz-error";

        /**
         * class name for the container of a finished quiz
         *
         * @var String
         */
        t.finishedClass = "rquiz-finished";

        /**
         * class name for "pieces" (data-carrying elements)
         *
         * @var String
         */
        t.highlightClass = "rquiz-highlighted";

        /**
         * a quiz's language setting
         *
         * The language setting defaults to "de" because of
         * backwards compatibilty with older versions of this
         * script. If the container element has a "lang"
         * attribute and if its value is supported by the
         * framework's i18n property, the quiz's language
         * setting will be changed to the container element's
         * "lang" attribute value.
         */
        t.lang = "da"; // default

        /**
         * last known mouse or touch coordinates
         *
         * @var Object
         */
        t.lastCoords = {
            left: 0,
            top: 0
        };

        /**
         * a quiz's pieces
         *
         * Some quizzes need to store references to data-carrying
         * elements. This array is exactly for that purpose.
         */
        t.pieces = [];

        /**
         * class name for "pieces" (data-carrying elements)
         *
         * @var String
         */
        t.piecesClass = "rquiz-piece";

        /**
         * a quiz's pool element
         *
         * Some quizzes that use drag&drop need an area where
         * the draggable elements are placed. The pool element
         * is this very area.
         */
        t.pool = document.createElement("p");

        /**
         * class name for data pools
         *
         * @var String
         */
        t.poolClass = "rquiz-pool";

        /**
         * class name for elements that are not to be displayed
         * on-screen but on paper only
         *
         * @param String
         */
        t.printOnlyClass = "rquiz-print";

        /**
         * a quiz's name
         *
         * The quiz's name is relevant when drag&drop elements
         * need to get identified as part of this individual
         * quiz.
         *
         * @var String
         */
        t.quizName = "rquiz" + q.allQuizzes.length;

        /**
         * a quiz's restart button
         *
         * @param Object HTMLElement <button>
         */
        t.restartButton = document.createElement("button");

        /**
         * a quiz's message field element
         *
         * Every quiz will give feedback on how well a user has
         * done. At the end of such a message there will be the
         * quiz's restart button to offer the user another go on
         * this quiz.
         */
        t.result = document.createElement("p");

        /**
         * a quiz's result button
         *
         * @param Object HTMLElement <button>
         */
        t.resultButton = document.createElement("button");

        /**
         * class name for the result box
         *
         * @var String
         */
        t.resultClass = "rquiz-result";

        /**
         * class name for elements that are not to be displayed
         * on paper but on screen only
         *
         * @param String
         */
        t.screenOnlyClass = "rquiz-screen";

        /**
         * class name for drag&drop targets
         *
         * @var String
         */
        t.targetClass = "rquiz-target";

        /**
         * a quiz's drag&drop target fields
         *
         * @var Array
         */
        t.targets = [];

        /**
         * class name for the result box when an AJAX call hasn't
         * yet returned
         *
         * @var String
         */
        t.waitClass = "rquiz-waiting";

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to create a grid filled with words either
         * crossword-style or with diagonally placed words
         *
         * A "word" is an object with this structure: {
         * 	hint: (String), // optional - used in crossword quizzes
         * 	orientation: (String), // (→|↓|↘|↗)
         * 	original: (String), // optional - used in wordsearch quizzes
         * 	upperCase: (String),
         * 	x: (int),
         * 	y: (int)
         * }
         *
         * If "interlinked" words are expected the function will
         * try up to ten times to get a solution where all words
         * are interlinked.
         *
         * If "diagonally" placed words are expected the words
         * will be placed in such a way that the reading
         * direction will always be from left to right, no
         * matter if the beginning is on the upper or lower end.
         *
         * @param Array the words to be placed within the grid
         * @param bool interlink words on a common character ifpossible
         * @param bool also try to place words diagonally
         * @param bool no empty spaces between words necessary (true for wordsearch quizzes)
         */
        t.createWordGrid = function(words, interlinked, diagonally, noEmptySpaces) {
            var finished = [], // collect usable grids here
                taints = 1,
                maxAttempts = interlinked ? 10 : 1,
                orientations = (diagonally ? "→↓↘↗" : "→↓").split(""),
                a, b, i, failed, fitted, grid, letters,
                possibleOrientations, r, test, used, word, x, y;

            /* create a grid - if impossible without taints,
             * try up to maxAttempts times */
            while (taints > 0 && finished.length < maxAttempts) {

                taints = 0; // expect a perfect grid without taints
                used = []; // no used words so far
                failed = []; // no unsuccessfully tried words so far

                // begin with a grid of 0x0 fields and ...
                test = 0;

                // ... expand to maxChars x maxChars
                q.each(words, function(w) {
                    // number of a word's chars +2 as padding
                    test += w.upperCase.length + 2;
                });

                grid = new Array(test);

                for (i = 0; i < test; i++) {
                    grid[i] = new Array(test);
                }

                // try to place words into the grid in random order
                while (used.length < words.length) {

                    test = true; // force new random number

                    while (test) {

                        r = Math.floor(Math.random() * words.length);
                        // expect this random number to be unused
                        test = false;

                        // word already used?
                        q.each(used, function(a) {

                            if (a.upperCase == words[r].upperCase) {
                                test = true;
                            }
                        });

                        if (failed.length > 0) {

                            /* exclude words that have been
                             * tried unsuccessfully */
                            q.each(failed, function(e) {

                                if (words[r] == e) {
                                    test = true;
                                }
                            });
                        }
                    }

                    // we got an unused word to fit into the grid
                    word = words[r];
                    word.x = -1;
                    word.y = -1;

                    // find suitable position in the grid
                    if (used.length > 0) {

                        /* fit another word
                         * -> check with already fitted words */
                        for (a = 0; a < used.length; a++) {

                            // already found suitable position?
                            if (word.x >= 0 && word.y >= 0) {
                                break; // yes! -> stop right here
                            }

                            /* randomly choose a letter and look
                             * for a match with fitted word */
                            letters = []; // empty used letters

                            for (b = 0; b < word.upperCase.length; b++) {

                                // found suitable position?
                                if (word.x >= 0 && word.y >= 0) {
                                    break; // yes! -> stop right here
                                }

                                test = true; // force new random number

                                while (test) {
                                    r = Math.floor(Math.random() * word.upperCase.length);
                                    test = letters[r];
                                }

                                // mark this random letter as used
                                letters[r] = true;

                                // both words contain this letter?
                                if (used[a].upperCase.indexOf(
                                        word.upperCase.substr(r, 1)
                                    ) >= 0) {

                                    // yes! -> check every letter of fitted word
                                    for (
                                        fitted = 0; fitted < used[a].upperCase.length; fitted++
                                    ) {

                                        // word already successfully fitted?
                                        if (word.x >= 0 && word.y >= 0) {
                                            break; // yes! -> stop right here
                                        }

                                        if (used[a].upperCase.substr(fitted, 1) ==
                                            word.upperCase.substr(r, 1)
                                        ) {

                                            /* determined common letter
                                             * -> test-fit word into grid */
                                            test = true; // expect success

                                            /* determine position
                                             * of the letter inside the grid */
                                            if (used[a].orientation == "→") {
                                                x = used[a].x + fitted;
                                                y = used[a].y;
                                            }

                                            if (used[a].orientation == "↓") {
                                                x = used[a].x;
                                                y = used[a].y + fitted;
                                            }

                                            if (used[a].orientation == "↘") {
                                                x = used[a].x + fitted;
                                                y = used[a].y + fitted;
                                            }

                                            if (used[a].orientation == "↗") {
                                                x = used[a].x + fitted;
                                                y = used[a].y - fitted;
                                            }

                                            /* determine possible
                                             * orientations for the word */
                                            possibleOrientations = [];

                                            for (
                                                i = 0; i < orientations.length; i++
                                            ) {

                                                if (orientations[i] !=
                                                    used[a].orientation
                                                ) {
                                                    possibleOrientations.push(
                                                        orientations[i]
                                                    );
                                                }
                                            }

                                            q.shuffleArray(possibleOrientations);

                                            while (possibleOrientations.length) {
                                                // decide direction
                                                word.orientation = possibleOrientations.pop();

                                                /* determine start position
                                                 * of the word inside the grid
                                                 * with r being the distance
                                                 * between current letter and
                                                 * initial letter of the word */
                                                if (word.orientation == "↓") {
                                                    y = y - r;
                                                }

                                                if (word.orientation == "→") {
                                                    x = x - r;
                                                }

                                                if (word.orientation == "↘") {
                                                    x = x - r;
                                                    y = y - r;
                                                }

                                                if (word.orientation == "↗") {
                                                    x = x - r;
                                                    y = y + r;
                                                }

                                                // check if needed fields are already occupied
                                                for (
                                                    i = 0; i < word.upperCase.length; i++
                                                ) {

                                                    if (word.orientation == "→") {

                                                        if (grid[y][x + i] &&
                                                            grid[y][x + i] !=
                                                            word.upperCase.substr(i, 1)
                                                        ) {
                                                            test = false;
                                                        }

                                                        // neighbouring field empty?
                                                        if (!noEmptySpaces) {

                                                            /* check all used words if they
                                                             * run parallel in a neighbouring
                                                             * row alongside the current word */
                                                            q.each(used, function(a) {

                                                                if (a.orientation == "→" &&
                                                                    (
                                                                        a.y + 1 == y ||
                                                                        a.y - 1 == y
                                                                    )
                                                                ) {

                                                                    if (
                                                                        (
                                                                            // neighbouring word longer?
                                                                            a.x <= x &&
                                                                            a.upperCase.x + a.upperCase.length >= x + word.upperCase.length
                                                                        ) || (
                                                                            // neighbouring word overlaps beginning of current word
                                                                            a.x <= x &&
                                                                            a.x + a.upperCase.length >= x
                                                                        ) || (
                                                                            // neighbouring word starts inside of current word
                                                                            a.x > x &&
                                                                            a.x <= x + word.upperCase.length
                                                                        )
                                                                    ) {
                                                                        test = false; // yes -> discard
                                                                    }
                                                                }

                                                                // vertical word begins directly below?
                                                                if (a.orientation == "↓" && a.y - 1 == y) {

                                                                    if (a.x >= x &&
                                                                        a.x <= x + word.upperCase.length
                                                                    ) {
                                                                        test = false; // yes -> discard
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }

                                                    if (word.orientation == "↓") {

                                                        if (grid[y + i][x] &&
                                                            grid[y + i][x] != word.upperCase.substr(i, 1)
                                                        ) {
                                                            test = false;
                                                        }

                                                        // neighbouring field empty?
                                                        if (!noEmptySpaces) {
                                                            /* check all used words if they run
                                                             * parallel in a neighbouring column
                                                             * alongside the current word */
                                                            q.each(used, function(a) {

                                                                if (a.orientation == "↓" &&
                                                                    (a.x == x + 1 ||
                                                                        a.x == x - 1)
                                                                ) {
                                                                    if ( // neighbouring word longer?
                                                                        (a.y <= y &&
                                                                            a.upperCase.y + a.upperCase.length >= y + word.upperCase.length) ||
                                                                        // neighbouring word overlaps beginning of current word
                                                                        (a.y <= y &&
                                                                            a.y + a.upperCase.length >= y) ||
                                                                        // neighbouring word starts inside of current word
                                                                        (a.y > y &&
                                                                            a.y <= y + word.upperCase.length)
                                                                    ) {
                                                                        test = false; // leider nein
                                                                    }
                                                                }
                                                                // horizontal word begins directly below?
                                                                if (a.orientation == "→" &&
                                                                    (
                                                                        a.x == x + 1 ||
                                                                        a.x == x - word.upperCase.length - 1
                                                                    )
                                                                ) {
                                                                    if (a.y >= y &&
                                                                        a.y <= y + word.upperCase.length
                                                                    ) {
                                                                        test = false; // yes -> discard
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }

                                                    if (word.orientation == "↘") {

                                                        if (grid[y + i][x + i] &&
                                                            grid[y + i][x + i] != word.upperCase.substr(i, 1)
                                                        ) {
                                                            test = false;
                                                        }
                                                    }

                                                    if (word.orientation == "↗") {

                                                        if (grid[y - i][x + i] &&
                                                            grid[y - i][x + i] != word.upperCase.substr(i, 1)
                                                        ) {
                                                            test = false;
                                                        }
                                                    }
                                                }

                                                // check fields before and after the word
                                                if (word.orientation == "→") {

                                                    if (grid[y][x - 1] ||
                                                        grid[y][x + word.upperCase.length]
                                                    ) {
                                                        test = false;
                                                    }
                                                }

                                                if (word.orientation == "↓") {

                                                    if (grid[y - 1][x] ||
                                                        grid[y + word.upperCase.length][x]
                                                    ) {
                                                        test = false;
                                                    }
                                                }

                                                if (word.orientation == "↘") {

                                                    if (grid[y - 1][x - 1] ||
                                                        grid[y + word.upperCase.length][x + word.upperCase.length]
                                                    ) {
                                                        test = false;
                                                    }
                                                }

                                                if (word.orientation == "↗") {

                                                    if (grid[y + 1][x - 1] ||
                                                        grid[y - word.upperCase.length][x + word.upperCase.length]
                                                    ) {
                                                        test = false;
                                                    }
                                                }

                                                if (test) {
                                                    // word fits! -> no discarding
                                                    word.x = x;
                                                    word.y = y;
                                                    failed = []; // try failed words again
                                                    break; // no more tests for current word
                                                }
                                            }

                                            if (test) {
                                                break; // no more tests for current word
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (word.x < 0 && word.y < 0) {

                            /* no place in the grid to fit this word
                             * -> remember for later */
                            failed.push(word);

                            if (failed.length == (words.length - used.length)) {

                                /* there seems to be no suitable place in
                                 * the grid for the remaining words...
                                 * -> look for a free space for the current
                                 * word!
                                 * -> top (0), left (1), bottom(2) or right(3)
                                 */
                                taints++;

                                r = Math.floor(Math.random() * 4);

                                if (r & 1 == 1) {
                                    // left / right
                                    y = Math.floor(grid.length / 2) - Math.floor(word.upperCase.length / 2);
                                    // value must be greater or smaller
                                    x = (r & 2) == 2 ? 0 : grid[0].length;

                                } else {
                                    // top / bottom
                                    x = Math.floor(grid[0].length / 2);
                                    y = (r & 2) == 2 ? 0 : grid.length;
                                }

                                word.orientation = (r & 1) == 0 ? "→" : "↓";

                                /* check coordinates of used words
                                 * in order to find suitable place */
                                q.each(used, function(a) {

                                    if ((r & 1) == 1) {

                                        // reduce left / right
                                        if ((r & 2) == 0 && a.x < x) {
                                            x = a.x;
                                        }

                                        if ((r & 2) == 2) {

                                            test = a.x;

                                            if (a.orientation == "→") {
                                                test += a.upperCase.length;
                                            }

                                            if (test > x) {
                                                x = test;
                                            }
                                        }

                                    } else {

                                        // reduce top / down
                                        if ((r & 2) == 0 && a.y < y) {
                                            y = a.y;
                                        }

                                        if ((r & 2) == 2) {

                                            test = a.y;

                                            if (a.orientation == "↓") {
                                                test += a.upperCase.length;
                                            }

                                            if (test > y) {
                                                y = test;
                                            }
                                        }
                                    }
                                });

                                // suitable place found!
                                word.x = (r & 2) == 0 ? x - 2 : x + 2;
                                word.y = (r & 2) == 0 ? y - 2 : y + 2;

                                failed = [];
                            }
                        }

                    } else {

                        // first word -> immediately fit vertically
                        word.x = Math.floor(grid[0].length / 2);
                        word.y = Math.floor(grid.length / 2) - Math.floor(word.upperCase.length / 2);
                        word.orientation = "↓";
                    }

                    // save the word if it could successfully fit in the grid
                    if (word && word.x >= 0 && word.y >= 0) {

                        used.push(word);

                        // insert the word's letters into the grid
                        for (i = 0; i < word.upperCase.length; i++) {

                            if (word.orientation == "→") {
                                grid[word.y][word.x + i] = word.upperCase.substr(i, 1);
                            }

                            if (word.orientation == "↓") {
                                grid[word.y + i][word.x] = word.upperCase.substr(i, 1);
                            }

                            if (word.orientation == "↘") {
                                grid[word.y + i][word.x + i] = word.upperCase.substr(i, 1);
                            }

                            if (word.orientation == "↗") {
                                grid[word.y - i][word.x + i] = word.upperCase.substr(i, 1);
                            }
                        }
                    }
                }

                // save finished grid
                finished.push({
                    grid: grid,
                    data: used,
                    taints: taints
                });
            }

            // we might have more than one usable grid
            if (taints > 0) {

                /* there seems to be no perfect grid
                 * -> choose best among tainted ones */
                test = false;

                q.each(finished, function(f) {

                    if (!test || f.taints < test.taints) {
                        test = f;
                    }
                });

                // choose best try
                grid = test.grid;
                used = test.data;

            }

            // trim selected grid
            a = {
                x: {
                    min: grid[0].length,
                    max: 0
                },

                y: {
                    min: grid.length,
                    max: 0
                }
            };

            for (y = 0; y < grid.length; y++) {

                for (x = 0; x < grid[0].length; x++) {

                    // field occupied? -> use coordinates
                    if (grid[y][x]) {

                        // decrease min value if possible
                        a.x.min = (a.x.min > x) ? x : a.x.min;
                        a.y.min = (a.y.min > y) ? y : a.y.min;

                        // increase max value if needed
                        a.x.max = (a.x.max < x) ? x : a.x.max;
                        a.y.max = (a.y.max < y) ? y : a.y.max;
                    }
                }
            }

            /* min/max values determined
             * -> transfer grid contents into reduced grid */
            test = new Array(a.y.max - a.y.min + 1);

            // rows
            for (y = 0; y < (a.y.max - a.y.min + 1); y++) {

                test[y] = new Array(a.x.max - a.x.min + 1);

                // columns
                for (x = 0; x < (a.x.max - a.x.min + 1); x++) {

                    if (grid[y + a.y.min][x + a.x.min]) {
                        // copy contents
                        test[y][x] = grid[y + a.y.min][x + a.x.min];
                    }
                }
            }

            grid = test; // replace old grid with reduced grid

            // update coordinates of words inside reduced grid
            for (i = 0; i < used.length; i++) {
                used[i].x = used[i].x - a.x.min;
                used[i].y = used[i].y - a.y.min;
            }

            return {
                grid: grid,
                words: used
            };
        };

        /**
         * function to initiate a drag&drop operation
         *
         * This function returns
         * - false if a drag&drop operation is in process
         * - true if no drag&drop operation is in process
         *
         * @param Event
         * @return bool
         */
        t.dragStart = function(e) {
            var test = t.getEventElement(e);

            if (e.touches && e.touches[0]) {
                t.lastCoords.left = e.touches[0].clientX;
                t.lastCoords.top = e.touches[0].clientY;
            }

            /* make sure we got an element that really is supposed to
             * be dragged around */
            while (
                test != document.body &&
                (!test.className ||
                    !test.classList.contains(t.draggableClass)
                )
            ) {
                test = test.parentNode;
            }

            if (test != document.body &&
                test.classList.contains(t.draggableClass)
            ) {
                t.dragMode = true;

                // remove focus on any <input> elements
                q.each(document.querySelectorAll("input"), function(i) {
                    try {
                        i.blur();
                    } catch (e) {}
                });

                t.dragElm = test;
                t.dragElm.classList.add(t.draggingClass);

                e.preventDefault();
            }

            return !t.dragMode;
        };

        /**
         * function to end a drag&drop operation
         *
         * This function returns
         * - false if a drag&drop operation is in process
         * - true if no drag&drop operation is in process
         *
         * @param Event
         * @return bool false
         */
        t.dragStop = function(e) {
            // no drag&drop element? end right here
            if (!t.dragElm || !t.dragElm.className) {
                return false;
            }

            t.repairDragAndDropOnIE();

            if (t.dragging) {

                // reset position of dragged element
                t.dragElm.style.top = "";
                t.dragElm.style.left = "";
                t.dragElm.classList.remove(t.draggingClass);
            }

            // remove dragging state from dragged element
            t.dragElm.classList.remove(t.draggingClass);

            // resolve drag&drop operation?
            if (t.dragging && t.resolveDragDrop) {
                t.resolveDragDrop();
            }

            // empty drag&drop-related variables
            t.dragElm = null;
            t.dragging = false;
            t.dragMode = false;

            // un-highlight drag&drop target
            if (t.highlightElm) {
                t.highlightElm.classList.remove(t.highlightClass);
                t.highlightElm = null;
            }

            return false;
        };

        /**
         * function to record current mouse or touch coordinates
         * and move dragged element during a drag&drop operation
         *
         * @param Event
         * @return bool true
         */
        t.dragWhile = function(e) {
            var left = e.clientX,
                top = e.clientY,
                dx, dy;

            if (e.touches) {
                left = e.touches[0].clientX;
                top = e.touches[0].clientY;
            }

            dx = t.lastCoords.left - left;
            dy = t.lastCoords.top - top;

            // save current coordinates
            t.lastCoords.left = left;
            t.lastCoords.top = top;

            // no drag&drop operation in process? finish right here
            if (!t.dragElm || !t.dragMode) {
                return true;
            }

            // tell quiz that a drag&drop operation is in process
            t.dragging = true;

            e.preventDefault();

            // calculate distance to last coordinates of the dragged element
            left = 0; // presume the element hasn't been moved yet
            top = 0;

            // get actual relative position of the dragged element
            if (t.dragElm.style.left) {
                left = parseFloat(t.dragElm.style.left);
                top = parseFloat(t.dragElm.style.top);
            }

            t.dragElm.style.left = left - dx + "px";
            t.dragElm.style.top = top - dy + "px";

            t.highlightTarget();

            return true;
        };

        /**
         * function to finalize a quiz
         *
         * This method expects a quiz to already have an element
         * in the container which is stored as the quiz's t.pool
         * property.
         *
         * - set a link blocker on any link
         * - add quiz to framework's allQuizzes property
         * - associate pieces with quiz
         * - set result box
         * - start the quiz
         *
         * @param bool don't call t.start()
         */
        t.finalize = function(noStart) {
            /* In a MediaWiki environment an <img> element is
             * always embedded in a hyperlink which links to a
             * page with meta data on this image. In an active
             * quiz this link is irritating since it makes the
             * browser leave the current quiz page. This is why
             * a hyperlink blocker is necessary as long as a
             * quiz is unfinished. */
            var block = function(el) {
                q.each(
                    el.getElementsByTagName("a"),
                    function(a) {
                        a.addEventListener("click", function(e) {

                            // allow only if quiz is finished
                            if (t.container.classList.contains(
                                    t.finishedClass
                                )) {
                                return true;
                            }

                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        });
                    }
                );
            };

            // set button text
            t.resultButton.innerHTML = q.i18n[t.lang].check;
            t.restartButton.innerHTML = q.i18n[t.lang].restart;

            // equip restart button with functionality
            t.restartButton.addEventListener("click", function() {
                t.start();
            });

            // equip result button with functionality
            t.resultButton.addEventListener("click", function() {
                t.end();
            });

            // check container for hyperlinks
            block(t.container);

            /* Check drag&drop pieces since they have not been
             * appended to the container yet */
            q.each(t.pieces, block);

            // add quiz to framework
            q.allQuizzes.push(t);

            // associate all pieces with this quiz
            q.each(t.pieces, function(p) {
                p.setAttribute("data-quiz", t.quizName);
            });

            // place result box after the pool element
            t.pool.parentNode.insertBefore(
                t.result,
                t.pool.nextSibling
            );

            // place restart button into result box
            t.result.appendChild(t.restartButton);

            // set suitable ID for the quiz's container element
            t.container.id = t.quizName;

            // add eventlisteners to record mouse or touch coordinates
            t.container.addEventListener("mousemove", t.dragWhile);
            t.container.addEventListener("touchmove", t.dragWhile);

            // equip required class names
            t.pool.classList.add(t.poolClass);
            t.result.classList.add(t.resultClass);

            // let's start this quiz
            if (!noStart) {
                t.start();
            }
        };

        /**
         * function to determine the element that is to be dragged
         * respecting touch devices as well
         *
         * @param Event
         * @return HTMLElement
         */
        t.getEventElement = function(e) {
            e = e || window.event; // W3C DOM <-> IE

            // touch device?
            if (e.touches) {
                return document.elementFromPoint(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                );
            }

            // mouse event
            return e.target || e.srcElement; // W3C DOM <-> IE
        };

        /**
         * function to hide or show the result button
         *
         * Showing the button means to append it to t.pool.
         *
         * @param bool
         */
        t.hideResultButton = function(showInstead) {

            if (!showInstead) {

                if (t.resultButton.parentNode) {
                    t.resultButton.parentNode.removeChild(t.resultButton);
                }

            } else {

                t.pool.appendChild(t.resultButton);
            }
        };

        /**
         * function to highlight a possible drag&drop target
         *
         * @param Event
         * @return bool true
         */
        t.highlightTarget = function() {
            var targets;

            // presume there is no current drag&drop target
            t.highlightElm = null;

            // we need the quiz's targets of course
            targets = t.targets;

            // the quiz's pool is a valid target, too!
            targets.push(t.pool);

            // iterate through all targets
            q.each(
                targets,
                function(element) {
                    var rect = element.getBoundingClientRect();

                    // un-highlight possible previous target
                    element.classList.remove(t.highlightClass);

                    // are we inside a possible drag&drop target?
                    if (rect.top < t.lastCoords.top &&
                        rect.left < t.lastCoords.left &&
                        rect.bottom > t.lastCoords.top &&
                        rect.right > t.lastCoords.left
                    ) {
                        // yes!
                        element.classList.add(t.highlightClass);
                        t.highlightElm = element;
                    }
                }
            );
        };

        /**
         * function to handle key strokes
         *
         * @param event
         * @return bool false
         */
        t.keyUp = function(e) {
            var input = t.getEventElement(e),
                fields = input.parentNode.getElementsByTagName("label"),
                currentIndex = fields.length,
                char;

            q.each(fields, function(l, i) {

                if (l.classList.contains(t.focusClass)) {
                    currentIndex = i;
                }
            });

            switch (e.keyCode) {

                case 27: // ESC
                    // close dialog
                    t.check();
                    break;

                case 35: // End
                    // focus last field
                    fields[currentIndex].classList.remove(t.focusClass);
                    fields[fields.length - 1].classList.add(t.focusClass);
                    break;

                case 36: // Home
                    // focus first field
                    fields[currentIndex].classList.remove(t.focusClass);
                    fields[0].classList.add(t.focusClass);
                    break;

                case 37: // Cursor left
                case 8: // Backspace
                    // focus previous field
                    if (currentIndex < fields.length) {
                        fields[currentIndex].classList.remove(t.focusClass);
                    }

                    currentIndex = (
                        currentIndex > 0 ?
                        currentIndex - 1 :
                        0
                    );

                    // empty <input> or its contents will get used!
                    input.value = "";

                    // remove field contents on back space
                    if (e.keyCode == 8) {
                        fields[currentIndex].innerHTML = String.fromCharCode(160);
                    }

                    fields[currentIndex].classList.add(t.focusClass);
                    break;

                case 39: // Cursor right
                    // focus next field
                    fields[currentIndex].classList.remove(t.focusClass);

                    currentIndex = (
                        currentIndex === fields.length - 1 ?
                        currentIndex :
                        currentIndex + 1
                    );

                    fields[currentIndex].classList.add(t.focusClass);
                    break;
            }

            if (input.value.length > 0) {

                // use first entered letter
                char = q.utf8NormalizeToUpper(input.value.substr(0, 1));

                // empty <input> (some Android softkeyboards need a timeout)
                setTimeout(function() {
                    input.value = "";
                }, 10);

                q.each(char, function(c) {

                    fields[currentIndex].innerHTML = c;
                    fields[currentIndex].classList.remove(t.focusClass);

                    if (currentIndex < fields.length - 1) {
                        currentIndex++;
                        fields[currentIndex].classList.add(t.focusClass);
                    }
                });
            }

            return false;
        };

        /**
         * function to prepare the resultbox with feedback
         *
         * This method uses a quiz's attempts property to compute a
         * standardized feedback to the user. A custom feedback can
         * be used with an optional parameter.
         *
         * @param String optional
         */
        t.prepareResult = function() {
            var s = "";

            // use standard feedback?
            if (!arguments.length) {

                // first the praise
                s = (
                    t.attempts > 2 ?
                    q.i18n[t.lang].praise3 :
                    q.i18n[t.lang]["praise" + t.attempts]
                ) + " ";

                // then the result
                s += (
                    t.attempts > 2 ?
                    q.i18n[t.lang].result3 :
                    q.i18n[t.lang]["result" + t.attempts]
                ).replace("%n", t.attempts);

            } else {

                // custom feedback
                s = arguments[0];
            }

            s += " ";

            // empty box
            while (t.result.firstChild) {
                t.result.removeChild(t.result.firstChild);
            }

            // insert feedback and restart button
            t.result.appendChild(document.createTextNode(s));

            t.result.appendChild(t.restartButton);
        };

        /**
         * function to remove event listeners from a quiz container
         */
        t.removeDragDropListeners = function() {
            t.container.removeEventListener("mousedown", t.dragStart);
            t.container.removeEventListener("mouseup", t.dragStop);
            t.container.removeEventListener("touchstart", t.dragStart);
            t.container.removeEventListener("touchend", t.dragStop);
            t.container.removeEventListener("touchcancel", t.dragStop);
        };

        /**
         * function to supress unwanted text selection when drag&drop
         * operation is in process
         *
         * @param bool on/off
         */
        t.repairDragAndDropOnIE = function(on) {

            var f = function() {
                return false;
            };

            if (on) {

                document.addEventListener("selectstart", f);
                document.addEventListener("dragstart", f);

            } else {

                document.removeEventListener("selectstart", f);
                document.removeEventListener("dragstart", f);
            }
        };

        /**
         * function to add event listener functions to a quiz container
         */
        t.setDragDropListeners = function() {
            t.container.addEventListener("mousedown", t.dragStart);
            t.container.addEventListener("mouseup", t.dragStop);
            t.container.addEventListener("touchstart", t.dragStart);
            t.container.addEventListener("touchend", t.dragStop);
            t.container.addEventListener("touchcancel", t.dragStop);
        };

        /**
         * function to upload data about tries and quiz type
         *
         * This function expects a certain object window.rQuizUploader
         * provided by an external JavaScript. If such an object is
         * available and has the required structure, a quiz can use it
         * to send a POST request to the server.
         */
        t.uploadData = function() {

            if (typeof window.rQuizUploader != "function") {
                return;
            }

            window.rQuizUploader({
                quizType: t.type,
                attempts: t.attempts,
                end: function(lastNoOfAttempts) {
                    var txt = "";

                    if (lastNoOfAttempts.length > 0) {
                        txt = (
                            q.i18n[t.lang].attemptsLastTime + " "
                        ).replace(/%n/, lastNoOfAttempts);
                    }

                    t.restartButton.parentNode.insertBefore(
                        document.createTextNode(txt),
                        t.restartButton
                    );

                    t.result.classList.remove(t.waitClass);
                }
            });

            t.result.classList.add(t.waitClass);
        };

        /* update this quiz's language setting
         * if a lang attribute has been provided */
        if (element.hasAttribute("lang") &&
            q.i18n[element.getAttribute("lang")]
        ) {
            t.lang = element.getAttribute("lang");
        }
    };

    /**
     * crossword quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.crossword = function(element) {
        var t = this;

        // ensure inheritance
        q.quizConstructors._abstractQuiz.call(t, element);

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * dialog for the user to input a word's letters
         *
         * @var Object HTMLElement
         */
        t.dialog = document.createElement("dialog");

        /**
         * class name for focussed dialog fields
         *
         * @param String
         */
        t.focusClass = "rquiz-focus";

        /**
         * form element for use in the quiz's dialog
         *
         * @var Object HTMLElement
         */
        t.forms = {
            h: document.createElement("form"),
            v: document.createElement("form")
        };

        /**
         * the visible grid
         *
         * @param Array
         */
        t.grid = [];

        /**
         * class name for hidden result button
         *
         * @param String
         */
        t.hiddenClass = "rquiz-hidden";

        /**
         * test input element for use in the quiz's form
         *
         * @var Object HTMLElement
         */
        t.inputs = {
            h: document.createElement("input"),
            v: document.createElement("input")
        };

        /**
         * printable contents
         *
         * @param String
         */
        t.printSheet = document.createElement("table");

        /**
         * class name for element to unhide
         *
         * @param String
         */
        t.showClass = "rquiz-show";

        /**
         * class name for the number tag in the dialog
         *
         * @param String
         */
        t.tagClass = "rquiz-tag";

        /**
         * the words inside the grid and their positions
         *
         * @param Array
         */
        t.words = [];

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to check if all fields are filled out and
         * if the result button is to be displayed
         */
        t.check = function() {
            var complete = true, // expect a full quiz
                c, x, y;

            // check all cells
            for (y = 0; y < t.grid.length; y++) {

                for (x = 0; x < t.grid[y].length; x++) {

                    c = t.table.rows[y].cells[x];

                    if (c.hasAttribute("data-c") &&
                        q.trim(c.textContent).length < 1
                    ) {
                        complete = false;
                    }
                }
            }

            // offer result button?
            t.hideResultButton(complete);

            // close dialog
            if (location.href.match(/\#rquiz\d+_dialog/)) {
                history.back();
            }

            return false;
        };

        /**
         * function to decide what to do when the user clicks something
         *
         * @param Event
         * @return bool false
         */
        t.click = function(e) {
            var el = t.getEventElement(e),
                instructions = document.querySelector(
                    "#%s dialog > div > p".replace(/%s/g, t.quizName)
                ),
                closers = document.querySelectorAll(
                    (
                        // <dialog> itself (back drop)
                        "#%s dialog, "
                        // and the close icon
                        +
                        "#%s dialog > div > span"
                    ).replace(/%s/g, t.quizName)
                ),
                data = {
                    tag: 0,
                    words: []
                },
                div = t.dialog.getElementsByTagName("div")[0],
                fields = t.dialog.getElementsByTagName("label");

            // only do anything when the quiz isn't finished
            if (t.container.classList.contains(t.finishedClass)) {
                return false;
            }

            // toggle visibility of dialog instructions
            if (el == instructions) {
                instructions.classList.toggle(t.showClass);
            }

            // set focus on a dialog field?
            if (el.tagName.match(/^label$/i)) {
                q.each(fields, function(f) {

                    if (el == f) {

                        f.classList.add(t.focusClass);

                    } else {

                        f.classList.remove(t.focusClass);
                    }
                });
            }

            // close dialog?
            q.each(closers, function(c) {

                if (el == c) {
                    t.check();
                }
            });

            // show dialog?
            if (el.hasAttribute("data-tag")) {

                data.tag = el.getAttribute("data-tag");

                // get solution words that start at this cell
                q.each(t.words, function(word) {

                    if (t.table.rows[word.y] &&
                        t.table.rows[word.y].cells[word.x] &&
                        el == t.table.rows[word.y].cells[word.x]
                    ) {
                        data.words.push(word);
                    }
                });
            }

            // prepare dialog elements based on grid cell data
            if (data.words.length && data.tag > 0) {

                // remove forms from div
                q.each(t.forms, function(f) {

                    if (f.parentNode) {
                        f.parentNode.removeChild(f);
                    }
                });

                // insert stuff for every word
                q.each(data.words, function(word) {
                    var f = (
                            word.orientation == "→" ?
                            t.forms.h :
                            t.forms.v
                        ),
                        id = t.quizName + (
                            word.orientation == "→" ?
                            "_ih" :
                            "_iv"
                        ),
                        i, p, x, y;

                    // insert form
                    div.appendChild(f);

                    // empty form
                    while (f.firstChild) {
                        f.removeChild(f.firstChild);
                    }

                    // insert a hint for the solution
                    p = f.appendChild(document.createElement("p"));

                    // corresponding tag
                    p.appendChild(q.create({
                        tagName: "span",
                        text: data.tag,
                        className: t.tagClass
                    }));

                    p.appendChild(document.createTextNode(
                        word.orientation + " " + word.hint
                    ));

                    // display fields for every letter of the word
                    p = f.appendChild(document.createElement("p"));

                    // add the corresponding input
                    p.appendChild(
                        word.orientation == "→" ?
                        t.inputs.h :
                        t.inputs.v
                    );

                    for (i = 0; i < word.upperCase.length; i++) {

                        x = word.x;
                        y = word.y;

                        if (word.orientation == "→") {

                            x += i;

                        } else {

                            y += i;
                        }

                        p.appendChild(q.create({
                            tagName: "label",
                            htmlFor: id,
                            text: q.trim(
                                t.table.rows[y].cells[x].textContent
                            )
                        }));

                        // set coordinates of corresponding grid element
                        p.lastChild.setAttribute("data-x", x);
                        p.lastChild.setAttribute("data-y", y);
                    }

                    // add submit button
                    p.appendChild(q.create({
                        tagName: "button",
                        text: "↲"
                    }));

                });

                // show dialog
                document.location.href = (
                    document.location.href.replace(/\#.*/, "") +
                    "#" + t.quizName + "_dialog"
                );

                // calculate <div>'s position within <dialog>
                setTimeout(
                    function() {
                        var height = div.offsetHeight;

                        div.style.marginTop = (
                            height < t.table.offsetHeight ?
                            (t.table.offsetHeight - height) / 2 + "px" :
                            "0px"
                        );
                    },
                    100
                );

                // highlight first field and focus input
                t.updateForm(t.dialog.getElementsByTagName("form")[0]);
            }

            return false;
        };

        /**
         * function to end a quiz and show result
         */
        t.end = function() {
            var ok = true,
                c, x, y;

            t.attempts++;

            // check all cells
            q.each(t.grid, function(row, y) {

                q.each(row, function(cell, x) {

                    c = t.table.rows[y].cells[x];

                    if (cell && q.trim(c.textContent) != cell) {
                        ok = false;
                    }
                });
            });

            if (ok) {
                t.prepareResult();
                t.container.classList.add(t.finishedClass);
                t.uploadData();
            }
        };

        /**
         * function to handle dialog entries
         *
         * @param event
         * @return bool false
         */
        t.formSubmit = function(e) {
            var el = t.getEventElement(e),
                fields = el.getElementsByTagName("label"),
                forms = t.dialog.getElementsByTagName("form");

            // take each field's contents and write them into the grid
            q.each(fields, function(f) {
                var x = f.getAttribute("data-x"),
                    y = f.getAttribute("data-y");

                t.table.rows[y].cells[x].innerHTML = f.innerHTML;
            });

            // remove current form from the dialog
            el.parentNode.removeChild(el);

            // update another form's fields?
            if (forms.length) {

                t.updateForm(forms[0]);

            } else {

                // no, close dialog
                t.check();
            }

            e.preventDefault();
            e.stopPropagation();

            return false;
        };

        /**
         * function to hide or show the result button
         *
         * Showing the button means to append it to t.pool.
         *
         * @param bool
         */
        t.hideResultButton = function(showInstead) {

            if (!showInstead) {

                t.resultButton.classList.add(t.hiddenClass);

            } else {

                t.resultButton.classList.remove(t.hiddenClass);
            }
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {
            var counter = 1,
                // true = interlinked words:
                grid = t.createWordGrid(t.data, true),
                // we only want the <tbody>:
                printSheet = t.printSheet.getElementsByTagName("tbody")[0],
                x, y, tr, td,
                tryAgain; // this function might fail unexpectedly

            t.grid = grid.grid;
            t.words = grid.words;

            // empty table
            while (t.table.firstChild) {
                t.table.removeChild(t.table.firstChild);
            }

            // prepare table for letters
            for (y = 0; y < t.grid.length; y++) {

                // add new row
                tr = t.table.insertRow(
                    t.table.rows.length <= 0 ?
                    0 :
                    t.table.rows.length
                );

                for (x = 0; x < t.grid[0].length; x++) {

                    // add new cell
                    td = tr.appendChild(document.createElement("td"));

                    // any contents for this cell?
                    if (t.grid[y] &&
                        t.grid[y][x] &&
                        t.grid[y][x].length > 0
                    ) {
                        td.setAttribute("data-c", t.grid[y][x]);
                    }

                    // fill cell with two &nbsp;
                    td.innerHTML = "aa".replace(
                        /a/g,
                        String.fromCharCode(160)
                    );
                }
            }

            // add number tags to cells where a word begins
            q.each(t.words, function(d) {
                var o = "";

                x = d.x;
                y = d.y;

                if (t.table.rows[y] && t.table.rows[y].cells[x]) {

                    td = t.table.rows[y].cells[x];

                    // add a number tag?
                    if (!td.hasAttribute("data-tag")) {
                        td.setAttribute("data-tag", counter++);
                    }
                }
            });

            // remove finished marker
            t.container.classList.remove(t.finishedClass);
            t.check();

            // fill print sheet with printable contents
            q.each(printSheet.getElementsByTagName("td"), function(td) {
                // empty first
                td.parentNode.removeChild(td);
            });

            // create lists
            q.each({
                "horizontal": "→",
                "vertical": "↓"
            }, function(o, s) {
                var dl = document.createElement("dl"),
                    list = [],
                    tr = t.printSheet.getElementsByTagName("tr"),
                    td = document.createElement("td");

                // use last table row to enter cells
                tr[tr.length - 1].appendChild(td);

                // enter definition list into cell
                td.appendChild(dl);

                // create list with hints
                q.each(t.words, function(w) {

                    if (w.orientation == o) {

                        // this seems to die occasionally
                        try {
                            list.push({
                                tag: t.table.rows[w.y].cells[w.x].getAttribute("data-tag"),
                                hint: w.hint
                            });
                        } catch (e) {
                            tryAgain = true;
                        }
                    }
                });

                // sort list of hints according to tag number
                list.sort(function(a, b) {
                    return a.tag - b.tag;
                });

                // fill definition list
                q.each(list, function(l) {
                    // tag
                    dl.appendChild(q.create({
                        tagName: "dt",
                        text: l.tag
                    }));

                    // hint
                    dl.appendChild(q.create({
                        tagName: "dd",
                        text: l.hint
                    }));
                });
            });

            if (tryAgain) {

                t.start();

            } else {

                // position dialog over the grid table
                setTimeout(
                    function() {
                        t.dialog.style.left = (t.table.offsetLeft - 1) + "px";
                        t.dialog.style.top = (t.table.offsetTop - 1) + "px";
                        t.dialog.style.height = (t.table.offsetHeight + 2) + "px";
                        t.dialog.style.width = (t.table.parentNode.offsetWidth) + "px";
                    },
                    1000
                );

                t.pool.appendChild(t.resultButton);
            }
        };

        /**
         * update a dialog's form
         *
         * @param Object <form>
         */
        t.updateForm = function(form) {
            var fields = form.getElementsByTagName("label");

            q.each(fields, function(f) {
                var x = f.getAttribute("data-x"),
                    y = f.getAttribute("data-y");

                f.innerHTML = q.trim(
                    t.table.rows[y].cells[x].textContent
                );
            });

            // highlight first field and focus <input>
            setTimeout(
                function() {
                    fields[0].classList.add(t.focusClass);
                    form.getElementsByTagName("input")[0].focus();
                },
                300
            );
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var f = function() {

                    try {
                        document.styleSheets[0].insertRule(
                            "#" + t.quizName + "_dialog:target { display: block; }",
                            document.styleSheets[0].cssRules.length
                        );
                    } catch (e) {
                        /* a CSP mit prohibit "unsafe-inline" so this
                         * fallback might fail... */
                        document.querySelector("head").appendChild(
                            q.create({
                                tagName: "style",
                                text: "#" + t.quizName + "_dialog:target { display: block; }"
                            })
                        );
                    }
                },
                i, j, tab;

            // extract quiz data from a <table> element in the container
            tab = t.container.getElementsByTagName("table");

            // <table> found?
            if (!tab[0]) {
                return false;
            }

            // get quiz data
            q.each(tab[0].getElementsByTagName("tr"), function(tr) {
                var data = [];

                // search row for values
                q.each(tr.getElementsByTagName("td"), function(td) {
                    var v = q.trim(
                        td.innerHTML.replace(/&nbsp;/, " ")
                    );

                    if (v.length) {
                        data.push(v);
                    }
                });

                /* Accept data only if it has a first and a
                 * second element (search term and hint)! */
                if (data.length > 1) {
                    t.data.push({
                        hint: data[1],
                        upperCase: q.utf8NormalizeToUpper(
                            data[0]
                        )
                    });
                }
            });

            // initialize quiz if suitable data has been found
            if (!t.data.length) {
                return;
            }

            // use initial table as grid display
            t.table = tab[0];

            // place pool directly after the grid display
            tab[0].parentNode.insertBefore(t.pool, tab[0].nextSibling);

            // insert the dialog after the table
            tab[0].parentNode.insertBefore(t.dialog, tab[0].nextSibling);

            /* insert wrapper div into dialog since there is no
             * sufficient support for CSS backdrop yet */
            t.dialog.appendChild(document.createElement("div"));

            // equip dialog with id so CSS can display it based on :target
            t.dialog.id = t.quizName + "_dialog";

            // equip input fields with IDs and filling guidelines
            q.each(t.inputs, function(node, key) {

                node.id = t.quizName + "_i" + key;
                node.setAttribute("autocomplete", "off");

                /* If input loses focus the highlighted fields
                 * must lose highlighting, too. */
                node.addEventListener("blur", function(e) {
                    q.each(node.form.getElementsByTagName("label"), function(l) {
                        l.classList.remove(t.focusClass);
                    });
                });
            });

            // equip document with a new stylesheet rule to display the dialog
            try {
                f();
            } catch (e) {
                q.functionsAfterCssReady.push(f);
            }

            // equip dialog with closing button
            t.dialog.firstChild.appendChild(q.create({
                tagName: "span",
                text: "×"
            }));

            // equip dialog with header
            t.dialog.firstChild.appendChild(q.create({
                tagName: "h2",
                text: q.i18n[t.lang].input
            }));

            // equip dialog with instructions
            t.dialog.firstChild.appendChild(q.create({
                tagName: "p",
                text: q.i18n[t.lang].enterNotice
            }));

            // equip <form>s with a submit blocker
            q.each(t.forms, function(f) {
                f.addEventListener("submit", t.formSubmit);
            });

            // equip container with a listener on clicks
            t.container.addEventListener("click", t.click);

            // equip <input>s with a listener on keyup
            q.each(t.inputs, function(i) {
                i.addEventListener("keyup", t.keyUp);
            });

            // equip print sheet with suitable class name and header
            t.printSheet.appendChild(document.createElement("tbody"));
            t.printSheet.className = t.printOnlyClass;

            t.printSheet.lastChild.appendChild(
                document.createElement("tr")
            );

            // table headings
            q.each({
                "horizontal": "→",
                "vertical": "↓"
            }, function(o, s) {
                t.printSheet.lastChild.lastChild.appendChild(
                    q.create({
                        tagName: "th",
                        text: q.i18n[t.lang][s] + " " + o
                    })
                );
            });

            t.printSheet.lastChild.appendChild(document.createElement("tr"));

            // append print sheet to container
            t.container.appendChild(t.printSheet);

            // finalize and start quiz
            t.finalize();
        }());
    };

    /**
     * gap-filling quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.gapfill = function(element) {
        var t = this;

        // ensure inheritance
        q.quizConstructors._abstractQuiz.call(t, element);

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * list of text inputs
         *
         * @var Array
         */
        t.inputs = [];

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to end a quiz and show result
         */
        t.end = function() {
            var backToPool = [],
                withErrors = false; // hope for a full success

            // increase number of attempts
            t.attempts++;

            // check if all pieces are in their correct target
            q.each(t.pieces, function(p) {
                /* Compare the piece's data-match value with the
                 * one from it's parent node which must be a
                 * t.target element. */
                var m = p.getAttribute("data-match");

                if (p.parentNode.getAttribute("data-match") != m) {
                    // wrong! go back!
                    backToPool.push(p);
                    withErrors = true;
                }
            });

            // check if all input fields have a correct value
            q.each(t.inputs, function(i) {
                var ok = false, // presume a wrong value
                    v = q.trim(i.element.value);

                // we might have more than one valid solution
                q.each(i.solutions, function(s) {

                    if (v == s) {
                        ok = true;
                    }
                });

                if (!ok) {

                    i.element.classList.add(t.errorClass);
                    withErrors = true;
                }
            });

            if (backToPool.length) {

                q.shuffleArray(backToPool);

                // some pieces need to go back
                q.each(backToPool, function(p) {
                    t.pool.appendChild(p);
                });

                t.hideResultButton();
            }

            /* If everything is correct, we can update the
             * result box and finish this quiz! */
            if (!withErrors) {

                t.prepareResult();

                // remove draggable abilty from all pieces
                q.each(t.pieces, function(p) {
                    p.classList.remove(t.draggableClass);
                });

                // set all inputs to readonly so no tampering after grading
                q.each(t.inputs, function(i) {
                    console.dir(i);
                    i.element.setAttribute("readonly", "");
                });

                t.removeDragDropListeners(t.container);

                t.container.classList.add(t.finishedClass);
                t.uploadData();

            } else {

                t.hideResultButton();
            }
        };

        /**
         * function to determine result of drag&drop operation
         */
        t.resolveDragDrop = function() {
            var noEmptyInputs = true,
                elements;

            /* We want to place t.dragElm into t.highlightElm
             * if there is a t.highlightElm. Any present element
             * gets thrown back into t.pool. */
            if (t.highlightElm) {

                while (t.highlightElm.firstChild &&
                    t.highlightElm != t.pool
                ) {
                    t.pool.appendChild(t.highlightElm.firstChild);
                }

                t.highlightElm.appendChild(t.dragElm);
            }

            // remove t.resultButton from t.pool
            if (t.resultButton.parentNode == t.pool) {
                t.pool.removeChild(t.resultButton);
            }

            /* Do we need to show the result button
             * because t.pool is now empty and all input fields
             * have been filled out? */
            elements = t.pool.getElementsByClassName(
                t.draggableClass
            );

            q.each(t.inputs, function(i) {

                if (!i.element.value) {
                    noEmptyInputs = false;
                }
            });

            if (!elements.length && noEmptyInputs) {
                t.pool.appendChild(t.resultButton);
            }
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {
            var pool = [],
                r;

            q.shuffleArray(t.pieces);

            /* Find all relevant "piece" elements and put
             * them in the pool. Make them draggable by giving
             * them the draggable class name. */
            q.each(t.pieces, function(p) {
                t.pool.appendChild(p);
                p.classList.add(t.draggableClass);
            });

            // empty all <input>s and remove any "readonly" attribute
            q.each(t.inputs, function(i) {
                i.element.value = "";
                i.element.removeAttribute("readonly");
            });

            t.setDragDropListeners();

            t.container.classList.remove(t.finishedClass);

            if (t.resultButton.parentNode) {
                t.pool.removeChild(t.resultButton);
            }

            while (t.result.firstChild != t.restartButton) {
                t.result.removeChild(t.result.firstChild);
            }

            t.attempts = 0;
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var counter = 0, // for incremental IDs
                gaps = [];

            /* we need all <b>, <em>, <i> and <strong>
             * within our container */
            q.each(
                document.querySelectorAll(
                    ".rquiz-gapfill b" +
                    ", .rquiz-gapfill em" +
                    ", .rquiz-gapfill i" +
                    ", .rquiz-gapfill strong"
                ),
                function(el) {
                    var p = el;

                    // determine if el is inside our container
                    while (p != document.body &&
                        p != t.container
                    ) {
                        p = p.parentNode;
                    }

                    // el is inside our container
                    if (p == t.container) {
                        gaps.push(el);
                    }
                }
            );

            // no gaps? end right here
            if (!gaps.length) {
                return;
            }

            // process gaps
            q.each(gaps, function(el) {
                var html = q.trim(el.innerHTML),
                    i, l, n, // nodes (HTMLElements)
                    solutions = [];

                // input field or drag&drop element?
                if (html.match(/\(/)) {

                    // input field: determine possible solutions
                    i = html.replace(
                        /[\t\r\n]/g, " "
                    ).replace(
                        /^([^(]+).*$/, "$1"
                    ).replace(
                        /(&nbsp; | &nbsp;)/, " "
                    ).replace(
                        / +/, " "
                    ).split("|");

                    // trim every solution
                    q.each(i, function(s) {

                        s = q.trim(s);

                        // weed out empty solutions
                        if (s.length) {
                            solutions.push(s);
                        }
                    });

                    if (solutions.length) {

                        // we put the input field inside a <label>
                        l = q.create({
                            tagName: "label",
                            htmlFor: t.quizName + "_" + counter,
                            // put any possible hints inside <label>
                            innerHTML: " " + (
                                html
                                .replace(/^[^(]*(\(.*) *$/, "$1")
                                .replace(/ ?\(\)$/, "")
                            )
                        });

                        i = q.create({
                            tagName: "input",
                            id: t.quizName + "_" + counter
                        });

                        i.setAttribute(
                            "placeholder",
                            q.i18n[t.lang].tempText
                        );

                        /* We need to check if we can offer the
                         * result button whenever something gets
                         * typed into an <input>. */
                        i.addEventListener(
                            "keyup",
                            function() {
                                i.classList.remove(t.errorClass);
                                t.resolveDragDrop();
                            }
                        );

                        // put <input> at the beginning of <label>
                        l.insertBefore(i, l.firstChild);

                        // replace original element with <label>
                        el.parentNode.replaceChild(l, el);

                        t.inputs.push({
                            element: i,
                            solutions: solutions
                        });

                        t.data.push({
                            element: i,
                            solutions: solutions,
                            type: "input"
                        });

                        counter++;
                    }

                } else {

                    // drag&drop element
                    html = q.trim(el.innerHTML);

                    // don't accept empty gaps
                    if (html.length) {

                        // create a drag&drop piece
                        i = q.create({
                            tagName: "span",
                            className: t.piecesClass
                        });

                        i.innerHTML = html;

                        i.setAttribute("data-match", counter);

                        // create a drag&drop target
                        l = q.create({
                            tagName: "span",
                            className: t.targetClass
                        });

                        l.setAttribute("data-match", counter);

                        counter++;

                        /* We might have another piece with
                         * identical contents. In this case we
                         * want to copy its data-match value and
                         * not the counter's. */
                        q.each(t.pieces, function(p) {
                            var v = "";

                            if (p.innerHTML == html) {
                                v = p.getAttribute("data-match");
                            }

                            if (v.length) {
                                // use found value
                                l.setAttribute("data-match", v);
                                i.setAttribute("data-match", v);

                                /* modify counter since we
                                 * haven't used it */
                                counter--;
                            }
                        });

                        t.pieces.push(i);
                        t.targets.push(l);

                        /* puzzle piece? Puzzle pieces get an
                         * additional class name "puzzle" if
                         * they originate from an ancestor with
                         * this class name! */
                        n = el;

                        while (n != document.body &&
                            n != t.container
                        ) {
                            n = n.parentNode;

                            if (n.classList.contains("puzzle")) {
                                i.classList.add("puzzle");
                            }
                        }

                        // replace original element with target
                        el.parentNode.replaceChild(l, el);

                        t.data.push({
                            o: {
                                piece: i,
                                target: l
                            },
                            type: "drag&drop"
                        });
                    }
                }
            });

            // finalize and start quiz
            if (t.data.length) {
                t.container.appendChild(t.pool);
                t.finalize();
            }
        }());
    };

    /**
     * matching quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.matching = function(element) {
        var t = this;

        // ensure inheritance
        q.quizConstructors._abstractQuiz.call(t, element);

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * the quiz's game mode
         *
         * The quiz supports the matching of pairs or the
         * matching of categories.
         *
         * "pairs": If the original table consisted of rows
         * with exactly two columns then the quiz will randomly
         * take one element of a pair and let the user match it
         * with the other one.
         *
         * "categories": If the original table consisted of rows
         * with mor than two columns then the quiz will take the
         * first element of such a group and let the user match
         * all the other elements with this one.
         *
         * @var String (pairs|categories)
         */
        t.mode = "pairs";

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to end a quiz and show result
         */
        t.end = function() {
            var backToPool = [];

            // increase number of attempts
            t.attempts++;

            // check if all pieces are in their correct group
            q.each(t.targets, function(target) {
                var group, pieces;

                if (target != t.pool) {

                    pieces = target.getElementsByClassName(
                        t.piecesClass
                    );

                    group = pieces.item(0).getAttribute("data-group");

                    q.each(pieces, function(p) {

                        if (group !== p.getAttribute("data-group")) {
                            backToPool.push(p);
                        }
                    });
                }
            });

            if (backToPool.length) {

                q.shuffleArray(backToPool);

                // some pieces need to go back
                q.each(backToPool, function(p) {
                    t.pool.appendChild(p);
                });

                t.hideResultButton();

            } else {

                /* If everything is correct, we can update the
                 * result box and finish this quiz! */
                t.prepareResult();

                q.each(t.pieces, function(p) {
                    p.classList.remove(t.draggableClass);
                });

                t.removeDragDropListeners(t.container);

                t.container.classList.add(t.finishedClass);
                t.uploadData();
            }
        };

        /**
         * function to determine result of drag&drop operation
         */
        t.resolveDragDrop = function() {
            var elements;

            /* We want to place t.dragElm into t.highlightElm.
             * In "pairs" mode we need to move any previous
             * element in t.highlightElm back into t.pool, but
             * not the very first element! The very first
             * element doesn't have the t.draggabelClass which
             * should make things a little easier. */
            t.highlightElm.appendChild(t.dragElm);

            if (t.mode == "pairs") {

                elements = t.highlightElm.getElementsByClassName(
                    t.draggableClass
                );

                // we must keep only the last draggable element
                while (elements.length > 1) {
                    t.pool.appendChild(elements[0]);
                }
            }

            t.hideResultButton(
                t.pool.getElementsByClassName(t.draggableClass).length < 1
            );
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {
            var targets = [],
                pool = [],
                r = 0; // Always match with first element

            // we want to randomly choose a target
            q.each(t.targets, function(n) {

                if (n != t.pool) {
                    targets.push(n);
                }
            });

            q.each(t.data, function(group, g) {

                /* find all relevant "piece" elements and put
                 * them either in the pool or in a target
                 * element */
                q.each(t.pieces, function(piece) {

                    if (g == piece.getAttribute("data-group")) {

                        // check for correct group item
                        if (r == piece.getAttribute("data-no")) {

                            // place into target area
                            targets[g].appendChild(piece);

                        } else {

                            // place into pool
                            pool.push(piece);
                            piece.classList.add(t.draggableClass);
                        }
                    }
                });

                // shuffle pieces and pour into t.pool element
                q.shuffleArray(pool);

                q.each(pool, function(p) {
                    t.pool.appendChild(p);
                });
            });

            t.setDragDropListeners();

            t.container.classList.remove(t.finishedClass);

            t.hideResultButton();

            while (t.result.firstChild != t.restartButton) {
                t.result.removeChild(t.result.firstChild);
            }

            t.attempts = 0;
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var i, j, tab, piece;

            /* extract quiz data from a <table> element
             * in the container */
            tab = t.container.getElementsByTagName("table");

            // no <table> found? end right here
            if (!tab[0]) {
                return;
            }

            // get quiz data
            q.each(tab[0].getElementsByTagName("tr"), function(tr) {
                var group = [];

                // search row for values
                q.each(tr.getElementsByTagName("td"), function(td) {
                    var v = q.trim(
                        td.innerHTML.replace(/&nbsp;/, " ")
                    );

                    if (v.length) {
                        group.push(v);
                    }
                });

                /* add group to data if it contains at least
                 * two elements */
                if (group.length > 1) {
                    t.data.push(group);
                }

                /* change quiz mode to "categories"
                 * if a group has more than two elements */
                if (group.length > 2) {
                    t.mode = "categories";
                }
            });

            // initialize quiz if suitable data has been found
            if (!t.data.length) {
                return;
            }

            // place this quiz's pool directly before the initial <table>
            tab[0].parentNode.insertBefore(t.pool, tab[0]);

            // remove initial <table>
            tab[0].parentNode.removeChild(tab[0]);

            /* A <span> element will be created for every
             * corresponding value from the quiz's data
             * elements. It will carry the following
             * data-attributes:
             *
             * data-group: an integer that defines to which
             * group this value belongs
             *
             * data-no: the index under which this value is
             * stored inside the group - needed to determine the
             * first element as category name in "categories"
             * quiz mode
             */
            for (i = 0; i < t.data.length; i++) {

                for (j = 0; j < t.data[i].length; j++) {

                    piece = q.create({
                        tagName: "span",
                        className: t.piecesClass,
                        innerHTML: t.data[i][j]
                    });

                    piece.setAttribute("data-group", i);
                    piece.setAttribute("data-no", j);

                    t.pieces.push(piece);
                }
            }

            // create target elements for drag&drop
            q.each(t.data, function() {
                // remember these elements as "targets"
                t.targets.push(
                    // place elements before the pool element
                    t.pool.parentNode.insertBefore(
                        q.create({
                            tagName: "p",
                            className: t.targetClass
                        }),
                        t.pool
                    )
                );
            });

            // finalize and start quiz
            t.finalize();
        }());
    };

    /**
     * memory quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.memo = function(element) {
        var t = this;

        // ensure inheritance
        q.quizConstructors._abstractQuiz.call(t, element);

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * class name for a turnable card
         *
         * @param String
         */
        t.cardClass = "rquiz-memocard";

        /**
         * list of all turnable cards
         *
         * @param Array
         */
        t.cards = [];

        /**
         * class name for a permanently upturned card
         *
         * @param String
         */
        t.fixedClass = "rquiz-fixed";

        /**
         * class name for an upturned card
         *
         * @param String
         */
        t.openClass = "rquiz-open";

        /**
         * number of elements in a set
         *
         * By default a memo quiz wants a user to find pairs.
         * However this quiz also supports n-tuples to be found.
         *
         * @param int
         */
        t.setLength = 2;

        /**
         * flag for waiting until cards are flipped back
         *
         * @param bool
         */
        t.wait = false;

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * click listener function
         *
         * This function listens to the "click" event and makes
         * the cards turn. It also detects if the restart button
         * gets used.
         *
         * @param Event
         * @return bool false
         */
        t.click = function(e) {
            var ok = true, // presume correct user choice
                open = [],
                el, p;

            // We don't do anything as long as we have to wait!
            if (!t.wait) {

                el = t.getEventElement(e);

                // any of the cards?
                while (el != document.body &&
                    !el.classList.contains(t.cardClass)
                ) {
                    el = el.parentNode;
                }

                if (el.classList.contains(t.cardClass)) {

                    // is this card to be flipped over?
                    if (!el.classList.contains(t.fixedClass) &&
                        !el.classList.contains(t.openClass)
                    ) {
                        // yes
                        el.classList.add(t.openClass);

                        // was this the last card of a possible set?
                        q.each(t.cards, function(c) {

                            if (c.classList.contains(t.openClass)) {
                                open.push(c);
                            }
                        });

                        // no? do nothing
                        if (open.length < t.setLength) {
                            return false;
                        }

                        // set complete: check if correct
                        q.each(open, function(c, i) {

                            if (open[0].getAttribute("data-group") !=
                                open[i].getAttribute("data-group")
                            ) {
                                ok = false;
                            }
                        });

                        if (!ok) {

                            t.attempts++;

                            // block all interactions temporarily
                            t.wait = true;

                            // flip opened cards back after 2 seconds
                            setTimeout(
                                function() {
                                    q.each(open, function(c) {
                                        c.classList.remove(t.openClass);
                                    });

                                    // now the user may interact again
                                    t.wait = false;
                                },
                                2000
                            );

                        } else {

                            // set correct! fix opened cards
                            q.each(open, function(c) {
                                c.classList.remove(t.openClass);
                                c.classList.add(t.fixedClass);
                            });

                            // are all cards now open?
                            q.each(t.cards, function(c) {

                                if (!c.classList.contains(
                                        t.fixedClass
                                    )) {
                                    ok = false;
                                }
                            });

                            if (ok) {

                                setTimeout(
                                    function() {
                                        // quiz is finished!
                                        t.container.classList.add(
                                            t.finishedClass
                                        );

                                        t.uploadData();

                                        // unfix all cards
                                        q.each(t.cards, function(c) {
                                            c.classList.remove(t.fixedClass);
                                        });

                                        // update result box
                                        t.prepareResult();
                                    },
                                    1100
                                );
                            }
                        }
                    }
                }
            }

            return false;
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {

            // empty pool
            while (t.pool.firstChild) {
                t.pool.removeChild(t.pool.firstChild);
            }

            // shuffle the cards and put them in the pool
            q.shuffleArray(t.cards);

            q.each(t.cards, function(c) {
                t.pool.appendChild(c);
            });

            t.container.classList.remove(t.finishedClass);

            t.attempts = 0;
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var setLength = 1000,
                /* This set length is insane, but how many
                 * elements per set are sensible anyways? And
                 * where should we set a maximum limit? */
                i, j, card, tab;

            // extract quiz data from a <table> element in the container
            tab = t.container.getElementsByTagName("table");

            // no <table> found? end right here
            if (!tab[0]) {
                return;
            }

            // get quiz data
            q.each(tab[0].getElementsByTagName("tr"), function(tr) {
                var group = [];

                // search row for values
                q.each(tr.getElementsByTagName("td"), function(td) {
                    var v = q.trim(
                        td.innerHTML.replace(/&nbsp;/, " ")
                    );

                    if (v.length) {
                        group.push(v);
                    }
                });

                // we need at least pairs
                if (group.length > 1) {

                    // update set length based on smallest group
                    if (group.length < setLength) {
                        setLength = group.length;
                    }

                    t.data.push(group);
                }
            });

            // initialize quiz if suitable data has been found
            if (!t.data.length) {
                return;
            }

            // define actual number of elements in a set
            t.setLength = setLength;

            // place quiz's pool directly before initial <table>
            tab[0].parentNode.insertBefore(t.pool, tab[0]);

            // remove initial <table>
            tab[0].parentNode.removeChild(tab[0]);

            // supress unwanted visual behaviour
            t.pool.classList.remove(t.poolClass);

            /* A <span> element will be created for every
             * corresponding value from the quiz's data
             * elements. It will contain a "data-group"
             * attribute carrying an integer referring to the
             * group to where this value belongs. */
            for (i = 0; i < t.data.length; i++) {

                for (j = 0; j < setLength; j++) {

                    card = q.create({
                        tagName: "span",
                        className: t.cardClass
                    });

                    card.setAttribute("data-group", i);

                    t.cards.push(card);

                    /* In order to achieve a nice flip
                     * animation for our cards, we need a wrapper <span>
                     * and two <span>s in the wrapper <span> as front
                     * and back side. */
                    card.appendChild(
                        // wrapper
                        document.createElement("span")
                    );

                    card.firstChild.appendChild(
                        // front
                        document.createElement("span")
                    );

                    card.firstChild.appendChild(
                        // back
                        document.createElement("span")
                    );

                    /* In order to achieve vertical centering we
                     * need two put our card's contents inside
                     * a nested <span>. */
                    card.firstChild.lastChild.appendChild(q.create({
                        tagName: "span",
                        innerHTML: t.data[i][j]
                    }));
                }
            }

            // prepare result box
            t.container.appendChild(t.result);

            // add a click listener on our entire container
            t.container.addEventListener("click", t.click);

            // finalize and start quiz
            t.finalize();
        }());
    };

    /**
     * multiple choice quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.multichoice = function(element) {
        var t = this;

        // ensure inheritance
        q.quizConstructors._abstractQuiz.call(t, element);

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to end a quiz and show result
         */
        t.end = function() {
            var a = 0, // all answers
                c = 0, // correct choices
                f = q.i18n[t.lang].percentageResult;

            // calculate success
            q.each(t.data, function(d) {

                q.each(d.ol.getElementsByTagName("input"), function(i) {
                    var correct = !i.parentNode.hasAttribute("data-x");

                    a++; // count this answer

                    // count answers if correctly (not) chosen
                    if ((i.checked && correct) ||
                        (!i.checked && !correct)
                    ) {
                        c++;
                    }

                    // disable input so no tampering after grading
                    i.disabled = true;
                });
            });

            // prepare feedback message
            t.prepareResult(
                f.replace("%n", Math.floor(10000 * c / a) / 100) + " "
            );

            t.container.classList.add(t.finishedClass);
            t.uploadData();
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {

            t.container.classList.remove(t.finishedClass);

            // remove all questions from the container
            q.each(t.data, function(d) {

                // uncheck all answers and enable them
                q.each(d.ol.getElementsByTagName("input"), function(i) {
                    i.checked = false;
                    i.disabled = false;
                });

                if (d.p.parentNode) {
                    d.p.parentNode.removeChild(d.p);
                }

                // and the list of possible answers
                while (d.ol.firstChild) {
                    d.ol.removeChild(d.ol.firstChild);
                }

                if (d.ol.parentNode) {
                    d.ol.parentNode.removeChild(d.ol);
                }
            });

            // mix questions
            q.shuffleArray(t.data);

            // place answers before the pool
            q.each(t.data, function(d) {

                t.container.insertBefore(d.p, t.pool);

                // and the list of possible answers
                t.container.insertBefore(d.ol, t.pool);

                // mix answers before placing them into the quiz
                q.shuffleArray(d.answers);

                q.each(d.answers, function(li) {
                    d.ol.appendChild(li);
                });
            });
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var counter = 0; // incremental ID values

            /* We expect paragraph elements that have at least
             * two sets of parenthesis which will be possible
             * answering options. Any contents outside these
             * parentheticals will be ignored, except the
             * contents before them since that presumably would
             * be the question. */
            q.each(
                document.querySelectorAll(".rquiz-multichoice p"),
                function(p) {
                    var el = p,
                        html = q.trim(
                            p.innerHTML.replace(
                                /[\t\r\n]/g,
                                " "
                            )
                        ),
                        ok, // flag
                        d; // data element

                    // Is the element from our quiz?
                    while (el != document.body &&
                        el != t.container
                    ) {
                        el = el.parentNode;
                    }

                    // Not from our quiz? End right here!
                    if (el != t.container) {
                        return;
                    }

                    // extract data
                    d = {
                        answers: [],
                        ol: document.createElement("ol"),
                        p: q.create({
                            tagName: "p",
                            text: q.trim(html.replace(/\(.*/, ""))
                        })
                    };

                    // get possible answers
                    ok = false; // presume there is no correct answer

                    html.replace(/\(([^)]+)\)/g, function(dummy, s) {
                        var i = q.create({
                                tagName: "input",
                                type: "checkbox"
                            }),
                            label = q.create({
                                tagName: "label",
                                text: " " + s.replace(/^!/, "")
                            }),
                            li = document.createElement("li"),
                            correct = !(s.match(/^!/));

                        li.appendChild(i);
                        li.appendChild(label);

                        if (correct) {

                            ok = true;

                        } else {

                            li.setAttribute("data-x", "");
                        }

                        d.answers.push(li);
                    });

                    /* accept data only if there is more than
                     * one answer and at least one among them
                     * marked as correct */
                    if (d.answers.length > 1 && ok) {

                        // set "id" and "for" attributes
                        q.each(d.answers, function(a) {
                            var id = t.quizName + "i" + counter++;

                            a.getElementsByTagName("input")[0].id = id;
                            a.getElementsByTagName("label")[0].htmlFor = id;
                        });

                        // store in quiz data
                        t.data.push(d);

                        // remove original paragraph
                        p.parentNode.removeChild(p);
                    }
                }
            );

            // initialize quiz if suitable data has been found
            if (t.data.length) {

                // prepare pool with result button
                t.container.appendChild(t.pool);
                t.hideResultButton(true);

                // finalize and start quiz
                t.finalize();
            }
        }());
    };

    /**
     * word guessing quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.wordguess = function(element) {
        var t = this;

        // ensure class inheritance
        q.quizConstructors._abstractQuiz.call(this, element);

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * counter image
         *
         * @param Object HTMLElement
         */
        t.counter = document.createElement("p");

        /**
         * class name for the counter image
         *
         * @param String
         */
        t.counterClass = "rquiz-counter";

        /**
         * current word index
         *
         * @param int
         */
        t.current = 0;

        /**
         * list of correctly guessed letters
         *
         * @param Object HTMLElement
         */
        t.guessedChars = document.createElement("ul");

        /**
         * list of incorrectly guessed letters
         *
         * @param Object HTMLElement
         */
        t.guessedCharsIncorrect = document.createElement("ul");

        /**
         * list of correctly guessed words
         *
         * @param Object HTMLElement
         */
        t.guessedWords = document.createElement("ol");

        /**
         * input element for character input
         *
         * @param Object HTMLElement
         */
        t.input = document.createElement("input");

        /**
         * number of remaining tries
         *
         * @param int
         */
        t.remaining = 10;

        /**
         * class name for element to unhide
         *
         * @param String
         */
        t.showClass = "rquiz-show";

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to focus or unfocus input fields
         *
         * @param Event
         * @return bool false
         */
        t.click = function(e) {
            var el = t.getEventElement(e),
                help = t.pool.getElementsByTagName("p")[0];

            // focus input
            t.input.focus();

            // toggle visibility of help instructions
            if (el == help) {

                help.classList.toggle(t.showClass);

            } else {

                help.classList.remove(t.showClass);
            }

            return false;
        };

        /**
         * function to end a quiz and show result
         *
         * This function first checks if the quiz may go on and possibly
         * leads to the next word-to-be-guessed.
         */
        t.end = function() {

            if (t.remaining > 0 && t.current < t.data.length) {
                return t.next();
            }

            // show result box and finish this quiz
            t.prepareResult("");

            t.container.classList.add(t.finishedClass);
            t.uploadData();

            setTimeout(function() {
                t.restartButton.focus();
            }, 100);
        };

        /**
         * function to handle key strokes
         *
         * @param event
         * @return bool false
         */
        t.keyUp = function(e) {
            var input = t.getEventElement(e),
                // use first entered letter
                char = q.utf8NormalizeToUpper(q.trim(input.value)).substr(0, 1),
                correct = t.guessedChars.getElementsByTagName("li"),
                incorrect = t.guessedCharsIncorrect.getElementsByTagName("li"),
                ok;

            if (char.length < 1) {
                return false;
            }

            // check if we can use the input
            q.each(correct, function(li) {

                if (li.getAttribute("data-c") == char) {
                    li.innerHTML = char;
                    ok = true;
                }
            });

            if (!ok) {

                // find char in list of incorrectly guessed letters
                q.each(incorrect, function(li) {

                    if (li.textContent == char) {
                        ok = true;
                    }
                });
            }

            // need to add char to the list of incorrectly guessed letters?
            if (!ok) {

                t.guessedCharsIncorrect.appendChild(q.create({
                    tagName: "li",
                    text: char
                }));

                t.remaining--;
                t.updateCounter();
            }

            // no more tries left?
            if (t.remaining < 1) {
                t.end();
            }

            // empty <input> (some Android softkeyboards need a timeout)
            setTimeout(function() {
                input.value = "";
            }, 10);

            // completely guessed a word?
            ok = true; // expect success

            q.each(correct, function(li) {

                if (li.textContent != li.getAttribute("data-c")) {
                    ok = false;
                }
            });

            if (ok) {

                // insert found word into display of correctly guessed words
                q.each(t.guessedWords.getElementsByTagName("li"), function(li) {

                    if (li.textContent == "" && ok) {
                        li.innerHTML = t.data[t.current].original;
                        ok = false;
                    }
                });

                // bonus for user
                if (t.remaining < 10) {
                    t.remaining++;
                    t.updateCounter();
                }

                // is this the end?
                t.end();
            }

            return false;
        };

        /**
         * function to offer the next word
         */
        t.next = function() {

            t.current++;

            // already had the last word?
            if (t.current == t.data.length) {
                return t.end();
            }

            // empty lists of guessed letters
            q.each([t.guessedChars, t.guessedCharsIncorrect], function(list) {

                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
            });

            // fill list of correctly guessed letters with empty fields
            q.each(t.data[t.current].upperCase.split(""), function(s) {
                t.guessedChars.appendChild(
                    document.createElement("li")
                );

                // we need this later to identify a correctsolution
                t.guessedChars.lastChild.setAttribute(
                    "data-c",
                    q.utf8NormalizeToUpper(q.trim(s))
                );
            });
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {

            // empty list of correctly guessed words

            while (t.guessedWords.firstChild) {
                t.guessedWords.removeChild(t.guessedWords.firstChild);
            }

            // fill list of correctly guessed words with empty items
            q.each(t.data, function(d) {
                t.guessedWords.appendChild(document.createElement("li"));
            });

            // (re-)mix all words
            q.shuffleArray(t.data);

            // reset counter
            t.remaining = 10;
            t.updateCounter();

            // show quiz (again)
            t.container.classList.remove(t.finishedClass);

            // reset current word index
            t.current = -1; // gets set to 0 by t.next()

            // get this quiz going
            t.next();
        };

        /**
         * function to update the counter's image and title attribute
         */
        t.updateCounter = function() {

            t.counter.setAttribute("data-remaining", t.remaining);

            t.counter.setAttribute(
                "title",
                q.i18n[t.lang].remainingTries.replace("%n", t.remaining)
            );
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var tab;

            /* extract quiz data from a <table> element
             * in the container */
            tab = t.container.getElementsByTagName("table");

            // no <table> found? end right here
            if (!tab[0]) {
                return;
            }

            // get quiz data
            q.each(tab[0].getElementsByTagName("td"), function(td) {
                var txt = q.trim(td.textContent);

                // add to data if it contains real text
                if (txt.length > 0) {
                    t.data.push({
                        original: txt,
                        upperCase: q.utf8NormalizeToUpper(txt)
                    });
                }
            });

            // initialize quiz if suitable data has been found
            if (!t.data.length) {
                return;
            }

            // this time our pool needs to be a div
            t.pool = q.create({
                tagName: "div",
                className: t.poolClass
            });

            // replace the initial <table> with pool
            tab[0].parentNode.replaceChild(t.pool, tab[0]);

            // fill pool with stuff
            t.pool.appendChild(q.create({
                tagName: "p",
                text: q.i18n[t.lang].enterNoticeWordGuessing
            }));
            t.pool.appendChild(t.counter);
            t.counter.classList.add(t.counterClass);

            /* add a section with
             * - input element
             * - two lists
             *   1: correctly guessed letters
             *   2: incorrectly guessed letters
             */
            t.pool.appendChild(document.createElement("section"));
            t.pool.lastChild.appendChild(t.input);
            t.pool.lastChild.appendChild(t.guessedChars);
            t.pool.lastChild.appendChild(t.guessedCharsIncorrect);


            // We need an <h2> and <ol> so we wrap it in an <aside>
            t.pool.appendChild(document.createElement("aside"));
            t.pool.lastChild.appendChild(q.create({
                tagName: "h2",
                text: q.i18n[t.lang].foundWords
            }));
            t.pool.lastChild.appendChild(t.guessedWords);

            // equip container with a listener on clicks
            t.container.addEventListener("click", t.click);

            // equip <input> with a listener on keyup and an ID
            t.input.addEventListener("keyup", t.keyUp);
            t.input.id = t.quizName + "_input";

            // finalize and start quiz
            t.finalize(true); // true = don't call t.start()

            // show restart button
            t.container.classList.add(t.finishedClass);
        }());
    };

    /**
     * word jumbling quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.wordjumble = function(element) {
        var t = this;

        // ensure inheritance
        q.quizConstructors._abstractQuiz.call(t, element);

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * list of text inputs
         *
         * @var Array
         */
        t.inputs = [];

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to check if all <input>s are filled out and
         * if the result button is to be displayed
         */
        t.check = function() {
            var complete = true; // presume that no <input> is empty

            // check all inputs
            q.each(t.data, function(d) {

                if (!d.input.value.length) {
                    complete = false;
                }
            });

            // If everything is complete, we can finish this quiz!
            t.hideResultButton(complete);
        };

        /**
         * function to end the quiz and show result
         */
        t.end = function() {
            var complete = true, // presume that all
                ok = true; // hope for a full success

            // increase number of attempts
            t.attempts++;

            // check all inputs
            q.each(t.data, function(d) {
                var original = d.input.getAttribute("data-solution"),
                    s = original.toLowerCase(),
                    v = q.trim(d.input.value.toLowerCase());

                /* We accept input if its transformation to
                 * lower-case equals the original's
                 * transformation to lower-case. */
                if (s != v) {
                    ok = false;
                    d.input.classList.add(t.errorClass);
                }
            });

            /* If everything is correct, we can update the
             * result box and finish this quiz! */
            if (ok) {

                // replace input values with original solution
                q.each(t.data, function(d) {
                    d.input.value = d.input.getAttribute("data-solution");
                    d.input.setAttribute("readonly", "");
                });

                t.prepareResult();

                t.container.classList.add(t.finishedClass);
                t.uploadData();

            } else {

                t.hideResultButton();
            }
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {

            // prepare the <label>s with new hints
            q.each(t.data, function(d) {
                var s = d.input.getAttribute("data-solution"),
                    jumble = s.toLowerCase().split("");

                // freshly mixed hint
                q.shuffleArray(jumble);

                // rebuild contents for <label>
                while (d.label.firstChild) {
                    d.label.removeChild(d.label.firstChild);
                }

                d.label.appendChild(d.input);

                // erase any previous contents and blocks
                d.input.value = "";
                d.input.removeAttribute("readonly", "");

                d.label.appendChild(document.createTextNode(
                    " (" + jumble.join("") + ")"
                ));
            });

            t.container.classList.remove(t.finishedClass);

            t.hideResultButton();

            t.attempts = 0;
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var gaps = [];

            /* we need all <b>, <em>, <i> and <strong>
             * within our container */
            q.each(
                document.querySelectorAll(
                    ".rquiz-wordjumble b" +
                    ", .rquiz-wordjumble em" +
                    ", .rquiz-wordjumble i" +
                    ", .rquiz-wordjumble strong"
                ),
                function(el) {
                    var p = el;

                    // determine if el is inside our container
                    while (p != document.body &&
                        p != t.container
                    ) {
                        p = p.parentNode;
                    }

                    // el is inside our container
                    if (p == t.container) {
                        gaps.push(el);
                    }
                }
            );

            // found no gaps? end right here
            if (!gaps.length) {
                return;
            }

            // process gaps
            q.each(gaps, function(el) {
                var s = q.trim(el.textContent),
                    i = document.createElement("input"),
                    l = document.createElement("label");

                // remember correct solution
                i.setAttribute("data-solution", s);

                /* We need to check if we can offer the
                 * result button whenever something gets
                 * typed into an <input>. */
                i.addEventListener(
                    "keyup",
                    function() {
                        i.classList.remove(t.errorClass);
                        t.check();
                    }
                );

                // replace original element with <label>
                el.parentNode.replaceChild(l, el);

                t.data.push({
                    input: i,
                    label: l
                });
            });

            // finalize and start quiz
            if (t.data.length) {
                t.container.appendChild(t.pool);
                t.finalize();
            }

        }());
    };

    /**
     * word searching quiz class
     *
     * This class inherits drag&drop functionality from the
     * abstract quiz class.
     *
     * @param Object HTMLElement
     */
    q.quizConstructors.wordsearch = function(element) {
        var t = this;

        // ensure inheritance
        q.quizConstructors._abstractQuiz.call(t, element);

        /*=================*
         * quiz properties *
         *=================*/

        /**
         * class name for a letter of a successfully found word
         *
         * @var String
         */
        t.fixedClass = "rquiz-fixed";

        /**
         * display of the words a user has already found
         *
         * @param Object HTMLElement
         */
        t.found = document.createElement("ol");

        /**
         * element at which a highlighting ends
         *
         * @param Object HTMLElement
         */
        t.highlightEnd = null;

        /**
         * element at which a highlighting begins
         *
         * @param Object HTMLElement
         */
        t.highlightStart = null;

        /*==============*
         * quiz methods *
         *==============*/

        /**
         * function to initiate a drag&drop operation
         *
         * This function returns
         * - false if a drag&drop operation is in process
         * - true if no drag&drop operation is in process
         *
         * @param Event
         * @return bool
         */
        t.dragStart = function(e) {
            var el = t.getEventElement(e);

            if (el.tagName && el.tagName.match(/^td$/i)) {

                // remember in which cell the dragging started
                t.highlightStart = el;

                t.dragMode = true;

                // suppress regular text selection
                if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                }

                el.classList.add(t.highlightClass);

                e.preventDefault();
                e.stopPropagation();

                return false;
            }

            return true;
        };

        /**
         * function to end a drag&drop operation
         *
         * This function returns
         * - false if a drag&drop operation is in process
         * - true if no drag&drop operation is in process
         *
         * @param Event
         * @return bool false
         */
        t.dragStop = function(e) {
            // anything found?
            t.resolveDragDrop();

            t.removeHighlight();
            t.dragMode = false;

            // allow regular text selection in IE
            t.repairDragAndDropOnIE();

            return true;
        };

        /**
         * function to record current mouse or touch coordinates
         * and move dragged element during a drag&drop operation
         *
         * @param Event
         * @return bool
         */
        t.dragWhile = function(e) {
            var el = t.getEventElement(e);

            if (t.dragMode) {

                t.suppressTextSelection();

                if (el.tagName && el.tagName.match(/^td$/i)) {

                    t.highlightEnd = el;

                    // remove existing highlighting
                    t.removeHighlight();

                    // set new highlighting
                    t.highlight();
                }

                e.preventDefault();
                e.stopPropagation();
            }

            return true;
        };

        /**
         * function to end a quiz and show result
         */
        t.end = function() {
            var ok = true, // expect all words to have been found
                c, x, y;

            t.attempts++;

            // check all list items
            q.each(t.found.getElementsByTagName("li"), function(li) {

                if (q.trim(li.textContent).length < 1) {
                    ok = false;
                }
            });

            if (ok) {

                // prepare a custom feedback
                c = "";

                if (t.attempts - t.words.length > 1) {

                    c += q.i18n[t.lang].praise3

                } else {

                    c += q.i18n[t.lang][
                        "praise" + (1 + t.attempts - t.words.length)
                    ]
                }

                c += " " + q.i18n[t.lang].result3.replace(/%n/, t.attempts);

                t.prepareResult(c);

                t.container.classList.add(t.finishedClass);
                t.removeDragDropListeners(t.container);
                t.uploadData();
            }
        };

        /**
         * function to highlight adjacent cells either horizontally,
         * vertically or diagonally
         */
        t.highlight = function() {
            var el, end, inclination, orientation, start, x, y;

            // determine coordinates of start and end of highlight
            for (y = 0; y < t.table.rows.length; y++) {

                for (x = 0; x < t.table.rows[y].cells.length; x++) {

                    if (t.table.rows[y].cells[x] == t.highlightStart) {
                        start = {
                            x: x,
                            y: y
                        };
                    }

                    if (t.table.rows[y].cells[x] == t.highlightEnd) {
                        end = {
                            x: x,
                            y: y
                        };
                    }
                }
            }

            // any error?
            if (!start || !end) {
                return false;
            }

            // determine inclination
            if ((end.y - start.y) === 0) {

                // Division By Zero!
                inclination = 2; // a value above 1.5 is sufficient

            } else {

                // quotient is "legal"
                inclination = (end.x - start.x) / (end.y - start.y);
            }

            // determine orientation from inclination and coordinates
            if (Math.abs(inclination) >= 0.5 &&
                Math.abs(inclination) <= 1.5
            ) {

                // diagonal
                orientation = (
                    inclination > 0 ?
                    "↘" :
                    "↙"
                );

            } else {

                // horizontal/vertical
                orientation = (
                    Math.abs(inclination) > 1 ?
                    "→" :
                    "↓"
                );
            }

            // highlight all suitable cells
            x = start.x;
            y = start.y;
            el = t.table.rows[y].cells[x];

            while (el) {

                el.classList.add(t.highlightClass);

                switch (orientation) {

                    case "↓":
                        // only modify y
                        if (start.y > end.y && y > end.y) {
                            y--;
                        }

                        if (start.y < end.y && y < end.y) {
                            y++;
                        }
                        break;

                    case "→":
                        // only modify x
                        if (start.x > end.x && x > end.x) {
                            x--;
                        }

                        if (start.x < end.x && x < end.x) {
                            x++;
                        }
                        break;

                    case "↘":
                        if (start.x > end.x && x > end.x &&
                            start.y > end.y && y > end.y
                        ) {
                            x--;
                            y--;
                        }

                        if (start.x < end.x && x < end.x &&
                            start.y < end.y && y < end.y
                        ) {
                            x++;
                            y++;
                        }
                        break;

                    case "↙":
                        if (start.x > end.x && x > end.x &&
                            start.y < end.y && y < end.y
                        ) {
                            x--;
                            y++;
                        }

                        if (start.x < end.x && x < end.x &&
                            start.y > end.y && y > end.y
                        ) {
                            x++;
                            y--;
                        }
                        break;
                }

                // stop if there is no more cell to highlight
                el = (
                    el != t.table.rows[y].cells[x] ?
                    t.table.rows[y].cells[x] :
                    false
                );
            }

        };

        /**
         * function to determine result of drag&drop operation
         */
        t.resolveDragDrop = function() {
            var highlighted = t.table.getElementsByClassName(
                t.highlightClass
            );

            if (highlighted.length < 1) {
                return;
            }

            // check every word if its letters have all been highlighted
            q.each(t.words, function(word) {
                var found = 0, // highlighted elements at correct coordinates
                    c = 0, // current letter
                    x = word.x,
                    y = word.y;

                // has current letter been highlighted?
                while (found === c && c < word.upperCase.length) {

                    q.each(highlighted, function(el) {

                        if (t.table.rows[y].cells[x] &&
                            el == t.table.rows[y].cells[x]
                        ) {
                            found++;
                        }
                    });

                    // next letter
                    c++;

                    // next position
                    switch (word.orientation) {

                        case "↓":
                            y++;
                            break;

                        case "→":
                            x++;
                            break;

                        case "↘":
                            x++;
                            y++;
                            break;

                        case "↗":
                            x++;
                            y--;
                            break;
                    }
                }

                if (found === c && highlighted.length == c) {

                    // fix highlighted cells
                    q.each(highlighted, function(el) {
                        el.classList.add(t.fixedClass);
                    });

                    // add found word onto the display of found words
                    found = false; // expect it is not yet in the list

                    q.each(t.found.getElementsByTagName("li"), function(li) {

                        if (q.trim(li.textContent) == word.original) {
                            found = true;
                        }
                    });

                    if (!found) {
                        // add to list
                        q.each(t.found.getElementsByTagName("li"), function(li) {

                            if (q.trim(li.textContent).length < 1 &&
                                !found
                            ) {

                                li.appendChild(q.create({
                                    tagName: "strong",
                                    text: word.original
                                }));

                                found = true;
                            }
                        });
                    }
                }
            });

            t.removeHighlight();
            t.highlightEnd = null;
            t.highlightStart = null;
            t.dragMode = false;

            // try if quiz is finished
            t.end();
        };

        /**
         * function to remove any highlight markers
         */
        t.removeHighlight = function() {
            q.each(t.table.getElementsByTagName("td"), function(td) {
                td.classList.remove(t.highlightClass);
            });
        };

        /**
         * start function
         *
         * This function prepares the quiz to be solved by the
         * user. Since a quiz must be reset after a successful
         * solution this function can restart the quiz, too.
         */
        t.start = function() {
            var counter = 1,
                // true = interlinked words:
                grid = t.createWordGrid(t.data, true, true),
                x, y, tr, td;

            t.attempts = 0;
            t.grid = grid.grid;
            t.words = grid.words;

            // empty table
            while (t.table.firstChild) {
                t.table.removeChild(t.table.firstChild);
            }

            // prepare table for letters
            for (y = 0; y < t.grid.length; y++) {

                // add new row
                tr = t.table.insertRow(y);

                for (x = 0; x < t.grid[0].length; x++) {

                    // add new cell
                    tr.appendChild(q.create({
                        tagName: "td",
                        text: (
                            // do we have defined contents?
                            t.grid[y][x]
                            // yes
                            ?
                            t.grid[y][x]
                            // no -> generate random character
                            :
                            String.fromCharCode(
                                65 + Math.floor(Math.random() * 26)
                            ).toUpperCase()
                        )
                    }));
                }
            }

            // prepare list of already found words
            while (t.found.firstChild) {
                t.found.removeChild(t.found.firstChild);
            }

            q.each(t.words, function(word) {
                t.found.appendChild(document.createElement("li"));
            });

            t.setDragDropListeners();
            t.container.classList.remove(t.finishedClass);
        };

        /**
         * function to suppress text selection
         */
        t.suppressTextSelection = function() {

            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }

            t.repairDragAndDropOnIE(true);
        };

        /**
         * setup
         *
         * This function prepares all the interactive elements
         * later needed when the quiz is to (re-)start.
         */
        (function() {
            var tab, aside;

            // extract quiz data from a <table> element in the container
            tab = t.container.getElementsByTagName("table");

            // <table> found?
            if (!tab[0]) {
                return false;
            }

            // get quiz data
            q.each(tab[0].getElementsByTagName("td"), function(td) {
                var v;

                // trim cell contents
                v = q.trim(
                    td.innerHTML.replace(/&nbsp;/, " ")
                );

                if (v.length) {
                    t.data.push({
                        original: v,
                        upperCase: q.utf8NormalizeToUpper(v)
                    });
                }
            });

            // initialize quiz if suitable data has been found
            if (!t.data.length) {
                return;
            }

            // use initial table as grid display
            t.table = tab[0];

            // place display of found words directly after the grid display
            aside = tab[0].parentNode.insertBefore(
                document.createElement("aside"),
                tab[0].nextSibling
            );

            aside.appendChild(q.create({
                tagName: "h2",
                text: q.i18n[t.lang].foundWords
            }));

            aside.appendChild(t.found);

            // place pool directly after the display of found words
            tab[0].parentNode.insertBefore(t.pool, aside.nextSibling);

            // finalize and start quiz
            t.finalize();
        }());
    };

    // start the whole thing
    q.init();

    // expose an init function to the window object for a script loader
    window.rQuizInit = function() {
        q.begin();
    };
}());
