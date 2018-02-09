excelReader.directive("filelistBind", [ 'Data',
    function (Data) {
      return {
        link: function ($scope, $elm, $attrs) {

          $elm.on('change', function (changeEvent) {

            var reader = new FileReader();
            
            reader.onload = function (evt) {

              $scope.$apply(function () {
                var excel = {};
                var sheets = [], sheetName, sheetData, sheetColumns = [];
                var excelSheetCount, ex;
                var columns;
                var sheetNumber = 1;
                var data = evt.target.result;
                var workbook = XLSX.read(data, {type: 'binary'});
                var excelFileName = changeEvent.target.files[0].name;

                excelSheetCount = workbook.SheetNames.length;

                for (var eX = 0 ; eX < excelSheetCount ; eX++){
                    sheetName    = workbook.SheetNames[eX];
                    sheetData    = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[eX]]);

                    if (eX == 1){
                        saveText = JSON.stringify(sheetData);
                        saveText = saveText.replace(/\\t/g, "");
                        saveText = saveText.replace(/Truck Sales Overdrive Code/g, "name");
                        var saveFilename = 'availableFields';
                        var saveBlob = new Blob([saveText], {type: "text/plain;charset=utf-8"});
                        saveAs(saveBlob, saveFilename+".json");
                    }

                    columns      = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[eX]], { header: 1 })[0];
                    sheetColumns = [];
                    columns.forEach(function (row1) {
                        sheetColumns.push({ 
                            name: row1, 
                            enableColumnMenu: false,
                            cellTemplate: 'views/tooltip.html'
                        });
                    });                

                    sheets.push(
                    {
                        sheetName: sheetName,
                        gridData: sheetData,
                        gridColumns : sheetColumns
                    });
                }
                
                excel.filename = excelFileName;
                excel.sheetNames = workbook.SheetNames;
                excel.sheets = sheets;
                Data.setExcel(excel);
                
                $elm.val(null);
              });  //appply

            }; //reader

            reader.readAsBinaryString(changeEvent.target.files[0]);
          });//elem

        } //link
      } //return
    }
]);
