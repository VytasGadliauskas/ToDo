
/////////////////////////////////////////////////   Modal ADD kodas

    var modalAdd = document.getElementById("myModalAdd");
    var btnAdd = document.getElementById("myBtnAdd");
    var spanAdd = document.getElementsByClassName("closeAdd")[0];

    btnAdd.onclick = function() {
      modalAdd.style.display = "block";
    }

    spanAdd.onclick = function() {
      modalAdd.style.display = "none";
    }

    //window.onclick = function(event) {
    //  if (event.target == modalAdd) {
    //    modalAdd.style.display = "none";
    //  }
    //}

//////////////////////////////////////////////// modal Edit kodas

function myEdit(EditID) {
    let myID = EditID.slice(1);
    // console.log('Edit ID: ', myID,' ',EditID );
    var modalEdit = document.getElementById("myModalEdit");
    // console.log("'myBtnEdit-k"+myID+"'"); 
    var btnEdit = document.getElementById("'myBtnEdit-k"+myID+"'");
    var spanEdit = document.getElementsByClassName("closeEdit")[0];
    modalEdit.style.display = "block";
    var myH3ID="myEditH3-k"+myID;
    var myPID="myEditP-k"+myID;
    var myCID = document.getElementById(EditID).className; 
    console.log("Korteles id: ",myCID);
    document.getElementById("kortPavadinimasEdit").value = document.getElementById(myH3ID).innerText;
    document.getElementById("kortAprasymasEdit").value = document.getElementById(myPID).innerText;
    switch (myCID){
        case "kortele_g":
            document.getElementById("myKortSpalvEdit").value = "g";
            break;
        case "kortele_z":
            document.getElementById("myKortSpalvEdit").value = "z";
            break;
        case "kortele_m":
            document.getElementById("myKortSpalvEdit").value = "m";
            break;
        case "kortele_r":
            document.getElementById("myKortSpalvEdit").value = "r";
            break;    
        default:    
            document.getElementById("myKortSpalvEdit").value = "g";
    }
    
    
    spanEdit.onclick = function() {
        modalEdit.style.display = "none";
    }

   // window.onclick = function(event) {
   //     if (event.target == modalEdit) {
   //       modalEdit.style.display = "none";
   //     }
   // }

    //////////////////////////////////////////////// Edit Save korteles kodas
    var buttonSave = document.getElementById('btnEditSave');
    buttonSave.onclick = function() {
        document.getElementById(myH3ID).innerText = document.getElementById("kortPavadinimasEdit").value;
        document.getElementById(myPID).innerText = document.getElementById("kortAprasymasEdit").value;
       // console.log('Edit ID: ',EditID );
        switch (document.getElementById("myKortSpalvEdit").value){
          case "g":
              document.getElementById(EditID).className = "kortele_g";
              break;
          case "z":
              document.getElementById(EditID).className = "kortele_z";
              break;
          case "m":
              document.getElementById(EditID).className = "kortele_m";
              break;
          case "r":
              document.getElementById(EditID).className = "kortele_r";
              break;    
          default:    
              document.getElementById(EditID).className = "kortele_g";
      }
  
        modalEdit.style.display = "none";
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
      case "g":
        element.className = "kortele_g";
        break;
      case "z":
        element.className = "kortele_z";
        break;
      case "m":
        element.className = "kortele_m";
        break; 
      case "r":
        element.className = "kortele_r";
        break;   
      default:
        element.className = "kortele_g";
    }
    var myNaujaKortNum = myKorteliuSum+1;
    element.id = 'k'+myNaujaKortNum;
    console.log("Naujos korteles id: "+element.id)
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "<img src='img/edit.png' alt='' width='20'>";
    btnEdit.setAttribute('onclick', 'myEdit("'+element.id+'")')
    let btnDel = document.createElement("button");
    btnDel.setAttribute('onclick', 'myKorteleDelete("'+element.id+'")')
    btnDel.innerHTML = "<img src='img/delete.png' alt='' width='20'>";
    element.appendChild(btnEdit);
    element.appendChild(btnDel);
    var kortH3 = document.createElement("h3");
    kortH3.id = 'myEditH3-k'+myNaujaKortNum;
    kortH3.innerHTML = document.getElementById("kortPavadinimas").value;
    console.log('Naujos korteles pavadinimas: '+document.getElementById("kortPavadinimas").value);
    var kortP = document.createElement("p");
    kortP.id = 'myEditP-k'+myNaujaKortNum;
    console.log('Naujos korteles aprasymas: '+document.getElementById("kortAprasymas").value);
    kortP.innerHTML = document.getElementById("kortAprasymas").value;
    element.appendChild(kortH3);
    element.appendChild(kortP);
    document.getElementById('myKorteles').appendChild(element);
    modalAdd.style.display = "none";
}



//////////////////////////////////////////////// JSON kodas

function myDBLoad() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
    const myDB = JSON.parse(this.responseText);
        console.log('Gauta DB: ', myDB);
        // console.log(' -- ', myDB.korteles[1]); 
        for (let i = 1; i <= Object.keys(myDB.korteles).length; i++) {
            console.log('kortele: ', i);
            console.log(myDB.korteles[i]);
        }
    }
    xmlhttp.open("GET", "https://my-json-server.typicode.com/VytasGadliauskas/ToDo/db");
    xmlhttp.send();
}

///////////////////////////////////////////////  JSON DB add korteles funkcija
function myDBAdd(myKortele) {

    var element = document.createElement("div");
    switch(myKortele) {
      case "g":
        element.className = "kortele_g";
        break;
      case "z":
        element.className = "kortele_z";
        break;
      case "m":
        element.className = "kortele_m";
        break; 
      case "r":
        element.className = "kortele_r";
        break;   
      default:
        element.className = "kortele_g";
    }
    var myNaujaKortNum = myKorteliuSum+1;
    element.id = 'k'+myNaujaKortNum;
    console.log("Naujos korteles id: "+element.id)
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "<img src='img/edit.png' alt='' width='20'>";
    btnEdit.setAttribute('onclick', 'myEdit("'+element.id+'")')
    let btnDel = document.createElement("button");
    btnDel.setAttribute('onclick', 'myKorteleDelete("'+element.id+'")')
    btnDel.innerHTML = "<img src='img/delete.png' alt='' width='20'>";
    element.appendChild(btnEdit);
    element.appendChild(btnDel);
    var kortH3 = document.createElement("h3");
    kortH3.id = 'myEditH3-k'+myNaujaKortNum;
    kortH3.innerHTML = document.getElementById("kortPavadinimas").value;
    console.log('Naujos korteles pavadinimas: '+document.getElementById("kortPavadinimas").value);
    var kortP = document.createElement("p");
    kortP.id = 'myEditP-k'+myNaujaKortNum;
    console.log('Naujos korteles aprasymas: '+document.getElementById("kortAprasymas").value);
    kortP.innerHTML = document.getElementById("kortAprasymas").value;
    element.appendChild(kortH3);
    element.appendChild(kortP);
    document.getElementById('myKorteles').appendChild(element);
}
