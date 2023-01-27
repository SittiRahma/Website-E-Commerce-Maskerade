const bar = document.querySelector('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

bar.addEventListener('click', () => {
    console.log("tombol bar tertekan")
})

close.addEventListener('click', () => {
    console.log("tombol bar tertekan")
})

if (bar){
    bar.addEventListener('click', () => {
       nav.classList.add('active'); 
       console.log("tombol bar tertekan")
    })
}