import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment.model';
import AppointmentsRepository from '../repositories/appointments.repository';

interface Request {
  barberId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ barberId, date }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const appointmentFound = await repository.findByDate(appointmentDate);
    if (appointmentFound) {
      throw Error('This date/time is already booked.');
    }

    const appointment = repository.create({ barberId, date: appointmentDate });
    await repository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
