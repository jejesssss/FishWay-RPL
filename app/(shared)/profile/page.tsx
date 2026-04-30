import Container from "@/components/Container";
import { DUMMY_USER, DUMMY_ORDERS, formatPrice } from "@/lib/data";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const STATUS_COLOR: Record<string, string> = {
  Diproses: "bg-yellow-100 text-yellow-700",
  Dikirim: "bg-blue-100 text-blue-700",
  Selesai: "bg-green-100 text-green-700",
};

export default function ProfilePage() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="card p-6">
          <div className="flex items-center gap-5">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
              {DUMMY_USER.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{DUMMY_USER.name}</h1>
              <p className="text-gray-500 text-sm">{DUMMY_USER.email}</p>
              <p className="text-gray-500 text-sm">{DUMMY_USER.phone}</p>
              <p className="text-xs text-gray-400 mt-1">Bergabung sejak {DUMMY_USER.joined}</p>
            </div>
            <button className="btn-outline text-sm py-1.5">Edit Profil</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Pesanan", value: DUMMY_USER.orders, icon: "📦" },
            { label: "Selesai", value: 9, icon: "✅" },
            { label: "Diproses", value: 3, icon: "⏳" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Address */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-800">📍 Alamat Utama</h2>
            <button className="text-xs text-primary hover:underline">Ubah</button>
          </div>
          <p className="text-sm text-gray-600">{DUMMY_USER.address}</p>
        </div>

        {/* Order History */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-800 mb-4">📋 Riwayat Pesanan</h2>
          <div className="space-y-3">
            {DUMMY_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{order.product}</p>
                  <p className="text-xs text-gray-400">{order.id} · {order.date} · {order.qty} kg</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 text-sm">{formatPrice(order.total)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/seller" className="card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
            <span className="text-2xl">🏪</span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Toko Saya</p>
              <p className="text-xs text-gray-400">Kelola produk & pesanan</p>
            </div>
          </Link>
          <button className="card p-4 flex items-center gap-3 text-left hover:border-red-200 transition-colors">
            <span className="text-2xl">🚪</span>
            <div>
              <p className="font-semibold text-red-500 text-sm">Keluar</p>
              <p className="text-xs text-gray-400">Logout akun</p>
            </div>
          </button>
        </div>
      </div>
    </Container>
  );
}
