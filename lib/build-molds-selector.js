module.exports = function buildMoldsSelector(alias) {

	var moldsMask;

	if(alias.constructor === Array) {
		moldsMask = regexizeAlias(alias[0]) + '([\\w$[\\].-]+)' + regexizeAlias(alias[1]);
	} else {
		moldsMask = regexizeAlias(alias) + '([\\w$[\\].-]+)';
	}

	return new RegExp(moldsMask);

};

var escapedCharacters = [']', '^', '\\'];

function regexizeAlias(alias) {
	var regexized = '';
	for(var i = 0, e = alias.length; i < e; i++) {
		regexized += '[';
		if(escapedCharacters.indexOf(alias[i]) !== -1) regixized += '\\';
		regexized += alias[i] + ']';
	}
	return regexized;
}
