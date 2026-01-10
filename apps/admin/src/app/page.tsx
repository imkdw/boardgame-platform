import type { ReactNode } from 'react';

export default function HomePage(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground">Boardgame Platform 관리자 페이지</p>
      </div>
    </main>
  );
}
