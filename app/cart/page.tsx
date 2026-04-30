import Container from "@/components/Container";
import { DUMMY_CART, formatPrice } from "@/lib/data";
import Link from "next/link";

export default function CartPage() {
  const subtotal = DUMMY_CART.reduce((sum, item) => sum + item.price * item.qty, 0);
  const ongkir = 15000;
  const total = subtotal + ongkir;
 
  return (
    <Container>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🛒 Keranjang Belanja</h1>

      {DUMMY_CART.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-gray-500 mb-4">Keranjang kamu kosong</p>
          <Link href="/" className="btn-primary inline-block">Mulai Belanja</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Item List */}
          <div className="md:col-span-2 space-y-3">
            {DUMMY_CART.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4 items-center">
                {/* Emoji */}
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  {item.emoji}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.seller} · {item.location}</p>
                  <p className="text-primary font-bold mt-1">
                    {formatPrice(item.price)}/{item.unit}
                  </p>
                </div>
                {/* Qty Control */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm">−</button>
                  <span className="w-6 text-center font-medium">{item.qty}</span>
                  <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm">+</button>
                </div>
                {/* Subtotal */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-800">{formatPrice(item.price * item.qty)}</p>
                  <button className="text-red-400 hover:text-red-600 text-xs mt-1">Hapus</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="card p-5 space-y-3 sticky top-20">
              <h2 className="font-bold text-gray-800 text-lg">Ringkasan Pesanan</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({DUMMY_CART.length} item)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span>{formatPrice(ongkir)}</span>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span className="text-primary text-lg">{formatPrice(total)}</span>
              </div>
              <Link
                href="/checkout"
                className="btn-primary w-full text-center block py-3 rounded-xl"
              >
                Lanjut ke Checkout →
              </Link>
              <Link href="/" className="text-sm text-center text-primary block hover:underline">
                + Tambah Produk
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
