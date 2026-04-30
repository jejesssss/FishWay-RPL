"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    namaLengkap: "",
    email: "",
    noTelepon: "",
    password: "",
    konfirmasiPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value: string) =>
    /^(\+62|62|0)[0-9]{8,13}$/.test(value.replace(/\s/g, ""));

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.namaLengkap.trim())
      newErrors.namaLengkap = "Nama lengkap tidak boleh kosong";
    if (!form.email) newErrors.email = "Email tidak boleh kosong";
    else if (!validateEmail(form.email))
      newErrors.email = "Format email tidak valid";
    if (!form.noTelepon)
      newErrors.noTelepon = "Nomor telepon tidak boleh kosong";
    else if (!validatePhone(form.noTelepon))
      newErrors.noTelepon = "Format nomor telepon tidak valid";
    if (!form.password) newErrors.password = "Password tidak boleh kosong";
    else if (form.password.length < 8)
      newErrors.password = "Password minimal 8 karakter";
    if (!form.konfirmasiPassword)
      newErrors.konfirmasiPassword = "Konfirmasi password tidak boleh kosong";
    else if (form.password !== form.konfirmasiPassword)
      newErrors.konfirmasiPassword = "Password tidak cocok";
    if (!agree) newErrors.agree = "Anda harus menyetujui syarat & ketentuan";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // TODO: Implement Supabase auth
      // const { error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.namaLengkap, phone: form.noTelepon } } })
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const fields = [
    {
      key: "namaLengkap",
      label: "Nama Lengkap",
      type: "text",
      placeholder: "Masukkan nama lengkap Anda",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "Masukkan email Anda",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      key: "noTelepon",
      label: "No. Telepon",
      type: "tel",
      placeholder: "Masukkan no. telepon Anda",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
  ];

  const lockIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    );

  return (
    <div className="flex bg-[#F7FBFF] h-screen  overflow-hidden">

      <div className="fixed inset-0 ">
        <svg
          className="absolute bottom-0 left-0 w-full z-0"
          viewBox="0 0 1440 320"
        >
          <path
            d="M0.000942231 37.2993C0.000942231 37.2993 113.811 -42.2906 166.552 73.4664C219.293 189.223 310.822 105.64 400.046 118.997C489.27 132.353 510.174 197.15 613.941 172.5C730.392 144.837 741.455 276.583 861.631 198.5C962.441 133 1001.02 211.058 1101.94 198.5C1201.03 186.17 1216.93 115.986 1324.94 172.5C1432.95 229.014 1445.94 -6.95959e-05 1523.26 0C1536.06 248.051 1524.08 261.374 1523.26 420C1523.26 420 -0.00114292 865.966 6.43158e-10 394.983C0.00114292 -76.0001 0.739034 205.986 0.000766754 88L0.000942231 37.2993Z"
            fill="#A2D2FF"
            fillOpacity="0.4"
          />
        </svg>

        <svg
          className="absolute -bottom-20 left-0 w-full z-10"
          viewBox="0 0 1440 320"
        >
          <path
            d="M0.000175476 37.2993C0.000175476 37.2993 0.458678 36.9786 1.33097 36.4076C1.50784 23.4542 1.66758 18.8862 1.79234 36.1075C16.4791 26.6079 117.706 -33.7407 166.551 73.4664C219.293 189.223 310.822 105.64 400.046 118.997C489.269 132.353 510.173 197.15 613.941 172.5C746.545 118.997 813.15 115.182 1004.05 188.841C1097.21 224.788 1193.53 116.326 1301.55 172.841C1409.56 229.355 1445.94 -6.95959e-05 1523.26 0C1536.06 248.051 1525.37 175.214 1525.32 252.925C1489.5 297.14 338.341 292.79 2.06249 252.925C2.06281 120.752 1.95866 59.0663 1.79234 36.1075C1.62759 36.214 1.47374 36.3142 1.33097 36.4076C0.903387 67.7215 0.37568 148.039 0 88L0.000175476 37.2993Z"
            fill="#A2D2FF"
            fillOpacity="0.5"
          />
        </svg>

        <svg
          className="absolute -bottom-[180px] left-0 w-full z-20"
          viewBox="0 0 1440 320"
        >
          <path
            d="M0.000175476 9.72022C0.000175476 9.72022 130.14 -31.7798 226.14 56.7202C322.14 145.22 442.416 53.3636 531.64 66.7202C620.863 80.0768 667.372 135.87 771.14 111.22C903.744 57.7167 885.744 48.061 1076.64 121.72C1169.8 157.667 1193.53 73.312 1301.55 129.826C1409.56 186.341 1454.83 46.7201 1532.15 46.7202C1532.15 140.001 1532.16 158.393 1532.16 160.017C1532.17 152.921 1532.17 161.242 1532.16 160.017C1532.16 163.428 1532.15 170.404 1532.15 183.72H3.20655C3.20606 145.826 0.738267 230.206 0 112.22L0.000175476 9.72022Z"
            fill="#689DD1"
          />
        </svg>
      </div>

      <div className="hidden lg:flex flex-col w-[45%] items-center relative p-12 z-30">
        <div className="relative mt-36 z-10">
          <h1 className="text-4xl font-bold text-[#3E6BAF] leading-tight mb-4">
            Belanja Ikan Segar
            <br />
            Mudah & Terpercaya
          </h1>
          <p className="text-[#3E6BAF] text-lg leading-relaxed">
            Fishway hadir untuk memberikan
            <br />
            ikan terbaik untuk Anda
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 min-h-screen flex items-center justify-center px-6 py-[100px]  z-30 overflow-y-auto">
        <div className="aw-full bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.25)] h-[800px] py-10 px-16 max-w-[480px] ">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/logo2_blue.png"
              alt="Fishway"
              width={140}
              height={44}
            />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Buat Akun</h2>
            <p className="text-gray-400 text-sm mt-1">
              Daftar untuk mulai berbelanja
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Text fields */}
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {f.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {f.icon}
                  </span>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                      errors[f.key]
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:border-[#568EC5] focus:ring-2 focus:ring-blue-100 focus:bg-white"
                    }`}
                  />
                </div>
                {errors[f.key] && (
                  <p className="text-red-500 text-xs mt-1.5">{errors[f.key]}</p>
                )}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  {lockIcon}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Buat password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition-all ${
                    errors.password
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 bg-gray-50 focus:border-[#568EC5] focus:ring-2 focus:ring-blue-100 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#568EC5] transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Konfirmasi Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  {lockIcon}
                </span>
                <input
                  type={showKonfirmasi ? "text" : "password"}
                  value={form.konfirmasiPassword}
                  onChange={(e) =>
                    handleChange("konfirmasiPassword", e.target.value)
                  }
                  placeholder="Konfirmasi password Anda"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition-all ${
                    errors.konfirmasiPassword
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 bg-gray-50 focus:border-[#568EC5] focus:ring-2 focus:ring-blue-100 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#568EC5] transition-colors"
                >
                  <EyeIcon open={showKonfirmasi} />
                </button>
              </div>
              {errors.konfirmasiPassword && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.konfirmasiPassword}
                </p>
              )}
            </div>

            {/* Agree checkbox */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    if (errors.agree)
                      setErrors((prev) => {
                        const n = { ...prev };
                        delete n.agree;
                        return n;
                      });
                  }}
                  className="mt-0.5 w-4 h-4 rounded accent-[#568EC5]"
                />
                <span className="text-sm text-gray-600">
                  Saya setuju dengan{" "}
                  <Link
                    href="/syarat-ketentuan"
                    className="text-[#568EC5] font-medium hover:underline"
                  >
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link
                    href="/kebijakan-privasi"
                    className="text-[#568EC5] font-medium hover:underline"
                  >
                    Kebijakan Privasi
                  </Link>
                </span>
              </label>
              {errors.agree && (
                <p className="text-red-500 text-xs mt-1.5 ml-6">
                  {errors.agree}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-70 mt-2"
              style={{ background: isLoading ? "#7aaed4" : "#568EC5" }}
              onMouseEnter={(e) =>
                !isLoading &&
                ((e.target as HTMLButtonElement).style.background = "#4578b0")
              }
              onMouseLeave={(e) =>
                !isLoading &&
                ((e.target as HTMLButtonElement).style.background = "#568EC5")
              }
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#568EC5] hover:underline"
            >
              Masuk sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
