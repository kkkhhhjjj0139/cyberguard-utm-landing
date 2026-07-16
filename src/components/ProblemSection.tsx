import { AlertTriangle, Lock, ShieldOff, UserX } from "lucide-react";

const PROBLEMS = [
  {
    icon: ShieldOff,
    title: "외부 해킹 시도",
    description:
      "비정상적인 접근과 외부 공격을 일반 네트워크 장비만으로 구분하기 어렵습니다.",
  },
  {
    icon: AlertTriangle,
    title: "랜섬웨어 내부 확산",
    description:
      "한 대의 PC에서 발생한 감염이 사내 네트워크 전체로 확산될 수 있습니다.",
  },
  {
    icon: Lock,
    title: "안전하지 않은 원격 접속",
    description:
      "재택근무와 외부 접속 과정에서 업무 시스템과 중요 정보가 노출될 수 있습니다.",
  },
  {
    icon: UserX,
    title: "보안 담당자 부재",
    description:
      "별도 보안 인력 없이 네트워크 정책과 보안 이벤트를 직접 관리하기 어렵습니다.",
  },
] as const;

export default function ProblemSection() {
  return (
    <section className="bg-white py-16 sm:py-20" id="problem">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          우리 회사 네트워크,
          <br className="sm:hidden" /> 아직 일반 공유기에만 맡기고 있나요?
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="border-l-2 border-[#E85D04] bg-[#F5F8FC] px-5 py-6"
            >
              <Icon className="mb-4 h-6 w-6 text-[#E85D04]" />
              <h3 className="text-base font-bold text-[#0B1F3A]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-base font-semibold text-[#0B1F3A] sm:text-lg">
          하나라도 해당된다면 기업 네트워크 보안 점검이 필요합니다.
        </p>
      </div>
    </section>
  );
}
