const db = require("../database/pg.database.js");
const bcrypt = require('bcrypt');

exports.getAllUsers = async () => {
    try {
        const res = await db.query("SELECT * FROM users");
        return res.rows;
    }
    catch (error) {
        console.error("Database query failed", error);
    }
};

exports.registerUser =  async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const res = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [user.name, user.email, hashedPassword]
        );
        return res.rows[0];
    }
    catch (error) {
        console.log(error);
        console.error("Database query failed", error);
    }
};

/*
exports.loginUser = async (user) => {
    try {
        const res = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [user.email]
        );
        return res.rows[0];
    }
    catch (error) {
        console.log(error);
        console.error("Database query failed", error);
    }
};
*/

exports.updateUserbyID = async (user) => {
    try {
        const res = await db.query(
            "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
            [user.name, user.email, user.password, user.id]
        );
        return res.rows[0];
    }
    catch (error) {
        console.log(error);
        console.error("Database query failed", error);
    }
};

exports.deleteUserID = async (id) => {
    try {
        const res = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return res.rows[0];
    }
    catch (error) {
        console.error("Database query failed", error);
    }
};

exports.getUserByEmail = async (email) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return res.rows[0]; // Kembalikan pengguna berdasarkan email
    } catch (error) {
        console.error("Database query failed", error);
        throw error;
    }
};

exports.topUpBalance = async (id, amount) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (user.rows.length === 0) return null;

        const currentBalance = user.rows[0].balance || 0;
        const newBalance = currentBalance + amount;

        const updated = await db.query(
            "UPDATE users SET balance = $1 WHERE id = $2 RETURNING *",
            [newBalance, id]
        );

        return updated.rows[0];
    } catch (err) {
        throw err;
    }
};