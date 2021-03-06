angular.module("static-include", []).directive('staticInclude', function($http, $templateCache, $compile) {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    scope:false,
    link: function($scope, element, attrs, ctrl, transclude) {
      var templatePath = attrs.staticInclude;

      try{
      	templatePath = $scope.$eval(templatePath);
      }catch(err){
      	throw new Error(attrs.staticInclude+' is not a valid object');
      }

      $http.get(templatePath, { cache: $templateCache })
      .success(function(response) {
      	var contents = element.html(response).contents();
        $compile(contents)($scope.$parent);
      });
    }
  };
});
