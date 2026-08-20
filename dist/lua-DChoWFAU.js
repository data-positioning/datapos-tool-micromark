//#region node_modules/@speed-highlight/core/dist/languages/lua.js
var e = [
	{
		match: /^#!.*|--(\[(=*)\[[^]*?\]\2\]|.*)/g,
		type: "cmnt",
		sub: "todo"
	},
	{ expand: "str" },
	{
		type: "kwd",
		match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g
	},
	{
		type: "bool",
		match: /\b(true|false|nil)\b/g
	},
	{
		type: "oper",
		match: /[+*/%^#=~<>:,.-]+/g
	},
	{ expand: "num" },
	{
		type: "func",
		match: /[a-z_]+(?=\s*[({])/g
	}
];
//#endregion
export { e as default };
