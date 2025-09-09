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
  }
};
window.Auth = Auth;
