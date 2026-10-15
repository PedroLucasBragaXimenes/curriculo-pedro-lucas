const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  themeIcon.textContent = next === 'dark' ? '☼' : '☾';
  document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#0b1110' : '#f2f6f2';
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

const copyButton = document.getElementById('copy-email');
const email = document.getElementById('email-text').textContent.trim();
const feedback = document.getElementById('copy-feedback');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyButton.innerHTML = '✓ E-mail copiado!';
    feedback.textContent = 'Endereço copiado para a área de transferência.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('email-text'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    feedback.textContent = 'Selecione o endereço acima e copie com Ctrl+C.';
  }
  window.setTimeout(() => { copyButton.innerHTML = 'Copiar e-mail <span>↗</span>'; }, 2200);
});
