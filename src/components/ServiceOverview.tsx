import {
  Database,
  Globe,
  Monitor,
  Server,
  Shield,
} from "lucide-react";

const UTM_FEATURES = [
  "방화벽",
  "침입방지 IPS",
  "VPN",
  "트래픽 제어",
  "네트워크 접근 통제",
] as const;

const INTERNAL_ASSETS = [
  { icon: Monitor, label: "업무용 PC" },
  { icon: Server, label: "서버" },
  { icon: Database, label: "NAS" },
  { icon: Database, label: "ERP" },
  { icon: Monitor, label: "기업 내부 시스템" },
] as const;

export default function ServiceOverview() {
  return (
    <section id="service" className="bg-[#F0F5FA] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            기업 네트워크 보안 기능을 하나로 통합
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            UTM은 기업 내부 네트워크와 외부 인터넷 사이에서
            비정상적인 접근과 위협 트래픽을 탐지하고 차단하는
            통합 네트워크 보안 장비입니다.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex w-full max-w-md items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm">
            <Globe className="h-5 w-5 text-[#1B4F8A]" />
            <span className="font-semibold text-[#0B1F3A]">인터넷</span>
          </div>

          <div className="h-8 w-px bg-[#1B4F8A]/40" aria-hidden />
          <div className="text-[#1B4F8A]" aria-hidden>
            ↓
          </div>

          <div className="w-full max-w-lg rounded-xl border-2 border-[#1B4F8A] bg-[#0B1F3A] px-5 py-6 text-white shadow-lg">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-[#7EB6E8]" />
              <span className="text-lg font-bold">사이버가드 UTM</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {UTM_FEATURES.map((feature) => (
                <span
                  key={feature}
                  className="rounded bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 sm:text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="h-8 w-px bg-[#1B4F8A]/40" aria-hidden />
          <div className="text-[#1B4F8A]" aria-hidden>
            ↓
          </div>

          <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <p className="mb-4 text-center text-sm font-semibold text-[#0B1F3A]">
              기업 내부 네트워크
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {INTERNAL_ASSETS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-md bg-[#F5F8FC] px-2 py-3 text-center"
                >
                  <Icon className="h-5 w-5 text-[#1B4F8A]" />
                  <span className="text-xs font-medium text-slate-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
