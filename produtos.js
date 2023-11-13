const mysql = require('mysql2/promise')

const database = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'usuario',
    password: 'senha',
    database: 'pi-api',
    port: '3306',
})

async function selecionarProduto() {
    const res = await database.query('SELECT * FROM products')

    return res[0]
}

async function selecionarProdutoPorNome(nome) {
    const res = await database.query('SELECT * FROM products WHERE name=?', [nome])

    return res[0]
}

module.exports = { selecionarProduto, selecionarProdutoPorNome }
