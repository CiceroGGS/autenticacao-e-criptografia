const pool = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }
    // const tokenValido = authorization.split(' ')[1];
    const token = authorization.replace('Bearer ', '');
    
    try {
        const { id } = jwt.verify(token, senhaJwt);

        const { rows, rowCount } = await pool.query(`
            SELECT *
            FROM usuarios
            WHERE id = $1`, [id]
        );

        if(rowCount < 1) {
            return res.status(401).json({ mensagem: "Não autorizado" });
        }

        const { senha:_, ...usuario} = rows[0];

        req.usuario = usuario;
        
        next();
    } catch (error) {
        return res.status(401).json({ menssage: "Token de autenticação invalidio" });
    }
}

module.exports = { verificarLogin };