# 페르패키지 Cafe24 스마트디자인 테마 구조

작성일: 2026-07-11

## 목적

현재 정적 홈페이지를 Cafe24 스마트디자인에 붙일 때 반복되는 헤더, 푸터, 퀵메뉴와 공통 자산을 한 곳에서 관리하기 위한 배포용 구조입니다.

기존 `cafe24-apply-ready` 폴더의 마이페이지, 장바구니, 회원가입 작업은 별도 운영 기능이므로 이 폴더에서 덮어쓰지 않습니다.

## 핵심 원칙

- 모든 페이지는 최상단에서 `<!--@layout(...)-->`으로 공통 레이아웃을 불러옵니다.
- 레이아웃은 `<!--@contents-->` 위치에 페이지 본문을 삽입합니다.
- 헤더, 푸터, 퀵메뉴는 `<!--@import(...)-->`로 한 번만 관리합니다.
- 공통 CSS와 JavaScript는 레이아웃에서 한 번만 로드합니다.
- 상품, 가격, 재고, 진열은 정적 JavaScript 배열이 아니라 Cafe24 상품 모듈을 사용합니다.
- 기존 Cafe24 주문, 회원, 장바구니, 게시판 action과 변수는 재구현하지 않습니다.
- 별도 jQuery를 추가하지 않습니다. Cafe24 기본 스크립트와의 충돌을 피하기 위해 새 코드는 순수 JavaScript로 작성했습니다.
- CSS는 `.pp-cafe24-site` 또는 `pp-cafe24-*` 클래스 안에서만 동작합니다.

## Cafe24 업로드 경로

| 이 폴더 파일 | Cafe24 스마트디자인 경로 |
| --- | --- |
| `layout/basic/layout.html` | `/layout/basic/layout.html` |
| `layout/basic/main.html` | `/layout/basic/main.html` |
| `_wg/perpackage/header.html` | `/_wg/perpackage/header.html` |
| `_wg/perpackage/footer.html` | `/_wg/perpackage/footer.html` |
| `_wg/perpackage/quick-menu.html` | `/_wg/perpackage/quick-menu.html` |
| `_wg/perpackage/product-card.html` | `/_wg/perpackage/product-card.html` |
| `_wg/perpackage/pages/*.html` | `/_wg/perpackage/pages/*.html` |
| `css/perpackage/*.css` | `/css/perpackage/*.css` |
| `js/perpackage/*.js` | `/js/perpackage/*.js` |
| `index.html` | `/index.html` |
| `product/list.html` | `/product/list.html` |
| `custom/*.html` | `/custom/*.html` |

## 적용 전 중요한 판단

현재 운영 스킨의 `/layout/basic/layout.html`과 `/layout/basic/main.html`에 앱, 결제, 채널, 추적 스크립트 또는 스킨 전용 import가 있으면 이 폴더의 레이아웃으로 통째로 덮어쓰지 마세요.

안전한 방법은 기존 레이아웃을 백업한 뒤 다음 항목만 병합하는 것입니다.

```html
<!--@css(/css/perpackage/theme.css)-->
<!--@js(/js/perpackage/config.js)-->
<!--@js(/js/perpackage/common.js)-->
<!-- 상품분류 페이지에서만 /js/perpackage/category.js를 추가로 불러옵니다. -->

<!--@import(/_wg/perpackage/header.html)-->
<!--@contents-->
<!--@import(/_wg/perpackage/footer.html)-->
<!--@import(/_wg/perpackage/quick-menu.html)-->
```

## Cafe24 네이티브 모듈

### 공통 레이아웃

- `Layout_stateLogoff`, `Layout_stateLogon`: 로그인 상태별 메뉴
- `Layout_SearchHeader`: Cafe24 상품 검색 입력과 검색 action
- `Layout_orderBasketcount`: 장바구니 수량
- `Layout_category`: 관리자에 등록한 상품분류
- `Layout_footer`: 회사 및 법적 고지 정보

### 메인

- `product_listmain_2`: 신상품 진열
- `product_listmain_1`: 추천상품 진열
- 상품 카드 마크업은 `/_wg/perpackage/product-card.html`에서 공통 관리

### 상품분류

- `product_headcategory`: 카테고리 제목, 경로, 상단 이미지
- `product_displaycategory`: 하위 카테고리
- `product_normalmenu`: 상품 수와 정렬
- `product_listnormal`: 일반상품 목록
- `product_normalpaging`: 페이징

## Cafe24 데이터 연결 방식

스마트디자인 HTML에서 Cafe24 데이터베이스에 SQL로 직접 접속하지 않습니다. 상품, 분류, 회원 상태, 장바구니 수량과 회사 정보는 Cafe24 모듈과 변수가 서버에서 출력하도록 구성합니다.

- 상품분류: `Layout_category`, `product_headcategory`, `product_displaycategory`
- 메인 진열: `product_listmain_1`, `product_listmain_2`
- 상품목록: `product_listnormal`, `product_ListItem`, `product_normalpaging`
- 회원·주문: `Layout_stateLogoff`, `Layout_stateLogon`, `Layout_orderBasketcount`
- 회사 정보: `Layout_footer`

따라서 이 테마를 `peerl.cafe24.com`의 복제 테스트 스킨에 적용하면 관리자에 등록된 실제 상품명, 가격, 이미지, 카테고리와 회원 상태를 모듈이 불러옵니다. 외부 시스템에서 주문이나 상품을 별도로 조회해야 할 때만 Cafe24 Admin API와 OAuth를 서버에서 사용하며, 인증정보를 스킨 JavaScript에 넣지 않습니다.

공식 모듈 참고:

- `Layout_category`: https://sdsupport.cafe24.com/module/layout/category.html
- 상품분류·상품목록 모듈: https://sdsupport.cafe24.com/module/product/list.html

## 공통 아이콘 관리

헤더, 메인 바로가기, PC·모바일 퀵메뉴 아이콘은 `/js/perpackage/config.js`의 `icons` 객체에서 한 번만 관리합니다. HTML에서는 `data-pp-icon` 키만 지정합니다.

아이콘 원본은 기존 Vercel 홈페이지에서 정상 사용 중인 Cafe24 CDN 주소인 `https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/`를 사용합니다. 아이콘 파일명이 바뀌면 여러 HTML을 수정하지 말고 `config.js`만 변경합니다.

## 상단 카테고리 배너 관리

`/product/list.html`은 별도 소개 문구 없이 Cafe24 관리자에 등록한 카테고리 상단 이미지부터 시작합니다.

관리자 상품분류에서 `top_image1`, `top_image2`, `top_image3`에 해당하는 이미지를 등록하면 배너 영역에 자동 반영됩니다. 상단 이미지가 없으면 배너 영역은 표시되지 않고 하위 분류와 상품 목록부터 시작합니다.

## 카테고리 번호 관리

메인 퀵메뉴와 고정 CTA의 카테고리 URL은 `/js/perpackage/config.js`에서 한 번만 관리합니다.

- 패키지 상위분류: `cate_no=44`
- 고급 선물 패키지: `cate_no=63`
- 단박스: `cate_no=65`
- 상하박스: `cate_no=66`
- C형박스: `cate_no=67`
- 단추박스: `cate_no=68`
- 싸바리박스: `cate_no=64`
- 쇼핑백: `cate_no=45`
- 명함: `cate_no=43`
- 봉투·슬리브: `cate_no=42`
- 더스트백: `cate_no=46`
- 부자재: `cate_no=54`
- 카페용품: `cate_no=87`
- 디자인의뢰: `cate_no=95`

위 번호는 2026-07-10 `https://peerl.cafe24.com/`에서 확인한 운영 분류 기준입니다. 카테고리 번호가 변경되면 HTML 여러 곳을 찾지 말고 `config.js`만 수정합니다. 헤더의 `Layout_category` 영역은 Cafe24 관리자 상품분류를 직접 읽으므로 별도 수정이 필요하지 않습니다.

## 적용 순서

1. 운영 스킨을 복사해 테스트 스킨을 만듭니다.
2. 현재 레이아웃, 상품목록, 메인, 공통 CSS/JS를 백업합니다.
3. `/_wg/perpackage/`, `/css/perpackage/`, `/js/perpackage/` 파일을 먼저 생성합니다.
4. 기존 레이아웃에 공통 CSS/JS와 import를 병합합니다.
5. `/index.html`을 적용하고 메인 상품 진열 1, 2를 관리자에서 설정합니다.
6. `/product/list.html`을 적용하고 카테고리 상단 이미지를 등록합니다.
7. `/custom/*.html`과 안내 본문 import 파일을 적용합니다.
8. `APPLY_CHECKLIST.md` 순서로 PC, 모바일, 로그인, 검색, 장바구니, 상품 진열을 확인합니다.

## 로컬 미리보기

프로젝트 폴더를 HTTP 서버로 연 뒤 다음 주소를 확인합니다.

```text
http://127.0.0.1:4173/cafe24-theme/preview/index.html
```

미리보기는 Cafe24 변수를 가짜 데이터로 바꿔 레이아웃만 확인합니다. 실제 상품 가격, 재고, 로그인 상태, 검색, 장바구니 action은 Cafe24 테스트 스킨에서 최종 검증해야 합니다.

## Vercel 팀 검수 배포

Vercel 검수 화면은 실제 Cafe24 템플릿과 섞이지 않도록 `preview` 폴더에서만 구성합니다.

- `preview/deploy-index.html`: Vercel 검수용 메인 진입 파일
- `preview/deploy-category.html`: Vercel 검수용 상품분류 진입 파일
- `preview/deploy-content.html`: 제작가이드, 디자인가이드, 주의사항, FAQ, 고객센터 공통 검수 진입 파일
- `preview/content.html`: 로컬 안내 페이지 검수 진입 파일. `?page=guide-production`처럼 페이지 키를 전달합니다.
- `preview/preview.css`: 검수 화면 전환 바 전용 스타일
- `preview/preview.js`: Cafe24 변수와 상품 데이터를 검수용 예시로 치환하고 검수용 링크와 검색을 연결
- `vercel.json`: 일반적인 폴더 단위 Vercel 배포에서 루트 진입 경로를 미리보기로 연결

위 파일과 Vercel 설정은 Cafe24 스마트디자인에 업로드하지 않습니다. Cafe24에는 이 문서의 `Cafe24 업로드 경로` 표에 있는 레이아웃, 공통 조각, CSS, JavaScript, 페이지 템플릿만 적용합니다.

Vercel 검수본의 상품과 회사 정보는 화면 확인용 예시입니다. 검색은 검수용 상품분류 화면으로 이동하며, 로그인·장바구니·주문·게시판 링크는 현재 Cafe24 사이트를 새 창으로 엽니다. 실제 회원 상태와 상품 데이터 연결은 Cafe24 복제 테스트 스킨에서 별도로 확인해야 합니다.

### 상품분류 롤링배너

`product/list.html`의 상단 롤링배너는 외부 슬라이더 라이브러리 없이 `js/perpackage/category.js`가 제어합니다.

- 현재 `cate_no`에 따라 카테고리명, 배너 문구, 이미지, 추천 용도, 상담 준비사항과 제작 방식이 바뀝니다.
- 3개 배너를 자동 전환하며 이전, 다음, 일시정지, 현재 번호와 진행 상태를 제공합니다.
- 마우스 오버, 키보드 포커스, 브라우저 비활성 상태에서는 자동 전환을 멈춥니다.
- `prefers-reduced-motion` 환경에서는 자동 전환과 부드러운 이동을 사용하지 않습니다.
- 배너 이미지는 페르패키지 Cafe24 CDN의 기존 패키지 사진만 사용합니다.

로컬 구조 검증은 Windows PowerShell에서 다음 명령으로 실행합니다.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\cafe24-theme\validate.ps1
```

## 변경 금지 범위

이 테마 전환만으로 다음 파일을 덮어쓰지 않습니다.

- `/product/detail.html`
- `/order/basket.html`
- `/order/orderform.html`
- `/myshop/index.html`
- `/member/join.html`
- 파일 업로드 위젯과 재업로드 흐름

이 화면들은 Cafe24 기능 모듈과 연결되어 있으므로 기존 스킨 원본을 기준으로 별도 병합과 실제 주문 테스트가 필요합니다.
