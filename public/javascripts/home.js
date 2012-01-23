
relayout = function(){
    current = (current+1) %3;
    $.extend(options, {filter:  $(".no_one")});
    container.isotope(options);
    setTimeout(function(){
        container.data().isotope.shuffle();
        changeImageWidth();
        $.extend(options, {
            filter: $("." + categories[current]),
            layoutMode: "fitRows"
//            layoutMode: layouts[Math.ceil(Math.random()*3)]
        });
        container.isotope(options);
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
            2: "editorial"
        }
    layouts = {
            0: "masonry",
            1: "fitRows"
    }
    
    container = $('#mosaic');
    container.bind("click", function(){
        window.location= "/projects"
    })
    
    options={
            itemSelector : ".mosaic-item" ,
            filter: $(".no_one"),
            layoutMode : 'masonry',
            columnWidth: 200,
            sortBy: 'rand',
            getSortData : {
              rand : function ( $elem ) {
                  if ($elem.hasClass("category"))
                     return 1;
                 else
                    return Math.random()*6 + 2;
              }
            }
    };
    container.imagesLoaded( function(){
        changeImageWidth();
        $('#mosaic').isotope(options);
        container.removeClass("loading");
        $.extend(options, {filter:  $("." + categories[current])});
        setTimeout(function(){
            $('#mosaic').isotope(options);
            setTimeout("relayout();", 5000);
        }, 500);  
    });
    
});
    