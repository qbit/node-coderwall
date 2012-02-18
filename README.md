# node-coderwall - coderwall localizer for express/connect over https
node-coderwall creates local copies of the coderwall icons / css and
html for more secure badge displaying over https connections.

- Author: Aaron Bieber

## Installation
	* Not published yet!
	npm install coderwall

## Usage
	var coderwall = require( 'coderwall' );
	var express = require( 'express' );
	var app = express.createServer();

	var cw = new coderwall( {
		user: 'qbit',
		orientation: 'vertical', // default is vertical
		images: __dirname + '/images', // local path to where images should be saved
		url: '/coderwall' // static for now
	});

	cw.get();

	cw.connect( app );

	-----

	<html>
	<head>
	</head>
	<body>
	<%- cw.coderwall_element %>
	</body>
	</html>

## Methods

.get(): Gets json and images for a specific user

.connect(): Takes an express/connect object and creates the appropriate
request handlers

## Vars

cw.coder_element: the "section" element for badge displaying.

cw.coder_css: the coderwall css file.

cw.coder_js: the coderwall js file.
