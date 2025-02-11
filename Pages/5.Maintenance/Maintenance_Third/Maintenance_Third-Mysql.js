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
    const dropdownID = document.getElementById("dropdown_id");
    const arrowDropdownID = document.getElementById("arrowDropdown_id");

    // ตัวแปรสำหรับกราฟและเมนู

    const weeklyTitle = document.getElementById('category_chart_weekly');
    const monthlyTitle = document.getElementById('category_chart_monthly');
    const yearlyTitle = document.getElementById('category_chart_yearly');
    const weeklyDropdownArrow = document.getElementById('arrow_dropdown-grap_weekly');
    const monthlyDropdownArrow = document.getElementById('arrow_dropdown-grap_monthly');
    const yearlyDropdownArrow = document.getElementById('arrow_dropdown-grap_yearly');

    const weeklyDropdownMenu = document.getElementById('section_content-bottom_data-dropdown_weekly');
    const monthlyDropdownMenu = document.getElementById('section_content-bottom_data-dropdown_monthly');
    const yearlyDropdownMenu = document.getElementById('section_content-bottom_data-dropdown_yearly');


    let selectedStation = localStorage.getItem("selectedStation") || stations[0];
    selectedStationElement.textContent = selectedStation;
    Weather(selectedStation)
    let currentPage = 1;
    const transactionsPerPage = 3;
    let currentChargerId = 1;
    const maxChargerId = 11;

    let weeklyChartOption = "Usage (Count)";
    let monthlyChartOption = "Usage (Count)";
    let yearlyChartOption = "Usage (Count)";

    const tooltip = document.getElementById('tooltip_heatmap');

    let numberTransaction = 0;


    // ---------- ฟังก์ชันการจัดการ Dropdown ID ----------
    arrowDropdownID.addEventListener("click", function() {
        dropdownID.style.display = dropdownID.style.display === "grid" ? "none" : "grid";
    });

    function updateChargerDropdown() {
        dropdownID.innerHTML = ''; // ล้างรายการใน dropdown ก่อน
        for (let i = 1; i <= maxChargerId; i++) {
            const chargerOption = document.createElement("div");
            chargerOption.className = "charger_option";
            chargerOption.textContent = String(i).padStart(2, '0');
            if (i === 1) {
                chargerOption.classList.add("active_id");
            }
            // เพิ่ม event listener สำหรับการคลิกเลือก
            chargerOption.addEventListener("click", function() {
                currentChargerId = i;
                document.getElementById("chargerID").textContent = `${String(currentChargerId).padStart(2, '0')}`;
                fetchTransactions(selectedStation, currentChargerId, currentPage);
                dropdownID.style.display = "none"; // ซ่อน dropdown หลังจากเลือก
    
                // ลบ class active_id จากทุกตัวเลือกก่อนเพิ่มให้ตัวเลือกที่ถูกคลิก
                const allOptions = dropdownID.querySelectorAll(".charger_option");
                allOptions.forEach(option => option.classList.remove("active_id"));
                chargerOption.classList.add("active_id");
            });
    
            dropdownID.appendChild(chargerOption);
        }
    
        // อัปเดตสถานะ active_id ใน dropdown ให้ตรงกับ currentChargerId
        setActiveChargerInDropdown();
    }
    

    updateChargerDropdown();

    // ---------- ฟังก์ชันการจัดการ Dropdown สถานี ----------
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
                fetchTransactions(selectedStation, currentChargerId, currentPage);
                Weather(selectedStation)
                updateAllCharts(); // อัปเดตกราฟทั้งหมดเมื่อเปลี่ยนสถานี
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
                fetchTransactions(selectedStation, currentChargerId, currentPage);
            });

            paginationContainer.appendChild(pageBox);
        }

        const startEntry = (currentPage - 1) * transactionsPerPage + 1;
        const endEntry = Math.min(currentPage * transactionsPerPage, totalTransactions);
        entriesText.textContent = `Showing ${startEntry} to ${endEntry} of ${totalTransactions} entries`;
    }

    function changePage(delta) {
        const totalItems = isSearching ? filteredTransactions.length : filterChargerID.length;
        const totalPages = Math.ceil(totalItems / transactionsPerPage);
        const newPage = Math.max(1, Math.min(totalPages, currentPage + delta));
        if (newPage !== currentPage) {
            currentPage = newPage;

            if (isSearching) {
                displayTransactions(filteredTransactions, currentPage);
            } else {
                fetchTransactions(selectedStation, currentChargerId, currentPage);
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
    
    // ---------- ฟังก์ชันการอัปเดต Charger ID ----------
    function updateChargerId(delta) {
        currentChargerId += delta;

        // ถ้า currentChargerId เกิน maxChargerId ให้กลับไปที่ 1
        if (currentChargerId > maxChargerId) {
            currentChargerId = 1;
        }

        // ถ้า currentChargerId น้อยกว่า 1 ให้ไปที่ maxChargerId (วนกลับไปที่อันสุดท้าย)
        if (currentChargerId < 1) {
            currentChargerId = maxChargerId;
        }

        document.getElementById("chargerID").textContent = `${String(currentChargerId).padStart(2, '0')}`;
        fetchTransactions(selectedStation, currentChargerId, currentPage);
        updateAllCharts(); // อัปเดตกราฟทั้งหมดเมื่อเปลี่ยน Charger ID
         // อัปเดตสถานะ active_id ใน dropdown ให้ตรงกับ currentChargerId
        setActiveChargerInDropdown();
    }

    document.getElementById("nextID").addEventListener("click", function() {
        updateChargerId(1);
        
    });

    document.getElementById("previousID").addEventListener("click", function() {
        updateChargerId(-1);
    });

    // ฟังก์ชันสำหรับอัปเดต active_id ใน dropdown ให้ตรงกับ currentChargerId
    function setActiveChargerInDropdown() {
        // ลบ active_id จากตัวเลือกทั้งหมดก่อน
        const allOptions = dropdownID.querySelectorAll(".charger_option");
        allOptions.forEach(option => option.classList.remove("active_id"));

        // ค้นหาและเพิ่ม active_id ให้กับตัวเลือกที่ตรงกับ currentChargerId
        const selectedOption = dropdownID.querySelector(`.charger_option:nth-child(${currentChargerId})`);
        if (selectedOption) {
            selectedOption.classList.add("active_id");
        }
    }

    // ---------- ฟังก์ชันการดึงข้อมูล ----------
    let allTransactions = [];
    let filteredTransactions = [];
    let isSearching = false;

    function fetchTransactions(station, chargerId, page = 1) {
        const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
        currentPage = page;
        numberTransaction = 0;

        fetch(`http://localhost:3000/get-maintenance_history_${stationUrl}?charger_id=${String(chargerId).padStart(2, '0')}`)
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    console.error("Expected an array but received:", data);
                    return;
                }

                data.sort((a, b) => {
                    const [dayA, monthA, yearA] = a.DATE.split('/');
                    const [dayB, monthB, yearB] = b.DATE.split('/');
                    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
                    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
                    return dateB - dateA;
                });

                allTransactions = data;
                filterChargerID = allTransactions.filter(t => t.CHARGER_ID === String(currentChargerId).padStart(2, '0'));
                displayTransactions(filterChargerID, currentPage);
                updateAllCharts(); // อัปเดตกราฟทั้งหมดเมื่อดึงข้อมูลใหม่

                numberTransaction = filterChargerID.length;
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
    // ---------- ฟังก์ชันการค้นหา ----------
    function searchTransactions(page = 1) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let formattedDate = '';

        if (searchTerm === "") {
            isSearching = false;
            displayTransactions(filterChargerID, 1);
            return;
        }

        if (/\d{2}\/\d{2}\/\d{4}/.test(searchTerm)) {
            const [day, month, year] = searchTerm.split('/');
            formattedDate = `${day}/${month}/${year}`;
        }

        filteredTransactions = allTransactions.filter(transaction => {
            const isDateMatch = formattedDate && transaction.DATE === formattedDate;
            const isChargerMatch = searchTerm && transaction.CHARGER_ID.toLowerCase().includes(searchTerm);
            return isDateMatch || isChargerMatch;
        });

        isSearching = true;
        displayTransactions(filteredTransactions, page);
    }

    searchButton.addEventListener("click", function() {
        searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
    });

    searchDbButton.addEventListener("click", function() {
        searchTransactions();
    });

    searchInput.addEventListener("input", function() {
        searchTransactions();
    });

    document.addEventListener("click", function(event) {
        if (isSearching && !searchContainer.contains(event.target) && event.target !== searchButton) {
            searchContainer.style.display = "none";
            isSearching = false;
        }
    });

    // ---------- ฟังก์ชันแสดงข้อมูล ----------
    function displayTransactions(transactions, page) {
        const start = (page - 1) * transactionsPerPage;
        const end = start + transactionsPerPage;
        const pageTransactions = transactions.slice(start, end);

        transactionTable.innerHTML = '';

        if (pageTransactions.length === 0) {
            message.textContent = "No data found for the provided date (DD/MM/YYYY)";
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
                <div>${transaction['CHARGER_ID']}</div>
                <div>${transaction['CONNECTOR_ID']}</div>
                <div>${transaction['ISSUE']}</div>
                <div>${transaction['START_TIME']}</div>
                <div>${transaction['END_TIME']}</div>
                <div>${transaction.DURATION}</div>
                <div>${transaction['TECHNICAL']}</div>
                <div>${transaction['STATUS']}</div>
                <div>${transaction['END_DATE']}</div>
            `;
            transactionTable.appendChild(row);
        });

        updatePagination(transactions.length, page);
    }

    // ---------- ส่วนของกราฟ ----------

    // ---------- การจัดการเมนู ----------
    let activeMenu = document.getElementById("section_top-menu-header-maintenance-highlight");
    activeMenu.classList.add("active");

    const menuItems = document.querySelectorAll(".section_top-menu-header > div a");

    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", function(event) {
            const link = menuItem.querySelector("a");
            if (link && link.getAttribute("href") === "") {
                event.preventDefault();
            }

            if (activeMenu) {
                activeMenu.classList.remove("active");
            }

            activeMenu = menuItem;
            activeMenu.classList.add("active");
        });
    });

    // ---------- การจัดการ Dropdown ของกราฟ ----------
    function setupChartOptionDropdown(arrowElement, dropdownElement,  chartTitleElement, updateChartFunction) {
        arrowElement.addEventListener("click", function() {
            dropdownElement.style.display = dropdownElement.style.display === "flex" ? "none" : "flex";
        });
    
        const options = dropdownElement.querySelectorAll('p');
        options.forEach(option => {
    
            // ถ้าข้อความของ option เป็น "Usage (Count)" ให้เพิ่มคลาส active_dropdown_chart เป็นค่าเริ่มต้น
            if (option.textContent.trim() === 'Usage (Count)') {
                option.classList.add('active_dropdown_chart');
            }
    
            option.addEventListener("click", function() {
                // อัปเดตข้อความของ chartTitleElement ตามตัวเลือกที่ผู้ใช้เลือก
                chartTitleElement.textContent = option.textContent;
    
                // เพิ่มคลาส .active_dropdown_chart ให้กับตัวเลือกที่เลือกและลบคลาสออกจากตัวอื่นๆ
                options.forEach(opt => opt.classList.remove('active_dropdown_chart'));
                option.classList.add('active_dropdown_chart');
                
                  // อัปเดตตัวเลือกของกราฟ (เช่น weeklyChartOption, monthlyChartOption, yearlyChartOption)
                if (chartTitleElement === weeklyTitle) {
                    weeklyChartOption = option.textContent;
                } else if (chartTitleElement === monthlyTitle) {
                    monthlyChartOption = option.textContent;
                } else if (chartTitleElement === yearlyTitle) {
                    yearlyChartOption = option.textContent;
                }

                // อัปเดตตัวเลือกของกราฟและเรียกใช้ฟังก์ชันเพื่ออัปเดตกราฟที่เกี่ยวข้อง
                updateChartFunction(option.textContent);
    
                // ซ่อน dropdown หลังจากเลือก
                dropdownElement.style.display = 'none';
            });
        });
    }


    setupChartOptionDropdown(weeklyDropdownArrow, weeklyDropdownMenu, weeklyTitle, updateWeeklyChart);
    setupChartOptionDropdown(monthlyDropdownArrow, monthlyDropdownMenu, monthlyTitle, updateMonthlyChart);
    setupChartOptionDropdown(yearlyDropdownArrow, yearlyDropdownMenu, yearlyTitle, updateYearlyChart);


    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let selectedMonth_line = monthNames[new Date().getMonth()]; // Set default to current month
    let selectedYear = new Date().getFullYear(); // Set default to current year
    let currentWeek = 1; // Set default to week 1
    
    // Set the current month in the #line_currentMonth element when the page loads
    document.getElementById('line_currentMonth').textContent = selectedMonth_line;
    
    // ---------- Line Chart (Weekly) ----------
    let myLineChart;
    
    function updateWeeklyChart(week) {

        const currentYear = new Date().getFullYear();
        document.getElementById("line_currentYear").textContent = currentYear;  // แสดงปี

        const data = allTransactions.filter(t => {
            const [day, month, year] = t.DATE.split('/');
            const date = new Date(`${year}-${month}-${day}`);
            const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        
            const isCorrectMonth = month === getMonthNumber(selectedMonth_line);
            const isCorrectYear = year === selectedYear.toString();            
            const isCorrectWeek = getWeekOfMonth(date) === week;
        
            return isCorrectMonth && isCorrectYear && isCorrectWeek;
        });
        
        // Log the filtered data to check if there is anything in it
        console.log("Filtered Data:", data);
        
        // Days of the week
        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        // Default values for each day of the week (initialize with 0)
        const usageData = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
        const issueData = { 'Mon': [], 'Tue': [], 'Wed': [], 'Thu': [], 'Fri': [], 'Sat': [], 'Sun': [] };

        // Process each transaction
        data.forEach(transaction => {
            const [day, month, year] = transaction.DATE.split('/');
            const date = new Date(`${year}-${month}-${day}`);
            const dayName = weekDays[date.getDay()];  // แปลงจากตัวเลขเป็นชื่อวันในสัปดาห์
        
            // ตรวจสอบเงื่อนไข if
            if (month === getMonthNumber(selectedMonth_line) && year === String(selectedYear) && weekDays.includes(dayName)) {
                // ตรวจสอบให้แน่ใจว่าปีต้องตรงกับปีปัจจุบัน (selectedYear) เท่านั้นถึงจะเพิ่มค่า
                if (year === String(selectedYear)) {
                    
                     // เพิ่ม 1 ใน usageData สำหรับวันนั้นๆ
                    usageData[dayName] += 1;
                }
            }

        });
    
    
        // Define the chart data based on issue reasons
        const chartData = usageData;

        // Calculate the max value for the Y-axis
        const maxDataValue = Math.max(...Object.values(chartData));
        const yAxisMax = Math.ceil(maxDataValue / 10) * 10 + 10;
    
        const ctx = document.getElementById('myLineChart').getContext('2d');
    
        if (myLineChart) {
            myLineChart.destroy();
        }
    
        // Create the line chart
        myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Weekly Data',
                    data: weekDays.map(day => chartData[day]),                   
                    backgroundColor: '#F37021',
                    borderColor: '#F37021',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBorderColor: '#FFDECA',
                    pointHoverRadius: 6,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: true, 
                            color: 'rgba(200, 200, 200, 0.2)'
                        },
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max:  yAxisMax,
                        grid: {
                            display: true, 
                            color: 'rgba(200, 200, 200, 0.2)'
                        },
                        ticks: {
                            stepSize: 5,
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
                
                
            },
            plugins: [{
                id: 'glowEffect',
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    const chartArea = chart.chartArea;
        
                    // เข้าถึง datasets ที่จะวาด
                    chart.data.datasets.forEach((dataset, index) => {
                        const meta = chart.getDatasetMeta(index);
                        if (!meta.hidden) {
                            ctx.save();
                            ctx.shadowColor = '#F37021'; 
                            ctx.shadowBlur = 8;
                            ctx.shadowOffsetX = 0;
                            ctx.shadowOffsetY = 0; 
        
                      
                            meta.dataset.draw(ctx);
        
                            ctx.restore();
                        }
                    });
                },
                
            }],
        });
    }
    
    // Helper function to convert month name to number (e.g., January -> 01)
    function getMonthNumber(monthName) {
        const index = monthNames.indexOf(monthName);
        return (index + 1).toString().padStart(2, '0'); // Return as two-digit string
    }
    
    // Helper function to get the week number for a given date
    function getWeekOfMonth(date) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const days = Math.floor((date - startOfMonth) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7); // Week number (1-4)
    }
    
    // Event listeners for month navigation buttons
    document.getElementById('arrow-line_leftMonth').addEventListener('click', function() {
        const currentIndex = monthNames.indexOf(selectedMonth_line);
        selectedMonth_line = monthNames[(currentIndex - 1 + 12) % 12]; // Move to the previous month
        
        // Update the #line_currentMonth with the selected month
        document.getElementById('line_currentMonth').textContent = selectedMonth_line;
    
        updateWeeklyChart(currentWeek);  // ส่ง currentWeek ไปด้วย
    });
    
    document.getElementById('arrow-line_rightMonth').addEventListener('click', function() {
        const currentIndex = monthNames.indexOf(selectedMonth_line);
        selectedMonth_line = monthNames[(currentIndex + 1) % 12]; // Move to the next month
    
        // Update the #line_currentMonth with the selected month
        document.getElementById('line_currentMonth').textContent = selectedMonth_line;
    
        updateWeeklyChart(currentWeek);  // ส่ง currentWeek ไปด้วย
    });
    
    // Event listeners for week selection buttons
    document.getElementById('week1').addEventListener('click', function() {
        currentWeek = 1;
        updateWeeklyChart(currentWeek);
        setActiveWeek('week1');
    });
    document.getElementById('week2').addEventListener('click', function() {
        currentWeek = 2;
        updateWeeklyChart(currentWeek);
        setActiveWeek('week2');
    });
    document.getElementById('week3').addEventListener('click', function() {
        currentWeek = 3;
        updateWeeklyChart(currentWeek);
        setActiveWeek('week3');
    });
    document.getElementById('week4').addEventListener('click', function() {
        currentWeek = 4;
        updateWeeklyChart(currentWeek);
        setActiveWeek('week4');
    });
    
    // Function to toggle active class for weekly buttons
    function setActiveWeek(weekId) {
        // Remove 'active_weekly' class from all week buttons
        const weekButtons = ['week1', 'week2', 'week3', 'week4'];
        weekButtons.forEach(buttonId => {
            document.getElementById(buttonId).classList.remove('active_weekly');
        });
    
        // Add 'active_weekly' class to the selected week button
        document.getElementById(weekId).classList.add('active_weekly');
    }
    
    // Set week1 as default active button
    setActiveWeek('week1');
    
    // Initial chart update
    updateWeeklyChart();
    
    

    // ---------- Heat Map (Monthly) ----------

        // ตัวแปรที่เก็บเดือนที่เลือก (เริ่มจากเดือนปัจจุบัน)
        let selectedMonth_heat = new Date().getMonth(); // เดือนใน JavaScript เริ่มที่ 0

        
  
    function updateMonthlyChart() {
        // 1. ตั้งค่าปัจจุบันสำหรับเดือนและปี
        const currentYear = new Date().getFullYear();
        
        // 2. อัพเดทชื่อเดือนและปี
        document.getElementById("heatmap_currentMonth").textContent = monthNames[selectedMonth_heat];  // แสดงชื่อเดือนที่เลือก
        document.getElementById("heatmap_currentYear").textContent = currentYear;  // แสดงปี
      
        // 3. ตั้งค่าจำนวนวันที่มีในเดือนที่เลือก
        const daysInMonth = new Date(currentYear, selectedMonth_heat + 1, 0).getDate();
      
        // 4. เริ่มต้นการแสดงผล heatmap
        const heatContain = document.querySelector(".section_content-bottom-data-chart_heat-contain");
        heatContain.innerHTML = "";  // เคลียร์ข้อมูลเก่าก่อน
        heatContain.style.display = "grid";
        heatContain.style.gridTemplateColumns = "repeat(10, 30px)";
        heatContain.style.gap = "8px";
      
        // 5. Tooltip element
        const tooltip = document.getElementById('tooltip_heatmap');
      
        // 6. สร้างอาร์เรย์สำหรับการเก็บข้อมูลของแต่ละวัน
        const usageData = Array(daysInMonth).fill(0);
        const energyData = Array(daysInMonth).fill(0);
      
        // 7. ดึงข้อมูลจาก allTransactions ตาม currentChargerId
        const data = allTransactions.filter(
          (t) => t.CHARGER_ID === String(currentChargerId).padStart(2, "0")
        );
      
        // 8. ประมวลผลข้อมูลที่ตรงกับเดือนที่เลือก
        data.forEach((transaction) => {
          const [day, month, year] = transaction.DATE.split("/");
          const date = new Date(`${year}-${month}-${day}`);
          if (
            date.getMonth() === selectedMonth_heat &&  // ตรวจสอบเดือนที่เลือก
            date.getFullYear() === currentYear
          ) {
            const dayIndex = date.getDate() - 1;
            usageData[dayIndex] += 1;
            energyData[dayIndex] += parseFloat(transaction.ENERGY) || 0;
          }
        });
      
        // 9. เลือกข้อมูลที่จะแสดง (ตามการตั้งค่า Usage หรือ Energy)
        const chartData =
          monthlyChartOption === "Usage (Count)" ? usageData : energyData;
      
        // 10. สร้างกล่องสำหรับแต่ละวันในเดือน
        for (let day = 1; day <= daysInMonth; day++) {
          const box = document.createElement("div");
          box.className = "section_content-bottom-data-chart_heat-contain_box";
          box.style.width = "25px";
          box.style.height = "25px";
          box.style.borderRadius = "5px";
      
          // 11. กำหนดสีตามค่าข้อมูล (แยกตาม Usage และ Energy)
          const dataValue = chartData[day - 1];
          let backgroundColor = "";
          let shadowColor = "rgba(234, 234, 234, 1)";
      
          if (monthlyChartOption === "Usage (Count)") {
            if (dataValue >= 1 && dataValue <= 2) {
              backgroundColor = "#FFDECA"; 
              shadowColor = backgroundColor;
            } else if (dataValue >= 3 && dataValue <= 5) {
              backgroundColor = "#F4A06D"; 
              shadowColor = backgroundColor;
            } else if (dataValue > 10) {
              backgroundColor = "#F37021";
              shadowColor = backgroundColor;
            }
          } else if (monthlyChartOption === "") {
            if (dataValue >= 1 && dataValue <= 10) {
              backgroundColor = "#FFDECA";  
              shadowColor = backgroundColor;
            } else if (dataValue >= 11 && dataValue <= 20) {
              backgroundColor = "#F4A06D";  
              shadowColor = backgroundColor;
            } else if (dataValue >= 21) {
              backgroundColor = "#F37021";
              shadowColor = backgroundColor;
            }
          }
      
          // 12. กำหนดสีให้กับ box
          box.style.backgroundColor = backgroundColor;
          box.style.boxShadow = `0 0 5px ${shadowColor}`;
      
          // 13. เพิ่ม event listener สำหรับ tooltip
          box.addEventListener('mouseover', function() {
            tooltip.innerHTML = `Day ${day} <br> Value ${dataValue}`;
            tooltip.style.visibility = 'visible';
          });
      
          box.addEventListener('mousemove', function() {
            const rect = box.getBoundingClientRect();
            const heatmapContainerRect = heatContain.getBoundingClientRect();
      
            tooltip.style.top = `${rect.top - heatmapContainerRect.top + window.scrollY + 35}px`;
            tooltip.style.left = `${rect.left - heatmapContainerRect.left + rect.width / 2 - tooltip.clientWidth / 2 + window.scrollX}px`;
          });
      
          box.addEventListener('mouseout', function() {
            tooltip.style.visibility = 'hidden';
          });
      
          heatContain.appendChild(box);  // เพิ่มกล่องใน heat map
        }
      }
      function moveMonth(direction) {
        if (direction === 'left') {
          selectedMonth_heat = selectedMonth_heat === 0 ? 11 : selectedMonth_heat - 1; // เลื่อนไปเดือนก่อนหน้า
        } else if (direction === 'right') {
          selectedMonth_heat = selectedMonth_heat === 11 ? 0 : selectedMonth_heat + 1; // เลื่อนไปเดือนถัดไป
        }
        updateMonthlyChart(); // อัพเดท chart หลังจากเดือนเปลี่ยน
      }
      
      // ตั้งค่าการคลิกของลูกศร
      document.getElementById("arrow-heat_leftMonth").addEventListener('click', function() {
        moveMonth('left');  // เรียกใช้ moveMonth เมื่อคลิกลูกศรซ้าย
      });
      
      document.getElementById("arrow-heat_rightMonth").addEventListener('click', function() {
        moveMonth('right');  // เรียกใช้ moveMonth เมื่อคลิกลูกศรขวา
      });







    
    // ---------- Bar Chart (Yearly) ----------
    let myBarChart;

    function updateYearlyChart() {
        const currentYear = new Date().getFullYear();
        const ctx = document.getElementById('myBarChart').getContext('2d');

        // สร้างอาร์เรย์สำหรับเดือน
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // เริ่มต้นค่าเริ่มต้นสำหรับแต่ละเดือน
        const usageData = Array(12).fill(0);
        const energyData = Array(12).fill(0);

        // ดึงข้อมูลจาก allTransactions ตาม currentChargerId
        const data = allTransactions.filter(t => t.CHARGER_ID === String(currentChargerId).padStart(2, '0'));

        data.forEach(transaction => {
            const [day, month, year] = transaction.DATE.split('/');
            const date = new Date(`${year}-${month}-${day}`);
            const monthIndex = date.getMonth();

            // เช็คว่า ปีของข้อมูลตรงกับปีปัจจุบันหรือไม่
            if (parseInt(year) === currentYear) {
                // ถ้าปีตรงกับปีปัจจุบัน ให้บันทึกค่า
                usageData[monthIndex] += 1; // เพิ่ม 1 ในเดือนนั้นๆ
                energyData[monthIndex] += parseFloat(transaction.ENERGY) || 0; // เพิ่มค่าพลังงานในเดือนนั้นๆ
            }
            
        });

        const chartData = yearlyChartOption === 'Usage (Count)' ? usageData : energyData;
        const maxDataValue = Math.max(...Object.values(chartData));
        const yAxisMax = Math.ceil(maxDataValue / 10) * 10 + 10;
        
        if (myBarChart) {
            myBarChart.destroy();
        }

        myBarChart  = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Data',
                    data: chartData,
                    backgroundColor: '#F37021', 
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: true, 
                            color: 'rgba(200, 200, 200, 0.2)'
                        },
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    },
                    y: {
                        min: 0,
                        max: yAxisMax,
                        grid: {
                            display: true, 
                            color: 'rgba(200, 200, 200, 0.2)'
                        },
                        ticks: {
                            stepSize: 5,
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: [{
                id: 'glowEffect',
                beforeDatasetsDraw: (chart) => {
                    const ctx = chart.ctx;
        
                    chart.data.datasets.forEach((dataset, index) => {
                        const meta = chart.getDatasetMeta(index);
                        
                        if (!meta.hidden) {
                            meta.data.forEach((bar) => {
                                ctx.save();
                                ctx.shadowColor = '#F37021'; 
                                ctx.shadowBlur = 6;
                                ctx.shadowOffsetX = 0; 
                                ctx.shadowOffsetY = 0;
                                
                                ctx.fillStyle = bar.options.backgroundColor;
                                ctx.fillRect(bar.x - bar.width / 2, bar.y, bar.width, bar.base - bar.y);
        
                                ctx.restore();
                            });
                        }
                    });
                }
            }],
        });
        
    }

    // ---------- ฟังก์ชันอัปเดตกราฟทั้งหมด ----------
    function updateAllCharts() {
        updateWeeklyChart();
        updateMonthlyChart();
        updateYearlyChart();
    }

    // ---------- การดึงข้อมูลเริ่มต้น ----------
    fetchTransactions(selectedStation, currentChargerId, currentPage);
});
