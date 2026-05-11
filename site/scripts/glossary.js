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
  },
  "network-io": {
    name: "Network IO",
    definition: "외부 API, DB, 파일, 네트워크 응답을 기다리는 입출력 작업이다.",
    why: "CPU 사용률은 낮아도 IO 대기가 길면 thread와 connection이 묶여 요청 대기열이 커진다.",
    mistake: "CPU가 낮으니 서버는 여유롭다고 판단하는 것.",
    visualHint: "Thread State Panel과 Resource Efficiency Meter에서 waiting thread와 pending request를 함께 보여준다."
  },
  "blocking-io": {
    name: "Blocking IO",
    definition: "IO 응답이 올 때까지 현재 실행 흐름이 기다리는 방식이다.",
    why: "단순한 코드 구조를 유지할 수 있지만 많은 요청이 동시에 기다리면 platform thread가 고갈될 수 있다.",
    mistake: "blocking IO는 항상 나쁘거나, thread pool만 키우면 항상 해결된다고 보는 것.",
    visualHint: "Thread State Panel에서 WAITING, TIMED_WAITING, BLOCKED 상태를 구분한다."
  },
  "virtual-thread": {
    name: "Virtual Thread",
    definition: "blocking 스타일 코드를 유지하면서 대기 중 platform thread 점유를 줄이는 가벼운 스레드 모델이다.",
    why: "IO-bound 서비스에서 코드 구조를 크게 바꾸지 않고 동시 요청 처리 효율을 높일 수 있다.",
    mistake: "가상 스레드가 DB pool, 외부 API quota, CPU-bound 병목까지 자동으로 해결한다고 보는 것.",
    visualHint: "Virtual Thread Panel에서 platform thread, virtual thread, carrier thread와 pinning 한계를 함께 보여준다."
  },
  "non-blocking-io": {
    name: "Non-blocking IO",
    definition: "IO 완료를 기다리며 thread를 점유하지 않고 이벤트 기반으로 후속 처리를 이어가는 방식이다.",
    why: "매우 높은 동시성과 event-driven 구조에서 자원 효율을 높일 수 있다.",
    mistake: "non-blocking IO는 항상 더 빠르고 운영하기 쉽다고 보는 것.",
    visualHint: "Event Loop Panel에서 event loop 안의 blocking call 위험을 보여준다."
  },
  "event-loop": {
    name: "Event Loop",
    definition: "적은 수의 thread가 준비된 IO 이벤트와 작업을 순서대로 처리하는 실행 모델이다.",
    why: "많은 연결을 효율적으로 다룰 수 있지만 오래 걸리는 blocking 작업 하나가 전체 흐름을 늦출 수 있다.",
    mistake: "event loop 위에서는 어떤 코드를 실행해도 자동으로 non-blocking이라고 생각하는 것.",
    visualHint: "Event Loop Panel에서 pending task, blocking call, delayed callback을 시간 흐름으로 보여준다."
  },
  "resource-efficiency": {
    name: "Resource Efficiency",
    definition: "thread, connection, queue, CPU 같은 제한된 자원을 요청 처리에 얼마나 효율적으로 쓰는지 보는 기준이다.",
    why: "IO 전략을 바꿔도 DB/HTTP pool, file descriptor, 외부 API 제한이 남으면 병목은 다른 곳으로 이동한다.",
    mistake: "thread 수가 많아지면 전체 자원 한계도 함께 늘어난다고 보는 것.",
    visualHint: "Resource Efficiency Meter에서 thread utilization, waiting ratio, request queue, throughput을 함께 표시한다."
  },
  authentication: {
    name: "Authentication",
    definition: "요청자가 누구인지 확인하는 과정이다. 로그인, 세션, 토큰 검증이 여기에 해당한다.",
    why: "사용자를 식별하지 못하면 이후 권한 판단과 감사 로그가 의미를 잃는다.",
    mistake: "로그인 성공을 모든 API 접근 허용으로 보는 것.",
    visualHint: "AuthN/AuthZ Split Panel에서 '누구인가'를 인가와 분리해 보여준다."
  },
  authorization: {
    name: "Authorization",
    definition: "인증된 사용자가 특정 기능이나 리소스에 접근할 수 있는지 판단하는 과정이다.",
    why: "다른 사용자의 주문, 관리자 기능, 조직별 데이터 접근을 막는 핵심 방어선이다.",
    mistake: "role만 확인하면 리소스 소유자 검증도 끝났다고 보는 것.",
    visualHint: "Security Flow Panel과 AuthN/AuthZ Split Panel에서 role과 resource owner를 함께 비교한다."
  },
  encryption: {
    name: "Encryption",
    definition: "민감 데이터를 읽을 수 없는 형태로 바꾸고 필요한 경우 복호화할 수 있게 보호하는 방식이다.",
    why: "저장소나 전송 구간에서 개인정보와 중요한 식별자가 노출될 위험을 줄인다.",
    mistake: "암호화, 해싱, 마스킹, HMAC을 같은 보호 방식으로 보는 것.",
    visualHint: "Sensitive Data Exposure Panel에서 원본, 마스킹, 숨김, 암호화 대상을 구분한다."
  },
  hmac: {
    name: "HMAC",
    definition: "공유 secret과 payload로 signature를 계산해 메시지 위변조 여부를 검증하는 방식이다.",
    why: "외부 webhook이나 signed request에서 신뢰할 수 없는 요청을 차단하는 기준이 된다.",
    mistake: "HMAC을 데이터 암호화나 비밀값 은닉 수단으로 이해하는 것.",
    visualHint: "HMAC Verification Flow에서 canonical string, signature 비교, replay 방지를 순서로 보여준다."
  },
  firewall: {
    name: "Firewall",
    definition: "source, port, protocol, 방향 기준으로 허용할 네트워크 트래픽을 제한하는 장치다.",
    why: "DB, 관리자 API, 내부 서비스가 불필요하게 외부에 노출되는 것을 줄인다.",
    mistake: "방화벽이 애플리케이션 인증과 인가를 대신한다고 보는 것.",
    visualHint: "Firewall Rule Panel에서 allowed inbound, blocked inbound, internal only, admin only를 비교한다."
  },
  "audit-log": {
    name: "Audit Log",
    definition: "누가 언제 어떤 리소스에 어떤 작업을 어떤 결과로 수행했는지 추적하는 기록이다.",
    why: "사고 조사, 비정상 접근 분석, 권한 변경 추적에 필요하다.",
    mistake: "일반 application log가 있으면 감사 로그도 충분하다고 보는 것.",
    visualHint: "Audit Log Timeline에서 actor, action, resource, result, timestamp를 연결한다."
  },
  "data-exposure": {
    name: "Data Exposure",
    definition: "응답, 로그, DTO, 화면에 민감 정보가 불필요하게 드러나는 문제다.",
    why: "기능은 정상이어도 passwordHash, token, phone, internal memo 노출은 보안 사고가 된다.",
    mistake: "DB만 안전하면 API 응답과 로그 노출은 괜찮다고 보는 것.",
    visualHint: "Sensitive Data Exposure Panel에서 Entity, DTO, Response, Masked Field, Hidden Field를 비교한다."
  },
  "abnormal-access": {
    name: "Abnormal Access",
    definition: "짧은 시간의 반복 실패, 타인 리소스 접근, 비정상 source 같은 의심스러운 접근 패턴이다.",
    why: "공격이나 권한 우회 시도는 단일 요청보다 패턴으로 드러나는 경우가 많다.",
    mistake: "HTTP 403을 반환하면 추적과 제한은 필요 없다고 보는 것.",
    visualHint: "Metric Card와 Audit Log Timeline에서 abnormal access count와 차단 결과를 보여준다."
  },
  "secure-coding": {
    name: "Secure Coding",
    definition: "입력 검증, 권한 검사, 출력 마스킹, 에러 메시지 관리, secret 보호를 코드 단계에서 적용하는 습관이다.",
    why: "취약점은 별도 보안 기능보다 평범한 기능 구현 중에 자주 생긴다.",
    mistake: "배포 전 보안 스캔 도구가 개발 중 취약한 코드 흐름을 자동으로 해결한다고 보는 것.",
    visualHint: "Checklist에서 input validation, authorization, response masking, audit, secret handling을 함께 확인한다."
  },
  "os-account": {
    name: "OS Account",
    definition: "서버에서 명령 실행, 파일 접근, 프로세스 실행 권한을 가지는 사용자 계정이다.",
    why: "서비스가 어떤 계정으로 실행되는지 알아야 권한 문제와 보안 위험을 함께 판단할 수 있다.",
    mistake: "root로 실행하면 권한 문제가 없으니 운영이 더 안전하다고 보는 것.",
    visualHint: "Process Inspector Panel에서 owner user와 실행 command를 함께 보여준다."
  },
  permission: {
    name: "Permission",
    definition: "파일, 디렉터리, 명령, 포트 접근을 어떤 사용자와 그룹에게 허용할지 정하는 규칙이다.",
    why: "권한이 부족하면 배포와 로그 쓰기가 실패하고, 과도하면 사고 범위가 커진다.",
    mistake: "권한 오류가 나면 넓게 허용하면 된다고 생각하는 것.",
    visualHint: "Decision Panel에서 애플리케이션 로그만 보는 선택과 권한/소유자 확인을 비교한다."
  },
  process: {
    name: "Process",
    definition: "서버에서 실행 중인 프로그램 인스턴스이며 PID, 상태, CPU, memory, owner를 가진다.",
    why: "배포가 성공했어도 실제 프로세스가 떠 있는지와 어떤 자원을 쓰는지 확인해야 한다.",
    mistake: "서버가 켜져 있으면 애플리케이션도 정상이라고 보는 것.",
    visualHint: "Process Inspector Panel에서 PID, command, uptime, status, owner user를 표시한다."
  },
  "background-process": {
    name: "Background Process",
    definition: "터미널 세션과 분리되어 계속 실행되는 프로세스나 서비스 실행 방식이다.",
    why: "세션 종료와 함께 프로세스가 죽거나 중복 실행되면 장애와 혼란이 생긴다.",
    mistake: "명령을 한 번 실행하면 서비스가 안정적으로 백그라운드에서 돈다고 보는 것.",
    visualHint: "Server Command Card에서 process status와 uptime 확인을 연결한다."
  },
  "disk-usage": {
    name: "Disk Usage",
    definition: "파일 시스템에서 사용 중인 용량, 남은 공간, 로그 디렉터리 증가 상태를 확인하는 기준이다.",
    why: "디스크가 가득 차면 로그 기록, 업로드, DB 쓰기, 배포가 실패할 수 있다.",
    mistake: "CPU와 memory가 괜찮으면 서버 리소스는 정상이라고 보는 것.",
    visualHint: "Disk Usage Panel에서 filesystem, used, available, usage percent, log directory를 보여준다."
  },
  "file-descriptor": {
    name: "File Descriptor",
    definition: "프로세스가 파일, socket, pipe 같은 OS 자원을 열 때 사용하는 핸들이다.",
    why: "HTTP connection과 파일 접근이 많으면 too many open files로 서비스가 실패할 수 있다.",
    mistake: "파일 디스크립터는 파일에만 관련 있고 네트워크 연결과는 무관하다고 보는 것.",
    visualHint: "File Descriptor Limit Panel에서 current open files, process limit, system limit를 비교한다."
  },
  "time-sync": {
    name: "Time Sync",
    definition: "서버 시간이 기준 시간과 맞도록 동기화되어 있는지 확인하는 운영 기준이다.",
    why: "토큰 만료, audit log 순서, cron 실행, 분산 시스템 만료 판단은 서버 시간에 의존한다.",
    mistake: "몇 분 정도의 시간 차이는 운영에 영향이 거의 없다고 보는 것.",
    visualHint: "Cron Schedule Panel과 Metric Card에서 time drift와 last expected run을 연결한다."
  },
  cron: {
    name: "Cron",
    definition: "정해진 시간이나 주기로 명령을 실행하는 Unix 계열 스케줄러다.",
    why: "배치, 정리 작업, 동기화가 실행되지 않으면 장애 원인이 애플리케이션 밖에 숨어 있을 수 있다.",
    mistake: "crontab에 등록되어 있으면 항상 같은 환경에서 실행된다고 보는 것.",
    visualHint: "Cron Schedule Panel에서 schedule expression, command, log path, failure signal을 보여준다."
  },
  alias: {
    name: "Alias",
    definition: "자주 쓰는 명령을 짧은 이름으로 등록하는 shell 편의 기능이다.",
    why: "개인 shell 설정 차이는 진단 명령 결과와 운영 절차에 영향을 줄 수 있다.",
    mistake: "내 터미널에서 되던 alias가 서버나 cron에서도 똑같이 동작한다고 보는 것.",
    visualHint: "Checklist에서 alias와 환경 변수 차이를 destructive command 주의와 연결한다."
  },
  "network-command": {
    name: "Network Info",
    definition: "서버의 listening port, established connection, local/remote address, process mapping을 확인하는 정보다.",
    why: "프로세스가 떠 있어도 port가 열리지 않았거나 다른 프로세스가 점유하면 요청이 도달하지 못한다.",
    mistake: "애플리케이션 로그만 보면 네트워크 상태도 충분히 알 수 있다고 보는 것.",
    visualHint: "Network Command Panel에서 listening ports, established connections, process mapping을 보여준다."
  }
};
