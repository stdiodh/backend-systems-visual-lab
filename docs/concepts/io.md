# IO Concepts

### Blocking IO

분류: IO 모델

정의: IO 작업이 끝날 때까지 현재 스레드가 기다리는 방식이다.

실무에서 중요한 이유: 요청 수가 많고 IO 대기가 길면 스레드가 대기 상태로 묶일 수 있다.

흔한 오해: CPU가 바쁜 것과 IO 대기로 스레드가 묶이는 것을 구분하지 못한다.

Visual Lab 반영 방식: Thread Wait Diagram으로 대기 상태를 보여준다.

Codex 누락 방지 규칙: IO 장에서는 CPU 병목과 IO 병목을 구분한다.

### 가상 스레드

분류: Java / IO 자원 효율

정의: 플랫폼 스레드보다 가볍게 많은 동시 작업을 처리할 수 있도록 설계된 Java의 스레드 모델이다.

실무에서 중요한 이유: blocking 스타일 코드를 크게 바꾸지 않고도 IO 대기 상황의 자원 효율을 높일 수 있다.

흔한 오해: 가상 스레드가 모든 성능 문제를 해결한다고 생각한다.

Visual Lab 반영 방식: Platform Thread와 Virtual Thread 비교 패널을 만든다.

Codex 누락 방지 규칙: CPU 작업 최적화가 아니라 IO 대기 자원 효율 관점에서 설명한다.

### Non-blocking IO

분류: IO 모델

정의: IO 작업 완료를 기다리며 스레드를 묶어두지 않고 완료 이벤트를 기반으로 다음 처리를 이어가는 방식이다.

실무에서 중요한 이유: 높은 동시 연결과 IO 중심 작업에서 자원 효율을 높일 수 있다.

흔한 오해: 논블로킹이 항상 더 쉽고 더 좋은 방식이라고 생각한다.

Visual Lab 반영 방식: Event Loop Flow로 요청 등록, 완료 이벤트, 후속 처리를 보여준다.

Codex 누락 방지 규칙: 복잡도와 디버깅 난이도를 함께 표시한다.

### Backpressure

분류: IO / 흐름 제어

정의: 소비자가 처리할 수 있는 속도보다 생산자가 더 빠르게 데이터를 밀어 넣지 않도록 조절하는 방식이다.

실무에서 중요한 이유: 큐, 메모리, 연결이 무한히 쌓여 장애로 번지는 것을 막는다.

흔한 오해: 큐를 두면 자동으로 과부하가 해결된다고 생각한다.

Visual Lab 반영 방식: Producer, Buffer, Consumer 속도 차이를 흐름도로 보여준다.

Codex 누락 방지 규칙: IO와 비동기 장에서 대기열 증가와 소비 속도 한계를 함께 표현한다.

### Event Loop

분류: Non-blocking IO

정의: 적은 수의 스레드가 IO 이벤트를 받아 준비된 작업을 순서대로 처리하는 실행 모델이다.

실무에서 중요한 이유: 많은 연결을 효율적으로 다룰 수 있다.

하지만 오래 걸리는 blocking 작업이 들어오면 전체 처리가 지연될 수 있다.

흔한 오해: event loop를 쓰면 어떤 코드든 자동으로 빠르게 실행된다고 생각한다.

Visual Lab 반영 방식: Event Loop Flow에서 request registration, IO ready event, callback processing을 분리해 보여준다.

Codex 누락 방지 규칙: event loop 설명에는 blocking call을 넣었을 때의 위험을 반드시 포함한다.

### Thread Pool Exhaustion

분류: IO / 자원 고갈

정의: 요청을 처리할 스레드가 모두 대기 또는 작업 중이라 새 요청이 처리되지 못하는 상태다.

실무에서 중요한 이유: CPU가 낮아도 외부 API나 DB 대기로 스레드가 묶이면 서비스가 느려진다.

흔한 오해: 스레드 수를 크게 늘리면 항상 해결된다고 생각한다.

Visual Lab 반영 방식: Blocking Thread Wait Diagram에서 active, waiting, queued request를 함께 표시한다.

Codex 누락 방지 규칙: IO 병목 설명에는 CPU 사용률과 thread pool 상태를 분리해 보여준다.
