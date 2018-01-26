excelReader.controller('ViewSheetController', 
    [
        '$scope', 
        'ListServices', 
        '$uibModal', 
        'Data', 
        '$window', 
        '$routeParams',
        '$filter',
        'excelReaderService',

    function($scope, ListServices, $uibModal, Data, $window, $routeParams, $filter, excelReaderService) {


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
              $scope.gridApi = gridApi;
              gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
                var overdriveCode;
                var columnName = newRowCol.col.field;
                if (typeof(newRowCol.row.entity[columnName]) === 'undefined'){
                  overdriveCode = ' ';
                } else {
                  overdriveCode = newRowCol.row.entity[columnName].replace(/^\s+|\s+$/gm,'');
                }
                var result = excelReaderService.copyToClipboard(overdriveCode);
              });
            }            
        };

    }
]);
