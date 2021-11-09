const pool = require('../config/db');

const transactionsController = {
    getTransactions: async(req,res) =>{
        try{
            const allTransactions = await pool.query('SELECT * FROM transactions')
            if(allTransactions.row < 1){
                return res.status(404).send({
                    message:"There are no transactions"
                })
            };
            res.status(200).send({
                status:"Success",
                message: 'Transaction information retrieved!',
                data:allTransactions.rows
            })
        }catch(err){
            console.log(err.message)
        }
    },
    getTransactionById: async(req,res) =>{
        try{
            const {transactionId} = req.params;
            const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1',[transactionId]);
            if(transaction.rowCount < 1){
                return res.status(404).send({
                    message: "There is no transaction with this id"
                })
            };
            res.status(200).send({
                status: 'Success',
                message: 'Transaction information retrieved!',
                data: transaction.rows[0]
            });
        }catch(err){
            console.log(err.message);
        }
    },
    addTransaction: async(req,res)=>{
        try{
            const {description, payment_amount, payment_recipient, envelope_id} = req.body;
            const date = new Date();
            await pool.query('BEGIN');
            const envelope = await pool.query('SELECT * FROM envelopes WHERE id = $1', [envelope_id]);
            console.log(envelope_id)
            if(envelope.rowCount < 1){
                return res.status(404).send({
                    message: "There is no envelope with this id"
                });
            };
            const newTransaction = await pool.query('INSERT INTO transactions (date, description, payment_amount, payment_recipient, envelope_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [date, description, payment_amount, payment_recipient, envelope_id]);
            const updatingEnvelope = await pool.query('UPDATE envelopes SET budget = budget - $1 where id = $2 RETURNING *',
            [payment_amount, envelope_id]);
            await pool.query('COMMIT');
            res.status(201).send({
                status: 'Success',
                message: 'New transaction created!',
                data: newTransaction.rows[0]
        });
        }catch(err){
            await pool.query('ROLLBACK')
            console.log(err.message)
        }
    },
    updateTransaction: async(req,res)=>{
        try{
            const {transactionId} = req.params;
            const {description, payment_amount, payment_recipient} = req.body;
            await pool.query('BEGIN');
            const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [transactionId]);
            if (transaction.rowCount < 1) {
                return res.status(404).send({
                    message: 'There is no transaction with this id.'
                });
            };
            const prevAmount = await pool.query('SELECT payment_amount FROM transactions WHERE id = $1', [transactionId]);
            await pool.query('UPDATE envelopes SET budget = (budget + $1) - $2 WHERE id in (SELECT envelope_id FROM transactions WHERE id = $3', 
            [prevAmount.rows[0], payment_amount, transactionId]);
            const updatedTransaction = await pool.query('UPDATE transactions SET description = $1, payment_amount = $2, payment_recipient = $3 WHERE id = $4', 
            [description, payment_amount, payment_recipient, transactionId]);
            await pool.query('COMMIT');
            res.status(200).send({
                status: 'Success',
                message: 'The transaction has been updated!',
                data: updatedTransaction.rows[0]
            }); 
        }catch(err){
            await pool.query('ROLLBACK')
            console.log(err.message)
        }
    },
    deleteTransaction: async(req,res)=>{
        try{
            const { transactionId } = req.params;
            await pool.query('DELETE FROM transactions WHERE id = $1', [transactionId]);
            res.json(`Transaction number ${transactionId} has been successfully deleted! `); 
        }catch(err){
            console.log(err.message)
        }
    }
}

module.exports = transactionsController