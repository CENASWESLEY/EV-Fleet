class Assistant_Left extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="assistant_left">
            <div class="assistant_left-circle">
                <div class="assistant_left-circle-group_icon">
                    <div class="assistant_left-circle-icon">
                        <a href="">
                            <img src="../../../assets/Overview/Assistant_Left/Search.png" alt="">
                        </a>
                    </div>
                    <div class="assistant_left-circle-icon" id="notification">
                        <img src="../../../assets/Overview/Assistant_Left/Notification.png" alt="">
                    </div>
                    <div class="assistant_left-circle-icon">
                        <a href="">
                            <img src="../../../assets/Overview/Assistant_Left/Team_Management.png" alt="">
                        </a>
                    </div>
                    <div class="assistant_left-circle-icon">
                        <a href="">
                            <img src="../../../assets/Overview/Assistant_Left/Report.png" alt="">
                        </a>
                    </div>
                    <div class="assistant_left-circle-icon">
                        <a href="">
                            <img src="../../../assets/Overview/Assistant_Left/Chat.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="assistant_left-circle-group_icon-notification">
                    <div class="assistant_left-circle-group_icon-notification_point"></div>
                </div>
            </div>
        </div>


                <div class="assistant-left_popup">
                    <div class="assistant-left_popup-content-group_charger">
                        <div class="assistant-left_popup-content-charger_title">
                            <div></div>
                            <p>Notifications</p>
                            <img src="/assets/Overview/Icons/close.png" alt="" id="closeNotification">
                        </div>
                        <div class="assistant-left_popup-content-charger_line"></div>
                        <div class="assistant-left_content-details-card-content_box_border_group" id="assistant-left_content-details-card-content_box_border_group">
                          
                            
                        </div>
                        <div class="assistant-left_content-details-card-content_box_bottom">
                            <div class="assistant-left_content-details-card-content_box_bottom_text">
                                <p>All Notifications: </p>
                                <p id="numberNotification">0</p>
                            </div>
                        </div>
                    </div>
                </div>

        `;
    // นำเข้า CSS ถ้าต้องการ
    const style = document.createElement("style");
    style.textContent = `
            
            .assistant_left {
            position: absolute;
            left: -660px;
            }

            .assistant_left-circle {
            position: relative;
            width: 800px;
            height: 800px;
            border-radius: 50%; /* ทำให้เป็นวงกลม */
            border: 100px solid var(--bg-main-color-orange);
            box-shadow: 0 0 20px var(--bg-main-color-orange);
            z-index: 100;
            }

            .assistant_left-circle .assistant_left-circle-group_icon {
            position: absolute;
            top: 120px;
            right: -57px;
            display: flex;
            gap: 3rem;
            width: 75px;
            height: 370px;
            flex-direction: column;
            z-index: 300;
            }

            .assistant_left-circle-icon {
            /* ไว้สำหรับกำหนดคุณสมบัติเพิ่มเติมในอนาคต */
            cursor: pointer;
            }

            .assistant_left-circle-icon img {
            width: 30px;
            transition: transform 0.2s ease-in-out;
            }

            .assistant_left-circle-icon img:hover {
            transform: scale(1.2);
            }
            .assistant_left-circle-icon:nth-child(2),
            .assistant_left-circle-icon:nth-child(4) {
            margin-left: 38px;
            }

            .assistant_left-circle-icon:nth-child(3) {
            margin-left: 50px;
            }
            .assistant_left-circle-group_icon-notification{

            
            position: absolute;
            top: 12.2rem;
            right: -3rem;
            z-index: 400;
            }

            .assistant_left-circle-group_icon-notification_point{
            display: none;
            width: 15px;
            height: 15px;
            border:2px solid var(--bg-main-color-white);
            border-radius: 50%;
            background: var(--bg-submain-color-red);
            }


            /* assistant-left_popup*/
  
            .assistant-left_popup{

            }

            .assistant-left_popup-content-group_charger{
            position: absolute;
            left: 9.6rem;
            top: 10rem;
            visibility: hidden;
            width: 350px;
            height:650px;
            background: var(--bg-main-color-white);
            box-shadow: 0 0 10px var(--box-shadow-black);
            border-radius: 3rem;
            justify-content: center;
            justify-items: center;
            z-index: var(--z-hard);
            transform: translateY(5rem); 
            opacity: 0;
            transition: opacity 0.5s ease, transform 0.5s ease;  /* การเคลื่อนที่และการเปลี่ยนแปลงความโปร่งใส */
            }


            .assistant-left_popup-content-group_charger.open {
            visibility: visible;  /* แสดง popup */
            opacity: 1;
            transform: translateY(0);  /* เคลื่อนจากตำแหน่งที่ 50% ไปยังตำแหน่ง 0 ของแกน Y */
            }

            .assistant-left_popup-content-group_charger.close {
            opacity: 0;
            transform: translateY(5rem);  /* เคลื่อนกลับไปยังตำแหน่งที่ 50% บนแกน Y */
            visibility: hidden;  /* ซ่อน popup เมื่อแอนิเมชันปิด */
            }

            .assistant-left_content-details-card-content_box_border_group{

            height: 470px;
            display: grid;
            padding: 0.5rem 0;
            gap: 0.5rem;
            overflow-y: scroll;
            }
            .assistant-left_content-details-card-content_box_border_group::-webkit-scrollbar {
            display: none;
            }
            .assistant-left_content-details-card-content_box_border{
            
            margin: 1rem 0;
            }
            .assistant-left_popup-content-charger_title{
            width: 230px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            margin: 1rem 0;
            }
            .assistant-left_popup-content-charger_title p{
            
            font-size: 16px;
            font-weight: bold;
            color: var(--text-orange);
            text-align: center;
            padding: 0.5rem;
            cursor: default;
            }
            .assistant-left_popup-content-charger_title img{

            width: 10px;
            height: 10px;
            cursor: pointer;
            }
            .assistant-left_popup-content-charger_line{

            width: 300px;
            height: 2px;
            background: linear-gradient(90deg, #FFFFFFFF 0%, var(--bg-main-color-orange) 50%, #FFFFFFFF 100%);
            margin-bottom: 0.5rem;
            }
            .assistant-left_popup-content_box_truck{

            width: 300px;
            height: max-content;
            background: var(--bg-main-color-white);
            box-shadow: 0 0 10px var(--box-shadow-black);
            display: flex;
            align-items: center;
            align-content: center;
            border-radius: 1rem;
            justify-content: center;
            justify-items: center;
            gap: 1rem;
            padding: 1rem 0;
            cursor: pointer;
            }
            .assistant-left_popup-content_box_truck img{

            width: 50px;
            }
            .assistant-left_popup-content-name{
            width: 130px;
            font-size: var(--h3-font-size);
            }
            .assistant-left_popup-content-name:nth-child(1){

            font-weight: bold;
            color: var(--text-black);
            }
            .assistant-left_popup-content-name:nth-child(2){

            font-weight: 500;
            color: var(--text-black);
            }
            .assistant-left_popup-content_box_charger{
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            align-content: center;
            border-radius: 0.8rem;
            justify-content: center;
            justify-items: center;
            background: var(--text-black);
            font-size: var(--h3-font-size);
            font-weight: bold;
            }
            .assistant-left_popup-content_box_charger p{
            color: var(--text-white);
            font-weight: 600;
            }

            .assistant-left_content-details-card-content_box_bottom{
            display: flex;
            justify-content: space-between;
            }
            .assistant-left_content-details-card-content_box_bottom_text{

            display: flex;
            margin-top: 1.5rem;
            gap: 0.5rem;
            }
            .assistant-left_content-details-card-content_box_bottom p:nth-child(1){
            font-size: var(--h2-font-size);
            font-weight: bold;
            color: var(--text-black);
            cursor: default;
            }
            .assistant-left_content-details-card-content_box_bottom p:nth-child(2){
            font-size: var(--h2-font-size);
            font-weight: bold;
            color: var(--text-black);
            cursor: default;
            }
            .assistant-left_content-details-card-content_box_bottom img{
            position: absolute;
            bottom: 2.1rem;
            right: 3.6rem;
            width: 25px;
            cursor: pointer;
            } 


        `;
    this.appendChild(style);

    // Add event listener for the notification icon
    document.querySelector('#notification').addEventListener('click', function () {
        // Dispatch a custom event to signal the display change
        const event = new CustomEvent('openNotification');
        window.dispatchEvent(event);
    });

    // ตรวจสอบค่าใน localStorage ว่ามีสถานะ Suspended หรือไม่
    const isSuspended = localStorage.getItem('isSuspended');
    if (isSuspended === 'true') {
      const notificationPoint = this.querySelector('.assistant_left-circle-group_icon-notification_point');
      if (notificationPoint) {
        notificationPoint.style.display = 'flex';  // แสดงการแจ้งเตือน
      }
    }



/* Notification */
document.addEventListener("DOMContentLoaded", async () => {
    const stations = ["NONG KHEAM", "ON NUT", "BANG KHEN", "LAT KRABANG", "THON BURI"].sort();
    const isSuspended = true;  // สมมติว่าเจอสถานะ Suspended
    const numberNotification = document.getElementById('numberNotification');
    let suspendedCount = 0;  // ตัวแปรสำหรับนับจำนวนสถานะ Suspended
    const notificationPoint = document.querySelector('.assistant_left-circle-group_icon-notification_point');
    
    if (notificationPoint) {
        notificationPoint.style.display = 'none'; // ซ่อนการแจ้งเตือนในตอนเริ่มต้น
    }

    stations.forEach(station => {
        const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
        fetch(`http://localhost:3000/get-transaction_${stationUrl}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(transaction => {
                    // เช็ค STATUS ว่าเป็น "Suspended"
                    if (transaction.STATUS === "Suspended") {
                        suspendedCount++;  // เพิ่มจำนวนเมื่อสถานะเป็น Suspended

                        if (isSuspended) {
                            // ส่ง CustomEvent ไปที่ window เมื่อพบสถานะ Suspended
                            const event = new CustomEvent("statusSuspended", {
                                detail: { status: "Suspended" }
                            });
                            window.dispatchEvent(event);
                            localStorage.setItem('isSuspended', 'true');
                        }

                        // สร้าง HTML สำหรับสถานี
                        const chargerSuffix = transaction.CONNECTOR === '1' ? 'A' : (transaction.CONNECTOR === '2' ? 'B' : '');
                        const chargerId = `${transaction.CHARGER_ID}${chargerSuffix}`;

                        // สร้างการ์ดใหม่
                        const card = document.createElement('div');
                        card.classList.add('assistant-left_content-details-card-content_box_border');
                        card.innerHTML = `
                            <a href="/Pages/3.Charging_Station/Charging_Station-First/Charging_Station-First.html">
                                <div class="assistant-left_popup-content_box_truck">
                                    <img src="/assets/Charging_Station/Garbage_truck.png" alt="">
                                    <div class="assistant-left_popup-content-name">
                                        <p id="station">[ ${transaction.DATE} ] ${station}</p>
                                        <p id="status" style="color: red;">Suspended</p>
                                    </div>
                                    <div class="assistant-left_popup-content_box_charger" id="assistant-left_popup-content_box_charger">
                                        <p id="charger">${chargerId}</p>
                                    </div>
                                </div>
                            </a>
                        `;

                        // ค้นหา container ด้วย class '.assistant-left_content-details-card-content_box_border_group' และ append card
                        const cardContainerGroup = document.querySelector('.assistant-left_content-details-card-content_box_border_group');
                        if (cardContainerGroup) {
                            cardContainerGroup.appendChild(card);
                        } else {
                            console.error('No card container group found.');
                        }
                    }
                });

                // แสดงจำนวนสถานะ "Suspended" ทั้งหมดใน notification
                numberNotification.innerText = suspendedCount;

                // หากมีสถานะ Suspended ให้แสดง notification
                if (suspendedCount > 0 && notificationPoint) {
                    notificationPoint.style.display = 'flex';  // แสดงการแจ้งเตือน
                } else if (notificationPoint) {
                    notificationPoint.style.display = 'none';  // ซ่อนการแจ้งเตือน
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    // เปิด Notification popup
    window.addEventListener('openNotification', function() {
        const popup = document.querySelector('.assistant-left_popup-content-group_charger');
        if (popup) {
            popup.style.visibility = 'visible';  // ใช้ visibility เพื่อทำให้ popup สามารถมองเห็นได้
            setTimeout(() => {
                popup.classList.add('open');  // เพิ่มคลาส 'open' เพื่อเริ่มแอนิเมชัน
                popup.classList.remove('close');  // ลบคลาส 'close' ในกรณีที่ต้องการเปิดใหม่
            }, 50);  // รอให้ visibility ถูกตั้งค่าแล้วค่อยเพิ่มแอนิเมชัน
        }
    });

    // ปิด Notification popup
    document.querySelector('#closeNotification').addEventListener('click', function() {
        const popup = document.querySelector('.assistant-left_popup-content-group_charger');
        if (popup) {
            popup.classList.add('close');  // เพิ่มคลาส 'close' เพื่อเริ่มแอนิเมชันปิด
            setTimeout(() => {
                popup.classList.remove('open');  // ลบคลาส 'open' เมื่อ popup ปิด
                popup.style.visibility = 'hidden';  // ซ่อน popup หลังจากแอนิเมชันเสร็จ
            }, 500);  // รอให้แอนิเมชันปิดเสร็จสิ้น (ตรงกับเวลาใน transition)
        }
    });
});


  }
}

customElements.define("assistant-left", Assistant_Left);
