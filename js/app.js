angular.module('app', ['ui.grid','ui.grid.selection'])



.controller('MainCtrl', ['$scope', '$filter', '$window',
    function($scope, $filter, $window) {

      var vm = this;
      $scope.prompts = txtPrompts;
      $window.document.title = txtPrompts.tabTitle;

      function copyToClipboard(text) {
          if (window.clipboardData && window.clipboardData.setData) {
              // IE specific code path to prevent textarea being shown while dialog is visible.
              return clipboardData.setData("Text", text);
          } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
              var textarea = document.createElement("textarea");
              textarea.textContent = text;
              textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
              document.body.appendChild(textarea);
              textarea.select();
              try {
                  return document.execCommand("copy"); // Security exception may be thrown by some browsers.
              } catch (ex) {
                  console.warn("Copy to clipboard failed.", ex);
                  return false;
              } finally {
                  document.body.removeChild(textarea);
              }
          }
      }

      vm.gridOptions = {
        enableGridMenu: true,
        enableSorting : false,
        enableRowSelection: true,
        enableRowHeaderSelection: false, 
        multiSelect: false,
        onRegisterApi: function( gridApi ) {  
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
            var column1Field = row.grid.columns[0].field;
            var overdriveCode = row.entity[column1Field].replace(/\s/g,'');
            var result = copyToClipboard(overdriveCode);
          });
        }
      };
  
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

            
            $elm.val(null);
          });
        };

        reader.readAsBinaryString(changeEvent.target.files[0]);
      });

    }
  }
}]);