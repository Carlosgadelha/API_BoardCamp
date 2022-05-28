import {Router} from 'express';
import { novaCategoria } from '../Controllers/categoriesController.js';


const categoriesRouter = new Router();

categoriesRouter.post('/categories', novaCategoria);


export default categoriesRouter;