# 페르패키지 디자인가이드 상세페이지 작업 보고서

작성일: 2026-06-25

## 1. 작업 목적

패키지 제작 문의 전 고객이 디자인 파일을 어떻게 준비해야 하는지 이해할 수 있도록 별도 디자인가이드 페이지를 만들었습니다.

전문 디자이너뿐 아니라 패키지 제작이 처음인 고객, 학생, 소상공인도 이해할 수 있도록 짧은 문장과 카드형 안내 중심으로 구성했습니다. 실제 파일 업로드, 자동 검수, 주문/회원 데이터 기능은 추가하지 않았습니다.

## 2. 새로 만든 파일

- `perpackage-vercel-public/guide-design.html`

## 3. 수정한 기존 파일

- `perpackage-vercel-public/guide-production.html`
- `perpackage-vercel-public/support.html`
- `perpackage-vercel-public/faq.html`
- `perpackage-vercel-public/product.html`
- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/perpackage-main-renewal.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`

## 4. 디자인가이드 페이지 구성

`guide-design.html`은 아래 섹션으로 구성했습니다.

1. 공통 헤더
   - 홈, 상품목록, 제작가이드, 디자인가이드, FAQ, 고객센터, 견적문의 링크 제공

2. 히어로 영역
   - 제목: 디자인가이드
   - 견적문의하기, 제작가이드 보기, 제작주의사항 보기 CTA 제공

3. 디자인 파일 준비 기본
   - AI 또는 PDF 파일 권장
   - 칼선과 디자인 레이어 구분
   - 폰트 아웃라인 처리
   - 이미지 해상도 확인
   - 색상 모드 확인
   - 재단 여백 확인
   - 후가공 위치 표시
   - 최종 확인용 이미지 첨부

4. 칼선과 디자인 파일 비교
   - 칼선 파일: 재단선, 접힘선, 풀칠면, 창 위치, 후가공 위치
   - 디자인 파일: 로고, 제품명, 문구, 배경색, 이미지

5. 폰트 아웃라인 안내
   - 글자가 다른 폰트로 바뀔 수 있는 이유
   - 아웃라인 의미
   - 수정용 원본 보관 안내
   - Windows/Mac 단축키 안내

6. 색상 안내
   - 화면 색과 인쇄 색 차이
   - 재질, 코팅, 인쇄 방식에 따른 색감 차이
   - 브랜드 컬러 상담 필요 가능성

7. 이미지 해상도 안내
   - 벡터 로고 권장
   - 사진 원본 사용 권장
   - 캡처 이미지와 메신저 압축 이미지 주의

8. 후가공 표시 안내
   - 박 위치
   - 형압 위치
   - UV 위치
   - PET 창 위치
   - 타공 위치
   - 손잡이 위치

9. 파일 전달 전 체크리스트
   - 파일 열림 여부
   - 폰트 아웃라인
   - 칼선/디자인 레이어 구분
   - 재단선과 중요 문구 간격
   - 이미지 품질
   - 후가공 위치
   - 수정용 원본과 제작용 파일 구분
   - 최종 확인용 이미지 준비

10. 하단 CTA
   - 견적문의하기: `index.html#quote`
   - 제작가이드 보기: `guide-production.html`
   - 제작주의사항 보기: `guide-caution.html`

## 5. 추가한 링크

아래 위치에 `guide-design.html` 링크를 추가하거나 기존 디자인가이드 성격의 링크를 교체했습니다.

- `guide-production.html`
  - 상단 메뉴
  - 하단 메뉴
  - 기존 하단 CTA의 디자인 파일 가이드 링크 연결

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
  - 고객센터 허브의 디자인가이드 카드

- `perpackage-main-renewal.js`
  - 메인 상단 아이콘 메뉴의 디자인가이드 항목

## 6. 안내형으로 둔 항목

이번 작업에서는 아래 기능을 만들지 않고 안내형 콘텐츠로만 구성했습니다.

- 실제 파일 업로드
- 실제 파일 자동 검수
- 인쇄 파일 오류 자동 판정
- 주문 데이터 조회
- 결제 데이터 조회
- 회원정보 연동
- Cafe24 API 호출
- 외부 서버 연동

견적문의는 계속 `index.html#quote`와 Pluuug iframe 흐름을 유지했습니다.

## 7. 검증 결과

### 정적 검사

- JS 구문 검사 통과
  - `perpackage-main-renewal.js`
- 새 페이지 내 이미지 자산 경로 존재 확인
- 금지 표현 추가 없음
- 고객 화면 노출 금지 문구 추가 없음
- Cafe24 운영자 전용 경로 노출 없음

### 브라우저 QA

Chrome Headless 기준으로 아래 페이지를 확인했습니다.

- `guide-design.html`
- `guide-production.html`
- `support.html`
- `faq.html`
- `product.html?category=box&product=basic-white-box`
- `index.html`

확인 결과:

- `guide-design.html` 정상 로드
- PC 1440px에서 디자인가이드 페이지 정상 표시
- 모바일 390px에서 디자인가이드 페이지 가로 overflow 없음
- `guide-production.html`과 시각 톤이 어색하지 않음
- `support.html`, `faq.html`, `product.html`에서 디자인가이드 링크 확인
- 견적문의 링크는 `index.html#quote` 흐름 유지
- 파일 업로드 input 없음
- 콘솔 오류 없음
- 고객 화면에 개발용 확인 문구 노출 없음
- 금지 표현 노출 없음

## 8. 다음 작업 제안

1. `guide-caution.html` 제작주의사항 상세페이지 제작
2. FAQ의 디자인 파일 관련 질문을 `guide-design.html` 섹션과 더 세밀하게 연결
3. 실제 운영 전에 파일 접수 방식과 상담 채널 URL 확정
4. 추후 예시 이미지가 준비되면 칼선/디자인 비교 영역에 실제 샘플 이미지 추가
5. Cafe24 적용 시 디자인가이드 URL을 운영 경로로 전환
