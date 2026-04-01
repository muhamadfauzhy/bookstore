const router = require('express').Router()
const BookController = require('../controllers/bookController')

// list & search
router.get('/', BookController.list)
router.get('/search', BookController.search)

// detail
router.get('/:id', BookController.show)

// add
router.get('/add', BookController.addForm)
router.post('/add', BookController.create)

// edit
router.get('/:id/edit', BookController.editForm)
router.post('/:id/edit', BookController.update)

// delete
router.get('/:id/delete', BookController.delete)

module.exports = router