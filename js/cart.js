document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  // Retrieve the cart data from localStorage
  const savedCart = localStorage.getItem("cart");
  const cartData = savedCart ? JSON.parse(savedCart) : [];

  // Update the cart items and total using the common updateCart function
  updateCart(cartItemsList, cartTotal, cartData);

  const products = [
    {productId: "product1", name: "Rust Colored Jacket for Women", price: 1200, image:"images/rust jacket.jpeg"},
    {productId: "product2", name: "Women's Hoodies", price: 800, image:"images/hoodies_women.jpg" },
    {productId: "product3", name: "Brown Winter Coat", price: 2000, image:"images/coat_women.jpg" },
  
    {productId: "product4", name: "Men's Shirt", price: 800, image:"images/shirt_men.jpg"},
    {productId: "product5", name: "Black T-Shirt", price: 500, image:"images/siesta_men2.jpg"},
    {productId: "product6", name: "Blue Jeans", price: 1000, image:"images/jeans_men.jpg"},
  
    {productId: "product7", name: "Kid's T-Shirt", price: 700, image:"images/kids_tshiirt.jpg"},
    {productId: "product8", name: "Cardigan for Kids", price: 1300, image:"images/kids_card.jpg"},
    {productId: "product9", name: "Kid's Shorts", price: 500, image:"images/kids_shorts.jpg"},
  
    {productId: "product10", name: "Anarkali Dress for  Women", price: 2000, image:"images/womens_anar.jpg"},
    {productId: "product11", name: "Special Kurti", price: 1500, image:"images/Special Kurti.jpeg"},
    {productId: "product12", name: "Cotton Shalwar Kameez", price: 1000, image:"images/siesta_womens_trad.jpg"},
  
    {productId: "product13", name: "Men's Kurta", price: 1300, image:"images/mens_kurt.jpg"},
    {productId: "product14", name: "Kurta with Waistcoat", price: 2000, image:"images/Men's Kurta.jpeg"},
    {productId: "product15", name: "Men's Embroidered Sherwani", price: 2000, image:"images/siesta_men_trad.jpg"},
  
    {productId: "product16", name: "Sunglasses for Women", price: 600, image:"images/femglass.jpg"},
    {productId: "product17", name: "Earrings", price: 800, image:"images/earrings.jpeg"},
    {productId: "product18", name: "Men's Sunglasses", price: 600, image:"images/siesta_mens_acces.jpg"},
  
    {productId: "product19", name: "Jhonsons Baby Combo", price: 1500, image:"images/babycombo.jpg"},
    {productId: "product20", name: "Toothbrush for Babies", price: 200, image:"images/babybrush.jpg"},
    {productId: "product21", name: "Hair Brushes for Babies", price: 600, image:"images/babyhair.jpg"},
  
    {productId: "product22", name: "Unicorn Soft Toy", price: 700, image:"images/unicorn.jpg"},
    {productId: "product23", name: "Avocado Plushie", price: 500, image:"images/avosoft.jpg"},
    {productId: "product24", name: "Carrot Plushie", price: 1000, image:"images/carrotplush.jpg"},
  
    {productId: "product25", name: "Fenty Beauty Lip Gloss", price: 500, image:"images/fentygloss.jpg"},
    {productId: "product26", name: "Huda Beauty Eyeshadow", price: 1500, image:"images/eyeshadow.jpg"},
    {productId: "product27", name: "Huda Beauty Lipstick", price: 1200, image:"images/lipstick.jpg"},
  
    {productId: "product28", name: "White Bread", price: 80, image:"images/bread.jpg"},
    {productId: "product29", name: "Nutella Hazelnut Spread", price: 200, image:"images/nutella.jpg"},
    {productId: "product30", name: "Strawberry Jam", price: 500, image:"images/jam.jpg.jpeg"},  ];

  const cart = [];

  function updateCart(cartItemsList, cartTotal, cart) {
    if (!cartItemsList) {
      console.error("cart-items element not found.");
      return;
    }
  
    cartItemsList.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      const li = document.createElement("li");

      // Create a container for the image and product info
      const cartItemContainer = document.createElement("div");
      cartItemContainer.classList.add("cart-item-container"); // Add a class for styling if needed
  
      // Create an image element for the product
      const img = document.createElement("img");
      img.src = item.image; // Assuming 'image' is the property name for the image URL
      img.alt = item.name; // Set the alt attribute for accessibility
  
      const productInfo = document.createElement("span");
      productInfo.textContent = `${item.name} - ₹${item.price}`;
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "-";
      removeButton.addEventListener("click", () => {
        removeFromCart(index, cart, cartItemsList, cartTotal); // Pass the cart array and other variables
      });

      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button"); // Add a class to the remove button
      removeButton.setAttribute("data-product-index", index);
  
      /*removeButton.addEventListener("click", () => {
        const productIndex = parseInt(
          removeButton.getAttribute("data-product-index"),
          10
        );
        removeFromCart(productIndex);
      });*/
  
      cartItemContainer.appendChild(img);
      cartItemContainer.appendChild(productInfo);
  
      li.appendChild(cartItemContainer);
      li.appendChild(removeButton);
      cartItemsList.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = `Total: ₹${total}`;
  }

  function addToCart(product) {
    cart.push(product);
    updateCart();
  
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function removeFromCart(index, cart, cartItemsList, cartTotal) {
    cart.splice(index, 1);
    updateCart(cartItemsList, cartTotal, cart); // Update the cart display
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = button.getAttribute("data-product-id");
      const product = products.find((p) => p.productId === productId);

      if (product) {
        addToCart(product);
        alert("Added to cart");

        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  });

  checkoutBtn.addEventListener("click", () => {
    // Load cart content from cart.html
    fetch("cart.html")
      .then((response) => response.text())
      .then((cartContent) => {
        const cartContainer = document.createElement("div");
        cartContainer.innerHTML = cartContent;

        // Append cart content to the main page
        document.body.appendChild(cartContainer);

        // Initialize cart-related elements and their functionality
        const popup = document.getElementById("popup");
        const closePopup = document.getElementById("closePopup");

        checkoutBtn.addEventListener("click", () => {

          localStorage.removeItem("cart");

          popup.style.display = "block";
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
        
        closePopup.addEventListener("click", () => {
          popup.style.display = "none";
        });
        
        window.addEventListener("click", (event) => {
          if (event.target === popup) {
            popup.style.display = "none";
          }
        });        
        
      });
  });
});
