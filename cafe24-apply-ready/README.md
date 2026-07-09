# 페르패키지 Cafe24 스마트디자인 1차 적용 패키지

작성일: 2026-06-26

## 1. 폴더 목적

이 폴더는 지금까지 만든 페르패키지 Cafe24 스마트디자인 관련 산출물을 실제 Cafe24 테스트 스킨에 1차로 붙여볼 수 있도록 정리한 적용용 패키지입니다.

기존 개발용 정적 페이지가 아니라, Cafe24 스마트디자인 본문 또는 스킨 파일에 복사해 넣는 것을 기준으로 정리했습니다.

## 2. 적용 전 필수 원칙

- Cafe24 관리자에서 기존 스킨 파일을 먼저 백업하세요.
- 가능하면 운영 스킨이 아니라 테스트 스킨 또는 복사 스킨에서 먼저 적용하세요.
- `module="..."`, `{$...}` 변수, `onclick="{$...}"` action은 임의로 삭제하거나 이름을 바꾸지 마세요.
- 고객 화면에 테스트 문구가 보이지 않는지 확인하세요.
- 적용 후 PC와 모바일 390px 화면을 모두 확인하세요.

## 3. 파일 구성

| 파일 | 적용 위치 | 상태 |
| --- | --- | --- |
| `01-common-css.css` | 공통 CSS 또는 별도 업로드 CSS | 바로 적용 후보 |
| `02-common-js.js` | 공통 JS 또는 별도 업로드 JS | 바로 적용 후보 |
| `main.html` | Cafe24 메인 본문 영역 | 바로 적용 후보 |
| `support.html` | 고객센터/이용안내 본문 영역 | 바로 적용 후보 |
| `guide-production.html` | 제작가이드 본문 영역 | 바로 적용 후보 |
| `guide-design.html` | 디자인가이드 본문 영역 | 바로 적용 후보 |
| `guide-caution.html` | 제작주의사항 본문 영역 | 바로 적용 후보 |
| `myshop-index.html` | `/myshop/index.html` | 원본 백업 후 적용 후보 |
| `basket.html` | `/order/basket.html` | 원본 백업 후 적용 후보 |
| `APPLY_CHECKLIST.md` | 적용 전후 QA 문서 | 확인용 |

## 4. 적용 순서

1. Cafe24 스마트디자인에서 현재 스킨을 백업합니다.
2. 테스트 스킨 또는 복사 스킨을 준비합니다.
3. 공통 CSS를 먼저 적용합니다.
4. 공통 JS를 적용합니다.
5. 메인/고객센터/가이드 스니펫을 본문 영역에 적용합니다.
6. `/myshop/index.html` 원본을 백업한 뒤 `myshop-index.html` 내용을 적용합니다.
7. `/order/basket.html` 원본을 백업한 뒤 `basket.html` 내용을 적용합니다.
8. PC, 모바일, 로그인/로그아웃, 장바구니 담긴 상태를 기준으로 QA합니다.

## 5. 마이쇼핑 접근 제어

`myshop-index.html`은 아래 Cafe24 상태 module을 사용합니다.

- 비로그인 안내: `Layout_stateLogoff`
- 로그인 회원 본문: `Layout_stateLogon`

비로그인 상태에서는 로그인/비회원 주문조회 안내 화면을 표시하고, 로그인 상태에서는 기존 마이쇼핑 본문이 표시되는 구조입니다.

## 6. 장바구니

`basket.html`은 실제 Cafe24 장바구니 원본 HTML을 기준으로 병합한 파일입니다.

보존한 핵심:

- `Order_BasketPackage`
- `Order_TotalSummary`
- `Order_TotalOrder`
- `Order_SelectOrder`
- `Order_list`
- `Order_optionAll`
- 수량 변경, 옵션 변경, 삭제, 선택 주문, 전체 주문 action

## 7. 주의사항

- Cafe24 기본 CSS가 더 강할 수 있으므로 실제 적용 후 computed style 확인이 필요합니다.
- 마이쇼핑은 로그아웃 상태에서 페이지 소스에 개인정보성 값이 렌더링되지 않는지 확인해야 합니다.
- 장바구니는 상품을 실제로 담은 상태에서 수량/옵션/삭제/주문 동작을 확인해야 합니다.
- 공통 JS는 Cafe24 기본 기능을 직접 제어하지 않도록 최소 동작만 포함했습니다.
