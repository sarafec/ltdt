let unitData;

let getData = function(){
	var request = new XMLHttpRequest();
	request.open('GET', 'data.json', true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    unitData = data;
	    return createUnitList(data);
	  } else {
	    // We reached our target server, but it returned an error
	    console.log("error!");

	  }
	};
	request.onerror = function() {
	  // There was a connection error of some sort
	  console.log("connection error!");
	};

	request.send();
}

function createUnitList(data) {

	let appDiv = document.querySelector(".app");

	for(let i = 0; i < data.length; i++){
		let tempDiv = document.createElement("div");
		tempDiv.classList.add("unit-entry");
		tempDiv.setAttribute("data-id", data[i].unit);
		tempDiv.setAttribute("tabindex", 0);
		tempDiv.textContent = data[i].title;
		appDiv.appendChild(tempDiv);
		tempDiv.addEventListener("click", findDataUnit);
		tempDiv.addEventListener("keydown", function(evt) { if(evt.which === 13) { findDataUnit(evt); } });

	}



}

function findDataUnit(evt){
	let targetElem = evt.target;
	let targetDataId = targetElem.getAttribute("data-id");

	clearPage();
	loadVocabPages(targetDataId);
}

function clearPage() {
	let appContainer = document.querySelector(".app");

	if(appContainer.children.length > 0){
		while(appContainer.firstChild){
			appContainer.removeChild(appContainer.firstChild);
		}
	}
}

function clearWord() {
	let vocabContainer = document.querySelector(".vocab-container");

	if(vocabContainer.children.length > 0){
		while(vocabContainer.firstChild){
			vocabContainer.removeChild(vocabContainer.firstChild);
		}
	}
}

function loadVocabPages(targetDataId) {
	let targetData = unitData[targetDataId].data;

	let appContainer = document.querySelector(".app");
	let vocabContainer = document.createElement("div");
	vocabContainer.setAttribute("tabindex", 0);
	vocabContainer.classList.add("vocab-container");
	appContainer.appendChild(vocabContainer);

	//vocabContainer.addEventListener("click", function(evt) { let index = +evt.target.getAttribute("data-id"); postNextWord(index, targetData); evt.preventDefault(); });
	vocabContainer.addEventListener("keydown", function(evt) { if(evt.which === 39) {  let index = +evt.target.children[0].getAttribute("data-id"); postNextWord(index, targetData); evt.preventDefault(); } });
	vocabContainer.addEventListener("keydown", function(evt) { if(evt.which === 37) {  let index = +evt.target.children[0].getAttribute("data-id"); postPrevWord(index, targetData); evt.preventDefault(); } });


	loadWords(targetData, 0);
}

function loadWords(targetData, index) {

	let unitData = targetData;
	let vocabContainer = document.querySelector(".vocab-container");

	if(index < targetData.length - 1){
		let vocabElemAr = document.createElement("div");
		vocabElemAr.classList.add("vocab-elem-ar");
		vocabElemAr.setAttribute("data-id", index);
		vocabElemAr.textContent = targetData[index].Arabic;

		let vocabElemEng = document.createElement("div");
		vocabElemEng.classList.add("vocab-elem-eng");
		vocabElemEng.setAttribute("data-id", index);
		vocabElemEng.textContent = targetData[index].English;
		
		vocabContainer.appendChild(vocabElemAr);
		vocabContainer.appendChild(vocabElemEng);

	}

}

function postNextWord(index, unitData) {
	console.log(unitData.length);
	if(index < unitData.length - 2){
		index += 1; 
	}
	console.log(index);

	let vocabElemAr = document.querySelector(".vocab-elem-ar");
	vocabElemAr.remove();
	let vocabElemEng = document.querySelector(".vocab-elem-eng");
	vocabElemEng.remove();

	loadWords(unitData, index); 
}

function postPrevWord(index, unitData) {
	if(index > 0){
		index = index - 1;
	}

	let vocabElemAr = document.querySelector(".vocab-elem-ar");
	vocabElemAr.remove();
	let vocabElemEng = document.querySelector(".vocab-elem-eng");
	vocabElemEng.remove();

	loadWords(unitData, index);
}

getData();

// {"Arabic": "", "English": ""}, {"Arabic": "", "English": ""}, {"Arabic": "", "English": ""}, {"Arabic": "", "English": ""}, {"Arabic": "", "English": ""},
