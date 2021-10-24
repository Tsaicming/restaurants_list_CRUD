module.exports = {
  authenticator: (req, res, next) => {
    // 有通過驗證
    if (req.isAuthenticated()) {
      return next()
    }
    // 沒有通過驗證
    req.flash('warning_msg', '請先登入！')
    res.redirect('/users/login')
  }
}