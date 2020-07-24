import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

class CommonFields {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  cratedAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

export default CommonFields;
