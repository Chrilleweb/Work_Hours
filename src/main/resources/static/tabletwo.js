window.addEventListener('load', beregnSum);

function beregn() {
    event.preventDefault();
    var dato = document.getElementById("dato").value;
    var timer = document.getElementById("timer").value;
    var lon = document.getElementById("lon").value;


    if (isNaN(timer) || isNaN(lon)) {
        alert("Horus and Hourly rate needs to be only numbers");
        return;
    }
    if (timer === "" || lon === "") {
        alert("Please enter both hours and hourly rate");
        return;
    }
    var resultat = timer * lon;
    document.getElementById("samlet").innerHTML = "<br>You have earned: " + resultat + " Kroner<br>It is now stored in the table below";

    // Gem data i local storage
    var data2 = JSON.parse(localStorage.getItem("data2")) || [];
    data2.push({dato: dato, timer: timer, lon: lon});
    localStorage.setItem("data2", JSON.stringify(data2));

    document.getElementById("dato").value = "";
    document.getElementById("timer").value = "";
    document.getElementById("lon").value = "";

    visData();

    // Opdater seneste gemte data
    var seneste = data2[data2.length - 1];
    document.getElementById("gemtDato").innerHTML = seneste.dato;
    document.getElementById("gemtTimer").innerHTML = seneste.timer;
    document.getElementById("gemtLon").innerHTML = seneste.lon;



}

function visData() {
    var data2 = JSON.parse(localStorage.getItem("data2")) || [];
    var table = document.createElement("table");
    table.style.width = "100%"; // Set table width
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    // Add table header row
    var headerRow = document.createElement("tr");
    var header1 = document.createElement("th");
    header1.innerHTML = "Date";
    var header2 = document.createElement("th");
    header2.innerHTML = "Hours";
    var header3 = document.createElement("th");
    header3.innerHTML = "Hourly rate";
    var header4 = document.createElement("th");
    var deleteAllButton = document.createElement("button");
    deleteAllButton.innerHTML = "Delete Table";
    deleteAllButton.className = "delete-button rounded big-delete";
    deleteAllButton.onclick = function() {
        if (confirm("Are you sure you want to delete the table?")) {
            localStorage.setItem("data2", "[]");
            visData();
        }
    };
    header4.appendChild(deleteAllButton);
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    headerRow.appendChild(header3);
    headerRow.appendChild(header4);
    thead.appendChild(headerRow);

    // Add table body rows
    for (var i = 0; i < data2.length; i++) {
        if (data2[i].timer.trim() !== "" && data2[i].lon.trim() !== "") {
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            if (data2[i].dato.trim() !== "") {
                cell1.innerHTML = data2[i].dato;
            } else {
                cell1.innerHTML = "NO DATE";
            }
            var cell2 = document.createElement("td");
            cell2.innerHTML = data2[i].timer;
            var cell3 = document.createElement("td");
            cell3.innerHTML = data2[i].lon;
            var cell4 = document.createElement("td");
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.className = "delete-button rounded btn-sm";
            deleteButton.onclick = (function (index) {
                return function () {
                    sletData(index);
                };
            })(i);
            cell4.appendChild(deleteButton);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            tbody.appendChild(row);
        }
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    var tableContainer = document.getElementById("gemt-data-tabel");
    tableContainer.innerHTML = ""; // Clear table contents
    tableContainer.appendChild(table);


    beregnSum();
}


function sletData(index) {
    var data2 = JSON.parse(localStorage.getItem("data2")) || [];
    data2.splice(index, 1); // Fjern element fra arrayet
    localStorage.setItem("data2", JSON.stringify(data2));
    visData(); // Opdater tabellen
}

function beregnSum() {
    var data2 = JSON.parse(localStorage.getItem('data2')) || [];
    var sum = data2.reduce(function(acc, d) {
        return acc + d.lon * d.timer;
    }, 0);
    var sumElement = document.getElementById('sum');
    sumElement.innerHTML = sum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " Kroner";
}

// Get the table element and the toggle button
const table = document.getElementById('gemt-data-tabel');
const toggleBtn = document.getElementById('toggle-btn');

// Set the initial state to hidden
let isTableBodyHidden = false;
toggleTableBody();

// Add click event listener to the toggle button
toggleBtn.addEventListener('click', () => {
    isTableBodyHidden = !isTableBodyHidden;
    toggleTableBody();
});

// Function to toggle the visibility of the table body
function toggleTableBody() {
    const tableBody = table.querySelector('tbody');
    tableBody.querySelectorAll('tr').forEach(row => {
        row.style.display = isTableBodyHidden ? 'none' : 'table-row';
    });
    toggleBtn.textContent = isTableBodyHidden ? 'Show Table' : 'Hide Table';
}



document.getElementById("gem-knap").addEventListener("click", function() {
    isTableBodyHidden = false;
    toggleTableBody();
    beregn();
    visData();
});
visData();

var todayButton = document.getElementById("todayButton");
var datoInput = document.getElementById("dato");

todayButton.addEventListener("click", function() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, "0");
    var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var year = today.getFullYear();

    datoInput.value = `${year}-${month}-${day}`;
});



