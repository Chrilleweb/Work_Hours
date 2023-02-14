window.addEventListener('load', beregnSum);

function beregn() {
    event.preventDefault();
    var dato = document.getElementById("dato").value;
    var timer = document.getElementById("timer").value;
    var lon = document.getElementById("lon").value;
    var resultat = timer * lon;
    document.getElementById("samlet").innerHTML = resultat;

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
    var table = document.getElementById("gemt-data-tabel");
    table.innerHTML = ""; // Clear table contents
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(-1); // Append row to table
        var cell1 = row.insertCell(0); // Insert new cells
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3); // Delete button cell

        cell1.innerHTML = data[i].dato; // Set cell content
        cell2.innerHTML = data[i].timer;
        cell3.innerHTML = data[i].lon;
        cell4.innerHTML = "<button onclick='sletData(" + i + ")'>Slet</button>"; // Set delete button
    }
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
