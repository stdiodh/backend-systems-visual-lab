# Sequence Map

이 디렉터리는 `Backend Systems Visual Lab`의 장별 상세 시퀀스 문서를
관리한다.

`docs/curriculum/curriculum-map.md`는 전체 목차와 순서를 고정하고,
이 디렉터리의 각 문서는 실제 Visual Lab 구현자가 읽어야 할 상세 흐름을 고정한다.

## 구현 전 필수 참조 순서

1. `AGENTS.md`
2. `README.md`
3. `docs/curriculum/curriculum-map.md`
4. `docs/sequences/README.md`
5. 구현 대상 장의 `docs/sequences/*.md`
6. 관련 `docs/concepts/*.md`
7. `docs/design/*.md`
8. `docs/site/*.md`

## 중요한 규칙

- Codex는 `curriculum-map.md`만 보고 사이트를 구현하지 않는다.
- 각 장은 반드시 시작 Incident에서 출발한다.
- 긴 이론 본문을 HTML에 그대로 넣지 않는다.
- 화면은 `문제 상황 → 관찰 지표 → 원인 후보 → 핵심 개념 → 선택지 → 다음 질문` 흐름을 따른다.
- 각 시퀀스는 이전 장과 다음 장을 연결해야 한다.
- UX/UI는 일반 문서 사이트가 아니라 Codex 강의형 개발자 워크스페이스 느낌을 따른다.

## 시퀀스 목록

| Sequence | File | Category |
|---|---|---|
| 01 | `01-intro.md` | Intro |
| 02 | `02-performance-triage.md` | Performance |
| 03 | `03-db-query-and-transaction.md` | Database |
| 04 | `04-external-integration.md` | External Integration |
| 05 | `05-async-integration.md` | Async Integration |
| 06 | `06-concurrency.md` | Concurrency |
| 07 | `07-io-bottleneck.md` | IO |
| 08 | `08-security.md` | Security |
| 09 | `09-server-basics.md` | Server Basics |
| 10 | `10-network-basics.md` | Network |
| 11 | `11-architecture-patterns.md` | Architecture |
| A | `appendix-a-performance-test.md` | Performance Test |
| B | `appendix-b-nosql.md` | NoSQL |
| C | `appendix-c-db-distributed-lock.md` | DB Distributed Lock |
