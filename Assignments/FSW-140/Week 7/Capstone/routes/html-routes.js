const mysql = require('mysql')

module.exports = function(app) {
    app.get('/', function(req, res) {
        connection.query('SELECT * FROM todos', function(err, data) {
            (err)?res.send(err):res.json({users: data})
        })
    })
}