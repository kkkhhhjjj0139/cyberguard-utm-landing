import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { leadApiSchema, normalizePhoneNumber } from "@/lib/validation";

export const runtime = "nodejs";

async function verifyTurnstile(token: string | null | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData },
    );
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = leadApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요.",
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "0.0.0.0";

    const turnstileOk = await verifyTurnstile(data.turnstile_token, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { success: false, error: "보안 검증에 실패했습니다." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();

    const insertPayload = {
      lead_id: data.lead_id,
      company_name: data.company_name.trim(),
      manager_name: data.manager_name.trim(),
      phone: normalizePhoneNumber(data.phone),
      email: data.email?.trim() || null,
      industry: data.industry || null,
      pc_count: data.pc_count,
      branch_count: data.branch_count || null,
      region: data.region || null,
      current_security: data.current_security || null,
      contact_time: data.contact_time || null,
      inquiry: data.inquiry || null,
      privacy_agreed: data.privacy_agreed,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_term: data.utm_term || null,
      utm_content: data.utm_content || null,
      landing_page: data.landing_page || null,
      referrer: data.referrer || null,
      device: data.device || null,
      query_params: data.query_params ?? {},
    };

    const { error } = await supabase.from("leads").insert(insertPayload);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            error: "이미 접수된 요청입니다. 잠시 후 다시 시도해주세요.",
          },
          { status: 409 },
        );
      }

      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      lead_id: data.lead_id,
    });
  } catch (error) {
    console.error("POST /api/leads error:", error);

    const message =
      error instanceof Error && error.message.includes("SUPABASE")
        ? "서버 설정이 완료되지 않았습니다. 관리자에게 문의해주세요."
        : "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
