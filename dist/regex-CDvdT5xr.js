//#region node_modules/@speed-highlight/core/dist/languages/regex.js
var e = {
	type: "oper",
	sub: [
		{
			match: /^(?!\/).*/gm,
			type: "cmnt",
			sub: "todo"
		},
		{
			type: "num",
			match: /\[((?!\])[^\\]|\\.)*\]/g
		},
		{
			type: "kwd",
			match: /\||\^|\$|\\.|\w+($|\r|\n)/g
		},
		{
			type: "var",
			match: /\*|\+|\{\d+,\d+\}/g
		}
	]
};
//#endregion
export { e as default };
