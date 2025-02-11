// JavaScript สำหรับระบบ Login โดยใช้ข้อมูลจากฐานข้อมูล MySQL

const alertSuccess = document.querySelector('.section_content-right_alert-success');
const alertNotMatch = document.querySelector('.section_content-right_alert-notmatch');
const alertFailed = document.querySelector('.section_content-right_alert-failed');
const alertFill = document.querySelector('.section_content-right_alert-fill');

function showAlert(alertElement) {
    alertElement.style.display = 'flex';
    setTimeout(() => {
        alertElement.classList.add('hide');
        setTimeout(() => {
            alertElement.style.display = 'none';
            alertElement.classList.remove('hide');
        }, 1000);
    }, 5000);
}

document.getElementById('login').addEventListener('click', async function(event) {
    event.preventDefault(); // ป้องกันการ refresh หน้าหลังจากคลิกปุ่ม

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

        // ตรวจสอบว่าช่องกรอกข้อมูลไม่ว่างเปล่า
        if (!email || !password) {
            showAlert(alertFill); // แสดงการแจ้งเตือน
            return; // หยุดการทำงานถัดไป
        }

    try {
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // ส่งข้อมูล session ไปด้วย
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log(result);

        if (response.status === 200) {
            showAlert(alertSuccess);
            
            // เก็บ token ใน Local Storage
            localStorage.setItem('token', result.token);

            // หาก "remember me" ถูกเลือก ให้เก็บ email และ password ไว้ใน Local Storage
            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }
            
            // เปลี่ยนหน้าไปยัง Overview
            setTimeout(() => {
                window.location.replace("../2.Overview/Overview.html");
            }, 2000);
        } else {
            showAlert(alertNotMatch);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert(alertFailed);
    }

    
});

// โหลดข้อมูล email และ password จาก Local Storage หากมี
window.addEventListener('load', function() {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail && savedPassword) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('password').value = savedPassword;
        document.getElementById('rememberMe').checked = true;
    }
});

// เพิ่มการแสดง/ซ่อนรหัสผ่าน
document.getElementById('hidepassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('hidepassword');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.textContent = 'ซ่อนรหัสผ่าน'; // เปลี่ยนข้อความเป็นซ่อนรหัสผ่าน
    } else {
        passwordField.type = 'password';
        toggleIcon.textContent = 'แสดงรหัสผ่าน'; // เปลี่ยนข้อความเป็นแสดงรหัสผ่าน
    }
});
