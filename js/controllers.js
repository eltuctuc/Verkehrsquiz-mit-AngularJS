'use strict';

App.Controllers = angular.module('App.Controllers', []);

/**
 * MainCtrl
 */
App.Controllers.controller('MainCtrl', [
	'$scope', '$log', '$timeout', 'QuizStorage',
	function($scope, $log, $timeout, QuizStorage) {
		$log.log('Quiz started');
		
		$scope.quiz = QuizStorage.load();
		$scope.result = 'panel-default';
		$scope.choose = null;
		$scope.isAnswer =false;
		$scope.answerSvg = null;
		
		$scope.getChoose = function () {
			//$log.log($scope.quiz);
			var rnd = Math.floor(Math.random() * $scope.quiz.length);
			
			//$log.log(rnd);
			
			$scope.choose = $scope.quiz[rnd];
			//$log.log($scope.choose);
			
			$scope.result = 'panel-default';
		};
		
		$scope.getChoose();
		$scope.isDisabled = false;
		
		$scope.checkAnswer = function (val) {
			
			$scope.isDisabled = true;
			$scope.isAnswer = true;
			
			if(val == $scope.choose.solution) {
				$scope.answerSvg = 'right.svg';
				$scope.result = 'panel-success';
			} else {
				$scope.answerSvg = 'wrong.svg';
				$scope.result = 'panel-danger';
			}
			
			$timeout(function () {
				$scope.getChoose();
				$scope.isDisabled = false;
				$scope.isAnswer = false;
				$scope.answerSvg = null;
			}, 5000);
		};
		
		$scope.clickRandom = function () {
			
			$scope.getChoose();
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