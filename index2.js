var inp = document.querySelector(".firstName");
var list = document.querySelector(".subscribersList");  
var addData = document.querySelector(".btnSave"); 
var clearData = document.querySelector(".btnClear"); 
var deleteData = document.querySelector("btnDelete");
var editData = document.querySelector("btnEdit");
var studentsList = [];  

function render(elemments) {
    list.innerHTML= "";
    elemments.forEach(e => {
        let newEl = document.createElement("tr");
        newEl.innerHTML = e;
        newEl.classList.add("list-group-item");
        list.appendChild(newEl);
    });
}

addData.addEventListener("click", e => {
    if (inp.value !== "") {
        subscribersList.push(inp.value);
        inp.value = "";
        render(subscribersList);
        clearData.style.display = "block";
        localStorage.setItem("mylist", JSON.stringify(subscribersList));        
    }     
    
    else { 
        if (subscribersList == null) {
            const list = document.querySelector("subscribersList");
            const row = document.createElement("tr");
            
            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sn edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sn delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert(`New subscriber "${firstName} ${lastName}" has been added`, "success");
        }
        else {
            studentsList.children[0].textContent = firstName;
            studentsList.children[1].textContent = lastName;
    
            studentsList = null;
            showAlert("Subscriber has been edited", "info");
        }
   
    }
});





let saved = localStorage.getItem("mylist");
if (saved) {
    subscribersList = JSON.parse(localStorage.getItem("mylist"));
    render(subscribersList);
} else {
    clearData.style.display = "none";
} 

clearData.addEventListener("click", function (){
    localStorage.clear();
    list.innerHTML="";
    subscribersList = [];
    clearData.style.display = "none";
});

editData.addEventListener("click",  (e)=>{
    target = e.target
localStorage.clear();
if (target.class.container("btnEdit")){
    target.parentElement.parentElement.remove();
}
} );


/*show alert*/
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 500);
}