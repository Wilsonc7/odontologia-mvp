// backend/routes/citas.js
const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');

router.post('/', async (req, res) => {
  try {
    const { pacienteId, odontologoId, fecha, hora, tipo, estado } = req.body;
    const cita = await Cita.create({ pacienteId, odontologoId, fecha, hora, tipo, estado });
    res.status(201).json(cita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;