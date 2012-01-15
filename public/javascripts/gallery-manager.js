function selectListProject(projectId){
    $("#project_list ul li.project_link").removeClass("selected");
    $("#project_list ul li.project_link[data-project-id="+projectId+"]").addClass("selected");
}

function selectGalleryItem(elem){
    var projectid = elem.attr("data-project-id");
    gallery.showByProject(projectid); 
}

function showAndHideOverlay(){
    gallery.showOverlay();
    setTimeout("gallery.hideOverlay();", 2500)
}

$(function(){
   gallery = $('#gallery').galleryView({
       panel_width: 728,
       show_overlays: true,
       show_captions: true,
       callbacks: {
           imageChanged: function(image){
               selectListProject(image.attrs.project_id);
               showAndHideOverlay();
           }
       }
   });
   selectListProject(1);
   setTimeout("showAndHideOverlay();", 1700);
   $("li.project_link a").bind("click", function(e,elem){
       e.preventDefault();
       var dad = $(this).parent();
       selectGalleryItem(dad);
       selectListProject(dad.attr("data-project-id"))
       showAndHideOverlay();
   })
   
   
});