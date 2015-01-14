var buildMoldsSelector = require('./build-molds-selector');

module.exports = function normalizeCondition(condition, alias) {

	var moldsSelector = buildMoldsSelector(alias);
	var moldSelected;
	var normalized;

	while(moldSelected = moldsSelector.exec(condition)) {
		normalized = condition.replace(
			moldSelected[0],
			'fillers.' + moldSelected[1]
		);
		if(!normalized) return condition;
		return normalized
	}

};
