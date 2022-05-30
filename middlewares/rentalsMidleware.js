import database from "../database.js";
import joi from 'joi'

export async function validateRent(req, res, next) {

    const {customerId, gameId, daysRented} = req.body;
    const rentalSchema = joi.object({
        customerId: joi.number().required(),
        gameId: joi.number().required(),
        daysRented: joi.number().required().min(1)
    });
  
    const {error} = rentalSchema.validate(req.body,{abortEarly: false});
    if(error)  return res.sendStatus(400)

    try {
        const customer = await database.query( `SELECT * FROM customers WHERE id = $1`, [customerId]);
        if(!customer.rows.length) return res.sendStatus(400);

        const game = await database.query( `SELECT * FROM games WHERE id = $1`, [gameId]);
        if(!game.rows.length) return res.sendStatus(400);

        const rent = await database.query( `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [gameId]);
        if(rent.rows.length === game.rows[0].stockTotal) return res.sendStatus(400);

    } catch (error) {
        return res.sendStatus(500);
    }

    next();

}

export async function validateFinalizeRent(req, res, next) {

    const {id} = req.params;

    try {

        const rent = await database.query( `SELECT * FROM rentals WHERE id = $1`, [id]);
        if(!rent.rows.length) return res.sendStatus(404);
        if(rent.rows[0].returnDate) return res.sendStatus(400);

    } catch (error) {
        return res.sendStatus(500);
    }

    next();

}