# Phase 5 Release Summary

## 릴리스 이름

```text
phase-5-5
```

대안 태그 이름:

```text
v0.5.0-phase-5
```

## 포함된 범위

- 01~09장 Visual Lab ready
- 10~11장 planned
- 부록 A~C planned

## Phase 5 추가 내용

### 07. IO 병목

- Thread State Panel
- Virtual Thread Panel
- Event Loop Panel
- IO Strategy Comparison Panel
- Resource Efficiency Meter
- blocking IO, virtual thread, non-blocking IO tradeoff

### 08. 보안

- Security Flow Panel
- AuthN/AuthZ Split Panel
- HMAC Verification Flow
- Audit Log Timeline
- Sensitive Data Exposure Panel
- Firewall Rule Panel

### 09. 서버 지식

- Server Command Card
- Process Inspector Panel
- Disk Usage Panel
- File Descriptor Limit Panel
- Cron Schedule Panel
- Network Command Panel

## 검증 결과

- `node --check site/scripts/chapters.js` 통과
- `node --check site/scripts/scenarios.js` 통과
- `node --check site/scripts/glossary.js` 통과
- `node --check site/scripts/app.js` 통과
- 브라우저 smoke test 통과
- 01~09장 클릭 전환 정상
- 10장, 11장, 부록 A~C planned 상태 유지
- console error 없음

## 태그 생성 안내

실제 태그 생성과 push가 필요할 때 아래 명령을 사용한다.

```bash
git tag phase-5-5
git push origin phase-5-5
```

## 다음 단계

Phase 6 범위:

- 10장 네트워크 기초
- 11장 서버 구조와 설계 패턴
- 부록 A: 성능 테스트
- 부록 B: NoSQL
- 부록 C: DB로 분산 잠금 구현하기

Phase 6 시작 전에는 대상 `docs/sequences/*.md`, 관련 `docs/concepts/*.md`, `docs/design/component-spec.md`, `docs/site/scenario-data-spec.md`를 먼저 확인한다.
