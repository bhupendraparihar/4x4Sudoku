(function (){
  "use strict"
  var input = new Map();
  input.set('' + 1 + 1 + 1, 1);
  input.set('' + 1 + 4 + 2, 4);
  input.set('' + 3 + 1 + 3, 3);
  input.set('' + 3 + 3 + 4, 2);

  function fillSudokuValues(n,input){
    var sudokuValueMap = [];
    var box = 1;
    for(var i = 1; i <= n; i++) {
      let row = [];
      for(var j = 1; j <= n; j++) {

        if(input.get('' + i + j + box)){
          row.push({value : input.get('' + i + j + box), box : box});
          //sudokuValueMap.set(''+i+j+box,input.get('' + i + j + box));
        }else{
          row.push({value: 0, box : box});
        }

        if(j%2 == 0){
           if(j!=4) {
             box++;
           } else {
             box--;
           }
        }
      }
      if(i%2 == 0){
           if(i!=4) {
             box+=2;
           } else {
             box-=2;
           }
        }
        sudokuValueMap.push(row);
    }

    return sudokuValueMap;
  }

  var sudoku = {};

  sudoku.values = fillSudokuValues(4, input);

  sudoku.getRow = function(rowNumber){
    var row = [];
    row = sudoku.values[rowNumber - 1];
    return row;
  }

  sudoku.getColumn = function(columnNumber){
    var column = [];
    for(var i in sudoku.values){
      column.push(sudoku.values[i][columnNumber - 1]);
    }
    return column;
  }

  sudoku.getBox = function(boxNumber){
    var box = [];
    for(var i in sudoku.values){
      for(var j = 0; j< sudoku.values[i].length; j++){
        if(sudoku.values[i][j].box === boxNumber){
          box.push(sudoku.values[i][j]);
        }
      }
    }
    return box;
  }

  sudoku.getNonPossibleValues = function(row, column, box){
    console.log(row + " : " + column + " : " + box);
    var nonPossibleValues = [];
    var rowValues = this.getRow(row);
    var columnValues = this.getColumn(column);
    var boxValues = this.getBox(box);
    var i;

    for(i = 0; i<rowValues.length; i++){
      if(rowValues[i].value !== 0){
        nonPossibleValues.push(rowValues[i].value);
      }
    }

    for(i = 0; i < columnValues.length; i++){
      if(columnValues[i].value !== 0 && nonPossibleValues.indexOf(columnValues[i].value) === -1){
        nonPossibleValues.push(columnValues[i].value);
      }
    }

    for(i = 0; i < boxValues.length; i++){
      if(boxValues[i].value !== 0 && nonPossibleValues.indexOf(boxValues[i].value) === -1){
        nonPossibleValues.push(boxValues[i].value);
      }
    }

    return nonPossibleValues;
  }

  sudoku.getPossibleValues = function(nonPossibleValues){
    var possibleValues = [1,2,3,4];
    for(var i =0; i<nonPossibleValues.length; i++){
      possibleValues.splice(possibleValues.indexOf(nonPossibleValues[i]),1);
    }
    return possibleValues;
  }

  sudoku.solve = function(){
    var solved;
    var multipleSolutionSudoku;
    var possibleValues;

    do{
      solved = false;
      //multipleSolutionSudoku = true;
      resolve :
      for(var i = 0; i <  sudoku.values.length; i++){
        for(var j = 0; j< sudoku.values[i].length; j++){
          possibleValues = [];
          if(sudoku.values[i][j].value === 0 ){
            possibleValues = sudoku.getPossibleValues(sudoku.getNonPossibleValues(i+1, j+1, sudoku.values[i][j].box));
            //multipleSolutionSudoku = false;
          }

          if(possibleValues.length > 1){
            //sudoku.values[i][j].possibleValues = possibleValues;
          }else if(possibleValues.length === 1){
            sudoku.values[i][j].value = possibleValues[0];
            solved = true;
            break resolve;
          }
        }
      }
    }while(solved);
  }

  console.log(sudoku.values);

  sudoku.solve();

  console.log(sudoku.values);
})();
