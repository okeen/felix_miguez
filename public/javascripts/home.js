
relayout = function(){
    container.isotope({filter:  $(".no_one")});
    setTimeout(function(){
        changeImageWidth();
        container.isotope({filter: $(".mosaic-image")});
        setTimeout("relayout()", 5000);    
    }, 600);
    
}
changeImageWidth= function(){
        $(".mosaic-image").each(function(){
            var width=  (2^(Math.ceil(Math.random() *3) )) +1;
            $(this).removeClass("grid_1 grid_2 grid_4");
            $(this).addClass("grid_" + width);
            $(this).width($(this).width -10);
        });
    
}

$(function(){
    container = $('#mosaic');
    container.imagesLoaded( function(){
        changeImageWidth();
        $('#mosaic').isotope({
            // options
            itemSelector : '.mosaic-image',
            layoutMode : 'masonry',
            columnWidth: 150
        });
    
    });
    setTimeout("relayout()", 5000);  
});
    