var express = require('express');
var router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');

require('dotenv').config()
const secret = process.env.JWT_TOKEN
const withAuth = require('../middlewares/auth')

//registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })

  try {
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: 'Error registering new user ' })
  }
})

//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ error: 'Incorrect email or password' })
    } else {
      user.isCorrectPassword(password, function (error, same) {
        if (!same) {
          res.status(401).json({ error: 'Incorrect email or password' })
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: '10d' })
          res.json({ user: user, token: token })
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal error, please try again.' })
  }
})

//update
router.put('/', withAuth, async (req, res) => {
  const { name, email } = req.body
  const id = req.user._id
  
  try {
    let user = await User.findByIdAndUpdate(id,
      {
        $set: {
          name: name,
          email: email,
          update_at: Date.now()
        }
      },
      { upsert: true, 'new': true })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Problem to update a user' })
  }
})

//update password
router.put('/password', withAuth, async (req, res) => {
  const { password } = req.body
  const id = req.user._id
  
  try {
    let user = await User.findById(id)
    user.password = password
    await user.save()
    res.json(user)
    console.log('alterou byceta')
  } catch (error) {
    res.status(500).json({ error: 'Problem to update a user' })
  }
})

//delete
router.delete('/', withAuth, async (req, res) => {
  const id = req.user._id

  try {
    await User.findByIdAndDelete(id)
    res.json({ message: 'User deleted a sucess' }).status(204)
  } catch (error) {
    res.status(500).json({ error: 'Problem to delete a user' })
  }
})

module.exports = router;
