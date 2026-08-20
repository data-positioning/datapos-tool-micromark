//#region node_modules/@speed-highlight/core/dist/languages/uri.js
var e = [
	{
		match: /^#.*/gm,
		type: "cmnt",
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
//#endregion
export { e as default };
