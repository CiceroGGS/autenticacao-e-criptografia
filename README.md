## API de cadastro de jogadores e pokemons com autenticação e criptografia

Essa API tem como principal objetivo cadastrar usuarios e pokemons dentro de um banco de dados,
porem para cadastrar os  **Pokemons** o usuario deve estar logado.

###### bibliotecas utilizadas: `bcrypt` `express` `jsonwebtoken` `pg`

## **Banco de dados**

Neste projeto foi criado um bando de dados PostgreSQL chamado `catalogo_pokemons` contendo as seguintes tabelas e colunas:  

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
    "mensagem": "Mensagem da falha."
}
```

## **Endpoint**

### **Login do usuário**

#### `POST` `/login`
    -   nome
    -   email
    
#### **Exemplo de requisição**
``` javascript
{
    "email": "cicero@gmail.com",
    "senha": "abc123"
}
```
#### **Exemplos de resposta em caso de sucesso**
``` javascript
{
	"usuario": {
		"id": 1,
		"nome": "cicero",
		"email": "cicer@gmail.com"
	},
	"token": "gerado pela biblioteca `jsonwebtoken`"
}
```
#### **Exemplos de resposta em caso de falha**
```javascript
// HTTP Status code apropriado exemplo: 400 / 401 / 403 / 404 \\
{
    "mensagem": "Mensagem da falha."
}
```



## Para a entidade `pokemons` foram implementados as seguintes funcionalidades.

a) Cadastro do pokemons

b) Atualização apenas do apelido do pokemon

c) Listagem completa dos pokemons

d) Listagem de apenas um pokemon filtrado pelo seu id

e) Exclusão do pokemon


## **Endpoint**

### ** A) Cadastrar pokemon**

#### `POST` `/pokemon`

Ja com o usuario logado, apos receber o token do header da requisição (_authorization_) no formato `Bearer Token`
devem ser enviadas as informações no body da requisição no seguinte padrão.

**Requisição** 
```javascript
{
    "nome": "Charizard",
    "apelido": "Fogo Quente",
    "habilidades": "habiliade 1, habiliade 2",
    "imagem": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png"
}
```

**Resposta** 
Sera retornado uma listagem de pokemons para o usuario logado:

```javascript
[
    {
        "id": 1,
        "usuario": "Nome do usuário responsável"
        "nome": "Charizard",
        "apelido": "Fogo Quente",
        "habilidades": ["habiliade 1", "habiliade 2"],
        "imagem": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png"
    }
]
```

## **Endpoint**

### ** B) Atualizar apelido pokemon**

#### `PATCH` `/pokemon/:id`

Essa é a rota que será chamada quando o usuário quiser alterar o apelido de seu pokemon ja com
o usuário é  identificado através do ID presente no token de autenticação o pokemon e identificado através
do ID passado como parametro de rota

#### **Exemplo de requisição**

```javascript
{
    "apelido": "novo_apelido"
}
```

#### **Exemplos de resposta em caso de sucesso**

```
Em caso de sucesso não e retornado nada no corpo(body) apenas o status code 204(No Content) indicando que o apelido foi atualizado
```

#### **Exemplos de resposta em caso de falha**

```javascript
// HTTP Status code apropriado exemplo: 400 / 401 / 403 / 404 \\
{
    "mensagem": "Mensagem da falha."
}
```


## **Endpoint**

### ** C) Listagem completa dos pokemons**

#### `GET` `/pokemon`

Essa é a rota que será chamada quando o usuário quiser realizar a listagem de todos os seus pokemons
ja com o usuário é  identificado através do ID presente no token de autenticação.

#### **Exemplo de requisição**

```javascript
    "Sem corpo(body)"
```

#### **Exemplos de resposta em caso de sucesso quando usuario possuir pokemons cadastrados**

```
[
	{
		"id": 1,
		"nome": "Charizard",   
		"habilidades": [
			"habilidade 1",
			"habilidade 2"
		],
		"apelido": "Fogo Quente",
		"imagem": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
		"usuario": "Cicero"
	},
	{
		"id": 2,
		"nome": "Blastoise",
		"habilidades": [
			"habilidade 1",
			"habilidade 2"
		],
		"apelido": "blastoisao",
		"imagem": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
		"usuario": "Cicero"
	},
[
```
#### **Exemplos de resposta em caso usuario nao tenha nem um pokemon**

```javascript
// Array vazio com status code (200) \\
{
	[]
}
```


## **Endpoint**

### ** D) Listagem de apenas um pokemon filtrado pelo seu id**

#### `GET` `/pokemon/:id`

Essa é a rota que será chamada quando o usuário quiser realizar a listagem de apenas um de seus pokemons,
ja com o usuário é  identificado através do ID presente no token de autenticação o pokemon e identificado através
do ID passado como parametro de rota

#### **Exemplo de requisição**

```javascript
{
    "http://servidor:porta/pokemon/1"
}
```

#### **Exemplos de resposta em caso de sucesso quando usuario possuir o pokemon com id informado**
```
[
	{
		"id": 1,
		"nome": "Charizard",   
		"habilidades": [
			"habilidade 1",
			"habilidade 2"
		],
		"apelido": "Fogo Quente",
		"imagem": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
		"usuario": "Cicero"
	},
[
```
#### **Exemplos de resposta em quando usuario não possuir o pokemon com id informado**

```javascript
// HTTP Status code:  404 \\
{
	"mensagem": "Pokemon não existe! "
}
```


## **Endpoint**

### ** E) Exclusão do pokemon pelo seu Id**

#### `DELETE` `/pokemon/:id`

Essa é a rota que será chamada quando o usuário quiser realizar a exclusão de um de seus pokemons,
ja com o usuário é  identificado através do ID presente no token de autenticação o pokemon e identificado através
do ID passado como parametro de rota

#### **Exemplo de requisição**

```javascript

    "Sem corpo(body)"

```

#### **Exemplos de resposta em caso de sucesso**
```
Em caso de sucesso não e retornado nada no corpo(body) apenas o status code 204( No Content) indicando que o pokemon foi excluido
```

#### **Exemplos de resposta em quando usuario não possuir o pokemon com id informado**
```javascript
// HTTP Status code:  404 
{
	"mensagem": "Pokemon não existe! "
}
```


