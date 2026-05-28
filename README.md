# 📋 할 일 목록 (Todo List)

## 주요 기능

- 할 일 추가 — 입력창에 텍스트를 입력 후 버튼 클릭 또는 Enter 키로 추가
- 완료 체크 — 체크박스 클릭으로 완료 상태 표시 (취소선 적용)
- 수정 — 수정 버튼 클릭 시 입력창으로 전환, 내용 변경 후 저장
- 삭제 — 삭제 버튼 클릭으로 항목 제거
- 데이터 유지 — 브라우저를 새로고침해도 할 일 목록이 사라지지 않음

---

## 적용된 자바스크립트 핵심 기술

**DOM 제어**
- `document.querySelector()`로 HTML 요소 선택
- `.innerHTML`로 HTML 문자열을 화면에 동적 렌더링
- `.value`로 입력창의 텍스트 값 읽기
- `style.display`로 요소 보이기/숨기기

**이벤트 처리**
- `onclick` 속성으로 버튼 클릭 이벤트 처리
- `onkeydown` 이벤트로 Enter 키 입력 감지

**데이터 저장**
- `localStorage.setItem()` / `localStorage.getItem()`으로 데이터 영구 저장
- `JSON.stringify()`로 배열을 문자열로 변환 후 저장
- `JSON.parse()`로 문자열을 다시 배열로 변환해 불러오기

---

## 파일 구조

```
📁 프로젝트 폴더
├── index.html   # 화면 구조
├── style.css    # 스타일
└── script.js    # 기능 로직
```

---

## 실행 방법

VS Code의 Live Server 확장 프로그램을 설치 후 `index.html`을 열어 실행합니다.
