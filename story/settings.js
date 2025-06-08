const toggle = document.getElementById('toggleCharacters');
const saved = localStorage.getItem('useCharacterStyles');
toggle.checked = saved === 'true';

toggle.addEventListener('change', () => {
  localStorage.setItem('useCharacterStyles', toggle.checked ? 'true' : 'false');
});


//Шрифти
const fontOptions = document.querySelectorAll('.font-option');

function applyFontHighlight(selectedFont) {
  fontOptions.forEach(option => {
    option.classList.toggle('active', option.dataset.font === selectedFont);
  });
}

function initFontSelection() {
  let currentFont = localStorage.getItem('userFont');

  //Якщо немає шрифта
  if (!currentFont) {
    currentFont = fontOptions[0].dataset.font;
    localStorage.setItem('userFont', currentFont);
  }
  applyFontHighlight(currentFont);

  
  fontOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedFont = option.dataset.font;
      localStorage.setItem('userFont', selectedFont);
      applyFontHighlight(selectedFont);
    });
  });
}

document.addEventListener('DOMContentLoaded', initFontSelection);
//---------