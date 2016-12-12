var app = angular.module("helpmyusers", ['ui.bootstrap', 'nvd3']);

app.controller('helpmyusers', function($scope, $http) {
	
	$scope.trial = 20;



	


	
	
});


app.controller('analytics', function($scope, $http) {

	$scope.clickCountOptions = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format()(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'Element ID'
        },
        yAxis: {
            axisLabel: 'click_count'
        }
    	}
	};


	var datafetch = function()
	{
		$http({
			method : "POST",
			url : '/clicksData'
		}).success(function(details) {
		
				console.log(details);
				console.log(details.length);
				console.log(details[0].page_clicks);
				console.log(details[0].page_clicks[0].id_name);

				var valueArray = [];

				for(var i = 0 ; i < details[0].page_clicks.length ; i ++)
				{
					valueArray.push({"label" : details[0].page_clicks[i].id_name, "value" : details[0].page_clicks[i].click_count});
				}

				console.log("value array "+valueArray);

				$scope.clickCountData = [{
			   		key: "Cumulative Return",
			    	values: valueArray
				}];
		});
	}

	datafetch();


});

var guidedTourData = [];
var downloadURL="";
var messageData = [];
var surveyData = [];
var calloutData = [];

app.controller("guidedTours", function($scope, $http, $uibModal){

	$scope.publishFlag = true;
	$scope.imagePath = "/images/noImage.jpg";
	$scope.imgFlag = true;
	$scope.loadURL = function() {
		console.log("ljsbdgs"+$scope.url);
		console.log("in angular");
		$http.post("/loadURL", {"url":$scope.url}).
		then(function(response) {
			console.log(""+response.data);
			$scope.imagePath = response.data.result;
			$scope.imgFlag = false;
		});
	}

	$scope.publish = function() {
		console.log($scope.guidedTourData);
		$http.post("/publishGuidedTour", {"tourData":$scope.guidedTourData}).
		then(function(response) {

			downloadURL = response.data.result;

			 var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/downloadScript.ejs',
	      	 size: "md",
	      	 controller:'DownloadModalController',
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {

		     
		    }, function (err) {
		      
		});
		});
		
		
	}


	var init = function() {
		$scope.guidedTourData = guidedTourData;
		if(guidedTourData.length > 0)
		{
			$scope.publishFlag=false;
		}
	}
	init();

	$scope.setMessage = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/SetMessageModal.ejs',
	      	 size: "md",
	      	 controller:'MessageModalController',
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {

		     
		    }, function (err) {
		      
		});
		  
 	}

});







app.controller("MessageModalController", function($scope, $http, $uibModalInstance){


	//guidedTourData = [];

	$scope.add = function() {
		var temp = {
			"id":$scope.id,
			"header":$scope.header,
			"message":$scope.message
		};

		guidedTourData.push(temp);

		console.log(guidedTourData);
		$uibModalInstance.close();
	}

});


app.controller("setMessageController", function($scope, $http, $uibModalInstance){

	$scope.add = function() {
		var temp = {
			"message":$scope.message
		};

		messageData.push(temp);

		console.log(messageData);
		$uibModalInstance.close();
	}

});


app.controller("DownloadModalController", function($scope, $http, $uibModalInstance){


	//guidedTourData = [];
	$scope.downloadURL = downloadURL;
/*	$scope.add = function() {
		var temp = {
			"id":$scope.id,
			"header":$scope.header,
			"message":$scope.message
		};

		guidedTourData.push(temp);

		console.log(guidedTourData);
		$uibModalInstance.close();
	}*/

});



app.controller("messageController", function($scope, $http, $uibModal){

	$scope.setMessage = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/messageModal.ejs',
	      	 size: "md",
	      	 controller:'setMessageController',
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {
		     
		    }, function (err) {
		      
		});
		  
 	}


 	$scope.publishMessage = function() {

 		console.log("messageData @ publish "+messageData);

 		
		$http.post("/setMessage", {"messageData":messageData}).
		then(function(response) {

			console.log("success");
			
			downloadURL = response.data.result;

			 var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/downloadScript.ejs',
	      	 size: "md",
	      	 controller:'DownloadModalController',
	      	 backdrop : true
	      	 
	    });

	     modalInstance.result.then(function (userData) {
		     
		    }, function (err) {
		      
			});
		});
		

 	}
});


app.controller("surveyController", function($scope, $http, $uibModal){

	$scope.setSurvey = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/surveyModal.ejs',
	      	 size: "md",
	      	 controller:'setSurveyController',
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {
		     
		    }, function (err) {
		      
		});
		  
 	}


 	$scope.publishSurvey = function() {

 		console.log("surveyData @ publish "+surveyData);

		$http.post("/setSurvey", {"surveyData":surveyData}).
		then(function(response) {

			console.log("success");
			
			downloadURL = response.data.result;

			 var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/downloadScript.ejs',
	      	 size: "md",
	      	 controller:'DownloadModalController',
	      	 backdrop : true
	      	 
	    });

	     modalInstance.result.then(function (userData) {
		     
		    }, function (err) {
		      
			});
		});	

 	}
});


app.controller("setSurveyController", function($scope, $http, $uibModalInstance){

	$scope.add = function() {
		surveyData = {
			"title":$scope.title,
			"fieldName" : $scope.fieldName,
			"timeDuration":$scope.timeDuration
		};

		console.log(surveyData);
		$uibModalInstance.close();
	}
	

});

app.controller("mcsController", function($scope, $http, $uibModal){

	$scope.messagePublishFlag = true;
	$scope.surveyPublishFlag = true;

	$scope.saveMessage = function() {
		var temp = {
			"message":$scope.message
		};

		messageData.push(temp);

		console.log(messageData);

		$scope.messagePublishFlag = false;
	}

	$scope.saveSurvey = function(argument) {
		surveyData = {
			"title":$scope.title,
			"fieldName" : $scope.fieldName,
			"timeDuration":$scope.timeDuration
		};

		$scope.surveyPublishFlag = false;
	}

	$scope.publishMessage = function() {
		console.log("messageData @ publish "+messageData);

 		
		$http.post("/setMessage", {"messageData":messageData}).
		then(function(response) {

			console.log("success");
			
			downloadURL = response.data.result;

			 var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/downloadMessageScript.ejs',
	      	 size: "md",
	      	 controller:'DownloadModalController',
	      	 backdrop : true
	      	 
	    });

	     modalInstance.result.then(function (userData) {
		     
		    }, function (err) {
		      
			});
		});
	}

	$scope.publishSurvey = function() {
		console.log("surveyData @ publish "+surveyData);

		$http.post("/setSurvey", {"surveyData":surveyData}).
		then(function(response) {

			console.log("success");
			
			downloadURL = response.data.result;

			 var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/downloadSurveyScript.ejs',
	      	 size: "md",
	      	 controller:'DownloadModalController',
	      	 backdrop : true
	      	 
	    });

	     modalInstance.result.then(function (userData) {
		     
		    }, function (err) {
		      
			});
		});	
	}



	$scope.saveCallout = function(argument) {
		calloutData = {
			"fieldName" : $scope.surveyfieldName
		};

		$scope.surveyPublishFlag = false;
	}

	$scope.publishCallout = function() {
		console.log("messageData @ publish "+messageData);

 		
		$http.post("/saveCallout", {"calloutData":calloutData}).
		then(function(response) {

			console.log("success");
			
			downloadURL = response.data.result;

			 var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/downloadCalloutScript.ejs',
	      	 size: "md",
	      	 controller:'DownloadModalController',
	      	 backdrop : true
	      	 
	    });

	     modalInstance.result.then(function (userData) {
		     
		    }, function (err) {
		      
			});
		});
	}




});

