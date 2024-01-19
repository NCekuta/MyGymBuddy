const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) =>{
    res.redirect('main.html');
})

app.get("/login", (req, res) =>{
    req.session.returnTo = req.header('Referer') || '/';
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
            const returnTo = req.session.returnTo || '/';
            delete req.session.returnTo;
            req.session.Ime = check.Ime;
            res.redirect(`${returnTo}?Ime=${check.Ime}`);
        }
    }
    catch {
        res.send("wrong Details");
    }
})

app.get("/change-password", (req, res) => {
    res.render("change-password");
});

app.post("/change-password", async (req, res) => {
    const { username, oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.send("New password and confirm password do not match");
    }

    try {
        const existingUser = await collection.findOne({ Ime: username });

        if (!existingUser) {
            return res.send("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, existingUser.Geslo);

        if (!isPasswordMatch) {
            return res.send("Incorrect old password");
        }

        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        await collection.updateOne({ Ime: username }, { $set: { Geslo: hashedNewPassword } });

        res.redirect('main.html');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


const port = 5001;
app.listen(port, () => {
    console.log('server running on port: ' + port)
} )