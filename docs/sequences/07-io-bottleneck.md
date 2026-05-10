---
sequence: "07"
title: "IO 병목, 어떻게 해결하지"
category: "io"
source_chapter: "Chapter 07"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Thread State Panel
  - Virtual Thread Panel
  - Event Loop Panel
  - Resource Matrix
  - Decision Panel
---

# 07. IO 병목, 어떻게 해결하지

## 1. 이 시퀀스의 역할

이 시퀀스는 DB, 외부 API, 파일, 네트워크 호출처럼 기다리는 시간이 많은 작업에서 서버 자원을 효율적으로 쓰는 방법을 다룬다. blocking, virtual thread, non-blocking IO를 선택 기준 중심으로 비교한다.

**이전 시퀀스와의 연결**  
06장에서 동시성 제어를 다뤘다. 이제 동시 요청이 많을 때 thread가 IO 대기로 묶이는 문제를 본다.

**다음 시퀀스로 넘길 질문**  
성능과 안정성만으로는 충분하지 않다. 인증, 인가, 암호화, 감사 로그 같은 보안 지식은 어떻게 적용해야 하는가?

**검색/데이터 별칭**  
io, virtual-thread, non-blocking, network-io

## 2. 시작 Incident

외부 API와 DB 호출이 많은 API에서 CPU 사용률은 낮지만 thread가 모두 대기 중이다. 요청이 몰리면 새 요청이 대기하고 p95가 급격히 증가한다.

### 사용자가 처음 봐야 하는 질문

이 작업은 CPU를 쓰고 있는가, 아니면 IO 응답을 기다리고 있는가?

## 3. 세부 목차

- 네트워크 IO와 자원 효율
- 가상 스레드로 자원 효율 높이기
- 논블로킹 IO로 성능 더 높이기
- 언제 어떤 방법을 택할까

## 4. 관찰 지표

- thread active/blocked/waiting 상태
- CPU 사용률 대비 요청 대기 시간
- DB/external IO latency
- thread pool queue size
- virtual thread 수와 carrier thread 상태
- event loop blocking 여부
- context switch 또는 memory 사용량

## 5. 원인 후보

- blocking IO가 많은데 platform thread 수가 제한됨
- thread pool이 IO 대기로 고갈됨
- virtual thread로 바꿨지만 pinning 또는 blocking 구간을 이해하지 못함
- non-blocking event loop에서 blocking 작업 수행
- CPU-bound 작업을 IO 전략으로 해결하려 함
- DB connection pool이 병목인데 thread만 늘림

## 6. 핵심 개념

### Blocking IO

**정의**  
호출 결과가 올 때까지 현재 실행 흐름이 기다리는 IO 방식이다.

**실무에서 중요한 이유**  
전통적인 Spring MVC + thread-per-request 모델에서 이해하기 쉽지만 IO 대기가 많으면 thread 자원이 많이 필요하다.

**흔한 오해**  
blocking은 항상 나쁜 방식이라고 생각하는 것이다. 단순성과 충분한 자원이 있으면 적절할 수 있다.

**Visual Lab 반영 방식**  
Thread State Panel에서 waiting thread가 늘어나는 모습을 보여준다.

**Codex 누락 방지 규칙**  
blocking IO는 단점만이 아니라 단순성과 선택 조건도 함께 설명한다.

### Virtual Thread

**정의**  
가벼운 스레드로 blocking 스타일 코드를 유지하면서 대기 중 자원 효율을 높이는 방식이다.

**실무에서 중요한 이유**  
IO-bound 작업에서 기존 코드 구조를 크게 바꾸지 않고 동시성을 높일 수 있다.

**흔한 오해**  
virtual thread를 쓰면 모든 병목이 사라진다고 생각하는 것이다. DB pool, external limit, pinning 문제는 남는다.

**Visual Lab 반영 방식**  
Virtual Thread Panel에서 많은 virtual thread와 제한된 carrier thread를 구분해 보여준다.

**Codex 누락 방지 규칙**  
virtual thread 설명에는 DB connection pool과 외부 요청 제한을 함께 표시한다.

### Non-blocking IO

**정의**  
작업 완료를 기다리며 thread를 점유하지 않고 이벤트 기반으로 처리하는 방식이다.

**실무에서 중요한 이유**  
높은 동시성과 자원 효율을 얻을 수 있지만 코드 모델과 운영 난이도가 올라간다.

**흔한 오해**  
non-blocking을 쓰면 자동으로 빠른 서비스가 된다고 생각하는 것이다. event loop blocking은 치명적이다.

**Visual Lab 반영 방식**  
Event Loop Panel에서 event loop, callback/stream, blocking 금지 구간을 보여준다.

**Codex 누락 방지 규칙**  
non-blocking은 event loop blocking 위험과 함께 설명한다.

### IO-bound vs CPU-bound

**정의**  
대부분의 시간이 IO 대기인지 CPU 계산인지 구분하는 기준이다.

**실무에서 중요한 이유**  
해결책이 완전히 다르다. IO-bound는 대기 자원 효율, CPU-bound는 계산량과 병렬 처리 기준으로 접근한다.

**흔한 오해**  
느린 API는 모두 thread를 늘리면 된다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Decision Panel에서 CPU usage와 wait time을 기준으로 선택지를 나눈다.

**Codex 누락 방지 규칙**  
IO 전략 선택 전에 workload 분류를 반드시 보여준다.

### Resource Limit

**정의**  
스레드 외에도 DB connection, HTTP connection, file descriptor, 외부 API quota 같은 한계가 있다.

**실무에서 중요한 이유**  
thread만 늘리면 다른 리소스가 병목이 되어 더 큰 장애가 될 수 있다.

**흔한 오해**  
virtual thread나 non-blocking을 쓰면 pool 제한을 신경 안 써도 된다고 생각하는 것이다.

**Visual Lab 반영 방식**  
Resource Matrix에서 thread, db pool, http pool, fd limit을 함께 보여준다.

**Codex 누락 방지 규칙**  
IO 장에는 thread 수와 connection pool을 함께 표시한다.


## 7. 실무 판단 기준

- CPU-bound인지 IO-bound인지 먼저 구분한다
- 단순한 IO-bound 서비스는 virtual thread를 고려한다
- 복잡한 streaming/high concurrency 요구는 non-blocking을 검토한다
- event loop에서는 blocking 작업을 하지 않는다
- thread 전략을 바꿔도 DB/HTTP connection pool 제한을 함께 조정한다
- 측정 없이 blocking → non-blocking 전환을 목표로 잡지 않는다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Thread State Panel`
- `Virtual Thread Panel`
- `Event Loop Panel`
- `Resource Matrix`
- `Decision Panel`

### 권장 사용자 흐름

1. CPU는 낮지만 thread 대기가 많은 Incident를 보여준다
2. Thread State Panel로 blocking IO 대기를 시각화한다
3. Virtual Thread Panel에서 대기 자원 효율 개선을 보여준다
4. Event Loop Panel에서 non-blocking 모델과 위험을 보여준다
5. Resource Matrix에서 thread 외 병목을 확인한다
6. 보안 장으로 넘어가기 전 성능만으로는 충분하지 않다는 질문을 던진다

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

- `sequenceId`: 07
- `workloadType`: ioBound | cpuBound | mixed
- `threadMetrics`: active, waiting, queued, virtualThreadCount
- `resourceLimits`: dbPool, httpPool, fdLimit, externalQuota
- `strategy`: blocking | virtualThread | nonBlocking

## 10. 인터랙티브 시나리오 제안

- **thread pool 고갈**: 외부 API 대기로 platform thread가 모두 점유되는 상황을 보여준다.
- **virtual thread 전환**: thread 대기 효율은 좋아졌지만 DB pool이 병목으로 남는 상황을 보여준다.
- **event loop blocking**: non-blocking 서버에서 blocking DB 호출을 실행해 전체 event loop가 느려지는 상황을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] 네트워크 IO와 자원 효율을 다뤘는가
- [ ] virtual thread와 non-blocking IO를 우열이 아니라 선택 기준으로 비교했는가
- [ ] CPU-bound/IO-bound 구분을 포함했는가
- [ ] DB/HTTP pool과 file descriptor 같은 리소스 제한을 포함했는가
- [ ] 08장 보안으로 자연스럽게 넘어가는 질문이 있는가
