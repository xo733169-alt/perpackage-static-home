# GPT 보고용: 페르패키지 Cafe24 스마트디자인 적용 준비 결과

작성일: 2026-06-25

## 1. 작업 목적

페르패키지 정적 홈페이지를 Cafe24 스마트디자인에 적용할 수 있도록 별도 삽입용 스니펫 구조와 적용 가이드, 사전 체크리스트를 정리했습니다.

이번 작업은 기존 메인, 카테고리, 상품상세, FAQ, 고객센터, 가이드 페이지를 다시 만드는 작업이 아니라, Cafe24 스킨에 붙일 수 있는 별도 산출물을 준비하는 작업입니다.

## 2. 기존 페이지 유지 여부

아래 기존 페이지는 로컬 미리보기 및 정적 배포용으로 유지했습니다.

- `index.html`
- `category.html`
- `product.html`
- `faq.html`
- `support.html`
- `guide-production.html`
- `guide-design.html`
- `guide-caution.html`
- `blog.html`

기존 페이지의 검색, 필터, 정렬, 상품 상세, FAQ, 가이드, 견적문의 흐름은 변경하지 않았습니다.

## 3. 새로 만든 Cafe24 삽입용 폴더

폴더:

- `perpackage-vercel-public/cafe24-snippets/`

생성 파일:

- `cafe24-main-snippet.html`
- `cafe24-support-snippet.html`
- `cafe24-guide-production-snippet.html`
- `cafe24-guide-design-snippet.html`
- `cafe24-guide-caution-snippet.html`
- `cafe24-common-css.css`
- `cafe24-common-js.js`

## 4. 스니펫 구성 기준

- 스니펫에는 `html`, `head`, `body` 태그를 넣지 않았습니다.
- Cafe24 스마트디자인의 본문 영역 안에 붙이는 구조로 작성했습니다.
- 클래스는 `pp-cafe24` wrapper 기준으로 구성했습니다.
- Cafe24 기본 헤더, 푸터, 상품목록, 게시판, 마이쇼핑 스타일을 직접 덮어쓰지 않도록 했습니다.
- 기존 전체 CSS를 그대로 복사하지 않고, Cafe24 적용용 최소 공통 CSS만 별도 작성했습니다.

## 5. Cafe24 공통 CSS 정리 내용

파일:

- `cafe24-common-css.css`

정리 기준:

- `.pp-cafe24` 내부에서만 작동
- body, html, reset 계열 전역 제어 없음
- 카드, 버튼, 섹션, 가이드 UI 중심 최소 스타일
- 모바일 390px 대응
- Cafe24 기본 스킨 CSS와 충돌 가능성을 낮추는 방향으로 작성

## 6. Cafe24 공통 JS 정리 내용

파일:

- `cafe24-common-js.js`

포함한 설정 객체:

- `PP_CAFE24_LINKS`
- `PP_CAFE24_CATEGORY_URLS`
- `PP_CAFE24_SUB_CATEGORY_URLS`
- `PP_CAFE24`

JS 처리 기준:

- IIFE 구조로 전역 충돌 최소화
- DOM 요소가 없으면 오류 없이 종료
- 같은 JS가 중복 로드되어도 링크 적용만 다시 실행
- `data-pp-cafe24-link`와 `data-pp-cafe24-category` 기반으로 고객용 URL 적용
- TOP 이동 버튼만 가벼운 동작으로 지원

## 7. 반영한 Cafe24 고객용 URL

공통 링크:

- 마이페이지: `https://peerl.cafe24.com/myshop/index.html`
- 로그인: `https://peerl.cafe24.com/member/login.html`
- 아이디 찾기: `https://peerl.cafe24.com/member/id/find_id.html`
- 비밀번호 찾기: `https://peerl.cafe24.com/member/passwd/find_passwd_info.html`
- 장바구니: `https://peerl.cafe24.com/order/basket.html`
- 게시판 메인: `https://peerl.cafe24.com/board/index.html`
- 상품 Q&A 목록: `https://peerl.cafe24.com/board/product/list.html?board_no=6`
- 상품 Q&A 작성: `https://peerl.cafe24.com/board/product/write.html?board_no=6`
- 이용약관: `https://peerl.cafe24.com/_wg/import/agreement.html`
- 개인정보처리방침: `https://peerl.cafe24.com/member/privacy.html`

상품분류 URL:

- 싸바리박스: `https://peerl.cafe24.com/product/list.html?cate_no=64`
- 쇼핑백: `https://peerl.cafe24.com/product/list.html?cate_no=45`
- 명함: `https://peerl.cafe24.com/product/list.html?cate_no=43`
- 봉투: `https://peerl.cafe24.com/product/list.html?cate_no=42`
- 더스트백: `https://peerl.cafe24.com/product/list.html?cate_no=46`
- 부자재: `https://peerl.cafe24.com/product/list.html?cate_no=54`
- 카페용품: `https://peerl.cafe24.com/product/list.html?cate_no=87`
- 디자인의뢰: `https://peerl.cafe24.com/product/list.html?cate_no=95`
- 고급 선물 패키지: `https://peerl.cafe24.com/product/list.html?cate_no=63`
- 단박스: `https://peerl.cafe24.com/product/list.html?cate_no=65`
- 단추박스: `https://peerl.cafe24.com/product/list.html?cate_no=68`

## 8. 견적문의와 상품 Q&A 역할 구분

견적문의:

- 맞춤제작 상담
- 수량, 사이즈, 재질, 인쇄, 후가공 확인
- 기존 `index.html#quote` 및 Pluuug iframe 흐름 유지

상품 Q&A:

- 일반 상품문의
- Cafe24 게시판 기능과 연결
- 맞춤제작 견적문의 대체로 사용하지 않음

## 9. 새로 만든 보고서 문서

- `reports/2026-06-25-cafe24-smartdesign-application-guide.md`
- `reports/2026-06-25-cafe24-before-apply-checklist.md`
- `reports/2026-06-25-cafe24-smartdesign-gpt-report.md`

## 10. 검증 결과

정적 검사:

- 스니펫 파일에 `html`, `head`, `body` 태그 없음
- Cafe24 적용용 CSS에 과한 전역 선택자 없음
- Cafe24 적용용 JS 문법 검사 통과
- 기존 주요 JS 문법 검사 통과

브라우저 검증:

- 스니펫 5종을 Chrome headless에서 직접 주입해 확인
- 모바일 390px 기준 가로 overflow 없음
- 공통 링크 자동 적용 확인
- 고객 화면에 관리자용 URL 패턴 노출 없음
- 고객 화면에 개발용 확인 문구 노출 없음
- 제한 표현 노출 없음
- 콘솔 오류 없음

기존 페이지 검증:

- `index.html`
- `category.html?category=shopping-bag`
- `product.html?category=box&product=basic-white-box`
- `faq.html`
- `support.html`
- `guide-production.html`
- `guide-design.html`
- `guide-caution.html`
- `blog.html`

모두 모바일 390px 기준 로드, 가로 overflow 없음, 콘솔 오류 없음으로 확인했습니다.

## 11. 아직 Cafe24 관리자에서 확인해야 할 항목

- 스마트디자인 메인 본문 삽입 위치
- 공통 헤더 파일 위치
- 공통 푸터 파일 위치
- 상품분류 페이지 HTML 위치
- 상품상세 페이지 HTML 위치
- 게시판 페이지 HTML 위치
- 마이쇼핑 페이지 HTML 위치
- 이미지 업로드 폴더
- 문서 파일 업로드 경로
- 상하박스 고객용 URL
- C형박스 고객용 URL
- 대표 상품 상세 URL
- 카카오톡 또는 채널톡 실제 링크
- 세금계산서, 현금영수증, 거래명세서 운영 방식
- Pluuug iframe이 실제 운영 도메인에서 정상 표시되는지 여부

## 12. 다음 작업 제안

1. Cafe24 테스트 스킨 또는 복제 스킨에서 `cafe24-snippets` 파일을 먼저 적용
2. Cafe24 실제 이미지 업로드 경로 확인
3. 상하박스, C형박스, 상품 상세 고객용 URL 확인
4. 공통 CSS가 Cafe24 기본 상품목록, 게시판, 마이쇼핑에 영향을 주지 않는지 실화면 QA
5. 견적문의, 상품 Q&A, 마이페이지, 장바구니 링크 클릭 QA
6. PC와 모바일에서 운영 도메인 기준 최종 확인

## 13. 한 줄 요약

기존 정적 홈페이지는 유지하고, Cafe24 스마트디자인 본문에 붙일 수 있는 `.pp-cafe24` 기반 스니펫·공통 CSS·공통 JS·적용 가이드·사전 체크리스트를 별도로 준비했습니다.
