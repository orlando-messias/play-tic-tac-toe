const { Router } = require('express');
const GameController = require('./controllers/GameController');

const routes = Router();

routes.get('/', (_req, res) => {
  res.status(200).json({ msg: 'Tic Tac Toe running...' });
});

routes.post('/game', GameController.newGame);
routes.post('/game/:id/movement', GameController.newMovement);

module.exports = routes;