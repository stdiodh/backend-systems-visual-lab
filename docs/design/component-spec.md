# Component Spec

## 원칙

컴포넌트는 장식보다 학습 흐름을 돕는 역할을 한다. 카드 안에 장문을 넣지 않고, 지표와 선택지를 빠르게 비교할 수 있게 만든다.

## Chapter Rail

목적: 전체 장과 현재 위치를 보여준다.

포함 요소:

- 장 번호
- 제목
- category badge
- 구현 상태

규칙:

- 1장~11장과 부록 A~C를 모두 표시한다.
- 현재 장은 라인, 배지, 배경 대비 중 둘 이상으로 강조한다.
- 준비 중인 장도 목록에는 남긴다.

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
- 위험 상태는 작은 badge로 표시한다.
- 장문 설명을 넣지 않는다.

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

