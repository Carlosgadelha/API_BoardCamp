import dayjs from "dayjs";
import database from "../database.js";

export async function newRent(req, res) {
   
   const {customerId, gameId, daysRented} = req.body;
   const rentDate = dayjs(new Date()).format('YYYY-MM-DD')

   try {

      const pricePerDay = await database.query(` SELECT "pricePerDay" FROM games WHERE id = $1`, [gameId])
      const originalPrice = Number(pricePerDay.rows[0].pricePerDay) * daysRented

      await database.query( 
         `INSERT INTO rentals ("customerId", "gameId","rentDate", "daysRented", "originalPrice", "returnDate", "delayFee") 
          VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, originalPrice, null, null]
      );

      res.sendStatus(201)

   }catch(error){
      console.log(error);
      res.sendStatus(500);
   }

}

export async function getRentals(req, res) {

   let data = []
   let rentals = null

   const customerId = req.query.customerId ? req.query.customerId : null;
   const gameId = req.query.gameId ? req.query.gameId : null;

   try {
      if(customerId){
         rentals = await database.query(` SELECT rentals.*, customers.id AS customers_id, customers.name AS customers_name, games.id AS games_id, games.name AS games_name, games.image, games."stockTotal", games."categoryId", games."pricePerDay"
                                                FROM rentals
                                                JOIN customers ON rentals."customerId" = customers.id
                                                JOIN games ON rentals."gameId" = games.id 
                                                WHERE rentals."customerId" = $1 ORDER BY rentals.id ASC`, [customerId]);
      }else{
         if(gameId){
            rentals = await database.query(` SELECT rentals.*, customers.id AS customers_id, customers.name AS customers_name, games.id AS games_id, games.name AS games_name, games.image, games."stockTotal", games."categoryId", games."pricePerDay"
                                                   FROM rentals
                                                   JOIN customers ON rentals."customerId" = customers.id
                                                   JOIN games ON rentals."gameId" = games.id 
                                                   WHERE rentals."gameId" = $1 ORDER BY rentals.id ASC`, [gameId]);
         }else{
            rentals = await database.query(` SELECT rentals.*, customers.id AS customers_id, customers.name AS customers_name, games.id AS games_id, games.name AS games_name, games.image, games."stockTotal", games."categoryId", games."pricePerDay"
                                                   FROM rentals
                                                   JOIN customers ON rentals."customerId" = customers.id
                                                   JOIN games ON rentals."gameId" = games.id  ORDER BY rentals.id ASC`);
         }
      }
      rentals.rows.forEach( rental => {
         data = [...data, { 
            id: rental.id, 
            customerId: rental.customerId, 
            gameId: rental.gameId, 
            rentDate: rental.rentDate, 
            returnDate: rental.returnDate,
            originalPrice: rental.originalPrice, 
            delayFee: rental.delayFee,
            customer:{
               id: rental.customers_id,
               name: rental.customers_name
            },
            game:{
               id: rental.games_id,
               name: rental.games_name,
               image: rental.image,
               stockTotal: rental.stockTotal,
               categoryId : rental.categoryId,
               pricePerDay: rental.pricePerDay,

            } 
         }]
         
      })

      res.send(data);
   
      }catch(error){
         res.status(500);
      }
 
}


export async function finalizeRent(req, res) {
   
   const {id} = req.params;

   try {

      const rent = await database.query(` SELECT rentals.*, games."pricePerDay"
                                          FROM rentals
                                          JOIN games ON rentals."gameId" = games.id 
                                          WHERE rentals.id = $1`, [id]);

      
      const rentDate = dayjs(rent.rows[0].rentDate).format('YYYY-MM-DD')
      const daysRented = rent.rows[0].daysRented
      const returnDate = dayjs(new Date()).format('YYYY-MM-DD')
      const delayFee = (dayjs(returnDate).diff(dayjs(rentDate), 'days') > daysRented ) ? dayjs(returnDate).diff(dayjs(rentDate), 'days') * rentDate : 0;
      
      await database.query( `UPDATE rentals SET "returnDate"=$1, "delayFee" = $2 WHERE id = $3 `, [returnDate, delayFee, id]);
      res.sendStatus(200)

   }catch(error){
      console.log(error);
      res.status(500).send(error);
   }

   
}

export async function deleteRent(req, res) {
   
   const {id} = req.params;

   try {
      await database.query( `DELETE FROM rentals WHERE id = $1 `, [id]);
      res.sendStatus(200)

   }catch(error){
      console.log(error);
      res.status(500);
   }
}