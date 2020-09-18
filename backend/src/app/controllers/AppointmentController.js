import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import AppointmentCreateService from '../services/AppointmentCreateService';
import AppointmentCancelService from '../services/AppointmentCancelService';

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
    const appointment = await AppointmentCancelService.run({
      providerId: req.params.id,
      userId: req.userId,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
