// backend/index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const citaRoutes = require('./routes/citas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/citas', citaRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Servidor en http://localhost:5000'));
});