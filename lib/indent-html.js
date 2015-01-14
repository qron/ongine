module.exports = function indentHtml(options, node) {

	if(!options.pretty) return '';

	var indentation = '\n';

	for(var i = 0, e = options.depth; i < e; i++) {
		indentation += options.indentation;
	}

	return indentation;

};
