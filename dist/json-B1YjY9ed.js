//#region node_modules/@speed-highlight/core/dist/languages/json.js
var e = [
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
//#endregion
export { e as default };
