const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const inputFile = path.join(__dirname, 'data', 'poc_inputs.csv');
const keywordFile = path.join(__dirname, 'data', 'poc_keywords.csv');

let inputs = [];
let keywordMap = {};

function loadCSV(filePath, callback) {
  const file = fs.readFileSync(filePath, 'utf8');
  Papa.parse(file, {
    header: true,
    complete: function(results) {
      callback(results.data);
    }
  });
}

function colorizeText(text) {
  for (const [keyword, color] of Object.entries(keywordMap)) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    text = text.replace(regex, `<span style="color:${color}">${keyword}</span>`);
  }
  return text;
}

function updateOutput(selected) {
  const outputList = document.getElementById('outputList');
  outputList.innerHTML = '';

  const result = inputs.find(row => row.Input === selected);
  if (result) {
    const item = document.createElement('li');
    item.innerHTML = colorizeText(result.Output);
    outputList.appendChild(item);
  }
}

function init() {
  // First load keywords
  loadCSV(keywordFile, (keywordData) => {
    keywordMap = Object.fromEntries(keywordData.map(row => [row.Keyword, row.Color]));

    // THEN load inputs
    loadCSV(inputFile, (inputData) => {
      inputs = inputData;

      const dropdown = document.getElementById('dropdown');
      inputs.forEach(entry => {
        const option = document.createElement('option');
        option.value = entry.Input;
        option.textContent = entry.Input;
        dropdown.appendChild(option);
      });

      dropdown.addEventListener('change', (e) => {
        updateOutput(e.target.value);
      });

      if (inputs.length > 0) {
        dropdown.value = inputs[0].Input;
        updateOutput(inputs[0].Input);
      }
    });
  });
}


window.onload = init;
