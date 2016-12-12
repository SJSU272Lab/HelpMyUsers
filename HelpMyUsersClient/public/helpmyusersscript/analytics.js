window.onload = function(){ 
        var clickId = 0;
        var ownerID = "pavanshah77@gmail.com";
        var arrayID = ['demoRequest', 'freeTrial', 'guidedTours', 'message', 'surveys', 'callouts'];
        var inputFlag = 0;

        $('input').click(function() 
        {
          switch( $(this).attr('id') )
          {
            case arrayID[0] :
                clickId = $(this).attr('id');
                inputFlag = 1;
                break;
            case 'freeTrial' :
                clickId = $(this).attr('id');
                inputFlag = 1;
                break;
            case 'guidedTours' :
                clickId = $(this).attr('id');
                inputFlag = 1;
                break;
            case 'message' :
                clickId = $(this).attr('id');
                inputFlag = 1;
                break;
            case 'surveys' :
                clickId = $(this).attr('id');
                inputFlag = 1;
                break;
            case 'callouts' :
                clickId = $(this).attr('id');
                inputFlag = 1;
                break;
          }
          

                if(inputFlag = 1)
                {
                    inputFlag = 0;
                    var http = new XMLHttpRequest();
                    var params = JSON.stringify({ clickId: clickId , ownerID : ownerID});
                    http.open("POST", '/captureClick', true);

                    http.setRequestHeader("Content-type", "application/json; charset=utf-8");
                    http.setRequestHeader("Content-length", params.length);
                    http.setRequestHeader("Connection", "close");

                    http.onreadystatechange = function() {
                        if(http.readyState == 4 && http.status == 200) {
                            alert(http.responseText);
                        }
                    }
                    http.send(params);
                }
                
      }); 
    };