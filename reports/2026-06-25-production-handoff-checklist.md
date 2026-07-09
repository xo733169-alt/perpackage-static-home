# 페르패키지 홈페이지 운영 반영 준비 인수인계 문서

작성일: 2026-06-25

## 1. 현재 홈페이지 구조 요약

페르패키지 정적 홈페이지는 `perpackage-vercel-public` 폴더를 기준으로 구성되어 있습니다.

현재 구현된 핵심 흐름은 아래와 같습니다.

- 메인 쇼핑몰형 포털: `index.html`
- 카테고리 상품목록: `category.html?category=...`
- 상품 상세페이지: `product.html?category=...&product=...`
- FAQ 독립 페이지: `faq.html`
- 제작가이드/블로그 페이지: `blog.html`
- 견적문의 섹션: `index.html#quote`
- 플러그 iframe 견적문의 폼: `https://www.pluuug.com/form/TrPLMjXdJ1`
- 우측 고정 퀵메뉴: `index.html` 내부 마크업

정적 호스팅 또는 Vercel 배포 시에는 `perpackage-vercel-public` 폴더의 상대경로 구조를 유지하는 것이 가장 안전합니다.

## 2. 주요 페이지 목록

### 운영 반영 핵심 HTML

- `index.html`: 메인 페이지, 포털형 쇼핑몰 UX, 견적문의 iframe, 우측 퀵메뉴
- `category.html`: 공용 카테고리 상품목록, 검색/필터/정렬
- `product.html`: 공용 상품 상세페이지, 선택 상품 정보 포함 견적문의 이동
- `faq.html`: FAQ 검색/필터/아코디언, FAQPage JSON-LD, 견적문의 CTA
- `blog.html`: 제작가이드/블로그 연결 대상

### 선택 운영 페이지

- `equipment.html`: 장비/설비 소개 계열 페이지로 보관되어 있음

`equipment.html`을 실제 운영 메뉴에 노출할지 여부는 별도 결정이 필요합니다.

## 3. 주요 JS/CSS 파일 목록

### 운영 핵심 JS

- `perpackage-main-renewal.js`: 메인 페이지 데이터, 배너, 카테고리, 검색, quoteProduct 안내 처리
- `perpackage-category.js`: 카테고리 데이터, 검색/필터/정렬, URL query 상태 관리
- `perpackage-product.js`: 상품 상세 데이터, breadcrumb, 관련 상품, quoteProduct 이동 처리

### 운영 핵심 CSS

- `perpackage-main-renewal.css`: 메인/카테고리/상품상세/quote/퀵메뉴/FAQ 일부 공통 스타일

### 선택 CSS

- `perpackage-equipment-detail.css`: `equipment.html` 사용 시 필요

## 4. 이미지/아이콘/문서 asset 위치

### 운영에 필요한 주요 asset 폴더

- `assets/brand/`: 페르패키지 로고/워드마크
- `assets/icons/new/`: 상단 메뉴, 퀵메뉴, 프로세스, favicon 대체 아이콘
- `assets/shop-photos/`: 메인/카테고리/상품 카드 대표 사진
- `assets/shop-thumbs/`: 카테고리/목적별 썸네일
- `assets/documents/`: 사업자등록증, 통장사본
- `assets/case-*.png`, `assets/concept-*.png`: 메인 제작사례/포트폴리오 이미지

### 배너/참고 이미지

- `images/banners/`: 초기에 준비한 배너 이미지 4종
- `assets/rolling-banners/`: 롤링 배너 참고 이미지

현재 메인 배너 데이터는 주로 `assets/shop-photos/` 이미지를 사용하고 있습니다. `images/banners/`는 운영에서 바로 쓰지 않더라도 교체용 배너 원본으로 보관하는 것이 좋습니다.

### 문서 파일

- `assets/documents/perpackage-business-registration-2026.pdf`
- `assets/documents/perpackage-bankbook-copy.png`

두 파일은 우측 고정 퀵메뉴에서 새 창 링크로 연결됩니다. 운영 전 공개 범위와 최신 파일 여부를 다시 확인해야 합니다.

## 5. 파일 분류

### 5.1 실제 홈페이지 운영에 필요한 파일

- `index.html`
- `category.html`
- `product.html`
- `faq.html`
- `blog.html`
- `perpackage-main-renewal.js`
- `perpackage-category.js`
- `perpackage-product.js`
- `perpackage-main-renewal.css`
- `assets/brand/`
- `assets/icons/new/`
- `assets/shop-photos/`
- `assets/shop-thumbs/`
- `assets/documents/`
- `assets/case-*.png`
- `assets/concept-*.png`

### 5.2 Vercel 또는 정적 호스팅에 필요한 파일

- `vercel.json`
- 위 운영 핵심 HTML/JS/CSS/assets 전체

현재 `vercel.json` 설정:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

Vercel에 올릴 경우 `perpackage-vercel-public`을 정적 프로젝트 루트로 사용하면 됩니다.

### 5.3 개발/QA 보고서 파일

- `reports/2026-06-23-main-portal-ux-report.md`
- `reports/2026-06-23-pluuug-iframe-quote-report.md`
- `reports/2026-06-24-product-detail-phase2-report.md`
- `reports/2026-06-24-product-flow-qa-seo-gpt-report.md`
- `reports/2026-06-25-faq-page-linking-gpt-report.md`
- `reports/2026-06-25-operational-links-qa-gpt-report.md`
- `reports/2026-06-25-production-handoff-checklist.md`

보고서 파일은 운영 화면에는 필요하지 않지만, 다음 작업자 인수인계를 위해 보관합니다.

### 5.4 Cafe24 적용 시 참고할 수 있는 파일

- `blog.html`
- `faq.html`
- `reports/2026-06-25-faq-page-linking-gpt-report.md`
- `reports/2026-06-25-operational-links-qa-gpt-report.md`
- `assets/cafe24-reference/`

Cafe24에 삽입할 경우 정적 HTML 그대로 쓰기보다, Cafe24 스킨/게시판 구조에 맞춰 URL과 wrapper 범위를 다시 확인해야 합니다.

### 5.5 삭제하면 안 되는 원본/참고 파일

- `assets/notion-upload/`
- `assets/notion-selected/`
- `assets/notion-aligned-reference/`
- `assets/design-team-reference/`
- `assets/before-after-reference/`
- `assets/cafe24-reference/`
- `images/banners/`

위 파일들은 운영 화면에 직접 쓰이지 않을 수 있지만, 디자인 근거와 교체 이미지 원본으로 남기는 것이 좋습니다.

### 5.6 운영에는 직접 필요 없지만 보관할 파일

- `qa-*.png`
- `qa-product-detail/`
- `qa-quick-screenshots/`
- `reports/`
- `.vercel/`
- `.gitignore`

운영 업로드 패키지에서 제외할 수는 있지만, 실제 삭제는 하지 말고 보관합니다.

### 5.7 삭제 후보

삭제하지 않고 후보로만 정리합니다.

- 오래된 QA 스크린샷 중 중복 파일
- 임시 확인용 screenshot 폴더
- 로컬 Vercel 메타데이터인 `.vercel/`

운영 업로드 전에 “배포 패키지에서 제외” 여부만 결정하고, 원본 폴더에서는 삭제하지 않는 것을 권장합니다.

## 6. 현재 정상 동작하는 기능

- 메인 포털형 쇼핑몰 UX
- 카테고리 페이지 진입
- 카테고리 검색/필터/정렬
- URL query 기반 카테고리/검색/필터 상태
- 상품 상세페이지
- 상품 상세 breadcrumb
- 상품 상세 관련 상품 링크
- 상품 상세에서 선택 상품 정보 포함 견적문의 이동
- 플러그 iframe 견적문의 섹션
- iframe fallback 외부 링크
- 우측 고정 퀵메뉴
- 사업자등록증 새 창 링크
- 통장사본 새 창 링크
- FAQ 검색
- FAQ 카테고리 필터
- FAQ TOP 질문 이동
- FAQ 아코디언
- FAQPage JSON-LD
- favicon 404 방지
- 모바일 390px 가로 overflow 없음

## 7. 운영 반영 전 미확정 항목

아래 항목은 실제 운영 전에 사람이 직접 확정해야 합니다.

1. 개인정보처리방침 실제 URL
2. ChannelTalk 또는 카카오톡 상담 실제 URL
3. ChannelIO 운영 스크립트 삽입 여부
4. 플러그 정식 iframe 임베드 코드
5. 플러그 UTM 수집 스크립트 제공 여부
6. 플러그 iframe이 실제 운영 도메인에서 정상 표시되는지 여부
7. 사업자등록증/통장사본 공개 범위
8. 사업자등록증/통장사본 최신 파일 여부
9. Cafe24 적용 시 게시판/스킨 URL로 교체할 링크
10. `equipment.html` 운영 노출 여부

개인정보처리방침 본문, 상담 URL, 외부 스크립트는 임의로 작성하거나 추가하지 않았습니다.

## 8. 운영 경로 점검

| 현재 로컬 링크 | 그대로 사용 가능 여부 | Cafe24 적용 시 변경 필요 여부 | 추천 방식 | 확인 필요 |
|---|---:|---:|---|---:|
| `index.html` | 가능 | 가능성 있음 | 정적 페이지 유지 또는 Cafe24 메인 스킨 반영 | 예 |
| `category.html?category=box` | 가능 | 가능성 있음 | 정적 페이지 유지 또는 Cafe24 상품분류 URL로 매핑 | 예 |
| `product.html?category=box&product=basic-white-box` | 가능 | 가능성 있음 | 정적 상세 유지 또는 Cafe24 상품 상세 URL로 매핑 | 예 |
| `faq.html` | 가능 | 가능성 있음 | FAQ 정적 페이지 유지 또는 Cafe24 FAQ 게시판/스니펫 페이지로 매핑 | 예 |
| `blog.html` | 가능 | 가능성 있음 | Cafe24 게시판/블로그 URL 확정 후 교체 | 예 |
| `index.html#quote` | 가능 | 가능성 있음 | 플러그 iframe 삽입 페이지 또는 Cafe24 문의 게시판으로 매핑 | 예 |
| `assets/documents/perpackage-business-registration-2026.pdf` | 가능 | 보통 유지 가능 | 파일 공개 범위 확인 후 유지 | 예 |
| `assets/documents/perpackage-bankbook-copy.png` | 가능 | 보통 유지 가능 | 파일 공개 범위 확인 후 유지 | 예 |
| `https://www.pluuug.com/form/TrPLMjXdJ1` | 가능 | 유지 가능 | 플러그 관리자 임베드/UTM 정책 확인 | 예 |

## 9. Cafe24 적용용 링크 전환표

| 현재 링크 | Cafe24 적용 시 후보 | 상태 |
|---|---|---|
| `index.html#quote` | Cafe24 견적문의 게시판, 플러그 iframe 삽입 페이지, 또는 별도 문의 페이지 | 확정 필요 |
| `faq.html` | Cafe24 FAQ 게시판 또는 FAQ 스니펫 삽입 페이지 | 확정 필요 |
| `blog.html` | Cafe24 게시판/블로그 페이지 | 확정 필요 |
| `category.html?category=box` | Cafe24 상품분류 페이지 또는 정적 카테고리 페이지 유지 | 확정 필요 |
| `product.html?category=...&product=...` | Cafe24 상품 상세 또는 정적 상세 페이지 유지 | 확정 필요 |
| `index.html#support` | Cafe24 고객센터 또는 하단 안내 영역 | 확정 필요 |
| 개인정보처리방침 | Cafe24 기본 정책 페이지 또는 별도 정책 URL | 확정 필요 |
| 카톡상담 `#quote` | 실제 카카오톡/ChannelTalk URL 또는 문의 섹션 유지 | 확정 필요 |
| 사업자등록증 PDF | Cafe24 파일 경로 또는 현재 정적 asset 경로 | 공개 범위 확인 필요 |
| 통장사본 PNG | Cafe24 파일 경로 또는 현재 정적 asset 경로 | 공개 범위 확인 필요 |

Cafe24는 기존 스킨 CSS/JS의 영향을 받을 수 있으므로, 삽입 후 실제 렌더링 화면에서 computed style과 링크 경로를 다시 확인해야 합니다.

## 10. Vercel 또는 정적 호스팅 배포 구조

정적 호스팅 기준 권장 구조:

```text
perpackage-vercel-public/
  index.html
  category.html
  product.html
  faq.html
  blog.html
  perpackage-main-renewal.css
  perpackage-main-renewal.js
  perpackage-category.js
  perpackage-product.js
  assets/
  images/
  vercel.json
```

주의:

- HTML 파일만 따로 올리면 이미지, JS, CSS 경로가 깨질 수 있습니다.
- `assets/`와 `images/` 폴더를 함께 유지해야 합니다.
- Vercel에서 `perpackage-vercel-public` 폴더를 프로젝트 루트로 잡는 것이 안전합니다.
- Cafe24에 부분 삽입할 경우 상대경로가 달라질 수 있어 asset URL 재매핑이 필요합니다.

## 11. 배포 전 최종 QA 체크리스트

운영 반영 직전 사람이 직접 확인할 항목입니다.

- [ ] 메인 페이지 정상 표시
- [ ] 카테고리 페이지 정상 표시
- [ ] 상품 상세페이지 정상 표시
- [ ] FAQ 페이지 정상 표시
- [ ] 제작가이드/블로그 링크 정상
- [ ] 플러그 견적문의 iframe 표시
- [ ] 플러그 fallback 링크 정상
- [ ] 상품 상세에서 선택 상품 정보 포함 견적문의 이동 정상
- [ ] 카테고리 검색/필터/정렬 정상
- [ ] FAQ 검색/필터/아코디언 정상
- [ ] 모바일 390px 가로 overflow 없음
- [ ] 우측 퀵메뉴가 본문과 겹치지 않음
- [ ] 사업자등록증 새 창 열림
- [ ] 통장사본 새 창 열림
- [ ] 개인정보처리방침 링크 확인
- [ ] 카카오톡 또는 ChannelTalk 상담 링크 확인
- [ ] 이미지 깨짐 없음
- [ ] 내부 404 없음
- [ ] 콘솔 오류 없음
- [ ] 실제 도메인에서 상대경로 유지 확인
- [ ] 운영 금지 문구 목록 불검출

## 12. 기존 기능 재검증 결과

로컬 정적 서버 기준으로 아래 URL을 확인했습니다.

- `index.html`
- `category.html?category=box`
- `category.html?category=shopping-bag&search=로고&print=로고인쇄상담`
- `product.html?category=box&product=basic-white-box`
- `product.html?category=shopping-bag&product=plain-shopping-bag`
- `faq.html`
- `index.html?quoteProduct=basic-white-box&quoteCategory=box#quote`

검증 결과:

- 페이지 정상 로드
- 콘솔 오류 없음
- 이미지 경로 누락 없음
- 내부 링크 404 없음
- 모바일 390px 가로 overflow 없음
- 운영 금지 문구 목록 불검출

## 13. 운영 후 추가하면 좋은 작업

- 실제 개인정보처리방침 페이지 연결
- ChannelTalk 또는 카카오톡 상담 URL 연결
- 플러그 UTM 수집 스크립트 반영
- 실제 도메인 기준 GA4/GTM 이벤트 연결
- Cafe24 적용 시 asset 경로와 스킨 충돌 점검
- 제작가이드/FAQ 콘텐츠 운영형 게시판 전환 검토
- 사업자등록증/통장사본 최신 파일 교체 프로세스 정리
- `equipment.html` 운영 노출 여부 결정

## 14. 다음 작업자에게 전달할 핵심 요약

현재 `perpackage-vercel-public`은 정적 홈페이지 운영 반영 직전 상태입니다.

핵심 페이지는 `index.html`, `category.html`, `product.html`, `faq.html`, `blog.html`이며, JS/CSS와 asset 폴더를 함께 배포해야 합니다.

내부 링크, 이미지, JS, CSS, 모바일 overflow, FAQ 기능, 상품 상세에서 견적문의 이동은 로컬 기준으로 검증되었습니다.

운영 전에는 개인정보처리방침 URL, ChannelTalk/카카오톡 URL, 플러그 운영 임베드/UTM, Cafe24 URL 매핑, 문서 파일 공개 범위를 사람이 직접 확정해야 합니다.

