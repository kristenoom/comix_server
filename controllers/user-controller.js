const router = require('express').Router();
const User = require('../db').import('../models/user');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');


router.post('register', function (req, res) {


    User.create({
      username: req.body.user.email,
      password: req.body.user.password
    })
    .then (
        res.send("This is our user endpoint!")
    )
})

module.exports = router;