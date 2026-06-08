"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function QuizContent() {
  const searchParams = useSearchParams();
  const role = searchParams?.get('role') || 'Unknown';
  const router = useRouter();
  
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const questions = Array(10).fill(0).map((_, i) => ({
    title: `Câu hỏi ${i + 1} dành cho ${role}`,
    options: [
      "Cách làm thủ công truyền thống (1 điểm)",
      "Sử dụng AI công cụ đơn lẻ (2 điểm)",
      "Tích hợp chuỗi công cụ AI (3 điểm)",
      "Xây dựng hệ thống tự động hoàn toàn (4 điểm)"
    ]
  }));

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers, idx + 1];
    setAnswers(newAnswers);
    if (currentQ < 9) {
      setCurrentQ(currentQ + 1);
    } else {
      // Gửi data tới ElysiaJS API
      fetch("http://localhost:3001/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Vibe Coder", phone: "0999999999", company: "Sunext", role, answers: newAnswers
        })
      }).then(res => res.json()).then(data => {
        if(data.success) {
          router.push(`/results?id=${data.data.id}`);
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <span className="bg-muted px-2 py-1 rounded">Vai trò: {role}</span>
        <span>Tiến độ: {currentQ + 1}/10</span>
      </div>
      
      <div className="bg-card border border-border p-8 rounded-md">
        <h2 className="text-2xl mb-8 text-primary font-heading">
          {questions[currentQ].title}
        </h2>
        <div className="space-y-3">
          {questions[currentQ].options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleSelect(i)}
              className="w-full text-left p-4 border border-border rounded-md hover:border-primary hover:bg-muted transition-colors text-sm text-card-foreground"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Quiz() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-3xl mx-auto">
      <Suspense fallback={<div>Loading quiz...</div>}>
        <QuizContent />
      </Suspense>
    </main>
  );
}
