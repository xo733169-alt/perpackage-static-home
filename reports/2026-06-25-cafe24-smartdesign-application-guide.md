# 페르패키지 Cafe24 스마트디자인 적용 가이드

작성일: 2026-06-25

## 1. 이번 작업 목적

현재 정적 HTML/CSS/JS로 개발된 페르패키지 홈페이지를 Cafe24 스마트디자인에 옮길 때 사용할 수 있도록, 기존 미리보기 페이지는 유지하면서 별도 삽입용 스니펫과 적용 기준을 정리했습니다.

이번 작업은 새 디자인 제작이 아니라 Cafe24 적용 준비 작업입니다.

## 2. 기존 정적 홈페이지와 Cafe24 삽입용 스니펫의 차이

기존 정적 홈페이지:

- `index.html`, `category.html`, `product.html`, `faq.html`, `support.html`, 가이드 페이지를 로컬 또는 정적 호스팅에서 그대로 열 수 있는 완성형 페이지입니다.
- 자체 헤더, 푸터, 공통 퀵메뉴, 페이지별 JS를 포함합니다.
- 로컬 미리보기와 Vercel Preview 검증에 적합합니다.

Cafe24 삽입용 스니펫:

- Cafe24 스마트디자인 본문 영역 안에 붙이는 조각 파일입니다.
- 최상위 문서 태그를 포함하지 않습니다.
- Cafe24 기본 헤더, 푸터, 상품목록, 게시판, 마이쇼핑 모듈을 덮어쓰지 않도록 `.pp-cafe24` wrapper 기준으로 작성했습니다.
- 확정된 고객용 Cafe24 URL은 공통 JS 설정에서 관리합니다.

## 3. 생성한 cafe24-snippets 파일 목록

- `cafe24-snippets/cafe24-main-snippet.html`
- `cafe24-snippets/cafe24-support-snippet.html`
- `cafe24-snippets/cafe24-guide-production-snippet.html`
- `cafe24-snippets/cafe24-guide-design-snippet.html`
- `cafe24-snippets/cafe24-guide-caution-snippet.html`
- `cafe24-snippets/cafe24-common-css.css`
- `cafe24-snippets/cafe24-common-js.js`

## 4. Cafe24에 붙일 때 사용할 파일

1. 공통 CSS
   - `cafe24-common-css.css`
   - Cafe24 스킨 공통 CSS 또는 해당 페이지 CSS 삽입 영역에 추가합니다.

2. 공통 JS
   - `cafe24-common-js.js`
   - 페이지 하단 공통 스크립트 영역 또는 해당 스니펫이 들어가는 페이지에 추가합니다.

3. 페이지 본문 스니펫
   - 메인 영역: `cafe24-main-snippet.html`
   - 고객센터 영역: `cafe24-support-snippet.html`
   - 제작가이드: `cafe24-guide-production-snippet.html`
   - 디자인가이드: `cafe24-guide-design-snippet.html`
   - 제작주의사항: `cafe24-guide-caution-snippet.html`

## 5. Cafe24에 붙이면 안 되는 파일

아래 파일은 로컬 미리보기와 정적 배포용 전체 페이지이므로, Cafe24 본문 영역에 그대로 붙이지 않는 편이 안전합니다.

- `index.html`
- `category.html`
- `product.html`
- `faq.html`
- `support.html`
- `guide-production.html`
- `guide-design.html`
- `guide-caution.html`
- `blog.html`

위 파일 전체를 붙이면 Cafe24 기본 헤더, 푸터, 스킨 CSS와 중복될 수 있습니다.

## 6. CSS 충돌 방지 기준

현재 전체 미리보기용 `perpackage-main-renewal.css`에는 로컬 페이지 기준 전역 스타일이 있습니다.

확인된 전역 선택자:

- 기본 문서, 링크, 버튼, 이미지 관련 초기화
- 페이지 전체 배경과 기본 글꼴

Cafe24 적용용 CSS에서는 아래 기준으로 별도 정리했습니다.

- `.pp-cafe24` wrapper 내부에서만 작동
- Cafe24 기본 상품목록, 게시판, 장바구니, 마이쇼핑 영역을 직접 조작하지 않음
- reset CSS를 새로 넣지 않음
- body 전체 배경이나 폰트 강제 적용 없음
- 공통 카드, 버튼, 섹션, 가이드 UI만 최소 정의

## 7. JS 충돌 방지 기준

`cafe24-common-js.js`는 아래 원칙으로 작성했습니다.

- IIFE 구조로 실행 범위를 제한
- `window.PP_CAFE24`, `window.PP_CAFE24_LINKS`, `window.PP_CAFE24_CATEGORY_URLS`, `window.PP_CAFE24_SUB_CATEGORY_URLS`만 명시적으로 노출
- DOM 요소가 없으면 조용히 종료
- 같은 파일이 두 번 로드되어도 링크 적용만 다시 실행
- 견적문의 링크는 `quote` key로 분리해 Pluuug 흐름을 유지
- 상품 Q&A 작성 URL은 일반 상품문의 용도로만 설정

## 8. 이미지/문서 경로 확인 필요 항목

현재 로컬 기준 주요 경로:

- `assets/icons/new/`
- `assets/shop-photos/`
- `assets/shop-thumbs/`
- `assets/documents/`
- `images/banners/`
- `assets/rolling-banners/`

Cafe24 적용 시 확인할 항목:

- 이미지 업로드 폴더 경로
- 문서 파일 업로드 위치
- 사업자등록증 최신 파일 여부
- 통장사본 최신 파일 여부
- 스니펫 내부 상대경로가 Cafe24 페이지 위치에서도 유지되는지 여부

실제 업로드 경로가 확정되기 전까지는 로컬 경로를 임의 변경하지 않았습니다.

## 9. Cafe24 고객용 URL 반영 현황

공통 링크 설정:

| 용도 | URL |
|---|---|
| 마이페이지 | `https://peerl.cafe24.com/myshop/index.html` |
| 로그인 | `https://peerl.cafe24.com/member/login.html` |
| 아이디 찾기 | `https://peerl.cafe24.com/member/id/find_id.html` |
| 비밀번호 찾기 | `https://peerl.cafe24.com/member/passwd/find_passwd_info.html` |
| 장바구니 | `https://peerl.cafe24.com/order/basket.html` |
| 게시판 메인 | `https://peerl.cafe24.com/board/index.html` |
| 상품 Q&A 목록 | `https://peerl.cafe24.com/board/product/list.html?board_no=6` |
| 상품 Q&A 작성 | `https://peerl.cafe24.com/board/product/write.html?board_no=6` |
| 이용약관 | `https://peerl.cafe24.com/_wg/import/agreement.html` |
| 개인정보처리방침 | `https://peerl.cafe24.com/member/privacy.html` |

상품분류 URL:

| 분류 | URL | 상태 |
|---|---|---|
| 싸바리박스 | `https://peerl.cafe24.com/product/list.html?cate_no=64` | ready |
| 쇼핑백 | `https://peerl.cafe24.com/product/list.html?cate_no=45` | ready |
| 명함 | `https://peerl.cafe24.com/product/list.html?cate_no=43` | ready |
| 봉투 | `https://peerl.cafe24.com/product/list.html?cate_no=42` | ready |
| 더스트백 | `https://peerl.cafe24.com/product/list.html?cate_no=46` | ready |
| 부자재 | `https://peerl.cafe24.com/product/list.html?cate_no=54` | ready |
| 카페용품 | `https://peerl.cafe24.com/product/list.html?cate_no=87` | ready |
| 디자인의뢰 | `https://peerl.cafe24.com/product/list.html?cate_no=95` | ready |
| 고급 선물 패키지 | `https://peerl.cafe24.com/product/list.html?cate_no=63` | ready |
| 단박스 | `https://peerl.cafe24.com/product/list.html?cate_no=65` | ready |
| 단추박스 | `https://peerl.cafe24.com/product/list.html?cate_no=68` | ready |

`box` 대표 카테고리는 여러 하위 분류를 포함하므로 하나의 URL로 덮지 않고 보조 매핑으로 유지합니다.

## 10. Pluuug 견적문의 유지 방식

견적문의는 계속 아래 흐름을 유지합니다.

- `index.html#quote`
- Pluuug iframe URL: `https://www.pluuug.com/form/TrPLMjXdJ1`

Cafe24 상품 Q&A는 일반 상품문의 용도이며, 맞춤제작 견적문의의 대체 링크로 사용하지 않습니다.

## 11. 상품 Q&A와 견적문의 역할 구분

상품 Q&A:

- 일반 상품문의
- 상품 정보 질문
- 운영 쇼핑몰 게시판 확인

견적문의:

- 맞춤제작 상담
- 수량, 사이즈, 재질, 인쇄, 후가공 확인
- Pluuug iframe 또는 `index.html#quote` 흐름 유지

## 12. 아직 Cafe24 관리자에서 확인해야 할 항목

- 스마트디자인 메인 본문 삽입 위치
- 공통 헤더 파일 위치
- 공통 푸터 파일 위치
- 상품분류 페이지 HTML 위치
- 상품상세 페이지 HTML 위치
- 게시판 페이지 HTML 위치
- 마이쇼핑 페이지 HTML 위치
- 이미지 업로드 폴더
- 상하박스 고객용 URL
- C형박스 고객용 URL
- 상품 상세 고객용 URL
- 카카오톡 또는 채널톡 실제 링크
- 세금계산서, 현금영수증, 거래명세서 운영 방식
- Pluuug iframe이 운영 도메인에서 정상 표시되는지 여부

## 13. 실제 적용 전 체크리스트

- 테스트 스킨 또는 복제 스킨에서 먼저 적용
- `cafe24-common-css.css` 삽입 위치 확인
- `cafe24-common-js.js` 삽입 위치 확인
- 스니펫 본문이 중복 헤더/푸터를 만들지 않는지 확인
- 이미지와 문서 상대경로 확인
- 견적문의 링크가 Pluuug 흐름으로 유지되는지 확인
- 상품 Q&A 링크가 일반 상품문의로만 쓰이는지 확인
- 운영자 전용 경로 패턴이 고객 화면에 보이지 않는지 확인
- 제한 표현이 고객 화면에 추가되지 않았는지 확인

## 14. 적용 후 QA 체크리스트

- PC 메인 화면 표시
- 모바일 390px 가로 overflow 없음
- 고객센터 스니펫 표시
- 제작가이드 스니펫 표시
- 디자인가이드 스니펫 표시
- 제작주의사항 스니펫 표시
- 상품분류 링크 이동
- 마이페이지, 로그인, 장바구니 링크 이동
- 상품 Q&A 목록 링크 이동
- 견적문의 링크 이동
- 사업자등록증 새 창 열림
- 통장사본 새 창 열림
- 콘솔 오류 없음
- 고객 화면에 개발용 확인 문구가 보이지 않음
