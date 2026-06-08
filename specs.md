# 📋 specs.md — AI Creative Maturity Diagnostic (V3)

## 🎯 1. Mục tiêu dự án
Công cụ trắc nghiệm giúp người đi làm đa ngành (SME, Creative, Kế toán, Nhân sự) tự đánh giá mức độ làm chủ AI theo 6 trụ cột, nhận kết quả cá nhân hóa và lộ trình hành động 90 ngày. V3 được nâng cấp để tối ưu SEO và bảo mật cấp doanh nghiệp.

## 👥 2. Đối tượng người dùng
- Art Director
- Founder SME / Agency
- Creative & Marketing
- Kế toán
- Nhân sự

## ⚙️ 3. Tính năng chính
- [ ] Landing page giới thiệu công cụ (SEO Friendly)
- [ ] Chọn vai trò (5 roles)
- [ ] Form nhập thông tin (Tên, SĐT, Công ty)
- [ ] Quiz 10 câu hỏi (Cá nhân hóa nội dung theo 5 vai trò)
- [ ] Trang kết quả: điểm tổng, radar chart, bar chart, lộ trình 90 ngày
- [ ] Trang Admin xem toàn bộ responses với thống kê

## 💾 4. Database Schema (SQLite)

| Table | Fields |
|-------|--------|
| `responses` | id, name, phone, company, role, answers (JSON), scores (JSON), total, stage, created_at |

## 🎨 5. Màn hình cần thiết
1. `/` — Landing + Role Selection + User Info Form
2. `/quiz` — Quiz 20 câu
3. `/results` — Kết quả chi tiết
4. `/admin` — Dashboard admin

## 📋 6. Yêu cầu phi chức năng
- **Hiệu năng & SEO**: Bắt buộc dùng SSR (Server-Side Rendering) cho Landing Page, có `robots.txt` và `sitemap.xml` để index Google. Load < 2 giây.
- **Bảo mật**: 
  - Trang `/admin` phải được bảo vệ bằng màn hình đăng nhập (chỉ cần PIN code đơn giản hoặc Hardcode Auth).
  - Logic chấm điểm phải được xử lý ở Backend, không lộ ở Client.
- **Responsive**: Mobile + Tablet + Desktop
- **Design**: Sunext Corporate theme (Navy #1e3a5f + Gold #c8a45c)
