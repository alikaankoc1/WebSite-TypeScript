// server/server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '64kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.CONTACT_RATE_LIMIT_MAX || 10),
  standardHeaders: true,
  legacyHeaders: false,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/api/gonder', contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  const nameStr = String(name).trim();
  const emailStr = String(email).trim();
  const subjectStr = String(subject).trim();
  const messageStr = String(message).trim();

  if (nameStr.length > 200 || subjectStr.length > 300 || messageStr.length > 10000) {
    return res.status(400).json({ message: 'Geçersiz alan uzunluğu.' });
  }

  if (!EMAIL_RE.test(emailStr)) {
    return res.status(400).json({ message: 'Geçersiz e-posta adresi.' });
  }

  if (!process.env.GMAIL_USER) {
    return res.status(500).json({ message: 'Sunucu yapılandırması eksik.' });
  }

  const mailOptions = {
    from: `"Portfolio" <${process.env.GMAIL_USER}>`,
    replyTo: `"${nameStr.replace(/"/g, '')}" <${emailStr}>`,
    to: process.env.GMAIL_USER,
    subject: `[Portfolyo Mesajı]: ${escapeHtml(subjectStr).slice(0, 500)}`,
    html: `
      <h3>Web Sitenizden Yeni Mesaj</h3>
      <p><strong>Gönderen:</strong> ${escapeHtml(nameStr)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(emailStr)}</p>
      <p><strong>Konu:</strong> ${escapeHtml(subjectStr)}</p>
      <hr>
      <p><strong>Mesaj:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(messageStr)}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mesajınız başarıyla iletildi!' });
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    res.status(500).json({ message: 'Mesaj gönderme sırasında bir hata oluştu.' });
  }
});

app.listen(PORT, () => {
  console.log(`Node.js sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});
