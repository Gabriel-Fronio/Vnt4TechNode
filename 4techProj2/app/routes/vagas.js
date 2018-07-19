const Vaga = require('../../model/vaga.js')
let vagas = require('../../config/vagas.js')

module.exports = app => {
  app.get('/vagas', async (req, res) => {
    try {
      return res.send(vagas)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Nao retornou todas as vagas')
    }
  })

  app.get('/vagas/:id', async (req, res) => {
    try {
      let id = req.params.id
      let achada = await vagas.find(vaga => { return vaga.id === id })
      if (achada !== undefined) {
        return res.send(achada)
      }
      return res.send('Não foi achada vaga com esse id')
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Vaga não achada')
    }
  })

  app.post('/vagas', async (req, res) => {
    try {
      if (req.body === undefined || req.body == null) {
        return res.send(403).send('Corpo da requisição não pode ser vazio')
      }
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
      if (req.body === undefined || req.body == null) {
        res.status(403).send('Corpo da requisição não pode ser vazio')
      }
      let id = req.params.id
      let i = await vagas.findIndex(vaga => { return vaga.id === id })
      if (i === -1) {
        return res.send('Não existe esse ID')
      }
      Object.keys(req.body).forEach(v => { vagas[i][v] = req.body[v] })
      return res.send('Alterado')
    } catch (err) {
      console.error(err.message)
      return res.status(500).send(err.message)
    }
  })

  app.delete('/vagas/:id', async (req, res) => {
    try {
      let id = req.params.id
      let ind = await vagas.findIndex(vaga => { return vaga.id === id })
      if (ind === -1) {
        return res.send('Não existe esse ID')
      }
      vagas.splice(ind, 1)
      return res.send('Excluído')
    } catch (err) {
      console.log(err.message)
      return res.status(500).send(err.message)
    }
  })

  const createVaga = (obj) => new Vaga(obj.id, obj.name, obj.description,
    obj.skills, obj.area, obj.differentias, obj.isPcd, obj.isActive)
}
