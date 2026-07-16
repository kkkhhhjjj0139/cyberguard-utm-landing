import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ServiceOverview from "@/components/ServiceOverview";
import Benefits from "@/components/Benefits";
import ProductRecommendation from "@/components/ProductRecommendation";
import IndustrySection from "@/components/IndustrySection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <ProblemSection />
        <ServiceOverview />
        <Benefits />
        <ProductRecommendation />
        <IndustrySection />
        <ProcessSection />
        <FAQSection />

        <section
          id="lead-form"
          className="scroll-mt-24 bg-[#F0F5FA] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
                무료 보안 상담 및 맞춤 견적 신청
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                기업 환경을 남겨주시면 담당자가 확인 후 순차적으로 연락드립니다.
              </p>
            </div>
            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <LeadForm variant="detail" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
