import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';
import AppointmentCreateService from '../services/AppointmentCreateService';

class AppointmentController {
  async list(req, res) {
    const { page = 1 } = req.query;
    const pageLimit = 20;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'pastDate', 'cancelable'],
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
        },
      ],
    });

    res.json(appointments);
  }

  async create(req, res) {
    const { providerId, date } = req.body;

    const appointment = await AppointmentCreateService.run({
      providerId,
      date,
      userId: req.userId,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'provider', attributes: ['name', 'email'] },
        { model: User, as: 'user', attributes: ['name'] },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res
        .status(403)
        .json({ error: 'You are not allowed to cancel this appointment' });
    }

    if (appointment.cancelable === false) {
      return res.status(403).json({
        error: 'You can only cancel appointments in 2 hours of advance',
      });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    // trigger email cancellation queue
    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }
}

export default new AppointmentController();
