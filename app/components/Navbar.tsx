import Link from "next/link";

// components
import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import UserNav from "./UserNav";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            Harsh<span className="text-primary">Saas</span>
          </h1>
        </Link>
        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          {(await isAuthenticated()) ? (
            <UserNav
              email={user?.email as string}
              image={user?.picture as string}
              name={user?.given_name as string}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign in</Button>
              </LoginLink>

              <RegisterLink>
                <Button variant="secondary">Sign up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
