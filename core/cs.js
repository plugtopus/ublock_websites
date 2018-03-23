var isGetMessageStart, friwebCSStart, mainWinIsShow, tabHost, tabId, tabUrl;
var runtimeOrExtensionFrigate = chrome.runtime && chrome.runtime.sendMessage ? "runtime" : "extension";
if (typeof $empty != "function") {
    function $empty() {}
}

function generatePW(c) {
    var i, s = "abcdefghijklmnopqrstuvwxyz",
        pw = "";
    if (!c) {
        c = 16;
    }
    for (i = 0; i < c; i++) {
        pw += s.charAt(Math.random() * 26);
    }
    return pw;
}
var divid = generatePW(10);
var frigateRecStart = false;
var frigateRecWinIsShow = false;
if (typeof frigate_rec !== "function") {
    function frigate_rec() {
        frigateRecStart = true;
        chrome[runtimeOrExtensionFrigate].onMessage.addListener(function(request) {
            if (frigateRecWinIsShow) {
                return;
            }
            if (request.hasOwnProperty("m1")) {
                frigateRecWinIsShow = true;
                var laststart = localStorage.getItem("fr_no_show");
                if (laststart < 0 || laststart > Date.now()) {
                    return;
                }
                var div = document.createElement("div");
                div.setAttribute("id", divid);
                var tpl = '<div class="fr_div_1" style="position: fixed; top: 0px; left: 0px; display: table; width: 100%; height: 55px; line-height: normal; opacity: 1; z-index: 2147483647;"><div class="fr_div_2"><a class="fr_a_1" href="#" title="\u0417\u0430\u043a\u0440\u044b\u0442\u044c"><svg width="24" height="24" viewBox="0 0 80 80" class="fr_svg_1"><path fill="#000" d="M56.971 52.729L44.243 40l12.728-12.728-4.242-4.243L40 35.757 27.272 23.029l-4.243 4.243L35.757 40 23.029 52.729l4.243 4.242L40 44.243l12.729 12.728z"></path></svg></a></div><div class="fr_div_3"><div class="fr_div_4"><div class="fr_div_5"><div class="fr_div_6">{m1}</div><div class="fr_div_7"> {m2} </div><div class="fr_div_8"><span class="fr_span_8">{m3}</span> &nbsp;{m4}&nbsp; </div><a class="fr_a_2" href="{url}" target="_blank">{m5}</a></div></div></div><div class="fr_div_9"></div></div><style> .fr_span_8 { text-decoration: line-through; color: #F44336; } .fr_div_1 { animation: none 0s ease 0s 1 normal none running; backface-visibility: visible; background: transparent none repeat 0 0 / auto auto padding-box border-box scroll; border: medium none currentColor; border-collapse: separate; border-image: none; border-radius: 0; border-spacing: 0; bottom: auto; box-shadow: none; box-sizing: content-box; caption-side: top; clear: none; clip: auto; columns: auto; column-count: auto; column-fill: balance; column-gap: normal; column-rule: medium none currentColor; column-span: 1; column-width: auto; content: normal; counter-increment: none; counter-reset: none; direction: ltr; empty-cells: show; float: none; hyphens: none; letter-spacing: normal; list-style: disc outside none; margin: 0; max-height: none; max-width: none; min-height: 0; min-width: 0; orphans: 0; outline: medium none invert; overflow: visible; overflow-x: visible; overflow-y: visible; padding: 0; page-break-after: auto; page-break-before: auto; page-break-inside: auto; perspective: none; perspective-origin: 50% 50%; right: auto; tab-size: 8; table-layout: auto; text-align: inherit; text-align-last: auto; text-decoration: none solid currentColor; text-indent: 0; text-shadow: none; text-transform: none; transform: none; transform-origin: 50% 50% 0; transform-style: flat; transition: none 0s ease 0s; unicode-bidi: normal; vertical-align: baseline; visibility: visible; white-space: normal; widows: 0; word-spacing: normal; all: initial; background-color: #fcefb4; color: #000; cursor: pointer; margin-top: 0px; display: table !important; opacity: 1 !important; position: fixed; top: 0px; left: 0px; font-weight: normal; font: normal normal 14px Arial, sans-serif; width: 100%; height: 55px; line-height: normal; z-index: 2147483647; } .fr_div_1:hover { background-color: #ffeb91; } .fr_div_2 { display: table-cell; vertical-align: middle; } .fr_svg_1 { margin-left: 4px; margin-top: 10px; } .fr_div_3 { display: table-cell; vertical-align: middle; text-align: center; } .fr_div_4 { max-width: 1100px; display: inline-block; width: 100%; text-align: left; position: relative; } .fr_div_5 { display: block; -webkit-align-items: center; -webkit-flex-direction: row; display: -webkit-flex; display: flex; align-items: center; flex-direction: row; white-space: pre; } .fr_a_1 { width: 45px; opacity: 0.3; display: block; height: 45px; text-align: center; cursor: pointer; } .fr_a_1:hover { opacity: 0.7; } .fr_div_9 { width: 45px; display: table-cell; vertical-align: middle; } @media only screen and (max-width: 1150px) { .fr_div_4 { max-width: 960px; } } @media only screen and (max-width: 1050px) { .fr_div_4 { max-width: 810px; } .fr_a_1 { width: 24px; } .fr_div_9 { width: 24px; } } @media only screen and (max-width: 850px) { .fr_div_4 { max-width: 700px; } } .fr_div_6 { display: inline-block; font-size: 20px; font-weight: bold; margin: auto 10px; line-height: 23px; vertical-align: middle; } @media only screen and (max-width: 1150px) { .fr_div_6 { font-size: 18px; } } @media only screen and (max-width: 1050px) { .fr_div_6 { font-size: 14px; margin-left: 5px; margin-right: 5px; } } .fr_div_7 { display: inline-block; display: -webkit-flex; -webkit-flex-grow: 2; display: flex; flex-grow: 2; vertical-align: middle; overflow: hidden; } .fr_div_8 { vertical-align: middle; font-size: 20px; font-weight: bold; margin: auto 10px; line-height: 23px; color: #4b9f00; } .fr_div_8 * { font-weight: inherit; font-size: inherit; line-height: inherit; } @media only screen and (max-width: 1050px) { .fr_div_8 { font-size: 16px; margin-left: 5px; margin-right: 5px; } } .fr_a_2 { display: inline-block; vertical-align: middle; font-size: 16px; font-weight: bold; color: #FFF !important; margin: auto 10px; padding: 10px 25px; background-color: #4b9f00 !important; border-radius: 7px; text-decoration: none !important; } .fr_a_2:hover { background-color: #66ad26 !important; color: #FFF !important; } @media only screen and (max-width: 1050px) { .fr_a_2 { font-size: 14px; margin-left: 5px; margin-right: 5px; padding-left: 10px; padding-right: 10px; } }</style>';
                tpl = tpl.replace(/fr_div/ig, generatePW(10));
                var aclass = generatePW(10);
                tpl = tpl.replace(/fr_a/ig, aclass);
                tpl = tpl.replace(/fr_svg/ig, generatePW(10));
                tpl = tpl.replace(/fr_span/ig, generatePW(10));
                tpl = tpl.replace("{m1}", request["m1"]);
                tpl = tpl.replace("{m2}", request["m2"]);
                tpl = tpl.replace("{m3}", request["m3"]);
                tpl = tpl.replace("{m4}", request["m4"]);
                tpl = tpl.replace("{m5}", request["m5"]);
                tpl = tpl.replace("{url}", request["url"]);
                div.innerHTML = tpl;
                document.html.appendChild(div);
                document.getElementsByClassName(aclass + "_1")[0].onclick = function(event) {
                    event = event || window.event;
                    event.preventDefault();
                    document.getElementById(divid).destroy();
                    localStorage.setItem("fr_no_show", Date.now() + 1E3 * 60 * 60 * 24 * 15);
                };
                document.getElementsByClassName(aclass + "_2")[0].onclick = function(event) {
                    document.getElementById(divid).destroy();
                    localStorage.setItem("fr_no_show", -1);
                };
                localStorage.setItem("fr_no_show", Date.now() + 1E3 * 60 * 60 * 20);
            }
        });
    }
}
if (typeof frigate_cs !== "function") {
    isGetMessageStart = false;
    friwebCSStart = false;
    mainWinIsShow = false;

    function frigate_cs() {
        friwebCSStart = true;
        var frigate_cs_close = function(e) {
            if (e) {
                e.stop();
            }
            var frigate_wr = $("frigate_wr");
            frigate_wr.setStyle("visibility", "hidden");
            frigate_wr.removeClass("frigate_vi");
            if (!$("frigate_wr2")) {
                var head = (new Element("div", {
                    "id": "frigate_wr2"
                })).grab((new Element("div", {
                    "class": "frigate_h",
                    "text": ""
                })).grab(new Element("a", {
                    "class": "frigate_link2",
                    "html": "&nbsp;",
                    "data-tooltip": "Больше",
                    events: {
                        "click": frigate_cs_open
                    }
                })));
                document.html.grab(head);
                head.setStyle("visibility", "visible");
            }
            chrome[runtimeOrExtensionFrigate].sendMessage({
                "type": "from_cs",
                "tabHost": tabHost,
                "value": true
            });
        };
        var frigate_cs_open = function(e) {
            if (e) {
                e.stop();
            }
            $("frigate_wr2").destroy();
            var frigate_wr = $("frigate_wr");
            frigate_wr.setStyle("visibility", "visible");
            frigate_wr.addClass("frigate_vi");
            chrome[runtimeOrExtensionFrigate].sendMessage({
                "type": "from_cs",
                "tabHost": tabHost,
                "value": false
            });
        };
        var onProxy = function() {
            chrome[runtimeOrExtensionFrigate].sendMessage({
                "type": "frigatetabon",
                "tabHost": tabHost,
                "url": tabUrl,
                "tabId": tabId
            });
        };
        var offProxy = function() {
            chrome[runtimeOrExtensionFrigate].sendMessage({
                "type": "frigatetaboff",
                "tabHost": tabHost,
                "url": tabUrl,
                "tabId": tabId
            });
        };
        var chProxy = function() {
            chrome[runtimeOrExtensionFrigate].sendMessage({
                "type": "chproxy",
                "tabHost": tabHost,
                "url": tabUrl,
                "tabId": tabId
            });
        };
        var showMainWin = function() {
            if (mainWinIsShow) {
                return;
            }
            mainWinIsShow = true;
            document.html.grab((new Element("div", {
                "id": "frigate_wr",
                styles: {
                    display: "none"
                },
                "class": "frigate_vi"
            })).grab((new Element("div", {
                "id": "frigate_topbl"
            })).grab(new Element("div", {
                "class": "frigate_h",
                "html": "Свободный интернет &nbsp;&nbsp;"
            })).grab((new Element("div", {
                "id": "frigate_body"
            })).grab(new Element("div", {
                "id": "frigate_list",
                "class": "frigate_highlight"
            })).grab(new Element("a", {
                "id": "frigate_on",
                "class": "frigate_links frigate_off",
                "html": "&nbsp;"
            })).grab(new Element("div", {
                "id": "frigate_dop",
                "class": "frigate_small"
            }))).grab((new Element("div", {
                "id": "frigate_f"
            })).grab(new Element("a", {
                "class": "frigate_link",
                "html": "&nbsp;",
                "data-tooltip": "close",
                events: {
                    "click": frigate_cs_close
                }
            })))));
        };
        var isreptext = false;
        var getMessage4cs = function(request, sender) {
            if (request.type == "showwait") {
                showMainWin();
            } else {
                if (request.type == "cs" && request.value) {
                    showMainWin();
                    if (!isGetMessageStart) {
                        var frigate_list, frigate_dop, frigate_on;
                        var frigate_body = $("frigate_body");
                        window.addEvent("domready", function() {
                            var ScrollSpy = new Class({
                                Implements: [Options, Events],
                                options: {
                                    min: 0,
                                    mode: "vertical",
                                    max: 0,
                                    container: window,
                                    onEnter: "",
                                    onLeave: $empty,
                                    onTick: $empty
                                },
                                initialize: function(a) {
                                    this.setOptions(a);
                                    this.container = document.id(this.options.container);
                                    this.enters = this.leaves = 0;
                                    this.max = this.options.max;
                                    if (this.max == 0) {
                                        var b = this.container.getScrollSize();
                                        this.max = this.options.mode == "vertical" ? b.y : b.x;
                                    }
                                    this.addListener();
                                },
                                addListener: function() {
                                    this.inside = false;
                                    this.container.addEvent("scroll", function() {
                                        var a = this.container.getScroll();
                                        var b = this.options.mode == "vertical" ? a.y : a.x;
                                        if (b >= this.options.min && b <= this.max) {
                                            if (!this.inside) {
                                                this.inside = true;
                                                this.enters++;
                                                this.fireEvent("enter", [a, this.enters]);
                                            }
                                            this.fireEvent("tick", [a, this.inside, this.enters, this.leaves]);
                                        } else {
                                            if (this.inside) {
                                                this.inside = false;
                                                this.leaves++;
                                                this.fireEvent("leave", [a, this.leaves]);
                                            }
                                        }
                                    }.bind(this));
                                }
                            });
                            var topbar = $("frigate_wr").set("tween", {
                                    duration: 200
                                }),
                                topDistance = 30,
                                fadeTo = 0.5;
                            var topbarME = function() {
                                    topbar.tween("opacity", 1);
                                },
                                topbarML = function() {
                                    topbar.tween("opacity", fadeTo);
                                };
                            var events = {
                                mouseenter: topbarME,
                                mouseleave: topbarML
                            };
                            var ss = new ScrollSpy({
                                min: topDistance,
                                max: window.getScrollSize().y + 1000,
                                onLeave: function() {
                                    topbarME();
                                    topbar.removeEvents(events);
                                },
                                onEnter: function() {
                                    topbarML();
                                    topbar.addEvents(events);
                                }
                            });
                        });
                        if (request.u) {
                            frigate_body.grab(new Element("div", {
                                "html": request.u
                            }));
                        }
                        if (request.n) {
                            frigate_body.grab(new Element("div", {
                                "html": request.n
                            }));
                        }
                    }
                    frigate_list = $("frigate_list");
                    frigate_dop = $("frigate_dop");
                    frigate_on = $("frigate_on");
                    tabId = request.tabId, tabHost = request.tabHost, tabUrl = request.tabUrl;
                    $("frigate_wr").setStyle("background", "none");
                    frigate_list.setStyle("visibility", "visible");
                    frigate_list.set("html", request.value.dop[2]);
                    frigate_dop.setStyle("visibility", "visible");
                    frigate_dop.set("html", request.value.dop[0]);
                    frigate_on.setStyle("visibility", "visible");
                    if (request.value.dop[1]) {
                        frigate_on.set("data-tooltip", request.value.dop[1]);
                    }
                    if (request.value.isonepage == 3 || request.value.isonepage == 4) {
                        frigate_on.removeClass("frigate_off");
                        frigate_on.addClass("frigate_on");
                    } else {
                        if (request.value.isonepage == 1) {
                            frigate_on.removeClass("frigate_off");
                            frigate_on.addClass("frigate_on");
                            frigate_on.removeEvent("click", onProxy);
                            frigate_on.removeEvent("click", offProxy);
                            frigate_on.addEvent("click", offProxy);
                        } else {
                            frigate_on.removeClass("frigate_on");
                            frigate_on.addClass("frigate_off");
                            frigate_on.removeEvent("click", onProxy);
                            frigate_on.removeEvent("click", offProxy);
                            frigate_on.addEvent("click", onProxy);
                        }
                    }
                    if (request.value.isonepage == 3 || request.value.isonepage == 4 || request.value.isonepage == 1) {
                        if (request.pr[1]) {
                            frigate_dop.grab(new Element("a", {
                                "class": "frigatel_" + request.pr[1] + " frigate_links",
                                "html": "&nbsp;",
                                "data-tooltip": request.pr[0],
                                events: {
                                    "click": chProxy
                                }
                            }));
                        }
                    }
                    if (!request.hide) {
                        $("frigate_wr").setStyle("visibility", "visible");
                    } else {
                        frigate_cs_close();
                    }
                    isGetMessageStart = true;
                } else {
                    if (request.type == "csr" && request.rep.length > 0) {
                        if (isreptext) {
                            return;
                        }
                        isreptext = true;
                        console.log(JSON.stringify(request.rep));
                        var r = [];
                        var idata = request.rep.length;
                        while (idata--) {
                            if (typeof request.rep[idata] == "undefined") {
                                continue;
                            }
                            r[idata] = RegExp(request.rep[idata].f, "i");
                        }
                        window.addEvent("domready", function() {
                            var b = document.body;
                            var idata = request.rep.length;
                            while (idata--) {
                                if (typeof request.rep[idata] == "undefined") {
                                    continue;
                                }
                                b.innerHTML = b.innerHTML.replace(r[idata], request.rep[idata].t);
                            }
                        });
                    }
                }
            }
        };
        chrome[runtimeOrExtensionFrigate].onMessage.addListener(getMessage4cs);
    }
}
if (!friwebCSStart) {
    frigate_cs();
}
if (!frigateRecStart) {
    frigate_rec();
};