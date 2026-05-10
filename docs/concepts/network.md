# Network Concepts

### IP 주소와 도메인

분류: 네트워크

정의: IP 주소는 네트워크에서 노드를 찾기 위한 주소이고, 도메인은 사람이 기억하기 쉬운 이름이다.

실무에서 중요한 이유: 배포, DNS, 로드밸런서, 외부 연동 장애를 추적할 때 기본이 된다.

흔한 오해: 도메인만 알면 실제 연결 경로를 알 수 있다고 생각한다.

Visual Lab 반영 방식: DNS Resolution Flow에서 domain, DNS, IP, server 연결을 보여준다.

Codex 누락 방지 규칙: 네트워크 장에는 도메인과 실제 IP 확인 흐름을 함께 둔다.

### NAT

분류: 네트워크

정의: 사설 IP와 공인 IP 사이에서 주소를 변환해 통신할 수 있게 하는 방식이다.

실무에서 중요한 이유: 서버 배포, VPC, 외부 접근, 내부망 구조를 이해할 때 필요하다.

흔한 오해: 서버의 사설 IP와 외부에서 접근하는 공인 IP를 혼동한다.

Visual Lab 반영 방식: Client, Public IP, NAT, Private Server 경로를 보여준다.

Codex 누락 방지 규칙: DNS와 NAT를 같은 요청 흐름 안에서 연결한다.

### VPN

분류: 네트워크 / 보안

정의: 공용 네트워크 위에 사설 통신 경로를 만들어 내부망처럼 접근하게 하는 방식이다.

실무에서 중요한 이유: 운영 DB, 내부 API, 사내 시스템 접근 경로를 이해하는 데 필요하다.

흔한 오해: VPN에 연결되면 모든 네트워크 문제가 사라진다고 생각한다.

Visual Lab 반영 방식: VPN route, internal subnet, blocked public path를 비교한다.

Codex 누락 방지 규칙: VPN 설명에는 라우팅과 접근 권한을 함께 포함한다.

### TCP / UDP / QUIC

분류: 네트워크 프로토콜

정의: 애플리케이션 데이터가 네트워크에서 전달되는 방식과 신뢰성, 연결 방식이 다른 전송 프로토콜들이다.

실무에서 중요한 이유: HTTP, 실시간 통신, 스트리밍, 지연 시간 문제를 이해할 때 필요하다.

흔한 오해: 모든 네트워크 통신이 TCP처럼 동작한다고 생각한다.

Visual Lab 반영 방식: Protocol Comparison Cards로 연결, 신뢰성, 지연 특성을 비교한다.

Codex 누락 방지 규칙: 프로토콜 비교는 백엔드 장애 추적과 연결해서 설명한다.

### DNS

분류: 네트워크 / 이름 해석

정의: 도메인 이름을 실제 통신에 사용할 IP 주소로 변환하는 시스템이다.

실무에서 중요한 이유: 배포 변경, 장애 전환, 외부 연동 실패가 DNS 캐시나 레코드 설정과 관련될 수 있다.

흔한 오해: DNS 레코드를 바꾸면 모든 사용자가 즉시 새 서버로 접속한다고 생각한다.

Visual Lab 반영 방식: DNS Resolution Flow에서 cache, TTL, authoritative server, resolved IP를 보여준다.

Codex 누락 방지 규칙: 도메인 설명에는 TTL과 캐시로 인한 지연을 포함한다.

### 라우팅

분류: 네트워크 / 경로 선택

정의: 패킷이 목적지까지 도달하기 위해 어떤 네트워크 경로를 거칠지 결정하는 과정이다.

실무에서 중요한 이유: VPC, VPN, NAT, 방화벽 문제를 추적하려면 요청 경로를 이해해야 한다.

흔한 오해: IP와 포트가 맞으면 네트워크는 항상 연결된다고 생각한다.

Visual Lab 반영 방식: Client to Server Network Path에서 route table, gateway, blocked segment를 표시한다.

Codex 누락 방지 규칙: 네트워크 장에는 IP, NAT, VPN과 라우팅을 한 흐름으로 연결한다.
