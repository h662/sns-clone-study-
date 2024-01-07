"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FC, useEffect } from "react";

const Header: FC = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div className="bg-red-100">
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Header;
