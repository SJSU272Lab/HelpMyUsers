var webshot = require('webshot');
var fs = require('fs');

var mongo = require("./mongo");
var mongoConnectURL = "mongodb://pavanshah77:pavanshah77@ds129028.mlab.com:29028/helpmyusersdatabase";






exports.saveSurvey = function(req, res) {
	//console.log("in save survey"+req.body[0]);
	var key;
	var json="";
	var counter = 0;
	var keys = [];
	console.log("length"+req.body.length);
	for(key in req.body) {
  var infoJSON = req.body[key];
  keys.push(key);
  json = json + "\""+key+"\""+":"+"\""+infoJSON+"\"" ; 
  if(counter != req.body.length-1)
  	json = json + ",";
  counter++;
  console.log("savesurvey"+json);
}
console.log(keys);

json = json.substring(0, json.length - 1);

console.log(json);


	//console.log("request received "+req.body.clickId);
	//var field_name = req.body.clickId;

	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('surveyCollection');		//collection data in coll
		
		coll.insertOne({email:req.body.email, json:json}, function(err, user){
			
			if (user) 
			{
				console.log("success");
			} 
			
			else 
			{
				console.log("failure");
			}
		});
	});
}









exports.setSurvey = function(req, res) {
	var surveyTitle = req.body.surveyData.title;

	var fieldNames = req.body.surveyData.fieldName.replace(/\s/g, '');
	var surveyfieldArray = fieldNames.split(',');

	console.log(surveyfieldArray[0]);
	console.log(surveyfieldArray[1]);

	var surveyInterval = req.body.surveyData.timeDuration;

	var initData = "window.onload=function(){setTimeout(function(){survey();},"+surveyInterval+");";
	var surveyData = "function survey(){vex.defaultOptions.className = 'vex-theme-default';vex.dialog.open({message: '"+surveyTitle+"',";
	var fieldData = 'input: [';
	var lastData = "].join(''),buttons: [$.extend({}, vex.dialog.buttons.YES, { text: 'Submit Survey' }),$.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })],";
	var callback = "callback: function (data) {if (!data) {console.log('Cancelled')} else {console.log(data); ";

	//var inputParams = JSON.stringify({});

    var jsonparams = "email:\"test\",";
    for(var j=0; j<surveyfieldArray.length ; j++)
    {
    	jsonparams = jsonparams +""+ surveyfieldArray[j] + ":data." + surveyfieldArray[j] ;
    	if(j != surveyfieldArray.length-1)
    	{
    		jsonparams = jsonparams+",";
    	}
    	else
    	{
    		jsonparams = jsonparams + "," + "rating:data.rating";
    	}
    }

    console.log(jsonparams);


     var callbackInput = "var http = new XMLHttpRequest(); var params = JSON.stringify({ "+jsonparams+" });"+
                    "http.open('POST', '/saveSurvey', true);"+
                    "http.setRequestHeader('Content-type', 'application/json; charset=utf-8');"+
                    "http.setRequestHeader('Content-length', params.length);"+
                    "http.setRequestHeader('Connection', 'close');"+
                    "http.onreadystatechange = function() {"+
                        "if(http.readyState == 4 && http.status == 200) {"+
                            "alert(http.responseText);"+
                        "}"+
                    "}"+
                    "http.send(params);";


    //callback = callback + callbackInput + "}}})}}";
    callback = callback + "makePOST(data); }}})}";

    var endappend = "function makePOST(data){var http = new XMLHttpRequest(); var params = JSON.stringify({ "+jsonparams+" });"+
                    "http.open('POST', '/saveSurvey', true);"+
                    "http.setRequestHeader('Content-type', 'application/json; charset=utf-8');"+
                    "http.setRequestHeader('Content-length', params.length);"+
                    "http.setRequestHeader('Connection', 'close');"+

                    "http.send(params);}}"

/*                    "http.onreadystatechange = function() {"+
                        "if(http.readyState == 4 && http.status == 200) {"+
                            "alert(http.responseText);"+
                        "}"+
                    "}"+*/

	for (var i = 0 ; i < surveyfieldArray.length ; i++)
	{
		if(i == surveyfieldArray.length-1)
		{
			fieldData = fieldData + "'"+"<input name=\""+surveyfieldArray[i]+"\" type=\"text\" placeholder = \""+surveyfieldArray[i]+"\" required />',"+

				"'&nbsp;&nbsp;&nbsp;Please rate this website: ',"+
			  	"'<input type=\"radio\" name=\"rating\" value=\"1\"> 1&nbsp;&nbsp;&nbsp;',"+
  				"'<input type=\"radio\" name=\"rating\" value=\"2\"> 2&nbsp;&nbsp;&nbsp;',"+
  				"'<input type=\"radio\" name=\"rating\" value=\"3\"> 3&nbsp;&nbsp;&nbsp;',"+
  				"'<input type=\"radio\" name=\"rating\" value=\"4\"> 4&nbsp;&nbsp;&nbsp;',"+
  				"'<input type=\"radio\" name=\"rating\" value=\"5\"> 5&nbsp;&nbsp;&nbsp;'";
		}
		else
		{
			fieldData = fieldData + "'"+"<input name=\""+surveyfieldArray[i]+"\" type=\"text\" placeholder = \""+surveyfieldArray[i]+"\" required />',";
		}
	}

	console.log(initData);
	console.log(surveyData);
	console.log(fieldData);
	console.log(lastData);
	console.log(callback);

	var finalScript = initData+surveyData+fieldData+lastData+callback+endappend;
	
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
