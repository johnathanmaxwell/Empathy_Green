// let btngo= document.getElementById('go');
// btngo = addEventListener('click',function(){
//   alert("SUcc");
// })

$(window).on('load', function() {
  shoppingCart.clearCart();
  displayCart();
})

var shoppingCart = (function() {
var cart = [];

function Item(name, price, count) {
this.name = name;
this.price = price;
this.count = count;
}

function saveCart() {
sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCart() {
cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
}

if (sessionStorage.getItem("shoppingCart") != null) {
loadCart();
}
var obj = {};

obj.addItemToCart = function(name, price, count) {
for (var item in cart) {
if (cart[item].name === name) {
  cart[item].count++;
  saveCart();
  return;
}
}
var item = new Item(name, price, count);
cart.push(item);
$('#update').prop('disabled', false);
saveCart();
}

obj.setCountForItem = function(name, count) {
for (var i in cart) {
if (cart[i].name === name) {
  cart[i].count = count;
  break;
}
}
saveCart();
};

obj.removeItemFromCart = function(name) {
for (var item in cart) {
if (cart[item].name === name) {
  cart[item].count--;
  if (cart[item].count === 0) {
    cart.splice(item, 1);
  }
  break;
}
}
saveCart();
}

obj.removeItemFromCartAll = function(name) {
for (var item in cart) {
if (cart[item].name === name) {
  cart.splice(item, 1);
  if (cart.length == 0) $('#update').prop('disabled', true);
  break;
}
}
saveCart();
}

obj.clearCart = function() {
cart = [];
saveCart();
}

obj.totalCount = function() {
var totalCount = 0;
for (var item in cart) {
totalCount += cart[item].count;
}
return totalCount;
}

obj.totalCart = function() {
var totalCart = 0;
for (var item in cart) {
totalCart += cart[item].price * cart[item].count;
}
return Number(totalCart.toFixed(2));
}

obj.listCart = function() {
var cartCopy = [];
for (var i in cart) {
var item = cart[i];
var itemCopy = {};
for (var prop in item) {
  itemCopy[prop] = item[prop];
}
itemCopy.total = Number(item.price * item.count).toFixed(2);
cartCopy.push(itemCopy);
}
return cartCopy;
}

return obj;
})();

$('.add-to-cart').click(function(event) {
event.preventDefault();
var name = $(this).data('name');
var price = Number($(this).data('price'));
shoppingCart.addItemToCart(name, price, 1);
displayCart();
});

$('.clear-cart').click(function() {
shoppingCart.clearCart();
displayCart();
$('#update').prop('disabled', true);
});

function displayCart() {
var cartArray = shoppingCart.listCart();
var output = "";
var totalCartPrice = shoppingCart.totalCart(); // Calculate the total cart price

for (var i in cartArray) {
output += "<tr>" +
"<td>" + cartArray[i].name + "</td>" +
"<td>(" + cartArray[i].price + ")</td>" +
"<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>" +
"<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
"<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>" +
"<td><button class='delete-item btn bg-danger' data-name='" + cartArray[i].name + "'>X</button></td>" +
" = " +
"<td>" + cartArray[i].total + "</td>" +
"</tr>";
}

$('.show-cart').html(output);
$('.total-cart').html(totalCartPrice);
$('.total-count').html(shoppingCart.totalCount());

// Enable or disable the "Order now" button
var orderNowButton = $('#orderNowButton');
if (totalCartPrice > 0) {
orderNowButton.prop('disabled', false);
} else {
orderNowButton.prop('disabled', true);
}

$('.delete-item').click(function() {
var name = $(this).data('name');
shoppingCart.removeItemFromCartAll(name);
displayCart();
});
}

$('.show-cart').on("click", ".delete-item", function(event) {
var name = $(this).data('name');
shoppingCart.removeItemFromCartAll(name);
displayCart();
});

$('.show-cart').on("click", ".minus-item", function(event) {
var name = $(this).data('name');
shoppingCart.removeItemFromCart(name);
displayCart();
});

$('.show-cart').on("click", ".plus-item", function(event) {
var name = $(this).data('name');
shoppingCart.addItemToCart(name);
displayCart();
});

$('.show-cart').on("change", ".item-count", function(event) {
var name = $(this).data('name');
var count = Number($(this).val());
shoppingCart.setCountForItem(name, count);
displayCart();
});

function updateCartCount() {
$('.cart-count').html('Cart (' + shoppingCart.totalCount() + ')');
}

updateCartCount();

// Add this event listener to the "Order now" button
$('#orderNowButton').click(function() {
// Close the old modal
$('#update').prop('disabled', true);
shoppingCart.clearCart();
displayCart()
$('#cart').modal('hide');

// Show the new modal
$('#orderSuccessModal').modal('show');
});


// footer box start



     //ft next one
     var sb = document.getElementById("submit-button");
    var myTextBox = document.getElementById("feedback-input");

    function updateButtonState() {
        if (myTextBox.value.trim() === "") {
            sb.disabled = true;
        } else {
            sb.disabled = false;
        }
    }

    function addList(event) {
        if (event.key === "Enter") {
            if (myTextBox.value.trim() === "") {
                window.alert("No value entered.");
            } else {
                // Enable the buttontrigger the modal
                sb.disabled = false;
                document.getElementById("feedback-modal").modal('show');
                clearInputField();
            }
        }
    }

    myTextBox.addEventListener("input", updateButtonState);
    myTextBox.addEventListener("keypress", addList);

    function clearInputField() {
        myTextBox.value = ""; // Clear the input field
        updateButtonState(); // Disable the button again
    }

    
    // index btn

  
