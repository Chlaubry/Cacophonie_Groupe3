const express = require('express');
const router = express.Router();

const botController = require('../controllers/botController');

router.post('/', botController.createBot);
router.delete('/:id', botController.deleteBot);
router.post('/:id/start', botController.startBot);
router.post('/:id/stop', botController.stopBot);
router.put('/:id/brain', botController.updateBrain);

module.exports = router;
