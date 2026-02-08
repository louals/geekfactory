'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { authService } from '@/lib/services/auth';
import { useAuthStore } from '@/lib/auth-store';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await authService.login(formData);
      let userData = data.user;

      if (!userData) {
        // We set the auth partially first so the interceptor has the token
        setAuth({ _id: '', name: '', email: formData.email, role: 'user' }, data.accessToken, data.refreshToken);
        try {
          userData = await authService.getMe();
        } catch (getMeError) {
          console.error('Failed to fetch profile:', getMeError);
        }
      }

      if (userData) {
        setAuth(userData, data.accessToken, data.refreshToken);
      }

      toast.success('Welcome back!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }


  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-serif font-bold text-white">
            Login
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="m@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-bismuth-cyan"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-bismuth-cyan hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white focus-visible:ring-bismuth-cyan"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black hover:bg-gray-200 font-medium"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-bismuth-magenta hover:underline"
            >
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

