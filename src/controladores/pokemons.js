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

        const id = req.usuario.id;

        const { rows } = await pool.query(queryPokemon, [id, nome, apelido, habilidades, imagem]);

        return res.status(201).json(rows[0]);  
    } catch (error) {
        return res.status(500).json({ menssage: "Erro interno do servidora" });
    }
}

const atualizarApelidoPokemon = async (req, res) => {
    const { apelido } = req.body;
    const { id } = req.params;
    const idUsuario = req.usuario.id

    try {
        const { rowCount } = await pool.query(`
            SELECT *
            FROM pokemons
            WHERE id = $1 AND usuario_id = $2`,
            [id, idUsuario]
        );

        if(rowCount == 0) {
            return res.status(404).json({ mensagem: "Pokemon não existe! "});
        }

        const queryAtualizarPokemon = (`
            UPDATE pokemons
            SET apelido = $1
            WHERE id = $2`
        );
        
        await pool.query(queryAtualizarPokemon, [apelido, id]);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ menssage: "Erro interno do servidor" });
    }
}

const listarPokemons = async (req, res) => {
    const idUsuario = req.usuario.id

    try {
        const { rows: pokemons } = await pool.query(`
            SELECT id, nome, habilidades, apelido, imagem
            FROM pokemons
            WHERE usuario_id = $1`,
            [idUsuario]
        )

        for(const pokemon of pokemons) {
            pokemon.habilidades = pokemon.habilidades.split(", ");
            pokemon.usuario = req.usuario.nome;
        }

        return res.status(200).json(pokemons);
    } catch (error) {
        return res.status(500).json({ menssage: "Erro interno do servidor" });
    }
}

const detalharPokemon = async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.usuario.id

    try {
        const { rows, rowCount } = await pool.query(`
            SELECT *
            FROM pokemons
            WHERE id = $1 AND usuario_id = $2`,
            [id, idUsuario]
        );

        if(rowCount == 0) {
            return res.status(404).json({ mensagem: "Pokemon não existe! "});
        }

        const pokemon = rows[0];

        pokemon.habilidades = pokemon.habilidades.split(", ");
        pokemon.usuario = req.usuario.nome;

        return res.status(200).json(pokemon);
    } catch (error) {
        return res.status(500).json({ menssage: "Erro interno do servidora" });
    }
}

const excluirPokemon = async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.usuario.id

    try {
        const { rows, rowCount } = await pool.query(`
            SELECT *
            FROM pokemons
            WHERE id = $1 AND usuario_id = $2`,
            [id, idUsuario]
        );

        if(rowCount == 0) {
            return res.status(404).json({ mensagem: "Pokemon não existe! "});
        }

        await pool.query(`
            DELETE FROM pokemons
            WHERE id = $1`,
            [id]
        );

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ menssage: "Erro interno do servidora" });
    }
}


module.exports = {
    cadastrarPokemon,
    atualizarApelidoPokemon,
    listarPokemons,
    detalharPokemon,
    excluirPokemon
}