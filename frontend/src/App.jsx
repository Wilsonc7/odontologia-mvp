import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    pacienteId: '',
    odontologoId: '',
    fecha: '',
    hora: '',
    tipo: '',
    estado: 'pendiente'
  });

  const fetchCitas = () => {
    axios.get('http://localhost:5000/citas')
      .then(response => {
        const citas = response.data.map(cita => ({
          title: cita.tipo,
          start: new Date(`${cita.fecha}T${cita.hora}:00`),
          end: new Date(`${cita.fecha}T${cita.hora}:00`),
          allDay: false,
          resource: cita
        }));
        setEvents(citas);
      })
      .catch(error => {
        console.error('Error al obtener citas:', error);
      });
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/citas', formData)
      .then(() => {
        fetchCitas(); // Actualizar el calendario
        setFormData({
          pacienteId: '',
          odontologoId: '',
          fecha: '',
          hora: '',
          tipo: '',
          estado: 'pendiente'
        });
      })
      .catch(error => {
        console.error('Error al crear cita:', error);
      });
  };

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <h1>Calendario de Citas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="number"
          name="pacienteId"
          placeholder="ID Paciente"
          value={formData.pacienteId}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="odontologoId"
          placeholder="ID Odontólogo"
          value={formData.odontologoId}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo de cita"
          value={formData.tipo}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Crear Cita</button>
      </form>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default App;