# Dự án Lương 3Ps — Việt Đức · Survey App

Form khảo sát nhu cầu dự án tư vấn lương 3Ps, tích hợp lưu dữ liệu vào Google Sheet.

---

## Cấu trúc file

```
vietduc-3ps/
├── index.html              ← App form chính (deploy lên Vercel)
├── google-apps-script.js   ← Script cài vào Google Sheet
└── README.md               ← Hướng dẫn này
```

---

## Bước 1 — Đẩy code lên GitHub

```bash
git init
git add .
git commit -m "Initial survey app"
git remote add origin https://github.com/USERNAME/vietduc-3ps.git
git push -u origin main
```

---

## Bước 2 — Cài Google Apps Script (webhook nhận data)

1. Tạo Google Sheet mới (đặt tên: **Việt Đức 3Ps Responses**)
2. Vào **Extensions → Apps Script**
3. Xóa code mặc định, dán toàn bộ nội dung file `google-apps-script.js` vào
4. Bấm **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Bấm **Deploy** → Copy URL (dạng `https://script.google.com/macros/s/xxx/exec`)

---

## Bước 3 — Cắm URL webhook vào app

Mở `index.html`, tìm dòng:
```js
const WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
Thay bằng URL vừa copy ở bước 2, ví dụ:
```js
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxxx.../exec';
```
Commit lại lên GitHub.

---

## Bước 4 — Deploy lên Vercel

1. Vào [vercel.com](https://vercel.com) → Đăng nhập bằng GitHub
2. Bấm **New Project** → chọn repo `vietduc-3ps`
3. Giữ nguyên mọi cài đặt → bấm **Deploy**
4. Sau ~30 giây → nhận link dạng `https://vietduc-3ps.vercel.app`

---

## Cách dùng

- Gửi link Vercel cho khách hàng Việt Đức điền
- Mỗi lần submit → dữ liệu tự động vào Google Sheet
- Mở Google Sheet để xem tất cả responses
- Dùng dữ liệu để xây dựng Proposal dự án

---

## Phát triển thêm trong tương lai

Mỗi lần cần thêm câu hỏi hoặc chỉnh sửa:
1. Sửa `index.html` trên GitHub
2. Vercel tự động re-deploy trong ~30 giây
3. Nếu thêm trường dữ liệu mới → cập nhật `google-apps-script.js` và re-deploy script

---

*Tạo bởi: Dự án tư vấn Lương 3Ps · Việt Đức · 2026*