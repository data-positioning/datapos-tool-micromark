//#region node_modules/micromark-util-character/index.js
var e = f(/[A-Za-z]/), t = f(/[\dA-Za-z]/), n = f(/[#-'*+\--9=?A-Z^-~]/);
function r(e) {
	return e !== null && (e < 32 || e === 127);
}
var i = f(/\d/), a = f(/[\dA-Fa-f]/), o = f(/[!-/:-@[-`{-~]/);
function s(e) {
	return e !== null && e < -2;
}
function c(e) {
	return e !== null && (e < 0 || e === 32);
}
function l(e) {
	return e === -2 || e === -1 || e === 32;
}
var u = f(/\p{P}|\p{S}/u), d = f(/\s/);
function f(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
//#endregion
//#region node_modules/micromark-factory-space/index.js
function p(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return l(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return l(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
//#endregion
export { r as a, o as c, l as d, u as f, n as i, s as l, e as n, i as o, d as p, t as r, a as s, p as t, c as u };
