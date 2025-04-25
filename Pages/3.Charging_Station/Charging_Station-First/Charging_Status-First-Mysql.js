
document.addEventListener("DOMContentLoaded", function() {
    // รายชื่อสถานีเรียงตามตัวอักษร A-Z
    const stations = ["NONG KHEAM", "ON NUT", "BANG KHEN", "LAT KRABANG", "THON BURI"].sort();
    const selectedStationElement = document.getElementById("selectedStation");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const toggleDropdown = document.getElementById("toggleDropdown");
    const stationOptions = document.getElementById("stationOptions");
    const container = document.querySelector('.section_content-center');
    const connectorButton = document.getElementById("section_content-option_icon_connector");
    let currentConnector = 1;  // เริ่มต้นที่ connector 1
    let numberAvailable = 0;
    let numberCharging = 0;
    let numberFinishing = 0;
    let numberSuspended = 0;
    let numberUndefined = 0;

    
    // กำหนดค่าเริ่มต้นโดยใช้สถานีแรกสุดหากไม่มีสถานีที่ถูกบันทึกไว้
    let selectedStation = localStorage.getItem("selectedStation") || stations[0];
    selectedStationElement.textContent = selectedStation;
    
    // เรียกฟังก์ชันโหลดข้อมูลสถานีที่เลือกพร้อม connector 1 เป็นค่า default
    loadStationData(selectedStation, currentConnector);
    Cards(currentConnector);

    //นับจำนวนตัวเลขสถานะ
    function updateStatusCounts() {
        const availableElement = document.getElementById("numberAvailable");
        const chargingElement = document.getElementById("numberCharging");
        const finishingElement = document.getElementById("numberFinishing");
        const suspendedElement = document.getElementById("numberSuspended");
        const undefinedElement = document.getElementById("numberUndefined");

    
        // ใช้ padStart เพื่อให้เลขเป็น 2 หลัก
        const formattedAvailable = String(numberAvailable).padStart(2, '0');
        const formattedCharging = String(numberCharging).padStart(2, '0');
        const formattedFinishing = String(numberFinishing).padStart(2, '0');
        const formattedSuspended = String(numberSuspended).padStart(2, '0');
        const formattedUndefined = String(numberUndefined).padStart(2, '0');

        // อัปเดตค่าจำนวนสถานะ
        if (availableElement) {
            availableElement.textContent = formattedAvailable;
        }
        if (chargingElement) {
            chargingElement.textContent = formattedCharging;
        }
        if (finishingElement) {
            finishingElement.textContent = formattedFinishing;
        }
        if (suspendedElement) {
            suspendedElement.textContent = formattedSuspended;
        }
        if (undefinedElement) {
            undefinedElement.textContent = formattedUndefined;
        }
    }
    
    
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

                // รีเซ็ทการ์ดทั้งหมดก่อน
                resetAllCards();

                // อัปเดตตัวเลือกสถานี
                updateStationOptions();
                
                // ปิดเมนูดรอปดาวน์
                dropdownMenu.style.display = "none";

                loadStationData(selectedStation,1);
                Cards(1);
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


       // Event listener สำหรับการสลับ connector
       connectorButton.addEventListener("click", function() {
        currentConnector = currentConnector === 1 ? 2 : 1;  // สลับระหว่าง connector 1 และ 2
        const imagePath = `../../../assets/Charging_Station/Option_status/Connector${currentConnector}.png`;
        connectorButton.src = imagePath;  // เปลี่ยนภาพตาม connector ที่เลือก

        // โหลดข้อมูลใหม่โดยใช้ connector ที่เลือก
        loadStationData(selectedStation, currentConnector);
        // รีเฟรชการ์ดทั้งหมดหลังจากเปลี่ยน connector
        Cards(currentConnector);
    });
        // ฟังก์ชันสำหรับรีเฟรชการ์ดทั้งหมด
        function Cards(connector) {
            container.innerHTML = '';  // ล้างการ์ดเก่าทั้งหมด
            for (let i = 1; i <= 11; i++) {
                // สร้างการ์ดใหม่สำหรับทุกๆ ค่า connector ที่เลือก
                const card = createCard(i, connector);
                container.appendChild(card);  // เพิ่มการ์ดลงใน container
            }
        }

    // ฟังก์ชันสำหรับดึงข้อมูล transaction ของสถานีที่เลือก
    function loadStationData(station, connector) {
        const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
        
        fetch(`http://localhost:3000/get-transaction_${stationUrl}`)
            .then(response => response.json())
            .then(data => {


                // รีเซ็ตค่าของสถานะ
                numberAvailable = 0;
                numberCharging = 0;
                numberFinishing = 0;
                numberSuspended = 0;
                numberUndefined = 0;
                resetAllCards();
                
                // ตรวจสอบว่า data มีข้อมูลหรือไม่
                if (!data || data.length === 0) {
                    // ถ้าไม่มีข้อมูล ให้ถือว่าทุกสถานีเป็น "Undefined"
                    numberUndefined = 11; // จำนวนสถานีทั้งหมด
                    resetAllCards(); // รีเซ็ตการ์ดทั้งหมดเป็นสถานะ "Undefined"
                } else {
                    data.forEach(transaction => {
                        if (transaction.CONNECTOR == connector) {  // ตรวจสอบ connector
                            const { CHARGER_ID, VEHICLE_ID, STATUS, DURATION, ENERGY, SOC } = transaction;
                            const formattedChargerId = String(CHARGER_ID).padStart(2, '0');
                            updateCardStatus(formattedChargerId, VEHICLE_ID, STATUS, DURATION, ENERGY, SOC);

                            
                            // ตรวจสอบว่า STATUS มีค่าไม่เป็นค่าว่างหรือ null
                            if (!STATUS || STATUS.trim() === "") {
                                // ถ้า STATUS ไม่มีข้อมูล ให้ถือว่าเป็น "None"
                                numberUndefined++;
                            } else {
                                // นับจำนวนสถานะที่แท้จริง
                                switch (STATUS) {
                                    case "Available":
                                        numberAvailable++;
                                        break;
                                    case "Charging":
                                        numberCharging++;
                                        break;
                                    case "Finishing":
                                        numberFinishing++;
                                        break;
                                    case "Suspended":
                                        numberSuspended++;
                                        break;
                                    case "Undefined":
                                        numberUndefined++;
                                        break;
                                    default:
                                        // ถ้า STATUS ไม่ตรงกับใดๆ ให้ถือว่าเป็น "None"
                                        numberUndefined++;
                                        break;
                                }
                            }
                        }
                    });
            }
                
            
                updateStatusCounts();
                
            })
            .catch(error => console.error('Error fetching transaction data:', error));
    }

    function resetAllCards() {
        for (let i = 1; i <= 11; i++) {
            updateCardStatus(String(i).padStart(2, '0'), "", "Undefined");
        }
    }



    // ฟังก์ชันสำหรับอัปเดตการ์ดตามสถานะ
    function updateCardStatus(chargerId, vehicleId , status, duration, energy, soc) {
        const card = document.getElementById(`card${chargerId}`);
        if (!card) return;

        // ตรวจสอบว่า status มีค่าหรือไม่ ถ้าไม่มีให้กำหนดเป็น "None"
        if (!status || status.trim() === "") {
            status = "Undefined";  // หาก status เป็น null, undefined หรือค่าว่าง
        }        
        
        const titleCharger = card.querySelector('#title_charger');
        const statusCharger = card.querySelector('#status_charger');
        const lineStatusCharger = card.querySelector('#line_status_charger');
        const bottomIcons = card.querySelector('.section_content-center-card-details-bottom_icon');
    
        // ตั้งค่าสถานะและไอคอนตามสถานะที่ได้รับ
        switch (status) {
            case "Available":
                titleCharger.style.color = "#44F321";
                lineStatusCharger.style.background="linear-gradient(90deg, #FFFFFF 0%, #44F321 50%, #FFFFFF 100%)";
                statusCharger.textContent = "Available";
                setIcons(card, "white");
                break;
    
            case "Charging":
                titleCharger.style.color = "#F37021";
                lineStatusCharger.style.background = "linear-gradient(90deg, #FFFFFF 0%, #F37021 50%, #FFFFFF 100%)";
                statusCharger.textContent = `Charging • ${vehicleId}`;
                setIcons(card, "orange", duration, energy, soc);
                handleTimeBlinking(card);
                break;
    
            case "Finishing":
                titleCharger.style.color = "#F32121";
                lineStatusCharger.style.background = "linear-gradient(90deg, #FFFFFFFF 0%, #F32121 50%, #FFFFFFFF 100%)";
                statusCharger.textContent = `Finishing • ${vehicleId}`;
                setIcons(card, "none", duration, energy, soc);
                break;
    
            case "Suspended":
                // เพิ่มการตั้งค่าสีพื้นหลังเป็นสีดำเมื่อสถานะเป็น Suspended
                titleCharger.style.color = "#FFFFFF";
                lineStatusCharger.style.background = "linear-gradient(90deg, #00000000 0%, #FFFFFFFF 50%, #00000000 100%)";
                statusCharger.textContent = "Suspended";
                statusCharger.style.color = "#FFFFFF";
                setIcons(card, "white");
                
                // ตั้งค่าพื้นหลังสีดำใน #section_content-center-card-details
                card.style.backgroundColor = "#242424FF";
                bottomIcons.style.boxShadow = "0 0 10px #FFFFFFFF !important";  // เพิ่ม box-shadow

                break;
    
            case "Undefined": // ถ้าไม่มีข้อมูลหรือ status = "None"
                titleCharger.style.color = "#000000FF";
                lineStatusCharger.style.background = "linear-gradient(90deg, #FFFFFFFF 0%, #000000FF 50%, #FFFFFFFF 100%)";
                statusCharger.textContent = "Undefined";
                setIcons(card, "black");
                break;
    
            default:
                titleCharger.style.color = "#000000FF";
                lineStatusCharger.style.background = "linear-gradient(90deg, #FFFFFFFF 0%, #000000FF 50%, #FFFFFFFF 100%)";
                statusCharger.textContent = "Undefined";
                setIcons(card, "black");
                break;
        }
    }
    


// ฟังก์ชันช่วยสำหรับตั้งค่าไอคอนและข้อมูลในส่วนล่างของการ์ด
function setIcons(card, color, duration = "", energy = "", soc = "") {
    const timeImg = card.querySelector('#section_content-center-card-details-bottom-time_img');
    const energyImg = card.querySelector('#section_content-center-card-details-bottom-energy_img');
    const batteryImg = card.querySelector('#section_content-center-card-details-battery-time_img');
    
    const timeText = card.querySelector('#section_content-center-card-details-bottom-time_text');
    const energyText = card.querySelector('#section_content-center-card-details-bottom-energy_text');
    const batteryText = card.querySelector('#section_content-center-card-details-bottom-battery_text');

    if (color === "none") {
        timeImg.style.display = "none";
        energyImg.style.display = "none";
        batteryImg.style.display = "none";
    } else {
        timeImg.src = `../../../assets/Charging_Station/Card/Time-${color}.png`;
        energyImg.src = `../../../assets/Charging_Station/Card/Charge-${color}.png`;
        batteryImg.src = `../../../assets/Charging_Station/Card/Battery-${color}.png`;
        timeImg.style.display = "block";
        energyImg.style.display = "block";
        batteryImg.style.display = "block";
    }

    timeText.textContent = duration;
    energyText.textContent = energy;
    batteryText.textContent = soc;

    }
    let intervalId;  // ให้ `intervalId` เป็นตัวแปรภายนอกฟังก์ชัน

    function handleTimeBlinking(card) { 
        const timeImg = card.querySelector('#section_content-center-card-details-bottom-time_img');
        const timeText = card.querySelector('#section_content-center-card-details-bottom-time_text');
        
        if (timeText.textContent) {
            let timeInSeconds = timeToSeconds(timeText.textContent);  // คำนวณเวลาเป็นวินาที
            const status = card.querySelector('#status_charger').textContent;
            
            // หากเวลา >= 3600 และสถานะเป็น "Charging"
            if (timeInSeconds >= 3600 && status.includes("Charging")) {
                let colorSwitch = true;
                if (intervalId) {
                    clearInterval(intervalId);  // รีเซ็ต intervalId ก่อนที่จะเริ่มใหม่
                }
                intervalId = setInterval(() => {
                    timeInSeconds = timeToSeconds(timeText.textContent);  // คำนวณเวลาใหม่ในทุก ๆ รอบ

                    if (timeInSeconds < 3600 || !status.includes("Charging")) {
                        clearInterval(intervalId);
                        timeImg.src = "../../../assets/Charging_Station/Card/Time-orange.png";
                    } else {
                        timeImg.src = `../../../assets/Charging_Station/Card/Time-${colorSwitch ? 'orange' : 'white'}.png`;
                        colorSwitch = !colorSwitch;
                    }
                    
                }, 1000);  // กระพริบทุกๆ 1 วินาที
            }
        }
    }
    
    
    
    // ฟังก์ชันแปลงเวลาในรูปแบบ HH:MM:SS เป็นวินาที
    function timeToSeconds(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }


    // ฟังก์ชันสร้างการ์ด charger
function createCard(index, currentConnector) {
    const card = document.createElement('div');
    card.className = 'section_content-center-card';
    card.id = `card${String(index).padStart(2, '0')}`;  // ตั้งค่า ID เป็น 2 หลักเสมอ

    // สร้างชื่อ CHARGER ตาม currentConnector
    const chargerLetter = currentConnector === 1 ? 'A' : 'B'; // เลือก A หรือ B ตาม currentConnector
    const chargerTitle = `CHARGER ${String(index).padStart(2, '0')}${chargerLetter}`;
    card.innerHTML = `
        <div class="section_content-center-card-details" id="section_content-center-card-details">
            <div class="section_content-center-card-details-top">
                <p id="title_charger">${chargerTitle}</p>
                <br>
                <p id="status_charger"></p>
            </div>
            <div class="section_content-center-card-details-top-line" id="line_status_charger"></div>
            <div class="section_content-center-card-details-top-garbage_truck">
                <img src="../../../assets/Charging_Station/Garbage_truck.png" alt="">
            </div>
            <div class="section_content-center-card-details-bottom">
                <div class="section_content-center-card-details-bottom-time section_content-center-card-details-bottom_icon" >
                    <img src="../../../assets/Charging_Station/Card/Time-white.png" id="section_content-center-card-details-bottom-time_img" alt="">
                    <p id="section_content-center-card-details-bottom-time_text"></p>
                </div>
                <div class="section_content-center-card-details-bottom-energy section_content-center-card-details-bottom_icon">
                    <img src="../../../assets/Charging_Station/Card/Charge-white.png" id="section_content-center-card-details-bottom-energy_img" alt="">
                    <p id="section_content-center-card-details-bottom-energy_text"></p>
                </div>
                <div class="section_content-center-card-details-bottom-battery section_content-center-card-details-bottom_icon">
                    <img src="../../../assets/Charging_Station/Card/Battery-white.png" id="section_content-center-card-details-battery-time_img" alt="">
                    <p id="section_content-center-card-details-bottom-battery_text"></p>
                </div>
            </div>
        </div>
    `;

    return card;
}


});



/* Pages */

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
