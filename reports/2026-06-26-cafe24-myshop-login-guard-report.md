# 페르패키지 Cafe24 마이쇼핑 접근 제어 수정 보고서

작성일: 2026-06-26

## 1. 문제 상황

`https://peerl.cafe24.com/myshop/index.html` 페이지가 비로그인 상태에서도 접근되고 있었습니다.

마이쇼핑 페이지에는 아래와 같은 개인 정보성 영역이 포함되어 있으므로 비로그인 사용자에게 본문이 바로 노출되면 안 됩니다.

- 회원명
- 회원등급
- 주문처리 현황
- 적립금
- 예치금
- 쿠폰
- 총주문 정보
- 회원정보/배송지/상담 메뉴

## 2. 원인 분석

현재 작업 중인 `cafe24-myshop-final.html`은 Cafe24 마이쇼핑 원본 HTML을 기반으로 디자인을 정리한 상태였습니다.

기존 원본에는 아래 마이쇼핑 module이 있었지만, 페이지 본문 전체를 로그인 상태에만 보여주는 상위 조건 영역은 없었습니다.

- `module="myshop_asyncbenefit"`
- `module="myshop_asyncbankbook"`
- `module="myshop_orderstate"`
- `module="myshop_main"`
- `module="Myshop_InquiryDash"`

따라서 비로그인 상태에서 `/myshop/index.html`에 접근하면 마이쇼핑 본문 구조가 public 화면처럼 보일 수 있었습니다.

## 3. 수정 방식

Cafe24 로그인 기능을 직접 구현하지 않고, Cafe24 기본 로그인 상태 module을 활용하는 방식으로 수정했습니다.

### 로그인 상태

로그인한 회원에게만 마이쇼핑 본문이 보이도록 기존 본문을 아래 module로 감쌌습니다.

```html
<div module="Layout_stateLogon" class="per-myshop__member-only">
    ...
</div>
```

### 비로그인 상태

비로그인 사용자에게는 마이쇼핑 본문 대신 안내 화면이 보이도록 아래 module을 추가했습니다.

```html
<div module="Layout_stateLogoff" class="per-login-required">
    ...
</div>
```

강제 JS 로그인 판별, `localStorage`, `sessionStorage` 방식은 사용하지 않았습니다.

## 4. 수정한 파일

- `perpackage-vercel-public/cafe24-snippets/cafe24-myshop-final.html`
- `perpackage-vercel-public/reports/2026-06-26-cafe24-myshop-login-guard-report.md`

## 5. 로그인 상태 표시 흐름

로그인 상태에서는 기존 마이쇼핑 본문이 정상 표시됩니다.

유지되는 영역:

- 회원 정보 카드
- 주요 바로가기
- 나의 쇼핑정보
- 주문처리 현황
- 전체 메뉴
- 1:1 맞춤상담
- 대량구매 문의 관리

## 6. 비로그인 상태 표시 흐름

비로그인 상태에서는 `Layout_stateLogoff` 영역이 표시됩니다.

안내 문구:

- `로그인이 필요한 페이지입니다.`
- `마이페이지에서는 주문 내역, 상담 문의, 관심 패키지, 배송지 정보를 확인할 수 있습니다.`
- `회원 주문은 로그인 후 확인해 주세요.`
- `비회원으로 주문하신 경우 비회원 주문조회에서 확인할 수 있습니다.`

버튼:

- 로그인하기
- 비회원 주문조회
- 홈으로 돌아가기

## 7. 로그인/비회원 주문조회 링크 확인 결과

### 로그인 링크

적용 링크:

- `/member/login.html?returnUrl=%2Fmyshop%2Findex.html`

기준:

- Cafe24 기본 로그인 페이지는 `/member/login.html`로 확인했습니다.
- returnUrl을 포함해 로그인 후 마이쇼핑으로 돌아올 수 있도록 구성했습니다.

### 비회원 주문조회 링크

적용 링크:

- `/member/login.html?noMemberOrder&returnUrl=%2Fmyshop%2Forder%2Flist.html`

확인 결과:

- `https://peerl.cafe24.com/myshop/order/list.html` 접근 시 Cafe24가 `https://peerl.cafe24.com/member/login.html?noMemberOrder&returnUrl=%2Fmyshop%2Forder%2Flist.html`로 이동하는 것을 확인했습니다.
- 해당 로그인 화면에는 `비회원 주문조회` 영역이 표시됩니다.

따라서 비회원 주문조회 버튼은 Cafe24가 실제로 사용하는 로그인/비회원 주문조회 흐름에 맞췄습니다.

## 8. 유지한 Cafe24 module/변수

기존 원본 대비 기존 module 누락 없음.

원본 module:

- `Layout_MobileAction`
- `myshop_asyncbenefit`
- `myshop_asyncbankbook`
- `myshop_orderstate`
- `myshop_main`
- `Myshop_InquiryDash`

추가 module:

- `Layout_stateLogoff`
- `Layout_stateLogon`

기존 action 누락 없음.

- `onclick="{$go_back}"`
- `onclick="{$copy_func}"`

기존 `{$...}` 변수 누락 없음.

대표 유지 변수:

- `{$member_name}`
- `{$group_name}`
- `{$total_mileage}`
- `{$used_mileage}`
- `{$avail_mileage}`
- `{$coupon_cnt}`
- `{$total_order_price}`
- `{$total_order_count}`
- `{$shppiedBeforeCount}`
- `{$shppiedStandbyCount}`
- `{$shppiedBeginCount}`
- `{$shppiedComplateCount}`
- `{$orderCancelCount}`
- `{$orderExchangeCount}`
- `{$orderReturnCount}`

## 9. 검증 결과

로컬 정적 검사 기준:

- 기존 module 원본 6개, 최종 8개, 기존 누락 0개
- 기존 action 원본 2개, 최종 2개, 누락 0개
- 기존 `{$...}` 변수 원본 103종, 최종 103종, 누락 0개
- `localStorage` 사용 없음
- `sessionStorage` 사용 없음
- 관리자 URL 패턴 없음
- 금지 표현 없음

## 10. 수동 QA 체크리스트

1. 로그아웃 상태에서 `/myshop/index.html` 접속
2. 마이쇼핑 본문이 바로 노출되지 않는지 확인
3. 로그인 안내 화면이 표시되는지 확인
4. 로그인하기 버튼이 `/member/login.html?returnUrl=%2Fmyshop%2Findex.html`로 이동하는지 확인
5. 비회원 주문조회 버튼이 `/member/login.html?noMemberOrder&returnUrl=%2Fmyshop%2Forder%2Flist.html`로 이동하는지 확인
6. 홈으로 돌아가기 버튼이 `/`로 이동하는지 확인
7. 로그인 후 `/myshop/index.html` 접속 시 회원명 표시 확인
8. 로그인 후 회원등급 표시 확인
9. 로그인 후 주문처리현황 카운트 표시 확인
10. 로그인 후 주문조회/회원정보/주소록/상담 링크 정상 이동 확인
11. 모바일 390px에서 안내 화면 가로 스크롤 없음
12. PC 화면에서 안내 카드가 깨지지 않음
13. 브라우저 콘솔 오류 없음
14. Cafe24 module 오류 없음

## 11. 남은 위험 요소

- `Layout_stateLogoff`, `Layout_stateLogon`은 Cafe24 스킨에서 정상 지원되어야 합니다.
- 실제 Cafe24 운영 스킨에서 두 module이 서버단으로 안전하게 분기되는지 확인해야 합니다.
- 단순 CSS 숨김이 아니라 비로그인 상태에서 개인정보성 HTML이 실제로 렌더링되지 않는지 페이지 소스 기준으로 확인해야 합니다.
- 강제 redirect는 넣지 않았으므로, 운영 정책상 무조건 로그인 페이지로 이동해야 한다면 Cafe24 관리자 설정 또는 기본 접근 제한 설정을 추가 확인해야 합니다.

## 12. 다음 작업 제안

1. Cafe24 테스트 스킨에 `cafe24-myshop-final.html` 적용
2. 로그아웃 상태에서 페이지 소스에 회원 변수값/주문값이 렌더링되는지 확인
3. 로그인 상태에서 기존 마이쇼핑 기능 정상 확인
4. 필요 시 Cafe24 관리자 설정에서 마이쇼핑 접근 권한/로그인 유도 설정 확인
5. 비회원 주문조회 문구와 링크가 실제 운영 UX에 맞는지 확인

## 13. 한 줄 요약

마이쇼핑 본문을 `Layout_stateLogon` 안으로 분리하고, 비로그인 상태에는 `Layout_stateLogoff` 기반 로그인/비회원 주문조회 안내 화면을 보여주도록 수정했습니다.
