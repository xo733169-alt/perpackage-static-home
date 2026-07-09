# 페르패키지 FAQ 페이지 기존 홈페이지 연결 작업 보고

작성일: 2026-06-25  
작업 대상: `perpackage-vercel-public`  
작업 유형: 독립 FAQ 페이지를 메인 홈페이지 흐름에 연결

## 1. 작업 목적

이미 별도 산출물로 제작되어 있던 페르패키지 FAQ 독립 페이지를 기존 홈페이지에서 실제로 접근할 수 있게 연결했습니다.

이번 작업은 FAQ 페이지를 다시 만드는 작업이 아니라, 기존 FAQ 산출물을 `perpackage-vercel-public` 안으로 배치하고 메인, 카테고리, 상품 상세, 푸터, 가이드 영역에서 이동할 수 있게 연결하는 작업입니다.

## 2. 새로 만든 파일

### `perpackage-vercel-public/faq.html`

기존 원본:

```text
perpackage-faq-page/perpackage-faq-page.html
```

위 파일을 기반으로 기존 홈페이지에서 바로 접근 가능한 복사본을 만들었습니다.

적용 사항:

- FAQ 독립 페이지 구조 유지
- 상단에 간단한 페르패키지 로고/홈/상품목록/제작가이드/견적문의 링크 추가
- `inquiryUrl`을 현재 위치 기준에 맞게 수정
- ChannelIO fallback 로직 유지
- 기존 FAQ 검색, 카테고리 필터, 아코디언, TOP 질문 구조 유지

## 3. 수정한 파일

### `perpackage-vercel-public/index.html`

추가한 위치:

- 상단 유틸 메뉴에 `FAQ` 링크 추가
- 푸터 메뉴에 `FAQ` 링크 추가

링크:

```text
faq.html
```

### `perpackage-vercel-public/perpackage-main-renewal.js`

메인 `UPDATE PERPACKAGE` 영역에 FAQ 카드가 렌더링되도록 `guideUpdateItems` 배열에 항목을 추가했습니다.

추가 항목:

```js
{
  title: "자주 묻는 질문",
  description: "견적문의 전 자주 확인하는 내용을 모았습니다",
  image: "assets/icons/new/icon-checklist.png",
  href: "faq.html",
  badge: "FAQ",
  alt: "자주 묻는 질문 아이콘"
}
```

### `perpackage-vercel-public/category.html`

추가한 위치:

- 상단 유틸 메뉴에 `FAQ` 링크 추가
- 푸터 메뉴에 `FAQ` 링크 추가

### `perpackage-vercel-public/perpackage-category.js`

카테고리 페이지의 안내 링크 카드 영역에 FAQ 카드가 나오도록 `categoryLinkCards` 배열에 항목을 추가했습니다.

추가 항목:

```js
{
  title: "자주 묻는 질문",
  description: "디자인 파일, 납기, 소량 제작 관련 질문을 모았습니다.",
  href: "faq.html",
  badge: "FAQ"
}
```

### `perpackage-vercel-public/product.html`

추가한 위치:

- 상단 유틸 메뉴에 `FAQ` 링크 추가
- 상품 상세 FAQ 섹션 하단에 `제작 전 자주 묻는 질문 확인하기` 링크 추가
- 푸터 메뉴에 `FAQ` 링크 추가

상품 상세 FAQ 하단 링크:

```html
<a href="faq.html" aria-label="페르패키지 전체 자주 묻는 질문 보기">
  제작 전 자주 묻는 질문 확인하기
</a>
```

### `perpackage-vercel-public/perpackage-main-renewal.css`

상품 상세 FAQ 하단 링크 전용 스타일을 추가했습니다.

추가 클래스:

- `.pp-product-faq-more`
- `.pp-product-faq-more a`
- `.pp-product-faq-more a:hover`
- `.pp-product-faq-more a:focus-visible`

기존 상품 상세 FAQ 디자인과 어울리도록 작은 pill 형태 링크로 구성했습니다.

## 4. FAQ 내부 설정

`perpackage-vercel-public/faq.html` 안의 `PP_FAQ_CONFIG`를 현재 홈페이지 구조에 맞게 수정했습니다.

현재 설정:

```js
var PP_FAQ_CONFIG = window.PP_FAQ_CONFIG || {
  inquiryUrl: "index.html#quote",
  channelTalkUrl: "",
  channelTalkMode: "channelio"
};
```

### 견적문의 링크

FAQ 페이지 내부의 견적문의 CTA는 아래로 이동합니다.

```text
index.html#quote
```

### ChannelTalk 설정

변경 없이 fallback 구조를 유지했습니다.

- `channelTalkUrl`: 빈 값 유지
- `channelTalkMode`: `channelio` 유지
- `window.ChannelIO`가 있으면 `ChannelIO("showMessenger")` 호출
- ChannelIO 스크립트와 URL이 없으면 안내 문구 표시

실제 채널톡 URL은 임의로 넣지 않았습니다.

## 5. 보존한 파일

아래 원본 산출물은 직접 수정하지 않았습니다.

```text
perpackage-faq-page/perpackage-faq-page.html
perpackage-faq-page/perpackage-faq-page-cafe24-snippet.html
perpackage-faq-page/perpackage-faq-page-guide.md
perpackage-faq-page/perpackage-faq-page-outputs.zip
```

Cafe24 본문 삽입용 스니펫은 보존했습니다.

## 6. 우측 고정 퀵메뉴 처리

우측 고정 퀵메뉴에는 FAQ를 추가하지 않았습니다.

이유:

- 현재 우측 퀵메뉴는 견적문의, 카톡상담, 사업자등록증, 통장사본, TOP 중심으로 이미 충분히 구성되어 있음
- FAQ까지 추가하면 메뉴가 길어져 기존 목적이 흐려질 수 있음
- FAQ는 상단, 푸터, 가이드 영역, 상품 상세에서 접근 가능하게 연결함

## 7. 검증 결과

Chrome headless/CDP 기준으로 아래 항목을 확인했습니다.

### FAQ 페이지

- `perpackage-vercel-public/faq.html` 정상 로드
- FAQ 검색 정상 동작
- 검색어 `소량` 입력 시 결과 갱신 확인
- FAQ 카테고리 필터 정상 동작
- `소량 제작` 카테고리 선택 상태 확인
- TOP 질문 클릭 후 FAQ 아코디언 확장 확인
- 하단/상단 견적문의 링크가 `index.html#quote`로 연결되는지 확인
- ChannelIO가 없는 상태에서 fallback 안내 문구 표시 확인
- 콘솔 예외 없음

검증 결과 일부:

```json
{
  "searchCount": "전체 질문 3개",
  "selectedCategory": "소량 제작",
  "expandedAfterJump": true,
  "quoteHref": "index.html#quote",
  "fallbackVisible": true,
  "exceptions": []
}
```

### 모바일 390px

모바일 emulation 기준:

```json
{
  "innerWidth": 390,
  "docScrollWidth": 390,
  "bodyScrollWidth": 390,
  "faqCategoriesOverflow": true,
  "exceptions": []
}
```

해석:

- 페이지 전체 가로 overflow 없음
- 카테고리 버튼 영역은 의도한 가로 스크롤 구조
- 콘솔 예외 없음

### 기존 페이지 링크 확인

검증 결과:

```json
{
  "index": {
    "faqLinks": 3,
    "exceptions": []
  },
  "category": {
    "faqLinks": 3,
    "exceptions": []
  },
  "product": {
    "faqLinks": 3,
    "exceptions": []
  }
}
```

메인, 카테고리, 상품 상세 페이지에서 각각 `faq.html` 링크가 정상적으로 확인되었습니다.

## 8. 금지 표현 확인

아래 표현은 새로 추가하지 않았습니다.

- 바로 구매하기
- 결제하기
- 확정 견적
- 당일 제작 가능
- 무조건 최저가
- 인쇄 포함 확정가
- 무조건 제작 가능

## 9. 남은 작업

운영 적용 전 남은 작업은 아래 정도입니다.

1. 실제 채널톡 URL 또는 ChannelIO 스크립트를 운영 환경에서 연결할지 결정
2. FAQ 페이지를 추후 공통 헤더/푸터 구조로 완전히 통합할지 결정
3. Cafe24에 FAQ를 별도 페이지로 만들 경우 `perpackage-faq-page-cafe24-snippet.html`을 활용
4. 실제 고객 문의가 쌓이면 FAQ 항목 추가 및 문구 보강

## 10. 다음 GPT에게 전달할 핵심

FAQ 페이지는 이제 아래 경로에서 접근 가능합니다.

```text
perpackage-vercel-public/faq.html
```

기존 홈페이지 흐름에서는 아래 위치에서 FAQ로 이동할 수 있습니다.

- 메인 상단 유틸 메뉴
- 메인 푸터
- 메인 `UPDATE PERPACKAGE` 카드
- 카테고리 상단 유틸 메뉴
- 카테고리 푸터
- 카테고리 안내 링크 카드
- 상품 상세 상단 유틸 메뉴
- 상품 상세 FAQ 섹션 하단
- 상품 상세 푸터

다음 작업자는 새 FAQ 페이지를 다시 만들 필요가 없고, 필요 시 `faq.html`의 공통 헤더/푸터 통합 또는 ChannelTalk 운영 링크 연결만 이어서 진행하면 됩니다.
