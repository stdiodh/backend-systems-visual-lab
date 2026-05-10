---
sequence: "09"
title: "최소한 알고 있어야 할 서버 지식"
category: "server"
source_chapter: "Chapter 09"
implementation_scope: "Visual Lab sequence detail"
required_components:
  - Incident Panel
  - Server Terminal Panel
  - Process Panel
  - Disk Meter
  - FD Panel
  - Cron Panel
  - Command Cheat Sheet
---

# 09. 최소한 알고 있어야 할 서버 지식

## 1. 이 시퀀스의 역할

이 시퀀스는 개발자가 운영 서버에서 최소한 확인할 줄 알아야 하는 OS, 프로세스, 권한, 디스크, 파일
디스크립터, 시간, cron, alias, 네트워크 명령을 다룬다.

**이전 시퀀스와의 연결**
08장에서 서비스 보안을 다뤘다. 이제 실제 서버에 접속했을 때 무엇을 확인해야 하는지 본다.

**다음 시퀀스로 넘길 질문**
서버 내부를 확인할 수 있어도 요청이 서버까지 어떻게 오는지 모르면 네트워크 문제를 해결하기
어렵다.

**검색/데이터 별칭**
server, linux, process, disk, cron

## 2. 시작 Incident

서비스가 갑자기 응답하지 않는다. 애플리케이션 로그는 멈춰 있고, 배포된 서버에 접속했지만 어떤
프로세스가 떠 있는지, 디스크가 꽉 찼는지, 포트가 열려 있는지 확인할 줄 모른다.

### 사용자가 처음 봐야 하는 질문

서버에서 지금 무엇이 실행 중이고, 어떤 리소스가 한계에 도달했는가?

## 3. 세부 목차

- 개발자와 서버
- OS 계정과 권한
- 프로세스 확인하기
- 백그라운드 프로세스
- 디스크 용량 관리
- 파일 디스크립터 제한
- 시간 맞추기
- 크론으로 스케줄링하기
- alias 등록하기
- 네트워크 정보 확인

## 4. 관찰 지표

- 현재 사용자와 권한
- 실행 중인 프로세스와 PID
- CPU/memory 사용률
- 백그라운드 실행 상태
- 디스크 사용률과 inode
- open file count
- ulimit 설정
- 서버 시간과 timezone
- cron 등록 상태
- listening port와 connection 상태

## 5. 원인 후보

- 잘못된 계정 권한으로 실행
- 프로세스 죽음 또는 중복 실행
- 디스크 full로 로그/DB write 실패
- file descriptor 한계 도달
- 서버 시간 불일치로 인증/스케줄 문제
- cron 오등록 또는 미실행
- 방화벽/포트/listen 상태 확인 부족
- alias/환경 변수 차이로 명령 오작동

## 6. 핵심 개념

### OS 계정과 권한

**정의**
서버에서 파일, 프로세스, 명령 실행 권한을 계정 단위로 제어하는 체계다.

**실무에서 중요한 이유**
잘못된 계정 권한은 보안 문제와 배포 실패를 모두 만든다.

**흔한 오해**
root로 실행하면 편하니 좋다고 생각하는 것이다.

**Visual Lab 반영 방식**
Terminal Panel에서 whoami, id, ls -l 결과를 보여준다.

**Codex 누락 방지 규칙**
권한은 보안과 운영 안정성을 함께 설명한다.

### 프로세스 Process

**정의**
서버에서 실행 중인 프로그램의 인스턴스다. PID, 상태, 자원 사용량을 가진다.

**실무에서 중요한 이유**
서비스가 실제로 떠 있는지, CPU/memory를 얼마나 쓰는지 확인하는 기본 단위다.

**흔한 오해**
서버가 켜져 있으면 애플리케이션도 정상이라고 생각하는 것이다.

**Visual Lab 반영 방식**
Process Panel에서 ps/top 출력과 상태를 카드로 해석한다.

**Codex 누락 방지 규칙**
명령어만 나열하지 말고 결과 해석을 포함한다.

### 디스크 용량

**정의**
파일 시스템의 사용 가능 공간과 inode 상태다.

**실무에서 중요한 이유**
디스크가 가득 차면 로그, 업로드, DB, 임시 파일 쓰기가 실패할 수 있다.

**흔한 오해**
디스크 용량은 DB 서버만 보면 된다고 생각하는 것이다. 애플리케이션 로그도 원인이 될 수 있다.

**Visual Lab 반영 방식**
Disk Meter에서 df -h와 inode 사용률을 함께 보여준다.

**Codex 누락 방지 규칙**
디스크는 capacity와 inode를 함께 표시한다.

### 파일 디스크립터 File Descriptor

**정의**
프로세스가 파일, 소켓 등을 열 때 사용하는 OS 리소스 핸들이다.

**실무에서 중요한 이유**
HTTP connection, 파일, socket이 많아지면 fd 제한에 걸릴 수 있다.

**흔한 오해**
파일 디스크립터는 파일에만 관련 있다고 생각하는 것이다. 네트워크 socket도 포함된다.

**Visual Lab 반영 방식**
FD Panel에서 lsof, ulimit -n, open files 수를 보여준다.

**Codex 누락 방지 규칙**
fd는 네트워크 connection과 연결해서 설명한다.

### Cron

**정의**
정해진 시간에 명령을 실행하는 스케줄링 도구다.

**실무에서 중요한 이유**
배치, 정리 작업, 주기적 동기화에 자주 쓰인다.

**흔한 오해**
cron에 등록하면 항상 실행된다고 생각하는 것이다. 환경 변수, timezone, 권한 문제가 있다.

**Visual Lab 반영 방식**
Cron Panel에서 crontab 표현식과 실행 로그 확인 위치를 보여준다.

**Codex 누락 방지 규칙**
cron 설명에는 timezone과 환경 변수 주의 사항을 포함한다.

### 서버 시간 동기화

**정의**
서버의 시스템 시간이 실제 시간과 맞도록 관리하는 것이다.

**실무에서 중요한 이유**
토큰 만료, 로그 분석, 배치 실행, 분산 시스템 이벤트 순서에 영향을 준다.

**흔한 오해**
몇 분 차이는 문제 없다고 생각하는 것이다. 인증과 로그 분석에서 큰 문제가 된다.

**Visual Lab 반영 방식**
Time Panel에서 date, timedatectl, timezone, NTP 상태를 보여준다.

**Codex 누락 방지 규칙**
시간은 보안과 로그 분석과 연결한다.

## 7. 실무 판단 기준

- 서버 문제는 process, log, disk, network, permission 순서로 기본 확인한다
- 권한 문제는 root 실행으로 덮지 말고 원인을 확인한다
- 디스크 용량과 inode를 함께 본다
- file descriptor는 connection 증가와 함께 본다
- cron은 등록 여부뿐 아니라 실행 로그와 환경 변수를 확인한다
- 서버 시간은 인증과 audit log 분석의 전제 조건으로 다룬다

## 8. Visual Lab 화면 반영 방식

### 필수 컴포넌트

- `Incident Panel`
- `Server Terminal Panel`
- `Process Panel`
- `Disk Meter`
- `FD Panel`
- `Cron Panel`
- `Command Cheat Sheet`

### 권장 사용자 흐름

1. 서비스 무응답 Incident를 보여준다
2. Server Terminal Panel에서 기본 명령어를 순서대로 실행하는 느낌을 준다
3. Process Panel로 애플리케이션 프로세스 상태를 확인한다
4. Disk/FD/Time/Cron 패널을 차례로 확인한다
5. 네트워크 포트와 연결 상태를 보여주며 10장으로 연결한다

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

- `sequenceId`: 09
- `commands`: ps, top, df, lsof, ulimit, crontab, ss 등
- `serverMetrics`: cpu, memory, disk, fd, processStatus
- `terminalSteps`: 명령어와 해석 결과 배열
- `riskBadges`: permission, diskFull, fdLimit, timeDrift

## 10. 인터랙티브 시나리오 제안

- **디스크 full**: 로그 파일 증가로 디스크가 가득 차 애플리케이션이 쓰기 실패하는 상황을
  보여준다.
- **fd limit 초과**: connection 증가로 too many open files가 발생하는 상황을 보여준다.
- **cron 미실행**: 환경 변수 차이와 timezone 문제로 배치가 실행되지 않는 상황을 보여준다.

## 11. 누락 방지 체크리스트

- [ ] OS 계정, 프로세스, 백그라운드, 디스크, fd, 시간, cron, alias, 네트워크 정보를 모두
  다뤘는가
- [ ] 명령어 나열이 아니라 결과 해석을 포함했는가
- [ ] 서버 지식을 보안/성능/네트워크와 연결했는가
- [ ] 10장 네트워크 기초로 이어지는가
