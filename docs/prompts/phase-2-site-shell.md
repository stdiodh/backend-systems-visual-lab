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
7. docs/curriculum/chapter-scope.md
8. docs/design/visual-design-guide.md
9. docs/design/component-spec.md
10. docs/design/content-ui-rules.md
11. docs/site/content-schema.md
12. docs/site/chapter-data-spec.md
13. docs/site/scenario-data-spec.md

목표:
Phase 2는 사이트 껍데기만 구현합니다.
전체 장 목록, 기본 레이아웃, 디자인 토큰, 데이터 렌더링 구조를 만듭니다.

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
- 긴 이론 본문을 HTML에 넣지 마세요.
- 외부 라이브러리, React, Vue, Next.js, Tailwind, Bootstrap을 쓰지 마세요.
- Vanilla HTML/CSS/JS로 구현하세요.
- 디자인은 Midnight Codex Lab 방향을 따르세요.
- 텍스트가 모바일과 데스크톱에서 겹치지 않게 확인하세요.

완료 후:
- 생성/수정 파일을 요약하세요.
- Phase 2에서 의도적으로 하지 않은 상세 장 구현을 명시하세요.
- 가능한 경우 로컬 정적 서버로 화면을 확인하세요.
```

