var app = angular.module("helpmyusers", ['ui.bootstrap', 'nvd3']);

app.controller('helpmyusers', function($scope, $http, $uibModal) {

	$scope.openLoginModal = function(){
		console.log("here");

				var modalInstance = $uibModal.open({
		 			 animation : true,
				     templateUrl: 'views/loginModal.html',
			      	 size: "md",
			      	 controller:'LoginModalController',
			      	 controllerAs:"vm",
			      	 backdrop : true
			    });

	     	 modalInstance.result.then(function (userData) {
		     user = userData;
		     console.log("userData",userData);
		    });
	}
	
	$scope.openSignupModal = function(){
		
		var modalInstance = $uibModal.open({
		 			 animation : true,
				     templateUrl: 'views/signupModal.html',
			      	 size: "md",
			      	 controller:'SignupModalController',
			      	 controllerAs:"vm",
			      	 backdrop : true
			    });

	     	 modalInstance.result.then(function (userData) {
		     vm.user = userData;
		     console.log("userData",vm.userData);
		    });

	}
	
});



app.controller('LoginModalController', function($scope, $http, $uibModalInstance){


	$scope.ok = function()
	{
		var username = $scope.email;
		var password = $scope.password

		console.log(username+password);
		$uibModalInstance.close();


		$http.post("/login", {"username":username, "password": password}).
		then(function(response) {

			console.log("response received "+response);
		if(response.status == 200)
			window.location.assign("/analytics");
		else
			alert("Invalid Username/Password");

		});	

	}

});


app.controller('SignupModalController', function($scope, $uibModalInstance, $http){

	$scope.ok = function()
	{
		var firstname = $scope.firstname;
		var lastname = $scope.lastname;
		var username = $scope.email;
		var password = $scope.password

		console.log(username+password);
		$uibModalInstance.close();


		$http.post("/signUp", {"firstname" : firstname, "lastname" : lastname, "username":username, "password": password}).
		then(function(response) {

			console.log("response received "+response);

		});	
	}

});

app.controller('analytics', function($scope, $http) {

	var lessSeenData = [];

	$scope.clickCountOptions = {
    chart: {
        type: 'discreteBarChart',
        height: 400,
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


	$scope.surveydonutOptions = {
	            chart: {
	                type: 'pieChart',
	                height: 400,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: true,
	                color : ["#1f77b4 ", "#ff7f0e ", "#2ca02c ", "#d62728 ", "#9467bd ", "#8c564b ", "#e377c2 ", "#7f7f7f ", "#bcbd22 ", "#17becf "],

	                
	                duration: 100,
	                legend: {
	                    margin: {
	                        top: 0,
	                        right: 0,
	                        bottom: 0,
	                        left: 0
	                    }
	                }
	            }
	        };


	 var surveydonutData = function(){
	 	
	 	$http({
			method : "POST",
			url : '/surveyData'
		}).success(function(details) {
		
			console.log("survey data "+details);
			var array1 = 0 ;
			var array2 = 0;
			var array3 = 0;
			var array4 = 0;
			var array5 = 0;

			for(var i = 0 ; i < details.length ; i++)
			{
				if(details[i] == 1)
					array1++;
				else if(details[i] == 2)
					array2++;
				else if(details[i] == 3)
					array3++;
				else if(details[i] == 4)
					array4++;
				else if(details[i] == 5)
					array5++;
			}
				
				
				$scope.donutData = [
	    		
				        { key : "1" , y : array1 },
				        { key : "2" , y : array2 },
				        { key : "3" , y : array3 },
				        { key : "4" , y : array4 },
				        { key : "5" , y : array5 }
	    			];
	    		
	    });
	 }

	  surveydonutData();


	  $scope.websitedonutOptions = {

	  	chart: {
	                type: 'pieChart',
	                height: 400,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: true,
	                color : ["#8c564b ", "#e377c2 ", "#7f7f7f ", "#bcbd22 ", "#17becf ","#1f77b4 ", "#ff7f0e ", "#2ca02c ", "#d62728 ", "#9467bd "],

	                
	                duration: 100,
	                legend: {
	                    margin: {
	                        top: 0,
	                        right: 0,
	                        bottom: 0,
	                        left: 0
	                    }
	                }
	            }
	  }



	  var donutDatafetch = function()
	{
		$http({
			method : "POST",
			url : '/clicksData'
		}).success(function(details) {

				var valueArray = [];
				var total = 0;

				for(var i = 0 ; i < details[0].page_clicks.length ; i ++)
				{
					total = total + details[0].page_clicks[i].click_count;
				}

				console.log("total "+total);

				for(var i = 0 ; i < details[0].page_clicks.length ; i ++)
				{
					valueArray.push({"key" : details[0].page_clicks[i].id_name, "y" : total - details[0].page_clicks[i].click_count});
				}

				console.log("donut value array "+valueArray);

				$scope.websiteDonutData = valueArray;
		});
	}

	donutDatafetch();






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
	$scope.calloutPublishFlag = true;
	$scope.calloutsuccess = false;
	$scope.surveysuccess = false;
	$scope.messagesuccess = false;

	$scope.saveMessage = function() {
		var temp = {
			"message":$scope.message
		};

		messageData.push(temp);

		console.log(messageData);

		$scope.messagePublishFlag = false;
		$scope.messagesuccess = true;

	}

	$scope.saveSurvey = function(argument) {
		surveyData = {
			"title":$scope.title,
			"fieldName" : $scope.fieldName,
			"timeDuration":$scope.timeDuration
		};

		$scope.surveyPublishFlag = false;
		$scope.surveysuccess = true;

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

		$scope.calloutPublishFlag = false;
		$scope.calloutsuccess = true;

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

