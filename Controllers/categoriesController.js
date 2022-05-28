import database from "../database.js";

export async function novaCategoria(req, res) {
   const {name:categoria} = req.body;

   try {
      await database.query(
         `INSERT INTO categories (name) VALUES ($1)`,
         [categoria]
      );
      res.status(201)
   }catch(error){
        console.log(error);
      res.status(500).send(error);
   }

}