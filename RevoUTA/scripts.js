fetch('bikesales.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('orderQuantity').innerText = data.orderQuantity.reduce((a, b) => a + b, 0);
        document.getElementById('profit').innerText = data.profit.reduce((a, b) => a + b, 0).toLocaleString();
        document.getElementById('revenue').innerText = data.revenue.reduce((a, b) => a + b, 0).toLocaleString();

        const ctx1 = document.getElementById('barChart1').getContext('2d');
        const barChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: data.months,
                datasets: [{
                    label: 'Order Quantity',
                    data: data.orderQuantity,
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

        const ctx2 = document.getElementById('pieChart').getContext('2d');
        const pieChart = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: data.categories,
                datasets: [{
                    label: 'Revenue by Category',
                    data: data.revenueByCategory,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
        });

        const ctx3 = document.getElementById('lineChart').getContext('2d');
        const lineChart = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: data.months,
                datasets: [{
                    label: 'Total Order Quantity',
                    data: data.orderQuantity,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            }
        });

        const ctx4 = document.getElementById('barChart2').getContext('2d');
        const barChart2 = new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: data.categories,
                datasets: [{
                    label: 'Order Quantity by Category',
                    data: data.orderByCategory,
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

        const ctx5 = document.getElementById('barChart3').getContext('2d');
        const barChart3 = new Chart(ctx5, {
            type: 'bar',
            data: {
                labels: data.categories,
                datasets: [{
                    label: 'Revenue',
                    data: data.revenueByCategory,
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

        const ctx6 = document.getElementById('lineChart2').getContext('2d');
        const lineChart2 = new Chart(ctx6, {
            type: 'line',
            data: {
                labels: data.months,
                datasets: [{
                    label: 'Order Quantity',
                    data: data.orderQuantity,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    tension: 0.1
                }]
            }
        });
    });
