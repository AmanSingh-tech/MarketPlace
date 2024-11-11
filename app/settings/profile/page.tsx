"use client"

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then(sessionData => {
      setSession(sessionData);
    });
  }, []);

  return (
    <div>
        {session ? <div>{JSON.stringify(session)}</div> : <div>Loading...</div>}
        User profile section
    </div>
  )
}

export default Page
