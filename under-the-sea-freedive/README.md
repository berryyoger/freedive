# 🌊 Under the Sea — Freediving Shop & Community

프리다이빙샵 웹 프로그래밍 과제용 풀스택 샘플입니다.  
**Frontend:** HTML/CSS/Vanilla JS · **Backend:** Node.js(Express) · **DB:** MongoDB(Mongoose) · **Auth:** JWT

## 실행 방법

1) 저장소 루트에 `.env`를 만들고 아래 예시를 복사해 값을 채워주세요.
```
MONGO_URI=mongodb://127.0.0.1:27017/under_the_sea
JWT_SECRET=supersecret_change_me
PORT=3000
```
2) 의존성 설치
```
npm install
```
3) 샘플 데이터 시드(상품/다이빙포인트 등)
```
npm run seed
```
4) 서버 실행
```
npm run dev
```
5) 브라우저에서 열기: http://localhost:3000

---

## 구현 체크리스트(요약)

- 회원가입/로그인(JWT), 이메일 중복체크, 비밀번호 확인, 약관동의
- 장비 쇼핑몰(목록/상세), 강습 예약, 다이빙 포인트 지도(Leaflet), 다이빙 로그
- 커뮤니티 게시판, 이벤트/여행 정보
- 반응형 & 바닷속 테마(그라데, 물결/기포 애니메이션)
- Marine 날씨 API(Open-Meteo) 샘플 연동(`/api/marine?lat=..&lng=..`)

> 이메일 인증/비밀번호 찾기(메일 전송)는 데모로 콘솔에 링크 출력합니다.

## 폴더 구조
```
under-the-sea-freedive/
  ├─ server.js
  ├─ seed.js
  ├─ package.json
  ├─ .env.example
  ├─ README.md
  ├─ config/
  │   └─ db.js
  ├─ middleware/
  │   └─ auth.js
  ├─ models/
  │   ├─ User.js
  │   ├─ Product.js
  │   ├─ Booking.js
  │   ├─ DivePoint.js
  │   ├─ DiveLog.js
  │   ├─ Post.js
  │   └─ Event.js
  ├─ routes/
  │   ├─ auth.js
  │   ├─ products.js
  │   ├─ bookings.js
  │   ├─ divepoints.js
  │   ├─ divelogs.js
  │   ├─ posts.js
  │   ├─ events.js
  │   └─ marine.js
  └─ public/
      ├─ index.html
      ├─ login.html
      ├─ signup.html
      ├─ shop.html
      ├─ booking.html
      ├─ map.html
      ├─ logs.html
      ├─ community.html
      ├─ events.html
      ├─ styles.css
      └─ js/
          ├─ api.js
          ├─ auth.js
          ├─ ui.js
          └─ pages.js
```

## 주의
- 실제 배포 전에는 HTTPS/보안 헤더, CORS 범위 제한, 입력 검증 강화 등을 적용하세요.
- 결제 API는 목업 상태입니다. 실 결제 적용 시 PG사 문서에 따라 백엔드 검증 로직을 보강하세요.
