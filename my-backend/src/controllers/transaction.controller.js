const TransactionRepository = require('../repositories/transaction.repository');
const baseResponse = require('../utils/baseResponse');

exports.createTransaction = async (req, res) => {
    try {
        const { user_id, item_id, quantity } = req.body;
        const transaction = await TransactionRepository.createTransaction({ user_id, item_id, quantity });

        res.status(201).json({
        success: true,
        message: "Transaction created",
        payload: transaction,
        });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.payTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await TransactionRepository.payTransaction(id);

        res.status(200).json({
            success: true,
            message: "Payment successful",
            payload: transaction,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await TransactionRepository.deleteTransaction(id);

        res.status(200).json({
            success: true,
            message: "Transaction deleted",
            payload: transaction,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionRepository.getAllTransactions();
        return baseResponse(res, true, 200, "Transactions Found", transactions);
    } catch (err) {
        return baseResponse(res, false, 404, `Something went wrong: ${err.message}`, null);
    }
};