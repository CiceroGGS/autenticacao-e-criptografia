## API de cadastro de jogadores e pokemons com autenticação e criptografia

Essa API tem como principal objetivo cadastrar usuarios e pokemons dentro de um banco de dados,
porem para cadastrar ons  **Pokemons** o usuario deve estar logado

## **Endpoint**

### **Cadastrar pokemon**

#### `POST` `/pokemon`

Ja com o usuario logado, apos receber o token do header da requisição (_authorization_) no formato `Bearer Token`
devem ser enviadas as informações no body da requisição no seguinte padrão

```
{
    "nome": "Nome do pokemon",
    "apelido": "Apleido do pokemon",
    "habilidades": "Lista das habilidades",
    "imagem": "endereço https da imagem"
}
```

Sera retornado uma listagem de pokemons para o usuario logado:

```
[
    {
        "id": 1,
        "usuario": "Nome do usuário responsável"
        "nome": " Blastoise ",
        "apelido": " Blastoise ",
        "habilidades": ["habiliade 1", "habiliade 2"],
        "imagem": "Foto do  Blastoise "
    },
    {
        "id": 2,
        "usuario": "Nome do usuário responsável"
        "nome": "Charizard",
        "apelido": "Charizard",
        "habilidades": ["habiliade 1", "habiliade 2", "habiliade 3"],
        "imagem": "Foto do Charizard"
    }
]
```


