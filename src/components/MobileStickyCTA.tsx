"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackHeroCtaClick, trackPhoneClick } from "@/lib/analytics";

export default function MobileStickyCTA() {
  const phoneHref = `tel:${siteConfig.phone.replace(/-/g, "")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={phoneHref}
          onClick={() => trackPhoneClick("mobile_sticky")}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#0B1F3A] px-3 py-3 text-sm font-semibold text-[#0B1F3A]"
        >
          <Phone className="h-4 w-4" />
          전화 상담
        </a>
        <a
          href="#lead-form"
          onClick={() => trackHeroCtaClick("mobile_sticky_quote")}
          className="inline-flex flex-1 items-center justify-center rounded-md bg-[#E85D04] px-3 py-3 text-sm font-bold text-white"
        >
          무료 견적 신청
        </a>
      </div>
    </div>
  );
}
