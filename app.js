"use strict"

var app = {
  init : function(){
    this.cacheElements();
    this.bindEvents();
  },
  cacheElements: function() {
    this.allInputBox = document.querySelectorAll('input');
    this.solveBtn = document.getElementById('solve');
  },
  bindEvents : function(){
    var self = this;
    this.solveBtn.addEventListener('click',function(){
      sudoku.values = self.fillSudokuValues();
      sudoku.solve();
      self.renderSudokuValues(sudoku.values);
    });
  },
  fillSudokuValues : function(){
    var sudokuValueMap = [];
    let row = [], column, box, value=0;
    for(var i = 0; i < this.allInputBox.length; i++){
      box = parseInt(this.allInputBox[i].getAttribute("box"));
      if(this.allInputBox[i].value){
        value = parseInt(this.allInputBox[i].value);
      }else{
        value = 0;
        this.allInputBox[i].classList.add('emptyBox');
      }
      row.push({value: value, box : box});

      if(row.length === 9){
        sudokuValueMap.push(row);
        row = [];
      }
    }
    return sudokuValueMap;
  },
  renderSudokuValues : function(values){
    var flattenValues = [];
    var i,j;
    for(i = 0; i < values.length; i++){
      for(j = 0; j< values[i].length; j++){
        flattenValues.push(values[i][j]);
      }
    }

    for( i = 0; i < this.allInputBox.length; i++){
      if(parseInt(this.allInputBox[i].value) !== 0){
          this.allInputBox[i].value = flattenValues[i].value;
      }
    }
  }
}

app.init();
