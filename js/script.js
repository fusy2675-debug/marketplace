document.addEventListener('DOMContentLoaded', function () {
    renderStats();
    renderCategories();
    renderProducts();
    initProductFilter();
    initAddToCart();
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

// 2. Kategori produk
const categories = [
    { icon: 'fa-solid fa-mobile-screen',   label: 'Elektronik' },
    { icon: 'fa-solid fa-shirt',           label: 'Fashion' },
    { icon: 'fa-solid fa-book',            label: 'Buku' },
    { icon: 'fa-solid fa-utensils',        label: 'F&B' },
    { icon: 'fa-solid fa-couch',           label: 'Home & Living' },
    { icon: 'fa-solid fa-gamepad',         label: 'Gaming' }
];

function renderCategories() {
    const el = document.getElementById('categoryGrid');
    if (!el) return;
    el.innerHTML = categories
        .map(c => `<div class="category-item"><i class="fa-solid ${c.icon}"></i><span>${c.label}</span></div>`)
        .join('');
}

// 3. Produk
const products = [
    { name: 'Smartphone X Pro 5G',       store: 'Gadget Store', price: 3499000, old: 3999000, disc: '12%' },
    { name: 'Kemeja Flannel Pria',       store: 'FashionID',   price: 179000,  old: 220000,  disc: '18%' },
    { name: 'Novel Best Seller 2026',    store: 'Buku Kita',    price: 98000,   old: 120000,  disc: '20%' },
    { name: 'Headset Gaming RGB',        store: 'TechZone',     price: 295000,  old: 350000,  disc: '15%' },
    { name: 'Jam Tangan Analog',        store: 'Accessories',   price: 375000,  old: null,    disc: null },
    { name: 'Sepatu Sneakers',          store: 'Footwear',      price: 450000,  old: 520000,  disc: '13%' },
    { name: 'Tas Ransel Premium',        store: 'BagsID',        price: 210000,  old: null,    disc: null },
    { name: 'Lampu LED Smart',          store: 'HomeSet',        price: 89000,   old: 110000,  disc: '19%' }
];

function formatIDR(n) { return 'Rp ' + n.toLocaleString('id-ID'); }

function productCard(p) {
    const disc = p.disc ? `<span class="product-discount">-${p.disc}</span>` : '';
    const old = p.old ? `<span class="old">${formatIDR(p.old)}</span>` : '';
    return `
        <div class="product-card" data-name="${p.name.toLowerCase()}">
            ${disc}
            <div class="product-thumb"><i class="fa-solid fa-cube"></i></div>
            <div class="product-body">
                <div class="product-name">${p.name}</div>
                <div class="product-store"><i class="fa-solid fa-store"></i> ${p.store}</div>
                <div class="product-price">${old}${formatIDR(p.price)}</div>
                <button class="add-cart" data-name="${p.name}"><i class="fa-solid fa-cart-plus"></i> Masukkan Keranjang</button>
            </div>
        </div>`;
}

function renderProducts() {
    const el = document.getElementById('productGrid');
    if (!el) return;
    el.innerHTML = products.map(productCard).join('');
}

// 4. Filter produk
function initProductFilter() {
    const input = document.getElementById('productFilter');
    if (!input) return;
    input.addEventListener('input', function () {
        const q = this.value.toLowerCase();
        const grid = document.getElementById('productGrid');
        const filtered = products.filter(p => p.name.toLowerCase().includes(q));
        grid.innerHTML = filtered.length
            ? filtered.map(productCard).join('')
            : '<p style="color:#94a3b8">Tidak ada produk ditemukan.</p>';
    });
}

// 5. Keranjang
let cartItems = [];
function initAddToCart() {
    document.addEventListener('click', function (e) {
        if (e.target.closest('.add-cart')) {
            const name = e.target.closest('.add-cart').dataset.name;
            cartItems.push(name);
            document.getElementById('cartCount').textContent = cartItems.length;
            alert(name + ' ditambahkan ke keranjang!');
        }
    });
}

// 6. Project remote
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