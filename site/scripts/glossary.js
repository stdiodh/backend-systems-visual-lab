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
  }
};
