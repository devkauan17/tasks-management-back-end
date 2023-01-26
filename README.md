# Gerenciamento de tarefas

Esse projeto consiste em um gerenciador de tarefas integrado com banco de dados. Esse projeto usa as seguintes bibliotecas: Bcrypt, Cors, Dotenv, Express, JOI, JsonWebToken, Knex e PG.


Link do deploy: <a href='https://tasks-management-back-end.cyclic.app/' target='_black'>Gerenciador de tarefas</a>


<details>
<summary><b>[Intermediário] Autenticação</b></summary>

<br>

Esse intermediártio faz a verificação do token informado no req.headers necessário para as demais requisições, e o req.user é criado

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Não autorizado.'
}

```

<br/>

</details>

##### Para usuários:

<details>
<summary><b>[Usuário] Cadastrar</b></summary>

### Cadastrar usuário

#### `POST` `/user`

 Esse endpoint realiza o cadastro de usuário no banco de dados. Antes que esse cadastro seja realizado, ele encripta a senha e verifica se o email informado já foi cadastrado por alguma outra conta. 

#### Exemplo de requisição

```javascript
{
    'name': 'exemplo de nome',
    'email': 'exemplo@email.com',
    'password': 'senha1234'
}
```

### Exemplo de resposta

```javascript
// HTTP Status 202
// Sem resposta no body

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Email já cadastrado.'
}

```

<br/>
</details>

<details>
<summary><b>[Usuário] Logar</b></summary>

### Login de usuário

#### `POST` `/login`

 Esse endpoint realiza o login nesta API, gerando um token como resposta que é preciso para realizar qualquer requisição relacionada ao gerenciamento das tarefas e atualização de dados do usuário logado.

 O token expira depois de 7 dias, após isso o login tem que ser feito novamente.

### Exemplo de requisição

```javascript
{
    'email': 'exemplo@email.com',
    'password': 'senha1234'
}
```

### Exemplo de resposta

```javascript
// HTTP Status 200

{
	"user": {
		"id": 1,
		'name': 'exemplo de nome',
		'email': 'exemplo@email.com',
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0NjYwMjM3LCJleHAiOjE2NzUyNjUwMzd9.mb8Vvbrci6EDQpbBiYXIE8g-oxaGE2ZMJYOhdoehfnA"
}

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Email ou senha inválida.'
}
```

<br/>
</details>

<details>
<summary><b>[Usuário] Listar</b></summary>

### Listagem de dados do usuário logado

#### `GET` `/user`

Esse endpoint retorna os dados do usuário logado. Essa rota retorna o req.user . 

### Exemplo de requisição

```javascript
// Sem dados no body

```

### Exemplo de resposta

```javascript
// HTTP Status 200

{
	"id": 1,
    'name': 'exemplo de nome',
    'email': 'exemplo@email.com',
	"password": "$2b$10$k1Y6RWNVQWmAHPdUTfPU0eNHn93Fd0LxN0R5iGQDc1v8I5yhkLqM."
}

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Erro interno do servidor.'
}

```

<br/>
</details>

<details>
<summary><b>[Usuário] Atualizar</b></summary>

### Atualizar usuário

#### `PUT` `/user`

 Esse endpoint realiza a atulização da dados do usuário logado. Antes de qualquer avanço ele encripta a nova senha, verifica se o email informado já foi cadastrado por alguma outra conta, e também é preciso informar a senha antiga e a nova para concluir essa atualização.

### Exemplo de requisição

```javascript
{
    'name': 'exemplo de nome',
    'email': 'exemplo@email.com',
    'currentPassword':'senha1234',
    'password': 'senha123456'
}
```

### Exemplo de resposta

```javascript
// HTTP Status 201
// Sem resposta no body

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Senha incorreta.'
}
```

<br/>
</details>

<details>
<summary><b>[Usuário] Excluir</b></summary>

### Excluir conta do usuário

#### `DELETE` `/user`

Esse endpoint exclui a conta do usuário logado no momento. Como não é informado nenhum tipo de dado, essa rota pega os dados necessários através do token informado pelo pelo usuário quando ele efetuou o login.

### Exemplo de requisição

```javascript
// Sem dados no body

```

### Exemplo de resposta

```javascript
// HTTP Status 200
// Sem resposta no body

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Erro interno do servidor.'
}

```

<br/>
</details>

<br/>

##### Para tarefas:

Para qualquer rota abaixo é preciso do token que é gerado no login.

<details>

<summary><b>[Tarefa] Cadastrar</b></summary>

### Cadastrar tarefa

#### `POST` `/task`

 Esse endpoint realiza o cadastro de uma tarefa no sistema, mas antes essa rota verifica se ja existe uma tarefa existente no sistema.

#### Exemplo de requisição

```javascript
{
    'description':'teste',
    'completed':false
}
```

### Exemplo de resposta

```javascript
// HTTP Status 202
// Sem resposta no body

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Essa tarefa já existe.'
}

```

<br/>

</details>


<details>

<summary><b>[Tarefa] Listar</b></summary>

### Listar tarefas

#### `GET` `/tasks`

 Esse endpoint lista todas as tarefas por usuário logado. Como não é informado nenhum tipo de dado, essa rota pega os dados necessários através do token informado pelo pelo usuário quando ele efetuou o login.

#### Exemplo de requisição

```javascript
// Sem dados no body

```

### Exemplo de resposta

```javascript
// HTTP Status 200

[
    {
     "id": 1,
     "description": "descrição de teste",
     "completed": false,
     "user_id": 1
    },
    {
     "id": 2,
     "description": "descrição de teste 2",
     "completed": false,
     "user_id": 1
    }
]

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Erro interno do servidor.'
}

```

<br/>

</details>

<details>
<summary><b>[Tarefa] Atualizar</b></summary>

### Atualizar tarefa

#### `PUT` `/task/:id`

 Esse endpoint atualiza de uma tarefa por usuário logado. O id da tarefa é recuperado na rota como query params, e o id do usuário é recuperado no req.user .

#### Exemplo de requisição

```javascript
// Sem dados no body

```

### Exemplo de resposta

```javascript
// HTTP Status 200
// Sem resposta no body

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Tarefa não encontrada'
}

```

<br/>

</details> 


<details>
<summary><b>[Tarefa] Excluir</b></summary>

### Excluir tarefa

#### `DELETE` `/task/:id`

 Esse endpoint exclui de uma tarefa por usuário logado. O id da tarefa é recuperado na rota como query params e o id do usuário é recuperado no req.user .

#### Exemplo de requisição

```javascript
// Sem dados no body

```

### Exemplo de resposta

```javascript
// HTTP Status 200
// Sem resposta no body

```

### Exemplo de resposta em caso de erro

```javascript
// HTTP Status 400

{
    'Tarefa não encontrada'
}

```

<br/>   

</details> 



