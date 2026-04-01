const router = require('express').Router()
const PurchaseController = require('../controllers/purchaseController')
const { isLoggedIn, isCustomer } = require('../middlewares/auth')

router.use(isLoggedIn)

router.get('/', PurchaseController.list)

// 🔥 ini yang error tadi
router.get('/add', isCustomer, PurchaseController.addForm)

router.post('/add', PurchaseController.create)

router.get('/:id', PurchaseController.show)

router.post('/:id/add-book', isCustomer, PurchaseController.addBook)

router.get('/:id/delete', PurchaseController.delete)

module.exports = router