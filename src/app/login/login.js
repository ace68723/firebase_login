var model = angular.module('LoginCtrl-model', []);

model.controller('loginCtrl', function (loginService) {
		var app = this;
		app.user = {'username':'',
					 'password':''	
					}
		 
		 app.loginService = loginService;
		app.submit = function  () {
			app.url ='login/'
			app.loginService.post(app.user, app.url)
		 	app.response = app.loginService.post(app.user, app.url)

			// console.log(app.response)
			if(app.response.result == '0'){
				window.localStorage.setItem("sv_uid", app.response.uid);
				window.localStorage.setItem("sv_rid", app.response.rid);
				window.localStorage.setItem("sv_token", app.response.token);
			}else{
				alert(app.response.error_msg)
			}

			return {
					response: app.response,
					result: app.response.result,
					error_msg: app.response.error_msg
					}
		}

		app.logout = function  () {
			window.localStorage.removeItem("sv_uid");
			window.localStorage.removeItem("sv_rid");
			window.localStorage.removeItem("sv_token");
		}

		app.checkAuth = function  () {
			app.url ='authorize/'
			if(window.localStorage.getItem("sv_uid") !== null){
				app.authData = {'rid': window.localStorage.getItem("sv_rid"),
                        		   'uid': window.localStorage.getItem("sv_uid")
                        			}
                loginService.post(app.authData, app.url)				        			
				
				app.response = loginService.post(app.authData, app.url)

				if(app.response.result == '0'){
					
                    }else{
					alert(app.response.error_msg)
				}
			}else{
				return
			}

			return {
					response: app.response,
					result: app.response.result,
					error_msg: app.response.error_msg,
					authData: app.authData
			}

		}

});