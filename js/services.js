'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
App.Services = angular.module('App.Services', []);

App.Services.value('appVersion', '0.0.1');

App.Services.factory('versionControll', ['$log', function($log) {
	return function(v) {
		//$log.log(v);
		
		v = v.split('.');
		//$log.log(v);
		
		var major = parseInt(v[0]);
		var minor = parseInt(v[1]);
		var build = parseInt(v[2]);
		
		//$log.log(major, minor,build);
		
		var version = {
			major: major || 0,
			minor: minor || 0,
			build: build || 0
		};
		
		return version;
	};
}]);

App.Services.factory('notify', ['$window', function(win) {
	var msgs = [];
	return function(msg) {
		msgs.push(msg);
		if (msgs.length === 3) {
			win.alert(msgs.join("\n"));
			msgs = [];
		}
	};
}]);

App.Services.factory('loadJSON', ['$http', function(http) {
	return {
		get : function (url, fn) {
			http.get(url).success(fn);
		}
	}; 
}]);

App.Services.service('QuizStorage', [function() {
	return {
		load : function () {
			var result = window.localStorage.getItem('quiz');
			if(result) {
				result = JSON.parse(result);
				return result;
			} else {
				return null;
			}
		},
		save : function (value) {
			var result = JSON.stringify(value);
			
			window.localStorage.setItem('quiz', result);
			
			return this;
		}
	};
}]);

App.Services.factory('QuizResult', ['$log', function ($log) {
	var results = [];
	return {
		add : function (v) {
			results.push(v);
		},
		
		get : function () {
			return results;
		},
		
		clear : function () {
			results = [];
		}
	};
}]);

App.Services.service('VersionStorage', [function() {
	return {
		load : function () {
			var result = window.localStorage.getItem('version');
			if(result) {
				result = JSON.parse(result);
				return result;
			} else {
				return null;
			}
		},
		save : function (value) {
			var result = JSON.stringify(value);
			
			window.localStorage.setItem('version', result);
			
			return this;
		}
	};
}]);