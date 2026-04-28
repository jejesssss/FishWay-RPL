import Container from "@/components/Container";
import { DUMMY_ORDERS, formatPrice } from "@/lib/data";
import Link from "next/link";

const STATUS_TABS = ["Semua", "Diproses", "Dikirim", "Selesai"];

const STATUS_COLOR: Record<string, string> = {
  Diproses: "bg-yellow-100 text-yellow-700",
  Dikirim: "bg-blue-100 text-blue-700",
  Selesai: "bg-green-100 text-green-700",
};

export default function SellerOrdersPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/seller" className="text-sm text-gray-400 hover:text-primary">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-1">Manajemen Pesanan</h1>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
                tab === "Semua"
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="card overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-5 py-3 bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span className="col-span-2">Pesanan</span>
            <span>Pembeli</span>
            <span>Total</span>
            <span>Status / Aksi</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y">
            {DUMMY_ORDERS.map((order) => (
              <div key={order.id} className="p-5 md:grid md:grid-cols-5 gap-4 items-center hover:bg-gray-50">
                <div className="col-span-2 mb-2 md:mb-0">
                  <p className="font-semibold text-gray-800 text-sm">{order.product}</p>
                  <p className="text-xs text-gray-400">{order.id} · {order.qty} kg · {order.date}</p>
                </div>
                <div className="mb-2 md:mb-0">
                  <p className="text-sm text-gray-600">{order.buyer}</p>
                </div>
                <div className="mb-2 md:mb-0">
                  <p className="font-bold text-gray-800 text-sm">{formatPrice(order.total)}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[order.status]}`}>
                    {order.status}
                  </span>
                  {order.status === "Diproses" && (
                    <button className="text-xs bg-primary text-white px-2 py-0.5 rounded-full hover:bg-primary-dark transition-colors">
                      Proses →
                    </button>
                  )}
                  {order.status === "Dikirim" && (
                    <button className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full hover:bg-green-600 transition-colors">
                      Selesai
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State (untuk referensi) */}
        {DUMMY_ORDERS.length === 0 && (
          <div className="card p-12 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500">Belum ada pesanan masuk</p>
          </div>
        )}
      </div>
    </Container>
  );
}
