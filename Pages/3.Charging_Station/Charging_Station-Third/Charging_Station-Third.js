


/* section_top-menu-header (main-menu)*/

/* 
document.addEventListener("DOMContentLoaded", function () {
    // เริ่มต้น highlight เมนู Overview
    let activeMenu = document.getElementById("section_top-menu-header-charging_station-highlight");
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
*/

/* LineChart */
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('myLineChart').getContext('2d');

    // สร้างกราฟ
    const myLineChart = new Chart(ctx, {
        
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                
                data: [15, 8, 10, 6, 14, 5, 3],
                borderColor: '#FFDECA',
                backgroundColor: '#F37021', // ใช้ gradient ที่สร้าง
                borderWidth: 2,
                pointBorderColor: '#FFDECA',
                pointRadius: 4,
                fill: true, // ทำให้เติมพื้นที่ใต้กราฟ
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        
                        font: {
                            size:10 
                        }
                    }
                },
                y: {
                    min: 0,
                    max: 20,
                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 5,
                        font: {
                            size:10 
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // ปิดการแสดง legend
                }
            }
        },
       
    });
});



/* Heat Map */


document.addEventListener("DOMContentLoaded", function () {
    // ตั้งค่าปัจจุบันสำหรับเดือนและปี
    const now = new Date();
    const currentMonth = now.toLocaleString('en-US', { month: 'long' }); // เปลี่ยนให้เดือนเป็นภาษาอังกฤษ
    const currentYear = now.getFullYear();

    // อัพเดทเดือนและปีใน HTML
    document.querySelector(".section_content-bottom-data-chart_heat-title-calendar p:first-child").textContent = currentMonth;
    document.querySelector(".section_content-bottom-data-chart_heat-title-calendar p:last-child").textContent = currentYear;

    // ตั้งค่าจำนวนวันที่มีในเดือนปัจจุบัน
    const daysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
    const colors = ["#FFFFFFFF", "#F37021", "#F4A06D", "#FFDECA"]; // สีสำหรับกล่อง (default = สีดำ)
    const heatContain = document.querySelector(".section_content-bottom-data-chart_heat-contain");

    // เคลียร์กล่องเก่าหากมี
    heatContain.innerHTML = "";

    // ตั้งค่าให้ section_content-bottom-data-chart_heat-contain เป็น grid
    heatContain.style.display = "grid";
    heatContain.style.gridTemplateColumns = "repeat(10, 30px)";
    heatContain.style.gap = "8px";

    // สร้างกล่องสำหรับแต่ละวันในเดือน
    for (let day = 1; day <= daysInMonth; day++) {
        const box = document.createElement("div");
        box.className = "section_content-bottom-data-chart_heat-contain_box";
        box.style.width = "25px";
        box.style.height = "25px";
        box.style.borderRadius = "5px";
        box.style.boxShadow = "0 0 5px rgba(234, 234, 234, 1)";
        box.style.backgroundColor = colors[0]; // เริ่มต้นด้วยสีดำ

        // เพิ่มกล่องเข้าไปใน heatContain
        heatContain.appendChild(box);
    }
});




/* ฺBarChart */
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('myBarChart').getContext('2d');

    const myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Data',
                data: [400, 300, 500, 150, 350, 400, 350, 250, 380, 420, 300, 370],
                backgroundColor: 'rgba(243, 112, 33, 1)', // สีแท่งกราฟ (สีส้ม)
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid:{
                        display:false
                    },
                    ticks: {
                        
                        font: {
                            size:10 // ขนาดฟอนต์ของแกน x
                        }
                    }
                },
                y: {
                    grid:{
                        display:false
                    },
                    ticks: {
                        font: {
                            size: 10 // ขนาดฟอนต์ของแกน y
                        },
                        stepSize: 100 // ระยะห่างระหว่างค่าของแกน y
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // ซ่อน label ข้อมูล (เพื่อให้ดูสะอาดเหมือนในภาพตัวอย่าง)
                },
                tooltip: {
                    enabled: false // ซ่อน tooltip เพื่อความเรียบง่าย
                }
            }
        }
    });
});
