# Visual Design Guide

## 디자인 콘셉트

```text
Midnight Codex Lab
```

이 랩은 밝은 교육용 인포그래픽 사이트가 아니라, 실무 시스템을 관찰하고 원인을 좁혀 가는 개발자용 학습 대시보드처럼 보여야 한다.

더 구체적인 화면 인상은 다음이다.

```text
Codex 강의형 개발자 워크스페이스
```

즉, 강의 슬라이드의 큰 메시지, Codex 작업 패널의 명령 흐름, 실무 장애 대시보드의 관찰 지표가 한 화면 안에서 연결되어야 한다.

## Reference Mood

이 사이트는 일반 교육용 카드 UI가 아니라 Codex 작업 화면을 설명하는 개발자 강의형 UI를 목표로 한다.

화면은 다음 느낌을 따른다.

- 어두운 작업 공간
- 큰 제목과 짧은 설명
- 코드/명령어 패널
- 작업 단계가 보이는 좌측 또는 상단 내비게이션
- 선택한 단계가 강조되는 실습형 레이아웃
- 설명보다 지금 무엇을 보고 무엇을 판단해야 하는지가 먼저 보이는 화면
- 장애를 분석하는 실무 대시보드와 Codex goal workflow가 섞인 화면

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
- 평범한 다크 admin dashboard
- 어두운 Bootstrap 카드 모음
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

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 28px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;

  --elevation-panel: 0 16px 48px rgba(0, 0, 0, 0.28);
  --elevation-command: 0 24px 80px rgba(0, 0, 0, 0.38);
  --elevation-focus: 0 0 0 3px rgba(91, 140, 255, 0.28);

  --radius-card: var(--radius-md);
  --shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.35);
}
```

## Color Usage Ratio

- 배경: 70%
- 패널: 20%
- 강조색: 8%
- 위험/경고색: 2%

색상 사용 규칙:

- 파랑은 주요 action과 현재 선택 상태에만 사용한다.
- 보라색은 AI, Codex, Goal, workflow 관련 강조에만 사용한다.
- 민트색은 성공, 정상 흐름, recovered 상태에 사용한다.
- 빨강은 장애, timeout, lock conflict, 보안 위험에만 사용한다.
- 노랑은 warning, saturation, retry 증가처럼 아직 장애는 아니지만 주의가 필요한 상태에 사용한다.
- 한 컴포넌트 안에서 accent 색을 2개 넘게 쓰지 않는다.

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
├── hero-section
│   ├── hero-copy
│   └── codex-terminal-panel
├── lab-layout
│   ├── chapter-progress-rail
│   └── main-stage
│       ├── incident-panel
│       ├── metric-grid
│       ├── flow-explorer
│       ├── concept-grid
│       └── decision-panel
```

데스크톱에서는 좌측 chapter rail과 우측 main stage를 사용한다. 모바일에서는 chapter rail을 horizontal scroll 또는 select UI로 전환한다.

## Hero Rules

첫 화면은 다음 조합을 가진다.

왼쪽:

- `Backend Systems Visual Lab`
- `느려진 서비스부터 구조 설계까지`
- 성능, DB, 외부 연동, 비동기, 동시성, IO, 보안, 서버, 네트워크, 아키텍처를 하나의 장애 흐름으로 학습한다는 짧은 설명

오른쪽:

- Codex Terminal Panel
- goal 또는 diagnose 명령처럼 보이는 4~6줄의 짧은 프롬프트
- 현재 Phase, selected chapter, next diagnostic step

금지:

- Hero를 마케팅 랜딩 페이지처럼 만들지 않는다.
- Hero에 장문의 소개 글을 넣지 않는다.
- Hero 오른쪽을 일반 이미지 카드로 채우지 않는다.

## Radius Rules

- Hero Section과 Incident Panel: `--radius-lg` 또는 `--radius-xl`
- Metric Card와 Concept Card: `--radius-md`
- Code/Terminal Panel: `--radius-md`
- 작은 badge와 status chip: `--radius-sm`

## Panel Elevation Rules

- 기본 패널은 `--elevation-panel`을 사용한다.
- Codex Terminal Panel처럼 첫 화면에서 가장 중요한 패널은 `--elevation-command`를 사용한다.
- hover elevation은 약하게만 올리고, 레이아웃이 움직일 정도의 transform은 피한다.

## Interaction States

- active: 파란색 border 또는 좌측 line과 함께 label 텍스트를 밝게 만든다.
- hover: 배경 명도와 border만 조금 올린다.
- focus: `--elevation-focus` 또는 명확한 outline을 제공한다.
- disabled/planned: opacity만 낮추지 말고 `planned` 텍스트도 함께 표시한다.
- danger: 빨강 배경을 넓게 깔지 않고 badge, line, icon 영역에 제한한다.

## Mobile Rules

- Chapter Progress Rail은 상단 horizontal scroll 또는 segmented control로 전환한다.
- Hero는 한 컬럼으로 쌓고 Codex Terminal Panel을 제목 아래에 둔다.
- Metric Card는 2열 이하로 제한한다.
- Flow Explorer는 가로 스크롤보다 단계별 accordion 또는 vertical timeline을 우선한다.
- 버튼, 카드, 터미널 줄의 텍스트가 부모 영역 밖으로 넘치지 않아야 한다.

## 접근성

- 색상만으로 상태를 구분하지 않는다.
- 버튼과 탭은 키보드 포커스가 보여야 한다.
- 본문 텍스트 대비를 충분히 확보한다.
- 애니메이션은 필수 정보 전달 수단으로 쓰지 않는다.
- 모바일에서 카드 간격과 텍스트 줄바꿈을 검수한다.
