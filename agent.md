# 🤖 agent.md — AI Creative Maturity Diagnostic v3

> Đọc file này TRƯỚC KHI viết bất kỳ dòng code nào. Đây là cấu hình bắt buộc cho toàn bộ dự án.

---

## 🎯 Mục đích dự án
Tool trắc nghiệm đánh giá mức độ làm chủ AI. Rebuilt theo đúng Vibe Coding Monorepo Architecture.

## ⚙️ Tech Stack CỐ ĐỊNH

| Layer | Công nghệ | Vai trò |
|-------|-----------|---------|
| **Runtime** | Bun | Chạy JavaScript cực nhanh |
| **Frontend** | Next.js (App Router) | React, SSR, SEO-friendly |
| **Styling** | Tailwind CSS v3 | Utility-first CSS |
| **UI Components** | shadcn/ui | Form, button, card, progress |
| **Charts** | Recharts | Radar, Bar charts |
| **Backend** | ElysiaJS | API server nhẹ, xử lý logic chấm điểm |
| **Database** | SQLite + Drizzle ORM | Lưu trữ dữ liệu tại `data.db` |
| **Monorepo** | Bun Workspaces | Quản lý `apps/web` và `apps/api` |

## 📁 Cấu trúc thư mục Monorepo BẮT BUỘC

```text
ai-diagnostic-v3/
├── package.json               ← Bun Workspaces config
├── apps/
│   ├── web/                   ← Next.js
│   │   ├── src/
│   │   │   ├── app/           ← page.tsx, layout.tsx, /quiz, /results, /admin
│   │   │   └── components/    ← ui/, RoleCard.tsx, RadarChart.tsx
│   │   └── public/            ← robots.txt, sitemap.xml
│   │
│   └── api/                   ← ElysiaJS
│       ├── src/
│       │   ├── db/            ← schema.ts, index.ts
│       │   ├── routes/        ← submit.ts, admin.ts
│       │   └── index.ts       ← Entry point + CORS
│       └── data.db            ← SQLite database
├── docs/
│   └── design.md
├── specs.md
└── agent.md
```

## 📐 Quy tắc coding
1. **Frontend (Next.js)**: Các component có tương tác (onClick, hooks) phải có `"use client"`. Layout và trang `/` nên là Server Component để SEO.
2. **Backend (Elysia)**: Tính toán điểm số phải nằm ở API `POST /api/submit`, không tính điểm trên Frontend.
3. **Admin**: Route `/admin` phải check mật khẩu (middleware/guard).
4. **Data**: Toàn bộ dữ liệu truyền qua REST API.

## 📖 Hướng dẫn cho AI (Build Strategy):
1. Đọc `specs.md`, `agent.md`, `docs/design.md`.
2. Khởi tạo cấu trúc Bun Workspaces (với 2 thư mục `web` và `api`).
3. Setup `apps/api` trước (Schema -> API Routes -> Logic chấm điểm).
4. Setup `apps/web` sau (Cấu hình Next.js -> Components -> Kết nối API).
