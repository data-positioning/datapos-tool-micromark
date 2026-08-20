//#region node_modules/@speed-highlight/core/dist/languages/toml.js
var e = [
	{
		match: /#.*/g,
		type: "cmnt",
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
//#endregion
export { e as default };
