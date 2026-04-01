const router = require('express').Router()
const BookController = require('../controllers/bookController')
const { isLoggedIn, isAdmin } = require('../middlewares/auth')

router.use(isLoggedIn)
router.get('/', BookController.list)
router.get('/add', isAdmin, BookController.addForm)
router.post('/add', isAdmin, BookController.create)

router.get('/:id', BookController.show)

router.get('/:id/edit', isAdmin, BookController.editForm)
router.post('/:id/edit', isAdmin, BookController.update)

router.get('/:id/delete', isAdmin, BookController.delete)

module.exports = router