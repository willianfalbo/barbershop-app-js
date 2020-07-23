import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  barber: string;

  @Column({ nullable: false, type: 'timestamp with time zone' })
  date: Date;
}

export default Appointment;
