import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import { BadRequestException } from '../errors';

class AvailableController {
  async list(req, res) {
    const { date } = req.query;

    if (!date) {
      throw new BadRequestException('Invalid date');
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    // TODO: Move it to a shared file
    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const availability = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const sanitizedDate = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      return {
        time,
        value: format(sanitizedDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(sanitizedDate, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(availability);
  }
}

export default new AvailableController();
