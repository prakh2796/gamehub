// external js: masonry.pkgd.js, imagesloaded.pkgd.js
var img_count = 9;
$(document).ready(function () {
  // init Masonry
  // var $grid = $('.content').masonry({
  //   itemSelector: '.item',
  //   percentPosition: true,
  //   columnWidth: '.image-sizer'
  // });
  // // layout Isotope after each image loads
  // $grid.imagesLoaded().progress( function() {
  //   $grid.masonry();
  // });

  var $grid = $('.content').imagesLoaded(function () {
    $grid.masonry({
      itemSelector: '.item',
      percentPosition: true,
      columnWidth: '.image-sizer'
    });
  });


  $(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      var gallaryDiv;
      for (var i = 0; i < 6; i++) {

        //var hRand = Math.random();
        //var heightClass = hRand > 0.65 ? 'item--height2' : hRand > 0.25 ? 'item--height3' : '';

        gallaryDiv = document.createElement('div');
        //$(gallaryDiv).addClass('item'+' '+heightClass);
        $(gallaryDiv).addClass('item');
        var randomImg = document.createElement('img');
        img_count++;
        var path = "../static/images/wallpapers/" + img_count + ".jpg";
        $(randomImg).addClass('randomImg');
        $(randomImg).attr('src', path);
        $(randomImg).attr('alt', 'gallary');
        $(randomImg).appendTo(gallaryDiv);

        //$(gallaryDiv).appendTo("#content");
        $('#content').append(gallaryDiv).masonry('appended', gallaryDiv);

        var $grid = $('.content').imagesLoaded(function () {
          $grid.masonry({
            itemSelector: '.item',
            percentPosition: true,
            columnWidth: '.image-sizer'
          });
        });

      }
    }
  });
});
