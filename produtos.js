const mysql = require('mysql2/promise')

const database = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'usuario',
    password: 'senha',
    database: 'pi-api',
    port: '3306',
})

async function listarProdutos() {
    const res = await database.query('SELECT * FROM products')
    return res[0]
}

async function selecionarProduto(id) {
    const res = await database.query(`SELECT * from products WHERE id=${id}`)
    return res[0]
}

async function filtrarProdutosPorNome(nome) {
    const res = await database.query(`SELECT * FROM products WHERE name LIKE "%${nome}%"`)
    return res[0]
}

async function criarProduto(body) {
    const res = await database.query('INSERT INTO products (`name`,`image`,`value`,`description`,`stock`) VALUES (?,?,?,?,?);', [
        body.nome,
        body.image,
        body.valor,
        body.descricao,
        body.estoque,
    ])

    return res[0]
}

async function deletarProduto(id) {
    const res = await database.query(`DELETE from products WHERE id=${id}`)
    return res[0]
}

async function alteraProduto(id, body) {
    const res = await database.query('UPDATE products SET name=?, image=?, value=?, description=?, stock=? WHERE id=?;', [
        body.nome,
        body.image,
        body.valor,
        body.descricao,
        body.estoque,
        id,
    ])

    return res[0]
}

module.exports = { listarProdutos, selecionarProduto, filtrarProdutosPorNome, criarProduto, deletarProduto, alteraProduto }
