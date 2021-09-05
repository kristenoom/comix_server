const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/register', function (req, res) {


    User.create({
      username: req.body.user.username,
      password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then (
      function createSuccess(user) {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        res.status(200).json({
          user: user,
          message: 'Excelsior!',
          sessionToken: token
        })
      }
       
    )
    .catch(err => res.status(500).json({error: err}))
})


module.exports = router;