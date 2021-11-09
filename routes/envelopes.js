const router = require('express').Router();
const envelopesController = require('../controllers/envelopes')

router.get('/',envelopesController.getEnvelopes);
router.get('/:envelopeId',envelopesController.getEnvelopesById);
router.post('/',envelopesController.addEnvelopes);
router.put('/:envelopeId',envelopesController.updateEnvelopes);
router.delete('/:envelopeId',envelopesController.deletedEnvelopes);
router.post('/transfer/:from/:to',envelopesController.transferEnvelopes);
module.exports = router