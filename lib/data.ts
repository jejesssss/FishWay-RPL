export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  category: string;
  seller: string;
  location: string;
  description: string;
  emoji: string;
};

export type CartItem = Product & { qty: number };

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ikan bebek Segar",
    price: 85000,
    unit: "kg",
    stock: 20,
    category: "Ikan Laut",
    seller: "Pak Budi",
    location: "Jakarta Utara",
    description: "Salmon segar impor langsung dari nelayan, cocok untuk sashimi atau dibakar.",
    emoji: "🐟",
  },
  {
    id: "2",
    name: "Udang Windu",
    price: 120000,
    unit: "kg",
    stock: 15,
    category: "Udang",
    seller: "Bu Sari",
    location: "Surabaya",
    description: "Udang windu besar segar, cocok untuk berbagai masakan.",
    emoji: "🦐",
  },
  {
    id: "3",
    name: "Cumi-cumi Segar",
    price: 65000,
    unit: "kg",
    stock: 30,
    category: "Cumi",
    seller: "Pak Hendra",
    location: "Makassar",
    description: "Cumi segar tangkapan hari ini, daging tebal dan kenyal.",
    emoji: "🦑",
  },
  {
    id: "4",
    name: "Ikan Kerapu",
    price: 150000,
    unit: "kg",
    stock: 10,
    category: "Ikan Laut",
    seller: "Pak Budi",
    location: "Jakarta Utara",
    description: "Kerapu premium, dagingnya putih dan lembut.",
    emoji: "🐠",
  },
  {
    id: "5",
    name: "Kepiting Bakau",
    price: 200000,
    unit: "kg",
    stock: 8,
    category: "Kepiting",
    seller: "Ibu Dewi",
    location: "Balikpapan",
    description: "Kepiting bakau betina bertelur, segar dari tambak.",
    emoji: "🦀",
  },
  {
    id: "6",
    name: "Lele Dumbo",
    price: 25000,
    unit: "kg",
    stock: 50,
    category: "Ikan Air Tawar",
    seller: "Pak Santoso",
    location: "Bogor",
    description: "Lele dumbo segar dari kolam, ukuran konsumsi.",
    emoji: "🐡",
  },
];

export const DUMMY_CART: CartItem[] = [
  { ...PRODUCTS[0], qty: 2 },
  { ...PRODUCTS[1], qty: 1 },
];

export const DUMMY_USER = {
  name: "Andi Pratama",
  email: "andi@email.com",
  phone: "08123456789",
  address: "Jl. Merdeka No. 10, Bogor, Jawa Barat",
  joined: "Januari 2024",
  orders: 12,
  avatar: "🧑‍💼",
};

export const DUMMY_ORDERS = [
  {
    id: "ORD-001",
    buyer: "Andi Pratama",
    product: "Ikan Salmon Segar",
    qty: 2,
    total: 170000,
    status: "Diproses",
    date: "2024-07-20",
  },
  {
    id: "ORD-002",
    buyer: "Bela Sari",
    product: "Udang Windu",
    qty: 1,
    total: 120000,
    status: "Dikirim",
    date: "2024-07-19",
  },
  {
    id: "ORD-003",
    buyer: "Citra Dewi",
    product: "Kepiting Bakau",
    qty: 3,
    total: 600000,
    status: "Selesai",
    date: "2024-07-18",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
