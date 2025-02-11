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

*/