import { MigrationInterface, QueryRunner } from 'typeorm';

import getSeeders from '../seeders';

export class SeedUsers1604174282832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.connection.getRepository('users');

    const users = usersRepository.create(await getSeeders().users);

    await usersRepository.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.connection.getRepository('users');

    const usersEmails = (await getSeeders().users).map((user) => user.email);

    const usersToDelete = await usersRepository
      .createQueryBuilder('users')
      .where('users.email IN (:emails)', { emails: usersEmails })
      .getMany();

    await usersRepository.delete(usersToDelete);
  }
}
