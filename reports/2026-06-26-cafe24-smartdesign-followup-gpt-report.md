# GPT 보고용: 페르패키지 Cafe24 스마트디자인 적용 준비 후속 정리

작성일: 2026-06-26

## 1. 기준 보고서

이번 문서는 아래 GPT 보고서 작성 이후 추가된 내용만 정리한 후속 보고서입니다.

- 기준 보고서: `perpackage-vercel-public/reports/2026-06-25-cafe24-smartdesign-gpt-report.md`

기준 보고서에서는 Cafe24 스마트디자인 적용을 위한 공통 스니펫, 공통 CSS/JS, 적용 가이드, 사전 체크리스트가 정리되어 있었습니다.

## 2. 기준 보고서 이후 추가된 주요 내용

기준 보고서 이후 아래 작업이 추가로 진행되었습니다.

1. Cafe24 장바구니 페이지 정리 요청 검토
2. Cafe24 마이쇼핑 페이지 정리 요청 검토
3. Cafe24 마이쇼핑 페이지 병합용 초안 HTML 작성
4. Cafe24 마이쇼핑 정리 초안 보고서 작성

## 3. 장바구니 페이지 정리 요청 검토 결과

장바구니 페이지 정리 요청은 확인했지만, 실제 Cafe24 장바구니 HTML 원본 파일은 첨부되지 않았습니다.

확인한 첨부 폴더:

- `C:\Users\inh78\.codex\attachments\c9e8e555-d710-4468-9a72-c1ffa639c70d`

확인 결과:

- 첨부 폴더 안에는 `pasted-text.txt` 지시문만 있음
- 실제 장바구니 HTML 원본 파일 없음
- 작업 폴더에서도 Cafe24 장바구니 핵심 모듈을 검색했지만 원본 템플릿 확인 안 됨

검색 기준 예시:

- `Order_BasketPackage`
- `Order_TabInfo`
- `Order_NormNormal`
- `Order_TotalSummary`
- `{$action_order_all}`
- `{$form.quantity}`

결론:

- 장바구니는 수량 변경, 옵션 변경, 선택 주문, 삭제, 총액 계산 등 Cafe24 기능과 직접 연결되어 있음
- 원본 없이 임의로 전체 HTML을 작성하면 기능 파손 위험이 큼
- 따라서 실제 장바구니 HTML 원본 확보 전까지는 최종 수정본을 만들지 않음

필요한 다음 자료:

- Cafe24 스마트디자인 장바구니 템플릿 원본
- 일반적으로 `/order/basket.html` 또는 장바구니 관련 스킨 파일

## 4. 마이쇼핑 페이지 정리 요청 검토 결과

마이쇼핑 페이지 정리 요청도 확인했지만, 실제 Cafe24 마이쇼핑 HTML 원본 파일은 첨부되지 않았습니다.

확인한 첨부 폴더:

- `C:\Users\inh78\.codex\attachments\7baaa073-434c-428c-9826-573784396026`
- `C:\Users\inh78\.codex\attachments\6aa2e7cd-fea9-48f2-acb4-21770f7aff2d`

확인 결과:

- 두 첨부 폴더 모두 `pasted-text.txt` 지시문만 있음
- 실제 마이쇼핑 HTML 원본 파일 없음
- 작업 폴더에서도 Cafe24 마이쇼핑 핵심 모듈을 검색했지만 원본 템플릿 확인 안 됨

검색 기준 예시:

- `myshop_asyncbenefit`
- `myshop_asyncbankbook`
- `myshop_orderstate`
- `myshop_main`
- `Myshop_InquiryDash`
- `{$member_name}`
- `{$total_mileage}`
- `{$wish_count}`

결론:

- 마이쇼핑은 회원 정보, 주문 처리 현황, 적립금, 쿠폰, 예치금, 관심상품 등 Cafe24 회원/주문 데이터와 연결됨
- 원본 없이 운영 파일을 대체하는 것은 위험함
- 다만 요청이 반복되어, 운영 원본과 병합할 수 있는 디자인 초안 파일을 별도로 작성함

## 5. 새로 추가된 Cafe24 마이쇼핑 초안 파일

새로 만든 파일:

- `perpackage-vercel-public/cafe24-snippets/cafe24-myshop-cleanup-draft.html`

파일 성격:

- 실제 Cafe24 원본 파일을 대체하는 완성본이 아님
- 원본 마이쇼핑 템플릿과 대조해서 병합할 수 있는 참고 초안
- 페르패키지 톤에 맞는 마이페이지 UI 방향을 제시하는 파일

초안 작성 방향:

- 흰색과 남색 `#2A408C` 중심
- 카드형 UI
- 넓은 여백
- 둥근 모서리
- 외부 아이콘 폰트 없이도 텍스트만으로 이해 가능한 구조
- 모바일 390px 기준 가로 스크롤이 생기지 않도록 CSS 구성
- 일반 쇼핑몰 느낌보다 주문 내역, 상담 문의, 관심 패키지, 회원정보, 배송지 확인 중심으로 정리

## 6. 마이쇼핑 초안에 유지한 Cafe24 핵심 요소

초안 파일에는 아래 Cafe24 include와 module 구조를 유지했습니다.

- `<!--@layout(/layout/basic/layout.html)-->`
- `<!--@css(/_wg/css/myshop.css)-->`
- `module="Layout_MobileAction"`
- `module="myshop_asyncbenefit"`
- `module="myshop_asyncbankbook"`
- `module="myshop_orderstate"`
- `module="myshop_main"`
- `module="Myshop_InquiryDash"`

초안 파일에는 아래 핵심 변수도 유지했습니다.

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

## 7. 마이쇼핑 초안의 주요 화면 구성

### 상단 영역

- 제목을 `나의 패키지 관리`로 구성
- 주문 내역, 상담 문의, 관심 패키지 정보를 한곳에서 확인한다는 설명 추가
- 주문조회, 장바구니, 1:1 맞춤상담 바로가기 배치

### 회원 정보 카드

- 회원 이름, 회원 그룹, 그룹 이미지 영역 유지
- 그룹 이미지가 깨질 경우 화면이 무너지지 않도록 `onerror` 처리 유지

### 주요 바로가기 카드

상단에 고객이 자주 찾을 메뉴를 우선 배치했습니다.

- 주문조회
- 장바구니
- 회원정보
- 배송 주소록
- 1:1 맞춤상담
- 대량구매 문의 관리

### 주문처리 현황

- 입금전, 배송준비중, 배송중, 배송완료를 카드형으로 정리
- 취소, 교환, 반품은 보조 영역으로 정리
- 패키지 제작 건은 상담 및 제작 일정에 따라 실제 진행 단계가 별도 안내될 수 있다는 문구 추가

### 나의 쇼핑정보

- 적립금, 예치금, 쿠폰, 총주문 정보 유지
- 적립금/예치금/쿠폰은 과하게 강조하지 않음
- 총주문 정보는 상대적으로 더 잘 보이게 배치

### 상담 및 문의 관리

- 1:1 맞춤상담과 대량구매 문의 관리를 별도 섹션으로 정리
- 페르패키지의 상담형 패키지 제작 흐름에 맞게 구성

### 전체 메뉴

- 기존 한 줄 리스트 느낌 대신 카드 그리드 구조로 구성
- PC에서는 여러 열, 모바일에서는 1열 중심으로 반응형 처리
- 예치금, 게시물관리, 정기배송 관리, 좋아요는 낮은 우선순위로 표시

## 8. 새로 추가된 보고서 파일

새로 만든 보고서:

- `perpackage-vercel-public/reports/2026-06-26-cafe24-myshop-cleanup-draft-report.md`

보고서에 포함된 내용:

- 원본 파일 부재 확인 결과
- 새로 만든 마이쇼핑 초안 파일
- 유지한 Cafe24 module 목록
- 유지한 Cafe24 변수 목록
- 숨김 또는 낮은 강조 처리한 요소
- 오타 수정 방향
- 기능상 주의해야 할 부분
- Cafe24 적용 후 수동 확인 체크리스트

## 9. 검증 내용

마이쇼핑 초안 파일 기준으로 아래를 확인했습니다.

- 필수 Cafe24 include 존재 확인
- 주요 module 속성 존재 확인
- 주요 `{$...}` 변수 일부 존재 확인
- 금지 표현이 초안 HTML에 들어가지 않았는지 확인

금지 표현 검사 기준:

- 바로 구매하기
- 결제하기
- 확정 견적
- 당일 제작 가능
- 무조건 최저가
- 인쇄 포함 확정가
- 무조건 제작 가능
- 제작 확정
- 즉시 제작

검사 결과:

- 초안 HTML에서 위 금지 표현은 발견되지 않음

## 10. 현재 남은 중요한 확인 사항

아직 실제 Cafe24 원본 파일이 없기 때문에 아래 사항은 운영 적용 전 반드시 확인해야 합니다.

### 장바구니

- 실제 `/order/basket.html` 원본 확보 필요
- `Order_BasketPackage` 등 장바구니 모듈 구조 확인 필요
- 수량 변경, 옵션 변경, 선택 주문, 삭제, 총액 계산 action 보존 필요
- 원본 확보 후 페르패키지 톤의 CSS와 wrapper를 병합하는 방식 권장

### 마이쇼핑

- 실제 `/myshop/index.html` 또는 마이쇼핑 원본 확보 필요
- 주문 상태 카운트 변수명 확인 필요
- `Layout_MobileAction` 뒤로가기 동작 확인 필요
- 1:1 맞춤상담 URL 확인 필요
- 대량구매 문의 관리 URL 확인 필요
- 최근 본 상품, 좋아요, 정기배송, 게시물관리 URL 확인 필요
- 초안의 `per-myshop` wrapper와 CSS를 원본에 병합하는 방식 권장

## 11. 운영 적용 시 권장 순서

1. Cafe24 스마트디자인에서 장바구니 원본 HTML을 백업합니다.
2. Cafe24 스마트디자인에서 마이쇼핑 원본 HTML을 백업합니다.
3. 마이쇼핑 원본과 `cafe24-myshop-cleanup-draft.html`을 비교합니다.
4. 원본에만 있는 module, 변수, action은 절대 삭제하지 않습니다.
5. `per-myshop` wrapper와 CSS만 우선 적용합니다.
6. 링크 URL은 Cafe24 고객용 URL 기준으로 테스트합니다.
7. PC와 모바일에서 로그인 상태로 실제 표시 값을 확인합니다.
8. 콘솔 오류와 Cafe24 module 오류를 확인합니다.
9. 장바구니는 원본 확보 후 별도 정리합니다.

## 12. 기존 Cafe24 스마트디자인 산출물과의 관계

기준 보고서에서 만든 아래 파일들은 그대로 유지됩니다.

- `cafe24-main-snippet.html`
- `cafe24-support-snippet.html`
- `cafe24-guide-production-snippet.html`
- `cafe24-guide-design-snippet.html`
- `cafe24-guide-caution-snippet.html`
- `cafe24-common-css.css`
- `cafe24-common-js.js`

이번에 추가된 파일은 위 스니펫 세트의 후속 성격입니다.

- `cafe24-myshop-cleanup-draft.html`

단, 기존 `cafe24-common-css.css`에 아직 마이쇼핑 초안 CSS를 합치지는 않았습니다.
마이쇼핑은 Cafe24 기본 마이쇼핑 CSS와 충돌 가능성이 크기 때문에 우선 초안 파일 안에 scoped CSS로 보관했습니다.

## 13. 다음 작업 제안

1. Cafe24 관리자에서 장바구니 원본 HTML을 가져와 별도 정리
2. Cafe24 관리자에서 마이쇼핑 원본 HTML을 가져와 초안과 병합
3. 마이쇼핑 초안 CSS 중 운영에 안정적인 부분만 공통 CSS 또는 전용 CSS로 분리
4. 로그인 회원 기준으로 회원명, 등급, 주문현황, 쿠폰/적립금 표시 QA
5. 모바일 390px, 태블릿, PC 기준으로 마이쇼핑 카드 그리드 QA
6. 장바구니는 수량/옵션/삭제/선택주문 action을 실제 Cafe24 화면에서 확인

## 14. 한 줄 요약

기준 Cafe24 스마트디자인 GPT 보고서 이후, 장바구니와 마이쇼핑 원본 파일 부재를 확인했고, 원본을 대체하지 않는 방식으로 `cafe24-myshop-cleanup-draft.html` 마이쇼핑 병합용 초안과 후속 보고서를 추가했습니다.
