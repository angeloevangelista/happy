import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserIdFieldToOrphanages1604250038591
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'user_id',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orphanages',
      new TableForeignKey({
        name: 'owner',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orphanages', 'owner');

    await queryRunner.dropColumn('orphanages', 'user_id');
  }
}
