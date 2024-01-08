const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) =>{
    res.redirect('main.html');
})

app.get("/login", (req, res) =>{
    res.render('login');
})

app.get("/signup", (req, res) =>{
    res.render("signup");
})

app.post("/signup", async (req, res) => {
    const data = { 
        Ime: req.body.username,
        Geslo: req.body.password
    }

    //preveri če obstaja

    const existingUser = await collection.findOne({Ime: data.Ime});

    if(existingUser){
        res.send("Uporabnik že obstaja");
    }
    else{
        //hashamo geslo z bycriptom
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.Geslo, saltRounds);

        data.Geslo = hashedPassword;
        const userdata = await collection.insertMany([data]);
        console.log(userdata);

        res.render("login");
    }
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ Ime: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.Geslo);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.redirect(`/main.html?Ime=${check.Ime}`);
        }
    }
    catch {
        res.send("wrong Details");
    }
})

const port = 5001;
app.listen(port, () => {
    console.log('server running on port: ' + port)
} )