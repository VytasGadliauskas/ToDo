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
    var element = document.createElement("div");
    element.className = "kortele_g";
    element.appendChild(document.createTextNode('Nauja testas'));
    document.getElementById('myKorteles').appendChild(element);
}