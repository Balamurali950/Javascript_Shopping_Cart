    document.addEventListener('DOMContentLoaded', () => {
      const menu = [
          {name: 'Samsung Galaxy S23 Ultra', price: 124999.00},
          {name: 'Apple IPhone 14 Pro Max', price: 127999.00},
          {name: 'Vivo X90 Pro', price: 84999.00},
          {name: 'iQOO Neo 7 5G', price: 28999.00},
          {name: 'OnePlus Nord CE 3 Lite', price: 19999.00},
          {name: 'Lava Agni 2', price: 22999.00},
          {name: 'Xiaomi 13 Pro', price: 79999.00},
          {name: 'ASUS ROG Phone 7', price: 74999.00},
      ];

      const cartItemsList = document.querySelector('#cart-items');
      const cartTotalAmount = document.querySelector('#total-amount');
      const checkoutButton = document.querySelector('#checkout');

      const cart = {
          items: [],
          total: 0,
          addItem: function(item, quantity) {
              const cartItem = { ...item, quantity };
              this.items.push(cartItem);
              this.total += item.price * quantity;
          },
          removeItem: function(index) {
              const removedItem = this.items.splice(index, 1)[0];
              this.total -= removedItem.price * removedItem.quantity;
          },
          updateTotal: function() {
              cartTotalAmount.textContent = `Total: Rs ${this.total.toFixed(2)}`;
          },
          renderCart: function() {
              cartItemsList.innerHTML = '';
              this.items.forEach((item, index) => {
                  const li = document.createElement('li');
                  li.textContent = `${item.name} (x${item.quantity}) - Rs ${(item.price * item.quantity).toFixed(2)}`;
                  const removeButton = document.createElement('button');
                  removeButton.textContent = 'Remove';
                  removeButton.addEventListener('click', () => {
                      this.removeItem(index);
                      this.renderCart();
                  });
                  li.appendChild(removeButton);
                  cartItemsList.appendChild(li);
              });
          },
          checkout: function() {
              alert(`Your order total is Rs ${this.total.toFixed(2)}. Thank you for your order!`);
              this.items = [];
              this.total = 0;
              this.updateTotal();
              this.renderCart();
          }
      };

      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach((button, index) => {
          button.addEventListener('click', () => {
              const item = menu[index];
              const quantityValue = button.previousElementSibling.querySelector('.quantity-value');
              const quantity = parseInt(quantityValue.textContent);
              cart.addItem(item, quantity);
              cart.updateTotal();
              cart.renderCart();
          });
      });

      checkoutButton.addEventListener('click', () => {
          cart.checkout();
      });

      const decrementButtons = document.querySelectorAll('.decrement');
      const incrementButtons = document.querySelectorAll('.increment');

      decrementButtons.forEach(button => {
          button.addEventListener('click', () => {
              const quantityValue = button.nextElementSibling;
              let quantity = parseInt(quantityValue.textContent);
              if (quantity > 1) {
                  quantity--;
                  quantityValue.textContent = quantity;
              }
          });
      });

      incrementButtons.forEach(button => {
          button.addEventListener('click', () => {
              const quantityValue = button.previousElementSibling;
              let quantity = parseInt(quantityValue.textContent);
              quantity++;
              quantityValue.textContent = quantity;
          });
      });
  });