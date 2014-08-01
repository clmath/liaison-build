require.config({
	"packages": [
		{
			"name": "liaison",
			"location": "liaison-build"
		},
		{
			"name": "decor",
			"location": "decor-build"
		}
	]
});
define(["liaison/layer","decor/boot"], function(){});