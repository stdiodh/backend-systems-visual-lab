---
sequence: "05"
title: "비동기 연동, 언제 어떻게 써야 할까"
category: "async"
source_chapter: "Chapter 05"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Sync vs Async Decision Panel
  - Message Flow Panel
  - Outbox Timeline
  - Queue Lag Meter
  - DLQ Panel
---

# 05. 비동기 연동, 언제 어떻게 써야 할까

## 1. 이 시퀀스의 역할

이 시퀀스는 외부 연동이나 후속 작업을 사용자 요청에서 분리해야 하는 상황을 다룬다. 단순히 빠르게
만드는 기술이 아니라 실패 지점과 책임을 분리하는 구조로 비동기를 설명한다.

**이전 시퀀스와의 연결**
04장에서 외부 연동이 사용자 요청을 막고 장애를 전파하는 문제를 봤다. 이제 그 작업을 어떻게
분리할지 다룬다.

**다음 시퀀스로 넘길 질문**
비동기로 분리해도 여러 작업자가 같은 데이터를 수정하면 데이터가 꼬인다. 동시성은 어떻게 막아야
하는가?

**검색/데이터 별칭**
async, messaging, outbox, cdc, batch

## 2. 시작 Incident

주문 생성 API에서 결제 승인, 알림 발송, 포인트 적립, 외부 CRM 연동을 모두 동기로 처리한다. 한
연동이 느려지면 전체 주문 API가 느려지고, 일부 작업 실패 시 어떤 데이터가 저장되었는지 추적하기
어렵다.

### 사용자가 처음 봐야 하는 질문

사용자 응답 전에 반드시 끝나야 하는 작업과 나중에 처리해도 되는 작업은 무엇인가?

## 3. 세부 목차

- 동기 연동과 비동기 연동
- 별도 스레드로 실행하기
- 메시징
- 트랜잭션 아웃박스 패턴
- 배치 전송
- CDC(Change Data Capture)

## 4. 관찰 지표

- 사용자 응답 시간 중 후속 작업 비중
- queue lag
- message publish 성공/실패
- consumer 처리량과 error rate
- DLQ 적재량
- outbox pending count
- CDC lag
- 중복 메시지 처리 여부

## 5. 원인 후보

- 사용자 요청 안에 후속 작업을 모두 포함
- 별도 스레드 실패 추적 부재
- 메시지 발행과 DB 저장의 원자성 문제
- consumer idempotency 부족
- queue lag 증가
- DLQ 운영 기준 없음
- CDC 지연 또는 순서 처리 문제

## 6. 핵심 개념

### 동기 연동

**정의**
요청 처리 흐름에서 연동 작업이 끝날 때까지 기다리는 방식이다.

**실무에서 중요한 이유**
결과가 즉시 필요할 때는 명확하지만 느린 연동이 사용자 응답 전체를 지연시킬 수 있다.

**흔한 오해**
동기는 나쁘고 비동기는 좋다고 단순화하는 것이다. 즉시 결과가 필요한 작업은 동기가 맞을 수 있다.

**Visual Lab 반영 방식**
Decision Panel에서 즉시 응답 필요 여부를 기준으로 동기/비동기를 선택하게 한다.

**Codex 누락 방지 규칙**
동기/비동기 선택 기준을 결과 필요성, 실패 처리, 사용자 경험으로 나눠 설명한다.

### 메시징 Messaging

**정의**
작업 요청을 메시지로 발행하고 별도 소비자가 처리하는 방식이다.

**실무에서 중요한 이유**
요청 처리와 후속 처리를 분리하고, 소비자 처리량에 맞춰 작업을 조절할 수 있다.

**흔한 오해**
메시지를 쓰면 데이터 정합성 문제가 사라진다고 생각하는 것이다. 중복, 순서, 실패 처리가 필요하다.

**Visual Lab 반영 방식**
Message Flow Panel에서 producer, broker, consumer, DLQ를 보여준다.

**Codex 누락 방지 규칙**
메시징에는 중복 처리와 DLQ를 반드시 포함한다.

### Transactional Outbox

**정의**
DB 상태 변경과 발행할 이벤트를 같은 트랜잭션에 저장한 뒤 별도 relay가 메시지를 발행하는
패턴이다.

**실무에서 중요한 이유**
DB 저장은 성공했지만 메시지 발행은 실패하는 문제를 줄일 수 있다.

**흔한 오해**
outbox를 쓰면 정확히 한 번만 처리된다고 생각하는 것이다. 소비자 멱등성은 여전히 필요하다.

**Visual Lab 반영 방식**
Outbox Timeline에서 order 저장, outbox 저장, relay 발행, consumer 처리를 보여준다.

**Codex 누락 방지 규칙**
outbox 설명에는 pending, published, failed 상태를 포함한다.

### Idempotent Consumer

**정의**
같은 메시지를 여러 번 받아도 결과가 중복으로 망가지지 않도록 처리하는 소비자다.

**실무에서 중요한 이유**
대부분의 메시징 시스템은 중복 가능성을 고려해야 하므로 consumer idempotency가 중요하다.

**흔한 오해**
메시지 큐가 중복을 완벽히 막아준다고 생각하는 것이다.

**Visual Lab 반영 방식**
Duplicate Message Scenario에서 같은 messageId가 두 번 들어오는 상황을 보여준다.

**Codex 누락 방지 규칙**
비동기 장에는 반드시 중복 메시지 시나리오를 포함한다.

### CDC Change Data Capture

**정의**
DB 변경 로그를 기반으로 변경 이벤트를 감지해 다른 시스템으로 전달하는 방식이다.

**실무에서 중요한 이유**
기존 DB 변경을 기반으로 이벤트 스트림을 만들 수 있어 대규모 연동에 활용된다.

**흔한 오해**
CDC를 쓰면 모든 비동기 문제가 자동으로 해결된다고 생각하는 것이다. 지연, 순서, 스키마 변경을
고려해야 한다.

**Visual Lab 반영 방식**
CDC Flow Panel에서 DB log, connector, stream, consumer 흐름을 보여준다.

**Codex 누락 방지 규칙**
CDC는 lag와 schema change 위험을 함께 표시한다.

## 7. 실무 판단 기준

- 사용자 응답 전 필수 작업과 후속 작업을 분리한다
- 별도 스레드는 실패 추적과 재처리 기준이 없으면 신중히 사용한다
- 메시징을 도입하면 중복, 순서, DLQ, 재처리를 함께 설계한다
- DB 저장과 메시지 발행의 원자성 문제는 outbox로 다룬다
- 대량 전송은 배치 전송과 실시간성을 비교한다
- CDC는 지연과 운영 복잡도를 고려한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Sync vs Async Decision Panel`
- `Message Flow Panel`
- `Outbox Timeline`
- `Queue Lag Meter`
- `DLQ Panel`

### 권장 사용자 흐름

1. 주문 API가 여러 외부 작업을 동기로 수행하는 Incident를 보여준다
2. 작업 목록을 즉시 필요/후속 가능으로 분류한다
3. Sync vs Async Decision Panel에서 선택 기준을 보여준다
4. Message Flow Panel로 비동기 메시지 흐름을 보여준다
5. Outbox Timeline으로 DB 저장과 이벤트 발행을 연결한다
6. 중복 메시지와 queue lag를 보여준 뒤 06장 동시성으로 연결한다

### UX Writer 규칙

- 제목은 개념명이 아니라 문제 상황으로 시작한다.
- 첫 문장은 사용자가 지금 겪는 증상으로 쓴다.
- 해결책은 하나만 제시하지 말고 선택지를 비교한다.
- “항상”, “무조건” 같은 표현을 피하고 조건을 함께 보여준다.
- 경고 메시지는 원인을 비난하지 말고 다음 관찰 지표를 안내한다.

## Visual Lab 공통 UX/UI 원칙

이 시퀀스는 긴 이론 본문을 화면에 그대로 넣지 않는다. 사용자는 먼저 **문제 상황**을 보고, 그
다음 **관찰 지표**, **원인 후보**, **선택지**, **흐름도**, **체크리스트** 순서로 판단해야 한다.

- 첫 화면에는 `Incident Panel`을 배치한다.
- 핵심 수치는 `Metric Card`로 짧게 보여준다.
- 원인 후보는 `Candidate Cause Stack` 또는 `Decision Panel`로 보여준다.
- 개념 설명은 접히는 `Concept Card`로 제공한다.
- 코드/명령/설정 예시는 `Codex Terminal Panel` 또는 `Code Lens Panel`로 제공한다.
- 다음 시퀀스로 넘어가는 질문은 화면 하단의 `Next Question`으로 고정한다.
- 모바일에서는 Chapter Rail보다 현재 시퀀스 제목, 진행률, 다음 액션이 먼저 보여야 한다.

## 9. 데이터 모델 힌트

사이트 데이터 파일에서 이 시퀀스는 다음 필드를 가진 객체로 표현한다.

- `sequenceId`: 05
- `tasks`: 주문 생성 이후 후속 작업 배열
- `messageStates`: pending, published, consumed, failed, deadLetter
- `queueMetrics`: lag, throughput, errorRate, dlqCount
- `outboxRecord`: id, aggregateId, eventType, payload, status

## 10. 인터랙티브 시나리오 제안

- **동기 알림 발송으로 응답 지연**: 알림 API 지연이 주문 API p95를 증가시키는 상황을 보여준다.
- **outbox 없는 메시지 발행 실패**: DB 저장 성공 후 메시지 발행 실패로 후속 작업이 누락되는
  상황을 보여준다.
- **중복 메시지 소비**: 같은 메시지가 두 번 처리되어 포인트가 중복 적립되는 위험을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] 동기와 비동기를 우열이 아니라 선택 기준으로 설명했는가
- [ ] 별도 스레드, 메시징, outbox, batch, CDC가 모두 포함되었는가
- [ ] queue lag, DLQ, 중복 메시지를 다뤘는가
- [ ] outbox를 정확히 한 번 처리로 오해하지 않게 설명했는가
- [ ] 06장 동시성 문제로 연결되는가
