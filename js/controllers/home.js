excelReader.controller('HomeController', 
    [
        '$scope', 
        '$http', 
        '$location', 
        'Data', 
        '$rootScope', 
        '$routeParams', 
        'ListServices',

    function($scope, $http, $location, Data, $rootScope, $routeParams, ListServices) {

        $scope.prompts = txtSideMenu;
        var spreadsheet;
        $scope.applyThisClass = function(memberProfile) {
            return "";
            if (typeof(memberProfile) !== 'undefined'){
                if (memberProfile.member_type) {
                    return "";
                } else {
                    return "sr-only";
                }
            }
        }

        $scope.menuShowFilename = function() {
            var spreadsheet = Data.getExcel();

            var showFilename = false;
            if (typeof(spreadsheet.filename) != 'undefined'){
                $scope.excelFilename = spreadsheet.filename;
                $scope.sheetNames    = spreadsheet.sheetNames;
                showFilename = true;
                $scope.prompts.menuOpenFile = txtSideMenu.file + ': ' + spreadsheet.filename;
            }
            return showFilename;
        }

    }

]);