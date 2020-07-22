import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/appointments.repository';
import CreateAppointmentService from '../services/create-appointment.service';

const router = Router();
const repository = new AppointmentRepository();

router.get('/', (req, res) => {
  const appointments = repository.all();
  return res.json(appointments);
});

router.post('/', (req, res) => {
  try {
    const { barber, date } = req.body;
    const parsedDate = parseISO(date);
    const service = new CreateAppointmentService(repository);
    const appointment = service.execute({ barber, date: parsedDate });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
