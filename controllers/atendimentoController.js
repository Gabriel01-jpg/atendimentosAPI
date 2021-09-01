const Atendimento = require('../models/atendimentosModel')

module.exports = app => {
    app.get('/', (req, res) => {
        res.redirect(307, `/atendimentos`);
    });
    /* app.get('/:id', (req, res) => {
        res.redirect(307, `/atendimentos/${req.params}`);
    }) */

    app.post('/', (req, res) => {
        res.redirect(307, '/atendimentos');
    });

    app.get('/atendimentos', (req, res) => {
        Atendimento.list(res);
        
    });
    
    app.get('/atendimentos/:id', (req, res) => {
        const idInt = parseInt(req.params.id);
        Atendimento.searchForID(idInt, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.insert(atendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const values = req.body;
        const id = req.params.id;
        Atendimento.update(id, values, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.delete(id, res)
    })
}

