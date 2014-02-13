'use strict';

var App = angular.module('App', [
  'ngRoute',
  'App.Controllers',
  'App.Directives',
  'App.Services',
  'App.Filters'
]);

App.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {templateUrl: 'views/main.html', controller: 'MainCtrl'}).
		when('/quiz', {templateUrl: 'views/quiz.html', controller: 'QuizCtrl'}).
		when('/result', {templateUrl: 'views/result.html', controller: 'ResultCtrl'}).
		when('/admin', {templateUrl: 'views/admin.html', controller: 'AdminCtrl'}).
		otherwise({redirectTo: '/'});
}]);

App.run([
	'$rootScope', '$log', 'appVersion', 'loadJSON', 'QuizStorage', 'VersionStorage', 'versionControl', 
	function($rootScope, $log, appVersion, loadJSON, QuizStorage, VersionStorage, versionControl) {

		$log.log('App started', angular.version.full);

		var version = versionControl(appVersion);
		
		//$log.log(version);
		
		var oldVersion, newVersion, loadUpdate = false;
				
		oldVersion = VersionStorage.load();
		if (oldVersion) {
			oldVersion = versionControl(oldVersion);
		}
		
		/*loadJSON.get('quiz.json', function (data) {
			newVersion = versionControll(data.contentVersion);
			
			if (oldVersion) {
				if (oldVersion.major < newVersion.major) {
					//$log.log('major');
					loadUpdate = true;
				} else if (oldVersion.minor < newVersion.minor) {
					//$log.log('minor');
					loadUpdate = true;
				} else if (oldVersion.build < newVersion.build) {
					//$log.log('build');
					loadUpdate = true;
				}
			} else {
				//$log.log('not Old');
				loadUpdate = true;
			}
			
			var quiz = QuizStorage.load();
			if (!quiz || loadUpdate) {*/
				loadJSON.get('quiz.json', function (data) {
					//$log.log(data);
					
					$log.log(data.quiz.length);
					
					QuizStorage.save(data.quiz);
					VersionStorage.save(data.contentVersion);
					$log.log('New data loaded', newVersion);
				});
			/*}
		});*/
		
		$rootScope.autoplay = false;

		$rootScope.rootOutput = false;
		$rootScope.showOutput = function ( msg ) {
			$rootScope.rootOutput = msg;
		};
	}
]);