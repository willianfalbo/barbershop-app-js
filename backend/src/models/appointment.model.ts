import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  barber: string;

  date: Date;

  constructor({ barber, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.barber = barber;
    this.date = date;
  }
}

export default Appointment;
