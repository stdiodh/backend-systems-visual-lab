window.labScenarios = {
  "01-intro": {
    title: "코드는 돌아가지만 운영 판단 기준이 없다",
    severity: "orientation",
    situation: "CRUD API를 만들 수 있게 되었지만, 장애가 발생하면 어디부터 봐야 할지 모른다.",
    impact: "기능 구현과 실무 시스템 판단 사이의 간격이 드러난다.",
    firstQuestion: "코드가 돌아간다는 사실만으로 서비스를 운영할 수 있을까?",
    observations: [
      "Visual Lab은 문제 상황에서 시작해 지표와 선택지로 이동한다.",
      "Codex는 curriculum-map만 보지 않고 sequence 문서를 함께 읽어야 한다.",
      "전체 장은 느려진 서비스에서 구조 설계까지 하나의 장애 흐름으로 이어진다."
    ],
    metrics: [
      { label: "Refs", value: "8", unit: "docs", meaning: "구현 전 참조 순서", status: "normal" },
      { label: "Scope", value: "14", unit: "seq", meaning: "01~부록 C 전체 흐름", status: "normal" },
      { label: "Mode", value: "Lab", unit: "", meaning: "문서 사이트가 아닌 판단 훈련", status: "warning" }
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
      { id: "docs", label: "Docs", detail: "AGENTS, README, curriculum, sequences", state: "active" },
      { id: "codex", label: "Codex", detail: "참조 순서와 Phase guardrail", state: "active" },
      { id: "client", label: "Client", detail: "사용자가 보는 Lab 화면", state: "active" },
      { id: "api", label: "API Server", detail: "02장 이후 성능 진단 대상", state: "ready" },
      { id: "db", label: "DB", detail: "03장 쿼리/트랜잭션 대상", state: "ready" },
      { id: "external", label: "External API", detail: "04장 이후 연동 장애 대상", state: "planned" }
    ],
    specialPanels: [
      {
        type: "reference-order",
        title: "Codex 참조 문서 순서",
        rows: [
          "AGENTS.md",
          "README.md",
          "docs/curriculum/curriculum-map.md",
          "docs/sequences/README.md",
          "구현 대상 sequence 문서",
          "docs/design/*.md",
          "docs/site/*.md"
        ]
      }
    ],
    terminal: [
      "read AGENTS.md",
      "open sequence map",
      "select 01 intro",
      "show system thinking"
    ]
  },
  "02-performance-triage": {
    title: "게시글 목록 API p95가 갑자기 증가했다",
    severity: "warning",
    situation: "평균 응답 시간은 크게 변하지 않았지만 p95가 180ms에서 2.8s로 증가했다.",
    impact: "사용자는 간헐적으로 목록 화면이 멈춘다고 느끼고 새로고침을 반복한다.",
    firstQuestion: "API 서버, DB, 외부 API, thread/pool 중 어디를 먼저 볼 것인가?",
    observations: [
      "평균 응답 시간만 보면 tail latency 문제가 숨는다.",
      "RPS, avg, p95, p99, error rate를 함께 봐야 한다.",
      "흐름별 latency를 나눠야 DB, external, pool 후보를 좁힐 수 있다."
    ],
    metrics: [
      { label: "RPS", value: "120", unit: "req/s", meaning: "초당 요청 수", status: "normal" },
      { label: "Avg", value: "320", unit: "ms", meaning: "평균 응답 시간", status: "warning" },
      { label: "p95", value: "2.8", unit: "s", meaning: "느린 요청 구간", status: "danger" },
      { label: "p99", value: "4.1", unit: "s", meaning: "tail latency", status: "danger" },
      { label: "Error", value: "1.8", unit: "%", meaning: "timeout 포함", status: "warning" }
    ],
    flow: [
      {
        label: "Client",
        input: "목록 새로고침",
        processing: "GET /posts",
        output: "request burst",
        risk: "RPS 증가",
        fix: "요청량 변화 확인"
      },
      {
        label: "API Server",
        input: "request",
        processing: "controller + service",
        output: "repository call",
        risk: "thread wait",
        fix: "구간별 trace"
      },
      {
        label: "DB",
        input: "query",
        processing: "scan or index lookup",
        output: "rows",
        risk: "slow query",
        fix: "03장 Query Lens"
      },
      {
        label: "External",
        input: "optional call",
        processing: "HTTP wait",
        output: "response delay",
        risk: "timeout",
        fix: "04장 timeout/retry"
      },
      {
        label: "Pool",
        input: "DB/HTTP connection",
        processing: "active + pending",
        output: "wait time",
        risk: "pool exhaustion",
        fix: "사용률과 대기 시간 비교"
      }
    ],
    causes: [
      {
        name: "DB 쿼리 지연",
        metric: "DB latency",
        evidence: "DB 구간 시간이 p95 증가와 함께 흔들린다.",
        priority: "high",
        action: "slow query와 실행 계획 확인"
      },
      {
        name: "External API 대기",
        metric: "external latency",
        evidence: "일부 요청만 느릴 때 외부 호출이 tail을 만들 수 있다.",
        priority: "medium",
        action: "외부 호출 timeout과 retry 여부 확인"
      },
      {
        name: "Connection pool 고갈",
        metric: "pending wait",
        evidence: "active connection 증가와 pending 대기가 함께 보인다.",
        priority: "medium",
        action: "pool active/idle/pending 분리"
      },
      {
        name: "Thread pool 대기",
        metric: "thread wait",
        evidence: "blocking IO가 길면 요청 처리 thread가 묶인다.",
        priority: "low",
        action: "thread dump와 구간별 대기 확인"
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
          }
        ],
        recommended: "먼저 흐름별 latency와 DB slow query를 확인한다.",
        tradeoff: "측정이 먼저라 즉시 해결처럼 보이지 않지만 오진 가능성을 낮춘다.",
        avoid: "평균 응답 시간만 보고 정상으로 판단"
      }
    ],
    systemMap: [
      { id: "client", label: "Client", detail: "사용자가 체감하는 멈춤", state: "active" },
      { id: "api", label: "API Server", detail: "thread wait와 service trace", state: "active" },
      { id: "db", label: "DB", detail: "query latency와 connection pool", state: "risk" },
      { id: "external", label: "External API", detail: "timeout 후보", state: "risk" },
      { id: "pool", label: "Pool", detail: "active, idle, pending 분리", state: "risk" }
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
    situation: "게시글 목록 API가 특정 조건에서 느리고 slow query log에 같은 쿼리가 반복된다.",
    impact: "사용자는 검색 결과를 기다리고 DB CPU와 connection 사용률이 함께 오른다.",
    firstQuestion: "이 쿼리는 어떤 조건으로 검색하고 어떤 순서로 정렬하며 몇 개의 row를 읽는가?",
    observations: [
      "rows examined와 rows returned 차이가 크면 scan 범위를 의심한다.",
      "where/order by/pagination 방식과 인덱스 순서를 함께 본다.",
      "N+1 query count와 transaction duration을 별도로 확인한다."
    ],
    metrics: [
      { label: "Exec", value: "1.9", unit: "s", meaning: "query execution", status: "danger" },
      { label: "Rows", value: "84k", unit: "scan", meaning: "rows examined", status: "danger" },
      { label: "Returned", value: "20", unit: "rows", meaning: "rows returned", status: "normal" },
      { label: "Pool", value: "88", unit: "%", meaning: "DB connection usage", status: "warning" },
      { label: "N+1", value: "41", unit: "queries", meaning: "목록 조회 후 반복 쿼리", status: "warning" },
      { label: "Lock", value: "120", unit: "ms", meaning: "lock wait", status: "warning" }
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
            label: "트랜잭션 범위 유지",
            tradeoff: "정합성은 단순해 보이지만 lock wait와 connection 점유가 길어진다.",
            status: "caution"
          }
        ],
        recommended: "조회 패턴, 정렬, 선택도, 쓰기 비용을 함께 비교한다.",
        tradeoff: "인덱스는 읽기를 돕지만 쓰기 비용과 저장 공간을 늘린다.",
        avoid: "모든 컬럼에 인덱스를 붙이는 접근"
      }
    ],
    systemMap: [
      { id: "api", label: "API Server", detail: "검색 요청과 repository 호출", state: "active" },
      { id: "db", label: "DB", detail: "slow query, index, rows examined", state: "risk" },
      { id: "transaction", label: "Transaction", detail: "begin, lock wait, commit", state: "risk" },
      { id: "external", label: "External API", detail: "트랜잭션 내부 호출 위험", state: "ready" }
    ],
    specialPanels: [
      {
        type: "query-lens",
        title: "Query Lens Panel",
        rows: [
          "WHERE status = 'OPEN' AND created_at < cursor",
          "ORDER BY created_at DESC LIMIT 20",
          "rows examined 84k → returned 20",
          "risk: 정렬 조건과 인덱스 순서 불일치"
        ]
      },
      {
        type: "index-simulator",
        title: "Index Simulator",
        rows: [
          "no index: full scan · write cost low · read risk high",
          "status index: selectivity 낮으면 scan range가 크다",
          "status + created_at: query pattern에 맞지만 쓰기 비용 증가"
        ]
      },
      {
        type: "n-plus-one",
        title: "N+1 Query Count",
        rows: [
          "posts 1 query",
          "authors 20 queries",
          "comments 20 queries",
          "total 41 queries → batch/fetch 전략 검토"
        ]
      },
      {
        type: "transaction-timeline",
        title: "Transaction Timeline",
        rows: [
          "begin",
          "select/update posts",
          "external call inside transaction",
          "lock wait grows",
          "commit or rollback"
        ]
      }
    ],
    terminal: [
      "open query lens",
      "compare rows_examined rows_returned",
      "simulate composite index",
      "trace transaction boundary"
    ]
  }
};
