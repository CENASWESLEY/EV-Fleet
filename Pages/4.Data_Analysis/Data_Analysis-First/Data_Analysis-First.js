/*

// section_top-menu-header (main-menu)

document.addEventListener("DOMContentLoaded", function () {
    // เริ่มต้น highlight เมนู Overview
    let activeMenu = document.getElementById("section_top-menu-header-data_analysis-highlight");
    activeMenu.classList.add("active");

    // กำหนดการเลือกเมนูทั้งหมด
    const menuItems = document.querySelectorAll(".section_top-menu-header > div a");

    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", function (event) {
            const link = menuItem.querySelector("a");
            // ตรวจสอบว่ามี href หรือไม่
            if (link && link.getAttribute("href") === "") {
                event.preventDefault(); // ป้องกันการ redirect เฉพาะลิงก์ว่าง
            }

            // ลบ highlight จากเมนูปัจจุบัน
            if (activeMenu) {
                activeMenu.classList.remove("active");
            }

            // ตั้งเมนูที่ถูกคลิกให้เป็น active และเก็บอ้างอิง
            activeMenu = menuItem;
            activeMenu.classList.add("active");
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // รายชื่อสถานีเรียงตามตัวอักษร A-Z
    const lists = ["Operational Costs", "Electricity Costs", "Maintenance Costs", "Revenue Generated", "Net Profit", "Station Utilization"].sort();
    const selectedListsElement = document.getElementById("selectedLists_bar");
    const dropdownMenu = document.getElementById("dropdownMenu_bar");
    const toggleDropdown = document.getElementById("toggleDropdown_bar");
    const listOptions = document.getElementById("ListOptions_bar");

    // กำหนดค่าเริ่มต้นโดยใช้สถานีแรกสุดหากไม่มีสถานีที่ถูกบันทึกไว้
    let selectedLists = localStorage.getItem("selectedLists_bar") || lists[0];
    selectedListsElement.textContent = selectedLists;

    function updateStationOptions() {
        listOptions.innerHTML = ""; // ล้างตัวเลือกสถานีก่อน
        lists.forEach(list => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "section_content_center-chart_yearly_bar_title-dropdown_options_choose";

            const listName = document.createElement("p");
            listName.textContent = list;

            // ตั้งค่า active สำหรับสถานีที่เลือก
            if (list === selectedLists) {
                listName.classList.add("active_dropdown");
                listName.style.color = "rgba(217, 217, 217, 1)";
                listName.style.transform = "none";
            }

            listName.addEventListener("click", function() {
                // อัปเดตสถานีที่เลือก
                selectedLists = list;
                selectedListsElement.textContent = selectedLists;
                localStorage.setItem("selectedLists_bar", selectedLists);

                // อัปเดตตัวเลือกสถานี
                updateStationOptions();
                
                // ปิดเมนูดรอปดาวน์
                dropdownMenu.style.display = "none";
            });

            optionDiv.appendChild(listName);
            listOptions.appendChild(optionDiv);

            if (list !== lists[lists.length - 1]) {
                const line = document.createElement("div");
                line.className = "section_content_center-chart_yearly_bar_title-dropdown_options_choose_line";
                listOptions.appendChild(line);
            }
        });
    }

    updateStationOptions();

    toggleDropdown.addEventListener("click", function() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(event) {
        if (!dropdownMenu.contains(event.target) && !toggleDropdown.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    // รายชื่อสถานีเรียงตามตัวอักษร A-Z
    const lists = ["Operational Costs", "Electricity Costs", "Maintenance Costs", "Revenue Generated", "Net Profit", "Station Utilization"].sort();
    const selectedListsElement = document.getElementById("selectedLists_line");
    const dropdownMenu = document.getElementById("dropdownMenu_line");
    const toggleDropdown = document.getElementById("toggleDropdown_line");
    const listOptions = document.getElementById("ListOptions_line");

    // กำหนดค่าเริ่มต้นโดยใช้สถานีแรกสุดหากไม่มีสถานีที่ถูกบันทึกไว้
    let selectedLists = localStorage.getItem("selectedLists_line") || lists[0];
    selectedListsElement.textContent = selectedLists;

    function updateStationOptions() {
        listOptions.innerHTML = ""; // ล้างตัวเลือกสถานีก่อน
        lists.forEach(list => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "section_content_center-chart_yearly_line_title-dropdown_options_choose";

            const listName = document.createElement("p");
            listName.textContent = list;

            // ตั้งค่า active สำหรับสถานีที่เลือก
            if (list === selectedLists) {
                listName.classList.add("active_dropdown");
                listName.style.color = "rgba(217, 217, 217, 1)";
                listName.style.transform = "none";
            }

            listName.addEventListener("click", function() {
                // อัปเดตสถานีที่เลือก
                selectedLists = list;
                selectedListsElement.textContent = selectedLists;
                localStorage.setItem("selectedLists_line", selectedLists);

                // อัปเดตตัวเลือกสถานี
                updateStationOptions();
                
                // ปิดเมนูดรอปดาวน์
                dropdownMenu.style.display = "none";
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

    updateStationOptions();

    toggleDropdown.addEventListener("click", function() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(event) {
        if (!dropdownMenu.contains(event.target) && !toggleDropdown.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // จัดการสำหรับปี
    const yearBoxes = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category_year_box");
    const defaultYear = "2024";
    
    yearBoxes.forEach(box => {
        const yearText = box.querySelector("p").textContent;
        if (yearText === defaultYear) {
            box.classList.add("active_selector"); // ตั้งค่า active สำหรับปีเริ่มต้น
        }

        box.addEventListener("click", () => {
            // ลบคลาส active จากปีอื่น ๆ
            yearBoxes.forEach(y => y.classList.remove("active_selector"));
            // เพิ่มคลาส active ให้กับปีที่ถูกคลิก
            box.classList.add("active_selector");
        });
    });

        // ช่วงเวลา
        const periodBoxes = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category-period_box");
        const defaultPeriod= "Weekly";
        
        periodBoxes.forEach(box => {
            const yearText = box.querySelector("p").textContent;
            if (yearText === defaultPeriod) {
                box.classList.add("active_selector"); // ตั้งค่า active สำหรับปีเริ่มต้น
            }
    
            box.addEventListener("click", () => {
                // ลบคลาส active จากปีอื่น ๆ
                periodBoxes.forEach(y => y.classList.remove("active_selector"));
                // เพิ่มคลาส active ให้กับปีที่ถูกคลิก
                box.classList.add("active_selector");
            });
        });

    // จัดการสำหรับไอคอนหมวดหมู่
    const iconBoxes = document.querySelectorAll(".section_content_center-chart_selector-icon_data-category_icon_box");
    const defaultCategory = "Financial";

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
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {


      
    // ฟังก์ชันที่สร้าง Pie Chart สำหรับ element ที่กำหนด
    function createPieChart(canvasId, data, colors) {
        const ctx = document.getElementById(canvasId).getContext("2d");
        return new Chart(ctx, {
            type: "doughnut",
            data: {
                //labels: ["Nong Kheam", "On nut", "Bang Khen", "Lat Krabrang", "Thon buri"],
                datasets: [
                    {
                        data: data,
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
                                const label = context.label || '';
                                const value = context.raw;
                                return `${label}: ฿ ${value}k`;
                            }
                        }
                    }
                },
                
                cutout: "65%", // กำหนดขนาดช่องว่างตรงกลาง
            }
        });
    }

    // สร้าง Pie Chart แต่ละอัน
    createPieChart("myPieChart1", [30, 20, 25, 15, 40], ["#6F0000", "#F37021", "#DB6B00", "#F4A06D", "#FFE1D5"]);
    createPieChart("myPieChart2", [10, 40, 50, 20, 15], ["#6F0000", "#F37021", "#DB6B00", "#F4A06D", "#FFE1D5"]);
    createPieChart("myPieChart3", [20, 30, 40, 60, 15], ["#6F0000", "#F37021", "#DB6B00", "#F4A06D", "#FFE1D5"]);
    createPieChart("myPieChart4", [20, 30, 10, 40, 20], ["#6F0000", "#F37021", "#DB6B00", "#F4A06D", "#FFE1D5"]);

    // เพิ่มฟังก์ชัน `createPieChart` สำหรับกราฟอื่น ๆ ได้ตามต้องการ
});


document.addEventListener("DOMContentLoaded", function () {
    // สร้าง Line Chart
    const linectx = document.getElementById('myLineChart').getContext('2d');
    myLineChart = new Chart(linectx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Weekly Data',
                data: [15, 8, 10, 6, 14, 5, 3,8,16,7,6,3,9,6,11],
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
                    min: 0,
                    // คำนวณค่าสูงสุดของแกน y
                    max:  20,
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
                        ctx.shadowBlur = 10;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 0; 
    
                  
                        meta.dataset.draw(ctx);
    
                        ctx.restore();
                    }
                });
            },
            
        }],
    });

    // สร้าง Bar Chart
    const barCtx = document.getElementById('myBarChart').getContext('2d');
    myBarChart  = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                data: [400, 300, 500, 150, 350, 400, 350, 250, 380, 420, 300, 370],
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
                    max: 500,
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

    // ฟังก์ชันสำหรับคำนวณผลรวมของข้อมูลใน Chart
    function calculateTotal(chart) {
        return chart.data.datasets[0].data.reduce((acc, value) => acc + value, 0);
    }

    // ฟังก์ชันอัปเดตข้อความใน `<p>` ของ line chart และ bar chart
    function updateChartValues() {
        const lineTotal = calculateTotal(myLineChart).toFixed(2);
        const barTotal = calculateTotal(myBarChart).toFixed(2);

        // อัปเดตค่าใน p ของ Line Chart
        document.querySelector('.section_content_center-chart_yearly_line_value p').innerText = `${lineTotal} K`;

        // อัปเดตค่าใน p ของ Bar Chart
        document.querySelector('.section_content_center-chart_yearly_bar_value p').innerText = `${barTotal} K`;
    }

    // เรียกฟังก์ชันเพื่ออัปเดตค่าในครั้งแรกหลังจากโหลดกราฟ
    updateChartValues();
});
*/