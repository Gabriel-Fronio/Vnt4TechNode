const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const Vaga = require('./model/vaga.js')
let vagas = require('./config/vagas.js')

const createVaga = (obj) => new Vaga(obj.id, obj.name, obj.description,
  obj.skills, obj.area, obj.differentias, obj.isPcd, obj.isActive)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  try {
    return res.send('Hello World!')
  } catch (err) {
    console.log(err.message)
  }
})

app.get('/vagas', async (req, res) => {
  try {
    return res.send(vagas)
  } catch (err) {
    console.log(err.message)
  }
})

app.get('/vagas/:id', async (req, res) => {
  try {
    let id = req.params.id
    return res.send(vagas.find(vaga => { return vaga.id === id }))
  } catch (err) {
    console.log(err.message)
  }
})

app.post('/vagas', async (req, res) => {
  try {
    let vagasLength = vagas.length
    let vaga = createVaga(req.body)
    vagas.push(vaga)
    if (vagas.length > vagasLength) {
      return res.send('Added')
    }
    return res.status(500).send('Internal error')
  } catch (err) {
    return res.status(500).send('Server error')
  }
})

app.put('/vagas/:id', async (req, res) => {
  try {
    let id = req.params.id
    let i = vagas.findIndex(vaga => { return vaga.id === id })
    if (i === -1) {
      return res.send('Não existe esse ID')
    }
    vagas[i] = createVaga(req.body)
    return res.send('Alterado')
  } catch (err) {
    console.log(err.message)
  }
})

app.delete('/vaga/:id', async (req, res) => {
  try {
    let id = req.params.id
    let ind = vagas.findIndex(vaga => { return vaga.id === id })
    if (ind === -1) {
      return res.send('Não existe esse ID')
    }
    vagas.splice(ind, 1)
    return res.send('Excluído')
  } catch (err) {
    console.log(err.message)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
