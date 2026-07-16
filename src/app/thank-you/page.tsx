"use client";

import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackPhoneClick } from "@/lib/analytics";
import { getSessionLeadId } from "@/lib/utm";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);
  const phoneHref = `tel:${siteConfig.phone.replace(/-/g, "")}`;

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const leadId =
      searchParams.get("lead_id") || getSessionLeadId() || undefined;

    // generate_lead는 폼 제출 성공 시점에만 발화.
    // thank-you 새로고침 시 중복 발화를 막기 위해 여기서는 재발화하지 않음.
    if (leadId && typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path: "/thank-you",
        lead_id: leadId,
      });
    }
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5FA] px-4 py-16">
      <div className="w-full max-w-lg border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-[#1B4F8A]" />
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          상담 신청이 정상적으로 접수되었습니다
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          담당자가 신청 내용을 확인한 후 입력하신 연락처로 안내드리겠습니다.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[#0B1F3A] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#132a4a]"
          >
            메인으로 돌아가기
          </Link>
          <a
            href={phoneHref}
            onClick={() => trackPhoneClick("thank_you")}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0B1F3A] px-5 py-3.5 text-sm font-semibold text-[#0B1F3A] transition hover:bg-[#F5F8FC]"
          >
            <Phone className="h-4 w-4" />
            전화로 바로 상담
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          상담 시간: {siteConfig.consultationHours}
        </p>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F0F5FA]">
          <p className="text-slate-600">불러오는 중...</p>
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
