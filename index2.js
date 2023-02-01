var inp = document.querySelector(".firstName");
var list = document.querySelector(".studentsList");  
var addData = document.querySelector(".btnSave"); 
var clearData = document.querySelector(".btnClear"); 
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
        studentsList.push(inp.value);
        inp.value = "";
        render(studentsList);
        clearData.style.display = "block";
        localStorage.setItem("mylist", JSON.stringify(studentsList));        
    }     else { 
        alert("Please fill in all fields", "danger");
    }
});

let saved = localStorage.getItem("mylist");
if (saved) {
    studentsList = JSON.parse(localStorage.getItem("mylist"));
    render(studentsList);
} else {
    clearData.style.display = "none";
} 

clearData.addEventListener("click", function (){
    localStorage.clear();
    list.innerHTML="";
    studentsList = [];
    clearData.style.display = "none";

});