require.config({
	"packages": [
		{
			"name": "liaison",
			"location": "liaison-build"
		},
		{
			"name": "delite",
			"location": "delite-build"
		}
	]
});
define(["liaison/delite/layer","delite/boot","liaison/boot"], function(){});