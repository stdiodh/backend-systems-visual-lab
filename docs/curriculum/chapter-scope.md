# Chapter Scope

## 작성 규칙

각 장은 단순 이론 목록이 아니라 실무 문제 상황에서 시작한다. 장마다 문제 상황, 관찰 지표, 원인 후보, 해결 선택지, 코드/구조 연결을 반드시 포함한다.

## 01. 들어가며

문제 상황: 기존 시퀀스 실습을 마쳤지만 실무 시스템 장애와 구조 판단을 어떤 순서로 공부해야 할지 막막하다.

관찰 지표: 학습 범위, 레포 역할, 문서 읽기 순서, Phase 진행 상태.

원인 후보: 단일 토픽 중심 학습, 지표 기반 사고 부족, 중앙 레포와 통합 랩 역할 혼동.

해결 선택지: Lab Map, Repository Role Diagram, Codex Workflow Panel로 학습 경로를 먼저 보여준다.

코드/구조 연결: 중앙 레포는 링크 허브, 이 레포는 문서와 사이트 본체로 분리한다.

## 02. 느려진 서비스, 어디부터 봐야 할까

문제 상황: 게시글 목록 API의 p95 응답 시간이 180ms에서 2.8s로 증가했다.

관찰 지표: RPS, 평균 응답 시간, p95, p99, 에러율, DB 커넥션 사용률, 외부 API latency.

원인 후보: 인덱스 부재, N+1, 외부 API 대기, 스레드 고갈, 커넥션 풀 고갈, 배포 직후 캐시 미스.

해결 선택지: 로그와 지표로 병목 후보를 좁힌 뒤 가장 느리거나 먼저 포화된 구간부터 확인한다.

코드/구조 연결: Controller, Service, Repository, External Client, DB 호출 흐름을 Request Flow Explorer로 연결한다.

## 03. 성능을 좌우하는 DB 설계와 쿼리

문제 상황: 트래픽이 늘자 조회 API가 급격히 느려지고 DB CPU와 slow query가 증가한다.

관찰 지표: 실행 계획, rows examined, index 사용 여부, query count, lock wait, transaction duration.

원인 후보: 부적절한 인덱스, full scan, N+1, offset pagination 한계, 트랜잭션 경계 과다, 외부 연동 포함 트랜잭션.

해결 선택지: 인덱스 설계, 쿼리 재작성, fetch 전략 조정, keyset pagination, 트랜잭션 경계 축소.

코드/구조 연결: SQL, ORM repository, transaction boundary, read model을 함께 보여준다.

## 04. 외부 연동이 문제일 때 살펴봐야 할 것들

문제 상황: 우리 서버 CPU는 여유가 있는데 결제 승인 API가 timeout으로 실패하고 전체 주문 요청이 밀린다.

관찰 지표: 외부 API latency, timeout count, retry count, thread pool usage, HTTP connection pool usage, circuit breaker state.

원인 후보: timeout 미설정, 과도한 재시도, 동시 요청 제한 부재, 외부 API 장애, 커넥션 풀 부족, DB 트랜잭션 안의 외부 호출.

해결 선택지: timeout, backoff retry, idempotency, circuit breaker, bulkhead, connection pool 조정, 연동 이중화.

코드/구조 연결: External Client, DB transaction, retry policy, circuit breaker state machine을 연결한다.

## 05. 비동기 연동, 언제 어떻게 써야 할까

문제 상황: 주문 완료 후 알림, 포인트, 외부 배송 연동을 모두 동기로 처리해 사용자가 응답을 오래 기다린다.

관찰 지표: end-to-end latency, queue lag, failed message count, duplicate event count, relay delay.

원인 후보: 모든 후속 작업을 동기 처리, 메시지 유실, 중복 처리 미대응, outbox 누락, 배치 전송 기준 부재.

해결 선택지: 별도 스레드, 메시징, 트랜잭션 아웃박스, 배치 전송, CDC를 요구사항에 따라 선택한다.

코드/구조 연결: API transaction, outbox table, relay, message broker, consumer idempotency를 흐름으로 보여준다.

## 06. 동시성, 데이터가 꼬이기 전에 잡아야 한다

문제 상황: 동시에 쿠폰을 발급하거나 재고를 차감하면 수량이 맞지 않는다.

관찰 지표: duplicate key, lost update, lock wait, deadlock, retry failure, version conflict.

원인 후보: 공유 mutable state, race condition, 트랜잭션 격리 수준 오해, 낙관적/비관적 락 선택 오류, 단일 worker 필요성 무시.

해결 선택지: 프로세스 락, DB unique constraint, 낙관적 락, 비관적 락, queue 기반 단일 처리, idempotency key.

코드/구조 연결: read-modify-write 코드, version column, select for update, queue worker 구조를 비교한다.

## 07. IO 병목, 어떻게 해결하지

문제 상황: 외부 API 대기 시간이 길어지자 CPU는 낮은데 요청 처리가 밀린다.

관찰 지표: thread count, blocked/waiting threads, connection count, event loop delay, CPU usage, memory usage.

원인 후보: blocking IO로 인한 스레드 점유, platform thread 한계, non-blocking 복잡도, CPU 병목과 IO 병목 혼동.

해결 선택지: blocking 유지와 풀 조정, Java 가상 스레드, non-blocking IO, backpressure 설계.

코드/구조 연결: Thread per request, virtual thread executor, event loop/reactive flow를 비교한다.

## 08. 실무에서 꼭 필요한 보안 지식

문제 상황: 기능은 동작하지만 권한 확인 누락, 민감정보 노출, 위변조 검증 부재가 운영 리스크가 된다.

관찰 지표: unauthorized access, forbidden count, audit log coverage, secret exposure, abnormal request pattern.

원인 후보: 인증과 인가 혼동, 암호화와 HMAC 혼동, 감사 로그 누락, 개인정보 마스킹 누락, 방화벽 정책 부재.

해결 선택지: 인증/인가 분리, 데이터 암호화, HMAC 검증, 네트워크 접근 제한, 감사 로그, 시큐어 코딩 체크.

코드/구조 연결: security filter, permission check, masking serializer, audit logger, webhook verifier를 연결한다.

## 09. 최소한 알고 있어야 할 서버 지식

문제 상황: 운영 서버에서 프로세스, 디스크, 권한, 포트 상태를 확인하지 못해 장애 원인을 좁히지 못한다.

관찰 지표: process status, disk usage, file descriptor count, system time, cron status, network socket state.

원인 후보: OS 계정 권한 문제, 백그라운드 프로세스 종료, 디스크 full, ulimit 부족, 시간 불일치, cron 미실행.

해결 선택지: 기본 Linux 명령 카드, 점검 체크리스트, 위험 명령 분리, 운영 로그 확인 순서를 제공한다.

코드/구조 연결: 배포 프로세스, 로그 파일, cron job, network socket, service process를 서버 맵으로 보여준다.

## 10. 모르면 답답해지는 네트워크 기초

문제 상황: 로컬에서는 되지만 배포 환경에서는 도메인, NAT, VPN, 프로토콜 문제로 연결이 실패한다.

관찰 지표: DNS resolution, ping/traceroute 결과, port open 여부, public/private IP, TCP handshake, packet loss.

원인 후보: DNS 설정 오류, NAT 경로 오해, VPN 라우팅 문제, 방화벽 차단, TCP/UDP/QUIC 특성 혼동.

해결 선택지: Client-to-Server path, DNS flow, NAT diagram, protocol comparison으로 요청 경로를 추적한다.

코드/구조 연결: application URL, load balancer, gateway, private subnet, external service endpoint를 연결한다.

## 11. 자주 쓰는 서버 구조와 설계 패턴

문제 상황: 서비스가 커지면서 Controller, Service, Repository만으로 변경 영향과 책임 분리가 어려워진다.

관찰 지표: module dependency, duplicated logic, transaction boundary, event count, read/write traffic split.

원인 후보: 계층 책임 혼동, 도메인 모델 부재, MSA 과잉 도입, EDA의 중복/순서 문제, CQRS 도입 비용 과소평가.

해결 선택지: MVC, 계층형, DDD 전술 패턴, MSA, EDA, CQRS를 선택 기준과 비용 중심으로 비교한다.

코드/구조 연결: package structure, aggregate, domain service, event handler, read model을 다이어그램으로 보여준다.

## 부록 A. 성능 테스트

문제 상황: 성능 테스트를 실행했지만 결과 숫자가 무엇을 의미하는지 모르고 개선 방향을 잡지 못한다.

관찰 지표: throughput, latency percentiles, error rate, saturation point, resource usage, ramp-up curve.

원인 후보: 목표 지표 부재, 비현실적 시나리오, 테스트 데이터 부족, 관찰 지표 누락, 포화점 해석 오류.

해결 선택지: 테스트 종류 선택, 목표 정의, 측정 지표 고정, 부하 패턴 설계, 결과 해석 체크리스트를 제공한다.

코드/구조 연결: load generator, API server, DB, external dependency, monitoring dashboard를 연결한다.

## 부록 B. NoSQL 이해하기

문제 상황: RDB가 느리다는 이유만으로 NoSQL을 도입하려 하지만 어떤 문제를 해결하는지 불명확하다.

관찰 지표: access pattern, consistency requirement, query shape, write volume, scaling need.

원인 후보: RDB 대체재 오해, CAP 정리 오해, 데이터 모델링 부재, 운영 복잡도 과소평가.

해결 선택지: Key-Value, Document, Wide Column, Graph를 access pattern 기준으로 비교한다.

코드/구조 연결: entity model, document model, cache/session store, graph relationship query를 비교한다.

## 부록 C. DB로 분산 잠금 구현하기

문제 상황: 여러 서버 인스턴스가 같은 작업을 동시에 실행해 중복 처리와 데이터 꼬임이 발생한다.

관찰 지표: lock acquire success/fail, lock wait time, owner, expires_at, stale lock, transaction timeout.

원인 후보: lock release 누락, timeout 부재, owner 검증 부재, transaction boundary 오류, clock drift.

해결 선택지: lock table, acquire/release SQL, owner token, expires_at, retry/backoff, failure cleanup을 설계한다.

코드/구조 연결: scheduler, lock repository, business transaction, cleanup job 흐름을 보여준다.

