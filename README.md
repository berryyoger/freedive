# 🌊 Under the Sea — Freediving Shop & Community

**Frontend:** HTML/CSS/Vanilla JS · **Backend:** Node.js(Express) · **DB:** MongoDB(Mongoose) · **Auth:** JW

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
