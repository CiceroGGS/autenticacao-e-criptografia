## API de cadastro de jogadores e pokemons com autenticação e criptografia

Essa API tem como principal objetivo cadastrar usuarios e pokemons dentro de um banco de dados,
porem para cadastrar ons  **Pokemons** o usuario deve estar logado

## **Banco de dados**

Neste projeto foi criado um bando de dados  PostgreSQL chamado `catalogo_pokemons` contendo as seguintes tabelas e colunas:  

1) Tabela `usuarios` com os campos:

- id - identificador único do usuário como chave primaria e auto incremento;
- nome - (obrigatório)
- email - (obrigatório e único)
- senha - (obrigatório)

2) Tabela `pokemons` com os campos

- id - identificador único do pokemon como chave primaria e auto incremento;
- usuario_id - (obrigatório)
- nome - (obrigatório)
- habilidades - (obrigatótio)
- imagem
- apelido

## Para a entidade `usuarios` foram implementados as seguintes funcionalidades.

##### Cadastro de usuário

Essa entidade será utilizada para cadastrar um novo usuario no sistema
O corpo(body) devera receber os as seguintes propriedades em formato JSON, lembrando que
a senha do usuario foi criptografada usando a biblioteca `bcrypt`.
(Todos os campos são obrigatorios e o email e um campo unico ou seja para cada email existira apenas um usuario).


##### Login de usuário

Essa é a entidade que permite o usuario cadastrado realizar o login no sistem ela validar
as credenciais do usuário usando a biblioteca `bcrypt`e Gerar o token de autenticação
com a biblioteca `jsonwebtoken`.


## **Endpoint**

### **Cadastrar Usuario**

#### `POST` `/usuario`

    -   nome
    -   email
    -   senha


#### **Exemplo de requisição**
``` javascript
{
    "nome": "nomeDoUsuario",
    "email": "emailDoUsuario",
    "senha": "senhaDoUsuario"
}
```

#### **Exemplos de resposta em caso de sucesso**
``` javascript
{
	"id": 6,
	"nome": "Caio",
	"email": "Caio@gmail.com"
}
```
#### **Exemplos de resposta em caso de falha**
```javascript
// HTTP Status code apropriado exemplo: 400 / 401 / 403 / 404 \\
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

## **Endpoint**

### **Login do usuário**

#### `POST` `/login`


**Requisição** 


Essa é a rota que será utilizada para logar o usuario no sistema
O corpo(body) devera receber os as seguintes propriedades em formato JSON:

    -   email
    -   senha

    
#### **Exemplo de requisição**
``` javascript
{
    "email": "emailDoUsuario",
    "senha": "senhaDoUsuario"
}
```

#### **Exemplos de resposta em caso de sucesso**
``` javascript
{
	"id": 6,
	"nome": "Caio",
	"email": "Caio@gmail.com"
}
```
#### **Exemplos de resposta em caso de falha**
```javascript
// HTTP Status code apropriado exemplo: 400 / 401 / 403 / 404 \\
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```


## **Endpoint**

### **Cadastrar pokemon**

#### `POST` `/pokemon`

Ja com o usuario logado, apos receber o token do header da requisição (_authorization_) no formato `Bearer Token`
devem ser enviadas as informações no body da requisição no seguinte padrão

**Requisição** 
```
{
    "nome": "Nome do pokemon",
    "apelido": "Apleido do pokemon",
    "habilidades": "Lista das habilidades",
    "imagem": "endereço https da imagem"
}
```
**Resposta** 
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


