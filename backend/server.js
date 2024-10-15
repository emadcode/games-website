const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002; // تغيير المنفذ إلى 5002

app.use(cors());
app.use(express.static(path.join(__dirname, '../public'))); // إضافة هذا السطر لتقديم ملفات static

// API endpoint لجلب الألعاب
app.get('/api/games', async (req, res) => {
    try {
        const response = await axios.get('https://www.freetogame.com/api/games');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Error fetching games');
    }
});

// مسار للتعامل مع الطلبات إلى الجذر
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
