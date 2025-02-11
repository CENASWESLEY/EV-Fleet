// Section 1: Dropdown สำหรับเลือกสถานี
const stations = ["NONG KHEAM", "ON NUT", "BANG KHEN", "LAT KRABANG", "THON BURI"].sort();
const selectedStationElement = document.getElementById("selectedStation");
const dropdownMenu = document.getElementById("dropdownMenu");
const toggleDropdown = document.getElementById("toggleDropdown");
const stationOptions = document.getElementById("stationOptions");
const container = document.querySelector('.section_content-center');

// กำหนดค่าเริ่มต้นโดยใช้สถานีแรกสุดหากไม่มีสถานีที่ถูกบันทึกไว้
let selectedStation = localStorage.getItem("selectedStation") || stations[0];
selectedStationElement.textContent = selectedStation;

function updateStationOptions() {
    stationOptions.innerHTML = stations.map(station => {
        const isActive = station === selectedStation ? 'active' : '';
        return `
            <div class="section_content-top-details-banner_station-name-dropdown_options_choose">
                <p class="${isActive}" style="${isActive ? 'color: rgba(217, 217, 217, 1); transform: none;' : ''}">${station}</p>
            </div>
            ${station !== stations[stations.length - 1] ? '<div class="section_content-top-details-banner_station-name-dropdown_options_choose_line"></div>' : ''}
        `;
    }).join('');

    document.querySelectorAll(".section_content-top-details-banner_station-name-dropdown_options_choose p").forEach(stationName => {
        stationName.addEventListener("click", function() {
            selectedStation = stationName.textContent;
            selectedStationElement.textContent = selectedStation;
            localStorage.setItem("selectedStation", selectedStation);
            updateStationOptions();
            dropdownMenu.style.display = "none";
            console.log(`กำลังดึงข้อมูลสำหรับปี: ${selectedYear}, ระยะเวลา: ${selectedPeriod}, หมวดหมู่: ${selectedCategory}, สถานี: ${selectedStation}`);
            loadStationData(selectedStation, 1);
            fetchCategoryData();
        });
    });
}

updateStationOptions();

toggleDropdown.addEventListener("click", () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", event => {
    if (!dropdownMenu.contains(event.target) && !toggleDropdown.contains(event.target)) {
        dropdownMenu.style.display = "none";
    }
});

// Section 2: ทดสอบการดึงข้อมูลสำหรับสถานีที่เลือก
async function loadStationData(station, retryCount = 0) {
    try {
        const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
        const response = await fetch(`http://localhost:3000/get-data_analysis_${stationUrl}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
        if (retryCount < 3) {
            console.log('ลองโหลดข้อมูลใหม่อีกครั้ง...');
            setTimeout(() => loadStationData(station, retryCount + 1), 1000);
        } else {
            console.error('ไม่สามารถโหลดข้อมูลได้หลังจากลองใหม่หลายครั้ง');
        }
    }
}

// Section 3: แผงควบคุม Yearly, Periodical และ Category
const yearDropdown = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category_year_box");
const periodDropdown = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category-period_box");
const categoryDropdown = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category_icon_box");

let selectedYear = "2024";
let selectedPeriod = "Weekly";
let selectedCategory = "Energy";  // หมวดหมู่เริ่มต้น

function updateControlPanel() {
    // ลบ event listeners เดิมก่อนที่จะเพิ่มใหม่เพื่อป้องกันการซ้ำซ้อน
    yearDropdown.forEach(box => {
        box.removeEventListener("click", handleYearClick);
    });
    periodDropdown.forEach(box => {
        box.removeEventListener("click", handlePeriodClick);
    });
    categoryDropdown.forEach(box => {
        box.removeEventListener("click", handleCategoryClick);
    });

    // Year Dropdown
    yearDropdown.forEach(box => {
        box.classList.toggle("active_selector", box.id === selectedYear);
        box.addEventListener("click", handleYearClick);
    });

    // Period Dropdown
    periodDropdown.forEach(box => {
        box.classList.toggle("active_selector", box.id === selectedPeriod);
        box.addEventListener("click", handlePeriodClick);
    });

    // Category Dropdown
    categoryDropdown.forEach(box => {
        box.classList.toggle("active_selector", box.id === selectedCategory);

        // อัปเดตรูปภาพเมื่อเลือกหมวดหมู่
        const img = box.querySelector("img");
        if (img) {
            const categoryName = box.id;
            img.src = `../../../assets/Data_Analysis/Catagory/${categoryName}${box.id === selectedCategory ? '-active' : '-inactive'}.png`;
        }

        box.addEventListener("click", handleCategoryClick);
    });

    fetchCategoryData();
}

function handleYearClick(event) {
    selectedYear = event.currentTarget.id;
    updateControlPanel();
    loadStationData(selectedStation, 1);
    fetchCategoryData();
}

function handlePeriodClick(event) {
    selectedPeriod = event.currentTarget.id;
    updateControlPanel();
    loadStationData(selectedStation, 1);
}

function handleCategoryClick(event) {
    selectedCategory = event.currentTarget.id;  // อัปเดตหมวดหมู่ที่เลือก
    updateControlPanel();  // อัปเดตแผงควบคุม
    updateSelectedChartCategories(selectedCategory);
    loadStationData(selectedStation, 1);  // โหลดข้อมูลที่สถานีที่เลือก
}

// Initial update of the control panel
updateControlPanel();



// ดึงข้อมูล default เมื่อเปิดเว็บ
console.log(`กำลังดึงข้อมูลสำหรับปี: ${selectedYear}, ระยะเวลา: ${selectedPeriod}, หมวดหมู่: ${selectedCategory}, สถานี: ${selectedStation}`);
loadStationData(selectedStation, 1);


// Section 4: ดึงข้อมูล Category ตามแผงควบคุม
async function fetchCategoryData() {
    try {
        const stationUrl = selectedStation.toLowerCase().replace(/\s+/g, '_');
        const response = await fetch(`http://localhost:3000/get-data_analysis_${stationUrl}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // แยกข้อมูลตามปีที่ผู้ใช้เลือก
        const filteredData = data.filter(record => {
            const dateParts = record.DATE.split("/");
            const year = dateParts[2];
            return year === selectedYear;
        });

        // กรองข้อมูลตามระยะเวลาที่ผู้ใช้เลือก
        let periodFilteredData = [];
        if (selectedPeriod === "Weekly") {
            const currentDate = new Date();
            const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
            const currentWeekEnd = new Date(currentDate.setDate(currentDate.getDate() + 6));
            periodFilteredData = filteredData.filter(record => {
                const [day, month, year] = record.DATE.split("/").map(Number);
                const recordDate = new Date(year, month - 1, day);
                return recordDate >= currentWeekStart && recordDate <= currentWeekEnd;
            });
        } else if (selectedPeriod === "Monthly") {
            const currentMonth = new Date().getMonth() + 1;
            periodFilteredData = filteredData.filter(record => {
                const [day, month] = record.DATE.split("/").map(Number);
                return month === currentMonth;
            });
        } else if (selectedPeriod === "Yearly") {
            periodFilteredData = filteredData; // ใช้ข้อมูลทั้งหมดในปีนั้น
        }

        if (periodFilteredData.length === 0) {
            console.log(`ไม่มีข้อมูลสำหรับปี: ${selectedYear}, ระยะเวลา: ${selectedPeriod}, สถานี: ${selectedStation}`);
            periodFilteredData = [{ ENERGY: "0", AVG_CHARGING_TIME: "0 hr", ELECTRICITY_COST: "0", CHARGING_REVENUE: "0", OPERATIONAL_PROFIT: "0", CARBON_SAVINGS: "0 kg", RENEWABLE_ENERGY_RATIO: "0%" }];
        }

        //console.log(`ข้อมูล Category ที่กรองตามปี: ${selectedYear}, ระยะเวลา: ${selectedPeriod}, สถานี: ${selectedStation}, หมวดหมู่: ${selectedCategory}`);

        // สร้างข้อมูลสำหรับแต่ละ Pie Chart ใน Section 6
        updateAllPieCharts(periodFilteredData);
        updateLineAndBarCharts(periodFilteredData);
        calculateSummaries(periodFilteredData);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Category:', error);
    }
}



// Section 5: ฟังก์ชันสำหรับอัปเดตข้อมูล Pie Chart ใน HTML

function updatePieChartInfo(category, periodFilteredData) {
    const totalEnergy = periodFilteredData.reduce((acc, record) => acc + parseFloat(record.ENERGY?.replace(' kWh', '') || 0), 0).toFixed(2);
    const totalElectricityCost = formatCurrencyValue(periodFilteredData.reduce((acc, record) => acc + parseFloat(record.ELECTRICITY_COST?.replace('฿', '') || 0), 0));
    const totalCarbonSavings = periodFilteredData.reduce((acc, record) => acc + parseFloat(record.CARBON_SAVINGS?.replace(' kg', '') || 0), 0).toFixed(2);
    const totalSessions = periodFilteredData.length;
    const totalChargingRevenue = formatCurrencyValue(periodFilteredData.reduce((acc, record) => acc + parseFloat(record.CHARGING_REVENUE?.replace('฿', '') || 0), 0));
    const totalRenewableEnergy = (periodFilteredData.reduce((acc, record) => acc + parseFloat(record.RENEWABLE_ENERGY_RATIO?.replace('%', '') || 0), 0) / periodFilteredData.length).toFixed(2);
    const totalChargingTime = convertTimeToDecimalHours(periodFilteredData.reduce((acc, record) => acc + parseFloat(record.AVG_CHARGING_TIME?.replace(' hr', '') || 0), 0));
    const totalOperationalProfit = formatCurrencyValue(periodFilteredData.reduce((acc, record) => acc + parseFloat(record.OPERATIONAL_PROFIT?.replace('฿', '') || 0), 0));

    // Log the data for debugging
    console.log("Pie Chart Data:", {
        totalEnergy,
        totalElectricityCost,
        totalCarbonSavings,
        totalSessions,
        totalChargingRevenue,
        totalRenewableEnergy,
        totalChargingTime,
        totalOperationalProfit
    });
    
    // Update HTML elements for Pie Charts
    const pieChartData = {
        Energy: [
            {
                title: "Total Energy",
                value: totalEnergy,
                unit: "kWh",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Energy.png",
            },
            {
                title: "Number of Session",
                value: totalSessions,
                unit: "Times",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Energy.png",
            },
            {
                title: "Charging Time",
                value: totalChargingTime,
                unit: "hr min",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Energy.png",
            },
            {
                title: "No Data Available",
                value: "0",
                unit: "",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Energy.png",
            },
        ],
        Financial: [
            {
                title: "Electricity Cost",
                value: `${totalElectricityCost}`,
                unit: "฿",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Financial.png",
            },
            {
                title: "Charging Revenue",
                value: `${totalChargingRevenue}`,
                unit: "฿",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Financial.png",
            },
            {
                title: "Operational Profit",
                value: `${totalOperationalProfit}`,
                unit: "฿",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Financial.png",
            },
            {
                title: "No Data Available",
                value: "0",
                unit: "฿",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Financial.png",
            },
        ],
        Green: [
            {
                title: "Carbon Saving",
                value: totalCarbonSavings,
                unit: "kg",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Green.png",
            },
            {
                title: "Renewable Energy",
                value: totalRenewableEnergy,
                unit: "%",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Green.png",
            },
            {
                title: "No Data Available",
                value: "0",
                unit: "",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Green.png",
            },
            {
                title: "No Data Available",
                value: "0",
                unit: "",
                imgSrc: "../../../assets/Data_Analysis/PieChart/Green.png",
            },
        ],
    };

    const selectedPieChartData = pieChartData[category] || [];
    
    for (let i = 1; i <= 4; i++) {
        const { title, value, unit, imgSrc } = selectedPieChartData[i - 1] || {};
        document.getElementById(`pieChart_title${i}`).innerText = title || "No Data Available";
        document.querySelector(`#income_piechart${i}`).innerText = value || "0";
        document.querySelector(`#unit_piechart${i}`).innerText = unit || "";
        document.querySelector(`#station_name_${i}-1`).innerText = selectedStation;
        if (category === "Financial") {
            document.querySelector(`#station_value_${i}-1`).innerText = value ? `฿ ${value}` : "No Data";
        } else {
            document.querySelector(`#station_value_${i}-1`).innerText = value ? `${value} ${unit}` : "No Data";
        }
            const imgElement = document.querySelector(`#myPieChart${i} ~ .section_content_center-chart_pie-data-inner .section_content_center-chart_pie-data-inner_money img`);
        if (imgElement) {
            imgElement.src = imgSrc;
        }
    }
}

// ฟังก์ชันสำหรับแปลงจำนวนเงินให้เป็นรูปแบบ k หรือ M
function formatCurrencyValue(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + ' M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + ' k';
    } else {
        return value.toFixed(2);
    }
}



// Section 6: ฟังก์ชันสำหรับสร้าง Pie Charts
const existingCharts = {}; // แก้ไข: เพิ่มการกำหนดค่าให้กับ existingCharts

function createPieCharts(periodFilteredData) {


    const pieChartConfig = {
        Energy: [
            { id: "myPieChart1", data: periodFilteredData.reduce((acc, record) => acc + parseFloat(record.ENERGY?.replace(' kWh', '') || 0), 0).toFixed(2), title: 'Total Energy' },
            { id: "myPieChart2", data: periodFilteredData.length, title: 'Number of Session' },
            { id: "myPieChart3", data: convertTimeToDecimalHours(periodFilteredData.reduce((acc, record) => acc + parseFloat(record.AVG_CHARGING_TIME?.replace(' hr', '') || 0), 0)), title: 'Charging Time (in Decimal Hours)' },
            { id: "myPieChart4", data: 0, title: 'No Data Available' }
        ],
        Financial: [
            { id: "myPieChart1", data: periodFilteredData.reduce((acc, record) => acc + parseFloat(record.ELECTRICITY_COST?.replace('฿', '') || 0), 0).toFixed(2), title: 'Electricity Cost' },
            { id: "myPieChart2", data: periodFilteredData.reduce((acc, record) => acc + parseFloat(record.CHARGING_REVENUE?.replace('฿', '') || 0), 0).toFixed(2), title: 'Charging Revenue' },
            { id: "myPieChart3", data: periodFilteredData.reduce((acc, record) => acc + parseFloat(record.OPERATIONAL_PROFIT?.replace('฿', '') || 0), 0).toFixed(2), title: 'Operational Profit' },
            { id: "myPieChart4", data: 0, title: 'No Data Available' }
        ],
        Green: [
            { id: "myPieChart1", data: periodFilteredData.reduce((acc, record) => acc + parseFloat(record.CARBON_SAVINGS?.replace(' kg', '') || 0), 0).toFixed(2), title: 'Carbon Saving' },
            { id: "myPieChart2", data: (periodFilteredData.reduce((acc, record) => acc + parseFloat(record.RENEWABLE_ENERGY_RATIO?.replace('%', '') || 0), 0) / periodFilteredData.length).toFixed(2), title: 'Renewable Energy' },
            { id: "myPieChart3", data: 0, title: 'No Data Available' },
            { id: "myPieChart4", data: 0, title: 'No Data Available' }
        ]
    };

    pieChartConfig[selectedCategory].forEach(chart => {
        createPieChart(chart.id, chart.data, chart.title);
    });
}


// ฟังก์ชันสำหรับสร้างหรืออัปเดต Pie Chart
function createPieChart(canvasId, chartData, title) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element with ID ${canvasId} not found.`);
        return;
    }
    const ctx = canvas.getContext("2d");
    if (existingCharts[canvasId]) {
        existingCharts[canvasId].destroy();
    }
    existingCharts[canvasId] = new Chart(ctx, {
        type: "doughnut",
        data: {
            datasets: [
                {
                    data: [chartData],
                    backgroundColor: ["#F37021"], // สีที่แตกต่างกัน
                    borderWidth: 0,
                    borderColor: "#ffffff",
                    hoverBorderColor: "#ffffff",
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 5,
                        boxHeight: 5,
                        usePointStyle: true,
                        padding: 10,
                        pointStyle: 'circle', // ใช้รูปทรงวงกลมใน legend
                        font: {
                            size: 10, // ปรับขนาดตัวอักษร
                            weight: 'bold', // ทำให้ตัวอักษรหนาขึ้น
                        },
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${title}: ${context.raw} ฿`; // เพิ่มหน่วย ฿
                        }
                    }
                },
            },
            cutout: "65%",
            animation: {
                animateRotate: true,
                animateScale: true, // ทำให้ขนาดเปลี่ยนเมื่อโหลด
            },
            // เพิ่ม shadow ให้ดูมีมิติ
            animation: {
                duration: 1000,
                easing: 'easeInOutCirc'
            },
            responsive: true,
        }
    });
}


// ฟังก์ชันสำหรับแปลงเวลาเป็นชั่วโมงและนาที
function convertTimeToDecimalHours(totalHours) {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return (hours + (minutes / 60)).toFixed(2);
}


// Section 6: อัปเดตข้อมูล Pie Chart ตามแผงควบคุมและข้อมูลที่กรองได้
function updateAllPieCharts(periodFilteredData) {
    createPieCharts(periodFilteredData);
    updatePieChartInfo(selectedCategory, periodFilteredData);
}


// Section 7: ฟังก์ชันสำหรับสร้างและอัปเดต Bar และ Line Charts

// กำหนดข้อมูลสำหรับแผงควบคุม Bar Chart และ Line Chart
const listsBarChart = {
    Energy: ["Total Energy", "Number of Session", "Charging Time"].sort(),
    Financial: ["Charging Revenue", "Electricity Cost", "Operational Profit"].sort(),
    Green: ["Carbon Saving", "Renewable Energy"].sort()
};

const listsLineChart = {
    Energy: ["Total Energy", "Number of Session", "Charging Time"].sort(),
    Financial: ["Charging Revenue", "Electricity Cost", "Operational Profit"].sort(),
    Green: ["Carbon Saving", "Renewable Energy"].sort()
};

// Mapping categories to MySQL fields
const chartDataMapping = {
    "Total Energy": "ENERGY",
    "Number of Session": (data) => data.length, // Custom handling for counting transactions
    "Charging Time": "AVG_CHARGING_TIME",
    "Charging Revenue": "CHARGING_REVENUE",
    "Electricity Cost": "ELECTRICITY_COST",
    "Operational Profit": "OPERATIONAL_PROFIT",
    "Carbon Saving": "CARBON_SAVINGS",
    "Renewable Energy": "RENEWABLE_ENERGY_RATIO"
};

const toggleDropdown_bar = document.getElementById("arrowDropdown_bar");
const barDropdownOptions = document.getElementById("ListOptions_bar");
const barDropdownMenu = document.getElementById("dropdownMenu_bar");
const barSelectedList = document.getElementById("selectedLists_bar");

const toggleDropdown_line = document.getElementById("arrowDropdown_line");
const lineDropdownOptions = document.getElementById("ListOptions_line");
const lineDropdownMenu = document.getElementById("dropdownMenu_line");
const lineSelectedList = document.getElementById("selectedLists_line");

let selectedBarChartCategory = listsBarChart[selectedCategory][0];
let selectedLineChartCategory = listsLineChart[selectedCategory][0];
barSelectedList.textContent = selectedBarChartCategory;
lineSelectedList.textContent = selectedLineChartCategory;


function updateSelectedChartCategories(selectedCategory) {
    switch (selectedCategory) {
        case 'Energy':
            selectedBarChartCategory = "Charging Time";
            selectedLineChartCategory = "Charging Time";
            break;
        case 'Financial':
            selectedBarChartCategory = "Charging Revenue";
            selectedLineChartCategory = "Charging Revenue";
            break;
        case 'Green':
            selectedBarChartCategory = "Carbon Saving";
            selectedLineChartCategory = "Carbon Saving";
            break;
        default:
            selectedBarChartCategory = listsBarChart[selectedCategory][0];
            selectedLineChartCategory = listsLineChart[selectedCategory][0];
            break;
    }

    // อัปเดตข้อความใน HTML
    barSelectedList.textContent = selectedBarChartCategory;
    lineSelectedList.textContent = selectedLineChartCategory;
    

    // เรียกใช้งานฟังก์ชันสำหรับอัปเดต Dropdown Menu
    updateDropdownMenuBarChart();
    updateDropdownMenuLineChart();


}


document.querySelectorAll("#ListOptions_bar .section_content_center-chart_yearly_line_title-dropdown_options_choose p").forEach(el => {
    if (el.innerText === selectedBarChartCategory) {
        el.classList.add("active_dropdown");
    }
});

document.querySelectorAll("#ListOptions_line .section_content_center-chart_yearly_line_title-dropdown_options_choose p").forEach(el => {
    if (el.innerText === selectedLineChartCategory) {
        el.classList.add("active_dropdown");
    }
});

// ฟังก์ชันสำหรับอัปเดต Dropdown Menu สำหรับ Bar และ Line Charts
function updateDropdownMenuBarChart() {
    barDropdownOptions.innerHTML = listsBarChart[selectedCategory].map((item) => `
        <div class="section_content_center-chart_yearly_line_title-dropdown_options_choose">
            <p class="${item === selectedBarChartCategory ? 'active_dropdown' : ''}">${item}</p>
        </div>
        <div class="section_content_center-chart_yearly_line_title-dropdown_options_choose_line"></div>
    `).join('');

    document.querySelectorAll("#ListOptions_bar .section_content_center-chart_yearly_line_title-dropdown_options_choose p").forEach(option => {
        option.addEventListener("click", function() {
            barSelectedList.innerText = this.innerText;
            selectedBarChartCategory = this.innerText;
            barDropdownMenu.style.display = "none";
            
            // เพิ่มคลาส active_dropdown ไปยังตัวเลือกที่ถูกกด
            document.querySelectorAll("#ListOptions_bar .section_content_center-chart_yearly_line_title-dropdown_options_choose p").forEach(el => {
                el.classList.remove("active_dropdown");
            });
            this.classList.add("active_dropdown");
            console.log("Bar Chart Updated to:", selectedBarChartCategory);

            fetchBarChartData();
        });
    });
}

document.getElementById("arrowDropdown_bar").addEventListener("click", () => {
    barDropdownMenu.style.display = barDropdownMenu.style.display === "block" ? "none" : "block";
    updateDropdownMenuBarChart();
});

function updateDropdownMenuLineChart() {
    lineDropdownOptions.innerHTML = listsLineChart[selectedCategory].map((item) => `
        <div class="section_content_center-chart_yearly_line_title-dropdown_options_choose">
            <p class="${item === selectedLineChartCategory ? 'active_dropdown' : ''}">${item}</p>
        </div>
        <div class="section_content_center-chart_yearly_line_title-dropdown_options_choose_line"></div>
    `).join('');

    document.querySelectorAll("#ListOptions_line .section_content_center-chart_yearly_line_title-dropdown_options_choose p").forEach(option => {
        option.addEventListener("click", function() {
            lineSelectedList.innerText = this.innerText;
            selectedLineChartCategory = this.innerText;
            lineDropdownMenu.style.display = "none";
            
            // เพิ่มคลาส active_dropdown ไปยังตัวเลือกที่ถูกกด
            document.querySelectorAll("#ListOptions_line .section_content_center-chart_yearly_line_title-dropdown_options_choose p").forEach(el => {
                el.classList.remove("active_dropdown");
            });
            this.classList.add("active_dropdown");
            
            fetchLineChartData();
        });
    });
}

document.getElementById("arrowDropdown_line").addEventListener("click", () => {
    lineDropdownMenu.style.display = lineDropdownMenu.style.display === "block" ? "none" : "block";
    updateDropdownMenuLineChart();
});

// Close dropdowns when clicking outside
document.addEventListener("click", function(event) {
    if (!lineDropdownMenu.contains(event.target) && !toggleDropdown_line.contains(event.target)) {
        lineDropdownMenu.style.display = "none";
    }
    if (!barDropdownMenu.contains(event.target) && !toggleDropdown_bar.contains(event.target)) {
        barDropdownMenu.style.display = "none";
    }
});

// ฟังก์ชัน debounce สำหรับลดจำนวนการเรียกใช้งาน
theDebounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

// ดึงข้อมูลจาก MySQL สำหรับ Bar และ Line Charts
const fetchBarChartData = theDebounce(async function() {
    try {
        const stationUrl = selectedStation.toLowerCase().replace(/\s+/g, '_');
        const response = await fetch(`http://localhost:3000/get-data_analysis_${stationUrl}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // กรองข้อมูลตาม period ที่ผู้ใช้เลือก
        const periodFilteredData = filterDataByPeriod(data);
        //console.log('Bar Chart Data:', JSON.stringify(periodFilteredData));

        updateBarChart(periodFilteredData);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Bar Chart:', error);
    }
}, 300);

const fetchLineChartData = theDebounce(async function() {
    try {
        const stationUrl = selectedStation.toLowerCase().replace(/\s+/g, '_');
        const response = await fetch(`http://localhost:3000/get-data_analysis_${stationUrl}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // กรองข้อมูลตาม period ที่ผู้ใช้เลือก
        const periodFilteredData = filterDataByPeriod(data);
        //console.log('Line Chart Data:', JSON.stringify(periodFilteredData));

        updateLineChart(periodFilteredData);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Line Chart:', error);
    }
}, 300);

// ฟังก์ชันสำหรับกรองข้อมูลตาม period ที่ผู้ใช้เลือก
function filterDataByPeriod(data) {
    let filteredData = [];

    // กรองข้อมูลตามปีที่ผู้ใช้เลือก
    const filteredByYear = data.filter(record => {
        const dateParts = record.DATE.split("/");
        const year = dateParts[2];
        return year === selectedYear;
    });

    if (selectedPeriod === "Weekly") {
        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

        filteredData = filteredByYear.filter(record => {
            const [day, month, year] = record.DATE.split("/").map(Number);
            const recordDate = new Date(year, month - 1, day);
            return recordDate >= currentWeekStart && recordDate <= currentWeekEnd;
        });
    } else if (selectedPeriod === "Monthly") {
        const currentMonth = new Date().getMonth() + 1;

        filteredData = filteredByYear.filter(record => {
            const [day, month] = record.DATE.split("/").map(Number);
            return month === currentMonth;
        });
    } else if (selectedPeriod === "Yearly") {
        filteredData = filteredByYear; // ใช้ข้อมูลทั้งหมดในปีนั้น
    }

    if (filteredData.length === 0) {
        console.log(`ไม่มีข้อมูลสำหรับปี: ${selectedYear}, ระยะเวลา: ${selectedPeriod}`);
    }

    return filteredData;
}



// ฟังก์ชันสำหรับอัปเดตข้อมูล Bar Chart
function updateBarChart(filteredData) {

    // กำหนดแกน x ของ Bar Chart ตาม period ที่เลือก
    let labels;
    if (selectedPeriod === "Weekly") {
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else if (selectedPeriod === "Monthly") {
        labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    } else if (selectedPeriod === "Yearly") {
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

       // เตรียมข้อมูลสำหรับ Bar Chart
       const stationData = filteredData.filter(record => record.STATION === selectedStation);
       const valueKey = chartDataMapping[selectedBarChartCategory];
       const data = labels.map(label => {
           const record = stationData.find(record => {
               const [day, month, year] = record.DATE.split("/").map(Number);
               const recordDate = new Date(year, month - 1, day);
   
               if (selectedPeriod === "Weekly") {
                   return recordDate.getDay() === labels.indexOf(label);
               } else if (selectedPeriod === "Monthly") {
                   return day === parseInt(label);
               } else if (selectedPeriod === "Yearly") {
                   return recordDate.getMonth() === labels.indexOf(label);
               }
           });
   
           // ลบหน่วย "฿" ก่อนแปลงเป็นตัวเลข
           return record ? parseFloat(record[valueKey]?.replace(/[a-zA-Z\s฿]+/g, '') || 0) : 0;
       });

           // ตรวจสอบว่าไม่มีข้อมูล (เช่น ปีที่ไม่มีข้อมูลใน MySQL)
    if (filteredData.length === 0) {
        data.fill(0); // ตั้งค่าทั้งหมดใน `data` เป็น 0
    }

    // คำนวณค่า Max, Avg, Min
    const max = Math.max(...data);
    const adjustedMax = Math.ceil((max / 10)) * 10; // Adjust max value
    const avg = (data.reduce((acc, val) => acc + val, 0) / data.length).toFixed(2);
    const min = Math.min(...data);

    document.getElementById("bar_max").innerText = `${max}`;
    document.getElementById("bar_avg").innerText = `${avg}`;
    document.getElementById("bar_min").innerText = `${min}`;

    // สร้างกราฟ Bar Chart
    const ctx = document.getElementById("myBarChart").getContext("2d");
    if (window.myBarChart instanceof Chart) {
        window.myBarChart.destroy();
    }
    window.myBarChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: ["#F37021"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: adjustedMax,
                    grid: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                },
                x: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
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

// ฟังก์ชันสำหรับอัปเดตข้อมูล Line Chart
function updateLineChart(filteredData) {

    // กำหนดแกน x ของ Line Chart ตาม period ที่เลือก
    let labels;
    if (selectedPeriod === "Weekly") {
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else if (selectedPeriod === "Monthly") {
        labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    } else if (selectedPeriod === "Yearly") {
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

    // เตรียมข้อมูลสำหรับ Line Chart
    const stationData = filteredData.filter(record => record.STATION === selectedStation);
    const valueKey = chartDataMapping[selectedLineChartCategory];
    const data = labels.map(label => {
        const record = stationData.find(record => {
            const [day, month, year] = record.DATE.split("/").map(Number);
            const recordDate = new Date(year, month - 1, day);

            if (selectedPeriod === "Weekly") {
                return recordDate.getDay() === labels.indexOf(label);
            } else if (selectedPeriod === "Monthly") {
                return day === parseInt(label);
            } else if (selectedPeriod === "Yearly") {
                return recordDate.getMonth() === labels.indexOf(label);
            }
        });
        return record ? parseFloat(record[valueKey]?.replace(/[a-zA-Z\s฿]+/g, '') || 0) : 0;
    });

        // ตรวจสอบว่าไม่มีข้อมูล (เช่น ปีที่ไม่มีข้อมูลใน MySQL)
        if (filteredData.length === 0) {
            data.fill(0); // ตั้งค่าทั้งหมดใน `data` เป็น 0
        }
    

    // คำนวณค่า Max, Avg, Min
    const max = Math.max(...data);
    const adjustedMax = Math.ceil((max / 10)) * 10; // Adjust max value
    const avg = (data.reduce((acc, val) => acc + val, 0) / data.length).toFixed(2);
    const min = Math.min(...data);

    document.getElementById("line_max").innerText = `${max}`;
    document.getElementById("line_avg").innerText = `${avg}`;
    document.getElementById("line_min").innerText = `${min}`;

    // สร้างกราฟ Line Chart
    const ctx = document.getElementById("myLineChart").getContext("2d");
    if (window.myLineChart instanceof Chart) {
        window.myLineChart.destroy();
    }
    window.myLineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                data,
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
                y: {
                    beginAtZero: true,
                    max: adjustedMax
                },
                x: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
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
    
                chart.data.datasets.forEach((datasets, index) => {
                    const meta = chart.getDatasetMeta(index);
                    if (!meta.hidden) {
                        ctx.save();
                        ctx.shadowColor = '#F37021'; 
                        ctx.shadowBlur = 6;
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

// เรียกใช้งานฟังก์ชันสร้างกราฟเมื่อโหลดข้อมูลสำเร็จ

function updateLineAndBarCharts(periodFilteredData) {
    fetchBarChartData();
    fetchLineChartData();
}




// Section 8: Summary Functions
function calculateSummaries(data) {
    // กรองข้อมูลตามปีที่เลือก
    const filteredData = data.filter(record => {
        if (record.DATE) {
            const [day, month, year] = record.DATE.split("/").map(Number);
            return year === parseInt(selectedYear);
        }
        return false; // กรองออกถ้าไม่มี DATE
    });

    // รวมค่า ต่าง ๆ
    const energySummary = filteredData.reduce((acc, record) => acc + parseFloat(record.ENERGY?.replace(' kWh', '') || 0), 0).toFixed(2);
    const financialSummary = filteredData.reduce((acc, record) => acc + parseFloat(record.CHARGING_REVENUE?.replace('฿', '') || 0), 0).toFixed(2);
    const greenSummary = filteredData.reduce((acc, record) => acc + parseFloat(record.CARBON_SAVINGS?.replace(' kg', '') || 0), 0).toFixed(2);

    // อัปเดต HTML
    document.getElementById("Energy_Summary").innerText = `${energySummary} kWh`;
    document.getElementById("Financial_Summary").innerText = `฿ ${financialSummary}`;
    document.getElementById("Green_Summary").innerText = `${greenSummary} kg`;
}




