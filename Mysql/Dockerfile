# ใช้ Node.js เป็น base image
FROM node:18

# ตั้งค่า directory ที่จะทำงานใน container
WORKDIR /app

# คัดลอก package.json ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปที่ container
COPY . .

# เปิดพอร์ตสำหรับเซิร์ฟเวอร์
EXPOSE 3000 4000

# คำสั่งที่ใช้รันเซิร์ฟเวอร์เมื่อ container เริ่มทำงาน
CMD ["node", "server.js"]
