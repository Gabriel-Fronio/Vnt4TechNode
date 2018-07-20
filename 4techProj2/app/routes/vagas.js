const Vaga = require('../../model/vaga.js')

module.exports = app => {
  const vagasCollection = app.config.firebaseConfig.collection('vagas')

  app.get('/vagas', async (req, res) => {
    try {
      const docs = await vagasCollection.get()
      let vagas = []
      docs.forEach(doc => {
        vagas.push(extractVaga(doc))
      })
      return res.send(vagas)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Nao retornou todas as vagas')
    }
  })

  app.get('/vagas/:id', async (req, res) => {
    try {
      let achada = await vagasCollection.where('id', '==', req.params.id)
      if (achada) {
        return res.send(extractVaga(achada))
      }
      return res.send('Não foi achada vaga com esse id')
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })

  app.post('/vagas', async (req, res) => {
    try {
      if (req.body === undefined || req.body == null) {
        return res.send(403).send('Corpo da requisição não pode ser vazio')
      }

      const fbReturn = await vagasCollection.doc().set(req.body)
      if (fbReturn) {
        return res.send('Adicionado com sucesso')
      } else {
        throw Error
      }
    } catch (err) {
      return res.status(500).send(err.message)
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

  const extractVaga = (vaga) => {
    let v = vaga.data()
    return {
      id: vaga.id,
      name: v.name,
      description: v.description,
      skills: v.skills,
      area: v.area,
      differentials: v.differentials,
      isPcd: v.isPcd,
      isActive: v.isActive
    }
  }

  const createVaga = (obj) => new Vaga(obj.id, obj.name, obj.description,
    obj.skills, obj.area, obj.differentials, obj.isPcd, obj.isActive)
}
