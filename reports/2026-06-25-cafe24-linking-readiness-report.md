# 페르패키지 Cafe24 연결 대기 점검 보고서

작성일: 2026-06-25

## 1. 점검 목적

고객센터 `support.html`과 카테고리/상품 데이터가 운영 전 점검에 적합한 상태인지 확인했습니다.

이번 점검은 Cafe24 실제 상품 연결 기능을 만드는 작업이 아니라, 운영 URL이 확정되면 빠르게 연결할 수 있도록 데이터 필드와 고객 화면 노출 상태를 정리하는 작업입니다.

## 2. Cafe24 연결 준비 필드

카테고리와 상품 데이터에는 아래 필드를 기준으로 연결 대기 상태를 관리합니다.

- `cafe24CategoryUrl`: 고객이 접근할 Cafe24 상품분류 URL
- `cafe24ProductUrl`: 고객이 접근할 Cafe24 상품상세 URL
- `cafe24Status`: 연결 상태값
- `cafe24Memo`: 운영자가 확인할 연결 메모

현재 원칙:

- 실제 고객용 URL이 확정되기 전까지 URL 필드는 빈 값으로 유지합니다.
- 상태값은 `pending`으로 둡니다.
- 관리자용 URL은 고객 화면 데이터에 넣지 않습니다.
- 고객 화면에는 `cafe24*` 필드가 렌더링되지 않습니다.

## 3. 카테고리별 연결 상태

카테고리 데이터 기준 14개 카테고리를 확인했습니다.

| key | 카테고리 | 상품 수 | 상태 | URL |
| --- | --- | ---: | --- | --- |
| `box` | 패키지 | 11 | pending | 비어 있음 |
| `delivery-box` | 택배박스 | 3 | pending | 비어 있음 |
| `shopping-bag` | 쇼핑백 | 4 | pending | 비어 있음 |
| `envelope-sleeve` | 봉투·슬리브 | 3 | pending | 비어 있음 |
| `sticker-label` | 스티커·라벨 | 4 | pending | 비어 있음 |
| `gift-box` | 선물상자 | 3 | pending | 비어 있음 |
| `small-sample` | 샘플·소량 | 4 | pending | 비어 있음 |
| `logo-print` | 로고인쇄 | 4 | pending | 비어 있음 |
| `rigid-box` | 싸바리박스 | 4 | pending | 비어 있음 |
| `business-card` | 명함 | 4 | pending | 비어 있음 |
| `dust-bag` | 더스트백 | 4 | pending | 비어 있음 |
| `accessories` | 부자재 | 5 | pending | 비어 있음 |
| `cafe-supplies` | 카페용품 | 5 | pending | 비어 있음 |
| `design-request` | 디자인의뢰 | 5 | pending | 비어 있음 |

점검 결과:

- 카테고리 준비 필드 누락 없음
- `cafe24CategoryUrl` 입력된 항목 없음
- 14개 모두 `pending`

## 4. 상품 목록 데이터 연결 상태

`perpackage-category.js`의 카테고리 상품 목록 기준:

- 총 상품 수: 63개
- `cafe24ProductUrl` 입력된 상품: 0개
- `pending` 상태 상품: 63개
- 준비 필드 누락 상품: 0개

## 5. 상품 상세 데이터 연결 상태

`perpackage-product.js`의 상품 상세 기준:

- 총 상품 상세 수: 40개
- `cafe24ProductUrl` 입력된 상품: 0개
- `pending` 상태 상품: 40개
- 준비 필드 누락 상품: 0개

상품 상세 대표 목록:

| category | product | 상품명 | 상태 |
| --- | --- | --- | --- |
| `box` | `basic-white-box` | 기본 흰색 단상자 | pending |
| `delivery-box` | `kraft-delivery-box` | 크라프트 택배박스 | pending |
| `shopping-bag` | `plain-shopping-bag` | 무지 쇼핑백 | pending |
| `envelope-sleeve` | `ready-sleeve` | 기성 슬리브 | pending |
| `sticker-label` | `logo-sticker` | 로고 스티커 | pending |
| `gift-box` | `basic-gift-box` | 기본 선물상자 | pending |
| `small-sample` | `sample-package-set` | 샘플 패키지 세트 | pending |
| `logo-print` | `logo-print-shopping-bag` | 로고 인쇄 쇼핑백 | pending |
| `rigid-box` | `top-bottom-rigid-box` | 상하 분리형 싸바리박스 | pending |
| `business-card` | `basic-business-card` | 기본 명함 | pending |
| `dust-bag` | `basic-dust-bag` | 기본 더스트백 | pending |
| `accessories` | `package-cushion` | 완충재 | pending |
| `cafe-supplies` | `dessert-package-box` | 디저트 포장박스 | pending |
| `design-request` | `package-dieline-design` | 패키지 도면 설계 | pending |

## 6. 고객 화면 노출 점검

아래 주요 파일에서 관리자용 URL 패턴 노출 여부를 점검했습니다.

- `index.html`
- `category.html`
- `product.html`
- `faq.html`
- `support.html`
- `blog.html`
- `perpackage-common.js`
- `perpackage-category.js`
- `perpackage-product.js`
- `perpackage-main-renewal.js`

점검 결과:

- 고객 화면에 관리자용 URL 노출 없음
- 미확정 URL이 버튼으로 노출된 항목 없음
- `TODO` 주석은 HTML 주석 또는 JS 주석으로만 남아 화면에는 보이지 않음
- Cafe24 연결 대기 데이터는 고객 화면에 렌더링되지 않음

## 7. 실제 연결에 필요한 고객용 URL

운영 연결 시 아래 URL이 필요합니다.

카테고리 URL:

- 패키지 상품분류 URL
- 택배박스 상품분류 URL
- 쇼핑백 상품분류 URL
- 봉투·슬리브 상품분류 URL
- 스티커·라벨 상품분류 URL
- 선물상자 상품분류 URL
- 샘플·소량 상품분류 URL
- 로고인쇄 상품분류 URL
- 싸바리박스 상품분류 URL
- 명함 상품분류 URL
- 더스트백 상품분류 URL
- 부자재 상품분류 URL
- 카페용품 상품분류 URL
- 디자인의뢰 상품분류 URL

상품 URL:

- 현재 상품 상세 데이터 40개에 대응하는 고객용 상품상세 URL

고객센터 URL:

- 공지사항 게시판 URL
- FAQ 게시판 또는 FAQ 페이지 URL
- 상품 Q&A 게시판 URL
- 회원 관련 안내 URL
- 주문/영수증 확인 안내 URL
- 배송 안내 URL
- 취소/반품/교환 안내 URL
- 개인정보처리방침 URL

상담 URL:

- 카카오톡 또는 ChannelTalk 실제 상담 URL
- Pluuug iframe UTM 수집 스크립트 또는 정식 임베드 코드

## 8. URL 입력 위치

카테고리 URL:

- `perpackage-category.js` 상단 `cafe24CategoryMappings`
- `perpackage-product.js` 상단 `cafe24CategoryMappings`

상품 URL:

- `perpackage-category.js`의 개별 상품 데이터 또는 필터 데이터 병합 후 `cafe24ProductUrl`
- `perpackage-product.js`의 `productDetailData` 또는 `createProductDetail` 호출 config

고객센터 URL:

- `support.html`의 공지사항, FAQ, 상품 Q&A, 개인정보처리방침 링크
- 필요 시 `index.html`, `category.html`, `product.html`, `faq.html`, `blog.html`의 공통 메뉴 링크

상담 URL:

- `perpackage-common.js`의 카톡상담 항목
- `index.html`에 남아 있는 기존 퀵메뉴 항목

## 9. Cafe24 적용 시 주의사항

- 고객 화면에는 관리자용 주소를 넣지 않습니다.
- Cafe24 상품분류와 상품상세의 고객용 URL만 사용합니다.
- URL 확정 전에는 빈 값과 `pending` 상태를 유지합니다.
- Cafe24 스킨에 삽입할 경우 기존 쇼핑몰 CSS와 JS가 영향을 줄 수 있으므로 실제 페이지에서 computed style과 모바일 overflow를 다시 확인합니다.
- 공지사항, FAQ, 상품 Q&A는 게시판 URL이 확정되기 전까지 현재처럼 안내형 링크로 유지합니다.

## 10. 다음 작업

1. Cafe24 고객용 상품분류 URL 확정
2. Cafe24 고객용 상품상세 URL 확정
3. 고객센터 게시판 URL 확정
4. 개인정보처리방침 URL 확정
5. 카카오톡 또는 ChannelTalk 상담 URL 확정
6. 확정 URL을 데이터 필드와 고객센터 링크에 반영
7. 실제 Cafe24 또는 운영 도메인에서 PC/모바일 QA 재진행

## 11. support.html 보강 요약

고객센터 메뉴를 운영 전 점검 구조로 정리했습니다.

- 자주 묻는 질문 - FAQ: `#support-faq`
- 공지사항: `#support-notice`
- 회원관리: `#support-member`
- 주문/결제/영수증: `#support-order`
- 배송/상품/상품평: `#support-delivery`
- 취소/반품/교환: `#support-cancel`
- 상품문의: `#support-qna`
- 제작가이드: `#support-guide`
- 디자인가이드: `#support-design`
- 제작주의사항: `#support-caution`
- 견적문의: `index.html#quote`

안내형으로 처리한 미구현 항목:

- 회원가입, 로그인, 정보 수정
- 주문/결제/영수증 확인
- 배송 일정과 배송 방식 확인
- 상품평
- 취소/반품/교환 정책 상세
- 상품 Q&A 게시판
- 공지사항 게시판

위 항목은 실제 기능처럼 보이지 않도록 안내 문구로 유지했습니다.

## 12. QA 결과

로컬 정적 서버와 Chrome headless 기준으로 확인했습니다.

확인 URL:

- `index.html`
- `category.html?category=box`
- `category.html?category=rigid-box`
- `category.html?category=business-card`
- `category.html?category=cafe-supplies`
- `product.html?category=box&product=basic-white-box`
- `faq.html`
- `support.html`
- `blog.html`

검증 결과:

- `support.html` 정상 로드
- `support.html` 내부 앵커 10개 존재 확인
- `support.html` 모바일 390px 가로 overflow 없음
- 고객센터 메뉴 11개 표시
- 상품 Q&A 미리보기 4개 표시
- 공통 퀵메뉴 PC/모바일 표시
- 견적문의, 이용안내, 서류 링크 노출 정상
- 모바일 TOP 버튼 클릭 시 최상단 이동 정상
- 로컬 내부 링크 404 없음
- 이미지 경로 누락 없음
- 콘솔 오류 없음
- 고객 화면 본문에 TODO 문구 노출 없음
- 고객 화면 본문에 관리자용 URL 패턴 노출 없음
- 요청된 금지 표현 없음
