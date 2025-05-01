const db = require('../database/pg.database.js');

exports.createItem = async ({ name, price, store_id, stock, image_url}) => {
    const result = await db.query(
        'INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, price, store_id, image_url, stock]
    );
    return result.rows[0];
};

exports.getAllItems = async () => {
    const result = await db.query('SELECT * FROM items');
    return result.rows;
};

exports.getItemById = async (id) => {
    const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
};

exports.getItemsByStoreId = async (store_id) => {
    const result = await db.query('SELECT * FROM items WHERE store_id = $1', [store_id]);
    return result.rows;
};

exports.updateItem = async ({ id, name, price, store_id, stock, image_url }) => {
    const result = await db.query(
        'UPDATE items SET name=$1, price=$2, store_id=$3, image_url=$4, stock=$5 WHERE id=$6 RETURNING *',
        [name, price, store_id, image_url, stock, id]
    );
    return result.rows[0];
};

exports.deleteItem = async (id) => {
    const result = await db.query('DELETE FROM items WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
};
