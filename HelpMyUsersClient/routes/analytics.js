var mongo = require("./mongo");
var mongoConnectURL = "mongodb://pavanshah77:pavanshah77@ds129028.mlab.com:29028/helpmyusersdatabase";
/*var mongoConnectURL = "mongodb://localhost:27017/helpmyusers";*/

exports.captureClicksData = function(req, res)
{
	console.log("request received "+req.body.clickId);
	var field_name = req.body.clickId;
	var owner_id = req.body.ownerID;
	var page_clicks_array = [];

	console.log("owner id "+owner_id);

	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		
		var coll = mongo.collection('clickcollection');		//collection data in coll

		coll.findOne({owner_id : owner_id}, function(err, user){

			if(user)
			{
				console.log("user data "+user);
				console.log("user page clicks "+user.page_clicks);
				page_clicks_array = user.page_clicks;

				for(var i = 0; i < page_clicks_array.length ; i++)
				{
					if(page_clicks_array[i].id_name == field_name)
					{
						var newcount = page_clicks_array[i].click_count + 1;

						console.log("field_name "+field_name+"count "+page_clicks_array[i].click_count);

						page_clicks_array[i].click_count = newcount;

						console.log("after field_name "+field_name+"count "+newcount);
					}
				}

				updateClicks(req, res, page_clicks_array , owner_id);
			
			}

			else
			{
				console.log("error");
			}
		})

	});
}


function updateClicks(req, res, page_clicks_array, owner_id)
{
		mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('clickcollection');		//collection data in coll
		
		coll.update({owner_id : owner_id},{$set : {page_clicks : page_clicks_array}}, {upsert: true}, function(err, user){		
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
	//var owner_id = "pavanshah77@gmail.com";

	console.log("session username "+req.session.username);

	var owner_id = req.session.username;

	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('clickcollection');		//collection data in coll
		
		coll.find({owner_id : owner_id}, {page_clicks : 1}).toArray(function(err, user){
			
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


exports.getSurveyData = function(req, res) {
	console.log("survey data");
	console.log("sessiohobaivfxkha"+req.session.username);
	var owner_id = req.session.username;	
	console.log(owner_id);
	mongo.connect(mongoConnectURL, function(connection){
		console.log("connection received "+connection);
		
		console.log('Connected to mongo at: ' + mongoConnectURL);
		var coll = mongo.collection('surveyCollection');		//collection data in coll
		
		coll.find({email : owner_id}, {json : 1}).toArray(function(err, user){
			
			if (user != "") 
			{
				console.log("khgvjgjv"+user);
				var ratingArray = [];
				console.log("success");
				console.log("survey data "+user);

				console.log("data 1"+user[0].json);

				for(var i = 0 ; i < user.length ; i++)
				{
					var dataArray = user[i].json.split(':');
					var lastIndex = dataArray.length-1;
					console.log("Rating "+dataArray[lastIndex]);
					var rating = dataArray[lastIndex].charAt(1);
					rating = parseInt(rating);
 
					console.log("rating "+rating);
					ratingArray.push(rating);
				}

				console.log(ratingArray);

				res.send(ratingArray);
			} 
			
			else 
			{
				console.log("failure");
			}
		});
	});

}


exports.updateClicks = updateClicks;