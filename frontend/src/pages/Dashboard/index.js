import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import en from 'date-fns/locale/en-GB';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '../../services/api';

import { Container, Time } from './styles';

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(() => format(date, 'MMM do', { locale: en }), [
    date,
  ]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('/schedule', { params: { date } });

      const data = response.data.map((appointment) => {
        return {
          ...appointment,
          time: `${appointment.time}h`,
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map((appointment) => (
          <Time
            key={appointment.time}
            past={appointment.pastDate}
            available={!appointment.appointment}
          >
            <strong>{appointment.time}</strong>
            <span>
              {appointment.appointment
                ? appointment.appointment.user.name
                : 'Available'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
