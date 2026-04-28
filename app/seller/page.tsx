import Container from "@/components/Container";
import { PRODUCTS, DUMMY_ORDERS, formatPrice } from "@/lib/data";
import Link from "next/link";

const sellerProducts = PRODUCTS.filter((p) => p.seller === "Pak Budi");
const totalRevenue = DUMMY_ORDERS.reduce((s, o) => s + o.total, 0);

export default function SellerDashboardPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Penjual</h1>
            <p className="text-gray-500 text-sm">Selamat datang, Pak Budi 👋</p>
          </div>
          <Link href="/seller/products" className="btn-primary text-sm">
            + Tambah Produk
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Produk", value: sellerProducts.length, icon: "📦", color: "bg-blue-50 text-blue-600" },
            { label: "Pesanan Masuk", value: DUMMY_ORDERS.length, icon: "🛍️", color: "bg-green-50 text-green-600" },
            { label: "Perlu Diproses", value: 1, icon: "⏳", color: "bg-yellow-50 text-yellow-600" },
            { label: "Total Pendapatan", value: formatPrice(totalRevenue), icon: "💰", color: "bg-purple-50 text-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-xl font-bold text-gray-800 leading-tight">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Link href="/seller/products" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center text-3xl">📦</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Kelola Produk</h3>
                <p className="text-sm text-gray-500">{sellerProducts.length} produk aktif</p>
              </div>
              <span className="text-gray-300 group-hover:text-primary transition-colors text-xl">→</span>
            </div>
          </Link>
          <Link href="/seller/orders" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center text-3xl">🛍️</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Kelola Pesanan</h3>
                <p className="text-sm text-gray-500">{DUMMY_ORDERS.length} total pesanan</p>
              </div>
              <span className="text-gray-300 group-hover:text-primary transition-colors text-xl">→</span>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Pesanan Terbaru</h2>
            <Link href="/seller/orders" className="text-sm text-primary hover:underline">Lihat semua</Link>
          </div>
          <div className="space-y-3">
            {DUMMY_ORDERS.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between text-sm border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-gray-800">{order.product}</p>
                  <p className="text-xs text-gray-400">{order.buyer} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatPrice(order.total)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === "Selesai" ? "bg-green-100 text-green-700" :
                    order.status === "Dikirim" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
