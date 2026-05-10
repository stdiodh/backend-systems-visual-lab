---
sequence: "03"
title: "성능을 좌우하는 DB 설계와 쿼리"
category: "database"
source_chapter: "Chapter 03"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Query Lens Panel
  - Index Simulator
  - Transaction Timeline
  - Decision Panel
  - Concept Card
---

# 03. 성능을 좌우하는 DB 설계와 쿼리

## 1. 이 시퀀스의 역할

이 시퀀스는 성능 저하의 가장 흔한 원인인 DB 접근을 다룬다. 인덱스 설계, 조회 성능 개선, 트랜잭션 실패 처리를 하나의 요청 흐름 안에서 연결한다.

**이전 시퀀스와의 연결**  
02장에서 느려진 서비스의 병목 후보를 좁혔다. 이 장에서는 DB가 병목일 때 무엇을 봐야 하는지 다룬다.

**다음 시퀀스로 넘길 질문**  
DB가 아닌 외부 API나 연동 서비스가 문제라면 timeout, retry, circuit breaker를 어떻게 봐야 하는가?

**검색/데이터 별칭**  
database, query, index, transaction

## 2. 시작 Incident

게시글 목록 API가 특정 검색 조건에서만 느리다. DB CPU가 증가하고, slow query log에 같은 쿼리가 반복해서 나타난다. 인덱스를 추가하면 된다는 말은 나오지만 어떤 인덱스가 필요한지 확신이 없다.

### 사용자가 처음 봐야 하는 질문

이 쿼리는 어떤 조건으로 검색하고, 어떤 순서로 정렬하며, 몇 개의 row를 읽고 있는가?

## 3. 세부 목차

- 성능에 핵심인 DB
- 조회 트래픽을 고려한 인덱스 설계
- 몇 가지 조회 성능 개선 방법
- 알아두면 좋을 몇 가지 주의 사항
- 실패와 트랜잭션 고려하기

## 4. 관찰 지표

- slow query log
- query execution time
- rows examined / rows returned
- index 사용 여부
- DB connection pool 사용률
- lock wait time
- transaction duration
- N+1 query count
- pagination 방식과 offset 크기

## 5. 원인 후보

- 인덱스 없음 또는 잘못된 복합 인덱스
- 선택도가 낮은 컬럼에만 인덱스 적용
- 정렬 조건과 인덱스 불일치
- N+1 쿼리
- offset pagination으로 깊은 페이지 조회
- 트랜잭션 안에서 외부 API 호출
- 락 대기 또는 장기 트랜잭션

## 6. 핵심 개념

### 인덱스 Index

**정의**  
DB가 특정 조건의 데이터를 더 빠르게 찾기 위해 사용하는 자료 구조다.

**실무에서 중요한 이유**  
조회 트래픽이 많은 서비스에서 인덱스는 응답 시간과 DB 부하에 직접 영향을 준다.

**흔한 오해**  
인덱스를 많이 만들수록 항상 빠르다고 생각하는 것이다. 쓰기 비용, 저장 공간, 잘못된 인덱스 선택 문제가 생길 수 있다.

**Visual Lab 반영 방식**  
Query Lens Panel에서 where/order by 조건과 사용 가능한 index를 연결해서 보여준다.

**Codex 누락 방지 규칙**  
인덱스 설명은 “컬럼 하나 추가”가 아니라 검색 조건, 정렬, 선택도와 연결한다.

### 복합 인덱스 Composite Index

**정의**  
두 개 이상의 컬럼을 묶어 만든 인덱스다. 컬럼 순서가 중요하다.

**실무에서 중요한 이유**  
실무 검색은 상태, 작성자, 생성일, 정렬 등 여러 조건이 함께 쓰이므로 복합 인덱스 설계가 필요하다.

**흔한 오해**  
필요한 컬럼을 아무 순서로 묶으면 된다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Index Simulator에서 status + createdAt과 createdAt + status의 차이를 비교한다.

**Codex 누락 방지 규칙**  
복합 인덱스는 컬럼 순서와 쿼리 패턴을 함께 보여준다.

### N+1 Query

**정의**  
목록을 조회한 뒤 각 항목마다 추가 쿼리를 실행해 총 쿼리 수가 증가하는 문제다.

**실무에서 중요한 이유**  
작은 데이터에서는 티가 안 나지만 트래픽과 데이터가 늘면 급격히 느려진다.

**흔한 오해**  
ORM을 쓰면 자동으로 해결된다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Flow Explorer에 query count가 1 → N+1로 증가하는 애니메이션을 보여준다.

**Codex 누락 방지 규칙**  
N+1은 개념 카드만 만들지 말고 요청 흐름에서 쿼리 수 증가를 시각화한다.

### Pagination

**정의**  
목록 데이터를 페이지 단위로 나눠 조회하는 방식이다. offset 방식과 keyset 방식이 대표적이다.

**실무에서 중요한 이유**  
깊은 페이지 조회는 DB가 많은 row를 건너뛰게 만들어 성능 문제가 생길 수 있다.

**흔한 오해**  
limit만 넣으면 pagination 성능 문제가 해결된다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Decision Panel에서 offset pagination과 keyset pagination을 비교한다.

**Codex 누락 방지 규칙**  
pagination 설명에는 데이터 증가와 정렬 기준을 포함한다.

### 트랜잭션 Transaction

**정의**  
여러 DB 작업을 하나의 논리적 작업 단위로 묶어 성공 또는 실패를 일관되게 처리하는 방식이다.

**실무에서 중요한 이유**  
실패 시 데이터 정합성을 지키고, 동시성 문제를 줄이는 핵심 장치다.

**흔한 오해**  
트랜잭션을 넓게 잡을수록 안전하다고 생각하는 것이다. 장기 트랜잭션은 lock과 connection 점유 문제를 만든다.

**Visual Lab 반영 방식**  
Transaction Timeline에서 begin, query, external call, commit, rollback 구간을 보여준다.

**Codex 누락 방지 규칙**  
트랜잭션은 실패/롤백/락 대기와 함께 설명한다.


## 7. 실무 판단 기준

- 조회 패턴을 먼저 보고 인덱스를 설계한다
- where 조건, order by, pagination 방식을 함께 고려한다
- N+1은 query count로 확인한다
- 트랜잭션 범위 안에 외부 API 호출을 넣지 않는 것을 기본 원칙으로 검토한다
- 실패 시 롤백되어야 하는 데이터와 나중에 보상 처리해도 되는 데이터를 구분한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Query Lens Panel`
- `Index Simulator`
- `Transaction Timeline`
- `Decision Panel`
- `Concept Card`

### 권장 사용자 흐름

1. 느린 검색 API Incident를 보여준다
2. Query Lens Panel에서 SQL, 조건, 정렬, 실행 비용을 분해한다
3. Index Simulator에서 인덱스 설계 선택지를 비교한다
4. N+1 시나리오를 query count 변화로 보여준다
5. Transaction Timeline에서 실패와 롤백 범위를 보여준다
6. 외부 연동이 트랜잭션 안에 들어갈 때 04장으로 연결한다

### UX Writer 규칙

- 제목은 개념명이 아니라 문제 상황으로 시작한다.
- 첫 문장은 사용자가 지금 겪는 증상으로 쓴다.
- 해결책은 하나만 제시하지 말고 선택지를 비교한다.
- “항상”, “무조건” 같은 표현을 피하고 조건을 함께 보여준다.
- 경고 메시지는 원인을 비난하지 말고 다음 관찰 지표를 안내한다.


## Visual Lab 공통 UX/UI 원칙

이 시퀀스는 긴 이론 본문을 화면에 그대로 넣지 않는다. 사용자는 먼저 **문제 상황**을 보고, 그 다음 **관찰 지표**, **원인 후보**, **선택지**, **흐름도**, **체크리스트** 순서로 판단해야 한다.

- 첫 화면에는 `Incident Panel`을 배치한다.
- 핵심 수치는 `Metric Card`로 짧게 보여준다.
- 원인 후보는 `Candidate Cause Stack` 또는 `Decision Panel`로 보여준다.
- 개념 설명은 접히는 `Concept Card`로 제공한다.
- 코드/명령/설정 예시는 `Codex Terminal Panel` 또는 `Code Lens Panel`로 제공한다.
- 다음 시퀀스로 넘어가는 질문은 화면 하단의 `Next Question`으로 고정한다.
- 모바일에서는 Chapter Rail보다 현재 시퀀스 제목, 진행률, 다음 액션이 먼저 보여야 한다.


## 9. 데이터 모델 힌트

사이트 데이터 파일에서 이 시퀀스는 다음 필드를 가진 객체로 표현한다.

- `sequenceId`: 03
- `queryPatterns`: 검색 조건과 정렬 조건 배열
- `indexes`: 사용 가능한 인덱스 후보 배열
- `queryMetrics`: executionTime, rowsExamined, queryCount, lockWait
- `transactionSteps`: begin, query, external, commit, rollback

## 10. 인터랙티브 시나리오 제안

- **인덱스 없는 검색**: status, createdAt 조건의 목록 조회가 full scan으로 동작하는 상황을 보여준다.
- **N+1 목록 조회**: 게시글 20개를 조회한 뒤 작성자/댓글 수를 각각 조회해 query count가 늘어나는 장면을 보여준다.
- **외부 API를 포함한 트랜잭션**: DB connection과 lock을 오래 잡는 위험을 보여주고 04장으로 연결한다.

## 11. 누락 방지 체크리스트

- [ ] 원본 목차의 DB 성능, 인덱스, 조회 개선, 주의 사항, 트랜잭션을 모두 다뤘는가
- [ ] 인덱스를 무조건 추가하는 식으로 설명하지 않았는가
- [ ] N+1, pagination, lock wait, transaction duration을 포함했는가
- [ ] 외부 연동과 트랜잭션 문제가 04장으로 이어지는가
