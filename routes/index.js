const router = require('express').Router()

const bookRoutes = require('./books')
const purchaseRoutes = require('./purchases')

// route utama
router.get('/', (req, res) => {
  res.redirect('/books')
})

// modular routes
router.use('/books', bookRoutes)
router.use('/purchases', purchaseRoutes)

module.exports = router