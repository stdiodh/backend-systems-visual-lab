# Phase Roadmap

## 원칙

한 번에 하나의 Phase만 진행한다. 이전 Phase의 산출물이 검수되지 않았으면 다음 Phase로 넘어가지 않는다.

## Phase 1. 문서 기반 구축

목표:

- 새 통합 랩 레포의 기준 문서를 만든다.
- 구현 전에 커리큘럼, 개념, 디자인, 데이터 구조, Codex 규칙을 고정한다.

금지:

- HTML/CSS/JS 작성
- 임시 사이트 생성
- 더미 카드 UI 생성

완료 기준:

- 필수 문서가 모두 존재한다.
- 모든 장과 부록이 빠짐없이 들어갔다.
- 구현 금지 사항이 `AGENTS.md`와 계획 문서에 모두 적혀 있다.

## Phase 2. Site Shell

목표:

- 정적 사이트 골격을 만든다.
- 디자인 토큰, 기본 레이아웃, 데이터 렌더링 구조를 만든다.
- 첫 화면을 Hero Section, Codex Terminal Panel, Chapter Progress Rail 조합으로 만든다.
- 평범한 다크 관리자 대시보드가 아니라 Codex 강의형 개발자 워크스페이스 느낌을 고정한다.
- 아직 모든 장의 상세 콘텐츠를 완성하지 않는다.

예상 산출물:

- `site/index.html`
- `site/styles/tokens.css`
- `site/styles/base.css`
- `site/styles/components.css`
- `site/styles/layout.css`
- `site/scripts/app.js`
- `site/scripts/chapters.js`
- `site/scripts/scenarios.js`
- `site/scripts/glossary.js`

## Phase 3. 01~03장

범위:

- 01 들어가며
- 02 성능 진단
- 03 DB 설계와 쿼리

핵심 구현:

- Lab Map
- Metric Cards
- Request Flow Explorer
- Query Path Diagram
- N+1 Timeline
- Transaction Boundary Panel

## Phase 4. 04~06장

범위:

- 04 외부 연동
- 05 비동기 연동
- 06 동시성

핵심 구현:

- Timeout/Retry/Circuit Breaker 흐름
- Outbox Flow
- Message Relay Timeline
- Lost Update Simulator
- Lock Strategy Comparison

## Phase 5. 07~09장

범위:

- 07 IO 병목
- 08 보안
- 09 서버 지식

핵심 구현:

- Blocking/Virtual Thread/Non-blocking 비교
- Security Pipeline
- HMAC Flow
- Audit Log Timeline
- Server Command Cards

## Phase 6. 10장~부록 C

범위:

- 10 네트워크
- 11 아키텍처
- 부록 A 성능 테스트
- 부록 B NoSQL
- 부록 C DB 분산 잠금

핵심 구현:

- DNS/NAT/Protocol Path
- Pattern Comparison Board
- Load Test Curve
- CAP Triangle
- DB Lock Table Flow

## Phase 7. 전체 검수와 배포 준비

목표:

- 누락 개념을 보정한다.
- 모바일과 접근성을 확인한다.
- 문서 링크와 사이트 데이터 정합성을 확인한다.
- 중앙 레포에 부록/심화 자료 링크를 추가할 준비를 한다.
