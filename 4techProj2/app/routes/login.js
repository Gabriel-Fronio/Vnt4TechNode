const jwt = require('jsonwebtoken');
const secretKey = require('../../config/secretKey');

module.exports = app => {
    const collection = app.config.firebaseConfig.collection('users');
    app.post('/login', async (req, res) => {
        const documento = await collection.get();
        let user = null;
        const users = documento.docs.find(doc => {
            let actualUser = extractUser(doc);
            if(actualUser.email === req.body.email && actualUser.senha === req.body.senha) {
                user = extractUser(doc);
                return true;
            }
        })

        if(users) {
            const id = user.id;
            const token = jwt.sign({id}, secretKey);
            return res.send({
                user: {
                    name:user.name,
                    email:user.email
                },
                auth:true,
                token:token 
            });
        } else {
            return res.status(500).send('Login inválido');
        }
    });
}

const extractUser = (doc) => {
    let user = doc.data();
    return {
        id: doc.id,
        name: user.name,
        email: user.email,
        senha: user.senha
    }
}