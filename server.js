//import packages
import express from "express";
import bcrypt, { hash } from "bcrypt";
//const firebase1 = require("firebase");
// Required for side-effects
//require("firebase/firestore");
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKqDau3qeSXik-T-8ZdcjqDw0bdCDC9D8",
  authDomain: "maskerade-website.firebaseapp.com",
  projectId: "maskerade-website",
  storageBucket: "maskerade-website.appspot.com",
  messagingSenderId: "463798804681",
  appId: "1:463798804681:web:dcc53c730ea210bff5ed18"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();


// init server
const app = express();

//routes
//home route
app.get('/', (req, res) => {
    res.sendFile("html/index.html", {root : "public"})
})

// //middlewares
app.use(express.static("public"));
app.use(express.json())

//signup route
app.get('/signup', (req, res) => {
    res.sendFile("html/signup.html", {root: "public"});
})

app.post('/signup', (req, res) => {
    const {name, email, password, number} = req.body;

    if(nama.length < 3){
        res.json({ 'alert':'Nama harus terdiri dari minimal 3 huruf'});
    }else if(!email.length){
        res.json({ 'alert':'Masukkan Email'});
    }else if (password.length < 8) {
        res.json({ 'alert':'Password harus terdiri dari minimal 8 karakter'});
    }else if(!number.length){
        res.json({ 'alert':'Masukkan nomor handphone kamu'});
    }else if (!Number(number.value) || number.length < 10){
        res.json({ 'alert':'Nomor hp tidak valid, masukkan nomor yang valid'})
    }else{
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({ 'alert' : 'email sudah ada'})
            }else {
                // enkripsi password
                bcrypt.getSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        // set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name : req.body.name,
                                email: req.body.email,
                                seller: req.body.seller 
                            })
                        })
                    })
                })
            }
        })
    }
})

//login route
app.get('/login', (req, res) => {
    res.sendFile("html/login.html", {root : "public"})
})

app.post('/login', (req, res) => {
    let {email, password} = req.body;

    if(!email.length || !password.length){
        res.json({'alert' : 'Isi semua input'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){
            return res.json({'alert' : 'email tidak tersedia'});
        }else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if (result) {
                    let data = user.data();
                    return res.json({
                        nama: data.name,
                        email : data.email,
                        seller: data.seller
                    })
                } else{
                    return res.json({ 'alert': 'password tidak tepat'});
                }
            })
        }
    })
})

// seller
app.get('/seller', (req, res) => {
    res.sendFile("html/seller.html", { root : "public"})
})

app.post('/signup', (req, res) => {
    let {name, about, address, number, tac, legitInfo, email } = req.body;

    if(!name.length || !about.length || !address.length || number.length < 10 || !Number(number)){
        return res.json({'alert': 'beberapa informasi tidak valid'});
    }else if(!tac || !legitInfo){
        return res.json({'alert': 'kamu harus setuju dengan terms and conditions'})
    }else{
        // update status seller
        db.collection('sellers').doc(email).set(req.body)
        .then(data => {
            db.collection('users').doc(email).update({
                seller: true
            }).then(data => {
                res.json(true);
            })
        })
    }
})

// add product
app.get('/add-product', (req, res) => {
    res.sendFile("html/addProduct.html", {root: "public"})
})

//404 route
app.get('/404', (req, res) => {
    res.sendFile("html/404.html", {root: "public"});
})

app.use((req, res) => {
    res.redirect('/404')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})