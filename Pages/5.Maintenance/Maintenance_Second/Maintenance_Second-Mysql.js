document.addEventListener("DOMContentLoaded", function () {
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
    const addTransactionPopup = document.querySelector(".section_content-center-transactions_add-popup");
    let idTransaction = document.getElementById("idTransaction");

    let selectedStation = localStorage.getItem("selectedStation") || stations[0];
    selectedStationElement.textContent = selectedStation;
    Weather(selectedStation)
    let currentPage = 1;
    const transactionsPerPage = 10;
    let totalTransactions = 0;
    let editMode = false;
    let editTransactionId = null;
    let allTransactions = []; // เก็บข้อมูลทั้งหมดจาก fetchTransactions
    let filteredTransactions = []; // เก็บข้อมูลที่กรองจากการค้นหา
    let isSearching = false; // ตัวแปรเพื่อตรวจสอบว่ากำลังค้นหาหรือไม่
    let numberTransaction = 0;


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

            stationName.addEventListener("click", function () {
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

    toggleDropdown.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
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

            pageBox.addEventListener("click", function () {
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

    document.getElementById("next_page").addEventListener("click", function () {
        changePage(1);
    });

    document.getElementById("next_multipage").addEventListener("click", function () {
        changePage(10);
    });

    document.getElementById("previous_page").addEventListener("click", function () {
        changePage(-1);
    });

    document.getElementById("previous_multipage").addEventListener("click", function () {
        changePage(-10);
    });

    // ---------- ฟังก์ชันการดึงข้อมูลทั้งหมดจาก MySQL ----------
    function fetchTransactions(station, page = 1) {
        const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
        currentPage = page;
        numberTransaction = 0;

        fetch(`http://localhost:3000/get-maintenance_history_${stationUrl}`)
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
                displayTransactions(filteredTransactions, currentPage); // แสดงข้อมูลทั้งหมดในหน้าที่เลือก

                idTransaction = data.ID;

                numberTransaction = allTransactions.length;
                updateStatusCounts();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    
          //นับจำนวนตัวเลขสถานะ
          function updateStatusCounts() {
            const transactionElement = document.getElementById("numberTransaction");
        
            // ใช้ padStart เพื่อให้เลขเป็น 2 หลัก
            const formattedTransaction = String(numberTransaction).padStart(2, '0');
    
            // อัปเดตค่าจำนวนสถานะ
            if (transactionElement) {
                transactionElement.textContent = formattedTransaction;
            }

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
            const isDateMatch = formattedDate && transaction.DATE === formattedDate;
            const isChargerMatch = searchTerm && transaction.CHARGER_ID.toLowerCase().includes(searchTerm);

            return isDateMatch || isChargerMatch;
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
            message.textContent = "No data found for the provided date (DD/MM/YYYY)";
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
                <div>${transaction.DATE.split('-').reverse().join('/')}</div>
                <div>${transaction['CHARGER_ID'] || '01'}</div>
                <div>${transaction['CONNECTOR_ID'] || '1'}</div>
                <div>${transaction['ISSUE']}</div>
                <div>${transaction['START_TIME']}</div>
                <div>${transaction['END_TIME']}</div>
                <div>${transaction.DURATION}</div>
                <div>${transaction['TECHNICAL']}</div>
                <div>${transaction['STATUS']}</div>
                <div>${transaction['END_DATE'].split('-').reverse().join('/')}</div>
                <i class="fa-solid fa-ellipsis" onclick="window.showDropdownMenu(event, ${transaction['ID']})"></i>
            `;
            transactionTable.appendChild(row);
        });

        updatePagination(transactions.length, page); // อัปเดต pagination ตามข้อมูลที่กรอง
        
    }

    // กดปุ่ม #search เพื่อแสดง .section_content-center-search
    searchButton.addEventListener("click", function () {
        searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
    });

    // กดปุ่ม #search_db เพื่อกรองข้อมูลที่ดึงมา
    searchDbButton.addEventListener("click", function () {
        searchTransactions(); // เรียกฟังก์ชันกรองข้อมูลและแสดงข้อมูลหน้าที่ 1
    });

    // เมื่อผู้ใช้พิมพ์ใน #boxsearch_db จะเริ่มกรองข้อมูลทันทีและแสดงข้อมูลหน้าที่ 1
    searchInput.addEventListener("input", function () {
        searchTransactions(); // เรียกฟังก์ชันกรองข้อมูล
    });

    // คลิกที่ใดๆ บนหน้าเว็บนอก searchContainer เพื่อปิดการค้นหา
    document.addEventListener("click", function (event) {
        if (isSearching && !searchContainer.contains(event.target) && event.target !== searchButton) {
            searchContainer.style.display = "none";
            isSearching = false;
        }
    });


      // ---------- ฟังก์ชันดึงข้อมูลสิทธิ์ผู้ใช้ ----------
      async function fetchUserRole() {
        const token = localStorage.getItem('token');
        const parsedToken = token;
    
        try {
            const response = await fetch('http://localhost:4000/auth/profile', {
                method: 'GET',
                credentials: 'include', // ส่งข้อมูล session ไปด้วย
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedToken}` // ส่ง JWT ใน Header
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user role');
            }

            const userProfile = await response.json();
            return userProfile.role; // สมมติว่าข้อมูล role อยู่ใน response
        } catch (error) {
            console.error('Error fetching user role:', error);
            return null;
        }
    }

        // ---------- กดปุ่มเพิ่ม Transaction ----------
        document.getElementById("addTransaction").addEventListener("click", async function () {
            const userRole = await fetchUserRole();
            //console.log("User role fetched:", userRole);

            if (userRole !== 'admin') {
                alert("Access denied. Only admins can add transactions.");
                return;
            }
            addTransactionPopup.style.display = "block";
            editMode = false;
        });
    

    // ---------- ฟังก์ชันแสดงเมนู Dropdown ใหม่ ----------

    window.showDropdownMenu = async function (event, transactionId) {
        const userRole = await fetchUserRole();

        // ลบ dropdownMenuNew ที่มีอยู่ก่อนหน้า
        const existingDropdown = document.querySelector('.section_content-center-transactions_dropdown_menu');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        // สร้าง dropdownMenuNew ขึ้นมาใหม่ทุกครั้งที่คลิก
        const dropdownMenuNew = document.createElement('div');
        dropdownMenuNew.className = 'section_content-center-transactions_dropdown_menu';
        dropdownMenuNew.innerHTML = `
                                <div class="section_content-center-transactions_dropdown_menu_id">
                                    <p>ID</p>
                                    <p id="idTransaction">${transactionId}</p>
                                </div>
                                <p id="edit">Edit</p>
                                <p id="delete">Delete</p>
        `;
        document.body.appendChild(dropdownMenuNew);

        dropdownMenuNew.style.position = 'absolute';
        dropdownMenuNew.style.display = 'grid';
        dropdownMenuNew.style.margin = '-0.5rem 0 0 1rem';
        dropdownMenuNew.style.left = `${event.clientX}px `;
        dropdownMenuNew.style.top = `${event.clientY}px`;
        editTransactionId = transactionId;

        function handleClickOutside(event) {
            if (!dropdownMenuNew.contains(event.target)) {
                dropdownMenuNew.remove();
                document.removeEventListener('click', handleClickOutside);
            }
        }

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        dropdownMenuNew.addEventListener("click", async function (event) {
            const action = event.target.id;

            if (action === "edit") {
                if (userRole !== 'manager' && userRole !== 'admin') {
                    alert("Access denied. Only managers or admins can edit transactions.");
                    return;
                }

                // กรอกข้อมูลสำหรับการแก้ไข
                const transactionData = allTransactions.find(tx => tx.ID === editTransactionId);
                fillEditForm(transactionData);
                editMode = true;
                dropdownMenuNew.remove();
                addTransactionPopup.style.display = "block";
            }

            if (action === "delete") {
                if (userRole !== 'admin') {
                    alert("Access denied. Only admins can delete transactions.");
                    return;
                }

                // ลบข้อมูล transaction
                const stationUrl = selectedStation.toLowerCase().replace(/\s+/g, '_');
                fetch(`http://localhost:3000/delete-maintenance_history_${stationUrl}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: editTransactionId }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Delete Success", data);
                        fetchTransactions(selectedStation);
                    })
                    .catch(error => console.error("Error deleting data:", error));
                dropdownMenuNew.remove();
            }
        });
    };


    // ----------------- การเพิ่มและแก้ไขข้อมูล transaction -----------------
    function fillEditForm(transaction) {
        
        document.getElementById("date").value = transaction.DATE;
        document.getElementById("chargernew").value = transaction.CHARGER_ID;
        document.getElementById("connector").value = transaction.CONNECTOR_ID;
        document.getElementById("issue").textContent = transaction.ISSUE;
        document.getElementById("start_time").value = transaction.START_TIME;
        document.getElementById("end_time").value = transaction.END_TIME;
        document.getElementById("duration").textContent = transaction.DURATION;
        document.getElementById("technical").textContent = transaction.TECHNICAL;
        document.getElementById("status").textContent = transaction.STATUS;
        document.getElementById("end_date").value = transaction.END_DATE;
    }

    document.getElementById("submit").addEventListener("click", function () {
        const formData = getFormData();
        console.log("Form data:", formData);
    
        // ตรวจสอบว่ามีข้อมูลครบหรือไม่
        if (!formData.DATE || !formData.CHARGER_ID || !formData.CONNECTOR_ID || !formData.START_TIME || !formData.END_TIME || !formData.END_DATE) {
            alert("Please fill in all the fields.");
            return; // หยุดการทำงานหากข้อมูลไม่ครบ
        }
        
    
        // ตรวจสอบว่า CHARGER_ID ต้องเป็นตัวเลข 2 หลักหรือไม่
        const chargerId = formData.CHARGER_ID;
        if (!/^\d{2}$/.test(chargerId)) {
            alert("Charger ID must be a two-digit number between 01 and 11.");
            return;
        }
    
        const connectorId = parseInt(formData.CONNECTOR_ID, 10);
        if (connectorId < 1 || connectorId > 2) {
            alert("Connector ID must be between 1 and 2.");
            return;
        }
    
        if (!formData.START_TIME || !formData.END_TIME) {
            alert("Please fill in both start time and end time.");
            return;
        }
    
        // เตรียมข้อมูลก่อนส่งไปยัง server
        const stationUrl = selectedStation.toLowerCase().replace(/\s+/g, '_');
        if (editMode) {
            formData.id = editTransactionId;
            fetch(`http://localhost:3000/put-maintenance_history_${stationUrl}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Update Success", data);
                    fetchTransactions(selectedStation);
                })
                .catch(error => console.error("Error updating data:", error));
        } else {
            fetch(`http://localhost:3000/post-maintenance_history_${stationUrl}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Add Success", data);
                    fetchTransactions(selectedStation);
                })
                .catch(error => console.error("Error adding data:", error));
        }
    
        addTransactionPopup.style.display = "none";
        editMode = false;
    });
    
    // ฟังก์ชันดึงข้อมูลจากฟอร์ม
    function getFormData() {
        const startTime = document.getElementById("start_time")?.value;
        const endTime = document.getElementById("end_time")?.value;
        const chargerElement = document.getElementById("chargernew");
        const chargerId = chargerElement ? chargerElement.value.trim() : "";  // ตรวจสอบก่อนใช้ .trim()
    
        const formData = {
            DATE: document.getElementById("date")?.value,
            CHARGER_ID: chargerId,  // ค่าที่ได้จาก input chargernew
            CONNECTOR_ID: document.getElementById("connector")?.value,
            ISSUE: document.getElementById("issue").textContent,
            START_TIME: startTime,
            END_TIME: endTime,
            DURATION: calculateDuration(startTime, endTime),
            TECHNICAL: document.getElementById("technical").textContent,
            STATUS: document.getElementById("status").textContent,
            END_DATE: document.getElementById("end_date")?.value,
        };
    
        // แปลงวันที่เป็นรูปแบบ DD/MM/YYYY
        if (formData.DATE) {
            formData.DATE = formatDate(formData.DATE); // ใช้ฟังก์ชัน formatDate เพื่อแปลง
        }

        if (formData.END_DATE) {
            formData.END_DATE = formatDate(formData.END_DATE); // แปลงเป็นรูปแบบเดียวกัน
        }

    
        return formData;
    }
    
    // ----------------- การปิดฟอร์มการเพิ่ม/แก้ไข -----------------
    document.getElementById("close").addEventListener("click", function () {
        addTransactionPopup.style.display = "none";
        editMode = false;
    });
    
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-'); // แยกปี เดือน วันที่
        return `${day}/${month}/${year}`; // เปลี่ยนเป็น DD/MM/YYYY
    }
    
    
    function calculateDuration(startTime, endTime) {
        if (!startTime || !endTime) return '00:00:00'; // ตรวจสอบว่า start_time หรือ end_time เป็นค่าว่างหรือไม่
    
        const startDateTime = new Date(`1970-01-01T${startTime}Z`); // ค่าที่ได้จาก start_time จะต้องเป็นแบบ "HH:MM:SS"
        const endDateTime = new Date(`1970-01-01T${endTime}Z`); // ค่าที่ได้จาก end_time จะต้องเป็นแบบ "HH:MM:SS"
        
        const durationMs = endDateTime - startDateTime; // คำนวณความต่างระหว่างเวลา
        if (durationMs < 0) return '00:00:00'; // ถ้า duration เป็นลบ แสดงว่าเวลาไม่ถูกต้อง
    
        const days = Math.floor(durationMs / (1000 * 60 * 60 * 24)); // คำนวณจำนวนวัน
        const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // คำนวณชั่วโมง
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60)); // คำนวณนาที
        const seconds = Math.floor((durationMs % (1000 * 60)) / 1000); // คำนวณวินาที
    
        // สร้างสตริงระยะเวลาในรูปแบบ "วัน ชั่วโมง:นาที:วินาที"
        const duration = `${days > 0 ? days + 'd ' : ''}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return duration;
    }
    


    // ----------------- ฟังก์ชันการจัดการ Arrow สำหรับเปลี่ยนค่าใน List -----------------
    function updateListValue(id, direction, list) {
        const element = document.getElementById(id);
        const currentIndex = list.indexOf(element.textContent);
        let newIndex;
        if (direction === "up") {
            newIndex = (currentIndex + 1) % list.length;
        } else {
            newIndex = (currentIndex - 1 + list.length) % list.length;
        }
        element.textContent = list[newIndex];
    }

    const issueList = ["Hardware", "Overload", "Power Surge", "Mechanical", "Firmware Bugs", "Software", "Display Screen Malfunction", "Damaged or Worn-out charging", "Electrical", "Safety"].sort();
    const technicianList = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "David Wilson", "Sarah Lee", "James Brown", "Anna White", "Robert Miller", "Laura Scott"].sort();
    const statusList = ["Resolved", "In Progress", "Pending", "Unresolved", "Escalated", "Closed", "Awaiting Parts"].sort();

    document.getElementById("issueUp").addEventListener("click", function () {
        updateListValue("issue", "up", issueList);
    });
    document.getElementById("issueDown").addEventListener("click", function () {
        updateListValue("issue", "down", issueList);
    });
    document.getElementById("technicianUp").addEventListener("click", function () {
        updateListValue("technical", "up", technicianList);
    });
    document.getElementById("technicianDown").addEventListener("click", function () {
        updateListValue("technical", "down", technicianList);
    });
    document.getElementById("statusUp").addEventListener("click", function () {
        updateListValue("status", "up", statusList);
    });
    document.getElementById("statusDown").addEventListener("click", function () {
        updateListValue("status", "down", statusList);
    });

    // โหลดข้อมูลทั้งหมดของสถานีเริ่มต้น
    fetchTransactions(selectedStation);
});
