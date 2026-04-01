const { Book, Author, Categori, BookCategori } = require('../models')
const { Op } = require('sequelize')
const { formatRupiah } = require('../helpers/format')

class BookController {

  // 🔥 LIST + SEARCH + EAGER LOADING
  static async list(req, res) {
    try {
      const { search } = req.query

      let options = {
        include: [
          Author,
          {
            model: Categori
          }
        ],
        order: [['id', 'ASC']]
      }

      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      }

      const books = await Book.findAll(options)

      res.render('books/list', {
        books,
        formatRupiah,
        query: req.query
        })

    } catch (err) {
      res.send(err)
    }
  }

  // 📖 DETAIL
  static async show(req, res) {
    try {
      const { id } = req.params

      const book = await Book.findByPk(id, {
        include: [Author, Categori]
      })

      res.render('books/detail', { book, formatRupiah})
    } catch (err) {
      res.send(err)
    }
  }

  // ➕ FORM ADD
  static async addForm(req, res) {
    try {
      const authors = await Author.findAll()
      const categories = await Categori.findAll()

      res.render('books/add', { 
        authors, 
        categories,
        errors: null
      })
    } catch (err) {
      res.send(err)
    }
  }

  // ➕ CREATE
  static async create(req, res) {
    try {
      const { name, description, price, AuthorId, categoryIds } = req.body

      const book = await Book.create({
        name,
        description,
        price,
        AuthorId
      })

      if (categoryIds) {
        await book.setCategoris(categoryIds)
      }

      res.redirect('/books')

    } catch (err) {

      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => e.message)

        const authors = await Author.findAll()
        const categories = await Categori.findAll()

        return res.render('books/add', {
          errors,
          authors,
          categories
        })
      }

      res.send(err)
    }
  }

  //  FORM EDIT
  static async editForm(req, res) {
    try {
      const { id } = req.params

      const book = await Book.findByPk(id, {
        include: [Categori]
      })

      const authors = await Author.findAll()
      const categories = await Categori.findAll()

      res.render('books/edit', {
      book,
      authors,
      categories,
      errors: null 
    })
    } catch (err) {
      res.send(err)
    }
  }

  // ✏️ UPDATE
  static async update(req, res) {
    try {
      const { id } = req.params
      const { name, description, price, AuthorId, categoryIds } = req.body

      await Book.update(
        { name, description, price, AuthorId },
        { where: { id } }
      )

      const book = await Book.findByPk(id)

      if (categoryIds) {
        await book.setCategoris(categoryIds)
      }

      res.redirect('/books')

    } catch (err) {

      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => e.message)

        const book = await Book.findByPk(req.params.id, {
          include: [Categori]
        })

        const authors = await Author.findAll()
        const categories = await Categori.findAll()

        return res.render('books/edit', {
          book,
          authors,
          categories,
          errors
        })
      }

      res.send(err)
    }
  }

  // ❌ DELETE (PROMISE CHAINING 🔥)
  static delete(req, res) {
    const { id } = req.params
    let deletedName

    Book.findByPk(id)
      .then(data => {
        deletedName = data.name
        return Book.destroy({ where: { id } })
      })
      .then(() => {
        res.redirect(`/books?msg=Book ${deletedName} deleted`)
      })
      .catch(err => res.send(err))
  }
}

module.exports = BookController