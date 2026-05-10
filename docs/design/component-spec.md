# Component Spec

## 원칙

컴포넌트는 장식보다 학습 흐름을 돕는 역할을 한다.

카드 안에 장문을 넣지 않고, 지표와 선택지를 빠르게 비교할 수 있게 만든다.

## Hero Section

목적: 첫 화면에서 이 랩이 무엇을 다루고 어떤 방식으로 학습하는지 즉시 보여준다.

포함 요소:

- `Backend Systems Visual Lab` 제목
- `느려진 서비스부터 구조 설계까지` 수준의 짧은 한 줄 설명
- 다루는 범위를 압축한 supporting copy
- Codex Terminal Panel 또는 Chapter Progress Rail과 연결되는 primary action

표시 규칙:

- 첫 화면에서 가장 큰 타이포그래피를 사용한다.
- supporting copy는 2~3줄을 넘기지 않는다.
- Hero 아래에 다음 섹션 일부가 보이게 해서 랜딩 페이지처럼 닫힌 화면이 되지 않게 한다.

금지 사항:

- 긴 소개 문단을 넣지 않는다.
- 일반 마케팅 히어로처럼 추상적인 배경 이미지만 보여주지 않는다.
- 사이트 기능 설명을 장황하게 쓰지 않는다.

## Codex Terminal Panel

목적: Codex 작업 화면을 설명하는 개발자 강의형 분위기를 만든다.

포함 요소:

- prompt line
- command lines
- current goal
- selected chapter
- next diagnostic step
- short output rows

표시 규칙:

- 4~8줄의 짧은 명령과 출력만 보여준다.
- 보라색은 goal/workflow 강조에 제한해서 사용한다.
- mono font를 사용하되 본문 가독성을 해치지 않는다.

금지 사항:

- 실제 실행 가능한 위험 명령처럼 보이는 destructive command를 넣지 않는다.
- 터미널을 장식용으로만 두지 않는다.
- 긴 로그를 그대로 붙이지 않는다.

## Goal Step Panel

목적: 사용자가 지금 어떤 학습/진단 단계에 있는지 보여준다.

포함 요소:

- current goal
- step number
- check state
- next action
- blocked question

표시 규칙:

- 단계는 3~5개로 제한한다.
- 현재 단계는 active 상태로 표시한다.
- 막힌 지점은 질문이 필요한 상태로 표현한다.

금지 사항:

- 단순 체크리스트만 나열하지 않는다.
- 모든 단계를 같은 강조도로 보여주지 않는다.

## System Map Panel

목적: Client, API Server, DB, External API, Queue, Worker, Network 같은 시스템 요소의 관계를
보여준다.

포함 요소:

- node
- edge
- risk marker
- selected path
- related metric

표시 규칙:

- 현재 장과 관련 없는 요소는 흐리게 처리한다.
- 장애 지점과 관찰 지표를 연결한다.
- 복잡한 아키텍처 전체도를 한 번에 보여주지 않는다.

금지 사항:

- 모든 시스템 요소를 한 화면에 밀어 넣지 않는다.
- 장식용 다이어그램으로 끝내지 않는다.

## Chapter Progress Rail

목적: 전체 장과 현재 위치를 보여준다.

포함 요소:

- 장 번호
- 짧은 코드명
- 제목
- category badge
- 구현 상태

규칙:

- 1장~11장과 부록 A~C를 모두 표시한다.
- 현재 장은 라인, 배지, 배경 대비 중 둘 이상으로 강조한다.
- 준비 중인 장도 목록에는 남긴다.
- 긴 제목만 나열하지 않고 짧은 코드명을 함께 사용한다.

코드명 예시:

```text
01 INIT
02 PERF
03 DB
04 EXT
05 ASYNC
06 RACE
07 IO
08 SEC
09 OPS
10 NET
11 ARCH
A LOAD
B NOSQL
C LOCK
```

금지 사항:

- 단순 목차처럼만 보이게 하지 않는다.
- 현재 진행 상태와 planned 상태를 구분하지 않는 목록으로 만들지 않는다.

## Incident Panel

목적: 각 장의 시작 문제를 보여준다.

포함 요소:

- incident title
- situation
- user impact
- observations
- first question

규칙:

- 이론 정의보다 먼저 나온다.
- 화면 첫 스크롤 안에 반드시 보인다.
- 위험 상태는 작은 badge로 표시한다.
- 장문 설명을 넣지 않는다.
- 한 장은 상황, 영향, 관찰 지표, 첫 번째 질문으로 제한한다.

금지 사항:

- 개념 정의로 시작하지 않는다.
- 상황 설명을 강의 본문처럼 길게 쓰지 않는다.
- danger 색을 패널 전체 배경으로 쓰지 않는다.

## Metric Card

목적: 관찰 지표를 빠르게 비교한다.

포함 요소:

- label
- value
- unit
- meaning
- status

규칙:

- 숫자는 크고 명확하게 표시한다.
- 평균, p95, p99는 함께 보여준다.
- 상태는 색상과 텍스트를 함께 사용한다.

금지 사항:

- 지표 의미 없이 숫자만 보여주지 않는다.
- 모든 지표를 같은 색으로 강조하지 않는다.

## Flow Explorer

목적: 요청, DB, 외부 연동, 메시지, 서버 자원 흐름을 단계로 보여준다.

포함 요소:

- step label
- input
- processing
- output
- risk
- fix

규칙:

- 코드 전체를 붙여 넣지 않는다.
- 단계는 4~7개 정도로 제한한다.
- 현재 선택 단계만 강조한다.

금지 사항:

- sequence diagram처럼 보이지만 실제 판단 기준이 없는 흐름을 만들지 않는다.
- 한 단계에 긴 코드 블록을 넣지 않는다.

## Concept Card

목적: 장에서 필요한 개념을 실무 문제와 연결한다.

포함 요소:

- name
- short definition
- why it matters
- common mistake
- visual hint

규칙:

- 정의만 표시하지 않는다.
- 흔한 오해를 반드시 포함한다.
- 관련 장 링크를 둔다.

금지 사항:

- 용어집처럼 개념명과 정의만 나열하지 않는다.
- 한 카드에 여러 개념을 섞지 않는다.

## Decision Panel

목적: 해결 선택지의 기준과 부작용을 비교한다.

포함 요소:

- problem
- options
- recommended option
- tradeoff
- when to avoid

규칙:

- 정답 하나만 말하지 않는다.
- 추천 선택지에는 도입 조건과 부작용을 함께 둔다.
- 선택지가 너무 많으면 탭이나 그룹으로 나눈다.

금지 사항:

- 장점만 있는 선택지를 만들지 않는다.
- 추천 선택지를 만능 해결책처럼 표현하지 않는다.

## Sequence Components

시퀀스 문서에서 요구하는 전용 컴포넌트는 아래 기준을 따른다.

자주 반복되는 것은 정식 컴포넌트로 사용하고, 장별 특수한 것은 공통 컴포넌트의 variant로
구현한다.

### Candidate Cause Stack

목적: 관찰 지표를 바탕으로 가능한 원인 후보를 우선순위로 좁힌다.

포함 요소:

- cause name
- related metric
- confidence or priority
- evidence
- next inspection action

표시 규칙:

- 3~6개 후보만 보여준다.
- 가장 가능성이 높은 후보를 위에 둔다.
- 각 후보는 관련 Metric Card나 Flow Explorer 단계와 연결한다.

금지 사항:

- 원인을 하나로 단정하지 않는다.
- 근거 없는 추측을 추천처럼 표시하지 않는다.

공통 컴포넌트와의 관계:

- `Decision Panel` variant다.
- 원인 후보를 선택하면 `Flow Explorer`의 관련 단계가 강조되어야 한다.

### Next Question

목적: 현재 시퀀스의 학습을 다음 시퀀스의 문제로 자연스럽게 넘긴다.

포함 요소:

- next sequence id
- question
- reason
- next action label

표시 규칙:

- 화면 하단에 고정된 짧은 문장으로 제공한다.
- Chapter Progress Rail의 다음 항목과 연결한다.
- 한 번에 하나의 질문만 보여준다.

금지 사항:

- 여러 질문을 한꺼번에 나열하지 않는다.
- 단순 링크 목록처럼 만들지 않는다.

공통 컴포넌트와의 관계:

- `Goal Step Panel` footer variant다.

### Query Lens Panel

목적: SQL, ORM 호출, 실행 계획, 조회 경로를 한 화면에서 비교한다.

포함 요소:

- query snippet
- execution path
- scanned rows
- index usage
- risk
- fix option

표시 규칙:

- 전체 쿼리 덤프보다 핵심 조건과 실행 경로를 보여준다.
- Index Simulator 또는 Transaction Timeline과 함께 배치할 수 있다.

금지 사항:

- 긴 SQL 본문을 그대로 붙여 넣지 않는다.
- 실행 계획을 숫자만 나열하지 않는다.

공통 컴포넌트와의 관계:

- `Flow Explorer` variant다.

### Index Simulator

목적: 인덱스 유무, 복합 인덱스 순서, 선택도 차이를 시각적으로 비교한다.

포함 요소:

- query condition
- index candidate
- selectivity
- scan range
- read/write tradeoff

표시 규칙:

- 인덱스 없음, 단일 인덱스, 복합 인덱스를 비교한다.
- 쓰기 비용과 잘못된 인덱스의 한계도 표시한다.

금지 사항:

- 모든 컬럼에 인덱스를 붙이면 된다는 인상을 주지 않는다.
- 성능 개선을 단일 정답처럼 보여주지 않는다.

공통 컴포넌트와의 관계:

- `Decision Panel`과 `Flow Explorer`의 DB variant다.

### Transaction Timeline

목적: DB 트랜잭션 경계, 외부 호출, rollback, lock wait의 시간을 보여준다.

포함 요소:

- transaction start/end
- DB operations
- external call
- lock wait
- rollback or commit

표시 규칙:

- 트랜잭션 안과 밖을 시각적으로 분리한다.
- 외부 API 호출이 트랜잭션 안에 있을 때의 위험을 강조한다.

금지 사항:

- 트랜잭션을 길게 잡을수록 안전하다는 인상을 주지 않는다.
- rollback이 외부 시스템까지 되돌린다고 표현하지 않는다.

공통 컴포넌트와의 관계:

- `Flow Explorer` timeline variant다.

### External Call Timeline

목적: 외부 API 호출의 대기, timeout, retry, fallback 흐름을 보여준다.

포함 요소:

- request start
- connect/read timeout
- retry attempts
- backoff
- fallback
- final result

표시 규칙:

- timeout 없음과 timeout 있음의 차이를 비교한다.
- retry storm 위험을 함께 표시한다.

금지 사항:

- retry를 항상 성공률을 높이는 기능으로만 표현하지 않는다.
- 외부 장애를 내부 책임 없음으로 끝내지 않는다.

공통 컴포넌트와의 관계:

- `Flow Explorer` external integration variant다.

### Circuit State Panel

목적: circuit breaker의 closed, open, half-open 상태와 전환 조건을 보여준다.

포함 요소:

- current state
- failure threshold
- open duration
- probe request
- recovery condition

표시 규칙:

- 세 상태를 모두 보여준다.
- 빠른 실패가 내부 자원 보호를 위한 선택임을 설명한다.

금지 사항:

- circuit breaker가 외부 장애 자체를 해결한다고 표현하지 않는다.
- 상태 전환 조건 없이 상태명만 나열하지 않는다.

공통 컴포넌트와의 관계:

- `System Map Panel` state variant다.

### Pool Meter

목적: DB 또는 HTTP connection pool의 active, idle, pending 상태를 보여준다.

포함 요소:

- active count
- idle count
- pending count
- max size
- wait time

표시 규칙:

- 사용률과 대기 시간을 함께 보여준다.
- pool 크기 증가의 부작용을 Decision Panel에 연결한다.

금지 사항:

- pool 크기를 키우는 것을 단일 해결책처럼 보여주지 않는다.
- thread pool과 connection pool을 섞어 설명하지 않는다.

공통 컴포넌트와의 관계:

- `Metric Card` resource variant다.

### Outbox Timeline

목적: 비즈니스 저장, outbox 저장, relay, broker, consumer 처리 흐름을 보여준다.

포함 요소:

- business transaction
- outbox row
- relay
- broker publish
- consumer result

표시 규칙:

- DB 변경과 이벤트 발행 요청이 같은 트랜잭션에 묶이는 지점을 강조한다.
- 중복 처리 가능성과 재처리 흐름을 표시한다.

금지 사항:

- outbox를 메시지 발행 성공 보장으로 표현하지 않는다.
- consumer 멱등성을 생략하지 않는다.

공통 컴포넌트와의 관계:

- `Flow Explorer` async variant다.

### Queue Lag Meter

목적: 메시지 큐의 backlog와 consumer 처리 지연을 보여준다.

포함 요소:

- queue depth
- oldest message age
- consumer throughput
- retry count
- DLQ count

표시 규칙:

- API 응답 시간과 후속 처리 지연을 분리해 보여준다.
- lag가 사용자 경험에 늦게 영향을 주는 흐름을 연결한다.

금지 사항:

- 비동기로 넘기면 작업이 끝난 것처럼 표현하지 않는다.
- 큐 길이만 보여주고 소비 속도를 빼지 않는다.

공통 컴포넌트와의 관계:

- `Metric Card` async variant다.

### Race Timeline

목적: 동시에 실행되는 요청의 read, modify, write 순서를 비교한다.

포함 요소:

- request A/B
- read value
- update intent
- write result
- conflict marker

표시 규칙:

- lost update가 발생하는 순서를 나란히 보여준다.
- lock, version, single writer 적용 전후를 비교한다.

금지 사항:

- 동시성 문제를 단순 에러 상황으로만 보여주지 않는다.
- 재현이 어렵다는 이유로 위험을 축소하지 않는다.

공통 컴포넌트와의 관계:

- `Flow Explorer` concurrency timeline variant다.

### Security Flow Panel

목적: 인증, 인가, 검증, 마스킹, 감사 로그를 요청 흐름 안에서 보여준다.

포함 요소:

- identity check
- permission decision
- sensitive data handling
- HMAC verification
- audit record

표시 규칙:

- 인증과 인가를 분리해 보여준다.
- 누락된 보안 단계는 risk marker로 표시한다.

금지 사항:

- 로그인 성공을 접근 허용으로 표현하지 않는다.
- 보안을 마지막 점검 항목처럼 뒤로 밀지 않는다.

공통 컴포넌트와의 관계:

- `System Map Panel` security pipeline variant다.

### Server Command Card

목적: 서버 상태 확인 명령과 그 명령으로 확인할 수 있는 지표를 연결한다.

포함 요소:

- command
- purpose
- expected signal
- risk
- next action

표시 규칙:

- 위험 명령과 조회 명령을 구분한다.
- 명령 결과를 다음 진단 단계와 연결한다.

금지 사항:

- 명령어 cheat sheet만 나열하지 않는다.
- destructive command를 실습 기본값으로 두지 않는다.

공통 컴포넌트와의 관계:

- `Codex Terminal Panel` command card variant다.

### Network Path Panel

목적: client, DNS, NAT, VPN, router, server로 이어지는 요청 경로를 보여준다.

포함 요소:

- node
- route
- public/private IP
- blocked segment
- protocol

표시 규칙:

- 요청이 서버 로그에 도달하지 않는 상황을 경로 단위로 보여준다.
- DNS, NAT, 방화벽, VPN을 한 흐름 안에 배치한다.

금지 사항:

- 네트워크 개념을 독립 용어 카드로만 나열하지 않는다.
- 경로와 장애 지점을 분리하지 않는다.

공통 컴포넌트와의 관계:

- `System Map Panel` network variant다.

### Pattern Comparison Board

목적: MVC, layered, DDD, MSA, EDA, CQRS의 선택 기준과 비용을 비교한다.

포함 요소:

- pattern name
- problem fit
- tradeoff
- cost
- avoid condition

표시 규칙:

- 패턴별 장점과 도입 비용을 함께 보여준다.
- 현재 시스템 문제와 연결한다.

금지 사항:

- 유명한 패턴을 정답처럼 추천하지 않는다.
- MSA나 CQRS를 과시용 구조로 표현하지 않는다.

공통 컴포넌트와의 관계:

- `Decision Panel` architecture variant다.

### Load Test Curve

목적: 부하 증가에 따른 throughput, latency, error rate 변화를 곡선으로 보여준다.

포함 요소:

- load level
- throughput
- p95/p99
- error rate
- saturation marker
- buckle zone marker

표시 규칙:

- 포화점과 버클존을 시각적으로 표시한다.
- 평균보다 percentile과 error rate를 함께 강조한다.

금지 사항:

- 성능 테스트 결과를 단일 점수로 표현하지 않는다.
- RPS만 높으면 성공처럼 보여주지 않는다.

공통 컴포넌트와의 관계:

- `Metric Card`와 `Flow Explorer` performance test variant다.

### CAP Triangle

목적: NoSQL 선택에서 consistency, availability, partition tolerance의 trade-off를 보여준다.

포함 요소:

- consistency
- availability
- partition tolerance
- chosen tradeoff
- affected use case

표시 규칙:

- CAP을 단순 공식이 아니라 장애 상황의 선택으로 설명한다.
- access pattern과 consistency requirement를 함께 보여준다.

금지 사항:

- 세 가지 중 아무거나 두 개를 고르는 그림으로 단순화하지 않는다.
- NoSQL을 RDB 대체재로만 표현하지 않는다.

공통 컴포넌트와의 관계:

- `Decision Panel` NoSQL variant다.

### DB Lock Table Flow

목적: DB 기반 분산 잠금의 acquire, owner 검증, expires_at, release 흐름을 보여준다.

포함 요소:

- lock key
- owner token
- expires_at
- acquire result
- release result
- stale lock cleanup

표시 규칙:

- 성공 흐름과 실패/만료 흐름을 함께 보여준다.
- owner token 없이 release하는 위험을 강조한다.

금지 사항:

- 잠금 테이블 하나로 모든 분산 문제가 해결된다고 표현하지 않는다.
- timeout과 clock drift 위험을 생략하지 않는다.

공통 컴포넌트와의 관계:

- `Flow Explorer` DB lock variant다.
