const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const amount = document.querySelector(".amount");
const addBtn = document.querySelector(".add_btn");
const cartBtn = document.querySelector(".cart-btn");
const indicator = document.querySelector(".indicator");
const cart = document.querySelector(".cart-wrp");
const wrp = document.querySelector(".cart-content");

let amountValue = 0;

function handlePlus() {
  amountValue++;
  amount.innerText = amountValue;
}
function handleMinus() {
  if (amountValue > 0) {
    amountValue--;
  }
  amount.innerText = amountValue;
}

function toggleCart() {
  cart.classList.toggle("invisible");
}

var bayar = 210.000 * amountValue; 

function addItem() {
  if (amountValue > 0) {
      const total = 210.000 * amountValue;
  wrp.classList.remove("empty");
  wrp.innerHTML = `<div class="product">
                  <div>
                    <img src="../img/baju/foto7.jpg" class="product-img" alt="product">
                    <div class="product-info">
                      <p class="product-title">Motif Lontara</p>
                      <p><span>Rp210.000</span> × <span class="number">${amountValue}</span> <br> <b>Rp${total}.000</b></p>
                    </div>
                    <button class="delete-btn" onclick="deleteItem()"><img src="../images/icon-delete.svg" alt="delete"></button>
                    </div>
                    <button class="checkout-btn" onclick="window.location='transfer.html'">Checkout</button>
                  </div>`;
    indicator.style.display = "block";
    indicator.innerText = amountValue;
  }
}

function deleteItem() {
  wrp.classList.add("empty");
  wrp.innerHTML = `<p>Your cart is empty</p>`;
  indicator.style.display = "none";
}

plusBtn.addEventListener("click", handlePlus);
minusBtn.addEventListener("click", handleMinus);
cartBtn.addEventListener("click", toggleCart);
addBtn.addEventListener("click", addItem);

// const product =  [
//     {
//         id : 0,
//         image : 'img/baju/foto1.jpg',
//         title : 'Tenun Toraja',
//         price : 120000
//     },
//     {
//         id : 1,
//         image : 'img/baju/foto2.jpg',
//         title : 'Tenun Bali',
//         price : 220000
//     },
//     {
//         id : 2,
//         image : 'img/baju/foto3.jpg',
//         title : 'Tenun Makassar',
//         price : 150000
//     },
//     {
//         id : 3,
//         image : 'img/baju/foto4.jpg',
//         title : 'Tenun Kupang',
//         price : 210000
//     },
//     {
//         id : 4,
//         image : 'img/baju/foto5.jpg',
//         title : 'Tenun Lontara',
//         price : 245000
//     },
// ];
// const categories = [...new Set(product.map((item)=>
//     {return item}))]
//     let i=0;
// document.getElementById('cart').innerHTML = categories.map((item)=>
// {
//     var {image, title, price} = item;
//     return(
//         `<div class='box'>
//             <div class='img-box'>
//                 <img class='images' src =${image}></img>
//             </div>
//         <div class='bottom'>
//         <p>${title}</p>
//         <h2>Rp ${price}</h2>` +
//         "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
//         `</div>
//         </div>`
//     )
// })