"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ResponseData {
  id: number;
  name: string;
  role: string;
  total: number;
  stage: string;
  createdAt: string;
}

export default function Admin() {
  const [data, setData] = useState<ResponseData[]>([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetch("https://api-production-e8eb.up.railway.app/api/admin/responses", {
      headers: {
        "Authorization": "Bearer VIBE_CODING_2026"
      }
    })
      .then(res => res.json())
      .then(res => {
        if(res.success) setData(res.data);
        else setError(res.message);
      })
      .catch(err => setError("Failed to connect to API"));
  }, []);

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-heading text-primary">Admin Dashboard</h1>
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
          ← Back to Home
        </Link>
      </div>
      
      {error && <div className="text-destructive mb-4 p-4 bg-destructive/10 rounded">{error}</div>}
      
      <div className="bg-card border border-border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Total Score</th>
              <th className="px-6 py-4 font-medium">Stage</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No responses yet.</td></tr>
            ) : data.map(row => (
              <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-mono">{row.id}</td>
                <td className="px-6 py-4 font-medium text-card-foreground">{row.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{row.role}</td>
                <td className="px-6 py-4 font-mono">{row.total}</td>
                <td className="px-6 py-4">
                  <span className="bg-muted px-2 py-1 rounded text-xs font-medium uppercase tracking-wider">
                    {row.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(row.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
