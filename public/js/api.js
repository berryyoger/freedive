// api.js — API 베이스 자동 설정 + 경로 보정 + 에러 래핑
const API = (() => {
  // 개발 중 정적서버(:5500 등)에서 열면 자동으로 :3000 백엔드로 보냄.
  const DEV_BASE = (typeof location !== 'undefined' && location.port && location.port !== '3000')
    ? 'http://localhost:3000'
    : '';
  // 필요하면 HTML에서 window.__API_BASE__로 오버라이드 가능
  const BASE_URL = (typeof window !== 'undefined' && window.__API_BASE__) || DEV_BASE;

  const normalize = (path) => {
    if (/^https?:\/\//i.test(path)) return path;           // 완전한 절대 URL이면 그대로
    return BASE_URL + (path.startsWith('/') ? path : '/' + path); // '/api/..' 또는 'api/..' 모두 보정
  };

  async function handle(res, url) {
    const ct = res.headers.get('content-type') || '';
    let payload = null;
    if (res.status !== 204) {
      payload = ct.includes('application/json')
        ? await res.json().catch(() => null)
        : await res.text().catch(() => null);
    }
    if (!res.ok) {
      const err = new Error((payload && payload.message) || `HTTP ${res.status} on ${url}`);
      err.status = res.status;
      err.data = payload;
      err.url = url;
      throw err;
    }
    return payload;
  }

  function withAuth(headers, auth) {
    if (!auth) return headers;
    const t = window.Auth?.getToken?.();
    return t ? { ...headers, Authorization: `Bearer ${t}` } : headers;
  }

  return {
    async get(path, auth = false) {
      const url = normalize(path);
      const headers = withAuth({}, auth);                  // GET은 불필요한 Content-Type 헤더 제거
      const res = await fetch(url, { method: 'GET', headers });
      return handle(res, url);
    },
    async post(path, body = {}, auth = false) {
      const url = normalize(path);
      const headers = withAuth({ 'Content-Type': 'application/json' }, auth);
      const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
      return handle(res, url);
    }
  };
})();
window.API = API;
