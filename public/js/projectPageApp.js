var app = {
    init: function() {
      document.querySelectorAll(".taskUser").forEach(function(link){
        link.addEventListener("change", app.updateTaskUser);
      });
      document.querySelector(".newTask").addEventListener("submit", app.newTask);
      document.querySelectorAll(".button--edit-task").forEach(element => {
        element.addEventListener("click", app.editProjectButton);
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
    updateTaskStatus: function(event) {
      const url = this.dataset.action;
      axios.put(url, {
        "taskStatusId": this.value
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    updateTaskUser: function(event) {
      const url = this.dataset.action;
      console.log(this.value);
      axios.put(url, {
        "userId": this.value
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
    },
    newTask: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.post(url, {
        "taskTitle": event.target.querySelector('[name="task-name"]').value,
        "projectId": event.target.dataset.projectId
      })
      .then(function (response) {
        // handle success
        document.location.reload(true);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    },
    dragStart: function(event) {
      event.target.classList.add("hold");
      document.querySelectorAll(".task--list-item").forEach(element => {
        element.classList.remove("dragged-element");
       });
      event.target.classList.add("dragged-element");
      //setTimeout(() => event.target.classList.add("hidden"), 1);
      //document.querySelectorAll(".drag-and-drop--landing").forEach(element => {
      //  element.classList.add("drag-and-drop--active");
      //});
    },
    dragEnd: function(event) {
      event.target.classList.remove("hold");
      //event.target.classList.remove("hidden");
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
      const url = document.querySelector(".project--container").dataset.updateStatusUrl;
      axios.put(url, {
        "projectId": document.querySelector('.dragged-element').dataset.projectId,
        "statusId": event.target.dataset.projectStatusId
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