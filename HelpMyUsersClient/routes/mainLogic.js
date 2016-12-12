//var webshot = require('webshot');




exports.loadHomePage = function(req,res)
{
/*	webshot("amazon.com", "amazon.png", function(argument) {
		console.log("Inside Webshot module");
	});*/

	res.render('home_page', { title: 'Message' });

};


exports.analytics = function(req,res)
{
	res.render('dashBoard', { title: 'dashBoard' });
};