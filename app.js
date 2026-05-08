// ===== UNIVERSIDAD CENTRAL — UTILIDADES GLOBALES =====

// ── Toast notifications ──
function showToast(message, type = 'success', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  const colors = { success: 'var(--success)', error: 'var(--danger)', info: 'var(--info)', warning: 'var(--gold)' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="color:${colors[type]};font-size:16px;font-weight:700">${icons[type]}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Modal helpers ──
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}
// Close on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ── Active nav link ──
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === page);
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);

// ── Animate numbers ──
function animateCounter(el, target, duration = 1200) {
  const start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// ── Format currency (COP) ──
function formatCOP(amount) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
}

// ── Format date ──
function formatDate(date) {
  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
}

// ── Debounce ──
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ── Table search filter ──
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', debounce(() => {
    const q = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }));
}

// ── Mobile sidebar toggle ──
function initMobileSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

document.addEventListener('DOMContentLoaded', initMobileSidebar);

// ── Grade color helper ──
function gradeColor(grade) {
  if (grade >= 4.5) return 'var(--success)';
  if (grade >= 3.5) return 'var(--info)';
  if (grade >= 3.0) return 'var(--gold)';
  return 'var(--danger)';
}

// ── Shared student data (simulate localStorage) ──
const AppData = {
  student: {
    name: 'Carlos Andrés Gómez',
    code: '2021-0834',
    program: 'Ingeniería de Sistemas',
    semester: '6to Semestre',
    avatar: 'CG'
  },
  subjects: [
    { id: 1, name: 'Estructuras de Datos',      code: 'ISI-301', credits: 4, teacher: 'Dr. Ramírez', schedule: 'L-Mi 8:00-10:00', room: 'A-204' },
    { id: 2, name: 'Cálculo Diferencial',         code: 'MAT-201', credits: 3, teacher: 'Dra. López',  schedule: 'M-J 10:00-12:00', room: 'B-101' },
    { id: 3, name: 'Bases de Datos',              code: 'ISI-302', credits: 4, teacher: 'Mg. Torres',  schedule: 'L-Mi 14:00-16:00', room: 'Lab-3' },
    { id: 4, name: 'Ingeniería de Software',      code: 'ISI-303', credits: 3, teacher: 'Dr. Vargas',  schedule: 'M-J 8:00-10:00',  room: 'A-310' },
    { id: 5, name: 'Redes de Computadores',       code: 'ISI-304', credits: 3, teacher: 'Mg. Herrera', schedule: 'V 7:00-11:00',    room: 'Lab-1' },
    { id: 6, name: 'Electiva: IA y ML',          code: 'ELE-401', credits: 2, teacher: 'Dr. Castro',  schedule: 'J 14:00-16:00',   room: 'A-205' },
  ]
};