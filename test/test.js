var coderwall = require( '../lib/coderwall.js' );

var a = new coderwall( {
	user: 'qbit',
	images: __dirname + '/test/images',
	url: '/images',
	css: __dirname + '/test/css',
	js: __dirname + '/test/js'
});

a.get( );
