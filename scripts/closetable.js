
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table');
document.getElementById('tableNum').textContent = tableNumber;


const mockData = {
    items: [
        { name: "Margherita Pizza", category: "Main Course", price: 14.99, quantity: 2 },
        { name: "Caesar Salad", category: "Starters", price: 8.99, quantity: 1 },
        { name: "Grilled Salmon", category: "Main Course", price: 24.99, quantity: 1 },
        { name: "Garlic Bread", category: "Sides", price: 4.99, quantity: 2 },
        { name: "Tiramisu", category: "Desserts", price: 7.99, quantity: 1 },
        { name: "Coca-Cola", category: "Beverages", price: 2.99, quantity: 3 }
    ]
};

let tableData = null;
let orders = [];

document.addEventListener("DOMContentLoaded", () => {
    const ordersData = localStorage.getItem('ordersData');
    console.log('Orders from localStorage:', ordersData);
    
    if (ordersData) {
        orders = JSON.parse(ordersData);
        console.log('Parsed orders:', orders);
        console.log('Looking for table:', tableNumber, 'type:', typeof tableNumber);
        
        // Converter tableNumber comparação melhor
        tableData = orders.find(order => {
            console.log('Comparing with order.table:', order.table, 'type:', typeof order.table);
            return order.table.toString() === tableNumber.toString();
        });
        
        if (tableData) {
            console.log('Found table data:', tableData);
            updateDisplay();
        } else {
            console.log(`No data found for table ${tableNumber}`);
            // Optionally fall back to mock data
            updateDisplay();
        }
    } else {
        console.log("No orders found in Local Storage.");
        updateDisplay();
    }
});

console.log(tableData.items);




function updateDisplay() {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';
    let total = 0;


    tableData.items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-card';
        itemElement.innerHTML = `
            <div class="item-header">
                <div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-category">${item.category}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="item-price">$${itemTotal.toFixed(2)}</div>
        `;
        container.appendChild(itemElement);
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function updateQuantity(index, change) {
    const newQuantity = tableData.items[index].quantity + change;
    if (newQuantity >= 0) {
        tableData.items[index].quantity = newQuantity;
        if (newQuantity === 0) {
            tableData.items.splice(index, 1);
        }
        updateDisplay();
    }
}

function closeTable() {
    // Remove de activeTables
    const activeTablesData = JSON.parse(localStorage.getItem('activeTablesData')) || [];
    const updatedActiveTables = activeTablesData.filter(table => table.number.toString() !== tableNumber.toString());
    localStorage.setItem('activeTablesData', JSON.stringify(updatedActiveTables));
    
    // Remove de ordersData
    const ordersData = JSON.parse(localStorage.getItem('ordersData')) || [];
    const updatedOrders = ordersData.filter(order => order.table.toString() !== tableNumber.toString());
    localStorage.setItem('ordersData', JSON.stringify(updatedOrders));
    
 
    window.location.href = 'checkout.html';
}
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = link.getAttribute('href');
        });
    });
});
// Initial display
updateDisplay();