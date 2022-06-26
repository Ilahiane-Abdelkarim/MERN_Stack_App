const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// @desc    Register new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, location } = req.body;

    if (!first_name || !last_name || !email || !password || !location) {
        res.status(400)
        throw new Error('Please add all fields');
    }

    //Check if User exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create  user

    const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        location
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User data not  valide');
    }
})

// @desc    Authenticate a User
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Email exists
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Email or password incorrect')
    }



})

// @desc    Get user data
// @route   GET api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}