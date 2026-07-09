# 페르패키지 플러그 견적문의 iframe 삽입 작업 보고

작성일: 2026-06-23

## 작업 목적

페르패키지 홈페이지의 견적문의 흐름을 외부 링크 이동 방식에서 홈페이지 내부 작성 방식으로 변경했습니다. 고객이 홈페이지를 벗어나지 않고 `#quote` 섹션에서 플러그 견적문의 폼을 바로 작성할 수 있도록 iframe을 삽입했습니다.

사용한 플러그 폼 URL:

```text
https://www.pluuug.com/form/TrPLMjXdJ1
```

## 수정한 파일

- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/perpackage-main-renewal.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`

## quote 섹션 적용 위치

`index.html`의 기존 하단 견적문의 영역을 교체했습니다.

- 위치: 포트폴리오 섹션 아래, footer 이전
- section id: `quote`
- 섹션 클래스: `perpackage-pluuug-form`

기존에는 외부 플러그 링크 버튼과 견적 준비 항목 카드가 있었고, 현재는 플러그 iframe 폼과 fallback 링크로 변경했습니다.

## 적용한 iframe 방식

플러그 관리자에서 별도 정식 임베드 코드나 UTM 수집 스크립트가 제공된 상태는 아니어서, 제공받은 폼 URL을 iframe `src`로 연결했습니다.

적용 핵심 구조:

```html
<iframe
  src="https://www.pluuug.com/form/TrPLMjXdJ1"
  title="페르패키지 견적문의 폼"
  loading="lazy"
  width="100%"
  height="1300"
  style="border:0;"
></iframe>
```

폼 미노출 상황을 대비해 외부 링크 fallback도 추가했습니다.

```html
<a href="https://www.pluuug.com/form/TrPLMjXdJ1" target="_blank" rel="noopener noreferrer">
  새 창에서 견적문의 작성하기
</a>
```

`head` 영역에는 추후 플러그 iframe UTM 수집 스크립트를 넣을 수 있도록 TODO 주석을 추가했습니다.

```html
<!-- TODO: 플러그 iframe UTM 수집 스크립트가 제공되면 이 위치에 삽입 -->
```

## quote 섹션 문구

제목:

```text
패키지 제작 문의를 남겨주세요
```

보조 문구:

```text
패키지 종류, 수량, 사이즈, 인쇄 여부를 남겨주시면 확인 후 상담을 도와드립니다.
```

안내 문구:

```text
최종 견적은 사양 확인 후 확정되며, 재고와 납기는 상담 후 안내됩니다.
```

## 스타일 적용 내용

`perpackage-main-renewal.css`에 플러그 iframe 전용 스타일을 추가했습니다.

- 흰색 기반, 남색 포인트 유지
- iframe을 카드형 박스 안에 배치
- PC 기준 최대 폭 약 1120px로 중앙 정렬
- 연한 테두리, 8px radius, 부드러운 shadow 적용
- PC iframe 최소 높이: 1300px
- 태블릿 iframe 최소 높이: 1400px
- 모바일 iframe 최소 높이: 1540px
- iframe 내부 스타일은 홈페이지 CSS로 수정하지 않음

추가된 주요 CSS 클래스:

- `.perpackage-pluuug-form`
- `.perpackage-pluuug-form__inner`
- `.perpackage-pluuug-form__header`
- `.perpackage-pluuug-form__notice`
- `.perpackage-pluuug-form__frame`
- `.perpackage-pluuug-form__fallback`

## 변경한 링크 href

상담/견적 성격의 주요 링크를 `#quote`로 모았습니다.

- 플로팅 `견적문의`: 외부 플러그 링크에서 `#quote`로 변경
- 빠른 메뉴 `빠른상담`: 외부 플러그 링크에서 `#quote`로 변경
- 빠른 메뉴 `샘플신청`: `#quote`로 변경
- 빠른 메뉴 `로고인쇄`: `#quote`로 변경
- 상단/카테고리 `로고인쇄`: `#quote`로 변경
- 소량/샘플 상담 배너: `#quote`로 변경
- 로고 인쇄 상담 배너: `#quote`로 변경
- 맞춤제작 상담 배너: `#quote` 유지
- 소량/샘플/로고 인쇄 관련 상품 카드 일부: `#quote`로 변경
- 가이드 카드 중 로고 인쇄 상담 전 준비자료: `#quote`로 변경
- 가이드 카드 중 소량 제작과 맞춤제작 차이: `#quote`로 변경

## 검증 결과

검증 환경:

- 파일 URL: `perpackage-vercel-public/index.html`
- PC 캡처: 1440px
- 모바일 캡처: 390px

검증 항목:

- PC에서 플러그 iframe 표시 확인
- 모바일에서 iframe 가로 overflow 없음
- iframe `title` 적용 확인
- fallback 링크의 `target="_blank"` 및 `rel="noopener noreferrer"` 확인
- 기존 상단 헤더 정상 표시
- 기존 배너 슬라이더 4개 렌더링 확인
- 기존 중단 포털 카드 렌더링 확인
- 콘솔 오류 없음
- 금지 문구 없음

검증 캡처:

- `perpackage-vercel-public/qa-pluuug-quote-desktop.png`
- `perpackage-vercel-public/qa-pluuug-quote-mobile.png`

## 플러그 정식 임베드 코드 사용 여부

정식 임베드 코드는 별도로 확인되지 않아 사용하지 않았습니다. 현재는 제공된 플러그 폼 URL을 iframe으로 직접 삽입한 방식입니다.

추후 플러그 관리자에서 정식 임베드 코드 또는 UTM 수집 스크립트가 제공되면 다음 작업이 필요합니다.

- `index.html`의 TODO 위치에 UTM 스크립트 추가
- 필요 시 iframe 코드 일부를 정식 임베드 코드로 교체
- PC/모바일 재검증

## 남은 작업

- 플러그 관리자에서 정식 임베드 코드 확인
- UTM 수집 스크립트 제공 여부 확인
- 실제 배포 환경에서 iframe 로딩 정책 및 보안 설정 확인
- 상담 완료 후 전환 추적 이벤트가 필요한 경우 별도 스크립트 설계
