import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import AppointmentCreateService from '../services/AppointmentCreateService';
import AppointmentCancelService from '../services/AppointmentCancelService';
import Cache from '../../lib/Cache';

class AppointmentController {
  async list(req, res) {
    const { page = 1 } = req.query;
    const pageLimit = 20;

    // return from cache if exists
    const cacheKey = `user:${req.userId}:appointments:${page}`;
    const cached = await Cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

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

    // add to cache
    await Cache.set(cacheKey, appointments);

    return res.json(appointments);
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
    const appointment = await AppointmentCancelService.run({
      providerId: req.params.id,
      userId: req.userId,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
