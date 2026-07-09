# 페르패키지 Cafe24 운영 URL 1차 반영 보고서

작성일: 2026-06-25

## 1. 이번 작업 목적

확인된 Cafe24 고객용 운영 URL을 현재 개발 중인 페르패키지 정적 홈페이지의 데이터와 링크에 1차 반영했습니다.

이번 작업은 전체 홈페이지 구조를 다시 만드는 작업이 아니라, 기존 메인/카테고리/상품상세/FAQ/고객센터/퀵메뉴 흐름을 유지하면서 확인된 고객용 URL만 안전하게 연결하는 작업입니다.

## 2. 수정한 파일

- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/category.html`
- `perpackage-vercel-public/product.html`
- `perpackage-vercel-public/faq.html`
- `perpackage-vercel-public/support.html`
- `perpackage-vercel-public/perpackage-category.js`
- `perpackage-vercel-public/perpackage-product.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`

## 3. 반영한 Cafe24 상품분류 URL 목록

### 카테고리 직접 매핑

| key | label | URL | status |
|---|---|---|---|
| `rigid-box` | 싸바리박스 | `https://peerl.cafe24.com/product/list.html?cate_no=64` | ready |
| `shopping-bag` | 쇼핑백 | `https://peerl.cafe24.com/product/list.html?cate_no=45` | ready |
| `business-card` | 명함 | `https://peerl.cafe24.com/product/list.html?cate_no=43` | ready |
| `envelope-sleeve` | 봉투 | `https://peerl.cafe24.com/product/list.html?cate_no=42` | ready |
| `dust-bag` | 더스트백 | `https://peerl.cafe24.com/product/list.html?cate_no=46` | ready |
| `accessories` | 부자재 | `https://peerl.cafe24.com/product/list.html?cate_no=54` | ready |
| `cafe-supplies` | 카페용품 | `https://peerl.cafe24.com/product/list.html?cate_no=87` | ready |
| `design-request` | 디자인의뢰 | `https://peerl.cafe24.com/product/list.html?cate_no=95` | ready |

### 패키지 하위 분류 보조 매핑

`box` 카테고리는 현재 개발 페이지에서 “패키지” 대표 카테고리로 쓰이고 있어, 한 URL로 덮어쓰지 않고 하위 분류 보조 매핑으로 보존했습니다.

| parent key | sub key | label | URL | status |
|---|---|---|---|---|
| `box` | `premium-gift-package` | 고급 선물 패키지 | `https://peerl.cafe24.com/product/list.html?cate_no=63` | ready |
| `box` | `single-box` | 단박스 | `https://peerl.cafe24.com/product/list.html?cate_no=65` | ready |
| `box` | `button-box` | 단추박스 | `https://peerl.cafe24.com/product/list.html?cate_no=68` | ready |

## 4. 반영한 회원/마이쇼핑/게시판/정책 URL 목록

| 용도 | URL | 반영 위치 |
|---|---|---|
| 마이페이지 | `https://peerl.cafe24.com/myshop/index.html` | `support.html` 마이페르패키지 카드 |
| 로그인 | `https://peerl.cafe24.com/member/login.html` | `index.html`, `category.html`, `product.html`, `support.html` |
| 아이디 찾기 | `https://peerl.cafe24.com/member/id/find_id.html` | `support.html` 회원관리 카드 |
| 비밀번호 찾기 | `https://peerl.cafe24.com/member/passwd/find_passwd_info.html` | `support.html` 회원관리 카드 |
| 장바구니 | `https://peerl.cafe24.com/order/basket.html` | `index.html` 모바일 장바구니, `support.html` 마이페르패키지 카드 |
| 게시판 메인 | `https://peerl.cafe24.com/board/index.html` | `support.html` 게시판 이동 |
| 상품 Q&A 목록 | `https://peerl.cafe24.com/board/product/list.html?board_no=6` | `support.html`, `product.html`, 푸터 일부 |
| 상품 Q&A 작성 | `https://peerl.cafe24.com/board/product/write.html?board_no=6` | `support.html` 일반 상품문의 작성 |
| 이용약관 | `https://peerl.cafe24.com/_wg/import/agreement.html` | 주요 페이지 푸터 |
| 개인정보처리방침 | `https://peerl.cafe24.com/member/privacy.html` | 주요 페이지 푸터 |

## 5. Pluuug 견적문의 유지 내용

맞춤제작 견적문의 흐름은 그대로 유지했습니다.

- `index.html#quote`
- Pluuug iframe URL: `https://www.pluuug.com/form/TrPLMjXdJ1`
- 상품 상세 견적문의 CTA
- 카테고리 견적문의 CTA
- 고객센터 견적문의 CTA
- 공통 퀵메뉴 견적문의

상품 Q&A는 일반 상품문의 용도로만 연결했고, 맞춤제작 견적문의 대체로 사용하지 않았습니다.

## 6. support.html 보강 내용

- 마이페르패키지 카드에 마이페이지, 로그인, 장바구니, 주문/배송 조회 안내, 상품문의 내역 안내, 회원정보 관련 안내를 연결했습니다.
- 회원관리 카드에 로그인, 아이디 찾기, 비밀번호 찾기, 마이페이지 바로가기를 추가했습니다.
- 상품 Q&A 미리보기 영역을 Cafe24 고객용 상품 Q&A 목록과 작성 페이지로 연결했습니다.
- 게시판 메인 링크를 고객센터 공지사항과 푸터에 추가했습니다.
- 견적문의, 소량·샘플 제작, 로고 인쇄 상담은 계속 Pluuug 견적문의 흐름으로 유지했습니다.

## 7. 아직 확인이 필요한 항목

- 상하박스 URL
- C형박스 URL
- 대표 상품 상세 URL
- 카카오톡 또는 채널톡 실제 링크
- 세금계산서, 현금영수증, 거래명세서 처리 URL 또는 운영 방식
- 사업자등록증/통장사본 최신 파일 및 공개 여부
- Cafe24 스마트디자인 실제 삽입 파일 위치

## 8. 건드리지 않은 기존 구조

- `category.html` 검색, 필터, 정렬 UI
- URL query state sync
- `product.html` 상담형 상세 구조
- `faq.html` 독립 FAQ 검색/필터/아코디언 구조
- `perpackage-common.js` 공통 우측 퀵메뉴와 모바일 퀵바
- `index.html#quote` Pluuug 견적문의 iframe 구조
- 상품별 Cafe24 상세 URL 필드

상품별 상세 URL은 아직 확인되지 않았으므로 임의 생성하지 않았습니다.

## 9. 검증 결과

- 주요 JS 문법 검사 통과
- 확인된 Cafe24 상품분류 URL 11개가 데이터에 반영됨
- 상품별 상세 URL은 임의 생성하지 않음
- 고객용 회원/마이쇼핑/게시판/정책 링크 반영 확인
- 견적문의 CTA가 상품 Q&A 작성 페이지로 바뀌지 않음
- PC 1440px 주요 페이지 정상 로드
- 모바일 390px 주요 페이지 가로 overflow 없음
- 검색/필터 query 복원 확인
- 콘솔 오류 없음
- 고객 화면 본문에 개발용 확인 문구 노출 없음
- 운영자 전용 경로 패턴 노출 없음
- 구매/가격 확정형 금지 문구 추가 없음

## 10. 다음 작업 제안

1. Cafe24에서 상하박스, C형박스 고객용 분류 URL 확인
2. 대표 상품별 Cafe24 고객용 상세 URL 확인
3. 상품 상세 페이지에 “Cafe24 상품 보기” 버튼을 노출할지 결정
4. 카카오톡 또는 채널톡 운영 링크 확정
5. Cafe24 스마트디자인 삽입 위치와 실제 스킨 CSS 충돌 여부 확인
6. 운영 도메인 기준 전체 링크 클릭 QA 재진행
