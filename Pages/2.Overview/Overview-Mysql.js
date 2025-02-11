document.addEventListener("DOMContentLoaded", function () {
    initChargingStation();
    initData();
    initMaintenance();
});

// JavaScript code to enable scrolling with custom scrollbar and pagination
function initChargingStation() {
    let activeMenu = document.getElementById("section_bottom-content-charging_status-title_connector1-icon-highlight");
    activeMenu.classList.add("active");

    const container = document.querySelector(".section_bottom-content-charging_status-details");
    let chargerData = []; // ตัวแปรเก็บข้อมูลทั้งหมดที่ดึงจาก MySQL

    const iconMap = {
        "section_bottom-content-charging_status-title_connector1-icon-highlight": {
            default: "Connector_01-inactive.png",
            active: "Connector_01-active.png"
        },
        "section_bottom-content-charging_status-title_connector2-icon-highlight": {
            default: "Connector_02-inactive.png",
            active: "Connector_02-active.png"
        },
    };

    const initialIconImg = activeMenu.querySelector("img");
    if (initialIconImg && iconMap[activeMenu.id]) {
        initialIconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].active}`;
    }

    let currentPage = 1;
    const itemsPerPage = 10;
    var connector = 1;

    function loadStationData(connector) {
        selectedConnector = connector;
        container.style.opacity = "0";

        setTimeout(() => {
            container.innerHTML = "";

            const stations = ["Bang Khen" , "Lat Krabang", "Nong Kheam", "On Nut","Thon Buri"].sort();

            stations.forEach(station => {
                const detailsDiv = document.createElement("div");
                detailsDiv.className = "section_bottom-content-charging_status-details-station";

                const nameDiv = document.createElement("div");
                nameDiv.className = "section_bottom-content-charging_status-details-name";
                nameDiv.innerHTML = `<p>${station}</p>`;
                detailsDiv.appendChild(nameDiv);

                const statusDiv = document.createElement("div");
                statusDiv.className = "section_bottom-content-charging_status-details-status";

                // สร้างบล็อคเครื่องชาร์จ 10 เครื่องต่อหน้า
                for (let i = 1; i <= 10; i++) {
                    const chargerDiv = document.createElement("div");
                    chargerDiv.className = "section_bottom-content-charging_status-details-status-charger";
                    chargerDiv.innerHTML = `<p>${i + (currentPage - 1) * itemsPerPage}${connector === 1 ? 'A' : 'B'}</p>`;
                    chargerDiv.style.background = "#ffffff";
                    chargerDiv.style.color = "#000000";
                    chargerDiv.querySelector("p").style.fontWeight = "400";
                    statusDiv.appendChild(chargerDiv);
                }

                detailsDiv.appendChild(statusDiv);
                container.appendChild(detailsDiv);

                // Fetch ข้อมูลเพื่ออัพเดตสถานะเครื่องชาร์จ
                const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
                fetch(`http://localhost:3000/get-transaction_${stationUrl}`)
                    .then(response => response.json())
                    .then(data => {
                        chargerData.push({ station, data }); // เก็บข้อมูลทั้งหมดในตัวแปร chargerData
                        for (let i = 1; i <= 10; i++) {
                            const chargerDiv = statusDiv.children[i - 1];
                            const transaction = data.find(t => t.CHARGER_ID === (i + (currentPage - 1) * itemsPerPage).toString().padStart(2, '0') && t.CONNECTOR  === connector.toString());
                            
                            if (transaction) {
                                updateChargerStatus(chargerDiv, transaction.STATUS);
                            }
                        }
                        setTimeout(() => {
                            container.style.opacity = "1";
                        }, 50);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            });
            container.style.opacity = "1";

        }, 300);
    }

    // ฟังก์ชันสำหรับดึงข้อมูลสภาพอากาศจาก API
function fetchWeatherData(station, weatherDiv) {
    const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
    fetch(`http://localhost:3000/get-weather_${stationUrl}`)
        .then(response => response.json())
        .then(data => {

            let iconSrc;
            if (data.length === 0 || !data[0]) {
                // กรณีไม่มีข้อมูล
                iconSrc = "/assets/Overview/Charging_Station/Sunlight.png"; // ค่าเริ่มต้น
            } else {
                const weather = data[0];
                if (weather.wind > 20 || weather.humidity > 70) {
                    iconSrc = "/assets/Overview/Charging_Station/Storm.png"; // พายุ
                } else if (weather.temperature > 30 && weather.humidity < 50) {
                    iconSrc = "/assets/Overview/Charging_Station/Sunlight.png"; // แจ่มใส
                } else {
                    iconSrc = "/assets/Overview/Charging_Station/Rain.png"; // ฝนตกแดดออก
                }
            }

            weatherDiv.innerHTML = `<img src="${iconSrc}" alt="">`;

        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherDiv.innerHTML = `<img src="/assets/Overview/Charging_Station/Sunlight.png" alt="">`; // ค่าเริ่มต้นในกรณีผิดพลาด
        });
}

    function updateChargerStatus(chargerDiv, status) {
        if (status === "Available") {
            chargerDiv.style.background = "#33F321";
            chargerDiv.querySelector("p").style.fontWeight = "600";
            chargerDiv.querySelector("p").style.color = "#ffffff";
        } else if (status === "Charging") {
            chargerDiv.style.background = "#F37021";
            chargerDiv.querySelector("p").style.fontWeight = "600";
            chargerDiv.querySelector("p").style.color = "#ffffff";
        } else if (status === "Finishing" || status === "Suspenden") {
            chargerDiv.style.background = "#F32121";
            chargerDiv.querySelector("p").style.fontWeight = "600";
            chargerDiv.querySelector("p").style.color = "#ffffff";
        } else {
            chargerDiv.style.background = "#000000FF";
            chargerDiv.querySelector("p").style.fontWeight = "400";
            chargerDiv.querySelector("p").style.color = "#FFFFFFFF";
        }
    }

    document.querySelectorAll(".section_bottom-content-charging_status-title_connector > div").forEach(menuItem => {
        menuItem.addEventListener("click", function (event) {
            event.preventDefault();

            if (activeMenu) {
                activeMenu.classList.remove("active");
                const iconImg = activeMenu.querySelector("img");
                if (iconImg && iconMap[activeMenu.id]) {
                    iconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].default}`;
                }
            }

            activeMenu = menuItem;
            activeMenu.classList.add("active");

            const iconImg = activeMenu.querySelector("img");
            if (iconImg && iconMap[activeMenu.id]) {
                iconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].active}`;
            }

            const connector = activeMenu.id.includes("connector1") ? 1 : 2;
            loadStationData(connector);
        });
    });

    // Scrollbar Logic
    const scrollbar = document.querySelector(".scroll-content-charging_station");
    const scrollbarTrack = document.querySelector(".scroll-charging_station");
    let isDragging = false;
    let startX;
    let scrollbarStartLeft;

    scrollbar.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        scrollbarStartLeft = scrollbar.offsetLeft;
        scrollbar.style.background = "#F37021"; // Change to orange when dragging
        document.body.style.userSelect = "none"; // Prevent text selection while dragging
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            scrollbar.style.background = "var(--bg-main-color-orange)"; // Revert to original color
            document.body.style.userSelect = "auto"; // Re-enable text selection
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const maxScroll = scrollbarTrack.clientWidth - scrollbar.clientWidth;
        const newLeft = Math.min(Math.max(scrollbarStartLeft + deltaX, 0), maxScroll);
        scrollbar.style.transform = `translateX(${newLeft - (scrollbarTrack.clientWidth / 2) + (scrollbar.clientWidth / 2)}px)`;        scrollbar.style.transition = "transform 0s";

        const scrollPercent = (newLeft / maxScroll) * 100;
        const newPage = Math.max(1, Math.ceil((scrollPercent / 100) * 10)); // 10 pages
        if (newPage !== currentPage) {
            currentPage = newPage;
            displayPage(Math.max(1, currentPage));
        }
    });


    function displayPage(page) {
        container.innerHTML = ""; // ลบข้อมูลเก่า
        const start = (page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, 100);

        const stations = ["Bang Khen" , "Lat Krabang", "Nong Kheam", "On Nut","Thon Buri"].sort();
        stations.forEach(station => {
            const detailsDiv = document.createElement("div");
            detailsDiv.className = "section_bottom-content-charging_status-details-station";


            const nameDiv = document.createElement("div");
            nameDiv.className = "section_bottom-content-charging_status-details-name";
            nameDiv.innerHTML = `<p>${station}</p>`;
            detailsDiv.appendChild(nameDiv);

            const statusDiv = document.createElement("div");
            statusDiv.className = "section_bottom-content-charging_status-details-status";

            for (let i = 1; i <= 10; i++) {
                const chargerDiv = document.createElement("div");
                chargerDiv.className = "section_bottom-content-charging_status-details-status-charger";
                chargerDiv.innerHTML = `<p>${i + (currentPage - 1) * itemsPerPage}${connector === 1 ? 'A' : 'B'}</p>`;
                chargerDiv.style.background = "#ffffff";
                chargerDiv.style.color = "#000000";
                chargerDiv.querySelector("p").style.fontWeight = "400";
                statusDiv.appendChild(chargerDiv);

                const stationData = chargerData.find(data => data.station === station);
                if (stationData) {
                    const transaction = stationData.data.find(t => t.CHARGER_ID === (i + (page - 1) * itemsPerPage).toString().padStart(2, '0'));
                    if (transaction) {
                        updateChargerStatus(chargerDiv, transaction.STATUS);
                    }
                }
            }

            detailsDiv.appendChild(statusDiv);
            container.appendChild(detailsDiv);
        });
    }

    loadStationData(1);
}



// การวิเคราะห์ข้อมูลสำหรับสรุปใน Widget
// Section: Initialization of Data and Variables
function initData() {
    let selectedBarChartCategory = "Total Energy (Kwh)"; 
    const arrowDropdown = document.getElementById("arrowDropdown_bar");
    const dropdownMenu = document.getElementById("dropdownMenu_bar");
    const listOptionsBar = document.getElementById("ListOptions_bar");
    const barChartTitle = document.getElementById("titleChart");

    // Highlight default menu (Energy)
    let activeMenu = document.getElementById("section_bottom-content-data-category-icon_energy-highlight");
    activeMenu.classList.add("active");

    // Setting the menu selection options
    const menuItems = document.querySelectorAll(".section_bottom-content-data-category > div");

    // Icon map for active and default images
    const iconMap = {
        "section_bottom-content-data-category-icon_energy-highlight": {
            default: "Energy-black.png",
            active: "Energy-white.png"
        },
        "section_bottom-content-data-category-icon_financial-highlight": {
            default: "Financial-black.png",
            active: "Financial-white.png"
        },
        "section_bottom-content-data-category-icon_green-highlight": {
            default: "Green-black.png",
            active: "Green-white.png"
        }
    };

    // Set initial icon to active (white)
    const initialIconImg = activeMenu.querySelector("img");
    if (initialIconImg && iconMap[activeMenu.id]) {
        initialIconImg.src = `../../assets/Overview/Data_Analysis/${iconMap[activeMenu.id].active}`;
    }

    // Add event listeners for the menu items
    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", function (event) {
            event.preventDefault();
            const container = document.querySelector(".section_bottom-content-data-details");
            container.style.transition = "opacity 0.5s ease";
            container.style.opacity = "0";
    
            setTimeout(() => {
                handleMenuSelection(menuItem);
                setTimeout(() => {
                    container.style.opacity = "1";
                }, 50);
            }, 300);
        });
    });
    

    // Fetch initial data and set bar chart for the energy category
    fetchDataAndDisplaySummary("section_bottom-content-data-category-icon_energy-highlight");
    updateBarChartOptions("section_bottom-content-data-category-icon_energy-highlight");

    // Dropdown for bar chart
    arrowDropdown.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", function (event) {
        if (!dropdownMenu.contains(event.target) && !arrowDropdown.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

// Section: Menu Selection Handling
function handleMenuSelection(menuItem) {
    // Remove highlight from the current menu
    if (activeMenu) {
        activeMenu.classList.remove("active");
        const iconImg = activeMenu.querySelector("img");
        if (iconImg && iconMap[activeMenu.id]) {
            iconImg.src = `../../assets/Overview/Data_Analysis/${iconMap[activeMenu.id].default}`;
        }
    }

    // Set the clicked menu as active
    activeMenu = menuItem;
    activeMenu.classList.add("active");

    // Change icon to active (white)
    const iconImg = activeMenu.querySelector("img");
    if (iconImg && iconMap[activeMenu.id]) {
        iconImg.src = `../../assets/Overview/Data_Analysis/${iconMap[activeMenu.id].active}`;
    }

    // Fetch data and update UI accordingly
    const selectedCategory = menuItem.id;
    fetchDataAndDisplaySummary(selectedCategory);
    updateBarChartOptions(selectedCategory);
}

// Section: Fetch Data and Display Summary
async function fetchDataAndDisplaySummary(category) {
    try {
        const stations = ["NONG KHEAM", "ON NUT", "BANG KHEN", "LAT KRABANG", "THON BURI"];
        let totals = initializeTotals();
        window.monthlyData = initializeMonthlyData();
        window.statisticalData = initializeStatisticalData();

        // Fetch data for each station
        for (const station of stations) {
            const data = await fetchStationData(station);
            const filteredData = filterDataForCurrentYear(data);

            // Accumulate values based on selected category
            accumulateData(filteredData, category, totals, window.monthlyData, window.statisticalData);
        }

        // Display summary data in the widgets
        displaySummaryData(category, totals);

        // Display max, avg, min values based on selected category using monthly data
        displayStatisticalDataFromMonthly(selectedBarChartCategory);

        // Update the Bar Chart
        updateBarChart(window.monthlyData[selectedBarChartCategory]);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// Section: Utility Functions
function initializeTotals() {
    return {
        totalEnergy: 0,
        totalSessions: 0,
        totalChargingTime: 0,
        totalElectricityCost: 0,
        totalChargingRevenue: 0,
        totalOperationalProfit: 0,
        totalCarbonSavings: 0,
        totalRenewableEnergyRatio: 0
    };
}

function initializeMonthlyData() {
    return {
        "Total Energy": Array(12).fill(0),
        "Number of session": Array(12).fill(0),
        "Charging Time": Array(12).fill(0),
        "Electricity Cost": Array(12).fill(0),
        "Charging Revenue": Array(12).fill(0),
        "Operational Profit": Array(12).fill(0),
        "Carbon Saving": Array(12).fill(0),
        "Renewable Energy": Array(12).fill(0)
    };
}

function initializeStatisticalData() {
    return {
        "Total Energy": { max: null, min: null, avg: null, values: [] },
        "Number of session": { max: null, min: null, avg: null, values: [] },
        "Charging Time": { max: null, min: null, avg: null, values: [] },
        "Electricity Cost": { max: null, min: null, avg: null, values: [] },
        "Charging Revenue": { max: null, min: null, avg: null, values: [] },
        "Operational Profit": { max: null, min: null, avg: null, values: [] },
        "Carbon Saving": { max: null, min: null, avg: null, values: [] },
        "Renewable Energy": { max: null, min: null, avg: null, values: [] }
    };
}

async function fetchStationData(station) {
    const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
    const response = await fetch(`http://localhost:3000/get-data_analysis_${stationUrl}`);
    return await response.json();
    
}

function filterDataForCurrentYear(data) {
    const currentYear = new Date().getFullYear();
    return data.filter(transaction => {
        const [day, month, year] = transaction.DATE.split("/").map(Number);
        return year === currentYear-1;
    });
}

function accumulateData(filteredData, category, totals, monthlyData, statisticalData) {
    filteredData.forEach(transaction => {
        const monthIndex = parseInt(transaction.DATE.split("/")[1], 10) - 1;
        totals.totalSessions += 1;

        switch (category) {
            case "section_bottom-content-data-category-icon_energy-highlight":
                const energyValue = parseFloat(transaction.ENERGY?.replace(' kWh', '') || 0);
                totals.totalEnergy += energyValue;
                totals.totalChargingTime += parseFloat(transaction.AVG_CHARGING_TIME?.replace(' hr', '') || 0);
                monthlyData["Total Energy"][monthIndex] += energyValue;
                monthlyData["Number of session"][monthIndex] += 1;
                monthlyData["Charging Time"][monthIndex] += parseFloat(transaction.AVG_CHARGING_TIME?.replace(' hr', '') || 0);
                break;
            case "section_bottom-content-data-category-icon_financial-highlight":
                const electricityCost = parseFloat(transaction.ELECTRICITY_COST?.replace('฿', '') || 0);
                const chargingRevenue = parseFloat(transaction.CHARGING_REVENUE?.replace('฿', '') || 0);
                const operationalProfit = parseFloat(transaction.OPERATIONAL_PROFIT?.replace('฿', '') || 0);
                totals.totalElectricityCost += electricityCost;
                totals.totalChargingRevenue += chargingRevenue;
                totals.totalOperationalProfit += operationalProfit;
                monthlyData["Electricity Cost"][monthIndex] += electricityCost;
                monthlyData["Charging Revenue"][monthIndex] += chargingRevenue;
                monthlyData["Operational Profit"][monthIndex] += operationalProfit;
                break;
            case "section_bottom-content-data-category-icon_green-highlight":
                const carbonSavings = parseFloat(transaction.CARBON_SAVINGS?.replace(' kg', '') || 0);
                const renewableEnergyRatio = parseFloat(transaction.RENEWABLE_ENERGY_RATIO?.replace(' %', '') || 0);
                totals.totalCarbonSavings += carbonSavings;
                totals.totalRenewableEnergyRatio += renewableEnergyRatio;
                monthlyData["Carbon Saving"][monthIndex] += carbonSavings;
                monthlyData["Renewable Energy"][monthIndex] += renewableEnergyRatio;
                break;
        }
    });
}

function displaySummaryData(category, totals) {
    switch (category) {
        case "section_bottom-content-data-category-icon_energy-highlight":
            updateSummaryBox("Total Energy", `${totals.totalEnergy.toFixed(2)} kWh`, "Number of Session", `${totals.totalSessions} times`, "Charging Time", `${totals.totalChargingTime.toFixed(2)} hr`, "No Data", "0");
            break;
        case "section_bottom-content-data-category-icon_financial-highlight":
            updateSummaryBox("Electricity Cost", `฿ ${formatCurrency(totals.totalElectricityCost)}`, "Charging Revenue", `฿ ${formatCurrency(totals.totalChargingRevenue)}`, "Operational Profit", `฿ ${formatCurrency(totals.totalOperationalProfit)}`, "No Data", "0");
            break;
        case "section_bottom-content-data-category-icon_green-highlight":
            updateSummaryBox("Carbon Saving", `${totals.totalCarbonSavings.toFixed(2)} kg`, "Renewable Energy", `${(totals.totalRenewableEnergyRatio / 5).toFixed(2)} %`, "No Data", "0", "No Data", "0");
            break;
    }
}

function updateSummaryBox(name1, value1, name2, value2, name3, value3, name4, value4) {
    document.getElementById("nameSummarybox1").textContent = name1;
    document.getElementById("valueSummarybox1").textContent = value1;
    document.getElementById("nameSummarybox2").textContent = name2;
    document.getElementById("valueSummarybox2").textContent = value2;
    document.getElementById("nameSummarybox3").textContent = name3;
    document.getElementById("valueSummarybox3").textContent = value3;
    document.getElementById("nameSummarybox4").textContent = name4;
    document.getElementById("valueSummarybox4").textContent = value4;
    
}

function formatCurrency(value) {
    
    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + ' M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + ' k';
    } else {
        return value.toFixed(2);
    }
}

function displayStatisticalDataFromMonthly(category) {
    const monthlyValues = window.monthlyData[category];
    const max = Math.max(...monthlyValues);
    const min = Math.min(...monthlyValues);
    const avg = monthlyValues.length ? (monthlyValues.reduce((a, b) => a + b, 0) / monthlyValues.length) : 0;

    document.getElementById("bar_max").innerText = `${max.toFixed(2)}`;
    document.getElementById("bar_avg").innerText = `${avg.toFixed(2)}`;
    document.getElementById("bar_min").innerText = `${min.toFixed(2)}`;
}

// Section: Update Bar Chart
function updateBarChartOptions(category) {
    const optionsMap = {
        "section_bottom-content-data-category-icon_energy-highlight": ["Total Energy", "Number of session", "Charging Time"],
        "section_bottom-content-data-category-icon_financial-highlight": ["Electricity Cost", "Charging Revenue", "Operational Profit"],
        "section_bottom-content-data-category-icon_green-highlight": ["Carbon Saving", "Renewable Energy"]
    };

    const options = optionsMap[category] || [];
    selectedBarChartCategory = options[0] || "";

    const listOptionsBar = document.getElementById("ListOptions_bar");
    listOptionsBar.innerHTML = options.map((item) => `
        <div class="section_bottom-content-data-details-chart-dropdown_options_choose">
            <p class="${item === selectedBarChartCategory ? 'active_dropdown' : ''}">${item}</p>
        </div>
        <div class="section_bottom-content-data-details-chart-dropdown_options_choose_line"></div>
    `).join('');

    barChartTitle.textContent = selectedBarChartCategory;

    document.querySelectorAll(".section_bottom-content-data-details-chart-dropdown_options_choose p").forEach(option => {
        option.addEventListener("click", function () {
            barChartTitle.textContent = this.innerText;
            selectedBarChartCategory = this.innerText;
            dropdownMenu.style.display = "none";
            document.querySelectorAll(".section_bottom-content-data-details-chart-dropdown_options_choose p").forEach(el => {
                el.classList.remove("active_dropdown");
            });
            this.classList.add("active_dropdown");
            updateBarChart(window.monthlyData[selectedBarChartCategory]);
            displayStatisticalDataFromMonthly(selectedBarChartCategory);
        });
    });
}

function updateBarChart(monthlyData) {
    const ctx = document.getElementById('myBarChart').getContext('2d');
    if (window.myBarChart instanceof Chart) {
        window.myBarChart.destroy();
    }

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    window.myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: selectedBarChartCategory,
                data: monthlyData,
                backgroundColor: 'rgba(243, 112, 33, 1)',
                borderWidth: 1
            },
        ]
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
                    grid: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
                        stepSize: 100,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
    
}
}






function initMaintenance() {
    let activeMenu = document.getElementById("section_bottom-content-maintenance-title_connector1-icon-highlight");
    activeMenu.classList.add("active");

    const container = document.querySelector(".section_bottom-content-maintenance-details");
    let maintenanceData = []; // ตัวแปรเก็บข้อมูลทั้งหมดที่ดึงจาก MySQL

    const iconMap = {
        "section_bottom-content-maintenance-title_connector1-icon-highlight": {
            default: "Connector_01-inactive.png",
            active: "Connector_01-active.png"
        },
        "section_bottom-content-maintenance-title_connector2-icon-highlight": {
            default: "Connector_02-inactive.png",
            active: "Connector_02-active.png"
        },
    };

    const initialIconImg = activeMenu.querySelector("img");
    if (initialIconImg && iconMap[activeMenu.id]) {
        initialIconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].active}`;
    }

    let currentPage = 1;
    const itemsPerPage = 10;
    var connector = 1;


    function loadMaintenanceData(connector) {
        selectedConnector = connector;
        container.style.opacity = "0";

        setTimeout(() => {
            container.innerHTML = "";

            const stations = ["Bang Khen" , "Lat Krabang", "Nong Kheam", "On Nut","Thon Buri"].sort();

            stations.forEach(station => {
                const detailsDiv = document.createElement("div");
                detailsDiv.className = "section_bottom-content-maintenance-details-station";

                const wrenchDiv = document.createElement("div");
                wrenchDiv.className = "section_bottom-content-maintenance-details-wrench";
                wrenchDiv.innerHTML = `<img src="../../assets/Overview/Maintenance/Scraw.png" alt="">`;
                detailsDiv.appendChild(wrenchDiv);

                const nameDiv = document.createElement("div");
                nameDiv.className = "section_bottom-content-maintenance-details-name";
                nameDiv.innerHTML = `<p>${station}</p>`;
                detailsDiv.appendChild(nameDiv);

                const statusDiv = document.createElement("div");
                statusDiv.className = "section_bottom-content-maintenance-details-status";

                // สร้างบล็อคเครื่องชาร์จ 10 เครื่องต่อหน้า
                for (let i = 1; i <= 10; i++) {
                    const chargerDiv = document.createElement("div");
                    chargerDiv.className = "section_bottom-content-maintenance-details-status-charger";
                    chargerDiv.innerHTML = `<p>${i + (currentPage - 1) * itemsPerPage}${connector === 1 ? 'A' : 'B'}</p>`;
                    chargerDiv.style.background = "#ffffff";
                    chargerDiv.style.color = "#000000";
                    chargerDiv.querySelector("p").style.fontWeight = "400";
                    statusDiv.appendChild(chargerDiv);
                }

                detailsDiv.appendChild(statusDiv);
                container.appendChild(detailsDiv);

                // Fetch ข้อมูลเพื่ออัพเดตสถานะเครื่องชาร์จ
                const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
                fetch(`http://localhost:3000/get-transaction_${stationUrl}`)
                    .then(response => response.json())
                    .then(data => {
                        maintenanceData.push({ station, data }); // เก็บข้อมูลทั้งหมดในตัวแปร maintenanceData
                        for (let i = 1; i <= 10; i++) {
                            const chargerDiv = statusDiv.children[i - 1];
                            const transaction = data.find(t => t.CHARGER_ID === (i + (currentPage - 1) * itemsPerPage).toString().padStart(2, '0') && t.CONNECTOR === connector.toString());

                            if (transaction) {
                                updateChargerStatus(chargerDiv, transaction.STATUS);
                            }
                        }
                        setTimeout(() => {
                            container.style.opacity = "1";
                        }, 50);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            });
            container.style.opacity = "1";

        }, 300);
    }

    function updateChargerStatus(chargerDiv, status) {
        if (status === "Available") {
            chargerDiv.style.background = "#FFFFFFFF";
            chargerDiv.querySelector("p").style.fontWeight = "600";
            chargerDiv.querySelector("p").style.color = "#000000FF";
        } else if (status === "Suspended") {
            chargerDiv.style.background = "#000000FF";
            chargerDiv.querySelector("p").style.fontWeight = "600";
            chargerDiv.querySelector("p").style.color = "#ffffff";
        } else {
            chargerDiv.style.background = "#ffffff";
            chargerDiv.querySelector("p").style.fontWeight = "400";
            chargerDiv.querySelector("p").style.color = "#000000";
        }
    }

    document.querySelectorAll(".section_bottom-content-maintenance-title_connector > div").forEach(menuItem => {
        menuItem.addEventListener("click", function (event) {
            event.preventDefault();

            if (activeMenu) {
                activeMenu.classList.remove("active");
                const iconImg = activeMenu.querySelector("img");
                if (iconImg && iconMap[activeMenu.id]) {
                    iconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].default}`;
                }
            }

            activeMenu = menuItem;
            activeMenu.classList.add("active");

            const iconImg = activeMenu.querySelector("img");
            if (iconImg && iconMap[activeMenu.id]) {
                iconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].active}`;
            }

            const connector = activeMenu.id.includes("connector1") ? 1 : 2;
            loadMaintenanceData(connector);
        });
    });

    // Scrollbar Logic
    const scrollbar = document.querySelector(".scroll-content_maintenance");
    const scrollbarTrack = document.querySelector(".scroll-maintenance");
    let isDragging = false;
    let startX;
    let scrollbarStartLeft;

    scrollbar.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        scrollbarStartLeft = scrollbar.offsetLeft;
        scrollbar.style.background = "#F37021"; // Change to orange when dragging
        document.body.style.userSelect = "none"; // Prevent text selection while dragging
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            scrollbar.style.background = "var(--bg-main-color-orange)"; // Revert to original color
            document.body.style.userSelect = "auto"; // Re-enable text selection
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const maxScroll = scrollbarTrack.clientWidth - scrollbar.clientWidth;
        const newLeft = Math.min(Math.max(scrollbarStartLeft + deltaX, 0), maxScroll);
        scrollbar.style.transform = `translateX(${newLeft - (scrollbarTrack.clientWidth / 2) + (scrollbar.clientWidth / 2)}px)`;        scrollbar.style.transition = "transform 0s";
        scrollbar.style.transition = "transform 0s";

        const scrollPercent = (newLeft / maxScroll) * 100;
        const newPage = Math.max(1, Math.ceil((scrollPercent / 100) * 10)); // 10 pages
        if (newPage !== currentPage) {
            currentPage = newPage;
            displayPage(Math.max(1, currentPage));
        }
    });

    function displayPage(page) {
        container.innerHTML = ""; // ลบข้อมูลเก่า
        const start = (page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, 100);

        const stations = ["Bang Khen" , "Lat Krabang", "Nong Kheam", "On Nut","Thon Buri"].sort();
        stations.forEach(station => {
            const detailsDiv = document.createElement("div");
            detailsDiv.className = "section_bottom-content-maintenance-details-station";

            const wrenchDiv = document.createElement("div");
            wrenchDiv.className = "section_bottom-content-maintenance-details-wrench";
            wrenchDiv.innerHTML = `<img src="../../assets/Overview/Maintenance/Scraw.png" alt="">`;
            detailsDiv.appendChild(wrenchDiv);

            const nameDiv = document.createElement("div");
            nameDiv.className = "section_bottom-content-maintenance-details-name";
            nameDiv.innerHTML = `<p>${station}</p>`;
            detailsDiv.appendChild(nameDiv);

            const statusDiv = document.createElement("div");
            statusDiv.className = "section_bottom-content-maintenance-details-status";

            for (let i = 1; i <= 10; i++) {
                const chargerDiv = document.createElement("div");
                chargerDiv.className = "section_bottom-content-maintenance-details-status-charger";
                chargerDiv.innerHTML = `<p>${i + (currentPage - 1) * itemsPerPage}${connector === 1 ? 'A' : 'B'}</p>`;
                chargerDiv.style.background = "#ffffff";
                chargerDiv.style.color = "#000000";
                chargerDiv.querySelector("p").style.fontWeight = "400";
                statusDiv.appendChild(chargerDiv);

                const stationData = maintenanceData.find(data => data.station === station);
                if (stationData) {
                    const transaction = stationData.data.find(t => t.CHARGER_ID === (i + (page - 1) * itemsPerPage).toString().padStart(2, '0'));
                    if (transaction) {
                        updateChargerStatus(chargerDiv, transaction.STATUS);
                    }
                }
            }

            detailsDiv.appendChild(statusDiv);
            container.appendChild(detailsDiv);
        });
    }

    loadMaintenanceData(1);
}



