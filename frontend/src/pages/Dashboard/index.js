import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import en from 'date-fns/locale/en-GB';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '../../services/api';

import { Container, Time } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(() => format(date, 'MMM do', { locale: en }), [
    date,
  ]);

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
        <Time past>
          <strong>08:00</strong>
          <span>Willian Falbo</span>
        </Time>
        <Time available>
          <strong>09:00</strong>
          <span>Opened</span>
        </Time>
        <Time>
          <strong>10:00</strong>
          <span>Willian Falbo</span>
        </Time>
        <Time>
          <strong>11:00</strong>
          <span>Willian Falbo</span>
        </Time>
      </ul>
    </Container>
  );
}
