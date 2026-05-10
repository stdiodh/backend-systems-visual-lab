# Content Schema

## 문서 목적

이 문서는 Phase 2 이후 사이트 구현에서 사용할 데이터 구조의 상위 규칙을 정의한다.

Phase 1에서는 실제 `site/scripts/*.js`를 만들지 않는다. 이 문서는 구현 전 스펙이다.

## 데이터 파일 예상 역할

```text
site/scripts/chapters.js   -> 장 목록과 장별 학습 콘텐츠
site/scripts/scenarios.js  -> 문제 상황과 관찰 지표
site/scripts/glossary.js   -> 개념 카드와 용어 연결
```

## Sequence Map 연결 규칙

Phase 2 이후 장 데이터는 반드시 `sequenceFile`을 가진다.

`sequenceFile`은 해당 장의 `docs/sequences/*.md` 문서를 가리킨다.

사이트 구현자는 장 데이터를 만들 때 `curriculum-map.md`만 보지 않고, 해당 sequence 문서의 Incident, 지표, 개념, 판단 기준을 함께 반영한다.

## 공통 ID 규칙

- 장 ID는 숫자와 주제를 함께 사용한다.
- 예: `02-performance-triage`
- 개념 ID는 영어 kebab-case를 사용한다.
- 예: `response-time`, `transaction-outbox`
- 부록 ID는 `appendix-a-performance-test` 형식을 사용한다.

## 공통 상태 값

```js
"planned" | "draft" | "ready" | "reviewed"
```

## 공통 금지 사항

- HTML 문자열에 긴 본문을 넣지 않는다.
- JS 데이터에 전체 강의안을 복사하지 않는다.
- 문서와 충돌하는 별도 정의를 만들지 않는다.
- 장 목록을 코드에서 임의로 생략하지 않는다.
