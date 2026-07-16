export const siteConfig = {
  serviceName: "사이버가드 UTM",
  companyName: "운영사명을 입력하세요",
  representative: "대표자명을 입력하세요",
  businessNumber: "사업자등록번호를 입력하세요",
  address: "주소를 입력하세요",
  phone: "000-0000-0000",
  email: "contact@example.com",
  consultationHours: "평일 09:00~18:00",
  serviceArea: "전국 상담 가능",
  partnerDescription:
    "SK쉴더스 사이버가드 서비스 상담 및 안내 페이지입니다.",
  logoText: "사이버가드 UTM",
  privacyManager: "개인정보 보호 담당자",
  privacyRetentionPeriod: "상담 완료 후 3개월",
} as const;

export type SiteConfig = typeof siteConfig;
