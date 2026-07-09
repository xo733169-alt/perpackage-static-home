# 페르패키지 카테고리/고객센터/퀵메뉴 운영형 보강 보고서

작성일: 2026-06-25

## 1. 작업 목적

페르패키지 정적 홈페이지의 메인, 카테고리, 상품 상세, FAQ, 블로그 흐름을 운영 전 구조에 가깝게 보강했습니다.

이번 작업은 새 주문/결제/회원 기능을 만드는 것이 아니라, 고객이 상품 탐색 중 FAQ, 고객센터, 견적문의, 서류 확인으로 자연스럽게 이동할 수 있도록 연결 구조를 정리하는 데 집중했습니다.

## 2. 새로 만든 파일

- `perpackage-vercel-public/support.html`
  - 독립 고객센터 허브 페이지입니다.
  - 공지사항, 이용안내 FAQ, 회원/주문/결제 안내, 배송 안내, 취소/반품 안내, 상품 Q&A 미리보기, 제작 전 가이드, 견적문의 CTA를 포함합니다.
  - 실제 Cafe24 게시판, 로그인, 주문조회, 결제 기능은 연결하지 않고 운영 URL 확정 후 연결할 수 있는 안내형 구조로 구성했습니다.

- `perpackage-vercel-public/perpackage-common.js`
  - 공통 우측 고정 퀵메뉴와 모바일 하단 퀵바를 렌더링하는 공통 스크립트입니다.
  - 기존 `index.html`에 이미 있던 퀵메뉴와 중복 생성되지 않도록 처리했습니다.
  - FAQ처럼 메인 CSS를 직접 쓰지 않는 독립 페이지에서도 퀵메뉴가 보이도록 fallback CSS를 포함했습니다.

- `perpackage-vercel-public/reports/2026-06-25-category-support-operational-structure-report.md`
  - 현재 보고서 파일입니다.

## 3. 수정한 파일

- `perpackage-vercel-public/index.html`
  - 상단 유틸, 푸터, UPDATE/가이드 영역에서 FAQ와 고객센터 진입을 강화했습니다.
  - 메인 중단에 `#support-center` 고객센터/이용안내 허브 섹션을 추가했습니다.
  - 공통 퀵메뉴 스크립트 `perpackage-common.js`를 연결했습니다.

- `perpackage-vercel-public/category.html`
  - 상단 유틸/푸터의 FAQ 표기를 `이용안내 FAQ`로 정리했습니다.
  - 고객센터 링크를 `support.html`로 연결했습니다.
  - 공통 퀵메뉴 스크립트를 연결했습니다.

- `perpackage-vercel-public/product.html`
  - 상품 상세 상단/푸터에 고객센터와 이용안내 FAQ 흐름을 맞췄습니다.
  - 상품 상세 FAQ 하단의 전체 FAQ 이동 문구를 운영형 톤으로 정리했습니다.
  - 공통 퀵메뉴 스크립트를 연결했습니다.

- `perpackage-vercel-public/faq.html`
  - 헤더/푸터에 고객센터 링크를 추가했습니다.
  - FAQ 표기를 `이용안내 FAQ`로 맞췄습니다.
  - 공통 퀵메뉴 스크립트를 연결했습니다.
  - 개인정보처리방침 임시 링크는 `support.html` 기준으로 정리하고 TODO 주석을 유지했습니다.

- `perpackage-vercel-public/blog.html`
  - 상단/하단에 이용안내 FAQ와 고객센터 링크를 추가했습니다.
  - 공통 퀵메뉴 스크립트를 연결했습니다.
  - favicon 링크를 추가해 `/favicon.ico` 404를 해소했습니다.

- `perpackage-vercel-public/perpackage-category.js`
  - 운영 카테고리 기준을 보강했습니다.
  - 추가/유지 카테고리:
    - `box`: 패키지
    - `rigid-box`: 싸바리박스
    - `shopping-bag`: 쇼핑백
    - `business-card`: 명함
    - `envelope-sleeve`: 봉투
    - `dust-bag`: 더스트백
    - `accessories`: 부자재
    - `cafe-supplies`: 카페용품
    - `design-request`: 디자인의뢰
    - `delivery-box`: 택배박스
    - `sticker-label`: 스티커·라벨
    - `gift-box`: 선물상자
    - `small-sample`: 샘플·소량
    - `logo-print`: 로고인쇄
  - `categoryHeroBanners`, `categoryProductSections`, `categoryFeatureCards`, `categoryLinkCards` 구조를 유지하면서 이미지 묶음형 카테고리 포털 흐름을 강화했습니다.
  - Cafe24 연결 준비 필드 `cafe24CategoryUrl`, `cafe24ProductUrl`, `cafe24Status`를 추가했습니다.

- `perpackage-vercel-public/perpackage-product.js`
  - 상품 상세 데이터에도 Cafe24 연결 준비 필드 `cafe24ProductUrl`, `cafe24CategoryUrl`, `cafe24Status`를 추가했습니다.
  - 상품 상세에서 검색/필터 상태가 담긴 `returnUrl`이 있을 때 카테고리 목록 복귀 링크가 유지되는지 확인했습니다.

- `perpackage-vercel-public/perpackage-main-renewal.css`
  - 메인 고객센터 허브 섹션 스타일을 추가했습니다.
  - `support.html` 전용 레이아웃 스타일을 추가했습니다.
  - 공통 퀵메뉴와 모바일 하단 퀵바 반응형 스타일을 보강했습니다.
  - 고객센터 내부 앵커 이동 시 헤더에 제목이 가리지 않도록 scroll margin을 추가했습니다.

## 4. FAQ/고객센터 노출 정리

FAQ는 기존 독립 페이지를 유지하면서 다음 위치에서 더 잘 보이도록 정리했습니다.

- 메인 상단 유틸 메뉴
- 메인 푸터
- 메인 `#support-center` 고객센터/이용안내 허브
- 카테고리 상단 유틸 메뉴
- 카테고리 푸터
- 카테고리 안내 링크 카드
- 상품 상세 상단 유틸 메뉴
- 상품 상세 FAQ 하단 링크
- 상품 상세 푸터
- 블로그 상단/하단 링크
- `support.html` 고객센터 허브 내부 FAQ 카드

고객센터는 `support.html`로 새로 분리했습니다.

## 5. 공통 퀵메뉴 정리

공통 퀵메뉴 적용 페이지:

- `index.html`
- `category.html`
- `product.html`
- `faq.html`
- `support.html`
- `blog.html`

PC 우측 고정 퀵메뉴 항목:

- 견적문의: `index.html#quote`
- 카톡상담: `index.html#quote`
- 이용안내: `support.html`
- 사업자등록증: `assets/documents/perpackage-business-registration-2026.pdf`
- 통장사본: `assets/documents/perpackage-bankbook-copy.png`
- TOP: 페이지 상단 이동

모바일 하단 퀵바 항목:

- 견적문의: `index.html#quote`
- 카톡상담: `index.html#quote`
- 이용안내: `support.html`
- TOP: 페이지 상단 이동

비고:

- 실제 카카오톡 또는 ChannelTalk URL은 아직 확정되지 않아 `index.html#quote`로 임시 연결했습니다.
- `#quote` 섹션이 화면에 보일 때 모바일 퀵바가 폼을 가리지 않도록 숨김 처리를 유지했습니다.

## 6. Cafe24 상품 연결 준비

현재 고객 화면에는 Cafe24 관리자 상품관리 URL을 노출하지 않았습니다.

추가한 데이터 필드:

- `cafe24CategoryUrl`
- `cafe24ProductUrl`
- `cafe24Status`
- `cafe24Memo` 일부 카테고리 메모용

현재 상태:

- 실제 URL은 빈 값으로 유지했습니다.
- 상태값은 `pending`으로 두었습니다.
- 운영 고객용 Cafe24 상품분류/상품상세 URL이 확정되면 해당 필드에 연결하면 됩니다.

## 7. 검증 결과

### JS 문법 검사

아래 파일은 `node --check` 통과했습니다.

- `perpackage-common.js`
- `perpackage-category.js`
- `perpackage-product.js`
- `perpackage-main-renewal.js`

### 브라우저 QA

로컬 정적 서버와 Chrome headless로 확인했습니다.

PC 1440px 확인 URL:

- `/index.html`
- `/category.html?category=box`
- `/category.html?category=shopping-bag&search=로고&print=로고인쇄상담`
- `/category.html?category=sticker-label`
- `/category.html?category=rigid-box`
- `/category.html?category=business-card`
- `/category.html?category=dust-bag`
- `/category.html?category=accessories`
- `/category.html?category=cafe-supplies`
- `/category.html?category=design-request`
- `/product.html?category=box&product=basic-white-box&returnUrl=category.html%3Fcategory%3Dbox%26search%3D로고`
- `/faq.html`
- `/support.html`
- `/blog.html`

모바일 390px 확인 URL:

- `/index.html`
- `/category.html?category=shopping-bag`
- `/product.html?category=shopping-bag&product=plain-shopping-bag`
- `/faq.html`
- `/support.html`
- `/blog.html`

확인 결과:

- 가로 overflow 없음
- 로컬 404 없음
- 콘솔 오류 없음
- 이미지 로딩 실패 없음
- 공통 퀵메뉴 렌더링 정상
- 모바일 하단 퀵바 렌더링 정상
- 사업자등록증/통장사본 링크 노출 정상
- 카테고리 롤배너 렌더링 정상
- 카테고리 상품 카드 렌더링 정상
- 검색/필터 query가 들어간 쇼핑백 카테고리 렌더링 정상
- 상품 상세 `returnUrl` 복귀 링크 유지 정상
- 요청된 금지 표현 검색 결과 없음

## 8. 운영 전 남은 TODO

- 실제 카카오톡 상담 또는 ChannelTalk URL 확정
- ChannelIO 운영 스크립트 삽입 여부 확정
- 개인정보처리방침 실제 URL 확정
- Cafe24 고객용 상품분류 URL 확정
- Cafe24 고객용 상품상세 URL 확정
- Cafe24 게시판/FAQ/고객센터 URL 확정
- 사업자등록증/통장사본을 공개해도 되는 범위 최종 확인
- `support.html`의 공지사항, 배송/결제, 취소/반품 문구 운영 정책 최종 확인
- 운영 반영 시 `perpackage-production-ready` 패키지 재생성 필요

## 9. 다음 작업자에게 전달할 핵심 요약

이번 보강으로 페르패키지 홈페이지는 `index → category → product → quote` 흐름에 FAQ와 고객센터, 서류 확인, 공통 퀵메뉴가 붙은 운영형 구조가 되었습니다.

실제 주문, 결제, 회원, Cafe24 상품 연결 기능은 추가하지 않았습니다. 운영 URL이 확정되면 `cafe24CategoryUrl`, `cafe24ProductUrl`, `support.html` 내 안내 링크, 개인정보처리방침 링크, 상담 링크만 순차적으로 바꾸면 됩니다.
