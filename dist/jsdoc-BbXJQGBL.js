//#region node_modules/@speed-highlight/core/dist/languages/jsdoc.js
var e = {
	type: "cmnt",
	sub: [
		{
			type: "kwd",
			match: /@\w+/g
		},
		{
			type: "class",
			match: /{[\w\s|<>,.@\[\]]+}/g
		},
		{
			type: "var",
			match: /\[[\w\s="']+\]/g
		},
		...{
			type: "cmnt",
			sub: [
				{
					type: "err",
					match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g
				},
				{
					type: "class",
					match: /\bIDEA\b/g
				},
				{
					type: "insert",
					match: /\b(CHANGED|FIX|CHANGE)\b/g
				},
				{
					type: "oper",
					match: /\bQUESTION\b/g
				}
			]
		}.sub
	]
};
//#endregion
export { e as default };
