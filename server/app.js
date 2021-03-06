const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
require("./src/db/conn");
const Register = require("./src/models/registers")
const {json} = require("express");
const port = process.env.port || 5000;

const static_path = path.join(__dirname, "../server/public");
const template_path = path.join(__dirname, "../server/templates/views");
const partials_path = path.join(__dirname, "../server/templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/" , (req, res)=>{
    res.render("index")
});

app.get("/register" , (req, res)=>{
    res.render("register")
});

app.post("/register", async (req, res)=>{
    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registerEmployee = new Register({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                password : password,
                confirmpassword : cpassword
            })

            const registered = await registerEmployee.save();
            res.status(201).render("index")

        }else{
            res.send("Passwords are not matching")
        }
        
    } catch (error) {
        res.status(400).send(error);
    }

})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});