import database from "../database.js";

export async function validateCategory(req, res, next) {
    const { name } = req.body;

    const categoria = await database.query(
        `SELECT * FROM categories WHERE name = $1`, [name]
    )
    if(name === "") return res.sendStatus(400)
    if(categoria.rows.length) return res.sendStatus(409);

    next();

}