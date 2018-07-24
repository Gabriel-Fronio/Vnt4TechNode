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
      let achada = await vagasCollection.doc(req.params.id).get()
      if (achada.exists) {
        return res.send(extractVaga(achada))
      }
      return res.send('Não foi achada vaga com esse id')
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })

  app.post('/vagas', async (req, res) => {
      if (req.body === undefined || req.body == null) {
        return res.send(403).send('Corpo da requisição não pode ser vazio')
      }

      vagasCollection.add(req.body).then(response => {
        return res.send(response.id);
      }).catch(err => {
        return res.status(500).send(err.message);
      })
  })

  app.put('/vagas/:id', async (req, res) => {
    try {
      if (req.body === undefined || req.body == null) {
        res.status(403).send('Corpo da requisição não pode ser vazio')
      }
      let id = req.params.id
      let achada = await vagasCollection.doc(id).get()
      if (achada.exists) {
        var success = await vagasCollection.doc(id).update(req.body)
        if (success) {
          return res.send('Alterado')
        }
        throw Error
      } else {
        return res.send('Não existe documento com esse ID')
      }
    } catch (err) {
      console.error(err.message)
      return res.status(500).send(err.message)
    }
  })

  app.delete('/vagas/:id', async (req, res) => {
    try {
      let id = req.params.id
      let achada = await vagasCollection.doc(id).get()
      if (achada.exists) {
        let success = await vagasCollection.doc(req.params.id).delete()
        if (success) {
          return res.send('Deletado com sucesso')
        }
        throw Error
      } else {
        return res.send('Não existe documento com esse ID')
      }
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
