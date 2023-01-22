window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}



const loader = document.querySelector('.loader');

// select inputs
const submitBtn = document.querySelector('.submit-btn');
const nama = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;
const tac = document.querySelector('#terms-and-cond') || null;

submitBtn.addEventListener('click', () => {
    if (nama != null){ // sign up page
        if(nama.value.length < 3){
            showAlert('Nama harus terdiri dari minimal 3 huruf');
        }else if(!email.value.length){
            showAlert('Masukkan Email');
        }else if (password.value.length < 8) {
            showAlert('Password harus terdiri dari minimal 8 karakter');
        }else if(!number.value.length){
            showAlert('Masukkan nomor handphone kamu');
        }else if (!Number(number.value) || number.value.length < 10){
            showAlert('Nomor hp tidak valid, masukkan nomor yang valid')
        }/*else if (!tac.checkout){
           showAlert('Ceklis term and condition untuk melanjutkan')
        }*/ else {
            loader.style.display = 'block'
            sendData('/signup', {
                name: nama.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked,
            })
       }
    } else {
        //login page
        if(!email.value.length || !password.value.length){
            showAlert('Isi semua input')
        }else {
            loader.style.display = 'block'
            sendData('/login', {
                email: email.value,
                password: password.value,
            })
        }
    }
   
})

