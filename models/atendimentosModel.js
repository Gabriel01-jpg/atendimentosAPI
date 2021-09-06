const moment = require('moment')
const conexao = require('../infra/conexao')

class Atendimento {

    formatHours(data) {
        return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }


    insert(atendimento, res) {
        const dataCriacao = new Date();
        const data = this.formatHours(atendimento.data)

        const dataIsValid = moment(data).isSameOrAfter(dataCriacao);
        const clienteIsValid = atendimento.cliente.length >= 5;

        const validations = [
            {
                name: 'data',
                valid: dataIsValid,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'cliente',
                valid: clienteIsValid,
                message: 'Cliente deve ter pelo menos cinco caracteres'

            }
        ]

        const erros = validations.filter(campo => !campo.valid);
        const erroExist = erros.length;

        if(erroExist) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, result) => {
                if(erro){
                    res.status(400).json(erro);
                } else {
                    res.status(201).json([atendimento, {"id": result.insertId}]);
                }
            })
        }

    }

    list(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, result) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result)
            }
        })
    }

    searchForID(id, res) {
        const sql = `SELECT * FROM Atendimentos where id=${id}`

        conexao.query(sql, (error, result) => {
            if(error){
                res.status(400).json(error)
            } else{
                res.status(200).json(result == '' ? 'ID não encontrado' : result)
            } 
        });
    }

    update(id, values, res) {
        if(values.data){
            values.data = this.formatHours(values.data)
        }     
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [values, id], (error, result) => {
            if(error){
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        } )
    }

    delete(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id = ${id}`
        conexao.query(sql, (error, result) => {
            if(error){
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }
}

module.exports = new Atendimento;