import {Router} from 'express';
import { getGames, newGame } from '../controllers/gamesController.js';
import { validateGame } from '../middlewares/gamesMidleware.js';

const gamesRouter = new Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games',validateGame, newGame);


export default gamesRouter;