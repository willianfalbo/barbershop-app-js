import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import CommonFields from './common.model';
import User from './user.model';

@Entity('appointments')
class Appointment extends CommonFields {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'barber_id' })
  barberId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'barber_id' })
  barber: User;

  @Column({ type: 'timestamp with time zone' })
  date: Date;
}

export default Appointment;
