
/* Typewriter Effect */

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("#typewriter");
    const messages = ["Vehicle", "Motorcycle", "Garbage Truck", "Bus", "Scooter"];

    elements.forEach((element, index) => {
        let messageIndex = index % messages.length; // ใช้ index ของ element ให้สอดคล้องกับข้อความใน array
        let i = 0;

        function typeWriter() {
            if (i < messages[messageIndex].length) {
                element.innerHTML += messages[messageIndex].charAt(i);
                i++;
                setTimeout(typeWriter, 100); // ความเร็วในการพิมพ์
            } else {
                // เมื่อพิมพ์ข้อความเสร็จแล้ว ให้รอสักพักและวนลูปใหม่
                setTimeout(() => {
                    element.innerHTML = ""; // ลบข้อความปัจจุบัน
                    i = 0; // รีเซ็ตตัวอักษร
                    messageIndex = (messageIndex + 1) % messages.length; // ไปยังข้อความถัดไป
                    typeWriter(); // เริ่มพิมพ์ข้อความใหม่
                }, 2000); // รอ 1 วินาทีก่อนวนลูปใหม่
            }
        }

        typeWriter();
    });
});


/* section_content-menu-header (sub-menu) */

document.addEventListener("DOMContentLoaded", function () {
    // สร้างแมปสำหรับเชื่อมโยงเมนูกับตัวย่อพิมพ์ใหญ่และ URL ของภาพพื้นหลัง
    const menuMap = {
        "section_content-menu-header-EV-highlight": {
            id: "EV",
            backgroundUrl: "../../assets/Overview/Background/Electric_Vehicle.png"
        },
        "section_content-menu-header-EM-highlight": {
            id: "EM",
            backgroundUrl: "../../assets/Overview/Background/Electric_Motorcycle.png"
        },
        "section_content-menu-header-EGT-highlight": {
            id: "EGT",
            backgroundUrl: "../../assets/Overview/Background/Electric_Garbage-truck.png"
        },
        "section_content-menu-header-EB-highlight": {
            id: "EB",
            backgroundUrl: "../../assets/Overview/Background/Electric_bus.png"
        },
        "section_content-menu-header-ES-highlight": {
            id: "ES",
            backgroundUrl: "../../assets/Overview/Background/Electric_Scooter.png"
        }
    };

    // เริ่มต้น highlight เมนู EGT เป็นค่าเริ่มต้น
    let activeMenu = document.getElementById("section_content-menu-header-EGT-highlight");
    activeMenu.classList.add("active");

    // กำหนดการเลือกเมนูทั้งหมด
    const menuItems = document.querySelectorAll(".section_content-menu-header > div");

    // กำหนดรูปภาพและข้อความทั้งหมด
    const images = document.querySelectorAll(".section_content-background > div img");
    const textDetails = document.querySelectorAll(".section_content-details-text > div");

    // แสดงรูปภาพและข้อความของ EGT เป็นค่าเริ่มต้น
    document.querySelector(".section_content-background-EGT img").style.display = "block";
    document.querySelector(".section_content-details-text-EGT").style.display = "block";

    // เปลี่ยนภาพพื้นหลังของ .section_content-details-datalize-background เป็นค่าเริ่มต้น
    const backgroundElement = document.querySelector(".section_content-details-datalize-background");
    backgroundElement.style.backgroundImage = `url(${menuMap["section_content-menu-header-EGT-highlight"].backgroundUrl})`;

    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", function (event) {
            event.preventDefault(); // ป้องกันการ redirect

            // ลบ highlight จากเมนูปัจจุบัน
            if (activeMenu) {
                activeMenu.classList.remove("active");
            }

            // ตั้งเมนูที่ถูกคลิกให้เป็น active และเก็บอ้างอิง
            activeMenu = menuItem;
            activeMenu.classList.add("active");

            // ใช้แมปเพื่อหาตัวย่อและ URL ของภาพพื้นหลังที่เกี่ยวข้อง
            const { id: menuId, backgroundUrl } = menuMap[menuItem.id];

            // ซ่อนรูปภาพและข้อความที่แสดงอยู่
            images.forEach(image => image.style.display = "none");
            textDetails.forEach(text => text.style.display = "none");

            // แสดงรูปภาพและข้อความที่ตรงกับเมนูที่ถูกเลือก
            const activeImage = document.querySelector(`.section_content-background-${menuId} img`);
            const activeText = document.querySelector(`.section_content-details-text-${menuId}`);

            if (activeImage) {
                activeImage.style.display = "block";
            }
            if (activeText) {
                activeText.style.display = "block";
            }

            // เปลี่ยนภาพพื้นหลังของ .section_content-details-datalize-background ให้ตรงกับเมนูที่ถูกเลือก
            if (backgroundElement) {
                backgroundElement.style.backgroundImage = `url(${backgroundUrl})`;
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // ตั้งค่า Swiper
    var swiper = new Swiper('.swiper-container', {
        
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + ' section_content-details-widget-pages_point" data-slide="' + index + '"></div>';
            },
        },
        autoplay: {
            delay: 5000, // เพิ่ม delay (5 วินาที) ก่อนเลื่อนสไลด์อัตโนมัติ
            disableOnInteraction: false, // ยังคงเล่น autoplay เมื่อผู้ใช้โต้ตอบกับสไลด์
        },
        speed: 800, // ตั้งความเร็วในการเปลี่ยนสไลด์ (800ms)
        easing: 'ease-in-out', // ตั้งการเคลื่อนไหวให้สมูธ
        on: {
            init: function () {
                // ตั้งค่าเริ่มต้นให้ bullet ที่ index 0 มี class active_bullet
                var defaultBullet = document.querySelector('.section_content-details-widget-pages_point[data-slide="0"]');
                if (defaultBullet) {
                    defaultBullet.classList.add('active_bullet');
                }

                // เพิ่มการคลิก bullet เพื่อเปลี่ยนสไลด์
                var bullets = document.querySelectorAll('.section_content-details-widget-pages_point');
                bullets.forEach(function (bullet) {
                    bullet.addEventListener('click', function () {
                        var slideIndex = parseInt(bullet.getAttribute('data-slide'));
                        swiper.slideTo(slideIndex + 1); // เปลี่ยนสไลด์ตาม index ที่คลิก (เพิ่ม 1 เนื่องจาก Swiper ใช้ index เริ่มต้นที่ 1 เมื่อ loop เปิดใช้งาน)
                    });
                });
            },
            slideChange: function () {
                // อัพเดต class active_bullet เมื่อเปลี่ยนสไลด์
                var bullets = document.querySelectorAll('.section_content-details-widget-pages_point');
                bullets.forEach(function (bullet) {
                    bullet.classList.remove('active_bullet');
                });

                var activeIndex = swiper.realIndex; // index ของสไลด์ปัจจุบัน
                var activeBullet = document.querySelector('.section_content-details-widget-pages_point[data-slide="' + activeIndex + '"]');
                if (activeBullet) {
                    activeBullet.classList.add('active_bullet');
                }
            }
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('info').addEventListener('click', function() {
      const popup = document.querySelector('.section_bottom-content-charging_status-info_popup');
  
      if (popup.style.display === 'block') {
        // ใช้ setTimeout เพื่อรอเวลาให้แอนิเมชันเสร็จก่อนซ่อน
        popup.classList.remove('show');
        setTimeout(() => {
          popup.style.display = 'none'; // ซ่อนหลังจากแอนิเมชันเสร็จ
        }, 300); // รอ 300ms ก่อนซ่อน
      } else {
        // แสดง popup พร้อม animation
        popup.style.display = 'block';
        setTimeout(() => {
          popup.classList.add('show');
        }, 10); // ให้เวลาเล็กน้อยเพื่อให้ transition ทำงาน
      }
    });
  
  });
  
/* 
document.addEventListener("DOMContentLoaded", function () {
    // เริ่มต้น highlight เมนู Overview
    let activeMenu = document.getElementById("section_bottom-content-charging_status-title_connector1-icon-highlight");
    activeMenu.classList.add("active");

    // กำหนดการเลือกเมนูทั้งหมด
    const menuItems = document.querySelectorAll(".section_bottom-content-charging_status-title_connector > div");

    // สร้างแมพของ icon สีดำและสีขาว
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

     // เปลี่ยน icon ของเมนู Financial เป็นสีขาว (active) ตั้งแต่เริ่มต้น
     const initialIconImg = activeMenu.querySelector("img");
     if (initialIconImg && iconMap[activeMenu.id]) {
         initialIconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].active}`;
     }

    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", function (event) {
            event.preventDefault(); // ป้องกันการ redirect

            // ลบ highlight จากเมนูปัจจุบัน
            if (activeMenu) {
                activeMenu.classList.remove("active");
                
                // เปลี่ยน icon ของเมนูที่ไม่ได้ active กลับเป็นสีดำ
                const iconImg = activeMenu.querySelector("img");
                if (iconImg && iconMap[activeMenu.id]) {
                    iconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].default}`;
                }
            }

            // ตั้งเมนูที่ถูกคลิกให้เป็น active และเก็บอ้างอิง
            activeMenu = menuItem;
            activeMenu.classList.add("active");

            // เปลี่ยน icon ของเมนูที่ active ให้เป็นสีขาว
            const iconImg = activeMenu.querySelector("img");
            if (iconImg && iconMap[activeMenu.id]) {
                iconImg.src = `../../assets/Charging_Station/Connector/${iconMap[activeMenu.id].active}`;
            }
        });
    });
});
*/

/* 
// Data Analysis 
document.addEventListener("DOMContentLoaded", function () {
    // เริ่มต้น highlight เมนู Overview
    let activeMenu = document.getElementById("section_bottom-content-data-category-icon_financial-highlight");
    activeMenu.classList.add("active");

    // กำหนดการเลือกเมนูทั้งหมด
    const menuItems = document.querySelectorAll(".section_bottom-content-data-category > div");

    // สร้างแมพของ icon สีดำและสีขาว
    const iconMap = {
        "section_bottom-content-data-category-icon_enegy-highlight": {
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

     // เปลี่ยน icon ของเมนู Financial เป็นสีขาว (active) ตั้งแต่เริ่มต้น
     const initialIconImg = activeMenu.querySelector("img");
     if (initialIconImg && iconMap[activeMenu.id]) {
         initialIconImg.src = `../../assets/Overview/Data_Analysis/${iconMap[activeMenu.id].active}`;
     }

    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", function (event) {
            event.preventDefault(); // ป้องกันการ redirect

            // ลบ highlight จากเมนูปัจจุบัน
            if (activeMenu) {
                activeMenu.classList.remove("active");
                
                // เปลี่ยน icon ของเมนูที่ไม่ได้ active กลับเป็นสีดำ
                const iconImg = activeMenu.querySelector("img");
                if (iconImg && iconMap[activeMenu.id]) {
                    iconImg.src = `../../assets/Overview/Data_Analysis/${iconMap[activeMenu.id].default}`;
                }
            }

            // ตั้งเมนูที่ถูกคลิกให้เป็น active และเก็บอ้างอิง
            activeMenu = menuItem;
            activeMenu.classList.add("active");

            // เปลี่ยน icon ของเมนูที่ active ให้เป็นสีขาว
            const iconImg = activeMenu.querySelector("img");
            if (iconImg && iconMap[activeMenu.id]) {
                iconImg.src = `../../assets/Overview/Data_Analysis/${iconMap[activeMenu.id].active}`;
            }
        });
    });
});

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
                            size:7 // ขนาดฟอนต์ของแกน x
                        }
                    }
                },
                y: {
                    grid:{
                        display:false
                    },
                    ticks: {
                        font: {
                            size: 7 // ขนาดฟอนต์ของแกน y
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

*/

/* Maintenance */
/* 
document.addEventListener("DOMContentLoaded", function() {
    const stations = ["Nong Kheam", "On Nut", "Bang Khen", "Lat Krabang", "Thon Buri"].sort();
    const container = document.querySelector(".section_bottom-content-maintenance-details");

    stations.forEach(station => {
        // สร้าง div สำหรับรายละเอียดสถานี
        const stationDiv = document.createElement("div");
        stationDiv.className = "section_bottom-content-maintenance-details-station";

        // สร้าง div สำหรับ wrench icon
        const wrenchDiv = document.createElement("div");
        wrenchDiv.className = "section_bottom-content-maintenance-details-wrench";
        wrenchDiv.innerHTML = `<img src="../../assets/Overview/Maintenance/Scraw.png" alt="">`;
        stationDiv.appendChild(wrenchDiv);

        // สร้าง div สำหรับชื่อสถานี
        const nameDiv = document.createElement("div");
        nameDiv.className = "section_bottom-content-maintenance-details-name";
        nameDiv.innerHTML = `<p>${station}</p>`;
        stationDiv.appendChild(nameDiv);

        // สร้าง div สำหรับสถานะการชาร์จ
        const statusDiv = document.createElement("div");
        statusDiv.className = "section_bottom-content-maintenance-details-status";

        // สร้าง div สำหรับ charger ซ้ำ 11 อัน
        for (let i = 1; i <= 11; i++) {
            const chargerDiv = document.createElement("div");
            chargerDiv.className = "section_bottom-content-maintenance-details-status-charger";
            chargerDiv.innerHTML = `<p>${i}</p>`;
            statusDiv.appendChild(chargerDiv);
        }

        // เพิ่ม statusDiv เข้าไปใน stationDiv
        stationDiv.appendChild(statusDiv);

        // เพิ่ม stationDiv เข้าไปใน container หลัก
        container.appendChild(stationDiv);
    });
});
*/