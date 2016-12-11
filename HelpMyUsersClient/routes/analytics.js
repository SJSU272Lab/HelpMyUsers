var mongo = require("./mongo");
var mongoConnectURL = "mongodb://pavanshah77:pavanshah77@ds129028.mlab.com:29028/helpmyusersdatabase";


exports.captureClicksData = function(req, res)
{
	console.log("request received "+req.body.clickId);
	var field_name = req.body.clickId;

	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('clickcollection');		//collection data in coll
		
		coll.update({field_name : field_name},{$set : {field_name : field_name} , $inc:{click_count:1}}, {upsert: true}, function(err, user){
			
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


exports.fetchClicksData = function(req,res)
{
	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('clickcollection');		//collection data in coll
		
		coll.find({}, {field_name : 1 , click_count : 1}).toArray(function(err, user){
			
			if (user) 
			{
				console.log("success");
				console.log(user);
				res.send(user);
			} 
			
			else 
			{
				console.log("failure");
			}
		});
	});


};