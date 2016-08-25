angular.module('com.gdn.mta.app.resetpassword',[
	'com.gdn.mta.controller.resetpassword',
    'com.gdn.mta.service.resetpassword',            
    'com.gdn.mta.directive.header',
    'com.gdn.mta.service.header',
    'com.mta.gdn.controller.header']).config([ '$httpProvider', function($httpProvider) {
    	$httpProvider.interceptors.push('sessionInvalidInterceptor');
    } ]);