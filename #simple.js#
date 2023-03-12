var ohm = require ('ohm-js');

const g = ohm.grammar (`
verysimple {
  Top = letter "=" letter "+" letter
}
`);
const semantics = g.createSemantics ().addOperation ("js", {
    Top (target, eq, v1, plus, v2) {
	return `
${target.js()} = ${v1.js()} + ${v2.js()};
console.log (${target.js()});
`},
    _terminal () { return this.sourceString; }
});

var cst = g.match ("a = b + c");
var transpiled = semantics (cst).js ();
console.log (transpiled);

