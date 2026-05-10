# Review Prompt

아래 프롬프트는 각 Phase 작업 후 검수에 사용한다.

```text
Backend Systems Visual Lab 작업 결과를 검수해주세요.

먼저 아래 문서를 읽으세요.

1. AGENTS.md
2. README.md
3. docs/plan/project-plan.md
4. docs/plan/phase-roadmap.md
5. docs/plan/codex-execution-rules.md

검수 기준:

1. 현재 Phase 범위를 넘는 파일을 만들지 않았는가
2. 1장~11장과 부록 A~C 범위가 누락되지 않았는가
3. 각 장이 문제 상황, 관찰 지표, 원인 후보, 해결 선택지, 코드/구조 연결을 갖는가
4. 각 개념이 정의, 실무 중요성, 흔한 오해, Visual Lab 반영 방식, Codex 누락 방지 규칙을 갖는가
5. 사이트 구현 Phase라면 긴 이론 본문을 HTML에 넣지 않았는가
6. 디자인은 docs/design 기준을 따르는가
7. 중앙 레포의 시퀀스 상태나 서브모듈 포인터를 건드리지 않았는가
8. 사용자가 모르면 질문하라고 한 영역을 추측으로 채우지 않았는가

문제가 있으면 파일별로 수정안을 제시하고 바로 수정하세요.
```

