import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담 신청 완료 | 사이버가드 UTM",
  description:
    "상담 신청이 정상적으로 접수되었습니다. 담당자가 확인 후 연락드립니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
