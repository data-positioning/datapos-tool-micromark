//#region node_modules/@speed-highlight/core/dist/languages/ini.js
var e = [
	{
		match: /(^[ \f\t\v]*)[#;].*/gm,
		type: "cmnt",
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
//#endregion
export { e as default };
