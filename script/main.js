//Module
var courseApp = angular.module('courseApp', ['ngRoute', 'ipCookie']);

courseApp.value('user', {
	email:'',
	country:'',
	university:''
});
