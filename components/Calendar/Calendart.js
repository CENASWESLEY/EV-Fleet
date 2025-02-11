/* Calendar */

function updateDateTime() {

    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // ใส่ 0 ด้านหน้า
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    hours = hours < 10 ? '0' + hours : hours;

    // ใส่ตัวเลขแทน
    document.getElementById("calendar").innerText = `${day}, ${date} ${month} ${year}`;
    document.getElementById("time").innerText = `${hours}:${minutes}:${seconds}`;
}

// อัพเดต 1 วิ
setInterval(updateDateTime, 1000);
updateDateTime(); 

