import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 사이버가드 UTM",
  description: "사이버가드 UTM 상담 페이지 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-slate-200 bg-[#0B1F3A] px-4 py-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-white">
            {siteConfig.logoText}
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-300 underline-offset-2 hover:underline"
          >
            메인으로
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#0B1F3A]">개인정보처리방침</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {siteConfig.companyName}(이하 &quot;회사&quot;)는 사이버가드 UTM 상담
          및 견적 문의 서비스 제공을 위해 아래와 같이 개인정보를 처리합니다.
        </p>

        <section className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              1. 개인정보 수집 목적
            </h2>
            <p className="mt-2">
              회사는 보안 상담 신청, 맞춤 견적 안내, 전화 상담 연결 및 문의
              응대를 위해 개인정보를 수집·이용합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">2. 수집 항목</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                필수 항목: 회사명, 담당자명, 연락처, 업종(상세 폼), PC 수,
                개인정보 수집 및 이용 동의 여부
              </li>
              <li>
                선택 항목: 이메일, 지역, 사업장 또는 지점 수, 현재 사용 중인
                보안 장비, 연락 가능 시간, 문의 내용
              </li>
              <li>
                자동 수집 항목: 유입 경로(UTM), 랜딩페이지 URL, 리퍼러, 접속
                기기 정보, 기타 쿼리 파라미터
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              3. 보유 및 이용 기간
            </h2>
            <p className="mt-2">
              수집된 개인정보는 {siteConfig.privacyRetentionPeriod} 동안
              보유·이용하며, 보유 기간 경과 또는 처리 목적 달성 시 지체 없이
              파기합니다. 관련 법령에 따라 보존이 필요한 경우에는 해당 기간
              동안 보관할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              4. 동의 거부 권리
            </h2>
            <p className="mt-2">
              이용자는 개인정보 수집·이용에 대한 동의를 거부할 수 있습니다.
              다만, 필수 항목에 대한 동의를 거부할 경우 상담 및 견적 신청
              서비스 이용이 제한될 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              5. 개인정보 처리 담당자
            </h2>
            <ul className="mt-2 space-y-1">
              <li>담당자: {siteConfig.privacyManager}</li>
              <li>운영사: {siteConfig.companyName}</li>
              <li>대표자: {siteConfig.representative}</li>
              <li>주소: {siteConfig.address}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">6. 문의처</h2>
            <ul className="mt-2 space-y-1">
              <li>전화: {siteConfig.phone}</li>
              <li>이메일: {siteConfig.email}</li>
              <li>상담 시간: {siteConfig.consultationHours}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">7. 사업자 정보</h2>
            <ul className="mt-2 space-y-1">
              <li>상호: {siteConfig.companyName}</li>
              <li>사업자등록번호: {siteConfig.businessNumber}</li>
              <li>주소: {siteConfig.address}</li>
            </ul>
          </div>
        </section>

        <p className="mt-10 text-xs text-slate-500">
          본 방침은 서비스 운영 정책에 따라 변경될 수 있으며, 변경 시 본
          페이지를 통해 안내합니다.
        </p>
      </article>
    </main>
  );
}
