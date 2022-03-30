
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

//////////////////////////////////////////////// modal Edit kodas

function myEdit(EditID) {
    let myID = EditID.slice(1);
    let modalEdit = document.getElementById("myModalEdit");
    let btnEdit = document.getElementById("'myBtnEdit-k"+myID+"'");
    let spanEdit = document.getElementsByClassName("closeEdit")[0];
    modalEdit.style.display = "block";
    let myH3ID="myEditH3-k"+myID;
    let myPID="myEditP-k"+myID;
    let myCID = document.getElementById(EditID).className; 
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

    //////////////////////////////////////////////// Edit Save korteles kodas
    let buttonSave = document.getElementById('btnEditSave');
    let myKortele ={
                    "id": "",
                    "spalva": "",
                    "pavadinimas": "",
                    "aprasymas": "",
                    "complited": false
                  };
    myKortele.id = EditID;
    buttonSave.onclick = function() {
        document.getElementById(myH3ID).innerText = document.getElementById("kortPavadinimasEdit").value;
        myKortele.pavadinimas = document.getElementById("kortPavadinimasEdit").value;
        document.getElementById(myPID).innerText = document.getElementById("kortAprasymasEdit").value;
        myKortele.aprasymas = document.getElementById("kortAprasymasEdit").value;
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
      
        if (document.getElementById("kortAtlikta").checked == true ) {
          document.getElementById(EditID).classList.add("kortele_atlikta");
        }

        //////////////////////////  JSON  UPDATE
        myEditToDB(myKortele);
        modalEdit.style.display = "none";
        status_bar_korteles();
        status_bar_atlikta();
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
    status_bar_korteles(); 
    status_bar_atlikta();     
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
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "<img src='img/edit.png' alt='' width='20'>";
    btnEdit.setAttribute('onclick', 'myEdit("'+element.id+'")')
    let btnDel = document.createElement("button");
    btnDel.setAttribute('onclick', 'myKorteleDelete("'+element.id+'")')
    btnDel.innerHTML = "<img src='img/delete.png' alt='' width='20'>";
    let divmenu = document.createElement("div");
    divmenu.className = "kortele_menu";
    divmenu.appendChild(btnEdit);
    divmenu.appendChild(btnDel);
    let divpavadininimas = document.createElement("div");
    divpavadininimas.className = "kortele_pavadinimas";
    let kortH3 = document.createElement("h3");
    kortH3.id = 'myEditH3-k'+myNaujaKortNum;
    kortH3.innerHTML = document.getElementById("kortPavadinimas").value;
    myKortele.pavadinimas = document.getElementById("kortPavadinimas").value;
    divpavadininimas.appendChild(kortH3);
    element.appendChild(divpavadininimas);
    element.appendChild(divmenu); 
    let kortP = document.createElement("p");
    kortP.id = 'myEditP-k'+myNaujaKortNum;
    myKortele.aprasymas = document.getElementById("kortAprasymas").value;
    kortP.innerHTML = document.getElementById("kortAprasymas").value;
    element.appendChild(kortP);
    element.draggable = true;
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
    element.addEventListener('dragenter', dragEnter);
    element.addEventListener('dragleave', dragLeave);
    element.addEventListener('dragover', dragOver);
    element.addEventListener('drop', dragDrop);
    document.getElementById('myKorteles').appendChild(element);
    // JSON 
    myAddToDB(myKortele);
    modalAdd.style.display = "none";
    status_bar_korteles();
    status_bar_atlikta();
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
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "<img src='img/edit.png' alt='' width='20'>";
    btnEdit.setAttribute('onclick', 'myEdit("'+element.id+'")')
    let btnDel = document.createElement("button");
    btnDel.setAttribute('onclick', 'myKorteleDelete("'+element.id+'")')
    btnDel.innerHTML = "<img src='img/delete.png' alt='' width='20'>";
    let divmenu = document.createElement("div");
    divmenu.className = "kortele_menu";
    divmenu.appendChild(btnEdit);
    divmenu.appendChild(btnDel);
    element.appendChild(divmenu); 
    let divpavadininimas = document.createElement("div");
    divpavadininimas.className = "kortele_pavadinimas";
    let kortH3 = document.createElement("h3");
    kortH3.id = 'myEditH3-'+myKortele.id;
    kortH3.innerHTML = myKortele.pavadinimas;
    let kortP = document.createElement("p");
    kortP.id = 'myEditP-'+myKortele.id;
    kortP.innerHTML = myKortele.aprasymas;
    divpavadininimas.appendChild(kortH3);
    element.appendChild(divpavadininimas); 
    element.appendChild(divmenu); 
    element.appendChild(kortP);
    element.draggable = true;
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
    element.addEventListener('dragenter', dragEnter);
    element.addEventListener('dragleave', dragLeave);
    element.addEventListener('dragover', dragOver);
    element.addEventListener('drop', dragDrop);
    document.getElementById('myKorteles').appendChild(element);
    status_bar_korteles();
    status_bar_atlikta();
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

///////////////////////////////////////////////// Status BAR

function status_bar_korteles() {
  let geltonos = document.getElementsByClassName("kortele_g");
  let melynos = document.getElementsByClassName("kortele_m");
  let raudonos = document.getElementsByClassName("kortele_r");
  let zalios = document.getElementsByClassName("kortele_z");
  let status_g = document.getElementById("status-g");
  let status_r = document.getElementById("status-r");
  let status_m = document.getElementById("status-m");
  let status_z = document.getElementById("status-z");
  if (typeof(geltonos) != undefined) {
    status_g.innerText = "Geltonu "+(geltonos.length);
  } else {
    status_g.innerText = "Geltonu 0";
  }   
  if (typeof(raudonos) != undefined) {
    status_r.innerText = "Raudonu "+(raudonos.length);
  } else {
    status_r.innerText = "Raudonu 0";
  }   
  if (typeof(geltonos) != undefined) {
    status_m.innerText = "Melynu "+(melynos.length);
  } else {
    status_m.innerText = "Melynu 0";
  }   
  if (typeof(geltonos) != undefined) {
    status_z.innerText = "Zaliu "+(zalios.length);
  } else {
    status_z.innerText = "Zaliu 0";
  } 
}

function status_bar_atlikta() {
  let korteliuNumb = document.getElementById("myKorteles").childElementCount;
  let atliktuKorteliuNumb = document.querySelectorAll('.kortele_atlikta').length;
  console.log(atliktuKorteliuNumb[0]);
  let progress = document.getElementsByClassName("footer_progress"); 
  let bar = document.getElementsByClassName("footer_progress_bar");
  let procentai = Math.round((atliktuKorteliuNumb/korteliuNumb)*100);
  bar[0].innerText = procentai+"%";
  bar[0].style.width = procentai+"%";

  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    localStorage.setItem("korteliu-skaicius", korteliuNumb);
      
  } else {
    // Sorry! No Web Storage support..
  }

}

///////////////////////////////////////////////// Drag & Drop 
let dragSrcEl;
let dragSorceID;
let dragSorceClassList;

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  dragSorceID = this.id;
  dragSorceClassList = this.classList.value;
}

function dragEnd(e) {
  this.style.opacity = '1';
  this.classList.remove('drag_over');
}

function dragEnter(e) {
  this.classList.add('drag_over');
}

function dragLeave(e) {
  this.classList.remove('drag_over');
}

function dragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function dragDrop(e) {
  e.stopPropagation();

  if (dragSrcEl !== this) {
    let dragDestClassList = this.classList.value;
    let dragDestID = this.id;
    dragSrcEl.innerHTML = this.innerHTML;
    dragSrcEl.id = dragDestID;
    dragSrcEl.classList = dragDestClassList;
    this.innerHTML = e.dataTransfer.getData('text/html');
    this.id = dragSorceID;
    this.classList =  dragSorceClassList;
  }
  return false;
}

