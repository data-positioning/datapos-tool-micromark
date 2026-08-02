//#region node_modules/@speed-highlight/core/dist/index.js
var e = Object.defineProperty, t = (e) => (t) => {
	var n = e[t];
	if (n) return n();
	throw Error("Module not found in bundle: " + t);
}, n = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, r = (t, n) => {
	for (var r in n) e(t, r, {
		get: n[r],
		enumerable: !0
	});
}, i = {};
r(i, { default: () => a });
var a, o = n(() => {
	a = [
		{
			type: "cmnt",
			match: /(;|#).*/gm
		},
		{ expand: "str" },
		{ expand: "num" },
		{
			type: "num",
			match: /\$[\da-fA-F]*\b/g
		},
		{
			type: "kwd",
			match: /^[a-z]+\s+[a-z.]+\b/gm,
			sub: [{
				type: "func",
				match: /^[a-z]+/g
			}]
		},
		{
			type: "kwd",
			match: /^[ \t]*[a-z][a-z\d]*\b/gm
		},
		{
			match: /%|\$/g,
			type: "oper"
		}
	];
}), s = {};
r(s, { default: () => l });
var c, l, u = n(() => {
	c = {
		type: "var",
		match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g
	}, l = [
		{
			sub: "todo",
			match: /#.*/g
		},
		{
			type: "str",
			match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,
			sub: [c]
		},
		{
			type: "oper",
			match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi
		},
		{
			type: "kwd",
			match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g
		},
		{ expand: "num" },
		{
			type: "func",
			match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gim
		},
		{
			type: "bool",
			match: /(?<=\s|^)(true|false)(?=\s|$)/g
		},
		{
			type: "oper",
			match: /[=(){}<>!]+/g
		},
		{
			type: "var",
			match: /(?<=\s|^)[\w_]+(?=\s*=)/g
		},
		c
	];
}), d = {};
r(d, { default: () => f });
var f, ee = n(() => {
	f = [
		{
			match: /[^,\[\->+.<\]\s].*/g,
			sub: "todo"
		},
		{
			type: "func",
			match: /\.+/g
		},
		{
			type: "kwd",
			match: /[<>]+/g
		},
		{
			type: "oper",
			match: /[+-]+/g
		}
	];
}), p = {};
r(p, { default: () => m });
var m, te = n(() => {
	m = [
		{
			match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{ expand: "num" },
		{
			type: "kwd",
			match: /#\s*include (<.*>|".*")/g,
			sub: [{
				type: "str",
				match: /(<|").*/g
			}]
		},
		{
			match: /asm\s*{[^}]*}/g,
			sub: [{
				type: "kwd",
				match: /^asm/g
			}, {
				match: /[^{}]*(?=}$)/g,
				sub: "asm"
			}]
		},
		{
			type: "kwd",
			match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g
		},
		{
			type: "oper",
			match: /[/*+:?&|%^~=!,<>.^-]+/g
		},
		{
			type: "func",
			match: /[a-zA-Z_][\w_]*(?=\s*\()/g
		},
		{
			type: "class",
			match: /\b[A-Z][\w_]*\b/g
		}
	];
}), h = {};
r(h, { default: () => g });
var g, ne = n(() => {
	g = [
		{
			match: /\/\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{
			type: "kwd",
			match: /@\w+\b|\b(and|not|only|or)\b|\b(?=([a-z-]+))\2(?=[^{}]*{)/g
		},
		{
			type: "var",
			match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g
		},
		{
			type: "func",
			match: /#[\w-]+(?=[^{}]*{)/g
		},
		{
			type: "num",
			match: /#[\da-f]{3,8}/g
		},
		{
			type: "num",
			match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g,
			sub: [{
				type: "var",
				match: /[a-z]+|%/g
			}]
		},
		{
			match: /url\([^)]*\)/g,
			sub: [{
				type: "func",
				match: /url(?=\()/g
			}, {
				type: "str",
				match: /[^()]+/g
			}]
		},
		{
			type: "func",
			match: /\b[a-zA-Z]\w*(?=\s*\()/g
		},
		{
			type: "num",
			match: /\b[a-z-]+\b/g
		}
	];
}), _ = {};
r(_, { default: () => v });
var v, re = n(() => {
	v = [{ expand: "strDouble" }, {
		type: "oper",
		match: /,/g
	}];
}), y = {};
r(y, { default: () => b });
var b, ie = n(() => {
	b = [
		{
			type: "deleted",
			match: /^[-<].*/gm
		},
		{
			type: "insert",
			match: /^[+>].*/gm
		},
		{
			type: "kwd",
			match: /!.*/gm
		},
		{
			type: "section",
			match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm
		}
	];
}), ae = {};
r(ae, { default: () => oe });
var oe, se = n(() => {
	u(), oe = [{
		type: "kwd",
		match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gim
	}, ...l];
}), ce = {};
r(ce, { default: () => le });
var le, ue = n(() => {
	ie(), le = [
		{
			match: /^#.*/gm,
			sub: "todo"
		},
		{ expand: "str" },
		...b,
		{
			type: "func",
			match: /^(\$ )?git(\s.*)?$/gm
		},
		{
			type: "kwd",
			match: /^commit \w+$/gm
		}
	];
}), de = {};
r(de, { default: () => x });
var x, fe = n(() => {
	x = [
		{
			match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{ expand: "num" },
		{
			type: "kwd",
			match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g
		},
		{
			type: "func",
			match: /[a-zA-Z_][\w_]*(?=\s*\()/g
		},
		{
			type: "class",
			match: /\b[A-Z][\w_]*\b/g
		},
		{
			type: "oper",
			match: /[+\-*\/%&|^~=!<>.^-]+/g
		}
	];
}), S = {};
r(S, {
	default: () => O,
	name: () => T,
	properties: () => E,
	xmlElement: () => D
});
var C, w, T, E, D, O, k = n(() => {
	C = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", w = C + "\\-\\.0-9·̀-ͯ‿-⁀", T = `[${C}][${w}]*`, E = `(\\s+${T}\\s*(=\\s*([^"'>\\s][^>\\s]*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?)*\\s*`, D = {
		match: RegExp(`<[/!?]?${T}${E}[/!?]?>`, "g"),
		sub: [
			{
				type: "var",
				match: RegExp(`^<[/!?]?${T}`, "g"),
				sub: [{
					type: "oper",
					match: /^<[\/!?]?/g
				}]
			},
			{
				type: "str",
				match: /=\s*([^"'>\s][^>\s]*|("|')(\\[^]|(?!\2)[^])*\2?)/g,
				sub: [{
					type: "oper",
					match: /^=/g
				}]
			},
			{
				type: "oper",
				match: /[\/!?]?>/g
			},
			{
				type: "class",
				match: RegExp(T, "g")
			}
		]
	}, O = [
		{
			match: /<!--[^]*?-->/g,
			sub: "todo"
		},
		{
			type: "class",
			match: /<!\[CDATA\[[\s\S]*?\]\]>/gi
		},
		D,
		{
			type: "str",
			match: RegExp(`<\\?${T}([^?]|\\?[^?>])*\\?+>`, "g"),
			sub: [{
				type: "var",
				match: RegExp(`^<\\?${T}`, "g"),
				sub: [{
					type: "oper",
					match: /^<\?/g
				}]
			}, {
				type: "oper",
				match: /\?+>$/g
			}]
		},
		{
			type: "var",
			match: /&(#x?)?[\da-z]{1,8};/gi
		}
	];
}), A = {};
r(A, { default: () => j });
var j, pe = n(() => {
	k(), j = [
		{
			type: "class",
			match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi,
			sub: [
				{
					type: "str",
					match: /"[^"]*"|'[^']*'/g
				},
				{
					type: "oper",
					match: /^<!|>$/g
				},
				{
					type: "var",
					match: /DOCTYPE/gi
				}
			]
		},
		{
			match: RegExp(`<style${E}>[^]*?</style\\s*>`, "g"),
			sub: [
				{
					match: RegExp(`^<style${E}>`, "g"),
					sub: D.sub
				},
				{
					match: RegExp(`${D.match}|[^]*(?=</style\\s*>$)`, "g"),
					sub: "css"
				},
				D
			]
		},
		{
			match: RegExp(`<script${E}>[^]*?<\/script\\s*>`, "g"),
			sub: [
				{
					match: RegExp(`^<script${E}>`, "g"),
					sub: D.sub
				},
				{
					match: RegExp(`${D.match}|[^]*(?=<\/script\\s*>$)`, "g"),
					sub: "js"
				},
				D
			]
		},
		...O
	];
}), M, N, P = n(() => {
	M = [
		[
			"bash",
			[/#!(\/usr)?\/bin\/bash/g, 500],
			[/\b(if|elif|then|fi|echo)\b|\$/g, 10]
		],
		[
			"html",
			[/<\/?[a-z-]+[^\n>]*>/g, 10],
			[/^\s+<!DOCTYPE\s+html/g, 500]
		],
		["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]],
		["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|document|window)\b/g, 10]],
		["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|document|window|implements|interface|namespace)\b/g, 10]],
		["py", [/\b(def|print|await|async|class|and|or|lambda|import|from|self|asyncio|pass|True|False|None|__init__)\b/g, 10]],
		["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]],
		[
			"pl",
			[/#!(\/usr)?\/bin\/perl/g, 500],
			[/\b(use|print)\b|\$/g, 10]
		],
		["lua", [/#!(\/usr)?\/bin\/lua/g, 500]],
		["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]],
		["uri", [/https?:|mailto:|tel:|ftp:/g, 30]],
		["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
		[
			"diff",
			[/^[+><-]/gm, 10],
			[/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]
		],
		[
			"md",
			[/^(>|\t\*|\t\d+.)/gm, 10],
			[/\[.*\](.*)/g, 10]
		],
		["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]],
		[
			"xml",
			[/<\/?[a-z-]+[^\n>]*>/g, 10],
			[/^<\?xml/g, 500]
		],
		["c", [/#include\b|\bprintf\s+\(/g, 100]],
		["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]],
		["go", [/\b(func|fmt|package)\b/g, 100]],
		["java", [/^import\s+java/gm, 500]],
		["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]],
		["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
		["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]],
		["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gim, 10]]
	], N = (e) => M.map(([t, ...n]) => [t, n.reduce((t, [n, r]) => t + [...e.matchAll(n)].length * r, 0)]).filter(([e, t]) => t > 20).sort((e, t) => t[1] - e[1])[0]?.[0] || "plain";
}), F = {};
r(F, { default: () => I });
var I, me = n(() => {
	P(), I = [
		{
			type: "kwd",
			match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm
		},
		{ expand: "str" },
		{
			type: "section",
			match: /\bHTTP\/[\d.]+\b/g
		},
		{ expand: "num" },
		{
			type: "oper",
			match: /[,;:=]/g
		},
		{
			type: "var",
			match: /[a-zA-Z][\w-]*(?=:)/g
		},
		{
			match: /\n\n[^]*/g,
			sub: N
		}
	];
}), L = {};
r(L, { default: () => R });
var R, he = n(() => {
	R = [
		{
			match: /(^[ \f\t\v]*)[#;].*/gm,
			sub: "todo"
		},
		{
			type: "var",
			match: /.*(?==)/g
		},
		{
			type: "section",
			match: /^\s*\[.+\]\s*$/gm
		},
		{
			type: "oper",
			match: /=/g
		},
		{
			type: "str",
			match: /.*/g
		}
	];
}), z = {};
r(z, { default: () => B });
var B, ge = n(() => {
	B = [
		{
			match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{ expand: "num" },
		{
			type: "kwd",
			match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g
		},
		{
			type: "oper",
			match: /[/*+:?&|%^~=!,<>.^-]+/g
		},
		{
			type: "func",
			match: /[a-zA-Z_][\w_]*(?=\s*\()/g
		},
		{
			type: "class",
			match: /\b[A-Z][\w_]*\b/g
		}
	];
}), V = {};
r(V, { default: () => H });
var H, U = n(() => {
	H = [
		{ match: /(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g },
		{
			match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "jsdoc"
		},
		{
			match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{
			match: /`((?!`)[^]|\\[^])*`?/g,
			sub: "js_template_literals"
		},
		{
			type: "kwd",
			match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g
		},
		{
			match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g,
			sub: "regex"
		},
		{ expand: "num" },
		{
			type: "num",
			match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g
		},
		{
			type: "bool",
			match: /\b(true|false)\b/g
		},
		{
			type: "oper",
			match: /[/*+:?&|%^~=!,<>.^-]+/g
		},
		{
			type: "class",
			match: /\b[A-Z][\w_]*\b/g
		},
		{
			type: "func",
			match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g
		}
	];
}), W = {};
r(W, {
	default: () => G,
	type: () => K
});
var G, K, _e = n(() => {
	G = [{
		match: new class {
			exec(e) {
				let t = this.lastIndex, n, r = (n) => {
					for (; ++t < e.length - 2;) if (e[t] == "{") r();
					else if (e[t] == "}") return;
				};
				for (; t < e.length; ++t) if (e[t - 1] != "\\" && e[t] == "$" && e[t + 1] == "{") return n = t++, r(t), this.lastIndex = t + 1, {
					index: n,
					0: e.slice(n, t + 1)
				};
				return null;
			}
		}(),
		sub: [{
			type: "kwd",
			match: /^\${|}$/g
		}, {
			match: /(?!^\$|{)[^]+(?=}$)/g,
			sub: "js"
		}]
	}], K = "str";
}), q = {};
r(q, {
	default: () => J,
	type: () => Y
});
var J, Y, ve = n(() => {
	J = [
		{
			type: "err",
			match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g
		},
		{
			type: "class",
			match: /\bIDEA\b/g
		},
		{
			type: "insert",
			match: /\b(CHANGED|FIX|CHANGE)\b/g
		},
		{
			type: "oper",
			match: /\bQUESTION\b/g
		}
	], Y = "cmnt";
}), ye = {};
r(ye, {
	default: () => be,
	type: () => xe
});
var be, xe, Se = n(() => {
	ve(), be = [
		{
			type: "kwd",
			match: /@\w+/g
		},
		{
			type: "class",
			match: /{[\w\s|<>,.@\[\]]+}/g
		},
		{
			type: "var",
			match: /\[[\w\s="']+\]/g
		},
		...J
	], xe = "cmnt";
}), Ce = {};
r(Ce, { default: () => we });
var we, Te = n(() => {
	we = [
		{
			type: "var",
			match: /(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g
		},
		{ expand: "str" },
		{ expand: "num" },
		{
			type: "num",
			match: /\bnull\b/g
		},
		{
			type: "bool",
			match: /\b(true|false)\b/g
		}
	];
}), Ee = {};
r(Ee, { default: () => X });
var X, De = n(() => {
	P(), X = [
		{
			type: "cmnt",
			match: /^>.*|(=|-)\1+/gm
		},
		{
			type: "class",
			match: /\*\*.*?\*\*/g
		},
		{
			match: /^(`{3,})(.*)\n[^]*?^\1[ \t]*$/gm,
			sub: (e) => ({
				type: "kwd",
				sub: [{
					match: /\n[^]*(?=```)/g,
					sub: e.split("\n")[0].slice(3) || N(e)
				}]
			})
		},
		{
			type: "str",
			match: /`[^`]*`/g
		},
		{
			type: "var",
			match: /~~.*?~~/g
		},
		{
			type: "kwd",
			match: /\b_\S([^\n]*?\S)?_\b|\*\S([^\n]*?\S)?\*/g
		},
		{
			type: "kwd",
			match: /^\s*(\*|\d+\.)\s/gm
		},
		{
			type: "func",
			match: /\[[^\]]*]\([^)]*\)|<[^>]*>/g,
			sub: [{
				type: "oper",
				match: /^\[[^\]]*]/g
			}]
		}
	];
}), Oe = {};
r(Oe, { default: () => ke });
var ke, Ae = n(() => {
	De(), P(), ke = [
		{
			type: "insert",
			match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g,
			sub: [{
				type: "insert",
				match: /leanpub-(start|end)-insert/g
			}, {
				match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g,
				sub: N
			}]
		},
		{
			type: "deleted",
			match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g,
			sub: [{
				type: "deleted",
				match: /leanpub-(start|end)-delete/g
			}, {
				match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g,
				sub: N
			}]
		},
		...X
	];
}), je = {};
r(je, { default: () => Me });
var Me, Ne = n(() => {
	Me = [
		{
			type: "cmnt",
			match: /^#.*/gm
		},
		{ expand: "strDouble" },
		{ expand: "num" },
		{
			type: "err",
			match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi
		},
		{
			type: "num",
			match: /\b(null|undefined)\b/gi
		},
		{
			type: "bool",
			match: /\b(false|true|yes|no)\b/gi
		},
		{
			type: "oper",
			match: /\.|,/g
		}
	];
}), Pe = {};
r(Pe, { default: () => Fe });
var Fe, Ie = n(() => {
	Fe = [
		{
			match: /^#!.*|--(\[(=*)\[[^]*?--\]\2\]|.*)/g,
			sub: "todo"
		},
		{ expand: "str" },
		{
			type: "kwd",
			match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g
		},
		{
			type: "bool",
			match: /\b(true|false|nil)\b/g
		},
		{
			type: "oper",
			match: /[+*/%^#=~<>:,.-]+/g
		},
		{ expand: "num" },
		{
			type: "func",
			match: /[a-z_]+(?=\s*[({])/g
		}
	];
}), Le = {};
r(Le, { default: () => Re });
var Re, ze = n(() => {
	Re = [
		{
			match: /^\s*#.*/gm,
			sub: "todo"
		},
		{ expand: "str" },
		{
			type: "oper",
			match: /[${}()]+/g
		},
		{
			type: "class",
			match: /.PHONY:/gm
		},
		{
			type: "section",
			match: /^[\w.]+:/gm
		},
		{
			type: "kwd",
			match: /\b(ifneq|endif)\b/g
		},
		{ expand: "num" },
		{
			type: "var",
			match: /[A-Z_]+(?=\s*=)/g
		},
		{
			match: /^.*$/gm,
			sub: "bash"
		}
	];
}), Be = {};
r(Be, { default: () => Ve });
var Ve, He = n(() => {
	Ve = [
		{
			match: /#.*/g,
			sub: "todo"
		},
		{
			type: "str",
			match: /(["'])(\\[^]|(?!\1)[^])*\1?/g
		},
		{ expand: "num" },
		{
			type: "kwd",
			match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g
		},
		{
			type: "oper",
			match: /[-+*/%~!&<>|=?,]+/g
		},
		{
			type: "func",
			match: /[a-z_]+(?=\s*\()/g
		}
	];
}), Ue = {};
r(Ue, { default: () => We });
var We, Ge = n(() => {
	We = [{ expand: "strDouble" }];
}), Ke = {};
r(Ke, { default: () => qe });
var qe, Je = n(() => {
	qe = [
		{
			match: /#.*/g,
			sub: "todo"
		},
		{
			type: "str",
			match: /f("""|''')(\\[^]|(?!\1)[^])*\1?|f("|')(\\[^]|(?!\3).)*\3?/gi,
			sub: [{
				type: "var",
				match: /{[^{}]*}/g,
				sub: [{
					match: /(?!^{)[^]*(?=}$)/g,
					sub: "py"
				}]
			}]
		},
		{
			match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{
			type: "kwd",
			match: /\b(and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g
		},
		{
			type: "bool",
			match: /\b(False|True|None)\b/g
		},
		{ expand: "num" },
		{
			type: "func",
			match: /[a-z_]\w*(?=\s*\()/gi
		},
		{
			type: "oper",
			match: /[-/*+<>,=!&|^%]+/g
		},
		{
			type: "class",
			match: /\b[A-Z][\w_]*\b/g
		}
	];
}), Ye = {};
r(Ye, {
	default: () => Xe,
	type: () => Ze
});
var Xe, Ze, Qe = n(() => {
	Xe = [
		{
			match: /^(?!\/).*/gm,
			sub: "todo"
		},
		{
			type: "num",
			match: /\[((?!\])[^\\]|\\.)*\]/g
		},
		{
			type: "kwd",
			match: /\||\^|\$|\\.|\w+($|\r|\n)/g
		},
		{
			type: "var",
			match: /\*|\+|\{\d+,\d+\}/g
		}
	], Ze = "oper";
}), $e = {};
r($e, { default: () => et });
var et, tt = n(() => {
	et = [
		{
			match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{ expand: "num" },
		{
			type: "kwd",
			match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g
		},
		{
			type: "oper",
			match: /[/*+:?&|%^~=!,<>.^-]+/g
		},
		{
			type: "class",
			match: /\b[A-Z][\w_]*\b/g
		},
		{
			type: "func",
			match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g
		}
	];
}), nt = {};
r(nt, { default: () => rt });
var rt, it = n(() => {
	rt = [
		{
			match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
			sub: "todo"
		},
		{ expand: "str" },
		{
			type: "func",
			match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/gi
		},
		{
			type: "kwd",
			match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/gi
		},
		{
			type: "num",
			match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/gi
		},
		{
			type: "bool",
			match: /\b(TRUE|FALSE)\b/gi
		},
		{
			type: "oper",
			match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/gi
		},
		{
			type: "var",
			match: /@\S+/g
		}
	];
}), at = {};
r(at, { default: () => ot });
var ot, st = n(() => {
	ot = [
		{
			match: /#.*/g,
			sub: "todo"
		},
		{
			type: "str",
			match: /("""|''')((?!\1)[^]|\\[^])*\1?/g
		},
		{ expand: "str" },
		{
			type: "section",
			match: /^\[.+\]\s*$/gm
		},
		{
			type: "num",
			match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g
		},
		{ expand: "num" },
		{
			type: "bool",
			match: /\b(true|false)\b/g
		},
		{
			type: "oper",
			match: /[+,.=-]/g
		},
		{
			type: "var",
			match: /[\w-]+(?=\s*=)/g
		}
	];
}), ct = {};
r(ct, { default: () => Z });
var Z, lt = n(() => {
	U(), Z = [
		{
			type: "type",
			match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g
		},
		{
			type: "kwd",
			match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g
		},
		...H
	];
}), ut = {};
r(ut, { default: () => dt });
var dt, ft = n(() => {
	dt = [
		{
			match: /^#.*/gm,
			sub: "todo"
		},
		{
			type: "class",
			match: /^\w+(?=:)/gm
		},
		{
			type: "num",
			match: /:\d+/g
		},
		{
			type: "oper",
			match: /[:/&?]|\w+=/g
		},
		{
			type: "func",
			match: /[.\w]+@|#[\w]+$/gm
		},
		{
			type: "var",
			match: /\w+\.\w+(\.\w+)*/g
		}
	];
}), pt = {};
r(pt, { default: () => mt });
var mt, ht = n(() => {
	mt = [
		{
			match: /#.*/g,
			sub: "todo"
		},
		{ expand: "str" },
		{
			type: "str",
			match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g
		},
		{
			type: "type",
			match: /!![a-z]+/g
		},
		{
			type: "bool",
			match: /\b(Yes|No)\b/g
		},
		{
			type: "oper",
			match: /[+:-]/g
		},
		{ expand: "num" },
		{
			type: "var",
			match: /[a-zA-Z][\w-]*(?=:)/g
		}
	];
}), gt = {
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
}, _t = t({
	"./languages/asm.js": () => Promise.resolve().then(() => (o(), i)),
	"./languages/bash.js": () => Promise.resolve().then(() => (u(), s)),
	"./languages/bf.js": () => Promise.resolve().then(() => (ee(), d)),
	"./languages/c.js": () => Promise.resolve().then(() => (te(), p)),
	"./languages/css.js": () => Promise.resolve().then(() => (ne(), h)),
	"./languages/csv.js": () => Promise.resolve().then(() => (re(), _)),
	"./languages/diff.js": () => Promise.resolve().then(() => (ie(), y)),
	"./languages/docker.js": () => Promise.resolve().then(() => (se(), ae)),
	"./languages/git.js": () => Promise.resolve().then(() => (ue(), ce)),
	"./languages/go.js": () => Promise.resolve().then(() => (fe(), de)),
	"./languages/html.js": () => Promise.resolve().then(() => (pe(), A)),
	"./languages/http.js": () => Promise.resolve().then(() => (me(), F)),
	"./languages/ini.js": () => Promise.resolve().then(() => (he(), L)),
	"./languages/java.js": () => Promise.resolve().then(() => (ge(), z)),
	"./languages/js.js": () => Promise.resolve().then(() => (U(), V)),
	"./languages/js_template_literals.js": () => Promise.resolve().then(() => (_e(), W)),
	"./languages/jsdoc.js": () => Promise.resolve().then(() => (Se(), ye)),
	"./languages/json.js": () => Promise.resolve().then(() => (Te(), Ce)),
	"./languages/leanpub-md.js": () => Promise.resolve().then(() => (Ae(), Oe)),
	"./languages/log.js": () => Promise.resolve().then(() => (Ne(), je)),
	"./languages/lua.js": () => Promise.resolve().then(() => (Ie(), Pe)),
	"./languages/make.js": () => Promise.resolve().then(() => (ze(), Le)),
	"./languages/md.js": () => Promise.resolve().then(() => (De(), Ee)),
	"./languages/pl.js": () => Promise.resolve().then(() => (He(), Be)),
	"./languages/plain.js": () => Promise.resolve().then(() => (Ge(), Ue)),
	"./languages/py.js": () => Promise.resolve().then(() => (Je(), Ke)),
	"./languages/regex.js": () => Promise.resolve().then(() => (Qe(), Ye)),
	"./languages/rs.js": () => Promise.resolve().then(() => (tt(), $e)),
	"./languages/sql.js": () => Promise.resolve().then(() => (it(), nt)),
	"./languages/todo.js": () => Promise.resolve().then(() => (ve(), q)),
	"./languages/toml.js": () => Promise.resolve().then(() => (st(), at)),
	"./languages/ts.js": () => Promise.resolve().then(() => (lt(), ct)),
	"./languages/uri.js": () => Promise.resolve().then(() => (ft(), ut)),
	"./languages/xml.js": () => Promise.resolve().then(() => (k(), S)),
	"./languages/yaml.js": () => Promise.resolve().then(() => (ht(), pt))
}), Q = {}, vt = (e = "") => e.replaceAll("&", "&#38;").replaceAll?.("<", "&lt;").replaceAll?.(">", "&gt;"), yt = (e, t) => t ? `<span class="shj-syn-${t}">${e}</span>` : e;
async function $(e, t, n) {
	try {
		let r, i, a = {}, o, s = [], c = 0, l = typeof t == "string" ? await (Q[t] ?? (Q[t] = _t(`./languages/${t}.js`))) : t, u = [...typeof t == "string" ? l.default : t.sub];
		for (; c < e.length;) {
			for (a.index = null, r = u.length; r-- > 0;) {
				if (i = u[r].expand ? gt[u[r].expand] : u[r], s[r] === void 0 || s[r].match.index < c) {
					if (i.match.lastIndex = c, o = i.match.exec(e), o === null) {
						u.splice(r, 1), s.splice(r, 1);
						continue;
					}
					s[r] = {
						match: o,
						lastIndex: i.match.lastIndex
					};
				}
				s[r].match[0] && (s[r].match.index <= a.index || a.index === null) && (a = {
					part: i,
					index: s[r].match.index,
					match: s[r].match[0],
					end: s[r].lastIndex
				});
			}
			if (a.index === null) break;
			n(e.slice(c, a.index), l.type), c = a.end, a.part.sub ? await $(a.match, typeof a.part.sub == "string" ? a.part.sub : typeof a.part.sub == "function" ? a.part.sub(a.match) : a.part, n) : n(a.match, a.part.type);
		}
		n(e.slice(c, e.length), l.type);
	} catch {
		n(e);
	}
}
async function bt(e, t, n = !0, r = {}) {
	let i = "";
	return await $(e, t, (e, t) => i += yt(vt(e), t)), n ? `<div><div class="shj-numbers">${"<div></div>".repeat(!r.hideLineNumbers && e.split("\n").length)}</div><div>${i}</div></div>` : i;
}
async function xt(e, t = e.className.match(/shj-lang-([\w-]+)/)?.[1], n, r) {
	let i = e.textContent;
	n ??= `${e.tagName == "CODE" ? "in" : i.split("\n").length < 2 ? "one" : "multi"}line`, e.dataset.lang = t, e.className = `${[...e.classList].filter((e) => !e.startsWith("shj-")).join(" ")} shj-lang-${t} shj-${n}`, e.innerHTML = await bt(i, t, n == "multiline", r);
}
var St = async (e) => Promise.all(Array.from(document.querySelectorAll("[class*=\"shj-lang-\"]")).map((t) => xt(t, void 0, void 0, e))), Ct = (e, t) => {
	Q[e] = t;
};
//#endregion
export { St as highlightAll, xt as highlightElement, bt as highlightText, Ct as loadLanguage, $ as tokenize };

//# sourceMappingURL=dist-DgSeMFwB.js.map