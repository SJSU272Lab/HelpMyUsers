var webshot = require('webshot');




exports.loadHomePage = function(req,res)
{
/*	webshot("amazon.com", "amazon.png", function(argument) {
		console.log("Inside Webshot module");
	});*/

	res.render('Message', { title: 'Message' });
};