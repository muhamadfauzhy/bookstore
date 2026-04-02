const { Purchase, Book, User } = require('../models')
const { formatRupiah, formatDate } = require('../helpers/format')
const QRCode = require('qrcode')


class PurchaseController {

  // 🔥 LIST (EAGER LOADING)
  static async list(req, res) {
    try {
      const userId = req.session.userId

      let purchase = await Purchase.findOne({
        where: { UserId: userId },
        order: [['id', 'DESC']],
        include: [User, Book]
      })

      // 🔥 kalau belum ada → buat baru
      if (!purchase) {
        purchase = await Purchase.create({ UserId: userId })
      }

      res.redirect(`/purchases/${purchase.id}`)

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

      // 🔥 HITUNG TOTAL DULU
      const total = purchase.Books.reduce((sum, b) => sum + b.price, 0)

      // 🔥 TARUH DI SINI
      const qrData = JSON.stringify({
        id: purchase.id,
        total,
        user: purchase.User.email
      })

      const qrCode = await QRCode.toDataURL(qrData)

      res.render('purchases/detail', {
        purchase,
        books,
        formatRupiah,
        qrCode
      })

    } catch (err) {
      res.send(err)
    }
  }

  // ➕ FORM ADD
  static async addForm(req, res) {
    try {
      const userId = req.session.userId

      let purchase = await Purchase.findOne({
        where: { UserId: userId }
      })

      if (!purchase) {
        purchase = await Purchase.create({ UserId: userId })
      }

      res.redirect(`/purchases/${purchase.id}`)

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

  static async payPage(req, res) {
    try {
      const { id } = req.params

      const purchase = await Purchase.findByPk(id, {
        include: [User, Book]
      })

      const total = purchase.Books.reduce((sum, b) => sum + b.price, 0)

      const qrData = `http://localhost:3000/checkout`

      const qrCode = await QRCode.toDataURL(qrData)

      res.render('purchases/pay', {
        purchase,
        total,
        qrCode
      })

    } catch (err) {
      res.send(err)
    }
  }

  static async history(req, res) {
    try {
      const userId = req.session.userId

      const purchases = await Purchase.findAll({
        where: { UserId: userId },
        include: [Book],
        order: [['id', 'DESC']]
      })

      res.render('purchases/history', { purchases })

    } catch (err) {
      res.send(err)
    }
  }

  static async checkout(req, res) {
    try {
      const userId = req.session.userId

      const purchase = await Purchase.findOne({
        where: { UserId: userId },
        order: [['id', 'DESC']],
        include: [Book]
      })

      if (purchase) {
        // 🔥 kosongkan cart
        await purchase.setBooks([])
      }

      res.redirect('/payment-success')

    } catch (err) {
      res.send(err)
    }
  }

  static paymentSuccess(req, res) {
    res.send(`
      <h1 style="text-align:center; margin-top:50px;">
        ✅ Payment Success
      </h1>
    `)
  }

  static async removeBookFromCart(req, res) {
    try {
      const { purchaseId, bookId } = req.params

      const purchase = await Purchase.findByPk(purchaseId)

      if (!purchase) {
        return res.status(404).json({
          success: false,
          message: 'Purchase tidak ditemukan'
        })
      }

      await purchase.removeBook(bookId)

      res.json({ success: true })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
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