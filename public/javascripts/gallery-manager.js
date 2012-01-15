function selectListProject(image){
    
}

$(function(){
   gallery = $('#gallery').galleryView({
       panel_width: 728,
       show_overlays: true,
       show_captions: true,
       callbacks: {
           imageChanged: function(image){
               alert(image);
           }
       }
   });
   gallery;
   
});