# GPT 보고용: 페르패키지 Cafe24 스마트디자인 1차 적용 준비 결과

작성일: 2026-06-26

## 1. 작업 목적

지금까지 만든 페르패키지 Cafe24 스마트디자인 관련 산출물을 실제 Cafe24 테스트 스킨에 1차로 붙여볼 수 있도록 적용용 폴더로 정리했습니다.

이번 작업은 새 기능을 추가하는 작업이 아니라, 기존 산출물을 Cafe24 스마트디자인 기준으로 분류하고, 적용 순서와 QA 체크리스트를 준비하는 작업입니다.

## 2. 기준 보고서

참고한 기존 보고서:

- `perpackage-vercel-public/reports/2026-06-25-cafe24-smartdesign-gpt-report.md`
- `perpackage-vercel-public/reports/2026-06-26-cafe24-myshop-cleanup-draft-report.md`
- `perpackage-vercel-public/reports/2026-06-26-cafe24-myshop-login-guard-report.md`
- `perpackage-vercel-public/reports/2026-06-26-cafe24-smartdesign-followup-gpt-report.md`
- `perpackage-vercel-public/reports/2026-06-26-cafe24-basket-myshop-final-report.md`

## 3. 정리한 Cafe24 관련 파일 목록

현재 Cafe24 관련 원본/중간 산출물은 아래 폴더에 있습니다.

- `perpackage-vercel-public/cafe24-snippets/`

파일 분류:

| 파일 | 용도 | 상태 |
| --- | --- | --- |
| `cafe24-main-snippet.html` | 메인 페이지용 | 바로 적용 후보 |
| `cafe24-support-snippet.html` | 고객센터/상담 안내용 | 바로 적용 후보 |
| `cafe24-guide-production-snippet.html` | 제작가이드용 | 바로 적용 후보 |
| `cafe24-guide-design-snippet.html` | 디자인가이드용 | 바로 적용 후보 |
| `cafe24-guide-caution-snippet.html` | 제작주의사항 가이드용 | 바로 적용 후보 |
| `cafe24-common-css.css` | 공통 CSS | 바로 적용 후보 |
| `cafe24-common-js.js` | 공통 JS | 바로 적용 후보 |
| `cafe24-myshop-cleanup-draft.html` | 마이쇼핑 초안 | 참고용, 적용 제외 |
| `cafe24-myshop-final.html` | 마이쇼핑 최종 후보 | 원본 백업 후 적용 후보 |
| `cafe24-basket-final.html` | 장바구니 최종 후보 | 원본 백업 후 적용 후보 |

## 4. 새로 만든 apply-ready 폴더 구조

새 폴더:

- `perpackage-vercel-public/cafe24-apply-ready/`

생성 파일:

- `README.md`
- `APPLY_CHECKLIST.md`
- `01-common-css.css`
- `02-common-js.js`
- `main.html`
- `support.html`
- `guide-production.html`
- `guide-design.html`
- `guide-caution.html`
- `myshop-index.html`
- `basket.html`

각 HTML/CSS/JS 파일 상단에는 아래 정보를 주석으로 추가했습니다.

- 적용 위치
- 원본 백업 필요 여부
- 파일 성격
- 주의사항

## 5. 바로 적용 가능한 파일

테스트 스킨에서 본문 삽입용으로 바로 적용 가능한 후보:

- `main.html`
- `support.html`
- `guide-production.html`
- `guide-design.html`
- `guide-caution.html`

공통 리소스 적용 후보:

- `01-common-css.css`
- `02-common-js.js`

주의:

- 공통 CSS/JS는 반드시 테스트 스킨에서 먼저 적용해야 합니다.
- 공통 CSS는 `.pp-cafe24` wrapper 중심으로 작동하도록 정리되어 있습니다.
- 공통 JS는 Cafe24 주문/회원/게시판 기능을 직접 제어하지 않으며, 링크 보정과 가벼운 보조 동작 중심입니다.

## 6. 원본 백업 후 적용해야 하는 파일

아래 파일은 Cafe24 module, 변수, action이 포함되어 있으므로 원본 백업 후 적용해야 합니다.

### 마이쇼핑

- 적용 후보: `myshop-index.html`
- Cafe24 위치: `/myshop/index.html`

### 장바구니

- 적용 후보: `basket.html`
- Cafe24 위치: `/order/basket.html`

주의:

- 두 파일은 Cafe24 기능과 직접 연결됩니다.
- 운영 스킨에 바로 붙이지 말고 복사 스킨에서 먼저 테스트해야 합니다.

## 7. 마이쇼핑 로그인 접근 제어 반영 여부

반영 완료.

`myshop-index.html`에는 아래 Cafe24 상태 module을 추가했습니다.

- `Layout_stateLogoff`
- `Layout_stateLogon`

표시 흐름:

- 비로그인 상태: 로그인/비회원 주문조회 안내 화면 표시
- 로그인 상태: 기존 마이쇼핑 본문 표시

유지한 핵심 module:

- `myshop_asyncbenefit`
- `myshop_asyncbankbook`
- `myshop_orderstate`
- `myshop_main`
- `Myshop_InquiryDash`

유지한 링크:

- 로그인: `/member/login.html?returnUrl=%2Fmyshop%2Findex.html`
- 비회원 주문조회: `/member/login.html?noMemberOrder&returnUrl=%2Fmyshop%2Forder%2Flist.html`

중요 확인:

- 비로그인 상태에서 단순 CSS 숨김이 아니라, 페이지 소스에 회원명/주문현황/적립금/쿠폰 값이 렌더링되지 않는지 Cafe24 실제 화면에서 확인해야 합니다.
- 이 부분은 로컬 정적 HTML로 완전 검증할 수 없으므로 운영 전 필수 QA 항목으로 남겼습니다.

## 8. 장바구니 원본 확보 여부

장바구니 원본 HTML은 확보되어 병합 완료되었습니다.

입력 원본:

- `C:\Users\inh78\.codex\attachments\a9036af9-5acb-415e-96ca-4f561a3bca69\pasted-text.txt`

최종 적용 후보:

- `perpackage-vercel-public/cafe24-apply-ready/basket.html`

보존한 핵심 module:

- `Order_BasketPackage`
- `Order_TotalSummary`
- `Order_TotalOrder`
- `Order_SelectOrder`
- `Order_list`
- `Order_optionAll`

보존한 핵심 action/변수:

- `{$form.quantity}`
- `{$action_modify}`
- `{$action_delete}`
- `{$action_order_select}`
- `{$action_order_all}`
- `{$action_buy_item}`

장바구니는 실제 상품을 담은 상태에서 수량 변경, 옵션 변경, 삭제, 선택 주문, 전체 주문 동작을 반드시 확인해야 합니다.

## 9. 공통 CSS/JS 정리 내용

### 공통 CSS

파일:

- `01-common-css.css`

정리 기준:

- `.pp-cafe24` prefix 중심
- 전역 reset 없음
- `body`, 전체 `a`, 전체 `ul/li`, 전체 `button`을 직접 리셋하지 않음
- 모바일 390px 대응
- PC 최대 너비와 중앙 정렬 기준 포함
- Cafe24 기본 스킨과 충돌을 줄이는 방향

### 공통 JS

파일:

- `02-common-js.js`

정리 기준:

- IIFE 구조
- 외부 라이브러리 없음
- DOM 요소가 없으면 조용히 종료
- Cafe24 주문/회원/게시판 기본 기능을 직접 건드리지 않음
- 링크 보정과 TOP 이동 같은 가벼운 기능 중심

## 10. Cafe24 적용 순서

권장 적용 순서:

1. Cafe24 스마트디자인에서 현재 스킨 전체 백업
2. 테스트 스킨 또는 복사 스킨 준비
3. `01-common-css.css` 적용
4. `02-common-js.js` 적용
5. `main.html` 메인 본문에 적용
6. `support.html` 고객센터/이용안내 본문에 적용
7. `guide-production.html` 제작가이드 본문에 적용
8. `guide-design.html` 디자인가이드 본문에 적용
9. `guide-caution.html` 제작주의사항 본문에 적용
10. `/myshop/index.html` 원본 백업 후 `myshop-index.html` 적용
11. `/order/basket.html` 원본 백업 후 `basket.html` 적용
12. PC/모바일/로그인/로그아웃/장바구니 상태별 QA 진행

## 11. 수동 QA 체크리스트

자세한 체크리스트는 아래 파일에 별도로 작성했습니다.

- `perpackage-vercel-public/cafe24-apply-ready/APPLY_CHECKLIST.md`

핵심 항목:

- PC 화면 확인
- 모바일 390px 확인
- 콘솔 오류 확인
- 기존 헤더/푸터 깨짐 확인
- 공통 CSS가 다른 Cafe24 페이지를 망가뜨리지 않는지 확인
- 로그아웃 상태에서 마이쇼핑 본문 미노출 확인
- 로그인 후 마이쇼핑 회원명/등급/주문현황 확인
- 비회원 주문조회 버튼 이동 확인
- 장바구니 비어 있을 때 확인
- 장바구니 상품 담긴 상태 확인
- 수량/옵션/삭제/선택 주문/전체 주문 확인
- 금지 문구 없는지 확인

## 12. 남은 위험 요소

- Cafe24 기본 CSS 우선순위가 더 강할 수 있으므로 실제 적용 화면에서 computed style 확인 필요
- `Layout_stateLogoff`, `Layout_stateLogon`이 해당 스킨에서 기대대로 서버 분기되는지 확인 필요
- 마이쇼핑 비로그인 상태에서 페이지 소스에 개인정보성 값이 렌더링되지 않는지 확인 필요
- 장바구니는 실제 상품을 담은 상태에서만 기능 확인 가능
- 공통 JS 링크 중 일부는 실제 운영 URL 확정 후 조정 필요 가능성 있음
- 메인/가이드/고객센터 본문 삽입 위치는 Cafe24 스킨 구조에 따라 다를 수 있음

## 13. 다음 작업 제안

1. Cafe24 테스트 스킨에 apply-ready 파일을 순서대로 적용
2. 마이쇼핑 로그아웃/로그인 상태 QA
3. 장바구니 실제 상품 담기 상태 QA
4. 공통 CSS가 기존 상품목록/게시판/마이쇼핑에 미치는 영향 확인
5. 문제 없는 파일만 운영 스킨으로 단계 적용
6. 운영 적용 후 PC/모바일 최종 캡처 저장

## 14. 한 줄 요약

페르패키지 Cafe24 스마트디자인 1차 적용을 위해 메인, 고객센터, 가이드, 마이쇼핑, 장바구니, 공통 CSS/JS를 `cafe24-apply-ready` 폴더에 정리하고, 적용 순서와 QA 체크리스트를 함께 준비했습니다.
