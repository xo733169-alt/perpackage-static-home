# GPT 보고용: Cafe24 상품상세 인쇄파일 첨부 UI 개선 보고

## 1. 작업 목적

페르패키지 Cafe24 상품상세의 기존 기본 파일첨부 기능은 유지하면서, 고객이 보기에는 인쇄소/패키지 제작 사이트다운 파일 전달 안내 UI로 보이도록 개선했다.

이번 작업은 대용량 Vercel 업로드 기능을 구현하는 작업이 아니다. Cafe24 기본 파일첨부 모듈을 그대로 사용하고, 그 주변의 안내/탭/버튼/확인사항 UI만 개선했다.

## 2. 수정 파일

```txt
perpackage-vercel-public/cafe24-snippets/cafe24-product-fileoption-guide-snippet.html
```

## 3. 추가한 HTML 구조

기존 `product_fileoption` 스니펫을 아래 구조로 확장했다.

```txt
per-printshop-upload-box
per-printshop-upload-head
per-printshop-upload-tabs
per-printshop-upload-panel
per-printshop-native-file
per-file-option-guide
per-printshop-check
```

상단 탭은 아래 3개로 구성했다.

```txt
파일첨부
디자인의뢰
대용량 전달
```

각 탭 역할:

```txt
파일첨부: 10MB 이하 파일은 Cafe24 기본 파일첨부로 첨부
디자인의뢰: 디자인 파일이 없는 고객을 상담 문의로 안내
대용량 전달: 10MB 초과 파일은 메일 전달로 안내
```

## 4. Cafe24 기본 파일첨부 유지 방식

아래 요소는 삭제하거나 이름을 바꾸지 않았다.

```html
module="product_fileoption"
{$file_option_name}
{$form.file_option}
{$file_option_limit}
```

`{$form.file_option}`는 아래 위치에 그대로 남겼다.

```html
<div class="per-printshop-native-file">
    {$form.file_option}
</div>
```

따라서 실제 파일 선택과 주문 상세 연결은 기존 Cafe24 기본 파일첨부 기능을 사용한다.

## 5. 추가한 CSS 클래스

```txt
per-printshop-file-row
per-printshop-file-cell
per-printshop-upload-box
per-printshop-upload-head
per-printshop-upload-kicker
per-printshop-upload-tabs
per-printshop-upload-tab
per-printshop-upload-panels
per-printshop-upload-panel
per-printshop-panel-title
per-printshop-native-file
per-file-option-guide
per-printshop-panel-copy
per-printshop-action-link
per-printshop-mail-note
per-printshop-check
per-printshop-check-button
per-printshop-check-panel
```

## 6. 추가한 JS 기능

간단한 탭 전환과 “업로드 전 확인사항 보기” 접기/펼치기만 추가했다.

추가 기능:

```txt
파일첨부 / 디자인의뢰 / 대용량 전달 탭 전환
업로드 전 확인사항 패널 열기/닫기
```

하지 않은 기능:

```txt
파일 input 조작
drag/drop 업로드
DataTransfer 사용
input.files 강제 주입
AI/PDF/DXF/ZIP 미리보기
대용량 업로드 API 연결
```

## 7. 디자인 방향

페르패키지 톤에 맞춰 아래 스타일을 적용했다.

```txt
주색: #2A408C
보조 배경: #F7FAFF
선: #D9E2F2
둥근 모서리
과한 애니메이션 없음
인쇄/패키지 제작 상담 흐름 중심
```

## 8. 모바일 대응

640px 이하에서 아래처럼 동작한다.

```txt
3개 탭이 1열 버튼으로 전환
액션 버튼은 전체 폭 사용
안내 패널 padding 축소
텍스트 줄바꿈 허용
```

가로 overflow를 줄이기 위해 버튼/메일/긴 문구에 `overflow-wrap` 계열 처리를 적용했다.

## 9. 유지한 기존 기능

아래 기능은 수정하지 않았다.

```txt
Cafe24 기본 파일첨부
상품 옵션 선택
수량 선택
장바구니
구매하기
Cafe24 주문 상세 파일 확인
Cafe24 기본 옵션 테이블 구조
```

## 10. 금지 사항 준수

아래는 적용하지 않았다.

```txt
td.fileInfo { display: block; }
DataTransfer
input.files 직접 조작
drag/drop 실제 업로드
Cafe24 기본 파일첨부 input 숨김
Cafe24 기본 옵션 모듈 삭제
Vercel 대용량 업로드 API
S3/R2/Blob 저장소 연결
Webhook 자동 연결
UploadProject DB schema 변경
```

`td.fileInfo`는 아래처럼 테이블 셀 성격을 유지했다.

```css
.xans-product-detail .infoArea td.fileInfo.per-printshop-file-cell,
td.fileInfo.per-printshop-file-cell {
    display: table-cell !important;
    width: auto !important;
    vertical-align: top;
}
```

## 11. 안내 문구

파일첨부 탭:

```txt
10MB 이하 파일은 아래 파일 선택으로 첨부해주세요.
AI, PDF, ZIP, DXF 파일 업로드를 권장합니다.
파일은 최대 5개까지 {$file_option_limit}M 이하로 개별 업로드 가능합니다.
선택한 파일은 주문 완료 후 Cafe24 관리자 주문상세에서 확인합니다.
여러 파일은 ZIP으로 압축해 첨부해주세요.
```

디자인의뢰 탭:

```txt
디자인 파일이 아직 없으신가요?
로고, 문구, 참고 이미지가 있다면 상담 후 디자인 작업 가능 여부를 안내드립니다.
```

대용량 전달 탭:

```txt
10MB를 초과하는 파일은 별도 전달이 필요합니다.
대용량 AI, PDF, ZIP, 이미지 원본 파일은 주문번호와 함께 메일로 보내주세요.
peerlpackage@peerl.co.kr
```

## 12. 테스트/확인 결과

로컬에서 확인한 항목:

```txt
module="product_fileoption" 유지 확인
{$file_option_name} 유지 확인
{$form.file_option} 유지 확인
{$file_option_limit} 유지 확인
mailto:peerlpackage@peerl.co.kr 링크 포함 확인
DataTransfer/input.files/drag/drop 실제 조작 코드 없음 확인
TODO 문구 없음 확인
td.fileInfo display:block 금지 규칙 준수 확인
```

Git 확인:

```txt
perpackage-vercel-public 폴더는 현재 Git 저장소로 인식되지 않아 git status / git pull origin main 실행이 불가했다.
```

## 13. Cafe24 적용 방법

Cafe24 스마트디자인 상품상세에서 아래 위치의 `product_fileoption` 블록에 동일하게 적용한다.

```txt
1. 상품 옵션 테이블 안의 <tr module="product_fileoption">
2. 선택된 옵션/상품 목록 안의 <tr module="product_fileoption">
```

적용 시 주의:

```txt
두 위치 모두 동일한 구조로 교체
Cafe24 치환 변수 삭제 금지
구매하기/장바구니/옵션선택 모듈 수정 금지
CSS와 JS는 상품상세 하단 또는 공통 CSS/JS 영역에 넣기
```

## 14. 수동 테스트 항목

Cafe24 테스트 스킨에서 아래를 확인해야 한다.

```txt
1. 상품상세에서 파일첨부/디자인의뢰/대용량 전달 탭이 보이는지
2. 파일첨부 탭 안에 Cafe24 기본 파일 선택 버튼이 그대로 보이는지
3. AI/PDF/ZIP/DXF 파일 선택 시 파일명이 표시되는지
4. 주문 완료 후 Cafe24 관리자 주문상세에서 첨부파일이 보이는지
5. 디자인 상담 문의하기 버튼이 게시판으로 이동하는지
6. 메일로 대용량 파일 보내기 버튼이 mailto 링크로 열리는지
7. 업로드 전 확인사항 패널이 열리고 닫히는지
8. 모바일에서 탭/버튼/안내문이 깨지지 않는지
9. 구매하기/장바구니/옵션선택이 기존처럼 동작하는지
```

## 15. 추후 대용량 업로드 연결 위치

나중에 Vercel/S3/R2/Blob/NAS 기반 대용량 업로드를 붙일 경우, 현재 `대용량 전달` 탭의 mailto 버튼을 업로드 페이지 링크로 교체하면 된다.

현재는 대용량 업로드 시스템을 만들지 않고 이메일 안내만 제공한다.

