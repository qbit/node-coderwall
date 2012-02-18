(function($) {
  var CODERWALL_API_URL  = "/coderwall&callback=?",
      CODERWALL_USER_URL = "/coderwall";

  var DEFAULTS = {
    username: null,
    width: 65,
    opacity: 0.8,
    orientation: "vertical"
  };

  var LOGO_HTML = "" +
    "<div class='coderwall-logo'>" +
    "  <a href='http://coderwall.com/:username'>" +
    "    <img src='/coderwall/icon.png' class='coderwall-icon' />" +
    "    <div class='coderwall-tag-container'>" +
    "      <div class='coderwall-tag-name'>coderwall</div>" +
    "    </div>" +
    "  </a>" +
    "</div>";

  $.fn.coderwall = function(opts) {
    opts = $.extend({}, DEFAULTS, opts);

    return $(".coderwall").each(function() {
      var root = $(this),
          username    = $(this).attr("data-coderwall-username")    || opts.username,
          width       = $(this).attr("data-coderwall-badge-width") || opts.width,
          orientation = $(this).attr("data-coderwall-orientation") || opts.orientation,
		  url = CODERWALL_USER_URL;

      root.addClass("coderwall-root").addClass(orientation);
      
      $.getJSON( url, function(response) {
		$(response.badges).each(function() {
		  var link = $("<a/>").attr({ href: CODERWALL_USER_URL}),
			  img = $("<img/>")
				.addClass("coderwall-badge")
				.attr({ src: this.badge, width: width, height: width, alt: this.description });
		  
		  link.append(img);
		  root.append(link);
		});

        root.append(LOGO_HTML.replace( ':username', username ) );
      });
    });
  }

  $(function() {
    $(".coderwall").coderwall();
  });
})(jQuery);
