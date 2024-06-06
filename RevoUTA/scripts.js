fetch('bikesales.json')
.then(response => response.json())
.then(data => {
    // fitur filter dropdown list
    const yearFilter = document.getElementById('yearFilter');
    data.years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    // update total berdasarkan tahun yang dipilih
    function updateTotals(selectedYear) {
        let totalOrderQuantity, totalRevenue, totalProfit;

        if (selectedYear === 'all') {
            totalOrderQuantity = data.orderQuantityByYear.reduce((a, b) => a + b, 0);
            totalRevenue = data.revenueByYear.reduce((a, b) => a + b, 0);
            totalProfit = data.totalProfitBySubCategory.reduce((a, b) => a + b, 0);
        } else {
            const yearIndex = data.years.indexOf(selectedYear);
            totalOrderQuantity = data.orderQuantityByYear[yearIndex];
            totalRevenue = data.revenueByYear[yearIndex];
            totalProfit = data.totalProfitBySubCategory.reduce((a, b) => a + b, 0);
        }

        document.getElementById('totalOrderQuantity').textContent = totalOrderQuantity;
        document.getElementById('totalProfit').textContent = totalProfit;
        document.getElementById('totalRevenue').textContent = totalRevenue;
    }

    // tampilan total
    updateTotals('all');

    // event listener berdasarkan tahun
    yearFilter.addEventListener('change', (event) => {
        const selectedYear = event.target.value;
        updateTotals(selectedYear);
    });

    // membuat dataTable
    const tableBody = document.querySelector('#bikeSalesTable tbody');
    data.years.forEach((year, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${year}</td>
            <td>${data.orderQuantityByYear[index]}</td>
            <td>${data.revenueByYear[index]}</td>
           `;
        tableBody.appendChild(row);
    });

    // Inisiasi DataTable
    $(document).ready(function() {
        $('#bikeSalesTable').DataTable();
    });

    // Chart Order Quantity by Year
    const ctxOrderQuantityByYear = document.getElementById('orderQuantityByYear').getContext('2d');
    new Chart(ctxOrderQuantityByYear, {
        type: 'bar',
        data: {
            labels: data.years,
            datasets: [{
                label: 'Order Quantity by Year',
                data: data.orderQuantityByYear,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Revenue by Year
    const ctxRevenueByYear = document.getElementById('revenueByYear').getContext('2d');
    new Chart(ctxRevenueByYear, {
        type: 'bar',
        data: {
            labels: data.years,
            datasets: [{
                label: 'Revenue by Year',
                data: data.revenueByYear,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Order Quantity by Gender
    const ctxOrderQuantityByGender = document.getElementById('orderQuantityByGender').getContext('2d');
    new Chart(ctxOrderQuantityByGender, {
        type: 'pie',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                label: 'Order Quantity by Gender',
                data: [data.orderQuantityMale, data.orderQuantityFemale],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });

    // Chart Order Quantity by Season
    const ctxOrderQuantityBySeason = document.getElementById('orderQuantityBySeason').getContext('2d');
    new Chart(ctxOrderQuantityBySeason, {
        type: 'bar',
        data: {
            labels: ['Spring', 'Summer', 'Autumn', 'Winter'],
            datasets: [{
                label: 'Order Quantity by Season',
                data: data.orderQuantityBySeason,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Order Quantity by SubCategory
    const ctxOrderQuantityBySubCategory = document.getElementById('orderQuantityBySubCategory').getContext('2d');
    new Chart(ctxOrderQuantityBySubCategory, {
        type: 'bar',
        data: {
            labels: data.subCategories,
            datasets: [{
                label: 'Order Quantity by SubCategory',
                data: data.orderQuantityBySubCategory,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Revenue by SubCategory
    const ctxRevenueBySubCategory = document.getElementById('revenueBySubCategory').getContext('2d');
    new Chart(ctxRevenueBySubCategory, {
        type: 'bar',
        data: {
            labels: data.subCategories,
            datasets: [{
                label: 'Revenue by SubCategory',
                data: data.revenueBySubCategory,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Total Profit by SubCategory
    const ctxTotalProfitBySubCategory = document.getElementById('totalProfitBySubCategory').getContext('2d');
    new Chart(ctxTotalProfitBySubCategory, {
        type: 'bar',
        data: {
            labels: data.subCategories,
            datasets: [{
                label: 'Total Profit by SubCategory',
                data: data.totalProfitBySubCategory,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Order Quantity by Country
    const ctxOrderQuantityByCountry = document.getElementById('orderQuantityByCountry').getContext('2d');
    new Chart(ctxOrderQuantityByCountry, {
        type: 'bar',
        data: {
            labels: data.countries,
            datasets: [{
                label: 'Order Quantity by Country',
                data: data.orderQuantityByCountry,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Revenue by Country
    const ctxRevenueByCountry = document.getElementById('revenueByCountry').getContext('2d');
    new Chart(ctxRevenueByCountry, {
        type: 'bar',
        data: {
            labels: data.countries,
            datasets: [{
                label: 'Revenue by Country',
                data: data.revenueByCountry,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
