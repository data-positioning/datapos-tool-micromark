//#region node_modules/@speed-highlight/core/dist/languages/git.js
var e = [
	{
		match: /^#.*/gm,
		type: "cmnt",
		sub: "todo"
	},
	{ expand: "str" },
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
		match: /^@@.*@@$|^\d.*|^([*+-])\1\1.*/gm
	},
	{
		type: "func",
		match: /^(\$ )?git(\s.*)?$/gm
	},
	{
		type: "kwd",
		match: /^commit \w+$/gm
	}
];
//#endregion
export { e as default };
