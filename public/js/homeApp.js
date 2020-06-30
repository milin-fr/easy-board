var app = {
    init: function() {
      document.querySelector("#add-project--button").addEventListener("click", app.addProjectButton);
      document.querySelector(".button--edit-project").addEventListener("click", app.editProjectButton);
    },
    addProjectButton: function() {
      const projectContainer = document.querySelectorAll(".project--list-container")[0];
      const actionUrl = projectContainer.dataset.addProjectUrl;
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
    },
    editProjectButton: function(event) {
      const projectId = event.target.dataset.projectId;
      const projectListItem = document.querySelector("#" + projectId);
      console.log(document.querySelector("#" + projectId));
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
