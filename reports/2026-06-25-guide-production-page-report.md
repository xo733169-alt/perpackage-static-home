# 페르패키지 제작가이드 상세페이지 작업 보고서

작성일: 2026-06-25

## 1. 작업 목적

기존 `support.html`, `faq.html`, `blog.html` 등에 흩어져 있던 패키지 제작 안내를 별도 상세페이지로 분리했습니다.

새 페이지는 고객이 문의 전에 제작 흐름과 준비사항을 한눈에 확인할 수 있도록 안내형 페이지로 구성했습니다. 실제 주문조회, 결제, 회원정보, 주문 상태 데이터 기능은 추가하지 않았고, 견적문의는 기존 Pluuug 견적문의 흐름인 `index.html#quote`를 유지했습니다.

## 2. 새로 만든 파일

- `perpackage-vercel-public/guide-production.html`

## 3. 수정한 기존 파일

- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/category.html`
- `perpackage-vercel-public/product.html`
- `perpackage-vercel-public/faq.html`
- `perpackage-vercel-public/support.html`
- `perpackage-vercel-public/perpackage-main-renewal.js`
- `perpackage-vercel-public/perpackage-category.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`

## 4. 제작가이드 페이지 구성

`guide-production.html`은 아래 섹션으로 구성했습니다.

1. 공통 헤더
   - 홈, 상품목록, 제작가이드, FAQ, 고객센터, 견적문의 링크 제공

2. 히어로 영역
   - 제목: 패키지 제작가이드
   - 견적문의하기, 상품 둘러보기, FAQ 보기 CTA 제공

3. 제작 전체 흐름
   - 제작 문의
   - 사양 정리
   - 견적 안내
   - 디자인/칼선 확인
   - 샘플 또는 제작 진행
   - 검수 및 납품

4. 제작 전 준비사항
   - 제품 사이즈
   - 제작 수량
   - 패키지 용도
   - 원하는 박스 구조
   - 인쇄 여부
   - 디자인 파일 보유 여부
   - 납품 희망 일정
   - 참고 이미지 또는 기존 샘플

5. 패키지 종류별 제작 포인트
   - 단상자
   - 싸바리박스
   - 쇼핑백
   - 봉투
   - 스티커·라벨
   - 카페용품
   - 디자인의뢰

6. 제작 기간 안내
   - 디자인 컨펌 이후 기준
   - 수량, 재질, 인쇄, 후가공, 샘플 여부에 따라 달라질 수 있다는 안내 유지

7. 처음 제작할 때 많이 헷갈리는 부분
   - 제품 사이즈와 박스 사이즈 차이
   - 인쇄 색상 차이
   - 칼선 파일과 디자인 파일의 역할
   - 소량 제작 제한 가능성
   - 촉박한 일정에서 후가공 제한 가능성
   - 최종 견적 안내 흐름

8. 하단 CTA
   - 견적문의하기: `index.html#quote`
   - 디자인 파일 가이드 보기: `guide-design.html`
   - 제작주의사항 보기: `guide-caution.html`

## 5. 추가한 링크

아래 위치의 제작가이드 링크를 `guide-production.html`로 연결했습니다.

- `index.html`
  - 상단 유틸 메뉴
  - UPDATE PERPACKAGE 더보기
  - 고객센터 허브의 제작가이드 카드
  - 푸터 제작가이드 링크

- `category.html`
  - 상단 유틸 메뉴
  - 우측 아이콘 메뉴
  - 카테고리 메뉴
  - 푸터 제작가이드 링크

- `product.html`
  - 상단 유틸 메뉴
  - 우측 아이콘 메뉴
  - 카테고리 메뉴
  - FAQ 하단 관련 가이드 링크
  - 푸터 제작가이드 링크

- `faq.html`
  - 상단 메뉴
  - 하단 메뉴

- `support.html`
  - 상단 메뉴
  - 고객센터 허브 메뉴
  - 푸터 제작가이드 링크

- `perpackage-main-renewal.js`
  - 상단 아이콘 메뉴 데이터
  - 카테고리 메뉴 데이터
  - 빠른 메뉴 데이터
  - 메인 배너/가이드 카드 데이터

- `perpackage-category.js`
  - 카테고리 페이지 안내 링크 카드

## 6. 기존 구조를 건드리지 않은 항목

- `index.html#quote` Pluuug 견적문의 흐름
- Pluuug iframe URL
- Cafe24 상품 Q&A 링크
- 공통 우측 퀵메뉴와 모바일 퀵바
- 검색, 필터, 정렬 기능
- 카테고리 페이지 query 구조
- 상품 상세페이지 query 구조
- FAQ 검색, 필터, 아코디언 기능
- Cafe24 회원/주문/결제 데이터 기능

## 7. 검증 결과

### 정적 검사

- JS 구문 검사 통과
  - `perpackage-main-renewal.js`
  - `perpackage-category.js`
- 금지 표현 추가 없음
- 고객 화면 노출 금지 문구 추가 없음
- Cafe24 운영자 전용 경로 노출 없음
- 상품 Q&A를 견적문의 대체 흐름으로 사용하지 않음

### 브라우저 QA

Chrome Headless 기준으로 아래 페이지를 확인했습니다.

- `guide-production.html`
- `index.html`
- `category.html?category=shopping-bag`
- `product.html?category=box&product=basic-white-box`
- `faq.html`
- `support.html`

확인 결과:

- `guide-production.html` 정상 로드
- PC 1440px에서 제작가이드 페이지 정상 표시
- 모바일 390px에서 제작가이드 페이지 가로 overflow 없음
- 기존 index/category/product/faq/support 페이지 정상 로드
- 모바일 390px에서 기존 주요 페이지 가로 overflow 없음
- 콘솔 오류 없음
- 고객 화면에 `TODO`, `placeholder`, `미구현`, `임시 데이터` 문구 노출 없음
- 금지 표현 노출 없음
- 견적문의 링크는 `index.html#quote` 흐름 유지

## 8. 다음 작업 제안

1. `guide-design.html` 디자인 파일 가이드 페이지 제작
2. `guide-caution.html` 제작주의사항 페이지 제작
3. Cafe24 적용 시 제작가이드 URL을 운영 경로로 전환
4. FAQ에서 제작가이드 관련 질문을 새 페이지와 더 촘촘하게 연결
5. 상품 상세페이지에서 상품 유형별 관련 가이드 링크를 조건부로 노출

