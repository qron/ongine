var fs = require('fs');

module.exports = function getTemplate(path, directory, options) {

	switch(directory) {
		case 'inlays' :
			path = options.inlays + '/' + path;
			break;
		case 'wraps' :
			path = options.wraps + '/' + path;
			break;
		case 'views' :
			path = options.views + '/' + path;
			break;
	}

	if(options.extension) path += '.' + options.extension;

	var content = fs.readFileSync(path, {'encoding' : 'utf8'});

	return JSON.parse(content);

};
