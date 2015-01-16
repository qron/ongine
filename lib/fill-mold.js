var buildMoldsSelector = require('./build-molds-selector');

module.exports = function fillMold(raw, fillers, alias) {

	var moldsSelector = buildMoldsSelector(alias);
	var moldSelected;

	while(moldSelected = moldsSelector.exec(raw)) {
		raw = raw.replace(
			new RegExp(moldSelected[0], 'g'),
			fillers[moldSelected[1]]
		);
	}
	return raw;

};
