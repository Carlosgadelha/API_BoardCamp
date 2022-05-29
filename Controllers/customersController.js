import database from "../database.js";

export async function newCustomer(req, res) {

   const {name, phone, cpf, birthday} = req.body;

   try {

      await database.query( `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
      res.sendStatus(201)

   }catch(error){
      res.status(500).send(error);
   }

}

export async function getCustomers(req, res) {
 
   try {

       const customers = await database.query( "SELECT * FROM customers" );
       res.send(customers.rows);

   }catch(error){
       res.status(500).send(error);
   }
 
}

export async function getCustomersId(req, res) {

   const id = req.params.id;
 
   try {

       const customer = await database.query( `SELECT * FROM customers WHERE id = $1`, [id]);
       res.send(customer.rows);

   }catch(error){
       res.status(500).send(error);
   }
 
}

export async function updateCustomer(req, res) {
   const {name, phone, cpf, birthday} = req.body;
   const {id} = req.params;

   try {

      await database.query( `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id = $5`, [name, phone, cpf, birthday, id]);
      res.sendStatus(201)

   }catch(error){
      res.status(500).send(error);
   }

   
}