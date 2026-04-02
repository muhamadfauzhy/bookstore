const router = require('express').Router()
const PurchaseController = require('../controllers/purchaseController')
const { isLoggedIn, isCustomer } = require('../middlewares/auth')

router.use(isLoggedIn)
router.get('/', PurchaseController.list)
router.get('/history', PurchaseController.history)

router.get('/checkout', PurchaseController.checkout)
router.get('/payment-success', PurchaseController.paymentSuccess)

router.get('/add', isCustomer, PurchaseController.addForm)
router.post('/add', PurchaseController.create)

router.post('/:id/add-book', isCustomer, PurchaseController.addBook)
router.get('/:id/pay', PurchaseController.payPage)
router.get('/:id/delete', PurchaseController.delete)

router.post('/:purchaseId/remove-book/:bookId', PurchaseController.removeBookFromCart)

router.get('/:id', PurchaseController.show)

module.exports = router