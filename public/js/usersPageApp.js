var app = {
    init: function() {
      document.querySelectorAll(".project--container").forEach(function(element){
        if(element.childElementCount < 2){
          element.classList.add("hidden");
        }
      });
      document.querySelectorAll(".task--list-item").forEach(element => {
        element.addEventListener("dragstart", app.dragStart);
        element.addEventListener("dragend", app.dragEnd);
      });
      document.querySelectorAll(".drag-and-drop--landing").forEach(element => {
        element.addEventListener("dragover", app.dragOver);
        element.addEventListener("dragenter", app.dragEnter);
        element.addEventListener("dragleave", app.dragLeave);
        element.addEventListener("drop", app.dragDrop);
      });
    },
    dragStart: function(event) {
      event.target.classList.add("hold");
      document.querySelectorAll(".task--list-item").forEach(element => {
        element.classList.remove("dragged-element");
       });
      event.target.classList.add("dragged-element");
    },
    dragEnd: function(event) {
      event.target.classList.remove("hold");
      document.querySelectorAll(".drag-and-drop--landing").forEach(element => {
        element.classList.remove("drag-and-drop--active");
      });
    },
    dragOver: function(event) {
      event.preventDefault();
    },
    dragEnter: function(event) {
      event.preventDefault();
      event.target.classList.add("hovered");
    },
    dragLeave: function(event) {
      event.target.classList.remove("hovered");
    },
    dragDrop: function(event) {
      const url = document.querySelector(".user--row").dataset.updateUserUrl;
      axios.put(url, {
        "taskId": document.querySelector('.dragged-element').dataset.taskId,
        "userId": event.target.dataset.userId
      })
      .then(function (response) {
        document.location.reload(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
