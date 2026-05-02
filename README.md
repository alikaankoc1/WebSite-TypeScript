# Kişisel portfolyo sitesi (React + TypeScript + Vite)

Modern bir önyüz ve isteğe bağlı Node iletişim API’si içerir.

## Gereksinimler

- Node.js 20+ önerilir
- Gmail ile e-posta gönderimi için API tarafında [Uygulama şifresi](https://support.google.com/accounts/answer/185833) kullanın

## Yerelde çalıştırma (frontend)

```bash
npm install
npm run dev
```

Tarayıcı: `http://localhost:5173` — Vite, `/api` isteklerini varsayılan olarak `http://localhost:3001` adresine yönlendirir (`vite.config.ts` içindeki proxy).

## Yerelde iletişim API’si

```bash
cd server
npm install
copy .env.example .env   # Windows; Unix: cp .env.example .env
# .env içinde GMAIL_USER ve GMAIL_PASS doldurun
node server.js
```

`ALLOWED_ORIGINS` içinde geliştirme için `http://localhost:5173` ve `http://127.0.0.1:5173` varsayılan olarak tanımlıdır (`server/.env.example`).

## Ortam değişkenleri

| Dosya | Değişken | Açıklama |
|--------|-----------|-----------|
| Proje kökü `.env` (isteğe bağlı) | `VITE_CONTACT_API_URL` | Üretimde iletişim API’sinin kök URL’si; **sonunda `/` olmadan**. Boş bırakılırsa dev ortamında istekler `/api/gonder` üzerinden proxylanır. |
| `server/.env` | `GMAIL_USER`, `GMAIL_PASS` | Nodemailer (Gmail) |
| `server/.env` | `ALLOWED_ORIGINS` | Virgülle ayrılmış tam kökenler (örn. `https://your-site.netlify.app,http://localhost:5173`). İstemci tarayıcısından gelen isteklerde CORS bununla sınırlıdır. |
| `server/.env` | `CONTACT_RATE_LIMIT_MAX` | IP başına pencere limiti (varsayılan 10 / 15 dk) |

Örnek şablonlar: kökte `.env.example`, `server/.env.example`.

## Netlify (statik site) + ayrı API

1. **Frontend build**: Netlify’da `npm run build`, publish dizini `dist`.
2. **Build ortam değişkeni**: `VITE_CONTACT_API_URL=https://api-adresiniz.com` (Netlify **Site settings → Environment variables**). Bu değer build sırasında bundle’a gömülür; değiştirdikten sonra yeniden deploy gerekir.
3. **Sunucu**: API’yi Render, Railway, VPS vb. üzerinde çalıştırın.
4. **CORS**: API `.env` içinde `ALLOWED_ORIGINS` değerine Netlify sitenizin kökenini ekleyin (örn. `https://alikaankoc.netlify.app`).

SPA için `public/_redirects` dosyası `/* /index.html 200` kuralıyla gelir; doğrudan `/iletisim` gibi yolların yenilenmesinde 404 önlenir.

## Dağıtımı doğrulama

1. **API sağlığı** (aşağıdaki `/health` endpoint’i deploy sonrası):

   ```bash
   curl -s https://API_ADRESINIZ/health
   ```

   Beklenen: JSON içinde `"ok": true`.

2. **CORS**: Tarayıcıdan sitenizi açıp iletişim formunu gönderin; geliştirici araçlarında `/api/gonder` için CORS veya 200 yanıtı kontrol edin.

3. **Frontend URL**: Netlify’da form gönderiminin `VITE_CONTACT_API_URL` ile tanımlı API köküne gittiğinden emin olun (yanlış URL’de ağ hatası veya CORS görürsünüz).

## Komutlar

| Komut | Açıklama |
|--------|-----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi (`dist/`) |
| `npm run lint` | ESLint |

## Lisans

Özel proje; haklar sahibine aittir.
