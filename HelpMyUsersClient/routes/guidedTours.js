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

exports.loadImage = loadImage;