import { d as e, l as t, t as n, u as r } from "./micromark-factory-space-Cq-2i9SZ.js";
//#region node_modules/micromark-extension-gfm-table/lib/html.js
var i = {
	none: "",
	left: " align=\"left\"",
	right: " align=\"right\"",
	center: " align=\"center\""
};
function a() {
	return {
		enter: {
			table(e) {
				let t = e._align;
				this.lineEndingIfNeeded(), this.tag("<table>"), this.setData("tableAlign", t);
			},
			tableBody() {
				this.tag("<tbody>");
			},
			tableData() {
				let e = i[this.getData("tableAlign")[this.getData("tableColumn")]];
				e === void 0 ? this.buffer() : (this.lineEndingIfNeeded(), this.tag("<td" + e + ">"));
			},
			tableHead() {
				this.lineEndingIfNeeded(), this.tag("<thead>");
			},
			tableHeader() {
				let e = i[this.getData("tableAlign")[this.getData("tableColumn")]];
				this.lineEndingIfNeeded(), this.tag("<th" + e + ">");
			},
			tableRow() {
				this.setData("tableColumn", 0), this.lineEndingIfNeeded(), this.tag("<tr>");
			}
		},
		exit: {
			codeTextData(e) {
				let t = this.sliceSerialize(e);
				this.getData("tableAlign") && (t = t.replace(/\\([\\|])/g, o)), this.raw(this.encode(t));
			},
			table() {
				this.setData("tableAlign"), this.setData("slurpAllLineEndings"), this.lineEndingIfNeeded(), this.tag("</table>");
			},
			tableBody() {
				this.lineEndingIfNeeded(), this.tag("</tbody>");
			},
			tableData() {
				let e = this.getData("tableAlign"), t = this.getData("tableColumn");
				t in e ? (this.tag("</td>"), this.setData("tableColumn", t + 1)) : this.resume();
			},
			tableHead() {
				this.lineEndingIfNeeded(), this.tag("</thead>");
			},
			tableHeader() {
				let e = this.getData("tableColumn");
				this.tag("</th>"), this.setData("tableColumn", e + 1);
			},
			tableRow() {
				let e = this.getData("tableAlign"), t = this.getData("tableColumn");
				for (; t < e.length;) this.lineEndingIfNeeded(), this.tag("<td" + i[e[t]] + "></td>"), t++;
				this.setData("tableColumn", t), this.lineEndingIfNeeded(), this.tag("</tr>");
			}
		}
	};
}
function o(e, t) {
	return t === "|" ? t : e;
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/edit-map.js
var s = class {
	constructor() {
		this.map = [];
	}
	add(e, t, n) {
		c(this, e, t, n);
	}
	consume(e) {
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0;
	}
};
function c(e, t, n, r) {
	let i = 0;
	if (n !== 0 || r.length !== 0) {
		for (; i < e.map.length;) {
			if (e.map[i][0] === t) {
				e.map[i][1] += n, e.map[i][2].push(...r);
				return;
			}
			i += 1;
		}
		e.map.push([
			t,
			n,
			r
		]);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/infer.js
function l(e, t) {
	let n = !1, r = [];
	for (; t < e.length;) {
		let i = e[t];
		if (n) {
			if (i[0] === "enter") i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let e = r.length - 1;
					r[e] = r[e] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
		t += 1;
	}
	return r;
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/syntax.js
function u() {
	return { flow: { null: {
		name: "table",
		tokenize: d,
		resolveAll: f
	} } };
}
function d(i, a, o) {
	let s = this, c = 0, l = 0, u;
	return d;
	function d(e) {
		let t = s.events.length - 1;
		for (; t > -1;) {
			let e = s.events[t][1].type;
			if (e === "lineEnding" || e === "linePrefix") t--;
			else break;
		}
		let n = t > -1 ? s.events[t][1].type : null, r = n === "tableHead" || n === "tableRow" ? E : f;
		return r === E && s.parser.lazy[s.now().line] ? o(e) : r(e);
	}
	function f(e) {
		return i.enter("tableHead"), i.enter("tableRow"), p(e);
	}
	function p(e) {
		return e === 124 ? m(e) : (u = !0, l += 1, m(e));
	}
	function m(r) {
		return r === null ? o(r) : t(r) ? l > 1 ? (l = 0, s.interrupt = !0, i.exit("tableRow"), i.enter("lineEnding"), i.consume(r), i.exit("lineEnding"), _) : o(r) : e(r) ? n(i, m, "whitespace")(r) : (l += 1, u && (u = !1, c += 1), r === 124 ? (i.enter("tableCellDivider"), i.consume(r), i.exit("tableCellDivider"), u = !0, m) : (i.enter("data"), h(r)));
	}
	function h(e) {
		return e === null || e === 124 || r(e) ? (i.exit("data"), m(e)) : (i.consume(e), e === 92 ? g : h);
	}
	function g(e) {
		return e === 92 || e === 124 ? (i.consume(e), h) : h(e);
	}
	function _(t) {
		return s.interrupt = !1, s.parser.lazy[s.now().line] ? o(t) : (i.enter("tableDelimiterRow"), u = !1, e(t) ? n(i, v, "linePrefix", s.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : v(t));
	}
	function v(e) {
		return e === 45 || e === 58 ? b(e) : e === 124 ? (u = !0, i.enter("tableCellDivider"), i.consume(e), i.exit("tableCellDivider"), y) : T(e);
	}
	function y(t) {
		return e(t) ? n(i, b, "whitespace")(t) : b(t);
	}
	function b(e) {
		return e === 58 ? (l += 1, u = !0, i.enter("tableDelimiterMarker"), i.consume(e), i.exit("tableDelimiterMarker"), x) : e === 45 ? (l += 1, x(e)) : e === null || t(e) ? w(e) : T(e);
	}
	function x(e) {
		return e === 45 ? (i.enter("tableDelimiterFiller"), S(e)) : T(e);
	}
	function S(e) {
		return e === 45 ? (i.consume(e), S) : e === 58 ? (u = !0, i.exit("tableDelimiterFiller"), i.enter("tableDelimiterMarker"), i.consume(e), i.exit("tableDelimiterMarker"), C) : (i.exit("tableDelimiterFiller"), C(e));
	}
	function C(t) {
		return e(t) ? n(i, w, "whitespace")(t) : w(t);
	}
	function w(e) {
		return e === 124 ? v(e) : e === null || t(e) ? !u || c !== l ? T(e) : (i.exit("tableDelimiterRow"), i.exit("tableHead"), a(e)) : T(e);
	}
	function T(e) {
		return o(e);
	}
	function E(e) {
		return i.enter("tableRow"), D(e);
	}
	function D(r) {
		return r === 124 ? (i.enter("tableCellDivider"), i.consume(r), i.exit("tableCellDivider"), D) : r === null || t(r) ? (i.exit("tableRow"), a(r)) : e(r) ? n(i, D, "whitespace")(r) : (i.enter("data"), O(r));
	}
	function O(e) {
		return e === null || e === 124 || r(e) ? (i.exit("data"), D(e)) : (i.consume(e), e === 92 ? k : O);
	}
	function k(e) {
		return e === 92 || e === 124 ? (i.consume(e), O) : O(e);
	}
}
function f(e, t) {
	let n = -1, r = !0, i = 0, a = [
		0,
		0,
		0,
		0
	], o = [
		0,
		0,
		0,
		0
	], c = !1, u = 0, d, f, h, g = new s();
	for (; ++n < e.length;) {
		let s = e[n], l = s[1];
		s[0] === "enter" ? l.type === "tableHead" ? (c = !1, u !== 0 && (m(g, t, u, d, f), f = void 0, u = 0), d = {
			type: "table",
			start: Object.assign({}, l.start),
			end: Object.assign({}, l.end)
		}, g.add(n, 0, [[
			"enter",
			d,
			t
		]])) : l.type === "tableRow" || l.type === "tableDelimiterRow" ? (r = !0, h = void 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			n + 1,
			0,
			0
		], c && (c = !1, f = {
			type: "tableBody",
			start: Object.assign({}, l.start),
			end: Object.assign({}, l.end)
		}, g.add(n, 0, [[
			"enter",
			f,
			t
		]])), i = l.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (l.type === "data" || l.type === "tableDelimiterMarker" || l.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], h = p(g, t, a, i, void 0, h), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : l.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], h = p(g, t, a, i, void 0, h)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : l.type === "tableHead" ? (c = !0, u = n) : l.type === "tableRow" || l.type === "tableDelimiterRow" ? (u = n, a[1] === 0 ? o[1] !== 0 && (h = p(g, t, o, i, n, h)) : (o[0] = o[1], h = p(g, t, a, i, n, h)), i = 0) : i && (l.type === "data" || l.type === "tableDelimiterMarker" || l.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (u !== 0 && m(g, t, u, d, f), g.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = l(t.events, n));
	}
	return e;
}
function p(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, h(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = h(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = h(t.events, n[2]), a = h(t.events, n[3]), o = {
			type: "tableContent",
			start: Object.assign({}, i),
			end: Object.assign({}, a)
		};
		if (e.add(n[2], 0, [[
			"enter",
			o,
			t
		]]), r !== 2) {
			let r = t.events[n[2]], i = t.events[n[3]];
			if (r[1].end = Object.assign({}, i[1].end), r[1].type = "chunkText", r[1].contentType = "text", n[3] > n[2] + 1) {
				let t = n[2] + 1, r = n[3] - n[2] - 1;
				e.add(t, r, []);
			}
		}
		e.add(n[3] + 1, 0, [[
			"exit",
			o,
			t
		]]);
	}
	return i !== void 0 && (a.end = Object.assign({}, h(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function m(e, t, n, r, i) {
	let a = [], o = h(t.events, n);
	i && (i.end = Object.assign({}, o), a.push([
		"exit",
		i,
		t
	])), r.end = Object.assign({}, o), a.push([
		"exit",
		r,
		t
	]), e.add(n + 1, 0, a);
}
function h(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
//#endregion
export { u as gfmTable, a as gfmTableHtml };
