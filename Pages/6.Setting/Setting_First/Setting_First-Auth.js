
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem('token');

  if (!token) {
      console.error('Token not found');
      window.location.replace("../../1.Login/Login.html"); // redirect ไปยังหน้า login
      return;
  }

  const parsedToken = token;

  try {

    // ดึงข้อมูลผู้ใช้จาก API
    const response = await fetch('http://localhost:4000/auth/profile', {
        method: 'GET',
        credentials: 'include', // ส่งข้อมูล session ไปด้วย
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${parsedToken}` // ส่ง JWT ใน Header
        }
    });
      
      if (response.status === 200) {
      const userProfile = await response.json();

        // แสดงข้อมูลผู้ใช้ในหน้าเว็บ
        document.getElementById('profileOriginal').src = userProfile.photo || '/assets/Setting/Avatar/Default_Avatar.jpg';
        document.getElementById('profileCopy').src = userProfile.photo || '/assets/Setting/Avatar/Default_Avatar.jpg';
        //document.getElementById('menuProfile').src = userProfile.photo;
        document.querySelectorAll('.name').forEach(element => {
          element.textContent = userProfile.name;
      });
        document.querySelectorAll('.role').forEach(element => {
          element.textContent = userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1);
          if(userProfile.role === 'admin'){

            document.getElementById('level').textContent = "Full Access";

          }
          else if(userProfile.role === 'manager'){

            document.getElementById('level').textContent = "Read-Only Access";

          }
          else if(userProfile.role === 'member'){

            document.getElementById('level').textContent = "Restricted Access";

          }
        })
        document.getElementById('department').textContent = userProfile.department || '-';
        document.getElementById('position').textContent = userProfile.position || '-';
        document.getElementById('email').textContent = userProfile.email || '-';
        document.getElementById('phone').textContent = userProfile.phone || '-';
  
        // แปลงวันที่
        const createdDate = new Date(userProfile.created_at);
        const formattedCreatedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;
        document.getElementById('created').textContent = formattedCreatedDate;
  
        // วันที่เข้าสู่ระบบล่าสุด (signedin)
        const currentDate = new Date();
        const formattedSignedInDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        document.getElementById('signedin').textContent = formattedSignedInDate;
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    /* 
    // แสดง popup สำหรับเปลี่ยนรูป
    document.querySelector(".section_content-details-icons_setting").addEventListener("click", () => {
      document.querySelector(".section_content-details-icons_setting_popup").style.display = "block";
    });
    */
  
    // ปิด popup
    document.querySelector(".section_content-details-icons_setting_popup_user_close").addEventListener("click", () => {
      document.querySelector(".section_content-details-icons_setting_popup").style.display = "none";
    });
  
    // เปลี่ยนภาพ
// เมื่อคลิกที่ภาพ Add Image ให้แสดงช่องเลือกไฟล์
document.querySelector("#addImage").addEventListener("click", () => {
  document.getElementById("profileImageInput").click(); // เปิด dialog เลือกไฟล์
});

// เมื่อเลือกไฟล์แล้ว ให้แสดงภาพใน #profileCopy
document.querySelector("#profileImageInput").addEventListener("change", (event) => {
  const file = event.target.files[0]; // รับไฟล์ที่เลือก
  if (file) {
    const reader = new FileReader();

    // เมื่ออ่านไฟล์เสร็จแล้ว จะอัพเดท src ของ #profileCopy
    reader.onload = function(e) {
      document.getElementById("profileCopy").src = e.target.result;
    };

    reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL
  }
});

// เมื่อคลิก Submit ให้ส่งไฟล์ไปยังเซิร์ฟเวอร์
document.querySelector("#submit").addEventListener("click", async () => {
  const fileInput = document.getElementById("profileImageInput");
  const file = fileInput.files[0];  // รับไฟล์ที่เลือก

  if (!file) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);  // แนบไฟล์ภาพ

  try {
    const response = await fetch('http://localhost:4000/auth/update-photo', {
      method: 'POST',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${parsedToken}` // ส่ง JWT ใน Header
    });

    if (response.status === 200) {
      // ถ้าอัปโหลดสำเร็จ, ปิด popup
      document.querySelector(".section_content-details-icons_setting_popup").style.display = "none";
      console.log('Profile photo updated successfully');
    } else {
      console.error('Failed to update profile photo');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

    

      // Logout
  document.querySelector("#logout").addEventListener("click", async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // ส่งข้อมูล session ไปด้วย
      });

      

      if (response.status === 200) {

          // ลบ token จาก Local Storage
          localStorage.removeItem('token');

        // หลังจาก logout สำเร็จ ให้ redirect ไปยังหน้า login
        window.location.replace("../../1.Login/Login.html");
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  });
  