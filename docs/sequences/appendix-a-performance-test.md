---
sequence: "A"
title: "처음 해보는 성능 테스트를 위한 기본 정리"
category: "appendix-performance-test"
source_chapter: "Appendix A"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Test Plan Panel
  - Metric Card
  - Saturation Chart
  - Buckle Zone Chart
  - Scenario Builder
  - Result Interpretation Panel
---

# A. 처음 해보는 성능 테스트를 위한 기본 정리

## 1. 이 시퀀스의 역할

이 부록은 앞선 성능/DB/외부 연동/아키텍처 개선이 실제로 효과가 있는지 측정하는 성능 테스트
기본기를 정리한다.

**이전 시퀀스와의 연결**
11장에서 구조와 패턴을 선택했다. 이제 그 구조가 어느 정도 부하를 견디는지 측정한다.

**다음 시퀀스로 넘길 질문**
성능과 확장성을 고려하다 보면 RDB 외 저장소가 필요한지 판단해야 한다. NoSQL은 언제 고려해야
하는가?

**검색/데이터 별칭**
load-test, performance-test, saturation, buckle-zone

## 2. 시작 Incident

서비스 오픈 전 “동시 사용자 1,000명을 버틸 수 있나요?”라는 질문을 받았다. 하지만 어떤 테스트를
해야 하는지, 어떤 지표를 봐야 하는지, 언제 실패라고 판단해야 하는지 기준이 없다.

### 사용자가 처음 봐야 하는 질문

무엇을 검증하려는 테스트이며, 성공 기준은 어떤 지표로 정의할 것인가?

## 3. 세부 목차

- 성능 테스트 종류
- 포화점과 버클존
- 주요 측정 지표
- 성능 테스트 설계 시 고려 사항
- 성능 테스트 도구
- 성능 테스트 실행 시 주의 사항

## 4. 관찰 지표

- RPS/TPS
- avg/p95/p99 latency
- error rate
- CPU/memory 사용률
- DB/HTTP connection pool 사용률
- queue lag
- saturation point
- buckle zone 진입 여부
- 테스트 데이터 크기와 분포

## 5. 원인 후보

- 목표 없는 부하 테스트
- 평균 응답 시간만 측정
- 실제 트래픽 패턴과 다른 시나리오
- 테스트 데이터가 너무 작음
- warm-up 없이 결과 측정
- 외부 API나 캐시 상태 통제 실패
- 테스트 환경과 운영 환경 차이 무시
- 성공 기준 미정의

## 6. 핵심 개념

### 부하 테스트 Load Test

**정의**
예상되는 정상 트래픽 수준에서 시스템이 목표 성능을 만족하는지 확인하는 테스트다.

**실무에서 중요한 이유**
출시 전 목표 처리량과 응답 시간을 검증하는 기본 테스트다.

**흔한 오해**
트래픽을 많이 주는 것이 전부라고 생각하는 것이다. 목표 부하와 성공 기준이 필요하다.

**Visual Lab 반영 방식**
Test Plan Panel에서 목표 RPS, duration, scenario, success criteria를 보여준다.

**Codex 누락 방지 규칙**
성능 테스트는 목표와 성공 기준 없이 만들지 않는다.

### 스트레스 테스트 Stress Test

**정의**
정상 범위를 넘어 시스템 한계를 찾는 테스트다.

**실무에서 중요한 이유**
포화점과 장애 양상을 알면 운영 중 한계에 가까워질 때 대응할 수 있다.

**흔한 오해**
서비스를 망가뜨리는 테스트라 필요 없다고 생각하는 것이다. 안전한 환경에서 한계를 알아야 한다.

**Visual Lab 반영 방식**
Saturation Chart에서 부하 증가와 latency/error 변화를 보여준다.

**Codex 누락 방지 규칙**
스트레스 테스트는 운영 환경이 아니라 통제된 환경에서 설명한다.

### 포화점 Saturation Point

**정의**
부하 증가에 따라 응답 시간이 급격히 증가하거나 error가 늘기 시작하는 지점이다.

**실무에서 중요한 이유**
시스템 수용량과 확장 기준을 세우는 핵심이다.

**흔한 오해**
CPU 100%가 될 때만 포화라고 보는 것이다. pool, DB, queue도 포화된다.

**Visual Lab 반영 방식**
Saturation Panel에서 RPS 증가에 따른 p95와 error rate 변곡점을 표시한다.

**Codex 누락 방지 규칙**
포화점은 latency와 resource utilization을 함께 보여준다.

### 버클존 Buckle Zone

**정의**
시스템이 안정 구간을 넘어 작은 부하 증가에도 성능이 급격히 무너지는 구간이다.

**실무에서 중요한 이유**
이 구간을 알면 알림 기준과 scale-out 기준을 더 현실적으로 잡을 수 있다.

**흔한 오해**
버클존은 이론 용어라 실무와 무관하다고 생각하는 것이다.

**Visual Lab 반영 방식**
Buckle Zone Chart에서 안정 구간, 위험 구간, 붕괴 구간을 구분한다.

**Codex 누락 방지 규칙**
버클존은 시각 그래프로 설명한다.

### 테스트 시나리오

**정의**
실제 사용자의 행동을 요청 흐름으로 모델링한 것이다.

**실무에서 중요한 이유**
단일 API만 때리는 테스트는 실제 병목을 놓칠 수 있다.

**흔한 오해**
모든 API를 균등하게 호출하면 된다고 생각하는 것이다. 실제 트래픽 비율이 중요하다.

**Visual Lab 반영 방식**
Scenario Builder에서 로그인, 목록, 상세, 주문 같은 흐름을 구성한다.

**Codex 누락 방지 규칙**
성능 테스트에는 사용자 행동 비율을 포함한다.

## 7. 실무 판단 기준

- 테스트 목적을 부하/스트레스/스파이크/내구성 중 하나 이상으로 명확히 한다
- 성공 기준은 p95, error rate, 처리량, 리소스 사용률로 정의한다
- 테스트 데이터 크기와 분포를 운영과 가깝게 만든다
- warm-up, ramp-up, duration을 구분한다
- 외부 API, 캐시, DB 상태를 통제한다
- 결과는 평균이 아니라 분포와 포화 지점으로 해석한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Test Plan Panel`
- `Metric Card`
- `Saturation Chart`
- `Buckle Zone Chart`
- `Scenario Builder`
- `Result Interpretation Panel`

### 권장 사용자 흐름

1. 동시 사용자 질문 Incident를 보여준다
2. Test Plan Panel에서 목적과 성공 기준을 세운다
3. Scenario Builder로 사용자 행동 흐름을 구성한다
4. Saturation Chart로 부하 증가와 latency 변화를 보여준다
5. Buckle Zone을 표시한다
6. 결과 해석 후 NoSQL 고려 질문으로 넘긴다

### UX Writer 규칙

- 제목은 개념명이 아니라 문제 상황으로 시작한다.
- 첫 문장은 사용자가 지금 겪는 증상으로 쓴다.
- 해결책은 하나만 제시하지 말고 선택지를 비교한다.
- “항상”, “무조건” 같은 표현을 피하고 조건을 함께 보여준다.
- 경고 메시지는 원인을 비난하지 말고 다음 관찰 지표를 안내한다.

## Visual Lab 공통 UX/UI 원칙

이 시퀀스는 긴 이론 본문을 화면에 그대로 넣지 않는다. 사용자는 먼저 **문제 상황**을 보고, 그
다음 **관찰 지표**, **원인 후보**, **선택지**, **흐름도**, **체크리스트** 순서로 판단해야 한다.

- 첫 화면에는 `Incident Panel`을 배치한다.
- 핵심 수치는 `Metric Card`로 짧게 보여준다.
- 원인 후보는 `Candidate Cause Stack` 또는 `Decision Panel`로 보여준다.
- 개념 설명은 접히는 `Concept Card`로 제공한다.
- 코드/명령/설정 예시는 `Codex Terminal Panel` 또는 `Code Lens Panel`로 제공한다.
- 다음 시퀀스로 넘어가는 질문은 화면 하단의 `Next Question`으로 고정한다.
- 모바일에서는 Chapter Rail보다 현재 시퀀스 제목, 진행률, 다음 액션이 먼저 보여야 한다.

## 9. 데이터 모델 힌트

사이트 데이터 파일에서 이 시퀀스는 다음 필드를 가진 객체로 표현한다.

- `sequenceId`: appendix-a
- `testType`: load | stress | spike | endurance
- `successCriteria`: p95, errorRate, throughput 등
- `trafficProfile`: rampUp, duration, users, rps
- `resultMetrics`: latencyDistribution, saturationPoint, resourceUsage

## 10. 인터랙티브 시나리오 제안

- **목표 없는 부하 테스트**: RPS만 높였지만 성공 기준이 없어 결과를 해석하지 못하는 상황을
  보여준다.
- **포화점 탐색**: 부하 증가에 따라 p95와 error rate가 급격히 증가하는 지점을 찾는다.
- **실제와 다른 테스트 데이터**: 작은 데이터셋에서는 빠르지만 운영 크기에서는 DB 병목이 드러나는
  상황을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] 성능 테스트 종류, 포화점, 버클존, 주요 지표를 모두 다뤘는가
- [ ] 테스트 설계와 실행 주의 사항을 포함했는가
- [ ] 평균 지표만으로 해석하지 않게 했는가
- [ ] 부록 B NoSQL로 연결되는가
