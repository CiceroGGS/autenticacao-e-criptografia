const bcrypt = require('bcrypt');
const pool = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaSecreta = require('../senhaJwt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    
    try {
        const existeEmail = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        if(existeEmail.rowCount > 0) {
            return res.status(400).json({ menssage: "Email ja existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = (`
            INSERT INTO usuarios
                (nome, email, senha )
            VALUES
                ($1, $2, $3) RETURNING *
        `);

        const { rows } = await pool.query(query, [nome, email, senhaCriptografada]);

        const {senha: _, ...usuario } = rows[0];

        return res.status(201).json(usuario);
    } catch (error) {
        console.log(error.menssage);
        return res.status(500).json({ menssage: "Erro interno do servidor"});
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await pool.query(`SELECT * FROM usuarios WHERE email = $1`,
        [email]);

        if(usuario.rowCount == 0) {
            return res.status(400).json({ menssage: "Email ou senha invalidos" });
        }

        const {senha: senhaUsuario, ...usuarioFinal} = usuario.rows[0];

        const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

        if(!senhaCorreta) {
            return res.status(400).json({ menssage: "Email ou senha invalidos" });
        }

        const token = jwt.sign(
            {
                id: usuarioFinal.id
            },
            senhaSecreta,
            {
               expiresIn: "2h"
            }
        )

        return res.status(200).json({
            usuarioFinal,
            token
        });

    } catch (error) {
        return res.status(500).json({ menssage: "Erro interno do servidor"});
    }
}

module.exports = {
    cadastrarUsuario,
    login
}