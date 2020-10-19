# API Jogo da Velha

#### :computer: Desenvolvida utilizando NodeJS e Express  :computer:

**BACKEND -**


Após clonar o repositório, abra a pasta ***server*** e execute em seu terminal os comandos ```npm install``` e ```npm start```. A API roda localmente na *porta 3333*. É possível também automatizar o install e o start apenas executando o arquivo ```./runScripts.sh``` na linha de comando de seu terminal.


- Requisições *post* na rota **/game** inicializam um novo jogo com o ***id*** da partida e a definição do ***primeiro jogador***. O jogador é gerado automaticamente - ```firstPlayer``` - e pode ser **"X"** ou **"O"**. Exemplo de JSON retornado:

```
{
    "id": "d0a48ac4-eade-41e3-89a0-09982b776c60",
    "firstPlayer": "X"
}
```


- Requisições *post* na rota **/game/id/movement** aguardam definifir, no corpo da requisição, um movimento na partida. Exemplo:
```
{
    "player": "X",
    "position": {"x":0 , "y": 2},
    "id": "d0a48ac4-eade-41e3-89a0-09982b776c60"
}
```

:open_file_folder: **Estrutura de Pastas e Arquivos**

arquivo | definição
------------ | -------------
index.js | inicializa o Express, escuta a porta 3333 e chama o arquivo de rotas routes.js
routes.js| estabelece quais são as rotas da aplicação e direciona o fluxo para o Controller
GameController.js| controla as ações de cada chamada realizada nas rotas **/game** e **/game/id/movement**
services/game.js| possui as regras de negócio da aplicação
runScripts.sh | script que executa os comandos npm install e npm start automaticamente

![](/images/api-folders.png)

:wrench: **Dependências do Projeto**
```
"dependencies": {
   "body-parser": "^1.19.0",
   "express: "^4.17.1",
   "uuid": "^8.3.1"
},
"devDependencies": {
   "nodemon": "^2.0.5"
}
```
##

**FRONTEND -**

Para melhor demonstração das funcionalidades da **API Jogo da Velha**, foi construído um FrontEnd em React - totalmente independente - e disponibilizado na pasta ***web***. Para inicializar, instale as dependências do projeto com ```npm install``` e, em seguida, rode ```npm start```. O projeto roda localmente na *porta 3000*.

- A página ***Home.jsx***, ao ser iniciada, conecta-se à API e faz uma requisição na rota **/game** dando início a um novo jogo. A página recebe como resposta o ***id*** da partida e o ***firstPlayer***.

- Cliques no tabuleiro realizam requisições na rota **/game/id/movement** enviando a posição escolhida e o jogador da rodada.

- Ao fim da partida, o botão ***Restart Game*** permite fazer nova requisição na rota **/game** gerando um novo ***id*** e um novo jogador.

:camera: **Screenshots de telas**

1. *Durante uma partida*
<p align="center"><img src="/images/game01.png"></p>

2. *Fim de uma partida*
<p align="center"><img src="/images/game02.png"></p>


