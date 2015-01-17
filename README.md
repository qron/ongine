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

Caution
-------

Ongine is currently an experimental module. Please, use it as such.

This engine is intended to be server-side only.

The conditional nodes of the API are parsed with an unsafe `eval()`.
Therefore, **never render templates sent by clients**.
This evil will be banned in future releases.

The API syntax will evolve in the short-term, however its usage will last.

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
view.push({
	'api' : 'if',
	'in' : {
		'condition' : '{{foo}}',
		'in' : '<p>fillers.foo returns true</p>'
	}
});
view.push({
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
});

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

> [Documentation](https://github.com/qron/ongine/tree/master/doc) is available in GitHub repository.
