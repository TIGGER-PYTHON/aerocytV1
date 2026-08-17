# ระบบตรวจคัดกรองเซลล์มะเร็งปอด (React)

แปลงจากไฟล์ HTML เดิมมาเป็น React + Vite พร้อม deploy

## รันในเครื่อง

```bash
npm install
npm run dev
```

## Build สำหรับ deploy

```bash
npm run build
```

จะได้โฟลเดอร์ `dist/` เอาไป deploy ได้เลยกับ Vercel, Netlify, Cloudflare Pages, GitHub Pages ฯลฯ

## เชื่อมต่อ API จริง

ในไฟล์ `src/LungScreeningApp.jsx` หาบรรทัด:

```js
const PROCESS_API_URL = null;
```

เปลี่ยนเป็น URL ของ backend จริง เช่น `"https://your-api.example.com/analyze"` ระบบจะส่งภาพ + อีเมล ไปที่ endpoint นี้แบบ `multipart/form-data` (field `images` และ `email`) และคาดหวัง response กลับมาเป็น JSON รูปแบบ `{ "abnormal": true/false, "type": "ชื่อชนิดมะเร็ง" }`
