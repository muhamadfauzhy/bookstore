const { Purchase, Book, User } = require('../models')
const { formatRupiah, formatDate } = require('../helpers/format')

class PurchaseController {

  // 🔥 LIST (EAGER LOADING)
  static async list(req, res) {
    try {
      const purchases = await Purchase.findAll({
        include: [
          User,
          {
            model: Book
          }
        ],
        order: [['id', 'ASC']]
      })

      res.render('purchases/list', { purchases, formatDate, formatRupiah })
    } catch (err) {
      res.send(err)
    }
  }

  // 📖 DETAIL
  static async show(req, res) {
    try {
      const { id } = req.params

      const purchase = await Purchase.findByPk(id, {
        include: [User, Book]
      })

      const books = await Book.findAll()

      res.render('purchases/detail', {
        purchase,
        books,
        formatRupiah
      })

    } catch (err) {
      res.send(err)
    }
  }

  // ➕ FORM ADD
  static async addForm(req, res) {
    try {
      const users = await User.findAll()
      const books = await Book.findAll()

      res.render('purchases/add', { users, books })
    } catch (err) {
      res.send(err)
    }
  }

  // ➕ CREATE
  static async create(req, res) {
    try {
      const { UserId } = req.body

      const purchase = await Purchase.create({
        UserId
      })

      res.redirect(`/purchases/${purchase.id}`)
    } catch (err) {
      res.send(err)
    }
  }

  // ➕ ADD BOOK TO PURCHASE
  static async addBook(req, res) {
    try {
      const { id } = req.params
      const { BookId } = req.body

      const purchase = await Purchase.findByPk(id)
      await purchase.addBook(BookId)

      res.redirect(`/purchases/${id}`)

    } catch (err) {
      res.send(err)
    }
  }

  // ❌ DELETE
  static delete(req, res) {
    const { id } = req.params
    let deletedId

    Purchase.findByPk(id)
      .then(data => {
        deletedId = data.id
        return Purchase.destroy({ where: { id } })
      })
      .then(() => {
        res.redirect(`/purchases?msg=Purchase ${deletedId} deleted`)
      })
      .catch(err => res.send(err))
  }
}

module.exports = PurchaseController