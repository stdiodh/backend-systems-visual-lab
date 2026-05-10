---
sequence: "08"
title: "실무에서 꼭 필요한 보안 지식"
category: "security"
source_chapter: "Chapter 08"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Security Flow Panel
  - Resource Access Panel
  - Data Exposure Panel
  - HMAC Verification Panel
  - Audit Timeline
  - Security Checklist
---

# 08. 실무에서 꼭 필요한 보안 지식

## 1. 이 시퀀스의 역할

이 시퀀스는 실무 백엔드에서 기본적으로 지켜야 할 보안 흐름을 다룬다. 인증, 인가, 암호화, HMAC,
방화벽, 감사 로그, 데이터 노출 최소화, 비정상 접근 처리, 시큐어 코딩을 요청 흐름 안에서
연결한다.

**이전 시퀀스와의 연결**
07장에서 성능과 IO 효율을 봤다. 이제 빠른 서비스가 안전하지 않으면 어떤 문제가 생기는지 다룬다.

**다음 시퀀스로 넘길 질문**
서비스를 안전하게 만들었더라도 서버에서 프로세스, 디스크, 권한, 시간, 네트워크를 확인할 줄
알아야 한다.

**검색/데이터 별칭**
security, authn, authz, hmac, audit

## 2. 시작 Incident

로그인한 사용자가 다른 사용자의 주문 상세를 조회할 수 있다. API 응답에는 내부 ID와 민감한 필드가
포함되어 있고, 누가 어떤 요청을 했는지 감사 로그가 남지 않는다.

### 사용자가 처음 봐야 하는 질문

이 요청은 누구의 요청이고, 무엇을 할 수 있으며, 어떤 데이터가 노출되어도 되는가?

## 3. 세부 목차

- 중요한 보안
- 인증과 인가
- 데이터 암호화
- HMAC을 이용한 데이터 검증
- 방화벽으로 필요한 트래픽만 허용하기
- 감사 로그(audit log) 남기기
- 데이터 노출 줄이기
- 비정상 접근 처리
- 시큐어 코딩
- 개인 보안

## 4. 관찰 지표

- 인증 성공/실패 로그
- 권한 거부 요청 수
- 민감 데이터 응답 포함 여부
- 암호화 적용 필드
- HMAC 검증 실패 수
- 허용/차단된 source IP 또는 port
- audit log 누락 여부
- 비정상 접근 패턴
- 보안 관련 error response 내용

## 5. 원인 후보

- 인증과 인가를 혼동
- 객체 소유권 검증 누락
- 민감 필드 DTO 노출
- 암호화 대상과 해싱 대상을 혼동
- HMAC 검증 누락 또는 secret 관리 부실
- 방화벽/보안 그룹 과다 허용
- 감사 로그 미수집
- 에러 메시지로 내부 정보 노출
- 입력 검증 부족

## 6. 핵심 개념

### 인증 Authentication

**정의**
요청자가 누구인지 확인하는 과정이다. 로그인, 토큰 검증 등이 포함된다.

**실무에서 중요한 이유**
모든 보호 자원 접근의 출발점이다. 인증이 부실하면 이후 권한 검사가 무의미해진다.

**흔한 오해**
로그인만 되었으면 모든 기능을 사용할 수 있다고 생각하는 것이다.

**Visual Lab 반영 방식**
Security Flow Panel에서 request → authentication → authorization 순서를 보여준다.

**Codex 누락 방지 규칙**
인증은 인가와 분리해서 표시한다.

### 인가 Authorization

**정의**
인증된 사용자가 특정 리소스나 기능에 접근할 권한이 있는지 확인하는 과정이다.

**실무에서 중요한 이유**
다른 사용자의 데이터 조회, 관리자 기능 접근 같은 문제를 막는다.

**흔한 오해**
권한은 역할만 보면 된다고 생각하는 것이다. 객체 소유권과 리소스 단위 권한도 필요하다.

**Visual Lab 반영 방식**
Resource Access Panel에서 userId, ownerId, role, permission을 비교한다.

**Codex 누락 방지 규칙**
인가 설명에는 role-based와 resource ownership을 모두 포함한다.

### 데이터 암호화

**정의**
민감 데이터를 안전하게 저장하거나 전송하기 위해 읽을 수 없는 형태로 변환하는 것이다.

**실무에서 중요한 이유**
개인정보, 인증 정보, 중요한 식별자 보호에 필요하다.

**흔한 오해**
암호화와 해싱을 같은 것으로 생각하는 것이다. 복호화 필요 여부에 따라 선택이 다르다.

**Visual Lab 반영 방식**
Data Exposure Panel에서 원본, 마스킹, 암호화, 해싱을 비교한다.

**Codex 누락 방지 규칙**
암호화는 마스킹/해싱과 구분해서 설명한다.

### HMAC

**정의**
secret key와 메시지를 이용해 데이터 위변조 여부를 검증하는 방식이다.

**실무에서 중요한 이유**
외부 연동, webhook, signed request에서 요청이 변조되지 않았는지 확인할 수 있다.

**흔한 오해**
HMAC을 암호화라고 생각하는 것이다. HMAC은 숨기는 것이 아니라 검증하는 것이다.

**Visual Lab 반영 방식**
HMAC Verification Panel에서 payload, signature, secret, verification result를 보여준다.

**Codex 누락 방지 규칙**
HMAC은 데이터 은닉이 아니라 무결성 검증이라고 명시한다.

### Audit Log

**정의**
누가 언제 어떤 리소스에 어떤 행동을 했는지 추적하기 위한 로그다.

**실무에서 중요한 이유**
사고 분석, 비정상 접근 추적, 책임 소재 확인에 필요하다.

**흔한 오해**
일반 application log가 있으면 audit log가 필요 없다고 생각하는 것이다.

**Visual Lab 반영 방식**
Audit Timeline에서 actor, action, resource, result, timestamp를 보여준다.

**Codex 누락 방지 규칙**
감사 로그는 민감정보를 그대로 남기지 않는 규칙도 포함한다.

### Secure Coding

**정의**
입력 검증, 출력 인코딩, 권한 검사, 에러 메시지 관리 등 취약점을 줄이는 코드 작성 습관이다.

**실무에서 중요한 이유**
취약점은 기능 구현 과정에서 자연스럽게 생기므로 개발 단계에서 방어해야 한다.

**흔한 오해**
보안은 배포 전 스캔 도구가 해결한다고 생각하는 것이다.

**Visual Lab 반영 방식**
Checklist Panel에서 입력, 권한, 응답, 로그, secret 처리 항목을 보여준다.

**Codex 누락 방지 규칙**
보안을 마지막 장식이 아니라 요청 흐름의 필수 단계로 배치한다.

## 7. 실무 판단 기준

- 인증과 인가는 반드시 분리해서 설계한다
- 사용자 소유 리소스 접근에는 owner 검증을 포함한다
- 응답 DTO에서 민감 필드를 제거하거나 마스킹한다
- 복호화가 필요하면 암호화, 검증만 필요하면 해싱/HMAC을 검토한다
- 외부 webhook이나 signed request에는 HMAC 검증을 고려한다
- 감사 로그에는 actor, action, resource, result, timestamp를 포함하되 민감정보 원문은 남기지
  않는다
- 방화벽과 보안 그룹은 필요한 트래픽만 허용한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Security Flow Panel`
- `Resource Access Panel`
- `Data Exposure Panel`
- `HMAC Verification Panel`
- `Audit Timeline`
- `Security Checklist`

### 권장 사용자 흐름

1. 타인 주문 조회 Incident를 보여준다
2. Security Flow Panel로 인증/인가 순서를 분리한다
3. Resource Access Panel에서 owner 검증 누락을 보여준다
4. Data Exposure Panel에서 민감 필드 노출을 보여준다
5. HMAC과 방화벽을 외부 연동 보안으로 연결한다
6. Audit Timeline으로 추적 가능성을 보여준다
7. 서버 운영 지식으로 넘어간다

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

- `sequenceId`: 08
- `securitySteps`: authentication, authorization, validation, business, audit, response
- `sensitiveFields`: email, phone, token, address 등
- `auditRecord`: actor, action, resource, result, timestamp
- `accessDecision`: allowed | denied | suspicious

## 10. 인터랙티브 시나리오 제안

- **인증은 됐지만 인가 누락**: 로그인한 사용자가 다른 사용자의 리소스에 접근하는 상황을
  보여준다.
- **민감 데이터 노출**: DTO에 passwordHash, internalMemo 같은 필드가 포함되는 상황을 보여준다.
- **webhook 위변조**: HMAC 검증이 없을 때 fake payload가 들어오는 상황을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] 인증과 인가를 분리했는가
- [ ] 데이터 암호화, HMAC, 방화벽, audit log를 모두 다뤘는가
- [ ] 데이터 노출 최소화와 비정상 접근 처리를 포함했는가
- [ ] 보안 지식을 요청 흐름 안에서 보여줬는가
- [ ] 09장 서버 지식으로 이어지는가
