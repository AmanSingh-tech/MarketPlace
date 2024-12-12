"use client";

import { Search, Home, PlusSquare, Heart, User } from 'lucide-react';
import Link from 'next/link';
import { getSession, Session } from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then(sessionData => {
      setSession(sessionData);
    });
  }, []);

  console.log(session);

  const handleAdd = () => {
    if (session?.user) {
      const username = session.user.username; // Fallback if `name` is not defined
      router.push(`/user/profile/${username}/addpost`);
    } else {
      router.push("/auth/login"); 
    }
  };
  const handleLike = () => {
    if (session?.user) {
      const username = session.user.username; // Fallback if `name` is not defined
      router.push(`/user/liked/${username}/`);
    } else {
      router.push("/auth/login"); 
    }
  }
  const handleProf = () => {
    if (session?.user) {
      router.push(`/user/profile/${session.user.username}`);
    } else {
      router.push('/auth/login');
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">MarketPlace</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-100 rounded-md py-1 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <nav className="flex items-center space-x-4">
          <Link href='/'>
            <Home
              className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125"
              size={24}
            />
          </Link>
          <button
            onClick={handleAdd}
            className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125"
          >
            <PlusSquare size={24} />
          </button>
          <button onClick={handleLike}>
          <Heart
            className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-red-500"
            size={24}
          />
          </button>
          <button onClick={handleProf}>
          <User
            className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125"
            size={24}
          />
          </button>
          </nav>

      </div>
    </header>
  );
}
