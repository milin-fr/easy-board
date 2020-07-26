var app = {
    init: function() {
      document.querySelector(".folder--new").addEventListener("submit", app.addFolder);
    },
    addFolder: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.post(url, {
        "folderTitle": this.querySelector('input[name="folderTitle"]').value,
      })
      .then(function (response) {
        document.location.reload(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
};
  
document.addEventListener('DOMContentLoaded', app.init);
