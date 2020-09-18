import User from '../models/User';
import Appointment from '../models/Appointment';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';
import { ForbiddenException, BadRequestException } from '../errors';

class AppointmentCancelService {
  async run({ providerId, userId }) {
    const appointment = await Appointment.findByPk(providerId, {
      include: [
        { model: User, as: 'provider', attributes: ['name', 'email'] },
        { model: User, as: 'user', attributes: ['name'] },
      ],
    });

    if (appointment.user_id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to cancel this appointment'
      );
    }

    if (appointment.canceled_at) {
      throw new BadRequestException('This appointment was already cancelled');
    }

    if (appointment.pastDate === true) {
      throw new ForbiddenException('Past appointments cannot be cancelled');
    }

    if (appointment.cancelable === false) {
      throw new ForbiddenException(
        'You can only cancel appointments in 2 hours of advance'
      );
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    // trigger email cancellation queue
    await Queue.add(CancellationMail.key, { appointment });

    return appointment;
  }
}

export default new AppointmentCancelService();
