# 페르패키지 Cafe24 쇼핑백 상품분류 URL 반영 보고서

작성일: 2026-06-25

## 1. 작업 목적

Cafe24 고객용 상품분류 URL이 확인된 쇼핑백 카테고리를 현재 개발 중인 페르패키지 정적 홈페이지 데이터에 연결 준비 상태로 반영했습니다.

이번 작업은 고객 화면에 바로 이동 버튼을 노출하는 기능 개발이 아니라, `category.html`과 `product.html`이 사용하는 데이터 필드에 운영 연결 정보를 기록하는 작업입니다.

## 2. 확인된 Cafe24 고객용 URL

- 분류: 쇼핑백
- category key: `shopping-bag`
- category label: `쇼핑백`
- Cafe24 고객용 상품분류 URL: `https://peerl.cafe24.com/product/list.html?cate_no=45`
- 현재 확인 상품 수: 4개
- 노출 상품 예시:
  - 쇼핑백 손잡이형
  - 쇼핑백 매립형
  - 쇼핑백 타공형
  - 쇼핑백 디자인·주문제작

## 3. 수정한 파일

### `perpackage-vercel-public/perpackage-category.js`

카테고리 페이지에서 사용하는 `cafe24CategoryMappings`의 `shopping-bag` 항목을 업데이트했습니다.

반영 내용:

- `cafe24CategoryUrl`: `https://peerl.cafe24.com/product/list.html?cate_no=45`
- `cafe24Status`: `ready`
- `cafe24Memo`: Cafe24 고객용 상품분류 URL 확인 메모 반영

### `perpackage-vercel-public/perpackage-product.js`

상품 상세 페이지에서 사용하는 `cafe24CategoryMappings`의 `shopping-bag` 항목도 같은 값으로 업데이트했습니다.

이렇게 맞춰둔 이유는 쇼핑백 카테고리 상세 페이지와 쇼핑백 상품 상세 페이지가 같은 Cafe24 고객용 분류 URL 정보를 공유하도록 하기 위해서입니다.

## 4. 변경하지 않은 항목

이번 작업에서는 아래 항목을 변경하지 않았습니다.

- `category.html` 구조
- `product.html` 구조
- 검색 기능
- 필터 기능
- 정렬 기능
- 상품 카드 렌더링 구조
- 상품 상세 렌더링 구조
- 고객 화면 CTA 문구
- 실제 Cafe24 이동 버튼 노출 여부

## 5. 검증 결과

### 정적 검사

- `perpackage-category.js` 문법 검사 통과
- `perpackage-product.js` 문법 검사 통과
- 공개 폴더 내 관리자 관련 금지 문자열 검색 결과 없음
- `shopping-bag` 매핑에 `cate_no=45` URL 반영 확인
- `shopping-bag` 매핑에 `ready` 상태 반영 확인

### 브라우저 로드 검증

Chrome headless 기준으로 아래 URL을 확인했습니다.

- `category.html?category=shopping-bag`
  - 페이지 제목: `쇼핑백 | 페르패키지`
  - H1: `쇼핑백`
  - 상품 카드 4개 렌더링 확인
  - PC 1440px 가로 overflow 없음
  - 콘솔 오류 없음

- `category.html?category=shopping-bag&search=로고&print=로고인쇄상담`
  - 검색어 `로고` 복원 확인
  - 인쇄 필터 `로고인쇄상담` 복원 확인
  - 상품 카드 3개 렌더링 확인
  - 모바일 390px 가로 overflow 없음
  - 콘솔 오류 없음

- `product.html?category=shopping-bag&product=plain-shopping-bag`
  - 페이지 제목: `무지 쇼핑백 | 페르패키지`
  - H1: `무지 쇼핑백`
  - 모바일 390px 가로 overflow 없음
  - 콘솔 오류 없음

## 6. 운영 메모

- 현재 Cafe24 고객용 URL은 데이터 필드에만 반영되어 있습니다.
- 고객 화면에서 Cafe24 상품분류로 직접 이동시키는 버튼은 아직 추가하지 않았습니다.
- 다른 카테고리 URL이 확인되면 같은 방식으로 `cafe24CategoryMappings`에만 먼저 반영하면 됩니다.
- 상품별 상세 URL이 별도로 확인되면 각 상품 데이터의 `cafe24ProductUrl`에 반영하는 것이 좋습니다.

## 7. 다음 작업

- 다른 카테고리의 Cafe24 고객용 상품분류 URL 확인
- 쇼핑백 4개 상품 각각의 Cafe24 고객용 상품상세 URL 확인
- Cafe24 URL을 고객 화면에 버튼으로 노출할지 여부 결정
- 운영 전 전체 카테고리/상품 링크 QA 재진행
