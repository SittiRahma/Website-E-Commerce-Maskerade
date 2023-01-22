let loader = document.querySelector('.loader');

const becomeSellerElement = document.querySelector('.become-seller');
const productListElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

// window.onload = () => {
//     if(sessionStorage.user){
//         let user = JSON.parse(sessionStorage.user);
//         if(compareToken(user.authToken, user.email)){
//             if(!user.seller){
//                 becomeSellerElement.classList.remove('hide');
//             }
//             else {
//                 productListElement.classList.remove('hide');
//             }
//         }else {
//             location.replace('/login');
//         }
//     }else {
//         location.replace('/login');
//     }
// }

showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

// form submission
const applyFormBtn = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');
const legitInfo = document.querySelector('#legitInfo');

applyFormBtn.addEventListener('click', () =>{
    if(!businessName.ariaValueMax.length || !address.ariaValueMax.length || !about.ariaValueMax.length
    || !number.ariaValueMax.length) {
        showAlert('Masukkan semua  input');
    } else if (!tac.checked || !legitInfo.checked){
        showAlert('Kamu harus ceklis term and conditions');
    }else {
        // Membuat server request
        loader.style.display = 'block';
        sendData('/seller', {
            name: businessName.value,
            address: address.value,
            about: about.value,
            number: number.value, 
            tac: tac.checked,
            legitInfo: legitInfo.checked,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})