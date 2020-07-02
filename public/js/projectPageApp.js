var app = {
    init: function() {
      document.querySelectorAll(".taskStatus").forEach(function(dropDown){
        dropDown.addEventListener("change", app.updateTaskStatus);
      });
      document.querySelectorAll(".taskUser").forEach(function(link){
        link.addEventListener("change", app.updateTaskUser);
      });
      document.querySelector(".newTask").addEventListener("submit", app.newTask);
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
    }
};
  
document.addEventListener('DOMContentLoaded', app.init);
