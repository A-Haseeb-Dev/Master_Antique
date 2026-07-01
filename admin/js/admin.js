(function () {
  'use strict';

  /* ─── Auth ─── */
  if (localStorage.getItem('ma_admin_logged_in') !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  /* ─── Toast ─── */
  function showToast(msg, type) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'toast toast-' + type + ' show';
    setTimeout(function () { t.classList.remove('show'); }, 3000);
  }

  /* ─── Navigation ─── */
  var sections = {
    overview: document.getElementById('section-overview'),
    products: document.getElementById('section-products'),
    messages: document.getElementById('section-messages'),
    settings: document.getElementById('section-settings')
  };

  var navLinks = document.querySelectorAll('.sidebar-nav a');
  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var page = a.getAttribute('data-page');
      if (!page || !sections[page]) return;
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      a.classList.add('active');
      Object.keys(sections).forEach(function (k) {
        sections[k].style.display = k === page ? 'block' : 'none';
      });
      document.getElementById('page-title').textContent = a.querySelector('span').textContent;
    });
  });

  document.getElementById('logout-link').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('ma_admin_logged_in');
    window.location.href = 'index.html';
  });

  /* ─── Data Functions ─── */
  function getProducts() {
    try {
      return JSON.parse(localStorage.getItem('ma_products')) || [];
    } catch (e) { return []; }
  }

  function saveProducts(arr) {
    localStorage.setItem('ma_products', JSON.stringify(arr));
  }

  function getMessages() {
    try {
      return JSON.parse(localStorage.getItem('ma_inquiries')) || [];
    } catch (e) { return []; }
  }

  /* ─── Stats ─── */
  function refreshStats() {
    var products = getProducts();
    var msgs = getMessages();
    document.getElementById('stat-products').textContent = products.length;
    document.getElementById('stat-messages').textContent = msgs.length;
    var unread = msgs.filter(function (m) { return !m.read; }).length;
    document.getElementById('stat-unread').textContent = unread;
    var inStock = products.filter(function (p) { return p.status === 'available'; }).length;
    document.getElementById('stat-instock').textContent = inStock;
  }

  /* ─── Products Table ─── */
  function renderProducts() {
    var tbody = document.getElementById('products-tbody');
    var products = getProducts();
    tbody.innerHTML = '';

    if (products.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><i class="fas fa-box-open"></i><p>No products yet. Click "Add Product" to get started.</p></div></td></tr>';
      return;
    }

    products.forEach(function (p, i) {
      var eraBadge = '<span class="badge badge-info">' + escapeHtml(p.era) + '</span>';
      var statusBadge = p.status === 'available'
        ? '<span class="badge badge-success">Available</span>'
        : '<span class="badge badge-warning">Sold</span>';

      var img = p.image ? '<img src="' + escapeHtml(p.image) + '" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:4px;display:block">' : '<div style="width:40px;height:40px;background:#D4C9B5;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;color:#7A6B5A;">No img</div>';

      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + img + '</td>' +
        '<td><strong>' + escapeHtml(p.name) + '</strong></td>' +
        '<td>' + escapeHtml(p.era) + '</td>' +
        '<td>$' + p.price.toLocaleString() + '</td>' +
        '<td>' + statusBadge + '</td>' +
        '<td class="actions">' +
          '<button class="btn btn-outline btn-sm edit-product" data-index="' + i + '"><i class="fas fa-pen"></i></button> ' +
          '<button class="btn btn-danger btn-sm delete-product" data-index="' + i + '"><i class="fas fa-trash"></i></button>' +
        '</td>';
      tbody.appendChild(tr);
    });

    /* edit buttons */
    tbody.querySelectorAll('.edit-product').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openProductModal(parseInt(btn.getAttribute('data-index')));
      });
    });

    /* delete buttons */
    tbody.querySelectorAll('.delete-product').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (confirm('Delete this product?')) {
          var products = getProducts();
          var idx = parseInt(btn.getAttribute('data-index'));
          products.splice(idx, 1);
          saveProducts(products);
          renderProducts();
          refreshStats();
          showToast('Product deleted.', 'success');
        }
      });
    });
  }

  /* ─── Product Modal ─── */
  var modalOverlay = document.getElementById('product-modal');
  var modalForm = document.getElementById('product-form');
  var modalTitle = document.getElementById('modal-title');
  var editingIndex = -1;

  function openProductModal(idx) {
    editingIndex = idx;
    modalForm.reset();
    modalTitle.textContent = idx >= 0 ? 'Edit Product' : 'Add Product';

    if (idx >= 0) {
      var products = getProducts();
      var p = products[idx];
      document.getElementById('p-name').value = p.name;
      document.getElementById('p-era').value = p.era;
      document.getElementById('p-price').value = p.price;
      document.getElementById('p-image').value = p.image || '';
      document.getElementById('p-description').value = p.description || '';
      document.getElementById('p-provenance').value = p.provenance || '';
      document.getElementById('p-badge').value = p.badge || '';
      document.getElementById('p-status').value = p.status || 'available';
    }

    modalOverlay.classList.add('open');
  }

  document.getElementById('add-product-btn').addEventListener('click', function () {
    openProductModal(-1);
  });

  document.querySelectorAll('.modal-close, .modal-cancel').forEach(function (el) {
    el.addEventListener('click', function () {
      modalOverlay.classList.remove('open');
    });
  });

  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) modalOverlay.classList.remove('open');
  });

  modalForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('p-name').value.trim();
    var era = document.getElementById('p-era').value.trim();
    var price = parseFloat(document.getElementById('p-price').value);
    var image = document.getElementById('p-image').value.trim();
    var description = document.getElementById('p-description').value.trim();
    var provenance = document.getElementById('p-provenance').value.trim();
    var badge = document.getElementById('p-badge').value.trim();
    var status = document.getElementById('p-status').value;

    if (!name || !era || isNaN(price)) {
      showToast('Name, Era and Price are required.', 'error');
      return;
    }

    var product = {
      name: name,
      era: era,
      price: price,
      image: image || 'https://images.pexels.com/photos/18424382/pexels-photo-18424382.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: description || 'A fine antique piece from our collection.',
      provenance: provenance || 'Authenticated by Master Antique',
      badge: badge || '',
      status: status || 'available'
    };

    var products = getProducts();
    if (editingIndex >= 0) {
      products[editingIndex] = product;
      showToast('Product updated.', 'success');
    } else {
      products.push(product);
      showToast('Product added.', 'success');
    }

    saveProducts(products);
    renderProducts();
    refreshStats();
    modalOverlay.classList.remove('open');
  });

  /* ─── Messages ─── */
  function renderMessages() {
    var container = document.getElementById('messages-container');
    var msgs = getMessages();

    if (msgs.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-envelope-open"></i><p>No inquiries yet.</p></div>';
      return;
    }

    container.innerHTML = '';
    msgs.slice().reverse().forEach(function (m, ri) {
      var div = document.createElement('div');
      div.className = 'message-item';
      div.innerHTML =
        '<h4>' + escapeHtml(m.name) + '</h4>' +
        '<div class="meta">' +
          '<span><i class="fas fa-envelope"></i> ' + escapeHtml(m.email) + '</span>' +
          (m.phone ? '<span><i class="fas fa-phone"></i> ' + escapeHtml(m.phone) + '</span>' : '') +
          '<span><i class="fas fa-clock"></i> ' + m.date + '</span>' +
          (!m.read ? '<span class="badge badge-warning">New</span>' : '') +
        '</div>' +
        '<p>' + escapeHtml(m.message) + '</p>' +
        (m.reference ? '<p style="font-size:0.8rem;color:#B8860B;margin-top:4px;">Ref: ' + escapeHtml(m.reference) + '</p>' : '') +
        '<div class="actions">' +
          (!m.read ? '<button class="btn btn-outline btn-sm mark-read" data-idx="' + ri + '"><i class="fas fa-check"></i> Mark Read</button>' : '') +
          '<button class="btn btn-danger btn-sm delete-message" data-idx="' + ri + '"><i class="fas fa-trash"></i></button>' +
        '</div>';
      container.appendChild(div);
    });

    container.querySelectorAll('.mark-read').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var msgs = getMessages();
        var ri = parseInt(btn.getAttribute('data-idx'));
        var realIdx = msgs.length - 1 - ri;
        if (msgs[realIdx]) msgs[realIdx].read = true;
        localStorage.setItem('ma_inquiries', JSON.stringify(msgs));
        renderMessages();
        refreshStats();
      });
    });

    container.querySelectorAll('.delete-message').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!confirm('Delete this message?')) return;
        var msgs = getMessages();
        var ri = parseInt(btn.getAttribute('data-idx'));
        var realIdx = msgs.length - 1 - ri;
        msgs.splice(realIdx, 1);
        localStorage.setItem('ma_inquiries', JSON.stringify(msgs));
        renderMessages();
        refreshStats();
        showToast('Message deleted.', 'success');
      });
    });
  }

  /* ─── Settings ─── */
  document.getElementById('settings-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var newUser = document.getElementById('s-username').value.trim();
    var newPass = document.getElementById('s-password').value.trim();
    if (!newUser || !newPass) {
      showToast('Both fields are required.', 'error');
      return;
    }
    localStorage.setItem('ma_admin_credentials', JSON.stringify({ username: newUser, password: newPass }));
    showToast('Credentials updated. Use new credentials on next login.', 'success');
  });

  /* ─── Helpers ─── */
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ─── Init ─── */
  refreshStats();
  renderProducts();
  renderMessages();

})();
