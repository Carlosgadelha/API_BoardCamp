import {Router} from 'express';
import { finalizeRent, getRentals, newRent, deleteRent } from '../controllers/rentalsController.js';
import { validateRent, validateFinalizeRent } from '../middlewares/rentalsMidleware.js';


const rentalsRouter = new Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateRent, newRent);
rentalsRouter.put('/rentals/:id/return',validateFinalizeRent, finalizeRent);
rentalsRouter.delete('/rentals/:id', validateFinalizeRent, deleteRent)

export default rentalsRouter;