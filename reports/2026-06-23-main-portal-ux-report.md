# 페르패키지 메인 중단 포털형 쇼핑몰 UX 작업 보고

작성일: 2026-06-23

## 작업 요약

페르패키지 메인페이지 중단 영역을 퍼블로그 메인처럼 여러 쇼핑몰 섹션이 이어지는 포털형 탐색 구조로 개편했습니다. 상단 메뉴, 메인 배너, 빠른 메뉴가 실제 중단 섹션으로 이동하도록 id와 href도 정리했습니다.

## 수정 파일

- `perpackage-vercel-public/index.html`
- `perpackage-vercel-public/perpackage-main-renewal.js`
- `perpackage-vercel-public/perpackage-main-renewal.css`

## 추가 섹션 id

- `#new-products`: WHAT'S NEW
- `#best-seller`: BEST SELLER
- `#box-products`: 기성 박스
- `#bag-envelope-products`: 쇼핑백·봉투
- `#sticker-label-products`: 스티커·라벨
- `#small-sample`: 샘플·소량
- `#mid-promotion`: 중간 프로모션 배너
- `#theme-shop`: 테마별 추천 패키지
- `#guide-updates`: UPDATE PERPACKAGE

## JS 데이터 배열

아래 배열을 기준으로 섹션별 콘텐츠를 관리하도록 정리했습니다.

- `newProductItems`
- `bestSellerItems`
- `boxProductItems`
- `bagEnvelopeItems`
- `stickerLabelItems`
- `smallSampleItems`
- `midPromotionBanners`
- `themeShopItems`
- `guideUpdateItems`

각 항목은 `title`, `description`, `image`, `href`, `badge`, `meta`, `alt` 중심으로 구성했습니다.

## 연결한 이미지 경로

주요 상품 카드와 테마 카드:

- `perpackage-vercel-public/assets/shop-thumbs/category-folding-carton.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/category-corrugated-box.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/category-shopping-bag.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/category-envelope.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/category-sleeve.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/category-sticker-label.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/category-gift-box.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/category-sample-set.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/purpose-cosmetic.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/purpose-dessert.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/purpose-event.jpg`

상단/중간 배너:

- `perpackage-vercel-public/assets/shop-thumbs/hero-package-set.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/hero-small-sample.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/hero-logo-print.jpg`
- `perpackage-vercel-public/assets/shop-thumbs/hero-custom-drawing.jpg`
- `perpackage-vercel-public/assets/rolling-banners/rolling-ready-made-all.png`
- `perpackage-vercel-public/assets/rolling-banners/rolling-fast-box.png`

원본 이미지 파일은 덮어쓰지 않았고, 현재 공개 폴더에서 바로 연결 가능한 자산을 우선 사용했습니다.

## 상단 링크 정리

- 전체상품: `#new-products`
- 장바구니: `#best-seller`
- 단상자/택배박스/선물상자: `#box-products`
- 쇼핑백/봉투·슬리브: `#bag-envelope-products`
- 스티커·라벨: `#sticker-label-products`
- 샘플·소량: `#small-sample`
- 로고인쇄: `#mid-promotion`
- 제작가이드/이벤트: `#guide-updates`
- 맞춤제작상담/견적함: `#quote`

예전 `#products`, `#equipment` 연결 흔적도 정리했습니다.

## 검증 결과

- JS 문법 검사: 통과
- hash 링크 누락 검사: 누락 없음
- 이미지 경로 검사: 누락 없음
- 금지 문구 검사: 금지 문구 없음
- PC 1440px 브라우저 검증: 정상 렌더링
- 모바일 390px 브라우저 검증: 가로 overflow 없음
- 콘솔 오류/경고: 없음
- 중간 프로모션 배너 내부 반복 CTA 버튼: 없음
- 배너 클릭 링크: 정상 hash 이동 확인

검증 캡처:

- `perpackage-vercel-public/qa-main-portal-desktop.png`
- `perpackage-vercel-public/qa-main-portal-mobile.png`
- `perpackage-vercel-public/qa-main-portal-mid-desktop.png`
- `perpackage-vercel-public/qa-main-portal-mid-mobile.png`

## 남은 작업

- 실제 상품 상세 페이지가 생기면 각 카드의 `href`를 개별 상품 URL로 교체
- 카페24 업로드 전 이미지 용량 최적화 여부 확인
- 공식 상품명, 최소 수량, 재고 표시 기준이 확정되면 `meta` 문구 업데이트
- 중간 배너는 추후 최종 디자인 이미지가 확정되면 `midPromotionBanners`의 `image`만 교체
