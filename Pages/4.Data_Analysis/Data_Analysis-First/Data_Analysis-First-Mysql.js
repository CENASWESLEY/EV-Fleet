

async function fetchDataFromDatabase(year, period, category) {
    try {
        const stations = ["Nong Kheam", "On Nut", "Bang Khen", "Lat Krabang", "thon Buri"].sort();
        const promises = stations.map(station => {
            const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
            return fetch(`http://localhost:3000/get-data_analysis_${stationUrl}?year=${year}&period=${period}&category=${category}`)
                .then(response => response.json())
                .then(data => ({ station, data }));
        });

        const results = await Promise.all(promises);

        
        if (results.some(result => result.data === null || result.data === undefined)) {
            console.warn('ข้อมูลบางส่วนไม่พบในฐานข้อมูล');
        }

        console.log('ข้อมูลถูกดึงออกมาแล้ว:', results);
        
        // รวมค่าแต่ละประเภทของแต่ละสถานี
        const parseValue = (value) => value !== undefined && value !== null ? parseFloat(value.toString().replace(/[^\d.]/g, '')) : 0;

        const datasets = results.map(result => {
            let fieldKey;
            if (category === 'Financial') {
                fieldKey = ['CHARGING_REVENUE', 'ELECTRICITY_COST', 'OPERATIONAL_PROFIT'];
            } else if (category === 'Green') {
                fieldKey = ['CARBON_SAVINGS', 'RENEWABLE_ENERGY_RATIO'];
            } else {
                fieldKey = ['ENERGY', 'AVG_CHARGING_TIME'];
            }
        
            return {
                station: result.station,
                data: result.data && result.data.length > 0
                    ? result.data.map(entry => parseValue(entry[fieldKey[0]])) // ปรับให้ตรงกับฟิลด์ที่ต้องการ
                    : []
            };
        });
        
        // เพิ่มการ Log ข้อมูลของ Pie Chart แต่ละอัน
        console.log('PieChart1 - Total Energy, Charging Revenue, Carbon Saving:', datasets.map(d => d.data.reduce((acc, curr) => acc + curr, 0).toFixed(2)));
        console.log('PieChart2 - Number of Sessions, Electricity Cost, Renewable Energy:', datasets.map(d => d.data.length));
        console.log('PieChart3 - Average Charging Time, Electricity Cost, Operational Profit:', datasets.map(d => d.data.length > 0 ? (d.data.reduce((acc, curr) => acc + curr, 0) / d.data.length).toFixed(2) : 0));
        
        // สำหรับ PieChart4: กำหนดให้เป็นค่าว่างหรือ null
        const pieChart4Values = datasets.map(() => 0);  // กำหนดให้เป็นค่าว่าง (null) หรือไม่ต้องคำนวณ
        console.log('PieChart4 - Reserved for future use:', pieChart4Values);

        // อัปเดตข้อมูลเพื่อใช้กับ Pie Chart
        const data = {
            stations: results.map(result => result.station),
            datasets: datasets,
            pieChart1: datasets.map(d => d.data.reduce((acc, curr) => acc + curr, 0).toFixed(2)),
            pieChart2: datasets.map(d => d.data.length),
            pieChart3: datasets.map(d => d.data.length > 0 ? (d.data.reduce((acc, curr) => acc + curr, 0) / d.data.length).toFixed(2) : 0),
            pieChart4: pieChart4Values // ทำให้ PieChart4 เป็นค่าว่าง (null) หรือค่าเปล่า
        };
        
        // Return data เพื่อใช้ต่อในส่วนอื่นๆ
        return data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        return { stations: [], datasets: [], pieChart1: [], pieChart2: [], pieChart3: [], pieChart4: [] };
    }
}

// ฟังก์ชันสำหรับสร้างกราฟ Pie Chart
document.addEventListener("DOMContentLoaded", async function () {
    // ตั้งค่า default สำหรับ Yearly, Periodical และ Category
    document.getElementById('2024').classList.add('active_selector');
    document.getElementById('Weekly').classList.add('active_selector');
    document.getElementById('Energy').classList.add('active_selector');
    document.querySelector("#Energy img").src = `../../../assets/Data_Analysis/Catagory/Energy-active.png`;
    let year = '2024';
    let period = 'Weekly';
    let category = 'Energy';

    let data = await fetchDataFromDatabase(year, period, category);

    let existingCharts = {};

    function createPieChart(canvasId, chartData, colors, title) {

    // ถ้ามี Pie Chart อยู่แล้ว ให้ลบออกก่อน
    if (existingCharts[canvasId]) {
        existingCharts[canvasId].destroy();
        delete existingCharts[canvasId];
    }

    // ตรวจสอบว่ามีข้อมูลที่จะแสดงหรือไม่ (กรณีข้อมูลทั้งหมดเป็นศูนย์หรือค่าว่าง)
    if (!chartData.data.length || chartData.data.every(value => value == 0)) {
        console.warn(`ไม่มีข้อมูลสำหรับ ${title}, Pie Chart จะไม่ถูกสร้าง`);
        return; // ไม่สร้างแผนภูมิหากไม่มีข้อมูล
    }

        const ctx = document.getElementById(canvasId).getContext("2d");
        existingCharts[canvasId] = new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: chartData.data,
                        backgroundColor: colors,
                        borderWidth: 3,
                        borderColor: "#ffffff",
                        hoverBorderColor: "#ffffff"
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
                            pointStyle: 'round',
                            font: {
                                size: 8,
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.raw;
                                return `${chartData.stations[context.dataIndex]}: ฿ ${value}k`;
                            }
                        }
                    },
                },
                cutout: "65%", // กำหนดขนาดช่องว่างตรงกลาง
            }
        });
    }

    // ฟังก์ชันสำหรับอัปเดตแผนภูมิ Bar และ Line Chart
    let existingLineBarCharts = {};

    function createLineOrBarChart(chartType, canvasId, labels, datasets, colors) {
        if (existingLineBarCharts[canvasId]) {
            existingLineBarCharts[canvasId].destroy();
        }
        const ctx = document.getElementById(canvasId).getContext("2d");
        existingLineBarCharts[canvasId] = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: datasets.map((dataset, index) => ({
                    label: dataset.station,
                    data: dataset.data,
                    backgroundColor: chartType === 'bar' ? colors[index] : undefined, // ใช้สีแตกต่างกันสำหรับแต่ละสถานีใน bar chart
                    borderColor: colors[index],
                    fill: chartType === 'line' ? false : true
                }))
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
                        grid: {
                            display: true,
                            color: 'rgba(200, 200, 200, 0.2)'
                        },
                        ticks: {
                            stepSize: Math.ceil(Math.max(...datasets.flatMap(dataset => dataset.data)) / 10) * 10 / 5,
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
            }
        });
    }

    // การจัดการสำหรับไอคอนหมวดหมู่
    const iconBoxes = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category_icon_box");
    const defaultCategory = "Energy";

    iconBoxes.forEach(box => {
        const img = box.querySelector("img");
        const baseName = img.alt; // ดึงชื่อจาก alt attribute

        if (baseName === defaultCategory) {
            box.classList.add("active_selector"); // ตั้งค่า active สำหรับหมวดหมู่เริ่มต้น
            img.src = `../../../assets/Data_Analysis/Catagory/${baseName}-active.png`;
        } else {
            img.src = `../../../assets/Data_Analysis/Catagory/${baseName}-inactive.png`;
        }

        box.addEventListener("click", () => {
            // ลบคลาส active และเปลี่ยนภาพเป็น inactive สำหรับไอคอนอื่น ๆ
            iconBoxes.forEach(b => {
                b.classList.remove("active_selector");
                const iconImg = b.querySelector("img");
                const iconBaseName = iconImg.alt; // ดึงชื่อจาก alt attribute
                iconImg.src = `../../../assets/Data_Analysis/Catagory/${iconBaseName}-inactive.png`;
            });

            // เพิ่มคลาส active และเปลี่ยนภาพเป็น active สำหรับไอคอนที่ถูกคลิก
            box.classList.add("active_selector");
            img.src = `../../../assets/Data_Analysis/Catagory/${baseName}-active.png`;
            category = box.id;

            // อัปเดตภาพใน Pie Chart ตามหมวดหมู่
            document.querySelectorAll(".section_content_center-chart_pie-data-inner_money img").forEach(img => {
                img.src = `../../../assets/Data_Analysis/PieChart/${category}.png`;
            });

            // อัปเดตข้อมูลกราฟ
            updateCharts(year, period, category);
            updateDropdownLists(category);
        });
    });


    // การจัดการ Dropdown สำหรับ Yearly, Periodical และ Category
    const yearDropdown = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category_year_box");
    const periodDropdown = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category-period_box");

    
    // รายชื่อของ lists ที่จะใช้ใน dropdown ของ Bar Chart และ Line Chart
    const listsByCategory = {
        Energy: ["Energy", "Number of Session", "Charging Time"].sort(),
        Financial: ["Charging Revenue", "Electricity Cost", "Operational Profit"].sort(),
        Green: ["Carbon Saving", "Renewable Energy"].sort()
    };

    // Elements for Line Chart Dropdown
    const selectedListsElement_line = document.getElementById("selectedLists_line");
    const dropdownMenu_line = document.getElementById("dropdownMenu_line");
    const toggleDropdown_line = document.getElementById("arrowDropdown_line");
    const listOptions_line = document.getElementById("ListOptions_line");

    // Elements for Bar Chart Dropdown
    const selectedListsElement_bar = document.getElementById("selectedLists_bar");
    const dropdownMenu_bar = document.getElementById("dropdownMenu_bar");
    const toggleDropdown_bar = document.getElementById("arrowDropdown_bar");
    const listOptions_bar = document.getElementById("ListOptions_bar");

    // กำหนดค่าเริ่มต้นโดยใช้สถานีแรกสุดหากไม่มีสถานีที่ถูกบันทึกไว้
    let selectedLists_line = listsByCategory[category][0];
    selectedListsElement_line.textContent = selectedLists_line;
    let selectedLists_bar = listsByCategory[category][0];
    selectedListsElement_bar.textContent = selectedLists_bar;
    selectedListsElement_line.textContent = selectedLists_line;
    selectedListsElement_bar.textContent = selectedLists_bar;

       function updateStationOptions(listOptions, lists, selectedListsElement, selectedLists, storageKey) {
        listOptions.innerHTML = ""; // ล้างตัวเลือกก่อน
        lists.forEach(list => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "section_content_center-chart_yearly_line_title-dropdown_options_choose";

            const listName = document.createElement("p");
            listName.textContent = list;

            // ตั้งค่า active สำหรับตัวเลือกที่เลือก
            if (list === selectedLists) {
                listName.classList.add("active_dropdown");
                listName.style.color = "rgba(217, 217, 217, 1)";
                listName.style.transform = "none";
            }

            listName.addEventListener("click", function() {
                // อัปเดตตัวเลือกที่เลือก
                selectedLists = list;
                selectedListsElement.textContent = selectedLists;
                localStorage.setItem(storageKey, selectedLists);

                // อัปเดตตัวเลือกทั้งหมด
                updateStationOptions(listOptions, lists, selectedListsElement, selectedLists, storageKey);
                
                // ปิดเมนู dropdown
                listOptions.parentElement.style.display = "none";

                // อัปเดตกราฟตามตัวเลือกที่เลือก
                updateCharts(year, period, category);
            });

            optionDiv.appendChild(listName);
            listOptions.appendChild(optionDiv);

            if (list !== lists[lists.length - 1]) {
                const line = document.createElement("div");
                line.className = "section_content_center-chart_yearly_line_title-dropdown_options_choose_line";
                listOptions.appendChild(line);
            }
        });
    }

    function updateDropdownLists(category) {
        selectedLists_line = listsByCategory[category][0];
        selectedLists_bar = listsByCategory[category][0];
        selectedListsElement_line.textContent = selectedLists_line;
        selectedListsElement_bar.textContent = selectedLists_bar;
            const lists = listsByCategory[category];
            updateStationOptions(listOptions_line, lists, selectedListsElement_line, selectedLists_line, "selectedLists_line");
            updateStationOptions(listOptions_bar, lists, selectedListsElement_bar, selectedLists_bar, "selectedLists_bar");
        }
        // Toggle Line Chart Dropdown
        toggleDropdown_line.addEventListener("click", function() {
            dropdownMenu_line.style.display = dropdownMenu_line.style.display === "block" ? "none" : "block";
        });

        // Toggle Bar Chart Dropdown
        toggleDropdown_bar.addEventListener("click", function() {
            dropdownMenu_bar.style.display = dropdownMenu_bar.style.display === "block" ? "none" : "block";
        });

        // Close dropdowns when clicking outside
        document.addEventListener("click", function(event) {
            if (!dropdownMenu_line.contains(event.target) && !toggleDropdown_line.contains(event.target)) {
                dropdownMenu_line.style.display = "none";
            }
            if (!dropdownMenu_bar.contains(event.target) && !toggleDropdown_bar.contains(event.target)) {
                dropdownMenu_bar.style.display = "none";
            }
        });
            
    
    function updateCharts(year, period, category) {
        fetchDataFromDatabase(year, period, category).then(newData => {

            // อัปเดต Pie Charts
            document.querySelectorAll(".section_content_center-chart_pie-data_station_name_group").forEach((group, pieIndex) => {
                group.innerHTML = ''; // ล้างเนื้อหาเดิม
                newData.stations.forEach((station, index) => {
                    // ตรวจสอบให้แน่ใจว่า newData มีข้อมูลสำหรับ pieChart แต่ละอัน
                    if (newData[`pieChart${pieIndex + 1}`] && newData[`pieChart${pieIndex + 1}`][index] !== undefined) {
                        const value = newData[`pieChart${pieIndex + 1}`][index];
                        const unit = (category === 'Energy' && pieIndex === 0) ? 'kWh' :
                                     (category === 'Financial' && pieIndex === 1) ? '฿' :
                                     (category === 'Green' && pieIndex === 1) ? '%' : '';
                        const stationHtml = `
                            <div class="section_content_center-chart_pie-data_station_name">
                                <p id="station_name_${pieIndex + 1}-${index + 1}">${station}</p>
                                <p id="station_value_${pieIndex + 1}-${index + 1}">${value} ${unit}</p>
                            </div>`;
                        group.innerHTML += stationHtml;
                    } else {
                        console.warn(`ไม่มีข้อมูลสำหรับ pieChart${pieIndex + 1} ที่ index ${index}`);
                    }
                });
            });

            // ลบกราฟ PieChart ทั้งหมดก่อนที่จะสร้างกราฟใหม่
        Object.keys(existingCharts).forEach(chartId => {
            if (existingCharts[chartId]) {
                existingCharts[chartId].destroy();
                delete existingCharts[chartId];
            }
        });
            
            // อัปเดต Pie Charts
            const pieChartConfig = {
                Energy: [
                    { id: "myPieChart1", data: newData.pieChart1, title: 'Total Energy' },
                    { id: "myPieChart2", data: newData.pieChart2, title: 'Number of Session' },
                    { id: "myPieChart3", data: newData.pieChart3, title: 'Charging Time' },
                ],
                Financial: [
                    { id: "myPieChart1", data: newData.pieChart2, title: 'Electricity Cost' },
                    { id: "myPieChart2", data: newData.pieChart3, title: 'Charging Revenue' },
                    { id: "myPieChart3", data: newData.pieChart4, title: 'Operational Profit' }
                ],
                Green: [
                    { id: "myPieChart1", data: newData.pieChart1, title: 'Carbon Saving' },
                    { id: "myPieChart2", data: newData.pieChart2, title: 'Renewable Energy' },
                ]
            };

        // อัปเดต Pie Charts ใหม่
        pieChartConfig[category].forEach(chart => {
            if (chart.data.length > 0 && chart.data.some(value => value != 0)) {
                createPieChart(chart.id, { stations: newData.stations, data: chart.data }, ["#6F0000", "#F37021", "#DB6B00", "#F4A06D", "#FFE1D5"], chart.title);
            } else {
                // ลบ Chart ที่ไม่มีข้อมูลออก
                if (existingCharts[chart.id]) {
                    existingCharts[chart.id].destroy();
                    delete existingCharts[chart.id];
                }
            }
        });
            
        // อัปเดตค่าผลรวมสำหรับแต่ละ Pie Chart
        document.getElementById('income_piechart1').innerText = newData.pieChart1.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(0);
        document.getElementById('income_piechart2').innerText = newData.pieChart2.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(0);
        document.getElementById('income_piechart3').innerText = newData.pieChart3.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(0);
        document.getElementById('income_piechart4').innerText = newData.pieChart4.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(0);

            


            // อัปเดต Bar และ Line Chart
            let labels;
            if (period === 'Weekly') {
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            } else if (period === 'Monthly') {
                labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
            } else if (period === 'Yearly') {
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            }

            const barLineDataMap = newData.datasets.map(dataset => ({
                station: dataset.station,
                data: dataset.data
            }));
            createLineOrBarChart('line', 'myLineChart', labels, barLineDataMap, ["#6F0000", "#F37021", "#DB6B00", "#F4A06D", "#FFE1D5"]);
            createLineOrBarChart('bar', 'myBarChart', labels, barLineDataMap, ["#6F0000", "#F37021", "#DB6B00", "#F4A06D", "#FFE1D5"]);

            
            const chartTitles = {
                Energy: {
                    pieChart1: 'Total Energy',
                    pieChart2: 'Number of Session',
                    pieChart3: 'Charging Time',
                    pieChart4: ''
                },
                Financial: {
                    pieChart1: 'Electricity Cost',
                    pieChart2: 'Charging Revenue',
                    pieChart3: 'Operational Profit'
                    
                },
                Green: {
                    pieChart1: 'Carbon Saving',
                    pieChart2: 'Renewable Energy',
                    pieChart3: '',
                    pieChart4: ''
                }
            };
        
            document.getElementById('pieChart_title1').innerText = chartTitles[category].pieChart1;
            document.getElementById('pieChart_title2').innerText = chartTitles[category].pieChart2;
            document.getElementById('pieChart_title3').innerText = chartTitles[category].pieChart3;
            document.getElementById('pieChart_title4').innerText = chartTitles[category].pieChart4;
        });
    }

    yearDropdown.forEach(yearBox => {
        yearBox.addEventListener("click", () => {
            yearDropdown.forEach(box => box.classList.remove("active_selector"));
            yearBox.classList.add("active_selector");
            year = yearBox.id;
            updateCharts(year, period, category);
        });
    });

    periodDropdown.forEach(periodBox => {
        periodBox.addEventListener("click", () => {
            periodDropdown.forEach(box => box.classList.remove("active_selector"));
            periodBox.classList.add("active_selector");
            period = periodBox.id;
            updateCharts(year, period, category);
        });
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

    // ดึงข้อมูลเริ่มต้นเมื่อเปิดหน้าเว็บ
    updateCharts(year, period, category);
    updateDropdownLists(category);
});

