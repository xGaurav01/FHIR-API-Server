const { Fhir } = require('fhir');
const database = require('../config/db-config.js');

const createPatient = async (req, res) => {
  try {
    const { id, identifier, active, name, telecom, gender, birth_date, address } = req.body;
    const fhir = new Fhir();

    const fhirPatient = {
      resourceType: 'Patient',
      id: id,
      identifier: [{ value: identifier }],
      active: active,
      name: [{ text: name }],
      telecom: [{ value: telecom }],
      gender: gender,
      birth_date: birth_date,
      address: [{ text: address }],
    };

    const validation = fhir.validate(fhirPatient);
    if (!validation.valid) {
      return res.status(400).json({ error: validation });
    }
    const patientCheck = await database.query(
        'SELECT * FROM patients WHERE id = $1 OR identifier = $2',
        [id, identifier]
      );
      if (patientCheck.rows.length > 0) {
        return res.status(400).json({ error: 'Patient with the given ID or identifier already exists' });
      }

    const result = await database.query(
      'INSERT INTO patients (id, identifier, active, name, telecom, gender, birth_date, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [id, identifier, active, name, telecom, gender, birth_date, address]
    );

    const newPatient = result.rows[0];
    res.status(200).json({"message":"Patient created Successfully!!",data:newPatient});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await database.query('SELECT * FROM patients WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patient = result.rows[0];
    res.status(200).json({"message":"Patient Data Fetched Successfully!!",data:patient});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { identifier, active, name, telecom, gender, birth_date, address } = req.body;
    const fhir = new Fhir();
    const patientCheck = await database.query('SELECT * FROM patients WHERE id = $1', [id]);
    if (patientCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const fhirPatient = {
      resourceType: 'Patient',
      id: id,
      identifier: [{ value: identifier }],
      active: active,
      name: [{ text: name }],
      telecom: [{ value: telecom }],
      gender: gender,
      birth_date: birth_date,
      address: [{ text: address }],
    };

    const validation = fhir.validate(fhirPatient);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Invalid FHIR resource' });
    }

    await database.query(
      'UPDATE patients SET identifier = $1, active = $2, name = $3, telecom = $4, gender = $5, birth_date = $6, address = $7 WHERE id = $8',
      [identifier, active, name, telecom, gender, birth_date, address, id]
    );

    res.status(200).json({ message: 'Updated Successfully', data: fhirPatient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await database.query('DELETE FROM patients WHERE id = $1', [id]);
    res.status(200).json({"message":"Patient Deleted Successfully!!"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
};
