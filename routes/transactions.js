const router = require('express').Router();
const transactionsController = require('../controllers/transactions');

router.get('/',transactionsController.getTransactions);
router.get('/:transactionId',transactionsController.getTransactionById);
router.post('/',transactionsController.addTransaction);
router.put('/:transactionId',transactionsController.updateTransaction);
router.delete('/:transactionId',transactionsController.deleteTransaction)   

module.exports = router;