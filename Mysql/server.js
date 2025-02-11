// นำเข้าโมดูล express และ mysql2 ที่ใช้สำหรับสร้าง server และเชื่อมต่อกับ MySQL
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Cross-Origin Resource Sharing

// สร้างแอปพลิเคชัน express
const app = express();
const port = 3000; // กำหนดพอร์ตที่ server จะทำงาน

// เปิดใช้งาน CORS สำหรับทุก Origin
app.use(cors());
app.use(express.json()); // middleware รับข้อมูล JSON

// การตั้งค่าการเชื่อมต่อกับฐานข้อมูล MySQL
 
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '7744',
});

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// ฟังก์ชันทั่วไปสำหรับจัดการ CRUD
function createApi(schema, tableName) {
    return {
        post: (req, res) => {
            const transactions = req.body;

            if (!Array.isArray(transactions) && typeof transactions !== 'object') {
                return res.status(400).send('Invalid data format: Expected an object or an array of objects');
            }

            const isArray = Array.isArray(transactions);
            const keys = isArray ? Object.keys(transactions[0]) : Object.keys(transactions);
            const placeholders = keys.map(() => '?').join(', ');
            const sql = `INSERT INTO ${schema}.${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

            const values = isArray
                ? transactions.map(transaction => keys.map(key => transaction[key]))
                : keys.map(key => transactions[key]);

            // ใช้ loop ในกรณีที่เป็น array ของ transactions
            if (isArray) {
                values.forEach((value) => {
                    db.query(sql, value, (err) => {
                        if (err) {
                            console.error('Error inserting data:', err);
                            return res.status(500).send('Failed to add transactions');
                        }
                    });
                });
                res.send('Transactions added successfully!');
            } else {
                db.query(sql, values, (err) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return res.status(500).send('Failed to add transactions');
                    }
                    res.send('Transaction added successfully!');
                });
            }
        },

        get: (req, res) => {
            const sql = `SELECT * FROM ${schema}.${tableName}`;
            db.query(sql, (err, results) => {
                if (err) {
                    console.error('Error fetching data:', err);
                    return res.status(500).send('Failed to fetch transactions');
                }
                res.json(results);
            });
        },

        put: (req, res) => {
            const transactions = req.body;

            if (!transactions.id) {
                return res.status(400).send('Missing required field: id');
            }

            const sql = `UPDATE ${schema}.${tableName} SET ? WHERE id = ?`;

            db.query(sql, [transactions, transactions.id], (err, result) => {
                if (err) {
                    console.error('Error updating data:', err);
                    return res.status(500).send('Failed to update transactions');
                }
                res.send('Transactions updated successfully!');
            });
        },

        delete: (req, res) => {
            const { id } = req.body;

            if (!id) {
                return res.status(400).send('Missing required field: id');
            }

            const sql = `DELETE FROM ${schema}.${tableName} WHERE id = ?`;

            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.error('Error deleting data:', err);
                    return res.status(500).send('Failed to delete transaction');
                }
                res.send('Transaction deleted successfully!');
            });
        }

    };
}

// สร้าง Endpoint โดยใช้ฟังก์ชันทั่วไป
const stations = ['bang_khen', 'lat_krabang', 'nong_kheam', 'on_nut', 'thon_buri'];

stations.forEach((station) => {
    ['transaction', 'transaction_history', 'maintenance', 'maintenance_history','data_analysis','weather'].forEach((table) => {
        const api = createApi(station, table);

        app.post(`/post-${table}_${station}`, api.post);
        app.get(`/get-${table}_${station}`, api.get);
        app.put(`/put-${table}_${station}`, api.put);
        app.delete(`/delete-${table}_${station}`, api.delete);

    });
});

// เริ่มต้น server และรันที่พอร์ตที่กำหนดไว้
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
