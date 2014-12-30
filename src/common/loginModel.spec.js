'use strict';


describe('loginServiceTest',function  () {
	var loginService, $httpBackend;
	var user = {'userName': 'test',
     			'password': 'test123'};
	beforeEach(module("LoginService"));
	beforeEach(inject(function  (_loginService_, _$httpBackend_) {
		loginService = _loginService_;
		$httpBackend = _$httpBackend_;

	}));

	it('should login success', function() {
     	var url ='login/';
     	var respond = {
     	               'result': 1,
     	               'rid': 1,
     	               'uid': 2,
     	               'token': 'sdfkdkqikdkkqe',
     	               'error_msg': 'pasword'}
     	  
     	$httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/', user).respond(201, respond);
     	 
     	 loginService.post(user,url);

     	console.log(loginService.test)
     	$httpBackend.flush();
     	console.log(loginService.post(user,url))
     	expect(loginService.post(user,url).result).toBe(1);
     	expect(loginService.post(user,url).uid).toBe(2);
    }),
		it('should login fail', function() {
			 var url ='login/';
			 var respond = {
		               'result': 1,
		               'rid': 1,
		               'uid': 2,
		               'token': 'sdfkdkqikdkkqe',
		               'error_msg': 'pasword'}
		  
		  $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/', user).respond(201, respond);
		  loginService.post(user,url);
		      
		   $httpBackend.flush();
		    expect(loginService.post(user,url).result).toBe(1);
		    

		}),
		
		it('should be ERROR!', function() {
			var url ='login/';
			var respond = {
		               'result': 0,
		               'rid': 1,
		               'uid': 2,
		               'token': 'sdfkdkqikdkkqe',
		               'error_msg': 'pasword'};
		  
		   

		    $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/',user).respond(401, respond);
		    loginService.post(user,url);
		   
		   $httpBackend.flush();
		   expect(loginService.post(user,url)).toBe("ERROR!");
		   

		});
	 
})