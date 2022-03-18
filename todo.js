
/////////////////////////////////////////////////   Modal ADD kodas

    let modalAdd = document.getElementById("myModalAdd");
    let btnAdd = document.getElementById("myBtnAdd");
    let spanAdd = document.getElementsByClassName("closeAdd")[0];

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
    let modalEdit = document.getElementById("myModalEdit");
    // console.log("'myBtnEdit-k"+myID+"'"); 
    let btnEdit = document.getElementById("'myBtnEdit-k"+myID+"'");
    let spanEdit = document.getElementsByClassName("closeEdit")[0];
    modalEdit.style.display = "block";
    let myH3ID="myEditH3-k"+myID;
    let myPID="myEditP-k"+myID;
    let myCID = document.getElementById(EditID).className; 
    // console.log("Korteles spalva: ",myCID);
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
    let buttonSave = document.getElementById('btnEditSave');
    let myKortele ={
                    "id": "",
                    "spalva": "",
                    "pavadinimas": "",
                    "aprasymas": "",
                    "complited": false
                  };
    myKortele.id= EditID;
    buttonSave.onclick = function() {
        document.getElementById(myH3ID).innerText = document.getElementById("kortPavadinimasEdit").value;
        myKortele.pavadinimas = document.getElementById("kortPavadinimasEdit").value;
        document.getElementById(myPID).innerText = document.getElementById("kortAprasymasEdit").value;
        myKortele.aprasymas = document.getElementById("kortAprasymasEdit").value;
       // console.log('Edit ID: ',EditID );
        switch (document.getElementById("myKortSpalvEdit").value){
          case "g":
              document.getElementById(EditID).className = "kortele_g";
              myKortele.spalva = "g";
              break;
          case "z":
              document.getElementById(EditID).className = "kortele_z";
              myKortele.spalva = "z";
              break;
          case "m":
              document.getElementById(EditID).className = "kortele_m";
              myKortele.spalva = "m";
              break;
          case "r":
              document.getElementById(EditID).className = "kortele_r";
              myKortele.spalva = "r";
              break;    
          default:    
              document.getElementById(EditID).className = "kortele_g";
              myKortele.spava = "g";
      }
        //////////////////////////  JSON  UPDATE
        myEditToDB(myKortele);
        modalEdit.style.display = "none";
    }
}

///////////////////////////////////////////////  Delete kortele kodas

function myKorteleDelete(myKortID) {
    let isExecuted = confirm("Ar tikrai triti kortele?");
        if (isExecuted) {   
            const myobj = document.getElementById(myKortID);
            myobj.remove();
            myDeleteToDB(myKortID);
        }    
 }

///////////////////////////////////////////////  Prideti kortele kodas

function myAdd() {
    let myKorteliuSum = document.getElementById("myKorteles").childElementCount;
    let myKortele ={
                    "id": "",
                    "spalva": "",
                    "pavadinimas": "",
                    "aprasymas": "",
                    "complited": false
                  };
    //console.log("Korteliu suma: "+myKorteliuSum)
    let element = document.createElement("div");
    switch(document.getElementById("myKortSpalv").value) {
      case "g":
        element.className = "kortele_g";
        myKortele.spalva = "g";
        break;
      case "z":
        element.className = "kortele_z";
        myKortele.spalva = "z";
        break;
      case "m":
        element.className = "kortele_m";
        myKortele.spalva = "m";
        break; 
      case "r":
        element.className = "kortele_r";
        myKortele.spalva = "r";
        break;   
      default:
        element.className = "kortele_g";
        myKortele.spalva = "g";
    }
    let myNaujaKortNum = myKorteliuSum+1;
    element.id = 'k'+myNaujaKortNum;
    myKortele.id = element.id;
    // console.log("Naujos korteles id: "+element.id)
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "<img src='img/edit.png' alt='' width='20'>";
    btnEdit.setAttribute('onclick', 'myEdit("'+element.id+'")')
    let btnDel = document.createElement("button");
    btnDel.setAttribute('onclick', 'myKorteleDelete("'+element.id+'")')
    btnDel.innerHTML = "<img src='img/delete.png' alt='' width='20'>";
    element.appendChild(btnEdit);
    element.appendChild(btnDel);
    let kortH3 = document.createElement("h3");
    kortH3.id = 'myEditH3-k'+myNaujaKortNum;
    kortH3.innerHTML = document.getElementById("kortPavadinimas").value;
    // console.log('Naujos korteles pavadinimas: '+document.getElementById("kortPavadinimas").value);
    myKortele.pavadinimas = document.getElementById("kortPavadinimas").value;
    let kortP = document.createElement("p");
    kortP.id = 'myEditP-k'+myNaujaKortNum;
    // console.log('Naujos korteles aprasymas: '+document.getElementById("kortAprasymas").value);
    myKortele.aprasymas = document.getElementById("kortAprasymas").value;
    kortP.innerHTML = document.getElementById("kortAprasymas").value;
    element.appendChild(kortH3);
    element.appendChild(kortP);
    document.getElementById('myKorteles').appendChild(element);
    // JSON 
    myAddToDB(myKortele);
    modalAdd.style.display = "none";
}

//////////////////////////////////////////////// JSON DB pakrauna korteles i UI

function myDBLoad() {
    document.getElementById("myProgress").value =0;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
    const myDB = JSON.parse(this.responseText);
        let myProgressStep = 100 / Object.keys(myDB.korteles).length;
        for (let i = 0; i < Object.keys(myDB.korteles).length; i++) {
            myDBAdd(myDB.korteles[i]);
            myProgressStep = myProgressStep + myProgressStep;
            document.getElementById("myProgress").value = myProgressStep;
        }
    }
    xmlhttp.open("GET", "https://my-json-server.typicode.com/VytasGadliauskas/ToDo/db");
    xmlhttp.send();
   // document.getElementById("myProgress").value = 100;
}


///////////////////////////////////////////////  JSON DB add i UI korteles funkcija
function myDBAdd(myKortele) {

  let element = document.createElement("div");
    switch(myKortele.spalva) {
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
    
    element.id = myKortele.id;
    // console.log("Naujos korteles id: "+element.id)
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "<img src='img/edit.png' alt='' width='20'>";
    btnEdit.setAttribute('onclick', 'myEdit("'+element.id+'")')
    let btnDel = document.createElement("button");
    btnDel.setAttribute('onclick', 'myKorteleDelete("'+element.id+'")')
    btnDel.innerHTML = "<img src='img/delete.png' alt='' width='20'>";
    element.appendChild(btnEdit);
    element.appendChild(btnDel);
    let kortH3 = document.createElement("h3");
    kortH3.id = 'myEditH3-'+myKortele.id;
    kortH3.innerHTML = myKortele.pavadinimas;
    let kortP = document.createElement("p");
    kortP.id = 'myEditP-'+myKortele.id;
    kortP.innerHTML = myKortele.aprasymas;
    element.appendChild(kortH3);
    element.appendChild(kortP);
    document.getElementById('myKorteles').appendChild(element);
}

///////////////////////////////////////////////  Prideda korteles irasa i JSON DB
   
function myAddToDB(myKortele) {
  document.getElementById("myProgress").value = 0;
  let bodyContent = JSON.stringify(myKortele);
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
    
   fetch("https://my-json-server.typicode.com/VytasGadliauskas/ToDo/korteles/", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   }).then(function(response) {
     return response.text();
   }).then(function(data) {
     console.log(data);
   })
   document.getElementById("myProgress").value = 100;
   alert("Changes are faked and aren't persisted just like JSONPlaceholder, Requests are cached (1 minute)");
}

///////////////////////////////////////////////// Redaguoja kortele JSON DB

function myEditToDB(myKortele) {
  document.getElementById("myProgress").value = 0;
  console.log(myKortele);
  let myURI = "'https://my-json-server.typicode.com/VytasGadliauskas/ToDo/korteles/"+myKortele.id+"'";
  let bodyContent = JSON.stringify(myKortele);

  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
 
   fetch(myURI, { 
     method: "PUT",
     body: bodyContent,
     headers: headersList
   }).then(function(response) {
     return response.text();
   }).then(function(data) {
     console.log(data);
   })

  document.getElementById("myProgress").value = 100;
  alert("Changes are faked and aren't persisted just like JSONPlaceholder, Requests are cached (1 minute)");
} 

////////////////////////////////////////////////// DELETE kortele JSON DB

function myDeleteToDB(myKortelesID) {
  document.getElementById("myProgress").value = 0;
  let myURI = "'https://my-json-server.typicode.com/VytasGadliauskas/ToDo/korteles/"+myKortelesID+"'";

  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
   }
   
   fetch("https://my-json-server.typicode.com/VytasGadliauskas/ToDo/korteles/k2", { 
     method: "DELETE",
     headers: headersList
   }).then(function(response) {
     return response.text();
   }).then(function(data) {
     console.log(data);
   })
   document.getElementById("myProgress").value = 100;
   alert("Changes are faked and aren't persisted just like JSONPlaceholder, Requests are cached (1 minute)");
}