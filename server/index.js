const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   
const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');
dotEnv.config();
const Register = require('./mongo');
const middleware = require('./middleware');
const bcrypt = require("bcrypt")


const app =express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))  

app.get('/', (req, res) => { 
    res.send("Hello World");
})

app.post("/register", async (req, res) => {
    try{
        const {username, email, password, confirmpassword} = req.body;
        const bcrypt = require('bcrypt');

        const exist =await Register.findOne({email:email})
        if(exist){
            return res.status(400).send("User Already exists");
        }
        if(password !== confirmpassword){
            return res.status(400).send("Password and confirmpassword doesnot matches")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
       
        const newUser = new Register({
            username,
            email,
            password: hashedPassword,
            confirmpassword
           
        });
        await newUser.save();
        res.status(200).send("User Registered Successfully");
    }
    catch(err){
        console.log(err);
    }
})

    app.post("/login",async (req,res)=>{
        try{

            const {email,password} = req.body;
            const exist = await Register.findOne({email:email})
            if(!exist){
                return res.status(400).send("User Not Registered");
            }
           

        
            const isMatch = await bcrypt.compare(password, exist.password);
            if (!isMatch) {
                return res.status(400).send("Password is incorrect");
            }

            let payload ={
                user:{
                    id:exist.id
                }
            }

            jwt.sign(payload,"jwtkey",{expiresIn:120},
            (err,token) => {
                if(err) throw err;
                res.json({token});
                
            })


        }
        catch(err){
            console.log(err);
        }
        
   

    
})
app.get("/dashboard",middleware,async (req,res)=>{
    try{
    const exist = await Register.findById(req.user.id)
    res.json(exist);
}
catch(err){
    console.log(err);
}

})
app.listen(5000, () => {
    console.log("Server is running on port 5000")});





