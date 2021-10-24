module.exports = {
  authenticator: (req, res, next) => {
    // 有通過驗證
    if (req.isAuthenticated()) {
      return next()
    }
    // 沒有通過驗證
    res.redirect('/users/login')
  }
}