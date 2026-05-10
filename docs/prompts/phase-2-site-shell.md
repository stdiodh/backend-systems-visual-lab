# Phase 2 Site Shell Prompt

아래 프롬프트는 Phase 2에서 Codex에 전달한다.

```text
현재 저장소는 A&I 백엔드 커리큘럼의 부록/심화 자료인 Backend Systems Visual Lab 본체입니다.

작업 시작 전에 반드시 아래 문서를 순서대로 읽으세요.

1. AGENTS.md
2. README.md
3. docs/plan/project-plan.md
4. docs/plan/phase-roadmap.md
5. docs/plan/codex-execution-rules.md
6. docs/curriculum/curriculum-map.md
7. docs/sequences/README.md
8. docs/sequences/01-intro.md
9. docs/sequences/02-performance-triage.md
10. docs/sequences/03-db-query-and-transaction.md
11. docs/curriculum/chapter-scope.md
12. docs/design/visual-design-guide.md
13. docs/design/component-spec.md
14. docs/design/content-ui-rules.md
15. docs/site/content-schema.md
16. docs/site/chapter-data-spec.md
17. docs/site/scenario-data-spec.md

주의:
curriculum-map.md만 보고 구현하지 마세요.
반드시 docs/sequences/README.md와 구현 대상 장의 상세 sequence 문서를 기준으로 화면을 만드세요.
각 sequence 문서의 Visual Lab 화면 반영 방식, 데이터 모델 힌트,
인터랙티브 시나리오 제안, 누락 방지 체크리스트를 확인하세요.

목표:
Phase 2는 사이트 껍데기만 구현합니다.
전체 장 목록, 기본 레이아웃, 디자인 토큰, 데이터 렌더링 구조를 만듭니다.

디자인 목표:
Midnight Codex Lab을 기반으로 하되, 더 구체적으로 "Codex 강의형 개발자 워크스페이스" 느낌을 따릅니다.
평범한 다크 관리자 대시보드처럼 만들지 마세요.
평범한 dark admin dashboard처럼 만들지 마세요.
첫 화면은 Hero Section + Codex Terminal Panel + Chapter Progress Rail + Incident 진입 단서 조합으로 만드세요.
디자인은 Midnight Codex Lab이라는 추상 표현에 그치지 말고, Codex 강의형 개발자 워크스페이스 느낌을 구현하세요.

생성할 파일:
- site/index.html
- site/assets/
- site/styles/tokens.css
- site/styles/base.css
- site/styles/components.css
- site/styles/layout.css
- site/scripts/app.js
- site/scripts/chapters.js
- site/scripts/scenarios.js
- site/scripts/glossary.js

주의:
- 1장~11장과 부록 A~C 목록은 모두 보여주세요.
- 상세 콘텐츠는 01~03장만 최소 데이터로 작성하고, 나머지는 placeholder 상태로 둬도 됩니다.
- 01~03장 상세 콘텐츠는 해당 docs/sequences 문서의 Incident, 지표,
  원인 후보, UX 컴포넌트, 데이터 모델 힌트를 기준으로 작성하세요.
- 긴 이론 본문은 HTML에 직접 넣지 마세요.
- 카드 UI만 나열하지 말고, 문제 상황 -> 관찰 지표 -> 흐름 -> 선택지 순서가 보이게 만드세요.
- 외부 라이브러리, React, Vue, Next.js, Tailwind, Bootstrap을 쓰지 마세요.
- Vanilla HTML/CSS/JS로 구현하세요.
- 디자인은 Midnight Codex Lab이 아니라, 더 구체적으로 "Codex 강의형 개발자 워크스페이스" 느낌을 따르세요.
- 일반 교육용 카드 UI, 평범한 admin dashboard, 어두운 Bootstrap 카드 모음처럼 만들지 마세요.
- 텍스트가 모바일과 데스크톱에서 겹치지 않게 확인하세요.

완료 후:
- 생성/수정 파일을 요약하세요.
- Phase 2에서 의도적으로 하지 않은 상세 장 구현을 명시하세요.
- 가능한 경우 로컬 정적 서버로 화면을 확인하세요.
```
