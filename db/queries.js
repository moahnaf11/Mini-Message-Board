const pool = require("./pool");

async function getMessages(req, res, next) {
    const {rows} = await pool.query("SELECT * FROM messages");
    req.message = rows;
    next();

}

async function insertMessage(req, res, next) {
    const user = req.body.name
    const text = req.body.text

    const query = `
    INSERT INTO messages (users, text, added)
    VALUES ($1, $2, NOW())
    RETURNING *;
    `
    const {rows} = await pool.query(query, [user, text]);
    console.log(rows);
    next();


}

module.exports = {
    getMessages,
    insertMessage
}

