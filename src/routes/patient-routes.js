const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient-controllers.js');
const requireAuth = require('../middleware/auth.js');
const validateFhirResource = require('../middleware/fhir-validation.js');

router.post('/patients', requireAuth, validateFhirResource('Patient'), patientController.createPatient);
router.get('/patients/:id', requireAuth, patientController.getPatientById);
router.put('/patients/:id', requireAuth, validateFhirResource('Patient'), patientController.updatePatient);
router.delete('/patients/:id', requireAuth, patientController.deletePatient);

module.exports = router;
