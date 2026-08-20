//#region node_modules/@speed-highlight/core/dist/languages/html.js
var e = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", t = `[${e}][${e + "\\-\\.0-9·̀-ͯ‿-⁀"}]*`, n = `(\\s+${t}\\s*(=\\s*([^"'>\\s][^>\\s]*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?)*\\s*`, r = {
	match: RegExp(`<[/!?]?${t}${n}[/!?]?>`, "g"),
	sub: [
		{
			type: "var",
			match: RegExp(`^<[/!?]?${t}`, "g"),
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
			match: RegExp(t, "g")
		}
	]
}, i = [
	{
		match: /<!--[^]*?-->/g,
		type: "cmnt",
		sub: "todo"
	},
	{
		type: "class",
		match: /<!\[CDATA\[[\s\S]*?\]\]>/gi
	},
	r,
	{
		type: "str",
		match: RegExp(`<\\?${t}([^?]|\\?[^?>])*\\?+>`, "g"),
		sub: [{
			type: "var",
			match: RegExp(`^<\\?${t}`, "g"),
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
], a = [
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
		match: RegExp(`<style${n}>[^]*?</style\\s*>`, "g"),
		sub: [
			{
				match: RegExp(`^<style${n}>`, "g"),
				sub: r.sub
			},
			{
				match: /[^]*(?=<\/style\s*>$)/g,
				sub: "css"
			},
			r
		]
	},
	{
		match: RegExp(`<script${n}>[^]*?<\/script\\s*>`, "g"),
		sub: [
			{
				match: RegExp(`^<script${n}>`, "g"),
				sub: r.sub
			},
			{
				match: /[^]*(?=<\/script\s*>$)/g,
				sub: "js"
			},
			r
		]
	},
	...i
];
//#endregion
export { a as default };
