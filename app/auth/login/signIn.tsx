'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProviders, signIn } from 'next-auth/react';
import { Chrome, User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [providers, setProviders] = useState<Record<string, { id: string; name: string }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
        callbackUrl: `/user/profile/${username}`,
      });

      if (result?.error) {
        setError(result.error);
        console.error('Login error:', result.error);
      } else if (result?.ok) {
        // Login successful, redirect to profile
        router.push(`/user/profile/${username}`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  const handleGoogleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Left Side - Art Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-900 via-indigo-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative w-full h-full flex flex-col items-center justify-center p-12 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            Art Marketplace
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-md">
            Your gateway to discovering and collecting unique digital art pieces from talented artists worldwide.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">10K+</h3>
              <p className="text-sm text-gray-400">Active Artists</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">50K+</h3>
              <p className="text-sm text-gray-400">Artworks Sold</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
            <p className="mt-2 text-gray-400">Let&apos;s get you back into your account</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            {error && (
              <div className="p-4 text-sm text-red-400 bg-red-900/20 border border-red-500/20 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="link"
                onClick={() => router.push('/auth/forgot-password')}
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg h-12 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              Login <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0A0A0A] text-gray-500">Or continue with</span>
            </div>
          </div>

          {providers &&
            Object.values(providers).map(
              (provider) =>
                provider.id !== 'credentials' && (
                  <Button
                    key={provider.id}
                    onClick={() => handleGoogleSignIn(provider.id)}
                    variant="outline"
                    className="w-full h-12 bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {provider.name === 'Google' && <Chrome className="h-5 w-5" />}
                    Continue with {provider.name}
                  </Button>
                )
            )}

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Button
              variant="link"
              onClick={() => router.push('/auth/register')}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
