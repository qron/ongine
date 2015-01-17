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

ongine(__view__, __fillers__, __options__);

* view : Object | Array | String
* fillers : Object
* options : Object 

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
		'warp' : false,
		'doctype' : false
	}
);
```

#### Rendered

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
	'wraps' : false,
	'pretty' : true
}

var html = render(view, fillers, options);
```

#### Rendered

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
