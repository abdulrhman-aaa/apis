const jwt = require ('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler= require('express-async-handler')
const User = require('../model/userModel')

// @des register nwe user
// @route  post /api/users
// @access privte
const registerUser= asyncHandler(async (req, res) => {
    const { name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('plase add all faileds')
    }

    //check if user exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('user already exisit')
    }

    //hash pass
    const salt= await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creat user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({

            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('INvalid user data')
    }
})


// @des authenticat  user
// @route  post /api/users/login
// @access public
const loginUser= asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        })
    } else {
        res.status(400)
        throw new Error('INvalid credentials')

    }
    
})


// @des get user data
// @route  get /api/users/me
// @access privte
const getme = asyncHandler(async(req, res) => {
    const {_id, name, email}= await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//generate jwt
const generateToken = (id) => {
    return jwt.sign ({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}


module.exports= {
    registerUser,
    loginUser,
    getme,
}