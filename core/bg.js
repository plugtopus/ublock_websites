var tRecAllHosts, trec, slowConnect, ip, azaprethide, azapret, proxyUpdate, timeOutAuth, noAutoChangeProxy, autoChangeProxyCountMax, autoChangeProxyCount, compres, a, timerCheckProxy, tabUpdateAllArr, proxyOffset, iscl, detailsApp, timeClSerial, startTime, serialRep, serial, clearcacheis, uid, md5api, timerUpdateHost, rgetEtag, noadv, noalert, nameTestFile, updateText, news, isRep, isProxyHosts, pr2, limitText, openPrNoNeed, openPr, prip, prco, pr, prauth4, prauth3, prauth2, prauth, pr2Def2, prDef2, prDefCo, prDef, extArr, endUrlIndex, startUrlIndex, first, ison, preproxy, preurls, presites, preazapret, isShowMess, first_api, rep, timewaitUpdateHost, timewaitClSerial, timewait2, timewait, dataRep, blHosts, lastLoadHosts, proxyHostsCl, checkUrls, proxyHosts;
proxyHosts = {}, checkUrls = [], proxyHostsCl = [], lastLoadHosts = {}, blHosts = [], dataRep = [], timewait = 9e5, timewait2 = 19e3;
var timewait3 = -1;
timewaitClSerial = 216e5, timewaitUpdateHost = 72e5;
var num_tabs, timewait407 = 3e4;
rep = {}, first_api = "";
var upd407 = 0;
isShowMess = {}, preproxy = preurls = presites = preazapret = null, first = ison = !0;
var attempts = 6;
startUrlIndex = 0, endUrlIndex = 1, extArr = ["org", "biz"], prDefCo = prDef = "", prDef2 = [
    ["HTTPS uk11.friproxy.biz:443", "uk"],
    ["HTTPS fr11.friproxy.biz:443", "fr"]
], pr2Def2 = ["SOCKS5 uk11.friproxy.biz:1080", "SOCKS5 fr11.friproxy.biz:1080"], prauth = ls.set("prauth"), prauth2 = ls.set("prauth2"), prauth3 = ls.set("prauth3"), prauth4 = ls.set("prauth4"), prco = pr = "", openPr = !1, limitText = "wait", pr2 = "", isRep = isProxyHosts = !1, news = ls.get("news"), updateText = ls.get("updateText"), noalert = !1, noadv = ls.get("noadv"), rgetEtag = ls.get("rgetEtag"), timerUpdateHost = !1, md5api = "", uid = ls.get("uidkey"), clearcacheis = !0, serial = 0, serialRep = "0", startTime = Date.now(), timeClSerial = startTime + timewaitClSerial, detailsApp = chrome.app.getDetails();
var idContMen = [];
iscl = !0, proxyOffset = 0, tabUpdateAllArr = {}, a = ls.get("a"), slink = ls.get("slink"), compres = ls.get("compres"), autoChangeProxyCount = 0, autoChangeProxyCountMax = 7;
var iid, token, GlobalContentLength = 0,
    GlobalOriginalContentLength = 0,
    LenCount = 0,
    ContentLengthCounterStart = ls.get("ContentLengthCounterStart");
ContentLengthCounterStart || setContentLengthCounterStart(), noAutoChangeProxy = ls.get("noAutoChangeProxy"), timeOutAuth = 0, proxyUpdate = 1, azapret = [], azaprethide = {}, ip = "", (slowConnect = ls.get("slow")) && setSlow(), trec = ls.get("trec", uid), tRecAllHosts = {}, d2("friGate starting..."), uid ? void 0 !== localStorage.version ? (localStorage.clear(), ison = !0, ls.set("on", !0)) : (first = !1, ison = ls.get("on")) : (localStorage.clear(), ison = !0, uid = generatePW(), ls.set("uidkey", uid, !1), ls.set("on", !0));
var lang = chrome.i18n.getMessage("@@ui_locale");

function setSlow() {
    globalTimeout = slowConnect ? 7e4 : 1e4
}

function onProxyError() {
    chrome.proxy.settings.get({
        incognito: !1
    }, function(e) {
        var t = !1;
        e && void 0 !== e.levelOfControl && "controllable_by_this_extension" != e.levelOfControl && "controlled_by_this_extension" != e.levelOfControl && (t = !0), t && ison ? (ison = !1, proxyoff(!0, !0), errIcon(), chrome.browserAction.setTitle({
            title: l("messErrOverExtProxy")
        })) : t || ison || (ison = !0, proxyon())
    })
}

function setUserHostUrl(e, t, r, o, s) {
    s ? (0 > t || checkUrls.include(e + t), proxyHosts[e] = {
        on: !1,
        d: 0,
        bl: !1,
        url: t
    }, r && (proxyHosts[e].l = r), proxyHosts[e].lid = o, -2 == t && (proxyHosts[e].ons = !0), proxyHostsCl.include("*://" + e + "/*")) : (checkUrls.erase(e + t), delete proxyHosts[e], proxyHostsCl.erase("*://" + e + "/*"))
}

function chNoNeedopenPr() {
    for (var e in proxyHosts)
        if (proxyHosts.hasOwnProperty(e) && void 0 !== proxyHosts[e].l) return !1;
    return !0
}

function getMessage(e, t, r) {
    if (e)
        if ("getTabId" == e.type) r({
            tabId: t.tab.id
        });
        else if ("from_cs" == e.type && e.tabHost) void 0 !== proxyHosts[e.tabHost] ? (proxyHosts[e.tabHost].hide = e.value, saveHostsToLs()) : (azaprethide[e.tabHost] = e.value, ls.set("azaprethide", azaprethide));
        else if ("frigate" == e.type && e.value) "gettld" == e.value ? (getTld(), d("getTld===", tld), preproxy = "", setProxy($empty)) : "isslowconn" == e.value && (slowConnect = e.val2 ? 1 : 0, setSlow()), "noautochproxy" == e.value ? noAutoChangeProxy = e.val2 ? 1 : 0 : "compres" == e.value ? compres = e.val2 ? 1 : 0 : "anon" == e.value ? a = e.val2 ? 1 : 0 : "noalert" == e.value ? noalertRead() : "noadv" == e.value ? noadvRead() : "proxy" == e.value ? (preproxy = "", "f" == proxyRead() ? (openPrNoNeed = chNoNeedopenPr(), openPr || openPrNoNeed ? setProxy(function() {
            checkAllTabWhenEnable(!1)
        }) : getSitesUrl(!1, function() {
            checkAllTabWhenEnable(!1)
        })) : setProxy($empty)) : "getfrlist" == e.value && r(proxyHosts);
        else if ("chproxy" == e.type && e.tabHost && e.url && e.tabId) proxyOffset++, proxyUpdate = 1, md5api = "", openPr = !1, getSitesUrl(!1, function() {
            tabUpdate(!1, e.url, e.tabId)
        });
        else if ("frigatetabon" == e.type && e.tabHost && e.url && e.tabId) proxyHosts[e.tabHost].man = !0, setProxy(function() {
            actIcon(), tabUpdate(!1, e.url, e.tabId)
        });
        else if ("frigatetaboff" == e.type && e.tabHost && e.url && e.tabId) proxyHosts[e.tabHost].man = !1, setProxy(function() {
            noActIcon(), tabUpdate(!1, e.url, e.tabId)
        });
        else if ("frigateisshow" == e.type && e.tabId) isShowMess[e.tabId] = !0;
        else if ("frigatelist" == e.type) {
            var o = "onlist" == e.value.act;
            if (o || "offlist" == e.value.act) {
                if (e.value.id && (t = ls.get("list")) && 0 < t.length && void 0 !== t[e.value.id]) {
                    var s = t[e.value.id];
                    0 < s.d.length ? (Object.each(s.d, function(e, t) {
                        e.on && setUserHostUrl(e.h, e.u, s.n, t, o)
                    }), ison && setOrUpdateHandlers(), saveHostsToLs(), openPr ? setProxy(function() {
                        r(!0)
                    }) : (openPr = 0, getSitesUrl(!1, function() {
                        checkAllTabWhenEnable(!1)
                    }))) : r(!0)
                }
            } else if ("delurl" == e.value.act) {
                if (-5 == e.value.url) return void 0 !== proxyHosts[e.value.host] ? (proxyHosts[e.value.host].ons = proxyHosts[e.value.host].ons ? -3 : -1, saveHostsToLs(), setProxy(function() {
                    checkAllTabWhenEnable(!1), r(!0)
                })) : r(!1), !0;
                e.value.host && e.value.url && (setUserHostUrl(e.value.host, e.value.url, !1, !1, !1), void 0 === e.value.notApply && (saveHostsToLs(), ison && setOrUpdateHandlers(), openPr || (openPrNoNeed = chNoNeedopenPr()) && onOffLimit(), checkAllTabWhenEnable(!1))), r(!0)
            } else if ("churl" == e.value.act) t = checkHostInProxyHosts("http://" + getClHost(e.value.host)), t.tabHost ? void 0 === proxyHosts[t.tabHost].lid ? r("friGate") : r(proxyHosts[t.tabHost].lid) : r(!1);
            else if ("url" == e.value.act) {
                if (-5 == e.value.url) return void 0 !== proxyHosts[e.value.host] ? (proxyHosts[e.value.host].ons = -3 == proxyHosts[e.value.host].ons, saveHostsToLs(), setProxy(function() {
                    checkAllTabWhenEnable(!1), r(!0)
                })) : r(!1), !0;
                setUserHostUrl(e.value.host, e.value.url, e.value.list, e.value.lid, !0), ison && setOrUpdateHandlers(), saveHostsToLs(), openPr ? setProxy(function() {
                    checkAllTabWhenEnable(e.value.host), r(!0)
                }) : (getSitesUrl(!1, function() {
                    checkAllTabWhenEnable(e.value.host)
                }), r(!0))
            }
            return !0
        }
}

function noalertRead() {
    var e = ls.get("noalert");
    null !== e && (noalert = e)
}

function noadvRead() {
    var e = ls.get("noadv");
    null !== e && (noadv = e), sovetnik.setRemovedState(noadv)
}

function proxyRead() {
    var e = ls.get("pr2");
    if (null == e || 1 > e.length) return prDef ? (pr = prDef, prco = prDefCo) : (e = Math.floor(Math.random() * prDef2.length), pr = prDef2[e][0], prco = prDef2[e][1], pr2 = pr2Def2[e]), prip = getprip(pr), "f";
    if (pr2 = pr = "", lsprL = e.length, 0 < lsprL)
        for (var t = 0; t < lsprL; t++) pr += e[t], t == lsprL - 1 && (pr += ";");
    return prco = prip = "", openPr = !0, "o"
}

function checkHostInAntizapret(e) {
    if ("http:" != (e = e.split(/\/+/g))[0] && "https:" != e[0]) return !1;
    for (var t = 0, r = azapret.length; t < r; t++)
        if (e[1] == azapret[t]) return e[1];
    return !1
}

function checkHostInTld(e) {
    var t = {};
    return e = e.split(/\/+/g), t.sheme = e[0] + "//", t.host = e[1], ("http://" == t.sheme || "https://" == t.sheme) && (t = (t = t.host.split(/\./g))[t.length - 1], !(!tld.hasOwnProperty(t) || !tld[t]) && t)
}

function checkHostInRepTextHosts(e) {
    var t = [];
    if (null != dataRep) {
        var r = dataRep.length;
        if (0 < r)
            for (; r--;) void 0 !== dataRep[r] && dataRep[r].s.test(e) && t.push({
                f: dataRep[r].f,
                t: dataRep[r].t
            })
    }
    return t
}

function checkHostInTopRec(e) {
    var t = !1,
        r = e.split(/\/+/g)[1];
    if (void 0 !== tRecAllHosts[r]) t = tRecAllHosts[r];
    else {
        var o = r.split(/\./g),
            s = o.length;
        if (1 < s)
            for (r = o[s - 1], s -= 2; - 1 < s; s--) r = o[s] + "." + r, void 0 !== tRecAllHosts["*." + r] && (t = tRecAllHosts["*." + r])
    }
    return !1 !== t && trec[t].hasOwnProperty("reg") && trec[t].reg && (trec[t].reg.test(e) || (t = !1)), t
}

function checkHostInProxyHosts(e) {
    var t = {
            tabHost: !1,
            tabClHost: "",
            isSheme: !1,
            allow: !1
        },
        r = e.split(/\/+/g);
    if (e = !1, t.sheme = r[0] + "//", t.host = r[1], "http://" != t.sheme && "https://" != t.sheme || (t.isSheme = !0), void 0 !== proxyHosts[t.host]) e = !0, t.tabHost = t.host, t.tabClHost = t.host;
    else {
        var o = (r = t.host.split(/\./g)).length;
        if (1 < o)
            for (t.tabClHost = r[o - 1], o -= 2; - 1 < o; o--)
                if (t.tabClHost = r[o] + "." + t.tabClHost, void 0 !== proxyHosts["*." + t.tabClHost]) {
                    t.tabHost = "*." + t.tabClHost;
                    break
                }
    }
    return !t.tabHost || !openPr && (openPr || e && 0 > proxyHosts[t.host].ons || void 0 !== proxyHosts[t.tabHost].lid) || (t.allow = !0), t
}

function checkAllTabWhenEnable(e) {
    ison && chrome['tabs'].query({}, function(t) {
        for (var r, o = t.length, s = 0; s < o; s++)
            if (r = checkHostInProxyHosts(t[s].url), r.tabHost && (!e || e && r.tabHost == e) || checkHostInAntizapret(t[s].url)) try {
                chrome['tabs'].update(t[s].id, {
                    url: t[s].url
                }, function() {})
            } catch (e) {}
    })
}

function tabListener31(e, t, r) {
    tabListenerAll(r = void 0 !== t.url ? t.url : r.url, e, !0, t.status), r && (0 < (t = checkHostInRepTextHosts(r)).length && chrome['tabs'].sendMessage(e, {
        type: "csr",
        rep: t
    }))
}

function tabListener32(e) {
    chrome['tabs'].get(e.tabId, function(t) {
        void 0 !== t.url && tabListenerAll(t.url, e.tabId, !1, !1)
    })
}

function tabListenerAll(e, t, r, o) {
    var s = !1;
    if (!e || "complete" !== o && !1 !== o || !1 !== (s = checkHostInTopRec(e)) && chrome['tabs'].query({
            url: e
        }, function(e) {
            var r;
            e && (r = e.map(function(e, t) {
                return e.id
            })), r && r.contains(t) && chrome['tabs'].sendMessage(t, trec[s])
        }), ison) {
        if (isProxyHosts && e) {
            var n = o = !1,
                a = !1,
                i = "",
                p = checkHostInProxyHosts(e);
            p.tabHost && p.allow ? (i = p.tabHost, p = null) : (n = checkHostInAntizapret(e)) || (a = checkHostInTld(e)), (n || i || a) && (r && void 0 === isShowMess[t] && (r = a ? "<b>." + a + "</b>" : n ? "<b>Antizapret</b>" : void 0 === proxyHosts[i].l ? "<b>Свободный интернет</b>" : "<b>" + proxyHosts[i].l + "</b>", i && void 0 !== proxyHosts[i].hide ? o = proxyHosts[i].hide : n && void 0 !== azaprethide[n] && (o = azaprethide[n]), a ? showMess(t, [l("messProxyOn"), "", l("messFromList") + r], o, a, e, 3) : n ? showMess(t, [l("messProxyOn"), "", l("messFromList") + r], o, n, e, 3) : proxyHosts[i].man ? showMess(t, [l("messProxyOnManually"), l("messProxyIsOff"), l("messFromList") + r], o, i, e, 1) : 0 > proxyHosts[i].ons ? showMess(t, [l("mess_manually_dis"), "", l("messFromList") + r], o, i, e, 0) : 1 == proxyHosts[i].ons ? showMess(t, [l("messTypeCh3"), "", l("messFromList") + r], o, i, e, 4) : proxyHosts[i].on ? showMess(t, [l("messProxyOn"), "", l("messFromList") + r], o, i, e, 3) : showMess(t, [l("messSiteWithoutProxy"), l("messProxyOff"), l("messFromList") + r], o, i, e, 0)), chrome['tabs'].getSelected(null, function(e) {
                if (e.id == t) return !(void 0 !== proxyHosts[i] && 0 > proxyHosts[i].ons) && (a || n || proxyHosts[i].on || proxyHosts[i].ons) || proxyHosts[i].man ? (actIcon(t), !0) : (listIcon(), !1)
            }))
        }
        noActIcon()
    } else disIcon()
}

function reqListenerAll(e) {
    e.tabId && e.url && (tabUpdateAllArr[e.tabId] = e.url)
}
chrome.browserAction.setBadgeBackgroundColor({
    color: [55, 169, 224, 90]
}), chrome.webRequest.onBeforeRequest.addListener(reqListenerAll, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
}, ["blocking"]), chrome.idle.onStateChanged.addListener(function(e) {
    "active" == e && getSitesUrl(!1, function() {})
}), updateText && (updateText = l("messUpdate")), genapi(), getTld(), noalertRead(), proxyRead(), loadhosts(), tRecPrepead(trec);
var checkResponseHeaders = function(e) {
        var t = 0;
        return Array.each(e, function(e, r) {
            e.name = e.name.toLowerCase(), "location" == e.name && (t = r)
        }), t
    },
    reqOnHeadersReceived = function(e) {
        if ("object" == typeof e.responseHeaders) {
            var t = e.responseHeaders.length,
                r = 0;
            if (0 < t) {
                for (var o = 0; o < t; o++)
                    if (void 0 !== e.responseHeaders[o].name) {
                        if ("status" == e.responseHeaders[o].name) {
                            var s = 1 * e.responseHeaders[o].value;
                            499 < s && 505 > s && r++
                        }
                        "server" == e.responseHeaders[o].name && "fri-gate" == e.responseHeaders[o].value && r++
                    }
                2 == r && (noAutoChangeProxy || changeProxy(e))
            }
        }
        if (/(3)\d\d/g.test(e.statusLine))
            if ("xmlhttprequest" == e.type) {
                if (-1 != e.url.indexOf("frigate_test_file=") || -1 != e.url.indexOf("frigate_404_check")) return {
                    cancel: !0
                }
            } else if (hostObj = checkHostInProxyHosts(e.url), hostObj.tabHost && !proxyHosts[hostObj.tabHost].on && hostObj.allow && (t = checkResponseHeaders(e.responseHeaders)) && (toUrl = e.responseHeaders[t].value, toUrl = toUrl.split(/\/+/g)[1], blHostslength = blHosts.length, 0 < blHostslength))
                for (o = 0; o < blHostslength; o++) - 1 != toUrl.indexOf(blHosts[o]) && (proxyHosts[hostObj.tabHost].bl = !0, proxyHosts[hostObj.tabHost].upd = {}, proxyHosts[hostObj.tabHost].upd[e.tabId] = e.url, noSiteRes(hostObj.tabHost, null, e.tabId, e.url, null, null));
        return {
            cancel: !1
        }
    };

function reqListener(e) {
    if (void 0 !== isShowMess[e.tabId] && delete isShowMess[e.tabId], (isProxyHosts || isRep) && e.url) {
        var t = e.url,
            r = checkHostInProxyHosts(t);
        if (r.isSheme) {
            if (isRep && void 0 !== rep[r.host]) return {
                redirectUrl: t.replace(r.host, rep[r.host])
            };
            if (r.tabHost && r.allow && 1 != proxyHosts[r.tabHost].ons) {
                var o = r.tabHost,
                    s = r.tabClHost;
                if (proxyHosts[o].bl) proxyHosts[o].upd[e.tabId] = t;
                else if (proxyHosts[o].d < Date.now())
                    if (proxyHosts[o].bl = !0, proxyHosts[o].upd = {}, proxyHosts[o].upd[e.tabId] = t, void 0 !== proxyHosts[o].url)
                        if (-1 != proxyHosts[o].url.indexOf("|")) {
                            var n = proxyHosts[o].url.split(/\|/g),
                                a = "robots.txt";
                            if (0 < n.length) {
                                n[1] && (a = n[1]);
                                var i = function() {
                                        noSiteRes(o, s, e.tabId, t, !1, 3)
                                    },
                                    l = function(r) {
                                        j = -1 != r.indexOf(n[0]), noSiteRes(o, s, e.tabId, t, j, 3)
                                    };
                                a = r.sheme + s + "/" + a, Req(a, 1e4, l, i, i, "GET", "frigate_test_file=" + generatePW(5) + Date.now())
                            }
                        } else -1 == proxyHosts[o].url ? (l = function(r) {
                            j = !!/(4|5)\d\d/g.test(r.status), noSiteRes(o, s, e.tabId, t, j, 3)
                        }, a = genRandFile(r.sheme, s), getUrl3(a, "get", {}, "", l, l)) : (proxyHosts[o].testsize = -2, l = function(r) {
                            r ? ("object" == typeof r && (r = ""), r = h(r)) : r = !1, noSiteRes(o, s, e.tabId, t, r, 2)
                        }, a = r.sheme + s + proxyHosts[o].url, getUrl3(a, "get", {}, "", l, l), r = genRandFile(r.sheme, s), getUrl3(r, "get", {}, "", l, l));
                    else l = function(r) {
                        noSiteRes(o, s, e.tabId, t, r, !1)
                    }
            }
        }
    }
    return {
        cancel: !1
    }
}

function onAddAuthHeader(e) {
    if (e.requestHeaders.push({
            name: "X-Compress",
            value: compres + ""
        }), "http:" == e.url.substring(0, 5)) {
        var t = "",
            r = !1,
            o = checkHostInProxyHosts(e.url);
        o.tabHost && o.allow ? t = o.tabHost : r = checkHostInAntizapret(e.url), (r || t && (proxyHosts[o.tabHost].on || 1 == proxyHosts[o.tabHost].ons || proxyHosts[o.tabHost].man)) && (compres && a ? prauth4 && e.requestHeaders.push({
            name: "Proxy-Authorization",
            value: prauth4
        }) : compres ? prauth3 && e.requestHeaders.push({
            name: "Proxy-Authorization",
            value: prauth3
        }) : a ? prauth2 ? e.requestHeaders.push({
            name: "Proxy-Authorization",
            value: prauth2
        }) : e.requestHeaders.push({
            name: "Proxy-Authorization",
            value: "a"
        }) : prauth && e.requestHeaders.push({
            name: "Proxy-Authorization",
            value: prauth
        }))
    }
    return {
        requestHeaders: e.requestHeaders
    }
}

function reqOnResponseStarted(e) {
    if (!noalert && isProxyHosts && e.url) {
        var t = checkHostInProxyHosts(e.url);
        (t.tabHost && t.allow || checkHostInAntizapret(e.url)) && chrome['tabs'].sendMessage(e.tabId, {
            type: "showwait"
        })
    }
    void 0 !== e.statusCode && 407 == e.statusCode && (changeProxy(e, !0), d2(e.statusCode))
}

function reqOnErrorOccurred(e) {
    d("details", e), -1 == e.error.indexOf("ERR_TUNNEL_CONNECTION_FAILED") && -1 == e.error.indexOf("ERR_PROXY_CONNECTION_FAILED") && -1 == e.error.indexOf("ERR_PROXY") || changeProxy(e, !0), void 0 !== e.statusCode && 404 == e.statusCode && changeProxy(e)
}

function reqonCompletedForFindErr(e) {
    if ("object" == typeof e.responseHeaders) {
        var t = e.responseHeaders.length;
        if (0 < t) {
            for (var r = !1, o = 0; o < t; o++) void 0 !== e.responseHeaders[o].name && "X-Squid-Error" == e.responseHeaders[o].name && "ERR_ACCESS_DENIED 0" == e.responseHeaders[o].value && (r = !0);
            r && changeProxy(e, !0)
        }
    }
}

function changeProxy(e, t) {
    0 == autoChangeProxyCount && (proxyOffset = 0), autoChangeProxyCount <= autoChangeProxyCountMax && (autoChangeProxyCount++, proxyOffset++, proxyUpdate = 1, md5api = "", openPr = !1, t ? (timeOutAuth = 0, reGet(function() {
        e.url && e.tabId && tabUpdate(null, e.url, e.tabId)
    })) : getSitesUrl(!1, function() {
        e.url && e.tabId && tabUpdate(null, e.url, e.tabId)
    }))
}

function onoff() {
    ison ? proxyoff() : proxyon()
}

function onOffLimit() {
    openPrNoNeed = chNoNeedopenPr(), openPr || openPrNoNeed ? limitText = "" : (limitText = "lim", chrome.browserAction.setTitle({
        title: l("messErrLim")
    })), ison && chrome['tabs'].getSelected(null, function(e) {
        tabListenerAll(e.url, e.id, !0, !1)
    })
}

function proxyoff(e, t) {
    d2("off"), timerUpdateHost && clearInterval(timerUpdateHost), timerUpdateHost = !1, t || (timerCheckProxy && clearInterval(timerCheckProxy), timerCheckProxy = !1), preproxy = preurls = presites = preazapret = null, md5api = openPr = !1, setOrUpdateHandlers(!0), setOrUpdateTabHandlers(!0), disIcon(), chrome.proxy.settings.clear({
        scope: "regular"
    }, function() {
        checkAllTabWhenEnable(!1), e || (ison = null, ls.set("on", !1))
    })
}

function clearcache(e, t) {
    if (clearcacheis) {
        clearcacheis = !1, e = e ? Date.now() - e : startTime, startTime = Date.now();
        try {
            chrome.browsingData.removeCache({
                since: e
            }, t)
        } catch (e) {
            "function" == typeof t && t()
        }
    }
}

function offHandlersAll() {
    chrome.webRequest.onBeforeRequest.hasListener(reqListenerAll) && chrome.webRequest.onBeforeRequest.removeListener(reqListenerAll)
}

function setOrUpdateHandlers(e) {
    offHandlersAll(), chrome.webRequest.onBeforeRequest.hasListener(reqListener) && chrome.webRequest.onBeforeRequest.removeListener(reqListener), e || chrome.webRequest.onBeforeRequest.addListener(reqListener, {
        urls: proxyHostsCl,
        types: ["main_frame"]
    }, ["blocking"]), chrome.webRequest.onHeadersReceived.hasListener(reqOnHeadersReceived) && chrome.webRequest.onHeadersReceived.removeListener(reqOnHeadersReceived), e || chrome.webRequest.onHeadersReceived.addListener(reqOnHeadersReceived, {
        urls: proxyHostsCl,
        types: ["xmlhttprequest", "main_frame"]
    }, ["blocking", "responseHeaders"]), chrome.webRequest.onErrorOccurred.hasListener(reqOnErrorOccurred) && chrome.webRequest.onErrorOccurred.removeListener(reqOnErrorOccurred), e || chrome.webRequest.onErrorOccurred.addListener(reqOnErrorOccurred, {
        urls: proxyHostsCl,
        types: ["main_frame"]
    }), chrome.webRequest.onHeadersReceived.hasListener(reqOnResponseStarted) && chrome.webRequest.onHeadersReceived.removeListener(reqOnResponseStarted), e || chrome.webRequest.onHeadersReceived.addListener(reqOnResponseStarted, {
        urls: proxyHostsCl,
        types: ["main_frame"]
    }), chrome.webRequest.onResponseStarted.hasListener(reqOnResponseStarted) && chrome.webRequest.onResponseStarted.removeListener(reqOnResponseStarted), e || chrome.webRequest.onResponseStarted.addListener(reqOnResponseStarted, {
        urls: proxyHostsCl,
        types: ["main_frame"]
    }), chrome.webRequest.onCompleted.hasListener(reqOnResponseStarted) && chrome.webRequest.onCompleted.removeListener(reqOnResponseStarted), e || chrome.webRequest.onCompleted.addListener(reqOnResponseStarted, {
        urls: proxyHostsCl,
        types: ["main_frame"]
    }), chrome.webRequest.onCompleted.hasListener(reqonCompletedForFindErr) && chrome.webRequest.onCompleted.removeListener(reqonCompletedForFindErr), e || chrome.webRequest.onCompleted.addListener(reqonCompletedForFindErr, {
        urls: proxyHostsCl,
        types: ["main_frame"]
    }, ["responseHeaders"]), chrome.webRequest.onBeforeSendHeaders.hasListener(onAddAuthHeader) && chrome.webRequest.onBeforeSendHeaders.removeListener(onAddAuthHeader), e || chrome.webRequest.onBeforeSendHeaders.addListener(onAddAuthHeader, {
        urls: ["<all_urls>"]
    }, ["requestHeaders", "blocking"])
}

function setOrUpdateTabHandlers(e) {
    chrome['tabs'].onUpdated.hasListener(tabListener31) && chrome['tabs'].onUpdated.removeListener(tabListener31), chrome['tabs'].onActivated.hasListener(tabListener32) && chrome['tabs'].onActivated.removeListener(tabListener32), e || (chrome['tabs'].onUpdated.addListener(tabListener31), chrome['tabs'].onActivated.addListener(tabListener32))
}

function proxyon(e) {
    d2("on"), chrome.browserAction.setBadgeText({
        text: "WAIT"
    }), limitText = "WAIT", chrome.proxy.settings.get({
        incognito: !1
    }, function(t) {
        if (t && void 0 !== t.levelOfControl && "controllable_by_this_extension" != t.levelOfControl && "controlled_by_this_extension" != t.levelOfControl) return ison = !1, chrome.browserAction.setTitle({
            title: l("messErrOverExtProxy")
        }), errIcon(), !1;
        timerCheckProxy || (timerCheckProxy = setInterval(onProxyError, 3e3)), ison = !0, e || ((isProxyHosts || isRep) && setProxy(function() {
            setOrUpdateHandlers(0), setOrUpdateTabHandlers(0)
        }), proxyOffset++, serial = 0), openPrNoNeed = chNoNeedopenPr(), 0 < proxyHostsCl.length ? (proxyUpdate = 2, getSitesUrl(!1, function() {
            proxyUpdate = serial = 0, getSitesUrl(!1, function() {
                checkAllTabWhenEnable(!1)
            })
        })) : (first_api = "&first_api", proxyUpdate = 1, getSitesUrl(!1, function() {
            checkAllTabWhenEnable(!1)
        })), timerUpdateHost || (timerUpdateHost = setInterval(getSitesUrl, timewaitUpdateHost)), chrome['tabs'].getSelected(null, function(e) {
            tabListenerAll(e.url, e.id, !0, !1)
        }), clearcache(864e5, function() {
            ls.set("on", !0), clearcacheis = !0
        })
    })
}

function actIcon() {
    a ? (chrome.browserAction.setIcon({
        path: "img/38aan.png"
    }), chrome.browserAction.setTitle({
        title: l("messProxyOnAn")
    })) : (chrome.browserAction.setIcon({
        path: "img/38a.png"
    }), chrome.browserAction.setTitle({
        title: l("messProxyOn")
    })), chrome.browserAction.setBadgeText({
        text: limitText
    })
}

function listIcon() {
    chrome.browserAction.setTitle({
        title: l("browser_action_title")
    }), a ? chrome.browserAction.setIcon({
        path: "img/38lan.png"
    }) : chrome.browserAction.setIcon({
        path: "img/38l.png"
    }), chrome.browserAction.setBadgeText({
        text: limitText
    })
}

function noActIcon() {
    chrome.browserAction.setTitle({
        title: l("browser_action_title")
    }), a ? chrome.browserAction.setIcon({
        path: "img/38an.png"
    }) : chrome.browserAction.setIcon({
        path: "img/38.png"
    }), chrome.browserAction.setBadgeText({
        text: limitText
    })
}

function disIcon() {
    chrome.browserAction.setIcon({
        path: "img/38g.png"
    }), chrome.browserAction.setBadgeText({
        text: "OFF"
    }), chrome.browserAction.setTitle({
        title: l("browser_action_title")
    })
}

function errIcon() {
    chrome.browserAction.setIcon({
        path: "img/38g.png"
    }), chrome.browserAction.setTitle({
        title: l("messErrOverExtProxy")
    }), chrome.browserAction.setBadgeText({
        text: "ERR"
    })
}

function showMess(e, t, r, o, s, n) {
    noalert || chrome['tabs'].query({
        url: s
    }, function(a) {
        var i;
        a && (i = a.map(function(e, t) {
            return e.id
        })), i.contains(e) && chrome['tabs'].sendMessage(e, {
            type: "cs",
            tabHost: o,
            tabUrl: s,
            hide: r,
            tabId: e,
            u: updateText,
            n: news,
            pr: [prip + " " + l("messChange"), prco],
            value: {
                dop: t,
                isonepage: n
            }
        })
    })
}

function tabUpdateAll() {
    emptyObject(tabUpdateAllArr) || chrome['tabs'].query({}, function(e) {
        var t, r = e.map(function(e) {
            return e.id
        });
        for (t in tabUpdateAllArr)
            if (tabUpdateAllArr.hasOwnProperty(t) && (e = parseInt(t), r.contains(e))) try {
                chrome['tabs'].update(e, {
                    url: tabUpdateAllArr[t]
                }, function() {})
            } catch (e) {}
        tabUpdateAllArr = {}
    })
}

function tabUpdate(e, t, r) {
    if (e && 0 < e.length) proxyHosts[e].bl = !1, "object" == typeof proxyHosts[e].upd && 0 < !emptyObject(proxyHosts[e].upd) ? chrome['tabs'].query({}, function(t) {
        var r = t.map(function(e, t) {
            return e.id
        });
        "object" == typeof proxyHosts[e].upd && Object.each(proxyHosts[e].upd, function(e, t) {
            if (t = parseInt(t), r.contains(t)) try {
                chrome['tabs'].update(t, {
                    url: e
                }, function() {})
            } catch (e) {}
        }), delete proxyHosts[e].upd
    }) : delete proxyHosts[e].upd;
    else try {
        chrome['tabs'].update(r, {
            url: t
        }, $empty)
    } catch (e) {}
    clearcacheis = !0
}

function tRecPrepead(e) {
    if ("object" == typeof e && null !== e)
        for (var t = 0, r = e.length; t < r; t++)
            if (e[t].hasOwnProperty("hosts")) {
                e[t].hasOwnProperty("reg") && e[t].reg && (trec[t].reg = new RegExp(e[t].reg, "igm"));
                for (var o = e[t].hosts.split(","); val = o.shift();) tRecAllHosts[val] = t
            }
}

function noSiteRes(e, t, r, o, s, n) {
    var a = !1;
    if ((2 == n || 7 == n) && void 0 !== s.s) {
        if (-2 == proxyHosts[e].testsize) return proxyHosts[e].testsize = s.s, proxyHosts[e].testhash = s.h, !0;
        7 == n ? checkN(proxyHosts[e].testsize, s.s, 15) && .15 > compareH(proxyHosts[e], s.h) && (a = !0) : 2 == n && (a = !0, checkN(proxyHosts[e].testsize, s.s, 15) && .15 > compareH(proxyHosts[e], s.h) && (a = !1)), delete proxyHosts[e].testsize, delete proxyHosts[e].testhash
    }
    var i = proxyHosts[e].on;
    3 == n && s || 2 == n && a || !n && s && void 0 !== s.res && s.res == t ? (d2(e + " - available"), proxyHosts[e].on = !1, proxyHosts[e].d = Date.now() + timewait2, i && setProxy(function() {
        noActIcon(), tabUpdate(e, o, r)
    })) : (d2(e + " - not available"), proxyHosts[e].on = !0, proxyHosts[e].d = Date.now() + timewait, i || setProxy(function() {
        actIcon(), tabUpdate(e, o, r)
    }))
}
var ind = startUrlIndex - 1,
    indExt = 0;

function genNewUrl() {
    var e = "";
    return ++ind > endUrlIndex && (ind = startUrlIndex, ++indExt > extArr.length - 1 && (indExt = 0)), ind != endUrlIndex && (e = ind), ext = extArr[indExt], "https://apigo.fri-gate" + e + "." + ext + apiPath + apiFile
}

function reGet(e) {
    if (apioffset + 2 > apicount) return "" == pr && proxyoff(), apioffset = 0, !0;
    apioffset += 1, setTimeout(function() {
        getSitesUrl(!1, e)
    }, 3e3)
}

function saveHostsToLs() {
    var e, t = {};
    if (!emptyObject(proxyHosts))
        for (e in proxyHosts)
            if (proxyHosts.hasOwnProperty(e)) {
                var r = proxyHosts[e];
                t[e] = void 0 !== r.ons ? {
                    ons: r.ons
                } : {}, void 0 !== r.url && r.url && (t[e].url = r.url), void 0 !== r.l && r.l && (t[e].l = r.l), void 0 !== r.lid && r.lid && (t[e].lid = r.lid), "uefined" != typeof r.hide && r.hide && (t[e].hide = !0)
            }
    ls.set("hosts", t, uid)
}

function savenewhosts(e, t) {
    var r = 0,
        o = 0;
    !t || emptyObject(t) || emptyObject(proxyHosts) || Array.each(t, function(e, t) {
        void 0 !== proxyHosts[e] && void 0 === proxyHosts[e].lid && (delete proxyHosts[e], proxyHostsCl.erase("*://" + e + "/*"), o++)
    }), proxyHosts || (proxyHosts = {}), t = ls.get("list");
    var s = {};
    emptyObject(t) || (Array.each(t, function(e, t) {
        Array.each(e.d, function(e) {
            s[e.h] = !0
        })
    }), t = {}), Object.each(e, function(e) {
        var t = e.h;
        t && (void 0 === proxyHosts[t] ? void 0 === s[t] && (proxyHosts[t] = {
            on: !1,
            d: 0,
            bl: !1
        }, proxyHosts[t].ons = !(void 0 === e.ons || !e.ons), void 0 !== e.url && e.url && (proxyHosts[t].url = e.url), proxyHostsCl.include("*://" + t + "/*"), isProxyHosts = isChange = !0, r++) : void 0 !== proxyHosts[t].lid || void 0 === e.url || !e.url || void 0 !== proxyHosts[t].url && proxyHosts[t].url == e.url || (proxyHosts[t].url = e.url, isProxyHosts = isChange = !0, r++))
    });
    var n = {},
        a = Object.keys(e);
    return 130 < a.length && Object.each(proxyHosts, function(t, r) {
        for (var s = 0, i = a.length; s < i; s++)
            if (r == e[a[s]].h || void 0 !== t.lid) return void(n[r] = t);
        o++
    }), proxyHosts = n, !(!r && !o) && (d2("save to friGate host. add:" + r + ", del:" + o), saveHostsToLs(), !0)
}

function proxyHostsAdd(e, t) {
    var r = {
        on: !1,
        d: 0,
        bl: !1,
        ons: !1
    };
    return void 0 !== t.ons && (r.ons = t.ons), void 0 !== t.l && t.l && (r.l = t.l), void 0 !== t.lid && t.lid && (r.lid = t.lid), void 0 !== t.url && t.url && (r.url = t.url, 0 > t.url || checkUrls.push(e + t.url)), void 0 !== t.hide && t.hide && (r.hide = !0), r
}

function parseRepText(e) {
    var t = [];
    if (null != e) {
        var r = e.length;
        if (0 < r)
            for (; r--;) void 0 !== e[r] && t.push({
                f: e[r].f,
                t: e[r].t,
                s: RegExp(e[r].s, "i")
            })
    }
    return t
}

function loadhosts() {
    (azaprethide = ls.get("azaprethide")) || (azaprethide = {});
    var e = 0;
    proxyHosts = {}, proxyHostsCl = [], checkUrls = [];
    var t = ls.get("hosts", uid);
    if (!emptyObject(t))
        for (var r in t) r && t.hasOwnProperty(r) && (proxyHosts[r] = proxyHostsAdd(r, t[r]), e++, proxyHostsCl.push("*://" + r + "/*"), isProxyHosts = !0);
    if (t = ls.get("list"), emptyObject(t) || Array.each(t, function(t, r) {
            t.on && Array.each(t.d, function(o) {
                var s = o.h;
                o.on && void 0 === proxyHosts[s] && (proxyHosts[s] = proxyHostsAdd(s, {
                    ons: !0,
                    l: t.n,
                    lid: r,
                    url: o.u
                }), e++, proxyHostsCl.push("*://" + s + "/*"), isProxyHosts = !0)
            })
        }), "object" == typeof(t = ls.get("dataRep", uid)) && (dataRep = parseRepText(t)), (t = ls.get("serialRep", !1)) && (serialRep = t), (t = ls.get("redir", uid)) && "object" == typeof t) {
        for (r in t) t.hasOwnProperty(r) && proxyHostsCl.include("*://" + r + "/*");
        rep = t, isRep = !0
    }
    1 > proxyHostsCl.length && (serial = 0), d2("loading from localStorage " + e + " hosts")
}

function setProxy(e) {
    var t = "",
        r = "",
        o = "[]",
        s = !1,
        n = 0;
    if (n = [], ison) {
        for (var a in proxyHosts)
            if (proxyHosts.hasOwnProperty(a)) {
                var i = proxyHosts[a];
                (openPr || !openPr && void 0 === proxyHosts[a].lid) && ((0 > i.ons || !i.on && !i.ons) && !i.man || (s = !0, n.push(a)))
            }
        r = JSON.stringify(azapret), a = md5(r);
        var l = azapret.length;
        t = JSON.stringify(n), i = md5(t), 0 < (n = checkUrls.length) && (o = JSON.stringify(checkUrls));
        var p = md5(o);
        if (preazapret != a || presites != i || preurls != p || preproxy != pr) {
            if (preazapret = a, presites = i, preurls = p, preproxy = pr, s || 0 < n || 0 < l) {
                var d = pr,
                    c = pr2;
                c || (c = "DIRECT");
                var u, h = "";
                for (u in tld) tld.hasOwnProperty(u) && tld[u] && (h = h + "if (dnsDomainIs(host, '." + u + "')) {return '" + c + "';} ");
                postclearproxy = function() {
                    var s = {
                        mode: "pac_script",
                        pacScript: {
                            data: "function FindProxyForURL(url, host) {var schema=url.substring(0,5); if ( schema!='https' && schema!='http:' ) return 'DIRECT'; if ( shExpMatch( url,'*/aj/frigate/api/+" + apiFile + "*' ) ) return 'DIRECT'; if ( shExpMatch( url,'https://api3.fri*:80/' ) ) return 'DIRECT'; if (shExpMatch( url,\"*" + nameTestFile + "\" + host + \".core*\") ) return 'DIRECT'; if ( url.indexOf('frigate_test_file=')!=-1 ) return 'DIRECT'; if (shExpMatch( url,'*/frigate_404_check_*.png*') ) return 'DIRECT'; var az = " + r + "; var i; var is = false; var len = " + l + ";for (i = 0; i < len; i++) {if ( az[i] == host) { is = true; break; } }if (!is) {var urls = " + o + "; var url2=url.substring(url.indexOf('//')+2);if ( urls.indexOf(url2)!=-1 ) return 'DIRECT';var sites = " + t + "; var i; is = false;while (i = sites.shift()) { if (i == host) { is = true; break;} if ( i[0] == '*') { var lenHost = -1*(i.length-2); if (i.substr(lenHost) == host) { is = true; break; } lenHost = -1*(i.length-1); if (i.substr(lenHost) == host.substr(lenHost)) { is = true; break; } }}} if (is) {if ( schema=='http:' ) return '" + d + "'; else return '" + c + "';} " + h + "return 'DIRECT';}"
                        }
                    };
                    try {
                        chrome.proxy.settings.set({
                            value: s,
                            scope: "regular"
                        }, e)
                    } catch (t) {
                        e()
                    }
                }
            } else postclearproxy = e;
            try {
                chrome.proxy.settings.clear({
                    scope: "regular"
                }, postclearproxy)
            } catch (e) {
                postclearproxy()
            }
            return !0
        }
    }
    "function" == typeof e && e()
}

function rget() {
    Req("https://fri-gate.org/data.json", 3e4, function(e, t) {
        if (e) {
            0 < (t = /ETag:\s+\"(.+)\"/gi.exec(t)).length && t[1] && ls.set("rgetEtag", t[1], !1);
            try {
                var r = JSON.decode(e)
            } catch (e) {}
            r && "object" == typeof r.data && (ls.set("trec", r.data, uid), tRecPrepead(trec = r.data))
        }
    }, function(e) {}, function(e) {}, "GET", null, {
        "If-None-Match": rgetEtag
    })
}

function getSitesUrl(e, t) {
    openPr || chrome.browserAction.setTitle({
        title: "wait"
    });
    var r = Date.now();
    if (timeClSerial < r && (serial = 0, timeClSerial = r + timewaitClSerial), e = getapiurl(apioffset), 1 > apicount) {
        if (!(1e4 > r - apistarttime)) {
            if (3 < apiloadattempts) return void proxyoff();
            genapi()
        }
        setTimeout(function() {
            getSitesUrl(e, t)
        }, 3e3)
    } else d("urlGet", e), getUrl3(e, "post", {}, "new=1&k=" + uid + "&t=" + timeOutAuth + "&s=" + serial + "&ip=" + ip + "&po=" + proxyOffset + "&pu=" + proxyUpdate + first_api, function(e) {
        d("apiErr", e), reGet(t)
    }, function(r) {
        if (r)
            if (apiloadattempts = 0, 2 != proxyUpdate && getUrl3(e + "r", "post", {}, "k=" + uid + "&s=" + serialRep, function(e) {
                    d("apiErr", e)
                }, function(e) {
                    if ("" != e && "-" != r) {
                        try {
                            var t = JSON.decode(Utf8.decode(XXTEA.decrypt(Base64.decode(e), uid)))
                        } catch (e) {}
                        r = null, void 0 != t && "object" == typeof t && t.hasOwnProperty("d") && "object" == typeof t.d && (t.hasOwnProperty("h") && t.h && (serialRep = t.h, ls.set("serialRep", serialRep, !1)), ls.set("dataRep", t.d, uid), dataRep = parseRepText(t.d))
                    }
                }), "noUpdate" != r) {
                d("len", r.length);
                var o = md5(r),
                    s = !1,
                    n = !1,
                    a = !1;
                if (o != md5api) {
                    try {
                        var i = JSON.decode(XXTEA.decrypt(Base64.decode(r), uid))
                    } catch (e) {}
                    if (r = null, 7 == Object.keys(i).length && d("j", i), void 0 != i && "object" == typeof i) {
                        if (md5api = o, first_api = "", i.serial && (serial = i.serial), i.r && 0 < Object.getLength(i.r)) {
                            isRep = !0;
                            var p = {};
                            Array.each(i.r, function(e, t) {
                                p[e.f] = e.t, proxyHostsCl.include("*://" + e.f + "/*")
                            }), rep = p, ls.set("redir", rep, uid)
                        }
                        if (i.ip && (ip = i.ip, d2("you IP: " + i.ip)), i.prauth && (prauth = i.prauth, ls.set("prauth", prauth, !1)), i.prauth2 && (prauth2 = i.prauth2, ls.set("prauth2", prauth2, !1)), i.prauth3 && (prauth3 = i.prauth3, ls.set("prauth3", prauth3, !1)), i.prauth4 && (prauth4 = i.prauth4, ls.set("prauth4", prauth4, !1)), i.pr && (proxyUpdate = 0, prDef = i.pr, !(o = ls.get("pr2")) || 1 > o.length ? prDef != pr && (prDefCo = i.prco, pr = prDef, prco = prDefCo, prip = getprip(pr), i.pr2 && (pr2 = "pr" == i.pr2 ? i.pr : i.pr2), n = !0) : d2("use own proxy")), void 0 !== i.po && (proxyOffset = i.po), i.blHosts && 0 < i.blHosts.length && (blHosts = i.blHosts), i.azapret && "object" == typeof i.azapret && 0 < i.azapret.length && (azapret = i.azapret, n = !0, d2("loading antizapret: " + azapret.length + " hosts")), i.proxyHosts && (lastLoadHosts = i.proxyHosts, d2("loading from web: " + i.proxyHosts.length + " hosts"), s = savenewhosts(i.proxyHosts, i.delhost)), 0 != i.err && "0" != i.err || (openPr = !0), onOffLimit(), i.news && (news = i.news, ls.set("news", i.news)), i.t && (timeOutAuth = i.t), i.ver) {
                            o = detailsApp.version.split(/\./g), i = i.ver.split(/\./g);
                            for (var c = 0, u = o.length; c < u; c++)
                                if (o[c].toInt() < i[c].toInt()) {
                                    a = !0;
                                    break
                                }
                            a ? (updateText = l("messUpdate"), ls.set("updateText", !0)) : (updateText = "", ls.set("updateText", !1))
                        }
                        s || n ? (s && ison && (setOrUpdateHandlers(), setOrUpdateTabHandlers()), setProxy(t)) : "function" == typeof t && t()
                    } else reGet(t), d2("error load 1")
                } else onOffLimit()
            } else md5api = "", d("noUpd", ""), onOffLimit();
        else reGet(t), d2("error load 2")
    })
}! function(e, t) {
    var r, o, s, n = [],
        a = t.createElement("div"),
        i = function() {
            clearTimeout(s), r || (Browser.loaded = r = !0, t.removeListener("DOMContentLoaded", i).removeListener("readystatechange", l), t.fireEvent("domready"), e.fireEvent("domready")), t = e = a = null
        },
        l = function() {
            for (var e = n.length; e--;)
                if (n[e]()) return i(), !0;
            return !1
        },
        p = function() {
            clearTimeout(s), l() || (s = setTimeout(p, 10))
        };
    t.addListener("DOMContentLoaded", i);
    var d = function() {
        try {
            return a.doScroll(), !0
        } catch (e) {}
        return !1
    };
    if (a.doScroll && !d()) {
        n.push(d);
        var c = !0
    }
    t.readyState && n.push(function() {
        var e = t.readyState;
        return "loaded" == e || "complete" == e
    }), "onreadystatechange" in t ? t.addListener("readystatechange", l) : c = !0, c && p(), Element.Events.domready = {
        onAdd: function(e) {
            r && e.call(this)
        }
    }, Element.Events.load = {
        base: "load",
        onAdd: function(t) {
            o && this == e && t.call(this)
        },
        condition: function() {
            return this == e && (i(), delete Element.Events.load), !0
        }
    }, e.addEvent("load", function() {
        o = !0
    })
}(window, document), chrome.proxy.settings.get({
    incognito: !1
}, function(e) {
    e && void 0 !== e.levelOfControl && "controllable_by_this_extension" != e.levelOfControl && "controlled_by_this_extension" != e.levelOfControl && (ison = !1, errIcon()), ison && 0 < proxyHostsCl.length ? (isProxyHosts || isRep ? setOrUpdateHandlers() : offHandlersAll(), tabUpdateAll(), setOrUpdateTabHandlers(0)) : (offHandlersAll(), tabUpdateAll(), disIcon()), window.addEvent("domready", function(e) {
        chrome[runtimeOrExtension].onMessage.addListener(getMessage), chrome['tabs'].onRemoved.addListener(function() {
            chrome['tabs'].query({}, function(e) {
                if (!e.length && iscl) {
                    var t = function() {
                        iscl || (iscl = !0, proxyon(), chrome['tabs'].onCreated.hasListener(t) && chrome['tabs'].onCreated.removeListener(t))
                    };
                    iscl = !1, proxyoff(!0), chrome['tabs'].onCreated.hasListener(t) || chrome['tabs'].onCreated.addListener(t)
                }
            })
        }), ison ? setTimeout(function() {
            proxyon(!0)
        }, 300) : first && (first_api = "&first_api", getSitesUrl()), chrome.browserAction.onClicked.addListener(function() {
            onoff()
        }), setTimeout(function() {
            rget()
        }, 5e3)
    })
});