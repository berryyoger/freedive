// Signup page logic
async function handleSignup(){ //비동기 실행
  const form = document.querySelector('#signup-form'); //폼 호출
  if (!form) return; // 폼 아닐 시 반환
  const emailInput = form.querySelector('input[name=email]');// 호출한 폼에서 이메일 input 호출
  const emailMsg = form.querySelector('#email-msg'); //이메일 가용여부 표시창 호출
  emailInput.addEventListener('blur', async () => { //이메일 입력 후 blur 시 비동기 실행
    const email = emailInput.value.trim(); //이메일 양 끝 공백 제거
    if (!email) return; //이메일 아닐 시 반환
    try{ //try 내 코드 실행
      const { exists } = await API.get(`api/auth/check-email?email=${encodeURIComponent(email)}`);
      emailMsg.textContent = exists ? '이미 사용 중인 이메일입니다.' : '사용 가능한 이메일입니다.';
      emailMsg.className = exists ? 'err small' : 'success small';
    }catch(e){ emailMsg.textContent = ''; } //위 try에서 예외 발생시 실행
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.termsAgreed = !!data.termsAgreed;
    if (data.password !== data.password2){
      alert('비밀번호 확인이 일치하지 않습니다.'); return;
    }
    try{
      const r = await API.post('api/auth/register', data);
      Auth.setToken(r.token, true);
      alert('회원가입 완료!');
      location.href = '/index.html';
    }catch(err){
      alert(err.error || '오류');
    }
  });
}

// Login page logic
function handleLogin(){
  const form = document.querySelector('#login-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const remember = fd.get('remember') === 'on';
    const body = { email: fd.get('email'), password: fd.get('password') };
    try{
      const r = await API.post('/api/auth/login', body);
      Auth.setToken(r.token, remember);
      alert('로그인 성공');
      location.href = '/index.html';
    }catch(err){
      alert(err.error || '로그인 실패');
    }
  });

  document.querySelector('#forgot-btn')?.addEventListener('click', async () => {
    const email = prompt('가입 이메일을 입력하세요:');
    if (!email) return;
    try{
      const r = await API.post('/api/auth/forgot', { email });
      alert(r.message || '처리되었습니다. (서버 콘솔 확인)');
    }catch(e){ alert('오류'); }
  });
}

// Shop
async function renderShop(){
  const el = document.querySelector('#shop-list');
  if (!el) return;
  try{
    const { products } = await API.get('/api/products');
    el.innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.image}" alt="${p.name}" style="width:100%;border-radius:12px;aspect-ratio:16/9;object-fit:cover">
        <h3>${p.name}</h3>
        <div class="small">${p.category}</div>
        <p>${p.description}</p>
        <strong>${p.price.toLocaleString()}원</strong>
        <div style="margin-top:.5rem">
          <button class="btn" onclick="alert('결제 API 연동 예정(데모)')">구매</button>
          <span class="badge">재고 ${p.stock}</span>
        </div>
      </div>
    `).join('');
  } catch(e){
    el.innerHTML = '<p class="err">상품을 불러오지 못했습니다.</p>';
  }
}

// Booking
function handleBooking(){
  const form = document.querySelector('#booking-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
      const body = Object.fromEntries(new FormData(form).entries());
      const r = await API.post('/api/bookings', body, true);
      alert('예약 요청 완료!');
      form.reset();
      console.log(r);
    }catch(e){
      alert((e && e.error) || '로그인이 필요합니다.');
      if (e?.error === 'Unauthorized') location.href = '/login.html';
    }
  });
}

// Dive logs
function handleLog(){
  const form = document.querySelector('#log-form');
  const listEl = document.querySelector('#log-list');
  if (!form || !listEl) return;

  async function load(){
    try{
      const { logs } = await API.get('/api/divelogs', true);
      listEl.innerHTML = logs.map(l => {
        const xp = Math.round(l.depth*4 + l.duration*2 + (l.visibility||0));
        return `<div class="bubble-item">
          <strong>${l.date} — ${l.location}</strong>
          <div class="small">깊이 ${l.depth}m · 시간 ${l.duration}분 · 시야 ${l.visibility||0}m · 수온 ${l.temperature||0}°C</div>
          <div class="small">XP: <span class="badge">${xp}</span></div>
          <p>${l.notes||''}</p>
        </div>`;
      }).join('');
    }catch(e){
      listEl.innerHTML = '<p class="err">로그를 불러올 수 없습니다. 로그인 해주세요.</p>';
    }
  }
  load();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
      const body = Object.fromEntries(new FormData(form).entries());
      body.depth = +body.depth || 0; body.duration = +body.duration || 0;
      body.visibility = +body.visibility || 0; body.temperature = +body.temperature || 0;
      await API.post('/api/divelogs', body, true);
      form.reset();
      await load();
    }catch(e){
      alert((e && e.error) || '오류');
    }
  });
}

// Community
function handleCommunity(){
  const form = document.querySelector('#post-form');
  const list = document.querySelector('#post-list');
  if (!form || !list) return;

  async function load(){
    const { posts } = await API.get('/api/posts');
    list.innerHTML = posts.map(p => `
      <div class="bubble-item">
        <div class="small">${new Date(p.createdAt).toLocaleString()}</div>
        <h3>${p.title}</h3>
        <div class="small">by ${p.user?.name || '익명'} <span class="badge">${p.user?.level || ''}</span></div>
        <p>${p.content}</p>
      </div>
    `).join('');
  }
  load();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
      const body = Object.fromEntries(new FormData(form).entries());
      await API.post('/api/posts', body, true);
      form.reset(); load();
    }catch(e){
      alert((e && e.error) || '로그인이 필요합니다.');
    }
  });
}

// Events
function handleEvents(){
  const form = document.querySelector('#event-form');
  const list = document.querySelector('#event-list');
  if (!form || !list) return;

  async function load(){
    const { events } = await API.get('/api/events');
    list.innerHTML = events.map(ev => `
      <div class="card">
        <div class="small">${ev.startDate} ~ ${ev.endDate}</div>
        <h3>${ev.title}</h3>
        <div class="small">${ev.location || ''}</div>
        <p>${ev.description || ''}</p>
        ${ev.link ? `<a class="link" href="${ev.link}" target="_blank" rel="noreferrer">자세히</a>` : ''}
      </div>
    `).join('');
  }
  load();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
      const body = Object.fromEntries(new FormData(form).entries());
      await API.post('/api/events', body, true);
      form.reset(); load();
    }catch(e){
      alert((e && e.error) || '로그인이 필요합니다.');
    }
  });
}

// Marine
async function renderMarine(){
  const el = document.querySelector('#marine-box');
  if (!el) return;
  const sel = document.querySelector('#dp-select');
  try{
    const points = await API.get('/api/divepoints');
    sel.innerHTML = points.points.map(p => `<option value="${p.lat},${p.lng}">${p.name}</option>`).join('');
    async function load(){
      const [lat,lng] = sel.value.split(',').map(parseFloat);
      const j = await API.get(`/api/marine?lat=${lat}&lng=${lng}`);
      const w = j.hourly || {};
      el.innerHTML = `<div class="small">시간별 파고·풍속 (샘플)</div>
        <div class="card small">wave_height: ${JSON.stringify(w.wave_height?.slice(0,6))}<br>wind_speed_10m: ${JSON.stringify(w.wind_speed_10m?.slice(0,6))}</div>`;
    }
    sel.addEventListener('change', load);
    load();
  }catch(e){
    el.innerHTML = '<p class="err">해양 날씨를 불러올 수 없습니다.</p>';
  }
}

// Map page (Leaflet)
async function renderMap(){
  if (!document.getElementById('map')) return;
  const Lscript = document.createElement('script');
  Lscript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  document.head.appendChild(Lscript);
  const Lcss = document.createElement('link');
  Lcss.rel='stylesheet';
  Lcss.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(Lcss);

  async function init(){
    const map = L.map('map').setView([33.4996, 126.5312], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    const { points } = await API.get('/api/divepoints');
    points.forEach(p => {
      const m = L.marker([p.lat, p.lng]).addTo(map);
      m.bindPopup(`<strong>${p.name}</strong><br>${p.description}<br><span class="badge">${p.difficulty}</span>`);
    });
  }
  Lscript.onload = init;
}

// Router
document.addEventListener('DOMContentLoaded', () => {
  handleSignup();
  handleLogin();
  renderShop();
  handleBooking();
  handleLog();
  handleCommunity();
  handleEvents();
  renderMarine();
  renderMap();
});
