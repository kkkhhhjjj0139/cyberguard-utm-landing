import { Briefcase, Factory, GraduationCap, Stethoscope } from "lucide-react";

const INDUSTRIES = [
  {
    icon: Factory,
    title: "제조업",
    description: "설계도면, 생산정보, 협력사 자료와 내부 시스템 보호",
  },
  {
    icon: Stethoscope,
    title: "병원 및 의료기관",
    description: "환자 정보, 진료 시스템과 내부 네트워크 보호",
  },
  {
    icon: GraduationCap,
    title: "학원 및 교육기관",
    description: "학생 개인정보, 행정 시스템과 교육용 네트워크 보호",
  },
  {
    icon: Briefcase,
    title: "일반 기업 및 전문서비스",
    description: "ERP, 회계자료, NAS, 이메일과 중요 업무 데이터 보호",
  },
] as const;

export default function IndustrySection() {
  return (
    <section className="bg-white py-16 sm:py-20" id="industries">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          다양한 업종의 기업 정보와 업무 시스템을 보호합니다
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="border-t-2 border-[#1B4F8A] bg-[#F5F8FC] px-5 py-6"
            >
              <Icon className="mb-3 h-6 w-6 text-[#1B4F8A]" />
              <h3 className="text-base font-bold text-[#0B1F3A]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
