# Component Spec

## 원칙

컴포넌트는 장식보다 학습 흐름을 돕는 역할을 한다. 카드 안에 장문을 넣지 않고, 지표와 선택지를 빠르게 비교할 수 있게 만든다.

## Hero Section

목적: 첫 화면에서 이 랩이 무엇을 다루고 어떤 방식으로 학습하는지 즉시 보여준다.

포함 요소:

- `Backend Systems Visual Lab` 제목
- `느려진 서비스부터 구조 설계까지` 수준의 짧은 한 줄 설명
- 다루는 범위를 압축한 supporting copy
- Codex Terminal Panel 또는 Chapter Progress Rail과 연결되는 primary action

표시 규칙:

- 첫 화면에서 가장 큰 타이포그래피를 사용한다.
- supporting copy는 2~3줄을 넘기지 않는다.
- Hero 아래에 다음 섹션 일부가 보이게 해서 랜딩 페이지처럼 닫힌 화면이 되지 않게 한다.

금지 사항:

- 긴 소개 문단을 넣지 않는다.
- 일반 마케팅 히어로처럼 추상적인 배경 이미지만 보여주지 않는다.
- 사이트 기능 설명을 장황하게 쓰지 않는다.

## Codex Terminal Panel

목적: Codex 작업 화면을 설명하는 개발자 강의형 분위기를 만든다.

포함 요소:

- prompt line
- command lines
- current goal
- selected chapter
- next diagnostic step
- short output rows

표시 규칙:

- 4~8줄의 짧은 명령과 출력만 보여준다.
- 보라색은 goal/workflow 강조에 제한해서 사용한다.
- mono font를 사용하되 본문 가독성을 해치지 않는다.

금지 사항:

- 실제 실행 가능한 위험 명령처럼 보이는 destructive command를 넣지 않는다.
- 터미널을 장식용으로만 두지 않는다.
- 긴 로그를 그대로 붙이지 않는다.

## Goal Step Panel

목적: 사용자가 지금 어떤 학습/진단 단계에 있는지 보여준다.

포함 요소:

- current goal
- step number
- check state
- next action
- blocked question

표시 규칙:

- 단계는 3~5개로 제한한다.
- 현재 단계는 active 상태로 표시한다.
- 막힌 지점은 질문이 필요한 상태로 표현한다.

금지 사항:

- 단순 체크리스트만 나열하지 않는다.
- 모든 단계를 같은 강조도로 보여주지 않는다.

## System Map Panel

목적: Client, API Server, DB, External API, Queue, Worker, Network 같은 시스템 요소의 관계를 보여준다.

포함 요소:

- node
- edge
- risk marker
- selected path
- related metric

표시 규칙:

- 현재 장과 관련 없는 요소는 흐리게 처리한다.
- 장애 지점과 관찰 지표를 연결한다.
- 복잡한 아키텍처 전체도를 한 번에 보여주지 않는다.

금지 사항:

- 모든 시스템 요소를 한 화면에 밀어 넣지 않는다.
- 장식용 다이어그램으로 끝내지 않는다.

## Chapter Progress Rail

목적: 전체 장과 현재 위치를 보여준다.

포함 요소:

- 장 번호
- 짧은 코드명
- 제목
- category badge
- 구현 상태

규칙:

- 1장~11장과 부록 A~C를 모두 표시한다.
- 현재 장은 라인, 배지, 배경 대비 중 둘 이상으로 강조한다.
- 준비 중인 장도 목록에는 남긴다.
- 긴 제목만 나열하지 않고 짧은 코드명을 함께 사용한다.

코드명 예시:

```text
01 INIT
02 PERF
03 DB
04 EXT
05 ASYNC
06 RACE
07 IO
08 SEC
09 OPS
10 NET
11 ARCH
A LOAD
B NOSQL
C LOCK
```

금지 사항:

- 단순 목차처럼만 보이게 하지 않는다.
- 현재 진행 상태와 planned 상태를 구분하지 않는 목록으로 만들지 않는다.

## Incident Panel

목적: 각 장의 시작 문제를 보여준다.

포함 요소:

- incident title
- situation
- user impact
- observations
- first question

규칙:

- 이론 정의보다 먼저 나온다.
- 화면 첫 스크롤 안에 반드시 보인다.
- 위험 상태는 작은 badge로 표시한다.
- 장문 설명을 넣지 않는다.
- 한 장은 상황, 영향, 관찰 지표, 첫 번째 질문으로 제한한다.

금지 사항:

- 개념 정의로 시작하지 않는다.
- 상황 설명을 강의 본문처럼 길게 쓰지 않는다.
- danger 색을 패널 전체 배경으로 쓰지 않는다.

## Metric Card

목적: 관찰 지표를 빠르게 비교한다.

포함 요소:

- label
- value
- unit
- meaning
- status

규칙:

- 숫자는 크고 명확하게 표시한다.
- 평균, p95, p99는 함께 보여준다.
- 상태는 색상과 텍스트를 함께 사용한다.

금지 사항:

- 지표 의미 없이 숫자만 보여주지 않는다.
- 모든 지표를 같은 색으로 강조하지 않는다.

## Flow Explorer

목적: 요청, DB, 외부 연동, 메시지, 서버 자원 흐름을 단계로 보여준다.

포함 요소:

- step label
- input
- processing
- output
- risk
- fix

규칙:

- 코드 전체를 붙여 넣지 않는다.
- 단계는 4~7개 정도로 제한한다.
- 현재 선택 단계만 강조한다.

금지 사항:

- sequence diagram처럼 보이지만 실제 판단 기준이 없는 흐름을 만들지 않는다.
- 한 단계에 긴 코드 블록을 넣지 않는다.

## Concept Card

목적: 장에서 필요한 개념을 실무 문제와 연결한다.

포함 요소:

- name
- short definition
- why it matters
- common mistake
- visual hint

규칙:

- 정의만 표시하지 않는다.
- 흔한 오해를 반드시 포함한다.
- 관련 장 링크를 둔다.

금지 사항:

- 용어집처럼 개념명과 정의만 나열하지 않는다.
- 한 카드에 여러 개념을 섞지 않는다.

## Decision Panel

목적: 해결 선택지의 기준과 부작용을 비교한다.

포함 요소:

- problem
- options
- recommended option
- tradeoff
- when to avoid

규칙:

- 정답 하나만 말하지 않는다.
- 추천 선택지에는 도입 조건과 부작용을 함께 둔다.
- 선택지가 너무 많으면 탭이나 그룹으로 나눈다.

금지 사항:

- 장점만 있는 선택지를 만들지 않는다.
- 추천 선택지를 만능 해결책처럼 표현하지 않는다.
