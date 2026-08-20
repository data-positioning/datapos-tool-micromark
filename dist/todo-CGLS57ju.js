//#region node_modules/@speed-highlight/core/dist/languages/todo.js
var e = {
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
};
//#endregion
export { e as default };
