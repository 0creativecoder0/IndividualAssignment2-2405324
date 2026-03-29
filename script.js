// Update cart display (Cart page)
function updateCart() {
  const cartTableBody = document.querySelector("#cartTable tbody");
  if (!cartTableBody) return; // Only run on cart.html

  cartTableBody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    // Show placeholder row when cart is empty
    cartTableBody.innerHTML = `<tr><td colspan="4">Your cart is empty</td></tr>`;
  } else {
    cart.forEach((item, index) => {
      // --- Validation ---
      if (typeof item.price !== "number" || isNaN(item.price)) {
        item.price = 0;
      }
      if (typeof item.quantity !== "number" || item.quantity < 1) {
        item.quantity = 1;
      }

      let subtotal = item.price * item.quantity;
      total += subtotal;

      cartTableBody.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>
            <button class="decrease" data-index="${index}">-</button>
            ${item.quantity}
            <button class="increase" data-index="${index}">+</button>
          </td>
          <td>$${subtotal.toFixed(2)}</td>
        </tr>
      `;
    });
  }

  // --- Totals ---
  let discount = total > 50 ? 5 : 0;
  let tax = total * 0.1;
  let grandTotal = total - discount + tax;

  document.getElementById("discount").textContent = "$" + discount.toFixed(2);
  document.getElementById("tax").textContent = "$" + tax.toFixed(2);
  document.getElementById("grandTotal").textContent = "$" + grandTotal.toFixed(2);

  // --- Quantity controls ---
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      let idx = btn.getAttribute("data-index");
      cart[idx].quantity++;
      saveCart();
      updateCart();
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      let idx = btn.getAttribute("data-index");
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        cart.splice(idx, 1); // remove item if quantity goes to 0
      }
      saveCart();
      updateCart();
    });
  });
}