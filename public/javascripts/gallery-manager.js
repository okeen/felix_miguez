function selectListProject(projectId){
    $("#project_list ul li.project_link").removeClass("selected");
    $("#project_list ul li.project_link[data-project-id="+projectId+"]").addClass("selected");
}

function selectGalleryItem(elem){
    var projectid = elem.attr("data-project-id");
    galleries[currentCategory].showByProject(projectid); 
}

function showAndHideOverlay(){
    setTimeout(function(){
        galleries[currentCategory].showOverlay();
        setTimeout("galleries[currentCategory].hideOverlay();", 2000);
    }, 800);
    
}


changeImageWidth= function(){
    $(".thumb_container").each(function(){
        var width=  Math.ceil( Math.random() *2);
        $(this).removeClass("width1 width2");
        $(this).addClass("width" + width);
        $(this).width($(this).width -10);
    });
    
}

function initCategoryGallery(category){
    return $('#gallery_' + category).galleryView({
        panel_width: 750,
        show_overlays: true,
        show_captions: true,
        show_filmstrip: false,
        filmstrip_position: 'top',
        callbacks: {
            imageChanged: function(image){
                selectListProject(image.attrs.project_id);
                
                showAndHideOverlay();
            }
        }
    });
}

function initCategoryMosaicThumbs(category){
    var self = this;
    var thumbsContainer=$("#thumbs_mosaic_container");
    $("#gallery_" + category + " li img").each(function(){
        thumbsContainer.append(
            "<div class='thumb_container " + currentCategoryName() + "'>"+
            "<img src='" + $(this).attr("src") + "' data-project-id='" + 
            $(this).attr("p_id") + "' ></img></div>");
    });
    changeImageWidth();
    showCategoryThumbs(category);
}

function showCategoryThumbs(category){
    
    mosaic.isotope("reLayout");
    $.extend(mosaicOptions, {
        filter: "." + currentCategoryName()
    })
    mosaic.data().isotope.shuffle();
    mosaic.isotope(mosaicOptions);
    
}
function currentCategoryName(){
    return currentCategory == "publicidad" ? "publi" : currentCategory 
}

function startCategorySlideshow(category){
    index=0;
    playing=true
    loopSlideshow();
    
}

function stopCategorySlideshow(category){
    playing=false
}
function loopSlideshow(){
    if (playing){
        showCurrentImage();
        index= (index+1) % $(".thumb_container." + currentCategoryName()+" img").length;
        setTimeout(function(){
            loopSlideshow();
        },5000);
    }
}
function showCurrentImage(){
    var images = $(".thumb_container." + currentCategoryName()+" img");
    images.removeClass("active");
    var newImage = $(images[index]);
    newImage.addClass("active");
    var projectId = newImage.attr("data-project-id");
    selectListProject(projectId);
    galleries[currentCategory].showByProject(projectId);  
    showAndHideOverlay();
}

function markProjectThumbAsActive(projectId){
    
}
function initMosaic() {
    // modify Isotope's absolute position method
    
    mosaic = $('#thumbs_mosaic_container');
    mosaicOptions={
        itemSelector : ".thumb_container" ,
        filter: $("." + currentCategoryName()),
        layoutMode : 'masonry',
        columnWidth: 182,
        rowHeight: 100,
        cellsByColumn: {
            columnWidth: 180,
            rowHeight: 105
        },
        cellsByRow: {
            columnWidth: 190,
            rowHeight: 105
        },
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
    mosaic.isotope(mosaicOptions);

}
$(function(){
    
    currentCategory= "publicidad";
    galleries = {};
    initMosaic();
    galleries[currentCategory] = initCategoryMosaicThumbs(currentCategory);
    galleries[currentCategory] = initCategoryGallery(currentCategory);
    selectListProject(1);
    startCategorySlideshow(currentCategory);
    
    setTimeout("showAndHideOverlay();", 1);
    $("li.project_link a").bind("click", function(e,elem){
        e.preventDefault();
        stopCategorySlideshow(currentCategory);
        var dad = $(this).parent();
        selectGalleryItem(dad);
        var projectId = dad.attr("data-project-id");
        selectListProject(projectId);
        var images = $(".thumb_container." + currentCategoryName()+" img");
        images.removeClass("active");
        $(".thumb_container img[data-project-id="+projectId+"]").addClass("active");
        showAndHideOverlay();
    })
   
   
});