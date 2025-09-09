const API = {
  async get(path, auth=false){
    const opts = { headers: { 'Content-Type': 'application/json' } };
    if (auth){
      const t = window.Auth.getToken();
      if (t) opts.headers['Authorization'] = 'Bearer ' + t;
    }
    const r = await fetch(path, opts);
    if (!r.ok) throw await r.json();
    return r.json();
  },
  async post(path, body={}, auth=false){
    const opts = { method:'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
    if (auth){
      const t = window.Auth.getToken();
      if (t) opts.headers['Authorization'] = 'Bearer ' + t;
    }
    const r = await fetch(path, opts);
    if (!r.ok) throw await r.json();
    return r.json();
  }
};
window.API = API;
