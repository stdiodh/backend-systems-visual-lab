---
sequence: "C"
title: "DB로 분산 잠금 구현하기"
category: "appendix-db-distributed-lock"
source_chapter: "Appendix C"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Lock Table Panel
  - Acquire Race Panel
  - Lock Timeline
  - Release Panel
  - Trade-off Panel
  - Implementation Checklist
---

# C. DB로 분산 잠금 구현하기

## 1. 이 시퀀스의 역할

이 부록은 여러 서버 인스턴스나 프로세스가 같은 작업을 동시에 수행하지 않도록 DB 기반 분산 잠금을 구현하는 기본 구조와 주의점을 다룬다.

**이전 시퀀스와의 연결**  
부록 B에서 저장소 선택과 분산 시스템 trade-off를 봤다. 이제 공유 자원을 안전하게 제어하는 잠금 구현을 다룬다.

**다음 시퀀스로 넘길 질문**  
끝. 전체 랩의 운영/디자인 구현 단계로 돌아가 각 장을 Visual Lab으로 구현한다.

**검색/데이터 별칭**  
distributed-lock, db-lock, lock-table

## 2. 시작 Incident

배치 서버가 여러 대로 늘어난 뒤 같은 정산 작업이 동시에 실행된다. 중복 정산을 막기 위해 분산 잠금이 필요하지만, Redis를 바로 도입하기 어렵고 기존 DB로 잠금 테이블을 구성하려고 한다.

### 사용자가 처음 봐야 하는 질문

잠금을 누가, 어떤 키로, 얼마 동안 보유하며, 실패하면 어떻게 해제할 것인가?

## 3. 세부 목차

- 잠금 정보 저장 테이블
- 분산 잠금 동작
- DB 잠금 구현

## 4. 관찰 지표

- lock key
- lock owner
- lock acquired time
- lock expires at
- lock wait time
- lock acquire success/fail
- stale lock count
- transaction boundary
- deadlock 또는 timeout
- 작업 중복 실행 여부

## 5. 원인 후보

- lock key 설계 부실
- owner 식별 없음
- 만료 시간 없음으로 영구 잠금 발생
- 작업 실패 시 lock release 누락
- 트랜잭션 범위 오해
- 동시에 insert/update 충돌 처리 미흡
- lock 획득 후 장시간 작업
- clock drift 고려 부족

## 6. 핵심 개념

### Lock Table

**정의**  
잠금 키, 소유자, 획득 시간, 만료 시간 등을 저장하는 DB 테이블이다.

**실무에서 중요한 이유**  
기존 DB를 이용해 여러 인스턴스 사이의 작업 중복을 막을 수 있다.

**흔한 오해**  
테이블 하나 만들면 분산 잠금이 완성된다고 생각하는 것이다. 만료, 소유자, 충돌 처리가 중요하다.

**Visual Lab 반영 방식**  
Lock Table Panel에서 columns와 상태 변화를 보여준다.

**Codex 누락 방지 규칙**  
lock table에는 key, owner, expiresAt을 반드시 포함한다.

### Lock Acquire

**정의**  
특정 key의 잠금을 획득하려고 insert 또는 conditional update를 수행하는 과정이다.

**실무에서 중요한 이유**  
동시에 여러 서버가 접근할 때 하나만 성공하도록 만드는 핵심이다.

**흔한 오해**  
select 후 insert하면 안전하다고 생각하는 것이다. 경쟁 조건이 생길 수 있다.

**Visual Lab 반영 방식**  
Acquire Race Panel에서 Server A/B가 동시에 lock 획득을 시도하는 상황을 보여준다.

**Codex 누락 방지 규칙**  
acquire는 원자적 연산 또는 unique constraint와 연결한다.

### Lock Release

**정의**  
작업 완료 후 잠금을 해제하는 과정이다.

**실무에서 중요한 이유**  
잠금을 해제하지 않으면 다른 작업이 영원히 대기하거나 timeout될 수 있다.

**흔한 오해**  
finally에서 delete하면 항상 안전하다고 생각하는 것이다. owner 확인 없이 삭제하면 다른 소유자의 lock을 지울 수 있다.

**Visual Lab 반영 방식**  
Release Panel에서 owner match 후 release하는 흐름을 보여준다.

**Codex 누락 방지 규칙**  
release는 owner 검증을 포함한다.

### Lock Expiration

**정의**  
잠금 보유자가 죽거나 실패했을 때 잠금이 영구히 남지 않도록 만료 시간을 두는 방식이다.

**실무에서 중요한 이유**  
장애 상황에서 시스템이 회복될 수 있게 한다.

**흔한 오해**  
만료 시간을 길게 잡으면 안전하다고 생각하는 것이다. 너무 길면 복구가 늦고 너무 짧으면 작업 중 lock이 뺏길 수 있다.

**Visual Lab 반영 방식**  
Expiration Timeline에서 acquiredAt, expiresAt, stale lock takeover를 보여준다.

**Codex 누락 방지 규칙**  
expiration에는 작업 시간, clock, renewal 여부를 함께 설명한다.

### DB 기반 분산 잠금의 한계

**정의**  
DB에 의존해 잠금을 구현하므로 DB 부하, 트랜잭션, clock, 장애 복구를 고려해야 한다.

**실무에서 중요한 이유**  
간단한 작업에는 유용하지만 고성능/저지연 잠금에는 적합하지 않을 수 있다.

**흔한 오해**  
DB lock은 Redis나 ZooKeeper 같은 전문 도구와 완전히 같다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Trade-off Panel에서 DB lock, Redis lock, single writer를 비교한다.

**Codex 누락 방지 규칙**  
DB 잠금은 도입 조건과 한계를 반드시 표시한다.


## 7. 실무 판단 기준

- 잠금 key는 보호하려는 리소스 단위로 설계한다
- lock owner를 저장하고 release 시 owner를 검증한다
- expiresAt을 두어 stale lock을 처리한다
- lock 획득은 unique constraint 또는 조건부 update로 경쟁을 제어한다
- 작업 시간이 길면 renewal 또는 더 적합한 구조를 검토한다
- 분산 잠금이 필요한지 single writer나 unique constraint로 해결 가능한지도 비교한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Lock Table Panel`
- `Acquire Race Panel`
- `Lock Timeline`
- `Release Panel`
- `Trade-off Panel`
- `Implementation Checklist`

### 권장 사용자 흐름

1. 중복 정산 Incident를 보여준다
2. Lock Table Panel로 테이블 구조를 보여준다
3. Acquire Race Panel에서 여러 서버가 lock 획득을 시도하는 상황을 보여준다
4. Lock Timeline에서 acquire, work, release, expire를 시각화한다
5. Trade-off Panel에서 DB lock의 한계를 보여준다
6. 전체 랩 완료 체크리스트로 마무리한다

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

- `sequenceId`: appendix-c
- `lockRecord`: lockKey, owner, acquiredAt, expiresAt, status
- `acquireResult`: success | failed | expiredTakeover
- `lockMetrics`: waitTime, acquireFailCount, staleLockCount
- `tradeoffs`: dbLock, redisLock, singleWriter, uniqueConstraint

## 10. 인터랙티브 시나리오 제안

- **동시 lock acquire**: 서버 A와 B가 같은 lock key를 동시에 획득하려고 할 때 하나만 성공해야 하는 상황을 보여준다.
- **stale lock**: 작업 중 서버가 죽어 lock이 남고 expiresAt 이후 다른 서버가 takeover하는 상황을 보여준다.
- **owner 없는 release**: 서버 A가 서버 B의 lock을 잘못 삭제하는 위험을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] 잠금 테이블, 분산 잠금 동작, DB 구현을 모두 다뤘는가
- [ ] owner, expiresAt, unique constraint, release 검증을 포함했는가
- [ ] DB 기반 잠금의 한계를 설명했는가
- [ ] 전체 Visual Lab 마무리 흐름을 제공했는가
