# 페르패키지 Cafe24 장바구니/마이쇼핑 원본 병합 작업 보고서

작성일: 2026-06-26

## 1. 작업 목적

이전에는 장바구니와 마이쇼핑 원본 HTML이 없어 작업을 보류하거나 초안 형태로만 정리했습니다.

이번에는 실제 Cafe24 원본 HTML이 첨부되어, 해당 원본을 기준으로 페르패키지 홈페이지 톤에 맞는 전체 HTML 파일을 만들었습니다.

작업 순서는 요청대로 아래 순서로 진행했습니다.

1. 장바구니 `/order/basket.html`
2. 마이쇼핑 `/myshop/index.html`

## 2. 입력 원본

### 장바구니 원본

- 첨부 경로: `C:\Users\inh78\.codex\attachments\a9036af9-5acb-415e-96ca-4f561a3bca69\pasted-text.txt`
- 원본 성격: Cafe24 스마트디자인 장바구니 HTML
- 원본 크기: 약 70KB

### 마이쇼핑 원본

- 첨부 경로: `C:\Users\inh78\.codex\attachments\485f392a-1980-4730-8cc0-fa982462cfaa\pasted-text.txt`
- 원본 성격: Cafe24 스마트디자인 마이쇼핑 HTML
- 원본 크기: 약 12KB

## 3. 새로 만든 최종 HTML 파일

### 장바구니

- `perpackage-vercel-public/cafe24-snippets/cafe24-basket-final.html`

### 마이쇼핑

- `perpackage-vercel-public/cafe24-snippets/cafe24-myshop-final.html`

두 파일 모두 Cafe24 스마트디자인에 붙여넣을 수 있도록 `<!--@layout(/layout/basic/layout.html)-->` 구조를 유지했습니다.

## 4. 장바구니 보존 요소

### 유지한 Cafe24 module

원본 대비 최종 파일에서 module 누락 없음.

- `Layout_MobileAction`
- `Order_BasketOption`
- `Order_BasketPackage`
- `Order_BasketPriceInfoGuide`
- `Order_Empty`
- `Order_EmptyItem`
- `Order_list`
- `Order_NormIndividual`
- `Order_NormNormal`
- `Order_NormOversea`
- `Order_optionAll`
- `Order_SelectOrder`
- `Order_SuppNormal`
- `Order_TabInfo`
- `Order_TotalOrder`
- `Order_TotalOversea`
- `Order_TotalSummary`
- `Order_Weight`

### 유지한 주요 action

원본 대비 최종 파일에서 action 누락 없음.

- `onclick="{$go_back}"`
- `onclick="{$out_shortcut}"`
- `onclick="{$add_shortcut}"`
- `onclick="{$action_modify}"`
- `onclick="{$action_option_change}"`
- `onclick="{$action_move_item}"`
- `onclick="{$action_wish_item}"`
- `onclick="{$action_buy_item}"`
- `onclick="{$action_delete}"`
- `onclick="{$action_order_select}"`
- `onclick="{$action_order_all}"`
- `onclick="{$action_move_oversea}"`
- `onclick="{$action_order_store_pickup_select}"`
- `onclick="$('#ec-basketOptionModifyLayer').hide();"`

### 유지한 중요 주석

아래 Cafe24 필수 주석은 삭제하지 않았습니다.

```html
<!-- 이값은 지우면 안되는 값입니다.
    $product_weight_display=F
    $checked_product_calc=T
-->
```

### 유지한 주요 변수

전체 `{$...}` 변수는 원본 대비 누락 없음으로 확인했습니다.

대표 변수:

- `{$form.quantity}`
- `{$product_name_link}`
- `{$product_purchase_price_front}`
- `{$total_order_price_front}`
- `{$total_delv_price_front}`
- `{$checked_order_count}`
- `{$checked_order_price}`
- `{$param}`
- `{$img}`
- `{$option_str}`
- `{$qty}`

## 5. 장바구니 변경 내용

### 추가한 구조

- `per-basket` wrapper 추가
- 상단 장바구니 안내 섹션 추가
- 페르패키지 톤의 scoped CSS 추가

### 디자인 개선

- 흰색과 남색 `#2A408C` 중심
- 카드형 상품 영역
- 부드러운 border, radius, shadow 적용
- 상품 썸네일, 옵션, 수량, 버튼 영역 정리
- 총 주문 영역과 안내 영역을 더 읽기 쉽게 정리
- 모바일 390px 기준으로 상품 카드와 버튼이 세로로 정리되도록 반응형 CSS 적용

### 숨김 또는 낮은 노출 처리

Cafe24 기능 파손을 피하기 위해 삭제하지 않고 CSS로 처리했습니다.

- `#orderFixItem > div[id]` 직접 하위 payment 관련 div 영역 숨김
- 네이버 체크아웃 버튼 영역과 앱 payment 버튼 영역은 원본 div를 유지하되 화면에서는 숨김 처리

이유:

- 페르패키지 장바구니는 상담형 제작 흐름을 유지해야 함
- 외부 payment 버튼 영역은 운영 정책 확인 후 노출 여부를 결정하는 것이 안전함

## 6. 마이쇼핑 보존 요소

### 유지한 Cafe24 module

원본 대비 최종 파일에서 module 누락 없음.

- `Layout_MobileAction`
- `myshop_asyncbenefit`
- `myshop_asyncbankbook`
- `myshop_orderstate`
- `myshop_main`
- `Myshop_InquiryDash`

### 유지한 action

원본 대비 최종 파일에서 action 누락 없음.

- `onclick="{$go_back}"`
- `onclick="{$copy_func}"`

`{$copy_func}`는 원본의 추천 주소 복사 영역이 주석 처리된 상태로 남아 있으며, 원본 구조를 유지했습니다.

### 유지한 주요 변수

전체 `{$...}` 변수는 원본 대비 누락 없음으로 확인했습니다.

대표 변수:

- `{$member_name}`
- `{$group_name}`
- `{$group_image}`
- `{$group_icon}`
- `{$total_mileage}`
- `{$used_mileage}`
- `{$avail_mileage}`
- `{$total_deposit}`
- `{$coupon_cnt}`
- `{$total_order_price}`
- `{$total_order_count}`
- `{$shppiedBeforeUrl}`
- `{$shppiedStandbyUrl}`
- `{$shppiedBeginUrl}`
- `{$shppiedComplateUrl}`
- `{$orderCancelUrl}`
- `{$orderExchangeUrl}`
- `{$orderReturnUrl}`
- `{$wish_count}`
- `{$coupon_count}`

## 7. 마이쇼핑 변경 내용

### 추가한 구조

- `per-myshop` wrapper 추가
- 상단 제목을 `나의 패키지 관리`로 정리
- 안내 문구 추가
- 주요 바로가기 섹션 추가

### 추가한 주요 바로가기

- 주문조회
- 장바구니
- 회원정보
- 배송 주소록
- 1:1 맞춤상담
- 대량구매 문의 관리

### 디자인 개선

- 기존 Cafe24 기본 마이쇼핑 느낌을 줄이고 페르패키지 톤으로 정리
- 회원정보, 쇼핑정보, 주문처리 현황, 전체 메뉴를 카드형 구조로 정리
- 외부 아이콘 폰트가 없어도 텍스트만으로 메뉴를 이해할 수 있도록 CSS 처리
- 적립금, 예치금, 쿠폰 등 일반 쇼핑몰 요소는 기능을 유지하되 과하게 강조하지 않도록 정리

### 오타 수정

원본에 있던 아래 깨진 태그를 수정했습니다.

변경 전:

```html
좋아요<sub>Like itsubspan>
```

변경 후:

```html
좋아요<sub>Like it</sub>
```

## 8. 삭제하지 않고 유지한 이유

아래 영역은 운영 여부가 불확실하거나 페르패키지에서 중요도가 낮을 수 있지만, Cafe24 모듈 오류를 피하기 위해 삭제하지 않았습니다.

- 예치금
- 쿠폰
- 적립금
- 좋아요
- 정기배송 관리
- 게시물관리
- 네이버 체크아웃 버튼 div
- 앱 payment 버튼 div

처리 방식:

- 기능 구조는 유지
- CSS로 낮은 강조 또는 숨김 처리
- 운영 정책 확정 후 노출 여부 조정 가능

## 9. 검증 결과

### 장바구니

- module 원본 18개, 최종 18개, 누락 0개
- action 원본 15개, 최종 15개, 누락 0개
- `{$...}` 변수 원본 205종, 최종 205종, 누락 0개

### 마이쇼핑

- module 원본 6개, 최종 6개, 누락 0개
- action 원본 2개, 최종 2개, 누락 0개
- `{$...}` 변수 원본 103종, 최종 103종, 누락 0개

### 금지/주의 표현 검사

아래 표현은 최종 HTML에서 추가로 발견되지 않았습니다.

- 바로 결제
- 즉시 제작
- 제작 확정
- 확정 견적
- 무조건 최저가
- 인쇄 포함 확정가
- 무조건 제작 가능

### 관리자 URL 패턴 검사

아래 패턴은 최종 HTML에서 발견되지 않았습니다.

- `/disp/admin/`
- `ProductManage`
- `productmanage`

## 10. Cafe24 적용 후 수동 QA 체크리스트

### 장바구니

1. 장바구니 페이지 정상 로드
2. 국내배송/해외배송 탭 정상 표시
3. 빈 장바구니 문구 정상 표시
4. 상품 썸네일 정상 표시
5. 상품명 링크 정상 이동
6. 수량 증가/감소 정상 동작
7. 수량 변경 버튼 정상 동작
8. 옵션변경 레이어 정상 동작
9. 삭제 버튼 정상 동작
10. 관심상품 버튼 정상 동작
11. 선택상품주문 정상 이동
12. 전체상품주문 정상 이동
13. 총 상품금액/배송비/합계 정상 표시
14. 고정 주문 영역 정상 표시
15. 모바일 390px에서 가로 스크롤 없음
16. Cafe24 콘솔 오류 없음

### 마이쇼핑

1. 마이쇼핑 페이지 정상 로드
2. 로그인 회원 이름 정상 표시
3. 회원등급 정보 정상 표시
4. 회원 그룹 이미지가 깨질 때 기본 이미지 또는 레이아웃 유지
5. 주문처리 현황 카운트 정상 표시
6. 주문조회 링크 정상 이동
7. 장바구니 링크 정상 이동
8. 회원정보 링크 정상 이동
9. 배송 주소록 링크 정상 이동
10. 관심상품 링크 정상 이동
11. 최근 본 상품 링크 정상 이동
12. 적립금/쿠폰/예치금 링크 정상 이동
13. 1:1 맞춤상담 링크 정상 이동
14. 대량구매 문의 관리 링크 정상 이동
15. 모바일 390px에서 가로 스크롤 없음
16. Cafe24 콘솔 오류 없음

## 11. 적용 시 주의사항

- 실제 Cafe24 스킨에 붙여넣기 전 기존 `/order/basket.html`과 `/myshop/index.html` 원본을 반드시 백업해야 합니다.
- Cafe24 기본 CSS가 더 강하게 적용될 수 있으므로 적용 후 실제 화면에서 computed style 확인이 필요합니다.
- 숨김 처리한 payment 관련 div는 운영 정책에 따라 다시 노출할 수 있습니다.
- 마이쇼핑의 1:1 상담, 대량구매 문의 URL은 실제 Cafe24 게시판 설정과 맞는지 확인해야 합니다.
- 장바구니는 주문 기능과 직접 연결되므로 운영 스킨에서 실제 로그인/상품 담기 상태로 확인해야 합니다.

## 12. 한 줄 요약

이번에는 실제 Cafe24 장바구니와 마이쇼핑 원본 HTML을 기준으로 작업했으며, 원본 module/action/변수 누락 없이 페르패키지 톤의 wrapper와 scoped CSS를 추가한 최종 붙여넣기용 HTML을 만들었습니다.
