        // Sample data - in a real app this would come from your backend
        let activeTables = [];
        document.addEventListener("DOMContentLoaded", () => {
            const activeTablesData = localStorage.getItem('activeTablesData');
            const ordersData = localStorage.getItem('ordersData');
            
            if (activeTablesData) {
                activeTables = JSON.parse(activeTablesData);
                
                // Filter out tables that have no active orders
                if (ordersData) {
                    const orders = JSON.parse(ordersData);
                    activeTables = activeTables.filter(table => 
                        orders.some(order => order.table.toString() === table.number.toString())
                    );
                    // Save the filtered active tables
                    localStorage.setItem('activeTablesData', JSON.stringify(activeTables));
                }
                
                updateDisplay();
            } else {
                console.log("No active tables found in Local Storage.");
                activeTables = [];
            }
        });

        function getTimeElapsed(openTime) {
            const now = new Date();
            const diffInMinutes = Math.floor((now - new Date(openTime)) / 60000);
            
            if (diffInMinutes < 60) {
                return `${diffInMinutes}m`;
            } else {
                const hours = Math.floor(diffInMinutes / 60);
                const minutes = diffInMinutes % 60;
                return `${hours}h ${minutes}m`;
            }
        }

        function createTableCard(table) {
            return `
                <div class="table-card" onclick="navigateToCloseTable(${table.number})">
                    <div class="table-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="table-number">Table ${table.number}</div>
                    <div class="active-time">Open: ${getTimeElapsed(table.openTime)}</div>
                </div>
            `;
        }

        function updateDisplay() {
            const container = document.getElementById('tables-container');
            container.innerHTML = activeTables.map(table => createTableCard(table)).join('');
            document.getElementById('table-count').textContent = activeTables.length;
        }

        function navigateToCloseTable(tableNumber) {
            // In a real app, you might want to pass more data in the URL
            window.location.href = `closetable.html?table=${tableNumber}`;
        }

        // Update times every minute
        setInterval(() => {
            updateDisplay();
        }, 60000);

        // Initial display
        updateDisplay();

        // Simulate loading new tables (in a real app, this would be an API call)
        function checkForNewTables() {
            // This is where you'd normally make an API call to check for updates
            console.log('Checking for table updates...');
        }

        // Check for updates every 30 seconds
        setInterval(checkForNewTables, 30000);

        // Add this function to handle sidebar navigation
function navigateTo(path, event) {
    if (event) {
        event.preventDefault();
    }
    window.location.href = path;
}