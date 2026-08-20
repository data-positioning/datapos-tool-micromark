import { d as e, l as t, t as n } from "./micromark-factory-space-Cq-2i9SZ.js";
//#region node_modules/decode-named-character-reference/index.dom.js
var r = document.createElement("i");
function i(e) {
	let t = "&" + e + ";";
	r.innerHTML = t;
	let n = r.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
//#endregion
//#region node_modules/micromark-factory-whitespace/index.js
function a(r, i) {
	let a;
	return o;
	function o(s) {
		return t(s) ? (r.enter("lineEnding"), r.consume(s), r.exit("lineEnding"), a = !0, o) : e(s) ? n(r, o, a ? "linePrefix" : "lineSuffix")(s) : i(s);
	}
}
//#endregion
export { i as n, a as t };
