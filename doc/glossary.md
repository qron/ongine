Glossary
========

Node
----

An object which can be a tag node, an API node, or a raw node.

### Tag node

This node will be rendered as html element,
building their attributes and their children.

### API node

This node will be rendered after processing
the logical function that node is representing.

### Raw node

This node is a string that will be rendered as it is,
after its molds were replaced with matching fillers property.

Filler
------

A property of the ongine main function second argument, fillers.
It will fill any matching mold in a raw node during rendering.

Mold
----

The resulting pattern from the combination of alias and filler name.
