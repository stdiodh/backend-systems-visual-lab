# A&I Backend Systems Visual Lab

이 저장소는 A&I 백엔드 커리큘럼의 부록/심화 자료로 사용할 통합 Visual Lab이다.

현재 저장소 이름은 `backend-systems-visual-lab`이다.

이 랩은 단일 시퀀스 보조 페이지가 아니다.

실무 백엔드 시스템 전반을 하나의 흐름으로 학습하기 위한 별도 학습 공간이다.

## 목적

기존 시퀀스 실습을 마친 뒤, 실무 백엔드 시스템에서 자주 만나는 주제를 Visual Lab으로 학습한다.

다루는 주제는 성능, DB, 외부 연동, 비동기, 동시성, IO, 보안, 서버, 네트워크, 아키텍처다.

학습 흐름은 다음과 같다.

```text
느려진 서비스
-> DB 병목
-> 외부 연동 장애
-> 비동기 처리
-> 동시성 문제
-> IO 병목
-> 보안 기준
-> 서버와 네트워크 추적
-> 구조와 설계 패턴
```

## 중앙 레포와의 관계

이 저장소는 `A-AND-I-4TH-CODE-LAB`의 정규 시퀀스가 아니라 부록/심화 자료다.

중앙 레포는 이 저장소를 안내 링크로만 참조한다.

중앙 레포의 `docs/sequences/*` 완료 상태, 기존 서브모듈 포인터, 기존 시퀀스별 Visual Lab 구현 위치는 변경하지 않는다.

## Phase 1 범위

현재 Phase 1은 문서 기반 구축만 다룬다.

Phase 1에서 하는 일:

1. 프로젝트 기준 문서 작성
2. 전체 커리큘럼 맵 작성
3. 장별 범위와 학습 흐름 작성
4. 실무 개념 사전 작성
5. 디자인 방향 문서 작성
6. 사이트 데이터 구조 문서 작성
7. Codex 실행 규칙과 다음 Phase 프롬프트 작성

Phase 1에서 하지 않는 일:

- `index.html` 구현
- CSS 작성
- JavaScript 작성
- 카드 UI 또는 임시 더미 사이트 생성
- 중앙 레포 문서 수정
- 기존 시퀀스 상태 변경

## 문서 구조

```text
docs/
├── plan/
├── curriculum/
├── sequences/
├── concepts/
├── design/
├── site/
└── prompts/
```

## Sequence Map 참조 규칙

사이트 구현자는 `docs/curriculum/curriculum-map.md`만 보고 구현하지 않는다.

구현 전 필수 참조 순서:

1. `AGENTS.md`
2. `README.md`
3. `docs/curriculum/curriculum-map.md`
4. `docs/sequences/README.md`
5. 구현 대상 장의 `docs/sequences/*.md`
6. 관련 `docs/concepts/*.md`
7. `docs/design/*.md`
8. `docs/site/*.md`

`curriculum-map.md`는 전체 목차와 순서를 고정한다.

`docs/sequences/*.md`는 각 장의 상세 학습 흐름과 화면 반영 기준을 고정한다.

Codex는 구현 전에 반드시 대상 시퀀스 문서의 아래 섹션을 확인한다.

- `Visual Lab 화면 반영 방식`
- `데이터 모델 힌트`
- `인터랙티브 시나리오 제안`
- `누락 방지 체크리스트`

Codex는 각 장 구현 전에 아래 질문에 답할 수 있어야 한다.

- 이 장은 이전 장에서 어떤 문제를 이어받는가?
- 이 장의 시작 Incident는 무엇인가?
- 학습자가 가장 먼저 볼 지표는 무엇인가?
- 반드시 다룰 개념은 무엇인가?
- 흔한 오해는 무엇인가?
- Visual Lab 화면에는 어떤 패널로 반영할 것인가?
- 다음 장으로 어떤 문제가 넘어가는가?

## 주요 문서

- [프로젝트 계획](docs/plan/project-plan.md)
- [Phase 로드맵](docs/plan/phase-roadmap.md)
- [Codex 실행 규칙](docs/plan/codex-execution-rules.md)
- [커리큘럼 맵](docs/curriculum/curriculum-map.md)
- [장별 범위](docs/curriculum/chapter-scope.md)
- [학습 흐름](docs/curriculum/learning-flow.md)
- [시퀀스 맵](docs/sequences/README.md)
- [개념 사전](docs/concepts/concept-dictionary.md)
- [비주얼 디자인 가이드](docs/design/visual-design-guide.md)
- [컴포넌트 스펙](docs/design/component-spec.md)
- [콘텐츠 UI 규칙](docs/design/content-ui-rules.md)
- [콘텐츠 스키마](docs/site/content-schema.md)
- [장 데이터 스펙](docs/site/chapter-data-spec.md)
- [시나리오 데이터 스펙](docs/site/scenario-data-spec.md)
- [Phase 1.5 적용 프롬프트](docs/prompts/phase-1-5-apply-sequence-map.md)
- [Phase 2 프롬프트](docs/prompts/phase-2-site-shell.md)
- [검수 프롬프트](docs/prompts/review-prompt.md)

## 다루는 범위

1. 들어가며
2. 느려진 서비스, 어디부터 봐야 할까
3. 성능을 좌우하는 DB 설계와 쿼리
4. 외부 연동이 문제일 때 살펴봐야 할 것들
5. 비동기 연동, 언제 어떻게 써야 할까
6. 동시성, 데이터가 꼬이기 전에 잡아야 한다
7. IO 병목, 어떻게 해결하지
8. 실무에서 꼭 필요한 보안 지식
9. 최소한 알고 있어야 할 서버 지식
10. 모르면 답답해지는 네트워크 기초
11. 자주 쓰는 서버 구조와 설계 패턴
12. 부록 A: 성능 테스트
13. 부록 B: NoSQL 이해하기
14. 부록 C: DB로 분산 잠금 구현하기
