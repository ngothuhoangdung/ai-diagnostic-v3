"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');

  // Trong thực tế sẽ gọi fetch("http://localhost:3001/api/results/" + id)
  
  return (
    <div className="bg-card border border-border p-12 rounded-md flex flex-col gap-8 text-center items-center">
      <h1 className="text-4xl font-heading text-primary">Kết Quả Đánh Giá</h1>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground uppercase tracking-widest">Cấp Độ Của Bạn</span>
        <span className="text-2xl font-medium text-success">Intermediate</span>
      </div>

      <p className="text-sm text-muted-foreground max-w-md">
        Dữ liệu đã được lưu trữ bảo mật tại Server (ElysiaJS + SQLite). 
        Logic tính điểm hoàn toàn ẩn với Client.
      </p>

      <div className="mt-8 border-t border-border pt-8 flex gap-4 w-full justify-center">
        <Link href="/" className="px-6 py-3 text-sm font-medium border border-border rounded hover:bg-muted transition-colors text-primary">
          Làm lại từ đầu
        </Link>
        <Link href="/admin" className="px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
          Xem Trang Admin
        </Link>
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-3xl mx-auto flex items-center justify-center">
      <Suspense fallback={<div>Loading results...</div>}>
        <ResultsContent />
      </Suspense>
    </main>
  );
}
