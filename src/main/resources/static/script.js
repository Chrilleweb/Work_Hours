window.addEventListener('load', beregnSum);

function beregn() {
    event.preventDefault();
    var dato = document.getElementById("dato").value;
    var timer = document.getElementById("timer").value;
    var lon = document.getElementById("lon").value;
    var resultat = timer * lon;
    document.getElementById("samlet").innerHTML = resultat + " Kroner";

    // Gem data i local storage
    var data = JSON.parse(localStorage.getItem("data")) || [];
    data.push({dato: dato, timer: timer, lon: lon});
    localStorage.setItem("data", JSON.stringify(data));

    // Opdater seneste gemte data
    var seneste = data[data.length - 1];
    document.getElementById("gemtDato").innerHTML = seneste.dato;
    document.getElementById("gemtTimer").innerHTML = seneste.timer;
    document.getElementById("gemtLon").innerHTML = seneste.lon;
}

function visData() {
    var data = JSON.parse(localStorage.getItem("data")) || [];
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
    header4.innerHTML = "Delete";
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    headerRow.appendChild(header3);
    headerRow.appendChild(header4);
    thead.appendChild(headerRow);

    // Add table body rows
    for (var i = 0; i < data.length; i++) {
        if (data[i].timer.trim() !== "" && data[i].lon.trim() !== "") {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        cell1.innerHTML = data[i].dato;
        var cell2 = document.createElement("td");
        cell2.innerHTML = data[i].timer;
        var cell3 = document.createElement("td");
        cell3.innerHTML = data[i].lon;
        var cell4 = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
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
    var data = JSON.parse(localStorage.getItem("data")) || [];
    data.splice(index, 1); // Fjern element fra arrayet
    localStorage.setItem("data", JSON.stringify(data));
    visData(); // Opdater tabellen
}

function beregnSum() {
    var data = JSON.parse(localStorage.getItem('data')) || [];
    var sum = data.reduce(function(acc, d) {
        return acc + d.lon * d.timer;
    }, 0);
    var sumElement = document.getElementById('sum');
    sumElement.innerHTML = sum.toFixed(2);
}

document.getElementById("beregn-knap").addEventListener("click", beregn);
document.getElementById("gem-knap").addEventListener("click", visData);
visData();