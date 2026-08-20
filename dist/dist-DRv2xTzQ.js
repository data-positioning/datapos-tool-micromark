//#region node_modules/@speed-highlight/core/dist/index.js
var e = (e) => (t) => {
	var n = e[t];
	if (n) return n();
	throw Error("Module not found in bundle: " + t);
}, t = {
	num: {
		type: "num",
		match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g
	},
	str: {
		type: "str",
		match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g
	},
	strDouble: {
		type: "str",
		match: /"((?!")[^\r\n\\]|\\[^])*"?/g
	}
};
function* n(e, r, i, a) {
	let o = 0;
	try {
		let a, s, c = {}, l, u = [], d = typeof r == "string" ? yield r : r, f = [...d.sub ?? d];
		for (; o < e.length;) {
			for (c.index = null, a = f.length; a-- > 0;) {
				if (s = f[a].expand ? t[f[a].expand] : f[a], u[a] === void 0 || u[a].match.index < o) {
					if (s.match.lastIndex = o, l = s.match.exec(e), l === null) {
						f.splice(a, 1), u.splice(a, 1);
						continue;
					}
					u[a] = {
						match: l,
						lastIndex: s.match.lastIndex
					};
				}
				u[a].match[0] && (u[a].match.index <= c.index || c.index === null) && (c = {
					part: s,
					index: u[a].match.index,
					match: u[a].match[0],
					end: u[a].lastIndex
				});
			}
			if (c.index === null) break;
			i(e.slice(o, c.index), d.type), o = c.index, c.part.sub ? yield* n(c.match, typeof c.part.sub == "string" ? c.part.sub : typeof c.part.sub == "function" ? c.part.sub(c.match) : c.part, i, c.part.type) : i(c.match, c.part.type), o = c.end;
		}
		i(e.slice(o, e.length), d.type);
	} catch {
		i(e.slice(o), a);
	}
}
var r = e({
	"./languages/asm.js": () => import("./asm-BlBFo9kg.js"),
	"./languages/bash.js": () => import("./bash-DBdZzU-Z.js"),
	"./languages/bf.js": () => import("./bf-DyrOHY0l.js"),
	"./languages/c.js": () => import("./c-Du-5HtYA.js"),
	"./languages/css.js": () => import("./css-BnMjXUr8.js"),
	"./languages/csv.js": () => import("./csv-CEW8W5c_.js"),
	"./languages/diff.js": () => import("./diff-XVkHtLNu.js"),
	"./languages/docker.js": () => import("./docker-PIn81DgH.js"),
	"./languages/git.js": () => import("./git-ByN02Eg5.js"),
	"./languages/go.js": () => import("./go-X8dsnhRi.js"),
	"./languages/html.js": () => import("./html-BfuFQfc8.js"),
	"./languages/http.js": () => import("./http-BAlZb4g1.js"),
	"./languages/index.js": () => import("./languages-Cl_wXK_z.js"),
	"./languages/ini.js": () => import("./ini-BRzSgkFu.js"),
	"./languages/java.js": () => import("./java-iDtrcWRK.js"),
	"./languages/js.js": () => import("./js-BYQ9mm_M.js"),
	"./languages/jsdoc.js": () => import("./jsdoc-BbXJQGBL.js"),
	"./languages/json.js": () => import("./json-B1YjY9ed.js"),
	"./languages/leanpub-md.js": () => import("./leanpub-md-C6FTGjMZ.js"),
	"./languages/log.js": () => import("./log-C89tvDiU.js"),
	"./languages/lua.js": () => import("./lua-DChoWFAU.js"),
	"./languages/make.js": () => import("./make-6dP4GZxe.js"),
	"./languages/md.js": () => import("./md-DvaShtM_.js"),
	"./languages/pl.js": () => import("./pl-D-icLzBp.js"),
	"./languages/plain.js": () => import("./plain-CKkAWdMi.js"),
	"./languages/py.js": () => import("./py-ChyNH1Ow.js"),
	"./languages/regex.js": () => import("./regex-CDvdT5xr.js"),
	"./languages/rs.js": () => import("./rs-B4sYrwTu.js"),
	"./languages/sql.js": () => import("./sql-DsYRlcMF.js"),
	"./languages/todo.js": () => import("./todo-CGLS57ju.js"),
	"./languages/toml.js": () => import("./toml-Dyf4QHlN.js"),
	"./languages/ts.js": () => import("./ts-CHR2kmGf.js"),
	"./languages/uri.js": () => import("./uri-837VxUwj.js"),
	"./languages/xml.js": () => import("./xml-CItgL9jR.js"),
	"./languages/yaml.js": () => import("./yaml-B6q2zAjl.js")
}), i = (e) => r(`./languages/${e}.js`), a = i;
function o(e) {
	a = e;
}
var s = {}, c = (e = "") => e.replaceAll("&", "&#38;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), l = (e, t) => t ? `<span class="shj-syn-${t}">${e}</span>` : e;
async function u(e, t, r) {
	let i = n(e, t, r), o = i.next();
	for (; !o.done;) {
		let e = o.value, t;
		try {
			t = await (s[e] ?? (s[e] = a(e)));
		} catch {}
		o = i.next(t?.default ?? t);
	}
}
async function d(e, t, n = {}) {
	let r = "";
	return await u(e, t, (e, t) => r += l(c(e), t)), n.block ?? !0 ? `<div><div class="shj-numbers">${"<div></div>".repeat(n.showLineNumbers ? e.split("\n").length : 0)}</div><div>${r}</div></div>` : r;
}
async function f(e, t = e.className.match(/shj-lang-([\w-]+)/)?.[1], n = {}) {
	let r = e.textContent, i = n.block ?? e.tagName != "CODE";
	e.dataset.lang = t, e.className = `${[...e.classList].filter((e) => !e.startsWith("shj-")).join(" ")} shj-lang-${t} shj-${i ? "block" : "inline"}`, e.innerHTML = await d(r, t, {
		...n,
		block: i
	});
}
async function p(e) {
	return Promise.all(Array.from(document.querySelectorAll("[class*=\"shj-lang-\"]")).map((t) => f(t, void 0, e)));
}
async function m(e, t, n) {
	let r = "";
	return await u(e, t, (e, t) => r += t ? `${n[t] ?? ""}${e}\x1B[0m` : e), r;
}
//#endregion
export { i as defaultLoader, m as highlightANSI, p as highlightAll, f as highlightElement, d as highlightHTML, o as setLoader, u as tokenize };
