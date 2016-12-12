//var webshot = require('webshot');
var fs = require('fs');

exports.saveCallout = function(req, res) {



	//var surveyTitle = req.body.surveyData.title;
	console.log(req.body.calloutData.fieldName);

	var fieldNames = req.body.calloutData.fieldName.replace(/\s/g, '');
	var calloutfieldArray = fieldNames.split(',');
	var temp = "";
	for(data in calloutfieldArray)
	{
		temp = 	temp + "'"+calloutfieldArray[data]+"',";
	}
	temp = temp.substring(0, temp.length - 1);
	

	var initial = "window.onload = function(){"+
        "var clickId = 0;"+
        /*"var ownerID = \""+req.session.username+"\";"+*/
        "var ownerID = \""+"test"+"\";"+
        "var arrayID = ["+temp+"];"+
        "var inputFlag = 0;"+
        "$('input').click(function() "+
        "{"+
          "switch( $(this).attr('id') )"+
          "{";

      var switchLoop = "";

      for(data in calloutfieldArray)
      {
      	switchLoop = switchLoop + "case "+"arrayID["+data+"] : clickId = $(this).attr('id'); inputFlag = 1; break;";
      }
      switchLoop = switchLoop +"}";

      console.log(switchLoop);
          
          

                var final = "if(inputFlag = 1)"+
                "{"+
                    "inputFlag = 0;"+
                    "var http = new XMLHttpRequest();"+
                    "var params = JSON.stringify({ clickId: clickId , ownerID : ownerID});"+
                    "http.open(\"POST\", '/captureClick', true);"+

                    "http.setRequestHeader(\"Content-type\", \"application/json; charset=utf-8\");"+
                    "http.setRequestHeader(\"Content-length\", params.length);"+
                    "http.setRequestHeader(\"Connection\", \"close\");"+

/*                    "http.onreadystatechange = function() {"+
                        "if(http.readyState == 4 && http.status == 200) {"+
                            "alert(http.responseText);"+
                        "}"+
                    "}"+*/
                    "http.send(params);"+
                "}"+
                
      "}); "+
    "};";

    calloutString = initial+switchLoop+final;

    console.log(calloutString);



	  		
	  		fs.writeFile("./public/DownloadScripts/callouttemp.js", calloutString, function(err) {
				if(err)
				{
						console.log(err);
						res.status(401);
				}
				else
				{
					res.status(200).json({"result":"/DownloadScripts/callouttemp.js"});
				}
			});


}
