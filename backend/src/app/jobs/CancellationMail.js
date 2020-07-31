import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-GB';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('CANCELLATION QUEUE HAS BEEN EXECUTED');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment Cancelled',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "MMMM dd 'at' H:mm'h'", {
          locale: en,
        }),
      },
    });
  }
}

export default new CancellationMail();
