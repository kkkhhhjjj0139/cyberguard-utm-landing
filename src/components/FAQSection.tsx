"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { trackFaqOpen } from "@/lib/analytics";

const FAQS = [
  {
    question: "UTM은 일반 공유기와 무엇이 다른가요?",
    answer:
      "일반 공유기는 인터넷 연결과 기본 네트워크 기능을 중심으로 제공하지만, UTM은 방화벽, IPS, VPN 등 기업용 네트워크 보안 기능을 통합 제공합니다.",
  },
  {
    question: "별도 보안 담당자가 없어도 사용할 수 있나요?",
    answer:
      "기업 네트워크 환경 확인과 설치, 운영 관련 기술 지원을 포함한 방식으로 상담할 수 있습니다.",
  },
  {
    question: "직원이 적은 회사도 UTM이 필요한가요?",
    answer:
      "직원 수만으로 판단하지 않으며, 개인정보, 업무자료, 서버, NAS, ERP와 원격접속 환경 등을 함께 확인해야 합니다.",
  },
  {
    question: "기존 인터넷 회선을 변경해야 하나요?",
    answer:
      "현재 인터넷 회선과 네트워크 구조를 먼저 확인한 후 설치 가능 여부와 적합한 구성을 안내합니다.",
  },
  {
    question: "상담과 견적에 비용이 발생하나요?",
    answer: "초기 상담과 견적 안내는 무료로 진행됩니다.",
  },
  {
    question: "설치 비용과 월 이용료는 얼마인가요?",
    answer:
      "PC 수, 회선 속도, 사업장과 지점 수, 필요한 보안 기능에 따라 달라지므로 상담 후 맞춤 견적을 안내합니다.",
  },
] as const;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number, question: string) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    if (next !== null) {
      trackFaqOpen(question);
    }
  };

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          자주 묻는 질문
        </h2>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index, faq.question)}
                >
                  <span className="text-base font-semibold text-[#0B1F3A]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen ? (
                  <p className="pb-5 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
