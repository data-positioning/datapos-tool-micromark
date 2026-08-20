import { n as e, t } from "./micromark-factory-whitespace-DvA2Lja_.js";
import { d as n, f as r, l as i, p as a, t as o, u as s } from "./micromark-factory-space-Cq-2i9SZ.js";
//#region node_modules/micromark-extension-directive/lib/factory-attributes.js
function c(e, c, l, u, d, f, p, m, h, g, _, v, y, b, x) {
	let S, C;
	return w;
	function w(t) {
		return e.enter(u), e.enter(d), e.consume(t), e.exit(d), T;
	}
	function T(c) {
		return c === 35 ? (S = p, E(c)) : c === 46 ? (S = m, E(c)) : x && n(c) ? o(e, T, "whitespace")(c) : !x && s(c) ? t(e, T)(c) : c === null || i(c) || a(c) || r(c) && c !== 45 && c !== 95 ? L(c) : (e.enter(f), e.enter(h), e.consume(c), k);
	}
	function E(t) {
		let n = S + "Marker";
		return e.enter(f), e.enter(S), e.enter(n), e.consume(t), e.exit(n), D;
	}
	function D(t) {
		if (t === null || t === 34 || t === 35 || t === 39 || t === 46 || t === 60 || t === 61 || t === 62 || t === 96 || t === 125 || s(t)) return l(t);
		let n = S + "Value";
		return e.enter(n), e.consume(t), O;
	}
	function O(t) {
		if (t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 62 || t === 96) return l(t);
		if (t === 35 || t === 46 || t === 125 || s(t)) {
			let n = S + "Value";
			return e.exit(n), e.exit(S), e.exit(f), T(t);
		}
		return e.consume(t), O;
	}
	function k(c) {
		return c === null || i(c) || a(c) || r(c) && c !== 45 && c !== 46 && c !== 58 && c !== 95 ? (e.exit(h), x && n(c) ? o(e, A, "whitespace")(c) : !x && s(c) ? t(e, A)(c) : A(c)) : (e.consume(c), k);
	}
	function A(t) {
		return t === 61 ? (e.enter(g), e.consume(t), e.exit(g), j) : (e.exit(f), T(t));
	}
	function j(r) {
		return r === null || r === 60 || r === 61 || r === 62 || r === 96 || r === 125 || x && i(r) ? l(r) : r === 34 || r === 39 ? (e.enter(_), e.enter(y), e.consume(r), e.exit(y), C = r, N) : x && n(r) ? o(e, j, "whitespace")(r) : !x && s(r) ? t(e, j)(r) : (e.enter(v), e.enter(b), e.consume(r), C = void 0, M);
	}
	function M(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 62 || t === 96 ? l(t) : t === 125 || s(t) ? (e.exit(b), e.exit(v), e.exit(f), T(t)) : (e.consume(t), M);
	}
	function N(t) {
		return t === C ? (e.enter(y), e.consume(t), e.exit(y), e.exit(_), e.exit(f), I) : (e.enter(v), P(t));
	}
	function P(n) {
		return n === C ? (e.exit(v), N(n)) : n === null ? l(n) : i(n) ? x ? l(n) : t(e, P)(n) : (e.enter(b), e.consume(n), F);
	}
	function F(t) {
		return t === C || t === null || i(t) ? (e.exit(b), P(t)) : (e.consume(t), F);
	}
	function I(e) {
		return e === 125 || s(e) ? T(e) : L(e);
	}
	function L(t) {
		return t === 125 ? (e.enter(d), e.consume(t), e.exit(d), e.exit(u), c) : l(t);
	}
}
//#endregion
//#region node_modules/micromark-extension-directive/lib/factory-label.js
function l(e, t, n, r, a, o, s) {
	let c = 0, l = 0, u;
	return d;
	function d(t) {
		return e.enter(r), e.enter(a), e.consume(t), e.exit(a), f;
	}
	function f(n) {
		return n === 93 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(r), t) : (e.enter(o), p(n));
	}
	function p(t) {
		if (t === 93 && !l) return g(t);
		let n = e.enter("chunkText", {
			_contentTypeTextTrailing: !0,
			contentType: "text",
			previous: u
		});
		return u && (u.next = n), u = n, m(t);
	}
	function m(t) {
		return t === null || c > 999 || t === 91 && ++l > 32 ? n(t) : t === 93 && !l-- ? (e.exit("chunkText"), g(t)) : i(t) ? s ? n(t) : (e.consume(t), e.exit("chunkText"), p) : (e.consume(t), t === 92 ? h : m);
	}
	function h(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), c++, m) : m(t);
	}
	function g(n) {
		return e.exit(o), e.enter(a), e.consume(n), e.exit(a), e.exit(r), t;
	}
}
//#endregion
//#region node_modules/micromark-extension-directive/lib/factory-name.js
function u(e, t, n, o) {
	let s = this;
	return c;
	function c(t) {
		return t === null || i(t) || r(t) || a(t) ? n(t) : (e.enter(o), e.consume(t), l);
	}
	function l(c) {
		return c === null || i(c) || a(c) || r(c) && c !== 45 && c !== 95 ? (e.exit(o), s.previous === 45 || s.previous === 95 ? n(c) : t(c)) : (e.consume(c), l);
	}
}
//#endregion
//#region node_modules/micromark-extension-directive/lib/directive-container.js
var d = {
	tokenize: h,
	concrete: !0
}, f = {
	tokenize: g,
	partial: !0
}, p = {
	tokenize: _,
	partial: !0
}, m = {
	tokenize: v,
	partial: !0
};
function h(e, t, n) {
	let r = this, a = r.events[r.events.length - 1], s = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, c = 0, l;
	return d;
	function d(t) {
		return e.enter("directiveContainer"), e.enter("directiveContainerFence"), e.enter("directiveContainerSequence"), h(t);
	}
	function h(t) {
		return t === 58 ? (e.consume(t), c++, h) : c < 3 ? n(t) : (e.exit("directiveContainerSequence"), u.call(r, e, g, n, "directiveContainerName")(t));
	}
	function g(t) {
		return t === 91 ? e.attempt(f, _, _)(t) : _(t);
	}
	function _(t) {
		return t === 123 ? e.attempt(p, v, v)(t) : v(t);
	}
	function v(t) {
		return o(e, y, "whitespace")(t);
	}
	function y(a) {
		return e.exit("directiveContainerFence"), a === null ? k(a) : i(a) ? r.interrupt ? t(a) : e.attempt(m, b, k)(a) : n(a);
	}
	function b(t) {
		return t === null ? k(t) : i(t) ? e.check(m, T, k)(t) : (e.enter("directiveContainerContent"), x(t));
	}
	function x(t) {
		return e.attempt({
			tokenize: A,
			partial: !0
		}, O, s ? o(e, S, "linePrefix", s + 1) : S)(t);
	}
	function S(t) {
		return t === null ? O(t) : i(t) ? e.check(m, w, O)(t) : w(t);
	}
	function C(t) {
		if (t === null) {
			let n = e.exit("chunkDocument");
			return r.parser.lazy[n.start.line] = !1, O(t);
		}
		return i(t) ? e.check(m, E, D)(t) : (e.consume(t), C);
	}
	function w(t) {
		let n = e.enter("chunkDocument", {
			contentType: "document",
			previous: l
		});
		return l && (l.next = n), l = n, C(t);
	}
	function T(t) {
		return e.enter("directiveContainerContent"), x(t);
	}
	function E(t) {
		e.consume(t);
		let n = e.exit("chunkDocument");
		return r.parser.lazy[n.start.line] = !1, x;
	}
	function D(t) {
		let n = e.exit("chunkDocument");
		return r.parser.lazy[n.start.line] = !1, O(t);
	}
	function O(t) {
		return e.exit("directiveContainerContent"), k(t);
	}
	function k(n) {
		return e.exit("directiveContainer"), t(n);
	}
	function A(e, t, n) {
		let a = 0;
		return o(e, s, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		function s(t) {
			return e.enter("directiveContainerFence"), e.enter("directiveContainerSequence"), l(t);
		}
		function l(t) {
			return t === 58 ? (e.consume(t), a++, l) : a < c ? n(t) : (e.exit("directiveContainerSequence"), o(e, u, "whitespace")(t));
		}
		function u(r) {
			return r === null || i(r) ? (e.exit("directiveContainerFence"), t(r)) : n(r);
		}
	}
}
function g(e, t, n) {
	return l(e, t, n, "directiveContainerLabel", "directiveContainerLabelMarker", "directiveContainerLabelString", !0);
}
function _(e, t, n) {
	return c(e, t, n, "directiveContainerAttributes", "directiveContainerAttributesMarker", "directiveContainerAttribute", "directiveContainerAttributeId", "directiveContainerAttributeClass", "directiveContainerAttributeName", "directiveContainerAttributeInitializerMarker", "directiveContainerAttributeValueLiteral", "directiveContainerAttributeValue", "directiveContainerAttributeValueMarker", "directiveContainerAttributeValueData", !0);
}
function v(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a;
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-directive/lib/directive-leaf.js
var y = { tokenize: S }, b = {
	tokenize: C,
	partial: !0
}, x = {
	tokenize: w,
	partial: !0
};
function S(e, t, n) {
	let r = this;
	return a;
	function a(t) {
		return e.enter("directiveLeaf"), e.enter("directiveLeafSequence"), e.consume(t), s;
	}
	function s(t) {
		return t === 58 ? (e.consume(t), e.exit("directiveLeafSequence"), u.call(r, e, c, n, "directiveLeafName")) : n(t);
	}
	function c(t) {
		return t === 91 ? e.attempt(b, l, l)(t) : l(t);
	}
	function l(t) {
		return t === 123 ? e.attempt(x, d, d)(t) : d(t);
	}
	function d(t) {
		return o(e, f, "whitespace")(t);
	}
	function f(r) {
		return r === null || i(r) ? (e.exit("directiveLeaf"), t(r)) : n(r);
	}
}
function C(e, t, n) {
	return l(e, t, n, "directiveLeafLabel", "directiveLeafLabelMarker", "directiveLeafLabelString", !0);
}
function w(e, t, n) {
	return c(e, t, n, "directiveLeafAttributes", "directiveLeafAttributesMarker", "directiveLeafAttribute", "directiveLeafAttributeId", "directiveLeafAttributeClass", "directiveLeafAttributeName", "directiveLeafAttributeInitializerMarker", "directiveLeafAttributeValueLiteral", "directiveLeafAttributeValue", "directiveLeafAttributeValueMarker", "directiveLeafAttributeValueData", !0);
}
//#endregion
//#region node_modules/micromark-extension-directive/lib/directive-text.js
var T = {
	tokenize: k,
	previous: O
}, E = {
	tokenize: A,
	partial: !0
}, D = {
	tokenize: j,
	partial: !0
};
function O(e) {
	return e !== 58 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function k(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("directiveText"), e.enter("directiveTextMarker"), e.consume(t), e.exit("directiveTextMarker"), u.call(r, e, a, n, "directiveTextName");
	}
	function a(t) {
		return t === 58 ? n(t) : t === 91 ? e.attempt(E, o, o)(t) : o(t);
	}
	function o(t) {
		return t === 123 ? e.attempt(D, s, s)(t) : s(t);
	}
	function s(n) {
		return e.exit("directiveText"), t(n);
	}
}
function A(e, t, n) {
	return l(e, t, n, "directiveTextLabel", "directiveTextLabelMarker", "directiveTextLabelString");
}
function j(e, t, n) {
	return c(e, t, n, "directiveTextAttributes", "directiveTextAttributesMarker", "directiveTextAttribute", "directiveTextAttributeId", "directiveTextAttributeClass", "directiveTextAttributeName", "directiveTextAttributeInitializerMarker", "directiveTextAttributeValueLiteral", "directiveTextAttributeValue", "directiveTextAttributeValueMarker", "directiveTextAttributeValueData");
}
//#endregion
//#region node_modules/micromark-extension-directive/lib/syntax.js
function M() {
	return {
		text: { 58: T },
		flow: { 58: [d, y] }
	};
}
//#endregion
//#region node_modules/character-entities-legacy/index.js
var N = /* @__PURE__ */ "AElig.AMP.Aacute.Acirc.Agrave.Aring.Atilde.Auml.COPY.Ccedil.ETH.Eacute.Ecirc.Egrave.Euml.GT.Iacute.Icirc.Igrave.Iuml.LT.Ntilde.Oacute.Ocirc.Ograve.Oslash.Otilde.Ouml.QUOT.REG.THORN.Uacute.Ucirc.Ugrave.Uuml.Yacute.aacute.acirc.acute.aelig.agrave.amp.aring.atilde.auml.brvbar.ccedil.cedil.cent.copy.curren.deg.divide.eacute.ecirc.egrave.eth.euml.frac12.frac14.frac34.gt.iacute.icirc.iexcl.igrave.iquest.iuml.laquo.lt.macr.micro.middot.nbsp.not.ntilde.oacute.ocirc.ograve.ordf.ordm.oslash.otilde.ouml.para.plusmn.pound.quot.raquo.reg.sect.shy.sup1.sup2.sup3.szlig.thorn.times.uacute.ucirc.ugrave.uml.uuml.yacute.yen.yuml".split("."), P = {
	0: "�",
	128: "€",
	130: "‚",
	131: "ƒ",
	132: "„",
	133: "…",
	134: "†",
	135: "‡",
	136: "ˆ",
	137: "‰",
	138: "Š",
	139: "‹",
	140: "Œ",
	142: "Ž",
	145: "‘",
	146: "’",
	147: "“",
	148: "”",
	149: "•",
	150: "–",
	151: "—",
	152: "˜",
	153: "™",
	154: "š",
	155: "›",
	156: "œ",
	158: "ž",
	159: "Ÿ"
};
//#endregion
//#region node_modules/is-decimal/index.js
function F(e) {
	let t = typeof e == "string" ? e.charCodeAt(0) : e;
	return t >= 48 && t <= 57;
}
//#endregion
//#region node_modules/is-hexadecimal/index.js
function I(e) {
	let t = typeof e == "string" ? e.charCodeAt(0) : e;
	return t >= 97 && t <= 102 || t >= 65 && t <= 70 || t >= 48 && t <= 57;
}
//#endregion
//#region node_modules/is-alphabetical/index.js
function L(e) {
	let t = typeof e == "string" ? e.charCodeAt(0) : e;
	return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
//#endregion
//#region node_modules/is-alphanumerical/index.js
function R(e) {
	return L(e) || F(e);
}
//#endregion
//#region node_modules/parse-entities/lib/index.js
var z = [
	"",
	"Named character references must be terminated by a semicolon",
	"Numeric character references must be terminated by a semicolon",
	"Named character references cannot be empty",
	"Numeric character references cannot be empty",
	"Named character references must be known",
	"Numeric character references cannot be disallowed",
	"Numeric character references cannot be outside the permissible Unicode range"
];
function B(t, n) {
	let r = n || {}, i = typeof r.additional == "string" ? r.additional.charCodeAt(0) : r.additional, a = [], o = 0, s = -1, c = "", l, u;
	r.position && ("start" in r.position || "indent" in r.position ? (u = r.position.indent, l = r.position.start) : l = r.position);
	let d = (l ? l.line : 0) || 1, f = (l ? l.column : 0) || 1, p = h(), m;
	for (o--; ++o <= t.length;) if (m === 10 && (f = (u ? u[s] : 0) || 1), m = t.charCodeAt(o), m === 38) {
		let n = t.charCodeAt(o + 1);
		if (n === 9 || n === 10 || n === 12 || n === 32 || n === 38 || n === 60 || Number.isNaN(n) || i && n === i) {
			c += String.fromCharCode(m), f++;
			continue;
		}
		let s = o + 1, l = s, u = s, d;
		if (n === 35) {
			u = ++l;
			let e = t.charCodeAt(u);
			e === 88 || e === 120 ? (d = "hexadecimal", u = ++l) : d = "decimal";
		} else d = "named";
		let v = "", y = "", b = "", x = d === "named" ? R : d === "decimal" ? F : I;
		for (u--; ++u <= t.length;) {
			let n = t.charCodeAt(u);
			if (!x(n)) break;
			b += String.fromCharCode(n), d === "named" && N.includes(b) && (v = b, y = e(b));
		}
		let S = t.charCodeAt(u) === 59;
		if (S) {
			u++;
			let t = d === "named" && e(b);
			t && (v = b, y = t);
		}
		let C = 1 + u - s, w = "";
		if (!(!S && r.nonTerminated === !1)) {
			if (!b) d !== "named" && g(4, C);
			else if (d === "named") {
				if (S && !y) g(5, 1);
				else if (v !== b && (u = l + v.length, C = 1 + u - l, S = !1), !S) {
					let e = v ? 1 : 3;
					if (r.attribute) {
						let n = t.charCodeAt(u);
						n === 61 ? (g(e, C), y = "") : R(n) ? y = "" : g(e, C);
					} else g(e, C);
				}
				w = y;
			} else {
				S || g(2, C);
				let e = Number.parseInt(b, d === "hexadecimal" ? 16 : 10);
				if (V(e)) g(7, C), w = "�";
				else if (e in P) g(6, C), w = P[e];
				else {
					let t = "";
					H(e) && g(6, C), e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 | 55296), e = 56320 | e & 1023), w = t + String.fromCharCode(e);
				}
			}
		}
		if (w) {
			_(), p = h(), o = u - 1, f += u - s + 1, a.push(w);
			let e = h();
			e.offset++, r.reference && r.reference.call(r.referenceContext || void 0, w, {
				start: p,
				end: e
			}, t.slice(s - 1, u)), p = e;
		} else b = t.slice(s - 1, u), c += b, f += b.length, o = u - 1;
	} else m === 10 && (d++, s++, f = 0), Number.isNaN(m) ? _() : (c += String.fromCharCode(m), f++);
	return a.join("");
	function h() {
		return {
			line: d,
			column: f,
			offset: o + ((l ? l.offset : 0) || 0)
		};
	}
	function g(e, t) {
		let n;
		r.warning && (n = h(), n.column += t, n.offset += t, r.warning.call(r.warningContext || void 0, z[e], n, e));
	}
	function _() {
		c &&= (a.push(c), r.text && r.text.call(r.textContext || void 0, c, {
			start: p,
			end: h()
		}), "");
	}
}
function V(e) {
	return e >= 55296 && e <= 57343 || e > 1114111;
}
function H(e) {
	return e >= 1 && e <= 8 || e === 11 || e >= 13 && e <= 31 || e >= 127 && e <= 159 || e >= 64976 && e <= 65007 || (e & 65535) == 65535 || (e & 65535) == 65534;
}
//#endregion
//#region node_modules/micromark-extension-directive/lib/html.js
var U = {}.hasOwnProperty;
function W(e) {
	let t = e || {};
	return {
		enter: {
			directiveContainer() {
				n.call(this, "containerDirective");
			},
			directiveContainerAttributes: o,
			directiveContainerLabel: i,
			directiveContainerContent() {
				this.buffer();
			},
			directiveLeaf() {
				n.call(this, "leafDirective");
			},
			directiveLeafAttributes: o,
			directiveLeafLabel: i,
			directiveText() {
				n.call(this, "textDirective");
			},
			directiveTextAttributes: o,
			directiveTextLabel: i
		},
		exit: {
			directiveContainer: m,
			directiveContainerAttributeClassValue: c,
			directiveContainerAttributeIdValue: s,
			directiveContainerAttributeName: l,
			directiveContainerAttributeValue: u,
			directiveContainerAttributes: d,
			directiveContainerContent: f,
			directiveContainerFence: p,
			directiveContainerLabel: a,
			directiveContainerName: r,
			directiveLeaf: m,
			directiveLeafAttributeClassValue: c,
			directiveLeafAttributeIdValue: s,
			directiveLeafAttributeName: l,
			directiveLeafAttributeValue: u,
			directiveLeafAttributes: d,
			directiveLeafLabel: a,
			directiveLeafName: r,
			directiveText: m,
			directiveTextAttributeClassValue: c,
			directiveTextAttributeIdValue: s,
			directiveTextAttributeName: l,
			directiveTextAttributeValue: u,
			directiveTextAttributes: d,
			directiveTextLabel: a,
			directiveTextName: r
		}
	};
	function n(e) {
		let t = this.getData("directiveStack");
		t || this.setData("directiveStack", t = []), t.push({
			type: e,
			name: ""
		});
	}
	function r(e) {
		let t = this.getData("directiveStack");
		t[t.length - 1].name = this.sliceSerialize(e);
	}
	function i() {
		this.buffer();
	}
	function a() {
		let e = this.resume(), t = this.getData("directiveStack");
		t[t.length - 1].label = e;
	}
	function o() {
		this.buffer(), this.setData("directiveAttributes", []);
	}
	function s(e) {
		this.getData("directiveAttributes").push(["id", B(this.sliceSerialize(e), { attribute: !0 })]);
	}
	function c(e) {
		this.getData("directiveAttributes").push(["class", B(this.sliceSerialize(e), { attribute: !0 })]);
	}
	function l(e) {
		this.getData("directiveAttributes").push([this.sliceSerialize(e), ""]);
	}
	function u(e) {
		let t = this.getData("directiveAttributes");
		t[t.length - 1][1] = B(this.sliceSerialize(e), { attribute: !0 });
	}
	function d() {
		let e = this.getData("directiveStack"), t = this.getData("directiveAttributes"), n = {}, r = -1;
		for (; ++r < t.length;) {
			let e = t[r];
			e[0] === "class" && n.class ? n.class += " " + e[1] : n[e[0]] = e[1];
		}
		this.resume(), this.setData("directiveAttributes"), e[e.length - 1].attributes = n;
	}
	function f() {
		let e = this.resume(), t = this.getData("directiveStack");
		t[t.length - 1].content = e;
	}
	function p() {
		let e = this.getData("directiveStack"), t = e[e.length - 1];
		t._fenceCount ||= 0, t._fenceCount++, t._fenceCount === 1 && this.setData("slurpOneLineEnding", !0);
	}
	function m() {
		let e = this.getData("directiveStack").pop(), n, r;
		U.call(t, e.name) && (r = t[e.name].call(this, e), n = r !== !1), !n && U.call(t, "*") && (r = t["*"].call(this, e), n = r !== !1), !n && e.type !== "textDirective" && this.setData("slurpOneLineEnding", !0);
	}
}
//#endregion
export { M as directive, W as directiveHtml };
