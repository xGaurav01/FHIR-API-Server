const express = require("express");
const bodyParser = require("body-parser");
const patientRoutes = require('./routes/patient-routes.js');
const userRoutes = require('./routes/user-routes.js');
const app = express();

app.use(bodyParser.json());


app.use('/api', patientRoutes);
app.use('/api', userRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
