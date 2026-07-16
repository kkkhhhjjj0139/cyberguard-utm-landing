import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#071526] pb-24 pt-12 text-slate-300 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">
              {siteConfig.logoText}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {siteConfig.partnerDescription}
            </p>
          </div>

          <div className="text-sm leading-relaxed">
            <p className="font-semibold text-white">운영 정보</p>
            <ul className="mt-3 space-y-1.5 text-slate-400">
              <li>{siteConfig.companyName}</li>
              <li>대표: {siteConfig.representative}</li>
              <li>사업자등록번호: {siteConfig.businessNumber}</li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>

          <div className="text-sm leading-relaxed">
            <p className="font-semibold text-white">상담 안내</p>
            <ul className="mt-3 space-y-1.5 text-slate-400">
              <li>전화: {siteConfig.phone}</li>
              <li>이메일: {siteConfig.email}</li>
              <li>상담 시간: {siteConfig.consultationHours}</li>
              <li>{siteConfig.serviceArea}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.serviceName}. All rights
            reserved.
          </p>
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-slate-300"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
}
