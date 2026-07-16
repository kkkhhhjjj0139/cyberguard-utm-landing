"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackHeroCtaClick, trackPhoneClick } from "@/lib/analytics";

const NAV_ITEMS = [
  { href: "#service", label: "서비스 소개" },
  { href: "#benefits", label: "주요 기능" },
  { href: "#process", label: "도입 절차" },
  { href: "#faq", label: "FAQ" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phoneHref = `tel:${siteConfig.phone.replace(/-/g, "")}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0B1F3A]/95 shadow-lg backdrop-blur-md"
          : "bg-[#0B1F3A]/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <a href="#top" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="text-base font-bold tracking-tight text-white sm:text-lg">
            {siteConfig.logoText}
          </span>
          <span className="text-[11px] text-slate-300 sm:text-xs">
            기업 네트워크 보안
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium text-slate-200 transition hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={phoneHref}
            onClick={() => trackPhoneClick("header")}
            className="inline-flex items-center gap-1.5 text-sm text-slate-200 transition hover:text-white"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <a
            href="#lead-form"
            onClick={() => trackHeroCtaClick("header_free_consult")}
            className="inline-flex items-center justify-center rounded-md bg-[#E85D04] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D45103]"
          >
            무료 상담 신청
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0B1F3A] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className="rounded-md px-3 py-3 text-left text-sm font-medium text-slate-100 hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
            <a
              href={phoneHref}
              onClick={() => {
                trackPhoneClick("header_mobile");
                setOpen(false);
              }}
              className="rounded-md px-3 py-3 text-sm font-medium text-slate-100 hover:bg-white/5"
            >
              전화 상담 {siteConfig.phone}
            </a>
            <a
              href="#lead-form"
              onClick={() => {
                trackHeroCtaClick("header_mobile_free_consult");
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-[#E85D04] px-4 py-3 text-sm font-semibold text-white"
            >
              무료 상담 신청
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
