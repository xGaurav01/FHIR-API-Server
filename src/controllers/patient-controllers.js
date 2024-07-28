const { Fhir } = require("fhir");
const database = require("../config/db-config.js");

const createPatient = async (req, res) => {
  try {
    const fhirPatient = req.fhirResource;

    const { id } = fhirPatient;

    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const patientCheck = await database.query(
      "SELECT * FROM patients WHERE id = $1 OR identifier = $2",
      [id, fhirPatient.identifier[0].value]
    );
    if (patientCheck.rows.length > 0) {
      return res.status(400).json({
        error: "Patient with the given ID or identifier already exists",
      });
    }

    const result = await database.query(
      "INSERT INTO patients (id, identifier, active, name, telecom, gender, birth_date, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        id,
        fhirPatient.identifier[0].value,
        fhirPatient.active,
        fhirPatient.name[0].text,
        fhirPatient.telecom[0].value,
        fhirPatient.gender,
        fhirPatient.birth_date,
        fhirPatient.address[0].text,
      ]
    );

    const newPatient = result.rows[0];
    res
      .status(200)
      .json({ message: "Patient created Successfully!!", data: newPatient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const result = await database.query(
      "SELECT * FROM patients WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = result.rows[0];
    res
      .status(200)
      .json({ message: "Patient Data Fetched Successfully!!", data: patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const fhirPatient = req.fhirResource;

    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const patientCheck = await database.query(
      "SELECT * FROM patients WHERE id = $1",
      [id]
    );

    if (patientCheck.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    await database.query(
      "UPDATE patients SET identifier = $1, active = $2, name = $3, telecom = $4, gender = $5, birth_date = $6, address = $7 WHERE id = $8",
      [
        fhirPatient.identifier[0].value,
        fhirPatient.active,
        fhirPatient.name[0].text,
        fhirPatient.telecom[0].value,
        fhirPatient.gender,
        fhirPatient.birth_date,
        fhirPatient.address[0].text,
        id,
      ]
    );

    res
      .status(200)
      .json({ message: "Updated Successfully", data: fhirPatient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    await database.query("DELETE FROM patients WHERE id = $1", [id]);
    res.status(200).json({ message: "Patient Deleted Successfully!!" });
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
