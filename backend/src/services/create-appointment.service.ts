import { startOfHour } from 'date-fns';
import Appointment from '../models/appointment.model';
import AppointmentsRepository from '../repositories/appointments.repository';

interface Request {
  barber: string;
  date: Date;
}

class CreateAppointmentService {
  private repository: AppointmentsRepository;

  constructor(repository: AppointmentsRepository) {
    this.repository = repository;
  }

  public execute({ barber, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const appointmentFound = this.repository.findByDate(appointmentDate);
    if (appointmentFound) {
      throw Error('This date/time is already booked.');
    }

    const appointment = this.repository.create({
      barber,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
