const express = require('express')
const produtos = require('./produtos')
const app = express()
const port = 80

app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'API BASE OK' }))

// Lista de produto
app.get('/produtos', async (req, res) => {
    const produtos = await produtos.selecionarProduto()
    return res.json(produtos)
})

// Adiciona Produto
app.post('/produto', (req, res) => {
    console.log(req.body)
    res.json('oi')
})

// Altera Produtos
app.put('/produto/:id', (req, res) => {
    console.log(req.params.id)
    res.json('alterar')
})

// Deletar produto
app.delete('/produto/:id', (req, res) => {
    console.log(req.params.id)
    res.json('deletar')
})

// Detalhes Produto
app.get('/produto', async (req, res) => {
    if (req.query.name && req.query.name === '') res.json('Preencha o nome')
    else {
        const produto = await produtos.selecionarProdutoPorNome(req.query?.nome)
        res.json()
    }
})

app.listen(port)
console.log('API funcionando!')
