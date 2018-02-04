const Client = require('ssh2-sftp-client')
const sftp = new Client()
const url = require('url')

module.exports = function (app) {
  var indexControl = {
    get: function (req, res, next) {
      // receiving parameters from the URL
      var query = url.parse(req.url, true).query

      // update session
      if (query.host && query.port) {
        req.session.host = query.host
        req.session.port = query.port
        req.session.path = []
      }

      // update path
      if (query.path === '..') {
        req.session.path.pop()
      } else if (query.path) {
        req.session.path = query.path.split('/')
      }

      if (req.session.path.length > 0) {
        req.session.path[req.session.path.length - 1] += '/'
      }

      var connectionSettings = {
        host: req.session.host, // host to connect
        port: req.session.port, // port
        username: req.session.user, // lcc username
        password: req.session.password // user password
      }

      // making connection and sending list
      sftp.connect(connectionSettings)
      .then(function () {
        return sftp.list('/home/' + req.session.user + '/' + req.session.path.join('/'))
      }).then((data) => {
        res.status(200).json({
          directories: data
        })
      }).catch(next)
    }
  }

  return indexControl
}
