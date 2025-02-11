document.addEventListener("DOMContentLoaded", function() {
    // ---------- ตัวแปรและการตั้งค่าเบื้องต้น ----------
    const stations = ["NONG KHEAM", "ON NUT", "BANG KHEN", "LAT KRABANG", "THON BURI"].sort();
    const selectedStationElement = document.getElementById("selectedStation");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const toggleDropdown = document.getElementById("toggleDropdown");
    const stationOptions = document.getElementById("stationOptions");
    const entriesText = document.querySelector('.section_content-center-transactions_pages_text p');
    const paginationContainer = document.querySelector('.section_content-center-transactions_pages_number_group');
    const searchButton = document.getElementById("search");
    const searchContainer = document.querySelector(".section_content-center-search");
    const searchInput = document.getElementById("boxsearch_db");
    const searchDbButton = document.getElementById("search_db");
    const transactionTable = document.getElementById("transactionTable");
    const message = document.getElementById("message");
    var numberTransaction = document.getElementById("transactionNumber");

    let selectedStation = localStorage.getItem("selectedStation") || stations[0];
    selectedStationElement.textContent = selectedStation;
    let currentPage = 1;
    const transactionsPerPage = 10;
    let totalTransactions = 0;

    fetchTransactions(selectedStation);
    Weather(selectedStation)

    // ---------- ฟังก์ชันการจัดการ Dropdown ----------
    function updateStationOptions() {
        stationOptions.innerHTML = "";
        stations.forEach(station => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "section_content-top-details-banner_station-name-dropdown_options_choose";

            const stationName = document.createElement("p");
            stationName.textContent = station;

            if (station === selectedStation) {
                stationName.classList.add("active");
                stationName.style.color = "rgba(217, 217, 217, 1)";
                stationName.style.transform = "none";
            }

            stationName.addEventListener("click", function() {
                selectedStation = station;
                selectedStationElement.textContent = selectedStation;
                localStorage.setItem("selectedStation", selectedStation);
                updateStationOptions();
                dropdownMenu.style.display = "none";
                currentPage = 1;
                fetchTransactions(selectedStation);
                Weather(selectedStation)

            });

            optionDiv.appendChild(stationName);
            stationOptions.appendChild(optionDiv);

            if (station !== stations[stations.length - 1]) {
                const line = document.createElement("div");
                line.className = "section_content-top-details-banner_station-name-dropdown_options_choose_line";
                stationOptions.appendChild(line);
            }
        });
    }

    toggleDropdown.addEventListener("click", function() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(event) {
        if (!dropdownMenu.contains(event.target) && !toggleDropdown.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    updateStationOptions();

    // ---------- ฟังก์ชันการจัดการ Pagination ----------
    function updatePagination(totalTransactions, currentPage = 1) {
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
                fetchTransactions(selectedStation, currentPage);
            });

            paginationContainer.appendChild(pageBox);
        }

        const startEntry = (currentPage - 1) * transactionsPerPage + 1;
        const endEntry = Math.min(currentPage * transactionsPerPage, totalTransactions);
        entriesText.textContent = `Showing ${startEntry} to ${endEntry} of ${totalTransactions} entries`;
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
                fetchTransactions(selectedStation, currentPage);
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

    // ---------- ฟังก์ชันการดึงข้อมูลทั้งหมดจาก MySQL ----------
    let allTransactions = []; // เก็บข้อมูลทั้งหมดจาก fetchTransactions
    let filteredTransactions = []; // เก็บข้อมูลที่กรองจากการค้นหา
    let isSearching = false; // ตัวแปรเพื่อตรวจสอบว่ากำลังค้นหาหรือไม่
    
    function fetchTransactions(station, page = 1) {
        const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
        currentPage = page;
    
        fetch(`http://localhost:3000/get-transaction_${stationUrl}`)
            .then(response => response.json())
            .then(data => {
                
                data.sort((a, b) => {
                    const [dayA, monthA, yearA] = a.DATE.split('/');
                    const [dayB, monthB, yearB] = b.DATE.split('/');
                    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
                    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
                    return dateB - dateA;
                });
                
                allTransactions = data; // เก็บข้อมูลทั้งหมด
                filteredTransactions = allTransactions; // ตั้งค่าเริ่มต้นของข้อมูลที่กรองให้เท่ากับข้อมูลทั้งหมด
                numberTransaction.innerHTML = filteredTransactions.length
                displayTransactions(filteredTransactions, currentPage); // แสดงข้อมูลทั้งหมดในหน้าที่เลือก
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    
    // ---------- ฟังก์ชันการค้นหาและกรองข้อมูล ----------
    function searchTransactions(page = 1) {
        const searchTerm = searchInput.value.trim().toLowerCase(); // ตัวกรองที่ผู้ใช้พิมพ์
        let formattedDate = '';
    
        // หากไม่มีคำค้นหา ให้แสดงข้อมูลทั้งหมด
        if (searchTerm === "") {
            isSearching = false; // ตั้งค่าว่าหยุดการค้นหา
            displayTransactions(allTransactions, 1); // แสดงข้อมูลทั้งหมดในหน้าที่ 1
            return;
        }
    
        // แปลงรูปแบบวันที่ให้ตรงกับข้อมูล
        if (/\d{2}\/\d{2}\/\d{4}/.test(searchTerm)) {
            const [day, month, year] = searchTerm.split('/');
            formattedDate = `${day}/${month}/${year}`;
        }
    
        // กรองข้อมูลจาก allTransactions ตามวันที่หรือ VEHICLE_ID
        filteredTransactions = allTransactions.filter(transaction => {
            console.log(transaction.VEHICLE_ID)
            console.log(transaction);  // ดูข้อมูลทั้งชุดเพื่อหาว่ามี VEHICLE_ID หรือไม่

            const isDateMatch = formattedDate && transaction.DATE === formattedDate;
            const isVehicleIdMatch = searchTerm && (transaction.VEHICLE_ID?.toLowerCase().includes(searchTerm) || false);
            return isDateMatch || isVehicleIdMatch;
        });
    
        isSearching = true; // กำลังค้นหา
        displayTransactions(filteredTransactions, page); // แสดงข้อมูลที่กรองพร้อมแบ่งหน้า
    }
    
    // ---------- ฟังก์ชันแสดงข้อมูลและแบ่งหน้า ----------
    function displayTransactions(transactions, page) {
        const start = (page - 1) * transactionsPerPage;
        const end = start + transactionsPerPage;
        const pageTransactions = transactions.slice(start, end);
    
        transactionTable.innerHTML = ''; // ล้างข้อมูลในตารางก่อน
    
        if (pageTransactions.length === 0) {
            message.textContent = "No data found for the provided date (DD/MM/YYYY) or vehicle ID.";
            message.style.marginTop = "2rem";
            message.style.textAlign = "center";
            message.style.display = "block";
            return;
        }
    
        message.style.display = "none"; // ซ่อนข้อความถ้ามีข้อมูล
    
        pageTransactions.forEach(transaction => {
            const row = document.createElement('div');
            row.classList.add('section_content-center-transactions_details');
            row.innerHTML = `
                <div>${transaction.DATE}</div>
                <div>${transaction['CHARGER_ID']}</div>
                <div>${transaction.CONNECTOR}</div>
                <div>${transaction['VEHICLE_ID']}</div>
                <div>${transaction['START_TIME']}</div>
                <div>${transaction['END_TIME']}</div>
                <div>${transaction.DURATION}</div>
                <div>${transaction.STATUS}</div>
                <div>${transaction.ENERGY}</div>
                <div>${transaction['START_SOC']}</div>
                <div>${transaction['SOC']}</div>
                <div>${transaction['END_SOC']}</div>
                <div>${transaction.COST}</div>
            `;
            transactionTable.appendChild(row);
        });
    
        updatePagination(transactions.length, page); // อัปเดต pagination ตามข้อมูลที่กรอง
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
    
    // โหลดข้อมูลทั้งหมดของสถานีเริ่มต้น
    fetchTransactions(selectedStation);
    
});
