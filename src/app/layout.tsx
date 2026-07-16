import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import GtmScript, { GtmNoscript } from "@/components/GtmScript";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "기업 네트워크 보안 상담 | 사이버가드 UTM",
  description:
    "방화벽, IPS, VPN 등 기업 네트워크 보안 기능을 통합한 사이버가드 UTM 상담 페이지입니다. 기업 규모와 환경에 맞는 보안 구성과 견적을 안내합니다.",
  openGraph: {
    title: "기업 네트워크 보안 상담 | 사이버가드 UTM",
    description:
      "방화벽, IPS, VPN 등 기업 네트워크 보안 기능을 통합한 사이버가드 UTM 상담 페이지입니다. 기업 규모와 환경에 맞는 보안 구성과 견적을 안내합니다.",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="ko">
      <head>
        <JsonLd />
      </head>
      <body className={`${notoSansKr.variable} antialiased`}>
        <GtmNoscript gtmId={gtmId} />
        <GtmScript gtmId={gtmId} />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
