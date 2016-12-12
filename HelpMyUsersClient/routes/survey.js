var webshot = require('webshot');
var fs = require('fs');

exports.setSurvey = function(req, res) {
	var surveyTitle = req.body.surveyData.title;

	var fieldNames = req.body.surveyData.fieldName.replace(/\s/g, '');
	var surveyfieldArray = fieldNames.split(',');

	console.log(surveyfieldArray[0]);
	console.log(surveyfieldArray[1]);

	var surveyInterval = req.body.surveyData.timeDuration;

	var initData = "window.onload=function(){setInterval(function(){survey();},"+surveyInterval+");";
	var surveyData = "function survey(){vex.defaultOptions.className = 'vex-theme-flat-attack';vex.dialog.open({message: '"+surveyTitle+"',";
	var fieldData = 'input: [';
	var lastData = "].join(''),buttons: [$.extend({}, vex.dialog.buttons.YES, { text: 'Submit Survey' }),$.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })],";
	var callback = "callback: function (data) {if (!data) {console.log('Cancelled')} else {console.log(data)}}})}}";

	for (var i = 0 ; i < surveyfieldArray.length ; i++)
	{
		if(i == surveyfieldArray.length-1)
		{
			fieldData = fieldData + "'"+"<input name='"+surveyfieldArray[i]+"' type='text' placeholder = '"+surveyfieldArray[i]+"' required />'";
		}
		else
		{
			fieldData = fieldData + "'"+"<input name="+surveyfieldArray[i]+" type='text' placeholder = "+surveyfieldArray[i]+" required />',";
		}
	}

	console.log(initData);
	console.log(surveyData);
	console.log(fieldData);
	console.log(lastData);
	console.log(callback);

	var finalScript = initData+surveyData+fieldData+lastData+callback;
	
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
	  		
	  		fs.writeFile("./public/DownloadScripts/surveytemp.js", data, function(err) {
				if(err)
				{
						console.log(err);
						res.status(401);
				}
				else
				{
					res.status(200).json({"result":"/DownloadScripts/surveytemp.js"});
				}
			});
	  }
	});
}
