---
sequence: "02"
title: "느려진 서비스, 어디부터 봐야 할까"
category: "performance"
source_chapter: "Chapter 02"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Metric Card
  - Flow Explorer
  - Candidate Cause Stack
  - Decision Panel
  - Next Question
---

# 02. 느려진 서비스, 어디부터 봐야 할까

## 1. 이 시퀀스의 역할

이 시퀀스는 서비스가 느려졌을 때 감으로 수정하지 않고 처리량, 응답 시간, tail latency, 리소스 사용률을 기준으로 병목 후보를 좁히는 방법을 다룬다.

**이전 시퀀스와의 연결**  
01장에서 Visual Lab 사용법을 익혔다. 이제 실제 운영 증상인 “느려짐”을 첫 번째 문제로 다룬다.

**다음 시퀀스로 넘길 질문**  
느려짐의 원인이 DB라면 어떤 쿼리와 설계를 먼저 봐야 하는가?

**검색/데이터 별칭**  
performance, latency, throughput, triage

## 2. 시작 Incident

게시글 목록 API의 평균 응답 시간은 크게 변하지 않았지만 p95 응답 시간이 180ms에서 2.8s로 증가했다. 사용자들은 간헐적으로 화면이 멈춘다고 느끼고, 운영자는 어느 계층을 먼저 봐야 할지 모른다.

### 사용자가 처음 봐야 하는 질문

느린 것은 API 서버인가, DB인가, 외부 API인가, 아니면 특정 구간의 tail latency인가?

## 3. 세부 목차

- 처리량과 응답 시간
- 평균 응답 시간과 p95/p99의 차이
- 서버 성능 개선 기초
- 병목 후보를 좁히는 관찰 순서
- 포화와 큐잉이 사용자 경험에 미치는 영향

## 4. 관찰 지표

- RPS/TPS 변화
- 평균 응답 시간, p95, p99
- error rate
- CPU, memory, thread, connection pool 사용률
- DB query count와 query latency
- 외부 API latency
- 큐 대기 시간 또는 요청 대기열 길이

## 5. 원인 후보

- DB 쿼리 지연 또는 N+1
- 외부 API 응답 지연
- 스레드 풀 고갈
- 커넥션 풀 고갈
- 락 대기 또는 트랜잭션 장기화
- 캐시 미사용 또는 캐시 미스 급증
- 특정 사용자/조건에서만 느린 tail latency

## 6. 핵심 개념

### 처리량 Throughput

**정의**  
단위 시간 동안 시스템이 처리하는 요청 수다. 일반적으로 RPS, TPS 같은 지표로 본다.

**실무에서 중요한 이유**  
처리량이 증가할 때 응답 시간이 어떻게 변하는지 봐야 포화 지점을 찾을 수 있다.

**흔한 오해**  
처리량이 높으면 무조건 좋은 상태라고 보는 것이다. 처리량이 높아도 응답 시간이 폭증하면 이미 위험할 수 있다.

**Visual Lab 반영 방식**  
Metric Card에 현재 RPS, 이전 RPS, 목표 RPS를 표시하고 latency와 함께 비교한다.

**Codex 누락 방지 규칙**  
처리량 지표는 응답 시간 지표와 반드시 같이 보여준다.

### 응답 시간 Latency

**정의**  
요청이 들어온 뒤 응답이 완료되기까지 걸린 시간이다. 서버 내부 처리 시간, DB 시간, 외부 API 시간, 대기 시간이 포함될 수 있다.

**실무에서 중요한 이유**  
사용자가 느끼는 품질에 직접 연결된다. 특히 일부 느린 요청이 전체 만족도를 크게 떨어뜨린다.

**흔한 오해**  
평균만 보면 충분하다고 생각하는 것이다. 평균은 tail latency를 숨길 수 있다.

**Visual Lab 반영 방식**  
Latency Distribution Chart 또는 Metric Card로 avg, p95, p99를 함께 보여준다.

**Codex 누락 방지 규칙**  
평균 응답 시간만 단독으로 표시하지 않는다.

### Tail Latency

**정의**  
p95, p99처럼 느린 쪽 꼬리 구간의 응답 시간이다.

**실무에서 중요한 이유**  
일부 요청만 느려도 실제 사용자 경험은 매우 나빠질 수 있다. 장애 초기에 tail latency가 먼저 흔들리는 경우가 많다.

**흔한 오해**  
p99는 극단값이라 무시해도 된다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Incident Panel에서 “평균은 정상인데 p95가 증가” 같은 상황을 보여준다.

**Codex 누락 방지 규칙**  
p95/p99를 “고급 지표”로 숨기지 말고 핵심 관찰 지표로 배치한다.

### 병목 Bottleneck

**정의**  
전체 처리 흐름에서 가장 느리거나 가장 먼저 포화되는 지점이다.

**실무에서 중요한 이유**  
성능 개선은 병목이 아닌 곳을 고치면 효과가 작다. 정확한 병목 식별이 우선이다.

**흔한 오해**  
CPU가 낮으면 서버 문제가 아니라고 단정하는 것이다. DB, pool, lock, 외부 API가 병목일 수 있다.

**Visual Lab 반영 방식**  
Flow Explorer에서 API, DB, 외부 API, pool 단계별 지연 시간을 표시한다.

**Codex 누락 방지 규칙**  
병목 후보는 하나로 단정하지 말고 후보 스택으로 보여준다.

### 포화 Saturation

**정의**  
리소스가 한계에 가까워져 대기열이 늘고 지연이 급격히 증가하는 상태다.

**실무에서 중요한 이유**  
포화 이후에는 작은 트래픽 증가도 응답 시간 폭증으로 이어진다.

**흔한 오해**  
CPU 100%만 포화라고 생각하는 것이다. 스레드, DB connection, file descriptor도 포화될 수 있다.

**Visual Lab 반영 방식**  
Metric Card에 사용률과 대기열을 함께 보여주고 warning threshold를 표시한다.

**Codex 누락 방지 규칙**  
포화 지표는 “사용률”과 “대기 시간”을 같이 설명한다.


## 7. 실무 판단 기준

- 평균 응답 시간이 아니라 p95/p99를 먼저 확인한다
- 단일 지표로 결론 내리지 않고 흐름별 시간을 나눈다
- 사용률이 높은 리소스와 대기 시간이 증가한 리소스를 함께 본다
- 코드 수정 전에 측정 지표와 재현 조건을 정리한다
- 빠른 해결책과 근본 해결책을 분리한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Metric Card`
- `Flow Explorer`
- `Candidate Cause Stack`
- `Decision Panel`
- `Next Question`

### 권장 사용자 흐름

1. Incident Panel에서 p95 증가 상황을 보여준다
2. Metric Card에서 RPS, avg, p95, p99, error rate를 비교한다
3. Flow Explorer에서 요청 흐름별 latency를 분해한다
4. Candidate Cause Stack에서 DB/외부 API/thread/pool 후보를 정렬한다
5. Decision Panel에서 다음 조사 대상을 선택하게 한다
6. DB 병목 가능성이 높을 때 03장으로 이동한다

### UX Writer 규칙

- 제목은 개념명이 아니라 문제 상황으로 시작한다.
- 첫 문장은 사용자가 지금 겪는 증상으로 쓴다.
- 해결책은 하나만 제시하지 말고 선택지를 비교한다.
- “항상”, “무조건” 같은 표현을 피하고 조건을 함께 보여준다.
- 경고 메시지는 원인을 비난하지 말고 다음 관찰 지표를 안내한다.


## Visual Lab 공통 UX/UI 원칙

이 시퀀스는 긴 이론 본문을 화면에 그대로 넣지 않는다. 사용자는 먼저 **문제 상황**을 보고, 그 다음 **관찰 지표**, **원인 후보**, **선택지**, **흐름도**, **체크리스트** 순서로 판단해야 한다.

- 첫 화면에는 `Incident Panel`을 배치한다.
- 핵심 수치는 `Metric Card`로 짧게 보여준다.
- 원인 후보는 `Candidate Cause Stack` 또는 `Decision Panel`로 보여준다.
- 개념 설명은 접히는 `Concept Card`로 제공한다.
- 코드/명령/설정 예시는 `Codex Terminal Panel` 또는 `Code Lens Panel`로 제공한다.
- 다음 시퀀스로 넘어가는 질문은 화면 하단의 `Next Question`으로 고정한다.
- 모바일에서는 Chapter Rail보다 현재 시퀀스 제목, 진행률, 다음 액션이 먼저 보여야 한다.


## 9. 데이터 모델 힌트

사이트 데이터 파일에서 이 시퀀스는 다음 필드를 가진 객체로 표현한다.

- `sequenceId`: 02
- `metrics`: rps, avgLatency, p95, p99, errorRate, cpuUsage, dbLatency
- `flowSteps`: client, api, service, db, external, response
- `candidateCauses`: latency 증가 원인 후보 배열
- `decisionOptions`: 조사 순서 선택지 배열

## 10. 인터랙티브 시나리오 제안

- **평균은 정상인데 p95만 증가**: tail latency의 의미를 보여주고 특정 조건, 쿼리, 외부 API 구간을 의심하게 한다.
- **RPS 증가 후 급격한 지연**: 포화점과 큐잉을 시각화하고 scale out, pool 조정, DB 최적화의 차이를 보여준다.
- **DB latency만 증가**: 03장으로 자연스럽게 연결되도록 Query Lens 버튼을 제공한다.

## 11. 누락 방지 체크리스트

- [ ] 처리량과 응답 시간을 분리해서 설명했는가
- [ ] 평균, p95, p99를 함께 보여주는가
- [ ] 병목 후보를 DB로만 단정하지 않는가
- [ ] 사용률과 대기 시간을 함께 다루는가
- [ ] 03장 DB 시퀀스로 이어지는 질문이 있는가
