;(function($) {
  $.fn.rwdImageMaps = function() {
    var $img = this;

    var rwdImageMap = function() {
      $img.each(function() {
        if (typeof($(this).attr('usemap')) == 'undefined')
          return;

        var that = this,
          $that = $(that);

        // Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
        $('<img />').on('load', function() {
          var attrW = 'width',
            attrH = 'height',
            w = $that.attr(attrW),
            h = $that.attr(attrH);

          if (!w || !h) {
            var temp = new Image();
            temp.src = $that.attr('src');
            if (!w)
              w = temp.width;
            if (!h)
              h = temp.height;
          }

          var wPercent = $that.width()/100,
            hPercent = $that.height()/100,
            map = $that.attr('usemap').replace('#', ''),
            c = 'coords';

          $('map[name="' + map + '"]').find('area').each(function() {
            var $this = $(this);
            if (!$this.data(c))
              $this.data(c, $this.attr(c));

            var coords = $this.data(c).split(','),
              coordsPercent = new Array(coords.length);

            for (var i = 0; i < coordsPercent.length; ++i) {
              if (i % 2 === 0)
                coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
              else
                coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
            }
            $this.attr(c, coordsPercent.toString());
          });
        }).attr('src', $that.attr('src'));
      });
    };
    $(window).resize(rwdImageMap).trigger('resize');

    return this;
  };
})(jQuery);

;(function(a){a.fn.rwdImageMaps=function(){var c=this;var b=function(){c.each(function(){if(typeof(a(this).attr("usemap"))=="undefined"){return}var e=this,d=a(e);a("<img />").on('load',function(){var g="width",m="height",n=d.attr(g),j=d.attr(m);if(!n||!j){var o=new Image();o.src=d.attr("src");if(!n){n=o.width}if(!j){j=o.height}}var f=d.width()/100,k=d.height()/100,i=d.attr("usemap").replace("#",""),l="coords";a('map[name="'+i+'"]').find("area").each(function(){var r=a(this);if(!r.data(l)){r.data(l,r.attr(l))}var q=r.data(l).split(","),p=new Array(q.length);for(var h=0;h<p.length;++h){if(h%2===0){p[h]=parseInt(((q[h]/n)*100)*f)}else{p[h]=parseInt(((q[h]/j)*100)*k)}}r.attr(l,p.toString())})}).attr("src",d.attr("src"))})};a(window).resize(b).trigger("resize");return this}})(jQuery);