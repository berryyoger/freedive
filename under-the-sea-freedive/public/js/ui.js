function oceanBackground(){
  const ocean = document.createElement('div');
  ocean.className = 'ocean';
  ocean.innerHTML = '<div class="wave"></div><div class="wave"></div><div class="wave"></div>';
  document.body.appendChild(ocean);

  const bubbles = document.createElement('div');
  bubbles.className = 'bubbles';
  for (let i=0;i<40;i++){
    const b = document.createElement('div');
    const left = Math.random()*100;
    const delay = (-Math.random()*10).toFixed(2)+'s';
    const dur = (6+Math.random()*7).toFixed(2)+'s';
    b.className='bubble';
    b.style.left = left+'vw';
    b.style.animationDelay = delay;
    b.style.animationDuration = dur;
    bubbles.appendChild(b);
  }
  document.body.appendChild(bubbles);
}

function header(){
  const h = document.createElement('header');
  h.innerHTML = `
    <div class="brand">🌊 <span>Under the Sea</span> — For every Freediver</div>
    <nav>
      <a href="index.html">메인</a>
      <a href="shop.html">장비</a>
      <a href="booking.html">예약</a>
      <a href="map.html">포인트</a>
      <a href="logs.html">로그북</a>
      <a href="community.html">커뮤니티</a>
      <a href="events.html">이벤트</a>
      <a href="login.html" id="nav-login">로그인</a>
    </nav>
  `;
  document.body.prepend(h);

  const token = window.Auth.getToken();
  const loginLink = h.querySelector('#nav-login');
  if (token){
    loginLink.textContent = '로그아웃';
    loginLink.addEventListener('click', (e)=>{
      e.preventDefault();
      window.Auth.clear();
      location.href = '/index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  oceanBackground();
  header();
});
