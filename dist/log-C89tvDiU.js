//#region node_modules/@speed-highlight/core/dist/languages/log.js
var e = [
	{
		type: "cmnt",
		match: /^#.*/gm
	},
	{ expand: "strDouble" },
	{ expand: "num" },
	{
		type: "err",
		match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi
	},
	{
		type: "num",
		match: /\b(null|undefined)\b/gi
	},
	{
		type: "bool",
		match: /\b(false|true|yes|no)\b/gi
	},
	{
		type: "oper",
		match: /\.|,/g
	}
];
//#endregion
export { e as default };
