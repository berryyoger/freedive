function oceanBackground() {
  const ocean = document.createElement("div");
  ocean.className = "ocean";
  ocean.innerHTML =
    '<div class="wave"></div><div class="wave"></div><div class="wave"></div>';
  document.body.appendChild(ocean);

  const bubbles = document.createElement("div");
  bubbles.className = "bubbles";
  for (let i = 0; i < 40; i++) {
    const b = document.createElement("div");
    const left = Math.random() * 100;
    const delay = (-Math.random() * 10).toFixed(2) + "s";
    const dur = (6 + Math.random() * 7).toFixed(2) + "s";
    b.className = "bubble";
    b.style.left = left + "vw";
    b.style.animationDelay = delay;
    b.style.animationDuration = dur;
    bubbles.appendChild(b);
  }
  document.body.appendChild(bubbles);
}

function header() {
  const h = document.createElement("header");
  h.innerHTML = `
    <nav>
      <div class="brand">🌊 <span>Under the Sea</span> — For every Freediver</div>
      <div class="navA">
        <a href="index.html">메인</a>
        <a href="shop.html">장비</a>
        <a href="booking.html">예약</a>
        <a href="map.html">포인트</a>
        <a href="logs.html">로그북</a>
        <a href="community.html">커뮤니티</a>
        <a href="events.html">이벤트</a>
      </div>
      <div class="loginBox">
        <span id="user-chip" class="small" style="display:none;margin-right:.5rem;"></span>
        <a href="login.html"  id="nav-login">로그인</a>
        <a href="signup.html" id="nav-signup" style="margin-left:.5rem;">회원가입</a>
        <a href="#"           id="nav-logout" style="display:none;margin-left:.5rem;">로그아웃</a>
      </div>
    </nav>
  `;
  document.body.prepend(h);

  const token    = window.Auth?.getToken?.();
  const loginA   = h.querySelector("#nav-login");
  const signupA  = h.querySelector("#nav-signup");
  const logoutA  = h.querySelector("#nav-logout");
  const userChip = h.querySelector("#user-chip");

  if (token) {
    loginA.style.display  = "none";
    signupA.style.display = "none";
    logoutA.style.display = "inline";

    // 캐시된 사용자(가입/로그인 직후 저장됨) 또는 JWT 간단 디코드
    let profile = null;
    try { profile = JSON.parse(localStorage.getItem('undersea_me') || 'null'); } catch {}
    if (!profile && window.Auth?.decode) profile = window.Auth.decode();
    if (profile && (profile.name || profile.email || profile.sub)) {
      userChip.textContent = `안녕하세요, ${profile.name || profile.email || profile.sub}님`;
      userChip.style.display = "inline";
    }

    logoutA.addEventListener("click", (e) => {
      e.preventDefault();
      window.Auth?.clear?.();
      localStorage.removeItem('undersea_me');
      location.href = "/index.html";
    });
  } else {
    loginA.style.display  = "inline";
    signupA.style.display = "inline";
    logoutA.style.display = "none";
    userChip.style.display = "none";
  }
}

function footer() {
  const f = document.createElement("footer");
  f.innerHTML = `
            <div class="footer_pages">
                <ul class="footerNav">
                    <li><a href="http://eos.aidainternational.org">EOS 2.0</a></li>
                    <li><a href="/CodeOfConduct">Code of Conduct</a></li>
                    <li><a href="/Documents">Documents</a></li>
                    <li><a href="/Disclaimer">Disclaimer</a></li>
                </ul>
                <ul class="footerNav">
                    <li><a href="https://www.aidainternational.org/Athletes">Athletes</a></li>
                    <li><a href="https://www.aidainternational.org/Events/EventCalendar">Event Calendar</a></li>
                    <li><a href="/News">News</a></li>
                    <li><a href="https://www.aidainternational.org/Ranking">Rankings</a></li>
                    <li><a href="https://www.aidainternational.org/WorldRecords">World Records</a></li>
                </ul>
                <ul class="footerNav">
                    <li><a href="/About">About</a></li>
                    <li><a href="/BoardAndMembers">Structure & contacts</a></li>
                    <li><a href="/Freediving">Freediving</a></li>
                    <li><a href="/Competitive">Competitive</a></li>
                </ul>
            </div>
            <div></div>
            <div class="footerCwuNav" style="overflow: visible">
                <h2>Connect with us</h2>
                <ul class="icons">
                    <li style="text-align: left;">
                        <a href="https://www.facebook.com/{}" class="smm__link" target="_blank">
                            <img src="/public/assets/icons/facebook.svg" alt="Under the Sea on Facebook" >
                        </a>
                    </li>
                    <li style="text-align: left;">
                        <a href="https://www.instagram.com/{}" class="smm__link" target="_blank">
                            <img src="/public/assets/icons/instagram.svg" alt="Under the Sea on Instagram" >
                        </a>
                    </li>
                    <li style="text-align: left;">
                        <a href="https://twitter.com/{}" target="_blank" class="smm__link">
                            <img src="/public/assets/icons/twitter.svg" alt="Under the Sea on Twitter" >
                        </a>
                    </li>
                    <li style="text-align: left;">
                        <a href="https://www.youtube.com/c/{}" target="_blank" class="smm__link">
                            <img src="/public/assets/icons/youtube.svg" alt="Under the Sea on Youtube" >
                        </a>
                    </li>
                </ul>
                <p>©&thinsp;2025&thinsp;—&thinsp;Under the Sea</p>
            </div>
  `;
  document.body.append(f);
}

document.addEventListener("DOMContentLoaded", () => {
  oceanBackground();
  header();
  footer();
});
