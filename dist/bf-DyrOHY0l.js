//#region node_modules/@speed-highlight/core/dist/languages/bf.js
var e = [
	{
		match: /[^,\[\->+.<\]\s].*/g,
		type: "cmnt",
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
//#endregion
export { e as default };
