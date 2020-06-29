var app = {
    init: function() {
      document.querySelector("#add-project--button").addEventListener("click", app.addProjectButton);
    },
    addProjectButton: function() {
      const projectContainer = document.querySelectorAll(".project-container")[0];
      const actionUrl = projectContainer.dataset.addProjectUrl;
      const projectForm = document.createElement("form");
      projectForm.setAttribute('method', 'post');
      projectForm.setAttribute('action', actionUrl);
      const projectTitleInput = document.createElement("input");
      projectTitleInput.setAttribute('type', 'text');
      projectTitleInput.setAttribute('name', 'title');
      projectTitleInput.setAttribute('value', 'Nom du projet');
      const sendButtonInput = document.createElement("input");
      sendButtonInput.setAttribute('type', 'submit');
      sendButtonInput.setAttribute('value', 'Submit');
      projectForm.appendChild(projectTitleInput);
      projectForm.appendChild(sendButtonInput);
      projectContainer.appendChild(projectForm);
      projectForm.addEventListener("submit", app.addProjectConfirm);
    },
    addProjectConfirm: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.post(url, {
        "projectTitle": this.querySelector('input[name="title"]').value
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
