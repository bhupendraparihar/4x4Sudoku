/*
* This function generates all the unique combination of the input passed as array
* Ex: 
*	var a = combiGenerator([1,2,3,4]);
*
*	for(var i in a){
*		console.log(a[i]);
*	}
*/


var GenerateCombination = {
	combiGenerator : function(appendElement, appendingToElements){
		var _appendElement;
		var _appendingToElements = [];
		if(appendElement.length > 1){
			_appendElement = appendElement.slice(0,1);
			//_appendingToElements.push(appendElement.slice(1));

			//console.log(_appendElement);
			//console.log(_appendingToElements);
			
			_appendingToElements  = this.combiGenerator(appendElement.slice(1));
			//return combiGenerator
			//return combiGenerator()
		}else{
			_appendElement = appendElement;
			_appendingToElements.push(appendElement);
			return _appendingToElements;
		}

		var resultArray = [];
		var singleAppendingToElement;
		for(var i = 0; i<_appendingToElements.length; i++){
			singleAppendingToElement = _appendingToElements[i];
			for(var j = 0; j<singleAppendingToElement.length + 1; j++){
				var copyOfAppendingToElement = singleAppendingToElement.slice(0);
				copyOfAppendingToElement.splice(j,0,_appendElement[0]);
				resultArray.push(copyOfAppendingToElement);
			}
		}
		return resultArray;
	}
}