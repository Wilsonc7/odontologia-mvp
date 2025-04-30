// backend/models/Cita.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cita = sequelize.define('Cita', {
  pacienteId: { type: DataTypes.INTEGER, allowNull: false },
  odontologoId: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.STRING, allowNull: false }, // Ejemplo: "2025-05-01"
  hora: { type: DataTypes.STRING, allowNull: false }, // Ejemplo: "14:30"
  tipo: { type: DataTypes.STRING, allowNull: false }, // Ejemplo: "Consulta"
  estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },
});

module.exports = Cita;