excelReader.controller('ViewSheetController', 
    [
        '$scope', 
        'ListServices', 
        '$uibModal', 
        'Data', 
        '$window', 
        '$routeParams',
        '$filter',

    function($scope, ListServices, $uibModal, Data, $window, $routeParams, $filter) {


        $scope.prompts = txtCommon;

        var spreadsheet = Data.getExcel();

        var excelData = spreadsheet.sheets[$routeParams.id];
        var gridData  = excelData.gridData;

        $scope.sheetName = excelData.sheetName;

        $scope.btnDone = function(){
            window.history.go(-1);
        };

        $scope.searchGrid = function() {
            $scope.gridOptions.data = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
        };

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

        $scope.gridOptions = {
            enableGridMenu: true,
            enableSorting : false,
            enableRowSelection: true,
            enableRowHeaderSelection: false, 
            multiSelect: false,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            data: gridData,
            columnDefs: excelData.gridColumns,
            onRegisterApi: function( gridApi ) {  
                gridApi.selection.on.rowSelectionChanged($scope,function(row){
                    var column1Field = row.grid.columns[0].field;
                    var overdriveCode = row.entity[column1Field].replace(/\s/g,'');
                    var result = copyToClipboard(overdriveCode);
                });
            }            
        };

    }
]);
