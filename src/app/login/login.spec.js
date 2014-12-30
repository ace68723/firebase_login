'use strict';


describe('loginService',function  () {
     var loginService, loginCtrl, $controller, $httpBackend;
     var user = {'userName': 'test',
                    'password': 'test123'};
     beforeEach(module("LoginService"));
     beforeEach(module("LoginCtrl-model"));
     beforeEach(inject(function  ($controller, _loginService_, _$httpBackend_) {
          loginService = _loginService_;
          loginCtrl = $controller("loginCtrl",{loginService:loginService})
          $httpBackend = _$httpBackend_;

     }));

     it('should login success', function() {
                var url ='login/';   
                 var respond = {
                          'result': 0,
                          'rid': 1,
                          'uid': 2,
                          'token': 'sdfkdkqikdkkqe',
                          'error_msg': 'pasword'}
            
             $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/', user).respond(201, respond);
              loginService.post(user, url);
             // loginCtrl.submit()
              $httpBackend.flush();

              //expect(loginService.post(user)).toBe(respond);
              expect(loginCtrl.user.username).toBe('');
              expect(loginCtrl.submit().result).toBe(0);
        })

     it('should show error', function() {
                var url ='login/';
                 var respond = {
                          'result': 0,
                          'rid': 1,
                          'uid': 2,
                          'token': 'sdfkdkqikdkkqe',
                          'error_msg': 'pasword'}
            
             $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/', user).respond(401, respond);
              loginService.post(user, url);
             // loginCtrl.submit()
              $httpBackend.flush();

              //expect(loginService.post(user)).toBe(respond);
              expect(loginCtrl.user.username).toBe('');
              expect(loginCtrl.submit().response).toBe('ERROR!');
        })
     it('should save data in local', function  () {
            var url ='login/';
            var respond = {
                          'result': '0',
                          'rid': '3',
                          'uid': '2',
                          'token': 'sdfkdkqikdkkqe',
                          'error_msg': 'pasword'}
            
             $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/', user).respond(201, respond);
              loginService.post(user, url);
              $httpBackend.flush();
    
              expect(loginCtrl.submit().result).toBe('0');
              expect(window.localStorage.getItem("sv_uid")).toBe('2');
              expect(window.localStorage.getItem("sv_rid")).toBe('3');
              expect(window.localStorage.getItem("sv_token")).toBe('sdfkdkqikdkkqe');
     })
     it('should alert error message', function  () {
            var url ='login/';
            var respond = {
                          'result': '1',
                          'rid': '3',
                          'uid': '2',
                          'token': 'sdfkdkqikdkkqe',
                          'error_msg': 'pasword'}
            
             $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/', user).respond(201, respond);
              loginService.post(user, url);
              $httpBackend.flush();
    
              expect(loginCtrl.submit().error_msg).toBe('pasword');
     })
     it('shold log out can remove the local data', function  () {
        var url ='login/';
        var respond = {
                          'result': '0',
                          'rid': '3',
                          'uid': '2',
                          'token': 'sdfkdkqikdkkqe',
                          'error_msg': 'pasword'}
            
             $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/login/', user).respond(201, respond);
              loginService.post(user, url);
              $httpBackend.flush();
              loginCtrl.submit();
              expect(window.localStorage.getItem("sv_uid")).toBe('2');
              expect(window.localStorage.getItem("sv_rid")).toBe('3');
              expect(window.localStorage.getItem("sv_token")).toBe('sdfkdkqikdkkqe');
              
              loginCtrl.logout();
              expect(window.localStorage.getItem("sv_uid")).toBe(null);
              expect(window.localStorage.getItem("sv_rid")).toBe(null);
              expect(window.localStorage.getItem("sv_token")).toBe(null);

     })

     it('should send local data to server for chek authority and get a login successful result', function  () {
        var url ='authorize/';
        var respond = {
                          'result': '0',
                          'rid': '3',
                          'uid': '2',
                          'token': 'sdfkdkqikdkkqe',
                          'error_msg': 'pasword'}
        var authData = {'rid': window.localStorage.getItem("sv_rid"),
                        'uid': window.localStorage.getItem("sv_uid")
                        }    
             $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/authorize/', authData).respond(201, respond);

              loginService.post(authData, url);
              $httpBackend.flush();

              loginCtrl.submit();
              loginCtrl.checkAuth();
              expect(window.localStorage.getItem("sv_uid") !== null).toBe(true);
              expect(loginCtrl.checkAuth().authData.rid).toBe('3');
              expect(loginCtrl.checkAuth().authData.uid).toBe('2');
              expect(loginCtrl.checkAuth().result).toBe('0');

     })

    it('should send local data to server for chek authority and get a login fail result', function  () {
        var url ='authorize/';
        var respond = {
                          'result': '1',
                          'rid': '3',
                          'uid': '2',
                          'token': 'sdfkdkqikdkkqe',
                          'error_msg': 'authority check fail'}
        var authData = {'rid': window.localStorage.getItem("sv_rid"),
                        'uid': window.localStorage.getItem("sv_uid")
                        }    
             $httpBackend.expectPOST('http://chanmao.ca/?r=%20rrclient/authorize/', authData).respond(201, respond);

              loginService.post(authData, url);
              $httpBackend.flush();

              loginCtrl.submit();
              loginCtrl.checkAuth();
              expect(window.localStorage.getItem("sv_uid") !== null).toBe(true);
              expect(loginCtrl.checkAuth().authData.rid).toBe('3');
              expect(loginCtrl.checkAuth().authData.uid).toBe('2');
              expect(loginCtrl.checkAuth().result).toBe('1');
              expect(loginCtrl.checkAuth().error_msg).toBe('authority check fail');

     })
      
})