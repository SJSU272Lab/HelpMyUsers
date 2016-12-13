var mongo = require("./mongo");
var mongoConnectURL = "mongodb://pavanshah77:pavanshah77@ds129028.mlab.com:29028/helpmyusersdatabase";

/*var mongoConnectURL = "mongodb://localhost:27017/helpmyusers";*/



exports.login = function(req, res)
{
	console.log("login");
	console.log("login "+req.body.username);
	var username = req.body.username;
	var password = req.body.password;

	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('usercollection');		//collection data in coll
		console.log(coll);
		coll.findOne({username : username, password : password}, function(err, user){
			
			if (user) 
			{
				console.log("success");
				console.log(user);
				req.session.username = username;
				console.log(req.session.username);
				console.log(username);
				res.status(200).send(user);

			} 
			
			else 
			{
				console.log("failure");
				res.status(401).send();
			}
		});
	});
}

exports.signUp = function(req, res)
{
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var password = req.body.password;

	console.log("signUp "+req.body.username);

	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('usercollection');		//collection data in coll
		
		coll.insert({firstname : firstname, lastname : lastname, username : username, password : password}, function(err, user){
			
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

}