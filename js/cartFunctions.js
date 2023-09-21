// cartFunctions.js

function updateCart(cartItemsList, cartTotal, cart) {
  const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const cart = [];
    cartItemsList.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹${item.price}`;
  
      const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.addEventListener("click", () => {
  removeFromCart(index, cart); // Pass the cart array
});
  
      li.appendChild(removeButton);
      cartItemsList.appendChild(li);
      total += item.price;
    });
  
    cartTotal.textContent = `Total: ₹${total}`;
}
  
function removeFromCart(index, cart) {
  cart.splice(index, 1);
  updateCart(cartItemsList, cartTotal, cart);
}






  