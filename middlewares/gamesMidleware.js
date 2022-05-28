import database from "../database.js";
import joi from 'joi';

export async function validateGame(req, res, next) {

   const {name, image, stockTotal, categoryId, pricePerDay} = req.body;

   const categoriaId = await database.query( `SELECT * FROM categories WHERE id = $1`, [categoryId]);
   if(!categoriaId.rows.length) return res.sendStatus(400);

   const gameName = await database.query( `SELECT * FROM games WHERE name = $1`, [name]);
   if(gameName.rows.length) return res.sendStatus(409);

   const gameSchema = joi.object({
      name: joi.string().required(),
      image: joi.string().required(),
      stockTotal: joi.number().required().min(1),
      categoryId: joi.number().required(),
      pricePerDay: joi.number().required().min(1)
   });

   const {error} = gameSchema.validate(req.body,{abortEarly: false});
   if(error)  return res.sendStatus(400)

   next();
}