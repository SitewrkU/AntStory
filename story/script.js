const poemDiv = document.getElementById('poem');
const currentPage = window.location.pathname.split("/").pop().split(".")[0];
console.log('Current page key:', currentPage);

const text = days[currentPage];

if (!text) {
    console.error(`Текст для сторінки '${currentPage}' не знайдено у days`);
} else {
    const poemDiv = document.getElementById('poem');

    function renderPoem() {
        const savedSetting = localStorage.getItem('useCharacterStyles');
        const useStyles = savedSetting === 'true';
        console.log('useStyles:', useStyles);

        const lines = text.split('\n');

        const styledLines = lines.map(line => {
            const trimmed = line.trim();

            if (trimmed.startsWith('*')) {
                return `<span style="color:#a8a8a8;">${line}</span>`;
            } else if (trimmed.startsWith('+')) {
                return `<span style="color:rgb(212, 255, 172);">${line}</span>`;
            } else if (trimmed.startsWith('-')) {
                return `<span style="color:rgb(255, 198, 198);">${line}</span>`;

            } else if (useStyles && (trimmed.startsWith('>') || trimmed.startsWith('Р>'))) {
                return `<span class="d-main">${line}</span>`;
            } else if (useStyles && (trimmed.startsWith('Шая -') || trimmed.startsWith('Р.Шая -'))) {
                return `<span class="d-red">${line}</span>`;
            } else if (useStyles && (trimmed.startsWith('Скайлар -') || trimmed.startsWith('Р.Скайлар -'))) {
                return `<span class="d-bl">${line}</span>`;
            } else if (useStyles && (trimmed.startsWith('Вихор -') || trimmed.startsWith('Р.Вихор -'))) {
                return `<span class="d-gr">${line}</span>`;
            } else if (useStyles && trimmed.startsWith('Міраж -')) {
                return `<span class="d-pr">${line}</span>`;
            } else if (useStyles && trimmed.startsWith('Мондо -')) {
                return `<span class="d-orn">${line}</span>`;
            } else if (useStyles && trimmed.startsWith('Астра -')) {
                return `<span class="d-pnk">${line}</span>`;
            } else if (useStyles && trimmed.startsWith('??? -')) {
                return `<span class="d-drk">${line}</span>`;
            } else if (useStyles && /^([\p{L}']+\s*){1,2}-\s+/u.test(trimmed)) {
                return `<span class="d-def">${line}</span>`;
            } else {
                return line;
            }
        });

        poemDiv.innerHTML = styledLines.join('\n');
    }

    renderPoem();
}


function goToNextDay() {
  const current = window.location.pathname;
  const match = current.match(/day(\d+)\.html/);
  
  if (match) {
    const currentDay = parseInt(match[1]);
    const nextDay = currentDay + 1;
    const nextUrl = `day${nextDay}.html`;
    window.location.href = nextUrl;
  } else {
    console.error("Не вдалося визначити номер сторінки 🥲");
  }
}


function applySavedFont() {
  const savedFont = localStorage.getItem('userFont');
  if (savedFont) {
    poemDiv.style.fontFamily = savedFont;
  }
}

document.addEventListener('DOMContentLoaded', applySavedFont);