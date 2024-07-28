const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient-controllers.js');
const requireAuth = require('../middleware/auth.js');

router.post('/patients', requireAuth, patientController.createPatient);
router.get('/patients/:id', requireAuth, patientController.getPatientById);
router.put('/patients/:id', requireAuth, patientController.updatePatient);
router.delete('/patients/:id', requireAuth, patientController.deletePatient);

module.exports = router;
