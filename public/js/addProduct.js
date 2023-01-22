let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// window.onload = () => {
//     if(user){
//         if(!compareToken(user.authToken, user.email)){
//             location.replace('/login');
//         }
//     }else{
//         location.replace('/login');
//     }
// }

// input harga
const actualHarga = document.querySelector('#actual-price');
const diskon = document.querySelector('#discount');
const sellPrice = document.querySelector('#sell-price');

diskon.addEventListener('input', () => {
    if(diskon.value > 100){
        diskon.value = 90;
    } else{
        let discount = actualHarga.value *diskon.value / 100;
        sellPrice.value = actualHarga.value - discount;
    }
})

sellPrice.addEventListener('input', () => {
    let discount = (sellPrice.value / actualHarga.value) * 100;
    diskon.value = discount;
})

//upload gambar
let uploadImages = document.querySelector('.fileupload');
let imagePaths = [];