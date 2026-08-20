//#region node_modules/@speed-highlight/core/dist/languages/asm.js
var e = [
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
//#endregion
export { e as default };
