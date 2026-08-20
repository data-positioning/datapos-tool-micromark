import { n as e, t } from "./micromark-factory-whitespace-DvA2Lja_.js";
import { a as n, c as r, d as i, f as a, i as o, l as s, n as c, o as l, p as u, r as d, s as f, t as p, u as m } from "./micromark-factory-space-Cq-2i9SZ.js";
//#region \0rolldown/runtime.js
var h = Object.defineProperty, g = (e, t) => {
	let n = {};
	for (var r in e) h(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || h(n, Symbol.toStringTag, { value: "Module" }), n;
};
//#endregion
//#region node_modules/micromark-util-chunked/index.js
function _(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function v(e, t) {
	return e.length > 0 ? (_(e, e.length, 0, t), e) : t;
}
//#endregion
//#region node_modules/micromark-util-combine-extensions/index.js
var y = {}.hasOwnProperty;
function b(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) x(t, e[n]);
	return t;
}
function x(e, t) {
	let n;
	for (n in t) {
		let r = (y.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			y.call(r, a) || (r[a] = []);
			let e = i[a];
			S(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function S(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	_(e, 0, 0, r);
}
function C(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) w(t, e[n]);
	return t;
}
function w(e, t) {
	let n;
	for (n in t) {
		let r = (y.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) r[a] = i[a];
	}
}
//#endregion
//#region node_modules/micromark-util-decode-numeric-character-reference/index.js
function T(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
//#endregion
//#region node_modules/micromark-util-encode/index.js
var E = {
	"\"": "quot",
	"&": "amp",
	"<": "lt",
	">": "gt"
};
function D(e) {
	return e.replace(/["&<>]/g, t);
	function t(e) {
		return "&" + E[e] + ";";
	}
}
//#endregion
//#region node_modules/micromark-util-normalize-identifier/index.js
function O(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
//#endregion
//#region node_modules/micromark-util-sanitize-uri/index.js
function k(e, t) {
	let n = D(A(e || ""));
	if (!t) return n;
	let r = n.indexOf(":"), i = n.indexOf("?"), a = n.indexOf("#"), o = n.indexOf("/");
	return r < 0 || o > -1 && r > o || i > -1 && r > i || a > -1 && r > a || t.test(n.slice(0, r)) ? n : "";
}
function A(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && d(e.charCodeAt(n + 1)) && d(e.charCodeAt(n + 2))) i = 2;
		else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
		else if (a > 55295 && a < 57344) {
			let t = e.charCodeAt(n + 1);
			a < 56320 && t > 56319 && t < 57344 ? (o = String.fromCharCode(a, t), i = 1) : o = "�";
		} else o = String.fromCharCode(a);
		o &&= (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, ""), i &&= (n += i, 0);
	}
	return t.join("") + e.slice(r);
}
//#endregion
//#region node_modules/micromark/lib/compile.js
var j = {}.hasOwnProperty, M = /^(https?|ircs?|mailto|xmpp)$/i, N = /^https?$/i;
function P(t) {
	let n = t || {}, r = !0, i = {}, a = [[]], o = [], s = [], c = C([{
		enter: {
			blockQuote: B,
			codeFenced: ee,
			codeFencedFenceInfo: g,
			codeFencedFenceMeta: g,
			codeIndented: re,
			codeText: je,
			content: ge,
			definition: q,
			definitionDestinationString: pe,
			definitionLabelString: g,
			definitionTitleString: g,
			emphasis: ke,
			htmlFlow: Ee,
			htmlText: Oe,
			image: W,
			label: g,
			link: ae,
			listItemMarker: I,
			listItemValue: F,
			listOrdered: A,
			listUnordered: P,
			paragraph: H,
			reference: g,
			resource: le,
			resourceDestinationString: ue,
			resourceTitleString: g,
			setextHeading: ve,
			strong: Ae
		},
		exit: {
			atxHeading: be,
			atxHeadingSequence: _e,
			autolinkEmail: ze,
			autolinkProtocol: Re,
			blockQuote: V,
			characterEscapeValue: Y,
			characterReferenceMarkerHexadecimal: Ie,
			characterReferenceMarkerNumeric: Ie,
			characterReferenceValue: Le,
			codeFenced: ie,
			codeFencedFence: ne,
			codeFencedFenceInfo: te,
			codeFencedFenceMeta: E,
			codeFlowValue: we,
			codeIndented: ie,
			codeText: Me,
			codeTextData: Y,
			data: Y,
			definition: he,
			definitionDestinationString: me,
			definitionLabelString: fe,
			definitionTitleString: J,
			emphasis: Ne,
			hardBreakEscape: Te,
			hardBreakTrailing: Te,
			htmlFlow: De,
			htmlFlowData: Y,
			htmlText: De,
			htmlTextData: Y,
			image: K,
			label: se,
			labelText: oe,
			lineEnding: Ce,
			link: K,
			listOrdered: L,
			listUnordered: R,
			paragraph: U,
			reference: E,
			referenceString: ce,
			resource: E,
			resourceDestinationString: de,
			resourceTitleString: G,
			setextHeading: Se,
			setextHeadingLineSequence: xe,
			setextHeadingText: ye,
			strong: Pe,
			thematicBreak: Fe
		}
	}, ...n.htmlExtensions || []]), l = {
		definitions: i,
		tightStack: s
	}, u = {
		buffer: g,
		encode: w,
		getData: h,
		lineEndingIfNeeded: S,
		options: n,
		raw: b,
		resume: _,
		setData: m,
		tag: y
	}, d = n.defaultLineEnding;
	return f;
	function f(e) {
		let t = -1, n = 0, r = [], i = [], o = [];
		for (; ++t < e.length;) !d && (e[t][1].type === "lineEnding" || e[t][1].type === "lineEndingBlank") && (d = e[t][2].sliceSerialize(e[t][1])), (e[t][1].type === "listOrdered" || e[t][1].type === "listUnordered") && (e[t][0] === "enter" ? r.push(t) : p(e.slice(r.pop(), t))), e[t][1].type === "definition" && (e[t][0] === "enter" ? (o = v(o, e.slice(n, t)), n = t) : (i = v(i, e.slice(n, t + 1)), n = t + 1));
		i = v(i, o), i = v(i, e.slice(n)), t = -1;
		let s = i;
		for (c.enter.null && c.enter.null.call(u); ++t < e.length;) {
			let e = c[s[t][0]], n = s[t][1].type, r = e[n];
			j.call(e, n) && r && r.call({
				sliceSerialize: s[t][2].sliceSerialize,
				...u
			}, s[t][1]);
		}
		return c.exit.null && c.exit.null.call(u), a[0].join("");
	}
	function p(e) {
		let t = e.length, n = 0, r = 0, i = !1, a;
		for (; ++n < t;) {
			let t = e[n];
			if (t[1]._container) a = void 0, t[0] === "enter" ? r++ : r--;
			else switch (t[1].type) {
				case "listItemPrefix":
					t[0] === "exit" && (a = !0);
					break;
				case "linePrefix": break;
				case "lineEndingBlank":
					t[0] === "enter" && !r && (a ? a = void 0 : i = !0);
					break;
				default: a = void 0;
			}
		}
		e[0][1]._loose = i;
	}
	function m(e, t) {
		l[e] = t;
	}
	function h(e) {
		return l[e];
	}
	function g() {
		a.push([]);
	}
	function _() {
		return a.pop().join("");
	}
	function y(e) {
		r && (m("lastWasTag", !0), a[a.length - 1].push(e));
	}
	function b(e) {
		m("lastWasTag"), a[a.length - 1].push(e);
	}
	function x() {
		b(d || "\n");
	}
	function S() {
		let e = a[a.length - 1], t = e[e.length - 1], n = t ? t.charCodeAt(t.length - 1) : null;
		n !== 10 && n !== 13 && n !== null && x();
	}
	function w(e) {
		return h("ignoreEncode") ? e : D(e);
	}
	function E() {
		_();
	}
	function A(e) {
		s.push(!e._loose), S(), y("<ol"), m("expectFirstItem", !0);
	}
	function P(e) {
		s.push(!e._loose), S(), y("<ul"), m("expectFirstItem", !0);
	}
	function F(e) {
		if (h("expectFirstItem")) {
			let t = Number.parseInt(this.sliceSerialize(e), 10);
			t !== 1 && y(" start=\"" + w(String(t)) + "\"");
		}
	}
	function I() {
		h("expectFirstItem") ? y(">") : z(), S(), y("<li>"), m("expectFirstItem"), m("lastWasTag");
	}
	function L() {
		z(), s.pop(), x(), y("</ol>");
	}
	function R() {
		z(), s.pop(), x(), y("</ul>");
	}
	function z() {
		h("lastWasTag") && !h("slurpAllLineEndings") && S(), y("</li>"), m("slurpAllLineEndings");
	}
	function B() {
		s.push(!1), S(), y("<blockquote>");
	}
	function V() {
		s.pop(), S(), y("</blockquote>"), m("slurpAllLineEndings");
	}
	function H() {
		s[s.length - 1] || (S(), y("<p>")), m("slurpAllLineEndings");
	}
	function U() {
		s[s.length - 1] ? m("slurpAllLineEndings", !0) : y("</p>");
	}
	function ee() {
		S(), y("<pre><code"), m("fencesCount", 0);
	}
	function te() {
		y(" class=\"language-" + _() + "\"");
	}
	function ne() {
		let e = h("fencesCount") || 0;
		e || (y(">"), m("slurpOneLineEnding", !0)), m("fencesCount", e + 1);
	}
	function re() {
		S(), y("<pre><code>");
	}
	function ie() {
		let e = h("fencesCount");
		e !== void 0 && e < 2 && l.tightStack.length > 0 && !h("lastWasTag") && x(), h("flowCodeSeenData") && S(), y("</code></pre>"), e !== void 0 && e < 2 && S(), m("flowCodeSeenData"), m("fencesCount"), m("slurpOneLineEnding");
	}
	function W() {
		o.push({ image: !0 }), r = void 0;
	}
	function ae() {
		o.push({});
	}
	function oe(e) {
		o[o.length - 1].labelId = this.sliceSerialize(e);
	}
	function se() {
		o[o.length - 1].label = _();
	}
	function ce(e) {
		o[o.length - 1].referenceId = this.sliceSerialize(e);
	}
	function le() {
		g(), o[o.length - 1].destination = "";
	}
	function ue() {
		g(), m("ignoreEncode", !0);
	}
	function de() {
		o[o.length - 1].destination = _(), m("ignoreEncode");
	}
	function G() {
		o[o.length - 1].title = _();
	}
	function K() {
		let e = o.length - 1, t = o[e], a = t.referenceId || t.labelId, s = t.destination === void 0 ? i[O(a)] : t;
		for (r = !0; e--;) if (o[e].image) {
			r = void 0;
			break;
		}
		t.image ? (y("<img src=\"" + k(s.destination, n.allowDangerousProtocol ? void 0 : N) + "\" alt=\""), b(t.label), y("\"")) : y("<a href=\"" + k(s.destination, n.allowDangerousProtocol ? void 0 : M) + "\""), y(s.title ? " title=\"" + s.title + "\"" : ""), t.image ? y(" />") : (y(">"), b(t.label), y("</a>")), o.pop();
	}
	function q() {
		g(), o.push({});
	}
	function fe(e) {
		_(), o[o.length - 1].labelId = this.sliceSerialize(e);
	}
	function pe() {
		g(), m("ignoreEncode", !0);
	}
	function me() {
		o[o.length - 1].destination = _(), m("ignoreEncode");
	}
	function J() {
		o[o.length - 1].title = _();
	}
	function he() {
		let e = o[o.length - 1], t = O(e.labelId);
		_(), j.call(i, t) || (i[t] = o[o.length - 1]), o.pop();
	}
	function ge() {
		m("slurpAllLineEndings", !0);
	}
	function _e(e) {
		h("headingRank") || (m("headingRank", this.sliceSerialize(e).length), S(), y("<h" + h("headingRank") + ">"));
	}
	function ve() {
		g(), m("slurpAllLineEndings");
	}
	function ye() {
		m("slurpAllLineEndings", !0);
	}
	function be() {
		y("</h" + h("headingRank") + ">"), m("headingRank");
	}
	function xe(e) {
		m("headingRank", this.sliceSerialize(e).charCodeAt(0) === 61 ? 1 : 2);
	}
	function Se() {
		let e = _();
		S(), y("<h" + h("headingRank") + ">"), b(e), y("</h" + h("headingRank") + ">"), m("slurpAllLineEndings"), m("headingRank");
	}
	function Y(e) {
		b(w(this.sliceSerialize(e)));
	}
	function Ce(e) {
		if (!h("slurpAllLineEndings")) {
			if (h("slurpOneLineEnding")) {
				m("slurpOneLineEnding");
				return;
			}
			if (h("inCodeText")) {
				b(" ");
				return;
			}
			b(w(this.sliceSerialize(e)));
		}
	}
	function we(e) {
		b(w(this.sliceSerialize(e))), m("flowCodeSeenData", !0);
	}
	function Te() {
		y("<br />");
	}
	function Ee() {
		S(), Oe();
	}
	function De() {
		m("ignoreEncode");
	}
	function Oe() {
		n.allowDangerousHtml && m("ignoreEncode", !0);
	}
	function ke() {
		y("<em>");
	}
	function Ae() {
		y("<strong>");
	}
	function je() {
		m("inCodeText", !0), y("<code>");
	}
	function Me() {
		m("inCodeText"), y("</code>");
	}
	function Ne() {
		y("</em>");
	}
	function Pe() {
		y("</strong>");
	}
	function Fe() {
		S(), y("<hr />");
	}
	function Ie(e) {
		m("characterReferenceType", e.type);
	}
	function Le(t) {
		let n = this.sliceSerialize(t);
		b(w(h("characterReferenceType") ? T(n, h("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : e(n))), m("characterReferenceType");
	}
	function Re(e) {
		let t = this.sliceSerialize(e);
		y("<a href=\"" + k(t, n.allowDangerousProtocol ? void 0 : M) + "\">"), b(w(t)), y("</a>");
	}
	function ze(e) {
		let t = this.sliceSerialize(e);
		y("<a href=\"" + k("mailto:" + t) + "\">"), b(w(t)), y("</a>");
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/content.js
var F = { tokenize: I };
function I(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) {
			e.consume(n);
			return;
		}
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), p(e, t, "linePrefix");
	}
	function i(t) {
		return e.enter("paragraph"), a(t);
	}
	function a(t) {
		let r = e.enter("chunkText", {
			contentType: "text",
			previous: n
		});
		return n && (n.next = r), n = r, o(t);
	}
	function o(t) {
		if (t === null) {
			e.exit("chunkText"), e.exit("paragraph"), e.consume(t);
			return;
		}
		return s(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/document.js
var L = { tokenize: z }, R = { tokenize: B };
function z(e) {
	let t = this, n = [], r = 0, i, a, o;
	return c;
	function c(i) {
		if (r < n.length) {
			let a = n[r];
			return t.containerState = a[1], e.attempt(a[0].continuation, l, u)(i);
		}
		return u(i);
	}
	function l(e) {
		if (r++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && b();
			let n = t.events.length, a = n, o;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				o = t.events[a][1].end;
				break;
			}
			y(r);
			let s = n;
			for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
			return _(t.events, a + 1, 0, t.events.slice(n)), t.events.length = s, u(e);
		}
		return c(e);
	}
	function u(a) {
		if (r === n.length) {
			if (!i) return p(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return h(a);
			t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(R, d, f)(a);
	}
	function d(e) {
		return i && b(), y(r), p(e);
	}
	function f(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, h(e);
	}
	function p(n) {
		return t.containerState = {}, e.attempt(R, m, h)(n);
	}
	function m(e) {
		return r++, n.push([t.currentConstruct, t.containerState]), p(e);
	}
	function h(n) {
		if (n === null) {
			i && b(), y(0), e.consume(n);
			return;
		}
		return i ||= t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: a
		}), g(n);
	}
	function g(n) {
		if (n === null) {
			v(e.exit("chunkFlow"), !0), y(0), e.consume(n);
			return;
		}
		return s(n) ? (e.consume(n), v(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, c) : (e.consume(n), g);
	}
	function v(e, n) {
		let s = t.sliceStream(e);
		if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
			let e = i.events.length;
			for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
			let n = t.events.length, a = n, s, c;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				if (s) {
					c = t.events[a][1].end;
					break;
				}
				s = !0;
			}
			for (y(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
			_(t.events, a + 1, 0, t.events.slice(n)), t.events.length = e;
		}
	}
	function y(r) {
		let i = n.length;
		for (; i-- > r;) {
			let r = n[i];
			t.containerState = r[1], r[0].exit.call(t, e);
		}
		n.length = r;
	}
	function b() {
		i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function B(e, t, n) {
	return p(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
//#endregion
//#region node_modules/micromark-util-classify-character/index.js
function V(e) {
	if (e === null || m(e) || u(e)) return 1;
	if (a(e)) return 2;
}
//#endregion
//#region node_modules/micromark-util-resolve-all/index.js
function H(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/attention.js
var U = {
	name: "attention",
	resolveAll: ee,
	tokenize: te
};
function ee(e, t) {
	let n = -1, r, i, a, o, s, c, l, u;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		for (r = n; r--;) if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
			let d = { ...e[r][1].end }, f = { ...e[n][1].start };
			ne(d, -c), ne(f, c), o = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: d,
				end: { ...e[r][1].end }
			}, s = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: f
			}, a = {
				type: c > 1 ? "strongText" : "emphasisText",
				start: { ...e[r][1].end },
				end: { ...e[n][1].start }
			}, i = {
				type: c > 1 ? "strong" : "emphasis",
				start: { ...o.start },
				end: { ...s.end }
			}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = v(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])), l = v(l, [
				[
					"enter",
					i,
					t
				],
				[
					"enter",
					o,
					t
				],
				[
					"exit",
					o,
					t
				],
				[
					"enter",
					a,
					t
				]
			]), l = v(l, H(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = v(l, [
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					s,
					t
				],
				[
					"exit",
					s,
					t
				],
				[
					"exit",
					i,
					t
				]
			]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = v(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])) : u = 0, _(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function te(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = V(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = V(o), u = !l || l === 2 && i || n.includes(o), d = !i || i === 2 && l || n.includes(r);
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function ne(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/autolink.js
var re = {
	name: "autolink",
	tokenize: ie
};
function ie(e, t, r) {
	let i = 0;
	return a;
	function a(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), s;
	}
	function s(t) {
		return c(t) ? (e.consume(t), l) : t === 64 ? r(t) : p(t);
	}
	function l(e) {
		return e === 43 || e === 45 || e === 46 || d(e) ? (i = 1, u(e)) : p(e);
	}
	function u(t) {
		return t === 58 ? (e.consume(t), i = 0, f) : (t === 43 || t === 45 || t === 46 || d(t)) && i++ < 32 ? (e.consume(t), u) : (i = 0, p(t));
	}
	function f(i) {
		return i === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(i), e.exit("autolinkMarker"), e.exit("autolink"), t) : i === null || i === 32 || i === 60 || n(i) ? r(i) : (e.consume(i), f);
	}
	function p(t) {
		return t === 64 ? (e.consume(t), m) : o(t) ? (e.consume(t), p) : r(t);
	}
	function m(e) {
		return d(e) ? h(e) : r(e);
	}
	function h(n) {
		return n === 46 ? (e.consume(n), i = 0, m) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : g(n);
	}
	function g(t) {
		if ((t === 45 || d(t)) && i++ < 63) {
			let n = t === 45 ? g : h;
			return e.consume(t), n;
		}
		return r(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/blank-line.js
var W = {
	partial: !0,
	tokenize: ae
};
function ae(e, t, n) {
	return r;
	function r(t) {
		return i(t) ? p(e, a, "linePrefix")(t) : a(t);
	}
	function a(e) {
		return e === null || s(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/block-quote.js
var oe = {
	continuation: { tokenize: ce },
	exit: le,
	name: "blockQuote",
	tokenize: se
};
function se(e, t, n) {
	let r = this;
	return a;
	function a(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open ||= (e.enter("blockQuote", { _container: !0 }), !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), o;
		}
		return n(t);
	}
	function o(n) {
		return i(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function ce(e, t, n) {
	let r = this;
	return a;
	function a(t) {
		return i(t) ? p(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : o(t);
	}
	function o(r) {
		return e.attempt(oe, t, n)(r);
	}
}
function le(e) {
	e.exit("blockQuote");
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-escape.js
var ue = {
	name: "characterEscape",
	tokenize: de
};
function de(e, t, n) {
	return i;
	function i(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), a;
	}
	function a(i) {
		return r(i) ? (e.enter("characterEscapeValue"), e.consume(i), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(i);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-reference.js
var G = {
	name: "characterReference",
	tokenize: K
};
function K(t, n, r) {
	let i = this, a = 0, o, s;
	return c;
	function c(e) {
		return t.enter("characterReference"), t.enter("characterReferenceMarker"), t.consume(e), t.exit("characterReferenceMarker"), u;
	}
	function u(e) {
		return e === 35 ? (t.enter("characterReferenceMarkerNumeric"), t.consume(e), t.exit("characterReferenceMarkerNumeric"), p) : (t.enter("characterReferenceValue"), o = 31, s = d, m(e));
	}
	function p(e) {
		return e === 88 || e === 120 ? (t.enter("characterReferenceMarkerHexadecimal"), t.consume(e), t.exit("characterReferenceMarkerHexadecimal"), t.enter("characterReferenceValue"), o = 6, s = f, m) : (t.enter("characterReferenceValue"), o = 7, s = l, m(e));
	}
	function m(c) {
		if (c === 59 && a) {
			let a = t.exit("characterReferenceValue");
			return s === d && !e(i.sliceSerialize(a)) ? r(c) : (t.enter("characterReferenceMarker"), t.consume(c), t.exit("characterReferenceMarker"), t.exit("characterReference"), n);
		}
		return s(c) && a++ < o ? (t.consume(c), m) : r(c);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-fenced.js
var q = {
	partial: !0,
	tokenize: me
}, fe = {
	concrete: !0,
	name: "codeFenced",
	tokenize: pe
};
function pe(e, t, n) {
	let r = this, a = {
		partial: !0,
		tokenize: w
	}, o = 0, c = 0, l;
	return u;
	function u(e) {
		return d(e);
	}
	function d(t) {
		let n = r.events[r.events.length - 1];
		return o = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, l = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(t);
	}
	function f(t) {
		return t === l ? (c++, e.consume(t), f) : c < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), i(t) ? p(e, m, "whitespace")(t) : m(t));
	}
	function m(n) {
		return n === null || s(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(q, v, C)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), h(n));
	}
	function h(t) {
		return t === null || s(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), m(t)) : i(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(e, g, "whitespace")(t)) : t === 96 && t === l ? n(t) : (e.consume(t), h);
	}
	function g(t) {
		return t === null || s(t) ? m(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), _(t));
	}
	function _(t) {
		return t === null || s(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), m(t)) : t === 96 && t === l ? n(t) : (e.consume(t), _);
	}
	function v(t) {
		return e.attempt(a, C, y)(t);
	}
	function y(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), b;
	}
	function b(t) {
		return o > 0 && i(t) ? p(e, x, "linePrefix", o + 1)(t) : x(t);
	}
	function x(t) {
		return t === null || s(t) ? e.check(q, v, C)(t) : (e.enter("codeFlowValue"), S(t));
	}
	function S(t) {
		return t === null || s(t) ? (e.exit("codeFlowValue"), x(t)) : (e.consume(t), S);
	}
	function C(n) {
		return e.exit("codeFenced"), t(n);
	}
	function w(e, t, n) {
		let a = 0;
		return o;
		function o(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), u;
		}
		function u(t) {
			return e.enter("codeFencedFence"), i(t) ? p(e, d, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : d(t);
		}
		function d(t) {
			return t === l ? (e.enter("codeFencedFenceSequence"), f(t)) : n(t);
		}
		function f(t) {
			return t === l ? (a++, e.consume(t), f) : a >= c ? (e.exit("codeFencedFenceSequence"), i(t) ? p(e, m, "whitespace")(t) : m(t)) : n(t);
		}
		function m(r) {
			return r === null || s(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
function me(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-indented.js
var J = {
	name: "codeIndented",
	tokenize: ge
}, he = {
	partial: !0,
	tokenize: _e
};
function ge(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("codeIndented"), p(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let t = r.events[r.events.length - 1];
		return t && t[1].type === "linePrefix" && t[2].sliceSerialize(t[1], !0).length >= 4 ? o(e) : n(e);
	}
	function o(t) {
		return t === null ? l(t) : s(t) ? e.attempt(he, o, l)(t) : (e.enter("codeFlowValue"), c(t));
	}
	function c(t) {
		return t === null || s(t) ? (e.exit("codeFlowValue"), o(t)) : (e.consume(t), c);
	}
	function l(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function _e(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.parser.lazy[r.now().line] ? n(t) : s(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), i) : p(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let a = r.events[r.events.length - 1];
		return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : s(e) ? i(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-text.js
var ve = {
	name: "codeText",
	previous: be,
	resolve: ye,
	tokenize: xe
};
function ye(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function be(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function xe(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), c(t);
	}
	function c(t) {
		return t === 96 ? (e.consume(t), r++, c) : (e.exit("codeTextSequence"), l(t));
	}
	function l(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), l) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, d(t)) : s(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), l) : (e.enter("codeTextData"), u(t));
	}
	function u(t) {
		return t === null || t === 32 || t === 96 || s(t) ? (e.exit("codeTextData"), l(t)) : (e.consume(t), u);
	}
	function d(n) {
		return n === 96 ? (e.consume(n), i++, d) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", u(n));
	}
}
//#endregion
//#region node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var Se = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && Y(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), Y(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), Y(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
			if (e < this.left.length) {
				let t = this.left.splice(e, Infinity);
				Y(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
				Y(this.left, t.reverse());
			}
		}
	}
};
function Y(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
//#endregion
//#region node_modules/micromark-util-subtokenize/index.js
function Ce(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new Se(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, we(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (o[1].type !== "linePrefix" && o[1].type !== "listItemIndent") break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return _(e, 0, Infinity, u.slice(0)), !l;
}
function we(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/content.js
var Te = {
	resolve: De,
	tokenize: Oe
}, Ee = {
	partial: !0,
	tokenize: ke
};
function De(e) {
	return Ce(e), e;
}
function Oe(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : s(t) ? e.check(Ee, o, a)(t) : (e.consume(t), i);
	}
	function a(n) {
		return e.exit("chunkContent"), e.exit("content"), t(n);
	}
	function o(t) {
		return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
			contentType: "content",
			previous: n
		}), n = n.next, i;
	}
}
function ke(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || s(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
//#endregion
//#region node_modules/micromark-factory-destination/index.js
function Ae(e, t, r, i, a, o, c, l, u) {
	let d = u || Infinity, f = 0;
	return p;
	function p(t) {
		return t === 60 ? (e.enter(i), e.enter(a), e.enter(o), e.consume(t), e.exit(o), h) : t === null || t === 32 || t === 41 || n(t) ? r(t) : (e.enter(i), e.enter(c), e.enter(l), e.enter("chunkString", { contentType: "string" }), v(t));
	}
	function h(n) {
		return n === 62 ? (e.enter(o), e.consume(n), e.exit(o), e.exit(a), e.exit(i), t) : (e.enter(l), e.enter("chunkString", { contentType: "string" }), g(n));
	}
	function g(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(l), h(t)) : t === null || t === 60 || s(t) ? r(t) : (e.consume(t), t === 92 ? _ : g);
	}
	function _(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), g) : g(t);
	}
	function v(a) {
		return !f && (a === null || a === 41 || m(a)) ? (e.exit("chunkString"), e.exit(l), e.exit(c), e.exit(i), t(a)) : f < d && a === 40 ? (e.consume(a), f++, v) : a === 41 ? (e.consume(a), f--, v) : a === null || a === 32 || a === 40 || n(a) ? r(a) : (e.consume(a), a === 92 ? y : v);
	}
	function y(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), v) : v(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-label/index.js
function je(e, t, n, r, a, o) {
	let c = this, l = 0, u;
	return d;
	function d(t) {
		return e.enter(r), e.enter(a), e.consume(t), e.exit(a), e.enter(o), f;
	}
	function f(i) {
		return l > 999 || i === null || i === 91 || i === 93 && !u || 
		/* c8 ignore next 3 */
		i === 94 && !l && "_hiddenFootnoteSupport" in c.parser.constructs ? n(i) : i === 93 ? (e.exit(o), e.enter(a), e.consume(i), e.exit(a), e.exit(r), t) : s(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), f) : (e.enter("chunkString", { contentType: "string" }), p(i));
	}
	function p(t) {
		return t === null || t === 91 || t === 93 || s(t) || l++ > 999 ? (e.exit("chunkString"), f(t)) : (e.consume(t), u ||= !i(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), l++, p) : p(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-title/index.js
function Me(e, t, n, r, i, a) {
	let o;
	return c;
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, l) : n(t);
	}
	function l(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), u(n));
	}
	function u(t) {
		return t === o ? (e.exit(a), l(o)) : t === null ? n(t) : s(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p(e, u, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), d(t));
	}
	function d(t) {
		return t === o || t === null || s(t) ? (e.exit("chunkString"), u(t)) : (e.consume(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === o || t === 92 ? (e.consume(t), d) : d(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/definition.js
var Ne = {
	name: "definition",
	tokenize: Fe
}, Pe = {
	partial: !0,
	tokenize: Ie
};
function Fe(e, n, r) {
	let a = this, o;
	return c;
	function c(t) {
		return e.enter("definition"), l(t);
	}
	function l(t) {
		return je.call(a, e, u, r, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function u(t) {
		return o = O(a.sliceSerialize(a.events[a.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), d) : r(t);
	}
	function d(n) {
		return m(n) ? t(e, f)(n) : f(n);
	}
	function f(t) {
		return Ae(e, h, r, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function h(t) {
		return e.attempt(Pe, g, g)(t);
	}
	function g(t) {
		return i(t) ? p(e, _, "whitespace")(t) : _(t);
	}
	function _(t) {
		return t === null || s(t) ? (e.exit("definition"), a.parser.defined.push(o), n(t)) : r(t);
	}
}
function Ie(e, n, r) {
	return a;
	function a(n) {
		return m(n) ? t(e, o)(n) : r(n);
	}
	function o(t) {
		return Me(e, c, r, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function c(t) {
		return i(t) ? p(e, l, "whitespace")(t) : l(t);
	}
	function l(e) {
		return e === null || s(e) ? n(e) : r(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var Le = {
	name: "hardBreakEscape",
	tokenize: Re
};
function Re(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return s(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/heading-atx.js
var ze = {
	name: "headingAtx",
	resolve: Be,
	tokenize: Ve
};
function Be(e, t) {
	let n = e.length - 2, r = 3, i, a;
	return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
		type: "atxHeadingText",
		start: e[r][1].start,
		end: e[n][1].end
	}, a = {
		type: "chunkText",
		start: e[r][1].start,
		end: e[n][1].end,
		contentType: "text"
	}, _(e, r, n - r + 1, [
		[
			"enter",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"exit",
			a,
			t
		],
		[
			"exit",
			i,
			t
		]
	])), e;
}
function Ve(e, t, n) {
	let r = 0;
	return a;
	function a(t) {
		return e.enter("atxHeading"), o(t);
	}
	function o(t) {
		return e.enter("atxHeadingSequence"), c(t);
	}
	function c(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), c) : t === null || m(t) ? (e.exit("atxHeadingSequence"), l(t)) : n(t);
	}
	function l(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), u(n)) : n === null || s(n) ? (e.exit("atxHeading"), t(n)) : i(n) ? p(e, l, "whitespace")(n) : (e.enter("atxHeadingText"), d(n));
	}
	function u(t) {
		return t === 35 ? (e.consume(t), u) : (e.exit("atxHeadingSequence"), l(t));
	}
	function d(t) {
		return t === null || t === 35 || m(t) ? (e.exit("atxHeadingText"), l(t)) : (e.consume(t), d);
	}
}
//#endregion
//#region node_modules/micromark-util-html-tag-name/index.js
var He = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), Ue = [
	"pre",
	"script",
	"style",
	"textarea"
], We = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: qe,
	tokenize: Je
}, Ge = {
	partial: !0,
	tokenize: Xe
}, Ke = {
	partial: !0,
	tokenize: Ye
};
function qe(e) {
	let t = e.length;
	for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Je(e, t, n) {
	let r = this, a, o, l, u, f;
	return p;
	function p(e) {
		return h(e);
	}
	function h(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), g;
	}
	function g(i) {
		return i === 33 ? (e.consume(i), _) : i === 47 ? (e.consume(i), o = !0, b) : i === 63 ? (e.consume(i), a = 3, r.interrupt ? t : V) : c(i) ? (e.consume(i), l = String.fromCharCode(i), x) : n(i);
	}
	function _(i) {
		return i === 45 ? (e.consume(i), a = 2, v) : i === 91 ? (e.consume(i), a = 5, u = 0, y) : c(i) ? (e.consume(i), a = 4, r.interrupt ? t : V) : n(i);
	}
	function v(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : V) : n(i);
	}
	function y(i) {
		return i === "CDATA[".charCodeAt(u++) ? (e.consume(i), u === 6 ? r.interrupt ? t : N : y) : n(i);
	}
	function b(t) {
		return c(t) ? (e.consume(t), l = String.fromCharCode(t), x) : n(t);
	}
	function x(i) {
		if (i === null || i === 47 || i === 62 || m(i)) {
			let s = i === 47, c = l.toLowerCase();
			return !s && !o && Ue.includes(c) ? (a = 1, r.interrupt ? t(i) : N(i)) : He.includes(l.toLowerCase()) ? (a = 6, s ? (e.consume(i), S) : r.interrupt ? t(i) : N(i)) : (a = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(i) : o ? C(i) : w(i));
		}
		return i === 45 || d(i) ? (e.consume(i), l += String.fromCharCode(i), x) : n(i);
	}
	function S(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : N) : n(i);
	}
	function C(t) {
		return i(t) ? (e.consume(t), C) : j(t);
	}
	function w(t) {
		return t === 47 ? (e.consume(t), j) : t === 58 || t === 95 || c(t) ? (e.consume(t), T) : i(t) ? (e.consume(t), w) : j(t);
	}
	function T(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || d(t) ? (e.consume(t), T) : E(t);
	}
	function E(t) {
		return t === 61 ? (e.consume(t), D) : i(t) ? (e.consume(t), E) : w(t);
	}
	function D(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), f = t, O) : i(t) ? (e.consume(t), D) : k(t);
	}
	function O(t) {
		return t === f ? (e.consume(t), f = null, A) : t === null || s(t) ? n(t) : (e.consume(t), O);
	}
	function k(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || m(t) ? E(t) : (e.consume(t), k);
	}
	function A(e) {
		return e === 47 || e === 62 || i(e) ? w(e) : n(e);
	}
	function j(t) {
		return t === 62 ? (e.consume(t), M) : n(t);
	}
	function M(t) {
		return t === null || s(t) ? N(t) : i(t) ? (e.consume(t), M) : n(t);
	}
	function N(t) {
		return t === 45 && a === 2 ? (e.consume(t), L) : t === 60 && a === 1 ? (e.consume(t), R) : t === 62 && a === 4 ? (e.consume(t), H) : t === 63 && a === 3 ? (e.consume(t), V) : t === 93 && a === 5 ? (e.consume(t), B) : s(t) && (a === 6 || a === 7) ? (e.exit("htmlFlowData"), e.check(Ge, U, P)(t)) : t === null || s(t) ? (e.exit("htmlFlowData"), P(t)) : (e.consume(t), N);
	}
	function P(t) {
		return e.check(Ke, F, U)(t);
	}
	function F(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), I;
	}
	function I(t) {
		return t === null || s(t) ? P(t) : (e.enter("htmlFlowData"), N(t));
	}
	function L(t) {
		return t === 45 ? (e.consume(t), V) : N(t);
	}
	function R(t) {
		return t === 47 ? (e.consume(t), l = "", z) : N(t);
	}
	function z(t) {
		if (t === 62) {
			let n = l.toLowerCase();
			return Ue.includes(n) ? (e.consume(t), H) : N(t);
		}
		return c(t) && l.length < 8 ? (e.consume(t), l += String.fromCharCode(t), z) : N(t);
	}
	function B(t) {
		return t === 93 ? (e.consume(t), V) : N(t);
	}
	function V(t) {
		return t === 62 ? (e.consume(t), H) : t === 45 && a === 2 ? (e.consume(t), V) : N(t);
	}
	function H(t) {
		return t === null || s(t) ? (e.exit("htmlFlowData"), U(t)) : (e.consume(t), H);
	}
	function U(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function Ye(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return s(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a) : n(t);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
function Xe(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(W, t, n);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/html-text.js
var Ze = {
	name: "htmlText",
	tokenize: Qe
};
function Qe(e, t, n) {
	let r = this, a, o, l;
	return u;
	function u(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), f;
	}
	function f(t) {
		return t === 33 ? (e.consume(t), h) : t === 47 ? (e.consume(t), D) : t === 63 ? (e.consume(t), T) : c(t) ? (e.consume(t), A) : n(t);
	}
	function h(t) {
		return t === 45 ? (e.consume(t), g) : t === 91 ? (e.consume(t), o = 0, b) : c(t) ? (e.consume(t), w) : n(t);
	}
	function g(t) {
		return t === 45 ? (e.consume(t), y) : n(t);
	}
	function _(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), v) : s(t) ? (l = _, z(t)) : (e.consume(t), _);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), y) : _(t);
	}
	function y(e) {
		return e === 62 ? R(e) : e === 45 ? v(e) : _(e);
	}
	function b(t) {
		return t === "CDATA[".charCodeAt(o++) ? (e.consume(t), o === 6 ? x : b) : n(t);
	}
	function x(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), S) : s(t) ? (l = x, z(t)) : (e.consume(t), x);
	}
	function S(t) {
		return t === 93 ? (e.consume(t), C) : x(t);
	}
	function C(t) {
		return t === 62 ? R(t) : t === 93 ? (e.consume(t), C) : x(t);
	}
	function w(t) {
		return t === null || t === 62 ? R(t) : s(t) ? (l = w, z(t)) : (e.consume(t), w);
	}
	function T(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), E) : s(t) ? (l = T, z(t)) : (e.consume(t), T);
	}
	function E(e) {
		return e === 62 ? R(e) : T(e);
	}
	function D(t) {
		return c(t) ? (e.consume(t), O) : n(t);
	}
	function O(t) {
		return t === 45 || d(t) ? (e.consume(t), O) : k(t);
	}
	function k(t) {
		return s(t) ? (l = k, z(t)) : i(t) ? (e.consume(t), k) : R(t);
	}
	function A(t) {
		return t === 45 || d(t) ? (e.consume(t), A) : t === 47 || t === 62 || m(t) ? j(t) : n(t);
	}
	function j(t) {
		return t === 47 ? (e.consume(t), R) : t === 58 || t === 95 || c(t) ? (e.consume(t), M) : s(t) ? (l = j, z(t)) : i(t) ? (e.consume(t), j) : R(t);
	}
	function M(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || d(t) ? (e.consume(t), M) : N(t);
	}
	function N(t) {
		return t === 61 ? (e.consume(t), P) : s(t) ? (l = N, z(t)) : i(t) ? (e.consume(t), N) : j(t);
	}
	function P(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), a = t, F) : s(t) ? (l = P, z(t)) : i(t) ? (e.consume(t), P) : (e.consume(t), I);
	}
	function F(t) {
		return t === a ? (e.consume(t), a = void 0, L) : t === null ? n(t) : s(t) ? (l = F, z(t)) : (e.consume(t), F);
	}
	function I(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || m(t) ? j(t) : (e.consume(t), I);
	}
	function L(e) {
		return e === 47 || e === 62 || m(e) ? j(e) : n(e);
	}
	function R(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function z(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), B;
	}
	function B(t) {
		return i(t) ? p(e, V, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : V(t);
	}
	function V(t) {
		return e.enter("htmlTextData"), l(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-end.js
var $e = {
	name: "labelEnd",
	resolveAll: rt,
	resolveTo: it,
	tokenize: at
}, et = { tokenize: ot }, tt = { tokenize: st }, nt = { tokenize: ct };
function rt(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && _(e, 0, e.length, n), e;
}
function it(e, t) {
	let n = e.length, r = 0, i, a, o, s;
	for (; n--;) if (i = e[n][1], a) {
		if (i.type === "link" || i.type === "labelLink" && i._inactive) break;
		e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
	} else if (o) {
		if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
			r = 2;
			break;
		}
	} else i.type === "labelEnd" && (o = n);
	let c = {
		type: e[a][1].type === "labelLink" ? "link" : "image",
		start: { ...e[a][1].start },
		end: { ...e[e.length - 1][1].end }
	}, l = {
		type: "label",
		start: { ...e[a][1].start },
		end: { ...e[o][1].end }
	}, u = {
		type: "labelText",
		start: { ...e[a + r + 2][1].end },
		end: { ...e[o - 2][1].start }
	};
	return s = [[
		"enter",
		c,
		t
	], [
		"enter",
		l,
		t
	]], s = v(s, e.slice(a + 1, a + r + 3)), s = v(s, [[
		"enter",
		u,
		t
	]]), s = v(s, H(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = v(s, [
		[
			"exit",
			u,
			t
		],
		e[o - 2],
		e[o - 1],
		[
			"exit",
			l,
			t
		]
	]), s = v(s, e.slice(o + 1)), s = v(s, [[
		"exit",
		c,
		t
	]]), _(e, a, e.length, s), e;
}
function at(e, t, n) {
	let r = this, i = r.events.length, a, o;
	for (; i--;) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
		a = r.events[i][1];
		break;
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(O(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(et, u, o ? u : d)(t) : t === 91 ? e.attempt(tt, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(nt, u, d)(t);
	}
	function u(e) {
		return t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function ot(e, n, r) {
	return i;
	function i(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), a;
	}
	function a(n) {
		return m(n) ? t(e, o)(n) : o(n);
	}
	function o(t) {
		return t === 41 ? d(t) : Ae(e, s, c, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function s(n) {
		return m(n) ? t(e, l)(n) : d(n);
	}
	function c(e) {
		return r(e);
	}
	function l(t) {
		return t === 34 || t === 39 || t === 40 ? Me(e, u, r, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : d(t);
	}
	function u(n) {
		return m(n) ? t(e, d)(n) : d(n);
	}
	function d(t) {
		return t === 41 ? (e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), e.exit("resource"), n) : r(t);
	}
}
function st(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return je.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(O(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function ct(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-image.js
var lt = {
	name: "labelStartImage",
	resolveAll: $e.resolveAll,
	tokenize: ut
};
function ut(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), a;
	}
	function a(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelImage"), o) : n(t);
	}
	function o(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-link.js
var dt = {
	name: "labelStartLink",
	resolveAll: $e.resolveAll,
	tokenize: ft
};
function ft(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelLink"), a;
	}
	function a(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/line-ending.js
var pt = {
	name: "lineEnding",
	tokenize: mt
};
function mt(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), p(e, t, "linePrefix");
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/thematic-break.js
var X = {
	name: "thematicBreak",
	tokenize: ht
};
function ht(e, t, n) {
	let r = 0, a;
	return o;
	function o(t) {
		return e.enter("thematicBreak"), c(t);
	}
	function c(e) {
		return a = e, l(e);
	}
	function l(i) {
		return i === a ? (e.enter("thematicBreakSequence"), u(i)) : r >= 3 && (i === null || s(i)) ? (e.exit("thematicBreak"), t(i)) : n(i);
	}
	function u(t) {
		return t === a ? (e.consume(t), r++, u) : (e.exit("thematicBreakSequence"), i(t) ? p(e, l, "whitespace")(t) : l(t));
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/list.js
var Z = {
	continuation: { tokenize: yt },
	exit: xt,
	name: "list",
	tokenize: vt
}, gt = {
	partial: !0,
	tokenize: St
}, _t = {
	partial: !0,
	tokenize: bt
};
function vt(e, t, n) {
	let r = this, a = r.events[r.events.length - 1], o = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, s = 0;
	return c;
	function c(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : l(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(X, n, d)(t) : d(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), u(t);
		}
		return n(t);
	}
	function u(t) {
		return l(t) && ++s < 10 ? (e.consume(t), u) : (!r.interrupt || s < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), d(t)) : n(t);
	}
	function d(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check(W, r.interrupt ? n : f, e.attempt(gt, m, p));
	}
	function f(e) {
		return r.containerState.initialBlankLine = !0, o++, m(e);
	}
	function p(t) {
		return i(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), m) : n(t);
	}
	function m(n) {
		return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function yt(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(W, a, o);
	function a(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, p(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function o(n) {
		return r.containerState.furtherBlankLines || !i(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(_t, t, s)(n));
	}
	function s(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, p(e, e.attempt(Z, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function bt(e, t, n) {
	let r = this;
	return p(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function xt(e) {
	e.exit(this.containerState.type);
}
function St(e, t, n) {
	let r = this;
	return p(e, a, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function a(e) {
		let a = r.events[r.events.length - 1];
		return !i(e) && a && a[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/setext-underline.js
var Ct = {
	name: "setextUnderline",
	resolveTo: wt,
	tokenize: Tt
};
function wt(e, t) {
	let n = e.length, r, i, a;
	for (; n--;) if (e[n][0] === "enter") {
		if (e[n][1].type === "content") {
			r = n;
			break;
		}
		e[n][1].type === "paragraph" && (i = n);
	} else e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
	let o = {
		type: "setextHeading",
		start: { ...e[r][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, [
		"enter",
		o,
		t
	]), e.splice(a + 1, 0, [
		"exit",
		e[r][1],
		t
	]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push([
		"exit",
		o,
		t
	]), e;
}
function Tt(e, t, n) {
	let r = this, a;
	return o;
	function o(t) {
		let i = r.events.length, o;
		for (; i--;) if (r.events[i][1].type !== "lineEnding" && r.events[i][1].type !== "linePrefix" && r.events[i][1].type !== "content") {
			o = r.events[i][1].type === "paragraph";
			break;
		}
		return !r.parser.lazy[r.now().line] && (r.interrupt || o) ? (e.enter("setextHeadingLine"), a = t, c(t)) : n(t);
	}
	function c(t) {
		return e.enter("setextHeadingLineSequence"), l(t);
	}
	function l(t) {
		return t === a ? (e.consume(t), l) : (e.exit("setextHeadingLineSequence"), i(t) ? p(e, u, "lineSuffix")(t) : u(t));
	}
	function u(r) {
		return r === null || s(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/flow.js
var Et = { tokenize: Dt };
function Dt(e) {
	let t = this, n = e.attempt(W, r, e.attempt(this.parser.constructs.flowInitial, i, p(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Te, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/text.js
var Ot = { resolveAll: Mt() }, kt = jt("string"), At = jt("text");
function jt(e) {
	return {
		resolveAll: Mt(e === "text" ? Nt : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) {
				t.consume(e);
				return;
			}
			return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Mt(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : (!t[r] || t[r][1].type !== "data") && (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function Nt(e, t) {
	let n = 0;
	for (; ++n <= e.length;) if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
		let r = e[n - 1][1], i = t.sliceStream(r), a = i.length, o = -1, s = 0, c;
		for (; a--;) {
			let e = i[a];
			if (typeof e == "string") {
				for (o = e.length; e.charCodeAt(o - 1) === 32;) s++, o--;
				if (o) break;
				o = -1;
			} else if (e === -2) c = !0, s++;
			else if (e !== -1) {
				a++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
			let i = {
				type: n === e.length || c || s < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: a ? o : r.start._bufferIndex + o,
					_index: r.start._index + a,
					line: r.end.line,
					column: r.end.column - s,
					offset: r.end.offset - s
				},
				end: { ...r.end }
			};
			r.end = { ...i.start }, r.start.offset === r.end.offset ? Object.assign(r, i) : (e.splice(n, 0, [
				"enter",
				i,
				t
			], [
				"exit",
				i,
				t
			]), n += 2);
		}
		n++;
	}
	return e;
}
//#endregion
//#region node_modules/micromark/lib/constructs.js
var Pt = /* @__PURE__ */ g({
	attentionMarkers: () => Ht,
	contentInitial: () => It,
	disable: () => Ut,
	document: () => Ft,
	flow: () => Rt,
	flowInitial: () => Lt,
	insideSpan: () => Vt,
	string: () => zt,
	text: () => Bt
}), Ft = {
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
	62: oe
}, It = { 91: Ne }, Lt = {
	[-2]: J,
	[-1]: J,
	32: J
}, Rt = {
	35: ze,
	42: X,
	45: [Ct, X],
	60: We,
	61: Ct,
	95: X,
	96: fe,
	126: fe
}, zt = {
	38: G,
	92: ue
}, Bt = {
	[-5]: pt,
	[-4]: pt,
	[-3]: pt,
	33: lt,
	38: G,
	42: U,
	60: [re, Ze],
	91: dt,
	92: [Le, ue],
	93: $e,
	95: U,
	96: ve
}, Vt = { null: [U, Ot] }, Ht = { null: [42, 95] }, Ut = { null: [] };
//#endregion
//#region node_modules/micromark/lib/create-tokenizer.js
function Wt(e, t, n) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: n && n.line || 1,
		column: n && n.column || 1,
		offset: n && n.offset || 0
	}, i = {}, a = [], o = [], c = [], l = {
		attempt: E(w),
		check: E(T),
		consume: x,
		enter: S,
		exit: C,
		interrupt: E(T, { interrupt: !0 })
	}, u = {
		code: null,
		containerState: {},
		defineSkip: g,
		events: [],
		now: h,
		parser: e,
		previous: null,
		sliceSerialize: p,
		sliceStream: m,
		write: f
	}, d = t.tokenize.call(u, l);
	return t.resolveAll && a.push(t), u;
	function f(e) {
		return o = v(o, e), y(), o[o.length - 1] === null ? (D(t, 0), u.events = H(a, u.events, u), u.events) : [];
	}
	function p(e, t) {
		return Kt(m(e), t);
	}
	function m(e) {
		return Gt(o, e);
	}
	function h() {
		let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: i,
			offset: a
		};
	}
	function g(e) {
		i[e.line] = e.column, k();
	}
	function y() {
		let e;
		for (; r._index < o.length;) {
			let t = o[r._index];
			if (typeof t == "string") for (e = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === e && r._bufferIndex < t.length;) b(t.charCodeAt(r._bufferIndex));
			else b(t);
		}
	}
	function b(e) {
		d = d(e);
	}
	function x(e) {
		s(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, k()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = e;
	}
	function S(e, t) {
		let n = t || {};
		return n.type = e, n.start = h(), u.events.push([
			"enter",
			n,
			u
		]), c.push(n), n;
	}
	function C(e) {
		let t = c.pop();
		return t.end = h(), u.events.push([
			"exit",
			t,
			u
		]), t;
	}
	function w(e, t) {
		D(e, t.from);
	}
	function T(e, t) {
		t.restore();
	}
	function E(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, c;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return c = O(), s = e, e.partial || (u.currentConstruct = e), e.name && u.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(u), t) : u, l, m, h)(n);
				}
			}
			function m(t) {
				return e(s, c), r;
			}
			function h(e) {
				return c.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function D(e, t) {
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && _(u.events, t, u.events.length - t, e.resolve(u.events.slice(t), u)), e.resolveTo && (u.events = e.resolveTo(u.events, u));
	}
	function O() {
		let e = h(), t = u.previous, n = u.currentConstruct, i = u.events.length, a = Array.from(c);
		return {
			from: i,
			restore: o
		};
		function o() {
			r = e, u.previous = t, u.currentConstruct = n, u.events.length = i, c = a, k();
		}
	}
	function k() {
		r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
	}
}
function Gt(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function Kt(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
//#endregion
//#region node_modules/micromark/lib/parse.js
function qt(e) {
	let t = {
		constructs: b([Pt, ...(e || {}).extensions || []]),
		content: n(F),
		defined: [],
		document: n(L),
		flow: n(Et),
		lazy: {},
		string: n(kt),
		text: n(At)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return Wt(t, e, n);
		}
	}
}
//#endregion
//#region node_modules/micromark/lib/postprocess.js
function Jt(e) {
	for (; !Ce(e););
	return e;
}
//#endregion
//#region node_modules/micromark/lib/preprocess.js
var Yt = /[\0\t\n\r]/g;
function Xt() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		let s = [], c, l, u, d, f;
		for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i)), u = 0, t = "", n &&= (i.charCodeAt(0) === 65279 && u++, void 0); u < i.length;) {
			if (Yt.lastIndex = u, c = Yt.exec(i), d = c && c.index !== void 0 ? c.index : i.length, f = i.charCodeAt(d), !c) {
				t = i.slice(u);
				break;
			}
			if (f === 10 && u === d && r) s.push(-3), r = void 0;
			else switch (r &&= (s.push(-5), void 0), u < d && (s.push(i.slice(u, d)), e += d - u), f) {
				case 0:
					s.push(65533), e++;
					break;
				case 9:
					for (l = Math.ceil(e / 4) * 4, s.push(-2); e++ < l;) s.push(-1);
					break;
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			u = d + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
//#endregion
//#region node_modules/micromark/index.js
function Zt(e, t, n) {
	return typeof t != "string" && (n = t, t = void 0), P(n)(Jt(qt(n).document().write(Xt()(e, t, !0))));
}
//#endregion
//#region src/formula.ts
function Qt(e) {
	let t = $t(e);
	return t.length === 0 ? "<math></math>" : `<div class="overscroll-x-none overflow-x-auto pb-4"><math>${Q(en(t))}</math></div>`;
}
function $t(e) {
	return e.match(/[A-Z][A-Z ]*|\d+(?:\.\d+)?|[=()+\-*/]/gi)?.map((e) => e.trim()) ?? [];
}
function en(e) {
	let t = 0;
	function n() {
		let n = e[t];
		if (n === void 0) return null;
		if (t++, /^\d/.test(n)) return {
			type: "number",
			value: n
		};
		if (/^[A-Z]/i.test(n)) return {
			type: "identifier",
			value: n
		};
		if (n === "(") {
			let n = i();
			if (!n || e[t] !== ")") throw Error("Invalid formula: expected ')' to close '('");
			return t++, {
				type: "group",
				value: n
			};
		}
		return t--, null;
	}
	function r() {
		let r = n();
		for (; r && (e[t] === "*" || e[t] === "/");) {
			let i = e[t];
			t++;
			let a = n();
			if (!a) throw Error(`Invalid formula: expected operand after '${i}'`);
			r = {
				type: "binary",
				op: i,
				left: r,
				right: a
			};
		}
		return r;
	}
	function i() {
		let n = r();
		for (; n && (e[t] === "+" || e[t] === "-");) {
			let i = e[t];
			t++;
			let a = r();
			if (!a) throw Error(`Invalid formula: expected operand after '${i}'`);
			n = {
				type: "binary",
				op: i,
				left: n,
				right: a
			};
		}
		return n;
	}
	function a() {
		let n = i();
		if (n && e[t] === "=") {
			t++;
			let e = a();
			if (!e) throw Error("Invalid formula: expected expression after '='");
			n = {
				type: "binary",
				op: "=",
				left: n,
				right: e
			};
		}
		return n;
	}
	let o = a();
	if (!o || t < e.length) throw Error(`Invalid formula: unexpected token '${e[t] ?? "end of formula"}'`);
	return o;
}
function Q(e) {
	switch (e.type) {
		case "number": return `<mn>${e.value}</mn>`;
		case "identifier": return `<mi>${e.value}</mi>`;
		case "group": return `<mrow><mo>(</mo>${Q(e.value)}<mo>)</mo></mrow>`;
		case "binary": switch (e.op) {
			case "/": return `<mfrac>${Q(e.left)}${Q(e.right)}</mfrac>`;
			case "*": return `<mrow>${Q(e.left)}<mo>×</mo>${Q(e.right)}</mrow>`;
			default: return `<mrow>${Q(e.left)}<mo>${e.op}</mo>${Q(e.right)}</mrow>`;
		}
	}
}
//#endregion
//#region src/index.ts
var tn = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#039;"
}, nn = on(), $ = {
	colorModeId: "light",
	darkThemeCssText: void 0,
	directiveExtensionPromise: void 0,
	lightThemeCssText: void 0,
	speedHighlight: void 0,
	speedHighlightPromise: void 0,
	tableExtensionPromise: void 0
}, rn = class {
	async highlight(e, t) {
		if (typeof document > "u") return;
		$.colorModeId = t;
		let { highlightElement: n } = await un();
		cn();
		for (let t of e.querySelectorAll("div[class^=\"shj-lang-\"]")) (/shj-lang-(\S+)/.exec(t.className) ?? [])[1] === "javascript" && (await n(t, "js", "multiline", { hideLineNumbers: !0 }), Object.assign(t.style, {
			fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, Liberation Mono, monospace",
			fontSize: "14px"
		}));
	}
	async render(e, t) {
		let n = [], r = [nn];
		if (t?.directives ?? !1) {
			$.directiveExtensionPromise ??= (async () => {
				let e = await import("./micromark-extension-directive-CIWJMWiY.js");
				return {
					extension: e.directive(),
					htmlExtension: e.directiveHtml({ note: sn })
				};
			})();
			let { extension: e, htmlExtension: t } = await $.directiveExtensionPromise;
			n.push(e), r.push(t);
		}
		if (t?.tables ?? !1) {
			$.tableExtensionPromise ??= (async () => {
				let e = await import("./micromark-extension-gfm-table-DTaYeBnk.js");
				return {
					extension: e.gfmTable(),
					htmlExtension: e.gfmTableHtml()
				};
			})();
			let { extension: e, htmlExtension: t } = await $.tableExtensionPromise;
			n.push(e), r.push(t);
		}
		return Zt(e, {
			allowDangerousHtml: !1,
			allowDangerousProtocol: !1,
			extensions: n,
			htmlExtensions: r
		});
	}
	setColorMode(e) {
		$.colorModeId = e, cn();
	}
};
function an(e) {
	return e.replaceAll(/[&<>"']/g, (e) => tn[e]);
}
function on() {
	let e;
	return {
		enter: {
			codeFenced() {
				this.buffer(), e = {
					codeContent: [],
					lang: ""
				};
			},
			codeFencedFence() {},
			codeFencedFenceSequence() {},
			codeFencedFenceInfo(t) {
				e !== void 0 && (e.lang = this.sliceSerialize(t));
			},
			codeFencedFenceMeta() {},
			codeFlowValue(t) {
				e !== void 0 && e.codeContent.push(this.sliceSerialize(t));
			}
		},
		exit: {
			codeFlowValue() {},
			codeFencedFenceMeta() {},
			codeFencedFenceInfo() {},
			codeFencedFenceSequence() {},
			codeFencedFence() {},
			codeFenced() {
				let t = e ?? {
					codeContent: [],
					lang: ""
				};
				this.resume();
				let n = t.codeContent.join("\n"), r = t.lang || "plain", i = "";
				switch (r) {
					case "visual":
						i = `<div class="dpuse-visual" data-options="${encodeURIComponent(n)}"></div>`;
						break;
					case "formula":
						try {
							i = Qt(JSON.parse(n).expression);
						} catch {
							i = `<div class="dpuse-formula-error">${an(n)}</div>`;
						}
						break;
					case "highcharts":
						i = `<div class="dpuse-highcharts" data-options="${encodeURIComponent(n)}"></div>`;
						break;
					default: i = `<div class="shj-lang-${r.replaceAll(/[^\w-]/g, "")}">${an(n)}</div>`;
				}
				this.raw(i), e = void 0;
			}
		}
	};
}
function sn(e) {
	if (e.type !== "leafDirective") return !1;
	this.tag("<p class=\"note\">"), this.raw(an(e.label ?? "")), this.tag("</p>");
}
function cn() {
	if (typeof document > "u") return;
	let e = $.colorModeId === "dark" ? $.darkThemeCssText : $.lightThemeCssText;
	e !== void 0 && ln(e);
}
function ln(e) {
	if (typeof document > "u") return;
	let t = URL.createObjectURL(new Blob([e], { type: "text/css" })), n = document.querySelector("#dpuse-code-theme"), r = n?.href;
	n ?? (n = document.createElement("link"), n.id = "dpuse-code-theme", n.rel = "stylesheet", document.head.append(n)), n.href = t, r && URL.revokeObjectURL(r);
}
async function un() {
	return $.speedHighlight ? $.speedHighlight : ($.speedHighlightPromise ??= (async () => {
		let [e, t, n] = await Promise.all([
			import("./dist-DRv2xTzQ.js"),
			import("./github-dark-CTHfNL12.js"),
			import("./github-light-OLdb5Tfn.js")
		]);
		return $.speedHighlight = e, $.darkThemeCssText = t.default, $.lightThemeCssText = n.default, cn(), $.speedHighlightPromise = void 0, e;
	})(), $.speedHighlightPromise);
}
//#endregion
export { rn as MicromarkTool };
