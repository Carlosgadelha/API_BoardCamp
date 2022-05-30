import database from "../database.js";

export async function newGame(req, res) {

   const {name, image, stockTotal, categoryId, pricePerDay} = req.body;

   try {

      await database.query( `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,[name, image, stockTotal, categoryId, pricePerDay]);
      res.sendStatus(201)

   }catch(error){
      res.status(500).send(error);
   }

}

export async function getGames(req, res) {

   const name = req.query.name;

   if(name){

      try {

         const games = await database.query( `SELECT * FROM games WHERE name ILIKE '${name}%'` );
         return res.send(games.rows);

      }catch(error){
         return res.status(500).send(error);
      }

   } 
 
   try {

       const games = await database.query( "SELECT * FROM games" );
       res.send(games.rows);

   }catch(error){
       res.status(500).send(error);
   }
 
 }