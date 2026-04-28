import Container from "@/components/Container";
import { DUMMY_CART, formatPrice } from "@/lib/data";

const total = DUMMY_CART.reduce((s, i) => s + i.price * i.qty, 0) + 15000;

export default function CheckoutPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Delivery Form */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-lg border-b pb-3">📦 Alamat Pengiriman</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
            <input
              type="text"
              defaultValue="Andi Pratama"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
            <input
              type="tel"
              defaultValue="08123456789"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
            <textarea
              defaultValue="Jl. Merdeka No. 10, Bogor, Jawa Barat"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (opsional)</label>
            <input
              type="text"
              placeholder="Misal: taruh di depan pintu"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Payment & Summary */}
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="card p-5">
            <h2 className="font-bold text-gray-800 mb-3 border-b pb-2">🧾 Pesanan</h2>
            <div className="space-y-2">
              {DUMMY_CART.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x{item.qty}</span>
                  <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-500">
                <span>Ongkos Kirim</span>
                <span>{formatPrice(15000)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-primary text-base">
                <span>Total Bayar</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* QRIS Payment */}
          <div className="card p-5 text-center">
            <h2 className="font-bold text-gray-800 mb-3">💳 Pembayaran QRIS</h2>
            {/* QR Placeholder */}
            <div className="bg-gray-100 rounded-xl w-40 h-40 mx-auto flex items-center justify-center mb-3 border-2 border-dashed border-gray-300">
              <span className="text-4xl">📱</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Scan QR Code dengan e-wallet atau mobile banking</p>
            <p className="font-bold text-primary text-lg">{formatPrice(total)}</p>
            <p className="text-xs text-gray-400 mt-1">Berlaku 15 menit</p>
          </div>

          {/* Confirm Button */}
          <button className="btn-primary w-full py-3 rounded-xl text-base">
            ✅ Sudah Scan, Konfirmasi Pembayaran
          </button>
          <p className="text-xs text-center text-gray-400">
            Pesanan akan diproses setelah pembayaran dikonfirmasi
          </p>
        </div>
      </div>
    </Container>
  );
}
