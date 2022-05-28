import database from "../database.js";

export async function newCategory(req, res) {

   const {name} = req.body;

   try {

      await database.query( `INSERT INTO categories (name) VALUES ($1)`, [name]);
      res.sendStatus(201)

   }catch(error){
      res.status(500).send(error);
   }

}

export async function getCategories(req, res) {
 
    try {
 
       const categorias = await database.query( "SELECT * FROM categories" );
       res.send(categorias.rows);

    }catch(error){
       res.status(500).send(error);
    }
 
 }