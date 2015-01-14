var buildMoldsSelector = require('./build-molds-selector');

module.exports = function fillMold(raw, fillers, alias) {

	var filled;
	var moldsSelector = buildMoldsSelector(alias);
	var moldSelected;

	while(moldSelected = moldsSelector.exec(raw)) {
		filled = raw.replace(moldSelected[0], fillers[moldSelected[1]]);
	}
	if(!filled) return raw;
	return filled;

};
