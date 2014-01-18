'use strict';

/* Filters */

App.Filters = angular.module('App.Filters', []);
		
App.Filters.filter('interpolate', ['version', function(version) {
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	};
}]);
