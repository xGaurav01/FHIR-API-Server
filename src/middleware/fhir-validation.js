const { Fhir } = require("fhir");

const fhir = new Fhir();

const validateFhirResource = (resourceType) => {
  return (req, res, next) => {
    const {
      id,
      identifier,
      active,
      name,
      telecom,
      gender,
      birth_date,
      address,
    } = req.body;

    const fhirResource = {
      resourceType: resourceType,
      id: id,
      identifier: [{ value: identifier }],
      active: active,
      name: [{ text: name }],
      telecom: [{ value: telecom }],
      gender: gender,
      birth_date: birth_date,
      address: [{ text: address }],
    };

    const validation = fhir.validate(fhirResource);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.messages });
    }

    req.fhirResource = fhirResource;
    next();
  };
};

module.exports = validateFhirResource;
