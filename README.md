# HẠT GIỐNG NHÀ VƯỜN - E-COMMERCE PLATFORM

> **Slogan:** *"ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI"*  
> **Hotline Cấu Hình:** `0934 811 307`  
> **Địa chỉ:** Quảng Ngãi, Việt Nam

---

## 🌟 GIỚI THIỆU DỰ ÁN

Website thương mại điện tử hoàn chỉnh chuyên kinh doanh các loại **Hạt Giống Hoa, Hạt Giống Rau Sạch, Cây Ăn Trái Chậu Lùn và Cây Cảnh Phong Thủy**.

Dự án được thiết kế chuẩn Production với các tính năng đột phá:
- 🚀 **Đặt Hàng Siêu Tốc Không Cần Tài Khoản**: Tối ưu chuyển đổi cho khách hàng từ Facebook, TikTok, Zalo.
- 📱 **Telegram Bot Thông Báo Tự Động**: Bắn thông tin đơn hàng chi tiết lập tức về điện thoại của Chủ Shop qua Telegram API.
- 💬 **Xác Nhận & Tư Vấn Facebook Messenger**: Nút deep-link `m.me` tự động kèm mã đơn `HNV-YYYYMMDD-XXXX` và kiến trúc Webhook API.
- 🛡️ **Bảo Mật Giá Server-side**: Không tin giá từ frontend; backend tự tính toán giá, giảm giá coupon và phí ship từ cơ sở dữ liệu.
- 📦 **Quản Lý Tồn Kho & Cảnh Báo Kho**: Trừ tồn kho tự động, cảnh báo sản phẩm sắp hết hàng trong Admin.
- 🎨 **Thiết Kế Đột Phá Hài Hòa**: Đậm chất thiên nhiên, thân thiện với di động (Mobile-first) kèm thanh điều hướng cố định Mobile Bottom Nav.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

- **Frontend:** Next.js 14+ App Router, React 18, TypeScript, Tailwind CSS
- **State Management:** Zustand (Cart state persisted in `localStorage`)
- **Backend & API:** Next.js Server Actions & API Routes
- **Database:** PostgreSQL (Supabase) + Full RLS (Row Level Security) Policies
- **Authentication:** Supabase Auth (Admin login)
- **Notification & Chat:** Telegram Bot API, Meta Messenger Graph API & Deep Links
- **Form & Validation:** React Hook Form, Zod
- **SEO & Performance:** Next.js Metadata API, JSON-LD Schema (Product, Article), Dynamic Sitemap & Robots.txt

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT LẬP TRÌNH LOCAL

### 1. Yêu Cầu Hệ Thống
- Node.js version 18.0 trở lên (Khuyến nghị Node.js v20+)
- npm version 9+

### 2. Cài Đặt Package
```bash
# Cài đặt toàn bộ dependencies
npm install
```

### 3. Cấu Hình Biến Môi Trường (.env.local)
Tạo file `.env.local` dựa trên file `.env.example`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# SUPABASE CONFIG
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# TELEGRAM BOT API (Bắt buộc cho thông báo tự động)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id

# META MESSENGER PLATFORM API
META_APP_ID=
META_APP_SECRET=
META_PAGE_ID=
META_PAGE_ACCESS_TOKEN=
META_VERIFY_TOKEN=hatgiongnhavuon_secret_2026

NEXT_PUBLIC_FACEBOOK_PAGE_URL=https://facebook.com/hatgiongnhavuon
```

### 4. Chạy Dev Server
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ KHỞI TẠO DATABASE SUPABASE

1. Truy cập dự án **Supabase Dashboard** -> chọn **SQL Editor**.
2. Sao chép toàn bộ nội dung file `supabase_schema.sql` ở thư mục gốc dự án và dán vào SQL Editor.
3. Bấm **Run** để khởi tạo 17 bảng dữ liệu, các chỉ mục (indexes), chính sách RLS và dữ liệu cấu hình ban đầu.

---

## 🤖 HƯỚNG DẪN TẠO TELEGRAM BOT NHẬN ĐƠN

1. Tìm bot `@BotFather` trên ứng dụng Telegram.
2. Gửi lệnh `/newbot` và đặt tên bot (Ví dụ: `HatGiongNhaVuon_Bot`).
3. Sao chép **Bot Token** dán vào ô cấu hình trong trang `/admin/cau-hinh/telegram`.
4. Để lấy **Chat ID**: Tạo nhóm Telegram hoặc nhắn tin cho `@userinfobot` để lấy Chat ID của bạn.
5. VÀO Admin: `/admin/cau-hinh/telegram` -> Nhập Token + Chat ID -> Bấm **[KIỂM TRA KẾT NỐI]**.

---

## 🌐 QUẢN TRỊ ADMIN

- **Đường dẫn đăng nhập:** `/admin/dang-nhap`
- **Dashboard:** `/admin/dashboard`
- **Quản lý Sản Phẩm:** `/admin/san-pham`
- **Quản lý Đơn Hàng:** `/admin/don-hang`
- **Cấu hình Website:** `/admin/cau-hinh`

---

## 📦 BUILD & DEPLOYMENT LÊN VERCEL

1. Push mã nguồn dự án lên repository GitHub / GitLab.
2. Đăng nhập [Vercel.com](https://vercel.com) -> Import Repository.
3. Cấu hình các biến môi trường trong phần **Environment Variables** của Vercel.
4. Bấm **Deploy**.

---

## 📜 BẢO QUYỀN
© 2026 **Hạt Giống Nhà Vườn**. All rights reserved. Slogan: *"ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI"*
