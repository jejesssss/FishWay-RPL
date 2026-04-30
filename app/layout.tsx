import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter-sans" });

export const metadata: Metadata = {
  title: "Fishway – Jual Beli Ikan Segar",
  description: "Platform jual beli ikan segar terpercaya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("layout render");
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans bg-bg `}>
        <main>{children}</main>
        <footer className="mt-16 border-t border-gray-200 bg-white relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
            © 2026 Fishway – Platform Jual Beli Ikan Segar
          </div>
        </footer>
      </body>
    </html>
  );
}
