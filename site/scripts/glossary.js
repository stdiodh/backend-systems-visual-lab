window.labGlossary = {
  "incident-driven-learning": {
    name: "Incident-driven Learning",
    definition: "장애 상황이나 운영 문제에서 출발해 개념을 연결하는 학습 방식이다.",
    why: "실무 백엔드 문제는 증상에서 시작해 원인을 좁히는 과정으로 해결된다.",
    mistake: "개념 설명을 많이 넣으면 좋은 학습이라고 착각하는 것.",
    visualHint: "Incident Panel을 먼저 보여주고 다음 질문으로 장을 연결한다."
  },
  "system-thinking": {
    name: "System Thinking",
    definition: "API, DB, 외부 API, queue, OS, network를 연결된 시스템으로 보는 사고다.",
    why: "하나의 현상은 여러 계층의 원인을 가질 수 있다.",
    mistake: "Spring Boot 코드만 보면 서버 문제를 해결할 수 있다고 보는 것.",
    visualHint: "System Map Panel에서 현재 장의 위험 구간을 강조한다."
  },
  "codex-guardrail": {
    name: "Codex Guardrail",
    definition: "구현 전 읽어야 할 문서와 금지 사항을 고정하는 규칙이다.",
    why: "문서 없이 UI부터 만들면 범위 폭주와 개념 누락이 발생한다.",
    mistake: "프롬프트만 자세하면 좋은 결과가 나온다고 보는 것.",
    visualHint: "Terminal Panel에 참조 순서와 current goal을 짧게 표시한다."
  },
  throughput: {
    name: "Throughput",
    definition: "단위 시간 동안 시스템이 처리하는 요청 수다.",
    why: "처리량 증가와 응답 시간 변화를 함께 봐야 포화 지점을 찾을 수 있다.",
    mistake: "처리량이 높으면 무조건 좋은 상태라고 보는 것.",
    visualHint: "Metric Card에서 RPS와 latency를 나란히 보여준다."
  },
  latency: {
    name: "Latency",
    definition: "요청이 들어온 뒤 응답이 완료되기까지 걸린 시간이다.",
    why: "사용자가 직접 느끼는 품질과 연결된다.",
    mistake: "평균 응답 시간만 보면 충분하다고 보는 것.",
    visualHint: "avg, p95, p99를 함께 표시한다."
  },
  "tail-latency": {
    name: "Tail Latency",
    definition: "p95, p99처럼 느린 요청 구간의 응답 시간이다.",
    why: "일부 요청만 느려도 사용자 경험은 크게 나빠질 수 있다.",
    mistake: "p99는 극단값이라 무시해도 된다고 보는 것.",
    visualHint: "Incident Panel에서 평균과 p95 차이를 강조한다."
  },
  bottleneck: {
    name: "Bottleneck",
    definition: "전체 처리 흐름에서 가장 느리거나 먼저 포화되는 지점이다.",
    why: "병목이 아닌 곳을 고치면 개선 효과가 작다.",
    mistake: "CPU가 낮으면 서버 문제가 아니라고 단정하는 것.",
    visualHint: "Flow Explorer에서 단계별 지연 시간을 비교한다."
  },
  saturation: {
    name: "Saturation",
    definition: "리소스가 한계에 가까워져 대기열과 지연이 급증하는 상태다.",
    why: "포화 이후에는 작은 트래픽 증가도 응답 시간 폭증으로 이어진다.",
    mistake: "CPU 100%만 포화라고 보는 것.",
    visualHint: "사용률과 대기 시간을 함께 표시한다."
  },
  index: {
    name: "Index",
    definition: "DB가 특정 조건의 데이터를 빠르게 찾기 위해 사용하는 자료 구조다.",
    why: "조회 트래픽이 많은 서비스에서 응답 시간과 DB 부하에 직접 영향을 준다.",
    mistake: "인덱스를 많이 만들수록 항상 빠르다고 보는 것.",
    visualHint: "Query Lens에서 where/order by 조건과 연결한다."
  },
  "composite-index": {
    name: "Composite Index",
    definition: "두 개 이상의 컬럼을 묶어 만든 인덱스이며 컬럼 순서가 중요하다.",
    why: "실무 검색은 여러 조건과 정렬을 함께 사용한다.",
    mistake: "필요한 컬럼을 아무 순서로 묶으면 된다고 보는 것.",
    visualHint: "Index Simulator에서 컬럼 순서별 scan range를 비교한다."
  },
  "n-plus-one": {
    name: "N+1 Query",
    definition: "목록 조회 뒤 각 항목마다 추가 쿼리를 실행해 쿼리 수가 증가하는 문제다.",
    why: "작은 데이터에서는 티가 안 나지만 데이터가 늘면 급격히 느려진다.",
    mistake: "ORM을 쓰면 자동으로 해결된다고 보는 것.",
    visualHint: "Flow Explorer에서 query count 증가를 보여준다."
  },
  pagination: {
    name: "Pagination",
    definition: "목록 데이터를 페이지 단위로 나눠 조회하는 방식이다.",
    why: "깊은 offset 조회는 DB가 많은 row를 건너뛰게 만든다.",
    mistake: "limit만 넣으면 pagination 성능 문제가 끝난다고 보는 것.",
    visualHint: "Decision Panel에서 offset과 keyset의 조건을 비교한다."
  },
  transaction: {
    name: "Transaction",
    definition: "여러 DB 작업을 하나의 논리적 작업 단위로 묶는 방식이다.",
    why: "실패 시 데이터 정합성을 지키고 동시성 문제를 줄이는 핵심 장치다.",
    mistake: "트랜잭션을 넓게 잡을수록 안전하다고 보는 것.",
    visualHint: "Transaction Timeline에서 lock wait와 rollback 범위를 보여준다."
  },
  timeout: {
    name: "Timeout",
    definition: "외부 호출이 정해진 시간 안에 끝나지 않으면 기다림을 중단하는 제한이다.",
    why: "timeout이 없으면 thread, connection, transaction이 오래 점유되어 외부 장애가 내부 장애로 번진다.",
    mistake: "timeout을 길게 잡으면 더 안정적이라고 보는 것.",
    visualHint: "External Call Timeline에서 no-timeout과 timeout case의 자원 점유 차이를 보여준다."
  },
  retry: {
    name: "Retry",
    definition: "실패한 외부 요청을 다시 시도하는 전략이다.",
    why: "일시적 실패에는 도움이 되지만 제한 없이 쓰면 retry storm으로 장애를 증폭한다.",
    mistake: "재시도를 많이 하면 성공률이 항상 올라간다고 보는 것.",
    visualHint: "Retry Policy Panel에서 no retry, immediate retry, exponential backoff를 비교한다."
  },
  "circuit-breaker": {
    name: "Circuit Breaker",
    definition: "외부 연동 실패가 일정 수준 이상이면 호출을 잠시 차단하고 빠르게 실패시키는 보호 장치다.",
    why: "장애 중인 외부 서비스로 계속 호출하지 않아 내부 thread와 connection pool을 보호한다.",
    mistake: "circuit breaker가 외부 장애 자체를 해결한다고 보는 것.",
    visualHint: "Circuit State Panel에서 closed, open, half-open 상태와 전환 조건을 보여준다."
  },
  "http-connection-pool": {
    name: "HTTP Connection Pool",
    definition: "외부 HTTP 호출에 사용할 connection을 재사용하고 제한하는 자원 풀이다.",
    why: "pool이 고갈되면 외부 호출 대기와 내부 thread 대기가 함께 증가한다.",
    mistake: "pool 크기만 키우면 외부 연동 병목이 해결된다고 보는 것.",
    visualHint: "Pool Meter에서 active, idle, pending, max를 분리해 보여준다."
  },
  idempotency: {
    name: "Idempotency",
    definition: "같은 요청을 여러 번 실행해도 결과가 중복으로 망가지지 않게 만드는 성질이다.",
    why: "retry가 있는 결제, 주문, 포인트 흐름에서 중복 처리를 막기 위해 필요하다.",
    mistake: "사용자가 버튼을 한 번만 누르면 중복 요청은 없다고 보는 것.",
    visualHint: "Retry Policy Panel에서 idempotency key 조건을 retry 적용 조건으로 함께 보여준다."
  },
  "sync-integration": {
    name: "Sync Integration",
    definition: "요청 처리 흐름에서 연동 작업이 끝날 때까지 기다리는 방식이다.",
    why: "즉시 결과가 필요한 작업에는 명확하지만 느린 연동이 사용자 응답 전체를 지연시킬 수 있다.",
    mistake: "동기는 나쁘고 비동기는 좋다고 단순화하는 것.",
    visualHint: "Sync vs Async Decision Panel에서 즉시 결과 필요 여부를 기준으로 비교한다."
  },
  "async-integration": {
    name: "Async Integration",
    definition: "일부 작업을 사용자 응답 이후 별도 흐름에서 처리하는 방식이다.",
    why: "응답 시간과 실패 지점을 분리할 수 있지만 유실, 중복, 순서 문제를 함께 설계해야 한다.",
    mistake: "비동기로 넘기면 작업이 끝났다고 보는 것.",
    visualHint: "Message Flow Panel에서 요청 흐름과 후속 처리 흐름을 분리해 보여준다."
  },
  messaging: {
    name: "Messaging",
    definition: "producer가 메시지를 발행하고 broker를 거쳐 consumer가 나중에 처리하는 방식이다.",
    why: "시스템 사이의 직접 의존과 장애 전파를 줄이고 소비자 처리량에 맞춰 작업을 조절할 수 있다.",
    mistake: "메시지를 쓰면 데이터 정합성 문제가 사라진다고 보는 것.",
    visualHint: "Message Flow Panel에서 Producer, Broker, Consumer, Retry, DLQ를 보여준다."
  },
  "transactional-outbox": {
    name: "Transactional Outbox",
    definition: "비즈니스 저장과 발행할 이벤트를 같은 DB 트랜잭션에 저장한 뒤 relay가 메시지를 발행하는 패턴이다.",
    why: "DB 저장은 성공했지만 메시지 발행은 실패하는 불일치를 줄일 수 있다.",
    mistake: "outbox를 쓰면 정확히 한 번만 처리된다고 보는 것.",
    visualHint: "Outbox Timeline에서 order 저장, outbox 저장, relay 발행, consumer 처리를 보여준다."
  },
  "idempotent-consumer": {
    name: "Idempotent Consumer",
    definition: "같은 메시지를 여러 번 받아도 결과가 중복으로 망가지지 않도록 처리하는 consumer다.",
    why: "대부분의 메시징 시스템은 중복 전달 가능성이 있으므로 중복 처리 방어가 필요하다.",
    mistake: "producer가 중복 발행하지 않으면 consumer 중복 처리는 필요 없다고 보는 것.",
    visualHint: "Duplicate Message Scenario에서 processed message table 또는 idempotency key를 보여준다."
  },
  cdc: {
    name: "CDC",
    definition: "DB 변경 로그를 감지해 변경 이벤트를 다른 시스템으로 전달하는 방식이다.",
    why: "애플리케이션 코드가 직접 이벤트를 발행하지 않아도 데이터 변경 기반 연동을 만들 수 있다.",
    mistake: "CDC가 모든 메시징 문제를 자동으로 해결한다고 보는 것.",
    visualHint: "Decision Panel에서 CDC를 lag, 순서, schema change 위험과 함께 비교한다."
  },
  "race-condition": {
    name: "Race Condition",
    definition: "여러 실행 흐름이 같은 데이터에 접근하고 수정하는 순서에 따라 결과가 달라지는 문제다.",
    why: "재고, 포인트, 쿠폰, 중복 요청 처리처럼 정합성이 중요한 흐름에서 실제 데이터가 틀어질 수 있다.",
    mistake: "로컬 테스트에서 재현되지 않으면 안전하다고 보는 것.",
    visualHint: "Race Timeline에서 User A/B의 read-update-write 순서를 나란히 보여준다."
  },
  "lost-update": {
    name: "Lost Update",
    definition: "두 요청이 같은 값을 읽고 각각 수정한 뒤 한쪽 수정이 사라지는 문제다.",
    why: "재고 차감, 포인트 사용, 조회수 증가 같은 read-modify-write 작업에서 데이터 정합성을 깨뜨린다.",
    mistake: "트랜잭션을 쓰면 lost update가 항상 자동으로 막힌다고 보는 것.",
    visualHint: "Lost Update Panel에서 before, A update, B update, final value를 숫자로 비교한다."
  },
  "optimistic-lock": {
    name: "Optimistic Lock",
    definition: "충돌이 드물다고 보고 저장 시점에 version 등을 확인해 충돌을 감지하는 방식이다.",
    why: "읽기가 많고 충돌이 낮은 흐름에서 대기 없이 충돌을 발견할 수 있다.",
    mistake: "낙관적 락은 대기하지 않으니 충돌 처리 정책이 필요 없다고 보는 것.",
    visualHint: "Version Conflict Panel에서 version 1 업데이트 실패와 retry/user response를 보여준다."
  },
  "pessimistic-lock": {
    name: "Pessimistic Lock",
    definition: "충돌 가능성이 높다고 보고 데이터를 먼저 잠가 다른 트랜잭션을 대기시키는 방식이다.",
    why: "강한 정합성이 필요하거나 충돌이 잦은 작업에서 사용할 수 있다.",
    mistake: "비관적 락을 걸면 오래 잡아도 안전하다고 보는 것.",
    visualHint: "Lock Wait Timeline에서 wait time, timeout, deadlock 위험을 보여준다."
  },
  "unique-constraint": {
    name: "Unique Constraint",
    definition: "특정 컬럼 또는 컬럼 조합이 중복되지 않도록 DB가 강제하는 제약이다.",
    why: "애플리케이션 레벨 중복 확인이 동시에 통과해도 DB가 마지막 방어선이 될 수 있다.",
    mistake: "저장 전에 조회해서 없으면 insert하면 중복이 절대 생기지 않는다고 보는 것.",
    visualHint: "Decision Panel에서 중복 쿠폰 발급을 DB constraint로 막는 선택지로 표시한다."
  },
  "single-writer": {
    name: "Single Writer",
    definition: "특정 데이터 변경을 하나의 worker나 순차 처리 흐름으로 모아 직렬화하는 방식이다.",
    why: "락 경쟁이 심하거나 순서 보장이 중요한 hot key에서 복잡도를 줄일 수 있다.",
    mistake: "단일 writer는 무조건 느리기만 한 구조라고 보는 것.",
    visualHint: "Single Writer Queue Panel에서 정합성과 queue lag tradeoff를 함께 보여준다."
  },
  deadlock: {
    name: "Deadlock",
    definition: "두 개 이상의 트랜잭션이 서로 가진 잠금을 기다리며 더 이상 진행하지 못하는 상태다.",
    why: "잠금 순서와 트랜잭션 범위가 잘못되면 정상 요청도 실패하거나 지연된다.",
    mistake: "비관적 락을 쓰면 정합성 부작용 없이 모든 문제가 해결된다고 보는 것.",
    visualHint: "Lock Wait Timeline에서 transaction A/B wait와 deadlock 위험을 연결한다."
  }
};
