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

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-serif font-bold text-white">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Join the realm and track your collection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-gray-200">
                First name
              </Label>
              <Input
                id="first-name"
                placeholder="John"
                className="bg-white/5 border-white/10 text-white focus-visible:ring-bismuth-cyan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className="text-gray-200">
                Last name
              </Label>
              <Input
                id="last-name"
                placeholder="Doe"
                className="bg-white/5 border-white/10 text-white focus-visible:ring-bismuth-cyan"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-bismuth-cyan"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="bg-white/5 border-white/10 text-white focus-visible:ring-bismuth-cyan"
            />
          </div>
          <Button className="w-full bg-white text-black hover:bg-gray-200 font-medium">
            Create Account
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-bismuth-magenta hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
