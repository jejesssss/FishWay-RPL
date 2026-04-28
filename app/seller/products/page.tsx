import Container from "@/components/Container";
import { PRODUCTS, formatPrice } from "@/lib/data";
import Link from "next/link";

export default function SellerProductsPage() {
  const myProducts = PRODUCTS.filter((p) => p.seller === "Pak Budi");

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/seller" className="text-sm text-gray-400 hover:text-primary">← Dashboard</Link>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">Manajemen Produk</h1>
          </div>
          <button className="btn-primary text-sm">+ Tambah Produk</button>
        </div>

        {/* Add Product Form (simple) */}
        <div className="card p-5 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Tambah Produk Baru</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
              <input type="text" placeholder="Ikan Salmon Segar" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Ikan Laut</option>
                <option>Udang</option>
                <option>Cumi</option>
                <option>Kepiting</option>
                <option>Ikan Air Tawar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp/kg)</label>
              <input type="number" placeholder="85000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok (kg)</label>
              <input type="number" placeholder="20" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea rows={2} placeholder="Deskripsi singkat produk..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary resize-none" />
            </div>
          </div>
          <button className="btn-primary mt-4 text-sm">Simpan Produk</button>
        </div>

        {/* Product Table */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-800">Produk Saya ({myProducts.length})</h2>
          </div>
          <div className="divide-y">
            {myProducts.map((product) => (
              <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category} · Stok: {product.stock} {product.unit}</p>
                </div>
                <p className="font-bold text-primary text-sm flex-shrink-0">{formatPrice(product.price)}</p>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="text-xs text-primary hover:underline">Edit</button>
                  <button className="text-xs text-red-400 hover:underline">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
