import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/create-appointment.service';
import AppointmentsRepository from '../repositories/appointments.repository';

const router = Router();

router.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();
  return res.json(appointments);
});

router.post('/', async (req, res) => {
  try {
    const { barber, date } = req.body;
    const parsedDate = parseISO(date);
    const service = new CreateAppointmentService();
    const appointment = await service.execute({ barber, date: parsedDate });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
