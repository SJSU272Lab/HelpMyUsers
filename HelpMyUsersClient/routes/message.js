var webshot = require('webshot');
var fs = require('fs');

exports.setMessage = function(req, res) {
	var messageData = [];
	console.log("body"+req.body.messageData[0].message);
	console.log("time"+req.body.messageData[0].timeInterval);

	for(var j=0; j<req.body.messageData.length; j++)
	{
		messageData.push(req.body.messageData[j].message);
	}

	var i=0;

	console.log("message data array "+messageData);

	var finalScript = "window.onload = function(){";

	for(i = 0 ; i < messageData.length ; i++)
	{
		var initData = "setTimeout(function(){message"+i+"();}, "+req.body.messageData[0].timeInterval+");function message"+i+"(){";
		var messageText = "var win_cnt = '<div>"+messageData[i]+"</div>';";
		var postData = "vex.defaultOptions.className = 'vex-theme-default';vex.open({content: win_cnt});}";
		finalScript = finalScript + initData+messageText+postData;
	}

	finalScript = finalScript + "};";

	console.log("finalScript "+finalScript);

	fs.readFile("./public/ReadScripts/messagescript.js", (err, data) => {
	  if (err)
	  {
	  		console.log(err);
			res.status(401);
	  }
	  else
	  {
	  		console.log(data);
	  		data = data + finalScript;
	  		
	  		fs.writeFile("./public/DownloadScripts/messagetemp.js", data, function(err) {
				if(err)
				{
						console.log(err);
						res.status(401);
				}
				else
				{
					res.status(200).json({"result":"/DownloadScripts/messagetemp.js"});
				}
			});
	  }
	});

}
