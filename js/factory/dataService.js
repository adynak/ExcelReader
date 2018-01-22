excelReader.factory("Data", 
    function($http, $q, $rootScope) {

        var factoryVariables = {
            securityInfo : {
                schema: null,
                dbPass: null,
                stop: true
            },
            fileAttributes: {
                name: null
            },
            formDefinition: {
                showFormName: true,
                formName: null,
                formFields: []
            },
            excelData: {
                sheetName: null,
                columnDefs: null,
                gridData: null
            },
            sheetNames: null,
            spreadsheet: {
                
            }
        };

        var setExcel= function(x){
            factoryVariables.spreadsheet = x;
        }

        var getExcel = function(){
            return factoryVariables.spreadsheet;
        }

        var setFileAttributes = function(attrs){
            // {name: name, blob: blob ; }
            factoryVariables.fileAttributes = attrs;
        }

        var getFileAttributes = function(){
            return factoryVariables.fileAttributes;
        }

        return {
            setFileAttributes: setFileAttributes,
            getFileAttributes: getFileAttributes,
            setExcel:setExcel,
            getExcel:getExcel
        };
    }
);