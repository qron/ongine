var buildMoldsSelector = require('./build-molds-selector');

module.exports = function normalizeCondition(condition, alias) {

	var moldsSelector = buildMoldsSelector(alias);
	var moldSelected;

	while(moldSelected = moldsSelector.exec(condition)) {
		condition = condition.replace(
			new RegExp(moldSelected[0], 'g'),
			'fillers.' + moldSelected[1]
		);
	}

	return condition;

};
