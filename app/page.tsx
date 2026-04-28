import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";

const CATEGORIES = ["Semua", "Ikan Laut", "Udang", "Cumi", "Kepiting", "Ikan Air Tawar"];

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#407BB5] to-[#2f5d8a] text-white">
        <Container>
          <div className="py-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              🐟 Ikan Segar, Langsung dari Nelayan
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Pilih, pesan, dan nikmati kesegaran hasil laut terbaik
            </p>
            {/* Search Bar */}
            <div className="max-w-md mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Cari ikan, udang, kepiting..."
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 text-sm outline-none"
              />
              <button className="bg-white text-primary px-5 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                Cari
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 mt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
                cat === "Semua"
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Produk Tersedia</h2>
          <span className="text-sm text-gray-500">{PRODUCTS.length} produk</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
