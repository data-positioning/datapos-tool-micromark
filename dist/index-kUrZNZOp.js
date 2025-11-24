const Hn = document.createElement("i");
function Xn(n) {
  const e = "&" + n + ";";
  Hn.innerHTML = e;
  const t = Hn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && n !== "semi" || t === e ? !1 : t
  );
}
function nn(n, e, t, r) {
  const l = n.length;
  let i = 0, u;
  if (e < 0 ? e = -e > l ? 0 : l + e : e = e > l ? l : e, t = t > 0 ? t : 0, r.length < 1e4)
    u = Array.from(r), u.unshift(e, t), n.splice(...u);
  else
    for (t && n.splice(e, t); i < r.length; )
      u = r.slice(i, i + 1e4), u.unshift(e, 0), n.splice(...u), i += 1e4, e += 1e4;
}
function j(n, e) {
  return n.length > 0 ? (nn(n, n.length, 0, e), n) : e;
}
const En = {}.hasOwnProperty;
function qt(n) {
  const e = {};
  let t = -1;
  for (; ++t < n.length; )
    Rt(e, n[t]);
  return e;
}
function Rt(n, e) {
  let t;
  for (t in e) {
    const l = (En.call(n, t) ? n[t] : void 0) || (n[t] = {}), i = e[t];
    let u;
    if (i)
      for (u in i) {
        En.call(l, u) || (l[u] = []);
        const a = i[u];
        Ht(
          // @ts-expect-error Looks like a list.
          l[u],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Ht(n, e) {
  let t = -1;
  const r = [];
  for (; ++t < e.length; )
    (e[t].add === "after" ? n : r).push(e[t]);
  nn(n, 0, 0, r);
}
function Vt(n) {
  const e = {};
  let t = -1;
  for (; ++t < n.length; )
    $t(e, n[t]);
  return e;
}
function $t(n, e) {
  let t;
  for (t in e) {
    const l = (En.call(n, t) ? n[t] : void 0) || (n[t] = {}), i = e[t];
    let u;
    if (i)
      for (u in i)
        l[u] = i[u];
  }
}
function jt(n, e) {
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
const Qt = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function nt(n) {
  return n.replace(/["&<>]/g, e);
  function e(t) {
    return "&" + Qt[
      /** @type {keyof typeof characterReferences} */
      t
    ] + ";";
  }
}
function xn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const X = an(/[A-Za-z]/), W = an(/[\dA-Za-z]/), Ut = an(/[#-'*+\--9=?A-Z^-~]/);
function Fn(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const Tn = an(/\d/), Wt = an(/[\dA-Fa-f]/), Yt = an(/[!-/:-@[-`{-~]/);
function E(n) {
  return n !== null && n < -2;
}
function U(n) {
  return n !== null && (n < 0 || n === 32);
}
function _(n) {
  return n === -2 || n === -1 || n === 32;
}
const vt = an(/\p{P}|\p{S}/u), Zt = an(/\s/);
function an(n) {
  return e;
  function e(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
function kn(n, e) {
  const t = nt(Jt(n || ""));
  if (!e)
    return t;
  const r = t.indexOf(":"), l = t.indexOf("?"), i = t.indexOf("#"), u = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    u > -1 && r > u || l > -1 && r > l || i > -1 && r > i || // It is a protocol, it should be allowed.
    e.test(t.slice(0, r)) ? t : ""
  );
}
function Jt(n) {
  const e = [];
  let t = -1, r = 0, l = 0;
  for (; ++t < n.length; ) {
    const i = n.charCodeAt(t);
    let u = "";
    if (i === 37 && W(n.charCodeAt(t + 1)) && W(n.charCodeAt(t + 2)))
      l = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (u = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const a = n.charCodeAt(t + 1);
      i < 56320 && a > 56319 && a < 57344 ? (u = String.fromCharCode(i, a), l = 1) : u = "�";
    } else
      u = String.fromCharCode(i);
    u && (e.push(n.slice(r, t), encodeURIComponent(u)), r = t + l + 1, u = ""), l && (t += l, l = 0);
  }
  return e.join("") + n.slice(r);
}
const Vn = {}.hasOwnProperty, $n = /^(https?|ircs?|mailto|xmpp)$/i, Gt = /^https?$/i;
function Kt(n) {
  const e = n || {};
  let t = !0;
  const r = {}, l = [[]], i = [], u = [], m = (
    /** @type {NormalizedHtmlExtension} */
    Vt([{
      enter: {
        blockQuote: A,
        codeFenced: tn,
        codeFencedFenceInfo: T,
        codeFencedFenceMeta: T,
        codeIndented: en,
        codeText: _t,
        content: dt,
        definition: ft,
        definitionDestinationString: mt,
        definitionLabelString: T,
        definitionTitleString: T,
        emphasis: Tt,
        htmlFlow: Ft,
        htmlText: On,
        image: Z,
        label: T,
        link: on,
        listItemMarker: C,
        listItemValue: q,
        listOrdered: D,
        listUnordered: N,
        paragraph: R,
        reference: T,
        resource: sn,
        resourceDestinationString: cn,
        resourceTitleString: T,
        setextHeading: St,
        strong: At
      },
      exit: {
        atxHeading: wt,
        atxHeadingSequence: bt,
        autolinkEmail: Nt,
        autolinkProtocol: Dt,
        blockQuote: V,
        characterEscapeValue: fn,
        characterReferenceMarkerHexadecimal: Dn,
        characterReferenceMarkerNumeric: Dn,
        characterReferenceValue: Ot,
        codeFenced: s,
        codeFencedFence: v,
        codeFencedFenceInfo: o,
        codeFencedFenceMeta: L,
        codeFlowValue: Et,
        codeIndented: s,
        codeText: Lt,
        codeTextData: fn,
        data: fn,
        definition: kt,
        definitionDestinationString: gt,
        definitionLabelString: pt,
        definitionTitleString: xt,
        emphasis: Pt,
        hardBreakEscape: Bn,
        hardBreakTrailing: Bn,
        htmlFlow: Mn,
        htmlFlowData: fn,
        htmlText: Mn,
        htmlTextData: fn,
        image: Pn,
        label: hn,
        labelText: H,
        lineEnding: zt,
        link: Pn,
        listOrdered: I,
        listUnordered: M,
        paragraph: Y,
        reference: L,
        referenceString: un,
        resource: L,
        resourceDestinationString: wn,
        resourceTitleString: ht,
        setextHeading: Ct,
        setextHeadingLineSequence: It,
        setextHeadingText: yt,
        strong: Bt,
        thematicBreak: Mt
      }
    }, ...e.htmlExtensions || []])
  ), h = {
    definitions: r,
    tightStack: u
  }, p = {
    buffer: T,
    encode: x,
    getData: z,
    lineEndingIfNeeded: F,
    options: e,
    raw: S,
    resume: d,
    setData: b,
    tag: y
  };
  let f = e.defaultLineEnding;
  return g;
  function g(k) {
    let w = -1, $ = 0;
    const J = [];
    let G = [], rn = [];
    for (; ++w < k.length; )
      !f && (k[w][1].type === "lineEnding" || k[w][1].type === "lineEndingBlank") && (f = /** @type {LineEnding} */
      k[w][2].sliceSerialize(k[w][1])), (k[w][1].type === "listOrdered" || k[w][1].type === "listUnordered") && (k[w][0] === "enter" ? J.push(w) : c(k.slice(J.pop(), w))), k[w][1].type === "definition" && (k[w][0] === "enter" ? (rn = j(rn, k.slice($, w)), $ = w) : (G = j(G, k.slice($, w + 1)), $ = w + 1));
    G = j(G, rn), G = j(G, k.slice($)), w = -1;
    const K = G;
    for (m.enter.null && m.enter.null.call(p); ++w < k.length; ) {
      const Nn = m[K[w][0]], qn = K[w][1].type, Rn = Nn[qn];
      Vn.call(Nn, qn) && Rn && Rn.call({
        sliceSerialize: K[w][2].sliceSerialize,
        ...p
      }, K[w][1]);
    }
    return m.exit.null && m.exit.null.call(p), l[0].join("");
  }
  function c(k) {
    const w = k.length;
    let $ = 0, J = 0, G = !1, rn;
    for (; ++$ < w; ) {
      const K = k[$];
      if (K[1]._container)
        rn = void 0, K[0] === "enter" ? J++ : J--;
      else switch (K[1].type) {
        case "listItemPrefix": {
          K[0] === "exit" && (rn = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          K[0] === "enter" && !J && (rn ? rn = void 0 : G = !0);
          break;
        }
        default:
          rn = void 0;
      }
    }
    k[0][1]._loose = G;
  }
  function b(k, w) {
    h[k] = w;
  }
  function z(k) {
    return h[k];
  }
  function T() {
    l.push([]);
  }
  function d() {
    return l.pop().join("");
  }
  function y(k) {
    t && (b("lastWasTag", !0), l[l.length - 1].push(k));
  }
  function S(k) {
    b("lastWasTag"), l[l.length - 1].push(k);
  }
  function P() {
    S(f || `
`);
  }
  function F() {
    const k = l[l.length - 1], w = k[k.length - 1], $ = w ? w.charCodeAt(w.length - 1) : null;
    $ === 10 || $ === 13 || $ === null || P();
  }
  function x(k) {
    return z("ignoreEncode") ? k : nt(k);
  }
  function L() {
    d();
  }
  function D(k) {
    u.push(!k._loose), F(), y("<ol"), b("expectFirstItem", !0);
  }
  function N(k) {
    u.push(!k._loose), F(), y("<ul"), b("expectFirstItem", !0);
  }
  function q(k) {
    if (z("expectFirstItem")) {
      const w = Number.parseInt(this.sliceSerialize(k), 10);
      w !== 1 && y(' start="' + x(String(w)) + '"');
    }
  }
  function C() {
    z("expectFirstItem") ? y(">") : O(), F(), y("<li>"), b("expectFirstItem"), b("lastWasTag");
  }
  function I() {
    O(), u.pop(), P(), y("</ol>");
  }
  function M() {
    O(), u.pop(), P(), y("</ul>");
  }
  function O() {
    z("lastWasTag") && !z("slurpAllLineEndings") && F(), y("</li>"), b("slurpAllLineEndings");
  }
  function A() {
    u.push(!1), F(), y("<blockquote>");
  }
  function V() {
    u.pop(), F(), y("</blockquote>"), b("slurpAllLineEndings");
  }
  function R() {
    u[u.length - 1] || (F(), y("<p>")), b("slurpAllLineEndings");
  }
  function Y() {
    u[u.length - 1] ? b("slurpAllLineEndings", !0) : y("</p>");
  }
  function tn() {
    F(), y("<pre><code"), b("fencesCount", 0);
  }
  function o() {
    const k = d();
    y(' class="language-' + k + '"');
  }
  function v() {
    const k = z("fencesCount") || 0;
    k || (y(">"), b("slurpOneLineEnding", !0)), b("fencesCount", k + 1);
  }
  function en() {
    F(), y("<pre><code>");
  }
  function s() {
    const k = z("fencesCount");
    k !== void 0 && k < 2 && h.tightStack.length > 0 && !z("lastWasTag") && P(), z("flowCodeSeenData") && F(), y("</code></pre>"), k !== void 0 && k < 2 && F(), b("flowCodeSeenData"), b("fencesCount"), b("slurpOneLineEnding");
  }
  function Z() {
    i.push({
      image: !0
    }), t = void 0;
  }
  function on() {
    i.push({});
  }
  function H(k) {
    i[i.length - 1].labelId = this.sliceSerialize(k);
  }
  function hn() {
    i[i.length - 1].label = d();
  }
  function un(k) {
    i[i.length - 1].referenceId = this.sliceSerialize(k);
  }
  function sn() {
    T(), i[i.length - 1].destination = "";
  }
  function cn() {
    T(), b("ignoreEncode", !0);
  }
  function wn() {
    i[i.length - 1].destination = d(), b("ignoreEncode");
  }
  function ht() {
    i[i.length - 1].title = d();
  }
  function Pn() {
    let k = i.length - 1;
    const w = i[k], $ = w.referenceId || w.labelId, J = w.destination === void 0 ? r[xn($)] : w;
    for (t = !0; k--; )
      if (i[k].image) {
        t = void 0;
        break;
      }
    w.image ? (y('<img src="' + kn(J.destination, e.allowDangerousProtocol ? void 0 : Gt) + '" alt="'), S(w.label), y('"')) : y('<a href="' + kn(J.destination, e.allowDangerousProtocol ? void 0 : $n) + '"'), y(J.title ? ' title="' + J.title + '"' : ""), w.image ? y(" />") : (y(">"), S(w.label), y("</a>")), i.pop();
  }
  function ft() {
    T(), i.push({});
  }
  function pt(k) {
    d(), i[i.length - 1].labelId = this.sliceSerialize(k);
  }
  function mt() {
    T(), b("ignoreEncode", !0);
  }
  function gt() {
    i[i.length - 1].destination = d(), b("ignoreEncode");
  }
  function xt() {
    i[i.length - 1].title = d();
  }
  function kt() {
    const k = i[i.length - 1], w = xn(k.labelId);
    d(), Vn.call(r, w) || (r[w] = i[i.length - 1]), i.pop();
  }
  function dt() {
    b("slurpAllLineEndings", !0);
  }
  function bt(k) {
    z("headingRank") || (b("headingRank", this.sliceSerialize(k).length), F(), y("<h" + z("headingRank") + ">"));
  }
  function St() {
    T(), b("slurpAllLineEndings");
  }
  function yt() {
    b("slurpAllLineEndings", !0);
  }
  function wt() {
    y("</h" + z("headingRank") + ">"), b("headingRank");
  }
  function It(k) {
    b("headingRank", this.sliceSerialize(k).charCodeAt(0) === 61 ? 1 : 2);
  }
  function Ct() {
    const k = d();
    F(), y("<h" + z("headingRank") + ">"), S(k), y("</h" + z("headingRank") + ">"), b("slurpAllLineEndings"), b("headingRank");
  }
  function fn(k) {
    S(x(this.sliceSerialize(k)));
  }
  function zt(k) {
    if (!z("slurpAllLineEndings")) {
      if (z("slurpOneLineEnding")) {
        b("slurpOneLineEnding");
        return;
      }
      if (z("inCodeText")) {
        S(" ");
        return;
      }
      S(x(this.sliceSerialize(k)));
    }
  }
  function Et(k) {
    S(x(this.sliceSerialize(k))), b("flowCodeSeenData", !0);
  }
  function Bn() {
    y("<br />");
  }
  function Ft() {
    F(), On();
  }
  function Mn() {
    b("ignoreEncode");
  }
  function On() {
    e.allowDangerousHtml && b("ignoreEncode", !0);
  }
  function Tt() {
    y("<em>");
  }
  function At() {
    y("<strong>");
  }
  function _t() {
    b("inCodeText", !0), y("<code>");
  }
  function Lt() {
    b("inCodeText"), y("</code>");
  }
  function Pt() {
    y("</em>");
  }
  function Bt() {
    y("</strong>");
  }
  function Mt() {
    F(), y("<hr />");
  }
  function Dn(k) {
    b("characterReferenceType", k.type);
  }
  function Ot(k) {
    const w = this.sliceSerialize(k), $ = z("characterReferenceType") ? jt(w, z("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : Xn(w);
    S(x(
      /** @type {string} */
      $
    )), b("characterReferenceType");
  }
  function Dt(k) {
    const w = this.sliceSerialize(k);
    y('<a href="' + kn(w, e.allowDangerousProtocol ? void 0 : $n) + '">'), S(x(w)), y("</a>");
  }
  function Nt(k) {
    const w = this.sliceSerialize(k);
    y('<a href="' + kn("mailto:" + w) + '">'), S(x(w)), y("</a>");
  }
}
function B(n, e, t, r) {
  const l = r ? r - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return u;
  function u(m) {
    return _(m) ? (n.enter(t), a(m)) : e(m);
  }
  function a(m) {
    return _(m) && i++ < l ? (n.consume(m), a) : (n.exit(t), e(m));
  }
}
const Xt = {
  tokenize: ne
};
function ne(n) {
  const e = n.attempt(this.parser.constructs.contentInitial, r, l);
  let t;
  return e;
  function r(a) {
    if (a === null) {
      n.consume(a);
      return;
    }
    return n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), B(n, e, "linePrefix");
  }
  function l(a) {
    return n.enter("paragraph"), i(a);
  }
  function i(a) {
    const m = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = m), t = m, u(a);
  }
  function u(a) {
    if (a === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(a);
      return;
    }
    return E(a) ? (n.consume(a), n.exit("chunkText"), i) : (n.consume(a), u);
  }
}
const te = {
  tokenize: ee
}, jn = {
  tokenize: re
};
function ee(n) {
  const e = this, t = [];
  let r = 0, l, i, u;
  return a;
  function a(S) {
    if (r < t.length) {
      const P = t[r];
      return e.containerState = P[1], n.attempt(P[0].continuation, m, h)(S);
    }
    return h(S);
  }
  function m(S) {
    if (r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, l && y();
      const P = e.events.length;
      let F = P, x;
      for (; F--; )
        if (e.events[F][0] === "exit" && e.events[F][1].type === "chunkFlow") {
          x = e.events[F][1].end;
          break;
        }
      d(r);
      let L = P;
      for (; L < e.events.length; )
        e.events[L][1].end = {
          ...x
        }, L++;
      return nn(e.events, F + 1, 0, e.events.slice(P)), e.events.length = L, h(S);
    }
    return a(S);
  }
  function h(S) {
    if (r === t.length) {
      if (!l)
        return g(S);
      if (l.currentConstruct && l.currentConstruct.concrete)
        return b(S);
      e.interrupt = !!(l.currentConstruct && !l._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, n.check(jn, p, f)(S);
  }
  function p(S) {
    return l && y(), d(r), g(S);
  }
  function f(S) {
    return e.parser.lazy[e.now().line] = r !== t.length, u = e.now().offset, b(S);
  }
  function g(S) {
    return e.containerState = {}, n.attempt(jn, c, b)(S);
  }
  function c(S) {
    return r++, t.push([e.currentConstruct, e.containerState]), g(S);
  }
  function b(S) {
    if (S === null) {
      l && y(), d(0), n.consume(S);
      return;
    }
    return l = l || e.parser.flow(e.now()), n.enter("chunkFlow", {
      _tokenizer: l,
      contentType: "flow",
      previous: i
    }), z(S);
  }
  function z(S) {
    if (S === null) {
      T(n.exit("chunkFlow"), !0), d(0), n.consume(S);
      return;
    }
    return E(S) ? (n.consume(S), T(n.exit("chunkFlow")), r = 0, e.interrupt = void 0, a) : (n.consume(S), z);
  }
  function T(S, P) {
    const F = e.sliceStream(S);
    if (P && F.push(null), S.previous = i, i && (i.next = S), i = S, l.defineSkip(S.start), l.write(F), e.parser.lazy[S.start.line]) {
      let x = l.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          l.events[x][1].start.offset < u && // …and either is not ended yet…
          (!l.events[x][1].end || // …or ends after it.
          l.events[x][1].end.offset > u)
        )
          return;
      const L = e.events.length;
      let D = L, N, q;
      for (; D--; )
        if (e.events[D][0] === "exit" && e.events[D][1].type === "chunkFlow") {
          if (N) {
            q = e.events[D][1].end;
            break;
          }
          N = !0;
        }
      for (d(r), x = L; x < e.events.length; )
        e.events[x][1].end = {
          ...q
        }, x++;
      nn(e.events, D + 1, 0, e.events.slice(L)), e.events.length = x;
    }
  }
  function d(S) {
    let P = t.length;
    for (; P-- > S; ) {
      const F = t[P];
      e.containerState = F[1], F[0].exit.call(e, n);
    }
    t.length = S;
  }
  function y() {
    l.write([null]), i = void 0, l = void 0, e.containerState._closeFlow = void 0;
  }
}
function re(n, e, t) {
  return B(n, n.attempt(this.parser.constructs.document, e, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Qn(n) {
  if (n === null || U(n) || Zt(n))
    return 1;
  if (vt(n))
    return 2;
}
function _n(n, e, t) {
  const r = [];
  let l = -1;
  for (; ++l < n.length; ) {
    const i = n[l].resolveAll;
    i && !r.includes(i) && (e = i(e, t), r.push(i));
  }
  return e;
}
const An = {
  name: "attention",
  resolveAll: ie,
  tokenize: ue
};
function ie(n, e) {
  let t = -1, r, l, i, u, a, m, h, p;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (r = t; r--; )
        if (n[r][0] === "exit" && n[r][1].type === "attentionSequence" && n[r][1]._open && // If the markers are the same:
        e.sliceSerialize(n[r][1]).charCodeAt(0) === e.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[r][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[r][1].end.offset - n[r][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          m = n[r][1].end.offset - n[r][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const f = {
            ...n[r][1].end
          }, g = {
            ...n[t][1].start
          };
          Un(f, -m), Un(g, m), u = {
            type: m > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: {
              ...n[r][1].end
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
              ...n[r][1].end
            },
            end: {
              ...n[t][1].start
            }
          }, l = {
            type: m > 1 ? "strong" : "emphasis",
            start: {
              ...u.start
            },
            end: {
              ...a.end
            }
          }, n[r][1].end = {
            ...u.start
          }, n[t][1].start = {
            ...a.end
          }, h = [], n[r][1].end.offset - n[r][1].start.offset && (h = j(h, [["enter", n[r][1], e], ["exit", n[r][1], e]])), h = j(h, [["enter", l, e], ["enter", u, e], ["exit", u, e], ["enter", i, e]]), h = j(h, _n(e.parser.constructs.insideSpan.null, n.slice(r + 1, t), e)), h = j(h, [["exit", i, e], ["enter", a, e], ["exit", a, e], ["exit", l, e]]), n[t][1].end.offset - n[t][1].start.offset ? (p = 2, h = j(h, [["enter", n[t][1], e], ["exit", n[t][1], e]])) : p = 0, nn(n, r - 1, t - r + 3, h), t = r + h.length - p - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function ue(n, e) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, l = Qn(r);
  let i;
  return u;
  function u(m) {
    return i = m, n.enter("attentionSequence"), a(m);
  }
  function a(m) {
    if (m === i)
      return n.consume(m), a;
    const h = n.exit("attentionSequence"), p = Qn(m), f = !p || p === 2 && l || t.includes(m), g = !l || l === 2 && p || t.includes(r);
    return h._open = !!(i === 42 ? f : f && (l || !g)), h._close = !!(i === 42 ? g : g && (p || !f)), e(m);
  }
}
function Un(n, e) {
  n.column += e, n.offset += e, n._bufferIndex += e;
}
const le = {
  name: "autolink",
  tokenize: ae
};
function ae(n, e, t) {
  let r = 0;
  return l;
  function l(c) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), i;
  }
  function i(c) {
    return X(c) ? (n.consume(c), u) : c === 64 ? t(c) : h(c);
  }
  function u(c) {
    return c === 43 || c === 45 || c === 46 || W(c) ? (r = 1, a(c)) : h(c);
  }
  function a(c) {
    return c === 58 ? (n.consume(c), r = 0, m) : (c === 43 || c === 45 || c === 46 || W(c)) && r++ < 32 ? (n.consume(c), a) : (r = 0, h(c));
  }
  function m(c) {
    return c === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), e) : c === null || c === 32 || c === 60 || Fn(c) ? t(c) : (n.consume(c), m);
  }
  function h(c) {
    return c === 64 ? (n.consume(c), p) : Ut(c) ? (n.consume(c), h) : t(c);
  }
  function p(c) {
    return W(c) ? f(c) : t(c);
  }
  function f(c) {
    return c === 46 ? (n.consume(c), r = 0, p) : c === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(c), n.exit("autolinkMarker"), n.exit("autolink"), e) : g(c);
  }
  function g(c) {
    if ((c === 45 || W(c)) && r++ < 63) {
      const b = c === 45 ? g : f;
      return n.consume(c), b;
    }
    return t(c);
  }
}
const yn = {
  partial: !0,
  tokenize: oe
};
function oe(n, e, t) {
  return r;
  function r(i) {
    return _(i) ? B(n, l, "linePrefix")(i) : l(i);
  }
  function l(i) {
    return i === null || E(i) ? e(i) : t(i);
  }
}
const tt = {
  continuation: {
    tokenize: ce
  },
  exit: he,
  name: "blockQuote",
  tokenize: se
};
function se(n, e, t) {
  const r = this;
  return l;
  function l(u) {
    if (u === 62) {
      const a = r.containerState;
      return a.open || (n.enter("blockQuote", {
        _container: !0
      }), a.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(u), n.exit("blockQuoteMarker"), i;
    }
    return t(u);
  }
  function i(u) {
    return _(u) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(u), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), e) : (n.exit("blockQuotePrefix"), e(u));
  }
}
function ce(n, e, t) {
  const r = this;
  return l;
  function l(u) {
    return _(u) ? B(n, i, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(u) : i(u);
  }
  function i(u) {
    return n.attempt(tt, e, t)(u);
  }
}
function he(n) {
  n.exit("blockQuote");
}
const et = {
  name: "characterEscape",
  tokenize: fe
};
function fe(n, e, t) {
  return r;
  function r(i) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(i), n.exit("escapeMarker"), l;
  }
  function l(i) {
    return Yt(i) ? (n.enter("characterEscapeValue"), n.consume(i), n.exit("characterEscapeValue"), n.exit("characterEscape"), e) : t(i);
  }
}
const rt = {
  name: "characterReference",
  tokenize: pe
};
function pe(n, e, t) {
  const r = this;
  let l = 0, i, u;
  return a;
  function a(f) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(f), n.exit("characterReferenceMarker"), m;
  }
  function m(f) {
    return f === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(f), n.exit("characterReferenceMarkerNumeric"), h) : (n.enter("characterReferenceValue"), i = 31, u = W, p(f));
  }
  function h(f) {
    return f === 88 || f === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(f), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), i = 6, u = Wt, p) : (n.enter("characterReferenceValue"), i = 7, u = Tn, p(f));
  }
  function p(f) {
    if (f === 59 && l) {
      const g = n.exit("characterReferenceValue");
      return u === W && !Xn(r.sliceSerialize(g)) ? t(f) : (n.enter("characterReferenceMarker"), n.consume(f), n.exit("characterReferenceMarker"), n.exit("characterReference"), e);
    }
    return u(f) && l++ < i ? (n.consume(f), p) : t(f);
  }
}
const Wn = {
  partial: !0,
  tokenize: ge
}, Yn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: me
};
function me(n, e, t) {
  const r = this, l = {
    partial: !0,
    tokenize: F
  };
  let i = 0, u = 0, a;
  return m;
  function m(x) {
    return h(x);
  }
  function h(x) {
    const L = r.events[r.events.length - 1];
    return i = L && L[1].type === "linePrefix" ? L[2].sliceSerialize(L[1], !0).length : 0, a = x, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), p(x);
  }
  function p(x) {
    return x === a ? (u++, n.consume(x), p) : u < 3 ? t(x) : (n.exit("codeFencedFenceSequence"), _(x) ? B(n, f, "whitespace")(x) : f(x));
  }
  function f(x) {
    return x === null || E(x) ? (n.exit("codeFencedFence"), r.interrupt ? e(x) : n.check(Wn, z, P)(x)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), g(x));
  }
  function g(x) {
    return x === null || E(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), f(x)) : _(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), B(n, c, "whitespace")(x)) : x === 96 && x === a ? t(x) : (n.consume(x), g);
  }
  function c(x) {
    return x === null || E(x) ? f(x) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), b(x));
  }
  function b(x) {
    return x === null || E(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), f(x)) : x === 96 && x === a ? t(x) : (n.consume(x), b);
  }
  function z(x) {
    return n.attempt(l, P, T)(x);
  }
  function T(x) {
    return n.enter("lineEnding"), n.consume(x), n.exit("lineEnding"), d;
  }
  function d(x) {
    return i > 0 && _(x) ? B(n, y, "linePrefix", i + 1)(x) : y(x);
  }
  function y(x) {
    return x === null || E(x) ? n.check(Wn, z, P)(x) : (n.enter("codeFlowValue"), S(x));
  }
  function S(x) {
    return x === null || E(x) ? (n.exit("codeFlowValue"), y(x)) : (n.consume(x), S);
  }
  function P(x) {
    return n.exit("codeFenced"), e(x);
  }
  function F(x, L, D) {
    let N = 0;
    return q;
    function q(A) {
      return x.enter("lineEnding"), x.consume(A), x.exit("lineEnding"), C;
    }
    function C(A) {
      return x.enter("codeFencedFence"), _(A) ? B(x, I, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(A) : I(A);
    }
    function I(A) {
      return A === a ? (x.enter("codeFencedFenceSequence"), M(A)) : D(A);
    }
    function M(A) {
      return A === a ? (N++, x.consume(A), M) : N >= u ? (x.exit("codeFencedFenceSequence"), _(A) ? B(x, O, "whitespace")(A) : O(A)) : D(A);
    }
    function O(A) {
      return A === null || E(A) ? (x.exit("codeFencedFence"), L(A)) : D(A);
    }
  }
}
function ge(n, e, t) {
  const r = this;
  return l;
  function l(u) {
    return u === null ? t(u) : (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), i);
  }
  function i(u) {
    return r.parser.lazy[r.now().line] ? t(u) : e(u);
  }
}
const In = {
  name: "codeIndented",
  tokenize: ke
}, xe = {
  partial: !0,
  tokenize: de
};
function ke(n, e, t) {
  const r = this;
  return l;
  function l(h) {
    return n.enter("codeIndented"), B(n, i, "linePrefix", 5)(h);
  }
  function i(h) {
    const p = r.events[r.events.length - 1];
    return p && p[1].type === "linePrefix" && p[2].sliceSerialize(p[1], !0).length >= 4 ? u(h) : t(h);
  }
  function u(h) {
    return h === null ? m(h) : E(h) ? n.attempt(xe, u, m)(h) : (n.enter("codeFlowValue"), a(h));
  }
  function a(h) {
    return h === null || E(h) ? (n.exit("codeFlowValue"), u(h)) : (n.consume(h), a);
  }
  function m(h) {
    return n.exit("codeIndented"), e(h);
  }
}
function de(n, e, t) {
  const r = this;
  return l;
  function l(u) {
    return r.parser.lazy[r.now().line] ? t(u) : E(u) ? (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), l) : B(n, i, "linePrefix", 5)(u);
  }
  function i(u) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(u) : E(u) ? l(u) : t(u);
  }
}
const be = {
  name: "codeText",
  previous: ye,
  resolve: Se,
  tokenize: we
};
function Se(n) {
  let e = n.length - 4, t = 3, r, l;
  if ((n[t][1].type === "lineEnding" || n[t][1].type === "space") && (n[e][1].type === "lineEnding" || n[e][1].type === "space")) {
    for (r = t; ++r < e; )
      if (n[r][1].type === "codeTextData") {
        n[t][1].type = "codeTextPadding", n[e][1].type = "codeTextPadding", t += 2, e -= 2;
        break;
      }
  }
  for (r = t - 1, e++; ++r <= e; )
    l === void 0 ? r !== e && n[r][1].type !== "lineEnding" && (l = r) : (r === e || n[r][1].type === "lineEnding") && (n[l][1].type = "codeTextData", r !== l + 2 && (n[l][1].end = n[r - 1][1].end, n.splice(l + 2, r - l - 2), e -= r - l - 2, r = l + 2), l = void 0);
  return n;
}
function ye(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function we(n, e, t) {
  let r = 0, l, i;
  return u;
  function u(f) {
    return n.enter("codeText"), n.enter("codeTextSequence"), a(f);
  }
  function a(f) {
    return f === 96 ? (n.consume(f), r++, a) : (n.exit("codeTextSequence"), m(f));
  }
  function m(f) {
    return f === null ? t(f) : f === 32 ? (n.enter("space"), n.consume(f), n.exit("space"), m) : f === 96 ? (i = n.enter("codeTextSequence"), l = 0, p(f)) : E(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), m) : (n.enter("codeTextData"), h(f));
  }
  function h(f) {
    return f === null || f === 32 || f === 96 || E(f) ? (n.exit("codeTextData"), m(f)) : (n.consume(f), h);
  }
  function p(f) {
    return f === 96 ? (n.consume(f), l++, p) : l === r ? (n.exit("codeTextSequence"), n.exit("codeText"), e(f)) : (i.type = "codeTextData", h(f));
  }
}
class Ie {
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
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(e, r) : e > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
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
  splice(e, t, r) {
    const l = t || 0;
    this.setCursor(Math.trunc(e));
    const i = this.right.splice(this.right.length - l, Number.POSITIVE_INFINITY);
    return r && pn(this.left, r), i.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), pn(this.left, e);
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
    this.setCursor(0), pn(this.right, e.reverse());
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
        pn(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
        pn(this.left, t.reverse());
      }
  }
}
function pn(n, e) {
  let t = 0;
  if (e.length < 1e4)
    n.push(...e);
  else
    for (; t < e.length; )
      n.push(...e.slice(t, t + 1e4)), t += 1e4;
}
function it(n) {
  const e = {};
  let t = -1, r, l, i, u, a, m, h;
  const p = new Ie(n);
  for (; ++t < p.length; ) {
    for (; t in e; )
      t = e[t];
    if (r = p.get(t), t && r[1].type === "chunkFlow" && p.get(t - 1)[1].type === "listItemPrefix" && (m = r[1]._tokenizer.events, i = 0, i < m.length && m[i][1].type === "lineEndingBlank" && (i += 2), i < m.length && m[i][1].type === "content"))
      for (; ++i < m.length && m[i][1].type !== "content"; )
        m[i][1].type === "chunkText" && (m[i][1]._isInFirstContentOfListItem = !0, i++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Ce(p, t)), t = e[t], h = !0);
    else if (r[1]._container) {
      for (i = t, l = void 0; i--; )
        if (u = p.get(i), u[1].type === "lineEnding" || u[1].type === "lineEndingBlank")
          u[0] === "enter" && (l && (p.get(l)[1].type = "lineEndingBlank"), u[1].type = "lineEnding", l = i);
        else if (!(u[1].type === "linePrefix" || u[1].type === "listItemIndent")) break;
      l && (r[1].end = {
        ...p.get(l)[1].start
      }, a = p.slice(l, t), a.unshift(r), p.splice(l, t - l + 1, a));
    }
  }
  return nn(n, 0, Number.POSITIVE_INFINITY, p.slice(0)), !h;
}
function Ce(n, e) {
  const t = n.get(e)[1], r = n.get(e)[2];
  let l = e - 1;
  const i = [];
  let u = t._tokenizer;
  u || (u = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (u._contentTypeTextTrailing = !0));
  const a = u.events, m = [], h = {};
  let p, f, g = -1, c = t, b = 0, z = 0;
  const T = [z];
  for (; c; ) {
    for (; n.get(++l)[1] !== c; )
      ;
    i.push(l), c._tokenizer || (p = r.sliceStream(c), c.next || p.push(null), f && u.defineSkip(c.start), c._isInFirstContentOfListItem && (u._gfmTasklistFirstContentOfListItem = !0), u.write(p), c._isInFirstContentOfListItem && (u._gfmTasklistFirstContentOfListItem = void 0)), f = c, c = c.next;
  }
  for (c = t; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (z = g + 1, T.push(z), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (u.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : T.pop(), g = T.length; g--; ) {
    const d = a.slice(T[g], T[g + 1]), y = i.pop();
    m.push([y, y + d.length - 1]), n.splice(y, 2, d);
  }
  for (m.reverse(), g = -1; ++g < m.length; )
    h[b + m[g][0]] = b + m[g][1], b += m[g][1] - m[g][0] - 1;
  return h;
}
const ze = {
  resolve: Fe,
  tokenize: Te
}, Ee = {
  partial: !0,
  tokenize: Ae
};
function Fe(n) {
  return it(n), n;
}
function Te(n, e) {
  let t;
  return r;
  function r(a) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), l(a);
  }
  function l(a) {
    return a === null ? i(a) : E(a) ? n.check(Ee, u, i)(a) : (n.consume(a), l);
  }
  function i(a) {
    return n.exit("chunkContent"), n.exit("content"), e(a);
  }
  function u(a) {
    return n.consume(a), n.exit("chunkContent"), t.next = n.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, l;
  }
}
function Ae(n, e, t) {
  const r = this;
  return l;
  function l(u) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), B(n, i, "linePrefix");
  }
  function i(u) {
    if (u === null || E(u))
      return t(u);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(u) : n.interrupt(r.parser.constructs.flow, t, e)(u);
  }
}
function ut(n, e, t, r, l, i, u, a, m) {
  const h = m || Number.POSITIVE_INFINITY;
  let p = 0;
  return f;
  function f(d) {
    return d === 60 ? (n.enter(r), n.enter(l), n.enter(i), n.consume(d), n.exit(i), g) : d === null || d === 32 || d === 41 || Fn(d) ? t(d) : (n.enter(r), n.enter(u), n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), z(d));
  }
  function g(d) {
    return d === 62 ? (n.enter(i), n.consume(d), n.exit(i), n.exit(l), n.exit(r), e) : (n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), c(d));
  }
  function c(d) {
    return d === 62 ? (n.exit("chunkString"), n.exit(a), g(d)) : d === null || d === 60 || E(d) ? t(d) : (n.consume(d), d === 92 ? b : c);
  }
  function b(d) {
    return d === 60 || d === 62 || d === 92 ? (n.consume(d), c) : c(d);
  }
  function z(d) {
    return !p && (d === null || d === 41 || U(d)) ? (n.exit("chunkString"), n.exit(a), n.exit(u), n.exit(r), e(d)) : p < h && d === 40 ? (n.consume(d), p++, z) : d === 41 ? (n.consume(d), p--, z) : d === null || d === 32 || d === 40 || Fn(d) ? t(d) : (n.consume(d), d === 92 ? T : z);
  }
  function T(d) {
    return d === 40 || d === 41 || d === 92 ? (n.consume(d), z) : z(d);
  }
}
function lt(n, e, t, r, l, i) {
  const u = this;
  let a = 0, m;
  return h;
  function h(c) {
    return n.enter(r), n.enter(l), n.consume(c), n.exit(l), n.enter(i), p;
  }
  function p(c) {
    return a > 999 || c === null || c === 91 || c === 93 && !m || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !a && "_hiddenFootnoteSupport" in u.parser.constructs ? t(c) : c === 93 ? (n.exit(i), n.enter(l), n.consume(c), n.exit(l), n.exit(r), e) : E(c) ? (n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), p) : (n.enter("chunkString", {
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
function at(n, e, t, r, l, i) {
  let u;
  return a;
  function a(g) {
    return g === 34 || g === 39 || g === 40 ? (n.enter(r), n.enter(l), n.consume(g), n.exit(l), u = g === 40 ? 41 : g, m) : t(g);
  }
  function m(g) {
    return g === u ? (n.enter(l), n.consume(g), n.exit(l), n.exit(r), e) : (n.enter(i), h(g));
  }
  function h(g) {
    return g === u ? (n.exit(i), m(u)) : g === null ? t(g) : E(g) ? (n.enter("lineEnding"), n.consume(g), n.exit("lineEnding"), B(n, h, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), p(g));
  }
  function p(g) {
    return g === u || g === null || E(g) ? (n.exit("chunkString"), h(g)) : (n.consume(g), g === 92 ? f : p);
  }
  function f(g) {
    return g === u || g === 92 ? (n.consume(g), p) : p(g);
  }
}
function gn(n, e) {
  let t;
  return r;
  function r(l) {
    return E(l) ? (n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), t = !0, r) : _(l) ? B(n, r, t ? "linePrefix" : "lineSuffix")(l) : e(l);
  }
}
const _e = {
  name: "definition",
  tokenize: Pe
}, Le = {
  partial: !0,
  tokenize: Be
};
function Pe(n, e, t) {
  const r = this;
  let l;
  return i;
  function i(c) {
    return n.enter("definition"), u(c);
  }
  function u(c) {
    return lt.call(
      r,
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
    return l = xn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), c === 58 ? (n.enter("definitionMarker"), n.consume(c), n.exit("definitionMarker"), m) : t(c);
  }
  function m(c) {
    return U(c) ? gn(n, h)(c) : h(c);
  }
  function h(c) {
    return ut(
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
    return n.attempt(Le, f, f)(c);
  }
  function f(c) {
    return _(c) ? B(n, g, "whitespace")(c) : g(c);
  }
  function g(c) {
    return c === null || E(c) ? (n.exit("definition"), r.parser.defined.push(l), e(c)) : t(c);
  }
}
function Be(n, e, t) {
  return r;
  function r(a) {
    return U(a) ? gn(n, l)(a) : t(a);
  }
  function l(a) {
    return at(n, i, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function i(a) {
    return _(a) ? B(n, u, "whitespace")(a) : u(a);
  }
  function u(a) {
    return a === null || E(a) ? e(a) : t(a);
  }
}
const Me = {
  name: "hardBreakEscape",
  tokenize: Oe
};
function Oe(n, e, t) {
  return r;
  function r(i) {
    return n.enter("hardBreakEscape"), n.consume(i), l;
  }
  function l(i) {
    return E(i) ? (n.exit("hardBreakEscape"), e(i)) : t(i);
  }
}
const De = {
  name: "headingAtx",
  resolve: Ne,
  tokenize: qe
};
function Ne(n, e) {
  let t = n.length - 2, r = 3, l, i;
  return n[r][1].type === "whitespace" && (r += 2), t - 2 > r && n[t][1].type === "whitespace" && (t -= 2), n[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && n[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (l = {
    type: "atxHeadingText",
    start: n[r][1].start,
    end: n[t][1].end
  }, i = {
    type: "chunkText",
    start: n[r][1].start,
    end: n[t][1].end,
    contentType: "text"
  }, nn(n, r, t - r + 1, [["enter", l, e], ["enter", i, e], ["exit", i, e], ["exit", l, e]])), n;
}
function qe(n, e, t) {
  let r = 0;
  return l;
  function l(p) {
    return n.enter("atxHeading"), i(p);
  }
  function i(p) {
    return n.enter("atxHeadingSequence"), u(p);
  }
  function u(p) {
    return p === 35 && r++ < 6 ? (n.consume(p), u) : p === null || U(p) ? (n.exit("atxHeadingSequence"), a(p)) : t(p);
  }
  function a(p) {
    return p === 35 ? (n.enter("atxHeadingSequence"), m(p)) : p === null || E(p) ? (n.exit("atxHeading"), e(p)) : _(p) ? B(n, a, "whitespace")(p) : (n.enter("atxHeadingText"), h(p));
  }
  function m(p) {
    return p === 35 ? (n.consume(p), m) : (n.exit("atxHeadingSequence"), a(p));
  }
  function h(p) {
    return p === null || p === 35 || U(p) ? (n.exit("atxHeadingText"), a(p)) : (n.consume(p), h);
  }
}
const Re = [
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
], vn = ["pre", "script", "style", "textarea"], He = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: je,
  tokenize: Qe
}, Ve = {
  partial: !0,
  tokenize: We
}, $e = {
  partial: !0,
  tokenize: Ue
};
function je(n) {
  let e = n.length;
  for (; e-- && !(n[e][0] === "enter" && n[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && n[e - 2][1].type === "linePrefix" && (n[e][1].start = n[e - 2][1].start, n[e + 1][1].start = n[e - 2][1].start, n.splice(e - 2, 2)), n;
}
function Qe(n, e, t) {
  const r = this;
  let l, i, u, a, m;
  return h;
  function h(s) {
    return p(s);
  }
  function p(s) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(s), f;
  }
  function f(s) {
    return s === 33 ? (n.consume(s), g) : s === 47 ? (n.consume(s), i = !0, z) : s === 63 ? (n.consume(s), l = 3, r.interrupt ? e : o) : X(s) ? (n.consume(s), u = String.fromCharCode(s), T) : t(s);
  }
  function g(s) {
    return s === 45 ? (n.consume(s), l = 2, c) : s === 91 ? (n.consume(s), l = 5, a = 0, b) : X(s) ? (n.consume(s), l = 4, r.interrupt ? e : o) : t(s);
  }
  function c(s) {
    return s === 45 ? (n.consume(s), r.interrupt ? e : o) : t(s);
  }
  function b(s) {
    const Z = "CDATA[";
    return s === Z.charCodeAt(a++) ? (n.consume(s), a === Z.length ? r.interrupt ? e : I : b) : t(s);
  }
  function z(s) {
    return X(s) ? (n.consume(s), u = String.fromCharCode(s), T) : t(s);
  }
  function T(s) {
    if (s === null || s === 47 || s === 62 || U(s)) {
      const Z = s === 47, on = u.toLowerCase();
      return !Z && !i && vn.includes(on) ? (l = 1, r.interrupt ? e(s) : I(s)) : Re.includes(u.toLowerCase()) ? (l = 6, Z ? (n.consume(s), d) : r.interrupt ? e(s) : I(s)) : (l = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(s) : i ? y(s) : S(s));
    }
    return s === 45 || W(s) ? (n.consume(s), u += String.fromCharCode(s), T) : t(s);
  }
  function d(s) {
    return s === 62 ? (n.consume(s), r.interrupt ? e : I) : t(s);
  }
  function y(s) {
    return _(s) ? (n.consume(s), y) : q(s);
  }
  function S(s) {
    return s === 47 ? (n.consume(s), q) : s === 58 || s === 95 || X(s) ? (n.consume(s), P) : _(s) ? (n.consume(s), S) : q(s);
  }
  function P(s) {
    return s === 45 || s === 46 || s === 58 || s === 95 || W(s) ? (n.consume(s), P) : F(s);
  }
  function F(s) {
    return s === 61 ? (n.consume(s), x) : _(s) ? (n.consume(s), F) : S(s);
  }
  function x(s) {
    return s === null || s === 60 || s === 61 || s === 62 || s === 96 ? t(s) : s === 34 || s === 39 ? (n.consume(s), m = s, L) : _(s) ? (n.consume(s), x) : D(s);
  }
  function L(s) {
    return s === m ? (n.consume(s), m = null, N) : s === null || E(s) ? t(s) : (n.consume(s), L);
  }
  function D(s) {
    return s === null || s === 34 || s === 39 || s === 47 || s === 60 || s === 61 || s === 62 || s === 96 || U(s) ? F(s) : (n.consume(s), D);
  }
  function N(s) {
    return s === 47 || s === 62 || _(s) ? S(s) : t(s);
  }
  function q(s) {
    return s === 62 ? (n.consume(s), C) : t(s);
  }
  function C(s) {
    return s === null || E(s) ? I(s) : _(s) ? (n.consume(s), C) : t(s);
  }
  function I(s) {
    return s === 45 && l === 2 ? (n.consume(s), V) : s === 60 && l === 1 ? (n.consume(s), R) : s === 62 && l === 4 ? (n.consume(s), v) : s === 63 && l === 3 ? (n.consume(s), o) : s === 93 && l === 5 ? (n.consume(s), tn) : E(s) && (l === 6 || l === 7) ? (n.exit("htmlFlowData"), n.check(Ve, en, M)(s)) : s === null || E(s) ? (n.exit("htmlFlowData"), M(s)) : (n.consume(s), I);
  }
  function M(s) {
    return n.check($e, O, en)(s);
  }
  function O(s) {
    return n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), A;
  }
  function A(s) {
    return s === null || E(s) ? M(s) : (n.enter("htmlFlowData"), I(s));
  }
  function V(s) {
    return s === 45 ? (n.consume(s), o) : I(s);
  }
  function R(s) {
    return s === 47 ? (n.consume(s), u = "", Y) : I(s);
  }
  function Y(s) {
    if (s === 62) {
      const Z = u.toLowerCase();
      return vn.includes(Z) ? (n.consume(s), v) : I(s);
    }
    return X(s) && u.length < 8 ? (n.consume(s), u += String.fromCharCode(s), Y) : I(s);
  }
  function tn(s) {
    return s === 93 ? (n.consume(s), o) : I(s);
  }
  function o(s) {
    return s === 62 ? (n.consume(s), v) : s === 45 && l === 2 ? (n.consume(s), o) : I(s);
  }
  function v(s) {
    return s === null || E(s) ? (n.exit("htmlFlowData"), en(s)) : (n.consume(s), v);
  }
  function en(s) {
    return n.exit("htmlFlow"), e(s);
  }
}
function Ue(n, e, t) {
  const r = this;
  return l;
  function l(u) {
    return E(u) ? (n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), i) : t(u);
  }
  function i(u) {
    return r.parser.lazy[r.now().line] ? t(u) : e(u);
  }
}
function We(n, e, t) {
  return r;
  function r(l) {
    return n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), n.attempt(yn, e, t);
  }
}
const Ye = {
  name: "htmlText",
  tokenize: ve
};
function ve(n, e, t) {
  const r = this;
  let l, i, u;
  return a;
  function a(o) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(o), m;
  }
  function m(o) {
    return o === 33 ? (n.consume(o), h) : o === 47 ? (n.consume(o), F) : o === 63 ? (n.consume(o), S) : X(o) ? (n.consume(o), D) : t(o);
  }
  function h(o) {
    return o === 45 ? (n.consume(o), p) : o === 91 ? (n.consume(o), i = 0, b) : X(o) ? (n.consume(o), y) : t(o);
  }
  function p(o) {
    return o === 45 ? (n.consume(o), c) : t(o);
  }
  function f(o) {
    return o === null ? t(o) : o === 45 ? (n.consume(o), g) : E(o) ? (u = f, R(o)) : (n.consume(o), f);
  }
  function g(o) {
    return o === 45 ? (n.consume(o), c) : f(o);
  }
  function c(o) {
    return o === 62 ? V(o) : o === 45 ? g(o) : f(o);
  }
  function b(o) {
    const v = "CDATA[";
    return o === v.charCodeAt(i++) ? (n.consume(o), i === v.length ? z : b) : t(o);
  }
  function z(o) {
    return o === null ? t(o) : o === 93 ? (n.consume(o), T) : E(o) ? (u = z, R(o)) : (n.consume(o), z);
  }
  function T(o) {
    return o === 93 ? (n.consume(o), d) : z(o);
  }
  function d(o) {
    return o === 62 ? V(o) : o === 93 ? (n.consume(o), d) : z(o);
  }
  function y(o) {
    return o === null || o === 62 ? V(o) : E(o) ? (u = y, R(o)) : (n.consume(o), y);
  }
  function S(o) {
    return o === null ? t(o) : o === 63 ? (n.consume(o), P) : E(o) ? (u = S, R(o)) : (n.consume(o), S);
  }
  function P(o) {
    return o === 62 ? V(o) : S(o);
  }
  function F(o) {
    return X(o) ? (n.consume(o), x) : t(o);
  }
  function x(o) {
    return o === 45 || W(o) ? (n.consume(o), x) : L(o);
  }
  function L(o) {
    return E(o) ? (u = L, R(o)) : _(o) ? (n.consume(o), L) : V(o);
  }
  function D(o) {
    return o === 45 || W(o) ? (n.consume(o), D) : o === 47 || o === 62 || U(o) ? N(o) : t(o);
  }
  function N(o) {
    return o === 47 ? (n.consume(o), V) : o === 58 || o === 95 || X(o) ? (n.consume(o), q) : E(o) ? (u = N, R(o)) : _(o) ? (n.consume(o), N) : V(o);
  }
  function q(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || W(o) ? (n.consume(o), q) : C(o);
  }
  function C(o) {
    return o === 61 ? (n.consume(o), I) : E(o) ? (u = C, R(o)) : _(o) ? (n.consume(o), C) : N(o);
  }
  function I(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96 ? t(o) : o === 34 || o === 39 ? (n.consume(o), l = o, M) : E(o) ? (u = I, R(o)) : _(o) ? (n.consume(o), I) : (n.consume(o), O);
  }
  function M(o) {
    return o === l ? (n.consume(o), l = void 0, A) : o === null ? t(o) : E(o) ? (u = M, R(o)) : (n.consume(o), M);
  }
  function O(o) {
    return o === null || o === 34 || o === 39 || o === 60 || o === 61 || o === 96 ? t(o) : o === 47 || o === 62 || U(o) ? N(o) : (n.consume(o), O);
  }
  function A(o) {
    return o === 47 || o === 62 || U(o) ? N(o) : t(o);
  }
  function V(o) {
    return o === 62 ? (n.consume(o), n.exit("htmlTextData"), n.exit("htmlText"), e) : t(o);
  }
  function R(o) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), Y;
  }
  function Y(o) {
    return _(o) ? B(n, tn, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : tn(o);
  }
  function tn(o) {
    return n.enter("htmlTextData"), u(o);
  }
}
const Ln = {
  name: "labelEnd",
  resolveAll: Ke,
  resolveTo: Xe,
  tokenize: nr
}, Ze = {
  tokenize: tr
}, Je = {
  tokenize: er
}, Ge = {
  tokenize: rr
};
function Ke(n) {
  let e = -1;
  const t = [];
  for (; ++e < n.length; ) {
    const r = n[e][1];
    if (t.push(n[e]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const l = r.type === "labelImage" ? 4 : 2;
      r.type = "data", e += l;
    }
  }
  return n.length !== t.length && nn(n, 0, n.length, t), n;
}
function Xe(n, e) {
  let t = n.length, r = 0, l, i, u, a;
  for (; t--; )
    if (l = n[t][1], i) {
      if (l.type === "link" || l.type === "labelLink" && l._inactive)
        break;
      n[t][0] === "enter" && l.type === "labelLink" && (l._inactive = !0);
    } else if (u) {
      if (n[t][0] === "enter" && (l.type === "labelImage" || l.type === "labelLink") && !l._balanced && (i = t, l.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else l.type === "labelEnd" && (u = t);
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
      ...n[u][1].end
    }
  }, p = {
    type: "labelText",
    start: {
      ...n[i + r + 2][1].end
    },
    end: {
      ...n[u - 2][1].start
    }
  };
  return a = [["enter", m, e], ["enter", h, e]], a = j(a, n.slice(i + 1, i + r + 3)), a = j(a, [["enter", p, e]]), a = j(a, _n(e.parser.constructs.insideSpan.null, n.slice(i + r + 4, u - 3), e)), a = j(a, [["exit", p, e], n[u - 2], n[u - 1], ["exit", h, e]]), a = j(a, n.slice(u + 1)), a = j(a, [["exit", m, e]]), nn(n, i, n.length, a), n;
}
function nr(n, e, t) {
  const r = this;
  let l = r.events.length, i, u;
  for (; l--; )
    if ((r.events[l][1].type === "labelImage" || r.events[l][1].type === "labelLink") && !r.events[l][1]._balanced) {
      i = r.events[l][1];
      break;
    }
  return a;
  function a(g) {
    return i ? i._inactive ? f(g) : (u = r.parser.defined.includes(xn(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(g), n.exit("labelMarker"), n.exit("labelEnd"), m) : t(g);
  }
  function m(g) {
    return g === 40 ? n.attempt(Ze, p, u ? p : f)(g) : g === 91 ? n.attempt(Je, p, u ? h : f)(g) : u ? p(g) : f(g);
  }
  function h(g) {
    return n.attempt(Ge, p, f)(g);
  }
  function p(g) {
    return e(g);
  }
  function f(g) {
    return i._balanced = !0, t(g);
  }
}
function tr(n, e, t) {
  return r;
  function r(f) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(f), n.exit("resourceMarker"), l;
  }
  function l(f) {
    return U(f) ? gn(n, i)(f) : i(f);
  }
  function i(f) {
    return f === 41 ? p(f) : ut(n, u, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function u(f) {
    return U(f) ? gn(n, m)(f) : p(f);
  }
  function a(f) {
    return t(f);
  }
  function m(f) {
    return f === 34 || f === 39 || f === 40 ? at(n, h, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : p(f);
  }
  function h(f) {
    return U(f) ? gn(n, p)(f) : p(f);
  }
  function p(f) {
    return f === 41 ? (n.enter("resourceMarker"), n.consume(f), n.exit("resourceMarker"), n.exit("resource"), e) : t(f);
  }
}
function er(n, e, t) {
  const r = this;
  return l;
  function l(a) {
    return lt.call(r, n, i, u, "reference", "referenceMarker", "referenceString")(a);
  }
  function i(a) {
    return r.parser.defined.includes(xn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? e(a) : t(a);
  }
  function u(a) {
    return t(a);
  }
}
function rr(n, e, t) {
  return r;
  function r(i) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), l;
  }
  function l(i) {
    return i === 93 ? (n.enter("referenceMarker"), n.consume(i), n.exit("referenceMarker"), n.exit("reference"), e) : t(i);
  }
}
const ir = {
  name: "labelStartImage",
  resolveAll: Ln.resolveAll,
  tokenize: ur
};
function ur(n, e, t) {
  const r = this;
  return l;
  function l(a) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(a), n.exit("labelImageMarker"), i;
  }
  function i(a) {
    return a === 91 ? (n.enter("labelMarker"), n.consume(a), n.exit("labelMarker"), n.exit("labelImage"), u) : t(a);
  }
  function u(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : e(a);
  }
}
const lr = {
  name: "labelStartLink",
  resolveAll: Ln.resolveAll,
  tokenize: ar
};
function ar(n, e, t) {
  const r = this;
  return l;
  function l(u) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(u), n.exit("labelMarker"), n.exit("labelLink"), i;
  }
  function i(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(u) : e(u);
  }
}
const Cn = {
  name: "lineEnding",
  tokenize: or
};
function or(n, e) {
  return t;
  function t(r) {
    return n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), B(n, e, "linePrefix");
  }
}
const Sn = {
  name: "thematicBreak",
  tokenize: sr
};
function sr(n, e, t) {
  let r = 0, l;
  return i;
  function i(h) {
    return n.enter("thematicBreak"), u(h);
  }
  function u(h) {
    return l = h, a(h);
  }
  function a(h) {
    return h === l ? (n.enter("thematicBreakSequence"), m(h)) : r >= 3 && (h === null || E(h)) ? (n.exit("thematicBreak"), e(h)) : t(h);
  }
  function m(h) {
    return h === l ? (n.consume(h), r++, m) : (n.exit("thematicBreakSequence"), _(h) ? B(n, a, "whitespace")(h) : a(h));
  }
}
const Q = {
  continuation: {
    tokenize: pr
  },
  exit: gr,
  name: "list",
  tokenize: fr
}, cr = {
  partial: !0,
  tokenize: xr
}, hr = {
  partial: !0,
  tokenize: mr
};
function fr(n, e, t) {
  const r = this, l = r.events[r.events.length - 1];
  let i = l && l[1].type === "linePrefix" ? l[2].sliceSerialize(l[1], !0).length : 0, u = 0;
  return a;
  function a(c) {
    const b = r.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (b === "listUnordered" ? !r.containerState.marker || c === r.containerState.marker : Tn(c)) {
      if (r.containerState.type || (r.containerState.type = b, n.enter(b, {
        _container: !0
      })), b === "listUnordered")
        return n.enter("listItemPrefix"), c === 42 || c === 45 ? n.check(Sn, t, h)(c) : h(c);
      if (!r.interrupt || c === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), m(c);
    }
    return t(c);
  }
  function m(c) {
    return Tn(c) && ++u < 10 ? (n.consume(c), m) : (!r.interrupt || u < 2) && (r.containerState.marker ? c === r.containerState.marker : c === 41 || c === 46) ? (n.exit("listItemValue"), h(c)) : t(c);
  }
  function h(c) {
    return n.enter("listItemMarker"), n.consume(c), n.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || c, n.check(
      yn,
      // Can’t be empty when interrupting.
      r.interrupt ? t : p,
      n.attempt(cr, g, f)
    );
  }
  function p(c) {
    return r.containerState.initialBlankLine = !0, i++, g(c);
  }
  function f(c) {
    return _(c) ? (n.enter("listItemPrefixWhitespace"), n.consume(c), n.exit("listItemPrefixWhitespace"), g) : t(c);
  }
  function g(c) {
    return r.containerState.size = i + r.sliceSerialize(n.exit("listItemPrefix"), !0).length, e(c);
  }
}
function pr(n, e, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, n.check(yn, l, i);
  function l(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, B(n, e, "listItemIndent", r.containerState.size + 1)(a);
  }
  function i(a) {
    return r.containerState.furtherBlankLines || !_(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, u(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, n.attempt(hr, e, u)(a));
  }
  function u(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, B(n, n.attempt(Q, e, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function mr(n, e, t) {
  const r = this;
  return B(n, l, "listItemIndent", r.containerState.size + 1);
  function l(i) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "listItemIndent" && u[2].sliceSerialize(u[1], !0).length === r.containerState.size ? e(i) : t(i);
  }
}
function gr(n) {
  n.exit(this.containerState.type);
}
function xr(n, e, t) {
  const r = this;
  return B(n, l, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function l(i) {
    const u = r.events[r.events.length - 1];
    return !_(i) && u && u[1].type === "listItemPrefixWhitespace" ? e(i) : t(i);
  }
}
const Zn = {
  name: "setextUnderline",
  resolveTo: kr,
  tokenize: dr
};
function kr(n, e) {
  let t = n.length, r, l, i;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        r = t;
        break;
      }
      n[t][1].type === "paragraph" && (l = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1), !i && n[t][1].type === "definition" && (i = t);
  const u = {
    type: "setextHeading",
    start: {
      ...n[r][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[l][1].type = "setextHeadingText", i ? (n.splice(l, 0, ["enter", u, e]), n.splice(i + 1, 0, ["exit", n[r][1], e]), n[r][1].end = {
    ...n[i][1].end
  }) : n[r][1] = u, n.push(["exit", u, e]), n;
}
function dr(n, e, t) {
  const r = this;
  let l;
  return i;
  function i(h) {
    let p = r.events.length, f;
    for (; p--; )
      if (r.events[p][1].type !== "lineEnding" && r.events[p][1].type !== "linePrefix" && r.events[p][1].type !== "content") {
        f = r.events[p][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (n.enter("setextHeadingLine"), l = h, u(h)) : t(h);
  }
  function u(h) {
    return n.enter("setextHeadingLineSequence"), a(h);
  }
  function a(h) {
    return h === l ? (n.consume(h), a) : (n.exit("setextHeadingLineSequence"), _(h) ? B(n, m, "lineSuffix")(h) : m(h));
  }
  function m(h) {
    return h === null || E(h) ? (n.exit("setextHeadingLine"), e(h)) : t(h);
  }
}
const br = {
  tokenize: Sr
};
function Sr(n) {
  const e = this, t = n.attempt(
    // Try to parse a blank line.
    yn,
    r,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, l, B(n, n.attempt(this.parser.constructs.flow, l, n.attempt(ze, l)), "linePrefix"))
  );
  return t;
  function r(i) {
    if (i === null) {
      n.consume(i);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(i), n.exit("lineEndingBlank"), e.currentConstruct = void 0, t;
  }
  function l(i) {
    if (i === null) {
      n.consume(i);
      return;
    }
    return n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), e.currentConstruct = void 0, t;
  }
}
const yr = {
  resolveAll: st()
}, wr = ot("string"), Ir = ot("text");
function ot(n) {
  return {
    resolveAll: st(n === "text" ? Cr : void 0),
    tokenize: e
  };
  function e(t) {
    const r = this, l = this.parser.constructs[n], i = t.attempt(l, u, a);
    return u;
    function u(p) {
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
      const f = l[p];
      let g = -1;
      if (f)
        for (; ++g < f.length; ) {
          const c = f[g];
          if (!c.previous || c.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function st(n) {
  return e;
  function e(t, r) {
    let l = -1, i;
    for (; ++l <= t.length; )
      i === void 0 ? t[l] && t[l][1].type === "data" && (i = l, l++) : (!t[l] || t[l][1].type !== "data") && (l !== i + 2 && (t[i][1].end = t[l - 1][1].end, t.splice(i + 2, l - i - 2), l = i + 2), i = void 0);
    return n ? n(t, r) : t;
  }
}
function Cr(n, e) {
  let t = 0;
  for (; ++t <= n.length; )
    if ((t === n.length || n[t][1].type === "lineEnding") && n[t - 1][1].type === "data") {
      const r = n[t - 1][1], l = e.sliceStream(r);
      let i = l.length, u = -1, a = 0, m;
      for (; i--; ) {
        const h = l[i];
        if (typeof h == "string") {
          for (u = h.length; h.charCodeAt(u - 1) === 32; )
            a++, u--;
          if (u) break;
          u = -1;
        } else if (h === -2)
          m = !0, a++;
        else if (h !== -1) {
          i++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && t === n.length && (a = 0), a) {
        const h = {
          type: t === n.length || m || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: i ? u : r.start._bufferIndex + u,
            _index: r.start._index + i,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...h.start
        }, r.start.offset === r.end.offset ? Object.assign(r, h) : (n.splice(t, 0, ["enter", h, e], ["exit", h, e]), t += 2);
      }
      t++;
    }
  return n;
}
const zr = {
  42: Q,
  43: Q,
  45: Q,
  48: Q,
  49: Q,
  50: Q,
  51: Q,
  52: Q,
  53: Q,
  54: Q,
  55: Q,
  56: Q,
  57: Q,
  62: tt
}, Er = {
  91: _e
}, Fr = {
  [-2]: In,
  [-1]: In,
  32: In
}, Tr = {
  35: De,
  42: Sn,
  45: [Zn, Sn],
  60: He,
  61: Zn,
  95: Sn,
  96: Yn,
  126: Yn
}, Ar = {
  38: rt,
  92: et
}, _r = {
  [-5]: Cn,
  [-4]: Cn,
  [-3]: Cn,
  33: ir,
  38: rt,
  42: An,
  60: [le, Ye],
  91: lr,
  92: [Me, et],
  93: Ln,
  95: An,
  96: be
}, Lr = {
  null: [An, yr]
}, Pr = {
  null: [42, 95]
}, Br = {
  null: []
}, Mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Pr,
  contentInitial: Er,
  disable: Br,
  document: zr,
  flow: Tr,
  flowInitial: Fr,
  insideSpan: Lr,
  string: Ar,
  text: _r
}, Symbol.toStringTag, { value: "Module" }));
function Or(n, e, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const l = {}, i = [];
  let u = [], a = [];
  const m = {
    attempt: L(F),
    check: L(x),
    consume: y,
    enter: S,
    exit: P,
    interrupt: L(x, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: z,
    events: [],
    now: b,
    parser: n,
    previous: null,
    sliceSerialize: g,
    sliceStream: c,
    write: f
  };
  let p = e.tokenize.call(h, m);
  return e.resolveAll && i.push(e), h;
  function f(C) {
    return u = j(u, C), T(), u[u.length - 1] !== null ? [] : (D(e, 0), h.events = _n(i, h.events, h), h.events);
  }
  function g(C, I) {
    return Nr(c(C), I);
  }
  function c(C) {
    return Dr(u, C);
  }
  function b() {
    const {
      _bufferIndex: C,
      _index: I,
      line: M,
      column: O,
      offset: A
    } = r;
    return {
      _bufferIndex: C,
      _index: I,
      line: M,
      column: O,
      offset: A
    };
  }
  function z(C) {
    l[C.line] = C.column, q();
  }
  function T() {
    let C;
    for (; r._index < u.length; ) {
      const I = u[r._index];
      if (typeof I == "string")
        for (C = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === C && r._bufferIndex < I.length; )
          d(I.charCodeAt(r._bufferIndex));
      else
        d(I);
    }
  }
  function d(C) {
    p = p(C);
  }
  function y(C) {
    E(C) ? (r.line++, r.column = 1, r.offset += C === -3 ? 2 : 1, q()) : C !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    u[r._index].length && (r._bufferIndex = -1, r._index++)), h.previous = C;
  }
  function S(C, I) {
    const M = I || {};
    return M.type = C, M.start = b(), h.events.push(["enter", M, h]), a.push(M), M;
  }
  function P(C) {
    const I = a.pop();
    return I.end = b(), h.events.push(["exit", I, h]), I;
  }
  function F(C, I) {
    D(C, I.from);
  }
  function x(C, I) {
    I.restore();
  }
  function L(C, I) {
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
      ) : v(O);
      function v(H) {
        return hn;
        function hn(un) {
          const sn = un !== null && H[un], cn = un !== null && H.null, wn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(sn) ? sn : sn ? [sn] : [],
            ...Array.isArray(cn) ? cn : cn ? [cn] : []
          ];
          return en(wn)(un);
        }
      }
      function en(H) {
        return R = H, Y = 0, H.length === 0 ? V : s(H[Y]);
      }
      function s(H) {
        return hn;
        function hn(un) {
          return o = N(), tn = H, H.partial || (h.currentConstruct = H), H.name && h.parser.constructs.disable.null.includes(H.name) ? on() : H.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            I ? Object.assign(Object.create(h), I) : h,
            m,
            Z,
            on
          )(un);
        }
      }
      function Z(H) {
        return C(tn, o), A;
      }
      function on(H) {
        return o.restore(), ++Y < R.length ? s(R[Y]) : V;
      }
    }
  }
  function D(C, I) {
    C.resolveAll && !i.includes(C) && i.push(C), C.resolve && nn(h.events, I, h.events.length - I, C.resolve(h.events.slice(I), h)), C.resolveTo && (h.events = C.resolveTo(h.events, h));
  }
  function N() {
    const C = b(), I = h.previous, M = h.currentConstruct, O = h.events.length, A = Array.from(a);
    return {
      from: O,
      restore: V
    };
    function V() {
      r = C, h.previous = I, h.currentConstruct = M, h.events.length = O, a = A, q();
    }
  }
  function q() {
    r.line in l && r.column < 2 && (r.column = l[r.line], r.offset += l[r.line] - 1);
  }
}
function Dr(n, e) {
  const t = e.start._index, r = e.start._bufferIndex, l = e.end._index, i = e.end._bufferIndex;
  let u;
  if (t === l)
    u = [n[t].slice(r, i)];
  else {
    if (u = n.slice(t, l), r > -1) {
      const a = u[0];
      typeof a == "string" ? u[0] = a.slice(r) : u.shift();
    }
    i > 0 && u.push(n[l].slice(0, i));
  }
  return u;
}
function Nr(n, e) {
  let t = -1;
  const r = [];
  let l;
  for (; ++t < n.length; ) {
    const i = n[t];
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
        u = e ? " " : "	";
        break;
      }
      case -1: {
        if (!e && l) continue;
        u = " ";
        break;
      }
      default:
        u = String.fromCharCode(i);
    }
    l = i === -2, r.push(u);
  }
  return r.join("");
}
function qr(n) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      qt([Mr, ...(n || {}).extensions || []])
    ),
    content: l(Xt),
    defined: [],
    document: l(te),
    flow: l(br),
    lazy: {},
    string: l(wr),
    text: l(Ir)
  };
  return r;
  function l(i) {
    return u;
    function u(a) {
      return Or(r, i, a);
    }
  }
}
function Rr(n) {
  for (; !it(n); )
    ;
  return n;
}
const Jn = /[\0\t\n\r]/g;
function Hr() {
  let n = 1, e = "", t = !0, r;
  return l;
  function l(i, u, a) {
    const m = [];
    let h, p, f, g, c;
    for (i = e + (typeof i == "string" ? i.toString() : new TextDecoder(u || void 0).decode(i)), f = 0, e = "", t && (i.charCodeAt(0) === 65279 && f++, t = void 0); f < i.length; ) {
      if (Jn.lastIndex = f, h = Jn.exec(i), g = h && h.index !== void 0 ? h.index : i.length, c = i.charCodeAt(g), !h) {
        e = i.slice(f);
        break;
      }
      if (c === 10 && f === g && r)
        m.push(-3), r = void 0;
      else
        switch (r && (m.push(-5), r = void 0), f < g && (m.push(i.slice(f, g)), n += g - f), c) {
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
            r = !0, n = 1;
        }
      f = g + 1;
    }
    return a && (r && m.push(-5), e && m.push(e), m.push(null)), m;
  }
}
function Vr(n, e, t) {
  return typeof e != "string" && (t = e, e = void 0), Kt(t)(Rr(qr(t).document().write(Hr()(n, e, !0))));
}
function $r(n) {
  const e = jr(n), t = Qr(e);
  return `<math display="block">${ln(t)}</math>`;
}
function jr(n) {
  return n.match(/[A-Za-z][A-Za-z ]*|\d+(?:\.\d+)?|[=()+\-*/]/g)?.map((e) => e.trim()) ?? [];
}
function Qr(n) {
  let e = 0;
  function t() {
    const u = n[e++];
    if (u === void 0) return null;
    if (/^\d/.test(u)) return { type: "number", value: u };
    if (/^[A-Za-z]/.test(u)) return { type: "identifier", value: u };
    if (u === "(") {
      const a = l();
      return e++, a ? { type: "group", value: a } : null;
    }
    return null;
  }
  function r() {
    let u = t();
    for (; u && (n[e] === "*" || n[e] === "/"); ) {
      const a = n[e++] ?? "?", m = t();
      if (!m) break;
      u = { type: "binary", op: a, left: u, right: m };
    }
    return u;
  }
  function l() {
    let u = r();
    for (; u && (n[e] === "+" || n[e] === "-"); ) {
      const a = n[e++] ?? "?", m = r();
      if (!m) break;
      u = { type: "binary", op: a, left: u, right: m };
    }
    return u;
  }
  function i() {
    let u = l();
    if (n[e] === "=") {
      e++;
      const a = i();
      a && (u = { type: "binary", op: "=", left: u, right: a });
    }
    return u;
  }
  return i();
}
function ln(n) {
  if (!n) return "";
  switch (n.type) {
    case "number":
      return `<mn>${n.value}</mn>`;
    case "identifier":
      return `<mi>${n.value}</mi>`;
    case "group":
      return `<mrow><mo>(</mo>${ln(n.value)}<mo>)</mo></mrow>`;
    case "binary":
      switch (n.op) {
        case "/":
          return `<mfrac>${ln(n.left)}${ln(n.right)}</mfrac>`;
        case "*":
          return `<mrow>${ln(n.left)}<mo>×</mo>${ln(n.right)}</mrow>`;
        default:
          return `<mrow>${ln(n.left)}<mo>${n.op}</mo>${ln(n.right)}</mrow>`;
      }
  }
}
const Ur = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }, zn = {
  allowDangerousHtml: !1,
  allowDangerousProtocol: !1,
  extensions: [],
  htmlExtensions: [Wr()]
};
let Gn = !1, mn, dn, bn;
class Zr {
  // Operations - Highligh previously rendered markdown.
  async highlight(e, t) {
    if (typeof document > "u") return;
    const { highlightElement: r } = await vr(t);
    e.querySelectorAll('div[class^="shj-lang-"]').forEach((l) => {
      (/shj-lang-([^\s]+)/.exec(l.className) || [])[1] === "javascript" && (r(l, "js", "multiline", { hideLineNumbers: !0 }), Object.assign(l.style, {
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, Liberation Mono, monospace",
        fontSize: "14px"
      }));
    });
  }
  // Operations - Render markdown.
  async render(e, t) {
    return (t?.tables ?? !1) && (!Gn && !mn && (mn = (async () => {
      const r = await import("./index-BWwnyobY.js");
      zn.extensions?.push(r.gfmTable()), zn.htmlExtensions?.push(r.gfmTableHtml()), Gn = !0, mn = void 0;
    })()), mn && await mn), Vr(e, zn);
  }
  // Operations - Set color mode.
  setColorMode(e) {
    ct(e);
  }
}
function ct(n) {
  if (typeof document > "u") return;
  const e = n === "dark" ? "theme-dark" : "theme-light";
  document.querySelectorAll("style[data-dynamic]").forEach((t) => t.disabled = t.id !== e);
}
function Wr() {
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
      codeFencedFenceInfo(e) {
        n !== void 0 && (n.lang = this.sliceSerialize(e));
      },
      codeFencedFenceMeta(e) {
        n !== void 0 && (n.meta = this.sliceSerialize(e));
      },
      codeFlowValue(e) {
        n !== void 0 && n.codeContent.push(this.sliceSerialize(e));
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
        const e = n ?? { codeContent: [], lang: "", meta: "" };
        this.resume();
        const t = e.codeContent.join(`
`), r = e.lang || "plain", l = e.meta || "";
        let i = "";
        if (r === "json")
          if (l === "datapos-visual")
            i = `<div class="${l}" data-options="${encodeURIComponent(t)}"></div>`;
          else if (l === "datapos-formula") {
            const u = JSON.parse(t);
            i = $r(u.expression);
          } else l === "datapos-highcharts" && (i = `<div class="${l}" data-options="${encodeURIComponent(t)}"></div>`);
        else
          i = `<div class="shj-lang-${r.replaceAll(/[^a-z0-9_-]/gi, "")}">${Yr(t)}</div>`;
        this.raw(i), n = void 0;
      }
    }
  };
}
function Yr(n) {
  return n.replaceAll(/[&<>"']/g, (e) => Ur[e]);
}
function Kn(n, e) {
  if (typeof document > "u") return;
  let t = document.getElementById(e);
  t == null && (t = document.createElement("style"), t.id = e, t.dataset.dynamic = "true", document.head.appendChild(t)), t.innerHTML = n, t.disabled = !0;
}
async function vr(n) {
  return dn || (bn || (bn = (async () => {
    const [e, t, r] = await Promise.all([
      import("./index-BgHmvLYe.js"),
      import("./github-dark-O5tSO1Qn.js"),
      import("./github-light-MQ8W3G6n.js")
    ]);
    return dn = e, Kn(t.default, "theme-dark"), Kn(r.default, "theme-light"), ct(n), bn = void 0, dn;
  })()), bn);
}
export {
  Zr as M,
  _ as a,
  U as b,
  B as f,
  E as m
};
