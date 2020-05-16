import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export default class AddUniqueIndexEmailUser1588183307314
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex(
            'users',
            new TableIndex({
                columnNames: ['email'],
                isUnique: true,
                name: 'IDX_USER_EMAIL_UNIQUE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('users', 'IDX_USER_EMAIL_UNIQUE');
    }
}
