'use client';

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, { id: string; name: string }> | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent, providerId: string) => {
    e.preventDefault();
    signIn(providerId, { ...credentials, redirect: true, callbackUrl: "/settings/profile" });
  };

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <form onSubmit={(e) => handleSubmit(e, provider.id)}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
            <button type="submit">Sign in with {provider.name}</button>
          </form>
          <div>
            <button
              onClick={() => signIn(provider.id, { username: 'avis', password: '123456' })}
            >
              Sign in with {provider.name} (Default Login)
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
