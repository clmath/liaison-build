# liaison-build

Build version of [ibm-js/liaison](https://github.com/ibm-js/liaison).

## Status

No official release yet.

## Installation

_Bower_ release installation:

    $ bower install liaison-build

_Manual_ master installation:

    $ git clone git://github.com/ibm-js/liaison-build.git

Then install dependencies with bower (or manually from github if you prefer to):

	$ cd liaison-build
	$ bower install


## How to use

To load the minified layer you need to wrap your main `require` call with another `require`, requiring `"liaison-build/layer"`. Then you should continue to
refer to modules with `"liaison/foo"`.

For example, this:
```
require(["app/main", "liaison/foo"], function() {
	...
});
```
Becomes:
```
require(["liaison-build/layer"], function() {
	require(["app/main", "liaison/foo"], function() {
		...
	});
});
```

## Licensing

This project is distributed by the Dojo Foundation and licensed under the ["New" BSD License](./LICENSE).
All contributions require a [Dojo Foundation CLA](http://dojofoundation.org/about/claForm).
