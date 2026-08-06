document.addEventListener('DOMContentLoaded', function () {
    renderStats();
    renderProjects();
    renderBestSellers();
    renderForums();
    initClock();
    initNavToggle();
    initYear();
});

// 1. Statistik / info box
const statsData = [
    { icon: 'fa-solid fa-users',        boxClass: 'bg-aqua',   label: 'Members',    value: '70,007', pct: 100, desc: '70% Members Aktif' },
    { icon: 'fa-solid fa-thumbs-up',    boxClass: 'bg-green', label: 'Projects', value: '827',    pct: 70,  desc: 'Source Code + DB' },
    { icon: 'fa-solid fa-comment',      boxClass: 'bg-yellow', label: 'Topic',     value: '4,751',  pct: 35,  desc: '4 Kategori Topic' },
    { icon: 'fa-solid fa-comments',     boxClass: 'bg-red',   label: 'Comments', value: '13,095', pct: 0,   desc: 'Solusi Masalah Anda' }
];

function renderStats() {
    const wrap = document.getElementById('stats');
    if (!wrap) return;
    wrap.innerHTML = statsData.map(s => `
        <a class="info-box" href="#">
            <span class="info-box-icon ${s.boxClass}"><i class="${s.icon}"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">${s.label}</span>
                <span class="info-box-number">${s.value}</span>
                <div class="progress"><div class="progress-bar" style="width:${s.pct}%"></div></div>
                <span class="progress-description">${s.desc}</span>
            </div>
        </a>
    `).join('');
}

// 2. Project remote
const projects = [
    { name: 'Pengembangan Sistem POS',        price: 'Rp 1,000,000', owner: 'Kang Ipan' },
    { name: 'Webview + FireBase',             price: 'Rp 350,000',   owner: 'Roki Hasri' },
    { name: 'Sistem ERP Codeigniter 4',       price: 'Rp 5,000,000', owner: 'Aldhitya' },
    { name: 'Sistem Info Keuangan Yayasan',   price: 'Rp 4,500,000', owner: 'Masrofi' }
];

function renderProjects() {
    const el = document.getElementById('projectList');
    if (!el) return;
    el.innerHTML = projects
        .map(p => `<li><a href="#">${p.name}</a><div class="rssSummary">${p.price} — Owner : ${p.owner}</div></li>`)
        .join('');
}

// 3. Forum jual beli / produk terlaris
const bestSellers = [
    { name: 'Sourcecode Toko Online 2026',   price: 'Rp 2,000,000', owner: 'Dahry' },
    { name: '[PROMO] HRIS Payroll',          price: 'Rp 3,500,000', owner: 'Ahmad A' },
    { name: 'WEB PROFIL SEKOLAH PLUS',       price: 'Rp 4,750,000', owner: 'Ugin' },
    { name: 'Booking Hotel Management',      price: 'Rp 1,250,000', owner: 'Dahry' }
];

function renderBestSellers() {
    const el = document.getElementById('bestSellerList');
    if (!el) return;
    el.innerHTML = bestSellers
        .map(p => `<li><a href="#">${p.name}</a><div class="rssSummary">${p.price} — Seller : ${p.owner}</div></li>`)
        .join('');
}

// 4. Forum diskusi
const forums = [
    { title: 'Cara Upload Project CI 4 Ke hosting', comment: '0 Comment' },
    { title: 'Reset Nilai Auto Increment MySQL',     comment: '6 Comment' },
    { title: 'Buat Filter Tanggal di CI 3',          comment: '2 Comment' },
    { title: 'Posting Berita Tidak Muncul di CMS',   comment: '0 Comment' }
];

function renderForums() {
    const el = document.getElementById('forumList');
    if (!el) return;
    el.innerHTML = forums
        .map(f => `<li><a href="#">${f.title}</a><div class="rssSummary">${f.comment}</div></li>`)
        .join('');
}

// 5. Jam realtime
function initClock() {
    const el = document.getElementById('currentTime');
    if (!el) return;
    function tick() { el.textContent = new Date().toLocaleTimeString('id-ID'); }
    tick();
    setInterval(tick, 1000);
}

// 6. Mobile menu toggle
function initNavToggle() {
    const btn = document.getElementById('pull');
    const navWrap = document.querySelector('.primary-navigation');
    if (!btn || !navWrap) return;
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        navWrap.classList.toggle('open');
    });
}

// 7. Tahun footer
function initYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
}