"use client";

import {
  Building2,
  Headphones,
  Network,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackHeroCtaClick, trackPhoneClick } from "@/lib/analytics";
import LeadForm from "@/components/LeadForm";

const TRUST_POINTS = [
  { icon: Building2, label: "기업 규모별 맞춤 설계" },
  { icon: Network, label: "통합 네트워크 보안" },
  { icon: Headphones, label: "설치 및 기술 지원" },
  { icon: ShieldCheck, label: "무료 상담 및 견적" },
] as const;

export default function Hero() {
  const phoneHref = `tel:${siteConfig.phone.replace(/-/g, "")}`;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#0B1F3A] pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(27,79,138,0.45), transparent), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(232,93,4,0.12), transparent), linear-gradient(180deg, transparent 0%, rgba(11,31,58,0.3) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8">
        <div className="animate-fade-up">
          <p className="mb-4 inline-block text-xs font-semibold tracking-wide text-[#7EB6E8] sm:text-sm">
            중소·중견기업을 위한 통합 네트워크 보안
          </p>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
            해킹·랜섬웨어 위협,
            <br />
            사이버가드 UTM 하나로 대비하세요
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            방화벽, IPS, VPN 등 기업 네트워크에 필요한 보안 기능을 통합하고
            회사 규모와 네트워크 환경에 맞는 보안 구성을 제안해드립니다.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm text-slate-200"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-[#7EB6E8]">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#lead-form"
              onClick={() => trackHeroCtaClick("hero_free_consult")}
              className="inline-flex items-center justify-center rounded-md bg-[#E85D04] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45103]"
            >
              무료 보안 상담 신청
            </a>
            <a
              href={phoneHref}
              onClick={() => trackPhoneClick("hero")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              전화로 바로 상담
            </a>
          </div>
        </div>

        <div className="animate-fade-up-delay rounded-xl border border-white/10 bg-white p-5 shadow-2xl shadow-black/20 sm:p-6 lg:p-7">
          <LeadForm variant="hero" />
        </div>
      </div>
    </section>
  );
}
