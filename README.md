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

### `baseUrl` is the directory containing `liaison-build`.
This is the most common use-case so the needed configuration is built in the layer.
To load the minified layer you just need to wrap your main `require` call with another `require`, requiring `"liaison-build/layer"`.
Then you should continue to refer to modules with `"liaison/foo"`.

For example, this code:
```js
require(["app/main", "liaison/foo"], function() {
	...
});
```
Becomes:
```js
require(["liaison-build/layer"], function() {
	require(["app/main", "liaison/foo"], function() {
		...
	});
});
```

### Other `baseUrl`

If `baseUrl` is not the directory containing `liaison-build`, custom configuration is needed.

```js
require.config({
	paths: {
		"liaison": "path/to/liaison-build",
		"decor": "path/to/decor-build"
	}
});
```


## Bug reporting

Issues should be filled against the source version of this project at [ibm-js/liaison](https://github.com/ibm-js/liaison)


## Licensing

This project is distributed by the Dojo Foundation and licensed under the ["New" BSD License](./LICENSE).
All contributions require a [Dojo Foundation CLA](http://dojofoundation.org/about/claForm).
