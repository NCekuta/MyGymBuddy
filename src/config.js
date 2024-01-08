const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MyGymBuddy")
.then(() => {
    console.log("Success");
})
.catch(() => {
    console.log("Error");
});

const LoginSchema = new mongoose.Schema({
    Ime:{
        type: String,
        required: true
    },
    Geslo: {
        type:String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;