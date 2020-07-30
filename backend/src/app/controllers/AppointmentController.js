import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import en from 'date-fns/locale/en-GB';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

class AppointmentController {
  async list(req, res) {
    const { page = 1 } = req.query;
    const pageLimit = 20;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
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
    const schema = Yup.object().shape({
      providerId: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Schema validation failed' });
    }

    const { providerId, date } = req.body;

    // check if providerId is valid
    const isProvider = await User.findOne({
      where: { id: providerId, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with providers' });
    }

    // it converts the string to valid date and it gets the start hour only
    const hourStart = startOfHour(parseISO(date));

    // check for past dates
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed' });
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
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id: providerId,
      date: hourStart,
    });

    // create a notification
    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "MMMM dd 'at' H:mm'h'", {
      locale: en,
    });
    await Notification.create({
      content: `${user.name} added an appointment on ${formattedDate}.`,
      user: providerId,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
