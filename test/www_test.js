var express = require( 'express' );
var coderwall = require( '../lib/coderwall.js' );

var app = express.createServer();

var a = new coderwall( {
	user: 'qbit',
	debug: true,
	orientation: 'vertical',
	images: __dirname + '/images',
	url: '/coderwall/'
});

a.get();

a.connect( app );

app.get( '/', function( req,res ) {
	res.send( '<html><head><link href="/coderwall/coderwall.css" media="all" rel="stylesheet" type="text/css"><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script><script src="/coderwall/coderwall.js" type="text/javascript"></script></head><body>' + a.coderwall_element + '</body></html>' );
});

console.log( "listening on http://localhost:8080" );
app.listen( 8080 );
