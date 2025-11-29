const state = { apiBase: 'http://localhost:8000', options: { maps: [], difficulties: [], characters: [] }, job: null, data: null };

function qs(id) { return document.getElementById(id); }

async function fetchJSON(url, init) {
  const r = await fetch(url, init);
  if (!r.ok) throw new Error('http_error');
  return await r.json();
}

function setStatus(msg) { qs('status').textContent = msg || ''; }

function renderOptions() {
  const mapsList = qs('mapsList');
  const diffsList = qs('difficultiesList');
  const charsList = qs('charactersList');
  mapsList.innerHTML = '';
  diffsList.innerHTML = '';
  charsList.innerHTML = '';
  state.options.maps.forEach(v => { const o = document.createElement('option'); o.value = v; mapsList.appendChild(o); });
  state.options.difficulties.forEach(v => { const o = document.createElement('option'); o.value = v; diffsList.appendChild(o); });
  state.options.characters.forEach(v => { const o = document.createElement('option'); o.value = v; charsList.appendChild(o); });
}

function renderGlobal() {
  if (!state.data || !state.data.global_info) return;
  const g = state.data.global_info;
  qs('mapName').value = (g.map_name && g.map_name.text) || '';
  qs('difficulty').value = (g.difficulty && g.difficulty.text) || '';
  qs('roundsUsed').value = (g.rounds_used && g.rounds_used.text) || '';
  markInput(qs('mapName'), g.map_name, 'map_name');
  markInput(qs('difficulty'), g.difficulty, 'difficulty');
  markInput(qs('roundsUsed'), g.rounds_used, 'rounds_used');
}

function renderPlayers() {
  const wrap = document.getElementById('playersContainer');
  wrap.innerHTML = '';
  if (!state.data || !Array.isArray(state.data.players)) return;
  state.data.players.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'player-card';
    const title = document.createElement('div');
    title.className = 'player-title';
    title.textContent = '玩家 ' + (p.player_number ?? (idx + 1));
    card.appendChild(title);
    const fields = [
      { label: '序号', key: 'player_number', type: 'number', value: p.player_number },
      { label: '角色', key: 'character_name', type: 'text', value: (p.character_name && p.character_name.text) || '', list: 'charactersList' },
      { label: '等级', key: 'player_level', type: 'number', value: (p.player_level && p.player_level.text) || '' },
      { label: '昵称', key: 'player_nickname', type: 'text', value: (p.player_nickname && p.player_nickname.text) || '' },
      { label: '击倒', key: 'knockdown_count', type: 'number', value: (p.knockdown_count && p.knockdown_count.text) || '' },
      { label: '倒地', key: 'down_count', type: 'number', value: (p.down_count && p.down_count.text) || '' },
      { label: '输出', key: 'damage_output', type: 'number', value: (p.damage_output && p.damage_output.text) || '' },
      { label: '承伤', key: 'damage_taken', type: 'number', value: (p.damage_taken && p.damage_taken.text) || '' },
      { label: '治疗', key: 'healing_score', type: 'number', value: (p.healing_score && p.healing_score.text) || '' },
      { label: '赚取', key: 'coins_earned', type: 'number', value: (p.coins_earned && p.coins_earned.text) || '' },
      { label: '转移', key: 'coins_transferred', type: 'number', value: (p.coins_transferred && p.coins_transferred.text) || '' },
    ];
    fields.forEach(f => {
      const row = document.createElement('div');
      row.className = 'field';
      const lab = document.createElement('label');
      lab.textContent = f.label;
      const inp = document.createElement('input');
      inp.type = f.type;
      inp.value = f.value || '';
      if (f.list) inp.setAttribute('list', f.list);
      inp.dataset.key = f.key;
      inp.dataset.row = idx;
      // 置信度标注
      if (f.key !== 'player_number') {
        const data = p[f.key];
        markInput(inp, data, f.key);
      }
      row.appendChild(lab);
      row.appendChild(inp);
      card.appendChild(row);
    });
    wrap.appendChild(card);
  });
}

function applyEdits() {
  if (!state.data) return;
  const g = state.data.global_info || {};
  const mn = qs('mapName').value || '';
  const df = qs('difficulty').value || '';
  const ru = qs('roundsUsed').value || '';
  if (!g.map_name) g.map_name = {}; g.map_name.text = mn;
  if (!g.difficulty) g.difficulty = {}; g.difficulty.text = df;
  if (!g.rounds_used) g.rounds_used = {}; g.rounds_used.text = ru;
  const inputs = document.querySelectorAll('#playersContainer input');
  inputs.forEach(inp => {
    const row = parseInt(inp.dataset.row, 10);
    const key = inp.dataset.key;
    const val = inp.value;
    const p = state.data.players[row];
    if (key === 'player_number') { p.player_number = Number(val) || 0; return; }
    if (!p[key]) p[key] = {};
    p[key].text = val;
  });
}

async function save() {
  applyEdits();
  if (!state.job) return;
  setStatus('保存中');
  const url = state.apiBase.replace(/\/$/, '') + '/save/' + state.job;
  await fetchJSON(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(state.data) });
  setStatus('已保存');
}

async function loadOptions() {
  setStatus('加载选项');
  const base = qs('apiBase').value.trim() || state.apiBase;
  state.apiBase = base;
  const url = base.replace(/\/$/, '') + '/options';
  const data = await fetchJSON(url);
  state.options = data;
  renderOptions();
  setStatus('');
}

async function processFile(file) {
  const base = qs('apiBase').value.trim() || state.apiBase;
  state.apiBase = base;
  const form = new FormData();
  form.append('file', file);
  setStatus('识别中');
  const proc = await fetchJSON(base.replace(/\/$/, '') + '/process', { method: 'POST', body: form });
  state.job = proc.job_id;
  try {
    const res = await fetchJSON(base.replace(/\/$/, '') + '/results/' + state.job);
    state.data = res;
    renderGlobal();
    renderPlayers();
    setStatus('识别完成');
  } catch (e) {
    setStatus('识别失败或结果未生成，请查看后端日志');
  }
}

function initDrag() {
  const drop = qs('drop');
  drop.addEventListener('click', () => qs('fileInput').click());
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('dragover'); });
  drop.addEventListener('dragleave', e => { drop.classList.remove('dragover'); });
  drop.addEventListener('drop', e => {
    e.preventDefault(); drop.classList.remove('dragover');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) processFile(f);
  });
  qs('fileInput').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (f) processFile(f); });
}

function init() {
  initDrag();
  qs('loadOptions').addEventListener('click', loadOptions);
  qs('saveBtn').addEventListener('click', save);
  // 自动加载选项，避免未点击导致下拉空
  loadOptions().catch(() => {});
}

document.addEventListener('DOMContentLoaded', init);

function markInput(inp, data, fieldKey) {
  const classes = ['conf-lt90','conf-lt70','conf-lt50','conf-miss','conf-char-lt10','conf-char-lt6','conf-char-lt2'];
  classes.forEach(c => inp.classList.remove(c));
  if (!data || typeof data !== 'object') return;
  const text = (data.text ?? '').toString().trim();
  const conf = typeof data.confidence === 'number' ? data.confidence : (data.confidence ? Number(data.confidence) : null);
  if (!text) {
    inp.classList.add('conf-miss');
    inp.title = '未识别';
    return;
  }
  if (conf == null) return;
  inp.title = '置信度: ' + conf;
  if (fieldKey === 'character_name') {
    if (conf < 0.02) inp.classList.add('conf-char-lt2');
    else if (conf < 0.06) inp.classList.add('conf-char-lt6');
    else if (conf < 0.10) inp.classList.add('conf-char-lt10');
  } else {
    if (conf < 0.5) inp.classList.add('conf-lt50');
    else if (conf < 0.7) inp.classList.add('conf-lt70');
    else if (conf < 0.9) inp.classList.add('conf-lt90');
  }
}
