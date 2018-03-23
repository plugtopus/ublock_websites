/*
 Mediator.js Library v0.9.7
 https://github.com/ajacksified/Mediator.js

 Copyright 2013, Jack Lawson
 MIT Licensed (http://www.opensource.org/licenses/mit-license.php)

 For more information: http://thejacklawson.com/2011/06/mediators-for-modularized-asynchronous-programming-in-javascript/index.html
 Project on GitHub: https://github.com/ajacksified/Mediator.js

 Last update: October 19 2013
*/
(function() {
    (function(f) {
        function e(g) {
            if (b[g]) return b[g].exports;
            var m = b[g] = {
                exports: {},
                id: g,
                loaded: !1
            };
            f[g].call(m.exports, m, m.exports, e);
            m.loaded = !0;
            return m.exports
        }

        var b = {};
        e.m = f;
        e.c = b;
        e.p = "";
        return e(0)
    })([function(f, e, b) {
        b(27)
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , function(f, e, b) {
        function m(c) {
            var k =
                a.getMessageFromEvent(c);
            if (k && l && l.settings) {
                if (l.settings.clid) {
                    if (l.settings.clid != k.clid) return
                } else if (l.settings.affId != k.affId) return;
                if (k.command) n[k.command](k, c.origin)
            }
        }

        var h = b(28),
            d = b(30),
            c = b(32),
            a = b(33),
            k = b(34);
        window && window.document && (window.self === window.top || f.test(window.location.href)) && (window.opera ? "complete" ===
        window.document.readyState || "interactive" === window.document.readyState ? g() : window.document.addEventListener("DOMContentLoaded", g, !1) : g())
    }, function(f, e, b) {
        e = b(29);
        f.exports = e
    }, function(f, e) {
        f.exports = {
            sendMessage: function(b, g) {
                g = g || function() {};
                chrome.runtime.sendMessage(b, function() {
                    var b = arguments;
                    setTimeout(function() {
                        g.apply(this, b)
                    }, 0)
                });
                return this
            },
            onMessage: function(b) {
                chrome.runtime.onMessage.addListener(function(g, f, h) {
                    return b(g, h)
                })
            }
        }
    }, function(f, e, b) {
        e = b(31);
        f.exports = e
    }, function(f, e) {
        f.exports =
            function(b, g, f) {
                var h = b.createElement("script"),
                    d = [];
                d.push("mbr=true");
                d.push("settings=" + encodeURIComponent(JSON.stringify(f)));
                d = d.join("&");
                h.setAttribute("src", g + ("?" + d));
                h.setAttribute("type", "text/javascript");
                h.setAttribute("charset", "UTF-8");
                b.body.appendChild(h)
            }
    }, function(f, e) {
        f.exports = {
            getMessageFromEvent: function(b) {
                if (!b.data) return null;
                b = b.data;
                if ("string" ===
                    typeof b) try {
                    b = JSON.parse(b)
                } catch (g) {
                    return null
                }
                return b && "MBR_ENVIRONMENT" === b.type && !b.hasOwnProperty("response") && (b.clid || b.affId) ? b : null
            }
        }
    }, function(f, e, b) {
        function g(a) {
            a = a.data;
            if ("string" === typeof a) try {
                a = JSON.parse(a)
            } catch (k) {
                a = null
            }
            return a
        }

        function m() {
            clearTimeout(d);
            MessageEvent.prototype.stopImmediatePropagation = function() {
                var a = g(this);
                a && "MBR_ENVIRONMENT" === a.type ? (a = g(this)) && "getDomainData" === a.command && h.trigger("post-message-error", !0) : c.call(this)
            };
            d = setTimeout(function() {
                MessageEvent.prototype.stopImmediatePropagation =
                    c
            }, 1500)
        }

        var h = b(35),
            d = void 0,
            c = MessageEvent.prototype.stopImmediatePropagation;
        f.exports = {
            on: function(a) {
                var c = 1 >= arguments.length || void 0 === arguments[1] ? !1 : arguments[1];
                if (window.svtPostMessage && !c) window.svtPostMessage.on(a);
                else window.addEventListener ? window.addEventListener("message", a) : window.attachEvent("onmessage", a)
            },
            trigger: function(a, c) {
                var b = 2 >= arguments.length || void 0 === arguments[2] ? !1 : arguments[2];
                window.svtPostMessage && !b ? window.svtPostMessage.trigger(a) : window.wrappedJSObject && window.wrappedJSObject.postMessage ?
                    window.wrappedJSObject.postMessage(a, c) : (m(), window.postMessage(a, c))
            }
        }
    }, function(f, e, b) {
        e = b(36).Mediator;
        f.exports = new e
    }, function(f, e, b) {
        (function(b, f) {
            e.Mediator = f()
        })(this, function() {
            function b() {
                var c = function() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                };
                return c() + c() + "-" + c() + "-" + c() + "-" + c() + "-" + c() + c() + c()
            }

            function f(c, a, k) {
                if (!(this instanceof f)) return new f(c, a, k);
                this.id = b();
                this.fn = c;
                this.options = a;
                this.context = k;
                this.channel = null
            }

            function e(c, a) {
                if (!(this instanceof e)) return new e(c);
                this.namespace = c || "";
                this._subscribers = [];
                this._channels = [];
                this._parent = a;
                this.stopped = !1
            }

            function d() {
                if (!(this instanceof d)) return new d;
                this._channels = new e("")
            }

            f.prototype = {
                update: function(c) {
                    c && (this.fn = c.fn || this.fn, this.context = c.context || this.context, this.options = c.options || this.options, this.channel && this.options && void 0 !== this.options.priority && this.channel.setPriority(this.id, this.options.priority))
                }
            };
            e.prototype = {
                addSubscriber: function(c, a, b) {
                    c = new f(c, a, b);
                    a && void 0 !==
                    a.priority ? (a.priority >>= 0, 0 > a.priority && (a.priority = 0), a.priority >= this._subscribers.length && (a.priority = this._subscribers.length - 1), this._subscribers.splice(a.priority, 0, c)) : this._subscribers.push(c);
                    c.channel = this;
                    return c
                },
                stopPropagation: function() {
                    this.stopped = !0
                },
                getSubscriber: function(c) {
                    var a = 0,
                        b = this._subscribers.length;
                    a;
                    for (b; a < b; a++)
                        if (this._subscribers[a].id === c || this._subscribers[a].fn === c) return this._subscribers[a]
                },
                setPriority: function(c, a) {
                    var b = 0,
                        f;
                    var e = 0;
                    for (f = this._subscribers.length; e <
                    f && this._subscribers[e].id !== c && this._subscribers[e].fn !== c; e++) b++;
                    c = this._subscribers[b];
                    e = this._subscribers.slice(0, b);
                    b = this._subscribers.slice(b + 1);
                    this._subscribers = e.concat(b);
                    this._subscribers.splice(a, 0, c)
                },
                addChannel: function(c) {
                    this._channels[c] = new e((this.namespace ? this.namespace + ":" : "") + c, this)
                },
                hasChannel: function(c) {
                    return this._channels.hasOwnProperty(c)
                },
                returnChannel: function(c) {
                    return this._channels[c]
                },
                removeSubscriber: function(c) {
                    var a = this._subscribers.length - 1;
                    if (c)
                        for (a; 0 <=
                        a; a--) {
                            if (this._subscribers[a].fn === c || this._subscribers[a].id === c) this._subscribers[a].channel = null, this._subscribers.splice(a, 1)
                        } else this._subscribers = []
                },
                publish: function(c) {
                    var a = 0,
                        b = this._subscribers.length,
                        f;
                    a;
                    for (b; a < b; a++) {
                        var e = !1;
                        if (!this.stopped) {
                            var d = this._subscribers[a];
                            void 0 !== d.options && "function" === typeof d.options.predicate ? d.options.predicate.apply(d.context, c) && (d.fn.apply(d.context, c), e = !0) : (e = this._subscribers.length, d.fn.apply(d.context, c), b = f = this._subscribers.length, f ===
                            e - 1 && a--, e = !0)
                        }
                        e && d.options && void 0 !== d.options && (d.options.calls--, 1 > d.options.calls && (this.removeSubscriber(d.id), b--, a--))
                    }
                    this._parent && this._parent.publish(c);
                    this.stopped = !1
                }
            };
            d.prototype = {
                getChannel: function(c) {
                    var a = this._channels,
                        b = c.split(":"),
                        d = 0,
                        e = b.length;
                    if ("" === c) return a;
                    if (0 < b.length)
                        for (d, e; d < e; d++) a.hasChannel(b[d]) || a.addChannel(b[d]), a = a.returnChannel(b[d]);
                    return a
                },
                subscribe: function(c, a, b, d) {
                    c = this.getChannel(c);
                    b = b || {};
                    d = d || {};
                    return c.addSubscriber(a, b, d)
                },
                once: function(c,
                               a, b, d) {
                    b = b || {};
                    b.calls = 1;
                    return this.subscribe(c, a, b, d)
                },
                getSubscriber: function(b, a) {
                    return this.getChannel(a || "").getSubscriber(b)
                },
                remove: function(b, a) {
                    this.getChannel(b).removeSubscriber(a)
                },
                publish: function(b) {
                    var a = Array.prototype.slice.call(arguments, 1),
                        c = this.getChannel(b);
                    a.push(c);
                    this.getChannel(b).publish(a)
                }
            };
            d.prototype.on = d.prototype.subscribe;
            d.prototype.bind = d.prototype.subscribe;
            d.prototype.emit = d.prototype.publish;
            d.prototype.trigger = d.prototype.publish;
            d.prototype.off = d.prototype.remove;
            d.Channel = e;
            d.Subscriber = f;
            d.version = "0.9.7";
            return d
        })
    }])
})();