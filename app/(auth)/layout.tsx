import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter-sans" });

export const metadata: Metadata = {
  title: "Fishway – Jual Beli Ikan Segar",
  description: "Platform jual beli ikan segar terpercaya",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
