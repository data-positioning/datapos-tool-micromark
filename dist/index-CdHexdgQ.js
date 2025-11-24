import { m as E, a as y, f as R, b as M } from "./index-CZhPH3ds.js";
const I = {
  none: "",
  left: ' align="left"',
  right: ' align="right"',
  center: ' align="center"'
};
function U() {
  return {
    enter: {
      table(t) {
        const i = t._align;
        this.lineEndingIfNeeded(), this.tag("<table>"), this.setData("tableAlign", i);
      },
      tableBody() {
        this.tag("<tbody>");
      },
      tableData() {
        const t = this.getData("tableAlign"), i = this.getData("tableColumn"), n = I[t[i]];
        n === void 0 ? this.buffer() : (this.lineEndingIfNeeded(), this.tag("<td" + n + ">"));
      },
      tableHead() {
        this.lineEndingIfNeeded(), this.tag("<thead>");
      },
      tableHeader() {
        const t = this.getData("tableAlign"), i = this.getData("tableColumn"), n = I[t[i]];
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
        let i = this.sliceSerialize(t);
        this.getData("tableAlign") && (i = i.replace(/\\([\\|])/g, P)), this.raw(this.encode(i));
      },
      table() {
        this.setData("tableAlign"), this.setData("slurpAllLineEndings"), this.lineEndingIfNeeded(), this.tag("</table>");
      },
      tableBody() {
        this.lineEndingIfNeeded(), this.tag("</tbody>");
      },
      tableData() {
        const t = this.getData("tableAlign"), i = this.getData("tableColumn");
        i in t ? (this.tag("</td>"), this.setData("tableColumn", i + 1)) : this.resume();
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
        let i = this.getData("tableColumn");
        for (; i < t.length; )
          this.lineEndingIfNeeded(), this.tag("<td" + I[t[i]] + "></td>"), i++;
        this.setData("tableColumn", i), this.lineEndingIfNeeded(), this.tag("</tr>");
      }
    }
  };
}
function P(t, i) {
  return i === "|" ? i : t;
}
class _ {
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
  add(i, n, l) {
    V(this, i, n, l);
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
  consume(i) {
    if (this.map.sort(function(a, s) {
      return a[0] - s[0];
    }), this.map.length === 0)
      return;
    let n = this.map.length;
    const l = [];
    for (; n > 0; )
      n -= 1, l.push(i.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]), i.length = this.map[n][0];
    l.push(i.slice()), i.length = 0;
    let r = l.pop();
    for (; r; ) {
      for (const a of r)
        i.push(a);
      r = l.pop();
    }
    this.map.length = 0;
  }
}
function V(t, i, n, l) {
  let r = 0;
  if (!(n === 0 && l.length === 0)) {
    for (; r < t.map.length; ) {
      if (t.map[r][0] === i) {
        t.map[r][1] += n, t.map[r][2].push(...l);
        return;
      }
      r += 1;
    }
    t.map.push([i, n, l]);
  }
}
function q(t, i) {
  let n = !1;
  const l = [];
  for (; i < t.length; ) {
    const r = t[i];
    if (n) {
      if (r[0] === "enter")
        r[1].type === "tableContent" && l.push(t[i + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (r[1].type === "tableContent") {
        if (t[i - 1][1].type === "tableDelimiterMarker") {
          const a = l.length - 1;
          l[a] = l[a] === "left" ? "center" : "right";
        }
      } else if (r[1].type === "tableDelimiterRow")
        break;
    } else r[0] === "enter" && r[1].type === "tableDelimiterRow" && (n = !0);
    i += 1;
  }
  return l;
}
function W() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: G,
        resolveAll: J
      }
    }
  };
}
function G(t, i, n) {
  const l = this;
  let r = 0, a = 0, s;
  return f;
  function f(e) {
    let w = l.events.length - 1;
    for (; w > -1; ) {
      const z = l.events[w][1].type;
      if (z === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      z === "linePrefix") w--;
      else break;
    }
    const F = w > -1 ? l.events[w][1].type : null, S = F === "tableHead" || F === "tableRow" ? B : m;
    return S === B && l.parser.lazy[l.now().line] ? n(e) : S(e);
  }
  function m(e) {
    return t.enter("tableHead"), t.enter("tableRow"), o(e);
  }
  function o(e) {
    return e === 124 || (s = !0, a += 1), g(e);
  }
  function g(e) {
    return e === null ? n(e) : E(e) ? a > 1 ? (a = 0, l.interrupt = !0, t.exit("tableRow"), t.enter("lineEnding"), t.consume(e), t.exit("lineEnding"), d) : n(e) : y(e) ? R(t, g, "whitespace")(e) : (a += 1, s && (s = !1, r += 1), e === 124 ? (t.enter("tableCellDivider"), t.consume(e), t.exit("tableCellDivider"), s = !0, g) : (t.enter("data"), b(e)));
  }
  function b(e) {
    return e === null || e === 124 || M(e) ? (t.exit("data"), g(e)) : (t.consume(e), e === 92 ? h : b);
  }
  function h(e) {
    return e === 92 || e === 124 ? (t.consume(e), b) : b(e);
  }
  function d(e) {
    return l.interrupt = !1, l.parser.lazy[l.now().line] ? n(e) : (t.enter("tableDelimiterRow"), s = !1, y(e) ? R(t, u, "linePrefix", l.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(e) : u(e));
  }
  function u(e) {
    return e === 45 || e === 58 ? O(e) : e === 124 ? (s = !0, t.enter("tableCellDivider"), t.consume(e), t.exit("tableCellDivider"), v) : D(e);
  }
  function v(e) {
    return y(e) ? R(t, O, "whitespace")(e) : O(e);
  }
  function O(e) {
    return e === 58 ? (a += 1, s = !0, t.enter("tableDelimiterMarker"), t.consume(e), t.exit("tableDelimiterMarker"), N) : e === 45 ? (a += 1, N(e)) : e === null || E(e) ? j(e) : D(e);
  }
  function N(e) {
    return e === 45 ? (t.enter("tableDelimiterFiller"), H(e)) : D(e);
  }
  function H(e) {
    return e === 45 ? (t.consume(e), H) : e === 58 ? (s = !0, t.exit("tableDelimiterFiller"), t.enter("tableDelimiterMarker"), t.consume(e), t.exit("tableDelimiterMarker"), T) : (t.exit("tableDelimiterFiller"), T(e));
  }
  function T(e) {
    return y(e) ? R(t, j, "whitespace")(e) : j(e);
  }
  function j(e) {
    return e === 124 ? u(e) : e === null || E(e) ? !s || r !== a ? D(e) : (t.exit("tableDelimiterRow"), t.exit("tableHead"), i(e)) : D(e);
  }
  function D(e) {
    return n(e);
  }
  function B(e) {
    return t.enter("tableRow"), C(e);
  }
  function C(e) {
    return e === 124 ? (t.enter("tableCellDivider"), t.consume(e), t.exit("tableCellDivider"), C) : e === null || E(e) ? (t.exit("tableRow"), i(e)) : y(e) ? R(t, C, "whitespace")(e) : (t.enter("data"), A(e));
  }
  function A(e) {
    return e === null || e === 124 || M(e) ? (t.exit("data"), C(e)) : (t.consume(e), e === 92 ? L : A);
  }
  function L(e) {
    return e === 92 || e === 124 ? (t.consume(e), A) : A(e);
  }
}
function J(t, i) {
  let n = -1, l = !0, r = 0, a = [0, 0, 0, 0], s = [0, 0, 0, 0], f = !1, m = 0, o, g, b;
  const h = new _();
  for (; ++n < t.length; ) {
    const d = t[n], u = d[1];
    d[0] === "enter" ? u.type === "tableHead" ? (f = !1, m !== 0 && (x(h, i, m, o, g), g = void 0, m = 0), o = {
      type: "table",
      start: Object.assign({}, u.start),
      // Note: correct end is set later.
      end: Object.assign({}, u.end)
    }, h.add(n, 0, [["enter", o, i]])) : u.type === "tableRow" || u.type === "tableDelimiterRow" ? (l = !0, b = void 0, a = [0, 0, 0, 0], s = [0, n + 1, 0, 0], f && (f = !1, g = {
      type: "tableBody",
      start: Object.assign({}, u.start),
      // Note: correct end is set later.
      end: Object.assign({}, u.end)
    }, h.add(n, 0, [["enter", g, i]])), r = u.type === "tableDelimiterRow" ? 2 : g ? 3 : 1) : r && (u.type === "data" || u.type === "tableDelimiterMarker" || u.type === "tableDelimiterFiller") ? (l = !1, s[2] === 0 && (a[1] !== 0 && (s[0] = s[1], b = k(h, i, a, r, void 0, b), a = [0, 0, 0, 0]), s[2] = n)) : u.type === "tableCellDivider" && (l ? l = !1 : (a[1] !== 0 && (s[0] = s[1], b = k(h, i, a, r, void 0, b)), a = s, s = [a[1], n, 0, 0])) : u.type === "tableHead" ? (f = !0, m = n) : u.type === "tableRow" || u.type === "tableDelimiterRow" ? (m = n, a[1] !== 0 ? (s[0] = s[1], b = k(h, i, a, r, n, b)) : s[1] !== 0 && (b = k(h, i, s, r, n, b)), r = 0) : r && (u.type === "data" || u.type === "tableDelimiterMarker" || u.type === "tableDelimiterFiller") && (s[3] = n);
  }
  for (m !== 0 && x(h, i, m, o, g), h.consume(i.events), n = -1; ++n < i.events.length; ) {
    const d = i.events[n];
    d[0] === "enter" && d[1].type === "table" && (d[1]._align = q(i.events, n));
  }
  return t;
}
function k(t, i, n, l, r, a) {
  const s = l === 1 ? "tableHeader" : l === 2 ? "tableDelimiter" : "tableData", f = "tableContent";
  n[0] !== 0 && (a.end = Object.assign({}, p(i.events, n[0])), t.add(n[0], 0, [["exit", a, i]]));
  const m = p(i.events, n[1]);
  if (a = {
    type: s,
    start: Object.assign({}, m),
    // Note: correct end is set later.
    end: Object.assign({}, m)
  }, t.add(n[1], 0, [["enter", a, i]]), n[2] !== 0) {
    const o = p(i.events, n[2]), g = p(i.events, n[3]), b = {
      type: f,
      start: Object.assign({}, o),
      end: Object.assign({}, g)
    };
    if (t.add(n[2], 0, [["enter", b, i]]), l !== 2) {
      const h = i.events[n[2]], d = i.events[n[3]];
      if (h[1].end = Object.assign({}, d[1].end), h[1].type = "chunkText", h[1].contentType = "text", n[3] > n[2] + 1) {
        const u = n[2] + 1, v = n[3] - n[2] - 1;
        t.add(u, v, []);
      }
    }
    t.add(n[3] + 1, 0, [["exit", b, i]]);
  }
  return r !== void 0 && (a.end = Object.assign({}, p(i.events, r)), t.add(r, 0, [["exit", a, i]]), a = void 0), a;
}
function x(t, i, n, l, r) {
  const a = [], s = p(i.events, n);
  r && (r.end = Object.assign({}, s), a.push(["exit", r, i])), l.end = Object.assign({}, s), a.push(["exit", l, i]), t.add(n + 1, 0, a);
}
function p(t, i) {
  const n = t[i], l = n[0] === "enter" ? "start" : "end";
  return n[1][l];
}
export {
  W as gfmTable,
  U as gfmTableHtml
};
