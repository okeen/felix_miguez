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
        setTimeout("galleries[currentCategory].hideOverlay();", 4000);
    }, 000);
    
}


changeCategoryImageWidth= function(category){
    $(".thumb_container." + category).each(function(){
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
                stopCategorySlideshow(currentCategory);
                selectListProject(image.attrs.project_id);
                markProjectThumbAsActive(image.attrs.project_id);
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
            "<div class='thumb_container " + categoryClass(category) + "'>"+
            "<img src='" + $(this).attr("src") + "' data-project-id='" + 
            $(this).attr("data-project-id") + "' ></img></div>");
    });
    
}

function showCategoryThumbs(category){
    changeCategoryImageWidth(category);
    $.extend(mosaicOptions, {
        filter: ".no_one"
    })
    mosaic.isotope(mosaicOptions);
    mosaic.data().isotope.shuffle();
    
    $.extend(mosaicOptions, {
        filter: "." + category,
        layoutMode : randomMosaicLayoutMode()
    })
    setTimeout(function(){
        mosaic.isotope(mosaicOptions);
    
    }, 500);
}
function currentCategoryName(){
    return currentCategory == "publicidad" ? "publi" : currentCategory 
}

function categoryClass(category){
    return category == "publicidad" ? "publi" : category 
}

function startCategorySlideshow(category){
    $(".gallery_wrapper").removeClass("active");
    $(".gallery_wrapper." + categoryClass(category)).addClass("active");
    index=0;
    playing[categoryClass(category)]=true
    showCategoryThumbs(category);
    loopSlideshow(currentCategoryName());
}

function stopCategorySlideshow(category){
//    if (category == undefined) category = currentCategoryName();
    //playing[categoryClass(category)]=false;
    playing["publi"]= playing["corporativo"]= playing["editorial"]= false;
//    playing[categoryClass(category)]=false;
}
function loopSlideshow(category){
    var categoryImages = $(".thumb_container." + category+" img");
    if (categoryImages.length <= 1) return;

    if (playing[category]){
        var projectId = categoryImages[index].getAttribute("data-project-id")
        showProjectImage(projectId);
        index= (index+1) % categoryImages.length;
        setTimeout(function(){
            loopSlideshow(category);
        },7000);
    }
}
function showProjectImage(projectId){
    //    var images = $(".thumb_container." + currentCategoryName()+" img");
    //    var newImage = $(".thumb_container img[data-project-id="+projectId+"]");
    selectListProject(projectId);
    markProjectThumbAsActive(projectId);
    galleries[currentCategory].showByProject(projectId);  
    showAndHideOverlay();
}

function markProjectThumbAsActive(projectId){
    var images = $(".thumb_container." + currentCategoryName()+" img");
    images.removeClass("active");
    var newImage = $(".thumb_container img[data-project-id="+projectId+"]");
    ;
    newImage.addClass("active");
}

function randomMosaicLayoutMode(){
    var layouts = ['masonry', "fitRows"];
    return layouts[Math.ceil(Math.random()*3)]
}
function initMosaic() {
    // modify Isotope's absolute position method
    
    mosaic = $('#thumbs_mosaic_container');
    mosaicOptions={
        itemSelector : ".thumb_container" ,
        filter: $("." + currentCategoryName()),
        layoutMode : randomMosaicLayoutMode(),
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
//mosaic.isotope(mosaicOptions);

}
$(function(){
    
    currentCategory= "publicidad";
    galleries = {};
    playing={};
    initCategoryMosaicThumbs(currentCategory);
    initCategoryMosaicThumbs("editorial");
    initCategoryMosaicThumbs("corporativo");
    initMosaic();
    galleries[currentCategory] = initCategoryGallery(currentCategory);
    selectListProject(1);
    //showProjectImage(1);
    setTimeout("startCategorySlideshow(currentCategoryName());", 200)
    
    $("li.project_link a").bind("click", function(e,elem){
        e.preventDefault();
        if ($(this).hasClass("selected")) return;
        stopCategorySlideshow(currentCategoryName());
        var dad = $(this).parent();
        var myCategory= dad.attr("data-category");
        var projectId = dad.attr("data-project-id");
        if (myCategory != currentCategory){
            currentCategory=myCategory;
            $(".project_category_container h3").removeClass("active");
            $(".project_category_container h3[data-category="+myCategory+"]").addClass("active");
            startCategorySlideshow(categoryClass(myCategory));
            
        }
        showProjectImage(projectId);
        
    });
    
    $(".thumb_container img").bind("click", function(e,elem){
        if ($(this).hasClass("active")) return;
        stopCategorySlideshow(currentCategory);
        var projectId = $(this).attr("data-project-id");
        showProjectImage(projectId);
    });
    
    $(".project_category_container h3").bind("click", function(e,elem){
        if ($(this).hasClass("active")) return;
        $(".project_category_container h3").removeClass("active");
        $(this).addClass("active")
        stopCategorySlideshow(currentCategory);
        var category = $(this).attr("data-category");
        currentCategory= category;
        startCategorySlideshow(currentCategoryName());
    });
    setTimeout(function(){
        galleries["editorial"] =initCategoryGallery("editorial");
        
        galleries["corporativo"] = initCategoryGallery("corporativo");
    }, 3500);
    
   
});