import { NextResponse } from "next/server";

type Role = "buyer" | "seller";

export function middleware(req: any) {
  const role = "seller";
  const path = req.nextUrl.pathname;

  const roleAccess: Record<string, Role[]> = {
    "/": ["buyer", "seller"],
    "/seller": ["seller"],
    "/cart": ["buyer"],
  };

  if (["/login", "/signup"].includes(path)) {
    return NextResponse.next();
  }

  const allowedRoles = roleAccess[path];

  if (!allowedRoles) {
    return NextResponse.next();
  }

  // belum login
  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // role tidak sesuai
  if (!allowedRoles.includes(role)) {
    console.log("403/404: role tidak sesuai", { path, role });
    return NextResponse.next();
  }

  return NextResponse.next();
}
