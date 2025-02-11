
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
        'section_content-details-card_sixth'
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




