import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Input } from '@repo/ui';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">POS 로그인</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            보드게임 카페 관리 시스템에 로그인하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="id" className="text-sm font-medium text-foreground">
              아이디
            </label>
            <Input
              id="id"
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
          </div>

          <Button type="submit" className="mt-6 h-12 w-full" size="lg">
            <LogIn className="mr-2 size-5" />
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
