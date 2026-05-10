# Chapter Data Spec

## 목적

Phase 2 이후 `chapters.js`에서 사용할 장 데이터 구조를 정의한다.

## 기본 구조

```js
{
  id: "02-performance-triage",
  order: "02",
  title: "느려진 서비스, 어디부터 봐야 할까",
  subtitle: "처리량과 응답 시간으로 병목 후보를 좁히기",
  category: "Performance",
  status: "planned",
  incident: {
    title: "게시글 목록 API가 갑자기 느려졌다",
    description: "p95 응답 시간이 180ms에서 2.8s로 증가했다.",
    symptoms: ["p95 증가", "DB connection 사용률 증가", "일부 요청 timeout"],
    userImpact: "사용자는 목록 화면이 늦게 뜨거나 새로고침을 반복한다."
  },
  metrics: [
    { label: "RPS", value: "120", meaning: "초당 요청 수", status: "normal" },
    { label: "Avg Latency", value: "320ms", meaning: "평균 응답 시간", status: "warning" },
    { label: "p95", value: "2.8s", meaning: "느린 요청 구간 확인", status: "danger" }
  ],
  flow: [
    { step: 1, label: "Client", input: "click", processing: "GET /posts", output: "request", risk: "burst traffic", fix: "rate observation" },
    { step: 2, label: "API Server", input: "request", processing: "Service call", output: "repository call", risk: "thread wait", fix: "trace timing" },
    { step: 3, label: "DB", input: "query", processing: "scan or index lookup", output: "rows", risk: "full scan", fix: "execution plan" }
  ],
  conceptIds: ["throughput", "response-time", "p95-p99", "bottleneck"],
  decisions: [
    {
      problem: "응답 시간이 느리다",
      options: ["서버 증설", "DB 확인", "외부 API 확인", "로그와 지표 확인"],
      recommended: "로그와 지표로 병목 후보를 먼저 좁힌다.",
      tradeoff: "증설은 빠른 완화책이지만 원인을 숨길 수 있다."
    }
  ],
  links: {
    concept: "docs/concepts/performance.md",
    scope: "docs/curriculum/chapter-scope.md"
  }
}
```

## 필수 필드

- `id`
- `order`
- `title`
- `category`
- `status`
- `incident`
- `metrics`
- `flow`
- `conceptIds`
- `decisions`

## 작성 규칙

- `incident`는 항상 있다.
- `metrics`는 장의 성격에 맞게 3~5개를 둔다.
- `flow`는 사용자의 요청이나 데이터 흐름을 따라간다.
- `decisions`는 해결책의 부작용을 포함한다.
- `conceptIds`는 `docs/concepts` 문서와 맞아야 한다.

