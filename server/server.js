// server/server.js
require('dotenv').config(); // .env dosyasını yükler
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3001; // Sunucu Portu (React'tan farklı)

// Middleware
// React uygulamanızın (örneğin http://localhost:5173) bu sunucuya erişmesine izin verir
app.use(cors({
    origin: '*', 
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json()); // JSON formatında gelen verileri okumak için

// Nodemailer Taşıyıcısını (Transporter) Oluşturma
// .env'deki bilgileri kullanır
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS  
    }
});

// İletişim Formu POST Uç Noktası
app.post('/api/gonder', async (req, res) => {
    // Frontend'den (Contact.tsx) gelen veriler
    const { name, email, subject, message } = req.body; 

    // Basit doğrulama
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
    }

    // Gönderilecek E-posta içeriği
    const mailOptions = {
        from: `"${name}" <${email}>`, 
        to: process.env.GMAIL_USER, // Mesajın gideceği mail adresi
        subject: `[Portfolyo Mesajı]: ${subject}`,
        html: `
            <h3>Web Sitenizden Yeni Mesaj</h3>
            <p><strong>Gönderen:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <hr>
            <p><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-posta başarıyla gönderildi.');
        res.status(200).json({ message: 'Mesajınız başarıyla iletildi!' });
    } catch (error) {
        console.error('E-posta gönderme hatası:', error);
        res.status(500).json({ message: 'Mesaj gönderme sırasında bir hata oluştu.' });
    }
});

// Sunucuyu Başlatma
app.listen(PORT, () => {
    console.log(`Node.js sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});