# 페르패키지 Cafe24 마이쇼핑 정리 초안 보고서

작성일: 2026-06-26

## 1. 작업 목적

Cafe24 스마트디자인 마이쇼핑 페이지를 페르패키지 홈페이지 톤에 맞게 정리하기 위한 적용 초안 파일을 만들었습니다.

이번 작업은 실제 운영 원본 마이쇼핑 HTML을 직접 수정한 것이 아니라, 원본 파일이 첨부되지 않은 상태에서 병합 참고용 초안을 만든 작업입니다.

## 2. 새로 만든 파일

- `perpackage-vercel-public/cafe24-snippets/cafe24-myshop-cleanup-draft.html`
- `perpackage-vercel-public/reports/2026-06-26-cafe24-myshop-cleanup-draft-report.md`

## 3. 원본 파일 확인 결과

첨부 폴더에는 지시문 파일만 있었습니다.

- 확인한 첨부 파일: `C:\Users\inh78\.codex\attachments\6aa2e7cd-fea9-48f2-acb4-21770f7aff2d\pasted-text.txt`
- 실제 Cafe24 마이쇼핑 HTML 원본 파일: 없음

작업 폴더에서도 아래 키워드 기준으로 검색했지만 원본 템플릿은 확인되지 않았습니다.

- `myshop_asyncbenefit`
- `myshop_asyncbankbook`
- `myshop_orderstate`
- `myshop_main`
- `Myshop_InquiryDash`
- `{$member_name}`
- `{$total_mileage}`
- `{$wish_count}`

따라서 운영 적용 시에는 반드시 기존 Cafe24 마이쇼핑 원본과 대조한 뒤 병합해야 합니다.

## 4. 적용 초안 구성

### 상단 타이틀 영역

- 기존 `나의 쇼핑` 느낌 대신 `나의 패키지 관리`로 정리
- 주문 내역, 상담 문의, 관심 패키지 정보를 한곳에서 확인한다는 설명 추가
- 주문조회, 장바구니, 1:1 맞춤상담 바로가기 배치

### 회원 정보 카드

- `module="myshop_asyncbenefit"` 유지
- `{$member_name}`, `{$group_name}`, `{$group_image}`, `{$group_icon}` 유지
- 그룹 이미지는 깨질 경우 숨김 처리되도록 `onerror` 유지

### 주요 바로가기 카드

상단에 가장 필요한 메뉴를 카드형으로 배치했습니다.

- 주문조회
- 장바구니
- 회원정보
- 배송 주소록
- 1:1 맞춤상담
- 대량구매 문의 관리

### 주문처리 현황

- `module="myshop_orderstate"` 유지
- 입금전, 배송준비중, 배송중, 배송완료를 카드형으로 정리
- 취소, 교환, 반품은 보조 영역으로 정리
- 패키지 제작 건은 실제 진행 단계가 별도 안내될 수 있다는 안내 문구 추가

### 나의 쇼핑정보

- `module="myshop_asyncbankbook"` 유지
- 적립금, 예치금, 쿠폰, 총주문 변수 유지
- 적립금/예치금/쿠폰은 과하게 강조하지 않고 작은 카드형 정보로 정리
- 총주문 정보는 상대적으로 강조

### 상담 및 문의 관리

- `module="Myshop_InquiryDash"` 유지
- 1:1 맞춤상담과 대량구매 문의 관리를 페르패키지 흐름에 맞게 노출

### 전체 메뉴

- `module="myshop_main"` 유지
- 한 줄 리스트가 아니라 카드 그리드 구조로 정리
- 아이콘 폰트가 없어도 텍스트만으로 이해되도록 구성
- 낮은 우선순위 메뉴는 흐리게 보이도록 처리

## 5. 유지한 Cafe24 핵심 모듈

- `<!--@layout(/layout/basic/layout.html)-->`
- `<!--@css(/_wg/css/myshop.css)-->`
- `module="Layout_MobileAction"`
- `module="myshop_asyncbenefit"`
- `module="myshop_asyncbankbook"`
- `module="myshop_orderstate"`
- `module="myshop_main"`
- `module="Myshop_InquiryDash"`

## 6. 유지한 Cafe24 핵심 변수

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

## 7. 숨김 또는 낮은 강조 처리한 요소

완전히 삭제하지 않고 낮은 우선순위로 보이게 처리했습니다.

- 예치금
- 게시물관리
- 정기배송 관리
- 좋아요

이유:

- 운영 필요 여부가 불확실함
- Cafe24 모듈 오류 가능성을 줄이기 위해 삭제보다 UI상 낮은 강조를 우선함

## 8. 오타 수정 방향

지시문에 언급된 `좋아요<sub>Like itsubspan>` 형태의 깨진 태그는 초안 파일에는 포함하지 않았습니다.

초안에서는 아래처럼 정상 구조로 정리했습니다.

```html
<span class="per-myshop__link-title">좋아요</span>
<span class="per-myshop__menu-sub">Like it</span>
```

## 9. 기능상 주의해야 할 부분

원본 Cafe24 마이쇼핑 파일이 없는 상태에서 작성한 초안이므로 아래 항목은 Cafe24 관리자에서 반드시 대조해야 합니다.

- `Layout_MobileAction` 내부 뒤로가기 동작
- 주문 상태 카운트 변수명
- 상담 게시판 URL
- 대량구매 문의 관리 URL
- 정기배송 관리 URL
- 좋아요 URL
- 최근 본 상품 URL
- 게시물관리 URL

특히 주문 상태 카운트 변수는 Cafe24 스킨마다 다를 수 있으므로 기존 원본 변수를 그대로 옮기는 것이 안전합니다.

## 10. 금지 표현 확인

초안 파일에는 아래 표현을 새로 넣지 않았습니다.

- 바로 구매하기
- 결제하기
- 확정 견적
- 당일 제작 가능
- 무조건 최저가
- 인쇄 포함 확정가
- 무조건 제작 가능

## 11. Cafe24 적용 후 수동 확인 체크리스트

1. 마이쇼핑 페이지 정상 로드
2. 로그인 회원 이름 정상 표시
3. 회원등급 정보 정상 표시
4. 그룹 이미지가 깨질 때 화면이 무너지지 않는지 확인
5. 주문처리 현황 카운트 정상 표시
6. 주문조회 링크 이동 정상
7. 장바구니 링크 이동 정상
8. 회원정보 링크 이동 정상
9. 배송 주소록 관리 링크 이동 정상
10. 관심상품 링크 이동 정상
11. 최근 본 상품 링크 이동 정상
12. 적립금 링크 이동 정상
13. 쿠폰 링크 이동 정상
14. 예치금 링크 이동 정상
15. 1:1 맞춤상담 링크 이동 정상
16. 대량구매 문의 관리 링크 이동 정상
17. 모바일 390px에서 가로 스크롤 없음
18. PC 화면에서 카드 그리드 깨짐 없음
19. Cafe24 콘솔 오류 없음
20. 아이콘 폰트가 로드되지 않아도 텍스트가 정상 표시됨

## 12. 다음 단계

1. Cafe24 스마트디자인의 실제 마이쇼핑 원본 HTML을 확보합니다.
2. 원본 파일의 모듈 구조와 변수명을 초안 파일과 비교합니다.
3. 초안의 `per-myshop` wrapper와 CSS를 기존 원본에 병합합니다.
4. 원본에서만 쓰이는 변수와 action은 절대 삭제하지 않습니다.
5. Cafe24 테스트 스킨에서 PC와 모바일 렌더링을 확인합니다.

## 13. 한 줄 요약

실제 원본 파일은 없었기 때문에 운영 원본을 대체하지 않고, Cafe24 마이쇼핑 모듈과 핵심 변수를 유지한 페르패키지 톤의 병합용 초안 파일을 별도로 작성했습니다.
