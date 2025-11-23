const on = document.createElement("i");
function In(t) {
  const e = "&" + t + ";";
  on.innerHTML = e;
  const n = on.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && t !== "semi" || n === e ? !1 : n
  );
}
function Q(t, e, n, r) {
  const u = t.length;
  let a = 0, i;
  if (e < 0 ? e = -e > u ? 0 : u + e : e = e > u ? u : e, n = n > 0 ? n : 0, r.length < 1e4)
    i = Array.from(r), i.unshift(e, n), t.splice(...i);
  else
    for (n && t.splice(e, n); a < r.length; )
      i = r.slice(a, a + 1e4), i.unshift(e, 0), t.splice(...i), a += 1e4, e += 1e4;
}
function G(t, e) {
  return t.length > 0 ? (Q(t, t.length, 0, e), t) : e;
}
const vt = {}.hasOwnProperty;
function Tn(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    Br(e, t[n]);
  return e;
}
function Br(t, e) {
  let n;
  for (n in e) {
    const u = (vt.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let i;
    if (a)
      for (i in a) {
        vt.call(u, i) || (u[i] = []);
        const l = a[i];
        Hr(
          // @ts-expect-error Looks like a list.
          u[i],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function Hr(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  Q(t, 0, 0, r);
}
function Cn(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    Ur(e, t[n]);
  return e;
}
function Ur(t, e) {
  let n;
  for (n in e) {
    const u = (vt.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let i;
    if (a)
      for (i in a)
        u[i] = a[i];
  }
}
function jr(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
const $r = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function wn(t) {
  return t.replace(/["&<>]/g, e);
  function e(n) {
    return "&" + $r[
      /** @type {keyof typeof characterReferences} */
      n
    ] + ";";
  }
}
function rt(t) {
  return t.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Y = mt(/[A-Za-z]/), W = mt(/[\dA-Za-z]/), qr = mt(/[#-'*+\--9=?A-Z^-~]/);
function Lt(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < 32 || t === 127)
  );
}
const Bt = mt(/\d/), Vr = mt(/[\dA-Fa-f]/), Gr = mt(/[!-/:-@[-`{-~]/);
function A(t) {
  return t !== null && t < -2;
}
function v(t) {
  return t !== null && (t < 0 || t === 32);
}
function F(t) {
  return t === -2 || t === -1 || t === 32;
}
const jt = mt(/\p{P}|\p{S}/u), Et = mt(/\s/);
function mt(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function pt(t, e) {
  const n = wn(Wr(t || ""));
  if (!e)
    return n;
  const r = n.indexOf(":"), u = n.indexOf("?"), a = n.indexOf("#"), i = n.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i > -1 && r > i || u > -1 && r > u || a > -1 && r > a || // It is a protocol, it should be allowed.
    e.test(n.slice(0, r)) ? n : ""
  );
}
function Wr(t) {
  const e = [];
  let n = -1, r = 0, u = 0;
  for (; ++n < t.length; ) {
    const a = t.charCodeAt(n);
    let i = "";
    if (a === 37 && W(t.charCodeAt(n + 1)) && W(t.charCodeAt(n + 2)))
      u = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (i = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const l = t.charCodeAt(n + 1);
      a < 56320 && l > 56319 && l < 57344 ? (i = String.fromCharCode(a, l), u = 1) : i = "�";
    } else
      i = String.fromCharCode(a);
    i && (e.push(t.slice(r, n), encodeURIComponent(i)), r = n + u + 1, i = ""), u && (n += u, u = 0);
  }
  return e.join("") + t.slice(r);
}
const sn = {}.hasOwnProperty, hn = /^(https?|ircs?|mailto|xmpp)$/i, Yr = /^https?$/i;
function Zr(t) {
  const e = t || {};
  let n = !0;
  const r = {}, u = [[]], a = [], i = [], h = (
    /** @type {NormalizedHtmlExtension} */
    Cn([{
      enter: {
        blockQuote: P,
        codeFenced: at,
        codeFencedFenceInfo: D,
        codeFencedFenceMeta: D,
        codeIndented: ut,
        codeText: Or,
        content: kr,
        definition: gr,
        definitionDestinationString: fr,
        definitionLabelString: D,
        definitionTitleString: D,
        emphasis: Lr,
        htmlFlow: Dr,
        htmlText: en,
        image: J,
        label: D,
        link: bt,
        listItemMarker: T,
        listItemValue: x,
        listOrdered: B,
        listUnordered: U,
        paragraph: j,
        reference: D,
        resource: xt,
        resourceDestinationString: dt,
        resourceTitleString: D,
        setextHeading: yr,
        strong: Fr
      },
      exit: {
        atxHeading: Ir,
        atxHeadingSequence: Er,
        autolinkEmail: vr,
        autolinkProtocol: _r,
        blockQuote: q,
        characterEscapeValue: St,
        characterReferenceMarkerHexadecimal: rn,
        characterReferenceMarkerNumeric: rn,
        characterReferenceValue: Mr,
        codeFenced: g,
        codeFencedFence: K,
        codeFencedFenceInfo: m,
        codeFencedFenceMeta: N,
        codeFlowValue: Ar,
        codeIndented: g,
        codeText: Nr,
        codeTextData: St,
        data: St,
        definition: dr,
        definitionDestinationString: br,
        definitionLabelString: pr,
        definitionTitleString: xr,
        emphasis: Rr,
        hardBreakEscape: tn,
        hardBreakTrailing: tn,
        htmlFlow: nn,
        htmlFlowData: St,
        htmlText: nn,
        htmlTextData: St,
        image: Jt,
        label: yt,
        labelText: $,
        lineEnding: wr,
        link: Jt,
        listOrdered: w,
        listUnordered: _,
        paragraph: X,
        reference: N,
        referenceString: ht,
        resource: N,
        resourceDestinationString: Nt,
        resourceTitleString: mr,
        setextHeading: Cr,
        setextHeadingLineSequence: Tr,
        setextHeadingText: Sr,
        strong: zr,
        thematicBreak: Pr
      }
    }, ...e.htmlExtensions || []])
  ), s = {
    definitions: r,
    tightStack: i
  }, p = {
    buffer: D,
    encode: d,
    getData: I,
    lineEndingIfNeeded: L,
    options: e,
    raw: y,
    resume: k,
    setData: b,
    tag: S
  };
  let o = e.defaultLineEnding;
  return f;
  function f(E) {
    let C = -1, V = 0;
    const tt = [];
    let nt = [], lt = [];
    for (; ++C < E.length; )
      !o && (E[C][1].type === "lineEnding" || E[C][1].type === "lineEndingBlank") && (o = /** @type {LineEnding} */
      E[C][2].sliceSerialize(E[C][1])), (E[C][1].type === "listOrdered" || E[C][1].type === "listUnordered") && (E[C][0] === "enter" ? tt.push(C) : c(E.slice(tt.pop(), C))), E[C][1].type === "definition" && (E[C][0] === "enter" ? (lt = G(lt, E.slice(V, C)), V = C) : (nt = G(nt, E.slice(V, C + 1)), V = C + 1));
    nt = G(nt, lt), nt = G(nt, E.slice(V)), C = -1;
    const et = nt;
    for (h.enter.null && h.enter.null.call(p); ++C < E.length; ) {
      const an = h[et[C][0]], un = et[C][1].type, ln = an[un];
      sn.call(an, un) && ln && ln.call({
        sliceSerialize: et[C][2].sliceSerialize,
        ...p
      }, et[C][1]);
    }
    return h.exit.null && h.exit.null.call(p), u[0].join("");
  }
  function c(E) {
    const C = E.length;
    let V = 0, tt = 0, nt = !1, lt;
    for (; ++V < C; ) {
      const et = E[V];
      if (et[1]._container)
        lt = void 0, et[0] === "enter" ? tt++ : tt--;
      else switch (et[1].type) {
        case "listItemPrefix": {
          et[0] === "exit" && (lt = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          et[0] === "enter" && !tt && (lt ? lt = void 0 : nt = !0);
          break;
        }
        default:
          lt = void 0;
      }
    }
    E[0][1]._loose = nt;
  }
  function b(E, C) {
    s[E] = C;
  }
  function I(E) {
    return s[E];
  }
  function D() {
    u.push([]);
  }
  function k() {
    return u.pop().join("");
  }
  function S(E) {
    n && (b("lastWasTag", !0), u[u.length - 1].push(E));
  }
  function y(E) {
    b("lastWasTag"), u[u.length - 1].push(E);
  }
  function M() {
    y(o || `
`);
  }
  function L() {
    const E = u[u.length - 1], C = E[E.length - 1], V = C ? C.charCodeAt(C.length - 1) : null;
    V === 10 || V === 13 || V === null || M();
  }
  function d(E) {
    return I("ignoreEncode") ? E : wn(E);
  }
  function N() {
    k();
  }
  function B(E) {
    i.push(!E._loose), L(), S("<ol"), b("expectFirstItem", !0);
  }
  function U(E) {
    i.push(!E._loose), L(), S("<ul"), b("expectFirstItem", !0);
  }
  function x(E) {
    if (I("expectFirstItem")) {
      const C = Number.parseInt(this.sliceSerialize(E), 10);
      C !== 1 && S(' start="' + d(String(C)) + '"');
    }
  }
  function T() {
    I("expectFirstItem") ? S(">") : H(), L(), S("<li>"), b("expectFirstItem"), b("lastWasTag");
  }
  function w() {
    H(), i.pop(), M(), S("</ol>");
  }
  function _() {
    H(), i.pop(), M(), S("</ul>");
  }
  function H() {
    I("lastWasTag") && !I("slurpAllLineEndings") && L(), S("</li>"), b("slurpAllLineEndings");
  }
  function P() {
    i.push(!1), L(), S("<blockquote>");
  }
  function q() {
    i.pop(), L(), S("</blockquote>"), b("slurpAllLineEndings");
  }
  function j() {
    i[i.length - 1] || (L(), S("<p>")), b("slurpAllLineEndings");
  }
  function X() {
    i[i.length - 1] ? b("slurpAllLineEndings", !0) : S("</p>");
  }
  function at() {
    L(), S("<pre><code"), b("fencesCount", 0);
  }
  function m() {
    const E = k();
    S(' class="language-' + E + '"');
  }
  function K() {
    const E = I("fencesCount") || 0;
    E || (S(">"), b("slurpOneLineEnding", !0)), b("fencesCount", E + 1);
  }
  function ut() {
    L(), S("<pre><code>");
  }
  function g() {
    const E = I("fencesCount");
    E !== void 0 && E < 2 && s.tightStack.length > 0 && !I("lastWasTag") && M(), I("flowCodeSeenData") && L(), S("</code></pre>"), E !== void 0 && E < 2 && L(), b("flowCodeSeenData"), b("fencesCount"), b("slurpOneLineEnding");
  }
  function J() {
    a.push({
      image: !0
    }), n = void 0;
  }
  function bt() {
    a.push({});
  }
  function $(E) {
    a[a.length - 1].labelId = this.sliceSerialize(E);
  }
  function yt() {
    a[a.length - 1].label = k();
  }
  function ht(E) {
    a[a.length - 1].referenceId = this.sliceSerialize(E);
  }
  function xt() {
    D(), a[a.length - 1].destination = "";
  }
  function dt() {
    D(), b("ignoreEncode", !0);
  }
  function Nt() {
    a[a.length - 1].destination = k(), b("ignoreEncode");
  }
  function mr() {
    a[a.length - 1].title = k();
  }
  function Jt() {
    let E = a.length - 1;
    const C = a[E], V = C.referenceId || C.labelId, tt = C.destination === void 0 ? r[rt(V)] : C;
    for (n = !0; E--; )
      if (a[E].image) {
        n = void 0;
        break;
      }
    C.image ? (S('<img src="' + pt(tt.destination, e.allowDangerousProtocol ? void 0 : Yr) + '" alt="'), y(C.label), S('"')) : S('<a href="' + pt(tt.destination, e.allowDangerousProtocol ? void 0 : hn) + '"'), S(tt.title ? ' title="' + tt.title + '"' : ""), C.image ? S(" />") : (S(">"), y(C.label), S("</a>")), a.pop();
  }
  function gr() {
    D(), a.push({});
  }
  function pr(E) {
    k(), a[a.length - 1].labelId = this.sliceSerialize(E);
  }
  function fr() {
    D(), b("ignoreEncode", !0);
  }
  function br() {
    a[a.length - 1].destination = k(), b("ignoreEncode");
  }
  function xr() {
    a[a.length - 1].title = k();
  }
  function dr() {
    const E = a[a.length - 1], C = rt(E.labelId);
    k(), sn.call(r, C) || (r[C] = a[a.length - 1]), a.pop();
  }
  function kr() {
    b("slurpAllLineEndings", !0);
  }
  function Er(E) {
    I("headingRank") || (b("headingRank", this.sliceSerialize(E).length), L(), S("<h" + I("headingRank") + ">"));
  }
  function yr() {
    D(), b("slurpAllLineEndings");
  }
  function Sr() {
    b("slurpAllLineEndings", !0);
  }
  function Ir() {
    S("</h" + I("headingRank") + ">"), b("headingRank");
  }
  function Tr(E) {
    b("headingRank", this.sliceSerialize(E).charCodeAt(0) === 61 ? 1 : 2);
  }
  function Cr() {
    const E = k();
    L(), S("<h" + I("headingRank") + ">"), y(E), S("</h" + I("headingRank") + ">"), b("slurpAllLineEndings"), b("headingRank");
  }
  function St(E) {
    y(d(this.sliceSerialize(E)));
  }
  function wr(E) {
    if (!I("slurpAllLineEndings")) {
      if (I("slurpOneLineEnding")) {
        b("slurpOneLineEnding");
        return;
      }
      if (I("inCodeText")) {
        y(" ");
        return;
      }
      y(d(this.sliceSerialize(E)));
    }
  }
  function Ar(E) {
    y(d(this.sliceSerialize(E))), b("flowCodeSeenData", !0);
  }
  function tn() {
    S("<br />");
  }
  function Dr() {
    L(), en();
  }
  function nn() {
    b("ignoreEncode");
  }
  function en() {
    e.allowDangerousHtml && b("ignoreEncode", !0);
  }
  function Lr() {
    S("<em>");
  }
  function Fr() {
    S("<strong>");
  }
  function Or() {
    b("inCodeText", !0), S("<code>");
  }
  function Nr() {
    b("inCodeText"), S("</code>");
  }
  function Rr() {
    S("</em>");
  }
  function zr() {
    S("</strong>");
  }
  function Pr() {
    L(), S("<hr />");
  }
  function rn(E) {
    b("characterReferenceType", E.type);
  }
  function Mr(E) {
    const C = this.sliceSerialize(E), V = I("characterReferenceType") ? jr(C, I("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : In(C);
    y(d(
      /** @type {string} */
      V
    )), b("characterReferenceType");
  }
  function _r(E) {
    const C = this.sliceSerialize(E);
    S('<a href="' + pt(C, e.allowDangerousProtocol ? void 0 : hn) + '">'), y(d(C)), S("</a>");
  }
  function vr(E) {
    const C = this.sliceSerialize(E);
    S('<a href="' + pt("mailto:" + C) + '">'), y(d(C)), S("</a>");
  }
}
function z(t, e, n, r) {
  const u = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return i;
  function i(h) {
    return F(h) ? (t.enter(n), l(h)) : e(h);
  }
  function l(h) {
    return F(h) && a++ < u ? (t.consume(h), l) : (t.exit(n), e(h));
  }
}
const Qr = {
  tokenize: Xr
};
function Xr(t) {
  const e = t.attempt(this.parser.constructs.contentInitial, r, u);
  let n;
  return e;
  function r(l) {
    if (l === null) {
      t.consume(l);
      return;
    }
    return t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), z(t, e, "linePrefix");
  }
  function u(l) {
    return t.enter("paragraph"), a(l);
  }
  function a(l) {
    const h = t.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = h), n = h, i(l);
  }
  function i(l) {
    if (l === null) {
      t.exit("chunkText"), t.exit("paragraph"), t.consume(l);
      return;
    }
    return A(l) ? (t.consume(l), t.exit("chunkText"), a) : (t.consume(l), i);
  }
}
const Kr = {
  tokenize: Jr
}, cn = {
  tokenize: ti
};
function Jr(t) {
  const e = this, n = [];
  let r = 0, u, a, i;
  return l;
  function l(y) {
    if (r < n.length) {
      const M = n[r];
      return e.containerState = M[1], t.attempt(M[0].continuation, h, s)(y);
    }
    return s(y);
  }
  function h(y) {
    if (r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, u && S();
      const M = e.events.length;
      let L = M, d;
      for (; L--; )
        if (e.events[L][0] === "exit" && e.events[L][1].type === "chunkFlow") {
          d = e.events[L][1].end;
          break;
        }
      k(r);
      let N = M;
      for (; N < e.events.length; )
        e.events[N][1].end = {
          ...d
        }, N++;
      return Q(e.events, L + 1, 0, e.events.slice(M)), e.events.length = N, s(y);
    }
    return l(y);
  }
  function s(y) {
    if (r === n.length) {
      if (!u)
        return f(y);
      if (u.currentConstruct && u.currentConstruct.concrete)
        return b(y);
      e.interrupt = !!(u.currentConstruct && !u._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(cn, p, o)(y);
  }
  function p(y) {
    return u && S(), k(r), f(y);
  }
  function o(y) {
    return e.parser.lazy[e.now().line] = r !== n.length, i = e.now().offset, b(y);
  }
  function f(y) {
    return e.containerState = {}, t.attempt(cn, c, b)(y);
  }
  function c(y) {
    return r++, n.push([e.currentConstruct, e.containerState]), f(y);
  }
  function b(y) {
    if (y === null) {
      u && S(), k(0), t.consume(y);
      return;
    }
    return u = u || e.parser.flow(e.now()), t.enter("chunkFlow", {
      _tokenizer: u,
      contentType: "flow",
      previous: a
    }), I(y);
  }
  function I(y) {
    if (y === null) {
      D(t.exit("chunkFlow"), !0), k(0), t.consume(y);
      return;
    }
    return A(y) ? (t.consume(y), D(t.exit("chunkFlow")), r = 0, e.interrupt = void 0, l) : (t.consume(y), I);
  }
  function D(y, M) {
    const L = e.sliceStream(y);
    if (M && L.push(null), y.previous = a, a && (a.next = y), a = y, u.defineSkip(y.start), u.write(L), e.parser.lazy[y.start.line]) {
      let d = u.events.length;
      for (; d--; )
        if (
          // The token starts before the line ending…
          u.events[d][1].start.offset < i && // …and either is not ended yet…
          (!u.events[d][1].end || // …or ends after it.
          u.events[d][1].end.offset > i)
        )
          return;
      const N = e.events.length;
      let B = N, U, x;
      for (; B--; )
        if (e.events[B][0] === "exit" && e.events[B][1].type === "chunkFlow") {
          if (U) {
            x = e.events[B][1].end;
            break;
          }
          U = !0;
        }
      for (k(r), d = N; d < e.events.length; )
        e.events[d][1].end = {
          ...x
        }, d++;
      Q(e.events, B + 1, 0, e.events.slice(N)), e.events.length = d;
    }
  }
  function k(y) {
    let M = n.length;
    for (; M-- > y; ) {
      const L = n[M];
      e.containerState = L[1], L[0].exit.call(e, t);
    }
    n.length = y;
  }
  function S() {
    u.write([null]), a = void 0, u = void 0, e.containerState._closeFlow = void 0;
  }
}
function ti(t, e, n) {
  return z(t, t.attempt(this.parser.constructs.document, e, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Ft(t) {
  if (t === null || v(t) || Et(t))
    return 1;
  if (jt(t))
    return 2;
}
function Ot(t, e, n) {
  const r = [];
  let u = -1;
  for (; ++u < t.length; ) {
    const a = t[u].resolveAll;
    a && !r.includes(a) && (e = a(e, n), r.push(a));
  }
  return e;
}
const Ht = {
  name: "attention",
  resolveAll: ni,
  tokenize: ei
};
function ni(t, e) {
  let n = -1, r, u, a, i, l, h, s, p;
  for (; ++n < t.length; )
    if (t[n][0] === "enter" && t[n][1].type === "attentionSequence" && t[n][1]._close) {
      for (r = n; r--; )
        if (t[r][0] === "exit" && t[r][1].type === "attentionSequence" && t[r][1]._open && // If the markers are the same:
        e.sliceSerialize(t[r][1]).charCodeAt(0) === e.sliceSerialize(t[n][1]).charCodeAt(0)) {
          if ((t[r][1]._close || t[n][1]._open) && (t[n][1].end.offset - t[n][1].start.offset) % 3 && !((t[r][1].end.offset - t[r][1].start.offset + t[n][1].end.offset - t[n][1].start.offset) % 3))
            continue;
          h = t[r][1].end.offset - t[r][1].start.offset > 1 && t[n][1].end.offset - t[n][1].start.offset > 1 ? 2 : 1;
          const o = {
            ...t[r][1].end
          }, f = {
            ...t[n][1].start
          };
          mn(o, -h), mn(f, h), i = {
            type: h > 1 ? "strongSequence" : "emphasisSequence",
            start: o,
            end: {
              ...t[r][1].end
            }
          }, l = {
            type: h > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...t[n][1].start
            },
            end: f
          }, a = {
            type: h > 1 ? "strongText" : "emphasisText",
            start: {
              ...t[r][1].end
            },
            end: {
              ...t[n][1].start
            }
          }, u = {
            type: h > 1 ? "strong" : "emphasis",
            start: {
              ...i.start
            },
            end: {
              ...l.end
            }
          }, t[r][1].end = {
            ...i.start
          }, t[n][1].start = {
            ...l.end
          }, s = [], t[r][1].end.offset - t[r][1].start.offset && (s = G(s, [["enter", t[r][1], e], ["exit", t[r][1], e]])), s = G(s, [["enter", u, e], ["enter", i, e], ["exit", i, e], ["enter", a, e]]), s = G(s, Ot(e.parser.constructs.insideSpan.null, t.slice(r + 1, n), e)), s = G(s, [["exit", a, e], ["enter", l, e], ["exit", l, e], ["exit", u, e]]), t[n][1].end.offset - t[n][1].start.offset ? (p = 2, s = G(s, [["enter", t[n][1], e], ["exit", t[n][1], e]])) : p = 0, Q(t, r - 1, n - r + 3, s), n = r + s.length - p - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function ei(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, u = Ft(r);
  let a;
  return i;
  function i(h) {
    return a = h, t.enter("attentionSequence"), l(h);
  }
  function l(h) {
    if (h === a)
      return t.consume(h), l;
    const s = t.exit("attentionSequence"), p = Ft(h), o = !p || p === 2 && u || n.includes(h), f = !u || u === 2 && p || n.includes(r);
    return s._open = !!(a === 42 ? o : o && (u || !f)), s._close = !!(a === 42 ? f : f && (p || !o)), e(h);
  }
}
function mn(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const ri = {
  name: "autolink",
  tokenize: ii
};
function ii(t, e, n) {
  let r = 0;
  return u;
  function u(c) {
    return t.enter("autolink"), t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.enter("autolinkProtocol"), a;
  }
  function a(c) {
    return Y(c) ? (t.consume(c), i) : c === 64 ? n(c) : s(c);
  }
  function i(c) {
    return c === 43 || c === 45 || c === 46 || W(c) ? (r = 1, l(c)) : s(c);
  }
  function l(c) {
    return c === 58 ? (t.consume(c), r = 0, h) : (c === 43 || c === 45 || c === 46 || W(c)) && r++ < 32 ? (t.consume(c), l) : (r = 0, s(c));
  }
  function h(c) {
    return c === 62 ? (t.exit("autolinkProtocol"), t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.exit("autolink"), e) : c === null || c === 32 || c === 60 || Lt(c) ? n(c) : (t.consume(c), h);
  }
  function s(c) {
    return c === 64 ? (t.consume(c), p) : qr(c) ? (t.consume(c), s) : n(c);
  }
  function p(c) {
    return W(c) ? o(c) : n(c);
  }
  function o(c) {
    return c === 46 ? (t.consume(c), r = 0, p) : c === 62 ? (t.exit("autolinkProtocol").type = "autolinkEmail", t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.exit("autolink"), e) : f(c);
  }
  function f(c) {
    if ((c === 45 || W(c)) && r++ < 63) {
      const b = c === 45 ? f : o;
      return t.consume(c), b;
    }
    return n(c);
  }
}
const wt = {
  partial: !0,
  tokenize: ai
};
function ai(t, e, n) {
  return r;
  function r(a) {
    return F(a) ? z(t, u, "linePrefix")(a) : u(a);
  }
  function u(a) {
    return a === null || A(a) ? e(a) : n(a);
  }
}
const An = {
  continuation: {
    tokenize: li
  },
  exit: oi,
  name: "blockQuote",
  tokenize: ui
};
function ui(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    if (i === 62) {
      const l = r.containerState;
      return l.open || (t.enter("blockQuote", {
        _container: !0
      }), l.open = !0), t.enter("blockQuotePrefix"), t.enter("blockQuoteMarker"), t.consume(i), t.exit("blockQuoteMarker"), a;
    }
    return n(i);
  }
  function a(i) {
    return F(i) ? (t.enter("blockQuotePrefixWhitespace"), t.consume(i), t.exit("blockQuotePrefixWhitespace"), t.exit("blockQuotePrefix"), e) : (t.exit("blockQuotePrefix"), e(i));
  }
}
function li(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    return F(i) ? z(t, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : a(i);
  }
  function a(i) {
    return t.attempt(An, e, n)(i);
  }
}
function oi(t) {
  t.exit("blockQuote");
}
const Dn = {
  name: "characterEscape",
  tokenize: si
};
function si(t, e, n) {
  return r;
  function r(a) {
    return t.enter("characterEscape"), t.enter("escapeMarker"), t.consume(a), t.exit("escapeMarker"), u;
  }
  function u(a) {
    return Gr(a) ? (t.enter("characterEscapeValue"), t.consume(a), t.exit("characterEscapeValue"), t.exit("characterEscape"), e) : n(a);
  }
}
const Ln = {
  name: "characterReference",
  tokenize: hi
};
function hi(t, e, n) {
  const r = this;
  let u = 0, a, i;
  return l;
  function l(o) {
    return t.enter("characterReference"), t.enter("characterReferenceMarker"), t.consume(o), t.exit("characterReferenceMarker"), h;
  }
  function h(o) {
    return o === 35 ? (t.enter("characterReferenceMarkerNumeric"), t.consume(o), t.exit("characterReferenceMarkerNumeric"), s) : (t.enter("characterReferenceValue"), a = 31, i = W, p(o));
  }
  function s(o) {
    return o === 88 || o === 120 ? (t.enter("characterReferenceMarkerHexadecimal"), t.consume(o), t.exit("characterReferenceMarkerHexadecimal"), t.enter("characterReferenceValue"), a = 6, i = Vr, p) : (t.enter("characterReferenceValue"), a = 7, i = Bt, p(o));
  }
  function p(o) {
    if (o === 59 && u) {
      const f = t.exit("characterReferenceValue");
      return i === W && !In(r.sliceSerialize(f)) ? n(o) : (t.enter("characterReferenceMarker"), t.consume(o), t.exit("characterReferenceMarker"), t.exit("characterReference"), e);
    }
    return i(o) && u++ < a ? (t.consume(o), p) : n(o);
  }
}
const gn = {
  partial: !0,
  tokenize: mi
}, pn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ci
};
function ci(t, e, n) {
  const r = this, u = {
    partial: !0,
    tokenize: L
  };
  let a = 0, i = 0, l;
  return h;
  function h(d) {
    return s(d);
  }
  function s(d) {
    const N = r.events[r.events.length - 1];
    return a = N && N[1].type === "linePrefix" ? N[2].sliceSerialize(N[1], !0).length : 0, l = d, t.enter("codeFenced"), t.enter("codeFencedFence"), t.enter("codeFencedFenceSequence"), p(d);
  }
  function p(d) {
    return d === l ? (i++, t.consume(d), p) : i < 3 ? n(d) : (t.exit("codeFencedFenceSequence"), F(d) ? z(t, o, "whitespace")(d) : o(d));
  }
  function o(d) {
    return d === null || A(d) ? (t.exit("codeFencedFence"), r.interrupt ? e(d) : t.check(gn, I, M)(d)) : (t.enter("codeFencedFenceInfo"), t.enter("chunkString", {
      contentType: "string"
    }), f(d));
  }
  function f(d) {
    return d === null || A(d) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), o(d)) : F(d) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), z(t, c, "whitespace")(d)) : d === 96 && d === l ? n(d) : (t.consume(d), f);
  }
  function c(d) {
    return d === null || A(d) ? o(d) : (t.enter("codeFencedFenceMeta"), t.enter("chunkString", {
      contentType: "string"
    }), b(d));
  }
  function b(d) {
    return d === null || A(d) ? (t.exit("chunkString"), t.exit("codeFencedFenceMeta"), o(d)) : d === 96 && d === l ? n(d) : (t.consume(d), b);
  }
  function I(d) {
    return t.attempt(u, M, D)(d);
  }
  function D(d) {
    return t.enter("lineEnding"), t.consume(d), t.exit("lineEnding"), k;
  }
  function k(d) {
    return a > 0 && F(d) ? z(t, S, "linePrefix", a + 1)(d) : S(d);
  }
  function S(d) {
    return d === null || A(d) ? t.check(gn, I, M)(d) : (t.enter("codeFlowValue"), y(d));
  }
  function y(d) {
    return d === null || A(d) ? (t.exit("codeFlowValue"), S(d)) : (t.consume(d), y);
  }
  function M(d) {
    return t.exit("codeFenced"), e(d);
  }
  function L(d, N, B) {
    let U = 0;
    return x;
    function x(P) {
      return d.enter("lineEnding"), d.consume(P), d.exit("lineEnding"), T;
    }
    function T(P) {
      return d.enter("codeFencedFence"), F(P) ? z(d, w, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(P) : w(P);
    }
    function w(P) {
      return P === l ? (d.enter("codeFencedFenceSequence"), _(P)) : B(P);
    }
    function _(P) {
      return P === l ? (U++, d.consume(P), _) : U >= i ? (d.exit("codeFencedFenceSequence"), F(P) ? z(d, H, "whitespace")(P) : H(P)) : B(P);
    }
    function H(P) {
      return P === null || A(P) ? (d.exit("codeFencedFence"), N(P)) : B(P);
    }
  }
}
function mi(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    return i === null ? n(i) : (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), a);
  }
  function a(i) {
    return r.parser.lazy[r.now().line] ? n(i) : e(i);
  }
}
const Rt = {
  name: "codeIndented",
  tokenize: pi
}, gi = {
  partial: !0,
  tokenize: fi
};
function pi(t, e, n) {
  const r = this;
  return u;
  function u(s) {
    return t.enter("codeIndented"), z(t, a, "linePrefix", 5)(s);
  }
  function a(s) {
    const p = r.events[r.events.length - 1];
    return p && p[1].type === "linePrefix" && p[2].sliceSerialize(p[1], !0).length >= 4 ? i(s) : n(s);
  }
  function i(s) {
    return s === null ? h(s) : A(s) ? t.attempt(gi, i, h)(s) : (t.enter("codeFlowValue"), l(s));
  }
  function l(s) {
    return s === null || A(s) ? (t.exit("codeFlowValue"), i(s)) : (t.consume(s), l);
  }
  function h(s) {
    return t.exit("codeIndented"), e(s);
  }
}
function fi(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    return r.parser.lazy[r.now().line] ? n(i) : A(i) ? (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), u) : z(t, a, "linePrefix", 5)(i);
  }
  function a(i) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? e(i) : A(i) ? u(i) : n(i);
  }
}
const bi = {
  name: "codeText",
  previous: di,
  resolve: xi,
  tokenize: ki
};
function xi(t) {
  let e = t.length - 4, n = 3, r, u;
  if ((t[n][1].type === "lineEnding" || t[n][1].type === "space") && (t[e][1].type === "lineEnding" || t[e][1].type === "space")) {
    for (r = n; ++r < e; )
      if (t[r][1].type === "codeTextData") {
        t[n][1].type = "codeTextPadding", t[e][1].type = "codeTextPadding", n += 2, e -= 2;
        break;
      }
  }
  for (r = n - 1, e++; ++r <= e; )
    u === void 0 ? r !== e && t[r][1].type !== "lineEnding" && (u = r) : (r === e || t[r][1].type === "lineEnding") && (t[u][1].type = "codeTextData", r !== u + 2 && (t[u][1].end = t[r - 1][1].end, t.splice(u + 2, r - u - 2), e -= r - u - 2, r = u + 2), u = void 0);
  return t;
}
function di(t) {
  return t !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function ki(t, e, n) {
  let r = 0, u, a;
  return i;
  function i(o) {
    return t.enter("codeText"), t.enter("codeTextSequence"), l(o);
  }
  function l(o) {
    return o === 96 ? (t.consume(o), r++, l) : (t.exit("codeTextSequence"), h(o));
  }
  function h(o) {
    return o === null ? n(o) : o === 32 ? (t.enter("space"), t.consume(o), t.exit("space"), h) : o === 96 ? (a = t.enter("codeTextSequence"), u = 0, p(o)) : A(o) ? (t.enter("lineEnding"), t.consume(o), t.exit("lineEnding"), h) : (t.enter("codeTextData"), s(o));
  }
  function s(o) {
    return o === null || o === 32 || o === 96 || A(o) ? (t.exit("codeTextData"), h(o)) : (t.consume(o), s);
  }
  function p(o) {
    return o === 96 ? (t.consume(o), u++, p) : u === r ? (t.exit("codeTextSequence"), t.exit("codeText"), e(o)) : (a.type = "codeTextData", s(o));
  }
}
class Ei {
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
  slice(e, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
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
  splice(e, n, r) {
    const u = n || 0;
    this.setCursor(Math.trunc(e));
    const a = this.right.splice(this.right.length - u, Number.POSITIVE_INFINITY);
    return r && It(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), It(this.left, e);
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
    this.setCursor(0), It(this.right, e.reverse());
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
        const n = this.left.splice(e, Number.POSITIVE_INFINITY);
        It(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
        It(this.left, n.reverse());
      }
  }
}
function It(t, e) {
  let n = 0;
  if (e.length < 1e4)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(...e.slice(n, n + 1e4)), n += 1e4;
}
function Fn(t) {
  const e = {};
  let n = -1, r, u, a, i, l, h, s;
  const p = new Ei(t);
  for (; ++n < p.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = p.get(n), n && r[1].type === "chunkFlow" && p.get(n - 1)[1].type === "listItemPrefix" && (h = r[1]._tokenizer.events, a = 0, a < h.length && h[a][1].type === "lineEndingBlank" && (a += 2), a < h.length && h[a][1].type === "content"))
      for (; ++a < h.length && h[a][1].type !== "content"; )
        h[a][1].type === "chunkText" && (h[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, yi(p, n)), n = e[n], s = !0);
    else if (r[1]._container) {
      for (a = n, u = void 0; a--; )
        if (i = p.get(a), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank")
          i[0] === "enter" && (u && (p.get(u)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", u = a);
        else if (!(i[1].type === "linePrefix" || i[1].type === "listItemIndent")) break;
      u && (r[1].end = {
        ...p.get(u)[1].start
      }, l = p.slice(u, n), l.unshift(r), p.splice(u, n - u + 1, l));
    }
  }
  return Q(t, 0, Number.POSITIVE_INFINITY, p.slice(0)), !s;
}
function yi(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let u = e - 1;
  const a = [];
  let i = n._tokenizer;
  i || (i = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
  const l = i.events, h = [], s = {};
  let p, o, f = -1, c = n, b = 0, I = 0;
  const D = [I];
  for (; c; ) {
    for (; t.get(++u)[1] !== c; )
      ;
    a.push(u), c._tokenizer || (p = r.sliceStream(c), c.next || p.push(null), o && i.defineSkip(c.start), c._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(p), c._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), o = c, c = c.next;
  }
  for (c = n; ++f < l.length; )
    // Find a void token that includes a break.
    l[f][0] === "exit" && l[f - 1][0] === "enter" && l[f][1].type === l[f - 1][1].type && l[f][1].start.line !== l[f][1].end.line && (I = f + 1, D.push(I), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (i.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : D.pop(), f = D.length; f--; ) {
    const k = l.slice(D[f], D[f + 1]), S = a.pop();
    h.push([S, S + k.length - 1]), t.splice(S, 2, k);
  }
  for (h.reverse(), f = -1; ++f < h.length; )
    s[b + h[f][0]] = b + h[f][1], b += h[f][1] - h[f][0] - 1;
  return s;
}
const Si = {
  resolve: Ti,
  tokenize: Ci
}, Ii = {
  partial: !0,
  tokenize: wi
};
function Ti(t) {
  return Fn(t), t;
}
function Ci(t, e) {
  let n;
  return r;
  function r(l) {
    return t.enter("content"), n = t.enter("chunkContent", {
      contentType: "content"
    }), u(l);
  }
  function u(l) {
    return l === null ? a(l) : A(l) ? t.check(Ii, i, a)(l) : (t.consume(l), u);
  }
  function a(l) {
    return t.exit("chunkContent"), t.exit("content"), e(l);
  }
  function i(l) {
    return t.consume(l), t.exit("chunkContent"), n.next = t.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, u;
  }
}
function wi(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    return t.exit("chunkContent"), t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), z(t, a, "linePrefix");
  }
  function a(i) {
    if (i === null || A(i))
      return n(i);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? e(i) : t.interrupt(r.parser.constructs.flow, n, e)(i);
  }
}
function On(t, e, n, r, u, a, i, l, h) {
  const s = h || Number.POSITIVE_INFINITY;
  let p = 0;
  return o;
  function o(k) {
    return k === 60 ? (t.enter(r), t.enter(u), t.enter(a), t.consume(k), t.exit(a), f) : k === null || k === 32 || k === 41 || Lt(k) ? n(k) : (t.enter(r), t.enter(i), t.enter(l), t.enter("chunkString", {
      contentType: "string"
    }), I(k));
  }
  function f(k) {
    return k === 62 ? (t.enter(a), t.consume(k), t.exit(a), t.exit(u), t.exit(r), e) : (t.enter(l), t.enter("chunkString", {
      contentType: "string"
    }), c(k));
  }
  function c(k) {
    return k === 62 ? (t.exit("chunkString"), t.exit(l), f(k)) : k === null || k === 60 || A(k) ? n(k) : (t.consume(k), k === 92 ? b : c);
  }
  function b(k) {
    return k === 60 || k === 62 || k === 92 ? (t.consume(k), c) : c(k);
  }
  function I(k) {
    return !p && (k === null || k === 41 || v(k)) ? (t.exit("chunkString"), t.exit(l), t.exit(i), t.exit(r), e(k)) : p < s && k === 40 ? (t.consume(k), p++, I) : k === 41 ? (t.consume(k), p--, I) : k === null || k === 32 || k === 40 || Lt(k) ? n(k) : (t.consume(k), k === 92 ? D : I);
  }
  function D(k) {
    return k === 40 || k === 41 || k === 92 ? (t.consume(k), I) : I(k);
  }
}
function Nn(t, e, n, r, u, a) {
  const i = this;
  let l = 0, h;
  return s;
  function s(c) {
    return t.enter(r), t.enter(u), t.consume(c), t.exit(u), t.enter(a), p;
  }
  function p(c) {
    return l > 999 || c === null || c === 91 || c === 93 && !h || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !l && "_hiddenFootnoteSupport" in i.parser.constructs ? n(c) : c === 93 ? (t.exit(a), t.enter(u), t.consume(c), t.exit(u), t.exit(r), e) : A(c) ? (t.enter("lineEnding"), t.consume(c), t.exit("lineEnding"), p) : (t.enter("chunkString", {
      contentType: "string"
    }), o(c));
  }
  function o(c) {
    return c === null || c === 91 || c === 93 || A(c) || l++ > 999 ? (t.exit("chunkString"), p(c)) : (t.consume(c), h || (h = !F(c)), c === 92 ? f : o);
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (t.consume(c), l++, o) : o(c);
  }
}
function Rn(t, e, n, r, u, a) {
  let i;
  return l;
  function l(f) {
    return f === 34 || f === 39 || f === 40 ? (t.enter(r), t.enter(u), t.consume(f), t.exit(u), i = f === 40 ? 41 : f, h) : n(f);
  }
  function h(f) {
    return f === i ? (t.enter(u), t.consume(f), t.exit(u), t.exit(r), e) : (t.enter(a), s(f));
  }
  function s(f) {
    return f === i ? (t.exit(a), h(i)) : f === null ? n(f) : A(f) ? (t.enter("lineEnding"), t.consume(f), t.exit("lineEnding"), z(t, s, "linePrefix")) : (t.enter("chunkString", {
      contentType: "string"
    }), p(f));
  }
  function p(f) {
    return f === i || f === null || A(f) ? (t.exit("chunkString"), s(f)) : (t.consume(f), f === 92 ? o : p);
  }
  function o(f) {
    return f === i || f === 92 ? (t.consume(f), p) : p(f);
  }
}
function Tt(t, e) {
  let n;
  return r;
  function r(u) {
    return A(u) ? (t.enter("lineEnding"), t.consume(u), t.exit("lineEnding"), n = !0, r) : F(u) ? z(t, r, n ? "linePrefix" : "lineSuffix")(u) : e(u);
  }
}
const Ai = {
  name: "definition",
  tokenize: Li
}, Di = {
  partial: !0,
  tokenize: Fi
};
function Li(t, e, n) {
  const r = this;
  let u;
  return a;
  function a(c) {
    return t.enter("definition"), i(c);
  }
  function i(c) {
    return Nn.call(
      r,
      t,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function l(c) {
    return u = rt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), c === 58 ? (t.enter("definitionMarker"), t.consume(c), t.exit("definitionMarker"), h) : n(c);
  }
  function h(c) {
    return v(c) ? Tt(t, s)(c) : s(c);
  }
  function s(c) {
    return On(
      t,
      p,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(c);
  }
  function p(c) {
    return t.attempt(Di, o, o)(c);
  }
  function o(c) {
    return F(c) ? z(t, f, "whitespace")(c) : f(c);
  }
  function f(c) {
    return c === null || A(c) ? (t.exit("definition"), r.parser.defined.push(u), e(c)) : n(c);
  }
}
function Fi(t, e, n) {
  return r;
  function r(l) {
    return v(l) ? Tt(t, u)(l) : n(l);
  }
  function u(l) {
    return Rn(t, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function a(l) {
    return F(l) ? z(t, i, "whitespace")(l) : i(l);
  }
  function i(l) {
    return l === null || A(l) ? e(l) : n(l);
  }
}
const Oi = {
  name: "hardBreakEscape",
  tokenize: Ni
};
function Ni(t, e, n) {
  return r;
  function r(a) {
    return t.enter("hardBreakEscape"), t.consume(a), u;
  }
  function u(a) {
    return A(a) ? (t.exit("hardBreakEscape"), e(a)) : n(a);
  }
}
const Ri = {
  name: "headingAtx",
  resolve: zi,
  tokenize: Pi
};
function zi(t, e) {
  let n = t.length - 2, r = 3, u, a;
  return t[r][1].type === "whitespace" && (r += 2), n - 2 > r && t[n][1].type === "whitespace" && (n -= 2), t[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && t[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (u = {
    type: "atxHeadingText",
    start: t[r][1].start,
    end: t[n][1].end
  }, a = {
    type: "chunkText",
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: "text"
  }, Q(t, r, n - r + 1, [["enter", u, e], ["enter", a, e], ["exit", a, e], ["exit", u, e]])), t;
}
function Pi(t, e, n) {
  let r = 0;
  return u;
  function u(p) {
    return t.enter("atxHeading"), a(p);
  }
  function a(p) {
    return t.enter("atxHeadingSequence"), i(p);
  }
  function i(p) {
    return p === 35 && r++ < 6 ? (t.consume(p), i) : p === null || v(p) ? (t.exit("atxHeadingSequence"), l(p)) : n(p);
  }
  function l(p) {
    return p === 35 ? (t.enter("atxHeadingSequence"), h(p)) : p === null || A(p) ? (t.exit("atxHeading"), e(p)) : F(p) ? z(t, l, "whitespace")(p) : (t.enter("atxHeadingText"), s(p));
  }
  function h(p) {
    return p === 35 ? (t.consume(p), h) : (t.exit("atxHeadingSequence"), l(p));
  }
  function s(p) {
    return p === null || p === 35 || v(p) ? (t.exit("atxHeadingText"), l(p)) : (t.consume(p), s);
  }
}
const Mi = [
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
], fn = ["pre", "script", "style", "textarea"], _i = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Hi,
  tokenize: Ui
}, vi = {
  partial: !0,
  tokenize: $i
}, Bi = {
  partial: !0,
  tokenize: ji
};
function Hi(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && t[e - 2][1].type === "linePrefix" && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function Ui(t, e, n) {
  const r = this;
  let u, a, i, l, h;
  return s;
  function s(g) {
    return p(g);
  }
  function p(g) {
    return t.enter("htmlFlow"), t.enter("htmlFlowData"), t.consume(g), o;
  }
  function o(g) {
    return g === 33 ? (t.consume(g), f) : g === 47 ? (t.consume(g), a = !0, I) : g === 63 ? (t.consume(g), u = 3, r.interrupt ? e : m) : Y(g) ? (t.consume(g), i = String.fromCharCode(g), D) : n(g);
  }
  function f(g) {
    return g === 45 ? (t.consume(g), u = 2, c) : g === 91 ? (t.consume(g), u = 5, l = 0, b) : Y(g) ? (t.consume(g), u = 4, r.interrupt ? e : m) : n(g);
  }
  function c(g) {
    return g === 45 ? (t.consume(g), r.interrupt ? e : m) : n(g);
  }
  function b(g) {
    const J = "CDATA[";
    return g === J.charCodeAt(l++) ? (t.consume(g), l === J.length ? r.interrupt ? e : w : b) : n(g);
  }
  function I(g) {
    return Y(g) ? (t.consume(g), i = String.fromCharCode(g), D) : n(g);
  }
  function D(g) {
    if (g === null || g === 47 || g === 62 || v(g)) {
      const J = g === 47, bt = i.toLowerCase();
      return !J && !a && fn.includes(bt) ? (u = 1, r.interrupt ? e(g) : w(g)) : Mi.includes(i.toLowerCase()) ? (u = 6, J ? (t.consume(g), k) : r.interrupt ? e(g) : w(g)) : (u = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : a ? S(g) : y(g));
    }
    return g === 45 || W(g) ? (t.consume(g), i += String.fromCharCode(g), D) : n(g);
  }
  function k(g) {
    return g === 62 ? (t.consume(g), r.interrupt ? e : w) : n(g);
  }
  function S(g) {
    return F(g) ? (t.consume(g), S) : x(g);
  }
  function y(g) {
    return g === 47 ? (t.consume(g), x) : g === 58 || g === 95 || Y(g) ? (t.consume(g), M) : F(g) ? (t.consume(g), y) : x(g);
  }
  function M(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || W(g) ? (t.consume(g), M) : L(g);
  }
  function L(g) {
    return g === 61 ? (t.consume(g), d) : F(g) ? (t.consume(g), L) : y(g);
  }
  function d(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (t.consume(g), h = g, N) : F(g) ? (t.consume(g), d) : B(g);
  }
  function N(g) {
    return g === h ? (t.consume(g), h = null, U) : g === null || A(g) ? n(g) : (t.consume(g), N);
  }
  function B(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || v(g) ? L(g) : (t.consume(g), B);
  }
  function U(g) {
    return g === 47 || g === 62 || F(g) ? y(g) : n(g);
  }
  function x(g) {
    return g === 62 ? (t.consume(g), T) : n(g);
  }
  function T(g) {
    return g === null || A(g) ? w(g) : F(g) ? (t.consume(g), T) : n(g);
  }
  function w(g) {
    return g === 45 && u === 2 ? (t.consume(g), q) : g === 60 && u === 1 ? (t.consume(g), j) : g === 62 && u === 4 ? (t.consume(g), K) : g === 63 && u === 3 ? (t.consume(g), m) : g === 93 && u === 5 ? (t.consume(g), at) : A(g) && (u === 6 || u === 7) ? (t.exit("htmlFlowData"), t.check(vi, ut, _)(g)) : g === null || A(g) ? (t.exit("htmlFlowData"), _(g)) : (t.consume(g), w);
  }
  function _(g) {
    return t.check(Bi, H, ut)(g);
  }
  function H(g) {
    return t.enter("lineEnding"), t.consume(g), t.exit("lineEnding"), P;
  }
  function P(g) {
    return g === null || A(g) ? _(g) : (t.enter("htmlFlowData"), w(g));
  }
  function q(g) {
    return g === 45 ? (t.consume(g), m) : w(g);
  }
  function j(g) {
    return g === 47 ? (t.consume(g), i = "", X) : w(g);
  }
  function X(g) {
    if (g === 62) {
      const J = i.toLowerCase();
      return fn.includes(J) ? (t.consume(g), K) : w(g);
    }
    return Y(g) && i.length < 8 ? (t.consume(g), i += String.fromCharCode(g), X) : w(g);
  }
  function at(g) {
    return g === 93 ? (t.consume(g), m) : w(g);
  }
  function m(g) {
    return g === 62 ? (t.consume(g), K) : g === 45 && u === 2 ? (t.consume(g), m) : w(g);
  }
  function K(g) {
    return g === null || A(g) ? (t.exit("htmlFlowData"), ut(g)) : (t.consume(g), K);
  }
  function ut(g) {
    return t.exit("htmlFlow"), e(g);
  }
}
function ji(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    return A(i) ? (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), a) : n(i);
  }
  function a(i) {
    return r.parser.lazy[r.now().line] ? n(i) : e(i);
  }
}
function $i(t, e, n) {
  return r;
  function r(u) {
    return t.enter("lineEnding"), t.consume(u), t.exit("lineEnding"), t.attempt(wt, e, n);
  }
}
const qi = {
  name: "htmlText",
  tokenize: Vi
};
function Vi(t, e, n) {
  const r = this;
  let u, a, i;
  return l;
  function l(m) {
    return t.enter("htmlText"), t.enter("htmlTextData"), t.consume(m), h;
  }
  function h(m) {
    return m === 33 ? (t.consume(m), s) : m === 47 ? (t.consume(m), L) : m === 63 ? (t.consume(m), y) : Y(m) ? (t.consume(m), B) : n(m);
  }
  function s(m) {
    return m === 45 ? (t.consume(m), p) : m === 91 ? (t.consume(m), a = 0, b) : Y(m) ? (t.consume(m), S) : n(m);
  }
  function p(m) {
    return m === 45 ? (t.consume(m), c) : n(m);
  }
  function o(m) {
    return m === null ? n(m) : m === 45 ? (t.consume(m), f) : A(m) ? (i = o, j(m)) : (t.consume(m), o);
  }
  function f(m) {
    return m === 45 ? (t.consume(m), c) : o(m);
  }
  function c(m) {
    return m === 62 ? q(m) : m === 45 ? f(m) : o(m);
  }
  function b(m) {
    const K = "CDATA[";
    return m === K.charCodeAt(a++) ? (t.consume(m), a === K.length ? I : b) : n(m);
  }
  function I(m) {
    return m === null ? n(m) : m === 93 ? (t.consume(m), D) : A(m) ? (i = I, j(m)) : (t.consume(m), I);
  }
  function D(m) {
    return m === 93 ? (t.consume(m), k) : I(m);
  }
  function k(m) {
    return m === 62 ? q(m) : m === 93 ? (t.consume(m), k) : I(m);
  }
  function S(m) {
    return m === null || m === 62 ? q(m) : A(m) ? (i = S, j(m)) : (t.consume(m), S);
  }
  function y(m) {
    return m === null ? n(m) : m === 63 ? (t.consume(m), M) : A(m) ? (i = y, j(m)) : (t.consume(m), y);
  }
  function M(m) {
    return m === 62 ? q(m) : y(m);
  }
  function L(m) {
    return Y(m) ? (t.consume(m), d) : n(m);
  }
  function d(m) {
    return m === 45 || W(m) ? (t.consume(m), d) : N(m);
  }
  function N(m) {
    return A(m) ? (i = N, j(m)) : F(m) ? (t.consume(m), N) : q(m);
  }
  function B(m) {
    return m === 45 || W(m) ? (t.consume(m), B) : m === 47 || m === 62 || v(m) ? U(m) : n(m);
  }
  function U(m) {
    return m === 47 ? (t.consume(m), q) : m === 58 || m === 95 || Y(m) ? (t.consume(m), x) : A(m) ? (i = U, j(m)) : F(m) ? (t.consume(m), U) : q(m);
  }
  function x(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || W(m) ? (t.consume(m), x) : T(m);
  }
  function T(m) {
    return m === 61 ? (t.consume(m), w) : A(m) ? (i = T, j(m)) : F(m) ? (t.consume(m), T) : U(m);
  }
  function w(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (t.consume(m), u = m, _) : A(m) ? (i = w, j(m)) : F(m) ? (t.consume(m), w) : (t.consume(m), H);
  }
  function _(m) {
    return m === u ? (t.consume(m), u = void 0, P) : m === null ? n(m) : A(m) ? (i = _, j(m)) : (t.consume(m), _);
  }
  function H(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || v(m) ? U(m) : (t.consume(m), H);
  }
  function P(m) {
    return m === 47 || m === 62 || v(m) ? U(m) : n(m);
  }
  function q(m) {
    return m === 62 ? (t.consume(m), t.exit("htmlTextData"), t.exit("htmlText"), e) : n(m);
  }
  function j(m) {
    return t.exit("htmlTextData"), t.enter("lineEnding"), t.consume(m), t.exit("lineEnding"), X;
  }
  function X(m) {
    return F(m) ? z(t, at, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : at(m);
  }
  function at(m) {
    return t.enter("htmlTextData"), i(m);
  }
}
const $t = {
  name: "labelEnd",
  resolveAll: Zi,
  resolveTo: Qi,
  tokenize: Xi
}, Gi = {
  tokenize: Ki
}, Wi = {
  tokenize: Ji
}, Yi = {
  tokenize: ta
};
function Zi(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const u = r.type === "labelImage" ? 4 : 2;
      r.type = "data", e += u;
    }
  }
  return t.length !== n.length && Q(t, 0, t.length, n), t;
}
function Qi(t, e) {
  let n = t.length, r = 0, u, a, i, l;
  for (; n--; )
    if (u = t[n][1], a) {
      if (u.type === "link" || u.type === "labelLink" && u._inactive)
        break;
      t[n][0] === "enter" && u.type === "labelLink" && (u._inactive = !0);
    } else if (i) {
      if (t[n][0] === "enter" && (u.type === "labelImage" || u.type === "labelLink") && !u._balanced && (a = n, u.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else u.type === "labelEnd" && (i = n);
  const h = {
    type: t[a][1].type === "labelLink" ? "link" : "image",
    start: {
      ...t[a][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  }, s = {
    type: "label",
    start: {
      ...t[a][1].start
    },
    end: {
      ...t[i][1].end
    }
  }, p = {
    type: "labelText",
    start: {
      ...t[a + r + 2][1].end
    },
    end: {
      ...t[i - 2][1].start
    }
  };
  return l = [["enter", h, e], ["enter", s, e]], l = G(l, t.slice(a + 1, a + r + 3)), l = G(l, [["enter", p, e]]), l = G(l, Ot(e.parser.constructs.insideSpan.null, t.slice(a + r + 4, i - 3), e)), l = G(l, [["exit", p, e], t[i - 2], t[i - 1], ["exit", s, e]]), l = G(l, t.slice(i + 1)), l = G(l, [["exit", h, e]]), Q(t, a, t.length, l), t;
}
function Xi(t, e, n) {
  const r = this;
  let u = r.events.length, a, i;
  for (; u--; )
    if ((r.events[u][1].type === "labelImage" || r.events[u][1].type === "labelLink") && !r.events[u][1]._balanced) {
      a = r.events[u][1];
      break;
    }
  return l;
  function l(f) {
    return a ? a._inactive ? o(f) : (i = r.parser.defined.includes(rt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), t.enter("labelEnd"), t.enter("labelMarker"), t.consume(f), t.exit("labelMarker"), t.exit("labelEnd"), h) : n(f);
  }
  function h(f) {
    return f === 40 ? t.attempt(Gi, p, i ? p : o)(f) : f === 91 ? t.attempt(Wi, p, i ? s : o)(f) : i ? p(f) : o(f);
  }
  function s(f) {
    return t.attempt(Yi, p, o)(f);
  }
  function p(f) {
    return e(f);
  }
  function o(f) {
    return a._balanced = !0, n(f);
  }
}
function Ki(t, e, n) {
  return r;
  function r(o) {
    return t.enter("resource"), t.enter("resourceMarker"), t.consume(o), t.exit("resourceMarker"), u;
  }
  function u(o) {
    return v(o) ? Tt(t, a)(o) : a(o);
  }
  function a(o) {
    return o === 41 ? p(o) : On(t, i, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(o);
  }
  function i(o) {
    return v(o) ? Tt(t, h)(o) : p(o);
  }
  function l(o) {
    return n(o);
  }
  function h(o) {
    return o === 34 || o === 39 || o === 40 ? Rn(t, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(o) : p(o);
  }
  function s(o) {
    return v(o) ? Tt(t, p)(o) : p(o);
  }
  function p(o) {
    return o === 41 ? (t.enter("resourceMarker"), t.consume(o), t.exit("resourceMarker"), t.exit("resource"), e) : n(o);
  }
}
function Ji(t, e, n) {
  const r = this;
  return u;
  function u(l) {
    return Nn.call(r, t, a, i, "reference", "referenceMarker", "referenceString")(l);
  }
  function a(l) {
    return r.parser.defined.includes(rt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? e(l) : n(l);
  }
  function i(l) {
    return n(l);
  }
}
function ta(t, e, n) {
  return r;
  function r(a) {
    return t.enter("reference"), t.enter("referenceMarker"), t.consume(a), t.exit("referenceMarker"), u;
  }
  function u(a) {
    return a === 93 ? (t.enter("referenceMarker"), t.consume(a), t.exit("referenceMarker"), t.exit("reference"), e) : n(a);
  }
}
const na = {
  name: "labelStartImage",
  resolveAll: $t.resolveAll,
  tokenize: ea
};
function ea(t, e, n) {
  const r = this;
  return u;
  function u(l) {
    return t.enter("labelImage"), t.enter("labelImageMarker"), t.consume(l), t.exit("labelImageMarker"), a;
  }
  function a(l) {
    return l === 91 ? (t.enter("labelMarker"), t.consume(l), t.exit("labelMarker"), t.exit("labelImage"), i) : n(l);
  }
  function i(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : e(l);
  }
}
const ra = {
  name: "labelStartLink",
  resolveAll: $t.resolveAll,
  tokenize: ia
};
function ia(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    return t.enter("labelLink"), t.enter("labelMarker"), t.consume(i), t.exit("labelMarker"), t.exit("labelLink"), a;
  }
  function a(i) {
    return i === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(i) : e(i);
  }
}
const zt = {
  name: "lineEnding",
  tokenize: aa
};
function aa(t, e) {
  return n;
  function n(r) {
    return t.enter("lineEnding"), t.consume(r), t.exit("lineEnding"), z(t, e, "linePrefix");
  }
}
const Dt = {
  name: "thematicBreak",
  tokenize: ua
};
function ua(t, e, n) {
  let r = 0, u;
  return a;
  function a(s) {
    return t.enter("thematicBreak"), i(s);
  }
  function i(s) {
    return u = s, l(s);
  }
  function l(s) {
    return s === u ? (t.enter("thematicBreakSequence"), h(s)) : r >= 3 && (s === null || A(s)) ? (t.exit("thematicBreak"), e(s)) : n(s);
  }
  function h(s) {
    return s === u ? (t.consume(s), r++, h) : (t.exit("thematicBreakSequence"), F(s) ? z(t, l, "whitespace")(s) : l(s));
  }
}
const Z = {
  continuation: {
    tokenize: ha
  },
  exit: ma,
  name: "list",
  tokenize: sa
}, la = {
  partial: !0,
  tokenize: ga
}, oa = {
  partial: !0,
  tokenize: ca
};
function sa(t, e, n) {
  const r = this, u = r.events[r.events.length - 1];
  let a = u && u[1].type === "linePrefix" ? u[2].sliceSerialize(u[1], !0).length : 0, i = 0;
  return l;
  function l(c) {
    const b = r.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (b === "listUnordered" ? !r.containerState.marker || c === r.containerState.marker : Bt(c)) {
      if (r.containerState.type || (r.containerState.type = b, t.enter(b, {
        _container: !0
      })), b === "listUnordered")
        return t.enter("listItemPrefix"), c === 42 || c === 45 ? t.check(Dt, n, s)(c) : s(c);
      if (!r.interrupt || c === 49)
        return t.enter("listItemPrefix"), t.enter("listItemValue"), h(c);
    }
    return n(c);
  }
  function h(c) {
    return Bt(c) && ++i < 10 ? (t.consume(c), h) : (!r.interrupt || i < 2) && (r.containerState.marker ? c === r.containerState.marker : c === 41 || c === 46) ? (t.exit("listItemValue"), s(c)) : n(c);
  }
  function s(c) {
    return t.enter("listItemMarker"), t.consume(c), t.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || c, t.check(
      wt,
      // Can’t be empty when interrupting.
      r.interrupt ? n : p,
      t.attempt(la, f, o)
    );
  }
  function p(c) {
    return r.containerState.initialBlankLine = !0, a++, f(c);
  }
  function o(c) {
    return F(c) ? (t.enter("listItemPrefixWhitespace"), t.consume(c), t.exit("listItemPrefixWhitespace"), f) : n(c);
  }
  function f(c) {
    return r.containerState.size = a + r.sliceSerialize(t.exit("listItemPrefix"), !0).length, e(c);
  }
}
function ha(t, e, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, t.check(wt, u, a);
  function u(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, z(t, e, "listItemIndent", r.containerState.size + 1)(l);
  }
  function a(l) {
    return r.containerState.furtherBlankLines || !F(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, i(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(oa, e, i)(l));
  }
  function i(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, z(t, t.attempt(Z, e, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function ca(t, e, n) {
  const r = this;
  return z(t, u, "listItemIndent", r.containerState.size + 1);
  function u(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? e(a) : n(a);
  }
}
function ma(t) {
  t.exit(this.containerState.type);
}
function ga(t, e, n) {
  const r = this;
  return z(t, u, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function u(a) {
    const i = r.events[r.events.length - 1];
    return !F(a) && i && i[1].type === "listItemPrefixWhitespace" ? e(a) : n(a);
  }
}
const bn = {
  name: "setextUnderline",
  resolveTo: pa,
  tokenize: fa
};
function pa(t, e) {
  let n = t.length, r, u, a;
  for (; n--; )
    if (t[n][0] === "enter") {
      if (t[n][1].type === "content") {
        r = n;
        break;
      }
      t[n][1].type === "paragraph" && (u = n);
    } else
      t[n][1].type === "content" && t.splice(n, 1), !a && t[n][1].type === "definition" && (a = n);
  const i = {
    type: "setextHeading",
    start: {
      ...t[r][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  };
  return t[u][1].type = "setextHeadingText", a ? (t.splice(u, 0, ["enter", i, e]), t.splice(a + 1, 0, ["exit", t[r][1], e]), t[r][1].end = {
    ...t[a][1].end
  }) : t[r][1] = i, t.push(["exit", i, e]), t;
}
function fa(t, e, n) {
  const r = this;
  let u;
  return a;
  function a(s) {
    let p = r.events.length, o;
    for (; p--; )
      if (r.events[p][1].type !== "lineEnding" && r.events[p][1].type !== "linePrefix" && r.events[p][1].type !== "content") {
        o = r.events[p][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || o) ? (t.enter("setextHeadingLine"), u = s, i(s)) : n(s);
  }
  function i(s) {
    return t.enter("setextHeadingLineSequence"), l(s);
  }
  function l(s) {
    return s === u ? (t.consume(s), l) : (t.exit("setextHeadingLineSequence"), F(s) ? z(t, h, "lineSuffix")(s) : h(s));
  }
  function h(s) {
    return s === null || A(s) ? (t.exit("setextHeadingLine"), e(s)) : n(s);
  }
}
const ba = {
  tokenize: xa
};
function xa(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    wt,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(this.parser.constructs.flowInitial, u, z(t, t.attempt(this.parser.constructs.flow, u, t.attempt(Si, u)), "linePrefix"))
  );
  return n;
  function r(a) {
    if (a === null) {
      t.consume(a);
      return;
    }
    return t.enter("lineEndingBlank"), t.consume(a), t.exit("lineEndingBlank"), e.currentConstruct = void 0, n;
  }
  function u(a) {
    if (a === null) {
      t.consume(a);
      return;
    }
    return t.enter("lineEnding"), t.consume(a), t.exit("lineEnding"), e.currentConstruct = void 0, n;
  }
}
const da = {
  resolveAll: Pn()
}, ka = zn("string"), Ea = zn("text");
function zn(t) {
  return {
    resolveAll: Pn(t === "text" ? ya : void 0),
    tokenize: e
  };
  function e(n) {
    const r = this, u = this.parser.constructs[t], a = n.attempt(u, i, l);
    return i;
    function i(p) {
      return s(p) ? a(p) : l(p);
    }
    function l(p) {
      if (p === null) {
        n.consume(p);
        return;
      }
      return n.enter("data"), n.consume(p), h;
    }
    function h(p) {
      return s(p) ? (n.exit("data"), a(p)) : (n.consume(p), h);
    }
    function s(p) {
      if (p === null)
        return !0;
      const o = u[p];
      let f = -1;
      if (o)
        for (; ++f < o.length; ) {
          const c = o[f];
          if (!c.previous || c.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Pn(t) {
  return e;
  function e(n, r) {
    let u = -1, a;
    for (; ++u <= n.length; )
      a === void 0 ? n[u] && n[u][1].type === "data" && (a = u, u++) : (!n[u] || n[u][1].type !== "data") && (u !== a + 2 && (n[a][1].end = n[u - 1][1].end, n.splice(a + 2, u - a - 2), u = a + 2), a = void 0);
    return t ? t(n, r) : n;
  }
}
function ya(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === "lineEnding") && t[n - 1][1].type === "data") {
      const r = t[n - 1][1], u = e.sliceStream(r);
      let a = u.length, i = -1, l = 0, h;
      for (; a--; ) {
        const s = u[a];
        if (typeof s == "string") {
          for (i = s.length; s.charCodeAt(i - 1) === 32; )
            l++, i--;
          if (i) break;
          i = -1;
        } else if (s === -2)
          h = !0, l++;
        else if (s !== -1) {
          a++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && n === t.length && (l = 0), l) {
        const s = {
          type: n === t.length || h || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? i : r.start._bufferIndex + i,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - l,
            offset: r.end.offset - l
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...s.start
        }, r.start.offset === r.end.offset ? Object.assign(r, s) : (t.splice(n, 0, ["enter", s, e], ["exit", s, e]), n += 2);
      }
      n++;
    }
  return t;
}
const Sa = {
  42: Z,
  43: Z,
  45: Z,
  48: Z,
  49: Z,
  50: Z,
  51: Z,
  52: Z,
  53: Z,
  54: Z,
  55: Z,
  56: Z,
  57: Z,
  62: An
}, Ia = {
  91: Ai
}, Ta = {
  [-2]: Rt,
  [-1]: Rt,
  32: Rt
}, Ca = {
  35: Ri,
  42: Dt,
  45: [bn, Dt],
  60: _i,
  61: bn,
  95: Dt,
  96: pn,
  126: pn
}, wa = {
  38: Ln,
  92: Dn
}, Aa = {
  [-5]: zt,
  [-4]: zt,
  [-3]: zt,
  33: na,
  38: Ln,
  42: Ht,
  60: [ri, qi],
  91: ra,
  92: [Oi, Dn],
  93: $t,
  95: Ht,
  96: bi
}, Da = {
  null: [Ht, da]
}, La = {
  null: [42, 95]
}, Fa = {
  null: []
}, Oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: La,
  contentInitial: Ia,
  disable: Fa,
  document: Sa,
  flow: Ca,
  flowInitial: Ta,
  insideSpan: Da,
  string: wa,
  text: Aa
}, Symbol.toStringTag, { value: "Module" }));
function Na(t, e, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const u = {}, a = [];
  let i = [], l = [];
  const h = {
    attempt: N(L),
    check: N(d),
    consume: S,
    enter: y,
    exit: M,
    interrupt: N(d, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: I,
    events: [],
    now: b,
    parser: t,
    previous: null,
    sliceSerialize: f,
    sliceStream: c,
    write: o
  };
  let p = e.tokenize.call(s, h);
  return e.resolveAll && a.push(e), s;
  function o(T) {
    return i = G(i, T), D(), i[i.length - 1] !== null ? [] : (B(e, 0), s.events = Ot(a, s.events, s), s.events);
  }
  function f(T, w) {
    return za(c(T), w);
  }
  function c(T) {
    return Ra(i, T);
  }
  function b() {
    const {
      _bufferIndex: T,
      _index: w,
      line: _,
      column: H,
      offset: P
    } = r;
    return {
      _bufferIndex: T,
      _index: w,
      line: _,
      column: H,
      offset: P
    };
  }
  function I(T) {
    u[T.line] = T.column, x();
  }
  function D() {
    let T;
    for (; r._index < i.length; ) {
      const w = i[r._index];
      if (typeof w == "string")
        for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < w.length; )
          k(w.charCodeAt(r._bufferIndex));
      else
        k(w);
    }
  }
  function k(T) {
    p = p(T);
  }
  function S(T) {
    A(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, x()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    i[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = T;
  }
  function y(T, w) {
    const _ = w || {};
    return _.type = T, _.start = b(), s.events.push(["enter", _, s]), l.push(_), _;
  }
  function M(T) {
    const w = l.pop();
    return w.end = b(), s.events.push(["exit", w, s]), w;
  }
  function L(T, w) {
    B(T, w.from);
  }
  function d(T, w) {
    w.restore();
  }
  function N(T, w) {
    return _;
    function _(H, P, q) {
      let j, X, at, m;
      return Array.isArray(H) ? (
        /* c8 ignore next 1 */
        ut(H)
      ) : "tokenize" in H ? (
        // Looks like a construct.
        ut([
          /** @type {Construct} */
          H
        ])
      ) : K(H);
      function K($) {
        return yt;
        function yt(ht) {
          const xt = ht !== null && $[ht], dt = ht !== null && $.null, Nt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(xt) ? xt : xt ? [xt] : [],
            ...Array.isArray(dt) ? dt : dt ? [dt] : []
          ];
          return ut(Nt)(ht);
        }
      }
      function ut($) {
        return j = $, X = 0, $.length === 0 ? q : g($[X]);
      }
      function g($) {
        return yt;
        function yt(ht) {
          return m = U(), at = $, $.partial || (s.currentConstruct = $), $.name && s.parser.constructs.disable.null.includes($.name) ? bt() : $.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            w ? Object.assign(Object.create(s), w) : s,
            h,
            J,
            bt
          )(ht);
        }
      }
      function J($) {
        return T(at, m), P;
      }
      function bt($) {
        return m.restore(), ++X < j.length ? g(j[X]) : q;
      }
    }
  }
  function B(T, w) {
    T.resolveAll && !a.includes(T) && a.push(T), T.resolve && Q(s.events, w, s.events.length - w, T.resolve(s.events.slice(w), s)), T.resolveTo && (s.events = T.resolveTo(s.events, s));
  }
  function U() {
    const T = b(), w = s.previous, _ = s.currentConstruct, H = s.events.length, P = Array.from(l);
    return {
      from: H,
      restore: q
    };
    function q() {
      r = T, s.previous = w, s.currentConstruct = _, s.events.length = H, l = P, x();
    }
  }
  function x() {
    r.line in u && r.column < 2 && (r.column = u[r.line], r.offset += u[r.line] - 1);
  }
}
function Ra(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, u = e.end._index, a = e.end._bufferIndex;
  let i;
  if (n === u)
    i = [t[n].slice(r, a)];
  else {
    if (i = t.slice(n, u), r > -1) {
      const l = i[0];
      typeof l == "string" ? i[0] = l.slice(r) : i.shift();
    }
    a > 0 && i.push(t[u].slice(0, a));
  }
  return i;
}
function za(t, e) {
  let n = -1;
  const r = [];
  let u;
  for (; ++n < t.length; ) {
    const a = t[n];
    let i;
    if (typeof a == "string")
      i = a;
    else switch (a) {
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
        i = e ? " " : "	";
        break;
      }
      case -1: {
        if (!e && u) continue;
        i = " ";
        break;
      }
      default:
        i = String.fromCharCode(a);
    }
    u = a === -2, r.push(i);
  }
  return r.join("");
}
function Pa(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Tn([Oa, ...(t || {}).extensions || []])
    ),
    content: u(Qr),
    defined: [],
    document: u(Kr),
    flow: u(ba),
    lazy: {},
    string: u(ka),
    text: u(Ea)
  };
  return r;
  function u(a) {
    return i;
    function i(l) {
      return Na(r, a, l);
    }
  }
}
function Ma(t) {
  for (; !Fn(t); )
    ;
  return t;
}
const xn = /[\0\t\n\r]/g;
function _a() {
  let t = 1, e = "", n = !0, r;
  return u;
  function u(a, i, l) {
    const h = [];
    let s, p, o, f, c;
    for (a = e + (typeof a == "string" ? a.toString() : new TextDecoder(i || void 0).decode(a)), o = 0, e = "", n && (a.charCodeAt(0) === 65279 && o++, n = void 0); o < a.length; ) {
      if (xn.lastIndex = o, s = xn.exec(a), f = s && s.index !== void 0 ? s.index : a.length, c = a.charCodeAt(f), !s) {
        e = a.slice(o);
        break;
      }
      if (c === 10 && o === f && r)
        h.push(-3), r = void 0;
      else
        switch (r && (h.push(-5), r = void 0), o < f && (h.push(a.slice(o, f)), t += f - o), c) {
          case 0: {
            h.push(65533), t++;
            break;
          }
          case 9: {
            for (p = Math.ceil(t / 4) * 4, h.push(-2); t++ < p; ) h.push(-1);
            break;
          }
          case 10: {
            h.push(-4), t = 1;
            break;
          }
          default:
            r = !0, t = 1;
        }
      o = f + 1;
    }
    return l && (r && h.push(-5), e && h.push(e), h.push(null)), h;
  }
}
function va(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), Zr(n)(Ma(Pa(n).document().write(_a()(t, e, !0))));
}
const Ba = {
  tokenize: Va,
  partial: !0
}, Mn = {
  tokenize: Ga,
  partial: !0
}, _n = {
  tokenize: Wa,
  partial: !0
}, vn = {
  tokenize: Ya,
  partial: !0
}, Ha = {
  tokenize: Za,
  partial: !0
}, Bn = {
  name: "wwwAutolink",
  tokenize: $a,
  previous: Un
}, Hn = {
  name: "protocolAutolink",
  tokenize: qa,
  previous: jn
}, st = {
  name: "emailAutolink",
  tokenize: ja,
  previous: $n
}, it = {};
function Ua() {
  return {
    text: it
  };
}
let gt = 48;
for (; gt < 123; )
  it[gt] = st, gt++, gt === 58 ? gt = 65 : gt === 91 && (gt = 97);
it[43] = st;
it[45] = st;
it[46] = st;
it[95] = st;
it[72] = [st, Hn];
it[104] = [st, Hn];
it[87] = [st, Bn];
it[119] = [st, Bn];
function ja(t, e, n) {
  const r = this;
  let u, a;
  return i;
  function i(o) {
    return !Ut(o) || !$n.call(r, r.previous) || qt(r.events) ? n(o) : (t.enter("literalAutolink"), t.enter("literalAutolinkEmail"), l(o));
  }
  function l(o) {
    return Ut(o) ? (t.consume(o), l) : o === 64 ? (t.consume(o), h) : n(o);
  }
  function h(o) {
    return o === 46 ? t.check(Ha, p, s)(o) : o === 45 || o === 95 || W(o) ? (a = !0, t.consume(o), h) : p(o);
  }
  function s(o) {
    return t.consume(o), u = !0, h;
  }
  function p(o) {
    return a && u && Y(r.previous) ? (t.exit("literalAutolinkEmail"), t.exit("literalAutolink"), e(o)) : n(o);
  }
}
function $a(t, e, n) {
  const r = this;
  return u;
  function u(i) {
    return i !== 87 && i !== 119 || !Un.call(r, r.previous) || qt(r.events) ? n(i) : (t.enter("literalAutolink"), t.enter("literalAutolinkWww"), t.check(Ba, t.attempt(Mn, t.attempt(_n, a), n), n)(i));
  }
  function a(i) {
    return t.exit("literalAutolinkWww"), t.exit("literalAutolink"), e(i);
  }
}
function qa(t, e, n) {
  const r = this;
  let u = "", a = !1;
  return i;
  function i(o) {
    return (o === 72 || o === 104) && jn.call(r, r.previous) && !qt(r.events) ? (t.enter("literalAutolink"), t.enter("literalAutolinkHttp"), u += String.fromCodePoint(o), t.consume(o), l) : n(o);
  }
  function l(o) {
    if (Y(o) && u.length < 5)
      return u += String.fromCodePoint(o), t.consume(o), l;
    if (o === 58) {
      const f = u.toLowerCase();
      if (f === "http" || f === "https")
        return t.consume(o), h;
    }
    return n(o);
  }
  function h(o) {
    return o === 47 ? (t.consume(o), a ? s : (a = !0, h)) : n(o);
  }
  function s(o) {
    return o === null || Lt(o) || v(o) || Et(o) || jt(o) ? n(o) : t.attempt(Mn, t.attempt(_n, p), n)(o);
  }
  function p(o) {
    return t.exit("literalAutolinkHttp"), t.exit("literalAutolink"), e(o);
  }
}
function Va(t, e, n) {
  let r = 0;
  return u;
  function u(i) {
    return (i === 87 || i === 119) && r < 3 ? (r++, t.consume(i), u) : i === 46 && r === 3 ? (t.consume(i), a) : n(i);
  }
  function a(i) {
    return i === null ? n(i) : e(i);
  }
}
function Ga(t, e, n) {
  let r, u, a;
  return i;
  function i(s) {
    return s === 46 || s === 95 ? t.check(vn, h, l)(s) : s === null || v(s) || Et(s) || s !== 45 && jt(s) ? h(s) : (a = !0, t.consume(s), i);
  }
  function l(s) {
    return s === 95 ? r = !0 : (u = r, r = void 0), t.consume(s), i;
  }
  function h(s) {
    return u || r || !a ? n(s) : e(s);
  }
}
function Wa(t, e) {
  let n = 0, r = 0;
  return u;
  function u(i) {
    return i === 40 ? (n++, t.consume(i), u) : i === 41 && r < n ? a(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? t.check(vn, e, a)(i) : i === null || v(i) || Et(i) ? e(i) : (t.consume(i), u);
  }
  function a(i) {
    return i === 41 && r++, t.consume(i), u;
  }
}
function Ya(t, e, n) {
  return r;
  function r(l) {
    return l === 33 || l === 34 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 63 || l === 95 || l === 126 ? (t.consume(l), r) : l === 38 ? (t.consume(l), a) : l === 93 ? (t.consume(l), u) : (
      // `<` is an end.
      l === 60 || // So is whitespace.
      l === null || v(l) || Et(l) ? e(l) : n(l)
    );
  }
  function u(l) {
    return l === null || l === 40 || l === 91 || v(l) || Et(l) ? e(l) : r(l);
  }
  function a(l) {
    return Y(l) ? i(l) : n(l);
  }
  function i(l) {
    return l === 59 ? (t.consume(l), r) : Y(l) ? (t.consume(l), i) : n(l);
  }
}
function Za(t, e, n) {
  return r;
  function r(a) {
    return t.consume(a), u;
  }
  function u(a) {
    return W(a) ? n(a) : e(a);
  }
}
function Un(t) {
  return t === null || t === 40 || t === 42 || t === 95 || t === 91 || t === 93 || t === 126 || v(t);
}
function jn(t) {
  return !Y(t);
}
function $n(t) {
  return !(t === 47 || Ut(t));
}
function Ut(t) {
  return t === 43 || t === 45 || t === 46 || t === 95 || W(t);
}
function qt(t) {
  let e = t.length, n = !1;
  for (; e--; ) {
    const r = t[e][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = !1;
      break;
    }
  }
  return t.length > 0 && !n && (t[t.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
function Qa() {
  return {
    exit: {
      literalAutolinkEmail: Ka,
      literalAutolinkHttp: Ja,
      literalAutolinkWww: Xa
    }
  };
}
function Xa(t) {
  Vt.call(this, t, "http://");
}
function Ka(t) {
  Vt.call(this, t, "mailto:");
}
function Ja(t) {
  Vt.call(this, t);
}
function Vt(t, e) {
  const n = this.sliceSerialize(t);
  this.tag('<a href="' + pt((e || "") + n) + '">'), this.raw(this.encode(n)), this.tag("</a>");
}
const tu = {
  tokenize: ou,
  partial: !0
};
function nu() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: au,
        continuation: {
          tokenize: uu
        },
        exit: lu
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: iu
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: eu,
        resolveTo: ru
      }
    }
  };
}
function eu(t, e, n) {
  const r = this;
  let u = r.events.length;
  const a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let i;
  for (; u--; ) {
    const h = r.events[u][1];
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
      return n(h);
    const s = rt(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }));
    return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(h) : (t.enter("gfmFootnoteCallLabelMarker"), t.consume(h), t.exit("gfmFootnoteCallLabelMarker"), e(h));
  }
}
function ru(t, e) {
  let n = t.length;
  for (; n--; )
    if (t[n][1].type === "labelImage" && t[n][0] === "enter") {
      t[n][1];
      break;
    }
  t[n + 1][1].type = "data", t[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, t[n + 3][1].start),
    end: Object.assign({}, t[t.length - 1][1].end)
  }, u = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, t[n + 3][1].end),
    end: Object.assign({}, t[n + 3][1].end)
  };
  u.end.column++, u.end.offset++, u.end._bufferIndex++;
  const a = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, u.end),
    end: Object.assign({}, t[t.length - 1][1].start)
  }, i = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, a.start),
    end: Object.assign({}, a.end)
  }, l = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    t[n + 1],
    t[n + 2],
    ["enter", r, e],
    // The `[`
    t[n + 3],
    t[n + 4],
    // The `^`.
    ["enter", u, e],
    ["exit", u, e],
    // Everything in between.
    ["enter", a, e],
    ["enter", i, e],
    ["exit", i, e],
    ["exit", a, e],
    // The ending (`]`, properly parsed and labelled).
    t[t.length - 2],
    t[t.length - 1],
    ["exit", r, e]
  ];
  return t.splice(n, t.length - n + 1, ...l), t;
}
function iu(t, e, n) {
  const r = this, u = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a = 0, i;
  return l;
  function l(o) {
    return t.enter("gfmFootnoteCall"), t.enter("gfmFootnoteCallLabelMarker"), t.consume(o), t.exit("gfmFootnoteCallLabelMarker"), h;
  }
  function h(o) {
    return o !== 94 ? n(o) : (t.enter("gfmFootnoteCallMarker"), t.consume(o), t.exit("gfmFootnoteCallMarker"), t.enter("gfmFootnoteCallString"), t.enter("chunkString").contentType = "string", s);
  }
  function s(o) {
    if (
      // Too long.
      a > 999 || // Closing brace with nothing.
      o === 93 && !i || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      o === null || o === 91 || v(o)
    )
      return n(o);
    if (o === 93) {
      t.exit("chunkString");
      const f = t.exit("gfmFootnoteCallString");
      return u.includes(rt(r.sliceSerialize(f))) ? (t.enter("gfmFootnoteCallLabelMarker"), t.consume(o), t.exit("gfmFootnoteCallLabelMarker"), t.exit("gfmFootnoteCall"), e) : n(o);
    }
    return v(o) || (i = !0), a++, t.consume(o), o === 92 ? p : s;
  }
  function p(o) {
    return o === 91 || o === 92 || o === 93 ? (t.consume(o), a++, s) : s(o);
  }
}
function au(t, e, n) {
  const r = this, u = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a, i = 0, l;
  return h;
  function h(b) {
    return t.enter("gfmFootnoteDefinition")._container = !0, t.enter("gfmFootnoteDefinitionLabel"), t.enter("gfmFootnoteDefinitionLabelMarker"), t.consume(b), t.exit("gfmFootnoteDefinitionLabelMarker"), s;
  }
  function s(b) {
    return b === 94 ? (t.enter("gfmFootnoteDefinitionMarker"), t.consume(b), t.exit("gfmFootnoteDefinitionMarker"), t.enter("gfmFootnoteDefinitionLabelString"), t.enter("chunkString").contentType = "string", p) : n(b);
  }
  function p(b) {
    if (
      // Too long.
      i > 999 || // Closing brace with nothing.
      b === 93 && !l || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      b === null || b === 91 || v(b)
    )
      return n(b);
    if (b === 93) {
      t.exit("chunkString");
      const I = t.exit("gfmFootnoteDefinitionLabelString");
      return a = rt(r.sliceSerialize(I)), t.enter("gfmFootnoteDefinitionLabelMarker"), t.consume(b), t.exit("gfmFootnoteDefinitionLabelMarker"), t.exit("gfmFootnoteDefinitionLabel"), f;
    }
    return v(b) || (l = !0), i++, t.consume(b), b === 92 ? o : p;
  }
  function o(b) {
    return b === 91 || b === 92 || b === 93 ? (t.consume(b), i++, p) : p(b);
  }
  function f(b) {
    return b === 58 ? (t.enter("definitionMarker"), t.consume(b), t.exit("definitionMarker"), u.includes(a) || u.push(a), z(t, c, "gfmFootnoteDefinitionWhitespace")) : n(b);
  }
  function c(b) {
    return e(b);
  }
}
function uu(t, e, n) {
  return t.check(wt, e, t.attempt(tu, e, n));
}
function lu(t) {
  t.exit("gfmFootnoteDefinition");
}
function ou(t, e, n) {
  const r = this;
  return z(t, u, "gfmFootnoteDefinitionIndent", 5);
  function u(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? e(a) : n(a);
  }
}
const su = {}.hasOwnProperty, hu = {};
function cu(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function mu(t) {
  const e = hu, n = e.label || "Footnotes", r = e.labelTagName || "h2", u = e.labelAttributes === null || e.labelAttributes === void 0 ? 'class="sr-only"' : e.labelAttributes, a = e.backLabel || cu, i = e.clobberPrefix === null || e.clobberPrefix === void 0 ? "user-content-" : e.clobberPrefix;
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
        l || this.setData("gfmFootnoteDefinitions", l = {}), su.call(l, p) || (l[p] = o), s.pop(), this.setData("slurpOneLineEnding", !0), this.setData("lastWasTag");
      },
      gfmFootnoteDefinitionLabelString(l) {
        let h = this.getData("gfmFootnoteDefinitionStack");
        h || this.setData("gfmFootnoteDefinitionStack", h = []), h.push(rt(this.sliceSerialize(l))), this.resume(), this.buffer();
      },
      gfmFootnoteCallString(l) {
        let h = this.getData("gfmFootnoteCallOrder"), s = this.getData("gfmFootnoteCallCounts");
        const p = rt(this.sliceSerialize(l));
        let o;
        this.resume(), h || this.setData("gfmFootnoteCallOrder", h = []), s || this.setData("gfmFootnoteCallCounts", s = {});
        const f = h.indexOf(p), c = pt(p.toLowerCase());
        f === -1 ? (h.push(p), s[p] = 1, o = h.length) : (s[p]++, o = f + 1);
        const b = s[p];
        this.tag('<sup><a href="#' + i + "fn-" + c + '" id="' + i + "fnref-" + c + (b > 1 ? "-" + b : "") + '" data-footnote-ref="" aria-describedby="footnote-label">' + String(o) + "</a></sup>");
      },
      null() {
        const l = this.getData("gfmFootnoteCallOrder") || [], h = this.getData("gfmFootnoteCallCounts") || {}, s = this.getData("gfmFootnoteDefinitions") || {};
        let p = -1;
        for (l.length > 0 && (this.lineEndingIfNeeded(), this.tag('<section data-footnotes="" class="footnotes"><' + r + ' id="footnote-label"' + (u ? " " + u : "") + ">"), this.raw(this.encode(n)), this.tag("</" + r + ">"), this.lineEndingIfNeeded(), this.tag("<ol>")); ++p < l.length; ) {
          const o = l[p], f = pt(o.toLowerCase());
          let c = 0;
          const b = [];
          for (; ++c <= h[o]; )
            b.push('<a href="#' + i + "fnref-" + f + (c > 1 ? "-" + c : "") + '" data-footnote-backref="" aria-label="' + this.encode(typeof a == "string" ? a : a(p, c)) + '" class="data-footnote-backref">↩' + (c > 1 ? "<sup>" + c + "</sup>" : "") + "</a>");
          const I = b.join(" ");
          let D = !1;
          this.lineEndingIfNeeded(), this.tag('<li id="' + i + "fn-" + f + '">'), this.lineEndingIfNeeded(), this.tag(s[o].replace(/<\/p>(?:\r?\n|\r)?$/, function(k) {
            return D = !0, " " + I + k;
          })), D || (this.lineEndingIfNeeded(), this.tag(I)), this.lineEndingIfNeeded(), this.tag("</li>");
        }
        l.length > 0 && (this.lineEndingIfNeeded(), this.tag("</ol>"), this.lineEndingIfNeeded(), this.tag("</section>"));
      }
    }
  };
}
function gu() {
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
function pu(t) {
  let n = {}.singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: a,
    resolveAll: u
  };
  return n == null && (n = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function u(i, l) {
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
            }, f = [["enter", p, l], ["enter", i[s][1], l], ["exit", i[s][1], l], ["enter", o, l]], c = l.parser.constructs.insideSpan.null;
            c && Q(f, f.length, 0, Ot(c, i.slice(s + 1, h), l)), Q(f, f.length, 0, [["exit", o, l], ["enter", i[h][1], l], ["exit", i[h][1], l], ["exit", p, l]]), Q(i, s - 1, h - s + 3, f), h = s + f.length - 2;
            break;
          }
      }
    for (h = -1; ++h < i.length; )
      i[h][1].type === "strikethroughSequenceTemporary" && (i[h][1].type = "data");
    return i;
  }
  function a(i, l, h) {
    const s = this.previous, p = this.events;
    let o = 0;
    return f;
    function f(b) {
      return s === 126 && p[p.length - 1][1].type !== "characterEscape" ? h(b) : (i.enter("strikethroughSequenceTemporary"), c(b));
    }
    function c(b) {
      const I = Ft(s);
      if (b === 126)
        return o > 1 ? h(b) : (i.consume(b), o++, c);
      if (o < 2 && !n) return h(b);
      const D = i.exit("strikethroughSequenceTemporary"), k = Ft(b);
      return D._open = !k || k === 2 && !!I, D._close = !I || I === 2 && !!k, l(b);
    }
  }
}
const Pt = {
  none: "",
  left: ' align="left"',
  right: ' align="right"',
  center: ' align="center"'
};
function fu() {
  return {
    enter: {
      table(t) {
        const e = t._align;
        this.lineEndingIfNeeded(), this.tag("<table>"), this.setData("tableAlign", e);
      },
      tableBody() {
        this.tag("<tbody>");
      },
      tableData() {
        const t = this.getData("tableAlign"), e = this.getData("tableColumn"), n = Pt[t[e]];
        n === void 0 ? this.buffer() : (this.lineEndingIfNeeded(), this.tag("<td" + n + ">"));
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("<thead>");
      },
      tableHeader() {
        const t = this.getData("tableAlign"), e = this.getData("tableColumn"), n = Pt[t[e]];
        this.lineEndingIfNeeded(), this.tag("<th" + n + ">");
      },
      tableRow() {
        this.setData("tableColumn", 0), this.lineEndingIfNeeded(), this.tag("<tr>");
      }
    },
    exit: {
      // Overwrite the default code text data handler to unescape escaped pipes when
      // they are in tables.
      codeTextData(t) {
        let e = this.sliceSerialize(t);
        this.getData("tableAlign") && (e = e.replace(/\\([\\|])/g, bu)), this.raw(this.encode(e));
      },
      table() {
        this.setData("tableAlign"), this.setData("slurpAllLineEndings"), this.lineEndingIfNeeded(), this.tag("</table>");
      },
      tableBody() {
        this.lineEndingIfNeeded(), this.tag("</tbody>");
      },
      tableData() {
        const t = this.getData("tableAlign"), e = this.getData("tableColumn");
        e in t ? (this.tag("</td>"), this.setData("tableColumn", e + 1)) : this.resume();
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("</thead>");
      },
      tableHeader() {
        const t = this.getData("tableColumn");
        this.tag("</th>"), this.setData("tableColumn", t + 1);
      },
      tableRow() {
        const t = this.getData("tableAlign");
        let e = this.getData("tableColumn");
        for (; e < t.length; )
          this.lineEndingIfNeeded(), this.tag("<td" + Pt[t[e]] + "></td>"), e++;
        this.setData("tableColumn", e), this.lineEndingIfNeeded(), this.tag("</tr>");
      }
    }
  };
}
function bu(t, e) {
  return e === "|" ? e : t;
}
class xu {
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
  add(e, n, r) {
    du(this, e, n, r);
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
    if (this.map.sort(function(a, i) {
      return a[0] - i[0];
    }), this.map.length === 0)
      return;
    let n = this.map.length;
    const r = [];
    for (; n > 0; )
      n -= 1, r.push(e.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]), e.length = this.map[n][0];
    r.push(e.slice()), e.length = 0;
    let u = r.pop();
    for (; u; ) {
      for (const a of u)
        e.push(a);
      u = r.pop();
    }
    this.map.length = 0;
  }
}
function du(t, e, n, r) {
  let u = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; u < t.map.length; ) {
      if (t.map[u][0] === e) {
        t.map[u][1] += n, t.map[u][2].push(...r);
        return;
      }
      u += 1;
    }
    t.map.push([e, n, r]);
  }
}
function ku(t, e) {
  let n = !1;
  const r = [];
  for (; e < t.length; ) {
    const u = t[e];
    if (n) {
      if (u[0] === "enter")
        u[1].type === "tableContent" && r.push(t[e + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (u[1].type === "tableContent") {
        if (t[e - 1][1].type === "tableDelimiterMarker") {
          const a = r.length - 1;
          r[a] = r[a] === "left" ? "center" : "right";
        }
      } else if (u[1].type === "tableDelimiterRow")
        break;
    } else u[0] === "enter" && u[1].type === "tableDelimiterRow" && (n = !0);
    e += 1;
  }
  return r;
}
function Eu() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: yu,
        resolveAll: Su
      }
    }
  };
}
function yu(t, e, n) {
  const r = this;
  let u = 0, a = 0, i;
  return l;
  function l(x) {
    let T = r.events.length - 1;
    for (; T > -1; ) {
      const H = r.events[T][1].type;
      if (H === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      H === "linePrefix") T--;
      else break;
    }
    const w = T > -1 ? r.events[T][1].type : null, _ = w === "tableHead" || w === "tableRow" ? d : h;
    return _ === d && r.parser.lazy[r.now().line] ? n(x) : _(x);
  }
  function h(x) {
    return t.enter("tableHead"), t.enter("tableRow"), s(x);
  }
  function s(x) {
    return x === 124 || (i = !0, a += 1), p(x);
  }
  function p(x) {
    return x === null ? n(x) : A(x) ? a > 1 ? (a = 0, r.interrupt = !0, t.exit("tableRow"), t.enter("lineEnding"), t.consume(x), t.exit("lineEnding"), c) : n(x) : F(x) ? z(t, p, "whitespace")(x) : (a += 1, i && (i = !1, u += 1), x === 124 ? (t.enter("tableCellDivider"), t.consume(x), t.exit("tableCellDivider"), i = !0, p) : (t.enter("data"), o(x)));
  }
  function o(x) {
    return x === null || x === 124 || v(x) ? (t.exit("data"), p(x)) : (t.consume(x), x === 92 ? f : o);
  }
  function f(x) {
    return x === 92 || x === 124 ? (t.consume(x), o) : o(x);
  }
  function c(x) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(x) : (t.enter("tableDelimiterRow"), i = !1, F(x) ? z(t, b, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(x) : b(x));
  }
  function b(x) {
    return x === 45 || x === 58 ? D(x) : x === 124 ? (i = !0, t.enter("tableCellDivider"), t.consume(x), t.exit("tableCellDivider"), I) : L(x);
  }
  function I(x) {
    return F(x) ? z(t, D, "whitespace")(x) : D(x);
  }
  function D(x) {
    return x === 58 ? (a += 1, i = !0, t.enter("tableDelimiterMarker"), t.consume(x), t.exit("tableDelimiterMarker"), k) : x === 45 ? (a += 1, k(x)) : x === null || A(x) ? M(x) : L(x);
  }
  function k(x) {
    return x === 45 ? (t.enter("tableDelimiterFiller"), S(x)) : L(x);
  }
  function S(x) {
    return x === 45 ? (t.consume(x), S) : x === 58 ? (i = !0, t.exit("tableDelimiterFiller"), t.enter("tableDelimiterMarker"), t.consume(x), t.exit("tableDelimiterMarker"), y) : (t.exit("tableDelimiterFiller"), y(x));
  }
  function y(x) {
    return F(x) ? z(t, M, "whitespace")(x) : M(x);
  }
  function M(x) {
    return x === 124 ? b(x) : x === null || A(x) ? !i || u !== a ? L(x) : (t.exit("tableDelimiterRow"), t.exit("tableHead"), e(x)) : L(x);
  }
  function L(x) {
    return n(x);
  }
  function d(x) {
    return t.enter("tableRow"), N(x);
  }
  function N(x) {
    return x === 124 ? (t.enter("tableCellDivider"), t.consume(x), t.exit("tableCellDivider"), N) : x === null || A(x) ? (t.exit("tableRow"), e(x)) : F(x) ? z(t, N, "whitespace")(x) : (t.enter("data"), B(x));
  }
  function B(x) {
    return x === null || x === 124 || v(x) ? (t.exit("data"), N(x)) : (t.consume(x), x === 92 ? U : B);
  }
  function U(x) {
    return x === 92 || x === 124 ? (t.consume(x), B) : B(x);
  }
}
function Su(t, e) {
  let n = -1, r = !0, u = 0, a = [0, 0, 0, 0], i = [0, 0, 0, 0], l = !1, h = 0, s, p, o;
  const f = new xu();
  for (; ++n < t.length; ) {
    const c = t[n], b = c[1];
    c[0] === "enter" ? b.type === "tableHead" ? (l = !1, h !== 0 && (dn(f, e, h, s, p), p = void 0, h = 0), s = {
      type: "table",
      start: Object.assign({}, b.start),
      // Note: correct end is set later.
      end: Object.assign({}, b.end)
    }, f.add(n, 0, [["enter", s, e]])) : b.type === "tableRow" || b.type === "tableDelimiterRow" ? (r = !0, o = void 0, a = [0, 0, 0, 0], i = [0, n + 1, 0, 0], l && (l = !1, p = {
      type: "tableBody",
      start: Object.assign({}, b.start),
      // Note: correct end is set later.
      end: Object.assign({}, b.end)
    }, f.add(n, 0, [["enter", p, e]])), u = b.type === "tableDelimiterRow" ? 2 : p ? 3 : 1) : u && (b.type === "data" || b.type === "tableDelimiterMarker" || b.type === "tableDelimiterFiller") ? (r = !1, i[2] === 0 && (a[1] !== 0 && (i[0] = i[1], o = At(f, e, a, u, void 0, o), a = [0, 0, 0, 0]), i[2] = n)) : b.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (i[0] = i[1], o = At(f, e, a, u, void 0, o)), a = i, i = [a[1], n, 0, 0])) : b.type === "tableHead" ? (l = !0, h = n) : b.type === "tableRow" || b.type === "tableDelimiterRow" ? (h = n, a[1] !== 0 ? (i[0] = i[1], o = At(f, e, a, u, n, o)) : i[1] !== 0 && (o = At(f, e, i, u, n, o)), u = 0) : u && (b.type === "data" || b.type === "tableDelimiterMarker" || b.type === "tableDelimiterFiller") && (i[3] = n);
  }
  for (h !== 0 && dn(f, e, h, s, p), f.consume(e.events), n = -1; ++n < e.events.length; ) {
    const c = e.events[n];
    c[0] === "enter" && c[1].type === "table" && (c[1]._align = ku(e.events, n));
  }
  return t;
}
function At(t, e, n, r, u, a) {
  const i = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", l = "tableContent";
  n[0] !== 0 && (a.end = Object.assign({}, kt(e.events, n[0])), t.add(n[0], 0, [["exit", a, e]]));
  const h = kt(e.events, n[1]);
  if (a = {
    type: i,
    start: Object.assign({}, h),
    // Note: correct end is set later.
    end: Object.assign({}, h)
  }, t.add(n[1], 0, [["enter", a, e]]), n[2] !== 0) {
    const s = kt(e.events, n[2]), p = kt(e.events, n[3]), o = {
      type: l,
      start: Object.assign({}, s),
      end: Object.assign({}, p)
    };
    if (t.add(n[2], 0, [["enter", o, e]]), r !== 2) {
      const f = e.events[n[2]], c = e.events[n[3]];
      if (f[1].end = Object.assign({}, c[1].end), f[1].type = "chunkText", f[1].contentType = "text", n[3] > n[2] + 1) {
        const b = n[2] + 1, I = n[3] - n[2] - 1;
        t.add(b, I, []);
      }
    }
    t.add(n[3] + 1, 0, [["exit", o, e]]);
  }
  return u !== void 0 && (a.end = Object.assign({}, kt(e.events, u)), t.add(u, 0, [["exit", a, e]]), a = void 0), a;
}
function dn(t, e, n, r, u) {
  const a = [], i = kt(e.events, n);
  u && (u.end = Object.assign({}, i), a.push(["exit", u, e])), r.end = Object.assign({}, i), a.push(["exit", r, e]), t.add(n + 1, 0, a);
}
function kt(t, e) {
  const n = t[e], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const qn = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi, Iu = new RegExp("^" + qn.source, "i");
function Tu() {
  return {
    exit: {
      htmlFlowData(t) {
        kn.call(this, t, qn);
      },
      htmlTextData(t) {
        kn.call(this, t, Iu);
      }
    }
  };
}
function kn(t, e) {
  let n = this.sliceSerialize(t);
  this.options.allowDangerousHtml && (n = n.replace(e, "&lt;$1$2")), this.raw(this.encode(n));
}
function Cu() {
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
const wu = {
  name: "tasklistCheck",
  tokenize: Du
};
function Au() {
  return {
    text: {
      91: wu
    }
  };
}
function Du(t, e, n) {
  const r = this;
  return u;
  function u(h) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? n(h) : (t.enter("taskListCheck"), t.enter("taskListCheckMarker"), t.consume(h), t.exit("taskListCheckMarker"), a)
    );
  }
  function a(h) {
    return v(h) ? (t.enter("taskListCheckValueUnchecked"), t.consume(h), t.exit("taskListCheckValueUnchecked"), i) : h === 88 || h === 120 ? (t.enter("taskListCheckValueChecked"), t.consume(h), t.exit("taskListCheckValueChecked"), i) : n(h);
  }
  function i(h) {
    return h === 93 ? (t.enter("taskListCheckMarker"), t.consume(h), t.exit("taskListCheckMarker"), t.exit("taskListCheck"), l) : n(h);
  }
  function l(h) {
    return A(h) ? e(h) : F(h) ? t.check({
      tokenize: Lu
    }, e, n)(h) : n(h);
  }
}
function Lu(t, e, n) {
  return z(t, r, "whitespace");
  function r(u) {
    return u === null ? n(u) : e(u);
  }
}
function Fu(t) {
  return Tn([
    Ua(),
    nu(),
    pu(),
    Eu(),
    Au()
  ]);
}
function Ou(t) {
  return Cn([
    Qa(),
    mu(),
    gu(),
    fu(),
    Tu(),
    Cu()
  ]);
}
var Nu = Object.defineProperty, Ru = (t) => (e) => {
  var n = t[e];
  if (n) return n();
  throw new Error("Module not found in bundle: " + e);
}, O = (t, e) => () => (t && (e = t(t = 0)), e), R = (t, e) => {
  for (var n in e) Nu(t, n, { get: e[n], enumerable: !0 });
}, Vn = {};
R(Vn, { default: () => Gn });
var Gn, zu = O(() => {
  Gn = [{ type: "cmnt", match: /(;|#).*/gm }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\$[\da-fA-F]*\b/g }, { type: "kwd", match: /^[a-z]+\s+[a-z.]+\b/gm, sub: [{ type: "func", match: /^[a-z]+/g }] }, { type: "kwd", match: /^\t*[a-z][a-z\d]*\b/gm }, { match: /%|\$/g, type: "oper" }];
}), Wn = {};
R(Wn, { default: () => Gt });
var Mt, Gt, Yn = O(() => {
  Mt = { type: "var", match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g }, Gt = [{ sub: "todo", match: /#.*/g }, { type: "str", match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g, sub: [Mt] }, { type: "oper", match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi }, { type: "kwd", match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g }, { expand: "num" }, { type: "func", match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gmi }, { type: "bool", match: /(?<=\s|^)(true|false)(?=\s|$)/g }, { type: "oper", match: /[=(){}<>!]+/g }, { type: "var", match: /(?<=\s|^)[\w_]+(?=\s*=)/g }, Mt];
}), Zn = {};
R(Zn, { default: () => Qn });
var Qn, Pu = O(() => {
  Qn = [{ match: /[^\[\->+.<\]\s].*/g, sub: "todo" }, { type: "func", match: /\.+/g }, { type: "kwd", match: /[<>]+/g }, { type: "oper", match: /[+-]+/g }];
}), Xn = {};
R(Xn, { default: () => Kn });
var Kn, Mu = O(() => {
  Kn = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /#\s*include (<.*>|".*")/g, sub: [{ type: "str", match: /(<|").*/g }] }, { match: /asm\s*{[^}]*}/g, sub: [{ type: "kwd", match: /^asm/g }, { match: /[^{}]*(?=}$)/g, sub: "asm" }] }, { type: "kwd", match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), Jn = {};
R(Jn, { default: () => te });
var te, _u = O(() => {
  te = [{ match: /\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g }, { type: "var", match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g }, { type: "func", match: /#[\w-]+(?=[^{}]*{)/g }, { type: "num", match: /#[\da-f]{3,8}/g }, { type: "num", match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g, sub: [{ type: "var", match: /[a-z]+|%/g }] }, { match: /url\([^)]*\)/g, sub: [{ type: "func", match: /url(?=\()/g }, { type: "str", match: /[^()]+/g }] }, { type: "func", match: /\b[a-zA-Z]\w*(?=\s*\()/g }, { type: "num", match: /\b[a-z-]+\b/g }];
}), ne = {};
R(ne, { default: () => ee });
var ee, vu = O(() => {
  ee = [{ expand: "strDouble" }, { type: "oper", match: /,/g }];
}), re = {};
R(re, { default: () => Wt });
var Wt, ie = O(() => {
  Wt = [{ type: "deleted", match: /^[-<].*/gm }, { type: "insert", match: /^[+>].*/gm }, { type: "kwd", match: /!.*/gm }, { type: "section", match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm }];
}), ae = {};
R(ae, { default: () => ue });
var ue, Bu = O(() => {
  Yn(), ue = [{ type: "kwd", match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gmi }, ...Gt];
}), le = {};
R(le, { default: () => oe });
var oe, Hu = O(() => {
  ie(), oe = [{ match: /^#.*/gm, sub: "todo" }, { expand: "str" }, ...Wt, { type: "func", match: /^(\$ )?git(\s.*)?$/gm }, { type: "kwd", match: /^commit \w+$/gm }];
}), se = {};
R(se, { default: () => he });
var he, Uu = O(() => {
  he = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "oper", match: /[+\-*\/%&|^~=!<>.^-]+/g }];
}), ce = {};
R(ce, { default: () => Yt, name: () => ct, properties: () => ft, xmlElement: () => ot });
var _t, En, ct, ft, ot, Yt, me = O(() => {
  _t = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", En = _t + "\\-\\.0-9·̀-ͯ‿-⁀", ct = `[${_t}][${En}]*`, ft = `\\s*(\\s+${ct}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`, ot = { match: RegExp(`<[/!?]?${ct}${ft}[/!?]?>`, "g"), sub: [{ type: "var", match: RegExp(`^<[/!?]?${ct}`, "g"), sub: [{ type: "oper", match: /^<[\/!?]?/g }] }, { type: "str", match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g, sub: [{ type: "oper", match: /^=/g }] }, { type: "oper", match: /[\/!?]?>/g }, { type: "class", match: RegExp(ct, "g") }] }, Yt = [{ match: /<!--((?!-->)[^])*-->/g, sub: "todo" }, { type: "class", match: /<!\[CDATA\[[\s\S]*?\]\]>/gi }, ot, { type: "str", match: RegExp(`<\\?${ct}([^?]|\\?[^?>])*\\?+>`, "g"), sub: [{ type: "var", match: RegExp(`^<\\?${ct}`, "g"), sub: [{ type: "oper", match: /^<\?/g }] }, { type: "oper", match: /\?+>$/g }] }, { type: "var", match: /&(#x?)?[\da-z]{1,8};/gi }];
}), ge = {};
R(ge, { default: () => pe });
var pe, ju = O(() => {
  me(), pe = [{ type: "class", match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi, sub: [{ type: "str", match: /"[^"]*"|'[^']*'/g }, { type: "oper", match: /^<!|>$/g }, { type: "var", match: /DOCTYPE/gi }] }, { match: RegExp(`<style${ft}>((?!</style>)[^])*</style\\s*>`, "g"), sub: [{ match: RegExp(`^<style${ft}>`, "g"), sub: ot.sub }, { match: RegExp(`${ot.match}|[^]*(?=</style\\s*>$)`, "g"), sub: "css" }, ot] }, { match: RegExp(`<script${ft}>((?!<\/script>)[^])*<\/script\\s*>`, "g"), sub: [{ match: RegExp(`^<script${ft}>`, "g"), sub: ot.sub }, { match: RegExp(`${ot.match}|[^]*(?=<\/script\\s*>$)`, "g"), sub: "js" }, ot] }, ...Yt];
}), yn, Ct, Zt = O(() => {
  yn = [["bash", [/#!(\/usr)?\/bin\/bash/g, 500], [/\b(if|elif|then|fi|echo)\b|\$/g, 10]], ["html", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^\s+<!DOCTYPE\s+html/g, 500]], ["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]], ["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g, 10]], ["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|implements|interface|namespace)\b/g, 10]], ["py", [/\b(def|print|class|and|or|lambda)\b/g, 10]], ["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]], ["pl", [/#!(\/usr)?\/bin\/perl/g, 500], [/\b(use|print)\b|\$/g, 10]], ["lua", [/#!(\/usr)?\/bin\/lua/g, 500]], ["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]], ["uri", [/https?:|mailto:|tel:|ftp:/g, 30]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["diff", [/^[+><-]/gm, 10], [/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]], ["md", [/^(>|\t\*|\t\d+.)/gm, 10], [/\[.*\](.*)/g, 10]], ["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]], ["xml", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^<\?xml/g, 500]], ["c", [/#include\b|\bprintf\s+\(/g, 100]], ["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]], ["go", [/\b(func|fmt|package)\b/g, 100]], ["java", [/^import\s+java/gm, 500]], ["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]], ["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gmi, 10]]], Ct = (t) => yn.map(([e, ...n]) => [e, n.reduce((r, [u, a]) => r + [...t.matchAll(u)].length * a, 0)]).filter(([e, n]) => n > 20).sort((e, n) => n[1] - e[1])[0]?.[0] || "plain";
}), fe = {};
R(fe, { default: () => be });
var be, $u = O(() => {
  Zt(), be = [{ type: "kwd", match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm }, { expand: "str" }, { type: "section", match: /\bHTTP\/[\d.]+\b/g }, { expand: "num" }, { type: "oper", match: /[,;:=]/g }, { type: "var", match: /[a-zA-Z][\w-]*(?=:)/g }, { match: /\n\n[^]*/g, sub: Ct }];
}), xe = {};
R(xe, { default: () => de });
var de, qu = O(() => {
  de = [{ match: /(^[ \f\t\v]*)[#;].*/gm, sub: "todo" }, { type: "str", match: /.*/g }, { type: "var", match: /.*(?==)/g }, { type: "section", match: /^\s*\[.+\]\s*$/gm }, { type: "oper", match: /=/g }];
}), ke = {};
R(ke, { default: () => Ee });
var Ee, Vu = O(() => {
  Ee = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), ye = {};
R(ye, { default: () => Qt });
var Qt, Se = O(() => {
  Qt = [{ match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g, sub: "jsdoc" }, { match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { match: /`((?!`)[^]|\\[^])*`?/g, sub: "js_template_literals" }, { type: "kwd", match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g }, { match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g, sub: "regex" }, { expand: "num" }, { type: "num", match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g }];
}), Ie = {};
R(Ie, { default: () => Te, type: () => Ce });
var Te, Ce, Gu = O(() => {
  Te = [{ match: new class {
    exec(t) {
      let e = this.lastIndex, n, r = (u) => {
        for (; ++e < t.length - 2; ) if (t[e] == "{") r();
        else if (t[e] == "}") return;
      };
      for (; e < t.length; ++e) if (t[e - 1] != "\\" && t[e] == "$" && t[e + 1] == "{") return n = e++, r(), this.lastIndex = e + 1, { index: n, 0: t.slice(n, e + 1) };
      return null;
    }
  }(), sub: [{ type: "kwd", match: /^\${|}$/g }, { match: /(?!^\$|{)[^]+(?=}$)/g, sub: "js" }] }], Ce = "str";
}), we = {};
R(we, { default: () => Xt, type: () => Ae });
var Xt, Ae, De = O(() => {
  Xt = [{ type: "err", match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g }, { type: "class", match: /\bIDEA\b/g }, { type: "insert", match: /\b(CHANGED|FIX|CHANGE)\b/g }, { type: "oper", match: /\bQUESTION\b/g }], Ae = "cmnt";
}), Le = {};
R(Le, { default: () => Fe, type: () => Oe });
var Fe, Oe, Wu = O(() => {
  De(), Fe = [{ type: "kwd", match: /@\w+/g }, { type: "class", match: /{[\w\s|<>,.@\[\]]+}/g }, { type: "var", match: /\[[\w\s="']+\]/g }, ...Xt], Oe = "cmnt";
}), Ne = {};
R(Ne, { default: () => Re });
var Re, Yu = O(() => {
  Re = [{ type: "var", match: /(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\bnull\b/g }, { type: "bool", match: /\b(true|false)\b/g }];
}), ze = {};
R(ze, { default: () => Kt });
var Kt, Pe = O(() => {
  Zt(), Kt = [{ type: "cmnt", match: /^>.*|(=|-)\1+/gm }, { type: "class", match: /\*\*((?!\*\*).)*\*\*/g }, { match: /```((?!```)[^])*\n```/g, sub: (t) => ({ type: "kwd", sub: [{ match: /\n[^]*(?=```)/g, sub: t.split(`
`)[0].slice(3) || Ct(t) }] }) }, { type: "str", match: /`[^`]*`/g }, { type: "var", match: /~~((?!~~).)*~~/g }, { type: "kwd", match: /\b_\S([^\n]*?\S)?_\b|\*\S([^\n]*?\S)?\*/g }, { type: "kwd", match: /^\s*(\*|\d+\.)\s/gm }, { type: "func", match: /\[[^\]]*]\([^)]*\)|<[^>]*>/g, sub: [{ type: "oper", match: /^\[[^\]]*]/g }] }];
}), Me = {};
R(Me, { default: () => _e });
var _e, Zu = O(() => {
  Pe(), Zt(), _e = [{ type: "insert", match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g, sub: [{ type: "insert", match: /leanpub-(start|end)-insert/g }, { match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g, sub: Ct }] }, { type: "deleted", match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g, sub: [{ type: "deleted", match: /leanpub-(start|end)-delete/g }, { match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g, sub: Ct }] }, ...Kt];
}), ve = {};
R(ve, { default: () => Be });
var Be, Qu = O(() => {
  Be = [{ type: "cmnt", match: /^#.*/gm }, { expand: "strDouble" }, { expand: "num" }, { type: "err", match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi }, { type: "num", match: /\b(null|undefined)\b/gi }, { type: "bool", match: /\b(false|true|yes|no)\b/gi }, { type: "oper", match: /\.|,/g }];
}), He = {};
R(He, { default: () => Ue });
var Ue, Xu = O(() => {
  Ue = [{ match: /^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g }, { type: "bool", match: /\b(true|false|nil)\b/g }, { type: "oper", match: /[+*/%^#=~<>:,.-]+/g }, { expand: "num" }, { type: "func", match: /[a-z_]+(?=\s*[({])/g }];
}), je = {};
R(je, { default: () => $e });
var $e, Ku = O(() => {
  $e = [{ match: /^\s*#.*/gm, sub: "todo" }, { expand: "str" }, { type: "oper", match: /[${}()]+/g }, { type: "class", match: /.PHONY:/gm }, { type: "section", match: /^[\w.]+:/gm }, { type: "kwd", match: /\b(ifneq|endif)\b/g }, { expand: "num" }, { type: "var", match: /[A-Z_]+(?=\s*=)/g }, { match: /^.*$/gm, sub: "bash" }];
}), qe = {};
R(qe, { default: () => Ve });
var Ve, Ju = O(() => {
  Ve = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /(["'])(\\[^]|(?!\1)[^])*\1?/g }, { expand: "num" }, { type: "kwd", match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g }, { type: "oper", match: /[-+*/%~!&<>|=?,]+/g }, { type: "func", match: /[a-z_]+(?=\s*\()/g }];
}), Ge = {};
R(Ge, { default: () => We });
var We, tl = O(() => {
  We = [{ expand: "strDouble" }];
}), Ye = {};
R(Ye, { default: () => Ze });
var Ze, nl = O(() => {
  Ze = [{ match: /#.*/g, sub: "todo" }, { match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g, sub: "todo" }, { type: "str", match: /f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi, sub: [{ type: "var", match: /{[^{}]*}/g, sub: [{ match: /(?!^{)[^]*(?=}$)/g, sub: "py" }] }] }, { expand: "str" }, { type: "kwd", match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g }, { type: "bool", match: /\b(False|True|None)\b/g }, { expand: "num" }, { type: "func", match: /[a-z_]\w*(?=\s*\()/gi }, { type: "oper", match: /[-/*+<>,=!&|^%]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), Qe = {};
R(Qe, { default: () => Xe, type: () => Ke });
var Xe, Ke, el = O(() => {
  Xe = [{ match: /^(?!\/).*/gm, sub: "todo" }, { type: "num", match: /\[((?!\])[^\\]|\\.)*\]/g }, { type: "kwd", match: /\||\^|\$|\\.|\w+($|\r|\n)/g }, { type: "var", match: /\*|\+|\{\d+,\d+\}/g }], Ke = "oper";
}), Je = {};
R(Je, { default: () => tr });
var tr, rl = O(() => {
  tr = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g }];
}), nr = {};
R(nr, { default: () => er });
var er, il = O(() => {
  er = [{ match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "func", match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g }, { type: "kwd", match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g }, { type: "num", match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g }, { type: "bool", match: /\b(TRUE|FALSE)\b/g }, { type: "oper", match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g }, { type: "var", match: /@\S+/g }];
}), rr = {};
R(rr, { default: () => ir });
var ir, al = O(() => {
  ir = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /("""|''')((?!\1)[^]|\\[^])*\1?/g }, { expand: "str" }, { type: "section", match: /^\[.+\]\s*$/gm }, { type: "num", match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g }, { expand: "num" }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[+,.=-]/g }, { type: "var", match: /\w+(?= \=)/g }];
}), ar = {};
R(ar, { default: () => ur });
var ur, ul = O(() => {
  Se(), ur = [{ type: "type", match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g }, { type: "kwd", match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g }, ...Qt];
}), lr = {};
R(lr, { default: () => or });
var or, ll = O(() => {
  or = [{ match: /^#.*/gm, sub: "todo" }, { type: "class", match: /^\w+(?=:?)/gm }, { type: "num", match: /:\d+/g }, { type: "oper", match: /[:/&?]|\w+=/g }, { type: "func", match: /[.\w]+@|#[\w]+$/gm }, { type: "var", match: /\w+\.\w+(\.\w+)*/g }];
}), sr = {};
R(sr, { default: () => hr });
var hr, ol = O(() => {
  hr = [{ match: /#.*/g, sub: "todo" }, { expand: "str" }, { type: "str", match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g }, { type: "type", match: /!![a-z]+/g }, { type: "bool", match: /\b(Yes|No)\b/g }, { type: "oper", match: /[+:-]/g }, { expand: "num" }, { type: "var", match: /[a-zA-Z]\w*(?=:)/g }];
}), sl = { num: { type: "num", match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g }, str: { type: "str", match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g }, strDouble: { type: "str", match: /"((?!")[^\r\n\\]|\\[^])*"?/g } }, hl = Ru({ "./languages/asm.js": () => Promise.resolve().then(() => (zu(), Vn)), "./languages/bash.js": () => Promise.resolve().then(() => (Yn(), Wn)), "./languages/bf.js": () => Promise.resolve().then(() => (Pu(), Zn)), "./languages/c.js": () => Promise.resolve().then(() => (Mu(), Xn)), "./languages/css.js": () => Promise.resolve().then(() => (_u(), Jn)), "./languages/csv.js": () => Promise.resolve().then(() => (vu(), ne)), "./languages/diff.js": () => Promise.resolve().then(() => (ie(), re)), "./languages/docker.js": () => Promise.resolve().then(() => (Bu(), ae)), "./languages/git.js": () => Promise.resolve().then(() => (Hu(), le)), "./languages/go.js": () => Promise.resolve().then(() => (Uu(), se)), "./languages/html.js": () => Promise.resolve().then(() => (ju(), ge)), "./languages/http.js": () => Promise.resolve().then(() => ($u(), fe)), "./languages/ini.js": () => Promise.resolve().then(() => (qu(), xe)), "./languages/java.js": () => Promise.resolve().then(() => (Vu(), ke)), "./languages/js.js": () => Promise.resolve().then(() => (Se(), ye)), "./languages/js_template_literals.js": () => Promise.resolve().then(() => (Gu(), Ie)), "./languages/jsdoc.js": () => Promise.resolve().then(() => (Wu(), Le)), "./languages/json.js": () => Promise.resolve().then(() => (Yu(), Ne)), "./languages/leanpub-md.js": () => Promise.resolve().then(() => (Zu(), Me)), "./languages/log.js": () => Promise.resolve().then(() => (Qu(), ve)), "./languages/lua.js": () => Promise.resolve().then(() => (Xu(), He)), "./languages/make.js": () => Promise.resolve().then(() => (Ku(), je)), "./languages/md.js": () => Promise.resolve().then(() => (Pe(), ze)), "./languages/pl.js": () => Promise.resolve().then(() => (Ju(), qe)), "./languages/plain.js": () => Promise.resolve().then(() => (tl(), Ge)), "./languages/py.js": () => Promise.resolve().then(() => (nl(), Ye)), "./languages/regex.js": () => Promise.resolve().then(() => (el(), Qe)), "./languages/rs.js": () => Promise.resolve().then(() => (rl(), Je)), "./languages/sql.js": () => Promise.resolve().then(() => (il(), nr)), "./languages/todo.js": () => Promise.resolve().then(() => (De(), we)), "./languages/toml.js": () => Promise.resolve().then(() => (al(), rr)), "./languages/ts.js": () => Promise.resolve().then(() => (ul(), ar)), "./languages/uri.js": () => Promise.resolve().then(() => (ll(), lr)), "./languages/xml.js": () => Promise.resolve().then(() => (me(), ce)), "./languages/yaml.js": () => Promise.resolve().then(() => (ol(), sr)) }), Sn = {}, cl = (t = "") => t.replaceAll("&", "&#38;").replaceAll?.("<", "&lt;").replaceAll?.(">", "&gt;"), ml = (t, e) => e ? `<span class="shj-syn-${e}">${t}</span>` : t;
async function cr(t, e, n) {
  try {
    let r, u, a = {}, i, l = [], h = 0, s = typeof e == "string" ? await (Sn[e] ?? (Sn[e] = hl(`./languages/${e}.js`))) : e, p = [...typeof e == "string" ? s.default : e.sub];
    for (; h < t.length; ) {
      for (a.index = null, r = p.length; r-- > 0; ) {
        if (u = p[r].expand ? sl[p[r].expand] : p[r], l[r] === void 0 || l[r].match.index < h) {
          if (u.match.lastIndex = h, i = u.match.exec(t), i === null) {
            p.splice(r, 1), l.splice(r, 1);
            continue;
          }
          l[r] = { match: i, lastIndex: u.match.lastIndex };
        }
        l[r].match[0] && (l[r].match.index <= a.index || a.index === null) && (a = { part: u, index: l[r].match.index, match: l[r].match[0], end: l[r].lastIndex });
      }
      if (a.index === null) break;
      n(t.slice(h, a.index), s.type), h = a.end, a.part.sub ? await cr(a.match, typeof a.part.sub == "string" ? a.part.sub : typeof a.part.sub == "function" ? a.part.sub(a.match) : a.part, n) : n(a.match, a.part.type);
    }
    n(t.slice(h, t.length), s.type);
  } catch {
    n(t);
  }
}
async function gl(t, e, n = !0, r = {}) {
  let u = "";
  return await cr(t, e, (a, i) => u += ml(cl(a), i)), n ? `<div><div class="shj-numbers">${"<div></div>".repeat(!r.hideLineNumbers && t.split(`
`).length)}</div><div>${u}</div></div>` : u;
}
async function pl(t, e = t.className.match(/shj-lang-([\w-]+)/)?.[1], n, r) {
  let u = t.textContent;
  n ?? (n = `${t.tagName == "CODE" ? "in" : u.split(`
`).length < 2 ? "one" : "multi"}line`), t.dataset.lang = e, t.className = `${[...t.classList].filter((a) => !a.startsWith("shj-")).join(" ")} shj-lang-${e} shj-${n}`, t.innerHTML = await gl(u, e, n == "multiline", r);
}
const fl = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
class xl {
  options;
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      extensions: [Fu()],
      htmlExtensions: [Ou(), this.createPresenterCodeBlockHtmlExtension()]
    };
  }
  // Operations - Render.
  render(e) {
    return va(e, this.options);
  }
  highlight() {
    document.querySelectorAll('div[class^="shj-lang-"]').forEach((e) => {
      console.log(1111, e);
      const n = e.className.match(/shj-lang-([^\s]+)/)?.[1];
      console.log(2222, n), n && (console.log(3333), pl(e, "js"), console.log(4444));
    });
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
        codeFencedFenceInfo(n) {
          e && (e.lang = this.sliceSerialize(n));
        },
        codeFencedFenceMeta(n) {
          e && (e.meta = this.sliceSerialize(n));
        },
        codeFlowValue(n) {
          e && e.codeContent.push(this.sliceSerialize(n));
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
          const n = e || { codeContent: [], lang: "", meta: "" };
          this.resume();
          const r = n.codeContent.join(`
`), u = n.lang || "plain", a = n.meta || "";
          let i = "";
          u === "json" && a === "datapos-visual" ? i = `<div class="${a}" data-options="${encodeURIComponent(r)}"></div>` : u === "json" && a === "datapos-highcharts" ? i = `<div class="${a}" data-options="${encodeURIComponent(r)}"></div>` : i = `<div class="shj-lang-${u.replaceAll(/[^a-z0-9_-]/gi, "")}">${bl(r)}</div>`, this.raw(i), e = void 0;
        }
      }
    };
  }
}
function bl(t) {
  return t.replaceAll(/[&<>"']/g, (e) => fl[e]);
}
export {
  xl as MicromarkTool
};
