var Stream = require('stream');
var configureEngine = require('./lib/configure-engine');
var getTemplate = require('./lib/get-template');
var checkNodeType = require('./lib/check-node-type');
var areChildren = checkNodeType.areChildren;
var isChild = checkNodeType.isChild;
var isRaw = checkNodeType.isRaw;
var fillMold = require('./lib/fill-mold');
var normalizeCondition = require('./lib/normalize-condition');
var indentHtml = require('./lib/indent-html');

function renderTemplate(template, fillers, options) {

	var html = '';

	options = configureEngine(template, options);

	if(options.doctype) html += options.doctype;

	// Consider raws as template filename
	if(isRaw(template)) template = getTemplate(template.toString(), 'views', options);

	if(areChildren(template)) template = {'in' : template};

	if(options.wrap !== false) {

		options.wrapped = template;

		if(!options.wrap) options.wrap = options.defaultWrap;

			var wrap = getTemplate(options.wrap, 'wraps', options);

			// Start recursive nodes inspection from wrap
			html += inspectNode(wrap, fillers, options);

	} else {

		// Start recursive nodes inspection from template
		html += inspectNode(template, fillers, options);

	}

	// Delete first EOL when pretty is enabled and doctype is disabled
	if(options.pretty && !options.doctype) html = html.substr(1);

	if(options.out === 'buffer') return new Buffer(html);
	if(options.out === 'stream') {
		var stream = new Stream.Readable();
		stream.push(html, 'utf8');
		stream.push(null);
		return stream;
	}
	
	return html;

}

function inspectNode(node, fillers, options) {

	// Node local configuration
	if(node.options) options = configureEngine(node, options);

	// HTML tag
	if(node.tag) return buildTag(node, fillers, options);

	// API key
	if(node.api) return inspectApi(node, fillers, options);

	// Node tree
	if(node.in && !node.tag) return inspectNodeTree(node, fillers, options);

	return '';

}

function inspectApi(node, fillers, options) {

	switch(node.api) {

		case 'if' :
			if(node.in.constructor !== Array) node.in = [node.in];
			for(var i = 0, e = node.in.length; i < e; i++) {
				if(node.in[i].default) {
					return inspectNodeTree(node.in[i], fillers, options);
				}
				var condition = normalizeCondition(node.in[i].condition, options.alias);
				if(eval(condition)) {
					return inspectNodeTree(node.in[i], fillers, options);
				}
			}
			return '';
			break;

		case 'switch' :
			var expression = normalizeCondition(node.expression, options.alias);
			if(node.in.constructor !== Array) node.in = [node.in];
			for(var i = 0, e = node.in.length; i < e; i++) {
				if(node.in[i].default) {
					return inspectNodeTree(node.in[i], fillers, options);
				}
				var expressionValue = eval(expression);
				var caseValue = node.in[i].case;
				if(caseValue === String) handleRaw(caseValue, fillers, {'alias' : options.alias});
				if(expressionValue === caseValue) {
					return inspectNodeTree(node.in[i], fillers, options);
				}
			}
			return '';
			break;

		case 'each' :
			var html = '';
			var array = fillers[node.array];
			if(!node.item) node.item = 'item';
			array.forEach(function(item) {
				fillers[node.item] = item;
				html += inspectNodeTree(node, fillers, options);
			});
			return html;
			break;

		case 'repeat' :
			var html = '';
			if(!node.current) node.current = 'current';
			if(node.number.constructor === String) {
				node.number = handleRaw(node.number, fillers, {
					'alias' : options.alias
				});
			}
			for(var i = 1, e = node.number; i <= e; i++) {
				fillers[node.current] = i;
				html += inspectNodeTree(node, fillers, options);
			}
			return html;
			break;

		case 'inlay' :
			var template = getTemplate(node.name, 'inlays', options);
			return inspectNode(template, fillers, options);
			break;

		case 'wrap' :
			if(options.wrapped) {
				var wrapped = options.wrapped;
				options.wrapped = null;
				return inspectNode(wrapped, fillers, options);
			}
			break;

	}
	return '';

}

function inspectNodeTree(node, fillers, options) {

	var html = '';

	if(!node.in) return html;

	if(areChildren(node.in)) {

		node.in.forEach(function(child) {

			if(isRaw(child)) return html += handleRaw(child, fillers, options);

			html += inspectNode(child, fillers, options);

		});

		return html;

	}

	if(isChild(node.in)) return html += inspectNode(node.in, fillers, options);

	if(isRaw(node.in)) return html += handleRaw(node.in, fillers, options);

	return html;

}

function handleRaw(raw, fillers, options) {

	var html = '';

	if(options.pretty) html += indentHtml(options);

	return html += fillMold(raw, fillers, options.alias);

}


function buildTag(node, fillers, options) {

	var html = '';

	if(options.pretty) html += indentHtml(options);
	// Build start tag
	html += '<' + node.tag;

	// Append attributes
	if(node.attributes) {
		for(var attribute in node.attributes) {
			html += ' ' + attribute + '="' + node.attributes[attribute] + '"';
		}
	}

	// Close start tag
	html += '>';

	// Handle childless tag
	if(options.voids.indexOf(node.tag) != -1 || !node.in) return html;

	if(options.pretty) options.depth++;

	// Handle tag children
	html += inspectNodeTree(node, fillers, options);

	if(options.pretty) {
		options.depth--;
		html += indentHtml(options);
	}

	// Build end tag
	html += '</' + node.tag + '>';

	return html;

}

module.exports = renderTemplate;
