/* ============================================================
   Tripura Heritage — app.js
   Complete JavaScript for PWA e-commerce
   ============================================================ */

'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */
const STORAGE_KEYS = {
  PRODUCTS: 'th-products',
  CART: 'th-cart',
  PWA_DISMISSED: 'th-pwa-dismissed'
};

const WHATSAPP_NUMBER = '918132958338';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Rignai Traditional Wrap Skirt - Black & Gold',
    category: 'Rignai',
    price: 1899,
    description: 'Beautifully handwoven Rignai in classic black with intricate gold border designs. Made by skilled artisans from Tripura using traditional looms. Perfect for festivals, cultural events, and ceremonies. The gold thread work represents prosperity and heritage.',
    image: 'https://picsum.photos/seed/rignai1/400/500',
    images: [
      'https://picsum.photos/seed/rignai1/400/500',
      'https://picsum.photos/seed/rignai1a/400/500',
      'https://picsum.photos/seed/rignai1b/400/500',
      'https://picsum.photos/seed/rignai1c/400/500'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 2,
    name: 'Rignai Festival Edition - Red Stripe',
    category: 'Rignai',
    price: 2299,
    description: 'Vibrant festival Rignai with bold red stripes woven using traditional techniques. This special edition wrap skirt is ideal for Garia Puja and other Tripuri festivals. Rich crimson hues symbolize energy and festivity in Tripura culture.',
    image: 'https://picsum.photos/seed/rignai2/400/500',
    images: [
      'https://picsum.photos/seed/rignai2/400/500',
      'https://picsum.photos/seed/rignai2a/400/500',
      'https://picsum.photos/seed/rignai2b/400/500',
      'https://picsum.photos/seed/rignai2c/400/500'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 3,
    name: 'Rignai Daily Wear - Natural Cotton',
    category: 'Rignai',
    price: 1299,
    description: 'Comfortable everyday Rignai crafted from natural cotton fibers. Lightweight and breathable, ideal for daily wear in warm weather. The natural cotton is sourced locally and dyed with eco-friendly colors, making it both sustainable and comfortable.',
    image: 'https://picsum.photos/seed/rignai3/400/500',
    images: [
      'https://picsum.photos/seed/rignai3/400/500',
      'https://picsum.photos/seed/rignai3a/400/500',
      'https://picsum.photos/seed/rignai3b/400/500',
      'https://picsum.photos/seed/rignai3c/400/500'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true
  },
  {
    id: 4,
    name: 'Rignai Handwoven Silk - Purple',
    category: 'Rignai',
    price: 3499,
    description: 'Premium handwoven silk Rignai in royal purple with traditional Tripuri motifs. Each piece takes 3–4 days to weave on a traditional handloom. The silk sheen and intricate patterns make this an heirloom-quality garment suitable for weddings and special occasions.',
    image: 'https://picsum.photos/seed/rignai4/400/500',
    images: [
      'https://picsum.photos/seed/rignai4/400/500',
      'https://picsum.photos/seed/rignai4a/400/500',
      'https://picsum.photos/seed/rignai4b/400/500',
      'https://picsum.photos/seed/rignai4c/400/500'
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true
  },
  {
    id: 5,
    name: 'Risa Traditional Scarf - White & Gold',
    category: 'Risa',
    price: 899,
    description: 'Classic Risa scarf in white with golden border, a traditional Tripuri head covering and accessory. The Risa holds deep cultural significance and is worn during religious ceremonies and community gatherings. Soft to the touch and elegantly designed.',
    image: 'https://picsum.photos/seed/risa1/400/500',
    images: [
      'https://picsum.photos/seed/risa1/400/500',
      'https://picsum.photos/seed/risa1a/400/500',
      'https://picsum.photos/seed/risa1b/400/500',
      'https://picsum.photos/seed/risa1c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 6,
    name: 'Risa Festival Stole - Red Border',
    category: 'Risa',
    price: 1099,
    description: 'Festive Risa with vibrant red border, perfect for celebrations and cultural programs. This stole features traditional Tripuri weaving patterns along the border with tasseled ends. A must-have accessory for complete traditional Tripuri attire.',
    image: 'https://picsum.photos/seed/risa2/400/500',
    images: [
      'https://picsum.photos/seed/risa2/400/500',
      'https://picsum.photos/seed/risa2a/400/500',
      'https://picsum.photos/seed/risa2b/400/500',
      'https://picsum.photos/seed/risa2c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 7,
    name: 'Risa Silk Premium - Multi Color',
    category: 'Risa',
    price: 1599,
    description: 'Luxurious multi-color silk Risa with an array of traditional tribal patterns. Woven with high-quality silk threads in rich jewel tones. This premium stole transitions beautifully from daytime cultural events to evening festivities.',
    image: 'https://picsum.photos/seed/risa3/400/500',
    images: [
      'https://picsum.photos/seed/risa3/400/500',
      'https://picsum.photos/seed/risa3a/400/500',
      'https://picsum.photos/seed/risa3b/400/500',
      'https://picsum.photos/seed/risa3c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 8,
    name: 'Risa Cotton Everyday - Plain Cream',
    category: 'Risa',
    price: 699,
    description: 'Simple, elegant cotton Risa in natural cream color for everyday use. Versatile enough to be worn as a head wrap, shoulder drape, or decorative stole. Made from soft, breathable cotton, this piece is your daily companion for cultural pride.',
    image: 'https://picsum.photos/seed/risa4/400/500',
    images: [
      'https://picsum.photos/seed/risa4/400/500',
      'https://picsum.photos/seed/risa4a/400/500',
      'https://picsum.photos/seed/risa4b/400/500',
      'https://picsum.photos/seed/risa4c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 9,
    name: 'Rikutu Traditional Jacket - Black',
    category: 'Rikutu',
    price: 2199,
    description: 'Classic black Rikutu jacket with traditional Tripuri embroidery along the neckline and cuffs. This traditional upper garment pairs perfectly with the Rignai skirt for a complete traditional ensemble. Handcrafted with meticulous attention to detail.',
    image: 'https://picsum.photos/seed/rikutu1/400/500',
    images: [
      'https://picsum.photos/seed/rikutu1/400/500',
      'https://picsum.photos/seed/rikutu1a/400/500',
      'https://picsum.photos/seed/rikutu1b/400/500',
      'https://picsum.photos/seed/rikutu1c/400/500'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 10,
    name: 'Rikutu Festive Jacket - Maroon',
    category: 'Rikutu',
    price: 2799,
    description: 'Richly embroidered maroon Rikutu jacket for special occasions and festivals. The deep maroon is enhanced with gold thread embroidery in traditional Tripuri motifs. This festive jacket is the centerpiece of a traditional Tripuri wedding ensemble.',
    image: 'https://picsum.photos/seed/rikutu2/400/500',
    images: [
      'https://picsum.photos/seed/rikutu2/400/500',
      'https://picsum.photos/seed/rikutu2a/400/500',
      'https://picsum.photos/seed/rikutu2b/400/500',
      'https://picsum.photos/seed/rikutu2c/400/500'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 11,
    name: 'Rikutu Modern Cut - Navy',
    category: 'Rikutu',
    price: 1999,
    description: 'Contemporary take on the traditional Rikutu with a modern silhouette in navy blue. This design bridges tradition and modernity, making it suitable for cultural events as well as contemporary fusion fashion. Features traditional embroidery with a modern collar.',
    image: 'https://picsum.photos/seed/rikutu3/400/500',
    images: [
      'https://picsum.photos/seed/rikutu3/400/500',
      'https://picsum.photos/seed/rikutu3a/400/500',
      'https://picsum.photos/seed/rikutu3b/400/500',
      'https://picsum.photos/seed/rikutu3c/400/500'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true
  },
  {
    id: 12,
    name: 'Rikutu Handwoven - Natural',
    category: 'Rikutu',
    price: 2499,
    description: 'Artisan handwoven Rikutu in natural undyed cotton, showcasing the raw beauty of traditional craftsmanship. Each thread is carefully laid by hand on traditional looms. The natural color and texture celebrate the authentic heritage of Tripura weaving.',
    image: 'https://picsum.photos/seed/rikutu4/400/500',
    images: [
      'https://picsum.photos/seed/rikutu4/400/500',
      'https://picsum.photos/seed/rikutu4a/400/500',
      'https://picsum.photos/seed/rikutu4b/400/500',
      'https://picsum.photos/seed/rikutu4c/400/500'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 13,
    name: 'Bamboo Tribal Earrings - Gold',
    category: 'Accessories',
    price: 399,
    description: 'Handcrafted bamboo earrings with gold paint finish, inspired by traditional Tripuri tribal jewelry. Lightweight and comfortable for all-day wear. Each pair is uniquely crafted by local artisans using sustainably sourced bamboo from the forests of Tripura.',
    image: 'https://picsum.photos/seed/acc1/400/500',
    images: [
      'https://picsum.photos/seed/acc1/400/500',
      'https://picsum.photos/seed/acc1a/400/500',
      'https://picsum.photos/seed/acc1b/400/500',
      'https://picsum.photos/seed/acc1c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 14,
    name: 'Tribal Necklace - Silver',
    category: 'Accessories',
    price: 599,
    description: 'Traditional tribal necklace in oxidized silver featuring symbolic Tripuri tribal motifs. This statement necklace is inspired by the ancient jewelry traditions of the 19 indigenous tribes of Tripura. Perfect for completing a traditional ethnic look.',
    image: 'https://picsum.photos/seed/acc2/400/500',
    images: [
      'https://picsum.photos/seed/acc2/400/500',
      'https://picsum.photos/seed/acc2a/400/500',
      'https://picsum.photos/seed/acc2b/400/500',
      'https://picsum.photos/seed/acc2c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 15,
    name: 'Bamboo Bangle Set (6pcs)',
    category: 'Accessories',
    price: 349,
    description: 'Set of 6 hand-painted bamboo bangles in traditional Tripuri colors and patterns. Eco-friendly and sustainable, each bangle is shaped and painted by hand. The set includes a mix of solid colors and patterned designs that complement traditional Tripuri attire.',
    image: 'https://picsum.photos/seed/acc3/400/500',
    images: [
      'https://picsum.photos/seed/acc3/400/500',
      'https://picsum.photos/seed/acc3a/400/500',
      'https://picsum.photos/seed/acc3b/400/500',
      'https://picsum.photos/seed/acc3c/400/500'
    ],
    sizes: ['S/M', 'M/L'],
    inStock: true
  },
  {
    id: 16,
    name: 'Handwoven Clutch Bag',
    category: 'Accessories',
    price: 799,
    description: 'Beautiful handwoven clutch bag featuring traditional Tripuri weaving patterns. Large enough to hold essentials, this clutch is a fusion of traditional craftsmanship and modern utility. The exterior features iconic Tripuri geometric patterns on a natural cotton base.',
    image: 'https://picsum.photos/seed/acc4/400/500',
    images: [
      'https://picsum.photos/seed/acc4/400/500',
      'https://picsum.photos/seed/acc4a/400/500',
      'https://picsum.photos/seed/acc4b/400/500',
      'https://picsum.photos/seed/acc4c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 17,
    name: 'Traditional Hair Clip Set',
    category: 'Accessories',
    price: 249,
    description: 'Set of 4 decorative hair clips inspired by traditional Tripuri hair ornaments. Made from lacquered wood and bamboo with hand-painted floral and geometric motifs. These clips add a touch of tribal elegance to any hairstyle.',
    image: 'https://picsum.photos/seed/acc5/400/500',
    images: [
      'https://picsum.photos/seed/acc5/400/500',
      'https://picsum.photos/seed/acc5a/400/500',
      'https://picsum.photos/seed/acc5b/400/500',
      'https://picsum.photos/seed/acc5c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 18,
    name: 'Tribal Anklet - Silver',
    category: 'Accessories',
    price: 449,
    description: 'Traditional tribal anklet in oxidized silver with small bells and tribal charm pendants. The gentle chime of the bells adds a rhythmic grace to every step. This anklet draws inspiration from the ornamental traditions of Tripura\'s tribal communities.',
    image: 'https://picsum.photos/seed/acc6/400/500',
    images: [
      'https://picsum.photos/seed/acc6/400/500',
      'https://picsum.photos/seed/acc6a/400/500',
      'https://picsum.photos/seed/acc6b/400/500',
      'https://picsum.photos/seed/acc6c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 19,
    name: 'Woven Headband - Red',
    category: 'Accessories',
    price: 299,
    description: 'Handwoven headband in vibrant red with traditional Tripuri pattern accents. This functional accessory keeps hair in place while celebrating cultural heritage. Woven on a small loom, each headband features the same intricate patterns found in larger Risa scarves.',
    image: 'https://picsum.photos/seed/acc7/400/500',
    images: [
      'https://picsum.photos/seed/acc7/400/500',
      'https://picsum.photos/seed/acc7a/400/500',
      'https://picsum.photos/seed/acc7b/400/500',
      'https://picsum.photos/seed/acc7c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 20,
    name: 'Embroidered Purse - Black',
    category: 'Accessories',
    price: 699,
    description: 'Elegant black purse with hand-embroidered Tripuri folk art motifs. The intricate embroidery depicts scenes from Tripuri folklore and nature. Compact yet spacious with an interior zipper pocket. A beautiful blend of artisan craftsmanship and everyday practicality.',
    image: 'https://picsum.photos/seed/acc8/400/500',
    images: [
      'https://picsum.photos/seed/acc8/400/500',
      'https://picsum.photos/seed/acc8a/400/500',
      'https://picsum.photos/seed/acc8b/400/500',
      'https://picsum.photos/seed/acc8c/400/500'
    ],
    sizes: ['One Size'],
    inStock: true
  }
];

/* ============================================================
   PRODUCT DATA LAYER
   ============================================================ */
function getProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read products from localStorage:', e);
  }
  saveProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.warn('Failed to save products:', e);
  }
}

function getProductById(id) {
  return getProducts().find(p => p.id === Number(id));
}

function addProduct(product) {
  const products = getProducts();
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
  const newProduct = {
    ...product,
    id: maxId + 1,
    images: [product.image, product.image, product.image, product.image],
    inStock: true
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

function updateProduct(id, updates) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === Number(id));
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  if (updates.image) {
    products[index].images = [updates.image, updates.image, updates.image, updates.image];
  }
  saveProducts(products);
  return products[index];
}

function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== Number(id));
  saveProducts(products);
}

/* ============================================================
   CART DATA LAYER
   ============================================================ */
function getCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Failed to read cart:', e);
  }
  return [];
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.warn('Failed to save cart:', e);
  }
}

function addToCart(productId, qty = 1, selectedSize = null) {
  const product = getProductById(productId);
  if (!product) return false;

  const cart = getCart();
  const key = selectedSize ? `${productId}-${selectedSize}` : String(productId);
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 99);
  } else {
    cart.push({
      key,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      size: selectedSize,
      qty
    });
  }

  saveCart(cart);
  updateCartBadge();
  showToast(`"${product.name.substring(0, 30)}..." added to cart`, 'success');
  return true;
}

function removeFromCart(key) {
  const cart = getCart().filter(item => item.key !== key);
  saveCart(cart);
  updateCartBadge();
}

function updateQty(key, qty) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(key);
    return;
  }
  item.qty = Math.min(qty, 99);
  saveCart(cart);
  updateCartBadge();
}

function clearCart() {
  saveCart([]);
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/* ============================================================
   CART BADGE
   ============================================================ */
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    if (count > 0) {
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    }
  });
}

/* ============================================================
   WHATSAPP
   ============================================================ */
function generateWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildCartWhatsAppMessage() {
  const cart = getCart();
  if (cart.length === 0) return null;

  let msg = '🛍️ *Order from Tripura Heritage*\n\n';
  msg += '*Items Ordered:*\n';
  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name}`;
    if (item.size && item.size !== 'One Size') {
      msg += ` (Size: ${item.size})`;
    }
    msg += ` x${item.qty} — ₹${(item.price * item.qty).toLocaleString('en-IN')}\n`;
  });
  msg += `\n*Total: ₹${getCartTotal().toLocaleString('en-IN')}*\n\n`;
  msg += 'Please confirm my order and let me know the delivery details. Thank you!';
  return msg;
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================================
   RENDER: PRODUCT CARD
   ============================================================ */
function createProductCardHTML(product) {
  return `
    <div class="product-card">
      <a href="product.html?id=${product.id}" class="product-card__img-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-card__img"
          loading="lazy"
          onerror="this.src='https://picsum.photos/seed/${product.id}/400/500'"
        >
        <span class="product-card__badge">${product.category}</span>
      </a>
      <div class="product-card__body">
        <div class="product-card__name">${product.name}</div>
        <div class="product-card__price">₹${product.price.toLocaleString('en-IN')}</div>
        <div class="product-card__actions">
          <a href="product.html?id=${product.id}" class="product-card__btn">View Details</a>
        </div>
      </div>
    </div>
  `;
}

function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="no-results" style="grid-column:1/-1">
        <span class="no-results__icon">🔍</span>
        <h3>No products found</h3>
        <p>Try adjusting your search or filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(createProductCardHTML).join('');
}

/* ============================================================
   RENDER: CATALOG PAGE
   ============================================================ */
let currentCategory = 'All';
let currentSearch = '';

function renderCatalog() {
  if (!document.getElementById('catalog-grid')) return;

  const products = getProducts();
  const filtered = products.filter(p => {
    const matchCat = currentCategory === 'All' || p.category === currentCategory;
    const matchSearch = currentSearch === '' ||
      p.name.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });

  const countEl = document.getElementById('catalog-count');
  if (countEl) {
    countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
  }

  renderProductGrid(filtered, 'catalog-grid');
}

function initCatalog() {
  if (!document.getElementById('catalog-grid')) return;

  const searchInput = document.getElementById('search-input');
  const filterChips = document.querySelectorAll('.filter-chip');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      renderCatalog();
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) {
    currentCategory = catParam;
    filterChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.category === catParam);
    });
  }

  renderCatalog();
}

/* ============================================================
   RENDER: PRODUCT DETAIL PAGE
   ============================================================ */
function renderProductDetail() {
  const detailContainer = document.getElementById('product-detail-content');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    detailContainer.innerHTML = `
      <div class="no-results text-center" style="padding:80px 20px">
        <span class="no-results__icon">😕</span>
        <h3>Product not found</h3>
        <p>The product you're looking for doesn't exist.</p>
        <a href="catalog.html" class="btn btn-primary" style="margin-top:20px">Browse Catalog</a>
      </div>
    `;
    return;
  }

  const product = getProductById(productId);

  if (!product) {
    detailContainer.innerHTML = `
      <div class="no-results text-center" style="padding:80px 20px">
        <span class="no-results__icon">😕</span>
        <h3>Product not found</h3>
        <p>This product may have been removed or the link is invalid.</p>
        <a href="catalog.html" class="btn btn-primary" style="margin-top:20px">Browse Catalog</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} — Tripura Heritage`;

  const images = product.images && product.images.length >= 4
    ? product.images
    : [product.image, product.image, product.image, product.image];

  const sizesHTML = product.sizes && product.sizes.length > 0
    ? `<div>
        <div class="product-detail__label">Select Size</div>
        <div class="size-selector" id="size-selector">
          ${product.sizes.map((s, i) =>
            `<button class="size-btn${i === 0 ? ' active' : ''}" data-size="${s}">${s}</button>`
          ).join('')}
        </div>
      </div>`
    : '';

  const thumbnailsHTML = images.map((img, i) => `
    <div class="product-detail__thumb${i === 0 ? ' active' : ''}" data-index="${i}">
      <img src="${img}" alt="${product.name} view ${i + 1}" loading="lazy"
           onerror="this.src='https://picsum.photos/seed/${product.id}${i}/400/500'">
    </div>
  `).join('');

  detailContainer.innerHTML = `
    <div class="product-detail__breadcrumb">
      <a href="index.html">Home</a>
      <span class="product-detail__breadcrumb-sep">›</span>
      <a href="catalog.html">Catalog</a>
      <span class="product-detail__breadcrumb-sep">›</span>
      <a href="catalog.html?category=${encodeURIComponent(product.category)}">${product.category}</a>
      <span class="product-detail__breadcrumb-sep">›</span>
      <span>${product.name}</span>
    </div>

    <div class="product-detail__layout">
      <div class="product-detail__gallery">
        <div class="product-detail__main-img-wrap">
          <img
            id="main-product-img"
            src="${images[0]}"
            alt="${product.name}"
            class="product-detail__main-img"
            onerror="this.src='https://picsum.photos/seed/${product.id}/400/500'"
          >
        </div>
        <div class="product-detail__thumbnails">
          ${thumbnailsHTML}
        </div>
      </div>

      <div class="product-detail__info">
        <div>
          <span class="product-detail__category">${product.category}</span>
        </div>
        <h1 class="product-detail__name">${product.name}</h1>
        <div class="product-detail__price">₹${product.price.toLocaleString('en-IN')}</div>

        <hr class="product-detail__divider">

        <p class="product-detail__desc">${product.description}</p>

        <hr class="product-detail__divider">

        ${sizesHTML}

        <div>
          <div class="product-detail__label">Quantity</div>
          <div class="qty-picker">
            <button class="qty-btn" id="qty-minus">−</button>
            <input type="number" class="qty-input" id="qty-input" value="1" min="1" max="99" readonly>
            <button class="qty-btn" id="qty-plus">+</button>
          </div>
        </div>

        <div class="product-detail__cta">
          <button class="btn btn-primary btn-lg btn-full" id="add-to-cart-btn">
            <span class="btn-icon">🛒</span> Add to Cart
          </button>
          <a
            href="${generateWhatsAppLink(`I want to order: ${product.name} - ₹${product.price.toLocaleString('en-IN')}. Please help me place the order.`)}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-whatsapp btn-lg btn-full"
          >
            <span class="btn-icon">💬</span> Order via WhatsApp
          </a>
        </div>

        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;font-size:0.82rem;color:var(--text-muted);display:flex;gap:8px;align-items:flex-start">
          <span>📦</span>
          <span>Free delivery on orders above ₹2,000. Handcrafted items may have slight variations — that's the beauty of artisan work!</span>
        </div>
      </div>
    </div>
  `;

  // Thumbnail click handlers
  detailContainer.querySelectorAll('.product-detail__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index);
      const mainImg = document.getElementById('main-product-img');
      if (mainImg) {
        mainImg.src = images[index];
      }
      detailContainer.querySelectorAll('.product-detail__thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Size selector
  detailContainer.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      detailContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Qty controls
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    const v = parseInt(qtyInput.value);
    if (v > 1) qtyInput.value = v - 1;
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    const v = parseInt(qtyInput.value);
    if (v < 99) qtyInput.value = v + 1;
  });

  // Add to cart
  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    const activeSize = detailContainer.querySelector('.size-btn.active');
    const size = activeSize ? activeSize.dataset.size : null;
    addToCart(product.id, qty, size);
  });

  // Related products
  renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
  const relatedContainer = document.getElementById('related-products');
  if (!relatedContainer) return;

  const allProducts = getProducts();
  const related = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  if (related.length === 0) {
    relatedContainer.closest('section')?.remove();
    return;
  }

  renderProductGrid(related, 'related-products');
}

/* ============================================================
   RENDER: CART PAGE
   ============================================================ */
function renderCart() {
  const cartContainer = document.getElementById('cart-content');
  if (!cartContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty__icon">🛒</span>
        <h2 class="cart-empty__title">Your cart is empty</h2>
        <p class="cart-empty__desc">Looks like you haven't added any items yet.</p>
        <a href="catalog.html" class="btn btn-primary btn-lg">Start Shopping</a>
      </div>
    `;
    return;
  }

  const total = getCartTotal();
  const delivery = total >= 2000 ? 'FREE' : '₹99';
  const deliveryAmt = total >= 2000 ? 0 : 99;
  const grandTotal = total + deliveryAmt;

  const cartItemsHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <a href="product.html?id=${item.productId}" class="cart-item__img-wrap">
        <img
          src="${item.image}"
          alt="${item.name}"
          class="cart-item__img"
          loading="lazy"
          onerror="this.src='https://picsum.photos/seed/${item.productId}/400/500'"
        >
      </a>
      <div class="cart-item__details">
        <div class="cart-item__name">
          <a href="product.html?id=${item.productId}" style="color:inherit;text-decoration:none">${item.name}</a>
        </div>
        <div class="cart-item__category">${item.category}${item.size && item.size !== 'One Size' ? ` · Size: ${item.size}` : ''}</div>
        <div class="cart-item__price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="cart-item__controls">
          <button class="cart-item__qty-btn" data-action="decrease" data-key="${item.key}">−</button>
          <span class="cart-item__qty">${item.qty}</span>
          <button class="cart-item__qty-btn" data-action="increase" data-key="${item.key}">+</button>
          <span style="font-size:0.78rem;color:var(--text-faint);margin-left:4px">× ₹${item.price.toLocaleString('en-IN')} each</span>
        </div>
      </div>
      <button class="cart-item__remove" data-key="${item.key}" aria-label="Remove item">✕</button>
    </div>
  `).join('');

  cartContainer.innerHTML = `
    <div class="cart-items">
      ${cartItemsHTML}
    </div>

    <div class="cart-summary">
      <div class="cart-summary__row">
        <span>Subtotal (${cart.reduce((s, i) => s + i.qty, 0)} items)</span>
        <span>₹${total.toLocaleString('en-IN')}</span>
      </div>
      <div class="cart-summary__row">
        <span>Delivery</span>
        <span style="color:${deliveryAmt === 0 ? 'var(--success)' : 'inherit'}">${delivery}</span>
      </div>
      <div class="cart-summary__row total">
        <span>Total</span>
        <span>₹${grandTotal.toLocaleString('en-IN')}</span>
      </div>
    </div>

    <div class="cart-delivery-note">
      <span>📦</span>
      <span>${total >= 2000 ? '🎉 You qualify for FREE delivery!' : `Add ₹${(2000 - total).toLocaleString('en-IN')} more to get FREE delivery.`} Estimated delivery: 3–7 business days across India.</span>
    </div>

    <div class="cart-actions">
      <a
        id="whatsapp-order-btn"
        href="${generateWhatsAppLink(buildCartWhatsAppMessage() || '')}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-whatsapp btn-lg btn-full"
      >
        <span class="btn-icon">💬</span> Proceed to WhatsApp Order
      </a>
      <a href="catalog.html" class="btn btn-ghost btn-full">
        ← Continue Shopping
      </a>
      <button id="clear-cart-btn" class="btn btn-danger btn-sm" style="align-self:center">
        🗑 Clear Cart
      </button>
    </div>
  `;

  // Event delegation for cart controls
  cartContainer.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action], [data-key].cart-item__remove, #clear-cart-btn');
    if (!target) return;

    if (target.id === 'clear-cart-btn') {
      if (confirm('Clear all items from cart?')) {
        clearCart();
        renderCart();
      }
      return;
    }

    const key = target.dataset.key;
    if (!key) return;

    if (target.classList.contains('cart-item__remove')) {
      removeFromCart(key);
      renderCart();
      return;
    }

    const action = target.dataset.action;
    const item = getCart().find(i => i.key === key);
    if (!item) return;

    if (action === 'increase') {
      updateQty(key, item.qty + 1);
    } else if (action === 'decrease') {
      updateQty(key, item.qty - 1);
    }
    renderCart();
  });
}

/* ============================================================
   RENDER: HOME PAGE
   ============================================================ */
function renderHome() {
  const featuredContainer = document.getElementById('featured-products');
  if (!featuredContainer) return;

  const products = getProducts();
  const featured = products.slice(0, 8);
  renderProductGrid(featured, 'featured-products');
}

/* ============================================================
   RENDER: ADMIN DASHBOARD
   ============================================================ */
function renderAdminDashboard() {
  const adminContainer = document.getElementById('admin-content');
  if (!adminContainer) return;

  const pwd = prompt('Enter admin password to continue:');
  if (pwd !== 'admin123') {
    alert('Incorrect password. Redirecting to home page.');
    window.location.href = 'index.html';
    return;
  }

  buildAdminUI();
}

function buildAdminUI() {
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];

  const statsContainer = document.getElementById('admin-stats');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-card__value">${products.length}</div>
        <div class="stat-card__label">Total Products</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__value">${categories.length}</div>
        <div class="stat-card__label">Categories</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__value">₹${Math.min(...products.map(p => p.price)).toLocaleString('en-IN')}</div>
        <div class="stat-card__label">Lowest Price</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__value">₹${Math.max(...products.map(p => p.price)).toLocaleString('en-IN')}</div>
        <div class="stat-card__label">Highest Price</div>
      </div>
    `;
  }

  renderAdminTable();
}

function renderAdminTable() {
  const tableContainer = document.getElementById('admin-table-container');
  if (!tableContainer) return;

  const products = getProducts();

  const getBadgeClass = (cat) => {
    const map = { 'Rignai': 'rignai', 'Risa': 'risa', 'Rikutu': 'rikutu', 'Accessories': 'accessories' };
    return map[cat] || 'risa';
  };

  tableContainer.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr data-id="${p.id}">
              <td style="color:var(--text-faint)">#${p.id}</td>
              <td>
                <img src="${p.image}" alt="${p.name}" class="admin-table__img"
                     onerror="this.src='https://picsum.photos/seed/${p.id}/400/500'">
              </td>
              <td style="max-width:200px">
                <span class="admin-name-display">${p.name}</span>
              </td>
              <td>
                <span class="admin-badge admin-badge--${getBadgeClass(p.category)}">${p.category}</span>
              </td>
              <td style="font-weight:600;color:var(--primary)">₹${p.price.toLocaleString('en-IN')}</td>
              <td>
                <div class="admin-table__actions">
                  <button class="btn btn-ghost btn-sm admin-edit-btn" data-id="${p.id}">Edit</button>
                  <button class="btn btn-danger btn-sm admin-delete-btn" data-id="${p.id}">Delete</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Delete buttons
  tableContainer.querySelectorAll('.admin-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const product = getProductById(id);
      if (!product) return;
      if (confirm(`Delete "${product.name}"? This cannot be undone.`)) {
        deleteProduct(id);
        renderAdminTable();
        rebuildAdminStats();
        showToast('Product deleted', 'success');
      }
    });
  });

  // Edit buttons
  tableContainer.querySelectorAll('.admin-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      openEditModal(id);
    });
  });
}

function openEditModal(id) {
  const product = getProductById(id);
  if (!product) return;

  const existing = document.getElementById('edit-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'edit-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:2000;
    display:flex;align-items:center;justify-content:center;padding:20px;
  `;

  overlay.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--border-strong);border-radius:var(--radius-lg);
                padding:24px;width:100%;max-width:500px;max-height:80vh;overflow-y:auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h3 style="color:var(--text)">Edit Product #${product.id}</h3>
        <button id="close-modal" style="background:none;border:none;color:var(--text-muted);font-size:1.4rem;cursor:pointer">✕</button>
      </div>
      <div class="form-grid" style="grid-template-columns:1fr">
        <div class="form-group">
          <label class="form-label">Product Name</label>
          <input type="text" class="form-input" id="edit-name" value="${product.name}">
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="edit-category">
            <option value="Rignai" ${product.category === 'Rignai' ? 'selected' : ''}>Rignai</option>
            <option value="Risa" ${product.category === 'Risa' ? 'selected' : ''}>Risa</option>
            <option value="Rikutu" ${product.category === 'Rikutu' ? 'selected' : ''}>Rikutu</option>
            <option value="Accessories" ${product.category === 'Accessories' ? 'selected' : ''}>Accessories</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Price (₹)</label>
          <input type="number" class="form-input" id="edit-price" value="${product.price}" min="1">
        </div>
        <div class="form-group">
          <label class="form-label">Image URL</label>
          <input type="url" class="form-input" id="edit-image" value="${product.image}" placeholder="https://...">
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" id="edit-desc" style="min-height:100px">${product.description}</textarea>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button id="save-edit-btn" class="btn btn-primary" style="flex:1">Save Changes</button>
        <button id="cancel-edit-btn" class="btn btn-ghost">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#close-modal').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#cancel-edit-btn').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelector('#save-edit-btn').addEventListener('click', () => {
    const name = document.getElementById('edit-name').value.trim();
    const category = document.getElementById('edit-category').value;
    const price = parseInt(document.getElementById('edit-price').value);
    const image = document.getElementById('edit-image').value.trim();
    const description = document.getElementById('edit-desc').value.trim();

    if (!name || !category || isNaN(price) || price < 1) {
      showToast('Please fill in all required fields correctly.', 'error');
      return;
    }

    updateProduct(id, { name, category, price, image: image || product.image, description });
    overlay.remove();
    renderAdminTable();
    rebuildAdminStats();
    showToast('Product updated successfully', 'success');
  });
}

function rebuildAdminStats() {
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];
  const statsContainer = document.getElementById('admin-stats');
  if (!statsContainer) return;

  statsContainer.innerHTML = `
    <div class="stat-card">
      <div class="stat-card__value">${products.length}</div>
      <div class="stat-card__label">Total Products</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__value">${categories.length}</div>
      <div class="stat-card__label">Categories</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__value">₹${Math.min(...products.map(p => p.price)).toLocaleString('en-IN')}</div>
      <div class="stat-card__label">Lowest Price</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__value">₹${Math.max(...products.map(p => p.price)).toLocaleString('en-IN')}</div>
      <div class="stat-card__label">Highest Price</div>
    </div>
  `;
}

function initAddProductForm() {
  const form = document.getElementById('add-product-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('ap-name').value.trim();
    const category = document.getElementById('ap-category').value;
    const price = parseInt(document.getElementById('ap-price').value);
    const image = document.getElementById('ap-image').value.trim();
    const description = document.getElementById('ap-desc').value.trim();
    const sizesRaw = document.getElementById('ap-sizes').value.trim();

    if (!name || !category || isNaN(price) || price < 1 || !description) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const sizes = sizesRaw ? sizesRaw.split(',').map(s => s.trim()).filter(Boolean) : ['S', 'M', 'L'];
    const imageUrl = image || `https://picsum.photos/seed/${Date.now()}/400/500`;

    addProduct({ name, category, price, image: imageUrl, description, sizes });
    form.reset();
    renderAdminTable();
    rebuildAdminStats();
    showToast(`"${name}" added successfully!`, 'success');
  });
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   PWA INSTALL BANNER
   ============================================================ */
let deferredInstallPrompt = null;

function initPWABanner() {
  if (localStorage.getItem(STORAGE_KEYS.PWA_DISMISSED) === 'true') return;

  const banner = document.getElementById('pwa-banner');
  if (!banner) return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;

    setTimeout(() => {
      banner.classList.add('show');
    }, 3000);
  });

  const installBtn = document.getElementById('pwa-install-btn');
  const dismissBtn = document.getElementById('pwa-dismiss-btn');

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      const result = await deferredInstallPrompt.userChoice;
      if (result.outcome === 'accepted') {
        banner.classList.remove('show');
        showToast('Tripura Heritage installed!', 'success');
      }
      deferredInstallPrompt = null;
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.classList.remove('show');
      localStorage.setItem(STORAGE_KEYS.PWA_DISMISSED, 'true');
    });
  }

  // Show for iOS Safari (no beforeinstallprompt)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.navigator.standalone;
  if (isIOS && !isStandalone) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 4000);
  }
}

/* ============================================================
   SERVICE WORKER REGISTRATION
   ============================================================ */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('[TH] Service Worker registered:', reg.scope);
        })
        .catch(err => {
          console.warn('[TH] Service Worker registration failed:', err);
        });
    });
  }
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Seed products on first load
  getProducts();

  // Always run
  initNav();
  updateCartBadge();
  registerServiceWorker();
  initPWABanner();

  // Page-specific init
  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') {
    renderHome();
  } else if (page === 'catalog.html') {
    initCatalog();
  } else if (page === 'product.html') {
    renderProductDetail();
  } else if (page === 'cart.html') {
    renderCart();
  } else if (page === 'admin.html') {
    renderAdminDashboard();
    initAddProductForm();
  }
});
