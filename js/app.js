angular.module('app', ['ui.grid'])



.controller('MainCtrl', ['$scope', '$filter',
    function($scope, $filter) {

      var vm = this;
      // $scope.opts = '';
      $scope.prompts = txtPrompts;

      vm.gridOptions = {};
  
      $scope.searchGrid = function() {
        console.log(gridData.length);
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
              // debugger;
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