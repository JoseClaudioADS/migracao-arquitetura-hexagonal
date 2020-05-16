import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddActiveDateColumnInUser1588182742306
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'activated_at',
                type: 'timestamp with time zone',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'activated_at');
    }
}
