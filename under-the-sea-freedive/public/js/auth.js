const Auth = {
  rememberKey: 'undersea_token',
  sessionKey: 'undersea_token_session',
  setToken(token, remember){
    if (remember) {
      localStorage.setItem(this.rememberKey, token);
      sessionStorage.removeItem(this.sessionKey);
    } else {
      sessionStorage.setItem(this.sessionKey, token);
    }
  },
  getToken(){
    return localStorage.getItem(this.rememberKey) || sessionStorage.getItem(this.sessionKey);
  },
  clear(){
    localStorage.removeItem(this.rememberKey);
    sessionStorage.removeItem(this.sessionKey);
  },

  // ✅ 추가: JWT 페이로드 간단 디코드 (서버 /me 없을 때 폴백)
  decode(){
    const t = this.getToken();
    if (!t) return null;
    try {
      const base64 = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64)); // { email?, name?, sub?, id? ... }
    } catch { return null; }
  }
};
window.Auth = Auth;
