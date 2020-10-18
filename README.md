## API Jogo da Velha

#### Desenvolvida utilizando NodeJS e Express

**BACKEND -**


Após clonar o repositório, abra a pasta ***server*** e inicialize a aplicação 
com ```npm install``` e rode com ```npm start```. A API roda em *localhost* na *porta 3333*.


- Requisição *post* na rota **/game** inicializa um novo jogo com o ***id*** da partida, a definição do ***primeiro jogador*** e os retorna num objeto JSON. Desta forma o jogador é gerado automaticamente ```firstPlayer``` e pode ser **'X'** ou **'O'**. Exemplo:

```
{
 	"id": "d0a48ac4-eade-41e3-89a0-09982b776c60",
 	"firstPlayer": "X"
}
```


- Requisição *post* na rota **/game/id/movement** permite definifir, no corpo da requisição, um movimento na partida. Exemplo:
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
*index.js* | inicializa o Express, escuta a porta 3333 e chama o arquivo de rotas routes.js
*routes.js*| estabelece quais são as rotas da aplicação e direciona para o Controller
*GameController.js*| controla as ações de cada chamada realizada às rotas **/game** e **/game/id/movement**
*services/game.js*| contém a maior parte das regras de negócio

<img align="center" src="/images/api-folders.png">

**FRONTEND -**

Para melhor demonstração das funcionalidades da **API Jogo da Velha**, foi construído um FrontEnd em React e disponibilizado na pasta ***web***. Para inicializar, instale as dependências do projeto com ```npm install``` e, em seguida ```npm start```. O projeto roda localmente na *porta 3000*.

O arquivo ***Home.js***, ao ser iniciado, conecta-se à API e dá inicio a um novo jogo realizando uma requisição na rota **/game**.

Cliques no tabuleiro realizam requisições à rota **/game/id/movement**.

O botão ***Restart Game*** permite realizar nova requisição à rota **/game** para novo id e nova partida.

:camera: **Screenshots da tela**

![](/images/game01.png)

![](/images/game02.png)

