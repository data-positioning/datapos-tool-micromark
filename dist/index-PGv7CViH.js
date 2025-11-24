const qn = document.createElement("i");
function Kn(n) {
  const r = "&" + n + ";";
  qn.innerHTML = r;
  const t = qn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && n !== "semi" || t === r ? !1 : t
  );
}
function nn(n, r, t, e) {
  const u = n.length;
  let i = 0, l;
  if (r < 0 ? r = -r > u ? 0 : u + r : r = r > u ? u : r, t = t > 0 ? t : 0, e.length < 1e4)
    l = Array.from(e), l.unshift(r, t), n.splice(...l);
  else
    for (t && n.splice(r, t); i < e.length; )
      l = e.slice(i, i + 1e4), l.unshift(r, 0), n.splice(...l), i += 1e4, r += 1e4;
}
function Q(n, r) {
  return n.length > 0 ? (nn(n, n.length, 0, r), n) : r;
}
const yn = {}.hasOwnProperty;
function Dt(n) {
  const r = {};
  let t = -1;
  for (; ++t < n.length; )
    Nt(r, n[t]);
  return r;
}
function Nt(n, r) {
  let t;
  for (t in r) {
    const u = (yn.call(n, t) ? n[t] : void 0) || (n[t] = {}), i = r[t];
    let l;
    if (i)
      for (l in i) {
        yn.call(u, l) || (u[l] = []);
        const a = i[l];
        qt(
          // @ts-expect-error Looks like a list.
          u[l],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function qt(n, r) {
  let t = -1;
  const e = [];
  for (; ++t < r.length; )
    (r[t].add === "after" ? n : e).push(r[t]);
  nn(n, 0, 0, e);
}
function Rt(n) {
  const r = {};
  let t = -1;
  for (; ++t < n.length; )
    Ht(r, n[t]);
  return r;
}
function Ht(n, r) {
  let t;
  for (t in r) {
    const u = (yn.call(n, t) ? n[t] : void 0) || (n[t] = {}), i = r[t];
    let l;
    if (i)
      for (l in i)
        u[l] = i[l];
  }
}
function Vt(n, r) {
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
const jt = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function Xn(n) {
  return n.replace(/["&<>]/g, r);
  function r(t) {
    return "&" + jt[
      /** @type {keyof typeof characterReferences} */
      t
    ] + ";";
  }
}
function mn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const v = ln(/[A-Za-z]/), W = ln(/[\dA-Za-z]/), Qt = ln(/[#-'*+\--9=?A-Z^-~]/);
function zn(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const En = ln(/\d/), Ut = ln(/[\dA-Fa-f]/), $t = ln(/[!-/:-@[-`{-~]/);
function E(n) {
  return n !== null && n < -2;
}
function $(n) {
  return n !== null && (n < 0 || n === 32);
}
function _(n) {
  return n === -2 || n === -1 || n === 32;
}
const Wt = ln(/\p{P}|\p{S}/u), Yt = ln(/\s/);
function ln(n) {
  return r;
  function r(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
function gn(n, r) {
  const t = Xn(Zt(n || ""));
  if (!r)
    return t;
  const e = t.indexOf(":"), u = t.indexOf("?"), i = t.indexOf("#"), l = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    e < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    l > -1 && e > l || u > -1 && e > u || i > -1 && e > i || // It is a protocol, it should be allowed.
    r.test(t.slice(0, e)) ? t : ""
  );
}
function Zt(n) {
  const r = [];
  let t = -1, e = 0, u = 0;
  for (; ++t < n.length; ) {
    const i = n.charCodeAt(t);
    let l = "";
    if (i === 37 && W(n.charCodeAt(t + 1)) && W(n.charCodeAt(t + 2)))
      u = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (l = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const a = n.charCodeAt(t + 1);
      i < 56320 && a > 56319 && a < 57344 ? (l = String.fromCharCode(i, a), u = 1) : l = "�";
    } else
      l = String.fromCharCode(i);
    l && (r.push(n.slice(e, t), encodeURIComponent(l)), e = t + u + 1, l = ""), u && (t += u, u = 0);
  }
  return r.join("") + n.slice(e);
}
const Rn = {}.hasOwnProperty, Hn = /^(https?|ircs?|mailto|xmpp)$/i, Gt = /^https?$/i;
function Jt(n) {
  const r = n || {};
  let t = !0;
  const e = {}, u = [[]], i = [], l = [], m = (
    /** @type {NormalizedHtmlExtension} */
    Rt([{
      enter: {
        blockQuote: A,
        codeFenced: tn,
        codeFencedFenceInfo: T,
        codeFencedFenceMeta: T,
        codeIndented: en,
        codeText: Tt,
        content: xt,
        definition: ct,
        definitionDestinationString: ft,
        definitionLabelString: T,
        definitionTitleString: T,
        emphasis: Et,
        htmlFlow: zt,
        htmlText: Bn,
        image: G,
        label: T,
        link: an,
        listItemMarker: y,
        listItemValue: q,
        listOrdered: D,
        listUnordered: N,
        paragraph: R,
        reference: T,
        resource: on,
        resourceDestinationString: sn,
        resourceTitleString: T,
        setextHeading: dt,
        strong: Ft
      },
      exit: {
        atxHeading: bt,
        atxHeadingSequence: kt,
        autolinkEmail: Ot,
        autolinkProtocol: Mt,
        blockQuote: V,
        characterEscapeValue: hn,
        characterReferenceMarkerHexadecimal: Mn,
        characterReferenceMarkerNumeric: Mn,
        characterReferenceValue: Bt,
        codeFenced: s,
        codeFencedFence: Z,
        codeFencedFenceInfo: o,
        codeFencedFenceMeta: L,
        codeFlowValue: yt,
        codeIndented: s,
        codeText: At,
        codeTextData: hn,
        data: hn,
        definition: gt,
        definitionDestinationString: pt,
        definitionLabelString: ht,
        definitionTitleString: mt,
        emphasis: _t,
        hardBreakEscape: Ln,
        hardBreakTrailing: Ln,
        htmlFlow: Pn,
        htmlFlowData: hn,
        htmlText: Pn,
        htmlTextData: hn,
        image: _n,
        label: cn,
        labelText: H,
        lineEnding: wt,
        link: _n,
        listOrdered: w,
        listUnordered: M,
        paragraph: Y,
        reference: L,
        referenceString: un,
        resource: L,
        resourceDestinationString: In,
        resourceTitleString: st,
        setextHeading: Ct,
        setextHeadingLineSequence: It,
        setextHeadingText: St,
        strong: Lt,
        thematicBreak: Pt
      }
    }, ...r.htmlExtensions || []])
  ), h = {
    definitions: e,
    tightStack: l
  }, p = {
    buffer: T,
    encode: x,
    getData: z,
    lineEndingIfNeeded: F,
    options: r,
    raw: b,
    resume: d,
    setData: S,
    tag: I
  };
  let f = r.defaultLineEnding;
  return g;
  function g(k) {
    let C = -1, j = 0;
    const J = [];
    let K = [], rn = [];
    for (; ++C < k.length; )
      !f && (k[C][1].type === "lineEnding" || k[C][1].type === "lineEndingBlank") && (f = /** @type {LineEnding} */
      k[C][2].sliceSerialize(k[C][1])), (k[C][1].type === "listOrdered" || k[C][1].type === "listUnordered") && (k[C][0] === "enter" ? J.push(C) : c(k.slice(J.pop(), C))), k[C][1].type === "definition" && (k[C][0] === "enter" ? (rn = Q(rn, k.slice(j, C)), j = C) : (K = Q(K, k.slice(j, C + 1)), j = C + 1));
    K = Q(K, rn), K = Q(K, k.slice(j)), C = -1;
    const X = K;
    for (m.enter.null && m.enter.null.call(p); ++C < k.length; ) {
      const On = m[X[C][0]], Dn = X[C][1].type, Nn = On[Dn];
      Rn.call(On, Dn) && Nn && Nn.call({
        sliceSerialize: X[C][2].sliceSerialize,
        ...p
      }, X[C][1]);
    }
    return m.exit.null && m.exit.null.call(p), u[0].join("");
  }
  function c(k) {
    const C = k.length;
    let j = 0, J = 0, K = !1, rn;
    for (; ++j < C; ) {
      const X = k[j];
      if (X[1]._container)
        rn = void 0, X[0] === "enter" ? J++ : J--;
      else switch (X[1].type) {
        case "listItemPrefix": {
          X[0] === "exit" && (rn = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          X[0] === "enter" && !J && (rn ? rn = void 0 : K = !0);
          break;
        }
        default:
          rn = void 0;
      }
    }
    k[0][1]._loose = K;
  }
  function S(k, C) {
    h[k] = C;
  }
  function z(k) {
    return h[k];
  }
  function T() {
    u.push([]);
  }
  function d() {
    return u.pop().join("");
  }
  function I(k) {
    t && (S("lastWasTag", !0), u[u.length - 1].push(k));
  }
  function b(k) {
    S("lastWasTag"), u[u.length - 1].push(k);
  }
  function P() {
    b(f || `
`);
  }
  function F() {
    const k = u[u.length - 1], C = k[k.length - 1], j = C ? C.charCodeAt(C.length - 1) : null;
    j === 10 || j === 13 || j === null || P();
  }
  function x(k) {
    return z("ignoreEncode") ? k : Xn(k);
  }
  function L() {
    d();
  }
  function D(k) {
    l.push(!k._loose), F(), I("<ol"), S("expectFirstItem", !0);
  }
  function N(k) {
    l.push(!k._loose), F(), I("<ul"), S("expectFirstItem", !0);
  }
  function q(k) {
    if (z("expectFirstItem")) {
      const C = Number.parseInt(this.sliceSerialize(k), 10);
      C !== 1 && I(' start="' + x(String(C)) + '"');
    }
  }
  function y() {
    z("expectFirstItem") ? I(">") : O(), F(), I("<li>"), S("expectFirstItem"), S("lastWasTag");
  }
  function w() {
    O(), l.pop(), P(), I("</ol>");
  }
  function M() {
    O(), l.pop(), P(), I("</ul>");
  }
  function O() {
    z("lastWasTag") && !z("slurpAllLineEndings") && F(), I("</li>"), S("slurpAllLineEndings");
  }
  function A() {
    l.push(!1), F(), I("<blockquote>");
  }
  function V() {
    l.pop(), F(), I("</blockquote>"), S("slurpAllLineEndings");
  }
  function R() {
    l[l.length - 1] || (F(), I("<p>")), S("slurpAllLineEndings");
  }
  function Y() {
    l[l.length - 1] ? S("slurpAllLineEndings", !0) : I("</p>");
  }
  function tn() {
    F(), I("<pre><code"), S("fencesCount", 0);
  }
  function o() {
    const k = d();
    I(' class="language-' + k + '"');
  }
  function Z() {
    const k = z("fencesCount") || 0;
    k || (I(">"), S("slurpOneLineEnding", !0)), S("fencesCount", k + 1);
  }
  function en() {
    F(), I("<pre><code>");
  }
  function s() {
    const k = z("fencesCount");
    k !== void 0 && k < 2 && h.tightStack.length > 0 && !z("lastWasTag") && P(), z("flowCodeSeenData") && F(), I("</code></pre>"), k !== void 0 && k < 2 && F(), S("flowCodeSeenData"), S("fencesCount"), S("slurpOneLineEnding");
  }
  function G() {
    i.push({
      image: !0
    }), t = void 0;
  }
  function an() {
    i.push({});
  }
  function H(k) {
    i[i.length - 1].labelId = this.sliceSerialize(k);
  }
  function cn() {
    i[i.length - 1].label = d();
  }
  function un(k) {
    i[i.length - 1].referenceId = this.sliceSerialize(k);
  }
  function on() {
    T(), i[i.length - 1].destination = "";
  }
  function sn() {
    T(), S("ignoreEncode", !0);
  }
  function In() {
    i[i.length - 1].destination = d(), S("ignoreEncode");
  }
  function st() {
    i[i.length - 1].title = d();
  }
  function _n() {
    let k = i.length - 1;
    const C = i[k], j = C.referenceId || C.labelId, J = C.destination === void 0 ? e[mn(j)] : C;
    for (t = !0; k--; )
      if (i[k].image) {
        t = void 0;
        break;
      }
    C.image ? (I('<img src="' + gn(J.destination, r.allowDangerousProtocol ? void 0 : Gt) + '" alt="'), b(C.label), I('"')) : I('<a href="' + gn(J.destination, r.allowDangerousProtocol ? void 0 : Hn) + '"'), I(J.title ? ' title="' + J.title + '"' : ""), C.image ? I(" />") : (I(">"), b(C.label), I("</a>")), i.pop();
  }
  function ct() {
    T(), i.push({});
  }
  function ht(k) {
    d(), i[i.length - 1].labelId = this.sliceSerialize(k);
  }
  function ft() {
    T(), S("ignoreEncode", !0);
  }
  function pt() {
    i[i.length - 1].destination = d(), S("ignoreEncode");
  }
  function mt() {
    i[i.length - 1].title = d();
  }
  function gt() {
    const k = i[i.length - 1], C = mn(k.labelId);
    d(), Rn.call(e, C) || (e[C] = i[i.length - 1]), i.pop();
  }
  function xt() {
    S("slurpAllLineEndings", !0);
  }
  function kt(k) {
    z("headingRank") || (S("headingRank", this.sliceSerialize(k).length), F(), I("<h" + z("headingRank") + ">"));
  }
  function dt() {
    T(), S("slurpAllLineEndings");
  }
  function St() {
    S("slurpAllLineEndings", !0);
  }
  function bt() {
    I("</h" + z("headingRank") + ">"), S("headingRank");
  }
  function It(k) {
    S("headingRank", this.sliceSerialize(k).charCodeAt(0) === 61 ? 1 : 2);
  }
  function Ct() {
    const k = d();
    F(), I("<h" + z("headingRank") + ">"), b(k), I("</h" + z("headingRank") + ">"), S("slurpAllLineEndings"), S("headingRank");
  }
  function hn(k) {
    b(x(this.sliceSerialize(k)));
  }
  function wt(k) {
    if (!z("slurpAllLineEndings")) {
      if (z("slurpOneLineEnding")) {
        S("slurpOneLineEnding");
        return;
      }
      if (z("inCodeText")) {
        b(" ");
        return;
      }
      b(x(this.sliceSerialize(k)));
    }
  }
  function yt(k) {
    b(x(this.sliceSerialize(k))), S("flowCodeSeenData", !0);
  }
  function Ln() {
    I("<br />");
  }
  function zt() {
    F(), Bn();
  }
  function Pn() {
    S("ignoreEncode");
  }
  function Bn() {
    r.allowDangerousHtml && S("ignoreEncode", !0);
  }
  function Et() {
    I("<em>");
  }
  function Ft() {
    I("<strong>");
  }
  function Tt() {
    S("inCodeText", !0), I("<code>");
  }
  function At() {
    S("inCodeText"), I("</code>");
  }
  function _t() {
    I("</em>");
  }
  function Lt() {
    I("</strong>");
  }
  function Pt() {
    F(), I("<hr />");
  }
  function Mn(k) {
    S("characterReferenceType", k.type);
  }
  function Bt(k) {
    const C = this.sliceSerialize(k), j = z("characterReferenceType") ? Vt(C, z("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : Kn(C);
    b(x(
      /** @type {string} */
      j
    )), S("characterReferenceType");
  }
  function Mt(k) {
    const C = this.sliceSerialize(k);
    I('<a href="' + gn(C, r.allowDangerousProtocol ? void 0 : Hn) + '">'), b(x(C)), I("</a>");
  }
  function Ot(k) {
    const C = this.sliceSerialize(k);
    I('<a href="' + gn("mailto:" + C) + '">'), b(x(C)), I("</a>");
  }
}
function B(n, r, t, e) {
  const u = e ? e - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return l;
  function l(m) {
    return _(m) ? (n.enter(t), a(m)) : r(m);
  }
  function a(m) {
    return _(m) && i++ < u ? (n.consume(m), a) : (n.exit(t), r(m));
  }
}
const Kt = {
  tokenize: Xt
};
function Xt(n) {
  const r = n.attempt(this.parser.constructs.contentInitial, e, u);
  let t;
  return r;
  function e(a) {
    if (a === null) {
      n.consume(a);
      return;
    }
    return n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), B(n, r, "linePrefix");
  }
  function u(a) {
    return n.enter("paragraph"), i(a);
  }
  function i(a) {
    const m = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = m), t = m, l(a);
  }
  function l(a) {
    if (a === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(a);
      return;
    }
    return E(a) ? (n.consume(a), n.exit("chunkText"), i) : (n.consume(a), l);
  }
}
const vt = {
  tokenize: ne
}, Vn = {
  tokenize: te
};
function ne(n) {
  const r = this, t = [];
  let e = 0, u, i, l;
  return a;
  function a(b) {
    if (e < t.length) {
      const P = t[e];
      return r.containerState = P[1], n.attempt(P[0].continuation, m, h)(b);
    }
    return h(b);
  }
  function m(b) {
    if (e++, r.containerState._closeFlow) {
      r.containerState._closeFlow = void 0, u && I();
      const P = r.events.length;
      let F = P, x;
      for (; F--; )
        if (r.events[F][0] === "exit" && r.events[F][1].type === "chunkFlow") {
          x = r.events[F][1].end;
          break;
        }
      d(e);
      let L = P;
      for (; L < r.events.length; )
        r.events[L][1].end = {
          ...x
        }, L++;
      return nn(r.events, F + 1, 0, r.events.slice(P)), r.events.length = L, h(b);
    }
    return a(b);
  }
  function h(b) {
    if (e === t.length) {
      if (!u)
        return g(b);
      if (u.currentConstruct && u.currentConstruct.concrete)
        return S(b);
      r.interrupt = !!(u.currentConstruct && !u._gfmTableDynamicInterruptHack);
    }
    return r.containerState = {}, n.check(Vn, p, f)(b);
  }
  function p(b) {
    return u && I(), d(e), g(b);
  }
  function f(b) {
    return r.parser.lazy[r.now().line] = e !== t.length, l = r.now().offset, S(b);
  }
  function g(b) {
    return r.containerState = {}, n.attempt(Vn, c, S)(b);
  }
  function c(b) {
    return e++, t.push([r.currentConstruct, r.containerState]), g(b);
  }
  function S(b) {
    if (b === null) {
      u && I(), d(0), n.consume(b);
      return;
    }
    return u = u || r.parser.flow(r.now()), n.enter("chunkFlow", {
      _tokenizer: u,
      contentType: "flow",
      previous: i
    }), z(b);
  }
  function z(b) {
    if (b === null) {
      T(n.exit("chunkFlow"), !0), d(0), n.consume(b);
      return;
    }
    return E(b) ? (n.consume(b), T(n.exit("chunkFlow")), e = 0, r.interrupt = void 0, a) : (n.consume(b), z);
  }
  function T(b, P) {
    const F = r.sliceStream(b);
    if (P && F.push(null), b.previous = i, i && (i.next = b), i = b, u.defineSkip(b.start), u.write(F), r.parser.lazy[b.start.line]) {
      let x = u.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          u.events[x][1].start.offset < l && // …and either is not ended yet…
          (!u.events[x][1].end || // …or ends after it.
          u.events[x][1].end.offset > l)
        )
          return;
      const L = r.events.length;
      let D = L, N, q;
      for (; D--; )
        if (r.events[D][0] === "exit" && r.events[D][1].type === "chunkFlow") {
          if (N) {
            q = r.events[D][1].end;
            break;
          }
          N = !0;
        }
      for (d(e), x = L; x < r.events.length; )
        r.events[x][1].end = {
          ...q
        }, x++;
      nn(r.events, D + 1, 0, r.events.slice(L)), r.events.length = x;
    }
  }
  function d(b) {
    let P = t.length;
    for (; P-- > b; ) {
      const F = t[P];
      r.containerState = F[1], F[0].exit.call(r, n);
    }
    t.length = b;
  }
  function I() {
    u.write([null]), i = void 0, u = void 0, r.containerState._closeFlow = void 0;
  }
}
function te(n, r, t) {
  return B(n, n.attempt(this.parser.constructs.document, r, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function jn(n) {
  if (n === null || $(n) || Yt(n))
    return 1;
  if (Wt(n))
    return 2;
}
function Tn(n, r, t) {
  const e = [];
  let u = -1;
  for (; ++u < n.length; ) {
    const i = n[u].resolveAll;
    i && !e.includes(i) && (r = i(r, t), e.push(i));
  }
  return r;
}
const Fn = {
  name: "attention",
  resolveAll: ee,
  tokenize: re
};
function ee(n, r) {
  let t = -1, e, u, i, l, a, m, h, p;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (e = t; e--; )
        if (n[e][0] === "exit" && n[e][1].type === "attentionSequence" && n[e][1]._open && // If the markers are the same:
        r.sliceSerialize(n[e][1]).charCodeAt(0) === r.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[e][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[e][1].end.offset - n[e][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          m = n[e][1].end.offset - n[e][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const f = {
            ...n[e][1].end
          }, g = {
            ...n[t][1].start
          };
          Qn(f, -m), Qn(g, m), l = {
            type: m > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: {
              ...n[e][1].end
            }
          }, a = {
            type: m > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[t][1].start
            },
            end: g
          }, i = {
            type: m > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[e][1].end
            },
            end: {
              ...n[t][1].start
            }
          }, u = {
            type: m > 1 ? "strong" : "emphasis",
            start: {
              ...l.start
            },
            end: {
              ...a.end
            }
          }, n[e][1].end = {
            ...l.start
          }, n[t][1].start = {
            ...a.end
          }, h = [], n[e][1].end.offset - n[e][1].start.offset && (h = Q(h, [["enter", n[e][1], r], ["exit", n[e][1], r]])), h = Q(h, [["enter", u, r], ["enter", l, r], ["exit", l, r], ["enter", i, r]]), h = Q(h, Tn(r.parser.constructs.insideSpan.null, n.slice(e + 1, t), r)), h = Q(h, [["exit", i, r], ["enter", a, r], ["exit", a, r], ["exit", u, r]]), n[t][1].end.offset - n[t][1].start.offset ? (p = 2, h = Q(h, [["enter", n[t][1], r], ["exit", n[t][1], r]])) : p = 0, nn(n, e - 1, t - e + 3, h), t = e + h.length - p - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function re(n, r) {
  const t = this.parser.constructs.attentionMarkers.null, e = this.previous, u = jn(e);
  let i;
  return l;
  function l(m) {
    return i = m, n.enter("attentionSequence"), a(m);
  }
  function a(m) {
    if (m === i)
      return n.consume(m), a;
    const h = n.exit("attentionSequence"), p = jn(m), f = !p || p === 2 && u || t.includes(m), g = !u || u === 2 && p || t.includes(e);
    return h._open = !!(i === 42 ? f : f && (u || !g)), h._close = !!(i === 42 ? g : g && (p || !f)), r(m);
  }
}
function Qn(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const ie = {
  name: "autolink",
  tokenize: ue
};
function ue(n, r, t) {
  let e = 0;
  return u;
  function u(c) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), i;
  }
  function i(c) {
    return v(c) ? (n.consume(c), l) : c === 64 ? t(c) : h(c);
  }
  function l(c) {
    return c === 43 || c === 45 || c === 46 || W(c) ? (e = 1, a(c)) : h(c);
  }
  function a(c) {
    return c === 58 ? (n.consume(c), e = 0, m) : (c === 43 || c === 45 || c === 46 || W(c)) && e++ < 32 ? (n.consume(c), a) : (e = 0, h(c));
  }
  function m(c) {
    return c === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), r) : c === null || c === 32 || c === 60 || zn(c) ? t(c) : (n.consume(c), m);
  }
  function h(c) {
    return c === 64 ? (n.consume(c), p) : Qt(c) ? (n.consume(c), h) : t(c);
  }
  function p(c) {
    return W(c) ? f(c) : t(c);
  }
  function f(c) {
    return c === 46 ? (n.consume(c), e = 0, p) : c === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), r) : g(c);
  }
  function g(c) {
    if ((c === 45 || W(c)) && e++ < 63) {
      const S = c === 45 ? g : f;
      return n.consume(c), S;
    }
    return t(c);
  }
}
const bn = {
  partial: !0,
  tokenize: le
};
function le(n, r, t) {
  return e;
  function e(i) {
    return _(i) ? B(n, u, "linePrefix")(i) : u(i);
  }
  function u(i) {
    return i === null || E(i) ? r(i) : t(i);
  }
}
const vn = {
  continuation: {
    tokenize: oe
  },
  exit: se,
  name: "blockQuote",
  tokenize: ae
};
function ae(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    if (l === 62) {
      const a = e.containerState;
      return a.open || (n.enter("blockQuote", {
        _container: !0
      }), a.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(l), n.exit("blockQuoteMarker"), i;
    }
    return t(l);
  }
  function i(l) {
    return _(l) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(l), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), r) : (n.exit("blockQuotePrefix"), r(l));
  }
}
function oe(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return _(l) ? B(n, i, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : i(l);
  }
  function i(l) {
    return n.attempt(vn, r, t)(l);
  }
}
function se(n) {
  n.exit("blockQuote");
}
const nt = {
  name: "characterEscape",
  tokenize: ce
};
function ce(n, r, t) {
  return e;
  function e(i) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(i), n.exit("escapeMarker"), u;
  }
  function u(i) {
    return $t(i) ? (n.enter("characterEscapeValue"), n.consume(i), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : t(i);
  }
}
const tt = {
  name: "characterReference",
  tokenize: he
};
function he(n, r, t) {
  const e = this;
  let u = 0, i, l;
  return a;
  function a(f) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(f), n.exit("characterReferenceMarker"), m;
  }
  function m(f) {
    return f === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(f), n.exit("characterReferenceMarkerNumeric"), h) : (n.enter("characterReferenceValue"), i = 31, l = W, p(f));
  }
  function h(f) {
    return f === 88 || f === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(f), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), i = 6, l = Ut, p) : (n.enter("characterReferenceValue"), i = 7, l = En, p(f));
  }
  function p(f) {
    if (f === 59 && u) {
      const g = n.exit("characterReferenceValue");
      return l === W && !Kn(e.sliceSerialize(g)) ? t(f) : (n.enter("characterReferenceMarker"), n.consume(f), n.exit("characterReferenceMarker"), n.exit("characterReference"), r);
    }
    return l(f) && u++ < i ? (n.consume(f), p) : t(f);
  }
}
const Un = {
  partial: !0,
  tokenize: pe
}, $n = {
  concrete: !0,
  name: "codeFenced",
  tokenize: fe
};
function fe(n, r, t) {
  const e = this, u = {
    partial: !0,
    tokenize: F
  };
  let i = 0, l = 0, a;
  return m;
  function m(x) {
    return h(x);
  }
  function h(x) {
    const L = e.events[e.events.length - 1];
    return i = L && L[1].type === "linePrefix" ? L[2].sliceSerialize(L[1], !0).length : 0, a = x, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), p(x);
  }
  function p(x) {
    return x === a ? (l++, n.consume(x), p) : l < 3 ? t(x) : (n.exit("codeFencedFenceSequence"), _(x) ? B(n, f, "whitespace")(x) : f(x));
  }
  function f(x) {
    return x === null || E(x) ? (n.exit("codeFencedFence"), e.interrupt ? r(x) : n.check(Un, z, P)(x)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), g(x));
  }
  function g(x) {
    return x === null || E(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), f(x)) : _(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), B(n, c, "whitespace")(x)) : x === 96 && x === a ? t(x) : (n.consume(x), g);
  }
  function c(x) {
    return x === null || E(x) ? f(x) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), S(x));
  }
  function S(x) {
    return x === null || E(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), f(x)) : x === 96 && x === a ? t(x) : (n.consume(x), S);
  }
  function z(x) {
    return n.attempt(u, P, T)(x);
  }
  function T(x) {
    return n.enter("lineEnding"), n.consume(x), n.exit("lineEnding"), d;
  }
  function d(x) {
    return i > 0 && _(x) ? B(n, I, "linePrefix", i + 1)(x) : I(x);
  }
  function I(x) {
    return x === null || E(x) ? n.check(Un, z, P)(x) : (n.enter("codeFlowValue"), b(x));
  }
  function b(x) {
    return x === null || E(x) ? (n.exit("codeFlowValue"), I(x)) : (n.consume(x), b);
  }
  function P(x) {
    return n.exit("codeFenced"), r(x);
  }
  function F(x, L, D) {
    let N = 0;
    return q;
    function q(A) {
      return x.enter("lineEnding"), x.consume(A), x.exit("lineEnding"), y;
    }
    function y(A) {
      return x.enter("codeFencedFence"), _(A) ? B(x, w, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(A) : w(A);
    }
    function w(A) {
      return A === a ? (x.enter("codeFencedFenceSequence"), M(A)) : D(A);
    }
    function M(A) {
      return A === a ? (N++, x.consume(A), M) : N >= l ? (x.exit("codeFencedFenceSequence"), _(A) ? B(x, O, "whitespace")(A) : O(A)) : D(A);
    }
    function O(A) {
      return A === null || E(A) ? (x.exit("codeFencedFence"), L(A)) : D(A);
    }
  }
}
function pe(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return l === null ? t(l) : (n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), i);
  }
  function i(l) {
    return e.parser.lazy[e.now().line] ? t(l) : r(l);
  }
}
const Cn = {
  name: "codeIndented",
  tokenize: ge
}, me = {
  partial: !0,
  tokenize: xe
};
function ge(n, r, t) {
  const e = this;
  return u;
  function u(h) {
    return n.enter("codeIndented"), B(n, i, "linePrefix", 5)(h);
  }
  function i(h) {
    const p = e.events[e.events.length - 1];
    return p && p[1].type === "linePrefix" && p[2].sliceSerialize(p[1], !0).length >= 4 ? l(h) : t(h);
  }
  function l(h) {
    return h === null ? m(h) : E(h) ? n.attempt(me, l, m)(h) : (n.enter("codeFlowValue"), a(h));
  }
  function a(h) {
    return h === null || E(h) ? (n.exit("codeFlowValue"), l(h)) : (n.consume(h), a);
  }
  function m(h) {
    return n.exit("codeIndented"), r(h);
  }
}
function xe(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return e.parser.lazy[e.now().line] ? t(l) : E(l) ? (n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), u) : B(n, i, "linePrefix", 5)(l);
  }
  function i(l) {
    const a = e.events[e.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? r(l) : E(l) ? u(l) : t(l);
  }
}
const ke = {
  name: "codeText",
  previous: Se,
  resolve: de,
  tokenize: be
};
function de(n) {
  let r = n.length - 4, t = 3, e, u;
  if ((n[t][1].type === "lineEnding" || n[t][1].type === "space") && (n[r][1].type === "lineEnding" || n[r][1].type === "space")) {
    for (e = t; ++e < r; )
      if (n[e][1].type === "codeTextData") {
        n[t][1].type = "codeTextPadding", n[r][1].type = "codeTextPadding", t += 2, r -= 2;
        break;
      }
  }
  for (e = t - 1, r++; ++e <= r; )
    u === void 0 ? e !== r && n[e][1].type !== "lineEnding" && (u = e) : (e === r || n[e][1].type === "lineEnding") && (n[u][1].type = "codeTextData", e !== u + 2 && (n[u][1].end = n[e - 1][1].end, n.splice(u + 2, e - u - 2), r -= e - u - 2, e = u + 2), u = void 0);
  return n;
}
function Se(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function be(n, r, t) {
  let e = 0, u, i;
  return l;
  function l(f) {
    return n.enter("codeText"), n.enter("codeTextSequence"), a(f);
  }
  function a(f) {
    return f === 96 ? (n.consume(f), e++, a) : (n.exit("codeTextSequence"), m(f));
  }
  function m(f) {
    return f === null ? t(f) : f === 32 ? (n.enter("space"), n.consume(f), n.exit("space"), m) : f === 96 ? (i = n.enter("codeTextSequence"), u = 0, p(f)) : E(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), m) : (n.enter("codeTextData"), h(f));
  }
  function h(f) {
    return f === null || f === 32 || f === 96 || E(f) ? (n.exit("codeTextData"), m(f)) : (n.consume(f), h);
  }
  function p(f) {
    return f === 96 ? (n.consume(f), u++, p) : u === e ? (n.exit("codeTextSequence"), n.exit("codeText"), r(f)) : (i.type = "codeTextData", h(f));
  }
}
class Ie {
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
    const u = t || 0;
    this.setCursor(Math.trunc(r));
    const i = this.right.splice(this.right.length - u, Number.POSITIVE_INFINITY);
    return e && fn(this.left, e), i.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), fn(this.left, r);
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
    this.setCursor(0), fn(this.right, r.reverse());
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
        fn(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - r, Number.POSITIVE_INFINITY);
        fn(this.left, t.reverse());
      }
  }
}
function fn(n, r) {
  let t = 0;
  if (r.length < 1e4)
    n.push(...r);
  else
    for (; t < r.length; )
      n.push(...r.slice(t, t + 1e4)), t += 1e4;
}
function et(n) {
  const r = {};
  let t = -1, e, u, i, l, a, m, h;
  const p = new Ie(n);
  for (; ++t < p.length; ) {
    for (; t in r; )
      t = r[t];
    if (e = p.get(t), t && e[1].type === "chunkFlow" && p.get(t - 1)[1].type === "listItemPrefix" && (m = e[1]._tokenizer.events, i = 0, i < m.length && m[i][1].type === "lineEndingBlank" && (i += 2), i < m.length && m[i][1].type === "content"))
      for (; ++i < m.length && m[i][1].type !== "content"; )
        m[i][1].type === "chunkText" && (m[i][1]._isInFirstContentOfListItem = !0, i++);
    if (e[0] === "enter")
      e[1].contentType && (Object.assign(r, Ce(p, t)), t = r[t], h = !0);
    else if (e[1]._container) {
      for (i = t, u = void 0; i--; )
        if (l = p.get(i), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (u && (p.get(u)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", u = i);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      u && (e[1].end = {
        ...p.get(u)[1].start
      }, a = p.slice(u, t), a.unshift(e), p.splice(u, t - u + 1, a));
    }
  }
  return nn(n, 0, Number.POSITIVE_INFINITY, p.slice(0)), !h;
}
function Ce(n, r) {
  const t = n.get(r)[1], e = n.get(r)[2];
  let u = r - 1;
  const i = [];
  let l = t._tokenizer;
  l || (l = e.parser[t.contentType](t.start), t._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, m = [], h = {};
  let p, f, g = -1, c = t, S = 0, z = 0;
  const T = [z];
  for (; c; ) {
    for (; n.get(++u)[1] !== c; )
      ;
    i.push(u), c._tokenizer || (p = e.sliceStream(c), c.next || p.push(null), f && l.defineSkip(c.start), c._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(p), c._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), f = c, c = c.next;
  }
  for (c = t; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (z = g + 1, T.push(z), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (l.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : T.pop(), g = T.length; g--; ) {
    const d = a.slice(T[g], T[g + 1]), I = i.pop();
    m.push([I, I + d.length - 1]), n.splice(I, 2, d);
  }
  for (m.reverse(), g = -1; ++g < m.length; )
    h[S + m[g][0]] = S + m[g][1], S += m[g][1] - m[g][0] - 1;
  return h;
}
const we = {
  resolve: ze,
  tokenize: Ee
}, ye = {
  partial: !0,
  tokenize: Fe
};
function ze(n) {
  return et(n), n;
}
function Ee(n, r) {
  let t;
  return e;
  function e(a) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), u(a);
  }
  function u(a) {
    return a === null ? i(a) : E(a) ? n.check(ye, l, i)(a) : (n.consume(a), u);
  }
  function i(a) {
    return n.exit("chunkContent"), n.exit("content"), r(a);
  }
  function l(a) {
    return n.consume(a), n.exit("chunkContent"), t.next = n.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, u;
  }
}
function Fe(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), B(n, i, "linePrefix");
  }
  function i(l) {
    if (l === null || E(l))
      return t(l);
    const a = e.events[e.events.length - 1];
    return !e.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? r(l) : n.interrupt(e.parser.constructs.flow, t, r)(l);
  }
}
function rt(n, r, t, e, u, i, l, a, m) {
  const h = m || Number.POSITIVE_INFINITY;
  let p = 0;
  return f;
  function f(d) {
    return d === 60 ? (n.enter(e), n.enter(u), n.enter(i), n.consume(d), n.exit(i), g) : d === null || d === 32 || d === 41 || zn(d) ? t(d) : (n.enter(e), n.enter(l), n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), z(d));
  }
  function g(d) {
    return d === 62 ? (n.enter(i), n.consume(d), n.exit(i), n.exit(u), n.exit(e), r) : (n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), c(d));
  }
  function c(d) {
    return d === 62 ? (n.exit("chunkString"), n.exit(a), g(d)) : d === null || d === 60 || E(d) ? t(d) : (n.consume(d), d === 92 ? S : c);
  }
  function S(d) {
    return d === 60 || d === 62 || d === 92 ? (n.consume(d), c) : c(d);
  }
  function z(d) {
    return !p && (d === null || d === 41 || $(d)) ? (n.exit("chunkString"), n.exit(a), n.exit(l), n.exit(e), r(d)) : p < h && d === 40 ? (n.consume(d), p++, z) : d === 41 ? (n.consume(d), p--, z) : d === null || d === 32 || d === 40 || zn(d) ? t(d) : (n.consume(d), d === 92 ? T : z);
  }
  function T(d) {
    return d === 40 || d === 41 || d === 92 ? (n.consume(d), z) : z(d);
  }
}
function it(n, r, t, e, u, i) {
  const l = this;
  let a = 0, m;
  return h;
  function h(c) {
    return n.enter(e), n.enter(u), n.consume(c), n.exit(u), n.enter(i), p;
  }
  function p(c) {
    return a > 999 || c === null || c === 91 || c === 93 && !m || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? t(c) : c === 93 ? (n.exit(i), n.enter(u), n.consume(c), n.exit(u), n.exit(e), r) : E(c) ? (n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), p) : (n.enter("chunkString", {
      contentType: "string"
    }), f(c));
  }
  function f(c) {
    return c === null || c === 91 || c === 93 || E(c) || a++ > 999 ? (n.exit("chunkString"), p(c)) : (n.consume(c), m || (m = !_(c)), c === 92 ? g : f);
  }
  function g(c) {
    return c === 91 || c === 92 || c === 93 ? (n.consume(c), a++, f) : f(c);
  }
}
function ut(n, r, t, e, u, i) {
  let l;
  return a;
  function a(g) {
    return g === 34 || g === 39 || g === 40 ? (n.enter(e), n.enter(u), n.consume(g), n.exit(u), l = g === 40 ? 41 : g, m) : t(g);
  }
  function m(g) {
    return g === l ? (n.enter(u), n.consume(g), n.exit(u), n.exit(e), r) : (n.enter(i), h(g));
  }
  function h(g) {
    return g === l ? (n.exit(i), m(l)) : g === null ? t(g) : E(g) ? (n.enter("lineEnding"), n.consume(g), n.exit("lineEnding"), B(n, h, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), p(g));
  }
  function p(g) {
    return g === l || g === null || E(g) ? (n.exit("chunkString"), h(g)) : (n.consume(g), g === 92 ? f : p);
  }
  function f(g) {
    return g === l || g === 92 ? (n.consume(g), p) : p(g);
  }
}
function pn(n, r) {
  let t;
  return e;
  function e(u) {
    return E(u) ? (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), t = !0, e) : _(u) ? B(n, e, t ? "linePrefix" : "lineSuffix")(u) : r(u);
  }
}
const Te = {
  name: "definition",
  tokenize: _e
}, Ae = {
  partial: !0,
  tokenize: Le
};
function _e(n, r, t) {
  const e = this;
  let u;
  return i;
  function i(c) {
    return n.enter("definition"), l(c);
  }
  function l(c) {
    return it.call(
      e,
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
    return u = mn(e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1)), c === 58 ? (n.enter("definitionMarker"), n.consume(c), n.exit("definitionMarker"), m) : t(c);
  }
  function m(c) {
    return $(c) ? pn(n, h)(c) : h(c);
  }
  function h(c) {
    return rt(
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
    return n.attempt(Ae, f, f)(c);
  }
  function f(c) {
    return _(c) ? B(n, g, "whitespace")(c) : g(c);
  }
  function g(c) {
    return c === null || E(c) ? (n.exit("definition"), e.parser.defined.push(u), r(c)) : t(c);
  }
}
function Le(n, r, t) {
  return e;
  function e(a) {
    return $(a) ? pn(n, u)(a) : t(a);
  }
  function u(a) {
    return ut(n, i, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function i(a) {
    return _(a) ? B(n, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || E(a) ? r(a) : t(a);
  }
}
const Pe = {
  name: "hardBreakEscape",
  tokenize: Be
};
function Be(n, r, t) {
  return e;
  function e(i) {
    return n.enter("hardBreakEscape"), n.consume(i), u;
  }
  function u(i) {
    return E(i) ? (n.exit("hardBreakEscape"), r(i)) : t(i);
  }
}
const Me = {
  name: "headingAtx",
  resolve: Oe,
  tokenize: De
};
function Oe(n, r) {
  let t = n.length - 2, e = 3, u, i;
  return n[e][1].type === "whitespace" && (e += 2), t - 2 > e && n[t][1].type === "whitespace" && (t -= 2), n[t][1].type === "atxHeadingSequence" && (e === t - 1 || t - 4 > e && n[t - 2][1].type === "whitespace") && (t -= e + 1 === t ? 2 : 4), t > e && (u = {
    type: "atxHeadingText",
    start: n[e][1].start,
    end: n[t][1].end
  }, i = {
    type: "chunkText",
    start: n[e][1].start,
    end: n[t][1].end,
    contentType: "text"
  }, nn(n, e, t - e + 1, [["enter", u, r], ["enter", i, r], ["exit", i, r], ["exit", u, r]])), n;
}
function De(n, r, t) {
  let e = 0;
  return u;
  function u(p) {
    return n.enter("atxHeading"), i(p);
  }
  function i(p) {
    return n.enter("atxHeadingSequence"), l(p);
  }
  function l(p) {
    return p === 35 && e++ < 6 ? (n.consume(p), l) : p === null || $(p) ? (n.exit("atxHeadingSequence"), a(p)) : t(p);
  }
  function a(p) {
    return p === 35 ? (n.enter("atxHeadingSequence"), m(p)) : p === null || E(p) ? (n.exit("atxHeading"), r(p)) : _(p) ? B(n, a, "whitespace")(p) : (n.enter("atxHeadingText"), h(p));
  }
  function m(p) {
    return p === 35 ? (n.consume(p), m) : (n.exit("atxHeadingSequence"), a(p));
  }
  function h(p) {
    return p === null || p === 35 || $(p) ? (n.exit("atxHeadingText"), a(p)) : (n.consume(p), h);
  }
}
const Ne = [
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
], Wn = ["pre", "script", "style", "textarea"], qe = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Ve,
  tokenize: je
}, Re = {
  partial: !0,
  tokenize: Ue
}, He = {
  partial: !0,
  tokenize: Qe
};
function Ve(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function je(n, r, t) {
  const e = this;
  let u, i, l, a, m;
  return h;
  function h(s) {
    return p(s);
  }
  function p(s) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(s), f;
  }
  function f(s) {
    return s === 33 ? (n.consume(s), g) : s === 47 ? (n.consume(s), i = !0, z) : s === 63 ? (n.consume(s), u = 3, e.interrupt ? r : o) : v(s) ? (n.consume(s), l = String.fromCharCode(s), T) : t(s);
  }
  function g(s) {
    return s === 45 ? (n.consume(s), u = 2, c) : s === 91 ? (n.consume(s), u = 5, a = 0, S) : v(s) ? (n.consume(s), u = 4, e.interrupt ? r : o) : t(s);
  }
  function c(s) {
    return s === 45 ? (n.consume(s), e.interrupt ? r : o) : t(s);
  }
  function S(s) {
    const G = "CDATA[";
    return s === G.charCodeAt(a++) ? (n.consume(s), a === G.length ? e.interrupt ? r : w : S) : t(s);
  }
  function z(s) {
    return v(s) ? (n.consume(s), l = String.fromCharCode(s), T) : t(s);
  }
  function T(s) {
    if (s === null || s === 47 || s === 62 || $(s)) {
      const G = s === 47, an = l.toLowerCase();
      return !G && !i && Wn.includes(an) ? (u = 1, e.interrupt ? r(s) : w(s)) : Ne.includes(l.toLowerCase()) ? (u = 6, G ? (n.consume(s), d) : e.interrupt ? r(s) : w(s)) : (u = 7, e.interrupt && !e.parser.lazy[e.now().line] ? t(s) : i ? I(s) : b(s));
    }
    return s === 45 || W(s) ? (n.consume(s), l += String.fromCharCode(s), T) : t(s);
  }
  function d(s) {
    return s === 62 ? (n.consume(s), e.interrupt ? r : w) : t(s);
  }
  function I(s) {
    return _(s) ? (n.consume(s), I) : q(s);
  }
  function b(s) {
    return s === 47 ? (n.consume(s), q) : s === 58 || s === 95 || v(s) ? (n.consume(s), P) : _(s) ? (n.consume(s), b) : q(s);
  }
  function P(s) {
    return s === 45 || s === 46 || s === 58 || s === 95 || W(s) ? (n.consume(s), P) : F(s);
  }
  function F(s) {
    return s === 61 ? (n.consume(s), x) : _(s) ? (n.consume(s), F) : b(s);
  }
  function x(s) {
    return s === null || s === 60 || s === 61 || s === 62 || s === 96 ? t(s) : s === 34 || s === 39 ? (n.consume(s), m = s, L) : _(s) ? (n.consume(s), x) : D(s);
  }
  function L(s) {
    return s === m ? (n.consume(s), m = null, N) : s === null || E(s) ? t(s) : (n.consume(s), L);
  }
  function D(s) {
    return s === null || s === 34 || s === 39 || s === 47 || s === 60 || s === 61 || s === 62 || s === 96 || $(s) ? F(s) : (n.consume(s), D);
  }
  function N(s) {
    return s === 47 || s === 62 || _(s) ? b(s) : t(s);
  }
  function q(s) {
    return s === 62 ? (n.consume(s), y) : t(s);
  }
  function y(s) {
    return s === null || E(s) ? w(s) : _(s) ? (n.consume(s), y) : t(s);
  }
  function w(s) {
    return s === 45 && u === 2 ? (n.consume(s), V) : s === 60 && u === 1 ? (n.consume(s), R) : s === 62 && u === 4 ? (n.consume(s), Z) : s === 63 && u === 3 ? (n.consume(s), o) : s === 93 && u === 5 ? (n.consume(s), tn) : E(s) && (u === 6 || u === 7) ? (n.exit("htmlFlowData"), n.check(Re, en, M)(s)) : s === null || E(s) ? (n.exit("htmlFlowData"), M(s)) : (n.consume(s), w);
  }
  function M(s) {
    return n.check(He, O, en)(s);
  }
  function O(s) {
    return n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), A;
  }
  function A(s) {
    return s === null || E(s) ? M(s) : (n.enter("htmlFlowData"), w(s));
  }
  function V(s) {
    return s === 45 ? (n.consume(s), o) : w(s);
  }
  function R(s) {
    return s === 47 ? (n.consume(s), l = "", Y) : w(s);
  }
  function Y(s) {
    if (s === 62) {
      const G = l.toLowerCase();
      return Wn.includes(G) ? (n.consume(s), Z) : w(s);
    }
    return v(s) && l.length < 8 ? (n.consume(s), l += String.fromCharCode(s), Y) : w(s);
  }
  function tn(s) {
    return s === 93 ? (n.consume(s), o) : w(s);
  }
  function o(s) {
    return s === 62 ? (n.consume(s), Z) : s === 45 && u === 2 ? (n.consume(s), o) : w(s);
  }
  function Z(s) {
    return s === null || E(s) ? (n.exit("htmlFlowData"), en(s)) : (n.consume(s), Z);
  }
  function en(s) {
    return n.exit("htmlFlow"), r(s);
  }
}
function Qe(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return E(l) ? (n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), i) : t(l);
  }
  function i(l) {
    return e.parser.lazy[e.now().line] ? t(l) : r(l);
  }
}
function Ue(n, r, t) {
  return e;
  function e(u) {
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), n.attempt(bn, r, t);
  }
}
const $e = {
  name: "htmlText",
  tokenize: We
};
function We(n, r, t) {
  const e = this;
  let u, i, l;
  return a;
  function a(o) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(o), m;
  }
  function m(o) {
    return o === 33 ? (n.consume(o), h) : o === 47 ? (n.consume(o), F) : o === 63 ? (n.consume(o), b) : v(o) ? (n.consume(o), D) : t(o);
  }
  function h(o) {
    return o === 45 ? (n.consume(o), p) : o === 91 ? (n.consume(o), i = 0, S) : v(o) ? (n.consume(o), I) : t(o);
  }
  function p(o) {
    return o === 45 ? (n.consume(o), c) : t(o);
  }
  function f(o) {
    return o === null ? t(o) : o === 45 ? (n.consume(o), g) : E(o) ? (l = f, R(o)) : (n.consume(o), f);
  }
  function g(o) {
    return o === 45 ? (n.consume(o), c) : f(o);
  }
  function c(o) {
    return o === 62 ? V(o) : o === 45 ? g(o) : f(o);
  }
  function S(o) {
    const Z = "CDATA[";
    return o === Z.charCodeAt(i++) ? (n.consume(o), i === Z.length ? z : S) : t(o);
  }
  function z(o) {
    return o === null ? t(o) : o === 93 ? (n.consume(o), T) : E(o) ? (l = z, R(o)) : (n.consume(o), z);
  }
  function T(o) {
    return o === 93 ? (n.consume(o), d) : z(o);
  }
  function d(o) {
    return o === 62 ? V(o) : o === 93 ? (n.consume(o), d) : z(o);
  }
  function I(o) {
    return o === null || o === 62 ? V(o) : E(o) ? (l = I, R(o)) : (n.consume(o), I);
  }
  function b(o) {
    return o === null ? t(o) : o === 63 ? (n.consume(o), P) : E(o) ? (l = b, R(o)) : (n.consume(o), b);
  }
  function P(o) {
    return o === 62 ? V(o) : b(o);
  }
  function F(o) {
    return v(o) ? (n.consume(o), x) : t(o);
  }
  function x(o) {
    return o === 45 || W(o) ? (n.consume(o), x) : L(o);
  }
  function L(o) {
    return E(o) ? (l = L, R(o)) : _(o) ? (n.consume(o), L) : V(o);
  }
  function D(o) {
    return o === 45 || W(o) ? (n.consume(o), D) : o === 47 || o === 62 || $(o) ? N(o) : t(o);
  }
  function N(o) {
    return o === 47 ? (n.consume(o), V) : o === 58 || o === 95 || v(o) ? (n.consume(o), q) : E(o) ? (l = N, R(o)) : _(o) ? (n.consume(o), N) : V(o);
  }
  function q(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || W(o) ? (n.consume(o), q) : y(o);
  }
  function y(o) {
    return o === 61 ? (n.consume(o), w) : E(o) ? (l = y, R(o)) : _(o) ? (n.consume(o), y) : N(o);
  }
  function w(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96 ? t(o) : o === 34 || o === 39 ? (n.consume(o), u = o, M) : E(o) ? (l = w, R(o)) : _(o) ? (n.consume(o), w) : (n.consume(o), O);
  }
  function M(o) {
    return o === u ? (n.consume(o), u = void 0, A) : o === null ? t(o) : E(o) ? (l = M, R(o)) : (n.consume(o), M);
  }
  function O(o) {
    return o === null || o === 34 || o === 39 || o === 60 || o === 61 || o === 96 ? t(o) : o === 47 || o === 62 || $(o) ? N(o) : (n.consume(o), O);
  }
  function A(o) {
    return o === 47 || o === 62 || $(o) ? N(o) : t(o);
  }
  function V(o) {
    return o === 62 ? (n.consume(o), n.exit("htmlTextData"), n.exit("htmlText"), r) : t(o);
  }
  function R(o) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), Y;
  }
  function Y(o) {
    return _(o) ? B(n, tn, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : tn(o);
  }
  function tn(o) {
    return n.enter("htmlTextData"), l(o);
  }
}
const An = {
  name: "labelEnd",
  resolveAll: Je,
  resolveTo: Ke,
  tokenize: Xe
}, Ye = {
  tokenize: ve
}, Ze = {
  tokenize: nr
}, Ge = {
  tokenize: tr
};
function Je(n) {
  let r = -1;
  const t = [];
  for (; ++r < n.length; ) {
    const e = n[r][1];
    if (t.push(n[r]), e.type === "labelImage" || e.type === "labelLink" || e.type === "labelEnd") {
      const u = e.type === "labelImage" ? 4 : 2;
      e.type = "data", r += u;
    }
  }
  return n.length !== t.length && nn(n, 0, n.length, t), n;
}
function Ke(n, r) {
  let t = n.length, e = 0, u, i, l, a;
  for (; t--; )
    if (u = n[t][1], i) {
      if (u.type === "link" || u.type === "labelLink" && u._inactive)
        break;
      n[t][0] === "enter" && u.type === "labelLink" && (u._inactive = !0);
    } else if (l) {
      if (n[t][0] === "enter" && (u.type === "labelImage" || u.type === "labelLink") && !u._balanced && (i = t, u.type !== "labelLink")) {
        e = 2;
        break;
      }
    } else u.type === "labelEnd" && (l = t);
  const m = {
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
      ...n[l][1].end
    }
  }, p = {
    type: "labelText",
    start: {
      ...n[i + e + 2][1].end
    },
    end: {
      ...n[l - 2][1].start
    }
  };
  return a = [["enter", m, r], ["enter", h, r]], a = Q(a, n.slice(i + 1, i + e + 3)), a = Q(a, [["enter", p, r]]), a = Q(a, Tn(r.parser.constructs.insideSpan.null, n.slice(i + e + 4, l - 3), r)), a = Q(a, [["exit", p, r], n[l - 2], n[l - 1], ["exit", h, r]]), a = Q(a, n.slice(l + 1)), a = Q(a, [["exit", m, r]]), nn(n, i, n.length, a), n;
}
function Xe(n, r, t) {
  const e = this;
  let u = e.events.length, i, l;
  for (; u--; )
    if ((e.events[u][1].type === "labelImage" || e.events[u][1].type === "labelLink") && !e.events[u][1]._balanced) {
      i = e.events[u][1];
      break;
    }
  return a;
  function a(g) {
    return i ? i._inactive ? f(g) : (l = e.parser.defined.includes(mn(e.sliceSerialize({
      start: i.end,
      end: e.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(g), n.exit("labelMarker"), n.exit("labelEnd"), m) : t(g);
  }
  function m(g) {
    return g === 40 ? n.attempt(Ye, p, l ? p : f)(g) : g === 91 ? n.attempt(Ze, p, l ? h : f)(g) : l ? p(g) : f(g);
  }
  function h(g) {
    return n.attempt(Ge, p, f)(g);
  }
  function p(g) {
    return r(g);
  }
  function f(g) {
    return i._balanced = !0, t(g);
  }
}
function ve(n, r, t) {
  return e;
  function e(f) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(f), n.exit("resourceMarker"), u;
  }
  function u(f) {
    return $(f) ? pn(n, i)(f) : i(f);
  }
  function i(f) {
    return f === 41 ? p(f) : rt(n, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function l(f) {
    return $(f) ? pn(n, m)(f) : p(f);
  }
  function a(f) {
    return t(f);
  }
  function m(f) {
    return f === 34 || f === 39 || f === 40 ? ut(n, h, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : p(f);
  }
  function h(f) {
    return $(f) ? pn(n, p)(f) : p(f);
  }
  function p(f) {
    return f === 41 ? (n.enter("resourceMarker"), n.consume(f), n.exit("resourceMarker"), n.exit("resource"), r) : t(f);
  }
}
function nr(n, r, t) {
  const e = this;
  return u;
  function u(a) {
    return it.call(e, n, i, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function i(a) {
    return e.parser.defined.includes(mn(e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1))) ? r(a) : t(a);
  }
  function l(a) {
    return t(a);
  }
}
function tr(n, r, t) {
  return e;
  function e(i) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), u;
  }
  function u(i) {
    return i === 93 ? (n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), n.exit("reference"), r) : t(i);
  }
}
const er = {
  name: "labelStartImage",
  resolveAll: An.resolveAll,
  tokenize: rr
};
function rr(n, r, t) {
  const e = this;
  return u;
  function u(a) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(a), n.exit("labelImageMarker"), i;
  }
  function i(a) {
    return a === 91 ? (n.enter("labelMarker"), n.consume(a), n.exit("labelMarker"), n.exit("labelImage"), l) : t(a);
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in e.parser.constructs ? t(a) : r(a);
  }
}
const ir = {
  name: "labelStartLink",
  resolveAll: An.resolveAll,
  tokenize: ur
};
function ur(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(l), n.exit("labelMarker"), n.exit("labelLink"), i;
  }
  function i(l) {
    return l === 94 && "_hiddenFootnoteSupport" in e.parser.constructs ? t(l) : r(l);
  }
}
const wn = {
  name: "lineEnding",
  tokenize: lr
};
function lr(n, r) {
  return t;
  function t(e) {
    return n.enter("lineEnding"), n.consume(e), n.exit("lineEnding"), B(n, r, "linePrefix");
  }
}
const Sn = {
  name: "thematicBreak",
  tokenize: ar
};
function ar(n, r, t) {
  let e = 0, u;
  return i;
  function i(h) {
    return n.enter("thematicBreak"), l(h);
  }
  function l(h) {
    return u = h, a(h);
  }
  function a(h) {
    return h === u ? (n.enter("thematicBreakSequence"), m(h)) : e >= 3 && (h === null || E(h)) ? (n.exit("thematicBreak"), r(h)) : t(h);
  }
  function m(h) {
    return h === u ? (n.consume(h), e++, m) : (n.exit("thematicBreakSequence"), _(h) ? B(n, a, "whitespace")(h) : a(h));
  }
}
const U = {
  continuation: {
    tokenize: hr
  },
  exit: pr,
  name: "list",
  tokenize: cr
}, or = {
  partial: !0,
  tokenize: mr
}, sr = {
  partial: !0,
  tokenize: fr
};
function cr(n, r, t) {
  const e = this, u = e.events[e.events.length - 1];
  let i = u && u[1].type === "linePrefix" ? u[2].sliceSerialize(u[1], !0).length : 0, l = 0;
  return a;
  function a(c) {
    const S = e.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (S === "listUnordered" ? !e.containerState.marker || c === e.containerState.marker : En(c)) {
      if (e.containerState.type || (e.containerState.type = S, n.enter(S, {
        _container: !0
      })), S === "listUnordered")
        return n.enter("listItemPrefix"), c === 42 || c === 45 ? n.check(Sn, t, h)(c) : h(c);
      if (!e.interrupt || c === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), m(c);
    }
    return t(c);
  }
  function m(c) {
    return En(c) && ++l < 10 ? (n.consume(c), m) : (!e.interrupt || l < 2) && (e.containerState.marker ? c === e.containerState.marker : c === 41 || c === 46) ? (n.exit("listItemValue"), h(c)) : t(c);
  }
  function h(c) {
    return n.enter("listItemMarker"), n.consume(c), n.exit("listItemMarker"), e.containerState.marker = e.containerState.marker || c, n.check(
      bn,
      // Can’t be empty when interrupting.
      e.interrupt ? t : p,
      n.attempt(or, g, f)
    );
  }
  function p(c) {
    return e.containerState.initialBlankLine = !0, i++, g(c);
  }
  function f(c) {
    return _(c) ? (n.enter("listItemPrefixWhitespace"), n.consume(c), n.exit("listItemPrefixWhitespace"), g) : t(c);
  }
  function g(c) {
    return e.containerState.size = i + e.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(c);
  }
}
function hr(n, r, t) {
  const e = this;
  return e.containerState._closeFlow = void 0, n.check(bn, u, i);
  function u(a) {
    return e.containerState.furtherBlankLines = e.containerState.furtherBlankLines || e.containerState.initialBlankLine, B(n, r, "listItemIndent", e.containerState.size + 1)(a);
  }
  function i(a) {
    return e.containerState.furtherBlankLines || !_(a) ? (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, l(a)) : (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, n.attempt(sr, r, l)(a));
  }
  function l(a) {
    return e.containerState._closeFlow = !0, e.interrupt = void 0, B(n, n.attempt(U, r, t), "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function fr(n, r, t) {
  const e = this;
  return B(n, u, "listItemIndent", e.containerState.size + 1);
  function u(i) {
    const l = e.events[e.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === e.containerState.size ? r(i) : t(i);
  }
}
function pr(n) {
  n.exit(this.containerState.type);
}
function mr(n, r, t) {
  const e = this;
  return B(n, u, "listItemPrefixWhitespace", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function u(i) {
    const l = e.events[e.events.length - 1];
    return !_(i) && l && l[1].type === "listItemPrefixWhitespace" ? r(i) : t(i);
  }
}
const Yn = {
  name: "setextUnderline",
  resolveTo: gr,
  tokenize: xr
};
function gr(n, r) {
  let t = n.length, e, u, i;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        e = t;
        break;
      }
      n[t][1].type === "paragraph" && (u = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1), !i && n[t][1].type === "definition" && (i = t);
  const l = {
    type: "setextHeading",
    start: {
      ...n[e][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[u][1].type = "setextHeadingText", i ? (n.splice(u, 0, ["enter", l, r]), n.splice(i + 1, 0, ["exit", n[e][1], r]), n[e][1].end = {
    ...n[i][1].end
  }) : n[e][1] = l, n.push(["exit", l, r]), n;
}
function xr(n, r, t) {
  const e = this;
  let u;
  return i;
  function i(h) {
    let p = e.events.length, f;
    for (; p--; )
      if (e.events[p][1].type !== "lineEnding" && e.events[p][1].type !== "linePrefix" && e.events[p][1].type !== "content") {
        f = e.events[p][1].type === "paragraph";
        break;
      }
    return !e.parser.lazy[e.now().line] && (e.interrupt || f) ? (n.enter("setextHeadingLine"), u = h, l(h)) : t(h);
  }
  function l(h) {
    return n.enter("setextHeadingLineSequence"), a(h);
  }
  function a(h) {
    return h === u ? (n.consume(h), a) : (n.exit("setextHeadingLineSequence"), _(h) ? B(n, m, "lineSuffix")(h) : m(h));
  }
  function m(h) {
    return h === null || E(h) ? (n.exit("setextHeadingLine"), r(h)) : t(h);
  }
}
const kr = {
  tokenize: dr
};
function dr(n) {
  const r = this, t = n.attempt(
    // Try to parse a blank line.
    bn,
    e,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, u, B(n, n.attempt(this.parser.constructs.flow, u, n.attempt(we, u)), "linePrefix"))
  );
  return t;
  function e(i) {
    if (i === null) {
      n.consume(i);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(i), n.exit("lineEndingBlank"), r.currentConstruct = void 0, t;
  }
  function u(i) {
    if (i === null) {
      n.consume(i);
      return;
    }
    return n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), r.currentConstruct = void 0, t;
  }
}
const Sr = {
  resolveAll: at()
}, br = lt("string"), Ir = lt("text");
function lt(n) {
  return {
    resolveAll: at(n === "text" ? Cr : void 0),
    tokenize: r
  };
  function r(t) {
    const e = this, u = this.parser.constructs[n], i = t.attempt(u, l, a);
    return l;
    function l(p) {
      return h(p) ? i(p) : a(p);
    }
    function a(p) {
      if (p === null) {
        t.consume(p);
        return;
      }
      return t.enter("data"), t.consume(p), m;
    }
    function m(p) {
      return h(p) ? (t.exit("data"), i(p)) : (t.consume(p), m);
    }
    function h(p) {
      if (p === null)
        return !0;
      const f = u[p];
      let g = -1;
      if (f)
        for (; ++g < f.length; ) {
          const c = f[g];
          if (!c.previous || c.previous.call(e, e.previous))
            return !0;
        }
      return !1;
    }
  }
}
function at(n) {
  return r;
  function r(t, e) {
    let u = -1, i;
    for (; ++u <= t.length; )
      i === void 0 ? t[u] && t[u][1].type === "data" && (i = u, u++) : (!t[u] || t[u][1].type !== "data") && (u !== i + 2 && (t[i][1].end = t[u - 1][1].end, t.splice(i + 2, u - i - 2), u = i + 2), i = void 0);
    return n ? n(t, e) : t;
  }
}
function Cr(n, r) {
  let t = 0;
  for (; ++t <= n.length; )
    if ((t === n.length || n[t][1].type === "lineEnding") && n[t - 1][1].type === "data") {
      const e = n[t - 1][1], u = r.sliceStream(e);
      let i = u.length, l = -1, a = 0, m;
      for (; i--; ) {
        const h = u[i];
        if (typeof h == "string") {
          for (l = h.length; h.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
        } else if (h === -2)
          m = !0, a++;
        else if (h !== -1) {
          i++;
          break;
        }
      }
      if (r._contentTypeTextTrailing && t === n.length && (a = 0), a) {
        const h = {
          type: t === n.length || m || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: i ? l : e.start._bufferIndex + l,
            _index: e.start._index + i,
            line: e.end.line,
            column: e.end.column - a,
            offset: e.end.offset - a
          },
          end: {
            ...e.end
          }
        };
        e.end = {
          ...h.start
        }, e.start.offset === e.end.offset ? Object.assign(e, h) : (n.splice(t, 0, ["enter", h, r], ["exit", h, r]), t += 2);
      }
      t++;
    }
  return n;
}
const wr = {
  42: U,
  43: U,
  45: U,
  48: U,
  49: U,
  50: U,
  51: U,
  52: U,
  53: U,
  54: U,
  55: U,
  56: U,
  57: U,
  62: vn
}, yr = {
  91: Te
}, zr = {
  [-2]: Cn,
  [-1]: Cn,
  32: Cn
}, Er = {
  35: Me,
  42: Sn,
  45: [Yn, Sn],
  60: qe,
  61: Yn,
  95: Sn,
  96: $n,
  126: $n
}, Fr = {
  38: tt,
  92: nt
}, Tr = {
  [-5]: wn,
  [-4]: wn,
  [-3]: wn,
  33: er,
  38: tt,
  42: Fn,
  60: [ie, $e],
  91: ir,
  92: [Pe, nt],
  93: An,
  95: Fn,
  96: ke
}, Ar = {
  null: [Fn, Sr]
}, _r = {
  null: [42, 95]
}, Lr = {
  null: []
}, Pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: _r,
  contentInitial: yr,
  disable: Lr,
  document: wr,
  flow: Er,
  flowInitial: zr,
  insideSpan: Ar,
  string: Fr,
  text: Tr
}, Symbol.toStringTag, { value: "Module" }));
function Br(n, r, t) {
  let e = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const u = {}, i = [];
  let l = [], a = [];
  const m = {
    attempt: L(F),
    check: L(x),
    consume: I,
    enter: b,
    exit: P,
    interrupt: L(x, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: z,
    events: [],
    now: S,
    parser: n,
    previous: null,
    sliceSerialize: g,
    sliceStream: c,
    write: f
  };
  let p = r.tokenize.call(h, m);
  return r.resolveAll && i.push(r), h;
  function f(y) {
    return l = Q(l, y), T(), l[l.length - 1] !== null ? [] : (D(r, 0), h.events = Tn(i, h.events, h), h.events);
  }
  function g(y, w) {
    return Or(c(y), w);
  }
  function c(y) {
    return Mr(l, y);
  }
  function S() {
    const {
      _bufferIndex: y,
      _index: w,
      line: M,
      column: O,
      offset: A
    } = e;
    return {
      _bufferIndex: y,
      _index: w,
      line: M,
      column: O,
      offset: A
    };
  }
  function z(y) {
    u[y.line] = y.column, q();
  }
  function T() {
    let y;
    for (; e._index < l.length; ) {
      const w = l[e._index];
      if (typeof w == "string")
        for (y = e._index, e._bufferIndex < 0 && (e._bufferIndex = 0); e._index === y && e._bufferIndex < w.length; )
          d(w.charCodeAt(e._bufferIndex));
      else
        d(w);
    }
  }
  function d(y) {
    p = p(y);
  }
  function I(y) {
    E(y) ? (e.line++, e.column = 1, e.offset += y === -3 ? 2 : 1, q()) : y !== -1 && (e.column++, e.offset++), e._bufferIndex < 0 ? e._index++ : (e._bufferIndex++, e._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[e._index].length && (e._bufferIndex = -1, e._index++)), h.previous = y;
  }
  function b(y, w) {
    const M = w || {};
    return M.type = y, M.start = S(), h.events.push(["enter", M, h]), a.push(M), M;
  }
  function P(y) {
    const w = a.pop();
    return w.end = S(), h.events.push(["exit", w, h]), w;
  }
  function F(y, w) {
    D(y, w.from);
  }
  function x(y, w) {
    w.restore();
  }
  function L(y, w) {
    return M;
    function M(O, A, V) {
      let R, Y, tn, o;
      return Array.isArray(O) ? (
        /* c8 ignore next 1 */
        en(O)
      ) : "tokenize" in O ? (
        // Looks like a construct.
        en([
          /** @type {Construct} */
          O
        ])
      ) : Z(O);
      function Z(H) {
        return cn;
        function cn(un) {
          const on = un !== null && H[un], sn = un !== null && H.null, In = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(on) ? on : on ? [on] : [],
            ...Array.isArray(sn) ? sn : sn ? [sn] : []
          ];
          return en(In)(un);
        }
      }
      function en(H) {
        return R = H, Y = 0, H.length === 0 ? V : s(H[Y]);
      }
      function s(H) {
        return cn;
        function cn(un) {
          return o = N(), tn = H, H.partial || (h.currentConstruct = H), H.name && h.parser.constructs.disable.null.includes(H.name) ? an() : H.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            w ? Object.assign(Object.create(h), w) : h,
            m,
            G,
            an
          )(un);
        }
      }
      function G(H) {
        return y(tn, o), A;
      }
      function an(H) {
        return o.restore(), ++Y < R.length ? s(R[Y]) : V;
      }
    }
  }
  function D(y, w) {
    y.resolveAll && !i.includes(y) && i.push(y), y.resolve && nn(h.events, w, h.events.length - w, y.resolve(h.events.slice(w), h)), y.resolveTo && (h.events = y.resolveTo(h.events, h));
  }
  function N() {
    const y = S(), w = h.previous, M = h.currentConstruct, O = h.events.length, A = Array.from(a);
    return {
      from: O,
      restore: V
    };
    function V() {
      e = y, h.previous = w, h.currentConstruct = M, h.events.length = O, a = A, q();
    }
  }
  function q() {
    e.line in u && e.column < 2 && (e.column = u[e.line], e.offset += u[e.line] - 1);
  }
}
function Mr(n, r) {
  const t = r.start._index, e = r.start._bufferIndex, u = r.end._index, i = r.end._bufferIndex;
  let l;
  if (t === u)
    l = [n[t].slice(e, i)];
  else {
    if (l = n.slice(t, u), e > -1) {
      const a = l[0];
      typeof a == "string" ? l[0] = a.slice(e) : l.shift();
    }
    i > 0 && l.push(n[u].slice(0, i));
  }
  return l;
}
function Or(n, r) {
  let t = -1;
  const e = [];
  let u;
  for (; ++t < n.length; ) {
    const i = n[t];
    let l;
    if (typeof i == "string")
      l = i;
    else switch (i) {
      case -5: {
        l = "\r";
        break;
      }
      case -4: {
        l = `
`;
        break;
      }
      case -3: {
        l = `\r
`;
        break;
      }
      case -2: {
        l = r ? " " : "	";
        break;
      }
      case -1: {
        if (!r && u) continue;
        l = " ";
        break;
      }
      default:
        l = String.fromCharCode(i);
    }
    u = i === -2, e.push(l);
  }
  return e.join("");
}
function Dr(n) {
  const e = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Dt([Pr, ...(n || {}).extensions || []])
    ),
    content: u(Kt),
    defined: [],
    document: u(vt),
    flow: u(kr),
    lazy: {},
    string: u(br),
    text: u(Ir)
  };
  return e;
  function u(i) {
    return l;
    function l(a) {
      return Br(e, i, a);
    }
  }
}
function Nr(n) {
  for (; !et(n); )
    ;
  return n;
}
const Zn = /[\0\t\n\r]/g;
function qr() {
  let n = 1, r = "", t = !0, e;
  return u;
  function u(i, l, a) {
    const m = [];
    let h, p, f, g, c;
    for (i = r + (typeof i == "string" ? i.toString() : new TextDecoder(l || void 0).decode(i)), f = 0, r = "", t && (i.charCodeAt(0) === 65279 && f++, t = void 0); f < i.length; ) {
      if (Zn.lastIndex = f, h = Zn.exec(i), g = h && h.index !== void 0 ? h.index : i.length, c = i.charCodeAt(g), !h) {
        r = i.slice(f);
        break;
      }
      if (c === 10 && f === g && e)
        m.push(-3), e = void 0;
      else
        switch (e && (m.push(-5), e = void 0), f < g && (m.push(i.slice(f, g)), n += g - f), c) {
          case 0: {
            m.push(65533), n++;
            break;
          }
          case 9: {
            for (p = Math.ceil(n / 4) * 4, m.push(-2); n++ < p; ) m.push(-1);
            break;
          }
          case 10: {
            m.push(-4), n = 1;
            break;
          }
          default:
            e = !0, n = 1;
        }
      f = g + 1;
    }
    return a && (e && m.push(-5), r && m.push(r), m.push(null)), m;
  }
}
function Rr(n, r, t) {
  return typeof r != "string" && (t = r, r = void 0), Jt(t)(Nr(Dr(t).document().write(qr()(n, r, !0))));
}
const Hr = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
let Gn = !1, xn, kn, dn;
class Ur {
  options;
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      allowDangerousProtocol: !1,
      extensions: [],
      htmlExtensions: [Vr()]
    };
  }
  // Operations - Highligh previously rendered markdown.
  async highlight(r, t) {
    if (typeof document > "u") return;
    const { highlightElement: e } = await Qr(t);
    r.querySelectorAll('div[class^="shj-lang-"]').forEach((u) => {
      (/shj-lang-([^\s]+)/.exec(u.className) || [])[1] === "javascript" && (e(u, "js", "multiline", { hideLineNumbers: !0 }), Object.assign(u.style, {
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, Liberation Mono, monospace",
        fontSize: "16px"
      }));
    });
  }
  // Operations - Render markdown.
  async render(r, t) {
    return (t?.tables ?? !1) && (!Gn && !xn && (xn = (async () => {
      const e = await import("./index-ZcCBW6Uk.js");
      this.options.extensions?.push(e.gfmTable()), this.options.htmlExtensions?.push(e.gfmTableHtml()), Gn = !0, xn = void 0;
    })()), await xn), Rr(r, this.options);
  }
  // Operations - Set color mode.
  setColorMode(r) {
    ot(r);
  }
}
function ot(n) {
  if (typeof document > "u") return;
  const r = n === "dark" ? "theme-dark" : "theme-light";
  document.querySelectorAll("style[data-dynamic]").forEach((t) => t.disabled = t.id !== r);
}
function Vr() {
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
      codeFencedFenceInfo(r) {
        n !== void 0 && (n.lang = this.sliceSerialize(r));
      },
      codeFencedFenceMeta(r) {
        n !== void 0 && (n.meta = this.sliceSerialize(r));
      },
      codeFlowValue(r) {
        n !== void 0 && n.codeContent.push(this.sliceSerialize(r));
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
        const r = n ?? { codeContent: [], lang: "", meta: "" };
        this.resume();
        const t = r.codeContent.join(`
`), e = r.lang || "plain", u = r.meta || "";
        let i = "";
        e === "json" && u === "datapos-visual" ? i = `<div class="${u}" data-options="${encodeURIComponent(t)}"></div>` : e === "json" && u === "datapos-highcharts" ? i = `<div class="${u}" data-options="${encodeURIComponent(t)}"></div>` : i = `<div class="shj-lang-${e.replaceAll(/[^a-z0-9_-]/gi, "")}">${jr(t)}</div>`, this.raw(i), n = void 0;
      }
    }
  };
}
function jr(n) {
  return n.replaceAll(/[&<>"']/g, (r) => Hr[r]);
}
function Jn(n, r) {
  if (typeof document > "u") return;
  let t = document.getElementById(r);
  t == null && (t = document.createElement("style"), t.id = r, t.dataset.dynamic = "true", document.head.appendChild(t)), t.innerHTML = n, t.disabled = !0;
}
async function Qr(n) {
  return kn || (dn || (dn = (async () => {
    const [r, t, e] = await Promise.all([
      import("./index-BgHmvLYe.js"),
      import("./github-dark-O5tSO1Qn.js"),
      import("./github-light-MQ8W3G6n.js")
    ]);
    return kn = r, Jn(t.default, "theme-dark"), Jn(e.default, "theme-light"), ot(n), dn = void 0, kn;
  })()), dn);
}
export {
  Ur as M,
  _ as a,
  $ as b,
  B as f,
  E as m
};
