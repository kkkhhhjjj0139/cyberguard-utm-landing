"use client";

import { trackHeroCtaClick } from "@/lib/analytics";

const PRODUCTS = [
  {
    name: "UTM 90",
    size: "PC 약 10~30대",
    targets: "소규모 사무실, 매장, 의원, 학원",
  },
  {
    name: "UTM 200",
    size: "PC 약 30~50대",
    targets: "성장 중인 중소기업, 제조 사업장",
  },
  {
    name: "UTM 300S",
    size: "PC 약 50~100대",
    targets: "중규모 사업장, 본사, 다수의 업무 시스템을 운영하는 기업",
  },
] as const;

export default function ProductRecommendation() {
  return (
    <section id="products" className="bg-[#F0F5FA] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          회사 규모에 맞는 UTM 구성
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <article
              key={product.name}
              className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                {product.name}
              </h3>
              <dl className="mt-4 flex-1 space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-slate-500">권장 규모</dt>
                  <dd className="mt-1 font-semibold text-[#0B1F3A]">
                    {product.size}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">추천 대상</dt>
                  <dd className="mt-1 leading-relaxed text-slate-700">
                    {product.targets}
                  </dd>
                </div>
              </dl>
              <a
                href="#lead-form"
                onClick={() =>
                  trackHeroCtaClick(`product_${product.name}_quote`)
                }
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[#E85D04] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D45103]"
              >
                맞춤 견적 문의
              </a>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed text-slate-500">
          실제 적합한 모델은 회선 속도, 동시 접속자 수, 지점 수와 네트워크
          환경에 따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
