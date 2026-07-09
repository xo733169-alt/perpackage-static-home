# 페르패키지 운영 전 공통 링크 및 외부 연결 QA 보고

작성일: 2026-06-25

## 1. 작업 목적

페르패키지 정적 홈페이지 운영 적용 전, 공통 링크와 외부 연결 준비 상태를 점검했습니다.

이번 작업은 새 기능 개발이 아니라 아래 항목을 확인하고 최소 정리하는 작업입니다.

- 개인정보처리방침 링크 상태 확인
- ChannelTalk 연결 준비 상태 확인
- 사이트 전체 공통 링크 QA
- 상대경로와 해시 링크 QA
- 404 가능 링크 점검
- 금지 표현 재검사

## 2. 수정한 파일

- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/category.html`
- `perpackage-vercel-public/product.html`
- `perpackage-vercel-public/faq.html`

## 3. 수정 내용

### favicon 404 방지

로컬 서버 QA 중 브라우저가 자동으로 `/favicon.ico`를 요청하면서 404가 1건 발생했습니다.

명시적인 favicon 링크를 아래 4개 HTML에 추가해 불필요한 404를 제거했습니다.

```html
<link rel="icon" type="image/png" href="assets/icons/new/icon-all-products.png">
```

적용 파일:

- `index.html`
- `category.html`
- `product.html`
- `faq.html`

### FAQ 개인정보처리방침 링크 TODO 추가

`faq.html` 푸터의 개인정보처리방침 링크는 기존처럼 `index.html#support`를 유지했습니다.

다만 실제 개인정보처리방침 운영 URL이 아직 확인되지 않아 아래 TODO 주석을 추가했습니다.

```html
<!-- TODO: 개인정보처리방침 실제 운영 URL이 확정되면 index.html#support 대신 교체 -->
```

### FAQ ChannelTalk 연결 TODO 추가

`PP_FAQ_CONFIG`의 기존 구조는 유지했습니다.

```js
inquiryUrl: "index.html#quote"
channelTalkUrl: ""
channelTalkMode: "channelio"
```

실제 ChannelTalk URL 또는 운영 ChannelIO 스크립트가 확정되지 않았으므로 아래 TODO 주석을 추가했습니다.

```js
// TODO: 실제 ChannelTalk URL 또는 운영 ChannelIO 스크립트가 확정되면 반영
```

## 4. 개인정보처리방침 링크 확인 결과

`perpackage-vercel-public` 안에서 아래 파일명을 기준으로 확인했습니다.

- `privacy.html`
- `policy.html`
- `personal-info.html`
- 개인정보처리방침 관련 파일
- 약관/정책 관련 파일

확인 결과:

- 별도 개인정보처리방침 페이지는 현재 없음
- FAQ 푸터의 개인정보처리방침 링크는 `index.html#support`로 유지
- 법적 본문은 임의 작성하지 않음

운영 전 필요 작업:

- 실제 개인정보처리방침 페이지 또는 Cafe24 정책 페이지 URL 확정 필요
- URL 확정 후 `faq.html`의 `index.html#support` 링크 교체 필요
- 필요하면 `index.html`, `category.html`, `product.html` 푸터에도 개인정보처리방침 링크를 공통 추가할지 결정 필요

## 5. ChannelTalk 연결 확인 결과

프로젝트 안에서 아래 항목을 확인했습니다.

- `ChannelIO`
- `channelTalkUrl`
- `channelTalkMode`
- 카카오톡 상담 링크
- 채널톡 관련 스크립트 삽입 여부

확인 결과:

- 실제 ChannelIO 운영 스크립트는 확인되지 않음
- 실제 ChannelTalk URL은 확인되지 않음
- `faq.html`은 `channelTalkMode: "channelio"` 유지
- `channelTalkUrl: ""` 유지
- ChannelIO가 없는 경우 fallback 안내가 표시됨
- `index.html` 우측/모바일 퀵메뉴의 카톡상담 링크는 기존처럼 `#quote` 유지
- `index.html`에는 “카카오톡 상담 링크가 확정되면 실제 채널 URL로 변경” TODO가 이미 있음

운영 전 필요 작업:

- 실제 ChannelTalk 운영 스크립트를 넣을지 결정
- 또는 실제 카카오톡/채널톡 URL을 `channelTalkUrl`과 퀵메뉴 href에 반영할지 결정
- 확정되지 않은 URL은 임의로 넣지 않았음

## 6. 유지한 링크

아래 링크는 현재 구조를 유지했습니다.

- 홈: `index.html`
- 상품목록: `category.html?category=box`
- 제작가이드: `blog.html`
- FAQ: `faq.html`
- 견적문의: `index.html#quote`
- 상품 상세 견적문의: `index.html?quoteProduct=basic-white-box&quoteCategory=box#quote`
- 카테고리 링크: `category.html?category=...`
- 상품 상세 링크: `product.html?category=...&product=...`
- 사업자등록증: `assets/documents/perpackage-business-registration-2026.pdf`
- 통장사본: `assets/documents/perpackage-bankbook-copy.png`
- 플러그 iframe fallback: `https://www.pluuug.com/form/TrPLMjXdJ1`

## 7. 수정한 링크

링크 href 자체는 운영 URL이 확정되지 않은 항목을 임의 변경하지 않았습니다.

실제 수정은 favicon 404 방지를 위한 `<link rel="icon">` 추가와 TODO 주석 추가입니다.

## 8. TODO로 남긴 운영 링크

- 개인정보처리방침 실제 운영 URL
- ChannelTalk 또는 카카오톡 상담 실제 URL
- ChannelIO 운영 스크립트 삽입 여부
- Cafe24 적용 시 게시판/스킨 URL로 바뀌어야 할 링크
- 실제 도메인 배포 후 `index.html`, `category.html`, `product.html`, `faq.html` 상대경로 유지 여부

## 9. 로컬 서버 기준 QA 결과

로컬 정적 서버 기준으로 확인했습니다.

기준 URL:

- `http://127.0.0.1:4173/index.html`
- `http://127.0.0.1:4173/category.html?category=box`
- `http://127.0.0.1:4173/product.html?category=box&product=basic-white-box`
- `http://127.0.0.1:4173/faq.html`
- `http://127.0.0.1:4173/index.html?quoteProduct=basic-white-box&quoteCategory=box#quote`

확인 결과:

- `index.html` 정상 로드
- `category.html?category=box` 정상 로드
- `product.html?category=box&product=basic-white-box` 정상 로드
- `faq.html` 정상 로드
- `index.html?quoteProduct=basic-white-box&quoteCategory=box#quote` 정상 로드
- quoteProduct 안내 문구 표시 확인
- 상품 상세 견적문의 링크가 `index.html?quoteProduct=basic-white-box&quoteCategory=box#quote`로 생성됨
- 상품 상세 카테고리 복귀 링크가 `category.html?category=box`로 생성됨
- 사업자등록증 PDF 링크 정상
- 통장사본 PNG 링크 정상
- 로컬 내부 href/src 링크 점검 결과 문제 없음
- 해시 링크 대상 section id 누락 없음
- 콘솔 오류 없음
- 로컬 404 없음

## 10. FAQ 기능 QA 결과

- FAQ 검색 정상
- FAQ 카테고리 필터 정상
- 카테고리 버튼 `aria-pressed="true"` 확인
- TOP 질문 클릭 시 해당 FAQ 열림
- 아코디언 `aria-expanded` 변경 정상
- ChannelIO가 없는 상태에서 fallback 안내 표시 정상

## 11. 모바일 QA 결과

390px 기준으로 아래 페이지를 확인했습니다.

- `index.html`
- `category.html?category=box`
- `product.html?category=box&product=basic-white-box`
- `faq.html`

결과:

- 4개 페이지 모두 `innerWidth`, `documentElement.scrollWidth`, `body.scrollWidth`가 390px로 일치
- 모바일 가로 overflow 없음
- FAQ 카테고리 버튼 가로 스크롤 유지

## 12. 404 가능 링크 여부

최종 QA 기준:

- 로컬 내부 링크 404 없음
- 로컬 이미지/JS/CSS 리소스 404 없음
- 사업자등록증 PDF 경로 정상
- 통장사본 PNG 경로 정상
- favicon 자동 요청 404는 `<link rel="icon">` 추가 후 해소

외부 링크:

- 플러그 iframe/fallback URL은 외부 서비스이므로 로컬 파일 존재 여부 검증 대상에서 제외
- 운영 전 실제 브라우저에서 플러그 폼 로딩 여부 재확인 권장

## 13. 금지 표현 검사 결과

아래 표현은 주요 HTML/JS/CSS 파일에서 검출되지 않았습니다.

- 바로 구매하기
- 결제하기
- 확정 견적
- 당일 제작 가능
- 무조건 최저가
- 인쇄 포함 확정가
- 무조건 제작 가능

검사 대상:

- `index.html`
- `category.html`
- `product.html`
- `faq.html`
- `perpackage-main-renewal.js`
- `perpackage-category.js`
- `perpackage-product.js`
- `perpackage-main-renewal.css`

## 14. 운영 배포 전 사람이 직접 확인해야 할 항목

1. 개인정보처리방침 실제 URL 확정
2. ChannelTalk 또는 카카오톡 상담 실제 URL 확정
3. ChannelIO 운영 스크립트 삽입 여부 결정
4. Cafe24 적용 시 `blog.html`, `faq.html`, `index.html#quote` 같은 정적 링크를 게시판/스킨 URL로 바꿔야 하는지 확인
5. 실제 도메인 배포 후 상대경로가 유지되는지 확인
6. 플러그 iframe이 운영 도메인에서 정상 표시되는지 확인
7. 사업자등록증/통장사본 공개 범위와 최신 파일 여부 확인
8. 개인정보처리방침 본문은 실제 운영 정책/법무 검토 후 작성

