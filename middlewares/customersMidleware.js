import database from "../database.js";
import joi from 'joi'
import extension from "@joi/date";

export async function filterCPF(req, res, next) {

   const {cpf} = req.query;

   if(cpf){

      try {

         const customers = await database.query( `SELECT * FROM customers WHERE cpf ILIKE '${cpf}%'` );
         return res.send(customers.rows);

      }catch(error){
         return res.status(500).send(error);
      }

   } 
 
   next();

}

export async function validateId(req, res, next) {

   const {id} = req.params;

   if(id){

      try {
      
         const customers = await database.query( `SELECT * FROM customers WHERE id = $1`, [id]);
         if(!customers.rows.length) return res.sendStatus(404);

      }catch(error){

         return res.status(500).send(error);

      }
   }
   
   next();

}

export async function validateCustomer(req, res, next) {

   const {name, phone, cpf, birthday} = req.body;
   const joiDate = joi.extend(extension);

   const customerCPF = await database.query( `SELECT * FROM customers WHERE cpf = $1`, [cpf]);
   if(customerCPF.rows.length) return res.sendStatus(409);


   const customerSchema = joi.object({
      name: joi.string().required(),
      phone: joi.string().regex(new RegExp("^[0-9]+$")).min(10).max(11).required(),
      cpf: joi.string().regex(new RegExp("^[0-9]+$")).required().min(11),
      birthday: joiDate.date().format('YYYY-MM-DD').required()
   });

   const {error} = customerSchema.validate(req.body,{abortEarly: false});
   if(error) return res.sendStatus(400) 

   next();
}