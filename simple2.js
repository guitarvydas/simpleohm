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
semantics.addOperation ("py", {
    Top (target, eq, v1, plus, v2) {
	return `
${target.py()} = ${v1.py()} + ${v2.py()}
print (${target.py()})
`},
    _terminal () { return this.sourceString; },
    // not used in this example, but will be needed in bigger examples
    _iter (...children) { return children.map(c => c.py ()); }
});

var cst = g.match ("a = b + c");

var transpiled = semantics (cst).js ();
console.log ('*** javascript ***');
console.log (transpiled);

var pytranspiled = semantics (cst).py ();
console.log ('*** python ***');
console.log (pytranspiled);

