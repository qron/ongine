module.exports = function configureEngine(template, options) {

	var config = {};

	// Default configuration
	// W3C HTML5 voids elements
	config.voids = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
	// Inlayed files list
	config.inlayed = [];
	// HTML5 doctype
	config.doctype = '<!DOCTYPE HTML>';
	// Molds alias
	config.alias = ['{{', '}}'];
	// Files extension
	config.extension = 'json';
	// Views directory path
	config.views = 'views';
	// Default wrap
	config.defaultWrap = 'default';
	// Indentation
	config.pretty = false;
	config.indentation = '\t';
	// Output type
	config.out = 'string';
	

	// Prioritize options argument over default options
	if(options) {
		config = setOptions(options, config);
	}

	// Prioritize template.options property over options argument
	if(template.options) {
		config = setOptions(template.options, config);
	}

	// Build resources paths from views path
	if(!config.inlays) config.inlays = config.views + '/inlays';
	if(!config.wraps) config.wraps = config.views + '/wraps';

	// Set initial node level
	if(config.pretty && !config.depth) config.depth = 0;

	return config;

};

function setOptions(options, config) {
	for(var option in options) {
		config[option] = options[option];
	}
	return config;
}
