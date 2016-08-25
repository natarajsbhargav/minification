angular.module('com.gdn.mta.controller.dashboard', []);
angular.module('com.gdn.mta.controller.dashboard').controller(
    'getNotificationsController',
    [ '$scope', 'getEmptyProductsService', 'getLoadingService',
        function($scope, getEmptyProductsService, getLoadingService) {

	        $scope.initialize = function() {
		        $scope.emptyProductsSize = 0;
		        $scope.totalNotifications = 0;
	        }

	        $scope.getProductsByRefresh = function() {
		        getLoadingService.increase();
		        $scope.initialize();
		        getEmptyProductsService.get({}, function(response) {
			        $scope.emptyProductsSize = response.content;
			        $scope.totalNotifications += $scope.emptyProductsSize;
			        getLoadingService.decrease();
		        }, function(response) {
			        getLoadingService.decrease();
		        });
	        }

	        $scope.getProductsByRefresh();

        } ]);
angular.module('com.gdn.mta.controller.dashboard').controller(
    'getTodayOrdersOverviewController2',
    [
        '$scope',
        'getSizeOrdersService',
        'getSizeRetursService',
        'orderPerformanceService',
        'getLoadingService',
        'salesOrderPerformanceService',
        'getBusinessPartnerByLoginService',
        function($scope, getSizeOrdersService, getSizeRetursService, orderPerformanceService, getLoadingService,
            salesOrderPerformanceService, getBusinessPartnerByLoginService) {

	        convertDate = function(date) {
		        day = date.getDate();
		        month = date.getMonth() + 1;
		        if (day < 10) {
			        day = '0' + day;
		        }
		        if (month < 10) {
			        month = '0' + month;
		        }
		        return (date.getFullYear() + '-' + month + '-' + day);
	        }

	        // Data source
	        $scope.getOrderPerformance = function() {
		        getLoadingService.increase();
		        orderPerformanceService.get({}, function(response) {
			        if (response.success) {
				        $scope.prepareOrderPerformance(response.content);
			        } else {
				        alert('Masalah Load Data. Silahkan refresh halaman ini. Pesan kesalahan : ' + response.errorMessage);
			        }
			        getLoadingService.decrease();
		        }, function(response) {
			        alert('Masalah Load Data. Silahkan refresh halaman ini.');
			        getLoadingService.decrease();
		        });
	        }

	        $scope.getReturPerformance = function() {
		        getLoadingService.increase();
		        getSizeRetursService.get({
			        'returStatus' : 'B'
		        }, function(response) {
			        $scope.returStatusBSize = response.content;
			        getLoadingService.decrease();
		        }, function(response) {
			        getLoadingService.decrease();
		        });
	        }

	        $scope.salesOrderPerformanceService = function(startDate, endDate) {
		        getLoadingService.increase();
		        salesOrderPerformanceService.get({
		          'startDate' : startDate,
		          'endDate' : endDate
		        }, function(response) {
			        $scope.salesOrderPerformance = response.content;
			        getLoadingService.decrease();
		        }, function(response) {
			        getLoadingService.decrease();
		        });
	        }

	        // General function
	        $scope.prepareOrderPerformance = function(orderPerformances) {
		        for (i = 0; i < orderPerformances.length; i++) {
			        if (orderPerformances[i].orderStatus == 'FP') {
				        $scope.orderStatusFPSize += orderPerformances[i].totalOrder;
				        $scope.notification += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'ES' || orderPerformances[i].orderStatus == 'BP') {
				        $scope.orderStatusESSize += orderPerformances[i].totalOrder;
				        $scope.notification += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'OS') {
				        $scope.orderStatusOOSSize += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'X') {
				        $scope.orderStatusXSize += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'D') {
				        $scope.orderStatusDSize += orderPerformances[i].totalOrder;
			        }
		        }
	        }

	        $scope.initialize = function() {
		        $scope.orderStatusFPSize = 0;
		        $scope.orderStatusESSize = 0;
		        $scope.orderStatusOOSSize = 0;
		        $scope.orderStatusXSize = 0;
		        $scope.returStatusBSize = 0;
		        $scope.orderStatusDSize = 0;
		        $scope.notification = 0;
		        $scope.salesOrderPerformance = {
		          totalOrder : 0,
		          totalSales : 0
		        }
	        }

	        $scope.getOrdersByRefresh = function() {
		        $scope.initialize();
		        $scope.getOrderPerformance();
		        $scope.getReturPerformance();

		        today = new Date();
		        tomorrow = new Date();
		        tomorrow.setDate(today.getDate() + 1);
		        tomorrow = convertDate(tomorrow);
		        $scope.salesOrderPerformanceService('2010-01-01', tomorrow);
	        }
	        
	        $scope.getBusinessPartnerByLogin = function() {
	        	$scope.val = {};
	        	$scope.val.isBlibli2 = true;
	        	getBusinessPartnerByLoginService.get({},
	        	function(response){
	        		if (response.success) {
	        			var businessPartnerName = response.content.company.businessPartnerName;
	        			if (!businessPartnerName.match(/blibli/i)) {
	        				$scope.val.isBlibli2 = false;
	        			}
	        		}
	        	},
	        	function(response){
	        	});
	        }

	        $scope.getOrdersByRefresh();
	        $scope.getBusinessPartnerByLogin();

        } ]);
angular.module('com.gdn.mta.controller.dashboard').controller(
    'getTodayOrdersOverviewController',
    [ '$scope', 'getSizeOrdersService', 'getSizeRetursService', 'orderPerformanceService', 'getLoadingService',
        function($scope, getSizeOrdersService, getSizeRetursService, orderPerformanceService, getLoadingService) {

	        // Data source
	        $scope.getOrderPerformance = function() {
		        getLoadingService.increase();
		        orderPerformanceService.get({}, function(response) {
			        if (response.success) {
				        $scope.prepareOrderPerformance(response.content);
			        } else {
				        alert('Masalah Load Data. Silahkan refresh halaman ini. Pesan kesalahan : ' + response.errorMessage);
			        }
			        getLoadingService.decrease();
		        }, function(response) {
			        alert('Masalah Load Data. Silahkan refresh halaman ini.');
			        getLoadingService.decrease();
		        });
	        }

	        $scope.getReturPerformance = function() {
		        getLoadingService.increase();
		        getSizeRetursService.get({
			        'returStatus' : 'B'
		        }, function(response) {
			        $scope.returStatusBSize = response.content;
			        getLoadingService.decrease();
		        }, function(response) {
			        getLoadingService.decrease();
		        });
	        }

	        // General function
	        $scope.prepareOrderPerformance = function(orderPerformances) {
		        for (i = 0; i < orderPerformances.length; i++) {
			        if (orderPerformances[i].orderStatus == 'FP') {
				        $scope.orderStatusFPSize += orderPerformances[i].totalOrder;
				        $scope.notification += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'ES' || orderPerformances[i].orderStatus == 'BP') {
				        $scope.orderStatusESSize += orderPerformances[i].totalOrder;
				        $scope.notification += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'OS') {
				        $scope.orderStatusOOSSize += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'X') {
				        $scope.orderStatusXSize += orderPerformances[i].totalOrder;
			        } else if (orderPerformances[i].orderStatus == 'D') {
				        $scope.orderStatusDSize += orderPerformances[i].totalOrder;
			        }
		        }
	        }

	        $scope.initialize = function() {
		        $scope.orderStatusFPSize = 0;
		        $scope.orderStatusESSize = 0;
		        $scope.orderStatusOOSSize = 0;
		        $scope.orderStatusXSize = 0;
		        $scope.returStatusBSize = 0;
		        $scope.orderStatusDSize = 0;
		        $scope.notification = 0;
	        }

	        $scope.getOrdersByRefresh = function() {
		        $scope.initialize();
		        $scope.getOrderPerformance();
		        $scope.getReturPerformance();
	        }

	        $scope.getOrdersByRefresh();

        } ]);
angular.module('com.gdn.mta.controller.dashboard').controller(
    'salesOrderPerformanceController',
    [ '$scope', 'getLoadingService', 'salesOrderPerformanceService', 'getBusinessPartnerByLoginService',
        function($scope, getLoadingService, salesOrderPerformanceService, getBusinessPartnerByLoginService) {

	        $scope.salesOrderPerformanceToday = '';
	        $scope.salesOrderPerformanceLast7Days = '';
	        $scope.salesOrderPerformanceLast30Days = '';

	        convertDate = function(date) {
		        day = date.getDate();
		        month = date.getMonth() + 1;
		        if (day < 10) {
			        day = '0' + day;
		        }
		        if (month < 10) {
			        month = '0' + month;
		        }
		        return (date.getFullYear() + '-' + month + '-' + day);
	        }

	        $scope.salesOrderPerformanceService = function(key, startDate, endDate) {
		        getLoadingService.increase();
		        salesOrderPerformanceService.get({
		          'startDate' : startDate,
		          'endDate' : endDate
		        }, function(response) {
			        if (key == 'today') {
				        $scope.salesOrderPerformanceToday = response.content;
			        } else if (key == 'last7days') {
				        $scope.salesOrderPerformanceLast7Days = response.content;
			        } else if (key == 'last30days') {
				        $scope.salesOrderPerformanceLast30Days = response.content;
			        }
			        console.log($scope.salesOrderPerformanceToday);
			        getLoadingService.decrease();
		        }, function(response) {
			        getLoadingService.decrease();
		        });
	        }

	        $scope.salesOrderPerformanceRefresh = function() {
		        today = new Date();
		        tomorrow = new Date();
		        tomorrow.setDate(today.getDate() + 1);
		        last7days = new Date();
		        last7days.setDate(today.getDate() - 7);
		        last30days = new Date();
		        last30days.setDate(today.getDate() - 30);
		        today = convertDate(today);
		        tomorrow = convertDate(tomorrow);
		        last7days = convertDate(last7days);
		        last30days = convertDate(last30days);

		        $scope.salesOrderPerformanceService('today', today, tomorrow);
		        $scope.salesOrderPerformanceService('last7days', last7days, tomorrow);
		        $scope.salesOrderPerformanceService('last30days', last30days, tomorrow);
	        }
	        
	        $scope.getBusinessPartnerByLogin = function() {
	        	$scope.val = {};
	        	$scope.val.isBlibli = true;
	        	getBusinessPartnerByLoginService.get({},
	        	function(response){
	        		if (response.success) {
	        			var businessPartnerName = response.content.company.businessPartnerName;
	        			if (!businessPartnerName.match(/blibli/i)) {
	        				$scope.val.isBlibli = false;
	        			}
	        		}
	        	},
	        	function(response){
	        	});
	        }

	        $scope.salesOrderPerformanceRefresh();
	        $scope.getBusinessPartnerByLogin();

        } ]);
angular.module('com.gdn.mta.controller.dashboard').controller(
    'getPerformanceProductsController',
    [ '$scope', 'getPerformanceProductsService', 'getLoadingService', 'productGlobalInformationService', 
      	'getBusinessPartnerByLoginService',
        function($scope, getPerformanceProductsService, getLoadingService, productGlobalInformationService,
        		getBusinessPartnerByLoginService) {
	        $scope.initialize = function() {
		        $scope.performanceProducts = null;
		        $scope.position = 'recentOrders';
		        $scope.startDate = '';
		        $scope.endDate = '';
		        $scope.group = 'all';
		        $scope.productGlobalInformationService();
	        }

	        $scope.productGlobalInformationService = function() {
		        getLoadingService.increase();
		        productGlobalInformationService.get({}, function(response) {
			        $scope.productGlobalInformation = response.content;
			        getLoadingService.decrease();
		        }, function(response) {
			        getLoadingService.decrease();
		        });
	        }

	        $scope.getPerformanceProductsByRefresh = function() {
		        getLoadingService.increase();
		        $scope.initialize();
		        getPerformanceProductsService.get({
			        'orderStatus' : 'FP'
		        }, function(response) {
			        $scope.performanceProducts = response.content;
			        getLoadingService.decrease();
		        }, function(response) {
			        getLoadingService.decrease();
		        });
	        }

	        $scope.getPerformanceProductsByRecent = function() {
		        if ($scope.position != 'recentOrders') {
			        getLoadingService.increase();
			        $scope.position = 'recentOrders';
			        getPerformanceProductsService.get({
			          'orderStatus' : 'FP',
			          'startDate' : $scope.startDate,
			          'endDate' : $scope.endDate
			        }, function(response) {
				        $scope.performanceProducts = response.content;
				        getLoadingService.decrease();
			        }, function(response) {
				        getLoadingService.decrease();
			        });
		        }
	        }

	        $scope.getPerformanceProductsByOrderStatus = function(orderStatus) {
		        if ($scope.position != orderStatus + 'Orders') {
			        getLoadingService.increase();
			        $scope.position = orderStatus + 'Orders';
			        getPerformanceProductsService.get({
			          'orderStatus' : orderStatus,
			          'startDate' : $scope.startDate,
			          'endDate' : $scope.endDate
			        }, function(response) {
				        $scope.performanceProducts = response.content;
				        getLoadingService.decrease();
			        }, function(response) {
				        getLoadingService.decrease();
			        });
		        }
	        }

	        $scope.getPerformanceProductsByGroup = function(group) {
		        if ($scope.group != group) {
			        getLoadingService.increase();
			        $scope.group = group;
			        currentDate = new Date();
			        if (group == 'all') {
				        $scope.startDate = '';
				        $scope.endDate = '';
			        } else if (group == 'day') {
				        startMonth = (currentDate.getMonth() + 1);
				        startDate = currentDate.getDate();
				        endDate = currentDate.getDate() + 1;
				        if (startMonth < 10) {
					        startMonth = '0' + startMonth;
				        }
				        if (startDate < 10) {
					        startDate = '0' + startDate;
				        }
				        if (endDate < 10) {
					        endDate = '0' + endDate;
				        }
				        $scope.startDate = currentDate.getFullYear() + '-' + startMonth + '-' + startDate;
				        $scope.endDate = currentDate.getFullYear() + '-' + startMonth + '-' + endDate;
			        } else if (group == 'month') {
				        nextYear = currentDate.getFullYear();
				        if (currentDate.getMonth() + 2 > 12) {
					        nextYear++;
				        }
				        startMonth = ((currentDate.getMonth() % 12) + 1);
				        endMonth = (((currentDate.getMonth() + 1) % 12) + 1);
				        if (startMonth < 10) {
					        startMonth = '0' + startMonth;
				        }
				        if (endMonth < 10) {
					        endMonth = '0' + endMonth;
				        }
				        $scope.startDate = currentDate.getFullYear() + '-' + startMonth + '-01';
				        $scope.endDate = nextYear + '-' + endMonth + '-01';
			        } else if (group == 'year') {
				        $scope.startDate = currentDate.getFullYear() + '-01-01';
				        $scope.endDate = (currentDate.getFullYear() + 1) + '-01-01';
			        }
			        if ($scope.position == 'recentOrders') {
				        getPerformanceProductsService.get({
				          'orderStatus' : 'FP',
				          'startDate' : $scope.startDate,
				          'endDate' : $scope.endDate
				        }, function(response) {
					        $scope.performanceProducts = response.content;
					        getLoadingService.decrease();
				        }, function(response) {
					        getLoadingService.decrease();
				        });
			        } else {
				        orderStatus = $scope.position.replace('Orders', '');
				        getPerformanceProductsService.get({
				          'orderStatus' : orderStatus,
				          'startDate' : $scope.startDate,
				          'endDate' : $scope.endDate
				        }, function(response) {
					        $scope.performanceProducts = response.content;
					        getLoadingService.decrease();
				        }, function(response) {
					        getLoadingService.decrease();
				        });
			        }
		        }
	        }

	        $scope.getPerformanceProductsByGroupAndDate = function() {
		        if ($scope.startDate != '' && $scope.endDate != '') {
			        getLoadingService.increase();
			        if ($scope.position == 'recentOrders') {
				        getPerformanceProductsService.get({
				          'orderStatus' : 'FP',
				          'startDate' : $scope.startDate,
				          'endDate' : $scope.endDate
				        }, function(response) {
					        $scope.performanceProducts = response.content;
					        getLoadingService.decrease();
				        }, function(response) {
					        getLoadingService.decrease();
				        });
			        } else {
				        orderStatus = $scope.position.replace('Orders', '');
				        getPerformanceProductsService.get({
				          'orderStatus' : orderStatus,
				          'startDate' : $scope.startDate,
				          'endDate' : $scope.endDate
				        }, function(response) {
					        $scope.performanceProducts = response.content;
					        getLoadingService.decrease();
				        }, function(response) {
					        getLoadingService.decrease();
				        });
			        }
		        }
	        }
	        
	        $scope.getPerformanceProductsByRefresh();

        } ]);
angular.module('com.gdn.mta.controller.dashboard').controller(
    'getDashboardController',
    [ '$scope', 'getUserSessionService', 'getLoadingService',
        function($scope, getUserSessionService, getLoadingService) {
	        $scope.userSession = [];
	        $scope.accessNodeList = [];
	        $scope.getUserLoginInformation = function() {
		        getUserSessionService.get({
			        'contextPath' : appContextPath
		        }, function(response) {
			        if (response.success) {
				        $scope.userSession = response.content;
				        $scope.accessNodeList = $scope.userSession.accessNodeList;
			        } else
				        swal("Error", response.errorMessage, "error");
		        }, function(response) {
			        swal("Error", response.status + " " + response.statusText, "error");
		        });
	        }
        } ]);
