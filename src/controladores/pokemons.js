const pool = require('../conexao');

const cadastrarPokemon = async (req, res) => {
    const { nome, apelido, habilidades, imagem } = req.body;

    if(!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatorio' });
    }

    if(!habilidades) {
        return res.status(400).json({ mensagem: 'O campo habilidades é obrigatorio' });
    }

    try {

        const queryPokemon = (`
            INSERT INTO pokemons
                (usuario_id, nome, apelido, habilidades, imagem)
            VALUES
                ($1, $2, $3, $4, $5) RETURNING *
        `);

        const id = req.usuario;

        const { rows } = await pool.query(queryPokemon, [id, nome, apelido, habilidades, imagem]);

        return res.status(201).json(rows[0]);  
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ menssage: "Erro interno do servidora" });
    }
}

module.exports = {
    cadastrarPokemon
}