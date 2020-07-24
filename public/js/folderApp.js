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
};

document.addEventListener('DOMContentLoaded', app.init);
