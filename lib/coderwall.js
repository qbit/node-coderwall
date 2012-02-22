var http = require( 'http' ),
	fs = require( 'fs' ),
	url = require( 'url' ),
	cw_url = 'http://coderwall.com/username.json';
	username = '';

var coderwall = function( opts ) {
	var self = this;
	self.user = opts.user;
	self.url = opts.url.replace( /\/$/, '' );
	self.orientation = opts.orientation || 'vertical';
	self.images = opts.images.replace( /\/$/, '' ) || __dirname;

	self.debug = opts.debug || false;

	self.store = {};

	self.js_file = __dirname + '/coderwall-client.js';
	self.css_file = __dirname + '/coderwall-client.css';

	self.icon_url = 'http://coderwall.com/images/icon.png';

	self.coderwall_element = '<section class="coderwall" data-coderwall-username="' + self.user + '" data-coderwall-orientation="' + self.orientatoin + '"></section>';

	fs.mkdir( self.images );
	fs.mkdir( self.images + '/coderwall' );
};

coderwall.prototype.bug = function( msg ) {
	var self = this;
	if ( self.debug ) {
		console.log( msg );
	}
};

coderwall.prototype.http_req = function( obj, fn ) {
	var self = this;
	var f;

	if ( obj.output ) {
		f = fs.createWriteStream( obj.output );
	}

	http.get( obj, function( res ) {
		var data = [];
		res.on( 'data', function( chunk ) {
			if ( obj.output ) {
				f.write( chunk );
			} else {
				data.push( chunk );
			}
		}).on( 'end', function() {
			if ( obj.output ) {
				self.bug( "wrote file " + obj.output );
				f.end();
				if ( fn ) {
					fn( );
				}
			} else {
				if ( fn ) {
					fn( data.join( '' ) );
				}
			}
		});
	});
};

coderwall.prototype.connect = function( app ) {
	var self = this;
	self.bug( "creating request handlers at " + self.url );
	app.get( self.url, function( req, res ) {
		res.json( self.cw_data );
	});

	app.get( self.url + '/coderwall.js', function( req, res ) {
		res.sendfile( self.js_file );
	});

	app.get( self.url + '/coderwall.css', function( req, res ) {
		res.sendfile( self.css_file );
	});

	app.get( self.url + '/:image', function( req, res ) {
		var file = self.images + self.url + '/' + req.url.split( '/' )[2];
		res.sendfile( file );
	});
};

coderwall.prototype.get = function( fn ) {
	var self = this;
	var http_opts = url.parse( cw_url.replace( 'username', self.user ) );
	
	var ico_opts = url.parse( self.icon_url );
	ico_opts.output = self.images + self.url + '/icon.png';

	self.http_req( ico_opts );

	self.http_req( http_opts, function( cw_json ) {
		self.cw_data = JSON.parse( cw_json );

		self.cw_data.updated = new Date().getTime();

		var i,l;
		for( i = 0, l = self.cw_data.badges.length; i < l; i++ ) {
			var b = self.cw_data.badges[ i ];
			var bf = b.name.replace( / /g, '_' ) + '.png';

			var lbadge = self.url + '/' + bf;
			var obadge = self.images + self.url + '/' + bf;

			// self.store[obadge] = b.badge;
			var badge_opts = url.parse( b.badge );

			badge_opts.output = obadge;

			self.http_req( badge_opts );

			b.badge = lbadge;

		}
	});
};

module.exports = coderwall;
