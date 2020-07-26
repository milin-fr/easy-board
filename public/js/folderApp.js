var app = {
    init: function() {
      const dropzone = document.querySelector("#file--drop-zone");
      dropzone.addEventListener("dragover", app.dragOver);
      dropzone.addEventListener("dragenter", app.dragEnter);
      dropzone.addEventListener("dragleave", app.dragLeave);
      dropzone.addEventListener("drop", app.dragDrop);
      document.querySelectorAll(".folder--delete-form").forEach(function(element){
        element.addEventListener("submit", app.deleteFolder);
      });
    },
    dragOver: function(event) {
      event.preventDefault();
    },
    dragEnter: function(event) {
      event.preventDefault();
      event.target.classList.add("dragover");
    },
    dragLeave: function(event) {
      event.target.classList.remove("dragover");
    },
    dragDrop: function(event) {
      event.preventDefault();
      const url = event.target.dataset.uploadUrl;
      const formData = new FormData();
      [...event.dataTransfer.files].forEach(file => {
        formData.append("files[]", file);
      });
      axios.post(url, formData)
      .then(function (response) {
        document.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteFolder: function(event) {
      event.preventDefault();
      if (confirm("Supprimer le dossier?")){
        const url = event.target.action;
        const redirectUrl = event.target.dataset.redirectUrl;
        axios.delete(url, {
        }).then(function (response) {
          window.location.href = redirectUrl;
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        console.log("nay");
      }
    },
};

document.addEventListener('DOMContentLoaded', app.init);
