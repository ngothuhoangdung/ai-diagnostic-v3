import Link from 'next/link';

export default function Home() {
  const roles = [
    { id: 'art-director', name: 'Art Director', desc: 'Design, Creative, Visuals' },
    { id: 'founder', name: 'Founder SME / Agency', desc: 'Business, Strategy, Operations' },
    { id: 'creative', name: 'Creative & Marketing', desc: 'Content, Campaigns, SEO' },
    { id: 'accounting', name: 'Kế toán', desc: 'Finance, Payroll, Invoices' },
    { id: 'hr', name: 'Nhân sự', desc: 'Recruiting, L&D, C&B' },
  ];

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto flex flex-col gap-12">
      <header className="space-y-4">
        <div className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded text-xs font-medium tracking-widest uppercase mb-4">
          AI Diagnostic V3
        </div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary">
          Đánh giá năng lực ứng dụng AI
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Công cụ trắc nghiệm giúp bạn tự đánh giá mức độ làm chủ AI trong công việc hàng ngày. 
          Vui lòng chọn vai trò của bạn để bắt đầu 10 câu hỏi đánh giá chuyên sâu.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <Link 
            key={role.id} 
            href={`/quiz?role=${role.id}`}
            className="group block p-6 bg-card border border-border rounded-md hover:border-primary transition-colors"
          >
            <h3 className="text-xl font-medium text-card-foreground mb-2">{role.name}</h3>
            <p className="text-sm text-muted-foreground">{role.desc}</p>
            <div className="mt-4 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Bắt đầu đánh giá →
            </div>
          </Link>
        ))}
      </section>
      
      <footer className="pt-12 border-t border-border text-xs text-muted-foreground">
        Powered by Vibe Coding Architecture • Built with ZenGrid Design System
      </footer>
    </main>
  );
}
