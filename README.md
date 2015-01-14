ongine
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

Usage
-----

```javascript
ongine(<view>, <fillers>, <options>)
```

* view : Object | Array | String
* fillers : Object
* options : Object 

### Hello World

```javascript
var render = require('ongine');
render(
	{'tag' : 'p', 'attributes' : {'id' : 'hello'}, 'in' : 'Hello World'},
	null,
	{'warp : false', 'doctype' : false}
);
```

#### Rendered

```html
<p id="hello">Hello World</p>
```

### Basic HTML5 page

```javascript
var render = require('ongine');

var view = {'tag' : 'html', 'in' : [
	{'tag' : 'head', 'in' : {'tag' : 'title', in : '{{title}}'}},
	{'tag' : 'body', 'in' : {'tag' : 'p', in : '{{message}}'}},
]};

var fillers = {
	title : 'Home',
	message : 'Welcome to homepage.'
};

var options = {
	wraps : false,
	pretty : true
}

render(view, fillers, options);
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
