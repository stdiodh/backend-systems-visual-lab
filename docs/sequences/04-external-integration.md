---
sequence: "04"
title: "외부 연동이 문제일 때 살펴봐야 할 것들"
category: "external-integration"
source_chapter: "Chapter 04"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - External Call Timeline
  - Circuit State Panel
  - Pool Meter
  - Decision Panel
  - System Map Panel
---

# 04. 외부 연동이 문제일 때 살펴봐야 할 것들

## 1. 이 시퀀스의 역할

이 시퀀스는 우리 코드가 정상이어도 외부 API 지연과 실패로 서비스가 무너질 수 있음을 다룬다.
timeout, retry, 동시 요청 제한, circuit breaker, HTTP
connection pool, 이중화를 하나의 장애 전파 흐름으로 연결한다.

**이전 시퀀스와의 연결**  
03장에서 DB와 트랜잭션을 다뤘다. 이제 DB 작업 중 외부 API를 호출하거나 외부 API가
느려질 때 어떤 문제가 생기는지 본다.

**다음 시퀀스로 넘길 질문**  
외부 연동을 사용자 요청에서 분리하려면 언제 비동기 연동을 선택해야 하는가?

**검색/데이터 별칭**  
external, timeout, retry, circuit-breaker, http-pool

## 2. 시작 Incident

결제 승인 API가 간헐적으로 5초 이상 지연된다. 우리 서버는 timeout 없이 응답을
기다리고, 사용자는 요청을 반복한다.
재시도 로직을 추가했더니 오히려 외부 API 요청 수가 폭증하고 서버 thread와 HTTP
connection pool이 고갈된다.

### 사용자가 처음 봐야 하는 질문

외부 서비스가 느릴 때 우리 서비스는 얼마나 기다리고, 몇 번 재시도하며, 어디서 실패를 끊어야
하는가?

## 3. 세부 목차

- 우리는 문제가 없는데
- 타임아웃
- 재시도
- 동시 요청 제한
- 서킷 브레이커
- 외부 연동과 DB 연동
- HTTP 커넥션 풀
- 연동 서비스 이중화

## 4. 관찰 지표

- 외부 API latency와 error rate
- timeout 발생 횟수
- retry 횟수와 retry 간격
- 동시 outbound 요청 수
- HTTP connection pool active/idle/pending
- circuit 상태 closed/open/half-open
- DB transaction duration
- fallback 또는 이중화 경로 사용률

## 5. 원인 후보

- timeout 미설정으로 thread 장기 점유
- 무제한 retry로 retry storm 발생
- retry 대상 작업이 멱등하지 않음
- 동시 요청 제한 없음
- circuit breaker 미적용
- DB 트랜잭션 안에서 외부 API 호출
- HTTP connection pool 부족
- 이중화 경로가 없거나 전환 기준이 없음

## 6. 핵심 개념

### Timeout

**정의**  
외부 호출이 일정 시간 안에 끝나지 않으면 기다림을 중단하는 제한이다.

**실무에서 중요한 이유**  
timeout이 없으면 thread, connection, transaction이 오래 점유되어
작은 외부 장애가 내부 장애로 번진다.

**흔한 오해**  
timeout은 사용자를 불편하게 만드는 옵션이라고 생각하는 것이다. 실제로는 시스템을 보호하는
안전장치다.

**Visual Lab 반영 방식**  
External Call Timeline에서 no-timeout과 timeout 설정 시 리소스
점유 차이를 보여준다.

**Codex 누락 방지 규칙**  
timeout은 반드시 리소스 보호와 연결해서 설명한다.

### Retry

**정의**  
실패한 요청을 다시 시도하는 전략이다.

**실무에서 중요한 이유**  
일시적 네트워크 오류나 짧은 장애에는 도움이 되지만 잘못 쓰면 장애를 증폭한다.

**흔한 오해**  
retry를 많이 하면 성공률이 올라간다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Decision Panel에서 retry 없음, 즉시 retry, exponential
backoff retry를 비교한다.

**Codex 누락 방지 규칙**  
retry에는 backoff, max attempt, idempotency 조건을 함께 표시한다.

### Circuit Breaker

**정의**  
실패가 계속되는 외부 연동을 일정 시간 차단해 시스템을 보호하는 패턴이다.

**실무에서 중요한 이유**  
외부 서비스가 장애일 때 계속 호출하지 않고 내부 리소스를 보호할 수 있다.

**흔한 오해**  
circuit breaker를 넣으면 외부 장애가 사라진다고 생각하는 것이다. 실제로는 장애
전파를 줄이는 장치다.

**Visual Lab 반영 방식**  
Circuit State Panel에서 closed, open, half-open 상태 변화를
보여준다.

**Codex 누락 방지 규칙**  
세 상태와 전환 조건을 UI에 반드시 포함한다.

### HTTP Connection Pool

**정의**  
외부 HTTP 호출에 사용할 connection을 재사용하고 제한하는 풀이다.

**실무에서 중요한 이유**  
pool이 고갈되면 외부 API 호출이 대기하고 내부 thread도 같이 막힌다.

**흔한 오해**  
pool 크기를 크게 하면 해결된다고 생각하는 것이다. 외부 서비스 수용량과 timeout, 동시
요청 제한이 함께 필요하다.

**Visual Lab 반영 방식**  
Pool Meter에서 active, idle, pending count를 보여준다.

**Codex 누락 방지 규칙**  
connection pool은 timeout, 동시 요청 제한과 함께 설명한다.

### Idempotency

**정의**  
같은 요청을 여러 번 실행해도 결과가 중복으로 망가지지 않도록 만드는 성질이다.

**실무에서 중요한 이유**  
retry가 있는 시스템에서는 중복 결제, 중복 발송, 중복 적립을 막기 위해 필수다.

**흔한 오해**  
GET만 멱등성을 생각하면 된다고 보는 것이다. POST도 idempotency key로 안전하게
만들 수 있다.

**Visual Lab 반영 방식**  
Retry Scenario에서 idempotency key가 없을 때와 있을 때 결과를 비교한다.

**Codex 누락 방지 규칙**  
retry 설명에 멱등성을 반드시 포함한다.


## 7. 실무 판단 기준

- 외부 호출에는 timeout을 기본으로 설정한다
- retry는 실패 유형, backoff, max attempt, idempotency를 확인한 뒤 적용한다
- 외부 API가 느릴 때 DB 트랜잭션을 잡은 채 기다리지 않는다
- 동시 outbound 요청 수를 제한한다
- 반복 실패가 감지되면 circuit breaker나 fallback을 검토한다
- 이중화는 단순히 두 개 endpoint가 아니라 전환 기준과 관찰 지표를 포함해야 한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `External Call Timeline`
- `Circuit State Panel`
- `Pool Meter`
- `Decision Panel`
- `System Map Panel`

### 권장 사용자 흐름

1. 외부 API 지연 Incident를 보여준다
2. External Call Timeline으로 timeout 없는 대기 상태를 시각화한다
3. Retry Panel에서 retry storm이 발생하는 과정을 보여준다
4. Pool Meter로 HTTP connection pool 고갈을 보여준다
5. Circuit State Panel에서 open/half-open 전환을 보여준다
6. 사용자 요청에서 분리해야 할 작업은 05장 비동기로 넘긴다

### UX Writer 규칙

- 제목은 개념명이 아니라 문제 상황으로 시작한다.
- 첫 문장은 사용자가 지금 겪는 증상으로 쓴다.
- 해결책은 하나만 제시하지 말고 선택지를 비교한다.
- “항상”, “무조건” 같은 표현을 피하고 조건을 함께 보여준다.
- 경고 메시지는 원인을 비난하지 말고 다음 관찰 지표를 안내한다.


## Visual Lab 공통 UX/UI 원칙

이 시퀀스는 긴 이론 본문을 화면에 그대로 넣지 않는다.
사용자는 먼저 **문제 상황**을 보고, 그 다음 **관찰 지표**, **원인 후보**,
**선택지**, **흐름도**, **체크리스트** 순서로 판단해야 한다.

- 첫 화면에는 `Incident Panel`을 배치한다.
- 핵심 수치는 `Metric Card`로 짧게 보여준다.
- 원인 후보는 `Candidate Cause Stack` 또는 `Decision Panel`로 보여준다.
- 개념 설명은 접히는 `Concept Card`로 제공한다.
- 코드/명령/설정 예시는 `Codex Terminal Panel` 또는 `Code Lens Panel`로 제공한다.
- 다음 시퀀스로 넘어가는 질문은 화면 하단의 `Next Question`으로 고정한다.
- 모바일에서는 Chapter Rail보다 현재 시퀀스 제목, 진행률, 다음 액션이 먼저 보여야 한다.


## 9. 데이터 모델 힌트

사이트 데이터 파일에서 이 시퀀스는 다음 필드를 가진 객체로 표현한다.

- `sequenceId`: 04
- `externalService`: payment, mail, auth 등 연동 대상
- `timeoutMs`: connect/read/call timeout
- `retryPolicy`: maxAttempts, backoff, retryableErrors
- `poolMetrics`: active, idle, pending, max
- `circuitState`: closed | open | halfOpen

## 10. 인터랙티브 시나리오 제안

- **timeout 없음**: 외부 API 5초 지연이 내부 thread 점유와 p95 증가로 이어지는 장면을 보여준다.
- **retry storm**: 사용자 재요청과 서버 retry가 겹쳐 외부 요청 수가 증가하는 상황을 보여준다.
- **DB 트랜잭션 안 외부 API 호출**: DB connection과 lock이 오래 점유되는 위험을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] timeout, retry, 동시 요청 제한, circuit breaker를 모두 다뤘는가
- [ ] retry를 성공률 개선만으로 설명하지 않고 장애 증폭 위험을 보여줬는가
- [ ] HTTP connection pool을 외부 연동 지표로 포함했는가
- [ ] DB 트랜잭션과 외부 연동의 결합 위험을 포함했는가
- [ ] 05장 비동기 연동으로 자연스럽게 넘어가는가
