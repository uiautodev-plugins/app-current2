"use strict";
(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var a;
  var s;
  var h;
  var p;
  var v;
  var y;
  var d = {};
  var w = [];
  var _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var g = Array.isArray;
  function m(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function b(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k(l3, u4, t3) {
    var i3, r3, o3, e3 = {};
    for (o3 in u4) "key" == o3 ? i3 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return x(l3, e3, i3, r3, null);
  }
  function x(n2, t3, i3, r3, o3) {
    var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function S(n2) {
    return n2.children;
  }
  function C(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function $(n2, l3) {
    if (null == l3) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u4 = n2.__v, t3 = u4.__e, i3 = [], r3 = [], o3 = m({}, u4);
      o3.__v = u4.__v + 1, l.vnode && l.vnode(o3), q(n2.__P, o3, u4, n2.__n, n2.__P.namespaceURI, 32 & u4.__u ? [t3] : null, i3, null == t3 ? $(u4) : t3, !!(32 & u4.__u), r3), o3.__v = u4.__v, o3.__.__k[o3.__i] = o3, D(i3, o3, r3), u4.__e = u4.__ = null, o3.__e != t3 && P(o3);
    }
  }
  function P(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
      if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
    }), P(n2);
  }
  function A(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
  }
  function H() {
    try {
      for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, I(n2);
    } finally {
      i.length = H.__r = 0;
    }
  }
  function L(n2, l3, u4, t3, i3, r3, o3, e3, f4, c3, a3) {
    var s3, h3, p3, v3, y3, _2, g2, m3 = t3 && t3.__k || w, b2 = l3.length;
    for (f4 = T(u4, l3, m3, f4, b2), s3 = 0; s3 < b2; s3++) null != (p3 = u4.__k[s3]) && (h3 = -1 != p3.__i && m3[p3.__i] || d, p3.__i = s3, _2 = q(n2, p3, h3, i3, r3, o3, e3, f4, c3, a3), v3 = p3.__e, p3.ref && h3.ref != p3.ref && (h3.ref && J(h3.ref, null, p3), a3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), (g2 = !!(4 & p3.__u)) || h3.__k === p3.__k ? (f4 = j(p3, f4, n2, g2), g2 && h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _2 ? f4 = _2 : v3 && (f4 = v3.nextSibling), p3.__u &= -7);
    return u4.__e = y3, f4;
  }
  function T(n2, l3, u4, t3, i3) {
    var r3, o3, e3, f4, c3, a3 = u4.length, s3 = a3, h3 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = x(null, o3, null, null, null) : g(o3) ? o3 = n2.__k[r3] = x(S, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = x(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f4 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = O(o3, u4, f4, s3)) && (s3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i3 > a3 ? h3-- : i3 < a3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (s3) for (r3 = 0; r3 < a3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = $(e3)), K(e3, e3));
    return t3;
  }
  function j(n2, l3, u4, t3) {
    var i3, r3;
    if ("function" == typeof n2.type) {
      for (i3 = n2.__k, r3 = 0; i3 && r3 < i3.length; r3++) i3[r3] && (i3[r3].__ = n2, l3 = j(i3[r3], l3, u4, t3));
      return l3;
    }
    n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = $(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function F(n2, l3) {
    return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (g(n2) ? n2.some(function(n3) {
      F(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function O(n2, l3, u4, t3) {
    var i3, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], a3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e3 || a3 && e3 == c3.key && f4 == c3.type) return u4;
    if (t3 > (a3 ? 1 : 0)) {
      for (i3 = u4 - 1, r3 = u4 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
    }
    return -1;
  }
  function z(n2, l3, u4) {
    "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || _.test(l3) ? u4 : u4 + "px";
  }
  function N(n2, l3, u4, t3, i3) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || z(n2.style, l3, "");
      if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || z(n2.style, l3, u4[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(s, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4[a] = t3[a] : (u4[a] = h, n2.addEventListener(l3, r3 ? v : p, r3)) : n2.removeEventListener(l3, r3 ? v : p, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
    }
  }
  function V(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4[c]) u4[c] = h++;
        else if (u4[c] < t3[a]) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function q(n2, u4, t3, i3, r3, o3, e3, f4, c3, a3) {
    var s3, h3, p3, v3, y3, d3, _2, k3, x3, M, $2, I2, P2, A3, H2, T3 = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (s3 = l.__b) && s3(u4);
    n: if ("function" == typeof T3) try {
      if (k3 = u4.props, x3 = T3.prototype && T3.prototype.render, M = (s3 = T3.contextType) && i3[s3.__c], $2 = s3 ? M ? M.props.value : s3.__ : i3, t3.__c ? _2 = (h3 = u4.__c = t3.__c).__ = h3.__E : (x3 ? u4.__c = h3 = new T3(k3, $2) : (u4.__c = h3 = new C(k3, $2), h3.constructor = T3, h3.render = Q), M && M.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), x3 && null == h3.__s && (h3.__s = h3.state), x3 && null != T3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = m({}, h3.__s)), m(h3.__s, T3.getDerivedStateFromProps(k3, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) x3 && null == T3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), x3 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (x3 && null == T3.getDerivedStateFromProps && k3 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(k3, $2), u4.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(k3, h3.__s, $2)) {
          u4.__v != t3.__v && (h3.props = k3, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
            n3 && (n3.__ = u4);
          }), w.push.apply(h3.__h, h3._sb), h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(k3, h3.__s, $2), x3 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, d3);
        });
      }
      if (h3.context = $2, h3.props = k3, h3.__P = n2, h3.__e = false, I2 = l.__r, P2 = 0, x3) h3.state = h3.__s, h3.__d = false, I2 && I2(u4), s3 = h3.render(h3.props, h3.state, h3.context), w.push.apply(h3.__h, h3._sb), h3._sb = [];
      else do {
        h3.__d = false, I2 && I2(u4), s3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++P2 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i3 = m(m({}, i3), h3.getChildContext())), x3 && !p3 && null != h3.getSnapshotBeforeUpdate && (d3 = h3.getSnapshotBeforeUpdate(v3, y3)), A3 = null != s3 && s3.type === S && null == s3.key ? E(s3.props.children) : s3, f4 = L(n2, g(A3) ? A3 : [A3], u4, t3, i3, r3, o3, e3, f4, c3, a3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), _2 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u4.__v = null, c3 || null != o3) if (n3.then) {
        for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        o3[o3.indexOf(f4)] = null, u4.__e = f4;
      } else {
        for (H2 = o3.length; H2--; ) b(o3[H2]);
        B(u4);
      }
      else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || B(u4);
      l.__e(n3, u4, t3);
    }
    else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = G(t3.__e, u4, t3, i3, r3, o3, e3, c3, a3);
    return (s3 = l.diffed) && s3(u4), 128 & u4.__u ? void 0 : f4;
  }
  function B(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B));
  }
  function D(n2, u4, t3) {
    for (var i3 = 0; i3 < t3.length; i3++) J(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function E(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : void 0 !== n2.constructor ? null : m({}, n2);
  }
  function G(u4, t3, i3, r3, o3, e3, f4, c3, a3) {
    var s3, h3, p3, v3, y3, w3, _2, m3 = i3.props || d, k3 = t3.props, x3 = t3.type;
    if ("svg" == x3 ? o3 = "http://www.w3.org/2000/svg" : "math" == x3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (s3 = 0; s3 < e3.length; s3++) if ((y3 = e3[s3]) && "setAttribute" in y3 == !!x3 && (x3 ? y3.localName == x3 : 3 == y3.nodeType)) {
        u4 = y3, e3[s3] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x3) return document.createTextNode(k3);
      u4 = document.createElementNS(o3, x3, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x3) m3 === k3 || c3 && u4.data == k3 || (u4.data = k3);
    else {
      if (e3 = "textarea" == x3 && null != k3.defaultValue ? null : e3 && n.call(u4.childNodes), !c3 && null != e3) for (m3 = {}, s3 = 0; s3 < u4.attributes.length; s3++) m3[(y3 = u4.attributes[s3]).name] = y3.value;
      for (s3 in m3) y3 = m3[s3], "dangerouslySetInnerHTML" == s3 ? p3 = y3 : "children" == s3 || s3 in k3 || "value" == s3 && "defaultValue" in k3 || "checked" == s3 && "defaultChecked" in k3 || N(u4, s3, null, y3, o3);
      for (s3 in k3) y3 = k3[s3], "children" == s3 ? v3 = y3 : "dangerouslySetInnerHTML" == s3 ? h3 = y3 : "value" == s3 ? w3 = y3 : "checked" == s3 ? _2 = y3 : c3 && "function" != typeof y3 || m3[s3] === y3 || N(u4, s3, y3, m3[s3], o3);
      if (h3) c3 || p3 && (h3.__html == p3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
      else if (p3 && (u4.innerHTML = ""), L("template" == t3.type ? u4.content : u4, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i3.__k && $(i3, 0), c3, a3), null != e3) for (s3 = e3.length; s3--; ) b(e3[s3]);
      c3 && "textarea" != x3 || (s3 = "value", "progress" == x3 && null == w3 ? u4.removeAttribute("value") : null != w3 && (w3 !== u4[s3] || "progress" == x3 && !w3 || "option" == x3 && w3 != m3[s3]) && N(u4, s3, w3, m3[s3], o3), s3 = "checked", null != _2 && _2 != u4[s3] && N(u4, s3, _2, m3[s3], o3));
    }
    return u4;
  }
  function J(n2, u4, t3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u4 || (n2.__u = n2(u4));
      } else n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function K(n2, u4, t3) {
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || J(i3, null, u4)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && K(i3[r3], u4, t3 || "function" != typeof n2.type);
    t3 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  function R(u4, t3, i3) {
    var r3, o3, e3, f4;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f4 = [], q(t3, u4 = (!r3 && i3 || t3).__k = k(S, null, [u4]), o3 || d, d, t3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r3, f4), D(e3, u4, f4);
  }
  function X(n2) {
    function l3(n3) {
      var u4, t3;
      return this.getChildContext || (u4 = /* @__PURE__ */ new Set(), (t3 = {})[l3.__c] = this, this.getChildContext = function() {
        return t3;
      }, this.componentWillUnmount = function() {
        u4 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u4.forEach(function(n5) {
          n5.__e = true, A(n5);
        });
      }, this.sub = function(n4) {
        u4.add(n4);
        var l4 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u4 && u4.delete(n4), l4 && l4.call(n4);
        };
      }), n3.children;
    }
    return l3.__c = "__cC" + y++, l3.__ = n2, l3.Provider = l3.__l = (l3.Consumer = function(n3, l4) {
      return n3.children(l4);
    }).contextType = l3, l3;
  }
  n = w.slice, l = { __e: function(n2, l3, u4, t3) {
    for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, C.prototype.setState = function(n2, l3) {
    var u4;
    u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n2 && (n2 = n2(m({}, u4), this.props)), n2 && m(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), A(this));
  }, C.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A(this));
  }, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, a = "__a" + f, s = /(PointerCapture)$|Capture$/i, h = 0, p = V(false), v = V(true), y = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = l;
  var e2 = c2.__b;
  var a2 = c2.__r;
  var v2 = c2.diffed;
  var l2 = c2.__c;
  var m2 = c2.unmount;
  var s2 = c2.__;
  function p2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u4, i3) {
    var o3 = p2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u4) : D2(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f4 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u5 = o3.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u5.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i4 = o3.__c.props !== n3;
        return u5.some(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), c3 && c3.call(this, n3, t3, r3) || i4;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u5 = c3;
          c3 = void 0, f4(n3, t3, r3), c3 = u5;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f4;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u4) {
    var i3 = p2(t2++, 3);
    !c2.__s && C2(i3.__H, u4) && (i3.__ = n2, i3.u = u4, r2.__H.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u4 = p2(t2++, 7);
    return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
  }
  function q2(n2, t3) {
    return o2 = 8, T2(function() {
      return n2;
    }, t3);
  }
  function x2(n2) {
    var u4 = r2.context[n2.__c], i3 = p2(t2++, 9);
    return i3.c = n2, u4 ? (null == i3.__ && (i3.__ = true, u4.sub(r2)), u4.props.value) : n2.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) {
      var t3 = n2.__H;
      if (n2.__P && t3) try {
        t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], c2.__e(r3, n2.__v);
      }
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.some(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r3, 35);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // node_modules/lucide-preact/dist/esm/shared/src/utils/mergeClasses.mjs
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  // node_modules/lucide-preact/dist/esm/shared/src/utils/toKebabCase.mjs
  var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  // node_modules/lucide-preact/dist/esm/shared/src/utils/toLucideIconData.mjs
  function toLucideIconData(iconName, iconNode, aliases = []) {
    if (iconNode == null) {
      throw new Error("[lucide]: iconNode is required when icon name is used");
    }
    return {
      name: toKebabCase(iconName),
      size: 24,
      node: iconNode,
      ...aliases.length > 0 ? { aliases } : {}
    };
  }

  // node_modules/lucide-preact/dist/esm/shared/src/utils/toCamelCase.mjs
  var toCamelCase = (string) => {
    let out = "";
    let upperNext = false;
    for (const ch of string) {
      if (ch === "-" || ch === "_" || ch <= " ") {
        upperNext = out.length > 0;
        continue;
      }
      if (out.length === 0) {
        out += ch.toLowerCase();
      } else {
        out += upperNext ? ch.toUpperCase() : ch;
      }
      upperNext = false;
    }
    return out;
  };

  // node_modules/lucide-preact/dist/esm/shared/src/utils/toPascalCase.mjs
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };

  // node_modules/lucide-preact/dist/esm/shared/src/build/defaultAttributes.mjs
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  // node_modules/lucide-preact/dist/esm/shared/src/build/buildLucideIconNode.mjs
  function isDefined(value) {
    return value !== null && value !== void 0;
  }
  function buildLucideIconNode(icon, params = {}) {
    const attributeNames = params.attributeNames ?? {};
    const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
    const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
    const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
    const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
    const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
    const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
    const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
    const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
    const attributes = {
      ...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
        attrs[getAttributeName(attrName)] = value;
        return attrs;
      }, {}),
      ..."color" in params && params.color && {
        [getAttributeName("stroke")]: params.color
      },
      ..."size" in params && isDefined(params.size) && {
        [getAttributeName("width")]: params.size,
        [getAttributeName("height")]: params.size
      },
      ..."width" in params && isDefined(params.width) && {
        [getAttributeName("width")]: params.width
      },
      ..."height" in params && isDefined(params.height) && {
        [getAttributeName("height")]: params.height
      },
      [getAttributeName("stroke-width")]: calculatedStrokeWidth,
      ...className && {
        [getAttributeName("class")]: className
      },
      [getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
      ...params.hasA11yProp === false ? {
        [getAttributeName("aria-hidden")]: "true"
      } : {},
      ..."attributes" in params && params.attributes
    };
    return [
      "svg",
      attributes,
      icon.node.map((child) => {
        const [name, attrs, children] = child;
        const nextAttrs = params.nonScalingStroke ? { [getAttributeName("vector-effect")]: "non-scaling-stroke", ...attrs } : attrs;
        return children ? [name, nextAttrs, children] : [name, nextAttrs];
      })
    ];
  }

  // node_modules/lucide-preact/dist/esm/shared/src/utils/hasA11yProp.mjs
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };

  // node_modules/lucide-preact/dist/esm/context.mjs
  var LucideContext = X({
    size: 24,
    color: "currentColor",
    strokeWidth: 2,
    absoluteStrokeWidth: false,
    nonScalingStroke: false,
    class: ""
  });
  var useLucideContext = () => x2(LucideContext);

  // node_modules/lucide-preact/dist/esm/Icon.mjs
  var Icon = ({
    color,
    size,
    width,
    height,
    strokeWidth,
    absoluteStrokeWidth,
    nonScalingStroke,
    children,
    iconNode = [],
    icon = {
      node: iconNode,
      aliases: [],
      size: 24
    },
    class: classes = "",
    ...rest
  }) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      nonScalingStroke: contextNonScalingStroke = false,
      color: contextColor = "currentColor",
      class: contextClass = ""
    } = useLucideContext() ?? {};
    const [name, svgAttributes, builtIconNode = []] = buildLucideIconNode(icon, {
      color: color ?? contextColor,
      width: width ?? size ?? contextSize,
      height: height ?? size ?? contextSize,
      strokeWidth: strokeWidth ?? contextStrokeWidth,
      absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
      nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
      className: mergeClasses(contextClass, classes),
      hasA11yProp: Boolean(children) || hasA11yProp(rest),
      attributes: rest
    });
    return k(name, { ...svgAttributes }, [
      ...builtIconNode.map(([tag, attrs]) => k(tag, attrs)),
      ...F(children)
    ]);
  };

  // node_modules/lucide-preact/dist/esm/createLucideIcon.mjs
  function createLucideIcon(iconDataOrName, iconNode, aliases = []) {
    const iconData6 = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
    const Component = ({ class: classes = "", className = "", children, ...props }) => k(
      Icon,
      {
        ...props,
        icon: iconData6,
        class: mergeClasses(classes, className)
      },
      children
    );
    if (iconData6.name) {
      Component.displayName = toPascalCase(iconData6.name);
    }
    return Component;
  }

  // node_modules/lucide-preact/dist/esm/icons/check.mjs
  var iconData = {
    name: "check",
    size: 24,
    node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
  };
  var Check = createLucideIcon(iconData);

  // node_modules/lucide-preact/dist/esm/icons/copy.mjs
  var iconData2 = {
    name: "copy",
    size: 24,
    node: [
      ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
      ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
    ]
  };
  var Copy = createLucideIcon(iconData2);

  // node_modules/lucide-preact/dist/esm/icons/refresh-cw.mjs
  var iconData3 = {
    name: "refresh-cw",
    size: 24,
    node: [
      ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
      ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
      ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
      ["path", { d: "M8 16H3v5", key: "1cv678" }]
    ]
  };
  var RefreshCw = createLucideIcon(iconData3);

  // node_modules/lucide-preact/dist/esm/icons/square.mjs
  var iconData4 = {
    name: "square",
    size: 24,
    node: [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]]
  };
  var Square = createLucideIcon(iconData4);

  // node_modules/lucide-preact/dist/esm/icons/trash.mjs
  var iconData5 = {
    name: "trash",
    size: 24,
    node: [
      ["path", { d: "M10 11v6", key: "nco0om" }],
      ["path", { d: "M14 11v6", key: "outv1u" }],
      ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
      ["path", { d: "M3 6h18", key: "d0wm0j" }],
      ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
    ],
    aliases: ["trash-2"]
  };
  var Trash = createLucideIcon(iconData5);

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f3 = 0;
  function u3(e3, t3, n2, o3, i3, u4) {
    t3 || (t3 = {});
    var a3, c3, p3 = t3;
    if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
    var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i3, __self: u4 };
    if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
    return l.vnode && l.vnode(l3), l3;
  }

  // app.tsx
  async function shell(cmd) {
    const result = await $u.shell(cmd);
    return result.output.trim();
  }
  var PKG_RE = /(?:mCurrentFocus|mFocusedApp)=.*?\bu\d+\s+([\w.]+)\//;
  async function getCurrentPackage() {
    const out = await shell('dumpsys window | grep -E "mCurrentFocus|mFocusedApp"');
    const m3 = out.match(PKG_RE);
    return m3 ? m3[1] : "";
  }
  async function listLauncherActivities(pkg) {
    const out = await shell(
      `cmd package query-activities --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER ${pkg}`
    );
    return out.split("\n").map((l3) => l3.trim()).filter((l3) => l3.includes("/") && !l3.includes("="));
  }
  async function getAppVersion(pkg) {
    const out = await shell(`dumpsys package ${pkg}`);
    const name = out.match(/versionName=([^\s]+)/);
    const code = out.match(/versionCode=(\d+)/);
    if (!name && !code) return null;
    return { name: name?.[1] ?? "", code: code?.[1] ?? "" };
  }
  async function doLaunch(component) {
    const r3 = await shell(`am start -n ${component}`);
    return r3 && r3.toLowerCase().includes("error") ? `\u542F\u52A8\u5931\u8D25: ${r3}` : `\u5DF2\u542F\u52A8 ${component}`;
  }
  async function stopApp(pkg) {
    await shell(`am force-stop ${pkg}`);
    return `\u5DF2\u5F3A\u5236\u505C\u6B62 ${pkg}`;
  }
  async function uninstallApp(pkg) {
    const out = await shell(`pm uninstall ${pkg}`);
    const msg = out || "(\u65E0\u8F93\u51FA)";
    return msg.toLowerCase().includes("success") || msg.includes("Success") ? `\u5378\u8F7D\u6210\u529F: ${pkg}` : `\u5378\u8F7D\u5931\u8D25: ${msg}`;
  }
  function Button({
    children,
    onClick,
    disabled,
    danger,
    ariaLabel
  }) {
    return /* @__PURE__ */ u3(
      "button",
      {
        class: `inline-flex cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-white disabled:pointer-events-none disabled:opacity-40 ${danger ? "bg-red-600 hover:bg-red-500" : "bg-slate-900 hover:bg-slate-700"}`,
        onClick,
        disabled,
        "aria-label": ariaLabel,
        children
      }
    );
  }
  function CopyButton({
    text,
    copied,
    onCopy
  }) {
    return /* @__PURE__ */ u3(
      "button",
      {
        "aria-label": "\u590D\u5236",
        class: "inline-flex shrink-0 cursor-pointer items-center rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600",
        onClick: (e3) => {
          e3.stopPropagation();
          onCopy(text);
        },
        children: copied ? /* @__PURE__ */ u3(Check, { class: "h-3.5 w-3.5 text-emerald-500" }) : /* @__PURE__ */ u3(Copy, { class: "h-3.5 w-3.5" })
      }
    );
  }
  function App() {
    const [pkg, setPkg] = d2("");
    const [version, setVersion] = d2(null);
    const [busy, setBusy] = d2(false);
    const [status, setStatus] = d2("");
    const [confirmUninstall, setConfirmUninstall] = d2(false);
    const [launchItems, setLaunchItems] = d2([]);
    const [autoRefresh, setAutoRefresh] = d2(true);
    const [copied, setCopied] = d2("");
    const pollingRef = A2(false);
    const loadAppInfo = q2(async (p3) => {
      const [items, ver] = await Promise.all([listLauncherActivities(p3), getAppVersion(p3)]);
      setLaunchItems(items);
      setVersion(ver);
    }, []);
    const pollOnce = q2(async () => {
      const p3 = await getCurrentPackage();
      setPkg(p3);
      if (p3) {
        await loadAppInfo(p3);
      } else {
        setLaunchItems([]);
        setVersion(null);
      }
      return p3;
    }, [loadAppInfo]);
    const refresh = q2(async () => {
      setBusy(true);
      setStatus("");
      try {
        const p3 = await pollOnce();
        if (!p3) setStatus("\u672A\u68C0\u6D4B\u5230\u524D\u53F0\u5E94\u7528");
      } catch (e3) {
        setStatus(`\u68C0\u6D4B\u5931\u8D25: ${e3 instanceof Error ? e3.message : String(e3)}`);
      } finally {
        setBusy(false);
      }
    }, [pollOnce]);
    y2(() => {
      if (!autoRefresh) return;
      let cancelled = false;
      let timer;
      const poll = async () => {
        if (pollingRef.current) return;
        pollingRef.current = true;
        try {
          const p3 = await getCurrentPackage();
          if (cancelled) return;
          setPkg(p3);
          if (p3) {
            const items = await listLauncherActivities(p3);
            const ver = await getAppVersion(p3);
            if (cancelled) return;
            setLaunchItems(items);
            setVersion(ver);
          } else {
            setLaunchItems([]);
            setVersion(null);
          }
        } catch {
        } finally {
          pollingRef.current = false;
        }
      };
      poll();
      timer = setInterval(poll, 3e3);
      return () => {
        cancelled = true;
        if (timer) clearInterval(timer);
      };
    }, [autoRefresh]);
    const run = q2(
      async (fn) => {
        if (!pkg) return;
        setBusy(true);
        setStatus("");
        try {
          setStatus(await fn(pkg));
        } catch (e3) {
          setStatus(`\u64CD\u4F5C\u5931\u8D25: ${e3 instanceof Error ? e3.message : String(e3)}`);
        } finally {
          setBusy(false);
          setConfirmUninstall(false);
        }
      },
      [pkg]
    );
    const launchItem = q2(async (component) => {
      setBusy(true);
      setStatus("");
      try {
        setStatus(await doLaunch(component));
      } catch (e3) {
        setStatus(`\u64CD\u4F5C\u5931\u8D25: ${e3 instanceof Error ? e3.message : String(e3)}`);
      } finally {
        setBusy(false);
      }
    }, []);
    const noPkg = !pkg;
    const copyText = q2(async (text) => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      }
      if (ok) {
        setCopied(text);
        window.setTimeout(() => setCopied(""), 1500);
      } else {
        setStatus("\u590D\u5236\u5931\u8D25");
      }
    }, []);
    const handleStop = q2(() => {
      setConfirmUninstall(false);
      setAutoRefresh(false);
    }, []);
    return /* @__PURE__ */ u3("div", { children: [
      /* @__PURE__ */ u3("div", { class: "flex items-center gap-1", children: [
        /* @__PURE__ */ u3("div", { class: "min-w-0 flex-1 break-all rounded-md bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800", children: pkg || "\u672A\u68C0\u6D4B\u5230\u524D\u53F0\u5E94\u7528" }),
        pkg && /* @__PURE__ */ u3(CopyButton, { text: pkg, copied: copied === pkg, onCopy: copyText })
      ] }),
      launchItems.length > 0 && /* @__PURE__ */ u3("div", { class: "mt-3", children: [
        /* @__PURE__ */ u3("div", { class: "mb-1 text-xs font-medium text-slate-500", children: [
          "\u542F\u52A8\u5165\u53E3",
          /* @__PURE__ */ u3("span", { class: "ml-1 font-normal text-slate-400", children: "\u70B9\u51FB\u5373\u53EF\u542F\u52A8" })
        ] }),
        /* @__PURE__ */ u3("ul", { class: "space-y-1", children: launchItems.map((component) => /* @__PURE__ */ u3("li", { children: /* @__PURE__ */ u3("div", { class: "flex items-center gap-1", children: [
          /* @__PURE__ */ u3(
            "button",
            {
              class: "min-w-0 flex-1 cursor-pointer rounded-md bg-slate-50 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-50",
              title: component,
              onClick: () => {
                handleStop();
                launchItem(component);
              },
              disabled: busy,
              children: /* @__PURE__ */ u3("span", { class: "break-all", children: component.slice(component.indexOf("/") + 1) })
            }
          ),
          /* @__PURE__ */ u3(CopyButton, { text: component, copied: copied === component, onCopy: copyText })
        ] }) }, component)) })
      ] }),
      version && /* @__PURE__ */ u3("div", { class: "mt-3", children: [
        /* @__PURE__ */ u3("div", { class: "mb-1 text-xs font-medium text-slate-500", children: "\u7248\u672C\u53F7" }),
        /* @__PURE__ */ u3("div", { class: "flex items-center gap-1", children: [
          /* @__PURE__ */ u3("div", { class: "min-w-0 flex-1 break-all rounded-md bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700", children: [
            version.name,
            " (",
            version.code,
            ")"
          ] }),
          /* @__PURE__ */ u3(
            CopyButton,
            {
              text: `${version.name} (${version.code})`,
              copied: copied === `${version.name} (${version.code})`,
              onCopy: copyText
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u3("div", { class: "mt-4 mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ u3("div", { class: "flex gap-2", children: [
          /* @__PURE__ */ u3(
            Button,
            {
              ariaLabel: "\u5378\u8F7D\u5E94\u7528",
              danger: true,
              onClick: () => {
                handleStop();
                setConfirmUninstall(true);
              },
              disabled: busy || noPkg,
              children: /* @__PURE__ */ u3(Trash, { class: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ u3(
            Button,
            {
              ariaLabel: "\u5F3A\u5236\u505C\u6B62\u5E94\u7528",
              onClick: () => {
                handleStop();
                run(stopApp);
              },
              disabled: busy || noPkg,
              children: /* @__PURE__ */ u3(Square, { class: "h-4 w-4 fill-current" })
            }
          )
        ] }),
        /* @__PURE__ */ u3(
          "button",
          {
            "aria-label": autoRefresh ? "\u505C\u6B62\u81EA\u52A8\u5237\u65B0" : "\u5F00\u542F\u81EA\u52A8\u5237\u65B0\u5E76\u5237\u65B0",
            class: `inline-flex cursor-pointer items-center rounded-md px-2 py-1.5 disabled:opacity-50 ${autoRefresh ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`,
            onClick: () => {
              if (autoRefresh) {
                setAutoRefresh(false);
              } else {
                setAutoRefresh(true);
                refresh();
              }
            },
            disabled: busy,
            children: /* @__PURE__ */ u3(
              RefreshCw,
              {
                class: `h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`,
                style: autoRefresh ? { animationDuration: "2s" } : void 0
              }
            )
          }
        )
      ] }),
      confirmUninstall && /* @__PURE__ */ u3("div", { class: "rounded-md border border-red-200 bg-red-50 p-2", children: [
        /* @__PURE__ */ u3("p", { class: "mb-2 text-xs text-red-700", children: [
          "\u786E\u8BA4\u5378\u8F7D ",
          /* @__PURE__ */ u3("span", { class: "font-mono font-semibold", children: pkg }),
          " \u5417\uFF1F"
        ] }),
        /* @__PURE__ */ u3("div", { class: "flex gap-2", children: [
          /* @__PURE__ */ u3(
            Button,
            {
              danger: true,
              onClick: () => {
                setAutoRefresh(false);
                run(uninstallApp);
              },
              disabled: busy,
              children: "\u786E\u8BA4\u5378\u8F7D"
            }
          ),
          /* @__PURE__ */ u3(Button, { onClick: () => setConfirmUninstall(false), disabled: busy, children: "\u53D6\u6D88" })
        ] })
      ] }),
      status && /* @__PURE__ */ u3("div", { class: "mt-3 break-all rounded-md bg-slate-100 p-2 text-xs text-slate-600", children: status })
    ] });
  }
  R(/* @__PURE__ */ u3(App, {}), document.getElementById("app"));
})();
/*! Bundled license information:

lucide-preact/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-preact/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-preact/dist/esm/shared/src/utils/toLucideIconData.mjs:
lucide-preact/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-preact/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-preact/dist/esm/shared/src/build/defaultAttributes.mjs:
lucide-preact/dist/esm/shared/src/build/buildLucideIconNode.mjs:
lucide-preact/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-preact/dist/esm/context.mjs:
lucide-preact/dist/esm/Icon.mjs:
lucide-preact/dist/esm/createLucideIcon.mjs:
lucide-preact/dist/esm/icons/check.mjs:
lucide-preact/dist/esm/icons/copy.mjs:
lucide-preact/dist/esm/icons/refresh-cw.mjs:
lucide-preact/dist/esm/icons/square.mjs:
lucide-preact/dist/esm/icons/trash.mjs:
lucide-preact/dist/esm/lucide-preact.mjs:
  (**
   * @license lucide-preact v1.43.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
