# 페르패키지 공용 상품 상세페이지 템플릿 2차 보강 작업 보고

작성일: 2026-06-24

## 작업 목적

페르패키지 공용 카테고리 상품목록 페이지와 공용 상품 상세페이지의 연결 흐름을 보강했습니다.

이번 작업의 핵심은 고객이 카테고리 페이지에서 상품을 눌렀을 때 상세페이지로 이동하고, 다시 카테고리 검색/필터 상태로 돌아올 수 있으며, 상세페이지에서 견적문의로 이동할 때 선택한 상품 정보가 `#quote` 섹션에 전달되도록 만드는 것입니다.

## 수정한 파일

- `perpackage-vercel-public/perpackage-category.js`
- `perpackage-vercel-public/perpackage-product.js`
- `perpackage-vercel-public/product.html`
- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/perpackage-main-renewal.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`

## 카테고리 상품 slug 연결

`perpackage-category.js`에 `productDetailRoutes`를 추가해 카테고리 상품 카드와 상세페이지 URL을 연결했습니다.

현재 카테고리 상품 목록 기준:

- 전체 상품 카드: 29개
- 상세페이지로 연결되는 상품 카드: 29개
- 상세 데이터 누락 링크: 0개

주요 slug 예시:

- 기본 흰색 단상자: `box / basic-white-box`
- 크라프트 단상자: `box / kraft-paper-box`
- 크라프트 택배박스: `delivery-box / kraft-delivery-box`
- 무지 쇼핑백: `shopping-bag / plain-shopping-bag`
- 기성 슬리브: `envelope-sleeve / ready-sleeve`
- 로고 스티커: `sticker-label / logo-sticker`
- 기본 선물상자: `gift-box / basic-gift-box`
- 샘플 패키지 세트: `small-sample / sample-package-set`
- 쇼핑백 로고 인쇄: `logo-print / logo-print-shopping-bag`

쇼핑백 카테고리 안의 `로고 인쇄 쇼핑백`은 기존 상세 URL 흐름을 유지하기 위해 `logo-print / logo-print-shopping-bag`로 연결했습니다.

## 상세 데이터 확장

`perpackage-product.js`의 `productDetailData`를 확장했습니다.

기존 대표 8개 상품 상세 데이터는 유지했고, 나머지 상품은 `createProductDetail()` 헬퍼를 통해 같은 데이터 구조로 추가했습니다.

상세 데이터 총계:

- 상세 데이터 수: 28개
- 필수 필드 누락: 0개

상품 상세 데이터 필수 필드:

- `category`
- `product`
- `title`
- `subtitle`
- `description`
- `image`
- `alt`
- `badges`
- `useCases`
- `options`
- `materials`
- `printOptions`
- `notice`
- `optionSummary`
- `checklist`
- `printGuide`
- `faq`
- `relatedProducts`

## 상세 링크 returnUrl 처리

카테고리 페이지에서 상품 상세페이지로 이동할 때 현재 카테고리 URL 상태를 `returnUrl` query로 함께 전달하도록 했습니다.

예시:

```text
product.html?category=shopping-bag&product=plain-shopping-bag&returnUrl=category.html%3Fcategory%3Dshopping-bag%26search%3D%EB%A1%9C%EA%B3%A0
```

상세페이지의 `카테고리로 돌아가기` 버튼은 안전한 `returnUrl`이 있을 때 해당 URL로 이동합니다.

안전 처리 기준:

- `category.html`로 시작하는 내부 URL만 허용
- `https://...`, `http://...`, `//...` 형태 외부 URL은 무시
- 안전하지 않은 returnUrl은 해당 상품의 기본 카테고리 URL로 대체

## fallback 처리

상품 상세페이지에 잘못된 URL로 접근했을 때 fallback 메시지를 구분했습니다.

유효한 카테고리이지만 상품 slug가 잘못된 경우:

```text
요청한 상품 정보를 찾을 수 없어 해당 카테고리의 대표 상품을 보여드립니다.
```

카테고리까지 잘못된 경우:

```text
요청한 상품 정보를 찾을 수 없어 기본 상품을 보여드립니다.
```

대표 상품 fallback 기준:

- `box`: `basic-white-box`
- `delivery-box`: `kraft-delivery-box`
- `shopping-bag`: `plain-shopping-bag`
- `envelope-sleeve`: `ready-sleeve`
- `sticker-label`: `logo-sticker`
- `gift-box`: `basic-gift-box`
- `small-sample`: `sample-package-set`
- `logo-print`: `logo-print-shopping-bag`

## 견적문의 CTA 연결

상세페이지의 견적문의 CTA가 선택 상품 정보를 포함해 메인 페이지 `#quote`로 이동하도록 변경했습니다.

예시:

```text
index.html?quoteProduct=plain-shopping-bag&quoteCategory=shopping-bag#quote
```

적용 위치:

- 상품 상세 상단 CTA
- 상품 상세 하단 CTA

`product.html`의 하단 CTA에도 `data-product-quote-link`를 추가해 상단 CTA와 같은 방식으로 동작하게 했습니다.

## quote 섹션 선택 상품 안내

`index.html`의 플러그 견적문의 iframe 위에 선택 상품 안내 영역을 추가했습니다.

추가한 마크업:

```html
<div class="perpackage-pluuug-form__selected" data-quote-product-selected hidden></div>
```

`perpackage-main-renewal.js`에서 `quoteProduct`, `quoteCategory` query를 읽어 선택 상품명을 표시합니다.

표시 예시:

```text
선택한 상품: 무지 쇼핑백
아래 폼에 수량, 사이즈, 인쇄 여부를 남겨주세요.
```

query가 없으면 해당 안내 영역은 숨김 상태를 유지합니다.

## 관련 상품 링크 보강

상품 상세페이지의 관련 상품 카드도 상세페이지 링크를 유지하면서 `returnUrl`을 함께 전달하도록 보강했습니다.

이제 관련 상품으로 이동한 뒤에도 원래 들어온 카테고리 목록 상태로 돌아가기 쉽습니다.

## CSS 추가 내용

`perpackage-main-renewal.css`에 선택 상품 안내 UI를 추가했습니다.

추가/변경 클래스:

- `.perpackage-pluuug-form__selected`
- `.perpackage-pluuug-form__selected[hidden]`
- `.perpackage-pluuug-form__selected strong`
- `.perpackage-pluuug-form__selected span`

디자인 방향:

- 기존 quote 섹션과 어울리는 흰색/남색 기반
- 연한 남색 배경과 부드러운 테두리
- PC에서는 중앙 정렬
- 모바일에서는 좌측 정렬과 작은 radius로 조정

## 검증 결과

검증한 항목:

- `perpackage-category.js` 문법 검사 통과
- `perpackage-product.js` 문법 검사 통과
- `perpackage-main-renewal.js` 문법 검사 통과
- 카테고리 상품 29개 상세 링크 생성 확인
- 상세 데이터 28개 필수 필드 누락 없음
- 상세 링크와 상세 데이터 매칭 누락 0개
- `returnUrl` 내부 URL 허용 확인
- 외부 `returnUrl` 차단 확인
- 잘못된 product slug fallback 확인
- 잘못된 category fallback 확인
- 상세페이지 견적 CTA query 생성 확인
- `#quote` 선택 상품 안내 DOM 표시 확인
- PC 카테고리 화면 렌더링 확인
- 모바일 상품 상세 화면 렌더링 확인
- CDP 기준 런타임 오류 이벤트 없음
- 금지 문구 검색 결과 없음

검증 캡처:

- `perpackage-vercel-public/qa-product-detail/category-shopping-bag-desktop.png`
- `perpackage-vercel-public/qa-product-detail/product-shopping-bag-mobile.png`
- `perpackage-vercel-public/qa-product-detail/index-quote-selected-desktop.png`

## 참고 사항

현재 `categoryPageData` 기준 29개 상품이 모두 상세페이지로 연결되어 있어, 상세 데이터가 없는 상품의 `상담하기` 흐름은 현재 목록에서는 발생하지 않습니다.

다만 코드 구조상 상세 링크가 아닌 일반 `#quote` 링크는 그대로 유지되도록 되어 있어, 추후 상세 데이터를 만들지 않은 임시 상품을 추가해도 기존 상담 흐름으로 연결할 수 있습니다.

## 아직 남은 작업

- 실제 상품별 상세 문구를 운영 기준에 맞게 더 세밀하게 다듬기
- 상품별 실제 대표 이미지 교체 또는 추가 촬영 이미지 연결
- 상세페이지에서 상품 옵션을 플러그 폼으로 자동 전달할 수 있는지 플러그 기능 확인
- 상품 상세페이지의 SEO title/description을 상품별로 더 정교하게 관리
- 추후 상품 상세 URL을 Cafe24 또는 Vercel 배포 URL 기준으로 재검증
