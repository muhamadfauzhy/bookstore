const router = require('express').Router()
const BookController = require('../controllers/bookController')

// list & search
router.get('/', BookController.list)
// router.get('/search', BookController.search)

// add
router.get('/add', BookController.addForm)
router.post('/add', BookController.create)

// detail
router.get('/:id', BookController.show)



// edit
router.get('/:id/edit', BookController.editForm)
router.post('/:id/edit', BookController.update)

// delete
router.get('/:id/delete', BookController.delete)

module.exports = router