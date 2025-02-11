
/*
 
// section_top-menu-header (main-menu)

document.addEventListener("DOMContentLoaded", function () {
    // เริ่มต้น highlight เมนู Overview
    let activeMenu = document.getElementById("section_top-menu-header-setting-highlight");
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


// Setting

document.addEventListener("DOMContentLoaded", () => {
    // แสดง popup
    document.querySelector(".section_content-details-icons_setting").addEventListener("click", () => {
      document.querySelector(".section_content-details-icons_setting_popup").style.display = "block";
    });
  
    // ปิด popup
    document.querySelector(".section_content-details-icons_setting_popup_user_close").addEventListener("click", () => {
      document.querySelector(".section_content-details-icons_setting_popup").style.display = "none";
    });
  
    // เปลี่ยนภาพ
    document.querySelector("#addImage").addEventListener("click", () => {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"; // จำกัดให้เลือกเฉพาะไฟล์รูปภาพ
    
        input.onchange = (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              document.querySelector("#profileCopy").src = e.target.result;
            };
            reader.readAsDataURL(file); // อ่านไฟล์เป็น URL ของรูปภาพ
          }
        };
    
        input.click(); // เปิดตัวเลือกไฟล์ของผู้ใช้
      });
      
  
    // ยืนยัน
    document.querySelector(".section_content-details-icons_setting_popup_user_submit").addEventListener("click", () => {
      const newName = document.getElementById("inputName").value;
      const newProfileImage = document.getElementById("profileCopy").src;
  
      // เก็บข้อมุลใส่ตัวแปรใหม่
      document.querySelector("#Name").textContent = newName;
      document.querySelector("#profileOriginal").src = newProfileImage;
  
      // หลังจาก submit ให้ปิด popup
      document.querySelector(".section_content-details-icons_setting_popup").style.display = "none";
  

    });
  });
  */

/* section_content-details-title_menu */

// กำหนดค่าคอนเทนต์ที่ต้องการกรอง
const contentCards = {
  'section_content-details-title_menu-first-highlight': [
      'section_content-details-card_first',
      'section_content-details-card_second'
  ],
  'section_content-details-title_menu-second-highlight': [
      'section_content-details-card_third'
  ],
  'section_content-details-title_menu-third-highlight': [
      'section_content-details-card_fourth'
  ],
  'section_content-details-title_menu-fourth-highlight': [
      'section_content-details-card_fifth',
      'section_content-details-card_sixth',
      'section_content-details-card_seventh'
  ]
};

// ตั้งค่า default ให้กับเมนู "General"
document.getElementById('section_content-details-title_menu-first-highlight').classList.add('active');
showFilteredContent('section_content-details-title_menu-first-highlight');

// ฟังก์ชันสำหรับจัดการการแสดงผลของคอนเทนต์ที่ต้องการกรอง
function showFilteredContent(menuId) {
  // ซ่อนคอนเทนต์ทั้งหมด
  document.querySelectorAll('[id^="section_content-details-card_"]').forEach(card => {
      card.style.display = 'none';
  });
  
  // แสดงเฉพาะคอนเทนต์ที่กำหนด
  if (contentCards[menuId]) {
      contentCards[menuId].forEach(cardId => {
          document.getElementById(cardId).style.display = 'block';
      });
  }
}

// กำหนดค่าเมนูที่เลือกและจัดการการคลิก
const menuItems = document.querySelectorAll('.section_content-menu-header > div');
menuItems.forEach(item => {
  item.addEventListener('click', (event) => {
      event.preventDefault();

      // ลบคลาส active ออกจากเมนูทั้งหมด
      menuItems.forEach(menu => menu.classList.remove('active'));

      // เพิ่มคลาส active ให้กับเมนูที่ถูกคลิก
      item.classList.add('active');

      // แสดงผลเฉพาะคอนเทนต์ที่กรองไว้
      showFilteredContent(item.id);
  });
});




