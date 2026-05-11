window.labScenarios = {
  "01-intro": {
    title: "코드는 돌아가지만 운영 판단 기준이 없다",
    severity: "orientation",
    situation:
      "CRUD API는 만들 수 있지만, 서비스가 느려지거나 장애가 나면 어디부터 봐야 할지 모른다.",
    impact:
      "기능 구현과 실무 시스템 판단 사이의 간격이 드러나고, 운영 상황에서 원인을 좁히지 못한다.",
    firstQuestion: "코드가 동작하는 서비스가 왜 느려지는가?",
    observations: [
      "Visual Lab은 문제 상황에서 시작해 지표와 선택지로 이동한다.",
      "Codex는 curriculum-map만 보지 않고 sequence 문서를 함께 읽어야 한다.",
      "전체 장은 느려진 서비스에서 구조 설계까지 하나의 장애 흐름으로 이어진다."
    ],
    metrics: [
      {
        label: "Refs",
        value: "8",
        unit: "docs",
        meaning: "구현 전 참조 순서",
        status: "normal"
      },
      {
        label: "Scope",
        value: "14",
        unit: "seq",
        meaning: "01~부록 C 전체 흐름",
        status: "normal"
      },
      {
        label: "Mode",
        value: "Lab",
        unit: "",
        meaning: "문서 사이트가 아닌 판단 훈련",
        status: "warning"
      }
    ],
    flow: [
      {
        label: "Read AGENTS",
        input: "작업 요청",
        processing: "금지 사항과 Phase 확인",
        output: "guardrail",
        risk: "범위 폭주",
        fix: "작업 전 규칙 고정"
      },
      {
        label: "Read Sequence",
        input: "01~03 sequence docs",
        processing: "Incident, 지표, UX 컴포넌트 추출",
        output: "screen model",
        risk: "목차 카드 나열",
        fix: "장별 흐름 반영"
      },
      {
        label: "Render Lab",
        input: "site data",
        processing: "패널별 짧은 데이터 렌더링",
        output: "developer workspace",
        risk: "긴 이론 본문",
        fix: "카드와 패널로 분해"
      }
    ],
    causes: [
      {
        name: "문서 참조 누락",
        metric: "required docs",
        evidence: "curriculum-map만 보고 구현하면 장별 Incident가 사라진다.",
        priority: "high",
        action: "AGENTS → README → sequence 문서 순서로 확인"
      },
      {
        name: "일반 문서 사이트화",
        metric: "screen flow",
        evidence: "문제 상황 없이 개념 설명부터 시작할 수 있다.",
        priority: "medium",
        action: "Incident Panel을 첫 흐름으로 유지"
      },
      {
        name: "디자인 방향 흐림",
        metric: "workspace mood",
        evidence: "평범한 dark admin dashboard로 보일 수 있다.",
        priority: "medium",
        action: "Terminal, Goal, Rail 조합 유지"
      }
    ],
    decisions: [
      {
        problem: "Visual Lab 첫 장에서 무엇을 먼저 보여줄까?",
        options: [
          {
            label: "긴 소개문",
            tradeoff: "맥락은 충분하지만 사용자가 바로 판단 흐름을 보기 어렵다.",
            status: "avoid"
          },
          {
            label: "Incident 기반 온보딩",
            tradeoff: "설명은 짧지만 이후 장의 문제 흐름으로 자연스럽게 연결된다.",
            status: "recommended"
          },
          {
            label: "목차 카드 나열",
            tradeoff: "구현은 빠르지만 Visual Lab의 실무 판단 훈련 성격이 약해진다.",
            status: "avoid"
          }
        ],
        recommended: "Incident 기반 온보딩으로 시작한다.",
        tradeoff: "상세 설명은 줄어들지만 다음 장의 성능 진단 질문으로 바로 이어진다.",
        avoid: "긴 블로그 본문이나 단순 목차 카드"
      }
    ],
    systemMap: [
      {
        id: "client",
        label: "Client",
        detail: "사용자가 체감하는 화면 지연과 오류",
        state: "active"
      },
      {
        id: "api",
        label: "API Server",
        detail: "요청 처리, thread, service 흐름",
        state: "active"
      },
      {
        id: "db",
        label: "DB",
        detail: "쿼리, 인덱스, 트랜잭션",
        state: "active"
      },
      {
        id: "external",
        label: "External API",
        detail: "timeout, retry, circuit breaker",
        state: "ready"
      },
      {
        id: "queue",
        label: "Queue",
        detail: "비동기 처리, outbox, consumer lag",
        state: "ready"
      },
      {
        id: "server",
        label: "Server",
        detail: "프로세스, 디스크, 권한, 스케줄링",
        state: "ready"
      },
      {
        id: "network",
        label: "Network",
        detail: "IP, NAT, VPN, TCP/UDP/QUIC",
        state: "ready"
      },
      {
        id: "architecture",
        label: "Architecture",
        detail: "계층형, DDD, MSA, EDA, CQRS",
        state: "ready"
      }
    ],
    specialPanels: [
      {
        type: "reference-order",
        title: "구현 전 참조 순서",
        rows: [
          "AGENTS.md",
          "README.md",
          "curriculum-map.md",
          "docs/sequences/README.md",
          "구현 대상 sequence 문서",
          "concepts 문서",
          "design 문서",
          "site schema 문서"
        ]
      }
    ],
    checklist: [
      "curriculum-map만 보고 구현하지 않는다.",
      "sequence 문서의 Incident를 먼저 본다.",
      "Visual Lab 화면 반영 방식을 확인한다.",
      "긴 이론 본문을 HTML에 붙여넣지 않는다.",
      "다음 장 질문을 반드시 연결한다."
    ],
    terminal: [
      "read AGENTS.md",
      "open onboarding incident",
      "map client api db external queue",
      "next: why service gets slow"
    ]
  },
  "02-performance-triage": {
    title: "게시글 목록 API p95가 갑자기 증가했다",
    severity: "warning",
    situation:
      "평균 응답 시간은 크게 변하지 않았지만 p95가 180ms에서 2.8s로 증가했다.",
    impact: "사용자는 간헐적으로 목록 화면이 멈춘다고 느끼고 새로고침을 반복한다.",
    firstQuestion: "API 서버, DB, 외부 API, thread/pool 중 어디를 먼저 볼 것인가?",
    observations: [
      "평균 응답 시간만 보면 95번째 이후 느린 요청이 숨어 보이지 않는다.",
      "RPS, Avg, p95, p99, Error Rate를 함께 봐야 트래픽과 품질을 동시에 판단할 수 있다.",
      "API, DB, External API, Pool 구간별 latency를 나눠야 병목 후보를 좁힐 수 있다."
    ],
    metrics: [
      {
        label: "RPS",
        value: "120",
        unit: "req/s",
        meaning: "초당 요청 수",
        status: "normal"
      },
      {
        label: "Avg",
        value: "320",
        unit: "ms",
        meaning: "평균 응답 시간",
        status: "warning"
      },
      {
        label: "p95",
        value: "2.8",
        unit: "s",
        meaning: "느린 요청 구간",
        status: "danger"
      },
      {
        label: "p99",
        value: "4.1",
        unit: "s",
        meaning: "tail latency",
        status: "danger"
      },
      {
        label: "Error Rate",
        value: "1.8",
        unit: "%",
        meaning: "Error Rate · timeout 포함",
        status: "warning"
      },
      {
        label: "Pool Wait",
        value: "240",
        unit: "ms",
        meaning: "DB/HTTP connection 대기",
        status: "warning"
      },
      {
        label: "DB Latency",
        value: "1.6",
        unit: "s",
        meaning: "slow query 후보",
        status: "warning"
      }
    ],
    flow: [
      {
        label: "Client",
        input: "목록 새로고침",
        processing: "GET /posts",
        output: "request burst",
        risk: "RPS 증가",
        fix: "RPS와 Error Rate를 함께 확인"
      },
      {
        label: "API Server",
        input: "request",
        processing: "controller + service",
        output: "repository call",
        risk: "thread wait",
        fix: "thread wait와 handler latency 분리"
      },
      {
        label: "DB",
        input: "query",
        processing: "scan or index lookup",
        output: "rows",
        risk: "slow query",
        fix: "slow query와 execution plan 확인"
      },
      {
        label: "External",
        input: "optional call",
        processing: "HTTP wait",
        output: "response delay",
        risk: "timeout",
        fix: "timeout, retry, circuit breaker 확인"
      },
      {
        label: "Pool",
        input: "DB/HTTP connection",
        processing: "active + pending",
        output: "wait time",
        risk: "pool exhaustion",
        fix: "사용률과 대기 시간 비교"
      },
      {
        label: "Response",
        input: "aggregated result",
        processing: "serialize + return",
        output: "tail latency",
        risk: "p95/p99 증가",
        fix: "평균과 tail latency를 분리해 판단"
      }
    ],
    causes: [
      {
        name: "DB 쿼리 지연",
        metric: "DB latency",
        evidence: "DB Latency 1.6s와 p95 2.8s가 같은 시간대에 함께 증가한다.",
        priority: "P1",
        action: "slow query log와 실행 계획을 확인하고 03장 Query Lens로 넘긴다."
      },
      {
        name: "External API 대기",
        metric: "external latency",
        evidence: "일부 요청만 느릴 때 외부 호출 timeout이 tail latency를 만들 수 있다.",
        priority: "P2",
        action: "connect/read timeout, retry 횟수, fallback 여부를 확인한다."
      },
      {
        name: "Connection pool 고갈",
        metric: "Pool Wait",
        evidence: "active connection 증가와 pending wait 240ms가 함께 보인다.",
        priority: "P2",
        action: "DB/HTTP pool의 active, idle, pending을 분리해서 본다."
      },
      {
        name: "Thread pool 대기",
        metric: "thread wait",
        evidence: "blocking IO가 길면 요청 처리 thread가 묶인다.",
        priority: "P3",
        action: "thread dump와 구간별 대기 확인"
      },
      {
        name: "Traffic Burst",
        metric: "RPS",
        evidence: "RPS 120req/s로 요청량이 증가했지만 평균보다 p95/p99가 더 크게 흔들린다.",
        priority: "P3",
        action: "RPS 증가 시점과 queue/pool 대기 증가 시점을 나란히 비교한다."
      }
    ],
    decisions: [
      {
        problem: "p95가 증가했을 때 바로 서버를 증설할까?",
        options: [
          {
            label: "서버 증설",
            tradeoff: "빠른 완화책이지만 DB나 외부 연동 병목을 숨길 수 있다.",
            status: "caution"
          },
          {
            label: "구간별 latency 확인",
            tradeoff: "시간이 조금 걸리지만 다음 조사 대상을 좁힐 수 있다.",
            status: "recommended"
          },
          {
            label: "DB부터 수정",
            tradeoff: "DB가 원인일 때 효과가 있지만 외부/API 병목이면 빗나간다.",
            status: "conditional"
          },
          {
            label: "timeout/retry 확인",
            tradeoff: "외부 연동 tail을 빨리 찾을 수 있지만 retry storm 여부까지 함께 봐야 한다.",
            status: "conditional"
          }
        ],
        recommended: "먼저 흐름별 latency와 DB slow query를 확인한다.",
        tradeoff: "측정이 먼저라 즉시 해결처럼 보이지 않지만 오진 가능성을 낮춘다.",
        avoid: "평균 응답 시간만 보고 정상으로 판단"
      }
    ],
    systemMap: [
      {
        id: "client",
        label: "Client",
        detail: "사용자가 체감하는 멈춤",
        state: "active"
      },
      {
        id: "api",
        label: "API Server",
        detail: "thread wait와 service trace",
        state: "active"
      },
      {
        id: "db",
        label: "DB",
        detail: "slow query와 DB Latency 1.6s",
        state: "risk"
      },
      {
        id: "external",
        label: "External API",
        detail: "timeout/retry 후보",
        state: "risk"
      },
      {
        id: "pool",
        label: "Pool",
        detail: "Pool Wait 240ms",
        state: "risk"
      }
    ],
    specialPanels: [
      {
        type: "pool-meter",
        title: "Pool Meter",
        rows: [
          "DB active 88% · pending wait 관찰",
          "HTTP external latency는 별도 구간으로 분리",
          "pool 크기 증가는 Decision Panel에서 부작용과 함께 비교"
        ]
      }
    ],
    checklist: [
      "평균만 보고 판단하지 않는다.",
      "p95/p99를 함께 본다.",
      "RPS와 latency를 같이 본다.",
      "DB/external/pool/thread를 분리해서 본다.",
      "측정 없이 서버 증설부터 하지 않는다."
    ],
    terminal: [
      "diagnose slow service",
      "inspect rps avg p95 p99 error",
      "split api db external pool",
      "next: db query lens"
    ]
  },
  "03-db-query-and-transaction": {
    title: "특정 검색 조건에서 DB slow query가 반복된다",
    severity: "warning",
    situation:
      "게시글 목록 API가 특정 검색 조건에서 느리고 slow query log에 같은 쿼리가 반복된다.",
    impact:
      "사용자는 검색 결과를 기다리고 DB CPU와 connection 사용률이 함께 오른다.",
    firstQuestion: "이 쿼리는 어떤 조건으로 검색하고 어떤 순서로 정렬하며 몇 개의 row를 읽는가?",
    observations: [
      "rows examined와 rows returned 차이가 크면 scan 범위를 의심한다.",
      "where/order by/pagination 방식과 인덱스 순서를 함께 본다.",
      "N+1 query count와 transaction duration을 별도로 확인한다."
    ],
    metrics: [
      {
        label: "Query Time",
        value: "1.9",
        unit: "s",
        meaning: "Query Execution Time",
        status: "danger"
      },
      {
        label: "Rows Examined",
        value: "84k",
        unit: "scan",
        meaning: "rows examined",
        status: "danger"
      },
      {
        label: "Rows Returned",
        value: "20",
        unit: "rows",
        meaning: "rows returned",
        status: "normal"
      },
      {
        label: "DB Pool",
        value: "88",
        unit: "%",
        meaning: "DB Pool Usage",
        status: "warning"
      },
      {
        label: "N+1 Count",
        value: "41",
        unit: "queries",
        meaning: "N+1 Query Count",
        status: "warning"
      },
      {
        label: "Lock Wait",
        value: "120",
        unit: "ms",
        meaning: "lock wait",
        status: "warning"
      }
    ],
    flow: [
      {
        label: "Query Pattern",
        input: "status + createdAt",
        processing: "WHERE + ORDER BY",
        output: "search condition",
        risk: "index mismatch",
        fix: "복합 인덱스 순서 비교"
      },
      {
        label: "Execution Plan",
        input: "SQL",
        processing: "scan range",
        output: "rows examined",
        risk: "full scan",
        fix: "selectivity 확인"
      },
      {
        label: "N+1 Fetch",
        input: "post list",
        processing: "author/comment lookup",
        output: "41 queries",
        risk: "query count 증가",
        fix: "fetch join or batch"
      },
      {
        label: "Transaction",
        input: "write flow",
        processing: "begin → query → external → commit",
        output: "lock duration",
        risk: "long transaction",
        fix: "외부 호출 분리"
      }
    ],
    causes: [
      {
        name: "인덱스 없음 또는 순서 불일치",
        metric: "rows 84k",
        evidence: "검색 조건과 정렬 조건이 인덱스 순서와 맞지 않는다.",
        priority: "high",
        action: "Query Lens에서 조건과 index usage 비교"
      },
      {
        name: "N+1 Query",
        metric: "41 queries",
        evidence: "목록 조회 뒤 작성자/댓글 수를 반복 조회한다.",
        priority: "medium",
        action: "query count와 fetch 전략 확인"
      },
      {
        name: "장기 트랜잭션",
        metric: "lock 120ms",
        evidence: "외부 호출이 트랜잭션 안에 들어가면 lock과 connection 점유가 길어진다.",
        priority: "medium",
        action: "Transaction Timeline에서 경계 확인"
      }
    ],
    decisions: [
      {
        problem: "인덱스를 무조건 추가하면 될까?",
        options: [
          {
            label: "단일 인덱스 추가",
            tradeoff: "일부 조건은 빨라지지만 정렬과 복합 조건에는 부족할 수 있다.",
            status: "conditional"
          },
          {
            label: "복합 인덱스 설계",
            tradeoff: "조회 패턴에 잘 맞지만 쓰기 비용과 컬럼 순서 판단이 필요하다.",
            status: "recommended"
          },
          {
            label: "fetch 전략 변경",
            tradeoff: "N+1 query count를 줄일 수 있지만 join 폭증이나 중복 row를 함께 확인해야 한다.",
            status: "conditional"
          },
          {
            label: "트랜잭션 범위 조정",
            tradeoff: "lock wait와 connection 점유를 줄일 수 있지만 실패 보상 경계를 다시 설계해야 한다.",
            status: "caution"
          }
        ],
        recommended: "조회 패턴, 정렬, 선택도, 쓰기 비용을 함께 비교한다.",
        tradeoff: "인덱스는 읽기를 돕지만 쓰기 비용과 저장 공간을 늘린다.",
        avoid: "모든 컬럼에 인덱스를 붙이는 접근"
      }
    ],
    systemMap: [
      {
        id: "api",
        label: "API Server",
        detail: "검색 요청과 repository 호출",
        state: "active"
      },
      {
        id: "db",
        label: "DB",
        detail: "slow query, index, rows examined",
        state: "risk"
      },
      {
        id: "transaction",
        label: "Transaction",
        detail: "begin, lock wait, commit",
        state: "risk"
      },
      {
        id: "external",
        label: "External API",
        detail: "트랜잭션 내부 호출 위험",
        state: "ready"
      }
    ],
    specialPanels: [
      {
        type: "query-lens",
        title: "Query Lens Panel",
        items: [
          {
            label: "WHERE",
            value: "status = 'OPEN' AND created_at < cursor",
            status: "warning"
          },
          {
            label: "ORDER BY",
            value: "created_at DESC",
            status: "warning"
          },
          {
            label: "LIMIT",
            value: "20",
            status: "normal"
          },
          {
            label: "rows examined",
            value: "84,000",
            status: "danger"
          },
          {
            label: "rows returned",
            value: "20",
            status: "normal"
          },
          {
            label: "risk",
            value: "정렬 조건과 인덱스 순서 불일치",
            status: "danger"
          }
        ]
      },
      {
        type: "index-simulator",
        title: "Index Simulator",
        items: [
          {
            label: "no index",
            readEffect: "full scan으로 84,000 rows examined",
            writeCost: "낮음",
            risk: "읽기 지연과 DB CPU 증가",
            status: "danger"
          },
          {
            label: "single index",
            readEffect: "status 조건은 줄이지만 정렬 scan range가 남는다",
            writeCost: "중간",
            risk: "선택도가 낮으면 효과가 제한된다",
            status: "warning"
          },
          {
            label: "composite index",
            readEffect: "WHERE와 ORDER BY를 함께 타며 returned 20에 가까워진다",
            writeCost: "높음",
            risk: "쓰기 비용과 컬럼 순서를 함께 검토해야 한다",
            status: "recommended"
          }
        ]
      },
      {
        type: "n-plus-one",
        title: "N+1 Query Count",
        items: [
          {
            label: "posts",
            count: "1",
            detail: "목록 기준 쿼리",
            status: "normal"
          },
          {
            label: "authors",
            count: "20",
            detail: "작성자 반복 조회",
            status: "warning"
          },
          {
            label: "comments",
            count: "20",
            detail: "댓글 수 반복 조회",
            status: "warning"
          },
          {
            label: "total",
            count: "41",
            detail: "batch/fetch 전략 검토",
            status: "danger"
          }
        ]
      },
      {
        type: "transaction-timeline",
        title: "Transaction Timeline",
        items: [
          {
            label: "begin",
            detail: "DB connection과 transaction boundary가 열린다.",
            status: "normal"
          },
          {
            label: "select/update",
            detail: "조회와 수정이 같은 경계 안에서 실행된다.",
            status: "normal"
          },
          {
            label: "external call inside transaction",
            detail: "외부 응답 대기 동안 lock과 connection 점유가 길어진다.",
            status: "danger"
          },
          {
            label: "lock wait grows",
            detail: "다른 요청이 같은 row나 index range에서 대기한다.",
            status: "warning"
          },
          {
            label: "commit or rollback",
            detail: "실패 시 롤백 범위와 보상 처리를 분리해 판단한다.",
            status: "normal"
          }
        ]
      }
    ],
    checklist: [
      "rows examined와 returned 차이를 본다.",
      "WHERE와 ORDER BY를 함께 본다.",
      "인덱스는 읽기 성능과 쓰기 비용을 같이 본다.",
      "N+1 query count를 확인한다.",
      "트랜잭션 안에서 외부 API를 호출하지 않는다.",
      "lock wait와 transaction duration을 확인한다."
    ],
    terminal: [
      "open query lens",
      "compare rows_examined rows_returned",
      "simulate composite index",
      "trace transaction boundary"
    ]
  },
  "04-external-integration": {
    title: "결제 승인 API가 간헐적으로 5초 이상 지연된다",
    severity: "danger",
    situation:
      "결제 승인 API가 간헐적으로 5초 이상 지연되고, 우리 서버는 timeout 없이 응답을 기다린다.",
    impact:
      "사용자가 요청을 반복하고 retry 추가 후 외부 요청 수가 폭증해 thread와 HTTP connection pool이 고갈된다.",
    firstQuestion: "외부 서비스가 느릴 때 얼마나 기다리고, 몇 번 재시도하며, 어디서 실패를 끊을 것인가?",
    observations: [
      "timeout이 없으면 외부 API 지연이 내부 thread와 connection 점유로 전파된다.",
      "retry는 backoff와 max attempt 없이 적용하면 retry storm을 만든다.",
      "DB transaction 안에서 외부 호출을 기다리면 lock과 connection 점유 시간이 함께 길어진다."
    ],
    metrics: [
      {
        label: "External p95",
        value: "5.4",
        unit: "s",
        meaning: "결제 승인 API tail latency",
        status: "danger"
      },
      {
        label: "Timeout Count",
        value: "0",
        unit: "set",
        meaning: "timeout 미설정",
        status: "danger"
      },
      {
        label: "Retry Attempts",
        value: "3x",
        unit: "",
        meaning: "즉시 재시도",
        status: "warning"
      },
      {
        label: "Outbound Concurrency",
        value: "96",
        unit: "req",
        meaning: "동시 외부 요청",
        status: "warning"
      },
      {
        label: "HTTP Pool Pending",
        value: "42",
        unit: "wait",
        meaning: "connection 대기",
        status: "danger"
      },
      {
        label: "Circuit State",
        value: "closed",
        unit: "",
        meaning: "아직 차단 없음",
        status: "warning"
      }
    ],
    flow: [
      {
        label: "Client",
        input: "결제 버튼 반복 클릭",
        processing: "same payment intent",
        output: "duplicate pressure",
        risk: "중복 요청",
        fix: "idempotency key 확인"
      },
      {
        label: "API Server",
        input: "payment request",
        processing: "thread waits external response",
        output: "blocked worker",
        risk: "thread 점유",
        fix: "timeout budget 설정"
      },
      {
        label: "External API",
        input: "approve call",
        processing: "connect/read wait",
        output: "5s+ latency",
        risk: "tail latency 전파",
        fix: "connect/read timeout 분리"
      },
      {
        label: "Retry",
        input: "failure or slow response",
        processing: "immediate retry",
        output: "request amplification",
        risk: "retry storm",
        fix: "backoff + max attempt + idempotency"
      },
      {
        label: "Pool",
        input: "HTTP connections",
        processing: "active full + pending grows",
        output: "outbound wait",
        risk: "pool 고갈",
        fix: "동시 요청 제한과 circuit breaker"
      }
    ],
    causes: [
      {
        name: "Timeout 미설정",
        metric: "Timeout Count 0",
        evidence: "외부 p95가 5.4s인데 내부 요청이 끝까지 기다린다.",
        priority: "P1",
        action: "전체 요청 timeout budget 안에서 connect/read timeout을 나눈다."
      },
      {
        name: "Retry Storm",
        metric: "Retry Attempts 3x",
        evidence: "사용자 반복 요청과 서버 즉시 재시도가 겹쳐 외부 요청 수가 증폭된다.",
        priority: "P1",
        action: "retryable error, max attempt, backoff, idempotency key를 함께 확인한다."
      },
      {
        name: "HTTP Connection Pool 고갈",
        metric: "Pending 42",
        evidence: "active connection이 가득 차고 pending 대기가 늘어난다.",
        priority: "P2",
        action: "active, idle, pending, max를 분리해서 본다."
      },
      {
        name: "Circuit Breaker 부재",
        metric: "Circuit closed",
        evidence: "반복 실패에도 외부 호출을 계속 보내 내부 자원 보호가 되지 않는다.",
        priority: "P2",
        action: "failure threshold와 open/half-open 전환 기준을 정한다."
      },
      {
        name: "DB Transaction 내부 외부 호출",
        metric: "tx duration",
        evidence: "외부 응답을 기다리는 동안 DB connection과 lock 점유가 길어진다.",
        priority: "P3",
        action: "외부 호출을 transaction 밖으로 분리하거나 05장 비동기 흐름으로 넘긴다."
      }
    ],
    decisions: [
      {
        problem: "외부 API가 느릴 때 어떤 보호 장치를 먼저 둘까?",
        options: [
          {
            label: "timeout만 추가",
            tradeoff: "무한 대기는 끊지만 retry storm이나 fallback 기준은 남는다.",
            status: "conditional"
          },
          {
            label: "retry만 추가",
            tradeoff: "일시 실패는 완화할 수 있지만 timeout과 backoff 없이는 장애를 키운다.",
            status: "avoid"
          },
          {
            label: "timeout + retry + backoff",
            tradeoff: "외부 부하를 줄이며 재시도할 수 있지만 idempotency 조건이 필요하다.",
            status: "recommended"
          },
          {
            label: "timeout + retry + circuit breaker + 동시 요청 제한",
            tradeoff: "내부 자원을 가장 잘 보호하지만 threshold와 fallback 정책을 운영해야 한다.",
            status: "recommended"
          }
        ],
        recommended:
          "timeout budget을 먼저 정하고, retry는 backoff와 idempotency 조건에서 제한적으로 적용한다.",
        tradeoff: "빠른 실패가 사용자에게 실패로 보일 수 있으므로 fallback과 재시도 기준을 함께 설계한다.",
        avoid: "timeout 없이 retry만 늘리는 접근"
      }
    ],
    systemMap: [
      {
        id: "client",
        label: "Client",
        detail: "반복 클릭과 중복 요청",
        state: "risk"
      },
      {
        id: "api",
        label: "API Server",
        detail: "thread waits external response",
        state: "risk"
      },
      {
        id: "external",
        label: "Payment API",
        detail: "p95 5.4s",
        state: "risk"
      },
      {
        id: "pool",
        label: "HTTP Pool",
        detail: "active full, pending 42",
        state: "risk"
      },
      {
        id: "db",
        label: "DB Transaction",
        detail: "외부 호출과 결합되면 lock wait 증가",
        state: "ready"
      },
      {
        id: "circuit",
        label: "Circuit",
        detail: "closed → open → half-open",
        state: "ready"
      }
    ],
    specialPanels: [
      {
        type: "external-call-timeline",
        title: "External Call Timeline",
        items: [
          {
            label: "request start",
            detail: "API Server가 결제 승인 API를 호출한다.",
            status: "normal"
          },
          {
            label: "connect wait",
            detail: "connection 확보와 connect 대기가 시작된다.",
            status: "warning"
          },
          {
            label: "read wait",
            detail: "외부 응답 지연으로 thread와 connection이 묶인다.",
            status: "warning"
          },
          {
            label: "no timeout case",
            detail: "5초 이상 끝까지 기다리며 내부 p95와 pool pending이 증가한다.",
            status: "danger"
          },
          {
            label: "timeout case",
            detail: "timeout budget 안에서 대기를 끊고 내부 자원을 반환한다.",
            status: "recommended"
          },
          {
            label: "fallback or fail-fast",
            detail: "fallback 응답 또는 빠른 실패로 장애 전파를 제한한다.",
            status: "active"
          }
        ]
      },
      {
        type: "retry-policy",
        title: "Retry Policy Panel",
        options: [
          {
            label: "no retry",
            tradeoff: "장애 증폭은 없지만 짧은 일시 실패도 사용자 실패로 보일 수 있다.",
            status: "conditional"
          },
          {
            label: "immediate retry",
            tradeoff: "재시도 폭풍을 만들기 쉬워 외부 장애 중에는 위험하다.",
            status: "avoid"
          },
          {
            label: "exponential backoff",
            tradeoff: "외부 부하를 줄이지만 응답 시간이 길어질 수 있어 timeout budget과 함께 봐야 한다.",
            status: "recommended"
          },
          {
            label: "max attempts",
            tradeoff: "무한 재시도를 막지만 실패 후 fallback 또는 사용자 안내가 필요하다.",
            status: "recommended"
          },
          {
            label: "retryable error",
            tradeoff: "네트워크 오류와 비즈니스 실패를 구분해야 잘못된 재실행을 막는다.",
            status: "conditional"
          },
          {
            label: "idempotency key",
            tradeoff: "중복 결제 위험을 줄이지만 요청 식별과 저장소 정책이 필요하다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "pool-meter",
        title: "HTTP Connection Pool",
        items: [
          {
            label: "active",
            value: "48",
            unit: "/50",
            detail: "사용 중인 외부 connection",
            status: "danger"
          },
          {
            label: "idle",
            value: "2",
            unit: "",
            detail: "즉시 사용할 수 있는 connection",
            status: "warning"
          },
          {
            label: "pending",
            value: "42",
            unit: "wait",
            detail: "connection을 기다리는 요청",
            status: "danger"
          },
          {
            label: "max",
            value: "50",
            unit: "conn",
            detail: "pool 크기는 외부 수용량과 함께 조정",
            status: "normal"
          },
          {
            label: "risk",
            value: "pool exhausted",
            unit: "",
            detail: "pool 증설만으로는 retry storm을 막지 못한다.",
            status: "warning"
          }
        ]
      },
      {
        type: "circuit-state",
        title: "Circuit State Panel",
        items: [
          {
            label: "closed",
            value: "normal traffic",
            detail: "요청을 통과시키며 failure rate를 관찰한다.",
            status: "normal"
          },
          {
            label: "open",
            value: "fail fast",
            detail: "실패율이 threshold를 넘으면 일정 시간 호출을 차단한다.",
            status: "danger"
          },
          {
            label: "half-open",
            value: "probe",
            detail: "소수 요청으로 회복 여부를 확인한다.",
            status: "warning"
          },
          {
            label: "transition condition",
            value: "failure threshold",
            detail: "연속 실패, 실패율, open duration 기준을 명확히 둔다.",
            status: "recommended"
          },
          {
            label: "fallback behavior",
            value: "degraded response",
            detail: "대체 응답 또는 빠른 실패로 내부 자원을 보호한다.",
            status: "active"
          }
        ]
      }
    ],
    checklist: [
      "timeout을 설정했는가",
      "retry 대상과 max attempt를 제한했는가",
      "backoff가 있는가",
      "idempotency 조건을 확인했는가",
      "HTTP pool active/idle/pending을 보는가",
      "DB 트랜잭션 안에서 외부 API를 호출하지 않는가",
      "circuit breaker 상태 전환 기준이 있는가"
    ],
    terminal: [
      "diagnose external latency",
      "set timeout budget",
      "limit retry with backoff",
      "watch pool active idle pending",
      "next: async integration"
    ]
  },
  "05-async-integration": {
    title: "주문 API가 모든 후속 작업을 동기로 기다린다",
    severity: "warning",
    situation:
      "주문 생성 API에서 결제 승인, 알림 발송, 포인트 적립, CRM 연동을 모두 동기로 처리한다.",
    impact:
      "한 연동이 느려지면 전체 주문 API가 느려지고, 일부 실패 시 어떤 작업이 완료되었는지 추적하기 어렵다.",
    firstQuestion: "사용자 응답 전에 반드시 끝나야 하는 작업과 나중에 처리해도 되는 작업은 무엇인가?",
    observations: [
      "사용자 응답 시간 중 후속 작업 비중이 커지면 동기 흐름이 전체 p95를 만든다.",
      "메시징을 쓰면 요청과 후속 처리를 분리할 수 있지만 중복, 순서, 실패 추적이 남는다.",
      "outbox는 발행 요청을 남기는 패턴이지 consumer의 정확히 한 번 처리를 보장하지 않는다."
    ],
    metrics: [
      {
        label: "User Response Time",
        value: "2.4",
        unit: "s",
        meaning: "주문 API p95",
        status: "danger"
      },
      {
        label: "Follow-up Work Time",
        value: "1.8",
        unit: "s",
        meaning: "알림/포인트/CRM 처리 비중",
        status: "warning"
      },
      {
        label: "Queue Lag",
        value: "34",
        unit: "s",
        meaning: "가장 오래된 메시지 대기",
        status: "warning"
      },
      {
        label: "Consumer Throughput",
        value: "85",
        unit: "msg/m",
        meaning: "consumer 처리량",
        status: "normal"
      },
      {
        label: "DLQ Count",
        value: "7",
        unit: "msg",
        meaning: "반복 실패 메시지",
        status: "danger"
      },
      {
        label: "Outbox Pending",
        value: "24",
        unit: "rows",
        meaning: "발행 대기 이벤트",
        status: "warning"
      }
    ],
    flow: [
      {
        label: "Order API",
        input: "create order",
        processing: "payment + notification + point + CRM",
        output: "slow response",
        risk: "동기 후속 작업",
        fix: "즉시 필요/후속 가능 분리"
      },
      {
        label: "Producer",
        input: "order saved",
        processing: "publish order event",
        output: "message",
        risk: "발행 실패",
        fix: "outbox row로 추적"
      },
      {
        label: "Broker",
        input: "order event",
        processing: "queue and retry",
        output: "consumer delivery",
        risk: "queue lag",
        fix: "lag와 throughput 관찰"
      },
      {
        label: "Consumer",
        input: "message",
        processing: "point/CRM update",
        output: "side effect",
        risk: "중복 처리",
        fix: "idempotent consumer"
      },
      {
        label: "DLQ",
        input: "failed message",
        processing: "max retry exceeded",
        output: "manual review",
        risk: "운영 누락",
        fix: "replay 기준 정의"
      }
    ],
    causes: [
      {
        name: "후속 작업을 사용자 요청 안에서 모두 처리",
        metric: "Follow-up 1.8s",
        evidence: "결제 후 알림, 포인트, CRM 연동이 사용자 응답 시간을 직접 늘린다.",
        priority: "P1",
        action: "사용자 응답 전 필수 작업과 후속 가능 작업을 분리한다."
      },
      {
        name: "메시지 발행 실패 추적 부재",
        metric: "Outbox Pending",
        evidence: "DB 저장 후 메시지 발행 실패가 별도 상태로 남지 않으면 누락을 찾기 어렵다.",
        priority: "P1",
        action: "business row와 outbox event를 같은 transaction에 저장한다."
      },
      {
        name: "Consumer Idempotency 부족",
        metric: "Duplicate message",
        evidence: "같은 messageId가 두 번 전달되면 포인트가 중복 적립될 수 있다.",
        priority: "P2",
        action: "processed_messages 또는 business key로 중복 처리를 막는다."
      },
      {
        name: "Queue Lag 증가",
        metric: "Queue Lag 34s",
        evidence: "API 응답은 빨라져도 후속 처리가 밀리면 사용자는 나중에 문제를 겪는다.",
        priority: "P2",
        action: "queue depth, oldest age, consumer throughput을 함께 본다."
      },
      {
        name: "DLQ 운영 기준 없음",
        metric: "DLQ 7",
        evidence: "실패 메시지를 따로 모아도 review와 replay 기준이 없으면 복구되지 않는다.",
        priority: "P3",
        action: "retry count, reason, manual review, replay decision을 남긴다."
      }
    ],
    decisions: [
      {
        problem: "주문 후속 작업을 어떤 방식으로 분리할까?",
        options: [
          {
            label: "동기 유지",
            tradeoff: "흐름은 단순하지만 느린 연동 하나가 사용자 응답 전체를 지연시킨다.",
            status: "conditional"
          },
          {
            label: "별도 스레드",
            tradeoff: "빠르게 분리할 수 있지만 실패 추적과 재처리 기준이 없으면 누락된다.",
            status: "caution"
          },
          {
            label: "메시징",
            tradeoff: "요청과 후속 처리를 분리하지만 중복, 순서, DLQ 설계가 필요하다.",
            status: "recommended"
          },
          {
            label: "트랜잭션 아웃박스",
            tradeoff: "DB 저장과 이벤트 발행 요청을 함께 남기지만 consumer 멱등성은 별도다.",
            status: "recommended"
          },
          {
            label: "CDC",
            tradeoff: "DB 변경 로그 기반으로 연동할 수 있지만 lag와 schema change 위험이 있다.",
            status: "conditional"
          }
        ],
        recommended: "사용자 응답과 후속 작업을 분리하되, 중복 처리와 실패 추적을 함께 설계한다.",
        tradeoff: "응답은 빨라지지만 운영해야 할 메시지 상태와 재처리 흐름이 생긴다.",
        avoid: "비동기를 단순히 빠르게 만드는 기술로만 도입"
      }
    ],
    systemMap: [
      {
        id: "client",
        label: "Client",
        detail: "주문 생성 응답 대기",
        state: "active"
      },
      {
        id: "api",
        label: "Order API",
        detail: "필수 저장과 응답",
        state: "active"
      },
      {
        id: "outbox",
        label: "Outbox",
        detail: "pending/published/failed 이벤트",
        state: "risk"
      },
      {
        id: "broker",
        label: "Broker",
        detail: "queue lag 34s",
        state: "risk"
      },
      {
        id: "consumer",
        label: "Consumer",
        detail: "후속 작업과 중복 처리",
        state: "risk"
      },
      {
        id: "dlq",
        label: "DLQ",
        detail: "manual review and replay",
        state: "risk"
      }
    ],
    specialPanels: [
      {
        type: "sync-async-decision",
        title: "Sync vs Async Decision Panel",
        options: [
          {
            label: "사용자 응답 전에 필요한가",
            tradeoff: "결제 승인처럼 즉시 결과가 필요한 작업은 동기 후보로 남긴다.",
            status: "conditional"
          },
          {
            label: "실패해도 재처리 가능한가",
            tradeoff: "알림, CRM 연동처럼 나중에 재처리 가능한 작업은 비동기 후보가 된다.",
            status: "recommended"
          },
          {
            label: "순서가 중요한가",
            tradeoff: "순서가 중요하면 key 기준 처리나 single writer까지 고려해야 한다.",
            status: "warning"
          },
          {
            label: "중복 처리가 가능한가",
            tradeoff: "idempotent consumer가 없으면 at-least-once 메시징은 위험하다.",
            status: "warning"
          },
          {
            label: "즉시 결과를 보여줘야 하는가",
            tradeoff: "사용자가 바로 확인해야 하는 결과와 후속 알림을 분리한다.",
            status: "conditional"
          }
        ]
      },
      {
        type: "message-flow",
        title: "Message Flow Panel",
        items: [
          {
            label: "Producer",
            detail: "Order API가 후속 작업 이벤트를 만든다.",
            status: "normal"
          },
          {
            label: "Broker",
            detail: "메시지를 저장하고 consumer 처리량에 맞춰 전달한다.",
            status: "normal"
          },
          {
            label: "Consumer",
            detail: "알림, 포인트, CRM 연동을 별도 흐름에서 처리한다.",
            status: "active"
          },
          {
            label: "Retry",
            detail: "일시 실패는 제한된 횟수와 backoff로 다시 처리한다.",
            status: "warning"
          },
          {
            label: "DLQ",
            detail: "반복 실패 메시지는 review와 replay 대기 상태로 분리한다.",
            status: "danger"
          }
        ]
      },
      {
        type: "outbox-timeline",
        title: "Outbox Timeline",
        items: [
          {
            label: "order 저장",
            detail: "주문 상태를 DB에 저장한다.",
            status: "normal"
          },
          {
            label: "outbox event 저장",
            detail: "같은 transaction에 발행할 이벤트를 pending으로 남긴다.",
            status: "recommended"
          },
          {
            label: "relay 발행",
            detail: "별도 relay가 pending outbox row를 broker로 발행한다.",
            status: "active"
          },
          {
            label: "broker 전달",
            detail: "broker가 consumer에게 메시지를 전달한다.",
            status: "normal"
          },
          {
            label: "consumer 처리",
            detail: "후속 작업을 처리하되 중복 가능성을 고려한다.",
            status: "warning"
          },
          {
            label: "published/failed 상태 변경",
            detail: "성공/실패 상태를 남겨 재처리 기준을 만든다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "queue-lag-meter",
        title: "Queue Lag Meter",
        items: [
          {
            label: "lag",
            value: "34",
            unit: "s",
            detail: "oldest message age",
            status: "warning"
          },
          {
            label: "throughput",
            value: "85",
            unit: "msg/m",
            detail: "consumer 처리량",
            status: "normal"
          },
          {
            label: "error rate",
            value: "2.4",
            unit: "%",
            detail: "consumer 실패율",
            status: "warning"
          },
          {
            label: "consumer count",
            value: "3",
            unit: "",
            detail: "활성 consumer",
            status: "normal"
          },
          {
            label: "risk",
            value: "lag grows",
            unit: "",
            detail: "API 응답은 빨라도 후속 처리가 늦어진다.",
            status: "danger"
          }
        ]
      },
      {
        type: "dlq",
        title: "DLQ Panel",
        items: [
          {
            label: "failed message",
            value: "7",
            unit: "msg",
            detail: "반복 실패 후 분리된 메시지",
            status: "danger"
          },
          {
            label: "reason",
            value: "CRM 400",
            unit: "",
            detail: "재시도해도 성공하지 않는 비즈니스 실패",
            status: "warning"
          },
          {
            label: "retry count",
            value: "5",
            unit: "max",
            detail: "최대 재시도 이후 DLQ 이동",
            status: "warning"
          },
          {
            label: "manual review",
            value: "required",
            unit: "",
            detail: "운영자가 원인을 확인한다.",
            status: "active"
          },
          {
            label: "replay decision",
            value: "manual",
            unit: "",
            detail: "수정 후 재처리할지 폐기할지 결정한다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "duplicate-message",
        title: "Duplicate Message Scenario",
        items: [
          {
            label: "messageId A-1024 arrives",
            detail: "포인트 적립 consumer가 첫 번째 메시지를 처리한다.",
            status: "normal"
          },
          {
            label: "same messageId arrives again",
            detail: "broker 재전달 또는 consumer 재시작으로 같은 메시지가 다시 들어온다.",
            status: "warning"
          },
          {
            label: "without idempotent consumer",
            detail: "processed 기록이 없으면 포인트가 중복 적립된다.",
            status: "danger"
          },
          {
            label: "processed_messages check",
            detail: "messageId 또는 business key를 확인해 이미 처리한 메시지를 건너뛴다.",
            status: "recommended"
          },
          {
            label: "safe result",
            detail: "at-least-once 전달에서도 결과는 한 번 처리된 것과 같게 만든다.",
            status: "active"
          }
        ]
      }
    ],
    checklist: [
      "즉시 필요한 작업과 후속 작업을 분리했는가",
      "메시지 발행 실패를 추적하는가",
      "outbox 상태가 있는가",
      "consumer idempotency가 있는가",
      "queue lag와 DLQ를 관찰하는가",
      "재처리 기준이 있는가",
      "CDC는 lag와 schema change 위험을 함께 보는가"
    ],
    terminal: [
      "split sync async work",
      "persist order and outbox event",
      "relay message to broker",
      "watch queue lag dlq duplicate",
      "next: concurrency control"
    ]
  },
  "06-concurrency": {
    title: "재고 1개 상품을 두 사용자가 동시에 주문한다",
    severity: "danger",
    situation:
      "재고 1개 남은 상품을 두 사용자가 동시에 주문하고, 두 요청 모두 재고가 있다고 판단한다.",
    impact:
      "재고가 -1이 되거나 같은 쿠폰이 중복 사용되어 주문, 포인트, 쿠폰 정합성이 깨진다.",
    firstQuestion: "이 데이터는 동시에 몇 개의 실행 흐름에서 읽고 수정될 수 있는가?",
    observations: [
      "read-modify-write 흐름은 같은 값을 읽은 두 요청이 서로의 변경을 덮어쓸 수 있다.",
      "트랜잭션만으로 lost update가 항상 막히지는 않으므로 충돌 감지나 잠금 전략을 확인해야 한다.",
      "정합성을 강하게 만들수록 lock wait, deadlock, queue lag 같은 비용이 함께 생긴다."
    ],
    metrics: [
      {
        label: "Concurrent Requests",
        value: "2",
        unit: "req",
        meaning: "같은 stock row 동시 주문",
        status: "danger"
      },
      {
        label: "Lost Update Count",
        value: "3",
        unit: "cases",
        meaning: "최근 테스트 중 사라진 수정",
        status: "danger"
      },
      {
        label: "Lock Wait",
        value: "420",
        unit: "ms",
        meaning: "pessimistic lock 대기",
        status: "warning"
      },
      {
        label: "Version Conflict",
        value: "18",
        unit: "hits",
        meaning: "optimistic lock 충돌",
        status: "warning"
      },
      {
        label: "Deadlock Count",
        value: "2",
        unit: "events",
        meaning: "잠금 순서 충돌",
        status: "danger"
      },
      {
        label: "Single Writer Queue Lag",
        value: "12",
        unit: "s",
        meaning: "hot key 직렬화 대기",
        status: "warning"
      }
    ],
    flow: [
      {
        label: "User A",
        input: "order stock item",
        processing: "read stock = 1",
        output: "update stock = 0",
        risk: "A는 정상 차감으로 판단",
        fix: "version check or lock"
      },
      {
        label: "User B",
        input: "order same item",
        processing: "read stock = 1",
        output: "update stock = 0 or -1",
        risk: "B도 같은 재고를 사용",
        fix: "conflict detect"
      },
      {
        label: "DB Row",
        input: "two updates",
        processing: "last write wins or decrement twice",
        output: "conflict",
        risk: "lost update",
        fix: "optimistic/pessimistic strategy"
      },
      {
        label: "Queue Option",
        input: "stock commands",
        processing: "one worker per resource",
        output: "ordered writes",
        risk: "queue lag",
        fix: "single writer tradeoff"
      }
    ],
    causes: [
      {
        name: "Read-modify-write 경쟁",
        metric: "Concurrent 2 req",
        evidence: "User A와 B가 모두 stock = 1을 읽고 각각 주문 성공으로 진행한다.",
        priority: "P1",
        action: "Race Timeline으로 읽기와 쓰기 순서를 나란히 확인한다."
      },
      {
        name: "Lost update",
        metric: "Lost Update Count 3",
        evidence: "한쪽 업데이트가 다른 업데이트를 덮어써 실제 변경 하나가 사라진다.",
        priority: "P1",
        action: "before/final value와 expected/actual을 비교한다."
      },
      {
        name: "Optimistic conflict 처리 없음",
        metric: "Version Conflict 18",
        evidence: "version 충돌은 감지되지만 retry 또는 사용자 응답 정책이 없다.",
        priority: "P2",
        action: "where version = 1 실패 후 응답/재시도 기준을 정한다."
      },
      {
        name: "Lock wait와 deadlock 위험",
        metric: "Lock Wait 420ms",
        evidence: "비관적 락은 대기를 만들고, 잠금 순서가 엇갈리면 deadlock으로 이어진다.",
        priority: "P2",
        action: "lock 범위, timeout, 잠금 순서를 함께 본다."
      },
      {
        name: "Single writer queue lag",
        metric: "Queue Lag 12s",
        evidence: "한 worker로 직렬화하면 순서는 보호되지만 hot key 대기가 증가한다.",
        priority: "P3",
        action: "정합성 강도와 응답 지연 tradeoff를 비교한다."
      }
    ],
    decisions: [
      {
        problem: "동시 수정 가능한 재고/쿠폰 데이터를 어떻게 보호할까?",
        options: [
          {
            label: "synchronized/process lock",
            tradeoff: "단일 프로세스 안에서는 빠르지만 여러 서버나 consumer에는 적용 범위가 부족하다.",
            status: "caution"
          },
          {
            label: "optimistic lock",
            tradeoff: "대기 없이 충돌을 감지하지만 충돌 시 retry 또는 실패 응답 정책이 필요하다.",
            status: "recommended"
          },
          {
            label: "pessimistic lock",
            tradeoff: "충돌이 잦을 때 강하게 보호하지만 lock wait, timeout, deadlock 비용이 있다.",
            status: "conditional"
          },
          {
            label: "unique constraint",
            tradeoff: "중복 쿠폰 발급처럼 생성 중복은 DB가 확실히 막지만 수량 차감 전체를 대신하지는 않는다.",
            status: "conditional"
          },
          {
            label: "single writer queue",
            tradeoff: "순서와 정합성을 단순화하지만 queue lag와 처리량 한계를 관찰해야 한다.",
            status: "conditional"
          }
        ],
        recommended: "충돌 빈도, 정합성 강도, 응답 요구사항, 재시도 가능성을 기준으로 선택한다.",
        tradeoff: "정합성을 높이는 선택은 대기, 실패 응답, 운영 지표를 함께 늘린다.",
        avoid: "트랜잭션만 있으면 동시성 문제가 사라진다고 판단"
      }
    ],
    systemMap: [
      {
        id: "client-a",
        label: "User A",
        detail: "stock = 1 읽기",
        state: "active"
      },
      {
        id: "client-b",
        label: "User B",
        detail: "같은 stock = 1 읽기",
        state: "active"
      },
      {
        id: "api",
        label: "API Server",
        detail: "read-modify-write",
        state: "risk"
      },
      {
        id: "db",
        label: "DB Row",
        detail: "version, lock, unique constraint",
        state: "risk"
      },
      {
        id: "queue",
        label: "Single Writer",
        detail: "resource별 명령 직렬화",
        state: "ready"
      }
    ],
    specialPanels: [
      {
        type: "race-timeline",
        title: "Race Timeline",
        items: [
          {
            label: "User A read stock = 1",
            detail: "A 요청이 재고가 있다고 판단한다.",
            status: "warning"
          },
          {
            label: "User B read stock = 1",
            detail: "B 요청도 같은 시점의 재고를 읽는다.",
            status: "warning"
          },
          {
            label: "User A update stock = 0",
            detail: "A 주문이 성공 처리된다.",
            status: "normal"
          },
          {
            label: "User B update stock = 0 or -1",
            detail: "B도 성공 처리되면 값이 덮이거나 음수가 된다.",
            status: "danger"
          },
          {
            label: "result conflict",
            detail: "주문 성공 수와 실제 재고 변화가 맞지 않는다.",
            status: "danger"
          }
        ]
      },
      {
        type: "lost-update",
        title: "Lost Update Panel",
        items: [
          {
            label: "before value",
            value: "stock 1",
            detail: "두 요청이 같은 초기 값을 읽는다.",
            status: "warning"
          },
          {
            label: "A update",
            value: "stock 0",
            detail: "A가 차감 결과를 저장한다.",
            status: "normal"
          },
          {
            label: "B update",
            value: "stock 0",
            detail: "B가 같은 기준으로 저장해 A 변경을 덮어쓴다.",
            status: "danger"
          },
          {
            label: "final value",
            value: "stock 0",
            detail: "주문은 2건인데 재고 차감은 1건처럼 보인다.",
            status: "danger"
          },
          {
            label: "expected vs actual",
            value: "reject B or stock -1 detected",
            detail: "두 번째 요청은 충돌로 실패하거나 재시도되어야 한다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "version-conflict",
        title: "Version Conflict Panel",
        items: [
          {
            label: "version 1 read",
            value: "A/B both read",
            detail: "두 요청이 같은 version을 기준으로 시작한다.",
            status: "warning"
          },
          {
            label: "A update version 2 success",
            value: "where version = 1",
            detail: "A가 version을 2로 올리며 저장한다.",
            status: "normal"
          },
          {
            label: "B update where version 1 fails",
            value: "0 rows updated",
            detail: "B는 오래된 version이라 충돌을 감지한다.",
            status: "danger"
          },
          {
            label: "retry or user response",
            value: "retry / sold out",
            detail: "충돌 후 재조회, 재시도, 실패 응답 정책을 선택한다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "lock-wait-timeline",
        title: "Lock Wait Timeline",
        items: [
          {
            label: "transaction A lock acquire",
            detail: "A가 stock row에 대한 잠금을 먼저 잡는다.",
            status: "normal"
          },
          {
            label: "transaction B wait",
            detail: "B는 A가 commit/rollback할 때까지 기다린다.",
            status: "warning"
          },
          {
            label: "wait time grows",
            detail: "트랜잭션이 길수록 lock wait와 connection 점유가 커진다.",
            status: "danger"
          },
          {
            label: "timeout or commit",
            detail: "대기 제한을 넘거나 A가 끝난 뒤 B가 진행한다.",
            status: "warning"
          },
          {
            label: "risk of deadlock",
            detail: "여러 row를 다른 순서로 잠그면 서로 기다리는 상태가 될 수 있다.",
            status: "danger"
          }
        ]
      },
      {
        type: "single-writer-queue",
        title: "Single Writer Queue Panel",
        items: [
          {
            label: "commands enter queue",
            detail: "같은 상품/쿠폰 key에 대한 변경 명령을 queue에 넣는다.",
            status: "normal"
          },
          {
            label: "one worker processes resource",
            detail: "하나의 worker가 해당 resource 변경을 순서대로 처리한다.",
            status: "recommended"
          },
          {
            label: "queue lag grows",
            detail: "hot key 트래픽이 몰리면 대기 시간이 늘어난다.",
            status: "warning"
          },
          {
            label: "ordering is protected",
            detail: "동시에 같은 값을 수정하지 않아 순서 판단이 쉬워진다.",
            status: "normal"
          },
          {
            label: "throughput tradeoff",
            detail: "정합성은 단순해지지만 병렬 처리량은 제한된다.",
            status: "warning"
          }
        ]
      }
    ],
    checklist: [
      "동시에 수정 가능한 데이터인지 확인했는가",
      "read-modify-write 흐름을 시간축으로 봤는가",
      "트랜잭션만으로 해결된다고 오해하지 않았는가",
      "optimistic lock conflict 처리 정책이 있는가",
      "pessimistic lock의 wait/deadlock 위험을 보는가",
      "unique constraint로 중복 생성을 막는가",
      "single writer의 queue lag tradeoff를 보는가"
    ],
    terminal: [
      "trace user a user b race",
      "compare lost update values",
      "check version conflict policy",
      "watch lock wait deadlock queue lag",
      "next: io bottleneck"
    ]
  },
  "07-io-bottleneck": {
    title: "외부 API 대기로 thread가 오래 WAITING 상태에 머문다",
    severity: "warning",
    situation:
      "외부 API 응답이 느려지면서 서버 thread가 WAITING 상태로 오래 머무르고 새 요청은 queue에 쌓인다.",
    impact:
      "CPU 사용률은 낮지만 처리량은 떨어지고 p95/p99 latency가 증가해 사용자는 서비스가 멈춘 것처럼 느낀다.",
    firstQuestion: "이 작업은 CPU를 쓰고 있는가, 아니면 IO 응답을 기다리고 있는가?",
    observations: [
      "CPU Usage는 31% 수준이지만 Waiting Threads가 platform thread의 대부분을 차지한다.",
      "p95 latency와 Pending Requests가 함께 증가해 IO 대기가 요청 대기열로 번지고 있다.",
      "thread 전략을 바꾸기 전에 DB/HTTP pool, 외부 API 제한, CPU-bound 여부를 같이 확인해야 한다."
    ],
    metrics: [
      {
        label: "Active Threads",
        value: "46",
        unit: "",
        meaning: "요청 처리 중인 platform thread",
        status: "warning"
      },
      {
        label: "Waiting Threads",
        value: "118",
        unit: "",
        meaning: "외부 IO 응답 대기",
        status: "danger"
      },
      {
        label: "p95 Latency",
        value: "2.7",
        unit: "s",
        meaning: "느린 요청 구간",
        status: "danger"
      },
      {
        label: "Throughput",
        value: "390",
        unit: "rps",
        meaning: "정상 대비 38% 감소",
        status: "warning"
      },
      {
        label: "CPU Usage",
        value: "31",
        unit: "%",
        meaning: "낮지만 요청은 밀림",
        status: "normal"
      },
      {
        label: "IO Wait Ratio",
        value: "68",
        unit: "%",
        meaning: "대부분 시간이 IO 대기",
        status: "danger"
      },
      {
        label: "Pending Requests",
        value: "284",
        unit: "req",
        meaning: "thread 배정 대기",
        status: "danger"
      }
    ],
    flow: [
      {
        label: "Client",
        input: "checkout request",
        processing: "API 응답 대기",
        output: "재시도 증가",
        risk: "pending request",
        fix: "latency budget 확인"
      },
      {
        label: "API Server",
        input: "thread-per-request",
        processing: "external call blocking",
        output: "WAITING thread 증가",
        risk: "thread exhaustion",
        fix: "thread state 확인"
      },
      {
        label: "External API",
        input: "slow response",
        processing: "read wait",
        output: "p95/p99 증가",
        risk: "IO wait",
        fix: "timeout and pool 확인"
      },
      {
        label: "Virtual Thread Option",
        input: "blocking style code",
        processing: "대기 중 carrier 반환",
        output: "thread 효율 개선",
        risk: "pool limit remains",
        fix: "DB/HTTP pool 동시 확인"
      },
      {
        label: "Event Loop Option",
        input: "non-blocking IO",
        processing: "event loop handles ready events",
        output: "high concurrency",
        risk: "blocking call stalls loop",
        fix: "blocking 구간 분리"
      }
    ],
    causes: [
      {
        name: "Blocking IO 대기",
        metric: "Waiting 118 threads",
        evidence: "외부 API read wait 동안 platform thread가 요청 하나에 묶여 있다.",
        priority: "P1",
        action: "Thread State Panel에서 RUNNABLE/WAITING/BLOCKED 비율을 본다."
      },
      {
        name: "Thread pool 고갈",
        metric: "Pending 284 req",
        evidence: "CPU는 낮지만 새 요청이 thread 배정을 기다리며 queue에 쌓인다.",
        priority: "P1",
        action: "pool size만 늘리기 전에 IO-bound 여부와 외부 latency를 확인한다."
      },
      {
        name: "DB/HTTP pool 제한",
        metric: "IO Wait 68%",
        evidence: "thread 전략을 바꿔도 connection pool이나 외부 동시 요청 제한은 그대로 남는다.",
        priority: "P2",
        action: "HTTP pool pending, DB pool usage, external quota를 함께 본다."
      },
      {
        name: "Virtual thread 만능 오해",
        metric: "carrier pin risk",
        evidence: "pinning, CPU-bound 작업, 제한된 pool에서는 기대만큼 개선되지 않을 수 있다.",
        priority: "P2",
        action: "Virtual Thread Panel에서 한계와 적합 조건을 같이 확인한다."
      },
      {
        name: "Event loop blocking",
        metric: "delayed task",
        evidence: "non-blocking 구조에서도 event loop 안에 blocking call이 들어가면 전체 이벤트 처리가 밀린다.",
        priority: "P3",
        action: "Event Loop Panel에서 blocking call 위치를 분리한다."
      }
    ],
    decisions: [
      {
        problem: "IO 대기가 길 때 어떤 실행 모델을 선택할까?",
        options: [
          {
            label: "기존 blocking IO 유지",
            tradeoff: "구조는 단순하지만 동시 요청이 늘면 platform thread와 queue 대기가 커진다.",
            status: "conditional"
          },
          {
            label: "thread pool만 늘림",
            tradeoff: "일시적으로 대기를 흡수할 수 있지만 memory, context switch, pool limit 위험이 커진다.",
            status: "caution"
          },
          {
            label: "virtual thread 도입",
            tradeoff: "IO-bound에서 blocking 코드 구조를 유지하며 자원 효율을 높일 수 있지만 pool과 pinning 한계가 남는다.",
            status: "recommended"
          },
          {
            label: "non-blocking IO 도입",
            tradeoff: "매우 높은 동시성에 유리하지만 event-driven 구조와 debugging 복잡도가 커진다.",
            status: "conditional"
          }
        ],
        recommended:
          "IO 대기 비중이 높고 기존 코드 구조를 유지하고 싶다면 virtual thread를 검토하고, 매우 높은 동시성과 event-driven 구조가 필요하면 non-blocking IO를 검토한다.",
        tradeoff: "실행 모델을 바꿔도 DB/HTTP pool, 외부 API 제한, CPU-bound 병목은 별도로 관찰해야 한다.",
        avoid: "virtual thread나 non-blocking IO를 무조건 정답처럼 도입"
      }
    ],
    systemMap: [
      {
        id: "client",
        label: "Client",
        detail: "요청 재시도와 대기 증가",
        state: "active"
      },
      {
        id: "api",
        label: "API Server",
        detail: "WAITING thread 118",
        state: "risk"
      },
      {
        id: "external",
        label: "External API",
        detail: "read wait p95 2.7s",
        state: "risk"
      },
      {
        id: "pool",
        label: "HTTP/DB Pool",
        detail: "pending과 limit 확인",
        state: "risk"
      },
      {
        id: "runtime",
        label: "Runtime Strategy",
        detail: "blocking / virtual / non-blocking",
        state: "ready"
      }
    ],
    specialPanels: [
      {
        type: "thread-state",
        title: "Thread State Panel",
        items: [
          {
            label: "RUNNABLE",
            value: "46",
            detail: "실제로 CPU를 쓰거나 실행 가능한 요청이다.",
            status: "normal"
          },
          {
            label: "WAITING",
            value: "92",
            detail: "외부 API 응답을 기다리며 thread가 요청에 묶여 있다.",
            status: "danger"
          },
          {
            label: "BLOCKED",
            value: "6",
            detail: "lock이나 monitor 진입을 기다린다. IO 문제와 구분해야 한다.",
            status: "warning"
          },
          {
            label: "TIMED_WAITING",
            value: "26",
            detail: "timeout, sleep, scheduled wait 상태다. timeout budget을 확인한다.",
            status: "warning"
          },
          {
            label: "관찰 포인트",
            value: "CPU low + queue high",
            detail: "CPU가 낮아도 waiting과 pending request가 높으면 IO 병목 후보가 된다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "virtual-thread",
        title: "Virtual Thread Panel",
        items: [
          {
            label: "platform thread",
            detail: "전통적인 thread-per-request에서는 IO 대기 중에도 platform thread가 오래 묶인다.",
            status: "warning"
          },
          {
            label: "virtual thread",
            detail: "대기 중 carrier를 반환해 많은 blocking style 작업을 더 가볍게 다룰 수 있다.",
            status: "recommended"
          },
          {
            label: "blocking IO fit",
            detail: "기존 MVC/동기 코드 구조를 크게 바꾸지 않고 IO-bound 효율을 높이는 후보가 된다.",
            status: "active"
          },
          {
            label: "pinning limit",
            detail: "synchronized 구간, native call, CPU-bound 작업에서는 기대 효과가 줄어들 수 있다.",
            status: "warning"
          },
          {
            label: "pool still matters",
            detail: "DB pool, HTTP pool, 외부 API quota는 virtual thread로 자동 확장되지 않는다.",
            status: "danger"
          }
        ]
      },
      {
        type: "event-loop",
        title: "Event Loop Panel",
        items: [
          {
            label: "event loop",
            detail: "적은 thread가 준비된 IO 이벤트와 후속 작업을 빠르게 순회한다.",
            status: "normal"
          },
          {
            label: "non-blocking IO",
            detail: "응답을 기다리며 thread를 점유하지 않고 완료 이벤트로 이어간다.",
            status: "recommended"
          },
          {
            label: "pending task",
            detail: "처리 준비가 된 작업이 많아지면 loop 지연을 관찰해야 한다.",
            status: "warning"
          },
          {
            label: "blocking call inside loop",
            detail: "event loop 안에서 blocking DB/HTTP 호출을 실행하면 전체 loop가 멈춘다.",
            status: "danger"
          },
          {
            label: "selection rule",
            detail: "callback/reactive 문법보다 운영 복잡도와 blocking 구간 제거 가능성을 먼저 본다.",
            status: "active"
          }
        ]
      },
      {
        type: "io-strategy-comparison",
        title: "IO Strategy Comparison Panel",
        options: [
          {
            label: "Blocking IO",
            tradeoff: "장점: 단순하고 익숙하다. 단점: IO 대기가 많으면 thread가 묶인다. 적합: 낮은 동시성/명확한 동기 흐름. 주의: pool 대기와 timeout.",
            status: "conditional"
          },
          {
            label: "Blocking IO + Virtual Thread",
            tradeoff: "장점: 기존 코드 구조 유지와 IO 대기 효율. 단점: pinning, pool limit, CPU-bound 한계. 적합: IO-bound MVC 흐름. 주의: 외부 제한과 DB pool.",
            status: "recommended"
          },
          {
            label: "Non-blocking IO",
            tradeoff: "장점: 높은 동시성 자원 효율. 단점: 구조와 debugging 복잡도. 적합: event-driven/high concurrency. 주의: event loop blocking 금지.",
            status: "conditional"
          }
        ]
      },
      {
        type: "resource-efficiency-meter",
        title: "Resource Efficiency Meter",
        items: [
          {
            label: "thread utilization",
            value: "46",
            unit: "/164",
            detail: "실제 실행 중인 thread 대비 대기 thread가 많다.",
            status: "warning"
          },
          {
            label: "waiting ratio",
            value: "68",
            unit: "%",
            detail: "요청 시간이 IO 대기에 치우쳐 있다.",
            status: "danger"
          },
          {
            label: "request queue",
            value: "284",
            unit: "req",
            detail: "thread 배정을 기다리는 요청 수다.",
            status: "danger"
          },
          {
            label: "throughput",
            value: "390",
            unit: "rps",
            detail: "정상 대비 처리량이 떨어졌다.",
            status: "warning"
          },
          {
            label: "risk level",
            value: "high",
            unit: "",
            detail: "thread만 늘리면 다른 pool 병목으로 이동할 수 있다.",
            status: "danger"
          }
        ]
      }
    ],
    checklist: [
      "CPU가 낮다고 문제가 없는 것으로 판단하지 않는다.",
      "thread state를 확인한다.",
      "waiting thread와 request queue를 함께 본다.",
      "IO-bound인지 CPU-bound인지 구분한다.",
      "virtual thread를 만능 해결책으로 보지 않는다.",
      "event loop 안에서 blocking call을 피한다.",
      "선택 기준을 latency, throughput, 운영 복잡도와 함께 본다."
    ],
    terminal: [
      "inspect thread states waiting runnable blocked",
      "compare cpu usage with pending requests",
      "check io wait ratio and external p95",
      "evaluate blocking virtual non-blocking",
      "next: security guardrails"
    ]
  },
  "08-security": {
    title: "로그인한 사용자가 다른 사용자의 주문 상세를 조회한다",
    severity: "danger",
    situation:
      "로그인한 사용자가 URL의 orderId만 바꿔 다른 사용자의 주문 상세를 조회하고, 외부 webhook 요청은 위변조 검증 없이 처리된다.",
    impact:
      "응답 DTO에는 민감 필드가 노출되고, 사고 이후 누가 어떤 리소스에 접근했는지 audit log가 없어 추적이 어렵다.",
    firstQuestion: "이 요청은 누구의 요청이고, 무엇을 할 수 있으며, 어떤 데이터가 노출되어도 되는가?",
    observations: [
      "인증은 성공했지만 resource owner 검증이 없어 타인 주문 접근이 가능하다.",
      "webhook payload에 HMAC 검증과 replay 방지가 없어 위변조 요청을 구분하지 못한다.",
      "DTO와 audit log 설계가 없으면 민감 정보 노출과 사고 추적 실패가 동시에 발생한다."
    ],
    metrics: [
      {
        label: "Unauthorized Attempts",
        value: "37",
        unit: "req",
        meaning: "권한 없는 리소스 접근 시도",
        status: "danger"
      },
      {
        label: "Failed HMAC Checks",
        value: "12",
        unit: "hits",
        meaning: "signature 불일치 또는 replay 의심",
        status: "danger"
      },
      {
        label: "Sensitive Field Exposure",
        value: "5",
        unit: "fields",
        meaning: "응답 DTO에 남은 민감 필드",
        status: "danger"
      },
      {
        label: "Audit Coverage",
        value: "42",
        unit: "%",
        meaning: "중요 행위 audit 기록 비율",
        status: "warning"
      },
      {
        label: "Abnormal Access Count",
        value: "18",
        unit: "patterns",
        meaning: "짧은 시간 반복 실패와 타인 리소스 접근",
        status: "warning"
      },
      {
        label: "Blocked Requests",
        value: "29",
        unit: "req",
        meaning: "방화벽 또는 애플리케이션 정책 차단",
        status: "normal"
      }
    ],
    flow: [
      {
        label: "Request",
        input: "GET /orders/913",
        processing: "token present",
        output: "userId resolved",
        risk: "identity only",
        fix: "authorization next"
      },
      {
        label: "Authorization",
        input: "userId and orderId",
        processing: "owner check missing",
        output: "other user data exposed",
        risk: "IDOR",
        fix: "owner and role check"
      },
      {
        label: "Webhook",
        input: "payload and signature",
        processing: "HMAC not verified",
        output: "tampered event accepted",
        risk: "forged request",
        fix: "verify signature and timestamp"
      },
      {
        label: "Response",
        input: "entity mapped directly",
        processing: "DTO leaks fields",
        output: "passwordHash/token/memo visible",
        risk: "data exposure",
        fix: "mask and hide fields"
      },
      {
        label: "Audit",
        input: "important access",
        processing: "no audit record",
        output: "incident cannot be traced",
        risk: "blind spot",
        fix: "actor/action/resource/result"
      }
    ],
    causes: [
      {
        name: "인증과 인가 혼동",
        metric: "Unauthorized 37 req",
        evidence: "로그인 여부만 확인하고 주문 소유자나 관리자 권한을 확인하지 않는다.",
        priority: "P1",
        action: "AuthN/AuthZ Split Panel에서 identity와 permission을 분리한다."
      },
      {
        name: "HMAC 검증 누락",
        metric: "Failed HMAC 12 hits",
        evidence: "외부 webhook payload의 위변조 여부와 replay 가능성을 확인하지 않는다.",
        priority: "P1",
        action: "HMAC Verification Flow에서 signature 비교와 timestamp/nonce를 본다."
      },
      {
        name: "민감 필드 DTO 노출",
        metric: "5 exposed fields",
        evidence: "Entity를 그대로 응답으로 매핑해 passwordHash, token, phone, internal memo가 노출된다.",
        priority: "P1",
        action: "Sensitive Data Exposure Panel에서 masked/hidden field를 분리한다."
      },
      {
        name: "감사 로그 누락",
        metric: "Audit Coverage 42%",
        evidence: "중요 리소스 접근과 권한 거부가 actor/action/resource/result로 남지 않는다.",
        priority: "P2",
        action: "Audit Log Timeline에 민감정보 없이 추적 가능한 필드를 남긴다."
      },
      {
        name: "과다 허용 네트워크 규칙",
        metric: "0.0.0.0/0 admin",
        evidence: "관리자 또는 내부 API가 불필요하게 넓은 source에서 접근 가능하다.",
        priority: "P2",
        action: "Firewall Rule Panel에서 allowed inbound와 internal only를 분리한다."
      }
    ],
    decisions: [
      {
        problem: "보안 검사를 요청 흐름 어디에 배치할까?",
        options: [
          {
            label: "로그인 여부만 확인",
            tradeoff: "구현은 빠르지만 타인 리소스 접근과 관리자 기능 오남용을 막지 못한다.",
            status: "danger"
          },
          {
            label: "role 기반 권한만 확인",
            tradeoff: "기능 단위 접근은 제한하지만 사용자별 리소스 소유권은 별도로 확인해야 한다.",
            status: "conditional"
          },
          {
            label: "resource owner까지 확인",
            tradeoff: "타인 데이터 접근을 막을 수 있지만 모든 리소스 조회/수정 경로에 일관되게 적용해야 한다.",
            status: "recommended"
          },
          {
            label: "HMAC 검증 추가",
            tradeoff: "webhook 위변조를 줄이지만 secret 관리, timestamp, nonce 정책이 필요하다.",
            status: "recommended"
          },
          {
            label: "audit log 추가",
            tradeoff: "추적 가능성이 생기지만 민감정보를 로그에 남기지 않는 설계가 필요하다.",
            status: "recommended"
          },
          {
            label: "DTO 분리와 masking 적용",
            tradeoff: "노출을 줄일 수 있지만 응답 모델과 내부 entity 경계를 유지해야 한다.",
            status: "recommended"
          }
        ],
        recommended:
          "인증, 인가, 요청 검증, 감사 로그, 데이터 노출 최소화를 요청 흐름 전체에서 함께 설계한다.",
        tradeoff: "보안 단계가 늘수록 구현과 운영 기준은 늘어나지만 사고 추적과 피해 범위를 줄일 수 있다.",
        avoid: "로그인 기능 하나로 보안이 끝났다고 판단"
      }
    ],
    systemMap: [
      {
        id: "client",
        label: "Client",
        detail: "token and resource id",
        state: "active"
      },
      {
        id: "authn",
        label: "Authentication",
        detail: "user identity resolved",
        state: "ready"
      },
      {
        id: "authz",
        label: "Authorization",
        detail: "owner check missing",
        state: "risk"
      },
      {
        id: "webhook",
        label: "Webhook",
        detail: "HMAC and replay check",
        state: "risk"
      },
      {
        id: "response",
        label: "Response DTO",
        detail: "mask and hide sensitive fields",
        state: "risk"
      },
      {
        id: "audit",
        label: "Audit Log",
        detail: "actor/action/resource/result",
        state: "risk"
      }
    ],
    specialPanels: [
      {
        type: "security-flow",
        title: "Security Flow Panel",
        items: [
          {
            label: "Request",
            detail: "목적: 요청 진입점 확인. 위험: source와 payload 신뢰 오판. 관찰: method, path, source. 대응: rate limit과 validation 시작.",
            status: "normal"
          },
          {
            label: "Authentication",
            detail: "목적: 누구인지 확인. 위험: 만료/위조 token 허용. 관찰: token/session 결과. 대응: 서명, 만료, issuer 검증.",
            status: "active"
          },
          {
            label: "Authorization",
            detail: "목적: 무엇을 할 수 있는지 판단. 위험: 타인 리소스 접근. 관찰: role, ownerId, permission. 대응: owner와 role 동시 확인.",
            status: "danger"
          },
          {
            label: "Input Validation",
            detail: "목적: 요청 값 검증. 위험: injection, malformed payload. 관찰: validation error. 대응: allowlist와 schema 검증.",
            status: "warning"
          },
          {
            label: "Business Logic",
            detail: "목적: 중요 상태 변경. 위험: 권한 없는 작업 수행. 관찰: action/result. 대응: 도메인 규칙과 재검증.",
            status: "warning"
          },
          {
            label: "Audit Log",
            detail: "목적: 추적 가능성 확보. 위험: 사고 원인 추적 불가. 관찰: actor/action/resource/result. 대응: 민감정보 없이 기록.",
            status: "recommended"
          },
          {
            label: "Response Masking",
            detail: "목적: 노출 최소화. 위험: DTO 민감 필드 노출. 관찰: response schema. 대응: masking, hidden field, DTO 분리.",
            status: "recommended"
          }
        ]
      },
      {
        type: "authn-authz-split",
        title: "AuthN/AuthZ Split Panel",
        options: [
          {
            label: "Authentication: 누구인가",
            tradeoff: "userId, session, token을 확인한다. 로그인 성공은 사용자를 식별했다는 뜻이지 리소스 접근 허용은 아니다.",
            status: "active"
          },
          {
            label: "Authorization: 무엇을 할 수 있는가",
            tradeoff: "기능 권한, role, permission을 확인한다. 관리자 기능과 일반 사용자 기능을 분리한다.",
            status: "recommended"
          },
          {
            label: "Resource Owner 검증",
            tradeoff: "order.ownerId와 request.userId를 비교한다. role이 맞아도 타인 데이터 접근은 거부해야 할 수 있다.",
            status: "danger"
          },
          {
            label: "Role 기반 권한",
            tradeoff: "admin, manager, user 같은 역할로 기능 접근을 제어하지만 객체 소유권 검증을 대체하지 않는다.",
            status: "conditional"
          }
        ]
      },
      {
        type: "hmac-verification-flow",
        title: "HMAC Verification Flow",
        items: [
          {
            label: "payload 수신",
            detail: "외부 webhook body와 header signature를 받는다.",
            status: "normal"
          },
          {
            label: "canonical string 생성",
            detail: "method, path, timestamp, body를 정해진 순서로 묶는다.",
            status: "active"
          },
          {
            label: "shared secret으로 signature 계산",
            detail: "secret 원문은 화면이나 로그에 노출하지 않는다.",
            status: "warning"
          },
          {
            label: "전달된 signature와 비교",
            detail: "불일치하면 payload 위변조 또는 secret 오류로 본다.",
            status: "danger"
          },
          {
            label: "timestamp 또는 nonce로 replay 방지",
            detail: "오래된 요청이나 중복 nonce는 거부한다.",
            status: "recommended"
          },
          {
            label: "실패 시 reject",
            detail: "HMAC은 암호화가 아니라 위변조 검증이다. 실패 요청은 처리하지 않는다.",
            status: "danger"
          }
        ]
      },
      {
        type: "audit-log-timeline",
        title: "Audit Log Timeline",
        items: [
          {
            label: "누가",
            detail: "actor=user-42, sourceIp는 민감도에 맞춰 보관한다.",
            status: "normal"
          },
          {
            label: "언제",
            detail: "timestamp와 requestId를 남겨 서버 로그와 연결한다.",
            status: "normal"
          },
          {
            label: "어떤 리소스에",
            detail: "resource=order-913처럼 식별 가능하지만 민감 원문은 남기지 않는다.",
            status: "recommended"
          },
          {
            label: "어떤 작업을",
            detail: "action=ORDER_READ, PERMISSION_DENIED 같은 보안 의미를 남긴다.",
            status: "active"
          },
          {
            label: "어떤 결과로",
            detail: "allowed/denied/suspicious 결과와 이유를 기록한다.",
            status: "warning"
          }
        ]
      },
      {
        type: "sensitive-data-exposure",
        title: "Sensitive Data Exposure Panel",
        items: [
          {
            label: "Entity",
            value: "passwordHash",
            detail: "저장소 내부 필드는 응답 DTO에 직접 매핑하지 않는다.",
            status: "danger"
          },
          {
            label: "DTO",
            value: "phone",
            detail: "필요한 화면에서도 부분 마스킹을 기본값으로 둔다.",
            status: "warning"
          },
          {
            label: "Response",
            value: "email",
            detail: "권한과 목적에 따라 전체 노출, 마스킹, 숨김을 나눈다.",
            status: "warning"
          },
          {
            label: "Masked Field",
            value: "010-****-1234",
            detail: "사용자 확인에 필요한 최소 형태로만 보여준다.",
            status: "recommended"
          },
          {
            label: "Hidden Field",
            value: "token/internal memo",
            detail: "토큰과 내부 메모는 응답과 audit log에서 제외한다.",
            status: "danger"
          },
          {
            label: "Risk",
            value: "data leak",
            detail: "기능 성공 응답도 민감정보를 포함하면 보안 사고가 된다.",
            status: "danger"
          }
        ]
      },
      {
        type: "firewall-rule",
        title: "Firewall Rule Panel",
        options: [
          {
            label: "allowed inbound",
            tradeoff: "public API는 필요한 port만 열고 인증/인가를 애플리케이션에서 계속 수행한다.",
            status: "conditional"
          },
          {
            label: "blocked inbound",
            tradeoff: "관리자, DB, 내부 API는 외부 전체 source에서 접근하지 못하게 차단한다.",
            status: "recommended"
          },
          {
            label: "internal only",
            tradeoff: "DB와 queue는 내부 network 또는 private subnet에서만 접근하도록 제한한다.",
            status: "recommended"
          },
          {
            label: "admin only",
            tradeoff: "관리자 접근은 VPN, bastion, 허용 IP처럼 추가 경계를 둔다.",
            status: "warning"
          },
          {
            label: "outbound restriction",
            tradeoff: "외부 연동 대상과 port를 제한해 비정상 outbound 흐름을 줄인다.",
            status: "conditional"
          }
        ]
      }
    ],
    checklist: [
      "인증과 인가를 구분했는가",
      "리소스 소유자 검증이 있는가",
      "민감 정보가 응답에 노출되지 않는가",
      "HMAC을 암호화로 오해하지 않는가",
      "요청 위변조와 replay를 고려했는가",
      "감사 로그가 있는가",
      "감사 로그에 민감 정보를 그대로 남기지 않는가",
      "비정상 접근을 감지하고 제한하는가",
      "방화벽 또는 네트워크 접근 제한이 있는가",
      "secure coding 관점에서 입력 검증이 있는가"
    ],
    terminal: [
      "split authentication authorization",
      "verify owner role and permission",
      "check hmac signature timestamp nonce",
      "mask dto and write safe audit log",
      "next: server inspection"
    ]
  },
  "09-server-basics": {
    title: "API가 간헐적으로 응답하지 않지만 서버 상태를 확신할 수 없다",
    severity: "warning",
    situation:
      "API가 간헐적으로 응답하지 않고 로그 쓰기가 멈췄다. 서버에서는 디스크가 거의 가득 찼고 파일 디스크립터 제한과 cron 미실행 가능성도 보인다.",
    impact:
      "배포한 프로세스가 실제로 떠 있는지, 어떤 계정으로 실행되는지, 포트가 열려 있는지 확인하지 못하면 원인 추적이 애플리케이션 로그에서 멈춘다.",
    firstQuestion: "서버에서 지금 무엇이 실행 중이고, 어떤 리소스가 한계에 도달했는가?",
    observations: [
      "애플리케이션 로그만으로는 프로세스, 디스크, fd, cron, listening port 상태를 확인할 수 없다.",
      "디스크 사용률과 open file descriptor가 동시에 높으면 로그 쓰기와 네트워크 connection 모두 실패할 수 있다.",
      "cron, timezone, owner user, permission 차이는 로컬 코드에서는 재현되지 않는 운영 장애를 만든다."
    ],
    metrics: [
      {
        label: "Process Count",
        value: "2",
        unit: "svc",
        meaning: "동일 앱 프로세스 중복 실행 의심",
        status: "warning"
      },
      {
        label: "CPU Usage",
        value: "78",
        unit: "%",
        meaning: "최근 spike 이후 높은 상태",
        status: "warning"
      },
      {
        label: "Memory Usage",
        value: "82",
        unit: "%",
        meaning: "heap과 OS cache 확인 필요",
        status: "warning"
      },
      {
        label: "Disk Usage",
        value: "96",
        unit: "%",
        meaning: "/var/log 증가로 쓰기 실패 위험",
        status: "danger"
      },
      {
        label: "Open File Descriptors",
        value: "3960",
        unit: "/4096",
        meaning: "too many open files 직전",
        status: "danger"
      },
      {
        label: "Time Drift",
        value: "142",
        unit: "s",
        meaning: "토큰 만료와 cron 시간 영향",
        status: "warning"
      },
      {
        label: "Network Listening Ports",
        value: "2",
        unit: "ports",
        meaning: "8080/8443 listen 확인",
        status: "normal"
      }
    ],
    flow: [
      {
        label: "Process",
        input: "service not responding",
        processing: "ps/top으로 PID와 상태 확인",
        output: "running or duplicated",
        risk: "wrong process",
        fix: "owner/user와 uptime 확인"
      },
      {
        label: "Disk",
        input: "log write stops",
        processing: "df -h and du -sh",
        output: "filesystem/log dir pressure",
        risk: "disk full",
        fix: "증가 위치 확인"
      },
      {
        label: "File Descriptor",
        input: "connection failures",
        processing: "lsof and ulimit -n",
        output: "open files near limit",
        risk: "too many open files",
        fix: "limit and leak source 확인"
      },
      {
        label: "Cron and Time",
        input: "batch missing",
        processing: "crontab -l and timedatectl",
        output: "schedule/timezone drift",
        risk: "missed job",
        fix: "log path and environment 확인"
      },
      {
        label: "Network",
        input: "request not reaching app",
        processing: "ss -ltnp",
        output: "listening port and process",
        risk: "port mismatch",
        fix: "10장 network path로 연결"
      }
    ],
    causes: [
      {
        name: "프로세스 상태 불확실",
        metric: "Process Count 2",
        evidence: "배포 명령은 성공했지만 실제 실행 중인 PID, owner, uptime, 중복 실행 여부가 불명확하다.",
        priority: "P1",
        action: "Process Inspector Panel에서 PID, command, status, owner user를 확인한다."
      },
      {
        name: "디스크 full 위험",
        metric: "Disk Usage 96%",
        evidence: "로그 디렉터리가 커져 파일 쓰기와 배포 작업이 실패할 수 있다.",
        priority: "P1",
        action: "Disk Usage Panel에서 filesystem, available, log directory 증가를 본다."
      },
      {
        name: "파일 디스크립터 한계 근접",
        metric: "FD 3960/4096",
        evidence: "socket과 파일 핸들이 제한에 가까워져 연결 수락이나 파일 열기가 실패할 수 있다.",
        priority: "P1",
        action: "File Descriptor Limit Panel에서 current open files와 limit를 비교한다."
      },
      {
        name: "cron 미실행 또는 시간 차이",
        metric: "Time Drift 142s",
        evidence: "등록된 작업이 timezone, 환경 변수, 실행 사용자 차이로 실행되지 않을 수 있다.",
        priority: "P2",
        action: "Cron Schedule Panel에서 schedule, last expected run, log path를 확인한다."
      },
      {
        name: "listening port 확인 부족",
        metric: "2 listening ports",
        evidence: "프로세스가 떠 있어도 기대 port에 listen하지 않으면 요청은 도달하지 않는다.",
        priority: "P2",
        action: "Network Command Panel에서 local address와 process mapping을 확인한다."
      }
    ],
    decisions: [
      {
        problem: "응답하지 않는 서버를 어떤 순서로 확인할까?",
        options: [
          {
            label: "애플리케이션 로그만 확인",
            tradeoff: "가장 익숙하지만 로그 쓰기 실패, 프로세스 종료, 디스크 full이면 단서가 끊긴다.",
            status: "caution"
          },
          {
            label: "프로세스 상태 확인",
            tradeoff: "실행 여부, PID, owner, CPU/memory를 바로 볼 수 있지만 정상 listen 여부는 별도다.",
            status: "recommended"
          },
          {
            label: "디스크 사용량 확인",
            tradeoff: "쓰기 실패와 로그 증가를 찾을 수 있지만 어떤 프로세스가 만드는지는 추가 확인이 필요하다.",
            status: "recommended"
          },
          {
            label: "파일 디스크립터 확인",
            tradeoff: "connection/file 한계 문제를 찾을 수 있지만 limit 조정 전 누수와 사용처를 봐야 한다.",
            status: "recommended"
          },
          {
            label: "cron과 시간 동기화 확인",
            tradeoff: "배치 미실행과 토큰/로그 시간 문제를 찾지만 환경 변수와 실행 사용자도 같이 봐야 한다.",
            status: "conditional"
          },
          {
            label: "네트워크 listening port 확인",
            tradeoff: "요청 수신 준비 상태를 볼 수 있지만 외부 경로 문제는 10장 네트워크 관점이 필요하다.",
            status: "recommended"
          }
        ],
        recommended:
          "장애를 애플리케이션 코드 문제로만 보지 말고, process, disk, fd, time, network를 함께 확인한다.",
        tradeoff: "조회 명령으로 상태를 좁힌 뒤 변경 명령은 원인과 영향 범위를 확인하고 실행해야 한다.",
        avoid: "위험한 명령을 원인 확인 없이 먼저 실행"
      }
    ],
    systemMap: [
      {
        id: "user",
        label: "OS Account",
        detail: "app user and permission",
        state: "risk"
      },
      {
        id: "process",
        label: "Process",
        detail: "PID, uptime, owner",
        state: "risk"
      },
      {
        id: "disk",
        label: "Disk",
        detail: "/var/log 96%",
        state: "risk"
      },
      {
        id: "fd",
        label: "File Descriptor",
        detail: "3960/4096 open",
        state: "risk"
      },
      {
        id: "cron",
        label: "Cron",
        detail: "last expected run missing",
        state: "risk"
      },
      {
        id: "network",
        label: "Network Port",
        detail: "8080 listen mapping",
        state: "ready"
      }
    ],
    specialPanels: [
      {
        type: "server-command-card",
        title: "Server Command Card",
        items: [
          {
            command: "ps -ef | grep app",
            purpose: "애플리케이션 프로세스가 실제로 떠 있는지 확인한다.",
            check: "PID, command, owner user, 중복 실행 여부",
            risk: "프로세스 없음, 예상과 다른 user, 중복 실행",
            caution: "조회 명령으로만 사용하고 종료 명령은 기본 카드에 포함하지 않는다.",
            status: "recommended"
          },
          {
            command: "top",
            purpose: "CPU와 memory 사용량, load, 실행 중인 process를 본다.",
            check: "CPU spike, memory pressure, zombie/high CPU process",
            risk: "CPU/memory가 높거나 특정 process가 비정상 점유",
            caution: "실시간 화면은 순간값이므로 다른 지표와 함께 본다.",
            status: "normal"
          },
          {
            command: "df -h",
            purpose: "파일 시스템별 사용률과 남은 공간을 확인한다.",
            check: "used percent, available space, mount point",
            risk: "90% 이상 또는 available 부족",
            caution: "삭제보다 어떤 경로가 증가하는지 먼저 확인한다.",
            status: "danger"
          },
          {
            command: "du -sh /var/log/*",
            purpose: "로그 디렉터리에서 어떤 경로가 공간을 쓰는지 좁힌다.",
            check: "큰 로그 파일, 급증한 디렉터리",
            risk: "로그 폭증으로 disk full",
            caution: "삭제 가이드는 제공하지 않고 증가 원인을 먼저 본다.",
            status: "warning"
          },
          {
            command: "lsof -p <pid>",
            purpose: "프로세스가 열고 있는 파일과 socket을 확인한다.",
            check: "open file count, socket, 반복 파일",
            risk: "파일 또는 socket 누수 의심",
            caution: "출력이 많을 수 있어 대상 PID를 좁힌다.",
            status: "warning"
          },
          {
            command: "ulimit -n",
            purpose: "현재 shell 또는 process의 open file 제한을 확인한다.",
            check: "process limit과 장애 시 open files 비교",
            risk: "too many open files 직전",
            caution: "limit 상향 전 누수와 연결 수 증가 원인을 확인한다.",
            status: "danger"
          },
          {
            command: "timedatectl",
            purpose: "서버 시간, timezone, NTP 동기화 상태를 본다.",
            check: "time drift, timezone, NTP synchronized",
            risk: "토큰 만료, audit log 순서, cron 실행 시간 오류",
            caution: "시간 변경은 시스템 영향이 크므로 확인 중심으로 둔다.",
            status: "warning"
          },
          {
            command: "crontab -l",
            purpose: "현재 사용자의 cron 등록 상태를 확인한다.",
            check: "schedule expression, command, user, log redirect",
            risk: "작업 미등록, 잘못된 user, 로그 경로 없음",
            caution: "cron 환경 변수는 interactive shell과 다를 수 있다.",
            status: "normal"
          },
          {
            command: "ss -ltnp",
            purpose: "listening TCP port와 process mapping을 확인한다.",
            check: "local address, port, process name, PID",
            risk: "기대 port 미 listen, 다른 process가 port 점유",
            caution: "외부 접근 경로 문제는 10장 네트워크 흐름으로 이어서 본다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "process-inspector",
        title: "Process Inspector Panel",
        items: [
          {
            label: "process id",
            value: "24831",
            detail: "현재 요청을 처리해야 할 app process PID다.",
            status: "normal"
          },
          {
            label: "command",
            value: "java -jar api.jar",
            detail: "배포한 artifact와 실행 옵션이 맞는지 본다.",
            status: "active"
          },
          {
            label: "CPU",
            value: "78%",
            detail: "최근 spike와 지속 점유를 구분한다.",
            status: "warning"
          },
          {
            label: "memory",
            value: "82%",
            detail: "heap, native memory, OS cache를 함께 의심한다.",
            status: "warning"
          },
          {
            label: "uptime",
            value: "00:17:42",
            detail: "재시작 loop 또는 최근 배포 영향을 확인한다.",
            status: "warning"
          },
          {
            label: "status",
            value: "running",
            detail: "running이어도 listen port와 로그 상태를 추가 확인한다.",
            status: "normal"
          },
          {
            label: "owner user",
            value: "app",
            detail: "root 실행이나 잘못된 user 실행을 피한다.",
            status: "recommended"
          }
        ]
      },
      {
        type: "disk-usage",
        title: "Disk Usage Panel",
        items: [
          {
            label: "filesystem",
            value: "/dev/nvme0n1p1",
            unit: "",
            detail: "애플리케이션 로그와 임시 파일이 있는 mount다.",
            status: "normal"
          },
          {
            label: "used",
            value: "96",
            unit: "%",
            detail: "쓰기 실패 위험 구간이다.",
            status: "danger"
          },
          {
            label: "available",
            value: "1.2",
            unit: "GB",
            detail: "로그 증가 속도 대비 여유가 작다.",
            status: "danger"
          },
          {
            label: "usage percent",
            value: "96",
            unit: "%",
            detail: "90% 이상이면 원인 경로를 즉시 좁힌다.",
            status: "danger"
          },
          {
            label: "log directory",
            value: "/var/log/app",
            unit: "",
            detail: "최근 30분 로그가 급증했다.",
            status: "warning"
          },
          {
            label: "risk",
            value: "write failure",
            unit: "",
            detail: "로그, 업로드, DB/임시 파일 쓰기가 실패할 수 있다.",
            status: "danger"
          }
        ]
      },
      {
        type: "file-descriptor-limit",
        title: "File Descriptor Limit Panel",
        items: [
          {
            label: "current open files",
            value: "3960",
            unit: "",
            detail: "현재 process가 열고 있는 file/socket 수다.",
            status: "danger"
          },
          {
            label: "process limit",
            value: "4096",
            unit: "",
            detail: "process 단위 open file 제한이다.",
            status: "danger"
          },
          {
            label: "system limit",
            value: "1048576",
            unit: "",
            detail: "system 전체 한계와 process 한계를 구분한다.",
            status: "normal"
          },
          {
            label: "symptom",
            value: "too many open files",
            unit: "",
            detail: "새 connection, file open, log write가 실패할 수 있다.",
            status: "danger"
          },
          {
            label: "check command",
            value: "lsof / ulimit -n",
            unit: "",
            detail: "사용량과 제한을 함께 본다.",
            status: "recommended"
          },
          {
            label: "risk",
            value: "socket leak",
            unit: "",
            detail: "네트워크 connection 증가와 함께 추적한다.",
            status: "warning"
          }
        ]
      },
      {
        type: "cron-schedule",
        title: "Cron Schedule Panel",
        items: [
          {
            label: "schedule expression",
            detail: "*/5 * * * * cleanup.sh",
            status: "normal"
          },
          {
            label: "command",
            detail: "/opt/app/bin/cleanup.sh >> /var/log/app/cleanup.log",
            status: "normal"
          },
          {
            label: "last expected run",
            detail: "15:50 KST 실행 흔적이 없다.",
            status: "warning"
          },
          {
            label: "log path",
            detail: "/var/log/app/cleanup.log가 disk full로 기록되지 않는다.",
            status: "danger"
          },
          {
            label: "failure signal",
            detail: "timezone, 실행 user, 환경 변수, 권한 차이를 함께 본다.",
            status: "danger"
          }
        ]
      },
      {
        type: "network-command",
        title: "Network Command Panel",
        items: [
          {
            label: "listening ports",
            detail: "8080, 8443이 실제로 listen 중인지 확인한다.",
            status: "normal"
          },
          {
            label: "established connections",
            detail: "외부 API, DB, client connection 수가 비정상적으로 많은지 본다.",
            status: "warning"
          },
          {
            label: "local address",
            detail: "0.0.0.0, 127.0.0.1, private IP bind 차이를 확인한다.",
            status: "active"
          },
          {
            label: "remote address",
            detail: "어떤 source와 연결되어 있는지 확인한다.",
            status: "normal"
          },
          {
            label: "process mapping",
            detail: "port를 점유한 process와 PID가 기대한 app인지 본다.",
            status: "recommended"
          },
          {
            label: "risk",
            detail: "listen은 정상이어도 route, NAT, firewall 문제는 10장에서 이어서 본다.",
            status: "warning"
          }
        ]
      }
    ],
    checklist: [
      "실행 중인 프로세스를 확인했는가",
      "프로세스 소유자와 권한을 확인했는가",
      "디스크 용량과 로그 증가를 확인했는가",
      "파일 디스크립터 제한을 확인했는가",
      "서버 시간이 맞는지 확인했는가",
      "cron 작업이 등록되어 있는지 확인했는가",
      "listening port와 연결 상태를 확인했는가",
      "destructive command를 함부로 실행하지 않는가"
    ],
    terminal: [
      "inspect process owner pid uptime",
      "check disk usage and log growth",
      "compare open files with ulimit",
      "verify cron time and listening ports",
      "next: network path"
    ]
  }
};
