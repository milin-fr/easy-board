var app = {
    init: function() {
      document.querySelector(".newProject").addEventListener("submit", app.addProject);
      document.querySelectorAll(".button--edit-project").forEach(element => {
        element.addEventListener("click", app.editProjectButton);
      });
      document.querySelectorAll(".project--list-form").forEach(element => {
        element.addEventListener("submit", app.editProjectSubmit);
      });
      document.querySelectorAll(".project--list-item").forEach(element => {
        element.addEventListener("dragstart", app.dragStart);
        element.addEventListener("dragend", app.dragEnd);
      });
      document.querySelectorAll(".drag-and-drop--landing").forEach(element => {
        element.addEventListener("dragover", app.dragOver);
        element.addEventListener("dragenter", app.dragEnter);
        element.addEventListener("dragleave", app.dragLeave);
        element.addEventListener("drop", app.dragDrop);
      });
      document.querySelectorAll(".fa-arrows-alt").forEach(element => {
        element.addEventListener("mousedown", app.makeDraggable);
      });
    },
    addProject: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.post(url, {
        "projectTitle": this.querySelector('input[name="projectTitle"]').value,
        "projectDescription": this.querySelector('input[name="projectDescription"]').value
      })
      .then(function (response) {
        document.location.reload(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    editProjectButton: function(event) {
      const projectId = event.target.dataset.projectId;
      const projectListItem = document.querySelector("#project-" + projectId + "-item");
      projectListItem.querySelector(".input--title").readOnly = false;
      projectListItem.querySelector(".input--description").readOnly = false;
      projectListItem.querySelector("#project-" + projectId + "-submit-button").classList.remove("hidden");
      event.target.classList.add("hidden");
    },
    editProjectSubmit: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.put(url, {
        "projectTitle": this.querySelector('input[name="title"]').value,
        "projectDescription": this.querySelector('input[name="description"]').value
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
      document.querySelectorAll(".input--description").forEach(element => {
        element.readOnly = true;
      });
      document.querySelectorAll(".input--submit-project-change").forEach(element => {
        element.classList.add("hidden");
      });
      document.querySelectorAll(".button--edit-project").forEach(element => {
        element.classList.remove("hidden");
      });
    },
    dragStart: function(event) {
      event.target.classList.add("hold");
      document.querySelectorAll(".project--list-item").forEach(element => {
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
        app.unmakeDraggable();
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
    },
    makeDraggable: function() {
      document.querySelectorAll(".project--list-item").forEach(element => {
        element.setAttribute('draggable', true);
      });
    },
    unmakeDraggable: function() {
      document.querySelectorAll(".project--list-item").forEach(element => {
        element.setAttribute('draggable', false);
      });
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
