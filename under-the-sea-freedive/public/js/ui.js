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
        <a href="login.html" id="nav-login">로그인</a>
        <a href="signup.html" id="nav-login">회원가입</a>
      </div>
    </nav>
  `;
  document.body.prepend(h);

  const token = window.Auth.getToken();3
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

function footer(){
  const f= document.createElement('footer');
  f.innerHTML = `
            <div class="footer_pages">
                <ul class="footerNav">
                    <li class="footer__nav__item"><a href="http://eos.aidainternational.org">EOS 2.0</a></li>
                    <li class="footer__nav__item"><a href="/CodeOfConduct">Code of Conduct</a></li>
                    <li class="footer__nav__item"><a href="/Documents">Documents</a></li>
                    <li class="footer__nav__item"><a href="/Disclaimer">Disclaimer</a></li>
                </ul>
                <ul class="footerNav">
                    <li class="footer__nav__item"><a href="https://www.aidainternational.org/Athletes">Athletes</a>
                    </li>
                    <li class="footer__nav__item"><a href="https://www.aidainternational.org/Events/EventCalendar">Event
                            Calendar</a></li>
                    <li class="footer__nav__item"><a href="/News">News</a>
                    </li>
                    <li class="footer__nav__item"><a href="https://www.aidainternational.org/Ranking">Rankings</a>
                    </li>
                    <li class="footer__nav__item"><a href="https://www.aidainternational.org/WorldRecords">World
                            Records</a></li>
                </ul>
                <ul class="footerNav">
                    <li class="footer__nav__item"><a href="/About">About</a></li>
                    <li class="footer__nav__item"><a href="/BoardAndMembers">Structure & contacts</a></li>
                    <li class="footer__nav__item"><a href="/Freediving">Freediving</a></li>
                    <li class="footer__nav__item"><a href="/Competitive">Competitive</a></li>
                </ul>
            </div>
            <div class="footerCwuNav" style="overflow: visible">
                <h2 class="footer__connect__title u-spc-bottom--sml">Connect with us</h2>


                <ul class="smm u-spc-bottom--sml ">


                    <li class="smm__item" style="text-align: left;">
                        <a id="facebook" class="smm__link">
                            <img src="/assets/temp/eos/icons/social-facebook.svg" alt="Under the Sea on Facebook" >
                        </a>
                    </li>

                    <li class="smm__item" style="text-align: left;">
                        <a href="https://www.instagram.com/{}" class="smm__link" target="_blank">
                            <img src="/assets/temp/eos/icons/social-instagram.svg" alt="Under the Sea on Instagram" >
                        </a>
                    </li>

                    <li class="smm__item" style="text-align: left;">
                        <a href="https://twitter.com/{}" target="_blank" class="smm__link">
                            <img src="/assets/temp/eos/icons/social-twitter.svg" alt="Under the Sea on Twitter" >
                        </a>
                    </li>


                    <li class="smm__item" style="text-align: left;">
                        <a href="https://www.youtube.com/c/{}" target="_blank" class="smm__link">
                            <img src="/assets/temp/eos/icons/social-youtube.svg" alt="Under the Sea on Youtube" >
                        </a>
                    </li>



                </ul>
                <p class="u-type--primary u-type--zeta">©&thinsp;2025&thinsp;—&thinsp;Under the Sea</p>
                            </div>
                        </div>
                    </div>
  `;
  document.body.append(f);
}

document.addEventListener('DOMContentLoaded', () => {
  oceanBackground();
  header();
  footer();
});
