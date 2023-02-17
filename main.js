/*show alert*/
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var age = document.getElementById("age").value;
    var profession = document.getElementById("profession").value;
    var email = document.getElementById("email").value;

    if (firstName == "" || lastName == "" || age == "" || profession == "" ||
        email == "") {
        showAlert("Please fill in all fields", "danger");
        return false;
    }
    return true;
}

function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.firstName + "</td>";
        html += "<td>" + element.lastName + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.profession + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="deleteData(' +
            index +
            ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' +
            index +
            ')" class="btn btn-primary">Update</button></td>';
        html += "</tr>";
    });

    document.querySelector("#CRUD tbody").innerHTML =
        html;
}

document.onload = showData();

function addData() {
    if (validateForm() == true) {
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var age = document.getElementById("age").value;
        var profession = document.getElementById("profession").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push({
            firstName: firstName,
            lastName: lastName,
            age: age,
            profession: profession,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify
            (peopleList));
        showData();
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("age").value = "";
        document.getElementById("profession").value = "";
        document.getElementById("email").value = "";

        showAlert("Subcriber has been added", "success");
    }
}

function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem
            ("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify
        (peopleList));
    showData();
    showAlert("Record has been deleted", "danger");
}


function updateData(index) {
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("firstName").value = peopleList[index].firstName;
    document.getElementById("lastName").value = peopleList[index].lastName;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("profession").value = peopleList[index].profession;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].firstName = document.getElementById("firstName").value;
            peopleList[index].lastName = document.getElementById("lastName").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].profession = document.getElementById("profession").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("age").value = "";
            document.getElementById("profession").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
          
            showAlert("Subcriber has been edited", "success");
        }
    }
}

