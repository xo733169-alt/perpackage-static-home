# 페르패키지 Cafe24 메인 1차 적용 화면 안정화 보고서

작성일: 2026-06-26

## 1. 작업 목적

Cafe24 테스트 스킨에 붙인 페르패키지 메인 화면에서 배너와 상품 카드가 비어 보일 수 있는 문제를 줄이고, Cafe24 운영 경로 기준으로 이미지/링크/퀵메뉴/섹션 여백을 안정화했다.

이번 작업은 새 디자인 개편이 아니라 기존 메인 구조를 유지한 1차 적용 안정화 작업이다.

## 2. 수정한 파일

- `perpackage-vercel-public/perpackage-main-renewal.js`
- `perpackage-vercel-public/perpackage-common.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`
- `perpackage-vercel-public/cafe24-apply-ready/main-cafe24-final-cdn.html`
- `perpackage-vercel-public/cafe24-apply-ready/main-original-cafe24-fixed.html`
- `perpackage-vercel-public/cafe24-apply-ready/css-link-code.html`
- `perpackage-vercel-public/cafe24-apply-ready/js-link-code.html`

## 3. 새로 만든 Cafe24 안정화 적용 파일

- `perpackage-vercel-public/cafe24-apply-ready/main-cafe24-stable.html`
- `perpackage-vercel-public/cafe24-apply-ready/perpackage-main-cafe24.css`
- `perpackage-vercel-public/cafe24-apply-ready/perpackage-main-cafe24.js`
- `perpackage-vercel-public/cafe24-apply-ready/perpackage-common-cafe24.js`

Cafe24에 1차로 다시 붙일 때는 위 stable 파일 세트를 기준으로 적용하는 것을 권장한다.

## 4. 원인 분석

현재 화면에서 배너/상품 카드가 비어 보일 수 있는 주요 원인은 아래로 판단했다.

- Cafe24 적용 화면에서 JS 렌더 마운트가 비어 있으면 섹션이 큰 공백처럼 보일 수 있음
- `assets/...` 상대 이미지 경로가 남아 있으면 Cafe24에서 이미지 404가 날 수 있음
- `index.html`, `category.html`, `support.html` 같은 정적 상대 링크가 Cafe24 루트 기준과 어긋날 수 있음
- 섹션 padding이 큰 상태에서 카드 렌더가 실패하면 빈 공간이 더 크게 보임
- 통장사본 링크 일부가 상대 경로로 남아 있었음

## 5. JS 안정화 내용

### 메인 JS

- `data-cafe24-root-links` 또는 `cafe24.com` 환경을 감지해 Cafe24 루트 링크로 변환하도록 추가했다.
- `#quote`, `index.html`, `category.html`, `guide-production.html`, `guide-design.html`, `guide-caution.html`, `faq.html`, `support.html` 링크를 Cafe24 환경에서 루트 기준으로 정리한다.
- 검색 submit은 Cafe24 안정화본에서 `/category.html?search=검색어`로 이동한다.
- 상품 카드 이미지와 배너 이미지는 렌더 시 CDN/절대 경로를 사용하도록 보정했다.
- `renderPortalMount()`를 추가해 특정 섹션 렌더 실패가 전체 화면 렌더를 멈추지 않게 했다.
- 렌더 결과가 0개일 때는 고객 화면에 개발용 문구 없이 안내 카드가 표시되도록 했다.

### 공통 JS

- 공통 퀵메뉴 링크도 Cafe24 환경에서 `/#quote`, `/support.html` 기준으로 정리되도록 보강했다.
- 통장사본과 사업자등록증 링크를 CDN 절대 경로로 정규화하는 기존 로직을 유지했다.
- 기존 정적 퀵메뉴가 있으면 중복 생성하지 않는 구조를 유지했다.

## 6. CSS 안정화 내용

- 깨진 fallback 텍스트를 `이미지 준비중`으로 수정했다.
- `.pp-portal-empty-card` 스타일을 추가해 빈 섹션이 깨진 영역처럼 보이지 않게 했다.
- `.pp-portal-section` 상하 padding을 줄였다.
  - PC: 86px 수준에서 64px 중심으로 조정
  - 태블릿: 60px 중심
  - 모바일: 54px 중심
- Cafe24 스킨 CSS가 개입해도 메인 섹션 간격이 과하게 벌어지지 않도록 마지막 override를 추가했다.

## 7. 이미지/문서 경로 정리

안정화본 기준으로 이미지와 아이콘은 Cafe24 CDN 절대 경로를 사용한다.

기준 경로:

`https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/`

통장사본:

`https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/documents/perpackage-bankbook-copy.png`

사업자등록증:

`https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/perpackage-business-registration-2026.png`

## 8. 링크 정리

`main-cafe24-stable.html` 기준으로 아래 링크는 Cafe24 루트 기준으로 정리했다.

- `/`
- `/#quote`
- `/category.html?...`
- `/product.html?...`
- `/guide-production.html`
- `/guide-design.html`
- `/guide-caution.html`
- `/faq.html`
- `/support.html`

주의: 현재 테스트 URL이 `/skin-skin16`인 경우 루트 링크 동작은 운영 메인 적용 위치와 다르게 보일 수 있다. 운영 반영 전 실제 메인 경로에서 한 번 더 확인이 필요하다.

## 9. 퀵메뉴 정리

- 우측 퀵메뉴는 유지했다.
- `perpackage-common.js`가 퀵메뉴를 담당하도록 유지하되, HTML에 이미 퀵메뉴가 있으면 중복 생성하지 않게 했다.
- TOP 버튼은 main/common 양쪽에서 안전하게 처리한다.
- 통장사본 링크 상대 경로는 CDN 절대 경로로 수정했다.

## 10. 검증 결과

### 정적 검사

- `perpackage-main-renewal.js` 문법 검사 통과
- `perpackage-common.js` 문법 검사 통과
- `perpackage-main-cafe24.js` 문법 검사 통과
- `perpackage-common-cafe24.js` 문법 검사 통과
- `main-cafe24-stable.html`에서 상대 `assets/` 이미지/문서 경로 없음
- `main-cafe24-stable.html`에서 상대 `index.html`, `category.html`, `guide-*.html`, `faq.html`, `support.html` 링크 없음
- 안정화본에서 고객 화면용 `TODO`, `미구현` 문구 없음
- 금지 표현 추가 없음

### 로컬 브라우저 확인

확인 파일:

- `perpackage-vercel-public/index.html`

Chrome headless 기준:

- 데스크톱 1440px 스크린샷 확인
- 모바일 390px 스크린샷 확인
- 메인 배너 표시 확인
- WHAT'S NEW 상품 카드 표시 확인
- BEST SELLER 카드 표시 확인
- 포털 상품 카드 표시 확인
- 제작가이드 카드 표시 확인
- 우측 퀵메뉴와 모바일 하단 퀵바 표시 확인
- Pluuug iframe 존재 확인

DOM 덤프 기준:

- 동적 hero banner 렌더 확인
- 상품 카드 렌더 확인
- 빈 섹션 fallback 카드 0개
- quote iframe 존재 확인

## 11. 적용 시 사용할 파일

Cafe24 메인 안정화 적용 후보:

1. HTML 본문:
   - `cafe24-apply-ready/main-cafe24-stable.html`
2. CSS:
   - `cafe24-apply-ready/perpackage-main-cafe24.css`
3. JS:
   - `cafe24-apply-ready/perpackage-main-cafe24.js`
   - `cafe24-apply-ready/perpackage-common-cafe24.js`
4. 연결 코드:
   - `cafe24-apply-ready/css-link-code.html`
   - `cafe24-apply-ready/js-link-code.html`

## 12. 남은 확인 항목

- Cafe24 실제 테스트 스킨에서 CSS/JS 파일 200 응답 확인
- 이미지 404 여부 확인
- Pluuug iframe이 운영 도메인에서 정상 표시되는지 확인
- `/skin-skin16` 테스트 경로에서 루트 링크가 의도대로 움직이는지 확인
- 운영 메인으로 적용할 때 `/` 기준 링크가 맞는지 최종 확인
- Cafe24 기본 헤더를 유지할지, 페르패키지 커스텀 헤더를 유지할지 운영 적용 전에 확정 필요

## 13. 한 줄 요약

페르패키지 Cafe24 메인 1차 적용본의 빈 배너/빈 상품 카드 가능성을 줄이고, CDN 이미지 경로, 루트 링크, fallback 카드, 퀵메뉴, 섹션 여백을 운영 적용에 더 안전한 stable 파일 세트로 정리했다.
