angular.module('com.gdn.mta.service.resetpassword', [ 'ngResource' ]);
angular.module('com.gdn.mta.service.resetpassword').factory('submitNewPassword', [ '$resource', function($resource) {
	return $resource('save', {}, {
		post : {
			method : 'POST',
			data : {
				'userName' : '@userName',
				'newPassword' : '@newPassword',
				'confirmationPassword' : '@confirmationPassword'
			}
		}
	})
} ]);