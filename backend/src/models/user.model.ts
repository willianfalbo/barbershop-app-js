import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import CommonFields from './common.model';

@Entity('users')
class User extends CommonFields {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
