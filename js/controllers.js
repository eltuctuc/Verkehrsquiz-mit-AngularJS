'use strict';

App.Controllers = angular.module('App.Controllers', []);

/**
 * MainCtrl
 */
App.Controllers.controller('MainCtrl', [
	'$scope', '$log', '$timeout', '$location', '$rootScope',
	function($scope, $log, $timeout, $location, $rootScope) {
		$log.log('Main started');
		
		$scope.gotoQuiz = function ($event) {
			//$log.log($event);
			
			var e = $event;
			if(e.altKey && e.ctrlKey && e.shiftKey) {
				$rootScope.autoplay = true;
			}
			$location.path('/quiz');
		};
	}
]);


/**
 * QuizCtrl
 */
App.Controllers.controller('QuizCtrl', [
	'$scope', '$rootScope', '$log', '$timeout', '$location', 'QuizStorage', 'QuizResult', 'autoplayClick',
	function($scope, $rootScope, $log, $timeout, $location, QuizStorage, QuizResult, autoplayClick) {
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
			$scope.totalQuestion =	$scope.list.length;
			$scope.overlayView = false;
			$scope.overlayColor = null;
			
			for (var i=0; i<20; i++) {
				var rnd = Math.floor(Math.random() * $scope.list.length);
				
				$scope.list.push($scope.quiz[rnd]);
				$scope.quiz.splice(rnd,1);
			}
			$scope.totalQuestion =	$scope.list.length;
			
			$scope.getChoose();
		},
		
		$scope.getChoose = function () {
			$log.log('getChoose');
			var rnd = Math.floor(Math.random() * $scope.list.length);
			
			$scope.choose = $scope.list[rnd];
			
			$scope.list.splice(rnd,1);
			$scope.currentQuestion = ($scope.totalQuestion) - $scope.list.length;
			$scope.percentQuestion = $scope.currentQuestion * 100 / $scope.totalQuestion;
			$log.log($scope.currentQuestion, $scope.totalQuestion, $scope.list.length);
			
			$scope.overlayView = false;
			
			if($rootScope.autoplay) {
				$timeout(function () {
					var rnd = Math.round(Math.random());
					var  ele = null;
					if(rnd < 1) {
						angular.element(document.getElementById('ttAnswerNo')).css('opacity',1);
						ele = angular.element(document.getElementById('btnAnswerNo'));
					} else {
						angular.element(document.getElementById('ttAnswerYes')).css('opacity',1);
						ele = angular.element(document.getElementById('btnAnswerYes'));
					};
					
					$timeout(function () {
						if(ele) {
							ele.triggerHandler('click');
						}
						angular.element(document.getElementById('ttAnswerNo')).css('opacity',0);
						angular.element(document.getElementById('ttAnswerYes')).css('opacity',0);
					}, 2000);
				}, 8000);
			}
		};
		
		$scope.init();
		
		
		$scope.checkAnswer = function ($event, val) {
			$log.log('checkAnswer', $event);
			
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
	'$scope', '$rootScope', '$log', '$location', '$timeout', 'QuizResult',
	function($scope, $rootScope, $log, $location, $timeout, QuizResult) {
		$log.log('Result started');
		
		/*QuizResult.add(
			{"uuid" : "32e4a36e" , "question" : "Bedeutet dieses Handzeichen freie Fahrt?", "solution" : 0, "image" : "32e4a36e.png", "answer": true}
		);
		QuizResult.add(
			{"uuid" : "7e4a59cf" , "question" : "Bedeutet dieses Lichtzeichen anhalten?", "solution" : 0, "image" : "7e4a59cf.png", "answer": false}
		);
		QuizResult.add(
			{"uuid" : "7f1ccf18" , "question" : "Darfst du als Fußgänger diese Straße benutzen?", "solution" : 0, "image" : "7f1ccf18.png", "answer": true}
		);*/
		
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
			
		};
			
		if($rootScope.autoplay) {
			$timeout(function () {
				$location.path('/quiz');
			}, 10000);
		}
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