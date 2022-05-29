import {Router} from 'express';
import { getCustomers, getCustomersId, newCustomer, updateCustomer  } from '../controllers/customersController.js';
import { filterCPF, validateId, validateCustomer } from '../middlewares/customersMidleware.js';

const customersRouter = new Router();

customersRouter.get('/customers', filterCPF, getCustomers);
customersRouter.get('/customers/:id', validateId, getCustomersId);
customersRouter.post('/customers', validateCustomer, newCustomer);
customersRouter.put('/customers/:id', validateCustomer, updateCustomer);


export default customersRouter;