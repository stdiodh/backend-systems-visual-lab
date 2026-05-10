---
sequence: "11"
title: "자주 쓰는 서버 구조와 설계 패턴"
category: "architecture"
source_chapter: "Chapter 11"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Layer Map Panel
  - Domain Model Panel
  - Service Boundary Panel
  - Event Flow Panel
  - CQRS Panel
  - Architecture Decision Matrix
---

# 11. 자주 쓰는 서버 구조와 설계 패턴

## 1. 이 시퀀스의 역할

이 시퀀스는 앞선 성능, DB, 외부 연동, 비동기, 동시성, 보안, 서버/네트워크 지식을
바탕으로 서버 구조와 설계 패턴을 선택하는 방법을 다룬다.

**이전 시퀀스와의 연결**  
10장에서 네트워크 경로를 이해했다. 이제 시스템을 어떤 구조로 나누고 어떤 패턴을 적용할지
판단한다.

**다음 시퀀스로 넘길 질문**  
구조를 선택한 뒤에는 실제 성능 테스트로 한계를 측정해야 한다.

**검색/데이터 별칭**  
architecture, mvc, layered, ddd, msa, eda, cqrs

## 2. 시작 Incident

하나의 컨트롤러와 서비스 클래스에 조회, 명령, 외부 연동, 이벤트 발행, 권한 검사가 모두 섞여
있다.
기능 추가는 빨랐지만 변경할 때마다 사이드 이펙트가 생기고, 장애 원인을 특정하기 어렵다.

### 사용자가 처음 봐야 하는 질문

이 코드는 어떤 책임을 가지고 있으며, 어떤 경계로 나눠야 변경과 장애를 관리할 수 있는가?

## 3. 세부 목차

- MVC 패턴
- 계층형 아키텍처
- DDD와 전술 패턴
- 마이크로서비스 아키텍처
- 이벤트 기반 아키텍처
- CQRS 패턴

## 4. 관찰 지표

- controller/service/repository 책임 분리 상태
- domain rule 위치
- transaction boundary
- external integration boundary
- event publication 위치
- read/write traffic 비율
- service coupling
- deployment boundary
- query model freshness

## 5. 원인 후보

- Controller에 비즈니스 로직 집중
- Service god class
- 도메인 규칙이 흩어짐
- repository가 비즈니스 판단을 가짐
- MSA를 조직/운영 준비 없이 도입
- 이벤트 발행 후 실패 처리 누락
- CQRS를 단순 조회 최적화로만 이해
- 읽기 모델 동기화 지연 고려 부족

## 6. 핵심 개념

### MVC 패턴

**정의**  
Model, View, Controller로 역할을 나눠 사용자 요청과 표현, 데이터를 분리하는
구조다.

**실무에서 중요한 이유**  
웹 애플리케이션의 기본 흐름을 이해하는 출발점이다.

**흔한 오해**  
MVC만 적용하면 좋은 아키텍처가 된다고 생각하는 것이다. 비즈니스 책임 분리는 별도 고민이
필요하다.

**Visual Lab 반영 방식**  
MVC Flow Panel에서 Request → Controller → Model/Response
흐름을 보여준다.

**Codex 누락 방지 규칙**  
MVC는 기본 구조로 소개하되 모든 설계를 해결한다고 표현하지 않는다.

### 계층형 아키텍처

**정의**  
Controller, Application/Service, Domain, Repository 등
계층별 책임을 나누는 방식이다.

**실무에서 중요한 이유**  
변경 범위를 줄이고 테스트와 유지보수를 쉽게 만든다.

**흔한 오해**  
계층을 많이 나누면 자동으로 좋은 구조가 된다고 생각하는 것이다. 책임이 불분명하면 계층만
늘어난다.

**Visual Lab 반영 방식**  
Layer Map Panel에서 각 계층의 책임과 금지 의존성을 보여준다.

**Codex 누락 방지 규칙**  
계층 설명에는 책임과 의존 방향을 포함한다.

### DDD 전술 패턴

**정의**  
Entity, Value Object, Aggregate, Repository, Domain
Service 등 도메인 모델 중심 설계 요소다.

**실무에서 중요한 이유**  
복잡한 비즈니스 규칙을 코드 구조 안에 명확히 담는 데 도움을 준다.

**흔한 오해**  
DDD는 MSA를 하기 위한 기술이라고 생각하는 것이다. 단일 서비스 안에서도 도메인 모델링에
활용할 수 있다.

**Visual Lab 반영 방식**  
Domain Model Panel에서 Aggregate boundary와 invariant를
보여준다.

**Codex 누락 방지 규칙**  
DDD는 용어 나열이 아니라 규칙과 경계 중심으로 설명한다.

### 마이크로서비스 아키텍처 MSA

**정의**  
서비스를 독립 배포 가능한 작은 단위로 나누는 구조다.

**실무에서 중요한 이유**  
조직, 배포, 확장, 장애 격리를 위해 사용할 수 있지만 운영 복잡도가 크다.

**흔한 오해**  
작게 나누면 자동으로 좋아진다고 생각하는 것이다. 네트워크, 데이터 일관성, 관측성 비용이
커진다.

**Visual Lab 반영 방식**  
Service Boundary Panel에서 서비스 간 호출, DB 분리, 장애 전파를 보여준다.

**Codex 누락 방지 규칙**  
MSA 설명에는 운영 비용과 데이터 일관성 문제를 반드시 포함한다.

### 이벤트 기반 아키텍처 EDA

**정의**  
상태 변화나 사건을 이벤트로 발행하고 다른 구성요소가 이를 구독해 처리하는 구조다.

**실무에서 중요한 이유**  
서비스 간 결합을 줄이고 후속 작업을 분리할 수 있다.

**흔한 오해**  
이벤트를 쓰면 결합이 모두 사라진다고 생각하는 것이다. 이벤트 스키마, 순서, 중복 처리 문제가
있다.

**Visual Lab 반영 방식**  
Event Flow Panel에서 command, event, consumer, side
effect를 보여준다.

**Codex 누락 방지 규칙**  
EDA는 05장 비동기와 연결해서 보여준다.

### CQRS

**정의**  
명령 처리 모델과 조회 모델을 분리하는 패턴이다.

**실무에서 중요한 이유**  
읽기 트래픽이 많거나 조회 요구가 복잡할 때 유용하다.

**흔한 오해**  
CQRS를 적용하면 항상 성능이 좋아진다고 생각하는 것이다. 동기화 지연과 복잡도가 생긴다.

**Visual Lab 반영 방식**  
CQRS Panel에서 Command Model, Event, Query Model
freshness를 보여준다.

**Codex 누락 방지 규칙**  
CQRS는 read model lag와 consistency trade-off를 포함한다.


## 7. 실무 판단 기준

- 처음부터 MSA로 나누기보다 변경 이유와 책임 경계를 먼저 찾는다
- Controller에는 요청/응답 조립, Service에는 use case 흐름, Domain에는 규칙을 둔다
- DDD는 복잡한 규칙과 불변 조건이 있을 때 도입 가치를 설명한다
- 이벤트 기반 구조는 후속 작업 분리와 실패 처리를 함께 설계한다
- CQRS는 조회 요구와 데이터 신선도 허용 범위를 확인한 뒤 선택한다
- 아키텍처 선택은 성능, 운영, 팀 규모, 변경 빈도를 함께 고려한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Layer Map Panel`
- `Domain Model Panel`
- `Service Boundary Panel`
- `Event Flow Panel`
- `CQRS Panel`
- `Architecture Decision Matrix`

### 권장 사용자 흐름

1. God Service Incident를 보여준다
2. Layer Map으로 책임 분리 상태를 보여준다
3. Domain Model Panel에서 Aggregate와 invariant를 설명한다
4. Service Boundary Panel로 MSA 도입 시 장애/데이터 비용을 보여준다
5. Event Flow와 CQRS Panel로 비동기/조회 모델 분리를 보여준다
6. 부록 A 성능 테스트로 구조 검증을 연결한다

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

- `sequenceId`: 11
- `layers`: controller, application, domain, repository, infrastructure
- `architectureOptions`: mvc, layered, ddd, msa, eda, cqrs
- `tradeoffs`: complexity, coupling, consistency, deployability
- `decisionMatrix`: 도입 기준과 비용 배열

## 10. 인터랙티브 시나리오 제안

- **God Service 분리**: 하나의 서비스 클래스에 섞인 책임을 계층별로 나누는 과정을 보여준다.
- **MSA 과도 도입**: 서비스 분리 후 네트워크 호출과 데이터 일관성 문제가 증가하는 상황을 보여준다.
- **CQRS 조회 모델**: 명령은 성공했지만 조회 모델 반영이 지연되는 상황을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] MVC, 계층형, DDD, MSA, EDA, CQRS를 모두 다뤘는가
- [ ] 패턴을 유행어가 아니라 도입 기준과 비용으로 설명했는가
- [ ] 앞 장의 DB, 비동기, 동시성 개념과 연결했는가
- [ ] 부록 A 성능 테스트로 이어지는가
