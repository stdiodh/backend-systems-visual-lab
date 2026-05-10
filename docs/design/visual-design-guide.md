# Visual Design Guide

## 디자인 콘셉트

```text
Midnight Codex Lab
```

이 랩은 밝은 교육용 인포그래픽 사이트가 아니라, 실무 시스템을 관찰하고 원인을 좁혀 가는 개발자용 학습 대시보드처럼 보여야 한다.

## 지향하는 느낌

- 어두운 배경
- 고대비 텍스트
- 절제된 라인과 상태 색상
- 터미널, 코드, 시스템 다이어그램 감성
- 지표와 흐름이 먼저 보이는 구성
- 복잡한 개념을 차분하게 정리하는 대시보드

## 피해야 할 느낌

- 밝은 파스텔 교육 사이트
- 과한 네온 사이버펑크
- 귀여운 카드 UI
- 무거운 관리자 페이지
- 긴 블로그 본문처럼 보이는 화면
- 장식 목적의 3D 그래픽

## Color Tokens

```css
:root {
  --color-bg: #070A12;
  --color-bg-soft: #0D1220;
  --color-panel: rgba(18, 24, 38, 0.82);
  --color-panel-solid: #121827;
  --color-panel-elevated: rgba(25, 33, 52, 0.92);

  --color-text-main: #F8FAFC;
  --color-text-sub: #A7B0C4;
  --color-text-muted: #687086;

  --color-line: rgba(148, 163, 184, 0.22);
  --color-line-strong: rgba(148, 163, 184, 0.38);

  --color-accent-blue: #5B8CFF;
  --color-accent-violet: #9B7CFF;
  --color-accent-cyan: #35D7C2;
  --color-accent-green: #7EE787;

  --color-danger: #FF6B81;
  --color-warning: #F6C177;

  --radius-card: 8px;
  --shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.35);
}
```

## Typography

- 기본 글꼴은 system UI와 한국어 sans-serif를 사용한다.
- 외부 폰트 import는 기본적으로 사용하지 않는다.
- 제목은 짧고 굵게 쓴다.
- 본문은 2~3줄을 넘기지 않는다.
- 지표와 코드 라벨은 mono 계열을 사용할 수 있다.
- viewport width로 폰트 크기를 직접 스케일링하지 않는다.
- letter spacing은 0을 기본으로 한다.

## Layout

기본 구조:

```text
page-shell
├── topbar
├── lab-layout
│   ├── chapter-rail
│   └── main-stage
│       ├── incident-panel
│       ├── metric-grid
│       ├── flow-explorer
│       ├── concept-grid
│       └── decision-panel
```

데스크톱에서는 좌측 chapter rail과 우측 main stage를 사용한다. 모바일에서는 chapter rail을 horizontal scroll 또는 select UI로 전환한다.

## 접근성

- 색상만으로 상태를 구분하지 않는다.
- 버튼과 탭은 키보드 포커스가 보여야 한다.
- 본문 텍스트 대비를 충분히 확보한다.
- 애니메이션은 필수 정보 전달 수단으로 쓰지 않는다.
- 모바일에서 카드 간격과 텍스트 줄바꿈을 검수한다.

