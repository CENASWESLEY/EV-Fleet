const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const db = express();
const PORT = 4000;

// Middleware
const corsOptions = {
  origin: true,
  credentials: true 
};
db.use(cors(corsOptions));
db.use(express.json());
db.use(express.urlencoded({ extended: false }));

// เชื่อมต่อฐานข้อมูล MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '7744',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // หากเชื่อมต่อไม่ได้ ให้หยุดการทำงานของเซิร์ฟเวอร์
  } else {
    console.log('Connected to the MySQL Authentication');
  }
});

// ฟังก์ชัน Middleware สำหรับตรวจสอบ JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // ดึง Token จาก Header

  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).send({ message: 'Invalid token' });

    req.user = user; // บันทึกข้อมูลผู้ใช้ใน req.user
    next();
  });
};

// Endpoint สำหรับเพิ่มข้อมูลผู้ใช้ใหม่
db.post('/users', (req, res) => {
  const { photo, number, name, email, password, phone, department, position, role, status } = req.body;

  // ตรวจสอบว่า password มีค่าหรือไม่
  if (!password) {
    return res.status(400).send('Password is required');
  }

  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Hash รหัสผ่านก่อนบันทึกลงฐานข้อมูล
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error('Error generating salt:', err);
      return res.status(500).send('Error generating salt');
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Error hashing password');
      }

      // SQL สำหรับเพิ่มข้อมูลผู้ใช้ใหม่
      const query = `
        INSERT INTO authentication.users (photo, number, name, email, password, phone, department, position, role, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [photo || null, number || null, name, email, hash, phone || null, department, position, role || "member", status || "offline"];

      // บันทึกข้อมูลลงในฐานข้อมูล
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Error creating user');
        }
        res.status(201).send('User created successfully');
      });
    });
  });
});


// Endpoint สำหรับการเข้าสู่ระบบ (Login)
db.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบว่ามี email นี้ในฐานข้อมูลหรือไม่
  const query = 'SELECT * FROM authentication.users WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(400).send({ message: 'Incorrect email or password' });
    }

    const user = results[0];

    // เปรียบเทียบรหัสผ่านที่ hash ไว้กับรหัสผ่านที่ผู้ใช้กรอก
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).send({ message: 'Server error' });
      }

      if (isMatch) {
        // สร้าง JWT Token
        const token = jwt.sign(
          { number: user.number, role: user.role },
          'your-secret-key',
        );

        res.status(200).send({ message: 'Login successful', token });
      } else {
        res.status(400).send({ message: 'Incorrect email or password' });
      }
    });
  });
});

// Endpoint สำหรับการดึงข้อมูลผู้ใช้ปัจจุบัน
db.get('/auth/profile', authenticateToken, (req, res) => {
  const userNumber = req.user.number;

  const query = 'SELECT * FROM authentication.users WHERE number = ?';
  connection.query(query, [userNumber], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const userProfile = results[0];
    res.status(200).send(userProfile);
  });
});

// Endpoint สำหรับการดึงข้อมูลผู้ใช้ปัจจุบัน
db.get('/auth/all-profiles', authenticateToken, (req, res) => {
  const userNumber = req.user.number;

  const query = 'SELECT * FROM authentication.users';
  connection.query(query, [userNumber], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const userProfile = results;
    res.status(200).send(userProfile);
  });
});


// Endpoint สำหรับการอัปเดตสถานะผู้ใช้
db.post('/auth/update-status', authenticateToken, (req, res) => {
  const userNumber = req.user.number;
  const { status } = req.body;

  const query = 'UPDATE authentication.users SET status = ? WHERE number = ?';
  connection.query(query, [status, userNumber], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    res.status(200).send({ message: 'Status updated successfully' });
  });
});


db.post('/auth/update-photo', authenticateToken,(req, res) => {
  const userNumber = req.user.number;
  const photo = req.file.path;  // ใช้ path ของไฟล์ที่อัปโหลด

  // SQL สำหรับการอัปเดต URL รูปภาพในฐานข้อมูล
  const query = 'UPDATE authentication.users SET photo = ? WHERE number = ?';
  connection.query(query, [photo, userNumber], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    res.status(200).send({ message: 'Profile photo updated successfully' });
  });
});

// Endpoint สำหรับการออกจากระบบ (Logout)
db.post('/auth/logout', (req, res) => {
  res.status(200).send({ message: 'Logout successful' });
});

// Endpoint สำหรับการ promote ผู้ใช้
db.post('/auth/promote', authenticateToken, (req, res) => {
  const { number, role } = req.body;

  // ตรวจสอบสิทธิ์ของผู้ใช้ปัจจุบันว่าเป็น admin หรือไม่
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'You do not have permission to perform this action.' });
  }

  // SQL สำหรับอัปเดต role ของผู้ใช้
  const query = 'UPDATE authentication.users SET role = ? WHERE number = ?';
  connection.query(query, [role, number], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    res.status(200).send({ message: 'User role updated successfully' });
  });
});

// Endpoint สำหรับการ ban ผู้ใช้
db.delete('/auth/ban', authenticateToken, (req, res) => {
  const { number } = req.body;

  // ตรวจสอบสิทธิ์ของผู้ใช้ปัจจุบันว่าเป็น admin หรือไม่
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'You do not have permission to perform this action.' });
  }

  // SQL สำหรับลบผู้ใช้
  const query = 'DELETE FROM authentication.users WHERE number = ?';
  connection.query(query, [number], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    res.status(200).send({ message: 'User banned successfully' });
  });
});

// เริ่มต้นเซิร์ฟเวอร์
db.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
