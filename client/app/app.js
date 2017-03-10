'use strict';

angular.module('tiendaApp', [
  'tiendaApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'md.data.table'
])
  .config(function($urlRouterProvider, $locationProvider,$mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    


    /*$mdThemingProvider.definePalette('amazingPaletteName', {
      '50': 'fff3e0',
      '100': 'ffe0b2',
      '200': 'ffcc80',
      '300': 'ffb74d',
      '400': 'ffa726',
      '500': 'ff9800',
      '600': 'fb8c00',
      '700': 'f57c00',
      '800': 'yellow',
      '900': 'e65100',
      'A100': 'ffd180',
      'A200': 'ffab40',
      'A400': 'ff9100',
      'A700': 'ff6d00',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });*/

    $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('green');
    
  });
