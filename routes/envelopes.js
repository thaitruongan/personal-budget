const router = require('express').Router();
const {envelopesController,validateEnvelope} = require('../controllers/envelopes')

router.get('/envelopes',envelopesController.getEnvelopes);
router.param('id',envelopesController.paramId);
router.get('/envelopes/:id',envelopesController.getEnvelopesById);
router.post('/envelopes',validateEnvelope,envelopesController.postEnvelopes);
router.param('amount',envelopesController.paramAmount);
router.post('/envelopes/:id/withdraw/:amount',envelopesController.postAmount);
router.delete('/envelopes/:id',envelopesController.deleteByID);
router.param('to',envelopesController.paramTo);
router.post('/envelopes/:id/:to/:amount',envelopesController.postToAmount);

module.exports = router