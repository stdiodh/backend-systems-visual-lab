# Architecture Concepts

### MVC

분류: 서버 구조

정의: 사용자 요청 처리, 비즈니스 처리, 화면 또는 응답 표현 책임을 나누는 기본 구조 패턴이다.

실무에서 중요한 이유: 작은 서비스에서 요청 처리 흐름과 책임 분리를 이해하는 출발점이다.

흔한 오해: MVC만 지키면 복잡한 도메인도 자연스럽게 정리된다고 생각한다.

Visual Lab 반영 방식: Controller, Service, Repository, View/Response 흐름을 보여준다.

Codex 누락 방지 규칙: MVC는 계층형 구조와 차이를 설명한다.

### 계층형 아키텍처

분류: 서버 구조

정의: presentation, application/service, domain, infrastructure 같은 책임을 층으로 나누는 구조다.

실무에서 중요한 이유: 변경 영향과 의존 방향을 관리하는 데 도움이 된다.

흔한 오해: 폴더만 나누면 계층이 분리됐다고 생각한다.

Visual Lab 반영 방식: Architecture Layer Diagram으로 호출 방향과 금지 의존을 표시한다.

Codex 누락 방지 규칙: 계층 설명에는 의존 방향과 transaction boundary를 함께 포함한다.

### DDD 전술 패턴

분류: 도메인 설계

정의: Entity, Value Object, Aggregate, Repository, Domain Service 등으로 도메인 복잡도를 모델링하는 방식이다.

실무에서 중요한 이유: 복잡한 비즈니스 규칙을 데이터 중심 CRUD 코드에서 분리해 관리할 수 있다.

흔한 오해: DDD는 MSA와 같은 뜻이라고 생각한다.

Visual Lab 반영 방식: Aggregate Boundary와 Repository 역할을 다이어그램으로 보여준다.

Codex 누락 방지 규칙: DDD 설명에는 도입 비용과 단순 CRUD에는 과할 수 있음을 포함한다.

### 이벤트 기반 아키텍처

분류: 시스템 구조

정의: 시스템이 상태 변화나 사건을 이벤트로 발행하고 다른 구성요소가 이를 구독해 처리하는 구조다.

실무에서 중요한 이유: 시스템 간 결합을 줄이고 비동기 확장을 쉽게 만들 수 있다.

흔한 오해: 이벤트 기반으로 바꾸면 모든 의존성이 사라진다고 생각한다.

Visual Lab 반영 방식: Event Producer, Broker, Consumer, Outbox, Retry 흐름을 연결한다.

Codex 누락 방지 규칙: 중복 처리, 순서, eventual consistency를 함께 표시한다.

### CQRS

분류: 구조 설계

정의: 명령을 처리하는 쓰기 모델과 조회를 처리하는 읽기 모델을 분리하는 패턴이다.

실무에서 중요한 이유: 읽기와 쓰기의 요구사항이 크게 다를 때 구조를 분리해 최적화할 수 있다.

흔한 오해: Controller를 두 개로 나누는 것이라고 생각한다.

Visual Lab 반영 방식: Command API와 Query API, Read Model을 분리한 다이어그램을 만든다.

Codex 누락 방지 규칙: MSA나 이벤트 기반 구조와 연결하되 도입 비용도 함께 표시한다.

