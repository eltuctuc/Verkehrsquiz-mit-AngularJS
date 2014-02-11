'use strict';

App.Controllers = angular.module('App.Controllers', []);

/**
 * MainCtrl
 */
App.Controllers.controller('MainCtrl', [
	'$scope', '$log', '$timeout', '$location',
	function($scope, $log, $timeout, $location) {
		$log.log('Main started');
		
		$scope.gotoQuiz = function () {
			$location.path('/quiz');
		};
	}
]);


/**
 * QuizCtrl
 */
App.Controllers.controller('QuizCtrl', [
	'$scope', '$log', '$timeout', '$location', 'QuizStorage', 'QuizResult',
	function($scope, $log, $timeout, $location, QuizStorage, QuizResult) {
		$log.log('Quiz started');
		
		$scope.choose = null;
		$scope.currentQuestion = 0;
		$scope.totalQuestion = 0;
		$scope.percentQuestion = 0;
		$scope.list = [];
		
		$scope.init = function () {
			QuizResult.clear();
			
			$scope.choose = null;
			$scope.currentQuestion = 0;
			$scope.percentQuestion = 0;
			
			$scope.quiz = QuizStorage.load();
			$scope.totalQuestion =	$scope.quiz.length;
			$scope.overlayView = false;
			$scope.overlayColor = null;
			
			for (var i=0; i<20; i++) {
				var rnd = Math.floor(Math.random() * $scope.quiz.length);
				
				$scope.list.push($scope.quiz[rnd]);
				$scope.quiz.splice(rnd,1);
			}
			$scope.totalQuestion =	$scope.list.length;
			
			$scope.getChoose();
		},
		
		$scope.getChoose = function () {
			var rnd = Math.floor(Math.random() * $scope.list.length);
			
			$scope.choose = $scope.list[rnd];
			
			$scope.list.splice(rnd,1);
			$scope.currentQuestion = ($scope.totalQuestion) - $scope.list.length;
			$scope.percentQuestion = $scope.currentQuestion * 100 / $scope.totalQuestion;
			$log.log($scope.currentQuestion, $scope.totalQuestion, $scope.list.length);
			
			$scope.overlayView = false;
		};
		
		$scope.init();
		
		
		$scope.checkAnswer = function (val) {
			
			$scope.overlayView = true;
			
			if(val == $scope.choose.solution) {
				$scope.choose.answer = true;
				$scope.overlayColor = 'overlayTrue';
			} else {
				$scope.choose.answer = false;
				$scope.overlayColor = 'overlayFalse';
			}
			QuizResult.add($scope.choose);
			
			$timeout(function () {
				if($scope.list.length === 0) {
					$location.path('/result');
				} else {
					$scope.getChoose();
				}
			}, 1000);
		};
		
		$scope.reload = function () {
			$scope.init();
		};
		
		$scope.gotoStart = function () {
			$location.path('/');
		};
		
		/**
		 * deprecated
		 * @returns {undefined}
		 */
		$scope.clickRandom = function () {
			$scope.getChoose();
		};
	}
]);


/**
 * ResultCtrl
 */
App.Controllers.controller('ResultCtrl', [
	'$scope', '$log', '$location', 'QuizResult',
	function($scope, $log, $location, QuizResult) {
		$log.log('Result started');
		
		$scope.results = QuizResult.get();
		
		if($scope.results.length === 0) {
			$location.path('/quiz');
		}
		
		$log.log($scope.results);
		
		$scope.getColor = function (answer) {
			if(answer)
				return 'list-group-item-success';
			
			return 'list-group-item-danger';
		};
		
		$scope.getTotalAnswer = function () {
			return $scope.results.length;
		};
		
		$scope.getRightAnswer = function () {
			var value = 0;
			var resultLength = $scope.results.length;
			for(var i=0; i<resultLength; i++) {
				$log.log($scope.results[i]);
				if ($scope.results[i].answer) {
					value++;
				}
			}
			
			return value;
		};
		
		$scope.gotoMain = function () {
			$location.path('/');
		};
		
		$scope.gotoQuiz = function () {
			$location.path('/quiz');
		};
	}
]);

/**
 * AdminCtrl
 */
App.Controllers.controller('AdminCtrl', [
	'$scope', '$log','$rootScope',
	function($scope, $log, $rootScope) {
		
		$scope.output2 = 'Hello World';
		$log.log($scope.output2);
		
		$rootScope.showOutput('helloworld');
	}
]);