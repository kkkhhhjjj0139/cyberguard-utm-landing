# 사이버가드 UTM 광고 랜딩페이지 MVP

네이버·구글 검색광고 유입 중소기업 담당자를 대상으로 **무료 보안 상담 / 맞춤 견적 / 전화 상담** 전환을 목표로 하는 Next.js 랜딩페이지입니다.

## 기술 스택

- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- React Hook Form + Zod
- Lucide React
- Supabase (서버 API Route 경유 저장)
- GTM `dataLayer` 이벤트
- Vercel 배포 기준

## 설치 방법

```bash
npm install
```

## 실행 방법

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 환경변수 설정

`.env.example`을 복사해 `.env.local`을 만듭니다.

```bash
cp .env.example .env.local
```

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 사이트 절대 URL (SEO/sitemap용) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager 컨테이너 ID (예: `GTM-XXXX`) |
| `SUPABASE_URL` | Supabase 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (**서버 전용, 클라이언트 노출 금지**) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile 사이트 키 (선택) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile 시크릿 (선택, 설정 시 서버 검증 활성) |

Turnstile 키를 비워 두면 Turnstile 검증은 건너뜁니다.

## Supabase 테이블 생성 방법

1. Supabase 대시보드 → SQL Editor 이동
2. `supabase/leads.sql` 내용 실행
3. Table Editor에서 `leads` 테이블 생성 확인
4. `.env.local`에 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 입력

클라이언트에서 Supabase에 직접 쓰지 않으며, 반드시 `POST /api/leads` 를 통해 저장합니다.

## 사업자 정보 / 전화번호 수정 위치

모든 운영 정보는 아래 파일에서 수정합니다.

```text
src/config/site.ts
```

- 상호, 대표자, 사업자등록번호, 주소
- 전화번호 (`phone`) → 헤더/히어로/모바일 CTA/푸터 전화 링크에 반영
- 이메일, 상담 시간, 개인정보 담당자, 보유 기간

실제 운영 정보가 준비되기 전에는 placeholder 문구를 유지하세요. 임의 사업자 정보를 넣지 마세요.

## GTM ID 설정 위치

`.env.local`의 `NEXT_PUBLIC_GTM_ID`에 설정합니다.

구현된 `dataLayer` 이벤트:

- `page_view`
- `hero_cta_click`
- `phone_click`
- `form_start`
- `form_submit`
- `generate_lead` (Supabase 저장 성공 후 1회, `lead_id` 포함)
- `scroll_50` / `scroll_90`
- `faq_open`

`/thank-you` 새로고침 시 `generate_lead`는 재발화되지 않습니다.

## Vercel 배포 방법

이 프로젝트는 **Render** 배포를 사용합니다. Vercel은 사용하지 않습니다.

## Render 배포 방법

1. GitHub 저장소: https://github.com/kkkhhhjjj0139/cyberguard-utm-landing
2. Blueprint 연결: https://dashboard.render.com/blueprint/new?repo=https://github.com/kkkhhhjjj0139/cyberguard-utm-landing
3. Dashboard에서 secret 환경변수 입력
   - `NEXT_PUBLIC_SITE_URL` (배포 후 실제 URL로 재설정 권장)
   - `NEXT_PUBLIC_GTM_ID` (선택)
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - Turnstile 키 (선택)
4. Apply 후 배포 완료까지 대기
5. 헬스체크: `https://<서비스명>.onrender.com/api/health`

`render.yaml`이 저장소 루트에 포함되어 있으며, `main` 푸시 시 자동 배포됩니다.

## (참고) 이전 문서의 Vercel 안내

아래는 초기 스펙 참고용이며, 실제 배포는 Render만 사용합니다.

## 폼 테스트 방법

1. `npm run dev` 실행
2. 히어로 간편 폼 또는 하단 상세 폼 작성
3. 필수값 누락 / 동의 미체크 시 오류 메시지 확인
4. 정상 제출 시 `/thank-you` 이동 확인
5. Supabase `leads` 테이블에 row 삽입 확인
6. 같은 세션에서 재제출 시 제한 메시지 확인
7. 저장 실패(잘못된 Supabase 키 등) 시 입력값 유지 확인

## UTM 데이터 확인 방법

테스트 URL 예시:

```text
http://localhost:3000/?utm_source=naver&utm_medium=cpc&utm_campaign=cyberguard&utm_term=utm&utm_content=ad1&gclid=test123
```

1. 페이지 진입 시 `sessionStorage` 키 `cyberguard_utm_data`에 UTM/쿼리 저장
2. 다른 섹션 이동·새로고침 후에도 값 유지
3. 폼 제출 후 Supabase row의 `utm_*`, `query_params`, `landing_page`, `referrer`, `device` 컬럼 확인

## 주요 경로

| 경로 | 설명 |
|------|------|
| `/` | 랜딩페이지 |
| `/thank-you` | 상담 신청 완료 |
| `/privacy` | 개인정보처리방침 |
| `/api/leads` | 리드 저장 API |

## 프로젝트 구조

```text
src/
├─ app/
│  ├─ api/leads/route.ts
│  ├─ privacy/page.tsx
│  ├─ thank-you/page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
├─ config/site.ts
├─ lib/
└─ types/lead.ts
```
