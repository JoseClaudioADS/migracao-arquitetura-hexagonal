import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsersTable1588165055895
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                        length: '250',
                    },
                    {
                        name: 'phoneNumber',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'canceled_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                ],
            }),
            true,
            false,
            false,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
