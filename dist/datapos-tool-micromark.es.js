const Je = document.createElement("i");
function gt(e) {
  const n = "&" + e + ";";
  Je.innerHTML = n;
  const t = Je.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t
  );
}
function ne(e, n, t, r) {
  const a = e.length;
  let i = 0, u;
  if (n < 0 ? n = -n > a ? 0 : a + n : n = n > a ? a : n, t = t > 0 ? t : 0, r.length < 1e4)
    u = Array.from(r), u.unshift(n, t), e.splice(...u);
  else
    for (t && e.splice(n, t); i < r.length; )
      u = r.slice(i, i + 1e4), u.unshift(n, 0), e.splice(...u), i += 1e4, n += 1e4;
}
function V(e, n) {
  return e.length > 0 ? (ne(e, e.length, 0, n), e) : n;
}
const De = {}.hasOwnProperty;
function Er(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    kr(n, e[t]);
  return n;
}
function kr(e, n) {
  let t;
  for (t in n) {
    const a = (De.call(e, t) ? e[t] : void 0) || (e[t] = {}), i = n[t];
    let u;
    if (i)
      for (u in i) {
        De.call(a, u) || (a[u] = []);
        const l = i[u];
        Ir(
          // @ts-expect-error Looks like a list.
          a[u],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function Ir(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  ne(e, 0, 0, r);
}
function Sr(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Tr(n, e[t]);
  return n;
}
function Tr(e, n) {
  let t;
  for (t in n) {
    const a = (De.call(e, t) ? e[t] : void 0) || (e[t] = {}), i = n[t];
    let u;
    if (i)
      for (u in i)
        a[u] = i[u];
  }
}
function wr(e, n) {
  const t = Number.parseInt(e, n);
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
const Cr = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function ft(e) {
  return e.replace(/["&<>]/g, n);
  function n(t) {
    return "&" + Cr[
      /** @type {keyof typeof characterReferences} */
      t
    ] + ";";
  }
}
function ye(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const te = oe(/[A-Za-z]/), W = oe(/[\dA-Za-z]/), Ar = oe(/[#-'*+\--9=?A-Z^-~]/);
function Fe(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const ze = oe(/\d/), Rr = oe(/[\dA-Fa-f]/), Nr = oe(/[!-/:-@[-`{-~]/);
function A(e) {
  return e !== null && e < -2;
}
function G(e) {
  return e !== null && (e < 0 || e === 32);
}
function O(e) {
  return e === -2 || e === -1 || e === 32;
}
const Or = oe(/\p{P}|\p{S}/u), Lr = oe(/\s/);
function oe(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function ke(e, n) {
  const t = ft(Dr(e || ""));
  if (!n)
    return t;
  const r = t.indexOf(":"), a = t.indexOf("?"), i = t.indexOf("#"), u = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    u > -1 && r > u || a > -1 && r > a || i > -1 && r > i || // It is a protocol, it should be allowed.
    n.test(t.slice(0, r)) ? t : ""
  );
}
function Dr(e) {
  const n = [];
  let t = -1, r = 0, a = 0;
  for (; ++t < e.length; ) {
    const i = e.charCodeAt(t);
    let u = "";
    if (i === 37 && W(e.charCodeAt(t + 1)) && W(e.charCodeAt(t + 2)))
      a = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (u = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const l = e.charCodeAt(t + 1);
      i < 56320 && l > 56319 && l < 57344 ? (u = String.fromCharCode(i, l), a = 1) : u = "�";
    } else
      u = String.fromCharCode(i);
    u && (n.push(e.slice(r, t), encodeURIComponent(u)), r = t + a + 1, u = ""), a && (t += a, a = 0);
  }
  return n.join("") + e.slice(r);
}
const et = {}.hasOwnProperty, tt = /^(https?|ircs?|mailto|xmpp)$/i, Fr = /^https?$/i;
function zr(e) {
  const n = e || {};
  let t = !0;
  const r = {}, a = [[]], i = [], u = [], g = (
    /** @type {NormalizedHtmlExtension} */
    Sr([{
      enter: {
        blockQuote: z,
        codeFenced: re,
        codeFencedFenceInfo: N,
        codeFencedFenceMeta: N,
        codeIndented: ie,
        codeText: mr,
        content: er,
        definition: Wn,
        definitionDestinationString: Qn,
        definitionLabelString: N,
        definitionTitleString: N,
        emphasis: cr,
        htmlFlow: or,
        htmlText: We,
        image: X,
        label: N,
        link: he,
        listItemMarker: S,
        listItemValue: d,
        listOrdered: M,
        listUnordered: B,
        paragraph: U,
        reference: N,
        resource: me,
        resourceDestinationString: pe,
        resourceTitleString: N,
        setextHeading: nr,
        strong: hr
      },
      exit: {
        atxHeading: ir,
        atxHeadingSequence: tr,
        autolinkEmail: yr,
        autolinkProtocol: xr,
        blockQuote: $,
        characterEscapeValue: de,
        characterReferenceMarkerHexadecimal: Ze,
        characterReferenceMarkerNumeric: Ze,
        characterReferenceValue: br,
        codeFenced: o,
        codeFencedFence: Q,
        codeFencedFenceInfo: s,
        codeFencedFenceMeta: D,
        codeFlowValue: sr,
        codeIndented: o,
        codeText: pr,
        codeTextData: de,
        data: de,
        definition: Jn,
        definitionDestinationString: Xn,
        definitionLabelString: Zn,
        definitionTitleString: Kn,
        emphasis: gr,
        hardBreakEscape: Ge,
        hardBreakTrailing: Ge,
        htmlFlow: Ye,
        htmlFlowData: de,
        htmlText: Ye,
        htmlTextData: de,
        image: Ve,
        label: fe,
        labelText: H,
        lineEnding: lr,
        link: Ve,
        listOrdered: w,
        listUnordered: j,
        paragraph: Z,
        reference: D,
        referenceString: le,
        resource: D,
        resourceDestinationString: we,
        resourceTitleString: Yn,
        setextHeading: ur,
        setextHeadingLineSequence: ar,
        setextHeadingText: rr,
        strong: fr,
        thematicBreak: dr
      }
    }, ...n.htmlExtensions || []])
  ), h = {
    definitions: r,
    tightStack: u
  }, p = {
    buffer: N,
    encode: b,
    getData: C,
    lineEndingIfNeeded: R,
    options: n,
    raw: k,
    resume: y,
    setData: x,
    tag: I
  };
  let m = n.defaultLineEnding;
  return f;
  function f(E) {
    let T = -1, q = 0;
    const K = [];
    let J = [], ae = [];
    for (; ++T < E.length; )
      !m && (E[T][1].type === "lineEnding" || E[T][1].type === "lineEndingBlank") && (m = /** @type {LineEnding} */
      E[T][2].sliceSerialize(E[T][1])), (E[T][1].type === "listOrdered" || E[T][1].type === "listUnordered") && (E[T][0] === "enter" ? K.push(T) : c(E.slice(K.pop(), T))), E[T][1].type === "definition" && (E[T][0] === "enter" ? (ae = V(ae, E.slice(q, T)), q = T) : (J = V(J, E.slice(q, T + 1)), q = T + 1));
    J = V(J, ae), J = V(J, E.slice(q)), T = -1;
    const ee = J;
    for (g.enter.null && g.enter.null.call(p); ++T < E.length; ) {
      const Qe = g[ee[T][0]], Xe = ee[T][1].type, Ke = Qe[Xe];
      et.call(Qe, Xe) && Ke && Ke.call({
        sliceSerialize: ee[T][2].sliceSerialize,
        ...p
      }, ee[T][1]);
    }
    return g.exit.null && g.exit.null.call(p), a[0].join("");
  }
  function c(E) {
    const T = E.length;
    let q = 0, K = 0, J = !1, ae;
    for (; ++q < T; ) {
      const ee = E[q];
      if (ee[1]._container)
        ae = void 0, ee[0] === "enter" ? K++ : K--;
      else switch (ee[1].type) {
        case "listItemPrefix": {
          ee[0] === "exit" && (ae = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          ee[0] === "enter" && !K && (ae ? ae = void 0 : J = !0);
          break;
        }
        default:
          ae = void 0;
      }
    }
    E[0][1]._loose = J;
  }
  function x(E, T) {
    h[E] = T;
  }
  function C(E) {
    return h[E];
  }
  function N() {
    a.push([]);
  }
  function y() {
    return a.pop().join("");
  }
  function I(E) {
    t && (x("lastWasTag", !0), a[a.length - 1].push(E));
  }
  function k(E) {
    x("lastWasTag"), a[a.length - 1].push(E);
  }
  function P() {
    k(m || `
`);
  }
  function R() {
    const E = a[a.length - 1], T = E[E.length - 1], q = T ? T.charCodeAt(T.length - 1) : null;
    q === 10 || q === 13 || q === null || P();
  }
  function b(E) {
    return C("ignoreEncode") ? E : ft(E);
  }
  function D() {
    y();
  }
  function M(E) {
    u.push(!E._loose), R(), I("<ol"), x("expectFirstItem", !0);
  }
  function B(E) {
    u.push(!E._loose), R(), I("<ul"), x("expectFirstItem", !0);
  }
  function d(E) {
    if (C("expectFirstItem")) {
      const T = Number.parseInt(this.sliceSerialize(E), 10);
      T !== 1 && I(' start="' + b(String(T)) + '"');
    }
  }
  function S() {
    C("expectFirstItem") ? I(">") : _(), R(), I("<li>"), x("expectFirstItem"), x("lastWasTag");
  }
  function w() {
    _(), u.pop(), P(), I("</ol>");
  }
  function j() {
    _(), u.pop(), P(), I("</ul>");
  }
  function _() {
    C("lastWasTag") && !C("slurpAllLineEndings") && R(), I("</li>"), x("slurpAllLineEndings");
  }
  function z() {
    u.push(!1), R(), I("<blockquote>");
  }
  function $() {
    u.pop(), R(), I("</blockquote>"), x("slurpAllLineEndings");
  }
  function U() {
    u[u.length - 1] || (R(), I("<p>")), x("slurpAllLineEndings");
  }
  function Z() {
    u[u.length - 1] ? x("slurpAllLineEndings", !0) : I("</p>");
  }
  function re() {
    R(), I("<pre><code"), x("fencesCount", 0);
  }
  function s() {
    const E = y();
    I(' class="language-' + E + '"');
  }
  function Q() {
    const E = C("fencesCount") || 0;
    E || (I(">"), x("slurpOneLineEnding", !0)), x("fencesCount", E + 1);
  }
  function ie() {
    R(), I("<pre><code>");
  }
  function o() {
    const E = C("fencesCount");
    E !== void 0 && E < 2 && h.tightStack.length > 0 && !C("lastWasTag") && P(), C("flowCodeSeenData") && R(), I("</code></pre>"), E !== void 0 && E < 2 && R(), x("flowCodeSeenData"), x("fencesCount"), x("slurpOneLineEnding");
  }
  function X() {
    i.push({
      image: !0
    }), t = void 0;
  }
  function he() {
    i.push({});
  }
  function H(E) {
    i[i.length - 1].labelId = this.sliceSerialize(E);
  }
  function fe() {
    i[i.length - 1].label = y();
  }
  function le(E) {
    i[i.length - 1].referenceId = this.sliceSerialize(E);
  }
  function me() {
    N(), i[i.length - 1].destination = "";
  }
  function pe() {
    N(), x("ignoreEncode", !0);
  }
  function we() {
    i[i.length - 1].destination = y(), x("ignoreEncode");
  }
  function Yn() {
    i[i.length - 1].title = y();
  }
  function Ve() {
    let E = i.length - 1;
    const T = i[E], q = T.referenceId || T.labelId, K = T.destination === void 0 ? r[ye(q)] : T;
    for (t = !0; E--; )
      if (i[E].image) {
        t = void 0;
        break;
      }
    T.image ? (I('<img src="' + ke(K.destination, n.allowDangerousProtocol ? void 0 : Fr) + '" alt="'), k(T.label), I('"')) : I('<a href="' + ke(K.destination, n.allowDangerousProtocol ? void 0 : tt) + '"'), I(K.title ? ' title="' + K.title + '"' : ""), T.image ? I(" />") : (I(">"), k(T.label), I("</a>")), i.pop();
  }
  function Wn() {
    N(), i.push({});
  }
  function Zn(E) {
    y(), i[i.length - 1].labelId = this.sliceSerialize(E);
  }
  function Qn() {
    N(), x("ignoreEncode", !0);
  }
  function Xn() {
    i[i.length - 1].destination = y(), x("ignoreEncode");
  }
  function Kn() {
    i[i.length - 1].title = y();
  }
  function Jn() {
    const E = i[i.length - 1], T = ye(E.labelId);
    y(), et.call(r, T) || (r[T] = i[i.length - 1]), i.pop();
  }
  function er() {
    x("slurpAllLineEndings", !0);
  }
  function tr(E) {
    C("headingRank") || (x("headingRank", this.sliceSerialize(E).length), R(), I("<h" + C("headingRank") + ">"));
  }
  function nr() {
    N(), x("slurpAllLineEndings");
  }
  function rr() {
    x("slurpAllLineEndings", !0);
  }
  function ir() {
    I("</h" + C("headingRank") + ">"), x("headingRank");
  }
  function ar(E) {
    x("headingRank", this.sliceSerialize(E).charCodeAt(0) === 61 ? 1 : 2);
  }
  function ur() {
    const E = y();
    R(), I("<h" + C("headingRank") + ">"), k(E), I("</h" + C("headingRank") + ">"), x("slurpAllLineEndings"), x("headingRank");
  }
  function de(E) {
    k(b(this.sliceSerialize(E)));
  }
  function lr(E) {
    if (!C("slurpAllLineEndings")) {
      if (C("slurpOneLineEnding")) {
        x("slurpOneLineEnding");
        return;
      }
      if (C("inCodeText")) {
        k(" ");
        return;
      }
      k(b(this.sliceSerialize(E)));
    }
  }
  function sr(E) {
    k(b(this.sliceSerialize(E))), x("flowCodeSeenData", !0);
  }
  function Ge() {
    I("<br />");
  }
  function or() {
    R(), We();
  }
  function Ye() {
    x("ignoreEncode");
  }
  function We() {
    n.allowDangerousHtml && x("ignoreEncode", !0);
  }
  function cr() {
    I("<em>");
  }
  function hr() {
    I("<strong>");
  }
  function mr() {
    x("inCodeText", !0), I("<code>");
  }
  function pr() {
    x("inCodeText"), I("</code>");
  }
  function gr() {
    I("</em>");
  }
  function fr() {
    I("</strong>");
  }
  function dr() {
    R(), I("<hr />");
  }
  function Ze(E) {
    x("characterReferenceType", E.type);
  }
  function br(E) {
    const T = this.sliceSerialize(E), q = C("characterReferenceType") ? wr(T, C("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : gt(T);
    k(b(
      /** @type {string} */
      q
    )), x("characterReferenceType");
  }
  function xr(E) {
    const T = this.sliceSerialize(E);
    I('<a href="' + ke(T, n.allowDangerousProtocol ? void 0 : tt) + '">'), k(b(T)), I("</a>");
  }
  function yr(E) {
    const T = this.sliceSerialize(E);
    I('<a href="' + ke("mailto:" + T) + '">'), k(b(T)), I("</a>");
  }
}
function v(e, n, t, r) {
  const a = r ? r - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return u;
  function u(g) {
    return O(g) ? (e.enter(t), l(g)) : n(g);
  }
  function l(g) {
    return O(g) && i++ < a ? (e.consume(g), l) : (e.exit(t), n(g));
  }
}
const Pr = {
  tokenize: vr
};
function vr(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, a);
  let t;
  return n;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), v(e, n, "linePrefix");
  }
  function a(l) {
    return e.enter("paragraph"), i(l);
  }
  function i(l) {
    const g = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = g), t = g, u(l);
  }
  function u(l) {
    if (l === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(l);
      return;
    }
    return A(l) ? (e.consume(l), e.exit("chunkText"), i) : (e.consume(l), u);
  }
}
const jr = {
  tokenize: Mr
}, nt = {
  tokenize: _r
};
function Mr(e) {
  const n = this, t = [];
  let r = 0, a, i, u;
  return l;
  function l(k) {
    if (r < t.length) {
      const P = t[r];
      return n.containerState = P[1], e.attempt(P[0].continuation, g, h)(k);
    }
    return h(k);
  }
  function g(k) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, a && I();
      const P = n.events.length;
      let R = P, b;
      for (; R--; )
        if (n.events[R][0] === "exit" && n.events[R][1].type === "chunkFlow") {
          b = n.events[R][1].end;
          break;
        }
      y(r);
      let D = P;
      for (; D < n.events.length; )
        n.events[D][1].end = {
          ...b
        }, D++;
      return ne(n.events, R + 1, 0, n.events.slice(P)), n.events.length = D, h(k);
    }
    return l(k);
  }
  function h(k) {
    if (r === t.length) {
      if (!a)
        return f(k);
      if (a.currentConstruct && a.currentConstruct.concrete)
        return x(k);
      n.interrupt = !!(a.currentConstruct && !a._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(nt, p, m)(k);
  }
  function p(k) {
    return a && I(), y(r), f(k);
  }
  function m(k) {
    return n.parser.lazy[n.now().line] = r !== t.length, u = n.now().offset, x(k);
  }
  function f(k) {
    return n.containerState = {}, e.attempt(nt, c, x)(k);
  }
  function c(k) {
    return r++, t.push([n.currentConstruct, n.containerState]), f(k);
  }
  function x(k) {
    if (k === null) {
      a && I(), y(0), e.consume(k);
      return;
    }
    return a = a || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: a,
      contentType: "flow",
      previous: i
    }), C(k);
  }
  function C(k) {
    if (k === null) {
      N(e.exit("chunkFlow"), !0), y(0), e.consume(k);
      return;
    }
    return A(k) ? (e.consume(k), N(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, l) : (e.consume(k), C);
  }
  function N(k, P) {
    const R = n.sliceStream(k);
    if (P && R.push(null), k.previous = i, i && (i.next = k), i = k, a.defineSkip(k.start), a.write(R), n.parser.lazy[k.start.line]) {
      let b = a.events.length;
      for (; b--; )
        if (
          // The token starts before the line ending…
          a.events[b][1].start.offset < u && // …and either is not ended yet…
          (!a.events[b][1].end || // …or ends after it.
          a.events[b][1].end.offset > u)
        )
          return;
      const D = n.events.length;
      let M = D, B, d;
      for (; M--; )
        if (n.events[M][0] === "exit" && n.events[M][1].type === "chunkFlow") {
          if (B) {
            d = n.events[M][1].end;
            break;
          }
          B = !0;
        }
      for (y(r), b = D; b < n.events.length; )
        n.events[b][1].end = {
          ...d
        }, b++;
      ne(n.events, M + 1, 0, n.events.slice(D)), n.events.length = b;
    }
  }
  function y(k) {
    let P = t.length;
    for (; P-- > k; ) {
      const R = t[P];
      n.containerState = R[1], R[0].exit.call(n, e);
    }
    t.length = k;
  }
  function I() {
    a.write([null]), i = void 0, a = void 0, n.containerState._closeFlow = void 0;
  }
}
function _r(e, n, t) {
  return v(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function rt(e) {
  if (e === null || G(e) || Lr(e))
    return 1;
  if (Or(e))
    return 2;
}
function ve(e, n, t) {
  const r = [];
  let a = -1;
  for (; ++a < e.length; ) {
    const i = e[a].resolveAll;
    i && !r.includes(i) && (n = i(n, t), r.push(i));
  }
  return n;
}
const Pe = {
  name: "attention",
  resolveAll: Br,
  tokenize: Ur
};
function Br(e, n) {
  let t = -1, r, a, i, u, l, g, h, p;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          g = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const m = {
            ...e[r][1].end
          }, f = {
            ...e[t][1].start
          };
          it(m, -g), it(f, g), u = {
            type: g > 1 ? "strongSequence" : "emphasisSequence",
            start: m,
            end: {
              ...e[r][1].end
            }
          }, l = {
            type: g > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: f
          }, i = {
            type: g > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, a = {
            type: g > 1 ? "strong" : "emphasis",
            start: {
              ...u.start
            },
            end: {
              ...l.end
            }
          }, e[r][1].end = {
            ...u.start
          }, e[t][1].start = {
            ...l.end
          }, h = [], e[r][1].end.offset - e[r][1].start.offset && (h = V(h, [["enter", e[r][1], n], ["exit", e[r][1], n]])), h = V(h, [["enter", a, n], ["enter", u, n], ["exit", u, n], ["enter", i, n]]), h = V(h, ve(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), h = V(h, [["exit", i, n], ["enter", l, n], ["exit", l, n], ["exit", a, n]]), e[t][1].end.offset - e[t][1].start.offset ? (p = 2, h = V(h, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : p = 0, ne(e, r - 1, t - r + 3, h), t = r + h.length - p - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Ur(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, a = rt(r);
  let i;
  return u;
  function u(g) {
    return i = g, e.enter("attentionSequence"), l(g);
  }
  function l(g) {
    if (g === i)
      return e.consume(g), l;
    const h = e.exit("attentionSequence"), p = rt(g), m = !p || p === 2 && a || t.includes(g), f = !a || a === 2 && p || t.includes(r);
    return h._open = !!(i === 42 ? m : m && (a || !f)), h._close = !!(i === 42 ? f : f && (p || !m)), n(g);
  }
}
function it(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Hr = {
  name: "autolink",
  tokenize: $r
};
function $r(e, n, t) {
  let r = 0;
  return a;
  function a(c) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(c), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), i;
  }
  function i(c) {
    return te(c) ? (e.consume(c), u) : c === 64 ? t(c) : h(c);
  }
  function u(c) {
    return c === 43 || c === 45 || c === 46 || W(c) ? (r = 1, l(c)) : h(c);
  }
  function l(c) {
    return c === 58 ? (e.consume(c), r = 0, g) : (c === 43 || c === 45 || c === 46 || W(c)) && r++ < 32 ? (e.consume(c), l) : (r = 0, h(c));
  }
  function g(c) {
    return c === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(c), e.exit("autolinkMarker"), e.exit("autolink"), n) : c === null || c === 32 || c === 60 || Fe(c) ? t(c) : (e.consume(c), g);
  }
  function h(c) {
    return c === 64 ? (e.consume(c), p) : Ar(c) ? (e.consume(c), h) : t(c);
  }
  function p(c) {
    return W(c) ? m(c) : t(c);
  }
  function m(c) {
    return c === 46 ? (e.consume(c), r = 0, p) : c === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(c), e.exit("autolinkMarker"), e.exit("autolink"), n) : f(c);
  }
  function f(c) {
    if ((c === 45 || W(c)) && r++ < 63) {
      const x = c === 45 ? f : m;
      return e.consume(c), x;
    }
    return t(c);
  }
}
const Te = {
  partial: !0,
  tokenize: qr
};
function qr(e, n, t) {
  return r;
  function r(i) {
    return O(i) ? v(e, a, "linePrefix")(i) : a(i);
  }
  function a(i) {
    return i === null || A(i) ? n(i) : t(i);
  }
}
const dt = {
  continuation: {
    tokenize: Gr
  },
  exit: Yr,
  name: "blockQuote",
  tokenize: Vr
};
function Vr(e, n, t) {
  const r = this;
  return a;
  function a(u) {
    if (u === 62) {
      const l = r.containerState;
      return l.open || (e.enter("blockQuote", {
        _container: !0
      }), l.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(u), e.exit("blockQuoteMarker"), i;
    }
    return t(u);
  }
  function i(u) {
    return O(u) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(u), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(u));
  }
}
function Gr(e, n, t) {
  const r = this;
  return a;
  function a(u) {
    return O(u) ? v(e, i, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(u) : i(u);
  }
  function i(u) {
    return e.attempt(dt, n, t)(u);
  }
}
function Yr(e) {
  e.exit("blockQuote");
}
const bt = {
  name: "characterEscape",
  tokenize: Wr
};
function Wr(e, n, t) {
  return r;
  function r(i) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(i), e.exit("escapeMarker"), a;
  }
  function a(i) {
    return Nr(i) ? (e.enter("characterEscapeValue"), e.consume(i), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(i);
  }
}
const xt = {
  name: "characterReference",
  tokenize: Zr
};
function Zr(e, n, t) {
  const r = this;
  let a = 0, i, u;
  return l;
  function l(m) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(m), e.exit("characterReferenceMarker"), g;
  }
  function g(m) {
    return m === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(m), e.exit("characterReferenceMarkerNumeric"), h) : (e.enter("characterReferenceValue"), i = 31, u = W, p(m));
  }
  function h(m) {
    return m === 88 || m === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(m), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), i = 6, u = Rr, p) : (e.enter("characterReferenceValue"), i = 7, u = ze, p(m));
  }
  function p(m) {
    if (m === 59 && a) {
      const f = e.exit("characterReferenceValue");
      return u === W && !gt(r.sliceSerialize(f)) ? t(m) : (e.enter("characterReferenceMarker"), e.consume(m), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return u(m) && a++ < i ? (e.consume(m), p) : t(m);
  }
}
const at = {
  partial: !0,
  tokenize: Xr
}, ut = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Qr
};
function Qr(e, n, t) {
  const r = this, a = {
    partial: !0,
    tokenize: R
  };
  let i = 0, u = 0, l;
  return g;
  function g(b) {
    return h(b);
  }
  function h(b) {
    const D = r.events[r.events.length - 1];
    return i = D && D[1].type === "linePrefix" ? D[2].sliceSerialize(D[1], !0).length : 0, l = b, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), p(b);
  }
  function p(b) {
    return b === l ? (u++, e.consume(b), p) : u < 3 ? t(b) : (e.exit("codeFencedFenceSequence"), O(b) ? v(e, m, "whitespace")(b) : m(b));
  }
  function m(b) {
    return b === null || A(b) ? (e.exit("codeFencedFence"), r.interrupt ? n(b) : e.check(at, C, P)(b)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), f(b));
  }
  function f(b) {
    return b === null || A(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), m(b)) : O(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), v(e, c, "whitespace")(b)) : b === 96 && b === l ? t(b) : (e.consume(b), f);
  }
  function c(b) {
    return b === null || A(b) ? m(b) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(b));
  }
  function x(b) {
    return b === null || A(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), m(b)) : b === 96 && b === l ? t(b) : (e.consume(b), x);
  }
  function C(b) {
    return e.attempt(a, P, N)(b);
  }
  function N(b) {
    return e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), y;
  }
  function y(b) {
    return i > 0 && O(b) ? v(e, I, "linePrefix", i + 1)(b) : I(b);
  }
  function I(b) {
    return b === null || A(b) ? e.check(at, C, P)(b) : (e.enter("codeFlowValue"), k(b));
  }
  function k(b) {
    return b === null || A(b) ? (e.exit("codeFlowValue"), I(b)) : (e.consume(b), k);
  }
  function P(b) {
    return e.exit("codeFenced"), n(b);
  }
  function R(b, D, M) {
    let B = 0;
    return d;
    function d(z) {
      return b.enter("lineEnding"), b.consume(z), b.exit("lineEnding"), S;
    }
    function S(z) {
      return b.enter("codeFencedFence"), O(z) ? v(b, w, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(z) : w(z);
    }
    function w(z) {
      return z === l ? (b.enter("codeFencedFenceSequence"), j(z)) : M(z);
    }
    function j(z) {
      return z === l ? (B++, b.consume(z), j) : B >= u ? (b.exit("codeFencedFenceSequence"), O(z) ? v(b, _, "whitespace")(z) : _(z)) : M(z);
    }
    function _(z) {
      return z === null || A(z) ? (b.exit("codeFencedFence"), D(z)) : M(z);
    }
  }
}
function Xr(e, n, t) {
  const r = this;
  return a;
  function a(u) {
    return u === null ? t(u) : (e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), i);
  }
  function i(u) {
    return r.parser.lazy[r.now().line] ? t(u) : n(u);
  }
}
const Ce = {
  name: "codeIndented",
  tokenize: Jr
}, Kr = {
  partial: !0,
  tokenize: ei
};
function Jr(e, n, t) {
  const r = this;
  return a;
  function a(h) {
    return e.enter("codeIndented"), v(e, i, "linePrefix", 5)(h);
  }
  function i(h) {
    const p = r.events[r.events.length - 1];
    return p && p[1].type === "linePrefix" && p[2].sliceSerialize(p[1], !0).length >= 4 ? u(h) : t(h);
  }
  function u(h) {
    return h === null ? g(h) : A(h) ? e.attempt(Kr, u, g)(h) : (e.enter("codeFlowValue"), l(h));
  }
  function l(h) {
    return h === null || A(h) ? (e.exit("codeFlowValue"), u(h)) : (e.consume(h), l);
  }
  function g(h) {
    return e.exit("codeIndented"), n(h);
  }
}
function ei(e, n, t) {
  const r = this;
  return a;
  function a(u) {
    return r.parser.lazy[r.now().line] ? t(u) : A(u) ? (e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), a) : v(e, i, "linePrefix", 5)(u);
  }
  function i(u) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? n(u) : A(u) ? a(u) : t(u);
  }
}
const ti = {
  name: "codeText",
  previous: ri,
  resolve: ni,
  tokenize: ii
};
function ni(e) {
  let n = e.length - 4, t = 3, r, a;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    a === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (a = r) : (r === n || e[r][1].type === "lineEnding") && (e[a][1].type = "codeTextData", r !== a + 2 && (e[a][1].end = e[r - 1][1].end, e.splice(a + 2, r - a - 2), n -= r - a - 2, r = a + 2), a = void 0);
  return e;
}
function ri(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function ii(e, n, t) {
  let r = 0, a, i;
  return u;
  function u(m) {
    return e.enter("codeText"), e.enter("codeTextSequence"), l(m);
  }
  function l(m) {
    return m === 96 ? (e.consume(m), r++, l) : (e.exit("codeTextSequence"), g(m));
  }
  function g(m) {
    return m === null ? t(m) : m === 32 ? (e.enter("space"), e.consume(m), e.exit("space"), g) : m === 96 ? (i = e.enter("codeTextSequence"), a = 0, p(m)) : A(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), g) : (e.enter("codeTextData"), h(m));
  }
  function h(m) {
    return m === null || m === 32 || m === 96 || A(m) ? (e.exit("codeTextData"), g(m)) : (e.consume(m), h);
  }
  function p(m) {
    return m === 96 ? (e.consume(m), a++, p) : a === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(m)) : (i.type = "codeTextData", h(m));
  }
}
class ai {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
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
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
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
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
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
  splice(n, t, r) {
    const a = t || 0;
    this.setCursor(Math.trunc(n));
    const i = this.right.splice(this.right.length - a, Number.POSITIVE_INFINITY);
    return r && be(this.left, r), i.reverse();
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
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
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
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), be(this.left, n);
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
  unshift(n) {
    this.setCursor(0), this.right.push(n);
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
  unshiftMany(n) {
    this.setCursor(0), be(this.right, n.reverse());
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
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        be(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        be(this.left, t.reverse());
      }
  }
}
function be(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function yt(e) {
  const n = {};
  let t = -1, r, a, i, u, l, g, h;
  const p = new ai(e);
  for (; ++t < p.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = p.get(t), t && r[1].type === "chunkFlow" && p.get(t - 1)[1].type === "listItemPrefix" && (g = r[1]._tokenizer.events, i = 0, i < g.length && g[i][1].type === "lineEndingBlank" && (i += 2), i < g.length && g[i][1].type === "content"))
      for (; ++i < g.length && g[i][1].type !== "content"; )
        g[i][1].type === "chunkText" && (g[i][1]._isInFirstContentOfListItem = !0, i++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, ui(p, t)), t = n[t], h = !0);
    else if (r[1]._container) {
      for (i = t, a = void 0; i--; )
        if (u = p.get(i), u[1].type === "lineEnding" || u[1].type === "lineEndingBlank")
          u[0] === "enter" && (a && (p.get(a)[1].type = "lineEndingBlank"), u[1].type = "lineEnding", a = i);
        else if (!(u[1].type === "linePrefix" || u[1].type === "listItemIndent")) break;
      a && (r[1].end = {
        ...p.get(a)[1].start
      }, l = p.slice(a, t), l.unshift(r), p.splice(a, t - a + 1, l));
    }
  }
  return ne(e, 0, Number.POSITIVE_INFINITY, p.slice(0)), !h;
}
function ui(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let a = n - 1;
  const i = [];
  let u = t._tokenizer;
  u || (u = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (u._contentTypeTextTrailing = !0));
  const l = u.events, g = [], h = {};
  let p, m, f = -1, c = t, x = 0, C = 0;
  const N = [C];
  for (; c; ) {
    for (; e.get(++a)[1] !== c; )
      ;
    i.push(a), c._tokenizer || (p = r.sliceStream(c), c.next || p.push(null), m && u.defineSkip(c.start), c._isInFirstContentOfListItem && (u._gfmTasklistFirstContentOfListItem = !0), u.write(p), c._isInFirstContentOfListItem && (u._gfmTasklistFirstContentOfListItem = void 0)), m = c, c = c.next;
  }
  for (c = t; ++f < l.length; )
    // Find a void token that includes a break.
    l[f][0] === "exit" && l[f - 1][0] === "enter" && l[f][1].type === l[f - 1][1].type && l[f][1].start.line !== l[f][1].end.line && (C = f + 1, N.push(C), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (u.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : N.pop(), f = N.length; f--; ) {
    const y = l.slice(N[f], N[f + 1]), I = i.pop();
    g.push([I, I + y.length - 1]), e.splice(I, 2, y);
  }
  for (g.reverse(), f = -1; ++f < g.length; )
    h[x + g[f][0]] = x + g[f][1], x += g[f][1] - g[f][0] - 1;
  return h;
}
const li = {
  resolve: oi,
  tokenize: ci
}, si = {
  partial: !0,
  tokenize: hi
};
function oi(e) {
  return yt(e), e;
}
function ci(e, n) {
  let t;
  return r;
  function r(l) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), a(l);
  }
  function a(l) {
    return l === null ? i(l) : A(l) ? e.check(si, u, i)(l) : (e.consume(l), a);
  }
  function i(l) {
    return e.exit("chunkContent"), e.exit("content"), n(l);
  }
  function u(l) {
    return e.consume(l), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, a;
  }
}
function hi(e, n, t) {
  const r = this;
  return a;
  function a(u) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), v(e, i, "linePrefix");
  }
  function i(u) {
    if (u === null || A(u))
      return t(u);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? n(u) : e.interrupt(r.parser.constructs.flow, t, n)(u);
  }
}
function Et(e, n, t, r, a, i, u, l, g) {
  const h = g || Number.POSITIVE_INFINITY;
  let p = 0;
  return m;
  function m(y) {
    return y === 60 ? (e.enter(r), e.enter(a), e.enter(i), e.consume(y), e.exit(i), f) : y === null || y === 32 || y === 41 || Fe(y) ? t(y) : (e.enter(r), e.enter(u), e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), C(y));
  }
  function f(y) {
    return y === 62 ? (e.enter(i), e.consume(y), e.exit(i), e.exit(a), e.exit(r), n) : (e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), c(y));
  }
  function c(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(l), f(y)) : y === null || y === 60 || A(y) ? t(y) : (e.consume(y), y === 92 ? x : c);
  }
  function x(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), c) : c(y);
  }
  function C(y) {
    return !p && (y === null || y === 41 || G(y)) ? (e.exit("chunkString"), e.exit(l), e.exit(u), e.exit(r), n(y)) : p < h && y === 40 ? (e.consume(y), p++, C) : y === 41 ? (e.consume(y), p--, C) : y === null || y === 32 || y === 40 || Fe(y) ? t(y) : (e.consume(y), y === 92 ? N : C);
  }
  function N(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), C) : C(y);
  }
}
function kt(e, n, t, r, a, i) {
  const u = this;
  let l = 0, g;
  return h;
  function h(c) {
    return e.enter(r), e.enter(a), e.consume(c), e.exit(a), e.enter(i), p;
  }
  function p(c) {
    return l > 999 || c === null || c === 91 || c === 93 && !g || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !l && "_hiddenFootnoteSupport" in u.parser.constructs ? t(c) : c === 93 ? (e.exit(i), e.enter(a), e.consume(c), e.exit(a), e.exit(r), n) : A(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), p) : (e.enter("chunkString", {
      contentType: "string"
    }), m(c));
  }
  function m(c) {
    return c === null || c === 91 || c === 93 || A(c) || l++ > 999 ? (e.exit("chunkString"), p(c)) : (e.consume(c), g || (g = !O(c)), c === 92 ? f : m);
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), l++, m) : m(c);
  }
}
function It(e, n, t, r, a, i) {
  let u;
  return l;
  function l(f) {
    return f === 34 || f === 39 || f === 40 ? (e.enter(r), e.enter(a), e.consume(f), e.exit(a), u = f === 40 ? 41 : f, g) : t(f);
  }
  function g(f) {
    return f === u ? (e.enter(a), e.consume(f), e.exit(a), e.exit(r), n) : (e.enter(i), h(f));
  }
  function h(f) {
    return f === u ? (e.exit(i), g(u)) : f === null ? t(f) : A(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), v(e, h, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), p(f));
  }
  function p(f) {
    return f === u || f === null || A(f) ? (e.exit("chunkString"), h(f)) : (e.consume(f), f === 92 ? m : p);
  }
  function m(f) {
    return f === u || f === 92 ? (e.consume(f), p) : p(f);
  }
}
function xe(e, n) {
  let t;
  return r;
  function r(a) {
    return A(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), t = !0, r) : O(a) ? v(e, r, t ? "linePrefix" : "lineSuffix")(a) : n(a);
  }
}
const mi = {
  name: "definition",
  tokenize: gi
}, pi = {
  partial: !0,
  tokenize: fi
};
function gi(e, n, t) {
  const r = this;
  let a;
  return i;
  function i(c) {
    return e.enter("definition"), u(c);
  }
  function u(c) {
    return kt.call(
      r,
      e,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function l(c) {
    return a = ye(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), c === 58 ? (e.enter("definitionMarker"), e.consume(c), e.exit("definitionMarker"), g) : t(c);
  }
  function g(c) {
    return G(c) ? xe(e, h)(c) : h(c);
  }
  function h(c) {
    return Et(
      e,
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
    return e.attempt(pi, m, m)(c);
  }
  function m(c) {
    return O(c) ? v(e, f, "whitespace")(c) : f(c);
  }
  function f(c) {
    return c === null || A(c) ? (e.exit("definition"), r.parser.defined.push(a), n(c)) : t(c);
  }
}
function fi(e, n, t) {
  return r;
  function r(l) {
    return G(l) ? xe(e, a)(l) : t(l);
  }
  function a(l) {
    return It(e, i, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function i(l) {
    return O(l) ? v(e, u, "whitespace")(l) : u(l);
  }
  function u(l) {
    return l === null || A(l) ? n(l) : t(l);
  }
}
const di = {
  name: "hardBreakEscape",
  tokenize: bi
};
function bi(e, n, t) {
  return r;
  function r(i) {
    return e.enter("hardBreakEscape"), e.consume(i), a;
  }
  function a(i) {
    return A(i) ? (e.exit("hardBreakEscape"), n(i)) : t(i);
  }
}
const xi = {
  name: "headingAtx",
  resolve: yi,
  tokenize: Ei
};
function yi(e, n) {
  let t = e.length - 2, r = 3, a, i;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (a = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, i = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, ne(e, r, t - r + 1, [["enter", a, n], ["enter", i, n], ["exit", i, n], ["exit", a, n]])), e;
}
function Ei(e, n, t) {
  let r = 0;
  return a;
  function a(p) {
    return e.enter("atxHeading"), i(p);
  }
  function i(p) {
    return e.enter("atxHeadingSequence"), u(p);
  }
  function u(p) {
    return p === 35 && r++ < 6 ? (e.consume(p), u) : p === null || G(p) ? (e.exit("atxHeadingSequence"), l(p)) : t(p);
  }
  function l(p) {
    return p === 35 ? (e.enter("atxHeadingSequence"), g(p)) : p === null || A(p) ? (e.exit("atxHeading"), n(p)) : O(p) ? v(e, l, "whitespace")(p) : (e.enter("atxHeadingText"), h(p));
  }
  function g(p) {
    return p === 35 ? (e.consume(p), g) : (e.exit("atxHeadingSequence"), l(p));
  }
  function h(p) {
    return p === null || p === 35 || G(p) ? (e.exit("atxHeadingText"), l(p)) : (e.consume(p), h);
  }
}
const ki = [
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
], lt = ["pre", "script", "style", "textarea"], Ii = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: wi,
  tokenize: Ci
}, Si = {
  partial: !0,
  tokenize: Ri
}, Ti = {
  partial: !0,
  tokenize: Ai
};
function wi(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function Ci(e, n, t) {
  const r = this;
  let a, i, u, l, g;
  return h;
  function h(o) {
    return p(o);
  }
  function p(o) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(o), m;
  }
  function m(o) {
    return o === 33 ? (e.consume(o), f) : o === 47 ? (e.consume(o), i = !0, C) : o === 63 ? (e.consume(o), a = 3, r.interrupt ? n : s) : te(o) ? (e.consume(o), u = String.fromCharCode(o), N) : t(o);
  }
  function f(o) {
    return o === 45 ? (e.consume(o), a = 2, c) : o === 91 ? (e.consume(o), a = 5, l = 0, x) : te(o) ? (e.consume(o), a = 4, r.interrupt ? n : s) : t(o);
  }
  function c(o) {
    return o === 45 ? (e.consume(o), r.interrupt ? n : s) : t(o);
  }
  function x(o) {
    const X = "CDATA[";
    return o === X.charCodeAt(l++) ? (e.consume(o), l === X.length ? r.interrupt ? n : w : x) : t(o);
  }
  function C(o) {
    return te(o) ? (e.consume(o), u = String.fromCharCode(o), N) : t(o);
  }
  function N(o) {
    if (o === null || o === 47 || o === 62 || G(o)) {
      const X = o === 47, he = u.toLowerCase();
      return !X && !i && lt.includes(he) ? (a = 1, r.interrupt ? n(o) : w(o)) : ki.includes(u.toLowerCase()) ? (a = 6, X ? (e.consume(o), y) : r.interrupt ? n(o) : w(o)) : (a = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(o) : i ? I(o) : k(o));
    }
    return o === 45 || W(o) ? (e.consume(o), u += String.fromCharCode(o), N) : t(o);
  }
  function y(o) {
    return o === 62 ? (e.consume(o), r.interrupt ? n : w) : t(o);
  }
  function I(o) {
    return O(o) ? (e.consume(o), I) : d(o);
  }
  function k(o) {
    return o === 47 ? (e.consume(o), d) : o === 58 || o === 95 || te(o) ? (e.consume(o), P) : O(o) ? (e.consume(o), k) : d(o);
  }
  function P(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || W(o) ? (e.consume(o), P) : R(o);
  }
  function R(o) {
    return o === 61 ? (e.consume(o), b) : O(o) ? (e.consume(o), R) : k(o);
  }
  function b(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96 ? t(o) : o === 34 || o === 39 ? (e.consume(o), g = o, D) : O(o) ? (e.consume(o), b) : M(o);
  }
  function D(o) {
    return o === g ? (e.consume(o), g = null, B) : o === null || A(o) ? t(o) : (e.consume(o), D);
  }
  function M(o) {
    return o === null || o === 34 || o === 39 || o === 47 || o === 60 || o === 61 || o === 62 || o === 96 || G(o) ? R(o) : (e.consume(o), M);
  }
  function B(o) {
    return o === 47 || o === 62 || O(o) ? k(o) : t(o);
  }
  function d(o) {
    return o === 62 ? (e.consume(o), S) : t(o);
  }
  function S(o) {
    return o === null || A(o) ? w(o) : O(o) ? (e.consume(o), S) : t(o);
  }
  function w(o) {
    return o === 45 && a === 2 ? (e.consume(o), $) : o === 60 && a === 1 ? (e.consume(o), U) : o === 62 && a === 4 ? (e.consume(o), Q) : o === 63 && a === 3 ? (e.consume(o), s) : o === 93 && a === 5 ? (e.consume(o), re) : A(o) && (a === 6 || a === 7) ? (e.exit("htmlFlowData"), e.check(Si, ie, j)(o)) : o === null || A(o) ? (e.exit("htmlFlowData"), j(o)) : (e.consume(o), w);
  }
  function j(o) {
    return e.check(Ti, _, ie)(o);
  }
  function _(o) {
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), z;
  }
  function z(o) {
    return o === null || A(o) ? j(o) : (e.enter("htmlFlowData"), w(o));
  }
  function $(o) {
    return o === 45 ? (e.consume(o), s) : w(o);
  }
  function U(o) {
    return o === 47 ? (e.consume(o), u = "", Z) : w(o);
  }
  function Z(o) {
    if (o === 62) {
      const X = u.toLowerCase();
      return lt.includes(X) ? (e.consume(o), Q) : w(o);
    }
    return te(o) && u.length < 8 ? (e.consume(o), u += String.fromCharCode(o), Z) : w(o);
  }
  function re(o) {
    return o === 93 ? (e.consume(o), s) : w(o);
  }
  function s(o) {
    return o === 62 ? (e.consume(o), Q) : o === 45 && a === 2 ? (e.consume(o), s) : w(o);
  }
  function Q(o) {
    return o === null || A(o) ? (e.exit("htmlFlowData"), ie(o)) : (e.consume(o), Q);
  }
  function ie(o) {
    return e.exit("htmlFlow"), n(o);
  }
}
function Ai(e, n, t) {
  const r = this;
  return a;
  function a(u) {
    return A(u) ? (e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), i) : t(u);
  }
  function i(u) {
    return r.parser.lazy[r.now().line] ? t(u) : n(u);
  }
}
function Ri(e, n, t) {
  return r;
  function r(a) {
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), e.attempt(Te, n, t);
  }
}
const Ni = {
  name: "htmlText",
  tokenize: Oi
};
function Oi(e, n, t) {
  const r = this;
  let a, i, u;
  return l;
  function l(s) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(s), g;
  }
  function g(s) {
    return s === 33 ? (e.consume(s), h) : s === 47 ? (e.consume(s), R) : s === 63 ? (e.consume(s), k) : te(s) ? (e.consume(s), M) : t(s);
  }
  function h(s) {
    return s === 45 ? (e.consume(s), p) : s === 91 ? (e.consume(s), i = 0, x) : te(s) ? (e.consume(s), I) : t(s);
  }
  function p(s) {
    return s === 45 ? (e.consume(s), c) : t(s);
  }
  function m(s) {
    return s === null ? t(s) : s === 45 ? (e.consume(s), f) : A(s) ? (u = m, U(s)) : (e.consume(s), m);
  }
  function f(s) {
    return s === 45 ? (e.consume(s), c) : m(s);
  }
  function c(s) {
    return s === 62 ? $(s) : s === 45 ? f(s) : m(s);
  }
  function x(s) {
    const Q = "CDATA[";
    return s === Q.charCodeAt(i++) ? (e.consume(s), i === Q.length ? C : x) : t(s);
  }
  function C(s) {
    return s === null ? t(s) : s === 93 ? (e.consume(s), N) : A(s) ? (u = C, U(s)) : (e.consume(s), C);
  }
  function N(s) {
    return s === 93 ? (e.consume(s), y) : C(s);
  }
  function y(s) {
    return s === 62 ? $(s) : s === 93 ? (e.consume(s), y) : C(s);
  }
  function I(s) {
    return s === null || s === 62 ? $(s) : A(s) ? (u = I, U(s)) : (e.consume(s), I);
  }
  function k(s) {
    return s === null ? t(s) : s === 63 ? (e.consume(s), P) : A(s) ? (u = k, U(s)) : (e.consume(s), k);
  }
  function P(s) {
    return s === 62 ? $(s) : k(s);
  }
  function R(s) {
    return te(s) ? (e.consume(s), b) : t(s);
  }
  function b(s) {
    return s === 45 || W(s) ? (e.consume(s), b) : D(s);
  }
  function D(s) {
    return A(s) ? (u = D, U(s)) : O(s) ? (e.consume(s), D) : $(s);
  }
  function M(s) {
    return s === 45 || W(s) ? (e.consume(s), M) : s === 47 || s === 62 || G(s) ? B(s) : t(s);
  }
  function B(s) {
    return s === 47 ? (e.consume(s), $) : s === 58 || s === 95 || te(s) ? (e.consume(s), d) : A(s) ? (u = B, U(s)) : O(s) ? (e.consume(s), B) : $(s);
  }
  function d(s) {
    return s === 45 || s === 46 || s === 58 || s === 95 || W(s) ? (e.consume(s), d) : S(s);
  }
  function S(s) {
    return s === 61 ? (e.consume(s), w) : A(s) ? (u = S, U(s)) : O(s) ? (e.consume(s), S) : B(s);
  }
  function w(s) {
    return s === null || s === 60 || s === 61 || s === 62 || s === 96 ? t(s) : s === 34 || s === 39 ? (e.consume(s), a = s, j) : A(s) ? (u = w, U(s)) : O(s) ? (e.consume(s), w) : (e.consume(s), _);
  }
  function j(s) {
    return s === a ? (e.consume(s), a = void 0, z) : s === null ? t(s) : A(s) ? (u = j, U(s)) : (e.consume(s), j);
  }
  function _(s) {
    return s === null || s === 34 || s === 39 || s === 60 || s === 61 || s === 96 ? t(s) : s === 47 || s === 62 || G(s) ? B(s) : (e.consume(s), _);
  }
  function z(s) {
    return s === 47 || s === 62 || G(s) ? B(s) : t(s);
  }
  function $(s) {
    return s === 62 ? (e.consume(s), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(s);
  }
  function U(s) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), Z;
  }
  function Z(s) {
    return O(s) ? v(e, re, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : re(s);
  }
  function re(s) {
    return e.enter("htmlTextData"), u(s);
  }
}
const je = {
  name: "labelEnd",
  resolveAll: zi,
  resolveTo: Pi,
  tokenize: vi
}, Li = {
  tokenize: ji
}, Di = {
  tokenize: Mi
}, Fi = {
  tokenize: _i
};
function zi(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const a = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += a;
    }
  }
  return e.length !== t.length && ne(e, 0, e.length, t), e;
}
function Pi(e, n) {
  let t = e.length, r = 0, a, i, u, l;
  for (; t--; )
    if (a = e[t][1], i) {
      if (a.type === "link" || a.type === "labelLink" && a._inactive)
        break;
      e[t][0] === "enter" && a.type === "labelLink" && (a._inactive = !0);
    } else if (u) {
      if (e[t][0] === "enter" && (a.type === "labelImage" || a.type === "labelLink") && !a._balanced && (i = t, a.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else a.type === "labelEnd" && (u = t);
  const g = {
    type: e[i][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, h = {
    type: "label",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[u][1].end
    }
  }, p = {
    type: "labelText",
    start: {
      ...e[i + r + 2][1].end
    },
    end: {
      ...e[u - 2][1].start
    }
  };
  return l = [["enter", g, n], ["enter", h, n]], l = V(l, e.slice(i + 1, i + r + 3)), l = V(l, [["enter", p, n]]), l = V(l, ve(n.parser.constructs.insideSpan.null, e.slice(i + r + 4, u - 3), n)), l = V(l, [["exit", p, n], e[u - 2], e[u - 1], ["exit", h, n]]), l = V(l, e.slice(u + 1)), l = V(l, [["exit", g, n]]), ne(e, i, e.length, l), e;
}
function vi(e, n, t) {
  const r = this;
  let a = r.events.length, i, u;
  for (; a--; )
    if ((r.events[a][1].type === "labelImage" || r.events[a][1].type === "labelLink") && !r.events[a][1]._balanced) {
      i = r.events[a][1];
      break;
    }
  return l;
  function l(f) {
    return i ? i._inactive ? m(f) : (u = r.parser.defined.includes(ye(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(f), e.exit("labelMarker"), e.exit("labelEnd"), g) : t(f);
  }
  function g(f) {
    return f === 40 ? e.attempt(Li, p, u ? p : m)(f) : f === 91 ? e.attempt(Di, p, u ? h : m)(f) : u ? p(f) : m(f);
  }
  function h(f) {
    return e.attempt(Fi, p, m)(f);
  }
  function p(f) {
    return n(f);
  }
  function m(f) {
    return i._balanced = !0, t(f);
  }
}
function ji(e, n, t) {
  return r;
  function r(m) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(m), e.exit("resourceMarker"), a;
  }
  function a(m) {
    return G(m) ? xe(e, i)(m) : i(m);
  }
  function i(m) {
    return m === 41 ? p(m) : Et(e, u, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(m);
  }
  function u(m) {
    return G(m) ? xe(e, g)(m) : p(m);
  }
  function l(m) {
    return t(m);
  }
  function g(m) {
    return m === 34 || m === 39 || m === 40 ? It(e, h, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(m) : p(m);
  }
  function h(m) {
    return G(m) ? xe(e, p)(m) : p(m);
  }
  function p(m) {
    return m === 41 ? (e.enter("resourceMarker"), e.consume(m), e.exit("resourceMarker"), e.exit("resource"), n) : t(m);
  }
}
function Mi(e, n, t) {
  const r = this;
  return a;
  function a(l) {
    return kt.call(r, e, i, u, "reference", "referenceMarker", "referenceString")(l);
  }
  function i(l) {
    return r.parser.defined.includes(ye(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(l) : t(l);
  }
  function u(l) {
    return t(l);
  }
}
function _i(e, n, t) {
  return r;
  function r(i) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(i), e.exit("referenceMarker"), a;
  }
  function a(i) {
    return i === 93 ? (e.enter("referenceMarker"), e.consume(i), e.exit("referenceMarker"), e.exit("reference"), n) : t(i);
  }
}
const Bi = {
  name: "labelStartImage",
  resolveAll: je.resolveAll,
  tokenize: Ui
};
function Ui(e, n, t) {
  const r = this;
  return a;
  function a(l) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(l), e.exit("labelImageMarker"), i;
  }
  function i(l) {
    return l === 91 ? (e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelImage"), u) : t(l);
  }
  function u(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(l) : n(l);
  }
}
const Hi = {
  name: "labelStartLink",
  resolveAll: je.resolveAll,
  tokenize: $i
};
function $i(e, n, t) {
  const r = this;
  return a;
  function a(u) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(u), e.exit("labelMarker"), e.exit("labelLink"), i;
  }
  function i(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(u) : n(u);
  }
}
const Ae = {
  name: "lineEnding",
  tokenize: qi
};
function qi(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), v(e, n, "linePrefix");
  }
}
const Se = {
  name: "thematicBreak",
  tokenize: Vi
};
function Vi(e, n, t) {
  let r = 0, a;
  return i;
  function i(h) {
    return e.enter("thematicBreak"), u(h);
  }
  function u(h) {
    return a = h, l(h);
  }
  function l(h) {
    return h === a ? (e.enter("thematicBreakSequence"), g(h)) : r >= 3 && (h === null || A(h)) ? (e.exit("thematicBreak"), n(h)) : t(h);
  }
  function g(h) {
    return h === a ? (e.consume(h), r++, g) : (e.exit("thematicBreakSequence"), O(h) ? v(e, l, "whitespace")(h) : l(h));
  }
}
const Y = {
  continuation: {
    tokenize: Zi
  },
  exit: Xi,
  name: "list",
  tokenize: Wi
}, Gi = {
  partial: !0,
  tokenize: Ki
}, Yi = {
  partial: !0,
  tokenize: Qi
};
function Wi(e, n, t) {
  const r = this, a = r.events[r.events.length - 1];
  let i = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, u = 0;
  return l;
  function l(c) {
    const x = r.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !r.containerState.marker || c === r.containerState.marker : ze(c)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), c === 42 || c === 45 ? e.check(Se, t, h)(c) : h(c);
      if (!r.interrupt || c === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), g(c);
    }
    return t(c);
  }
  function g(c) {
    return ze(c) && ++u < 10 ? (e.consume(c), g) : (!r.interrupt || u < 2) && (r.containerState.marker ? c === r.containerState.marker : c === 41 || c === 46) ? (e.exit("listItemValue"), h(c)) : t(c);
  }
  function h(c) {
    return e.enter("listItemMarker"), e.consume(c), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || c, e.check(
      Te,
      // Can’t be empty when interrupting.
      r.interrupt ? t : p,
      e.attempt(Gi, f, m)
    );
  }
  function p(c) {
    return r.containerState.initialBlankLine = !0, i++, f(c);
  }
  function m(c) {
    return O(c) ? (e.enter("listItemPrefixWhitespace"), e.consume(c), e.exit("listItemPrefixWhitespace"), f) : t(c);
  }
  function f(c) {
    return r.containerState.size = i + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(c);
  }
}
function Zi(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Te, a, i);
  function a(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, v(e, n, "listItemIndent", r.containerState.size + 1)(l);
  }
  function i(l) {
    return r.containerState.furtherBlankLines || !O(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, u(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Yi, n, u)(l));
  }
  function u(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, v(e, e.attempt(Y, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function Qi(e, n, t) {
  const r = this;
  return v(e, a, "listItemIndent", r.containerState.size + 1);
  function a(i) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "listItemIndent" && u[2].sliceSerialize(u[1], !0).length === r.containerState.size ? n(i) : t(i);
  }
}
function Xi(e) {
  e.exit(this.containerState.type);
}
function Ki(e, n, t) {
  const r = this;
  return v(e, a, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function a(i) {
    const u = r.events[r.events.length - 1];
    return !O(i) && u && u[1].type === "listItemPrefixWhitespace" ? n(i) : t(i);
  }
}
const st = {
  name: "setextUnderline",
  resolveTo: Ji,
  tokenize: ea
};
function Ji(e, n) {
  let t = e.length, r, a, i;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (a = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !i && e[t][1].type === "definition" && (i = t);
  const u = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[a][1].type = "setextHeadingText", i ? (e.splice(a, 0, ["enter", u, n]), e.splice(i + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[i][1].end
  }) : e[r][1] = u, e.push(["exit", u, n]), e;
}
function ea(e, n, t) {
  const r = this;
  let a;
  return i;
  function i(h) {
    let p = r.events.length, m;
    for (; p--; )
      if (r.events[p][1].type !== "lineEnding" && r.events[p][1].type !== "linePrefix" && r.events[p][1].type !== "content") {
        m = r.events[p][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || m) ? (e.enter("setextHeadingLine"), a = h, u(h)) : t(h);
  }
  function u(h) {
    return e.enter("setextHeadingLineSequence"), l(h);
  }
  function l(h) {
    return h === a ? (e.consume(h), l) : (e.exit("setextHeadingLineSequence"), O(h) ? v(e, g, "lineSuffix")(h) : g(h));
  }
  function g(h) {
    return h === null || A(h) ? (e.exit("setextHeadingLine"), n(h)) : t(h);
  }
}
const ta = {
  tokenize: na
};
function na(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Te,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, a, v(e, e.attempt(this.parser.constructs.flow, a, e.attempt(li, a)), "linePrefix"))
  );
  return t;
  function r(i) {
    if (i === null) {
      e.consume(i);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(i), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function a(i) {
    if (i === null) {
      e.consume(i);
      return;
    }
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const ra = {
  resolveAll: Tt()
}, ia = St("string"), aa = St("text");
function St(e) {
  return {
    resolveAll: Tt(e === "text" ? ua : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, a = this.parser.constructs[e], i = t.attempt(a, u, l);
    return u;
    function u(p) {
      return h(p) ? i(p) : l(p);
    }
    function l(p) {
      if (p === null) {
        t.consume(p);
        return;
      }
      return t.enter("data"), t.consume(p), g;
    }
    function g(p) {
      return h(p) ? (t.exit("data"), i(p)) : (t.consume(p), g);
    }
    function h(p) {
      if (p === null)
        return !0;
      const m = a[p];
      let f = -1;
      if (m)
        for (; ++f < m.length; ) {
          const c = m[f];
          if (!c.previous || c.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Tt(e) {
  return n;
  function n(t, r) {
    let a = -1, i;
    for (; ++a <= t.length; )
      i === void 0 ? t[a] && t[a][1].type === "data" && (i = a, a++) : (!t[a] || t[a][1].type !== "data") && (a !== i + 2 && (t[i][1].end = t[a - 1][1].end, t.splice(i + 2, a - i - 2), a = i + 2), i = void 0);
    return e ? e(t, r) : t;
  }
}
function ua(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], a = n.sliceStream(r);
      let i = a.length, u = -1, l = 0, g;
      for (; i--; ) {
        const h = a[i];
        if (typeof h == "string") {
          for (u = h.length; h.charCodeAt(u - 1) === 32; )
            l++, u--;
          if (u) break;
          u = -1;
        } else if (h === -2)
          g = !0, l++;
        else if (h !== -1) {
          i++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (l = 0), l) {
        const h = {
          type: t === e.length || g || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: i ? u : r.start._bufferIndex + u,
            _index: r.start._index + i,
            line: r.end.line,
            column: r.end.column - l,
            offset: r.end.offset - l
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...h.start
        }, r.start.offset === r.end.offset ? Object.assign(r, h) : (e.splice(t, 0, ["enter", h, n], ["exit", h, n]), t += 2);
      }
      t++;
    }
  return e;
}
const la = {
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
  62: dt
}, sa = {
  91: mi
}, oa = {
  [-2]: Ce,
  [-1]: Ce,
  32: Ce
}, ca = {
  35: xi,
  42: Se,
  45: [st, Se],
  60: Ii,
  61: st,
  95: Se,
  96: ut,
  126: ut
}, ha = {
  38: xt,
  92: bt
}, ma = {
  [-5]: Ae,
  [-4]: Ae,
  [-3]: Ae,
  33: Bi,
  38: xt,
  42: Pe,
  60: [Hr, Ni],
  91: Hi,
  92: [di, bt],
  93: je,
  95: Pe,
  96: ti
}, pa = {
  null: [Pe, ra]
}, ga = {
  null: [42, 95]
}, fa = {
  null: []
}, da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: ga,
  contentInitial: sa,
  disable: fa,
  document: la,
  flow: ca,
  flowInitial: oa,
  insideSpan: pa,
  string: ha,
  text: ma
}, Symbol.toStringTag, { value: "Module" }));
function ba(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const a = {}, i = [];
  let u = [], l = [];
  const g = {
    attempt: D(R),
    check: D(b),
    consume: I,
    enter: k,
    exit: P,
    interrupt: D(b, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: C,
    events: [],
    now: x,
    parser: e,
    previous: null,
    sliceSerialize: f,
    sliceStream: c,
    write: m
  };
  let p = n.tokenize.call(h, g);
  return n.resolveAll && i.push(n), h;
  function m(S) {
    return u = V(u, S), N(), u[u.length - 1] !== null ? [] : (M(n, 0), h.events = ve(i, h.events, h), h.events);
  }
  function f(S, w) {
    return ya(c(S), w);
  }
  function c(S) {
    return xa(u, S);
  }
  function x() {
    const {
      _bufferIndex: S,
      _index: w,
      line: j,
      column: _,
      offset: z
    } = r;
    return {
      _bufferIndex: S,
      _index: w,
      line: j,
      column: _,
      offset: z
    };
  }
  function C(S) {
    a[S.line] = S.column, d();
  }
  function N() {
    let S;
    for (; r._index < u.length; ) {
      const w = u[r._index];
      if (typeof w == "string")
        for (S = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === S && r._bufferIndex < w.length; )
          y(w.charCodeAt(r._bufferIndex));
      else
        y(w);
    }
  }
  function y(S) {
    p = p(S);
  }
  function I(S) {
    A(S) ? (r.line++, r.column = 1, r.offset += S === -3 ? 2 : 1, d()) : S !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    u[r._index].length && (r._bufferIndex = -1, r._index++)), h.previous = S;
  }
  function k(S, w) {
    const j = w || {};
    return j.type = S, j.start = x(), h.events.push(["enter", j, h]), l.push(j), j;
  }
  function P(S) {
    const w = l.pop();
    return w.end = x(), h.events.push(["exit", w, h]), w;
  }
  function R(S, w) {
    M(S, w.from);
  }
  function b(S, w) {
    w.restore();
  }
  function D(S, w) {
    return j;
    function j(_, z, $) {
      let U, Z, re, s;
      return Array.isArray(_) ? (
        /* c8 ignore next 1 */
        ie(_)
      ) : "tokenize" in _ ? (
        // Looks like a construct.
        ie([
          /** @type {Construct} */
          _
        ])
      ) : Q(_);
      function Q(H) {
        return fe;
        function fe(le) {
          const me = le !== null && H[le], pe = le !== null && H.null, we = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(me) ? me : me ? [me] : [],
            ...Array.isArray(pe) ? pe : pe ? [pe] : []
          ];
          return ie(we)(le);
        }
      }
      function ie(H) {
        return U = H, Z = 0, H.length === 0 ? $ : o(H[Z]);
      }
      function o(H) {
        return fe;
        function fe(le) {
          return s = B(), re = H, H.partial || (h.currentConstruct = H), H.name && h.parser.constructs.disable.null.includes(H.name) ? he() : H.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            w ? Object.assign(Object.create(h), w) : h,
            g,
            X,
            he
          )(le);
        }
      }
      function X(H) {
        return S(re, s), z;
      }
      function he(H) {
        return s.restore(), ++Z < U.length ? o(U[Z]) : $;
      }
    }
  }
  function M(S, w) {
    S.resolveAll && !i.includes(S) && i.push(S), S.resolve && ne(h.events, w, h.events.length - w, S.resolve(h.events.slice(w), h)), S.resolveTo && (h.events = S.resolveTo(h.events, h));
  }
  function B() {
    const S = x(), w = h.previous, j = h.currentConstruct, _ = h.events.length, z = Array.from(l);
    return {
      from: _,
      restore: $
    };
    function $() {
      r = S, h.previous = w, h.currentConstruct = j, h.events.length = _, l = z, d();
    }
  }
  function d() {
    r.line in a && r.column < 2 && (r.column = a[r.line], r.offset += a[r.line] - 1);
  }
}
function xa(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, a = n.end._index, i = n.end._bufferIndex;
  let u;
  if (t === a)
    u = [e[t].slice(r, i)];
  else {
    if (u = e.slice(t, a), r > -1) {
      const l = u[0];
      typeof l == "string" ? u[0] = l.slice(r) : u.shift();
    }
    i > 0 && u.push(e[a].slice(0, i));
  }
  return u;
}
function ya(e, n) {
  let t = -1;
  const r = [];
  let a;
  for (; ++t < e.length; ) {
    const i = e[t];
    let u;
    if (typeof i == "string")
      u = i;
    else switch (i) {
      case -5: {
        u = "\r";
        break;
      }
      case -4: {
        u = `
`;
        break;
      }
      case -3: {
        u = `\r
`;
        break;
      }
      case -2: {
        u = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && a) continue;
        u = " ";
        break;
      }
      default:
        u = String.fromCharCode(i);
    }
    a = i === -2, r.push(u);
  }
  return r.join("");
}
function Ea(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Er([da, ...(e || {}).extensions || []])
    ),
    content: a(Pr),
    defined: [],
    document: a(jr),
    flow: a(ta),
    lazy: {},
    string: a(ia),
    text: a(aa)
  };
  return r;
  function a(i) {
    return u;
    function u(l) {
      return ba(r, i, l);
    }
  }
}
function ka(e) {
  for (; !yt(e); )
    ;
  return e;
}
const ot = /[\0\t\n\r]/g;
function Ia() {
  let e = 1, n = "", t = !0, r;
  return a;
  function a(i, u, l) {
    const g = [];
    let h, p, m, f, c;
    for (i = n + (typeof i == "string" ? i.toString() : new TextDecoder(u || void 0).decode(i)), m = 0, n = "", t && (i.charCodeAt(0) === 65279 && m++, t = void 0); m < i.length; ) {
      if (ot.lastIndex = m, h = ot.exec(i), f = h && h.index !== void 0 ? h.index : i.length, c = i.charCodeAt(f), !h) {
        n = i.slice(m);
        break;
      }
      if (c === 10 && m === f && r)
        g.push(-3), r = void 0;
      else
        switch (r && (g.push(-5), r = void 0), m < f && (g.push(i.slice(m, f)), e += f - m), c) {
          case 0: {
            g.push(65533), e++;
            break;
          }
          case 9: {
            for (p = Math.ceil(e / 4) * 4, g.push(-2); e++ < p; ) g.push(-1);
            break;
          }
          case 10: {
            g.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      m = f + 1;
    }
    return l && (r && g.push(-5), n && g.push(n), g.push(null)), g;
  }
}
function Sa(e, n, t) {
  return typeof n != "string" && (t = n, n = void 0), zr(t)(ka(Ea(t).document().write(Ia()(e, n, !0))));
}
const Re = {
  none: "",
  left: ' align="left"',
  right: ' align="right"',
  center: ' align="center"'
};
function Ta() {
  return {
    enter: {
      table(e) {
        const n = e._align;
        this.lineEndingIfNeeded(), this.tag("<table>"), this.setData("tableAlign", n);
      },
      tableBody() {
        this.tag("<tbody>");
      },
      tableData() {
        const e = this.getData("tableAlign"), n = this.getData("tableColumn"), t = Re[e[n]];
        t === void 0 ? this.buffer() : (this.lineEndingIfNeeded(), this.tag("<td" + t + ">"));
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("<thead>");
      },
      tableHeader() {
        const e = this.getData("tableAlign"), n = this.getData("tableColumn"), t = Re[e[n]];
        this.lineEndingIfNeeded(), this.tag("<th" + t + ">");
      },
      tableRow() {
        this.setData("tableColumn", 0), this.lineEndingIfNeeded(), this.tag("<tr>");
      }
    },
    exit: {
      // Overwrite the default code text data handler to unescape escaped pipes when
      // they are in tables.
      codeTextData(e) {
        let n = this.sliceSerialize(e);
        this.getData("tableAlign") && (n = n.replace(/\\([\\|])/g, wa)), this.raw(this.encode(n));
      },
      table() {
        this.setData("tableAlign"), this.setData("slurpAllLineEndings"), this.lineEndingIfNeeded(), this.tag("</table>");
      },
      tableBody() {
        this.lineEndingIfNeeded(), this.tag("</tbody>");
      },
      tableData() {
        const e = this.getData("tableAlign"), n = this.getData("tableColumn");
        n in e ? (this.tag("</td>"), this.setData("tableColumn", n + 1)) : this.resume();
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("</thead>");
      },
      tableHeader() {
        const e = this.getData("tableColumn");
        this.tag("</th>"), this.setData("tableColumn", e + 1);
      },
      tableRow() {
        const e = this.getData("tableAlign");
        let n = this.getData("tableColumn");
        for (; n < e.length; )
          this.lineEndingIfNeeded(), this.tag("<td" + Re[e[n]] + "></td>"), n++;
        this.setData("tableColumn", n), this.lineEndingIfNeeded(), this.tag("</tr>");
      }
    }
  };
}
function wa(e, n) {
  return n === "|" ? n : e;
}
class Ca {
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
  add(n, t, r) {
    Aa(this, n, t, r);
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
  consume(n) {
    if (this.map.sort(function(i, u) {
      return i[0] - u[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let a = r.pop();
    for (; a; ) {
      for (const i of a)
        n.push(i);
      a = r.pop();
    }
    this.map.length = 0;
  }
}
function Aa(e, n, t, r) {
  let a = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; a < e.map.length; ) {
      if (e.map[a][0] === n) {
        e.map[a][1] += t, e.map[a][2].push(...r);
        return;
      }
      a += 1;
    }
    e.map.push([n, t, r]);
  }
}
function Ra(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const a = e[n];
    if (t) {
      if (a[0] === "enter")
        a[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (a[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const i = r.length - 1;
          r[i] = r[i] === "left" ? "center" : "right";
        }
      } else if (a[1].type === "tableDelimiterRow")
        break;
    } else a[0] === "enter" && a[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function Na() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Oa,
        resolveAll: La
      }
    }
  };
}
function Oa(e, n, t) {
  const r = this;
  let a = 0, i = 0, u;
  return l;
  function l(d) {
    let S = r.events.length - 1;
    for (; S > -1; ) {
      const _ = r.events[S][1].type;
      if (_ === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      _ === "linePrefix") S--;
      else break;
    }
    const w = S > -1 ? r.events[S][1].type : null, j = w === "tableHead" || w === "tableRow" ? b : g;
    return j === b && r.parser.lazy[r.now().line] ? t(d) : j(d);
  }
  function g(d) {
    return e.enter("tableHead"), e.enter("tableRow"), h(d);
  }
  function h(d) {
    return d === 124 || (u = !0, i += 1), p(d);
  }
  function p(d) {
    return d === null ? t(d) : A(d) ? i > 1 ? (i = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : t(d) : O(d) ? v(e, p, "whitespace")(d) : (i += 1, u && (u = !1, a += 1), d === 124 ? (e.enter("tableCellDivider"), e.consume(d), e.exit("tableCellDivider"), u = !0, p) : (e.enter("data"), m(d)));
  }
  function m(d) {
    return d === null || d === 124 || G(d) ? (e.exit("data"), p(d)) : (e.consume(d), d === 92 ? f : m);
  }
  function f(d) {
    return d === 92 || d === 124 ? (e.consume(d), m) : m(d);
  }
  function c(d) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(d) : (e.enter("tableDelimiterRow"), u = !1, O(d) ? v(e, x, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d) : x(d));
  }
  function x(d) {
    return d === 45 || d === 58 ? N(d) : d === 124 ? (u = !0, e.enter("tableCellDivider"), e.consume(d), e.exit("tableCellDivider"), C) : R(d);
  }
  function C(d) {
    return O(d) ? v(e, N, "whitespace")(d) : N(d);
  }
  function N(d) {
    return d === 58 ? (i += 1, u = !0, e.enter("tableDelimiterMarker"), e.consume(d), e.exit("tableDelimiterMarker"), y) : d === 45 ? (i += 1, y(d)) : d === null || A(d) ? P(d) : R(d);
  }
  function y(d) {
    return d === 45 ? (e.enter("tableDelimiterFiller"), I(d)) : R(d);
  }
  function I(d) {
    return d === 45 ? (e.consume(d), I) : d === 58 ? (u = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(d), e.exit("tableDelimiterMarker"), k) : (e.exit("tableDelimiterFiller"), k(d));
  }
  function k(d) {
    return O(d) ? v(e, P, "whitespace")(d) : P(d);
  }
  function P(d) {
    return d === 124 ? x(d) : d === null || A(d) ? !u || a !== i ? R(d) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(d)) : R(d);
  }
  function R(d) {
    return t(d);
  }
  function b(d) {
    return e.enter("tableRow"), D(d);
  }
  function D(d) {
    return d === 124 ? (e.enter("tableCellDivider"), e.consume(d), e.exit("tableCellDivider"), D) : d === null || A(d) ? (e.exit("tableRow"), n(d)) : O(d) ? v(e, D, "whitespace")(d) : (e.enter("data"), M(d));
  }
  function M(d) {
    return d === null || d === 124 || G(d) ? (e.exit("data"), D(d)) : (e.consume(d), d === 92 ? B : M);
  }
  function B(d) {
    return d === 92 || d === 124 ? (e.consume(d), M) : M(d);
  }
}
function La(e, n) {
  let t = -1, r = !0, a = 0, i = [0, 0, 0, 0], u = [0, 0, 0, 0], l = !1, g = 0, h, p, m;
  const f = new Ca();
  for (; ++t < e.length; ) {
    const c = e[t], x = c[1];
    c[0] === "enter" ? x.type === "tableHead" ? (l = !1, g !== 0 && (ct(f, n, g, h, p), p = void 0, g = 0), h = {
      type: "table",
      start: Object.assign({}, x.start),
      // Note: correct end is set later.
      end: Object.assign({}, x.end)
    }, f.add(t, 0, [["enter", h, n]])) : x.type === "tableRow" || x.type === "tableDelimiterRow" ? (r = !0, m = void 0, i = [0, 0, 0, 0], u = [0, t + 1, 0, 0], l && (l = !1, p = {
      type: "tableBody",
      start: Object.assign({}, x.start),
      // Note: correct end is set later.
      end: Object.assign({}, x.end)
    }, f.add(t, 0, [["enter", p, n]])), a = x.type === "tableDelimiterRow" ? 2 : p ? 3 : 1) : a && (x.type === "data" || x.type === "tableDelimiterMarker" || x.type === "tableDelimiterFiller") ? (r = !1, u[2] === 0 && (i[1] !== 0 && (u[0] = u[1], m = Ie(f, n, i, a, void 0, m), i = [0, 0, 0, 0]), u[2] = t)) : x.type === "tableCellDivider" && (r ? r = !1 : (i[1] !== 0 && (u[0] = u[1], m = Ie(f, n, i, a, void 0, m)), i = u, u = [i[1], t, 0, 0])) : x.type === "tableHead" ? (l = !0, g = t) : x.type === "tableRow" || x.type === "tableDelimiterRow" ? (g = t, i[1] !== 0 ? (u[0] = u[1], m = Ie(f, n, i, a, t, m)) : u[1] !== 0 && (m = Ie(f, n, u, a, t, m)), a = 0) : a && (x.type === "data" || x.type === "tableDelimiterMarker" || x.type === "tableDelimiterFiller") && (u[3] = t);
  }
  for (g !== 0 && ct(f, n, g, h, p), f.consume(n.events), t = -1; ++t < n.events.length; ) {
    const c = n.events[t];
    c[0] === "enter" && c[1].type === "table" && (c[1]._align = Ra(n.events, t));
  }
  return e;
}
function Ie(e, n, t, r, a, i) {
  const u = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", l = "tableContent";
  t[0] !== 0 && (i.end = Object.assign({}, ge(n.events, t[0])), e.add(t[0], 0, [["exit", i, n]]));
  const g = ge(n.events, t[1]);
  if (i = {
    type: u,
    start: Object.assign({}, g),
    // Note: correct end is set later.
    end: Object.assign({}, g)
  }, e.add(t[1], 0, [["enter", i, n]]), t[2] !== 0) {
    const h = ge(n.events, t[2]), p = ge(n.events, t[3]), m = {
      type: l,
      start: Object.assign({}, h),
      end: Object.assign({}, p)
    };
    if (e.add(t[2], 0, [["enter", m, n]]), r !== 2) {
      const f = n.events[t[2]], c = n.events[t[3]];
      if (f[1].end = Object.assign({}, c[1].end), f[1].type = "chunkText", f[1].contentType = "text", t[3] > t[2] + 1) {
        const x = t[2] + 1, C = t[3] - t[2] - 1;
        e.add(x, C, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", m, n]]);
  }
  return a !== void 0 && (i.end = Object.assign({}, ge(n.events, a)), e.add(a, 0, [["exit", i, n]]), i = void 0), i;
}
function ct(e, n, t, r, a) {
  const i = [], u = ge(n.events, t);
  a && (a.end = Object.assign({}, u), i.push(["exit", a, n])), r.end = Object.assign({}, u), i.push(["exit", r, n]), e.add(t + 1, 0, i);
}
function ge(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Da = "[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}[class*=shj-lang-]{color:#c9d1d9;background:#161b22}[class*=shj-lang-]:before{color:#6f9aff}.shj-syn-insert{color:#98c379}.shj-syn-deleted,.shj-syn-err,.shj-syn-kwd{color:#ff7b72}.shj-syn-class{color:#ffa657}.shj-numbers,.shj-syn-cmnt{color:#8b949e}.shj-syn-type,.shj-syn-oper,.shj-syn-num,.shj-syn-section,.shj-syn-var,.shj-syn-bool{color:#79c0ff}.shj-syn-str{color:#a5d6ff}.shj-syn-func{color:#d2a8ff}";
var Fa = Object.defineProperty, za = (e) => (n) => {
  var t = e[n];
  if (t) return t();
  throw new Error("Module not found in bundle: " + n);
}, L = (e, n) => () => (e && (n = e(e = 0)), n), F = (e, n) => {
  for (var t in n) Fa(e, t, { get: n[t], enumerable: !0 });
}, wt = {};
F(wt, { default: () => Ct });
var Ct, Pa = L(() => {
  Ct = [{ type: "cmnt", match: /(;|#).*/gm }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\$[\da-fA-F]*\b/g }, { type: "kwd", match: /^[a-z]+\s+[a-z.]+\b/gm, sub: [{ type: "func", match: /^[a-z]+/g }] }, { type: "kwd", match: /^\t*[a-z][a-z\d]*\b/gm }, { match: /%|\$/g, type: "oper" }];
}), At = {};
F(At, { default: () => Me });
var Ne, Me, Rt = L(() => {
  Ne = { type: "var", match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g }, Me = [{ sub: "todo", match: /#.*/g }, { type: "str", match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g, sub: [Ne] }, { type: "oper", match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi }, { type: "kwd", match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g }, { expand: "num" }, { type: "func", match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gmi }, { type: "bool", match: /(?<=\s|^)(true|false)(?=\s|$)/g }, { type: "oper", match: /[=(){}<>!]+/g }, { type: "var", match: /(?<=\s|^)[\w_]+(?=\s*=)/g }, Ne];
}), Nt = {};
F(Nt, { default: () => Ot });
var Ot, va = L(() => {
  Ot = [{ match: /[^\[\->+.<\]\s].*/g, sub: "todo" }, { type: "func", match: /\.+/g }, { type: "kwd", match: /[<>]+/g }, { type: "oper", match: /[+-]+/g }];
}), Lt = {};
F(Lt, { default: () => Dt });
var Dt, ja = L(() => {
  Dt = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /#\s*include (<.*>|".*")/g, sub: [{ type: "str", match: /(<|").*/g }] }, { match: /asm\s*{[^}]*}/g, sub: [{ type: "kwd", match: /^asm/g }, { match: /[^{}]*(?=}$)/g, sub: "asm" }] }, { type: "kwd", match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), Ft = {};
F(Ft, { default: () => zt });
var zt, Ma = L(() => {
  zt = [{ match: /\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g }, { type: "var", match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g }, { type: "func", match: /#[\w-]+(?=[^{}]*{)/g }, { type: "num", match: /#[\da-f]{3,8}/g }, { type: "num", match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g, sub: [{ type: "var", match: /[a-z]+|%/g }] }, { match: /url\([^)]*\)/g, sub: [{ type: "func", match: /url(?=\()/g }, { type: "str", match: /[^()]+/g }] }, { type: "func", match: /\b[a-zA-Z]\w*(?=\s*\()/g }, { type: "num", match: /\b[a-z-]+\b/g }];
}), Pt = {};
F(Pt, { default: () => vt });
var vt, _a = L(() => {
  vt = [{ expand: "strDouble" }, { type: "oper", match: /,/g }];
}), jt = {};
F(jt, { default: () => _e });
var _e, Mt = L(() => {
  _e = [{ type: "deleted", match: /^[-<].*/gm }, { type: "insert", match: /^[+>].*/gm }, { type: "kwd", match: /!.*/gm }, { type: "section", match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm }];
}), _t = {};
F(_t, { default: () => Bt });
var Bt, Ba = L(() => {
  Rt(), Bt = [{ type: "kwd", match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gmi }, ...Me];
}), Ut = {};
F(Ut, { default: () => Ht });
var Ht, Ua = L(() => {
  Mt(), Ht = [{ match: /^#.*/gm, sub: "todo" }, { expand: "str" }, ..._e, { type: "func", match: /^(\$ )?git(\s.*)?$/gm }, { type: "kwd", match: /^commit \w+$/gm }];
}), $t = {};
F($t, { default: () => qt });
var qt, Ha = L(() => {
  qt = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "oper", match: /[+\-*\/%&|^~=!<>.^-]+/g }];
}), Vt = {};
F(Vt, { default: () => Be, name: () => se, properties: () => ce, xmlElement: () => ue });
var Oe, ht, se, ce, ue, Be, Gt = L(() => {
  Oe = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", ht = Oe + "\\-\\.0-9·̀-ͯ‿-⁀", se = `[${Oe}][${ht}]*`, ce = `\\s*(\\s+${se}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`, ue = { match: RegExp(`<[/!?]?${se}${ce}[/!?]?>`, "g"), sub: [{ type: "var", match: RegExp(`^<[/!?]?${se}`, "g"), sub: [{ type: "oper", match: /^<[\/!?]?/g }] }, { type: "str", match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g, sub: [{ type: "oper", match: /^=/g }] }, { type: "oper", match: /[\/!?]?>/g }, { type: "class", match: RegExp(se, "g") }] }, Be = [{ match: /<!--((?!-->)[^])*-->/g, sub: "todo" }, { type: "class", match: /<!\[CDATA\[[\s\S]*?\]\]>/gi }, ue, { type: "str", match: RegExp(`<\\?${se}([^?]|\\?[^?>])*\\?+>`, "g"), sub: [{ type: "var", match: RegExp(`^<\\?${se}`, "g"), sub: [{ type: "oper", match: /^<\?/g }] }, { type: "oper", match: /\?+>$/g }] }, { type: "var", match: /&(#x?)?[\da-z]{1,8};/gi }];
}), Yt = {};
F(Yt, { default: () => Wt });
var Wt, $a = L(() => {
  Gt(), Wt = [{ type: "class", match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi, sub: [{ type: "str", match: /"[^"]*"|'[^']*'/g }, { type: "oper", match: /^<!|>$/g }, { type: "var", match: /DOCTYPE/gi }] }, { match: RegExp(`<style${ce}>((?!</style>)[^])*</style\\s*>`, "g"), sub: [{ match: RegExp(`^<style${ce}>`, "g"), sub: ue.sub }, { match: RegExp(`${ue.match}|[^]*(?=</style\\s*>$)`, "g"), sub: "css" }, ue] }, { match: RegExp(`<script${ce}>((?!<\/script>)[^])*<\/script\\s*>`, "g"), sub: [{ match: RegExp(`^<script${ce}>`, "g"), sub: ue.sub }, { match: RegExp(`${ue.match}|[^]*(?=<\/script\\s*>$)`, "g"), sub: "js" }, ue] }, ...Be];
}), mt, Ee, Ue = L(() => {
  mt = [["bash", [/#!(\/usr)?\/bin\/bash/g, 500], [/\b(if|elif|then|fi|echo)\b|\$/g, 10]], ["html", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^\s+<!DOCTYPE\s+html/g, 500]], ["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]], ["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g, 10]], ["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|implements|interface|namespace)\b/g, 10]], ["py", [/\b(def|print|class|and|or|lambda)\b/g, 10]], ["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]], ["pl", [/#!(\/usr)?\/bin\/perl/g, 500], [/\b(use|print)\b|\$/g, 10]], ["lua", [/#!(\/usr)?\/bin\/lua/g, 500]], ["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]], ["uri", [/https?:|mailto:|tel:|ftp:/g, 30]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["diff", [/^[+><-]/gm, 10], [/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]], ["md", [/^(>|\t\*|\t\d+.)/gm, 10], [/\[.*\](.*)/g, 10]], ["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]], ["xml", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^<\?xml/g, 500]], ["c", [/#include\b|\bprintf\s+\(/g, 100]], ["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]], ["go", [/\b(func|fmt|package)\b/g, 100]], ["java", [/^import\s+java/gm, 500]], ["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]], ["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gmi, 10]]], Ee = (e) => mt.map(([n, ...t]) => [n, t.reduce((r, [a, i]) => r + [...e.matchAll(a)].length * i, 0)]).filter(([n, t]) => t > 20).sort((n, t) => t[1] - n[1])[0]?.[0] || "plain";
}), Zt = {};
F(Zt, { default: () => Qt });
var Qt, qa = L(() => {
  Ue(), Qt = [{ type: "kwd", match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm }, { expand: "str" }, { type: "section", match: /\bHTTP\/[\d.]+\b/g }, { expand: "num" }, { type: "oper", match: /[,;:=]/g }, { type: "var", match: /[a-zA-Z][\w-]*(?=:)/g }, { match: /\n\n[^]*/g, sub: Ee }];
}), Xt = {};
F(Xt, { default: () => Kt });
var Kt, Va = L(() => {
  Kt = [{ match: /(^[ \f\t\v]*)[#;].*/gm, sub: "todo" }, { type: "str", match: /.*/g }, { type: "var", match: /.*(?==)/g }, { type: "section", match: /^\s*\[.+\]\s*$/gm }, { type: "oper", match: /=/g }];
}), Jt = {};
F(Jt, { default: () => en });
var en, Ga = L(() => {
  en = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), tn = {};
F(tn, { default: () => He });
var He, nn = L(() => {
  He = [{ match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g, sub: "jsdoc" }, { match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { match: /`((?!`)[^]|\\[^])*`?/g, sub: "js_template_literals" }, { type: "kwd", match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g }, { match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g, sub: "regex" }, { expand: "num" }, { type: "num", match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g }];
}), rn = {};
F(rn, { default: () => an, type: () => un });
var an, un, Ya = L(() => {
  an = [{ match: new class {
    exec(e) {
      let n = this.lastIndex, t, r = (a) => {
        for (; ++n < e.length - 2; ) if (e[n] == "{") r();
        else if (e[n] == "}") return;
      };
      for (; n < e.length; ++n) if (e[n - 1] != "\\" && e[n] == "$" && e[n + 1] == "{") return t = n++, r(), this.lastIndex = n + 1, { index: t, 0: e.slice(t, n + 1) };
      return null;
    }
  }(), sub: [{ type: "kwd", match: /^\${|}$/g }, { match: /(?!^\$|{)[^]+(?=}$)/g, sub: "js" }] }], un = "str";
}), ln = {};
F(ln, { default: () => $e, type: () => sn });
var $e, sn, on = L(() => {
  $e = [{ type: "err", match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g }, { type: "class", match: /\bIDEA\b/g }, { type: "insert", match: /\b(CHANGED|FIX|CHANGE)\b/g }, { type: "oper", match: /\bQUESTION\b/g }], sn = "cmnt";
}), cn = {};
F(cn, { default: () => hn, type: () => mn });
var hn, mn, Wa = L(() => {
  on(), hn = [{ type: "kwd", match: /@\w+/g }, { type: "class", match: /{[\w\s|<>,.@\[\]]+}/g }, { type: "var", match: /\[[\w\s="']+\]/g }, ...$e], mn = "cmnt";
}), pn = {};
F(pn, { default: () => gn });
var gn, Za = L(() => {
  gn = [{ type: "var", match: /(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\bnull\b/g }, { type: "bool", match: /\b(true|false)\b/g }];
}), fn = {};
F(fn, { default: () => qe });
var qe, dn = L(() => {
  Ue(), qe = [{ type: "cmnt", match: /^>.*|(=|-)\1+/gm }, { type: "class", match: /\*\*((?!\*\*).)*\*\*/g }, { match: /```((?!```)[^])*\n```/g, sub: (e) => ({ type: "kwd", sub: [{ match: /\n[^]*(?=```)/g, sub: e.split(`
`)[0].slice(3) || Ee(e) }] }) }, { type: "str", match: /`[^`]*`/g }, { type: "var", match: /~~((?!~~).)*~~/g }, { type: "kwd", match: /\b_\S([^\n]*?\S)?_\b|\*\S([^\n]*?\S)?\*/g }, { type: "kwd", match: /^\s*(\*|\d+\.)\s/gm }, { type: "func", match: /\[[^\]]*]\([^)]*\)|<[^>]*>/g, sub: [{ type: "oper", match: /^\[[^\]]*]/g }] }];
}), bn = {};
F(bn, { default: () => xn });
var xn, Qa = L(() => {
  dn(), Ue(), xn = [{ type: "insert", match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g, sub: [{ type: "insert", match: /leanpub-(start|end)-insert/g }, { match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g, sub: Ee }] }, { type: "deleted", match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g, sub: [{ type: "deleted", match: /leanpub-(start|end)-delete/g }, { match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g, sub: Ee }] }, ...qe];
}), yn = {};
F(yn, { default: () => En });
var En, Xa = L(() => {
  En = [{ type: "cmnt", match: /^#.*/gm }, { expand: "strDouble" }, { expand: "num" }, { type: "err", match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi }, { type: "num", match: /\b(null|undefined)\b/gi }, { type: "bool", match: /\b(false|true|yes|no)\b/gi }, { type: "oper", match: /\.|,/g }];
}), kn = {};
F(kn, { default: () => In });
var In, Ka = L(() => {
  In = [{ match: /^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g }, { type: "bool", match: /\b(true|false|nil)\b/g }, { type: "oper", match: /[+*/%^#=~<>:,.-]+/g }, { expand: "num" }, { type: "func", match: /[a-z_]+(?=\s*[({])/g }];
}), Sn = {};
F(Sn, { default: () => Tn });
var Tn, Ja = L(() => {
  Tn = [{ match: /^\s*#.*/gm, sub: "todo" }, { expand: "str" }, { type: "oper", match: /[${}()]+/g }, { type: "class", match: /.PHONY:/gm }, { type: "section", match: /^[\w.]+:/gm }, { type: "kwd", match: /\b(ifneq|endif)\b/g }, { expand: "num" }, { type: "var", match: /[A-Z_]+(?=\s*=)/g }, { match: /^.*$/gm, sub: "bash" }];
}), wn = {};
F(wn, { default: () => Cn });
var Cn, eu = L(() => {
  Cn = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /(["'])(\\[^]|(?!\1)[^])*\1?/g }, { expand: "num" }, { type: "kwd", match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g }, { type: "oper", match: /[-+*/%~!&<>|=?,]+/g }, { type: "func", match: /[a-z_]+(?=\s*\()/g }];
}), An = {};
F(An, { default: () => Rn });
var Rn, tu = L(() => {
  Rn = [{ expand: "strDouble" }];
}), Nn = {};
F(Nn, { default: () => On });
var On, nu = L(() => {
  On = [{ match: /#.*/g, sub: "todo" }, { match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g, sub: "todo" }, { type: "str", match: /f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi, sub: [{ type: "var", match: /{[^{}]*}/g, sub: [{ match: /(?!^{)[^]*(?=}$)/g, sub: "py" }] }] }, { expand: "str" }, { type: "kwd", match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g }, { type: "bool", match: /\b(False|True|None)\b/g }, { expand: "num" }, { type: "func", match: /[a-z_]\w*(?=\s*\()/gi }, { type: "oper", match: /[-/*+<>,=!&|^%]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), Ln = {};
F(Ln, { default: () => Dn, type: () => Fn });
var Dn, Fn, ru = L(() => {
  Dn = [{ match: /^(?!\/).*/gm, sub: "todo" }, { type: "num", match: /\[((?!\])[^\\]|\\.)*\]/g }, { type: "kwd", match: /\||\^|\$|\\.|\w+($|\r|\n)/g }, { type: "var", match: /\*|\+|\{\d+,\d+\}/g }], Fn = "oper";
}), zn = {};
F(zn, { default: () => Pn });
var Pn, iu = L(() => {
  Pn = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g }];
}), vn = {};
F(vn, { default: () => jn });
var jn, au = L(() => {
  jn = [{ match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "func", match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g }, { type: "kwd", match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g }, { type: "num", match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g }, { type: "bool", match: /\b(TRUE|FALSE)\b/g }, { type: "oper", match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g }, { type: "var", match: /@\S+/g }];
}), Mn = {};
F(Mn, { default: () => _n });
var _n, uu = L(() => {
  _n = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /("""|''')((?!\1)[^]|\\[^])*\1?/g }, { expand: "str" }, { type: "section", match: /^\[.+\]\s*$/gm }, { type: "num", match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g }, { expand: "num" }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[+,.=-]/g }, { type: "var", match: /\w+(?= \=)/g }];
}), Bn = {};
F(Bn, { default: () => Un });
var Un, lu = L(() => {
  nn(), Un = [{ type: "type", match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g }, { type: "kwd", match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g }, ...He];
}), Hn = {};
F(Hn, { default: () => $n });
var $n, su = L(() => {
  $n = [{ match: /^#.*/gm, sub: "todo" }, { type: "class", match: /^\w+(?=:?)/gm }, { type: "num", match: /:\d+/g }, { type: "oper", match: /[:/&?]|\w+=/g }, { type: "func", match: /[.\w]+@|#[\w]+$/gm }, { type: "var", match: /\w+\.\w+(\.\w+)*/g }];
}), qn = {};
F(qn, { default: () => Vn });
var Vn, ou = L(() => {
  Vn = [{ match: /#.*/g, sub: "todo" }, { expand: "str" }, { type: "str", match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g }, { type: "type", match: /!![a-z]+/g }, { type: "bool", match: /\b(Yes|No)\b/g }, { type: "oper", match: /[+:-]/g }, { expand: "num" }, { type: "var", match: /[a-zA-Z]\w*(?=:)/g }];
}), cu = { num: { type: "num", match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g }, str: { type: "str", match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g }, strDouble: { type: "str", match: /"((?!")[^\r\n\\]|\\[^])*"?/g } }, hu = za({ "./languages/asm.js": () => Promise.resolve().then(() => (Pa(), wt)), "./languages/bash.js": () => Promise.resolve().then(() => (Rt(), At)), "./languages/bf.js": () => Promise.resolve().then(() => (va(), Nt)), "./languages/c.js": () => Promise.resolve().then(() => (ja(), Lt)), "./languages/css.js": () => Promise.resolve().then(() => (Ma(), Ft)), "./languages/csv.js": () => Promise.resolve().then(() => (_a(), Pt)), "./languages/diff.js": () => Promise.resolve().then(() => (Mt(), jt)), "./languages/docker.js": () => Promise.resolve().then(() => (Ba(), _t)), "./languages/git.js": () => Promise.resolve().then(() => (Ua(), Ut)), "./languages/go.js": () => Promise.resolve().then(() => (Ha(), $t)), "./languages/html.js": () => Promise.resolve().then(() => ($a(), Yt)), "./languages/http.js": () => Promise.resolve().then(() => (qa(), Zt)), "./languages/ini.js": () => Promise.resolve().then(() => (Va(), Xt)), "./languages/java.js": () => Promise.resolve().then(() => (Ga(), Jt)), "./languages/js.js": () => Promise.resolve().then(() => (nn(), tn)), "./languages/js_template_literals.js": () => Promise.resolve().then(() => (Ya(), rn)), "./languages/jsdoc.js": () => Promise.resolve().then(() => (Wa(), cn)), "./languages/json.js": () => Promise.resolve().then(() => (Za(), pn)), "./languages/leanpub-md.js": () => Promise.resolve().then(() => (Qa(), bn)), "./languages/log.js": () => Promise.resolve().then(() => (Xa(), yn)), "./languages/lua.js": () => Promise.resolve().then(() => (Ka(), kn)), "./languages/make.js": () => Promise.resolve().then(() => (Ja(), Sn)), "./languages/md.js": () => Promise.resolve().then(() => (dn(), fn)), "./languages/pl.js": () => Promise.resolve().then(() => (eu(), wn)), "./languages/plain.js": () => Promise.resolve().then(() => (tu(), An)), "./languages/py.js": () => Promise.resolve().then(() => (nu(), Nn)), "./languages/regex.js": () => Promise.resolve().then(() => (ru(), Ln)), "./languages/rs.js": () => Promise.resolve().then(() => (iu(), zn)), "./languages/sql.js": () => Promise.resolve().then(() => (au(), vn)), "./languages/todo.js": () => Promise.resolve().then(() => (on(), ln)), "./languages/toml.js": () => Promise.resolve().then(() => (uu(), Mn)), "./languages/ts.js": () => Promise.resolve().then(() => (lu(), Bn)), "./languages/uri.js": () => Promise.resolve().then(() => (su(), Hn)), "./languages/xml.js": () => Promise.resolve().then(() => (Gt(), Vt)), "./languages/yaml.js": () => Promise.resolve().then(() => (ou(), qn)) }), pt = {}, mu = (e = "") => e.replaceAll("&", "&#38;").replaceAll?.("<", "&lt;").replaceAll?.(">", "&gt;"), pu = (e, n) => n ? `<span class="shj-syn-${n}">${e}</span>` : e;
async function Gn(e, n, t) {
  try {
    let r, a, i = {}, u, l = [], g = 0, h = typeof n == "string" ? await (pt[n] ?? (pt[n] = hu(`./languages/${n}.js`))) : n, p = [...typeof n == "string" ? h.default : n.sub];
    for (; g < e.length; ) {
      for (i.index = null, r = p.length; r-- > 0; ) {
        if (a = p[r].expand ? cu[p[r].expand] : p[r], l[r] === void 0 || l[r].match.index < g) {
          if (a.match.lastIndex = g, u = a.match.exec(e), u === null) {
            p.splice(r, 1), l.splice(r, 1);
            continue;
          }
          l[r] = { match: u, lastIndex: a.match.lastIndex };
        }
        l[r].match[0] && (l[r].match.index <= i.index || i.index === null) && (i = { part: a, index: l[r].match.index, match: l[r].match[0], end: l[r].lastIndex });
      }
      if (i.index === null) break;
      t(e.slice(g, i.index), h.type), g = i.end, i.part.sub ? await Gn(i.match, typeof i.part.sub == "string" ? i.part.sub : typeof i.part.sub == "function" ? i.part.sub(i.match) : i.part, t) : t(i.match, i.part.type);
    }
    t(e.slice(g, e.length), h.type);
  } catch {
    t(e);
  }
}
async function gu(e, n, t = !0, r = {}) {
  let a = "";
  return await Gn(e, n, (i, u) => a += pu(mu(i), u)), t ? `<div><div class="shj-numbers">${"<div></div>".repeat(!r.hideLineNumbers && e.split(`
`).length)}</div><div>${a}</div></div>` : a;
}
async function fu(e, n = e.className.match(/shj-lang-([\w-]+)/)?.[1], t, r) {
  let a = e.textContent;
  e.dataset.lang = n, e.className = `${[...e.classList].filter((i) => !i.startsWith("shj-")).join(" ")} shj-lang-${n} shj-${t}`, e.innerHTML = await gu(a, n, t == "multiline", r);
}
const du = "[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}[class*=shj-lang-]{color:#24292f;background:#fff}.shj-syn-deleted,.shj-syn-err,.shj-syn-kwd{color:#cf222e}.shj-syn-class{color:#953800}.shj-numbers,.shj-syn-cmnt{color:#6e7781}.shj-syn-type,.shj-syn-oper,.shj-syn-num,.shj-syn-section,.shj-syn-var,.shj-syn-bool{color:#0550ae}.shj-syn-str{color:#0a3069}.shj-syn-func{color:#8250df}", bu = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
class Eu {
  options;
  themeIds = { light: "theme-light", dark: "theme-dark" };
  themeCss = { light: du, dark: Da };
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      extensions: [Na()],
      htmlExtensions: [Ta(), this.createPresenterCodeBlockHtmlExtension()]
    }, this.injectThemes(), this.injectCodeFont();
  }
  injectCodeFont() {
    Le("@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');", "code-font");
  }
  // Operations - Render.
  render(n) {
    return Sa(n, this.options);
  }
  highlight() {
    document.querySelectorAll('div[class^="shj-lang-"]').forEach((n) => {
      (/shj-lang-([^\s]+)/.exec(n.className) || [])[1] && (fu(n, "js", "multiline", { hideLineNumbers: !0 }), n.style.setProperty("font-family", "'Fira Code', 'Fira Mono', monospace", "important"));
    });
  }
  setColorMode(n) {
    const t = n === "light" ? this.themeIds.light : this.themeIds.dark;
    yu(t);
  }
  injectThemes() {
    Le(this.themeCss.light, this.themeIds.light), Le(this.themeCss.dark, this.themeIds.dark);
  }
  // Utilities - Create presenter code block.
  createPresenterCodeBlockHtmlExtension() {
    let n;
    return {
      enter: {
        codeFenced() {
          this.buffer(), n = { codeContent: [], lang: "", meta: "" };
        },
        codeFencedFence() {
        },
        codeFencedFenceSequence() {
        },
        codeFencedFenceInfo(t) {
          n && (n.lang = this.sliceSerialize(t));
        },
        codeFencedFenceMeta(t) {
          n && (n.meta = this.sliceSerialize(t));
        },
        codeFlowValue(t) {
          n && n.codeContent.push(this.sliceSerialize(t));
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
          const t = n || { codeContent: [], lang: "", meta: "" };
          this.resume();
          const r = t.codeContent.join(`
`), a = t.lang || "plain", i = t.meta || "";
          let u = "";
          a === "json" && i === "datapos-visual" ? u = `<div class="${i}" data-options="${encodeURIComponent(r)}"></div>` : a === "json" && i === "datapos-highcharts" ? u = `<div class="${i}" data-options="${encodeURIComponent(r)}"></div>` : u = `<div class="shj-lang-${a.replaceAll(/[^a-z0-9_-]/gi, "")}">${xu(r)}</div>`, this.raw(u), n = void 0;
        }
      }
    };
  }
}
function xu(e) {
  return e.replaceAll(/[&<>"']/g, (n) => bu[n]);
}
function Le(e, n) {
  if (typeof document > "u") return;
  let t = document.getElementById(n);
  return t || (t = document.createElement("style"), t.id = n, t.dataset.dynamic = "true", document.head.appendChild(t)), t.innerHTML = e, t;
}
function yu(e) {
  document.querySelectorAll("style[data-dynamic]").forEach((n) => {
    n.disabled = n.id !== e;
  });
}
export {
  Eu as MicromarkTool
};
