const UTM_STORAGE_KEY = "cyberguard_utm_data";
const SESSION_SUBMITTED_KEY = "cyberguard_lead_submitted";
const LEAD_ID_KEY = "cyberguard_lead_id";

export type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  query_params: Record<string, string>;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function captureUtmFromUrl(): UtmData | null {
  if (!isBrowser()) return null;

  const params = new URLSearchParams(window.location.search);
  const query_params: Record<string, string> = {};

  params.forEach((value, key) => {
    query_params[key] = value;
  });

  const existing = getStoredUtmData();
  const hasNewParams = Object.keys(query_params).length > 0;

  if (!hasNewParams && existing) {
    return existing;
  }

  const next: UtmData = {
    utm_source: query_params.utm_source ?? existing?.utm_source,
    utm_medium: query_params.utm_medium ?? existing?.utm_medium,
    utm_campaign: query_params.utm_campaign ?? existing?.utm_campaign,
    utm_term: query_params.utm_term ?? existing?.utm_term,
    utm_content: query_params.utm_content ?? existing?.utm_content,
    query_params: hasNewParams
      ? { ...(existing?.query_params ?? {}), ...query_params }
      : (existing?.query_params ?? {}),
    landing_page:
      existing?.landing_page ??
      `${window.location.pathname}${window.location.search}`,
    referrer: existing?.referrer ?? (document.referrer || undefined),
    captured_at: existing?.captured_at ?? new Date().toISOString(),
  };

  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getStoredUtmData(): UtmData | null {
  if (!isBrowser()) return null;

  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UtmData;
  } catch {
    return null;
  }
}

export function getDeviceType(): string {
  if (!isBrowser()) return "unknown";

  const ua = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export function hasSubmittedInSession(): boolean {
  if (!isBrowser()) return false;
  return sessionStorage.getItem(SESSION_SUBMITTED_KEY) === "1";
}

export function markSubmittedInSession(leadId: string): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(SESSION_SUBMITTED_KEY, "1");
  sessionStorage.setItem(LEAD_ID_KEY, leadId);
}

export function getSessionLeadId(): string | null {
  if (!isBrowser()) return null;
  return sessionStorage.getItem(LEAD_ID_KEY);
}

export function createLeadId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
