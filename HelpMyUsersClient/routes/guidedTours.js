var webshot = require('webshot');
var fs = require('fs');


var loadImage = function(req,res) {
	var url = req.param("url");
	console.log("in webshot"+url);

/*	webshot(url,"./public/images/"+url+".jpg",{windowSize:{ width: 1920, height: 1080 }, shotSize:{ width: 'all', height: 'all' }, quality:150} , function(argument) {
		console.log("Inside Webshot module");

	});*/

	webshot(url,"./public/images/temp.jpg",{windowSize:{ width: 1400, height: 900 }, shotSize:{ width: 'window', height: 'window' }, quality:150} , function(argument) {
		console.log("Inside Webshot module");

	});


	setTimeout(function(){
		  console.log('test');
		  	//var temp = "/images/"+url+".jpg";
		  	var temp = "/images/temp.jpg";
			res.status(200).json({"result":temp});
		}, 13 * 1000);  
//res.status(200).json({"result":"/images/google.com.jpg"});


}


var publishGuidedTour = function(req, res) {
	var tourData = [];
	console.log("param data:::::::"+req.body.tourData[0].id);
	//tourData.push(req.body.tourData);

	for(var j=0; j<req.body.tourData.length; j++)
	{
		tourData.push(req.body.tourData[j]);
	}

	var i=0;

	console.log(tourData+"khdsvsd");

	var writeData = "function writeJS(){var temp = \"<ol id='joyRideTipContent'>";

	//tourData.foreach();
	console.log("lemngthhhhhh"+tourData.length);
	for(i=0; i<tourData.length; i++)
	{
		if(i<tourData.length-1)
		{
			writeData = writeData+"<li data-id='"+req.body.tourData[i].id+"' data-button='Next' data-options='tipLocation:top;tipAnimation:fade'>";
			writeData = writeData+"<h2>"+req.body.tourData[i].header+"</h2>";
			writeData = writeData+"<p>"+req.body.tourData[i].message+"</p></li>";
		}
		else
		{
			writeData = writeData+"<li data-id='"+req.body.tourData[i].id+"' data-button='Close' data-options='tipLocation:top;tipAnimation:fade'>";
			writeData = writeData+"<h2>"+req.body.tourData[i].header+"</h2>";
			writeData = writeData+"<p>"+req.body.tourData[i].message+"</p></li></ol>\";";
		}
	}

	fs.readFile("./public/ReadScripts/helpmyusersscript.js", (err, data) => {
	  if (err)
	  {
	  		console.log(err);
			res.status(401);
	  }
	  else
	  {
	  	console.log(data);
	  		writeData = writeData + data;
	  		fs.writeFile("./public/DownloadScripts/temp.js", writeData, function(err) {
				if(err)
				{
					console.log(err);
						res.status(401);
				}
				else
				{
					res.status(200).json({"result":"/DownloadScripts/temp.js"});
				}
			});
	  }
	});



	console.log(writeData);
	//res.status(200);
}


exports.publishGuidedTour = publishGuidedTour;
exports.loadImage = loadImage;