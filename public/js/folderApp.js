var app = {
    init: function() {
      const dropzone = document.querySelector("#file--drop-zone");
      dropzone.addEventListener("dragover", app.dragOver);
      dropzone.addEventListener("dragenter", app.dragEnter);
      dropzone.addEventListener("dragleave", app.dragLeave);
      dropzone.addEventListener("drop", app.dragDrop);
      document.querySelectorAll(".folder--delete").forEach(function(element){
        element.addEventListener("click", app.deleteFolder);
      });
      document.querySelectorAll(".button--edit-folder").forEach(function(element){
        element.addEventListener("click", app.enableForm);
      });
      document.querySelectorAll(".title-form--form").forEach(function(element){
        element.addEventListener("submit", app.editFolder);
      });
      document.querySelectorAll(".file--delete").forEach(function(link){
        link.addEventListener("click", app.deleteFile);
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
        const url = event.target.dataset.deleteUrl;
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
    enableForm: function() {
      document.querySelector(".title-form--title-input").disabled = false;
      document.querySelector(".title-form--title-input").focus();
      document.querySelector(".title-form--title-submit").classList.remove("hidden");
    },
    editFolder: function(event) {
      event.preventDefault();
      const url = this.action;
      axios.put(url, {
        "folderTitle": this.querySelector('input[name="folderTitle"]').value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      document.querySelector(".title-form--title-input").disabled = true;
      document.querySelector(".title-form--title-submit").classList.add("hidden");
    },
    deleteFile: function(event) {
      if (confirm("Supprimer le le fichier?")){
        const url = event.target.dataset.deleteUrl;
        axios.delete(url, {
        }).then(function (response) {
          document.location.reload(true);
          console.log(response);
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
