"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { Home, ShoppingCart, User, Tag } from "lucide-react";

const navLinks = [
  { href: "/",icon: Home },
  { href: "/cart",  icon: ShoppingCart },
  { href: "/profile", icon: User },
  { href: "/seller", icon:Tag},
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#407BB5] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logotemp.png"
            alt="logo"
            width={100}
            height={100}
          >
          </Image>
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
              <Icon size = {18} />
            </Link>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-1">
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
        </div>
      </div>
    </nav>
  );
}
