
relayout = function(){
    current = (current+1) %3;
    container.isotope({filter:  $(".no_one")});
    setTimeout(function(){
        changeImageWidth();
        container.isotope({filter: $("." + categories[current])});
        setTimeout("relayout()", 5000);    
    }, 600);
    
}
changeImageWidth= function(){
        $(".mosaic-image").each(function(){
        //    var width=  Math.ceil(1+ Math.random() *3);
            var width=  Math.ceil( Math.random() *2) *2;
        //    var width=  (2^(Math.ceil(Math.random() *3) )) +1;
            $(this).removeClass("grid_1 grid_2 grid_3 grid_4");
            $(this).addClass("grid_" + width);
            $(this).width($(this).width -10);
        });
    
}

$(function(){
    current = 0;
    categories = {
            0: "publi",
            1: "corporativo",
            2: "publicaciones"
        }
    container = $('#mosaic');
    container.imagesLoaded( function(){
        changeImageWidth();
        $('#mosaic').isotope({
            // options
            itemSelector : ".mosaic-item" ,
            filter: $("." + categories[current]),
            layoutMode : 'masonry',
            columnWidth: 200
        });    
    });
    setTimeout("relayout()", 5000);  
});
    