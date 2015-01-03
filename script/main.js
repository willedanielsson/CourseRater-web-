//Module
var courseApp = angular.module('courseApp', ['ngRoute']);

courseApp.value('user', {
	email:'',
	country:'',
	university:''
});
