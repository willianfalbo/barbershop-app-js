import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import en from 'date-fns/locale/en-GB';

import User from '../models/User';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

class AppointmentCreateService {
  async run({ providerId, date, userId }) {
    // check if providerId is valid
    const isProvider = await User.findOne({
      where: { id: providerId, provider: true },
    });

    if (!isProvider) {
      throw new Error('You can only create appointment with providers');
    }

    // it converts the string to valid date and it gets the start hour only
    const hourStart = startOfHour(parseISO(date));

    // check for past dates
    if (isBefore(hourStart, new Date())) {
      throw new Error('Past dates are not allowed');
    }

    // check appointment availability
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      throw new Error('Appointment date is not available');
    }

    const appointment = await Appointment.create({
      user_id: userId,
      provider_id: providerId,
      date: hourStart,
    });

    // create a notification
    const user = await User.findByPk(userId);
    const formattedDate = format(hourStart, "MMMM dd 'at' H:mm'h'", {
      locale: en,
    });
    await Notification.create({
      content: `${user.name} added an appointment on ${formattedDate}.`,
      user: providerId,
    });

    return appointment;
  }
}

export default new AppointmentCreateService();
