# 페르패키지 홈페이지 운영 배포용 패키지 정리 보고서

작성일: 2026-06-25

## 1. 작업 요약

페르패키지 정적 홈페이지 운영 반영을 위해 원본 `perpackage-vercel-public` 폴더를 훼손하지 않고, 운영 배포에 필요한 파일만 별도 폴더로 정리했습니다.

- 배포 폴더: `perpackage-production-ready/`
- 배포 zip: `perpackage-production-ready-2026-06-25.zip`
- 배포 가이드: `perpackage-production-ready/DEPLOYMENT_GUIDE.md`

## 2. 배포 폴더에 포함한 파일

### HTML

- `index.html`
- `category.html`
- `product.html`
- `faq.html`
- `blog.html`
- `equipment.html`

`equipment.html`은 최초 필수 포함 목록에는 없었지만, `blog.html` 메뉴에서 실제로 연결되고 있어 운영 패키지 내부 404 방지를 위해 포함했습니다. 운영 메뉴에 계속 노출할지는 별도 확인이 필요합니다.

### CSS / JS

- `perpackage-main-renewal.css`
- `perpackage-main-renewal.js`
- `perpackage-category.js`
- `perpackage-product.js`
- `perpackage-equipment-detail.css`
- `vercel.json`

### Assets

- `assets/brand/`
- `assets/icons/`
- `assets/icons/new/`
- `assets/shop-photos/`
- `assets/shop-thumbs/`
- `assets/documents/`
- `assets/equipment/`
- `assets/notion-selected/` 중 `blog.html`에서 실제 참조하는 이미지
- `assets/case-*.png`
- `assets/concept-*.png`
- `images/banners/`

## 3. 배포 폴더에서 제외한 항목

운영 배포에 직접 필요하지 않은 아래 항목은 `perpackage-production-ready/`에 포함하지 않았습니다.

- `reports/`
- `qa-*.png`
- `qa-product-detail/`
- `qa-quick-screenshots/`
- `.vercel/`
- `.gitignore`
- 개발/QA 중간 산출물
- 실제 페이지에서 참조하지 않는 참고용 이미지 묶음

보존만 하고 배포 폴더에는 넣지 않은 대표 참고 폴더:

- `assets/notion-upload/`
- `assets/notion-aligned-reference/`
- `assets/design-team-reference/`
- `assets/before-after-reference/`
- `assets/cafe24-reference/`

## 4. 자산 경로 검사 결과

배포 폴더 기준 정적 경로 검사를 진행했습니다.

- 검사 대상: HTML `src/href`, `srcset`, CSS `url(...)`, JS 내 `assets/...`, `images/...` 경로
- 참조 경로 수: 70개
- 누락 경로: 0건
- 제외 대상 폴더 유입: 0건
- 배포 폴더 파일 수: 109개

`blog.html`과 `equipment.html`에서 기본 favicon 404가 발생하지 않도록 배포 패키지 안에서 `assets/brand/perpackage-swallow.png`를 favicon으로 명시했습니다.

## 5. 로컬 서버 QA 결과

배포 폴더를 `http://127.0.0.1:4174` 기준으로 띄워 브라우저 QA를 진행했습니다.

확인 URL:

- `/index.html`
- `/category.html?category=box`
- `/category.html?category=shopping-bag&search=로고&print=로고인쇄상담`
- `/product.html?category=box&product=basic-white-box`
- `/product.html?category=shopping-bag&product=plain-shopping-bag`
- `/faq.html`
- `/index.html?quoteProduct=basic-white-box&quoteCategory=box#quote`
- `/blog.html`
- `/equipment.html`

검증 결과:

- PC 1440px 가로 overflow: 0건
- 모바일 390px 가로 overflow: 0건
- 내부 링크 검사: 37개, 문제 0건
- 로컬 리소스 검사: 61개, 문제 0건
- CSS/JS 로드 문제: 0건
- 콘솔 오류: 0건
- favicon 리소스 상태: 200
- 플러그 iframe 위치 확인: 메인/견적 query 페이지에서 확인됨
- 금지 표현 검사: 0건

## 6. 기능 QA 결과

### 카테고리 페이지

- `category.html?category=box` 정상 표시
- `category.html?category=shopping-bag&search=로고&print=로고인쇄상담` 정상 표시
- 인쇄 필터 선택 상태 복원 확인
- 검색어 초기화 시 `search` query만 제거 확인
- 전체 필터 초기화 시 `category`만 유지 확인
- 정렬 변경 시 `sort=popular` query 반영 확인

### 상품 상세 페이지

- `basic-white-box` 상품 상세 정상 표시
- `plain-shopping-bag` 상품 상세 정상 표시
- 관련 상품 카드 표시 확인
- 견적문의 이동 구조 유지 확인

### FAQ 페이지

- FAQ 32개 렌더링 확인
- 검색어 입력 후 결과 축소 확인
- 카테고리 필터 선택 상태 확인
- TOP 질문 클릭 시 아코디언 열림 확인
- ChannelIO 미설정 상태 fallback 메시지 표시 확인
- 콘솔 오류 없음

## 7. zip 패키지 검증

생성 파일:

- `perpackage-production-ready-2026-06-25.zip`

검증 결과:

- zip entry 수: 110개
- 제외 대상 항목 포함: 0건
- zip 내부 최상위 폴더: `perpackage-production-ready/`

## 8. 운영 전 미확정 TODO

아래 항목은 실제 운영 반영 전 사람이 직접 확정해야 합니다.

- 개인정보처리방침 실제 URL
- ChannelTalk 또는 카카오톡 상담 실제 URL
- ChannelIO 운영 스크립트 삽입 여부
- 플러그 정식 iframe 임베드 코드 또는 UTM 수집 스크립트
- 플러그 iframe이 실제 운영 도메인에서 정상 표시되는지 여부
- 사업자등록증/통장사본 공개 범위와 최신 파일 여부
- Cafe24 적용 시 게시판/스킨 URL 전환
- `equipment.html` 장비 소개 페이지 운영 노출 여부

## 9. Cafe24 적용 시 주의사항

- `assets/...`, `images/...` 상대경로가 Cafe24 업로드 위치와 맞는지 확인해야 합니다.
- Cafe24 스킨 CSS/JS가 공통 레이아웃에 개입할 수 있으므로 실제 스킨 화면에서 다시 확인이 필요합니다.
- 스킨 캐시와 브라우저 캐시를 함께 확인해야 합니다.
- `index.html#quote`, `faq.html`, `blog.html`, `category.html?...`, `product.html?...` 링크를 Cafe24 운영 URL 체계로 유지할지 전환할지 확정해야 합니다.
- 플러그 iframe과 상담 스크립트는 운영 도메인에서 별도 확인이 필요합니다.

## 10. 최종 판단

`perpackage-production-ready/`와 `perpackage-production-ready-2026-06-25.zip`은 정적 호스팅 또는 Vercel Preview 기준으로 바로 검수 가능한 상태입니다.

다만 Cafe24 운영 반영은 스킨 경로, 게시판 URL, 상담 채널 URL, 개인정보처리방침 URL, 플러그 운영 스크립트가 확정된 뒤 최종 적용하는 것이 안전합니다.
