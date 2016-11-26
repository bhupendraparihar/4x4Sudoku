(function (){
  "use strict"

  var sudoku = {};

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
    console.log(row + " : " + column + " : " + box + " : " + nonPossibleValues);

    return nonPossibleValues;
  }

  sudoku.getPossibleValues = function(nonPossibleValues){
    var possibleValues = [1,2,3,4,5,6,7,8,9];
    for(var i =0; i<nonPossibleValues.length; i++){
      possibleValues.splice(possibleValues.indexOf(nonPossibleValues[i]),1);
    }
    console.log(possibleValues);
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
            if(possibleValues.length > 1){
              //sudoku.values[i][j].possibleValues = possibleValues;
            }else if(possibleValues.length === 1){
              sudoku.values[i][j].value = possibleValues[0];
              solved = true;
              break resolve;
            }
          }


        }
      }
    }while(solved);
  }

  window.sudoku = sudoku;
})();
