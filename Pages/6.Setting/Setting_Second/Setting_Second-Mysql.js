document.addEventListener("DOMContentLoaded", function () {
    // ---------- ตัวแปรและการตั้งค่าเบื้องต้น ----------

    const entriesText = document.querySelector('.section_content-center-transactions_pages_text p');
    const paginationContainer = document.querySelector('.section_content-center-transactions_pages_number_group');
    const searchButton = document.getElementById("search");
    const searchContainer = document.querySelector(".section_content-center-search");
    const searchInput = document.getElementById("boxsearch_db");
    const searchDbButton = document.getElementById("search_db");
    const transactionTable = document.querySelector(".section_content-center-transactions_details-group");
    const message = document.getElementById("message");
    const alertBox = document.querySelector(".section_content-center-transactions_details-alert");
    const promoteUpAlert = document.querySelector(".section_content-center-transactions_details-alert-promote_up");
    const promoteDownAlert = document.querySelector(".section_content-center-transactions_details-alert-promote_down");

    let currentPage = 1;
    const transactionsPerPage = 10;

    let allTransactions = []; // เก็บข้อมูลทั้งหมดจาก fetchTransactions
    let editprofileNumber = null;
    let filteredTransactions = []; // เก็บข้อมูลที่กรองจากการค้นหา
    let isSearching = false; // ตัวแปรเพื่อตรวจสอบว่ากำลังค้นหาหรือไม่

    const token = localStorage.getItem('token');
    const parsedToken = token;
  
    // ---------- ฟังก์ชันการจัดการ Pagination ----------
    function updatePagination(totalTransactions, currentPage = 1) {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

        let startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBox = document.createElement("div");
            pageBox.className = "section_content-center-transactions_pages_number_group_box";
            pageBox.innerHTML = `<p>${i}</p>`;

            if (i === currentPage) {
                pageBox.classList.add("active_page");
            }

            pageBox.addEventListener("click", function () {
                currentPage = i;
                displayTransactions(filteredTransactions, currentPage);
            });

            paginationContainer.appendChild(pageBox);
        }

        const startEntry = (currentPage - 1) * transactionsPerPage + 1;
        const endEntry = Math.min(currentPage * transactionsPerPage, totalTransactions);
        entriesText.textContent = `Showing ${startEntry} to ${endEntry} of ${totalTransactions} entries`;
    }

    // ---------- ฟังก์ชันการดึงข้อมูลทั้งหมดจาก MySQL ----------
    async function fetchTransactions() {
        // อัปเดตสถานะผู้ใช้เป็น online เมื่อโหลดข้อมูล
        await fetch('http://localhost:4000/auth/update-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
            },
            body: JSON.stringify({ status: 'online' })
        });

        try {
            const response = await fetch('http://localhost:4000/auth/all-profiles', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedToken}`
                }
            });
            window.addEventListener('beforeunload', async () => {
                await fetch('http://localhost:4000/auth/update-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${parsedToken}`
                    },
                    body: JSON.stringify({ status: 'offline' })
                });
            });

            if (response.status === 200) {
                const userProfile = await response.json();
                allTransactions = Array.isArray(userProfile) ? userProfile : [userProfile];
                filteredTransactions = allTransactions;
                displayTransactions(filteredTransactions, currentPage);
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // ---------- ฟังก์ชันแสดงข้อมูลและแบ่งหน้า ----------
    function displayTransactions(transactions, page) {
        if (!Array.isArray(transactions)) {
            console.error('Invalid transactions data:', transactions);
            return;
        }

        const start = (page - 1) * transactionsPerPage;
        const end = start + transactionsPerPage;
        const pageTransactions = transactions.slice(start, end);

        transactionTable.innerHTML = ''; // ล้างข้อมูลในตารางก่อน

        if (pageTransactions.length === 0) {
            message.textContent = "No data found for the provided search criteria.";
            message.style.marginTop = "2rem";
            message.style.textAlign = "center";
            message.style.display = "block";
            return;
        }

        message.style.display = "none"; // ซ่อนข้อความถ้ามีข้อมูล

        pageTransactions.forEach(profile => {
            const row = document.createElement('div');
            row.classList.add('section_content-center-transactions_details');
            row.innerHTML = `
                <img src="${profile['photo'] || '/assets/Setting/Avatar/Default_Avatar.jpg'}" alt="">
                <div>${profile['number'] || '-' }</div>
                <div>${profile['name'] || '-'}</div>
                <div>${profile['email'] || '-'}</div>
                <div>${profile['phone'] || '-'}</div>
                <div>${profile['department'] || '-'}</div>
                <div>${profile['position'] || '-'}</div>
                <div>${profile['role'] || '-'}</div>
                <div>${profile['status'] || '-'}</div>
                <div>${formatUpdatedAt(profile['updated_at'])}</div>
                <i class="fa-solid fa-ellipsis" onclick="window.showDropdownMenu(event, ${profile['number']})"></i>
            `;
            transactionTable.appendChild(row);
        });

        updatePagination(transactions.length, page);
    }
      // ฟังก์ชันเพื่อจัดรูปแบบ updated_at ให้เป็นรูปแบบที่อ่านง่าย
    function formatUpdatedAt(updatedAt) {
        if (!updatedAt) return '-';
        const date = new Date(updatedAt);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
            return `${diffDays} days ago`;
        } else {
            return `Today at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
    }

    // ---------- ฟังก์ชันการค้นหาและกรองข้อมูล ----------
    function searchTransactions() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === "") {
            isSearching = false;
            filteredTransactions = allTransactions;
            return; 
        } else {
            isSearching = true;
            filteredTransactions = allTransactions.filter(profile => {
                return profile.name.includes(searchTerm) || profile.email.includes(searchTerm);
            });
        }

        isSearching = true; // กำลังค้นหา
        displayTransactions(filteredTransactions, 1);
    }

    // ---------- ฟังก์ชันแสดงเมนู Dropdown ใหม่ ----------
    window.showDropdownMenu = function (event, profileNumber) {
        const dropdownMenu = document.querySelector('.section_content-center-transactions_details-options_dropdown');
        const dropdownMenuNew = document.createElement('div');
        dropdownMenuNew.className = 'section_content-center-transactions_details-options_dropdown-group';
        dropdownMenuNew.innerHTML = `
            <div class="section_content-center-transactions_details-options_dropdown-first_list">
                <p>Info</p>
                <p id="userNumber">${profileNumber}</p>
            </div>
            <div class="section_content-center-transactions_details-options_dropdown-second_list">
                <div class="section_content-center-transactions_details-options_dropdown-second_list_title">
                    <p>Promote</p>
                    <img src="../../../assets/Setting/Arrow.png" alt="">
                </div>
                <div class="section_content-center-transactions_details-options_dropdown-second_list_box" style="display: none;">
                    <div class="section_content-center-transactions_details-options_dropdown-second_list_box_first-list">
                        <p id="Admin" onclick="promoteUser('${profileNumber}', 'admin')">Admin</p>
                        <p id="Manager" onclick="promoteUser('${profileNumber}', 'manager')">Manager</p>
                        <p id="Member" onclick="promoteUser('${profileNumber}', 'member')">Member</p>
                    </div>
                </div>
            </div>
            <div class="section_content-center-transactions_details-options_dropdown-third_list">
                <p>Message</p>
            </div>
            <div class="section_content-center-transactions_details-options_dropdown-fourth_list">
                <p id="Ban" onclick="banUser('${profileNumber}')">Ban</p>
            </div>
        `;
        document.body.appendChild(dropdownMenuNew);
        
        dropdownMenuNew.style.position = 'absolute';
        dropdownMenuNew.style.display = 'grid';
        dropdownMenuNew.style.margin = '-0.5rem 0 0 1rem';
        dropdownMenuNew.style.left = `${event.pageX -150}px`;
        dropdownMenuNew.style.top = `${event.pageY -100}px`;       

        const secondListTitle = dropdownMenuNew.querySelector('.section_content-center-transactions_details-options_dropdown-second_list_title');
        const secondListBox = dropdownMenuNew.querySelector('.section_content-center-transactions_details-options_dropdown-second_list_box');

        secondListTitle.addEventListener('click', () => {
            if (secondListBox.style.display === 'flex') {
                secondListBox.style.display = 'none';
            } else {
                secondListBox.style.display = 'flex';
            }
        });
        

           // ตรวจสอบว่าอยู่ใน level ไหน
        const user = allTransactions.find(profile => profile.number === profileNumber);
        if (user) {
            setActiveLevel(profileNumber, user.role);
        }
        
        function handleClickOutside(event) {
            if (!dropdownMenuNew.contains(event.target)) {
                dropdownMenuNew.remove();
                document.removeEventListener('click', handleClickOutside);
            }
        }

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        dropdownMenu.appendChild(dropdownMenuNew);

    }

// ---------- ฟังก์ชัน Promote และ Ban ผู้ใช้ ----------
window.promoteUser = async function (profileNumber, role) {
    try {
        const response = await fetch(`http://localhost:4000/auth/promote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
            },
            body: JSON.stringify({ number: profileNumber, role })
        });

        const profile = filteredTransactions.find(p => p.number == profileNumber);
        const profileName = profile ? profile.name : 'Unknown User';

        if (response.status === 200) {
            if (profile) {
                profile.role = role;
            }
            alertBox.style.display = 'flex';
            if (role === 'admin' || role === 'manager') {
                promoteUpAlert.style.display = 'flex';
                promoteUpAlert.querySelector('#promoteUp').textContent = `${profileName } has been promoted to ${role}`;
            } else {
                promoteDownAlert.style.display = 'flex';
                promoteDownAlert.querySelector('#promoteDown').textContent = `${profileName } has been demoted to ${role}`;
            }
            setTimeout(() => {
                alertBox.style.display = 'none';
                promoteUpAlert.style.display = 'none';
                promoteDownAlert.style.display = 'none';
            }, 20000);
            displayTransactions(filteredTransactions, currentPage);
        } else if (response.status === 403) {
            alert('You do not have permission to perform this action.');
        } else {
            console.error('Failed to promote user');
        }
    } catch (error) {
        console.error('Error promoting user:', error);
    }
}

// กำหนดให้ active_level กับการปิดการเลือก
function setActiveLevel(profileNumber, currentLevel) {
    const levelOptions = document.querySelectorAll('.section_content-center-transactions_details-options_dropdown-second_list_box_first-list p');
    levelOptions.forEach(option => {
        if (option.id.toLowerCase() === currentLevel.toLowerCase()) {
            option.classList.add('active_level');
            option.style.pointerEvents = 'none'; // ปิดการเลือก
        } else {
            option.classList.remove('active_level');
            option.style.pointerEvents = 'auto'; // เปิดการเลือก
        }
    });
}
    

window.banUser = async function (profileNumber) {
    try {
        // ดึงข้อมูล role ของผู้ใช้ปัจจุบัน
        const userRoleResponse = await fetch('http://localhost:4000/auth/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
            }
        });

        if (!userRoleResponse.ok) {
            throw new Error('Failed to fetch user role');
        }

        const userProfile = await userRoleResponse.json();

        // ตรวจสอบว่า role เป็น admin หรือไม่
        if (userProfile.role !== 'admin') {
            alert('Access denied. Only admins can ban users.');
            return;
        }

        // ส่งคำขอ ban ผู้ใช้
        const response = await fetch(`http://localhost:4000/auth/ban`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
            },
            body: JSON.stringify({ number: profileNumber })
        });

        if (response.status === 200) {
            alertBox.style.display = 'flex';
            promoteUpAlert.style.display = 'flex';
            promoteUpAlert.querySelector('#promoteUp').textContent = `User ${profileNumber} has been banned.`;
            setTimeout(() => {
                alertBox.style.display = 'none';
                promoteUpAlert.style.display = 'none';
            }, 10000);
            fetchTransactions();
        } else {
            alert('Failed to ban user.');
            console.error('Failed to ban user:', response.statusText);
        }
    } catch (error) {
        console.error('Error banning user:', error);
    }
};


    // โหลดข้อมูลทั้งหมดของสถานีเริ่มต้น
    fetchTransactions();
});
