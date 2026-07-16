import type { LucideIcon } from "lucide-react";
import { Headphones, Layers, Settings2, Wrench } from "lucide-react";

const BENEFITS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Layers,
    title: "통합 네트워크 보안",
    description:
      "여러 보안 기능을 하나의 장비로 구성해 관리 복잡도를 줄입니다.",
  },
  {
    icon: Settings2,
    title: "기업별 맞춤 구성",
    description:
      "직원 수, PC 수, 인터넷 회선과 사업장 환경을 확인해 적합한 구성을 제안합니다.",
  },
  {
    icon: Headphones,
    title: "전문 기술 지원",
    description:
      "별도 보안 담당자가 없는 기업도 설치와 운영 관련 지원을 받을 수 있습니다.",
  },
  {
    icon: Wrench,
    title: "구축 및 운영 부담 완화",
    description:
      "여러 개의 보안 제품을 개별적으로 구축하고 관리하는 부담을 줄일 수 있습니다.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          사이버가드 UTM이 필요한 이유
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="flex gap-4 rounded-lg bg-[#F5F8FC] p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#0B1F3A] text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
