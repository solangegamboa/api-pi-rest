const express = require('express')
const produtos = require('./produtos')
const app = express()
const port = 80

app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'API BASE OK' }))

// Lista de produto geral ou filtrado por nome
app.get('/produtos', async (req, res) => {
    if (!req.query.nome || req.query.nome === '') {
        const lsita = await produtos.listarProdutos()
        return res.json(lsita)
    } else {
        const filtrado = await produtos.filtrarProdutosPorNome(req.query?.nome)
        res.json(filtrado)
    }
})

// Detalhes do produto por ID
app.get('/produto/:id', async (req, res) => {
    const produto = await produtos.selecionarProduto(req.params.id)
    res.json(produto)
})

// Adiciona Produto
app.post('/produto', async (req, res) => {
    if (!req.body) res.json('Preencha os dados do produto')
    const addProduto = await produtos.criarProduto(req.body)
    res.json({ message: 'Produto inserido com sucesso!! ID: ' + addProduto.insertId })
})

// Altera Produtos
app.put('/produto/:id', async (req, res) => {
    console.log(req.params.id)
    const updateProduct = await produtos.alteraProduto(req.params.id, req.body)
    if (updateProduct.affectedRows >= 1) res.json({ mensagem: 'Produto alterado com sucesso' })
    else res.json({ mensagem: 'Produto não encontrado' })
})

// Deletar produto
app.delete('/produto/:id', async (req, res) => {
    await produtos.deletarProduto(req.params.id)
    res.json({ mensagem: 'Produto deletado com sucesso!' })
})

app.listen(port)
console.log('API funcionando!')
