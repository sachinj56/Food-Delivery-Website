const UserModel = require("../model/UserModel")
const { validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "sachinisagood$boy"

// Route 1  create a user using  POST: /home/createuser . No login required
module.exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    
    // Checks if the emails and password are correct
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({

            message: `${errors.array()[0].msg}`
        })
    } else {

        // checks if the user with email exits or not 
        let { name, email, password } = req.body
        
        let user = await UserModel.findOne({ Email: email })

        if (user) {
            console.log(user)
            return res.status(400).json({
                message: "User with this email already exists",
                user: user
            })
        }

        
        const  salt = await bcrypt.genSaltSync(10);
        

         const secPass = await bcrypt.hash(password,salt)
        
        // Create a new user 

        user = await new UserModel({
            Name: name,
            Email: email,
            Password: secPass
        })
        try {
            user.save()
            const data = {
                user:{
                    id:user.id
                }
            }
            const authtoken = jwt.sign({data},JWT_SECRET)
            
            res.status(200).send({
                authtoken
            })
        } catch (error) {
            res.status(400).send({
                error
            })
        }

    }
}


//Route 2 Authenticate a user using POST : /home/login . No login required

module.exports.loginUser = async (req,res)=>{
    
    // If there are any errors in email/password ,server will send bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send({
            message: `${errors.array()[0].msg}`
        })
    }

    const {email,password} =  req.body

    try {
        let user = await UserModel.findOne({Email:email})
        
        // checks if the user exists or not
        if(!user){
            res.status(400).send({
                error:"Please try to login with correct credentials"
            })
        }

        const passwordCompare = await bcrypt.compare(password,user.Password)
        if(!passwordCompare){
            res.status(400).send({
                error:"Please try to login with correct credentials"
            })
        }
        const data  ={
            user:{
                id:user.id
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({authtoken:authtoken,user:user.Name})
    } catch (error) {
        res.status(500).send({
            Messgae:"Internal Server error"
        })
    }
}

// Route 3 Get loggedin User Details using : POST "/home/getuser"  Login required
module.exports.getUser= async (req,res)=>{
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId).select("-password")
        if(user){
            return res.status(400).send({user})
        }
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

