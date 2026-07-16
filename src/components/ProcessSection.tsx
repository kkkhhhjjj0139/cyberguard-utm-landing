"use client";

import { trackHeroCtaClick } from "@/lib/analytics";

const STEPS = [
  {
    step: "01",
    title: "상담 신청",
    description: "기업 정보와 연락처를 남겨주세요.",
  },
  {
    step: "02",
    title: "환경 확인",
    description:
      "PC 수, 인터넷 회선, 지점과 현재 네트워크 환경을 확인합니다.",
  },
  {
    step: "03",
    title: "구성 및 견적 제안",
    description: "기업 환경에 적합한 UTM 구성과 견적을 안내합니다.",
  },
  {
    step: "04",
    title: "설치 및 운영",
    description: "일정 협의 후 장비 설치와 서비스 운영을 진행합니다.",
  },
] as const;

export default function ProcessSection() {
  return (
    <section id="process" className="bg-[#F0F5FA] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          도입은 간단하게 진행됩니다
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="relative bg-white px-5 py-6 shadow-sm"
            >
              <span className="text-3xl font-bold text-[#E85D04]/25">
                {item.step}
              </span>
              <h3 className="mt-2 text-lg font-bold text-[#0B1F3A]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-lg bg-[#0B1F3A] px-6 py-8 text-center sm:flex-row sm:text-left">
          <p className="text-lg font-semibold text-white sm:text-xl">
            우리 회사에 맞는 보안 구성이 궁금하신가요?
          </p>
          <a
            href="#lead-form"
            onClick={() => trackHeroCtaClick("process_banner")}
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#E85D04] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45103]"
          >
            무료 보안 상담 신청
          </a>
        </div>
      </div>
    </section>
  );
}
