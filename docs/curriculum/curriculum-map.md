# Curriculum Map

이 문서는 Backend Systems Visual Lab의 전체 목차와 학습 순서를 고정한다.

중요: 이 문서는 전체 흐름을 보여주는 지도다.

사이트 구현자는 이 문서만 보고 구현하지 않는다.

각 장의 세부 내용은 `docs/sequences/*.md`를 반드시 함께 참조한다.

## 참조 규칙

1. 전체 순서와 장 제목은 이 문서에서 확인한다.
2. 장별 상세 흐름, Incident, 핵심 개념, UX/UI 반영 방식은 `docs/sequences/*.md`에서 확인한다.
3. 개념 정의는 `docs/concepts/*.md`와 함께 교차 확인한다.
4. 디자인 구현은 `docs/design/*.md`를 기준으로 한다.
5. 사이트 데이터 구조는 `docs/site/*.md`를 기준으로 한다.

## 전체 시퀀스 맵

### 01. 들어가며

- Category: `intro`
- Detail Doc: [01-intro.md](../sequences/01-intro.md)
- Next Question: 단순히 코드가 동작하는 서비스가 사용자가 늘어나면 왜 느려지는가?

### 02. 느려진 서비스, 어디부터 봐야 할까

- Category: `performance`
- Detail Doc: [02-performance-triage.md](../sequences/02-performance-triage.md)
- Next Question: 느려짐의 원인이 DB라면 어떤 쿼리와 설계를 먼저 봐야 하는가?

### 03. 성능을 좌우하는 DB 설계와 쿼리

- Category: `database`
- Detail Doc: [03-db-query-and-transaction.md](../sequences/03-db-query-and-transaction.md)
- Next Question: DB가 아닌 외부 API나 연동 서비스가 문제라면 timeout, retry,
  circuit breaker를 어떻게 봐야 하는가?

### 04. 외부 연동이 문제일 때 살펴봐야 할 것들

- Category: `external-integration`
- Detail Doc: [04-external-integration.md](../sequences/04-external-integration.md)
- Next Question: 외부 연동을 사용자 요청에서 분리하려면 언제 비동기 연동을
  선택해야 하는가?

### 05. 비동기 연동, 언제 어떻게 써야 할까

- Category: `async`
- Detail Doc: [05-async-integration.md](../sequences/05-async-integration.md)
- Next Question: 비동기로 분리해도 여러 작업자가 같은 데이터를 수정하면
  데이터가 꼬인다. 동시성은 어떻게 막아야 하는가?

### 06. 동시성, 데이터가 꼬이기 전에 잡아야 한다

- Category: `concurrency`
- Detail Doc: [06-concurrency.md](../sequences/06-concurrency.md)
- Next Question: 동시성을 제어해도 IO 대기가 길면 서버 자원이 낭비된다.
  IO 병목은 어떻게 볼 것인가?

### 07. IO 병목, 어떻게 해결하지

- Category: `io`
- Detail Doc: [07-io-bottleneck.md](../sequences/07-io-bottleneck.md)
- Next Question: 성능과 안정성만으로는 충분하지 않다. 인증, 인가, 암호화,
  감사 로그 같은 보안 지식은 어떻게 적용해야 하는가?

### 08. 실무에서 꼭 필요한 보안 지식

- Category: `security`
- Detail Doc: [08-security.md](../sequences/08-security.md)
- Next Question: 서비스를 안전하게 만들었더라도 서버에서 프로세스, 디스크,
  권한, 시간, 네트워크를 확인할 줄 알아야 한다.

### 09. 최소한 알고 있어야 할 서버 지식

- Category: `server`
- Detail Doc: [09-server-basics.md](../sequences/09-server-basics.md)
- Next Question: 서버 내부를 확인할 수 있어도 요청이 서버까지 어떻게 오는지
  모르면 네트워크 문제를 해결하기 어렵다.

### 10. 모르면 답답해지는 네트워크 기초

- Category: `network`
- Detail Doc: [10-network-basics.md](../sequences/10-network-basics.md)
- Next Question: 네트워크와 서버 흐름을 이해했다면, 서비스를 어떤 구조와
  설계 패턴으로 나눌지 판단해야 한다.

### 11. 자주 쓰는 서버 구조와 설계 패턴

- Category: `architecture`
- Detail Doc: [11-architecture-patterns.md](../sequences/11-architecture-patterns.md)
- Next Question: 구조를 선택한 뒤에는 실제 성능 테스트로 한계를 측정해야 한다.

### 부록 A. 처음 해보는 성능 테스트를 위한 기본 정리

- Category: `appendix-performance-test`
- Detail Doc: [appendix-a-performance-test.md](../sequences/appendix-a-performance-test.md)
- Next Question: 성능과 확장성을 고려하다 보면 RDB 외 저장소가 필요한지
  판단해야 한다. NoSQL은 언제 고려해야 하는가?

### 부록 B. NoSQL 이해하기

- Category: `appendix-nosql`
- Detail Doc: [appendix-b-nosql.md](../sequences/appendix-b-nosql.md)
- Next Question: 분산 환경에서 공유 자원을 제어해야 할 때 DB 기반 분산 잠금을
  어떻게 구현할 수 있는가?

### 부록 C. DB로 분산 잠금 구현하기

- Category: `appendix-db-distributed-lock`
- Detail Doc: [appendix-c-db-distributed-lock.md](../sequences/appendix-c-db-distributed-lock.md)
- Next Question: 끝. 전체 랩의 운영/디자인 구현 단계로 돌아가 각 장을
  Visual Lab으로 구현한다.

## 구현 단위 권장 순서

- Phase 2: Site Shell, 전체 Chapter Progress Rail, 01~03장 최소 데이터 연결
- Phase 3: 01~03장 완성
- Phase 4: 04~06장 완성
- Phase 5: 07~09장 완성
- Phase 6: 10~11장과 부록 A~C 완성

## UX 흐름 원칙

모든 시퀀스는 다음 구조로 화면화한다.

```text
Incident → Observations → Candidate Causes → Concepts → Decisions → Flow → Checklist → Next Question
```
