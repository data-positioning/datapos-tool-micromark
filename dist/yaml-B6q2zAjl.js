//#region node_modules/@speed-highlight/core/dist/languages/yaml.js
var e = [
	{
		match: /#.*/g,
		type: "cmnt",
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
//#endregion
export { e as default };
