import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import CommonFields from './support/common.model';

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

  @Column({ name: 'avatar_filename', nullable: true })
  avatarFilename: string;
}

export default User;
