# 🐾 반려 동물 논스탑 케어 서비스

반려동물을 위한 논스탑 케어 서비스를 제공합니다.  
근처 동물 병원 및 호텔 정보를 조회하고 예약까지 한 번에!  

> **병원 및 호텔 실시간 연동은 미구현 상태이며, 테스트 목적의 DB와 연동되어 있습니다.**

---

## 🔗 배포 링크

- [서비스 바로가기](https://kakao-auth-pet.vercel.app/)
- [구현 화면 보기 (Notion)](https://www.notion.so/1a9447f758f980858c36e76d137abf9a?pvs=21)

---

## 🛠 사용 기술 스택

- **Frontend**: `React`, `Next.js`, `TypeScript`, `JavaScript`, `Tailwind CSS`, `Shadcn`
- **Backend & Infra**: `MongoDB`, `Vercel`
- **지도**: `Kakao Map API`
- **기타**: `Gist`, `OpenWeather API`, 공공데이터포털 API

---

## ✨ 주요 기능

- 🔄 **반응형 UI 지원** (모바일, 태블릿, 데스크탑 대응)
- 🔐 **로그인 / 회원가입 기능**
- 📝 **회원 정보 수정**
- 📍 **사용자 위치 기반 병원/호텔 정보 제공**
- 🏨 **반려동물 입장 가능 호텔 예약 기능**
  - MongoDB 기반 저장 (실제 호텔 연동 X)
- 📆 **마이페이지 내 예약 내역 관리**
  - 예약 정보 수정 / 삭제

---

## 🔌 연동 API

- 🌤 **날씨 정보 API**
  - [https://openweathermap.org/](https://openweathermap.org/)
- 🏨 **반려동물 동반 호텔 정보 API**
  - [바로가기](https://www.bigdata-culture.kr/bigdata/user/data_market/detail.do?id=33274660-7ab3-11ed-b3ef-49efc94461a7)
- 🏥 **동물 병원 공공 정보 API**
  - [바로가기](https://www.bigdata-culture.kr/bigdata/user/data_market/detail.do?id=79f89a60-484d-11ec-9c54-b54b4d3d7cd0)

---

## 📌 프로젝트 목적 및 배경

- 반려인들을 위한 원스톱 병원/호텔 케어 플랫폼
- 유저 맞춤형 위치 기반 서비스 제공
- 공공 API 및 Open API를 활용한 실전형 프로젝트 경험

---

## 📎 기타

- 본 프로젝트는 개인/포트폴리오 목적의 데모 프로젝트입니다.
- 실제 병원 및 호텔과의 연동은 이루어지지 않았습니다.
