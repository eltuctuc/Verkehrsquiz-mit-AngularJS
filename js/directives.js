'use strict';

/* Directives */
App.Directives = angular.module('App.Directives', []);

/**
 * App Version
 */
App.Directives.directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);

/**
 * App Output
 */
App.Directives.directive('appOutput', [function() {
	return {
		//template : '<div class="well"><pre>Ausgabe: {{quiz}}</pre></div>',
		templateUrl : 'views/templates/output.html'
	};
}]);
