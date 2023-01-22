// Pilihan Baju
var MainImg = document.getElementById("MainImg");
    var smallImg = document.getElementsByClassName("small-img");

    smallImg[0].onclick = function(){
        MainImg.src = smallImg[0].src;
    }
    smallImg[1].onclick = function(){
        MainImg.src = smallImg[1].src;
    }
    smallImg[2].onclick = function(){
        MainImg.src = smallImg[2].src;
    }
    smallImg[3].onclick = function(){
        MainImg.src = smallImg[3].src;
    }

// Pilihan Warna
const colorBtns = document.querySelectorAll('.color-radio-btn');
let checkedBtnColor = 0;

colorBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        colorBtns[checkedBtnColor].classList.remove('check');
        item.classList.add('check');
        checkedBtnColor = i;
    })
})

//Image Slider
// const productImages = document.querySelector("small-img-group img");
// const productImageSlide = document.querySelector(".single-pro-image");

// let activeImageSlide = 0;

// productImages.forEach((item, i) => {
//     item.addEventListener('click', () => {
//         productImages[activeImageSlide].classList.remove('active');
//         item.classList.add('active');
//         productImageSlide.style.backgroundImage = `url('${item.src}')`;
//         activeImageSlide = i;
//     })
// })
// Pilihan Size
const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtnSize = 0;

sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtnSize].classList.remove('check');
        item.classList.add('check');
        checkedBtnSize = i;
    })
})

// Tambahkan ke cart

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}

var image = document.getElementById('MainImg');
var motif = document.getElementById('motif');
var harga = document.getElementById('harga');
var cart = [];

function displaycart(a){
    let j = 0;
    if(categories.length==0){
        document.getElementById('MainImg').innerHTML = "Keranjang Kosong";
    }
    else {
        document.getElementById('MainImg').innerHTML = cart.map((items) => {
            var {image, motif, harga} = items;
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowing' src=${image}>
                </div>
                <p style='font-size:12px;'>${motif}</p>
                <h2 style='font-size: 15px;'>Rp ${harga}</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            )
        }).join('');
    }
}

// product page setting

let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let price = document.querySelector('.price');
let productImg = document.querySelector('#MainImg');
let detail = document.querySelector('.detail-product');
let title = document.querySelector('title');

const setData = () => {
    productName.innerHTML = title.innerHTML = data.name;
    productImg.src = data.image;
    shortDes.innerHTML = data.shortDes;
    detail.innerHTML = data.detail;
    price.innerHTML = `Rp${data.price}`;
}
const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        setData(data)
        getProducts(data.tags[0])
    })
    .catch(err => console.log(err))
}

let productId = null;
if (location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}

// Dapatkan data Produk
let namaProduk = document.querySelector('.nama-produk');
let tipeProduk = document.querySelector('.tipe-produk');
let gambarProduk = document.querySelector('.gambar-produk');
let hargaProduk = document.querySelector('.harga-produk');

let cartBtn = document.querySelector('.cart');
