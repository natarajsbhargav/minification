angular.module('com.gdn.mta.app.dashboard', [
	'com.gdn.mta.controller.dashboard', 'com.gdn.mta.service.dashboard',
	'com.mta.gdn.controller.header', 'com.gdn.mta.service.header',
	'com.gdn.mta.directive.header', 'ui.bootstrap' ]).config([ '$httpProvider', function($httpProvider) {
  	$httpProvider.interceptors.push('sessionInvalidInterceptor');
  } ]);