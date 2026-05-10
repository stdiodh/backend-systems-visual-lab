---
sequence: "06"
title: "동시성, 데이터가 꼬이기 전에 잡아야 한다"
category: "concurrency"
source_chapter: "Chapter 06"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Race Timeline
  - Lock Wait Timeline
  - Version Conflict Panel
  - Single Writer Queue Panel
  - Decision Panel
---

# 06. 동시성, 데이터가 꼬이기 전에 잡아야 한다

## 1. 이 시퀀스의 역할

이 시퀀스는 여러 요청, 여러 스레드, 여러 프로세스가 같은 데이터에 접근할 때 발생하는 문제를
다룬다. 서버 메모리 공유 문제부터 DB 락, optimistic/pessimistic lock, single writer까지
연결한다.

**이전 시퀀스와의 연결**
05장에서 비동기 처리로 작업을 분리했다. 이제 여러 consumer나 요청이 같은 데이터를 동시에 수정할
때 생기는 문제를 다룬다.

**다음 시퀀스로 넘길 질문**
동시성을 제어해도 IO 대기가 길면 서버 자원이 낭비된다. IO 병목은 어떻게 볼 것인가?

**검색/데이터 별칭**
concurrency, race, lock, single-writer

## 2. 시작 Incident

재고가 1개 남은 상품을 두 사용자가 동시에 주문한다. 두 요청 모두 재고가 있다고 판단하고 주문을
성공 처리한다. 결과적으로 재고가 -1이 되거나 같은 쿠폰이 중복 사용된다.

### 사용자가 처음 봐야 하는 질문

이 데이터는 동시에 몇 개의 실행 흐름에서 읽고 수정될 수 있는가?

## 3. 세부 목차

- 서버와 동시 실행
- 잘못된 데이터 공유로 인한 문제 예시
- 프로세스 수준에서의 동시 접근 제어
- DB와 동시성
- 잠금 사용 시 주의 사항
- 단일 스레드로 처리하기

## 4. 관찰 지표

- 동일 리소스에 대한 동시 요청 수
- lost update 발생 여부
- lock wait time
- deadlock count
- version conflict count
- unique constraint violation
- consumer 병렬 처리 수
- single writer queue lag

## 5. 원인 후보

- 공유 mutable state 사용
- read-modify-write 경쟁
- 락 범위가 너무 넓거나 좁음
- DB 격리 수준 오해
- 낙관적 락 재시도 정책 없음
- 비관적 락으로 인한 대기 증가
- unique constraint 미사용
- 단일 writer 구조가 필요한데 병렬 처리

## 6. 핵심 개념

### Race Condition

**정의**
실행 순서에 따라 결과가 달라지는 동시성 문제다.

**실무에서 중요한 이유**
실무에서는 재고, 포인트, 쿠폰, 중복 요청 처리에서 자주 발생한다.

**흔한 오해**
테스트에서 잘 안 나오면 문제가 없다고 생각하는 것이다. 동시성 문제는 재현이 어렵다.

**Visual Lab 반영 방식**
Race Timeline에서 User A/B의 read-update-write 순서를 나란히 보여준다.

**Codex 누락 방지 규칙**
동시성 장에는 반드시 두 요청의 시간축 비교를 포함한다.

### Lost Update

**정의**
두 실행 흐름이 같은 값을 읽고 각각 수정해 한쪽 수정이 사라지는 문제다.

**실무에서 중요한 이유**
조회수 증가, 재고 차감, 잔액 변경 같은 작업에서 데이터 정합성을 깨뜨린다.

**흔한 오해**
트랜잭션을 쓰면 자동으로 lost update가 모두 막힌다고 생각하는 것이다.

**Visual Lab 반영 방식**
Before/After Value Panel에서 두 요청이 같은 기존 값을 읽는 상황을 보여준다.

**Codex 누락 방지 규칙**
lost update는 숫자 상태 변화로 시각화한다.

### Optimistic Lock

**정의**
충돌이 드물다고 가정하고 version 등을 이용해 업데이트 시 충돌을 감지하는 방식이다.

**실무에서 중요한 이유**
읽기가 많고 충돌이 상대적으로 적은 시스템에서 유용하다.

**흔한 오해**
낙관적 락은 대기하지 않으니 항상 좋다고 생각하는 것이다. 충돌 시 재시도와 사용자 응답 정책이
필요하다.

**Visual Lab 반영 방식**
Version Conflict Panel에서 version 1 → 2 업데이트 실패를 보여준다.

**Codex 누락 방지 규칙**
optimistic lock에는 conflict 처리와 retry 여부를 포함한다.

### Pessimistic Lock

**정의**
충돌 가능성이 높다고 보고 데이터를 먼저 잠가 다른 트랜잭션 접근을 대기시키는 방식이다.

**실무에서 중요한 이유**
강한 정합성이 필요하거나 충돌이 잦은 작업에서 사용할 수 있다.

**흔한 오해**
비관적 락을 걸면 안전하니 오래 잡아도 된다고 생각하는 것이다. lock wait와 deadlock 위험이 있다.

**Visual Lab 반영 방식**
Lock Wait Timeline에서 wait, timeout, deadlock 가능성을 보여준다.

**Codex 누락 방지 규칙**
pessimistic lock 설명에는 timeout과 lock 범위를 포함한다.

### Single Writer

**정의**
특정 데이터 변경을 하나의 실행 흐름으로 직렬화하는 방식이다.

**실무에서 중요한 이유**
락 경쟁이 심하거나 순서 보장이 중요한 작업에서 복잡도를 줄일 수 있다.

**흔한 오해**
단일 스레드는 느리기만 한 방식이라고 생각하는 것이다. 특정 hot key에는 안정적인 선택이 될 수
있다.

**Visual Lab 반영 방식**
Single Writer Queue Panel에서 key별 작업이 순서대로 처리되는 모습을 보여준다.

**Codex 누락 방지 규칙**
single writer는 처리량과 순서 보장의 trade-off를 함께 설명한다.

## 7. 실무 판단 기준

- 동시 접근 가능성이 있는 데이터를 먼저 식별한다
- 메모리 락은 단일 프로세스 범위라는 한계를 표시한다
- DB 락은 범위, 대기 시간, deadlock 위험을 함께 고려한다
- 낙관적 락은 충돌 감지 후 재시도/실패 응답 정책을 정한다
- unique constraint는 중복 생성 방지의 강력한 방어선으로 사용한다
- 핫스팟 데이터는 single writer나 queue 기반 직렬화를 검토한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Race Timeline`
- `Lock Wait Timeline`
- `Version Conflict Panel`
- `Single Writer Queue Panel`
- `Decision Panel`

### 권장 사용자 흐름

1. 재고 1개 동시 주문 Incident를 보여준다
2. Race Timeline으로 두 요청의 순서를 나란히 보여준다
3. Lost Update 값을 시각화한다
4. Optimistic/Pessimistic/Unique/Single Writer 선택지를 비교한다
5. Lock 사용 시 대기와 deadlock 위험을 보여준다
6. IO 대기와 thread 점유 문제를 07장으로 넘긴다

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

- `sequenceId`: 06
- `resource`: stock, coupon, point 등 동시 수정 대상
- `concurrentRequests`: 동시 요청 시뮬레이션 배열
- `lockMetrics`: lockWait, deadlock, conflictCount
- `strategy`: optimistic | pessimistic | unique | singleWriter

## 10. 인터랙티브 시나리오 제안

- **재고 차감 lost update**: 두 사용자가 같은 재고 값을 읽고 각각 차감해 정합성이 깨지는 상황을
  보여준다.
- **낙관적 락 충돌**: version conflict 발생 후 재시도 또는 실패 응답을 선택하게 한다.
- **비관적 락 대기**: 긴 트랜잭션이 lock wait와 timeout을 만드는 상황을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] 서버 동시 실행과 DB 동시성을 구분했는가
- [ ] 잘못된 데이터 공유, process-level lock, DB lock, single thread를 모두 다뤘는가
- [ ] lost update, deadlock, lock wait를 포함했는가
- [ ] 각 락 전략의 trade-off를 보여줬는가
- [ ] 07장 IO 병목으로 연결되는가
