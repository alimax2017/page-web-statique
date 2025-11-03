// Simple client-side cart (no backend)
document.addEventListener('DOMContentLoaded', () => {
  const addBtns = document.querySelectorAll('.add-btn');
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const yearEl = document.getElementById('year');

  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  function updateUI(){
    const items = Object.values(cart);
    const count = items.reduce((s,i)=> s + i.qty, 0);
    const total = items.reduce((s,i)=> s + i.qty * i.price, 0);
    cartCountEl.textContent = count;
    cartTotalEl.textContent = total.toFixed(2);
    // render items
    cartItemsEl.innerHTML = '';
    if(items.length === 0){
      cartItemsEl.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
      items.forEach(it => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${it.img}" alt="${it.name}">
          <div style="flex:1">
            <div style="font-weight:600">${it.name}</div>
            <div style="color:#666;font-size:.95rem">${it.qty} × ${it.price} €</div>
          </div>
          <div>
            <button class="btn-outline qty-btn" data-id="${it.id}" data-op="-" style="margin-right:6px">−</button>
            <button class="btn-outline qty-btn" data-id="${it.id}" data-op="+" >+</button>
          </div>
        `;
        cartItemsEl.appendChild(div);
      });
      // bind qty buttons
      document.querySelectorAll('.qty-btn').forEach(b=>{
        b.addEventListener('click', e=>{
          const id = b.dataset.id;
          const op = b.dataset.op;
          if(op === '+') cart[id].qty++;
          else {
            cart[id].qty--;
            if(cart[id].qty <= 0) delete cart[id];
          }
          saveAndUpdate();
        });
      });
    }
  }

  function saveAndUpdate(){
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
  }

  // init product images from DOM cards
  document.querySelectorAll('.card').forEach(card=>{
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const img = card.querySelector('img')?.src || '';
    const addBtn = card.querySelector('.add-btn');
    addBtn.addEventListener('click', () => {
      if(!cart[id]) cart[id] = {id, name, price, img, qty:0};
      cart[id].qty++;
      saveAndUpdate();
      // little feedback
      addBtn.textContent = 'Ajouté ✓';
      setTimeout(()=> addBtn.textContent = 'Ajouter au panier', 900);
    });
  });

  cartBtn.addEventListener('click', ()=> {
    cartModal.classList.remove('hidden');
    updateUI();
  });
  closeCart.addEventListener('click', ()=> cartModal.classList.add('hidden'));
  checkoutBtn.addEventListener('click', ()=> {
    alert('Processus de paiement non implémenté dans cette page statique. Exportez le panier ou intégrez un service (Stripe) pour le paiement.');
  });

  // set year
  yearEl.textContent = new Date().getFullYear();

  // initial UI update
  updateUI();
});
