
/* 
//Dropdown


document.addEventListener("DOMContentLoaded", function() {
    // รายชื่อสถานีเรียงตามตัวอักษร A-Z
    const stations = ["NONG KHEAM", "ON NUT", "BANG KHEN", "LAT KRABANG", "THON BURI"].sort();
    const selectedStationElement = document.getElementById("selectedStation");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const toggleDropdown = document.getElementById("toggleDropdown");
    const stationOptions = document.getElementById("stationOptions");

    // กำหนดค่าเริ่มต้นโดยใช้สถานีแรกสุดหากไม่มีสถานีที่ถูกบันทึกไว้
    let selectedStation = localStorage.getItem("selectedStation") || stations[0];
    selectedStationElement.textContent = selectedStation;

    function updateStationOptions() {
        stationOptions.innerHTML = ""; // ล้างตัวเลือกสถานีก่อน
        stations.forEach(station => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "section_content-top-details-banner_station-name-dropdown_options_choose";

            const stationName = document.createElement("p");
            stationName.textContent = station;

            // ตั้งค่า active สำหรับสถานีที่เลือก
            if (station === selectedStation) {
                stationName.classList.add("active");
                stationName.style.color = "rgba(217, 217, 217, 1)";
                stationName.style.transform = "none";
            }

            stationName.addEventListener("click", function() {
                // อัปเดตสถานีที่เลือก
                selectedStation = station;
                selectedStationElement.textContent = selectedStation;
                localStorage.setItem("selectedStation", selectedStation);

                // อัปเดตตัวเลือกสถานี
                updateStationOptions();
                
                // ปิดเมนูดรอปดาวน์
                dropdownMenu.style.display = "none";
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


// Pages

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".section_content-charger_number > p");
    const container = document.querySelector('.section_content-center'); // เลือก container ที่ต้องการ scroll

    const cardHeight = 250; // ความสูงของการ์ดแต่ละใบ
    const cardsPerPage = 10; // จำนวนการ์ดต่อหน้า
    const overlap = 5; // จำนวนการ์ดที่ต้องการให้ทับซ้อนกันระหว่างหน้า
    const scrollOffset = cardHeight * overlap; // ส่วนที่ทับซ้อนกันระหว่างหน้า

    // ตั้งค่าเริ่มต้นให้ Scroll ไปที่การ์ดหมายเลข 1 (หน้าแรก)
    container.scrollTop = 0;

    // ฟังก์ชันสำหรับการอัปเดต active ตามการเลื่อนของ scrollTop
    function updateActivePage() {
        // คำนวณการ์ดที่อยู่ด้านบนสุดของหน้าจอ
        const scrollPosition = container.scrollTop;
        const firstVisibleCard = Math.floor(scrollPosition / cardHeight) + 1;
        const lastVisibleCard = firstVisibleCard + cardsPerPage - 1;

        // คำนวณเพจที่ควร active โดยดูจากการ์ดสุดท้ายที่แสดงอยู่
        let activePage = Math.floor((lastVisibleCard - 1) / overlap) ;

        // ลบ active class จากทุกหมายเลขเพจ
        menuItems.forEach(item => item.classList.remove("active"));

        // เพิ่ม active class ให้กับเพจที่คำนวณได้
        const activeMenuItem = document.querySelector(`.section_content-charger_number > p[data-index="${activePage}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add("active");
        }
    }

    // เรียก updateActivePage เมื่อคลิกที่เพจ
    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener("click", function (event) {
            event.preventDefault();

            // ลบคลาส active จากเมนูปัจจุบันทั้งหมด
            menuItems.forEach(item => item.classList.remove("active"));

            // เพิ่มคลาส active ให้กับตัวเลขที่ถูกเลือก
            menuItem.classList.add("active");

            // คำนวณตำแหน่งเลื่อนสำหรับหน้า โดยใช้จำนวนการ์ดทับซ้อนกัน
            const scrollPosition = index * scrollOffset;

            // เลื่อนไปยังตำแหน่งที่คำนวณ
            container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        });
    });

    // เรียกใช้ updateActivePage เมื่อมีการเลื่อนด้วยเมาส์
    container.addEventListener("scroll", updateActivePage);

    // เรียกใช้ updateActivePage ทันทีเมื่อโหลดหน้า
    updateActivePage();
});





// เลือก Element ที่ต้องการเพิ่มการ์ดเข้าไป
const container = document.querySelector('.section_content-center'); // สมมุติว่าเราใส่การ์ดใน section_content-center

// ฟังก์ชันสร้างการ์ด
function createCard(index) {
    const card = document.createElement('div');
    card.className = 'section_content-center-card';

    card.innerHTML = `
        <div class="section_content-center-card-details">
            <div class="section_content-center-card-details-top">
                <p>CHARGER ${String(index).padStart(2, '0')}</p>
                <br>
                <p>Available</p>
            </div>
            <div class="section_content-center-card-details-top-line"></div>
            <div class="section_content-center-card-details-top-charger">
                <img src="../../../assets/Maintenance/Charger.png" alt="">
            </div>
            <div class="section_content-center-card-details-bottom">
                <div class="section_content-center-card-details-bottom-time">
                    <img src="../../../assets/Maintenance/Card/Calendar-inactive.png" alt="">
                </div>
                <div class="section_content-center-card-details-bottom-energy">
                    <img src="../../../assets/Maintenance/Card/Operation-inactive.png" alt="">
                </div>
                <div class="section_content-center-card-details-bottom-battery">
                    <img src="../../../assets/Maintenance/Card/Time-inactive.png" alt="">
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// เพิ่มการ์ดทั้งหมด 11 อัน
for (let i = 1; i <= 11; i++) {
    const card = createCard(i);
    container.appendChild(card);
}

*/




document.addEventListener("DOMContentLoaded", function() {
    const optionIcon3D = document.getElementById('section_content-option_icon_3D');
    const sectionStation = document.querySelector('.section_content-option-station');
    const topDetailsBanner = document.querySelector('.section_content-top-details');
    const sectionCenter = document.querySelector('.section_content-center');
    const sectionContent = document.querySelector('.section_content');
    const topImage = document.querySelector('.section_content-top img');
    let isActive = false;
    let isAnimating = false;

    optionIcon3D.addEventListener("click", function() {
        if (isAnimating) return;  // หยุดถ้ากำลังมีการทำแอนิเมชั่นอยู่แล้ว
        isAnimating = true;

        if (!isActive) {
            // เปลี่ยนชื่อไฟล์เป็น 3D-active
            optionIcon3D.src = "../../../assets/Charging_Station/Option_status/3D-active.png";

            // เปลี่ยนแปลง .section_content-option-station ให้ display เป็น block
            sectionStation.style.display = "flex";

            // .section_content-top-details-banner ลอยขึ้นและจางหายไป
            gsap.to(topDetailsBanner, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-center เลื่อนลง
            gsap.to(sectionCenter, {
                y: 50, // ประมาณ 5rem
                duration: 1,
                ease: "power2.out"
            });

            // .section_content เปลี่ยน height เป็น 900px
            gsap.to(sectionContent, {
                height: "900px",
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-top img เปลี่ยนเป็น none และทำ fade out
            gsap.to(topImage, {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: function() {
                    topImage.style.display = "none";
                    isAnimating = false;
                }
            });

            isActive = true;
        } else {
            // กลับไปเป็นเหมือนเดิม

            // เปลี่ยนชื่อไฟล์กลับเป็น 3D-inactive
            optionIcon3D.src = "../../../assets/Charging_Station/Option_status/3D-inactive.png";

            // เปลี่ยนแปลง .section_content-option-station ให้ display เป็น none
            sectionStation.style.display = "none";

            // .section_content-top-details-banner กลับมาที่เดิม
            gsap.to(topDetailsBanner, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-center กลับมาเลื่อนขึ้น
            gsap.to(sectionCenter, {
                y: 0,
                duration: 1,
                ease: "power2.out"
            });

            // .section_content เปลี่ยน height กลับมาเดิม
            gsap.to(sectionContent, {
                height: "800px",
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-top img กลับมาและทำ fade in
            topImage.style.display = "block";
            gsap.to(topImage, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                onComplete: function() {
                    isAnimating = false;
                }
            });

            isActive = false;
        }
    });
});
