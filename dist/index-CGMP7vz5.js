const Rn = document.createElement("i");
function Kn(n) {
  const r = "&" + n + ";";
  Rn.innerHTML = r;
  const t = Rn.textContent;
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
const zn = {}.hasOwnProperty;
function Nt(n) {
  const r = {};
  let t = -1;
  for (; ++t < n.length; )
    qt(r, n[t]);
  return r;
}
function qt(n, r) {
  let t;
  for (t in r) {
    const u = (zn.call(n, t) ? n[t] : void 0) || (n[t] = {}), i = r[t];
    let l;
    if (i)
      for (l in i) {
        zn.call(u, l) || (u[l] = []);
        const a = i[l];
        Rt(
          // @ts-expect-error Looks like a list.
          u[l],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Rt(n, r) {
  let t = -1;
  const e = [];
  for (; ++t < r.length; )
    (r[t].add === "after" ? n : e).push(r[t]);
  nn(n, 0, 0, e);
}
function Ht(n) {
  const r = {};
  let t = -1;
  for (; ++t < n.length; )
    Vt(r, n[t]);
  return r;
}
function Vt(n, r) {
  let t;
  for (t in r) {
    const u = (zn.call(n, t) ? n[t] : void 0) || (n[t] = {}), i = r[t];
    let l;
    if (i)
      for (l in i)
        u[l] = i[l];
  }
}
function jt(n, r) {
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
const Qt = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function Xn(n) {
  return n.replace(/["&<>]/g, r);
  function r(t) {
    return "&" + Qt[
      /** @type {keyof typeof characterReferences} */
      t
    ] + ";";
  }
}
function gn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const X = ln(/[A-Za-z]/), W = ln(/[\dA-Za-z]/), $t = ln(/[#-'*+\--9=?A-Z^-~]/);
function En(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const Fn = ln(/\d/), Ut = ln(/[\dA-Fa-f]/), Wt = ln(/[!-/:-@[-`{-~]/);
function E(n) {
  return n !== null && n < -2;
}
function U(n) {
  return n !== null && (n < 0 || n === 32);
}
function _(n) {
  return n === -2 || n === -1 || n === 32;
}
const Yt = ln(/\p{P}|\p{S}/u), Zt = ln(/\s/);
function ln(n) {
  return r;
  function r(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
function xn(n, r) {
  const t = Xn(vt(n || ""));
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
function vt(n) {
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
const Hn = {}.hasOwnProperty, Vn = /^(https?|ircs?|mailto|xmpp)$/i, Gt = /^https?$/i;
function Jt(n) {
  const r = n || {};
  let t = !0;
  const e = {}, u = [[]], i = [], l = [], p = (
    /** @type {NormalizedHtmlExtension} */
    Ht([{
      enter: {
        blockQuote: A,
        codeFenced: tn,
        codeFencedFenceInfo: T,
        codeFencedFenceMeta: T,
        codeIndented: en,
        codeText: At,
        content: kt,
        definition: ht,
        definitionDestinationString: ft,
        definitionLabelString: T,
        definitionTitleString: T,
        emphasis: Ft,
        htmlFlow: Et,
        htmlText: Mn,
        image: v,
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
        setextHeading: St,
        strong: Tt
      },
      exit: {
        atxHeading: It,
        atxHeadingSequence: dt,
        autolinkEmail: Dt,
        autolinkProtocol: Ot,
        blockQuote: V,
        characterEscapeValue: hn,
        characterReferenceMarkerHexadecimal: On,
        characterReferenceMarkerNumeric: On,
        characterReferenceValue: Mt,
        codeFenced: s,
        codeFencedFence: Z,
        codeFencedFenceInfo: o,
        codeFencedFenceMeta: L,
        codeFlowValue: zt,
        codeIndented: s,
        codeText: _t,
        codeTextData: hn,
        data: hn,
        definition: xt,
        definitionDestinationString: pt,
        definitionLabelString: mt,
        definitionTitleString: gt,
        emphasis: Lt,
        hardBreakEscape: Pn,
        hardBreakTrailing: Pn,
        htmlFlow: Bn,
        htmlFlowData: hn,
        htmlText: Bn,
        htmlTextData: hn,
        image: Ln,
        label: cn,
        labelText: H,
        lineEnding: yt,
        link: Ln,
        listOrdered: C,
        listUnordered: M,
        paragraph: Y,
        reference: L,
        referenceString: un,
        resource: L,
        resourceDestinationString: In,
        resourceTitleString: ct,
        setextHeading: Ct,
        setextHeadingLineSequence: wt,
        setextHeadingText: bt,
        strong: Pt,
        thematicBreak: Bt
      }
    }, ...r.htmlExtensions || []])
  ), h = {
    definitions: e,
    tightStack: l
  }, f = {
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
  let m = r.defaultLineEnding;
  return g;
  function g(k) {
    let w = -1, j = 0;
    const G = [];
    let J = [], rn = [];
    for (; ++w < k.length; )
      !m && (k[w][1].type === "lineEnding" || k[w][1].type === "lineEndingBlank") && (m = /** @type {LineEnding} */
      k[w][2].sliceSerialize(k[w][1])), (k[w][1].type === "listOrdered" || k[w][1].type === "listUnordered") && (k[w][0] === "enter" ? G.push(w) : c(k.slice(G.pop(), w))), k[w][1].type === "definition" && (k[w][0] === "enter" ? (rn = Q(rn, k.slice(j, w)), j = w) : (J = Q(J, k.slice(j, w + 1)), j = w + 1));
    J = Q(J, rn), J = Q(J, k.slice(j)), w = -1;
    const K = J;
    for (p.enter.null && p.enter.null.call(f); ++w < k.length; ) {
      const Dn = p[K[w][0]], Nn = K[w][1].type, qn = Dn[Nn];
      Hn.call(Dn, Nn) && qn && qn.call({
        sliceSerialize: K[w][2].sliceSerialize,
        ...f
      }, K[w][1]);
    }
    return p.exit.null && p.exit.null.call(f), u[0].join("");
  }
  function c(k) {
    const w = k.length;
    let j = 0, G = 0, J = !1, rn;
    for (; ++j < w; ) {
      const K = k[j];
      if (K[1]._container)
        rn = void 0, K[0] === "enter" ? G++ : G--;
      else switch (K[1].type) {
        case "listItemPrefix": {
          K[0] === "exit" && (rn = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          K[0] === "enter" && !G && (rn ? rn = void 0 : J = !0);
          break;
        }
        default:
          rn = void 0;
      }
    }
    k[0][1]._loose = J;
  }
  function S(k, w) {
    h[k] = w;
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
    b(m || `
`);
  }
  function F() {
    const k = u[u.length - 1], w = k[k.length - 1], j = w ? w.charCodeAt(w.length - 1) : null;
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
      const w = Number.parseInt(this.sliceSerialize(k), 10);
      w !== 1 && I(' start="' + x(String(w)) + '"');
    }
  }
  function y() {
    z("expectFirstItem") ? I(">") : O(), F(), I("<li>"), S("expectFirstItem"), S("lastWasTag");
  }
  function C() {
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
  function v() {
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
  function ct() {
    i[i.length - 1].title = d();
  }
  function Ln() {
    let k = i.length - 1;
    const w = i[k], j = w.referenceId || w.labelId, G = w.destination === void 0 ? e[gn(j)] : w;
    for (t = !0; k--; )
      if (i[k].image) {
        t = void 0;
        break;
      }
    w.image ? (I('<img src="' + xn(G.destination, r.allowDangerousProtocol ? void 0 : Gt) + '" alt="'), b(w.label), I('"')) : I('<a href="' + xn(G.destination, r.allowDangerousProtocol ? void 0 : Vn) + '"'), I(G.title ? ' title="' + G.title + '"' : ""), w.image ? I(" />") : (I(">"), b(w.label), I("</a>")), i.pop();
  }
  function ht() {
    T(), i.push({});
  }
  function mt(k) {
    d(), i[i.length - 1].labelId = this.sliceSerialize(k);
  }
  function ft() {
    T(), S("ignoreEncode", !0);
  }
  function pt() {
    i[i.length - 1].destination = d(), S("ignoreEncode");
  }
  function gt() {
    i[i.length - 1].title = d();
  }
  function xt() {
    const k = i[i.length - 1], w = gn(k.labelId);
    d(), Hn.call(e, w) || (e[w] = i[i.length - 1]), i.pop();
  }
  function kt() {
    S("slurpAllLineEndings", !0);
  }
  function dt(k) {
    z("headingRank") || (S("headingRank", this.sliceSerialize(k).length), F(), I("<h" + z("headingRank") + ">"));
  }
  function St() {
    T(), S("slurpAllLineEndings");
  }
  function bt() {
    S("slurpAllLineEndings", !0);
  }
  function It() {
    I("</h" + z("headingRank") + ">"), S("headingRank");
  }
  function wt(k) {
    S("headingRank", this.sliceSerialize(k).charCodeAt(0) === 61 ? 1 : 2);
  }
  function Ct() {
    const k = d();
    F(), I("<h" + z("headingRank") + ">"), b(k), I("</h" + z("headingRank") + ">"), S("slurpAllLineEndings"), S("headingRank");
  }
  function hn(k) {
    b(x(this.sliceSerialize(k)));
  }
  function yt(k) {
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
  function zt(k) {
    b(x(this.sliceSerialize(k))), S("flowCodeSeenData", !0);
  }
  function Pn() {
    I("<br />");
  }
  function Et() {
    F(), Mn();
  }
  function Bn() {
    S("ignoreEncode");
  }
  function Mn() {
    r.allowDangerousHtml && S("ignoreEncode", !0);
  }
  function Ft() {
    I("<em>");
  }
  function Tt() {
    I("<strong>");
  }
  function At() {
    S("inCodeText", !0), I("<code>");
  }
  function _t() {
    S("inCodeText"), I("</code>");
  }
  function Lt() {
    I("</em>");
  }
  function Pt() {
    I("</strong>");
  }
  function Bt() {
    F(), I("<hr />");
  }
  function On(k) {
    S("characterReferenceType", k.type);
  }
  function Mt(k) {
    const w = this.sliceSerialize(k), j = z("characterReferenceType") ? jt(w, z("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : Kn(w);
    b(x(
      /** @type {string} */
      j
    )), S("characterReferenceType");
  }
  function Ot(k) {
    const w = this.sliceSerialize(k);
    I('<a href="' + xn(w, r.allowDangerousProtocol ? void 0 : Vn) + '">'), b(x(w)), I("</a>");
  }
  function Dt(k) {
    const w = this.sliceSerialize(k);
    I('<a href="' + xn("mailto:" + w) + '">'), b(x(w)), I("</a>");
  }
}
function B(n, r, t, e) {
  const u = e ? e - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return l;
  function l(p) {
    return _(p) ? (n.enter(t), a(p)) : r(p);
  }
  function a(p) {
    return _(p) && i++ < u ? (n.consume(p), a) : (n.exit(t), r(p));
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
    const p = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = p), t = p, l(a);
  }
  function l(a) {
    if (a === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(a);
      return;
    }
    return E(a) ? (n.consume(a), n.exit("chunkText"), i) : (n.consume(a), l);
  }
}
const ne = {
  tokenize: te
}, jn = {
  tokenize: ee
};
function te(n) {
  const r = this, t = [];
  let e = 0, u, i, l;
  return a;
  function a(b) {
    if (e < t.length) {
      const P = t[e];
      return r.containerState = P[1], n.attempt(P[0].continuation, p, h)(b);
    }
    return h(b);
  }
  function p(b) {
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
    return r.containerState = {}, n.check(jn, f, m)(b);
  }
  function f(b) {
    return u && I(), d(e), g(b);
  }
  function m(b) {
    return r.parser.lazy[r.now().line] = e !== t.length, l = r.now().offset, S(b);
  }
  function g(b) {
    return r.containerState = {}, n.attempt(jn, c, S)(b);
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
function ee(n, r, t) {
  return B(n, n.attempt(this.parser.constructs.document, r, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Qn(n) {
  if (n === null || U(n) || Zt(n))
    return 1;
  if (Yt(n))
    return 2;
}
function An(n, r, t) {
  const e = [];
  let u = -1;
  for (; ++u < n.length; ) {
    const i = n[u].resolveAll;
    i && !e.includes(i) && (r = i(r, t), e.push(i));
  }
  return r;
}
const Tn = {
  name: "attention",
  resolveAll: re,
  tokenize: ie
};
function re(n, r) {
  let t = -1, e, u, i, l, a, p, h, f;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (e = t; e--; )
        if (n[e][0] === "exit" && n[e][1].type === "attentionSequence" && n[e][1]._open && // If the markers are the same:
        r.sliceSerialize(n[e][1]).charCodeAt(0) === r.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[e][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[e][1].end.offset - n[e][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          p = n[e][1].end.offset - n[e][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const m = {
            ...n[e][1].end
          }, g = {
            ...n[t][1].start
          };
          $n(m, -p), $n(g, p), l = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: m,
            end: {
              ...n[e][1].end
            }
          }, a = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[t][1].start
            },
            end: g
          }, i = {
            type: p > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[e][1].end
            },
            end: {
              ...n[t][1].start
            }
          }, u = {
            type: p > 1 ? "strong" : "emphasis",
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
          }, h = [], n[e][1].end.offset - n[e][1].start.offset && (h = Q(h, [["enter", n[e][1], r], ["exit", n[e][1], r]])), h = Q(h, [["enter", u, r], ["enter", l, r], ["exit", l, r], ["enter", i, r]]), h = Q(h, An(r.parser.constructs.insideSpan.null, n.slice(e + 1, t), r)), h = Q(h, [["exit", i, r], ["enter", a, r], ["exit", a, r], ["exit", u, r]]), n[t][1].end.offset - n[t][1].start.offset ? (f = 2, h = Q(h, [["enter", n[t][1], r], ["exit", n[t][1], r]])) : f = 0, nn(n, e - 1, t - e + 3, h), t = e + h.length - f - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function ie(n, r) {
  const t = this.parser.constructs.attentionMarkers.null, e = this.previous, u = Qn(e);
  let i;
  return l;
  function l(p) {
    return i = p, n.enter("attentionSequence"), a(p);
  }
  function a(p) {
    if (p === i)
      return n.consume(p), a;
    const h = n.exit("attentionSequence"), f = Qn(p), m = !f || f === 2 && u || t.includes(p), g = !u || u === 2 && f || t.includes(e);
    return h._open = !!(i === 42 ? m : m && (u || !g)), h._close = !!(i === 42 ? g : g && (f || !m)), r(p);
  }
}
function $n(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const ue = {
  name: "autolink",
  tokenize: le
};
function le(n, r, t) {
  let e = 0;
  return u;
  function u(c) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), i;
  }
  function i(c) {
    return X(c) ? (n.consume(c), l) : c === 64 ? t(c) : h(c);
  }
  function l(c) {
    return c === 43 || c === 45 || c === 46 || W(c) ? (e = 1, a(c)) : h(c);
  }
  function a(c) {
    return c === 58 ? (n.consume(c), e = 0, p) : (c === 43 || c === 45 || c === 46 || W(c)) && e++ < 32 ? (n.consume(c), a) : (e = 0, h(c));
  }
  function p(c) {
    return c === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), r) : c === null || c === 32 || c === 60 || En(c) ? t(c) : (n.consume(c), p);
  }
  function h(c) {
    return c === 64 ? (n.consume(c), f) : $t(c) ? (n.consume(c), h) : t(c);
  }
  function f(c) {
    return W(c) ? m(c) : t(c);
  }
  function m(c) {
    return c === 46 ? (n.consume(c), e = 0, f) : c === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), r) : g(c);
  }
  function g(c) {
    if ((c === 45 || W(c)) && e++ < 63) {
      const S = c === 45 ? g : m;
      return n.consume(c), S;
    }
    return t(c);
  }
}
const bn = {
  partial: !0,
  tokenize: ae
};
function ae(n, r, t) {
  return e;
  function e(i) {
    return _(i) ? B(n, u, "linePrefix")(i) : u(i);
  }
  function u(i) {
    return i === null || E(i) ? r(i) : t(i);
  }
}
const nt = {
  continuation: {
    tokenize: se
  },
  exit: ce,
  name: "blockQuote",
  tokenize: oe
};
function oe(n, r, t) {
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
function se(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return _(l) ? B(n, i, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : i(l);
  }
  function i(l) {
    return n.attempt(nt, r, t)(l);
  }
}
function ce(n) {
  n.exit("blockQuote");
}
const tt = {
  name: "characterEscape",
  tokenize: he
};
function he(n, r, t) {
  return e;
  function e(i) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(i), n.exit("escapeMarker"), u;
  }
  function u(i) {
    return Wt(i) ? (n.enter("characterEscapeValue"), n.consume(i), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : t(i);
  }
}
const et = {
  name: "characterReference",
  tokenize: me
};
function me(n, r, t) {
  const e = this;
  let u = 0, i, l;
  return a;
  function a(m) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(m), n.exit("characterReferenceMarker"), p;
  }
  function p(m) {
    return m === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(m), n.exit("characterReferenceMarkerNumeric"), h) : (n.enter("characterReferenceValue"), i = 31, l = W, f(m));
  }
  function h(m) {
    return m === 88 || m === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(m), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), i = 6, l = Ut, f) : (n.enter("characterReferenceValue"), i = 7, l = Fn, f(m));
  }
  function f(m) {
    if (m === 59 && u) {
      const g = n.exit("characterReferenceValue");
      return l === W && !Kn(e.sliceSerialize(g)) ? t(m) : (n.enter("characterReferenceMarker"), n.consume(m), n.exit("characterReferenceMarker"), n.exit("characterReference"), r);
    }
    return l(m) && u++ < i ? (n.consume(m), f) : t(m);
  }
}
const Un = {
  partial: !0,
  tokenize: pe
}, Wn = {
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
  return p;
  function p(x) {
    return h(x);
  }
  function h(x) {
    const L = e.events[e.events.length - 1];
    return i = L && L[1].type === "linePrefix" ? L[2].sliceSerialize(L[1], !0).length : 0, a = x, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), f(x);
  }
  function f(x) {
    return x === a ? (l++, n.consume(x), f) : l < 3 ? t(x) : (n.exit("codeFencedFenceSequence"), _(x) ? B(n, m, "whitespace")(x) : m(x));
  }
  function m(x) {
    return x === null || E(x) ? (n.exit("codeFencedFence"), e.interrupt ? r(x) : n.check(Un, z, P)(x)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), g(x));
  }
  function g(x) {
    return x === null || E(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), m(x)) : _(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), B(n, c, "whitespace")(x)) : x === 96 && x === a ? t(x) : (n.consume(x), g);
  }
  function c(x) {
    return x === null || E(x) ? m(x) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), S(x));
  }
  function S(x) {
    return x === null || E(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), m(x)) : x === 96 && x === a ? t(x) : (n.consume(x), S);
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
      return x.enter("codeFencedFence"), _(A) ? B(x, C, "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(A) : C(A);
    }
    function C(A) {
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
const wn = {
  name: "codeIndented",
  tokenize: xe
}, ge = {
  partial: !0,
  tokenize: ke
};
function xe(n, r, t) {
  const e = this;
  return u;
  function u(h) {
    return n.enter("codeIndented"), B(n, i, "linePrefix", 5)(h);
  }
  function i(h) {
    const f = e.events[e.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? l(h) : t(h);
  }
  function l(h) {
    return h === null ? p(h) : E(h) ? n.attempt(ge, l, p)(h) : (n.enter("codeFlowValue"), a(h));
  }
  function a(h) {
    return h === null || E(h) ? (n.exit("codeFlowValue"), l(h)) : (n.consume(h), a);
  }
  function p(h) {
    return n.exit("codeIndented"), r(h);
  }
}
function ke(n, r, t) {
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
const de = {
  name: "codeText",
  previous: be,
  resolve: Se,
  tokenize: Ie
};
function Se(n) {
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
function be(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Ie(n, r, t) {
  let e = 0, u, i;
  return l;
  function l(m) {
    return n.enter("codeText"), n.enter("codeTextSequence"), a(m);
  }
  function a(m) {
    return m === 96 ? (n.consume(m), e++, a) : (n.exit("codeTextSequence"), p(m));
  }
  function p(m) {
    return m === null ? t(m) : m === 32 ? (n.enter("space"), n.consume(m), n.exit("space"), p) : m === 96 ? (i = n.enter("codeTextSequence"), u = 0, f(m)) : E(m) ? (n.enter("lineEnding"), n.consume(m), n.exit("lineEnding"), p) : (n.enter("codeTextData"), h(m));
  }
  function h(m) {
    return m === null || m === 32 || m === 96 || E(m) ? (n.exit("codeTextData"), p(m)) : (n.consume(m), h);
  }
  function f(m) {
    return m === 96 ? (n.consume(m), u++, f) : u === e ? (n.exit("codeTextSequence"), n.exit("codeText"), r(m)) : (i.type = "codeTextData", h(m));
  }
}
class we {
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
    return e && mn(this.left, e), i.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), mn(this.left, r);
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
    this.setCursor(0), mn(this.right, r.reverse());
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
        mn(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - r, Number.POSITIVE_INFINITY);
        mn(this.left, t.reverse());
      }
  }
}
function mn(n, r) {
  let t = 0;
  if (r.length < 1e4)
    n.push(...r);
  else
    for (; t < r.length; )
      n.push(...r.slice(t, t + 1e4)), t += 1e4;
}
function rt(n) {
  const r = {};
  let t = -1, e, u, i, l, a, p, h;
  const f = new we(n);
  for (; ++t < f.length; ) {
    for (; t in r; )
      t = r[t];
    if (e = f.get(t), t && e[1].type === "chunkFlow" && f.get(t - 1)[1].type === "listItemPrefix" && (p = e[1]._tokenizer.events, i = 0, i < p.length && p[i][1].type === "lineEndingBlank" && (i += 2), i < p.length && p[i][1].type === "content"))
      for (; ++i < p.length && p[i][1].type !== "content"; )
        p[i][1].type === "chunkText" && (p[i][1]._isInFirstContentOfListItem = !0, i++);
    if (e[0] === "enter")
      e[1].contentType && (Object.assign(r, Ce(f, t)), t = r[t], h = !0);
    else if (e[1]._container) {
      for (i = t, u = void 0; i--; )
        if (l = f.get(i), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (u && (f.get(u)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", u = i);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      u && (e[1].end = {
        ...f.get(u)[1].start
      }, a = f.slice(u, t), a.unshift(e), f.splice(u, t - u + 1, a));
    }
  }
  return nn(n, 0, Number.POSITIVE_INFINITY, f.slice(0)), !h;
}
function Ce(n, r) {
  const t = n.get(r)[1], e = n.get(r)[2];
  let u = r - 1;
  const i = [];
  let l = t._tokenizer;
  l || (l = e.parser[t.contentType](t.start), t._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, p = [], h = {};
  let f, m, g = -1, c = t, S = 0, z = 0;
  const T = [z];
  for (; c; ) {
    for (; n.get(++u)[1] !== c; )
      ;
    i.push(u), c._tokenizer || (f = e.sliceStream(c), c.next || f.push(null), m && l.defineSkip(c.start), c._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(f), c._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), m = c, c = c.next;
  }
  for (c = t; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (z = g + 1, T.push(z), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (l.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : T.pop(), g = T.length; g--; ) {
    const d = a.slice(T[g], T[g + 1]), I = i.pop();
    p.push([I, I + d.length - 1]), n.splice(I, 2, d);
  }
  for (p.reverse(), g = -1; ++g < p.length; )
    h[S + p[g][0]] = S + p[g][1], S += p[g][1] - p[g][0] - 1;
  return h;
}
const ye = {
  resolve: Ee,
  tokenize: Fe
}, ze = {
  partial: !0,
  tokenize: Te
};
function Ee(n) {
  return rt(n), n;
}
function Fe(n, r) {
  let t;
  return e;
  function e(a) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), u(a);
  }
  function u(a) {
    return a === null ? i(a) : E(a) ? n.check(ze, l, i)(a) : (n.consume(a), u);
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
function Te(n, r, t) {
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
function it(n, r, t, e, u, i, l, a, p) {
  const h = p || Number.POSITIVE_INFINITY;
  let f = 0;
  return m;
  function m(d) {
    return d === 60 ? (n.enter(e), n.enter(u), n.enter(i), n.consume(d), n.exit(i), g) : d === null || d === 32 || d === 41 || En(d) ? t(d) : (n.enter(e), n.enter(l), n.enter(a), n.enter("chunkString", {
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
    return !f && (d === null || d === 41 || U(d)) ? (n.exit("chunkString"), n.exit(a), n.exit(l), n.exit(e), r(d)) : f < h && d === 40 ? (n.consume(d), f++, z) : d === 41 ? (n.consume(d), f--, z) : d === null || d === 32 || d === 40 || En(d) ? t(d) : (n.consume(d), d === 92 ? T : z);
  }
  function T(d) {
    return d === 40 || d === 41 || d === 92 ? (n.consume(d), z) : z(d);
  }
}
function ut(n, r, t, e, u, i) {
  const l = this;
  let a = 0, p;
  return h;
  function h(c) {
    return n.enter(e), n.enter(u), n.consume(c), n.exit(u), n.enter(i), f;
  }
  function f(c) {
    return a > 999 || c === null || c === 91 || c === 93 && !p || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? t(c) : c === 93 ? (n.exit(i), n.enter(u), n.consume(c), n.exit(u), n.exit(e), r) : E(c) ? (n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), f) : (n.enter("chunkString", {
      contentType: "string"
    }), m(c));
  }
  function m(c) {
    return c === null || c === 91 || c === 93 || E(c) || a++ > 999 ? (n.exit("chunkString"), f(c)) : (n.consume(c), p || (p = !_(c)), c === 92 ? g : m);
  }
  function g(c) {
    return c === 91 || c === 92 || c === 93 ? (n.consume(c), a++, m) : m(c);
  }
}
function lt(n, r, t, e, u, i) {
  let l;
  return a;
  function a(g) {
    return g === 34 || g === 39 || g === 40 ? (n.enter(e), n.enter(u), n.consume(g), n.exit(u), l = g === 40 ? 41 : g, p) : t(g);
  }
  function p(g) {
    return g === l ? (n.enter(u), n.consume(g), n.exit(u), n.exit(e), r) : (n.enter(i), h(g));
  }
  function h(g) {
    return g === l ? (n.exit(i), p(l)) : g === null ? t(g) : E(g) ? (n.enter("lineEnding"), n.consume(g), n.exit("lineEnding"), B(n, h, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), f(g));
  }
  function f(g) {
    return g === l || g === null || E(g) ? (n.exit("chunkString"), h(g)) : (n.consume(g), g === 92 ? m : f);
  }
  function m(g) {
    return g === l || g === 92 ? (n.consume(g), f) : f(g);
  }
}
function pn(n, r) {
  let t;
  return e;
  function e(u) {
    return E(u) ? (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), t = !0, e) : _(u) ? B(n, e, t ? "linePrefix" : "lineSuffix")(u) : r(u);
  }
}
const Ae = {
  name: "definition",
  tokenize: Le
}, _e = {
  partial: !0,
  tokenize: Pe
};
function Le(n, r, t) {
  const e = this;
  let u;
  return i;
  function i(c) {
    return n.enter("definition"), l(c);
  }
  function l(c) {
    return ut.call(
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
    return u = gn(e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1)), c === 58 ? (n.enter("definitionMarker"), n.consume(c), n.exit("definitionMarker"), p) : t(c);
  }
  function p(c) {
    return U(c) ? pn(n, h)(c) : h(c);
  }
  function h(c) {
    return it(
      n,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(c);
  }
  function f(c) {
    return n.attempt(_e, m, m)(c);
  }
  function m(c) {
    return _(c) ? B(n, g, "whitespace")(c) : g(c);
  }
  function g(c) {
    return c === null || E(c) ? (n.exit("definition"), e.parser.defined.push(u), r(c)) : t(c);
  }
}
function Pe(n, r, t) {
  return e;
  function e(a) {
    return U(a) ? pn(n, u)(a) : t(a);
  }
  function u(a) {
    return lt(n, i, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function i(a) {
    return _(a) ? B(n, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || E(a) ? r(a) : t(a);
  }
}
const Be = {
  name: "hardBreakEscape",
  tokenize: Me
};
function Me(n, r, t) {
  return e;
  function e(i) {
    return n.enter("hardBreakEscape"), n.consume(i), u;
  }
  function u(i) {
    return E(i) ? (n.exit("hardBreakEscape"), r(i)) : t(i);
  }
}
const Oe = {
  name: "headingAtx",
  resolve: De,
  tokenize: Ne
};
function De(n, r) {
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
function Ne(n, r, t) {
  let e = 0;
  return u;
  function u(f) {
    return n.enter("atxHeading"), i(f);
  }
  function i(f) {
    return n.enter("atxHeadingSequence"), l(f);
  }
  function l(f) {
    return f === 35 && e++ < 6 ? (n.consume(f), l) : f === null || U(f) ? (n.exit("atxHeadingSequence"), a(f)) : t(f);
  }
  function a(f) {
    return f === 35 ? (n.enter("atxHeadingSequence"), p(f)) : f === null || E(f) ? (n.exit("atxHeading"), r(f)) : _(f) ? B(n, a, "whitespace")(f) : (n.enter("atxHeadingText"), h(f));
  }
  function p(f) {
    return f === 35 ? (n.consume(f), p) : (n.exit("atxHeadingSequence"), a(f));
  }
  function h(f) {
    return f === null || f === 35 || U(f) ? (n.exit("atxHeadingText"), a(f)) : (n.consume(f), h);
  }
}
const qe = [
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
], Yn = ["pre", "script", "style", "textarea"], Re = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: je,
  tokenize: Qe
}, He = {
  partial: !0,
  tokenize: Ue
}, Ve = {
  partial: !0,
  tokenize: $e
};
function je(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function Qe(n, r, t) {
  const e = this;
  let u, i, l, a, p;
  return h;
  function h(s) {
    return f(s);
  }
  function f(s) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(s), m;
  }
  function m(s) {
    return s === 33 ? (n.consume(s), g) : s === 47 ? (n.consume(s), i = !0, z) : s === 63 ? (n.consume(s), u = 3, e.interrupt ? r : o) : X(s) ? (n.consume(s), l = String.fromCharCode(s), T) : t(s);
  }
  function g(s) {
    return s === 45 ? (n.consume(s), u = 2, c) : s === 91 ? (n.consume(s), u = 5, a = 0, S) : X(s) ? (n.consume(s), u = 4, e.interrupt ? r : o) : t(s);
  }
  function c(s) {
    return s === 45 ? (n.consume(s), e.interrupt ? r : o) : t(s);
  }
  function S(s) {
    const v = "CDATA[";
    return s === v.charCodeAt(a++) ? (n.consume(s), a === v.length ? e.interrupt ? r : C : S) : t(s);
  }
  function z(s) {
    return X(s) ? (n.consume(s), l = String.fromCharCode(s), T) : t(s);
  }
  function T(s) {
    if (s === null || s === 47 || s === 62 || U(s)) {
      const v = s === 47, an = l.toLowerCase();
      return !v && !i && Yn.includes(an) ? (u = 1, e.interrupt ? r(s) : C(s)) : qe.includes(l.toLowerCase()) ? (u = 6, v ? (n.consume(s), d) : e.interrupt ? r(s) : C(s)) : (u = 7, e.interrupt && !e.parser.lazy[e.now().line] ? t(s) : i ? I(s) : b(s));
    }
    return s === 45 || W(s) ? (n.consume(s), l += String.fromCharCode(s), T) : t(s);
  }
  function d(s) {
    return s === 62 ? (n.consume(s), e.interrupt ? r : C) : t(s);
  }
  function I(s) {
    return _(s) ? (n.consume(s), I) : q(s);
  }
  function b(s) {
    return s === 47 ? (n.consume(s), q) : s === 58 || s === 95 || X(s) ? (n.consume(s), P) : _(s) ? (n.consume(s), b) : q(s);
  }
  function P(s) {
    return s === 45 || s === 46 || s === 58 || s === 95 || W(s) ? (n.consume(s), P) : F(s);
  }
  function F(s) {
    return s === 61 ? (n.consume(s), x) : _(s) ? (n.consume(s), F) : b(s);
  }
  function x(s) {
    return s === null || s === 60 || s === 61 || s === 62 || s === 96 ? t(s) : s === 34 || s === 39 ? (n.consume(s), p = s, L) : _(s) ? (n.consume(s), x) : D(s);
  }
  function L(s) {
    return s === p ? (n.consume(s), p = null, N) : s === null || E(s) ? t(s) : (n.consume(s), L);
  }
  function D(s) {
    return s === null || s === 34 || s === 39 || s === 47 || s === 60 || s === 61 || s === 62 || s === 96 || U(s) ? F(s) : (n.consume(s), D);
  }
  function N(s) {
    return s === 47 || s === 62 || _(s) ? b(s) : t(s);
  }
  function q(s) {
    return s === 62 ? (n.consume(s), y) : t(s);
  }
  function y(s) {
    return s === null || E(s) ? C(s) : _(s) ? (n.consume(s), y) : t(s);
  }
  function C(s) {
    return s === 45 && u === 2 ? (n.consume(s), V) : s === 60 && u === 1 ? (n.consume(s), R) : s === 62 && u === 4 ? (n.consume(s), Z) : s === 63 && u === 3 ? (n.consume(s), o) : s === 93 && u === 5 ? (n.consume(s), tn) : E(s) && (u === 6 || u === 7) ? (n.exit("htmlFlowData"), n.check(He, en, M)(s)) : s === null || E(s) ? (n.exit("htmlFlowData"), M(s)) : (n.consume(s), C);
  }
  function M(s) {
    return n.check(Ve, O, en)(s);
  }
  function O(s) {
    return n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), A;
  }
  function A(s) {
    return s === null || E(s) ? M(s) : (n.enter("htmlFlowData"), C(s));
  }
  function V(s) {
    return s === 45 ? (n.consume(s), o) : C(s);
  }
  function R(s) {
    return s === 47 ? (n.consume(s), l = "", Y) : C(s);
  }
  function Y(s) {
    if (s === 62) {
      const v = l.toLowerCase();
      return Yn.includes(v) ? (n.consume(s), Z) : C(s);
    }
    return X(s) && l.length < 8 ? (n.consume(s), l += String.fromCharCode(s), Y) : C(s);
  }
  function tn(s) {
    return s === 93 ? (n.consume(s), o) : C(s);
  }
  function o(s) {
    return s === 62 ? (n.consume(s), Z) : s === 45 && u === 2 ? (n.consume(s), o) : C(s);
  }
  function Z(s) {
    return s === null || E(s) ? (n.exit("htmlFlowData"), en(s)) : (n.consume(s), Z);
  }
  function en(s) {
    return n.exit("htmlFlow"), r(s);
  }
}
function $e(n, r, t) {
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
const We = {
  name: "htmlText",
  tokenize: Ye
};
function Ye(n, r, t) {
  const e = this;
  let u, i, l;
  return a;
  function a(o) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(o), p;
  }
  function p(o) {
    return o === 33 ? (n.consume(o), h) : o === 47 ? (n.consume(o), F) : o === 63 ? (n.consume(o), b) : X(o) ? (n.consume(o), D) : t(o);
  }
  function h(o) {
    return o === 45 ? (n.consume(o), f) : o === 91 ? (n.consume(o), i = 0, S) : X(o) ? (n.consume(o), I) : t(o);
  }
  function f(o) {
    return o === 45 ? (n.consume(o), c) : t(o);
  }
  function m(o) {
    return o === null ? t(o) : o === 45 ? (n.consume(o), g) : E(o) ? (l = m, R(o)) : (n.consume(o), m);
  }
  function g(o) {
    return o === 45 ? (n.consume(o), c) : m(o);
  }
  function c(o) {
    return o === 62 ? V(o) : o === 45 ? g(o) : m(o);
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
    return X(o) ? (n.consume(o), x) : t(o);
  }
  function x(o) {
    return o === 45 || W(o) ? (n.consume(o), x) : L(o);
  }
  function L(o) {
    return E(o) ? (l = L, R(o)) : _(o) ? (n.consume(o), L) : V(o);
  }
  function D(o) {
    return o === 45 || W(o) ? (n.consume(o), D) : o === 47 || o === 62 || U(o) ? N(o) : t(o);
  }
  function N(o) {
    return o === 47 ? (n.consume(o), V) : o === 58 || o === 95 || X(o) ? (n.consume(o), q) : E(o) ? (l = N, R(o)) : _(o) ? (n.consume(o), N) : V(o);
  }
  function q(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || W(o) ? (n.consume(o), q) : y(o);
  }
  function y(o) {
    return o === 61 ? (n.consume(o), C) : E(o) ? (l = y, R(o)) : _(o) ? (n.consume(o), y) : N(o);
  }
  function C(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96 ? t(o) : o === 34 || o === 39 ? (n.consume(o), u = o, M) : E(o) ? (l = C, R(o)) : _(o) ? (n.consume(o), C) : (n.consume(o), O);
  }
  function M(o) {
    return o === u ? (n.consume(o), u = void 0, A) : o === null ? t(o) : E(o) ? (l = M, R(o)) : (n.consume(o), M);
  }
  function O(o) {
    return o === null || o === 34 || o === 39 || o === 60 || o === 61 || o === 96 ? t(o) : o === 47 || o === 62 || U(o) ? N(o) : (n.consume(o), O);
  }
  function A(o) {
    return o === 47 || o === 62 || U(o) ? N(o) : t(o);
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
const _n = {
  name: "labelEnd",
  resolveAll: Je,
  resolveTo: Ke,
  tokenize: Xe
}, Ze = {
  tokenize: nr
}, ve = {
  tokenize: tr
}, Ge = {
  tokenize: er
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
  const p = {
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
  }, f = {
    type: "labelText",
    start: {
      ...n[i + e + 2][1].end
    },
    end: {
      ...n[l - 2][1].start
    }
  };
  return a = [["enter", p, r], ["enter", h, r]], a = Q(a, n.slice(i + 1, i + e + 3)), a = Q(a, [["enter", f, r]]), a = Q(a, An(r.parser.constructs.insideSpan.null, n.slice(i + e + 4, l - 3), r)), a = Q(a, [["exit", f, r], n[l - 2], n[l - 1], ["exit", h, r]]), a = Q(a, n.slice(l + 1)), a = Q(a, [["exit", p, r]]), nn(n, i, n.length, a), n;
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
    return i ? i._inactive ? m(g) : (l = e.parser.defined.includes(gn(e.sliceSerialize({
      start: i.end,
      end: e.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(g), n.exit("labelMarker"), n.exit("labelEnd"), p) : t(g);
  }
  function p(g) {
    return g === 40 ? n.attempt(Ze, f, l ? f : m)(g) : g === 91 ? n.attempt(ve, f, l ? h : m)(g) : l ? f(g) : m(g);
  }
  function h(g) {
    return n.attempt(Ge, f, m)(g);
  }
  function f(g) {
    return r(g);
  }
  function m(g) {
    return i._balanced = !0, t(g);
  }
}
function nr(n, r, t) {
  return e;
  function e(m) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(m), n.exit("resourceMarker"), u;
  }
  function u(m) {
    return U(m) ? pn(n, i)(m) : i(m);
  }
  function i(m) {
    return m === 41 ? f(m) : it(n, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(m);
  }
  function l(m) {
    return U(m) ? pn(n, p)(m) : f(m);
  }
  function a(m) {
    return t(m);
  }
  function p(m) {
    return m === 34 || m === 39 || m === 40 ? lt(n, h, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(m) : f(m);
  }
  function h(m) {
    return U(m) ? pn(n, f)(m) : f(m);
  }
  function f(m) {
    return m === 41 ? (n.enter("resourceMarker"), n.consume(m), n.exit("resourceMarker"), n.exit("resource"), r) : t(m);
  }
}
function tr(n, r, t) {
  const e = this;
  return u;
  function u(a) {
    return ut.call(e, n, i, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function i(a) {
    return e.parser.defined.includes(gn(e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1))) ? r(a) : t(a);
  }
  function l(a) {
    return t(a);
  }
}
function er(n, r, t) {
  return e;
  function e(i) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), u;
  }
  function u(i) {
    return i === 93 ? (n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), n.exit("reference"), r) : t(i);
  }
}
const rr = {
  name: "labelStartImage",
  resolveAll: _n.resolveAll,
  tokenize: ir
};
function ir(n, r, t) {
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
const ur = {
  name: "labelStartLink",
  resolveAll: _n.resolveAll,
  tokenize: lr
};
function lr(n, r, t) {
  const e = this;
  return u;
  function u(l) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(l), n.exit("labelMarker"), n.exit("labelLink"), i;
  }
  function i(l) {
    return l === 94 && "_hiddenFootnoteSupport" in e.parser.constructs ? t(l) : r(l);
  }
}
const Cn = {
  name: "lineEnding",
  tokenize: ar
};
function ar(n, r) {
  return t;
  function t(e) {
    return n.enter("lineEnding"), n.consume(e), n.exit("lineEnding"), B(n, r, "linePrefix");
  }
}
const Sn = {
  name: "thematicBreak",
  tokenize: or
};
function or(n, r, t) {
  let e = 0, u;
  return i;
  function i(h) {
    return n.enter("thematicBreak"), l(h);
  }
  function l(h) {
    return u = h, a(h);
  }
  function a(h) {
    return h === u ? (n.enter("thematicBreakSequence"), p(h)) : e >= 3 && (h === null || E(h)) ? (n.exit("thematicBreak"), r(h)) : t(h);
  }
  function p(h) {
    return h === u ? (n.consume(h), e++, p) : (n.exit("thematicBreakSequence"), _(h) ? B(n, a, "whitespace")(h) : a(h));
  }
}
const $ = {
  continuation: {
    tokenize: mr
  },
  exit: pr,
  name: "list",
  tokenize: hr
}, sr = {
  partial: !0,
  tokenize: gr
}, cr = {
  partial: !0,
  tokenize: fr
};
function hr(n, r, t) {
  const e = this, u = e.events[e.events.length - 1];
  let i = u && u[1].type === "linePrefix" ? u[2].sliceSerialize(u[1], !0).length : 0, l = 0;
  return a;
  function a(c) {
    const S = e.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (S === "listUnordered" ? !e.containerState.marker || c === e.containerState.marker : Fn(c)) {
      if (e.containerState.type || (e.containerState.type = S, n.enter(S, {
        _container: !0
      })), S === "listUnordered")
        return n.enter("listItemPrefix"), c === 42 || c === 45 ? n.check(Sn, t, h)(c) : h(c);
      if (!e.interrupt || c === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), p(c);
    }
    return t(c);
  }
  function p(c) {
    return Fn(c) && ++l < 10 ? (n.consume(c), p) : (!e.interrupt || l < 2) && (e.containerState.marker ? c === e.containerState.marker : c === 41 || c === 46) ? (n.exit("listItemValue"), h(c)) : t(c);
  }
  function h(c) {
    return n.enter("listItemMarker"), n.consume(c), n.exit("listItemMarker"), e.containerState.marker = e.containerState.marker || c, n.check(
      bn,
      // Can’t be empty when interrupting.
      e.interrupt ? t : f,
      n.attempt(sr, g, m)
    );
  }
  function f(c) {
    return e.containerState.initialBlankLine = !0, i++, g(c);
  }
  function m(c) {
    return _(c) ? (n.enter("listItemPrefixWhitespace"), n.consume(c), n.exit("listItemPrefixWhitespace"), g) : t(c);
  }
  function g(c) {
    return e.containerState.size = i + e.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(c);
  }
}
function mr(n, r, t) {
  const e = this;
  return e.containerState._closeFlow = void 0, n.check(bn, u, i);
  function u(a) {
    return e.containerState.furtherBlankLines = e.containerState.furtherBlankLines || e.containerState.initialBlankLine, B(n, r, "listItemIndent", e.containerState.size + 1)(a);
  }
  function i(a) {
    return e.containerState.furtherBlankLines || !_(a) ? (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, l(a)) : (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, n.attempt(cr, r, l)(a));
  }
  function l(a) {
    return e.containerState._closeFlow = !0, e.interrupt = void 0, B(n, n.attempt($, r, t), "linePrefix", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
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
function gr(n, r, t) {
  const e = this;
  return B(n, u, "listItemPrefixWhitespace", e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function u(i) {
    const l = e.events[e.events.length - 1];
    return !_(i) && l && l[1].type === "listItemPrefixWhitespace" ? r(i) : t(i);
  }
}
const Zn = {
  name: "setextUnderline",
  resolveTo: xr,
  tokenize: kr
};
function xr(n, r) {
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
function kr(n, r, t) {
  const e = this;
  let u;
  return i;
  function i(h) {
    let f = e.events.length, m;
    for (; f--; )
      if (e.events[f][1].type !== "lineEnding" && e.events[f][1].type !== "linePrefix" && e.events[f][1].type !== "content") {
        m = e.events[f][1].type === "paragraph";
        break;
      }
    return !e.parser.lazy[e.now().line] && (e.interrupt || m) ? (n.enter("setextHeadingLine"), u = h, l(h)) : t(h);
  }
  function l(h) {
    return n.enter("setextHeadingLineSequence"), a(h);
  }
  function a(h) {
    return h === u ? (n.consume(h), a) : (n.exit("setextHeadingLineSequence"), _(h) ? B(n, p, "lineSuffix")(h) : p(h));
  }
  function p(h) {
    return h === null || E(h) ? (n.exit("setextHeadingLine"), r(h)) : t(h);
  }
}
const dr = {
  tokenize: Sr
};
function Sr(n) {
  const r = this, t = n.attempt(
    // Try to parse a blank line.
    bn,
    e,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, u, B(n, n.attempt(this.parser.constructs.flow, u, n.attempt(ye, u)), "linePrefix"))
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
const br = {
  resolveAll: ot()
}, Ir = at("string"), wr = at("text");
function at(n) {
  return {
    resolveAll: ot(n === "text" ? Cr : void 0),
    tokenize: r
  };
  function r(t) {
    const e = this, u = this.parser.constructs[n], i = t.attempt(u, l, a);
    return l;
    function l(f) {
      return h(f) ? i(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        t.consume(f);
        return;
      }
      return t.enter("data"), t.consume(f), p;
    }
    function p(f) {
      return h(f) ? (t.exit("data"), i(f)) : (t.consume(f), p);
    }
    function h(f) {
      if (f === null)
        return !0;
      const m = u[f];
      let g = -1;
      if (m)
        for (; ++g < m.length; ) {
          const c = m[g];
          if (!c.previous || c.previous.call(e, e.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ot(n) {
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
      let i = u.length, l = -1, a = 0, p;
      for (; i--; ) {
        const h = u[i];
        if (typeof h == "string") {
          for (l = h.length; h.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
        } else if (h === -2)
          p = !0, a++;
        else if (h !== -1) {
          i++;
          break;
        }
      }
      if (r._contentTypeTextTrailing && t === n.length && (a = 0), a) {
        const h = {
          type: t === n.length || p || a < 2 ? "lineSuffix" : "hardBreakTrailing",
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
const yr = {
  42: $,
  43: $,
  45: $,
  48: $,
  49: $,
  50: $,
  51: $,
  52: $,
  53: $,
  54: $,
  55: $,
  56: $,
  57: $,
  62: nt
}, zr = {
  91: Ae
}, Er = {
  [-2]: wn,
  [-1]: wn,
  32: wn
}, Fr = {
  35: Oe,
  42: Sn,
  45: [Zn, Sn],
  60: Re,
  61: Zn,
  95: Sn,
  96: Wn,
  126: Wn
}, Tr = {
  38: et,
  92: tt
}, Ar = {
  [-5]: Cn,
  [-4]: Cn,
  [-3]: Cn,
  33: rr,
  38: et,
  42: Tn,
  60: [ue, We],
  91: ur,
  92: [Be, tt],
  93: _n,
  95: Tn,
  96: de
}, _r = {
  null: [Tn, br]
}, Lr = {
  null: [42, 95]
}, Pr = {
  null: []
}, Br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Lr,
  contentInitial: zr,
  disable: Pr,
  document: yr,
  flow: Fr,
  flowInitial: Er,
  insideSpan: _r,
  string: Tr,
  text: Ar
}, Symbol.toStringTag, { value: "Module" }));
function Mr(n, r, t) {
  let e = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const u = {}, i = [];
  let l = [], a = [];
  const p = {
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
    write: m
  };
  let f = r.tokenize.call(h, p);
  return r.resolveAll && i.push(r), h;
  function m(y) {
    return l = Q(l, y), T(), l[l.length - 1] !== null ? [] : (D(r, 0), h.events = An(i, h.events, h), h.events);
  }
  function g(y, C) {
    return Dr(c(y), C);
  }
  function c(y) {
    return Or(l, y);
  }
  function S() {
    const {
      _bufferIndex: y,
      _index: C,
      line: M,
      column: O,
      offset: A
    } = e;
    return {
      _bufferIndex: y,
      _index: C,
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
      const C = l[e._index];
      if (typeof C == "string")
        for (y = e._index, e._bufferIndex < 0 && (e._bufferIndex = 0); e._index === y && e._bufferIndex < C.length; )
          d(C.charCodeAt(e._bufferIndex));
      else
        d(C);
    }
  }
  function d(y) {
    f = f(y);
  }
  function I(y) {
    E(y) ? (e.line++, e.column = 1, e.offset += y === -3 ? 2 : 1, q()) : y !== -1 && (e.column++, e.offset++), e._bufferIndex < 0 ? e._index++ : (e._bufferIndex++, e._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[e._index].length && (e._bufferIndex = -1, e._index++)), h.previous = y;
  }
  function b(y, C) {
    const M = C || {};
    return M.type = y, M.start = S(), h.events.push(["enter", M, h]), a.push(M), M;
  }
  function P(y) {
    const C = a.pop();
    return C.end = S(), h.events.push(["exit", C, h]), C;
  }
  function F(y, C) {
    D(y, C.from);
  }
  function x(y, C) {
    C.restore();
  }
  function L(y, C) {
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
            C ? Object.assign(Object.create(h), C) : h,
            p,
            v,
            an
          )(un);
        }
      }
      function v(H) {
        return y(tn, o), A;
      }
      function an(H) {
        return o.restore(), ++Y < R.length ? s(R[Y]) : V;
      }
    }
  }
  function D(y, C) {
    y.resolveAll && !i.includes(y) && i.push(y), y.resolve && nn(h.events, C, h.events.length - C, y.resolve(h.events.slice(C), h)), y.resolveTo && (h.events = y.resolveTo(h.events, h));
  }
  function N() {
    const y = S(), C = h.previous, M = h.currentConstruct, O = h.events.length, A = Array.from(a);
    return {
      from: O,
      restore: V
    };
    function V() {
      e = y, h.previous = C, h.currentConstruct = M, h.events.length = O, a = A, q();
    }
  }
  function q() {
    e.line in u && e.column < 2 && (e.column = u[e.line], e.offset += u[e.line] - 1);
  }
}
function Or(n, r) {
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
function Dr(n, r) {
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
function Nr(n) {
  const e = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Nt([Br, ...(n || {}).extensions || []])
    ),
    content: u(Kt),
    defined: [],
    document: u(ne),
    flow: u(dr),
    lazy: {},
    string: u(Ir),
    text: u(wr)
  };
  return e;
  function u(i) {
    return l;
    function l(a) {
      return Mr(e, i, a);
    }
  }
}
function qr(n) {
  for (; !rt(n); )
    ;
  return n;
}
const vn = /[\0\t\n\r]/g;
function Rr() {
  let n = 1, r = "", t = !0, e;
  return u;
  function u(i, l, a) {
    const p = [];
    let h, f, m, g, c;
    for (i = r + (typeof i == "string" ? i.toString() : new TextDecoder(l || void 0).decode(i)), m = 0, r = "", t && (i.charCodeAt(0) === 65279 && m++, t = void 0); m < i.length; ) {
      if (vn.lastIndex = m, h = vn.exec(i), g = h && h.index !== void 0 ? h.index : i.length, c = i.charCodeAt(g), !h) {
        r = i.slice(m);
        break;
      }
      if (c === 10 && m === g && e)
        p.push(-3), e = void 0;
      else
        switch (e && (p.push(-5), e = void 0), m < g && (p.push(i.slice(m, g)), n += g - m), c) {
          case 0: {
            p.push(65533), n++;
            break;
          }
          case 9: {
            for (f = Math.ceil(n / 4) * 4, p.push(-2); n++ < f; ) p.push(-1);
            break;
          }
          case 10: {
            p.push(-4), n = 1;
            break;
          }
          default:
            e = !0, n = 1;
        }
      m = g + 1;
    }
    return a && (e && p.push(-5), r && p.push(r), p.push(null)), p;
  }
}
function Hr(n, r, t) {
  return typeof r != "string" && (t = r, r = void 0), Jt(t)(qr(Nr(t).document().write(Rr()(n, r, !0))));
}
const Vr = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }, yn = {
  allowDangerousHtml: !1,
  allowDangerousProtocol: !1,
  extensions: [],
  htmlExtensions: [jr()]
};
let Gn = !1, fn, kn, dn;
class Ur {
  // Operations - Highligh previously rendered markdown.
  async highlight(r, t) {
    if (typeof document > "u") return;
    const { highlightElement: e } = await $r(t);
    r.querySelectorAll('div[class^="shj-lang-"]').forEach((u) => {
      (/shj-lang-([^\s]+)/.exec(u.className) || [])[1] === "javascript" && (e(u, "js", "multiline", { hideLineNumbers: !0 }), Object.assign(u.style, {
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, Liberation Mono, monospace",
        fontSize: "14px"
      }));
    });
  }
  // Operations - Render markdown.
  async render(r, t) {
    return (t?.tables ?? !1) && (!Gn && !fn && (fn = (async () => {
      const e = await import("./index-C61WkH0w.js");
      yn.extensions?.push(e.gfmTable()), yn.htmlExtensions?.push(e.gfmTableHtml()), Gn = !0, fn = void 0;
    })()), fn && await fn), Hr(r, yn);
  }
  // Operations - Set color mode.
  setColorMode(r) {
    st(r);
  }
}
function st(n) {
  if (typeof document > "u") return;
  const r = n === "dark" ? "theme-dark" : "theme-light";
  document.querySelectorAll("style[data-dynamic]").forEach((t) => t.disabled = t.id !== r);
}
function jr() {
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
        e === "json" ? u === "datapos-visual" ? i = `<div class="${u}" data-options="${encodeURIComponent(t)}"></div>` : u === "datapos-formula" ? i = `<div class="${u}"><math display="block"><mrow><mi>Termination Rate</mi><mo>=</mo><mrow><mfrac><mi>Average Headcount</mi><mi>Terminations</mi></mfrac><mo>×</mo><mn>100</mn></mrow></mrow></math></div>` : u === "datapos-highcharts" && (i = `<div class="${u}" data-options="${encodeURIComponent(t)}"></div>`) : i = `<div class="shj-lang-${e.replaceAll(/[^a-z0-9_-]/gi, "")}">${Qr(t)}</div>`, this.raw(i), n = void 0;
      }
    }
  };
}
function Qr(n) {
  return n.replaceAll(/[&<>"']/g, (r) => Vr[r]);
}
function Jn(n, r) {
  if (typeof document > "u") return;
  let t = document.getElementById(r);
  t == null && (t = document.createElement("style"), t.id = r, t.dataset.dynamic = "true", document.head.appendChild(t)), t.innerHTML = n, t.disabled = !0;
}
async function $r(n) {
  return kn || (dn || (dn = (async () => {
    const [r, t, e] = await Promise.all([
      import("./index-BgHmvLYe.js"),
      import("./github-dark-O5tSO1Qn.js"),
      import("./github-light-MQ8W3G6n.js")
    ]);
    return kn = r, Jn(t.default, "theme-dark"), Jn(e.default, "theme-light"), st(n), dn = void 0, kn;
  })()), dn);
}
export {
  Ur as M,
  _ as a,
  U as b,
  B as f,
  E as m
};
