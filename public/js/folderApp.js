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
      event.dataTransfer.files.forEach(file => {
        const formData = new FormData();
        formData.append("file", file);
        const url;
        axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function () {
          document.location.reload(true);
        })
        .catch(function () {
          console.log('FAILURE!!');
        });
      });

      console.log(event.dataTransfer.files);
      return;
      const url = document.querySelector(".project--container").dataset.updateStatusUrl;

      
      axios.put(url, {
        "projectId": document.querySelector('.dragged-element').dataset.projectId,
        "statusId": event.target.dataset.projectStatusId
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
