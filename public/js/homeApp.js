var app = {
    init: function() {
      document.querySelector("#add-project--button").addEventListener("click", app.addProjectButton);
      document.querySelectorAll(".button--edit-project").forEach(element => {
        element.addEventListener("click", app.editProjectButton);
      });
      document.querySelectorAll(".project--list-form").forEach(element => {
        element.addEventListener("submit", app.editProjectSubmit);
      });
    },
    addProjectButton: function() {
      const projectContainer = document.querySelectorAll(".project--container")[0];
      const actionUrl = projectContainer.dataset.addProjectUrl;
      console.log(actionUrl);
      const projectForm = document.createElement("form");
      projectForm.setAttribute('method', 'post');
      projectForm.setAttribute('action', actionUrl);
      const projectTitleInput = document.createElement("input");
      projectTitleInput.setAttribute('type', 'text');
      projectTitleInput.setAttribute('name', 'title');
      projectTitleInput.setAttribute('class', 'input--title');
      projectTitleInput.setAttribute('value', 'Nom du projet');
      const projectDescriptionInput = document.createElement("input");
      projectDescriptionInput.setAttribute('type', 'text');
      projectDescriptionInput.setAttribute('name', 'description');
      projectDescriptionInput.setAttribute('class', 'input--description');
      projectDescriptionInput.setAttribute('value', 'Description du projet');
      const sendButtonInput = document.createElement("input");
      sendButtonInput.setAttribute('type', 'submit');
      sendButtonInput.setAttribute('value', 'Submit');
      projectForm.appendChild(projectTitleInput);
      projectForm.appendChild(projectDescriptionInput);
      projectForm.appendChild(sendButtonInput);
      projectContainer.appendChild(projectForm);
      projectForm.addEventListener("submit", app.addProjectConfirm);
    },
    addProjectConfirm: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.post(url, {
        "projectTitle": this.querySelector('input[name="title"]').value,
        "projectDescription": this.querySelector('input[name="description"]').value
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      document.location.reload(true);
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
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
