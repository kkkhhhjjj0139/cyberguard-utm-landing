import { z } from "zod";
import { INDUSTRY_OPTIONS, PC_COUNT_OPTIONS } from "@/types/lead";

const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;

export const heroLeadSchema = z.object({
  company_name: z.string().min(1, "회사명을 입력해주세요."),
  manager_name: z.string().min(1, "담당자명을 입력해주세요."),
  phone: z
    .string()
    .min(1, "연락처를 입력해주세요.")
    .refine((value) => phoneRegex.test(value.replace(/\s/g, "")), {
      message: "올바른 휴대폰 번호를 입력해주세요.",
    }),
  pc_count: z.enum(PC_COUNT_OPTIONS, {
    errorMap: () => ({ message: "PC 수를 선택해주세요." }),
  }),
  privacy_agreed: z.boolean().refine((value) => value === true, {
    message: "개인정보 수집 및 이용에 동의해주세요.",
  }),
});

export const detailLeadSchema = z.object({
  company_name: z.string().min(1, "회사명을 입력해주세요."),
  manager_name: z.string().min(1, "담당자명을 입력해주세요."),
  phone: z
    .string()
    .min(1, "연락처를 입력해주세요.")
    .refine((value) => phoneRegex.test(value.replace(/\s/g, "")), {
      message: "올바른 휴대폰 번호를 입력해주세요.",
    }),
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "올바른 이메일을 입력해주세요.",
    })
    .optional(),
  industry: z.enum(INDUSTRY_OPTIONS, {
    errorMap: () => ({ message: "업종을 선택해주세요." }),
  }),
  pc_count: z.enum(PC_COUNT_OPTIONS, {
    errorMap: () => ({ message: "PC 수를 선택해주세요." }),
  }),
  branch_count: z.string().optional(),
  region: z.string().optional(),
  current_security: z.string().optional(),
  contact_time: z.string().optional(),
  inquiry: z.string().optional(),
  privacy_agreed: z.boolean().refine((value) => value === true, {
    message: "개인정보 수집 및 이용에 동의해주세요.",
  }),
});

export const leadApiSchema = z.object({
  lead_id: z.string().uuid("유효하지 않은 lead_id입니다."),
  company_name: z.string().min(1),
  manager_name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  pc_count: z.string().min(1),
  branch_count: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  current_security: z.string().optional().nullable(),
  contact_time: z.string().optional().nullable(),
  inquiry: z.string().optional().nullable(),
  privacy_agreed: z.boolean().refine((value) => value === true),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  landing_page: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
  device: z.string().optional().nullable(),
  query_params: z.record(z.string()).optional().nullable(),
  form_location: z.enum(["hero", "detail"]).optional(),
  turnstile_token: z.string().optional().nullable(),
});

export type HeroLeadFormValues = z.infer<typeof heroLeadSchema>;
export type DetailLeadFormValues = z.infer<typeof detailLeadSchema>;
export type LeadApiValues = z.infer<typeof leadApiSchema>;

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  if (digits.length <= 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function normalizePhoneNumber(value: string): string {
  return formatPhoneNumber(value);
}
