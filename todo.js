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



// Get the modal
var modal = document.getElementById("myModalAdd");

// Get the button that opens the modal
var btn = document.getElementById("myBtnAdd");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}