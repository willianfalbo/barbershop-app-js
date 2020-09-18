import { BadRequestException } from '../errors';
import AvailabilityListService from '../services/AvailabilityListService';

class AvailableController {
  async list(req, res) {
    const { date } = req.query;

    if (!date) {
      throw new BadRequestException('Invalid date');
    }

    const searchDate = Number(date);

    const availability = await AvailabilityListService.run({
      providerId: req.params.id,
      searchDate,
    });

    return res.json(availability);
  }
}

export default new AvailableController();
