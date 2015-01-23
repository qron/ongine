Options
=======

Summary
-------

* [Introduction](#introduction)
* [Doctype](#doctype)
* [Alias](#alias)
* [Extension](#extension)
* [Views](#views)
* [Inlays](#inlays)
* [Wraps](#wraps)
* [Default wrap](#default wrap)
* [Wrap](#wrap)
* [Pretty](#pretty)
* [Indentation](#indentation)
* [Out](#out)
* [Internals configuration](#internals-configuration)
	* [Voids](#voids)
	* [Depth](#depth)
	* [Wrapped](#wrapped)

* * *

Introduction
------------

Options allow to configure the engine and the rendering.

There are 3 levels of options, each one overrides the previous level.

1. Default
2. Global
3. Local

### Default

Specified automatically by engine.
The customization of default options is not available yet.
Their values are all default ones specified in this document.
These default options apply to all templates.

### Global

Specified with options argument of the module function.
These global options apply to the current rendered template.

#### Example

```javascript
var render = require('ongine');
var options = {'alias' : '#'};

var html = render(
	{
		'tag' : 'p',
		'in' : 'Hello #name'
	},
	{
		'name' : 'Albert'
	},
	options
); 
```

### Local

Specified with node options property directly in template file.
The local options apply to the current rendered node and its children.

#### Example

```javascript
var render = require('ongine');

var html = render(
	{
		'tag' : 'p',
		'in' : 'Hello #name',
		'options' : {'alias' : '#'}
	},
	{
		'name' : 'Albert'
	}
); 
```

Options list
------------

### Doctype

#### Usage

{'doctype' : _doctype_}
	
* _doctype_ : String

#### Default value

`'<!DOCTYPE HTML>'`

#### Description

Defines document doctype.

### Alias

#### Usage

{'alias' : _alias_}

* _alias_ : String | Array

#### Default value

`['{{', '}}']`

#### Description

Defines molds delimiter(s).

It can be defined as string or array, as well.
Array must contain 2 string items at index 0 (mold start) and 1 (mold end).

#### String aliases

If the alias is a string, the filler name will be prepended by this string
(alias + fillerName).

If `'#'` is assigned to `options.alias`,
`#myFiller` will be interpreted as `fillers.myFiller`.

#### Array aliases

If the alias is an array, the filler name will be embedded
between the first item and the second one
(alias[0] + fillerName + alias[1]).

If `['{{', '}}']` is assigned to `options.alias`,
`{{myFiller}}` will be interpreted as `fillers.myFiller`.

### Extension

#### Usage

{'extension' : _extension_}

* _extension_ : String | Falsy value

#### Default value

`json`

#### Description

Defines engine template files extension.

The dot (.) is automatically prepended to the extension.

To use templates without extension,
assign a falsy value to `options.extension`,
in order to verify condition : `(!options.extension) === true`.

### Views

#### Usage

{'views' : _path_}

* _path_ : String

#### Default value

`views`

#### Description

Defines the views directory path of application.

### Inlays

#### Usage

{'inlays' : _path_}

* _path_ : String

#### Default value

`options.views + '/inlays'`

#### Description

Defines the inlays directory path of application.

If it is not defined, the directory location
will be considered to be under views directory.

### Wraps

#### Usage

{'wraps' : _path_}

* _path_ : String

#### Default value

`options.views + '/wraps'`

#### Description

Defines the wraps directory path of application.

If it is not defined, the directory location
will be considered to be under views directory.

### Default wrap

#### Usage

{'defaultWrap' : _filename_}

* _filename_ : String

#### Default value

`'default'`

#### Description

Defines the default wrap filename if `options.wrap` is omitted.

### Wrap

#### Usage

{'wrap' : _filename_}

* _filename_ : String

#### Default value

`undefined`

#### Description

Defines the wrap filename which will enwrap the rendered template.

To disable wrapping, assign `false` to `options.wrap`,
in order to verify condition : `options.wrap === false`

### Pretty

#### Usage

{'pretty' : _enable_}

* _enable_ : Boolean

#### Default value

`false`

#### Description

Enables output pretty mode. Line breaks and indentation
will be added automatically during rendering.

Raw text will not be broken down, it will be indented as a single line.

Somewhat buggy in browser when inspecting the source code.

### Indentation

#### Usage

{indentation : _pattern_}

* _pattern_ : String

#### Default value

`'\t'`

#### Description

Defines indentation pattern when pretty mode is enabled.

### Out

#### Usage

{'out' : _mode_}

* _mode_ : String

#### Default value

`'string'`

#### Description

Defines the engine return type.

#### String mode

if `'string'` is assigned to `options.out`,
the engine will return a string.

#### Buffer mode

if `'buffer'` is assigned to `options.out`,
the engine will return a buffer.

#### Stream mode

if `'stream'` is assigned to `options.out`,
the engine will return a stream.

* * *

Internals configuration
-----------------------

You should not touch to these options unless you know what you are doing.

### Voids

#### Description

Defines HTML5 voids elements list (childless tags).

### Depth

#### Description

Defines the current depth level during node rendering to indent properly.

### Wrapped

#### Description

Contains the wrapped view which will be embedded inside wrap.

### Inlayed

#### Description

Contains a list of the inlayed files
which will be transmitted only to descendant nodes.
This list prevents infinite inclusions.
