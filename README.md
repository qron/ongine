Ongine
======

JSON-based template engine.

Features
--------

* JSON representation of HTML documents
* HTML5 optimized
* Raw text support
* Conditions, iterations and inclusions through API
* Multi outputs : string, buffer, stream
* Pretty human-readable output options
* Mold filling system

Installation
------------

```
npm install ongine
```

Usage
-----

ongine(_view_, _fillers_, _options_);

* _view_ : Object | Array | String
* _fillers_ : Object
* _options_ : Object 

Description
-----------

The module function expects up to 3 arguments and return a string by default.

The first argument `view` can be either an object representing a template,
or an array containing a set of template objects and/or strings
(which will be rendered as raw text),
or a string, in which case the engine will considered it as the filename
of the template file.
The full path of this file will be built from `options.views`
(views directory path) and `options.extension` (template files extension).

The second argument `fillers` is an object containing the data
which will be injected in template raw texts using the mold filling system.
Each property can have any name and any value
but these values will be rendered as string.
This argument is optional but if there are molds refering to unexisting fillers,
they will be replaced by `'undefined'`.

The last argument `options` is an object containing a set of properties
defining the global configuration of the engine for the rendering
(these options override the default ones).
This argument is optional. Options list is available in documentation.

For further information,
see [documentation](https://github.com/qron/ongine/tree/master/doc).

Examples
--------

### Hello World

```javascript
var render = require('ongine');
var html = render(
	{
		'tag' : 'p',
		'attributes' : {'id' : 'hello'},
		'in' : 'Hello World'
	},
	null,
	{
		'wrap' : false,
		'doctype' : false
	}
);
```

#### Output

```html
<p id="hello">Hello World</p>
```

### Basic HTML5 page

```javascript
var render = require('ongine');

var view = {
	'tag' : 'html',
	'in' : [
		{
			'tag' : 'head',
			'in' : {'tag' : 'title', 'in' : '{{title}}'}
		},
		{
			'tag' : 'body',
			'in' : {'tag' : 'p', 'in' : '{{message}}'}
		}
	]
};

var fillers = {
	'title' : 'Home',
	'message' : 'Welcome to homepage.'
};

var options = {
	'wrap' : false,
	'pretty' : true
}

var html = render(view, fillers, options);
```

#### Output

```html
<!DOCTYPE HTML>
<html>
	<head>
		<title>
			Home
		</title>
	</head>
	<body>
		<p>
			Welcome to homepage.
		</p>
	</body>
</html>
```

### API sample

```javascript
var render = require('ongine');

var view = [];
view.push(
	{
		'api' : 'if',
		'in' : {
			'condition' : '{{foo}}',
			'in' : '<p>fillers.foo returns true</p>'
		}
	},
	{
		'api' : 'if',
		'in' : [
			{
				'condition' : '{{bar}}',
				'in' : '<p>fillers.bar returns true</p>'
			},
			{
				'default' : true,
				'in' : '<p>fillers.bar does not return true</p>'
			}
		]
	}
);

var fillers = {
	'foo' : true,
	'bar' : false
};

var options = {
	'wrap' : false,
	'pretty' : true
};

var html = render(view, fillers, options);
```

#### Output

```html
<!DOCTYPE HTML>
<p>fillers.foo returns true</p>
<p>fillers.bar does not return true</p>
```

Caution
-------

Ongine is currently an experimental module. Please, use it as such.

This engine is intended to be server-side only.

The conditional nodes of the API are parsed with an unsafe `eval()`.
Therefore, **never render templates sent by clients**,
because an attacker would be able to execute JavaScript code on the server,
specifying it in the `condition`/`case` property of the `if`/`switch` node.
This evil will be banned in future releases.

The API syntax will evolve in next releases.
