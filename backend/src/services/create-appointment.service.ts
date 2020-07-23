import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment.model';
import AppointmentsRepository from '../repositories/appointments.repository';

interface Request {
  barber: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ barber, date }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const appointmentFound = await repository.findByDate(appointmentDate);
    if (appointmentFound) {
      throw Error('This date/time is already booked.');
    }

    const appointment = repository.create({
      barber,
      date: appointmentDate,
    });

    await repository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
