// ==========================================
// WARUNG AGRU STORE - POS & INVENTORY JS
// ==========================================

let products = [
    { id: 1, name: 'Kopi Susu Aren Signature', category: 'Minuman', buyPrice: 10000, sellPrice: 18000, stock: 25, icon: 'fa-solid fa-mug-hot' },
    { id: 2, name: 'Mie Instan Goreng Spesial', category: 'Makanan', buyPrice: 3500, sellPrice: 7000, stock: 4, icon: 'fa-solid fa-bowl-food' },
    { id: 3, name: 'Roti Bakar Coklat Keju', category: 'Makanan', buyPrice: 8000, sellPrice: 15000, stock: 12, icon: 'fa-solid fa-bread-slice' },
    { id: 4, name: 'Es Teh Manis Jumbo', category: 'Minuman', buyPrice: 2000, sellPrice: 5000, stock: 50, icon: 'fa-solid fa-glass-water' },
    { id: 5, name: 'Minyak Goreng 1L', category: 'Sembako', buyPrice: 15000, sellPrice: 18500, stock: 3, icon: 'fa-solid fa-bottle-droplet' },
    { id: 6, name: 'Beras Premium 5kg', category: 'Sembako', buyPrice: 65000, sellPrice: 72000, stock: 8, icon: 'fa-solid fa-sack-dollar' },
    { id: 7, name: 'Powerbank 10000mAh', category: 'Elektronik', buyPrice: 95000, sellPrice: 135000, stock: 2, icon: 'fa-solid fa-battery-full' },
    { id: 8, name: 'Kabel Data Type-C', category: 'Elektronik', buyPrice: 15000, sellPrice: 25000, stock: 15, icon: 'fa-solid fa-charging-station' },
    { id: 9, name: 'Keripik Singkong Balado', category: 'Makanan', buyPrice: 6000, sellPrice: 10000, stock: 20, icon: 'fa-solid fa-cookie' },
    { id: 10, name: 'Telur Ayam Nestro 10 Butir', category: 'Sembako', buyPrice: 20000, sellPrice: 24000, stock: 15, icon: 'fa-solid fa-egg' },
    { id: 11, name: 'Indomie Goreng Original', category: 'Makanan', buyPrice: 4000, sellPrice: 6500, stock: 0, icon: 'fa-solid fa-bowl-food' },
    { id: 12, name: 'Susu Sachet Coklat 250ml', category: 'Minuman', buyPrice: 4500, sellPrice: 7500, stock: 30, icon: 'fa-solid fa-glass-whiskey' },
    { id: 13, name: 'Cheetos Pedas', category: 'Makanan', buyPrice: 7000, sellPrice: 12000, stock: 6, icon: 'fa-solid fa-bag-of-chips' },
    { id: 14, name: 'Teh Botol Hangets', category: 'Minuman', buyPrice: 3500, sellPrice: 6000, stock: 18, icon: 'fa-solid fa-glass-water' },
    { id: 15, name: 'Sambal Matah', category: 'Sembako', buyPrice: 12000, sellPrice: 16000, stock: 9, icon: 'fa-solid fa-pepper-hot' },
    { id: 16, name: 'Keripik Tempe Original', category: 'Makanan', buyPrice: 8000, sellPrice: 13000, stock: 11, icon: 'fa-solid fa-cookie-bite' },
    { id: 17, name: 'Flashdisk 32GB', category: 'Elektronik', buyPrice: 55000, sellPrice: 85000, stock: 1, icon: 'fa-solid fa-thumb-tack' },
    { id: 18, name: ' Charger HP 18W', category: 'Elektronik', buyPrice: 25000, sellPrice: 40000, stock: 7, icon: 'fa-solid fa-charging-station' },
    { id: 19, name: 'Bubur Ayam Komplit', category: 'Makanan', buyPrice: 7500, sellPrice: 12000, stock: 3, icon: 'fa-solid fa-bowl-food' }
];

let cart = [];
let transactions = [
    { id: 'AGRU-20260807-001', date: '07 Aug 2026, 10:15', items: [{name:'Kopi Susu Aren', qty:2, price:18000}], total: 36000, method: 'Tunai', cash: 50000, change: 14000, subtotal: 36000, discount: 0 }
];

let currentPaymentMethod = 'Tunai';
let selectedCategoryPos = 'All';

document.addEventListener('DOMContentLoaded', function () {
    initClock();
    initNavigation();
    renderDashboard();
    renderPosCatalog();
    renderInventoryTable();
    updateCartCalculation();
});

// Navigation Tabs
function initNavigation() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            switchTab(target);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    const btn = document.querySelector(`.nav-btn[data-target="${tabName}"]`);
    const pane = document.getElementById(`tab-${tabName}`);

    if (btn) btn.classList.add('active');
    if (pane) pane.classList.add('active');

    if (tabName === 'dashboard') {
        renderDashboard();
    } else if (tabName === 'inventory') {
        renderInventoryTable();
    }
}

// Clock
function initClock() {
    const el = document.getElementById('currentTime');
    if (!el) return;
    function tick() {
        const now = new Date();
        el.textContent = now.toLocaleTimeString('id-ID');
    }
    tick();
    setInterval(tick, 1000);
}

// Format IDR
function formatIDR(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
}

// ==========================================
// DASHBOARD & LAPORAN
// ==========================================
function renderDashboard() {
    // Stat 1: Total Sales Today
    const totalSales = transactions.reduce((sum, tx) => sum + tx.total, 0);
    document.getElementById('statTodaySales').textContent = formatIDR(totalSales);

    // Stat 2: Total Tx
    document.getElementById('statTotalTx').textContent = transactions.length;

    // Stat 3: Net Profit (Estimate: Sell - Buy)
    let netProfit = 0;
    transactions.forEach(tx => {
        tx.items.forEach(item => {
            const prod = products.find(p => p.name === item.name);
            if (prod) {
                netProfit += (prod.sellPrice - prod.buyPrice) * item.qty;
            }
        });
    });
    document.getElementById('statNetProfit').textContent = formatIDR(netProfit);

    // Stat 4: Top Product
    let productSalesCount = {};
    transactions.forEach(tx => {
        tx.items.forEach(item => {
            productSalesCount[item.name] = (productSalesCount[item.name] || 0) + item.qty;
        });
    });
    let topProdName = '-';
    let topProdQty = 0;
    for (let [name, qty] of Object.entries(productSalesCount)) {
        if (qty > topProdQty) {
            topProdQty = qty;
            topProdName = name;
        }
    }
    document.getElementById('statTopProduct').textContent = topProdName;
    document.getElementById('statTopProductQty').textContent = `Terjual ${topProdQty} pcs`;

    // Low stock table
    const lowStockList = products.filter(p => p.stock < 5);
    document.getElementById('lowStockCountBadge').textContent = `${lowStockList.length} Perhatian`;
    const lowBody = document.getElementById('lowStockBody');
    if (lowStockList.length === 0) {
        lowBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#94a3b8;">Semua stok aman! ✨</td></tr>`;
    } else {
        lowBody.innerHTML = lowStockList.map(p => `
            <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.category}</td>
                <td><strong>${p.stock}</strong></td>
                <td>${p.stock === 0 ? '<span class="badge badge-danger">Habis</span>' : '<span class="badge badge-warning">Stok Menipis</span>'}</td>
            </tr>
        `).join('');
    }

    renderTxHistoryTable(transactions);
}

function renderTxHistoryTable(list) {
    const tbody = document.getElementById('txHistoryBody');
    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8;">Belum ada transaksi tercatat.</td></tr>`;
        return;
    }
    tbody.innerHTML = list.map(tx => `
        <tr>
            <td><strong>${tx.id}</strong></td>
            <td>${tx.date}</td>
            <td>${tx.items.reduce((s, i) => s + i.qty, 0)} item</td>
            <td><strong>${formatIDR(tx.total)}</strong></td>
            <td><span class="badge badge-soft">${tx.method}</span></td>
            <td>
                <button class="btn btn-secondary btn-sm" style="padding:4px 10px; font-size:12px;" onclick="viewReceiptAgain('${tx.id}')">
                    <i class="fa-solid fa-receipt"></i> Lihat Struk
                </button>
            </td>
        </tr>
    `).join('');
}

function filterTxHistory() {
    const q = document.getElementById('searchTxHistory').value.toLowerCase();
    const filtered = transactions.filter(tx => tx.id.toLowerCase().includes(q));
    renderTxHistoryTable(filtered);
}

// ==========================================
// KASIR (POS)
// ==========================================
function renderPosCatalog() {
    const grid = document.getElementById('posProductGrid');
    const q = document.getElementById('posSearch').value.toLowerCase();

    let filtered = products.filter(p => p.name.toLowerCase().includes(q));
    if (selectedCategoryPos !== 'All') {
        filtered = filtered.filter(p => p.category === selectedCategoryPos);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 3; text-align:center; color:#94a3b8; padding:40px;">Produk tidak ditemukan.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="pos-item-card" onclick="addToCart(${p.id})">
            <div>
                <div class="pos-item-icon"><i class="${p.icon}"></i></div>
                <div class="pos-item-name">${p.name}</div>
            </div>
            <div>
                <div class="pos-item-price">${formatIDR(p.sellPrice)}</div>
                <div class="pos-item-stock">Stok: ${p.stock} ${p.stock === 0 ? '(Habis)' : ''}</div>
            </div>
        </div>
    `).join('');
}

function filterPosCategory(cat, btn) {
    selectedCategoryPos = cat;
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPosCatalog();
}

// Cart functions
function addToCart(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    if (prod.stock <= 0) {
        alert('Maaf, stok produk ini sudah habis!');
        return;
    }

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        if (existing.qty >= prod.stock) {
            alert('Jumlah melebihi stok yang tersedia!');
            return;
        }
        existing.qty++;
    } else {
        cart.push({
            id: prod.id,
            name: prod.name,
            price: prod.sellPrice,
            qty: 1
        });
    }
    renderCart();
}

function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    const prod = products.find(p => p.id === productId);

    const newQty = item.qty + delta;
    if (newQty > prod.stock) {
        alert('Stok tidak mencukupi!');
        return;
    }
    if (newQty <= 0) {
        removeFromCart(productId);
    } else {
        item.qty = newQty;
        renderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cartItemsList');
    if (cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Keranjang masih kosong.<br>Klik produk di sebelah kiri untuk menambah.</p>
            </div>
        `;
        updateCartCalculation();
        return;
    }

    list.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <small>${formatIDR(item.price)} x ${item.qty}</small>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                <button class="btn-text text-danger" onclick="removeFromCart(${item.id})" style="margin-left:6px;"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    updateCartCalculation();
}

function updateCartCalculation() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discVal = parseFloat(document.getElementById('discountValue').value) || 0;
    const discType = document.getElementById('discountType').value;

    let discountAmount = 0;
    if (discType === 'percent') {
        discountAmount = (subtotal * discVal) / 100;
    } else {
        discountAmount = discVal;
    }
    if (discountAmount > subtotal) discountAmount = subtotal;

    const total = subtotal - discountAmount;

    document.getElementById('cartSubtotal').textContent = formatIDR(subtotal);
    document.getElementById('cartTax').textContent = formatIDR(0);
    document.getElementById('cartTotal').textContent = formatIDR(total);

    window.currentCartSubtotal = subtotal;
    window.currentCartDiscount = discountAmount;
    window.currentCartTotal = total;
}

// Payment Modal
function openPaymentModal(method) {
    if (cart.length === 0) {
        alert('Keranjang belanja masih kosong!');
        return;
    }
    currentPaymentMethod = method;
    document.getElementById('paymentModalTitle').textContent = `Konfirmasi Pembayaran (${method})`;
    document.getElementById('payModalTotal').textContent = formatIDR(window.currentCartTotal);

    if (method === 'Tunai') {
        document.getElementById('cashPaymentSection').style.display = 'block';
        document.getElementById('qrisPaymentSection').style.display = 'none';
        document.getElementById('cashGiven').value = window.currentCartTotal;
        calculateChange();
    } else {
        document.getElementById('cashPaymentSection').style.display = 'none';
        document.getElementById('qrisPaymentSection').style.display = 'block';
    }

    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

function calculateChange() {
    const given = parseFloat(document.getElementById('cashGiven').value) || 0;
    const total = window.currentCartTotal;
    const change = given - total;
    const changeEl = document.getElementById('changeAmount');
    if (change >= 0) {
        changeEl.textContent = formatIDR(change);
        changeEl.className = 'text-success';
    } else {
        changeEl.textContent = 'Uang kurang ' + formatIDR(Math.abs(change));
        changeEl.className = 'text-danger';
    }
    window.currentCashGiven = given;
    window.currentChange = change >= 0 ? change : 0;
}

function processCheckout() {
    if (currentPaymentMethod === 'Tunai') {
        const given = window.currentCashGiven || 0;
        if (given < window.currentCartTotal) {
            alert('Jumlah uang yang diterima kurang dari total tagihan!');
            return;
        }
    }

    // Generate Tx ID
    const txId = 'AGRU-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(100 + Math.random() * 900);
    const nowStr = new Date().toLocaleString('id-ID');

    const newTx = {
        id: txId,
        date: nowStr,
        items: JSON.parse(JSON.stringify(cart)),
        subtotal: window.currentCartSubtotal,
        discount: window.currentCartDiscount,
        total: window.currentCartTotal,
        method: currentPaymentMethod,
        cash: currentPaymentMethod === 'Tunai' ? window.currentCashGiven : window.currentCartTotal,
        change: currentPaymentMethod === 'Tunai' ? window.currentChange : 0
    };

    // Deduct stock
    cart.forEach(item => {
        const p = products.find(prod => prod.id === item.id);
        if (p) {
            p.stock -= item.qty;
            if (p.stock < 0) p.stock = 0;
        }
    });

    transactions.unshift(newTx);

    closePaymentModal();
    clearCart();
    renderPosCatalog();
    renderDashboard();

    // Open Receipt
    openReceiptModal(newTx);
}

// ==========================================
// RECEIPT MODAL
// ==========================================
function openReceiptModal(tx) {
    document.getElementById('recId').textContent = tx.id;
    document.getElementById('recDate').textContent = tx.date;
    document.getElementById('recSubtotal').textContent = formatIDR(tx.subtotal);
    document.getElementById('recDiscount').textContent = formatIDR(tx.discount);
    document.getElementById('recTotal').textContent = formatIDR(tx.total);
    document.getElementById('recMethod').textContent = tx.method;
    document.getElementById('recCash').textContent = formatIDR(tx.cash);
    document.getElementById('recChange').textContent = formatIDR(tx.change);

    const itemsEl = document.getElementById('recItemsList');
    itemsEl.innerHTML = tx.items.map(i => `
        <div class="r-item">
            <div class="r-item-name">${i.name}</div>
            <div class="r-item-calc">
                <span>${i.qty} x ${formatIDR(i.price)}</span>
                <span><strong>${formatIDR(i.qty * i.price)}</strong></span>
            </div>
        </div>
    `).join('');

    document.getElementById('receiptModal').classList.add('active');
}

function closeReceiptModal() {
    document.getElementById('receiptModal').classList.remove('active');
}

function viewReceiptAgain(txId) {
    const tx = transactions.find(t => t.id === txId);
    if (tx) {
        openReceiptModal(tx);
    }
}

function printReceipt() {
    console.log('printReceipt triggered');
    const printContents = document.getElementById('receiptPrintArea').innerHTML;
    if (!printContents) {
        alert('Gagal menemukan area struk untuk dicetak.');
        return;
    }
        body { margin: 0; padding: 0; font-family: 'Courier New', monospace; background: #fff; }
        @media print { .no-print { display: none !important; } }
        .receipt-paper { padding: 0; }
        .receipt-header h2 { font-size: 18px; margin-bottom: 5px; }
        .receipt-header p { font-size: 12px; margin: 2px 0; }
        .receipt-divider { font-size: 12px; letter-spacing: -1px; color: #666; margin: 8px 0; text-align: center; }
        .receipt-meta { font-size: 12px; margin-bottom: 8px; }
        .receipt-meta div { display: flex; justify-content: space-between; margin-bottom: 2px; }
        .receipt-items { font-size: 12px; }
        .r-item { margin-bottom: 6px; }
        .r-item-name { font-weight: bold; }
        .r-item-calc { display: flex; justify-content: space-between; color: #333; }
        .receipt-totals { font-size: 12px; margin-top: 8px; }
        .r-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .r-row.total { font-weight: bold; font-size: 14px; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 4px 0; margin: 4px 0; }
        .receipt-footer { text-align: center; font-size: 12px; margin-top: 12px; }
        .genz-tag { font-size: 10px; color: #2563eb; margin-top: 4px; font-weight: bold; }
    `;

    const popupWin = window.open('', '_blank', 'width=400,height=600');
    if (!popupWin) {
        alert('Popup diblokir! Izinkan popup untuk mencetak struk.');
        return;
    }

    popupWin.document.write(\`
        <html>
            <head>
                <title>Print Struk daisyfumarket</title>
                <style>\${styles}</style>
            </head>
            <body>\${printContents}</body>
        </html>
    \`);
    popupWin.document.close();
    popupWin.focus();
    popupWin.print();
    popupWin.close();
}

function downloadReceiptImage() {
    alert('Simulasi: Struk berhasil di-download sebagai PNG! (Fitur mockup browser)');
}

// ==========================================
// INVENTORY & PRODUCT MANAGEMENT
// ==========================================
function renderInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    const q = document.getElementById('invSearch').value.toLowerCase();
    const cat = document.getElementById('invCatFilter').value;

    let filtered = products.filter(p => p.name.toLowerCase().includes(q));
    if (cat !== 'All') {
        filtered = filtered.filter(p => p.category === cat);
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#94a3b8;">Tidak ada produk ditemukan.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        let statusBadge = '<span class="badge badge-success">Tersedia</span>';
        if (p.stock === 0) {
            statusBadge = '<span class="badge badge-danger">Habis</span>';
        } else if (p.stock < 5) {
            statusBadge = '<span class="badge badge-warning">Stok Menipis</span>';
        }

        return `
            <tr>
                <td><strong><i class="${p.icon}" style="margin-right:6px; color:var(--primary);"></i> ${p.name}</strong></td>
                <td>${p.category}</td>
                <td>${formatIDR(p.buyPrice)}</td>
                <td><strong>${formatIDR(p.sellPrice)}</strong></td>
                <td><strong>${p.stock}</strong></td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:12px;" onclick="editProduct(${p.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-danger btn-sm" style="padding:4px 8px; font-size:12px;" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function openProductModal(productId = null) {
    document.getElementById('productForm').reset();
    document.getElementById('editProductId').value = '';

    if (productId) {
        document.getElementById('productModalTitle').textContent = 'Edit Produk';
        const p = products.find(prod => prod.id === productId);
        if (p) {
            document.getElementById('editProductId').value = p.id;
            document.getElementById('pName').value = p.name;
            document.getElementById('pBuyPrice').value = p.buyPrice;
            document.getElementById('pSellPrice').value = p.sellPrice;
            document.getElementById('pStock').value = p.stock;
            document.getElementById('pCategory').value = p.category;
            document.getElementById('pIcon').value = p.icon;
        }
    } else {
        document.getElementById('productModalTitle').textContent = 'Tambah Produk Baru';
    }

    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('editProductId').value;
    const name = document.getElementById('pName').value;
    const buyPrice = parseFloat(document.getElementById('pBuyPrice').value);
    const sellPrice = parseFloat(document.getElementById('pSellPrice').value);
    const stock = parseInt(document.getElementById('pStock').value);
    const category = document.getElementById('pCategory').value;
    const icon = document.getElementById('pIcon').value || 'fa-solid fa-box';

    if (id) {
        // Edit
        const p = products.find(prod => prod.id == id);
        if (p) {
            p.name = name;
            p.buyPrice = buyPrice;
            p.sellPrice = sellPrice;
            p.stock = stock;
            p.category = category;
            p.icon = icon;
        }
    } else {
        // New
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({
            id: newId,
            name,
            buyPrice,
            sellPrice,
            stock,
            category,
            icon
        });
    }

    closeProductModal();
    renderInventoryTable();
    renderPosCatalog();
    renderDashboard();
}

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Yakin ingin menghapus produk ini dari inventory?')) {
        products = products.filter(p => p.id !== id);
        renderInventoryTable();
        renderPosCatalog();
        renderDashboard();
    }
}
