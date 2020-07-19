const express = require('express')
const User = require('../models/User')

const router = express.Router()

// A router path is *relative* to the path it was called with (app.use, in app.js)
// so '/' here is acually 'users/' (or simply 'users') and '/:id' is actually 'users/:id'
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: `user get error: ${error}` })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: `user not found, ${error}` })
  }
})

router.post('/', async (req, res) => {
  const user = new User(req.body)
  try {
    const savedUser = await user.save()
    res.status(200).json(savedUser)
  } catch (error) {
    res.status(500).json({ message: `user save error: ${error}` })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) await User.remove({ _id: req.params.id })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: `user deleted failed, ${error}` })
  }
})

module.exports = router
