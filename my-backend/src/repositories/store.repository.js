const db = require('../database/pg.database.js');

exports.getAllStores = async () => {
    try {
        const res = await db.query("SELECT * FROM stores");
        return res.rows;
    }
    catch (error) {
        console.error("Database query failed", error);
    }
};

exports.createStore = async (store) => {
    try {
        const res = await db.query(
            "INSERT INTO stores (name, address) VALUES ($1, $2) RETURNING *",
            [store.name, store.address]
        );
        return res.rows[0];
    }
    catch (error) {
        console.log(error);
        console.error("Database query failed", error);
    }
};

exports.getStoreID = async (id) => {
    try {
        const res = await db.query(
            "SELECT * FROM stores WHERE id = $1",
            [id]
        );
        return res.rows[0];
    }
    catch (error) {
        console.log(error);
        console.error("Database query failed", error);
    }
};

exports.putStore = async (store) => {

    try {
        const res = await db.query(
            "UPDATE stores SET name = $1, address = $2 WHERE id = $3 RETURNING *", 
            [store.name, store.address, store.id]
        );
        return res.rows[0];
    }
    catch (error) {
        console.log(error);
        console.error("Database query failed", error);
    }
};

exports.deleteStoreID = async (id) => {
    try {
        const res = await db.query(
            "DELETE FROM stores WHERE id = $1 RETURNING *",
            [id]
        );
        return res.rows[0];
    }
    catch (error) {
        console.log(error);
        console.error("Database query failed", error);
    }
};
