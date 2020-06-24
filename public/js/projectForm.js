var app = {
    init: function() {
      document.querySelectorAll(".taskStatus").forEach(function(dropDown){
        dropDown.addEventListener("change", app.updateTaskStatus);
      });
      document.querySelectorAll(".user-toggle--button").forEach(function(link){
        link.addEventListener("click", app.updateTaskUser);
      });
    },
    updateTaskStatus: function(event) {
      const url = this.dataset.action;
      console.log(this.value);
      axios.put(url, {
        "task_status_id": this.value
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    updateTaskUser: function(event) {
      let currentUserId = "";
      const getUsersUrl = this.dataset.userListUrl;
      axios.get(getUsersUrl)
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })



      axios.put(url, {
        "task_status_id": this.value
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  };
  
document.addEventListener('DOMContentLoaded', app.init);
