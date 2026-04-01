const router = require('express').Router()
const PurchaseController = require('../controllers/purchaseController')
const { isLoggedIn, isCustomer } = require('../middlewares/auth')

// list
router.use(isLoggedIn)
router.get('/', PurchaseController.list)

// add order
router.get('/add', isCustomer, PurchaseController.addForm)
router.post('/add', isCustomer, PurchaseController.create)

// detail
router.get('/:id', isCustomer, PurchaseController.show)

// add book to order
router.post('/:id/add-book', PurchaseController.addBook)

// delete
router.get('/:id/delete', PurchaseController.delete)

module.exports = router