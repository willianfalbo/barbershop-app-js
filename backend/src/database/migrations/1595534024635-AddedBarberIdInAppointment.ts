import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddedBarberIdInAppointment1595534024635
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'barber');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'barber_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'appointment_barber',
        columnNames: ['barber_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointment_barber');

    await queryRunner.dropColumn('appointments', 'barber_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'barber',
        type: 'varchar',
      }),
    );
  }
}
