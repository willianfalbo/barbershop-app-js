import { isEqual } from 'date-fns';
import Appointment from '../models/appointment.model';

interface CreateAppointmentDTO {
  barber: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const appointment = this.appointments.find(a => isEqual(date, a.date));
    return appointment || null;
  }

  public create({ barber, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ barber, date });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
