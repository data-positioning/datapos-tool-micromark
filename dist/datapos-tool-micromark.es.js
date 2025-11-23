const sn = document.createElement("i");
function wn(t) {
  const e = "&" + t + ";";
  sn.innerHTML = e;
  const n = sn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && t !== "semi" || n === e ? !1 : n
  );
}
function Q(t, e, n, r) {
  const l = t.length;
  let a = 0, i;
  if (e < 0 ? e = -e > l ? 0 : l + e : e = e > l ? l : e, n = n > 0 ? n : 0, r.length < 1e4)
    i = Array.from(r), i.unshift(e, n), t.splice(...i);
  else
    for (n && t.splice(e, n); a < r.length; )
      i = r.slice(a, a + 1e4), i.unshift(e, 0), t.splice(...i), a += 1e4, e += 1e4;
}
function G(t, e) {
  return t.length > 0 ? (Q(t, t.length, 0, e), t) : e;
}
const _t = {}.hasOwnProperty;
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
    const l = (_t.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let i;
    if (a)
      for (i in a) {
        _t.call(l, i) || (l[i] = []);
        const u = a[i];
        Hr(
          // @ts-expect-error Looks like a list.
          l[i],
          Array.isArray(u) ? u : u ? [u] : []
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
    const l = (_t.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let i;
    if (a)
      for (i in a)
        l[i] = a[i];
  }
}
function $r(t, e) {
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
const qr = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function An(t) {
  return t.replace(/["&<>]/g, e);
  function e(n) {
    return "&" + qr[
      /** @type {keyof typeof characterReferences} */
      n
    ] + ";";
  }
}
function rt(t) {
  return t.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Y = mt(/[A-Za-z]/), W = mt(/[\dA-Za-z]/), Vr = mt(/[#-'*+\--9=?A-Z^-~]/);
function Dt(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < 32 || t === 127)
  );
}
const Bt = mt(/\d/), Gr = mt(/[\dA-Fa-f]/), Wr = mt(/[!-/:-@[-`{-~]/);
function A(t) {
  return t !== null && t < -2;
}
function M(t) {
  return t !== null && (t < 0 || t === 32);
}
function L(t) {
  return t === -2 || t === -1 || t === 32;
}
const $t = mt(/\p{P}|\p{S}/u), yt = mt(/\s/);
function mt(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function pt(t, e) {
  const n = An(Yr(t || ""));
  if (!e)
    return n;
  const r = n.indexOf(":"), l = n.indexOf("?"), a = n.indexOf("#"), i = n.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i > -1 && r > i || l > -1 && r > l || a > -1 && r > a || // It is a protocol, it should be allowed.
    e.test(n.slice(0, r)) ? n : ""
  );
}
function Yr(t) {
  const e = [];
  let n = -1, r = 0, l = 0;
  for (; ++n < t.length; ) {
    const a = t.charCodeAt(n);
    let i = "";
    if (a === 37 && W(t.charCodeAt(n + 1)) && W(t.charCodeAt(n + 2)))
      l = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (i = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const u = t.charCodeAt(n + 1);
      a < 56320 && u > 56319 && u < 57344 ? (i = String.fromCharCode(a, u), l = 1) : i = "�";
    } else
      i = String.fromCharCode(a);
    i && (e.push(t.slice(r, n), encodeURIComponent(i)), r = n + l + 1, i = ""), l && (n += l, l = 0);
  }
  return e.join("") + t.slice(r);
}
const hn = {}.hasOwnProperty, cn = /^(https?|ircs?|mailto|xmpp)$/i, Zr = /^https?$/i;
function Qr(t) {
  const e = t || {};
  let n = !0;
  const r = {}, l = [[]], a = [], i = [], h = (
    /** @type {NormalizedHtmlExtension} */
    Cn([{
      enter: {
        blockQuote: P,
        codeFenced: at,
        codeFencedFenceInfo: F,
        codeFencedFenceMeta: F,
        codeIndented: lt,
        codeText: Nr,
        content: yr,
        definition: pr,
        definitionDestinationString: br,
        definitionLabelString: F,
        definitionTitleString: F,
        emphasis: Lr,
        htmlFlow: Dr,
        htmlText: rn,
        image: J,
        label: F,
        link: bt,
        listItemMarker: w,
        listItemValue: d,
        listOrdered: _,
        listUnordered: H,
        paragraph: U,
        reference: F,
        resource: dt,
        resourceDestinationString: xt,
        resourceTitleString: F,
        setextHeading: Sr,
        strong: Or
      },
      exit: {
        atxHeading: wr,
        atxHeadingSequence: Er,
        autolinkEmail: _r,
        autolinkProtocol: Mr,
        blockQuote: q,
        characterEscapeValue: St,
        characterReferenceMarkerHexadecimal: an,
        characterReferenceMarkerNumeric: an,
        characterReferenceValue: vr,
        codeFenced: g,
        codeFencedFence: K,
        codeFencedFenceInfo: m,
        codeFencedFenceMeta: N,
        codeFlowValue: Fr,
        codeIndented: g,
        codeText: Rr,
        codeTextData: St,
        data: St,
        definition: kr,
        definitionDestinationString: dr,
        definitionLabelString: fr,
        definitionTitleString: xr,
        emphasis: zr,
        hardBreakEscape: nn,
        hardBreakTrailing: nn,
        htmlFlow: en,
        htmlFlowData: St,
        htmlText: en,
        htmlTextData: St,
        image: tn,
        label: Et,
        labelText: $,
        lineEnding: Ar,
        link: tn,
        listOrdered: C,
        listUnordered: v,
        paragraph: X,
        reference: N,
        referenceString: ht,
        resource: N,
        resourceDestinationString: Nt,
        resourceTitleString: gr,
        setextHeading: Cr,
        setextHeadingLineSequence: Tr,
        setextHeadingText: Ir,
        strong: Pr,
        thematicBreak: jr
      }
    }, ...e.htmlExtensions || []])
  ), s = {
    definitions: r,
    tightStack: i
  }, p = {
    buffer: F,
    encode: x,
    getData: I,
    lineEndingIfNeeded: D,
    options: e,
    raw: E,
    resume: k,
    setData: b,
    tag: S
  };
  let o = e.defaultLineEnding;
  return f;
  function f(y) {
    let T = -1, V = 0;
    const tt = [];
    let nt = [], ut = [];
    for (; ++T < y.length; )
      !o && (y[T][1].type === "lineEnding" || y[T][1].type === "lineEndingBlank") && (o = /** @type {LineEnding} */
      y[T][2].sliceSerialize(y[T][1])), (y[T][1].type === "listOrdered" || y[T][1].type === "listUnordered") && (y[T][0] === "enter" ? tt.push(T) : c(y.slice(tt.pop(), T))), y[T][1].type === "definition" && (y[T][0] === "enter" ? (ut = G(ut, y.slice(V, T)), V = T) : (nt = G(nt, y.slice(V, T + 1)), V = T + 1));
    nt = G(nt, ut), nt = G(nt, y.slice(V)), T = -1;
    const et = nt;
    for (h.enter.null && h.enter.null.call(p); ++T < y.length; ) {
      const ln = h[et[T][0]], un = et[T][1].type, on = ln[un];
      hn.call(ln, un) && on && on.call({
        sliceSerialize: et[T][2].sliceSerialize,
        ...p
      }, et[T][1]);
    }
    return h.exit.null && h.exit.null.call(p), l[0].join("");
  }
  function c(y) {
    const T = y.length;
    let V = 0, tt = 0, nt = !1, ut;
    for (; ++V < T; ) {
      const et = y[V];
      if (et[1]._container)
        ut = void 0, et[0] === "enter" ? tt++ : tt--;
      else switch (et[1].type) {
        case "listItemPrefix": {
          et[0] === "exit" && (ut = !0);
          break;
        }
        case "linePrefix":
          break;
        case "lineEndingBlank": {
          et[0] === "enter" && !tt && (ut ? ut = void 0 : nt = !0);
          break;
        }
        default:
          ut = void 0;
      }
    }
    y[0][1]._loose = nt;
  }
  function b(y, T) {
    s[y] = T;
  }
  function I(y) {
    return s[y];
  }
  function F() {
    l.push([]);
  }
  function k() {
    return l.pop().join("");
  }
  function S(y) {
    n && (b("lastWasTag", !0), l[l.length - 1].push(y));
  }
  function E(y) {
    b("lastWasTag"), l[l.length - 1].push(y);
  }
  function j() {
    E(o || `
`);
  }
  function D() {
    const y = l[l.length - 1], T = y[y.length - 1], V = T ? T.charCodeAt(T.length - 1) : null;
    V === 10 || V === 13 || V === null || j();
  }
  function x(y) {
    return I("ignoreEncode") ? y : An(y);
  }
  function N() {
    k();
  }
  function _(y) {
    i.push(!y._loose), D(), S("<ol"), b("expectFirstItem", !0);
  }
  function H(y) {
    i.push(!y._loose), D(), S("<ul"), b("expectFirstItem", !0);
  }
  function d(y) {
    if (I("expectFirstItem")) {
      const T = Number.parseInt(this.sliceSerialize(y), 10);
      T !== 1 && S(' start="' + x(String(T)) + '"');
    }
  }
  function w() {
    I("expectFirstItem") ? S(">") : B(), D(), S("<li>"), b("expectFirstItem"), b("lastWasTag");
  }
  function C() {
    B(), i.pop(), j(), S("</ol>");
  }
  function v() {
    B(), i.pop(), j(), S("</ul>");
  }
  function B() {
    I("lastWasTag") && !I("slurpAllLineEndings") && D(), S("</li>"), b("slurpAllLineEndings");
  }
  function P() {
    i.push(!1), D(), S("<blockquote>");
  }
  function q() {
    i.pop(), D(), S("</blockquote>"), b("slurpAllLineEndings");
  }
  function U() {
    i[i.length - 1] || (D(), S("<p>")), b("slurpAllLineEndings");
  }
  function X() {
    i[i.length - 1] ? b("slurpAllLineEndings", !0) : S("</p>");
  }
  function at() {
    D(), S("<pre><code"), b("fencesCount", 0);
  }
  function m() {
    const y = k();
    S(' class="language-' + y + '"');
  }
  function K() {
    const y = I("fencesCount") || 0;
    y || (S(">"), b("slurpOneLineEnding", !0)), b("fencesCount", y + 1);
  }
  function lt() {
    D(), S("<pre><code>");
  }
  function g() {
    const y = I("fencesCount");
    y !== void 0 && y < 2 && s.tightStack.length > 0 && !I("lastWasTag") && j(), I("flowCodeSeenData") && D(), S("</code></pre>"), y !== void 0 && y < 2 && D(), b("flowCodeSeenData"), b("fencesCount"), b("slurpOneLineEnding");
  }
  function J() {
    a.push({
      image: !0
    }), n = void 0;
  }
  function bt() {
    a.push({});
  }
  function $(y) {
    a[a.length - 1].labelId = this.sliceSerialize(y);
  }
  function Et() {
    a[a.length - 1].label = k();
  }
  function ht(y) {
    a[a.length - 1].referenceId = this.sliceSerialize(y);
  }
  function dt() {
    F(), a[a.length - 1].destination = "";
  }
  function xt() {
    F(), b("ignoreEncode", !0);
  }
  function Nt() {
    a[a.length - 1].destination = k(), b("ignoreEncode");
  }
  function gr() {
    a[a.length - 1].title = k();
  }
  function tn() {
    let y = a.length - 1;
    const T = a[y], V = T.referenceId || T.labelId, tt = T.destination === void 0 ? r[rt(V)] : T;
    for (n = !0; y--; )
      if (a[y].image) {
        n = void 0;
        break;
      }
    T.image ? (S('<img src="' + pt(tt.destination, e.allowDangerousProtocol ? void 0 : Zr) + '" alt="'), E(T.label), S('"')) : S('<a href="' + pt(tt.destination, e.allowDangerousProtocol ? void 0 : cn) + '"'), S(tt.title ? ' title="' + tt.title + '"' : ""), T.image ? S(" />") : (S(">"), E(T.label), S("</a>")), a.pop();
  }
  function pr() {
    F(), a.push({});
  }
  function fr(y) {
    k(), a[a.length - 1].labelId = this.sliceSerialize(y);
  }
  function br() {
    F(), b("ignoreEncode", !0);
  }
  function dr() {
    a[a.length - 1].destination = k(), b("ignoreEncode");
  }
  function xr() {
    a[a.length - 1].title = k();
  }
  function kr() {
    const y = a[a.length - 1], T = rt(y.labelId);
    k(), hn.call(r, T) || (r[T] = a[a.length - 1]), a.pop();
  }
  function yr() {
    b("slurpAllLineEndings", !0);
  }
  function Er(y) {
    I("headingRank") || (b("headingRank", this.sliceSerialize(y).length), D(), S("<h" + I("headingRank") + ">"));
  }
  function Sr() {
    F(), b("slurpAllLineEndings");
  }
  function Ir() {
    b("slurpAllLineEndings", !0);
  }
  function wr() {
    S("</h" + I("headingRank") + ">"), b("headingRank");
  }
  function Tr(y) {
    b("headingRank", this.sliceSerialize(y).charCodeAt(0) === 61 ? 1 : 2);
  }
  function Cr() {
    const y = k();
    D(), S("<h" + I("headingRank") + ">"), E(y), S("</h" + I("headingRank") + ">"), b("slurpAllLineEndings"), b("headingRank");
  }
  function St(y) {
    E(x(this.sliceSerialize(y)));
  }
  function Ar(y) {
    if (!I("slurpAllLineEndings")) {
      if (I("slurpOneLineEnding")) {
        b("slurpOneLineEnding");
        return;
      }
      if (I("inCodeText")) {
        E(" ");
        return;
      }
      E(x(this.sliceSerialize(y)));
    }
  }
  function Fr(y) {
    E(x(this.sliceSerialize(y))), b("flowCodeSeenData", !0);
  }
  function nn() {
    S("<br />");
  }
  function Dr() {
    D(), rn();
  }
  function en() {
    b("ignoreEncode");
  }
  function rn() {
    e.allowDangerousHtml && b("ignoreEncode", !0);
  }
  function Lr() {
    S("<em>");
  }
  function Or() {
    S("<strong>");
  }
  function Nr() {
    b("inCodeText", !0), S("<code>");
  }
  function Rr() {
    b("inCodeText"), S("</code>");
  }
  function zr() {
    S("</em>");
  }
  function Pr() {
    S("</strong>");
  }
  function jr() {
    D(), S("<hr />");
  }
  function an(y) {
    b("characterReferenceType", y.type);
  }
  function vr(y) {
    const T = this.sliceSerialize(y), V = I("characterReferenceType") ? $r(T, I("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : wn(T);
    E(x(
      /** @type {string} */
      V
    )), b("characterReferenceType");
  }
  function Mr(y) {
    const T = this.sliceSerialize(y);
    S('<a href="' + pt(T, e.allowDangerousProtocol ? void 0 : cn) + '">'), E(x(T)), S("</a>");
  }
  function _r(y) {
    const T = this.sliceSerialize(y);
    S('<a href="' + pt("mailto:" + T) + '">'), E(x(T)), S("</a>");
  }
}
function z(t, e, n, r) {
  const l = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return i;
  function i(h) {
    return L(h) ? (t.enter(n), u(h)) : e(h);
  }
  function u(h) {
    return L(h) && a++ < l ? (t.consume(h), u) : (t.exit(n), e(h));
  }
}
const Xr = {
  tokenize: Kr
};
function Kr(t) {
  const e = t.attempt(this.parser.constructs.contentInitial, r, l);
  let n;
  return e;
  function r(u) {
    if (u === null) {
      t.consume(u);
      return;
    }
    return t.enter("lineEnding"), t.consume(u), t.exit("lineEnding"), z(t, e, "linePrefix");
  }
  function l(u) {
    return t.enter("paragraph"), a(u);
  }
  function a(u) {
    const h = t.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = h), n = h, i(u);
  }
  function i(u) {
    if (u === null) {
      t.exit("chunkText"), t.exit("paragraph"), t.consume(u);
      return;
    }
    return A(u) ? (t.consume(u), t.exit("chunkText"), a) : (t.consume(u), i);
  }
}
const Jr = {
  tokenize: ti
}, mn = {
  tokenize: ni
};
function ti(t) {
  const e = this, n = [];
  let r = 0, l, a, i;
  return u;
  function u(E) {
    if (r < n.length) {
      const j = n[r];
      return e.containerState = j[1], t.attempt(j[0].continuation, h, s)(E);
    }
    return s(E);
  }
  function h(E) {
    if (r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, l && S();
      const j = e.events.length;
      let D = j, x;
      for (; D--; )
        if (e.events[D][0] === "exit" && e.events[D][1].type === "chunkFlow") {
          x = e.events[D][1].end;
          break;
        }
      k(r);
      let N = j;
      for (; N < e.events.length; )
        e.events[N][1].end = {
          ...x
        }, N++;
      return Q(e.events, D + 1, 0, e.events.slice(j)), e.events.length = N, s(E);
    }
    return u(E);
  }
  function s(E) {
    if (r === n.length) {
      if (!l)
        return f(E);
      if (l.currentConstruct && l.currentConstruct.concrete)
        return b(E);
      e.interrupt = !!(l.currentConstruct && !l._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(mn, p, o)(E);
  }
  function p(E) {
    return l && S(), k(r), f(E);
  }
  function o(E) {
    return e.parser.lazy[e.now().line] = r !== n.length, i = e.now().offset, b(E);
  }
  function f(E) {
    return e.containerState = {}, t.attempt(mn, c, b)(E);
  }
  function c(E) {
    return r++, n.push([e.currentConstruct, e.containerState]), f(E);
  }
  function b(E) {
    if (E === null) {
      l && S(), k(0), t.consume(E);
      return;
    }
    return l = l || e.parser.flow(e.now()), t.enter("chunkFlow", {
      _tokenizer: l,
      contentType: "flow",
      previous: a
    }), I(E);
  }
  function I(E) {
    if (E === null) {
      F(t.exit("chunkFlow"), !0), k(0), t.consume(E);
      return;
    }
    return A(E) ? (t.consume(E), F(t.exit("chunkFlow")), r = 0, e.interrupt = void 0, u) : (t.consume(E), I);
  }
  function F(E, j) {
    const D = e.sliceStream(E);
    if (j && D.push(null), E.previous = a, a && (a.next = E), a = E, l.defineSkip(E.start), l.write(D), e.parser.lazy[E.start.line]) {
      let x = l.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          l.events[x][1].start.offset < i && // …and either is not ended yet…
          (!l.events[x][1].end || // …or ends after it.
          l.events[x][1].end.offset > i)
        )
          return;
      const N = e.events.length;
      let _ = N, H, d;
      for (; _--; )
        if (e.events[_][0] === "exit" && e.events[_][1].type === "chunkFlow") {
          if (H) {
            d = e.events[_][1].end;
            break;
          }
          H = !0;
        }
      for (k(r), x = N; x < e.events.length; )
        e.events[x][1].end = {
          ...d
        }, x++;
      Q(e.events, _ + 1, 0, e.events.slice(N)), e.events.length = x;
    }
  }
  function k(E) {
    let j = n.length;
    for (; j-- > E; ) {
      const D = n[j];
      e.containerState = D[1], D[0].exit.call(e, t);
    }
    n.length = E;
  }
  function S() {
    l.write([null]), a = void 0, l = void 0, e.containerState._closeFlow = void 0;
  }
}
function ni(t, e, n) {
  return z(t, t.attempt(this.parser.constructs.document, e, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Lt(t) {
  if (t === null || M(t) || yt(t))
    return 1;
  if ($t(t))
    return 2;
}
function Ot(t, e, n) {
  const r = [];
  let l = -1;
  for (; ++l < t.length; ) {
    const a = t[l].resolveAll;
    a && !r.includes(a) && (e = a(e, n), r.push(a));
  }
  return e;
}
const Ht = {
  name: "attention",
  resolveAll: ei,
  tokenize: ri
};
function ei(t, e) {
  let n = -1, r, l, a, i, u, h, s, p;
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
          gn(o, -h), gn(f, h), i = {
            type: h > 1 ? "strongSequence" : "emphasisSequence",
            start: o,
            end: {
              ...t[r][1].end
            }
          }, u = {
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
          }, l = {
            type: h > 1 ? "strong" : "emphasis",
            start: {
              ...i.start
            },
            end: {
              ...u.end
            }
          }, t[r][1].end = {
            ...i.start
          }, t[n][1].start = {
            ...u.end
          }, s = [], t[r][1].end.offset - t[r][1].start.offset && (s = G(s, [["enter", t[r][1], e], ["exit", t[r][1], e]])), s = G(s, [["enter", l, e], ["enter", i, e], ["exit", i, e], ["enter", a, e]]), s = G(s, Ot(e.parser.constructs.insideSpan.null, t.slice(r + 1, n), e)), s = G(s, [["exit", a, e], ["enter", u, e], ["exit", u, e], ["exit", l, e]]), t[n][1].end.offset - t[n][1].start.offset ? (p = 2, s = G(s, [["enter", t[n][1], e], ["exit", t[n][1], e]])) : p = 0, Q(t, r - 1, n - r + 3, s), n = r + s.length - p - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function ri(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, l = Lt(r);
  let a;
  return i;
  function i(h) {
    return a = h, t.enter("attentionSequence"), u(h);
  }
  function u(h) {
    if (h === a)
      return t.consume(h), u;
    const s = t.exit("attentionSequence"), p = Lt(h), o = !p || p === 2 && l || n.includes(h), f = !l || l === 2 && p || n.includes(r);
    return s._open = !!(a === 42 ? o : o && (l || !f)), s._close = !!(a === 42 ? f : f && (p || !o)), e(h);
  }
}
function gn(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const ii = {
  name: "autolink",
  tokenize: ai
};
function ai(t, e, n) {
  let r = 0;
  return l;
  function l(c) {
    return t.enter("autolink"), t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.enter("autolinkProtocol"), a;
  }
  function a(c) {
    return Y(c) ? (t.consume(c), i) : c === 64 ? n(c) : s(c);
  }
  function i(c) {
    return c === 43 || c === 45 || c === 46 || W(c) ? (r = 1, u(c)) : s(c);
  }
  function u(c) {
    return c === 58 ? (t.consume(c), r = 0, h) : (c === 43 || c === 45 || c === 46 || W(c)) && r++ < 32 ? (t.consume(c), u) : (r = 0, s(c));
  }
  function h(c) {
    return c === 62 ? (t.exit("autolinkProtocol"), t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.exit("autolink"), e) : c === null || c === 32 || c === 60 || Dt(c) ? n(c) : (t.consume(c), h);
  }
  function s(c) {
    return c === 64 ? (t.consume(c), p) : Vr(c) ? (t.consume(c), s) : n(c);
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
const Ct = {
  partial: !0,
  tokenize: li
};
function li(t, e, n) {
  return r;
  function r(a) {
    return L(a) ? z(t, l, "linePrefix")(a) : l(a);
  }
  function l(a) {
    return a === null || A(a) ? e(a) : n(a);
  }
}
const Fn = {
  continuation: {
    tokenize: oi
  },
  exit: si,
  name: "blockQuote",
  tokenize: ui
};
function ui(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    if (i === 62) {
      const u = r.containerState;
      return u.open || (t.enter("blockQuote", {
        _container: !0
      }), u.open = !0), t.enter("blockQuotePrefix"), t.enter("blockQuoteMarker"), t.consume(i), t.exit("blockQuoteMarker"), a;
    }
    return n(i);
  }
  function a(i) {
    return L(i) ? (t.enter("blockQuotePrefixWhitespace"), t.consume(i), t.exit("blockQuotePrefixWhitespace"), t.exit("blockQuotePrefix"), e) : (t.exit("blockQuotePrefix"), e(i));
  }
}
function oi(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    return L(i) ? z(t, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : a(i);
  }
  function a(i) {
    return t.attempt(Fn, e, n)(i);
  }
}
function si(t) {
  t.exit("blockQuote");
}
const Dn = {
  name: "characterEscape",
  tokenize: hi
};
function hi(t, e, n) {
  return r;
  function r(a) {
    return t.enter("characterEscape"), t.enter("escapeMarker"), t.consume(a), t.exit("escapeMarker"), l;
  }
  function l(a) {
    return Wr(a) ? (t.enter("characterEscapeValue"), t.consume(a), t.exit("characterEscapeValue"), t.exit("characterEscape"), e) : n(a);
  }
}
const Ln = {
  name: "characterReference",
  tokenize: ci
};
function ci(t, e, n) {
  const r = this;
  let l = 0, a, i;
  return u;
  function u(o) {
    return t.enter("characterReference"), t.enter("characterReferenceMarker"), t.consume(o), t.exit("characterReferenceMarker"), h;
  }
  function h(o) {
    return o === 35 ? (t.enter("characterReferenceMarkerNumeric"), t.consume(o), t.exit("characterReferenceMarkerNumeric"), s) : (t.enter("characterReferenceValue"), a = 31, i = W, p(o));
  }
  function s(o) {
    return o === 88 || o === 120 ? (t.enter("characterReferenceMarkerHexadecimal"), t.consume(o), t.exit("characterReferenceMarkerHexadecimal"), t.enter("characterReferenceValue"), a = 6, i = Gr, p) : (t.enter("characterReferenceValue"), a = 7, i = Bt, p(o));
  }
  function p(o) {
    if (o === 59 && l) {
      const f = t.exit("characterReferenceValue");
      return i === W && !wn(r.sliceSerialize(f)) ? n(o) : (t.enter("characterReferenceMarker"), t.consume(o), t.exit("characterReferenceMarker"), t.exit("characterReference"), e);
    }
    return i(o) && l++ < a ? (t.consume(o), p) : n(o);
  }
}
const pn = {
  partial: !0,
  tokenize: gi
}, fn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: mi
};
function mi(t, e, n) {
  const r = this, l = {
    partial: !0,
    tokenize: D
  };
  let a = 0, i = 0, u;
  return h;
  function h(x) {
    return s(x);
  }
  function s(x) {
    const N = r.events[r.events.length - 1];
    return a = N && N[1].type === "linePrefix" ? N[2].sliceSerialize(N[1], !0).length : 0, u = x, t.enter("codeFenced"), t.enter("codeFencedFence"), t.enter("codeFencedFenceSequence"), p(x);
  }
  function p(x) {
    return x === u ? (i++, t.consume(x), p) : i < 3 ? n(x) : (t.exit("codeFencedFenceSequence"), L(x) ? z(t, o, "whitespace")(x) : o(x));
  }
  function o(x) {
    return x === null || A(x) ? (t.exit("codeFencedFence"), r.interrupt ? e(x) : t.check(pn, I, j)(x)) : (t.enter("codeFencedFenceInfo"), t.enter("chunkString", {
      contentType: "string"
    }), f(x));
  }
  function f(x) {
    return x === null || A(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), o(x)) : L(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), z(t, c, "whitespace")(x)) : x === 96 && x === u ? n(x) : (t.consume(x), f);
  }
  function c(x) {
    return x === null || A(x) ? o(x) : (t.enter("codeFencedFenceMeta"), t.enter("chunkString", {
      contentType: "string"
    }), b(x));
  }
  function b(x) {
    return x === null || A(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceMeta"), o(x)) : x === 96 && x === u ? n(x) : (t.consume(x), b);
  }
  function I(x) {
    return t.attempt(l, j, F)(x);
  }
  function F(x) {
    return t.enter("lineEnding"), t.consume(x), t.exit("lineEnding"), k;
  }
  function k(x) {
    return a > 0 && L(x) ? z(t, S, "linePrefix", a + 1)(x) : S(x);
  }
  function S(x) {
    return x === null || A(x) ? t.check(pn, I, j)(x) : (t.enter("codeFlowValue"), E(x));
  }
  function E(x) {
    return x === null || A(x) ? (t.exit("codeFlowValue"), S(x)) : (t.consume(x), E);
  }
  function j(x) {
    return t.exit("codeFenced"), e(x);
  }
  function D(x, N, _) {
    let H = 0;
    return d;
    function d(P) {
      return x.enter("lineEnding"), x.consume(P), x.exit("lineEnding"), w;
    }
    function w(P) {
      return x.enter("codeFencedFence"), L(P) ? z(x, C, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(P) : C(P);
    }
    function C(P) {
      return P === u ? (x.enter("codeFencedFenceSequence"), v(P)) : _(P);
    }
    function v(P) {
      return P === u ? (H++, x.consume(P), v) : H >= i ? (x.exit("codeFencedFenceSequence"), L(P) ? z(x, B, "whitespace")(P) : B(P)) : _(P);
    }
    function B(P) {
      return P === null || A(P) ? (x.exit("codeFencedFence"), N(P)) : _(P);
    }
  }
}
function gi(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    return i === null ? n(i) : (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), a);
  }
  function a(i) {
    return r.parser.lazy[r.now().line] ? n(i) : e(i);
  }
}
const Rt = {
  name: "codeIndented",
  tokenize: fi
}, pi = {
  partial: !0,
  tokenize: bi
};
function fi(t, e, n) {
  const r = this;
  return l;
  function l(s) {
    return t.enter("codeIndented"), z(t, a, "linePrefix", 5)(s);
  }
  function a(s) {
    const p = r.events[r.events.length - 1];
    return p && p[1].type === "linePrefix" && p[2].sliceSerialize(p[1], !0).length >= 4 ? i(s) : n(s);
  }
  function i(s) {
    return s === null ? h(s) : A(s) ? t.attempt(pi, i, h)(s) : (t.enter("codeFlowValue"), u(s));
  }
  function u(s) {
    return s === null || A(s) ? (t.exit("codeFlowValue"), i(s)) : (t.consume(s), u);
  }
  function h(s) {
    return t.exit("codeIndented"), e(s);
  }
}
function bi(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    return r.parser.lazy[r.now().line] ? n(i) : A(i) ? (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), l) : z(t, a, "linePrefix", 5)(i);
  }
  function a(i) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? e(i) : A(i) ? l(i) : n(i);
  }
}
const di = {
  name: "codeText",
  previous: ki,
  resolve: xi,
  tokenize: yi
};
function xi(t) {
  let e = t.length - 4, n = 3, r, l;
  if ((t[n][1].type === "lineEnding" || t[n][1].type === "space") && (t[e][1].type === "lineEnding" || t[e][1].type === "space")) {
    for (r = n; ++r < e; )
      if (t[r][1].type === "codeTextData") {
        t[n][1].type = "codeTextPadding", t[e][1].type = "codeTextPadding", n += 2, e -= 2;
        break;
      }
  }
  for (r = n - 1, e++; ++r <= e; )
    l === void 0 ? r !== e && t[r][1].type !== "lineEnding" && (l = r) : (r === e || t[r][1].type === "lineEnding") && (t[l][1].type = "codeTextData", r !== l + 2 && (t[l][1].end = t[r - 1][1].end, t.splice(l + 2, r - l - 2), e -= r - l - 2, r = l + 2), l = void 0);
  return t;
}
function ki(t) {
  return t !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function yi(t, e, n) {
  let r = 0, l, a;
  return i;
  function i(o) {
    return t.enter("codeText"), t.enter("codeTextSequence"), u(o);
  }
  function u(o) {
    return o === 96 ? (t.consume(o), r++, u) : (t.exit("codeTextSequence"), h(o));
  }
  function h(o) {
    return o === null ? n(o) : o === 32 ? (t.enter("space"), t.consume(o), t.exit("space"), h) : o === 96 ? (a = t.enter("codeTextSequence"), l = 0, p(o)) : A(o) ? (t.enter("lineEnding"), t.consume(o), t.exit("lineEnding"), h) : (t.enter("codeTextData"), s(o));
  }
  function s(o) {
    return o === null || o === 32 || o === 96 || A(o) ? (t.exit("codeTextData"), h(o)) : (t.consume(o), s);
  }
  function p(o) {
    return o === 96 ? (t.consume(o), l++, p) : l === r ? (t.exit("codeTextSequence"), t.exit("codeText"), e(o)) : (a.type = "codeTextData", s(o));
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
    const l = n || 0;
    this.setCursor(Math.trunc(e));
    const a = this.right.splice(this.right.length - l, Number.POSITIVE_INFINITY);
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
function On(t) {
  const e = {};
  let n = -1, r, l, a, i, u, h, s;
  const p = new Ei(t);
  for (; ++n < p.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = p.get(n), n && r[1].type === "chunkFlow" && p.get(n - 1)[1].type === "listItemPrefix" && (h = r[1]._tokenizer.events, a = 0, a < h.length && h[a][1].type === "lineEndingBlank" && (a += 2), a < h.length && h[a][1].type === "content"))
      for (; ++a < h.length && h[a][1].type !== "content"; )
        h[a][1].type === "chunkText" && (h[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Si(p, n)), n = e[n], s = !0);
    else if (r[1]._container) {
      for (a = n, l = void 0; a--; )
        if (i = p.get(a), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank")
          i[0] === "enter" && (l && (p.get(l)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", l = a);
        else if (!(i[1].type === "linePrefix" || i[1].type === "listItemIndent")) break;
      l && (r[1].end = {
        ...p.get(l)[1].start
      }, u = p.slice(l, n), u.unshift(r), p.splice(l, n - l + 1, u));
    }
  }
  return Q(t, 0, Number.POSITIVE_INFINITY, p.slice(0)), !s;
}
function Si(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let l = e - 1;
  const a = [];
  let i = n._tokenizer;
  i || (i = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
  const u = i.events, h = [], s = {};
  let p, o, f = -1, c = n, b = 0, I = 0;
  const F = [I];
  for (; c; ) {
    for (; t.get(++l)[1] !== c; )
      ;
    a.push(l), c._tokenizer || (p = r.sliceStream(c), c.next || p.push(null), o && i.defineSkip(c.start), c._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(p), c._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), o = c, c = c.next;
  }
  for (c = n; ++f < u.length; )
    // Find a void token that includes a break.
    u[f][0] === "exit" && u[f - 1][0] === "enter" && u[f][1].type === u[f - 1][1].type && u[f][1].start.line !== u[f][1].end.line && (I = f + 1, F.push(I), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (i.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : F.pop(), f = F.length; f--; ) {
    const k = u.slice(F[f], F[f + 1]), S = a.pop();
    h.push([S, S + k.length - 1]), t.splice(S, 2, k);
  }
  for (h.reverse(), f = -1; ++f < h.length; )
    s[b + h[f][0]] = b + h[f][1], b += h[f][1] - h[f][0] - 1;
  return s;
}
const Ii = {
  resolve: Ti,
  tokenize: Ci
}, wi = {
  partial: !0,
  tokenize: Ai
};
function Ti(t) {
  return On(t), t;
}
function Ci(t, e) {
  let n;
  return r;
  function r(u) {
    return t.enter("content"), n = t.enter("chunkContent", {
      contentType: "content"
    }), l(u);
  }
  function l(u) {
    return u === null ? a(u) : A(u) ? t.check(wi, i, a)(u) : (t.consume(u), l);
  }
  function a(u) {
    return t.exit("chunkContent"), t.exit("content"), e(u);
  }
  function i(u) {
    return t.consume(u), t.exit("chunkContent"), n.next = t.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, l;
  }
}
function Ai(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    return t.exit("chunkContent"), t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), z(t, a, "linePrefix");
  }
  function a(i) {
    if (i === null || A(i))
      return n(i);
    const u = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? e(i) : t.interrupt(r.parser.constructs.flow, n, e)(i);
  }
}
function Nn(t, e, n, r, l, a, i, u, h) {
  const s = h || Number.POSITIVE_INFINITY;
  let p = 0;
  return o;
  function o(k) {
    return k === 60 ? (t.enter(r), t.enter(l), t.enter(a), t.consume(k), t.exit(a), f) : k === null || k === 32 || k === 41 || Dt(k) ? n(k) : (t.enter(r), t.enter(i), t.enter(u), t.enter("chunkString", {
      contentType: "string"
    }), I(k));
  }
  function f(k) {
    return k === 62 ? (t.enter(a), t.consume(k), t.exit(a), t.exit(l), t.exit(r), e) : (t.enter(u), t.enter("chunkString", {
      contentType: "string"
    }), c(k));
  }
  function c(k) {
    return k === 62 ? (t.exit("chunkString"), t.exit(u), f(k)) : k === null || k === 60 || A(k) ? n(k) : (t.consume(k), k === 92 ? b : c);
  }
  function b(k) {
    return k === 60 || k === 62 || k === 92 ? (t.consume(k), c) : c(k);
  }
  function I(k) {
    return !p && (k === null || k === 41 || M(k)) ? (t.exit("chunkString"), t.exit(u), t.exit(i), t.exit(r), e(k)) : p < s && k === 40 ? (t.consume(k), p++, I) : k === 41 ? (t.consume(k), p--, I) : k === null || k === 32 || k === 40 || Dt(k) ? n(k) : (t.consume(k), k === 92 ? F : I);
  }
  function F(k) {
    return k === 40 || k === 41 || k === 92 ? (t.consume(k), I) : I(k);
  }
}
function Rn(t, e, n, r, l, a) {
  const i = this;
  let u = 0, h;
  return s;
  function s(c) {
    return t.enter(r), t.enter(l), t.consume(c), t.exit(l), t.enter(a), p;
  }
  function p(c) {
    return u > 999 || c === null || c === 91 || c === 93 && !h || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !u && "_hiddenFootnoteSupport" in i.parser.constructs ? n(c) : c === 93 ? (t.exit(a), t.enter(l), t.consume(c), t.exit(l), t.exit(r), e) : A(c) ? (t.enter("lineEnding"), t.consume(c), t.exit("lineEnding"), p) : (t.enter("chunkString", {
      contentType: "string"
    }), o(c));
  }
  function o(c) {
    return c === null || c === 91 || c === 93 || A(c) || u++ > 999 ? (t.exit("chunkString"), p(c)) : (t.consume(c), h || (h = !L(c)), c === 92 ? f : o);
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (t.consume(c), u++, o) : o(c);
  }
}
function zn(t, e, n, r, l, a) {
  let i;
  return u;
  function u(f) {
    return f === 34 || f === 39 || f === 40 ? (t.enter(r), t.enter(l), t.consume(f), t.exit(l), i = f === 40 ? 41 : f, h) : n(f);
  }
  function h(f) {
    return f === i ? (t.enter(l), t.consume(f), t.exit(l), t.exit(r), e) : (t.enter(a), s(f));
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
function wt(t, e) {
  let n;
  return r;
  function r(l) {
    return A(l) ? (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), n = !0, r) : L(l) ? z(t, r, n ? "linePrefix" : "lineSuffix")(l) : e(l);
  }
}
const Fi = {
  name: "definition",
  tokenize: Li
}, Di = {
  partial: !0,
  tokenize: Oi
};
function Li(t, e, n) {
  const r = this;
  let l;
  return a;
  function a(c) {
    return t.enter("definition"), i(c);
  }
  function i(c) {
    return Rn.call(
      r,
      t,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function u(c) {
    return l = rt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), c === 58 ? (t.enter("definitionMarker"), t.consume(c), t.exit("definitionMarker"), h) : n(c);
  }
  function h(c) {
    return M(c) ? wt(t, s)(c) : s(c);
  }
  function s(c) {
    return Nn(
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
    return L(c) ? z(t, f, "whitespace")(c) : f(c);
  }
  function f(c) {
    return c === null || A(c) ? (t.exit("definition"), r.parser.defined.push(l), e(c)) : n(c);
  }
}
function Oi(t, e, n) {
  return r;
  function r(u) {
    return M(u) ? wt(t, l)(u) : n(u);
  }
  function l(u) {
    return zn(t, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(u);
  }
  function a(u) {
    return L(u) ? z(t, i, "whitespace")(u) : i(u);
  }
  function i(u) {
    return u === null || A(u) ? e(u) : n(u);
  }
}
const Ni = {
  name: "hardBreakEscape",
  tokenize: Ri
};
function Ri(t, e, n) {
  return r;
  function r(a) {
    return t.enter("hardBreakEscape"), t.consume(a), l;
  }
  function l(a) {
    return A(a) ? (t.exit("hardBreakEscape"), e(a)) : n(a);
  }
}
const zi = {
  name: "headingAtx",
  resolve: Pi,
  tokenize: ji
};
function Pi(t, e) {
  let n = t.length - 2, r = 3, l, a;
  return t[r][1].type === "whitespace" && (r += 2), n - 2 > r && t[n][1].type === "whitespace" && (n -= 2), t[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && t[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (l = {
    type: "atxHeadingText",
    start: t[r][1].start,
    end: t[n][1].end
  }, a = {
    type: "chunkText",
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: "text"
  }, Q(t, r, n - r + 1, [["enter", l, e], ["enter", a, e], ["exit", a, e], ["exit", l, e]])), t;
}
function ji(t, e, n) {
  let r = 0;
  return l;
  function l(p) {
    return t.enter("atxHeading"), a(p);
  }
  function a(p) {
    return t.enter("atxHeadingSequence"), i(p);
  }
  function i(p) {
    return p === 35 && r++ < 6 ? (t.consume(p), i) : p === null || M(p) ? (t.exit("atxHeadingSequence"), u(p)) : n(p);
  }
  function u(p) {
    return p === 35 ? (t.enter("atxHeadingSequence"), h(p)) : p === null || A(p) ? (t.exit("atxHeading"), e(p)) : L(p) ? z(t, u, "whitespace")(p) : (t.enter("atxHeadingText"), s(p));
  }
  function h(p) {
    return p === 35 ? (t.consume(p), h) : (t.exit("atxHeadingSequence"), u(p));
  }
  function s(p) {
    return p === null || p === 35 || M(p) ? (t.exit("atxHeadingText"), u(p)) : (t.consume(p), s);
  }
}
const vi = [
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
], bn = ["pre", "script", "style", "textarea"], Mi = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Hi,
  tokenize: Ui
}, _i = {
  partial: !0,
  tokenize: qi
}, Bi = {
  partial: !0,
  tokenize: $i
};
function Hi(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && t[e - 2][1].type === "linePrefix" && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function Ui(t, e, n) {
  const r = this;
  let l, a, i, u, h;
  return s;
  function s(g) {
    return p(g);
  }
  function p(g) {
    return t.enter("htmlFlow"), t.enter("htmlFlowData"), t.consume(g), o;
  }
  function o(g) {
    return g === 33 ? (t.consume(g), f) : g === 47 ? (t.consume(g), a = !0, I) : g === 63 ? (t.consume(g), l = 3, r.interrupt ? e : m) : Y(g) ? (t.consume(g), i = String.fromCharCode(g), F) : n(g);
  }
  function f(g) {
    return g === 45 ? (t.consume(g), l = 2, c) : g === 91 ? (t.consume(g), l = 5, u = 0, b) : Y(g) ? (t.consume(g), l = 4, r.interrupt ? e : m) : n(g);
  }
  function c(g) {
    return g === 45 ? (t.consume(g), r.interrupt ? e : m) : n(g);
  }
  function b(g) {
    const J = "CDATA[";
    return g === J.charCodeAt(u++) ? (t.consume(g), u === J.length ? r.interrupt ? e : C : b) : n(g);
  }
  function I(g) {
    return Y(g) ? (t.consume(g), i = String.fromCharCode(g), F) : n(g);
  }
  function F(g) {
    if (g === null || g === 47 || g === 62 || M(g)) {
      const J = g === 47, bt = i.toLowerCase();
      return !J && !a && bn.includes(bt) ? (l = 1, r.interrupt ? e(g) : C(g)) : vi.includes(i.toLowerCase()) ? (l = 6, J ? (t.consume(g), k) : r.interrupt ? e(g) : C(g)) : (l = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : a ? S(g) : E(g));
    }
    return g === 45 || W(g) ? (t.consume(g), i += String.fromCharCode(g), F) : n(g);
  }
  function k(g) {
    return g === 62 ? (t.consume(g), r.interrupt ? e : C) : n(g);
  }
  function S(g) {
    return L(g) ? (t.consume(g), S) : d(g);
  }
  function E(g) {
    return g === 47 ? (t.consume(g), d) : g === 58 || g === 95 || Y(g) ? (t.consume(g), j) : L(g) ? (t.consume(g), E) : d(g);
  }
  function j(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || W(g) ? (t.consume(g), j) : D(g);
  }
  function D(g) {
    return g === 61 ? (t.consume(g), x) : L(g) ? (t.consume(g), D) : E(g);
  }
  function x(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (t.consume(g), h = g, N) : L(g) ? (t.consume(g), x) : _(g);
  }
  function N(g) {
    return g === h ? (t.consume(g), h = null, H) : g === null || A(g) ? n(g) : (t.consume(g), N);
  }
  function _(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || M(g) ? D(g) : (t.consume(g), _);
  }
  function H(g) {
    return g === 47 || g === 62 || L(g) ? E(g) : n(g);
  }
  function d(g) {
    return g === 62 ? (t.consume(g), w) : n(g);
  }
  function w(g) {
    return g === null || A(g) ? C(g) : L(g) ? (t.consume(g), w) : n(g);
  }
  function C(g) {
    return g === 45 && l === 2 ? (t.consume(g), q) : g === 60 && l === 1 ? (t.consume(g), U) : g === 62 && l === 4 ? (t.consume(g), K) : g === 63 && l === 3 ? (t.consume(g), m) : g === 93 && l === 5 ? (t.consume(g), at) : A(g) && (l === 6 || l === 7) ? (t.exit("htmlFlowData"), t.check(_i, lt, v)(g)) : g === null || A(g) ? (t.exit("htmlFlowData"), v(g)) : (t.consume(g), C);
  }
  function v(g) {
    return t.check(Bi, B, lt)(g);
  }
  function B(g) {
    return t.enter("lineEnding"), t.consume(g), t.exit("lineEnding"), P;
  }
  function P(g) {
    return g === null || A(g) ? v(g) : (t.enter("htmlFlowData"), C(g));
  }
  function q(g) {
    return g === 45 ? (t.consume(g), m) : C(g);
  }
  function U(g) {
    return g === 47 ? (t.consume(g), i = "", X) : C(g);
  }
  function X(g) {
    if (g === 62) {
      const J = i.toLowerCase();
      return bn.includes(J) ? (t.consume(g), K) : C(g);
    }
    return Y(g) && i.length < 8 ? (t.consume(g), i += String.fromCharCode(g), X) : C(g);
  }
  function at(g) {
    return g === 93 ? (t.consume(g), m) : C(g);
  }
  function m(g) {
    return g === 62 ? (t.consume(g), K) : g === 45 && l === 2 ? (t.consume(g), m) : C(g);
  }
  function K(g) {
    return g === null || A(g) ? (t.exit("htmlFlowData"), lt(g)) : (t.consume(g), K);
  }
  function lt(g) {
    return t.exit("htmlFlow"), e(g);
  }
}
function $i(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    return A(i) ? (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), a) : n(i);
  }
  function a(i) {
    return r.parser.lazy[r.now().line] ? n(i) : e(i);
  }
}
function qi(t, e, n) {
  return r;
  function r(l) {
    return t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), t.attempt(Ct, e, n);
  }
}
const Vi = {
  name: "htmlText",
  tokenize: Gi
};
function Gi(t, e, n) {
  const r = this;
  let l, a, i;
  return u;
  function u(m) {
    return t.enter("htmlText"), t.enter("htmlTextData"), t.consume(m), h;
  }
  function h(m) {
    return m === 33 ? (t.consume(m), s) : m === 47 ? (t.consume(m), D) : m === 63 ? (t.consume(m), E) : Y(m) ? (t.consume(m), _) : n(m);
  }
  function s(m) {
    return m === 45 ? (t.consume(m), p) : m === 91 ? (t.consume(m), a = 0, b) : Y(m) ? (t.consume(m), S) : n(m);
  }
  function p(m) {
    return m === 45 ? (t.consume(m), c) : n(m);
  }
  function o(m) {
    return m === null ? n(m) : m === 45 ? (t.consume(m), f) : A(m) ? (i = o, U(m)) : (t.consume(m), o);
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
    return m === null ? n(m) : m === 93 ? (t.consume(m), F) : A(m) ? (i = I, U(m)) : (t.consume(m), I);
  }
  function F(m) {
    return m === 93 ? (t.consume(m), k) : I(m);
  }
  function k(m) {
    return m === 62 ? q(m) : m === 93 ? (t.consume(m), k) : I(m);
  }
  function S(m) {
    return m === null || m === 62 ? q(m) : A(m) ? (i = S, U(m)) : (t.consume(m), S);
  }
  function E(m) {
    return m === null ? n(m) : m === 63 ? (t.consume(m), j) : A(m) ? (i = E, U(m)) : (t.consume(m), E);
  }
  function j(m) {
    return m === 62 ? q(m) : E(m);
  }
  function D(m) {
    return Y(m) ? (t.consume(m), x) : n(m);
  }
  function x(m) {
    return m === 45 || W(m) ? (t.consume(m), x) : N(m);
  }
  function N(m) {
    return A(m) ? (i = N, U(m)) : L(m) ? (t.consume(m), N) : q(m);
  }
  function _(m) {
    return m === 45 || W(m) ? (t.consume(m), _) : m === 47 || m === 62 || M(m) ? H(m) : n(m);
  }
  function H(m) {
    return m === 47 ? (t.consume(m), q) : m === 58 || m === 95 || Y(m) ? (t.consume(m), d) : A(m) ? (i = H, U(m)) : L(m) ? (t.consume(m), H) : q(m);
  }
  function d(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || W(m) ? (t.consume(m), d) : w(m);
  }
  function w(m) {
    return m === 61 ? (t.consume(m), C) : A(m) ? (i = w, U(m)) : L(m) ? (t.consume(m), w) : H(m);
  }
  function C(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (t.consume(m), l = m, v) : A(m) ? (i = C, U(m)) : L(m) ? (t.consume(m), C) : (t.consume(m), B);
  }
  function v(m) {
    return m === l ? (t.consume(m), l = void 0, P) : m === null ? n(m) : A(m) ? (i = v, U(m)) : (t.consume(m), v);
  }
  function B(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || M(m) ? H(m) : (t.consume(m), B);
  }
  function P(m) {
    return m === 47 || m === 62 || M(m) ? H(m) : n(m);
  }
  function q(m) {
    return m === 62 ? (t.consume(m), t.exit("htmlTextData"), t.exit("htmlText"), e) : n(m);
  }
  function U(m) {
    return t.exit("htmlTextData"), t.enter("lineEnding"), t.consume(m), t.exit("lineEnding"), X;
  }
  function X(m) {
    return L(m) ? z(t, at, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : at(m);
  }
  function at(m) {
    return t.enter("htmlTextData"), i(m);
  }
}
const qt = {
  name: "labelEnd",
  resolveAll: Qi,
  resolveTo: Xi,
  tokenize: Ki
}, Wi = {
  tokenize: Ji
}, Yi = {
  tokenize: ta
}, Zi = {
  tokenize: na
};
function Qi(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const l = r.type === "labelImage" ? 4 : 2;
      r.type = "data", e += l;
    }
  }
  return t.length !== n.length && Q(t, 0, t.length, n), t;
}
function Xi(t, e) {
  let n = t.length, r = 0, l, a, i, u;
  for (; n--; )
    if (l = t[n][1], a) {
      if (l.type === "link" || l.type === "labelLink" && l._inactive)
        break;
      t[n][0] === "enter" && l.type === "labelLink" && (l._inactive = !0);
    } else if (i) {
      if (t[n][0] === "enter" && (l.type === "labelImage" || l.type === "labelLink") && !l._balanced && (a = n, l.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else l.type === "labelEnd" && (i = n);
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
  return u = [["enter", h, e], ["enter", s, e]], u = G(u, t.slice(a + 1, a + r + 3)), u = G(u, [["enter", p, e]]), u = G(u, Ot(e.parser.constructs.insideSpan.null, t.slice(a + r + 4, i - 3), e)), u = G(u, [["exit", p, e], t[i - 2], t[i - 1], ["exit", s, e]]), u = G(u, t.slice(i + 1)), u = G(u, [["exit", h, e]]), Q(t, a, t.length, u), t;
}
function Ki(t, e, n) {
  const r = this;
  let l = r.events.length, a, i;
  for (; l--; )
    if ((r.events[l][1].type === "labelImage" || r.events[l][1].type === "labelLink") && !r.events[l][1]._balanced) {
      a = r.events[l][1];
      break;
    }
  return u;
  function u(f) {
    return a ? a._inactive ? o(f) : (i = r.parser.defined.includes(rt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), t.enter("labelEnd"), t.enter("labelMarker"), t.consume(f), t.exit("labelMarker"), t.exit("labelEnd"), h) : n(f);
  }
  function h(f) {
    return f === 40 ? t.attempt(Wi, p, i ? p : o)(f) : f === 91 ? t.attempt(Yi, p, i ? s : o)(f) : i ? p(f) : o(f);
  }
  function s(f) {
    return t.attempt(Zi, p, o)(f);
  }
  function p(f) {
    return e(f);
  }
  function o(f) {
    return a._balanced = !0, n(f);
  }
}
function Ji(t, e, n) {
  return r;
  function r(o) {
    return t.enter("resource"), t.enter("resourceMarker"), t.consume(o), t.exit("resourceMarker"), l;
  }
  function l(o) {
    return M(o) ? wt(t, a)(o) : a(o);
  }
  function a(o) {
    return o === 41 ? p(o) : Nn(t, i, u, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(o);
  }
  function i(o) {
    return M(o) ? wt(t, h)(o) : p(o);
  }
  function u(o) {
    return n(o);
  }
  function h(o) {
    return o === 34 || o === 39 || o === 40 ? zn(t, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(o) : p(o);
  }
  function s(o) {
    return M(o) ? wt(t, p)(o) : p(o);
  }
  function p(o) {
    return o === 41 ? (t.enter("resourceMarker"), t.consume(o), t.exit("resourceMarker"), t.exit("resource"), e) : n(o);
  }
}
function ta(t, e, n) {
  const r = this;
  return l;
  function l(u) {
    return Rn.call(r, t, a, i, "reference", "referenceMarker", "referenceString")(u);
  }
  function a(u) {
    return r.parser.defined.includes(rt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? e(u) : n(u);
  }
  function i(u) {
    return n(u);
  }
}
function na(t, e, n) {
  return r;
  function r(a) {
    return t.enter("reference"), t.enter("referenceMarker"), t.consume(a), t.exit("referenceMarker"), l;
  }
  function l(a) {
    return a === 93 ? (t.enter("referenceMarker"), t.consume(a), t.exit("referenceMarker"), t.exit("reference"), e) : n(a);
  }
}
const ea = {
  name: "labelStartImage",
  resolveAll: qt.resolveAll,
  tokenize: ra
};
function ra(t, e, n) {
  const r = this;
  return l;
  function l(u) {
    return t.enter("labelImage"), t.enter("labelImageMarker"), t.consume(u), t.exit("labelImageMarker"), a;
  }
  function a(u) {
    return u === 91 ? (t.enter("labelMarker"), t.consume(u), t.exit("labelMarker"), t.exit("labelImage"), i) : n(u);
  }
  function i(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(u) : e(u);
  }
}
const ia = {
  name: "labelStartLink",
  resolveAll: qt.resolveAll,
  tokenize: aa
};
function aa(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    return t.enter("labelLink"), t.enter("labelMarker"), t.consume(i), t.exit("labelMarker"), t.exit("labelLink"), a;
  }
  function a(i) {
    return i === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(i) : e(i);
  }
}
const zt = {
  name: "lineEnding",
  tokenize: la
};
function la(t, e) {
  return n;
  function n(r) {
    return t.enter("lineEnding"), t.consume(r), t.exit("lineEnding"), z(t, e, "linePrefix");
  }
}
const Ft = {
  name: "thematicBreak",
  tokenize: ua
};
function ua(t, e, n) {
  let r = 0, l;
  return a;
  function a(s) {
    return t.enter("thematicBreak"), i(s);
  }
  function i(s) {
    return l = s, u(s);
  }
  function u(s) {
    return s === l ? (t.enter("thematicBreakSequence"), h(s)) : r >= 3 && (s === null || A(s)) ? (t.exit("thematicBreak"), e(s)) : n(s);
  }
  function h(s) {
    return s === l ? (t.consume(s), r++, h) : (t.exit("thematicBreakSequence"), L(s) ? z(t, u, "whitespace")(s) : u(s));
  }
}
const Z = {
  continuation: {
    tokenize: ca
  },
  exit: ga,
  name: "list",
  tokenize: ha
}, oa = {
  partial: !0,
  tokenize: pa
}, sa = {
  partial: !0,
  tokenize: ma
};
function ha(t, e, n) {
  const r = this, l = r.events[r.events.length - 1];
  let a = l && l[1].type === "linePrefix" ? l[2].sliceSerialize(l[1], !0).length : 0, i = 0;
  return u;
  function u(c) {
    const b = r.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (b === "listUnordered" ? !r.containerState.marker || c === r.containerState.marker : Bt(c)) {
      if (r.containerState.type || (r.containerState.type = b, t.enter(b, {
        _container: !0
      })), b === "listUnordered")
        return t.enter("listItemPrefix"), c === 42 || c === 45 ? t.check(Ft, n, s)(c) : s(c);
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
      Ct,
      // Can’t be empty when interrupting.
      r.interrupt ? n : p,
      t.attempt(oa, f, o)
    );
  }
  function p(c) {
    return r.containerState.initialBlankLine = !0, a++, f(c);
  }
  function o(c) {
    return L(c) ? (t.enter("listItemPrefixWhitespace"), t.consume(c), t.exit("listItemPrefixWhitespace"), f) : n(c);
  }
  function f(c) {
    return r.containerState.size = a + r.sliceSerialize(t.exit("listItemPrefix"), !0).length, e(c);
  }
}
function ca(t, e, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, t.check(Ct, l, a);
  function l(u) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, z(t, e, "listItemIndent", r.containerState.size + 1)(u);
  }
  function a(u) {
    return r.containerState.furtherBlankLines || !L(u) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, i(u)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(sa, e, i)(u));
  }
  function i(u) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, z(t, t.attempt(Z, e, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(u);
  }
}
function ma(t, e, n) {
  const r = this;
  return z(t, l, "listItemIndent", r.containerState.size + 1);
  function l(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? e(a) : n(a);
  }
}
function ga(t) {
  t.exit(this.containerState.type);
}
function pa(t, e, n) {
  const r = this;
  return z(t, l, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function l(a) {
    const i = r.events[r.events.length - 1];
    return !L(a) && i && i[1].type === "listItemPrefixWhitespace" ? e(a) : n(a);
  }
}
const dn = {
  name: "setextUnderline",
  resolveTo: fa,
  tokenize: ba
};
function fa(t, e) {
  let n = t.length, r, l, a;
  for (; n--; )
    if (t[n][0] === "enter") {
      if (t[n][1].type === "content") {
        r = n;
        break;
      }
      t[n][1].type === "paragraph" && (l = n);
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
  return t[l][1].type = "setextHeadingText", a ? (t.splice(l, 0, ["enter", i, e]), t.splice(a + 1, 0, ["exit", t[r][1], e]), t[r][1].end = {
    ...t[a][1].end
  }) : t[r][1] = i, t.push(["exit", i, e]), t;
}
function ba(t, e, n) {
  const r = this;
  let l;
  return a;
  function a(s) {
    let p = r.events.length, o;
    for (; p--; )
      if (r.events[p][1].type !== "lineEnding" && r.events[p][1].type !== "linePrefix" && r.events[p][1].type !== "content") {
        o = r.events[p][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || o) ? (t.enter("setextHeadingLine"), l = s, i(s)) : n(s);
  }
  function i(s) {
    return t.enter("setextHeadingLineSequence"), u(s);
  }
  function u(s) {
    return s === l ? (t.consume(s), u) : (t.exit("setextHeadingLineSequence"), L(s) ? z(t, h, "lineSuffix")(s) : h(s));
  }
  function h(s) {
    return s === null || A(s) ? (t.exit("setextHeadingLine"), e(s)) : n(s);
  }
}
const da = {
  tokenize: xa
};
function xa(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    Ct,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(this.parser.constructs.flowInitial, l, z(t, t.attempt(this.parser.constructs.flow, l, t.attempt(Ii, l)), "linePrefix"))
  );
  return n;
  function r(a) {
    if (a === null) {
      t.consume(a);
      return;
    }
    return t.enter("lineEndingBlank"), t.consume(a), t.exit("lineEndingBlank"), e.currentConstruct = void 0, n;
  }
  function l(a) {
    if (a === null) {
      t.consume(a);
      return;
    }
    return t.enter("lineEnding"), t.consume(a), t.exit("lineEnding"), e.currentConstruct = void 0, n;
  }
}
const ka = {
  resolveAll: jn()
}, ya = Pn("string"), Ea = Pn("text");
function Pn(t) {
  return {
    resolveAll: jn(t === "text" ? Sa : void 0),
    tokenize: e
  };
  function e(n) {
    const r = this, l = this.parser.constructs[t], a = n.attempt(l, i, u);
    return i;
    function i(p) {
      return s(p) ? a(p) : u(p);
    }
    function u(p) {
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
      const o = l[p];
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
function jn(t) {
  return e;
  function e(n, r) {
    let l = -1, a;
    for (; ++l <= n.length; )
      a === void 0 ? n[l] && n[l][1].type === "data" && (a = l, l++) : (!n[l] || n[l][1].type !== "data") && (l !== a + 2 && (n[a][1].end = n[l - 1][1].end, n.splice(a + 2, l - a - 2), l = a + 2), a = void 0);
    return t ? t(n, r) : n;
  }
}
function Sa(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === "lineEnding") && t[n - 1][1].type === "data") {
      const r = t[n - 1][1], l = e.sliceStream(r);
      let a = l.length, i = -1, u = 0, h;
      for (; a--; ) {
        const s = l[a];
        if (typeof s == "string") {
          for (i = s.length; s.charCodeAt(i - 1) === 32; )
            u++, i--;
          if (i) break;
          i = -1;
        } else if (s === -2)
          h = !0, u++;
        else if (s !== -1) {
          a++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && n === t.length && (u = 0), u) {
        const s = {
          type: n === t.length || h || u < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? i : r.start._bufferIndex + i,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - u,
            offset: r.end.offset - u
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
const Ia = {
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
  62: Fn
}, wa = {
  91: Fi
}, Ta = {
  [-2]: Rt,
  [-1]: Rt,
  32: Rt
}, Ca = {
  35: zi,
  42: Ft,
  45: [dn, Ft],
  60: Mi,
  61: dn,
  95: Ft,
  96: fn,
  126: fn
}, Aa = {
  38: Ln,
  92: Dn
}, Fa = {
  [-5]: zt,
  [-4]: zt,
  [-3]: zt,
  33: ea,
  38: Ln,
  42: Ht,
  60: [ii, Vi],
  91: ia,
  92: [Ni, Dn],
  93: qt,
  95: Ht,
  96: di
}, Da = {
  null: [Ht, ka]
}, La = {
  null: [42, 95]
}, Oa = {
  null: []
}, Na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: La,
  contentInitial: wa,
  disable: Oa,
  document: Ia,
  flow: Ca,
  flowInitial: Ta,
  insideSpan: Da,
  string: Aa,
  text: Fa
}, Symbol.toStringTag, { value: "Module" }));
function Ra(t, e, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const l = {}, a = [];
  let i = [], u = [];
  const h = {
    attempt: N(D),
    check: N(x),
    consume: S,
    enter: E,
    exit: j,
    interrupt: N(x, {
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
  function o(w) {
    return i = G(i, w), F(), i[i.length - 1] !== null ? [] : (_(e, 0), s.events = Ot(a, s.events, s), s.events);
  }
  function f(w, C) {
    return Pa(c(w), C);
  }
  function c(w) {
    return za(i, w);
  }
  function b() {
    const {
      _bufferIndex: w,
      _index: C,
      line: v,
      column: B,
      offset: P
    } = r;
    return {
      _bufferIndex: w,
      _index: C,
      line: v,
      column: B,
      offset: P
    };
  }
  function I(w) {
    l[w.line] = w.column, d();
  }
  function F() {
    let w;
    for (; r._index < i.length; ) {
      const C = i[r._index];
      if (typeof C == "string")
        for (w = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === w && r._bufferIndex < C.length; )
          k(C.charCodeAt(r._bufferIndex));
      else
        k(C);
    }
  }
  function k(w) {
    p = p(w);
  }
  function S(w) {
    A(w) ? (r.line++, r.column = 1, r.offset += w === -3 ? 2 : 1, d()) : w !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    i[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = w;
  }
  function E(w, C) {
    const v = C || {};
    return v.type = w, v.start = b(), s.events.push(["enter", v, s]), u.push(v), v;
  }
  function j(w) {
    const C = u.pop();
    return C.end = b(), s.events.push(["exit", C, s]), C;
  }
  function D(w, C) {
    _(w, C.from);
  }
  function x(w, C) {
    C.restore();
  }
  function N(w, C) {
    return v;
    function v(B, P, q) {
      let U, X, at, m;
      return Array.isArray(B) ? (
        /* c8 ignore next 1 */
        lt(B)
      ) : "tokenize" in B ? (
        // Looks like a construct.
        lt([
          /** @type {Construct} */
          B
        ])
      ) : K(B);
      function K($) {
        return Et;
        function Et(ht) {
          const dt = ht !== null && $[ht], xt = ht !== null && $.null, Nt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(dt) ? dt : dt ? [dt] : [],
            ...Array.isArray(xt) ? xt : xt ? [xt] : []
          ];
          return lt(Nt)(ht);
        }
      }
      function lt($) {
        return U = $, X = 0, $.length === 0 ? q : g($[X]);
      }
      function g($) {
        return Et;
        function Et(ht) {
          return m = H(), at = $, $.partial || (s.currentConstruct = $), $.name && s.parser.constructs.disable.null.includes($.name) ? bt() : $.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            C ? Object.assign(Object.create(s), C) : s,
            h,
            J,
            bt
          )(ht);
        }
      }
      function J($) {
        return w(at, m), P;
      }
      function bt($) {
        return m.restore(), ++X < U.length ? g(U[X]) : q;
      }
    }
  }
  function _(w, C) {
    w.resolveAll && !a.includes(w) && a.push(w), w.resolve && Q(s.events, C, s.events.length - C, w.resolve(s.events.slice(C), s)), w.resolveTo && (s.events = w.resolveTo(s.events, s));
  }
  function H() {
    const w = b(), C = s.previous, v = s.currentConstruct, B = s.events.length, P = Array.from(u);
    return {
      from: B,
      restore: q
    };
    function q() {
      r = w, s.previous = C, s.currentConstruct = v, s.events.length = B, u = P, d();
    }
  }
  function d() {
    r.line in l && r.column < 2 && (r.column = l[r.line], r.offset += l[r.line] - 1);
  }
}
function za(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, l = e.end._index, a = e.end._bufferIndex;
  let i;
  if (n === l)
    i = [t[n].slice(r, a)];
  else {
    if (i = t.slice(n, l), r > -1) {
      const u = i[0];
      typeof u == "string" ? i[0] = u.slice(r) : i.shift();
    }
    a > 0 && i.push(t[l].slice(0, a));
  }
  return i;
}
function Pa(t, e) {
  let n = -1;
  const r = [];
  let l;
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
        if (!e && l) continue;
        i = " ";
        break;
      }
      default:
        i = String.fromCharCode(a);
    }
    l = a === -2, r.push(i);
  }
  return r.join("");
}
function ja(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Tn([Na, ...(t || {}).extensions || []])
    ),
    content: l(Xr),
    defined: [],
    document: l(Jr),
    flow: l(da),
    lazy: {},
    string: l(ya),
    text: l(Ea)
  };
  return r;
  function l(a) {
    return i;
    function i(u) {
      return Ra(r, a, u);
    }
  }
}
function va(t) {
  for (; !On(t); )
    ;
  return t;
}
const xn = /[\0\t\n\r]/g;
function Ma() {
  let t = 1, e = "", n = !0, r;
  return l;
  function l(a, i, u) {
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
    return u && (r && h.push(-5), e && h.push(e), h.push(null)), h;
  }
}
function _a(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), Qr(n)(va(ja(n).document().write(Ma()(t, e, !0))));
}
const Ba = {
  tokenize: Ga,
  partial: !0
}, vn = {
  tokenize: Wa,
  partial: !0
}, Mn = {
  tokenize: Ya,
  partial: !0
}, _n = {
  tokenize: Za,
  partial: !0
}, Ha = {
  tokenize: Qa,
  partial: !0
}, Bn = {
  name: "wwwAutolink",
  tokenize: qa,
  previous: Un
}, Hn = {
  name: "protocolAutolink",
  tokenize: Va,
  previous: $n
}, st = {
  name: "emailAutolink",
  tokenize: $a,
  previous: qn
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
function $a(t, e, n) {
  const r = this;
  let l, a;
  return i;
  function i(o) {
    return !Ut(o) || !qn.call(r, r.previous) || Vt(r.events) ? n(o) : (t.enter("literalAutolink"), t.enter("literalAutolinkEmail"), u(o));
  }
  function u(o) {
    return Ut(o) ? (t.consume(o), u) : o === 64 ? (t.consume(o), h) : n(o);
  }
  function h(o) {
    return o === 46 ? t.check(Ha, p, s)(o) : o === 45 || o === 95 || W(o) ? (a = !0, t.consume(o), h) : p(o);
  }
  function s(o) {
    return t.consume(o), l = !0, h;
  }
  function p(o) {
    return a && l && Y(r.previous) ? (t.exit("literalAutolinkEmail"), t.exit("literalAutolink"), e(o)) : n(o);
  }
}
function qa(t, e, n) {
  const r = this;
  return l;
  function l(i) {
    return i !== 87 && i !== 119 || !Un.call(r, r.previous) || Vt(r.events) ? n(i) : (t.enter("literalAutolink"), t.enter("literalAutolinkWww"), t.check(Ba, t.attempt(vn, t.attempt(Mn, a), n), n)(i));
  }
  function a(i) {
    return t.exit("literalAutolinkWww"), t.exit("literalAutolink"), e(i);
  }
}
function Va(t, e, n) {
  const r = this;
  let l = "", a = !1;
  return i;
  function i(o) {
    return (o === 72 || o === 104) && $n.call(r, r.previous) && !Vt(r.events) ? (t.enter("literalAutolink"), t.enter("literalAutolinkHttp"), l += String.fromCodePoint(o), t.consume(o), u) : n(o);
  }
  function u(o) {
    if (Y(o) && l.length < 5)
      return l += String.fromCodePoint(o), t.consume(o), u;
    if (o === 58) {
      const f = l.toLowerCase();
      if (f === "http" || f === "https")
        return t.consume(o), h;
    }
    return n(o);
  }
  function h(o) {
    return o === 47 ? (t.consume(o), a ? s : (a = !0, h)) : n(o);
  }
  function s(o) {
    return o === null || Dt(o) || M(o) || yt(o) || $t(o) ? n(o) : t.attempt(vn, t.attempt(Mn, p), n)(o);
  }
  function p(o) {
    return t.exit("literalAutolinkHttp"), t.exit("literalAutolink"), e(o);
  }
}
function Ga(t, e, n) {
  let r = 0;
  return l;
  function l(i) {
    return (i === 87 || i === 119) && r < 3 ? (r++, t.consume(i), l) : i === 46 && r === 3 ? (t.consume(i), a) : n(i);
  }
  function a(i) {
    return i === null ? n(i) : e(i);
  }
}
function Wa(t, e, n) {
  let r, l, a;
  return i;
  function i(s) {
    return s === 46 || s === 95 ? t.check(_n, h, u)(s) : s === null || M(s) || yt(s) || s !== 45 && $t(s) ? h(s) : (a = !0, t.consume(s), i);
  }
  function u(s) {
    return s === 95 ? r = !0 : (l = r, r = void 0), t.consume(s), i;
  }
  function h(s) {
    return l || r || !a ? n(s) : e(s);
  }
}
function Ya(t, e) {
  let n = 0, r = 0;
  return l;
  function l(i) {
    return i === 40 ? (n++, t.consume(i), l) : i === 41 && r < n ? a(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? t.check(_n, e, a)(i) : i === null || M(i) || yt(i) ? e(i) : (t.consume(i), l);
  }
  function a(i) {
    return i === 41 && r++, t.consume(i), l;
  }
}
function Za(t, e, n) {
  return r;
  function r(u) {
    return u === 33 || u === 34 || u === 39 || u === 41 || u === 42 || u === 44 || u === 46 || u === 58 || u === 59 || u === 63 || u === 95 || u === 126 ? (t.consume(u), r) : u === 38 ? (t.consume(u), a) : u === 93 ? (t.consume(u), l) : (
      // `<` is an end.
      u === 60 || // So is whitespace.
      u === null || M(u) || yt(u) ? e(u) : n(u)
    );
  }
  function l(u) {
    return u === null || u === 40 || u === 91 || M(u) || yt(u) ? e(u) : r(u);
  }
  function a(u) {
    return Y(u) ? i(u) : n(u);
  }
  function i(u) {
    return u === 59 ? (t.consume(u), r) : Y(u) ? (t.consume(u), i) : n(u);
  }
}
function Qa(t, e, n) {
  return r;
  function r(a) {
    return t.consume(a), l;
  }
  function l(a) {
    return W(a) ? n(a) : e(a);
  }
}
function Un(t) {
  return t === null || t === 40 || t === 42 || t === 95 || t === 91 || t === 93 || t === 126 || M(t);
}
function $n(t) {
  return !Y(t);
}
function qn(t) {
  return !(t === 47 || Ut(t));
}
function Ut(t) {
  return t === 43 || t === 45 || t === 46 || t === 95 || W(t);
}
function Vt(t) {
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
function Xa() {
  return {
    exit: {
      literalAutolinkEmail: Ja,
      literalAutolinkHttp: tl,
      literalAutolinkWww: Ka
    }
  };
}
function Ka(t) {
  Gt.call(this, t, "http://");
}
function Ja(t) {
  Gt.call(this, t, "mailto:");
}
function tl(t) {
  Gt.call(this, t);
}
function Gt(t, e) {
  const n = this.sliceSerialize(t);
  this.tag('<a href="' + pt((e || "") + n) + '">'), this.raw(this.encode(n)), this.tag("</a>");
}
const nl = {
  tokenize: sl,
  partial: !0
};
function el() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: ll,
        continuation: {
          tokenize: ul
        },
        exit: ol
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: al
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: rl,
        resolveTo: il
      }
    }
  };
}
function rl(t, e, n) {
  const r = this;
  let l = r.events.length;
  const a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let i;
  for (; l--; ) {
    const h = r.events[l][1];
    if (h.type === "labelImage") {
      i = h;
      break;
    }
    if (h.type === "gfmFootnoteCall" || h.type === "labelLink" || h.type === "label" || h.type === "image" || h.type === "link")
      break;
  }
  return u;
  function u(h) {
    if (!i || !i._balanced)
      return n(h);
    const s = rt(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }));
    return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(h) : (t.enter("gfmFootnoteCallLabelMarker"), t.consume(h), t.exit("gfmFootnoteCallLabelMarker"), e(h));
  }
}
function il(t, e) {
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
  }, l = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, t[n + 3][1].end),
    end: Object.assign({}, t[n + 3][1].end)
  };
  l.end.column++, l.end.offset++, l.end._bufferIndex++;
  const a = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, l.end),
    end: Object.assign({}, t[t.length - 1][1].start)
  }, i = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, a.start),
    end: Object.assign({}, a.end)
  }, u = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    t[n + 1],
    t[n + 2],
    ["enter", r, e],
    // The `[`
    t[n + 3],
    t[n + 4],
    // The `^`.
    ["enter", l, e],
    ["exit", l, e],
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
  return t.splice(n, t.length - n + 1, ...u), t;
}
function al(t, e, n) {
  const r = this, l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a = 0, i;
  return u;
  function u(o) {
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
      o === null || o === 91 || M(o)
    )
      return n(o);
    if (o === 93) {
      t.exit("chunkString");
      const f = t.exit("gfmFootnoteCallString");
      return l.includes(rt(r.sliceSerialize(f))) ? (t.enter("gfmFootnoteCallLabelMarker"), t.consume(o), t.exit("gfmFootnoteCallLabelMarker"), t.exit("gfmFootnoteCall"), e) : n(o);
    }
    return M(o) || (i = !0), a++, t.consume(o), o === 92 ? p : s;
  }
  function p(o) {
    return o === 91 || o === 92 || o === 93 ? (t.consume(o), a++, s) : s(o);
  }
}
function ll(t, e, n) {
  const r = this, l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a, i = 0, u;
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
      b === 93 && !u || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      b === null || b === 91 || M(b)
    )
      return n(b);
    if (b === 93) {
      t.exit("chunkString");
      const I = t.exit("gfmFootnoteDefinitionLabelString");
      return a = rt(r.sliceSerialize(I)), t.enter("gfmFootnoteDefinitionLabelMarker"), t.consume(b), t.exit("gfmFootnoteDefinitionLabelMarker"), t.exit("gfmFootnoteDefinitionLabel"), f;
    }
    return M(b) || (u = !0), i++, t.consume(b), b === 92 ? o : p;
  }
  function o(b) {
    return b === 91 || b === 92 || b === 93 ? (t.consume(b), i++, p) : p(b);
  }
  function f(b) {
    return b === 58 ? (t.enter("definitionMarker"), t.consume(b), t.exit("definitionMarker"), l.includes(a) || l.push(a), z(t, c, "gfmFootnoteDefinitionWhitespace")) : n(b);
  }
  function c(b) {
    return e(b);
  }
}
function ul(t, e, n) {
  return t.check(Ct, e, t.attempt(nl, e, n));
}
function ol(t) {
  t.exit("gfmFootnoteDefinition");
}
function sl(t, e, n) {
  const r = this;
  return z(t, l, "gfmFootnoteDefinitionIndent", 5);
  function l(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? e(a) : n(a);
  }
}
const hl = {}.hasOwnProperty, cl = {};
function ml(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function gl(t) {
  const e = cl, n = e.label || "Footnotes", r = e.labelTagName || "h2", l = e.labelAttributes === null || e.labelAttributes === void 0 ? 'class="sr-only"' : e.labelAttributes, a = e.backLabel || ml, i = e.clobberPrefix === null || e.clobberPrefix === void 0 ? "user-content-" : e.clobberPrefix;
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
        let u = this.getData("gfmFootnoteDefinitions");
        const h = this.getData("gfmFootnoteDefinitionStack"), s = this.getData("tightStack"), p = h.pop(), o = this.resume();
        u || this.setData("gfmFootnoteDefinitions", u = {}), hl.call(u, p) || (u[p] = o), s.pop(), this.setData("slurpOneLineEnding", !0), this.setData("lastWasTag");
      },
      gfmFootnoteDefinitionLabelString(u) {
        let h = this.getData("gfmFootnoteDefinitionStack");
        h || this.setData("gfmFootnoteDefinitionStack", h = []), h.push(rt(this.sliceSerialize(u))), this.resume(), this.buffer();
      },
      gfmFootnoteCallString(u) {
        let h = this.getData("gfmFootnoteCallOrder"), s = this.getData("gfmFootnoteCallCounts");
        const p = rt(this.sliceSerialize(u));
        let o;
        this.resume(), h || this.setData("gfmFootnoteCallOrder", h = []), s || this.setData("gfmFootnoteCallCounts", s = {});
        const f = h.indexOf(p), c = pt(p.toLowerCase());
        f === -1 ? (h.push(p), s[p] = 1, o = h.length) : (s[p]++, o = f + 1);
        const b = s[p];
        this.tag('<sup><a href="#' + i + "fn-" + c + '" id="' + i + "fnref-" + c + (b > 1 ? "-" + b : "") + '" data-footnote-ref="" aria-describedby="footnote-label">' + String(o) + "</a></sup>");
      },
      null() {
        const u = this.getData("gfmFootnoteCallOrder") || [], h = this.getData("gfmFootnoteCallCounts") || {}, s = this.getData("gfmFootnoteDefinitions") || {};
        let p = -1;
        for (u.length > 0 && (this.lineEndingIfNeeded(), this.tag('<section data-footnotes="" class="footnotes"><' + r + ' id="footnote-label"' + (l ? " " + l : "") + ">"), this.raw(this.encode(n)), this.tag("</" + r + ">"), this.lineEndingIfNeeded(), this.tag("<ol>")); ++p < u.length; ) {
          const o = u[p], f = pt(o.toLowerCase());
          let c = 0;
          const b = [];
          for (; ++c <= h[o]; )
            b.push('<a href="#' + i + "fnref-" + f + (c > 1 ? "-" + c : "") + '" data-footnote-backref="" aria-label="' + this.encode(typeof a == "string" ? a : a(p, c)) + '" class="data-footnote-backref">↩' + (c > 1 ? "<sup>" + c + "</sup>" : "") + "</a>");
          const I = b.join(" ");
          let F = !1;
          this.lineEndingIfNeeded(), this.tag('<li id="' + i + "fn-" + f + '">'), this.lineEndingIfNeeded(), this.tag(s[o].replace(/<\/p>(?:\r?\n|\r)?$/, function(k) {
            return F = !0, " " + I + k;
          })), F || (this.lineEndingIfNeeded(), this.tag(I)), this.lineEndingIfNeeded(), this.tag("</li>");
        }
        u.length > 0 && (this.lineEndingIfNeeded(), this.tag("</ol>"), this.lineEndingIfNeeded(), this.tag("</section>"));
      }
    }
  };
}
function pl() {
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
function fl(t) {
  let n = {}.singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: a,
    resolveAll: l
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
  function l(i, u) {
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
            }, f = [["enter", p, u], ["enter", i[s][1], u], ["exit", i[s][1], u], ["enter", o, u]], c = u.parser.constructs.insideSpan.null;
            c && Q(f, f.length, 0, Ot(c, i.slice(s + 1, h), u)), Q(f, f.length, 0, [["exit", o, u], ["enter", i[h][1], u], ["exit", i[h][1], u], ["exit", p, u]]), Q(i, s - 1, h - s + 3, f), h = s + f.length - 2;
            break;
          }
      }
    for (h = -1; ++h < i.length; )
      i[h][1].type === "strikethroughSequenceTemporary" && (i[h][1].type = "data");
    return i;
  }
  function a(i, u, h) {
    const s = this.previous, p = this.events;
    let o = 0;
    return f;
    function f(b) {
      return s === 126 && p[p.length - 1][1].type !== "characterEscape" ? h(b) : (i.enter("strikethroughSequenceTemporary"), c(b));
    }
    function c(b) {
      const I = Lt(s);
      if (b === 126)
        return o > 1 ? h(b) : (i.consume(b), o++, c);
      if (o < 2 && !n) return h(b);
      const F = i.exit("strikethroughSequenceTemporary"), k = Lt(b);
      return F._open = !k || k === 2 && !!I, F._close = !I || I === 2 && !!k, u(b);
    }
  }
}
const Pt = {
  none: "",
  left: ' align="left"',
  right: ' align="right"',
  center: ' align="center"'
};
function bl() {
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
        this.getData("tableAlign") && (e = e.replace(/\\([\\|])/g, dl)), this.raw(this.encode(e));
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
function dl(t, e) {
  return e === "|" ? e : t;
}
class xl {
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
    kl(this, e, n, r);
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
    let l = r.pop();
    for (; l; ) {
      for (const a of l)
        e.push(a);
      l = r.pop();
    }
    this.map.length = 0;
  }
}
function kl(t, e, n, r) {
  let l = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; l < t.map.length; ) {
      if (t.map[l][0] === e) {
        t.map[l][1] += n, t.map[l][2].push(...r);
        return;
      }
      l += 1;
    }
    t.map.push([e, n, r]);
  }
}
function yl(t, e) {
  let n = !1;
  const r = [];
  for (; e < t.length; ) {
    const l = t[e];
    if (n) {
      if (l[0] === "enter")
        l[1].type === "tableContent" && r.push(t[e + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (l[1].type === "tableContent") {
        if (t[e - 1][1].type === "tableDelimiterMarker") {
          const a = r.length - 1;
          r[a] = r[a] === "left" ? "center" : "right";
        }
      } else if (l[1].type === "tableDelimiterRow")
        break;
    } else l[0] === "enter" && l[1].type === "tableDelimiterRow" && (n = !0);
    e += 1;
  }
  return r;
}
function El() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Sl,
        resolveAll: Il
      }
    }
  };
}
function Sl(t, e, n) {
  const r = this;
  let l = 0, a = 0, i;
  return u;
  function u(d) {
    let w = r.events.length - 1;
    for (; w > -1; ) {
      const B = r.events[w][1].type;
      if (B === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      B === "linePrefix") w--;
      else break;
    }
    const C = w > -1 ? r.events[w][1].type : null, v = C === "tableHead" || C === "tableRow" ? x : h;
    return v === x && r.parser.lazy[r.now().line] ? n(d) : v(d);
  }
  function h(d) {
    return t.enter("tableHead"), t.enter("tableRow"), s(d);
  }
  function s(d) {
    return d === 124 || (i = !0, a += 1), p(d);
  }
  function p(d) {
    return d === null ? n(d) : A(d) ? a > 1 ? (a = 0, r.interrupt = !0, t.exit("tableRow"), t.enter("lineEnding"), t.consume(d), t.exit("lineEnding"), c) : n(d) : L(d) ? z(t, p, "whitespace")(d) : (a += 1, i && (i = !1, l += 1), d === 124 ? (t.enter("tableCellDivider"), t.consume(d), t.exit("tableCellDivider"), i = !0, p) : (t.enter("data"), o(d)));
  }
  function o(d) {
    return d === null || d === 124 || M(d) ? (t.exit("data"), p(d)) : (t.consume(d), d === 92 ? f : o);
  }
  function f(d) {
    return d === 92 || d === 124 ? (t.consume(d), o) : o(d);
  }
  function c(d) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(d) : (t.enter("tableDelimiterRow"), i = !1, L(d) ? z(t, b, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d) : b(d));
  }
  function b(d) {
    return d === 45 || d === 58 ? F(d) : d === 124 ? (i = !0, t.enter("tableCellDivider"), t.consume(d), t.exit("tableCellDivider"), I) : D(d);
  }
  function I(d) {
    return L(d) ? z(t, F, "whitespace")(d) : F(d);
  }
  function F(d) {
    return d === 58 ? (a += 1, i = !0, t.enter("tableDelimiterMarker"), t.consume(d), t.exit("tableDelimiterMarker"), k) : d === 45 ? (a += 1, k(d)) : d === null || A(d) ? j(d) : D(d);
  }
  function k(d) {
    return d === 45 ? (t.enter("tableDelimiterFiller"), S(d)) : D(d);
  }
  function S(d) {
    return d === 45 ? (t.consume(d), S) : d === 58 ? (i = !0, t.exit("tableDelimiterFiller"), t.enter("tableDelimiterMarker"), t.consume(d), t.exit("tableDelimiterMarker"), E) : (t.exit("tableDelimiterFiller"), E(d));
  }
  function E(d) {
    return L(d) ? z(t, j, "whitespace")(d) : j(d);
  }
  function j(d) {
    return d === 124 ? b(d) : d === null || A(d) ? !i || l !== a ? D(d) : (t.exit("tableDelimiterRow"), t.exit("tableHead"), e(d)) : D(d);
  }
  function D(d) {
    return n(d);
  }
  function x(d) {
    return t.enter("tableRow"), N(d);
  }
  function N(d) {
    return d === 124 ? (t.enter("tableCellDivider"), t.consume(d), t.exit("tableCellDivider"), N) : d === null || A(d) ? (t.exit("tableRow"), e(d)) : L(d) ? z(t, N, "whitespace")(d) : (t.enter("data"), _(d));
  }
  function _(d) {
    return d === null || d === 124 || M(d) ? (t.exit("data"), N(d)) : (t.consume(d), d === 92 ? H : _);
  }
  function H(d) {
    return d === 92 || d === 124 ? (t.consume(d), _) : _(d);
  }
}
function Il(t, e) {
  let n = -1, r = !0, l = 0, a = [0, 0, 0, 0], i = [0, 0, 0, 0], u = !1, h = 0, s, p, o;
  const f = new xl();
  for (; ++n < t.length; ) {
    const c = t[n], b = c[1];
    c[0] === "enter" ? b.type === "tableHead" ? (u = !1, h !== 0 && (kn(f, e, h, s, p), p = void 0, h = 0), s = {
      type: "table",
      start: Object.assign({}, b.start),
      // Note: correct end is set later.
      end: Object.assign({}, b.end)
    }, f.add(n, 0, [["enter", s, e]])) : b.type === "tableRow" || b.type === "tableDelimiterRow" ? (r = !0, o = void 0, a = [0, 0, 0, 0], i = [0, n + 1, 0, 0], u && (u = !1, p = {
      type: "tableBody",
      start: Object.assign({}, b.start),
      // Note: correct end is set later.
      end: Object.assign({}, b.end)
    }, f.add(n, 0, [["enter", p, e]])), l = b.type === "tableDelimiterRow" ? 2 : p ? 3 : 1) : l && (b.type === "data" || b.type === "tableDelimiterMarker" || b.type === "tableDelimiterFiller") ? (r = !1, i[2] === 0 && (a[1] !== 0 && (i[0] = i[1], o = At(f, e, a, l, void 0, o), a = [0, 0, 0, 0]), i[2] = n)) : b.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (i[0] = i[1], o = At(f, e, a, l, void 0, o)), a = i, i = [a[1], n, 0, 0])) : b.type === "tableHead" ? (u = !0, h = n) : b.type === "tableRow" || b.type === "tableDelimiterRow" ? (h = n, a[1] !== 0 ? (i[0] = i[1], o = At(f, e, a, l, n, o)) : i[1] !== 0 && (o = At(f, e, i, l, n, o)), l = 0) : l && (b.type === "data" || b.type === "tableDelimiterMarker" || b.type === "tableDelimiterFiller") && (i[3] = n);
  }
  for (h !== 0 && kn(f, e, h, s, p), f.consume(e.events), n = -1; ++n < e.events.length; ) {
    const c = e.events[n];
    c[0] === "enter" && c[1].type === "table" && (c[1]._align = yl(e.events, n));
  }
  return t;
}
function At(t, e, n, r, l, a) {
  const i = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", u = "tableContent";
  n[0] !== 0 && (a.end = Object.assign({}, kt(e.events, n[0])), t.add(n[0], 0, [["exit", a, e]]));
  const h = kt(e.events, n[1]);
  if (a = {
    type: i,
    start: Object.assign({}, h),
    // Note: correct end is set later.
    end: Object.assign({}, h)
  }, t.add(n[1], 0, [["enter", a, e]]), n[2] !== 0) {
    const s = kt(e.events, n[2]), p = kt(e.events, n[3]), o = {
      type: u,
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
  return l !== void 0 && (a.end = Object.assign({}, kt(e.events, l)), t.add(l, 0, [["exit", a, e]]), a = void 0), a;
}
function kn(t, e, n, r, l) {
  const a = [], i = kt(e.events, n);
  l && (l.end = Object.assign({}, i), a.push(["exit", l, e])), r.end = Object.assign({}, i), a.push(["exit", r, e]), t.add(n + 1, 0, a);
}
function kt(t, e) {
  const n = t[e], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const Vn = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi, wl = new RegExp("^" + Vn.source, "i");
function Tl() {
  return {
    exit: {
      htmlFlowData(t) {
        yn.call(this, t, Vn);
      },
      htmlTextData(t) {
        yn.call(this, t, wl);
      }
    }
  };
}
function yn(t, e) {
  let n = this.sliceSerialize(t);
  this.options.allowDangerousHtml && (n = n.replace(e, "&lt;$1$2")), this.raw(this.encode(n));
}
function Cl() {
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
const Al = {
  name: "tasklistCheck",
  tokenize: Dl
};
function Fl() {
  return {
    text: {
      91: Al
    }
  };
}
function Dl(t, e, n) {
  const r = this;
  return l;
  function l(h) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? n(h) : (t.enter("taskListCheck"), t.enter("taskListCheckMarker"), t.consume(h), t.exit("taskListCheckMarker"), a)
    );
  }
  function a(h) {
    return M(h) ? (t.enter("taskListCheckValueUnchecked"), t.consume(h), t.exit("taskListCheckValueUnchecked"), i) : h === 88 || h === 120 ? (t.enter("taskListCheckValueChecked"), t.consume(h), t.exit("taskListCheckValueChecked"), i) : n(h);
  }
  function i(h) {
    return h === 93 ? (t.enter("taskListCheckMarker"), t.consume(h), t.exit("taskListCheckMarker"), t.exit("taskListCheck"), u) : n(h);
  }
  function u(h) {
    return A(h) ? e(h) : L(h) ? t.check({
      tokenize: Ll
    }, e, n)(h) : n(h);
  }
}
function Ll(t, e, n) {
  return z(t, r, "whitespace");
  function r(l) {
    return l === null ? n(l) : e(l);
  }
}
function Ol(t) {
  return Tn([
    Ua(),
    el(),
    fl(),
    El(),
    Fl()
  ]);
}
function Nl(t) {
  return Cn([
    Xa(),
    gl(),
    pl(),
    bl(),
    Tl(),
    Cl()
  ]);
}
const Rl = "[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}[class*=shj-lang-]{color:#c9d1d9;background:#161b22}[class*=shj-lang-]:before{color:#6f9aff}.shj-syn-insert{color:#98c379}.shj-syn-deleted,.shj-syn-err,.shj-syn-kwd{color:#ff7b72}.shj-syn-class{color:#ffa657}.shj-numbers,.shj-syn-cmnt{color:#8b949e}.shj-syn-type,.shj-syn-oper,.shj-syn-num,.shj-syn-section,.shj-syn-var,.shj-syn-bool{color:#79c0ff}.shj-syn-str{color:#a5d6ff}.shj-syn-func{color:#d2a8ff}";
var zl = Object.defineProperty, Pl = (t) => (e) => {
  var n = t[e];
  if (n) return n();
  throw new Error("Module not found in bundle: " + e);
}, O = (t, e) => () => (t && (e = t(t = 0)), e), R = (t, e) => {
  for (var n in e) zl(t, n, { get: e[n], enumerable: !0 });
}, Gn = {};
R(Gn, { default: () => Wn });
var Wn, jl = O(() => {
  Wn = [{ type: "cmnt", match: /(;|#).*/gm }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\$[\da-fA-F]*\b/g }, { type: "kwd", match: /^[a-z]+\s+[a-z.]+\b/gm, sub: [{ type: "func", match: /^[a-z]+/g }] }, { type: "kwd", match: /^\t*[a-z][a-z\d]*\b/gm }, { match: /%|\$/g, type: "oper" }];
}), Yn = {};
R(Yn, { default: () => Wt });
var jt, Wt, Zn = O(() => {
  jt = { type: "var", match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g }, Wt = [{ sub: "todo", match: /#.*/g }, { type: "str", match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g, sub: [jt] }, { type: "oper", match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi }, { type: "kwd", match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g }, { expand: "num" }, { type: "func", match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gmi }, { type: "bool", match: /(?<=\s|^)(true|false)(?=\s|$)/g }, { type: "oper", match: /[=(){}<>!]+/g }, { type: "var", match: /(?<=\s|^)[\w_]+(?=\s*=)/g }, jt];
}), Qn = {};
R(Qn, { default: () => Xn });
var Xn, vl = O(() => {
  Xn = [{ match: /[^\[\->+.<\]\s].*/g, sub: "todo" }, { type: "func", match: /\.+/g }, { type: "kwd", match: /[<>]+/g }, { type: "oper", match: /[+-]+/g }];
}), Kn = {};
R(Kn, { default: () => Jn });
var Jn, Ml = O(() => {
  Jn = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /#\s*include (<.*>|".*")/g, sub: [{ type: "str", match: /(<|").*/g }] }, { match: /asm\s*{[^}]*}/g, sub: [{ type: "kwd", match: /^asm/g }, { match: /[^{}]*(?=}$)/g, sub: "asm" }] }, { type: "kwd", match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), te = {};
R(te, { default: () => ne });
var ne, _l = O(() => {
  ne = [{ match: /\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g }, { type: "var", match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g }, { type: "func", match: /#[\w-]+(?=[^{}]*{)/g }, { type: "num", match: /#[\da-f]{3,8}/g }, { type: "num", match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g, sub: [{ type: "var", match: /[a-z]+|%/g }] }, { match: /url\([^)]*\)/g, sub: [{ type: "func", match: /url(?=\()/g }, { type: "str", match: /[^()]+/g }] }, { type: "func", match: /\b[a-zA-Z]\w*(?=\s*\()/g }, { type: "num", match: /\b[a-z-]+\b/g }];
}), ee = {};
R(ee, { default: () => re });
var re, Bl = O(() => {
  re = [{ expand: "strDouble" }, { type: "oper", match: /,/g }];
}), ie = {};
R(ie, { default: () => Yt });
var Yt, ae = O(() => {
  Yt = [{ type: "deleted", match: /^[-<].*/gm }, { type: "insert", match: /^[+>].*/gm }, { type: "kwd", match: /!.*/gm }, { type: "section", match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm }];
}), le = {};
R(le, { default: () => ue });
var ue, Hl = O(() => {
  Zn(), ue = [{ type: "kwd", match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gmi }, ...Wt];
}), oe = {};
R(oe, { default: () => se });
var se, Ul = O(() => {
  ae(), se = [{ match: /^#.*/gm, sub: "todo" }, { expand: "str" }, ...Yt, { type: "func", match: /^(\$ )?git(\s.*)?$/gm }, { type: "kwd", match: /^commit \w+$/gm }];
}), he = {};
R(he, { default: () => ce });
var ce, $l = O(() => {
  ce = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "oper", match: /[+\-*\/%&|^~=!<>.^-]+/g }];
}), me = {};
R(me, { default: () => Zt, name: () => ct, properties: () => ft, xmlElement: () => ot });
var vt, En, ct, ft, ot, Zt, ge = O(() => {
  vt = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", En = vt + "\\-\\.0-9·̀-ͯ‿-⁀", ct = `[${vt}][${En}]*`, ft = `\\s*(\\s+${ct}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`, ot = { match: RegExp(`<[/!?]?${ct}${ft}[/!?]?>`, "g"), sub: [{ type: "var", match: RegExp(`^<[/!?]?${ct}`, "g"), sub: [{ type: "oper", match: /^<[\/!?]?/g }] }, { type: "str", match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g, sub: [{ type: "oper", match: /^=/g }] }, { type: "oper", match: /[\/!?]?>/g }, { type: "class", match: RegExp(ct, "g") }] }, Zt = [{ match: /<!--((?!-->)[^])*-->/g, sub: "todo" }, { type: "class", match: /<!\[CDATA\[[\s\S]*?\]\]>/gi }, ot, { type: "str", match: RegExp(`<\\?${ct}([^?]|\\?[^?>])*\\?+>`, "g"), sub: [{ type: "var", match: RegExp(`^<\\?${ct}`, "g"), sub: [{ type: "oper", match: /^<\?/g }] }, { type: "oper", match: /\?+>$/g }] }, { type: "var", match: /&(#x?)?[\da-z]{1,8};/gi }];
}), pe = {};
R(pe, { default: () => fe });
var fe, ql = O(() => {
  ge(), fe = [{ type: "class", match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi, sub: [{ type: "str", match: /"[^"]*"|'[^']*'/g }, { type: "oper", match: /^<!|>$/g }, { type: "var", match: /DOCTYPE/gi }] }, { match: RegExp(`<style${ft}>((?!</style>)[^])*</style\\s*>`, "g"), sub: [{ match: RegExp(`^<style${ft}>`, "g"), sub: ot.sub }, { match: RegExp(`${ot.match}|[^]*(?=</style\\s*>$)`, "g"), sub: "css" }, ot] }, { match: RegExp(`<script${ft}>((?!<\/script>)[^])*<\/script\\s*>`, "g"), sub: [{ match: RegExp(`^<script${ft}>`, "g"), sub: ot.sub }, { match: RegExp(`${ot.match}|[^]*(?=<\/script\\s*>$)`, "g"), sub: "js" }, ot] }, ...Zt];
}), Sn, Tt, Qt = O(() => {
  Sn = [["bash", [/#!(\/usr)?\/bin\/bash/g, 500], [/\b(if|elif|then|fi|echo)\b|\$/g, 10]], ["html", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^\s+<!DOCTYPE\s+html/g, 500]], ["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]], ["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g, 10]], ["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|implements|interface|namespace)\b/g, 10]], ["py", [/\b(def|print|class|and|or|lambda)\b/g, 10]], ["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]], ["pl", [/#!(\/usr)?\/bin\/perl/g, 500], [/\b(use|print)\b|\$/g, 10]], ["lua", [/#!(\/usr)?\/bin\/lua/g, 500]], ["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]], ["uri", [/https?:|mailto:|tel:|ftp:/g, 30]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["diff", [/^[+><-]/gm, 10], [/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]], ["md", [/^(>|\t\*|\t\d+.)/gm, 10], [/\[.*\](.*)/g, 10]], ["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]], ["xml", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^<\?xml/g, 500]], ["c", [/#include\b|\bprintf\s+\(/g, 100]], ["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]], ["go", [/\b(func|fmt|package)\b/g, 100]], ["java", [/^import\s+java/gm, 500]], ["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]], ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]], ["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]], ["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gmi, 10]]], Tt = (t) => Sn.map(([e, ...n]) => [e, n.reduce((r, [l, a]) => r + [...t.matchAll(l)].length * a, 0)]).filter(([e, n]) => n > 20).sort((e, n) => n[1] - e[1])[0]?.[0] || "plain";
}), be = {};
R(be, { default: () => de });
var de, Vl = O(() => {
  Qt(), de = [{ type: "kwd", match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm }, { expand: "str" }, { type: "section", match: /\bHTTP\/[\d.]+\b/g }, { expand: "num" }, { type: "oper", match: /[,;:=]/g }, { type: "var", match: /[a-zA-Z][\w-]*(?=:)/g }, { match: /\n\n[^]*/g, sub: Tt }];
}), xe = {};
R(xe, { default: () => ke });
var ke, Gl = O(() => {
  ke = [{ match: /(^[ \f\t\v]*)[#;].*/gm, sub: "todo" }, { type: "str", match: /.*/g }, { type: "var", match: /.*(?==)/g }, { type: "section", match: /^\s*\[.+\]\s*$/gm }, { type: "oper", match: /=/g }];
}), ye = {};
R(ye, { default: () => Ee });
var Ee, Wl = O(() => {
  Ee = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*\()/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), Se = {};
R(Se, { default: () => Xt });
var Xt, Ie = O(() => {
  Xt = [{ match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g, sub: "jsdoc" }, { match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { match: /`((?!`)[^]|\\[^])*`?/g, sub: "js_template_literals" }, { type: "kwd", match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g }, { match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g, sub: "regex" }, { expand: "num" }, { type: "num", match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g }];
}), we = {};
R(we, { default: () => Te, type: () => Ce });
var Te, Ce, Yl = O(() => {
  Te = [{ match: new class {
    exec(t) {
      let e = this.lastIndex, n, r = (l) => {
        for (; ++e < t.length - 2; ) if (t[e] == "{") r();
        else if (t[e] == "}") return;
      };
      for (; e < t.length; ++e) if (t[e - 1] != "\\" && t[e] == "$" && t[e + 1] == "{") return n = e++, r(), this.lastIndex = e + 1, { index: n, 0: t.slice(n, e + 1) };
      return null;
    }
  }(), sub: [{ type: "kwd", match: /^\${|}$/g }, { match: /(?!^\$|{)[^]+(?=}$)/g, sub: "js" }] }], Ce = "str";
}), Ae = {};
R(Ae, { default: () => Kt, type: () => Fe });
var Kt, Fe, De = O(() => {
  Kt = [{ type: "err", match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g }, { type: "class", match: /\bIDEA\b/g }, { type: "insert", match: /\b(CHANGED|FIX|CHANGE)\b/g }, { type: "oper", match: /\bQUESTION\b/g }], Fe = "cmnt";
}), Le = {};
R(Le, { default: () => Oe, type: () => Ne });
var Oe, Ne, Zl = O(() => {
  De(), Oe = [{ type: "kwd", match: /@\w+/g }, { type: "class", match: /{[\w\s|<>,.@\[\]]+}/g }, { type: "var", match: /\[[\w\s="']+\]/g }, ...Kt], Ne = "cmnt";
}), Re = {};
R(Re, { default: () => ze });
var ze, Ql = O(() => {
  ze = [{ type: "var", match: /(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g }, { expand: "str" }, { expand: "num" }, { type: "num", match: /\bnull\b/g }, { type: "bool", match: /\b(true|false)\b/g }];
}), Pe = {};
R(Pe, { default: () => Jt });
var Jt, je = O(() => {
  Qt(), Jt = [{ type: "cmnt", match: /^>.*|(=|-)\1+/gm }, { type: "class", match: /\*\*((?!\*\*).)*\*\*/g }, { match: /```((?!```)[^])*\n```/g, sub: (t) => ({ type: "kwd", sub: [{ match: /\n[^]*(?=```)/g, sub: t.split(`
`)[0].slice(3) || Tt(t) }] }) }, { type: "str", match: /`[^`]*`/g }, { type: "var", match: /~~((?!~~).)*~~/g }, { type: "kwd", match: /\b_\S([^\n]*?\S)?_\b|\*\S([^\n]*?\S)?\*/g }, { type: "kwd", match: /^\s*(\*|\d+\.)\s/gm }, { type: "func", match: /\[[^\]]*]\([^)]*\)|<[^>]*>/g, sub: [{ type: "oper", match: /^\[[^\]]*]/g }] }];
}), ve = {};
R(ve, { default: () => Me });
var Me, Xl = O(() => {
  je(), Qt(), Me = [{ type: "insert", match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g, sub: [{ type: "insert", match: /leanpub-(start|end)-insert/g }, { match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g, sub: Tt }] }, { type: "deleted", match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g, sub: [{ type: "deleted", match: /leanpub-(start|end)-delete/g }, { match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g, sub: Tt }] }, ...Jt];
}), _e = {};
R(_e, { default: () => Be });
var Be, Kl = O(() => {
  Be = [{ type: "cmnt", match: /^#.*/gm }, { expand: "strDouble" }, { expand: "num" }, { type: "err", match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi }, { type: "num", match: /\b(null|undefined)\b/gi }, { type: "bool", match: /\b(false|true|yes|no)\b/gi }, { type: "oper", match: /\.|,/g }];
}), He = {};
R(He, { default: () => Ue });
var Ue, Jl = O(() => {
  Ue = [{ match: /^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g, sub: "todo" }, { expand: "str" }, { type: "kwd", match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g }, { type: "bool", match: /\b(true|false|nil)\b/g }, { type: "oper", match: /[+*/%^#=~<>:,.-]+/g }, { expand: "num" }, { type: "func", match: /[a-z_]+(?=\s*[({])/g }];
}), $e = {};
R($e, { default: () => qe });
var qe, tu = O(() => {
  qe = [{ match: /^\s*#.*/gm, sub: "todo" }, { expand: "str" }, { type: "oper", match: /[${}()]+/g }, { type: "class", match: /.PHONY:/gm }, { type: "section", match: /^[\w.]+:/gm }, { type: "kwd", match: /\b(ifneq|endif)\b/g }, { expand: "num" }, { type: "var", match: /[A-Z_]+(?=\s*=)/g }, { match: /^.*$/gm, sub: "bash" }];
}), Ve = {};
R(Ve, { default: () => Ge });
var Ge, nu = O(() => {
  Ge = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /(["'])(\\[^]|(?!\1)[^])*\1?/g }, { expand: "num" }, { type: "kwd", match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g }, { type: "oper", match: /[-+*/%~!&<>|=?,]+/g }, { type: "func", match: /[a-z_]+(?=\s*\()/g }];
}), We = {};
R(We, { default: () => Ye });
var Ye, eu = O(() => {
  Ye = [{ expand: "strDouble" }];
}), Ze = {};
R(Ze, { default: () => Qe });
var Qe, ru = O(() => {
  Qe = [{ match: /#.*/g, sub: "todo" }, { match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g, sub: "todo" }, { type: "str", match: /f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi, sub: [{ type: "var", match: /{[^{}]*}/g, sub: [{ match: /(?!^{)[^]*(?=}$)/g, sub: "py" }] }] }, { expand: "str" }, { type: "kwd", match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g }, { type: "bool", match: /\b(False|True|None)\b/g }, { expand: "num" }, { type: "func", match: /[a-z_]\w*(?=\s*\()/gi }, { type: "oper", match: /[-/*+<>,=!&|^%]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }];
}), Xe = {};
R(Xe, { default: () => Ke, type: () => Je });
var Ke, Je, iu = O(() => {
  Ke = [{ match: /^(?!\/).*/gm, sub: "todo" }, { type: "num", match: /\[((?!\])[^\\]|\\.)*\]/g }, { type: "kwd", match: /\||\^|\$|\\.|\w+($|\r|\n)/g }, { type: "var", match: /\*|\+|\{\d+,\d+\}/g }], Je = "oper";
}), tr = {};
R(tr, { default: () => nr });
var nr, au = O(() => {
  nr = [{ match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { expand: "num" }, { type: "kwd", match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g }, { type: "oper", match: /[/*+:?&|%^~=!,<>.^-]+/g }, { type: "class", match: /\b[A-Z][\w_]*\b/g }, { type: "func", match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g }];
}), er = {};
R(er, { default: () => rr });
var rr, lu = O(() => {
  rr = [{ match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g, sub: "todo" }, { expand: "str" }, { type: "func", match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g }, { type: "kwd", match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g }, { type: "num", match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g }, { type: "bool", match: /\b(TRUE|FALSE)\b/g }, { type: "oper", match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g }, { type: "var", match: /@\S+/g }];
}), ir = {};
R(ir, { default: () => ar });
var ar, uu = O(() => {
  ar = [{ match: /#.*/g, sub: "todo" }, { type: "str", match: /("""|''')((?!\1)[^]|\\[^])*\1?/g }, { expand: "str" }, { type: "section", match: /^\[.+\]\s*$/gm }, { type: "num", match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g }, { expand: "num" }, { type: "bool", match: /\b(true|false)\b/g }, { type: "oper", match: /[+,.=-]/g }, { type: "var", match: /\w+(?= \=)/g }];
}), lr = {};
R(lr, { default: () => ur });
var ur, ou = O(() => {
  Ie(), ur = [{ type: "type", match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g }, { type: "kwd", match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g }, ...Xt];
}), or = {};
R(or, { default: () => sr });
var sr, su = O(() => {
  sr = [{ match: /^#.*/gm, sub: "todo" }, { type: "class", match: /^\w+(?=:?)/gm }, { type: "num", match: /:\d+/g }, { type: "oper", match: /[:/&?]|\w+=/g }, { type: "func", match: /[.\w]+@|#[\w]+$/gm }, { type: "var", match: /\w+\.\w+(\.\w+)*/g }];
}), hr = {};
R(hr, { default: () => cr });
var cr, hu = O(() => {
  cr = [{ match: /#.*/g, sub: "todo" }, { expand: "str" }, { type: "str", match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g }, { type: "type", match: /!![a-z]+/g }, { type: "bool", match: /\b(Yes|No)\b/g }, { type: "oper", match: /[+:-]/g }, { expand: "num" }, { type: "var", match: /[a-zA-Z]\w*(?=:)/g }];
}), cu = { num: { type: "num", match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g }, str: { type: "str", match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g }, strDouble: { type: "str", match: /"((?!")[^\r\n\\]|\\[^])*"?/g } }, mu = Pl({ "./languages/asm.js": () => Promise.resolve().then(() => (jl(), Gn)), "./languages/bash.js": () => Promise.resolve().then(() => (Zn(), Yn)), "./languages/bf.js": () => Promise.resolve().then(() => (vl(), Qn)), "./languages/c.js": () => Promise.resolve().then(() => (Ml(), Kn)), "./languages/css.js": () => Promise.resolve().then(() => (_l(), te)), "./languages/csv.js": () => Promise.resolve().then(() => (Bl(), ee)), "./languages/diff.js": () => Promise.resolve().then(() => (ae(), ie)), "./languages/docker.js": () => Promise.resolve().then(() => (Hl(), le)), "./languages/git.js": () => Promise.resolve().then(() => (Ul(), oe)), "./languages/go.js": () => Promise.resolve().then(() => ($l(), he)), "./languages/html.js": () => Promise.resolve().then(() => (ql(), pe)), "./languages/http.js": () => Promise.resolve().then(() => (Vl(), be)), "./languages/ini.js": () => Promise.resolve().then(() => (Gl(), xe)), "./languages/java.js": () => Promise.resolve().then(() => (Wl(), ye)), "./languages/js.js": () => Promise.resolve().then(() => (Ie(), Se)), "./languages/js_template_literals.js": () => Promise.resolve().then(() => (Yl(), we)), "./languages/jsdoc.js": () => Promise.resolve().then(() => (Zl(), Le)), "./languages/json.js": () => Promise.resolve().then(() => (Ql(), Re)), "./languages/leanpub-md.js": () => Promise.resolve().then(() => (Xl(), ve)), "./languages/log.js": () => Promise.resolve().then(() => (Kl(), _e)), "./languages/lua.js": () => Promise.resolve().then(() => (Jl(), He)), "./languages/make.js": () => Promise.resolve().then(() => (tu(), $e)), "./languages/md.js": () => Promise.resolve().then(() => (je(), Pe)), "./languages/pl.js": () => Promise.resolve().then(() => (nu(), Ve)), "./languages/plain.js": () => Promise.resolve().then(() => (eu(), We)), "./languages/py.js": () => Promise.resolve().then(() => (ru(), Ze)), "./languages/regex.js": () => Promise.resolve().then(() => (iu(), Xe)), "./languages/rs.js": () => Promise.resolve().then(() => (au(), tr)), "./languages/sql.js": () => Promise.resolve().then(() => (lu(), er)), "./languages/todo.js": () => Promise.resolve().then(() => (De(), Ae)), "./languages/toml.js": () => Promise.resolve().then(() => (uu(), ir)), "./languages/ts.js": () => Promise.resolve().then(() => (ou(), lr)), "./languages/uri.js": () => Promise.resolve().then(() => (su(), or)), "./languages/xml.js": () => Promise.resolve().then(() => (ge(), me)), "./languages/yaml.js": () => Promise.resolve().then(() => (hu(), hr)) }), In = {}, gu = (t = "") => t.replaceAll("&", "&#38;").replaceAll?.("<", "&lt;").replaceAll?.(">", "&gt;"), pu = (t, e) => e ? `<span class="shj-syn-${e}">${t}</span>` : t;
async function mr(t, e, n) {
  try {
    let r, l, a = {}, i, u = [], h = 0, s = typeof e == "string" ? await (In[e] ?? (In[e] = mu(`./languages/${e}.js`))) : e, p = [...typeof e == "string" ? s.default : e.sub];
    for (; h < t.length; ) {
      for (a.index = null, r = p.length; r-- > 0; ) {
        if (l = p[r].expand ? cu[p[r].expand] : p[r], u[r] === void 0 || u[r].match.index < h) {
          if (l.match.lastIndex = h, i = l.match.exec(t), i === null) {
            p.splice(r, 1), u.splice(r, 1);
            continue;
          }
          u[r] = { match: i, lastIndex: l.match.lastIndex };
        }
        u[r].match[0] && (u[r].match.index <= a.index || a.index === null) && (a = { part: l, index: u[r].match.index, match: u[r].match[0], end: u[r].lastIndex });
      }
      if (a.index === null) break;
      n(t.slice(h, a.index), s.type), h = a.end, a.part.sub ? await mr(a.match, typeof a.part.sub == "string" ? a.part.sub : typeof a.part.sub == "function" ? a.part.sub(a.match) : a.part, n) : n(a.match, a.part.type);
    }
    n(t.slice(h, t.length), s.type);
  } catch {
    n(t);
  }
}
async function fu(t, e, n = !0, r = {}) {
  let l = "";
  return await mr(t, e, (a, i) => l += pu(gu(a), i)), n ? `<div><div class="shj-numbers">${"<div></div>".repeat(!r.hideLineNumbers && t.split(`
`).length)}</div><div>${l}</div></div>` : l;
}
async function bu(t, e = t.className.match(/shj-lang-([\w-]+)/)?.[1], n, r) {
  let l = t.textContent;
  t.dataset.lang = e, t.className = `${[...t.classList].filter((a) => !a.startsWith("shj-")).join(" ")} shj-lang-${e} shj-${n}`, t.innerHTML = await fu(l, e, n == "multiline", r);
}
const du = "[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}[class*=shj-lang-]{color:#24292f;background:#fff}.shj-syn-deleted,.shj-syn-err,.shj-syn-kwd{color:#cf222e}.shj-syn-class{color:#953800}.shj-numbers,.shj-syn-cmnt{color:#6e7781}.shj-syn-type,.shj-syn-oper,.shj-syn-num,.shj-syn-section,.shj-syn-var,.shj-syn-bool{color:#0550ae}.shj-syn-str{color:#0a3069}.shj-syn-func{color:#8250df}", xu = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
class Su {
  options;
  themeIds = { light: "theme-light", dark: "theme-dark" };
  themeCss = { light: du, dark: Rl };
  constructor() {
    this.options = {
      allowDangerousHtml: !1,
      extensions: [Ol()],
      htmlExtensions: [Nl(), this.createPresenterCodeBlockHtmlExtension()]
    }, this.injectThemes(), console.log(1111), this.injectCodeFont(), console.log(2222), this.switchTheme(Eu());
  }
  injectCodeFont() {
    Mt(`
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
            article div[class^="shj-lang-"] {
                font-family: 'Fira Code', 'Fira Mono', monospace !important;
            }`, "code-font");
  }
  // Operations - Render.
  render(e) {
    return _a(e, this.options);
  }
  highlight() {
    document.querySelectorAll('div[class^="shj-lang-"]').forEach((e) => {
      (/shj-lang-([^\s]+)/.exec(e.className) || [])[1] && bu(e, "js", "multiline", { hideLineNumbers: !0 });
    });
  }
  switchTheme(e) {
    const n = e === "light" ? this.themeIds.light : this.themeIds.dark;
    yu(n);
  }
  injectThemes() {
    Mt(this.themeCss.light, this.themeIds.light), Mt(this.themeCss.dark, this.themeIds.dark);
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
`), l = n.lang || "plain", a = n.meta || "";
          let i = "";
          l === "json" && a === "datapos-visual" ? i = `<div class="${a}" data-options="${encodeURIComponent(r)}"></div>` : l === "json" && a === "datapos-highcharts" ? i = `<div class="${a}" data-options="${encodeURIComponent(r)}"></div>` : i = `<div class="shj-lang-${l.replaceAll(/[^a-z0-9_-]/gi, "")}">${ku(r)}</div>`, this.raw(i), e = void 0;
        }
      }
    };
  }
}
function ku(t) {
  return t.replaceAll(/[&<>"']/g, (e) => xu[e]);
}
function Mt(t, e) {
  if (typeof document > "u") return;
  let n = document.getElementById(e);
  return n || (n = document.createElement("style"), n.id = e, n.dataset.dynamic = "true", document.head.appendChild(n)), n.innerHTML = t, n;
}
function yu(t) {
  document.querySelectorAll("style[data-dynamic]").forEach((e) => {
    e.disabled = e.id !== t;
  });
}
function Eu() {
  return globalThis.window === void 0 ? "light" : globalThis.window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
export {
  Su as MicromarkTool
};
