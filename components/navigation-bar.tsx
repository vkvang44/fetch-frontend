"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";
import FindMatch from "./find-match";

export default function NavigationBar() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    if (!res.ok) {
      alert("Something went wrong!");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between p-4 sticky top-0 overflow-hidden bg-background z-50">
      <div className="flex items-center">
        <Image
          src="/fetch-logo.svg"
          alt="Fetch Logo"
          width={40}
          height={20}
          priority
        />
        <h1 className="font-bold text-2xl ml-2">Fetch Take Home</h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/search" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Search
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <FindMatch />
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              onClick={handleLogout}
              className={`cursor-pointer ${navigationMenuTriggerStyle()}`}
            >
              Logout
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
