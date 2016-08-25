angular.module('com.gdn.mta.service.dashboard', [ 'ngResource' ]);
angular.module('com.gdn.mta.service.dashboard').factory(
	'getEmptyProductsService', [ '$resource', function($resource) {
	    return $resource('empty-products-size', {}, {
		get : {
		    method : 'GET'
		}
	    });
	} ]);
angular.module('com.gdn.mta.service.dashboard').factory('getSizeOrdersService',
	[ '$resource', function($resource) {
	    return $resource('orders-size', {}, {
		get : {
		    method : 'GET',
		    params : {
			'orderStatus' : '@orderStatus'
		    }
		}
	    });
	} ]);
angular.module('com.gdn.mta.service.dashboard').factory('getSizeRetursService',
	[ '$resource', function($resource) {
	    return $resource('returs-size', {}, {
		get : {
		    method : 'GET',
		    params : {
			'returStatus' : '@returStatus'
		    }
		}
	    })
	} ]);
angular.module('com.gdn.mta.service.dashboard').factory(
	'getPerformanceProductsService', [ '$resource', function($resource) {
	    return $resource('product-performance-list', {}, {
		get : {
		    method : 'GET',
		    params : {
			'orderStatus' : '@orderStatus',
			'startDate' : '@startDate',
			'endDate' : '@endDate'
		    }
		}
	    })
	} ]);
angular.module('com.gdn.mta.service.dashboard').factory('orderPerformanceService', [ '$resource', function($resource) {
	return $resource('order-performance', {}, {
		get : {
			method : 'GET'
		}
	});
} ]);
angular.module('com.gdn.mta.service.dashboard').factory('salesOrderPerformanceService', ['$resource', function($resource){
	return $resource('sales-order-performance', {},{
		get : {
			method : 'GET',
			params : {
				'startDate' : '@startDate',
				'endDate' : '@endDate'
			}
		}
	});
}]);
angular.module('com.gdn.mta.service.dashboard').factory('productGlobalInformationService', ['$resource', function($resource){
	return $resource('product-global-information', {}, {
		get: {
			method : 'GET'
		}
	});
}]);
angular.module('com.gdn.mta.service.dashboard').factory('getBusinessPartnerByLoginService',
		[ '$resource', function($resource) {
			return $resource(contextPath + '/businesspartner/get-business-partner-by-login', 
			{}, 
			{
				get : {
					method 	: 'GET'
				}
			})
		} ]);
