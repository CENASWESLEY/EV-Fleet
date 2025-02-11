document.addEventListener("DOMContentLoaded", async () => {
    let users = []; // เก็บข้อมูลผู้ใช้ทั้งหมด
    let currentIndex = 0; // ตำแหน่งปัจจุบัน

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found');
            window.location.replace("../../1.Login/Login.html");
            return;
        }

        const parsedToken = token;

        // ดึงข้อมูลผู้ใช้จาก API
        const response = await fetch('http://localhost:4000/auth/all-profiles', { // เปลี่ยนเป็น API ที่ส่งข้อมูลผู้ใช้หลายคน
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
            }
        });

        if (response.status === 200) {
            users = await response.json(); // เก็บข้อมูลผู้ใช้ทั้งหมดใน `users`
            updateProfile(users[currentIndex]); // แสดงข้อมูลผู้ใช้คนแรก
            
        } else {
            console.error('Failed to fetch user profiles');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    // ฟังก์ชันอัปเดตข้อมูลโปรไฟล์
    function updateProfile(userProfile) {
        document.getElementById('profileOriginal').src = userProfile.photo || '/assets/Setting/Avatar/Default_Avatar.jpg';
        document.querySelectorAll('.name').forEach(element => {
            element.textContent = userProfile.name;
        });
        document.querySelectorAll('.role').forEach(element => {
            element.textContent = userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1);
        });

        document.getElementById('department').textContent = userProfile.department || '-';
        document.getElementById('position').textContent = userProfile.position || '-';
        document.getElementById('email').textContent = userProfile.email || '-';
        document.getElementById('phone').textContent = userProfile.phone || '-';

        const createdDate = new Date(userProfile.created_at);
        document.getElementById('created').textContent = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;
        
        const currentDate = new Date();
        document.getElementById('signedin').textContent = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        var numberID = document.getElementById('number')
        numberID.textContent  = `#${users[currentIndex].number}`;
    }

    // การจัดการการคลิกปุ่ม Previous และ Next
    document.getElementById('previousID').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--; // เลื่อนไปยังผู้ใช้ก่อนหน้า
        } else {
            currentIndex = users.length - 1; // เลื่อนไปยังผู้ใช้หลังสุดถ้าอยู่ที่หน้าแรก
        }
        updateProfile(users[currentIndex]);
    });

    document.getElementById('nextID').addEventListener('click', () => {
        if (currentIndex < users.length - 1) {
            currentIndex++; // เลื่อนไปยังผู้ใช้ถัดไป
        } else {
            currentIndex = 0; // เลื่อนไปยังผู้ใช้คนแรกถ้าอยู่ที่หน้าสุดท้าย
        }
        updateProfile(users[currentIndex]);
    });

});
