export type LeadPayload = {
  lead_id: string;
  company_name: string;
  manager_name: string;
  phone: string;
  email?: string;
  industry?: string;
  pc_count: string;
  branch_count?: string;
  region?: string;
  current_security?: string;
  contact_time?: string;
  inquiry?: string;
  privacy_agreed: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  device?: string;
  query_params?: Record<string, string>;
  form_location?: "hero" | "detail";
  turnstile_token?: string;
};

export type LeadApiResponse = {
  success: boolean;
  lead_id?: string;
  error?: string;
};

export const PC_COUNT_OPTIONS = [
  "10대 미만",
  "10~30대",
  "31~50대",
  "51~100대",
  "100대 이상",
  "잘 모르겠음",
] as const;

export const CONTACT_TIME_OPTIONS = [
  "오전 9시~12시",
  "오후 12시~3시",
  "오후 3시~6시",
  "시간 무관",
] as const;

export const INDUSTRY_OPTIONS = [
  "제조업",
  "병원 및 의료기관",
  "학원 및 교육기관",
  "일반 기업 및 전문서비스",
  "기타",
] as const;
