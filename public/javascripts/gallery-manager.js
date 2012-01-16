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
        setTimeout("gallery.hideOverlay();", 2500);
    }, 1200);
    
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
   var className = category == "publicidad" ? "publi" : category;
   $("#gallery_" + category + " li img").each(function(){
       thumbsContainer.append(
            "<div class='thumb_container " + className + "'>"+
            "<img src='" + $(this).attr("src") + "'></img></div>");
   });
}
$(function(){
   currentCategory= "publicidad";
   galleries = {}
   galleries[currentCategory] = initCategoryMosaicThumbs(currentCategory);
   
   galleries[currentCategory] = initCategoryGallery(currentCategory);
   
   selectListProject(1);
   galleries[currentCategory].startSlideshow()
   setTimeout("showAndHideOverlay();", 1);
   $("li.project_link a").bind("click", function(e,elem){
       e.preventDefault();
       var dad = $(this).parent();
       selectGalleryItem(dad);
       selectListProject(dad.attr("data-project-id"))
       showAndHideOverlay();
   })
   
   
});