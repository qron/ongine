Options
=======

Options allow to configure the engine and the rendering.

There are 3 levels of options, each one overrides the previous level.

1. Default : specified automatically by engine (all default values).
2. Global : specified with options argument in module funtion call.
3. Local : specified with node options property directly in template file.

Summary
-------

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
* [Internals](#internals)
	* [Voids](#voids)
	* [Depth](#depth)
	* [Wrapped](#wrapped)

* * *

Doctype
-------

Define document doctype.

* Usage : {'doctype' : _doctype_}
	* _doctype_ : String
* Default : `'<!DOCTYPE HTML>'`

Alias
-----

Define molds delimiter(s).

It can be defined as string or array, as well.
Array must contain 2 string items at index 0 (mold start) and 1 (mold end).

* String aliases :
filler name will prepended by this string
(alias + fillerName).

> `#myFiller` *will be interpreted as* `fillers.myFiller`

* Array aliases :
filler name will be embedded between the first item and the second one
(alias[0] + fillerName + alias[1]).

> `{{myFiller}}` *will be interpreted as* `fillers.myFiller`

* Usage : {'alias' : _alias_}
	* _alias_ : String | Array
* Default : `['{{', '}}']`

Extension
---------

Define engine template files extension.

The dot (.) is automatically prepended to the extension.

To use templates without extension,
assign a falsy value to `options.extension`,
in order to verify condition : `(!options.extension) === true`.

* Usage : {'extension' : _extension_}
	* _extension_ : String | Falsy value
* Default : `json`

Views
-----

Define the views directory path of application.

* Usage : {'views' : _path_}
	* _path_ : String
* Default : `views`

Inlays
------

Define the inlays directory path of application.

If it is not defined, the directory location
will be considered to be under views directory.

* Usage : {'inlays' : _path_}
	* _path_ : String
* Default : `options.views + '/inlays'`

Wraps
-----

Define the wraps directory path of application.

If it is not defined, the directory location
will be considered to be under views directory.

* Usage : {'wraps' : _path_}
	* _path_ : String
* Default : `options.views + '/wraps'`

Default wrap
------------

Define the default wrap filename if options.wrap is omitted.

* Usage : {'defaultWrap' : _filename_}
	* _filename_ : String
* Default : `'default'`

Wrap
----

Define the wrap filename which will enwrap the rendered template.

To disable wrapping, assign `false` to `options.wrap`,
in order to verify condition : `options.wrap === false`

* Usage : {'wrap' : _filename_}
	* _filename_ : String
* Default : none

Pretty
------

Enable output pretty mode. Line breaks and indentation
will be added automatically during rendering.

Raw text will not be broken down, it will be indented as a single line.

Somewhat buggy in browser when inspecting the source code.

* Usage : {'pretty' : _enable_}
	* _enable_ : Boolean
* Default : `false`

Indentation
-----------

Define indentation pattern when pretty mode is enabled.

* Usage : {indentation : _pattern_}
	* _pattern_ : String
* Default : `'\t'`

Out
---

Define the engine return type.

* Usage : {'out' : _mode_}
	* _mode_ : String
* String mode : the engine will return a string.
* Buffer mode : the engine will return a buffer.
* Stream mode : the engine will return a stream.
* Default : `'string'`

* * *

#### Internals

> You should not touch to these options unless you know what you are doing.

Voids
-----

Define HTML5 voids elements list (childless tags).

Depth
-----

Define the current depth level during node rendering to indent properly.

Wrapped
-------

Contain the wrapped view which will be embedded inside wrap.
