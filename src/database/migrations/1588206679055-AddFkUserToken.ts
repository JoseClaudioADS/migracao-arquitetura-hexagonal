import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddFkUserToken1588206679055 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tokens',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'tokens',
            new TableForeignKey({
                name: 'FK_USER_TOKEN',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tokens', 'FK_USER_TOKEN');
        await queryRunner.dropColumn('tokens', 'user_id');
    }
}
