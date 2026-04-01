const router = require('express').Router()
const BookController = require('../controllers/bookController')
const { isLoggedIn, isAdmin } = require('../middlewares/auth')

// list & search

router.use(isLoggedIn)
router.get('/', BookController.list)
// router.get('/search', BookController.search)

// add
router.get('/add', isAdmin, BookController.addForm)
router.post('/add', isAdmin, BookController.create)

// detail
router.get('/:id', BookController.show)

// edit
router.get('/:id/edit', isAdmin, BookController.editForm)
router.post('/:id/edit', isAdmin, BookController.update)

// delete
router.get('/:id/delete', isAdmin, BookController.delete)

module.exports = router