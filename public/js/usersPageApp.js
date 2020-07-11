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
      document.querySelectorAll(".button--edit-task").forEach(element => {
        element.addEventListener("click", app.editTaskButton);
      });
      document.querySelectorAll(".task--list-form").forEach(element => {
        element.addEventListener("submit", app.editTaskSubmit);
      });
      document.querySelectorAll(".taskStatus").forEach(function(link){
        link.addEventListener("change", app.updateTaskStatus);
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
    },
    editTaskButton: function(event) {
      const taskId = event.target.dataset.taskId;
      const taskListItem = document.querySelector("#task-" + taskId + "-item");
      console.log(taskListItem);
      taskListItem.querySelector(".input--title").readOnly = false;
      taskListItem.querySelector("input[type='submit']").classList.remove("hidden");
      event.target.classList.add("hidden");
    },
    editTaskSubmit: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.put(url, {
        "taskTitle": this.querySelector('input[name="taskTitle"]').value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      document.querySelectorAll(".input--title").forEach(element => {
        element.readOnly = true;
      }); 
      document.querySelectorAll(".input--submit-task-change").forEach(element => {
        element.classList.add("hidden");
      });
      document.querySelectorAll(".button--edit-task").forEach(element => {
        element.classList.remove("hidden");
      });
    },
    updateTaskStatus: function(event) {
      const url = this.dataset.action;
      axios.put(url, {
        "statusId": this.value,
        "taskId": this.dataset.taskId
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
      this.style.backgroundColor = this.selectedOptions[0].dataset.color;
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
