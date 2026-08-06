document.addEventListener('DOMContentLoaded', function () {
    renderStats();
    renderBestSellers();
    renderForums();
    initClock();
    initFilter();
    initNavToggle();
    initYear();
});

// 1. Statistik / info box
const statsData = [
    { icon: 'fa-users',  boxClass: 'bg-aqua',   label: 'Members',    value: '70,007', pct: 100, desc: '70% Members Aktif' },
    { icon: 'fa-thumbs-o-up', boxClass: 'bg-green', label: 'Projects', value: '827',    pct: 70,  desc: 'Source Code + DB' },
    { icon: 'fa-comment', boxClass: 'bg-yellow', label: 'Topic',     value: '4,751',  pct: 35,  desc: '4 Kategori Topic' },
    { icon: 'fa-comments-o', boxClass: 'bg-red',   label: 'Comments', value: '13,095', pct: 0,   desc: 'Solusi Masalah Anda' }
];

function renderStats() {
    const wrap = document.getElementById('stats');
    wrap.innerHTML = statsData.map(s => `
        <a class="info-box" href="#">
            <span class="info-box-icon ${s.boxClass}"><i class="fa ${s.icon}"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">${s.label}</span>
                <span class="info-box-number">${s.value}</span>
                <div class="progress"><div class="progress-bar" style="width:${s.pct}%"></div></div>
                <span class="progress-description">${s.desc}</span>
            </div>
        </a>
    `).join('');
}

// 2. Produk terlaris (sidebar)
const products = [
    { name: 'System IF POS Klinik',     price: 'Rp 1,000,000', owner: 'Kang Ipan' },
    { name: 'Toko Online Laravel 2026', price: 'Rp 2,000,000', owner: 'Dahry' },
    { name: 'HRIS Payroll & Absensi',   price: 'Rp 3,500,000', owner: 'Ahmad A' },
    { name: 'Website Online Store CI 3',price: 'Rp 450,000',   owner: 'Darnell' }
];

function renderBestSellers() {
    document.getElementById('bestSellerList').innerHTML = products
        .map(p => `<li><a href="#">${p.name}</a><div class="rssSummary">${p.price} — ${p.owner}</div></li>`)
        .join('');
}

// 3. Forum diskusi
const forums = [
    { title: 'Cara Upload Project CI 4',          comment: '3 Comment' },
    { title: 'Reset Nilai Auto Increment MySQL',  comment: '6 Comment' },
    { title: 'Buat Filter Tanggal di CI 3',       comment: '2 Comment' }
];

function renderForums() {
    document.getElementById('forumList').innerHTML = forums
        .map(f => `<li><a href="#">${f.title}</a><div class="rssSummary">${f.comment}</div></li>`)
        .join('');
}

// 4. Jam realtime
function initClock() {
    const el = document.getElementById('currentTime');
    function tick() {
        el.textContent = new Date().toLocaleTimeString('id-ID');
    }
    tick();
    setInterval(tick, 1000);
}

// 5. Filter produk cepat
function initFilter() {
    const input = document.getElementById('productFilter');
    input.addEventListener('input', function () {
        const q = this.value.toLowerCase();
        const grid = document.getElementById('productGrid');
        grid.innerHTML = products
            .filter(p => p.name.toLowerCase().includes(q))
            .map(p => `
                <div class="feature-list">
                    <b>${p.name}</b>
                    <ul>
                        <li>${p.price}</li>
                        <li>Owner: ${p.owner}</li>
                    </ul>
                </div>
            `)
            .join('') || '<div class="feature-list"><b>Tidak ada hasil</b></div>';
    });
}

// 6. Mobile menu toggle
function initNavToggle() {
    const btn = document.getElementById('navToggle');
    const nav = document.getElementById('primaryNav');
    btn.addEventListener('click', () => nav.classList.toggle('open'));
}

// 7. Tahun footer
function initYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}