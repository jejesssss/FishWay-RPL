"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Home, LogOut, ShoppingCart, Tag, User } from "lucide-react";
import { createClient } from "@/utils/supabase/supabaseClient";

const navLinks = [
  { href: "/", icon: Home },
  { href: "/cart", icon: ShoppingCart },
  { href: "/profile", icon: User },
  { href: "/seller", icon: Tag },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    role: "Pembeli" | "Penjual" | null;
  }>({ name: "", role: null });

  useEffect(() => {
    const loadUserInfo = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const [{ data: account }, { data: buyer }, { data: seller }] =
        await Promise.all([
          supabase
            .from("accounts")
            .select("name")
            .eq("id", session.user.id)
            .maybeSingle(),
          supabase
            .from("buyers")
            .select("id")
            .eq("id", session.user.id)
            .maybeSingle(),
          supabase
            .from("sellers")
            .select("id")
            .eq("id", session.user.id)
            .maybeSingle(),
        ]);

      setUserInfo({
        name:
          account?.name ||
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email ||
          "User",
        role: seller ? "Penjual" : buyer ? "Pembeli" : null,
      });
    };

    loadUserInfo();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <nav className=" bg-[#407BB5] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logotemp.png"
            alt="logo"
            width={100}
            height={100}
          ></Image>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10 text-white/90"
              }`}
            >
              <Icon size={18} />
            </Link>
          ))}
          {userInfo.name && (
            <div className="mx-2 text-right leading-tight">
              <p className="max-w-[160px] truncate text-sm font-semibold">
                {userInfo.name}
              </p>
              <p className="text-xs text-white/75">
                {userInfo.role || "Belum pilih role"}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-1">
          {userInfo.role && (
            <span className="mr-1 rounded bg-white/15 px-2 py-1 text-[11px] font-semibold">
              {userInfo.role}
            </span>
          )}
          {navLinks.map(({ href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                pathname === href ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              <Icon size={22} />
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="px-2 py-1 rounded text-xs font-medium transition-colors hover:bg-white/10"
            aria-label="Logout"
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
