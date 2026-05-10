# AGENTS.md

이 저장소에서 Codex는 이 파일을 가장 먼저 읽고 작업을 시작한다.

## 1. 저장소 역할

이 저장소는 A&I 백엔드 커리큘럼의 부록/심화 자료인 Backend Systems Visual Lab 본체다.

중앙 레포는 안내 허브이며, 이 저장소는 다음을 담당한다.

- 1장~11장과 부록 A~C 커리큘럼 관리
- 실무 개념 정의 사전 관리
- Visual Lab 사이트 구현
- 디자인 시스템 관리
- Codex 작업 단계 관리
- starter, answer, scenario 데이터 관리

## 2. 작업 전 필수 확인

모든 작업은 아래 순서로 문서를 읽고 시작한다.

1. `AGENTS.md`
2. `README.md`
3. `docs/plan/project-plan.md`
4. `docs/plan/phase-roadmap.md`
5. `docs/plan/codex-execution-rules.md`
6. `docs/curriculum/curriculum-map.md`
7. `docs/sequences/README.md`
8. 구현 대상 장의 `docs/sequences/*.md`
9. 현재 작업과 직접 관련된 `docs/concepts`, `docs/design`, `docs/site` 문서

문서가 없거나 서로 충돌하면 작업을 임의로 밀어붙이지 말고 사용자에게 질문한다.

Codex는 `curriculum-map.md`만 보고 사이트를 구현하지 않는다.

반드시 `docs/sequences/README.md`와 구현 대상 장의 상세 sequence 문서를 읽고 작업한다.

## 3. Sequence Map 필수 확인

사이트 구현 또는 장별 데이터 작성 전 다음 문서를 반드시 읽는다.

1. `docs/sequences/README.md`
2. 구현 대상 장의 상세 sequence 문서
3. 구현 대상 장과 연결된 `docs/concepts/*.md`
4. `docs/design/visual-design-guide.md`
5. `docs/design/component-spec.md`
6. `docs/site/chapter-data-spec.md`
7. `docs/site/scenario-data-spec.md`

각 화면은 반드시 다음 흐름을 따른다.

```text
문제 상황 -> 관찰 지표 -> 원인 후보 -> 핵심 개념 -> 선택지 -> 다음 질문
```

Sequence Map 관련 금지 사항:

- 긴 이론 본문을 HTML에 직접 붙여넣지 않는다.
- 모든 장을 한 번에 완성하려고 하지 않는다.
- 일반 dark admin dashboard처럼 만들지 않는다.
- 카드 UI만 나열하지 않는다.
- 시작 Incident 없이 개념 설명으로 시작하지 않는다.

## 4. Phase 1 금지 사항

Phase 1에서는 문서 기반만 만든다.

금지:

- HTML 작성
- CSS 작성
- JavaScript 작성
- 임시 UI 생성
- `site/` 구현물 생성
- 외부 라이브러리 설치
- 중앙 레포 수정
- 기존 시퀀스 상태 변경

Phase 1 보정 작업도 같은 규칙을 따른다.

문서 품질, 디자인 지시, 개념 사전 보강은 허용하지만 구현 파일은 만들지 않는다.

Phase 1.5는 시퀀스 맵 상세 문서 구축 단계다.

Phase 1.5에서도 HTML, CSS, JavaScript, `site/` 구현물은 만들지 않는다.

## 5. 구현 Phase 원칙

사이트 구현은 Phase 2 이후에만 시작한다.

구현 Phase에서도 다음 원칙을 지킨다.

- Phase 2 첫 화면은 Hero Section, Codex Terminal Panel, Chapter Progress Rail, Incident 진입 단서 조합으로 시작한다.
- 한 번에 하나의 Phase만 진행한다.
- 한 번에 하나의 장 또는 기능 묶음만 구현한다.
- 긴 이론 본문을 HTML에 직접 넣지 않는다.
- 평범한 다크 관리자 대시보드처럼 만들지 않는다.
- 디자인은 `Midnight Codex Lab`을 기반으로 하되, 더 구체적으로 Codex 강의형 개발자 워크스페이스 느낌을 따른다.
- 모든 장은 문제 상황, 관찰 지표, 원인 후보, 해결 선택지, 코드/구조 연결을 가진다.
- 모든 개념은 정의, 실무 중요성, 흔한 오해, Visual Lab 반영 방식, 누락 방지 규칙을 가진다.
- 막히거나 모르는 내용이 있으면 반드시 사용자에게 질문한다.

## 6. 검증 기준

문서 작업 완료 전 확인할 것:

- 1장~11장과 부록 A~C가 빠지지 않았는가
- 개념 문서가 단순 용어 나열로 끝나지 않는가
- 금지 사항이 다음 Codex 작업자가 오해하지 않을 만큼 명확한가
- Phase 1에서 사이트 구현물이 생성되지 않았는가

사이트 구현 Phase 완료 전 확인할 것:

- 문서 스펙과 실제 데이터가 일치하는가
- 데스크톱과 모바일에서 텍스트가 겹치지 않는가
- 각 장이 문제 상황으로 시작하는가
- 개념 사전의 필수 개념이 화면에 반영됐는가
