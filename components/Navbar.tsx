"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cart", label: "🛒 Keranjang" },
  { href: "/profile", label: "Profil" },
  { href: "/seller", label: "Jual" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#407BB5] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        {/* <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="text-2xl">🐟</span>
          <span>Fishway</span>
        </Link> */}

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10 text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                pathname === link.href ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
