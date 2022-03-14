(function(){
    
    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
       // console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        alert_data(obj.name, obj.family);
    }
    
    function alert_data(name, family){
        console.log('Nameas : ' + name + ', Familys : ' + family);
    }
 
    document.getElementById('file').addEventListener('change', onChange);

}());


/////////////////////////////////////////////////   Modal ADD kodas
// Get the modal
var modalAdd = document.getElementById("myModalAdd");

// Get the button that opens the modal
var btnAdd = document.getElementById("myBtnAdd");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btnAdd.onclick = function() {
  modalAdd.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalAdd.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalAdd) {
    modalAdd.style.display = "none";
  }
}

///////////////////////////////////////////////  Delete kortele kodas

function myKorteleDelete(myKortID) {
    let isExecuted = confirm("Ar tikrai triti kortele?");
        if (isExecuted) {   
            const myobj = document.getElementById(myKortID);
            myobj.remove();
        }    
  }

///////////////////////////////////////////////  Prideti kortele kodas

function myAdd() {
    let myKorteliuSum = document.getElementById("myKorteles").childElementCount;
    console.log("Korteliu suma: "+myKorteliuSum)
    var element = document.createElement("div");
    switch(document.getElementById("myKortSpalv").value) {
      case g:
        element.className = "kortele_g";
        break;
      case z:
        element.className = "kortele_z";
        break;
      case m:
        element.className = "kortele_m";
        break; 
      case r:
        element.className = "kortele_r";
        break;   
      default:
        element.className = "kortele_g";
    }
    var myNaujaKortNum = myKorteliuSum+1;
    element.id = 'k'+myNaujaKortNum;
    console.log("Nuajos korteles id: "+element.id)
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Ed";
    let btnDel = document.createElement("button");
    btnDel.setAttribute('onclick', 'myKorteleDelete("'+element.id+'")')
    btnDel.innerHTML = "-";
    element.appendChild(btnEdit);
    element.appendChild(btnDel);
    var kortH3 = document.createElement("h3");
    kortH3.innerHTML = document.getElementById("kortPavadinimas").value;
    console.log('Naujos korteles pavadinimas: '+document.getElementById("kortPavadinimas").value);
    var kortP = document.createElement("p");
    console.log('Naujos korteles aprasymas: '+document.getElementById("kortAprasymas").value);
    kortP.innerHTML = document.getElementById("kortAprasymas").value;
    element.appendChild(kortH3);
    element.appendChild(kortP);
    document.getElementById('myKorteles').appendChild(element);
    modalAdd.style.display = "none";
}