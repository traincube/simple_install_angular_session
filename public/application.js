var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, []);

angular.element(document).ready(function(){             //using angular object jqLite to bind function to document ready event
    angular.bootstrap(document, [mainApplicationModuleName]);
});