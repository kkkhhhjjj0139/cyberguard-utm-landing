"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  detailLeadSchema,
  formatPhoneNumber,
  heroLeadSchema,
  type DetailLeadFormValues,
  type HeroLeadFormValues,
} from "@/lib/validation";
import {
  trackFormStart,
  trackFormSubmit,
  trackGenerateLead,
} from "@/lib/analytics";
import {
  captureUtmFromUrl,
  createLeadId,
  getDeviceType,
  getStoredUtmData,
  hasSubmittedInSession,
  markSubmittedInSession,
} from "@/lib/utm";
import {
  CONTACT_TIME_OPTIONS,
  INDUSTRY_OPTIONS,
  PC_COUNT_OPTIONS,
  type LeadApiResponse,
} from "@/types/lead";

type LeadFormProps = {
  variant: "hero" | "detail";
  className?: string;
};

type FormValues = HeroLeadFormValues & Partial<DetailLeadFormValues>;

export default function LeadForm({ variant, className = "" }: LeadFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sessionBlocked, setSessionBlocked] = useState(false);
  const startedRef = useRef(false);
  const submittingRef = useRef(false);

  const isHero = variant === "hero";
  const schema = isHero ? heroLeadSchema : detailLeadSchema;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_name: "",
      manager_name: "",
      phone: "",
      pc_count: undefined,
      privacy_agreed: false,
      email: "",
      industry: undefined,
      branch_count: "",
      region: "",
      current_security: "",
      contact_time: "",
      inquiry: "",
    },
  });

  const phoneValue = watch("phone");

  useEffect(() => {
    setSessionBlocked(hasSubmittedInSession());
    captureUtmFromUrl();
  }, []);

  const markFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackFormStart(variant);
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    markFormStart();
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    if (submittingRef.current) return;
    if (hasSubmittedInSession()) {
      setSessionBlocked(true);
      setSubmitError("이미 상담 신청이 접수되었습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    submittingRef.current = true;
    setSubmitError(null);
    trackFormSubmit(variant);

    const utm = getStoredUtmData() ?? captureUtmFromUrl();
    const leadId = createLeadId();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          company_name: data.company_name,
          manager_name: data.manager_name,
          phone: data.phone,
          email: data.email || null,
          industry: data.industry || null,
          pc_count: data.pc_count,
          branch_count: data.branch_count || null,
          region: data.region || null,
          current_security: data.current_security || null,
          contact_time: data.contact_time || null,
          inquiry: data.inquiry || null,
          privacy_agreed: data.privacy_agreed,
          utm_source: utm?.utm_source ?? null,
          utm_medium: utm?.utm_medium ?? null,
          utm_campaign: utm?.utm_campaign ?? null,
          utm_term: utm?.utm_term ?? null,
          utm_content: utm?.utm_content ?? null,
          landing_page:
            utm?.landing_page ??
            `${window.location.pathname}${window.location.search}`,
          referrer: utm?.referrer ?? document.referrer ?? null,
          device: getDeviceType(),
          query_params: utm?.query_params ?? {},
          form_location: variant,
        }),
      });

      const result = (await response.json()) as LeadApiResponse;

      if (!response.ok || !result.success) {
        setSubmitError(
          result.error ?? "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        );
        return;
      }

      const savedLeadId = result.lead_id ?? leadId;
      markSubmittedInSession(savedLeadId);
      trackGenerateLead(savedLeadId, variant);
      router.push(`/thank-you?lead_id=${encodeURIComponent(savedLeadId)}`);
    } catch {
      setSubmitError(
        "네트워크 오류가 발생했습니다. 입력하신 내용은 유지됩니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      submittingRef.current = false;
    }
  };

  const fieldClass =
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0B1F3A] outline-none transition placeholder:text-slate-400 focus:border-[#1B4F8A] focus:ring-2 focus:ring-[#1B4F8A]/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#0B1F3A]";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={markFormStart}
      className={className}
      noValidate
    >
      {isHero ? (
        <div className="mb-5">
          <h3 className="text-lg font-bold text-[#0B1F3A] sm:text-xl">
            우리 회사에 맞는 UTM 확인하기
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            기업 환경을 간단히 남겨주시면 담당자가 확인 후 안내드립니다.
          </p>
        </div>
      ) : null}

      {sessionBlocked ? (
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          이미 이 세션에서 상담 신청이 접수되었습니다.
        </div>
      ) : null}

      <div className={`grid gap-4 ${isHero ? "" : "sm:grid-cols-2"}`}>
        <div className={isHero ? "" : undefined}>
          <label htmlFor={`${variant}-company`} className={labelClass}>
            회사명 <span className="text-[#E85D04]">*</span>
          </label>
          <input
            id={`${variant}-company`}
            type="text"
            autoComplete="organization"
            className={fieldClass}
            placeholder="예: OO테크"
            {...register("company_name")}
          />
          {errors.company_name ? (
            <p className={errorClass}>{errors.company_name.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${variant}-manager`} className={labelClass}>
            담당자명 <span className="text-[#E85D04]">*</span>
          </label>
          <input
            id={`${variant}-manager`}
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder="예: 홍길동"
            {...register("manager_name")}
          />
          {errors.manager_name ? (
            <p className={errorClass}>{errors.manager_name.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${variant}-phone`} className={labelClass}>
            연락처 <span className="text-[#E85D04]">*</span>
          </label>
          <input
            id={`${variant}-phone`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            className={fieldClass}
            placeholder="010-0000-0000"
            {...register("phone")}
            value={phoneValue ?? ""}
            onChange={onPhoneChange}
          />
          {errors.phone ? (
            <p className={errorClass}>{errors.phone.message}</p>
          ) : null}
        </div>

        {!isHero ? (
          <div>
            <label htmlFor={`${variant}-email`} className={labelClass}>
              이메일
            </label>
            <input
              id={`${variant}-email`}
              type="email"
              autoComplete="email"
              className={fieldClass}
              placeholder="name@company.com"
              {...register("email")}
            />
            {errors.email ? (
              <p className={errorClass}>{errors.email.message}</p>
            ) : null}
          </div>
        ) : null}

        {!isHero ? (
          <div>
            <label htmlFor={`${variant}-industry`} className={labelClass}>
              업종 <span className="text-[#E85D04]">*</span>
            </label>
            <select
              id={`${variant}-industry`}
              className={fieldClass}
              defaultValue=""
              {...register("industry")}
            >
              <option value="" disabled>
                업종 선택
              </option>
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.industry ? (
              <p className={errorClass}>{errors.industry.message}</p>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor={`${variant}-pc`} className={labelClass}>
            PC 수 <span className="text-[#E85D04]">*</span>
          </label>
          <select
            id={`${variant}-pc`}
            className={fieldClass}
            defaultValue=""
            {...register("pc_count")}
          >
            <option value="" disabled>
              PC 수 선택
            </option>
            {PC_COUNT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.pc_count ? (
            <p className={errorClass}>{errors.pc_count.message}</p>
          ) : null}
        </div>

        {!isHero ? (
          <>
            <div>
              <label htmlFor={`${variant}-region`} className={labelClass}>
                지역
              </label>
              <input
                id={`${variant}-region`}
                type="text"
                className={fieldClass}
                placeholder="예: 서울 강남구"
                {...register("region")}
              />
            </div>

            <div>
              <label htmlFor={`${variant}-branch`} className={labelClass}>
                사업장 또는 지점 수
              </label>
              <input
                id={`${variant}-branch`}
                type="text"
                className={fieldClass}
                placeholder="예: 본사 1곳 / 지점 2곳"
                {...register("branch_count")}
              />
            </div>

            <div>
              <label htmlFor={`${variant}-security`} className={labelClass}>
                현재 사용 중인 보안 장비
              </label>
              <input
                id={`${variant}-security`}
                type="text"
                className={fieldClass}
                placeholder="예: 공유기만 사용 / 기존 방화벽"
                {...register("current_security")}
              />
            </div>

            <div>
              <label htmlFor={`${variant}-time`} className={labelClass}>
                연락 가능 시간
              </label>
              <select
                id={`${variant}-time`}
                className={fieldClass}
                defaultValue=""
                {...register("contact_time")}
              >
                <option value="">선택 (선택 사항)</option>
                {CONTACT_TIME_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`${variant}-inquiry`} className={labelClass}>
                문의 내용
              </label>
              <textarea
                id={`${variant}-inquiry`}
                rows={4}
                className={`${fieldClass} resize-y`}
                placeholder="현재 네트워크 환경이나 궁금하신 점을 남겨주세요."
                {...register("inquiry")}
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-4">
        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#E85D04] focus:ring-[#E85D04]"
            {...register("privacy_agreed")}
          />
          <span>
            <span className="text-[#E85D04]">*</span> 개인정보 수집 및 이용에
            동의합니다.{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="underline underline-offset-2 hover:text-[#0B1F3A]"
            >
              개인정보처리방침 보기
            </Link>
          </span>
        </label>
        {errors.privacy_agreed ? (
          <p className={errorClass}>{errors.privacy_agreed.message}</p>
        ) : null}
      </div>

      {submitError ? (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting || sessionBlocked}
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-[#E85D04] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45103] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "접수 중..." : "무료 상담 신청하기"}
      </button>
    </form>
  );
}
