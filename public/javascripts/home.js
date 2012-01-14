$(function(){
    var container = $('#mosaic');
    container.imagesLoaded( function(){
        $(".mosaic-image").each(function(){
            var width=  (2^(Math.ceil(Math.random() *3) )) +1;
            $(this).addClass("grid_" + width);
            $(this).width($(this) -10);
        });
        container.isotope({
            // options
            itemSelector : '.mosaic-image',
            layoutMode : 'masonry',
            columnWidth: 150
        });
    });
      
});
    