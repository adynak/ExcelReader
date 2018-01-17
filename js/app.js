angular.module('app', ['ui.grid'])



.controller('MainCtrl', ['$scope', '$filter', '$window',
    function($scope, $filter, $window) {

      var vm = this;
      $scope.prompts = txtPrompts;
      $window.document.title = txtPrompts.tabTitle;

      vm.gridOptions = {};
  
      $scope.searchGrid = function() {
        vm.gridOptions.data = $filter('filter')(gridData , $scope.searchText, undefined);
      };

      $scope.showSearch = function(){
        if (typeof(gridData) == 'undefined'){
          return false;
        }
        return true;
      }

    }
  ])

.directive("fileread", [function () {
  return {
    scope: {
      opts: "="
    },
    link: function ($scope, $elm, $attrs) {

      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {

          $scope.$apply(function () {
            var sheetNumber = 1;
            var data = evt.target.result;
            
            var workbook = XLSX.read(data, {type: 'binary'});
            
            var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[sheetNumber]], { header: 1 })[0];
            
            var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[sheetNumber]]);
            gridData = data;            
            
            $scope.opts.columnDefs = [];
            headerNames.forEach(function (h) {
              $scope.opts.columnDefs.push({ field: h, enableColumnMenu: false });
            });

            $scope.opts.data = data;
            $scope.opts.enableSorting = false;
            
            $elm.val(null);
          });
        };

        reader.readAsBinaryString(changeEvent.target.files[0]);
      });

    }
  }
}]);