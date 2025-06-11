function validateColor(value) {
  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value);
}

function flattenKeywords(data) {
  const map = {};
  for (const category of Object.values(data)) {
    for (const [keyword, color] of Object.entries(category)) {
      map[keyword] = color;
    }
  }
  return map;
}

function colorizeText(text, keywords) {
  for (const [keyword, color] of Object.entries(keywords)) {
    if (!validateColor(color)) continue;
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    text = text.replace(regex, `<span data-color="${color}">${keyword}</span>`);
  }
  return text;
}

function updateStyles() {
  document.querySelectorAll('span[data-color]').forEach(span => {
    span.style.color = span.dataset.color;
  });
}

function updateOutput(selected, inputs, keywords) {
  const outputList = document.getElementById('outputList');
  outputList.innerHTML = '';
  const result = inputs.find(row => row.input === selected);
  if (result) {
    const item = document.createElement('li');
    item.innerHTML = colorizeText(result.output, keywords);
    outputList.appendChild(item);
    updateStyles();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const inputs = window.api.getInputs();
  const keywordData = window.api.getKeywords();
  const keywordMap = flattenKeywords(keywordData);

  const dropdown = document.getElementById('dropdown');
  inputs.forEach(entry => {
    const option = document.createElement('option');
    option.value = entry.input;
    option.textContent = entry.input;
    dropdown.appendChild(option);
  });

  dropdown.addEventListener('change', (e) => {
    updateOutput(e.target.value, inputs, keywordMap);
  });

  if (inputs.length > 0) {
    dropdown.value = inputs[0].input;
    updateOutput(inputs[0].input, inputs, keywordMap);
  }
});
