var app = {
    init: function() {
      console.log("init");
      document.querySelector("#add-project--button").addEventListener("click", app.addProjectButton);
    },
    addProjectButton: function() {
      const projectContainer = document.querySelectorAll(".project-container")[0];
      const actionUrl = projectContainer.dataset.addProjectUrl;
      console.log(actionUrl);
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
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
