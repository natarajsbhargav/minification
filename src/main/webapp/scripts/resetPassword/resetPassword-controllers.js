angular.module('com.gdn.mta.controller.resetpassword', []);
angular.module('com.gdn.mta.controller.resetpassword')
	.controller(
		'getNewPasswordController',
		[
		 	'$scope',
			'$location',
			'getLoadingService',
			'submitNewPassword',
			function ($scope, $location, getLoadingService, submitNewPassword) {
		 		$scope.submitPassword = function (userName, newPassword, confirmationPassword) {
		 			getLoadingService.increase();
		 			submitNewPassword.post({
		 				'userName' : userName,
		 				'newPassword' : newPassword,
		 				'confirmationPassword' : confirmationPassword
		 			}, function (response) {
		 				if (response.success) {
		 					swal({
				              title : 'Berhasil',
				              text : 'Anda berhasil merubah password',
				              type : 'success'
				            }, function() {
				            	pathname = window.location.pathname;
					            pathnameSplit = pathname.split('/');
					            href = window.location.href;
					            console.log(pathname);
					            window.location = href.replace(pathname, '/' + pathnameSplit[1] + '/login/');
				            });
		 				} else {
		 					swal("Gagal", "Terjadi kesalahan : " + response.errorMessage, "error");
		 				}
		 				getLoadingService.decrease();
		 			}, function (response) {
		 				getLoadingService.decrease();
		 			});
		 		}
		 		
		 		$scope.clickSubmitPassword = function () {
		 			if ($scope.password == null || $scope.password == undefined) {
		 				swal("Gagal", "Password harus diisi", "error");
		 				return false;
		 			} else if ($scope.passwordConfirmation == null || $scope.passwordConfirmation == undefined) {
		 				swal("Gagal", "Konfirmasi password harus diisi", "error");		
		 				return false;
		 			} else {
		 				if ($scope.password != $scope.passwordConfirmation) {
		 					swal("Gagal", "Password tidak cocok", "error");
		 					return false;
		 				} else {
		 					$scope.submitPassword($scope.userName, $scope.password, $scope.passwordConfirmation);
		 				}
		 			}
		 		}
		 		
		 	}		 
		]);