import {Router} from 'express';
import { getCategories, newCategory } from '../controllers/categoriesController.js';
import { validateCategory } from '../middlewares/categoriesMidleware.js';

const categoriesRouter = new Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories',validateCategory, newCategory);


export default categoriesRouter;