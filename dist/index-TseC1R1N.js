const Xn = document.createElement("i");
function ge(n) {
  const t = "&" + n + ";";
  Xn.innerHTML = t;
  const e = Xn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    e.charCodeAt(e.length - 1) === 59 && n !== "semi" || e === t ? !1 : e
  );
}
function tn(n, t, e, r) {
  const a = n.length;
  let i = 0, u;
  if (t < 0 ? t = -t > a ? 0 : a + t : t = t > a ? a : t, e = e > 0 ? e : 0, r.length < 1e4)
    u = Array.from(r), u.unshift(t, e), n.splice(...u);
  else
    for (e && n.splice(t, e); i < r.length; )
      u = r.slice(i, i + 1e4), u.unshift(t, 0), n.splice(...u), i += 1e4, t += 1e4;
}
function V(n, t) {
  return n.length > 0 ? (tn(n, n.length, 0, t), n) : t;
}
const On = {}.hasOwnProperty;
function Er(n) {
  const t = {};
  let e = -1;
  for (; ++e < n.length; )
    yr(t, n[e]);
  return t;
}
function yr(n, t) {
  let e;
  for (e in t) {
    const a = (On.call(n, e) ? n[e] : void 0) || (n[e] = {}), i = t[e];
    let u;
    if (i)
      for (u in i) {
        On.call(a, u) || (a[u] = []);
        const l = i[u];
        kr(
          // @ts-expect-error Looks like a list.
          a[u],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function kr(n, t) {
  let e = -1;
  const r = [];
  for (; ++e < t.length; )
    (t[e].add === "after" ? n : r).push(t[e]);
  tn(n, 0, 0, r);
}
function Ir(n) {
  const t = {};
  let e = -1;
  for (; ++e < n.length; )
    Sr(t, n[e]);
  return t;
}
function Sr(n, t) {
  let e;
  for (e in t) {
    const a = (On.call(n, e) ? n[e] : void 0) || (n[e] = {}), i = t[e];
    let u;
    if (i)
      for (u in i)
        a[u] = i[u];
  }
}
function Tr(n, t) {
  const e = Number.parseInt(n, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    e < 9 || e === 11 || e > 13 && e < 32 || // Control character (DEL) of C0, and C1 controls.
    e > 126 && e < 160 || // Lone high surrogates and low surrogates.
    e > 55295 && e < 57344 || // Noncharacters.
    e > 64975 && e < 65008 || /* eslint-disable no-bitwise */
    (e & 65535) === 65535 || (e & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    e > 1114111 ? "�" : String.fromCodePoint(e)
  );
}
const Cr = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function fe(n) {
  return n.replace(/["&<>]/g, t);
  function t(e) {
    return "&" + Cr[
      /** @type {keyof typeof characterReferences} */
      e
    ] + ";";
  }
}
function En(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const en = cn(/[A-Za-z]/), W = cn(/[\dA-Za-z]/), wr = cn(/[#-'*+\--9=?A-Z^-~]/);
function Rn(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const Fn = cn(/\d/), Ar = cn(/[\dA-Fa-f]/), Nr = cn(/[!-/:-@[-`{-~]/);
function w(n) {
  return n !== null && n < -2;
}
function Y(n) {
  return n !== null && (n < 0 || n === 32);
}
function F(n) {
  return n === -2 || n === -1 || n === 32;
}
const Lr = cn(/\p{P}|\p{S}/u), Or = cn(/\s/);
function cn(n) {
  return t;
  function t(e) {
    return e !== null && e > -1 && n.test(String.fromCharCode(e));
  }
}
function kn(n, t) {
  const e = fe(Rr(n || ""));
  if (!t)
    return e;
  const r = e.indexOf(":"), a = e.indexOf("?"), i = e.indexOf("#"), u = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    u > -1 && r > u || a > -1 && r > a || i > -1 && r > i || // It is a protocol, it should be allowed.
    t.test(e.slice(0, r)) ? e : ""
  );
}
function Rr(n) {
  const t = [];
  let e = -1, r = 0, a = 0;
  for (; ++e < n.length; ) {
    const i = n.charCodeAt(e);
    let u = "";
    if (i === 37 && W(n.charCodeAt(e + 1)) && W(n.charCodeAt(e + 2)))
      a = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (u = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const l = n.charCodeAt(e + 1);
      i < 56320 && l > 56319 && l < 57344 ? (u = String.fromCharCode(i, l), a = 1) : u = "�";
    } else
      u = String.fromCharCode(i);
    u && (t.push(n.slice(r, e), encodeURIComponent(u)), r = e + a + 1, u = ""), a && (e += a, a = 0);
  }
  return t.join("") + n.slice(r);
}
const Kn = {}.hasOwnProperty, Jn = /^(https?|ircs?|mailto|xmpp)$/i, Fr = /^https?$/i;
function zr(n) {
  const t = n || {};
  let e = !0;
  const r = {}, a = [[]], i = [], u = [], g = (
    /** @type {NormalizedHtmlExtension} */
    Ir([{
      enter: {
        blockQuote: R,
        codeFenced: rn,
        codeFencedFenceInfo: O,
        codeFencedFenceMeta: O,
        codeIndented: an,
        codeText: hr,
        content: Jt,
        definition: Yt,
        definitionDestinationString: Zt,
        definitionLabelString: O,
        definitionTitleString: O,
        emphasis: or,
        htmlFlow: sr,
        htmlText: Gn,
        image: X,
        label: O,
        link: mn,
        listItemMarker: T,
        listItemValue: B,
        listOrdered: M,
        listUnordered: _,
        paragraph: U,
        reference: O,
        resource: pn,
        resourceDestinationString: gn,
        resourceTitleString: O,
        setextHeading: er,
        strong: cr
      },
      exit: {
        atxHeading: rr,
        atxHeadingSequence: nr,
        autolinkEmail: br,
        autolinkProtocol: xr,
        blockQuote: $,
        characterEscapeValue: dn,
        characterReferenceMarkerHexadecimal: Yn,
        characterReferenceMarkerNumeric: Yn,
        characterReferenceValue: dr,
        codeFenced: o,
        codeFencedFence: Q,
        codeFencedFenceInfo: s,
        codeFencedFenceMeta: z,
        codeFlowValue: lr,
        codeIndented: o,
        codeText: mr,
        codeTextData: dn,
        data: dn,
        definition: Kt,
        definitionDestinationString: Qt,
        definitionLabelString: Wt,
        definitionTitleString: Xt,
        emphasis: pr,
        hardBreakEscape: qn,
        hardBreakTrailing: qn,
        htmlFlow: Vn,
        htmlFlowData: dn,
        htmlText: Vn,
        htmlTextData: dn,
        image: $n,
        label: fn,
        labelText: H,
        lineEnding: ur,
        link: $n,
        listOrdered: S,
        listUnordered: D,
        paragraph: Z,
        reference: z,
        referenceString: sn,
        resource: z,
        resourceDestinationString: Cn,
        resourceTitleString: Gt,
        setextHeading: ar,
        setextHeadingLineSequence: ir,
        setextHeadingText: tr,
        strong: gr,
        thematicBreak: fr
      }
    }, ...t.htmlExtensions || []])
  ), h = {
    definitions: r,
    tightStack: u
  }, m = {
    buffer: O,
    encode: d,
    getData: C,
    lineEndingIfNeeded: A,
    options: t,
    raw: y,
    resume: b,
    setData: E,
    tag: k
  };
  let p = t.defaultLineEnding;
  return f;
  function f(x) {
    let I = -1, q = 0;
    const K = [];
    let J = [], un = [];
    for (; ++I < x.length; )
      !p && (x[I][1].type === "lineEnding" || x[I][1].type === "lineEndingBlank") && (p = /** @type {LineEnding} */
      x[I][2].sliceSerialize(x[I][1])), (x[I][1].type === "listOrdered" || x[I][1].type === "listUnordered") && (x[I][0] === "enter" ? K.push(I) : c(x.slice(K.pop(), I))), x[I][1].type === "definition" && (x[I][0] === "enter" ? (un = V(un, x.slice(q, I)), q = I) : (J = V(J, x.slice(q, I + 1)), q = I + 1));
    J = V(J, un), J = V(J, x.slice(q)), I = -1;
    const nn = J;
    for (g.enter.null && g.enter.null.call(m); ++I < x.length; ) {
      const Wn = g[nn[I][0]], Zn = nn[I][1].type, Qn = Wn[Zn];
      Kn.call(Wn, Zn) && Qn && Qn.call({
        sliceSerialize: nn[I][2].sliceSerialize,
        ...m
      }, nn[I][1]);
    }
    return g.exit.null && g.exit.null.call(m), a[0].join("");
  }
  function c(x) {
    const I = x.length;
    let q = 0, K = 0, J = !1, un;
    for (; ++q < I; ) {
      const nn = x[q];
      if (nn[1]._container)
        un = void 0, nn[0] === "enter" ? K++ : K--;
      else switch (nn[1].type) {
        case "listItemPrefix": {
          nn[0] === "exit" && (un = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          nn[0] === "enter" && !K && (un ? un = void 0 : J = !0);
          break;
        }
        default:
          un = void 0;
      }
    }
    x[0][1]._loose = J;
  }
  function E(x, I) {
    h[x] = I;
  }
  function C(x) {
    return h[x];
  }
  function O() {
    a.push([]);
  }
  function b() {
    return a.pop().join("");
  }
  function k(x) {
    e && (E("lastWasTag", !0), a[a.length - 1].push(x));
  }
  function y(x) {
    E("lastWasTag"), a[a.length - 1].push(x);
  }
  function P() {
    y(p || `
`);
  }
  function A() {
    const x = a[a.length - 1], I = x[x.length - 1], q = I ? I.charCodeAt(I.length - 1) : null;
    q === 10 || q === 13 || q === null || P();
  }
  function d(x) {
    return C("ignoreEncode") ? x : fe(x);
  }
  function z() {
    b();
  }
  function M(x) {
    u.push(!x._loose), A(), k("<ol"), E("expectFirstItem", !0);
  }
  function _(x) {
    u.push(!x._loose), A(), k("<ul"), E("expectFirstItem", !0);
  }
  function B(x) {
    if (C("expectFirstItem")) {
      const I = Number.parseInt(this.sliceSerialize(x), 10);
      I !== 1 && k(' start="' + d(String(I)) + '"');
    }
  }
  function T() {
    C("expectFirstItem") ? k(">") : j(), A(), k("<li>"), E("expectFirstItem"), E("lastWasTag");
  }
  function S() {
    j(), u.pop(), P(), k("</ol>");
  }
  function D() {
    j(), u.pop(), P(), k("</ul>");
  }
  function j() {
    C("lastWasTag") && !C("slurpAllLineEndings") && A(), k("</li>"), E("slurpAllLineEndings");
  }
  function R() {
    u.push(!1), A(), k("<blockquote>");
  }
  function $() {
    u.pop(), A(), k("</blockquote>"), E("slurpAllLineEndings");
  }
  function U() {
    u[u.length - 1] || (A(), k("<p>")), E("slurpAllLineEndings");
  }
  function Z() {
    u[u.length - 1] ? E("slurpAllLineEndings", !0) : k("</p>");
  }
  function rn() {
    A(), k("<pre><code"), E("fencesCount", 0);
  }
  function s() {
    const x = b();
    k(' class="language-' + x + '"');
  }
  function Q() {
    const x = C("fencesCount") || 0;
    x || (k(">"), E("slurpOneLineEnding", !0)), E("fencesCount", x + 1);
  }
  function an() {
    A(), k("<pre><code>");
  }
  function o() {
    const x = C("fencesCount");
    x !== void 0 && x < 2 && h.tightStack.length > 0 && !C("lastWasTag") && P(), C("flowCodeSeenData") && A(), k("</code></pre>"), x !== void 0 && x < 2 && A(), E("flowCodeSeenData"), E("fencesCount"), E("slurpOneLineEnding");
  }
  function X() {
    i.push({
      image: !0
    }), e = void 0;
  }
  function mn() {
    i.push({});
  }
  function H(x) {
    i[i.length - 1].labelId = this.sliceSerialize(x);
  }
  function fn() {
    i[i.length - 1].label = b();
  }
  function sn(x) {
    i[i.length - 1].referenceId = this.sliceSerialize(x);
  }
  function pn() {
    O(), i[i.length - 1].destination = "";
  }
  function gn() {
    O(), E("ignoreEncode", !0);
  }
  function Cn() {
    i[i.length - 1].destination = b(), E("ignoreEncode");
  }
  function Gt() {
    i[i.length - 1].title = b();
  }
  function $n() {
    let x = i.length - 1;
    const I = i[x], q = I.referenceId || I.labelId, K = I.destination === void 0 ? r[En(q)] : I;
    for (e = !0; x--; )
      if (i[x].image) {
        e = void 0;
        break;
      }
    I.image ? (k('<img src="' + kn(K.destination, t.allowDangerousProtocol ? void 0 : Fr) + '" alt="'), y(I.label), k('"')) : k('<a href="' + kn(K.destination, t.allowDangerousProtocol ? void 0 : Jn) + '"'), k(K.title ? ' title="' + K.title + '"' : ""), I.image ? k(" />") : (k(">"), y(I.label), k("</a>")), i.pop();
  }
  function Yt() {
    O(), i.push({});
  }
  function Wt(x) {
    b(), i[i.length - 1].labelId = this.sliceSerialize(x);
  }
  function Zt() {
    O(), E("ignoreEncode", !0);
  }
  function Qt() {
    i[i.length - 1].destination = b(), E("ignoreEncode");
  }
  function Xt() {
    i[i.length - 1].title = b();
  }
  function Kt() {
    const x = i[i.length - 1], I = En(x.labelId);
    b(), Kn.call(r, I) || (r[I] = i[i.length - 1]), i.pop();
  }
  function Jt() {
    E("slurpAllLineEndings", !0);
  }
  function nr(x) {
    C("headingRank") || (E("headingRank", this.sliceSerialize(x).length), A(), k("<h" + C("headingRank") + ">"));
  }
  function er() {
    O(), E("slurpAllLineEndings");
  }
  function tr() {
    E("slurpAllLineEndings", !0);
  }
  function rr() {
    k("</h" + C("headingRank") + ">"), E("headingRank");
  }
  function ir(x) {
    E("headingRank", this.sliceSerialize(x).charCodeAt(0) === 61 ? 1 : 2);
  }
  function ar() {
    const x = b();
    A(), k("<h" + C("headingRank") + ">"), y(x), k("</h" + C("headingRank") + ">"), E("slurpAllLineEndings"), E("headingRank");
  }
  function dn(x) {
    y(d(this.sliceSerialize(x)));
  }
  function ur(x) {
    if (!C("slurpAllLineEndings")) {
      if (C("slurpOneLineEnding")) {
        E("slurpOneLineEnding");
        return;
      }
      if (C("inCodeText")) {
        y(" ");
        return;
      }
      y(d(this.sliceSerialize(x)));
    }
  }
  function lr(x) {
    y(d(this.sliceSerialize(x))), E("flowCodeSeenData", !0);
  }
  function qn() {
    k("<br />");
  }
  function sr() {
    A(), Gn();
  }
  function Vn() {
    E("ignoreEncode");
  }
  function Gn() {
    t.allowDangerousHtml && E("ignoreEncode", !0);
  }
  function or() {
    k("<em>");
  }
  function cr() {
    k("<strong>");
  }
  function hr() {
    E("inCodeText", !0), k("<code>");
  }
  function mr() {
    E("inCodeText"), k("</code>");
  }
  function pr() {
    k("</em>");
  }
  function gr() {
    k("</strong>");
  }
  function fr() {
    A(), k("<hr />");
  }
  function Yn(x) {
    E("characterReferenceType", x.type);
  }
  function dr(x) {
    const I = this.sliceSerialize(x), q = C("characterReferenceType") ? Tr(I, C("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : ge(I);
    y(d(
      /** @type {string} */
      q
    )), E("characterReferenceType");
  }
  function xr(x) {
    const I = this.sliceSerialize(x);
    k('<a href="' + kn(I, t.allowDangerousProtocol ? void 0 : Jn) + '">'), y(d(I)), k("</a>");
  }
  function br(x) {
    const I = this.sliceSerialize(x);
    k('<a href="' + kn("mailto:" + I) + '">'), y(d(I)), k("</a>");
  }
}
function v(n, t, e, r) {
  const a = r ? r - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return u;
  function u(g) {
    return F(g) ? (n.enter(e), l(g)) : t(g);
  }
  function l(g) {
    return F(g) && i++ < a ? (n.consume(g), l) : (n.exit(e), t(g));
  }
}
const Pr = {
  tokenize: vr
};
function vr(n) {
  const t = n.attempt(this.parser.constructs.contentInitial, r, a);
  let e;
  return t;
  function r(l) {
    if (l === null) {
      n.consume(l);
      return;
    }
    return n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), v(n, t, "linePrefix");
  }
  function a(l) {
    return n.enter("paragraph"), i(l);
  }
  function i(l) {
    const g = n.enter("chunkText", {
      contentType: "text",
      previous: e
    });
    return e && (e.next = g), e = g, u(l);
  }
  function u(l) {
    if (l === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(l);
      return;
    }
    return w(l) ? (n.consume(l), n.exit("chunkText"), i) : (n.consume(l), u);
  }
}
const Dr = {
  tokenize: jr
}, ne = {
  tokenize: Mr
};
function jr(n) {
  const t = this, e = [];
  let r = 0, a, i, u;
  return l;
  function l(y) {
    if (r < e.length) {
      const P = e[r];
      return t.containerState = P[1], n.attempt(P[0].continuation, g, h)(y);
    }
    return h(y);
  }
  function g(y) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, a && k();
      const P = t.events.length;
      let A = P, d;
      for (; A--; )
        if (t.events[A][0] === "exit" && t.events[A][1].type === "chunkFlow") {
          d = t.events[A][1].end;
          break;
        }
      b(r);
      let z = P;
      for (; z < t.events.length; )
        t.events[z][1].end = {
          ...d
        }, z++;
      return tn(t.events, A + 1, 0, t.events.slice(P)), t.events.length = z, h(y);
    }
    return l(y);
  }
  function h(y) {
    if (r === e.length) {
      if (!a)
        return f(y);
      if (a.currentConstruct && a.currentConstruct.concrete)
        return E(y);
      t.interrupt = !!(a.currentConstruct && !a._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, n.check(ne, m, p)(y);
  }
  function m(y) {
    return a && k(), b(r), f(y);
  }
  function p(y) {
    return t.parser.lazy[t.now().line] = r !== e.length, u = t.now().offset, E(y);
  }
  function f(y) {
    return t.containerState = {}, n.attempt(ne, c, E)(y);
  }
  function c(y) {
    return r++, e.push([t.currentConstruct, t.containerState]), f(y);
  }
  function E(y) {
    if (y === null) {
      a && k(), b(0), n.consume(y);
      return;
    }
    return a = a || t.parser.flow(t.now()), n.enter("chunkFlow", {
      _tokenizer: a,
      contentType: "flow",
      previous: i
    }), C(y);
  }
  function C(y) {
    if (y === null) {
      O(n.exit("chunkFlow"), !0), b(0), n.consume(y);
      return;
    }
    return w(y) ? (n.consume(y), O(n.exit("chunkFlow")), r = 0, t.interrupt = void 0, l) : (n.consume(y), C);
  }
  function O(y, P) {
    const A = t.sliceStream(y);
    if (P && A.push(null), y.previous = i, i && (i.next = y), i = y, a.defineSkip(y.start), a.write(A), t.parser.lazy[y.start.line]) {
      let d = a.events.length;
      for (; d--; )
        if (
          // The token starts before the line ending…
          a.events[d][1].start.offset < u && // …and either is not ended yet…
          (!a.events[d][1].end || // …or ends after it.
          a.events[d][1].end.offset > u)
        )
          return;
      const z = t.events.length;
      let M = z, _, B;
      for (; M--; )
        if (t.events[M][0] === "exit" && t.events[M][1].type === "chunkFlow") {
          if (_) {
            B = t.events[M][1].end;
            break;
          }
          _ = !0;
        }
      for (b(r), d = z; d < t.events.length; )
        t.events[d][1].end = {
          ...B
        }, d++;
      tn(t.events, M + 1, 0, t.events.slice(z)), t.events.length = d;
    }
  }
  function b(y) {
    let P = e.length;
    for (; P-- > y; ) {
      const A = e[P];
      t.containerState = A[1], A[0].exit.call(t, n);
    }
    e.length = y;
  }
  function k() {
    a.write([null]), i = void 0, a = void 0, t.containerState._closeFlow = void 0;
  }
}
function Mr(n, t, e) {
  return v(n, n.attempt(this.parser.constructs.document, t, e), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function ee(n) {
  if (n === null || Y(n) || Or(n))
    return 1;
  if (Lr(n))
    return 2;
}
function Pn(n, t, e) {
  const r = [];
  let a = -1;
  for (; ++a < n.length; ) {
    const i = n[a].resolveAll;
    i && !r.includes(i) && (t = i(t, e), r.push(i));
  }
  return t;
}
const zn = {
  name: "attention",
  resolveAll: _r,
  tokenize: Br
};
function _r(n, t) {
  let e = -1, r, a, i, u, l, g, h, m;
  for (; ++e < n.length; )
    if (n[e][0] === "enter" && n[e][1].type === "attentionSequence" && n[e][1]._close) {
      for (r = e; r--; )
        if (n[r][0] === "exit" && n[r][1].type === "attentionSequence" && n[r][1]._open && // If the markers are the same:
        t.sliceSerialize(n[r][1]).charCodeAt(0) === t.sliceSerialize(n[e][1]).charCodeAt(0)) {
          if ((n[r][1]._close || n[e][1]._open) && (n[e][1].end.offset - n[e][1].start.offset) % 3 && !((n[r][1].end.offset - n[r][1].start.offset + n[e][1].end.offset - n[e][1].start.offset) % 3))
            continue;
          g = n[r][1].end.offset - n[r][1].start.offset > 1 && n[e][1].end.offset - n[e][1].start.offset > 1 ? 2 : 1;
          const p = {
            ...n[r][1].end
          }, f = {
            ...n[e][1].start
          };
          te(p, -g), te(f, g), u = {
            type: g > 1 ? "strongSequence" : "emphasisSequence",
            start: p,
            end: {
              ...n[r][1].end
            }
          }, l = {
            type: g > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[e][1].start
            },
            end: f
          }, i = {
            type: g > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[r][1].end
            },
            end: {
              ...n[e][1].start
            }
          }, a = {
            type: g > 1 ? "strong" : "emphasis",
            start: {
              ...u.start
            },
            end: {
              ...l.end
            }
          }, n[r][1].end = {
            ...u.start
          }, n[e][1].start = {
            ...l.end
          }, h = [], n[r][1].end.offset - n[r][1].start.offset && (h = V(h, [["enter", n[r][1], t], ["exit", n[r][1], t]])), h = V(h, [["enter", a, t], ["enter", u, t], ["exit", u, t], ["enter", i, t]]), h = V(h, Pn(t.parser.constructs.insideSpan.null, n.slice(r + 1, e), t)), h = V(h, [["exit", i, t], ["enter", l, t], ["exit", l, t], ["exit", a, t]]), n[e][1].end.offset - n[e][1].start.offset ? (m = 2, h = V(h, [["enter", n[e][1], t], ["exit", n[e][1], t]])) : m = 0, tn(n, r - 1, e - r + 3, h), e = r + h.length - m - 2;
          break;
        }
    }
  for (e = -1; ++e < n.length; )
    n[e][1].type === "attentionSequence" && (n[e][1].type = "data");
  return n;
}
function Br(n, t) {
  const e = this.parser.constructs.attentionMarkers.null, r = this.previous, a = ee(r);
  let i;
  return u;
  function u(g) {
    return i = g, n.enter("attentionSequence"), l(g);
  }
  function l(g) {
    if (g === i)
      return n.consume(g), l;
    const h = n.exit("attentionSequence"), m = ee(g), p = !m || m === 2 && a || e.includes(g), f = !a || a === 2 && m || e.includes(r);
    return h._open = !!(i === 42 ? p : p && (a || !f)), h._close = !!(i === 42 ? f : f && (m || !p)), t(g);
  }
}
function te(n, t) {
  n.column += t, n.offset += t, n._bufferIndex += t;
}
const Ur = {
  name: "autolink",
  tokenize: Hr
};
function Hr(n, t, e) {
  let r = 0;
  return a;
  function a(c) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), i;
  }
  function i(c) {
    return en(c) ? (n.consume(c), u) : c === 64 ? e(c) : h(c);
  }
  function u(c) {
    return c === 43 || c === 45 || c === 46 || W(c) ? (r = 1, l(c)) : h(c);
  }
  function l(c) {
    return c === 58 ? (n.consume(c), r = 0, g) : (c === 43 || c === 45 || c === 46 || W(c)) && r++ < 32 ? (n.consume(c), l) : (r = 0, h(c));
  }
  function g(c) {
    return c === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), t) : c === null || c === 32 || c === 60 || Rn(c) ? e(c) : (n.consume(c), g);
  }
  function h(c) {
    return c === 64 ? (n.consume(c), m) : wr(c) ? (n.consume(c), h) : e(c);
  }
  function m(c) {
    return W(c) ? p(c) : e(c);
  }
  function p(c) {
    return c === 46 ? (n.consume(c), r = 0, m) : c === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), t) : f(c);
  }
  function f(c) {
    if ((c === 45 || W(c)) && r++ < 63) {
      const E = c === 45 ? f : p;
      return n.consume(c), E;
    }
    return e(c);
  }
}
const Tn = {
  partial: !0,
  tokenize: $r
};
function $r(n, t, e) {
  return r;
  function r(i) {
    return F(i) ? v(n, a, "linePrefix")(i) : a(i);
  }
  function a(i) {
    return i === null || w(i) ? t(i) : e(i);
  }
}
const de = {
  continuation: {
    tokenize: Vr
  },
  exit: Gr,
  name: "blockQuote",
  tokenize: qr
};
function qr(n, t, e) {
  const r = this;
  return a;
  function a(u) {
    if (u === 62) {
      const l = r.containerState;
      return l.open || (n.enter("blockQuote", {
        _container: !0
      }), l.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(u), n.exit("blockQuoteMarker"), i;
    }
    return e(u);
  }
  function i(u) {
    return F(u) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(u), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), t) : (n.exit("blockQuotePrefix"), t(u));
  }
}
function Vr(n, t, e) {
  const r = this;
  return a;
  function a(u) {
    return F(u) ? v(n, i, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(u) : i(u);
  }
  function i(u) {
    return n.attempt(de, t, e)(u);
  }
}
function Gr(n) {
  n.exit("blockQuote");
}
const xe = {
  name: "characterEscape",
  tokenize: Yr
};
function Yr(n, t, e) {
  return r;
  function r(i) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(i), n.exit("escapeMarker"), a;
  }
  function a(i) {
    return Nr(i) ? (n.enter("characterEscapeValue"), n.consume(i), n.exit("characterEscapeValue"), n.exit("characterEscape"), t) : e(i);
  }
}
const be = {
  name: "characterReference",
  tokenize: Wr
};
function Wr(n, t, e) {
  const r = this;
  let a = 0, i, u;
  return l;
  function l(p) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(p), n.exit("characterReferenceMarker"), g;
  }
  function g(p) {
    return p === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(p), n.exit("characterReferenceMarkerNumeric"), h) : (n.enter("characterReferenceValue"), i = 31, u = W, m(p));
  }
  function h(p) {
    return p === 88 || p === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(p), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), i = 6, u = Ar, m) : (n.enter("characterReferenceValue"), i = 7, u = Fn, m(p));
  }
  function m(p) {
    if (p === 59 && a) {
      const f = n.exit("characterReferenceValue");
      return u === W && !ge(r.sliceSerialize(f)) ? e(p) : (n.enter("characterReferenceMarker"), n.consume(p), n.exit("characterReferenceMarker"), n.exit("characterReference"), t);
    }
    return u(p) && a++ < i ? (n.consume(p), m) : e(p);
  }
}
const re = {
  partial: !0,
  tokenize: Qr
}, ie = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Zr
};
function Zr(n, t, e) {
  const r = this, a = {
    partial: !0,
    tokenize: A
  };
  let i = 0, u = 0, l;
  return g;
  function g(d) {
    return h(d);
  }
  function h(d) {
    const z = r.events[r.events.length - 1];
    return i = z && z[1].type === "linePrefix" ? z[2].sliceSerialize(z[1], !0).length : 0, l = d, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), m(d);
  }
  function m(d) {
    return d === l ? (u++, n.consume(d), m) : u < 3 ? e(d) : (n.exit("codeFencedFenceSequence"), F(d) ? v(n, p, "whitespace")(d) : p(d));
  }
  function p(d) {
    return d === null || w(d) ? (n.exit("codeFencedFence"), r.interrupt ? t(d) : n.check(re, C, P)(d)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), f(d));
  }
  function f(d) {
    return d === null || w(d) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), p(d)) : F(d) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), v(n, c, "whitespace")(d)) : d === 96 && d === l ? e(d) : (n.consume(d), f);
  }
  function c(d) {
    return d === null || w(d) ? p(d) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), E(d));
  }
  function E(d) {
    return d === null || w(d) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), p(d)) : d === 96 && d === l ? e(d) : (n.consume(d), E);
  }
  function C(d) {
    return n.attempt(a, P, O)(d);
  }
  function O(d) {
    return n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), b;
  }
  function b(d) {
    return i > 0 && F(d) ? v(n, k, "linePrefix", i + 1)(d) : k(d);
  }
  function k(d) {
    return d === null || w(d) ? n.check(re, C, P)(d) : (n.enter("codeFlowValue"), y(d));
  }
  function y(d) {
    return d === null || w(d) ? (n.exit("codeFlowValue"), k(d)) : (n.consume(d), y);
  }
  function P(d) {
    return n.exit("codeFenced"), t(d);
  }
  function A(d, z, M) {
    let _ = 0;
    return B;
    function B(R) {
      return d.enter("lineEnding"), d.consume(R), d.exit("lineEnding"), T;
    }
    function T(R) {
      return d.enter("codeFencedFence"), F(R) ? v(d, S, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(R) : S(R);
    }
    function S(R) {
      return R === l ? (d.enter("codeFencedFenceSequence"), D(R)) : M(R);
    }
    function D(R) {
      return R === l ? (_++, d.consume(R), D) : _ >= u ? (d.exit("codeFencedFenceSequence"), F(R) ? v(d, j, "whitespace")(R) : j(R)) : M(R);
    }
    function j(R) {
      return R === null || w(R) ? (d.exit("codeFencedFence"), z(R)) : M(R);
    }
  }
}
function Qr(n, t, e) {
  const r = this;
  return a;
  function a(u) {
    return u === null ? e(u) : (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), i);
  }
  function i(u) {
    return r.parser.lazy[r.now().line] ? e(u) : t(u);
  }
}
const wn = {
  name: "codeIndented",
  tokenize: Kr
}, Xr = {
  partial: !0,
  tokenize: Jr
};
function Kr(n, t, e) {
  const r = this;
  return a;
  function a(h) {
    return n.enter("codeIndented"), v(n, i, "linePrefix", 5)(h);
  }
  function i(h) {
    const m = r.events[r.events.length - 1];
    return m && m[1].type === "linePrefix" && m[2].sliceSerialize(m[1], !0).length >= 4 ? u(h) : e(h);
  }
  function u(h) {
    return h === null ? g(h) : w(h) ? n.attempt(Xr, u, g)(h) : (n.enter("codeFlowValue"), l(h));
  }
  function l(h) {
    return h === null || w(h) ? (n.exit("codeFlowValue"), u(h)) : (n.consume(h), l);
  }
  function g(h) {
    return n.exit("codeIndented"), t(h);
  }
}
function Jr(n, t, e) {
  const r = this;
  return a;
  function a(u) {
    return r.parser.lazy[r.now().line] ? e(u) : w(u) ? (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), a) : v(n, i, "linePrefix", 5)(u);
  }
  function i(u) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(u) : w(u) ? a(u) : e(u);
  }
}
const ni = {
  name: "codeText",
  previous: ti,
  resolve: ei,
  tokenize: ri
};
function ei(n) {
  let t = n.length - 4, e = 3, r, a;
  if ((n[e][1].type === "lineEnding" || n[e][1].type === "space") && (n[t][1].type === "lineEnding" || n[t][1].type === "space")) {
    for (r = e; ++r < t; )
      if (n[r][1].type === "codeTextData") {
        n[e][1].type = "codeTextPadding", n[t][1].type = "codeTextPadding", e += 2, t -= 2;
        break;
      }
  }
  for (r = e - 1, t++; ++r <= t; )
    a === void 0 ? r !== t && n[r][1].type !== "lineEnding" && (a = r) : (r === t || n[r][1].type === "lineEnding") && (n[a][1].type = "codeTextData", r !== a + 2 && (n[a][1].end = n[r - 1][1].end, n.splice(a + 2, r - a - 2), t -= r - a - 2, r = a + 2), a = void 0);
  return n;
}
function ti(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function ri(n, t, e) {
  let r = 0, a, i;
  return u;
  function u(p) {
    return n.enter("codeText"), n.enter("codeTextSequence"), l(p);
  }
  function l(p) {
    return p === 96 ? (n.consume(p), r++, l) : (n.exit("codeTextSequence"), g(p));
  }
  function g(p) {
    return p === null ? e(p) : p === 32 ? (n.enter("space"), n.consume(p), n.exit("space"), g) : p === 96 ? (i = n.enter("codeTextSequence"), a = 0, m(p)) : w(p) ? (n.enter("lineEnding"), n.consume(p), n.exit("lineEnding"), g) : (n.enter("codeTextData"), h(p));
  }
  function h(p) {
    return p === null || p === 32 || p === 96 || w(p) ? (n.exit("codeTextData"), g(p)) : (n.consume(p), h);
  }
  function m(p) {
    return p === 96 ? (n.consume(p), a++, m) : a === r ? (n.exit("codeTextSequence"), n.exit("codeText"), t(p)) : (i.type = "codeTextData", h(p));
  }
}
class ii {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
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
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
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
  slice(t, e) {
    const r = e ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
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
  splice(t, e, r) {
    const a = e || 0;
    this.setCursor(Math.trunc(t));
    const i = this.right.splice(this.right.length - a, Number.POSITIVE_INFINITY);
    return r && xn(this.left, r), i.reverse();
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
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
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
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), xn(this.left, t);
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
  unshift(t) {
    this.setCursor(0), this.right.push(t);
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
  unshiftMany(t) {
    this.setCursor(0), xn(this.right, t.reverse());
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
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const e = this.left.splice(t, Number.POSITIVE_INFINITY);
        xn(this.right, e.reverse());
      } else {
        const e = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        xn(this.left, e.reverse());
      }
  }
}
function xn(n, t) {
  let e = 0;
  if (t.length < 1e4)
    n.push(...t);
  else
    for (; e < t.length; )
      n.push(...t.slice(e, e + 1e4)), e += 1e4;
}
function Ee(n) {
  const t = {};
  let e = -1, r, a, i, u, l, g, h;
  const m = new ii(n);
  for (; ++e < m.length; ) {
    for (; e in t; )
      e = t[e];
    if (r = m.get(e), e && r[1].type === "chunkFlow" && m.get(e - 1)[1].type === "listItemPrefix" && (g = r[1]._tokenizer.events, i = 0, i < g.length && g[i][1].type === "lineEndingBlank" && (i += 2), i < g.length && g[i][1].type === "content"))
      for (; ++i < g.length && g[i][1].type !== "content"; )
        g[i][1].type === "chunkText" && (g[i][1]._isInFirstContentOfListItem = !0, i++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ai(m, e)), e = t[e], h = !0);
    else if (r[1]._container) {
      for (i = e, a = void 0; i--; )
        if (u = m.get(i), u[1].type === "lineEnding" || u[1].type === "lineEndingBlank")
          u[0] === "enter" && (a && (m.get(a)[1].type = "lineEndingBlank"), u[1].type = "lineEnding", a = i);
        else if (!(u[1].type === "linePrefix" || u[1].type === "listItemIndent")) break;
      a && (r[1].end = {
        ...m.get(a)[1].start
      }, l = m.slice(a, e), l.unshift(r), m.splice(a, e - a + 1, l));
    }
  }
  return tn(n, 0, Number.POSITIVE_INFINITY, m.slice(0)), !h;
}
function ai(n, t) {
  const e = n.get(t)[1], r = n.get(t)[2];
  let a = t - 1;
  const i = [];
  let u = e._tokenizer;
  u || (u = r.parser[e.contentType](e.start), e._contentTypeTextTrailing && (u._contentTypeTextTrailing = !0));
  const l = u.events, g = [], h = {};
  let m, p, f = -1, c = e, E = 0, C = 0;
  const O = [C];
  for (; c; ) {
    for (; n.get(++a)[1] !== c; )
      ;
    i.push(a), c._tokenizer || (m = r.sliceStream(c), c.next || m.push(null), p && u.defineSkip(c.start), c._isInFirstContentOfListItem && (u._gfmTasklistFirstContentOfListItem = !0), u.write(m), c._isInFirstContentOfListItem && (u._gfmTasklistFirstContentOfListItem = void 0)), p = c, c = c.next;
  }
  for (c = e; ++f < l.length; )
    // Find a void token that includes a break.
    l[f][0] === "exit" && l[f - 1][0] === "enter" && l[f][1].type === l[f - 1][1].type && l[f][1].start.line !== l[f][1].end.line && (C = f + 1, O.push(C), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (u.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : O.pop(), f = O.length; f--; ) {
    const b = l.slice(O[f], O[f + 1]), k = i.pop();
    g.push([k, k + b.length - 1]), n.splice(k, 2, b);
  }
  for (g.reverse(), f = -1; ++f < g.length; )
    h[E + g[f][0]] = E + g[f][1], E += g[f][1] - g[f][0] - 1;
  return h;
}
const ui = {
  resolve: si,
  tokenize: oi
}, li = {
  partial: !0,
  tokenize: ci
};
function si(n) {
  return Ee(n), n;
}
function oi(n, t) {
  let e;
  return r;
  function r(l) {
    return n.enter("content"), e = n.enter("chunkContent", {
      contentType: "content"
    }), a(l);
  }
  function a(l) {
    return l === null ? i(l) : w(l) ? n.check(li, u, i)(l) : (n.consume(l), a);
  }
  function i(l) {
    return n.exit("chunkContent"), n.exit("content"), t(l);
  }
  function u(l) {
    return n.consume(l), n.exit("chunkContent"), e.next = n.enter("chunkContent", {
      contentType: "content",
      previous: e
    }), e = e.next, a;
  }
}
function ci(n, t, e) {
  const r = this;
  return a;
  function a(u) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), v(n, i, "linePrefix");
  }
  function i(u) {
    if (u === null || w(u))
      return e(u);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(u) : n.interrupt(r.parser.constructs.flow, e, t)(u);
  }
}
function ye(n, t, e, r, a, i, u, l, g) {
  const h = g || Number.POSITIVE_INFINITY;
  let m = 0;
  return p;
  function p(b) {
    return b === 60 ? (n.enter(r), n.enter(a), n.enter(i), n.consume(b), n.exit(i), f) : b === null || b === 32 || b === 41 || Rn(b) ? e(b) : (n.enter(r), n.enter(u), n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), C(b));
  }
  function f(b) {
    return b === 62 ? (n.enter(i), n.consume(b), n.exit(i), n.exit(a), n.exit(r), t) : (n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), c(b));
  }
  function c(b) {
    return b === 62 ? (n.exit("chunkString"), n.exit(l), f(b)) : b === null || b === 60 || w(b) ? e(b) : (n.consume(b), b === 92 ? E : c);
  }
  function E(b) {
    return b === 60 || b === 62 || b === 92 ? (n.consume(b), c) : c(b);
  }
  function C(b) {
    return !m && (b === null || b === 41 || Y(b)) ? (n.exit("chunkString"), n.exit(l), n.exit(u), n.exit(r), t(b)) : m < h && b === 40 ? (n.consume(b), m++, C) : b === 41 ? (n.consume(b), m--, C) : b === null || b === 32 || b === 40 || Rn(b) ? e(b) : (n.consume(b), b === 92 ? O : C);
  }
  function O(b) {
    return b === 40 || b === 41 || b === 92 ? (n.consume(b), C) : C(b);
  }
}
function ke(n, t, e, r, a, i) {
  const u = this;
  let l = 0, g;
  return h;
  function h(c) {
    return n.enter(r), n.enter(a), n.consume(c), n.exit(a), n.enter(i), m;
  }
  function m(c) {
    return l > 999 || c === null || c === 91 || c === 93 && !g || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !l && "_hiddenFootnoteSupport" in u.parser.constructs ? e(c) : c === 93 ? (n.exit(i), n.enter(a), n.consume(c), n.exit(a), n.exit(r), t) : w(c) ? (n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), m) : (n.enter("chunkString", {
      contentType: "string"
    }), p(c));
  }
  function p(c) {
    return c === null || c === 91 || c === 93 || w(c) || l++ > 999 ? (n.exit("chunkString"), m(c)) : (n.consume(c), g || (g = !F(c)), c === 92 ? f : p);
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (n.consume(c), l++, p) : p(c);
  }
}
function Ie(n, t, e, r, a, i) {
  let u;
  return l;
  function l(f) {
    return f === 34 || f === 39 || f === 40 ? (n.enter(r), n.enter(a), n.consume(f), n.exit(a), u = f === 40 ? 41 : f, g) : e(f);
  }
  function g(f) {
    return f === u ? (n.enter(a), n.consume(f), n.exit(a), n.exit(r), t) : (n.enter(i), h(f));
  }
  function h(f) {
    return f === u ? (n.exit(i), g(u)) : f === null ? e(f) : w(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), v(n, h, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), m(f));
  }
  function m(f) {
    return f === u || f === null || w(f) ? (n.exit("chunkString"), h(f)) : (n.consume(f), f === 92 ? p : m);
  }
  function p(f) {
    return f === u || f === 92 ? (n.consume(f), m) : m(f);
  }
}
function bn(n, t) {
  let e;
  return r;
  function r(a) {
    return w(a) ? (n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), e = !0, r) : F(a) ? v(n, r, e ? "linePrefix" : "lineSuffix")(a) : t(a);
  }
}
const hi = {
  name: "definition",
  tokenize: pi
}, mi = {
  partial: !0,
  tokenize: gi
};
function pi(n, t, e) {
  const r = this;
  let a;
  return i;
  function i(c) {
    return n.enter("definition"), u(c);
  }
  function u(c) {
    return ke.call(
      r,
      n,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      e,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function l(c) {
    return a = En(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), c === 58 ? (n.enter("definitionMarker"), n.consume(c), n.exit("definitionMarker"), g) : e(c);
  }
  function g(c) {
    return Y(c) ? bn(n, h)(c) : h(c);
  }
  function h(c) {
    return ye(
      n,
      m,
      // Note: we don’t need to reset the way `markdown-rs` does.
      e,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(c);
  }
  function m(c) {
    return n.attempt(mi, p, p)(c);
  }
  function p(c) {
    return F(c) ? v(n, f, "whitespace")(c) : f(c);
  }
  function f(c) {
    return c === null || w(c) ? (n.exit("definition"), r.parser.defined.push(a), t(c)) : e(c);
  }
}
function gi(n, t, e) {
  return r;
  function r(l) {
    return Y(l) ? bn(n, a)(l) : e(l);
  }
  function a(l) {
    return Ie(n, i, e, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function i(l) {
    return F(l) ? v(n, u, "whitespace")(l) : u(l);
  }
  function u(l) {
    return l === null || w(l) ? t(l) : e(l);
  }
}
const fi = {
  name: "hardBreakEscape",
  tokenize: di
};
function di(n, t, e) {
  return r;
  function r(i) {
    return n.enter("hardBreakEscape"), n.consume(i), a;
  }
  function a(i) {
    return w(i) ? (n.exit("hardBreakEscape"), t(i)) : e(i);
  }
}
const xi = {
  name: "headingAtx",
  resolve: bi,
  tokenize: Ei
};
function bi(n, t) {
  let e = n.length - 2, r = 3, a, i;
  return n[r][1].type === "whitespace" && (r += 2), e - 2 > r && n[e][1].type === "whitespace" && (e -= 2), n[e][1].type === "atxHeadingSequence" && (r === e - 1 || e - 4 > r && n[e - 2][1].type === "whitespace") && (e -= r + 1 === e ? 2 : 4), e > r && (a = {
    type: "atxHeadingText",
    start: n[r][1].start,
    end: n[e][1].end
  }, i = {
    type: "chunkText",
    start: n[r][1].start,
    end: n[e][1].end,
    contentType: "text"
  }, tn(n, r, e - r + 1, [["enter", a, t], ["enter", i, t], ["exit", i, t], ["exit", a, t]])), n;
}
function Ei(n, t, e) {
  let r = 0;
  return a;
  function a(m) {
    return n.enter("atxHeading"), i(m);
  }
  function i(m) {
    return n.enter("atxHeadingSequence"), u(m);
  }
  function u(m) {
    return m === 35 && r++ < 6 ? (n.consume(m), u) : m === null || Y(m) ? (n.exit("atxHeadingSequence"), l(m)) : e(m);
  }
  function l(m) {
    return m === 35 ? (n.enter("atxHeadingSequence"), g(m)) : m === null || w(m) ? (n.exit("atxHeading"), t(m)) : F(m) ? v(n, l, "whitespace")(m) : (n.enter("atxHeadingText"), h(m));
  }
  function g(m) {
    return m === 35 ? (n.consume(m), g) : (n.exit("atxHeadingSequence"), l(m));
  }
  function h(m) {
    return m === null || m === 35 || Y(m) ? (n.exit("atxHeadingText"), l(m)) : (n.consume(m), h);
  }
}
const yi = [
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
], ae = ["pre", "script", "style", "textarea"], ki = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Ti,
  tokenize: Ci
}, Ii = {
  partial: !0,
  tokenize: Ai
}, Si = {
  partial: !0,
  tokenize: wi
};
function Ti(n) {
  let t = n.length;
  for (; t-- && !(n[t][0] === "enter" && n[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && n[t - 2][1].type === "linePrefix" && (n[t][1].start = n[t - 2][1].start, n[t + 1][1].start = n[t - 2][1].start, n.splice(t - 2, 2)), n;
}
function Ci(n, t, e) {
  const r = this;
  let a, i, u, l, g;
  return h;
  function h(o) {
    return m(o);
  }
  function m(o) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(o), p;
  }
  function p(o) {
    return o === 33 ? (n.consume(o), f) : o === 47 ? (n.consume(o), i = !0, C) : o === 63 ? (n.consume(o), a = 3, r.interrupt ? t : s) : en(o) ? (n.consume(o), u = String.fromCharCode(o), O) : e(o);
  }
  function f(o) {
    return o === 45 ? (n.consume(o), a = 2, c) : o === 91 ? (n.consume(o), a = 5, l = 0, E) : en(o) ? (n.consume(o), a = 4, r.interrupt ? t : s) : e(o);
  }
  function c(o) {
    return o === 45 ? (n.consume(o), r.interrupt ? t : s) : e(o);
  }
  function E(o) {
    const X = "CDATA[";
    return o === X.charCodeAt(l++) ? (n.consume(o), l === X.length ? r.interrupt ? t : S : E) : e(o);
  }
  function C(o) {
    return en(o) ? (n.consume(o), u = String.fromCharCode(o), O) : e(o);
  }
  function O(o) {
    if (o === null || o === 47 || o === 62 || Y(o)) {
      const X = o === 47, mn = u.toLowerCase();
      return !X && !i && ae.includes(mn) ? (a = 1, r.interrupt ? t(o) : S(o)) : yi.includes(u.toLowerCase()) ? (a = 6, X ? (n.consume(o), b) : r.interrupt ? t(o) : S(o)) : (a = 7, r.interrupt && !r.parser.lazy[r.now().line] ? e(o) : i ? k(o) : y(o));
    }
    return o === 45 || W(o) ? (n.consume(o), u += String.fromCharCode(o), O) : e(o);
  }
  function b(o) {
    return o === 62 ? (n.consume(o), r.interrupt ? t : S) : e(o);
  }
  function k(o) {
    return F(o) ? (n.consume(o), k) : B(o);
  }
  function y(o) {
    return o === 47 ? (n.consume(o), B) : o === 58 || o === 95 || en(o) ? (n.consume(o), P) : F(o) ? (n.consume(o), y) : B(o);
  }
  function P(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || W(o) ? (n.consume(o), P) : A(o);
  }
  function A(o) {
    return o === 61 ? (n.consume(o), d) : F(o) ? (n.consume(o), A) : y(o);
  }
  function d(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96 ? e(o) : o === 34 || o === 39 ? (n.consume(o), g = o, z) : F(o) ? (n.consume(o), d) : M(o);
  }
  function z(o) {
    return o === g ? (n.consume(o), g = null, _) : o === null || w(o) ? e(o) : (n.consume(o), z);
  }
  function M(o) {
    return o === null || o === 34 || o === 39 || o === 47 || o === 60 || o === 61 || o === 62 || o === 96 || Y(o) ? A(o) : (n.consume(o), M);
  }
  function _(o) {
    return o === 47 || o === 62 || F(o) ? y(o) : e(o);
  }
  function B(o) {
    return o === 62 ? (n.consume(o), T) : e(o);
  }
  function T(o) {
    return o === null || w(o) ? S(o) : F(o) ? (n.consume(o), T) : e(o);
  }
  function S(o) {
    return o === 45 && a === 2 ? (n.consume(o), $) : o === 60 && a === 1 ? (n.consume(o), U) : o === 62 && a === 4 ? (n.consume(o), Q) : o === 63 && a === 3 ? (n.consume(o), s) : o === 93 && a === 5 ? (n.consume(o), rn) : w(o) && (a === 6 || a === 7) ? (n.exit("htmlFlowData"), n.check(Ii, an, D)(o)) : o === null || w(o) ? (n.exit("htmlFlowData"), D(o)) : (n.consume(o), S);
  }
  function D(o) {
    return n.check(Si, j, an)(o);
  }
  function j(o) {
    return n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), R;
  }
  function R(o) {
    return o === null || w(o) ? D(o) : (n.enter("htmlFlowData"), S(o));
  }
  function $(o) {
    return o === 45 ? (n.consume(o), s) : S(o);
  }
  function U(o) {
    return o === 47 ? (n.consume(o), u = "", Z) : S(o);
  }
  function Z(o) {
    if (o === 62) {
      const X = u.toLowerCase();
      return ae.includes(X) ? (n.consume(o), Q) : S(o);
    }
    return en(o) && u.length < 8 ? (n.consume(o), u += String.fromCharCode(o), Z) : S(o);
  }
  function rn(o) {
    return o === 93 ? (n.consume(o), s) : S(o);
  }
  function s(o) {
    return o === 62 ? (n.consume(o), Q) : o === 45 && a === 2 ? (n.consume(o), s) : S(o);
  }
  function Q(o) {
    return o === null || w(o) ? (n.exit("htmlFlowData"), an(o)) : (n.consume(o), Q);
  }
  function an(o) {
    return n.exit("htmlFlow"), t(o);
  }
}
function wi(n, t, e) {
  const r = this;
  return a;
  function a(u) {
    return w(u) ? (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), i) : e(u);
  }
  function i(u) {
    return r.parser.lazy[r.now().line] ? e(u) : t(u);
  }
}
function Ai(n, t, e) {
  return r;
  function r(a) {
    return n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), n.attempt(Tn, t, e);
  }
}
const Ni = {
  name: "htmlText",
  tokenize: Li
};
function Li(n, t, e) {
  const r = this;
  let a, i, u;
  return l;
  function l(s) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(s), g;
  }
  function g(s) {
    return s === 33 ? (n.consume(s), h) : s === 47 ? (n.consume(s), A) : s === 63 ? (n.consume(s), y) : en(s) ? (n.consume(s), M) : e(s);
  }
  function h(s) {
    return s === 45 ? (n.consume(s), m) : s === 91 ? (n.consume(s), i = 0, E) : en(s) ? (n.consume(s), k) : e(s);
  }
  function m(s) {
    return s === 45 ? (n.consume(s), c) : e(s);
  }
  function p(s) {
    return s === null ? e(s) : s === 45 ? (n.consume(s), f) : w(s) ? (u = p, U(s)) : (n.consume(s), p);
  }
  function f(s) {
    return s === 45 ? (n.consume(s), c) : p(s);
  }
  function c(s) {
    return s === 62 ? $(s) : s === 45 ? f(s) : p(s);
  }
  function E(s) {
    const Q = "CDATA[";
    return s === Q.charCodeAt(i++) ? (n.consume(s), i === Q.length ? C : E) : e(s);
  }
  function C(s) {
    return s === null ? e(s) : s === 93 ? (n.consume(s), O) : w(s) ? (u = C, U(s)) : (n.consume(s), C);
  }
  function O(s) {
    return s === 93 ? (n.consume(s), b) : C(s);
  }
  function b(s) {
    return s === 62 ? $(s) : s === 93 ? (n.consume(s), b) : C(s);
  }
  function k(s) {
    return s === null || s === 62 ? $(s) : w(s) ? (u = k, U(s)) : (n.consume(s), k);
  }
  function y(s) {
    return s === null ? e(s) : s === 63 ? (n.consume(s), P) : w(s) ? (u = y, U(s)) : (n.consume(s), y);
  }
  function P(s) {
    return s === 62 ? $(s) : y(s);
  }
  function A(s) {
    return en(s) ? (n.consume(s), d) : e(s);
  }
  function d(s) {
    return s === 45 || W(s) ? (n.consume(s), d) : z(s);
  }
  function z(s) {
    return w(s) ? (u = z, U(s)) : F(s) ? (n.consume(s), z) : $(s);
  }
  function M(s) {
    return s === 45 || W(s) ? (n.consume(s), M) : s === 47 || s === 62 || Y(s) ? _(s) : e(s);
  }
  function _(s) {
    return s === 47 ? (n.consume(s), $) : s === 58 || s === 95 || en(s) ? (n.consume(s), B) : w(s) ? (u = _, U(s)) : F(s) ? (n.consume(s), _) : $(s);
  }
  function B(s) {
    return s === 45 || s === 46 || s === 58 || s === 95 || W(s) ? (n.consume(s), B) : T(s);
  }
  function T(s) {
    return s === 61 ? (n.consume(s), S) : w(s) ? (u = T, U(s)) : F(s) ? (n.consume(s), T) : _(s);
  }
  function S(s) {
    return s === null || s === 60 || s === 61 || s === 62 || s === 96 ? e(s) : s === 34 || s === 39 ? (n.consume(s), a = s, D) : w(s) ? (u = S, U(s)) : F(s) ? (n.consume(s), S) : (n.consume(s), j);
  }
  function D(s) {
    return s === a ? (n.consume(s), a = void 0, R) : s === null ? e(s) : w(s) ? (u = D, U(s)) : (n.consume(s), D);
  }
  function j(s) {
    return s === null || s === 34 || s === 39 || s === 60 || s === 61 || s === 96 ? e(s) : s === 47 || s === 62 || Y(s) ? _(s) : (n.consume(s), j);
  }
  function R(s) {
    return s === 47 || s === 62 || Y(s) ? _(s) : e(s);
  }
  function $(s) {
    return s === 62 ? (n.consume(s), n.exit("htmlTextData"), n.exit("htmlText"), t) : e(s);
  }
  function U(s) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), Z;
  }
  function Z(s) {
    return F(s) ? v(n, rn, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : rn(s);
  }
  function rn(s) {
    return n.enter("htmlTextData"), u(s);
  }
}
const vn = {
  name: "labelEnd",
  resolveAll: zi,
  resolveTo: Pi,
  tokenize: vi
}, Oi = {
  tokenize: Di
}, Ri = {
  tokenize: ji
}, Fi = {
  tokenize: Mi
};
function zi(n) {
  let t = -1;
  const e = [];
  for (; ++t < n.length; ) {
    const r = n[t][1];
    if (e.push(n[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const a = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += a;
    }
  }
  return n.length !== e.length && tn(n, 0, n.length, e), n;
}
function Pi(n, t) {
  let e = n.length, r = 0, a, i, u, l;
  for (; e--; )
    if (a = n[e][1], i) {
      if (a.type === "link" || a.type === "labelLink" && a._inactive)
        break;
      n[e][0] === "enter" && a.type === "labelLink" && (a._inactive = !0);
    } else if (u) {
      if (n[e][0] === "enter" && (a.type === "labelImage" || a.type === "labelLink") && !a._balanced && (i = e, a.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else a.type === "labelEnd" && (u = e);
  const g = {
    type: n[i][1].type === "labelLink" ? "link" : "image",
    start: {
      ...n[i][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  }, h = {
    type: "label",
    start: {
      ...n[i][1].start
    },
    end: {
      ...n[u][1].end
    }
  }, m = {
    type: "labelText",
    start: {
      ...n[i + r + 2][1].end
    },
    end: {
      ...n[u - 2][1].start
    }
  };
  return l = [["enter", g, t], ["enter", h, t]], l = V(l, n.slice(i + 1, i + r + 3)), l = V(l, [["enter", m, t]]), l = V(l, Pn(t.parser.constructs.insideSpan.null, n.slice(i + r + 4, u - 3), t)), l = V(l, [["exit", m, t], n[u - 2], n[u - 1], ["exit", h, t]]), l = V(l, n.slice(u + 1)), l = V(l, [["exit", g, t]]), tn(n, i, n.length, l), n;
}
function vi(n, t, e) {
  const r = this;
  let a = r.events.length, i, u;
  for (; a--; )
    if ((r.events[a][1].type === "labelImage" || r.events[a][1].type === "labelLink") && !r.events[a][1]._balanced) {
      i = r.events[a][1];
      break;
    }
  return l;
  function l(f) {
    return i ? i._inactive ? p(f) : (u = r.parser.defined.includes(En(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(f), n.exit("labelMarker"), n.exit("labelEnd"), g) : e(f);
  }
  function g(f) {
    return f === 40 ? n.attempt(Oi, m, u ? m : p)(f) : f === 91 ? n.attempt(Ri, m, u ? h : p)(f) : u ? m(f) : p(f);
  }
  function h(f) {
    return n.attempt(Fi, m, p)(f);
  }
  function m(f) {
    return t(f);
  }
  function p(f) {
    return i._balanced = !0, e(f);
  }
}
function Di(n, t, e) {
  return r;
  function r(p) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(p), n.exit("resourceMarker"), a;
  }
  function a(p) {
    return Y(p) ? bn(n, i)(p) : i(p);
  }
  function i(p) {
    return p === 41 ? m(p) : ye(n, u, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function u(p) {
    return Y(p) ? bn(n, g)(p) : m(p);
  }
  function l(p) {
    return e(p);
  }
  function g(p) {
    return p === 34 || p === 39 || p === 40 ? Ie(n, h, e, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : m(p);
  }
  function h(p) {
    return Y(p) ? bn(n, m)(p) : m(p);
  }
  function m(p) {
    return p === 41 ? (n.enter("resourceMarker"), n.consume(p), n.exit("resourceMarker"), n.exit("resource"), t) : e(p);
  }
}
function ji(n, t, e) {
  const r = this;
  return a;
  function a(l) {
    return ke.call(r, n, i, u, "reference", "referenceMarker", "referenceString")(l);
  }
  function i(l) {
    return r.parser.defined.includes(En(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(l) : e(l);
  }
  function u(l) {
    return e(l);
  }
}
function Mi(n, t, e) {
  return r;
  function r(i) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), a;
  }
  function a(i) {
    return i === 93 ? (n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), n.exit("reference"), t) : e(i);
  }
}
const _i = {
  name: "labelStartImage",
  resolveAll: vn.resolveAll,
  tokenize: Bi
};
function Bi(n, t, e) {
  const r = this;
  return a;
  function a(l) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(l), n.exit("labelImageMarker"), i;
  }
  function i(l) {
    return l === 91 ? (n.enter("labelMarker"), n.consume(l), n.exit("labelMarker"), n.exit("labelImage"), u) : e(l);
  }
  function u(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? e(l) : t(l);
  }
}
const Ui = {
  name: "labelStartLink",
  resolveAll: vn.resolveAll,
  tokenize: Hi
};
function Hi(n, t, e) {
  const r = this;
  return a;
  function a(u) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(u), n.exit("labelMarker"), n.exit("labelLink"), i;
  }
  function i(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? e(u) : t(u);
  }
}
const An = {
  name: "lineEnding",
  tokenize: $i
};
function $i(n, t) {
  return e;
  function e(r) {
    return n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), v(n, t, "linePrefix");
  }
}
const Sn = {
  name: "thematicBreak",
  tokenize: qi
};
function qi(n, t, e) {
  let r = 0, a;
  return i;
  function i(h) {
    return n.enter("thematicBreak"), u(h);
  }
  function u(h) {
    return a = h, l(h);
  }
  function l(h) {
    return h === a ? (n.enter("thematicBreakSequence"), g(h)) : r >= 3 && (h === null || w(h)) ? (n.exit("thematicBreak"), t(h)) : e(h);
  }
  function g(h) {
    return h === a ? (n.consume(h), r++, g) : (n.exit("thematicBreakSequence"), F(h) ? v(n, l, "whitespace")(h) : l(h));
  }
}
const G = {
  continuation: {
    tokenize: Wi
  },
  exit: Qi,
  name: "list",
  tokenize: Yi
}, Vi = {
  partial: !0,
  tokenize: Xi
}, Gi = {
  partial: !0,
  tokenize: Zi
};
function Yi(n, t, e) {
  const r = this, a = r.events[r.events.length - 1];
  let i = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, u = 0;
  return l;
  function l(c) {
    const E = r.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (E === "listUnordered" ? !r.containerState.marker || c === r.containerState.marker : Fn(c)) {
      if (r.containerState.type || (r.containerState.type = E, n.enter(E, {
        _container: !0
      })), E === "listUnordered")
        return n.enter("listItemPrefix"), c === 42 || c === 45 ? n.check(Sn, e, h)(c) : h(c);
      if (!r.interrupt || c === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), g(c);
    }
    return e(c);
  }
  function g(c) {
    return Fn(c) && ++u < 10 ? (n.consume(c), g) : (!r.interrupt || u < 2) && (r.containerState.marker ? c === r.containerState.marker : c === 41 || c === 46) ? (n.exit("listItemValue"), h(c)) : e(c);
  }
  function h(c) {
    return n.enter("listItemMarker"), n.consume(c), n.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || c, n.check(
      Tn,
      // Can’t be empty when interrupting.
      r.interrupt ? e : m,
      n.attempt(Vi, f, p)
    );
  }
  function m(c) {
    return r.containerState.initialBlankLine = !0, i++, f(c);
  }
  function p(c) {
    return F(c) ? (n.enter("listItemPrefixWhitespace"), n.consume(c), n.exit("listItemPrefixWhitespace"), f) : e(c);
  }
  function f(c) {
    return r.containerState.size = i + r.sliceSerialize(n.exit("listItemPrefix"), !0).length, t(c);
  }
}
function Wi(n, t, e) {
  const r = this;
  return r.containerState._closeFlow = void 0, n.check(Tn, a, i);
  function a(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, v(n, t, "listItemIndent", r.containerState.size + 1)(l);
  }
  function i(l) {
    return r.containerState.furtherBlankLines || !F(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, u(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, n.attempt(Gi, t, u)(l));
  }
  function u(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, v(n, n.attempt(G, t, e), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function Zi(n, t, e) {
  const r = this;
  return v(n, a, "listItemIndent", r.containerState.size + 1);
  function a(i) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "listItemIndent" && u[2].sliceSerialize(u[1], !0).length === r.containerState.size ? t(i) : e(i);
  }
}
function Qi(n) {
  n.exit(this.containerState.type);
}
function Xi(n, t, e) {
  const r = this;
  return v(n, a, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function a(i) {
    const u = r.events[r.events.length - 1];
    return !F(i) && u && u[1].type === "listItemPrefixWhitespace" ? t(i) : e(i);
  }
}
const ue = {
  name: "setextUnderline",
  resolveTo: Ki,
  tokenize: Ji
};
function Ki(n, t) {
  let e = n.length, r, a, i;
  for (; e--; )
    if (n[e][0] === "enter") {
      if (n[e][1].type === "content") {
        r = e;
        break;
      }
      n[e][1].type === "paragraph" && (a = e);
    } else
      n[e][1].type === "content" && n.splice(e, 1), !i && n[e][1].type === "definition" && (i = e);
  const u = {
    type: "setextHeading",
    start: {
      ...n[r][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[a][1].type = "setextHeadingText", i ? (n.splice(a, 0, ["enter", u, t]), n.splice(i + 1, 0, ["exit", n[r][1], t]), n[r][1].end = {
    ...n[i][1].end
  }) : n[r][1] = u, n.push(["exit", u, t]), n;
}
function Ji(n, t, e) {
  const r = this;
  let a;
  return i;
  function i(h) {
    let m = r.events.length, p;
    for (; m--; )
      if (r.events[m][1].type !== "lineEnding" && r.events[m][1].type !== "linePrefix" && r.events[m][1].type !== "content") {
        p = r.events[m][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (n.enter("setextHeadingLine"), a = h, u(h)) : e(h);
  }
  function u(h) {
    return n.enter("setextHeadingLineSequence"), l(h);
  }
  function l(h) {
    return h === a ? (n.consume(h), l) : (n.exit("setextHeadingLineSequence"), F(h) ? v(n, g, "lineSuffix")(h) : g(h));
  }
  function g(h) {
    return h === null || w(h) ? (n.exit("setextHeadingLine"), t(h)) : e(h);
  }
}
const na = {
  tokenize: ea
};
function ea(n) {
  const t = this, e = n.attempt(
    // Try to parse a blank line.
    Tn,
    r,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, a, v(n, n.attempt(this.parser.constructs.flow, a, n.attempt(ui, a)), "linePrefix"))
  );
  return e;
  function r(i) {
    if (i === null) {
      n.consume(i);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(i), n.exit("lineEndingBlank"), t.currentConstruct = void 0, e;
  }
  function a(i) {
    if (i === null) {
      n.consume(i);
      return;
    }
    return n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), t.currentConstruct = void 0, e;
  }
}
const ta = {
  resolveAll: Te()
}, ra = Se("string"), ia = Se("text");
function Se(n) {
  return {
    resolveAll: Te(n === "text" ? aa : void 0),
    tokenize: t
  };
  function t(e) {
    const r = this, a = this.parser.constructs[n], i = e.attempt(a, u, l);
    return u;
    function u(m) {
      return h(m) ? i(m) : l(m);
    }
    function l(m) {
      if (m === null) {
        e.consume(m);
        return;
      }
      return e.enter("data"), e.consume(m), g;
    }
    function g(m) {
      return h(m) ? (e.exit("data"), i(m)) : (e.consume(m), g);
    }
    function h(m) {
      if (m === null)
        return !0;
      const p = a[m];
      let f = -1;
      if (p)
        for (; ++f < p.length; ) {
          const c = p[f];
          if (!c.previous || c.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Te(n) {
  return t;
  function t(e, r) {
    let a = -1, i;
    for (; ++a <= e.length; )
      i === void 0 ? e[a] && e[a][1].type === "data" && (i = a, a++) : (!e[a] || e[a][1].type !== "data") && (a !== i + 2 && (e[i][1].end = e[a - 1][1].end, e.splice(i + 2, a - i - 2), a = i + 2), i = void 0);
    return n ? n(e, r) : e;
  }
}
function aa(n, t) {
  let e = 0;
  for (; ++e <= n.length; )
    if ((e === n.length || n[e][1].type === "lineEnding") && n[e - 1][1].type === "data") {
      const r = n[e - 1][1], a = t.sliceStream(r);
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
      if (t._contentTypeTextTrailing && e === n.length && (l = 0), l) {
        const h = {
          type: e === n.length || g || l < 2 ? "lineSuffix" : "hardBreakTrailing",
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
        }, r.start.offset === r.end.offset ? Object.assign(r, h) : (n.splice(e, 0, ["enter", h, t], ["exit", h, t]), e += 2);
      }
      e++;
    }
  return n;
}
const ua = {
  42: G,
  43: G,
  45: G,
  48: G,
  49: G,
  50: G,
  51: G,
  52: G,
  53: G,
  54: G,
  55: G,
  56: G,
  57: G,
  62: de
}, la = {
  91: hi
}, sa = {
  [-2]: wn,
  [-1]: wn,
  32: wn
}, oa = {
  35: xi,
  42: Sn,
  45: [ue, Sn],
  60: ki,
  61: ue,
  95: Sn,
  96: ie,
  126: ie
}, ca = {
  38: be,
  92: xe
}, ha = {
  [-5]: An,
  [-4]: An,
  [-3]: An,
  33: _i,
  38: be,
  42: zn,
  60: [Ur, Ni],
  91: Ui,
  92: [fi, xe],
  93: vn,
  95: zn,
  96: ni
}, ma = {
  null: [zn, ta]
}, pa = {
  null: [42, 95]
}, ga = {
  null: []
}, fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: pa,
  contentInitial: la,
  disable: ga,
  document: ua,
  flow: oa,
  flowInitial: sa,
  insideSpan: ma,
  string: ca,
  text: ha
}, Symbol.toStringTag, { value: "Module" }));
function da(n, t, e) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: e && e.line || 1,
    column: e && e.column || 1,
    offset: e && e.offset || 0
  };
  const a = {}, i = [];
  let u = [], l = [];
  const g = {
    attempt: z(A),
    check: z(d),
    consume: k,
    enter: y,
    exit: P,
    interrupt: z(d, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: C,
    events: [],
    now: E,
    parser: n,
    previous: null,
    sliceSerialize: f,
    sliceStream: c,
    write: p
  };
  let m = t.tokenize.call(h, g);
  return t.resolveAll && i.push(t), h;
  function p(T) {
    return u = V(u, T), O(), u[u.length - 1] !== null ? [] : (M(t, 0), h.events = Pn(i, h.events, h), h.events);
  }
  function f(T, S) {
    return ba(c(T), S);
  }
  function c(T) {
    return xa(u, T);
  }
  function E() {
    const {
      _bufferIndex: T,
      _index: S,
      line: D,
      column: j,
      offset: R
    } = r;
    return {
      _bufferIndex: T,
      _index: S,
      line: D,
      column: j,
      offset: R
    };
  }
  function C(T) {
    a[T.line] = T.column, B();
  }
  function O() {
    let T;
    for (; r._index < u.length; ) {
      const S = u[r._index];
      if (typeof S == "string")
        for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < S.length; )
          b(S.charCodeAt(r._bufferIndex));
      else
        b(S);
    }
  }
  function b(T) {
    m = m(T);
  }
  function k(T) {
    w(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, B()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    u[r._index].length && (r._bufferIndex = -1, r._index++)), h.previous = T;
  }
  function y(T, S) {
    const D = S || {};
    return D.type = T, D.start = E(), h.events.push(["enter", D, h]), l.push(D), D;
  }
  function P(T) {
    const S = l.pop();
    return S.end = E(), h.events.push(["exit", S, h]), S;
  }
  function A(T, S) {
    M(T, S.from);
  }
  function d(T, S) {
    S.restore();
  }
  function z(T, S) {
    return D;
    function D(j, R, $) {
      let U, Z, rn, s;
      return Array.isArray(j) ? (
        /* c8 ignore next 1 */
        an(j)
      ) : "tokenize" in j ? (
        // Looks like a construct.
        an([
          /** @type {Construct} */
          j
        ])
      ) : Q(j);
      function Q(H) {
        return fn;
        function fn(sn) {
          const pn = sn !== null && H[sn], gn = sn !== null && H.null, Cn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(pn) ? pn : pn ? [pn] : [],
            ...Array.isArray(gn) ? gn : gn ? [gn] : []
          ];
          return an(Cn)(sn);
        }
      }
      function an(H) {
        return U = H, Z = 0, H.length === 0 ? $ : o(H[Z]);
      }
      function o(H) {
        return fn;
        function fn(sn) {
          return s = _(), rn = H, H.partial || (h.currentConstruct = H), H.name && h.parser.constructs.disable.null.includes(H.name) ? mn() : H.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            S ? Object.assign(Object.create(h), S) : h,
            g,
            X,
            mn
          )(sn);
        }
      }
      function X(H) {
        return T(rn, s), R;
      }
      function mn(H) {
        return s.restore(), ++Z < U.length ? o(U[Z]) : $;
      }
    }
  }
  function M(T, S) {
    T.resolveAll && !i.includes(T) && i.push(T), T.resolve && tn(h.events, S, h.events.length - S, T.resolve(h.events.slice(S), h)), T.resolveTo && (h.events = T.resolveTo(h.events, h));
  }
  function _() {
    const T = E(), S = h.previous, D = h.currentConstruct, j = h.events.length, R = Array.from(l);
    return {
      from: j,
      restore: $
    };
    function $() {
      r = T, h.previous = S, h.currentConstruct = D, h.events.length = j, l = R, B();
    }
  }
  function B() {
    r.line in a && r.column < 2 && (r.column = a[r.line], r.offset += a[r.line] - 1);
  }
}
function xa(n, t) {
  const e = t.start._index, r = t.start._bufferIndex, a = t.end._index, i = t.end._bufferIndex;
  let u;
  if (e === a)
    u = [n[e].slice(r, i)];
  else {
    if (u = n.slice(e, a), r > -1) {
      const l = u[0];
      typeof l == "string" ? u[0] = l.slice(r) : u.shift();
    }
    i > 0 && u.push(n[a].slice(0, i));
  }
  return u;
}
function ba(n, t) {
  let e = -1;
  const r = [];
  let a;
  for (; ++e < n.length; ) {
    const i = n[e];
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
        u = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && a) continue;
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
function Ea(n) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Er([fa, ...(n || {}).extensions || []])
    ),
    content: a(Pr),
    defined: [],
    document: a(Dr),
    flow: a(na),
    lazy: {},
    string: a(ra),
    text: a(ia)
  };
  return r;
  function a(i) {
    return u;
    function u(l) {
      return da(r, i, l);
    }
  }
}
function ya(n) {
  for (; !Ee(n); )
    ;
  return n;
}
const le = /[\0\t\n\r]/g;
function ka() {
  let n = 1, t = "", e = !0, r;
  return a;
  function a(i, u, l) {
    const g = [];
    let h, m, p, f, c;
    for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(u || void 0).decode(i)), p = 0, t = "", e && (i.charCodeAt(0) === 65279 && p++, e = void 0); p < i.length; ) {
      if (le.lastIndex = p, h = le.exec(i), f = h && h.index !== void 0 ? h.index : i.length, c = i.charCodeAt(f), !h) {
        t = i.slice(p);
        break;
      }
      if (c === 10 && p === f && r)
        g.push(-3), r = void 0;
      else
        switch (r && (g.push(-5), r = void 0), p < f && (g.push(i.slice(p, f)), n += f - p), c) {
          case 0: {
            g.push(65533), n++;
            break;
          }
          case 9: {
            for (m = Math.ceil(n / 4) * 4, g.push(-2); n++ < m; ) g.push(-1);
            break;
          }
          case 10: {
            g.push(-4), n = 1;
            break;
          }
          default:
            r = !0, n = 1;
        }
      p = f + 1;
    }
    return l && (r && g.push(-5), t && g.push(t), g.push(null)), g;
  }
}
function Ia(n, t, e) {
  return typeof t != "string" && (e = t, t = void 0), zr(e)(ya(Ea(e).document().write(ka()(n, t, !0))));
}
const Sa = "[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}[class*=shj-lang-]{color:#c9d1d9;background:#161b22}[class*=shj-lang-]:before{color:#6f9aff}.shj-syn-insert{color:#98c379}.shj-syn-deleted,.shj-syn-err,.shj-syn-kwd{color:#ff7b72}.shj-syn-class{color:#ffa657}.shj-numbers,.shj-syn-cmnt{color:#8b949e}.shj-syn-type,.shj-syn-oper,.shj-syn-num,.shj-syn-section,.shj-syn-var,.shj-syn-bool{color:#79c0ff}.shj-syn-str{color:#a5d6ff}.shj-syn-func{color:#d2a8ff}";
var Ta = Object.defineProperty, Ca = (n) => (t) => {
  var e = n[t];
  if (e) return e();
  throw new Error("Module not found in bundle: " + t);
}, N = (n, t) => () => (n && (t = n(n = 0)), t), L = (n, t) => {
  for (var e in t) Ta(n, e, { get: t[e], enumerable: !0 });
}, Ce = {};
L(Ce, { default: () => we });
var we, wa = N(() => {
  we = [{ type: "cmnt", match: /(;|#).*/gm }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\$[\da-fA-F]*\b/g }, { type: "kwd", match: /^[a-z]+\s+[a-z.]+\b/gm, sub: [{ type: "func", match: /^[a-z]+/g }] }, { type: "kwd", match: /^\t*[a-z][a-z\d]*\b/gm }, { match: /%|\$/g, type: "oper" }];
}), Ae = {};
L(Ae, { default: () => Dn });
var Nn, Dn, Ne = N(() => {
  Nn = { type: "var", match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g }, Dn = [{ sub: "todo", match: /#.*/g }, { type: "str", match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g, sub: [Nn] }, { type: "oper", match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi }, { type: "kwd", match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g }, { expand: "num" }, { type: "func", match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gmi }, { type: "bool", match: /(?<=\s|^)(true|false)(?=\s|$)/g }, { type: "oper", match: /[=(){}<>!]+/g }, { type: "var", match: /(?<=\s|^)[\w_]+(?=\s*=)/g }, Nn];
}), Le = {};
L(Le, { default: () => Oe });
var Oe, Aa = N(() => {
  Oe = [{ match: /[^\[\->+.<\]\s].*/g, sub: "todo" }, { type: "func", match: /\.+/g }, { type: "kwd", match: /[<>]+/g }, { type: "oper", match: /[+-]+/g }];
}), Re = {};
L(Re, { default: () => Fe });
var Fe, Na = N(() => {
  Fe = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /#\s*include (<.*>|".*")/g, sub: [{ type: "str", match: /(<|").*/g }] }, { match: /asm\s*{[^}]*}/g, sub: [{ type: "kwd", match: /^asm/g }, { match: /[^{}]*(?=}$)/g, sub: "asm" }] }, { type: "kwd", match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), ze = {};
L(ze, { default: () => Pe });
var Pe, La = N(() => {
  Pe = [{ match: /\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g }, { type: "var", match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g }, { type: "func", match: /#[\w-]+(?=[^{}]*{)/g }, { type: "num", match: /#[\da-f]{3,8}/g }, { type: "num", match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g, sub: [{ type: "var", match: /[a-z]+|%/g }] }, { match: /url\([^)]*\)/g, sub: [{ type: "func", match: /url(?=\()/g }, { type: "str", match: /[^()]+/g }] }, { type: "func", match: /\b[a-zA-Z]\w*(?=\s*\()/g }, { type: "num", match: /\b[a-z-]+\b/g }];
}), ve = {};
L(ve, { default: () => De });
var De, Oa = N(() => {
  De = [{ expand: "strDouble" }, { type: "oper", match: /,/g }];
}), je = {};
L(je, { default: () => jn });
var jn, Me = N(() => {
  jn = [{ type: "deleted", match: /^[-<].*/gm }, { type: "insert", match: /^[+>].*/gm }, { type: "kwd", match: /!.*/gm }, { type: "section", match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm }];
}), _e = {};
L(_e, { default: () => Be });
var Be, Ra = N(() => {
  Ne(), Be = [{ type: "kwd", match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gmi }, ...Dn];
}), Ue = {};
L(Ue, { default: () => He });
var He, Fa = N(() => {
  Me(), He = [{ match: /^#.*/gm, sub: "todo" }, { expand: "str" }, ...jn, { type: "func", match: /^(\$ )?git(\s.*)?$/gm }, { type: "kwd", match: /^commit \w+$/gm }];
}), $e = {};
L($e, { default: () => qe });
var qe, za = N(() => {
  qe = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "oper", match: /[+\-*\/%&|^~=!<>.^-]+/g }];
}), Ve = {};
L(Ve, { default: () => Mn, name: () => on, properties: () => hn, xmlElement: () => ln });
var Ln, se, on, hn, ln, Mn, Ge = N(() => {
  Ln = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", se = Ln + "\\-\\.0-9·̀-ͯ‿-⁀", on = `[${Ln}][${se}]*`, hn = `\\s*(\\s+${on}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`, ln = { match: RegExp(`<[/!?]?${on}${hn}[/!?]?>`, "g"), sub: [{ type: "var", match: RegExp(`^<[/!?]?${on}`, "g"), sub: [{ type: "oper", match: /^<[\/!?]?/g }] }, { type: "str", match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g, sub: [{ type: "oper", match: /^=/g }] }, { type: "oper", match: /[\/!?]?>/g }, { type: "class", match: RegExp(on, "g") }] }, Mn = [{ match: /<!--((?!-->)[^])*-->/g, sub: "todo" }, { type: "class", match: /<!\[CDATA\[[\s\S]*?\]\]>/gi }, ln, { type: "str", match: RegExp(`<\\?${on}([^?]|\\?[^?>])*\\?+>`, "g"), sub: [{ type: "var", match: RegExp(`^<\\?${on}`, "g"), sub: [{ type: "oper", match: /^<\?/g }] }, { type: "oper", match: /\?+>$/g }] }, { type: "var", match: /&(#x?)?[\da-z]{1,8};/gi }];
}), Ye = {};
L(Ye, { default: () => We });
var We, Pa = N(() => {
  Ge(), We = [{ type: "class", match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi, sub: [{ type: "str", match: /"[^"]*"|'[^']*'/g }, { type: "oper", match: /^<!|>$/g }, { type: "var", match: /DOCTYPE/gi }] }, { match: RegExp(`<style${hn}>((?!</style>)[^])*</style\\s*>`, "g"), sub: [{ match: RegExp(`^<style${hn}>`, "g"), sub: ln.sub }, { match: RegExp(`${ln.match}|[^]*(?=</style\\s*>$)`, "g"), sub: "css" }, ln] }, { match: RegExp(`<script${hn}>((?!<\/script>)[^])*<\/script\\s*>`, "g"), sub: [{ match: RegExp(`^<script${hn}>`, "g"), sub: ln.sub }, { match: RegExp(`${ln.match}|[^]*(?=<\/script\\s*>$)`, "g"), sub: "js" }, ln] }, ...Mn];
}), oe, yn, _n = N(() => {
  oe = [["bash", [/#!(\/usr)?\/bin\/bash/g, 500], [/\b(if|elif|then|fi|echo)\b|\$/g, 10]], ["html", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^\s+<!DOCTYPE\s+html/g, 500]], ["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]], ["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g, 10]], ["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|implements|interface|namespace)\b/g, 10]], ["py", [/\b(def|print|class|and|or|lambda)\b/g, 10]], ["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]], ["pl", [/#!(\/usr)?\/bin\/perl/g, 500], [/\b(use|print)\b|\$/g, 10]], ["lua", [/#!(\/usr)?\/bin\/lua/g, 500]], ["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]], ["uri", [/https?:|mailto:|tel:|ftp:/g, 30]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["diff", [/^[+><-]/gm, 10], [/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]], ["md", [/^(>|\t\*|\t\d+.)/gm, 10], [/\[.*\](.*)/g, 10]], ["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]], ["xml", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^<\?xml/g, 500]], ["c", [/#include\b|\bprintf\s+\(/g, 100]], ["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]], ["go", [/\b(func|fmt|package)\b/g, 100]], ["java", [/^import\s+java/gm, 500]], ["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]], ["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gmi, 10]]], yn = (n) => oe.map(([t, ...e]) => [t, e.reduce((r, [a, i]) => r + [...n.matchAll(a)].length * i, 0)]).filter(([t, e]) => e > 20).sort((t, e) => e[1] - t[1])[0]?.[0] || "plain";
}), Ze = {};
L(Ze, { default: () => Qe });
var Qe, va = N(() => {
  _n(), Qe = [{ type: "kwd", match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm }, { expand: "str" }, { type: "section", match: /\bHTTP\/[\d.]+\b/g }, { expand: "num" }, { type: "oper", match: /[,;:=]/g }, { type: "var", match: /[a-zA-Z][\w-]*(?=:)/g }, { match: /\n\n[^]*/g, sub: yn }];
}), Xe = {};
L(Xe, { default: () => Ke });
var Ke, Da = N(() => {
  Ke = [{ match: /(^[ \f\t\v]*)[#;].*/gm, sub: "todo" }, { type: "str", match: /.*/g }, { type: "var", match: /.*(?==)/g }, { type: "section", match: /^\s*\[.+\]\s*$/gm }, { type: "oper", match: /=/g }];
}), Je = {};
L(Je, { default: () => nt });
var nt, ja = N(() => {
  nt = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), et = {};
L(et, { default: () => Bn });
var Bn, tt = N(() => {
  Bn = [{ match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g, sub: "jsdoc" }, { match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { match: /`((?!`)[^]|\\[^])*`?/g, sub: "js_template_literals" }, { type: "kwd", match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g }, { match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g, sub: "regex" }, { expand: "num" }, { type: "num", match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g }];
}), rt = {};
L(rt, { default: () => it, type: () => at });
var it, at, Ma = N(() => {
  it = [{ match: new class {
    exec(n) {
      let t = this.lastIndex, e, r = (a) => {
        for (; ++t < n.length - 2; ) if (n[t] == "{") r();
        else if (n[t] == "}") return;
      };
      for (; t < n.length; ++t) if (n[t - 1] != "\\" && n[t] == "$" && n[t + 1] == "{") return e = t++, r(), this.lastIndex = t + 1, { index: e, 0: n.slice(e, t + 1) };
      return null;
    }
  }(), sub: [{ type: "kwd", match: /^\${|}$/g }, { match: /(?!^\$|{)[^]+(?=}$)/g, sub: "js" }] }], at = "str";
}), ut = {};
L(ut, { default: () => Un, type: () => lt });
var Un, lt, st = N(() => {
  Un = [{ type: "err", match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g }, { type: "class", match: /\bIDEA\b/g }, { type: "insert", match: /\b(CHANGED|FIX|CHANGE)\b/g }, { type: "oper", match: /\bQUESTION\b/g }], lt = "cmnt";
}), ot = {};
L(ot, { default: () => ct, type: () => ht });
var ct, ht, _a = N(() => {
  st(), ct = [{ type: "kwd", match: /@\w+/g }, { type: "class", match: /{[\w\s|<>,.@\[\]]+}/g }, { type: "var", match: /\[[\w\s="']+\]/g }, ...Un], ht = "cmnt";
}), mt = {};
L(mt, { default: () => pt });
var pt, Ba = N(() => {
  pt = [{ type: "var", match: /(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\bnull\b/g }, { type: "bool", match: /\b(true|false)\b/g }];
}), gt = {};
L(gt, { default: () => Hn });
var Hn, ft = N(() => {
  _n(), Hn = [{ type: "cmnt", match: /^>.*|(=|-)\1+/gm }, { type: "class", match: /\*\*((?!\*\*).)*\*\*/g }, { match: /```((?!```)[^])*\n```/g, sub: (n) => ({ type: "kwd", sub: [{ match: /\n[^]*(?=```)/g, sub: n.split(`
`)[0].slice(3) || yn(n) }] }) }, { type: "str", match: /`[^`]*`/g }, { type: "var", match: /~~((?!~~).)*~~/g }, { type: "kwd", match: /\b_\S([^\n]*?\S)?_\b|\*\S([^\n]*?\S)?\*/g }, { type: "kwd", match: /^\s*(\*|\d+\.)\s/gm }, { type: "func", match: /\[[^\]]*]\([^)]*\)|<[^>]*>/g, sub: [{ type: "oper", match: /^\[[^\]]*]/g }] }];
}), dt = {};
L(dt, { default: () => xt });
var xt, Ua = N(() => {
  ft(), _n(), xt = [{ type: "insert", match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g, sub: [{ type: "insert", match: /leanpub-(start|end)-insert/g }, { match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g, sub: yn }] }, { type: "deleted", match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g, sub: [{ type: "deleted", match: /leanpub-(start|end)-delete/g }, { match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g, sub: yn }] }, ...Hn];
}), bt = {};
L(bt, { default: () => Et });
var Et, Ha = N(() => {
  Et = [{ type: "cmnt", match: /^#.*/gm }, { expand: "strDouble" }, { expand: "num" }, { type: "err", match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi }, { type: "num", match: /\b(null|undefined)\b/gi }, { type: "bool", match: /\b(false|true|yes|no)\b/gi }, { type: "oper", match: /\.|,/g }];
}), yt = {};
L(yt, { default: () => kt });
var kt, $a = N(() => {
  kt = [{ match: /^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g }, { type: "bool", match: /\b(true|false|nil)\b/g }, { type: "oper", match: /[+*/%^#=~<>:,.-]+/g }, { expand: "num" }, { type: "func", match: /[a-z_]+(?=\s*[({])/g }];
}), It = {};
L(It, { default: () => St });
var St, qa = N(() => {
  St = [{ match: /^\s*#.*/gm, sub: "todo" }, { expand: "str" }, { type: "oper", match: /[${}()]+/g }, { type: "class", match: /.PHONY:/gm }, { type: "section", match: /^[\w.]+:/gm }, { type: "kwd", match: /\b(ifneq|endif)\b/g }, { expand: "num" }, { type: "var", match: /[A-Z_]+(?=\s*=)/g }, { match: /^.*$/gm, sub: "bash" }];
}), Tt = {};
L(Tt, { default: () => Ct });
var Ct, Va = N(() => {
  Ct = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /(["'])(\\[^]|(?!\1)[^])*\1?/g }, { expand: "num" }, { type: "kwd", match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g }, { type: "oper", match: /[-+*/%~!&<>|=?,]+/g }, { type: "func", match: /[a-z_]+(?=\s*\()/g }];
}), wt = {};
L(wt, { default: () => At });
var At, Ga = N(() => {
  At = [{ expand: "strDouble" }];
}), Nt = {};
L(Nt, { default: () => Lt });
var Lt, Ya = N(() => {
  Lt = [{ match: /#.*/g, sub: "todo" }, { match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g, sub: "todo" }, { type: "str", match: /f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi, sub: [{ type: "var", match: /{[^{}]*}/g, sub: [{ match: /(?!^{)[^]*(?=}$)/g, sub: "py" }] }] }, { expand: "str" }, { type: "kwd", match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g }, { type: "bool", match: /\b(False|True|None)\b/g }, { expand: "num" }, { type: "func", match: /[a-z_]\w*(?=\s*\()/gi }, { type: "oper", match: /[-/*+<>,=!&|^%]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), Ot = {};
L(Ot, { default: () => Rt, type: () => Ft });
var Rt, Ft, Wa = N(() => {
  Rt = [{ match: /^(?!\/).*/gm, sub: "todo" }, { type: "num", match: /\[((?!\])[^\\]|\\.)*\]/g }, { type: "kwd", match: /\||\^|\$|\\.|\w+($|\r|\n)/g }, { type: "var", match: /\*|\+|\{\d+,\d+\}/g }], Ft = "oper";
}), zt = {};
L(zt, { default: () => Pt });
var Pt, Za = N(() => {
  Pt = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g }];
}), vt = {};
L(vt, { default: () => Dt });
var Dt, Qa = N(() => {
  Dt = [{ match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "func", match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g }, { type: "kwd", match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g }, { type: "num", match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g }, { type: "bool", match: /\b(TRUE|FALSE)\b/g }, { type: "oper", match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g }, { type: "var", match: /@\S+/g }];
}), jt = {};
L(jt, { default: () => Mt });
var Mt, Xa = N(() => {
  Mt = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /("""|''')((?!\1)[^]|\\[^])*\1?/g }, { expand: "str" }, { type: "section", match: /^\[.+\]\s*$/gm }, { type: "num", match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g }, { expand: "num" }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[+,.=-]/g }, { type: "var", match: /\w+(?= \=)/g }];
}), _t = {};
L(_t, { default: () => Bt });
var Bt, Ka = N(() => {
  tt(), Bt = [{ type: "type", match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g }, { type: "kwd", match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g }, ...Bn];
}), Ut = {};
L(Ut, { default: () => Ht });
var Ht, Ja = N(() => {
  Ht = [{ match: /^#.*/gm, sub: "todo" }, { type: "class", match: /^\w+(?=:?)/gm }, { type: "num", match: /:\d+/g }, { type: "oper", match: /[:/&?]|\w+=/g }, { type: "func", match: /[.\w]+@|#[\w]+$/gm }, { type: "var", match: /\w+\.\w+(\.\w+)*/g }];
}), $t = {};
L($t, { default: () => qt });
var qt, nu = N(() => {
  qt = [{ match: /#.*/g, sub: "todo" }, { expand: "str" }, { type: "str", match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g }, { type: "type", match: /!![a-z]+/g }, { type: "bool", match: /\b(Yes|No)\b/g }, { type: "oper", match: /[+:-]/g }, { expand: "num" }, { type: "var", match: /[a-zA-Z]\w*(?=:)/g }];
}), eu = { num: { type: "num", match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g }, str: { type: "str", match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g }, strDouble: { type: "str", match: /"((?!")[^\r\n\\]|\\[^])*"?/g } }, tu = Ca({ "./languages/asm.js": () => Promise.resolve().then(() => (wa(), Ce)), "./languages/bash.js": () => Promise.resolve().then(() => (Ne(), Ae)), "./languages/bf.js": () => Promise.resolve().then(() => (Aa(), Le)), "./languages/c.js": () => Promise.resolve().then(() => (Na(), Re)), "./languages/css.js": () => Promise.resolve().then(() => (La(), ze)), "./languages/csv.js": () => Promise.resolve().then(() => (Oa(), ve)), "./languages/diff.js": () => Promise.resolve().then(() => (Me(), je)), "./languages/docker.js": () => Promise.resolve().then(() => (Ra(), _e)), "./languages/git.js": () => Promise.resolve().then(() => (Fa(), Ue)), "./languages/go.js": () => Promise.resolve().then(() => (za(), $e)), "./languages/html.js": () => Promise.resolve().then(() => (Pa(), Ye)), "./languages/http.js": () => Promise.resolve().then(() => (va(), Ze)), "./languages/ini.js": () => Promise.resolve().then(() => (Da(), Xe)), "./languages/java.js": () => Promise.resolve().then(() => (ja(), Je)), "./languages/js.js": () => Promise.resolve().then(() => (tt(), et)), "./languages/js_template_literals.js": () => Promise.resolve().then(() => (Ma(), rt)), "./languages/jsdoc.js": () => Promise.resolve().then(() => (_a(), ot)), "./languages/json.js": () => Promise.resolve().then(() => (Ba(), mt)), "./languages/leanpub-md.js": () => Promise.resolve().then(() => (Ua(), dt)), "./languages/log.js": () => Promise.resolve().then(() => (Ha(), bt)), "./languages/lua.js": () => Promise.resolve().then(() => ($a(), yt)), "./languages/make.js": () => Promise.resolve().then(() => (qa(), It)), "./languages/md.js": () => Promise.resolve().then(() => (ft(), gt)), "./languages/pl.js": () => Promise.resolve().then(() => (Va(), Tt)), "./languages/plain.js": () => Promise.resolve().then(() => (Ga(), wt)), "./languages/py.js": () => Promise.resolve().then(() => (Ya(), Nt)), "./languages/regex.js": () => Promise.resolve().then(() => (Wa(), Ot)), "./languages/rs.js": () => Promise.resolve().then(() => (Za(), zt)), "./languages/sql.js": () => Promise.resolve().then(() => (Qa(), vt)), "./languages/todo.js": () => Promise.resolve().then(() => (st(), ut)), "./languages/toml.js": () => Promise.resolve().then(() => (Xa(), jt)), "./languages/ts.js": () => Promise.resolve().then(() => (Ka(), _t)), "./languages/uri.js": () => Promise.resolve().then(() => (Ja(), Ut)), "./languages/xml.js": () => Promise.resolve().then(() => (Ge(), Ve)), "./languages/yaml.js": () => Promise.resolve().then(() => (nu(), $t)) }), ce = {}, ru = (n = "") => n.replaceAll("&", "&#38;").replaceAll?.("<", "&lt;").replaceAll?.(">", "&gt;"), iu = (n, t) => t ? `<span class="shj-syn-${t}">${n}</span>` : n;
async function Vt(n, t, e) {
  try {
    let r, a, i = {}, u, l = [], g = 0, h = typeof t == "string" ? await (ce[t] ?? (ce[t] = tu(`./languages/${t}.js`))) : t, m = [...typeof t == "string" ? h.default : t.sub];
    for (; g < n.length; ) {
      for (i.index = null, r = m.length; r-- > 0; ) {
        if (a = m[r].expand ? eu[m[r].expand] : m[r], l[r] === void 0 || l[r].match.index < g) {
          if (a.match.lastIndex = g, u = a.match.exec(n), u === null) {
            m.splice(r, 1), l.splice(r, 1);
            continue;
          }
          l[r] = { match: u, lastIndex: a.match.lastIndex };
        }
        l[r].match[0] && (l[r].match.index <= i.index || i.index === null) && (i = { part: a, index: l[r].match.index, match: l[r].match[0], end: l[r].lastIndex });
      }
      if (i.index === null) break;
      e(n.slice(g, i.index), h.type), g = i.end, i.part.sub ? await Vt(i.match, typeof i.part.sub == "string" ? i.part.sub : typeof i.part.sub == "function" ? i.part.sub(i.match) : i.part, e) : e(i.match, i.part.type);
    }
    e(n.slice(g, n.length), h.type);
  } catch {
    e(n);
  }
}
async function au(n, t, e = !0, r = {}) {
  let a = "";
  return await Vt(n, t, (i, u) => a += iu(ru(i), u)), e ? `<div><div class="shj-numbers">${"<div></div>".repeat(!r.hideLineNumbers && n.split(`
`).length)}</div><div>${a}</div></div>` : a;
}
async function uu(n, t = n.className.match(/shj-lang-([\w-]+)/)?.[1], e, r) {
  let a = n.textContent;
  n.dataset.lang = t, n.className = `${[...n.classList].filter((i) => !i.startsWith("shj-")).join(" ")} shj-lang-${t} shj-${e}`, n.innerHTML = await au(a, t, e == "multiline", r);
}
const lu = "[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}[class*=shj-lang-]{color:#24292f;background:#fff}.shj-syn-deleted,.shj-syn-err,.shj-syn-kwd{color:#cf222e}.shj-syn-class{color:#953800}.shj-numbers,.shj-syn-cmnt{color:#6e7781}.shj-syn-type,.shj-syn-oper,.shj-syn-num,.shj-syn-section,.shj-syn-var,.shj-syn-bool{color:#0550ae}.shj-syn-str{color:#0a3069}.shj-syn-func{color:#8250df}", su = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
let In;
const he = { light: "theme-light", dark: "theme-dark" };
let me = !1;
class gu {
  options;
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      allowDangerousProtocol: !1,
      extensions: [],
      htmlExtensions: [ou()]
    }, cu();
  }
  // Operations - Highligh previously rendered markdown.
  highlight() {
    document.querySelectorAll('div[class^="shj-lang-"]').forEach((t) => {
      (/shj-lang-([^\s]+)/.exec(t.className) || [])[1] === "javascript" && (uu(t, "js", "multiline", { hideLineNumbers: !0 }), Object.assign(t.style, {
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, Liberation Mono, monospace",
        fontSize: "16px"
      }));
    });
  }
  // Operations - Render markdown.
  async render(t, e) {
    const r = [...this.options.extensions ?? []], a = [...this.options.htmlExtensions ?? []];
    if (e?.tables ?? !1) {
      const i = await mu();
      r.push(i.parseExtension), a.push(i.htmlExtension);
    }
    return Ia(t, { ...this.options, extensions: r, htmlExtensions: a });
  }
  // Operations - Set color mode.
  setColorMode(t) {
    const e = t === "light" ? he.light : he.dark;
    pu(e);
  }
}
function ou() {
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
        n !== void 0 && (n.lang = this.sliceSerialize(t));
      },
      codeFencedFenceMeta(t) {
        n !== void 0 && (n.meta = this.sliceSerialize(t));
      },
      codeFlowValue(t) {
        n !== void 0 && n.codeContent.push(this.sliceSerialize(t));
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
        const t = n ?? { codeContent: [], lang: "", meta: "" };
        this.resume();
        const e = t.codeContent.join(`
`), r = t.lang || "plain", a = t.meta || "";
        let i = "";
        r === "json" && a === "datapos-visual" ? i = `<div class="${a}" data-options="${encodeURIComponent(e)}"></div>` : r === "json" && a === "datapos-highcharts" ? i = `<div class="${a}" data-options="${encodeURIComponent(e)}"></div>` : i = `<div class="shj-lang-${r.replaceAll(/[^a-z0-9_-]/gi, "")}">${hu(e)}</div>`, this.raw(i), n = void 0;
      }
    }
  };
}
function cu() {
  me || (pe(lu, "theme-light"), pe(Sa, "theme-dark"), me = !0);
}
function hu(n) {
  return n.replaceAll(/[&<>"']/g, (t) => su[t]);
}
function pe(n, t) {
  if (typeof document > "u") return;
  let e = document.getElementById(t);
  return e == null && (e = document.createElement("style"), e.id = t, e.dataset.dynamic = "true", document.head.appendChild(e)), e.innerHTML = n, e;
}
async function mu() {
  if (In !== void 0) return In;
  const n = await import("./index-DfnFEuhM.js");
  return In = { parseExtension: n.gfmTable(), htmlExtension: n.gfmTableHtml() }, In;
}
function pu(n) {
  document.querySelectorAll("style[data-dynamic]").forEach((t) => t.disabled = t.id !== n);
}
export {
  gu as M,
  F as a,
  Y as b,
  v as f,
  w as m
};
