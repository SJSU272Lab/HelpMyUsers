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

				var valueArray = [];

				for(var i = 0 ; i < details.length ; i ++)
				{
					valueArray.push({"label" : details[i].field_name, "value" : details[i].click_count});
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
app.controller("guidedTours", function($scope, $http, $uibModal){

	//$scope.imagePath = "google.com.png";

	$scope.loadURL = function() {
		console.log("ljsbdgs"+$scope.url);
		console.log("in angular");
		$http.post("/loadURL", {"url":$scope.url}).
		then(function(response) {
			console.log(""+response.data);
			$scope.imagePath = response.data.result;
		});
	}

	$scope.publish = function() {
		
		
		
	}


	$scope.setMessage = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/loginModal.ejs',
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

	$scope.add = function() {
		var temp = {
			"id":$scope.id,
			"heading":$scope.header,
			"message":$scope.message
		};

		guidedTourData.push(temp);

		console.log(guidedTourData);
		$uibModalInstance.close();
	}

});