var app = {
    init: function() {
      document.querySelectorAll(".project--container").forEach(function(element){
        if(element.childElementCount < 2){
          element.classList.add("hidden");
        }
      });
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
