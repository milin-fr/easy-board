var app = {
    init: function() {
        console.log("init");
        document.querySelectorAll(".test-test").forEach(function(link){
          link.addEventListener("click", app.onClickBtn);
        });
    },
    onClickBtn: function(event) {
      event.preventDefault();
      const url = this.href;

      //axios.get(url).then(function(response){
      //  console.log(response);
      //});
      
      axios.put(url, {
        "task_title": "task api test title 2"
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
