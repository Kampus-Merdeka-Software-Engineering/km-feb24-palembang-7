// script.js
document.addEventListener("DOMContentLoaded", function() {
    loadData(); // Load initial data
    
    document.getElementById("filterForm").addEventListener("submit", function(event) {
        event.preventDefault();
        applyFilter();
    });
});

function loadData() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => displayData(data));
}

function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");
    // Clear previous data
    dataContainer.innerHTML = "";

    data.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.textContent = `${item.name} - ${item.value}`;
        dataContainer.appendChild(itemElement);
    });
}

function applyFilter() {
    const category = document.getElementById("category").value;
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            if (category !== "all") {
                data = data.filter(item => item.category === category);
            }
            displayData(data);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const myChart = document.getElementById("bikechart").getContext("2d");
    new Chart(myChart, {
        type: "bar",
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        }
    });
});
