
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



// Dropdown 
document.addEventListener("DOMContentLoaded", () => {
    // Toggle display ของ section_content-center-transactions_details-options_dropdown-first เมื่อคลิก #options
    const optionsButton = document.getElementById("options");
    const dropdownFirst = document.querySelector(".section_content-center-transactions_details-options_dropdown-first");
  
    optionsButton.addEventListener("click", () => {
      if (dropdownFirst.style.display === "flex") {
        dropdownFirst.style.display = "none";
      } else {
        dropdownFirst.style.display = "flex";
      }
    });
  
    // เปลี่ยน display ของ .section_content-center-transactions_details-options_dropdown-second_list_box เป็น flex เมื่อคลิก .section_content-center-transactions_details-options_dropdown-second_list_title
    const secondListTitle = document.querySelector(".section_content-center-transactions_details-options_dropdown-second_list_title");
    const secondListBox = document.querySelector(".section_content-center-transactions_details-options_dropdown-second_list_box");
  
    secondListTitle.addEventListener("click", () => {
        if (secondListBox.style.display === "flex") {
            secondListBox.style.display = "none";
          } else {
            secondListBox.style.display = "flex";
          }
    });
  });
  
  */