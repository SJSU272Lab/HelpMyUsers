        $(document).ready(function() {
      //var cursorX;
      //var cursorY;

/*function demo() {
  alert("yoyo");
};*/

       $("<div>Random Message</div>").dialog({position: { my: "left top", at: "left bottom", of: window }});

      $("body").click(function(){
        $("p").hide();
      });
});