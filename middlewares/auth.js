function isLoggedIn(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login?error=Please login first!')
  }
  next()
}

function isAdmin(req, res, next) {
  if (req.session.role !== 'admin') {
    return res.send('Access denied! Admin only.')
  }
  next()
}

function isCustomer(req, res, next) {
  if (req.session.role !== 'customer') {
    return res.send('Access denied! Customer only.')
  }
  next()
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isCustomer
}