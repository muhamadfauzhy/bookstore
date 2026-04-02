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

    static async postLogin (req, res) {
        try {
            const { email, password } = req.body 
            const user = await User.findOne({
                where: { email }
                })

            if (!user) {
                const error = 'invalid email/password'
                return res.redirect(`/login?error=${error}`)
                }

                const isValidPassword = bcrypt.compareSync(password, user.password)

                if (!isValidPassword) {
                    const error = 'invalid email/password'
                    return res.redirect(`/login?error=${error}`)
                    }
            req.session.userId = user.id
            req.session.role = user.role
            return res.redirect('/')   
        } catch (error) {
            res.send (error)
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
            res.send(error.message)
        }
    }
    
}


module.exports = Controller