$(function(){
    var container = $('#mosaic');
    container.imagesLoaded( function(){
        $(".mosaic-image").each(function(){
            var width=  Math.ceil(Math.random()*3) +1;
            $(this).addClass("grid_" + width);
        });
        container.isotope({
            // options
            itemSelector : '.mosaic-image',
            layoutMode : 'masonry',
            columnWidth: 150
        });
    });
      
});
    