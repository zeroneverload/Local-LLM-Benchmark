let app = () => {
  const API = {
    get: (url) => fetch(url).then(r => r.ok ? r.json() : Promise.reject(r.status)),
    post: (url, body) => fetch(url, {method: 'POST', headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (window.apiKey || ''),
    }, body: JSON.stringify(body)}).then(r => r.ok ? r.json() : Promise.reject(r.status)),
    put: (url, body) => fetch(url, {method: 'PUT', headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (window.apiKey || ''),
    }, body: JSON.stringify(body)}).then(r => r.ok ? r.json() : Promise.reject(r.status)),
    del: async (url) => {
      try {
        const r = await fetch(url, {method: 'DELETE'});
        return r.ok;
      } catch(e) { console.error(e); return false; }
    }
  };
  
  const SLOT = document.createElement('div');
  SLOT.className = 'slot';
  SLOT.innerHTML = '<h3>API Slot<button class="btn btn-primary btn-small" id="fetch-models">Fetch Models</button></h3><div class="input-group"><label>Type</label><select id="type"><option value="ollama">Ollama</option><option value="openai">OpenAI</option></select></div><div class="input-group"><label>Base URL</label><input type="text" id="baseUrl" placeholder="http://localhost:11434"></div><div class="input-group"><label>API Key (optional)</label><input type="password" id="apiKey"></div><div class="input-group"><label>Model</label><select id="model"><option value="">Select model...</option></select></div><button class="btn btn-success btn-small">Save</button><button class="btn btn-danger btn-small">Delete</button><small class="msg"></small>';
  document.getElementById('slots').appendChild(SLOT);
  
  document.getElementById('fetch-models').onclick = async () => {
    const type = SLOT.querySelector('select#type').value;
    const baseUrl = SLOT.querySelector('#baseUrl').value;
    try {
      let url = type === 'ollama' ? baseUrl.replace(/\/+$/, '') + '/api/tags' : baseUrl.replace(/\/v1?$/, '/v1/models');
      const data = await API.get(url, {headers: {'Authorization': 'Bearer ' + (SLOT.querySelector('#apiKey').value || '')}});
      const models = type === 'ollama' ? (data.models || []) : (data.data || data.models || []);
      if (models.length > 0) {
        await API.put('/api/systems/1', {baseUrl, apiKey: SLOT.querySelector('#apiKey').value, modelName: models[0].name || models[0].id});
        const options = models.map(m => '<option value="' + m.name + '">' + m.name + '</option>').join('') + '<option value="">Select</option>';
        SLOT.querySelector('#model').innerHTML = options;
        SLOT.querySelector('#model').value = models[0].id || models[0].name;
      }
    } catch(e) { SLOT.querySelector('.msg').innerText = 'Error: ' + e; }
  };
  
  SLOT.querySelector('.save').onclick = async () => {
    const selectedModel = SLOT.querySelector('#model').selectedOptions[0]?.text.replace('Select', '').trim() || '';
    if (!selectedModel && !window.systemModels) {
      alert('Please fetch models first');
      return;
    }
    try {
      await API.put('/api/systems/1', {
        name: SLOT.querySelector('#model').value,
        type: SLOT.querySelector('#type').value,
        baseUrl: SLOT.querySelector('#baseUrl').value,
        apiKey: SLOT.querySelector('#apiKey').value,
        modelName: selectedModel || SLOT.querySelector('#model').value
      });
      SLOT.querySelector('.msg').innerText = 'Saved!';
      SLOT.querySelector('.msg').style.color = '#27ae60';
    } catch(e) {
      SLOT.querySelector('.msg').innerText = 'Error: ' + e;
    }
  };
  
  SLOT.querySelector('.btn-danger').onclick = async () => {
    await API.del('/api/systems/1');
    document.getElementById('slots').innerHTML = '';
    // Recreate slots
  };
  
  const PROMPTS = document.createElement('div');
  PROMPTS.id = 'profiles';
  
  await API.get('/api/prompts').then(prompts => {
    PROMPTS.innerHTML = prompts.map(p => 
      '<div class="profile" id="' + p.id + '"><label><strong>' + p.title + '</strong><input type="text" placeholder="Edit title" oninput="savePrompt(' + p.id + ')\"></label><label><textarea rows="3" placeholder="Edit content" oninput="savePrompt(' + p.id + ')" />' + p.content + '</textarea></label><small>Max Tokens: ' + p.maxTokens + '</small><div style="margin-top:8px"><span class="badge active" style="display:inline-block;background:#d4edda;padding:2px 8px;border-radius:4px;font-size:11px;margin-right:5px;">Active</span></div><div style="margin-top:5px"><span class="badge" style="display:inline-block;background:#e9ecef;padding:2px 8px;border-radius:4px;font-size:11px;margin-right:5px;">' + p.id + '</span></div><button class="btn btn-primary btn-small" style="margin-top:8px;height:auto;padding:4px 10px;font-size:12px;">Save</button><button class="btn btn-danger btn-small" style="margin-top:8px;height:auto;padding:4px 10px;font-size:12px;">Delete</button></div>'
    ).join('');
    
    // Add events for each prompt
    PROMPTS.querySelectorAll('.profile').forEach((el, idx) => {
      const id = PROMPTS.querySelectorAll('.profile')[idx].id;
      el.querySelector('button.btn-danger').onclick = () => API.del('/api/prompts/' + id).then(() => {
        PROMPTS.innerHTML = '';
        API.get('/api/prompts').then(loaded => {
          PROMPTS.innerHTML = loaded.map(p => '<div id="' + p.id + '" style="background:#fff;padding:15px;border:1px solid #ddd;border-radius:4px;margin:10px;display:block;" />' + 
            '<label><strong>' + p.title + '</strong><input type="text" placeholder="Edit title" oninput="savePrompt(\'' + p.id + '\', ' + p.title + ', this)\"></label><label><textarea rows="3" placeholder="Edit content" oninput="savePrompt(\'' + p.id + '\', this, ' + p.content + ')" />' + p.content + '</textarea></label><small>Max Tokens: ' + p.maxTokens + '</small><div style="margin-top:8px"><span class="badge active" style="display:inline-block;background:#d4edda;padding:2px 8px;border-radius:4px;font-size:11px;">Active</span></div><div><span class="badge" style="display:inline-block;background:#e9ecef;padding:2px 8px;border-radius:4px;font-size:11px;">' + p.id + '</span></div><button class="btn btn-success btn-small" style="margin-top:8px;height:auto;padding:4px 10px;font-size:12px;">Save</button><button class="btn btn-danger btn-small" style="margin-top:8px;height:auto;padding:4px 10px;font-size:12px;">Delete</button></div>').join('');
        });
      });
    });
  });
  
  // Results
  const RESULTS = document.createElement('div');
  RESULTS.id = 'results';
  RESULTS.style.marginTop = '20px';
  RESULTS.style.display = 'grid';
  RESULTS.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  RESULTS.style.gap = '12px';
  
  document.querySelector('h2').parentElement.after(RESULTS);
  
  document.getElementById('load-results').onclick = async () => {
    try {
      const logs = await API.get('/api/runs');
      RESULTS.innerHTML = logs.map(run => {
        const model = run?.response?.model || run?.model || run?.modelName || '?';
        const response = JSON.stringify(run?.response?.choices?.[0]?.message?.content || run?.response?.content || run?.response || '', null, 2).substring(0, 400);
        return '<div class="result-card" style="border:1px solid #ddd;padding:15px;border-radius:4px;background:#f9f9f9;"><h4 style="margin-bottom:8px;font-size:14px;color:#333;">' + model + '</h4><pre style="font-size:11px;color:#888;font-family:monospace;word-break:break-all;max-height:150px;overflow-y:auto;">' + response + '</pre></div>';
      }).join('');
    } catch(e) {
      console.error('Failed to load results:', e);
    }
  };
  
  document.getElementById('export-json').onclick = async () => {
    try {
      const prompts = await API.get('/api/prompts');
      const logs = await API.get('/api/runs');
      const data = JSON.stringify({systems: [], prompts, logs}, null, 2);
      const blob = new Blob([data], {type: 'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'llm-test-export.json';
      a.click();
    } catch(e) {
      console.error('Failed to export:', e);
    }
  };
};

app();