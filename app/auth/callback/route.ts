import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/";
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const fullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email ||
      "Pengguna Fishway";

    await supabase.from("accounts").upsert(
      {
        id: user.id,
        name: fullName,
        address: null,
      },
      { onConflict: "id" },
    );

    const [{ data: buyer }, { data: seller }] = await Promise.all([
      supabase.from("buyers").select("id").eq("id", user.id).maybeSingle(),
      supabase.from("sellers").select("id").eq("id", user.id).maybeSingle(),
    ]);

    if (!buyer && !seller) {
      return NextResponse.redirect(`${origin}/signup`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
