'use strict';

var LoginService = angular.module('LoginService', []);


 LoginService.service('loginService', [ '$http', function( $http) {
	var loginService = this;
	loginService.test ="this is a test";
	loginService.post = function(user, url) {
		$http.post('http://chanmao.ca/?r=%20rrclient/' + url, user)
			.success(function(response) {
		      loginService.result = response;
		    }).error(function() {
		      loginService.result = 'ERROR!';
		    });
		     return loginService.result;
	  	};
}]);