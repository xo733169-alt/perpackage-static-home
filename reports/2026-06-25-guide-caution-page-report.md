# 페르패키지 제작주의사항 상세페이지 작업 보고서

작성일: 2026-06-25

## 1. 작업 목적

패키지 제작 전 고객이 반드시 확인해야 할 주의사항을 별도 상세페이지로 정리했습니다.

이번 페이지는 클레임 방지, 일정 지연 방지, 파일 오류 방지, 사양 오해 방지를 위한 안내 페이지입니다. 고객에게 부담을 주는 경고형 문구보다 제작 전에 확인하면 좋은 현실적인 안내 문구로 구성했습니다.

## 2. 새로 만든 파일

- `perpackage-vercel-public/guide-caution.html`

## 3. 수정한 기존 파일

- `perpackage-vercel-public/guide-production.html`
- `perpackage-vercel-public/guide-design.html`
- `perpackage-vercel-public/support.html`
- `perpackage-vercel-public/faq.html`
- `perpackage-vercel-public/product.html`
- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/perpackage-main-renewal.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`

## 4. 제작주의사항 페이지 구성

`guide-caution.html`은 아래 섹션으로 구성했습니다.

1. 공통 헤더
   - 홈, 상품목록, 제작가이드, 디자인가이드, 제작주의사항, FAQ, 고객센터, 견적문의 링크 제공

2. 히어로 영역
   - 제목: 제작주의사항
   - 견적문의하기, 제작가이드 보기, 디자인가이드 보기 CTA 제공

3. 핵심 안내 박스
   - 제작 전 확인이 필요한 이유
   - 사이즈, 재질, 인쇄, 후가공, 수량, 납기 조건에 따라 결과와 일정이 달라질 수 있다는 안내

4. 사이즈 관련 주의사항
   - 제품 사이즈와 박스 사이즈 차이
   - 제품 형태, 여유 공간, 완충재, 내부 트레이 여부
   - 실물 제품 확인의 장점
   - 사이즈표만 있을 경우의 오차 가능성

5. 색상 관련 주의사항
   - 화면 색상과 실제 인쇄 색상 차이
   - 종이 재질, 코팅, 인쇄 방식, 후가공에 따른 색감 차이
   - 브랜드 컬러 기준 확인 필요 가능성

6. 파일 관련 주의사항
   - 폰트 아웃라인 여부
   - 칼선과 디자인 레이어 구분
   - 이미지 해상도
   - 후가공 위치 표시
   - 최종 확인용 이미지 첨부
   - 수정용 원본과 제작용 파일 구분
   - 디자인가이드 연결

7. 후가공 관련 주의사항
   - 박
   - 형압
   - UV
   - 코팅
   - PET 창
   - 타공
   - 손잡이
   - 합지
   - 싸바리

8. 일정 관련 주의사항
   - 디자인 컨펌 이후 기준
   - 샘플 확인 여부
   - 인쇄, 후가공, 조립, 납품 일정
   - 급한 일정일수록 가능한 사양부터 확인해야 한다는 안내

9. 수량 관련 주의사항
   - 소량 제작 가능 여부와 단가 구조 확인
   - 일부 인쇄/후가공의 최소 수량 가능성
   - 샘플과 본 제작의 목적 차이

10. 납품/배송 관련 주의사항
   - 접힌 상태 납품과 완성 상태 납품 차이
   - 부피가 큰 상품의 보관과 운송 조건
   - 택배, 화물, 직접 수령 방식별 차이
   - 배송비는 부피와 수량에 따라 달라질 수 있다는 안내

11. 상품별 주의사항
   - 단상자
   - 싸바리박스
   - 쇼핑백
   - 봉투
   - 스티커·라벨
   - 카페용품

12. 하단 CTA
   - 견적문의하기: `index.html#quote`
   - 제작가이드 보기: `guide-production.html`
   - 디자인가이드 보기: `guide-design.html`
   - FAQ 보기: `faq.html`

## 5. 추가한 링크

아래 위치에 `guide-caution.html` 링크를 추가하거나 기존 제작주의사항 성격의 링크를 교체했습니다.

- `guide-production.html`
  - 상단 메뉴
  - 하단 메뉴
  - 기존 하단 CTA의 제작주의사항 링크 연결

- `guide-design.html`
  - 상단 메뉴
  - 하단 메뉴
  - 기존 CTA의 제작주의사항 링크 연결

- `support.html`
  - 상단 메뉴
  - 고객센터 허브 메뉴
  - 공지/가이드 목록
  - 하단 메뉴

- `faq.html`
  - 상단 메뉴
  - 하단 메뉴

- `product.html`
  - 상품 상세 FAQ 하단 관련 가이드 영역

- `index.html`
  - 고객센터 허브의 제작주의사항 카드

- `perpackage-main-renewal.js`
  - 메인 상단 아이콘 메뉴의 주의사항 항목
  - 메인 빠른 메뉴의 주의사항 항목

## 6. 주의사항 문구 처리 방향

- 과한 경고형 문구 대신 제작 전 확인하면 좋은 현실적인 안내 문구로 작성했습니다.
- “추가 비용 발생 가능성”은 안내형 문장 안에서만 사용했습니다.
- 일정 관련 문구는 단정하지 않고 “사양과 수량 확인 후 안내” 흐름으로 정리했습니다.
- 색상, 파일, 후가공, 수량, 배송은 결과가 달라질 수 있는 조건을 설명하는 방식으로 작성했습니다.

## 7. 안내형으로 둔 항목

이번 작업에서는 아래 기능을 새로 만들지 않았습니다.

- 실제 주문 기능
- 실제 결제 기능
- 실제 회원 기능
- 실제 파일 업로드 기능
- 자동 파일 검수 기능
- Cafe24 API 호출
- 외부 서버 연동

견적문의는 계속 `index.html#quote`와 Pluuug iframe 흐름을 유지했습니다.

## 8. 검증 결과

### 정적 검사

- JS 구문 검사 통과
  - `perpackage-main-renewal.js`
- 새 페이지 내 이미지 자산 경로 존재 확인
- 금지 표현 추가 없음
- 고객 화면 노출 금지 문구 추가 없음
- Cafe24 운영자 전용 경로 노출 없음

### 브라우저 QA

Chrome Headless 기준으로 아래 페이지를 확인했습니다.

- `guide-caution.html`
- `guide-production.html`
- `guide-design.html`
- `support.html`
- `faq.html`
- `product.html?category=box&product=basic-white-box`
- `index.html`

확인 결과:

- `guide-caution.html` 정상 로드
- PC 1440px에서 제작주의사항 페이지 정상 표시
- 모바일 390px에서 제작주의사항 페이지 가로 overflow 없음
- `guide-production.html`, `guide-design.html`과 시각 톤이 어색하지 않음
- `support.html`, `faq.html`, `product.html`에서 제작주의사항 링크 확인
- 견적문의 링크는 `index.html#quote` 흐름 유지
- 새 제작주의사항 페이지에 폼 없음
- 파일 업로드 input 없음
- 콘솔 오류 없음
- 고객 화면에 개발용 확인 문구 노출 없음
- 금지 표현 노출 없음

## 9. 다음 작업 제안

1. FAQ의 제작 주의사항 카테고리 질문을 `guide-caution.html`과 더 세밀하게 연결
2. 상품 상세페이지에서 상품 유형별 관련 주의사항을 조건부로 노출
3. 운영 적용 전 실제 클레임 사례를 바탕으로 주의사항 문구 보강
4. Cafe24 적용 시 제작주의사항 URL을 운영 경로로 전환
5. 추후 예시 이미지가 준비되면 사이즈/후가공/납품 섹션에 실제 샘플 이미지 추가

