const router = require('express').Router()
const PurchaseController = require('../controllers/purchaseController')

// list
router.get('/', PurchaseController.list)

// detail
router.get('/:id', PurchaseController.show)

// add order
router.get('/add', PurchaseController.addForm)
router.post('/add', PurchaseController.create)

// add book to order
router.post('/:id/add-book', PurchaseController.addBook)

// delete
router.get('/:id/delete', PurchaseController.delete)

module.exports = router