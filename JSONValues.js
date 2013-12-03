/*var allValueObject = {
1: {
	2:{
		3:"4",
		4:"3"
		},
	3:{
		2:"4",
		4:"2"
		},
	4:{
		3:"2",
		2:"3"
	}
},
2: {
	4:{
		3:"1",
		1:"3"
		},
	3:{
		1:"4",
		4:"1"
		},
	1:{
		3:"4",
		4:"3"
	}
},
3 : {
	4:{
		2:"1",
		1:"2"
		},
	2:{
		1:"4",
		4:"1"
		},
	1:{
		2:"4",
		4:"2"
	}
},
4 : {
	3:{
		2:"1",
		1:"2"
		},
	2:{
		1:"3",
		3:"1"
		},
	1:{
		2:"3",
		3:"2"
	}
}
};
*/
var allValueObject = {};
var createJSONValues = function(){
	var allValues = GenerateCombination.combiGenerator([1,2,3,4]);
	var jsonObj = {};
	var temp = jsonObj;
		
	for(var j in allValues){
		var myArray = allValues[j];
		for(var i =0; i<myArray.length-1;i++){
			//console.log(myArray[i]);
			if(i< myArray.length-2){
				if(!temp.hasOwnProperty(myArray[i])){
					temp[myArray[i]] = {};
					temp = temp[myArray[i]];
				}else{
					temp = temp[myArray[i]];
				}
			}else{
				temp[myArray[i]] =  myArray[i+1];
			}
		}
		temp = jsonObj;
	}
	return jsonObj;
};

allValueObject = createJSONValues();

