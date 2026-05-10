# External Integration Concepts

### 타임아웃

분류: 외부 연동 안정성

정의: 외부 응답을 무한정 기다리지 않고 정해진 시간이 지나면 실패로 처리하는 제한이다.

실무에서 중요한 이유: 외부 API 대기로 서버 스레드와 커넥션이 고갈되는 일을 막는다.

흔한 오해: timeout을 길게 잡으면 안정적이라고 생각한다.

Visual Lab 반영 방식: External API Timeline에서 대기 시간이 서버 자원에 미치는 영향을 보여준다.

Codex 누락 방지 규칙: 외부 연동 장에서는 timeout 없는 요청을 실패 사례로 반드시 보여준다.

### 재시도

분류: 외부 연동 안정성

정의: 일시적 실패가 발생했을 때 같은 요청을 다시 보내는 방식이다.

실무에서 중요한 이유: 순간적인 네트워크 오류나 일시 장애를 완화할 수 있다.

흔한 오해: 재시도는 항상 좋은 해결책이라고 생각한다.

Visual Lab 반영 방식: Retry Storm Visualizer에서 재시도가 장애를 키우는 상황을 보여준다.

Codex 누락 방지 규칙: backoff, idempotency, retry storm 위험을 함께 넣는다.

### 서킷 브레이커

분류: 외부 연동 안정성

정의: 외부 서비스 실패가 일정 수준 이상이면 요청을 잠시 차단하고 빠르게 실패 처리하는 보호 장치다.

실무에서 중요한 이유: 장애가 발생한 외부 서비스로 계속 요청을 보내 내부 자원까지 고갈되는 일을 줄인다.

흔한 오해: timeout과 circuit breaker를 같은 기능으로 본다.

Visual Lab 반영 방식: Closed, Open, Half-Open 상태 패널과 상태 전이 흐름을 만든다.

Codex 누락 방지 규칙: 상태 전이와 빠른 실패의 목적을 반드시 표현한다.

### HTTP 커넥션 풀

분류: 외부 연동 자원 관리

정의: HTTP 요청에 사용할 연결을 매번 새로 만들지 않고 재사용하기 위해 관리하는 연결 묶음이다.

실무에서 중요한 이유: 외부 API 호출이 많은 서비스에서 연결 생성 비용과 자원 고갈을 줄인다.

흔한 오해: 스레드 풀과 커넥션 풀을 같은 것으로 생각한다.

Visual Lab 반영 방식: Connection Pool Gauge로 사용 중, 대기 중, 최대 연결 수를 보여준다.

Codex 누락 방지 규칙: 외부 API 호출 장에서는 스레드 대기와 커넥션 대기를 구분해서 보여준다.

### Timeout Budget

분류: 외부 연동 안정성

정의: 전체 요청 제한 시간 안에서 내부 처리, DB, 외부 API 호출에 나눠 배정한 시간 예산이다.

실무에서 중요한 이유: 하위 호출 timeout이 전체 API timeout보다 길면 사용자는 이미 실패했는데 서버는 계속 대기할 수 있다.

흔한 오해: 각 외부 API timeout만 따로 적당히 잡으면 된다고 생각한다.

Visual Lab 반영 방식: Request Timeline에서 전체 budget과 DB/API별 timeout을 겹쳐 보여준다.

Codex 누락 방지 규칙: timeout 설명에는 전체 요청 timeout과 하위 호출 timeout의 관계를 포함한다.

### Exponential Backoff

분류: 외부 연동 안정성

정의: 재시도 간격을 점점 늘려 외부 서비스에 가해지는 부하를 줄이는 방식이다.

실무에서 중요한 이유: 장애 중인 외부 시스템에 즉시 반복 요청을 보내 retry storm을 만드는 일을 완화한다.

흔한 오해: 재시도 횟수만 제한하면 충분하다고 생각한다.

Visual Lab 반영 방식: Retry Storm Visualizer에서 fixed retry와 exponential backoff를 비교한다.

Codex 누락 방지 규칙: 재시도 설명에는 backoff와 jitter를 함께 언급한다.

### Idempotency Key

분류: 외부 연동 / 중복 처리

정의: 같은 요청이 여러 번 도착해도 한 번만 처리되도록 요청을 식별하는 키다.

실무에서 중요한 이유: 결제, 주문, 포인트처럼 재시도와 중복 요청이 위험한 기능에서 중복 처리를 막는다.

흔한 오해: 클라이언트가 같은 버튼을 두 번 누르지 않으면 중복 요청은 없다고 생각한다.

Visual Lab 반영 방식: Retry Timeline에서 같은 idempotency key를 가진 요청이 하나의 처리 결과로 묶이는 모습을 보여준다.

Codex 누락 방지 규칙: 재시도나 timeout 후 재호출 설명에는 idempotency key를 함께 넣는다.

### Bulkhead

분류: 외부 연동 / 장애 격리

정의: 특정 외부 연동이나 기능이 사용하는 자원을 분리해 하나의 장애가 전체 시스템으로 번지지 않게 하는 방식이다.

실무에서 중요한 이유: 느린 외부 API 하나가 전체 thread pool이나 connection pool을 고갈시키는 일을 줄인다.

흔한 오해: circuit breaker만 있으면 자원 격리는 필요 없다고 생각한다.

Visual Lab 반영 방식: External Service A/B가 서로 다른 pool을 쓰는 Resource Isolation Panel로 보여준다.

Codex 누락 방지 규칙: 외부 연동 장애 설명에는 차단뿐 아니라 자원 격리 선택지를 포함한다.
