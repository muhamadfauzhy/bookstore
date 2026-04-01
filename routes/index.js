const router = require('express').Router()
const Controller = require('../controllers/controller')
const bookRoutes = require('./books')
const purchaseRoutes = require('./purchases')

router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)

router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)

router.use (function (req, res, next) {
  if (!req.session.userId) {
    const error = 'Please login first!'
    res.redirect (`/login?error=${error}`)
  } else {
    next ()
  }
})

// route utama
router.get('/', (req, res) => {
  res.redirect('/books')
})

// modular routes
router.use('/books', bookRoutes)
router.use('/purchases', purchaseRoutes)

module.exports = router