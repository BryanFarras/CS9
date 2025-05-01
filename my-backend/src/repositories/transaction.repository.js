const db = require("../database/pg.database.js");

exports.createTransaction = async ({ user_id, item_id, quantity }) => {
    const itemQuery = await db.query("SELECT price FROM items WHERE id = $1", [
    item_id,
    ]);
    if (itemQuery.rowCount === 0) throw new Error("Item not found");

    const total = itemQuery.rows[0].price * quantity;

    const result = await db.query(
    `INSERT INTO transactions (user_id, item_id, quantity, total)
    VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user_id, item_id, quantity, total]
);

    return result.rows[0];
};

exports.payTransaction = async (id) => {
    const result = await db.query(
    `UPDATE transactions SET status = 'paid' WHERE id = $1 RETURNING *`,
    [id]
    );
    if (result.rowCount === 0) throw new Error("Transaction not found");
    return result.rows[0];
};

exports.deleteTransaction = async (id) => {
    const result = await db.query(
    `DELETE FROM transactions WHERE id = $1 RETURNING *`,
    [id]
    );
    if (result.rowCount === 0) throw new Error("Transaction not found");
    return result.rows[0];
};

exports.getAllTransactions = async () => {
    try {
        const query = `
            SELECT
                t.*,  
                row_to_json(u) as "user", 
                row_to_json(i) as "item"  
            FROM transactions t
            JOIN users u ON t.user_id = u.id 
            JOIN items i ON t.item_id = i.id 
            ORDER BY t.created_at DESC; 
        `;
        
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(`Error fetching transactions: ${error.message}`);
    }
};