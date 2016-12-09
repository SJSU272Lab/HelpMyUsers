var webshot = require('webshot');


var loadImage = function(req,res) {
	var url = req.param("url");
	console.log("in webshot"+url);

/*	webshot(url,"./public/images/"+url+".jpg",{windowSize:{ width: 1920, height: 1080 }, shotSize:{ width: 'all', height: 'all' }, quality:3000} , function(argument) {
		console.log("Inside Webshot module");

	});


	setTimeout(function(){
		  console.log('test');
		  	var temp = "/images/"+url+".jpg";
			res.status(200).json({"result":temp});
		}, 12 * 1000);  */
res.status(200).json({"result":"/images/google.com.jpg"});


}


var publishGuidedTour = function(req, res) {
	var tourData = req.param("data");
	var i=0;

	var writeData = "function writeJS(){var temp = <ol id='joyRideTipContent'>";

	//tourData.foreach();

	for(i=0; i<tourData.length; i++)
	{
		if(i<tourData.length-1)
		{
			writeData = writeData+"<li data-id='"+tourData[i].id+"' data-button='Next' data-options='tipLocation:top;tipAnimation:fade'>";
			writeData = writeData+"<h2>"+tourData[i].header+"</h2>";
			writeData = writeData+"<p>"+tourData[i].message+"</p></li>";
		}
		else
		{
			writeData = writeData+"<li data-id='"+tourData[i].id+"' data-button='Close' data-options='tipLocation:top;tipAnimation:fade'>";
			writeData = writeData+"<h2>"+tourData[i].header+"</h2>";
			writeData = writeData+"<p>"+tourData[i].message+"</p></li></ol>";
		}
	}

	console.log(writeData);
	res.status(200);
}


exports.publishGuidedTour = publishGuidedTour;
exports.loadImage = loadImage;