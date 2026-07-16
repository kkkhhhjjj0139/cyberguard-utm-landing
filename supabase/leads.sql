-- 사이버가드 UTM 랜딩페이지 leads 테이블
-- Supabase SQL Editor에서 실행하세요.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  lead_id text unique not null,
  company_name text not null,
  manager_name text not null,
  phone text not null,
  email text,
  industry text,
  pc_count text,
  branch_count text,
  region text,
  current_security text,
  contact_time text,
  inquiry text,
  privacy_agreed boolean not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_page text,
  referrer text,
  device text,
  query_params jsonb,
  created_at timestamptz default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_utm_source_idx on leads (utm_source);

-- 서버(Service Role)에서만 접근하도록 RLS 활성화
alter table leads enable row level security;

-- 익명/인증 클라이언트 직접 접근 차단 (정책 미생성)
-- API Route의 SUPABASE_SERVICE_ROLE_KEY로만 insert 합니다.
