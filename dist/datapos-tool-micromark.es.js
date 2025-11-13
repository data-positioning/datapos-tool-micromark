const Ir = document.createElement("i");
function Dn(t) {
  const e = "&" + t + ";";
  Ir.innerHTML = e;
  const r = Ir.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    r.charCodeAt(r.length - 1) === 59 && t !== "semi" || r === e ? !1 : r
  );
}
function He(t, e, r, n) {
  const a = t.length;
  let i = 0, l;
  if (e < 0 ? e = -e > a ? 0 : a + e : e = e > a ? a : e, r = r > 0 ? r : 0, n.length < 1e4)
    l = Array.from(n), l.unshift(e, r), t.splice(...l);
  else
    for (r && t.splice(e, r); i < n.length; )
      l = n.slice(i, i + 1e4), l.unshift(e, 0), t.splice(...l), i += 1e4, e += 1e4;
}
function Te(t, e) {
  return t.length > 0 ? (He(t, t.length, 0, e), t) : e;
}
const X0 = {}.hasOwnProperty;
function En(t) {
  const e = {};
  let r = -1;
  for (; ++r < t.length; )
    hi(e, t[r]);
  return e;
}
function hi(t, e) {
  let r;
  for (r in e) {
    const a = (X0.call(t, r) ? t[r] : void 0) || (t[r] = {}), i = e[r];
    let l;
    if (i)
      for (l in i) {
        X0.call(a, l) || (a[l] = []);
        const s = i[l];
        mi(
          // @ts-expect-error Looks like a list.
          a[l],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function mi(t, e) {
  let r = -1;
  const n = [];
  for (; ++r < e.length; )
    (e[r].add === "after" ? t : n).push(e[r]);
  He(t, 0, 0, n);
}
function In(t) {
  const e = {};
  let r = -1;
  for (; ++r < t.length; )
    ci(e, t[r]);
  return e;
}
function ci(t, e) {
  let r;
  for (r in e) {
    const a = (X0.call(t, r) ? t[r] : void 0) || (t[r] = {}), i = e[r];
    let l;
    if (i)
      for (l in i)
        a[l] = i[l];
  }
}
function fi(t, e) {
  const r = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    r < 9 || r === 11 || r > 13 && r < 32 || // Control character (DEL) of C0, and C1 controls.
    r > 126 && r < 160 || // Lone high surrogates and low surrogates.
    r > 55295 && r < 57344 || // Noncharacters.
    r > 64975 && r < 65008 || /* eslint-disable no-bitwise */
    (r & 65535) === 65535 || (r & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    r > 1114111 ? "�" : String.fromCodePoint(r)
  );
}
const di = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function Bn(t) {
  return t.replace(/["&<>]/g, e);
  function e(r) {
    return "&" + di[
      /** @type {keyof typeof characterReferences} */
      r
    ] + ";";
  }
}
function Je(t) {
  return t.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Ee = wt(/[A-Za-z]/), Ce = wt(/[\dA-Za-z]/), pi = wt(/[#-'*+\--9=?A-Z^-~]/);
function m0(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < 32 || t === 127)
  );
}
const Z0 = wt(/\d/), gi = wt(/[\dA-Fa-f]/), vi = wt(/[!-/:-@[-`{-~]/);
function j(t) {
  return t !== null && t < -2;
}
function oe(t) {
  return t !== null && (t < 0 || t === 32);
}
function re(t) {
  return t === -2 || t === -1 || t === 32;
}
const ir = wt(/\p{P}|\p{S}/u), Nt = wt(/\s/);
function wt(t) {
  return e;
  function e(r) {
    return r !== null && r > -1 && t.test(String.fromCharCode(r));
  }
}
function Mt(t, e) {
  const r = Bn(bi(t || ""));
  if (!e)
    return r;
  const n = r.indexOf(":"), a = r.indexOf("?"), i = r.indexOf("#"), l = r.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    l > -1 && n > l || a > -1 && n > a || i > -1 && n > i || // It is a protocol, it should be allowed.
    e.test(r.slice(0, n)) ? r : ""
  );
}
function bi(t) {
  const e = [];
  let r = -1, n = 0, a = 0;
  for (; ++r < t.length; ) {
    const i = t.charCodeAt(r);
    let l = "";
    if (i === 37 && Ce(t.charCodeAt(r + 1)) && Ce(t.charCodeAt(r + 2)))
      a = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (l = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const s = t.charCodeAt(r + 1);
      i < 56320 && s > 56319 && s < 57344 ? (l = String.fromCharCode(i, s), a = 1) : l = "�";
    } else
      l = String.fromCharCode(i);
    l && (e.push(t.slice(n, r), encodeURIComponent(l)), n = r + a + 1, l = ""), a && (r += a, a = 0);
  }
  return e.join("") + t.slice(n);
}
const Br = {}.hasOwnProperty, Nr = /^(https?|ircs?|mailto|xmpp)$/i, xi = /^https?$/i;
function yi(t) {
  const e = t || {};
  let r = !0;
  const n = {}, a = [[]], i = [], l = [], o = (
    /** @type {NormalizedHtmlExtension} */
    In([{
      enter: {
        blockQuote: _,
        codeFenced: de,
        codeFencedFenceInfo: B,
        codeFencedFenceMeta: B,
        codeIndented: ae,
        codeText: ri,
        content: Ua,
        definition: Pt,
        definitionDestinationString: Kt,
        definitionLabelString: B,
        definitionTitleString: B,
        emphasis: ei,
        htmlFlow: Ja,
        htmlText: Tr,
        image: pe,
        label: B,
        link: ke,
        listItemMarker: P,
        listItemValue: E,
        listOrdered: H,
        listUnordered: q,
        paragraph: ue,
        reference: B,
        resource: Ne,
        resourceDestinationString: Fe,
        resourceTitleString: B,
        setextHeading: ja,
        strong: ti
      },
      exit: {
        atxHeading: Xa,
        atxHeadingSequence: Wa,
        autolinkEmail: oi,
        autolinkProtocol: ui,
        blockQuote: se,
        characterEscapeValue: Vt,
        characterReferenceMarkerHexadecimal: Cr,
        characterReferenceMarkerNumeric: Cr,
        characterReferenceValue: si,
        codeFenced: A,
        codeFencedFence: ce,
        codeFencedFenceInfo: S,
        codeFencedFenceMeta: N,
        codeFlowValue: Ka,
        codeIndented: A,
        codeText: ni,
        codeTextData: Vt,
        data: Vt,
        definition: Dt,
        definitionDestinationString: Ht,
        definitionLabelString: _t,
        definitionTitleString: Ft,
        emphasis: ai,
        hardBreakEscape: Ar,
        hardBreakTrailing: Ar,
        htmlFlow: Mr,
        htmlFlowData: Vt,
        htmlText: Mr,
        htmlTextData: Vt,
        image: dt,
        label: Ae,
        labelText: fe,
        lineEnding: _a,
        link: dt,
        listOrdered: $,
        listUnordered: ee,
        paragraph: ne,
        reference: N,
        referenceString: Se,
        resource: N,
        resourceDestinationString: Xe,
        resourceTitleString: Rt,
        setextHeading: Qa,
        setextHeadingLineSequence: Za,
        setextHeadingText: Ya,
        strong: ii,
        thematicBreak: li
      }
    }, ...e.htmlExtensions || []])
  ), m = {
    definitions: n,
    tightStack: l
  }, d = {
    buffer: B,
    encode: z,
    getData: T,
    lineEndingIfNeeded: F,
    options: e,
    raw: k,
    resume: C,
    setData: w,
    tag: b
  };
  let c = e.defaultLineEnding;
  return v;
  function v(G) {
    let Y = -1, Me = 0;
    const We = [];
    let Ze = [], at = [];
    for (; ++Y < G.length; )
      !c && (G[Y][1].type === "lineEnding" || G[Y][1].type === "lineEndingBlank") && (c = /** @type {LineEnding} */
      G[Y][2].sliceSerialize(G[Y][1])), (G[Y][1].type === "listOrdered" || G[Y][1].type === "listUnordered") && (G[Y][0] === "enter" ? We.push(Y) : p(G.slice(We.pop(), Y))), G[Y][1].type === "definition" && (G[Y][0] === "enter" ? (at = Te(at, G.slice(Me, Y)), Me = Y) : (Ze = Te(Ze, G.slice(Me, Y + 1)), Me = Y + 1));
    Ze = Te(Ze, at), Ze = Te(Ze, G.slice(Me)), Y = -1;
    const Qe = Ze;
    for (o.enter.null && o.enter.null.call(d); ++Y < G.length; ) {
      const Fr = o[Qe[Y][0]], Dr = Qe[Y][1].type, Er = Fr[Dr];
      Br.call(Fr, Dr) && Er && Er.call({
        sliceSerialize: Qe[Y][2].sliceSerialize,
        ...d
      }, Qe[Y][1]);
    }
    return o.exit.null && o.exit.null.call(d), a[0].join("");
  }
  function p(G) {
    const Y = G.length;
    let Me = 0, We = 0, Ze = !1, at;
    for (; ++Me < Y; ) {
      const Qe = G[Me];
      if (Qe[1]._container)
        at = void 0, Qe[0] === "enter" ? We++ : We--;
      else switch (Qe[1].type) {
        case "listItemPrefix": {
          Qe[0] === "exit" && (at = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          Qe[0] === "enter" && !We && (at ? at = void 0 : Ze = !0);
          break;
        }
        default:
          at = void 0;
      }
    }
    G[0][1]._loose = Ze;
  }
  function w(G, Y) {
    m[G] = Y;
  }
  function T(G) {
    return m[G];
  }
  function B() {
    a.push([]);
  }
  function C() {
    return a.pop().join("");
  }
  function b(G) {
    r && (w("lastWasTag", !0), a[a.length - 1].push(G));
  }
  function k(G) {
    w("lastWasTag"), a[a.length - 1].push(G);
  }
  function I() {
    k(c || `
`);
  }
  function F() {
    const G = a[a.length - 1], Y = G[G.length - 1], Me = Y ? Y.charCodeAt(Y.length - 1) : null;
    Me === 10 || Me === 13 || Me === null || I();
  }
  function z(G) {
    return T("ignoreEncode") ? G : Bn(G);
  }
  function N() {
    C();
  }
  function H(G) {
    l.push(!G._loose), F(), b("<ol"), w("expectFirstItem", !0);
  }
  function q(G) {
    l.push(!G._loose), F(), b("<ul"), w("expectFirstItem", !0);
  }
  function E(G) {
    if (T("expectFirstItem")) {
      const Y = Number.parseInt(this.sliceSerialize(G), 10);
      Y !== 1 && b(' start="' + z(String(Y)) + '"');
    }
  }
  function P() {
    T("expectFirstItem") ? b(">") : K(), F(), b("<li>"), w("expectFirstItem"), w("lastWasTag");
  }
  function $() {
    K(), l.pop(), I(), b("</ol>");
  }
  function ee() {
    K(), l.pop(), I(), b("</ul>");
  }
  function K() {
    T("lastWasTag") && !T("slurpAllLineEndings") && F(), b("</li>"), w("slurpAllLineEndings");
  }
  function _() {
    l.push(!1), F(), b("<blockquote>");
  }
  function se() {
    l.pop(), F(), b("</blockquote>"), w("slurpAllLineEndings");
  }
  function ue() {
    l[l.length - 1] || (F(), b("<p>")), w("slurpAllLineEndings");
  }
  function ne() {
    l[l.length - 1] ? w("slurpAllLineEndings", !0) : b("</p>");
  }
  function de() {
    F(), b("<pre><code"), w("fencesCount", 0);
  }
  function S() {
    const G = C();
    b(' class="language-' + G + '"');
  }
  function ce() {
    const G = T("fencesCount") || 0;
    G || (b(">"), w("slurpOneLineEnding", !0)), w("fencesCount", G + 1);
  }
  function ae() {
    F(), b("<pre><code>");
  }
  function A() {
    const G = T("fencesCount");
    G !== void 0 && G < 2 && m.tightStack.length > 0 && !T("lastWasTag") && I(), T("flowCodeSeenData") && F(), b("</code></pre>"), G !== void 0 && G < 2 && F(), w("flowCodeSeenData"), w("fencesCount"), w("slurpOneLineEnding");
  }
  function pe() {
    i.push({
      image: !0
    }), r = void 0;
  }
  function ke() {
    i.push({});
  }
  function fe(G) {
    i[i.length - 1].labelId = this.sliceSerialize(G);
  }
  function Ae() {
    i[i.length - 1].label = C();
  }
  function Se(G) {
    i[i.length - 1].referenceId = this.sliceSerialize(G);
  }
  function Ne() {
    B(), i[i.length - 1].destination = "";
  }
  function Fe() {
    B(), w("ignoreEncode", !0);
  }
  function Xe() {
    i[i.length - 1].destination = C(), w("ignoreEncode");
  }
  function Rt() {
    i[i.length - 1].title = C();
  }
  function dt() {
    let G = i.length - 1;
    const Y = i[G], Me = Y.referenceId || Y.labelId, We = Y.destination === void 0 ? n[Je(Me)] : Y;
    for (r = !0; G--; )
      if (i[G].image) {
        r = void 0;
        break;
      }
    Y.image ? (b('<img src="' + Mt(We.destination, e.allowDangerousProtocol ? void 0 : xi) + '" alt="'), k(Y.label), b('"')) : b('<a href="' + Mt(We.destination, e.allowDangerousProtocol ? void 0 : Nr) + '"'), b(We.title ? ' title="' + We.title + '"' : ""), Y.image ? b(" />") : (b(">"), k(Y.label), b("</a>")), i.pop();
  }
  function Pt() {
    B(), i.push({});
  }
  function _t(G) {
    C(), i[i.length - 1].labelId = this.sliceSerialize(G);
  }
  function Kt() {
    B(), w("ignoreEncode", !0);
  }
  function Ht() {
    i[i.length - 1].destination = C(), w("ignoreEncode");
  }
  function Ft() {
    i[i.length - 1].title = C();
  }
  function Dt() {
    const G = i[i.length - 1], Y = Je(G.labelId);
    C(), Br.call(n, Y) || (n[Y] = i[i.length - 1]), i.pop();
  }
  function Ua() {
    w("slurpAllLineEndings", !0);
  }
  function Wa(G) {
    T("headingRank") || (w("headingRank", this.sliceSerialize(G).length), F(), b("<h" + T("headingRank") + ">"));
  }
  function ja() {
    B(), w("slurpAllLineEndings");
  }
  function Ya() {
    w("slurpAllLineEndings", !0);
  }
  function Xa() {
    b("</h" + T("headingRank") + ">"), w("headingRank");
  }
  function Za(G) {
    w("headingRank", this.sliceSerialize(G).charCodeAt(0) === 61 ? 1 : 2);
  }
  function Qa() {
    const G = C();
    F(), b("<h" + T("headingRank") + ">"), k(G), b("</h" + T("headingRank") + ">"), w("slurpAllLineEndings"), w("headingRank");
  }
  function Vt(G) {
    k(z(this.sliceSerialize(G)));
  }
  function _a(G) {
    if (!T("slurpAllLineEndings")) {
      if (T("slurpOneLineEnding")) {
        w("slurpOneLineEnding");
        return;
      }
      if (T("inCodeText")) {
        k(" ");
        return;
      }
      k(z(this.sliceSerialize(G)));
    }
  }
  function Ka(G) {
    k(z(this.sliceSerialize(G))), w("flowCodeSeenData", !0);
  }
  function Ar() {
    b("<br />");
  }
  function Ja() {
    F(), Tr();
  }
  function Mr() {
    w("ignoreEncode");
  }
  function Tr() {
    e.allowDangerousHtml && w("ignoreEncode", !0);
  }
  function ei() {
    b("<em>");
  }
  function ti() {
    b("<strong>");
  }
  function ri() {
    w("inCodeText", !0), b("<code>");
  }
  function ni() {
    w("inCodeText"), b("</code>");
  }
  function ai() {
    b("</em>");
  }
  function ii() {
    b("</strong>");
  }
  function li() {
    F(), b("<hr />");
  }
  function Cr(G) {
    w("characterReferenceType", G.type);
  }
  function si(G) {
    const Y = this.sliceSerialize(G), Me = T("characterReferenceType") ? fi(Y, T("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : Dn(Y);
    k(z(
      /** @type {string} */
      Me
    )), w("characterReferenceType");
  }
  function ui(G) {
    const Y = this.sliceSerialize(G);
    b('<a href="' + Mt(Y, e.allowDangerousProtocol ? void 0 : Nr) + '">'), k(z(Y)), b("</a>");
  }
  function oi(G) {
    const Y = this.sliceSerialize(G);
    b('<a href="' + Mt("mailto:" + Y) + '">'), k(z(Y)), b("</a>");
  }
}
function te(t, e, r, n) {
  const a = n ? n - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return l;
  function l(o) {
    return re(o) ? (t.enter(r), s(o)) : e(o);
  }
  function s(o) {
    return re(o) && i++ < a ? (t.consume(o), s) : (t.exit(r), e(o));
  }
}
const wi = {
  tokenize: ki
};
function ki(t) {
  const e = t.attempt(this.parser.constructs.contentInitial, n, a);
  let r;
  return e;
  function n(s) {
    if (s === null) {
      t.consume(s);
      return;
    }
    return t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), te(t, e, "linePrefix");
  }
  function a(s) {
    return t.enter("paragraph"), i(s);
  }
  function i(s) {
    const o = t.enter("chunkText", {
      contentType: "text",
      previous: r
    });
    return r && (r.next = o), r = o, l(s);
  }
  function l(s) {
    if (s === null) {
      t.exit("chunkText"), t.exit("paragraph"), t.consume(s);
      return;
    }
    return j(s) ? (t.consume(s), t.exit("chunkText"), i) : (t.consume(s), l);
  }
}
const Si = {
  tokenize: zi
}, qr = {
  tokenize: Ai
};
function zi(t) {
  const e = this, r = [];
  let n = 0, a, i, l;
  return s;
  function s(k) {
    if (n < r.length) {
      const I = r[n];
      return e.containerState = I[1], t.attempt(I[0].continuation, o, m)(k);
    }
    return m(k);
  }
  function o(k) {
    if (n++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, a && b();
      const I = e.events.length;
      let F = I, z;
      for (; F--; )
        if (e.events[F][0] === "exit" && e.events[F][1].type === "chunkFlow") {
          z = e.events[F][1].end;
          break;
        }
      C(n);
      let N = I;
      for (; N < e.events.length; )
        e.events[N][1].end = {
          ...z
        }, N++;
      return He(e.events, F + 1, 0, e.events.slice(I)), e.events.length = N, m(k);
    }
    return s(k);
  }
  function m(k) {
    if (n === r.length) {
      if (!a)
        return v(k);
      if (a.currentConstruct && a.currentConstruct.concrete)
        return w(k);
      e.interrupt = !!(a.currentConstruct && !a._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(qr, d, c)(k);
  }
  function d(k) {
    return a && b(), C(n), v(k);
  }
  function c(k) {
    return e.parser.lazy[e.now().line] = n !== r.length, l = e.now().offset, w(k);
  }
  function v(k) {
    return e.containerState = {}, t.attempt(qr, p, w)(k);
  }
  function p(k) {
    return n++, r.push([e.currentConstruct, e.containerState]), v(k);
  }
  function w(k) {
    if (k === null) {
      a && b(), C(0), t.consume(k);
      return;
    }
    return a = a || e.parser.flow(e.now()), t.enter("chunkFlow", {
      _tokenizer: a,
      contentType: "flow",
      previous: i
    }), T(k);
  }
  function T(k) {
    if (k === null) {
      B(t.exit("chunkFlow"), !0), C(0), t.consume(k);
      return;
    }
    return j(k) ? (t.consume(k), B(t.exit("chunkFlow")), n = 0, e.interrupt = void 0, s) : (t.consume(k), T);
  }
  function B(k, I) {
    const F = e.sliceStream(k);
    if (I && F.push(null), k.previous = i, i && (i.next = k), i = k, a.defineSkip(k.start), a.write(F), e.parser.lazy[k.start.line]) {
      let z = a.events.length;
      for (; z--; )
        if (
          // The token starts before the line ending…
          a.events[z][1].start.offset < l && // …and either is not ended yet…
          (!a.events[z][1].end || // …or ends after it.
          a.events[z][1].end.offset > l)
        )
          return;
      const N = e.events.length;
      let H = N, q, E;
      for (; H--; )
        if (e.events[H][0] === "exit" && e.events[H][1].type === "chunkFlow") {
          if (q) {
            E = e.events[H][1].end;
            break;
          }
          q = !0;
        }
      for (C(n), z = N; z < e.events.length; )
        e.events[z][1].end = {
          ...E
        }, z++;
      He(e.events, H + 1, 0, e.events.slice(N)), e.events.length = z;
    }
  }
  function C(k) {
    let I = r.length;
    for (; I-- > k; ) {
      const F = r[I];
      e.containerState = F[1], F[0].exit.call(e, t);
    }
    r.length = k;
  }
  function b() {
    a.write([null]), i = void 0, a = void 0, e.containerState._closeFlow = void 0;
  }
}
function Ai(t, e, r) {
  return te(t, t.attempt(this.parser.constructs.document, e, r), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function c0(t) {
  if (t === null || oe(t) || Nt(t))
    return 1;
  if (ir(t))
    return 2;
}
function b0(t, e, r) {
  const n = [];
  let a = -1;
  for (; ++a < t.length; ) {
    const i = t[a].resolveAll;
    i && !n.includes(i) && (e = i(e, r), n.push(i));
  }
  return e;
}
const Q0 = {
  name: "attention",
  resolveAll: Mi,
  tokenize: Ti
};
function Mi(t, e) {
  let r = -1, n, a, i, l, s, o, m, d;
  for (; ++r < t.length; )
    if (t[r][0] === "enter" && t[r][1].type === "attentionSequence" && t[r][1]._close) {
      for (n = r; n--; )
        if (t[n][0] === "exit" && t[n][1].type === "attentionSequence" && t[n][1]._open && // If the markers are the same:
        e.sliceSerialize(t[n][1]).charCodeAt(0) === e.sliceSerialize(t[r][1]).charCodeAt(0)) {
          if ((t[n][1]._close || t[r][1]._open) && (t[r][1].end.offset - t[r][1].start.offset) % 3 && !((t[n][1].end.offset - t[n][1].start.offset + t[r][1].end.offset - t[r][1].start.offset) % 3))
            continue;
          o = t[n][1].end.offset - t[n][1].start.offset > 1 && t[r][1].end.offset - t[r][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...t[n][1].end
          }, v = {
            ...t[r][1].start
          };
          Lr(c, -o), Lr(v, o), l = {
            type: o > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...t[n][1].end
            }
          }, s = {
            type: o > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...t[r][1].start
            },
            end: v
          }, i = {
            type: o > 1 ? "strongText" : "emphasisText",
            start: {
              ...t[n][1].end
            },
            end: {
              ...t[r][1].start
            }
          }, a = {
            type: o > 1 ? "strong" : "emphasis",
            start: {
              ...l.start
            },
            end: {
              ...s.end
            }
          }, t[n][1].end = {
            ...l.start
          }, t[r][1].start = {
            ...s.end
          }, m = [], t[n][1].end.offset - t[n][1].start.offset && (m = Te(m, [["enter", t[n][1], e], ["exit", t[n][1], e]])), m = Te(m, [["enter", a, e], ["enter", l, e], ["exit", l, e], ["enter", i, e]]), m = Te(m, b0(e.parser.constructs.insideSpan.null, t.slice(n + 1, r), e)), m = Te(m, [["exit", i, e], ["enter", s, e], ["exit", s, e], ["exit", a, e]]), t[r][1].end.offset - t[r][1].start.offset ? (d = 2, m = Te(m, [["enter", t[r][1], e], ["exit", t[r][1], e]])) : d = 0, He(t, n - 1, r - n + 3, m), r = n + m.length - d - 2;
          break;
        }
    }
  for (r = -1; ++r < t.length; )
    t[r][1].type === "attentionSequence" && (t[r][1].type = "data");
  return t;
}
function Ti(t, e) {
  const r = this.parser.constructs.attentionMarkers.null, n = this.previous, a = c0(n);
  let i;
  return l;
  function l(o) {
    return i = o, t.enter("attentionSequence"), s(o);
  }
  function s(o) {
    if (o === i)
      return t.consume(o), s;
    const m = t.exit("attentionSequence"), d = c0(o), c = !d || d === 2 && a || r.includes(o), v = !a || a === 2 && d || r.includes(n);
    return m._open = !!(i === 42 ? c : c && (a || !v)), m._close = !!(i === 42 ? v : v && (d || !c)), e(o);
  }
}
function Lr(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const Ci = {
  name: "autolink",
  tokenize: Fi
};
function Fi(t, e, r) {
  let n = 0;
  return a;
  function a(p) {
    return t.enter("autolink"), t.enter("autolinkMarker"), t.consume(p), t.exit("autolinkMarker"), t.enter("autolinkProtocol"), i;
  }
  function i(p) {
    return Ee(p) ? (t.consume(p), l) : p === 64 ? r(p) : m(p);
  }
  function l(p) {
    return p === 43 || p === 45 || p === 46 || Ce(p) ? (n = 1, s(p)) : m(p);
  }
  function s(p) {
    return p === 58 ? (t.consume(p), n = 0, o) : (p === 43 || p === 45 || p === 46 || Ce(p)) && n++ < 32 ? (t.consume(p), s) : (n = 0, m(p));
  }
  function o(p) {
    return p === 62 ? (t.exit("autolinkProtocol"), t.enter("autolinkMarker"), t.consume(p), t.exit("autolinkMarker"), t.exit("autolink"), e) : p === null || p === 32 || p === 60 || m0(p) ? r(p) : (t.consume(p), o);
  }
  function m(p) {
    return p === 64 ? (t.consume(p), d) : pi(p) ? (t.consume(p), m) : r(p);
  }
  function d(p) {
    return Ce(p) ? c(p) : r(p);
  }
  function c(p) {
    return p === 46 ? (t.consume(p), n = 0, d) : p === 62 ? (t.exit("autolinkProtocol").type = "autolinkEmail", t.enter("autolinkMarker"), t.consume(p), t.exit("autolinkMarker"), t.exit("autolink"), e) : v(p);
  }
  function v(p) {
    if ((p === 45 || Ce(p)) && n++ < 63) {
      const w = p === 45 ? v : c;
      return t.consume(p), w;
    }
    return r(p);
  }
}
const Xt = {
  partial: !0,
  tokenize: Di
};
function Di(t, e, r) {
  return n;
  function n(i) {
    return re(i) ? te(t, a, "linePrefix")(i) : a(i);
  }
  function a(i) {
    return i === null || j(i) ? e(i) : r(i);
  }
}
const Nn = {
  continuation: {
    tokenize: Ii
  },
  exit: Bi,
  name: "blockQuote",
  tokenize: Ei
};
function Ei(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    if (l === 62) {
      const s = n.containerState;
      return s.open || (t.enter("blockQuote", {
        _container: !0
      }), s.open = !0), t.enter("blockQuotePrefix"), t.enter("blockQuoteMarker"), t.consume(l), t.exit("blockQuoteMarker"), i;
    }
    return r(l);
  }
  function i(l) {
    return re(l) ? (t.enter("blockQuotePrefixWhitespace"), t.consume(l), t.exit("blockQuotePrefixWhitespace"), t.exit("blockQuotePrefix"), e) : (t.exit("blockQuotePrefix"), e(l));
  }
}
function Ii(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return re(l) ? te(t, i, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : i(l);
  }
  function i(l) {
    return t.attempt(Nn, e, r)(l);
  }
}
function Bi(t) {
  t.exit("blockQuote");
}
const qn = {
  name: "characterEscape",
  tokenize: Ni
};
function Ni(t, e, r) {
  return n;
  function n(i) {
    return t.enter("characterEscape"), t.enter("escapeMarker"), t.consume(i), t.exit("escapeMarker"), a;
  }
  function a(i) {
    return vi(i) ? (t.enter("characterEscapeValue"), t.consume(i), t.exit("characterEscapeValue"), t.exit("characterEscape"), e) : r(i);
  }
}
const Ln = {
  name: "characterReference",
  tokenize: qi
};
function qi(t, e, r) {
  const n = this;
  let a = 0, i, l;
  return s;
  function s(c) {
    return t.enter("characterReference"), t.enter("characterReferenceMarker"), t.consume(c), t.exit("characterReferenceMarker"), o;
  }
  function o(c) {
    return c === 35 ? (t.enter("characterReferenceMarkerNumeric"), t.consume(c), t.exit("characterReferenceMarkerNumeric"), m) : (t.enter("characterReferenceValue"), i = 31, l = Ce, d(c));
  }
  function m(c) {
    return c === 88 || c === 120 ? (t.enter("characterReferenceMarkerHexadecimal"), t.consume(c), t.exit("characterReferenceMarkerHexadecimal"), t.enter("characterReferenceValue"), i = 6, l = gi, d) : (t.enter("characterReferenceValue"), i = 7, l = Z0, d(c));
  }
  function d(c) {
    if (c === 59 && a) {
      const v = t.exit("characterReferenceValue");
      return l === Ce && !Dn(n.sliceSerialize(v)) ? r(c) : (t.enter("characterReferenceMarker"), t.consume(c), t.exit("characterReferenceMarker"), t.exit("characterReference"), e);
    }
    return l(c) && a++ < i ? (t.consume(c), d) : r(c);
  }
}
const Or = {
  partial: !0,
  tokenize: Oi
}, Rr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Li
};
function Li(t, e, r) {
  const n = this, a = {
    partial: !0,
    tokenize: F
  };
  let i = 0, l = 0, s;
  return o;
  function o(z) {
    return m(z);
  }
  function m(z) {
    const N = n.events[n.events.length - 1];
    return i = N && N[1].type === "linePrefix" ? N[2].sliceSerialize(N[1], !0).length : 0, s = z, t.enter("codeFenced"), t.enter("codeFencedFence"), t.enter("codeFencedFenceSequence"), d(z);
  }
  function d(z) {
    return z === s ? (l++, t.consume(z), d) : l < 3 ? r(z) : (t.exit("codeFencedFenceSequence"), re(z) ? te(t, c, "whitespace")(z) : c(z));
  }
  function c(z) {
    return z === null || j(z) ? (t.exit("codeFencedFence"), n.interrupt ? e(z) : t.check(Or, T, I)(z)) : (t.enter("codeFencedFenceInfo"), t.enter("chunkString", {
      contentType: "string"
    }), v(z));
  }
  function v(z) {
    return z === null || j(z) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), c(z)) : re(z) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), te(t, p, "whitespace")(z)) : z === 96 && z === s ? r(z) : (t.consume(z), v);
  }
  function p(z) {
    return z === null || j(z) ? c(z) : (t.enter("codeFencedFenceMeta"), t.enter("chunkString", {
      contentType: "string"
    }), w(z));
  }
  function w(z) {
    return z === null || j(z) ? (t.exit("chunkString"), t.exit("codeFencedFenceMeta"), c(z)) : z === 96 && z === s ? r(z) : (t.consume(z), w);
  }
  function T(z) {
    return t.attempt(a, I, B)(z);
  }
  function B(z) {
    return t.enter("lineEnding"), t.consume(z), t.exit("lineEnding"), C;
  }
  function C(z) {
    return i > 0 && re(z) ? te(t, b, "linePrefix", i + 1)(z) : b(z);
  }
  function b(z) {
    return z === null || j(z) ? t.check(Or, T, I)(z) : (t.enter("codeFlowValue"), k(z));
  }
  function k(z) {
    return z === null || j(z) ? (t.exit("codeFlowValue"), b(z)) : (t.consume(z), k);
  }
  function I(z) {
    return t.exit("codeFenced"), e(z);
  }
  function F(z, N, H) {
    let q = 0;
    return E;
    function E(_) {
      return z.enter("lineEnding"), z.consume(_), z.exit("lineEnding"), P;
    }
    function P(_) {
      return z.enter("codeFencedFence"), re(_) ? te(z, $, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(_) : $(_);
    }
    function $(_) {
      return _ === s ? (z.enter("codeFencedFenceSequence"), ee(_)) : H(_);
    }
    function ee(_) {
      return _ === s ? (q++, z.consume(_), ee) : q >= l ? (z.exit("codeFencedFenceSequence"), re(_) ? te(z, K, "whitespace")(_) : K(_)) : H(_);
    }
    function K(_) {
      return _ === null || j(_) ? (z.exit("codeFencedFence"), N(_)) : H(_);
    }
  }
}
function Oi(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return l === null ? r(l) : (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), i);
  }
  function i(l) {
    return n.parser.lazy[n.now().line] ? r(l) : e(l);
  }
}
const T0 = {
  name: "codeIndented",
  tokenize: Pi
}, Ri = {
  partial: !0,
  tokenize: Hi
};
function Pi(t, e, r) {
  const n = this;
  return a;
  function a(m) {
    return t.enter("codeIndented"), te(t, i, "linePrefix", 5)(m);
  }
  function i(m) {
    const d = n.events[n.events.length - 1];
    return d && d[1].type === "linePrefix" && d[2].sliceSerialize(d[1], !0).length >= 4 ? l(m) : r(m);
  }
  function l(m) {
    return m === null ? o(m) : j(m) ? t.attempt(Ri, l, o)(m) : (t.enter("codeFlowValue"), s(m));
  }
  function s(m) {
    return m === null || j(m) ? (t.exit("codeFlowValue"), l(m)) : (t.consume(m), s);
  }
  function o(m) {
    return t.exit("codeIndented"), e(m);
  }
}
function Hi(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return n.parser.lazy[n.now().line] ? r(l) : j(l) ? (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), a) : te(t, i, "linePrefix", 5)(l);
  }
  function i(l) {
    const s = n.events[n.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? e(l) : j(l) ? a(l) : r(l);
  }
}
const Vi = {
  name: "codeText",
  previous: Gi,
  resolve: $i,
  tokenize: Ui
};
function $i(t) {
  let e = t.length - 4, r = 3, n, a;
  if ((t[r][1].type === "lineEnding" || t[r][1].type === "space") && (t[e][1].type === "lineEnding" || t[e][1].type === "space")) {
    for (n = r; ++n < e; )
      if (t[n][1].type === "codeTextData") {
        t[r][1].type = "codeTextPadding", t[e][1].type = "codeTextPadding", r += 2, e -= 2;
        break;
      }
  }
  for (n = r - 1, e++; ++n <= e; )
    a === void 0 ? n !== e && t[n][1].type !== "lineEnding" && (a = n) : (n === e || t[n][1].type === "lineEnding") && (t[a][1].type = "codeTextData", n !== a + 2 && (t[a][1].end = t[n - 1][1].end, t.splice(a + 2, n - a - 2), e -= n - a - 2, n = a + 2), a = void 0);
  return t;
}
function Gi(t) {
  return t !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Ui(t, e, r) {
  let n = 0, a, i;
  return l;
  function l(c) {
    return t.enter("codeText"), t.enter("codeTextSequence"), s(c);
  }
  function s(c) {
    return c === 96 ? (t.consume(c), n++, s) : (t.exit("codeTextSequence"), o(c));
  }
  function o(c) {
    return c === null ? r(c) : c === 32 ? (t.enter("space"), t.consume(c), t.exit("space"), o) : c === 96 ? (i = t.enter("codeTextSequence"), a = 0, d(c)) : j(c) ? (t.enter("lineEnding"), t.consume(c), t.exit("lineEnding"), o) : (t.enter("codeTextData"), m(c));
  }
  function m(c) {
    return c === null || c === 32 || c === 96 || j(c) ? (t.exit("codeTextData"), o(c)) : (t.consume(c), m);
  }
  function d(c) {
    return c === 96 ? (t.consume(c), a++, d) : a === n ? (t.exit("codeTextSequence"), t.exit("codeText"), e(c)) : (i.type = "codeTextData", m(c));
  }
}
class Wi {
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
  slice(e, r) {
    const n = r ?? Number.POSITIVE_INFINITY;
    return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
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
  splice(e, r, n) {
    const a = r || 0;
    this.setCursor(Math.trunc(e));
    const i = this.right.splice(this.right.length - a, Number.POSITIVE_INFINITY);
    return n && $t(this.left, n), i.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), $t(this.left, e);
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
    this.setCursor(0), $t(this.right, e.reverse());
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
        const r = this.left.splice(e, Number.POSITIVE_INFINITY);
        $t(this.right, r.reverse());
      } else {
        const r = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
        $t(this.left, r.reverse());
      }
  }
}
function $t(t, e) {
  let r = 0;
  if (e.length < 1e4)
    t.push(...e);
  else
    for (; r < e.length; )
      t.push(...e.slice(r, r + 1e4)), r += 1e4;
}
function On(t) {
  const e = {};
  let r = -1, n, a, i, l, s, o, m;
  const d = new Wi(t);
  for (; ++r < d.length; ) {
    for (; r in e; )
      r = e[r];
    if (n = d.get(r), r && n[1].type === "chunkFlow" && d.get(r - 1)[1].type === "listItemPrefix" && (o = n[1]._tokenizer.events, i = 0, i < o.length && o[i][1].type === "lineEndingBlank" && (i += 2), i < o.length && o[i][1].type === "content"))
      for (; ++i < o.length && o[i][1].type !== "content"; )
        o[i][1].type === "chunkText" && (o[i][1]._isInFirstContentOfListItem = !0, i++);
    if (n[0] === "enter")
      n[1].contentType && (Object.assign(e, ji(d, r)), r = e[r], m = !0);
    else if (n[1]._container) {
      for (i = r, a = void 0; i--; )
        if (l = d.get(i), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (a && (d.get(a)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", a = i);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      a && (n[1].end = {
        ...d.get(a)[1].start
      }, s = d.slice(a, r), s.unshift(n), d.splice(a, r - a + 1, s));
    }
  }
  return He(t, 0, Number.POSITIVE_INFINITY, d.slice(0)), !m;
}
function ji(t, e) {
  const r = t.get(e)[1], n = t.get(e)[2];
  let a = e - 1;
  const i = [];
  let l = r._tokenizer;
  l || (l = n.parser[r.contentType](r.start), r._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const s = l.events, o = [], m = {};
  let d, c, v = -1, p = r, w = 0, T = 0;
  const B = [T];
  for (; p; ) {
    for (; t.get(++a)[1] !== p; )
      ;
    i.push(a), p._tokenizer || (d = n.sliceStream(p), p.next || d.push(null), c && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(d), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), c = p, p = p.next;
  }
  for (p = r; ++v < s.length; )
    // Find a void token that includes a break.
    s[v][0] === "exit" && s[v - 1][0] === "enter" && s[v][1].type === s[v - 1][1].type && s[v][1].start.line !== s[v][1].end.line && (T = v + 1, B.push(T), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : B.pop(), v = B.length; v--; ) {
    const C = s.slice(B[v], B[v + 1]), b = i.pop();
    o.push([b, b + C.length - 1]), t.splice(b, 2, C);
  }
  for (o.reverse(), v = -1; ++v < o.length; )
    m[w + o[v][0]] = w + o[v][1], w += o[v][1] - o[v][0] - 1;
  return m;
}
const Yi = {
  resolve: Zi,
  tokenize: Qi
}, Xi = {
  partial: !0,
  tokenize: _i
};
function Zi(t) {
  return On(t), t;
}
function Qi(t, e) {
  let r;
  return n;
  function n(s) {
    return t.enter("content"), r = t.enter("chunkContent", {
      contentType: "content"
    }), a(s);
  }
  function a(s) {
    return s === null ? i(s) : j(s) ? t.check(Xi, l, i)(s) : (t.consume(s), a);
  }
  function i(s) {
    return t.exit("chunkContent"), t.exit("content"), e(s);
  }
  function l(s) {
    return t.consume(s), t.exit("chunkContent"), r.next = t.enter("chunkContent", {
      contentType: "content",
      previous: r
    }), r = r.next, a;
  }
}
function _i(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return t.exit("chunkContent"), t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), te(t, i, "linePrefix");
  }
  function i(l) {
    if (l === null || j(l))
      return r(l);
    const s = n.events[n.events.length - 1];
    return !n.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? e(l) : t.interrupt(n.parser.constructs.flow, r, e)(l);
  }
}
function Rn(t, e, r, n, a, i, l, s, o) {
  const m = o || Number.POSITIVE_INFINITY;
  let d = 0;
  return c;
  function c(C) {
    return C === 60 ? (t.enter(n), t.enter(a), t.enter(i), t.consume(C), t.exit(i), v) : C === null || C === 32 || C === 41 || m0(C) ? r(C) : (t.enter(n), t.enter(l), t.enter(s), t.enter("chunkString", {
      contentType: "string"
    }), T(C));
  }
  function v(C) {
    return C === 62 ? (t.enter(i), t.consume(C), t.exit(i), t.exit(a), t.exit(n), e) : (t.enter(s), t.enter("chunkString", {
      contentType: "string"
    }), p(C));
  }
  function p(C) {
    return C === 62 ? (t.exit("chunkString"), t.exit(s), v(C)) : C === null || C === 60 || j(C) ? r(C) : (t.consume(C), C === 92 ? w : p);
  }
  function w(C) {
    return C === 60 || C === 62 || C === 92 ? (t.consume(C), p) : p(C);
  }
  function T(C) {
    return !d && (C === null || C === 41 || oe(C)) ? (t.exit("chunkString"), t.exit(s), t.exit(l), t.exit(n), e(C)) : d < m && C === 40 ? (t.consume(C), d++, T) : C === 41 ? (t.consume(C), d--, T) : C === null || C === 32 || C === 40 || m0(C) ? r(C) : (t.consume(C), C === 92 ? B : T);
  }
  function B(C) {
    return C === 40 || C === 41 || C === 92 ? (t.consume(C), T) : T(C);
  }
}
function Pn(t, e, r, n, a, i) {
  const l = this;
  let s = 0, o;
  return m;
  function m(p) {
    return t.enter(n), t.enter(a), t.consume(p), t.exit(a), t.enter(i), d;
  }
  function d(p) {
    return s > 999 || p === null || p === 91 || p === 93 && !o || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !s && "_hiddenFootnoteSupport" in l.parser.constructs ? r(p) : p === 93 ? (t.exit(i), t.enter(a), t.consume(p), t.exit(a), t.exit(n), e) : j(p) ? (t.enter("lineEnding"), t.consume(p), t.exit("lineEnding"), d) : (t.enter("chunkString", {
      contentType: "string"
    }), c(p));
  }
  function c(p) {
    return p === null || p === 91 || p === 93 || j(p) || s++ > 999 ? (t.exit("chunkString"), d(p)) : (t.consume(p), o || (o = !re(p)), p === 92 ? v : c);
  }
  function v(p) {
    return p === 91 || p === 92 || p === 93 ? (t.consume(p), s++, c) : c(p);
  }
}
function Hn(t, e, r, n, a, i) {
  let l;
  return s;
  function s(v) {
    return v === 34 || v === 39 || v === 40 ? (t.enter(n), t.enter(a), t.consume(v), t.exit(a), l = v === 40 ? 41 : v, o) : r(v);
  }
  function o(v) {
    return v === l ? (t.enter(a), t.consume(v), t.exit(a), t.exit(n), e) : (t.enter(i), m(v));
  }
  function m(v) {
    return v === l ? (t.exit(i), o(l)) : v === null ? r(v) : j(v) ? (t.enter("lineEnding"), t.consume(v), t.exit("lineEnding"), te(t, m, "linePrefix")) : (t.enter("chunkString", {
      contentType: "string"
    }), d(v));
  }
  function d(v) {
    return v === l || v === null || j(v) ? (t.exit("chunkString"), m(v)) : (t.consume(v), v === 92 ? c : d);
  }
  function c(v) {
    return v === l || v === 92 ? (t.consume(v), d) : d(v);
  }
}
function Ut(t, e) {
  let r;
  return n;
  function n(a) {
    return j(a) ? (t.enter("lineEnding"), t.consume(a), t.exit("lineEnding"), r = !0, n) : re(a) ? te(t, n, r ? "linePrefix" : "lineSuffix")(a) : e(a);
  }
}
const Ki = {
  name: "definition",
  tokenize: el
}, Ji = {
  partial: !0,
  tokenize: tl
};
function el(t, e, r) {
  const n = this;
  let a;
  return i;
  function i(p) {
    return t.enter("definition"), l(p);
  }
  function l(p) {
    return Pn.call(
      n,
      t,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      r,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function s(p) {
    return a = Je(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1)), p === 58 ? (t.enter("definitionMarker"), t.consume(p), t.exit("definitionMarker"), o) : r(p);
  }
  function o(p) {
    return oe(p) ? Ut(t, m)(p) : m(p);
  }
  function m(p) {
    return Rn(
      t,
      d,
      // Note: we don’t need to reset the way `markdown-rs` does.
      r,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function d(p) {
    return t.attempt(Ji, c, c)(p);
  }
  function c(p) {
    return re(p) ? te(t, v, "whitespace")(p) : v(p);
  }
  function v(p) {
    return p === null || j(p) ? (t.exit("definition"), n.parser.defined.push(a), e(p)) : r(p);
  }
}
function tl(t, e, r) {
  return n;
  function n(s) {
    return oe(s) ? Ut(t, a)(s) : r(s);
  }
  function a(s) {
    return Hn(t, i, r, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function i(s) {
    return re(s) ? te(t, l, "whitespace")(s) : l(s);
  }
  function l(s) {
    return s === null || j(s) ? e(s) : r(s);
  }
}
const rl = {
  name: "hardBreakEscape",
  tokenize: nl
};
function nl(t, e, r) {
  return n;
  function n(i) {
    return t.enter("hardBreakEscape"), t.consume(i), a;
  }
  function a(i) {
    return j(i) ? (t.exit("hardBreakEscape"), e(i)) : r(i);
  }
}
const al = {
  name: "headingAtx",
  resolve: il,
  tokenize: ll
};
function il(t, e) {
  let r = t.length - 2, n = 3, a, i;
  return t[n][1].type === "whitespace" && (n += 2), r - 2 > n && t[r][1].type === "whitespace" && (r -= 2), t[r][1].type === "atxHeadingSequence" && (n === r - 1 || r - 4 > n && t[r - 2][1].type === "whitespace") && (r -= n + 1 === r ? 2 : 4), r > n && (a = {
    type: "atxHeadingText",
    start: t[n][1].start,
    end: t[r][1].end
  }, i = {
    type: "chunkText",
    start: t[n][1].start,
    end: t[r][1].end,
    contentType: "text"
  }, He(t, n, r - n + 1, [["enter", a, e], ["enter", i, e], ["exit", i, e], ["exit", a, e]])), t;
}
function ll(t, e, r) {
  let n = 0;
  return a;
  function a(d) {
    return t.enter("atxHeading"), i(d);
  }
  function i(d) {
    return t.enter("atxHeadingSequence"), l(d);
  }
  function l(d) {
    return d === 35 && n++ < 6 ? (t.consume(d), l) : d === null || oe(d) ? (t.exit("atxHeadingSequence"), s(d)) : r(d);
  }
  function s(d) {
    return d === 35 ? (t.enter("atxHeadingSequence"), o(d)) : d === null || j(d) ? (t.exit("atxHeading"), e(d)) : re(d) ? te(t, s, "whitespace")(d) : (t.enter("atxHeadingText"), m(d));
  }
  function o(d) {
    return d === 35 ? (t.consume(d), o) : (t.exit("atxHeadingSequence"), s(d));
  }
  function m(d) {
    return d === null || d === 35 || oe(d) ? (t.exit("atxHeadingText"), s(d)) : (t.consume(d), m);
  }
}
const sl = [
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
], Pr = ["pre", "script", "style", "textarea"], ul = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ml,
  tokenize: cl
}, ol = {
  partial: !0,
  tokenize: dl
}, hl = {
  partial: !0,
  tokenize: fl
};
function ml(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && t[e - 2][1].type === "linePrefix" && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function cl(t, e, r) {
  const n = this;
  let a, i, l, s, o;
  return m;
  function m(A) {
    return d(A);
  }
  function d(A) {
    return t.enter("htmlFlow"), t.enter("htmlFlowData"), t.consume(A), c;
  }
  function c(A) {
    return A === 33 ? (t.consume(A), v) : A === 47 ? (t.consume(A), i = !0, T) : A === 63 ? (t.consume(A), a = 3, n.interrupt ? e : S) : Ee(A) ? (t.consume(A), l = String.fromCharCode(A), B) : r(A);
  }
  function v(A) {
    return A === 45 ? (t.consume(A), a = 2, p) : A === 91 ? (t.consume(A), a = 5, s = 0, w) : Ee(A) ? (t.consume(A), a = 4, n.interrupt ? e : S) : r(A);
  }
  function p(A) {
    return A === 45 ? (t.consume(A), n.interrupt ? e : S) : r(A);
  }
  function w(A) {
    const pe = "CDATA[";
    return A === pe.charCodeAt(s++) ? (t.consume(A), s === pe.length ? n.interrupt ? e : $ : w) : r(A);
  }
  function T(A) {
    return Ee(A) ? (t.consume(A), l = String.fromCharCode(A), B) : r(A);
  }
  function B(A) {
    if (A === null || A === 47 || A === 62 || oe(A)) {
      const pe = A === 47, ke = l.toLowerCase();
      return !pe && !i && Pr.includes(ke) ? (a = 1, n.interrupt ? e(A) : $(A)) : sl.includes(l.toLowerCase()) ? (a = 6, pe ? (t.consume(A), C) : n.interrupt ? e(A) : $(A)) : (a = 7, n.interrupt && !n.parser.lazy[n.now().line] ? r(A) : i ? b(A) : k(A));
    }
    return A === 45 || Ce(A) ? (t.consume(A), l += String.fromCharCode(A), B) : r(A);
  }
  function C(A) {
    return A === 62 ? (t.consume(A), n.interrupt ? e : $) : r(A);
  }
  function b(A) {
    return re(A) ? (t.consume(A), b) : E(A);
  }
  function k(A) {
    return A === 47 ? (t.consume(A), E) : A === 58 || A === 95 || Ee(A) ? (t.consume(A), I) : re(A) ? (t.consume(A), k) : E(A);
  }
  function I(A) {
    return A === 45 || A === 46 || A === 58 || A === 95 || Ce(A) ? (t.consume(A), I) : F(A);
  }
  function F(A) {
    return A === 61 ? (t.consume(A), z) : re(A) ? (t.consume(A), F) : k(A);
  }
  function z(A) {
    return A === null || A === 60 || A === 61 || A === 62 || A === 96 ? r(A) : A === 34 || A === 39 ? (t.consume(A), o = A, N) : re(A) ? (t.consume(A), z) : H(A);
  }
  function N(A) {
    return A === o ? (t.consume(A), o = null, q) : A === null || j(A) ? r(A) : (t.consume(A), N);
  }
  function H(A) {
    return A === null || A === 34 || A === 39 || A === 47 || A === 60 || A === 61 || A === 62 || A === 96 || oe(A) ? F(A) : (t.consume(A), H);
  }
  function q(A) {
    return A === 47 || A === 62 || re(A) ? k(A) : r(A);
  }
  function E(A) {
    return A === 62 ? (t.consume(A), P) : r(A);
  }
  function P(A) {
    return A === null || j(A) ? $(A) : re(A) ? (t.consume(A), P) : r(A);
  }
  function $(A) {
    return A === 45 && a === 2 ? (t.consume(A), se) : A === 60 && a === 1 ? (t.consume(A), ue) : A === 62 && a === 4 ? (t.consume(A), ce) : A === 63 && a === 3 ? (t.consume(A), S) : A === 93 && a === 5 ? (t.consume(A), de) : j(A) && (a === 6 || a === 7) ? (t.exit("htmlFlowData"), t.check(ol, ae, ee)(A)) : A === null || j(A) ? (t.exit("htmlFlowData"), ee(A)) : (t.consume(A), $);
  }
  function ee(A) {
    return t.check(hl, K, ae)(A);
  }
  function K(A) {
    return t.enter("lineEnding"), t.consume(A), t.exit("lineEnding"), _;
  }
  function _(A) {
    return A === null || j(A) ? ee(A) : (t.enter("htmlFlowData"), $(A));
  }
  function se(A) {
    return A === 45 ? (t.consume(A), S) : $(A);
  }
  function ue(A) {
    return A === 47 ? (t.consume(A), l = "", ne) : $(A);
  }
  function ne(A) {
    if (A === 62) {
      const pe = l.toLowerCase();
      return Pr.includes(pe) ? (t.consume(A), ce) : $(A);
    }
    return Ee(A) && l.length < 8 ? (t.consume(A), l += String.fromCharCode(A), ne) : $(A);
  }
  function de(A) {
    return A === 93 ? (t.consume(A), S) : $(A);
  }
  function S(A) {
    return A === 62 ? (t.consume(A), ce) : A === 45 && a === 2 ? (t.consume(A), S) : $(A);
  }
  function ce(A) {
    return A === null || j(A) ? (t.exit("htmlFlowData"), ae(A)) : (t.consume(A), ce);
  }
  function ae(A) {
    return t.exit("htmlFlow"), e(A);
  }
}
function fl(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return j(l) ? (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), i) : r(l);
  }
  function i(l) {
    return n.parser.lazy[n.now().line] ? r(l) : e(l);
  }
}
function dl(t, e, r) {
  return n;
  function n(a) {
    return t.enter("lineEnding"), t.consume(a), t.exit("lineEnding"), t.attempt(Xt, e, r);
  }
}
const pl = {
  name: "htmlText",
  tokenize: gl
};
function gl(t, e, r) {
  const n = this;
  let a, i, l;
  return s;
  function s(S) {
    return t.enter("htmlText"), t.enter("htmlTextData"), t.consume(S), o;
  }
  function o(S) {
    return S === 33 ? (t.consume(S), m) : S === 47 ? (t.consume(S), F) : S === 63 ? (t.consume(S), k) : Ee(S) ? (t.consume(S), H) : r(S);
  }
  function m(S) {
    return S === 45 ? (t.consume(S), d) : S === 91 ? (t.consume(S), i = 0, w) : Ee(S) ? (t.consume(S), b) : r(S);
  }
  function d(S) {
    return S === 45 ? (t.consume(S), p) : r(S);
  }
  function c(S) {
    return S === null ? r(S) : S === 45 ? (t.consume(S), v) : j(S) ? (l = c, ue(S)) : (t.consume(S), c);
  }
  function v(S) {
    return S === 45 ? (t.consume(S), p) : c(S);
  }
  function p(S) {
    return S === 62 ? se(S) : S === 45 ? v(S) : c(S);
  }
  function w(S) {
    const ce = "CDATA[";
    return S === ce.charCodeAt(i++) ? (t.consume(S), i === ce.length ? T : w) : r(S);
  }
  function T(S) {
    return S === null ? r(S) : S === 93 ? (t.consume(S), B) : j(S) ? (l = T, ue(S)) : (t.consume(S), T);
  }
  function B(S) {
    return S === 93 ? (t.consume(S), C) : T(S);
  }
  function C(S) {
    return S === 62 ? se(S) : S === 93 ? (t.consume(S), C) : T(S);
  }
  function b(S) {
    return S === null || S === 62 ? se(S) : j(S) ? (l = b, ue(S)) : (t.consume(S), b);
  }
  function k(S) {
    return S === null ? r(S) : S === 63 ? (t.consume(S), I) : j(S) ? (l = k, ue(S)) : (t.consume(S), k);
  }
  function I(S) {
    return S === 62 ? se(S) : k(S);
  }
  function F(S) {
    return Ee(S) ? (t.consume(S), z) : r(S);
  }
  function z(S) {
    return S === 45 || Ce(S) ? (t.consume(S), z) : N(S);
  }
  function N(S) {
    return j(S) ? (l = N, ue(S)) : re(S) ? (t.consume(S), N) : se(S);
  }
  function H(S) {
    return S === 45 || Ce(S) ? (t.consume(S), H) : S === 47 || S === 62 || oe(S) ? q(S) : r(S);
  }
  function q(S) {
    return S === 47 ? (t.consume(S), se) : S === 58 || S === 95 || Ee(S) ? (t.consume(S), E) : j(S) ? (l = q, ue(S)) : re(S) ? (t.consume(S), q) : se(S);
  }
  function E(S) {
    return S === 45 || S === 46 || S === 58 || S === 95 || Ce(S) ? (t.consume(S), E) : P(S);
  }
  function P(S) {
    return S === 61 ? (t.consume(S), $) : j(S) ? (l = P, ue(S)) : re(S) ? (t.consume(S), P) : q(S);
  }
  function $(S) {
    return S === null || S === 60 || S === 61 || S === 62 || S === 96 ? r(S) : S === 34 || S === 39 ? (t.consume(S), a = S, ee) : j(S) ? (l = $, ue(S)) : re(S) ? (t.consume(S), $) : (t.consume(S), K);
  }
  function ee(S) {
    return S === a ? (t.consume(S), a = void 0, _) : S === null ? r(S) : j(S) ? (l = ee, ue(S)) : (t.consume(S), ee);
  }
  function K(S) {
    return S === null || S === 34 || S === 39 || S === 60 || S === 61 || S === 96 ? r(S) : S === 47 || S === 62 || oe(S) ? q(S) : (t.consume(S), K);
  }
  function _(S) {
    return S === 47 || S === 62 || oe(S) ? q(S) : r(S);
  }
  function se(S) {
    return S === 62 ? (t.consume(S), t.exit("htmlTextData"), t.exit("htmlText"), e) : r(S);
  }
  function ue(S) {
    return t.exit("htmlTextData"), t.enter("lineEnding"), t.consume(S), t.exit("lineEnding"), ne;
  }
  function ne(S) {
    return re(S) ? te(t, de, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(S) : de(S);
  }
  function de(S) {
    return t.enter("htmlTextData"), l(S);
  }
}
const lr = {
  name: "labelEnd",
  resolveAll: yl,
  resolveTo: wl,
  tokenize: kl
}, vl = {
  tokenize: Sl
}, bl = {
  tokenize: zl
}, xl = {
  tokenize: Al
};
function yl(t) {
  let e = -1;
  const r = [];
  for (; ++e < t.length; ) {
    const n = t[e][1];
    if (r.push(t[e]), n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") {
      const a = n.type === "labelImage" ? 4 : 2;
      n.type = "data", e += a;
    }
  }
  return t.length !== r.length && He(t, 0, t.length, r), t;
}
function wl(t, e) {
  let r = t.length, n = 0, a, i, l, s;
  for (; r--; )
    if (a = t[r][1], i) {
      if (a.type === "link" || a.type === "labelLink" && a._inactive)
        break;
      t[r][0] === "enter" && a.type === "labelLink" && (a._inactive = !0);
    } else if (l) {
      if (t[r][0] === "enter" && (a.type === "labelImage" || a.type === "labelLink") && !a._balanced && (i = r, a.type !== "labelLink")) {
        n = 2;
        break;
      }
    } else a.type === "labelEnd" && (l = r);
  const o = {
    type: t[i][1].type === "labelLink" ? "link" : "image",
    start: {
      ...t[i][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  }, m = {
    type: "label",
    start: {
      ...t[i][1].start
    },
    end: {
      ...t[l][1].end
    }
  }, d = {
    type: "labelText",
    start: {
      ...t[i + n + 2][1].end
    },
    end: {
      ...t[l - 2][1].start
    }
  };
  return s = [["enter", o, e], ["enter", m, e]], s = Te(s, t.slice(i + 1, i + n + 3)), s = Te(s, [["enter", d, e]]), s = Te(s, b0(e.parser.constructs.insideSpan.null, t.slice(i + n + 4, l - 3), e)), s = Te(s, [["exit", d, e], t[l - 2], t[l - 1], ["exit", m, e]]), s = Te(s, t.slice(l + 1)), s = Te(s, [["exit", o, e]]), He(t, i, t.length, s), t;
}
function kl(t, e, r) {
  const n = this;
  let a = n.events.length, i, l;
  for (; a--; )
    if ((n.events[a][1].type === "labelImage" || n.events[a][1].type === "labelLink") && !n.events[a][1]._balanced) {
      i = n.events[a][1];
      break;
    }
  return s;
  function s(v) {
    return i ? i._inactive ? c(v) : (l = n.parser.defined.includes(Je(n.sliceSerialize({
      start: i.end,
      end: n.now()
    }))), t.enter("labelEnd"), t.enter("labelMarker"), t.consume(v), t.exit("labelMarker"), t.exit("labelEnd"), o) : r(v);
  }
  function o(v) {
    return v === 40 ? t.attempt(vl, d, l ? d : c)(v) : v === 91 ? t.attempt(bl, d, l ? m : c)(v) : l ? d(v) : c(v);
  }
  function m(v) {
    return t.attempt(xl, d, c)(v);
  }
  function d(v) {
    return e(v);
  }
  function c(v) {
    return i._balanced = !0, r(v);
  }
}
function Sl(t, e, r) {
  return n;
  function n(c) {
    return t.enter("resource"), t.enter("resourceMarker"), t.consume(c), t.exit("resourceMarker"), a;
  }
  function a(c) {
    return oe(c) ? Ut(t, i)(c) : i(c);
  }
  function i(c) {
    return c === 41 ? d(c) : Rn(t, l, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function l(c) {
    return oe(c) ? Ut(t, o)(c) : d(c);
  }
  function s(c) {
    return r(c);
  }
  function o(c) {
    return c === 34 || c === 39 || c === 40 ? Hn(t, m, r, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : d(c);
  }
  function m(c) {
    return oe(c) ? Ut(t, d)(c) : d(c);
  }
  function d(c) {
    return c === 41 ? (t.enter("resourceMarker"), t.consume(c), t.exit("resourceMarker"), t.exit("resource"), e) : r(c);
  }
}
function zl(t, e, r) {
  const n = this;
  return a;
  function a(s) {
    return Pn.call(n, t, i, l, "reference", "referenceMarker", "referenceString")(s);
  }
  function i(s) {
    return n.parser.defined.includes(Je(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1))) ? e(s) : r(s);
  }
  function l(s) {
    return r(s);
  }
}
function Al(t, e, r) {
  return n;
  function n(i) {
    return t.enter("reference"), t.enter("referenceMarker"), t.consume(i), t.exit("referenceMarker"), a;
  }
  function a(i) {
    return i === 93 ? (t.enter("referenceMarker"), t.consume(i), t.exit("referenceMarker"), t.exit("reference"), e) : r(i);
  }
}
const Ml = {
  name: "labelStartImage",
  resolveAll: lr.resolveAll,
  tokenize: Tl
};
function Tl(t, e, r) {
  const n = this;
  return a;
  function a(s) {
    return t.enter("labelImage"), t.enter("labelImageMarker"), t.consume(s), t.exit("labelImageMarker"), i;
  }
  function i(s) {
    return s === 91 ? (t.enter("labelMarker"), t.consume(s), t.exit("labelMarker"), t.exit("labelImage"), l) : r(s);
  }
  function l(s) {
    return s === 94 && "_hiddenFootnoteSupport" in n.parser.constructs ? r(s) : e(s);
  }
}
const Cl = {
  name: "labelStartLink",
  resolveAll: lr.resolveAll,
  tokenize: Fl
};
function Fl(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return t.enter("labelLink"), t.enter("labelMarker"), t.consume(l), t.exit("labelMarker"), t.exit("labelLink"), i;
  }
  function i(l) {
    return l === 94 && "_hiddenFootnoteSupport" in n.parser.constructs ? r(l) : e(l);
  }
}
const C0 = {
  name: "lineEnding",
  tokenize: Dl
};
function Dl(t, e) {
  return r;
  function r(n) {
    return t.enter("lineEnding"), t.consume(n), t.exit("lineEnding"), te(t, e, "linePrefix");
  }
}
const o0 = {
  name: "thematicBreak",
  tokenize: El
};
function El(t, e, r) {
  let n = 0, a;
  return i;
  function i(m) {
    return t.enter("thematicBreak"), l(m);
  }
  function l(m) {
    return a = m, s(m);
  }
  function s(m) {
    return m === a ? (t.enter("thematicBreakSequence"), o(m)) : n >= 3 && (m === null || j(m)) ? (t.exit("thematicBreak"), e(m)) : r(m);
  }
  function o(m) {
    return m === a ? (t.consume(m), n++, o) : (t.exit("thematicBreakSequence"), re(m) ? te(t, s, "whitespace")(m) : s(m));
  }
}
const qe = {
  continuation: {
    tokenize: ql
  },
  exit: Ol,
  name: "list",
  tokenize: Nl
}, Il = {
  partial: !0,
  tokenize: Rl
}, Bl = {
  partial: !0,
  tokenize: Ll
};
function Nl(t, e, r) {
  const n = this, a = n.events[n.events.length - 1];
  let i = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, l = 0;
  return s;
  function s(p) {
    const w = n.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !n.containerState.marker || p === n.containerState.marker : Z0(p)) {
      if (n.containerState.type || (n.containerState.type = w, t.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return t.enter("listItemPrefix"), p === 42 || p === 45 ? t.check(o0, r, m)(p) : m(p);
      if (!n.interrupt || p === 49)
        return t.enter("listItemPrefix"), t.enter("listItemValue"), o(p);
    }
    return r(p);
  }
  function o(p) {
    return Z0(p) && ++l < 10 ? (t.consume(p), o) : (!n.interrupt || l < 2) && (n.containerState.marker ? p === n.containerState.marker : p === 41 || p === 46) ? (t.exit("listItemValue"), m(p)) : r(p);
  }
  function m(p) {
    return t.enter("listItemMarker"), t.consume(p), t.exit("listItemMarker"), n.containerState.marker = n.containerState.marker || p, t.check(
      Xt,
      // Can’t be empty when interrupting.
      n.interrupt ? r : d,
      t.attempt(Il, v, c)
    );
  }
  function d(p) {
    return n.containerState.initialBlankLine = !0, i++, v(p);
  }
  function c(p) {
    return re(p) ? (t.enter("listItemPrefixWhitespace"), t.consume(p), t.exit("listItemPrefixWhitespace"), v) : r(p);
  }
  function v(p) {
    return n.containerState.size = i + n.sliceSerialize(t.exit("listItemPrefix"), !0).length, e(p);
  }
}
function ql(t, e, r) {
  const n = this;
  return n.containerState._closeFlow = void 0, t.check(Xt, a, i);
  function a(s) {
    return n.containerState.furtherBlankLines = n.containerState.furtherBlankLines || n.containerState.initialBlankLine, te(t, e, "listItemIndent", n.containerState.size + 1)(s);
  }
  function i(s) {
    return n.containerState.furtherBlankLines || !re(s) ? (n.containerState.furtherBlankLines = void 0, n.containerState.initialBlankLine = void 0, l(s)) : (n.containerState.furtherBlankLines = void 0, n.containerState.initialBlankLine = void 0, t.attempt(Bl, e, l)(s));
  }
  function l(s) {
    return n.containerState._closeFlow = !0, n.interrupt = void 0, te(t, t.attempt(qe, e, r), "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function Ll(t, e, r) {
  const n = this;
  return te(t, a, "listItemIndent", n.containerState.size + 1);
  function a(i) {
    const l = n.events[n.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === n.containerState.size ? e(i) : r(i);
  }
}
function Ol(t) {
  t.exit(this.containerState.type);
}
function Rl(t, e, r) {
  const n = this;
  return te(t, a, "listItemPrefixWhitespace", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function a(i) {
    const l = n.events[n.events.length - 1];
    return !re(i) && l && l[1].type === "listItemPrefixWhitespace" ? e(i) : r(i);
  }
}
const Hr = {
  name: "setextUnderline",
  resolveTo: Pl,
  tokenize: Hl
};
function Pl(t, e) {
  let r = t.length, n, a, i;
  for (; r--; )
    if (t[r][0] === "enter") {
      if (t[r][1].type === "content") {
        n = r;
        break;
      }
      t[r][1].type === "paragraph" && (a = r);
    } else
      t[r][1].type === "content" && t.splice(r, 1), !i && t[r][1].type === "definition" && (i = r);
  const l = {
    type: "setextHeading",
    start: {
      ...t[n][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  };
  return t[a][1].type = "setextHeadingText", i ? (t.splice(a, 0, ["enter", l, e]), t.splice(i + 1, 0, ["exit", t[n][1], e]), t[n][1].end = {
    ...t[i][1].end
  }) : t[n][1] = l, t.push(["exit", l, e]), t;
}
function Hl(t, e, r) {
  const n = this;
  let a;
  return i;
  function i(m) {
    let d = n.events.length, c;
    for (; d--; )
      if (n.events[d][1].type !== "lineEnding" && n.events[d][1].type !== "linePrefix" && n.events[d][1].type !== "content") {
        c = n.events[d][1].type === "paragraph";
        break;
      }
    return !n.parser.lazy[n.now().line] && (n.interrupt || c) ? (t.enter("setextHeadingLine"), a = m, l(m)) : r(m);
  }
  function l(m) {
    return t.enter("setextHeadingLineSequence"), s(m);
  }
  function s(m) {
    return m === a ? (t.consume(m), s) : (t.exit("setextHeadingLineSequence"), re(m) ? te(t, o, "lineSuffix")(m) : o(m));
  }
  function o(m) {
    return m === null || j(m) ? (t.exit("setextHeadingLine"), e(m)) : r(m);
  }
}
const Vl = {
  tokenize: $l
};
function $l(t) {
  const e = this, r = t.attempt(
    // Try to parse a blank line.
    Xt,
    n,
    // Try to parse initial flow (essentially, only code).
    t.attempt(this.parser.constructs.flowInitial, a, te(t, t.attempt(this.parser.constructs.flow, a, t.attempt(Yi, a)), "linePrefix"))
  );
  return r;
  function n(i) {
    if (i === null) {
      t.consume(i);
      return;
    }
    return t.enter("lineEndingBlank"), t.consume(i), t.exit("lineEndingBlank"), e.currentConstruct = void 0, r;
  }
  function a(i) {
    if (i === null) {
      t.consume(i);
      return;
    }
    return t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), e.currentConstruct = void 0, r;
  }
}
const Gl = {
  resolveAll: $n()
}, Ul = Vn("string"), Wl = Vn("text");
function Vn(t) {
  return {
    resolveAll: $n(t === "text" ? jl : void 0),
    tokenize: e
  };
  function e(r) {
    const n = this, a = this.parser.constructs[t], i = r.attempt(a, l, s);
    return l;
    function l(d) {
      return m(d) ? i(d) : s(d);
    }
    function s(d) {
      if (d === null) {
        r.consume(d);
        return;
      }
      return r.enter("data"), r.consume(d), o;
    }
    function o(d) {
      return m(d) ? (r.exit("data"), i(d)) : (r.consume(d), o);
    }
    function m(d) {
      if (d === null)
        return !0;
      const c = a[d];
      let v = -1;
      if (c)
        for (; ++v < c.length; ) {
          const p = c[v];
          if (!p.previous || p.previous.call(n, n.previous))
            return !0;
        }
      return !1;
    }
  }
}
function $n(t) {
  return e;
  function e(r, n) {
    let a = -1, i;
    for (; ++a <= r.length; )
      i === void 0 ? r[a] && r[a][1].type === "data" && (i = a, a++) : (!r[a] || r[a][1].type !== "data") && (a !== i + 2 && (r[i][1].end = r[a - 1][1].end, r.splice(i + 2, a - i - 2), a = i + 2), i = void 0);
    return t ? t(r, n) : r;
  }
}
function jl(t, e) {
  let r = 0;
  for (; ++r <= t.length; )
    if ((r === t.length || t[r][1].type === "lineEnding") && t[r - 1][1].type === "data") {
      const n = t[r - 1][1], a = e.sliceStream(n);
      let i = a.length, l = -1, s = 0, o;
      for (; i--; ) {
        const m = a[i];
        if (typeof m == "string") {
          for (l = m.length; m.charCodeAt(l - 1) === 32; )
            s++, l--;
          if (l) break;
          l = -1;
        } else if (m === -2)
          o = !0, s++;
        else if (m !== -1) {
          i++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && r === t.length && (s = 0), s) {
        const m = {
          type: r === t.length || o || s < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: i ? l : n.start._bufferIndex + l,
            _index: n.start._index + i,
            line: n.end.line,
            column: n.end.column - s,
            offset: n.end.offset - s
          },
          end: {
            ...n.end
          }
        };
        n.end = {
          ...m.start
        }, n.start.offset === n.end.offset ? Object.assign(n, m) : (t.splice(r, 0, ["enter", m, e], ["exit", m, e]), r += 2);
      }
      r++;
    }
  return t;
}
const Yl = {
  42: qe,
  43: qe,
  45: qe,
  48: qe,
  49: qe,
  50: qe,
  51: qe,
  52: qe,
  53: qe,
  54: qe,
  55: qe,
  56: qe,
  57: qe,
  62: Nn
}, Xl = {
  91: Ki
}, Zl = {
  [-2]: T0,
  [-1]: T0,
  32: T0
}, Ql = {
  35: al,
  42: o0,
  45: [Hr, o0],
  60: ul,
  61: Hr,
  95: o0,
  96: Rr,
  126: Rr
}, _l = {
  38: Ln,
  92: qn
}, Kl = {
  [-5]: C0,
  [-4]: C0,
  [-3]: C0,
  33: Ml,
  38: Ln,
  42: Q0,
  60: [Ci, pl],
  91: Cl,
  92: [rl, qn],
  93: lr,
  95: Q0,
  96: Vi
}, Jl = {
  null: [Q0, Gl]
}, e1 = {
  null: [42, 95]
}, t1 = {
  null: []
}, r1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: e1,
  contentInitial: Xl,
  disable: t1,
  document: Yl,
  flow: Ql,
  flowInitial: Zl,
  insideSpan: Jl,
  string: _l,
  text: Kl
}, Symbol.toStringTag, { value: "Module" }));
function n1(t, e, r) {
  let n = {
    _bufferIndex: -1,
    _index: 0,
    line: r && r.line || 1,
    column: r && r.column || 1,
    offset: r && r.offset || 0
  };
  const a = {}, i = [];
  let l = [], s = [];
  const o = {
    attempt: N(F),
    check: N(z),
    consume: b,
    enter: k,
    exit: I,
    interrupt: N(z, {
      interrupt: !0
    })
  }, m = {
    code: null,
    containerState: {},
    defineSkip: T,
    events: [],
    now: w,
    parser: t,
    previous: null,
    sliceSerialize: v,
    sliceStream: p,
    write: c
  };
  let d = e.tokenize.call(m, o);
  return e.resolveAll && i.push(e), m;
  function c(P) {
    return l = Te(l, P), B(), l[l.length - 1] !== null ? [] : (H(e, 0), m.events = b0(i, m.events, m), m.events);
  }
  function v(P, $) {
    return i1(p(P), $);
  }
  function p(P) {
    return a1(l, P);
  }
  function w() {
    const {
      _bufferIndex: P,
      _index: $,
      line: ee,
      column: K,
      offset: _
    } = n;
    return {
      _bufferIndex: P,
      _index: $,
      line: ee,
      column: K,
      offset: _
    };
  }
  function T(P) {
    a[P.line] = P.column, E();
  }
  function B() {
    let P;
    for (; n._index < l.length; ) {
      const $ = l[n._index];
      if (typeof $ == "string")
        for (P = n._index, n._bufferIndex < 0 && (n._bufferIndex = 0); n._index === P && n._bufferIndex < $.length; )
          C($.charCodeAt(n._bufferIndex));
      else
        C($);
    }
  }
  function C(P) {
    d = d(P);
  }
  function b(P) {
    j(P) ? (n.line++, n.column = 1, n.offset += P === -3 ? 2 : 1, E()) : P !== -1 && (n.column++, n.offset++), n._bufferIndex < 0 ? n._index++ : (n._bufferIndex++, n._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[n._index].length && (n._bufferIndex = -1, n._index++)), m.previous = P;
  }
  function k(P, $) {
    const ee = $ || {};
    return ee.type = P, ee.start = w(), m.events.push(["enter", ee, m]), s.push(ee), ee;
  }
  function I(P) {
    const $ = s.pop();
    return $.end = w(), m.events.push(["exit", $, m]), $;
  }
  function F(P, $) {
    H(P, $.from);
  }
  function z(P, $) {
    $.restore();
  }
  function N(P, $) {
    return ee;
    function ee(K, _, se) {
      let ue, ne, de, S;
      return Array.isArray(K) ? (
        /* c8 ignore next 1 */
        ae(K)
      ) : "tokenize" in K ? (
        // Looks like a construct.
        ae([
          /** @type {Construct} */
          K
        ])
      ) : ce(K);
      function ce(fe) {
        return Ae;
        function Ae(Se) {
          const Ne = Se !== null && fe[Se], Fe = Se !== null && fe.null, Xe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ne) ? Ne : Ne ? [Ne] : [],
            ...Array.isArray(Fe) ? Fe : Fe ? [Fe] : []
          ];
          return ae(Xe)(Se);
        }
      }
      function ae(fe) {
        return ue = fe, ne = 0, fe.length === 0 ? se : A(fe[ne]);
      }
      function A(fe) {
        return Ae;
        function Ae(Se) {
          return S = q(), de = fe, fe.partial || (m.currentConstruct = fe), fe.name && m.parser.constructs.disable.null.includes(fe.name) ? ke() : fe.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            $ ? Object.assign(Object.create(m), $) : m,
            o,
            pe,
            ke
          )(Se);
        }
      }
      function pe(fe) {
        return P(de, S), _;
      }
      function ke(fe) {
        return S.restore(), ++ne < ue.length ? A(ue[ne]) : se;
      }
    }
  }
  function H(P, $) {
    P.resolveAll && !i.includes(P) && i.push(P), P.resolve && He(m.events, $, m.events.length - $, P.resolve(m.events.slice($), m)), P.resolveTo && (m.events = P.resolveTo(m.events, m));
  }
  function q() {
    const P = w(), $ = m.previous, ee = m.currentConstruct, K = m.events.length, _ = Array.from(s);
    return {
      from: K,
      restore: se
    };
    function se() {
      n = P, m.previous = $, m.currentConstruct = ee, m.events.length = K, s = _, E();
    }
  }
  function E() {
    n.line in a && n.column < 2 && (n.column = a[n.line], n.offset += a[n.line] - 1);
  }
}
function a1(t, e) {
  const r = e.start._index, n = e.start._bufferIndex, a = e.end._index, i = e.end._bufferIndex;
  let l;
  if (r === a)
    l = [t[r].slice(n, i)];
  else {
    if (l = t.slice(r, a), n > -1) {
      const s = l[0];
      typeof s == "string" ? l[0] = s.slice(n) : l.shift();
    }
    i > 0 && l.push(t[a].slice(0, i));
  }
  return l;
}
function i1(t, e) {
  let r = -1;
  const n = [];
  let a;
  for (; ++r < t.length; ) {
    const i = t[r];
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
        l = e ? " " : "	";
        break;
      }
      case -1: {
        if (!e && a) continue;
        l = " ";
        break;
      }
      default:
        l = String.fromCharCode(i);
    }
    a = i === -2, n.push(l);
  }
  return n.join("");
}
function l1(t) {
  const n = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      En([r1, ...(t || {}).extensions || []])
    ),
    content: a(wi),
    defined: [],
    document: a(Si),
    flow: a(Vl),
    lazy: {},
    string: a(Ul),
    text: a(Wl)
  };
  return n;
  function a(i) {
    return l;
    function l(s) {
      return n1(n, i, s);
    }
  }
}
function s1(t) {
  for (; !On(t); )
    ;
  return t;
}
const Vr = /[\0\t\n\r]/g;
function u1() {
  let t = 1, e = "", r = !0, n;
  return a;
  function a(i, l, s) {
    const o = [];
    let m, d, c, v, p;
    for (i = e + (typeof i == "string" ? i.toString() : new TextDecoder(l || void 0).decode(i)), c = 0, e = "", r && (i.charCodeAt(0) === 65279 && c++, r = void 0); c < i.length; ) {
      if (Vr.lastIndex = c, m = Vr.exec(i), v = m && m.index !== void 0 ? m.index : i.length, p = i.charCodeAt(v), !m) {
        e = i.slice(c);
        break;
      }
      if (p === 10 && c === v && n)
        o.push(-3), n = void 0;
      else
        switch (n && (o.push(-5), n = void 0), c < v && (o.push(i.slice(c, v)), t += v - c), p) {
          case 0: {
            o.push(65533), t++;
            break;
          }
          case 9: {
            for (d = Math.ceil(t / 4) * 4, o.push(-2); t++ < d; ) o.push(-1);
            break;
          }
          case 10: {
            o.push(-4), t = 1;
            break;
          }
          default:
            n = !0, t = 1;
        }
      c = v + 1;
    }
    return s && (n && o.push(-5), e && o.push(e), o.push(null)), o;
  }
}
function o1(t, e, r) {
  return typeof e != "string" && (r = e, e = void 0), yi(r)(s1(l1(r).document().write(u1()(t, e, !0))));
}
const h1 = {
  tokenize: g1,
  partial: !0
}, Gn = {
  tokenize: v1,
  partial: !0
}, Un = {
  tokenize: b1,
  partial: !0
}, Wn = {
  tokenize: x1,
  partial: !0
}, m1 = {
  tokenize: y1,
  partial: !0
}, jn = {
  name: "wwwAutolink",
  tokenize: d1,
  previous: Xn
}, Yn = {
  name: "protocolAutolink",
  tokenize: p1,
  previous: Zn
}, ct = {
  name: "emailAutolink",
  tokenize: f1,
  previous: Qn
}, et = {};
function c1() {
  return {
    text: et
  };
}
let St = 48;
for (; St < 123; )
  et[St] = ct, St++, St === 58 ? St = 65 : St === 91 && (St = 97);
et[43] = ct;
et[45] = ct;
et[46] = ct;
et[95] = ct;
et[72] = [ct, Yn];
et[104] = [ct, Yn];
et[87] = [ct, jn];
et[119] = [ct, jn];
function f1(t, e, r) {
  const n = this;
  let a, i;
  return l;
  function l(c) {
    return !_0(c) || !Qn.call(n, n.previous) || sr(n.events) ? r(c) : (t.enter("literalAutolink"), t.enter("literalAutolinkEmail"), s(c));
  }
  function s(c) {
    return _0(c) ? (t.consume(c), s) : c === 64 ? (t.consume(c), o) : r(c);
  }
  function o(c) {
    return c === 46 ? t.check(m1, d, m)(c) : c === 45 || c === 95 || Ce(c) ? (i = !0, t.consume(c), o) : d(c);
  }
  function m(c) {
    return t.consume(c), a = !0, o;
  }
  function d(c) {
    return i && a && Ee(n.previous) ? (t.exit("literalAutolinkEmail"), t.exit("literalAutolink"), e(c)) : r(c);
  }
}
function d1(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return l !== 87 && l !== 119 || !Xn.call(n, n.previous) || sr(n.events) ? r(l) : (t.enter("literalAutolink"), t.enter("literalAutolinkWww"), t.check(h1, t.attempt(Gn, t.attempt(Un, i), r), r)(l));
  }
  function i(l) {
    return t.exit("literalAutolinkWww"), t.exit("literalAutolink"), e(l);
  }
}
function p1(t, e, r) {
  const n = this;
  let a = "", i = !1;
  return l;
  function l(c) {
    return (c === 72 || c === 104) && Zn.call(n, n.previous) && !sr(n.events) ? (t.enter("literalAutolink"), t.enter("literalAutolinkHttp"), a += String.fromCodePoint(c), t.consume(c), s) : r(c);
  }
  function s(c) {
    if (Ee(c) && a.length < 5)
      return a += String.fromCodePoint(c), t.consume(c), s;
    if (c === 58) {
      const v = a.toLowerCase();
      if (v === "http" || v === "https")
        return t.consume(c), o;
    }
    return r(c);
  }
  function o(c) {
    return c === 47 ? (t.consume(c), i ? m : (i = !0, o)) : r(c);
  }
  function m(c) {
    return c === null || m0(c) || oe(c) || Nt(c) || ir(c) ? r(c) : t.attempt(Gn, t.attempt(Un, d), r)(c);
  }
  function d(c) {
    return t.exit("literalAutolinkHttp"), t.exit("literalAutolink"), e(c);
  }
}
function g1(t, e, r) {
  let n = 0;
  return a;
  function a(l) {
    return (l === 87 || l === 119) && n < 3 ? (n++, t.consume(l), a) : l === 46 && n === 3 ? (t.consume(l), i) : r(l);
  }
  function i(l) {
    return l === null ? r(l) : e(l);
  }
}
function v1(t, e, r) {
  let n, a, i;
  return l;
  function l(m) {
    return m === 46 || m === 95 ? t.check(Wn, o, s)(m) : m === null || oe(m) || Nt(m) || m !== 45 && ir(m) ? o(m) : (i = !0, t.consume(m), l);
  }
  function s(m) {
    return m === 95 ? n = !0 : (a = n, n = void 0), t.consume(m), l;
  }
  function o(m) {
    return a || n || !i ? r(m) : e(m);
  }
}
function b1(t, e) {
  let r = 0, n = 0;
  return a;
  function a(l) {
    return l === 40 ? (r++, t.consume(l), a) : l === 41 && n < r ? i(l) : l === 33 || l === 34 || l === 38 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 60 || l === 63 || l === 93 || l === 95 || l === 126 ? t.check(Wn, e, i)(l) : l === null || oe(l) || Nt(l) ? e(l) : (t.consume(l), a);
  }
  function i(l) {
    return l === 41 && n++, t.consume(l), a;
  }
}
function x1(t, e, r) {
  return n;
  function n(s) {
    return s === 33 || s === 34 || s === 39 || s === 41 || s === 42 || s === 44 || s === 46 || s === 58 || s === 59 || s === 63 || s === 95 || s === 126 ? (t.consume(s), n) : s === 38 ? (t.consume(s), i) : s === 93 ? (t.consume(s), a) : (
      // `<` is an end.
      s === 60 || // So is whitespace.
      s === null || oe(s) || Nt(s) ? e(s) : r(s)
    );
  }
  function a(s) {
    return s === null || s === 40 || s === 91 || oe(s) || Nt(s) ? e(s) : n(s);
  }
  function i(s) {
    return Ee(s) ? l(s) : r(s);
  }
  function l(s) {
    return s === 59 ? (t.consume(s), n) : Ee(s) ? (t.consume(s), l) : r(s);
  }
}
function y1(t, e, r) {
  return n;
  function n(i) {
    return t.consume(i), a;
  }
  function a(i) {
    return Ce(i) ? r(i) : e(i);
  }
}
function Xn(t) {
  return t === null || t === 40 || t === 42 || t === 95 || t === 91 || t === 93 || t === 126 || oe(t);
}
function Zn(t) {
  return !Ee(t);
}
function Qn(t) {
  return !(t === 47 || _0(t));
}
function _0(t) {
  return t === 43 || t === 45 || t === 46 || t === 95 || Ce(t);
}
function sr(t) {
  let e = t.length, r = !1;
  for (; e--; ) {
    const n = t[e][1];
    if ((n.type === "labelLink" || n.type === "labelImage") && !n._balanced) {
      r = !0;
      break;
    }
    if (n._gfmAutolinkLiteralWalkedInto) {
      r = !1;
      break;
    }
  }
  return t.length > 0 && !r && (t[t.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), r;
}
function w1() {
  return {
    exit: {
      literalAutolinkEmail: S1,
      literalAutolinkHttp: z1,
      literalAutolinkWww: k1
    }
  };
}
function k1(t) {
  ur.call(this, t, "http://");
}
function S1(t) {
  ur.call(this, t, "mailto:");
}
function z1(t) {
  ur.call(this, t);
}
function ur(t, e) {
  const r = this.sliceSerialize(t);
  this.tag('<a href="' + Mt((e || "") + r) + '">'), this.raw(this.encode(r)), this.tag("</a>");
}
const A1 = {
  tokenize: B1,
  partial: !0
};
function M1() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: D1,
        continuation: {
          tokenize: E1
        },
        exit: I1
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: F1
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: T1,
        resolveTo: C1
      }
    }
  };
}
function T1(t, e, r) {
  const n = this;
  let a = n.events.length;
  const i = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []);
  let l;
  for (; a--; ) {
    const o = n.events[a][1];
    if (o.type === "labelImage") {
      l = o;
      break;
    }
    if (o.type === "gfmFootnoteCall" || o.type === "labelLink" || o.type === "label" || o.type === "image" || o.type === "link")
      break;
  }
  return s;
  function s(o) {
    if (!l || !l._balanced)
      return r(o);
    const m = Je(n.sliceSerialize({
      start: l.end,
      end: n.now()
    }));
    return m.codePointAt(0) !== 94 || !i.includes(m.slice(1)) ? r(o) : (t.enter("gfmFootnoteCallLabelMarker"), t.consume(o), t.exit("gfmFootnoteCallLabelMarker"), e(o));
  }
}
function C1(t, e) {
  let r = t.length;
  for (; r--; )
    if (t[r][1].type === "labelImage" && t[r][0] === "enter") {
      t[r][1];
      break;
    }
  t[r + 1][1].type = "data", t[r + 3][1].type = "gfmFootnoteCallLabelMarker";
  const n = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, t[r + 3][1].start),
    end: Object.assign({}, t[t.length - 1][1].end)
  }, a = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, t[r + 3][1].end),
    end: Object.assign({}, t[r + 3][1].end)
  };
  a.end.column++, a.end.offset++, a.end._bufferIndex++;
  const i = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, a.end),
    end: Object.assign({}, t[t.length - 1][1].start)
  }, l = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, i.start),
    end: Object.assign({}, i.end)
  }, s = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    t[r + 1],
    t[r + 2],
    ["enter", n, e],
    // The `[`
    t[r + 3],
    t[r + 4],
    // The `^`.
    ["enter", a, e],
    ["exit", a, e],
    // Everything in between.
    ["enter", i, e],
    ["enter", l, e],
    ["exit", l, e],
    ["exit", i, e],
    // The ending (`]`, properly parsed and labelled).
    t[t.length - 2],
    t[t.length - 1],
    ["exit", n, e]
  ];
  return t.splice(r, t.length - r + 1, ...s), t;
}
function F1(t, e, r) {
  const n = this, a = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []);
  let i = 0, l;
  return s;
  function s(c) {
    return t.enter("gfmFootnoteCall"), t.enter("gfmFootnoteCallLabelMarker"), t.consume(c), t.exit("gfmFootnoteCallLabelMarker"), o;
  }
  function o(c) {
    return c !== 94 ? r(c) : (t.enter("gfmFootnoteCallMarker"), t.consume(c), t.exit("gfmFootnoteCallMarker"), t.enter("gfmFootnoteCallString"), t.enter("chunkString").contentType = "string", m);
  }
  function m(c) {
    if (
      // Too long.
      i > 999 || // Closing brace with nothing.
      c === 93 && !l || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || oe(c)
    )
      return r(c);
    if (c === 93) {
      t.exit("chunkString");
      const v = t.exit("gfmFootnoteCallString");
      return a.includes(Je(n.sliceSerialize(v))) ? (t.enter("gfmFootnoteCallLabelMarker"), t.consume(c), t.exit("gfmFootnoteCallLabelMarker"), t.exit("gfmFootnoteCall"), e) : r(c);
    }
    return oe(c) || (l = !0), i++, t.consume(c), c === 92 ? d : m;
  }
  function d(c) {
    return c === 91 || c === 92 || c === 93 ? (t.consume(c), i++, m) : m(c);
  }
}
function D1(t, e, r) {
  const n = this, a = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []);
  let i, l = 0, s;
  return o;
  function o(w) {
    return t.enter("gfmFootnoteDefinition")._container = !0, t.enter("gfmFootnoteDefinitionLabel"), t.enter("gfmFootnoteDefinitionLabelMarker"), t.consume(w), t.exit("gfmFootnoteDefinitionLabelMarker"), m;
  }
  function m(w) {
    return w === 94 ? (t.enter("gfmFootnoteDefinitionMarker"), t.consume(w), t.exit("gfmFootnoteDefinitionMarker"), t.enter("gfmFootnoteDefinitionLabelString"), t.enter("chunkString").contentType = "string", d) : r(w);
  }
  function d(w) {
    if (
      // Too long.
      l > 999 || // Closing brace with nothing.
      w === 93 && !s || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      w === null || w === 91 || oe(w)
    )
      return r(w);
    if (w === 93) {
      t.exit("chunkString");
      const T = t.exit("gfmFootnoteDefinitionLabelString");
      return i = Je(n.sliceSerialize(T)), t.enter("gfmFootnoteDefinitionLabelMarker"), t.consume(w), t.exit("gfmFootnoteDefinitionLabelMarker"), t.exit("gfmFootnoteDefinitionLabel"), v;
    }
    return oe(w) || (s = !0), l++, t.consume(w), w === 92 ? c : d;
  }
  function c(w) {
    return w === 91 || w === 92 || w === 93 ? (t.consume(w), l++, d) : d(w);
  }
  function v(w) {
    return w === 58 ? (t.enter("definitionMarker"), t.consume(w), t.exit("definitionMarker"), a.includes(i) || a.push(i), te(t, p, "gfmFootnoteDefinitionWhitespace")) : r(w);
  }
  function p(w) {
    return e(w);
  }
}
function E1(t, e, r) {
  return t.check(Xt, e, t.attempt(A1, e, r));
}
function I1(t) {
  t.exit("gfmFootnoteDefinition");
}
function B1(t, e, r) {
  const n = this;
  return te(t, a, "gfmFootnoteDefinitionIndent", 5);
  function a(i) {
    const l = n.events[n.events.length - 1];
    return l && l[1].type === "gfmFootnoteDefinitionIndent" && l[2].sliceSerialize(l[1], !0).length === 4 ? e(i) : r(i);
  }
}
const N1 = {}.hasOwnProperty, q1 = {};
function L1(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function O1(t) {
  const e = q1, r = e.label || "Footnotes", n = e.labelTagName || "h2", a = e.labelAttributes === null || e.labelAttributes === void 0 ? 'class="sr-only"' : e.labelAttributes, i = e.backLabel || L1, l = e.clobberPrefix === null || e.clobberPrefix === void 0 ? "user-content-" : e.clobberPrefix;
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
        let s = this.getData("gfmFootnoteDefinitions");
        const o = this.getData("gfmFootnoteDefinitionStack"), m = this.getData("tightStack"), d = o.pop(), c = this.resume();
        s || this.setData("gfmFootnoteDefinitions", s = {}), N1.call(s, d) || (s[d] = c), m.pop(), this.setData("slurpOneLineEnding", !0), this.setData("lastWasTag");
      },
      gfmFootnoteDefinitionLabelString(s) {
        let o = this.getData("gfmFootnoteDefinitionStack");
        o || this.setData("gfmFootnoteDefinitionStack", o = []), o.push(Je(this.sliceSerialize(s))), this.resume(), this.buffer();
      },
      gfmFootnoteCallString(s) {
        let o = this.getData("gfmFootnoteCallOrder"), m = this.getData("gfmFootnoteCallCounts");
        const d = Je(this.sliceSerialize(s));
        let c;
        this.resume(), o || this.setData("gfmFootnoteCallOrder", o = []), m || this.setData("gfmFootnoteCallCounts", m = {});
        const v = o.indexOf(d), p = Mt(d.toLowerCase());
        v === -1 ? (o.push(d), m[d] = 1, c = o.length) : (m[d]++, c = v + 1);
        const w = m[d];
        this.tag('<sup><a href="#' + l + "fn-" + p + '" id="' + l + "fnref-" + p + (w > 1 ? "-" + w : "") + '" data-footnote-ref="" aria-describedby="footnote-label">' + String(c) + "</a></sup>");
      },
      null() {
        const s = this.getData("gfmFootnoteCallOrder") || [], o = this.getData("gfmFootnoteCallCounts") || {}, m = this.getData("gfmFootnoteDefinitions") || {};
        let d = -1;
        for (s.length > 0 && (this.lineEndingIfNeeded(), this.tag('<section data-footnotes="" class="footnotes"><' + n + ' id="footnote-label"' + (a ? " " + a : "") + ">"), this.raw(this.encode(r)), this.tag("</" + n + ">"), this.lineEndingIfNeeded(), this.tag("<ol>")); ++d < s.length; ) {
          const c = s[d], v = Mt(c.toLowerCase());
          let p = 0;
          const w = [];
          for (; ++p <= o[c]; )
            w.push('<a href="#' + l + "fnref-" + v + (p > 1 ? "-" + p : "") + '" data-footnote-backref="" aria-label="' + this.encode(typeof i == "string" ? i : i(d, p)) + '" class="data-footnote-backref">↩' + (p > 1 ? "<sup>" + p + "</sup>" : "") + "</a>");
          const T = w.join(" ");
          let B = !1;
          this.lineEndingIfNeeded(), this.tag('<li id="' + l + "fn-" + v + '">'), this.lineEndingIfNeeded(), this.tag(m[c].replace(/<\/p>(?:\r?\n|\r)?$/, function(C) {
            return B = !0, " " + T + C;
          })), B || (this.lineEndingIfNeeded(), this.tag(T)), this.lineEndingIfNeeded(), this.tag("</li>");
        }
        s.length > 0 && (this.lineEndingIfNeeded(), this.tag("</ol>"), this.lineEndingIfNeeded(), this.tag("</section>"));
      }
    }
  };
}
function R1() {
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
function P1(t) {
  let r = {}.singleTilde;
  const n = {
    name: "strikethrough",
    tokenize: i,
    resolveAll: a
  };
  return r == null && (r = !0), {
    text: {
      126: n
    },
    insideSpan: {
      null: [n]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function a(l, s) {
    let o = -1;
    for (; ++o < l.length; )
      if (l[o][0] === "enter" && l[o][1].type === "strikethroughSequenceTemporary" && l[o][1]._close) {
        let m = o;
        for (; m--; )
          if (l[m][0] === "exit" && l[m][1].type === "strikethroughSequenceTemporary" && l[m][1]._open && // If the sizes are the same:
          l[o][1].end.offset - l[o][1].start.offset === l[m][1].end.offset - l[m][1].start.offset) {
            l[o][1].type = "strikethroughSequence", l[m][1].type = "strikethroughSequence";
            const d = {
              type: "strikethrough",
              start: Object.assign({}, l[m][1].start),
              end: Object.assign({}, l[o][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, l[m][1].end),
              end: Object.assign({}, l[o][1].start)
            }, v = [["enter", d, s], ["enter", l[m][1], s], ["exit", l[m][1], s], ["enter", c, s]], p = s.parser.constructs.insideSpan.null;
            p && He(v, v.length, 0, b0(p, l.slice(m + 1, o), s)), He(v, v.length, 0, [["exit", c, s], ["enter", l[o][1], s], ["exit", l[o][1], s], ["exit", d, s]]), He(l, m - 1, o - m + 3, v), o = m + v.length - 2;
            break;
          }
      }
    for (o = -1; ++o < l.length; )
      l[o][1].type === "strikethroughSequenceTemporary" && (l[o][1].type = "data");
    return l;
  }
  function i(l, s, o) {
    const m = this.previous, d = this.events;
    let c = 0;
    return v;
    function v(w) {
      return m === 126 && d[d.length - 1][1].type !== "characterEscape" ? o(w) : (l.enter("strikethroughSequenceTemporary"), p(w));
    }
    function p(w) {
      const T = c0(m);
      if (w === 126)
        return c > 1 ? o(w) : (l.consume(w), c++, p);
      if (c < 2 && !r) return o(w);
      const B = l.exit("strikethroughSequenceTemporary"), C = c0(w);
      return B._open = !C || C === 2 && !!T, B._close = !T || T === 2 && !!C, s(w);
    }
  }
}
const F0 = {
  none: "",
  left: ' align="left"',
  right: ' align="right"',
  center: ' align="center"'
};
function H1() {
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
        const t = this.getData("tableAlign"), e = this.getData("tableColumn"), r = F0[t[e]];
        r === void 0 ? this.buffer() : (this.lineEndingIfNeeded(), this.tag("<td" + r + ">"));
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("<thead>");
      },
      tableHeader() {
        const t = this.getData("tableAlign"), e = this.getData("tableColumn"), r = F0[t[e]];
        this.lineEndingIfNeeded(), this.tag("<th" + r + ">");
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
        this.getData("tableAlign") && (e = e.replace(/\\([\\|])/g, V1)), this.raw(this.encode(e));
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
          this.lineEndingIfNeeded(), this.tag("<td" + F0[t[e]] + "></td>"), e++;
        this.setData("tableColumn", e), this.lineEndingIfNeeded(), this.tag("</tr>");
      }
    }
  };
}
function V1(t, e) {
  return e === "|" ? e : t;
}
class $1 {
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
  add(e, r, n) {
    G1(this, e, r, n);
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
    if (this.map.sort(function(i, l) {
      return i[0] - l[0];
    }), this.map.length === 0)
      return;
    let r = this.map.length;
    const n = [];
    for (; r > 0; )
      r -= 1, n.push(e.slice(this.map[r][0] + this.map[r][1]), this.map[r][2]), e.length = this.map[r][0];
    n.push(e.slice()), e.length = 0;
    let a = n.pop();
    for (; a; ) {
      for (const i of a)
        e.push(i);
      a = n.pop();
    }
    this.map.length = 0;
  }
}
function G1(t, e, r, n) {
  let a = 0;
  if (!(r === 0 && n.length === 0)) {
    for (; a < t.map.length; ) {
      if (t.map[a][0] === e) {
        t.map[a][1] += r, t.map[a][2].push(...n);
        return;
      }
      a += 1;
    }
    t.map.push([e, r, n]);
  }
}
function U1(t, e) {
  let r = !1;
  const n = [];
  for (; e < t.length; ) {
    const a = t[e];
    if (r) {
      if (a[0] === "enter")
        a[1].type === "tableContent" && n.push(t[e + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (a[1].type === "tableContent") {
        if (t[e - 1][1].type === "tableDelimiterMarker") {
          const i = n.length - 1;
          n[i] = n[i] === "left" ? "center" : "right";
        }
      } else if (a[1].type === "tableDelimiterRow")
        break;
    } else a[0] === "enter" && a[1].type === "tableDelimiterRow" && (r = !0);
    e += 1;
  }
  return n;
}
function W1() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: j1,
        resolveAll: Y1
      }
    }
  };
}
function j1(t, e, r) {
  const n = this;
  let a = 0, i = 0, l;
  return s;
  function s(E) {
    let P = n.events.length - 1;
    for (; P > -1; ) {
      const K = n.events[P][1].type;
      if (K === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      K === "linePrefix") P--;
      else break;
    }
    const $ = P > -1 ? n.events[P][1].type : null, ee = $ === "tableHead" || $ === "tableRow" ? z : o;
    return ee === z && n.parser.lazy[n.now().line] ? r(E) : ee(E);
  }
  function o(E) {
    return t.enter("tableHead"), t.enter("tableRow"), m(E);
  }
  function m(E) {
    return E === 124 || (l = !0, i += 1), d(E);
  }
  function d(E) {
    return E === null ? r(E) : j(E) ? i > 1 ? (i = 0, n.interrupt = !0, t.exit("tableRow"), t.enter("lineEnding"), t.consume(E), t.exit("lineEnding"), p) : r(E) : re(E) ? te(t, d, "whitespace")(E) : (i += 1, l && (l = !1, a += 1), E === 124 ? (t.enter("tableCellDivider"), t.consume(E), t.exit("tableCellDivider"), l = !0, d) : (t.enter("data"), c(E)));
  }
  function c(E) {
    return E === null || E === 124 || oe(E) ? (t.exit("data"), d(E)) : (t.consume(E), E === 92 ? v : c);
  }
  function v(E) {
    return E === 92 || E === 124 ? (t.consume(E), c) : c(E);
  }
  function p(E) {
    return n.interrupt = !1, n.parser.lazy[n.now().line] ? r(E) : (t.enter("tableDelimiterRow"), l = !1, re(E) ? te(t, w, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(E) : w(E));
  }
  function w(E) {
    return E === 45 || E === 58 ? B(E) : E === 124 ? (l = !0, t.enter("tableCellDivider"), t.consume(E), t.exit("tableCellDivider"), T) : F(E);
  }
  function T(E) {
    return re(E) ? te(t, B, "whitespace")(E) : B(E);
  }
  function B(E) {
    return E === 58 ? (i += 1, l = !0, t.enter("tableDelimiterMarker"), t.consume(E), t.exit("tableDelimiterMarker"), C) : E === 45 ? (i += 1, C(E)) : E === null || j(E) ? I(E) : F(E);
  }
  function C(E) {
    return E === 45 ? (t.enter("tableDelimiterFiller"), b(E)) : F(E);
  }
  function b(E) {
    return E === 45 ? (t.consume(E), b) : E === 58 ? (l = !0, t.exit("tableDelimiterFiller"), t.enter("tableDelimiterMarker"), t.consume(E), t.exit("tableDelimiterMarker"), k) : (t.exit("tableDelimiterFiller"), k(E));
  }
  function k(E) {
    return re(E) ? te(t, I, "whitespace")(E) : I(E);
  }
  function I(E) {
    return E === 124 ? w(E) : E === null || j(E) ? !l || a !== i ? F(E) : (t.exit("tableDelimiterRow"), t.exit("tableHead"), e(E)) : F(E);
  }
  function F(E) {
    return r(E);
  }
  function z(E) {
    return t.enter("tableRow"), N(E);
  }
  function N(E) {
    return E === 124 ? (t.enter("tableCellDivider"), t.consume(E), t.exit("tableCellDivider"), N) : E === null || j(E) ? (t.exit("tableRow"), e(E)) : re(E) ? te(t, N, "whitespace")(E) : (t.enter("data"), H(E));
  }
  function H(E) {
    return E === null || E === 124 || oe(E) ? (t.exit("data"), N(E)) : (t.consume(E), E === 92 ? q : H);
  }
  function q(E) {
    return E === 92 || E === 124 ? (t.consume(E), H) : H(E);
  }
}
function Y1(t, e) {
  let r = -1, n = !0, a = 0, i = [0, 0, 0, 0], l = [0, 0, 0, 0], s = !1, o = 0, m, d, c;
  const v = new $1();
  for (; ++r < t.length; ) {
    const p = t[r], w = p[1];
    p[0] === "enter" ? w.type === "tableHead" ? (s = !1, o !== 0 && ($r(v, e, o, m, d), d = void 0, o = 0), m = {
      type: "table",
      start: Object.assign({}, w.start),
      // Note: correct end is set later.
      end: Object.assign({}, w.end)
    }, v.add(r, 0, [["enter", m, e]])) : w.type === "tableRow" || w.type === "tableDelimiterRow" ? (n = !0, c = void 0, i = [0, 0, 0, 0], l = [0, r + 1, 0, 0], s && (s = !1, d = {
      type: "tableBody",
      start: Object.assign({}, w.start),
      // Note: correct end is set later.
      end: Object.assign({}, w.end)
    }, v.add(r, 0, [["enter", d, e]])), a = w.type === "tableDelimiterRow" ? 2 : d ? 3 : 1) : a && (w.type === "data" || w.type === "tableDelimiterMarker" || w.type === "tableDelimiterFiller") ? (n = !1, l[2] === 0 && (i[1] !== 0 && (l[0] = l[1], c = Jt(v, e, i, a, void 0, c), i = [0, 0, 0, 0]), l[2] = r)) : w.type === "tableCellDivider" && (n ? n = !1 : (i[1] !== 0 && (l[0] = l[1], c = Jt(v, e, i, a, void 0, c)), i = l, l = [i[1], r, 0, 0])) : w.type === "tableHead" ? (s = !0, o = r) : w.type === "tableRow" || w.type === "tableDelimiterRow" ? (o = r, i[1] !== 0 ? (l[0] = l[1], c = Jt(v, e, i, a, r, c)) : l[1] !== 0 && (c = Jt(v, e, l, a, r, c)), a = 0) : a && (w.type === "data" || w.type === "tableDelimiterMarker" || w.type === "tableDelimiterFiller") && (l[3] = r);
  }
  for (o !== 0 && $r(v, e, o, m, d), v.consume(e.events), r = -1; ++r < e.events.length; ) {
    const p = e.events[r];
    p[0] === "enter" && p[1].type === "table" && (p[1]._align = U1(e.events, r));
  }
  return t;
}
function Jt(t, e, r, n, a, i) {
  const l = n === 1 ? "tableHeader" : n === 2 ? "tableDelimiter" : "tableData", s = "tableContent";
  r[0] !== 0 && (i.end = Object.assign({}, It(e.events, r[0])), t.add(r[0], 0, [["exit", i, e]]));
  const o = It(e.events, r[1]);
  if (i = {
    type: l,
    start: Object.assign({}, o),
    // Note: correct end is set later.
    end: Object.assign({}, o)
  }, t.add(r[1], 0, [["enter", i, e]]), r[2] !== 0) {
    const m = It(e.events, r[2]), d = It(e.events, r[3]), c = {
      type: s,
      start: Object.assign({}, m),
      end: Object.assign({}, d)
    };
    if (t.add(r[2], 0, [["enter", c, e]]), n !== 2) {
      const v = e.events[r[2]], p = e.events[r[3]];
      if (v[1].end = Object.assign({}, p[1].end), v[1].type = "chunkText", v[1].contentType = "text", r[3] > r[2] + 1) {
        const w = r[2] + 1, T = r[3] - r[2] - 1;
        t.add(w, T, []);
      }
    }
    t.add(r[3] + 1, 0, [["exit", c, e]]);
  }
  return a !== void 0 && (i.end = Object.assign({}, It(e.events, a)), t.add(a, 0, [["exit", i, e]]), i = void 0), i;
}
function $r(t, e, r, n, a) {
  const i = [], l = It(e.events, r);
  a && (a.end = Object.assign({}, l), i.push(["exit", a, e])), n.end = Object.assign({}, l), i.push(["exit", n, e]), t.add(r + 1, 0, i);
}
function It(t, e) {
  const r = t[e], n = r[0] === "enter" ? "start" : "end";
  return r[1][n];
}
const _n = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi, X1 = new RegExp("^" + _n.source, "i");
function Z1() {
  return {
    exit: {
      htmlFlowData(t) {
        Gr.call(this, t, _n);
      },
      htmlTextData(t) {
        Gr.call(this, t, X1);
      }
    }
  };
}
function Gr(t, e) {
  let r = this.sliceSerialize(t);
  this.options.allowDangerousHtml && (r = r.replace(e, "&lt;$1$2")), this.raw(this.encode(r));
}
function Q1() {
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
const _1 = {
  name: "tasklistCheck",
  tokenize: J1
};
function K1() {
  return {
    text: {
      91: _1
    }
  };
}
function J1(t, e, r) {
  const n = this;
  return a;
  function a(o) {
    return (
      // Exit if there’s stuff before.
      n.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !n._gfmTasklistFirstContentOfListItem ? r(o) : (t.enter("taskListCheck"), t.enter("taskListCheckMarker"), t.consume(o), t.exit("taskListCheckMarker"), i)
    );
  }
  function i(o) {
    return oe(o) ? (t.enter("taskListCheckValueUnchecked"), t.consume(o), t.exit("taskListCheckValueUnchecked"), l) : o === 88 || o === 120 ? (t.enter("taskListCheckValueChecked"), t.consume(o), t.exit("taskListCheckValueChecked"), l) : r(o);
  }
  function l(o) {
    return o === 93 ? (t.enter("taskListCheckMarker"), t.consume(o), t.exit("taskListCheckMarker"), t.exit("taskListCheck"), s) : r(o);
  }
  function s(o) {
    return j(o) ? e(o) : re(o) ? t.check({
      tokenize: es
    }, e, r)(o) : r(o);
  }
}
function es(t, e, r) {
  return te(t, n, "whitespace");
  function n(a) {
    return a === null ? r(a) : e(a);
  }
}
function ts(t) {
  return En([
    c1(),
    M1(),
    P1(),
    W1(),
    K1()
  ]);
}
function rs(t) {
  return In([
    w1(),
    O1(),
    R1(),
    H1(),
    Z1(),
    Q1()
  ]);
}
const ns = {
  tokenize: as,
  concrete: !0,
  name: "mathFlow"
}, Ur = {
  tokenize: is,
  partial: !0
};
function as(t, e, r) {
  const n = this, a = n.events[n.events.length - 1], i = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0;
  let l = 0;
  return s;
  function s(b) {
    return t.enter("mathFlow"), t.enter("mathFlowFence"), t.enter("mathFlowFenceSequence"), o(b);
  }
  function o(b) {
    return b === 36 ? (t.consume(b), l++, o) : l < 2 ? r(b) : (t.exit("mathFlowFenceSequence"), te(t, m, "whitespace")(b));
  }
  function m(b) {
    return b === null || j(b) ? c(b) : (t.enter("mathFlowFenceMeta"), t.enter("chunkString", {
      contentType: "string"
    }), d(b));
  }
  function d(b) {
    return b === null || j(b) ? (t.exit("chunkString"), t.exit("mathFlowFenceMeta"), c(b)) : b === 36 ? r(b) : (t.consume(b), d);
  }
  function c(b) {
    return t.exit("mathFlowFence"), n.interrupt ? e(b) : t.attempt(Ur, v, B)(b);
  }
  function v(b) {
    return t.attempt({
      tokenize: C,
      partial: !0
    }, B, p)(b);
  }
  function p(b) {
    return (i ? te(t, w, "linePrefix", i + 1) : w)(b);
  }
  function w(b) {
    return b === null ? B(b) : j(b) ? t.attempt(Ur, v, B)(b) : (t.enter("mathFlowValue"), T(b));
  }
  function T(b) {
    return b === null || j(b) ? (t.exit("mathFlowValue"), w(b)) : (t.consume(b), T);
  }
  function B(b) {
    return t.exit("mathFlow"), e(b);
  }
  function C(b, k, I) {
    let F = 0;
    return te(b, z, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
    function z(q) {
      return b.enter("mathFlowFence"), b.enter("mathFlowFenceSequence"), N(q);
    }
    function N(q) {
      return q === 36 ? (F++, b.consume(q), N) : F < l ? I(q) : (b.exit("mathFlowFenceSequence"), te(b, H, "whitespace")(q));
    }
    function H(q) {
      return q === null || j(q) ? (b.exit("mathFlowFence"), k(q)) : I(q);
    }
  }
}
function is(t, e, r) {
  const n = this;
  return a;
  function a(l) {
    return l === null ? e(l) : (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), i);
  }
  function i(l) {
    return n.parser.lazy[n.now().line] ? r(l) : e(l);
  }
}
function ls(t) {
  let r = {}.singleDollarTextMath;
  return r == null && (r = !0), {
    tokenize: n,
    resolve: ss,
    previous: us,
    name: "mathText"
  };
  function n(a, i, l) {
    let s = 0, o, m;
    return d;
    function d(T) {
      return a.enter("mathText"), a.enter("mathTextSequence"), c(T);
    }
    function c(T) {
      return T === 36 ? (a.consume(T), s++, c) : s < 2 && !r ? l(T) : (a.exit("mathTextSequence"), v(T));
    }
    function v(T) {
      return T === null ? l(T) : T === 36 ? (m = a.enter("mathTextSequence"), o = 0, w(T)) : T === 32 ? (a.enter("space"), a.consume(T), a.exit("space"), v) : j(T) ? (a.enter("lineEnding"), a.consume(T), a.exit("lineEnding"), v) : (a.enter("mathTextData"), p(T));
    }
    function p(T) {
      return T === null || T === 32 || T === 36 || j(T) ? (a.exit("mathTextData"), v(T)) : (a.consume(T), p);
    }
    function w(T) {
      return T === 36 ? (a.consume(T), o++, w) : o === s ? (a.exit("mathTextSequence"), a.exit("mathText"), i(T)) : (m.type = "mathTextData", p(T));
    }
  }
}
function ss(t) {
  let e = t.length - 4, r = 3, n, a;
  if ((t[r][1].type === "lineEnding" || t[r][1].type === "space") && (t[e][1].type === "lineEnding" || t[e][1].type === "space")) {
    for (n = r; ++n < e; )
      if (t[n][1].type === "mathTextData") {
        t[e][1].type = "mathTextPadding", t[r][1].type = "mathTextPadding", r += 2, e -= 2;
        break;
      }
  }
  for (n = r - 1, e++; ++n <= e; )
    a === void 0 ? n !== e && t[n][1].type !== "lineEnding" && (a = n) : (n === e || t[n][1].type === "lineEnding") && (t[a][1].type = "mathTextData", n !== a + 2 && (t[a][1].end = t[n - 1][1].end, t.splice(a + 2, n - a - 2), e -= n - a - 2, n = a + 2), a = void 0);
  return t;
}
function us(t) {
  return t !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function os(t) {
  return {
    flow: {
      36: ns
    },
    text: {
      36: ls()
    }
  };
}
class Oe {
  // The + prefix indicates that these fields aren't writeable
  // Lexer holding the input string.
  // Start offset, zero-based inclusive.
  // End offset, zero-based exclusive.
  constructor(e, r, n) {
    this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e, this.start = r, this.end = n;
  }
  /**
   * Merges two `SourceLocation`s from location providers, given they are
   * provided in order of appearance.
   * - Returns the first one's location if only the first is provided.
   * - Returns a merged range of the first and the last if both are provided
   *   and their lexers match.
   * - Otherwise, returns null.
   */
  static range(e, r) {
    return r ? !e || !e.loc || !r.loc || e.loc.lexer !== r.loc.lexer ? null : new Oe(e.loc.lexer, e.loc.start, r.loc.end) : e && e.loc;
  }
}
class Ve {
  // don't expand the token
  // used in \noexpand
  constructor(e, r) {
    this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e, this.loc = r;
  }
  /**
   * Given a pair of tokens (this and endToken), compute a `Token` encompassing
   * the whole input range enclosed by these two.
   */
  range(e, r) {
    return new Ve(r, Oe.range(this, e));
  }
}
class R {
  // Error start position based on passed-in Token or ParseNode.
  // Length of affected text based on passed-in Token or ParseNode.
  // The underlying error message without any context added.
  constructor(e, r) {
    this.name = void 0, this.position = void 0, this.length = void 0, this.rawMessage = void 0;
    var n = "KaTeX parse error: " + e, a, i, l = r && r.loc;
    if (l && l.start <= l.end) {
      var s = l.lexer.input;
      a = l.start, i = l.end, a === s.length ? n += " at end of input: " : n += " at position " + (a + 1) + ": ";
      var o = s.slice(a, i).replace(/[^]/g, "$&̲"), m;
      a > 15 ? m = "…" + s.slice(a - 15, a) : m = s.slice(0, a);
      var d;
      i + 15 < s.length ? d = s.slice(i, i + 15) + "…" : d = s.slice(i), n += m + o + d;
    }
    var c = new Error(n);
    return c.name = "ParseError", c.__proto__ = R.prototype, c.position = a, a != null && i != null && (c.length = i - a), c.rawMessage = e, c;
  }
}
R.prototype.__proto__ = Error.prototype;
var hs = function(e, r) {
  return e === void 0 ? r : e;
}, ms = /([A-Z])/g, cs = function(e) {
  return e.replace(ms, "-$1").toLowerCase();
}, fs = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#x27;"
}, ds = /[&><"']/g;
function ps(t) {
  return String(t).replace(ds, (e) => fs[e]);
}
var Kn = function t(e) {
  return e.type === "ordgroup" || e.type === "color" ? e.body.length === 1 ? t(e.body[0]) : e : e.type === "font" ? t(e.body) : e;
}, gs = function(e) {
  var r = Kn(e);
  return r.type === "mathord" || r.type === "textord" || r.type === "atom";
}, vs = function(e) {
  if (!e)
    throw new Error("Expected non-null, but got " + String(e));
  return e;
}, bs = function(e) {
  var r = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);
  return r ? r[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(r[1]) ? null : r[1].toLowerCase() : "_relative";
}, le = {
  deflt: hs,
  escape: ps,
  hyphenate: cs,
  getBaseElem: Kn,
  isCharacterBox: gs,
  protocolFromUrl: bs
}, D0 = {
  displayMode: {
    type: "boolean",
    description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
    cli: "-d, --display-mode"
  },
  output: {
    type: {
      enum: ["htmlAndMathml", "html", "mathml"]
    },
    description: "Determines the markup language of the output.",
    cli: "-F, --format <type>"
  },
  leqno: {
    type: "boolean",
    description: "Render display math in leqno style (left-justified tags)."
  },
  fleqn: {
    type: "boolean",
    description: "Render display math flush left."
  },
  throwOnError: {
    type: "boolean",
    default: !0,
    cli: "-t, --no-throw-on-error",
    cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
  },
  errorColor: {
    type: "string",
    default: "#cc0000",
    cli: "-c, --error-color <color>",
    cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
    cliProcessor: (t) => "#" + t
  },
  macros: {
    type: "object",
    cli: "-m, --macro <def>",
    cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
    cliDefault: [],
    cliProcessor: (t, e) => (e.push(t), e)
  },
  minRuleThickness: {
    type: "number",
    description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
    processor: (t) => Math.max(0, t),
    cli: "--min-rule-thickness <size>",
    cliProcessor: parseFloat
  },
  colorIsTextColor: {
    type: "boolean",
    description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
    cli: "-b, --color-is-text-color"
  },
  strict: {
    type: [{
      enum: ["warn", "ignore", "error"]
    }, "boolean", "function"],
    description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
    cli: "-S, --strict",
    cliDefault: !1
  },
  trust: {
    type: ["boolean", "function"],
    description: "Trust the input, enabling all HTML features such as \\url.",
    cli: "-T, --trust"
  },
  maxSize: {
    type: "number",
    default: 1 / 0,
    description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
    processor: (t) => Math.max(0, t),
    cli: "-s, --max-size <n>",
    cliProcessor: parseInt
  },
  maxExpand: {
    type: "number",
    default: 1e3,
    description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
    processor: (t) => Math.max(0, t),
    cli: "-e, --max-expand <n>",
    cliProcessor: (t) => t === "Infinity" ? 1 / 0 : parseInt(t)
  },
  globalGroup: {
    type: "boolean",
    cli: !1
  }
};
function xs(t) {
  if (t.default)
    return t.default;
  var e = t.type, r = Array.isArray(e) ? e[0] : e;
  if (typeof r != "string")
    return r.enum[0];
  switch (r) {
    case "boolean":
      return !1;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
  }
}
class ys {
  constructor(e) {
    this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e = e || {};
    for (var r in D0)
      if (D0.hasOwnProperty(r)) {
        var n = D0[r];
        this[r] = e[r] !== void 0 ? n.processor ? n.processor(e[r]) : e[r] : xs(n);
      }
  }
  /**
   * Report nonstrict (non-LaTeX-compatible) input.
   * Can safely not be called if `this.strict` is false in JavaScript.
   */
  reportNonstrict(e, r, n) {
    var a = this.strict;
    if (typeof a == "function" && (a = a(e, r, n)), !(!a || a === "ignore")) {
      if (a === !0 || a === "error")
        throw new R("LaTeX-incompatible input and strict mode is set to 'error': " + (r + " [" + e + "]"), n);
      a === "warn" ? typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (r + " [" + e + "]")) : typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + a + "': " + r + " [" + e + "]"));
    }
  }
  /**
   * Check whether to apply strict (LaTeX-adhering) behavior for unusual
   * input (like `\\`).  Unlike `nonstrict`, will not throw an error;
   * instead, "error" translates to a return value of `true`, while "ignore"
   * translates to a return value of `false`.  May still print a warning:
   * "warn" prints a warning and returns `false`.
   * This is for the second category of `errorCode`s listed in the README.
   */
  useStrictBehavior(e, r, n) {
    var a = this.strict;
    if (typeof a == "function")
      try {
        a = a(e, r, n);
      } catch {
        a = "error";
      }
    return !a || a === "ignore" ? !1 : a === !0 || a === "error" ? !0 : a === "warn" ? (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (r + " [" + e + "]")), !1) : (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + a + "': " + r + " [" + e + "]")), !1);
  }
  /**
   * Check whether to test potentially dangerous input, and return
   * `true` (trusted) or `false` (untrusted).  The sole argument `context`
   * should be an object with `command` field specifying the relevant LaTeX
   * command (as a string starting with `\`), and any other arguments, etc.
   * If `context` has a `url` field, a `protocol` field will automatically
   * get added by this function (changing the specified object).
   */
  isTrusted(e) {
    if (e.url && !e.protocol) {
      var r = le.protocolFromUrl(e.url);
      if (r == null)
        return !1;
      e.protocol = r;
    }
    var n = typeof this.trust == "function" ? this.trust(e) : this.trust;
    return !!n;
  }
}
class pt {
  constructor(e, r, n) {
    this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e, this.size = r, this.cramped = n;
  }
  /**
   * Get the style of a superscript given a base in the current style.
   */
  sup() {
    return _e[ws[this.id]];
  }
  /**
   * Get the style of a subscript given a base in the current style.
   */
  sub() {
    return _e[ks[this.id]];
  }
  /**
   * Get the style of a fraction numerator given the fraction in the current
   * style.
   */
  fracNum() {
    return _e[Ss[this.id]];
  }
  /**
   * Get the style of a fraction denominator given the fraction in the current
   * style.
   */
  fracDen() {
    return _e[zs[this.id]];
  }
  /**
   * Get the cramped version of a style (in particular, cramping a cramped style
   * doesn't change the style).
   */
  cramp() {
    return _e[As[this.id]];
  }
  /**
   * Get a text or display version of this style.
   */
  text() {
    return _e[Ms[this.id]];
  }
  /**
   * Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
   */
  isTight() {
    return this.size >= 2;
  }
}
var or = 0, f0 = 1, Bt = 2, ut = 3, jt = 4, Ge = 5, qt = 6, Ie = 7, _e = [new pt(or, 0, !1), new pt(f0, 0, !0), new pt(Bt, 1, !1), new pt(ut, 1, !0), new pt(jt, 2, !1), new pt(Ge, 2, !0), new pt(qt, 3, !1), new pt(Ie, 3, !0)], ws = [jt, Ge, jt, Ge, qt, Ie, qt, Ie], ks = [Ge, Ge, Ge, Ge, Ie, Ie, Ie, Ie], Ss = [Bt, ut, jt, Ge, qt, Ie, qt, Ie], zs = [ut, ut, Ge, Ge, Ie, Ie, Ie, Ie], As = [f0, f0, ut, ut, Ge, Ge, Ie, Ie], Ms = [or, f0, Bt, ut, Bt, ut, Bt, ut], Z = {
  DISPLAY: _e[or],
  TEXT: _e[Bt],
  SCRIPT: _e[jt],
  SCRIPTSCRIPT: _e[qt]
}, K0 = [{
  // Latin characters beyond the Latin-1 characters we have metrics for.
  // Needed for Czech, Hungarian and Turkish text, for example.
  name: "latin",
  blocks: [
    [256, 591],
    // Latin Extended-A and Latin Extended-B
    [768, 879]
    // Combining Diacritical marks
  ]
}, {
  // The Cyrillic script used by Russian and related languages.
  // A Cyrillic subset used to be supported as explicitly defined
  // symbols in symbols.js
  name: "cyrillic",
  blocks: [[1024, 1279]]
}, {
  // Armenian
  name: "armenian",
  blocks: [[1328, 1423]]
}, {
  // The Brahmic scripts of South and Southeast Asia
  // Devanagari (0900–097F)
  // Bengali (0980–09FF)
  // Gurmukhi (0A00–0A7F)
  // Gujarati (0A80–0AFF)
  // Oriya (0B00–0B7F)
  // Tamil (0B80–0BFF)
  // Telugu (0C00–0C7F)
  // Kannada (0C80–0CFF)
  // Malayalam (0D00–0D7F)
  // Sinhala (0D80–0DFF)
  // Thai (0E00–0E7F)
  // Lao (0E80–0EFF)
  // Tibetan (0F00–0FFF)
  // Myanmar (1000–109F)
  name: "brahmic",
  blocks: [[2304, 4255]]
}, {
  name: "georgian",
  blocks: [[4256, 4351]]
}, {
  // Chinese and Japanese.
  // The "k" in cjk is for Korean, but we've separated Korean out
  name: "cjk",
  blocks: [
    [12288, 12543],
    // CJK symbols and punctuation, Hiragana, Katakana
    [19968, 40879],
    // CJK ideograms
    [65280, 65376]
    // Fullwidth punctuation
    // TODO: add halfwidth Katakana and Romanji glyphs
  ]
}, {
  // Korean
  name: "hangul",
  blocks: [[44032, 55215]]
}];
function Ts(t) {
  for (var e = 0; e < K0.length; e++)
    for (var r = K0[e], n = 0; n < r.blocks.length; n++) {
      var a = r.blocks[n];
      if (t >= a[0] && t <= a[1])
        return r.name;
    }
  return null;
}
var h0 = [];
K0.forEach((t) => t.blocks.forEach((e) => h0.push(...e)));
function Jn(t) {
  for (var e = 0; e < h0.length; e += 2)
    if (t >= h0[e] && t <= h0[e + 1])
      return !0;
  return !1;
}
var Et = 80, Cs = function(e, r) {
  return "M95," + (622 + e + r) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e / 2.075 + " -" + e + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e) + " " + r + "h400000v" + (40 + e) + "h-400000z";
}, Fs = function(e, r) {
  return "M263," + (601 + e + r) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e / 2.084 + " -" + e + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e) + " " + r + "h400000v" + (40 + e) + "h-400000z";
}, Ds = function(e, r) {
  return "M983 " + (10 + e + r) + `
l` + e / 3.13 + " -" + e + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e) + " " + r + "h400000v" + (40 + e) + "h-400000z";
}, Es = function(e, r) {
  return "M424," + (2398 + e + r) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e / 4.223 + " -" + e + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e) + " " + r + `
h400000v` + (40 + e) + "h-400000z";
}, Is = function(e, r) {
  return "M473," + (2713 + e + r) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e / 5.298 + " -" + e + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e) + " " + r + "h400000v" + (40 + e) + "H1017.7z";
}, Bs = function(e) {
  var r = e / 2;
  return "M400000 " + e + " H0 L" + r + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, Ns = function(e, r, n) {
  var a = n - 54 - r - e;
  return "M702 " + (e + r) + "H400000" + (40 + e) + `
H742v` + a + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + r + "H400000v" + (40 + e) + "H742z";
}, qs = function(e, r, n) {
  r = 1e3 * r;
  var a = "";
  switch (e) {
    case "sqrtMain":
      a = Cs(r, Et);
      break;
    case "sqrtSize1":
      a = Fs(r, Et);
      break;
    case "sqrtSize2":
      a = Ds(r, Et);
      break;
    case "sqrtSize3":
      a = Es(r, Et);
      break;
    case "sqrtSize4":
      a = Is(r, Et);
      break;
    case "sqrtTall":
      a = Ns(r, Et, n);
  }
  return a;
}, Ls = function(e, r) {
  switch (e) {
    case "⎜":
      return "M291 0 H417 V" + r + " H291z M291 0 H417 V" + r + " H291z";
    case "∣":
      return "M145 0 H188 V" + r + " H145z M145 0 H188 V" + r + " H145z";
    case "∥":
      return "M145 0 H188 V" + r + " H145z M145 0 H188 V" + r + " H145z" + ("M367 0 H410 V" + r + " H367z M367 0 H410 V" + r + " H367z");
    case "⎟":
      return "M457 0 H583 V" + r + " H457z M457 0 H583 V" + r + " H457z";
    case "⎢":
      return "M319 0 H403 V" + r + " H319z M319 0 H403 V" + r + " H319z";
    case "⎥":
      return "M263 0 H347 V" + r + " H263z M263 0 H347 V" + r + " H263z";
    case "⎪":
      return "M384 0 H504 V" + r + " H384z M384 0 H504 V" + r + " H384z";
    case "⏐":
      return "M312 0 H355 V" + r + " H312z M312 0 H355 V" + r + " H312z";
    case "‖":
      return "M257 0 H300 V" + r + " H257z M257 0 H300 V" + r + " H257z" + ("M478 0 H521 V" + r + " H478z M478 0 H521 V" + r + " H478z");
    default:
      return "";
  }
}, Wr = {
  // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
  doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,
  // doublerightarrow is from glyph U+21D2 in font KaTeX Main
  doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,
  // leftarrow is from glyph U+2190 in font KaTeX Main
  leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,
  // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
  leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,
  leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,
  // overgroup is from the MnSymbol package (public domain)
  leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,
  leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,
  // Harpoons are from glyph U+21BD in font KaTeX Main
  leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,
  leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,
  leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,
  leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,
  // hook is from glyph U+21A9 in font KaTeX Main
  lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,
  leftlinesegment: `M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,
  leftmapsto: `M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,
  // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
  leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,
  longequal: `M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,
  midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,
  midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,
  oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,
  oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,
  oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,
  oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,
  rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,
  rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,
  rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,
  rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,
  rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,
  rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,
  rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,
  rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,
  rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,
  righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,
  rightlinesegment: `M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,
  rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,
  // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
  twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,
  twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,
  // tilde1 is a modified version of a glyph from the MnSymbol package
  tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,
  // ditto tilde2, tilde3, & tilde4
  tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,
  tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,
  tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,
  // vec is from glyph U+20D7 in font KaTeX Main
  vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,
  // widehat1 is a modified version of a glyph from the MnSymbol package
  widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,
  // ditto widehat2, widehat3, & widehat4
  widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  // widecheck paths are all inverted versions of widehat
  widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,
  widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  // The next ten paths support reaction arrows from the mhchem package.
  // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
  // baraboveleftarrow is mostly from glyph U+2190 in font KaTeX Main
  baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,
  // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
  rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,
  // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
  // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
  baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,
  rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,
  shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,
  shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`
}, Os = function(e, r) {
  switch (e) {
    case "lbrack":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + r + ` v1759 h347 v-84
H403z M403 1759 V0 H319 V1759 v` + r + " v1759 h84z";
    case "rbrack":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + r + ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` + r + " v1759 h84z";
    case "vert":
      return "M145 15 v585 v" + r + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -r + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + r + " v585 h43z";
    case "doublevert":
      return "M145 15 v585 v" + r + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -r + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + r + ` v585 h43z
M367 15 v585 v` + r + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -r + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` + r + " v585 h43z";
    case "lfloor":
      return "M319 602 V0 H403 V602 v" + r + ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` + r + " v1715 H319z";
    case "rfloor":
      return "M319 602 V0 H403 V602 v" + r + ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` + r + " v1715 H319z";
    case "lceil":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + r + ` v602 h84z
M403 1759 V0 H319 V1759 v` + r + " v602 h84z";
    case "rceil":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + r + ` v602 h84z
M347 1759 V0 h-84 V1759 v` + r + " v602 h84z";
    case "lparen":
      return `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` + (r + 84) + `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` + (r + 92) + `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;
    case "rparen":
      return `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` + (r + 9) + `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` + (r + 144) + `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;
    default:
      throw new Error("Unknown stretchy delimiter.");
  }
};
class Zt {
  // Never used; needed for satisfying interface.
  constructor(e) {
    this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  /** Convert the fragment into a node. */
  toNode() {
    for (var e = document.createDocumentFragment(), r = 0; r < this.children.length; r++)
      e.appendChild(this.children[r].toNode());
    return e;
  }
  /** Convert the fragment into HTML markup. */
  toMarkup() {
    for (var e = "", r = 0; r < this.children.length; r++)
      e += this.children[r].toMarkup();
    return e;
  }
  /**
   * Converts the math node into a string, similar to innerText. Applies to
   * MathDomNode's only.
   */
  toText() {
    var e = (r) => r.toText();
    return this.children.map(e).join("");
  }
}
var st = {
  "AMS-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68889, 0, 0, 0.72222],
    66: [0, 0.68889, 0, 0, 0.66667],
    67: [0, 0.68889, 0, 0, 0.72222],
    68: [0, 0.68889, 0, 0, 0.72222],
    69: [0, 0.68889, 0, 0, 0.66667],
    70: [0, 0.68889, 0, 0, 0.61111],
    71: [0, 0.68889, 0, 0, 0.77778],
    72: [0, 0.68889, 0, 0, 0.77778],
    73: [0, 0.68889, 0, 0, 0.38889],
    74: [0.16667, 0.68889, 0, 0, 0.5],
    75: [0, 0.68889, 0, 0, 0.77778],
    76: [0, 0.68889, 0, 0, 0.66667],
    77: [0, 0.68889, 0, 0, 0.94445],
    78: [0, 0.68889, 0, 0, 0.72222],
    79: [0.16667, 0.68889, 0, 0, 0.77778],
    80: [0, 0.68889, 0, 0, 0.61111],
    81: [0.16667, 0.68889, 0, 0, 0.77778],
    82: [0, 0.68889, 0, 0, 0.72222],
    83: [0, 0.68889, 0, 0, 0.55556],
    84: [0, 0.68889, 0, 0, 0.66667],
    85: [0, 0.68889, 0, 0, 0.72222],
    86: [0, 0.68889, 0, 0, 0.72222],
    87: [0, 0.68889, 0, 0, 1],
    88: [0, 0.68889, 0, 0, 0.72222],
    89: [0, 0.68889, 0, 0, 0.72222],
    90: [0, 0.68889, 0, 0, 0.66667],
    107: [0, 0.68889, 0, 0, 0.55556],
    160: [0, 0, 0, 0, 0.25],
    165: [0, 0.675, 0.025, 0, 0.75],
    174: [0.15559, 0.69224, 0, 0, 0.94666],
    240: [0, 0.68889, 0, 0, 0.55556],
    295: [0, 0.68889, 0, 0, 0.54028],
    710: [0, 0.825, 0, 0, 2.33334],
    732: [0, 0.9, 0, 0, 2.33334],
    770: [0, 0.825, 0, 0, 2.33334],
    771: [0, 0.9, 0, 0, 2.33334],
    989: [0.08167, 0.58167, 0, 0, 0.77778],
    1008: [0, 0.43056, 0.04028, 0, 0.66667],
    8245: [0, 0.54986, 0, 0, 0.275],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8487: [0, 0.68889, 0, 0, 0.72222],
    8498: [0, 0.68889, 0, 0, 0.55556],
    8502: [0, 0.68889, 0, 0, 0.66667],
    8503: [0, 0.68889, 0, 0, 0.44445],
    8504: [0, 0.68889, 0, 0, 0.66667],
    8513: [0, 0.68889, 0, 0, 0.63889],
    8592: [-0.03598, 0.46402, 0, 0, 0.5],
    8594: [-0.03598, 0.46402, 0, 0, 0.5],
    8602: [-0.13313, 0.36687, 0, 0, 1],
    8603: [-0.13313, 0.36687, 0, 0, 1],
    8606: [0.01354, 0.52239, 0, 0, 1],
    8608: [0.01354, 0.52239, 0, 0, 1],
    8610: [0.01354, 0.52239, 0, 0, 1.11111],
    8611: [0.01354, 0.52239, 0, 0, 1.11111],
    8619: [0, 0.54986, 0, 0, 1],
    8620: [0, 0.54986, 0, 0, 1],
    8621: [-0.13313, 0.37788, 0, 0, 1.38889],
    8622: [-0.13313, 0.36687, 0, 0, 1],
    8624: [0, 0.69224, 0, 0, 0.5],
    8625: [0, 0.69224, 0, 0, 0.5],
    8630: [0, 0.43056, 0, 0, 1],
    8631: [0, 0.43056, 0, 0, 1],
    8634: [0.08198, 0.58198, 0, 0, 0.77778],
    8635: [0.08198, 0.58198, 0, 0, 0.77778],
    8638: [0.19444, 0.69224, 0, 0, 0.41667],
    8639: [0.19444, 0.69224, 0, 0, 0.41667],
    8642: [0.19444, 0.69224, 0, 0, 0.41667],
    8643: [0.19444, 0.69224, 0, 0, 0.41667],
    8644: [0.1808, 0.675, 0, 0, 1],
    8646: [0.1808, 0.675, 0, 0, 1],
    8647: [0.1808, 0.675, 0, 0, 1],
    8648: [0.19444, 0.69224, 0, 0, 0.83334],
    8649: [0.1808, 0.675, 0, 0, 1],
    8650: [0.19444, 0.69224, 0, 0, 0.83334],
    8651: [0.01354, 0.52239, 0, 0, 1],
    8652: [0.01354, 0.52239, 0, 0, 1],
    8653: [-0.13313, 0.36687, 0, 0, 1],
    8654: [-0.13313, 0.36687, 0, 0, 1],
    8655: [-0.13313, 0.36687, 0, 0, 1],
    8666: [0.13667, 0.63667, 0, 0, 1],
    8667: [0.13667, 0.63667, 0, 0, 1],
    8669: [-0.13313, 0.37788, 0, 0, 1],
    8672: [-0.064, 0.437, 0, 0, 1.334],
    8674: [-0.064, 0.437, 0, 0, 1.334],
    8705: [0, 0.825, 0, 0, 0.5],
    8708: [0, 0.68889, 0, 0, 0.55556],
    8709: [0.08167, 0.58167, 0, 0, 0.77778],
    8717: [0, 0.43056, 0, 0, 0.42917],
    8722: [-0.03598, 0.46402, 0, 0, 0.5],
    8724: [0.08198, 0.69224, 0, 0, 0.77778],
    8726: [0.08167, 0.58167, 0, 0, 0.77778],
    8733: [0, 0.69224, 0, 0, 0.77778],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8737: [0, 0.69224, 0, 0, 0.72222],
    8738: [0.03517, 0.52239, 0, 0, 0.72222],
    8739: [0.08167, 0.58167, 0, 0, 0.22222],
    8740: [0.25142, 0.74111, 0, 0, 0.27778],
    8741: [0.08167, 0.58167, 0, 0, 0.38889],
    8742: [0.25142, 0.74111, 0, 0, 0.5],
    8756: [0, 0.69224, 0, 0, 0.66667],
    8757: [0, 0.69224, 0, 0, 0.66667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8765: [-0.13313, 0.37788, 0, 0, 0.77778],
    8769: [-0.13313, 0.36687, 0, 0, 0.77778],
    8770: [-0.03625, 0.46375, 0, 0, 0.77778],
    8774: [0.30274, 0.79383, 0, 0, 0.77778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8778: [0.08167, 0.58167, 0, 0, 0.77778],
    8782: [0.06062, 0.54986, 0, 0, 0.77778],
    8783: [0.06062, 0.54986, 0, 0, 0.77778],
    8785: [0.08198, 0.58198, 0, 0, 0.77778],
    8786: [0.08198, 0.58198, 0, 0, 0.77778],
    8787: [0.08198, 0.58198, 0, 0, 0.77778],
    8790: [0, 0.69224, 0, 0, 0.77778],
    8791: [0.22958, 0.72958, 0, 0, 0.77778],
    8796: [0.08198, 0.91667, 0, 0, 0.77778],
    8806: [0.25583, 0.75583, 0, 0, 0.77778],
    8807: [0.25583, 0.75583, 0, 0, 0.77778],
    8808: [0.25142, 0.75726, 0, 0, 0.77778],
    8809: [0.25142, 0.75726, 0, 0, 0.77778],
    8812: [0.25583, 0.75583, 0, 0, 0.5],
    8814: [0.20576, 0.70576, 0, 0, 0.77778],
    8815: [0.20576, 0.70576, 0, 0, 0.77778],
    8816: [0.30274, 0.79383, 0, 0, 0.77778],
    8817: [0.30274, 0.79383, 0, 0, 0.77778],
    8818: [0.22958, 0.72958, 0, 0, 0.77778],
    8819: [0.22958, 0.72958, 0, 0, 0.77778],
    8822: [0.1808, 0.675, 0, 0, 0.77778],
    8823: [0.1808, 0.675, 0, 0, 0.77778],
    8828: [0.13667, 0.63667, 0, 0, 0.77778],
    8829: [0.13667, 0.63667, 0, 0, 0.77778],
    8830: [0.22958, 0.72958, 0, 0, 0.77778],
    8831: [0.22958, 0.72958, 0, 0, 0.77778],
    8832: [0.20576, 0.70576, 0, 0, 0.77778],
    8833: [0.20576, 0.70576, 0, 0, 0.77778],
    8840: [0.30274, 0.79383, 0, 0, 0.77778],
    8841: [0.30274, 0.79383, 0, 0, 0.77778],
    8842: [0.13597, 0.63597, 0, 0, 0.77778],
    8843: [0.13597, 0.63597, 0, 0, 0.77778],
    8847: [0.03517, 0.54986, 0, 0, 0.77778],
    8848: [0.03517, 0.54986, 0, 0, 0.77778],
    8858: [0.08198, 0.58198, 0, 0, 0.77778],
    8859: [0.08198, 0.58198, 0, 0, 0.77778],
    8861: [0.08198, 0.58198, 0, 0, 0.77778],
    8862: [0, 0.675, 0, 0, 0.77778],
    8863: [0, 0.675, 0, 0, 0.77778],
    8864: [0, 0.675, 0, 0, 0.77778],
    8865: [0, 0.675, 0, 0, 0.77778],
    8872: [0, 0.69224, 0, 0, 0.61111],
    8873: [0, 0.69224, 0, 0, 0.72222],
    8874: [0, 0.69224, 0, 0, 0.88889],
    8876: [0, 0.68889, 0, 0, 0.61111],
    8877: [0, 0.68889, 0, 0, 0.61111],
    8878: [0, 0.68889, 0, 0, 0.72222],
    8879: [0, 0.68889, 0, 0, 0.72222],
    8882: [0.03517, 0.54986, 0, 0, 0.77778],
    8883: [0.03517, 0.54986, 0, 0, 0.77778],
    8884: [0.13667, 0.63667, 0, 0, 0.77778],
    8885: [0.13667, 0.63667, 0, 0, 0.77778],
    8888: [0, 0.54986, 0, 0, 1.11111],
    8890: [0.19444, 0.43056, 0, 0, 0.55556],
    8891: [0.19444, 0.69224, 0, 0, 0.61111],
    8892: [0.19444, 0.69224, 0, 0, 0.61111],
    8901: [0, 0.54986, 0, 0, 0.27778],
    8903: [0.08167, 0.58167, 0, 0, 0.77778],
    8905: [0.08167, 0.58167, 0, 0, 0.77778],
    8906: [0.08167, 0.58167, 0, 0, 0.77778],
    8907: [0, 0.69224, 0, 0, 0.77778],
    8908: [0, 0.69224, 0, 0, 0.77778],
    8909: [-0.03598, 0.46402, 0, 0, 0.77778],
    8910: [0, 0.54986, 0, 0, 0.76042],
    8911: [0, 0.54986, 0, 0, 0.76042],
    8912: [0.03517, 0.54986, 0, 0, 0.77778],
    8913: [0.03517, 0.54986, 0, 0, 0.77778],
    8914: [0, 0.54986, 0, 0, 0.66667],
    8915: [0, 0.54986, 0, 0, 0.66667],
    8916: [0, 0.69224, 0, 0, 0.66667],
    8918: [0.0391, 0.5391, 0, 0, 0.77778],
    8919: [0.0391, 0.5391, 0, 0, 0.77778],
    8920: [0.03517, 0.54986, 0, 0, 1.33334],
    8921: [0.03517, 0.54986, 0, 0, 1.33334],
    8922: [0.38569, 0.88569, 0, 0, 0.77778],
    8923: [0.38569, 0.88569, 0, 0, 0.77778],
    8926: [0.13667, 0.63667, 0, 0, 0.77778],
    8927: [0.13667, 0.63667, 0, 0, 0.77778],
    8928: [0.30274, 0.79383, 0, 0, 0.77778],
    8929: [0.30274, 0.79383, 0, 0, 0.77778],
    8934: [0.23222, 0.74111, 0, 0, 0.77778],
    8935: [0.23222, 0.74111, 0, 0, 0.77778],
    8936: [0.23222, 0.74111, 0, 0, 0.77778],
    8937: [0.23222, 0.74111, 0, 0, 0.77778],
    8938: [0.20576, 0.70576, 0, 0, 0.77778],
    8939: [0.20576, 0.70576, 0, 0, 0.77778],
    8940: [0.30274, 0.79383, 0, 0, 0.77778],
    8941: [0.30274, 0.79383, 0, 0, 0.77778],
    8994: [0.19444, 0.69224, 0, 0, 0.77778],
    8995: [0.19444, 0.69224, 0, 0, 0.77778],
    9416: [0.15559, 0.69224, 0, 0, 0.90222],
    9484: [0, 0.69224, 0, 0, 0.5],
    9488: [0, 0.69224, 0, 0, 0.5],
    9492: [0, 0.37788, 0, 0, 0.5],
    9496: [0, 0.37788, 0, 0, 0.5],
    9585: [0.19444, 0.68889, 0, 0, 0.88889],
    9586: [0.19444, 0.74111, 0, 0, 0.88889],
    9632: [0, 0.675, 0, 0, 0.77778],
    9633: [0, 0.675, 0, 0, 0.77778],
    9650: [0, 0.54986, 0, 0, 0.72222],
    9651: [0, 0.54986, 0, 0, 0.72222],
    9654: [0.03517, 0.54986, 0, 0, 0.77778],
    9660: [0, 0.54986, 0, 0, 0.72222],
    9661: [0, 0.54986, 0, 0, 0.72222],
    9664: [0.03517, 0.54986, 0, 0, 0.77778],
    9674: [0.11111, 0.69224, 0, 0, 0.66667],
    9733: [0.19444, 0.69224, 0, 0, 0.94445],
    10003: [0, 0.69224, 0, 0, 0.83334],
    10016: [0, 0.69224, 0, 0, 0.83334],
    10731: [0.11111, 0.69224, 0, 0, 0.66667],
    10846: [0.19444, 0.75583, 0, 0, 0.61111],
    10877: [0.13667, 0.63667, 0, 0, 0.77778],
    10878: [0.13667, 0.63667, 0, 0, 0.77778],
    10885: [0.25583, 0.75583, 0, 0, 0.77778],
    10886: [0.25583, 0.75583, 0, 0, 0.77778],
    10887: [0.13597, 0.63597, 0, 0, 0.77778],
    10888: [0.13597, 0.63597, 0, 0, 0.77778],
    10889: [0.26167, 0.75726, 0, 0, 0.77778],
    10890: [0.26167, 0.75726, 0, 0, 0.77778],
    10891: [0.48256, 0.98256, 0, 0, 0.77778],
    10892: [0.48256, 0.98256, 0, 0, 0.77778],
    10901: [0.13667, 0.63667, 0, 0, 0.77778],
    10902: [0.13667, 0.63667, 0, 0, 0.77778],
    10933: [0.25142, 0.75726, 0, 0, 0.77778],
    10934: [0.25142, 0.75726, 0, 0, 0.77778],
    10935: [0.26167, 0.75726, 0, 0, 0.77778],
    10936: [0.26167, 0.75726, 0, 0, 0.77778],
    10937: [0.26167, 0.75726, 0, 0, 0.77778],
    10938: [0.26167, 0.75726, 0, 0, 0.77778],
    10949: [0.25583, 0.75583, 0, 0, 0.77778],
    10950: [0.25583, 0.75583, 0, 0, 0.77778],
    10955: [0.28481, 0.79383, 0, 0, 0.77778],
    10956: [0.28481, 0.79383, 0, 0, 0.77778],
    57350: [0.08167, 0.58167, 0, 0, 0.22222],
    57351: [0.08167, 0.58167, 0, 0, 0.38889],
    57352: [0.08167, 0.58167, 0, 0, 0.77778],
    57353: [0, 0.43056, 0.04028, 0, 0.66667],
    57356: [0.25142, 0.75726, 0, 0, 0.77778],
    57357: [0.25142, 0.75726, 0, 0, 0.77778],
    57358: [0.41951, 0.91951, 0, 0, 0.77778],
    57359: [0.30274, 0.79383, 0, 0, 0.77778],
    57360: [0.30274, 0.79383, 0, 0, 0.77778],
    57361: [0.41951, 0.91951, 0, 0, 0.77778],
    57366: [0.25142, 0.75726, 0, 0, 0.77778],
    57367: [0.25142, 0.75726, 0, 0, 0.77778],
    57368: [0.25142, 0.75726, 0, 0, 0.77778],
    57369: [0.25142, 0.75726, 0, 0, 0.77778],
    57370: [0.13597, 0.63597, 0, 0, 0.77778],
    57371: [0.13597, 0.63597, 0, 0, 0.77778]
  },
  "Caligraphic-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68333, 0, 0.19445, 0.79847],
    66: [0, 0.68333, 0.03041, 0.13889, 0.65681],
    67: [0, 0.68333, 0.05834, 0.13889, 0.52653],
    68: [0, 0.68333, 0.02778, 0.08334, 0.77139],
    69: [0, 0.68333, 0.08944, 0.11111, 0.52778],
    70: [0, 0.68333, 0.09931, 0.11111, 0.71875],
    71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
    72: [0, 0.68333, 965e-5, 0.11111, 0.84452],
    73: [0, 0.68333, 0.07382, 0, 0.54452],
    74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
    75: [0, 0.68333, 0.01445, 0.05556, 0.76195],
    76: [0, 0.68333, 0, 0.13889, 0.68972],
    77: [0, 0.68333, 0, 0.13889, 1.2009],
    78: [0, 0.68333, 0.14736, 0.08334, 0.82049],
    79: [0, 0.68333, 0.02778, 0.11111, 0.79611],
    80: [0, 0.68333, 0.08222, 0.08334, 0.69556],
    81: [0.09722, 0.68333, 0, 0.11111, 0.81667],
    82: [0, 0.68333, 0, 0.08334, 0.8475],
    83: [0, 0.68333, 0.075, 0.13889, 0.60556],
    84: [0, 0.68333, 0.25417, 0, 0.54464],
    85: [0, 0.68333, 0.09931, 0.08334, 0.62583],
    86: [0, 0.68333, 0.08222, 0, 0.61278],
    87: [0, 0.68333, 0.08222, 0.08334, 0.98778],
    88: [0, 0.68333, 0.14643, 0.13889, 0.7133],
    89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
    90: [0, 0.68333, 0.07944, 0.13889, 0.72473],
    160: [0, 0, 0, 0, 0.25]
  },
  "Fraktur-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69141, 0, 0, 0.29574],
    34: [0, 0.69141, 0, 0, 0.21471],
    38: [0, 0.69141, 0, 0, 0.73786],
    39: [0, 0.69141, 0, 0, 0.21201],
    40: [0.24982, 0.74947, 0, 0, 0.38865],
    41: [0.24982, 0.74947, 0, 0, 0.38865],
    42: [0, 0.62119, 0, 0, 0.27764],
    43: [0.08319, 0.58283, 0, 0, 0.75623],
    44: [0, 0.10803, 0, 0, 0.27764],
    45: [0.08319, 0.58283, 0, 0, 0.75623],
    46: [0, 0.10803, 0, 0, 0.27764],
    47: [0.24982, 0.74947, 0, 0, 0.50181],
    48: [0, 0.47534, 0, 0, 0.50181],
    49: [0, 0.47534, 0, 0, 0.50181],
    50: [0, 0.47534, 0, 0, 0.50181],
    51: [0.18906, 0.47534, 0, 0, 0.50181],
    52: [0.18906, 0.47534, 0, 0, 0.50181],
    53: [0.18906, 0.47534, 0, 0, 0.50181],
    54: [0, 0.69141, 0, 0, 0.50181],
    55: [0.18906, 0.47534, 0, 0, 0.50181],
    56: [0, 0.69141, 0, 0, 0.50181],
    57: [0.18906, 0.47534, 0, 0, 0.50181],
    58: [0, 0.47534, 0, 0, 0.21606],
    59: [0.12604, 0.47534, 0, 0, 0.21606],
    61: [-0.13099, 0.36866, 0, 0, 0.75623],
    63: [0, 0.69141, 0, 0, 0.36245],
    65: [0, 0.69141, 0, 0, 0.7176],
    66: [0, 0.69141, 0, 0, 0.88397],
    67: [0, 0.69141, 0, 0, 0.61254],
    68: [0, 0.69141, 0, 0, 0.83158],
    69: [0, 0.69141, 0, 0, 0.66278],
    70: [0.12604, 0.69141, 0, 0, 0.61119],
    71: [0, 0.69141, 0, 0, 0.78539],
    72: [0.06302, 0.69141, 0, 0, 0.7203],
    73: [0, 0.69141, 0, 0, 0.55448],
    74: [0.12604, 0.69141, 0, 0, 0.55231],
    75: [0, 0.69141, 0, 0, 0.66845],
    76: [0, 0.69141, 0, 0, 0.66602],
    77: [0, 0.69141, 0, 0, 1.04953],
    78: [0, 0.69141, 0, 0, 0.83212],
    79: [0, 0.69141, 0, 0, 0.82699],
    80: [0.18906, 0.69141, 0, 0, 0.82753],
    81: [0.03781, 0.69141, 0, 0, 0.82699],
    82: [0, 0.69141, 0, 0, 0.82807],
    83: [0, 0.69141, 0, 0, 0.82861],
    84: [0, 0.69141, 0, 0, 0.66899],
    85: [0, 0.69141, 0, 0, 0.64576],
    86: [0, 0.69141, 0, 0, 0.83131],
    87: [0, 0.69141, 0, 0, 1.04602],
    88: [0, 0.69141, 0, 0, 0.71922],
    89: [0.18906, 0.69141, 0, 0, 0.83293],
    90: [0.12604, 0.69141, 0, 0, 0.60201],
    91: [0.24982, 0.74947, 0, 0, 0.27764],
    93: [0.24982, 0.74947, 0, 0, 0.27764],
    94: [0, 0.69141, 0, 0, 0.49965],
    97: [0, 0.47534, 0, 0, 0.50046],
    98: [0, 0.69141, 0, 0, 0.51315],
    99: [0, 0.47534, 0, 0, 0.38946],
    100: [0, 0.62119, 0, 0, 0.49857],
    101: [0, 0.47534, 0, 0, 0.40053],
    102: [0.18906, 0.69141, 0, 0, 0.32626],
    103: [0.18906, 0.47534, 0, 0, 0.5037],
    104: [0.18906, 0.69141, 0, 0, 0.52126],
    105: [0, 0.69141, 0, 0, 0.27899],
    106: [0, 0.69141, 0, 0, 0.28088],
    107: [0, 0.69141, 0, 0, 0.38946],
    108: [0, 0.69141, 0, 0, 0.27953],
    109: [0, 0.47534, 0, 0, 0.76676],
    110: [0, 0.47534, 0, 0, 0.52666],
    111: [0, 0.47534, 0, 0, 0.48885],
    112: [0.18906, 0.52396, 0, 0, 0.50046],
    113: [0.18906, 0.47534, 0, 0, 0.48912],
    114: [0, 0.47534, 0, 0, 0.38919],
    115: [0, 0.47534, 0, 0, 0.44266],
    116: [0, 0.62119, 0, 0, 0.33301],
    117: [0, 0.47534, 0, 0, 0.5172],
    118: [0, 0.52396, 0, 0, 0.5118],
    119: [0, 0.52396, 0, 0, 0.77351],
    120: [0.18906, 0.47534, 0, 0, 0.38865],
    121: [0.18906, 0.47534, 0, 0, 0.49884],
    122: [0.18906, 0.47534, 0, 0, 0.39054],
    160: [0, 0, 0, 0, 0.25],
    8216: [0, 0.69141, 0, 0, 0.21471],
    8217: [0, 0.69141, 0, 0, 0.21471],
    58112: [0, 0.62119, 0, 0, 0.49749],
    58113: [0, 0.62119, 0, 0, 0.4983],
    58114: [0.18906, 0.69141, 0, 0, 0.33328],
    58115: [0.18906, 0.69141, 0, 0, 0.32923],
    58116: [0.18906, 0.47534, 0, 0, 0.50343],
    58117: [0, 0.69141, 0, 0, 0.33301],
    58118: [0, 0.62119, 0, 0, 0.33409],
    58119: [0, 0.47534, 0, 0, 0.50073]
  },
  "Main-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.35],
    34: [0, 0.69444, 0, 0, 0.60278],
    35: [0.19444, 0.69444, 0, 0, 0.95833],
    36: [0.05556, 0.75, 0, 0, 0.575],
    37: [0.05556, 0.75, 0, 0, 0.95833],
    38: [0, 0.69444, 0, 0, 0.89444],
    39: [0, 0.69444, 0, 0, 0.31944],
    40: [0.25, 0.75, 0, 0, 0.44722],
    41: [0.25, 0.75, 0, 0, 0.44722],
    42: [0, 0.75, 0, 0, 0.575],
    43: [0.13333, 0.63333, 0, 0, 0.89444],
    44: [0.19444, 0.15556, 0, 0, 0.31944],
    45: [0, 0.44444, 0, 0, 0.38333],
    46: [0, 0.15556, 0, 0, 0.31944],
    47: [0.25, 0.75, 0, 0, 0.575],
    48: [0, 0.64444, 0, 0, 0.575],
    49: [0, 0.64444, 0, 0, 0.575],
    50: [0, 0.64444, 0, 0, 0.575],
    51: [0, 0.64444, 0, 0, 0.575],
    52: [0, 0.64444, 0, 0, 0.575],
    53: [0, 0.64444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0, 0.64444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0, 0.64444, 0, 0, 0.575],
    58: [0, 0.44444, 0, 0, 0.31944],
    59: [0.19444, 0.44444, 0, 0, 0.31944],
    60: [0.08556, 0.58556, 0, 0, 0.89444],
    61: [-0.10889, 0.39111, 0, 0, 0.89444],
    62: [0.08556, 0.58556, 0, 0, 0.89444],
    63: [0, 0.69444, 0, 0, 0.54305],
    64: [0, 0.69444, 0, 0, 0.89444],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0, 0, 0.81805],
    67: [0, 0.68611, 0, 0, 0.83055],
    68: [0, 0.68611, 0, 0, 0.88194],
    69: [0, 0.68611, 0, 0, 0.75555],
    70: [0, 0.68611, 0, 0, 0.72361],
    71: [0, 0.68611, 0, 0, 0.90416],
    72: [0, 0.68611, 0, 0, 0.9],
    73: [0, 0.68611, 0, 0, 0.43611],
    74: [0, 0.68611, 0, 0, 0.59444],
    75: [0, 0.68611, 0, 0, 0.90138],
    76: [0, 0.68611, 0, 0, 0.69166],
    77: [0, 0.68611, 0, 0, 1.09166],
    78: [0, 0.68611, 0, 0, 0.9],
    79: [0, 0.68611, 0, 0, 0.86388],
    80: [0, 0.68611, 0, 0, 0.78611],
    81: [0.19444, 0.68611, 0, 0, 0.86388],
    82: [0, 0.68611, 0, 0, 0.8625],
    83: [0, 0.68611, 0, 0, 0.63889],
    84: [0, 0.68611, 0, 0, 0.8],
    85: [0, 0.68611, 0, 0, 0.88472],
    86: [0, 0.68611, 0.01597, 0, 0.86944],
    87: [0, 0.68611, 0.01597, 0, 1.18888],
    88: [0, 0.68611, 0, 0, 0.86944],
    89: [0, 0.68611, 0.02875, 0, 0.86944],
    90: [0, 0.68611, 0, 0, 0.70277],
    91: [0.25, 0.75, 0, 0, 0.31944],
    92: [0.25, 0.75, 0, 0, 0.575],
    93: [0.25, 0.75, 0, 0, 0.31944],
    94: [0, 0.69444, 0, 0, 0.575],
    95: [0.31, 0.13444, 0.03194, 0, 0.575],
    97: [0, 0.44444, 0, 0, 0.55902],
    98: [0, 0.69444, 0, 0, 0.63889],
    99: [0, 0.44444, 0, 0, 0.51111],
    100: [0, 0.69444, 0, 0, 0.63889],
    101: [0, 0.44444, 0, 0, 0.52708],
    102: [0, 0.69444, 0.10903, 0, 0.35139],
    103: [0.19444, 0.44444, 0.01597, 0, 0.575],
    104: [0, 0.69444, 0, 0, 0.63889],
    105: [0, 0.69444, 0, 0, 0.31944],
    106: [0.19444, 0.69444, 0, 0, 0.35139],
    107: [0, 0.69444, 0, 0, 0.60694],
    108: [0, 0.69444, 0, 0, 0.31944],
    109: [0, 0.44444, 0, 0, 0.95833],
    110: [0, 0.44444, 0, 0, 0.63889],
    111: [0, 0.44444, 0, 0, 0.575],
    112: [0.19444, 0.44444, 0, 0, 0.63889],
    113: [0.19444, 0.44444, 0, 0, 0.60694],
    114: [0, 0.44444, 0, 0, 0.47361],
    115: [0, 0.44444, 0, 0, 0.45361],
    116: [0, 0.63492, 0, 0, 0.44722],
    117: [0, 0.44444, 0, 0, 0.63889],
    118: [0, 0.44444, 0.01597, 0, 0.60694],
    119: [0, 0.44444, 0.01597, 0, 0.83055],
    120: [0, 0.44444, 0, 0, 0.60694],
    121: [0.19444, 0.44444, 0.01597, 0, 0.60694],
    122: [0, 0.44444, 0, 0, 0.51111],
    123: [0.25, 0.75, 0, 0, 0.575],
    124: [0.25, 0.75, 0, 0, 0.31944],
    125: [0.25, 0.75, 0, 0, 0.575],
    126: [0.35, 0.34444, 0, 0, 0.575],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.86853],
    168: [0, 0.69444, 0, 0, 0.575],
    172: [0, 0.44444, 0, 0, 0.76666],
    176: [0, 0.69444, 0, 0, 0.86944],
    177: [0.13333, 0.63333, 0, 0, 0.89444],
    184: [0.17014, 0, 0, 0, 0.51111],
    198: [0, 0.68611, 0, 0, 1.04166],
    215: [0.13333, 0.63333, 0, 0, 0.89444],
    216: [0.04861, 0.73472, 0, 0, 0.89444],
    223: [0, 0.69444, 0, 0, 0.59722],
    230: [0, 0.44444, 0, 0, 0.83055],
    247: [0.13333, 0.63333, 0, 0, 0.89444],
    248: [0.09722, 0.54167, 0, 0, 0.575],
    305: [0, 0.44444, 0, 0, 0.31944],
    338: [0, 0.68611, 0, 0, 1.16944],
    339: [0, 0.44444, 0, 0, 0.89444],
    567: [0.19444, 0.44444, 0, 0, 0.35139],
    710: [0, 0.69444, 0, 0, 0.575],
    711: [0, 0.63194, 0, 0, 0.575],
    713: [0, 0.59611, 0, 0, 0.575],
    714: [0, 0.69444, 0, 0, 0.575],
    715: [0, 0.69444, 0, 0, 0.575],
    728: [0, 0.69444, 0, 0, 0.575],
    729: [0, 0.69444, 0, 0, 0.31944],
    730: [0, 0.69444, 0, 0, 0.86944],
    732: [0, 0.69444, 0, 0, 0.575],
    733: [0, 0.69444, 0, 0, 0.575],
    915: [0, 0.68611, 0, 0, 0.69166],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0, 0, 0.89444],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0, 0, 0.76666],
    928: [0, 0.68611, 0, 0, 0.9],
    931: [0, 0.68611, 0, 0, 0.83055],
    933: [0, 0.68611, 0, 0, 0.89444],
    934: [0, 0.68611, 0, 0, 0.83055],
    936: [0, 0.68611, 0, 0, 0.89444],
    937: [0, 0.68611, 0, 0, 0.83055],
    8211: [0, 0.44444, 0.03194, 0, 0.575],
    8212: [0, 0.44444, 0.03194, 0, 1.14999],
    8216: [0, 0.69444, 0, 0, 0.31944],
    8217: [0, 0.69444, 0, 0, 0.31944],
    8220: [0, 0.69444, 0, 0, 0.60278],
    8221: [0, 0.69444, 0, 0, 0.60278],
    8224: [0.19444, 0.69444, 0, 0, 0.51111],
    8225: [0.19444, 0.69444, 0, 0, 0.51111],
    8242: [0, 0.55556, 0, 0, 0.34444],
    8407: [0, 0.72444, 0.15486, 0, 0.575],
    8463: [0, 0.69444, 0, 0, 0.66759],
    8465: [0, 0.69444, 0, 0, 0.83055],
    8467: [0, 0.69444, 0, 0, 0.47361],
    8472: [0.19444, 0.44444, 0, 0, 0.74027],
    8476: [0, 0.69444, 0, 0, 0.83055],
    8501: [0, 0.69444, 0, 0, 0.70277],
    8592: [-0.10889, 0.39111, 0, 0, 1.14999],
    8593: [0.19444, 0.69444, 0, 0, 0.575],
    8594: [-0.10889, 0.39111, 0, 0, 1.14999],
    8595: [0.19444, 0.69444, 0, 0, 0.575],
    8596: [-0.10889, 0.39111, 0, 0, 1.14999],
    8597: [0.25, 0.75, 0, 0, 0.575],
    8598: [0.19444, 0.69444, 0, 0, 1.14999],
    8599: [0.19444, 0.69444, 0, 0, 1.14999],
    8600: [0.19444, 0.69444, 0, 0, 1.14999],
    8601: [0.19444, 0.69444, 0, 0, 1.14999],
    8636: [-0.10889, 0.39111, 0, 0, 1.14999],
    8637: [-0.10889, 0.39111, 0, 0, 1.14999],
    8640: [-0.10889, 0.39111, 0, 0, 1.14999],
    8641: [-0.10889, 0.39111, 0, 0, 1.14999],
    8656: [-0.10889, 0.39111, 0, 0, 1.14999],
    8657: [0.19444, 0.69444, 0, 0, 0.70277],
    8658: [-0.10889, 0.39111, 0, 0, 1.14999],
    8659: [0.19444, 0.69444, 0, 0, 0.70277],
    8660: [-0.10889, 0.39111, 0, 0, 1.14999],
    8661: [0.25, 0.75, 0, 0, 0.70277],
    8704: [0, 0.69444, 0, 0, 0.63889],
    8706: [0, 0.69444, 0.06389, 0, 0.62847],
    8707: [0, 0.69444, 0, 0, 0.63889],
    8709: [0.05556, 0.75, 0, 0, 0.575],
    8711: [0, 0.68611, 0, 0, 0.95833],
    8712: [0.08556, 0.58556, 0, 0, 0.76666],
    8715: [0.08556, 0.58556, 0, 0, 0.76666],
    8722: [0.13333, 0.63333, 0, 0, 0.89444],
    8723: [0.13333, 0.63333, 0, 0, 0.89444],
    8725: [0.25, 0.75, 0, 0, 0.575],
    8726: [0.25, 0.75, 0, 0, 0.575],
    8727: [-0.02778, 0.47222, 0, 0, 0.575],
    8728: [-0.02639, 0.47361, 0, 0, 0.575],
    8729: [-0.02639, 0.47361, 0, 0, 0.575],
    8730: [0.18, 0.82, 0, 0, 0.95833],
    8733: [0, 0.44444, 0, 0, 0.89444],
    8734: [0, 0.44444, 0, 0, 1.14999],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.31944],
    8741: [0.25, 0.75, 0, 0, 0.575],
    8743: [0, 0.55556, 0, 0, 0.76666],
    8744: [0, 0.55556, 0, 0, 0.76666],
    8745: [0, 0.55556, 0, 0, 0.76666],
    8746: [0, 0.55556, 0, 0, 0.76666],
    8747: [0.19444, 0.69444, 0.12778, 0, 0.56875],
    8764: [-0.10889, 0.39111, 0, 0, 0.89444],
    8768: [0.19444, 0.69444, 0, 0, 0.31944],
    8771: [222e-5, 0.50222, 0, 0, 0.89444],
    8773: [0.027, 0.638, 0, 0, 0.894],
    8776: [0.02444, 0.52444, 0, 0, 0.89444],
    8781: [222e-5, 0.50222, 0, 0, 0.89444],
    8801: [222e-5, 0.50222, 0, 0, 0.89444],
    8804: [0.19667, 0.69667, 0, 0, 0.89444],
    8805: [0.19667, 0.69667, 0, 0, 0.89444],
    8810: [0.08556, 0.58556, 0, 0, 1.14999],
    8811: [0.08556, 0.58556, 0, 0, 1.14999],
    8826: [0.08556, 0.58556, 0, 0, 0.89444],
    8827: [0.08556, 0.58556, 0, 0, 0.89444],
    8834: [0.08556, 0.58556, 0, 0, 0.89444],
    8835: [0.08556, 0.58556, 0, 0, 0.89444],
    8838: [0.19667, 0.69667, 0, 0, 0.89444],
    8839: [0.19667, 0.69667, 0, 0, 0.89444],
    8846: [0, 0.55556, 0, 0, 0.76666],
    8849: [0.19667, 0.69667, 0, 0, 0.89444],
    8850: [0.19667, 0.69667, 0, 0, 0.89444],
    8851: [0, 0.55556, 0, 0, 0.76666],
    8852: [0, 0.55556, 0, 0, 0.76666],
    8853: [0.13333, 0.63333, 0, 0, 0.89444],
    8854: [0.13333, 0.63333, 0, 0, 0.89444],
    8855: [0.13333, 0.63333, 0, 0, 0.89444],
    8856: [0.13333, 0.63333, 0, 0, 0.89444],
    8857: [0.13333, 0.63333, 0, 0, 0.89444],
    8866: [0, 0.69444, 0, 0, 0.70277],
    8867: [0, 0.69444, 0, 0, 0.70277],
    8868: [0, 0.69444, 0, 0, 0.89444],
    8869: [0, 0.69444, 0, 0, 0.89444],
    8900: [-0.02639, 0.47361, 0, 0, 0.575],
    8901: [-0.02639, 0.47361, 0, 0, 0.31944],
    8902: [-0.02778, 0.47222, 0, 0, 0.575],
    8968: [0.25, 0.75, 0, 0, 0.51111],
    8969: [0.25, 0.75, 0, 0, 0.51111],
    8970: [0.25, 0.75, 0, 0, 0.51111],
    8971: [0.25, 0.75, 0, 0, 0.51111],
    8994: [-0.13889, 0.36111, 0, 0, 1.14999],
    8995: [-0.13889, 0.36111, 0, 0, 1.14999],
    9651: [0.19444, 0.69444, 0, 0, 1.02222],
    9657: [-0.02778, 0.47222, 0, 0, 0.575],
    9661: [0.19444, 0.69444, 0, 0, 1.02222],
    9667: [-0.02778, 0.47222, 0, 0, 0.575],
    9711: [0.19444, 0.69444, 0, 0, 1.14999],
    9824: [0.12963, 0.69444, 0, 0, 0.89444],
    9825: [0.12963, 0.69444, 0, 0, 0.89444],
    9826: [0.12963, 0.69444, 0, 0, 0.89444],
    9827: [0.12963, 0.69444, 0, 0, 0.89444],
    9837: [0, 0.75, 0, 0, 0.44722],
    9838: [0.19444, 0.69444, 0, 0, 0.44722],
    9839: [0.19444, 0.69444, 0, 0, 0.44722],
    10216: [0.25, 0.75, 0, 0, 0.44722],
    10217: [0.25, 0.75, 0, 0, 0.44722],
    10815: [0, 0.68611, 0, 0, 0.9],
    10927: [0.19667, 0.69667, 0, 0, 0.89444],
    10928: [0.19667, 0.69667, 0, 0, 0.89444],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Main-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.11417, 0, 0.38611],
    34: [0, 0.69444, 0.07939, 0, 0.62055],
    35: [0.19444, 0.69444, 0.06833, 0, 0.94444],
    37: [0.05556, 0.75, 0.12861, 0, 0.94444],
    38: [0, 0.69444, 0.08528, 0, 0.88555],
    39: [0, 0.69444, 0.12945, 0, 0.35555],
    40: [0.25, 0.75, 0.15806, 0, 0.47333],
    41: [0.25, 0.75, 0.03306, 0, 0.47333],
    42: [0, 0.75, 0.14333, 0, 0.59111],
    43: [0.10333, 0.60333, 0.03306, 0, 0.88555],
    44: [0.19444, 0.14722, 0, 0, 0.35555],
    45: [0, 0.44444, 0.02611, 0, 0.41444],
    46: [0, 0.14722, 0, 0, 0.35555],
    47: [0.25, 0.75, 0.15806, 0, 0.59111],
    48: [0, 0.64444, 0.13167, 0, 0.59111],
    49: [0, 0.64444, 0.13167, 0, 0.59111],
    50: [0, 0.64444, 0.13167, 0, 0.59111],
    51: [0, 0.64444, 0.13167, 0, 0.59111],
    52: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    53: [0, 0.64444, 0.13167, 0, 0.59111],
    54: [0, 0.64444, 0.13167, 0, 0.59111],
    55: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    56: [0, 0.64444, 0.13167, 0, 0.59111],
    57: [0, 0.64444, 0.13167, 0, 0.59111],
    58: [0, 0.44444, 0.06695, 0, 0.35555],
    59: [0.19444, 0.44444, 0.06695, 0, 0.35555],
    61: [-0.10889, 0.39111, 0.06833, 0, 0.88555],
    63: [0, 0.69444, 0.11472, 0, 0.59111],
    64: [0, 0.69444, 0.09208, 0, 0.88555],
    65: [0, 0.68611, 0, 0, 0.86555],
    66: [0, 0.68611, 0.0992, 0, 0.81666],
    67: [0, 0.68611, 0.14208, 0, 0.82666],
    68: [0, 0.68611, 0.09062, 0, 0.87555],
    69: [0, 0.68611, 0.11431, 0, 0.75666],
    70: [0, 0.68611, 0.12903, 0, 0.72722],
    71: [0, 0.68611, 0.07347, 0, 0.89527],
    72: [0, 0.68611, 0.17208, 0, 0.8961],
    73: [0, 0.68611, 0.15681, 0, 0.47166],
    74: [0, 0.68611, 0.145, 0, 0.61055],
    75: [0, 0.68611, 0.14208, 0, 0.89499],
    76: [0, 0.68611, 0, 0, 0.69777],
    77: [0, 0.68611, 0.17208, 0, 1.07277],
    78: [0, 0.68611, 0.17208, 0, 0.8961],
    79: [0, 0.68611, 0.09062, 0, 0.85499],
    80: [0, 0.68611, 0.0992, 0, 0.78721],
    81: [0.19444, 0.68611, 0.09062, 0, 0.85499],
    82: [0, 0.68611, 0.02559, 0, 0.85944],
    83: [0, 0.68611, 0.11264, 0, 0.64999],
    84: [0, 0.68611, 0.12903, 0, 0.7961],
    85: [0, 0.68611, 0.17208, 0, 0.88083],
    86: [0, 0.68611, 0.18625, 0, 0.86555],
    87: [0, 0.68611, 0.18625, 0, 1.15999],
    88: [0, 0.68611, 0.15681, 0, 0.86555],
    89: [0, 0.68611, 0.19803, 0, 0.86555],
    90: [0, 0.68611, 0.14208, 0, 0.70888],
    91: [0.25, 0.75, 0.1875, 0, 0.35611],
    93: [0.25, 0.75, 0.09972, 0, 0.35611],
    94: [0, 0.69444, 0.06709, 0, 0.59111],
    95: [0.31, 0.13444, 0.09811, 0, 0.59111],
    97: [0, 0.44444, 0.09426, 0, 0.59111],
    98: [0, 0.69444, 0.07861, 0, 0.53222],
    99: [0, 0.44444, 0.05222, 0, 0.53222],
    100: [0, 0.69444, 0.10861, 0, 0.59111],
    101: [0, 0.44444, 0.085, 0, 0.53222],
    102: [0.19444, 0.69444, 0.21778, 0, 0.4],
    103: [0.19444, 0.44444, 0.105, 0, 0.53222],
    104: [0, 0.69444, 0.09426, 0, 0.59111],
    105: [0, 0.69326, 0.11387, 0, 0.35555],
    106: [0.19444, 0.69326, 0.1672, 0, 0.35555],
    107: [0, 0.69444, 0.11111, 0, 0.53222],
    108: [0, 0.69444, 0.10861, 0, 0.29666],
    109: [0, 0.44444, 0.09426, 0, 0.94444],
    110: [0, 0.44444, 0.09426, 0, 0.64999],
    111: [0, 0.44444, 0.07861, 0, 0.59111],
    112: [0.19444, 0.44444, 0.07861, 0, 0.59111],
    113: [0.19444, 0.44444, 0.105, 0, 0.53222],
    114: [0, 0.44444, 0.11111, 0, 0.50167],
    115: [0, 0.44444, 0.08167, 0, 0.48694],
    116: [0, 0.63492, 0.09639, 0, 0.385],
    117: [0, 0.44444, 0.09426, 0, 0.62055],
    118: [0, 0.44444, 0.11111, 0, 0.53222],
    119: [0, 0.44444, 0.11111, 0, 0.76777],
    120: [0, 0.44444, 0.12583, 0, 0.56055],
    121: [0.19444, 0.44444, 0.105, 0, 0.56166],
    122: [0, 0.44444, 0.13889, 0, 0.49055],
    126: [0.35, 0.34444, 0.11472, 0, 0.59111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0.11473, 0, 0.59111],
    176: [0, 0.69444, 0, 0, 0.94888],
    184: [0.17014, 0, 0, 0, 0.53222],
    198: [0, 0.68611, 0.11431, 0, 1.02277],
    216: [0.04861, 0.73472, 0.09062, 0, 0.88555],
    223: [0.19444, 0.69444, 0.09736, 0, 0.665],
    230: [0, 0.44444, 0.085, 0, 0.82666],
    248: [0.09722, 0.54167, 0.09458, 0, 0.59111],
    305: [0, 0.44444, 0.09426, 0, 0.35555],
    338: [0, 0.68611, 0.11431, 0, 1.14054],
    339: [0, 0.44444, 0.085, 0, 0.82666],
    567: [0.19444, 0.44444, 0.04611, 0, 0.385],
    710: [0, 0.69444, 0.06709, 0, 0.59111],
    711: [0, 0.63194, 0.08271, 0, 0.59111],
    713: [0, 0.59444, 0.10444, 0, 0.59111],
    714: [0, 0.69444, 0.08528, 0, 0.59111],
    715: [0, 0.69444, 0, 0, 0.59111],
    728: [0, 0.69444, 0.10333, 0, 0.59111],
    729: [0, 0.69444, 0.12945, 0, 0.35555],
    730: [0, 0.69444, 0, 0, 0.94888],
    732: [0, 0.69444, 0.11472, 0, 0.59111],
    733: [0, 0.69444, 0.11472, 0, 0.59111],
    915: [0, 0.68611, 0.12903, 0, 0.69777],
    916: [0, 0.68611, 0, 0, 0.94444],
    920: [0, 0.68611, 0.09062, 0, 0.88555],
    923: [0, 0.68611, 0, 0, 0.80666],
    926: [0, 0.68611, 0.15092, 0, 0.76777],
    928: [0, 0.68611, 0.17208, 0, 0.8961],
    931: [0, 0.68611, 0.11431, 0, 0.82666],
    933: [0, 0.68611, 0.10778, 0, 0.88555],
    934: [0, 0.68611, 0.05632, 0, 0.82666],
    936: [0, 0.68611, 0.10778, 0, 0.88555],
    937: [0, 0.68611, 0.0992, 0, 0.82666],
    8211: [0, 0.44444, 0.09811, 0, 0.59111],
    8212: [0, 0.44444, 0.09811, 0, 1.18221],
    8216: [0, 0.69444, 0.12945, 0, 0.35555],
    8217: [0, 0.69444, 0.12945, 0, 0.35555],
    8220: [0, 0.69444, 0.16772, 0, 0.62055],
    8221: [0, 0.69444, 0.07939, 0, 0.62055]
  },
  "Main-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.12417, 0, 0.30667],
    34: [0, 0.69444, 0.06961, 0, 0.51444],
    35: [0.19444, 0.69444, 0.06616, 0, 0.81777],
    37: [0.05556, 0.75, 0.13639, 0, 0.81777],
    38: [0, 0.69444, 0.09694, 0, 0.76666],
    39: [0, 0.69444, 0.12417, 0, 0.30667],
    40: [0.25, 0.75, 0.16194, 0, 0.40889],
    41: [0.25, 0.75, 0.03694, 0, 0.40889],
    42: [0, 0.75, 0.14917, 0, 0.51111],
    43: [0.05667, 0.56167, 0.03694, 0, 0.76666],
    44: [0.19444, 0.10556, 0, 0, 0.30667],
    45: [0, 0.43056, 0.02826, 0, 0.35778],
    46: [0, 0.10556, 0, 0, 0.30667],
    47: [0.25, 0.75, 0.16194, 0, 0.51111],
    48: [0, 0.64444, 0.13556, 0, 0.51111],
    49: [0, 0.64444, 0.13556, 0, 0.51111],
    50: [0, 0.64444, 0.13556, 0, 0.51111],
    51: [0, 0.64444, 0.13556, 0, 0.51111],
    52: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    53: [0, 0.64444, 0.13556, 0, 0.51111],
    54: [0, 0.64444, 0.13556, 0, 0.51111],
    55: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    56: [0, 0.64444, 0.13556, 0, 0.51111],
    57: [0, 0.64444, 0.13556, 0, 0.51111],
    58: [0, 0.43056, 0.0582, 0, 0.30667],
    59: [0.19444, 0.43056, 0.0582, 0, 0.30667],
    61: [-0.13313, 0.36687, 0.06616, 0, 0.76666],
    63: [0, 0.69444, 0.1225, 0, 0.51111],
    64: [0, 0.69444, 0.09597, 0, 0.76666],
    65: [0, 0.68333, 0, 0, 0.74333],
    66: [0, 0.68333, 0.10257, 0, 0.70389],
    67: [0, 0.68333, 0.14528, 0, 0.71555],
    68: [0, 0.68333, 0.09403, 0, 0.755],
    69: [0, 0.68333, 0.12028, 0, 0.67833],
    70: [0, 0.68333, 0.13305, 0, 0.65277],
    71: [0, 0.68333, 0.08722, 0, 0.77361],
    72: [0, 0.68333, 0.16389, 0, 0.74333],
    73: [0, 0.68333, 0.15806, 0, 0.38555],
    74: [0, 0.68333, 0.14028, 0, 0.525],
    75: [0, 0.68333, 0.14528, 0, 0.76888],
    76: [0, 0.68333, 0, 0, 0.62722],
    77: [0, 0.68333, 0.16389, 0, 0.89666],
    78: [0, 0.68333, 0.16389, 0, 0.74333],
    79: [0, 0.68333, 0.09403, 0, 0.76666],
    80: [0, 0.68333, 0.10257, 0, 0.67833],
    81: [0.19444, 0.68333, 0.09403, 0, 0.76666],
    82: [0, 0.68333, 0.03868, 0, 0.72944],
    83: [0, 0.68333, 0.11972, 0, 0.56222],
    84: [0, 0.68333, 0.13305, 0, 0.71555],
    85: [0, 0.68333, 0.16389, 0, 0.74333],
    86: [0, 0.68333, 0.18361, 0, 0.74333],
    87: [0, 0.68333, 0.18361, 0, 0.99888],
    88: [0, 0.68333, 0.15806, 0, 0.74333],
    89: [0, 0.68333, 0.19383, 0, 0.74333],
    90: [0, 0.68333, 0.14528, 0, 0.61333],
    91: [0.25, 0.75, 0.1875, 0, 0.30667],
    93: [0.25, 0.75, 0.10528, 0, 0.30667],
    94: [0, 0.69444, 0.06646, 0, 0.51111],
    95: [0.31, 0.12056, 0.09208, 0, 0.51111],
    97: [0, 0.43056, 0.07671, 0, 0.51111],
    98: [0, 0.69444, 0.06312, 0, 0.46],
    99: [0, 0.43056, 0.05653, 0, 0.46],
    100: [0, 0.69444, 0.10333, 0, 0.51111],
    101: [0, 0.43056, 0.07514, 0, 0.46],
    102: [0.19444, 0.69444, 0.21194, 0, 0.30667],
    103: [0.19444, 0.43056, 0.08847, 0, 0.46],
    104: [0, 0.69444, 0.07671, 0, 0.51111],
    105: [0, 0.65536, 0.1019, 0, 0.30667],
    106: [0.19444, 0.65536, 0.14467, 0, 0.30667],
    107: [0, 0.69444, 0.10764, 0, 0.46],
    108: [0, 0.69444, 0.10333, 0, 0.25555],
    109: [0, 0.43056, 0.07671, 0, 0.81777],
    110: [0, 0.43056, 0.07671, 0, 0.56222],
    111: [0, 0.43056, 0.06312, 0, 0.51111],
    112: [0.19444, 0.43056, 0.06312, 0, 0.51111],
    113: [0.19444, 0.43056, 0.08847, 0, 0.46],
    114: [0, 0.43056, 0.10764, 0, 0.42166],
    115: [0, 0.43056, 0.08208, 0, 0.40889],
    116: [0, 0.61508, 0.09486, 0, 0.33222],
    117: [0, 0.43056, 0.07671, 0, 0.53666],
    118: [0, 0.43056, 0.10764, 0, 0.46],
    119: [0, 0.43056, 0.10764, 0, 0.66444],
    120: [0, 0.43056, 0.12042, 0, 0.46389],
    121: [0.19444, 0.43056, 0.08847, 0, 0.48555],
    122: [0, 0.43056, 0.12292, 0, 0.40889],
    126: [0.35, 0.31786, 0.11585, 0, 0.51111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.66786, 0.10474, 0, 0.51111],
    176: [0, 0.69444, 0, 0, 0.83129],
    184: [0.17014, 0, 0, 0, 0.46],
    198: [0, 0.68333, 0.12028, 0, 0.88277],
    216: [0.04861, 0.73194, 0.09403, 0, 0.76666],
    223: [0.19444, 0.69444, 0.10514, 0, 0.53666],
    230: [0, 0.43056, 0.07514, 0, 0.71555],
    248: [0.09722, 0.52778, 0.09194, 0, 0.51111],
    338: [0, 0.68333, 0.12028, 0, 0.98499],
    339: [0, 0.43056, 0.07514, 0, 0.71555],
    710: [0, 0.69444, 0.06646, 0, 0.51111],
    711: [0, 0.62847, 0.08295, 0, 0.51111],
    713: [0, 0.56167, 0.10333, 0, 0.51111],
    714: [0, 0.69444, 0.09694, 0, 0.51111],
    715: [0, 0.69444, 0, 0, 0.51111],
    728: [0, 0.69444, 0.10806, 0, 0.51111],
    729: [0, 0.66786, 0.11752, 0, 0.30667],
    730: [0, 0.69444, 0, 0, 0.83129],
    732: [0, 0.66786, 0.11585, 0, 0.51111],
    733: [0, 0.69444, 0.1225, 0, 0.51111],
    915: [0, 0.68333, 0.13305, 0, 0.62722],
    916: [0, 0.68333, 0, 0, 0.81777],
    920: [0, 0.68333, 0.09403, 0, 0.76666],
    923: [0, 0.68333, 0, 0, 0.69222],
    926: [0, 0.68333, 0.15294, 0, 0.66444],
    928: [0, 0.68333, 0.16389, 0, 0.74333],
    931: [0, 0.68333, 0.12028, 0, 0.71555],
    933: [0, 0.68333, 0.11111, 0, 0.76666],
    934: [0, 0.68333, 0.05986, 0, 0.71555],
    936: [0, 0.68333, 0.11111, 0, 0.76666],
    937: [0, 0.68333, 0.10257, 0, 0.71555],
    8211: [0, 0.43056, 0.09208, 0, 0.51111],
    8212: [0, 0.43056, 0.09208, 0, 1.02222],
    8216: [0, 0.69444, 0.12417, 0, 0.30667],
    8217: [0, 0.69444, 0.12417, 0, 0.30667],
    8220: [0, 0.69444, 0.1685, 0, 0.51444],
    8221: [0, 0.69444, 0.06961, 0, 0.51444],
    8463: [0, 0.68889, 0, 0, 0.54028]
  },
  "Main-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.27778],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.77778],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.19444, 0.10556, 0, 0, 0.27778],
    45: [0, 0.43056, 0, 0, 0.33333],
    46: [0, 0.10556, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.64444, 0, 0, 0.5],
    49: [0, 0.64444, 0, 0, 0.5],
    50: [0, 0.64444, 0, 0, 0.5],
    51: [0, 0.64444, 0, 0, 0.5],
    52: [0, 0.64444, 0, 0, 0.5],
    53: [0, 0.64444, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0, 0.64444, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0, 0.64444, 0, 0, 0.5],
    58: [0, 0.43056, 0, 0, 0.27778],
    59: [0.19444, 0.43056, 0, 0, 0.27778],
    60: [0.0391, 0.5391, 0, 0, 0.77778],
    61: [-0.13313, 0.36687, 0, 0, 0.77778],
    62: [0.0391, 0.5391, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.77778],
    65: [0, 0.68333, 0, 0, 0.75],
    66: [0, 0.68333, 0, 0, 0.70834],
    67: [0, 0.68333, 0, 0, 0.72222],
    68: [0, 0.68333, 0, 0, 0.76389],
    69: [0, 0.68333, 0, 0, 0.68056],
    70: [0, 0.68333, 0, 0, 0.65278],
    71: [0, 0.68333, 0, 0, 0.78472],
    72: [0, 0.68333, 0, 0, 0.75],
    73: [0, 0.68333, 0, 0, 0.36111],
    74: [0, 0.68333, 0, 0, 0.51389],
    75: [0, 0.68333, 0, 0, 0.77778],
    76: [0, 0.68333, 0, 0, 0.625],
    77: [0, 0.68333, 0, 0, 0.91667],
    78: [0, 0.68333, 0, 0, 0.75],
    79: [0, 0.68333, 0, 0, 0.77778],
    80: [0, 0.68333, 0, 0, 0.68056],
    81: [0.19444, 0.68333, 0, 0, 0.77778],
    82: [0, 0.68333, 0, 0, 0.73611],
    83: [0, 0.68333, 0, 0, 0.55556],
    84: [0, 0.68333, 0, 0, 0.72222],
    85: [0, 0.68333, 0, 0, 0.75],
    86: [0, 0.68333, 0.01389, 0, 0.75],
    87: [0, 0.68333, 0.01389, 0, 1.02778],
    88: [0, 0.68333, 0, 0, 0.75],
    89: [0, 0.68333, 0.025, 0, 0.75],
    90: [0, 0.68333, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.27778],
    92: [0.25, 0.75, 0, 0, 0.5],
    93: [0.25, 0.75, 0, 0, 0.27778],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.31, 0.12056, 0.02778, 0, 0.5],
    97: [0, 0.43056, 0, 0, 0.5],
    98: [0, 0.69444, 0, 0, 0.55556],
    99: [0, 0.43056, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.55556],
    101: [0, 0.43056, 0, 0, 0.44445],
    102: [0, 0.69444, 0.07778, 0, 0.30556],
    103: [0.19444, 0.43056, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.55556],
    105: [0, 0.66786, 0, 0, 0.27778],
    106: [0.19444, 0.66786, 0, 0, 0.30556],
    107: [0, 0.69444, 0, 0, 0.52778],
    108: [0, 0.69444, 0, 0, 0.27778],
    109: [0, 0.43056, 0, 0, 0.83334],
    110: [0, 0.43056, 0, 0, 0.55556],
    111: [0, 0.43056, 0, 0, 0.5],
    112: [0.19444, 0.43056, 0, 0, 0.55556],
    113: [0.19444, 0.43056, 0, 0, 0.52778],
    114: [0, 0.43056, 0, 0, 0.39167],
    115: [0, 0.43056, 0, 0, 0.39445],
    116: [0, 0.61508, 0, 0, 0.38889],
    117: [0, 0.43056, 0, 0, 0.55556],
    118: [0, 0.43056, 0.01389, 0, 0.52778],
    119: [0, 0.43056, 0.01389, 0, 0.72222],
    120: [0, 0.43056, 0, 0, 0.52778],
    121: [0.19444, 0.43056, 0.01389, 0, 0.52778],
    122: [0, 0.43056, 0, 0, 0.44445],
    123: [0.25, 0.75, 0, 0, 0.5],
    124: [0.25, 0.75, 0, 0, 0.27778],
    125: [0.25, 0.75, 0, 0, 0.5],
    126: [0.35, 0.31786, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.76909],
    167: [0.19444, 0.69444, 0, 0, 0.44445],
    168: [0, 0.66786, 0, 0, 0.5],
    172: [0, 0.43056, 0, 0, 0.66667],
    176: [0, 0.69444, 0, 0, 0.75],
    177: [0.08333, 0.58333, 0, 0, 0.77778],
    182: [0.19444, 0.69444, 0, 0, 0.61111],
    184: [0.17014, 0, 0, 0, 0.44445],
    198: [0, 0.68333, 0, 0, 0.90278],
    215: [0.08333, 0.58333, 0, 0, 0.77778],
    216: [0.04861, 0.73194, 0, 0, 0.77778],
    223: [0, 0.69444, 0, 0, 0.5],
    230: [0, 0.43056, 0, 0, 0.72222],
    247: [0.08333, 0.58333, 0, 0, 0.77778],
    248: [0.09722, 0.52778, 0, 0, 0.5],
    305: [0, 0.43056, 0, 0, 0.27778],
    338: [0, 0.68333, 0, 0, 1.01389],
    339: [0, 0.43056, 0, 0, 0.77778],
    567: [0.19444, 0.43056, 0, 0, 0.30556],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.62847, 0, 0, 0.5],
    713: [0, 0.56778, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.66786, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.75],
    732: [0, 0.66786, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.68333, 0, 0, 0.625],
    916: [0, 0.68333, 0, 0, 0.83334],
    920: [0, 0.68333, 0, 0, 0.77778],
    923: [0, 0.68333, 0, 0, 0.69445],
    926: [0, 0.68333, 0, 0, 0.66667],
    928: [0, 0.68333, 0, 0, 0.75],
    931: [0, 0.68333, 0, 0, 0.72222],
    933: [0, 0.68333, 0, 0, 0.77778],
    934: [0, 0.68333, 0, 0, 0.72222],
    936: [0, 0.68333, 0, 0, 0.77778],
    937: [0, 0.68333, 0, 0, 0.72222],
    8211: [0, 0.43056, 0.02778, 0, 0.5],
    8212: [0, 0.43056, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5],
    8224: [0.19444, 0.69444, 0, 0, 0.44445],
    8225: [0.19444, 0.69444, 0, 0, 0.44445],
    8230: [0, 0.123, 0, 0, 1.172],
    8242: [0, 0.55556, 0, 0, 0.275],
    8407: [0, 0.71444, 0.15382, 0, 0.5],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8465: [0, 0.69444, 0, 0, 0.72222],
    8467: [0, 0.69444, 0, 0.11111, 0.41667],
    8472: [0.19444, 0.43056, 0, 0.11111, 0.63646],
    8476: [0, 0.69444, 0, 0, 0.72222],
    8501: [0, 0.69444, 0, 0, 0.61111],
    8592: [-0.13313, 0.36687, 0, 0, 1],
    8593: [0.19444, 0.69444, 0, 0, 0.5],
    8594: [-0.13313, 0.36687, 0, 0, 1],
    8595: [0.19444, 0.69444, 0, 0, 0.5],
    8596: [-0.13313, 0.36687, 0, 0, 1],
    8597: [0.25, 0.75, 0, 0, 0.5],
    8598: [0.19444, 0.69444, 0, 0, 1],
    8599: [0.19444, 0.69444, 0, 0, 1],
    8600: [0.19444, 0.69444, 0, 0, 1],
    8601: [0.19444, 0.69444, 0, 0, 1],
    8614: [0.011, 0.511, 0, 0, 1],
    8617: [0.011, 0.511, 0, 0, 1.126],
    8618: [0.011, 0.511, 0, 0, 1.126],
    8636: [-0.13313, 0.36687, 0, 0, 1],
    8637: [-0.13313, 0.36687, 0, 0, 1],
    8640: [-0.13313, 0.36687, 0, 0, 1],
    8641: [-0.13313, 0.36687, 0, 0, 1],
    8652: [0.011, 0.671, 0, 0, 1],
    8656: [-0.13313, 0.36687, 0, 0, 1],
    8657: [0.19444, 0.69444, 0, 0, 0.61111],
    8658: [-0.13313, 0.36687, 0, 0, 1],
    8659: [0.19444, 0.69444, 0, 0, 0.61111],
    8660: [-0.13313, 0.36687, 0, 0, 1],
    8661: [0.25, 0.75, 0, 0, 0.61111],
    8704: [0, 0.69444, 0, 0, 0.55556],
    8706: [0, 0.69444, 0.05556, 0.08334, 0.5309],
    8707: [0, 0.69444, 0, 0, 0.55556],
    8709: [0.05556, 0.75, 0, 0, 0.5],
    8711: [0, 0.68333, 0, 0, 0.83334],
    8712: [0.0391, 0.5391, 0, 0, 0.66667],
    8715: [0.0391, 0.5391, 0, 0, 0.66667],
    8722: [0.08333, 0.58333, 0, 0, 0.77778],
    8723: [0.08333, 0.58333, 0, 0, 0.77778],
    8725: [0.25, 0.75, 0, 0, 0.5],
    8726: [0.25, 0.75, 0, 0, 0.5],
    8727: [-0.03472, 0.46528, 0, 0, 0.5],
    8728: [-0.05555, 0.44445, 0, 0, 0.5],
    8729: [-0.05555, 0.44445, 0, 0, 0.5],
    8730: [0.2, 0.8, 0, 0, 0.83334],
    8733: [0, 0.43056, 0, 0, 0.77778],
    8734: [0, 0.43056, 0, 0, 1],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.27778],
    8741: [0.25, 0.75, 0, 0, 0.5],
    8743: [0, 0.55556, 0, 0, 0.66667],
    8744: [0, 0.55556, 0, 0, 0.66667],
    8745: [0, 0.55556, 0, 0, 0.66667],
    8746: [0, 0.55556, 0, 0, 0.66667],
    8747: [0.19444, 0.69444, 0.11111, 0, 0.41667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8768: [0.19444, 0.69444, 0, 0, 0.27778],
    8771: [-0.03625, 0.46375, 0, 0, 0.77778],
    8773: [-0.022, 0.589, 0, 0, 0.778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8781: [-0.03625, 0.46375, 0, 0, 0.77778],
    8784: [-0.133, 0.673, 0, 0, 0.778],
    8801: [-0.03625, 0.46375, 0, 0, 0.77778],
    8804: [0.13597, 0.63597, 0, 0, 0.77778],
    8805: [0.13597, 0.63597, 0, 0, 0.77778],
    8810: [0.0391, 0.5391, 0, 0, 1],
    8811: [0.0391, 0.5391, 0, 0, 1],
    8826: [0.0391, 0.5391, 0, 0, 0.77778],
    8827: [0.0391, 0.5391, 0, 0, 0.77778],
    8834: [0.0391, 0.5391, 0, 0, 0.77778],
    8835: [0.0391, 0.5391, 0, 0, 0.77778],
    8838: [0.13597, 0.63597, 0, 0, 0.77778],
    8839: [0.13597, 0.63597, 0, 0, 0.77778],
    8846: [0, 0.55556, 0, 0, 0.66667],
    8849: [0.13597, 0.63597, 0, 0, 0.77778],
    8850: [0.13597, 0.63597, 0, 0, 0.77778],
    8851: [0, 0.55556, 0, 0, 0.66667],
    8852: [0, 0.55556, 0, 0, 0.66667],
    8853: [0.08333, 0.58333, 0, 0, 0.77778],
    8854: [0.08333, 0.58333, 0, 0, 0.77778],
    8855: [0.08333, 0.58333, 0, 0, 0.77778],
    8856: [0.08333, 0.58333, 0, 0, 0.77778],
    8857: [0.08333, 0.58333, 0, 0, 0.77778],
    8866: [0, 0.69444, 0, 0, 0.61111],
    8867: [0, 0.69444, 0, 0, 0.61111],
    8868: [0, 0.69444, 0, 0, 0.77778],
    8869: [0, 0.69444, 0, 0, 0.77778],
    8872: [0.249, 0.75, 0, 0, 0.867],
    8900: [-0.05555, 0.44445, 0, 0, 0.5],
    8901: [-0.05555, 0.44445, 0, 0, 0.27778],
    8902: [-0.03472, 0.46528, 0, 0, 0.5],
    8904: [5e-3, 0.505, 0, 0, 0.9],
    8942: [0.03, 0.903, 0, 0, 0.278],
    8943: [-0.19, 0.313, 0, 0, 1.172],
    8945: [-0.1, 0.823, 0, 0, 1.282],
    8968: [0.25, 0.75, 0, 0, 0.44445],
    8969: [0.25, 0.75, 0, 0, 0.44445],
    8970: [0.25, 0.75, 0, 0, 0.44445],
    8971: [0.25, 0.75, 0, 0, 0.44445],
    8994: [-0.14236, 0.35764, 0, 0, 1],
    8995: [-0.14236, 0.35764, 0, 0, 1],
    9136: [0.244, 0.744, 0, 0, 0.412],
    9137: [0.244, 0.745, 0, 0, 0.412],
    9651: [0.19444, 0.69444, 0, 0, 0.88889],
    9657: [-0.03472, 0.46528, 0, 0, 0.5],
    9661: [0.19444, 0.69444, 0, 0, 0.88889],
    9667: [-0.03472, 0.46528, 0, 0, 0.5],
    9711: [0.19444, 0.69444, 0, 0, 1],
    9824: [0.12963, 0.69444, 0, 0, 0.77778],
    9825: [0.12963, 0.69444, 0, 0, 0.77778],
    9826: [0.12963, 0.69444, 0, 0, 0.77778],
    9827: [0.12963, 0.69444, 0, 0, 0.77778],
    9837: [0, 0.75, 0, 0, 0.38889],
    9838: [0.19444, 0.69444, 0, 0, 0.38889],
    9839: [0.19444, 0.69444, 0, 0, 0.38889],
    10216: [0.25, 0.75, 0, 0, 0.38889],
    10217: [0.25, 0.75, 0, 0, 0.38889],
    10222: [0.244, 0.744, 0, 0, 0.412],
    10223: [0.244, 0.745, 0, 0, 0.412],
    10229: [0.011, 0.511, 0, 0, 1.609],
    10230: [0.011, 0.511, 0, 0, 1.638],
    10231: [0.011, 0.511, 0, 0, 1.859],
    10232: [0.024, 0.525, 0, 0, 1.609],
    10233: [0.024, 0.525, 0, 0, 1.638],
    10234: [0.024, 0.525, 0, 0, 1.858],
    10236: [0.011, 0.511, 0, 0, 1.638],
    10815: [0, 0.68333, 0, 0, 0.75],
    10927: [0.13597, 0.63597, 0, 0, 0.77778],
    10928: [0.13597, 0.63597, 0, 0, 0.77778],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Math-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.44444, 0, 0, 0.575],
    49: [0, 0.44444, 0, 0, 0.575],
    50: [0, 0.44444, 0, 0, 0.575],
    51: [0.19444, 0.44444, 0, 0, 0.575],
    52: [0.19444, 0.44444, 0, 0, 0.575],
    53: [0.19444, 0.44444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0.19444, 0.44444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0.19444, 0.44444, 0, 0, 0.575],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0.04835, 0, 0.8664],
    67: [0, 0.68611, 0.06979, 0, 0.81694],
    68: [0, 0.68611, 0.03194, 0, 0.93812],
    69: [0, 0.68611, 0.05451, 0, 0.81007],
    70: [0, 0.68611, 0.15972, 0, 0.68889],
    71: [0, 0.68611, 0, 0, 0.88673],
    72: [0, 0.68611, 0.08229, 0, 0.98229],
    73: [0, 0.68611, 0.07778, 0, 0.51111],
    74: [0, 0.68611, 0.10069, 0, 0.63125],
    75: [0, 0.68611, 0.06979, 0, 0.97118],
    76: [0, 0.68611, 0, 0, 0.75555],
    77: [0, 0.68611, 0.11424, 0, 1.14201],
    78: [0, 0.68611, 0.11424, 0, 0.95034],
    79: [0, 0.68611, 0.03194, 0, 0.83666],
    80: [0, 0.68611, 0.15972, 0, 0.72309],
    81: [0.19444, 0.68611, 0, 0, 0.86861],
    82: [0, 0.68611, 421e-5, 0, 0.87235],
    83: [0, 0.68611, 0.05382, 0, 0.69271],
    84: [0, 0.68611, 0.15972, 0, 0.63663],
    85: [0, 0.68611, 0.11424, 0, 0.80027],
    86: [0, 0.68611, 0.25555, 0, 0.67778],
    87: [0, 0.68611, 0.15972, 0, 1.09305],
    88: [0, 0.68611, 0.07778, 0, 0.94722],
    89: [0, 0.68611, 0.25555, 0, 0.67458],
    90: [0, 0.68611, 0.06979, 0, 0.77257],
    97: [0, 0.44444, 0, 0, 0.63287],
    98: [0, 0.69444, 0, 0, 0.52083],
    99: [0, 0.44444, 0, 0, 0.51342],
    100: [0, 0.69444, 0, 0, 0.60972],
    101: [0, 0.44444, 0, 0, 0.55361],
    102: [0.19444, 0.69444, 0.11042, 0, 0.56806],
    103: [0.19444, 0.44444, 0.03704, 0, 0.5449],
    104: [0, 0.69444, 0, 0, 0.66759],
    105: [0, 0.69326, 0, 0, 0.4048],
    106: [0.19444, 0.69326, 0.0622, 0, 0.47083],
    107: [0, 0.69444, 0.01852, 0, 0.6037],
    108: [0, 0.69444, 88e-4, 0, 0.34815],
    109: [0, 0.44444, 0, 0, 1.0324],
    110: [0, 0.44444, 0, 0, 0.71296],
    111: [0, 0.44444, 0, 0, 0.58472],
    112: [0.19444, 0.44444, 0, 0, 0.60092],
    113: [0.19444, 0.44444, 0.03704, 0, 0.54213],
    114: [0, 0.44444, 0.03194, 0, 0.5287],
    115: [0, 0.44444, 0, 0, 0.53125],
    116: [0, 0.63492, 0, 0, 0.41528],
    117: [0, 0.44444, 0, 0, 0.68102],
    118: [0, 0.44444, 0.03704, 0, 0.56666],
    119: [0, 0.44444, 0.02778, 0, 0.83148],
    120: [0, 0.44444, 0, 0, 0.65903],
    121: [0.19444, 0.44444, 0.03704, 0, 0.59028],
    122: [0, 0.44444, 0.04213, 0, 0.55509],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68611, 0.15972, 0, 0.65694],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0.03194, 0, 0.86722],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0.07458, 0, 0.84125],
    928: [0, 0.68611, 0.08229, 0, 0.98229],
    931: [0, 0.68611, 0.05451, 0, 0.88507],
    933: [0, 0.68611, 0.15972, 0, 0.67083],
    934: [0, 0.68611, 0, 0, 0.76666],
    936: [0, 0.68611, 0.11653, 0, 0.71402],
    937: [0, 0.68611, 0.04835, 0, 0.8789],
    945: [0, 0.44444, 0, 0, 0.76064],
    946: [0.19444, 0.69444, 0.03403, 0, 0.65972],
    947: [0.19444, 0.44444, 0.06389, 0, 0.59003],
    948: [0, 0.69444, 0.03819, 0, 0.52222],
    949: [0, 0.44444, 0, 0, 0.52882],
    950: [0.19444, 0.69444, 0.06215, 0, 0.50833],
    951: [0.19444, 0.44444, 0.03704, 0, 0.6],
    952: [0, 0.69444, 0.03194, 0, 0.5618],
    953: [0, 0.44444, 0, 0, 0.41204],
    954: [0, 0.44444, 0, 0, 0.66759],
    955: [0, 0.69444, 0, 0, 0.67083],
    956: [0.19444, 0.44444, 0, 0, 0.70787],
    957: [0, 0.44444, 0.06898, 0, 0.57685],
    958: [0.19444, 0.69444, 0.03021, 0, 0.50833],
    959: [0, 0.44444, 0, 0, 0.58472],
    960: [0, 0.44444, 0.03704, 0, 0.68241],
    961: [0.19444, 0.44444, 0, 0, 0.6118],
    962: [0.09722, 0.44444, 0.07917, 0, 0.42361],
    963: [0, 0.44444, 0.03704, 0, 0.68588],
    964: [0, 0.44444, 0.13472, 0, 0.52083],
    965: [0, 0.44444, 0.03704, 0, 0.63055],
    966: [0.19444, 0.44444, 0, 0, 0.74722],
    967: [0.19444, 0.44444, 0, 0, 0.71805],
    968: [0.19444, 0.69444, 0.03704, 0, 0.75833],
    969: [0, 0.44444, 0.03704, 0, 0.71782],
    977: [0, 0.69444, 0, 0, 0.69155],
    981: [0.19444, 0.69444, 0, 0, 0.7125],
    982: [0, 0.44444, 0.03194, 0, 0.975],
    1009: [0.19444, 0.44444, 0, 0, 0.6118],
    1013: [0, 0.44444, 0, 0, 0.48333],
    57649: [0, 0.44444, 0, 0, 0.39352],
    57911: [0.19444, 0.44444, 0, 0, 0.43889]
  },
  "Math-Italic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.43056, 0, 0, 0.5],
    49: [0, 0.43056, 0, 0, 0.5],
    50: [0, 0.43056, 0, 0, 0.5],
    51: [0.19444, 0.43056, 0, 0, 0.5],
    52: [0.19444, 0.43056, 0, 0, 0.5],
    53: [0.19444, 0.43056, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0.19444, 0.43056, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0.19444, 0.43056, 0, 0, 0.5],
    65: [0, 0.68333, 0, 0.13889, 0.75],
    66: [0, 0.68333, 0.05017, 0.08334, 0.75851],
    67: [0, 0.68333, 0.07153, 0.08334, 0.71472],
    68: [0, 0.68333, 0.02778, 0.05556, 0.82792],
    69: [0, 0.68333, 0.05764, 0.08334, 0.7382],
    70: [0, 0.68333, 0.13889, 0.08334, 0.64306],
    71: [0, 0.68333, 0, 0.08334, 0.78625],
    72: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    73: [0, 0.68333, 0.07847, 0.11111, 0.43958],
    74: [0, 0.68333, 0.09618, 0.16667, 0.55451],
    75: [0, 0.68333, 0.07153, 0.05556, 0.84931],
    76: [0, 0.68333, 0, 0.02778, 0.68056],
    77: [0, 0.68333, 0.10903, 0.08334, 0.97014],
    78: [0, 0.68333, 0.10903, 0.08334, 0.80347],
    79: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    80: [0, 0.68333, 0.13889, 0.08334, 0.64201],
    81: [0.19444, 0.68333, 0, 0.08334, 0.79056],
    82: [0, 0.68333, 773e-5, 0.08334, 0.75929],
    83: [0, 0.68333, 0.05764, 0.08334, 0.6132],
    84: [0, 0.68333, 0.13889, 0.08334, 0.58438],
    85: [0, 0.68333, 0.10903, 0.02778, 0.68278],
    86: [0, 0.68333, 0.22222, 0, 0.58333],
    87: [0, 0.68333, 0.13889, 0, 0.94445],
    88: [0, 0.68333, 0.07847, 0.08334, 0.82847],
    89: [0, 0.68333, 0.22222, 0, 0.58056],
    90: [0, 0.68333, 0.07153, 0.08334, 0.68264],
    97: [0, 0.43056, 0, 0, 0.52859],
    98: [0, 0.69444, 0, 0, 0.42917],
    99: [0, 0.43056, 0, 0.05556, 0.43276],
    100: [0, 0.69444, 0, 0.16667, 0.52049],
    101: [0, 0.43056, 0, 0.05556, 0.46563],
    102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
    103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
    104: [0, 0.69444, 0, 0, 0.57616],
    105: [0, 0.65952, 0, 0, 0.34451],
    106: [0.19444, 0.65952, 0.05724, 0, 0.41181],
    107: [0, 0.69444, 0.03148, 0, 0.5206],
    108: [0, 0.69444, 0.01968, 0.08334, 0.29838],
    109: [0, 0.43056, 0, 0, 0.87801],
    110: [0, 0.43056, 0, 0, 0.60023],
    111: [0, 0.43056, 0, 0.05556, 0.48472],
    112: [0.19444, 0.43056, 0, 0.08334, 0.50313],
    113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
    114: [0, 0.43056, 0.02778, 0.05556, 0.45116],
    115: [0, 0.43056, 0, 0.05556, 0.46875],
    116: [0, 0.61508, 0, 0.08334, 0.36111],
    117: [0, 0.43056, 0, 0.02778, 0.57246],
    118: [0, 0.43056, 0.03588, 0.02778, 0.48472],
    119: [0, 0.43056, 0.02691, 0.08334, 0.71592],
    120: [0, 0.43056, 0, 0.02778, 0.57153],
    121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
    122: [0, 0.43056, 0.04398, 0.05556, 0.46505],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68333, 0.13889, 0.08334, 0.61528],
    916: [0, 0.68333, 0, 0.16667, 0.83334],
    920: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    923: [0, 0.68333, 0, 0.16667, 0.69445],
    926: [0, 0.68333, 0.07569, 0.08334, 0.74236],
    928: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    931: [0, 0.68333, 0.05764, 0.08334, 0.77986],
    933: [0, 0.68333, 0.13889, 0.05556, 0.58333],
    934: [0, 0.68333, 0, 0.08334, 0.66667],
    936: [0, 0.68333, 0.11, 0.05556, 0.61222],
    937: [0, 0.68333, 0.05017, 0.08334, 0.7724],
    945: [0, 0.43056, 37e-4, 0.02778, 0.6397],
    946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
    947: [0.19444, 0.43056, 0.05556, 0, 0.51773],
    948: [0, 0.69444, 0.03785, 0.05556, 0.44444],
    949: [0, 0.43056, 0, 0.08334, 0.46632],
    950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
    951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
    952: [0, 0.69444, 0.02778, 0.08334, 0.46944],
    953: [0, 0.43056, 0, 0.05556, 0.35394],
    954: [0, 0.43056, 0, 0, 0.57616],
    955: [0, 0.69444, 0, 0, 0.58334],
    956: [0.19444, 0.43056, 0, 0.02778, 0.60255],
    957: [0, 0.43056, 0.06366, 0.02778, 0.49398],
    958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
    959: [0, 0.43056, 0, 0.05556, 0.48472],
    960: [0, 0.43056, 0.03588, 0, 0.57003],
    961: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
    963: [0, 0.43056, 0.03588, 0, 0.57141],
    964: [0, 0.43056, 0.1132, 0.02778, 0.43715],
    965: [0, 0.43056, 0.03588, 0.02778, 0.54028],
    966: [0.19444, 0.43056, 0, 0.08334, 0.65417],
    967: [0.19444, 0.43056, 0, 0.05556, 0.62569],
    968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
    969: [0, 0.43056, 0.03588, 0, 0.62245],
    977: [0, 0.69444, 0, 0.08334, 0.59144],
    981: [0.19444, 0.69444, 0, 0.08334, 0.59583],
    982: [0, 0.43056, 0.02778, 0, 0.82813],
    1009: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    1013: [0, 0.43056, 0, 0.05556, 0.4059],
    57649: [0, 0.43056, 0, 0.02778, 0.32246],
    57911: [0.19444, 0.43056, 0, 0.08334, 0.38403]
  },
  "SansSerif-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.36667],
    34: [0, 0.69444, 0, 0, 0.55834],
    35: [0.19444, 0.69444, 0, 0, 0.91667],
    36: [0.05556, 0.75, 0, 0, 0.55],
    37: [0.05556, 0.75, 0, 0, 1.02912],
    38: [0, 0.69444, 0, 0, 0.83056],
    39: [0, 0.69444, 0, 0, 0.30556],
    40: [0.25, 0.75, 0, 0, 0.42778],
    41: [0.25, 0.75, 0, 0, 0.42778],
    42: [0, 0.75, 0, 0, 0.55],
    43: [0.11667, 0.61667, 0, 0, 0.85556],
    44: [0.10556, 0.13056, 0, 0, 0.30556],
    45: [0, 0.45833, 0, 0, 0.36667],
    46: [0, 0.13056, 0, 0, 0.30556],
    47: [0.25, 0.75, 0, 0, 0.55],
    48: [0, 0.69444, 0, 0, 0.55],
    49: [0, 0.69444, 0, 0, 0.55],
    50: [0, 0.69444, 0, 0, 0.55],
    51: [0, 0.69444, 0, 0, 0.55],
    52: [0, 0.69444, 0, 0, 0.55],
    53: [0, 0.69444, 0, 0, 0.55],
    54: [0, 0.69444, 0, 0, 0.55],
    55: [0, 0.69444, 0, 0, 0.55],
    56: [0, 0.69444, 0, 0, 0.55],
    57: [0, 0.69444, 0, 0, 0.55],
    58: [0, 0.45833, 0, 0, 0.30556],
    59: [0.10556, 0.45833, 0, 0, 0.30556],
    61: [-0.09375, 0.40625, 0, 0, 0.85556],
    63: [0, 0.69444, 0, 0, 0.51945],
    64: [0, 0.69444, 0, 0, 0.73334],
    65: [0, 0.69444, 0, 0, 0.73334],
    66: [0, 0.69444, 0, 0, 0.73334],
    67: [0, 0.69444, 0, 0, 0.70278],
    68: [0, 0.69444, 0, 0, 0.79445],
    69: [0, 0.69444, 0, 0, 0.64167],
    70: [0, 0.69444, 0, 0, 0.61111],
    71: [0, 0.69444, 0, 0, 0.73334],
    72: [0, 0.69444, 0, 0, 0.79445],
    73: [0, 0.69444, 0, 0, 0.33056],
    74: [0, 0.69444, 0, 0, 0.51945],
    75: [0, 0.69444, 0, 0, 0.76389],
    76: [0, 0.69444, 0, 0, 0.58056],
    77: [0, 0.69444, 0, 0, 0.97778],
    78: [0, 0.69444, 0, 0, 0.79445],
    79: [0, 0.69444, 0, 0, 0.79445],
    80: [0, 0.69444, 0, 0, 0.70278],
    81: [0.10556, 0.69444, 0, 0, 0.79445],
    82: [0, 0.69444, 0, 0, 0.70278],
    83: [0, 0.69444, 0, 0, 0.61111],
    84: [0, 0.69444, 0, 0, 0.73334],
    85: [0, 0.69444, 0, 0, 0.76389],
    86: [0, 0.69444, 0.01528, 0, 0.73334],
    87: [0, 0.69444, 0.01528, 0, 1.03889],
    88: [0, 0.69444, 0, 0, 0.73334],
    89: [0, 0.69444, 0.0275, 0, 0.73334],
    90: [0, 0.69444, 0, 0, 0.67223],
    91: [0.25, 0.75, 0, 0, 0.34306],
    93: [0.25, 0.75, 0, 0, 0.34306],
    94: [0, 0.69444, 0, 0, 0.55],
    95: [0.35, 0.10833, 0.03056, 0, 0.55],
    97: [0, 0.45833, 0, 0, 0.525],
    98: [0, 0.69444, 0, 0, 0.56111],
    99: [0, 0.45833, 0, 0, 0.48889],
    100: [0, 0.69444, 0, 0, 0.56111],
    101: [0, 0.45833, 0, 0, 0.51111],
    102: [0, 0.69444, 0.07639, 0, 0.33611],
    103: [0.19444, 0.45833, 0.01528, 0, 0.55],
    104: [0, 0.69444, 0, 0, 0.56111],
    105: [0, 0.69444, 0, 0, 0.25556],
    106: [0.19444, 0.69444, 0, 0, 0.28611],
    107: [0, 0.69444, 0, 0, 0.53056],
    108: [0, 0.69444, 0, 0, 0.25556],
    109: [0, 0.45833, 0, 0, 0.86667],
    110: [0, 0.45833, 0, 0, 0.56111],
    111: [0, 0.45833, 0, 0, 0.55],
    112: [0.19444, 0.45833, 0, 0, 0.56111],
    113: [0.19444, 0.45833, 0, 0, 0.56111],
    114: [0, 0.45833, 0.01528, 0, 0.37222],
    115: [0, 0.45833, 0, 0, 0.42167],
    116: [0, 0.58929, 0, 0, 0.40417],
    117: [0, 0.45833, 0, 0, 0.56111],
    118: [0, 0.45833, 0.01528, 0, 0.5],
    119: [0, 0.45833, 0.01528, 0, 0.74445],
    120: [0, 0.45833, 0, 0, 0.5],
    121: [0.19444, 0.45833, 0.01528, 0, 0.5],
    122: [0, 0.45833, 0, 0, 0.47639],
    126: [0.35, 0.34444, 0, 0, 0.55],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0, 0, 0.55],
    176: [0, 0.69444, 0, 0, 0.73334],
    180: [0, 0.69444, 0, 0, 0.55],
    184: [0.17014, 0, 0, 0, 0.48889],
    305: [0, 0.45833, 0, 0, 0.25556],
    567: [0.19444, 0.45833, 0, 0, 0.28611],
    710: [0, 0.69444, 0, 0, 0.55],
    711: [0, 0.63542, 0, 0, 0.55],
    713: [0, 0.63778, 0, 0, 0.55],
    728: [0, 0.69444, 0, 0, 0.55],
    729: [0, 0.69444, 0, 0, 0.30556],
    730: [0, 0.69444, 0, 0, 0.73334],
    732: [0, 0.69444, 0, 0, 0.55],
    733: [0, 0.69444, 0, 0, 0.55],
    915: [0, 0.69444, 0, 0, 0.58056],
    916: [0, 0.69444, 0, 0, 0.91667],
    920: [0, 0.69444, 0, 0, 0.85556],
    923: [0, 0.69444, 0, 0, 0.67223],
    926: [0, 0.69444, 0, 0, 0.73334],
    928: [0, 0.69444, 0, 0, 0.79445],
    931: [0, 0.69444, 0, 0, 0.79445],
    933: [0, 0.69444, 0, 0, 0.85556],
    934: [0, 0.69444, 0, 0, 0.79445],
    936: [0, 0.69444, 0, 0, 0.85556],
    937: [0, 0.69444, 0, 0, 0.79445],
    8211: [0, 0.45833, 0.03056, 0, 0.55],
    8212: [0, 0.45833, 0.03056, 0, 1.10001],
    8216: [0, 0.69444, 0, 0, 0.30556],
    8217: [0, 0.69444, 0, 0, 0.30556],
    8220: [0, 0.69444, 0, 0, 0.55834],
    8221: [0, 0.69444, 0, 0, 0.55834]
  },
  "SansSerif-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.05733, 0, 0.31945],
    34: [0, 0.69444, 316e-5, 0, 0.5],
    35: [0.19444, 0.69444, 0.05087, 0, 0.83334],
    36: [0.05556, 0.75, 0.11156, 0, 0.5],
    37: [0.05556, 0.75, 0.03126, 0, 0.83334],
    38: [0, 0.69444, 0.03058, 0, 0.75834],
    39: [0, 0.69444, 0.07816, 0, 0.27778],
    40: [0.25, 0.75, 0.13164, 0, 0.38889],
    41: [0.25, 0.75, 0.02536, 0, 0.38889],
    42: [0, 0.75, 0.11775, 0, 0.5],
    43: [0.08333, 0.58333, 0.02536, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0.01946, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0.13164, 0, 0.5],
    48: [0, 0.65556, 0.11156, 0, 0.5],
    49: [0, 0.65556, 0.11156, 0, 0.5],
    50: [0, 0.65556, 0.11156, 0, 0.5],
    51: [0, 0.65556, 0.11156, 0, 0.5],
    52: [0, 0.65556, 0.11156, 0, 0.5],
    53: [0, 0.65556, 0.11156, 0, 0.5],
    54: [0, 0.65556, 0.11156, 0, 0.5],
    55: [0, 0.65556, 0.11156, 0, 0.5],
    56: [0, 0.65556, 0.11156, 0, 0.5],
    57: [0, 0.65556, 0.11156, 0, 0.5],
    58: [0, 0.44444, 0.02502, 0, 0.27778],
    59: [0.125, 0.44444, 0.02502, 0, 0.27778],
    61: [-0.13, 0.37, 0.05087, 0, 0.77778],
    63: [0, 0.69444, 0.11809, 0, 0.47222],
    64: [0, 0.69444, 0.07555, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0.08293, 0, 0.66667],
    67: [0, 0.69444, 0.11983, 0, 0.63889],
    68: [0, 0.69444, 0.07555, 0, 0.72223],
    69: [0, 0.69444, 0.11983, 0, 0.59722],
    70: [0, 0.69444, 0.13372, 0, 0.56945],
    71: [0, 0.69444, 0.11983, 0, 0.66667],
    72: [0, 0.69444, 0.08094, 0, 0.70834],
    73: [0, 0.69444, 0.13372, 0, 0.27778],
    74: [0, 0.69444, 0.08094, 0, 0.47222],
    75: [0, 0.69444, 0.11983, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0.08094, 0, 0.875],
    78: [0, 0.69444, 0.08094, 0, 0.70834],
    79: [0, 0.69444, 0.07555, 0, 0.73611],
    80: [0, 0.69444, 0.08293, 0, 0.63889],
    81: [0.125, 0.69444, 0.07555, 0, 0.73611],
    82: [0, 0.69444, 0.08293, 0, 0.64584],
    83: [0, 0.69444, 0.09205, 0, 0.55556],
    84: [0, 0.69444, 0.13372, 0, 0.68056],
    85: [0, 0.69444, 0.08094, 0, 0.6875],
    86: [0, 0.69444, 0.1615, 0, 0.66667],
    87: [0, 0.69444, 0.1615, 0, 0.94445],
    88: [0, 0.69444, 0.13372, 0, 0.66667],
    89: [0, 0.69444, 0.17261, 0, 0.66667],
    90: [0, 0.69444, 0.11983, 0, 0.61111],
    91: [0.25, 0.75, 0.15942, 0, 0.28889],
    93: [0.25, 0.75, 0.08719, 0, 0.28889],
    94: [0, 0.69444, 0.0799, 0, 0.5],
    95: [0.35, 0.09444, 0.08616, 0, 0.5],
    97: [0, 0.44444, 981e-5, 0, 0.48056],
    98: [0, 0.69444, 0.03057, 0, 0.51667],
    99: [0, 0.44444, 0.08336, 0, 0.44445],
    100: [0, 0.69444, 0.09483, 0, 0.51667],
    101: [0, 0.44444, 0.06778, 0, 0.44445],
    102: [0, 0.69444, 0.21705, 0, 0.30556],
    103: [0.19444, 0.44444, 0.10836, 0, 0.5],
    104: [0, 0.69444, 0.01778, 0, 0.51667],
    105: [0, 0.67937, 0.09718, 0, 0.23889],
    106: [0.19444, 0.67937, 0.09162, 0, 0.26667],
    107: [0, 0.69444, 0.08336, 0, 0.48889],
    108: [0, 0.69444, 0.09483, 0, 0.23889],
    109: [0, 0.44444, 0.01778, 0, 0.79445],
    110: [0, 0.44444, 0.01778, 0, 0.51667],
    111: [0, 0.44444, 0.06613, 0, 0.5],
    112: [0.19444, 0.44444, 0.0389, 0, 0.51667],
    113: [0.19444, 0.44444, 0.04169, 0, 0.51667],
    114: [0, 0.44444, 0.10836, 0, 0.34167],
    115: [0, 0.44444, 0.0778, 0, 0.38333],
    116: [0, 0.57143, 0.07225, 0, 0.36111],
    117: [0, 0.44444, 0.04169, 0, 0.51667],
    118: [0, 0.44444, 0.10836, 0, 0.46111],
    119: [0, 0.44444, 0.10836, 0, 0.68334],
    120: [0, 0.44444, 0.09169, 0, 0.46111],
    121: [0.19444, 0.44444, 0.10836, 0, 0.46111],
    122: [0, 0.44444, 0.08752, 0, 0.43472],
    126: [0.35, 0.32659, 0.08826, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0.06385, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.73752],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0.04169, 0, 0.23889],
    567: [0.19444, 0.44444, 0.04169, 0, 0.26667],
    710: [0, 0.69444, 0.0799, 0, 0.5],
    711: [0, 0.63194, 0.08432, 0, 0.5],
    713: [0, 0.60889, 0.08776, 0, 0.5],
    714: [0, 0.69444, 0.09205, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0.09483, 0, 0.5],
    729: [0, 0.67937, 0.07774, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.73752],
    732: [0, 0.67659, 0.08826, 0, 0.5],
    733: [0, 0.69444, 0.09205, 0, 0.5],
    915: [0, 0.69444, 0.13372, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0.07555, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0.12816, 0, 0.66667],
    928: [0, 0.69444, 0.08094, 0, 0.70834],
    931: [0, 0.69444, 0.11983, 0, 0.72222],
    933: [0, 0.69444, 0.09031, 0, 0.77778],
    934: [0, 0.69444, 0.04603, 0, 0.72222],
    936: [0, 0.69444, 0.09031, 0, 0.77778],
    937: [0, 0.69444, 0.08293, 0, 0.72222],
    8211: [0, 0.44444, 0.08616, 0, 0.5],
    8212: [0, 0.44444, 0.08616, 0, 1],
    8216: [0, 0.69444, 0.07816, 0, 0.27778],
    8217: [0, 0.69444, 0.07816, 0, 0.27778],
    8220: [0, 0.69444, 0.14205, 0, 0.5],
    8221: [0, 0.69444, 316e-5, 0, 0.5]
  },
  "SansSerif-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.31945],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.75834],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.65556, 0, 0, 0.5],
    49: [0, 0.65556, 0, 0, 0.5],
    50: [0, 0.65556, 0, 0, 0.5],
    51: [0, 0.65556, 0, 0, 0.5],
    52: [0, 0.65556, 0, 0, 0.5],
    53: [0, 0.65556, 0, 0, 0.5],
    54: [0, 0.65556, 0, 0, 0.5],
    55: [0, 0.65556, 0, 0, 0.5],
    56: [0, 0.65556, 0, 0, 0.5],
    57: [0, 0.65556, 0, 0, 0.5],
    58: [0, 0.44444, 0, 0, 0.27778],
    59: [0.125, 0.44444, 0, 0, 0.27778],
    61: [-0.13, 0.37, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0, 0, 0.66667],
    67: [0, 0.69444, 0, 0, 0.63889],
    68: [0, 0.69444, 0, 0, 0.72223],
    69: [0, 0.69444, 0, 0, 0.59722],
    70: [0, 0.69444, 0, 0, 0.56945],
    71: [0, 0.69444, 0, 0, 0.66667],
    72: [0, 0.69444, 0, 0, 0.70834],
    73: [0, 0.69444, 0, 0, 0.27778],
    74: [0, 0.69444, 0, 0, 0.47222],
    75: [0, 0.69444, 0, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0, 0, 0.875],
    78: [0, 0.69444, 0, 0, 0.70834],
    79: [0, 0.69444, 0, 0, 0.73611],
    80: [0, 0.69444, 0, 0, 0.63889],
    81: [0.125, 0.69444, 0, 0, 0.73611],
    82: [0, 0.69444, 0, 0, 0.64584],
    83: [0, 0.69444, 0, 0, 0.55556],
    84: [0, 0.69444, 0, 0, 0.68056],
    85: [0, 0.69444, 0, 0, 0.6875],
    86: [0, 0.69444, 0.01389, 0, 0.66667],
    87: [0, 0.69444, 0.01389, 0, 0.94445],
    88: [0, 0.69444, 0, 0, 0.66667],
    89: [0, 0.69444, 0.025, 0, 0.66667],
    90: [0, 0.69444, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.28889],
    93: [0.25, 0.75, 0, 0, 0.28889],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.35, 0.09444, 0.02778, 0, 0.5],
    97: [0, 0.44444, 0, 0, 0.48056],
    98: [0, 0.69444, 0, 0, 0.51667],
    99: [0, 0.44444, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.51667],
    101: [0, 0.44444, 0, 0, 0.44445],
    102: [0, 0.69444, 0.06944, 0, 0.30556],
    103: [0.19444, 0.44444, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.51667],
    105: [0, 0.67937, 0, 0, 0.23889],
    106: [0.19444, 0.67937, 0, 0, 0.26667],
    107: [0, 0.69444, 0, 0, 0.48889],
    108: [0, 0.69444, 0, 0, 0.23889],
    109: [0, 0.44444, 0, 0, 0.79445],
    110: [0, 0.44444, 0, 0, 0.51667],
    111: [0, 0.44444, 0, 0, 0.5],
    112: [0.19444, 0.44444, 0, 0, 0.51667],
    113: [0.19444, 0.44444, 0, 0, 0.51667],
    114: [0, 0.44444, 0.01389, 0, 0.34167],
    115: [0, 0.44444, 0, 0, 0.38333],
    116: [0, 0.57143, 0, 0, 0.36111],
    117: [0, 0.44444, 0, 0, 0.51667],
    118: [0, 0.44444, 0.01389, 0, 0.46111],
    119: [0, 0.44444, 0.01389, 0, 0.68334],
    120: [0, 0.44444, 0, 0, 0.46111],
    121: [0.19444, 0.44444, 0.01389, 0, 0.46111],
    122: [0, 0.44444, 0, 0, 0.43472],
    126: [0.35, 0.32659, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.66667],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0, 0, 0.23889],
    567: [0.19444, 0.44444, 0, 0, 0.26667],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.63194, 0, 0, 0.5],
    713: [0, 0.60889, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.67937, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.66667],
    732: [0, 0.67659, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.69444, 0, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0, 0, 0.66667],
    928: [0, 0.69444, 0, 0, 0.70834],
    931: [0, 0.69444, 0, 0, 0.72222],
    933: [0, 0.69444, 0, 0, 0.77778],
    934: [0, 0.69444, 0, 0, 0.72222],
    936: [0, 0.69444, 0, 0, 0.77778],
    937: [0, 0.69444, 0, 0, 0.72222],
    8211: [0, 0.44444, 0.02778, 0, 0.5],
    8212: [0, 0.44444, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5]
  },
  "Script-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.7, 0.22925, 0, 0.80253],
    66: [0, 0.7, 0.04087, 0, 0.90757],
    67: [0, 0.7, 0.1689, 0, 0.66619],
    68: [0, 0.7, 0.09371, 0, 0.77443],
    69: [0, 0.7, 0.18583, 0, 0.56162],
    70: [0, 0.7, 0.13634, 0, 0.89544],
    71: [0, 0.7, 0.17322, 0, 0.60961],
    72: [0, 0.7, 0.29694, 0, 0.96919],
    73: [0, 0.7, 0.19189, 0, 0.80907],
    74: [0.27778, 0.7, 0.19189, 0, 1.05159],
    75: [0, 0.7, 0.31259, 0, 0.91364],
    76: [0, 0.7, 0.19189, 0, 0.87373],
    77: [0, 0.7, 0.15981, 0, 1.08031],
    78: [0, 0.7, 0.3525, 0, 0.9015],
    79: [0, 0.7, 0.08078, 0, 0.73787],
    80: [0, 0.7, 0.08078, 0, 1.01262],
    81: [0, 0.7, 0.03305, 0, 0.88282],
    82: [0, 0.7, 0.06259, 0, 0.85],
    83: [0, 0.7, 0.19189, 0, 0.86767],
    84: [0, 0.7, 0.29087, 0, 0.74697],
    85: [0, 0.7, 0.25815, 0, 0.79996],
    86: [0, 0.7, 0.27523, 0, 0.62204],
    87: [0, 0.7, 0.27523, 0, 0.80532],
    88: [0, 0.7, 0.26006, 0, 0.94445],
    89: [0, 0.7, 0.2939, 0, 0.70961],
    90: [0, 0.7, 0.24037, 0, 0.8212],
    160: [0, 0, 0, 0, 0.25]
  },
  "Size1-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.35001, 0.85, 0, 0, 0.45834],
    41: [0.35001, 0.85, 0, 0, 0.45834],
    47: [0.35001, 0.85, 0, 0, 0.57778],
    91: [0.35001, 0.85, 0, 0, 0.41667],
    92: [0.35001, 0.85, 0, 0, 0.57778],
    93: [0.35001, 0.85, 0, 0, 0.41667],
    123: [0.35001, 0.85, 0, 0, 0.58334],
    125: [0.35001, 0.85, 0, 0, 0.58334],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.72222, 0, 0, 0.55556],
    732: [0, 0.72222, 0, 0, 0.55556],
    770: [0, 0.72222, 0, 0, 0.55556],
    771: [0, 0.72222, 0, 0, 0.55556],
    8214: [-99e-5, 0.601, 0, 0, 0.77778],
    8593: [1e-5, 0.6, 0, 0, 0.66667],
    8595: [1e-5, 0.6, 0, 0, 0.66667],
    8657: [1e-5, 0.6, 0, 0, 0.77778],
    8659: [1e-5, 0.6, 0, 0, 0.77778],
    8719: [0.25001, 0.75, 0, 0, 0.94445],
    8720: [0.25001, 0.75, 0, 0, 0.94445],
    8721: [0.25001, 0.75, 0, 0, 1.05556],
    8730: [0.35001, 0.85, 0, 0, 1],
    8739: [-599e-5, 0.606, 0, 0, 0.33333],
    8741: [-599e-5, 0.606, 0, 0, 0.55556],
    8747: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8748: [0.306, 0.805, 0.19445, 0, 0.47222],
    8749: [0.306, 0.805, 0.19445, 0, 0.47222],
    8750: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8896: [0.25001, 0.75, 0, 0, 0.83334],
    8897: [0.25001, 0.75, 0, 0, 0.83334],
    8898: [0.25001, 0.75, 0, 0, 0.83334],
    8899: [0.25001, 0.75, 0, 0, 0.83334],
    8968: [0.35001, 0.85, 0, 0, 0.47222],
    8969: [0.35001, 0.85, 0, 0, 0.47222],
    8970: [0.35001, 0.85, 0, 0, 0.47222],
    8971: [0.35001, 0.85, 0, 0, 0.47222],
    9168: [-99e-5, 0.601, 0, 0, 0.66667],
    10216: [0.35001, 0.85, 0, 0, 0.47222],
    10217: [0.35001, 0.85, 0, 0, 0.47222],
    10752: [0.25001, 0.75, 0, 0, 1.11111],
    10753: [0.25001, 0.75, 0, 0, 1.11111],
    10754: [0.25001, 0.75, 0, 0, 1.11111],
    10756: [0.25001, 0.75, 0, 0, 0.83334],
    10758: [0.25001, 0.75, 0, 0, 0.83334]
  },
  "Size2-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.65002, 1.15, 0, 0, 0.59722],
    41: [0.65002, 1.15, 0, 0, 0.59722],
    47: [0.65002, 1.15, 0, 0, 0.81111],
    91: [0.65002, 1.15, 0, 0, 0.47222],
    92: [0.65002, 1.15, 0, 0, 0.81111],
    93: [0.65002, 1.15, 0, 0, 0.47222],
    123: [0.65002, 1.15, 0, 0, 0.66667],
    125: [0.65002, 1.15, 0, 0, 0.66667],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1],
    732: [0, 0.75, 0, 0, 1],
    770: [0, 0.75, 0, 0, 1],
    771: [0, 0.75, 0, 0, 1],
    8719: [0.55001, 1.05, 0, 0, 1.27778],
    8720: [0.55001, 1.05, 0, 0, 1.27778],
    8721: [0.55001, 1.05, 0, 0, 1.44445],
    8730: [0.65002, 1.15, 0, 0, 1],
    8747: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8748: [0.862, 1.36, 0.44445, 0, 0.55556],
    8749: [0.862, 1.36, 0.44445, 0, 0.55556],
    8750: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8896: [0.55001, 1.05, 0, 0, 1.11111],
    8897: [0.55001, 1.05, 0, 0, 1.11111],
    8898: [0.55001, 1.05, 0, 0, 1.11111],
    8899: [0.55001, 1.05, 0, 0, 1.11111],
    8968: [0.65002, 1.15, 0, 0, 0.52778],
    8969: [0.65002, 1.15, 0, 0, 0.52778],
    8970: [0.65002, 1.15, 0, 0, 0.52778],
    8971: [0.65002, 1.15, 0, 0, 0.52778],
    10216: [0.65002, 1.15, 0, 0, 0.61111],
    10217: [0.65002, 1.15, 0, 0, 0.61111],
    10752: [0.55001, 1.05, 0, 0, 1.51112],
    10753: [0.55001, 1.05, 0, 0, 1.51112],
    10754: [0.55001, 1.05, 0, 0, 1.51112],
    10756: [0.55001, 1.05, 0, 0, 1.11111],
    10758: [0.55001, 1.05, 0, 0, 1.11111]
  },
  "Size3-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.95003, 1.45, 0, 0, 0.73611],
    41: [0.95003, 1.45, 0, 0, 0.73611],
    47: [0.95003, 1.45, 0, 0, 1.04445],
    91: [0.95003, 1.45, 0, 0, 0.52778],
    92: [0.95003, 1.45, 0, 0, 1.04445],
    93: [0.95003, 1.45, 0, 0, 0.52778],
    123: [0.95003, 1.45, 0, 0, 0.75],
    125: [0.95003, 1.45, 0, 0, 0.75],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1.44445],
    732: [0, 0.75, 0, 0, 1.44445],
    770: [0, 0.75, 0, 0, 1.44445],
    771: [0, 0.75, 0, 0, 1.44445],
    8730: [0.95003, 1.45, 0, 0, 1],
    8968: [0.95003, 1.45, 0, 0, 0.58334],
    8969: [0.95003, 1.45, 0, 0, 0.58334],
    8970: [0.95003, 1.45, 0, 0, 0.58334],
    8971: [0.95003, 1.45, 0, 0, 0.58334],
    10216: [0.95003, 1.45, 0, 0, 0.75],
    10217: [0.95003, 1.45, 0, 0, 0.75]
  },
  "Size4-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [1.25003, 1.75, 0, 0, 0.79167],
    41: [1.25003, 1.75, 0, 0, 0.79167],
    47: [1.25003, 1.75, 0, 0, 1.27778],
    91: [1.25003, 1.75, 0, 0, 0.58334],
    92: [1.25003, 1.75, 0, 0, 1.27778],
    93: [1.25003, 1.75, 0, 0, 0.58334],
    123: [1.25003, 1.75, 0, 0, 0.80556],
    125: [1.25003, 1.75, 0, 0, 0.80556],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.825, 0, 0, 1.8889],
    732: [0, 0.825, 0, 0, 1.8889],
    770: [0, 0.825, 0, 0, 1.8889],
    771: [0, 0.825, 0, 0, 1.8889],
    8730: [1.25003, 1.75, 0, 0, 1],
    8968: [1.25003, 1.75, 0, 0, 0.63889],
    8969: [1.25003, 1.75, 0, 0, 0.63889],
    8970: [1.25003, 1.75, 0, 0, 0.63889],
    8971: [1.25003, 1.75, 0, 0, 0.63889],
    9115: [0.64502, 1.155, 0, 0, 0.875],
    9116: [1e-5, 0.6, 0, 0, 0.875],
    9117: [0.64502, 1.155, 0, 0, 0.875],
    9118: [0.64502, 1.155, 0, 0, 0.875],
    9119: [1e-5, 0.6, 0, 0, 0.875],
    9120: [0.64502, 1.155, 0, 0, 0.875],
    9121: [0.64502, 1.155, 0, 0, 0.66667],
    9122: [-99e-5, 0.601, 0, 0, 0.66667],
    9123: [0.64502, 1.155, 0, 0, 0.66667],
    9124: [0.64502, 1.155, 0, 0, 0.66667],
    9125: [-99e-5, 0.601, 0, 0, 0.66667],
    9126: [0.64502, 1.155, 0, 0, 0.66667],
    9127: [1e-5, 0.9, 0, 0, 0.88889],
    9128: [0.65002, 1.15, 0, 0, 0.88889],
    9129: [0.90001, 0, 0, 0, 0.88889],
    9130: [0, 0.3, 0, 0, 0.88889],
    9131: [1e-5, 0.9, 0, 0, 0.88889],
    9132: [0.65002, 1.15, 0, 0, 0.88889],
    9133: [0.90001, 0, 0, 0, 0.88889],
    9143: [0.88502, 0.915, 0, 0, 1.05556],
    10216: [1.25003, 1.75, 0, 0, 0.80556],
    10217: [1.25003, 1.75, 0, 0, 0.80556],
    57344: [-499e-5, 0.605, 0, 0, 1.05556],
    57345: [-499e-5, 0.605, 0, 0, 1.05556],
    57680: [0, 0.12, 0, 0, 0.45],
    57681: [0, 0.12, 0, 0, 0.45],
    57682: [0, 0.12, 0, 0, 0.45],
    57683: [0, 0.12, 0, 0, 0.45]
  },
  "Typewriter-Regular": {
    32: [0, 0, 0, 0, 0.525],
    33: [0, 0.61111, 0, 0, 0.525],
    34: [0, 0.61111, 0, 0, 0.525],
    35: [0, 0.61111, 0, 0, 0.525],
    36: [0.08333, 0.69444, 0, 0, 0.525],
    37: [0.08333, 0.69444, 0, 0, 0.525],
    38: [0, 0.61111, 0, 0, 0.525],
    39: [0, 0.61111, 0, 0, 0.525],
    40: [0.08333, 0.69444, 0, 0, 0.525],
    41: [0.08333, 0.69444, 0, 0, 0.525],
    42: [0, 0.52083, 0, 0, 0.525],
    43: [-0.08056, 0.53055, 0, 0, 0.525],
    44: [0.13889, 0.125, 0, 0, 0.525],
    45: [-0.08056, 0.53055, 0, 0, 0.525],
    46: [0, 0.125, 0, 0, 0.525],
    47: [0.08333, 0.69444, 0, 0, 0.525],
    48: [0, 0.61111, 0, 0, 0.525],
    49: [0, 0.61111, 0, 0, 0.525],
    50: [0, 0.61111, 0, 0, 0.525],
    51: [0, 0.61111, 0, 0, 0.525],
    52: [0, 0.61111, 0, 0, 0.525],
    53: [0, 0.61111, 0, 0, 0.525],
    54: [0, 0.61111, 0, 0, 0.525],
    55: [0, 0.61111, 0, 0, 0.525],
    56: [0, 0.61111, 0, 0, 0.525],
    57: [0, 0.61111, 0, 0, 0.525],
    58: [0, 0.43056, 0, 0, 0.525],
    59: [0.13889, 0.43056, 0, 0, 0.525],
    60: [-0.05556, 0.55556, 0, 0, 0.525],
    61: [-0.19549, 0.41562, 0, 0, 0.525],
    62: [-0.05556, 0.55556, 0, 0, 0.525],
    63: [0, 0.61111, 0, 0, 0.525],
    64: [0, 0.61111, 0, 0, 0.525],
    65: [0, 0.61111, 0, 0, 0.525],
    66: [0, 0.61111, 0, 0, 0.525],
    67: [0, 0.61111, 0, 0, 0.525],
    68: [0, 0.61111, 0, 0, 0.525],
    69: [0, 0.61111, 0, 0, 0.525],
    70: [0, 0.61111, 0, 0, 0.525],
    71: [0, 0.61111, 0, 0, 0.525],
    72: [0, 0.61111, 0, 0, 0.525],
    73: [0, 0.61111, 0, 0, 0.525],
    74: [0, 0.61111, 0, 0, 0.525],
    75: [0, 0.61111, 0, 0, 0.525],
    76: [0, 0.61111, 0, 0, 0.525],
    77: [0, 0.61111, 0, 0, 0.525],
    78: [0, 0.61111, 0, 0, 0.525],
    79: [0, 0.61111, 0, 0, 0.525],
    80: [0, 0.61111, 0, 0, 0.525],
    81: [0.13889, 0.61111, 0, 0, 0.525],
    82: [0, 0.61111, 0, 0, 0.525],
    83: [0, 0.61111, 0, 0, 0.525],
    84: [0, 0.61111, 0, 0, 0.525],
    85: [0, 0.61111, 0, 0, 0.525],
    86: [0, 0.61111, 0, 0, 0.525],
    87: [0, 0.61111, 0, 0, 0.525],
    88: [0, 0.61111, 0, 0, 0.525],
    89: [0, 0.61111, 0, 0, 0.525],
    90: [0, 0.61111, 0, 0, 0.525],
    91: [0.08333, 0.69444, 0, 0, 0.525],
    92: [0.08333, 0.69444, 0, 0, 0.525],
    93: [0.08333, 0.69444, 0, 0, 0.525],
    94: [0, 0.61111, 0, 0, 0.525],
    95: [0.09514, 0, 0, 0, 0.525],
    96: [0, 0.61111, 0, 0, 0.525],
    97: [0, 0.43056, 0, 0, 0.525],
    98: [0, 0.61111, 0, 0, 0.525],
    99: [0, 0.43056, 0, 0, 0.525],
    100: [0, 0.61111, 0, 0, 0.525],
    101: [0, 0.43056, 0, 0, 0.525],
    102: [0, 0.61111, 0, 0, 0.525],
    103: [0.22222, 0.43056, 0, 0, 0.525],
    104: [0, 0.61111, 0, 0, 0.525],
    105: [0, 0.61111, 0, 0, 0.525],
    106: [0.22222, 0.61111, 0, 0, 0.525],
    107: [0, 0.61111, 0, 0, 0.525],
    108: [0, 0.61111, 0, 0, 0.525],
    109: [0, 0.43056, 0, 0, 0.525],
    110: [0, 0.43056, 0, 0, 0.525],
    111: [0, 0.43056, 0, 0, 0.525],
    112: [0.22222, 0.43056, 0, 0, 0.525],
    113: [0.22222, 0.43056, 0, 0, 0.525],
    114: [0, 0.43056, 0, 0, 0.525],
    115: [0, 0.43056, 0, 0, 0.525],
    116: [0, 0.55358, 0, 0, 0.525],
    117: [0, 0.43056, 0, 0, 0.525],
    118: [0, 0.43056, 0, 0, 0.525],
    119: [0, 0.43056, 0, 0, 0.525],
    120: [0, 0.43056, 0, 0, 0.525],
    121: [0.22222, 0.43056, 0, 0, 0.525],
    122: [0, 0.43056, 0, 0, 0.525],
    123: [0.08333, 0.69444, 0, 0, 0.525],
    124: [0.08333, 0.69444, 0, 0, 0.525],
    125: [0.08333, 0.69444, 0, 0, 0.525],
    126: [0, 0.61111, 0, 0, 0.525],
    127: [0, 0.61111, 0, 0, 0.525],
    160: [0, 0, 0, 0, 0.525],
    176: [0, 0.61111, 0, 0, 0.525],
    184: [0.19445, 0, 0, 0, 0.525],
    305: [0, 0.43056, 0, 0, 0.525],
    567: [0.22222, 0.43056, 0, 0, 0.525],
    711: [0, 0.56597, 0, 0, 0.525],
    713: [0, 0.56555, 0, 0, 0.525],
    714: [0, 0.61111, 0, 0, 0.525],
    715: [0, 0.61111, 0, 0, 0.525],
    728: [0, 0.61111, 0, 0, 0.525],
    730: [0, 0.61111, 0, 0, 0.525],
    770: [0, 0.61111, 0, 0, 0.525],
    771: [0, 0.61111, 0, 0, 0.525],
    776: [0, 0.61111, 0, 0, 0.525],
    915: [0, 0.61111, 0, 0, 0.525],
    916: [0, 0.61111, 0, 0, 0.525],
    920: [0, 0.61111, 0, 0, 0.525],
    923: [0, 0.61111, 0, 0, 0.525],
    926: [0, 0.61111, 0, 0, 0.525],
    928: [0, 0.61111, 0, 0, 0.525],
    931: [0, 0.61111, 0, 0, 0.525],
    933: [0, 0.61111, 0, 0, 0.525],
    934: [0, 0.61111, 0, 0, 0.525],
    936: [0, 0.61111, 0, 0, 0.525],
    937: [0, 0.61111, 0, 0, 0.525],
    8216: [0, 0.61111, 0, 0, 0.525],
    8217: [0, 0.61111, 0, 0, 0.525],
    8242: [0, 0.61111, 0, 0, 0.525],
    9251: [0.11111, 0.21944, 0, 0, 0.525]
  }
}, e0 = {
  slant: [0.25, 0.25, 0.25],
  // sigma1
  space: [0, 0, 0],
  // sigma2
  stretch: [0, 0, 0],
  // sigma3
  shrink: [0, 0, 0],
  // sigma4
  xHeight: [0.431, 0.431, 0.431],
  // sigma5
  quad: [1, 1.171, 1.472],
  // sigma6
  extraSpace: [0, 0, 0],
  // sigma7
  num1: [0.677, 0.732, 0.925],
  // sigma8
  num2: [0.394, 0.384, 0.387],
  // sigma9
  num3: [0.444, 0.471, 0.504],
  // sigma10
  denom1: [0.686, 0.752, 1.025],
  // sigma11
  denom2: [0.345, 0.344, 0.532],
  // sigma12
  sup1: [0.413, 0.503, 0.504],
  // sigma13
  sup2: [0.363, 0.431, 0.404],
  // sigma14
  sup3: [0.289, 0.286, 0.294],
  // sigma15
  sub1: [0.15, 0.143, 0.2],
  // sigma16
  sub2: [0.247, 0.286, 0.4],
  // sigma17
  supDrop: [0.386, 0.353, 0.494],
  // sigma18
  subDrop: [0.05, 0.071, 0.1],
  // sigma19
  delim1: [2.39, 1.7, 1.98],
  // sigma20
  delim2: [1.01, 1.157, 1.42],
  // sigma21
  axisHeight: [0.25, 0.25, 0.25],
  // sigma22
  // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
  // they correspond to the font parameters of the extension fonts (family 3).
  // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
  // match cmex7, we'd use cmex7.tfm values for script and scriptscript
  // values.
  defaultRuleThickness: [0.04, 0.049, 0.049],
  // xi8; cmex7: 0.049
  bigOpSpacing1: [0.111, 0.111, 0.111],
  // xi9
  bigOpSpacing2: [0.166, 0.166, 0.166],
  // xi10
  bigOpSpacing3: [0.2, 0.2, 0.2],
  // xi11
  bigOpSpacing4: [0.6, 0.611, 0.611],
  // xi12; cmex7: 0.611
  bigOpSpacing5: [0.1, 0.143, 0.143],
  // xi13; cmex7: 0.143
  // The \sqrt rule width is taken from the height of the surd character.
  // Since we use the same font at all sizes, this thickness doesn't scale.
  sqrtRuleThickness: [0.04, 0.04, 0.04],
  // This value determines how large a pt is, for metrics which are defined
  // in terms of pts.
  // This value is also used in katex.scss; if you change it make sure the
  // values match.
  ptPerEm: [10, 10, 10],
  // The space between adjacent `|` columns in an array definition. From
  // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
  doubleRuleSep: [0.2, 0.2, 0.2],
  // The width of separator lines in {array} environments. From
  // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
  arrayRuleWidth: [0.04, 0.04, 0.04],
  // Two values from LaTeX source2e:
  fboxsep: [0.3, 0.3, 0.3],
  //        3 pt / ptPerEm
  fboxrule: [0.04, 0.04, 0.04]
  // 0.4 pt / ptPerEm
}, jr = {
  // Latin-1
  Å: "A",
  Ð: "D",
  Þ: "o",
  å: "a",
  ð: "d",
  þ: "o",
  // Cyrillic
  А: "A",
  Б: "B",
  В: "B",
  Г: "F",
  Д: "A",
  Е: "E",
  Ж: "K",
  З: "3",
  И: "N",
  Й: "N",
  К: "K",
  Л: "N",
  М: "M",
  Н: "H",
  О: "O",
  П: "N",
  Р: "P",
  С: "C",
  Т: "T",
  У: "y",
  Ф: "O",
  Х: "X",
  Ц: "U",
  Ч: "h",
  Ш: "W",
  Щ: "W",
  Ъ: "B",
  Ы: "X",
  Ь: "B",
  Э: "3",
  Ю: "X",
  Я: "R",
  а: "a",
  б: "b",
  в: "a",
  г: "r",
  д: "y",
  е: "e",
  ж: "m",
  з: "e",
  и: "n",
  й: "n",
  к: "n",
  л: "n",
  м: "m",
  н: "n",
  о: "o",
  п: "n",
  р: "p",
  с: "c",
  т: "o",
  у: "y",
  ф: "b",
  х: "x",
  ц: "n",
  ч: "n",
  ш: "w",
  щ: "w",
  ъ: "a",
  ы: "m",
  ь: "a",
  э: "e",
  ю: "m",
  я: "r"
};
function hr(t, e, r) {
  if (!st[e])
    throw new Error("Font metrics not found for font: " + e + ".");
  var n = t.charCodeAt(0), a = st[e][n];
  if (!a && t[0] in jr && (n = jr[t[0]].charCodeAt(0), a = st[e][n]), !a && r === "text" && Jn(n) && (a = st[e][77]), a)
    return {
      depth: a[0],
      height: a[1],
      italic: a[2],
      skew: a[3],
      width: a[4]
    };
}
var E0 = {};
function Rs(t) {
  var e;
  if (t >= 5 ? e = 0 : t >= 3 ? e = 1 : e = 2, !E0[e]) {
    var r = E0[e] = {
      cssEmPerMu: e0.quad[e] / 18
    };
    for (var n in e0)
      e0.hasOwnProperty(n) && (r[n] = e0[n][e]);
  }
  return E0[e];
}
var Ps = [
  // Each element contains [textsize, scriptsize, scriptscriptsize].
  // The size mappings are taken from TeX with \normalsize=10pt.
  [1, 1, 1],
  // size1: [5, 5, 5]              \tiny
  [2, 1, 1],
  // size2: [6, 5, 5]
  [3, 1, 1],
  // size3: [7, 5, 5]              \scriptsize
  [4, 2, 1],
  // size4: [8, 6, 5]              \footnotesize
  [5, 2, 1],
  // size5: [9, 6, 5]              \small
  [6, 3, 1],
  // size6: [10, 7, 5]             \normalsize
  [7, 4, 2],
  // size7: [12, 8, 6]             \large
  [8, 6, 3],
  // size8: [14.4, 10, 7]          \Large
  [9, 7, 6],
  // size9: [17.28, 12, 10]        \LARGE
  [10, 8, 7],
  // size10: [20.74, 14.4, 12]     \huge
  [11, 10, 9]
  // size11: [24.88, 20.74, 17.28] \HUGE
], Yr = [
  // fontMetrics.js:getGlobalMetrics also uses size indexes, so if
  // you change size indexes, change that function.
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
  1.2,
  1.44,
  1.728,
  2.074,
  2.488
], Xr = function(e, r) {
  return r.size < 2 ? e : Ps[e - 1][r.size - 1];
};
class lt {
  // A font family applies to a group of fonts (i.e. SansSerif), while a font
  // represents a specific font (i.e. SansSerif Bold).
  // See: https://tex.stackexchange.com/questions/22350/difference-between-textrm-and-mathrm
  /**
   * The base size index.
   */
  constructor(e) {
    this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = e.style, this.color = e.color, this.size = e.size || lt.BASESIZE, this.textSize = e.textSize || this.size, this.phantom = !!e.phantom, this.font = e.font || "", this.fontFamily = e.fontFamily || "", this.fontWeight = e.fontWeight || "", this.fontShape = e.fontShape || "", this.sizeMultiplier = Yr[this.size - 1], this.maxSize = e.maxSize, this.minRuleThickness = e.minRuleThickness, this._fontMetrics = void 0;
  }
  /**
   * Returns a new options object with the same properties as "this".  Properties
   * from "extension" will be copied to the new options object.
   */
  extend(e) {
    var r = {
      style: this.style,
      size: this.size,
      textSize: this.textSize,
      color: this.color,
      phantom: this.phantom,
      font: this.font,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontShape: this.fontShape,
      maxSize: this.maxSize,
      minRuleThickness: this.minRuleThickness
    };
    for (var n in e)
      e.hasOwnProperty(n) && (r[n] = e[n]);
    return new lt(r);
  }
  /**
   * Return an options object with the given style. If `this.style === style`,
   * returns `this`.
   */
  havingStyle(e) {
    return this.style === e ? this : this.extend({
      style: e,
      size: Xr(this.textSize, e)
    });
  }
  /**
   * Return an options object with a cramped version of the current style. If
   * the current style is cramped, returns `this`.
   */
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  /**
   * Return an options object with the given size and in at least `\textstyle`.
   * Returns `this` if appropriate.
   */
  havingSize(e) {
    return this.size === e && this.textSize === e ? this : this.extend({
      style: this.style.text(),
      size: e,
      textSize: e,
      sizeMultiplier: Yr[e - 1]
    });
  }
  /**
   * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
   * changes to at least `\textstyle`.
   */
  havingBaseStyle(e) {
    e = e || this.style.text();
    var r = Xr(lt.BASESIZE, e);
    return this.size === r && this.textSize === lt.BASESIZE && this.style === e ? this : this.extend({
      style: e,
      size: r
    });
  }
  /**
   * Remove the effect of sizing changes such as \Huge.
   * Keep the effect of the current style, such as \scriptstyle.
   */
  havingBaseSizing() {
    var e;
    switch (this.style.id) {
      case 4:
      case 5:
        e = 3;
        break;
      case 6:
      case 7:
        e = 1;
        break;
      default:
        e = 6;
    }
    return this.extend({
      style: this.style.text(),
      size: e
    });
  }
  /**
   * Create a new options object with the given color.
   */
  withColor(e) {
    return this.extend({
      color: e
    });
  }
  /**
   * Create a new options object with "phantom" set to true.
   */
  withPhantom() {
    return this.extend({
      phantom: !0
    });
  }
  /**
   * Creates a new options object with the given math font or old text font.
   * @type {[type]}
   */
  withFont(e) {
    return this.extend({
      font: e
    });
  }
  /**
   * Create a new options objects with the given fontFamily.
   */
  withTextFontFamily(e) {
    return this.extend({
      fontFamily: e,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontWeight(e) {
    return this.extend({
      fontWeight: e,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontShape(e) {
    return this.extend({
      fontShape: e,
      font: ""
    });
  }
  /**
   * Return the CSS sizing classes required to switch from enclosing options
   * `oldOptions` to `this`. Returns an array of classes.
   */
  sizingClasses(e) {
    return e.size !== this.size ? ["sizing", "reset-size" + e.size, "size" + this.size] : [];
  }
  /**
   * Return the CSS sizing classes required to switch to the base size. Like
   * `this.havingSize(BASESIZE).sizingClasses(this)`.
   */
  baseSizingClasses() {
    return this.size !== lt.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + lt.BASESIZE] : [];
  }
  /**
   * Return the font metrics for this size.
   */
  fontMetrics() {
    return this._fontMetrics || (this._fontMetrics = Rs(this.size)), this._fontMetrics;
  }
  /**
   * Gets the CSS color of the current options object
   */
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
}
lt.BASESIZE = 6;
var J0 = {
  // https://en.wikibooks.org/wiki/LaTeX/Lengths and
  // https://tex.stackexchange.com/a/8263
  pt: 1,
  // TeX point
  mm: 7227 / 2540,
  // millimeter
  cm: 7227 / 254,
  // centimeter
  in: 72.27,
  // inch
  bp: 803 / 800,
  // big (PostScript) points
  pc: 12,
  // pica
  dd: 1238 / 1157,
  // didot
  cc: 14856 / 1157,
  // cicero (12 didot)
  nd: 685 / 642,
  // new didot
  nc: 1370 / 107,
  // new cicero (12 new didot)
  sp: 1 / 65536,
  // scaled point (TeX's internal smallest unit)
  // https://tex.stackexchange.com/a/41371
  px: 803 / 800
  // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX
}, Hs = {
  ex: !0,
  em: !0,
  mu: !0
}, ea = function(e) {
  return typeof e != "string" && (e = e.unit), e in J0 || e in Hs || e === "ex";
}, be = function(e, r) {
  var n;
  if (e.unit in J0)
    n = J0[e.unit] / r.fontMetrics().ptPerEm / r.sizeMultiplier;
  else if (e.unit === "mu")
    n = r.fontMetrics().cssEmPerMu;
  else {
    var a;
    if (r.style.isTight() ? a = r.havingStyle(r.style.text()) : a = r, e.unit === "ex")
      n = a.fontMetrics().xHeight;
    else if (e.unit === "em")
      n = a.fontMetrics().quad;
    else
      throw new R("Invalid unit: '" + e.unit + "'");
    a !== r && (n *= a.sizeMultiplier / r.sizeMultiplier);
  }
  return Math.min(e.number * n, r.maxSize);
}, V = function(e) {
  return +e.toFixed(4) + "em";
}, bt = function(e) {
  return e.filter((r) => r).join(" ");
}, ta = function(e, r, n) {
  if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n || {}, r) {
    r.style.isTight() && this.classes.push("mtight");
    var a = r.getColor();
    a && (this.style.color = a);
  }
}, ra = function(e) {
  var r = document.createElement(e);
  r.className = bt(this.classes);
  for (var n in this.style)
    this.style.hasOwnProperty(n) && (r.style[n] = this.style[n]);
  for (var a in this.attributes)
    this.attributes.hasOwnProperty(a) && r.setAttribute(a, this.attributes[a]);
  for (var i = 0; i < this.children.length; i++)
    r.appendChild(this.children[i].toNode());
  return r;
}, Vs = /[\s"'>/=\x00-\x1f]/, na = function(e) {
  var r = "<" + e;
  this.classes.length && (r += ' class="' + le.escape(bt(this.classes)) + '"');
  var n = "";
  for (var a in this.style)
    this.style.hasOwnProperty(a) && (n += le.hyphenate(a) + ":" + this.style[a] + ";");
  n && (r += ' style="' + le.escape(n) + '"');
  for (var i in this.attributes)
    if (this.attributes.hasOwnProperty(i)) {
      if (Vs.test(i))
        throw new R("Invalid attribute name '" + i + "'");
      r += " " + i + '="' + le.escape(this.attributes[i]) + '"';
    }
  r += ">";
  for (var l = 0; l < this.children.length; l++)
    r += this.children[l].toMarkup();
  return r += "</" + e + ">", r;
};
class x0 {
  constructor(e, r, n, a) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, ta.call(this, e, n, a), this.children = r || [];
  }
  /**
   * Sets an arbitrary attribute on the span. Warning: use this wisely. Not
   * all browsers support attributes the same, and having too many custom
   * attributes is probably bad.
   */
  setAttribute(e, r) {
    this.attributes[e] = r;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return ra.call(this, "span");
  }
  toMarkup() {
    return na.call(this, "span");
  }
}
class aa {
  constructor(e, r, n, a) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, ta.call(this, r, a), this.children = n || [], this.setAttribute("href", e);
  }
  setAttribute(e, r) {
    this.attributes[e] = r;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return ra.call(this, "a");
  }
  toMarkup() {
    return na.call(this, "a");
  }
}
class $s {
  constructor(e, r, n) {
    this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = r, this.src = e, this.classes = ["mord"], this.style = n;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createElement("img");
    e.src = this.src, e.alt = this.alt, e.className = "mord";
    for (var r in this.style)
      this.style.hasOwnProperty(r) && (e.style[r] = this.style[r]);
    return e;
  }
  toMarkup() {
    var e = '<img src="' + le.escape(this.src) + '"' + (' alt="' + le.escape(this.alt) + '"'), r = "";
    for (var n in this.style)
      this.style.hasOwnProperty(n) && (r += le.hyphenate(n) + ":" + this.style[n] + ";");
    return r && (e += ' style="' + le.escape(r) + '"'), e += "'/>", e;
  }
}
var Gs = {
  î: "ı̂",
  ï: "ı̈",
  í: "ı́",
  // 'ī': '\u0131\u0304', // enable when we add Extended Latin
  ì: "ı̀"
};
class Ye {
  constructor(e, r, n, a, i, l, s, o) {
    this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e, this.height = r || 0, this.depth = n || 0, this.italic = a || 0, this.skew = i || 0, this.width = l || 0, this.classes = s || [], this.style = o || {}, this.maxFontSize = 0;
    var m = Ts(this.text.charCodeAt(0));
    m && this.classes.push(m + "_fallback"), /[îïíì]/.test(this.text) && (this.text = Gs[this.text]);
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  /**
   * Creates a text node or span from a symbol node. Note that a span is only
   * created if it is needed.
   */
  toNode() {
    var e = document.createTextNode(this.text), r = null;
    this.italic > 0 && (r = document.createElement("span"), r.style.marginRight = V(this.italic)), this.classes.length > 0 && (r = r || document.createElement("span"), r.className = bt(this.classes));
    for (var n in this.style)
      this.style.hasOwnProperty(n) && (r = r || document.createElement("span"), r.style[n] = this.style[n]);
    return r ? (r.appendChild(e), r) : e;
  }
  /**
   * Creates markup for a symbol node.
   */
  toMarkup() {
    var e = !1, r = "<span";
    this.classes.length && (e = !0, r += ' class="', r += le.escape(bt(this.classes)), r += '"');
    var n = "";
    this.italic > 0 && (n += "margin-right:" + this.italic + "em;");
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (n += le.hyphenate(a) + ":" + this.style[a] + ";");
    n && (e = !0, r += ' style="' + le.escape(n) + '"');
    var i = le.escape(this.text);
    return e ? (r += ">", r += i, r += "</span>", r) : i;
  }
}
class xt {
  constructor(e, r) {
    this.children = void 0, this.attributes = void 0, this.children = e || [], this.attributes = r || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", r = document.createElementNS(e, "svg");
    for (var n in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, n) && r.setAttribute(n, this.attributes[n]);
    for (var a = 0; a < this.children.length; a++)
      r.appendChild(this.children[a].toNode());
    return r;
  }
  toMarkup() {
    var e = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var r in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, r) && (e += " " + r + '="' + le.escape(this.attributes[r]) + '"');
    e += ">";
    for (var n = 0; n < this.children.length; n++)
      e += this.children[n].toMarkup();
    return e += "</svg>", e;
  }
}
class Tt {
  constructor(e, r) {
    this.pathName = void 0, this.alternate = void 0, this.pathName = e, this.alternate = r;
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", r = document.createElementNS(e, "path");
    return this.alternate ? r.setAttribute("d", this.alternate) : r.setAttribute("d", Wr[this.pathName]), r;
  }
  toMarkup() {
    return this.alternate ? '<path d="' + le.escape(this.alternate) + '"/>' : '<path d="' + le.escape(Wr[this.pathName]) + '"/>';
  }
}
class Zr {
  constructor(e) {
    this.attributes = void 0, this.attributes = e || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", r = document.createElementNS(e, "line");
    for (var n in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, n) && r.setAttribute(n, this.attributes[n]);
    return r;
  }
  toMarkup() {
    var e = "<line";
    for (var r in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, r) && (e += " " + r + '="' + le.escape(this.attributes[r]) + '"');
    return e += "/>", e;
  }
}
function Qr(t) {
  if (t instanceof Ye)
    return t;
  throw new Error("Expected symbolNode but got " + String(t) + ".");
}
function Us(t) {
  if (t instanceof x0)
    return t;
  throw new Error("Expected span<HtmlDomNode> but got " + String(t) + ".");
}
var Ws = {
  bin: 1,
  close: 1,
  inner: 1,
  open: 1,
  punct: 1,
  rel: 1
}, js = {
  "accent-token": 1,
  mathord: 1,
  "op-token": 1,
  spacing: 1,
  textord: 1
}, me = {
  math: {},
  text: {}
};
function u(t, e, r, n, a, i) {
  me[t][a] = {
    font: e,
    group: r,
    replace: n
  }, i && n && (me[t][n] = me[t][a]);
}
var h = "math", L = "text", f = "main", x = "ams", ge = "accent-token", W = "bin", Be = "close", Lt = "inner", X = "mathord", we = "op-token", $e = "open", y0 = "punct", y = "rel", ft = "spacing", M = "textord";
u(h, f, y, "≡", "\\equiv", !0);
u(h, f, y, "≺", "\\prec", !0);
u(h, f, y, "≻", "\\succ", !0);
u(h, f, y, "∼", "\\sim", !0);
u(h, f, y, "⊥", "\\perp");
u(h, f, y, "⪯", "\\preceq", !0);
u(h, f, y, "⪰", "\\succeq", !0);
u(h, f, y, "≃", "\\simeq", !0);
u(h, f, y, "∣", "\\mid", !0);
u(h, f, y, "≪", "\\ll", !0);
u(h, f, y, "≫", "\\gg", !0);
u(h, f, y, "≍", "\\asymp", !0);
u(h, f, y, "∥", "\\parallel");
u(h, f, y, "⋈", "\\bowtie", !0);
u(h, f, y, "⌣", "\\smile", !0);
u(h, f, y, "⊑", "\\sqsubseteq", !0);
u(h, f, y, "⊒", "\\sqsupseteq", !0);
u(h, f, y, "≐", "\\doteq", !0);
u(h, f, y, "⌢", "\\frown", !0);
u(h, f, y, "∋", "\\ni", !0);
u(h, f, y, "∝", "\\propto", !0);
u(h, f, y, "⊢", "\\vdash", !0);
u(h, f, y, "⊣", "\\dashv", !0);
u(h, f, y, "∋", "\\owns");
u(h, f, y0, ".", "\\ldotp");
u(h, f, y0, "⋅", "\\cdotp");
u(h, f, M, "#", "\\#");
u(L, f, M, "#", "\\#");
u(h, f, M, "&", "\\&");
u(L, f, M, "&", "\\&");
u(h, f, M, "ℵ", "\\aleph", !0);
u(h, f, M, "∀", "\\forall", !0);
u(h, f, M, "ℏ", "\\hbar", !0);
u(h, f, M, "∃", "\\exists", !0);
u(h, f, M, "∇", "\\nabla", !0);
u(h, f, M, "♭", "\\flat", !0);
u(h, f, M, "ℓ", "\\ell", !0);
u(h, f, M, "♮", "\\natural", !0);
u(h, f, M, "♣", "\\clubsuit", !0);
u(h, f, M, "℘", "\\wp", !0);
u(h, f, M, "♯", "\\sharp", !0);
u(h, f, M, "♢", "\\diamondsuit", !0);
u(h, f, M, "ℜ", "\\Re", !0);
u(h, f, M, "♡", "\\heartsuit", !0);
u(h, f, M, "ℑ", "\\Im", !0);
u(h, f, M, "♠", "\\spadesuit", !0);
u(h, f, M, "§", "\\S", !0);
u(L, f, M, "§", "\\S");
u(h, f, M, "¶", "\\P", !0);
u(L, f, M, "¶", "\\P");
u(h, f, M, "†", "\\dag");
u(L, f, M, "†", "\\dag");
u(L, f, M, "†", "\\textdagger");
u(h, f, M, "‡", "\\ddag");
u(L, f, M, "‡", "\\ddag");
u(L, f, M, "‡", "\\textdaggerdbl");
u(h, f, Be, "⎱", "\\rmoustache", !0);
u(h, f, $e, "⎰", "\\lmoustache", !0);
u(h, f, Be, "⟯", "\\rgroup", !0);
u(h, f, $e, "⟮", "\\lgroup", !0);
u(h, f, W, "∓", "\\mp", !0);
u(h, f, W, "⊖", "\\ominus", !0);
u(h, f, W, "⊎", "\\uplus", !0);
u(h, f, W, "⊓", "\\sqcap", !0);
u(h, f, W, "∗", "\\ast");
u(h, f, W, "⊔", "\\sqcup", !0);
u(h, f, W, "◯", "\\bigcirc", !0);
u(h, f, W, "∙", "\\bullet", !0);
u(h, f, W, "‡", "\\ddagger");
u(h, f, W, "≀", "\\wr", !0);
u(h, f, W, "⨿", "\\amalg");
u(h, f, W, "&", "\\And");
u(h, f, y, "⟵", "\\longleftarrow", !0);
u(h, f, y, "⇐", "\\Leftarrow", !0);
u(h, f, y, "⟸", "\\Longleftarrow", !0);
u(h, f, y, "⟶", "\\longrightarrow", !0);
u(h, f, y, "⇒", "\\Rightarrow", !0);
u(h, f, y, "⟹", "\\Longrightarrow", !0);
u(h, f, y, "↔", "\\leftrightarrow", !0);
u(h, f, y, "⟷", "\\longleftrightarrow", !0);
u(h, f, y, "⇔", "\\Leftrightarrow", !0);
u(h, f, y, "⟺", "\\Longleftrightarrow", !0);
u(h, f, y, "↦", "\\mapsto", !0);
u(h, f, y, "⟼", "\\longmapsto", !0);
u(h, f, y, "↗", "\\nearrow", !0);
u(h, f, y, "↩", "\\hookleftarrow", !0);
u(h, f, y, "↪", "\\hookrightarrow", !0);
u(h, f, y, "↘", "\\searrow", !0);
u(h, f, y, "↼", "\\leftharpoonup", !0);
u(h, f, y, "⇀", "\\rightharpoonup", !0);
u(h, f, y, "↙", "\\swarrow", !0);
u(h, f, y, "↽", "\\leftharpoondown", !0);
u(h, f, y, "⇁", "\\rightharpoondown", !0);
u(h, f, y, "↖", "\\nwarrow", !0);
u(h, f, y, "⇌", "\\rightleftharpoons", !0);
u(h, x, y, "≮", "\\nless", !0);
u(h, x, y, "", "\\@nleqslant");
u(h, x, y, "", "\\@nleqq");
u(h, x, y, "⪇", "\\lneq", !0);
u(h, x, y, "≨", "\\lneqq", !0);
u(h, x, y, "", "\\@lvertneqq");
u(h, x, y, "⋦", "\\lnsim", !0);
u(h, x, y, "⪉", "\\lnapprox", !0);
u(h, x, y, "⊀", "\\nprec", !0);
u(h, x, y, "⋠", "\\npreceq", !0);
u(h, x, y, "⋨", "\\precnsim", !0);
u(h, x, y, "⪹", "\\precnapprox", !0);
u(h, x, y, "≁", "\\nsim", !0);
u(h, x, y, "", "\\@nshortmid");
u(h, x, y, "∤", "\\nmid", !0);
u(h, x, y, "⊬", "\\nvdash", !0);
u(h, x, y, "⊭", "\\nvDash", !0);
u(h, x, y, "⋪", "\\ntriangleleft");
u(h, x, y, "⋬", "\\ntrianglelefteq", !0);
u(h, x, y, "⊊", "\\subsetneq", !0);
u(h, x, y, "", "\\@varsubsetneq");
u(h, x, y, "⫋", "\\subsetneqq", !0);
u(h, x, y, "", "\\@varsubsetneqq");
u(h, x, y, "≯", "\\ngtr", !0);
u(h, x, y, "", "\\@ngeqslant");
u(h, x, y, "", "\\@ngeqq");
u(h, x, y, "⪈", "\\gneq", !0);
u(h, x, y, "≩", "\\gneqq", !0);
u(h, x, y, "", "\\@gvertneqq");
u(h, x, y, "⋧", "\\gnsim", !0);
u(h, x, y, "⪊", "\\gnapprox", !0);
u(h, x, y, "⊁", "\\nsucc", !0);
u(h, x, y, "⋡", "\\nsucceq", !0);
u(h, x, y, "⋩", "\\succnsim", !0);
u(h, x, y, "⪺", "\\succnapprox", !0);
u(h, x, y, "≆", "\\ncong", !0);
u(h, x, y, "", "\\@nshortparallel");
u(h, x, y, "∦", "\\nparallel", !0);
u(h, x, y, "⊯", "\\nVDash", !0);
u(h, x, y, "⋫", "\\ntriangleright");
u(h, x, y, "⋭", "\\ntrianglerighteq", !0);
u(h, x, y, "", "\\@nsupseteqq");
u(h, x, y, "⊋", "\\supsetneq", !0);
u(h, x, y, "", "\\@varsupsetneq");
u(h, x, y, "⫌", "\\supsetneqq", !0);
u(h, x, y, "", "\\@varsupsetneqq");
u(h, x, y, "⊮", "\\nVdash", !0);
u(h, x, y, "⪵", "\\precneqq", !0);
u(h, x, y, "⪶", "\\succneqq", !0);
u(h, x, y, "", "\\@nsubseteqq");
u(h, x, W, "⊴", "\\unlhd");
u(h, x, W, "⊵", "\\unrhd");
u(h, x, y, "↚", "\\nleftarrow", !0);
u(h, x, y, "↛", "\\nrightarrow", !0);
u(h, x, y, "⇍", "\\nLeftarrow", !0);
u(h, x, y, "⇏", "\\nRightarrow", !0);
u(h, x, y, "↮", "\\nleftrightarrow", !0);
u(h, x, y, "⇎", "\\nLeftrightarrow", !0);
u(h, x, y, "△", "\\vartriangle");
u(h, x, M, "ℏ", "\\hslash");
u(h, x, M, "▽", "\\triangledown");
u(h, x, M, "◊", "\\lozenge");
u(h, x, M, "Ⓢ", "\\circledS");
u(h, x, M, "®", "\\circledR");
u(L, x, M, "®", "\\circledR");
u(h, x, M, "∡", "\\measuredangle", !0);
u(h, x, M, "∄", "\\nexists");
u(h, x, M, "℧", "\\mho");
u(h, x, M, "Ⅎ", "\\Finv", !0);
u(h, x, M, "⅁", "\\Game", !0);
u(h, x, M, "‵", "\\backprime");
u(h, x, M, "▲", "\\blacktriangle");
u(h, x, M, "▼", "\\blacktriangledown");
u(h, x, M, "■", "\\blacksquare");
u(h, x, M, "⧫", "\\blacklozenge");
u(h, x, M, "★", "\\bigstar");
u(h, x, M, "∢", "\\sphericalangle", !0);
u(h, x, M, "∁", "\\complement", !0);
u(h, x, M, "ð", "\\eth", !0);
u(L, f, M, "ð", "ð");
u(h, x, M, "╱", "\\diagup");
u(h, x, M, "╲", "\\diagdown");
u(h, x, M, "□", "\\square");
u(h, x, M, "□", "\\Box");
u(h, x, M, "◊", "\\Diamond");
u(h, x, M, "¥", "\\yen", !0);
u(L, x, M, "¥", "\\yen", !0);
u(h, x, M, "✓", "\\checkmark", !0);
u(L, x, M, "✓", "\\checkmark");
u(h, x, M, "ℶ", "\\beth", !0);
u(h, x, M, "ℸ", "\\daleth", !0);
u(h, x, M, "ℷ", "\\gimel", !0);
u(h, x, M, "ϝ", "\\digamma", !0);
u(h, x, M, "ϰ", "\\varkappa");
u(h, x, $e, "┌", "\\@ulcorner", !0);
u(h, x, Be, "┐", "\\@urcorner", !0);
u(h, x, $e, "└", "\\@llcorner", !0);
u(h, x, Be, "┘", "\\@lrcorner", !0);
u(h, x, y, "≦", "\\leqq", !0);
u(h, x, y, "⩽", "\\leqslant", !0);
u(h, x, y, "⪕", "\\eqslantless", !0);
u(h, x, y, "≲", "\\lesssim", !0);
u(h, x, y, "⪅", "\\lessapprox", !0);
u(h, x, y, "≊", "\\approxeq", !0);
u(h, x, W, "⋖", "\\lessdot");
u(h, x, y, "⋘", "\\lll", !0);
u(h, x, y, "≶", "\\lessgtr", !0);
u(h, x, y, "⋚", "\\lesseqgtr", !0);
u(h, x, y, "⪋", "\\lesseqqgtr", !0);
u(h, x, y, "≑", "\\doteqdot");
u(h, x, y, "≓", "\\risingdotseq", !0);
u(h, x, y, "≒", "\\fallingdotseq", !0);
u(h, x, y, "∽", "\\backsim", !0);
u(h, x, y, "⋍", "\\backsimeq", !0);
u(h, x, y, "⫅", "\\subseteqq", !0);
u(h, x, y, "⋐", "\\Subset", !0);
u(h, x, y, "⊏", "\\sqsubset", !0);
u(h, x, y, "≼", "\\preccurlyeq", !0);
u(h, x, y, "⋞", "\\curlyeqprec", !0);
u(h, x, y, "≾", "\\precsim", !0);
u(h, x, y, "⪷", "\\precapprox", !0);
u(h, x, y, "⊲", "\\vartriangleleft");
u(h, x, y, "⊴", "\\trianglelefteq");
u(h, x, y, "⊨", "\\vDash", !0);
u(h, x, y, "⊪", "\\Vvdash", !0);
u(h, x, y, "⌣", "\\smallsmile");
u(h, x, y, "⌢", "\\smallfrown");
u(h, x, y, "≏", "\\bumpeq", !0);
u(h, x, y, "≎", "\\Bumpeq", !0);
u(h, x, y, "≧", "\\geqq", !0);
u(h, x, y, "⩾", "\\geqslant", !0);
u(h, x, y, "⪖", "\\eqslantgtr", !0);
u(h, x, y, "≳", "\\gtrsim", !0);
u(h, x, y, "⪆", "\\gtrapprox", !0);
u(h, x, W, "⋗", "\\gtrdot");
u(h, x, y, "⋙", "\\ggg", !0);
u(h, x, y, "≷", "\\gtrless", !0);
u(h, x, y, "⋛", "\\gtreqless", !0);
u(h, x, y, "⪌", "\\gtreqqless", !0);
u(h, x, y, "≖", "\\eqcirc", !0);
u(h, x, y, "≗", "\\circeq", !0);
u(h, x, y, "≜", "\\triangleq", !0);
u(h, x, y, "∼", "\\thicksim");
u(h, x, y, "≈", "\\thickapprox");
u(h, x, y, "⫆", "\\supseteqq", !0);
u(h, x, y, "⋑", "\\Supset", !0);
u(h, x, y, "⊐", "\\sqsupset", !0);
u(h, x, y, "≽", "\\succcurlyeq", !0);
u(h, x, y, "⋟", "\\curlyeqsucc", !0);
u(h, x, y, "≿", "\\succsim", !0);
u(h, x, y, "⪸", "\\succapprox", !0);
u(h, x, y, "⊳", "\\vartriangleright");
u(h, x, y, "⊵", "\\trianglerighteq");
u(h, x, y, "⊩", "\\Vdash", !0);
u(h, x, y, "∣", "\\shortmid");
u(h, x, y, "∥", "\\shortparallel");
u(h, x, y, "≬", "\\between", !0);
u(h, x, y, "⋔", "\\pitchfork", !0);
u(h, x, y, "∝", "\\varpropto");
u(h, x, y, "◀", "\\blacktriangleleft");
u(h, x, y, "∴", "\\therefore", !0);
u(h, x, y, "∍", "\\backepsilon");
u(h, x, y, "▶", "\\blacktriangleright");
u(h, x, y, "∵", "\\because", !0);
u(h, x, y, "⋘", "\\llless");
u(h, x, y, "⋙", "\\gggtr");
u(h, x, W, "⊲", "\\lhd");
u(h, x, W, "⊳", "\\rhd");
u(h, x, y, "≂", "\\eqsim", !0);
u(h, f, y, "⋈", "\\Join");
u(h, x, y, "≑", "\\Doteq", !0);
u(h, x, W, "∔", "\\dotplus", !0);
u(h, x, W, "∖", "\\smallsetminus");
u(h, x, W, "⋒", "\\Cap", !0);
u(h, x, W, "⋓", "\\Cup", !0);
u(h, x, W, "⩞", "\\doublebarwedge", !0);
u(h, x, W, "⊟", "\\boxminus", !0);
u(h, x, W, "⊞", "\\boxplus", !0);
u(h, x, W, "⋇", "\\divideontimes", !0);
u(h, x, W, "⋉", "\\ltimes", !0);
u(h, x, W, "⋊", "\\rtimes", !0);
u(h, x, W, "⋋", "\\leftthreetimes", !0);
u(h, x, W, "⋌", "\\rightthreetimes", !0);
u(h, x, W, "⋏", "\\curlywedge", !0);
u(h, x, W, "⋎", "\\curlyvee", !0);
u(h, x, W, "⊝", "\\circleddash", !0);
u(h, x, W, "⊛", "\\circledast", !0);
u(h, x, W, "⋅", "\\centerdot");
u(h, x, W, "⊺", "\\intercal", !0);
u(h, x, W, "⋒", "\\doublecap");
u(h, x, W, "⋓", "\\doublecup");
u(h, x, W, "⊠", "\\boxtimes", !0);
u(h, x, y, "⇢", "\\dashrightarrow", !0);
u(h, x, y, "⇠", "\\dashleftarrow", !0);
u(h, x, y, "⇇", "\\leftleftarrows", !0);
u(h, x, y, "⇆", "\\leftrightarrows", !0);
u(h, x, y, "⇚", "\\Lleftarrow", !0);
u(h, x, y, "↞", "\\twoheadleftarrow", !0);
u(h, x, y, "↢", "\\leftarrowtail", !0);
u(h, x, y, "↫", "\\looparrowleft", !0);
u(h, x, y, "⇋", "\\leftrightharpoons", !0);
u(h, x, y, "↶", "\\curvearrowleft", !0);
u(h, x, y, "↺", "\\circlearrowleft", !0);
u(h, x, y, "↰", "\\Lsh", !0);
u(h, x, y, "⇈", "\\upuparrows", !0);
u(h, x, y, "↿", "\\upharpoonleft", !0);
u(h, x, y, "⇃", "\\downharpoonleft", !0);
u(h, f, y, "⊶", "\\origof", !0);
u(h, f, y, "⊷", "\\imageof", !0);
u(h, x, y, "⊸", "\\multimap", !0);
u(h, x, y, "↭", "\\leftrightsquigarrow", !0);
u(h, x, y, "⇉", "\\rightrightarrows", !0);
u(h, x, y, "⇄", "\\rightleftarrows", !0);
u(h, x, y, "↠", "\\twoheadrightarrow", !0);
u(h, x, y, "↣", "\\rightarrowtail", !0);
u(h, x, y, "↬", "\\looparrowright", !0);
u(h, x, y, "↷", "\\curvearrowright", !0);
u(h, x, y, "↻", "\\circlearrowright", !0);
u(h, x, y, "↱", "\\Rsh", !0);
u(h, x, y, "⇊", "\\downdownarrows", !0);
u(h, x, y, "↾", "\\upharpoonright", !0);
u(h, x, y, "⇂", "\\downharpoonright", !0);
u(h, x, y, "⇝", "\\rightsquigarrow", !0);
u(h, x, y, "⇝", "\\leadsto");
u(h, x, y, "⇛", "\\Rrightarrow", !0);
u(h, x, y, "↾", "\\restriction");
u(h, f, M, "‘", "`");
u(h, f, M, "$", "\\$");
u(L, f, M, "$", "\\$");
u(L, f, M, "$", "\\textdollar");
u(h, f, M, "%", "\\%");
u(L, f, M, "%", "\\%");
u(h, f, M, "_", "\\_");
u(L, f, M, "_", "\\_");
u(L, f, M, "_", "\\textunderscore");
u(h, f, M, "∠", "\\angle", !0);
u(h, f, M, "∞", "\\infty", !0);
u(h, f, M, "′", "\\prime");
u(h, f, M, "△", "\\triangle");
u(h, f, M, "Γ", "\\Gamma", !0);
u(h, f, M, "Δ", "\\Delta", !0);
u(h, f, M, "Θ", "\\Theta", !0);
u(h, f, M, "Λ", "\\Lambda", !0);
u(h, f, M, "Ξ", "\\Xi", !0);
u(h, f, M, "Π", "\\Pi", !0);
u(h, f, M, "Σ", "\\Sigma", !0);
u(h, f, M, "Υ", "\\Upsilon", !0);
u(h, f, M, "Φ", "\\Phi", !0);
u(h, f, M, "Ψ", "\\Psi", !0);
u(h, f, M, "Ω", "\\Omega", !0);
u(h, f, M, "A", "Α");
u(h, f, M, "B", "Β");
u(h, f, M, "E", "Ε");
u(h, f, M, "Z", "Ζ");
u(h, f, M, "H", "Η");
u(h, f, M, "I", "Ι");
u(h, f, M, "K", "Κ");
u(h, f, M, "M", "Μ");
u(h, f, M, "N", "Ν");
u(h, f, M, "O", "Ο");
u(h, f, M, "P", "Ρ");
u(h, f, M, "T", "Τ");
u(h, f, M, "X", "Χ");
u(h, f, M, "¬", "\\neg", !0);
u(h, f, M, "¬", "\\lnot");
u(h, f, M, "⊤", "\\top");
u(h, f, M, "⊥", "\\bot");
u(h, f, M, "∅", "\\emptyset");
u(h, x, M, "∅", "\\varnothing");
u(h, f, X, "α", "\\alpha", !0);
u(h, f, X, "β", "\\beta", !0);
u(h, f, X, "γ", "\\gamma", !0);
u(h, f, X, "δ", "\\delta", !0);
u(h, f, X, "ϵ", "\\epsilon", !0);
u(h, f, X, "ζ", "\\zeta", !0);
u(h, f, X, "η", "\\eta", !0);
u(h, f, X, "θ", "\\theta", !0);
u(h, f, X, "ι", "\\iota", !0);
u(h, f, X, "κ", "\\kappa", !0);
u(h, f, X, "λ", "\\lambda", !0);
u(h, f, X, "μ", "\\mu", !0);
u(h, f, X, "ν", "\\nu", !0);
u(h, f, X, "ξ", "\\xi", !0);
u(h, f, X, "ο", "\\omicron", !0);
u(h, f, X, "π", "\\pi", !0);
u(h, f, X, "ρ", "\\rho", !0);
u(h, f, X, "σ", "\\sigma", !0);
u(h, f, X, "τ", "\\tau", !0);
u(h, f, X, "υ", "\\upsilon", !0);
u(h, f, X, "ϕ", "\\phi", !0);
u(h, f, X, "χ", "\\chi", !0);
u(h, f, X, "ψ", "\\psi", !0);
u(h, f, X, "ω", "\\omega", !0);
u(h, f, X, "ε", "\\varepsilon", !0);
u(h, f, X, "ϑ", "\\vartheta", !0);
u(h, f, X, "ϖ", "\\varpi", !0);
u(h, f, X, "ϱ", "\\varrho", !0);
u(h, f, X, "ς", "\\varsigma", !0);
u(h, f, X, "φ", "\\varphi", !0);
u(h, f, W, "∗", "*", !0);
u(h, f, W, "+", "+");
u(h, f, W, "−", "-", !0);
u(h, f, W, "⋅", "\\cdot", !0);
u(h, f, W, "∘", "\\circ", !0);
u(h, f, W, "÷", "\\div", !0);
u(h, f, W, "±", "\\pm", !0);
u(h, f, W, "×", "\\times", !0);
u(h, f, W, "∩", "\\cap", !0);
u(h, f, W, "∪", "\\cup", !0);
u(h, f, W, "∖", "\\setminus", !0);
u(h, f, W, "∧", "\\land");
u(h, f, W, "∨", "\\lor");
u(h, f, W, "∧", "\\wedge", !0);
u(h, f, W, "∨", "\\vee", !0);
u(h, f, M, "√", "\\surd");
u(h, f, $e, "⟨", "\\langle", !0);
u(h, f, $e, "∣", "\\lvert");
u(h, f, $e, "∥", "\\lVert");
u(h, f, Be, "?", "?");
u(h, f, Be, "!", "!");
u(h, f, Be, "⟩", "\\rangle", !0);
u(h, f, Be, "∣", "\\rvert");
u(h, f, Be, "∥", "\\rVert");
u(h, f, y, "=", "=");
u(h, f, y, ":", ":");
u(h, f, y, "≈", "\\approx", !0);
u(h, f, y, "≅", "\\cong", !0);
u(h, f, y, "≥", "\\ge");
u(h, f, y, "≥", "\\geq", !0);
u(h, f, y, "←", "\\gets");
u(h, f, y, ">", "\\gt", !0);
u(h, f, y, "∈", "\\in", !0);
u(h, f, y, "", "\\@not");
u(h, f, y, "⊂", "\\subset", !0);
u(h, f, y, "⊃", "\\supset", !0);
u(h, f, y, "⊆", "\\subseteq", !0);
u(h, f, y, "⊇", "\\supseteq", !0);
u(h, x, y, "⊈", "\\nsubseteq", !0);
u(h, x, y, "⊉", "\\nsupseteq", !0);
u(h, f, y, "⊨", "\\models");
u(h, f, y, "←", "\\leftarrow", !0);
u(h, f, y, "≤", "\\le");
u(h, f, y, "≤", "\\leq", !0);
u(h, f, y, "<", "\\lt", !0);
u(h, f, y, "→", "\\rightarrow", !0);
u(h, f, y, "→", "\\to");
u(h, x, y, "≱", "\\ngeq", !0);
u(h, x, y, "≰", "\\nleq", !0);
u(h, f, ft, " ", "\\ ");
u(h, f, ft, " ", "\\space");
u(h, f, ft, " ", "\\nobreakspace");
u(L, f, ft, " ", "\\ ");
u(L, f, ft, " ", " ");
u(L, f, ft, " ", "\\space");
u(L, f, ft, " ", "\\nobreakspace");
u(h, f, ft, null, "\\nobreak");
u(h, f, ft, null, "\\allowbreak");
u(h, f, y0, ",", ",");
u(h, f, y0, ";", ";");
u(h, x, W, "⊼", "\\barwedge", !0);
u(h, x, W, "⊻", "\\veebar", !0);
u(h, f, W, "⊙", "\\odot", !0);
u(h, f, W, "⊕", "\\oplus", !0);
u(h, f, W, "⊗", "\\otimes", !0);
u(h, f, M, "∂", "\\partial", !0);
u(h, f, W, "⊘", "\\oslash", !0);
u(h, x, W, "⊚", "\\circledcirc", !0);
u(h, x, W, "⊡", "\\boxdot", !0);
u(h, f, W, "△", "\\bigtriangleup");
u(h, f, W, "▽", "\\bigtriangledown");
u(h, f, W, "†", "\\dagger");
u(h, f, W, "⋄", "\\diamond");
u(h, f, W, "⋆", "\\star");
u(h, f, W, "◃", "\\triangleleft");
u(h, f, W, "▹", "\\triangleright");
u(h, f, $e, "{", "\\{");
u(L, f, M, "{", "\\{");
u(L, f, M, "{", "\\textbraceleft");
u(h, f, Be, "}", "\\}");
u(L, f, M, "}", "\\}");
u(L, f, M, "}", "\\textbraceright");
u(h, f, $e, "{", "\\lbrace");
u(h, f, Be, "}", "\\rbrace");
u(h, f, $e, "[", "\\lbrack", !0);
u(L, f, M, "[", "\\lbrack", !0);
u(h, f, Be, "]", "\\rbrack", !0);
u(L, f, M, "]", "\\rbrack", !0);
u(h, f, $e, "(", "\\lparen", !0);
u(h, f, Be, ")", "\\rparen", !0);
u(L, f, M, "<", "\\textless", !0);
u(L, f, M, ">", "\\textgreater", !0);
u(h, f, $e, "⌊", "\\lfloor", !0);
u(h, f, Be, "⌋", "\\rfloor", !0);
u(h, f, $e, "⌈", "\\lceil", !0);
u(h, f, Be, "⌉", "\\rceil", !0);
u(h, f, M, "\\", "\\backslash");
u(h, f, M, "∣", "|");
u(h, f, M, "∣", "\\vert");
u(L, f, M, "|", "\\textbar", !0);
u(h, f, M, "∥", "\\|");
u(h, f, M, "∥", "\\Vert");
u(L, f, M, "∥", "\\textbardbl");
u(L, f, M, "~", "\\textasciitilde");
u(L, f, M, "\\", "\\textbackslash");
u(L, f, M, "^", "\\textasciicircum");
u(h, f, y, "↑", "\\uparrow", !0);
u(h, f, y, "⇑", "\\Uparrow", !0);
u(h, f, y, "↓", "\\downarrow", !0);
u(h, f, y, "⇓", "\\Downarrow", !0);
u(h, f, y, "↕", "\\updownarrow", !0);
u(h, f, y, "⇕", "\\Updownarrow", !0);
u(h, f, we, "∐", "\\coprod");
u(h, f, we, "⋁", "\\bigvee");
u(h, f, we, "⋀", "\\bigwedge");
u(h, f, we, "⨄", "\\biguplus");
u(h, f, we, "⋂", "\\bigcap");
u(h, f, we, "⋃", "\\bigcup");
u(h, f, we, "∫", "\\int");
u(h, f, we, "∫", "\\intop");
u(h, f, we, "∬", "\\iint");
u(h, f, we, "∭", "\\iiint");
u(h, f, we, "∏", "\\prod");
u(h, f, we, "∑", "\\sum");
u(h, f, we, "⨂", "\\bigotimes");
u(h, f, we, "⨁", "\\bigoplus");
u(h, f, we, "⨀", "\\bigodot");
u(h, f, we, "∮", "\\oint");
u(h, f, we, "∯", "\\oiint");
u(h, f, we, "∰", "\\oiiint");
u(h, f, we, "⨆", "\\bigsqcup");
u(h, f, we, "∫", "\\smallint");
u(L, f, Lt, "…", "\\textellipsis");
u(h, f, Lt, "…", "\\mathellipsis");
u(L, f, Lt, "…", "\\ldots", !0);
u(h, f, Lt, "…", "\\ldots", !0);
u(h, f, Lt, "⋯", "\\@cdots", !0);
u(h, f, Lt, "⋱", "\\ddots", !0);
u(h, f, M, "⋮", "\\varvdots");
u(L, f, M, "⋮", "\\varvdots");
u(h, f, ge, "ˊ", "\\acute");
u(h, f, ge, "ˋ", "\\grave");
u(h, f, ge, "¨", "\\ddot");
u(h, f, ge, "~", "\\tilde");
u(h, f, ge, "ˉ", "\\bar");
u(h, f, ge, "˘", "\\breve");
u(h, f, ge, "ˇ", "\\check");
u(h, f, ge, "^", "\\hat");
u(h, f, ge, "⃗", "\\vec");
u(h, f, ge, "˙", "\\dot");
u(h, f, ge, "˚", "\\mathring");
u(h, f, X, "", "\\@imath");
u(h, f, X, "", "\\@jmath");
u(h, f, M, "ı", "ı");
u(h, f, M, "ȷ", "ȷ");
u(L, f, M, "ı", "\\i", !0);
u(L, f, M, "ȷ", "\\j", !0);
u(L, f, M, "ß", "\\ss", !0);
u(L, f, M, "æ", "\\ae", !0);
u(L, f, M, "œ", "\\oe", !0);
u(L, f, M, "ø", "\\o", !0);
u(L, f, M, "Æ", "\\AE", !0);
u(L, f, M, "Œ", "\\OE", !0);
u(L, f, M, "Ø", "\\O", !0);
u(L, f, ge, "ˊ", "\\'");
u(L, f, ge, "ˋ", "\\`");
u(L, f, ge, "ˆ", "\\^");
u(L, f, ge, "˜", "\\~");
u(L, f, ge, "ˉ", "\\=");
u(L, f, ge, "˘", "\\u");
u(L, f, ge, "˙", "\\.");
u(L, f, ge, "¸", "\\c");
u(L, f, ge, "˚", "\\r");
u(L, f, ge, "ˇ", "\\v");
u(L, f, ge, "¨", '\\"');
u(L, f, ge, "˝", "\\H");
u(L, f, ge, "◯", "\\textcircled");
var ia = {
  "--": !0,
  "---": !0,
  "``": !0,
  "''": !0
};
u(L, f, M, "–", "--", !0);
u(L, f, M, "–", "\\textendash");
u(L, f, M, "—", "---", !0);
u(L, f, M, "—", "\\textemdash");
u(L, f, M, "‘", "`", !0);
u(L, f, M, "‘", "\\textquoteleft");
u(L, f, M, "’", "'", !0);
u(L, f, M, "’", "\\textquoteright");
u(L, f, M, "“", "``", !0);
u(L, f, M, "“", "\\textquotedblleft");
u(L, f, M, "”", "''", !0);
u(L, f, M, "”", "\\textquotedblright");
u(h, f, M, "°", "\\degree", !0);
u(L, f, M, "°", "\\degree");
u(L, f, M, "°", "\\textdegree", !0);
u(h, f, M, "£", "\\pounds");
u(h, f, M, "£", "\\mathsterling", !0);
u(L, f, M, "£", "\\pounds");
u(L, f, M, "£", "\\textsterling", !0);
u(h, x, M, "✠", "\\maltese");
u(L, x, M, "✠", "\\maltese");
var _r = '0123456789/@."';
for (var I0 = 0; I0 < _r.length; I0++) {
  var Kr = _r.charAt(I0);
  u(h, f, M, Kr, Kr);
}
var Jr = '0123456789!@*()-=+";:?/.,';
for (var B0 = 0; B0 < Jr.length; B0++) {
  var en = Jr.charAt(B0);
  u(L, f, M, en, en);
}
var d0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var N0 = 0; N0 < d0.length; N0++) {
  var t0 = d0.charAt(N0);
  u(h, f, X, t0, t0), u(L, f, M, t0, t0);
}
u(h, x, M, "C", "ℂ");
u(L, x, M, "C", "ℂ");
u(h, x, M, "H", "ℍ");
u(L, x, M, "H", "ℍ");
u(h, x, M, "N", "ℕ");
u(L, x, M, "N", "ℕ");
u(h, x, M, "P", "ℙ");
u(L, x, M, "P", "ℙ");
u(h, x, M, "Q", "ℚ");
u(L, x, M, "Q", "ℚ");
u(h, x, M, "R", "ℝ");
u(L, x, M, "R", "ℝ");
u(h, x, M, "Z", "ℤ");
u(L, x, M, "Z", "ℤ");
u(h, f, X, "h", "ℎ");
u(L, f, X, "h", "ℎ");
var Q = "";
for (var De = 0; De < d0.length; De++) {
  var xe = d0.charAt(De);
  Q = String.fromCharCode(55349, 56320 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56372 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56424 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56580 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56684 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56736 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56788 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56840 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56944 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), De < 26 && (Q = String.fromCharCode(55349, 56632 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q), Q = String.fromCharCode(55349, 56476 + De), u(h, f, X, xe, Q), u(L, f, M, xe, Q));
}
Q = "𝕜";
u(h, f, X, "k", Q);
u(L, f, M, "k", Q);
for (var zt = 0; zt < 10; zt++) {
  var gt = zt.toString();
  Q = String.fromCharCode(55349, 57294 + zt), u(h, f, X, gt, Q), u(L, f, M, gt, Q), Q = String.fromCharCode(55349, 57314 + zt), u(h, f, X, gt, Q), u(L, f, M, gt, Q), Q = String.fromCharCode(55349, 57324 + zt), u(h, f, X, gt, Q), u(L, f, M, gt, Q), Q = String.fromCharCode(55349, 57334 + zt), u(h, f, X, gt, Q), u(L, f, M, gt, Q);
}
var er = "ÐÞþ";
for (var q0 = 0; q0 < er.length; q0++) {
  var r0 = er.charAt(q0);
  u(h, f, X, r0, r0), u(L, f, M, r0, r0);
}
var n0 = [
  ["mathbf", "textbf", "Main-Bold"],
  // A-Z bold upright
  ["mathbf", "textbf", "Main-Bold"],
  // a-z bold upright
  ["mathnormal", "textit", "Math-Italic"],
  // A-Z italic
  ["mathnormal", "textit", "Math-Italic"],
  // a-z italic
  ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
  // A-Z bold italic
  ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
  // a-z bold italic
  // Map fancy A-Z letters to script, not calligraphic.
  // This aligns with unicode-math and math fonts (except Cambria Math).
  ["mathscr", "textscr", "Script-Regular"],
  // A-Z script
  ["", "", ""],
  // a-z script.  No font
  ["", "", ""],
  // A-Z bold script. No font
  ["", "", ""],
  // a-z bold script. No font
  ["mathfrak", "textfrak", "Fraktur-Regular"],
  // A-Z Fraktur
  ["mathfrak", "textfrak", "Fraktur-Regular"],
  // a-z Fraktur
  ["mathbb", "textbb", "AMS-Regular"],
  // A-Z double-struck
  ["mathbb", "textbb", "AMS-Regular"],
  // k double-struck
  // Note that we are using a bold font, but font metrics for regular Fraktur.
  ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
  // A-Z bold Fraktur
  ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
  // a-z bold Fraktur
  ["mathsf", "textsf", "SansSerif-Regular"],
  // A-Z sans-serif
  ["mathsf", "textsf", "SansSerif-Regular"],
  // a-z sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // A-Z bold sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // a-z bold sans-serif
  ["mathitsf", "textitsf", "SansSerif-Italic"],
  // A-Z italic sans-serif
  ["mathitsf", "textitsf", "SansSerif-Italic"],
  // a-z italic sans-serif
  ["", "", ""],
  // A-Z bold italic sans. No font
  ["", "", ""],
  // a-z bold italic sans. No font
  ["mathtt", "texttt", "Typewriter-Regular"],
  // A-Z monospace
  ["mathtt", "texttt", "Typewriter-Regular"]
  // a-z monospace
], tn = [
  ["mathbf", "textbf", "Main-Bold"],
  // 0-9 bold
  ["", "", ""],
  // 0-9 double-struck. No KaTeX font.
  ["mathsf", "textsf", "SansSerif-Regular"],
  // 0-9 sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // 0-9 bold sans-serif
  ["mathtt", "texttt", "Typewriter-Regular"]
  // 0-9 monospace
], Ys = function(e, r) {
  var n = e.charCodeAt(0), a = e.charCodeAt(1), i = (n - 55296) * 1024 + (a - 56320) + 65536, l = r === "math" ? 0 : 1;
  if (119808 <= i && i < 120484) {
    var s = Math.floor((i - 119808) / 26);
    return [n0[s][2], n0[s][l]];
  } else if (120782 <= i && i <= 120831) {
    var o = Math.floor((i - 120782) / 10);
    return [tn[o][2], tn[o][l]];
  } else {
    if (i === 120485 || i === 120486)
      return [n0[0][2], n0[0][l]];
    if (120486 < i && i < 120782)
      return ["", ""];
    throw new R("Unsupported character: " + e);
  }
}, w0 = function(e, r, n) {
  return me[n][e] && me[n][e].replace && (e = me[n][e].replace), {
    value: e,
    metrics: hr(e, r, n)
  };
}, je = function(e, r, n, a, i) {
  var l = w0(e, r, n), s = l.metrics;
  e = l.value;
  var o;
  if (s) {
    var m = s.italic;
    (n === "text" || a && a.font === "mathit") && (m = 0), o = new Ye(e, s.height, s.depth, m, s.skew, s.width, i);
  } else
    typeof console < "u" && console.warn("No character metrics " + ("for '" + e + "' in style '" + r + "' and mode '" + n + "'")), o = new Ye(e, 0, 0, 0, 0, 0, i);
  if (a) {
    o.maxFontSize = a.sizeMultiplier, a.style.isTight() && o.classes.push("mtight");
    var d = a.getColor();
    d && (o.style.color = d);
  }
  return o;
}, Xs = function(e, r, n, a) {
  return a === void 0 && (a = []), n.font === "boldsymbol" && w0(e, "Main-Bold", r).metrics ? je(e, "Main-Bold", r, n, a.concat(["mathbf"])) : e === "\\" || me[r][e].font === "main" ? je(e, "Main-Regular", r, n, a) : je(e, "AMS-Regular", r, n, a.concat(["amsrm"]));
}, Zs = function(e, r, n, a, i) {
  return i !== "textord" && w0(e, "Math-BoldItalic", r).metrics ? {
    fontName: "Math-BoldItalic",
    fontClass: "boldsymbol"
  } : {
    fontName: "Main-Bold",
    fontClass: "mathbf"
  };
}, Qs = function(e, r, n) {
  var a = e.mode, i = e.text, l = ["mord"], s = a === "math" || a === "text" && r.font, o = s ? r.font : r.fontFamily, m = "", d = "";
  if (i.charCodeAt(0) === 55349 && ([m, d] = Ys(i, a)), m.length > 0)
    return je(i, m, a, r, l.concat(d));
  if (o) {
    var c, v;
    if (o === "boldsymbol") {
      var p = Zs(i, a, r, l, n);
      c = p.fontName, v = [p.fontClass];
    } else s ? (c = ua[o].fontName, v = [o]) : (c = a0(o, r.fontWeight, r.fontShape), v = [o, r.fontWeight, r.fontShape]);
    if (w0(i, c, a).metrics)
      return je(i, c, a, r, l.concat(v));
    if (ia.hasOwnProperty(i) && c.slice(0, 10) === "Typewriter") {
      for (var w = [], T = 0; T < i.length; T++)
        w.push(je(i[T], c, a, r, l.concat(v)));
      return sa(w);
    }
  }
  if (n === "mathord")
    return je(i, "Math-Italic", a, r, l.concat(["mathnormal"]));
  if (n === "textord") {
    var B = me[a][i] && me[a][i].font;
    if (B === "ams") {
      var C = a0("amsrm", r.fontWeight, r.fontShape);
      return je(i, C, a, r, l.concat("amsrm", r.fontWeight, r.fontShape));
    } else if (B === "main" || !B) {
      var b = a0("textrm", r.fontWeight, r.fontShape);
      return je(i, b, a, r, l.concat(r.fontWeight, r.fontShape));
    } else {
      var k = a0(B, r.fontWeight, r.fontShape);
      return je(i, k, a, r, l.concat(k, r.fontWeight, r.fontShape));
    }
  } else
    throw new Error("unexpected type: " + n + " in makeOrd");
}, _s = (t, e) => {
  if (bt(t.classes) !== bt(e.classes) || t.skew !== e.skew || t.maxFontSize !== e.maxFontSize)
    return !1;
  if (t.classes.length === 1) {
    var r = t.classes[0];
    if (r === "mbin" || r === "mord")
      return !1;
  }
  for (var n in t.style)
    if (t.style.hasOwnProperty(n) && t.style[n] !== e.style[n])
      return !1;
  for (var a in e.style)
    if (e.style.hasOwnProperty(a) && t.style[a] !== e.style[a])
      return !1;
  return !0;
}, Ks = (t) => {
  for (var e = 0; e < t.length - 1; e++) {
    var r = t[e], n = t[e + 1];
    r instanceof Ye && n instanceof Ye && _s(r, n) && (r.text += n.text, r.height = Math.max(r.height, n.height), r.depth = Math.max(r.depth, n.depth), r.italic = n.italic, t.splice(e + 1, 1), e--);
  }
  return t;
}, mr = function(e) {
  for (var r = 0, n = 0, a = 0, i = 0; i < e.children.length; i++) {
    var l = e.children[i];
    l.height > r && (r = l.height), l.depth > n && (n = l.depth), l.maxFontSize > a && (a = l.maxFontSize);
  }
  e.height = r, e.depth = n, e.maxFontSize = a;
}, Le = function(e, r, n, a) {
  var i = new x0(e, r, n, a);
  return mr(i), i;
}, la = (t, e, r, n) => new x0(t, e, r, n), Js = function(e, r, n) {
  var a = Le([e], [], r);
  return a.height = Math.max(n || r.fontMetrics().defaultRuleThickness, r.minRuleThickness), a.style.borderBottomWidth = V(a.height), a.maxFontSize = 1, a;
}, eu = function(e, r, n, a) {
  var i = new aa(e, r, n, a);
  return mr(i), i;
}, sa = function(e) {
  var r = new Zt(e);
  return mr(r), r;
}, tu = function(e, r) {
  return e instanceof Zt ? Le([], [e], r) : e;
}, ru = function(e) {
  if (e.positionType === "individualShift") {
    for (var r = e.children, n = [r[0]], a = -r[0].shift - r[0].elem.depth, i = a, l = 1; l < r.length; l++) {
      var s = -r[l].shift - i - r[l].elem.depth, o = s - (r[l - 1].elem.height + r[l - 1].elem.depth);
      i = i + s, n.push({
        type: "kern",
        size: o
      }), n.push(r[l]);
    }
    return {
      children: n,
      depth: a
    };
  }
  var m;
  if (e.positionType === "top") {
    for (var d = e.positionData, c = 0; c < e.children.length; c++) {
      var v = e.children[c];
      d -= v.type === "kern" ? v.size : v.elem.height + v.elem.depth;
    }
    m = d;
  } else if (e.positionType === "bottom")
    m = -e.positionData;
  else {
    var p = e.children[0];
    if (p.type !== "elem")
      throw new Error('First child must have type "elem".');
    if (e.positionType === "shift")
      m = -p.elem.depth - e.positionData;
    else if (e.positionType === "firstBaseline")
      m = -p.elem.depth;
    else
      throw new Error("Invalid positionType " + e.positionType + ".");
  }
  return {
    children: e.children,
    depth: m
  };
}, nu = function(e, r) {
  for (var {
    children: n,
    depth: a
  } = ru(e), i = 0, l = 0; l < n.length; l++) {
    var s = n[l];
    if (s.type === "elem") {
      var o = s.elem;
      i = Math.max(i, o.maxFontSize, o.height);
    }
  }
  i += 2;
  var m = Le(["pstrut"], []);
  m.style.height = V(i);
  for (var d = [], c = a, v = a, p = a, w = 0; w < n.length; w++) {
    var T = n[w];
    if (T.type === "kern")
      p += T.size;
    else {
      var B = T.elem, C = T.wrapperClasses || [], b = T.wrapperStyle || {}, k = Le(C, [m, B], void 0, b);
      k.style.top = V(-i - p - B.depth), T.marginLeft && (k.style.marginLeft = T.marginLeft), T.marginRight && (k.style.marginRight = T.marginRight), d.push(k), p += B.height + B.depth;
    }
    c = Math.min(c, p), v = Math.max(v, p);
  }
  var I = Le(["vlist"], d);
  I.style.height = V(v);
  var F;
  if (c < 0) {
    var z = Le([], []), N = Le(["vlist"], [z]);
    N.style.height = V(-c);
    var H = Le(["vlist-s"], [new Ye("​")]);
    F = [Le(["vlist-r"], [I, H]), Le(["vlist-r"], [N])];
  } else
    F = [Le(["vlist-r"], [I])];
  var q = Le(["vlist-t"], F);
  return F.length === 2 && q.classes.push("vlist-t2"), q.height = v, q.depth = -c, q;
}, au = (t, e) => {
  var r = Le(["mspace"], [], e), n = be(t, e);
  return r.style.marginRight = V(n), r;
}, a0 = function(e, r, n) {
  var a = "";
  switch (e) {
    case "amsrm":
      a = "AMS";
      break;
    case "textrm":
      a = "Main";
      break;
    case "textsf":
      a = "SansSerif";
      break;
    case "texttt":
      a = "Typewriter";
      break;
    default:
      a = e;
  }
  var i;
  return r === "textbf" && n === "textit" ? i = "BoldItalic" : r === "textbf" ? i = "Bold" : r === "textit" ? i = "Italic" : i = "Regular", a + "-" + i;
}, ua = {
  // styles
  mathbf: {
    variant: "bold",
    fontName: "Main-Bold"
  },
  mathrm: {
    variant: "normal",
    fontName: "Main-Regular"
  },
  textit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathnormal: {
    variant: "italic",
    fontName: "Math-Italic"
  },
  mathsfit: {
    variant: "sans-serif-italic",
    fontName: "SansSerif-Italic"
  },
  // "boldsymbol" is missing because they require the use of multiple fonts:
  // Math-BoldItalic and Main-Bold.  This is handled by a special case in
  // makeOrd which ends up calling boldsymbol.
  // families
  mathbb: {
    variant: "double-struck",
    fontName: "AMS-Regular"
  },
  mathcal: {
    variant: "script",
    fontName: "Caligraphic-Regular"
  },
  mathfrak: {
    variant: "fraktur",
    fontName: "Fraktur-Regular"
  },
  mathscr: {
    variant: "script",
    fontName: "Script-Regular"
  },
  mathsf: {
    variant: "sans-serif",
    fontName: "SansSerif-Regular"
  },
  mathtt: {
    variant: "monospace",
    fontName: "Typewriter-Regular"
  }
}, oa = {
  //   path, width, height
  vec: ["vec", 0.471, 0.714],
  // values from the font glyph
  oiintSize1: ["oiintSize1", 0.957, 0.499],
  // oval to overlay the integrand
  oiintSize2: ["oiintSize2", 1.472, 0.659],
  oiiintSize1: ["oiiintSize1", 1.304, 0.499],
  oiiintSize2: ["oiiintSize2", 1.98, 0.659]
}, iu = function(e, r) {
  var [n, a, i] = oa[e], l = new Tt(n), s = new xt([l], {
    width: V(a),
    height: V(i),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + V(a),
    viewBox: "0 0 " + 1e3 * a + " " + 1e3 * i,
    preserveAspectRatio: "xMinYMin"
  }), o = la(["overlay"], [s], r);
  return o.height = i, o.style.height = V(i), o.style.width = V(a), o;
}, D = {
  fontMap: ua,
  makeSymbol: je,
  mathsym: Xs,
  makeSpan: Le,
  makeSvgSpan: la,
  makeLineSpan: Js,
  makeAnchor: eu,
  makeFragment: sa,
  wrapFragment: tu,
  makeVList: nu,
  makeOrd: Qs,
  makeGlue: au,
  staticSvg: iu,
  svgData: oa,
  tryCombineChars: Ks
}, ve = {
  number: 3,
  unit: "mu"
}, At = {
  number: 4,
  unit: "mu"
}, it = {
  number: 5,
  unit: "mu"
}, lu = {
  mord: {
    mop: ve,
    mbin: At,
    mrel: it,
    minner: ve
  },
  mop: {
    mord: ve,
    mop: ve,
    mrel: it,
    minner: ve
  },
  mbin: {
    mord: At,
    mop: At,
    mopen: At,
    minner: At
  },
  mrel: {
    mord: it,
    mop: it,
    mopen: it,
    minner: it
  },
  mopen: {},
  mclose: {
    mop: ve,
    mbin: At,
    mrel: it,
    minner: ve
  },
  mpunct: {
    mord: ve,
    mop: ve,
    mrel: it,
    mopen: ve,
    mclose: ve,
    mpunct: ve,
    minner: ve
  },
  minner: {
    mord: ve,
    mop: ve,
    mbin: At,
    mrel: it,
    mopen: ve,
    mpunct: ve,
    minner: ve
  }
}, su = {
  mord: {
    mop: ve
  },
  mop: {
    mord: ve,
    mop: ve
  },
  mbin: {},
  mrel: {},
  mopen: {},
  mclose: {
    mop: ve
  },
  mpunct: {},
  minner: {
    mop: ve
  }
}, ha = {}, p0 = {}, g0 = {};
function U(t) {
  for (var {
    type: e,
    names: r,
    props: n,
    handler: a,
    htmlBuilder: i,
    mathmlBuilder: l
  } = t, s = {
    type: e,
    numArgs: n.numArgs,
    argTypes: n.argTypes,
    allowedInArgument: !!n.allowedInArgument,
    allowedInText: !!n.allowedInText,
    allowedInMath: n.allowedInMath === void 0 ? !0 : n.allowedInMath,
    numOptionalArgs: n.numOptionalArgs || 0,
    infix: !!n.infix,
    primitive: !!n.primitive,
    handler: a
  }, o = 0; o < r.length; ++o)
    ha[r[o]] = s;
  e && (i && (p0[e] = i), l && (g0[e] = l));
}
function Ct(t) {
  var {
    type: e,
    htmlBuilder: r,
    mathmlBuilder: n
  } = t;
  U({
    type: e,
    names: [],
    props: {
      numArgs: 0
    },
    handler() {
      throw new Error("Should never be called.");
    },
    htmlBuilder: r,
    mathmlBuilder: n
  });
}
var v0 = function(e) {
  return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, ye = function(e) {
  return e.type === "ordgroup" ? e.body : [e];
}, ht = D.makeSpan, uu = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"], ou = ["rightmost", "mrel", "mclose", "mpunct"], hu = {
  display: Z.DISPLAY,
  text: Z.TEXT,
  script: Z.SCRIPT,
  scriptscript: Z.SCRIPTSCRIPT
}, mu = {
  mord: "mord",
  mop: "mop",
  mbin: "mbin",
  mrel: "mrel",
  mopen: "mopen",
  mclose: "mclose",
  mpunct: "mpunct",
  minner: "minner"
}, ze = function(e, r, n, a) {
  a === void 0 && (a = [null, null]);
  for (var i = [], l = 0; l < e.length; l++) {
    var s = ie(e[l], r);
    if (s instanceof Zt) {
      var o = s.children;
      i.push(...o);
    } else
      i.push(s);
  }
  if (D.tryCombineChars(i), !n)
    return i;
  var m = r;
  if (e.length === 1) {
    var d = e[0];
    d.type === "sizing" ? m = r.havingSize(d.size) : d.type === "styling" && (m = r.havingStyle(hu[d.style]));
  }
  var c = ht([a[0] || "leftmost"], [], r), v = ht([a[1] || "rightmost"], [], r), p = n === "root";
  return rn(i, (w, T) => {
    var B = T.classes[0], C = w.classes[0];
    B === "mbin" && ou.includes(C) ? T.classes[0] = "mord" : C === "mbin" && uu.includes(B) && (w.classes[0] = "mord");
  }, {
    node: c
  }, v, p), rn(i, (w, T) => {
    var B = tr(T), C = tr(w), b = B && C ? w.hasClass("mtight") ? su[B][C] : lu[B][C] : null;
    if (b)
      return D.makeGlue(b, m);
  }, {
    node: c
  }, v, p), i;
}, rn = function t(e, r, n, a, i) {
  a && e.push(a);
  for (var l = 0; l < e.length; l++) {
    var s = e[l], o = ma(s);
    if (o) {
      t(o.children, r, n, null, i);
      continue;
    }
    var m = !s.hasClass("mspace");
    if (m) {
      var d = r(s, n.node);
      d && (n.insertAfter ? n.insertAfter(d) : (e.unshift(d), l++));
    }
    m ? n.node = s : i && s.hasClass("newline") && (n.node = ht(["leftmost"])), n.insertAfter = /* @__PURE__ */ ((c) => (v) => {
      e.splice(c + 1, 0, v), l++;
    })(l);
  }
  a && e.pop();
}, ma = function(e) {
  return e instanceof Zt || e instanceof aa || e instanceof x0 && e.hasClass("enclosing") ? e : null;
}, cu = function t(e, r) {
  var n = ma(e);
  if (n) {
    var a = n.children;
    if (a.length) {
      if (r === "right")
        return t(a[a.length - 1], "right");
      if (r === "left")
        return t(a[0], "left");
    }
  }
  return e;
}, tr = function(e, r) {
  return e ? (r && (e = cu(e, r)), mu[e.classes[0]] || null) : null;
}, Yt = function(e, r) {
  var n = ["nulldelimiter"].concat(e.baseSizingClasses());
  return ht(r.concat(n));
}, ie = function(e, r, n) {
  if (!e)
    return ht();
  if (p0[e.type]) {
    var a = p0[e.type](e, r);
    if (n && r.size !== n.size) {
      a = ht(r.sizingClasses(n), [a], r);
      var i = r.sizeMultiplier / n.sizeMultiplier;
      a.height *= i, a.depth *= i;
    }
    return a;
  } else
    throw new R("Got group of unknown type: '" + e.type + "'");
};
function i0(t, e) {
  var r = ht(["base"], t, e), n = ht(["strut"]);
  return n.style.height = V(r.height + r.depth), r.depth && (n.style.verticalAlign = V(-r.depth)), r.children.unshift(n), r;
}
function nn(t, e) {
  var r = null;
  t.length === 1 && t[0].type === "tag" && (r = t[0].tag, t = t[0].body);
  var n = ze(t, e, "root"), a;
  n.length === 2 && n[1].hasClass("tag") && (a = n.pop());
  for (var i = [], l = [], s = 0; s < n.length; s++)
    if (l.push(n[s]), n[s].hasClass("mbin") || n[s].hasClass("mrel") || n[s].hasClass("allowbreak")) {
      for (var o = !1; s < n.length - 1 && n[s + 1].hasClass("mspace") && !n[s + 1].hasClass("newline"); )
        s++, l.push(n[s]), n[s].hasClass("nobreak") && (o = !0);
      o || (i.push(i0(l, e)), l = []);
    } else n[s].hasClass("newline") && (l.pop(), l.length > 0 && (i.push(i0(l, e)), l = []), i.push(n[s]));
  l.length > 0 && i.push(i0(l, e));
  var m;
  r ? (m = i0(ze(r, e, !0)), m.classes = ["tag"], i.push(m)) : a && i.push(a);
  var d = ht(["katex-html"], i);
  if (d.setAttribute("aria-hidden", "true"), m) {
    var c = m.children[0];
    c.style.height = V(d.height + d.depth), d.depth && (c.style.verticalAlign = V(-d.depth));
  }
  return d;
}
function ca(t) {
  return new Zt(t);
}
class Pe {
  constructor(e, r, n) {
    this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e, this.attributes = {}, this.children = r || [], this.classes = n || [];
  }
  /**
   * Sets an attribute on a MathML node. MathML depends on attributes to convey a
   * semantic content, so this is used heavily.
   */
  setAttribute(e, r) {
    this.attributes[e] = r;
  }
  /**
   * Gets an attribute on a MathML node.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
    for (var r in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, r) && e.setAttribute(r, this.attributes[r]);
    this.classes.length > 0 && (e.className = bt(this.classes));
    for (var n = 0; n < this.children.length; n++)
      if (this.children[n] instanceof Ke && this.children[n + 1] instanceof Ke) {
        for (var a = this.children[n].toText() + this.children[++n].toText(); this.children[n + 1] instanceof Ke; )
          a += this.children[++n].toText();
        e.appendChild(new Ke(a).toNode());
      } else
        e.appendChild(this.children[n].toNode());
    return e;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    var e = "<" + this.type;
    for (var r in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, r) && (e += " " + r + '="', e += le.escape(this.attributes[r]), e += '"');
    this.classes.length > 0 && (e += ' class ="' + le.escape(bt(this.classes)) + '"'), e += ">";
    for (var n = 0; n < this.children.length; n++)
      e += this.children[n].toMarkup();
    return e += "</" + this.type + ">", e;
  }
  /**
   * Converts the math node into a string, similar to innerText, but escaped.
   */
  toText() {
    return this.children.map((e) => e.toText()).join("");
  }
}
class Ke {
  constructor(e) {
    this.text = void 0, this.text = e;
  }
  /**
   * Converts the text node into a DOM text node.
   */
  toNode() {
    return document.createTextNode(this.text);
  }
  /**
   * Converts the text node into escaped HTML markup
   * (representing the text itself).
   */
  toMarkup() {
    return le.escape(this.toText());
  }
  /**
   * Converts the text node into a string
   * (representing the text itself).
   */
  toText() {
    return this.text;
  }
}
class fu {
  /**
   * Create a Space node with width given in CSS ems.
   */
  constructor(e) {
    this.width = void 0, this.character = void 0, this.width = e, e >= 0.05555 && e <= 0.05556 ? this.character = " " : e >= 0.1666 && e <= 0.1667 ? this.character = " " : e >= 0.2222 && e <= 0.2223 ? this.character = " " : e >= 0.2777 && e <= 0.2778 ? this.character = "  " : e >= -0.05556 && e <= -0.05555 ? this.character = " ⁣" : e >= -0.1667 && e <= -0.1666 ? this.character = " ⁣" : e >= -0.2223 && e <= -0.2222 ? this.character = " ⁣" : e >= -0.2778 && e <= -0.2777 ? this.character = " ⁣" : this.character = null;
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    if (this.character)
      return document.createTextNode(this.character);
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
    return e.setAttribute("width", V(this.width)), e;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + V(this.width) + '"/>';
  }
  /**
   * Converts the math node into a string, similar to innerText.
   */
  toText() {
    return this.character ? this.character : " ";
  }
}
var O = {
  MathNode: Pe,
  TextNode: Ke,
  SpaceNode: fu,
  newDocumentFragment: ca
}, Ue = function(e, r, n) {
  return me[r][e] && me[r][e].replace && e.charCodeAt(0) !== 55349 && !(ia.hasOwnProperty(e) && n && (n.fontFamily && n.fontFamily.slice(4, 6) === "tt" || n.font && n.font.slice(4, 6) === "tt")) && (e = me[r][e].replace), new O.TextNode(e);
}, cr = function(e) {
  return e.length === 1 ? e[0] : new O.MathNode("mrow", e);
}, fr = function(e, r) {
  if (r.fontFamily === "texttt")
    return "monospace";
  if (r.fontFamily === "textsf")
    return r.fontShape === "textit" && r.fontWeight === "textbf" ? "sans-serif-bold-italic" : r.fontShape === "textit" ? "sans-serif-italic" : r.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
  if (r.fontShape === "textit" && r.fontWeight === "textbf")
    return "bold-italic";
  if (r.fontShape === "textit")
    return "italic";
  if (r.fontWeight === "textbf")
    return "bold";
  var n = r.font;
  if (!n || n === "mathnormal")
    return null;
  var a = e.mode;
  if (n === "mathit")
    return "italic";
  if (n === "boldsymbol")
    return e.type === "textord" ? "bold" : "bold-italic";
  if (n === "mathbf")
    return "bold";
  if (n === "mathbb")
    return "double-struck";
  if (n === "mathsfit")
    return "sans-serif-italic";
  if (n === "mathfrak")
    return "fraktur";
  if (n === "mathscr" || n === "mathcal")
    return "script";
  if (n === "mathsf")
    return "sans-serif";
  if (n === "mathtt")
    return "monospace";
  var i = e.text;
  if (["\\imath", "\\jmath"].includes(i))
    return null;
  me[a][i] && me[a][i].replace && (i = me[a][i].replace);
  var l = D.fontMap[n].fontName;
  return hr(i, l, a) ? D.fontMap[n].variant : null;
};
function L0(t) {
  if (!t)
    return !1;
  if (t.type === "mi" && t.children.length === 1) {
    var e = t.children[0];
    return e instanceof Ke && e.text === ".";
  } else if (t.type === "mo" && t.children.length === 1 && t.getAttribute("separator") === "true" && t.getAttribute("lspace") === "0em" && t.getAttribute("rspace") === "0em") {
    var r = t.children[0];
    return r instanceof Ke && r.text === ",";
  } else
    return !1;
}
var Re = function(e, r, n) {
  if (e.length === 1) {
    var a = he(e[0], r);
    return n && a instanceof Pe && a.type === "mo" && (a.setAttribute("lspace", "0em"), a.setAttribute("rspace", "0em")), [a];
  }
  for (var i = [], l, s = 0; s < e.length; s++) {
    var o = he(e[s], r);
    if (o instanceof Pe && l instanceof Pe) {
      if (o.type === "mtext" && l.type === "mtext" && o.getAttribute("mathvariant") === l.getAttribute("mathvariant")) {
        l.children.push(...o.children);
        continue;
      } else if (o.type === "mn" && l.type === "mn") {
        l.children.push(...o.children);
        continue;
      } else if (L0(o) && l.type === "mn") {
        l.children.push(...o.children);
        continue;
      } else if (o.type === "mn" && L0(l))
        o.children = [...l.children, ...o.children], i.pop();
      else if ((o.type === "msup" || o.type === "msub") && o.children.length >= 1 && (l.type === "mn" || L0(l))) {
        var m = o.children[0];
        m instanceof Pe && m.type === "mn" && (m.children = [...l.children, ...m.children], i.pop());
      } else if (l.type === "mi" && l.children.length === 1) {
        var d = l.children[0];
        if (d instanceof Ke && d.text === "̸" && (o.type === "mo" || o.type === "mi" || o.type === "mn")) {
          var c = o.children[0];
          c instanceof Ke && c.text.length > 0 && (c.text = c.text.slice(0, 1) + "̸" + c.text.slice(1), i.pop());
        }
      }
    }
    i.push(o), l = o;
  }
  return i;
}, yt = function(e, r, n) {
  return cr(Re(e, r, n));
}, he = function(e, r) {
  if (!e)
    return new O.MathNode("mrow");
  if (g0[e.type]) {
    var n = g0[e.type](e, r);
    return n;
  } else
    throw new R("Got group of unknown type: '" + e.type + "'");
};
function an(t, e, r, n, a) {
  var i = Re(t, r), l;
  i.length === 1 && i[0] instanceof Pe && ["mrow", "mtable"].includes(i[0].type) ? l = i[0] : l = new O.MathNode("mrow", i);
  var s = new O.MathNode("annotation", [new O.TextNode(e)]);
  s.setAttribute("encoding", "application/x-tex");
  var o = new O.MathNode("semantics", [l, s]), m = new O.MathNode("math", [o]);
  m.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), n && m.setAttribute("display", "block");
  var d = a ? "katex" : "katex-mathml";
  return D.makeSpan([d], [m]);
}
var du = function(e) {
  return new lt({
    style: e.displayMode ? Z.DISPLAY : Z.TEXT,
    maxSize: e.maxSize,
    minRuleThickness: e.minRuleThickness
  });
}, pu = function(e, r) {
  if (r.displayMode) {
    var n = ["katex-display"];
    r.leqno && n.push("leqno"), r.fleqn && n.push("fleqn"), e = D.makeSpan(n, [e]);
  }
  return e;
}, gu = function(e, r, n) {
  var a = du(n), i;
  if (n.output === "mathml")
    return an(e, r, a, n.displayMode, !0);
  if (n.output === "html") {
    var l = nn(e, a);
    i = D.makeSpan(["katex"], [l]);
  } else {
    var s = an(e, r, a, n.displayMode, !1), o = nn(e, a);
    i = D.makeSpan(["katex"], [s, o]);
  }
  return pu(i, n);
}, vu = {
  widehat: "^",
  widecheck: "ˇ",
  widetilde: "~",
  utilde: "~",
  overleftarrow: "←",
  underleftarrow: "←",
  xleftarrow: "←",
  overrightarrow: "→",
  underrightarrow: "→",
  xrightarrow: "→",
  underbrace: "⏟",
  overbrace: "⏞",
  overgroup: "⏠",
  undergroup: "⏡",
  overleftrightarrow: "↔",
  underleftrightarrow: "↔",
  xleftrightarrow: "↔",
  Overrightarrow: "⇒",
  xRightarrow: "⇒",
  overleftharpoon: "↼",
  xleftharpoonup: "↼",
  overrightharpoon: "⇀",
  xrightharpoonup: "⇀",
  xLeftarrow: "⇐",
  xLeftrightarrow: "⇔",
  xhookleftarrow: "↩",
  xhookrightarrow: "↪",
  xmapsto: "↦",
  xrightharpoondown: "⇁",
  xleftharpoondown: "↽",
  xrightleftharpoons: "⇌",
  xleftrightharpoons: "⇋",
  xtwoheadleftarrow: "↞",
  xtwoheadrightarrow: "↠",
  xlongequal: "=",
  xtofrom: "⇄",
  xrightleftarrows: "⇄",
  xrightequilibrium: "⇌",
  // Not a perfect match.
  xleftequilibrium: "⇋",
  // None better available.
  "\\cdrightarrow": "→",
  "\\cdleftarrow": "←",
  "\\cdlongequal": "="
}, bu = function(e) {
  var r = new O.MathNode("mo", [new O.TextNode(vu[e.replace(/^\\/, "")])]);
  return r.setAttribute("stretchy", "true"), r;
}, xu = {
  //   path(s), minWidth, height, align
  overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
  "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
  // CD minwwidth2.5pc
  xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
  "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
  Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
  xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
  xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
  overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
  overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
  xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
  "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
  xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
  xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
  overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
  underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
  underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
  xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
  xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
  xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
  xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
  xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
  overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
  undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
  xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
  xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
  // The next three arrows are from the mhchem package.
  // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
  // document as \xrightarrow or \xrightleftharpoons. Those have
  // min-length = 1.75em, so we set min-length on these next three to match.
  xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
  xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
  xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
}, yu = function(e) {
  return e.type === "ordgroup" ? e.body.length : 1;
}, wu = function(e, r) {
  function n() {
    var s = 4e5, o = e.label.slice(1);
    if (["widehat", "widecheck", "widetilde", "utilde"].includes(o)) {
      var m = e, d = yu(m.base), c, v, p;
      if (d > 5)
        o === "widehat" || o === "widecheck" ? (c = 420, s = 2364, p = 0.42, v = o + "4") : (c = 312, s = 2340, p = 0.34, v = "tilde4");
      else {
        var w = [1, 1, 2, 2, 3, 3][d];
        o === "widehat" || o === "widecheck" ? (s = [0, 1062, 2364, 2364, 2364][w], c = [0, 239, 300, 360, 420][w], p = [0, 0.24, 0.3, 0.3, 0.36, 0.42][w], v = o + w) : (s = [0, 600, 1033, 2339, 2340][w], c = [0, 260, 286, 306, 312][w], p = [0, 0.26, 0.286, 0.3, 0.306, 0.34][w], v = "tilde" + w);
      }
      var T = new Tt(v), B = new xt([T], {
        width: "100%",
        height: V(p),
        viewBox: "0 0 " + s + " " + c,
        preserveAspectRatio: "none"
      });
      return {
        span: D.makeSvgSpan([], [B], r),
        minWidth: 0,
        height: p
      };
    } else {
      var C = [], b = xu[o], [k, I, F] = b, z = F / 1e3, N = k.length, H, q;
      if (N === 1) {
        var E = b[3];
        H = ["hide-tail"], q = [E];
      } else if (N === 2)
        H = ["halfarrow-left", "halfarrow-right"], q = ["xMinYMin", "xMaxYMin"];
      else if (N === 3)
        H = ["brace-left", "brace-center", "brace-right"], q = ["xMinYMin", "xMidYMin", "xMaxYMin"];
      else
        throw new Error(`Correct katexImagesData or update code here to support
                    ` + N + " children.");
      for (var P = 0; P < N; P++) {
        var $ = new Tt(k[P]), ee = new xt([$], {
          width: "400em",
          height: V(z),
          viewBox: "0 0 " + s + " " + F,
          preserveAspectRatio: q[P] + " slice"
        }), K = D.makeSvgSpan([H[P]], [ee], r);
        if (N === 1)
          return {
            span: K,
            minWidth: I,
            height: z
          };
        K.style.height = V(z), C.push(K);
      }
      return {
        span: D.makeSpan(["stretchy"], C, r),
        minWidth: I,
        height: z
      };
    }
  }
  var {
    span: a,
    minWidth: i,
    height: l
  } = n();
  return a.height = l, a.style.height = V(l), i > 0 && (a.style.minWidth = V(i)), a;
}, ku = function(e, r, n, a, i) {
  var l, s = e.height + e.depth + n + a;
  if (/fbox|color|angl/.test(r)) {
    if (l = D.makeSpan(["stretchy", r], [], i), r === "fbox") {
      var o = i.color && i.getColor();
      o && (l.style.borderColor = o);
    }
  } else {
    var m = [];
    /^[bx]cancel$/.test(r) && m.push(new Zr({
      x1: "0",
      y1: "0",
      x2: "100%",
      y2: "100%",
      "stroke-width": "0.046em"
    })), /^x?cancel$/.test(r) && m.push(new Zr({
      x1: "0",
      y1: "100%",
      x2: "100%",
      y2: "0",
      "stroke-width": "0.046em"
    }));
    var d = new xt(m, {
      width: "100%",
      height: V(s)
    });
    l = D.makeSvgSpan([], [d], i);
  }
  return l.height = s, l.style.height = V(s), l;
}, mt = {
  encloseSpan: ku,
  mathMLnode: bu,
  svgSpan: wu
};
function J(t, e) {
  if (!t || t.type !== e)
    throw new Error("Expected node of type " + e + ", but got " + (t ? "node of type " + t.type : String(t)));
  return t;
}
function dr(t) {
  var e = k0(t);
  if (!e)
    throw new Error("Expected node of symbol group type, but got " + (t ? "node of type " + t.type : String(t)));
  return e;
}
function k0(t) {
  return t && (t.type === "atom" || js.hasOwnProperty(t.type)) ? t : null;
}
var pr = (t, e) => {
  var r, n, a;
  t && t.type === "supsub" ? (n = J(t.base, "accent"), r = n.base, t.base = r, a = Us(ie(t, e)), t.base = n) : (n = J(t, "accent"), r = n.base);
  var i = ie(r, e.havingCrampedStyle()), l = n.isShifty && le.isCharacterBox(r), s = 0;
  if (l) {
    var o = le.getBaseElem(r), m = ie(o, e.havingCrampedStyle());
    s = Qr(m).skew;
  }
  var d = n.label === "\\c", c = d ? i.height + i.depth : Math.min(i.height, e.fontMetrics().xHeight), v;
  if (n.isStretchy)
    v = mt.svgSpan(n, e), v = D.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: i
      }, {
        type: "elem",
        elem: v,
        wrapperClasses: ["svg-align"],
        wrapperStyle: s > 0 ? {
          width: "calc(100% - " + V(2 * s) + ")",
          marginLeft: V(2 * s)
        } : void 0
      }]
    }, e);
  else {
    var p, w;
    n.label === "\\vec" ? (p = D.staticSvg("vec", e), w = D.svgData.vec[1]) : (p = D.makeOrd({
      mode: n.mode,
      text: n.label
    }, e, "textord"), p = Qr(p), p.italic = 0, w = p.width, d && (c += p.depth)), v = D.makeSpan(["accent-body"], [p]);
    var T = n.label === "\\textcircled";
    T && (v.classes.push("accent-full"), c = i.height);
    var B = s;
    T || (B -= w / 2), v.style.left = V(B), n.label === "\\textcircled" && (v.style.top = ".2em"), v = D.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: i
      }, {
        type: "kern",
        size: -c
      }, {
        type: "elem",
        elem: v
      }]
    }, e);
  }
  var C = D.makeSpan(["mord", "accent"], [v], e);
  return a ? (a.children[0] = C, a.height = Math.max(C.height, a.height), a.classes[0] = "mord", a) : C;
}, fa = (t, e) => {
  var r = t.isStretchy ? mt.mathMLnode(t.label) : new O.MathNode("mo", [Ue(t.label, t.mode)]), n = new O.MathNode("mover", [he(t.base, e), r]);
  return n.setAttribute("accent", "true"), n;
}, Su = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((t) => "\\" + t).join("|"));
U({
  type: "accent",
  names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
  props: {
    numArgs: 1
  },
  handler: (t, e) => {
    var r = v0(e[0]), n = !Su.test(t.funcName), a = !n || t.funcName === "\\widehat" || t.funcName === "\\widetilde" || t.funcName === "\\widecheck";
    return {
      type: "accent",
      mode: t.parser.mode,
      label: t.funcName,
      isStretchy: n,
      isShifty: a,
      base: r
    };
  },
  htmlBuilder: pr,
  mathmlBuilder: fa
});
U({
  type: "accent",
  names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
  props: {
    numArgs: 1,
    allowedInText: !0,
    allowedInMath: !0,
    // unless in strict mode
    argTypes: ["primitive"]
  },
  handler: (t, e) => {
    var r = e[0], n = t.parser.mode;
    return n === "math" && (t.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + t.funcName + " works only in text mode"), n = "text"), {
      type: "accent",
      mode: n,
      label: t.funcName,
      isStretchy: !1,
      isShifty: !0,
      base: r
    };
  },
  htmlBuilder: pr,
  mathmlBuilder: fa
});
U({
  type: "accentUnder",
  names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
  props: {
    numArgs: 1
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0];
    return {
      type: "accentUnder",
      mode: r.mode,
      label: n,
      base: a
    };
  },
  htmlBuilder: (t, e) => {
    var r = ie(t.base, e), n = mt.svgSpan(t, e), a = t.label === "\\utilde" ? 0.12 : 0, i = D.makeVList({
      positionType: "top",
      positionData: r.height,
      children: [{
        type: "elem",
        elem: n,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: a
      }, {
        type: "elem",
        elem: r
      }]
    }, e);
    return D.makeSpan(["mord", "accentunder"], [i], e);
  },
  mathmlBuilder: (t, e) => {
    var r = mt.mathMLnode(t.label), n = new O.MathNode("munder", [he(t.base, e), r]);
    return n.setAttribute("accentunder", "true"), n;
  }
});
var l0 = (t) => {
  var e = new O.MathNode("mpadded", t ? [t] : []);
  return e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e;
};
U({
  type: "xArrow",
  names: [
    "\\xleftarrow",
    "\\xrightarrow",
    "\\xLeftarrow",
    "\\xRightarrow",
    "\\xleftrightarrow",
    "\\xLeftrightarrow",
    "\\xhookleftarrow",
    "\\xhookrightarrow",
    "\\xmapsto",
    "\\xrightharpoondown",
    "\\xrightharpoonup",
    "\\xleftharpoondown",
    "\\xleftharpoonup",
    "\\xrightleftharpoons",
    "\\xleftrightharpoons",
    "\\xlongequal",
    "\\xtwoheadrightarrow",
    "\\xtwoheadleftarrow",
    "\\xtofrom",
    // The next 3 functions are here to support the mhchem extension.
    // Direct use of these functions is discouraged and may break someday.
    "\\xrightleftarrows",
    "\\xrightequilibrium",
    "\\xleftequilibrium",
    // The next 3 functions are here only to support the {CD} environment.
    "\\\\cdrightarrow",
    "\\\\cdleftarrow",
    "\\\\cdlongequal"
  ],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler(t, e, r) {
    var {
      parser: n,
      funcName: a
    } = t;
    return {
      type: "xArrow",
      mode: n.mode,
      label: a,
      body: e[0],
      below: r[0]
    };
  },
  // Flow is unable to correctly infer the type of `group`, even though it's
  // unambiguously determined from the passed-in `type` above.
  htmlBuilder(t, e) {
    var r = e.style, n = e.havingStyle(r.sup()), a = D.wrapFragment(ie(t.body, n, e), e), i = t.label.slice(0, 2) === "\\x" ? "x" : "cd";
    a.classes.push(i + "-arrow-pad");
    var l;
    t.below && (n = e.havingStyle(r.sub()), l = D.wrapFragment(ie(t.below, n, e), e), l.classes.push(i + "-arrow-pad"));
    var s = mt.svgSpan(t, e), o = -e.fontMetrics().axisHeight + 0.5 * s.height, m = -e.fontMetrics().axisHeight - 0.5 * s.height - 0.111;
    (a.depth > 0.25 || t.label === "\\xleftequilibrium") && (m -= a.depth);
    var d;
    if (l) {
      var c = -e.fontMetrics().axisHeight + l.height + 0.5 * s.height + 0.111;
      d = D.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: a,
          shift: m
        }, {
          type: "elem",
          elem: s,
          shift: o
        }, {
          type: "elem",
          elem: l,
          shift: c
        }]
      }, e);
    } else
      d = D.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: a,
          shift: m
        }, {
          type: "elem",
          elem: s,
          shift: o
        }]
      }, e);
    return d.children[0].children[0].children[1].classes.push("svg-align"), D.makeSpan(["mrel", "x-arrow"], [d], e);
  },
  mathmlBuilder(t, e) {
    var r = mt.mathMLnode(t.label);
    r.setAttribute("minsize", t.label.charAt(0) === "x" ? "1.75em" : "3.0em");
    var n;
    if (t.body) {
      var a = l0(he(t.body, e));
      if (t.below) {
        var i = l0(he(t.below, e));
        n = new O.MathNode("munderover", [r, i, a]);
      } else
        n = new O.MathNode("mover", [r, a]);
    } else if (t.below) {
      var l = l0(he(t.below, e));
      n = new O.MathNode("munder", [r, l]);
    } else
      n = l0(), n = new O.MathNode("mover", [r, n]);
    return n;
  }
});
var zu = D.makeSpan;
function da(t, e) {
  var r = ze(t.body, e, !0);
  return zu([t.mclass], r, e);
}
function pa(t, e) {
  var r, n = Re(t.body, e);
  return t.mclass === "minner" ? r = new O.MathNode("mpadded", n) : t.mclass === "mord" ? t.isCharacterBox ? (r = n[0], r.type = "mi") : r = new O.MathNode("mi", n) : (t.isCharacterBox ? (r = n[0], r.type = "mo") : r = new O.MathNode("mo", n), t.mclass === "mbin" ? (r.attributes.lspace = "0.22em", r.attributes.rspace = "0.22em") : t.mclass === "mpunct" ? (r.attributes.lspace = "0em", r.attributes.rspace = "0.17em") : t.mclass === "mopen" || t.mclass === "mclose" ? (r.attributes.lspace = "0em", r.attributes.rspace = "0em") : t.mclass === "minner" && (r.attributes.lspace = "0.0556em", r.attributes.width = "+0.1111em")), r;
}
U({
  type: "mclass",
  names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0];
    return {
      type: "mclass",
      mode: r.mode,
      mclass: "m" + n.slice(5),
      // TODO(kevinb): don't prefix with 'm'
      body: ye(a),
      isCharacterBox: le.isCharacterBox(a)
    };
  },
  htmlBuilder: da,
  mathmlBuilder: pa
});
var S0 = (t) => {
  var e = t.type === "ordgroup" && t.body.length ? t.body[0] : t;
  return e.type === "atom" && (e.family === "bin" || e.family === "rel") ? "m" + e.family : "mord";
};
U({
  type: "mclass",
  names: ["\\@binrel"],
  props: {
    numArgs: 2
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "mclass",
      mode: r.mode,
      mclass: S0(e[0]),
      body: ye(e[1]),
      isCharacterBox: le.isCharacterBox(e[1])
    };
  }
});
U({
  type: "mclass",
  names: ["\\stackrel", "\\overset", "\\underset"],
  props: {
    numArgs: 2
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t, a = e[1], i = e[0], l;
    n !== "\\stackrel" ? l = S0(a) : l = "mrel";
    var s = {
      type: "op",
      mode: a.mode,
      limits: !0,
      alwaysHandleSupSub: !0,
      parentIsSupSub: !1,
      symbol: !1,
      suppressBaseShift: n !== "\\stackrel",
      body: ye(a)
    }, o = {
      type: "supsub",
      mode: i.mode,
      base: s,
      sup: n === "\\underset" ? null : i,
      sub: n === "\\underset" ? i : null
    };
    return {
      type: "mclass",
      mode: r.mode,
      mclass: l,
      body: [o],
      isCharacterBox: le.isCharacterBox(o)
    };
  },
  htmlBuilder: da,
  mathmlBuilder: pa
});
U({
  type: "pmb",
  names: ["\\pmb"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "pmb",
      mode: r.mode,
      mclass: S0(e[0]),
      body: ye(e[0])
    };
  },
  htmlBuilder(t, e) {
    var r = ze(t.body, e, !0), n = D.makeSpan([t.mclass], r, e);
    return n.style.textShadow = "0.02em 0.01em 0.04px", n;
  },
  mathmlBuilder(t, e) {
    var r = Re(t.body, e), n = new O.MathNode("mstyle", r);
    return n.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), n;
  }
});
var Au = {
  ">": "\\\\cdrightarrow",
  "<": "\\\\cdleftarrow",
  "=": "\\\\cdlongequal",
  A: "\\uparrow",
  V: "\\downarrow",
  "|": "\\Vert",
  ".": "no arrow"
}, ln = () => ({
  type: "styling",
  body: [],
  mode: "math",
  style: "display"
}), sn = (t) => t.type === "textord" && t.text === "@", Mu = (t, e) => (t.type === "mathord" || t.type === "atom") && t.text === e;
function Tu(t, e, r) {
  var n = Au[t];
  switch (n) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return r.callFunction(n, [e[0]], [e[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var a = r.callFunction("\\\\cdleft", [e[0]], []), i = {
        type: "atom",
        text: n,
        mode: "math",
        family: "rel"
      }, l = r.callFunction("\\Big", [i], []), s = r.callFunction("\\\\cdright", [e[1]], []), o = {
        type: "ordgroup",
        mode: "math",
        body: [a, l, s]
      };
      return r.callFunction("\\\\cdparent", [o], []);
    }
    case "\\\\cdlongequal":
      return r.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var m = {
        type: "textord",
        text: "\\Vert",
        mode: "math"
      };
      return r.callFunction("\\Big", [m], []);
    }
    default:
      return {
        type: "textord",
        text: " ",
        mode: "math"
      };
  }
}
function Cu(t) {
  var e = [];
  for (t.gullet.beginGroup(), t.gullet.macros.set("\\cr", "\\\\\\relax"), t.gullet.beginGroup(); ; ) {
    e.push(t.parseExpression(!1, "\\\\")), t.gullet.endGroup(), t.gullet.beginGroup();
    var r = t.fetch().text;
    if (r === "&" || r === "\\\\")
      t.consume();
    else if (r === "\\end") {
      e[e.length - 1].length === 0 && e.pop();
      break;
    } else
      throw new R("Expected \\\\ or \\cr or \\end", t.nextToken);
  }
  for (var n = [], a = [n], i = 0; i < e.length; i++) {
    for (var l = e[i], s = ln(), o = 0; o < l.length; o++)
      if (!sn(l[o]))
        s.body.push(l[o]);
      else {
        n.push(s), o += 1;
        var m = dr(l[o]).text, d = new Array(2);
        if (d[0] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, d[1] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, !("=|.".indexOf(m) > -1)) if ("<>AV".indexOf(m) > -1)
          for (var c = 0; c < 2; c++) {
            for (var v = !0, p = o + 1; p < l.length; p++) {
              if (Mu(l[p], m)) {
                v = !1, o = p;
                break;
              }
              if (sn(l[p]))
                throw new R("Missing a " + m + " character to complete a CD arrow.", l[p]);
              d[c].body.push(l[p]);
            }
            if (v)
              throw new R("Missing a " + m + " character to complete a CD arrow.", l[o]);
          }
        else
          throw new R('Expected one of "<>AV=|." after @', l[o]);
        var w = Tu(m, d, t), T = {
          type: "styling",
          body: [w],
          mode: "math",
          style: "display"
          // CD is always displaystyle.
        };
        n.push(T), s = ln();
      }
    i % 2 === 0 ? n.push(s) : n.shift(), n = [], a.push(n);
  }
  t.gullet.endGroup(), t.gullet.endGroup();
  var B = new Array(a[0].length).fill({
    type: "align",
    align: "c",
    pregap: 0.25,
    // CD package sets \enskip between columns.
    postgap: 0.25
    // So pre and post each get half an \enskip, i.e. 0.25em.
  });
  return {
    type: "array",
    mode: "math",
    body: a,
    arraystretch: 1,
    addJot: !0,
    rowGaps: [null],
    cols: B,
    colSeparationType: "CD",
    hLinesBeforeRow: new Array(a.length + 1).fill([])
  };
}
U({
  type: "cdlabel",
  names: ["\\\\cdleft", "\\\\cdright"],
  props: {
    numArgs: 1
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t;
    return {
      type: "cdlabel",
      mode: r.mode,
      side: n.slice(4),
      label: e[0]
    };
  },
  htmlBuilder(t, e) {
    var r = e.havingStyle(e.style.sup()), n = D.wrapFragment(ie(t.label, r, e), e);
    return n.classes.push("cd-label-" + t.side), n.style.bottom = V(0.8 - n.depth), n.height = 0, n.depth = 0, n;
  },
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mrow", [he(t.label, e)]);
    return r = new O.MathNode("mpadded", [r]), r.setAttribute("width", "0"), t.side === "left" && r.setAttribute("lspace", "-1width"), r.setAttribute("voffset", "0.7em"), r = new O.MathNode("mstyle", [r]), r.setAttribute("displaystyle", "false"), r.setAttribute("scriptlevel", "1"), r;
  }
});
U({
  type: "cdlabelparent",
  names: ["\\\\cdparent"],
  props: {
    numArgs: 1
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "cdlabelparent",
      mode: r.mode,
      fragment: e[0]
    };
  },
  htmlBuilder(t, e) {
    var r = D.wrapFragment(ie(t.fragment, e), e);
    return r.classes.push("cd-vert-arrow"), r;
  },
  mathmlBuilder(t, e) {
    return new O.MathNode("mrow", [he(t.fragment, e)]);
  }
});
U({
  type: "textord",
  names: ["\\@char"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(t, e) {
    for (var {
      parser: r
    } = t, n = J(e[0], "ordgroup"), a = n.body, i = "", l = 0; l < a.length; l++) {
      var s = J(a[l], "textord");
      i += s.text;
    }
    var o = parseInt(i), m;
    if (isNaN(o))
      throw new R("\\@char has non-numeric argument " + i);
    if (o < 0 || o >= 1114111)
      throw new R("\\@char with invalid code point " + i);
    return o <= 65535 ? m = String.fromCharCode(o) : (o -= 65536, m = String.fromCharCode((o >> 10) + 55296, (o & 1023) + 56320)), {
      type: "textord",
      mode: r.mode,
      text: m
    };
  }
});
var ga = (t, e) => {
  var r = ze(t.body, e.withColor(t.color), !1);
  return D.makeFragment(r);
}, va = (t, e) => {
  var r = Re(t.body, e.withColor(t.color)), n = new O.MathNode("mstyle", r);
  return n.setAttribute("mathcolor", t.color), n;
};
U({
  type: "color",
  names: ["\\textcolor"],
  props: {
    numArgs: 2,
    allowedInText: !0,
    argTypes: ["color", "original"]
  },
  handler(t, e) {
    var {
      parser: r
    } = t, n = J(e[0], "color-token").color, a = e[1];
    return {
      type: "color",
      mode: r.mode,
      color: n,
      body: ye(a)
    };
  },
  htmlBuilder: ga,
  mathmlBuilder: va
});
U({
  type: "color",
  names: ["\\color"],
  props: {
    numArgs: 1,
    allowedInText: !0,
    argTypes: ["color"]
  },
  handler(t, e) {
    var {
      parser: r,
      breakOnTokenText: n
    } = t, a = J(e[0], "color-token").color;
    r.gullet.macros.set("\\current@color", a);
    var i = r.parseExpression(!0, n);
    return {
      type: "color",
      mode: r.mode,
      color: a,
      body: i
    };
  },
  htmlBuilder: ga,
  mathmlBuilder: va
});
U({
  type: "cr",
  names: ["\\\\"],
  props: {
    numArgs: 0,
    numOptionalArgs: 0,
    allowedInText: !0
  },
  handler(t, e, r) {
    var {
      parser: n
    } = t, a = n.gullet.future().text === "[" ? n.parseSizeGroup(!0) : null, i = !n.settings.displayMode || !n.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
    return {
      type: "cr",
      mode: n.mode,
      newLine: i,
      size: a && J(a, "size").value
    };
  },
  // The following builders are called only at the top level,
  // not within tabular/array environments.
  htmlBuilder(t, e) {
    var r = D.makeSpan(["mspace"], [], e);
    return t.newLine && (r.classes.push("newline"), t.size && (r.style.marginTop = V(be(t.size, e)))), r;
  },
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mspace");
    return t.newLine && (r.setAttribute("linebreak", "newline"), t.size && r.setAttribute("height", V(be(t.size, e)))), r;
  }
});
var rr = {
  "\\global": "\\global",
  "\\long": "\\\\globallong",
  "\\\\globallong": "\\\\globallong",
  "\\def": "\\gdef",
  "\\gdef": "\\gdef",
  "\\edef": "\\xdef",
  "\\xdef": "\\xdef",
  "\\let": "\\\\globallet",
  "\\futurelet": "\\\\globalfuture"
}, ba = (t) => {
  var e = t.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(e))
    throw new R("Expected a control sequence", t);
  return e;
}, Fu = (t) => {
  var e = t.gullet.popToken();
  return e.text === "=" && (e = t.gullet.popToken(), e.text === " " && (e = t.gullet.popToken())), e;
}, xa = (t, e, r, n) => {
  var a = t.gullet.macros.get(r.text);
  a == null && (r.noexpand = !0, a = {
    tokens: [r],
    numArgs: 0,
    // reproduce the same behavior in expansion
    unexpandable: !t.gullet.isExpandable(r.text)
  }), t.gullet.macros.set(e, a, n);
};
U({
  type: "internal",
  names: [
    "\\global",
    "\\long",
    "\\\\globallong"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r
    } = t;
    e.consumeSpaces();
    var n = e.fetch();
    if (rr[n.text])
      return (r === "\\global" || r === "\\\\globallong") && (n.text = rr[n.text]), J(e.parseFunction(), "internal");
    throw new R("Invalid token after macro prefix", n);
  }
});
U({
  type: "internal",
  names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r
    } = t, n = e.gullet.popToken(), a = n.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(a))
      throw new R("Expected a control sequence", n);
    for (var i = 0, l, s = [[]]; e.gullet.future().text !== "{"; )
      if (n = e.gullet.popToken(), n.text === "#") {
        if (e.gullet.future().text === "{") {
          l = e.gullet.future(), s[i].push("{");
          break;
        }
        if (n = e.gullet.popToken(), !/^[1-9]$/.test(n.text))
          throw new R('Invalid argument number "' + n.text + '"');
        if (parseInt(n.text) !== i + 1)
          throw new R('Argument number "' + n.text + '" out of order');
        i++, s.push([]);
      } else {
        if (n.text === "EOF")
          throw new R("Expected a macro definition");
        s[i].push(n.text);
      }
    var {
      tokens: o
    } = e.gullet.consumeArg();
    return l && o.unshift(l), (r === "\\edef" || r === "\\xdef") && (o = e.gullet.expandTokens(o), o.reverse()), e.gullet.macros.set(a, {
      tokens: o,
      numArgs: i,
      delimiters: s
    }, r === rr[r]), {
      type: "internal",
      mode: e.mode
    };
  }
});
U({
  type: "internal",
  names: [
    "\\let",
    "\\\\globallet"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r
    } = t, n = ba(e.gullet.popToken());
    e.gullet.consumeSpaces();
    var a = Fu(e);
    return xa(e, n, a, r === "\\\\globallet"), {
      type: "internal",
      mode: e.mode
    };
  }
});
U({
  type: "internal",
  names: [
    "\\futurelet",
    "\\\\globalfuture"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r
    } = t, n = ba(e.gullet.popToken()), a = e.gullet.popToken(), i = e.gullet.popToken();
    return xa(e, n, i, r === "\\\\globalfuture"), e.gullet.pushToken(i), e.gullet.pushToken(a), {
      type: "internal",
      mode: e.mode
    };
  }
});
var Gt = function(e, r, n) {
  var a = me.math[e] && me.math[e].replace, i = hr(a || e, r, n);
  if (!i)
    throw new Error("Unsupported symbol " + e + " and font size " + r + ".");
  return i;
}, gr = function(e, r, n, a) {
  var i = n.havingBaseStyle(r), l = D.makeSpan(a.concat(i.sizingClasses(n)), [e], n), s = i.sizeMultiplier / n.sizeMultiplier;
  return l.height *= s, l.depth *= s, l.maxFontSize = i.sizeMultiplier, l;
}, ya = function(e, r, n) {
  var a = r.havingBaseStyle(n), i = (1 - r.sizeMultiplier / a.sizeMultiplier) * r.fontMetrics().axisHeight;
  e.classes.push("delimcenter"), e.style.top = V(i), e.height -= i, e.depth += i;
}, Du = function(e, r, n, a, i, l) {
  var s = D.makeSymbol(e, "Main-Regular", i, a), o = gr(s, r, a, l);
  return n && ya(o, a, r), o;
}, Eu = function(e, r, n, a) {
  return D.makeSymbol(e, "Size" + r + "-Regular", n, a);
}, wa = function(e, r, n, a, i, l) {
  var s = Eu(e, r, i, a), o = gr(D.makeSpan(["delimsizing", "size" + r], [s], a), Z.TEXT, a, l);
  return n && ya(o, a, Z.TEXT), o;
}, O0 = function(e, r, n) {
  var a;
  r === "Size1-Regular" ? a = "delim-size1" : a = "delim-size4";
  var i = D.makeSpan(["delimsizinginner", a], [D.makeSpan([], [D.makeSymbol(e, r, n)])]);
  return {
    type: "elem",
    elem: i
  };
}, R0 = function(e, r, n) {
  var a = st["Size4-Regular"][e.charCodeAt(0)] ? st["Size4-Regular"][e.charCodeAt(0)][4] : st["Size1-Regular"][e.charCodeAt(0)][4], i = new Tt("inner", Ls(e, Math.round(1e3 * r))), l = new xt([i], {
    width: V(a),
    height: V(r),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + V(a),
    viewBox: "0 0 " + 1e3 * a + " " + Math.round(1e3 * r),
    preserveAspectRatio: "xMinYMin"
  }), s = D.makeSvgSpan([], [l], n);
  return s.height = r, s.style.height = V(r), s.style.width = V(a), {
    type: "elem",
    elem: s
  };
}, nr = 8e-3, s0 = {
  type: "kern",
  size: -1 * nr
}, Iu = ["|", "\\lvert", "\\rvert", "\\vert"], Bu = ["\\|", "\\lVert", "\\rVert", "\\Vert"], ka = function(e, r, n, a, i, l) {
  var s, o, m, d, c = "", v = 0;
  s = m = d = e, o = null;
  var p = "Size1-Regular";
  e === "\\uparrow" ? m = d = "⏐" : e === "\\Uparrow" ? m = d = "‖" : e === "\\downarrow" ? s = m = "⏐" : e === "\\Downarrow" ? s = m = "‖" : e === "\\updownarrow" ? (s = "\\uparrow", m = "⏐", d = "\\downarrow") : e === "\\Updownarrow" ? (s = "\\Uparrow", m = "‖", d = "\\Downarrow") : Iu.includes(e) ? (m = "∣", c = "vert", v = 333) : Bu.includes(e) ? (m = "∥", c = "doublevert", v = 556) : e === "[" || e === "\\lbrack" ? (s = "⎡", m = "⎢", d = "⎣", p = "Size4-Regular", c = "lbrack", v = 667) : e === "]" || e === "\\rbrack" ? (s = "⎤", m = "⎥", d = "⎦", p = "Size4-Regular", c = "rbrack", v = 667) : e === "\\lfloor" || e === "⌊" ? (m = s = "⎢", d = "⎣", p = "Size4-Regular", c = "lfloor", v = 667) : e === "\\lceil" || e === "⌈" ? (s = "⎡", m = d = "⎢", p = "Size4-Regular", c = "lceil", v = 667) : e === "\\rfloor" || e === "⌋" ? (m = s = "⎥", d = "⎦", p = "Size4-Regular", c = "rfloor", v = 667) : e === "\\rceil" || e === "⌉" ? (s = "⎤", m = d = "⎥", p = "Size4-Regular", c = "rceil", v = 667) : e === "(" || e === "\\lparen" ? (s = "⎛", m = "⎜", d = "⎝", p = "Size4-Regular", c = "lparen", v = 875) : e === ")" || e === "\\rparen" ? (s = "⎞", m = "⎟", d = "⎠", p = "Size4-Regular", c = "rparen", v = 875) : e === "\\{" || e === "\\lbrace" ? (s = "⎧", o = "⎨", d = "⎩", m = "⎪", p = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (s = "⎫", o = "⎬", d = "⎭", m = "⎪", p = "Size4-Regular") : e === "\\lgroup" || e === "⟮" ? (s = "⎧", d = "⎩", m = "⎪", p = "Size4-Regular") : e === "\\rgroup" || e === "⟯" ? (s = "⎫", d = "⎭", m = "⎪", p = "Size4-Regular") : e === "\\lmoustache" || e === "⎰" ? (s = "⎧", d = "⎭", m = "⎪", p = "Size4-Regular") : (e === "\\rmoustache" || e === "⎱") && (s = "⎫", d = "⎩", m = "⎪", p = "Size4-Regular");
  var w = Gt(s, p, i), T = w.height + w.depth, B = Gt(m, p, i), C = B.height + B.depth, b = Gt(d, p, i), k = b.height + b.depth, I = 0, F = 1;
  if (o !== null) {
    var z = Gt(o, p, i);
    I = z.height + z.depth, F = 2;
  }
  var N = T + k + I, H = Math.max(0, Math.ceil((r - N) / (F * C))), q = N + H * F * C, E = a.fontMetrics().axisHeight;
  n && (E *= a.sizeMultiplier);
  var P = q / 2 - E, $ = [];
  if (c.length > 0) {
    var ee = q - T - k, K = Math.round(q * 1e3), _ = Os(c, Math.round(ee * 1e3)), se = new Tt(c, _), ue = (v / 1e3).toFixed(3) + "em", ne = (K / 1e3).toFixed(3) + "em", de = new xt([se], {
      width: ue,
      height: ne,
      viewBox: "0 0 " + v + " " + K
    }), S = D.makeSvgSpan([], [de], a);
    S.height = K / 1e3, S.style.width = ue, S.style.height = ne, $.push({
      type: "elem",
      elem: S
    });
  } else {
    if ($.push(O0(d, p, i)), $.push(s0), o === null) {
      var ce = q - T - k + 2 * nr;
      $.push(R0(m, ce, a));
    } else {
      var ae = (q - T - k - I) / 2 + 2 * nr;
      $.push(R0(m, ae, a)), $.push(s0), $.push(O0(o, p, i)), $.push(s0), $.push(R0(m, ae, a));
    }
    $.push(s0), $.push(O0(s, p, i));
  }
  var A = a.havingBaseStyle(Z.TEXT), pe = D.makeVList({
    positionType: "bottom",
    positionData: P,
    children: $
  }, A);
  return gr(D.makeSpan(["delimsizing", "mult"], [pe], A), Z.TEXT, a, l);
}, P0 = 80, H0 = 0.08, V0 = function(e, r, n, a, i) {
  var l = qs(e, a, n), s = new Tt(e, l), o = new xt([s], {
    // Note: 1000:1 ratio of viewBox to document em width.
    width: "400em",
    height: V(r),
    viewBox: "0 0 400000 " + n,
    preserveAspectRatio: "xMinYMin slice"
  });
  return D.makeSvgSpan(["hide-tail"], [o], i);
}, Nu = function(e, r) {
  var n = r.havingBaseSizing(), a = Ma("\\surd", e * n.sizeMultiplier, Aa, n), i = n.sizeMultiplier, l = Math.max(0, r.minRuleThickness - r.fontMetrics().sqrtRuleThickness), s, o = 0, m = 0, d = 0, c;
  return a.type === "small" ? (d = 1e3 + 1e3 * l + P0, e < 1 ? i = 1 : e < 1.4 && (i = 0.7), o = (1 + l + H0) / i, m = (1 + l) / i, s = V0("sqrtMain", o, d, l, r), s.style.minWidth = "0.853em", c = 0.833 / i) : a.type === "large" ? (d = (1e3 + P0) * Wt[a.size], m = (Wt[a.size] + l) / i, o = (Wt[a.size] + l + H0) / i, s = V0("sqrtSize" + a.size, o, d, l, r), s.style.minWidth = "1.02em", c = 1 / i) : (o = e + l + H0, m = e + l, d = Math.floor(1e3 * e + l) + P0, s = V0("sqrtTall", o, d, l, r), s.style.minWidth = "0.742em", c = 1.056), s.height = m, s.style.height = V(o), {
    span: s,
    advanceWidth: c,
    // Calculate the actual line width.
    // This actually should depend on the chosen font -- e.g. \boldmath
    // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
    // have thicker rules.
    ruleWidth: (r.fontMetrics().sqrtRuleThickness + l) * i
  };
}, Sa = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "\\surd"], qu = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱"], za = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"], Wt = [0, 1.2, 1.8, 2.4, 3], Lu = function(e, r, n, a, i) {
  if (e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle"), Sa.includes(e) || za.includes(e))
    return wa(e, r, !1, n, a, i);
  if (qu.includes(e))
    return ka(e, Wt[r], !1, n, a, i);
  throw new R("Illegal delimiter: '" + e + "'");
}, Ou = [{
  type: "small",
  style: Z.SCRIPTSCRIPT
}, {
  type: "small",
  style: Z.SCRIPT
}, {
  type: "small",
  style: Z.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}], Ru = [{
  type: "small",
  style: Z.SCRIPTSCRIPT
}, {
  type: "small",
  style: Z.SCRIPT
}, {
  type: "small",
  style: Z.TEXT
}, {
  type: "stack"
}], Aa = [{
  type: "small",
  style: Z.SCRIPTSCRIPT
}, {
  type: "small",
  style: Z.SCRIPT
}, {
  type: "small",
  style: Z.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}, {
  type: "stack"
}], Pu = function(e) {
  if (e.type === "small")
    return "Main-Regular";
  if (e.type === "large")
    return "Size" + e.size + "-Regular";
  if (e.type === "stack")
    return "Size4-Regular";
  throw new Error("Add support for delim type '" + e.type + "' here.");
}, Ma = function(e, r, n, a) {
  for (var i = Math.min(2, 3 - a.style.size), l = i; l < n.length && n[l].type !== "stack"; l++) {
    var s = Gt(e, Pu(n[l]), "math"), o = s.height + s.depth;
    if (n[l].type === "small") {
      var m = a.havingBaseStyle(n[l].style);
      o *= m.sizeMultiplier;
    }
    if (o > r)
      return n[l];
  }
  return n[n.length - 1];
}, Ta = function(e, r, n, a, i, l) {
  e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle");
  var s;
  za.includes(e) ? s = Ou : Sa.includes(e) ? s = Aa : s = Ru;
  var o = Ma(e, r, s, a);
  return o.type === "small" ? Du(e, o.style, n, a, i, l) : o.type === "large" ? wa(e, o.size, n, a, i, l) : ka(e, r, n, a, i, l);
}, Hu = function(e, r, n, a, i, l) {
  var s = a.fontMetrics().axisHeight * a.sizeMultiplier, o = 901, m = 5 / a.fontMetrics().ptPerEm, d = Math.max(r - s, n + s), c = Math.max(
    // In real TeX, calculations are done using integral values which are
    // 65536 per pt, or 655360 per em. So, the division here truncates in
    // TeX but doesn't here, producing different results. If we wanted to
    // exactly match TeX's calculation, we could do
    //   Math.floor(655360 * maxDistFromAxis / 500) *
    //    delimiterFactor / 655360
    // (To see the difference, compare
    //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
    // in TeX and KaTeX)
    d / 500 * o,
    2 * d - m
  );
  return Ta(e, c, !0, a, i, l);
}, ot = {
  sqrtImage: Nu,
  sizedDelim: Lu,
  sizeToMaxHeight: Wt,
  customSizedDelim: Ta,
  leftRightDelim: Hu
}, un = {
  "\\bigl": {
    mclass: "mopen",
    size: 1
  },
  "\\Bigl": {
    mclass: "mopen",
    size: 2
  },
  "\\biggl": {
    mclass: "mopen",
    size: 3
  },
  "\\Biggl": {
    mclass: "mopen",
    size: 4
  },
  "\\bigr": {
    mclass: "mclose",
    size: 1
  },
  "\\Bigr": {
    mclass: "mclose",
    size: 2
  },
  "\\biggr": {
    mclass: "mclose",
    size: 3
  },
  "\\Biggr": {
    mclass: "mclose",
    size: 4
  },
  "\\bigm": {
    mclass: "mrel",
    size: 1
  },
  "\\Bigm": {
    mclass: "mrel",
    size: 2
  },
  "\\biggm": {
    mclass: "mrel",
    size: 3
  },
  "\\Biggm": {
    mclass: "mrel",
    size: 4
  },
  "\\big": {
    mclass: "mord",
    size: 1
  },
  "\\Big": {
    mclass: "mord",
    size: 2
  },
  "\\bigg": {
    mclass: "mord",
    size: 3
  },
  "\\Bigg": {
    mclass: "mord",
    size: 4
  }
}, Vu = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "<", ">", "\\langle", "⟨", "\\rangle", "⟩", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
function z0(t, e) {
  var r = k0(t);
  if (r && Vu.includes(r.text))
    return r;
  throw r ? new R("Invalid delimiter '" + r.text + "' after '" + e.funcName + "'", t) : new R("Invalid delimiter type '" + t.type + "'", t);
}
U({
  type: "delimsizing",
  names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
  props: {
    numArgs: 1,
    argTypes: ["primitive"]
  },
  handler: (t, e) => {
    var r = z0(e[0], t);
    return {
      type: "delimsizing",
      mode: t.parser.mode,
      size: un[t.funcName].size,
      mclass: un[t.funcName].mclass,
      delim: r.text
    };
  },
  htmlBuilder: (t, e) => t.delim === "." ? D.makeSpan([t.mclass]) : ot.sizedDelim(t.delim, t.size, e, t.mode, [t.mclass]),
  mathmlBuilder: (t) => {
    var e = [];
    t.delim !== "." && e.push(Ue(t.delim, t.mode));
    var r = new O.MathNode("mo", e);
    t.mclass === "mopen" || t.mclass === "mclose" ? r.setAttribute("fence", "true") : r.setAttribute("fence", "false"), r.setAttribute("stretchy", "true");
    var n = V(ot.sizeToMaxHeight[t.size]);
    return r.setAttribute("minsize", n), r.setAttribute("maxsize", n), r;
  }
});
function on(t) {
  if (!t.body)
    throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
U({
  type: "leftright-right",
  names: ["\\right"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (t, e) => {
    var r = t.parser.gullet.macros.get("\\current@color");
    if (r && typeof r != "string")
      throw new R("\\current@color set to non-string in \\right");
    return {
      type: "leftright-right",
      mode: t.parser.mode,
      delim: z0(e[0], t).text,
      color: r
      // undefined if not set via \color
    };
  }
});
U({
  type: "leftright",
  names: ["\\left"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (t, e) => {
    var r = z0(e[0], t), n = t.parser;
    ++n.leftrightDepth;
    var a = n.parseExpression(!1);
    --n.leftrightDepth, n.expect("\\right", !1);
    var i = J(n.parseFunction(), "leftright-right");
    return {
      type: "leftright",
      mode: n.mode,
      body: a,
      left: r.text,
      right: i.delim,
      rightColor: i.color
    };
  },
  htmlBuilder: (t, e) => {
    on(t);
    for (var r = ze(t.body, e, !0, ["mopen", "mclose"]), n = 0, a = 0, i = !1, l = 0; l < r.length; l++)
      r[l].isMiddle ? i = !0 : (n = Math.max(r[l].height, n), a = Math.max(r[l].depth, a));
    n *= e.sizeMultiplier, a *= e.sizeMultiplier;
    var s;
    if (t.left === "." ? s = Yt(e, ["mopen"]) : s = ot.leftRightDelim(t.left, n, a, e, t.mode, ["mopen"]), r.unshift(s), i)
      for (var o = 1; o < r.length; o++) {
        var m = r[o], d = m.isMiddle;
        d && (r[o] = ot.leftRightDelim(d.delim, n, a, d.options, t.mode, []));
      }
    var c;
    if (t.right === ".")
      c = Yt(e, ["mclose"]);
    else {
      var v = t.rightColor ? e.withColor(t.rightColor) : e;
      c = ot.leftRightDelim(t.right, n, a, v, t.mode, ["mclose"]);
    }
    return r.push(c), D.makeSpan(["minner"], r, e);
  },
  mathmlBuilder: (t, e) => {
    on(t);
    var r = Re(t.body, e);
    if (t.left !== ".") {
      var n = new O.MathNode("mo", [Ue(t.left, t.mode)]);
      n.setAttribute("fence", "true"), r.unshift(n);
    }
    if (t.right !== ".") {
      var a = new O.MathNode("mo", [Ue(t.right, t.mode)]);
      a.setAttribute("fence", "true"), t.rightColor && a.setAttribute("mathcolor", t.rightColor), r.push(a);
    }
    return cr(r);
  }
});
U({
  type: "middle",
  names: ["\\middle"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (t, e) => {
    var r = z0(e[0], t);
    if (!t.parser.leftrightDepth)
      throw new R("\\middle without preceding \\left", r);
    return {
      type: "middle",
      mode: t.parser.mode,
      delim: r.text
    };
  },
  htmlBuilder: (t, e) => {
    var r;
    if (t.delim === ".")
      r = Yt(e, []);
    else {
      r = ot.sizedDelim(t.delim, 1, e, t.mode, []);
      var n = {
        delim: t.delim,
        options: e
      };
      r.isMiddle = n;
    }
    return r;
  },
  mathmlBuilder: (t, e) => {
    var r = t.delim === "\\vert" || t.delim === "|" ? Ue("|", "text") : Ue(t.delim, t.mode), n = new O.MathNode("mo", [r]);
    return n.setAttribute("fence", "true"), n.setAttribute("lspace", "0.05em"), n.setAttribute("rspace", "0.05em"), n;
  }
});
var vr = (t, e) => {
  var r = D.wrapFragment(ie(t.body, e), e), n = t.label.slice(1), a = e.sizeMultiplier, i, l = 0, s = le.isCharacterBox(t.body);
  if (n === "sout")
    i = D.makeSpan(["stretchy", "sout"]), i.height = e.fontMetrics().defaultRuleThickness / a, l = -0.5 * e.fontMetrics().xHeight;
  else if (n === "phase") {
    var o = be({
      number: 0.6,
      unit: "pt"
    }, e), m = be({
      number: 0.35,
      unit: "ex"
    }, e), d = e.havingBaseSizing();
    a = a / d.sizeMultiplier;
    var c = r.height + r.depth + o + m;
    r.style.paddingLeft = V(c / 2 + o);
    var v = Math.floor(1e3 * c * a), p = Bs(v), w = new xt([new Tt("phase", p)], {
      width: "400em",
      height: V(v / 1e3),
      viewBox: "0 0 400000 " + v,
      preserveAspectRatio: "xMinYMin slice"
    });
    i = D.makeSvgSpan(["hide-tail"], [w], e), i.style.height = V(c), l = r.depth + o + m;
  } else {
    /cancel/.test(n) ? s || r.classes.push("cancel-pad") : n === "angl" ? r.classes.push("anglpad") : r.classes.push("boxpad");
    var T = 0, B = 0, C = 0;
    /box/.test(n) ? (C = Math.max(
      e.fontMetrics().fboxrule,
      // default
      e.minRuleThickness
      // User override.
    ), T = e.fontMetrics().fboxsep + (n === "colorbox" ? 0 : C), B = T) : n === "angl" ? (C = Math.max(e.fontMetrics().defaultRuleThickness, e.minRuleThickness), T = 4 * C, B = Math.max(0, 0.25 - r.depth)) : (T = s ? 0.2 : 0, B = T), i = mt.encloseSpan(r, n, T, B, e), /fbox|boxed|fcolorbox/.test(n) ? (i.style.borderStyle = "solid", i.style.borderWidth = V(C)) : n === "angl" && C !== 0.049 && (i.style.borderTopWidth = V(C), i.style.borderRightWidth = V(C)), l = r.depth + B, t.backgroundColor && (i.style.backgroundColor = t.backgroundColor, t.borderColor && (i.style.borderColor = t.borderColor));
  }
  var b;
  if (t.backgroundColor)
    b = D.makeVList({
      positionType: "individualShift",
      children: [
        // Put the color background behind inner;
        {
          type: "elem",
          elem: i,
          shift: l
        },
        {
          type: "elem",
          elem: r,
          shift: 0
        }
      ]
    }, e);
  else {
    var k = /cancel|phase/.test(n) ? ["svg-align"] : [];
    b = D.makeVList({
      positionType: "individualShift",
      children: [
        // Write the \cancel stroke on top of inner.
        {
          type: "elem",
          elem: r,
          shift: 0
        },
        {
          type: "elem",
          elem: i,
          shift: l,
          wrapperClasses: k
        }
      ]
    }, e);
  }
  return /cancel/.test(n) && (b.height = r.height, b.depth = r.depth), /cancel/.test(n) && !s ? D.makeSpan(["mord", "cancel-lap"], [b], e) : D.makeSpan(["mord"], [b], e);
}, br = (t, e) => {
  var r = 0, n = new O.MathNode(t.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [he(t.body, e)]);
  switch (t.label) {
    case "\\cancel":
      n.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      n.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\phase":
      n.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      n.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      n.setAttribute("notation", "box");
      break;
    case "\\angl":
      n.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox":
      if (r = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm, n.setAttribute("width", "+" + 2 * r + "pt"), n.setAttribute("height", "+" + 2 * r + "pt"), n.setAttribute("lspace", r + "pt"), n.setAttribute("voffset", r + "pt"), t.label === "\\fcolorbox") {
        var a = Math.max(
          e.fontMetrics().fboxrule,
          // default
          e.minRuleThickness
          // user override
        );
        n.setAttribute("style", "border: " + a + "em solid " + String(t.borderColor));
      }
      break;
    case "\\xcancel":
      n.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  return t.backgroundColor && n.setAttribute("mathbackground", t.backgroundColor), n;
};
U({
  type: "enclose",
  names: ["\\colorbox"],
  props: {
    numArgs: 2,
    allowedInText: !0,
    argTypes: ["color", "text"]
  },
  handler(t, e, r) {
    var {
      parser: n,
      funcName: a
    } = t, i = J(e[0], "color-token").color, l = e[1];
    return {
      type: "enclose",
      mode: n.mode,
      label: a,
      backgroundColor: i,
      body: l
    };
  },
  htmlBuilder: vr,
  mathmlBuilder: br
});
U({
  type: "enclose",
  names: ["\\fcolorbox"],
  props: {
    numArgs: 3,
    allowedInText: !0,
    argTypes: ["color", "color", "text"]
  },
  handler(t, e, r) {
    var {
      parser: n,
      funcName: a
    } = t, i = J(e[0], "color-token").color, l = J(e[1], "color-token").color, s = e[2];
    return {
      type: "enclose",
      mode: n.mode,
      label: a,
      backgroundColor: l,
      borderColor: i,
      body: s
    };
  },
  htmlBuilder: vr,
  mathmlBuilder: br
});
U({
  type: "enclose",
  names: ["\\fbox"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInText: !0
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "enclose",
      mode: r.mode,
      label: "\\fbox",
      body: e[0]
    };
  }
});
U({
  type: "enclose",
  names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
  props: {
    numArgs: 1
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0];
    return {
      type: "enclose",
      mode: r.mode,
      label: n,
      body: a
    };
  },
  htmlBuilder: vr,
  mathmlBuilder: br
});
U({
  type: "enclose",
  names: ["\\angl"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInText: !1
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "enclose",
      mode: r.mode,
      label: "\\angl",
      body: e[0]
    };
  }
});
var Ca = {};
function tt(t) {
  for (var {
    type: e,
    names: r,
    props: n,
    handler: a,
    htmlBuilder: i,
    mathmlBuilder: l
  } = t, s = {
    type: e,
    numArgs: n.numArgs || 0,
    allowedInText: !1,
    numOptionalArgs: 0,
    handler: a
  }, o = 0; o < r.length; ++o)
    Ca[r[o]] = s;
  i && (p0[e] = i), l && (g0[e] = l);
}
var Fa = {};
function g(t, e) {
  Fa[t] = e;
}
function hn(t) {
  var e = [];
  t.consumeSpaces();
  var r = t.fetch().text;
  for (r === "\\relax" && (t.consume(), t.consumeSpaces(), r = t.fetch().text); r === "\\hline" || r === "\\hdashline"; )
    t.consume(), e.push(r === "\\hdashline"), t.consumeSpaces(), r = t.fetch().text;
  return e;
}
var A0 = (t) => {
  var e = t.parser.settings;
  if (!e.displayMode)
    throw new R("{" + t.envName + "} can be used only in display mode.");
};
function xr(t) {
  if (t.indexOf("ed") === -1)
    return t.indexOf("*") === -1;
}
function kt(t, e, r) {
  var {
    hskipBeforeAndAfter: n,
    addJot: a,
    cols: i,
    arraystretch: l,
    colSeparationType: s,
    autoTag: o,
    singleRow: m,
    emptySingleRow: d,
    maxNumCols: c,
    leqno: v
  } = e;
  if (t.gullet.beginGroup(), m || t.gullet.macros.set("\\cr", "\\\\\\relax"), !l) {
    var p = t.gullet.expandMacroAsText("\\arraystretch");
    if (p == null)
      l = 1;
    else if (l = parseFloat(p), !l || l < 0)
      throw new R("Invalid \\arraystretch: " + p);
  }
  t.gullet.beginGroup();
  var w = [], T = [w], B = [], C = [], b = o != null ? [] : void 0;
  function k() {
    o && t.gullet.macros.set("\\@eqnsw", "1", !0);
  }
  function I() {
    b && (t.gullet.macros.get("\\df@tag") ? (b.push(t.subparse([new Ve("\\df@tag")])), t.gullet.macros.set("\\df@tag", void 0, !0)) : b.push(!!o && t.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (k(), C.push(hn(t)); ; ) {
    var F = t.parseExpression(!1, m ? "\\end" : "\\\\");
    t.gullet.endGroup(), t.gullet.beginGroup(), F = {
      type: "ordgroup",
      mode: t.mode,
      body: F
    }, r && (F = {
      type: "styling",
      mode: t.mode,
      style: r,
      body: [F]
    }), w.push(F);
    var z = t.fetch().text;
    if (z === "&") {
      if (c && w.length === c) {
        if (m || s)
          throw new R("Too many tab characters: &", t.nextToken);
        t.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
      }
      t.consume();
    } else if (z === "\\end") {
      I(), w.length === 1 && F.type === "styling" && F.body[0].body.length === 0 && (T.length > 1 || !d) && T.pop(), C.length < T.length + 1 && C.push([]);
      break;
    } else if (z === "\\\\") {
      t.consume();
      var N = void 0;
      t.gullet.future().text !== " " && (N = t.parseSizeGroup(!0)), B.push(N ? N.value : null), I(), C.push(hn(t)), w = [], T.push(w), k();
    } else
      throw new R("Expected & or \\\\ or \\cr or \\end", t.nextToken);
  }
  return t.gullet.endGroup(), t.gullet.endGroup(), {
    type: "array",
    mode: t.mode,
    addJot: a,
    arraystretch: l,
    body: T,
    cols: i,
    rowGaps: B,
    hskipBeforeAndAfter: n,
    hLinesBeforeRow: C,
    colSeparationType: s,
    tags: b,
    leqno: v
  };
}
function yr(t) {
  return t.slice(0, 1) === "d" ? "display" : "text";
}
var rt = function(e, r) {
  var n, a, i = e.body.length, l = e.hLinesBeforeRow, s = 0, o = new Array(i), m = [], d = Math.max(
    // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
    r.fontMetrics().arrayRuleWidth,
    r.minRuleThickness
    // User override.
  ), c = 1 / r.fontMetrics().ptPerEm, v = 5 * c;
  if (e.colSeparationType && e.colSeparationType === "small") {
    var p = r.havingStyle(Z.SCRIPT).sizeMultiplier;
    v = 0.2778 * (p / r.sizeMultiplier);
  }
  var w = e.colSeparationType === "CD" ? be({
    number: 3,
    unit: "ex"
  }, r) : 12 * c, T = 3 * c, B = e.arraystretch * w, C = 0.7 * B, b = 0.3 * B, k = 0;
  function I(Ft) {
    for (var Dt = 0; Dt < Ft.length; ++Dt)
      Dt > 0 && (k += 0.25), m.push({
        pos: k,
        isDashed: Ft[Dt]
      });
  }
  for (I(l[0]), n = 0; n < e.body.length; ++n) {
    var F = e.body[n], z = C, N = b;
    s < F.length && (s = F.length);
    var H = new Array(F.length);
    for (a = 0; a < F.length; ++a) {
      var q = ie(F[a], r);
      N < q.depth && (N = q.depth), z < q.height && (z = q.height), H[a] = q;
    }
    var E = e.rowGaps[n], P = 0;
    E && (P = be(E, r), P > 0 && (P += b, N < P && (N = P), P = 0)), e.addJot && (N += T), H.height = z, H.depth = N, k += z, H.pos = k, k += N + P, o[n] = H, I(l[n + 1]);
  }
  var $ = k / 2 + r.fontMetrics().axisHeight, ee = e.cols || [], K = [], _, se, ue = [];
  if (e.tags && e.tags.some((Ft) => Ft))
    for (n = 0; n < i; ++n) {
      var ne = o[n], de = ne.pos - $, S = e.tags[n], ce = void 0;
      S === !0 ? ce = D.makeSpan(["eqn-num"], [], r) : S === !1 ? ce = D.makeSpan([], [], r) : ce = D.makeSpan([], ze(S, r, !0), r), ce.depth = ne.depth, ce.height = ne.height, ue.push({
        type: "elem",
        elem: ce,
        shift: de
      });
    }
  for (
    a = 0, se = 0;
    // Continue while either there are more columns or more column
    // descriptions, so trailing separators don't get lost.
    a < s || se < ee.length;
    ++a, ++se
  ) {
    for (var ae = ee[se] || {}, A = !0; ae.type === "separator"; ) {
      if (A || (_ = D.makeSpan(["arraycolsep"], []), _.style.width = V(r.fontMetrics().doubleRuleSep), K.push(_)), ae.separator === "|" || ae.separator === ":") {
        var pe = ae.separator === "|" ? "solid" : "dashed", ke = D.makeSpan(["vertical-separator"], [], r);
        ke.style.height = V(k), ke.style.borderRightWidth = V(d), ke.style.borderRightStyle = pe, ke.style.margin = "0 " + V(-d / 2);
        var fe = k - $;
        fe && (ke.style.verticalAlign = V(-fe)), K.push(ke);
      } else
        throw new R("Invalid separator type: " + ae.separator);
      se++, ae = ee[se] || {}, A = !1;
    }
    if (!(a >= s)) {
      var Ae = void 0;
      (a > 0 || e.hskipBeforeAndAfter) && (Ae = le.deflt(ae.pregap, v), Ae !== 0 && (_ = D.makeSpan(["arraycolsep"], []), _.style.width = V(Ae), K.push(_)));
      var Se = [];
      for (n = 0; n < i; ++n) {
        var Ne = o[n], Fe = Ne[a];
        if (Fe) {
          var Xe = Ne.pos - $;
          Fe.depth = Ne.depth, Fe.height = Ne.height, Se.push({
            type: "elem",
            elem: Fe,
            shift: Xe
          });
        }
      }
      Se = D.makeVList({
        positionType: "individualShift",
        children: Se
      }, r), Se = D.makeSpan(["col-align-" + (ae.align || "c")], [Se]), K.push(Se), (a < s - 1 || e.hskipBeforeAndAfter) && (Ae = le.deflt(ae.postgap, v), Ae !== 0 && (_ = D.makeSpan(["arraycolsep"], []), _.style.width = V(Ae), K.push(_)));
    }
  }
  if (o = D.makeSpan(["mtable"], K), m.length > 0) {
    for (var Rt = D.makeLineSpan("hline", r, d), dt = D.makeLineSpan("hdashline", r, d), Pt = [{
      type: "elem",
      elem: o,
      shift: 0
    }]; m.length > 0; ) {
      var _t = m.pop(), Kt = _t.pos - $;
      _t.isDashed ? Pt.push({
        type: "elem",
        elem: dt,
        shift: Kt
      }) : Pt.push({
        type: "elem",
        elem: Rt,
        shift: Kt
      });
    }
    o = D.makeVList({
      positionType: "individualShift",
      children: Pt
    }, r);
  }
  if (ue.length === 0)
    return D.makeSpan(["mord"], [o], r);
  var Ht = D.makeVList({
    positionType: "individualShift",
    children: ue
  }, r);
  return Ht = D.makeSpan(["tag"], [Ht], r), D.makeFragment([o, Ht]);
}, $u = {
  c: "center ",
  l: "left ",
  r: "right "
}, nt = function(e, r) {
  for (var n = [], a = new O.MathNode("mtd", [], ["mtr-glue"]), i = new O.MathNode("mtd", [], ["mml-eqn-num"]), l = 0; l < e.body.length; l++) {
    for (var s = e.body[l], o = [], m = 0; m < s.length; m++)
      o.push(new O.MathNode("mtd", [he(s[m], r)]));
    e.tags && e.tags[l] && (o.unshift(a), o.push(a), e.leqno ? o.unshift(i) : o.push(i)), n.push(new O.MathNode("mtr", o));
  }
  var d = new O.MathNode("mtable", n), c = e.arraystretch === 0.5 ? 0.1 : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
  d.setAttribute("rowspacing", V(c));
  var v = "", p = "";
  if (e.cols && e.cols.length > 0) {
    var w = e.cols, T = "", B = !1, C = 0, b = w.length;
    w[0].type === "separator" && (v += "top ", C = 1), w[w.length - 1].type === "separator" && (v += "bottom ", b -= 1);
    for (var k = C; k < b; k++)
      w[k].type === "align" ? (p += $u[w[k].align], B && (T += "none "), B = !0) : w[k].type === "separator" && B && (T += w[k].separator === "|" ? "solid " : "dashed ", B = !1);
    d.setAttribute("columnalign", p.trim()), /[sd]/.test(T) && d.setAttribute("columnlines", T.trim());
  }
  if (e.colSeparationType === "align") {
    for (var I = e.cols || [], F = "", z = 1; z < I.length; z++)
      F += z % 2 ? "0em " : "1em ";
    d.setAttribute("columnspacing", F.trim());
  } else e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? d.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? d.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? d.setAttribute("columnspacing", "0.5em") : d.setAttribute("columnspacing", "1em");
  var N = "", H = e.hLinesBeforeRow;
  v += H[0].length > 0 ? "left " : "", v += H[H.length - 1].length > 0 ? "right " : "";
  for (var q = 1; q < H.length - 1; q++)
    N += H[q].length === 0 ? "none " : H[q][0] ? "dashed " : "solid ";
  return /[sd]/.test(N) && d.setAttribute("rowlines", N.trim()), v !== "" && (d = new O.MathNode("menclose", [d]), d.setAttribute("notation", v.trim())), e.arraystretch && e.arraystretch < 1 && (d = new O.MathNode("mstyle", [d]), d.setAttribute("scriptlevel", "1")), d;
}, Da = function(e, r) {
  e.envName.indexOf("ed") === -1 && A0(e);
  var n = [], a = e.envName.indexOf("at") > -1 ? "alignat" : "align", i = e.envName === "split", l = kt(e.parser, {
    cols: n,
    addJot: !0,
    autoTag: i ? void 0 : xr(e.envName),
    emptySingleRow: !0,
    colSeparationType: a,
    maxNumCols: i ? 2 : void 0,
    leqno: e.parser.settings.leqno
  }, "display"), s, o = 0, m = {
    type: "ordgroup",
    mode: e.mode,
    body: []
  };
  if (r[0] && r[0].type === "ordgroup") {
    for (var d = "", c = 0; c < r[0].body.length; c++) {
      var v = J(r[0].body[c], "textord");
      d += v.text;
    }
    s = Number(d), o = s * 2;
  }
  var p = !o;
  l.body.forEach(function(C) {
    for (var b = 1; b < C.length; b += 2) {
      var k = J(C[b], "styling"), I = J(k.body[0], "ordgroup");
      I.body.unshift(m);
    }
    if (p)
      o < C.length && (o = C.length);
    else {
      var F = C.length / 2;
      if (s < F)
        throw new R("Too many math in a row: " + ("expected " + s + ", but got " + F), C[0]);
    }
  });
  for (var w = 0; w < o; ++w) {
    var T = "r", B = 0;
    w % 2 === 1 ? T = "l" : w > 0 && p && (B = 1), n[w] = {
      type: "align",
      align: T,
      pregap: B,
      postgap: 0
    };
  }
  return l.colSeparationType = p ? "align" : "alignat", l;
};
tt({
  type: "array",
  names: ["array", "darray"],
  props: {
    numArgs: 1
  },
  handler(t, e) {
    var r = k0(e[0]), n = r ? [e[0]] : J(e[0], "ordgroup").body, a = n.map(function(l) {
      var s = dr(l), o = s.text;
      if ("lcr".indexOf(o) !== -1)
        return {
          type: "align",
          align: o
        };
      if (o === "|")
        return {
          type: "separator",
          separator: "|"
        };
      if (o === ":")
        return {
          type: "separator",
          separator: ":"
        };
      throw new R("Unknown column alignment: " + o, l);
    }), i = {
      cols: a,
      hskipBeforeAndAfter: !0,
      // \@preamble in lttab.dtx
      maxNumCols: a.length
    };
    return kt(t.parser, i, yr(t.envName));
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
  props: {
    numArgs: 0
  },
  handler(t) {
    var e = {
      matrix: null,
      pmatrix: ["(", ")"],
      bmatrix: ["[", "]"],
      Bmatrix: ["\\{", "\\}"],
      vmatrix: ["|", "|"],
      Vmatrix: ["\\Vert", "\\Vert"]
    }[t.envName.replace("*", "")], r = "c", n = {
      hskipBeforeAndAfter: !1,
      cols: [{
        type: "align",
        align: r
      }]
    };
    if (t.envName.charAt(t.envName.length - 1) === "*") {
      var a = t.parser;
      if (a.consumeSpaces(), a.fetch().text === "[") {
        if (a.consume(), a.consumeSpaces(), r = a.fetch().text, "lcr".indexOf(r) === -1)
          throw new R("Expected l or c or r", a.nextToken);
        a.consume(), a.consumeSpaces(), a.expect("]"), a.consume(), n.cols = [{
          type: "align",
          align: r
        }];
      }
    }
    var i = kt(t.parser, n, yr(t.envName)), l = Math.max(0, ...i.body.map((s) => s.length));
    return i.cols = new Array(l).fill({
      type: "align",
      align: r
    }), e ? {
      type: "leftright",
      mode: t.mode,
      body: [i],
      left: e[0],
      right: e[1],
      rightColor: void 0
      // \right uninfluenced by \color in array
    } : i;
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["smallmatrix"],
  props: {
    numArgs: 0
  },
  handler(t) {
    var e = {
      arraystretch: 0.5
    }, r = kt(t.parser, e, "script");
    return r.colSeparationType = "small", r;
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["subarray"],
  props: {
    numArgs: 1
  },
  handler(t, e) {
    var r = k0(e[0]), n = r ? [e[0]] : J(e[0], "ordgroup").body, a = n.map(function(l) {
      var s = dr(l), o = s.text;
      if ("lc".indexOf(o) !== -1)
        return {
          type: "align",
          align: o
        };
      throw new R("Unknown column alignment: " + o, l);
    });
    if (a.length > 1)
      throw new R("{subarray} can contain only one column");
    var i = {
      cols: a,
      hskipBeforeAndAfter: !1,
      arraystretch: 0.5
    };
    if (i = kt(t.parser, i, "script"), i.body.length > 0 && i.body[0].length > 1)
      throw new R("{subarray} can contain only one column");
    return i;
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["cases", "dcases", "rcases", "drcases"],
  props: {
    numArgs: 0
  },
  handler(t) {
    var e = {
      arraystretch: 1.2,
      cols: [{
        type: "align",
        align: "l",
        pregap: 0,
        // TODO(kevinb) get the current style.
        // For now we use the metrics for TEXT style which is what we were
        // doing before.  Before attempting to get the current style we
        // should look at TeX's behavior especially for \over and matrices.
        postgap: 1
        /* 1em quad */
      }, {
        type: "align",
        align: "l",
        pregap: 0,
        postgap: 0
      }]
    }, r = kt(t.parser, e, yr(t.envName));
    return {
      type: "leftright",
      mode: t.mode,
      body: [r],
      left: t.envName.indexOf("r") > -1 ? "." : "\\{",
      right: t.envName.indexOf("r") > -1 ? "\\}" : ".",
      rightColor: void 0
    };
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["align", "align*", "aligned", "split"],
  props: {
    numArgs: 0
  },
  handler: Da,
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["gathered", "gather", "gather*"],
  props: {
    numArgs: 0
  },
  handler(t) {
    ["gather", "gather*"].includes(t.envName) && A0(t);
    var e = {
      cols: [{
        type: "align",
        align: "c"
      }],
      addJot: !0,
      colSeparationType: "gather",
      autoTag: xr(t.envName),
      emptySingleRow: !0,
      leqno: t.parser.settings.leqno
    };
    return kt(t.parser, e, "display");
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["alignat", "alignat*", "alignedat"],
  props: {
    numArgs: 1
  },
  handler: Da,
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["equation", "equation*"],
  props: {
    numArgs: 0
  },
  handler(t) {
    A0(t);
    var e = {
      autoTag: xr(t.envName),
      emptySingleRow: !0,
      singleRow: !0,
      maxNumCols: 1,
      leqno: t.parser.settings.leqno
    };
    return kt(t.parser, e, "display");
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
tt({
  type: "array",
  names: ["CD"],
  props: {
    numArgs: 0
  },
  handler(t) {
    return A0(t), Cu(t.parser);
  },
  htmlBuilder: rt,
  mathmlBuilder: nt
});
g("\\nonumber", "\\gdef\\@eqnsw{0}");
g("\\notag", "\\nonumber");
U({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\hline", "\\hdashline"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !0
  },
  handler(t, e) {
    throw new R(t.funcName + " valid only within array environment");
  }
});
var mn = Ca;
U({
  type: "environment",
  names: ["\\begin", "\\end"],
  props: {
    numArgs: 1,
    argTypes: ["text"]
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0];
    if (a.type !== "ordgroup")
      throw new R("Invalid environment name", a);
    for (var i = "", l = 0; l < a.body.length; ++l)
      i += J(a.body[l], "textord").text;
    if (n === "\\begin") {
      if (!mn.hasOwnProperty(i))
        throw new R("No such environment: " + i, a);
      var s = mn[i], {
        args: o,
        optArgs: m
      } = r.parseArguments("\\begin{" + i + "}", s), d = {
        mode: r.mode,
        envName: i,
        parser: r
      }, c = s.handler(d, o, m);
      r.expect("\\end", !1);
      var v = r.nextToken, p = J(r.parseFunction(), "environment");
      if (p.name !== i)
        throw new R("Mismatch: \\begin{" + i + "} matched by \\end{" + p.name + "}", v);
      return c;
    }
    return {
      type: "environment",
      mode: r.mode,
      name: i,
      nameGroup: a
    };
  }
});
var Ea = (t, e) => {
  var r = t.font, n = e.withFont(r);
  return ie(t.body, n);
}, Ia = (t, e) => {
  var r = t.font, n = e.withFont(r);
  return he(t.body, n);
}, cn = {
  "\\Bbb": "\\mathbb",
  "\\bold": "\\mathbf",
  "\\frak": "\\mathfrak",
  "\\bm": "\\boldsymbol"
};
U({
  type: "font",
  names: [
    // styles, except \boldsymbol defined below
    "\\mathrm",
    "\\mathit",
    "\\mathbf",
    "\\mathnormal",
    "\\mathsfit",
    // families
    "\\mathbb",
    "\\mathcal",
    "\\mathfrak",
    "\\mathscr",
    "\\mathsf",
    "\\mathtt",
    // aliases, except \bm defined below
    "\\Bbb",
    "\\bold",
    "\\frak"
  ],
  props: {
    numArgs: 1,
    allowedInArgument: !0
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = v0(e[0]), i = n;
    return i in cn && (i = cn[i]), {
      type: "font",
      mode: r.mode,
      font: i.slice(1),
      body: a
    };
  },
  htmlBuilder: Ea,
  mathmlBuilder: Ia
});
U({
  type: "mclass",
  names: ["\\boldsymbol", "\\bm"],
  props: {
    numArgs: 1
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t, n = e[0], a = le.isCharacterBox(n);
    return {
      type: "mclass",
      mode: r.mode,
      mclass: S0(n),
      body: [{
        type: "font",
        mode: r.mode,
        font: "boldsymbol",
        body: n
      }],
      isCharacterBox: a
    };
  }
});
U({
  type: "font",
  names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n,
      breakOnTokenText: a
    } = t, {
      mode: i
    } = r, l = r.parseExpression(!0, a), s = "math" + n.slice(1);
    return {
      type: "font",
      mode: i,
      font: s,
      body: {
        type: "ordgroup",
        mode: r.mode,
        body: l
      }
    };
  },
  htmlBuilder: Ea,
  mathmlBuilder: Ia
});
var Ba = (t, e) => {
  var r = e;
  return t === "display" ? r = r.id >= Z.SCRIPT.id ? r.text() : Z.DISPLAY : t === "text" && r.size === Z.DISPLAY.size ? r = Z.TEXT : t === "script" ? r = Z.SCRIPT : t === "scriptscript" && (r = Z.SCRIPTSCRIPT), r;
}, wr = (t, e) => {
  var r = Ba(t.size, e.style), n = r.fracNum(), a = r.fracDen(), i;
  i = e.havingStyle(n);
  var l = ie(t.numer, i, e);
  if (t.continued) {
    var s = 8.5 / e.fontMetrics().ptPerEm, o = 3.5 / e.fontMetrics().ptPerEm;
    l.height = l.height < s ? s : l.height, l.depth = l.depth < o ? o : l.depth;
  }
  i = e.havingStyle(a);
  var m = ie(t.denom, i, e), d, c, v;
  t.hasBarLine ? (t.barSize ? (c = be(t.barSize, e), d = D.makeLineSpan("frac-line", e, c)) : d = D.makeLineSpan("frac-line", e), c = d.height, v = d.height) : (d = null, c = 0, v = e.fontMetrics().defaultRuleThickness);
  var p, w, T;
  r.size === Z.DISPLAY.size || t.size === "display" ? (p = e.fontMetrics().num1, c > 0 ? w = 3 * v : w = 7 * v, T = e.fontMetrics().denom1) : (c > 0 ? (p = e.fontMetrics().num2, w = v) : (p = e.fontMetrics().num3, w = 3 * v), T = e.fontMetrics().denom2);
  var B;
  if (d) {
    var b = e.fontMetrics().axisHeight;
    p - l.depth - (b + 0.5 * c) < w && (p += w - (p - l.depth - (b + 0.5 * c))), b - 0.5 * c - (m.height - T) < w && (T += w - (b - 0.5 * c - (m.height - T)));
    var k = -(b - 0.5 * c);
    B = D.makeVList({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: m,
        shift: T
      }, {
        type: "elem",
        elem: d,
        shift: k
      }, {
        type: "elem",
        elem: l,
        shift: -p
      }]
    }, e);
  } else {
    var C = p - l.depth - (m.height - T);
    C < w && (p += 0.5 * (w - C), T += 0.5 * (w - C)), B = D.makeVList({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: m,
        shift: T
      }, {
        type: "elem",
        elem: l,
        shift: -p
      }]
    }, e);
  }
  i = e.havingStyle(r), B.height *= i.sizeMultiplier / e.sizeMultiplier, B.depth *= i.sizeMultiplier / e.sizeMultiplier;
  var I;
  r.size === Z.DISPLAY.size ? I = e.fontMetrics().delim1 : r.size === Z.SCRIPTSCRIPT.size ? I = e.havingStyle(Z.SCRIPT).fontMetrics().delim2 : I = e.fontMetrics().delim2;
  var F, z;
  return t.leftDelim == null ? F = Yt(e, ["mopen"]) : F = ot.customSizedDelim(t.leftDelim, I, !0, e.havingStyle(r), t.mode, ["mopen"]), t.continued ? z = D.makeSpan([]) : t.rightDelim == null ? z = Yt(e, ["mclose"]) : z = ot.customSizedDelim(t.rightDelim, I, !0, e.havingStyle(r), t.mode, ["mclose"]), D.makeSpan(["mord"].concat(i.sizingClasses(e)), [F, D.makeSpan(["mfrac"], [B]), z], e);
}, kr = (t, e) => {
  var r = new O.MathNode("mfrac", [he(t.numer, e), he(t.denom, e)]);
  if (!t.hasBarLine)
    r.setAttribute("linethickness", "0px");
  else if (t.barSize) {
    var n = be(t.barSize, e);
    r.setAttribute("linethickness", V(n));
  }
  var a = Ba(t.size, e.style);
  if (a.size !== e.style.size) {
    r = new O.MathNode("mstyle", [r]);
    var i = a.size === Z.DISPLAY.size ? "true" : "false";
    r.setAttribute("displaystyle", i), r.setAttribute("scriptlevel", "0");
  }
  if (t.leftDelim != null || t.rightDelim != null) {
    var l = [];
    if (t.leftDelim != null) {
      var s = new O.MathNode("mo", [new O.TextNode(t.leftDelim.replace("\\", ""))]);
      s.setAttribute("fence", "true"), l.push(s);
    }
    if (l.push(r), t.rightDelim != null) {
      var o = new O.MathNode("mo", [new O.TextNode(t.rightDelim.replace("\\", ""))]);
      o.setAttribute("fence", "true"), l.push(o);
    }
    return cr(l);
  }
  return r;
};
U({
  type: "genfrac",
  names: [
    "\\dfrac",
    "\\frac",
    "\\tfrac",
    "\\dbinom",
    "\\binom",
    "\\tbinom",
    "\\\\atopfrac",
    // can’t be entered directly
    "\\\\bracefrac",
    "\\\\brackfrac"
    // ditto
  ],
  props: {
    numArgs: 2,
    allowedInArgument: !0
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0], i = e[1], l, s = null, o = null, m = "auto";
    switch (n) {
      case "\\dfrac":
      case "\\frac":
      case "\\tfrac":
        l = !0;
        break;
      case "\\\\atopfrac":
        l = !1;
        break;
      case "\\dbinom":
      case "\\binom":
      case "\\tbinom":
        l = !1, s = "(", o = ")";
        break;
      case "\\\\bracefrac":
        l = !1, s = "\\{", o = "\\}";
        break;
      case "\\\\brackfrac":
        l = !1, s = "[", o = "]";
        break;
      default:
        throw new Error("Unrecognized genfrac command");
    }
    switch (n) {
      case "\\dfrac":
      case "\\dbinom":
        m = "display";
        break;
      case "\\tfrac":
      case "\\tbinom":
        m = "text";
        break;
    }
    return {
      type: "genfrac",
      mode: r.mode,
      continued: !1,
      numer: a,
      denom: i,
      hasBarLine: l,
      leftDelim: s,
      rightDelim: o,
      size: m,
      barSize: null
    };
  },
  htmlBuilder: wr,
  mathmlBuilder: kr
});
U({
  type: "genfrac",
  names: ["\\cfrac"],
  props: {
    numArgs: 2
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0], i = e[1];
    return {
      type: "genfrac",
      mode: r.mode,
      continued: !0,
      numer: a,
      denom: i,
      hasBarLine: !0,
      leftDelim: null,
      rightDelim: null,
      size: "display",
      barSize: null
    };
  }
});
U({
  type: "infix",
  names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
  props: {
    numArgs: 0,
    infix: !0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r,
      token: n
    } = t, a;
    switch (r) {
      case "\\over":
        a = "\\frac";
        break;
      case "\\choose":
        a = "\\binom";
        break;
      case "\\atop":
        a = "\\\\atopfrac";
        break;
      case "\\brace":
        a = "\\\\bracefrac";
        break;
      case "\\brack":
        a = "\\\\brackfrac";
        break;
      default:
        throw new Error("Unrecognized infix genfrac command");
    }
    return {
      type: "infix",
      mode: e.mode,
      replaceWith: a,
      token: n
    };
  }
});
var fn = ["display", "text", "script", "scriptscript"], dn = function(e) {
  var r = null;
  return e.length > 0 && (r = e, r = r === "." ? null : r), r;
};
U({
  type: "genfrac",
  names: ["\\genfrac"],
  props: {
    numArgs: 6,
    allowedInArgument: !0,
    argTypes: ["math", "math", "size", "text", "math", "math"]
  },
  handler(t, e) {
    var {
      parser: r
    } = t, n = e[4], a = e[5], i = v0(e[0]), l = i.type === "atom" && i.family === "open" ? dn(i.text) : null, s = v0(e[1]), o = s.type === "atom" && s.family === "close" ? dn(s.text) : null, m = J(e[2], "size"), d, c = null;
    m.isBlank ? d = !0 : (c = m.value, d = c.number > 0);
    var v = "auto", p = e[3];
    if (p.type === "ordgroup") {
      if (p.body.length > 0) {
        var w = J(p.body[0], "textord");
        v = fn[Number(w.text)];
      }
    } else
      p = J(p, "textord"), v = fn[Number(p.text)];
    return {
      type: "genfrac",
      mode: r.mode,
      numer: n,
      denom: a,
      continued: !1,
      hasBarLine: d,
      barSize: c,
      leftDelim: l,
      rightDelim: o,
      size: v
    };
  },
  htmlBuilder: wr,
  mathmlBuilder: kr
});
U({
  type: "infix",
  names: ["\\above"],
  props: {
    numArgs: 1,
    argTypes: ["size"],
    infix: !0
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n,
      token: a
    } = t;
    return {
      type: "infix",
      mode: r.mode,
      replaceWith: "\\\\abovefrac",
      size: J(e[0], "size").value,
      token: a
    };
  }
});
U({
  type: "genfrac",
  names: ["\\\\abovefrac"],
  props: {
    numArgs: 3,
    argTypes: ["math", "size", "math"]
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0], i = vs(J(e[1], "infix").size), l = e[2], s = i.number > 0;
    return {
      type: "genfrac",
      mode: r.mode,
      numer: a,
      denom: l,
      continued: !1,
      hasBarLine: s,
      barSize: i,
      leftDelim: null,
      rightDelim: null,
      size: "auto"
    };
  },
  htmlBuilder: wr,
  mathmlBuilder: kr
});
var Na = (t, e) => {
  var r = e.style, n, a;
  t.type === "supsub" ? (n = t.sup ? ie(t.sup, e.havingStyle(r.sup()), e) : ie(t.sub, e.havingStyle(r.sub()), e), a = J(t.base, "horizBrace")) : a = J(t, "horizBrace");
  var i = ie(a.base, e.havingBaseStyle(Z.DISPLAY)), l = mt.svgSpan(a, e), s;
  if (a.isOver ? (s = D.makeVList({
    positionType: "firstBaseline",
    children: [{
      type: "elem",
      elem: i
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: l
    }]
  }, e), s.children[0].children[0].children[1].classes.push("svg-align")) : (s = D.makeVList({
    positionType: "bottom",
    positionData: i.depth + 0.1 + l.height,
    children: [{
      type: "elem",
      elem: l
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: i
    }]
  }, e), s.children[0].children[0].children[0].classes.push("svg-align")), n) {
    var o = D.makeSpan(["mord", a.isOver ? "mover" : "munder"], [s], e);
    a.isOver ? s = D.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: o
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: n
      }]
    }, e) : s = D.makeVList({
      positionType: "bottom",
      positionData: o.depth + 0.2 + n.height + n.depth,
      children: [{
        type: "elem",
        elem: n
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: o
      }]
    }, e);
  }
  return D.makeSpan(["mord", a.isOver ? "mover" : "munder"], [s], e);
}, Gu = (t, e) => {
  var r = mt.mathMLnode(t.label);
  return new O.MathNode(t.isOver ? "mover" : "munder", [he(t.base, e), r]);
};
U({
  type: "horizBrace",
  names: ["\\overbrace", "\\underbrace"],
  props: {
    numArgs: 1
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t;
    return {
      type: "horizBrace",
      mode: r.mode,
      label: n,
      isOver: /^\\over/.test(n),
      base: e[0]
    };
  },
  htmlBuilder: Na,
  mathmlBuilder: Gu
});
U({
  type: "href",
  names: ["\\href"],
  props: {
    numArgs: 2,
    argTypes: ["url", "original"],
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t, n = e[1], a = J(e[0], "url").url;
    return r.settings.isTrusted({
      command: "\\href",
      url: a
    }) ? {
      type: "href",
      mode: r.mode,
      href: a,
      body: ye(n)
    } : r.formatUnsupportedCmd("\\href");
  },
  htmlBuilder: (t, e) => {
    var r = ze(t.body, e, !1);
    return D.makeAnchor(t.href, [], r, e);
  },
  mathmlBuilder: (t, e) => {
    var r = yt(t.body, e);
    return r instanceof Pe || (r = new Pe("mrow", [r])), r.setAttribute("href", t.href), r;
  }
});
U({
  type: "href",
  names: ["\\url"],
  props: {
    numArgs: 1,
    argTypes: ["url"],
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t, n = J(e[0], "url").url;
    if (!r.settings.isTrusted({
      command: "\\url",
      url: n
    }))
      return r.formatUnsupportedCmd("\\url");
    for (var a = [], i = 0; i < n.length; i++) {
      var l = n[i];
      l === "~" && (l = "\\textasciitilde"), a.push({
        type: "textord",
        mode: "text",
        text: l
      });
    }
    var s = {
      type: "text",
      mode: r.mode,
      font: "\\texttt",
      body: a
    };
    return {
      type: "href",
      mode: r.mode,
      href: n,
      body: ye(s)
    };
  }
});
U({
  type: "hbox",
  names: ["\\hbox"],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInText: !0,
    primitive: !0
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "hbox",
      mode: r.mode,
      body: ye(e[0])
    };
  },
  htmlBuilder(t, e) {
    var r = ze(t.body, e, !1);
    return D.makeFragment(r);
  },
  mathmlBuilder(t, e) {
    return new O.MathNode("mrow", Re(t.body, e));
  }
});
U({
  type: "html",
  names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
  props: {
    numArgs: 2,
    argTypes: ["raw", "original"],
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n,
      token: a
    } = t, i = J(e[0], "raw").string, l = e[1];
    r.settings.strict && r.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
    var s, o = {};
    switch (n) {
      case "\\htmlClass":
        o.class = i, s = {
          command: "\\htmlClass",
          class: i
        };
        break;
      case "\\htmlId":
        o.id = i, s = {
          command: "\\htmlId",
          id: i
        };
        break;
      case "\\htmlStyle":
        o.style = i, s = {
          command: "\\htmlStyle",
          style: i
        };
        break;
      case "\\htmlData": {
        for (var m = i.split(","), d = 0; d < m.length; d++) {
          var c = m[d].split("=");
          if (c.length !== 2)
            throw new R("Error parsing key-value for \\htmlData");
          o["data-" + c[0].trim()] = c[1].trim();
        }
        s = {
          command: "\\htmlData",
          attributes: o
        };
        break;
      }
      default:
        throw new Error("Unrecognized html command");
    }
    return r.settings.isTrusted(s) ? {
      type: "html",
      mode: r.mode,
      attributes: o,
      body: ye(l)
    } : r.formatUnsupportedCmd(n);
  },
  htmlBuilder: (t, e) => {
    var r = ze(t.body, e, !1), n = ["enclosing"];
    t.attributes.class && n.push(...t.attributes.class.trim().split(/\s+/));
    var a = D.makeSpan(n, r, e);
    for (var i in t.attributes)
      i !== "class" && t.attributes.hasOwnProperty(i) && a.setAttribute(i, t.attributes[i]);
    return a;
  },
  mathmlBuilder: (t, e) => yt(t.body, e)
});
U({
  type: "htmlmathml",
  names: ["\\html@mathml"],
  props: {
    numArgs: 2,
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t;
    return {
      type: "htmlmathml",
      mode: r.mode,
      html: ye(e[0]),
      mathml: ye(e[1])
    };
  },
  htmlBuilder: (t, e) => {
    var r = ze(t.html, e, !1);
    return D.makeFragment(r);
  },
  mathmlBuilder: (t, e) => yt(t.mathml, e)
});
var $0 = function(e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))
    return {
      number: +e,
      unit: "bp"
    };
  var r = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!r)
    throw new R("Invalid size: '" + e + "' in \\includegraphics");
  var n = {
    number: +(r[1] + r[2]),
    // sign + magnitude, cast to number
    unit: r[3]
  };
  if (!ea(n))
    throw new R("Invalid unit: '" + n.unit + "' in \\includegraphics.");
  return n;
};
U({
  type: "includegraphics",
  names: ["\\includegraphics"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    argTypes: ["raw", "url"],
    allowedInText: !1
  },
  handler: (t, e, r) => {
    var {
      parser: n
    } = t, a = {
      number: 0,
      unit: "em"
    }, i = {
      number: 0.9,
      unit: "em"
    }, l = {
      number: 0,
      unit: "em"
    }, s = "";
    if (r[0])
      for (var o = J(r[0], "raw").string, m = o.split(","), d = 0; d < m.length; d++) {
        var c = m[d].split("=");
        if (c.length === 2) {
          var v = c[1].trim();
          switch (c[0].trim()) {
            case "alt":
              s = v;
              break;
            case "width":
              a = $0(v);
              break;
            case "height":
              i = $0(v);
              break;
            case "totalheight":
              l = $0(v);
              break;
            default:
              throw new R("Invalid key: '" + c[0] + "' in \\includegraphics.");
          }
        }
      }
    var p = J(e[0], "url").url;
    return s === "" && (s = p, s = s.replace(/^.*[\\/]/, ""), s = s.substring(0, s.lastIndexOf("."))), n.settings.isTrusted({
      command: "\\includegraphics",
      url: p
    }) ? {
      type: "includegraphics",
      mode: n.mode,
      alt: s,
      width: a,
      height: i,
      totalheight: l,
      src: p
    } : n.formatUnsupportedCmd("\\includegraphics");
  },
  htmlBuilder: (t, e) => {
    var r = be(t.height, e), n = 0;
    t.totalheight.number > 0 && (n = be(t.totalheight, e) - r);
    var a = 0;
    t.width.number > 0 && (a = be(t.width, e));
    var i = {
      height: V(r + n)
    };
    a > 0 && (i.width = V(a)), n > 0 && (i.verticalAlign = V(-n));
    var l = new $s(t.src, t.alt, i);
    return l.height = r, l.depth = n, l;
  },
  mathmlBuilder: (t, e) => {
    var r = new O.MathNode("mglyph", []);
    r.setAttribute("alt", t.alt);
    var n = be(t.height, e), a = 0;
    if (t.totalheight.number > 0 && (a = be(t.totalheight, e) - n, r.setAttribute("valign", V(-a))), r.setAttribute("height", V(n + a)), t.width.number > 0) {
      var i = be(t.width, e);
      r.setAttribute("width", V(i));
    }
    return r.setAttribute("src", t.src), r;
  }
});
U({
  type: "kern",
  names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
  props: {
    numArgs: 1,
    argTypes: ["size"],
    primitive: !0,
    allowedInText: !0
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t, a = J(e[0], "size");
    if (r.settings.strict) {
      var i = n[1] === "m", l = a.value.unit === "mu";
      i ? (l || r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " supports only mu units, " + ("not " + a.value.unit + " units")), r.mode !== "math" && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " works only in math mode")) : l && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " doesn't support mu units");
    }
    return {
      type: "kern",
      mode: r.mode,
      dimension: a.value
    };
  },
  htmlBuilder(t, e) {
    return D.makeGlue(t.dimension, e);
  },
  mathmlBuilder(t, e) {
    var r = be(t.dimension, e);
    return new O.SpaceNode(r);
  }
});
U({
  type: "lap",
  names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0];
    return {
      type: "lap",
      mode: r.mode,
      alignment: n.slice(5),
      body: a
    };
  },
  htmlBuilder: (t, e) => {
    var r;
    t.alignment === "clap" ? (r = D.makeSpan([], [ie(t.body, e)]), r = D.makeSpan(["inner"], [r], e)) : r = D.makeSpan(["inner"], [ie(t.body, e)]);
    var n = D.makeSpan(["fix"], []), a = D.makeSpan([t.alignment], [r, n], e), i = D.makeSpan(["strut"]);
    return i.style.height = V(a.height + a.depth), a.depth && (i.style.verticalAlign = V(-a.depth)), a.children.unshift(i), a = D.makeSpan(["thinbox"], [a], e), D.makeSpan(["mord", "vbox"], [a], e);
  },
  mathmlBuilder: (t, e) => {
    var r = new O.MathNode("mpadded", [he(t.body, e)]);
    if (t.alignment !== "rlap") {
      var n = t.alignment === "llap" ? "-1" : "-0.5";
      r.setAttribute("lspace", n + "width");
    }
    return r.setAttribute("width", "0px"), r;
  }
});
U({
  type: "styling",
  names: ["\\(", "$"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !1
  },
  handler(t, e) {
    var {
      funcName: r,
      parser: n
    } = t, a = n.mode;
    n.switchMode("math");
    var i = r === "\\(" ? "\\)" : "$", l = n.parseExpression(!1, i);
    return n.expect(i), n.switchMode(a), {
      type: "styling",
      mode: n.mode,
      style: "text",
      body: l
    };
  }
});
U({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\)", "\\]"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !1
  },
  handler(t, e) {
    throw new R("Mismatched " + t.funcName);
  }
});
var pn = (t, e) => {
  switch (e.style.size) {
    case Z.DISPLAY.size:
      return t.display;
    case Z.TEXT.size:
      return t.text;
    case Z.SCRIPT.size:
      return t.script;
    case Z.SCRIPTSCRIPT.size:
      return t.scriptscript;
    default:
      return t.text;
  }
};
U({
  type: "mathchoice",
  names: ["\\mathchoice"],
  props: {
    numArgs: 4,
    primitive: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t;
    return {
      type: "mathchoice",
      mode: r.mode,
      display: ye(e[0]),
      text: ye(e[1]),
      script: ye(e[2]),
      scriptscript: ye(e[3])
    };
  },
  htmlBuilder: (t, e) => {
    var r = pn(t, e), n = ze(r, e, !1);
    return D.makeFragment(n);
  },
  mathmlBuilder: (t, e) => {
    var r = pn(t, e);
    return yt(r, e);
  }
});
var qa = (t, e, r, n, a, i, l) => {
  t = D.makeSpan([], [t]);
  var s = r && le.isCharacterBox(r), o, m;
  if (e) {
    var d = ie(e, n.havingStyle(a.sup()), n);
    m = {
      elem: d,
      kern: Math.max(n.fontMetrics().bigOpSpacing1, n.fontMetrics().bigOpSpacing3 - d.depth)
    };
  }
  if (r) {
    var c = ie(r, n.havingStyle(a.sub()), n);
    o = {
      elem: c,
      kern: Math.max(n.fontMetrics().bigOpSpacing2, n.fontMetrics().bigOpSpacing4 - c.height)
    };
  }
  var v;
  if (m && o) {
    var p = n.fontMetrics().bigOpSpacing5 + o.elem.height + o.elem.depth + o.kern + t.depth + l;
    v = D.makeVList({
      positionType: "bottom",
      positionData: p,
      children: [{
        type: "kern",
        size: n.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: o.elem,
        marginLeft: V(-i)
      }, {
        type: "kern",
        size: o.kern
      }, {
        type: "elem",
        elem: t
      }, {
        type: "kern",
        size: m.kern
      }, {
        type: "elem",
        elem: m.elem,
        marginLeft: V(i)
      }, {
        type: "kern",
        size: n.fontMetrics().bigOpSpacing5
      }]
    }, n);
  } else if (o) {
    var w = t.height - l;
    v = D.makeVList({
      positionType: "top",
      positionData: w,
      children: [{
        type: "kern",
        size: n.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: o.elem,
        marginLeft: V(-i)
      }, {
        type: "kern",
        size: o.kern
      }, {
        type: "elem",
        elem: t
      }]
    }, n);
  } else if (m) {
    var T = t.depth + l;
    v = D.makeVList({
      positionType: "bottom",
      positionData: T,
      children: [{
        type: "elem",
        elem: t
      }, {
        type: "kern",
        size: m.kern
      }, {
        type: "elem",
        elem: m.elem,
        marginLeft: V(i)
      }, {
        type: "kern",
        size: n.fontMetrics().bigOpSpacing5
      }]
    }, n);
  } else
    return t;
  var B = [v];
  if (o && i !== 0 && !s) {
    var C = D.makeSpan(["mspace"], [], n);
    C.style.marginRight = V(i), B.unshift(C);
  }
  return D.makeSpan(["mop", "op-limits"], B, n);
}, La = ["\\smallint"], Ot = (t, e) => {
  var r, n, a = !1, i;
  t.type === "supsub" ? (r = t.sup, n = t.sub, i = J(t.base, "op"), a = !0) : i = J(t, "op");
  var l = e.style, s = !1;
  l.size === Z.DISPLAY.size && i.symbol && !La.includes(i.name) && (s = !0);
  var o;
  if (i.symbol) {
    var m = s ? "Size2-Regular" : "Size1-Regular", d = "";
    if ((i.name === "\\oiint" || i.name === "\\oiiint") && (d = i.name.slice(1), i.name = d === "oiint" ? "\\iint" : "\\iiint"), o = D.makeSymbol(i.name, m, "math", e, ["mop", "op-symbol", s ? "large-op" : "small-op"]), d.length > 0) {
      var c = o.italic, v = D.staticSvg(d + "Size" + (s ? "2" : "1"), e);
      o = D.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: o,
          shift: 0
        }, {
          type: "elem",
          elem: v,
          shift: s ? 0.08 : 0
        }]
      }, e), i.name = "\\" + d, o.classes.unshift("mop"), o.italic = c;
    }
  } else if (i.body) {
    var p = ze(i.body, e, !0);
    p.length === 1 && p[0] instanceof Ye ? (o = p[0], o.classes[0] = "mop") : o = D.makeSpan(["mop"], p, e);
  } else {
    for (var w = [], T = 1; T < i.name.length; T++)
      w.push(D.mathsym(i.name[T], i.mode, e));
    o = D.makeSpan(["mop"], w, e);
  }
  var B = 0, C = 0;
  return (o instanceof Ye || i.name === "\\oiint" || i.name === "\\oiiint") && !i.suppressBaseShift && (B = (o.height - o.depth) / 2 - e.fontMetrics().axisHeight, C = o.italic), a ? qa(o, r, n, e, l, C, B) : (B && (o.style.position = "relative", o.style.top = V(B)), o);
}, Qt = (t, e) => {
  var r;
  if (t.symbol)
    r = new Pe("mo", [Ue(t.name, t.mode)]), La.includes(t.name) && r.setAttribute("largeop", "false");
  else if (t.body)
    r = new Pe("mo", Re(t.body, e));
  else {
    r = new Pe("mi", [new Ke(t.name.slice(1))]);
    var n = new Pe("mo", [Ue("⁡", "text")]);
    t.parentIsSupSub ? r = new Pe("mrow", [r, n]) : r = ca([r, n]);
  }
  return r;
}, Uu = {
  "∏": "\\prod",
  "∐": "\\coprod",
  "∑": "\\sum",
  "⋀": "\\bigwedge",
  "⋁": "\\bigvee",
  "⋂": "\\bigcap",
  "⋃": "\\bigcup",
  "⨀": "\\bigodot",
  "⨁": "\\bigoplus",
  "⨂": "\\bigotimes",
  "⨄": "\\biguplus",
  "⨆": "\\bigsqcup"
};
U({
  type: "op",
  names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "∏", "∐", "∑", "⋀", "⋁", "⋂", "⋃", "⨀", "⨁", "⨂", "⨄", "⨆"],
  props: {
    numArgs: 0
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = n;
    return a.length === 1 && (a = Uu[a]), {
      type: "op",
      mode: r.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !0,
      name: a
    };
  },
  htmlBuilder: Ot,
  mathmlBuilder: Qt
});
U({
  type: "op",
  names: ["\\mathop"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t, n = e[0];
    return {
      type: "op",
      mode: r.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      body: ye(n)
    };
  },
  htmlBuilder: Ot,
  mathmlBuilder: Qt
});
var Wu = {
  "∫": "\\int",
  "∬": "\\iint",
  "∭": "\\iiint",
  "∮": "\\oint",
  "∯": "\\oiint",
  "∰": "\\oiiint"
};
U({
  type: "op",
  names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
  props: {
    numArgs: 0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r
    } = t;
    return {
      type: "op",
      mode: e.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      name: r
    };
  },
  htmlBuilder: Ot,
  mathmlBuilder: Qt
});
U({
  type: "op",
  names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
  props: {
    numArgs: 0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r
    } = t;
    return {
      type: "op",
      mode: e.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !1,
      name: r
    };
  },
  htmlBuilder: Ot,
  mathmlBuilder: Qt
});
U({
  type: "op",
  names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "∫", "∬", "∭", "∮", "∯", "∰"],
  props: {
    numArgs: 0
  },
  handler(t) {
    var {
      parser: e,
      funcName: r
    } = t, n = r;
    return n.length === 1 && (n = Wu[n]), {
      type: "op",
      mode: e.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !0,
      name: n
    };
  },
  htmlBuilder: Ot,
  mathmlBuilder: Qt
});
var Oa = (t, e) => {
  var r, n, a = !1, i;
  t.type === "supsub" ? (r = t.sup, n = t.sub, i = J(t.base, "operatorname"), a = !0) : i = J(t, "operatorname");
  var l;
  if (i.body.length > 0) {
    for (var s = i.body.map((c) => {
      var v = c.text;
      return typeof v == "string" ? {
        type: "textord",
        mode: c.mode,
        text: v
      } : c;
    }), o = ze(s, e.withFont("mathrm"), !0), m = 0; m < o.length; m++) {
      var d = o[m];
      d instanceof Ye && (d.text = d.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
    }
    l = D.makeSpan(["mop"], o, e);
  } else
    l = D.makeSpan(["mop"], [], e);
  return a ? qa(l, r, n, e, e.style, 0, 0) : l;
}, ju = (t, e) => {
  for (var r = Re(t.body, e.withFont("mathrm")), n = !0, a = 0; a < r.length; a++) {
    var i = r[a];
    if (!(i instanceof O.SpaceNode)) if (i instanceof O.MathNode)
      switch (i.type) {
        case "mi":
        case "mn":
        case "ms":
        case "mspace":
        case "mtext":
          break;
        // Do nothing yet.
        case "mo": {
          var l = i.children[0];
          i.children.length === 1 && l instanceof O.TextNode ? l.text = l.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : n = !1;
          break;
        }
        default:
          n = !1;
      }
    else
      n = !1;
  }
  if (n) {
    var s = r.map((d) => d.toText()).join("");
    r = [new O.TextNode(s)];
  }
  var o = new O.MathNode("mi", r);
  o.setAttribute("mathvariant", "normal");
  var m = new O.MathNode("mo", [Ue("⁡", "text")]);
  return t.parentIsSupSub ? new O.MathNode("mrow", [o, m]) : O.newDocumentFragment([o, m]);
};
U({
  type: "operatorname",
  names: ["\\operatorname@", "\\operatornamewithlimits"],
  props: {
    numArgs: 1
  },
  handler: (t, e) => {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0];
    return {
      type: "operatorname",
      mode: r.mode,
      body: ye(a),
      alwaysHandleSupSub: n === "\\operatornamewithlimits",
      limits: !1,
      parentIsSupSub: !1
    };
  },
  htmlBuilder: Oa,
  mathmlBuilder: ju
});
g("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
Ct({
  type: "ordgroup",
  htmlBuilder(t, e) {
    return t.semisimple ? D.makeFragment(ze(t.body, e, !1)) : D.makeSpan(["mord"], ze(t.body, e, !0), e);
  },
  mathmlBuilder(t, e) {
    return yt(t.body, e, !0);
  }
});
U({
  type: "overline",
  names: ["\\overline"],
  props: {
    numArgs: 1
  },
  handler(t, e) {
    var {
      parser: r
    } = t, n = e[0];
    return {
      type: "overline",
      mode: r.mode,
      body: n
    };
  },
  htmlBuilder(t, e) {
    var r = ie(t.body, e.havingCrampedStyle()), n = D.makeLineSpan("overline-line", e), a = e.fontMetrics().defaultRuleThickness, i = D.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: r
      }, {
        type: "kern",
        size: 3 * a
      }, {
        type: "elem",
        elem: n
      }, {
        type: "kern",
        size: a
      }]
    }, e);
    return D.makeSpan(["mord", "overline"], [i], e);
  },
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mo", [new O.TextNode("‾")]);
    r.setAttribute("stretchy", "true");
    var n = new O.MathNode("mover", [he(t.body, e), r]);
    return n.setAttribute("accent", "true"), n;
  }
});
U({
  type: "phantom",
  names: ["\\phantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t, n = e[0];
    return {
      type: "phantom",
      mode: r.mode,
      body: ye(n)
    };
  },
  htmlBuilder: (t, e) => {
    var r = ze(t.body, e.withPhantom(), !1);
    return D.makeFragment(r);
  },
  mathmlBuilder: (t, e) => {
    var r = Re(t.body, e);
    return new O.MathNode("mphantom", r);
  }
});
U({
  type: "hphantom",
  names: ["\\hphantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t, n = e[0];
    return {
      type: "hphantom",
      mode: r.mode,
      body: n
    };
  },
  htmlBuilder: (t, e) => {
    var r = D.makeSpan([], [ie(t.body, e.withPhantom())]);
    if (r.height = 0, r.depth = 0, r.children)
      for (var n = 0; n < r.children.length; n++)
        r.children[n].height = 0, r.children[n].depth = 0;
    return r = D.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: r
      }]
    }, e), D.makeSpan(["mord"], [r], e);
  },
  mathmlBuilder: (t, e) => {
    var r = Re(ye(t.body), e), n = new O.MathNode("mphantom", r), a = new O.MathNode("mpadded", [n]);
    return a.setAttribute("height", "0px"), a.setAttribute("depth", "0px"), a;
  }
});
U({
  type: "vphantom",
  names: ["\\vphantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      parser: r
    } = t, n = e[0];
    return {
      type: "vphantom",
      mode: r.mode,
      body: n
    };
  },
  htmlBuilder: (t, e) => {
    var r = D.makeSpan(["inner"], [ie(t.body, e.withPhantom())]), n = D.makeSpan(["fix"], []);
    return D.makeSpan(["mord", "rlap"], [r, n], e);
  },
  mathmlBuilder: (t, e) => {
    var r = Re(ye(t.body), e), n = new O.MathNode("mphantom", r), a = new O.MathNode("mpadded", [n]);
    return a.setAttribute("width", "0px"), a;
  }
});
U({
  type: "raisebox",
  names: ["\\raisebox"],
  props: {
    numArgs: 2,
    argTypes: ["size", "hbox"],
    allowedInText: !0
  },
  handler(t, e) {
    var {
      parser: r
    } = t, n = J(e[0], "size").value, a = e[1];
    return {
      type: "raisebox",
      mode: r.mode,
      dy: n,
      body: a
    };
  },
  htmlBuilder(t, e) {
    var r = ie(t.body, e), n = be(t.dy, e);
    return D.makeVList({
      positionType: "shift",
      positionData: -n,
      children: [{
        type: "elem",
        elem: r
      }]
    }, e);
  },
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mpadded", [he(t.body, e)]), n = t.dy.number + t.dy.unit;
    return r.setAttribute("voffset", n), r;
  }
});
U({
  type: "internal",
  names: ["\\relax"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInArgument: !0
  },
  handler(t) {
    var {
      parser: e
    } = t;
    return {
      type: "internal",
      mode: e.mode
    };
  }
});
U({
  type: "rule",
  names: ["\\rule"],
  props: {
    numArgs: 2,
    numOptionalArgs: 1,
    allowedInText: !0,
    allowedInMath: !0,
    argTypes: ["size", "size", "size"]
  },
  handler(t, e, r) {
    var {
      parser: n
    } = t, a = r[0], i = J(e[0], "size"), l = J(e[1], "size");
    return {
      type: "rule",
      mode: n.mode,
      shift: a && J(a, "size").value,
      width: i.value,
      height: l.value
    };
  },
  htmlBuilder(t, e) {
    var r = D.makeSpan(["mord", "rule"], [], e), n = be(t.width, e), a = be(t.height, e), i = t.shift ? be(t.shift, e) : 0;
    return r.style.borderRightWidth = V(n), r.style.borderTopWidth = V(a), r.style.bottom = V(i), r.width = n, r.height = a + i, r.depth = -i, r.maxFontSize = a * 1.125 * e.sizeMultiplier, r;
  },
  mathmlBuilder(t, e) {
    var r = be(t.width, e), n = be(t.height, e), a = t.shift ? be(t.shift, e) : 0, i = e.color && e.getColor() || "black", l = new O.MathNode("mspace");
    l.setAttribute("mathbackground", i), l.setAttribute("width", V(r)), l.setAttribute("height", V(n));
    var s = new O.MathNode("mpadded", [l]);
    return a >= 0 ? s.setAttribute("height", V(a)) : (s.setAttribute("height", V(a)), s.setAttribute("depth", V(-a))), s.setAttribute("voffset", V(a)), s;
  }
});
function Ra(t, e, r) {
  for (var n = ze(t, e, !1), a = e.sizeMultiplier / r.sizeMultiplier, i = 0; i < n.length; i++) {
    var l = n[i].classes.indexOf("sizing");
    l < 0 ? Array.prototype.push.apply(n[i].classes, e.sizingClasses(r)) : n[i].classes[l + 1] === "reset-size" + e.size && (n[i].classes[l + 1] = "reset-size" + r.size), n[i].height *= a, n[i].depth *= a;
  }
  return D.makeFragment(n);
}
var gn = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], Yu = (t, e) => {
  var r = e.havingSize(t.size);
  return Ra(t.body, r, e);
};
U({
  type: "sizing",
  names: gn,
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler: (t, e) => {
    var {
      breakOnTokenText: r,
      funcName: n,
      parser: a
    } = t, i = a.parseExpression(!1, r);
    return {
      type: "sizing",
      mode: a.mode,
      // Figure out what size to use based on the list of functions above
      size: gn.indexOf(n) + 1,
      body: i
    };
  },
  htmlBuilder: Yu,
  mathmlBuilder: (t, e) => {
    var r = e.havingSize(t.size), n = Re(t.body, r), a = new O.MathNode("mstyle", n);
    return a.setAttribute("mathsize", V(r.sizeMultiplier)), a;
  }
});
U({
  type: "smash",
  names: ["\\smash"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    allowedInText: !0
  },
  handler: (t, e, r) => {
    var {
      parser: n
    } = t, a = !1, i = !1, l = r[0] && J(r[0], "ordgroup");
    if (l)
      for (var s = "", o = 0; o < l.body.length; ++o) {
        var m = l.body[o];
        if (s = m.text, s === "t")
          a = !0;
        else if (s === "b")
          i = !0;
        else {
          a = !1, i = !1;
          break;
        }
      }
    else
      a = !0, i = !0;
    var d = e[0];
    return {
      type: "smash",
      mode: n.mode,
      body: d,
      smashHeight: a,
      smashDepth: i
    };
  },
  htmlBuilder: (t, e) => {
    var r = D.makeSpan([], [ie(t.body, e)]);
    if (!t.smashHeight && !t.smashDepth)
      return r;
    if (t.smashHeight && (r.height = 0, r.children))
      for (var n = 0; n < r.children.length; n++)
        r.children[n].height = 0;
    if (t.smashDepth && (r.depth = 0, r.children))
      for (var a = 0; a < r.children.length; a++)
        r.children[a].depth = 0;
    var i = D.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: r
      }]
    }, e);
    return D.makeSpan(["mord"], [i], e);
  },
  mathmlBuilder: (t, e) => {
    var r = new O.MathNode("mpadded", [he(t.body, e)]);
    return t.smashHeight && r.setAttribute("height", "0px"), t.smashDepth && r.setAttribute("depth", "0px"), r;
  }
});
U({
  type: "sqrt",
  names: ["\\sqrt"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler(t, e, r) {
    var {
      parser: n
    } = t, a = r[0], i = e[0];
    return {
      type: "sqrt",
      mode: n.mode,
      body: i,
      index: a
    };
  },
  htmlBuilder(t, e) {
    var r = ie(t.body, e.havingCrampedStyle());
    r.height === 0 && (r.height = e.fontMetrics().xHeight), r = D.wrapFragment(r, e);
    var n = e.fontMetrics(), a = n.defaultRuleThickness, i = a;
    e.style.id < Z.TEXT.id && (i = e.fontMetrics().xHeight);
    var l = a + i / 4, s = r.height + r.depth + l + a, {
      span: o,
      ruleWidth: m,
      advanceWidth: d
    } = ot.sqrtImage(s, e), c = o.height - m;
    c > r.height + r.depth + l && (l = (l + c - r.height - r.depth) / 2);
    var v = o.height - r.height - l - m;
    r.style.paddingLeft = V(d);
    var p = D.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: r,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: -(r.height + v)
      }, {
        type: "elem",
        elem: o
      }, {
        type: "kern",
        size: m
      }]
    }, e);
    if (t.index) {
      var w = e.havingStyle(Z.SCRIPTSCRIPT), T = ie(t.index, w, e), B = 0.6 * (p.height - p.depth), C = D.makeVList({
        positionType: "shift",
        positionData: -B,
        children: [{
          type: "elem",
          elem: T
        }]
      }, e), b = D.makeSpan(["root"], [C]);
      return D.makeSpan(["mord", "sqrt"], [b, p], e);
    } else
      return D.makeSpan(["mord", "sqrt"], [p], e);
  },
  mathmlBuilder(t, e) {
    var {
      body: r,
      index: n
    } = t;
    return n ? new O.MathNode("mroot", [he(r, e), he(n, e)]) : new O.MathNode("msqrt", [he(r, e)]);
  }
});
var vn = {
  display: Z.DISPLAY,
  text: Z.TEXT,
  script: Z.SCRIPT,
  scriptscript: Z.SCRIPTSCRIPT
};
U({
  type: "styling",
  names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(t, e) {
    var {
      breakOnTokenText: r,
      funcName: n,
      parser: a
    } = t, i = a.parseExpression(!0, r), l = n.slice(1, n.length - 5);
    return {
      type: "styling",
      mode: a.mode,
      // Figure out what style to use by pulling out the style from
      // the function name
      style: l,
      body: i
    };
  },
  htmlBuilder(t, e) {
    var r = vn[t.style], n = e.havingStyle(r).withFont("");
    return Ra(t.body, n, e);
  },
  mathmlBuilder(t, e) {
    var r = vn[t.style], n = e.havingStyle(r), a = Re(t.body, n), i = new O.MathNode("mstyle", a), l = {
      display: ["0", "true"],
      text: ["0", "false"],
      script: ["1", "false"],
      scriptscript: ["2", "false"]
    }, s = l[t.style];
    return i.setAttribute("scriptlevel", s[0]), i.setAttribute("displaystyle", s[1]), i;
  }
});
var Xu = function(e, r) {
  var n = e.base;
  if (n)
    if (n.type === "op") {
      var a = n.limits && (r.style.size === Z.DISPLAY.size || n.alwaysHandleSupSub);
      return a ? Ot : null;
    } else if (n.type === "operatorname") {
      var i = n.alwaysHandleSupSub && (r.style.size === Z.DISPLAY.size || n.limits);
      return i ? Oa : null;
    } else {
      if (n.type === "accent")
        return le.isCharacterBox(n.base) ? pr : null;
      if (n.type === "horizBrace") {
        var l = !e.sub;
        return l === n.isOver ? Na : null;
      } else
        return null;
    }
  else return null;
};
Ct({
  type: "supsub",
  htmlBuilder(t, e) {
    var r = Xu(t, e);
    if (r)
      return r(t, e);
    var {
      base: n,
      sup: a,
      sub: i
    } = t, l = ie(n, e), s, o, m = e.fontMetrics(), d = 0, c = 0, v = n && le.isCharacterBox(n);
    if (a) {
      var p = e.havingStyle(e.style.sup());
      s = ie(a, p, e), v || (d = l.height - p.fontMetrics().supDrop * p.sizeMultiplier / e.sizeMultiplier);
    }
    if (i) {
      var w = e.havingStyle(e.style.sub());
      o = ie(i, w, e), v || (c = l.depth + w.fontMetrics().subDrop * w.sizeMultiplier / e.sizeMultiplier);
    }
    var T;
    e.style === Z.DISPLAY ? T = m.sup1 : e.style.cramped ? T = m.sup3 : T = m.sup2;
    var B = e.sizeMultiplier, C = V(0.5 / m.ptPerEm / B), b = null;
    if (o) {
      var k = t.base && t.base.type === "op" && t.base.name && (t.base.name === "\\oiint" || t.base.name === "\\oiiint");
      (l instanceof Ye || k) && (b = V(-l.italic));
    }
    var I;
    if (s && o) {
      d = Math.max(d, T, s.depth + 0.25 * m.xHeight), c = Math.max(c, m.sub2);
      var F = m.defaultRuleThickness, z = 4 * F;
      if (d - s.depth - (o.height - c) < z) {
        c = z - (d - s.depth) + o.height;
        var N = 0.8 * m.xHeight - (d - s.depth);
        N > 0 && (d += N, c -= N);
      }
      var H = [{
        type: "elem",
        elem: o,
        shift: c,
        marginRight: C,
        marginLeft: b
      }, {
        type: "elem",
        elem: s,
        shift: -d,
        marginRight: C
      }];
      I = D.makeVList({
        positionType: "individualShift",
        children: H
      }, e);
    } else if (o) {
      c = Math.max(c, m.sub1, o.height - 0.8 * m.xHeight);
      var q = [{
        type: "elem",
        elem: o,
        marginLeft: b,
        marginRight: C
      }];
      I = D.makeVList({
        positionType: "shift",
        positionData: c,
        children: q
      }, e);
    } else if (s)
      d = Math.max(d, T, s.depth + 0.25 * m.xHeight), I = D.makeVList({
        positionType: "shift",
        positionData: -d,
        children: [{
          type: "elem",
          elem: s,
          marginRight: C
        }]
      }, e);
    else
      throw new Error("supsub must have either sup or sub.");
    var E = tr(l, "right") || "mord";
    return D.makeSpan([E], [l, D.makeSpan(["msupsub"], [I])], e);
  },
  mathmlBuilder(t, e) {
    var r = !1, n, a;
    t.base && t.base.type === "horizBrace" && (a = !!t.sup, a === t.base.isOver && (r = !0, n = t.base.isOver)), t.base && (t.base.type === "op" || t.base.type === "operatorname") && (t.base.parentIsSupSub = !0);
    var i = [he(t.base, e)];
    t.sub && i.push(he(t.sub, e)), t.sup && i.push(he(t.sup, e));
    var l;
    if (r)
      l = n ? "mover" : "munder";
    else if (t.sub)
      if (t.sup) {
        var m = t.base;
        m && m.type === "op" && m.limits && e.style === Z.DISPLAY || m && m.type === "operatorname" && m.alwaysHandleSupSub && (e.style === Z.DISPLAY || m.limits) ? l = "munderover" : l = "msubsup";
      } else {
        var o = t.base;
        o && o.type === "op" && o.limits && (e.style === Z.DISPLAY || o.alwaysHandleSupSub) || o && o.type === "operatorname" && o.alwaysHandleSupSub && (o.limits || e.style === Z.DISPLAY) ? l = "munder" : l = "msub";
      }
    else {
      var s = t.base;
      s && s.type === "op" && s.limits && (e.style === Z.DISPLAY || s.alwaysHandleSupSub) || s && s.type === "operatorname" && s.alwaysHandleSupSub && (s.limits || e.style === Z.DISPLAY) ? l = "mover" : l = "msup";
    }
    return new O.MathNode(l, i);
  }
});
Ct({
  type: "atom",
  htmlBuilder(t, e) {
    return D.mathsym(t.text, t.mode, e, ["m" + t.family]);
  },
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mo", [Ue(t.text, t.mode)]);
    if (t.family === "bin") {
      var n = fr(t, e);
      n === "bold-italic" && r.setAttribute("mathvariant", n);
    } else t.family === "punct" ? r.setAttribute("separator", "true") : (t.family === "open" || t.family === "close") && r.setAttribute("stretchy", "false");
    return r;
  }
});
var Pa = {
  mi: "italic",
  mn: "normal",
  mtext: "normal"
};
Ct({
  type: "mathord",
  htmlBuilder(t, e) {
    return D.makeOrd(t, e, "mathord");
  },
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mi", [Ue(t.text, t.mode, e)]), n = fr(t, e) || "italic";
    return n !== Pa[r.type] && r.setAttribute("mathvariant", n), r;
  }
});
Ct({
  type: "textord",
  htmlBuilder(t, e) {
    return D.makeOrd(t, e, "textord");
  },
  mathmlBuilder(t, e) {
    var r = Ue(t.text, t.mode, e), n = fr(t, e) || "normal", a;
    return t.mode === "text" ? a = new O.MathNode("mtext", [r]) : /[0-9]/.test(t.text) ? a = new O.MathNode("mn", [r]) : t.text === "\\prime" ? a = new O.MathNode("mo", [r]) : a = new O.MathNode("mi", [r]), n !== Pa[a.type] && a.setAttribute("mathvariant", n), a;
  }
});
var G0 = {
  "\\nobreak": "nobreak",
  "\\allowbreak": "allowbreak"
}, U0 = {
  " ": {},
  "\\ ": {},
  "~": {
    className: "nobreak"
  },
  "\\space": {},
  "\\nobreakspace": {
    className: "nobreak"
  }
};
Ct({
  type: "spacing",
  htmlBuilder(t, e) {
    if (U0.hasOwnProperty(t.text)) {
      var r = U0[t.text].className || "";
      if (t.mode === "text") {
        var n = D.makeOrd(t, e, "textord");
        return n.classes.push(r), n;
      } else
        return D.makeSpan(["mspace", r], [D.mathsym(t.text, t.mode, e)], e);
    } else {
      if (G0.hasOwnProperty(t.text))
        return D.makeSpan(["mspace", G0[t.text]], [], e);
      throw new R('Unknown type of space "' + t.text + '"');
    }
  },
  mathmlBuilder(t, e) {
    var r;
    if (U0.hasOwnProperty(t.text))
      r = new O.MathNode("mtext", [new O.TextNode(" ")]);
    else {
      if (G0.hasOwnProperty(t.text))
        return new O.MathNode("mspace");
      throw new R('Unknown type of space "' + t.text + '"');
    }
    return r;
  }
});
var bn = () => {
  var t = new O.MathNode("mtd", []);
  return t.setAttribute("width", "50%"), t;
};
Ct({
  type: "tag",
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mtable", [new O.MathNode("mtr", [bn(), new O.MathNode("mtd", [yt(t.body, e)]), bn(), new O.MathNode("mtd", [yt(t.tag, e)])])]);
    return r.setAttribute("width", "100%"), r;
  }
});
var xn = {
  "\\text": void 0,
  "\\textrm": "textrm",
  "\\textsf": "textsf",
  "\\texttt": "texttt",
  "\\textnormal": "textrm"
}, yn = {
  "\\textbf": "textbf",
  "\\textmd": "textmd"
}, Zu = {
  "\\textit": "textit",
  "\\textup": "textup"
}, wn = (t, e) => {
  var r = t.font;
  if (r) {
    if (xn[r])
      return e.withTextFontFamily(xn[r]);
    if (yn[r])
      return e.withTextFontWeight(yn[r]);
    if (r === "\\emph")
      return e.fontShape === "textit" ? e.withTextFontShape("textup") : e.withTextFontShape("textit");
  } else return e;
  return e.withTextFontShape(Zu[r]);
};
U({
  type: "text",
  names: [
    // Font families
    "\\text",
    "\\textrm",
    "\\textsf",
    "\\texttt",
    "\\textnormal",
    // Font weights
    "\\textbf",
    "\\textmd",
    // Font Shapes
    "\\textit",
    "\\textup",
    "\\emph"
  ],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInArgument: !0,
    allowedInText: !0
  },
  handler(t, e) {
    var {
      parser: r,
      funcName: n
    } = t, a = e[0];
    return {
      type: "text",
      mode: r.mode,
      body: ye(a),
      font: n
    };
  },
  htmlBuilder(t, e) {
    var r = wn(t, e), n = ze(t.body, r, !0);
    return D.makeSpan(["mord", "text"], n, r);
  },
  mathmlBuilder(t, e) {
    var r = wn(t, e);
    return yt(t.body, r);
  }
});
U({
  type: "underline",
  names: ["\\underline"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "underline",
      mode: r.mode,
      body: e[0]
    };
  },
  htmlBuilder(t, e) {
    var r = ie(t.body, e), n = D.makeLineSpan("underline-line", e), a = e.fontMetrics().defaultRuleThickness, i = D.makeVList({
      positionType: "top",
      positionData: r.height,
      children: [{
        type: "kern",
        size: a
      }, {
        type: "elem",
        elem: n
      }, {
        type: "kern",
        size: 3 * a
      }, {
        type: "elem",
        elem: r
      }]
    }, e);
    return D.makeSpan(["mord", "underline"], [i], e);
  },
  mathmlBuilder(t, e) {
    var r = new O.MathNode("mo", [new O.TextNode("‾")]);
    r.setAttribute("stretchy", "true");
    var n = new O.MathNode("munder", [he(t.body, e), r]);
    return n.setAttribute("accentunder", "true"), n;
  }
});
U({
  type: "vcenter",
  names: ["\\vcenter"],
  props: {
    numArgs: 1,
    argTypes: ["original"],
    // In LaTeX, \vcenter can act only on a box.
    allowedInText: !1
  },
  handler(t, e) {
    var {
      parser: r
    } = t;
    return {
      type: "vcenter",
      mode: r.mode,
      body: e[0]
    };
  },
  htmlBuilder(t, e) {
    var r = ie(t.body, e), n = e.fontMetrics().axisHeight, a = 0.5 * (r.height - n - (r.depth + n));
    return D.makeVList({
      positionType: "shift",
      positionData: a,
      children: [{
        type: "elem",
        elem: r
      }]
    }, e);
  },
  mathmlBuilder(t, e) {
    return new O.MathNode("mpadded", [he(t.body, e)], ["vcenter"]);
  }
});
U({
  type: "verb",
  names: ["\\verb"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(t, e, r) {
    throw new R("\\verb ended by end of line instead of matching delimiter");
  },
  htmlBuilder(t, e) {
    for (var r = kn(t), n = [], a = e.havingStyle(e.style.text()), i = 0; i < r.length; i++) {
      var l = r[i];
      l === "~" && (l = "\\textasciitilde"), n.push(D.makeSymbol(l, "Typewriter-Regular", t.mode, a, ["mord", "texttt"]));
    }
    return D.makeSpan(["mord", "text"].concat(a.sizingClasses(e)), D.tryCombineChars(n), a);
  },
  mathmlBuilder(t, e) {
    var r = new O.TextNode(kn(t)), n = new O.MathNode("mtext", [r]);
    return n.setAttribute("mathvariant", "monospace"), n;
  }
});
var kn = (t) => t.body.replace(/ /g, t.star ? "␣" : " "), vt = ha, Ha = `[ \r
	]`, Qu = "\\\\[a-zA-Z@]+", _u = "\\\\[^\uD800-\uDFFF]", Ku = "(" + Qu + ")" + Ha + "*", Ju = `\\\\(
|[ \r	]+
?)[ \r	]*`, ar = "[̀-ͯ]", eo = new RegExp(ar + "+$"), to = "(" + Ha + "+)|" + // whitespace
(Ju + "|") + // \whitespace
"([!-\\[\\]-‧‪-퟿豈-￿]" + // single codepoint
(ar + "*") + // ...plus accents
"|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
(ar + "*") + // ...plus accents
"|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + // \verb unstarred
("|" + Ku) + // \macroName + spaces
("|" + _u + ")");
class Sn {
  // Category codes. The lexer only supports comment characters (14) for now.
  // MacroExpander additionally distinguishes active (13).
  constructor(e, r) {
    this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e, this.settings = r, this.tokenRegex = new RegExp(to, "g"), this.catcodes = {
      "%": 14,
      // comment character
      "~": 13
      // active character
    };
  }
  setCatcode(e, r) {
    this.catcodes[e] = r;
  }
  /**
   * This function lexes a single token.
   */
  lex() {
    var e = this.input, r = this.tokenRegex.lastIndex;
    if (r === e.length)
      return new Ve("EOF", new Oe(this, r, r));
    var n = this.tokenRegex.exec(e);
    if (n === null || n.index !== r)
      throw new R("Unexpected character: '" + e[r] + "'", new Ve(e[r], new Oe(this, r, r + 1)));
    var a = n[6] || n[3] || (n[2] ? "\\ " : " ");
    if (this.catcodes[a] === 14) {
      var i = e.indexOf(`
`, this.tokenRegex.lastIndex);
      return i === -1 ? (this.tokenRegex.lastIndex = e.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = i + 1, this.lex();
    }
    return new Ve(a, new Oe(this, r, this.tokenRegex.lastIndex));
  }
}
class ro {
  /**
   * Both arguments are optional.  The first argument is an object of
   * built-in mappings which never change.  The second argument is an object
   * of initial (global-level) mappings, which will constantly change
   * according to any global/top-level `set`s done.
   */
  constructor(e, r) {
    e === void 0 && (e = {}), r === void 0 && (r = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = r, this.builtins = e, this.undefStack = [];
  }
  /**
   * Start a new nested group, affecting future local `set`s.
   */
  beginGroup() {
    this.undefStack.push({});
  }
  /**
   * End current nested group, restoring values before the group began.
   */
  endGroup() {
    if (this.undefStack.length === 0)
      throw new R("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
    var e = this.undefStack.pop();
    for (var r in e)
      e.hasOwnProperty(r) && (e[r] == null ? delete this.current[r] : this.current[r] = e[r]);
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    for (; this.undefStack.length > 0; )
      this.endGroup();
  }
  /**
   * Detect whether `name` has a definition.  Equivalent to
   * `get(name) != null`.
   */
  has(e) {
    return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e);
  }
  /**
   * Get the current value of a name, or `undefined` if there is no value.
   *
   * Note: Do not use `if (namespace.get(...))` to detect whether a macro
   * is defined, as the definition may be the empty string which evaluates
   * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
   * `if (namespace.has(...))`.
   */
  get(e) {
    return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e];
  }
  /**
   * Set the current value of a name, and optionally set it globally too.
   * Local set() sets the current value and (when appropriate) adds an undo
   * operation to the undo stack.  Global set() may change the undo
   * operation at every level, so takes time linear in their number.
   * A value of undefined means to delete existing definitions.
   */
  set(e, r, n) {
    if (n === void 0 && (n = !1), n) {
      for (var a = 0; a < this.undefStack.length; a++)
        delete this.undefStack[a][e];
      this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = r);
    } else {
      var i = this.undefStack[this.undefStack.length - 1];
      i && !i.hasOwnProperty(e) && (i[e] = this.current[e]);
    }
    r == null ? delete this.current[e] : this.current[e] = r;
  }
}
var no = Fa;
g("\\noexpand", function(t) {
  var e = t.popToken();
  return t.isExpandable(e.text) && (e.noexpand = !0, e.treatAsRelax = !0), {
    tokens: [e],
    numArgs: 0
  };
});
g("\\expandafter", function(t) {
  var e = t.popToken();
  return t.expandOnce(!0), {
    tokens: [e],
    numArgs: 0
  };
});
g("\\@firstoftwo", function(t) {
  var e = t.consumeArgs(2);
  return {
    tokens: e[0],
    numArgs: 0
  };
});
g("\\@secondoftwo", function(t) {
  var e = t.consumeArgs(2);
  return {
    tokens: e[1],
    numArgs: 0
  };
});
g("\\@ifnextchar", function(t) {
  var e = t.consumeArgs(3);
  t.consumeSpaces();
  var r = t.future();
  return e[0].length === 1 && e[0][0].text === r.text ? {
    tokens: e[1],
    numArgs: 0
  } : {
    tokens: e[2],
    numArgs: 0
  };
});
g("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
g("\\TextOrMath", function(t) {
  var e = t.consumeArgs(2);
  return t.mode === "text" ? {
    tokens: e[0],
    numArgs: 0
  } : {
    tokens: e[1],
    numArgs: 0
  };
});
var zn = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
g("\\char", function(t) {
  var e = t.popToken(), r, n = "";
  if (e.text === "'")
    r = 8, e = t.popToken();
  else if (e.text === '"')
    r = 16, e = t.popToken();
  else if (e.text === "`")
    if (e = t.popToken(), e.text[0] === "\\")
      n = e.text.charCodeAt(1);
    else {
      if (e.text === "EOF")
        throw new R("\\char` missing argument");
      n = e.text.charCodeAt(0);
    }
  else
    r = 10;
  if (r) {
    if (n = zn[e.text], n == null || n >= r)
      throw new R("Invalid base-" + r + " digit " + e.text);
    for (var a; (a = zn[t.future().text]) != null && a < r; )
      n *= r, n += a, t.popToken();
  }
  return "\\@char{" + n + "}";
});
var Sr = (t, e, r, n) => {
  var a = t.consumeArg().tokens;
  if (a.length !== 1)
    throw new R("\\newcommand's first argument must be a macro name");
  var i = a[0].text, l = t.isDefined(i);
  if (l && !e)
    throw new R("\\newcommand{" + i + "} attempting to redefine " + (i + "; use \\renewcommand"));
  if (!l && !r)
    throw new R("\\renewcommand{" + i + "} when command " + i + " does not yet exist; use \\newcommand");
  var s = 0;
  if (a = t.consumeArg().tokens, a.length === 1 && a[0].text === "[") {
    for (var o = "", m = t.expandNextToken(); m.text !== "]" && m.text !== "EOF"; )
      o += m.text, m = t.expandNextToken();
    if (!o.match(/^\s*[0-9]+\s*$/))
      throw new R("Invalid number of arguments: " + o);
    s = parseInt(o), a = t.consumeArg().tokens;
  }
  return l && n || t.macros.set(i, {
    tokens: a,
    numArgs: s
  }), "";
};
g("\\newcommand", (t) => Sr(t, !1, !0, !1));
g("\\renewcommand", (t) => Sr(t, !0, !1, !1));
g("\\providecommand", (t) => Sr(t, !0, !0, !0));
g("\\message", (t) => {
  var e = t.consumeArgs(1)[0];
  return console.log(e.reverse().map((r) => r.text).join("")), "";
});
g("\\errmessage", (t) => {
  var e = t.consumeArgs(1)[0];
  return console.error(e.reverse().map((r) => r.text).join("")), "";
});
g("\\show", (t) => {
  var e = t.popToken(), r = e.text;
  return console.log(e, t.macros.get(r), vt[r], me.math[r], me.text[r]), "";
});
g("\\bgroup", "{");
g("\\egroup", "}");
g("~", "\\nobreakspace");
g("\\lq", "`");
g("\\rq", "'");
g("\\aa", "\\r a");
g("\\AA", "\\r A");
g("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
g("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
g("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
g("ℬ", "\\mathscr{B}");
g("ℰ", "\\mathscr{E}");
g("ℱ", "\\mathscr{F}");
g("ℋ", "\\mathscr{H}");
g("ℐ", "\\mathscr{I}");
g("ℒ", "\\mathscr{L}");
g("ℳ", "\\mathscr{M}");
g("ℛ", "\\mathscr{R}");
g("ℭ", "\\mathfrak{C}");
g("ℌ", "\\mathfrak{H}");
g("ℨ", "\\mathfrak{Z}");
g("\\Bbbk", "\\Bbb{k}");
g("·", "\\cdotp");
g("\\llap", "\\mathllap{\\textrm{#1}}");
g("\\rlap", "\\mathrlap{\\textrm{#1}}");
g("\\clap", "\\mathclap{\\textrm{#1}}");
g("\\mathstrut", "\\vphantom{(}");
g("\\underbar", "\\underline{\\text{#1}}");
g("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
g("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
g("\\ne", "\\neq");
g("≠", "\\neq");
g("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}");
g("∉", "\\notin");
g("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}");
g("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
g("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
g("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
g("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}");
g("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
g("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
g("⟂", "\\perp");
g("‼", "\\mathclose{!\\mkern-0.8mu!}");
g("∌", "\\notni");
g("⌜", "\\ulcorner");
g("⌝", "\\urcorner");
g("⌞", "\\llcorner");
g("⌟", "\\lrcorner");
g("©", "\\copyright");
g("®", "\\textregistered");
g("️", "\\textregistered");
g("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
g("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
g("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
g("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
g("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
g("⋮", "\\vdots");
g("\\varGamma", "\\mathit{\\Gamma}");
g("\\varDelta", "\\mathit{\\Delta}");
g("\\varTheta", "\\mathit{\\Theta}");
g("\\varLambda", "\\mathit{\\Lambda}");
g("\\varXi", "\\mathit{\\Xi}");
g("\\varPi", "\\mathit{\\Pi}");
g("\\varSigma", "\\mathit{\\Sigma}");
g("\\varUpsilon", "\\mathit{\\Upsilon}");
g("\\varPhi", "\\mathit{\\Phi}");
g("\\varPsi", "\\mathit{\\Psi}");
g("\\varOmega", "\\mathit{\\Omega}");
g("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
g("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
g("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
g("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
g("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
g("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
g("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
g("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var An = {
  ",": "\\dotsc",
  "\\not": "\\dotsb",
  // \keybin@ checks for the following:
  "+": "\\dotsb",
  "=": "\\dotsb",
  "<": "\\dotsb",
  ">": "\\dotsb",
  "-": "\\dotsb",
  "*": "\\dotsb",
  ":": "\\dotsb",
  // Symbols whose definition starts with \DOTSB:
  "\\DOTSB": "\\dotsb",
  "\\coprod": "\\dotsb",
  "\\bigvee": "\\dotsb",
  "\\bigwedge": "\\dotsb",
  "\\biguplus": "\\dotsb",
  "\\bigcap": "\\dotsb",
  "\\bigcup": "\\dotsb",
  "\\prod": "\\dotsb",
  "\\sum": "\\dotsb",
  "\\bigotimes": "\\dotsb",
  "\\bigoplus": "\\dotsb",
  "\\bigodot": "\\dotsb",
  "\\bigsqcup": "\\dotsb",
  "\\And": "\\dotsb",
  "\\longrightarrow": "\\dotsb",
  "\\Longrightarrow": "\\dotsb",
  "\\longleftarrow": "\\dotsb",
  "\\Longleftarrow": "\\dotsb",
  "\\longleftrightarrow": "\\dotsb",
  "\\Longleftrightarrow": "\\dotsb",
  "\\mapsto": "\\dotsb",
  "\\longmapsto": "\\dotsb",
  "\\hookrightarrow": "\\dotsb",
  "\\doteq": "\\dotsb",
  // Symbols whose definition starts with \mathbin:
  "\\mathbin": "\\dotsb",
  // Symbols whose definition starts with \mathrel:
  "\\mathrel": "\\dotsb",
  "\\relbar": "\\dotsb",
  "\\Relbar": "\\dotsb",
  "\\xrightarrow": "\\dotsb",
  "\\xleftarrow": "\\dotsb",
  // Symbols whose definition starts with \DOTSI:
  "\\DOTSI": "\\dotsi",
  "\\int": "\\dotsi",
  "\\oint": "\\dotsi",
  "\\iint": "\\dotsi",
  "\\iiint": "\\dotsi",
  "\\iiiint": "\\dotsi",
  "\\idotsint": "\\dotsi",
  // Symbols whose definition starts with \DOTSX:
  "\\DOTSX": "\\dotsx"
};
g("\\dots", function(t) {
  var e = "\\dotso", r = t.expandAfterFuture().text;
  return r in An ? e = An[r] : (r.slice(0, 4) === "\\not" || r in me.math && ["bin", "rel"].includes(me.math[r].group)) && (e = "\\dotsb"), e;
});
var zr = {
  // \rightdelim@ checks for the following:
  ")": !0,
  "]": !0,
  "\\rbrack": !0,
  "\\}": !0,
  "\\rbrace": !0,
  "\\rangle": !0,
  "\\rceil": !0,
  "\\rfloor": !0,
  "\\rgroup": !0,
  "\\rmoustache": !0,
  "\\right": !0,
  "\\bigr": !0,
  "\\biggr": !0,
  "\\Bigr": !0,
  "\\Biggr": !0,
  // \extra@ also tests for the following:
  $: !0,
  // \extrap@ checks for the following:
  ";": !0,
  ".": !0,
  ",": !0
};
g("\\dotso", function(t) {
  var e = t.future().text;
  return e in zr ? "\\ldots\\," : "\\ldots";
});
g("\\dotsc", function(t) {
  var e = t.future().text;
  return e in zr && e !== "," ? "\\ldots\\," : "\\ldots";
});
g("\\cdots", function(t) {
  var e = t.future().text;
  return e in zr ? "\\@cdots\\," : "\\@cdots";
});
g("\\dotsb", "\\cdots");
g("\\dotsm", "\\cdots");
g("\\dotsi", "\\!\\cdots");
g("\\dotsx", "\\ldots\\,");
g("\\DOTSI", "\\relax");
g("\\DOTSB", "\\relax");
g("\\DOTSX", "\\relax");
g("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
g("\\,", "\\tmspace+{3mu}{.1667em}");
g("\\thinspace", "\\,");
g("\\>", "\\mskip{4mu}");
g("\\:", "\\tmspace+{4mu}{.2222em}");
g("\\medspace", "\\:");
g("\\;", "\\tmspace+{5mu}{.2777em}");
g("\\thickspace", "\\;");
g("\\!", "\\tmspace-{3mu}{.1667em}");
g("\\negthinspace", "\\!");
g("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
g("\\negthickspace", "\\tmspace-{5mu}{.277em}");
g("\\enspace", "\\kern.5em ");
g("\\enskip", "\\hskip.5em\\relax");
g("\\quad", "\\hskip1em\\relax");
g("\\qquad", "\\hskip2em\\relax");
g("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
g("\\tag@paren", "\\tag@literal{({#1})}");
g("\\tag@literal", (t) => {
  if (t.macros.get("\\df@tag"))
    throw new R("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
g("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
g("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
g("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
g("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
g("\\newline", "\\\\\\relax");
g("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var Va = V(st["Main-Regular"][84][1] - 0.7 * st["Main-Regular"][65][1]);
g("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + Va + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
g("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + Va + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
g("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
g("\\@hspace", "\\hskip #1\\relax");
g("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
g("\\ordinarycolon", ":");
g("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
g("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
g("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
g("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
g("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
g("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
g("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
g("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
g("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
g("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
g("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
g("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
g("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
g("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
g("∷", "\\dblcolon");
g("∹", "\\eqcolon");
g("≔", "\\coloneqq");
g("≕", "\\eqqcolon");
g("⩴", "\\Coloneqq");
g("\\ratio", "\\vcentcolon");
g("\\coloncolon", "\\dblcolon");
g("\\colonequals", "\\coloneqq");
g("\\coloncolonequals", "\\Coloneqq");
g("\\equalscolon", "\\eqqcolon");
g("\\equalscoloncolon", "\\Eqqcolon");
g("\\colonminus", "\\coloneq");
g("\\coloncolonminus", "\\Coloneq");
g("\\minuscolon", "\\eqcolon");
g("\\minuscoloncolon", "\\Eqcolon");
g("\\coloncolonapprox", "\\Colonapprox");
g("\\coloncolonsim", "\\Colonsim");
g("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
g("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
g("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
g("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
g("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
g("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
g("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
g("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
g("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
g("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
g("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
g("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
g("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
g("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
g("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
g("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
g("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
g("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
g("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
g("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
g("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
g("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
g("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
g("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
g("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
g("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
g("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
g("\\imath", "\\html@mathml{\\@imath}{ı}");
g("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
g("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}");
g("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}");
g("⟦", "\\llbracket");
g("⟧", "\\rrbracket");
g("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}");
g("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}");
g("⦃", "\\lBrace");
g("⦄", "\\rBrace");
g("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}");
g("⦵", "\\minuso");
g("\\darr", "\\downarrow");
g("\\dArr", "\\Downarrow");
g("\\Darr", "\\Downarrow");
g("\\lang", "\\langle");
g("\\rang", "\\rangle");
g("\\uarr", "\\uparrow");
g("\\uArr", "\\Uparrow");
g("\\Uarr", "\\Uparrow");
g("\\N", "\\mathbb{N}");
g("\\R", "\\mathbb{R}");
g("\\Z", "\\mathbb{Z}");
g("\\alef", "\\aleph");
g("\\alefsym", "\\aleph");
g("\\Alpha", "\\mathrm{A}");
g("\\Beta", "\\mathrm{B}");
g("\\bull", "\\bullet");
g("\\Chi", "\\mathrm{X}");
g("\\clubs", "\\clubsuit");
g("\\cnums", "\\mathbb{C}");
g("\\Complex", "\\mathbb{C}");
g("\\Dagger", "\\ddagger");
g("\\diamonds", "\\diamondsuit");
g("\\empty", "\\emptyset");
g("\\Epsilon", "\\mathrm{E}");
g("\\Eta", "\\mathrm{H}");
g("\\exist", "\\exists");
g("\\harr", "\\leftrightarrow");
g("\\hArr", "\\Leftrightarrow");
g("\\Harr", "\\Leftrightarrow");
g("\\hearts", "\\heartsuit");
g("\\image", "\\Im");
g("\\infin", "\\infty");
g("\\Iota", "\\mathrm{I}");
g("\\isin", "\\in");
g("\\Kappa", "\\mathrm{K}");
g("\\larr", "\\leftarrow");
g("\\lArr", "\\Leftarrow");
g("\\Larr", "\\Leftarrow");
g("\\lrarr", "\\leftrightarrow");
g("\\lrArr", "\\Leftrightarrow");
g("\\Lrarr", "\\Leftrightarrow");
g("\\Mu", "\\mathrm{M}");
g("\\natnums", "\\mathbb{N}");
g("\\Nu", "\\mathrm{N}");
g("\\Omicron", "\\mathrm{O}");
g("\\plusmn", "\\pm");
g("\\rarr", "\\rightarrow");
g("\\rArr", "\\Rightarrow");
g("\\Rarr", "\\Rightarrow");
g("\\real", "\\Re");
g("\\reals", "\\mathbb{R}");
g("\\Reals", "\\mathbb{R}");
g("\\Rho", "\\mathrm{P}");
g("\\sdot", "\\cdot");
g("\\sect", "\\S");
g("\\spades", "\\spadesuit");
g("\\sub", "\\subset");
g("\\sube", "\\subseteq");
g("\\supe", "\\supseteq");
g("\\Tau", "\\mathrm{T}");
g("\\thetasym", "\\vartheta");
g("\\weierp", "\\wp");
g("\\Zeta", "\\mathrm{Z}");
g("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
g("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
g("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
g("\\bra", "\\mathinner{\\langle{#1}|}");
g("\\ket", "\\mathinner{|{#1}\\rangle}");
g("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
g("\\Bra", "\\left\\langle#1\\right|");
g("\\Ket", "\\left|#1\\right\\rangle");
var $a = (t) => (e) => {
  var r = e.consumeArg().tokens, n = e.consumeArg().tokens, a = e.consumeArg().tokens, i = e.consumeArg().tokens, l = e.macros.get("|"), s = e.macros.get("\\|");
  e.macros.beginGroup();
  var o = (c) => (v) => {
    t && (v.macros.set("|", l), a.length && v.macros.set("\\|", s));
    var p = c;
    if (!c && a.length) {
      var w = v.future();
      w.text === "|" && (v.popToken(), p = !0);
    }
    return {
      tokens: p ? a : n,
      numArgs: 0
    };
  };
  e.macros.set("|", o(!1)), a.length && e.macros.set("\\|", o(!0));
  var m = e.consumeArg().tokens, d = e.expandTokens([
    ...i,
    ...m,
    ...r
    // reversed
  ]);
  return e.macros.endGroup(), {
    tokens: d.reverse(),
    numArgs: 0
  };
};
g("\\bra@ket", $a(!1));
g("\\bra@set", $a(!0));
g("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
g("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
g("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
g("\\angln", "{\\angl n}");
g("\\blue", "\\textcolor{##6495ed}{#1}");
g("\\orange", "\\textcolor{##ffa500}{#1}");
g("\\pink", "\\textcolor{##ff00af}{#1}");
g("\\red", "\\textcolor{##df0030}{#1}");
g("\\green", "\\textcolor{##28ae7b}{#1}");
g("\\gray", "\\textcolor{gray}{#1}");
g("\\purple", "\\textcolor{##9d38bd}{#1}");
g("\\blueA", "\\textcolor{##ccfaff}{#1}");
g("\\blueB", "\\textcolor{##80f6ff}{#1}");
g("\\blueC", "\\textcolor{##63d9ea}{#1}");
g("\\blueD", "\\textcolor{##11accd}{#1}");
g("\\blueE", "\\textcolor{##0c7f99}{#1}");
g("\\tealA", "\\textcolor{##94fff5}{#1}");
g("\\tealB", "\\textcolor{##26edd5}{#1}");
g("\\tealC", "\\textcolor{##01d1c1}{#1}");
g("\\tealD", "\\textcolor{##01a995}{#1}");
g("\\tealE", "\\textcolor{##208170}{#1}");
g("\\greenA", "\\textcolor{##b6ffb0}{#1}");
g("\\greenB", "\\textcolor{##8af281}{#1}");
g("\\greenC", "\\textcolor{##74cf70}{#1}");
g("\\greenD", "\\textcolor{##1fab54}{#1}");
g("\\greenE", "\\textcolor{##0d923f}{#1}");
g("\\goldA", "\\textcolor{##ffd0a9}{#1}");
g("\\goldB", "\\textcolor{##ffbb71}{#1}");
g("\\goldC", "\\textcolor{##ff9c39}{#1}");
g("\\goldD", "\\textcolor{##e07d10}{#1}");
g("\\goldE", "\\textcolor{##a75a05}{#1}");
g("\\redA", "\\textcolor{##fca9a9}{#1}");
g("\\redB", "\\textcolor{##ff8482}{#1}");
g("\\redC", "\\textcolor{##f9685d}{#1}");
g("\\redD", "\\textcolor{##e84d39}{#1}");
g("\\redE", "\\textcolor{##bc2612}{#1}");
g("\\maroonA", "\\textcolor{##ffbde0}{#1}");
g("\\maroonB", "\\textcolor{##ff92c6}{#1}");
g("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
g("\\maroonD", "\\textcolor{##ca337c}{#1}");
g("\\maroonE", "\\textcolor{##9e034e}{#1}");
g("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
g("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
g("\\purpleC", "\\textcolor{##aa87ff}{#1}");
g("\\purpleD", "\\textcolor{##7854ab}{#1}");
g("\\purpleE", "\\textcolor{##543b78}{#1}");
g("\\mintA", "\\textcolor{##f5f9e8}{#1}");
g("\\mintB", "\\textcolor{##edf2df}{#1}");
g("\\mintC", "\\textcolor{##e0e5cc}{#1}");
g("\\grayA", "\\textcolor{##f6f7f7}{#1}");
g("\\grayB", "\\textcolor{##f0f1f2}{#1}");
g("\\grayC", "\\textcolor{##e3e5e6}{#1}");
g("\\grayD", "\\textcolor{##d6d8da}{#1}");
g("\\grayE", "\\textcolor{##babec2}{#1}");
g("\\grayF", "\\textcolor{##888d93}{#1}");
g("\\grayG", "\\textcolor{##626569}{#1}");
g("\\grayH", "\\textcolor{##3b3e40}{#1}");
g("\\grayI", "\\textcolor{##21242c}{#1}");
g("\\kaBlue", "\\textcolor{##314453}{#1}");
g("\\kaGreen", "\\textcolor{##71B307}{#1}");
var Ga = {
  "^": !0,
  // Parser.js
  _: !0,
  // Parser.js
  "\\limits": !0,
  // Parser.js
  "\\nolimits": !0
  // Parser.js
};
class ao {
  constructor(e, r, n) {
    this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = r, this.expansionCount = 0, this.feed(e), this.macros = new ro(no, r.macros), this.mode = n, this.stack = [];
  }
  /**
   * Feed a new input string to the same MacroExpander
   * (with existing macros etc.).
   */
  feed(e) {
    this.lexer = new Sn(e, this.settings);
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(e) {
    this.mode = e;
  }
  /**
   * Start a new group nesting within all namespaces.
   */
  beginGroup() {
    this.macros.beginGroup();
  }
  /**
   * End current group nesting within all namespaces.
   */
  endGroup() {
    this.macros.endGroup();
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    this.macros.endGroups();
  }
  /**
   * Returns the topmost token on the stack, without expanding it.
   * Similar in behavior to TeX's `\futurelet`.
   */
  future() {
    return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
  }
  /**
   * Remove and return the next unexpanded token.
   */
  popToken() {
    return this.future(), this.stack.pop();
  }
  /**
   * Add a given token to the token stack.  In particular, this get be used
   * to put back a token returned from one of the other methods.
   */
  pushToken(e) {
    this.stack.push(e);
  }
  /**
   * Append an array of tokens to the token stack.
   */
  pushTokens(e) {
    this.stack.push(...e);
  }
  /**
   * Find an macro argument without expanding tokens and append the array of
   * tokens to the token stack. Uses Token as a container for the result.
   */
  scanArgument(e) {
    var r, n, a;
    if (e) {
      if (this.consumeSpaces(), this.future().text !== "[")
        return null;
      r = this.popToken(), {
        tokens: a,
        end: n
      } = this.consumeArg(["]"]);
    } else
      ({
        tokens: a,
        start: r,
        end: n
      } = this.consumeArg());
    return this.pushToken(new Ve("EOF", n.loc)), this.pushTokens(a), new Ve("", Oe.range(r, n));
  }
  /**
   * Consume all following space tokens, without expansion.
   */
  consumeSpaces() {
    for (; ; ) {
      var e = this.future();
      if (e.text === " ")
        this.stack.pop();
      else
        break;
    }
  }
  /**
   * Consume an argument from the token stream, and return the resulting array
   * of tokens and start/end token.
   */
  consumeArg(e) {
    var r = [], n = e && e.length > 0;
    n || this.consumeSpaces();
    var a = this.future(), i, l = 0, s = 0;
    do {
      if (i = this.popToken(), r.push(i), i.text === "{")
        ++l;
      else if (i.text === "}") {
        if (--l, l === -1)
          throw new R("Extra }", i);
      } else if (i.text === "EOF")
        throw new R("Unexpected end of input in a macro argument, expected '" + (e && n ? e[s] : "}") + "'", i);
      if (e && n)
        if ((l === 0 || l === 1 && e[s] === "{") && i.text === e[s]) {
          if (++s, s === e.length) {
            r.splice(-s, s);
            break;
          }
        } else
          s = 0;
    } while (l !== 0 || n);
    return a.text === "{" && r[r.length - 1].text === "}" && (r.pop(), r.shift()), r.reverse(), {
      tokens: r,
      start: a,
      end: i
    };
  }
  /**
   * Consume the specified number of (delimited) arguments from the token
   * stream and return the resulting array of arguments.
   */
  consumeArgs(e, r) {
    if (r) {
      if (r.length !== e + 1)
        throw new R("The length of delimiters doesn't match the number of args!");
      for (var n = r[0], a = 0; a < n.length; a++) {
        var i = this.popToken();
        if (n[a] !== i.text)
          throw new R("Use of the macro doesn't match its definition", i);
      }
    }
    for (var l = [], s = 0; s < e; s++)
      l.push(this.consumeArg(r && r[s + 1]).tokens);
    return l;
  }
  /**
   * Increment `expansionCount` by the specified amount.
   * Throw an error if it exceeds `maxExpand`.
   */
  countExpansion(e) {
    if (this.expansionCount += e, this.expansionCount > this.settings.maxExpand)
      throw new R("Too many expansions: infinite loop or need to increase maxExpand setting");
  }
  /**
   * Expand the next token only once if possible.
   *
   * If the token is expanded, the resulting tokens will be pushed onto
   * the stack in reverse order, and the number of such tokens will be
   * returned.  This number might be zero or positive.
   *
   * If not, the return value is `false`, and the next token remains at the
   * top of the stack.
   *
   * In either case, the next token will be on the top of the stack,
   * or the stack will be empty (in case of empty expansion
   * and no other tokens).
   *
   * Used to implement `expandAfterFuture` and `expandNextToken`.
   *
   * If expandableOnly, only expandable tokens are expanded and
   * an undefined control sequence results in an error.
   */
  expandOnce(e) {
    var r = this.popToken(), n = r.text, a = r.noexpand ? null : this._getExpansion(n);
    if (a == null || e && a.unexpandable) {
      if (e && a == null && n[0] === "\\" && !this.isDefined(n))
        throw new R("Undefined control sequence: " + n);
      return this.pushToken(r), !1;
    }
    this.countExpansion(1);
    var i = a.tokens, l = this.consumeArgs(a.numArgs, a.delimiters);
    if (a.numArgs) {
      i = i.slice();
      for (var s = i.length - 1; s >= 0; --s) {
        var o = i[s];
        if (o.text === "#") {
          if (s === 0)
            throw new R("Incomplete placeholder at end of macro body", o);
          if (o = i[--s], o.text === "#")
            i.splice(s + 1, 1);
          else if (/^[1-9]$/.test(o.text))
            i.splice(s, 2, ...l[+o.text - 1]);
          else
            throw new R("Not a valid argument number", o);
        }
      }
    }
    return this.pushTokens(i), i.length;
  }
  /**
   * Expand the next token only once (if possible), and return the resulting
   * top token on the stack (without removing anything from the stack).
   * Similar in behavior to TeX's `\expandafter\futurelet`.
   * Equivalent to expandOnce() followed by future().
   */
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  /**
   * Recursively expand first token, then return first non-expandable token.
   */
  expandNextToken() {
    for (; ; )
      if (this.expandOnce() === !1) {
        var e = this.stack.pop();
        return e.treatAsRelax && (e.text = "\\relax"), e;
      }
    throw new Error();
  }
  /**
   * Fully expand the given macro name and return the resulting list of
   * tokens, or return `undefined` if no such macro is defined.
   */
  expandMacro(e) {
    return this.macros.has(e) ? this.expandTokens([new Ve(e)]) : void 0;
  }
  /**
   * Fully expand the given token stream and return the resulting list of
   * tokens.  Note that the input tokens are in reverse order, but the
   * output tokens are in forward order.
   */
  expandTokens(e) {
    var r = [], n = this.stack.length;
    for (this.pushTokens(e); this.stack.length > n; )
      if (this.expandOnce(!0) === !1) {
        var a = this.stack.pop();
        a.treatAsRelax && (a.noexpand = !1, a.treatAsRelax = !1), r.push(a);
      }
    return this.countExpansion(r.length), r;
  }
  /**
   * Fully expand the given macro name and return the result as a string,
   * or return `undefined` if no such macro is defined.
   */
  expandMacroAsText(e) {
    var r = this.expandMacro(e);
    return r && r.map((n) => n.text).join("");
  }
  /**
   * Returns the expanded macro as a reversed array of tokens and a macro
   * argument count.  Or returns `null` if no such macro.
   */
  _getExpansion(e) {
    var r = this.macros.get(e);
    if (r == null)
      return r;
    if (e.length === 1) {
      var n = this.lexer.catcodes[e];
      if (n != null && n !== 13)
        return;
    }
    var a = typeof r == "function" ? r(this) : r;
    if (typeof a == "string") {
      var i = 0;
      if (a.indexOf("#") !== -1)
        for (var l = a.replace(/##/g, ""); l.indexOf("#" + (i + 1)) !== -1; )
          ++i;
      for (var s = new Sn(a, this.settings), o = [], m = s.lex(); m.text !== "EOF"; )
        o.push(m), m = s.lex();
      o.reverse();
      var d = {
        tokens: o,
        numArgs: i
      };
      return d;
    }
    return a;
  }
  /**
   * Determine whether a command is currently "defined" (has some
   * functionality), meaning that it's a macro (in the current group),
   * a function, a symbol, or one of the special commands listed in
   * `implicitCommands`.
   */
  isDefined(e) {
    return this.macros.has(e) || vt.hasOwnProperty(e) || me.math.hasOwnProperty(e) || me.text.hasOwnProperty(e) || Ga.hasOwnProperty(e);
  }
  /**
   * Determine whether a command is expandable.
   */
  isExpandable(e) {
    var r = this.macros.get(e);
    return r != null ? typeof r == "string" || typeof r == "function" || !r.unexpandable : vt.hasOwnProperty(e) && !vt[e].primitive;
  }
}
var Mn = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, u0 = Object.freeze({
  "₊": "+",
  "₋": "-",
  "₌": "=",
  "₍": "(",
  "₎": ")",
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "ₐ": "a",
  "ₑ": "e",
  "ₕ": "h",
  "ᵢ": "i",
  "ⱼ": "j",
  "ₖ": "k",
  "ₗ": "l",
  "ₘ": "m",
  "ₙ": "n",
  "ₒ": "o",
  "ₚ": "p",
  "ᵣ": "r",
  "ₛ": "s",
  "ₜ": "t",
  "ᵤ": "u",
  "ᵥ": "v",
  "ₓ": "x",
  "ᵦ": "β",
  "ᵧ": "γ",
  "ᵨ": "ρ",
  "ᵩ": "ϕ",
  "ᵪ": "χ",
  "⁺": "+",
  "⁻": "-",
  "⁼": "=",
  "⁽": "(",
  "⁾": ")",
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "ᴬ": "A",
  "ᴮ": "B",
  "ᴰ": "D",
  "ᴱ": "E",
  "ᴳ": "G",
  "ᴴ": "H",
  "ᴵ": "I",
  "ᴶ": "J",
  "ᴷ": "K",
  "ᴸ": "L",
  "ᴹ": "M",
  "ᴺ": "N",
  "ᴼ": "O",
  "ᴾ": "P",
  "ᴿ": "R",
  "ᵀ": "T",
  "ᵁ": "U",
  "ⱽ": "V",
  "ᵂ": "W",
  "ᵃ": "a",
  "ᵇ": "b",
  "ᶜ": "c",
  "ᵈ": "d",
  "ᵉ": "e",
  "ᶠ": "f",
  "ᵍ": "g",
  ʰ: "h",
  "ⁱ": "i",
  ʲ: "j",
  "ᵏ": "k",
  ˡ: "l",
  "ᵐ": "m",
  ⁿ: "n",
  "ᵒ": "o",
  "ᵖ": "p",
  ʳ: "r",
  ˢ: "s",
  "ᵗ": "t",
  "ᵘ": "u",
  "ᵛ": "v",
  ʷ: "w",
  ˣ: "x",
  ʸ: "y",
  "ᶻ": "z",
  "ᵝ": "β",
  "ᵞ": "γ",
  "ᵟ": "δ",
  "ᵠ": "ϕ",
  "ᵡ": "χ",
  "ᶿ": "θ"
}), W0 = {
  "́": {
    text: "\\'",
    math: "\\acute"
  },
  "̀": {
    text: "\\`",
    math: "\\grave"
  },
  "̈": {
    text: '\\"',
    math: "\\ddot"
  },
  "̃": {
    text: "\\~",
    math: "\\tilde"
  },
  "̄": {
    text: "\\=",
    math: "\\bar"
  },
  "̆": {
    text: "\\u",
    math: "\\breve"
  },
  "̌": {
    text: "\\v",
    math: "\\check"
  },
  "̂": {
    text: "\\^",
    math: "\\hat"
  },
  "̇": {
    text: "\\.",
    math: "\\dot"
  },
  "̊": {
    text: "\\r",
    math: "\\mathring"
  },
  "̋": {
    text: "\\H"
  },
  "̧": {
    text: "\\c"
  }
}, Tn = {
  á: "á",
  à: "à",
  ä: "ä",
  ǟ: "ǟ",
  ã: "ã",
  ā: "ā",
  ă: "ă",
  ắ: "ắ",
  ằ: "ằ",
  ẵ: "ẵ",
  ǎ: "ǎ",
  â: "â",
  ấ: "ấ",
  ầ: "ầ",
  ẫ: "ẫ",
  ȧ: "ȧ",
  ǡ: "ǡ",
  å: "å",
  ǻ: "ǻ",
  ḃ: "ḃ",
  ć: "ć",
  ḉ: "ḉ",
  č: "č",
  ĉ: "ĉ",
  ċ: "ċ",
  ç: "ç",
  ď: "ď",
  ḋ: "ḋ",
  ḑ: "ḑ",
  é: "é",
  è: "è",
  ë: "ë",
  ẽ: "ẽ",
  ē: "ē",
  ḗ: "ḗ",
  ḕ: "ḕ",
  ĕ: "ĕ",
  ḝ: "ḝ",
  ě: "ě",
  ê: "ê",
  ế: "ế",
  ề: "ề",
  ễ: "ễ",
  ė: "ė",
  ȩ: "ȩ",
  ḟ: "ḟ",
  ǵ: "ǵ",
  ḡ: "ḡ",
  ğ: "ğ",
  ǧ: "ǧ",
  ĝ: "ĝ",
  ġ: "ġ",
  ģ: "ģ",
  ḧ: "ḧ",
  ȟ: "ȟ",
  ĥ: "ĥ",
  ḣ: "ḣ",
  ḩ: "ḩ",
  í: "í",
  ì: "ì",
  ï: "ï",
  ḯ: "ḯ",
  ĩ: "ĩ",
  ī: "ī",
  ĭ: "ĭ",
  ǐ: "ǐ",
  î: "î",
  ǰ: "ǰ",
  ĵ: "ĵ",
  ḱ: "ḱ",
  ǩ: "ǩ",
  ķ: "ķ",
  ĺ: "ĺ",
  ľ: "ľ",
  ļ: "ļ",
  ḿ: "ḿ",
  ṁ: "ṁ",
  ń: "ń",
  ǹ: "ǹ",
  ñ: "ñ",
  ň: "ň",
  ṅ: "ṅ",
  ņ: "ņ",
  ó: "ó",
  ò: "ò",
  ö: "ö",
  ȫ: "ȫ",
  õ: "õ",
  ṍ: "ṍ",
  ṏ: "ṏ",
  ȭ: "ȭ",
  ō: "ō",
  ṓ: "ṓ",
  ṑ: "ṑ",
  ŏ: "ŏ",
  ǒ: "ǒ",
  ô: "ô",
  ố: "ố",
  ồ: "ồ",
  ỗ: "ỗ",
  ȯ: "ȯ",
  ȱ: "ȱ",
  ő: "ő",
  ṕ: "ṕ",
  ṗ: "ṗ",
  ŕ: "ŕ",
  ř: "ř",
  ṙ: "ṙ",
  ŗ: "ŗ",
  ś: "ś",
  ṥ: "ṥ",
  š: "š",
  ṧ: "ṧ",
  ŝ: "ŝ",
  ṡ: "ṡ",
  ş: "ş",
  ẗ: "ẗ",
  ť: "ť",
  ṫ: "ṫ",
  ţ: "ţ",
  ú: "ú",
  ù: "ù",
  ü: "ü",
  ǘ: "ǘ",
  ǜ: "ǜ",
  ǖ: "ǖ",
  ǚ: "ǚ",
  ũ: "ũ",
  ṹ: "ṹ",
  ū: "ū",
  ṻ: "ṻ",
  ŭ: "ŭ",
  ǔ: "ǔ",
  û: "û",
  ů: "ů",
  ű: "ű",
  ṽ: "ṽ",
  ẃ: "ẃ",
  ẁ: "ẁ",
  ẅ: "ẅ",
  ŵ: "ŵ",
  ẇ: "ẇ",
  ẘ: "ẘ",
  ẍ: "ẍ",
  ẋ: "ẋ",
  ý: "ý",
  ỳ: "ỳ",
  ÿ: "ÿ",
  ỹ: "ỹ",
  ȳ: "ȳ",
  ŷ: "ŷ",
  ẏ: "ẏ",
  ẙ: "ẙ",
  ź: "ź",
  ž: "ž",
  ẑ: "ẑ",
  ż: "ż",
  Á: "Á",
  À: "À",
  Ä: "Ä",
  Ǟ: "Ǟ",
  Ã: "Ã",
  Ā: "Ā",
  Ă: "Ă",
  Ắ: "Ắ",
  Ằ: "Ằ",
  Ẵ: "Ẵ",
  Ǎ: "Ǎ",
  Â: "Â",
  Ấ: "Ấ",
  Ầ: "Ầ",
  Ẫ: "Ẫ",
  Ȧ: "Ȧ",
  Ǡ: "Ǡ",
  Å: "Å",
  Ǻ: "Ǻ",
  Ḃ: "Ḃ",
  Ć: "Ć",
  Ḉ: "Ḉ",
  Č: "Č",
  Ĉ: "Ĉ",
  Ċ: "Ċ",
  Ç: "Ç",
  Ď: "Ď",
  Ḋ: "Ḋ",
  Ḑ: "Ḑ",
  É: "É",
  È: "È",
  Ë: "Ë",
  Ẽ: "Ẽ",
  Ē: "Ē",
  Ḗ: "Ḗ",
  Ḕ: "Ḕ",
  Ĕ: "Ĕ",
  Ḝ: "Ḝ",
  Ě: "Ě",
  Ê: "Ê",
  Ế: "Ế",
  Ề: "Ề",
  Ễ: "Ễ",
  Ė: "Ė",
  Ȩ: "Ȩ",
  Ḟ: "Ḟ",
  Ǵ: "Ǵ",
  Ḡ: "Ḡ",
  Ğ: "Ğ",
  Ǧ: "Ǧ",
  Ĝ: "Ĝ",
  Ġ: "Ġ",
  Ģ: "Ģ",
  Ḧ: "Ḧ",
  Ȟ: "Ȟ",
  Ĥ: "Ĥ",
  Ḣ: "Ḣ",
  Ḩ: "Ḩ",
  Í: "Í",
  Ì: "Ì",
  Ï: "Ï",
  Ḯ: "Ḯ",
  Ĩ: "Ĩ",
  Ī: "Ī",
  Ĭ: "Ĭ",
  Ǐ: "Ǐ",
  Î: "Î",
  İ: "İ",
  Ĵ: "Ĵ",
  Ḱ: "Ḱ",
  Ǩ: "Ǩ",
  Ķ: "Ķ",
  Ĺ: "Ĺ",
  Ľ: "Ľ",
  Ļ: "Ļ",
  Ḿ: "Ḿ",
  Ṁ: "Ṁ",
  Ń: "Ń",
  Ǹ: "Ǹ",
  Ñ: "Ñ",
  Ň: "Ň",
  Ṅ: "Ṅ",
  Ņ: "Ņ",
  Ó: "Ó",
  Ò: "Ò",
  Ö: "Ö",
  Ȫ: "Ȫ",
  Õ: "Õ",
  Ṍ: "Ṍ",
  Ṏ: "Ṏ",
  Ȭ: "Ȭ",
  Ō: "Ō",
  Ṓ: "Ṓ",
  Ṑ: "Ṑ",
  Ŏ: "Ŏ",
  Ǒ: "Ǒ",
  Ô: "Ô",
  Ố: "Ố",
  Ồ: "Ồ",
  Ỗ: "Ỗ",
  Ȯ: "Ȯ",
  Ȱ: "Ȱ",
  Ő: "Ő",
  Ṕ: "Ṕ",
  Ṗ: "Ṗ",
  Ŕ: "Ŕ",
  Ř: "Ř",
  Ṙ: "Ṙ",
  Ŗ: "Ŗ",
  Ś: "Ś",
  Ṥ: "Ṥ",
  Š: "Š",
  Ṧ: "Ṧ",
  Ŝ: "Ŝ",
  Ṡ: "Ṡ",
  Ş: "Ş",
  Ť: "Ť",
  Ṫ: "Ṫ",
  Ţ: "Ţ",
  Ú: "Ú",
  Ù: "Ù",
  Ü: "Ü",
  Ǘ: "Ǘ",
  Ǜ: "Ǜ",
  Ǖ: "Ǖ",
  Ǚ: "Ǚ",
  Ũ: "Ũ",
  Ṹ: "Ṹ",
  Ū: "Ū",
  Ṻ: "Ṻ",
  Ŭ: "Ŭ",
  Ǔ: "Ǔ",
  Û: "Û",
  Ů: "Ů",
  Ű: "Ű",
  Ṽ: "Ṽ",
  Ẃ: "Ẃ",
  Ẁ: "Ẁ",
  Ẅ: "Ẅ",
  Ŵ: "Ŵ",
  Ẇ: "Ẇ",
  Ẍ: "Ẍ",
  Ẋ: "Ẋ",
  Ý: "Ý",
  Ỳ: "Ỳ",
  Ÿ: "Ÿ",
  Ỹ: "Ỹ",
  Ȳ: "Ȳ",
  Ŷ: "Ŷ",
  Ẏ: "Ẏ",
  Ź: "Ź",
  Ž: "Ž",
  Ẑ: "Ẑ",
  Ż: "Ż",
  ά: "ά",
  ὰ: "ὰ",
  ᾱ: "ᾱ",
  ᾰ: "ᾰ",
  έ: "έ",
  ὲ: "ὲ",
  ή: "ή",
  ὴ: "ὴ",
  ί: "ί",
  ὶ: "ὶ",
  ϊ: "ϊ",
  ΐ: "ΐ",
  ῒ: "ῒ",
  ῑ: "ῑ",
  ῐ: "ῐ",
  ό: "ό",
  ὸ: "ὸ",
  ύ: "ύ",
  ὺ: "ὺ",
  ϋ: "ϋ",
  ΰ: "ΰ",
  ῢ: "ῢ",
  ῡ: "ῡ",
  ῠ: "ῠ",
  ώ: "ώ",
  ὼ: "ὼ",
  Ύ: "Ύ",
  Ὺ: "Ὺ",
  Ϋ: "Ϋ",
  Ῡ: "Ῡ",
  Ῠ: "Ῠ",
  Ώ: "Ώ",
  Ὼ: "Ὼ"
};
class M0 {
  constructor(e, r) {
    this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new ao(e, r, this.mode), this.settings = r, this.leftrightDepth = 0;
  }
  /**
   * Checks a result to make sure it has the right type, and throws an
   * appropriate error otherwise.
   */
  expect(e, r) {
    if (r === void 0 && (r = !0), this.fetch().text !== e)
      throw new R("Expected '" + e + "', got '" + this.fetch().text + "'", this.fetch());
    r && this.consume();
  }
  /**
   * Discards the current lookahead token, considering it consumed.
   */
  consume() {
    this.nextToken = null;
  }
  /**
   * Return the current lookahead token, or if there isn't one (at the
   * beginning, or if the previous lookahead token was consume()d),
   * fetch the next token as the new lookahead token and return it.
   */
  fetch() {
    return this.nextToken == null && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(e) {
    this.mode = e, this.gullet.switchMode(e);
  }
  /**
   * Main parsing function, which parses an entire input.
   */
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var e = this.parseExpression(!1);
      return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), e;
    } finally {
      this.gullet.endGroups();
    }
  }
  /**
   * Fully parse a separate sequence of tokens as a separate job.
   * Tokens should be specified in reverse order, as in a MacroDefinition.
   */
  subparse(e) {
    var r = this.nextToken;
    this.consume(), this.gullet.pushToken(new Ve("}")), this.gullet.pushTokens(e);
    var n = this.parseExpression(!1);
    return this.expect("}"), this.nextToken = r, n;
  }
  /**
   * Parses an "expression", which is a list of atoms.
   *
   * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
   *                 happens when functions have higher precedence han infix
   *                 nodes in implicit parses.
   *
   * `breakOnTokenText`: The text of the token that the expression should end
   *                     with, or `null` if something else should end the
   *                     expression.
   */
  parseExpression(e, r) {
    for (var n = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var a = this.fetch();
      if (M0.endOfExpression.indexOf(a.text) !== -1 || r && a.text === r || e && vt[a.text] && vt[a.text].infix)
        break;
      var i = this.parseAtom(r);
      if (i) {
        if (i.type === "internal")
          continue;
      } else break;
      n.push(i);
    }
    return this.mode === "text" && this.formLigatures(n), this.handleInfixNodes(n);
  }
  /**
   * Rewrites infix operators such as \over with corresponding commands such
   * as \frac.
   *
   * There can only be one infix operator per group.  If there's more than one
   * then the expression is ambiguous.  This can be resolved by adding {}.
   */
  handleInfixNodes(e) {
    for (var r = -1, n, a = 0; a < e.length; a++)
      if (e[a].type === "infix") {
        if (r !== -1)
          throw new R("only one infix operator per group", e[a].token);
        r = a, n = e[a].replaceWith;
      }
    if (r !== -1 && n) {
      var i, l, s = e.slice(0, r), o = e.slice(r + 1);
      s.length === 1 && s[0].type === "ordgroup" ? i = s[0] : i = {
        type: "ordgroup",
        mode: this.mode,
        body: s
      }, o.length === 1 && o[0].type === "ordgroup" ? l = o[0] : l = {
        type: "ordgroup",
        mode: this.mode,
        body: o
      };
      var m;
      return n === "\\\\abovefrac" ? m = this.callFunction(n, [i, e[r], l], []) : m = this.callFunction(n, [i, l], []), [m];
    } else
      return e;
  }
  /**
   * Handle a subscript or superscript with nice errors.
   */
  handleSupSubscript(e) {
    var r = this.fetch(), n = r.text;
    this.consume(), this.consumeSpaces();
    var a;
    do {
      var i;
      a = this.parseGroup(e);
    } while (((i = a) == null ? void 0 : i.type) === "internal");
    if (!a)
      throw new R("Expected group after '" + n + "'", r);
    return a;
  }
  /**
   * Converts the textual input of an unsupported command into a text node
   * contained within a color node whose color is determined by errorColor
   */
  formatUnsupportedCmd(e) {
    for (var r = [], n = 0; n < e.length; n++)
      r.push({
        type: "textord",
        mode: "text",
        text: e[n]
      });
    var a = {
      type: "text",
      mode: this.mode,
      body: r
    }, i = {
      type: "color",
      mode: this.mode,
      color: this.settings.errorColor,
      body: [a]
    };
    return i;
  }
  /**
   * Parses a group with optional super/subscripts.
   */
  parseAtom(e) {
    var r = this.parseGroup("atom", e);
    if (r?.type === "internal" || this.mode === "text")
      return r;
    for (var n, a; ; ) {
      this.consumeSpaces();
      var i = this.fetch();
      if (i.text === "\\limits" || i.text === "\\nolimits") {
        if (r && r.type === "op") {
          var l = i.text === "\\limits";
          r.limits = l, r.alwaysHandleSupSub = !0;
        } else if (r && r.type === "operatorname")
          r.alwaysHandleSupSub && (r.limits = i.text === "\\limits");
        else
          throw new R("Limit controls must follow a math operator", i);
        this.consume();
      } else if (i.text === "^") {
        if (n)
          throw new R("Double superscript", i);
        n = this.handleSupSubscript("superscript");
      } else if (i.text === "_") {
        if (a)
          throw new R("Double subscript", i);
        a = this.handleSupSubscript("subscript");
      } else if (i.text === "'") {
        if (n)
          throw new R("Double superscript", i);
        var s = {
          type: "textord",
          mode: this.mode,
          text: "\\prime"
        }, o = [s];
        for (this.consume(); this.fetch().text === "'"; )
          o.push(s), this.consume();
        this.fetch().text === "^" && o.push(this.handleSupSubscript("superscript")), n = {
          type: "ordgroup",
          mode: this.mode,
          body: o
        };
      } else if (u0[i.text]) {
        var m = Mn.test(i.text), d = [];
        for (d.push(new Ve(u0[i.text])), this.consume(); ; ) {
          var c = this.fetch().text;
          if (!u0[c] || Mn.test(c) !== m)
            break;
          d.unshift(new Ve(u0[c])), this.consume();
        }
        var v = this.subparse(d);
        m ? a = {
          type: "ordgroup",
          mode: "math",
          body: v
        } : n = {
          type: "ordgroup",
          mode: "math",
          body: v
        };
      } else
        break;
    }
    return n || a ? {
      type: "supsub",
      mode: this.mode,
      base: r,
      sup: n,
      sub: a
    } : r;
  }
  /**
   * Parses an entire function, including its base and all of its arguments.
   */
  parseFunction(e, r) {
    var n = this.fetch(), a = n.text, i = vt[a];
    if (!i)
      return null;
    if (this.consume(), r && r !== "atom" && !i.allowedInArgument)
      throw new R("Got function '" + a + "' with no arguments" + (r ? " as " + r : ""), n);
    if (this.mode === "text" && !i.allowedInText)
      throw new R("Can't use function '" + a + "' in text mode", n);
    if (this.mode === "math" && i.allowedInMath === !1)
      throw new R("Can't use function '" + a + "' in math mode", n);
    var {
      args: l,
      optArgs: s
    } = this.parseArguments(a, i);
    return this.callFunction(a, l, s, n, e);
  }
  /**
   * Call a function handler with a suitable context and arguments.
   */
  callFunction(e, r, n, a, i) {
    var l = {
      funcName: e,
      parser: this,
      token: a,
      breakOnTokenText: i
    }, s = vt[e];
    if (s && s.handler)
      return s.handler(l, r, n);
    throw new R("No function handler for " + e);
  }
  /**
   * Parses the arguments of a function or environment
   */
  parseArguments(e, r) {
    var n = r.numArgs + r.numOptionalArgs;
    if (n === 0)
      return {
        args: [],
        optArgs: []
      };
    for (var a = [], i = [], l = 0; l < n; l++) {
      var s = r.argTypes && r.argTypes[l], o = l < r.numOptionalArgs;
      (r.primitive && s == null || // \sqrt expands into primitive if optional argument doesn't exist
      r.type === "sqrt" && l === 1 && i[0] == null) && (s = "primitive");
      var m = this.parseGroupOfType("argument to '" + e + "'", s, o);
      if (o)
        i.push(m);
      else if (m != null)
        a.push(m);
      else
        throw new R("Null argument, please report this as a bug");
    }
    return {
      args: a,
      optArgs: i
    };
  }
  /**
   * Parses a group when the mode is changing.
   */
  parseGroupOfType(e, r, n) {
    switch (r) {
      case "color":
        return this.parseColorGroup(n);
      case "size":
        return this.parseSizeGroup(n);
      case "url":
        return this.parseUrlGroup(n);
      case "math":
      case "text":
        return this.parseArgumentGroup(n, r);
      case "hbox": {
        var a = this.parseArgumentGroup(n, "text");
        return a != null ? {
          type: "styling",
          mode: a.mode,
          body: [a],
          style: "text"
          // simulate \textstyle
        } : null;
      }
      case "raw": {
        var i = this.parseStringGroup("raw", n);
        return i != null ? {
          type: "raw",
          mode: "text",
          string: i.text
        } : null;
      }
      case "primitive": {
        if (n)
          throw new R("A primitive argument cannot be optional");
        var l = this.parseGroup(e);
        if (l == null)
          throw new R("Expected group as " + e, this.fetch());
        return l;
      }
      case "original":
      case null:
      case void 0:
        return this.parseArgumentGroup(n);
      default:
        throw new R("Unknown group type as " + e, this.fetch());
    }
  }
  /**
   * Discard any space tokens, fetching the next non-space token.
   */
  consumeSpaces() {
    for (; this.fetch().text === " "; )
      this.consume();
  }
  /**
   * Parses a group, essentially returning the string formed by the
   * brace-enclosed tokens plus some position information.
   */
  parseStringGroup(e, r) {
    var n = this.gullet.scanArgument(r);
    if (n == null)
      return null;
    for (var a = "", i; (i = this.fetch()).text !== "EOF"; )
      a += i.text, this.consume();
    return this.consume(), n.text = a, n;
  }
  /**
   * Parses a regex-delimited group: the largest sequence of tokens
   * whose concatenated strings match `regex`. Returns the string
   * formed by the tokens plus some position information.
   */
  parseRegexGroup(e, r) {
    for (var n = this.fetch(), a = n, i = "", l; (l = this.fetch()).text !== "EOF" && e.test(i + l.text); )
      a = l, i += a.text, this.consume();
    if (i === "")
      throw new R("Invalid " + r + ": '" + n.text + "'", n);
    return n.range(a, i);
  }
  /**
   * Parses a color description.
   */
  parseColorGroup(e) {
    var r = this.parseStringGroup("color", e);
    if (r == null)
      return null;
    var n = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(r.text);
    if (!n)
      throw new R("Invalid color: '" + r.text + "'", r);
    var a = n[0];
    return /^[0-9a-f]{6}$/i.test(a) && (a = "#" + a), {
      type: "color-token",
      mode: this.mode,
      color: a
    };
  }
  /**
   * Parses a size specification, consisting of magnitude and unit.
   */
  parseSizeGroup(e) {
    var r, n = !1;
    if (this.gullet.consumeSpaces(), !e && this.gullet.future().text !== "{" ? r = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : r = this.parseStringGroup("size", e), !r)
      return null;
    !e && r.text.length === 0 && (r.text = "0pt", n = !0);
    var a = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(r.text);
    if (!a)
      throw new R("Invalid size: '" + r.text + "'", r);
    var i = {
      number: +(a[1] + a[2]),
      // sign + magnitude, cast to number
      unit: a[3]
    };
    if (!ea(i))
      throw new R("Invalid unit: '" + i.unit + "'", r);
    return {
      type: "size",
      mode: this.mode,
      value: i,
      isBlank: n
    };
  }
  /**
   * Parses an URL, checking escaped letters and allowed protocols,
   * and setting the catcode of % as an active character (as in \hyperref).
   */
  parseUrlGroup(e) {
    this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
    var r = this.parseStringGroup("url", e);
    if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), r == null)
      return null;
    var n = r.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return {
      type: "url",
      mode: this.mode,
      url: n
    };
  }
  /**
   * Parses an argument with the mode specified.
   */
  parseArgumentGroup(e, r) {
    var n = this.gullet.scanArgument(e);
    if (n == null)
      return null;
    var a = this.mode;
    r && this.switchMode(r), this.gullet.beginGroup();
    var i = this.parseExpression(!1, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var l = {
      type: "ordgroup",
      mode: this.mode,
      loc: n.loc,
      body: i
    };
    return r && this.switchMode(a), l;
  }
  /**
   * Parses an ordinary group, which is either a single nucleus (like "x")
   * or an expression in braces (like "{x+y}") or an implicit group, a group
   * that starts at the current position, and ends right before a higher explicit
   * group ends, or at EOF.
   */
  parseGroup(e, r) {
    var n = this.fetch(), a = n.text, i;
    if (a === "{" || a === "\\begingroup") {
      this.consume();
      var l = a === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var s = this.parseExpression(!1, l), o = this.fetch();
      this.expect(l), this.gullet.endGroup(), i = {
        type: "ordgroup",
        mode: this.mode,
        loc: Oe.range(n, o),
        body: s,
        // A group formed by \begingroup...\endgroup is a semi-simple group
        // which doesn't affect spacing in math mode, i.e., is transparent.
        // https://tex.stackexchange.com/questions/1930/when-should-one-
        // use-begingroup-instead-of-bgroup
        semisimple: a === "\\begingroup" || void 0
      };
    } else if (i = this.parseFunction(r, e) || this.parseSymbol(), i == null && a[0] === "\\" && !Ga.hasOwnProperty(a)) {
      if (this.settings.throwOnError)
        throw new R("Undefined control sequence: " + a, n);
      i = this.formatUnsupportedCmd(a), this.consume();
    }
    return i;
  }
  /**
   * Form ligature-like combinations of characters for text mode.
   * This includes inputs like "--", "---", "``" and "''".
   * The result will simply replace multiple textord nodes with a single
   * character in each value by a single textord node having multiple
   * characters in its value.  The representation is still ASCII source.
   * The group will be modified in place.
   */
  formLigatures(e) {
    for (var r = e.length - 1, n = 0; n < r; ++n) {
      var a = e[n], i = a.text;
      i === "-" && e[n + 1].text === "-" && (n + 1 < r && e[n + 2].text === "-" ? (e.splice(n, 3, {
        type: "textord",
        mode: "text",
        loc: Oe.range(a, e[n + 2]),
        text: "---"
      }), r -= 2) : (e.splice(n, 2, {
        type: "textord",
        mode: "text",
        loc: Oe.range(a, e[n + 1]),
        text: "--"
      }), r -= 1)), (i === "'" || i === "`") && e[n + 1].text === i && (e.splice(n, 2, {
        type: "textord",
        mode: "text",
        loc: Oe.range(a, e[n + 1]),
        text: i + i
      }), r -= 1);
    }
  }
  /**
   * Parse a single symbol out of the string. Here, we handle single character
   * symbols and special functions like \verb.
   */
  parseSymbol() {
    var e = this.fetch(), r = e.text;
    if (/^\\verb[^a-zA-Z]/.test(r)) {
      this.consume();
      var n = r.slice(5), a = n.charAt(0) === "*";
      if (a && (n = n.slice(1)), n.length < 2 || n.charAt(0) !== n.slice(-1))
        throw new R(`\\verb assertion failed --
                    please report what input caused this bug`);
      return n = n.slice(1, -1), {
        type: "verb",
        mode: "text",
        body: n,
        star: a
      };
    }
    Tn.hasOwnProperty(r[0]) && !me[this.mode][r[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + r[0] + '" used in math mode', e), r = Tn[r[0]] + r.slice(1));
    var i = eo.exec(r);
    i && (r = r.substring(0, i.index), r === "i" ? r = "ı" : r === "j" && (r = "ȷ"));
    var l;
    if (me[this.mode][r]) {
      this.settings.strict && this.mode === "math" && er.indexOf(r) >= 0 && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + r[0] + '" used in math mode', e);
      var s = me[this.mode][r].group, o = Oe.range(e), m;
      if (Ws.hasOwnProperty(s)) {
        var d = s;
        m = {
          type: "atom",
          mode: this.mode,
          family: d,
          loc: o,
          text: r
        };
      } else
        m = {
          type: s,
          mode: this.mode,
          loc: o,
          text: r
        };
      l = m;
    } else if (r.charCodeAt(0) >= 128)
      this.settings.strict && (Jn(r.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + r[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + r[0] + '"' + (" (" + r.charCodeAt(0) + ")"), e)), l = {
        type: "textord",
        mode: "text",
        loc: Oe.range(e),
        text: r
      };
    else
      return null;
    if (this.consume(), i)
      for (var c = 0; c < i[0].length; c++) {
        var v = i[0][c];
        if (!W0[v])
          throw new R("Unknown accent ' " + v + "'", e);
        var p = W0[v][this.mode] || W0[v].text;
        if (!p)
          throw new R("Accent " + v + " unsupported in " + this.mode + " mode", e);
        l = {
          type: "accent",
          mode: this.mode,
          loc: Oe.range(e),
          label: p,
          isStretchy: !1,
          isShifty: !0,
          // $FlowFixMe
          base: l
        };
      }
    return l;
  }
}
M0.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
var io = function(e, r) {
  if (!(typeof e == "string" || e instanceof String))
    throw new TypeError("KaTeX can only parse string typed expression");
  var n = new M0(e, r);
  delete n.gullet.macros.current["\\df@tag"];
  var a = n.parse();
  if (delete n.gullet.macros.current["\\current@color"], delete n.gullet.macros.current["\\color"], n.gullet.macros.get("\\df@tag")) {
    if (!r.displayMode)
      throw new R("\\tag works only in display equations");
    a = [{
      type: "tag",
      mode: "text",
      body: a,
      tag: n.subparse([new Ve("\\df@tag")])
    }];
  }
  return a;
};
typeof document < "u" && document.compatMode !== "CSS1Compat" && typeof console < "u" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
var lo = function(e, r) {
  var n = uo(e, r).toMarkup();
  return n;
}, so = function(e, r, n) {
  if (n.throwOnError || !(e instanceof R))
    throw e;
  var a = D.makeSpan(["katex-error"], [new Ye(r)]);
  return a.setAttribute("title", e.toString()), a.setAttribute("style", "color:" + n.errorColor), a;
}, uo = function(e, r) {
  var n = new ys(r);
  try {
    var a = io(e, n);
    return gu(a, e, n);
  } catch (i) {
    return so(i, e, n);
  }
}, oo = {
  /**
   * Renders the given LaTeX into an HTML+MathML combination string,
   * for sending to the client.
   */
  renderToString: lo
};
const ho = oo.renderToString;
function mo(t) {
  return {
    enter: {
      mathFlow() {
        this.lineEndingIfNeeded(), this.tag('<div class="math math-display">');
      },
      mathFlowFenceMeta() {
        this.buffer();
      },
      mathText() {
        this.tag('<span class="math math-inline">'), this.buffer();
      }
    },
    exit: {
      mathFlow() {
        const r = this.resume();
        this.tag(e(r.replace(/(?:\r?\n|\r)$/, ""), !0)), this.tag("</div>"), this.setData("mathFlowOpen"), this.setData("slurpOneLineEnding");
      },
      mathFlowFence() {
        this.getData("mathFlowOpen") || (this.setData("mathFlowOpen", !0), this.setData("slurpOneLineEnding", !0), this.buffer());
      },
      mathFlowFenceMeta() {
        this.resume();
      },
      mathFlowValue(r) {
        this.raw(this.sliceSerialize(r));
      },
      mathText() {
        const r = this.resume();
        this.tag(e(r, !1)), this.tag("</span>");
      },
      mathTextData(r) {
        this.raw(this.sliceSerialize(r));
      }
    }
  };
  function e(r, n) {
    return ho(r, {
      ...t,
      displayMode: n
    });
  }
}
var Cn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function co(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var j0 = { exports: {} }, Fn;
function fo() {
  return Fn || (Fn = 1, (function(t) {
    var e = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    var r = (function(n) {
      var a = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, i = 0, l = {}, s = {
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
        manual: n.Prism && n.Prism.manual,
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
        disableWorkerMessageHandler: n.Prism && n.Prism.disableWorkerMessageHandler,
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
          encode: function b(k) {
            return k instanceof o ? new o(k.type, b(k.content), k.alias) : Array.isArray(k) ? k.map(b) : k.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
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
          type: function(b) {
            return Object.prototype.toString.call(b).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(b) {
            return b.__id || Object.defineProperty(b, "__id", { value: ++i }), b.__id;
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
          clone: function b(k, I) {
            I = I || {};
            var F, z;
            switch (s.util.type(k)) {
              case "Object":
                if (z = s.util.objId(k), I[z])
                  return I[z];
                F = /** @type {Record<string, any>} */
                {}, I[z] = F;
                for (var N in k)
                  k.hasOwnProperty(N) && (F[N] = b(k[N], I));
                return (
                  /** @type {any} */
                  F
                );
              case "Array":
                return z = s.util.objId(k), I[z] ? I[z] : (F = [], I[z] = F, /** @type {Array} */
                /** @type {any} */
                k.forEach(function(H, q) {
                  F[q] = b(H, I);
                }), /** @type {any} */
                F);
              default:
                return k;
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
          getLanguage: function(b) {
            for (; b; ) {
              var k = a.exec(b.className);
              if (k)
                return k[1].toLowerCase();
              b = b.parentElement;
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
          setLanguage: function(b, k) {
            b.className = b.className.replace(RegExp(a, "gi"), ""), b.classList.add("language-" + k);
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
            } catch (F) {
              var b = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(F.stack) || [])[1];
              if (b) {
                var k = document.getElementsByTagName("script");
                for (var I in k)
                  if (k[I].src == b)
                    return k[I];
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
          isActive: function(b, k, I) {
            for (var F = "no-" + k; b; ) {
              var z = b.classList;
              if (z.contains(k))
                return !0;
              if (z.contains(F))
                return !1;
              b = b.parentElement;
            }
            return !!I;
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
          plain: l,
          plaintext: l,
          text: l,
          txt: l,
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
          extend: function(b, k) {
            var I = s.util.clone(s.languages[b]);
            for (var F in k)
              I[F] = k[F];
            return I;
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
          insertBefore: function(b, k, I, F) {
            F = F || /** @type {any} */
            s.languages;
            var z = F[b], N = {};
            for (var H in z)
              if (z.hasOwnProperty(H)) {
                if (H == k)
                  for (var q in I)
                    I.hasOwnProperty(q) && (N[q] = I[q]);
                I.hasOwnProperty(H) || (N[H] = z[H]);
              }
            var E = F[b];
            return F[b] = N, s.languages.DFS(s.languages, function(P, $) {
              $ === E && P != b && (this[P] = N);
            }), N;
          },
          // Traverse a language definition with Depth First Search
          DFS: function b(k, I, F, z) {
            z = z || {};
            var N = s.util.objId;
            for (var H in k)
              if (k.hasOwnProperty(H)) {
                I.call(k, H, k[H], F || H);
                var q = k[H], E = s.util.type(q);
                E === "Object" && !z[N(q)] ? (z[N(q)] = !0, b(q, I, null, z)) : E === "Array" && !z[N(q)] && (z[N(q)] = !0, b(q, I, H, z));
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
        highlightAll: function(b, k) {
          s.highlightAllUnder(document, b, k);
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
        highlightAllUnder: function(b, k, I) {
          var F = {
            callback: I,
            container: b,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          s.hooks.run("before-highlightall", F), F.elements = Array.prototype.slice.apply(F.container.querySelectorAll(F.selector)), s.hooks.run("before-all-elements-highlight", F);
          for (var z = 0, N; N = F.elements[z++]; )
            s.highlightElement(N, k === !0, F.callback);
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
        highlightElement: function(b, k, I) {
          var F = s.util.getLanguage(b), z = s.languages[F];
          s.util.setLanguage(b, F);
          var N = b.parentElement;
          N && N.nodeName.toLowerCase() === "pre" && s.util.setLanguage(N, F);
          var H = b.textContent, q = {
            element: b,
            language: F,
            grammar: z,
            code: H
          };
          function E($) {
            q.highlightedCode = $, s.hooks.run("before-insert", q), q.element.innerHTML = q.highlightedCode, s.hooks.run("after-highlight", q), s.hooks.run("complete", q), I && I.call(q.element);
          }
          if (s.hooks.run("before-sanity-check", q), N = q.element.parentElement, N && N.nodeName.toLowerCase() === "pre" && !N.hasAttribute("tabindex") && N.setAttribute("tabindex", "0"), !q.code) {
            s.hooks.run("complete", q), I && I.call(q.element);
            return;
          }
          if (s.hooks.run("before-highlight", q), !q.grammar) {
            E(s.util.encode(q.code));
            return;
          }
          if (k && n.Worker) {
            var P = new Worker(s.filename);
            P.onmessage = function($) {
              E($.data);
            }, P.postMessage(JSON.stringify({
              language: q.language,
              code: q.code,
              immediateClose: !0
            }));
          } else
            E(s.highlight(q.code, q.grammar, q.language));
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
        highlight: function(b, k, I) {
          var F = {
            code: b,
            grammar: k,
            language: I
          };
          if (s.hooks.run("before-tokenize", F), !F.grammar)
            throw new Error('The language "' + F.language + '" has no grammar.');
          return F.tokens = s.tokenize(F.code, F.grammar), s.hooks.run("after-tokenize", F), o.stringify(s.util.encode(F.tokens), F.language);
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
        tokenize: function(b, k) {
          var I = k.rest;
          if (I) {
            for (var F in I)
              k[F] = I[F];
            delete k.rest;
          }
          var z = new c();
          return v(z, z.head, b), d(b, z, k, z.head, 0), w(z);
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
          add: function(b, k) {
            var I = s.hooks.all;
            I[b] = I[b] || [], I[b].push(k);
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
          run: function(b, k) {
            var I = s.hooks.all[b];
            if (!(!I || !I.length))
              for (var F = 0, z; z = I[F++]; )
                z(k);
          }
        },
        Token: o
      };
      n.Prism = s;
      function o(b, k, I, F) {
        this.type = b, this.content = k, this.alias = I, this.length = (F || "").length | 0;
      }
      o.stringify = function b(k, I) {
        if (typeof k == "string")
          return k;
        if (Array.isArray(k)) {
          var F = "";
          return k.forEach(function(E) {
            F += b(E, I);
          }), F;
        }
        var z = {
          type: k.type,
          content: b(k.content, I),
          tag: "span",
          classes: ["token", k.type],
          attributes: {},
          language: I
        }, N = k.alias;
        N && (Array.isArray(N) ? Array.prototype.push.apply(z.classes, N) : z.classes.push(N)), s.hooks.run("wrap", z);
        var H = "";
        for (var q in z.attributes)
          H += " " + q + '="' + (z.attributes[q] || "").replace(/"/g, "&quot;") + '"';
        return "<" + z.tag + ' class="' + z.classes.join(" ") + '"' + H + ">" + z.content + "</" + z.tag + ">";
      };
      function m(b, k, I, F) {
        b.lastIndex = k;
        var z = b.exec(I);
        if (z && F && z[1]) {
          var N = z[1].length;
          z.index += N, z[0] = z[0].slice(N);
        }
        return z;
      }
      function d(b, k, I, F, z, N) {
        for (var H in I)
          if (!(!I.hasOwnProperty(H) || !I[H])) {
            var q = I[H];
            q = Array.isArray(q) ? q : [q];
            for (var E = 0; E < q.length; ++E) {
              if (N && N.cause == H + "," + E)
                return;
              var P = q[E], $ = P.inside, ee = !!P.lookbehind, K = !!P.greedy, _ = P.alias;
              if (K && !P.pattern.global) {
                var se = P.pattern.toString().match(/[imsuy]*$/)[0];
                P.pattern = RegExp(P.pattern.source, se + "g");
              }
              for (var ue = P.pattern || P, ne = F.next, de = z; ne !== k.tail && !(N && de >= N.reach); de += ne.value.length, ne = ne.next) {
                var S = ne.value;
                if (k.length > b.length)
                  return;
                if (!(S instanceof o)) {
                  var ce = 1, ae;
                  if (K) {
                    if (ae = m(ue, de, b, ee), !ae || ae.index >= b.length)
                      break;
                    var fe = ae.index, A = ae.index + ae[0].length, pe = de;
                    for (pe += ne.value.length; fe >= pe; )
                      ne = ne.next, pe += ne.value.length;
                    if (pe -= ne.value.length, de = pe, ne.value instanceof o)
                      continue;
                    for (var ke = ne; ke !== k.tail && (pe < A || typeof ke.value == "string"); ke = ke.next)
                      ce++, pe += ke.value.length;
                    ce--, S = b.slice(de, pe), ae.index -= de;
                  } else if (ae = m(ue, 0, S, ee), !ae)
                    continue;
                  var fe = ae.index, Ae = ae[0], Se = S.slice(0, fe), Ne = S.slice(fe + Ae.length), Fe = de + S.length;
                  N && Fe > N.reach && (N.reach = Fe);
                  var Xe = ne.prev;
                  Se && (Xe = v(k, Xe, Se), de += Se.length), p(k, Xe, ce);
                  var Rt = new o(H, $ ? s.tokenize(Ae, $) : Ae, _, Ae);
                  if (ne = v(k, Xe, Rt), Ne && v(k, ne, Ne), ce > 1) {
                    var dt = {
                      cause: H + "," + E,
                      reach: Fe
                    };
                    d(b, k, I, ne.prev, de, dt), N && dt.reach > N.reach && (N.reach = dt.reach);
                  }
                }
              }
            }
          }
      }
      function c() {
        var b = { value: null, prev: null, next: null }, k = { value: null, prev: b, next: null };
        b.next = k, this.head = b, this.tail = k, this.length = 0;
      }
      function v(b, k, I) {
        var F = k.next, z = { value: I, prev: k, next: F };
        return k.next = z, F.prev = z, b.length++, z;
      }
      function p(b, k, I) {
        for (var F = k.next, z = 0; z < I && F !== b.tail; z++)
          F = F.next;
        k.next = F, F.prev = k, b.length -= z;
      }
      function w(b) {
        for (var k = [], I = b.head.next; I !== b.tail; )
          k.push(I.value), I = I.next;
        return k;
      }
      if (!n.document)
        return n.addEventListener && (s.disableWorkerMessageHandler || n.addEventListener("message", function(b) {
          var k = JSON.parse(b.data), I = k.language, F = k.code, z = k.immediateClose;
          n.postMessage(s.highlight(F, s.languages[I], I)), z && n.close();
        }, !1)), s;
      var T = s.util.currentScript();
      T && (s.filename = T.src, T.hasAttribute("data-manual") && (s.manual = !0));
      function B() {
        s.manual || s.highlightAll();
      }
      if (!s.manual) {
        var C = document.readyState;
        C === "loading" || C === "interactive" && T && T.defer ? document.addEventListener("DOMContentLoaded", B) : window.requestAnimationFrame ? window.requestAnimationFrame(B) : window.setTimeout(B, 16);
      }
      return s;
    })(e);
    t.exports && (t.exports = r), typeof Cn < "u" && (Cn.Prism = r), r.languages.markup = {
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
    }, r.languages.markup.tag.inside["attr-value"].inside.entity = r.languages.markup.entity, r.languages.markup.doctype.inside["internal-subset"].inside = r.languages.markup, r.hooks.add("wrap", function(n) {
      n.type === "entity" && (n.attributes.title = n.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(r.languages.markup.tag, "addInlined", {
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
      value: function(a, i) {
        var l = {};
        l["language-" + i] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: r.languages[i]
        }, l.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var s = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: l
          }
        };
        s["language-" + i] = {
          pattern: /[\s\S]+/,
          inside: r.languages[i]
        };
        var o = {};
        o[a] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return a;
          }), "i"),
          lookbehind: !0,
          greedy: !0,
          inside: s
        }, r.languages.insertBefore("markup", "cdata", o);
      }
    }), Object.defineProperty(r.languages.markup.tag, "addAttribute", {
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
      value: function(n, a) {
        r.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + n + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
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
                  inside: r.languages[a]
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
    }), r.languages.html = r.languages.markup, r.languages.mathml = r.languages.markup, r.languages.svg = r.languages.markup, r.languages.xml = r.languages.extend("markup", {}), r.languages.ssml = r.languages.xml, r.languages.atom = r.languages.xml, r.languages.rss = r.languages.xml, (function(n) {
      var a = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      n.languages.css = {
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
      }, n.languages.css.atrule.inside.rest = n.languages.css;
      var i = n.languages.markup;
      i && (i.tag.addInlined("style", "css"), i.tag.addAttribute("style", "css"));
    })(r), r.languages.clike = {
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
    }, r.languages.javascript = r.languages.extend("clike", {
      "class-name": [
        r.languages.clike["class-name"],
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
    }), r.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, r.languages.insertBefore("javascript", "keyword", {
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
            inside: r.languages.regex
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
          inside: r.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: r.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: r.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: r.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), r.languages.insertBefore("javascript", "string", {
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
              rest: r.languages.javascript
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
    }), r.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
      }
    }), r.languages.markup && (r.languages.markup.tag.addInlined("script", "javascript"), r.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    )), r.languages.js = r.languages.javascript, (function() {
      if (typeof r > "u" || typeof document > "u")
        return;
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
      var n = "Loading…", a = function(T, B) {
        return "✖ Error " + T + " while fetching file: " + B;
      }, i = "✖ Error: File does not exist or is empty", l = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, s = "data-src-status", o = "loading", m = "loaded", d = "failed", c = "pre[data-src]:not([" + s + '="' + m + '"]):not([' + s + '="' + o + '"])';
      function v(T, B, C) {
        var b = new XMLHttpRequest();
        b.open("GET", T, !0), b.onreadystatechange = function() {
          b.readyState == 4 && (b.status < 400 && b.responseText ? B(b.responseText) : b.status >= 400 ? C(a(b.status, b.statusText)) : C(i));
        }, b.send(null);
      }
      function p(T) {
        var B = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(T || "");
        if (B) {
          var C = Number(B[1]), b = B[2], k = B[3];
          return b ? k ? [C, Number(k)] : [C, void 0] : [C, C];
        }
      }
      r.hooks.add("before-highlightall", function(T) {
        T.selector += ", " + c;
      }), r.hooks.add("before-sanity-check", function(T) {
        var B = (
          /** @type {HTMLPreElement} */
          T.element
        );
        if (B.matches(c)) {
          T.code = "", B.setAttribute(s, o);
          var C = B.appendChild(document.createElement("CODE"));
          C.textContent = n;
          var b = B.getAttribute("data-src"), k = T.language;
          if (k === "none") {
            var I = (/\.(\w+)$/.exec(b) || [, "none"])[1];
            k = l[I] || I;
          }
          r.util.setLanguage(C, k), r.util.setLanguage(B, k);
          var F = r.plugins.autoloader;
          F && F.loadLanguages(k), v(
            b,
            function(z) {
              B.setAttribute(s, m);
              var N = p(B.getAttribute("data-range"));
              if (N) {
                var H = z.split(/\r\n?|\n/g), q = N[0], E = N[1] == null ? H.length : N[1];
                q < 0 && (q += H.length), q = Math.max(0, Math.min(q - 1, H.length)), E < 0 && (E += H.length), E = Math.max(0, Math.min(E, H.length)), z = H.slice(q, E).join(`
`), B.hasAttribute("data-start") || B.setAttribute("data-start", String(q + 1));
              }
              C.textContent = z, r.highlightElement(C);
            },
            function(z) {
              B.setAttribute(s, d), C.textContent = z;
            }
          );
        }
      }), r.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function(B) {
          for (var C = (B || document).querySelectorAll(c), b = 0, k; k = C[b++]; )
            r.highlightElement(k);
        }
      };
      var w = !1;
      r.fileHighlight = function() {
        w || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), w = !0), r.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  })(j0)), j0.exports;
}
var po = fo();
const Y0 = /* @__PURE__ */ co(po), go = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
class vo {
  options;
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      extensions: [ts(), os()],
      htmlExtensions: [rs(), mo(), this.createPresenterCodeBlockHtmlExtension()]
    };
  }
  // Operations - Render.
  render(e) {
    return o1(e, this.options);
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
        codeFencedFenceInfo(r) {
          e && (e.lang = this.sliceSerialize(r));
        },
        codeFencedFenceMeta(r) {
          e && (e.meta = this.sliceSerialize(r));
        },
        codeFlowValue(r) {
          e && e.codeContent.push(this.sliceSerialize(r));
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
          const r = e || { codeContent: [], lang: "", meta: "" };
          this.resume();
          const n = r.codeContent.join(`
`), a = r.lang || "plain", i = r.meta || "";
          let l = "";
          if (a === "json" && i === "datapos-visual")
            l = `<div class="${i}" data-options="${encodeURIComponent(n)}"></div>`;
          else if (Y0?.languages[a]) {
            const s = Y0.highlight(n, Y0.languages[a], a);
            l = `<pre class="language-${a}"><code>${s}</code></pre>`;
          } else
            l = `<pre class="language-text"><code>${n.replace(/[&<>"']/g, (o) => go[o])}</code></pre>`;
          this.raw(l), e = void 0;
        }
      }
    };
  }
}
export {
  vo as MicromarkTool
};
