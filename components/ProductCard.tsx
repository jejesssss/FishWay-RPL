import Link from "next/link";
import { Product, formatPrice } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="card p-4 hover:shadow-md transition-shadow group-hover:border-primary/30">
        {/* Emoji Placeholder (ganti dengan <Image> jika sudah ada foto) */}
        <div className="bg-blue-50 rounded-lg h-36 flex items-center justify-center text-5xl mb-3">
          {product.emoji}
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide">{product.category}</p>
          <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-primary font-bold text-lg">
            {formatPrice(product.price)}
            <span className="text-gray-400 font-normal text-sm">/{product.unit}</span>
          </p>
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-gray-500">📍 {product.location}</p>
            <p className="text-xs text-gray-500">Stok: {product.stock}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
