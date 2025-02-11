// Define custom HTML element for Header Component
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="section_top">
        <div class="section_top-menu">
          <div class="section_top-menu-logo" id="section_top-menu-header-overview-highlight">
            <a href="/Pages/2.Overview/Overview.html">
              <img src="../../../assets/Overview/Logo/MEA.png" alt="">
            </a>
          </div>
          <div class="section_top-menu-header">
            <div class="section_top-menu-header-overview" id="section_top-menu-header-overview-highlight">
              <a href="/Pages/2.Overview/Overview.html">
                <p>Overview</p>
              </a>
            </div>
            <div class="section_top-menu-header-charging_station" id="section_top-menu-header-charging_station-highlight">
              <a href="/Pages/3.Charging_Station/Charging_Station-First/Charging_Station-First.html">
                <p>Charging Station</p>
              </a>
            </div>
            <div class="section_top-menu-header-data_analysis" id="section_top-menu-header-data_analysis-highlight">
              <a href="/Pages/4.Data_Analysis/Data_Analysis-First/Data_Analysis-First.html">
                <p>Data Analysis</p>
              </a>
            </div>
            <div class="section_top-menu-header-maintenance" id="section_top-menu-header-maintenance-highlight">
              <a href="/Pages/5.Maintenance/Maintenance_First/Maintenance_First.html">
                <p>Maintenance</p>
              </a>
            </div>
            <div class="section_top-menu-header-setting" id="section_top-menu-header-setting-highlight">
              <a href="/Pages/6.Setting/Setting_First/Setting_First.html">
                <p>Setting</p>
              </a>
            </div>
          </div>
          <div class="section_top-menu-profile" id="section_top-menu-header-setting-highlight">
            <a href="/Pages/6.Setting/Setting_First/Setting_First.html">
              <img src="/assets/Setting/Avatar/Default_Avatar.jpg" alt="" id="menuProfile">
            </a>
          </div>
        </div>
      </div>
    `;
    initHeaderComponent();
  }
}

  
  // CSS for Header Component
  const headerStyles = `

      /*========== Colors ==========*/
  
    /* HSL color mode */
  
    --bg-main-color-white: #ffffff;
    --bg-main-color-orange: #F37021;
    --bg-submain-color-green: #33F321;
    --bg-submain-color-orange: #F37021;
    --bg-submain-color-red: #F32121;
  
    --body-color: #ffffff;
    --text-white: #ffffff;
    --text-orange: #F37021;
    --text-black: #000000;
  
    --icon-color-black: #000000;
    --icon-color-white: #ffffff;
  
    --box-shadow-black: #EAEAEA;
    --box-shadow-black2: #E1E1E1;

    --scroll-bar-color: #F37021;
    --scroll-barhover-color: #FFCCAD;
    --scroll-thumb-color: #ffffff;
  
 /*========== Font and typography ==========*/
 --body-font: 'Urbanist', sans-serif;
  
 /* .5rem = 8px, 1rem = 16px, 1.5rem = 24px ... */
 --big-font-size: 2rem;

 --h1-font-size: 1.25rem;
 --h2-font-size: 0.75rem;
 --h3-font-size: 0.625rem;
 --h4-font-size: 0.5rem;
 --h5-font-size: 0.3125rem;


 /*========== Font weight ==========*/

 --font-regular: 400;
 --font-medium: 500;
 --font-semibold: 600;
 --font-bold: 700;

 /*========== z index ==========*/
 --z-basic: 10;
 --z-immediate: 100;
 --z-hard: 1000;
 --z-heavy: 10000;

 --transition: all 400ms ease;
  }
  
  /*========== Variables Dark theme ==========*/
  body.dark {

    --body-color: #000000;
    --text-white: #000000;
    --text-orange: #F37021;
    --text-black: #ffffff;
  }
  
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  
body {

    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    background-color: var(--body-color);
    color: var(--text-menu-color);
    overflow: hidden;

  }
  
  h1 {
    color: var(--title-color);
    font-weight: var(--font-bold);
    font-size: var(--big-font-size);
  }
  
  h2 {
    color: var(--text-subtitle-color);
    font-weight: var(--font-medium);
    font-size: var(--h2-font-size);
  }
  
  ul {
    list-style: none;
  }
  
  a {
    color: #000000;
    text-decoration: none;
  }
  
  button {
    border: none;
    outline: none;
    background: transparent;
  }
  .head{
    font-size: 3rem;
    font-weight: var(--font-bold);
    text-align: center;
  }
  
  .title {
    color: var(--text-title-color);
    font-size: var(--h2-font-size);
    font-weight: var(--font-bold);
  }

  /*========== SCROLL BAR ==========*/

::-webkit-scrollbar {
    width: 0.6rem;
    background: var(--scroll-thumb-color);
  }
  
  ::-webkit-scrollbar-thumb {
    width: 0.6rem;
    background: var(--scroll-bar-color);
    border-radius: 0.5rem;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--scroll-barhover-color);
  }
  
  
  .section_top {
    justify-items: center;
    margin: 1rem;
  }
  .section_top-menu {
    width: 1790px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

  }
  .section_top-menu-logo img {
    width: 75px;
  }
  .section_top-menu-header {
    width: 920px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .section_top-menu-header > div {
    width: 150px;
    height: 50px;
    border-radius: 30px;
    align-items: center;
    align-content: center;
    text-align: center;
    display: flex;
    justify-content: center;
    position: relative;
    transition: all 0.2s ease-in-out 0.1s;
  }

  .active {
    box-shadow: 0 5px 15px var(--box-shadow-black);
    background: linear-gradient(180deg, #FFFFFF 0%, #EAEAEA 100%);
    z-index: 1;
  }
  .section_top-menu-header > div p {
    font-weight: bold;
    color: var(--text-black);
    transition: color 0.4s ease-in-out 0.1s;
  }
  .section_top-menu-header .active p {
    font-weight: bold;
    color: var(--text-orange);
  }

  .section_top-menu-profile img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  `;
  // JavaScript Logic for Header Component
function initHeaderComponent() {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    // ดึงข้อมูลผู้ใช้จาก API
    fetch('http://localhost:4000/auth/profile', {
      method: 'GET',
      credentials: 'include', // ส่งข้อมูล session ไปด้วย
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ส่ง JWT ใน Header
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('Failed to fetch user profile');
        }
      })
      .then(userProfile => {
        if (userProfile) {
          // แสดงข้อมูลผู้ใช้ในหน้าเว็บ
          const profileImageElement = document.getElementById('menuProfile');
          if (profileImageElement) {
            profileImageElement.src = userProfile.photo || '/assets/Setting/Avatar/Default_Avatar.jpg';
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Highlight เมนูตาม URL ปัจจุบัน
    const currentPath = window.location.pathname;
    let activeMenu = null;
    const menuItems = document.querySelectorAll('.section_top-menu-header > div a');


    menuItems.forEach(menuItem => {
      const menuHref = new URL(menuItem.getAttribute('href'), window.location.origin).pathname;
      // ตรวจสอบ URL โดยใช้คำหลักเพื่อให้หน้าอื่น ๆ ในโฟลเดอร์เดียวกันเป็น active

      if (currentPath.includes('Overview') && menuHref.includes('Overview')) {
        activeMenu = menuItem.parentElement;
      }
      else if (currentPath.includes('Charging_Station') && menuHref.includes('Charging_Station')) {
        activeMenu = menuItem.parentElement;
      } else if (currentPath.includes('Data_Analysis') && menuHref.includes('Data_Analysis')) {
        activeMenu = menuItem.parentElement;
      }
      else if (currentPath.includes('Maintenance') && menuHref.includes('Maintenance')) {
        activeMenu = menuItem.parentElement;
      }
      else if (currentPath.includes('Setting') && menuHref.includes('Setting')) {
        activeMenu = menuItem.parentElement;
      }
      // ยกเว้นเมนู Help
      else if (menuItem.parentElement.classList.contains('section_top-menu-header-help')) {
        // Don't mark as active
        return;
      }
      // เพิ่มเงื่อนไขอื่น ๆ สำหรับเมนูอื่น ๆ ที่ต้องการตรวจสอบ
    });

    if (activeMenu) {
      activeMenu.classList.add('active');
    }

    // กำหนดการเลือกเมนูทั้งหมด
    menuItems.forEach(menuItem => {
      menuItem.addEventListener('click', function (event) {
        // ลบ highlight จากเมนูปัจจุบัน
        if (activeMenu) {
          activeMenu.classList.remove('active');
        }

        // ตั้งเมนูที่ถูกคลิกให้เป็น active และเก็บอ้างอิง
        activeMenu = menuItem.parentElement;
        activeMenu.classList.add('active');
      });
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


// Register the custom element
customElements.define('header-menu', HeaderComponent);
