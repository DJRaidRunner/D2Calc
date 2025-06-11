const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

function loadJSON(name) {
  const filePath = path.join(__dirname, 'data', name);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

contextBridge.exposeInMainWorld('api', {
  getInputs: () => loadJSON('inputs.json'),
  getKeywords: () => loadJSON('keywords.json')
});
