
fetch('http://localhost:3000/ordersData')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('ordersData', JSON.stringify(data));  
  })
  .catch(error => console.error('Error fetching data:', error));


fetch('http://localhost:3000/activeTables')
.then(response => response.json())
.then(data => {
  localStorage.setItem('activeTablesData', JSON.stringify(data));  
})
.catch(error => console.error('Error fetching data:', error));