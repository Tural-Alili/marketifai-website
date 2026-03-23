let siteData = null;

async function loadData() {
  try {
    const r = await fetch('/data/site.json');
    siteData = await r.json();
  } catch(e) {
    // fallback: try relative path
    try {
      const r2 = await fetch('/data/site.json');
      siteData = await r2.json();
    } catch(e2) { console.warn('Could not load site data'); }
  }
  return siteData;
}

function renderNav(data, activePage) {
  const nav = document.getElementById('nav');
  if (!nav || !data) return;
  const pages = [
    { href:'/', label:'Ana Səhifə' },
    { href:'/services/', label:'Xidmətlər' },
    { href:'/portfolio/', label:'Portfolio' },
    { href:'/case-studies/', label:'Keys Tədqiqatları' },
    { href:'/blog/', label:'Bloq' },
    { href:'/contact/', label:'Əlaqə' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="${activePage===p.label?'active':''}">${p.label}</a>`
  ).join('');
  nav.innerHTML = `
    <div class="nav-logo">
      <img src="${data.company.logo}" alt="${data.company.name}" onerror="this.style.display='none'">
      <span>${data.company.name}</span>
    </div>
    <div class="nav-links">
      ${links}
      <a href="/brief/" class="nav-cta">Brief Göndər</a>
    </div>
    <div class="hamburger" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      ${pages.map(p=>`<a href="${p.href}">${p.label}</a>`).join('')}
      <a href="/brief/" style="background:var(--primary);border-radius:8px;color:#fff;padding:12px 16px;font-weight:600;text-align:center;">Brief Göndər</a>
    </div>
  `;
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function renderFooter(data) {
  const footer = document.getElementById('footer');
  if (!footer || !data) return;
  const c = data.company;
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">${c.name}</div>
        <div class="footer-tagline">${c.tagline}</div>
        <div class="footer-contact">
          <a href="mailto:${c.email}">✉ ${c.email}</a>
          <a href="https://wa.me/${c.whatsapp}">📱 ${c.phone}</a>
          <a href="#">📍 ${c.address}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Xidmətlər</h4>
        ${data.services.slice(0,5).map(s=>`<a href="/services/#${s.slug}">${s.title.split('(')[0].trim()}</a>`).join('')}
      </div>
      <div class="footer-col">
        <h4>Şirkət</h4>
        <a href="/">Ana Səhifə</a>
        <a href="/portfolio/">Portfolio</a>
        <a href="/blog/">Bloq</a>
        <a href="/contact/">Əlaqə</a>
        <a href="/brief/">Brief Göndər</a>
      </div>
      <div class="footer-col">
        <h4>Bizimlə Əlaqə</h4>
        <a href="mailto:${c.email}">${c.email}</a>
        <a href="https://wa.me/${c.whatsapp}">${c.phone}</a>
        <a href="#">${c.address}</a>
        <a href="/brief/" style="background:var(--primary);border-radius:8px;color:#fff;padding:8px 16px;display:inline-block;margin-top:8px;font-weight:600;">Brief Göndər</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${c.name}. Bütün hüquqlar qorunur.</span>
      <div>
        <a href="/privacy/">Gizlilik Siyasəti</a>
        <a href="/terms/">İstifadə Şərtləri</a>
      </div>
    </div>
  `;
}

// FAQ accordion
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Göndərilir...'; btn.disabled = true;
    await new Promise(r => setTimeout(r, 1000));
    form.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  });
}

window.toggleMenu = toggleMenu;
window.initFaq = initFaq;
window.initContactForm = initContactForm;
window.loadData = loadData;
window.renderNav = renderNav;
window.renderFooter = renderFooter;
