const express = require('express');
const router = express.Router();
const {
  getMachines,
  getMachineById,
  createMachine,
  updateMachine,
  deleteMachine,
  recordMachineProblem,
} = require('../controllers/machineController');

router.route('/').get(getMachines).post(createMachine);
router.route('/:id').get(getMachineById).put(updateMachine).delete(deleteMachine);
router.post('/:id/problems', recordMachineProblem);

module.exports = router;
