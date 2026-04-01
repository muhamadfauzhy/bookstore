const { User } = require('../models')
const bcrypt = require('bcryptjs')

class Controller {
    static async getLogin (req, res) {
        try {
            const { error } = req.query
            res.render ('login-form', { error })
        } catch (error) {
            res.send (error)
        }
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email } })

            if (!user) {
                return res.redirect('/login?error=Invalid email/password')
            }

            const isValid = bcrypt.compareSync(password, user.password)

            if (!isValid) {
                return res.redirect('/login?error=Invalid email/password')
            }

            req.session.userId = user.id
            req.session.role = user.role

            if (user.role === 'admin') {
                res.redirect('/books')
            } else {
                res.redirect('/purchases')
            }

        } catch (err) {
            res.send(err)
        }
    }
    
    static async getRegister (req, res) {
        try {
            res.render ('register-form')
        } catch (error) {
            res.send (error)
        }
    }

    static async postRegister (req, res) {
        try {
            const { email, password, role } = req.body
            await User.create({ email, password, role })

            res.redirect('/login')
        } catch (error) {
            res.send (error)
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy(err => {
            if (err) {
                return res.send(err.message)
            }

            res.redirect('/login')
            })
        } catch (error) {
            res.send(error)
        }
    }
    
}




module.exports = Controller