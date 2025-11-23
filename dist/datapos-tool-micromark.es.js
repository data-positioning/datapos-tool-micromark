const Yn = document.createElement("i");
function ut(n) {
  const e = "&" + n + ";";
  Yn.innerHTML = e;
  const t = Yn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && n !== "semi" || t === e ? !1 : t
  );
}
function Z(n, e, t, i) {
  const l = n.length;
  let u = 0, r;
  if (e < 0 ? e = -e > l ? 0 : l + e : e = e > l ? l : e, t = t > 0 ? t : 0, i.length < 1e4)
    r = Array.from(i), r.unshift(e, t), n.splice(...r);
  else
    for (t && n.splice(e, t); u < i.length; )
      r = i.slice(u, u + 1e4), r.unshift(e, 0), n.splice(...r), u += 1e4, e += 1e4;
}
function $(n, e) {
  return n.length > 0 ? (Z(n, n.length, 0, e), n) : e;
}
const Ln = {}.hasOwnProperty;
function lt(n) {
  const e = {};
  let t = -1;
  for (; ++t < n.length; )
    ne(e, n[t]);
  return e;
}
function ne(n, e) {
  let t;
  for (t in e) {
    const l = (Ln.call(n, t) ? n[t] : void 0) || (n[t] = {}), u = e[t];
    let r;
    if (u)
      for (r in u) {
        Ln.call(l, r) || (l[r] = []);
        const a = u[r];
        te(
          // @ts-expect-error Looks like a list.
          l[r],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function te(n, e) {
  let t = -1;
  const i = [];
  for (; ++t < e.length; )
    (e[t].add === "after" ? n : i).push(e[t]);
  Z(n, 0, 0, i);
}
function at(n) {
  const e = {};
  let t = -1;
  for (; ++t < n.length; )
    ee(e, n[t]);
  return e;
}
function ee(n, e) {
  let t;
  for (t in e) {
    const l = (Ln.call(n, t) ? n[t] : void 0) || (n[t] = {}), u = e[t];
    let r;
    if (u)
      for (r in u)
        l[r] = u[r];
  }
}
function ie(n, e) {
  const t = Number.parseInt(n, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
const re = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function ot(n) {
  return n.replace(/["&<>]/g, e);
  function e(t) {
    return "&" + re[
      /** @type {keyof typeof characterReferences} */
      t
    ] + ";";
  }
}
function tn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Q = sn(/[A-Za-z]/), U = sn(/[\dA-Za-z]/), ue = sn(/[#-'*+\--9=?A-Z^-~]/);
function In(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const _n = sn(/\d/), le = sn(/[\dA-Fa-f]/), ae = sn(/[!-/:-@[-`{-~]/);
function E(n) {
  return n !== null && n < -2;
}
function M(n) {
  return n !== null && (n < 0 || n === 32);
}
function T(n) {
  return n === -2 || n === -1 || n === 32;
}
const Bn = sn(/\p{P}|\p{S}/u), xn = sn(/\s/);
function sn(n) {
  return e;
  function e(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
function cn(n, e) {
  const t = ot(oe(n || ""));
  if (!e)
    return t;
  const i = t.indexOf(":"), l = t.indexOf("?"), u = t.indexOf("#"), r = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    i < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    r > -1 && i > r || l > -1 && i > l || u > -1 && i > u || // It is a protocol, it should be allowed.
    e.test(t.slice(0, i)) ? t : ""
  );
}
function oe(n) {
  const e = [];
  let t = -1, i = 0, l = 0;
  for (; ++t < n.length; ) {
    const u = n.charCodeAt(t);
    let r = "";
    if (u === 37 && U(n.charCodeAt(t + 1)) && U(n.charCodeAt(t + 2)))
      l = 2;
    else if (u < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(u)) || (r = String.fromCharCode(u));
    else if (u > 55295 && u < 57344) {
      const a = n.charCodeAt(t + 1);
      u < 56320 && a > 56319 && a < 57344 ? (r = String.fromCharCode(u, a), l = 1) : r = "�";
    } else
      r = String.fromCharCode(u);
    r && (e.push(n.slice(i, t), encodeURIComponent(r)), i = t + l + 1, r = ""), l && (t += l, l = 0);
  }
  return e.join("") + n.slice(i);
}
const Zn = {}.hasOwnProperty, Gn = /^(https?|ircs?|mailto|xmpp)$/i, se = /^https?$/i;
function he(n) {
  const e = n || {};
  let t = !0;
  const i = {}, l = [[]], u = [], r = [], h = (
    /** @type {NormalizedHtmlExtension} */
    at([{
      enter: {
        blockQuote: P,
        codeFenced: rn,
        codeFencedFenceInfo: A,
        codeFencedFenceMeta: A,
        codeIndented: un,
        codeText: Qt,
        content: Ot,
        definition: At,
        definitionDestinationString: Tt,
        definitionLabelString: A,
        definitionTitleString: A,
        emphasis: $t,
        htmlFlow: Wt,
        htmlText: Vn,
        image: X,
        label: A,
        link: fn,
        listItemMarker: I,
        listItemValue: k,
        listOrdered: R,
        listUnordered: H,
        paragraph: q,
        reference: A,
        resource: mn,
        resourceDestinationString: gn,
        resourceTitleString: A,
        setextHeading: Mt,
        strong: Ut
      },
      exit: {
        atxHeading: Nt,
        atxHeadingSequence: Bt,
        autolinkEmail: vt,
        autolinkProtocol: Kt,
        blockQuote: V,
        characterEscapeValue: bn,
        characterReferenceMarkerHexadecimal: Wn,
        characterReferenceMarkerNumeric: Wn,
        characterReferenceValue: Xt,
        codeFenced: m,
        codeFencedFence: J,
        codeFencedFenceInfo: f,
        codeFencedFenceMeta: L,
        codeFlowValue: Vt,
        codeIndented: m,
        codeText: Yt,
        codeTextData: bn,
        data: bn,
        definition: Pt,
        definitionDestinationString: Lt,
        definitionLabelString: Dt,
        definitionTitleString: _t,
        emphasis: Zt,
        hardBreakEscape: qn,
        hardBreakTrailing: qn,
        htmlFlow: jn,
        htmlFlowData: bn,
        htmlText: jn,
        htmlTextData: bn,
        image: Hn,
        label: kn,
        labelText: j,
        lineEnding: jt,
        link: Hn,
        listOrdered: F,
        listUnordered: B,
        paragraph: G,
        reference: L,
        referenceString: on,
        resource: L,
        resourceDestinationString: En,
        resourceTitleString: Et,
        setextHeading: qt,
        setextHeadingLineSequence: Ht,
        setextHeadingText: Rt,
        strong: Gt,
        thematicBreak: Jt
      }
    }, ...e.htmlExtensions || []])
  ), s = {
    definitions: i,
    tightStack: r
  }, g = {
    buffer: A,
    encode: b,
    getData: y,
    lineEndingIfNeeded: D,
    options: e,
    raw: w,
    resume: S,
    setData: x,
    tag: C
  };
  let o = e.defaultLineEnding;
  return p;
  function p(d) {
    let z = -1, W = 0;
    const K = [];
    let v = [], ln = [];
    for (; ++z < d.length; )
      !o && (d[z][1].type === "lineEnding" || d[z][1].type === "lineEndingBlank") && (o = /** @type {LineEnding} */
      d[z][2].sliceSerialize(d[z][1])), (d[z][1].type === "listOrdered" || d[z][1].type === "listUnordered") && (d[z][0] === "enter" ? K.push(z) : c(d.slice(K.pop(), z))), d[z][1].type === "definition" && (d[z][0] === "enter" ? (ln = $(ln, d.slice(W, z)), W = z) : (v = $(v, d.slice(W, z + 1)), W = z + 1));
    v = $(v, ln), v = $(v, d.slice(W)), z = -1;
    const nn = v;
    for (h.enter.null && h.enter.null.call(g); ++z < d.length; ) {
      const $n = h[nn[z][0]], Un = nn[z][1].type, Qn = $n[Un];
      Zn.call($n, Un) && Qn && Qn.call({
        sliceSerialize: nn[z][2].sliceSerialize,
        ...g
      }, nn[z][1]);
    }
    return h.exit.null && h.exit.null.call(g), l[0].join("");
  }
  function c(d) {
    const z = d.length;
    let W = 0, K = 0, v = !1, ln;
    for (; ++W < z; ) {
      const nn = d[W];
      if (nn[1]._container)
        ln = void 0, nn[0] === "enter" ? K++ : K--;
      else switch (nn[1].type) {
        case "listItemPrefix": {
          nn[0] === "exit" && (ln = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          nn[0] === "enter" && !K && (ln ? ln = void 0 : v = !0);
          break;
        }
        default:
          ln = void 0;
      }
    }
    d[0][1]._loose = v;
  }
  function x(d, z) {
    s[d] = z;
  }
  function y(d) {
    return s[d];
  }
  function A() {
    l.push([]);
  }
  function S() {
    return l.pop().join("");
  }
  function C(d) {
    t && (x("lastWasTag", !0), l[l.length - 1].push(d));
  }
  function w(d) {
    x("lastWasTag"), l[l.length - 1].push(d);
  }
  function O() {
    w(o || `
`);
  }
  function D() {
    const d = l[l.length - 1], z = d[d.length - 1], W = z ? z.charCodeAt(z.length - 1) : null;
    W === 10 || W === 13 || W === null || O();
  }
  function b(d) {
    return y("ignoreEncode") ? d : ot(d);
  }
  function L() {
    S();
  }
  function R(d) {
    r.push(!d._loose), D(), C("<ol"), x("expectFirstItem", !0);
  }
  function H(d) {
    r.push(!d._loose), D(), C("<ul"), x("expectFirstItem", !0);
  }
  function k(d) {
    if (y("expectFirstItem")) {
      const z = Number.parseInt(this.sliceSerialize(d), 10);
      z !== 1 && C(' start="' + b(String(z)) + '"');
    }
  }
  function I() {
    y("expectFirstItem") ? C(">") : N(), D(), C("<li>"), x("expectFirstItem"), x("lastWasTag");
  }
  function F() {
    N(), r.pop(), O(), C("</ol>");
  }
  function B() {
    N(), r.pop(), O(), C("</ul>");
  }
  function N() {
    y("lastWasTag") && !y("slurpAllLineEndings") && D(), C("</li>"), x("slurpAllLineEndings");
  }
  function P() {
    r.push(!1), D(), C("<blockquote>");
  }
  function V() {
    r.pop(), D(), C("</blockquote>"), x("slurpAllLineEndings");
  }
  function q() {
    r[r.length - 1] || (D(), C("<p>")), x("slurpAllLineEndings");
  }
  function G() {
    r[r.length - 1] ? x("slurpAllLineEndings", !0) : C("</p>");
  }
  function rn() {
    D(), C("<pre><code"), x("fencesCount", 0);
  }
  function f() {
    const d = S();
    C(' class="language-' + d + '"');
  }
  function J() {
    const d = y("fencesCount") || 0;
    d || (C(">"), x("slurpOneLineEnding", !0)), x("fencesCount", d + 1);
  }
  function un() {
    D(), C("<pre><code>");
  }
  function m() {
    const d = y("fencesCount");
    d !== void 0 && d < 2 && s.tightStack.length > 0 && !y("lastWasTag") && O(), y("flowCodeSeenData") && D(), C("</code></pre>"), d !== void 0 && d < 2 && D(), x("flowCodeSeenData"), x("fencesCount"), x("slurpOneLineEnding");
  }
  function X() {
    u.push({
      image: !0
    }), t = void 0;
  }
  function fn() {
    u.push({});
  }
  function j(d) {
    u[u.length - 1].labelId = this.sliceSerialize(d);
  }
  function kn() {
    u[u.length - 1].label = S();
  }
  function on(d) {
    u[u.length - 1].referenceId = this.sliceSerialize(d);
  }
  function mn() {
    A(), u[u.length - 1].destination = "";
  }
  function gn() {
    A(), x("ignoreEncode", !0);
  }
  function En() {
    u[u.length - 1].destination = S(), x("ignoreEncode");
  }
  function Et() {
    u[u.length - 1].title = S();
  }
  function Hn() {
    let d = u.length - 1;
    const z = u[d], W = z.referenceId || z.labelId, K = z.destination === void 0 ? i[tn(W)] : z;
    for (t = !0; d--; )
      if (u[d].image) {
        t = void 0;
        break;
      }
    z.image ? (C('<img src="' + cn(K.destination, e.allowDangerousProtocol ? void 0 : se) + '" alt="'), w(z.label), C('"')) : C('<a href="' + cn(K.destination, e.allowDangerousProtocol ? void 0 : Gn) + '"'), C(K.title ? ' title="' + K.title + '"' : ""), z.image ? C(" />") : (C(">"), w(z.label), C("</a>")), u.pop();
  }
  function At() {
    A(), u.push({});
  }
  function Dt(d) {
    S(), u[u.length - 1].labelId = this.sliceSerialize(d);
  }
  function Tt() {
    A(), x("ignoreEncode", !0);
  }
  function Lt() {
    u[u.length - 1].destination = S(), x("ignoreEncode");
  }
  function _t() {
    u[u.length - 1].title = S();
  }
  function Pt() {
    const d = u[u.length - 1], z = tn(d.labelId);
    S(), Zn.call(i, z) || (i[z] = u[u.length - 1]), u.pop();
  }
  function Ot() {
    x("slurpAllLineEndings", !0);
  }
  function Bt(d) {
    y("headingRank") || (x("headingRank", this.sliceSerialize(d).length), D(), C("<h" + y("headingRank") + ">"));
  }
  function Mt() {
    A(), x("slurpAllLineEndings");
  }
  function Rt() {
    x("slurpAllLineEndings", !0);
  }
  function Nt() {
    C("</h" + y("headingRank") + ">"), x("headingRank");
  }
  function Ht(d) {
    x("headingRank", this.sliceSerialize(d).charCodeAt(0) === 61 ? 1 : 2);
  }
  function qt() {
    const d = S();
    D(), C("<h" + y("headingRank") + ">"), w(d), C("</h" + y("headingRank") + ">"), x("slurpAllLineEndings"), x("headingRank");
  }
  function bn(d) {
    w(b(this.sliceSerialize(d)));
  }
  function jt(d) {
    if (!y("slurpAllLineEndings")) {
      if (y("slurpOneLineEnding")) {
        x("slurpOneLineEnding");
        return;
      }
      if (y("inCodeText")) {
        w(" ");
        return;
      }
      w(b(this.sliceSerialize(d)));
    }
  }
  function Vt(d) {
    w(b(this.sliceSerialize(d))), x("flowCodeSeenData", !0);
  }
  function qn() {
    C("<br />");
  }
  function Wt() {
    D(), Vn();
  }
  function jn() {
    x("ignoreEncode");
  }
  function Vn() {
    e.allowDangerousHtml && x("ignoreEncode", !0);
  }
  function $t() {
    C("<em>");
  }
  function Ut() {
    C("<strong>");
  }
  function Qt() {
    x("inCodeText", !0), C("<code>");
  }
  function Yt() {
    x("inCodeText"), C("</code>");
  }
  function Zt() {
    C("</em>");
  }
  function Gt() {
    C("</strong>");
  }
  function Jt() {
    D(), C("<hr />");
  }
  function Wn(d) {
    x("characterReferenceType", d.type);
  }
  function Xt(d) {
    const z = this.sliceSerialize(d), W = y("characterReferenceType") ? ie(z, y("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : ut(z);
    w(b(
      /** @type {string} */
      W
    )), x("characterReferenceType");
  }
  function Kt(d) {
    const z = this.sliceSerialize(d);
    C('<a href="' + cn(z, e.allowDangerousProtocol ? void 0 : Gn) + '">'), w(b(z)), C("</a>");
  }
  function vt(d) {
    const z = this.sliceSerialize(d);
    C('<a href="' + cn("mailto:" + z) + '">'), w(b(z)), C("</a>");
  }
}
function _(n, e, t, i) {
  const l = i ? i - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return r;
  function r(h) {
    return T(h) ? (n.enter(t), a(h)) : e(h);
  }
  function a(h) {
    return T(h) && u++ < l ? (n.consume(h), a) : (n.exit(t), e(h));
  }
}
const ce = {
  tokenize: fe
};
function fe(n) {
  const e = n.attempt(this.parser.constructs.contentInitial, i, l);
  let t;
  return e;
  function i(a) {
    if (a === null) {
      n.consume(a);
      return;
    }
    return n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), _(n, e, "linePrefix");
  }
  function l(a) {
    return n.enter("paragraph"), u(a);
  }
  function u(a) {
    const h = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = h), t = h, r(a);
  }
  function r(a) {
    if (a === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(a);
      return;
    }
    return E(a) ? (n.consume(a), n.exit("chunkText"), u) : (n.consume(a), r);
  }
}
const me = {
  tokenize: ge
}, Jn = {
  tokenize: pe
};
function ge(n) {
  const e = this, t = [];
  let i = 0, l, u, r;
  return a;
  function a(w) {
    if (i < t.length) {
      const O = t[i];
      return e.containerState = O[1], n.attempt(O[0].continuation, h, s)(w);
    }
    return s(w);
  }
  function h(w) {
    if (i++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, l && C();
      const O = e.events.length;
      let D = O, b;
      for (; D--; )
        if (e.events[D][0] === "exit" && e.events[D][1].type === "chunkFlow") {
          b = e.events[D][1].end;
          break;
        }
      S(i);
      let L = O;
      for (; L < e.events.length; )
        e.events[L][1].end = {
          ...b
        }, L++;
      return Z(e.events, D + 1, 0, e.events.slice(O)), e.events.length = L, s(w);
    }
    return a(w);
  }
  function s(w) {
    if (i === t.length) {
      if (!l)
        return p(w);
      if (l.currentConstruct && l.currentConstruct.concrete)
        return x(w);
      e.interrupt = !!(l.currentConstruct && !l._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, n.check(Jn, g, o)(w);
  }
  function g(w) {
    return l && C(), S(i), p(w);
  }
  function o(w) {
    return e.parser.lazy[e.now().line] = i !== t.length, r = e.now().offset, x(w);
  }
  function p(w) {
    return e.containerState = {}, n.attempt(Jn, c, x)(w);
  }
  function c(w) {
    return i++, t.push([e.currentConstruct, e.containerState]), p(w);
  }
  function x(w) {
    if (w === null) {
      l && C(), S(0), n.consume(w);
      return;
    }
    return l = l || e.parser.flow(e.now()), n.enter("chunkFlow", {
      _tokenizer: l,
      contentType: "flow",
      previous: u
    }), y(w);
  }
  function y(w) {
    if (w === null) {
      A(n.exit("chunkFlow"), !0), S(0), n.consume(w);
      return;
    }
    return E(w) ? (n.consume(w), A(n.exit("chunkFlow")), i = 0, e.interrupt = void 0, a) : (n.consume(w), y);
  }
  function A(w, O) {
    const D = e.sliceStream(w);
    if (O && D.push(null), w.previous = u, u && (u.next = w), u = w, l.defineSkip(w.start), l.write(D), e.parser.lazy[w.start.line]) {
      let b = l.events.length;
      for (; b--; )
        if (
          // The token starts before the line ending…
          l.events[b][1].start.offset < r && // …and either is not ended yet…
          (!l.events[b][1].end || // …or ends after it.
          l.events[b][1].end.offset > r)
        )
          return;
      const L = e.events.length;
      let R = L, H, k;
      for (; R--; )
        if (e.events[R][0] === "exit" && e.events[R][1].type === "chunkFlow") {
          if (H) {
            k = e.events[R][1].end;
            break;
          }
          H = !0;
        }
      for (S(i), b = L; b < e.events.length; )
        e.events[b][1].end = {
          ...k
        }, b++;
      Z(e.events, R + 1, 0, e.events.slice(L)), e.events.length = b;
    }
  }
  function S(w) {
    let O = t.length;
    for (; O-- > w; ) {
      const D = t[O];
      e.containerState = D[1], D[0].exit.call(e, n);
    }
    t.length = w;
  }
  function C() {
    l.write([null]), u = void 0, l = void 0, e.containerState._closeFlow = void 0;
  }
}
function pe(n, e, t) {
  return _(n, n.attempt(this.parser.constructs.document, e, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function zn(n) {
  if (n === null || M(n) || xn(n))
    return 1;
  if (Bn(n))
    return 2;
}
function Fn(n, e, t) {
  const i = [];
  let l = -1;
  for (; ++l < n.length; ) {
    const u = n[l].resolveAll;
    u && !i.includes(u) && (e = u(e, t), i.push(u));
  }
  return e;
}
const Pn = {
  name: "attention",
  resolveAll: xe,
  tokenize: ke
};
function xe(n, e) {
  let t = -1, i, l, u, r, a, h, s, g;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (i = t; i--; )
        if (n[i][0] === "exit" && n[i][1].type === "attentionSequence" && n[i][1]._open && // If the markers are the same:
        e.sliceSerialize(n[i][1]).charCodeAt(0) === e.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[i][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[i][1].end.offset - n[i][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          h = n[i][1].end.offset - n[i][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const o = {
            ...n[i][1].end
          }, p = {
            ...n[t][1].start
          };
          Xn(o, -h), Xn(p, h), r = {
            type: h > 1 ? "strongSequence" : "emphasisSequence",
            start: o,
            end: {
              ...n[i][1].end
            }
          }, a = {
            type: h > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[t][1].start
            },
            end: p
          }, u = {
            type: h > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[i][1].end
            },
            end: {
              ...n[t][1].start
            }
          }, l = {
            type: h > 1 ? "strong" : "emphasis",
            start: {
              ...r.start
            },
            end: {
              ...a.end
            }
          }, n[i][1].end = {
            ...r.start
          }, n[t][1].start = {
            ...a.end
          }, s = [], n[i][1].end.offset - n[i][1].start.offset && (s = $(s, [["enter", n[i][1], e], ["exit", n[i][1], e]])), s = $(s, [["enter", l, e], ["enter", r, e], ["exit", r, e], ["enter", u, e]]), s = $(s, Fn(e.parser.constructs.insideSpan.null, n.slice(i + 1, t), e)), s = $(s, [["exit", u, e], ["enter", a, e], ["exit", a, e], ["exit", l, e]]), n[t][1].end.offset - n[t][1].start.offset ? (g = 2, s = $(s, [["enter", n[t][1], e], ["exit", n[t][1], e]])) : g = 0, Z(n, i - 1, t - i + 3, s), t = i + s.length - g - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function ke(n, e) {
  const t = this.parser.constructs.attentionMarkers.null, i = this.previous, l = zn(i);
  let u;
  return r;
  function r(h) {
    return u = h, n.enter("attentionSequence"), a(h);
  }
  function a(h) {
    if (h === u)
      return n.consume(h), a;
    const s = n.exit("attentionSequence"), g = zn(h), o = !g || g === 2 && l || t.includes(h), p = !l || l === 2 && g || t.includes(i);
    return s._open = !!(u === 42 ? o : o && (l || !p)), s._close = !!(u === 42 ? p : p && (g || !o)), e(h);
  }
}
function Xn(n, e) {
  n.column += e, n.offset += e, n._bufferIndex += e;
}
const be = {
  name: "autolink",
  tokenize: Se
};
function Se(n, e, t) {
  let i = 0;
  return l;
  function l(c) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), u;
  }
  function u(c) {
    return Q(c) ? (n.consume(c), r) : c === 64 ? t(c) : s(c);
  }
  function r(c) {
    return c === 43 || c === 45 || c === 46 || U(c) ? (i = 1, a(c)) : s(c);
  }
  function a(c) {
    return c === 58 ? (n.consume(c), i = 0, h) : (c === 43 || c === 45 || c === 46 || U(c)) && i++ < 32 ? (n.consume(c), a) : (i = 0, s(c));
  }
  function h(c) {
    return c === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), e) : c === null || c === 32 || c === 60 || In(c) ? t(c) : (n.consume(c), h);
  }
  function s(c) {
    return c === 64 ? (n.consume(c), g) : ue(c) ? (n.consume(c), s) : t(c);
  }
  function g(c) {
    return U(c) ? o(c) : t(c);
  }
  function o(c) {
    return c === 46 ? (n.consume(c), i = 0, g) : c === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), e) : p(c);
  }
  function p(c) {
    if ((c === 45 || U(c)) && i++ < 63) {
      const x = c === 45 ? p : o;
      return n.consume(c), x;
    }
    return t(c);
  }
}
const wn = {
  partial: !0,
  tokenize: de
};
function de(n, e, t) {
  return i;
  function i(u) {
    return T(u) ? _(n, l, "linePrefix")(u) : l(u);
  }
  function l(u) {
    return u === null || E(u) ? e(u) : t(u);
  }
}
const st = {
  continuation: {
    tokenize: Ce
  },
  exit: ye,
  name: "blockQuote",
  tokenize: we
};
function we(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    if (r === 62) {
      const a = i.containerState;
      return a.open || (n.enter("blockQuote", {
        _container: !0
      }), a.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(r), n.exit("blockQuoteMarker"), u;
    }
    return t(r);
  }
  function u(r) {
    return T(r) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(r), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), e) : (n.exit("blockQuotePrefix"), e(r));
  }
}
function Ce(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    return T(r) ? _(n, u, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(r) : u(r);
  }
  function u(r) {
    return n.attempt(st, e, t)(r);
  }
}
function ye(n) {
  n.exit("blockQuote");
}
const ht = {
  name: "characterEscape",
  tokenize: Ie
};
function Ie(n, e, t) {
  return i;
  function i(u) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(u), n.exit("escapeMarker"), l;
  }
  function l(u) {
    return ae(u) ? (n.enter("characterEscapeValue"), n.consume(u), n.exit("characterEscapeValue"), n.exit("characterEscape"), e) : t(u);
  }
}
const ct = {
  name: "characterReference",
  tokenize: ze
};
function ze(n, e, t) {
  const i = this;
  let l = 0, u, r;
  return a;
  function a(o) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(o), n.exit("characterReferenceMarker"), h;
  }
  function h(o) {
    return o === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(o), n.exit("characterReferenceMarkerNumeric"), s) : (n.enter("characterReferenceValue"), u = 31, r = U, g(o));
  }
  function s(o) {
    return o === 88 || o === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(o), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), u = 6, r = le, g) : (n.enter("characterReferenceValue"), u = 7, r = _n, g(o));
  }
  function g(o) {
    if (o === 59 && l) {
      const p = n.exit("characterReferenceValue");
      return r === U && !ut(i.sliceSerialize(p)) ? t(o) : (n.enter("characterReferenceMarker"), n.consume(o), n.exit("characterReferenceMarker"), n.exit("characterReference"), e);
    }
    return r(o) && l++ < u ? (n.consume(o), g) : t(o);
  }
}
const Kn = {
  partial: !0,
  tokenize: Ee
}, vn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Fe
};
function Fe(n, e, t) {
  const i = this, l = {
    partial: !0,
    tokenize: D
  };
  let u = 0, r = 0, a;
  return h;
  function h(b) {
    return s(b);
  }
  function s(b) {
    const L = i.events[i.events.length - 1];
    return u = L && L[1].type === "linePrefix" ? L[2].sliceSerialize(L[1], !0).length : 0, a = b, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), g(b);
  }
  function g(b) {
    return b === a ? (r++, n.consume(b), g) : r < 3 ? t(b) : (n.exit("codeFencedFenceSequence"), T(b) ? _(n, o, "whitespace")(b) : o(b));
  }
  function o(b) {
    return b === null || E(b) ? (n.exit("codeFencedFence"), i.interrupt ? e(b) : n.check(Kn, y, O)(b)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === null || E(b) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), o(b)) : T(b) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), _(n, c, "whitespace")(b)) : b === 96 && b === a ? t(b) : (n.consume(b), p);
  }
  function c(b) {
    return b === null || E(b) ? o(b) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), x(b));
  }
  function x(b) {
    return b === null || E(b) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), o(b)) : b === 96 && b === a ? t(b) : (n.consume(b), x);
  }
  function y(b) {
    return n.attempt(l, O, A)(b);
  }
  function A(b) {
    return n.enter("lineEnding"), n.consume(b), n.exit("lineEnding"), S;
  }
  function S(b) {
    return u > 0 && T(b) ? _(n, C, "linePrefix", u + 1)(b) : C(b);
  }
  function C(b) {
    return b === null || E(b) ? n.check(Kn, y, O)(b) : (n.enter("codeFlowValue"), w(b));
  }
  function w(b) {
    return b === null || E(b) ? (n.exit("codeFlowValue"), C(b)) : (n.consume(b), w);
  }
  function O(b) {
    return n.exit("codeFenced"), e(b);
  }
  function D(b, L, R) {
    let H = 0;
    return k;
    function k(P) {
      return b.enter("lineEnding"), b.consume(P), b.exit("lineEnding"), I;
    }
    function I(P) {
      return b.enter("codeFencedFence"), T(P) ? _(b, F, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(P) : F(P);
    }
    function F(P) {
      return P === a ? (b.enter("codeFencedFenceSequence"), B(P)) : R(P);
    }
    function B(P) {
      return P === a ? (H++, b.consume(P), B) : H >= r ? (b.exit("codeFencedFenceSequence"), T(P) ? _(b, N, "whitespace")(P) : N(P)) : R(P);
    }
    function N(P) {
      return P === null || E(P) ? (b.exit("codeFencedFence"), L(P)) : R(P);
    }
  }
}
function Ee(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    return r === null ? t(r) : (n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), u);
  }
  function u(r) {
    return i.parser.lazy[i.now().line] ? t(r) : e(r);
  }
}
const An = {
  name: "codeIndented",
  tokenize: De
}, Ae = {
  partial: !0,
  tokenize: Te
};
function De(n, e, t) {
  const i = this;
  return l;
  function l(s) {
    return n.enter("codeIndented"), _(n, u, "linePrefix", 5)(s);
  }
  function u(s) {
    const g = i.events[i.events.length - 1];
    return g && g[1].type === "linePrefix" && g[2].sliceSerialize(g[1], !0).length >= 4 ? r(s) : t(s);
  }
  function r(s) {
    return s === null ? h(s) : E(s) ? n.attempt(Ae, r, h)(s) : (n.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || E(s) ? (n.exit("codeFlowValue"), r(s)) : (n.consume(s), a);
  }
  function h(s) {
    return n.exit("codeIndented"), e(s);
  }
}
function Te(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    return i.parser.lazy[i.now().line] ? t(r) : E(r) ? (n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), l) : _(n, u, "linePrefix", 5)(r);
  }
  function u(r) {
    const a = i.events[i.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(r) : E(r) ? l(r) : t(r);
  }
}
const Le = {
  name: "codeText",
  previous: Pe,
  resolve: _e,
  tokenize: Oe
};
function _e(n) {
  let e = n.length - 4, t = 3, i, l;
  if ((n[t][1].type === "lineEnding" || n[t][1].type === "space") && (n[e][1].type === "lineEnding" || n[e][1].type === "space")) {
    for (i = t; ++i < e; )
      if (n[i][1].type === "codeTextData") {
        n[t][1].type = "codeTextPadding", n[e][1].type = "codeTextPadding", t += 2, e -= 2;
        break;
      }
  }
  for (i = t - 1, e++; ++i <= e; )
    l === void 0 ? i !== e && n[i][1].type !== "lineEnding" && (l = i) : (i === e || n[i][1].type === "lineEnding") && (n[l][1].type = "codeTextData", i !== l + 2 && (n[l][1].end = n[i - 1][1].end, n.splice(l + 2, i - l - 2), e -= i - l - 2, i = l + 2), l = void 0);
  return n;
}
function Pe(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Oe(n, e, t) {
  let i = 0, l, u;
  return r;
  function r(o) {
    return n.enter("codeText"), n.enter("codeTextSequence"), a(o);
  }
  function a(o) {
    return o === 96 ? (n.consume(o), i++, a) : (n.exit("codeTextSequence"), h(o));
  }
  function h(o) {
    return o === null ? t(o) : o === 32 ? (n.enter("space"), n.consume(o), n.exit("space"), h) : o === 96 ? (u = n.enter("codeTextSequence"), l = 0, g(o)) : E(o) ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), h) : (n.enter("codeTextData"), s(o));
  }
  function s(o) {
    return o === null || o === 32 || o === 96 || E(o) ? (n.exit("codeTextData"), h(o)) : (n.consume(o), s);
  }
  function g(o) {
    return o === 96 ? (n.consume(o), l++, g) : l === i ? (n.exit("codeTextSequence"), n.exit("codeText"), e(o)) : (u.type = "codeTextData", s(o));
  }
}
class Be {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(e) {
    this.left = e ? [...e] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(e) {
    if (e < 0 || e >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(e, t) {
    const i = t ?? Number.POSITIVE_INFINITY;
    return i < this.left.length ? this.left.slice(e, i) : e > this.left.length ? this.right.slice(this.right.length - i + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - i + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(e, t, i) {
    const l = t || 0;
    this.setCursor(Math.trunc(e));
    const u = this.right.splice(this.right.length - l, Number.POSITIVE_INFINITY);
    return i && Sn(this.left, i), u.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(e) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(e);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(e) {
    this.setCursor(Number.POSITIVE_INFINITY), Sn(this.left, e);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(e) {
    this.setCursor(0), this.right.push(e);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(e) {
    this.setCursor(0), Sn(this.right, e.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(e) {
    if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0))
      if (e < this.left.length) {
        const t = this.left.splice(e, Number.POSITIVE_INFINITY);
        Sn(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
        Sn(this.left, t.reverse());
      }
  }
}
function Sn(n, e) {
  let t = 0;
  if (e.length < 1e4)
    n.push(...e);
  else
    for (; t < e.length; )
      n.push(...e.slice(t, t + 1e4)), t += 1e4;
}
function ft(n) {
  const e = {};
  let t = -1, i, l, u, r, a, h, s;
  const g = new Be(n);
  for (; ++t < g.length; ) {
    for (; t in e; )
      t = e[t];
    if (i = g.get(t), t && i[1].type === "chunkFlow" && g.get(t - 1)[1].type === "listItemPrefix" && (h = i[1]._tokenizer.events, u = 0, u < h.length && h[u][1].type === "lineEndingBlank" && (u += 2), u < h.length && h[u][1].type === "content"))
      for (; ++u < h.length && h[u][1].type !== "content"; )
        h[u][1].type === "chunkText" && (h[u][1]._isInFirstContentOfListItem = !0, u++);
    if (i[0] === "enter")
      i[1].contentType && (Object.assign(e, Me(g, t)), t = e[t], s = !0);
    else if (i[1]._container) {
      for (u = t, l = void 0; u--; )
        if (r = g.get(u), r[1].type === "lineEnding" || r[1].type === "lineEndingBlank")
          r[0] === "enter" && (l && (g.get(l)[1].type = "lineEndingBlank"), r[1].type = "lineEnding", l = u);
        else if (!(r[1].type === "linePrefix" || r[1].type === "listItemIndent")) break;
      l && (i[1].end = {
        ...g.get(l)[1].start
      }, a = g.slice(l, t), a.unshift(i), g.splice(l, t - l + 1, a));
    }
  }
  return Z(n, 0, Number.POSITIVE_INFINITY, g.slice(0)), !s;
}
function Me(n, e) {
  const t = n.get(e)[1], i = n.get(e)[2];
  let l = e - 1;
  const u = [];
  let r = t._tokenizer;
  r || (r = i.parser[t.contentType](t.start), t._contentTypeTextTrailing && (r._contentTypeTextTrailing = !0));
  const a = r.events, h = [], s = {};
  let g, o, p = -1, c = t, x = 0, y = 0;
  const A = [y];
  for (; c; ) {
    for (; n.get(++l)[1] !== c; )
      ;
    u.push(l), c._tokenizer || (g = i.sliceStream(c), c.next || g.push(null), o && r.defineSkip(c.start), c._isInFirstContentOfListItem && (r._gfmTasklistFirstContentOfListItem = !0), r.write(g), c._isInFirstContentOfListItem && (r._gfmTasklistFirstContentOfListItem = void 0)), o = c, c = c.next;
  }
  for (c = t; ++p < a.length; )
    // Find a void token that includes a break.
    a[p][0] === "exit" && a[p - 1][0] === "enter" && a[p][1].type === a[p - 1][1].type && a[p][1].start.line !== a[p][1].end.line && (y = p + 1, A.push(y), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (r.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : A.pop(), p = A.length; p--; ) {
    const S = a.slice(A[p], A[p + 1]), C = u.pop();
    h.push([C, C + S.length - 1]), n.splice(C, 2, S);
  }
  for (h.reverse(), p = -1; ++p < h.length; )
    s[x + h[p][0]] = x + h[p][1], x += h[p][1] - h[p][0] - 1;
  return s;
}
const Re = {
  resolve: He,
  tokenize: qe
}, Ne = {
  partial: !0,
  tokenize: je
};
function He(n) {
  return ft(n), n;
}
function qe(n, e) {
  let t;
  return i;
  function i(a) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), l(a);
  }
  function l(a) {
    return a === null ? u(a) : E(a) ? n.check(Ne, r, u)(a) : (n.consume(a), l);
  }
  function u(a) {
    return n.exit("chunkContent"), n.exit("content"), e(a);
  }
  function r(a) {
    return n.consume(a), n.exit("chunkContent"), t.next = n.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, l;
  }
}
function je(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), _(n, u, "linePrefix");
  }
  function u(r) {
    if (r === null || E(r))
      return t(r);
    const a = i.events[i.events.length - 1];
    return !i.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(r) : n.interrupt(i.parser.constructs.flow, t, e)(r);
  }
}
function mt(n, e, t, i, l, u, r, a, h) {
  const s = h || Number.POSITIVE_INFINITY;
  let g = 0;
  return o;
  function o(S) {
    return S === 60 ? (n.enter(i), n.enter(l), n.enter(u), n.consume(S), n.exit(u), p) : S === null || S === 32 || S === 41 || In(S) ? t(S) : (n.enter(i), n.enter(r), n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), y(S));
  }
  function p(S) {
    return S === 62 ? (n.enter(u), n.consume(S), n.exit(u), n.exit(l), n.exit(i), e) : (n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), c(S));
  }
  function c(S) {
    return S === 62 ? (n.exit("chunkString"), n.exit(a), p(S)) : S === null || S === 60 || E(S) ? t(S) : (n.consume(S), S === 92 ? x : c);
  }
  function x(S) {
    return S === 60 || S === 62 || S === 92 ? (n.consume(S), c) : c(S);
  }
  function y(S) {
    return !g && (S === null || S === 41 || M(S)) ? (n.exit("chunkString"), n.exit(a), n.exit(r), n.exit(i), e(S)) : g < s && S === 40 ? (n.consume(S), g++, y) : S === 41 ? (n.consume(S), g--, y) : S === null || S === 32 || S === 40 || In(S) ? t(S) : (n.consume(S), S === 92 ? A : y);
  }
  function A(S) {
    return S === 40 || S === 41 || S === 92 ? (n.consume(S), y) : y(S);
  }
}
function gt(n, e, t, i, l, u) {
  const r = this;
  let a = 0, h;
  return s;
  function s(c) {
    return n.enter(i), n.enter(l), n.consume(c), n.exit(l), n.enter(u), g;
  }
  function g(c) {
    return a > 999 || c === null || c === 91 || c === 93 && !h || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !a && "_hiddenFootnoteSupport" in r.parser.constructs ? t(c) : c === 93 ? (n.exit(u), n.enter(l), n.consume(c), n.exit(l), n.exit(i), e) : E(c) ? (n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), g) : (n.enter("chunkString", {
      contentType: "string"
    }), o(c));
  }
  function o(c) {
    return c === null || c === 91 || c === 93 || E(c) || a++ > 999 ? (n.exit("chunkString"), g(c)) : (n.consume(c), h || (h = !T(c)), c === 92 ? p : o);
  }
  function p(c) {
    return c === 91 || c === 92 || c === 93 ? (n.consume(c), a++, o) : o(c);
  }
}
function pt(n, e, t, i, l, u) {
  let r;
  return a;
  function a(p) {
    return p === 34 || p === 39 || p === 40 ? (n.enter(i), n.enter(l), n.consume(p), n.exit(l), r = p === 40 ? 41 : p, h) : t(p);
  }
  function h(p) {
    return p === r ? (n.enter(l), n.consume(p), n.exit(l), n.exit(i), e) : (n.enter(u), s(p));
  }
  function s(p) {
    return p === r ? (n.exit(u), h(r)) : p === null ? t(p) : E(p) ? (n.enter("lineEnding"), n.consume(p), n.exit("lineEnding"), _(n, s, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), g(p));
  }
  function g(p) {
    return p === r || p === null || E(p) ? (n.exit("chunkString"), s(p)) : (n.consume(p), p === 92 ? o : g);
  }
  function o(p) {
    return p === r || p === 92 ? (n.consume(p), g) : g(p);
  }
}
function dn(n, e) {
  let t;
  return i;
  function i(l) {
    return E(l) ? (n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), t = !0, i) : T(l) ? _(n, i, t ? "linePrefix" : "lineSuffix")(l) : e(l);
  }
}
const Ve = {
  name: "definition",
  tokenize: $e
}, We = {
  partial: !0,
  tokenize: Ue
};
function $e(n, e, t) {
  const i = this;
  let l;
  return u;
  function u(c) {
    return n.enter("definition"), r(c);
  }
  function r(c) {
    return gt.call(
      i,
      n,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function a(c) {
    return l = tn(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1)), c === 58 ? (n.enter("definitionMarker"), n.consume(c), n.exit("definitionMarker"), h) : t(c);
  }
  function h(c) {
    return M(c) ? dn(n, s)(c) : s(c);
  }
  function s(c) {
    return mt(
      n,
      g,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(c);
  }
  function g(c) {
    return n.attempt(We, o, o)(c);
  }
  function o(c) {
    return T(c) ? _(n, p, "whitespace")(c) : p(c);
  }
  function p(c) {
    return c === null || E(c) ? (n.exit("definition"), i.parser.defined.push(l), e(c)) : t(c);
  }
}
function Ue(n, e, t) {
  return i;
  function i(a) {
    return M(a) ? dn(n, l)(a) : t(a);
  }
  function l(a) {
    return pt(n, u, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function u(a) {
    return T(a) ? _(n, r, "whitespace")(a) : r(a);
  }
  function r(a) {
    return a === null || E(a) ? e(a) : t(a);
  }
}
const Qe = {
  name: "hardBreakEscape",
  tokenize: Ye
};
function Ye(n, e, t) {
  return i;
  function i(u) {
    return n.enter("hardBreakEscape"), n.consume(u), l;
  }
  function l(u) {
    return E(u) ? (n.exit("hardBreakEscape"), e(u)) : t(u);
  }
}
const Ze = {
  name: "headingAtx",
  resolve: Ge,
  tokenize: Je
};
function Ge(n, e) {
  let t = n.length - 2, i = 3, l, u;
  return n[i][1].type === "whitespace" && (i += 2), t - 2 > i && n[t][1].type === "whitespace" && (t -= 2), n[t][1].type === "atxHeadingSequence" && (i === t - 1 || t - 4 > i && n[t - 2][1].type === "whitespace") && (t -= i + 1 === t ? 2 : 4), t > i && (l = {
    type: "atxHeadingText",
    start: n[i][1].start,
    end: n[t][1].end
  }, u = {
    type: "chunkText",
    start: n[i][1].start,
    end: n[t][1].end,
    contentType: "text"
  }, Z(n, i, t - i + 1, [["enter", l, e], ["enter", u, e], ["exit", u, e], ["exit", l, e]])), n;
}
function Je(n, e, t) {
  let i = 0;
  return l;
  function l(g) {
    return n.enter("atxHeading"), u(g);
  }
  function u(g) {
    return n.enter("atxHeadingSequence"), r(g);
  }
  function r(g) {
    return g === 35 && i++ < 6 ? (n.consume(g), r) : g === null || M(g) ? (n.exit("atxHeadingSequence"), a(g)) : t(g);
  }
  function a(g) {
    return g === 35 ? (n.enter("atxHeadingSequence"), h(g)) : g === null || E(g) ? (n.exit("atxHeading"), e(g)) : T(g) ? _(n, a, "whitespace")(g) : (n.enter("atxHeadingText"), s(g));
  }
  function h(g) {
    return g === 35 ? (n.consume(g), h) : (n.exit("atxHeadingSequence"), a(g));
  }
  function s(g) {
    return g === null || g === 35 || M(g) ? (n.exit("atxHeadingText"), a(g)) : (n.consume(g), s);
  }
}
const Xe = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], nt = ["pre", "script", "style", "textarea"], Ke = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ti,
  tokenize: ei
}, ve = {
  partial: !0,
  tokenize: ri
}, ni = {
  partial: !0,
  tokenize: ii
};
function ti(n) {
  let e = n.length;
  for (; e-- && !(n[e][0] === "enter" && n[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && n[e - 2][1].type === "linePrefix" && (n[e][1].start = n[e - 2][1].start, n[e + 1][1].start = n[e - 2][1].start, n.splice(e - 2, 2)), n;
}
function ei(n, e, t) {
  const i = this;
  let l, u, r, a, h;
  return s;
  function s(m) {
    return g(m);
  }
  function g(m) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(m), o;
  }
  function o(m) {
    return m === 33 ? (n.consume(m), p) : m === 47 ? (n.consume(m), u = !0, y) : m === 63 ? (n.consume(m), l = 3, i.interrupt ? e : f) : Q(m) ? (n.consume(m), r = String.fromCharCode(m), A) : t(m);
  }
  function p(m) {
    return m === 45 ? (n.consume(m), l = 2, c) : m === 91 ? (n.consume(m), l = 5, a = 0, x) : Q(m) ? (n.consume(m), l = 4, i.interrupt ? e : f) : t(m);
  }
  function c(m) {
    return m === 45 ? (n.consume(m), i.interrupt ? e : f) : t(m);
  }
  function x(m) {
    const X = "CDATA[";
    return m === X.charCodeAt(a++) ? (n.consume(m), a === X.length ? i.interrupt ? e : F : x) : t(m);
  }
  function y(m) {
    return Q(m) ? (n.consume(m), r = String.fromCharCode(m), A) : t(m);
  }
  function A(m) {
    if (m === null || m === 47 || m === 62 || M(m)) {
      const X = m === 47, fn = r.toLowerCase();
      return !X && !u && nt.includes(fn) ? (l = 1, i.interrupt ? e(m) : F(m)) : Xe.includes(r.toLowerCase()) ? (l = 6, X ? (n.consume(m), S) : i.interrupt ? e(m) : F(m)) : (l = 7, i.interrupt && !i.parser.lazy[i.now().line] ? t(m) : u ? C(m) : w(m));
    }
    return m === 45 || U(m) ? (n.consume(m), r += String.fromCharCode(m), A) : t(m);
  }
  function S(m) {
    return m === 62 ? (n.consume(m), i.interrupt ? e : F) : t(m);
  }
  function C(m) {
    return T(m) ? (n.consume(m), C) : k(m);
  }
  function w(m) {
    return m === 47 ? (n.consume(m), k) : m === 58 || m === 95 || Q(m) ? (n.consume(m), O) : T(m) ? (n.consume(m), w) : k(m);
  }
  function O(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || U(m) ? (n.consume(m), O) : D(m);
  }
  function D(m) {
    return m === 61 ? (n.consume(m), b) : T(m) ? (n.consume(m), D) : w(m);
  }
  function b(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (n.consume(m), h = m, L) : T(m) ? (n.consume(m), b) : R(m);
  }
  function L(m) {
    return m === h ? (n.consume(m), h = null, H) : m === null || E(m) ? t(m) : (n.consume(m), L);
  }
  function R(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || M(m) ? D(m) : (n.consume(m), R);
  }
  function H(m) {
    return m === 47 || m === 62 || T(m) ? w(m) : t(m);
  }
  function k(m) {
    return m === 62 ? (n.consume(m), I) : t(m);
  }
  function I(m) {
    return m === null || E(m) ? F(m) : T(m) ? (n.consume(m), I) : t(m);
  }
  function F(m) {
    return m === 45 && l === 2 ? (n.consume(m), V) : m === 60 && l === 1 ? (n.consume(m), q) : m === 62 && l === 4 ? (n.consume(m), J) : m === 63 && l === 3 ? (n.consume(m), f) : m === 93 && l === 5 ? (n.consume(m), rn) : E(m) && (l === 6 || l === 7) ? (n.exit("htmlFlowData"), n.check(ve, un, B)(m)) : m === null || E(m) ? (n.exit("htmlFlowData"), B(m)) : (n.consume(m), F);
  }
  function B(m) {
    return n.check(ni, N, un)(m);
  }
  function N(m) {
    return n.enter("lineEnding"), n.consume(m), n.exit("lineEnding"), P;
  }
  function P(m) {
    return m === null || E(m) ? B(m) : (n.enter("htmlFlowData"), F(m));
  }
  function V(m) {
    return m === 45 ? (n.consume(m), f) : F(m);
  }
  function q(m) {
    return m === 47 ? (n.consume(m), r = "", G) : F(m);
  }
  function G(m) {
    if (m === 62) {
      const X = r.toLowerCase();
      return nt.includes(X) ? (n.consume(m), J) : F(m);
    }
    return Q(m) && r.length < 8 ? (n.consume(m), r += String.fromCharCode(m), G) : F(m);
  }
  function rn(m) {
    return m === 93 ? (n.consume(m), f) : F(m);
  }
  function f(m) {
    return m === 62 ? (n.consume(m), J) : m === 45 && l === 2 ? (n.consume(m), f) : F(m);
  }
  function J(m) {
    return m === null || E(m) ? (n.exit("htmlFlowData"), un(m)) : (n.consume(m), J);
  }
  function un(m) {
    return n.exit("htmlFlow"), e(m);
  }
}
function ii(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    return E(r) ? (n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), u) : t(r);
  }
  function u(r) {
    return i.parser.lazy[i.now().line] ? t(r) : e(r);
  }
}
function ri(n, e, t) {
  return i;
  function i(l) {
    return n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), n.attempt(wn, e, t);
  }
}
const ui = {
  name: "htmlText",
  tokenize: li
};
function li(n, e, t) {
  const i = this;
  let l, u, r;
  return a;
  function a(f) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(f), h;
  }
  function h(f) {
    return f === 33 ? (n.consume(f), s) : f === 47 ? (n.consume(f), D) : f === 63 ? (n.consume(f), w) : Q(f) ? (n.consume(f), R) : t(f);
  }
  function s(f) {
    return f === 45 ? (n.consume(f), g) : f === 91 ? (n.consume(f), u = 0, x) : Q(f) ? (n.consume(f), C) : t(f);
  }
  function g(f) {
    return f === 45 ? (n.consume(f), c) : t(f);
  }
  function o(f) {
    return f === null ? t(f) : f === 45 ? (n.consume(f), p) : E(f) ? (r = o, q(f)) : (n.consume(f), o);
  }
  function p(f) {
    return f === 45 ? (n.consume(f), c) : o(f);
  }
  function c(f) {
    return f === 62 ? V(f) : f === 45 ? p(f) : o(f);
  }
  function x(f) {
    const J = "CDATA[";
    return f === J.charCodeAt(u++) ? (n.consume(f), u === J.length ? y : x) : t(f);
  }
  function y(f) {
    return f === null ? t(f) : f === 93 ? (n.consume(f), A) : E(f) ? (r = y, q(f)) : (n.consume(f), y);
  }
  function A(f) {
    return f === 93 ? (n.consume(f), S) : y(f);
  }
  function S(f) {
    return f === 62 ? V(f) : f === 93 ? (n.consume(f), S) : y(f);
  }
  function C(f) {
    return f === null || f === 62 ? V(f) : E(f) ? (r = C, q(f)) : (n.consume(f), C);
  }
  function w(f) {
    return f === null ? t(f) : f === 63 ? (n.consume(f), O) : E(f) ? (r = w, q(f)) : (n.consume(f), w);
  }
  function O(f) {
    return f === 62 ? V(f) : w(f);
  }
  function D(f) {
    return Q(f) ? (n.consume(f), b) : t(f);
  }
  function b(f) {
    return f === 45 || U(f) ? (n.consume(f), b) : L(f);
  }
  function L(f) {
    return E(f) ? (r = L, q(f)) : T(f) ? (n.consume(f), L) : V(f);
  }
  function R(f) {
    return f === 45 || U(f) ? (n.consume(f), R) : f === 47 || f === 62 || M(f) ? H(f) : t(f);
  }
  function H(f) {
    return f === 47 ? (n.consume(f), V) : f === 58 || f === 95 || Q(f) ? (n.consume(f), k) : E(f) ? (r = H, q(f)) : T(f) ? (n.consume(f), H) : V(f);
  }
  function k(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || U(f) ? (n.consume(f), k) : I(f);
  }
  function I(f) {
    return f === 61 ? (n.consume(f), F) : E(f) ? (r = I, q(f)) : T(f) ? (n.consume(f), I) : H(f);
  }
  function F(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? t(f) : f === 34 || f === 39 ? (n.consume(f), l = f, B) : E(f) ? (r = F, q(f)) : T(f) ? (n.consume(f), F) : (n.consume(f), N);
  }
  function B(f) {
    return f === l ? (n.consume(f), l = void 0, P) : f === null ? t(f) : E(f) ? (r = B, q(f)) : (n.consume(f), B);
  }
  function N(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? t(f) : f === 47 || f === 62 || M(f) ? H(f) : (n.consume(f), N);
  }
  function P(f) {
    return f === 47 || f === 62 || M(f) ? H(f) : t(f);
  }
  function V(f) {
    return f === 62 ? (n.consume(f), n.exit("htmlTextData"), n.exit("htmlText"), e) : t(f);
  }
  function q(f) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), G;
  }
  function G(f) {
    return T(f) ? _(n, rn, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : rn(f);
  }
  function rn(f) {
    return n.enter("htmlTextData"), r(f);
  }
}
const Mn = {
  name: "labelEnd",
  resolveAll: hi,
  resolveTo: ci,
  tokenize: fi
}, ai = {
  tokenize: mi
}, oi = {
  tokenize: gi
}, si = {
  tokenize: pi
};
function hi(n) {
  let e = -1;
  const t = [];
  for (; ++e < n.length; ) {
    const i = n[e][1];
    if (t.push(n[e]), i.type === "labelImage" || i.type === "labelLink" || i.type === "labelEnd") {
      const l = i.type === "labelImage" ? 4 : 2;
      i.type = "data", e += l;
    }
  }
  return n.length !== t.length && Z(n, 0, n.length, t), n;
}
function ci(n, e) {
  let t = n.length, i = 0, l, u, r, a;
  for (; t--; )
    if (l = n[t][1], u) {
      if (l.type === "link" || l.type === "labelLink" && l._inactive)
        break;
      n[t][0] === "enter" && l.type === "labelLink" && (l._inactive = !0);
    } else if (r) {
      if (n[t][0] === "enter" && (l.type === "labelImage" || l.type === "labelLink") && !l._balanced && (u = t, l.type !== "labelLink")) {
        i = 2;
        break;
      }
    } else l.type === "labelEnd" && (r = t);
  const h = {
    type: n[u][1].type === "labelLink" ? "link" : "image",
    start: {
      ...n[u][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  }, s = {
    type: "label",
    start: {
      ...n[u][1].start
    },
    end: {
      ...n[r][1].end
    }
  }, g = {
    type: "labelText",
    start: {
      ...n[u + i + 2][1].end
    },
    end: {
      ...n[r - 2][1].start
    }
  };
  return a = [["enter", h, e], ["enter", s, e]], a = $(a, n.slice(u + 1, u + i + 3)), a = $(a, [["enter", g, e]]), a = $(a, Fn(e.parser.constructs.insideSpan.null, n.slice(u + i + 4, r - 3), e)), a = $(a, [["exit", g, e], n[r - 2], n[r - 1], ["exit", s, e]]), a = $(a, n.slice(r + 1)), a = $(a, [["exit", h, e]]), Z(n, u, n.length, a), n;
}
function fi(n, e, t) {
  const i = this;
  let l = i.events.length, u, r;
  for (; l--; )
    if ((i.events[l][1].type === "labelImage" || i.events[l][1].type === "labelLink") && !i.events[l][1]._balanced) {
      u = i.events[l][1];
      break;
    }
  return a;
  function a(p) {
    return u ? u._inactive ? o(p) : (r = i.parser.defined.includes(tn(i.sliceSerialize({
      start: u.end,
      end: i.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(p), n.exit("labelMarker"), n.exit("labelEnd"), h) : t(p);
  }
  function h(p) {
    return p === 40 ? n.attempt(ai, g, r ? g : o)(p) : p === 91 ? n.attempt(oi, g, r ? s : o)(p) : r ? g(p) : o(p);
  }
  function s(p) {
    return n.attempt(si, g, o)(p);
  }
  function g(p) {
    return e(p);
  }
  function o(p) {
    return u._balanced = !0, t(p);
  }
}
function mi(n, e, t) {
  return i;
  function i(o) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(o), n.exit("resourceMarker"), l;
  }
  function l(o) {
    return M(o) ? dn(n, u)(o) : u(o);
  }
  function u(o) {
    return o === 41 ? g(o) : mt(n, r, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(o);
  }
  function r(o) {
    return M(o) ? dn(n, h)(o) : g(o);
  }
  function a(o) {
    return t(o);
  }
  function h(o) {
    return o === 34 || o === 39 || o === 40 ? pt(n, s, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(o) : g(o);
  }
  function s(o) {
    return M(o) ? dn(n, g)(o) : g(o);
  }
  function g(o) {
    return o === 41 ? (n.enter("resourceMarker"), n.consume(o), n.exit("resourceMarker"), n.exit("resource"), e) : t(o);
  }
}
function gi(n, e, t) {
  const i = this;
  return l;
  function l(a) {
    return gt.call(i, n, u, r, "reference", "referenceMarker", "referenceString")(a);
  }
  function u(a) {
    return i.parser.defined.includes(tn(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1))) ? e(a) : t(a);
  }
  function r(a) {
    return t(a);
  }
}
function pi(n, e, t) {
  return i;
  function i(u) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), l;
  }
  function l(u) {
    return u === 93 ? (n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), n.exit("reference"), e) : t(u);
  }
}
const xi = {
  name: "labelStartImage",
  resolveAll: Mn.resolveAll,
  tokenize: ki
};
function ki(n, e, t) {
  const i = this;
  return l;
  function l(a) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(a), n.exit("labelImageMarker"), u;
  }
  function u(a) {
    return a === 91 ? (n.enter("labelMarker"), n.consume(a), n.exit("labelMarker"), n.exit("labelImage"), r) : t(a);
  }
  function r(a) {
    return a === 94 && "_hiddenFootnoteSupport" in i.parser.constructs ? t(a) : e(a);
  }
}
const bi = {
  name: "labelStartLink",
  resolveAll: Mn.resolveAll,
  tokenize: Si
};
function Si(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(r), n.exit("labelMarker"), n.exit("labelLink"), u;
  }
  function u(r) {
    return r === 94 && "_hiddenFootnoteSupport" in i.parser.constructs ? t(r) : e(r);
  }
}
const Dn = {
  name: "lineEnding",
  tokenize: di
};
function di(n, e) {
  return t;
  function t(i) {
    return n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), _(n, e, "linePrefix");
  }
}
const yn = {
  name: "thematicBreak",
  tokenize: wi
};
function wi(n, e, t) {
  let i = 0, l;
  return u;
  function u(s) {
    return n.enter("thematicBreak"), r(s);
  }
  function r(s) {
    return l = s, a(s);
  }
  function a(s) {
    return s === l ? (n.enter("thematicBreakSequence"), h(s)) : i >= 3 && (s === null || E(s)) ? (n.exit("thematicBreak"), e(s)) : t(s);
  }
  function h(s) {
    return s === l ? (n.consume(s), i++, h) : (n.exit("thematicBreakSequence"), T(s) ? _(n, a, "whitespace")(s) : a(s));
  }
}
const Y = {
  continuation: {
    tokenize: zi
  },
  exit: Ei,
  name: "list",
  tokenize: Ii
}, Ci = {
  partial: !0,
  tokenize: Ai
}, yi = {
  partial: !0,
  tokenize: Fi
};
function Ii(n, e, t) {
  const i = this, l = i.events[i.events.length - 1];
  let u = l && l[1].type === "linePrefix" ? l[2].sliceSerialize(l[1], !0).length : 0, r = 0;
  return a;
  function a(c) {
    const x = i.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !i.containerState.marker || c === i.containerState.marker : _n(c)) {
      if (i.containerState.type || (i.containerState.type = x, n.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return n.enter("listItemPrefix"), c === 42 || c === 45 ? n.check(yn, t, s)(c) : s(c);
      if (!i.interrupt || c === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), h(c);
    }
    return t(c);
  }
  function h(c) {
    return _n(c) && ++r < 10 ? (n.consume(c), h) : (!i.interrupt || r < 2) && (i.containerState.marker ? c === i.containerState.marker : c === 41 || c === 46) ? (n.exit("listItemValue"), s(c)) : t(c);
  }
  function s(c) {
    return n.enter("listItemMarker"), n.consume(c), n.exit("listItemMarker"), i.containerState.marker = i.containerState.marker || c, n.check(
      wn,
      // Can’t be empty when interrupting.
      i.interrupt ? t : g,
      n.attempt(Ci, p, o)
    );
  }
  function g(c) {
    return i.containerState.initialBlankLine = !0, u++, p(c);
  }
  function o(c) {
    return T(c) ? (n.enter("listItemPrefixWhitespace"), n.consume(c), n.exit("listItemPrefixWhitespace"), p) : t(c);
  }
  function p(c) {
    return i.containerState.size = u + i.sliceSerialize(n.exit("listItemPrefix"), !0).length, e(c);
  }
}
function zi(n, e, t) {
  const i = this;
  return i.containerState._closeFlow = void 0, n.check(wn, l, u);
  function l(a) {
    return i.containerState.furtherBlankLines = i.containerState.furtherBlankLines || i.containerState.initialBlankLine, _(n, e, "listItemIndent", i.containerState.size + 1)(a);
  }
  function u(a) {
    return i.containerState.furtherBlankLines || !T(a) ? (i.containerState.furtherBlankLines = void 0, i.containerState.initialBlankLine = void 0, r(a)) : (i.containerState.furtherBlankLines = void 0, i.containerState.initialBlankLine = void 0, n.attempt(yi, e, r)(a));
  }
  function r(a) {
    return i.containerState._closeFlow = !0, i.interrupt = void 0, _(n, n.attempt(Y, e, t), "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Fi(n, e, t) {
  const i = this;
  return _(n, l, "listItemIndent", i.containerState.size + 1);
  function l(u) {
    const r = i.events[i.events.length - 1];
    return r && r[1].type === "listItemIndent" && r[2].sliceSerialize(r[1], !0).length === i.containerState.size ? e(u) : t(u);
  }
}
function Ei(n) {
  n.exit(this.containerState.type);
}
function Ai(n, e, t) {
  const i = this;
  return _(n, l, "listItemPrefixWhitespace", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function l(u) {
    const r = i.events[i.events.length - 1];
    return !T(u) && r && r[1].type === "listItemPrefixWhitespace" ? e(u) : t(u);
  }
}
const tt = {
  name: "setextUnderline",
  resolveTo: Di,
  tokenize: Ti
};
function Di(n, e) {
  let t = n.length, i, l, u;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        i = t;
        break;
      }
      n[t][1].type === "paragraph" && (l = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1), !u && n[t][1].type === "definition" && (u = t);
  const r = {
    type: "setextHeading",
    start: {
      ...n[i][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[l][1].type = "setextHeadingText", u ? (n.splice(l, 0, ["enter", r, e]), n.splice(u + 1, 0, ["exit", n[i][1], e]), n[i][1].end = {
    ...n[u][1].end
  }) : n[i][1] = r, n.push(["exit", r, e]), n;
}
function Ti(n, e, t) {
  const i = this;
  let l;
  return u;
  function u(s) {
    let g = i.events.length, o;
    for (; g--; )
      if (i.events[g][1].type !== "lineEnding" && i.events[g][1].type !== "linePrefix" && i.events[g][1].type !== "content") {
        o = i.events[g][1].type === "paragraph";
        break;
      }
    return !i.parser.lazy[i.now().line] && (i.interrupt || o) ? (n.enter("setextHeadingLine"), l = s, r(s)) : t(s);
  }
  function r(s) {
    return n.enter("setextHeadingLineSequence"), a(s);
  }
  function a(s) {
    return s === l ? (n.consume(s), a) : (n.exit("setextHeadingLineSequence"), T(s) ? _(n, h, "lineSuffix")(s) : h(s));
  }
  function h(s) {
    return s === null || E(s) ? (n.exit("setextHeadingLine"), e(s)) : t(s);
  }
}
const Li = {
  tokenize: _i
};
function _i(n) {
  const e = this, t = n.attempt(
    // Try to parse a blank line.
    wn,
    i,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, l, _(n, n.attempt(this.parser.constructs.flow, l, n.attempt(Re, l)), "linePrefix"))
  );
  return t;
  function i(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(u), n.exit("lineEndingBlank"), e.currentConstruct = void 0, t;
  }
  function l(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), e.currentConstruct = void 0, t;
  }
}
const Pi = {
  resolveAll: kt()
}, Oi = xt("string"), Bi = xt("text");
function xt(n) {
  return {
    resolveAll: kt(n === "text" ? Mi : void 0),
    tokenize: e
  };
  function e(t) {
    const i = this, l = this.parser.constructs[n], u = t.attempt(l, r, a);
    return r;
    function r(g) {
      return s(g) ? u(g) : a(g);
    }
    function a(g) {
      if (g === null) {
        t.consume(g);
        return;
      }
      return t.enter("data"), t.consume(g), h;
    }
    function h(g) {
      return s(g) ? (t.exit("data"), u(g)) : (t.consume(g), h);
    }
    function s(g) {
      if (g === null)
        return !0;
      const o = l[g];
      let p = -1;
      if (o)
        for (; ++p < o.length; ) {
          const c = o[p];
          if (!c.previous || c.previous.call(i, i.previous))
            return !0;
        }
      return !1;
    }
  }
}
function kt(n) {
  return e;
  function e(t, i) {
    let l = -1, u;
    for (; ++l <= t.length; )
      u === void 0 ? t[l] && t[l][1].type === "data" && (u = l, l++) : (!t[l] || t[l][1].type !== "data") && (l !== u + 2 && (t[u][1].end = t[l - 1][1].end, t.splice(u + 2, l - u - 2), l = u + 2), u = void 0);
    return n ? n(t, i) : t;
  }
}
function Mi(n, e) {
  let t = 0;
  for (; ++t <= n.length; )
    if ((t === n.length || n[t][1].type === "lineEnding") && n[t - 1][1].type === "data") {
      const i = n[t - 1][1], l = e.sliceStream(i);
      let u = l.length, r = -1, a = 0, h;
      for (; u--; ) {
        const s = l[u];
        if (typeof s == "string") {
          for (r = s.length; s.charCodeAt(r - 1) === 32; )
            a++, r--;
          if (r) break;
          r = -1;
        } else if (s === -2)
          h = !0, a++;
        else if (s !== -1) {
          u++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && t === n.length && (a = 0), a) {
        const s = {
          type: t === n.length || h || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: u ? r : i.start._bufferIndex + r,
            _index: i.start._index + u,
            line: i.end.line,
            column: i.end.column - a,
            offset: i.end.offset - a
          },
          end: {
            ...i.end
          }
        };
        i.end = {
          ...s.start
        }, i.start.offset === i.end.offset ? Object.assign(i, s) : (n.splice(t, 0, ["enter", s, e], ["exit", s, e]), t += 2);
      }
      t++;
    }
  return n;
}
const Ri = {
  42: Y,
  43: Y,
  45: Y,
  48: Y,
  49: Y,
  50: Y,
  51: Y,
  52: Y,
  53: Y,
  54: Y,
  55: Y,
  56: Y,
  57: Y,
  62: st
}, Ni = {
  91: Ve
}, Hi = {
  [-2]: An,
  [-1]: An,
  32: An
}, qi = {
  35: Ze,
  42: yn,
  45: [tt, yn],
  60: Ke,
  61: tt,
  95: yn,
  96: vn,
  126: vn
}, ji = {
  38: ct,
  92: ht
}, Vi = {
  [-5]: Dn,
  [-4]: Dn,
  [-3]: Dn,
  33: xi,
  38: ct,
  42: Pn,
  60: [be, ui],
  91: bi,
  92: [Qe, ht],
  93: Mn,
  95: Pn,
  96: Le
}, Wi = {
  null: [Pn, Pi]
}, $i = {
  null: [42, 95]
}, Ui = {
  null: []
}, Qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: $i,
  contentInitial: Ni,
  disable: Ui,
  document: Ri,
  flow: qi,
  flowInitial: Hi,
  insideSpan: Wi,
  string: ji,
  text: Vi
}, Symbol.toStringTag, { value: "Module" }));
function Yi(n, e, t) {
  let i = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const l = {}, u = [];
  let r = [], a = [];
  const h = {
    attempt: L(D),
    check: L(b),
    consume: C,
    enter: w,
    exit: O,
    interrupt: L(b, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: x,
    parser: n,
    previous: null,
    sliceSerialize: p,
    sliceStream: c,
    write: o
  };
  let g = e.tokenize.call(s, h);
  return e.resolveAll && u.push(e), s;
  function o(I) {
    return r = $(r, I), A(), r[r.length - 1] !== null ? [] : (R(e, 0), s.events = Fn(u, s.events, s), s.events);
  }
  function p(I, F) {
    return Gi(c(I), F);
  }
  function c(I) {
    return Zi(r, I);
  }
  function x() {
    const {
      _bufferIndex: I,
      _index: F,
      line: B,
      column: N,
      offset: P
    } = i;
    return {
      _bufferIndex: I,
      _index: F,
      line: B,
      column: N,
      offset: P
    };
  }
  function y(I) {
    l[I.line] = I.column, k();
  }
  function A() {
    let I;
    for (; i._index < r.length; ) {
      const F = r[i._index];
      if (typeof F == "string")
        for (I = i._index, i._bufferIndex < 0 && (i._bufferIndex = 0); i._index === I && i._bufferIndex < F.length; )
          S(F.charCodeAt(i._bufferIndex));
      else
        S(F);
    }
  }
  function S(I) {
    g = g(I);
  }
  function C(I) {
    E(I) ? (i.line++, i.column = 1, i.offset += I === -3 ? 2 : 1, k()) : I !== -1 && (i.column++, i.offset++), i._bufferIndex < 0 ? i._index++ : (i._bufferIndex++, i._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    r[i._index].length && (i._bufferIndex = -1, i._index++)), s.previous = I;
  }
  function w(I, F) {
    const B = F || {};
    return B.type = I, B.start = x(), s.events.push(["enter", B, s]), a.push(B), B;
  }
  function O(I) {
    const F = a.pop();
    return F.end = x(), s.events.push(["exit", F, s]), F;
  }
  function D(I, F) {
    R(I, F.from);
  }
  function b(I, F) {
    F.restore();
  }
  function L(I, F) {
    return B;
    function B(N, P, V) {
      let q, G, rn, f;
      return Array.isArray(N) ? (
        /* c8 ignore next 1 */
        un(N)
      ) : "tokenize" in N ? (
        // Looks like a construct.
        un([
          /** @type {Construct} */
          N
        ])
      ) : J(N);
      function J(j) {
        return kn;
        function kn(on) {
          const mn = on !== null && j[on], gn = on !== null && j.null, En = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(mn) ? mn : mn ? [mn] : [],
            ...Array.isArray(gn) ? gn : gn ? [gn] : []
          ];
          return un(En)(on);
        }
      }
      function un(j) {
        return q = j, G = 0, j.length === 0 ? V : m(j[G]);
      }
      function m(j) {
        return kn;
        function kn(on) {
          return f = H(), rn = j, j.partial || (s.currentConstruct = j), j.name && s.parser.constructs.disable.null.includes(j.name) ? fn() : j.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            F ? Object.assign(Object.create(s), F) : s,
            h,
            X,
            fn
          )(on);
        }
      }
      function X(j) {
        return I(rn, f), P;
      }
      function fn(j) {
        return f.restore(), ++G < q.length ? m(q[G]) : V;
      }
    }
  }
  function R(I, F) {
    I.resolveAll && !u.includes(I) && u.push(I), I.resolve && Z(s.events, F, s.events.length - F, I.resolve(s.events.slice(F), s)), I.resolveTo && (s.events = I.resolveTo(s.events, s));
  }
  function H() {
    const I = x(), F = s.previous, B = s.currentConstruct, N = s.events.length, P = Array.from(a);
    return {
      from: N,
      restore: V
    };
    function V() {
      i = I, s.previous = F, s.currentConstruct = B, s.events.length = N, a = P, k();
    }
  }
  function k() {
    i.line in l && i.column < 2 && (i.column = l[i.line], i.offset += l[i.line] - 1);
  }
}
function Zi(n, e) {
  const t = e.start._index, i = e.start._bufferIndex, l = e.end._index, u = e.end._bufferIndex;
  let r;
  if (t === l)
    r = [n[t].slice(i, u)];
  else {
    if (r = n.slice(t, l), i > -1) {
      const a = r[0];
      typeof a == "string" ? r[0] = a.slice(i) : r.shift();
    }
    u > 0 && r.push(n[l].slice(0, u));
  }
  return r;
}
function Gi(n, e) {
  let t = -1;
  const i = [];
  let l;
  for (; ++t < n.length; ) {
    const u = n[t];
    let r;
    if (typeof u == "string")
      r = u;
    else switch (u) {
      case -5: {
        r = "\r";
        break;
      }
      case -4: {
        r = `
`;
        break;
      }
      case -3: {
        r = `\r
`;
        break;
      }
      case -2: {
        r = e ? " " : "	";
        break;
      }
      case -1: {
        if (!e && l) continue;
        r = " ";
        break;
      }
      default:
        r = String.fromCharCode(u);
    }
    l = u === -2, i.push(r);
  }
  return i.join("");
}
function Ji(n) {
  const i = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      lt([Qi, ...(n || {}).extensions || []])
    ),
    content: l(ce),
    defined: [],
    document: l(me),
    flow: l(Li),
    lazy: {},
    string: l(Oi),
    text: l(Bi)
  };
  return i;
  function l(u) {
    return r;
    function r(a) {
      return Yi(i, u, a);
    }
  }
}
function Xi(n) {
  for (; !ft(n); )
    ;
  return n;
}
const et = /[\0\t\n\r]/g;
function Ki() {
  let n = 1, e = "", t = !0, i;
  return l;
  function l(u, r, a) {
    const h = [];
    let s, g, o, p, c;
    for (u = e + (typeof u == "string" ? u.toString() : new TextDecoder(r || void 0).decode(u)), o = 0, e = "", t && (u.charCodeAt(0) === 65279 && o++, t = void 0); o < u.length; ) {
      if (et.lastIndex = o, s = et.exec(u), p = s && s.index !== void 0 ? s.index : u.length, c = u.charCodeAt(p), !s) {
        e = u.slice(o);
        break;
      }
      if (c === 10 && o === p && i)
        h.push(-3), i = void 0;
      else
        switch (i && (h.push(-5), i = void 0), o < p && (h.push(u.slice(o, p)), n += p - o), c) {
          case 0: {
            h.push(65533), n++;
            break;
          }
          case 9: {
            for (g = Math.ceil(n / 4) * 4, h.push(-2); n++ < g; ) h.push(-1);
            break;
          }
          case 10: {
            h.push(-4), n = 1;
            break;
          }
          default:
            i = !0, n = 1;
        }
      o = p + 1;
    }
    return a && (i && h.push(-5), e && h.push(e), h.push(null)), h;
  }
}
function vi(n, e, t) {
  return typeof e != "string" && (t = e, e = void 0), he(t)(Xi(Ji(t).document().write(Ki()(n, e, !0))));
}
const nr = {
  tokenize: lr,
  partial: !0
}, bt = {
  tokenize: ar,
  partial: !0
}, St = {
  tokenize: or,
  partial: !0
}, dt = {
  tokenize: sr,
  partial: !0
}, tr = {
  tokenize: hr,
  partial: !0
}, wt = {
  name: "wwwAutolink",
  tokenize: rr,
  previous: yt
}, Ct = {
  name: "protocolAutolink",
  tokenize: ur,
  previous: It
}, an = {
  name: "emailAutolink",
  tokenize: ir,
  previous: zt
}, en = {};
function er() {
  return {
    text: en
  };
}
let hn = 48;
for (; hn < 123; )
  en[hn] = an, hn++, hn === 58 ? hn = 65 : hn === 91 && (hn = 97);
en[43] = an;
en[45] = an;
en[46] = an;
en[95] = an;
en[72] = [an, Ct];
en[104] = [an, Ct];
en[87] = [an, wt];
en[119] = [an, wt];
function ir(n, e, t) {
  const i = this;
  let l, u;
  return r;
  function r(o) {
    return !On(o) || !zt.call(i, i.previous) || Rn(i.events) ? t(o) : (n.enter("literalAutolink"), n.enter("literalAutolinkEmail"), a(o));
  }
  function a(o) {
    return On(o) ? (n.consume(o), a) : o === 64 ? (n.consume(o), h) : t(o);
  }
  function h(o) {
    return o === 46 ? n.check(tr, g, s)(o) : o === 45 || o === 95 || U(o) ? (u = !0, n.consume(o), h) : g(o);
  }
  function s(o) {
    return n.consume(o), l = !0, h;
  }
  function g(o) {
    return u && l && Q(i.previous) ? (n.exit("literalAutolinkEmail"), n.exit("literalAutolink"), e(o)) : t(o);
  }
}
function rr(n, e, t) {
  const i = this;
  return l;
  function l(r) {
    return r !== 87 && r !== 119 || !yt.call(i, i.previous) || Rn(i.events) ? t(r) : (n.enter("literalAutolink"), n.enter("literalAutolinkWww"), n.check(nr, n.attempt(bt, n.attempt(St, u), t), t)(r));
  }
  function u(r) {
    return n.exit("literalAutolinkWww"), n.exit("literalAutolink"), e(r);
  }
}
function ur(n, e, t) {
  const i = this;
  let l = "", u = !1;
  return r;
  function r(o) {
    return (o === 72 || o === 104) && It.call(i, i.previous) && !Rn(i.events) ? (n.enter("literalAutolink"), n.enter("literalAutolinkHttp"), l += String.fromCodePoint(o), n.consume(o), a) : t(o);
  }
  function a(o) {
    if (Q(o) && l.length < 5)
      return l += String.fromCodePoint(o), n.consume(o), a;
    if (o === 58) {
      const p = l.toLowerCase();
      if (p === "http" || p === "https")
        return n.consume(o), h;
    }
    return t(o);
  }
  function h(o) {
    return o === 47 ? (n.consume(o), u ? s : (u = !0, h)) : t(o);
  }
  function s(o) {
    return o === null || In(o) || M(o) || xn(o) || Bn(o) ? t(o) : n.attempt(bt, n.attempt(St, g), t)(o);
  }
  function g(o) {
    return n.exit("literalAutolinkHttp"), n.exit("literalAutolink"), e(o);
  }
}
function lr(n, e, t) {
  let i = 0;
  return l;
  function l(r) {
    return (r === 87 || r === 119) && i < 3 ? (i++, n.consume(r), l) : r === 46 && i === 3 ? (n.consume(r), u) : t(r);
  }
  function u(r) {
    return r === null ? t(r) : e(r);
  }
}
function ar(n, e, t) {
  let i, l, u;
  return r;
  function r(s) {
    return s === 46 || s === 95 ? n.check(dt, h, a)(s) : s === null || M(s) || xn(s) || s !== 45 && Bn(s) ? h(s) : (u = !0, n.consume(s), r);
  }
  function a(s) {
    return s === 95 ? i = !0 : (l = i, i = void 0), n.consume(s), r;
  }
  function h(s) {
    return l || i || !u ? t(s) : e(s);
  }
}
function or(n, e) {
  let t = 0, i = 0;
  return l;
  function l(r) {
    return r === 40 ? (t++, n.consume(r), l) : r === 41 && i < t ? u(r) : r === 33 || r === 34 || r === 38 || r === 39 || r === 41 || r === 42 || r === 44 || r === 46 || r === 58 || r === 59 || r === 60 || r === 63 || r === 93 || r === 95 || r === 126 ? n.check(dt, e, u)(r) : r === null || M(r) || xn(r) ? e(r) : (n.consume(r), l);
  }
  function u(r) {
    return r === 41 && i++, n.consume(r), l;
  }
}
function sr(n, e, t) {
  return i;
  function i(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (n.consume(a), i) : a === 38 ? (n.consume(a), u) : a === 93 ? (n.consume(a), l) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || M(a) || xn(a) ? e(a) : t(a)
    );
  }
  function l(a) {
    return a === null || a === 40 || a === 91 || M(a) || xn(a) ? e(a) : i(a);
  }
  function u(a) {
    return Q(a) ? r(a) : t(a);
  }
  function r(a) {
    return a === 59 ? (n.consume(a), i) : Q(a) ? (n.consume(a), r) : t(a);
  }
}
function hr(n, e, t) {
  return i;
  function i(u) {
    return n.consume(u), l;
  }
  function l(u) {
    return U(u) ? t(u) : e(u);
  }
}
function yt(n) {
  return n === null || n === 40 || n === 42 || n === 95 || n === 91 || n === 93 || n === 126 || M(n);
}
function It(n) {
  return !Q(n);
}
function zt(n) {
  return !(n === 47 || On(n));
}
function On(n) {
  return n === 43 || n === 45 || n === 46 || n === 95 || U(n);
}
function Rn(n) {
  let e = n.length, t = !1;
  for (; e--; ) {
    const i = n[e][1];
    if ((i.type === "labelLink" || i.type === "labelImage") && !i._balanced) {
      t = !0;
      break;
    }
    if (i._gfmAutolinkLiteralWalkedInto) {
      t = !1;
      break;
    }
  }
  return n.length > 0 && !t && (n[n.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), t;
}
function cr() {
  return {
    exit: {
      literalAutolinkEmail: mr,
      literalAutolinkHttp: gr,
      literalAutolinkWww: fr
    }
  };
}
function fr(n) {
  Nn.call(this, n, "http://");
}
function mr(n) {
  Nn.call(this, n, "mailto:");
}
function gr(n) {
  Nn.call(this, n);
}
function Nn(n, e) {
  const t = this.sliceSerialize(n);
  this.tag('<a href="' + cn((e || "") + t) + '">'), this.raw(this.encode(t)), this.tag("</a>");
}
const pr = {
  tokenize: yr,
  partial: !0
};
function xr() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: dr,
        continuation: {
          tokenize: wr
        },
        exit: Cr
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: Sr
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: kr,
        resolveTo: br
      }
    }
  };
}
function kr(n, e, t) {
  const i = this;
  let l = i.events.length;
  const u = i.parser.gfmFootnotes || (i.parser.gfmFootnotes = []);
  let r;
  for (; l--; ) {
    const h = i.events[l][1];
    if (h.type === "labelImage") {
      r = h;
      break;
    }
    if (h.type === "gfmFootnoteCall" || h.type === "labelLink" || h.type === "label" || h.type === "image" || h.type === "link")
      break;
  }
  return a;
  function a(h) {
    if (!r || !r._balanced)
      return t(h);
    const s = tn(i.sliceSerialize({
      start: r.end,
      end: i.now()
    }));
    return s.codePointAt(0) !== 94 || !u.includes(s.slice(1)) ? t(h) : (n.enter("gfmFootnoteCallLabelMarker"), n.consume(h), n.exit("gfmFootnoteCallLabelMarker"), e(h));
  }
}
function br(n, e) {
  let t = n.length;
  for (; t--; )
    if (n[t][1].type === "labelImage" && n[t][0] === "enter") {
      n[t][1];
      break;
    }
  n[t + 1][1].type = "data", n[t + 3][1].type = "gfmFootnoteCallLabelMarker";
  const i = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, n[t + 3][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  }, l = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, n[t + 3][1].end),
    end: Object.assign({}, n[t + 3][1].end)
  };
  l.end.column++, l.end.offset++, l.end._bufferIndex++;
  const u = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, l.end),
    end: Object.assign({}, n[n.length - 1][1].start)
  }, r = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, u.start),
    end: Object.assign({}, u.end)
  }, a = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    n[t + 1],
    n[t + 2],
    ["enter", i, e],
    // The `[`
    n[t + 3],
    n[t + 4],
    // The `^`.
    ["enter", l, e],
    ["exit", l, e],
    // Everything in between.
    ["enter", u, e],
    ["enter", r, e],
    ["exit", r, e],
    ["exit", u, e],
    // The ending (`]`, properly parsed and labelled).
    n[n.length - 2],
    n[n.length - 1],
    ["exit", i, e]
  ];
  return n.splice(t, n.length - t + 1, ...a), n;
}
function Sr(n, e, t) {
  const i = this, l = i.parser.gfmFootnotes || (i.parser.gfmFootnotes = []);
  let u = 0, r;
  return a;
  function a(o) {
    return n.enter("gfmFootnoteCall"), n.enter("gfmFootnoteCallLabelMarker"), n.consume(o), n.exit("gfmFootnoteCallLabelMarker"), h;
  }
  function h(o) {
    return o !== 94 ? t(o) : (n.enter("gfmFootnoteCallMarker"), n.consume(o), n.exit("gfmFootnoteCallMarker"), n.enter("gfmFootnoteCallString"), n.enter("chunkString").contentType = "string", s);
  }
  function s(o) {
    if (
      // Too long.
      u > 999 || // Closing brace with nothing.
      o === 93 && !r || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      o === null || o === 91 || M(o)
    )
      return t(o);
    if (o === 93) {
      n.exit("chunkString");
      const p = n.exit("gfmFootnoteCallString");
      return l.includes(tn(i.sliceSerialize(p))) ? (n.enter("gfmFootnoteCallLabelMarker"), n.consume(o), n.exit("gfmFootnoteCallLabelMarker"), n.exit("gfmFootnoteCall"), e) : t(o);
    }
    return M(o) || (r = !0), u++, n.consume(o), o === 92 ? g : s;
  }
  function g(o) {
    return o === 91 || o === 92 || o === 93 ? (n.consume(o), u++, s) : s(o);
  }
}
function dr(n, e, t) {
  const i = this, l = i.parser.gfmFootnotes || (i.parser.gfmFootnotes = []);
  let u, r = 0, a;
  return h;
  function h(x) {
    return n.enter("gfmFootnoteDefinition")._container = !0, n.enter("gfmFootnoteDefinitionLabel"), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(x), n.exit("gfmFootnoteDefinitionLabelMarker"), s;
  }
  function s(x) {
    return x === 94 ? (n.enter("gfmFootnoteDefinitionMarker"), n.consume(x), n.exit("gfmFootnoteDefinitionMarker"), n.enter("gfmFootnoteDefinitionLabelString"), n.enter("chunkString").contentType = "string", g) : t(x);
  }
  function g(x) {
    if (
      // Too long.
      r > 999 || // Closing brace with nothing.
      x === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      x === null || x === 91 || M(x)
    )
      return t(x);
    if (x === 93) {
      n.exit("chunkString");
      const y = n.exit("gfmFootnoteDefinitionLabelString");
      return u = tn(i.sliceSerialize(y)), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(x), n.exit("gfmFootnoteDefinitionLabelMarker"), n.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return M(x) || (a = !0), r++, n.consume(x), x === 92 ? o : g;
  }
  function o(x) {
    return x === 91 || x === 92 || x === 93 ? (n.consume(x), r++, g) : g(x);
  }
  function p(x) {
    return x === 58 ? (n.enter("definitionMarker"), n.consume(x), n.exit("definitionMarker"), l.includes(u) || l.push(u), _(n, c, "gfmFootnoteDefinitionWhitespace")) : t(x);
  }
  function c(x) {
    return e(x);
  }
}
function wr(n, e, t) {
  return n.check(wn, e, n.attempt(pr, e, t));
}
function Cr(n) {
  n.exit("gfmFootnoteDefinition");
}
function yr(n, e, t) {
  const i = this;
  return _(n, l, "gfmFootnoteDefinitionIndent", 5);
  function l(u) {
    const r = i.events[i.events.length - 1];
    return r && r[1].type === "gfmFootnoteDefinitionIndent" && r[2].sliceSerialize(r[1], !0).length === 4 ? e(u) : t(u);
  }
}
const Ir = {}.hasOwnProperty, zr = {};
function Fr(n, e) {
  return "Back to reference " + (n + 1) + (e > 1 ? "-" + e : "");
}
function Er(n) {
  const e = zr, t = e.label || "Footnotes", i = e.labelTagName || "h2", l = e.labelAttributes === null || e.labelAttributes === void 0 ? 'class="sr-only"' : e.labelAttributes, u = e.backLabel || Fr, r = e.clobberPrefix === null || e.clobberPrefix === void 0 ? "user-content-" : e.clobberPrefix;
  return {
    enter: {
      gfmFootnoteDefinition() {
        this.getData("tightStack").push(!1);
      },
      gfmFootnoteDefinitionLabelString() {
        this.buffer();
      },
      gfmFootnoteCallString() {
        this.buffer();
      }
    },
    exit: {
      gfmFootnoteDefinition() {
        let a = this.getData("gfmFootnoteDefinitions");
        const h = this.getData("gfmFootnoteDefinitionStack"), s = this.getData("tightStack"), g = h.pop(), o = this.resume();
        a || this.setData("gfmFootnoteDefinitions", a = {}), Ir.call(a, g) || (a[g] = o), s.pop(), this.setData("slurpOneLineEnding", !0), this.setData("lastWasTag");
      },
      gfmFootnoteDefinitionLabelString(a) {
        let h = this.getData("gfmFootnoteDefinitionStack");
        h || this.setData("gfmFootnoteDefinitionStack", h = []), h.push(tn(this.sliceSerialize(a))), this.resume(), this.buffer();
      },
      gfmFootnoteCallString(a) {
        let h = this.getData("gfmFootnoteCallOrder"), s = this.getData("gfmFootnoteCallCounts");
        const g = tn(this.sliceSerialize(a));
        let o;
        this.resume(), h || this.setData("gfmFootnoteCallOrder", h = []), s || this.setData("gfmFootnoteCallCounts", s = {});
        const p = h.indexOf(g), c = cn(g.toLowerCase());
        p === -1 ? (h.push(g), s[g] = 1, o = h.length) : (s[g]++, o = p + 1);
        const x = s[g];
        this.tag('<sup><a href="#' + r + "fn-" + c + '" id="' + r + "fnref-" + c + (x > 1 ? "-" + x : "") + '" data-footnote-ref="" aria-describedby="footnote-label">' + String(o) + "</a></sup>");
      },
      null() {
        const a = this.getData("gfmFootnoteCallOrder") || [], h = this.getData("gfmFootnoteCallCounts") || {}, s = this.getData("gfmFootnoteDefinitions") || {};
        let g = -1;
        for (a.length > 0 && (this.lineEndingIfNeeded(), this.tag('<section data-footnotes="" class="footnotes"><' + i + ' id="footnote-label"' + (l ? " " + l : "") + ">"), this.raw(this.encode(t)), this.tag("</" + i + ">"), this.lineEndingIfNeeded(), this.tag("<ol>")); ++g < a.length; ) {
          const o = a[g], p = cn(o.toLowerCase());
          let c = 0;
          const x = [];
          for (; ++c <= h[o]; )
            x.push('<a href="#' + r + "fnref-" + p + (c > 1 ? "-" + c : "") + '" data-footnote-backref="" aria-label="' + this.encode(typeof u == "string" ? u : u(g, c)) + '" class="data-footnote-backref">↩' + (c > 1 ? "<sup>" + c + "</sup>" : "") + "</a>");
          const y = x.join(" ");
          let A = !1;
          this.lineEndingIfNeeded(), this.tag('<li id="' + r + "fn-" + p + '">'), this.lineEndingIfNeeded(), this.tag(s[o].replace(/<\/p>(?:\r?\n|\r)?$/, function(S) {
            return A = !0, " " + y + S;
          })), A || (this.lineEndingIfNeeded(), this.tag(y)), this.lineEndingIfNeeded(), this.tag("</li>");
        }
        a.length > 0 && (this.lineEndingIfNeeded(), this.tag("</ol>"), this.lineEndingIfNeeded(), this.tag("</section>"));
      }
    }
  };
}
function Ar() {
  return {
    enter: {
      strikethrough() {
        this.tag("<del>");
      }
    },
    exit: {
      strikethrough() {
        this.tag("</del>");
      }
    }
  };
}
function Dr(n) {
  let t = {}.singleTilde;
  const i = {
    name: "strikethrough",
    tokenize: u,
    resolveAll: l
  };
  return t == null && (t = !0), {
    text: {
      126: i
    },
    insideSpan: {
      null: [i]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function l(r, a) {
    let h = -1;
    for (; ++h < r.length; )
      if (r[h][0] === "enter" && r[h][1].type === "strikethroughSequenceTemporary" && r[h][1]._close) {
        let s = h;
        for (; s--; )
          if (r[s][0] === "exit" && r[s][1].type === "strikethroughSequenceTemporary" && r[s][1]._open && // If the sizes are the same:
          r[h][1].end.offset - r[h][1].start.offset === r[s][1].end.offset - r[s][1].start.offset) {
            r[h][1].type = "strikethroughSequence", r[s][1].type = "strikethroughSequence";
            const g = {
              type: "strikethrough",
              start: Object.assign({}, r[s][1].start),
              end: Object.assign({}, r[h][1].end)
            }, o = {
              type: "strikethroughText",
              start: Object.assign({}, r[s][1].end),
              end: Object.assign({}, r[h][1].start)
            }, p = [["enter", g, a], ["enter", r[s][1], a], ["exit", r[s][1], a], ["enter", o, a]], c = a.parser.constructs.insideSpan.null;
            c && Z(p, p.length, 0, Fn(c, r.slice(s + 1, h), a)), Z(p, p.length, 0, [["exit", o, a], ["enter", r[h][1], a], ["exit", r[h][1], a], ["exit", g, a]]), Z(r, s - 1, h - s + 3, p), h = s + p.length - 2;
            break;
          }
      }
    for (h = -1; ++h < r.length; )
      r[h][1].type === "strikethroughSequenceTemporary" && (r[h][1].type = "data");
    return r;
  }
  function u(r, a, h) {
    const s = this.previous, g = this.events;
    let o = 0;
    return p;
    function p(x) {
      return s === 126 && g[g.length - 1][1].type !== "characterEscape" ? h(x) : (r.enter("strikethroughSequenceTemporary"), c(x));
    }
    function c(x) {
      const y = zn(s);
      if (x === 126)
        return o > 1 ? h(x) : (r.consume(x), o++, c);
      if (o < 2 && !t) return h(x);
      const A = r.exit("strikethroughSequenceTemporary"), S = zn(x);
      return A._open = !S || S === 2 && !!y, A._close = !y || y === 2 && !!S, a(x);
    }
  }
}
const Tn = {
  none: "",
  left: ' align="left"',
  right: ' align="right"',
  center: ' align="center"'
};
function Tr() {
  return {
    enter: {
      table(n) {
        const e = n._align;
        this.lineEndingIfNeeded(), this.tag("<table>"), this.setData("tableAlign", e);
      },
      tableBody() {
        this.tag("<tbody>");
      },
      tableData() {
        const n = this.getData("tableAlign"), e = this.getData("tableColumn"), t = Tn[n[e]];
        t === void 0 ? this.buffer() : (this.lineEndingIfNeeded(), this.tag("<td" + t + ">"));
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("<thead>");
      },
      tableHeader() {
        const n = this.getData("tableAlign"), e = this.getData("tableColumn"), t = Tn[n[e]];
        this.lineEndingIfNeeded(), this.tag("<th" + t + ">");
      },
      tableRow() {
        this.setData("tableColumn", 0), this.lineEndingIfNeeded(), this.tag("<tr>");
      }
    },
    exit: {
      // Overwrite the default code text data handler to unescape escaped pipes when
      // they are in tables.
      codeTextData(n) {
        let e = this.sliceSerialize(n);
        this.getData("tableAlign") && (e = e.replace(/\\([\\|])/g, Lr)), this.raw(this.encode(e));
      },
      table() {
        this.setData("tableAlign"), this.setData("slurpAllLineEndings"), this.lineEndingIfNeeded(), this.tag("</table>");
      },
      tableBody() {
        this.lineEndingIfNeeded(), this.tag("</tbody>");
      },
      tableData() {
        const n = this.getData("tableAlign"), e = this.getData("tableColumn");
        e in n ? (this.tag("</td>"), this.setData("tableColumn", e + 1)) : this.resume();
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("</thead>");
      },
      tableHeader() {
        const n = this.getData("tableColumn");
        this.tag("</th>"), this.setData("tableColumn", n + 1);
      },
      tableRow() {
        const n = this.getData("tableAlign");
        let e = this.getData("tableColumn");
        for (; e < n.length; )
          this.lineEndingIfNeeded(), this.tag("<td" + Tn[n[e]] + "></td>"), e++;
        this.setData("tableColumn", e), this.lineEndingIfNeeded(), this.tag("</tr>");
      }
    }
  };
}
function Lr(n, e) {
  return e === "|" ? e : n;
}
class _r {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(e, t, i) {
    Pr(this, e, t, i);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(e) {
    if (this.map.sort(function(u, r) {
      return u[0] - r[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const i = [];
    for (; t > 0; )
      t -= 1, i.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
    i.push(e.slice()), e.length = 0;
    let l = i.pop();
    for (; l; ) {
      for (const u of l)
        e.push(u);
      l = i.pop();
    }
    this.map.length = 0;
  }
}
function Pr(n, e, t, i) {
  let l = 0;
  if (!(t === 0 && i.length === 0)) {
    for (; l < n.map.length; ) {
      if (n.map[l][0] === e) {
        n.map[l][1] += t, n.map[l][2].push(...i);
        return;
      }
      l += 1;
    }
    n.map.push([e, t, i]);
  }
}
function Or(n, e) {
  let t = !1;
  const i = [];
  for (; e < n.length; ) {
    const l = n[e];
    if (t) {
      if (l[0] === "enter")
        l[1].type === "tableContent" && i.push(n[e + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (l[1].type === "tableContent") {
        if (n[e - 1][1].type === "tableDelimiterMarker") {
          const u = i.length - 1;
          i[u] = i[u] === "left" ? "center" : "right";
        }
      } else if (l[1].type === "tableDelimiterRow")
        break;
    } else l[0] === "enter" && l[1].type === "tableDelimiterRow" && (t = !0);
    e += 1;
  }
  return i;
}
function Br() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Mr,
        resolveAll: Rr
      }
    }
  };
}
function Mr(n, e, t) {
  const i = this;
  let l = 0, u = 0, r;
  return a;
  function a(k) {
    let I = i.events.length - 1;
    for (; I > -1; ) {
      const N = i.events[I][1].type;
      if (N === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      N === "linePrefix") I--;
      else break;
    }
    const F = I > -1 ? i.events[I][1].type : null, B = F === "tableHead" || F === "tableRow" ? b : h;
    return B === b && i.parser.lazy[i.now().line] ? t(k) : B(k);
  }
  function h(k) {
    return n.enter("tableHead"), n.enter("tableRow"), s(k);
  }
  function s(k) {
    return k === 124 || (r = !0, u += 1), g(k);
  }
  function g(k) {
    return k === null ? t(k) : E(k) ? u > 1 ? (u = 0, i.interrupt = !0, n.exit("tableRow"), n.enter("lineEnding"), n.consume(k), n.exit("lineEnding"), c) : t(k) : T(k) ? _(n, g, "whitespace")(k) : (u += 1, r && (r = !1, l += 1), k === 124 ? (n.enter("tableCellDivider"), n.consume(k), n.exit("tableCellDivider"), r = !0, g) : (n.enter("data"), o(k)));
  }
  function o(k) {
    return k === null || k === 124 || M(k) ? (n.exit("data"), g(k)) : (n.consume(k), k === 92 ? p : o);
  }
  function p(k) {
    return k === 92 || k === 124 ? (n.consume(k), o) : o(k);
  }
  function c(k) {
    return i.interrupt = !1, i.parser.lazy[i.now().line] ? t(k) : (n.enter("tableDelimiterRow"), r = !1, T(k) ? _(n, x, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : x(k));
  }
  function x(k) {
    return k === 45 || k === 58 ? A(k) : k === 124 ? (r = !0, n.enter("tableCellDivider"), n.consume(k), n.exit("tableCellDivider"), y) : D(k);
  }
  function y(k) {
    return T(k) ? _(n, A, "whitespace")(k) : A(k);
  }
  function A(k) {
    return k === 58 ? (u += 1, r = !0, n.enter("tableDelimiterMarker"), n.consume(k), n.exit("tableDelimiterMarker"), S) : k === 45 ? (u += 1, S(k)) : k === null || E(k) ? O(k) : D(k);
  }
  function S(k) {
    return k === 45 ? (n.enter("tableDelimiterFiller"), C(k)) : D(k);
  }
  function C(k) {
    return k === 45 ? (n.consume(k), C) : k === 58 ? (r = !0, n.exit("tableDelimiterFiller"), n.enter("tableDelimiterMarker"), n.consume(k), n.exit("tableDelimiterMarker"), w) : (n.exit("tableDelimiterFiller"), w(k));
  }
  function w(k) {
    return T(k) ? _(n, O, "whitespace")(k) : O(k);
  }
  function O(k) {
    return k === 124 ? x(k) : k === null || E(k) ? !r || l !== u ? D(k) : (n.exit("tableDelimiterRow"), n.exit("tableHead"), e(k)) : D(k);
  }
  function D(k) {
    return t(k);
  }
  function b(k) {
    return n.enter("tableRow"), L(k);
  }
  function L(k) {
    return k === 124 ? (n.enter("tableCellDivider"), n.consume(k), n.exit("tableCellDivider"), L) : k === null || E(k) ? (n.exit("tableRow"), e(k)) : T(k) ? _(n, L, "whitespace")(k) : (n.enter("data"), R(k));
  }
  function R(k) {
    return k === null || k === 124 || M(k) ? (n.exit("data"), L(k)) : (n.consume(k), k === 92 ? H : R);
  }
  function H(k) {
    return k === 92 || k === 124 ? (n.consume(k), R) : R(k);
  }
}
function Rr(n, e) {
  let t = -1, i = !0, l = 0, u = [0, 0, 0, 0], r = [0, 0, 0, 0], a = !1, h = 0, s, g, o;
  const p = new _r();
  for (; ++t < n.length; ) {
    const c = n[t], x = c[1];
    c[0] === "enter" ? x.type === "tableHead" ? (a = !1, h !== 0 && (it(p, e, h, s, g), g = void 0, h = 0), s = {
      type: "table",
      start: Object.assign({}, x.start),
      // Note: correct end is set later.
      end: Object.assign({}, x.end)
    }, p.add(t, 0, [["enter", s, e]])) : x.type === "tableRow" || x.type === "tableDelimiterRow" ? (i = !0, o = void 0, u = [0, 0, 0, 0], r = [0, t + 1, 0, 0], a && (a = !1, g = {
      type: "tableBody",
      start: Object.assign({}, x.start),
      // Note: correct end is set later.
      end: Object.assign({}, x.end)
    }, p.add(t, 0, [["enter", g, e]])), l = x.type === "tableDelimiterRow" ? 2 : g ? 3 : 1) : l && (x.type === "data" || x.type === "tableDelimiterMarker" || x.type === "tableDelimiterFiller") ? (i = !1, r[2] === 0 && (u[1] !== 0 && (r[0] = r[1], o = Cn(p, e, u, l, void 0, o), u = [0, 0, 0, 0]), r[2] = t)) : x.type === "tableCellDivider" && (i ? i = !1 : (u[1] !== 0 && (r[0] = r[1], o = Cn(p, e, u, l, void 0, o)), u = r, r = [u[1], t, 0, 0])) : x.type === "tableHead" ? (a = !0, h = t) : x.type === "tableRow" || x.type === "tableDelimiterRow" ? (h = t, u[1] !== 0 ? (r[0] = r[1], o = Cn(p, e, u, l, t, o)) : r[1] !== 0 && (o = Cn(p, e, r, l, t, o)), l = 0) : l && (x.type === "data" || x.type === "tableDelimiterMarker" || x.type === "tableDelimiterFiller") && (r[3] = t);
  }
  for (h !== 0 && it(p, e, h, s, g), p.consume(e.events), t = -1; ++t < e.events.length; ) {
    const c = e.events[t];
    c[0] === "enter" && c[1].type === "table" && (c[1]._align = Or(e.events, t));
  }
  return n;
}
function Cn(n, e, t, i, l, u) {
  const r = i === 1 ? "tableHeader" : i === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  t[0] !== 0 && (u.end = Object.assign({}, pn(e.events, t[0])), n.add(t[0], 0, [["exit", u, e]]));
  const h = pn(e.events, t[1]);
  if (u = {
    type: r,
    start: Object.assign({}, h),
    // Note: correct end is set later.
    end: Object.assign({}, h)
  }, n.add(t[1], 0, [["enter", u, e]]), t[2] !== 0) {
    const s = pn(e.events, t[2]), g = pn(e.events, t[3]), o = {
      type: a,
      start: Object.assign({}, s),
      end: Object.assign({}, g)
    };
    if (n.add(t[2], 0, [["enter", o, e]]), i !== 2) {
      const p = e.events[t[2]], c = e.events[t[3]];
      if (p[1].end = Object.assign({}, c[1].end), p[1].type = "chunkText", p[1].contentType = "text", t[3] > t[2] + 1) {
        const x = t[2] + 1, y = t[3] - t[2] - 1;
        n.add(x, y, []);
      }
    }
    n.add(t[3] + 1, 0, [["exit", o, e]]);
  }
  return l !== void 0 && (u.end = Object.assign({}, pn(e.events, l)), n.add(l, 0, [["exit", u, e]]), u = void 0), u;
}
function it(n, e, t, i, l) {
  const u = [], r = pn(e.events, t);
  l && (l.end = Object.assign({}, r), u.push(["exit", l, e])), i.end = Object.assign({}, r), u.push(["exit", i, e]), n.add(t + 1, 0, u);
}
function pn(n, e) {
  const t = n[e], i = t[0] === "enter" ? "start" : "end";
  return t[1][i];
}
const Ft = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi, Nr = new RegExp("^" + Ft.source, "i");
function Hr() {
  return {
    exit: {
      htmlFlowData(n) {
        rt.call(this, n, Ft);
      },
      htmlTextData(n) {
        rt.call(this, n, Nr);
      }
    }
  };
}
function rt(n, e) {
  let t = this.sliceSerialize(n);
  this.options.allowDangerousHtml && (t = t.replace(e, "&lt;$1$2")), this.raw(this.encode(t));
}
function qr() {
  return {
    enter: {
      taskListCheck() {
        this.tag('<input type="checkbox" disabled="" ');
      }
    },
    exit: {
      taskListCheck() {
        this.tag("/>");
      },
      taskListCheckValueChecked() {
        this.tag('checked="" ');
      }
    }
  };
}
const jr = {
  name: "tasklistCheck",
  tokenize: Wr
};
function Vr() {
  return {
    text: {
      91: jr
    }
  };
}
function Wr(n, e, t) {
  const i = this;
  return l;
  function l(h) {
    return (
      // Exit if there’s stuff before.
      i.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !i._gfmTasklistFirstContentOfListItem ? t(h) : (n.enter("taskListCheck"), n.enter("taskListCheckMarker"), n.consume(h), n.exit("taskListCheckMarker"), u)
    );
  }
  function u(h) {
    return M(h) ? (n.enter("taskListCheckValueUnchecked"), n.consume(h), n.exit("taskListCheckValueUnchecked"), r) : h === 88 || h === 120 ? (n.enter("taskListCheckValueChecked"), n.consume(h), n.exit("taskListCheckValueChecked"), r) : t(h);
  }
  function r(h) {
    return h === 93 ? (n.enter("taskListCheckMarker"), n.consume(h), n.exit("taskListCheckMarker"), n.exit("taskListCheck"), a) : t(h);
  }
  function a(h) {
    return E(h) ? e(h) : T(h) ? n.check({
      tokenize: $r
    }, e, t)(h) : t(h);
  }
}
function $r(n, e, t) {
  return _(n, i, "whitespace");
  function i(l) {
    return l === null ? t(l) : e(l);
  }
}
function Ur(n) {
  return lt([
    er(),
    xr(),
    Dr(),
    Br(),
    Vr()
  ]);
}
function Qr(n) {
  return at([
    cr(),
    Er(),
    Ar(),
    Tr(),
    Hr(),
    qr()
  ]);
}
const Yr = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
class Gr {
  options;
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      extensions: [Ur()],
      htmlExtensions: [Qr(), this.createPresenterCodeBlockHtmlExtension()]
    };
  }
  // Operations - Render.
  render(e) {
    return vi(e, this.options);
  }
  // Utilities - Create presenter code block.
  createPresenterCodeBlockHtmlExtension() {
    let e;
    return {
      enter: {
        codeFenced() {
          this.buffer(), e = { codeContent: [], lang: "", meta: "" };
        },
        codeFencedFence() {
        },
        codeFencedFenceSequence() {
        },
        codeFencedFenceInfo(t) {
          e && (e.lang = this.sliceSerialize(t));
        },
        codeFencedFenceMeta(t) {
          e && (e.meta = this.sliceSerialize(t));
        },
        codeFlowValue(t) {
          e && e.codeContent.push(this.sliceSerialize(t));
        }
      },
      exit: {
        codeFlowValue() {
        },
        codeFencedFenceMeta() {
        },
        codeFencedFenceInfo() {
        },
        codeFencedFenceSequence() {
        },
        codeFencedFence() {
        },
        codeFenced() {
          const t = e || { codeContent: [], lang: "", meta: "" };
          this.resume();
          const i = t.codeContent.join(`
`), l = t.lang || "plain", u = t.meta || "";
          let r = "";
          l === "json" && u === "datapos-visual" ? r = `<div class="${u}" data-options="${encodeURIComponent(i)}"></div>` : l === "json" && u === "datapos-highcharts" ? r = `<div class="${u}" data-options="${encodeURIComponent(i)}"></div>` : r = `<div class="shj-lang-${l.replaceAll(/[^a-z0-9_-]/gi, "")}">${Zr(i)}</div>`, this.raw(r), e = void 0;
        }
      }
    };
  }
}
function Zr(n) {
  return n.replaceAll(/[&<>"']/g, (e) => Yr[e]);
}
export {
  Gr as MicromarkTool
};
