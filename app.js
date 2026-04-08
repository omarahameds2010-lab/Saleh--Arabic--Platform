/* ============================================================
   SALEH ARABIC PLATFORM — SHARED JAVASCRIPT
   ============================================================ */

'use strict';

// ── PLATFORM STATE (simulated localStorage) ──────────────────
const Platform = {
  currentUser: null,
  role: null, // 'admin' | 'student'

  // Simulated DB
  db: {
    students: [
      { id: 1, name: 'فاطمة الزهراء', phone: '01012345678', grade: 'الأول الثانوي', score: 98.5, active: true, device: 'iPhone 14', joined: '2024-09-01', wallet: 150, courses: [1,2] },
      { id: 2, name: 'محمد إبراهيم', phone: '01098765432', grade: 'الثاني الثانوي', score: 96.0, active: true, device: 'Samsung S23', joined: '2024-09-03', wallet: 200, courses: [1] },
      { id: 3, name: 'نور الهدى سعيد', phone: '01155544433', grade: 'الثالث الثانوي', score: 94.5, active: false, device: 'Xiaomi 12', joined: '2024-09-10', wallet: 50, courses: [1,2,3] },
      { id: 4, name: 'عبد الرحمن خالد', phone: '01234567890', grade: 'الأول الثانوي', score: 93.2, active: true, device: 'iPhone 13', joined: '2024-09-15', wallet: 0, courses: [2] },
      { id: 5, name: 'مريم أحمد', phone: '01122334455', grade: 'الثاني الثانوي', score: 91.8, active: true, device: 'OPPO A96', joined: '2024-10-01', wallet: 300, courses: [1,3] },
    ],
    courses: [
      { id: 1, title: 'الفصل الدراسي الأول', term: 'ترم أول', lessons: 24, price: 150, students: 3200, rating: 4.9, thumbnail: '📚' },
      { id: 2, title: 'الفصل الدراسي الثاني', term: 'ترم ثاني', lessons: 22, price: 150, students: 2800, rating: 4.8, thumbnail: '📖' },
      { id: 3, title: 'مراجعة نهائية شاملة', term: 'مراجعة', lessons: 10, price: 80, students: 1800, rating: 5.0, thumbnail: '🎯' },
    ],
    lessons: [
      { id: 1, courseId: 1, title: 'الفعل المضارع وأحواله', duration: '45:20', views: 1240, date: '2024-09-15', locked: false },
      { id: 2, courseId: 1, title: 'الجملة الاسمية والفعلية', duration: '38:10', views: 980, date: '2024-09-22', locked: false },
      { id: 3, courseId: 1, title: 'علامات الإعراب الأصلية', duration: '52:05', views: 870, date: '2024-09-29', locked: false },
      { id: 4, courseId: 1, title: 'الأسماء الستة', duration: '41:30', views: 650, date: '2024-10-06', locked: true },
      { id: 5, courseId: 1, title: 'الأفعال الخمسة', duration: '35:45', views: 0, date: '2024-10-13', locked: true },
    ],
    exams: [
      { id: 1, title: 'امتحان الوحدة الأولى', courseId: 1, questions: 20, time: 30, date: '2024-10-15', attempts: 180, avgScore: 78 },
      { id: 2, title: 'امتحان شهر أكتوبر', courseId: 1, questions: 30, time: 45, date: '2024-10-28', attempts: 210, avgScore: 82 },
    ],
    revenue: {
      today: 82400,
      month: 1240000,
      total: 8500000,
      chart: [45000, 62000, 38000, 78000, 55000, 92000, 82400],
    },
    notifications: [
      { id: 1, text: 'طالب جديد: أحمد محمود', time: 'منذ 5 دقائق', read: false, icon: '👤' },
      { id: 2, text: 'انتهى امتحان الوحدة الأولى', time: 'منذ ساعة', read: false, icon: '📝' },
      { id: 3, text: 'تحويل بنكي جديد بانتظار التأكيد', time: 'منذ 3 ساعات', read: true, icon: '💰' },
    ]
  },

  login(role) {
    this.role = role;
    this.currentUser = role === 'admin'
      ? { name: 'أستاذ صالح حسين', role: 'مدرس اللغة العربية', avatar: 'ص' }
      : { name: 'فاطمة الزهراء', role: 'طالبة - الأول الثانوي', avatar: 'ف' };
    try { localStorage.setItem('saleh_role', role); } catch(e) {}
  },

  logout() {
    this.role = null; this.currentUser = null;
    try { localStorage.removeItem('saleh_role'); } catch(e) {}
    window.location.href = 'auth.html';
  },

  checkAuth(required) {
    try {
      const saved = localStorage.getItem('saleh_role');
      if (saved) { this.login(saved); return true; }
    } catch(e) {}
    if (required) { window.location.href = 'auth.html'; return false; }
    return false;
  }
};

// ── UI UTILITIES ─────────────────────────────────────────────
const UI = {
  toast(message, type = 'info', duration = 3500) {
    const colors = { info: '#00B4D8', success: '#00DC82', danger: '#FF4757', warning: '#FFA502' };
    const icons  = { info: 'ℹ️', success: '✅', danger: '❌', warning: '⚠️' };
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; bottom:24px; left:24px; z-index:9999;
      background:#0D1220; border:1px solid ${colors[type]}44;
      border-right:3px solid ${colors[type]};
      padding:14px 20px; border-radius:12px; font-family:'Cairo',sans-serif;
      font-size:.88rem; color:#E8EDF8; max-width:320px; direction:rtl;
      display:flex; align-items:center; gap:10px; box-shadow:0 8px 32px rgba(0,0,0,.5);
      animation:slideIn .3s ease; font-weight:600;
    `;
    el.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    const style = document.createElement('style');
    style.textContent = `@keyframes slideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`;
    document.head.appendChild(style);
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = '.3s'; setTimeout(() => el.remove(), 300); }, duration);
  },

  confirm(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9998;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);';
    overlay.innerHTML = `
      <div style="background:#121929;border:1px solid rgba(212,175,55,.2);border-radius:20px;padding:32px;width:360px;text-align:center;font-family:'Cairo',sans-serif;direction:rtl;">
        <div style="font-size:2rem;margin-bottom:16px;">⚠️</div>
        <h3 style="font-family:'Tajawal',sans-serif;font-size:1.1rem;font-weight:800;margin-bottom:12px;color:#E8EDF8;">${message}</h3>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:24px;">
          <button id="cfm-yes" style="background:linear-gradient(135deg,#FF4757,#c0392b);color:#fff;border:none;padding:11px 28px;border-radius:10px;font-family:'Cairo',sans-serif;font-weight:700;cursor:pointer;font-size:.88rem;">تأكيد</button>
          <button id="cfm-no" style="background:rgba(255,255,255,.07);color:#9AAAC8;border:1px solid rgba(255,255,255,.1);padding:11px 28px;border-radius:10px;font-family:'Cairo',sans-serif;font-weight:700;cursor:pointer;font-size:.88rem;">إلغاء</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#cfm-yes').onclick = () => { onConfirm(); overlay.remove(); };
    overlay.querySelector('#cfm-no').onclick = () => overlay.remove();
    overlay.onclick = (e) => { if(e.target === overlay) overlay.remove(); };
  },

  loading(show, container) {
    const el = container || document.getElementById('loading-overlay');
    if (!el) return;
    el.style.display = show ? 'flex' : 'none';
  },

  formatNum(n) { return n?.toLocaleString('ar-EG') || '0'; },
  formatDate(d) { return new Date(d).toLocaleDateString('ar-EG', { year:'numeric', month:'long', day:'numeric' }); },

  animateValue(el, start, end, duration = 1000) {
    const range = end - start; let current = start;
    const step = Math.abs(range) / (duration / 16);
    const timer = setInterval(() => {
      current += range > 0 ? step : -step;
      if ((range > 0 && current >= end) || (range < 0 && current <= end)) { current = end; clearInterval(timer); }
      el.textContent = this.formatNum(Math.floor(current));
    }, 16);
  }
};

// ── SIDEBAR ──────────────────────────────────────────────────
function initSidebar() {
  const user = Platform.currentUser;
  if (!user) return;

  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  const avEl   = document.getElementById('sidebar-user-avatar');
  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role;
  if (avEl) avEl.textContent = user.avatar;

  // Active nav item
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.page === path) item.classList.add('active');
  });

  // Mobile toggle
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.onclick = () => sidebar.classList.toggle('mobile-open');
  }

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.onclick = () => {
    UI.confirm('هتخرج من الحساب؟', () => Platform.logout());
  };
}

// ── NOTIFICATIONS ────────────────────────────────────────────
function initNotifications() {
  const btn = document.getElementById('notif-btn');
  const panel = document.getElementById('notif-panel');
  if (!btn || !panel) return;

  const unread = Platform.db.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notif-badge');
  if (badge) badge.textContent = unread;

  btn.onclick = (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
    renderNotifications();
  };

  document.addEventListener('click', () => panel.classList.remove('open'));
  panel.addEventListener('click', e => e.stopPropagation());
}

function renderNotifications() {
  const list = document.getElementById('notif-list');
  if (!list) return;
  list.innerHTML = Platform.db.notifications.map(n => `
    <div style="display:flex;gap:12px;padding:12px;border-radius:10px;background:${n.read ? 'transparent' : 'rgba(0,180,216,0.06)'};border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;" onclick="markRead(${n.id})">
      <span style="font-size:1.2rem">${n.icon}</span>
      <div style="flex:1">
        <div style="font-size:.82rem;font-weight:600;color:#E8EDF8">${n.text}</div>
        <div style="font-size:.72rem;color:#6B7FA8;margin-top:3px">${n.time}</div>
      </div>
      ${!n.read ? '<span style="width:8px;height:8px;border-radius:50%;background:#00B4D8;flex-shrink:0;margin-top:4px;display:block"></span>' : ''}
    </div>`).join('');
}

function markRead(id) {
  const n = Platform.db.notifications.find(x => x.id === id);
  if (n) { n.read = true; renderNotifications(); initNotifications(); }
}

// ── FOOTER ───────────────────────────────────────────────────
function renderFooter(container) {
  const el = container || document.getElementById('platform-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-logo">🎓 منصة <span>أستاذ صالح حسين</span></div>
        <div class="footer-copy mt-8">© 2025 جميع الحقوق محفوظة | aللغة العربية</div>
      </div>
      <div class="text-center">
        <div class="footer-copy">مبنية بأقوى تقنيات الويب الحديثة</div>
      </div>
      <div class="text-center">
        <div class="footer-dev">صُنعت بـ ❤️ بواسطة <a href="https://omarahameds2010-lab.github.io/omar-os/certificates.html" target="_blank">عمر أحمد</a></div>
        <div class="footer-copy mt-8">Software Engineer | Web Developer | Cybersecurity</div>
      </div>
    </div>`;
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFooter();
  initSidebar();
  initNotifications();

  // Intersection observer for animate-in
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-in').forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'all .6s cubic-bezier(.16,1,.3,1)'; io.observe(el); });
});
