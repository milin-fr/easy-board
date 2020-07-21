var app = {
    init: function() {
      const dropzone = document.querySelector("#file--drop-zone");
      dropzone.addEventListener("dragover", app.dragOver);
      dropzone.addEventListener("dragenter", app.dragEnter);
      dropzone.addEventListener("dragleave", app.dragLeave);
      dropzone.addEventListener("drop", app.dragDrop);
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
      const folderId = event.target.dataset.folderId;
      [...event.dataTransfer.files].forEach(file => {
        const formData = new FormData();
        formData.append("file", "file");
        formData.append("folderId", folderId);
        axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      });
    },
};

document.addEventListener('DOMContentLoaded', app.init);
