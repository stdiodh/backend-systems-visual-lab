---
sequence: "10"
title: "모르면 답답해지는 네트워크 기초"
category: "network"
source_chapter: "Chapter 10"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Network Map Panel
  - DNS Resolution Panel
  - NAT Panel
  - VPN Route Panel
  - Protocol Comparison Panel
  - Troubleshooting Path
---

# 10. 모르면 답답해지는 네트워크 기초

## 1. 이 시퀀스의 역할

이 시퀀스는 클라이언트 요청이 서버까지 도달하는 경로를 이해하기 위한 네트워크 기본 개념을
다룬다.
노드, 네트워크, 라우터, IP, 도메인, NAT, VPN, TCP/UDP/QUIC을 시각
흐름으로 연결한다.

**이전 시퀀스와의 연결**  
09장에서 서버 내부 상태를 확인했다. 이제 요청이 서버까지 어떻게 들어오는지 외부 경로를 본다.

**다음 시퀀스로 넘길 질문**  
네트워크와 서버 흐름을 이해했다면, 서비스를 어떤 구조와 설계 패턴으로 나눌지 판단해야 한다.

**검색/데이터 별칭**  
network, ip, dns, nat, vpn, tcp, udp, quic

## 2. 시작 Incident

사용자는 API가 안 된다고 말하지만 서버 프로세스는 정상이고 로그에도 요청이 없다.
DNS, NAT, 방화벽, 라우팅, VPN 중 어디서 요청이 막혔는지 알 수 없다.

### 사용자가 처음 봐야 하는 질문

요청은 DNS를 거쳐 어떤 IP와 경로로 이동하고, 서버의 어느 포트까지 도달하는가?

## 3. 세부 목차

- 네트워크 기초를 모르면
- 노드, 네트워크, 라우터
- IP 주소와 도메인
- NAT
- VPN
- 프로토콜과 TCP, UDP, QUIC

## 4. 관찰 지표

- DNS resolution 결과
- public/private IP
- 라우팅 경로
- NAT 변환 여부
- VPN 연결 여부
- 방화벽/보안 그룹 허용 여부
- TCP connection 상태
- packet loss 또는 latency
- 서버 listening port

## 5. 원인 후보

- DNS가 잘못된 IP를 가리킴
- public/private IP 혼동
- NAT 뒤 서버로 직접 접근 시도
- VPN 미연결 또는 split tunneling 문제
- 방화벽/보안 그룹 차단
- 서버 포트 미청취
- TCP handshake 실패
- UDP/QUIC 특성 오해

## 6. 핵심 개념

### 노드와 네트워크

**정의**  
노드는 네트워크에 연결된 장치나 서버이며, 네트워크는 이들이 통신하는 연결 구조다.

**실무에서 중요한 이유**  
서비스 호출은 여러 노드와 네트워크 구간을 지나므로 경로를 알아야 원인을 좁힐 수 있다.

**흔한 오해**  
내 서버만 정상이라면 네트워크도 정상이라고 생각하는 것이다.

**Visual Lab 반영 방식**  
Network Map Panel에서 Client, DNS, Router, NAT, LB,
Server를 보여준다.

**Codex 누락 방지 규칙**  
네트워크 장은 반드시 end-to-end 경로로 설명한다.

### IP 주소와 도메인

**정의**  
IP는 네트워크상의 주소이고 도메인은 사람이 읽기 쉬운 이름이다. DNS가 도메인을 IP로
변환한다.

**실무에서 중요한 이유**  
도메인 문제, DNS 캐시, 잘못된 IP 연결은 실무 장애의 흔한 원인이다.

**흔한 오해**  
도메인이 같으면 항상 같은 서버로 간다고 생각하는 것이다.

**Visual Lab 반영 방식**  
DNS Resolution Panel에서 domain → IP 과정을 보여준다.

**Codex 누락 방지 규칙**  
도메인 설명에는 DNS resolution과 캐시를 포함한다.

### NAT

**정의**  
private IP와 public IP 사이의 주소 변환이다.

**실무에서 중요한 이유**  
클라우드와 사내망에서 서버가 직접 public IP를 갖지 않는 경우가 많아 접근 경로 이해에
필요하다.

**흔한 오해**  
NAT를 방화벽과 같은 것으로 생각하는 것이다. NAT는 주소 변환이고 접근 제어와는 다르다.

**Visual Lab 반영 방식**  
NAT Panel에서 private IP 요청이 public IP로 변환되는 모습을 보여준다.

**Codex 누락 방지 규칙**  
NAT는 private/public IP와 함께 설명한다.

### VPN

**정의**  
사설망에 안전하게 접속하기 위한 터널링 방식이다.

**실무에서 중요한 이유**  
사내 API, DB, 운영 서버 접근에 VPN이 필요한 경우가 많다.

**흔한 오해**  
VPN에 연결하면 모든 네트워크 문제가 해결된다고 생각하는 것이다. 라우팅과 DNS가 여전히
문제일 수 있다.

**Visual Lab 반영 방식**  
VPN Route Panel에서 connected/disconnected와 접근 가능 구간을
보여준다.

**Codex 누락 방지 규칙**  
VPN 설명에는 라우팅과 DNS 차이를 포함한다.

### TCP, UDP, QUIC

**정의**  
전송 계층 프로토콜이다. TCP는 연결 기반, UDP는 비연결 기반, QUIC은 UDP 위에서
동작하며 연결 설정과 전송 특성이 다르다.

**실무에서 중요한 이유**  
HTTP, 실시간 통신, 스트리밍, 최신 웹 프로토콜 이해에 필요하다.

**흔한 오해**  
UDP는 무조건 불안정하고 TCP는 항상 좋은 선택이라고 생각하는 것이다.

**Visual Lab 반영 방식**  
Protocol Comparison Panel에서 handshake, reliability,
latency 특징을 비교한다.

**Codex 누락 방지 규칙**  
프로토콜은 단순 정의보다 사용 사례와 trade-off로 보여준다.


## 7. 실무 판단 기준

- 문제가 생기면 DNS → IP → route/NAT/VPN → firewall → port/listen 순서로 확인한다
- public/private IP를 구분한다
- 서버 로그에 요청이 없으면 네트워크 앞단을 먼저 의심한다
- VPN 문제는 연결 여부뿐 아니라 route와 DNS를 확인한다
- 프로토콜 선택은 지연, 신뢰성, 연결 방식, 브라우저/인프라 지원을 함께 고려한다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Network Map Panel`
- `DNS Resolution Panel`
- `NAT Panel`
- `VPN Route Panel`
- `Protocol Comparison Panel`
- `Troubleshooting Path`

### 권장 사용자 흐름

1. 서버 로그에 요청이 없는 Incident를 보여준다
2. Network Map에서 요청 경로를 그린다
3. DNS Resolution으로 도메인과 IP를 확인한다
4. NAT/VPN/Firewall 구간을 순서대로 확인한다
5. Protocol Comparison으로 TCP/UDP/QUIC 차이를 보여준다
6. 11장 구조 설계로 연결한다

### UX Writer 규칙

- 제목은 개념명이 아니라 문제 상황으로 시작한다.
- 첫 문장은 사용자가 지금 겪는 증상으로 쓴다.
- 해결책은 하나만 제시하지 말고 선택지를 비교한다.
- “항상”, “무조건” 같은 표현을 피하고 조건을 함께 보여준다.
- 경고 메시지는 원인을 비난하지 말고 다음 관찰 지표를 안내한다.


## Visual Lab 공통 UX/UI 원칙

이 시퀀스는 긴 이론 본문을 화면에 그대로 넣지 않는다.
사용자는 먼저 **문제 상황**을 보고, 그 다음 **관찰 지표**, **원인 후보**,
**선택지**, **흐름도**, **체크리스트** 순서로 판단해야 한다.

- 첫 화면에는 `Incident Panel`을 배치한다.
- 핵심 수치는 `Metric Card`로 짧게 보여준다.
- 원인 후보는 `Candidate Cause Stack` 또는 `Decision Panel`로 보여준다.
- 개념 설명은 접히는 `Concept Card`로 제공한다.
- 코드/명령/설정 예시는 `Codex Terminal Panel` 또는 `Code Lens Panel`로 제공한다.
- 다음 시퀀스로 넘어가는 질문은 화면 하단의 `Next Question`으로 고정한다.
- 모바일에서는 Chapter Rail보다 현재 시퀀스 제목, 진행률, 다음 액션이 먼저 보여야 한다.


## 9. 데이터 모델 힌트

사이트 데이터 파일에서 이 시퀀스는 다음 필드를 가진 객체로 표현한다.

- `sequenceId`: 10
- `networkPath`: client, dns, router, nat, lb, server
- `ipInfo`: publicIp, privateIp, domain
- `connectivityChecks`: dns, route, firewall, port, protocol
- `protocol`: tcp | udp | quic

## 10. 인터랙티브 시나리오 제안

- **DNS 오설정**: 도메인이 이전 서버 IP를 가리켜 요청이 새 서버에 도달하지 않는 상황을 보여준다.
- **VPN 미연결**: 사내망 API가 외부에서 접근되지 않는 상황을 보여준다.
- **포트 미청취**: 방화벽은 열려 있지만 서버가 해당 포트를 listen하지 않는 상황을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] 노드, 네트워크, 라우터, IP, 도메인, NAT, VPN, TCP/UDP/QUIC을 모두 다뤘는가
- [ ] 서버 로그에 요청이 없는 상황을 네트워크 경로로 설명했는가
- [ ] DNS와 NAT, VPN을 혼동하지 않게 설명했는가
- [ ] 11장 아키텍처 패턴으로 이어지는가
