//#region node_modules/@speed-highlight/core/dist/languages/diff.js
var e = [
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
	}
];
//#endregion
export { e as default };
