type DataLayerEvent = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function pushToDataLayer(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackPageView(pagePath?: string): void {
  pushToDataLayer({
    event: "page_view",
    page_path: pagePath ?? window.location.pathname,
  });
}

export function trackHeroCtaClick(ctaLabel: string): void {
  pushToDataLayer({
    event: "hero_cta_click",
    cta_label: ctaLabel,
  });
}

export function trackPhoneClick(location: string): void {
  pushToDataLayer({
    event: "phone_click",
    click_location: location,
  });
}

export function trackFormStart(formLocation: "hero" | "detail"): void {
  pushToDataLayer({
    event: "form_start",
    form_location: formLocation,
  });
}

export function trackFormSubmit(formLocation: "hero" | "detail"): void {
  pushToDataLayer({
    event: "form_submit",
    form_location: formLocation,
  });
}

const GENERATE_LEAD_FLAG = "cyberguard_generate_lead_fired";

export function trackGenerateLead(
  leadId: string,
  formLocation: "hero" | "detail",
): void {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(GENERATE_LEAD_FLAG) === leadId) return;
    sessionStorage.setItem(GENERATE_LEAD_FLAG, leadId);
  } catch {
    // sessionStorage 사용 불가 시에도 이벤트는 1회 시도
  }

  pushToDataLayer({
    event: "generate_lead",
    lead_id: leadId,
    form_location: formLocation,
  });
}

export function trackScrollDepth(percent: 50 | 90): void {
  pushToDataLayer({
    event: `scroll_${percent}`,
    scroll_percent: percent,
  });
}

export function trackFaqOpen(question: string): void {
  pushToDataLayer({
    event: "faq_open",
    faq_question: question,
  });
}
