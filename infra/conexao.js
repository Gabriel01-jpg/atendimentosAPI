const mysql = require('mysql');


const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '123456789',
    database: 'agendapetshop'
})

module.exports = conexao;