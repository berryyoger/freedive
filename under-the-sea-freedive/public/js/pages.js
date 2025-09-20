// pages.js — 회원가입 핸들러 내부 수정만 보여줌

async function handleSignup(){
  const form = document.querySelector('#signup-form');
  if (!form) return;

  const emailInput = form.querySelector('input[name=email]');
  const emailMsg = form.querySelector('#email-msg');

  emailInput.addEventListener('blur', async () => {
    const email = emailInput.value.trim();
    if (!email) return;
    try {
      const { exists } = await API.get(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
      emailMsg.textContent = exists ? '이미 사용 중인 이메일입니다.' : '사용 가능한 이메일입니다.';
      emailMsg.className = exists ? 'err small' : 'success small';
    } catch(e) { emailMsg.textContent = ''; }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.termsAgreed = !!data.termsAgreed;
    if (data.password !== data.password2){
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      // 1) 회원가입 시도
      const r = await API.post('/api/auth/register', data);
      // 2) 토큰 저장 (자동 로그인)
      Auth.setToken(r.token, true);

      // 3) ✅ 가입 검증: /api/auth/me 호출(있다면)
      let profile = null;
      try {
        profile = await API.get('/api/auth/me', true);  // 서버에 라우트가 있을 때
      } catch {
        profile = Auth.decode();                        // 없으면 로컬 JWT로 폴백
      }
      if (profile) {
        Auth.setCachedUser(profile); // 헤더에서 쓰도록 캐시
        alert(`회원가입 완료! 환영합니다, ${profile.name || profile.email || profile.sub || '프리다이버'}님`);
      } else {
        alert('회원가입 완료! (프로필 확인 실패: 토큰만 저장됨)');
      }

      // 4) 메인으로 이동
      location.href = '/index.html';
    } catch(err){
      alert(err?.error || '회원가입 중 오류가 발생했습니다.');
    }
  });
}
