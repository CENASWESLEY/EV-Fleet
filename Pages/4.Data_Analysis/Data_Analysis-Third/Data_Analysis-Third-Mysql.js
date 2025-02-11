document.addEventListener("DOMContentLoaded", function() {
    // ---------- ตัวแปรและการตั้งค่าเบื้องต้น ----------
    const stations = ["NONG KHEAM", "ON NUT", "BANG KHEN", "LAT KRABANG", "THON BURI"].sort();
    const selectedStationElement = document.getElementById("selectedStation");
  
    const paginationContainer = document.querySelector('.section_content-center-transactions_pages_number_group');
    const searchButton = document.getElementById("search");
    const searchContainer = document.querySelector(".section_content-center-search");
    const searchInput = document.getElementById("boxsearch_db");
    const searchDbButton = document.getElementById("search_db");
    const transactionTable = document.getElementById("transactionTable");
    const message = document.getElementById("message");
    const entriesText = document.getElementById("entriesText");
    
    let currentPage = 1;
    const transactionsPerPage = 10;

    // ---------- ฟังก์ชันการจัดการ Pagination ----------
    function updatePagination(totalTransactions, currentPage = 1) {
        // ตรวจสอบว่ามีอีลีเมนต์ก่อนที่จะอัปเดต
        if (paginationContainer) {
            paginationContainer.innerHTML = '';
            const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
    
            let startPage, endPage;
            if (totalPages <= 10) {
                startPage = 1;
                endPage = totalPages;
            } else {
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }
    
            for (let i = startPage; i <= endPage; i++) {
                const pageBox = document.createElement("div");
                pageBox.className = "section_content-center-transactions_pages_number_group_box";
                pageBox.innerHTML = `<p>${i}</p>`;
    
                if (i === currentPage) {
                    pageBox.classList.add("active_page");
                }
    
                pageBox.addEventListener("click", function() {
                    currentPage = i;
                    fetchTransactions(currentPage);
                });
    
                paginationContainer.appendChild(pageBox);
            }
    
            // ตรวจสอบว่ามีอีลีเมนต์ entriesText ก่อนการอัปเดต
            if (entriesText) {
                const startEntry = (currentPage - 1) * transactionsPerPage + 1;
                const endEntry = Math.min(currentPage * transactionsPerPage, totalTransactions);
                entriesText.textContent = `Showing ${startEntry} to ${endEntry} of ${totalTransactions} entries`;
            }
        }
    }
    

    function changePage(delta) {
        const totalItems = isSearching ? filteredTransactions.length : allTransactions.length; // ตรวจสอบจำนวนรายการทั้งหมดหรือรายการที่กรอง
        const totalPages = Math.ceil(totalItems / transactionsPerPage);
        const newPage = Math.max(1, Math.min(totalPages, currentPage + delta));
        if (newPage !== currentPage) {
            currentPage = newPage;
            
            // แสดงข้อมูลที่กรองหากกำลังค้นหาอยู่ มิฉะนั้นแสดงข้อมูลทั้งหมด
            if (isSearching) {
                displayTransactions(filteredTransactions, currentPage);
            } else {
                fetchTransactions(currentPage);
            }
        }
    }

    document.getElementById("next_page").addEventListener("click", function() {
        changePage(1);
    });

    document.getElementById("next_multipage").addEventListener("click", function() {
        changePage(10);
    });

    document.getElementById("previous_page").addEventListener("click", function() {
        changePage(-1);
    });

    document.getElementById("previous_multipage").addEventListener("click", function() {
        changePage(-10);
    });

    // ---------- ฟังก์ชันการดึงข้อมูล ----------
    let allTransactions = [];
    let filteredTransactions = [];
    let isSearching = false;

    function fetchTransactions(page = 1) {
        const pageParam = `page=${page}`;
        const searchTerm = searchInput.value.trim().toLowerCase();
        const fetchPromises = stations.map(station => {
            const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
            const url = `http://localhost:3000/get-data_analysis_${stationUrl}?${pageParam}&searchTerm=${encodeURIComponent(searchTerm)}`;
            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    return data.map(transaction => {
                        // Add station as a field for filtering
                        transaction['STATION'] = station;
                        return transaction;
                    });
                });
        });

        Promise.all(fetchPromises)
            .then(results => {
                allTransactions = results.flat();
                filteredTransactions = allTransactions;
                displayTransactions(filteredTransactions, page);
                calculateSummaries(filteredTransactions)
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // ---------- ฟังก์ชันการค้นหา ----------
    function searchTransactions(page = 1) {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === "") {
            isSearching = false;
            displayTransactions(allTransactions, page);
            return;
        }

        filteredTransactions = allTransactions.filter(transaction => {
            const isDateMatch = transaction.DATE && transaction.DATE.toLowerCase().includes(searchTerm);
            const isStationMatch = transaction['STATION'].toLowerCase().includes(searchTerm);
            const isChargerIdMatch = transaction['CHARGER_ID'].toString().includes(searchTerm);
            return isDateMatch || isStationMatch || isChargerIdMatch;
        });

        isSearching = true;
        displayTransactions(filteredTransactions, page);
    }

    searchDbButton.addEventListener("click", function() {
        searchTransactions();
    });

    searchInput.addEventListener("input", function() {
        searchTransactions();
    });

    // ---------- ฟังก์ชันแสดงข้อมูล ----------
    function displayTransactions(transactions, page) {
        const start = (page - 1) * transactionsPerPage;
        const end = start + transactionsPerPage;
        const pageTransactions = transactions.slice(start, end);

        transactionTable.innerHTML = '';

        if (pageTransactions.length === 0) {
            message.textContent = "No data found for the provided date (DD/MM/YYYY) or Station.";
            message.style.marginTop = "2rem";
            message.style.textAlign = "center";
            message.style.display = "block";
            return;
        }

        message.style.display = "none";

        pageTransactions.forEach(transaction => {
            const row = document.createElement('div');
            row.classList.add('section_content-center-transactions_details');
            row.innerHTML = `
                <div>${transaction.DATE}</div>
                <div>${transaction['STATION']}</div>
                <div>${transaction['CHARGER_ID']}</div>
                <div>${transaction['CONNECTOR_ID']}</div>
                <div>${transaction['DURATION']}</div>
                <div>${transaction['ENERGY']}</div>
                <div>${transaction['CHARGING_REVENUE']}</div>
                <div>${transaction['ELECTRICITY_COST']}</div>
                <div>${transaction['OPERATIONAL_PROFIT']}</div>
                <div>${transaction['CARBON_SAVINGS']}</div>
                <div>${transaction['RENEWABLE_ENERGY_RATIO']}</div>
            `;
            transactionTable.appendChild(row);
        });

        updatePagination(transactions.length, page);
    }
    // กดปุ่ม #search เพื่อแสดง .section_content-center-search
    searchButton.addEventListener("click", function() {
        searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
    });
    
    // กดปุ่ม #search_db เพื่อกรองข้อมูลที่ดึงมา
    searchDbButton.addEventListener("click", function() {
        searchTransactions(); // เรียกฟังก์ชันกรองข้อมูลและแสดงข้อมูลหน้าที่ 1
    });
    
    // เมื่อผู้ใช้พิมพ์ใน #boxsearch_db จะเริ่มกรองข้อมูลทันทีและแสดงข้อมูลหน้าที่ 1
    searchInput.addEventListener("input", function() {
        searchTransactions(); // เรียกฟังก์ชันกรองข้อมูล
    });
    
    // คลิกที่ใดๆ บนหน้าเว็บนอก searchContainer เพื่อปิดการค้นหา
    document.addEventListener("click", function(event) {
        if (isSearching && !searchContainer.contains(event.target) && event.target !== searchButton) {
            searchContainer.style.display = "none";
            isSearching = false;
        }
    });

    // Summary Functions
function calculateSummaries(filteredData) {
    // รวมค่า ต่าง ๆ
    const energySummary = filteredData.reduce((acc, record) => acc + parseFloat(record.ENERGY?.replace(' kWh', '') || 0), 0).toFixed(2);
    const financialSummary = filteredData.reduce((acc, record) => acc + parseFloat(record.CHARGING_REVENUE?.replace('฿', '') || 0), 0).toFixed(2);
    const greenSummary = filteredData.reduce((acc, record) => acc + parseFloat(record.CARBON_SAVINGS?.replace(' kg', '') || 0), 0).toFixed(2);
    // อัปเดต HTML
    document.getElementById("Energy_Summary").innerText = `${energySummary} kWh`;
    document.getElementById("Financial_Summary").innerText = `฿ ${financialSummary}`;
    document.getElementById("Green_Summary").innerText = `${greenSummary} kg`;
}


    // ---------- เริ่มดึงข้อมูลเมื่อเริ่มใช้งาน ----------
    fetchTransactions();
});
