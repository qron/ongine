API
===

These features are accessible through the insertion of logical nodes
inside templates.
These nodes are identified by the `api` property which defines their roles.
Each of these roles comes with a set of specific properties to use it.

Summary
-------

* [If](#if)
* [Switch](#switch)
* [Each](#each)
* [Repeat](#repeat)
* [Inlay](#inlay)
* [Wrap](#wrap)

* * *

If
--

### Usage

{"api" : "if", "in" : _conditions_}

* _conditions_ : Array | Object

#### _conditions_ structure

([){("condition" : _condition_ | "default" : _enable_), "in" : _block_}(,...])

* _condition_ : String
* _enable_ : Boolean
* _block_ : Array | Object | String

### Description

The `if` node allows to conditionally add nodes to template.

The `in` property at node root contains either a conditions list,
or a single condition.

These conditions are objects and they have a specific structure.

Each one of them must contains either a `condition` property,
which is an expression that will be filled (if there are molds)
and then evaluated, making the object act like JavaScript `if`/`else if`,
or a `default` property (regardless of its value, except falsy ones),
making the object act like a JavaScript `else`.
This object with the `default` property should always
be the last element of the conditions list,
if it is not, next conditions will be ignored.

The `in` property of these objects can contain a nodes list or a single node
(keeping in mind that strings are considered as raw nodes, see glossary).
These nodes will be rendered only if their `condition` property returns true,
or if they have a defined `default` property
and all previous conditions have returned false.

### Example

```json
{
	"api" : "if",
	"in" : [
		{
			"condition" : "{{foo}}",
			"in" : "fillers.foo returns true"
		},
		{
			"condition" : "{{bar}}",
			"in" : "fillers.bar returns true"
		},
		{
			"default" : true,
			"in" : "both of foo and bar return false"
		}
	]
}
```


Switch
------

### Usage

{"api" : "switch", "expression" : _expression_, "in" : _cases_}

* _expression_ : String
* _cases_ : Array | Object

#### _cases_ structure

([) {("case" : _case_ | "default" : _enable_), "in" : _block_} (,...])

* _case_ : String | Number | Boolean
* _enable_ : Boolean
* _block_ : Array | Object | String

### Description

The `switch` node works just like a JavaScript `switch`.

The `expression` property contains either a condition, or a single mold.
Its return value is compared to each `case` property
in the cases of the `switch` (see below).

The `in` property at node root contains either a cases list,
or a single case.

These cases are objects and they have a specific structure.

Each one of them must contains either a `case` property,
defining a primitive value or a mold holding this primitive value,
which will be compared to the `expression` return,
making the object act like JavaScript `case` of `switch` structure,
or a `default` property (regardless of its value, except falsy ones),
making the object act like a JavaScript `default` of `switch` structure.
This object with `default` property should always
be the last element of the cases list,
if it is not, next cases will be ignored.

The `in` property of these objects can contain a nodes list or a single node.
these nodes will be rendered only if their `case` property
match with the `expression` return value,
or if they have a defined `default` property
and all previous cases have returned false.

### Example

```json
{
	"api" : "switch",
	"expression" : "{{color}}",
	"in" : [
		{
			"case" : "red",
			"in" : "fillers.color is red"
		},
		{
			"case" : "blue",
			"in" : "fillers.color is blue"
		},
		{
			"default" : true,
			"in" : "fillers.color is neither red, nor blue"
		}
	]
}
```

Each
----

### Usage

{"api" : "each", "array" : _property_, "in" : _block_(, "item" : _item_)}

* _property_ : String
* _item_ : String 
* _block_ : Array | Object | String

### Description

The `each` node is designed for array iteration.
It will render its `in` property for each item in the defined array,
setting a filler which will store successively each of these items.

The `array` property defines the fillers property name
of the targeted array.

The `in` property can contain a nodes list or a single node.
These nodes will be rendered for each item in array.

The optional `item` property defines the property name which will be set
in fillers during iteration to store the array item value.
Its default value is `"item"`.

### Example

```json
{
	"api" : "each",
	"array" : "fruits",
	"item" : "fruit",
	"in" : "there is {{fruit}} in fillers.fruits"
}
```

Repeat
------

### Usage

{"api" : "repeat", "number" : _number_, "in" : _block_(, "current" : _current_)}

* _number_ : Number
* _current_ : String
* _block_ : Array | Object | String

### Description

The `repeat` node litteraly clone the nodes of the `in` property
a number of time specified by the `number` property.
This last property can be either a number, or a mold referring to a number.

The optional `current` property defines the property name which will be set
in fillers during iteration to store the repetition number.
Its default value is `"current"`.

Useful only in few situations.

### Example

```json
{
	"api" : "repeat",
	"number" : 3,
	"current" : "lap",
	"in" : "this is lap number {{lap}}"
}
```

Inlay
-----

### Usage

{"api" : "inlay", "name" : _filename_(, "raw" : _enable_)}

* _filename_ : String
* _enable_ : Boolean

### Description

The `inlay` node is made to include external template in the current one,
at the place of the node itself.

The `name` property defines the filename of the inlayed template.
The full path and extension will be automatically added from options,
unless this behaviour have been disabled setting custom options.

The optional `raw` property allows to inlay a non-JSON file
which will be inserted as raw node.
Usually, a local option will have to be set
in order to define the extension of the raw inlay.

### Example

```json
{
	"api" : "inlay",
	"name" : "copyright"
}
```

Wrap
----

### Usage

{"api" : "wrap"}

### Description

The `wrap` node is only an indicator which locates
where the wrapped template will be inserted in the wrapper one,
which is defined in options.

It should be used only in wrap templates and can be used only once.

### Example

```json
{
	"api" : "wrap"
}
```
