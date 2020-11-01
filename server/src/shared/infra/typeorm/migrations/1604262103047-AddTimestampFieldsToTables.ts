import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTimestampFieldsToTables1604262103047
  implements MigrationInterface {
  private readonly tables = ['orphanages', 'images', 'users'];

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.tables.forEach(async (tableName) => {
      await queryRunner.addColumns(tableName, [
        new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        }),
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        }),
      ]);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.tables.forEach(async (tableName) => {
      await queryRunner.dropColumns(tableName, [
        new TableColumn({
          name: 'created_at',
          type: 'timestamp',
        }),
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
        }),
      ]);
    });
  }
}
