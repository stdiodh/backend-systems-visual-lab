# Scenario Data Spec

## 목적

Phase 2 이후 `scenarios.js`에서 사용할 문제 상황 데이터 구조를 정의한다.

## 기본 구조

```js
{
  id: "slow-post-list",
  title: "게시글 목록 API가 느려졌다",
  chapterId: "02-performance-triage",
  situation: "출근 시간 이후 게시글 목록 API의 p95가 급격히 증가했다.",
  observations: [
    "RPS는 평소보다 2배 증가했다.",
    "DB connection pool 사용률이 95%에 도달했다.",
    "일부 요청에서 timeout이 발생했다."
  ],
  possibleCauses: [
    "인덱스 부재",
    "N+1 문제",
    "외부 API 대기",
    "커넥션 풀 고갈"
  ],
  nextActions: [
    "API 구간별 응답 시간을 확인한다.",
    "DB slow query와 실행 계획을 확인한다.",
    "외부 API 호출 여부와 timeout 설정을 확인한다."
  ],
  relatedConceptIds: ["bottleneck", "response-time", "index", "n-plus-one"]
}
```

## 필수 필드

- `id`
- `title`
- `chapterId`
- `situation`
- `observations`
- `possibleCauses`
- `nextActions`
- `relatedConceptIds`

## 작성 규칙

- 시나리오는 장의 문제 상황과 연결한다.
- 관찰 지표는 추측이 아니라 확인 가능한 형태로 쓴다.
- 원인 후보는 3개 이상 둔다.
- 다음 행동은 바로 실행 가능한 진단 행동으로 쓴다.
- 하나의 시나리오에 모든 개념을 억지로 넣지 않는다.

## 장별 시나리오 예시

- 02: 게시글 목록 API p95 급증
- 03: 검색 쿼리 full scan
- 04: 결제 API timeout과 retry storm
- 05: 주문 후 알림 처리 지연
- 06: 쿠폰 중복 발급
- 07: 외부 API 대기로 thread 고갈
- 08: 권한 누락으로 타인 데이터 접근
- 09: 디스크 full로 로그 쓰기 실패
- 10: NAT와 방화벽으로 외부 연동 실패
- 11: 읽기 트래픽 증가로 CQRS 검토

