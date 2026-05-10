---
sequence: "B"
title: "NoSQL 이해하기"
category: "appendix-nosql"
source_chapter: "Appendix B"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Storage Comparison Panel
  - Access Pattern Panel
  - Document Model Panel
  - CAP Triangle Panel
  - NoSQL Decision Matrix
---

# B. NoSQL 이해하기

## 1. 이 시퀀스의 역할

이 부록은 RDB만으로 모든 문제를 해결하려 하지 않고, NoSQL의 종류와 도입 기준, CAP 관점을
이해하도록 돕는다.

**이전 시퀀스와의 연결**
부록 A에서 성능 테스트로 한계를 측정했다. 특정 저장 요구가 RDB에 맞지 않을 때 NoSQL을 검토한다.

**다음 시퀀스로 넘길 질문**
분산 환경에서 공유 자원을 제어해야 할 때 DB 기반 분산 잠금을 어떻게 구현할 수 있는가?

**검색/데이터 별칭**
nosql, cap, redis, mongodb, wide-column

## 2. 시작 Incident

조회 트래픽이 많아 RDB가 부담을 받자 팀에서 “NoSQL을 쓰면 빨라진다”는 의견이 나온다. 하지만
어떤 종류의 NoSQL이 어떤 문제에 맞는지, 데이터 일관성은 어떻게 되는지 모른다.

### 사용자가 처음 봐야 하는 질문

지금 문제는 관계형 모델의 한계인가, 조회 패턴 문제인가, 캐시 문제인가, 확장성 문제인가?

## 3. 세부 목차

- NoSQL이란
- NoSQL 종류
- NoSQL 도입 시 고려 사항
- CAP 정리

## 4. 관찰 지표

- 데이터 모델 형태
- 읽기/쓰기 비율
- 쿼리 패턴
- 일관성 요구 수준
- 확장 방식
- latency 요구
- 운영 복잡도
- 장애 시 허용 가능한 데이터 신선도
- RDB로 해결 가능한 최적화 여부

## 5. 원인 후보

- NoSQL을 성능 만능 해결책으로 오해
- 데이터 모델과 쿼리 패턴 불일치
- 일관성 요구를 확인하지 않음
- 운영 경험 없는 저장소 도입
- CAP를 단순 선택지로 오해
- RDB 인덱스/캐시/읽기 모델 개선을 먼저 검토하지 않음

## 6. 핵심 개념

### NoSQL

**정의**
관계형 DB와 다른 데이터 모델과 확장 방식을 가진 저장소 계열을 통칭한다.

**실무에서 중요한 이유**
문서, 키-값, wide-column, graph 등 요구에 맞는 저장 모델을 선택할 수 있다.

**흔한 오해**
NoSQL은 SQL을 전혀 쓰지 않는다는 뜻이거나 RDB보다 항상 빠르다고 생각하는 것이다.

**Visual Lab 반영 방식**
Storage Comparison Panel에서 RDB, Key-Value, Document, Wide Column, Graph를 비교한다.

**Codex 누락 방지 규칙**
NoSQL은 종류별 사용 사례를 함께 설명한다.

### Key-Value Store

**정의**
key로 value를 빠르게 저장/조회하는 구조다.

**실무에서 중요한 이유**
캐시, 세션, 카운터, 간단한 상태 저장에 자주 사용된다.

**흔한 오해**
복잡한 검색도 key-value로 쉽게 할 수 있다고 생각하는 것이다.

**Visual Lab 반영 방식**
Access Pattern Panel에서 key lookup과 range/query 한계를 보여준다.

**Codex 누락 방지 규칙**
key-value는 검색 한계와 TTL/eviction을 포함한다.

### Document Store

**정의**
JSON 같은 문서 형태로 데이터를 저장하는 방식이다.

**실무에서 중요한 이유**
유연한 스키마와 문서 단위 조회가 필요한 경우 유용하다.

**흔한 오해**
스키마가 없으니 설계가 필요 없다고 생각하는 것이다. 실제로는 문서 구조와 인덱스 설계가 중요하다.

**Visual Lab 반영 방식**
Document Model Panel에서 embedded/reference 선택을 보여준다.

**Codex 누락 방지 규칙**
document store에는 스키마 설계와 인덱스 주의를 포함한다.

### CAP 정리

**정의**
분산 시스템에서 consistency, availability, partition tolerance 사이의 trade-off를 설명하는
관점이다.

**실무에서 중요한 이유**
분산 저장소의 장애 상황과 일관성/가용성 선택을 이해하는 데 도움을 준다.

**흔한 오해**
CAP를 세 가지 중 두 개만 고르는 단순 공식으로 외우는 것이다.

**Visual Lab 반영 방식**
CAP Triangle Panel에서 네트워크 분할 상황의 선택을 보여준다.

**Codex 누락 방지 규칙**
CAP는 장애 상황의 trade-off로 설명한다.

### 도입 기준

**정의**
NoSQL을 도입할지 판단하는 요구 조건이다. 데이터 모델, 쿼리, 일관성, 운영 역량, 비용을 포함한다.

**실무에서 중요한 이유**
잘못 도입하면 성능보다 운영 복잡도와 데이터 정합성 문제가 커진다.

**흔한 오해**
새 기술을 쓰면 시스템이 자동으로 좋아진다고 생각하는 것이다.

**Visual Lab 반영 방식**
Decision Matrix에서 RDB 개선, cache, read model, NoSQL 도입을 비교한다.

**Codex 누락 방지 규칙**
NoSQL 도입 전 RDB/캐시/조회 모델 개선 여부를 체크한다.

## 7. 실무 판단 기준

- NoSQL을 성능 만능 해결책으로 제시하지 않는다
- 데이터 모델과 접근 패턴을 먼저 정의한다
- 일관성 요구 수준을 명확히 한다
- RDB 인덱스, 캐시, CQRS read model로 해결 가능한지 먼저 검토한다
- 운영 모니터링, 백업, 장애 대응 역량을 고려한다
- CAP는 장애 상황에서의 trade-off로 설명한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Storage Comparison Panel`
- `Access Pattern Panel`
- `Document Model Panel`
- `CAP Triangle Panel`
- `NoSQL Decision Matrix`

### 권장 사용자 흐름

1. NoSQL 도입 의견 Incident를 보여준다
2. Storage Comparison Panel에서 종류별 모델을 비교한다
3. Access Pattern으로 요구와 저장소 적합성을 연결한다
4. CAP Triangle로 분산 장애 상황을 설명한다
5. Decision Matrix로 RDB 개선/캐시/NoSQL 선택지를 비교한다
6. 부록 C 분산 잠금으로 연결한다

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

- `sequenceId`: appendix-b
- `storageTypes`: rdb, keyValue, document, wideColumn, graph
- `accessPattern`: readHeavy, writeHeavy, lookup, search, graphTraversal
- `consistencyRequirement`: strong, eventual, session 등
- `decisionMatrix`: 도입 기준 배열

## 10. 인터랙티브 시나리오 제안

- **NoSQL 만능론**: RDB 쿼리 문제가 있는데 NoSQL 도입만 주장하는 상황을 보여준다.
- **캐시로 충분한 문제**: 반복 조회 문제를 key-value cache로 해결할 수 있는지 판단한다.
- **일관성 요구 충돌**: 강한 정합성이 필요한 작업에 eventual consistency 저장소를 쓰려는 위험을
  보여준다.

## 11. 누락 방지 체크리스트

- [ ] NoSQL 정의, 종류, 도입 고려 사항, CAP를 모두 다뤘는가
- [ ] NoSQL을 성능 만능 해결책으로 표현하지 않았는가
- [ ] RDB/캐시/CQRS와 비교했는가
- [ ] 부록 C 분산 잠금으로 이어지는가
