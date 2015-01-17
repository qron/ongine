Glossary
========

Node
----

Nodes are the elements of the JSON template which is expressing the view.
They can be objects or strings, in order to represent
either an HTML tag (tag node), one of specific nodes of the API (logical node),
or a raw text (raw node).

### Tag nodes

These nodes will be rendered as HTML elements,
building their attributes and their children.

### Logical nodes

The children of these nodes will be rendered after the engine have processed
the logic defined by their types which can be conditional (if, switch),
iterative (each, repeat), or inclusive (inlay, wrap).

### Raw nodes

These nodes are strings that will be rendered as they are,
after their molds were replaced with matching fillers property.

Filler
------

Properties of the ongine function second argument (fillers).
They will fill any matching mold in a raw node during rendering.

Mold
----

The resulting pattern from the combination of alias and filler name.
