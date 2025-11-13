const Yn = document.createElement("i");
function st(n) {
  const r = "&" + n + ";";
  Yn.innerHTML = r;
  const t = Yn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && n !== "semi" || t === r ? !1 : t
  );
}
function K(n, r, t, e) {
  const a = n.length;
  let u = 0, i;
  if (r < 0 ? r = -r > a ? 0 : a + r : r = r > a ? a : r, t = t > 0 ? t : 0, e.length < 1e4)
    i = Array.from(e), i.unshift(r, t), n.splice(...i);
  else
    for (t && n.splice(r, t); u < e.length; )
      i = e.slice(u, u + 1e4), i.unshift(r, 0), n.splice(...i), u += 1e4, r += 1e4;
}
function Y(n, r) {
  return n.length > 0 ? (K(n, n.length, 0, r), n) : r;
}
const vn = {}.hasOwnProperty;
function ht(n) {
  const r = {};
  let t = -1;
  for (; ++t < n.length; )
    ie(r, n[t]);
  return r;
}
function ie(n, r) {
  let t;
  for (t in r) {
    const a = (vn.call(n, t) ? n[t] : void 0) || (n[t] = {}), u = r[t];
    let i;
    if (u)
      for (i in u) {
        vn.call(a, i) || (a[i] = []);
        const l = u[i];
        ue(
          // @ts-expect-error Looks like a list.
          a[i],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function ue(n, r) {
  let t = -1;
  const e = [];
  for (; ++t < r.length; )
    (r[t].add === "after" ? n : e).push(r[t]);
  K(n, 0, 0, e);
}
function ct(n) {
  const r = {};
  let t = -1;
  for (; ++t < n.length; )
    ae(r, n[t]);
  return r;
}
function ae(n, r) {
  let t;
  for (t in r) {
    const a = (vn.call(n, t) ? n[t] : void 0) || (n[t] = {}), u = r[t];
    let i;
    if (u)
      for (i in u)
        a[i] = u[i];
  }
}
function le(n, r) {
  const t = Number.parseInt(n, r);
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
const oe = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function gt(n) {
  return n.replace(/["&<>]/g, r);
  function r(t) {
    return "&" + oe[
      /** @type {keyof typeof characterReferences} */
      t
    ] + ";";
  }
}
function on(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const X = pn(/[A-Za-z]/), Z = pn(/[\dA-Za-z]/), se = pn(/[#-'*+\--9=?A-Z^-~]/);
function En(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const On = pn(/\d/), he = pn(/[\dA-Fa-f]/), ce = pn(/[!-/:-@[-`{-~]/);
function P(n) {
  return n !== null && n < -2;
}
function H(n) {
  return n !== null && (n < 0 || n === 32);
}
function v(n) {
  return n === -2 || n === -1 || n === 32;
}
const Rn = pn(/\p{P}|\p{S}/u), bn = pn(/\s/);
function pn(n) {
  return r;
  function r(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
function xn(n, r) {
  const t = gt(ge(n || ""));
  if (!r)
    return t;
  const e = t.indexOf(":"), a = t.indexOf("?"), u = t.indexOf("#"), i = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    e < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i > -1 && e > i || a > -1 && e > a || u > -1 && e > u || // It is a protocol, it should be allowed.
    r.test(t.slice(0, e)) ? t : ""
  );
}
function ge(n) {
  const r = [];
  let t = -1, e = 0, a = 0;
  for (; ++t < n.length; ) {
    const u = n.charCodeAt(t);
    let i = "";
    if (u === 37 && Z(n.charCodeAt(t + 1)) && Z(n.charCodeAt(t + 2)))
      a = 2;
    else if (u < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(u)) || (i = String.fromCharCode(u));
    else if (u > 55295 && u < 57344) {
      const l = n.charCodeAt(t + 1);
      u < 56320 && l > 56319 && l < 57344 ? (i = String.fromCharCode(u, l), a = 1) : i = "�";
    } else
      i = String.fromCharCode(u);
    i && (r.push(n.slice(e, t), encodeURIComponent(i)), e = t + a + 1, i = ""), a && (t += a, a = 0);
  }
  return r.join("") + n.slice(e);
}
const Zn = {}.hasOwnProperty, Xn = /^(https?|ircs?|mailto|xmpp)$/i, fe = /^https?$/i;
function pe(n) {
  const r = n || {};
  let t = !0;
  const e = {}, a = [[]], u = [], i = [], h = (
    /** @type {NormalizedHtmlExtension} */
    ct([{
      enter: {
        blockQuote: O,
        codeFenced: V,
        codeFencedFenceInfo: T,
        codeFencedFenceMeta: T,
        codeIndented: q,
        codeText: Zt,
        content: Rt,
        definition: _t,
        definitionDestinationString: vt,
        definitionLabelString: T,
        definitionTitleString: T,
        emphasis: Gt,
        htmlFlow: Qt,
        htmlText: Vn,
        image: W,
        label: T,
        link: nn,
        listItemMarker: z,
        listItemValue: b,
        listOrdered: L,
        listUnordered: I,
        paragraph: j,
        reference: T,
        resource: hn,
        resourceDestinationString: un,
        resourceTitleString: T,
        setextHeading: Ht,
        strong: Yt
      },
      exit: {
        atxHeading: qt,
        atxHeadingSequence: Nt,
        autolinkEmail: re,
        autolinkProtocol: ee,
        blockQuote: U,
        characterEscapeValue: wn,
        characterReferenceMarkerHexadecimal: Wn,
        characterReferenceMarkerNumeric: Wn,
        characterReferenceValue: te,
        codeFenced: f,
        codeFencedFence: Q,
        codeFencedFenceInfo: g,
        codeFencedFenceMeta: C,
        codeFlowValue: Ut,
        codeIndented: f,
        codeText: Xt,
        codeTextData: wn,
        data: wn,
        definition: Bt,
        definitionDestinationString: Ot,
        definitionLabelString: Pt,
        definitionTitleString: Mt,
        emphasis: Jt,
        hardBreakEscape: qn,
        hardBreakTrailing: qn,
        htmlFlow: jn,
        htmlFlowData: wn,
        htmlText: jn,
        htmlTextData: wn,
        image: dn,
        label: rn,
        labelText: $,
        lineEnding: Wt,
        link: dn,
        listOrdered: D,
        listUnordered: B,
        paragraph: N,
        reference: C,
        referenceString: tn,
        resource: C,
        resourceDestinationString: fn,
        resourceTitleString: Tn,
        setextHeading: Vt,
        setextHeadingLineSequence: jt,
        setextHeadingText: $t,
        strong: Kt,
        thematicBreak: ne
      }
    }, ...r.htmlExtensions || []])
  ), s = {
    definitions: e,
    tightStack: i
  }, p = {
    buffer: T,
    encode: m,
    getData: E,
    lineEndingIfNeeded: y,
    options: r,
    raw: x,
    resume: F,
    setData: w,
    tag: d
  };
  let o = r.defaultLineEnding;
  return k;
  function k(A) {
    let _ = -1, G = 0;
    const en = [];
    let an = [], cn = [];
    for (; ++_ < A.length; )
      !o && (A[_][1].type === "lineEnding" || A[_][1].type === "lineEndingBlank") && (o = /** @type {LineEnding} */
      A[_][2].sliceSerialize(A[_][1])), (A[_][1].type === "listOrdered" || A[_][1].type === "listUnordered") && (A[_][0] === "enter" ? en.push(_) : c(A.slice(en.pop(), _))), A[_][1].type === "definition" && (A[_][0] === "enter" ? (cn = Y(cn, A.slice(G, _)), G = _) : (an = Y(an, A.slice(G, _ + 1)), G = _ + 1));
    an = Y(an, cn), an = Y(an, A.slice(G)), _ = -1;
    const ln = an;
    for (h.enter.null && h.enter.null.call(p); ++_ < A.length; ) {
      const Un = h[ln[_][0]], Qn = ln[_][1].type, Gn = Un[Qn];
      Zn.call(Un, Qn) && Gn && Gn.call({
        sliceSerialize: ln[_][2].sliceSerialize,
        ...p
      }, ln[_][1]);
    }
    return h.exit.null && h.exit.null.call(p), a[0].join("");
  }
  function c(A) {
    const _ = A.length;
    let G = 0, en = 0, an = !1, cn;
    for (; ++G < _; ) {
      const ln = A[G];
      if (ln[1]._container)
        cn = void 0, ln[0] === "enter" ? en++ : en--;
      else switch (ln[1].type) {
        case "listItemPrefix": {
          ln[0] === "exit" && (cn = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          ln[0] === "enter" && !en && (cn ? cn = void 0 : an = !0);
          break;
        }
        default:
          cn = void 0;
      }
    }
    A[0][1]._loose = an;
  }
  function w(A, _) {
    s[A] = _;
  }
  function E(A) {
    return s[A];
  }
  function T() {
    a.push([]);
  }
  function F() {
    return a.pop().join("");
  }
  function d(A) {
    t && (w("lastWasTag", !0), a[a.length - 1].push(A));
  }
  function x(A) {
    w("lastWasTag"), a[a.length - 1].push(A);
  }
  function S() {
    x(o || `
`);
  }
  function y() {
    const A = a[a.length - 1], _ = A[A.length - 1], G = _ ? _.charCodeAt(_.length - 1) : null;
    G === 10 || G === 13 || G === null || S();
  }
  function m(A) {
    return E("ignoreEncode") ? A : gt(A);
  }
  function C() {
    F();
  }
  function L(A) {
    i.push(!A._loose), y(), d("<ol"), w("expectFirstItem", !0);
  }
  function I(A) {
    i.push(!A._loose), y(), d("<ul"), w("expectFirstItem", !0);
  }
  function b(A) {
    if (E("expectFirstItem")) {
      const _ = Number.parseInt(this.sliceSerialize(A), 10);
      _ !== 1 && d(' start="' + m(String(_)) + '"');
    }
  }
  function z() {
    E("expectFirstItem") ? d(">") : R(), y(), d("<li>"), w("expectFirstItem"), w("lastWasTag");
  }
  function D() {
    R(), i.pop(), S(), d("</ol>");
  }
  function B() {
    R(), i.pop(), S(), d("</ul>");
  }
  function R() {
    E("lastWasTag") && !E("slurpAllLineEndings") && y(), d("</li>"), w("slurpAllLineEndings");
  }
  function O() {
    i.push(!1), y(), d("<blockquote>");
  }
  function U() {
    i.pop(), y(), d("</blockquote>"), w("slurpAllLineEndings");
  }
  function j() {
    i[i.length - 1] || (y(), d("<p>")), w("slurpAllLineEndings");
  }
  function N() {
    i[i.length - 1] ? w("slurpAllLineEndings", !0) : d("</p>");
  }
  function V() {
    y(), d("<pre><code"), w("fencesCount", 0);
  }
  function g() {
    const A = F();
    d(' class="language-' + A + '"');
  }
  function Q() {
    const A = E("fencesCount") || 0;
    A || (d(">"), w("slurpOneLineEnding", !0)), w("fencesCount", A + 1);
  }
  function q() {
    y(), d("<pre><code>");
  }
  function f() {
    const A = E("fencesCount");
    A !== void 0 && A < 2 && s.tightStack.length > 0 && !E("lastWasTag") && S(), E("flowCodeSeenData") && y(), d("</code></pre>"), A !== void 0 && A < 2 && y(), w("flowCodeSeenData"), w("fencesCount"), w("slurpOneLineEnding");
  }
  function W() {
    u.push({
      image: !0
    }), t = void 0;
  }
  function nn() {
    u.push({});
  }
  function $(A) {
    u[u.length - 1].labelId = this.sliceSerialize(A);
  }
  function rn() {
    u[u.length - 1].label = F();
  }
  function tn(A) {
    u[u.length - 1].referenceId = this.sliceSerialize(A);
  }
  function hn() {
    T(), u[u.length - 1].destination = "";
  }
  function un() {
    T(), w("ignoreEncode", !0);
  }
  function fn() {
    u[u.length - 1].destination = F(), w("ignoreEncode");
  }
  function Tn() {
    u[u.length - 1].title = F();
  }
  function dn() {
    let A = u.length - 1;
    const _ = u[A], G = _.referenceId || _.labelId, en = _.destination === void 0 ? e[on(G)] : _;
    for (t = !0; A--; )
      if (u[A].image) {
        t = void 0;
        break;
      }
    _.image ? (d('<img src="' + xn(en.destination, r.allowDangerousProtocol ? void 0 : fe) + '" alt="'), x(_.label), d('"')) : d('<a href="' + xn(en.destination, r.allowDangerousProtocol ? void 0 : Xn) + '"'), d(en.title ? ' title="' + en.title + '"' : ""), _.image ? d(" />") : (d(">"), x(_.label), d("</a>")), u.pop();
  }
  function _t() {
    T(), u.push({});
  }
  function Pt(A) {
    F(), u[u.length - 1].labelId = this.sliceSerialize(A);
  }
  function vt() {
    T(), w("ignoreEncode", !0);
  }
  function Ot() {
    u[u.length - 1].destination = F(), w("ignoreEncode");
  }
  function Mt() {
    u[u.length - 1].title = F();
  }
  function Bt() {
    const A = u[u.length - 1], _ = on(A.labelId);
    F(), Zn.call(e, _) || (e[_] = u[u.length - 1]), u.pop();
  }
  function Rt() {
    w("slurpAllLineEndings", !0);
  }
  function Nt(A) {
    E("headingRank") || (w("headingRank", this.sliceSerialize(A).length), y(), d("<h" + E("headingRank") + ">"));
  }
  function Ht() {
    T(), w("slurpAllLineEndings");
  }
  function $t() {
    w("slurpAllLineEndings", !0);
  }
  function qt() {
    d("</h" + E("headingRank") + ">"), w("headingRank");
  }
  function jt(A) {
    w("headingRank", this.sliceSerialize(A).charCodeAt(0) === 61 ? 1 : 2);
  }
  function Vt() {
    const A = F();
    y(), d("<h" + E("headingRank") + ">"), x(A), d("</h" + E("headingRank") + ">"), w("slurpAllLineEndings"), w("headingRank");
  }
  function wn(A) {
    x(m(this.sliceSerialize(A)));
  }
  function Wt(A) {
    if (!E("slurpAllLineEndings")) {
      if (E("slurpOneLineEnding")) {
        w("slurpOneLineEnding");
        return;
      }
      if (E("inCodeText")) {
        x(" ");
        return;
      }
      x(m(this.sliceSerialize(A)));
    }
  }
  function Ut(A) {
    x(m(this.sliceSerialize(A))), w("flowCodeSeenData", !0);
  }
  function qn() {
    d("<br />");
  }
  function Qt() {
    y(), Vn();
  }
  function jn() {
    w("ignoreEncode");
  }
  function Vn() {
    r.allowDangerousHtml && w("ignoreEncode", !0);
  }
  function Gt() {
    d("<em>");
  }
  function Yt() {
    d("<strong>");
  }
  function Zt() {
    w("inCodeText", !0), d("<code>");
  }
  function Xt() {
    w("inCodeText"), d("</code>");
  }
  function Jt() {
    d("</em>");
  }
  function Kt() {
    d("</strong>");
  }
  function ne() {
    y(), d("<hr />");
  }
  function Wn(A) {
    w("characterReferenceType", A.type);
  }
  function te(A) {
    const _ = this.sliceSerialize(A), G = E("characterReferenceType") ? le(_, E("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : st(_);
    x(m(
      /** @type {string} */
      G
    )), w("characterReferenceType");
  }
  function ee(A) {
    const _ = this.sliceSerialize(A);
    d('<a href="' + xn(_, r.allowDangerousProtocol ? void 0 : Xn) + '">'), x(m(_)), d("</a>");
  }
  function re(A) {
    const _ = this.sliceSerialize(A);
    d('<a href="' + xn("mailto:" + _) + '">'), x(m(_)), d("</a>");
  }
}
function M(n, r, t, e) {
  const a = e ? e - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return i;
  function i(h) {
    return v(h) ? (n.enter(t), l(h)) : r(h);
  }
  function l(h) {
    return v(h) && u++ < a ? (n.consume(h), l) : (n.exit(t), r(h));
  }
}
const me = {
  tokenize: xe
};
function xe(n) {
  const r = n.attempt(this.parser.constructs.contentInitial, e, a);
  let t;
  return r;
  function e(l) {
    if (l === null) {
      n.consume(l);
      return;
    }
    return n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), M(n, r, "linePrefix");
  }
  function a(l) {
    return n.enter("paragraph"), u(l);
  }
  function u(l) {
    const h = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = h), t = h, i(l);
  }
  function i(l) {
    if (l === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(l);
      return;
    }
    return P(l) ? (n.consume(l), n.exit("chunkText"), u) : (n.consume(l), i);
  }
}
const de = {
  tokenize: ke
}, Jn = {
  tokenize: be
};
function ke(n) {
  const r = this, t = [];
  let e = 0, a, u, i;
  return l;
  function l(x) {
    if (e < t.length) {
      const S = t[e];
      return r.containerState = S[1], n.attempt(S[0].continuation, h, s)(x);
    }
    return s(x);
  }
  function h(x) {
    if (e++, r.containerState._closeFlow) {
      r.containerState._closeFlow = void 0, a && d();
      const S = r.events.length;
      let y = S, m;
      for (; y--; )
        if (r.events[y][0] === "exit" && r.events[y][1].type === "chunkFlow") {
          m = r.events[y][1].end;
          break;
        }
      F(e);
      let C = S;
      for (; C < r.events.length; )
        r.events[C][1].end = {
          ...m
        }, C++;
      return K(r.events, y + 1, 0, r.events.slice(S)), r.events.length = C, s(x);
    }
    return l(x);
  }
  function s(x) {
    if (e === t.length) {
      if (!a)
        return k(x);
      if (a.currentConstruct && a.currentConstruct.concrete)
        return w(x);
      r.interrupt = !!(a.currentConstruct && !a._gfmTableDynamicInterruptHack);
    }
    return r.containerState = {}, n.check(Jn, p, o)(x);
  }
  function p(x) {
    return a && d(), F(e), k(x);
  }
  function o(x) {
    return r.parser.lazy[r.now().line] = e !== t.length, i = r.now().offset, w(x);
  }
  function k(x) {
    return r.containerState = {}, n.attempt(Jn, c, w)(x);
  }
  function c(x) {
    return e++, t.push([r.currentConstruct, r.containerState]), k(x);
  }
  function w(x) {
    if (x === null) {
      a && d(), F(0), n.consume(x);
      return;
    }
    return a = a || r.parser.flow(r.now()), n.enter("chunkFlow", {
      _tokenizer: a,
      contentType: "flow",
      previous: u
    }), E(x);
  }
  function E(x) {
    if (x === null) {
      T(n.exit("chunkFlow"), !0), F(0), n.consume(x);
      return;
    }
    return P(x) ? (n.consume(x), T(n.exit("chunkFlow")), e = 0, r.interrupt = void 0, l) : (n.consume(x), E);
  }
  function T(x, S) {
    const y = r.sliceStream(x);
    if (S && y.push(null), x.previous = u, u && (u.next = x), u = x, a.defineSkip(x.start), a.write(y), r.parser.lazy[x.start.line]) {
      let m = a.events.length;
      for (; m--; )
        if (
          // The token starts before the line ending…
          a.events[m][1].start.offset < i && // …and either is not ended yet…
          (!a.events[m][1].end || // …or ends after it.
          a.events[m][1].end.offset > i)
        )
          return;
      const C = r.events.length;
      let L = C, I, b;
      for (; L--; )
        if (r.events[L][0] === "exit" && r.events[L][1].type === "chunkFlow") {
          if (I) {
            b = r.events[L][1].end;
            break;
          }
          I = !0;
        }
      for (F(e), m = C; m < r.events.length; )
        r.events[m][1].end = {
          ...b
        }, m++;
      K(r.events, L + 1, 0, r.events.slice(C)), r.events.length = m;
    }
  }
  function F(x) {
    let S = t.length;
    for (; S-- > x; ) {
      const y = t[S];
      r.containerState = y[1], y[0].exit.call(r, n);
    }
    t.length = x;
  }
  function d() {
    a.write([null]), u = void 0, a = void 0, r.containerState._closeFlow = void 0;
  }
}
function be(n, r, t) {
  return M(n, n.attempt(this.parser.constructs.document, r, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function In(n) {
  if (n === null || H(n) || bn(n))
    return 1;
  if (Rn(n))
    return 2;
}
function zn(n, r, t) {
  const e = [];
  let a = -1;
  for (; ++a < n.length; ) {
    const u = n[a].resolveAll;
    u && !e.includes(u) && (r = u(r, t), e.push(u));
  }
  return r;
}
const Mn = {
  name: "attention",
  resolveAll: we,
  tokenize: ye
};
function we(n, r) {
  let t = -1, e, a, u, i, l, h, s, p;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (e = t; e--; )
        if (n[e][0] === "exit" && n[e][1].type === "attentionSequence" && n[e][1]._open && // If the markers are the same:
        r.sliceSerialize(n[e][1]).charCodeAt(0) === r.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[e][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[e][1].end.offset - n[e][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          h = n[e][1].end.offset - n[e][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const o = {
            ...n[e][1].end
          }, k = {
            ...n[t][1].start
          };
          Kn(o, -h), Kn(k, h), i = {
            type: h > 1 ? "strongSequence" : "emphasisSequence",
            start: o,
            end: {
              ...n[e][1].end
            }
          }, l = {
            type: h > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[t][1].start
            },
            end: k
          }, u = {
            type: h > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[e][1].end
            },
            end: {
              ...n[t][1].start
            }
          }, a = {
            type: h > 1 ? "strong" : "emphasis",
            start: {
              ...i.start
            },
            end: {
              ...l.end
            }
          }, n[e][1].end = {
            ...i.start
          }, n[t][1].start = {
            ...l.end
          }, s = [], n[e][1].end.offset - n[e][1].start.offset && (s = Y(s, [["enter", n[e][1], r], ["exit", n[e][1], r]])), s = Y(s, [["enter", a, r], ["enter", i, r], ["exit", i, r], ["enter", u, r]]), s = Y(s, zn(r.parser.constructs.insideSpan.null, n.slice(e + 1, t), r)), s = Y(s, [["exit", u, r], ["enter", l, r], ["exit", l, r], ["exit", a, r]]), n[t][1].end.offset - n[t][1].start.offset ? (p = 2, s = Y(s, [["enter", n[t][1], r], ["exit", n[t][1], r]])) : p = 0, K(n, e - 1, t - e + 3, s), t = e + s.length - p - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function ye(n, r) {
  const t = this.parser.constructs.attentionMarkers.null, e = this.previous, a = In(e);
  let u;
  return i;
  function i(h) {
    return u = h, n.enter("attentionSequence"), l(h);
  }
  function l(h) {
    if (h === u)
      return n.consume(h), l;
    const s = n.exit("attentionSequence"), p = In(h), o = !p || p === 2 && a || t.includes(h), k = !a || a === 2 && p || t.includes(e);
    return s._open = !!(u === 42 ? o : o && (a || !k)), s._close = !!(u === 42 ? k : k && (p || !o)), r(h);
  }
}
function Kn(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const Se = {
  name: "autolink",
  tokenize: Fe
};
function Fe(n, r, t) {
  let e = 0;
  return a;
  function a(c) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), u;
  }
  function u(c) {
    return X(c) ? (n.consume(c), i) : c === 64 ? t(c) : s(c);
  }
  function i(c) {
    return c === 43 || c === 45 || c === 46 || Z(c) ? (e = 1, l(c)) : s(c);
  }
  function l(c) {
    return c === 58 ? (n.consume(c), e = 0, h) : (c === 43 || c === 45 || c === 46 || Z(c)) && e++ < 32 ? (n.consume(c), l) : (e = 0, s(c));
  }
  function h(c) {
    return c === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), r) : c === null || c === 32 || c === 60 || En(c) ? t(c) : (n.consume(c), h);
  }
  function s(c) {
    return c === 64 ? (n.consume(c), p) : se(c) ? (n.consume(c), s) : t(c);
  }
  function p(c) {
    return Z(c) ? o(c) : t(c);
  }
  function o(c) {
    return c === 46 ? (n.consume(c), e = 0, p) : c === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), r) : k(c);
  }
  function k(c) {
    if ((c === 45 || Z(c)) && e++ < 63) {
      const w = c === 45 ? k : o;
      return n.consume(c), w;
    }
    return t(c);
  }
}
const Fn = {
  partial: !0,
  tokenize: Ce
};
function Ce(n, r, t) {
  return e;
  function e(u) {
    return v(u) ? M(n, a, "linePrefix")(u) : a(u);
  }
  function a(u) {
    return u === null || P(u) ? r(u) : t(u);
  }
}
const ft = {
  continuation: {
    tokenize: Ee
  },
  exit: Ie,
  name: "blockQuote",
  tokenize: Ae
};
function Ae(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    if (i === 62) {
      const l = e.containerState;
      return l.open || (n.enter("blockQuote", {
        _container: !0
      }), l.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(i), n.exit("blockQuoteMarker"), u;
    }
    return t(i);
  }
  function u(i) {
    return v(i) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(i), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), r) : (n.exit("blockQuotePrefix"), r(i));
  }
}
function Ee(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    return v(i) ? M(n, u, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : u(i);
  }
  function u(i) {
    return n.attempt(ft, r, t)(i);
  }
}
function Ie(n) {
  n.exit("blockQuote");
}
const pt = {
  name: "characterEscape",
  tokenize: ze
};
function ze(n, r, t) {
  return e;
  function e(u) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(u), n.exit("escapeMarker"), a;
  }
  function a(u) {
    return ce(u) ? (n.enter("characterEscapeValue"), n.consume(u), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : t(u);
  }
}
const mt = {
  name: "characterReference",
  tokenize: Te
};
function Te(n, r, t) {
  const e = this;
  let a = 0, u, i;
  return l;
  function l(o) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(o), n.exit("characterReferenceMarker"), h;
  }
  function h(o) {
    return o === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(o), n.exit("characterReferenceMarkerNumeric"), s) : (n.enter("characterReferenceValue"), u = 31, i = Z, p(o));
  }
  function s(o) {
    return o === 88 || o === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(o), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), u = 6, i = he, p) : (n.enter("characterReferenceValue"), u = 7, i = On, p(o));
  }
  function p(o) {
    if (o === 59 && a) {
      const k = n.exit("characterReferenceValue");
      return i === Z && !st(e.sliceSerialize(k)) ? t(o) : (n.enter("characterReferenceMarker"), n.consume(o), n.exit("characterReferenceMarker"), n.exit("characterReference"), r);
    }
    return i(o) && a++ < u ? (n.consume(o), p) : t(o);
  }
}
const nt = {
  partial: !0,
  tokenize: Le
}, tt = {
  concrete: !0,
  name: "codeFenced",
  tokenize: De
};
function De(n, r, t) {
  const e = this, a = {
    partial: !0,
    tokenize: y
  };
  let u = 0, i = 0, l;
  return h;
  function h(m) {
    return s(m);
  }
  function s(m) {
    const C = e.events[e.events.length - 1];
    return u = C && C[1].type === "linePrefix" ? C[2].sliceSerialize(C[1], !0).length : 0, l = m, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), p(m);
  }
  function p(m) {
    return m === l ? (i++, n.consume(m), p) : i < 3 ? t(m) : (n.exit("codeFencedFenceSequence"), v(m) ? M(n, o, "whitespace")(m) : o(m));
  }
  function o(m) {
    return m === null || P(m) ? (n.exit("codeFencedFence"), e.interrupt ? r(m) : n.check(nt, E, S)(m)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), k(m));
  }
  function k(m) {
    return m === null || P(m) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), o(m)) : v(m) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), M(n, c, "whitespace")(m)) : m === 96 && m === l ? t(m) : (n.consume(m), k);
  }
  function c(m) {
    return m === null || P(m) ? o(m) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), w(m));
  }
  function w(m) {
    return m === null || P(m) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), o(m)) : m === 96 && m === l ? t(m) : (n.consume(m), w);
  }
  function E(m) {
    return n.attempt(a, S, T)(m);
  }
  function T(m) {
    return n.enter("lineEnding"), n.consume(m), n.exit("lineEnding"), F;
  }
  function F(m) {
    return u > 0 && v(m) ? M(n, d, "linePrefix", u + 1)(m) : d(m);
  }
  function d(m) {
    return m === null || P(m) ? n.check(nt, E, S)(m) : (n.enter("codeFlowValue"), x(m));
  }
  function x(m) {
    return m === null || P(m) ? (n.exit("codeFlowValue"), d(m)) : (n.consume(m), x);
  }
  function S(m) {
    return n.exit("codeFenced"), r(m);
  }
  function y(m, C, L) {
    let I = 0;
    return b;
    function b(O) {
      return m.enter("lineEnding"), m.consume(O), m.exit("lineEnding"), z;
    }
    function z(O) {
      return m.enter("codeFencedFence"), v(O) ? M(m, D, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(O) : D(O);
    }
    function D(O) {
      return O === l ? (m.enter("codeFencedFenceSequence"), B(O)) : L(O);
    }
    function B(O) {
      return O === l ? (I++, m.consume(O), B) : I >= i ? (m.exit("codeFencedFenceSequence"), v(O) ? M(m, R, "whitespace")(O) : R(O)) : L(O);
    }
    function R(O) {
      return O === null || P(O) ? (m.exit("codeFencedFence"), C(O)) : L(O);
    }
  }
}
function Le(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    return i === null ? t(i) : (n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), u);
  }
  function u(i) {
    return e.parser.lazy[e.now().line] ? t(i) : r(i);
  }
}
const Dn = {
  name: "codeIndented",
  tokenize: Pe
}, _e = {
  partial: !0,
  tokenize: ve
};
function Pe(n, r, t) {
  const e = this;
  return a;
  function a(s) {
    return n.enter("codeIndented"), M(n, u, "linePrefix", 5)(s);
  }
  function u(s) {
    const p = e.events[e.events.length - 1];
    return p && p[1].type === "linePrefix" && p[2].sliceSerialize(p[1], !0).length >= 4 ? i(s) : t(s);
  }
  function i(s) {
    return s === null ? h(s) : P(s) ? n.attempt(_e, i, h)(s) : (n.enter("codeFlowValue"), l(s));
  }
  function l(s) {
    return s === null || P(s) ? (n.exit("codeFlowValue"), i(s)) : (n.consume(s), l);
  }
  function h(s) {
    return n.exit("codeIndented"), r(s);
  }
}
function ve(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    return e.parser.lazy[e.now().line] ? t(i) : P(i) ? (n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), a) : M(n, u, "linePrefix", 5)(i);
  }
  function u(i) {
    const l = e.events[e.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? r(i) : P(i) ? a(i) : t(i);
  }
}
const Oe = {
  name: "codeText",
  previous: Be,
  resolve: Me,
  tokenize: Re
};
function Me(n) {
  let r = n.length - 4, t = 3, e, a;
  if ((n[t][1].type === "lineEnding" || n[t][1].type === "space") && (n[r][1].type === "lineEnding" || n[r][1].type === "space")) {
    for (e = t; ++e < r; )
      if (n[e][1].type === "codeTextData") {
        n[t][1].type = "codeTextPadding", n[r][1].type = "codeTextPadding", t += 2, r -= 2;
        break;
      }
  }
  for (e = t - 1, r++; ++e <= r; )
    a === void 0 ? e !== r && n[e][1].type !== "lineEnding" && (a = e) : (e === r || n[e][1].type === "lineEnding") && (n[a][1].type = "codeTextData", e !== a + 2 && (n[a][1].end = n[e - 1][1].end, n.splice(a + 2, e - a - 2), r -= e - a - 2, e = a + 2), a = void 0);
  return n;
}
function Be(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Re(n, r, t) {
  let e = 0, a, u;
  return i;
  function i(o) {
    return n.enter("codeText"), n.enter("codeTextSequence"), l(o);
  }
  function l(o) {
    return o === 96 ? (n.consume(o), e++, l) : (n.exit("codeTextSequence"), h(o));
  }
  function h(o) {
    return o === null ? t(o) : o === 32 ? (n.enter("space"), n.consume(o), n.exit("space"), h) : o === 96 ? (u = n.enter("codeTextSequence"), a = 0, p(o)) : P(o) ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), h) : (n.enter("codeTextData"), s(o));
  }
  function s(o) {
    return o === null || o === 32 || o === 96 || P(o) ? (n.exit("codeTextData"), h(o)) : (n.consume(o), s);
  }
  function p(o) {
    return o === 96 ? (n.consume(o), a++, p) : a === e ? (n.exit("codeTextSequence"), n.exit("codeText"), r(o)) : (u.type = "codeTextData", s(o));
  }
}
class Ne {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(r) {
    this.left = r ? [...r] : [], this.right = [];
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
  get(r) {
    if (r < 0 || r >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + r + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return r < this.left.length ? this.left[r] : this.right[this.right.length - r + this.left.length - 1];
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
  slice(r, t) {
    const e = t ?? Number.POSITIVE_INFINITY;
    return e < this.left.length ? this.left.slice(r, e) : r > this.left.length ? this.right.slice(this.right.length - e + this.left.length, this.right.length - r + this.left.length).reverse() : this.left.slice(r).concat(this.right.slice(this.right.length - e + this.left.length).reverse());
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
  splice(r, t, e) {
    const a = t || 0;
    this.setCursor(Math.trunc(r));
    const u = this.right.splice(this.right.length - a, Number.POSITIVE_INFINITY);
    return e && yn(this.left, e), u.reverse();
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
  push(r) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(r);
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
  pushMany(r) {
    this.setCursor(Number.POSITIVE_INFINITY), yn(this.left, r);
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
  unshift(r) {
    this.setCursor(0), this.right.push(r);
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
  unshiftMany(r) {
    this.setCursor(0), yn(this.right, r.reverse());
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
  setCursor(r) {
    if (!(r === this.left.length || r > this.left.length && this.right.length === 0 || r < 0 && this.left.length === 0))
      if (r < this.left.length) {
        const t = this.left.splice(r, Number.POSITIVE_INFINITY);
        yn(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - r, Number.POSITIVE_INFINITY);
        yn(this.left, t.reverse());
      }
  }
}
function yn(n, r) {
  let t = 0;
  if (r.length < 1e4)
    n.push(...r);
  else
    for (; t < r.length; )
      n.push(...r.slice(t, t + 1e4)), t += 1e4;
}
function xt(n) {
  const r = {};
  let t = -1, e, a, u, i, l, h, s;
  const p = new Ne(n);
  for (; ++t < p.length; ) {
    for (; t in r; )
      t = r[t];
    if (e = p.get(t), t && e[1].type === "chunkFlow" && p.get(t - 1)[1].type === "listItemPrefix" && (h = e[1]._tokenizer.events, u = 0, u < h.length && h[u][1].type === "lineEndingBlank" && (u += 2), u < h.length && h[u][1].type === "content"))
      for (; ++u < h.length && h[u][1].type !== "content"; )
        h[u][1].type === "chunkText" && (h[u][1]._isInFirstContentOfListItem = !0, u++);
    if (e[0] === "enter")
      e[1].contentType && (Object.assign(r, He(p, t)), t = r[t], s = !0);
    else if (e[1]._container) {
      for (u = t, a = void 0; u--; )
        if (i = p.get(u), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank")
          i[0] === "enter" && (a && (p.get(a)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", a = u);
        else if (!(i[1].type === "linePrefix" || i[1].type === "listItemIndent")) break;
      a && (e[1].end = {
        ...p.get(a)[1].start
      }, l = p.slice(a, t), l.unshift(e), p.splice(a, t - a + 1, l));
    }
  }
  return K(n, 0, Number.POSITIVE_INFINITY, p.slice(0)), !s;
}
function He(n, r) {
  const t = n.get(r)[1], e = n.get(r)[2];
  let a = r - 1;
  const u = [];
  let i = t._tokenizer;
  i || (i = e.parser[t.contentType](t.start), t._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
  const l = i.events, h = [], s = {};
  let p, o, k = -1, c = t, w = 0, E = 0;
  const T = [E];
  for (; c; ) {
    for (; n.get(++a)[1] !== c; )
      ;
    u.push(a), c._tokenizer || (p = e.sliceStream(c), c.next || p.push(null), o && i.defineSkip(c.start), c._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(p), c._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), o = c, c = c.next;
  }
  for (c = t; ++k < l.length; )
    // Find a void token that includes a break.
    l[k][0] === "exit" && l[k - 1][0] === "enter" && l[k][1].type === l[k - 1][1].type && l[k][1].start.line !== l[k][1].end.line && (E = k + 1, T.push(E), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (i.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : T.pop(), k = T.length; k--; ) {
    const F = l.slice(T[k], T[k + 1]), d = u.pop();
    h.push([d, d + F.length - 1]), n.splice(d, 2, F);
  }
  for (h.reverse(), k = -1; ++k < h.length; )
    s[w + h[k][0]] = w + h[k][1], w += h[k][1] - h[k][0] - 1;
  return s;
}
const $e = {
  resolve: je,
  tokenize: Ve
}, qe = {
  partial: !0,
  tokenize: We
};
function je(n) {
  return xt(n), n;
}
function Ve(n, r) {
  let t;
  return e;
  function e(l) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), a(l);
  }
  function a(l) {
    return l === null ? u(l) : P(l) ? n.check(qe, i, u)(l) : (n.consume(l), a);
  }
  function u(l) {
    return n.exit("chunkContent"), n.exit("content"), r(l);
  }
  function i(l) {
    return n.consume(l), n.exit("chunkContent"), t.next = n.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, a;
  }
}
function We(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), M(n, u, "linePrefix");
  }
  function u(i) {
    if (i === null || P(i))
      return t(i);
    const l = e.events[e.events.length - 1];
    return !e.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? r(i) : n.interrupt(e.parser.constructs.flow, t, r)(i);
  }
}
function dt(n, r, t, e, a, u, i, l, h) {
  const s = h || Number.POSITIVE_INFINITY;
  let p = 0;
  return o;
  function o(F) {
    return F === 60 ? (n.enter(e), n.enter(a), n.enter(u), n.consume(F), n.exit(u), k) : F === null || F === 32 || F === 41 || En(F) ? t(F) : (n.enter(e), n.enter(i), n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), E(F));
  }
  function k(F) {
    return F === 62 ? (n.enter(u), n.consume(F), n.exit(u), n.exit(a), n.exit(e), r) : (n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), c(F));
  }
  function c(F) {
    return F === 62 ? (n.exit("chunkString"), n.exit(l), k(F)) : F === null || F === 60 || P(F) ? t(F) : (n.consume(F), F === 92 ? w : c);
  }
  function w(F) {
    return F === 60 || F === 62 || F === 92 ? (n.consume(F), c) : c(F);
  }
  function E(F) {
    return !p && (F === null || F === 41 || H(F)) ? (n.exit("chunkString"), n.exit(l), n.exit(i), n.exit(e), r(F)) : p < s && F === 40 ? (n.consume(F), p++, E) : F === 41 ? (n.consume(F), p--, E) : F === null || F === 32 || F === 40 || En(F) ? t(F) : (n.consume(F), F === 92 ? T : E);
  }
  function T(F) {
    return F === 40 || F === 41 || F === 92 ? (n.consume(F), E) : E(F);
  }
}
function kt(n, r, t, e, a, u) {
  const i = this;
  let l = 0, h;
  return s;
  function s(c) {
    return n.enter(e), n.enter(a), n.consume(c), n.exit(a), n.enter(u), p;
  }
  function p(c) {
    return l > 999 || c === null || c === 91 || c === 93 && !h || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !l && "_hiddenFootnoteSupport" in i.parser.constructs ? t(c) : c === 93 ? (n.exit(u), n.enter(a), n.consume(c), n.exit(a), n.exit(e), r) : P(c) ? (n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), p) : (n.enter("chunkString", {
      contentType: "string"
    }), o(c));
  }
  function o(c) {
    return c === null || c === 91 || c === 93 || P(c) || l++ > 999 ? (n.exit("chunkString"), p(c)) : (n.consume(c), h || (h = !v(c)), c === 92 ? k : o);
  }
  function k(c) {
    return c === 91 || c === 92 || c === 93 ? (n.consume(c), l++, o) : o(c);
  }
}
function bt(n, r, t, e, a, u) {
  let i;
  return l;
  function l(k) {
    return k === 34 || k === 39 || k === 40 ? (n.enter(e), n.enter(a), n.consume(k), n.exit(a), i = k === 40 ? 41 : k, h) : t(k);
  }
  function h(k) {
    return k === i ? (n.enter(a), n.consume(k), n.exit(a), n.exit(e), r) : (n.enter(u), s(k));
  }
  function s(k) {
    return k === i ? (n.exit(u), h(i)) : k === null ? t(k) : P(k) ? (n.enter("lineEnding"), n.consume(k), n.exit("lineEnding"), M(n, s, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), p(k));
  }
  function p(k) {
    return k === i || k === null || P(k) ? (n.exit("chunkString"), s(k)) : (n.consume(k), k === 92 ? o : p);
  }
  function o(k) {
    return k === i || k === 92 ? (n.consume(k), p) : p(k);
  }
}
function Sn(n, r) {
  let t;
  return e;
  function e(a) {
    return P(a) ? (n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), t = !0, e) : v(a) ? M(n, e, t ? "linePrefix" : "lineSuffix")(a) : r(a);
  }
}
const Ue = {
  name: "definition",
  tokenize: Ge
}, Qe = {
  partial: !0,
  tokenize: Ye
};
function Ge(n, r, t) {
  const e = this;
  let a;
  return u;
  function u(c) {
    return n.enter("definition"), i(c);
  }
  function i(c) {
    return kt.call(
      e,
      n,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function l(c) {
    return a = on(e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1)), c === 58 ? (n.enter("definitionMarker"), n.consume(c), n.exit("definitionMarker"), h) : t(c);
  }
  function h(c) {
    return H(c) ? Sn(n, s)(c) : s(c);
  }
  function s(c) {
    return dt(
      n,
      p,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(c);
  }
  function p(c) {
    return n.attempt(Qe, o, o)(c);
  }
  function o(c) {
    return v(c) ? M(n, k, "whitespace")(c) : k(c);
  }
  function k(c) {
    return c === null || P(c) ? (n.exit("definition"), e.parser.defined.push(a), r(c)) : t(c);
  }
}
function Ye(n, r, t) {
  return e;
  function e(l) {
    return H(l) ? Sn(n, a)(l) : t(l);
  }
  function a(l) {
    return bt(n, u, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function u(l) {
    return v(l) ? M(n, i, "whitespace")(l) : i(l);
  }
  function i(l) {
    return l === null || P(l) ? r(l) : t(l);
  }
}
const Ze = {
  name: "hardBreakEscape",
  tokenize: Xe
};
function Xe(n, r, t) {
  return e;
  function e(u) {
    return n.enter("hardBreakEscape"), n.consume(u), a;
  }
  function a(u) {
    return P(u) ? (n.exit("hardBreakEscape"), r(u)) : t(u);
  }
}
const Je = {
  name: "headingAtx",
  resolve: Ke,
  tokenize: nr
};
function Ke(n, r) {
  let t = n.length - 2, e = 3, a, u;
  return n[e][1].type === "whitespace" && (e += 2), t - 2 > e && n[t][1].type === "whitespace" && (t -= 2), n[t][1].type === "atxHeadingSequence" && (e === t - 1 || t - 4 > e && n[t - 2][1].type === "whitespace") && (t -= e + 1 === t ? 2 : 4), t > e && (a = {
    type: "atxHeadingText",
    start: n[e][1].start,
    end: n[t][1].end
  }, u = {
    type: "chunkText",
    start: n[e][1].start,
    end: n[t][1].end,
    contentType: "text"
  }, K(n, e, t - e + 1, [["enter", a, r], ["enter", u, r], ["exit", u, r], ["exit", a, r]])), n;
}
function nr(n, r, t) {
  let e = 0;
  return a;
  function a(p) {
    return n.enter("atxHeading"), u(p);
  }
  function u(p) {
    return n.enter("atxHeadingSequence"), i(p);
  }
  function i(p) {
    return p === 35 && e++ < 6 ? (n.consume(p), i) : p === null || H(p) ? (n.exit("atxHeadingSequence"), l(p)) : t(p);
  }
  function l(p) {
    return p === 35 ? (n.enter("atxHeadingSequence"), h(p)) : p === null || P(p) ? (n.exit("atxHeading"), r(p)) : v(p) ? M(n, l, "whitespace")(p) : (n.enter("atxHeadingText"), s(p));
  }
  function h(p) {
    return p === 35 ? (n.consume(p), h) : (n.exit("atxHeadingSequence"), l(p));
  }
  function s(p) {
    return p === null || p === 35 || H(p) ? (n.exit("atxHeadingText"), l(p)) : (n.consume(p), s);
  }
}
const tr = [
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
], et = ["pre", "script", "style", "textarea"], er = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ur,
  tokenize: ar
}, rr = {
  partial: !0,
  tokenize: or
}, ir = {
  partial: !0,
  tokenize: lr
};
function ur(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function ar(n, r, t) {
  const e = this;
  let a, u, i, l, h;
  return s;
  function s(f) {
    return p(f);
  }
  function p(f) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(f), o;
  }
  function o(f) {
    return f === 33 ? (n.consume(f), k) : f === 47 ? (n.consume(f), u = !0, E) : f === 63 ? (n.consume(f), a = 3, e.interrupt ? r : g) : X(f) ? (n.consume(f), i = String.fromCharCode(f), T) : t(f);
  }
  function k(f) {
    return f === 45 ? (n.consume(f), a = 2, c) : f === 91 ? (n.consume(f), a = 5, l = 0, w) : X(f) ? (n.consume(f), a = 4, e.interrupt ? r : g) : t(f);
  }
  function c(f) {
    return f === 45 ? (n.consume(f), e.interrupt ? r : g) : t(f);
  }
  function w(f) {
    const W = "CDATA[";
    return f === W.charCodeAt(l++) ? (n.consume(f), l === W.length ? e.interrupt ? r : D : w) : t(f);
  }
  function E(f) {
    return X(f) ? (n.consume(f), i = String.fromCharCode(f), T) : t(f);
  }
  function T(f) {
    if (f === null || f === 47 || f === 62 || H(f)) {
      const W = f === 47, nn = i.toLowerCase();
      return !W && !u && et.includes(nn) ? (a = 1, e.interrupt ? r(f) : D(f)) : tr.includes(i.toLowerCase()) ? (a = 6, W ? (n.consume(f), F) : e.interrupt ? r(f) : D(f)) : (a = 7, e.interrupt && !e.parser.lazy[e.now().line] ? t(f) : u ? d(f) : x(f));
    }
    return f === 45 || Z(f) ? (n.consume(f), i += String.fromCharCode(f), T) : t(f);
  }
  function F(f) {
    return f === 62 ? (n.consume(f), e.interrupt ? r : D) : t(f);
  }
  function d(f) {
    return v(f) ? (n.consume(f), d) : b(f);
  }
  function x(f) {
    return f === 47 ? (n.consume(f), b) : f === 58 || f === 95 || X(f) ? (n.consume(f), S) : v(f) ? (n.consume(f), x) : b(f);
  }
  function S(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Z(f) ? (n.consume(f), S) : y(f);
  }
  function y(f) {
    return f === 61 ? (n.consume(f), m) : v(f) ? (n.consume(f), y) : x(f);
  }
  function m(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? t(f) : f === 34 || f === 39 ? (n.consume(f), h = f, C) : v(f) ? (n.consume(f), m) : L(f);
  }
  function C(f) {
    return f === h ? (n.consume(f), h = null, I) : f === null || P(f) ? t(f) : (n.consume(f), C);
  }
  function L(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || H(f) ? y(f) : (n.consume(f), L);
  }
  function I(f) {
    return f === 47 || f === 62 || v(f) ? x(f) : t(f);
  }
  function b(f) {
    return f === 62 ? (n.consume(f), z) : t(f);
  }
  function z(f) {
    return f === null || P(f) ? D(f) : v(f) ? (n.consume(f), z) : t(f);
  }
  function D(f) {
    return f === 45 && a === 2 ? (n.consume(f), U) : f === 60 && a === 1 ? (n.consume(f), j) : f === 62 && a === 4 ? (n.consume(f), Q) : f === 63 && a === 3 ? (n.consume(f), g) : f === 93 && a === 5 ? (n.consume(f), V) : P(f) && (a === 6 || a === 7) ? (n.exit("htmlFlowData"), n.check(rr, q, B)(f)) : f === null || P(f) ? (n.exit("htmlFlowData"), B(f)) : (n.consume(f), D);
  }
  function B(f) {
    return n.check(ir, R, q)(f);
  }
  function R(f) {
    return n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), O;
  }
  function O(f) {
    return f === null || P(f) ? B(f) : (n.enter("htmlFlowData"), D(f));
  }
  function U(f) {
    return f === 45 ? (n.consume(f), g) : D(f);
  }
  function j(f) {
    return f === 47 ? (n.consume(f), i = "", N) : D(f);
  }
  function N(f) {
    if (f === 62) {
      const W = i.toLowerCase();
      return et.includes(W) ? (n.consume(f), Q) : D(f);
    }
    return X(f) && i.length < 8 ? (n.consume(f), i += String.fromCharCode(f), N) : D(f);
  }
  function V(f) {
    return f === 93 ? (n.consume(f), g) : D(f);
  }
  function g(f) {
    return f === 62 ? (n.consume(f), Q) : f === 45 && a === 2 ? (n.consume(f), g) : D(f);
  }
  function Q(f) {
    return f === null || P(f) ? (n.exit("htmlFlowData"), q(f)) : (n.consume(f), Q);
  }
  function q(f) {
    return n.exit("htmlFlow"), r(f);
  }
}
function lr(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    return P(i) ? (n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), u) : t(i);
  }
  function u(i) {
    return e.parser.lazy[e.now().line] ? t(i) : r(i);
  }
}
function or(n, r, t) {
  return e;
  function e(a) {
    return n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), n.attempt(Fn, r, t);
  }
}
const sr = {
  name: "htmlText",
  tokenize: hr
};
function hr(n, r, t) {
  const e = this;
  let a, u, i;
  return l;
  function l(g) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(g), h;
  }
  function h(g) {
    return g === 33 ? (n.consume(g), s) : g === 47 ? (n.consume(g), y) : g === 63 ? (n.consume(g), x) : X(g) ? (n.consume(g), L) : t(g);
  }
  function s(g) {
    return g === 45 ? (n.consume(g), p) : g === 91 ? (n.consume(g), u = 0, w) : X(g) ? (n.consume(g), d) : t(g);
  }
  function p(g) {
    return g === 45 ? (n.consume(g), c) : t(g);
  }
  function o(g) {
    return g === null ? t(g) : g === 45 ? (n.consume(g), k) : P(g) ? (i = o, j(g)) : (n.consume(g), o);
  }
  function k(g) {
    return g === 45 ? (n.consume(g), c) : o(g);
  }
  function c(g) {
    return g === 62 ? U(g) : g === 45 ? k(g) : o(g);
  }
  function w(g) {
    const Q = "CDATA[";
    return g === Q.charCodeAt(u++) ? (n.consume(g), u === Q.length ? E : w) : t(g);
  }
  function E(g) {
    return g === null ? t(g) : g === 93 ? (n.consume(g), T) : P(g) ? (i = E, j(g)) : (n.consume(g), E);
  }
  function T(g) {
    return g === 93 ? (n.consume(g), F) : E(g);
  }
  function F(g) {
    return g === 62 ? U(g) : g === 93 ? (n.consume(g), F) : E(g);
  }
  function d(g) {
    return g === null || g === 62 ? U(g) : P(g) ? (i = d, j(g)) : (n.consume(g), d);
  }
  function x(g) {
    return g === null ? t(g) : g === 63 ? (n.consume(g), S) : P(g) ? (i = x, j(g)) : (n.consume(g), x);
  }
  function S(g) {
    return g === 62 ? U(g) : x(g);
  }
  function y(g) {
    return X(g) ? (n.consume(g), m) : t(g);
  }
  function m(g) {
    return g === 45 || Z(g) ? (n.consume(g), m) : C(g);
  }
  function C(g) {
    return P(g) ? (i = C, j(g)) : v(g) ? (n.consume(g), C) : U(g);
  }
  function L(g) {
    return g === 45 || Z(g) ? (n.consume(g), L) : g === 47 || g === 62 || H(g) ? I(g) : t(g);
  }
  function I(g) {
    return g === 47 ? (n.consume(g), U) : g === 58 || g === 95 || X(g) ? (n.consume(g), b) : P(g) ? (i = I, j(g)) : v(g) ? (n.consume(g), I) : U(g);
  }
  function b(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Z(g) ? (n.consume(g), b) : z(g);
  }
  function z(g) {
    return g === 61 ? (n.consume(g), D) : P(g) ? (i = z, j(g)) : v(g) ? (n.consume(g), z) : I(g);
  }
  function D(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? t(g) : g === 34 || g === 39 ? (n.consume(g), a = g, B) : P(g) ? (i = D, j(g)) : v(g) ? (n.consume(g), D) : (n.consume(g), R);
  }
  function B(g) {
    return g === a ? (n.consume(g), a = void 0, O) : g === null ? t(g) : P(g) ? (i = B, j(g)) : (n.consume(g), B);
  }
  function R(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? t(g) : g === 47 || g === 62 || H(g) ? I(g) : (n.consume(g), R);
  }
  function O(g) {
    return g === 47 || g === 62 || H(g) ? I(g) : t(g);
  }
  function U(g) {
    return g === 62 ? (n.consume(g), n.exit("htmlTextData"), n.exit("htmlText"), r) : t(g);
  }
  function j(g) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(g), n.exit("lineEnding"), N;
  }
  function N(g) {
    return v(g) ? M(n, V, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : V(g);
  }
  function V(g) {
    return n.enter("htmlTextData"), i(g);
  }
}
const Nn = {
  name: "labelEnd",
  resolveAll: pr,
  resolveTo: mr,
  tokenize: xr
}, cr = {
  tokenize: dr
}, gr = {
  tokenize: kr
}, fr = {
  tokenize: br
};
function pr(n) {
  let r = -1;
  const t = [];
  for (; ++r < n.length; ) {
    const e = n[r][1];
    if (t.push(n[r]), e.type === "labelImage" || e.type === "labelLink" || e.type === "labelEnd") {
      const a = e.type === "labelImage" ? 4 : 2;
      e.type = "data", r += a;
    }
  }
  return n.length !== t.length && K(n, 0, n.length, t), n;
}
function mr(n, r) {
  let t = n.length, e = 0, a, u, i, l;
  for (; t--; )
    if (a = n[t][1], u) {
      if (a.type === "link" || a.type === "labelLink" && a._inactive)
        break;
      n[t][0] === "enter" && a.type === "labelLink" && (a._inactive = !0);
    } else if (i) {
      if (n[t][0] === "enter" && (a.type === "labelImage" || a.type === "labelLink") && !a._balanced && (u = t, a.type !== "labelLink")) {
        e = 2;
        break;
      }
    } else a.type === "labelEnd" && (i = t);
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
      ...n[i][1].end
    }
  }, p = {
    type: "labelText",
    start: {
      ...n[u + e + 2][1].end
    },
    end: {
      ...n[i - 2][1].start
    }
  };
  return l = [["enter", h, r], ["enter", s, r]], l = Y(l, n.slice(u + 1, u + e + 3)), l = Y(l, [["enter", p, r]]), l = Y(l, zn(r.parser.constructs.insideSpan.null, n.slice(u + e + 4, i - 3), r)), l = Y(l, [["exit", p, r], n[i - 2], n[i - 1], ["exit", s, r]]), l = Y(l, n.slice(i + 1)), l = Y(l, [["exit", h, r]]), K(n, u, n.length, l), n;
}
function xr(n, r, t) {
  const e = this;
  let a = e.events.length, u, i;
  for (; a--; )
    if ((e.events[a][1].type === "labelImage" || e.events[a][1].type === "labelLink") && !e.events[a][1]._balanced) {
      u = e.events[a][1];
      break;
    }
  return l;
  function l(k) {
    return u ? u._inactive ? o(k) : (i = e.parser.defined.includes(on(e.sliceSerialize({
      start: u.end,
      end: e.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(k), n.exit("labelMarker"), n.exit("labelEnd"), h) : t(k);
  }
  function h(k) {
    return k === 40 ? n.attempt(cr, p, i ? p : o)(k) : k === 91 ? n.attempt(gr, p, i ? s : o)(k) : i ? p(k) : o(k);
  }
  function s(k) {
    return n.attempt(fr, p, o)(k);
  }
  function p(k) {
    return r(k);
  }
  function o(k) {
    return u._balanced = !0, t(k);
  }
}
function dr(n, r, t) {
  return e;
  function e(o) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(o), n.exit("resourceMarker"), a;
  }
  function a(o) {
    return H(o) ? Sn(n, u)(o) : u(o);
  }
  function u(o) {
    return o === 41 ? p(o) : dt(n, i, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(o);
  }
  function i(o) {
    return H(o) ? Sn(n, h)(o) : p(o);
  }
  function l(o) {
    return t(o);
  }
  function h(o) {
    return o === 34 || o === 39 || o === 40 ? bt(n, s, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(o) : p(o);
  }
  function s(o) {
    return H(o) ? Sn(n, p)(o) : p(o);
  }
  function p(o) {
    return o === 41 ? (n.enter("resourceMarker"), n.consume(o), n.exit("resourceMarker"), n.exit("resource"), r) : t(o);
  }
}
function kr(n, r, t) {
  const e = this;
  return a;
  function a(l) {
    return kt.call(e, n, u, i, "reference", "referenceMarker", "referenceString")(l);
  }
  function u(l) {
    return e.parser.defined.includes(on(e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1))) ? r(l) : t(l);
  }
  function i(l) {
    return t(l);
  }
}
function br(n, r, t) {
  return e;
  function e(u) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), a;
  }
  function a(u) {
    return u === 93 ? (n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), n.exit("reference"), r) : t(u);
  }
}
const wr = {
  name: "labelStartImage",
  resolveAll: Nn.resolveAll,
  tokenize: yr
};
function yr(n, r, t) {
  const e = this;
  return a;
  function a(l) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(l), n.exit("labelImageMarker"), u;
  }
  function u(l) {
    return l === 91 ? (n.enter("labelMarker"), n.consume(l), n.exit("labelMarker"), n.exit("labelImage"), i) : t(l);
  }
  function i(l) {
    return l === 94 && "_hiddenFootnoteSupport" in e.parser.constructs ? t(l) : r(l);
  }
}
const Sr = {
  name: "labelStartLink",
  resolveAll: Nn.resolveAll,
  tokenize: Fr
};
function Fr(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(i), n.exit("labelMarker"), n.exit("labelLink"), u;
  }
  function u(i) {
    return i === 94 && "_hiddenFootnoteSupport" in e.parser.constructs ? t(i) : r(i);
  }
}
const Ln = {
  name: "lineEnding",
  tokenize: Cr
};
function Cr(n, r) {
  return t;
  function t(e) {
    return n.enter("lineEnding"), n.consume(e), n.exit("lineEnding"), M(n, r, "linePrefix");
  }
}
const An = {
  name: "thematicBreak",
  tokenize: Ar
};
function Ar(n, r, t) {
  let e = 0, a;
  return u;
  function u(s) {
    return n.enter("thematicBreak"), i(s);
  }
  function i(s) {
    return a = s, l(s);
  }
  function l(s) {
    return s === a ? (n.enter("thematicBreakSequence"), h(s)) : e >= 3 && (s === null || P(s)) ? (n.exit("thematicBreak"), r(s)) : t(s);
  }
  function h(s) {
    return s === a ? (n.consume(s), e++, h) : (n.exit("thematicBreakSequence"), v(s) ? M(n, l, "whitespace")(s) : l(s));
  }
}
const J = {
  continuation: {
    tokenize: Tr
  },
  exit: Lr,
  name: "list",
  tokenize: zr
}, Er = {
  partial: !0,
  tokenize: _r
}, Ir = {
  partial: !0,
  tokenize: Dr
};
function zr(n, r, t) {
  const e = this, a = e.events[e.events.length - 1];
  let u = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, i = 0;
  return l;
  function l(c) {
    const w = e.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !e.containerState.marker || c === e.containerState.marker : On(c)) {
      if (e.containerState.type || (e.containerState.type = w, n.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return n.enter("listItemPrefix"), c === 42 || c === 45 ? n.check(An, t, s)(c) : s(c);
      if (!e.interrupt || c === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), h(c);
    }
    return t(c);
  }
  function h(c) {
    return On(c) && ++i < 10 ? (n.consume(c), h) : (!e.interrupt || i < 2) && (e.containerState.marker ? c === e.containerState.marker : c === 41 || c === 46) ? (n.exit("listItemValue"), s(c)) : t(c);
  }
  function s(c) {
    return n.enter("listItemMarker"), n.consume(c), n.exit("listItemMarker"), e.containerState.marker = e.containerState.marker || c, n.check(
      Fn,
      // Can’t be empty when interrupting.
      e.interrupt ? t : p,
      n.attempt(Er, k, o)
    );
  }
  function p(c) {
    return e.containerState.initialBlankLine = !0, u++, k(c);
  }
  function o(c) {
    return v(c) ? (n.enter("listItemPrefixWhitespace"), n.consume(c), n.exit("listItemPrefixWhitespace"), k) : t(c);
  }
  function k(c) {
    return e.containerState.size = u + e.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(c);
  }
}
function Tr(n, r, t) {
  const e = this;
  return e.containerState._closeFlow = void 0, n.check(Fn, a, u);
  function a(l) {
    return e.containerState.furtherBlankLines = e.containerState.furtherBlankLines || e.containerState.initialBlankLine, M(n, r, "listItemIndent", e.containerState.size + 1)(l);
  }
  function u(l) {
    return e.containerState.furtherBlankLines || !v(l) ? (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, i(l)) : (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, n.attempt(Ir, r, i)(l));
  }
  function i(l) {
    return e.containerState._closeFlow = !0, e.interrupt = void 0, M(n, n.attempt(J, r, t), "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function Dr(n, r, t) {
  const e = this;
  return M(n, a, "listItemIndent", e.containerState.size + 1);
  function a(u) {
    const i = e.events[e.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === e.containerState.size ? r(u) : t(u);
  }
}
function Lr(n) {
  n.exit(this.containerState.type);
}
function _r(n, r, t) {
  const e = this;
  return M(n, a, "listItemPrefixWhitespace", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function a(u) {
    const i = e.events[e.events.length - 1];
    return !v(u) && i && i[1].type === "listItemPrefixWhitespace" ? r(u) : t(u);
  }
}
const rt = {
  name: "setextUnderline",
  resolveTo: Pr,
  tokenize: vr
};
function Pr(n, r) {
  let t = n.length, e, a, u;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        e = t;
        break;
      }
      n[t][1].type === "paragraph" && (a = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1), !u && n[t][1].type === "definition" && (u = t);
  const i = {
    type: "setextHeading",
    start: {
      ...n[e][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[a][1].type = "setextHeadingText", u ? (n.splice(a, 0, ["enter", i, r]), n.splice(u + 1, 0, ["exit", n[e][1], r]), n[e][1].end = {
    ...n[u][1].end
  }) : n[e][1] = i, n.push(["exit", i, r]), n;
}
function vr(n, r, t) {
  const e = this;
  let a;
  return u;
  function u(s) {
    let p = e.events.length, o;
    for (; p--; )
      if (e.events[p][1].type !== "lineEnding" && e.events[p][1].type !== "linePrefix" && e.events[p][1].type !== "content") {
        o = e.events[p][1].type === "paragraph";
        break;
      }
    return !e.parser.lazy[e.now().line] && (e.interrupt || o) ? (n.enter("setextHeadingLine"), a = s, i(s)) : t(s);
  }
  function i(s) {
    return n.enter("setextHeadingLineSequence"), l(s);
  }
  function l(s) {
    return s === a ? (n.consume(s), l) : (n.exit("setextHeadingLineSequence"), v(s) ? M(n, h, "lineSuffix")(s) : h(s));
  }
  function h(s) {
    return s === null || P(s) ? (n.exit("setextHeadingLine"), r(s)) : t(s);
  }
}
const Or = {
  tokenize: Mr
};
function Mr(n) {
  const r = this, t = n.attempt(
    // Try to parse a blank line.
    Fn,
    e,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, a, M(n, n.attempt(this.parser.constructs.flow, a, n.attempt($e, a)), "linePrefix"))
  );
  return t;
  function e(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(u), n.exit("lineEndingBlank"), r.currentConstruct = void 0, t;
  }
  function a(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), r.currentConstruct = void 0, t;
  }
}
const Br = {
  resolveAll: yt()
}, Rr = wt("string"), Nr = wt("text");
function wt(n) {
  return {
    resolveAll: yt(n === "text" ? Hr : void 0),
    tokenize: r
  };
  function r(t) {
    const e = this, a = this.parser.constructs[n], u = t.attempt(a, i, l);
    return i;
    function i(p) {
      return s(p) ? u(p) : l(p);
    }
    function l(p) {
      if (p === null) {
        t.consume(p);
        return;
      }
      return t.enter("data"), t.consume(p), h;
    }
    function h(p) {
      return s(p) ? (t.exit("data"), u(p)) : (t.consume(p), h);
    }
    function s(p) {
      if (p === null)
        return !0;
      const o = a[p];
      let k = -1;
      if (o)
        for (; ++k < o.length; ) {
          const c = o[k];
          if (!c.previous || c.previous.call(e, e.previous))
            return !0;
        }
      return !1;
    }
  }
}
function yt(n) {
  return r;
  function r(t, e) {
    let a = -1, u;
    for (; ++a <= t.length; )
      u === void 0 ? t[a] && t[a][1].type === "data" && (u = a, a++) : (!t[a] || t[a][1].type !== "data") && (a !== u + 2 && (t[u][1].end = t[a - 1][1].end, t.splice(u + 2, a - u - 2), a = u + 2), u = void 0);
    return n ? n(t, e) : t;
  }
}
function Hr(n, r) {
  let t = 0;
  for (; ++t <= n.length; )
    if ((t === n.length || n[t][1].type === "lineEnding") && n[t - 1][1].type === "data") {
      const e = n[t - 1][1], a = r.sliceStream(e);
      let u = a.length, i = -1, l = 0, h;
      for (; u--; ) {
        const s = a[u];
        if (typeof s == "string") {
          for (i = s.length; s.charCodeAt(i - 1) === 32; )
            l++, i--;
          if (i) break;
          i = -1;
        } else if (s === -2)
          h = !0, l++;
        else if (s !== -1) {
          u++;
          break;
        }
      }
      if (r._contentTypeTextTrailing && t === n.length && (l = 0), l) {
        const s = {
          type: t === n.length || h || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: u ? i : e.start._bufferIndex + i,
            _index: e.start._index + u,
            line: e.end.line,
            column: e.end.column - l,
            offset: e.end.offset - l
          },
          end: {
            ...e.end
          }
        };
        e.end = {
          ...s.start
        }, e.start.offset === e.end.offset ? Object.assign(e, s) : (n.splice(t, 0, ["enter", s, r], ["exit", s, r]), t += 2);
      }
      t++;
    }
  return n;
}
const $r = {
  42: J,
  43: J,
  45: J,
  48: J,
  49: J,
  50: J,
  51: J,
  52: J,
  53: J,
  54: J,
  55: J,
  56: J,
  57: J,
  62: ft
}, qr = {
  91: Ue
}, jr = {
  [-2]: Dn,
  [-1]: Dn,
  32: Dn
}, Vr = {
  35: Je,
  42: An,
  45: [rt, An],
  60: er,
  61: rt,
  95: An,
  96: tt,
  126: tt
}, Wr = {
  38: mt,
  92: pt
}, Ur = {
  [-5]: Ln,
  [-4]: Ln,
  [-3]: Ln,
  33: wr,
  38: mt,
  42: Mn,
  60: [Se, sr],
  91: Sr,
  92: [Ze, pt],
  93: Nn,
  95: Mn,
  96: Oe
}, Qr = {
  null: [Mn, Br]
}, Gr = {
  null: [42, 95]
}, Yr = {
  null: []
}, Zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Gr,
  contentInitial: qr,
  disable: Yr,
  document: $r,
  flow: Vr,
  flowInitial: jr,
  insideSpan: Qr,
  string: Wr,
  text: Ur
}, Symbol.toStringTag, { value: "Module" }));
function Xr(n, r, t) {
  let e = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const a = {}, u = [];
  let i = [], l = [];
  const h = {
    attempt: C(y),
    check: C(m),
    consume: d,
    enter: x,
    exit: S,
    interrupt: C(m, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: E,
    events: [],
    now: w,
    parser: n,
    previous: null,
    sliceSerialize: k,
    sliceStream: c,
    write: o
  };
  let p = r.tokenize.call(s, h);
  return r.resolveAll && u.push(r), s;
  function o(z) {
    return i = Y(i, z), T(), i[i.length - 1] !== null ? [] : (L(r, 0), s.events = zn(u, s.events, s), s.events);
  }
  function k(z, D) {
    return Kr(c(z), D);
  }
  function c(z) {
    return Jr(i, z);
  }
  function w() {
    const {
      _bufferIndex: z,
      _index: D,
      line: B,
      column: R,
      offset: O
    } = e;
    return {
      _bufferIndex: z,
      _index: D,
      line: B,
      column: R,
      offset: O
    };
  }
  function E(z) {
    a[z.line] = z.column, b();
  }
  function T() {
    let z;
    for (; e._index < i.length; ) {
      const D = i[e._index];
      if (typeof D == "string")
        for (z = e._index, e._bufferIndex < 0 && (e._bufferIndex = 0); e._index === z && e._bufferIndex < D.length; )
          F(D.charCodeAt(e._bufferIndex));
      else
        F(D);
    }
  }
  function F(z) {
    p = p(z);
  }
  function d(z) {
    P(z) ? (e.line++, e.column = 1, e.offset += z === -3 ? 2 : 1, b()) : z !== -1 && (e.column++, e.offset++), e._bufferIndex < 0 ? e._index++ : (e._bufferIndex++, e._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    i[e._index].length && (e._bufferIndex = -1, e._index++)), s.previous = z;
  }
  function x(z, D) {
    const B = D || {};
    return B.type = z, B.start = w(), s.events.push(["enter", B, s]), l.push(B), B;
  }
  function S(z) {
    const D = l.pop();
    return D.end = w(), s.events.push(["exit", D, s]), D;
  }
  function y(z, D) {
    L(z, D.from);
  }
  function m(z, D) {
    D.restore();
  }
  function C(z, D) {
    return B;
    function B(R, O, U) {
      let j, N, V, g;
      return Array.isArray(R) ? (
        /* c8 ignore next 1 */
        q(R)
      ) : "tokenize" in R ? (
        // Looks like a construct.
        q([
          /** @type {Construct} */
          R
        ])
      ) : Q(R);
      function Q($) {
        return rn;
        function rn(tn) {
          const hn = tn !== null && $[tn], un = tn !== null && $.null, fn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(hn) ? hn : hn ? [hn] : [],
            ...Array.isArray(un) ? un : un ? [un] : []
          ];
          return q(fn)(tn);
        }
      }
      function q($) {
        return j = $, N = 0, $.length === 0 ? U : f($[N]);
      }
      function f($) {
        return rn;
        function rn(tn) {
          return g = I(), V = $, $.partial || (s.currentConstruct = $), $.name && s.parser.constructs.disable.null.includes($.name) ? nn() : $.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            D ? Object.assign(Object.create(s), D) : s,
            h,
            W,
            nn
          )(tn);
        }
      }
      function W($) {
        return z(V, g), O;
      }
      function nn($) {
        return g.restore(), ++N < j.length ? f(j[N]) : U;
      }
    }
  }
  function L(z, D) {
    z.resolveAll && !u.includes(z) && u.push(z), z.resolve && K(s.events, D, s.events.length - D, z.resolve(s.events.slice(D), s)), z.resolveTo && (s.events = z.resolveTo(s.events, s));
  }
  function I() {
    const z = w(), D = s.previous, B = s.currentConstruct, R = s.events.length, O = Array.from(l);
    return {
      from: R,
      restore: U
    };
    function U() {
      e = z, s.previous = D, s.currentConstruct = B, s.events.length = R, l = O, b();
    }
  }
  function b() {
    e.line in a && e.column < 2 && (e.column = a[e.line], e.offset += a[e.line] - 1);
  }
}
function Jr(n, r) {
  const t = r.start._index, e = r.start._bufferIndex, a = r.end._index, u = r.end._bufferIndex;
  let i;
  if (t === a)
    i = [n[t].slice(e, u)];
  else {
    if (i = n.slice(t, a), e > -1) {
      const l = i[0];
      typeof l == "string" ? i[0] = l.slice(e) : i.shift();
    }
    u > 0 && i.push(n[a].slice(0, u));
  }
  return i;
}
function Kr(n, r) {
  let t = -1;
  const e = [];
  let a;
  for (; ++t < n.length; ) {
    const u = n[t];
    let i;
    if (typeof u == "string")
      i = u;
    else switch (u) {
      case -5: {
        i = "\r";
        break;
      }
      case -4: {
        i = `
`;
        break;
      }
      case -3: {
        i = `\r
`;
        break;
      }
      case -2: {
        i = r ? " " : "	";
        break;
      }
      case -1: {
        if (!r && a) continue;
        i = " ";
        break;
      }
      default:
        i = String.fromCharCode(u);
    }
    a = u === -2, e.push(i);
  }
  return e.join("");
}
function ni(n) {
  const e = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      ht([Zr, ...(n || {}).extensions || []])
    ),
    content: a(me),
    defined: [],
    document: a(de),
    flow: a(Or),
    lazy: {},
    string: a(Rr),
    text: a(Nr)
  };
  return e;
  function a(u) {
    return i;
    function i(l) {
      return Xr(e, u, l);
    }
  }
}
function ti(n) {
  for (; !xt(n); )
    ;
  return n;
}
const it = /[\0\t\n\r]/g;
function ei() {
  let n = 1, r = "", t = !0, e;
  return a;
  function a(u, i, l) {
    const h = [];
    let s, p, o, k, c;
    for (u = r + (typeof u == "string" ? u.toString() : new TextDecoder(i || void 0).decode(u)), o = 0, r = "", t && (u.charCodeAt(0) === 65279 && o++, t = void 0); o < u.length; ) {
      if (it.lastIndex = o, s = it.exec(u), k = s && s.index !== void 0 ? s.index : u.length, c = u.charCodeAt(k), !s) {
        r = u.slice(o);
        break;
      }
      if (c === 10 && o === k && e)
        h.push(-3), e = void 0;
      else
        switch (e && (h.push(-5), e = void 0), o < k && (h.push(u.slice(o, k)), n += k - o), c) {
          case 0: {
            h.push(65533), n++;
            break;
          }
          case 9: {
            for (p = Math.ceil(n / 4) * 4, h.push(-2); n++ < p; ) h.push(-1);
            break;
          }
          case 10: {
            h.push(-4), n = 1;
            break;
          }
          default:
            e = !0, n = 1;
        }
      o = k + 1;
    }
    return l && (e && h.push(-5), r && h.push(r), h.push(null)), h;
  }
}
function ri(n, r, t) {
  return typeof r != "string" && (t = r, r = void 0), pe(t)(ti(ni(t).document().write(ei()(n, r, !0))));
}
const ii = {
  tokenize: hi,
  partial: !0
}, St = {
  tokenize: ci,
  partial: !0
}, Ft = {
  tokenize: gi,
  partial: !0
}, Ct = {
  tokenize: fi,
  partial: !0
}, ui = {
  tokenize: pi,
  partial: !0
}, At = {
  name: "wwwAutolink",
  tokenize: oi,
  previous: It
}, Et = {
  name: "protocolAutolink",
  tokenize: si,
  previous: zt
}, gn = {
  name: "emailAutolink",
  tokenize: li,
  previous: Tt
}, sn = {};
function ai() {
  return {
    text: sn
  };
}
let mn = 48;
for (; mn < 123; )
  sn[mn] = gn, mn++, mn === 58 ? mn = 65 : mn === 91 && (mn = 97);
sn[43] = gn;
sn[45] = gn;
sn[46] = gn;
sn[95] = gn;
sn[72] = [gn, Et];
sn[104] = [gn, Et];
sn[87] = [gn, At];
sn[119] = [gn, At];
function li(n, r, t) {
  const e = this;
  let a, u;
  return i;
  function i(o) {
    return !Bn(o) || !Tt.call(e, e.previous) || Hn(e.events) ? t(o) : (n.enter("literalAutolink"), n.enter("literalAutolinkEmail"), l(o));
  }
  function l(o) {
    return Bn(o) ? (n.consume(o), l) : o === 64 ? (n.consume(o), h) : t(o);
  }
  function h(o) {
    return o === 46 ? n.check(ui, p, s)(o) : o === 45 || o === 95 || Z(o) ? (u = !0, n.consume(o), h) : p(o);
  }
  function s(o) {
    return n.consume(o), a = !0, h;
  }
  function p(o) {
    return u && a && X(e.previous) ? (n.exit("literalAutolinkEmail"), n.exit("literalAutolink"), r(o)) : t(o);
  }
}
function oi(n, r, t) {
  const e = this;
  return a;
  function a(i) {
    return i !== 87 && i !== 119 || !It.call(e, e.previous) || Hn(e.events) ? t(i) : (n.enter("literalAutolink"), n.enter("literalAutolinkWww"), n.check(ii, n.attempt(St, n.attempt(Ft, u), t), t)(i));
  }
  function u(i) {
    return n.exit("literalAutolinkWww"), n.exit("literalAutolink"), r(i);
  }
}
function si(n, r, t) {
  const e = this;
  let a = "", u = !1;
  return i;
  function i(o) {
    return (o === 72 || o === 104) && zt.call(e, e.previous) && !Hn(e.events) ? (n.enter("literalAutolink"), n.enter("literalAutolinkHttp"), a += String.fromCodePoint(o), n.consume(o), l) : t(o);
  }
  function l(o) {
    if (X(o) && a.length < 5)
      return a += String.fromCodePoint(o), n.consume(o), l;
    if (o === 58) {
      const k = a.toLowerCase();
      if (k === "http" || k === "https")
        return n.consume(o), h;
    }
    return t(o);
  }
  function h(o) {
    return o === 47 ? (n.consume(o), u ? s : (u = !0, h)) : t(o);
  }
  function s(o) {
    return o === null || En(o) || H(o) || bn(o) || Rn(o) ? t(o) : n.attempt(St, n.attempt(Ft, p), t)(o);
  }
  function p(o) {
    return n.exit("literalAutolinkHttp"), n.exit("literalAutolink"), r(o);
  }
}
function hi(n, r, t) {
  let e = 0;
  return a;
  function a(i) {
    return (i === 87 || i === 119) && e < 3 ? (e++, n.consume(i), a) : i === 46 && e === 3 ? (n.consume(i), u) : t(i);
  }
  function u(i) {
    return i === null ? t(i) : r(i);
  }
}
function ci(n, r, t) {
  let e, a, u;
  return i;
  function i(s) {
    return s === 46 || s === 95 ? n.check(Ct, h, l)(s) : s === null || H(s) || bn(s) || s !== 45 && Rn(s) ? h(s) : (u = !0, n.consume(s), i);
  }
  function l(s) {
    return s === 95 ? e = !0 : (a = e, e = void 0), n.consume(s), i;
  }
  function h(s) {
    return a || e || !u ? t(s) : r(s);
  }
}
function gi(n, r) {
  let t = 0, e = 0;
  return a;
  function a(i) {
    return i === 40 ? (t++, n.consume(i), a) : i === 41 && e < t ? u(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? n.check(Ct, r, u)(i) : i === null || H(i) || bn(i) ? r(i) : (n.consume(i), a);
  }
  function u(i) {
    return i === 41 && e++, n.consume(i), a;
  }
}
function fi(n, r, t) {
  return e;
  function e(l) {
    return l === 33 || l === 34 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 63 || l === 95 || l === 126 ? (n.consume(l), e) : l === 38 ? (n.consume(l), u) : l === 93 ? (n.consume(l), a) : (
      // `<` is an end.
      l === 60 || // So is whitespace.
      l === null || H(l) || bn(l) ? r(l) : t(l)
    );
  }
  function a(l) {
    return l === null || l === 40 || l === 91 || H(l) || bn(l) ? r(l) : e(l);
  }
  function u(l) {
    return X(l) ? i(l) : t(l);
  }
  function i(l) {
    return l === 59 ? (n.consume(l), e) : X(l) ? (n.consume(l), i) : t(l);
  }
}
function pi(n, r, t) {
  return e;
  function e(u) {
    return n.consume(u), a;
  }
  function a(u) {
    return Z(u) ? t(u) : r(u);
  }
}
function It(n) {
  return n === null || n === 40 || n === 42 || n === 95 || n === 91 || n === 93 || n === 126 || H(n);
}
function zt(n) {
  return !X(n);
}
function Tt(n) {
  return !(n === 47 || Bn(n));
}
function Bn(n) {
  return n === 43 || n === 45 || n === 46 || n === 95 || Z(n);
}
function Hn(n) {
  let r = n.length, t = !1;
  for (; r--; ) {
    const e = n[r][1];
    if ((e.type === "labelLink" || e.type === "labelImage") && !e._balanced) {
      t = !0;
      break;
    }
    if (e._gfmAutolinkLiteralWalkedInto) {
      t = !1;
      break;
    }
  }
  return n.length > 0 && !t && (n[n.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), t;
}
function mi() {
  return {
    exit: {
      literalAutolinkEmail: di,
      literalAutolinkHttp: ki,
      literalAutolinkWww: xi
    }
  };
}
function xi(n) {
  $n.call(this, n, "http://");
}
function di(n) {
  $n.call(this, n, "mailto:");
}
function ki(n) {
  $n.call(this, n);
}
function $n(n, r) {
  const t = this.sliceSerialize(n);
  this.tag('<a href="' + xn((r || "") + t) + '">'), this.raw(this.encode(t)), this.tag("</a>");
}
const bi = {
  tokenize: Ii,
  partial: !0
};
function wi() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: Ci,
        continuation: {
          tokenize: Ai
        },
        exit: Ei
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: Fi
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: yi,
        resolveTo: Si
      }
    }
  };
}
function yi(n, r, t) {
  const e = this;
  let a = e.events.length;
  const u = e.parser.gfmFootnotes || (e.parser.gfmFootnotes = []);
  let i;
  for (; a--; ) {
    const h = e.events[a][1];
    if (h.type === "labelImage") {
      i = h;
      break;
    }
    if (h.type === "gfmFootnoteCall" || h.type === "labelLink" || h.type === "label" || h.type === "image" || h.type === "link")
      break;
  }
  return l;
  function l(h) {
    if (!i || !i._balanced)
      return t(h);
    const s = on(e.sliceSerialize({
      start: i.end,
      end: e.now()
    }));
    return s.codePointAt(0) !== 94 || !u.includes(s.slice(1)) ? t(h) : (n.enter("gfmFootnoteCallLabelMarker"), n.consume(h), n.exit("gfmFootnoteCallLabelMarker"), r(h));
  }
}
function Si(n, r) {
  let t = n.length;
  for (; t--; )
    if (n[t][1].type === "labelImage" && n[t][0] === "enter") {
      n[t][1];
      break;
    }
  n[t + 1][1].type = "data", n[t + 3][1].type = "gfmFootnoteCallLabelMarker";
  const e = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, n[t + 3][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  }, a = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, n[t + 3][1].end),
    end: Object.assign({}, n[t + 3][1].end)
  };
  a.end.column++, a.end.offset++, a.end._bufferIndex++;
  const u = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, a.end),
    end: Object.assign({}, n[n.length - 1][1].start)
  }, i = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, u.start),
    end: Object.assign({}, u.end)
  }, l = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    n[t + 1],
    n[t + 2],
    ["enter", e, r],
    // The `[`
    n[t + 3],
    n[t + 4],
    // The `^`.
    ["enter", a, r],
    ["exit", a, r],
    // Everything in between.
    ["enter", u, r],
    ["enter", i, r],
    ["exit", i, r],
    ["exit", u, r],
    // The ending (`]`, properly parsed and labelled).
    n[n.length - 2],
    n[n.length - 1],
    ["exit", e, r]
  ];
  return n.splice(t, n.length - t + 1, ...l), n;
}
function Fi(n, r, t) {
  const e = this, a = e.parser.gfmFootnotes || (e.parser.gfmFootnotes = []);
  let u = 0, i;
  return l;
  function l(o) {
    return n.enter("gfmFootnoteCall"), n.enter("gfmFootnoteCallLabelMarker"), n.consume(o), n.exit("gfmFootnoteCallLabelMarker"), h;
  }
  function h(o) {
    return o !== 94 ? t(o) : (n.enter("gfmFootnoteCallMarker"), n.consume(o), n.exit("gfmFootnoteCallMarker"), n.enter("gfmFootnoteCallString"), n.enter("chunkString").contentType = "string", s);
  }
  function s(o) {
    if (
      // Too long.
      u > 999 || // Closing brace with nothing.
      o === 93 && !i || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      o === null || o === 91 || H(o)
    )
      return t(o);
    if (o === 93) {
      n.exit("chunkString");
      const k = n.exit("gfmFootnoteCallString");
      return a.includes(on(e.sliceSerialize(k))) ? (n.enter("gfmFootnoteCallLabelMarker"), n.consume(o), n.exit("gfmFootnoteCallLabelMarker"), n.exit("gfmFootnoteCall"), r) : t(o);
    }
    return H(o) || (i = !0), u++, n.consume(o), o === 92 ? p : s;
  }
  function p(o) {
    return o === 91 || o === 92 || o === 93 ? (n.consume(o), u++, s) : s(o);
  }
}
function Ci(n, r, t) {
  const e = this, a = e.parser.gfmFootnotes || (e.parser.gfmFootnotes = []);
  let u, i = 0, l;
  return h;
  function h(w) {
    return n.enter("gfmFootnoteDefinition")._container = !0, n.enter("gfmFootnoteDefinitionLabel"), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(w), n.exit("gfmFootnoteDefinitionLabelMarker"), s;
  }
  function s(w) {
    return w === 94 ? (n.enter("gfmFootnoteDefinitionMarker"), n.consume(w), n.exit("gfmFootnoteDefinitionMarker"), n.enter("gfmFootnoteDefinitionLabelString"), n.enter("chunkString").contentType = "string", p) : t(w);
  }
  function p(w) {
    if (
      // Too long.
      i > 999 || // Closing brace with nothing.
      w === 93 && !l || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      w === null || w === 91 || H(w)
    )
      return t(w);
    if (w === 93) {
      n.exit("chunkString");
      const E = n.exit("gfmFootnoteDefinitionLabelString");
      return u = on(e.sliceSerialize(E)), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(w), n.exit("gfmFootnoteDefinitionLabelMarker"), n.exit("gfmFootnoteDefinitionLabel"), k;
    }
    return H(w) || (l = !0), i++, n.consume(w), w === 92 ? o : p;
  }
  function o(w) {
    return w === 91 || w === 92 || w === 93 ? (n.consume(w), i++, p) : p(w);
  }
  function k(w) {
    return w === 58 ? (n.enter("definitionMarker"), n.consume(w), n.exit("definitionMarker"), a.includes(u) || a.push(u), M(n, c, "gfmFootnoteDefinitionWhitespace")) : t(w);
  }
  function c(w) {
    return r(w);
  }
}
function Ai(n, r, t) {
  return n.check(Fn, r, n.attempt(bi, r, t));
}
function Ei(n) {
  n.exit("gfmFootnoteDefinition");
}
function Ii(n, r, t) {
  const e = this;
  return M(n, a, "gfmFootnoteDefinitionIndent", 5);
  function a(u) {
    const i = e.events[e.events.length - 1];
    return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? r(u) : t(u);
  }
}
const zi = {}.hasOwnProperty, Ti = {};
function Di(n, r) {
  return "Back to reference " + (n + 1) + (r > 1 ? "-" + r : "");
}
function Li(n) {
  const r = Ti, t = r.label || "Footnotes", e = r.labelTagName || "h2", a = r.labelAttributes === null || r.labelAttributes === void 0 ? 'class="sr-only"' : r.labelAttributes, u = r.backLabel || Di, i = r.clobberPrefix === null || r.clobberPrefix === void 0 ? "user-content-" : r.clobberPrefix;
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
        let l = this.getData("gfmFootnoteDefinitions");
        const h = this.getData("gfmFootnoteDefinitionStack"), s = this.getData("tightStack"), p = h.pop(), o = this.resume();
        l || this.setData("gfmFootnoteDefinitions", l = {}), zi.call(l, p) || (l[p] = o), s.pop(), this.setData("slurpOneLineEnding", !0), this.setData("lastWasTag");
      },
      gfmFootnoteDefinitionLabelString(l) {
        let h = this.getData("gfmFootnoteDefinitionStack");
        h || this.setData("gfmFootnoteDefinitionStack", h = []), h.push(on(this.sliceSerialize(l))), this.resume(), this.buffer();
      },
      gfmFootnoteCallString(l) {
        let h = this.getData("gfmFootnoteCallOrder"), s = this.getData("gfmFootnoteCallCounts");
        const p = on(this.sliceSerialize(l));
        let o;
        this.resume(), h || this.setData("gfmFootnoteCallOrder", h = []), s || this.setData("gfmFootnoteCallCounts", s = {});
        const k = h.indexOf(p), c = xn(p.toLowerCase());
        k === -1 ? (h.push(p), s[p] = 1, o = h.length) : (s[p]++, o = k + 1);
        const w = s[p];
        this.tag('<sup><a href="#' + i + "fn-" + c + '" id="' + i + "fnref-" + c + (w > 1 ? "-" + w : "") + '" data-footnote-ref="" aria-describedby="footnote-label">' + String(o) + "</a></sup>");
      },
      null() {
        const l = this.getData("gfmFootnoteCallOrder") || [], h = this.getData("gfmFootnoteCallCounts") || {}, s = this.getData("gfmFootnoteDefinitions") || {};
        let p = -1;
        for (l.length > 0 && (this.lineEndingIfNeeded(), this.tag('<section data-footnotes="" class="footnotes"><' + e + ' id="footnote-label"' + (a ? " " + a : "") + ">"), this.raw(this.encode(t)), this.tag("</" + e + ">"), this.lineEndingIfNeeded(), this.tag("<ol>")); ++p < l.length; ) {
          const o = l[p], k = xn(o.toLowerCase());
          let c = 0;
          const w = [];
          for (; ++c <= h[o]; )
            w.push('<a href="#' + i + "fnref-" + k + (c > 1 ? "-" + c : "") + '" data-footnote-backref="" aria-label="' + this.encode(typeof u == "string" ? u : u(p, c)) + '" class="data-footnote-backref">↩' + (c > 1 ? "<sup>" + c + "</sup>" : "") + "</a>");
          const E = w.join(" ");
          let T = !1;
          this.lineEndingIfNeeded(), this.tag('<li id="' + i + "fn-" + k + '">'), this.lineEndingIfNeeded(), this.tag(s[o].replace(/<\/p>(?:\r?\n|\r)?$/, function(F) {
            return T = !0, " " + E + F;
          })), T || (this.lineEndingIfNeeded(), this.tag(E)), this.lineEndingIfNeeded(), this.tag("</li>");
        }
        l.length > 0 && (this.lineEndingIfNeeded(), this.tag("</ol>"), this.lineEndingIfNeeded(), this.tag("</section>"));
      }
    }
  };
}
function _i() {
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
function Pi(n) {
  let t = {}.singleTilde;
  const e = {
    name: "strikethrough",
    tokenize: u,
    resolveAll: a
  };
  return t == null && (t = !0), {
    text: {
      126: e
    },
    insideSpan: {
      null: [e]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function a(i, l) {
    let h = -1;
    for (; ++h < i.length; )
      if (i[h][0] === "enter" && i[h][1].type === "strikethroughSequenceTemporary" && i[h][1]._close) {
        let s = h;
        for (; s--; )
          if (i[s][0] === "exit" && i[s][1].type === "strikethroughSequenceTemporary" && i[s][1]._open && // If the sizes are the same:
          i[h][1].end.offset - i[h][1].start.offset === i[s][1].end.offset - i[s][1].start.offset) {
            i[h][1].type = "strikethroughSequence", i[s][1].type = "strikethroughSequence";
            const p = {
              type: "strikethrough",
              start: Object.assign({}, i[s][1].start),
              end: Object.assign({}, i[h][1].end)
            }, o = {
              type: "strikethroughText",
              start: Object.assign({}, i[s][1].end),
              end: Object.assign({}, i[h][1].start)
            }, k = [["enter", p, l], ["enter", i[s][1], l], ["exit", i[s][1], l], ["enter", o, l]], c = l.parser.constructs.insideSpan.null;
            c && K(k, k.length, 0, zn(c, i.slice(s + 1, h), l)), K(k, k.length, 0, [["exit", o, l], ["enter", i[h][1], l], ["exit", i[h][1], l], ["exit", p, l]]), K(i, s - 1, h - s + 3, k), h = s + k.length - 2;
            break;
          }
      }
    for (h = -1; ++h < i.length; )
      i[h][1].type === "strikethroughSequenceTemporary" && (i[h][1].type = "data");
    return i;
  }
  function u(i, l, h) {
    const s = this.previous, p = this.events;
    let o = 0;
    return k;
    function k(w) {
      return s === 126 && p[p.length - 1][1].type !== "characterEscape" ? h(w) : (i.enter("strikethroughSequenceTemporary"), c(w));
    }
    function c(w) {
      const E = In(s);
      if (w === 126)
        return o > 1 ? h(w) : (i.consume(w), o++, c);
      if (o < 2 && !t) return h(w);
      const T = i.exit("strikethroughSequenceTemporary"), F = In(w);
      return T._open = !F || F === 2 && !!E, T._close = !E || E === 2 && !!F, l(w);
    }
  }
}
const _n = {
  none: "",
  left: ' align="left"',
  right: ' align="right"',
  center: ' align="center"'
};
function vi() {
  return {
    enter: {
      table(n) {
        const r = n._align;
        this.lineEndingIfNeeded(), this.tag("<table>"), this.setData("tableAlign", r);
      },
      tableBody() {
        this.tag("<tbody>");
      },
      tableData() {
        const n = this.getData("tableAlign"), r = this.getData("tableColumn"), t = _n[n[r]];
        t === void 0 ? this.buffer() : (this.lineEndingIfNeeded(), this.tag("<td" + t + ">"));
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("<thead>");
      },
      tableHeader() {
        const n = this.getData("tableAlign"), r = this.getData("tableColumn"), t = _n[n[r]];
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
        let r = this.sliceSerialize(n);
        this.getData("tableAlign") && (r = r.replace(/\\([\\|])/g, Oi)), this.raw(this.encode(r));
      },
      table() {
        this.setData("tableAlign"), this.setData("slurpAllLineEndings"), this.lineEndingIfNeeded(), this.tag("</table>");
      },
      tableBody() {
        this.lineEndingIfNeeded(), this.tag("</tbody>");
      },
      tableData() {
        const n = this.getData("tableAlign"), r = this.getData("tableColumn");
        r in n ? (this.tag("</td>"), this.setData("tableColumn", r + 1)) : this.resume();
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
        let r = this.getData("tableColumn");
        for (; r < n.length; )
          this.lineEndingIfNeeded(), this.tag("<td" + _n[n[r]] + "></td>"), r++;
        this.setData("tableColumn", r), this.lineEndingIfNeeded(), this.tag("</tr>");
      }
    }
  };
}
function Oi(n, r) {
  return r === "|" ? r : n;
}
class Mi {
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
  add(r, t, e) {
    Bi(this, r, t, e);
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
  consume(r) {
    if (this.map.sort(function(u, i) {
      return u[0] - i[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const e = [];
    for (; t > 0; )
      t -= 1, e.push(r.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), r.length = this.map[t][0];
    e.push(r.slice()), r.length = 0;
    let a = e.pop();
    for (; a; ) {
      for (const u of a)
        r.push(u);
      a = e.pop();
    }
    this.map.length = 0;
  }
}
function Bi(n, r, t, e) {
  let a = 0;
  if (!(t === 0 && e.length === 0)) {
    for (; a < n.map.length; ) {
      if (n.map[a][0] === r) {
        n.map[a][1] += t, n.map[a][2].push(...e);
        return;
      }
      a += 1;
    }
    n.map.push([r, t, e]);
  }
}
function Ri(n, r) {
  let t = !1;
  const e = [];
  for (; r < n.length; ) {
    const a = n[r];
    if (t) {
      if (a[0] === "enter")
        a[1].type === "tableContent" && e.push(n[r + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (a[1].type === "tableContent") {
        if (n[r - 1][1].type === "tableDelimiterMarker") {
          const u = e.length - 1;
          e[u] = e[u] === "left" ? "center" : "right";
        }
      } else if (a[1].type === "tableDelimiterRow")
        break;
    } else a[0] === "enter" && a[1].type === "tableDelimiterRow" && (t = !0);
    r += 1;
  }
  return e;
}
function Ni() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Hi,
        resolveAll: $i
      }
    }
  };
}
function Hi(n, r, t) {
  const e = this;
  let a = 0, u = 0, i;
  return l;
  function l(b) {
    let z = e.events.length - 1;
    for (; z > -1; ) {
      const R = e.events[z][1].type;
      if (R === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      R === "linePrefix") z--;
      else break;
    }
    const D = z > -1 ? e.events[z][1].type : null, B = D === "tableHead" || D === "tableRow" ? m : h;
    return B === m && e.parser.lazy[e.now().line] ? t(b) : B(b);
  }
  function h(b) {
    return n.enter("tableHead"), n.enter("tableRow"), s(b);
  }
  function s(b) {
    return b === 124 || (i = !0, u += 1), p(b);
  }
  function p(b) {
    return b === null ? t(b) : P(b) ? u > 1 ? (u = 0, e.interrupt = !0, n.exit("tableRow"), n.enter("lineEnding"), n.consume(b), n.exit("lineEnding"), c) : t(b) : v(b) ? M(n, p, "whitespace")(b) : (u += 1, i && (i = !1, a += 1), b === 124 ? (n.enter("tableCellDivider"), n.consume(b), n.exit("tableCellDivider"), i = !0, p) : (n.enter("data"), o(b)));
  }
  function o(b) {
    return b === null || b === 124 || H(b) ? (n.exit("data"), p(b)) : (n.consume(b), b === 92 ? k : o);
  }
  function k(b) {
    return b === 92 || b === 124 ? (n.consume(b), o) : o(b);
  }
  function c(b) {
    return e.interrupt = !1, e.parser.lazy[e.now().line] ? t(b) : (n.enter("tableDelimiterRow"), i = !1, v(b) ? M(n, w, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(b) : w(b));
  }
  function w(b) {
    return b === 45 || b === 58 ? T(b) : b === 124 ? (i = !0, n.enter("tableCellDivider"), n.consume(b), n.exit("tableCellDivider"), E) : y(b);
  }
  function E(b) {
    return v(b) ? M(n, T, "whitespace")(b) : T(b);
  }
  function T(b) {
    return b === 58 ? (u += 1, i = !0, n.enter("tableDelimiterMarker"), n.consume(b), n.exit("tableDelimiterMarker"), F) : b === 45 ? (u += 1, F(b)) : b === null || P(b) ? S(b) : y(b);
  }
  function F(b) {
    return b === 45 ? (n.enter("tableDelimiterFiller"), d(b)) : y(b);
  }
  function d(b) {
    return b === 45 ? (n.consume(b), d) : b === 58 ? (i = !0, n.exit("tableDelimiterFiller"), n.enter("tableDelimiterMarker"), n.consume(b), n.exit("tableDelimiterMarker"), x) : (n.exit("tableDelimiterFiller"), x(b));
  }
  function x(b) {
    return v(b) ? M(n, S, "whitespace")(b) : S(b);
  }
  function S(b) {
    return b === 124 ? w(b) : b === null || P(b) ? !i || a !== u ? y(b) : (n.exit("tableDelimiterRow"), n.exit("tableHead"), r(b)) : y(b);
  }
  function y(b) {
    return t(b);
  }
  function m(b) {
    return n.enter("tableRow"), C(b);
  }
  function C(b) {
    return b === 124 ? (n.enter("tableCellDivider"), n.consume(b), n.exit("tableCellDivider"), C) : b === null || P(b) ? (n.exit("tableRow"), r(b)) : v(b) ? M(n, C, "whitespace")(b) : (n.enter("data"), L(b));
  }
  function L(b) {
    return b === null || b === 124 || H(b) ? (n.exit("data"), C(b)) : (n.consume(b), b === 92 ? I : L);
  }
  function I(b) {
    return b === 92 || b === 124 ? (n.consume(b), L) : L(b);
  }
}
function $i(n, r) {
  let t = -1, e = !0, a = 0, u = [0, 0, 0, 0], i = [0, 0, 0, 0], l = !1, h = 0, s, p, o;
  const k = new Mi();
  for (; ++t < n.length; ) {
    const c = n[t], w = c[1];
    c[0] === "enter" ? w.type === "tableHead" ? (l = !1, h !== 0 && (ut(k, r, h, s, p), p = void 0, h = 0), s = {
      type: "table",
      start: Object.assign({}, w.start),
      // Note: correct end is set later.
      end: Object.assign({}, w.end)
    }, k.add(t, 0, [["enter", s, r]])) : w.type === "tableRow" || w.type === "tableDelimiterRow" ? (e = !0, o = void 0, u = [0, 0, 0, 0], i = [0, t + 1, 0, 0], l && (l = !1, p = {
      type: "tableBody",
      start: Object.assign({}, w.start),
      // Note: correct end is set later.
      end: Object.assign({}, w.end)
    }, k.add(t, 0, [["enter", p, r]])), a = w.type === "tableDelimiterRow" ? 2 : p ? 3 : 1) : a && (w.type === "data" || w.type === "tableDelimiterMarker" || w.type === "tableDelimiterFiller") ? (e = !1, i[2] === 0 && (u[1] !== 0 && (i[0] = i[1], o = Cn(k, r, u, a, void 0, o), u = [0, 0, 0, 0]), i[2] = t)) : w.type === "tableCellDivider" && (e ? e = !1 : (u[1] !== 0 && (i[0] = i[1], o = Cn(k, r, u, a, void 0, o)), u = i, i = [u[1], t, 0, 0])) : w.type === "tableHead" ? (l = !0, h = t) : w.type === "tableRow" || w.type === "tableDelimiterRow" ? (h = t, u[1] !== 0 ? (i[0] = i[1], o = Cn(k, r, u, a, t, o)) : i[1] !== 0 && (o = Cn(k, r, i, a, t, o)), a = 0) : a && (w.type === "data" || w.type === "tableDelimiterMarker" || w.type === "tableDelimiterFiller") && (i[3] = t);
  }
  for (h !== 0 && ut(k, r, h, s, p), k.consume(r.events), t = -1; ++t < r.events.length; ) {
    const c = r.events[t];
    c[0] === "enter" && c[1].type === "table" && (c[1]._align = Ri(r.events, t));
  }
  return n;
}
function Cn(n, r, t, e, a, u) {
  const i = e === 1 ? "tableHeader" : e === 2 ? "tableDelimiter" : "tableData", l = "tableContent";
  t[0] !== 0 && (u.end = Object.assign({}, kn(r.events, t[0])), n.add(t[0], 0, [["exit", u, r]]));
  const h = kn(r.events, t[1]);
  if (u = {
    type: i,
    start: Object.assign({}, h),
    // Note: correct end is set later.
    end: Object.assign({}, h)
  }, n.add(t[1], 0, [["enter", u, r]]), t[2] !== 0) {
    const s = kn(r.events, t[2]), p = kn(r.events, t[3]), o = {
      type: l,
      start: Object.assign({}, s),
      end: Object.assign({}, p)
    };
    if (n.add(t[2], 0, [["enter", o, r]]), e !== 2) {
      const k = r.events[t[2]], c = r.events[t[3]];
      if (k[1].end = Object.assign({}, c[1].end), k[1].type = "chunkText", k[1].contentType = "text", t[3] > t[2] + 1) {
        const w = t[2] + 1, E = t[3] - t[2] - 1;
        n.add(w, E, []);
      }
    }
    n.add(t[3] + 1, 0, [["exit", o, r]]);
  }
  return a !== void 0 && (u.end = Object.assign({}, kn(r.events, a)), n.add(a, 0, [["exit", u, r]]), u = void 0), u;
}
function ut(n, r, t, e, a) {
  const u = [], i = kn(r.events, t);
  a && (a.end = Object.assign({}, i), u.push(["exit", a, r])), e.end = Object.assign({}, i), u.push(["exit", e, r]), n.add(t + 1, 0, u);
}
function kn(n, r) {
  const t = n[r], e = t[0] === "enter" ? "start" : "end";
  return t[1][e];
}
const Dt = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi, qi = new RegExp("^" + Dt.source, "i");
function ji() {
  return {
    exit: {
      htmlFlowData(n) {
        at.call(this, n, Dt);
      },
      htmlTextData(n) {
        at.call(this, n, qi);
      }
    }
  };
}
function at(n, r) {
  let t = this.sliceSerialize(n);
  this.options.allowDangerousHtml && (t = t.replace(r, "&lt;$1$2")), this.raw(this.encode(t));
}
function Vi() {
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
const Wi = {
  name: "tasklistCheck",
  tokenize: Qi
};
function Ui() {
  return {
    text: {
      91: Wi
    }
  };
}
function Qi(n, r, t) {
  const e = this;
  return a;
  function a(h) {
    return (
      // Exit if there’s stuff before.
      e.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !e._gfmTasklistFirstContentOfListItem ? t(h) : (n.enter("taskListCheck"), n.enter("taskListCheckMarker"), n.consume(h), n.exit("taskListCheckMarker"), u)
    );
  }
  function u(h) {
    return H(h) ? (n.enter("taskListCheckValueUnchecked"), n.consume(h), n.exit("taskListCheckValueUnchecked"), i) : h === 88 || h === 120 ? (n.enter("taskListCheckValueChecked"), n.consume(h), n.exit("taskListCheckValueChecked"), i) : t(h);
  }
  function i(h) {
    return h === 93 ? (n.enter("taskListCheckMarker"), n.consume(h), n.exit("taskListCheckMarker"), n.exit("taskListCheck"), l) : t(h);
  }
  function l(h) {
    return P(h) ? r(h) : v(h) ? n.check({
      tokenize: Gi
    }, r, t)(h) : t(h);
  }
}
function Gi(n, r, t) {
  return M(n, e, "whitespace");
  function e(a) {
    return a === null ? t(a) : r(a);
  }
}
function Yi(n) {
  return ht([
    ai(),
    wi(),
    Pi(),
    Ni(),
    Ui()
  ]);
}
function Zi(n) {
  return ct([
    mi(),
    Li(),
    _i(),
    vi(),
    ji(),
    Vi()
  ]);
}
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: "keyword"
  }
};
Prism.languages.webmanifest = Prism.languages.json;
var lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xi(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Pn = { exports: {} }, ot;
function Ji() {
  return ot || (ot = 1, (function(n) {
    var r = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    var t = (function(e) {
      var a = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, u = 0, i = {}, l = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: e.Prism && e.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function d(x) {
            return x instanceof h ? new h(x.type, d(x.content), x.alias) : Array.isArray(x) ? x.map(d) : x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(d) {
            return Object.prototype.toString.call(d).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(d) {
            return d.__id || Object.defineProperty(d, "__id", { value: ++u }), d.__id;
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function d(x, S) {
            S = S || {};
            var y, m;
            switch (l.util.type(x)) {
              case "Object":
                if (m = l.util.objId(x), S[m])
                  return S[m];
                y = /** @type {Record<string, any>} */
                {}, S[m] = y;
                for (var C in x)
                  x.hasOwnProperty(C) && (y[C] = d(x[C], S));
                return (
                  /** @type {any} */
                  y
                );
              case "Array":
                return m = l.util.objId(x), S[m] ? S[m] : (y = [], S[m] = y, /** @type {Array} */
                /** @type {any} */
                x.forEach(function(L, I) {
                  y[I] = d(L, S);
                }), /** @type {any} */
                y);
              default:
                return x;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(d) {
            for (; d; ) {
              var x = a.exec(d.className);
              if (x)
                return x[1].toLowerCase();
              d = d.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(d, x) {
            d.className = d.className.replace(RegExp(a, "gi"), ""), d.classList.add("language-" + x);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document > "u")
              return null;
            if (document.currentScript && document.currentScript.tagName === "SCRIPT")
              return (
                /** @type {any} */
                document.currentScript
              );
            try {
              throw new Error();
            } catch (y) {
              var d = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(y.stack) || [])[1];
              if (d) {
                var x = document.getElementsByTagName("script");
                for (var S in x)
                  if (x[S].src == d)
                    return x[S];
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(d, x, S) {
            for (var y = "no-" + x; d; ) {
              var m = d.classList;
              if (m.contains(x))
                return !0;
              if (m.contains(y))
                return !1;
              d = d.parentElement;
            }
            return !!S;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: i,
          plaintext: i,
          text: i,
          txt: i,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(d, x) {
            var S = l.util.clone(l.languages[d]);
            for (var y in x)
              S[y] = x[y];
            return S;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(d, x, S, y) {
            y = y || /** @type {any} */
            l.languages;
            var m = y[d], C = {};
            for (var L in m)
              if (m.hasOwnProperty(L)) {
                if (L == x)
                  for (var I in S)
                    S.hasOwnProperty(I) && (C[I] = S[I]);
                S.hasOwnProperty(L) || (C[L] = m[L]);
              }
            var b = y[d];
            return y[d] = C, l.languages.DFS(l.languages, function(z, D) {
              D === b && z != d && (this[z] = C);
            }), C;
          },
          // Traverse a language definition with Depth First Search
          DFS: function d(x, S, y, m) {
            m = m || {};
            var C = l.util.objId;
            for (var L in x)
              if (x.hasOwnProperty(L)) {
                S.call(x, L, x[L], y || L);
                var I = x[L], b = l.util.type(I);
                b === "Object" && !m[C(I)] ? (m[C(I)] = !0, d(I, S, null, m)) : b === "Array" && !m[C(I)] && (m[C(I)] = !0, d(I, S, L, m));
              }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(d, x) {
          l.highlightAllUnder(document, d, x);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(d, x, S) {
          var y = {
            callback: S,
            container: d,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          l.hooks.run("before-highlightall", y), y.elements = Array.prototype.slice.apply(y.container.querySelectorAll(y.selector)), l.hooks.run("before-all-elements-highlight", y);
          for (var m = 0, C; C = y.elements[m++]; )
            l.highlightElement(C, x === !0, y.callback);
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(d, x, S) {
          var y = l.util.getLanguage(d), m = l.languages[y];
          l.util.setLanguage(d, y);
          var C = d.parentElement;
          C && C.nodeName.toLowerCase() === "pre" && l.util.setLanguage(C, y);
          var L = d.textContent, I = {
            element: d,
            language: y,
            grammar: m,
            code: L
          };
          function b(D) {
            I.highlightedCode = D, l.hooks.run("before-insert", I), I.element.innerHTML = I.highlightedCode, l.hooks.run("after-highlight", I), l.hooks.run("complete", I), S && S.call(I.element);
          }
          if (l.hooks.run("before-sanity-check", I), C = I.element.parentElement, C && C.nodeName.toLowerCase() === "pre" && !C.hasAttribute("tabindex") && C.setAttribute("tabindex", "0"), !I.code) {
            l.hooks.run("complete", I), S && S.call(I.element);
            return;
          }
          if (l.hooks.run("before-highlight", I), !I.grammar) {
            b(l.util.encode(I.code));
            return;
          }
          if (x && e.Worker) {
            var z = new Worker(l.filename);
            z.onmessage = function(D) {
              b(D.data);
            }, z.postMessage(JSON.stringify({
              language: I.language,
              code: I.code,
              immediateClose: !0
            }));
          } else
            b(l.highlight(I.code, I.grammar, I.language));
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(d, x, S) {
          var y = {
            code: d,
            grammar: x,
            language: S
          };
          if (l.hooks.run("before-tokenize", y), !y.grammar)
            throw new Error('The language "' + y.language + '" has no grammar.');
          return y.tokens = l.tokenize(y.code, y.grammar), l.hooks.run("after-tokenize", y), h.stringify(l.util.encode(y.tokens), y.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(d, x) {
          var S = x.rest;
          if (S) {
            for (var y in S)
              x[y] = S[y];
            delete x.rest;
          }
          var m = new o();
          return k(m, m.head, d), p(d, m, x, m.head, 0), w(m);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(d, x) {
            var S = l.hooks.all;
            S[d] = S[d] || [], S[d].push(x);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(d, x) {
            var S = l.hooks.all[d];
            if (!(!S || !S.length))
              for (var y = 0, m; m = S[y++]; )
                m(x);
          }
        },
        Token: h
      };
      e.Prism = l;
      function h(d, x, S, y) {
        this.type = d, this.content = x, this.alias = S, this.length = (y || "").length | 0;
      }
      h.stringify = function d(x, S) {
        if (typeof x == "string")
          return x;
        if (Array.isArray(x)) {
          var y = "";
          return x.forEach(function(b) {
            y += d(b, S);
          }), y;
        }
        var m = {
          type: x.type,
          content: d(x.content, S),
          tag: "span",
          classes: ["token", x.type],
          attributes: {},
          language: S
        }, C = x.alias;
        C && (Array.isArray(C) ? Array.prototype.push.apply(m.classes, C) : m.classes.push(C)), l.hooks.run("wrap", m);
        var L = "";
        for (var I in m.attributes)
          L += " " + I + '="' + (m.attributes[I] || "").replace(/"/g, "&quot;") + '"';
        return "<" + m.tag + ' class="' + m.classes.join(" ") + '"' + L + ">" + m.content + "</" + m.tag + ">";
      };
      function s(d, x, S, y) {
        d.lastIndex = x;
        var m = d.exec(S);
        if (m && y && m[1]) {
          var C = m[1].length;
          m.index += C, m[0] = m[0].slice(C);
        }
        return m;
      }
      function p(d, x, S, y, m, C) {
        for (var L in S)
          if (!(!S.hasOwnProperty(L) || !S[L])) {
            var I = S[L];
            I = Array.isArray(I) ? I : [I];
            for (var b = 0; b < I.length; ++b) {
              if (C && C.cause == L + "," + b)
                return;
              var z = I[b], D = z.inside, B = !!z.lookbehind, R = !!z.greedy, O = z.alias;
              if (R && !z.pattern.global) {
                var U = z.pattern.toString().match(/[imsuy]*$/)[0];
                z.pattern = RegExp(z.pattern.source, U + "g");
              }
              for (var j = z.pattern || z, N = y.next, V = m; N !== x.tail && !(C && V >= C.reach); V += N.value.length, N = N.next) {
                var g = N.value;
                if (x.length > d.length)
                  return;
                if (!(g instanceof h)) {
                  var Q = 1, q;
                  if (R) {
                    if (q = s(j, V, d, B), !q || q.index >= d.length)
                      break;
                    var $ = q.index, f = q.index + q[0].length, W = V;
                    for (W += N.value.length; $ >= W; )
                      N = N.next, W += N.value.length;
                    if (W -= N.value.length, V = W, N.value instanceof h)
                      continue;
                    for (var nn = N; nn !== x.tail && (W < f || typeof nn.value == "string"); nn = nn.next)
                      Q++, W += nn.value.length;
                    Q--, g = d.slice(V, W), q.index -= V;
                  } else if (q = s(j, 0, g, B), !q)
                    continue;
                  var $ = q.index, rn = q[0], tn = g.slice(0, $), hn = g.slice($ + rn.length), un = V + g.length;
                  C && un > C.reach && (C.reach = un);
                  var fn = N.prev;
                  tn && (fn = k(x, fn, tn), V += tn.length), c(x, fn, Q);
                  var Tn = new h(L, D ? l.tokenize(rn, D) : rn, O, rn);
                  if (N = k(x, fn, Tn), hn && k(x, N, hn), Q > 1) {
                    var dn = {
                      cause: L + "," + b,
                      reach: un
                    };
                    p(d, x, S, N.prev, V, dn), C && dn.reach > C.reach && (C.reach = dn.reach);
                  }
                }
              }
            }
          }
      }
      function o() {
        var d = { value: null, prev: null, next: null }, x = { value: null, prev: d, next: null };
        d.next = x, this.head = d, this.tail = x, this.length = 0;
      }
      function k(d, x, S) {
        var y = x.next, m = { value: S, prev: x, next: y };
        return x.next = m, y.prev = m, d.length++, m;
      }
      function c(d, x, S) {
        for (var y = x.next, m = 0; m < S && y !== d.tail; m++)
          y = y.next;
        x.next = y, y.prev = x, d.length -= m;
      }
      function w(d) {
        for (var x = [], S = d.head.next; S !== d.tail; )
          x.push(S.value), S = S.next;
        return x;
      }
      if (!e.document)
        return e.addEventListener && (l.disableWorkerMessageHandler || e.addEventListener("message", function(d) {
          var x = JSON.parse(d.data), S = x.language, y = x.code, m = x.immediateClose;
          e.postMessage(l.highlight(y, l.languages[S], S)), m && e.close();
        }, !1)), l;
      var E = l.util.currentScript();
      E && (l.filename = E.src, E.hasAttribute("data-manual") && (l.manual = !0));
      function T() {
        l.manual || l.highlightAll();
      }
      if (!l.manual) {
        var F = document.readyState;
        F === "loading" || F === "interactive" && E && E.defer ? document.addEventListener("DOMContentLoaded", T) : window.requestAnimationFrame ? window.requestAnimationFrame(T) : window.setTimeout(T, 16);
      }
      return l;
    })(r);
    n.exports && (n.exports = t), typeof lt < "u" && (lt.Prism = t), t.languages.markup = {
      comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
      },
      prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
      },
      doctype: {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null
            // see below
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: !0
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/
        }
      },
      cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: !0
                }
              ]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    }, t.languages.markup.tag.inside["attr-value"].inside.entity = t.languages.markup.entity, t.languages.markup.doctype.inside["internal-subset"].inside = t.languages.markup, t.hooks.add("wrap", function(e) {
      e.type === "entity" && (e.attributes.title = e.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(t.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function(a, u) {
        var i = {};
        i["language-" + u] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: t.languages[u]
        }, i.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var l = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: i
          }
        };
        l["language-" + u] = {
          pattern: /[\s\S]+/,
          inside: t.languages[u]
        };
        var h = {};
        h[a] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return a;
          }), "i"),
          lookbehind: !0,
          greedy: !0,
          inside: l
        }, t.languages.insertBefore("markup", "cdata", h);
      }
    }), Object.defineProperty(t.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(e, a) {
        t.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + e + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [a, "language-" + a],
                  inside: t.languages[a]
                },
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    }), t.languages.html = t.languages.markup, t.languages.mathml = t.languages.markup, t.languages.svg = t.languages.markup, t.languages.xml = t.languages.extend("markup", {}), t.languages.ssml = t.languages.xml, t.languages.atom = t.languages.xml, t.languages.rss = t.languages.xml, (function(e) {
      var a = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      e.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + a.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
            // See rest below
          }
        },
        url: {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + a.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + a.source + "$"),
              alias: "url"
            }
          }
        },
        selector: {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + a.source + ")*(?=\\s*\\{)"),
          lookbehind: !0
        },
        string: {
          pattern: a,
          greedy: !0
        },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }, e.languages.css.atrule.inside.rest = e.languages.css;
      var u = e.languages.markup;
      u && (u.tag.addInlined("style", "css"), u.tag.addAttribute("style", "css"));
    })(t), t.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: !0,
          greedy: !0
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    }, t.languages.javascript = t.languages.extend("clike", {
      "class-name": [
        t.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: !0
        }
      ],
      keyword: [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: !0
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: !0
      },
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), t.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, t.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: t.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: !0,
          inside: t.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: t.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: t.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: t.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), t.languages.insertBefore("javascript", "string", {
      hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: t.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
      }
    }), t.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
      }
    }), t.languages.markup && (t.languages.markup.tag.addInlined("script", "javascript"), t.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    )), t.languages.js = t.languages.javascript, (function() {
      if (typeof t > "u" || typeof document > "u")
        return;
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
      var e = "Loading…", a = function(E, T) {
        return "✖ Error " + E + " while fetching file: " + T;
      }, u = "✖ Error: File does not exist or is empty", i = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, l = "data-src-status", h = "loading", s = "loaded", p = "failed", o = "pre[data-src]:not([" + l + '="' + s + '"]):not([' + l + '="' + h + '"])';
      function k(E, T, F) {
        var d = new XMLHttpRequest();
        d.open("GET", E, !0), d.onreadystatechange = function() {
          d.readyState == 4 && (d.status < 400 && d.responseText ? T(d.responseText) : d.status >= 400 ? F(a(d.status, d.statusText)) : F(u));
        }, d.send(null);
      }
      function c(E) {
        var T = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(E || "");
        if (T) {
          var F = Number(T[1]), d = T[2], x = T[3];
          return d ? x ? [F, Number(x)] : [F, void 0] : [F, F];
        }
      }
      t.hooks.add("before-highlightall", function(E) {
        E.selector += ", " + o;
      }), t.hooks.add("before-sanity-check", function(E) {
        var T = (
          /** @type {HTMLPreElement} */
          E.element
        );
        if (T.matches(o)) {
          E.code = "", T.setAttribute(l, h);
          var F = T.appendChild(document.createElement("CODE"));
          F.textContent = e;
          var d = T.getAttribute("data-src"), x = E.language;
          if (x === "none") {
            var S = (/\.(\w+)$/.exec(d) || [, "none"])[1];
            x = i[S] || S;
          }
          t.util.setLanguage(F, x), t.util.setLanguage(T, x);
          var y = t.plugins.autoloader;
          y && y.loadLanguages(x), k(
            d,
            function(m) {
              T.setAttribute(l, s);
              var C = c(T.getAttribute("data-range"));
              if (C) {
                var L = m.split(/\r\n?|\n/g), I = C[0], b = C[1] == null ? L.length : C[1];
                I < 0 && (I += L.length), I = Math.max(0, Math.min(I - 1, L.length)), b < 0 && (b += L.length), b = Math.max(0, Math.min(b, L.length)), m = L.slice(I, b).join(`
`), T.hasAttribute("data-start") || T.setAttribute("data-start", String(I + 1));
              }
              F.textContent = m, t.highlightElement(F);
            },
            function(m) {
              T.setAttribute(l, p), F.textContent = m;
            }
          );
        }
      }), t.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function(T) {
          for (var F = (T || document).querySelectorAll(o), d = 0, x; x = F[d++]; )
            t.highlightElement(x);
        }
      };
      var w = !1;
      t.fileHighlight = function() {
        w || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), w = !0), t.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  })(Pn)), Pn.exports;
}
var Ki = Ji();
const Lt = /* @__PURE__ */ Xi(Ki);
typeof globalThis < "u" && (globalThis.Prism = Lt);
console.log(1111, Lt);
console.log(2222, globalThis);
const nu = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
class tu {
  options;
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      extensions: [Yi()],
      htmlExtensions: [Zi(), this.createPresenterCodeBlockHtmlExtension()]
    };
  }
  // Operations - Render.
  render(r) {
    return ri(r, this.options);
  }
  // Utilities - Create presenter code block.
  createPresenterCodeBlockHtmlExtension() {
    let r;
    return {
      enter: {
        codeFenced() {
          this.buffer(), r = { codeContent: [], lang: "", meta: "" };
        },
        codeFencedFence() {
        },
        codeFencedFenceSequence() {
        },
        codeFencedFenceInfo(t) {
          r && (r.lang = this.sliceSerialize(t));
        },
        codeFencedFenceMeta(t) {
          r && (r.meta = this.sliceSerialize(t));
        },
        codeFlowValue(t) {
          r && r.codeContent.push(this.sliceSerialize(t));
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
          const t = r || { codeContent: [], lang: "", meta: "" };
          this.resume();
          const e = t.codeContent.join(`
`), a = t.lang || "plain", u = t.meta || "";
          let i = "";
          if (console.log(3333, globalThis), a === "json" && u === "datapos-visual")
            i = `<div class="${u}" data-options="${encodeURIComponent(e)}"></div>`;
          else if (globalThis.Prism?.languages[a]) {
            const l = globalThis.Prism.highlight(e, globalThis.Prism.languages[a], a);
            i = `<pre class="language-${a}"><code>${l}</code></pre>`;
          } else
            i = `<pre class="language-text"><code>${e.replace(/[&<>"']/g, (h) => nu[h])}</code></pre>`;
          this.raw(i), r = void 0;
        }
      }
    };
  }
}
export {
  tu as default
};
